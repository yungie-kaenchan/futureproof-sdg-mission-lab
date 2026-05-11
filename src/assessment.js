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
 * NOTE: The writing prompt currently uses a length / coverage heuristic.
 * In Day 9+ this should be replaced with a Claude API call that returns a
 * CEFR-aligned rubric score. The interface (writingHeuristic → number 0-1)
 * stays; only the implementation changes.
 */

/* ──────────────────────────────────────────────────────────────────
 * Section 1 — Language Proficiency
 * ──────────────────────────────────────────────────────────────── */

export const CLOZE_PASSAGE = {
  intro: "Read the passage. Pick the best word for each blank.",
  thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
  text: [
    "Coastal salinity in the Chao Phraya estuary has",
    { blank: 1, options: ["risen", "raised", "rosed", "raise"], answer: "risen", level: "B1" },
    "steadily over the past decade. Local farmers report that the",
    { blank: 2, options: ["salt", "salty", "saltness", "salinity"], answer: "salinity", level: "B2" },
    "has begun to threaten rice yields, while urban planners",
    { blank: 3, options: ["concerns", "are concerning", "are concerned", "concern"], answer: "are concerned", level: "B1" },
    "about long-term water security. Although several pilot programs have been",
    { blank: 4, options: ["lounched", "launched", "launchened", "launchen"], answer: "launched", level: "B1" },
    "no integrated solution has yet",
    { blank: 5, options: ["emerged", "emergence", "emerging", "emerge"], answer: "emerged", level: "B2" },
    ".",
  ],
};

export const VOCAB_ITEMS = [
  {
    id: "v1", level: "A2",
    prompt: "Choose the meaning closest to: <em>steadily</em>",
    options: ["loudly", "in a careful, regular way", "by accident", "without effort"],
    answer: 1,
  },
  {
    id: "v2", level: "B1",
    prompt: "Choose the meaning closest to: <em>threaten</em>",
    options: ["protect", "make smaller", "put at risk", "celebrate"],
    answer: 2,
  },
  {
    id: "v3", level: "B1",
    prompt: "Choose the meaning closest to: <em>integrated</em>",
    options: ["broken into pieces", "combined into a whole", "delayed", "approved"],
    answer: 1,
  },
  {
    id: "v4", level: "B2",
    prompt: "Choose the meaning closest to: <em>mitigate</em>",
    options: ["measure", "reduce in severity", "approve formally", "celebrate"],
    answer: 1,
  },
  {
    id: "v5", level: "B2",
    prompt: "Choose the meaning closest to: <em>stakeholder</em>",
    options: ["a person who owns shares only", "anyone affected by a decision", "a government regulator", "a referee"],
    answer: 1,
  },
  {
    id: "v6", level: "C1",
    prompt: "Choose the meaning closest to: <em>contingent on</em>",
    options: ["dependent on", "opposed to", "the cause of", "additional to"],
    answer: 0,
  },
  {
    id: "v7", level: "C1",
    prompt: "Choose the meaning closest to: <em>tacit</em>",
    options: ["loud and clear", "agreed without being stated", "questioned", "violent"],
    answer: 1,
  },
  {
    id: "v8", level: "C1",
    prompt: "Choose the meaning closest to: <em>preempt</em>",
    options: ["respond afterward", "act first to prevent", "give permission", "celebrate"],
    answer: 1,
  },
];

export const WRITING_PROMPT = {
  prompt: "In 60–100 words, describe a problem in your community that you'd want to investigate. Who is affected? Why does it matter?",
  thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายปัญหาในชุมชนของคุณที่คุณอยากสืบสวน ใครได้รับผลกระทบ และทำไมจึงสำคัญ",
  minWords: 50,
  maxWords: 130,
};

/* ──────────────────────────────────────────────────────────────────
 * Section 2 — Critical Thinking
 * ──────────────────────────────────────────────────────────────── */

export const CRITICAL_ITEMS = [
  {
    id: "c1",
    type: "validInference",
    stem: "A study finds that students who eat breakfast score higher on math tests. The headline reads: \"Eating breakfast makes you better at math.\"",
    question: "What is the most accurate critique of the headline?",
    options: [
      "The headline is correct because the study showed the connection.",
      "The headline confuses correlation with causation; another factor (e.g., household stability) might explain both.",
      "The headline is wrong because breakfast is not related to math.",
      "The headline is correct only if the study had over 1,000 students.",
    ],
    answer: 1,
  },
  {
    id: "c2",
    type: "fallacyId",
    stem: "\"Either we ban single-use plastics completely, or we accept that the oceans will die.\"",
    question: "Which reasoning flaw does this statement contain?",
    options: [
      "Ad hominem attack",
      "False dichotomy",
      "Appeal to authority",
      "Circular reasoning",
    ],
    answer: 1,
  },
  {
    id: "c3",
    type: "fallacyId",
    stem: "\"Dr. Lee says this policy will work, and Dr. Lee has a PhD, so the policy will work.\"",
    question: "Which reasoning flaw does this statement contain?",
    options: [
      "Slippery slope",
      "Appeal to authority (without engaging the argument)",
      "Strawman",
      "False analogy",
    ],
    answer: 1,
  },
  {
    id: "c4",
    type: "argEval",
    stem: "Premise: Higher minimum wage may reduce entry-level jobs in some sectors. Premise: Higher minimum wage also raises consumer spending. Conclusion: Therefore minimum wage policy must consider both effects.",
    question: "Is the conclusion well-supported by the premises?",
    options: [
      "Yes — the conclusion modestly follows from acknowledging both effects.",
      "No — the premises contradict each other.",
      "No — the conclusion goes far beyond the premises.",
      "Yes — but only if we accept one premise and reject the other.",
    ],
    answer: 0,
  },
];

/* ──────────────────────────────────────────────────────────────────
 * Section 3 — Analytical Thinking
 * ──────────────────────────────────────────────────────────────── */

export const ANALYTICAL_ITEMS = [
  {
    id: "a1",
    table: {
      caption: "Reported air-quality index (AQI) by district, weekday averages, 2025",
      headers: ["District", "Mon", "Tue", "Wed", "Thu", "Fri"],
      rows: [
        ["A", 78, 82, 85, 88, 95],
        ["B", 60, 61, 62, 60, 64],
        ["C", 91, 70, 92, 71, 93],
      ],
    },
    question: "Which conclusion is best supported by the data?",
    options: [
      "District B has the worst air quality.",
      "District A's AQI rises steadily across the week.",
      "District C's AQI is exactly twice District B's.",
      "All three districts have similar weekly patterns.",
    ],
    answer: 1,
  },
  {
    id: "a2",
    table: {
      caption: "Survey: percentage of respondents identifying each issue as their top community concern, by age band",
      headers: ["Age band", "Water", "Air", "Jobs", "Education"],
      rows: [
        ["18–24", 18, 22, 30, 30],
        ["25–34", 22, 25, 35, 18],
        ["35–49", 28, 30, 22, 20],
        ["50+",   34, 24, 18, 24],
      ],
    },
    question: "Which statement is best supported?",
    options: [
      "Concern about jobs decreases as age increases.",
      "Education is the top concern across all age bands.",
      "Water concern is identical across age bands.",
      "Older respondents care more about jobs than younger ones.",
    ],
    answer: 0,
  },
  {
    id: "a3",
    table: {
      caption: "Recycling participation: % of households reporting active recycling, by district and quarter",
      headers: ["District", "Q1", "Q2", "Q3", "Q4"],
      rows: [
        ["X", 40, 42, 45, 47],
        ["Y", 60, 58, 55, 52],
        ["Z", 50, 50, 50, 50],
      ],
    },
    question: "Which inference is best supported?",
    options: [
      "District Z's program is failing.",
      "District X is improving while District Y is declining.",
      "District Y has the lowest current participation.",
      "Recycling has declined overall.",
    ],
    answer: 1,
  },
];

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
  const profile = {
    cefrEstimate: scored.language.cefrEstimate,
    vocabularyScore: scored.language.vocabulary,
    criticalThinkingPercentile: scored.criticalThinkingPercentile,
    analyticalPercentile: scored.analyticalPercentile,
    collaborationOrientation: scored.collaborationOrientation,
    assessedAt: scored.completedAt,
    version: scored.version,
    rawSubscores: {
      cloze: scored.language.cloze,
      writing: scored.language.writing,
      languageComposite: scored.language.composite,
    },
  };
  await fb.writePath(fb.paths.learnerProfile(uid), profile);
  return profile;
}
