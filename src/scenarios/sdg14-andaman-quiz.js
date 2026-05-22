/**
 * FUTUREPROOF — SDG 14 Andaman — "The Reef and the Tide" Adaptive Quiz Bank
 *
 * Same export surface as sdg13-chiangmai-quiz.js so sdg14-andaman-m1.js
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
    diegeticFrame: "Before we brief the marine park authority, let's confirm what the dossier actually establishes. Three of these are supported. One is a claim the dossier presents as contested.",
    stem: "Which statement does the dossier NOT present as established fact?",
    options: [
      { id: "a", text: "Sustained sea-surface-temperature anomaly drives corals to expel their algae and pale — bleaching.",
        feedback: "Supported. Part 1 makes this the central mechanism — heat stress triggers bleaching, which is reversible if the heat eases in time." },
      { id: "b", text: "Anchoring, fins, trampling and a high density of visitors add physical damage on top of the heat — pressures are additive.",
        feedback: "Supported. Part 1 (T2/T3) is explicit that contact pressure is additive, not independent of the thermal signal." },
      { id: "c", text: "A reduced visitor quota and rotating site closures, applied alone, will fully restore the reef this season.",
        feedback: "Right answer. The dossier deliberately does NOT claim this. Part 3 argues structural recovery proceeds over years to decades — and only if local pressures stay suppressed throughout the window. One season of quota does not 'restore' anything." },
      { id: "d", text: "Larger tour companies can amortise a capped or closed season; small single-boat operators frequently cannot.",
        feedback: "Supported. Part 2 frames this as the structural distributional point — identical closure, very different force on the two groups." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 3. Separate what the dossier asserts (recovery is conditional and slow) from what a one-season quota is being claimed to achieve. The dossier never promises one season fixes the reef.",
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
    diegeticFrame: "The marine park authority will ask why they should trust your brief. Rank these sources from most to least authoritative for the question: 'Will a one-season quota + rotating closures meaningfully advance reef recovery on the most damaged sites?'",
    stem: "Drag to rank (1 = most authoritative, 4 = least):",
    items: [
      { id: "psu",     text: "Prince of Songkla University marine-science peer-reviewed study on reef-recovery dynamics" },
      { id: "dmcr",    text: "DMCR repeat-survey monitoring record (bleaching + recovery)" },
      { id: "assoc",   text: "Tourism-industry association brief on visitor-impact assessment" },
      { id: "social",  text: "Viral social-media thread blaming a single resort group" },
    ],
    correctOrder: ["psu", "dmcr", "assoc", "social"],
    tokenPolicy: "rank-partial",
    diagnostic: {
      summary: "Peer-reviewed academic work is weighted above the agency monitoring record here because the question is interpretive ('will this work?'), not merely observational — it needs disclosed methodology and causal reasoning, not just survey counts. The DMCR record is strong evidence but answers 'what is the state of the reef', not 'will the policy advance recovery'.",
      trapNote: "If you put the association brief or the social-media thread at the top, that is the trap — an interested party's paper carries real data but its conflict of interest must be disclosed and weighted; a viral thread has no verifiable provenance at all.",
    },
    scaffold: {
      trigger: "trap",
      message: "Authority and virality are not evidence. A park authority will not be moved by 'everyone shared it.' Defensible ranking weighs: methodology disclosure, recency, and conflict of interest — and whether the source actually answers the question being asked.",
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
      { id: "operator",      text: "Small dive-operator" },
      { id: "scientist",     text: "DMCR reef scientist" },
      { id: "tour-director", text: "Larger tour-company director" },
      { id: "coop",          text: "Community-cooperative leader" },
    ],
    rightItems: [
      { id: "carry",     text: "Don't make the smallest carry the whole uncompensated cost first" },
      { id: "window",    text: "Recovery window is closing — local pressure must drop during it" },
      { id: "predict",   text: "Will support a predictable, evenly-applied framework + transition fund" },
      { id: "sequence",  text: "Tie closures to a funded livelihood transition or lose enforcement legitimacy" },
    ],
    correctPairs: {
      operator:      "carry",
      scientist:     "window",
      "tour-director":"predict",
      coop:          "sequence",
    },
    tokenPolicy: "match-partial",
    afterCorrect: "Notice the small operator and the community-cooperative leader describe the SAME risk from two sides. You'll use that convergence in the ACT-stage brief.",
    afterCorrectTh: "ผู้ประกอบการรายเล็กและผู้นำสหกรณ์อธิบายความเสี่ยงเดียวกันจากคนละมุม",
    scaffold: {
      trigger: "low",
      message: "Re-play the dispatches. Each voice states its core concern in the first 10 seconds — the operator leads with 'my boat is still on a loan', the scientist with 'the window is closing'.",
    },
  },

  /* ─── Q4 — Vocabulary in context ─── */
  {
    id: "q4",
    order: 4,
    type: "mcq",
    difficulty: "medium",
    diegeticFrame: "The authority uses precise terms. Pick the word that completes this sentence the way a DMCR reef scientist or marine-park officer would.",
    stem: "\"When sea temperatures stay high for too long, the coral expels the algae that feed and colour it and turns pale — a process called ______.\"",
    options: [
      { id: "a", text: "fading",     feedback: "'Fading' is generic and not the technical term used in marine science." },
      { id: "b", text: "burning",    feedback: "Reef damage is sometimes loosely called 'reef burn,' but it is not the dossier's term and is not what the DMCR or scientific literature would use here." },
      { id: "c", text: "bleaching",  feedback: "Correct. 'Bleaching' is the precise term: heat-stressed coral expels its symbiotic algae and pales. Part 1 uses exactly this word." },
      { id: "d", text: "starving",   feedback: "Loss of algae does deprive coral of energy, but 'starving' is not the standardised scientific or policy term." },
    ],
    correct: ["c"],
    scaffold: {
      trigger: "wrong",
      message: "Re-read Part 1 of the dossier. The exact term appears once, where heat-stressed coral loses its colour.",
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
    stem: "Which is the STRONGEST single reason the dossier gives for not imposing the quota + closures by themselves, with no funded transition?",
    options: [
      { id: "a", text: "Small operators have always fished and dived here; tradition must be respected.",
        feedback: "Emotionally resonant but weak as policy reasoning. 'Tradition' is not the dossier's argument and will not survive cross-examination at the authority. The dossier's case is structural — distribution of cost and behavioural displacement — not sentimental." },
      { id: "b", text: "A closure is illegal, so the park authority cannot impose one.",
        feedback: "Factually wrong. The dossier states the measure is lawful. The objection is about effectiveness, fairness and behavioural response, not legality." },
      { id: "c", text: "Identical closure imposes a marginal cost on buffered (large) operators and an existential cost on unbuffered (small) ones, AND a bare closure without transition risks night trips and lost cooperation — so a quota alone neither distributes cost fairly nor reliably advances recovery.",
        feedback: "Correct — and this is the sentence to carry into your ACT-stage brief. It stacks two independent structural reasons: an unequal distribution of compliance cost AND a behavioural-displacement risk that undermines enforcement legitimacy." },
      { id: "d", text: "Satellite bleaching surveys are sometimes inaccurate, so DMCR data should be discounted.",
        feedback: "Overstated. The dossier treats DMCR survey data as strong evidence, not unreliable. 'Imperfect' is not 'discountable' — and this is not the dossier's main argument." },
    ],
    correct: ["c"],
    trapOption: "a",
    trapNote: "Option A — the tradition argument — is the easy answer that collapses under cross-examination. Choosing it with high confidence is penalised most severely on purpose.",
    scaffold: {
      trigger: "wrong",
      message: "A marine-park authority weighs structural reasoning, not sentiment or absolutes. The strongest objection combines an unequal cost (the buffered/unbuffered split) with a behavioural risk the closure can worsen (night trips and lost cooperation).",
    },
    tokens: TOKEN_MATRIX,
  },

  /* ─── Q6 — Open capstone (carries into the Final Task) ─── */
  {
    id: "q6",
    order: 6,
    type: "open",
    difficulty: "open",
    diegeticFrame: "One last thing before you brief the authority. In one sentence, name the single most important piece of evidence you would use to support your eventual recommendation — whatever it turns out to be. You will be asked for this again in your Voice for Change.",
    stem: "Your evidence commitment (15–40 words):",
    placeholder: "e.g. \"The cooperative leader's point about night trips and lost trust means a bare closure risks worsening enforcement — so the recommendation must tie the quota to a funded transition.\"",
    minWords: 8,
    maxWords: 50,
    tokens: { onSubmit: 2 },
    longitudinalCallback: {
      mission: "final-task",
      promptIfMissing: "In The Reef and the Tide you named [evidence] as your most important piece of evidence. Where does it appear in your Voice for Change proposal?",
    },
  },
];

export const QUIZ_TOKEN_CAP = 25;

/* Token award — generalised; rank trap is data-driven via item.correctOrder */
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
