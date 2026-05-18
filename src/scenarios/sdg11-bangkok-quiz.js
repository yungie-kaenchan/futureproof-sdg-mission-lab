/**
 * FUTUREPROOF — SDG 11 Bangkok — "The Klong and the City" Adaptive Quiz Bank
 *
 * Same export surface as sdg13-chiangmai-quiz.js so sdg11-bangkok-m1.js
 * can share the proven renderer. 6 scenario-specific items:
 *   Q1 mcq (easy, fact vs. contested) · Q2 rank (source provenance)
 *   Q3 match (stakeholder → primary concern) · Q4 mcq (vocab in context)
 *   Q5 mcq (confidence trap) · Q6 open (evidence commitment → Final Task)
 */

export const TOKEN_MATRIX = {
  correct: { high: 3, medium: 2, low: 1 },
  wrong:   { high: -2, medium: -1, low: 0 },
};

export const CONFIDENCE_LEVELS = [
  { id: "low",    label: "Low",    th: "ต่ำ",     description: "Just guessing." },
  { id: "medium", label: "Medium", th: "ปานกลาง", description: "Reasonably sure." },
  { id: "high",   label: "High",   th: "สูง",     description: "Confident." },
];

export const QUIZ_ITEMS = [

  /* ─── Q1 — Foundational fact vs. contested claim (easy) ─── */
  {
    id: "q1",
    order: 1,
    type: "mcq",
    difficulty: "easy",
    diegeticFrame: "Before we brief the city flood committee, let's confirm what the dossier and the source pair actually establish. Three of these are supported. One is a claim presented as contested.",
    stem: "Which statement does the dossier NOT present as established fact?",
    options: [
      { id: "a", text: "Bangkok sits on a low, subsiding delta, so the flood threat worsens over time rather than staying constant.",
        feedback: "Supported. Part 1 establishes the delta is still slowly subsiding, which is why the hazard is non-stationary." },
      { id: "b", text: "The canal reservation is municipal land, so the city has lawful authority to clear or set back the structures on it.",
        feedback: "Supported. Part 2 states the plan is lawful and the city holds the canal reservation." },
      { id: "c", text: "Building the corridor on its current alignment will solve Bangkok's flooding without displacing the klong-side community.",
        feedback: "Right answer. The dossier deliberately does NOT claim this. Part 3 establishes the opposite — the corridor's current line concentrates a displacement cost on informal-tenure households. A corridor alone does not solve flooding without displacement." },
      { id: "d", text: "Most affected households hold no land title, having built within an inherited, generational occupation pattern.",
        feedback: "Supported. Part 3 explains informal tenure as a structural-legal fact, not a moral failing." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3. Separate what the dossier asserts (the corridor protects the catchment; the displaced hold informal tenure) from the overclaim that a corridor alone fixes flooding without a displacement cost. The dossier never promises a costless corridor.",
      highlightDossierId: "part3",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q2 — Source-provenance ranking (medium-hard) ─── */
  {
    id: "q2",
    order: 2,
    type: "rank",
    difficulty: "medium",
    diegeticFrame: "The committee will ask why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Does proceeding on the current alignment before a funded settlement produce both worse terms and longer delay?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "univ",   text: "University urban-studies / community-network working note (Source B — peer-reviewed practice on comparable Bangkok cases)" },
      { id: "bma",     text: "BMA hydraulic catchment model + flood-operations record (agency dataset)" },
      { id: "agency",  text: "Metropolitan Flood Resilience Programme engineering brief (Source A — the delivering team, with a delivery interest)" },
      { id: "viral",   text: "Viral social-media post blaming one city department" },
    ],
    correctOrder: ["univ", "bma", "agency", "viral"],
    tokenPolicy: "rank-partial",
    diagnostic: {
      summary: "The university/community-network note is weighted above the agency dataset here because the question is interpretive ('does consent-last produce worse terms and longer delay?') — it needs disclosed method, a named precedent (Baan Mankong), and comparable outcomes, not just hydraulic counts. The BMA model is strong evidence but answers 'where/when does it flood', not 'will consent-last cost more'.",
      trapNote: "If you put the engineering brief or the viral post at the top, that's the trap — Source A carries real flood modelling but its recommendation aligns with its own mandate to deliver on schedule; a viral post has no verifiable provenance at all.",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority and virality are not evidence. A committee will not be moved by 'everyone shared it' or by the delivering team's own brief. Defensible ranking weighs: method disclosure, recency, and conflict of interest — and whether the source actually answers the question being asked.",
    },
  },

  /* ─── Q3 — Stakeholder → primary concern matching ─── */
  {
    id: "q3",
    order: 3,
    type: "match",
    difficulty: "medium",
    diegeticFrame: "You heard four voices. Match each to the concern they raised most strongly.",
    stem: "Match each stakeholder to their primary concern.",
    leftItems: [
      { id: "resident",  text: "Klong-side resident, informal tenure" },
      { id: "engineer",  text: "BMA flood-engineering official" },
      { id: "business",  text: "CBD property-association director" },
      { id: "organiser", text: "Community-network organiser (Baan Mankong)" },
    ],
    rightItems: [
      { id: "before",   text: "A funded, secure relocation must come before the works, not after" },
      { id: "exposure", text: "A modelled flood exposure to 80,000 commuters that worsens every delayed monsoon" },
      { id: "predict",  text: "A credible, non-stalling timeline — without denying the displaced a fair settlement" },
      { id: "sequence", text: "Sequencing — a funded settlement as a precondition protects city and residents both" },
    ],
    correctPairs: {
      resident:  "before",
      engineer:  "exposure",
      business:  "predict",
      organiser: "sequence",
    },
    tokenPolicy: "match-partial",
    afterCorrect: "Notice the resident and the community-network organiser describe the SAME structural fix from two sides — lived demand and proven mechanism. You'll use that convergence in the ACT stage.",
    afterCorrectTh: "ชาวชุมชนและผู้ประสานงานเครือข่ายอธิบายทางออกเชิงโครงสร้างเดียวกันจากคนละมุม",
    scaffold: {
      trigger: "low",
      message: "Re-play the dispatches. Each voice states its core concern in the first 10 seconds — the resident leads with 'I am against being moved like furniture', the organiser with 'the part the engineers miss is sequencing'.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The committee uses precise terms. Pick the word that completes this sentence the way a city planner or housing officer would.",
    stem: "\"The families built where their parents built, over the water, with no legal document of ownership — they hold what planners call ______ tenure.\"",
    options: [
      { id: "a", text: "temporary", feedback: "'Temporary' misreads the situation — these are generational, materially established homes, not short-term occupation." },
      { id: "b", text: "informal",  feedback: "Correct. 'Informal' tenure is the precise term: a real, long-settled home and community without a secure legal right to the land. Part 3 uses exactly this word." },
      { id: "c", text: "illegal",   feedback: "Loaded and inaccurate. The dossier frames this as a structural-legal fact, not a crime or a moral failing — 'illegal' is not the planning term used." },
      { id: "d", text: "communal",  feedback: "'Communal' describes shared ownership, not the absence of a secure title. It is not the term the dossier uses for this tenure status." },
    ],
    correct: ["b"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3 of the dossier. The exact term appears where the residents have a real community but no protected legal right to remain.",
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
    diegeticFrame: "This one is harder than it looks. Read every option carefully before you commit.",
    stem: "Which is the STRONGEST single reason the dossier and Source B give for NOT proceeding on the current alignment before a funded settlement?",
    options: [
      { id: "a", text: "The klong-side families have lived there for generations, so it would be sad to move them.",
        feedback: "Emotionally resonant but weak as policy reasoning. 'It would be sad' is not the dossier's argument and will not survive committee cross-examination. The case is structural, not sentimental." },
      { id: "b", text: "The corridor is illegal, so the city cannot build it.",
        feedback: "Factually wrong. The dossier states the plan is lawful and the reservation is municipal land. The objection is about justice and sequencing, not legality." },
      { id: "c", text: "The displaced hold the weakest legal position and lowest capacity to absorb a move, AND consent-last has a documented record of producing both worse settlement terms and longer delay — so the 'fast' path may not actually be faster.",
        feedback: "Correct — and this is the sentence to carry into your ACT-stage brief. It stacks two independent structural reasons: a concentrated, legally unprotected cost and an instrumental sequencing failure that undermines the speed argument itself." },
      { id: "d", text: "Hydraulic models are sometimes wrong, so the flood risk may not be real.",
        feedback: "Overstated and unsupported. The dossier and Source A treat the flood risk as real and the delay cost as genuine. 'Sometimes imperfect' is not 'unreal' — and this is not the dossier's argument." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — the sympathy argument — is the easy answer that collapses under cross-examination. Choosing it with high confidence is penalised most severely on purpose.",
    scaffold: {
      trigger: "wrong",
      message: "A committee weighs structural reasoning, not sentiment or absolutes. The strongest objection combines a concentrated, unprotected cost with the instrumental finding that consent-last is slower, not faster.",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q6 — Open capstone (carries into the Final Task) ─── */
  {
    id: "q6",
    order: 6,
    type: "open",
    difficulty: "open",
    diegeticFrame: "One last thing before you brief the committee. In one sentence, name the single most important piece of evidence you would use to support your eventual recommendation — whatever it turns out to be. You will be asked for this again in your Voice for Change.",
    stem: "Your evidence commitment (15–40 words):",
    placeholder: "e.g. \"The documented record that consent-last produces both worse settlement terms and longer delay means a funded Baan Mankong settlement must be a precondition, not an afterthought.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },
    longitudinalCallback: {
      mission: "final-task",
      promptIfMissing: "In The Klong and the City you named [evidence] as your most important piece of evidence. Where does it appear in your Voice for Change proposal?",
    },
  },
];

export const QUIZ_TOKEN_CAP = 25;

/* Token award — generalised; rank trap is data-driven via item.trapTopIds */
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
    const correct = item.correctOrder;
    const given = answer;
    if (!given || given.length !== correct.length) return 0;
    if (correct.every((id, i) => given[i] === id)) return 8;
    // Trap: an interested-party / unverifiable source placed first.
    // Data-driven: the two lowest-authority ids are the last two in correctOrder.
    const trapTop = [correct[correct.length - 1], correct[correct.length - 2]];
    if (trapTop.includes(given[0])) return -3;
    // Single adjacent swap with the rest intact = +5
    let swaps = 0;
    for (let i = 0; i < correct.length - 1; i++) {
      if (given[i] === correct[i + 1] && given[i + 1] === correct[i]) swaps++;
    }
    if (swaps === 1) {
      const intactElsewhere = correct.every((id, i) =>
        (given[i] === id) ||
        (given[i] === correct[i + 1] && given[i + 1] === correct[i]) ||
        (given[i] === correct[i - 1] && given[i - 1] === correct[i]));
      if (intactElsewhere) return 5;
    }
    // Top pair reversed, bottom pair intact = +3
    if (given[0] === correct[1] && given[1] === correct[0] &&
        given[2] === correct[2] && given[3] === correct[3]) return 3;
    return 0;
  }

  if (item.type === "match") {
    let n = 0;
    for (const k of Object.keys(item.correctPairs)) {
      if (answer && answer[k] === item.correctPairs[k]) n++;
    }
    if (n === 4) return 5;
    if (n === 3) return 3;
    if (n === 2) return 2;
    return 0;
  }

  return 0;
}

export function shouldShowScaffold(item, answer, confidence, tokenAward) {
  if (item.type === "open") return false;
  if (item.scaffold?.trigger === "wrong" && tokenAward < 0) return true;
  if (item.scaffold?.trigger === "low" && tokenAward <= 0) return true;
  if (item.scaffold?.trigger === "trap" && tokenAward === -3) return true;
  return false;
}
