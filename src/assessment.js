/**
 * FUTUREPROOF — Mission Readiness Assessment
 *
 * Item bank, scoring engine, and Firebase persistence for the four-dimension
 * competency diagnostic that produces the team-wide learnerProfile.
 *
 * Dimensions:
 *   1. Language Proficiency — cloze + vocabulary + short writing prompt
 *   2. Critical Thinking    — argument analysis + fallacy identification
 *   3. Analytical Thinking  — data interpretation
 *   4. Collaboration        — Likert self-assessment
 *
 * PARALLEL TEST SETS: each user is deterministically assigned ONE of N
 * matched-difficulty parallel test sets (see assessment-sets.js). The set is
 * picked from the user's UID via FNV-1a hash, so the same user always gets
 * the same set across sessions and devices. This deters answer-sharing
 * between cohorts.
 *
 * NOTE: The writing prompt currently uses a length / coverage heuristic.
 * In Day 9+ this should be replaced with a Claude API call that returns a
 * CEFR-aligned rubric score. The interface (writingHeuristic → number 0-1)
 * stays; only the implementation changes.
 */

import { ASSESSMENT_SETS, getAssessmentSet, pickSetIndexForUser } from "./assessment-sets.js";
export { ASSESSMENT_SETS, getAssessmentSet, pickSetIndexForUser };

/* ──────────────────────────────────────────────────────────────────
 * Per-user set resolution
 *
 * At module load, we pick the set that matches the currently-signed-in user
 * (read from the same fp_flow localStorage blob used by auth.js). If no user
 * is signed in yet, fall back to set 0 — the original Coastal Salinity set.
 *
 * Pages that already use the named exports (CLOZE_PASSAGE, VOCAB_ITEMS, ...)
 * keep working — they automatically receive the items from the user's
 * assigned set.
 * ──────────────────────────────────────────────────────────────── */

function readUidFromLocal() {
  try {
    const raw = localStorage.getItem("fp_flow");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.uid ? parsed.uid : null;
  } catch (_) { return null; }
}

const ACTIVE_UID = readUidFromLocal();
export const ACTIVE_SET_INDEX = pickSetIndexForUser(ACTIVE_UID);
const ACTIVE_SET = ASSESSMENT_SETS[ACTIVE_SET_INDEX];

/* ──────────────────────────────────────────────────────────────────
 * Section 1 — Language Proficiency (sourced from active set)
 * ──────────────────────────────────────────────────────────────── */

export const CLOZE_PASSAGE = ACTIVE_SET.cloze;

export const VOCAB_ITEMS = ACTIVE_SET.vocab;

export const WRITING_PROMPT = ACTIVE_SET.writing;

/* ──────────────────────────────────────────────────────────────────
 * Section 2 — Critical Thinking (sourced from active set)
 * ──────────────────────────────────────────────────────────────── */

export const CRITICAL_ITEMS = ACTIVE_SET.critical;

/* ──────────────────────────────────────────────────────────────────
 * Section 3 — Analytical Thinking (sourced from active set)
 * ──────────────────────────────────────────────────────────────── */

export const ANALYTICAL_ITEMS = ACTIVE_SET.analytical;

/* ──────────────────────────────────────────────────────────────────
 * Section 4 — Collaboration Orientation (Likert)
 * ──────────────────────────────────────────────────────────────── */

export const COLLAB_ITEMS = [
  { id: "k1", text: "When my team disagrees, I push to make sure every voice is heard before we decide." },
  { id: "k2", text: "I'm comfortable changing my mind when a teammate offers strong evidence." },
  { id: "k3", text: "I prefer to figure things out alone before bringing them to the team." , reverse: true },
  { id: "k4", text: "I notice when a quieter teammate has been waiting to speak." },
  { id: "k5", text: "I'd rather move forward with a 'good enough' plan than wait for full agreement.", reverse: true },
  { id: "k6", text: "I take responsibility when something I worked on doesn't land as intended." },
];

export const LIKERT_LABELS = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

/* ──────────────────────────────────────────────────────────────────
 * Scoring
 * ──────────────────────────────────────────────────────────────── */

function scoreCloze(answers) {
  let correct = 0;
  let total = 0;
  for (const segment of CLOZE_PASSAGE.text) {
    if (typeof segment === "object") {
      total += 1;
      if (answers[segment.blank] === segment.answer) correct += 1;
    }
  }
  return total === 0 ? 0 : correct / total;
}

function scoreVocab(answers) {
  let correct = 0;
  for (const item of VOCAB_ITEMS) {
    if (answers[item.id] === item.answer) correct += 1;
  }
  return correct / VOCAB_ITEMS.length;
}

/**
 * Heuristic writing scorer for the pre-AI build.
 * Replaced by a Claude API rubric call once the proxy is live.
 */
function writingHeuristic(text) {
  if (!text) return 0;
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lengthScore = wordCount < WRITING_PROMPT.minWords ? wordCount / WRITING_PROMPT.minWords
                    : wordCount > WRITING_PROMPT.maxWords ? Math.max(0.6, 1 - (wordCount - WRITING_PROMPT.maxWords) / WRITING_PROMPT.maxWords)
                    : 1;
  const uniqueRatio = new Set(words.map((w) => w.toLowerCase())).size / Math.max(wordCount, 1);
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceLengthAvg = sentences.length ? wordCount / sentences.length : 0;
  const cohesionScore = sentenceLengthAvg >= 6 && sentenceLengthAvg <= 24 ? 1 : 0.6;
  return Math.max(0, Math.min(1, 0.5 * lengthScore + 0.25 * uniqueRatio + 0.25 * cohesionScore));
}

function cefrFromComposite(composite) {
  if (composite < 0.30) return "A2";
  if (composite < 0.50) return "B1";
  if (composite < 0.70) return "B1+";
  if (composite < 0.85) return "B2";
  return "C1";
}

function scoreCritical(answers) {
  let correct = 0;
  for (const item of CRITICAL_ITEMS) {
    if (answers[item.id] === item.answer) correct += 1;
  }
  return correct / CRITICAL_ITEMS.length;
}

function scoreAnalytical(answers) {
  let correct = 0;
  for (const item of ANALYTICAL_ITEMS) {
    if (answers[item.id] === item.answer) correct += 1;
  }
  return correct / ANALYTICAL_ITEMS.length;
}

function scoreCollaboration(answers) {
  let total = 0;
  let n = 0;
  for (const item of COLLAB_ITEMS) {
    const raw = answers[item.id];
    if (typeof raw !== "number") continue;
    const normalized = item.reverse ? (5 - raw) / 4 : (raw - 1) / 4;
    total += normalized;
    n += 1;
  }
  return n === 0 ? 0 : total / n;
}

/**
 * Convert a 0..1 score to a percentile-style integer (0–100).
 * For the diagnostic, this is a calibration approximation; once we have
 * cohort data, replace with quantile lookup.
 */
function asPercentile(score) {
  return Math.round(score * 100);
}

export function scoreAssessment(allAnswers) {
  const cloze = scoreCloze(allAnswers.cloze || {});
  const vocab = scoreVocab(allAnswers.vocab || {});
  const writing = writingHeuristic(allAnswers.writing || "");
  const language = 0.4 * cloze + 0.35 * vocab + 0.25 * writing;
  const critical = scoreCritical(allAnswers.critical || {});
  const analytical = scoreAnalytical(allAnswers.analytical || {});
  const collaboration = scoreCollaboration(allAnswers.collaboration || {});

  return {
    language: {
      cloze: asPercentile(cloze),
      vocabulary: asPercentile(vocab),
      writing: asPercentile(writing),
      composite: asPercentile(language),
      cefrEstimate: cefrFromComposite(language),
    },
    criticalThinkingPercentile: asPercentile(critical),
    analyticalPercentile: asPercentile(analytical),
    collaborationOrientation: collaboration,
    completedAt: Date.now(),
    version: 1,
  };
}

/* ──────────────────────────────────────────────────────────────────
 * Persistence
 * ──────────────────────────────────────────────────────────────── */

export async function saveLearnerProfile(uid, scored) {
  const fb = await import("./firebase-init.js");
  const assignedSet = pickSetIndexForUser(uid);
  const profile = {
    cefrEstimate: scored.language.cefrEstimate,
    vocabularyScore: scored.language.vocabulary,
    criticalThinkingPercentile: scored.criticalThinkingPercentile,
    analyticalPercentile: scored.analyticalPercentile,
    collaborationOrientation: scored.collaborationOrientation,
    assessedAt: scored.completedAt,
    version: scored.version,
    assessmentSet: {
      index: assignedSet,
      theme: ASSESSMENT_SETS[assignedSet]?.theme || "unknown",
    },
    rawSubscores: {
      cloze: scored.language.cloze,
      writing: scored.language.writing,
      languageComposite: scored.language.composite,
    },
  };
  await fb.writePath(fb.paths.learnerProfile(uid), profile);
  return profile;
}
