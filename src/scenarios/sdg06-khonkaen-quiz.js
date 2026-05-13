/**
 * FUTUREPROOF — SDG 6 Khon Kaen — Mission 1 Adaptive Quiz Bank
 *
 * 6 scenario-specific items with:
 *   - Diegetic Field Mentor framing
 *   - Confidence × correctness token matrix
 *   - Per-option diagnostic feedback
 *   - Adaptive next-item logic (scaffold reveal on wrong+high)
 *
 * Item types:
 *   "mcq"      — single-choice (radio)
 *   "rank"     — drag-rank 1..4
 *   "match"    — drag-match pairs
 *   "multi"    — multi-select (choose 2 of N)
 *   "open"     — free text (not auto-scored, logged for M5 callback)
 */

/* Token payoff matrix — used by every item */
export const TOKEN_MATRIX = {
  correct: { high: 3, medium: 2, low: 1 },
  wrong:   { high: -2, medium: -1, low: 0 },
};

/* Confidence levels — pills shown to student */
export const CONFIDENCE_LEVELS = [
  { id: "low",    label: "Low",    th: "ต่ำ",    description: "Just guessing." },
  { id: "medium", label: "Medium", th: "ปานกลาง", description: "Reasonably sure." },
  { id: "high",   label: "High",   th: "สูง",    description: "Confident." },
];

/* The six M1 quiz items, in administration order */
export const QUIZ_ITEMS = [

  /* ─── Q1 — Foundational fact (easy) ─── */
  {
    id: "q1",
    order: 1,
    type: "mcq",
    difficulty: "easy",
    diegeticFrame: "Before we brief the council, let's confirm what we just heard. Three of these statements appear in your dossier. One does not.",
    stem: "Which statement is NOT supported by the dossier?",
    options: [
      { id: "a", text: "The Khorat Plateau aquifer is shared between Thailand and Laos.",
        feedback: "Supported. This is the dossier's opening anchor — the aquifer is a recognised transboundary system." },
      { id: "b", text: "The Ubolratana Reservoir has dropped to zero usable capacity in three separate dry seasons within the past decade.",
        feedback: "Supported. The three drought years (2016, 2019, 2020) are cited explicitly in Part 1 of the dossier." },
      { id: "c", text: "The proposed twelve-well expansion will draw from a layer that has no hydrogeological connection to household wells.",
        feedback: "Right answer. The dossier presents this as a CONTESTED claim. Source A asserts it; Source B disputes it on the grounds that vertical leakage between layers is partial, not absolute. Watch for this in Mission 2." },
      { id: "d", text: "The Groundwater Act B.E. 2520 (1977) regulates well permits nationally.",
        feedback: "Supported. The 1977 Act is named in Part 1 and is the legal basis for the council's mandate." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 1 of the dossier. Focus on the paragraph about the new wells — what is the dossier actually claiming vs. what is being disputed?",
      highlightDossierId: "part1",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q2 — Source-provenance ranking (medium-hard) ─── */
  {
    id: "q2",
    order: 2,
    type: "rank",
    difficulty: "medium",
    diegeticFrame: "The council will want to know why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Is the proposed wellfield expansion safe for the aquifer?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "kku",   text: "Groundwater Research Institute (GWRI) working paper, KKU (peer-affiliated)" },
      { id: "dgr",   text: "Department of Groundwater Resources monitoring report (2024)" },
      { id: "coal",  text: "Northeast Water Sustainability Coalition member brief (industry association)" },
      { id: "opinion", text: "Provincial newspaper opinion column" },
    ],
    correctOrder: ["kku", "dgr", "coal", "opinion"],
    tokenPolicy: "rank-partial",  // exact = +8, adjacent swap = +5, reversed top with bottom intact = +3, industry/opinion at top = -3
    diagnostic: {
      summary: "Peer-affiliated academic work is weighted above an official agency report in this scenario because: methodology is transparent, conflict-of-interest is structurally lower, and the agency's report relies in part on monitoring infrastructure designed under the same 1977 framework being assessed.",
      trapNote: "If you put the Coalition brief or the opinion column at the top, that's the trap — industry briefs carry real technical insight but conflict of interest must be disclosed and weighted accordingly.",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority arguments lose to evidence arguments. A council will not be convinced by 'they are well-known.' What makes a source defensible: methodology disclosure, recency of data, and disclosure of conflicts of interest.",
    },
  },

  /* ─── Q3 — Stakeholder-interest matching ─── */
  {
    id: "q3",
    order: 3,
    type: "match",
    difficulty: "medium",
    diegeticFrame: "You just heard four voices. Match each to the concern they raised most strongly.",
    stem: "Match each stakeholder to their primary concern.",
    leftItems: [
      { id: "farmer",   text: "Smallholder rice farmer" },
      { id: "pwa",      text: "PWA Operations Manager" },
      { id: "plant",    text: "Food-processing facility Director" },
      { id: "vhv",      text: "Community Health Volunteer" },
    ],
    rightItems: [
      { id: "well",     text: "Shallow well running dry by March" },
      { id: "mandate",  text: "Statutory mandate to supply ~200,000 residents" },
      { id: "permit",   text: "Predictable regulatory environment / permit predictability" },
      { id: "health",   text: "Diarrhoea in children + dehydration in elderly during shortages" },
    ],
    correctPairs: {
      farmer: "well",
      pwa: "mandate",
      plant: "permit",
      vhv: "health",
    },
    tokenPolicy: "match-partial",  // 4/4 = +5, 3/4 = +3, 2/4 = +2, else 0
    afterCorrect: "Each of these stakeholders also has a HIDDEN concern. You'll discover those in Mission 4.",
    afterCorrectTh: "ผู้มีส่วนได้ส่วนเสียแต่ละคนยังมีความกังวลที่ซ่อนอยู่ คุณจะค้นพบในภารกิจที่ 4",
    scaffold: {
      trigger: "low",
      message: "Re-play the stakeholder audio dispatches. Each voice opens with their core concern in the first 10 seconds.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The council uses precise technical vocabulary. Pick the word that completes this sentence the way a hydrogeologist or policy officer would.",
    stem: "\"Once the aquifer is drawn down beyond a critical ______, brine from deeper rock-salt zones can move upward and contaminate freshwater supplies.\"",
    options: [
      { id: "a", text: "limit",     feedback: "'Limit' is close but generic. Policy and hydrogeology use 'threshold' specifically because it implies a point beyond which behaviour changes qualitatively, not just quantitatively." },
      { id: "b", text: "threshold", feedback: "Correct. 'Threshold' is the precise term — and Source B uses it as a probability function, not a single line. This distinction matters in Mission 5." },
      { id: "c", text: "edge",      feedback: "'Edge' is metaphorical, not technical." },
      { id: "d", text: "gate",      feedback: "'Gate' is not used in hydrogeological context." },
    ],
    correct: ["b"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3 of the dossier. The exact term you need appears once there.",
      highlightDossierId: "part3",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q5 — Confidence trap (hard, deliberate) ─── */
  {
    id: "q5",
    order: 5,
    type: "mcq",
    difficulty: "hard",
    isConfidenceTrap: true,
    diegeticFrame: "This one is harder than it looks. Read carefully.",
    stem: "Which of these is the strongest reason to weight Source B above Source A in this dossier?",
    options: [
      { id: "a", text: "Source B is from a university and universities are usually more trustworthy.",
        feedback: "Tempting but weak. Institutional reputation alone is an authority argument, not an evidence argument. A council will not be convinced by 'they are from a university.'" },
      { id: "b", text: "Source A is shorter, which suggests it is less rigorous.",
        feedback: "Wrong. Length and rigour are not the same. A short rigorous note can be more defensible than a long unrigorous one." },
      { id: "c", text: "Source B cites recent monitoring data and discloses methodology; Source A cites a fifty-year-old permit framework and is published by an interested party.",
        feedback: "Correct — and this is the answer you want to use in your Mission 2 brief. Three weighing criteria stacked: recency, methodology disclosure, and conflict of interest." },
      { id: "d", text: "Source B was published in January 2026 and Source A in February 2026, so Source B is more recent.",
        feedback: "Wrong. Source A is actually more recent by one month. Source B's edge is methodological, not chronological." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — confidence-in-authority — is the easy answer that won't survive cross-examination. The token penalty for choosing it with high confidence is deliberately severe.",
    scaffold: {
      trigger: "wrong",
      message: "When you weigh two sources, three criteria matter: WHO produced it (provenance + COI), HOW the claim is grounded (methodology), and WHEN the underlying data was collected (recency). Authority alone is not a criterion.",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q6 — Open prompt capstone (transitions to M2) ─── */
  {
    id: "q6",
    order: 6,
    type: "open",
    difficulty: "open",
    diegeticFrame: "One last thing before you brief the council. In one sentence, name the single most important piece of evidence you would use to support your eventual recommendation — whatever that recommendation turns out to be. You will refer back to this in Mission 5.",
    stem: "Your evidence commitment (15–40 words):",
    placeholder: "e.g. \"The GWRI working paper's finding that vertical leakage between aquifer layers is partial, not absolute.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },  // sincere submission = +2; no penalty for any submission
    longitudinalCallback: {
      mission: 5,
      promptIfMissing: "In Mission 1 you named [evidence] as your most important piece of evidence. Where does it appear in your final position?",
    },
  },
];

/* ─── Token cap — quiz bank cannot award more than +25 in M1 ─── */
export const QUIZ_TOKEN_CAP = 25;

/* ─── Helper: compute token award for an answer ─── */
export function computeTokenAward(item, answer, confidence) {
  if (item.type === "open") {
    return answer && answer.trim().split(/\s+/).filter(Boolean).length >= (item.minWords || 8)
      ? (item.tokens?.onSubmit || 2)
      : 0;
  }

  if (item.type === "mcq") {
    const isCorrect = (item.correct || []).includes(answer);
    return isCorrect ? TOKEN_MATRIX.correct[confidence] : TOKEN_MATRIX.wrong[confidence];
  }

  if (item.type === "rank") {
    // exact = +8, adjacent swap of any one adjacent pair = +5, reversed top two with bottom two intact = +3, trap = -3
    const correct = item.correctOrder;
    const given = answer; // array of ids in student order
    if (!given || given.length !== correct.length) return 0;
    if (correct.every((id, i) => given[i] === id)) return 8;
    // Trap: industry or opinion at top
    if (given[0] === "coal" || given[0] === "opinion") return -3;
    // Adjacent swap: exactly one pair swapped
    let swaps = 0, swapPositions = [];
    for (let i = 0; i < correct.length - 1; i++) {
      if (given[i] === correct[i + 1] && given[i + 1] === correct[i]) {
        swaps++; swapPositions.push(i);
      }
    }
    if (swaps === 1 && correct.every((id, i) => given[i] === id || given[i] === correct[i + (given[i + 1] === correct[i] ? 1 : -1)] || true)) {
      // Approximate: just check that top two and bottom two are intact as sets but in adjacent-swapped order
      const topMatch = (given[0] === correct[0] && given[1] === correct[1]) || (given[0] === correct[1] && given[1] === correct[0]);
      const botMatch = (given[2] === correct[2] && given[3] === correct[3]) || (given[2] === correct[3] && given[3] === correct[2]);
      if (topMatch && !botMatch) return 5;
      if (!topMatch && botMatch) return 5;
      if (topMatch && botMatch) return 5;
    }
    // Reversed top-two with bottom-two intact (or vice versa)
    if (given[0] === correct[1] && given[1] === correct[0] && given[2] === correct[2] && given[3] === correct[3]) return 3;
    return 0;
  }

  if (item.type === "match") {
    let correctCount = 0;
    for (const key of Object.keys(item.correctPairs)) {
      if (answer && answer[key] === item.correctPairs[key]) correctCount++;
    }
    if (correctCount === 4) return 5;
    if (correctCount === 3) return 3;
    if (correctCount === 2) return 2;
    return 0;
  }

  return 0;
}

/* ─── Helper: determine if scaffold should fire ─── */
export function shouldShowScaffold(item, answer, confidence, tokenAward) {
  if (item.type === "open") return false;
  if (item.scaffold?.trigger === "wrong" && tokenAward < 0) return true;
  if (item.scaffold?.trigger === "low" && tokenAward <= 0) return true;
  if (item.scaffold?.trigger === "trap" && tokenAward === -3) return true;
  return false;
}
