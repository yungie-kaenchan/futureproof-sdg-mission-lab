/**
 * FUTUREPROOF v2 — Adaptive Reading-Tier Routing
 *
 * Implements the static tier-on-entry model (Reconstruction Master §5,
 * decision D2). The diagnostic produces a CEFR estimate → mapped once to a
 * reading tier → stored on the learner profile → every mission serves its
 * reading materials at that tier.
 *
 *   Tier 1  A2–B1    most glosses + scaffolds
 *   Tier 2  B1+–B2   baseline (default when unknown)
 *   Tier 3  B2+–C1+  fewest glosses, no scaffolds
 *
 * CRITICAL ASYMMETRY (the Q&A-winning point):
 *   Reading text is tiered. Audio/video are NOT — they are authentic input,
 *   and time-bound listening benefits from controlled stretch *because* the
 *   .vtt caption scaffold exists. This is SLA-correct (Krashen i+1; dual
 *   coding), not a production shortcut. Do not "tier" audio.
 */

import { getFlowState, isFirebaseAvailable } from "./auth.js";

export const TIERS = {
  1: { id: 1, label: "A2–B1",   cefr: ["A2", "B1"],            gloss: "high",     scaffold: true  },
  2: { id: 2, label: "B1+–B2",  cefr: ["B1+", "B2"],           gloss: "standard", scaffold: false },
  3: { id: 3, label: "B2+–C1+", cefr: ["B2+", "C1", "C2"],     gloss: "low",      scaffold: false },
};

export const DEFAULT_TIER = 2; // unknown profile → baseline, never the hardest

/**
 * Map a CEFR estimate string to a reading tier.
 * Accepts forms like "A2", "B1", "B1+", "B2", "C1", "C2" (case-insensitive,
 * tolerant of stray whitespace / "B1 plus" etc.).
 */
export function cefrToTier(cefr) {
  if (!cefr || typeof cefr !== "string") return DEFAULT_TIER;
  const c = cefr.trim().toUpperCase().replace(/\s+/g, "");
  if (c === "A1" || c === "A2" || c === "B1") return 1;
  if (c === "B1+" || c === "B1PLUS" || c === "B2") return 2;
  if (c === "B2+" || c === "B2PLUS" || c === "C1" || c === "C2") return 3;
  // Unrecognised but starts with a band letter — fall back conservatively.
  if (c.startsWith("A")) return 1;
  if (c.startsWith("C")) return 3;
  return DEFAULT_TIER;
}

/**
 * Read the learner's reading tier from their profile (flow-state cached
 * learnerProfile), falling back to DEFAULT_TIER. Never throws.
 */
export function getReadingTier(profile) {
  try {
    const lp = profile || (getFlowState() && getFlowState().learnerProfile);
    if (!lp) return DEFAULT_TIER;
    if (lp.readingTier && TIERS[lp.readingTier]) return lp.readingTier;
    // Derive from CEFR if tier wasn't explicitly stored yet.
    const cefr = lp.cefrEstimate || (lp.language && lp.language.cefrEstimate);
    return cefrToTier(cefr);
  } catch (_) {
    return DEFAULT_TIER;
  }
}

/**
 * Persist the chosen reading tier onto the learner profile. Called once,
 * at the diagnostic-score step (workflow step 5). Best-effort; the local
 * flow-state copy is updated regardless so the UI is immediately correct.
 */
export async function setReadingTier(uid, tier) {
  const t = TIERS[tier] ? tier : DEFAULT_TIER;
  // Update local flow-state copy immediately (snappy UI, offline-safe).
  try {
    const flow = getFlowState() || {};
    const lp = { ...(flow.learnerProfile || {}), readingTier: t };
    const auth = await import("./auth.js");
    auth.setFlowStep(flow.step || "assessment", { learnerProfile: lp });
  } catch (_) { /* non-fatal */ }
  // Best-effort cloud write.
  if (uid && isFirebaseAvailable()) {
    try {
      const fb = await import("./firebase-init.js");
      await fb.writePath(`${fb.paths.learnerProfile(uid)}/readingTier`, t);
    } catch (_) { /* graceful — local copy already set */ }
  }
  return t;
}

/**
 * Given a tiered content object, return the variant for the learner's tier
 * with graceful degradation. Accepts either:
 *   { 1: <a2b1>, 2: <b1b2>, 3: <b2c1> }   (numeric keys)
 *   { tier1: ..., tier2: ..., tier3: ... } (named keys)
 *   <string|object>                         (un-tiered → returned as-is)
 *
 * Fallback order if the exact tier is missing:  tier → 2 → 1 → 3 → first available.
 * This guarantees a mission never renders an empty dossier even if a
 * content author has only written one or two tiers yet.
 */
export function pickTier(tieredContent, tier) {
  if (tieredContent == null) return null;
  // Un-tiered content (plain string/array/object without tier keys) → as-is.
  const looksTiered =
    typeof tieredContent === "object" &&
    !Array.isArray(tieredContent) &&
    (("1" in tieredContent || "2" in tieredContent || "3" in tieredContent) ||
     ("tier1" in tieredContent || "tier2" in tieredContent || "tier3" in tieredContent));
  if (!looksTiered) return tieredContent;

  const get = (n) =>
    tieredContent[n] != null ? tieredContent[n]
    : tieredContent[`tier${n}`] != null ? tieredContent[`tier${n}`]
    : undefined;

  const order = [tier, 2, 1, 3];
  for (const n of order) {
    const v = get(n);
    if (v !== undefined) return v;
  }
  // Last resort: first defined value.
  for (const k of Object.keys(tieredContent)) {
    if (tieredContent[k] != null) return tieredContent[k];
  }
  return null;
}

/** Gloss density for the tier — drives how many vocab tooltips a mission shows. */
export function glossDensity(tier) {
  return (TIERS[tier] || TIERS[DEFAULT_TIER]).gloss; // 'high' | 'standard' | 'low'
}

/** Should this tier receive sentence-starter / graphic-organiser scaffolds? */
export function scaffoldsEnabled(tier) {
  return Boolean((TIERS[tier] || TIERS[DEFAULT_TIER]).scaffold);
}

/** Human-readable tier label, for the diagnostic score report ("your tier = B1+–B2"). */
export function tierLabel(tier) {
  return (TIERS[tier] || TIERS[DEFAULT_TIER]).label;
}
