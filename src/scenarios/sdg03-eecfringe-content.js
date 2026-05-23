/**
 * FUTUREPROOF — SDG 3 EEC fringe Scenario Content
 *
 * "The Village the Boom Left Behind" — sixth and final journey mission.
 * Spec source: /scenarios/PRODUCTION-PROMPTS-MASTER-v2.md → Mission 6
 *
 * Pure data module — dossier text, stakeholder profiles, vocabulary
 * glosses, asset references. UI logic lives in sdg03-eecfringe-m1.js.
 *
 * ── DIGNITY-FIRST GUARDRAIL ─────────────────────────────────────────
 * Scenario centres on EEC-fringe villages with elderly household heads
 * raising grandchildren. ALL authored text MUST:
 *   • frame the grandmother and the อสม. volunteer as the household's
 *     anchor, NOT its victim
 *   • avoid sentimental "the boom destroyed them" framing — the EEC
 *     hospital administrator's "efficiency" case is given full weight
 *     as a real, defensible position, not a strawman
 *   • respect อสม. volunteer competence — she runs an informal system
 *     of care, not a charity case
 *   • present the dilemma as resource sequencing inside a real budget
 *     constraint, never as moral failure of any party
 *
 * ── ADAPTIVE READING TIERS ──
 * Every DOSSIER part's `body` is keyed by reading tier:
 *   { 1: <A2–B1 text>, 2: <B1+–B2 baseline>, 3: <B2+–C1 text> }
 * Tier 2 is canonical. Audio / video NOT tiered.
 */

export const SCENARIO_META = {
  id: "sdg03-eecfringe-health-v1",
  sdg: 3,
  title: "The Village the Boom Left Behind",
  titleTh: "หมู่บ้านที่ความเจริญทิ้งไว้",
  setting:
    "Rayong and Chonburi's Eastern Economic Corridor (EEC) draws working-age people into the factory towns. On the fringe villages, what is left is a household pattern of elders raising grandchildren — and a health system that was sized for the village they used to be.",
  coreTension:
    "Concentrate health resources in the EEC-town facilities where most of the working population is served — or distribute posts into a satellite-clinic and home-visit model that reaches the fringe elders the boom left behind.",
  decisionPoint:
    "Should the province hold its current concentrated model another cycle — or fund a distributed satellite-clinic + อสม.-supported home-visit model for the fringe villages, on a schedule the budget can actually sustain?",
  ethicalAxes: ["Concentrated efficiency vs. equitable access", "Distributive justice for the left-behind"],
  region: "EEC fringe villages, Rayong / Chonburi (Eastern Economic Corridor periphery)",
  cefr: "B1+/B2",
  hero: "/assets/scenarios/sdg03-eecfringe/images/hero.png",
  objectives: [
    "Analyse an EEC-fringe health dossier to map who is covered by each delivery model.",
    "Evaluate concentrated-efficiency claims against distributed-access claims on their own merits.",
    "Argue a sustainable sequencing decision to a provincial health committee in plain English.",
  ],
  outcomes: [
    "Explain the efficiency-vs-equity tension and the demographic-hollowing pattern in English.",
    "Assess satellite-clinic and อสม.-supported home-visit models on cost AND on reach.",
    "Generalise this SDG-3 reasoning to other left-behind-population health-access decisions.",
  ],
};

export const VOCABULARY = [
  { term: "demographic",   pos: "adjective",   gloss: "about the make-up of a population — how many old, young, working-age, etc.", th: "เกี่ยวกับโครงสร้างประชากร",
    ex: "The demographic shift toward an older population is reshaping every district's services." },
  { term: "hollowing",     pos: "noun",        gloss: "the process by which the middle of something is emptied while the edges remain", th: "การถูกถ่ายเทคนกลางออกไป",
    ex: "The hollowing of the village left an unusual mix of small children and their grandparents." },
  { term: "EEC",           pos: "proper noun", gloss: "Eastern Economic Corridor — a Thai industrial development zone across Rayong, Chonburi and Chachoengsao", th: "เขตพัฒนาพิเศษภาคตะวันออก",
    ex: "Thousands of working-age villagers commute daily into the EEC's factory towns." },
  { term: "อสม.",          pos: "proper noun", gloss: "village health volunteer (Asor Sor Mor) — a community-trained, often-unpaid first line of primary care", th: "อาสาสมัครสาธารณสุขประจำหมู่บ้าน",
    ex: "The อสม. checks on the village's elders weekly and refers the urgent cases up." },
  { term: "distributed",   pos: "adjective",   gloss: "spread out across many places, not concentrated in one", th: "แบบกระจาย (ไม่กระจุก)",
    ex: "A distributed clinic network reaches more villages than a single large hospital." },
  { term: "concentrated",  pos: "adjective",   gloss: "all kept in one place; the opposite of distributed", th: "แบบกระจุก (รวมศูนย์)",
    ex: "Resources stay concentrated in town because that is where the largest number of people are." },
  { term: "satellite clinic", pos: "noun",     gloss: "a small primary-care unit set in a village or sub-district to bring care closer to people", th: "คลินิกบริการนอกพื้นที่หลัก",
    ex: "The satellite clinic opens twice a week and covers the four nearest villages." },
  { term: "remittance",    pos: "noun",        gloss: "money sent home, often by a family member who has moved away to work", th: "เงินที่ส่งกลับบ้าน",
    ex: "The household's monthly remittance from the factory town is what pays for the medicine." },
  { term: "primary care",  pos: "noun",        gloss: "the first level of health service — local, routine, before any hospital is needed", th: "บริการสุขภาพปฐมภูมิ",
    ex: "Good primary care keeps small problems from becoming hospital problems." },
  { term: "sustainable",   pos: "adjective",   gloss: "able to keep going at the same level over time without breaking", th: "ยั่งยืน",
    ex: "A sustainable budget is one the province can hold even in a leaner year." },
];

export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — A village the boom did not actually leave",
    body: {
      1: `
The <vocab>EEC</vocab> is a big industrial zone in eastern Thailand. Factories, ports, business parks. Many working-age people from the small villages outside moved into the EEC towns for work. They send money home. They visit on holidays.

But the village did not get younger. It got older, and it got smaller. The grandmothers and grandfathers stayed. The grandchildren stayed, because their parents could not bring them to the factory town. What is left in many fringe villages is a household led by an elder, raising two or three small children.

This is not "the village the boom destroyed." The boom did not destroy it. The boom went around it. The health system, though, was sized for the village they used to be — full of working-age adults — not for the village they are now.
      `.trim(),
      2: `
The <vocab>EEC</vocab> — Eastern Economic Corridor — is the large industrial development zone across Rayong, Chonburi, and Chachoengsao. Factories, deep-sea ports, and business parks have drawn working-age labour out of the small fringe villages and into the EEC's factory towns. The migration is rarely permanent; <vocab>remittance</vocab> flows home, and visits at festivals and harvests keep family ties alive.

The villages themselves, however, have aged. What remains in many fringe communities is a <vocab>demographic</vocab> pattern: an elder household head — often a grandmother — raising one, two, or three small grandchildren whose parents are in the factory town. Three-generation households without the middle generation in residence.

This is not "the village the boom destroyed." The boom went around it. The provincial health system, though, was sized for the population the village used to have — predominantly working-age — not for the elder-and-child residual it has become.
      `.trim(),
      3: `
The <vocab>EEC</vocab> — Thailand's Eastern Economic Corridor — comprises the industrial development zone spanning Rayong, Chonburi, and Chachoengsao, anchored by deep-sea port, automotive, and electronics clusters. The zone has drawn working-age labour from the surrounding fringe villages into its factory towns; migration patterns are predominantly circular rather than permanent, with monthly <vocab>remittance</vocab> flows home and festival-cycle returns sustaining household ties.

The fringe villages themselves, however, have undergone material <vocab>demographic</vocab> change. The resident population is increasingly composed of elder household heads — frequently grandmothers — caring for grandchildren whose parents are in the EEC town. The pattern is a three-generation household with the working-age tier physically absent in routine.

The frame "the village the boom destroyed" overstates the case. The boom routed around the fringe rather than eliminating it. What the provincial health system inherits, however, is a service-design problem: an inherited capacity envelope sized for a working-age-majority village, applied to an elder-and-child residual community.
      `.trim(),
    },
  },
  {
    id: "part2",
    heading: "Part 2 — Demographic hollowing — what's left, where care has to go",
    body: {
      1: `
The pattern is called <vocab>demographic</vocab> <vocab>hollowing</vocab>. The middle of the village's age pyramid is gone — the working-age people who used to live there. The edges remain: elders and small children. Both need health care, but a very different kind.

Elders need <vocab>primary care</vocab> close to home: blood-pressure checks, regular medicines, follow-up after a fall. Small children need vaccinations, growth checks, and someone who knows the family when something goes wrong.

The current model concentrates posts in the EEC-town hospital, where the working-age population is served. The fringe village has the <vocab>อสม.</vocab> — the village health volunteer — and a trip of more than an hour to the hospital. Most days, the อสม. IS the system. Most weeks, the trip is too far for the grandmother to make and watch the children.
      `.trim(),
      2: `
The pattern is called <vocab>demographic</vocab> <vocab>hollowing</vocab>: the middle of the village's age structure — the working-age tier — has migrated out, leaving the elder and child edges in residence. Both edges need health services; both need very different services.

Elders need routine <vocab>primary care</vocab> close to home — blood-pressure monitoring, monthly chronic-disease medication, follow-up after a fall or hospitalisation. Children need vaccinations on schedule, growth checks, and a known clinician when symptoms appear. Neither population needs an EEC-town tertiary hospital for ninety percent of their actual contact with the health system.

The current model, however, is exactly that — posts and capacity <vocab>concentrated</vocab> in the EEC-town hospital that serves the working-age population. The fringe village has the <vocab>อสม.</vocab>, a community-trained volunteer, and a trip of an hour or more to the hospital. Most days, the อสม. IS the village's effective health system. Most weeks, the trip is too far for an elder caring for grandchildren to make and return from in a day.
      `.trim(),
      3: `
The structural pattern is termed <vocab>demographic</vocab> <vocab>hollowing</vocab>: the middle stratum of the village's age structure — the working-age tier — has out-migrated, leaving the elder and child cohorts in residence. Both retained cohorts generate substantial demand on the health system, but the service mix each requires is markedly distinct.

Elders require routinised <vocab>primary care</vocab> at proximate geography — blood-pressure surveillance, monthly chronic-condition pharmacotherapy, post-fall and post-hospitalisation follow-up. Children require scheduled vaccinations, developmental and growth surveillance, and continuity-of-clinician at symptom presentation. For neither population does roughly ninety percent of effective health contact require tertiary hospital infrastructure.

The current delivery model, however, instantiates exactly that: posts and capacity <vocab>concentrated</vocab> in the EEC-town tertiary facility that serves the working-age catchment. The fringe village's available primary-care resource is the community-trained <vocab>อสม.</vocab> plus an hour-plus journey to the EEC-town hospital. The functional consequence is that the อสม. constitutes the village's effective day-to-day health system, while the formal hospital journey is too costly in time for an elder caring for grandchildren to absorb within a working day.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg03-eecfringe/images/diagram-demographic-hollowing.png",
      alt: "Diagram showing the EEC-fringe village's age structure: working-age tier shown migrated out to the EEC town (left), with elder + child tiers remaining in residence (right). The hospital sits at the EEC-town end; the village has only the อสม. and a long journey in between.",
      caption: "Demographic hollowing. The working-age tier moves into the EEC town; the elder + child tiers remain in the village. The current health-system design follows the workers, not the residents.",
    },
  },
  {
    id: "part3",
    heading: "Part 3 — The access gap, the efficiency case, and what's on the table",
    body: {
      1: `
There is a measurable gap. The fringe villages have higher unmet <vocab>primary care</vocab> need, more missed routine appointments, and slower response to early warning signs. The <vocab>อสม.</vocab> catches a great deal of it — and her notebook is detailed — but she is one volunteer for many houses.

A reform proposal would re-balance posts. Fewer posts at the EEC-town hospital. New <vocab>satellite clinic</vocab>s in the fringe villages, twice or three times a week. Supported <vocab>อสม.</vocab> home visits in between. The model is called <vocab>distributed</vocab> care.

The hospital administrator argues the opposite — efficiency. His hospital is at capacity. Every post moved away serves fewer people per day. He is not against the villages. He is asking the province to choose the distributed model with its eyes open about who waits longer in town.
      `.trim(),
      2: `
The access gap is measurable. Fringe villages show higher unmet <vocab>primary care</vocab> need, lower routine-appointment uptake, and slower response to early warning signs — the exact contacts at which a hospital admission could have been prevented. The <vocab>อสม.</vocab> catches much of this from her notebook, but one volunteer cannot be the primary-care system for two dozen households.

A reform proposal would re-balance the post allocation. Fewer posts at the EEC-town tertiary hospital. <vocab>Distributed</vocab> capacity into village <vocab>satellite clinic</vocab>s opening two or three days a week. Supported อสม. home-visit rounds between clinic days. The model is more equitable in reach.

The EEC-town hospital administrator presents the counter-case sincerely. His facility runs at capacity, carrying both the EEC-town working population and the village overflow when the village cannot cope. Every post moved away from his wards serves fewer people per day. He is not against the fringe villages. He is asking the province to choose the distributed model with its eyes open about who, in the town, waits longer.
      `.trim(),
      3: `
The access gap is empirically established. Fringe villages exhibit higher unmet <vocab>primary care</vocab> need, depressed routine-appointment uptake, and delayed presentation at early warning thresholds — the contact set at which preventable hospitalisations are most efficiently averted. The <vocab>อสม.</vocab> intercepts a substantial proportion of this through informal community surveillance, but a single volunteer cannot operationally function as the primary-care system for a multi-household village.

A reform proposal would re-balance the post allocation: a marginal reduction at the EEC-town tertiary facility funds <vocab>distributed</vocab> capacity into village <vocab>satellite clinic</vocab>s with two-to-three-day weekly opening, supported by structured อสม. home-visit rounds in interim days. The reach-and-equity case is straightforward.

The EEC-town hospital administrator articulates the efficiency case in good faith. The facility operates at capacity, absorbing both the EEC-town working population and village overflow when fringe primary care fails. Each post displaced into a sparsely-attended satellite clinic represents a marginal serving-rate decrement on the tertiary ward. The administrator's position is not anti-village; it is a request that the province adopt the distributed model with explicit acknowledgement of the in-town wait-time consequence.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg03-eecfringe/images/chart-access-gap.png",
      alt: "Chart contrasting EEC-town primary-care coverage (left bars) with fringe-village coverage (right bars), showing the unmet-need gap; a projected curve of avoided hospital admissions under the distributed model.",
      caption: "Access gap at a glance. EEC-town primary-care coverage is high; fringe-village coverage shows a sustained shortfall. The distributed model trades a marginal in-town serving rate for a measurable reduction in preventable village admissions.",
    },
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: {
      1: `
The provincial health officer is right that the budget cannot do both at full strength in the same year. The hospital administrator is right that capacity at the EEC-town hospital is real. The <vocab>อสม.</vocab> is right that she is already the system. The grandmother is right that she does not need sorrow — she needs the care to come closer.

There is a defensible middle. Phase the <vocab>distributed</vocab> <vocab>satellite clinic</vocab> model in slowly — start in the villages with the highest unmet need, fund supported <vocab>อสม.</vocab> rounds first, prove cost-per-prevented-admission with a real cohort, then scale. Do not collapse the EEC-town hospital. Do not abandon the fringe.

Your team will brief the provincial health committee. The committee will not accept "it depends." It needs a position the budget can sustain and reasons that survive when the hospital administrator pushes back.
      `.trim(),
      2: `
The provincial health officer is correct that the budget envelope cannot finance both models at full strength in the same fiscal year. The hospital administrator is correct that EEC-town tertiary capacity is binding. The <vocab>อสม.</vocab> is correct that she is already the village's day-to-day health system. The grandmother is correct: she does not need sorrow; she needs the care to come closer.

A defensible middle exists. Phase the <vocab>distributed</vocab> <vocab>satellite clinic</vocab> model in — beginning with the fringe villages showing the highest unmet-need indicators, funding supported <vocab>อสม.</vocab> rounds first, demonstrating cost-per-prevented-admission with a real village cohort, then scaling — without collapsing the EEC-town hospital or abandoning the fringe. The model is <vocab>sustainable</vocab> precisely because it is sequenced, not maximalist.

Your team has been asked to brief the provincial health committee. The committee will not accept "it depends." It needs a defensible position that the budget can sustain — and reasoning that holds when the EEC-town administrator pushes back on the efficiency frontier.
      `.trim(),
      3: `
The provincial health officer's constraint claim is substantively accurate: the budget envelope cannot finance concentrated and distributed delivery at full strength concurrently. The EEC-town hospital administrator's capacity claim is substantively accurate: tertiary facility utilisation is binding. The <vocab>อสม.</vocab>'s claim — that she constitutes the village's day-to-day health system — is empirically supported. The grandmother's claim is the decision-relevant one: she requires not sympathy but proximate provision.

A defensible sequencing pathway exists. Phase-in of the <vocab>distributed</vocab> <vocab>satellite clinic</vocab> model commencing in the highest-unmet-need fringe villages; funded supported <vocab>อสม.</vocab> home-visit rounds as the initial intervention; cost-per-prevented-admission demonstration on a defined village cohort; subsequent scaling against demonstrated saving — implemented without collapse of EEC-town tertiary capacity and without abandonment of the fringe. The pathway is <vocab>sustainable</vocab> because it is sequenced, not maximalist.

Your team will brief the provincial health committee prior to allocation lock. The committee will not entertain indeterminacy; it requires a defensible position the budget envelope can sustain and an evidentiary rationale robust to challenge from the EEC-town efficiency case.
      `.trim(),
    },
  },
];

export const STAKEHOLDERS = [
  {
    id: "s01-grandmother",
    role: "Household head; grandmother raising two grandchildren in a fringe village",
    roleTh: "ยายผู้เลี้ยงดูหลานสองคนในหมู่บ้านชายขอบ EEC",
    location: "An EEC-fringe village, Rayong / Chonburi periphery",
    flags: ["household-head", "female", "elder", "chronic-condition"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg03-eecfringe/images/stakeholder-01.png",
    video: "/assets/scenarios/sdg03-eecfringe/video/01-grandmother.mp4",
    caption: "/assets/scenarios/sdg03-eecfringe/audio/01-grandmother.vtt",
    duration: 33,
    position:
      "I am not asking for pity — I run this house. My son and his wife are in the factory town; they send money, they come when they can. I raise the two children. My blood-pressure medicine, I need every month. The hospital is more than an hour each way, and on those days no one watches the children. The volunteer is good but she has too many houses. I do not need sorrow. I need the care to come closer.",
    transcript:
      "I am not asking for pity — I run this house. My son and his wife are in the factory town; they send money, they come when they can. I raise the two children. My blood-pressure medicine, I need every month. The hospital is more than an hour each way, and on those days no one watches the children. The volunteer is good but she has too many houses. I do not need sorrow. I need the care to come closer.",
    primaryConcern: "Not asking for sympathy — asking for proximate care: a system that comes to the village, so a chronic-condition trip doesn't require leaving the grandchildren alone",
    primaryConcernTh: "ไม่ต้องการความสงสาร — ต้องการให้บริการสุขภาพมาใกล้บ้าน เพื่อไม่ต้องทิ้งหลานไปโรงพยาบาลทั้งวัน",
  },
  {
    id: "s02-provincial-officer",
    role: "Provincial health officer, sub-provincial health authority",
    roleTh: "เจ้าหน้าที่สาธารณสุขจังหวัด",
    location: "Provincial public health office, EEC fringe province",
    flags: ["institutional", "female", "budget-constrained"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg03-eecfringe/images/stakeholder-02.png",
    video: "/assets/scenarios/sdg03-eecfringe/video/02-provincial-officer.mp4",
    caption: "/assets/scenarios/sdg03-eecfringe/audio/02-provincial-officer.vtt",
    duration: 32,
    position:
      "My mandate is the whole province, with the staff and budget I am actually given. The EEC-town facilities carry the largest load; if they fail, more people are harmed. I do not dispute the fringe villages are under-served — I see those numbers. But I cannot fund a distributed model on a reform that is not approved, then watch it collapse in two years. Give me a position I can sustain, not the most generous one on paper.",
    transcript:
      "My mandate is the whole province, with the staff and budget I am actually given. The EEC-town facilities carry the largest load; if they fail, more people are harmed. I do not dispute the fringe villages are under-served — I see those numbers. But I cannot fund a distributed model on a reform that is not approved, then watch it collapse in two years. Give me a position I can sustain, not the most generous one on paper.",
    primaryConcern: "A genuine constraint — finite envelope, accountable for province-wide harm, needs a sustainable not maximalist phased plan",
    primaryConcernTh: "ข้อจำกัดงบประมาณจริง รับผิดชอบทั้งจังหวัด ต้องการแผนที่ยั่งยืน ไม่ใช่แผนที่ดูดีบนกระดาษแล้วล้มเหลวในสองปี",
  },
  {
    id: "s03-eec-administrator",
    role: "Hospital administrator, EEC-town tertiary facility (efficiency case)",
    roleTh: "ผู้บริหารโรงพยาบาลในเมือง EEC (มุมประสิทธิภาพ)",
    location: "EEC-town tertiary hospital, EEC industrial corridor",
    flags: ["institutional", "male", "capacity-binding"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg03-eecfringe/images/stakeholder-03.png",
    video: "/assets/scenarios/sdg03-eecfringe/video/03-eec-administrator.mp4",
    caption: "/assets/scenarios/sdg03-eecfringe/audio/03-eec-administrator.vtt",
    duration: 31,
    position:
      "Let me make the uncomfortable case, because it is real. My hospital absorbs the workers who power this economy and the overflow when the villages cannot cope. We run at capacity. Every post moved to a clinic seeing a handful a day is a post off my wards, where it would serve far more. I am not against the villages. But efficiency is not a dirty word when staff are this scarce — choose the distributed model with your eyes open about who waits longer here.",
    transcript:
      "Let me make the uncomfortable case, because it is real. My hospital absorbs the workers who power this economy and the overflow when the villages cannot cope. We run at capacity. Every post moved to a clinic seeing a handful a day is a post off my wards, where it would serve far more. I am not against the villages. But efficiency is not a dirty word when staff are this scarce — choose the distributed model with your eyes open about who waits longer here.",
    primaryConcern: "A real efficiency frontier — capacity-binding tertiary facility cannot lose posts without a wait-time consequence; asks the province to commit knowingly, not sentimentally",
    primaryConcernTh: "ขอบจำกัดด้านประสิทธิภาพที่เป็นจริง — โรงพยาบาลเต็มกำลังการรับ ต้องการให้จังหวัดเลือกอย่างรู้ผลกระทบ ไม่ใช่ตัดสินด้วยความรู้สึก",
  },
  {
    id: "s04-osm-volunteer",
    role: "อสม. — village health volunteer, fringe village (bridging voice)",
    roleTh: "อาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.)",
    location: "An EEC-fringe village, Rayong / Chonburi periphery",
    flags: ["bridging", "female", "informal-system"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg03-eecfringe/images/stakeholder-04.png",
    video: "/assets/scenarios/sdg03-eecfringe/video/04-osm-volunteer.mp4",
    caption: "/assets/scenarios/sdg03-eecfringe/audio/04-osm-volunteer.vtt",
    duration: 34,
    position:
      "I am not a nurse. I am from this village; I do this without a salary because someone must. I have a notebook. I know which grandmother's pressure is high with her children away, which elder stopped eating after his wife died, which one has no one to reach the hospital this month. Most days, here, I am the system. I do not want to replace the hospital. A little more support for people like me — and a clinic that comes here — catches most of this before it becomes an ambulance.",
    transcript:
      "I am not a nurse. I am from this village; I do this without a salary because someone must. I have a notebook. I know which grandmother's pressure is high with her children away, which elder stopped eating after his wife died, which one has no one to reach the hospital this month. Most days, here, I am the system. I do not want to replace the hospital. A little more support for people like me — and a clinic that comes here — catches most of this before it becomes an ambulance.",
    primaryConcern: "Sequencing — fund supported อสม. rounds plus a satellite clinic; catch problems early so the hospital is for what it actually needs to handle",
    primaryConcernTh: "ลำดับขั้น — สนับสนุน อสม. และเปิดคลินิกใกล้บ้านก่อน เพื่อจับปัญหาแต่เนิ่น ๆ ก่อนต้องส่งโรงพยาบาล",
  },
];

export const INSTITUTIONS_CITED = [
  { name: "Ministry of Public Health, Thailand (สธ.)",            role: "National health policy, budget framework, and primary-care reform" },
  { name: "National Health Security Office (NHSO / สปสช.)",       role: "Universal Coverage Scheme financing and reimbursement design" },
  { name: "Provincial Public Health Office (สำนักงานสาธารณสุขจังหวัด)", role: "Sub-provincial allocation; posts; satellite-clinic operations" },
  { name: "Eastern Economic Corridor Office of Thailand (EECO)",  role: "Economic-zone development framework around the fringe villages" },
  { name: "Department of Health Service Support (กรมสนับสนุนบริการสุขภาพ)", role: "Stewards the อสม. village-health-volunteer programme" },
  { name: "WHO Thailand & UNDP Thailand",                         role: "Co-publish evidence on Thai health equity and the SDG-3 monitoring frame" },
];

export const RESOURCES = [
  { label: "UN SDG 3 — Good Health and Well-being", url: "https://sdgs.un.org/goals/goal3" },
  { label: "WHO Thailand — country office", url: "https://www.who.int/thailand" },
  { label: "EECO — Eastern Economic Corridor Office", url: "https://www.eeco.or.th" },
  { label: "SDG Move — Thailand SDG knowledge hub", url: "https://www.sdgmove.com" },
];
