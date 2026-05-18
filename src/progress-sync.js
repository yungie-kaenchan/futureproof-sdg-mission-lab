/**
 * FUTUREPROOF — Progress sync (durable mid-mission resume)
 *
 * The mission engine already saves its full resumable state to
 * localStorage under  fp_mission_save_<uid>_<missionId>.  That is fast
 * and works offline, but it is per-device and dies on a cache clear.
 *
 * This module mirrors that exact save string to RTDB at
 *   progress/<uid>/<missionId> = { savedAt:<ms>, json:"<verbatim save>" }
 * and hydrates localStorage from the cloud at page entry — so a learner
 * resumes on ANY device and never has to redo a stage.
 *
 * Design rules:
 *  • Verbatim string mirror — we never re-parse the engine's state, so
 *    Sets / nested shapes can't break on the RTDB round-trip.
 *  • Newest-wins — whichever of local vs cloud has the larger savedAt
 *    is authoritative; ties keep local (already loaded, zero work).
 *  • Best-effort — every function swallows its own errors. A sync
 *    failure must NEVER block or corrupt the journey.
 */

import { isFirebaseAvailable } from "./auth.js";

const localKey = (uid, missionId) => `fp_mission_save_${uid}_${missionId}`;

function savedAtOf(jsonString) {
  try {
    const p = JSON.parse(jsonString);
    return (p && typeof p.savedAt === "number") ? p.savedAt : 0;
  } catch (_) { return 0; }
}

/**
 * Pull every cloud save for this user into localStorage when the cloud
 * copy is newer (or local is absent). Call this ONCE at mission-run /
 * mission-select entry, before the engine reads hasSavedState().
 * Resolves (never rejects) when done or skipped.
 */
export async function pullProgressToLocal(uid) {
  if (!uid || !isFirebaseAvailable()) return;
  try {
    const fb = await import("./firebase-init.js");
    const all = await fb.readPath(fb.paths.progress(uid));
    if (!all || typeof all !== "object") return;
    for (const [missionId, rec] of Object.entries(all)) {
      if (!rec || typeof rec.json !== "string") continue;
      const key = localKey(uid, missionId);
      let localSavedAt = 0;
      try { localSavedAt = savedAtOf(localStorage.getItem(key) || ""); } catch (_) {}
      const cloudSavedAt = typeof rec.savedAt === "number" ? rec.savedAt : savedAtOf(rec.json);
      if (cloudSavedAt > localSavedAt) {
        try { localStorage.setItem(key, rec.json); } catch (_) {}
      }
    }
  } catch (_) { /* offline / rules / transient — keep local copy */ }
}

/**
 * Mirror one mission's save string to the cloud. Fire-and-forget:
 * callers should NOT await this on the hot path.
 */
export async function pushProgress(uid, missionId, jsonString) {
  if (!uid || !missionId || !jsonString || !isFirebaseAvailable()) return;
  try {
    const fb = await import("./firebase-init.js");
    await fb.writePath(`${fb.paths.progress(uid)}/${missionId}`, {
      savedAt: savedAtOf(jsonString) || Date.now(),
      json: jsonString,
    });
  } catch (_) { /* best-effort — localStorage already holds the truth */ }
}

/**
 * Remove the cloud snapshot for one mission (used by "Start over" so a
 * stale cloud copy can't resurrect the abandoned attempt next visit).
 */
export async function clearCloudProgress(uid, missionId) {
  if (!uid || !missionId || !isFirebaseAvailable()) return;
  try {
    const fb = await import("./firebase-init.js");
    await fb.writePath(`${fb.paths.progress(uid)}/${missionId}`, null);
  } catch (_) { /* best-effort */ }
}
