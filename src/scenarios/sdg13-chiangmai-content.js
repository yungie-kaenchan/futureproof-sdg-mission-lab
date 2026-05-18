/**
 * FUTUREPROOF — SDG 13 Chiang Mai Scenario Content
 *
 * "The Burning Season" — second fully-built journey mission.
 * Spec source: /docs/RECONSTRUCTION-MASTER.md §2 (mission 2 of 6), §5 (adaptive)
 *
 * This module is pure data — dossier text, stakeholder profiles,
 * vocabulary glosses, asset references. UI logic lives in
 * sdg13-chiangmai-m1.js.
 *
 * ── ADAPTIVE READING TIERS (Reconstruction Master §5, decision D2) ──
 * Every DOSSIER part's `body` is an object keyed by reading tier:
 *
 *   { 1: <A2–B1 text>, 2: <B1+–B2 baseline>, 3: <B2+–C1 text> }
 *
 * The THREE versions carry identical facts, stakeholders, numbers and
 * the same decision. They differ ONLY in lexical density, sentence
 * length, and clause embedding. adaptive.js `pickTier()` selects the
 * learner's tier (set once at the diagnostic). Audio/video are NOT
 * tiered — that asymmetry is SLA-correct, not a shortcut.
 *
 * Tier 2 is the canonical reference register (matches Khon Kaen).
 */

export const SCENARIO_META = {
  id: "sdg13-chiangmai-haze-v1",
  sdg: 13,
  title: "The Burning Season",
  titleTh: "ฤดูแห่งการเผา",
  setting:
    "Each year from February to April, a grey haze settles over Chiang Mai. Much of it is smoke from crop-residue and forest burning across the northern uplands and from across the border. The city's air quality becomes among the worst in the world.",
  coreTension:
    "A hard zero-burning order with satellite-hotspot fines would cut the smoke that sickens hundreds of thousands of city residents — but it criminalises upland farmers who burn because no funded alternative exists and the maize-contract economy demands a fast field turnaround.",
  decisionPoint:
    "Should the province enforce a province-wide zero-burning order this dry season, backed by satellite-hotspot fines, before a funded residue-management alternative is in place for upland smallholders?",
  ethicalAxes: ["Public health vs. rural livelihood", "Procedural justice"],
  region: "Upper Ping basin, Chiang Mai & Mae Hong Son uplands",
  cefr: "B1+/B2",
};

/**
 * Vocabulary foregrounded in the dossier. On hover/tap students see the
 * Thai gloss. Gloss density (how many tips show) is controlled by the
 * learner's tier via adaptive.glossDensity(); the gloss TEXT is constant.
 */
export const VOCABULARY = [
  { term: "particulate",   gloss: "tiny solid particles suspended in air",                   th: "ฝุ่นละออง" },
  { term: "PM2.5",         gloss: "particles smaller than 2.5 microns — small enough to enter the lungs and blood", th: "ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน" },
  { term: "residue",       gloss: "the plant matter left in a field after harvest",          th: "เศษวัสดุเหลือจากการเก็บเกี่ยว" },
  { term: "hotspot",       gloss: "a point of active fire detected by satellite",            th: "จุดความร้อน / จุดเผา (จากดาวเทียม)" },
  { term: "transboundary", gloss: "crossing a national border",                              th: "ข้ามพรมแดน" },
  { term: "mitigation",    gloss: "action that reduces the severity of a problem",           th: "การลดทอน / การบรรเทา" },
  { term: "enforcement",   gloss: "making people obey a rule, with penalties",               th: "การบังคับใช้กฎหมาย" },
  { term: "subsistence",   gloss: "producing only enough to survive, with little spare",     th: "การยังชีพ / พอกินพอใช้" },
  { term: "inversion",     gloss: "a layer of warm air that traps cooler polluted air below it", th: "ชั้นอากาศแบบผกผันที่กักมลพิษ" },
];

/**
 * Four-part dossier. Each `body` is tiered { 1, 2, 3 } — same facts,
 * three registers. <vocab>term</vocab> markup triggers a gloss tooltip.
 */
export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — Why the air turns grey",
    body: {
      1: `
Every year, from February to April, the air in Chiang Mai turns grey. People call it the burning season. The smoke comes from fires in the fields and forests of the northern hills. Some smoke also blows in from across the border.

The small dust in the smoke is called <vocab>PM2.5</vocab>. It is so small that it goes deep into the lungs. For a few weeks each year, Chiang Mai has some of the worst air in the world.

The hills around the city make it worse. Cool, dirty air sits in the valley. A layer of warm air on top traps it. This is called an <vocab>inversion</vocab>. The smoke cannot escape, so it builds up day after day.

The province has a plan: stop all burning this season. Satellites will find each fire — each <vocab>hotspot</vocab> — and the people who lit it can be fined. The plan is legal. Whether it is fair is a harder question.
      `.trim(),
      2: `
Each year, from February to April, a grey haze settles over Chiang Mai. People here call it the burning season. Most of the smoke comes from crop-<vocab>residue</vocab> and forest fires across the northern uplands; a significant share also drifts in from across the border.

The fine dust in that smoke is <vocab>PM2.5</vocab> — <vocab>particulate</vocab> matter small enough to pass deep into the lungs and into the bloodstream. For several weeks each year, Chiang Mai records some of the worst air quality measurements on the planet.

The terrain makes it worse. Cool, polluted air pools in the Ping valley, and a warmer layer above it acts as a lid — a temperature <vocab>inversion</vocab>. The smoke has nowhere to go, so concentrations climb day after day until the rains arrive.

The province has approved a plan: a zero-burning order for the whole season. Satellite imagery will locate every active fire — every <vocab>hotspot</vocab> — and those responsible can be fined. The plan is legal. Whether it is just is a different question — and the answer depends on whose situation you weigh first.
      `.trim(),
      3: `
From February through April, a persistent grey haze envelops Chiang Mai during what residents call the burning season. The bulk of it originates in crop-<vocab>residue</vocab> disposal and forest fire across the northern uplands, with a substantial <vocab>transboundary</vocab> contribution drifting in from beyond the national border.

The respirable fraction of that smoke is <vocab>PM2.5</vocab> — <vocab>particulate</vocab> matter fine enough to penetrate the alveoli and translocate into systemic circulation. For several weeks annually, Chiang Mai's recorded concentrations rank among the highest measured anywhere worldwide.

Topography compounds the loading. Cool, pollutant-laden air subsides into the Ping basin while an overlying warmer stratum suppresses vertical mixing — a temperature <vocab>inversion</vocab> that functions as a lid. Absent dispersion, concentrations accumulate cumulatively until monsoon onset.

The province has authorised a season-long zero-burning order, with satellite-derived <vocab>hotspot</vocab> detection underwriting an <vocab>enforcement</vocab> regime of fines. The measure is lawful. Whether it is equitable is a separate question — one whose answer is contingent on whose circumstances are weighted first.
      `.trim(),
    },
  },
  {
    id: "part2",
    heading: "Part 2 — Who lights the fires, and why",
    body: {
      1: `
Most of the burning is done by small farmers in the hills. Many grow maize for animal feed under contract with large companies. After harvest, the field is full of dry stalks and leaves — the <vocab>residue</vocab>. The fastest and cheapest way to clear it is to burn it.

These farmers are not rich. Many farm only enough to live on — this is called <vocab>subsistence</vocab> farming. The contract sets the dates: the field must be clear and replanted quickly. Machines that cut and bury <vocab>residue</vocab> instead of burning it are expensive. Few families can afford one, and few can rent one in time.

In the city, doctors see the cost. Hospitals in Chiang Mai report more patients with breathing problems every burning season — children, the elderly, and people who already have asthma. The link between the smoke and the illness is clear and repeats every year.

So two true things sit against each other. The smoke makes city people sick. The burning is how hill families survive.
      `.trim(),
      2: `
Most of the burning is carried out by smallholder farmers in the uplands. A large share grow maize for animal feed under contract with agribusiness buyers. After harvest the field is left thick with dry stalks and leaves — the crop <vocab>residue</vocab>. Burning is the fastest and cheapest way to clear it before the next planting.

These households are not wealthy. Many farm at a <vocab>subsistence</vocab> margin, and the buyer's contract fixes the timetable: the field must be cleared and replanted on a short cycle. Machinery that shreds and incorporates <vocab>residue</vocab> instead of burning it is costly; few families can buy one, and rental units are scarce during the narrow turnaround window.

In the city, clinicians register the consequence. Chiang Mai hospitals report a consistent rise in respiratory presentations every burning season — children, older adults, and people with pre-existing asthma. The association between the haze and the illness is well documented and recurs annually.

Two true things therefore sit in tension. The smoke makes city residents ill. The burning is how upland families stay solvent.
      `.trim(),
      3: `
The combustion is overwhelmingly attributable to upland smallholders, a large proportion of whom cultivate feed maize under contract to agribusiness buyers. Post-harvest, fields are encumbered with desiccated stover — the crop <vocab>residue</vocab> — and open burning constitutes the lowest-cost, lowest-latency clearance method ahead of replanting.

These households operate at or near a <vocab>subsistence</vocab> margin while the procurement contract externally fixes the agronomic calendar, compressing field turnaround. Mechanised alternatives that shred and incorporate <vocab>residue</vocab> in lieu of combustion are capital-intensive; ownership is infeasible for most and rental capacity is structurally inadequate during the narrow clearance window.

Urban clinicians document the downstream burden: Chiang Mai facilities report a recurrent seasonal escalation in respiratory presentations — paediatric, geriatric, and asthmatic cohorts disproportionately — with the haze–morbidity association robustly and repeatedly evidenced.

Two independently valid claims are thus placed in opposition: the aerosol load is a demonstrable urban health harm, and the burning is the mechanism by which upland livelihoods remain viable.
      `.trim(),
    },
  },
  {
    id: "part3",
    heading: "Part 3 — Why a ban alone may not fix it",
    body: {
      1: `
A ban sounds simple, but three things make it hard.

First, the smoke does not stay in one place. A lot of it crosses the border from outside Thailand. This is called <vocab>transboundary</vocab> haze. Even a perfect ban inside Chiang Mai cannot stop smoke that comes from somewhere else.

Second, a ban without help can backfire. If burning is illegal but there is still no cheap way to clear a field, some farmers burn anyway — but at night, to hide from the satellites. Night fires are harder to control and can spread.

Third, fairness matters for the law to work. Researchers at Chiang Mai University say that rules people see as unfair are obeyed less. A ban that punishes poor farmers, while offering them no real choice, may lose the trust it needs to succeed.

Real reduction of the smoke — real <vocab>mitigation</vocab> — needs more than a rule. It needs an affordable alternative to burning, and it needs the farmers to accept it.
      `.trim(),
      2: `
A ban sounds straightforward, but three factors complicate it.

First, the smoke is not local. A substantial fraction is <vocab>transboundary</vocab> — it crosses into Chiang Mai from outside Thailand. Even flawless domestic <vocab>enforcement</vocab> cannot remove the share that originates elsewhere.

Second, <vocab>enforcement</vocab> without provision can be counter-productive. If burning is criminalised while no affordable clearance alternative exists, a portion of farmers burn anyway — but at night, to evade satellite <vocab>hotspot</vocab> detection. Night burning is harder to supervise and more likely to escape control.

Third, perceived fairness conditions compliance. Researchers at Chiang Mai University argue that rules seen as unjust are followed less reliably. A ban that penalises low-income farmers while offering no genuine alternative may forfeit the legitimacy it needs to work.

Genuine <vocab>mitigation</vocab>, then, requires more than a prohibition. It requires an affordable substitute for burning and the farmers' acceptance of it — otherwise the rule displaces the smoke rather than removing it.
      `.trim(),
      3: `
Prohibition is superficially simple but is complicated by three structural factors.

First, the source term is partly exogenous. A material fraction of the loading is <vocab>transboundary</vocab>, advected into the Chiang Mai airshed from beyond the national boundary; even asymptotically perfect domestic <vocab>enforcement</vocab> cannot abate the externally generated component.

Second, <vocab>enforcement</vocab> decoupled from provision is liable to perverse outcomes. Criminalising combustion without furnishing an affordable clearance pathway induces a behavioural substitution toward nocturnal burning calibrated to evade satellite <vocab>hotspot</vocab> detection — a regime less supervisable and more prone to escape.

Third, perceived procedural fairness is a determinant of compliance. Chiang Mai University researchers contend that rules adjudged illegitimate elicit systematically lower adherence; a measure that sanctions low-income cultivators absent a substantive alternative may forfeit the very legitimacy on which its efficacy depends.

Substantive <vocab>mitigation</vocab> therefore exceeds prohibition: it is contingent on a cost-feasible combustion substitute and on cultivator assent — failing which the instrument merely relocates the emission rather than abating it.
      `.trim(),
    },
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: {
      1: `
The province can legally order zero burning this season. Satellites can find the fires. Fines can be issued. The public health need is real: the smoke makes many city people sick every year.

But the upland farmers have no funded alternative yet. The money and machines to clear fields without fire are not in place for this season. A ban now lands hardest on the people with the fewest choices.

Your team will brief the provincial committee before the order is signed. The committee will not accept "it depends." It needs a clear position — and reasons that hold up when the other side pushes back.
      `.trim(),
      2: `
The province has the legal authority to impose a zero-burning order this season. Satellite <vocab>hotspot</vocab> detection makes <vocab>enforcement</vocab> feasible. The public-health case is real and recurring: the haze sickens a large urban population every year.

But no funded residue-management alternative is in place for upland smallholders this season. The financing and machinery to clear fields without fire do not yet exist at scale. An immediate ban therefore falls hardest on the stakeholders with the least room to comply.

Your team has been asked to brief the provincial haze committee before the order is finalised. The committee will not accept "it depends." It needs a defensible position — and reasoning that survives when other stakeholders push back.
      `.trim(),
      3: `
The province possesses lawful authority to promulgate a season-long zero-burning order, with satellite <vocab>hotspot</vocab> detection rendering <vocab>enforcement</vocab> operationally tractable. The public-health warrant is substantiated and recurrent: the aerosol burden imposes a significant annual morbidity on a large urban population.

However, no funded residue-management alternative is provisioned for upland smallholders within this season's window; the requisite financing and mechanisation are not available at scale. An immediate prohibition consequently concentrates its burden on the actors with the narrowest compliance latitude.

Your team will brief the provincial haze committee prior to finalisation. The committee will not entertain indeterminacy. It requires a defensible position — and an evidentiary rationale robust to adversarial challenge from competing stakeholders.
      `.trim(),
    },
  },
];

/**
 * Four stakeholder profiles. Transcripts mirror authentic audio — they
 * are NOT tiered (the audio is authentic input; the .vtt caption is the
 * scaffold). Same schema as Khon Kaen so the M1 renderer is shared.
 */
export const STAKEHOLDERS = [
  {
    id: "s01-grower",
    role: "Upland maize smallholder",
    roleTh: "เกษตรกรปลูกข้าวโพดบนพื้นที่สูง",
    location: "Mae Chaem District, Chiang Mai",
    flags: ["vulnerable", "male"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg13-chiangmai/images/stakeholder-01.svg",
    video: "/assets/scenarios/sdg13-chiangmai/video/01-maize-grower.mp4",
    caption: "/assets/scenarios/sdg13-chiangmai/audio/01-maize-grower.vtt",
    duration: 33,
    position:
      "I know the smoke is bad. My own children cough too — we breathe it up here first, before it ever reaches the city. But the buyer sets the date. The field must be clear and planted again within days, or I lose the contract, and the contract is the only cash my family sees all year. A machine to bury the stalks costs more than I earn in two seasons. There is none to rent near my village when I need it. If you fine me, I will still have to clear the field. I will just do it at night, where the satellite cannot see. Give me a real choice and I will take it. A fine is not a choice.",
    transcript:
      "I know the smoke is bad. My own children cough too — we breathe it first, up here, before it reaches the city. But the buyer sets the date. The field must be clear in days or I lose the contract, and that contract is the only money my family sees all year. The machine to bury the stalks costs more than I earn in two seasons. If you fine me, I will still clear the field. I will just do it at night. Give me a real choice and I will take it. A fine is not a choice.",
    primaryConcern: "No funded alternative — a fine without a choice forces night burning",
    primaryConcernTh: "ไม่มีทางเลือกที่รัฐสนับสนุน การปรับโดยไม่มีทางเลือกผลักให้ต้องเผากลางคืน",
  },
  {
    id: "s02-doctor",
    role: "Respiratory clinician, public hospital",
    roleTh: "แพทย์ระบบทางเดินหายใจ โรงพยาบาลรัฐ",
    location: "Chiang Mai city",
    flags: ["institutional", "female"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg13-chiangmai/images/stakeholder-02.svg",
    video: "/assets/scenarios/sdg13-chiangmai/video/02-clinician.mp4",
    caption: "/assets/scenarios/sdg13-chiangmai/audio/02-clinician.vtt",
    duration: 32,
    position:
      "Every burning season I see the same ward fill up. Children on nebulisers, elderly patients whose oxygen saturation falls for weeks, asthma cases that should be stable and are not. PM2.5 at the levels we record here is not a discomfort — it is a measurable rise in admissions and, in the most fragile patients, in deaths. I am not asking the committee to ignore the farmers. I am asking them to count the children in my ward as stakeholders too. Every season we delay a real solution, we pay for it in lung function that does not fully come back.",
    transcript:
      "Every burning season I see the same ward fill up. Children on nebulisers, elderly patients whose oxygen falls for weeks, asthma that should be stable and is not. PM2.5 at the levels we record is not a discomfort — it is a measurable rise in admissions and, in the most fragile, in deaths. I am not asking you to ignore the farmers. I am asking you to count the children in my ward as stakeholders too.",
    primaryConcern: "Measurable seasonal rise in admissions and deaths among fragile patients",
    primaryConcernTh: "การเพิ่มขึ้นที่วัดได้ของผู้ป่วยและการเสียชีวิตในกลุ่มเปราะบางทุกฤดูเผา",
  },
  {
    id: "s03-buyer",
    role: "Agribusiness maize-procurement manager",
    roleTh: "ผู้จัดการฝ่ายจัดซื้อข้าวโพด บริษัทเกษตรอุตสาหกรรม",
    location: "Regional procurement office, Northern Thailand",
    flags: ["private", "male"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg13-chiangmai/images/stakeholder-03.svg",
    video: "/assets/scenarios/sdg13-chiangmai/video/03-procurement.mp4",
    caption: "/assets/scenarios/sdg13-chiangmai/audio/03-procurement.vtt",
    duration: 30,
    position:
      "Our contracts specify volume and delivery windows because the feed mills downstream run on a schedule we do not control. We do not instruct any grower to burn — that is their field decision. We are open to a certified no-burn supply line and we have piloted one. But a certified line needs a price premium the market has not yet agreed, and it needs the province to fund the machinery gap, not the buyer alone. We will move when the incentives move. We are not the regulator and we cannot subsidise the whole basin by ourselves.",
    transcript:
      "Our contracts specify volume and delivery windows because the feed mills downstream run on a schedule we do not control. We do not tell any grower to burn — that is their field decision. We are open to a certified no-burn supply line; we have piloted one. But it needs a price premium the market has not agreed, and it needs the province to fund the machinery gap, not the buyer alone. We move when the incentives move.",
    primaryConcern: "Will shift only when price premium + public machinery funding align",
    primaryConcernTh: "จะปรับเมื่อราคาพรีเมียมและงบสนับสนุนเครื่องจักรจากรัฐมาพร้อมกัน",
  },
  {
    id: "s04-officer",
    role: "District enforcement officer (haze task force)",
    roleTh: "เจ้าหน้าที่บังคับใช้กฎหมายระดับอำเภอ ชุดเฉพาะกิจหมอกควัน",
    location: "District office, Chiang Mai Province",
    flags: ["institutional", "female"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg13-chiangmai/images/stakeholder-04.svg",
    video: "/assets/scenarios/sdg13-chiangmai/video/04-officer.mp4",
    caption: "/assets/scenarios/sdg13-chiangmai/audio/04-officer.vtt",
    duration: 34,
    position:
      "I am the one who has to knock on the door after the satellite flags a hotspot. I will be honest with the committee: a blanket ban with fines and nothing else makes my job harder, not easier. People stop talking to us. Fires move to the night. Last season we wrote penalties we could not collect from families who had nothing to pay with — and we lost the cooperation we had spent years building. Enforcement works when it is the last step after a real alternative, not the first step instead of one. Give me a ban with a funded option behind it and I can make it hold. Give me a ban alone and I am managing a game of hide-and-seek in the dark.",
    transcript:
      "I am the one who knocks on the door after the satellite flags a hotspot. Honestly: a blanket ban with fines and nothing else makes my job harder. People stop talking to us. Fires move to the night. Last season we wrote penalties we could not collect, and we lost cooperation we spent years building. Enforcement works as the last step after a real alternative — not the first step instead of one.",
    primaryConcern: "Fines-first enforcement destroys community cooperation and drives night burning",
    primaryConcernTh: "การปรับเป็นมาตรการแรกทำลายความร่วมมือชุมชนและผลักการเผาสู่กลางคืน",
  },
];

/**
 * Discipline-of-citation: real institutions named in the dossier.
 * Surfaced in the dossier viewer footer for transparency.
 */
export const INSTITUTIONS_CITED = [
  { name: "Pollution Control Department (PCD)",                role: "National air-quality standards & monitoring under MNRE" },
  { name: "GISTDA — Geo-Informatics & Space Technology Agency", role: "Satellite hotspot / burn-scar detection" },
  { name: "Royal Forest Department (RFD)",                     role: "Forest-fire control & burning regulation" },
  { name: "Chiang Mai University — environmental & public-health research", role: "Independent academic monitoring & compliance research" },
  { name: "Ministry of Public Health (MOPH)",                  role: "Respiratory-morbidity surveillance" },
  { name: "ASEAN Agreement on Transboundary Haze Pollution",   role: "Regional framework for cross-border smoke" },
];
