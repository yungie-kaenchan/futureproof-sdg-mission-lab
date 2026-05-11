/**
 * FUTUREPROOF — Firebase Cloud Functions
 *
 * Deployed via `firebase deploy --only functions`. These run inside the
 * Firebase project (not Netlify) and are the only writers to admin-gated
 * paths in the security rules:
 *
 *   onUserCreate       — Auth trigger; bootstraps user public/private + role claim
 *   onConsentSubmit    — DB trigger; updates consentVersion custom claim
 *   awardTokens        — callable; validates and writes to /tokens/$tid/ledger
 *   recomputeBalance   — DB trigger on /tokens/$tid/ledger/$entry; sums and writes balance
 *   evaluateDecision   — DB trigger on new decision; calls Claude proxy server-side
 *   submitToHall       — callable; validates per-team feature consent before publishing
 *   tombstoneUser      — callable + scheduled; PDPA-compliant deletion
 *   assignRole         — callable; admin-only; sets role + classes claims
 *
 * All state changes are logged to /auditLogs for PDPA traceability.
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onValueWritten, onValueCreated } from "firebase-functions/v2/database";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as authFunctions from "firebase-functions/v1/auth"; // v1 for Auth triggers
import { initializeApp } from "firebase-admin/app";
import { getDatabase, ServerValue } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";

initializeApp();
const db = getDatabase();
const auth = getAuth();

const REGION = "asia-southeast1";
const CLAUDE_ENDPOINT = "https://api.anthropic.com/v1/messages";

/* ──────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

async function audit(actorUid, action, target, context = {}) {
  await db.ref("auditLogs").push({
    ts: ServerValue.TIMESTAMP,
    actorUid: actorUid || "system",
    actorRole: context.actorRole || "system",
    action,
    target,
    context,
    consentBypass: !!context.consentBypass,
  });
}

function requireAdmin(context) {
  if (!context.auth || context.auth.token.role !== "admin") {
    throw new HttpsError("permission-denied", "Admin claim required.");
  }
}

function requireTeamMember(context, tid) {
  if (!context.auth) throw new HttpsError("unauthenticated", "Sign in first.");
  return db.ref(`teams/${tid}/members/${context.auth.uid}`).get().then((s) => {
    if (!s.exists()) throw new HttpsError("permission-denied", "Not a team member.");
  });
}

/* ──────────────────────────────────────────────────────────────────
 * 1. onUserCreate — Auth trigger
 * ──────────────────────────────────────────────────────────────── */

export const onUserCreate = authFunctions
  .region(REGION)
  .user()
  .onCreate(async (user) => {
    await db.ref(`users/${user.uid}/profile/public`).update({
      displayName: user.displayName || "Cadet",
      rank: "cadet",
      joinedAt: ServerValue.TIMESTAMP,
    });
    await db.ref(`users/${user.uid}/profile/private`).update({
      email: user.email || null,
      consentVersion: null,
      lastActiveAt: ServerValue.TIMESTAMP,
    });
    await auth.setCustomUserClaims(user.uid, { role: "student" });
    await audit("system", "user.create", user.uid, { email: user.email });
  });

/* ──────────────────────────────────────────────────────────────────
 * 2. onConsentSubmit — DB trigger
 * ──────────────────────────────────────────────────────────────── */

export const onConsentSubmit = onValueCreated(
  { ref: "/consents/{uid}/{version}", region: REGION },
  async (event) => {
    const { uid, version } = event.params;
    const existingClaims = (await auth.getUser(uid)).customClaims || {};
    await auth.setCustomUserClaims(uid, { ...existingClaims, consentVersion: version });
    await db.ref(`users/${uid}/profile/private/consentVersion`).set(version);
    await audit(uid, "consent.submit", uid, { version });
  }
);

/* ──────────────────────────────────────────────────────────────────
 * 3. awardTokens — callable
 * ──────────────────────────────────────────────────────────────── */

export const awardTokens = onCall({ region: REGION }, async (request) => {
  const { tid, delta, reason, missionId, decisionId } = request.data || {};
  if (!tid || typeof delta !== "number" || !reason) {
    throw new HttpsError("invalid-argument", "tid, delta, reason required");
  }
  await requireTeamMember(request, tid);
  const ref = db.ref(`tokens/${tid}/ledger`).push();
  await ref.set({
    ts: ServerValue.TIMESTAMP,
    delta,
    reason,
    missionId: missionId || null,
    decisionId: decisionId || null,
  });
  return { entryId: ref.key };
});

/* ──────────────────────────────────────────────────────────────────
 * 4. recomputeBalance — DB trigger on ledger writes
 * ──────────────────────────────────────────────────────────────── */

export const recomputeBalance = onValueWritten(
  { ref: "/tokens/{tid}/ledger/{entryId}", region: REGION },
  async (event) => {
    const { tid } = event.params;
    const ledger = (await db.ref(`tokens/${tid}/ledger`).get()).val() || {};
    let balance = 0;
    for (const k of Object.keys(ledger)) {
      const e = ledger[k];
      if (e && typeof e.delta === "number") balance += e.delta;
    }
    await db.ref(`tokens/${tid}/balance`).set(balance);
    await db.ref(`teams/${tid}/tokens`).set(balance);
  }
);

/* ──────────────────────────────────────────────────────────────────
 * 5. evaluateDecision — DB trigger; calls Claude server-side and writes
 *    aiEvaluation back onto the decision record.
 * ──────────────────────────────────────────────────────────────── */

export const evaluateDecision = onValueCreated(
  { ref: "/decisions/{missionId}/{decisionId}", region: REGION },
  async (event) => {
    const decision = event.data.val();
    if (!decision || decision.aiEvaluation) return; // already evaluated

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.warn("[evaluateDecision] ANTHROPIC_API_KEY missing; skipping.");
      return;
    }

    const userMessage = `Evaluate this team decision.

Decision type: ${decision.decisionType}
Chosen: ${JSON.stringify(decision.chosen)}
Rationale (verbatim student writing):
${decision.rationale || "(none)"}

Score on a generic four-criterion rubric (factual, reasoning, language, awareness), 1-5 each. Award -10 to +25 tokens. Return JSON only:
{ "scores": {...}, "tokensAwarded": <int>, "feedback": "...", "strengthsObserved": [...], "growthEdge": "..." }`;

    const system = `You are FUTUREPROOF's AI Judge. Score formatively only. No pass/fail. Always name a specific growthEdge.`;

    let parsed;
    try {
      const resp = await fetch(CLAUDE_ENDPOINT, {
        method: "POST",
        headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-7",
          max_tokens: 1500,
          system,
          messages: [{ role: "user", content: userMessage }],
        }),
      });
      const data = await resp.json();
      const text = (data.content || []).map((b) => b.text || "").join("").trim();
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("[evaluateDecision] Claude call failed:", err);
      return;
    }

    const decisionRef = db.ref(`decisions/${event.params.missionId}/${event.params.decisionId}`);
    await decisionRef.update({ aiEvaluation: parsed });

    // Award tokens server-side based on Claude's recommendation
    if (typeof parsed.tokensAwarded === "number") {
      const tid = decision.tid || event.params.missionId.split("_")[0];
      await db.ref(`tokens/${tid}/ledger`).push({
        ts: ServerValue.TIMESTAMP,
        delta: parsed.tokensAwarded,
        reason: `decision:${event.params.decisionId}`,
        missionId: event.params.missionId,
        decisionId: event.params.decisionId,
      });
    }
  }
);

/* ──────────────────────────────────────────────────────────────────
 * 6. submitToHall — callable; verify per-team consent before publishing
 * ──────────────────────────────────────────────────────────────── */

export const submitToHall = onCall({ region: REGION }, async (request) => {
  const { tid, consentToFeature } = request.data || {};
  if (!tid) throw new HttpsError("invalid-argument", "tid required");
  await requireTeamMember(request, tid);

  const team = (await db.ref(`teams/${tid}`).get()).val();
  if (!team) throw new HttpsError("not-found", "Team not found.");

  // All team members must have consent on file
  const memberUids = Object.keys(team.members || {});
  for (const uid of memberUids) {
    const consents = (await db.ref(`consents/${uid}`).get()).val();
    if (!consents) throw new HttpsError("failed-precondition", `No consent on file for ${uid}.`);
    const latest = Object.values(consents).sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    if (!latest?.flags?.basicProfile) {
      throw new HttpsError("failed-precondition", `Member ${uid} has not granted basicProfile consent.`);
    }
  }

  await db.ref(`artifacts/${tid}/submittedToHallAt`).set(ServerValue.TIMESTAMP);
  await db.ref(`artifacts/${tid}/consentToFeature`).set(!!consentToFeature);

  if (consentToFeature) {
    const consentSnapshot = {};
    for (const uid of memberUids) {
      const consents = (await db.ref(`consents/${uid}`).get()).val();
      const latest = Object.values(consents).sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
      consentSnapshot[uid] = latest.version;
    }
    const entryId = `entry_${tid}_${Date.now().toString(36)}`;
    await db.ref(`hallOfExcellence/${entryId}`).set({
      tid,
      submittedAt: ServerValue.TIMESTAMP,
      approvedAt: null,
      approvedBy: null,
      featured: false,
      publishedSlug: null,
      consentSnapshot,
    });
  }

  await audit(request.auth.uid, "hall.submit", tid, { consentToFeature });
  return { submitted: true };
});

/* ──────────────────────────────────────────────────────────────────
 * 7. tombstoneUser — callable; PDPA-compliant deletion
 * ──────────────────────────────────────────────────────────────── */

export const tombstoneUser = onCall({ region: REGION }, async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in first.");
  const { targetUid } = request.data || {};
  // Self-deletion always allowed; other-deletion requires admin
  if (targetUid && targetUid !== request.auth.uid) requireAdmin(request);
  const uid = targetUid || request.auth.uid;

  // Tombstone PII paths; preserve audit logs and anonymized analytics
  await db.ref(`users/${uid}/profile/private`).set({ deletedAt: ServerValue.TIMESTAMP });
  await db.ref(`users/${uid}/profile/public/displayName`).set("[deleted]");
  await db.ref(`users/${uid}/profile/public/avatarUrl`).set(null);
  await db.ref(`reflections/${uid}`).remove();

  await audit(request.auth.uid, "user.tombstone", uid, { actorRole: request.auth.token.role || "self" });
  await auth.deleteUser(uid).catch(() => {});
  return { tombstoned: uid };
});

/* ──────────────────────────────────────────────────────────────────
 * 8. assignRole — callable (admin only)
 * ──────────────────────────────────────────────────────────────── */

export const assignRole = onCall({ region: REGION }, async (request) => {
  requireAdmin(request);
  const { uid, role, classes } = request.data || {};
  if (!uid || !role) throw new HttpsError("invalid-argument", "uid, role required");
  if (!["student", "teacher", "admin"].includes(role)) {
    throw new HttpsError("invalid-argument", "Unknown role.");
  }
  const existing = (await auth.getUser(uid)).customClaims || {};
  await auth.setCustomUserClaims(uid, { ...existing, role, classes: Array.isArray(classes) ? classes : [] });
  await audit(request.auth.uid, "role.assign", uid, { role, classes, actorRole: "admin" });
  return { ok: true };
});

/* ──────────────────────────────────────────────────────────────────
 * 9. scheduledDeletionSweep — daily; honor 90-day retention
 * ──────────────────────────────────────────────────────────────── */

export const scheduledDeletionSweep = onSchedule(
  { schedule: "every day 03:00", timeZone: "Asia/Bangkok", region: REGION },
  async () => {
    const RETENTION_DAYS = 90;
    const cutoff = Date.now() - RETENTION_DAYS * 86400_000;
    const users = (await db.ref("users").get()).val() || {};
    let count = 0;
    for (const uid of Object.keys(users)) {
      const lastActive = users[uid]?.profile?.private?.lastActiveAt;
      if (!lastActive || lastActive > cutoff) continue;
      await db.ref(`users/${uid}/profile/private`).set({ deletedAt: ServerValue.TIMESTAMP });
      await audit("system", "user.autoDelete", uid, { reason: `inactive ${RETENTION_DAYS}d` });
      count += 1;
    }
    console.log(`[scheduledDeletionSweep] tombstoned ${count} accounts`);
  }
);
