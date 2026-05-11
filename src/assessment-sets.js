/**
 * FUTUREPROOF — Mission Readiness Assessment Sets (Parallel Test Bank)
 *
 * To deter answer-sharing between cohorts, every learner is deterministically
 * assigned ONE of N parallel test sets at sign-in time. The assignment is
 * stable (same UID → same set every time), so re-loading the page does not
 * re-shuffle. Different users on the same browser get different sets.
 *
 * Each set has matched difficulty:
 *   - cloze passage with 5 blanks at A2/B1/B2 mix (matched to set 0)
 *   - 8 vocab items: 2× A2/B1, 3× B1, 2× B2, 1× C1
 *   - 1 writing prompt (60–100 words, community-investigation framing)
 *   - 4 critical-thinking items (1 correlation/causation, 1 false dichotomy,
 *     1 appeal-to-authority, 1 argument evaluation)
 *   - 3 analytical-thinking items (3-row data tables, single-best-inference)
 *
 * COLLAB_ITEMS + LIKERT_LABELS stay shared across all sets — they're self-
 * report and have no "right answer" that could be copied.
 *
 * To add a new set: append to ASSESSMENT_SETS following the SET TEMPLATE
 * at the bottom of the file. Calibrate against the difficulty checklist:
 *   - Cloze level mix: 2× B1, 2× B2, 1× B1/B2 transition
 *   - Vocab span A2 → C1 in same ratio as set 0
 *   - Critical items must cover the same 4 reasoning patterns
 *   - Analytical tables must have similar data complexity (3 rows × 4–5 cols)
 */

/* ──────────────────────────────────────────────────────────────────
 * SET 00 — Coastal salinity & policy (the original; do not delete)
 * ──────────────────────────────────────────────────────────────── */

const set00 = {
  id: 0,
  theme: "Coastal Salinity",
  cloze: {
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
  },
  vocab: [
    { id: "v1", level: "A2", prompt: "Choose the meaning closest to: <em>steadily</em>",
      options: ["loudly", "in a careful, regular way", "by accident", "without effort"], answer: 1 },
    { id: "v2", level: "B1", prompt: "Choose the meaning closest to: <em>threaten</em>",
      options: ["protect", "make smaller", "put at risk", "celebrate"], answer: 2 },
    { id: "v3", level: "B1", prompt: "Choose the meaning closest to: <em>integrated</em>",
      options: ["broken into pieces", "combined into a whole", "delayed", "approved"], answer: 1 },
    { id: "v4", level: "B2", prompt: "Choose the meaning closest to: <em>mitigate</em>",
      options: ["measure", "reduce in severity", "approve formally", "celebrate"], answer: 1 },
    { id: "v5", level: "B2", prompt: "Choose the meaning closest to: <em>stakeholder</em>",
      options: ["a person who owns shares only", "anyone affected by a decision", "a government regulator", "a referee"], answer: 1 },
    { id: "v6", level: "C1", prompt: "Choose the meaning closest to: <em>contingent on</em>",
      options: ["dependent on", "opposed to", "the cause of", "additional to"], answer: 0 },
    { id: "v7", level: "C1", prompt: "Choose the meaning closest to: <em>tacit</em>",
      options: ["loud and clear", "agreed without being stated", "questioned", "violent"], answer: 1 },
    { id: "v8", level: "C1", prompt: "Choose the meaning closest to: <em>preempt</em>",
      options: ["respond afterward", "act first to prevent", "give permission", "celebrate"], answer: 1 },
  ],
  writing: {
    prompt: "In 60–100 words, describe a problem in your community that you'd want to investigate. Who is affected? Why does it matter?",
    thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายปัญหาในชุมชนของคุณที่คุณอยากสืบสวน ใครได้รับผลกระทบ และทำไมจึงสำคัญ",
    minWords: 50, maxWords: 130,
  },
  critical: [
    { id: "c1", type: "validInference",
      stem: "A study finds that students who eat breakfast score higher on math tests. The headline reads: \"Eating breakfast makes you better at math.\"",
      question: "What is the most accurate critique of the headline?",
      options: [
        "The headline is correct because the study showed the connection.",
        "The headline confuses correlation with causation; another factor (e.g., household stability) might explain both.",
        "The headline is wrong because breakfast is not related to math.",
        "The headline is correct only if the study had over 1,000 students.",
      ], answer: 1 },
    { id: "c2", type: "fallacyId",
      stem: "\"Either we ban single-use plastics completely, or we accept that the oceans will die.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Ad hominem attack", "False dichotomy", "Appeal to authority", "Circular reasoning"], answer: 1 },
    { id: "c3", type: "fallacyId",
      stem: "\"Dr. Lee says this policy will work, and Dr. Lee has a PhD, so the policy will work.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Slippery slope", "Appeal to authority (without engaging the argument)", "Strawman", "False analogy"], answer: 1 },
    { id: "c4", type: "argEval",
      stem: "Premise: Higher minimum wage may reduce entry-level jobs in some sectors. Premise: Higher minimum wage also raises consumer spending. Conclusion: Therefore minimum wage policy must consider both effects.",
      question: "Is the conclusion well-supported by the premises?",
      options: [
        "Yes — the conclusion modestly follows from acknowledging both effects.",
        "No — the premises contradict each other.",
        "No — the conclusion goes far beyond the premises.",
        "Yes — but only if we accept one premise and reject the other.",
      ], answer: 0 },
  ],
  analytical: [
    { id: "a1",
      table: { caption: "Reported air-quality index (AQI) by district, weekday averages, 2025",
        headers: ["District", "Mon", "Tue", "Wed", "Thu", "Fri"],
        rows: [["A", 78, 82, 85, 88, 95], ["B", 60, 61, 62, 60, 64], ["C", 91, 70, 92, 71, 93]] },
      question: "Which conclusion is best supported by the data?",
      options: ["District B has the worst air quality.", "District A's AQI rises steadily across the week.",
                "District C's AQI is exactly twice District B's.", "All three districts have similar weekly patterns."],
      answer: 1 },
    { id: "a2",
      table: { caption: "Survey: percentage of respondents identifying each issue as their top community concern, by age band",
        headers: ["Age band", "Water", "Air", "Jobs", "Education"],
        rows: [["18–24", 18, 22, 30, 30], ["25–34", 22, 25, 35, 18], ["35–49", 28, 30, 22, 20], ["50+", 34, 24, 18, 24]] },
      question: "Which statement is best supported?",
      options: ["Concern about jobs decreases as age increases.", "Education is the top concern across all age bands.",
                "Water concern is identical across age bands.", "Older respondents care more about jobs than younger ones."],
      answer: 0 },
    { id: "a3",
      table: { caption: "Recycling participation: % of households reporting active recycling, by district and quarter",
        headers: ["District", "Q1", "Q2", "Q3", "Q4"],
        rows: [["X", 40, 42, 45, 47], ["Y", 60, 58, 55, 52], ["Z", 50, 50, 50, 50]] },
      question: "Which inference is best supported?",
      options: ["District Z's program is failing.", "District X is improving while District Y is declining.",
                "District Y has the lowest current participation.", "Recycling has declined overall."],
      answer: 1 },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * SET 01 — Microplastics & marine life
 * ──────────────────────────────────────────────────────────────── */

const set01 = {
  id: 1,
  theme: "Microplastics & Marine Life",
  cloze: {
    intro: "Read the passage. Pick the best word for each blank.",
    thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
    text: [
      "Microplastic pollution in the Gulf of Thailand",
      { blank: 1, options: ["has grew", "has grown", "has growed", "growed"], answer: "has grown", level: "B1" },
      "rapidly over the last five years. Marine biologists at Mahidol say the",
      { blank: 2, options: ["plastic", "plastics", "plasticness", "plasticity"], answer: "plastics", level: "B1" },
      "are now found in the digestive systems of most coastal fish, which",
      { blank: 3, options: ["is concerned", "concerns", "concerning", "concern"], answer: "concerns", level: "B2" },
      "public health officials. Local cleanup drives have been",
      { blank: 4, options: ["organising", "organized", "organizen", "organisaiton"], answer: "organized", level: "B1" },
      "monthly, but a coordinated national strategy has not yet",
      { blank: 5, options: ["materialised", "materialise", "materialising", "material"], answer: "materialised", level: "B2" },
      ".",
    ],
  },
  vocab: [
    { id: "v1", level: "A2", prompt: "Choose the meaning closest to: <em>rapidly</em>",
      options: ["slowly", "very quickly", "by mistake", "with difficulty"], answer: 1 },
    { id: "v2", level: "B1", prompt: "Choose the meaning closest to: <em>coastal</em>",
      options: ["near the mountains", "near the sea", "underground", "in the city centre"], answer: 1 },
    { id: "v3", level: "B1", prompt: "Choose the meaning closest to: <em>coordinated</em>",
      options: ["scattered randomly", "organised so parts work together", "delayed indefinitely", "made colourful"], answer: 1 },
    { id: "v4", level: "B2", prompt: "Choose the meaning closest to: <em>materialise</em>",
      options: ["disappear", "come into existence", "buy materials for", "translate"], answer: 1 },
    { id: "v5", level: "B2", prompt: "Choose the meaning closest to: <em>jurisdiction</em>",
      options: ["a budget allocation", "the legal authority of a body", "a kind of fish", "a polite gesture"], answer: 1 },
    { id: "v6", level: "C1", prompt: "Choose the meaning closest to: <em>cumulative</em>",
      options: ["happening once", "adding up over time", "happening by chance", "very expensive"], answer: 1 },
    { id: "v7", level: "C1", prompt: "Choose the meaning closest to: <em>provisional</em>",
      options: ["final and binding", "temporary, pending review", "very strong", "officially banned"], answer: 1 },
    { id: "v8", level: "C1", prompt: "Choose the meaning closest to: <em>scrutinise</em>",
      options: ["examine closely", "approve quickly", "make smaller", "destroy carefully"], answer: 0 },
  ],
  writing: {
    prompt: "In 60–100 words, describe an environmental issue that affects people you know. What evidence have you seen, and who could realistically change it?",
    thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายปัญหาสิ่งแวดล้อมที่ส่งผลกระทบต่อคนที่คุณรู้จัก คุณเห็นหลักฐานอะไรบ้าง และใครเปลี่ยนแปลงสิ่งนี้ได้จริง",
    minWords: 50, maxWords: 130,
  },
  critical: [
    { id: "c1", type: "validInference",
      stem: "Coastal towns with more tourism report higher microplastic levels in seafood. A magazine writes: \"Tourism is causing plastic to enter fish.\"",
      question: "What is the most accurate critique of the headline?",
      options: [
        "The headline is correct — tourists produce all the plastic.",
        "The headline confuses correlation with causation; both may be driven by coastal industrial activity or population density.",
        "The headline is wrong because tourists don't eat plastic.",
        "The headline is correct only during peak tourist months.",
      ], answer: 1 },
    { id: "c2", type: "fallacyId",
      stem: "\"Either we close every plastic factory tomorrow, or we admit we don't care about the ocean.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Strawman", "False dichotomy", "Hasty generalisation", "Appeal to tradition"], answer: 1 },
    { id: "c3", type: "fallacyId",
      stem: "\"A famous marine biologist signed this petition, so its proposal must be the right one.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Slippery slope", "Appeal to authority (without engaging the argument)", "Red herring", "Begging the question"], answer: 1 },
    { id: "c4", type: "argEval",
      stem: "Premise: Microplastic bans reduce plastic at the source. Premise: Bans without alternatives raise costs for small fishing communities. Conclusion: Therefore policy must pair bans with transition support.",
      question: "Is the conclusion well-supported by the premises?",
      options: [
        "Yes — the conclusion follows modestly from acknowledging both costs and benefits.",
        "No — the premises are about different topics.",
        "No — the conclusion is far stronger than the premises support.",
        "Yes — but only if we ignore the cost premise.",
      ], answer: 0 },
  ],
  analytical: [
    { id: "a1",
      table: { caption: "Microplastic particles per kg of seafood, by sample site, 2025",
        headers: ["Site", "Jan", "Apr", "Jul", "Oct"],
        rows: [["Phuket", 110, 115, 122, 128], ["Trat", 80, 81, 80, 82], ["Songkhla", 130, 95, 132, 96]] },
      question: "Which conclusion is best supported by the data?",
      options: ["Trat has the worst contamination.", "Phuket's contamination rises steadily across the year.",
                "Songkhla's level is exactly twice Trat's.", "All three sites follow the same pattern."],
      answer: 1 },
    { id: "a2",
      table: { caption: "Survey: % of respondents naming each marine issue as the most urgent, by region",
        headers: ["Region", "Plastic", "Overfishing", "Erosion", "Pollution from land"],
        rows: [["South", 32, 28, 22, 18], ["East", 28, 30, 18, 24], ["Central", 22, 18, 30, 30], ["North*", 20, 14, 12, 54]] },
      question: "Which inference is best supported? (*North = Andaman tourism corridor)",
      options: [
        "Plastic is the top issue in every region.",
        "Land-based pollution is the dominant concern in the North.",
        "Erosion concern is the same across all regions.",
        "Eastern respondents care most about plastic.",
      ], answer: 1 },
    { id: "a3",
      table: { caption: "Beach-cleanup volunteer turnout (people per event), four monthly events, 2025",
        headers: ["Town", "M1", "M2", "M3", "M4"],
        rows: [["P", 30, 36, 41, 48], ["Q", 70, 66, 60, 54], ["R", 50, 50, 50, 50]] },
      question: "Which inference is best supported?",
      options: ["Town R's program is failing.", "Town P's turnout is growing while Town Q's is declining.",
                "Town Q has the lowest current turnout.", "Volunteer turnout has fallen overall."],
      answer: 1 },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * SET 02 — Urban heat & vulnerable workers
 * ──────────────────────────────────────────────────────────────── */

const set02 = {
  id: 2,
  theme: "Urban Heat & Outdoor Workers",
  cloze: {
    intro: "Read the passage. Pick the best word for each blank.",
    thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
    text: [
      "Daytime temperatures in central Bangkok",
      { blank: 1, options: ["has exceeded", "have exceeded", "have exceed", "exceeded have"], answer: "have exceeded", level: "B1" },
      "42°C on six separate occasions this dry season. The Bangkok Metropolitan",
      { blank: 2, options: ["Administration", "Administer", "Administrator", "Administrating"], answer: "Administration", level: "B1" },
      "has issued public-health alerts, but enforcement of outdoor-work pauses",
      { blank: 3, options: ["remained inconsistent", "remains inconsistent", "remain inconsistent", "remains inconsistently"], answer: "remains inconsistent", level: "B2" },
      ". Outdoor workers in construction and delivery have been",
      { blank: 4, options: ["disproportionately", "disproportion", "disproportionate", "disproportional"], answer: "disproportionately", level: "B2" },
      "affected. A unified national heat-protection policy has yet to",
      { blank: 5, options: ["materialise", "material", "materialised", "materialising"], answer: "materialise", level: "B2" },
      ".",
    ],
  },
  vocab: [
    { id: "v1", level: "A2", prompt: "Choose the meaning closest to: <em>exceed</em>",
      options: ["fall short of", "go above", "match exactly", "ignore"], answer: 1 },
    { id: "v2", level: "B1", prompt: "Choose the meaning closest to: <em>enforcement</em>",
      options: ["the act of making a rule followed", "the act of writing a rule", "the act of ignoring a rule", "the act of celebrating"], answer: 0 },
    { id: "v3", level: "B1", prompt: "Choose the meaning closest to: <em>inconsistent</em>",
      options: ["always the same", "varying without clear reason", "very strong", "delayed"], answer: 1 },
    { id: "v4", level: "B2", prompt: "Choose the meaning closest to: <em>disproportionate</em>",
      options: ["evenly distributed", "much greater than expected for one group", "exactly balanced", "very small"], answer: 1 },
    { id: "v5", level: "B2", prompt: "Choose the meaning closest to: <em>protocol</em>",
      options: ["a formal procedure", "a casual conversation", "a kind of weather pattern", "a celebration"], answer: 0 },
    { id: "v6", level: "C1", prompt: "Choose the meaning closest to: <em>threshold</em>",
      options: ["a point or level at which something changes", "a building entrance only", "a sudden refusal", "a measurement error"], answer: 0 },
    { id: "v7", level: "C1", prompt: "Choose the meaning closest to: <em>backstop</em>",
      options: ["a final fall-back protection", "a small obstacle", "a long delay", "a polite refusal"], answer: 0 },
    { id: "v8", level: "C1", prompt: "Choose the meaning closest to: <em>iterative</em>",
      options: ["done once and finished", "improved gradually through repeated cycles", "very rare", "irreversible"], answer: 1 },
  ],
  writing: {
    prompt: "In 60–100 words, describe a group of workers whose conditions worry you. What change would help, and what would it cost?",
    thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายกลุ่มผู้ใช้แรงงานที่สภาพการทำงานทำให้คุณกังวล การเปลี่ยนแปลงใดจะช่วยพวกเขา และมีต้นทุนอะไรบ้าง",
    minWords: 50, maxWords: 130,
  },
  critical: [
    { id: "c1", type: "validInference",
      stem: "Construction workers in Bangkok report more heat illness in years with high tourism revenue. A blog claims: \"Tourism is making outdoor workers sick.\"",
      question: "What is the most accurate critique of the claim?",
      options: [
        "The claim is right — tourists generate the heat.",
        "The claim confuses correlation with causation; both may be driven by hotter El Niño years.",
        "The claim is wrong because workers don't see tourists.",
        "The claim is right only in the rainy season.",
      ], answer: 1 },
    { id: "c2", type: "fallacyId",
      stem: "\"Either we close every construction site on hot days, or we admit we don't care if workers die.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Begging the question", "False dichotomy", "Red herring", "Appeal to pity"], answer: 1 },
    { id: "c3", type: "fallacyId",
      stem: "\"The senior consultant has 30 years of experience, so her proposed wage backstop must be the right size.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Strawman", "Appeal to authority (without engaging the argument)", "Slippery slope", "False analogy"], answer: 1 },
    { id: "c4", type: "argEval",
      stem: "Premise: Mandatory midday work pauses reduce heatstroke. Premise: Mandatory pauses without wage support hurt daily-wage workers' incomes. Conclusion: Therefore heat policy should pair pauses with a wage backstop.",
      question: "Is the conclusion well-supported by the premises?",
      options: [
        "Yes — the conclusion modestly follows from acknowledging both effects.",
        "No — the premises are unrelated.",
        "No — the conclusion is far stronger than the premises support.",
        "Yes — but only if we reject one of the premises.",
      ], answer: 0 },
  ],
  analytical: [
    { id: "a1",
      table: { caption: "Heat-related clinic visits per 1,000 outdoor workers, by district, 2025 dry season",
        headers: ["District", "Mar", "Apr", "May", "Jun"],
        rows: [["A", 12, 18, 24, 31], ["B", 8, 9, 8, 10], ["C", 28, 14, 30, 16]] },
      question: "Which conclusion is best supported?",
      options: ["District B has the worst heat-illness rate.", "District A's heat-illness rate rises steadily across the season.",
                "District C's rate is exactly double District B's.", "All three districts show the same pattern."],
      answer: 1 },
    { id: "a2",
      table: { caption: "Survey: % of respondents in each occupation citing heat as their top workplace concern",
        headers: ["Occupation", "2022", "2023", "2024", "2025"],
        rows: [["Construction", 18, 24, 32, 41], ["Delivery", 22, 28, 33, 38], ["Office work", 6, 7, 8, 9], ["Retail (indoor)", 8, 10, 11, 12]] },
      question: "Which inference is best supported?",
      options: [
        "Office workers are the most concerned about heat.",
        "Heat concern is rising fastest among outdoor occupations.",
        "All four occupations have similar heat concern.",
        "Retail concern has decreased over time.",
      ], answer: 1 },
    { id: "a3",
      table: { caption: "Cool-zone availability: number of public cool rooms per 100k residents, by district",
        headers: ["District", "Q1", "Q2", "Q3", "Q4"],
        rows: [["X", 4, 5, 6, 8], ["Y", 12, 11, 10, 9], ["Z", 7, 7, 7, 7]] },
      question: "Which inference is best supported?",
      options: ["District Z's program has stopped.", "District X is expanding cool-zone access while District Y is contracting.",
                "District Y has the worst current access.", "Access has declined overall."],
      answer: 1 },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * SET 03 — Learning loss & rural education
 * ──────────────────────────────────────────────────────────────── */

const set03 = {
  id: 3,
  theme: "Rural Learning Loss",
  cloze: {
    intro: "Read the passage. Pick the best word for each blank.",
    thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
    text: [
      "Standardised reading scores in rural northeastern Thailand",
      { blank: 1, options: ["has fallen", "have fallen", "have fall", "falled"], answer: "have fallen", level: "B1" },
      "by an average of nine points since 2021. Officials say the",
      { blank: 2, options: ["decline", "declined", "declining", "declines"], answer: "decline", level: "B1" },
      "is most visible in primary-school cohorts whose first two years were online. While additional tutoring",
      { blank: 3, options: ["has rolled", "have been rolled", "has been rolled", "rolled out"], answer: "has been rolled", level: "B2" },
      "out in several provinces, evidence of recovery has been",
      { blank: 4, options: ["modest", "modestly", "modesty", "modeled"], answer: "modest", level: "B1" },
      ". A nationwide catch-up framework has yet to be",
      { blank: 5, options: ["finalising", "finalise", "finalized", "finalises"], answer: "finalized", level: "B2" },
      ".",
    ],
  },
  vocab: [
    { id: "v1", level: "A2", prompt: "Choose the meaning closest to: <em>average</em>",
      options: ["the largest value", "the typical value", "the smallest value", "the most surprising value"], answer: 1 },
    { id: "v2", level: "B1", prompt: "Choose the meaning closest to: <em>visible</em>",
      options: ["able to be seen or detected", "very loud", "hidden", "tasty"], answer: 0 },
    { id: "v3", level: "B1", prompt: "Choose the meaning closest to: <em>cohort</em>",
      options: ["a single student", "a group moving through a system together", "a teacher", "a school year ending"], answer: 1 },
    { id: "v4", level: "B2", prompt: "Choose the meaning closest to: <em>modest</em>",
      options: ["large and bold", "small and limited", "very expensive", "completely missing"], answer: 1 },
    { id: "v5", level: "B2", prompt: "Choose the meaning closest to: <em>longitudinal</em>",
      options: ["measured at one moment", "measured repeatedly over time", "measured underwater", "measured by feel"], answer: 1 },
    { id: "v6", level: "C1", prompt: "Choose the meaning closest to: <em>attrition</em>",
      options: ["the gradual loss of members from a group", "the sudden gain of members", "a celebration of joining", "an annual review"], answer: 0 },
    { id: "v7", level: "C1", prompt: "Choose the meaning closest to: <em>remediation</em>",
      options: ["formal punishment", "the action of fixing a deficit", "introducing more rules", "a polite refusal"], answer: 1 },
    { id: "v8", level: "C1", prompt: "Choose the meaning closest to: <em>contingency</em>",
      options: ["a guaranteed outcome", "a plan for events that may or may not happen", "a single firm appointment", "a tradition"], answer: 1 },
  ],
  writing: {
    prompt: "In 60–100 words, describe a learning gap you have observed in your school or community. Who is most affected, and what is one realistic first step?",
    thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายปัญหาช่องว่างทางการเรียนรู้ที่คุณสังเกตเห็นในโรงเรียนหรือชุมชนของคุณ ใครได้รับผลกระทบมากที่สุด และก้าวแรกที่เป็นไปได้คืออะไร",
    minWords: 50, maxWords: 130,
  },
  critical: [
    { id: "c1", type: "validInference",
      stem: "Schools that purchased more tablets had higher math scores last year. A newspaper writes: \"Tablets make students better at math.\"",
      question: "What is the most accurate critique of the headline?",
      options: [
        "The headline is correct — tablets directly raise scores.",
        "The headline confuses correlation with causation; wealthier schools may both afford tablets and have other advantages.",
        "The headline is wrong because tablets cannot affect math.",
        "The headline is correct only if students used the tablets daily.",
      ], answer: 1 },
    { id: "c2", type: "fallacyId",
      stem: "\"Either we extend the school year by two months, or we accept a permanently uneducated generation.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Begging the question", "False dichotomy", "Strawman", "Genetic fallacy"], answer: 1 },
    { id: "c3", type: "fallacyId",
      stem: "\"The Minister of Education has a PhD, so her catch-up program will work.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Hasty generalisation", "Appeal to authority (without engaging the argument)", "Red herring", "False cause"], answer: 1 },
    { id: "c4", type: "argEval",
      stem: "Premise: Targeted rural tutoring closes gaps fastest where loss is largest. Premise: Targeting only some districts can feel unfair to others. Conclusion: Therefore education recovery policy must balance impact with perceived fairness.",
      question: "Is the conclusion well-supported by the premises?",
      options: [
        "Yes — the conclusion modestly follows from acknowledging both effects.",
        "No — the premises are about different topics.",
        "No — the conclusion goes far beyond the premises.",
        "Yes — but only if we ignore the fairness premise.",
      ], answer: 0 },
  ],
  analytical: [
    { id: "a1",
      table: { caption: "Average reading score (out of 100), Grade 4 students, by province, 2025",
        headers: ["Province", "Sep", "Oct", "Nov", "Dec"],
        rows: [["P", 52, 56, 60, 64], ["Q", 70, 69, 68, 67], ["R", 58, 51, 59, 52]] },
      question: "Which conclusion is best supported?",
      options: ["Province Q has the lowest scores.", "Province P's scores rise steadily across the term.",
                "Province R's scores are exactly twice Province Q's.", "All three provinces show the same trend."],
      answer: 1 },
    { id: "a2",
      table: { caption: "Survey: % of teachers reporting each issue as the most urgent in their classroom",
        headers: ["Region", "Reading gap", "Class size", "Devices", "Teacher pay"],
        rows: [["NE", 38, 22, 18, 22], ["N", 32, 26, 20, 22], ["Central", 24, 30, 22, 24], ["South", 30, 24, 22, 24]] },
      question: "Which inference is best supported?",
      options: [
        "Class size is the top concern everywhere.",
        "Reading gap is most prominent in the Northeast.",
        "Teacher pay concern is identical across regions.",
        "Devices are the top concern in the South.",
      ], answer: 1 },
    { id: "a3",
      table: { caption: "Tutoring program enrolment: % of eligible students enrolled, by district and quarter",
        headers: ["District", "Q1", "Q2", "Q3", "Q4"],
        rows: [["E", 22, 28, 33, 39], ["F", 60, 55, 50, 45], ["G", 45, 45, 45, 45]] },
      question: "Which inference is best supported?",
      options: ["District G's program is failing.", "District E's enrolment is growing while District F's is declining.",
                "District F has the lowest current enrolment.", "Tutoring enrolment has fallen overall."],
      answer: 1 },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * SET 04 — Financial inclusion & digital banking
 * ──────────────────────────────────────────────────────────────── */

const set04 = {
  id: 4,
  theme: "Digital Banking & Financial Inclusion",
  cloze: {
    intro: "Read the passage. Pick the best word for each blank.",
    thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
    text: [
      "Mobile-banking adoption in Thailand",
      { blank: 1, options: ["has rose", "has risen", "have rised", "are risen"], answer: "has risen", level: "B1" },
      "sharply since 2020, but older adults in rural areas remain",
      { blank: 2, options: ["leftbehind", "leaving behind", "left behind", "are leaved"], answer: "left behind", level: "B1" },
      "by the shift to digital. The Bank of Thailand and several universities",
      { blank: 3, options: ["are reviewing", "is reviewing", "reviewed", "reviews"], answer: "are reviewing", level: "B2" },
      "what programmes might close this access gap. Pilot",
      { blank: 4, options: ["initiatives", "initiative", "initiating", "initiated"], answer: "initiatives", level: "B2" },
      "in three provinces are promising, but a national strategy has not yet",
      { blank: 5, options: ["solidify", "solidified", "solidifies", "solidifying"], answer: "solidified", level: "C1" },
      ".",
    ],
  },
  vocab: [
    { id: "v1", level: "A2", prompt: "Choose the meaning closest to: <em>sharply</em>",
      options: ["slowly", "in a sudden, large amount", "in a soft way", "by mistake"], answer: 1 },
    { id: "v2", level: "B1", prompt: "Choose the meaning closest to: <em>adoption</em>",
      options: ["the act of refusing", "the act of taking up and using", "the act of celebrating", "the act of writing"], answer: 1 },
    { id: "v3", level: "B1", prompt: "Choose the meaning closest to: <em>access</em>",
      options: ["a tax payment", "the ability to use or reach something", "an unexpected delay", "a small obstacle"], answer: 1 },
    { id: "v4", level: "B2", prompt: "Choose the meaning closest to: <em>initiative</em>",
      options: ["a new program or effort", "a final exam", "a financial loss", "a workplace argument"], answer: 0 },
    { id: "v5", level: "B2", prompt: "Choose the meaning closest to: <em>infrastructure</em>",
      options: ["a single building", "the underlying systems supporting an activity", "a written contract", "a long delay"], answer: 1 },
    { id: "v6", level: "C1", prompt: "Choose the meaning closest to: <em>solidify</em>",
      options: ["make weaker", "become firm and established", "freeze water", "celebrate quietly"], answer: 1 },
    { id: "v7", level: "C1", prompt: "Choose the meaning closest to: <em>marginalise</em>",
      options: ["include in the centre", "push to the edges of attention or power", "increase profit margins", "celebrate quietly"], answer: 1 },
    { id: "v8", level: "C1", prompt: "Choose the meaning closest to: <em>nuance</em>",
      options: ["a major obstacle", "a small but important distinction", "a refusal", "a celebration"], answer: 1 },
  ],
  writing: {
    prompt: "In 60–100 words, describe a service or technology that your community uses unevenly. Who is left out, and what realistic change would help?",
    thai: "เขียน 60–100 คำเป็นภาษาอังกฤษอธิบายบริการหรือเทคโนโลยีที่ชุมชนของคุณเข้าถึงได้ไม่ทั่วถึง ใครถูกทิ้งไว้ และการเปลี่ยนแปลงใดที่เป็นไปได้จริงจะช่วยได้",
    minWords: 50, maxWords: 130,
  },
  critical: [
    { id: "c1", type: "validInference",
      stem: "Provinces with more mobile-banking apps installed report higher small-business growth. A magazine claims: \"Mobile banking causes small businesses to grow.\"",
      question: "What is the most accurate critique of the claim?",
      options: [
        "The claim is correct — mobile banking directly grows businesses.",
        "The claim confuses correlation with causation; provinces with stronger urban economies may have both.",
        "The claim is wrong because banking apps don't affect businesses.",
        "The claim is correct only on weekdays.",
      ], answer: 1 },
    { id: "c2", type: "fallacyId",
      stem: "\"Either we force every elder to use mobile banking, or we accept that rural areas will stay poor.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Begging the question", "False dichotomy", "Hasty generalisation", "Equivocation"], answer: 1 },
    { id: "c3", type: "fallacyId",
      stem: "\"This well-known economist signed the proposal, so we should support it.\"",
      question: "Which reasoning flaw does this statement contain?",
      options: ["Strawman", "Appeal to authority (without engaging the argument)", "Slippery slope", "False analogy"], answer: 1 },
    { id: "c4", type: "argEval",
      stem: "Premise: Digital banking lowers transaction costs for users. Premise: Forcing digital-only banking excludes those without devices or skills. Conclusion: Therefore inclusion policy must keep at least one non-digital option for essential services.",
      question: "Is the conclusion well-supported by the premises?",
      options: [
        "Yes — the conclusion modestly follows from acknowledging both costs and benefits.",
        "No — the premises don't connect.",
        "No — the conclusion is far stronger than the premises support.",
        "Yes — but only if we reject the cost premise.",
      ], answer: 0 },
  ],
  analytical: [
    { id: "a1",
      table: { caption: "Active mobile-banking users per 1,000 adults, by province, 2025",
        headers: ["Province", "Q1", "Q2", "Q3", "Q4"],
        rows: [["Alpha", 180, 200, 225, 250], ["Beta", 410, 405, 400, 395], ["Gamma", 320, 280, 325, 285]] },
      question: "Which conclusion is best supported?",
      options: ["Beta has the lowest adoption.", "Alpha's adoption rises steadily across the year.",
                "Gamma's level is exactly double Beta's.", "All three follow the same pattern."],
      answer: 1 },
    { id: "a2",
      table: { caption: "Survey: % of respondents reporting each barrier as their primary reason for not using digital banking, by age band",
        headers: ["Age band", "No smartphone", "No trust", "No need", "No skills"],
        rows: [["18–29", 4, 18, 32, 12], ["30–49", 8, 22, 28, 18], ["50–64", 22, 26, 18, 30], ["65+", 38, 28, 12, 42]] },
      question: "Which inference is best supported?",
      options: [
        "Lack of trust is the top barrier for the youngest group.",
        "Lack of skills and devices grows as the primary barrier with age.",
        "Need is the top barrier for those over 65.",
        "All age groups face identical barriers.",
      ], answer: 1 },
    { id: "a3",
      table: { caption: "Bank-branch closures in rural districts, per year, by region",
        headers: ["Region", "2022", "2023", "2024", "2025"],
        rows: [["East", 4, 6, 9, 12], ["NE", 10, 9, 8, 7], ["South", 7, 7, 7, 7]] },
      question: "Which inference is best supported?",
      options: ["The South has stopped its programme.", "Closures are rising in the East while declining in the Northeast.",
                "The Northeast has the most closures this year.", "Closures have fallen overall."],
      answer: 1 },
  ],
};

/* ──────────────────────────────────────────────────────────────────
 * The bank — exported as ASSESSMENT_SETS
 *
 * To add more sets: copy the SET TEMPLATE below, fill in matched-difficulty
 * content, and append to this array. The rest of the system picks up new
 * sets automatically — no other code changes needed.
 * ──────────────────────────────────────────────────────────────── */

export const ASSESSMENT_SETS = [set00, set01, set02, set03, set04];

/* ──────────────────────────────────────────────────────────────────
 * Deterministic set assignment — same UID gets the same set every time
 *
 * Hash function: a 32-bit FNV-1a so the same UID always maps to the same
 * set index regardless of platform / browser / session. Pure function.
 * ──────────────────────────────────────────────────────────────── */

function hashStringFNV1a(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

export function pickSetIndexForUser(uid) {
  if (!uid) return 0;
  return hashStringFNV1a(String(uid)) % ASSESSMENT_SETS.length;
}

export function getAssessmentSet(uid) {
  const idx = pickSetIndexForUser(uid);
  return ASSESSMENT_SETS[idx];
}

/* ──────────────────────────────────────────────────────────────────
 * SET TEMPLATE — copy this to add a new parallel set
 *
 * const setNN = {
 *   id: NN,
 *   theme: "Short descriptive name",
 *   cloze: {
 *     intro: "Read the passage. Pick the best word for each blank.",
 *     thaiIntro: "อ่านข้อความและเลือกคำที่เหมาะสมที่สุดสำหรับแต่ละช่องว่าง",
 *     text: [
 *       "Opening clause about the topic",
 *       { blank: 1, options: ["A", "B", "C", "D"], answer: "B", level: "B1" },
 *       "continuing prose...",
 *       { blank: 2, options: [...], answer: "...", level: "B2" },
 *       ...3 more blanks
 *     ],
 *   },
 *   vocab: [8 items, levels: A2, B1, B1, B1, B2, B2, C1, C1],
 *   writing: { prompt: "...", thai: "...", minWords: 50, maxWords: 130 },
 *   critical: [4 items: correlation/causation, false dichotomy,
 *              appeal-to-authority, argument evaluation],
 *   analytical: [3 items: 3-row data tables, single-best-inference],
 * };
 *
 * Then append: const ASSESSMENT_SETS = [..., setNN];
 * ──────────────────────────────────────────────────────────────── */
