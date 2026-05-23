/**
 * FUTUREPROOF — SDG 3 EEC fringe — "The Village the Boom Left Behind" Quiz Bank
 *
 * Same export surface as sdg11-bangkok-quiz.js. 6 items:
 *   Q1 mcq (fact vs. contested) · Q2 rank (source provenance)
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
    diegeticFrame: "Before we brief the provincial health committee, let's confirm what the dossier and the source pair actually establish. Three of these are supported. One is a claim presented as contested.",
    stem: "Which statement does the dossier NOT present as established fact?",
    options: [
      { id: "a", text: "The EEC drew working-age people into the factory towns, leaving an elder-and-child residual pattern in many fringe villages.",
        feedback: "Supported. Part 1 establishes this demographic pattern directly." },
      { id: "b", text: "The fringe villages show measurably higher unmet primary-care need than the EEC towns.",
        feedback: "Supported. Part 3 states this as an empirical access gap." },
      { id: "c", text: "Funding the distributed satellite-clinic model at full strength in one fiscal year will deliver equitable access without any in-town wait-time consequence.",
        feedback: "Right answer. The dossier deliberately does NOT claim this. Part 4 explicitly says the budget cannot do both at full strength concurrently, and Part 3 records the administrator's wait-time consequence as real." },
      { id: "d", text: "The EEC-town tertiary hospital currently operates at or near capacity.",
        feedback: "Supported. The administrator's dispatch and Part 3 both establish this." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 4. Separate what the dossier asserts (the access gap; the binding tertiary capacity; the sustainable middle path) from the overclaim that a maximalist distributed roll-out is costless in town. The dossier never promises a costless model.",
      highlightDossierId: "part4",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q2 — Source-provenance ranking (medium-hard) ─── */
  {
    id: "q2",
    order: 2,
    type: "rank",
    difficulty: "medium",
    diegeticFrame: "The committee will ask why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Does a phased distributed model reduce preventable hospitalisations without collapsing tertiary capacity?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "univ",   text: "WHO / UNDP joint analysis of distributed primary-care reforms in middle-income demographic-hollowing contexts (Source B — independent, disclosed method)" },
      { id: "nhso",   text: "NHSO + Provincial Public Health Office utilisation dataset, with linked cost-per-prevented-admission returns (agency dataset)" },
      { id: "admin",  text: "EEC-town hospital administrator's own efficiency briefing (Source A — capacity holder with a delivery interest in preserving posts)" },
      { id: "viral",  text: "Viral social-media post claiming all village healthcare problems are 'lifestyle choices'" },
    ],
    correctOrder: ["univ", "nhso", "admin", "viral"],
    tokenPolicy: "rank-partial",
    diagnostic: {
      summary: "The WHO/UNDP analysis is weighted above the agency dataset here because the question is interpretive ('does the phased model deliver the trade-off it claims?') — it needs disclosed method, comparable cases, and explicit attention to capacity AND access. The NHSO/PPHO dataset is strong evidence but answers 'what is the gap', not 'will the reform work'.",
      trapNote: "If you put the administrator's brief or the viral post at the top, that's the trap — Source A is in good faith but has a delivery interest in preserving tertiary posts; the viral post fails on every provenance test (no method, scapegoating frame, no verifiable author).",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority and virality are not evidence. A committee will not be moved by 'everyone shared it' or by the post-holder's own brief. Defensible ranking weighs method, recency, and conflict of interest — and whether the source actually answers the question being asked.",
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
      { id: "grandma",     text: "Grandmother / household head" },
      { id: "provincial",  text: "Provincial health officer" },
      { id: "admin",       text: "EEC-town hospital administrator" },
      { id: "osm",         text: "อสม. village health volunteer" },
    ],
    rightItems: [
      { id: "closer",    text: "Not sympathy — the care has to come closer; I cannot leave the grandchildren alone for an hour-each-way trip" },
      { id: "sustain",   text: "Give me a position the budget can sustain — not the most generous one on paper that collapses in two years" },
      { id: "efficiency", text: "Efficiency is not a dirty word when staff are scarce; choose the distributed model with your eyes open about who waits longer in town" },
      { id: "sequence",  text: "Most days, here, I am the system; fund supported อสม. rounds and a satellite clinic — catch it before it becomes an ambulance" },
    ],
    correctPairs: {
      grandma:     "closer",
      provincial:  "sustain",
      admin:       "efficiency",
      osm:         "sequence",
    },
    tokenPolicy: "match-partial",
    afterCorrect: "Notice the grandmother and the อสม. describe the SAME structural fix from two sides — lived demand and lived practice. You'll use that convergence in the ACT stage.",
    afterCorrectTh: "ยายและ อสม. อธิบายทางออกเชิงโครงสร้างเดียวกันจากคนละมุม",
    scaffold: {
      trigger: "low",
      message: "Re-play the dispatches. Each voice states its core concern in the first 10 seconds — the grandmother leads with 'I am not asking for pity', the อสม. with 'Most days, here, I am the system'.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The committee uses precise terms. Pick the word that completes this sentence the way a provincial health officer would.",
    stem: "\"The working-age tier has moved into the EEC town for factory jobs, leaving elders and grandchildren in residence — Part 2 calls this pattern demographic ______.\"",
    options: [
      { id: "a", text: "decline",     feedback: "'Decline' suggests the village is shrinking overall — but the dossier is precise: it's the MIDDLE that emptied, with edges remaining. Not the term used." },
      { id: "b", text: "concentration", feedback: "'Concentration' is the opposite of what is happening on the fringe — it's what describes the EEC town. Wrong direction." },
      { id: "c", text: "hollowing",    feedback: "Correct. Part 2 names the structural pattern as 'demographic hollowing' — the middle of the age structure is emptied, the edges (elders + children) remain. This is the dossier's exact term." },
      { id: "d", text: "ageing",       feedback: "'Ageing' captures part of the truth (elders remain) but misses the children-without-parents-in-residence pattern that makes the hollowing distinctive. Not the dossier's term." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 2 of the dossier. The exact term is named in the first sentence: 'The pattern is called demographic ______.'",
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
    stem: "Which is the STRONGEST single reason the dossier and Source B give for ADOPTING a phased distributed-clinic model — without collapsing the EEC-town hospital?",
    options: [
      { id: "a", text: "The grandmother in the village is suffering and it would be wrong to leave her alone.",
        feedback: "Emotionally resonant but weak as policy reasoning. 'It would be wrong' is not the dossier's argument and will not survive committee cross-examination. The case is structural, not sentimental — and the grandmother herself rejects the pity framing." },
      { id: "b", text: "The EEC-town hospital is not really at capacity — the administrator is exaggerating.",
        feedback: "Factually wrong. The dossier and the administrator's dispatch both establish the capacity constraint as real. Dismissing it weakens, not strengthens, the case for the distributed model." },
      { id: "c", text: "The measurable access gap in the fringe villages drives preventable hospitalisations that already cost the tertiary system more than supported อสม. rounds plus a satellite clinic would, AND a phased roll-out lets the province validate cost-per-prevented-admission before scaling — so 'efficiency' actually argues FOR the distributed phase-in.",
        feedback: "Correct — and this is the sentence to carry into your ACT-stage brief. It stacks two independent reasons: the access gap drives preventable downstream cost into the tertiary system the administrator is defending, AND a phased model lets the efficiency case be tested empirically before any tertiary post is at risk. The administrator's own frame argues for, not against, the phase-in." },
      { id: "d", text: "Distributed care is always better than concentrated care, in every context.",
        feedback: "Overgeneralised. The dossier explicitly notes that concentrated tertiary capacity serves a real function (the working population, the village overflow). 'Always better' is not the argument and will not survive challenge." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — the sympathy argument — is the easy answer that collapses under cross-examination. Choosing it with high confidence is penalised most severely on purpose. The grandmother explicitly refuses pity; arguing the case in pity terms misses her own framing.",
    scaffold: {
      trigger: "wrong",
      message: "A committee weighs structural reasoning, not sentiment or absolutes. The strongest argument turns the EEC-town administrator's own efficiency frame in favour of the phase-in: the access gap is already driving preventable hospitalisation cost, and a phased model tests the saving before any tertiary post is moved.",
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
    placeholder: "e.g. \"The provincial dataset showing preventable village admissions cost the tertiary system more than supported อสม. rounds plus a satellite clinic means the efficiency case argues for the phase-in, not against it.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },
    longitudinalCallback: {
      mission: "final-task",
      promptIfMissing: "In The Village the Boom Left Behind you named [evidence] as your most important piece of evidence. Where does it appear in your Voice for Change proposal?",
    },
  },
];

export const QUIZ_TOKEN_CAP = 25;

/* Token award — identical logic to bangkok / mae sot (data-driven) */
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
