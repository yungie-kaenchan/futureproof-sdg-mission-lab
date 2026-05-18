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
  const [user, consents, progress] = await Promise.all([
    m.readPath(`users/${uid}`),
    m.readPath(m.paths.consents(uid)),
    m.readPath(m.paths.progress(uid)),
  ]);
  return { uid, user: user || {}, consents: consents || {}, progress: progress || {} };
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
