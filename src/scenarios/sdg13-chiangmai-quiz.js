/**
 * FUTUREPROOF — SDG 13 Chiang Mai — "The Burning Season" Adaptive Quiz Bank
 *
 * Same export surface as sdg06-khonkaen-quiz.js so sdg13-chiangmai-m1.js
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
    diegeticFrame: "Before we brief the haze committee, let's confirm what the dossier actually establishes. Three of these are supported. One is a claim the dossier presents as contested.",
    stem: "Which statement does the dossier NOT present as established fact?",
    options: [
      { id: "a", text: "A significant share of Chiang Mai's dry-season smoke is transboundary — it crosses into the airshed from outside Thailand.",
        feedback: "Supported. Part 3 states this explicitly and uses it to argue that even perfect domestic enforcement cannot remove the external share." },
      { id: "b", text: "A temperature inversion traps polluted air in the Ping valley, so concentrations build up day after day.",
        feedback: "Supported. Part 1 describes the inversion as a lid over the valley." },
      { id: "c", text: "A zero-burning order with hotspot fines, applied alone, will reduce total seasonal PM2.5 to safe levels.",
        feedback: "Right answer. The dossier deliberately does NOT claim this. Part 3 argues the opposite — a ban alone may displace burning to the night and cannot touch the transboundary share. This distinction matters in the DECIDE stage." },
      { id: "d", text: "Most upland burning is done by smallholders clearing crop residue under contract timetables.",
        feedback: "Supported. Part 2 attributes the burning to contract-bound smallholders working a compressed field-turnaround window." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3. Separate what the dossier asserts (transboundary share, night-burning risk) from what a ban is being claimed to achieve. The dossier never promises a ban alone fixes the air.",
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
    diegeticFrame: "The committee will ask why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Will a zero-burning order, alone, meaningfully cut Chiang Mai's seasonal PM2.5?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "cmu",     text: "Chiang Mai University air-quality & compliance study (peer-reviewed)" },
      { id: "gistda",  text: "GISTDA satellite hotspot dataset + PCD monitoring record" },
      { id: "assoc",   text: "Maize-industry association position paper (interested party)" },
      { id: "fbpost",  text: "Viral social-media post blaming a single province" },
    ],
    correctOrder: ["cmu", "gistda", "assoc", "fbpost"],
    tokenPolicy: "rank-partial",
    diagnostic: {
      summary: "Peer-reviewed academic work is weighted above the raw satellite/monitoring record here because the question is interpretive ('will a ban alone work?'), not merely observational — it needs disclosed methodology and causal reasoning, not just hotspot counts. The agency dataset is strong evidence but answers 'where/when', not 'will the policy work'.",
      trapNote: "If you put the industry paper or the viral post at the top, that's the trap — an interested party's paper can carry real data but its conflict of interest must be disclosed and weighted; a viral post has no verifiable provenance at all.",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority and virality are not evidence. A committee will not be moved by 'everyone shared it.' Defensible ranking weighs: methodology disclosure, recency, and conflict of interest — and whether the source actually answers the question being asked.",
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
      { id: "grower",  text: "Upland maize smallholder" },
      { id: "doctor",  text: "Respiratory clinician" },
      { id: "buyer",   text: "Agribusiness procurement manager" },
      { id: "officer", text: "District enforcement officer" },
    ],
    rightItems: [
      { id: "nochoice", text: "No funded alternative — a fine forces night burning" },
      { id: "morbid",   text: "Measurable seasonal rise in admissions and deaths" },
      { id: "incent",   text: "Will shift only when price premium + public funding align" },
      { id: "coop",     text: "Fines-first enforcement destroys community cooperation" },
    ],
    correctPairs: {
      grower:  "nochoice",
      doctor:  "morbid",
      buyer:   "incent",
      officer: "coop",
    },
    tokenPolicy: "match-partial",
    afterCorrect: "Notice the enforcement officer and the grower describe the SAME failure from two sides. You'll use that convergence in the ACT stage.",
    afterCorrectTh: "เจ้าหน้าที่บังคับใช้กฎหมายและเกษตรกรอธิบายความล้มเหลวเดียวกันจากคนละมุม",
    scaffold: {
      trigger: "low",
      message: "Re-play the dispatches. Each voice states its core concern in the first 10 seconds — the grower leads with 'a fine is not a choice', the officer with 'people stop talking to us'.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The committee uses precise terms. Pick the word that completes this sentence the way an air-quality scientist or policy officer would.",
    stem: "\"A warm layer of air settles over the cooler, polluted valley air and prevents it from rising — an effect called a temperature ______.\"",
    options: [
      { id: "a", text: "blockage",  feedback: "'Blockage' is generic and not the technical term used in atmospheric science." },
      { id: "b", text: "ceiling",   feedback: "Metaphorically close — the inversion does act like a lid — but 'ceiling' is not the scientific term used in the dossier or by the PCD." },
      { id: "c", text: "inversion", feedback: "Correct. A temperature 'inversion' is the precise term: warm air above cool air reverses the normal profile and traps pollutants. Part 1 uses exactly this word." },
      { id: "d", text: "gradient",  feedback: "'Gradient' describes a rate of change, not the trapping layer itself." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 1 of the dossier. The exact term appears once, where the valley's air cannot escape.",
      highlightDossierId: "part1",
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
    stem: "Which is the STRONGEST single reason the dossier gives for not relying on a zero-burning order by itself?",
    options: [
      { id: "a", text: "Farmers should not be punished because farming is a traditional way of life.",
        feedback: "Emotionally resonant but weak as policy reasoning. 'Tradition' is not the dossier's argument and will not survive committee cross-examination. The dossier's case is structural, not sentimental." },
      { id: "b", text: "A ban is illegal, so the province cannot impose one.",
        feedback: "Factually wrong. The dossier states the order is legal. The objection is about effectiveness and fairness, not legality." },
      { id: "c", text: "A material share of the smoke is transboundary and enforcement without a funded alternative pushes burning into the night, so a ban alone neither removes the external load nor reliably stops the domestic one.",
        feedback: "Correct — and this is the sentence to carry into your ACT-stage brief. It stacks two independent structural reasons: an irreducible external source and a behavioural evasion effect." },
      { id: "d", text: "Satellites sometimes miss small fires, so hotspot data is useless.",
        feedback: "Overstated. The dossier treats hotspot data as useful evidence, not useless. 'Imperfect' is not 'useless' — and this is not the dossier's main argument." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — the sympathy argument — is the easy answer that collapses under cross-examination. Choosing it with high confidence is penalised most severely on purpose.",
    scaffold: {
      trigger: "wrong",
      message: "A committee weighs structural reasoning, not sentiment or absolutes. The strongest objection combines a source the ban cannot reach (transboundary) with a behaviour the ban can worsen (night burning).",
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
    placeholder: "e.g. \"The transboundary share means a domestic-only ban cannot, by itself, deliver safe air — so the recommendation must pair enforcement with a funded alternative.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },
    longitudinalCallback: {
      mission: "final-task",
      promptIfMissing: "In The Burning Season you named [evidence] as your most important piece of evidence. Where does it appear in your Voice for Change proposal?",
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
