/**
 * FUTUREPROOF — SDG 4 Mae Sot — "The Children at the Border" Adaptive Quiz Bank
 *
 * Same export surface as sdg11-bangkok-quiz.js so sdg04-takmaesot-m1.js can
 * share the proven renderer. 6 scenario-specific items:
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
    diegeticFrame: "Before we brief the District Education committee, let's confirm what the dossier and the source pair actually establish. Three of these are supported. One is a claim presented as contested.",
    stem: "Which statement does the dossier NOT present as established fact?",
    options: [
      { id: "a", text: "MLC certification is not currently recognised by the Thai Ministry of Education and does not, on its own, open the next stage of Thai schooling.",
        feedback: "Supported. Part 2 establishes this directly — the MLC learning is genuine; the credential door into the Thai system is closed." },
      { id: "b", text: "Thai government schools are funded by a per-pupil allocation, so the funded posts in the next cycle are set by this cycle's officially-counted roll.",
        feedback: "Supported. Part 3 states the allocation formula and its budget consequence." },
      { id: "c", text: "Phasing the MLCs down on the proposed calendar will deliver Education For All without any cohort being lost during the transition.",
        feedback: "Right answer. The dossier deliberately does NOT claim this. Part 3 warns of exactly this gap — calendar-driven phase-down ahead of demonstrated bridging capacity is where the cohort gets lost." },
      { id: "d", text: "Thai government schools in border districts are already operating at or beyond their stated absorption capacity.",
        feedback: "Supported. Part 2 and the principal's dispatch both establish this as a present operational fact." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3. Separate what the dossier asserts (the allocation formula; the credential gap; the over-capacity Thai schools) from the overclaim that a calendar-driven phase-down delivers inclusion without a transition cost. The dossier never promises a costless phase-down.",
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
    diegeticFrame: "The committee will ask why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Does phasing the MLCs down on a calendar before demonstrated absorption produce a lost cohort?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "univ",    text: "UNICEF / UNESCO joint analysis of migrant-child education transitions (Source B — independent monitoring, disclosed method)" },
      { id: "obec",    text: "OBEC per-pupil allocation dataset + district-level absorption returns (agency dataset)" },
      { id: "agency",  text: "District Education office's own proposal narrative (Source A — proposing party, with a delivery interest)" },
      { id: "viral",   text: "A trending social-media thread blaming migrant families" },
    ],
    correctOrder: ["univ", "obec", "agency", "viral"],
    tokenPolicy: "rank-partial",
    diagnostic: {
      summary: "The UNICEF/UNESCO analysis is weighted above the agency dataset here because the question is interpretive ('does calendar-first phase-down produce a lost cohort?') — it needs disclosed method, comparable cases, and explicit attention to cohorts that drop out, not just enrolment counts. The OBEC dataset is strong evidence but answers 'where is allocation tight', not 'will the cohort survive the transition'.",
      trapNote: "If you put the district proposal or the viral thread at the top, that's the trap — Source A carries real local knowledge but its recommendation aligns with its own mandate to deliver on schedule; a viral thread has no verifiable provenance and traffics in scapegoating.",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority and virality are not evidence. A committee will not be moved by 'everyone shared it' or by the proposing office's own brief. Defensible ranking weighs method, recency, and conflict of interest — and whether the source actually answers the question being asked.",
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
      { id: "mlc",        text: "MLC teacher (nine-year tenure)" },
      { id: "district",   text: "District Education officer" },
      { id: "principal",  text: "Thai government-school principal" },
      { id: "ngo",        text: "NGO education coordinator (bridging both networks)" },
    ],
    rightItems: [
      { id: "bridge",   text: "Build the bridge first; then move us across" },
      { id: "budget",   text: "Posts and budget are fixed this cycle — show me how to sequence within what I have" },
      { id: "posts",    text: "Give me the teachers and posts before the cohort lands, not just a deadline" },
      { id: "sequence", text: "Enrolment is not inclusion — fund bridging, prove absorption with a real cohort, then phase down against demonstrated capacity" },
    ],
    correctPairs: {
      mlc:       "bridge",
      district:  "budget",
      principal: "posts",
      ngo:       "sequence",
    },
    tokenPolicy: "match-partial",
    afterCorrect: "Notice the MLC teacher and the NGO coordinator describe the SAME structural fix from two sides — lived practice and evidence-anchored framing. You'll use that convergence in the ACT stage.",
    afterCorrectTh: "ครูศูนย์การเรียนรู้และผู้ประสานงาน NGO อธิบายทางออกเชิงโครงสร้างเดียวกันจากคนละมุม",
    scaffold: {
      trigger: "low",
      message: "Re-play the dispatches. Each voice states its core concern in the first 10 seconds — the MLC teacher leads with 'Build the bridge first', the NGO coordinator with 'Enrolment is not inclusion'.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The committee uses precise terms. Pick the word that completes this sentence the way a District Education officer or an inclusion researcher would.",
    stem: "\"Counting a child as registered in the school roll is not the same as the child being able to follow the lesson — the dossier calls the second condition ______.\"",
    options: [
      { id: "a", text: "enrolment", feedback: "'Enrolment' is the FIRST condition — being on the roll. The dossier explicitly contrasts it with the second, deeper condition." },
      { id: "b", text: "absorption",  feedback: "'Absorption' is the school's capacity to take in more students — it is about the system, not about whether the individual learner can take part. Not the term used here." },
      { id: "c", text: "inclusion",   feedback: "Correct. Part 2 names this exact distinction: enrolment counts a learner on the roll; inclusion is whether the learner can actually take part. The dossier uses 'inclusion' for the deeper condition." },
      { id: "d", text: "recognition",  feedback: "'Recognition' here refers to the Thai state accepting the credential, not to the learner's participation in lessons. Not the term used for this condition." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 2 of the dossier. The exact term appears in the line: 'Enrolment is not the same thing as ______.' It is also the word the NGO coordinator stresses in her dispatch.",
      highlightDossierId: "part2",
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
    stem: "Which is the STRONGEST single reason the dossier and Source B give for NOT phasing the MLCs down on the current calendar?",
    options: [
      { id: "a", text: "The children at the MLCs have been there for years, so it would be cruel to disrupt them now.",
        feedback: "Emotionally resonant but weak as policy reasoning. 'It would be cruel' is not the dossier's argument and will not survive committee cross-examination. The case is structural, not sentimental." },
      { id: "b", text: "The MLCs are illegal, so the district has no choice but to close them.",
        feedback: "Factually wrong. The dossier does NOT frame the MLCs as illegal — they are non-formal, not unlawful. The objection is about sequencing, not legality." },
      { id: "c", text: "The receiving Thai schools are already over their stated absorption capacity and lack bridging staff, AND independent monitoring shows calendar-driven phase-downs produce a measurable lost-cohort effect — so 'fast' may not actually be faster for the child's school year.",
        feedback: "Correct — and this is the sentence to carry into your ACT-stage brief. It stacks two independent structural reasons: a concrete absorption shortfall on the receiving side and an evidence-anchored finding that the calendar-first path is slower for the actual learner, not faster." },
      { id: "d", text: "The MLC credential is not recognised by the Thai Ministry, so the proposal does not really matter either way.",
        feedback: "Non-sequitur. The non-recognition of the MLC credential is exactly WHY the proposal is on the table — it does not weaken the case against a calendar-driven phase-down; it is the context of it." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — the cruelty argument — is the easy answer that collapses under cross-examination. Choosing it with high confidence is penalised most severely on purpose.",
    scaffold: {
      trigger: "wrong",
      message: "A committee weighs structural reasoning, not sentiment or absolutes. The strongest objection combines a concrete absorption shortfall on the receiving side with the instrumental finding that calendar-first is slower for the learner, not faster.",
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
    placeholder: "e.g. \"The independently-monitored finding that calendar-driven phase-downs produce a lost-cohort effect means bridging posts and demonstrated absorption must be funded first — not after.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },
    longitudinalCallback: {
      mission: "final-task",
      promptIfMissing: "In The Children at the Border you named [evidence] as your most important piece of evidence. Where does it appear in your Voice for Change proposal?",
    },
  },
];

export const QUIZ_TOKEN_CAP = 25;

/* Token award — identical logic to bangkok / chiangmai (data-driven) */
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
    const trapTop = [correct[correct.length - 1], correct[correct.length - 2]];
    if (trapTop.includes(given[0])) return -3;
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
