/**
 * FUTUREPROOF — Teacher Admin data layer
 *
 * Total-authority operations for the platform owner. Every function here
 * is also enforced by RTDB security rules (admins/{uid} === true) — this
 * module is the convenience surface, the rules are the real gate.
 *
 * Auth model:
 *   admins/{uid} = true            ← you set this once, by hand, in the
 *                                     Firebase console for your own uid.
 *   Rules grant cross-user read/write only when the caller is in admins.
 *
 * Nothing here throws on a clean "no data" — callers get [] / {} / null
 * so the console renders an empty state instead of crashing.
 */

import { JOURNEY_MISSIONS } from "./keystones.js";

let fb = null;
async function FB() {
  if (!fb) fb = await import("./firebase-init.js");
  return fb;
}

/* ── Auth / gate ─────────────────────────────────────────────── */

export async function signInAdmin(email, password) {
  const m = await FB();
  const user = await m.signIn(email, password);
  const isAdmin = await isAdminUid(user.uid);
  if (!isAdmin) {
    await m.signOutUser();
    throw new Error("This account is not an administrator.");
  }
  return user;
}

export async function isAdminUid(uid) {
  if (!uid) return false;
  try {
    const m = await FB();
    return (await m.readPath(`admins/${uid}`)) === true;
  } catch (_) { return false; }
}

export async function signOutAdmin() {
  const m = await FB();
  await m.signOutUser();
}

export function watchAdminAuth(cb) {
  return FB().then((m) => m.watchAuth(cb));
}

/* ── Read: roster + per-user detail ──────────────────────────── */

/** All learners as a flat array with the headline fields the table needs. */
export async function listUsers() {
  const m = await FB();
  const [users, progress] = await Promise.all([
    m.readPath("users"),
    m.readPath("progress"),
  ]);
  if (!users) return [];
  return Object.entries(users).map(([uid, u]) => {
    const pub = (u && u.profile && u.profile.public) || {};
    const priv = (u && u.profile && u.profile.private) || {};
    const keystones = (u && u.keystones) || {};
    const inProgress = (progress && progress[uid]) || {};
    return {
      uid,
      displayName: pub.displayName || "(no name)",
      email: priv.email || "",
      institution: pub.institution || "",
      rank: pub.rank || "cadet",
      joinedAt: pub.joinedAt || null,
      keystoneCount: Object.keys(keystones).filter((k) =>
        JOURNEY_MISSIONS.some((mn) => mn.id === k)).length,
      keystones,
      missionsInProgress: Object.keys(inProgress),
    };
  }).sort((a, b) => (b.joinedAt || 0) - (a.joinedAt || 0));
}

/** Everything we hold about one learner — for the detail drawer. */
export async function getUserDetail(uid) {
  const m = await FB();
  const [user, consents, progress, tokens] = await Promise.all([
    m.readPath(`users/${uid}`),
    m.readPath(m.paths.consents(uid)),
    m.readPath(m.paths.progress(uid)),
    m.readPath(m.paths.tokens(uid)),
  ]);
  return {
    uid,
    user: user || {},
    consents: consents || {},
    progress: progress || {},
    tokens: tokens || {},
    voiceForChange: (user && user.voiceForChange) || {},
  };
}

/* ── Override / edit / delete ────────────────────────────────── */

/** Grant a Keystone (teacher override — audit-stamped with adminUid). */
export async function grantKeystone(uid, missionId, adminUid, reason) {
  const ks = await import("./keystones.js");
  return ks.grantTeacherOverride({
    uid, missionId, teacherId: adminUid,
    reason: reason || "Granted from Admin console",
  });
}

/** Revoke a Keystone (removes the node entirely). */
export async function revokeKeystone(uid, missionId) {
  const m = await FB();
  await m.writePath(`${m.paths.keystones(uid)}/${missionId}`, null);
}

/** Clear a learner's mid-mission resume snapshot (forces a clean restart). */
export async function resetMissionProgress(uid, missionId) {
  const m = await FB();
  await m.writePath(`${m.paths.progress(uid)}/${missionId}`, null);
}

/** Adjust a learner's Insight Tokens by a signed delta (audit-stamped). */
export async function adjustTokens(uid, delta, adminUid) {
  const m = await FB();
  const tokPath = m.paths.tokens(uid);
  const cur = (await m.readPath(tokPath)) || {};
  const balance = (typeof cur.balance === "number" ? cur.balance : 0) + Number(delta || 0);
  const ledger = Array.isArray(cur.ledger) ? cur.ledger.slice(-49) : [];
  ledger.push({ delta: Number(delta || 0), by: adminUid || "admin", at: nowStamp(), reason: "Admin adjustment" });
  await m.writePath(tokPath, { ...cur, balance, ledger });
  return balance;
}

/** Record a teacher's review of a Voice for Change (grade + feature flag). */
export async function setVfcReview(uid, vfcId, patch, adminUid) {
  const m = await FB();
  const base = `${m.paths.voiceForChange(uid)}/${vfcId}`;
  const cur = (await m.readPath(`${base}/review`)) || {};
  await m.writePath(`${base}/review`, {
    ...cur, ...patch, reviewedBy: adminUid || "admin", reviewedAt: nowStamp(),
  });
}

/** Feature / un-feature a learner's Voice for Change in the Hall of Voices. */
export async function setHallFeatured(uid, vfcId, featured, adminUid) {
  return setVfcReview(uid, vfcId, { featuredInHall: featured === true }, adminUid);
}

/** Override a mission outcome (mark passed / not — teacher authority). */
export async function setMissionPassed(uid, missionId, passed, adminUid) {
  const m = await FB();
  const base = `${m.paths.progress(uid)}/${missionId}`;
  const cur = (await m.readPath(base)) || {};
  await m.writePath(base, { ...cur, passed: passed === true, overrideBy: adminUid || "admin", overrideAt: nowStamp() });
}

function nowStamp() {
  // Date.now is unavailable in some sandboxes; fall back to a coarse marker.
  try { return Date.now(); } catch (_) { return 0; }
}

/** Patch a learner's public profile (name / institution / rank). */
export async function updateUserProfile(uid, patch) {
  const m = await FB();
  const cur = (await m.readPath(m.paths.userPublic(uid))) || {};
  await m.writePath(m.paths.userPublic(uid), { ...cur, ...patch });
}

/** PDPA erasure — delete every node we hold for this learner. */
export async function deleteUserData(uid) {
  const m = await FB();
  await Promise.all([
    m.writePath(`users/${uid}`, null),
    m.writePath(m.paths.progress(uid), null),
    m.writePath(m.paths.consents(uid), null),
    m.writePath(m.paths.reflections(uid), null),
  ]);
}

/* ── Voice for Change curation ───────────────────────────────── */

/** Every Voice for Change submission across all learners (newest first). */
export async function listVfcSubmissions() {
  const m = await FB();
  const users = await m.readPath("users");
  if (!users) return [];
  const rows = [];
  for (const [uid, u] of Object.entries(users)) {
    const pub = (u && u.profile && u.profile.public) || {};
    const vfc = (u && u.voiceForChange) || null;
    if (!vfc || typeof vfc !== "object") continue;
    // New shape: one child per submission (vfc-<ts>). Legacy: flat record.
    const entries = Object.keys(vfc).some((k) => k.startsWith("vfc-"))
      ? Object.entries(vfc).filter(([k]) => k.startsWith("vfc-"))
      : (vfc.transcript ? [["vfc-legacy", vfc]] : []);
    for (const [vfcId, rec] of entries) {
      if (!rec || typeof rec !== "object") continue;
      rows.push({
        uid, vfcId,
        displayName: pub.displayName || rec.studentName || "(no name)",
        submittedAt: rec.submittedAt || 0,
        audienceLabel: rec.audienceLabel || "",
        transcript: rec.transcript || "",
        mediaUrl: rec.mediaUrl || null,
        videoOn: rec.videoOn === true,
        isDemo: rec.isDemo === true,
        status: rec.status || "",
        featured: Boolean(rec.review && rec.review.featuredInHall),
      });
    }
  }
  return rows.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
}

/**
 * Publish a submission to the PUBLIC Hall of Voices node.
 * PDPA: caller (the teacher) confirms showcase consent and supplies the
 * pseudonym — a real name must never reach the public node.
 */
export async function publishToHall(sub, pseudonym, adminUid) {
  const m = await FB();
  const hallId = `${sub.uid}_${sub.vfcId}`;
  await m.writePath(`hall/${hallId}`, {
    title: (sub.transcript || "").replace(/\s+/g, " ").trim().slice(0, 90) || "A Voice for Change",
    by: pseudonym || "Pseudonymous learner",
    address: sub.audienceLabel || "",
    excerpt: (sub.transcript || "").replace(/\s+/g, " ").trim().slice(0, 600),
    mediaUrl: sub.mediaUrl || null,
    videoOn: sub.videoOn === true,
    publishedAt: nowStamp(),
    publishedBy: adminUid || "admin",
    uid: sub.uid, vfcId: sub.vfcId,
  });
  await setVfcReview(sub.uid, sub.vfcId, { featuredInHall: true, hallId }, adminUid);
  return hallId;
}

/** Withdraw a submission from the public Hall (consent is withdrawable). */
export async function removeFromHall(sub, adminUid) {
  const m = await FB();
  await m.writePath(`hall/${sub.uid}_${sub.vfcId}`, null);
  await setVfcReview(sub.uid, sub.vfcId, { featuredInHall: false, hallId: null }, adminUid);
}

/* ── Voice for Change media management ───────────────────────────
 * Storage rules only allow writes into one's OWN folder, so admin-
 * uploaded clips live under voiceForChange/{adminUid}/ and the
 * learner's record points at them. Deleting a STUDENT-uploaded file
 * from Storage is not possible from the browser (rules); we remove
 * the record's link and the caller purges the orphan via the console
 * when full erasure matters (PDPA).                                */

function assertMediaFile(file) {
  if (!file) throw new Error("Choose a file first.");
  const t = file.type || "";
  if (!(t.startsWith("audio/") || t.startsWith("video/")))
    throw new Error("Audio or video files only (got: " + (t || "unknown") + ").");
  if (file.size > 100 * 1024 * 1024) throw new Error("File exceeds the 100 MB cap.");
}

/** Attach or replace the clip on an existing submission. */
export async function replaceVfcMedia(sub, file, adminUid) {
  assertMediaFile(file);
  const m = await FB();
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const url = await m.uploadFile(
    `voiceForChange/${adminUid}/${nowStamp()}-for-${sub.uid}.${ext}`, file);
  const oldUrl = sub.mediaUrl;
  await m.writePath(`${m.paths.voiceForChange(sub.uid)}/${sub.vfcId}/mediaUrl`, url);
  await setVfcReview(sub.uid, sub.vfcId,
    { mediaReplacedBy: adminUid || "admin", mediaReplacedAt: nowStamp() }, adminUid);
  if (oldUrl) { try { await m.deleteFileByUrl(oldUrl); } catch (_) { /* student-owned: console purge */ } }
  return url;
}

/** Remove the clip from a submission (record + transcript stay). */
export async function deleteVfcMedia(sub, adminUid) {
  const m = await FB();
  let storagePurged = false;
  if (sub.mediaUrl) {
    try { await m.deleteFileByUrl(sub.mediaUrl); storagePurged = true; } catch (_) {}
  }
  await m.writePath(`${m.paths.voiceForChange(sub.uid)}/${sub.vfcId}/mediaUrl`, null);
  await setVfcReview(sub.uid, sub.vfcId,
    { mediaDeletedBy: adminUid || "admin", mediaDeletedAt: nowStamp() }, adminUid);
  return { storagePurged };
}

/** Teacher edit of a submission's transcript (audit-stamped). */
export async function updateVfcTranscript(sub, transcript, adminUid) {
  const m = await FB();
  await m.writePath(`${m.paths.voiceForChange(sub.uid)}/${sub.vfcId}/transcript`, transcript);
  await setVfcReview(sub.uid, sub.vfcId,
    { transcriptEditedBy: adminUid || "admin", transcriptEditedAt: nowStamp() }, adminUid);
}

/** Delete an entire submission (un-features it first; best-effort media purge). */
export async function deleteVfcSubmission(sub, adminUid) {
  const m = await FB();
  if (sub.featured) { try { await removeFromHall(sub, adminUid); } catch (_) {} }
  if (sub.mediaUrl) { try { await m.deleteFileByUrl(sub.mediaUrl); } catch (_) {} }
  await m.writePath(`${m.paths.voiceForChange(sub.uid)}/${sub.vfcId}`, null);
}

/** Create a submission on a learner's behalf (e.g., a clip sent by email). */
export async function createVfcForLearner(uid, { file, transcript, audienceLabel }, adminUid) {
  if (!uid) throw new Error("Pick a learner first.");
  const m = await FB();
  let mediaUrl = null;
  if (file) {
    assertMediaFile(file);
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    mediaUrl = await m.uploadFile(
      `voiceForChange/${adminUid}/${nowStamp()}-for-${uid}.${ext}`, file);
  }
  const vfcId = "vfc-" + nowStamp();
  await m.writePath(`${m.paths.voiceForChange(uid)}/${vfcId}`, {
    uid,
    transcript: transcript || "",
    audienceLabel: audienceLabel || "",
    mediaUrl,
    submittedAt: nowStamp(),
    status: "submitted-awaiting-teacher",
    source: "teacher-upload",
    uploadedBy: adminUid || "admin",
  });
  return vfcId;
}

/* ── Mission on/off + system config ──────────────────────────── */

export async function getMissionFlags() {
  const m = await FB();
  const cfg = (await m.readPath("config/missions")) || {};
  // Default: enabled unless explicitly turned off.
  const flags = {};
  for (const mn of JOURNEY_MISSIONS) {
    flags[mn.id] = !(cfg[mn.id] && cfg[mn.id].enabled === false);
  }
  return flags;
}

export async function setMissionEnabled(missionId, enabled) {
  const m = await FB();
  await m.writePath(`config/missions/${missionId}/enabled`, enabled === true);
}

export async function getSystemConfig() {
  const m = await FB();
  const c = (await m.readPath("config/system")) || {};
  return {
    demoMode: c.demoMode === true,
    passThreshold: typeof c.passThreshold === "number" ? c.passThreshold : 0.60,
  };
}

export async function setSystemConfig(patch) {
  const m = await FB();
  const cur = await getSystemConfig();
  await m.writePath("config/system", { ...cur, ...patch });
}

/* ── CSV export ──────────────────────────────────────────────── */

export async function exportUsersCsv() {
  const rows = await listUsers();
  const head = ["uid", "displayName", "email", "institution", "rank",
    "joinedAt", "keystoneCount", "missionsInProgress"];
  const esc = (v) => {
    const s = String(v == null ? "" : v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [head.join(",")];
  for (const r of rows) {
    lines.push([
      r.uid, r.displayName, r.email, r.institution, r.rank,
      r.joinedAt ? new Date(r.joinedAt).toISOString() : "",
      r.keystoneCount, r.missionsInProgress.join("|"),
    ].map(esc).join(","));
  }
  return lines.join("\n");
}
