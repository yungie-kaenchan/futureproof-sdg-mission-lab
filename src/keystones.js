/**
 * FUTUREPROOF v2 — SDG Keystones
 *
 * The journey's progression currency. Distinct from Insight Tokens:
 *   • Insight Tokens (tokens.js)  → spendable, earned per-stage, scaffolding shop
 *   • SDG Keystones  (this file)  → NOT spendable, one per mission passed (max 6),
 *                                   they are narrative keys that unlock the Final Task
 *
 * Spec: /docs/RECONSTRUCTION-MASTER.md §3.1–§3.3
 *
 * Storage (RTDB): users/{uid}/keystones/{missionId} =
 *   { earnedAt: <ms>, source: 'mission'|'teacher-override'|'demo', reason: <string> }
 *
 * A Keystone is IDEMPOTENT and BINARY — earning it twice does not double-count;
 * it is never graded. Mission *scores* live elsewhere; the Keystone only records
 * "this learner met the bar for this mission."
 */

import { getFlowState, isFirebaseAvailable } from "./auth.js";

/* The six journey missions (LOCKED — Reconstruction Master §2). Order here is
   canonical for counting only; learners may complete them in ANY order. */
export const JOURNEY_MISSIONS = [
  { id: "sdg06-khonkaen",   sdg: 6,  region: "Northeast", title: "The Aquifer Below Khon Kaen" },
  { id: "sdg13-chiangmai",  sdg: 13, region: "North",     title: "The Burning Season" },
  { id: "sdg11-bangkok",    sdg: 11, region: "Central",   title: "The Klong and the City" },
  { id: "sdg14-andaman",    sdg: 14, region: "South",     title: "The Reef and the Tide" },
  { id: "sdg04-takmaesot",  sdg: 4,  region: "West",      title: "The Children at the Border" },
  { id: "sdg03-eecfringe",  sdg: 3,  region: "East",      title: "The Village the Boom Left Behind" },
];

export const TOTAL_KEYSTONES = JOURNEY_MISSIONS.length; // 6

/* ──────────────────────────────────────────────────────────────────
 * Demo / judge bypass
 *
 * Pre-grants all 6 Keystones so judges can reach the Final Task in a
 * short demo without completing the full journey. Deliberately NOT
 * exposed in normal navigation. Active ONLY when BOTH are true:
 *   1. URL contains ?demo=keystones
 *   2. Demo mode is explicitly enabled (config flag OR a dev localStorage opt-in)
 * This double-gate prevents a learner from accidentally skipping the journey.
 * ──────────────────────────────────────────────────────────────── */
export function isDemoBypassActive() {
  try {
    const params = new URLSearchParams(location.search);
    if (params.get("demo") !== "keystones") return false;
    const cfgFlag = (typeof window !== "undefined" && window.FP_CONFIG && window.FP_CONFIG.DEMO_MODE === true);
    const devFlag = (() => { try { return localStorage.getItem("fp_demo_mode") === "on"; } catch (_) { return false; } })();
    return Boolean(cfgFlag || devFlag);
  } catch (_) {
    return false;
  }
}

/* ──────────────────────────────────────────────────────────────────
 * Read
 * ──────────────────────────────────────────────────────────────── */

/** Returns a map { missionId: keystoneRecord } of earned Keystones. */
export async function getKeystones(uid) {
  if (!uid || !isFirebaseAvailable()) return {};
  // Resilient by design: a failed/timed-out cloud read (network blip, quota,
  // placeholder config) must NOT halt the caller — mission-select and the
  // final-task capstone both await this at module top level, so a throw here
  // would leave those pages blank. Degrade to "no keystones yet" instead.
  try {
    const fb = await import("./firebase-init.js");
    const data = await fb.readPath(fb.paths.keystones(uid));
    return data && typeof data === "object" ? data : {};
  } catch (_) {
    return {};
  }
}

/** Count of earned Keystones (0–6). Demo bypass returns TOTAL immediately. */
export async function getKeystoneCount(uid) {
  if (isDemoBypassActive()) return TOTAL_KEYSTONES;
  const ks = await getKeystones(uid);
  // Only count canonical mission ids — guards against stray writes.
  const valid = JOURNEY_MISSIONS.map((m) => m.id);
  return Object.keys(ks).filter((k) => valid.includes(k)).length;
}

/** Has this specific mission's Keystone been earned? */
export async function hasKeystone(uid, missionId) {
  if (isDemoBypassActive()) return true;
  const ks = await getKeystones(uid);
  return Boolean(ks[missionId]);
}

/** Is the Final Task unlocked? (all 6 earned, OR demo bypass) */
export async function isFinalTaskUnlocked(uid) {
  if (isDemoBypassActive()) return true;
  return (await getKeystoneCount(uid)) >= TOTAL_KEYSTONES;
}

/* ──────────────────────────────────────────────────────────────────
 * Write
 * ──────────────────────────────────────────────────────────────── */

/**
 * Award a Keystone for a passed mission. Idempotent — if already earned,
 * the original record is preserved (no overwrite, no double-count).
 *
 * @param {string} uid
 * @param {string} missionId   one of JOURNEY_MISSIONS[].id
 * @param {object} [opts]
 * @param {'mission'|'teacher-override'|'demo'} [opts.source='mission']
 * @param {string} [opts.reason]
 * @returns {Promise<{earned:boolean, alreadyHad:boolean}>}
 */
export async function awardKeystone(uid, missionId, opts = {}) {
  const valid = JOURNEY_MISSIONS.some((m) => m.id === missionId);
  if (!valid) throw new Error(`Unknown mission id: ${missionId}`);
  if (!uid || !isFirebaseAvailable()) {
    return { earned: false, alreadyHad: false };
  }
  const fb = await import("./firebase-init.js");
  const path = `${fb.paths.keystones(uid)}/${missionId}`;
  const existing = await fb.readPath(path);
  if (existing) return { earned: true, alreadyHad: true };
  await fb.writePath(path, {
    earnedAt: Date.now(),
    source: opts.source || "mission",
    reason: opts.reason || "Mission passed (composite score ≥ bar).",
  });
  return { earned: true, alreadyHad: false };
}

/**
 * Teacher override — grant a Keystone for assessed offline-equivalent
 * work so a struggling learner is never dead-ended (Spec §3.2).
 * Records the granting teacher + reason for the audit trail.
 */
export async function grantTeacherOverride({ uid, missionId, teacherId, reason }) {
  if (!teacherId) throw new Error("teacherId required for override audit trail.");
  return awardKeystone(uid, missionId, {
    source: "teacher-override",
    reason: `Teacher override by ${teacherId}: ${reason || "offline-equivalent work assessed"}`,
  });
}

/* ──────────────────────────────────────────────────────────────────
 * Convenience for UI (journey map pin states)
 * ──────────────────────────────────────────────────────────────── */

/**
 * Returns mission status objects for rendering the Thailand journey map.
 * status ∈ 'passed' | 'available'
 * (v1 has no hard prerequisite ordering — every mission is 'available'
 *  until passed; gating is only on the Final Task, not between missions.)
 */
export async function getJourneyProgress(uid) {
  const ks = await getKeystones(uid);
  const demo = isDemoBypassActive();
  return JOURNEY_MISSIONS.map((m) => ({
    ...m,
    status: demo || ks[m.id] ? "passed" : "available",
    keystone: demo ? { source: "demo" } : (ks[m.id] || null),
  }));
}

/** Quick helper for the current signed-in user (reads uid from flow state). */
export async function currentUserKeystoneCount() {
  const flow = getFlowState();
  return getKeystoneCount(flow && flow.uid);
}
