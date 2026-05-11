/**
 * FUTUREPROOF — Personalized Learning Portfolio
 *
 * Generated post-Mission 6 from the learner's full data trail. Surfaces:
 *   • CEFR growth (pre vs post)
 *   • Token economy summary
 *   • Mission-by-mission decisions and feedback
 *   • Pitch Capsule (linked)
 *   • Voice of the Learner reflections (linked)
 *   • Ranks earned
 *   • A "Future Plan" section the learner writes themselves
 *
 * Data is assembled from:
 *   /users/$uid/profile/*
 *   /users/$uid/learnerProfile
 *   /tokens/$tid/balance + /ledger
 *   /decisions/* (sample of best feedback)
 *   /artifacts/$tid (pitch capsule)
 *   /reflections/$uid
 *
 * Falls back to a preview portfolio when Firebase isn't connected.
 */

import { isFirebaseAvailable } from "./auth.js";

export const RANKS = ["cadet", "fieldAgent", "analyst", "strategist", "director", "ambassador"];

export const RANK_DESCRIPTORS = {
  cadet:        "Mission-readiness assessed.",
  fieldAgent:   "Recon and Decode complete.",
  analyst:      "Deploy complete — applied under pressure.",
  strategist:   "Dissect complete — analytic leverage identified.",
  director:     "Tribunal complete — ethical position defended.",
  ambassador:   "Pitch Capsule submitted.",
};

const PREVIEW_PORTFOLIO = {
  displayName: "Niran",
  rank: "ambassador",
  joined: Date.now() - 35 * 86400_000,
  cefrPre: "B1",
  cefrPost: "B2",
  vocabularyPercentile: 88,
  criticalThinkingPercentile: 92,
  analyticalPercentile: 91,
  collaborationOrientation: 0.91,
  tokensEarned: 137,
  tokensSpent: 45,
  missionsCompleted: 6,
  pitchCapsuleTitle: "The Chao Phraya Salt Wedge",
  reflectionCount: 7,
  highlightedFeedback: [
    {
      mission: "Mission 04 (Dissect)",
      growthEdge: "You named two leverage points — the next step is staking your case for which is *more* central, not just listing both.",
    },
    {
      mission: "Mission 05 (Tribunal)",
      growthEdge: "You handled the third counterargument by refining your position rather than retreating. Keep that move.",
    },
  ],
};

export async function buildPortfolio(uid) {
  if (!uid || !isFirebaseAvailable()) return { source: "preview", data: PREVIEW_PORTFOLIO };

  const fb = await import("./firebase-init.js");
  const [pub, priv, profile, reflections] = await Promise.all([
    fb.readPath(fb.paths.userPublic(uid)),
    fb.readPath(fb.paths.userPrivate(uid)),
    fb.readPath(fb.paths.learnerProfile(uid)),
    fb.readPath(fb.paths.reflections(uid)),
  ]);

  // Solo runs use uid as tid; team runs would resolve via /users/$uid/teamId
  const tid = uid;
  const [team, ledger, artifact] = await Promise.all([
    fb.readPath(fb.paths.team(tid)),
    fb.readPath(`${fb.paths.tokens(tid)}/ledger`),
    fb.readPath(fb.paths.artifact(tid)),
  ]);

  let tokensEarned = 0, tokensSpent = 0;
  if (ledger) {
    for (const k of Object.keys(ledger)) {
      const e = ledger[k];
      if (typeof e?.delta === "number") {
        if (e.delta > 0) tokensEarned += e.delta;
        else tokensSpent += -e.delta;
      }
    }
  }

  const reflectionCount = reflections
    ? Object.values(reflections).reduce((sum, kindBucket) => sum + Object.keys(kindBucket || {}).length, 0)
    : 0;

  return {
    source: "live",
    data: {
      displayName: pub?.displayName || "Operator",
      rank: pub?.rank || "cadet",
      joined: pub?.joinedAt || null,
      cefrPre: profile?.rawSubscores ? cefrFromComposite(profile.rawSubscores.languageComposite / 100) : profile?.cefrEstimate,
      cefrPost: profile?.cefrEstimate || "B1",
      vocabularyPercentile: profile?.vocabularyScore || null,
      criticalThinkingPercentile: profile?.criticalThinkingPercentile || null,
      analyticalPercentile: profile?.analyticalPercentile || null,
      collaborationOrientation: profile?.collaborationOrientation || null,
      tokensEarned,
      tokensSpent,
      missionsCompleted: countCompletedMissions(team),
      pitchCapsuleTitle: artifact?.panels?.["01"]?.title || null,
      pitchCapsuleSubmitted: !!artifact?.submittedToHallAt,
      reflectionCount,
      highlightedFeedback: [], // populated by Cloud Function in production from top-scoring decisions
    },
  };
}

function countCompletedMissions(team) {
  if (!team?.completedMissions) return 0;
  return Object.keys(team.completedMissions).length;
}

function cefrFromComposite(composite) {
  if (composite < 0.30) return "A2";
  if (composite < 0.50) return "B1";
  if (composite < 0.70) return "B1+";
  if (composite < 0.85) return "B2";
  return "C1";
}

/* ──────────────────────────────────────────────────────────────────
 * Future Plan — the student writes this section themselves
 * ──────────────────────────────────────────────────────────────── */

const PLAN_KEY = "fp_future_plan_v1";

export function loadFuturePlan() { return localStorage.getItem(PLAN_KEY) || ""; }
export function saveFuturePlan(text) { localStorage.setItem(PLAN_KEY, text); }

export async function persistFuturePlan(uid, text) {
  if (!isFirebaseAvailable() || !uid) return { saved: false };
  const fb = await import("./firebase-init.js");
  await fb.writePath(`${fb.paths.userPublic(uid)}/futurePlan`, { text, savedAt: Date.now() });
  return { saved: true };
}

/* ──────────────────────────────────────────────────────────────────
 * PDF export — reuse Studio's html2pdf loader
 * ──────────────────────────────────────────────────────────────── */

export async function exportPortfolioPdf(elementId, displayName) {
  const { exportPdf } = await import("./studio.js");
  const filename = `futureproof-portfolio-${(displayName || "operator").toLowerCase().replace(/\s+/g, "-")}.pdf`;
  return exportPdf(elementId, filename);
}
