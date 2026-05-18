/**
 * FUTUREPROOF — SDG 6 Khon Kaen Scenario Content
 *
 * "The Aquifer Below Khon Kaen" — showcase scenario.
 * Spec source: /scenarios/sdg06-khonkaen-aquifer-v1/PRODUCTION-MASTER.md
 *
 * This module is pure data — dossier text, stakeholder profiles,
 * vocabulary glosses, asset references. UI logic lives in
 * sdg06-khonkaen-m1.js.
 */

export const SCENARIO_META = {
  id: "sdg06-khonkaen-aquifer-v1",
  sdg: 6,
  title: "The Aquifer Below Khon Kaen",
  titleTh: "ชั้นน้ำใต้ดินใต้ขอนแก่น",
  setting:
    "Khon Kaen sits above the Khorat Plateau aquifer, a freshwater store shared with Laos. As dry seasons lengthen, more of the province's drinking water comes from underground.",
  coreTension:
    "Deepening the municipal wellfield secures dry-season supply for around 200,000 residents but accelerates aquifer drawdown the next generation will inherit.",
  decisionPoint:
    "Should the province authorize an additional 12 deep wells this dry season, knowing the aquifer's recharge rate cannot keep pace with current extraction?",
  ethicalAxes: ["Distributive justice", "Intergenerational equity"],
  region: "Nam Phong / Ubolratana watershed, Khon Kaen Province",
  cefr: "B1+/B2",
};

/**
 * Vocabulary foregrounded in the dossier. On hover/tap students see the
 * Thai gloss. Used in M1 quiz item 4.
 */
export const VOCABULARY = [
  { term: "aquifer",      pos: "noun",      gloss: "an underground layer of rock or soil that holds water", th: "ชั้นน้ำใต้ดิน",
    ex: "The desert town drills deep to reach one ancient aquifer." },
  { term: "drawdown",     pos: "noun",      gloss: "a lowering of a water level caused by taking water out", th: "การลดลงของระดับน้ำจากการสูบ",
    ex: "Heavy irrigation caused a rapid drawdown of the reservoir by August." },
  { term: "mandate",      pos: "noun",      gloss: "official authority or a duty to act", th: "อาณัติ / หน้าที่ตามกฎหมาย",
    ex: "The new agency has a clear mandate to inspect every food factory." },
  { term: "allocation",   pos: "noun",      gloss: "the way a limited resource is divided among users", th: "การจัดสรร",
    ex: "Parliament argued for hours over the allocation of the disaster-relief budget." },
  { term: "threshold",    pos: "noun",      gloss: "a point beyond which behaviour or a result changes sharply", th: "ขีดแบ่ง / จุดวิกฤต",
    ex: "Once the debt passes a certain threshold, the loan's interest rate jumps." },
  { term: "intrusion",    pos: "noun",      gloss: "the unwanted movement of one thing into another", th: "การรุกล้ำ",
    ex: "An alarm warns staff of any intrusion into the secure server room." },
  { term: "equitable",    pos: "adjective", gloss: "fair in a way that accounts for people's different needs", th: "เป็นธรรม",
    ex: "They divided the inheritance in an equitable way, giving more to the child who had cared for their mother." },
  { term: "jurisdiction", pos: "noun",      gloss: "the area or matters over which an authority has power", th: "เขตอำนาจ",
    ex: "Traffic on the bridge falls under the city's jurisdiction, not the province's." },
  { term: "residual",     pos: "adjective", gloss: "remaining; a small amount or margin left over", th: "ส่วนที่เหลือ / ส่วนสำรอง",
    ex: "After the refund cleared, a small residual balance stayed on the card." },
];

/**
 * Four-part dossier text. Each part is one card in the dossier viewer.
 * <vocab>term</vocab> markup triggers a Thai gloss tooltip on hover.
 */
export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — Why the wells matter",
    body: `
Khon Kaen province draws its drinking water from two sources. The first is surface water, mainly the Ubolratana Reservoir on the Nam Phong River. The second is groundwater, pumped from a network of deep wells that tap the Khorat Plateau <vocab>aquifer</vocab> below the city.

In recent years, surface water has become less reliable. The reservoir reached zero usable capacity during three separate dry seasons within the last decade. Each time, the Provincial Waterworks Authority (PWA) leaned more heavily on the wellfield to keep household taps running.

The <vocab>aquifer</vocab> below the plateau is not endless. Reports from the Department of Groundwater Resources describe accelerating <vocab>drawdown</vocab> — water tables are dropping faster than the rainy season can refill them. In some districts, shallow wells that families have used for generations now run dry by March.

The province has approved a plan to add 12 new deep wells this dry season. The plan is legal under the Groundwater Act B.E. 2520. Whether it is wise is a different question — and that question depends on whose interests you weigh first.
    `.trim(),
  },
  {
    id: "part2",
    heading: "Part 2 — Who depends on the aquifer",
    body: `
Around 200,000 residents in Khon Kaen city rely on PWA-supplied tap water. PWA's statutory <vocab>mandate</vocab> is to keep that supply continuous. If taps run dry for even a few days, the public health and political costs are severe.

Outside the city, smallholder farmers across the Nam Phong basin depend on shallow private wells. These wells were drilled cheaply — most reach only 30 to 60 metres. They tap the upper <vocab>aquifer</vocab> layer that recharges from rainfall each monsoon. When the city's deeper municipal wells draw heavily, the upper layer drops too, and family wells run dry weeks earlier than they used to.

Industrial users — including food-processing facilities and beverage manufacturers — hold permits issued under separate regulations. Some facilities in the basin pump from layers 200 metres or deeper. Their permits were granted years ago, when the <vocab>aquifer</vocab> was considered abundant.

Community Health Volunteers (อสม.) in rural districts report a pattern: when household wells fail, families switch to surface ponds or unfiltered river water. Diarrhoea cases in young children rise within two weeks. The link is not catastrophic, but it is consistent.
    `.trim(),
  },
  {
    id: "part3",
    heading: "Part 3 — Why the aquifer cannot just be refilled",
    body: `
The Khorat Plateau <vocab>aquifer</vocab> recharges slowly. Rainfall must percolate through layers of soil and rock, a process measured in years and decades, not weeks. The plateau also contains zones of natural rock salt. When the <vocab>aquifer</vocab> is drawn down too far, brine from these deeper layers can move upward and contaminate freshwater supplies — a process called saline <vocab>intrusion</vocab>.

Researchers at Khon Kaen University and at the Thailand Development Research Institute (TDRI) have warned that <vocab>allocation</vocab> decisions made today will lock in water-quality outcomes for the next generation. Once an <vocab>aquifer</vocab> turns saline, reversing the damage takes decades, if it can be done at all.
    `.trim(),
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: `
The province has the legal <vocab>mandate</vocab> to drill the new wells. The PWA has the operational need. The <vocab>aquifer</vocab> has a <vocab>threshold</vocab> beyond which damage is no longer reversible. Different stakeholders disagree about whether that <vocab>threshold</vocab> has already been crossed.

Your team has been asked to brief the provincial council before the wellfield expansion is finalized. The council will not accept "it depends." It needs a position — and reasoning that holds up when other stakeholders push back.
    `.trim(),
  },
];

/**
 * Four stakeholder profiles. Each has:
 *   - role label + sector flag
 *   - position statement (revealed in stakeholder panel)
 *   - audio dispatch reference (real file or placeholder)
 *   - portrait reference (real or placeholder)
 *   - vulnerability/female/institutional/private flags (for QA only)
 */
export const STAKEHOLDERS = [
  {
    id: "s01-farmer",
    role: "Smallholder rice farmer",
    roleTh: "เกษตรกรผู้ปลูกข้าวรายย่อย",
    location: "Nong Rua District, Khon Kaen",
    flags: ["vulnerable", "male"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg06-khonkaen/images/stakeholder-01.png",
    video: "/assets/scenarios/sdg06-khonkaen/video/01-rice-farmer.mp4",
    duration: 32,
    position:
      "My family has farmed this land for three generations. The shallow well in our yard used to run all year. Now, by March, it gives nothing. I hear the province will dig deeper wells in town. I do not blame them — people need to drink. But the water under our feet is the same water. If they pull more, mine runs dry sooner. The officials say their wells are deeper than mine, so they will not affect us. The ground does not work like that. The rain that falls on my field is the rain that fills their wells.",
    transcript:
      "My family has farmed this land for three generations. The shallow well in our yard — it used to run all year. Now? By March, it gives nothing. I hear the province will dig deeper wells in town. I do not blame them. People need to drink. But the water under our feet is the same water. If they pull more, mine runs dry sooner. That is just how the ground works.",
    primaryConcern: "His shallow well running dry by March",
    primaryConcernTh: "บ่อตื้นของครอบครัวที่แห้งเร็วเกินไปทุกเดือนมีนาคม",
  },
  {
    id: "s02-pwa",
    role: "PWA Operations Manager",
    roleTh: "ผู้จัดการฝ่ายปฏิบัติการ การประปาส่วนภูมิภาคขอนแก่น",
    location: "Provincial Waterworks Authority — Khon Kaen Branch",
    flags: ["institutional", "female"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg06-khonkaen/images/stakeholder-02.png",
    video: "/assets/scenarios/sdg06-khonkaen/video/02-pwa-manager.mp4",
    duration: 32,
    position:
      "Our statutory mandate is clear: continuous potable water to around 200,000 residents in this service area. In each of the last three drought years, we came within days of supply interruption. The twelve-well expansion is sized to provide a residual margin during a one-in-fifty-year dry season. The hydrogeological assessment supporting our permit application identifies a confined lower layer with minimal leakage risk. We have heard the concerns from rural districts and from the university working paper. We are prepared to commission additional monitoring — but we cannot operate the city on a precautionary delay. Taps must run.",
    transcript:
      "Our statutory mandate is clear: continuous potable water to around two hundred thousand residents in this service area. In each of the last three drought years, we came within days of supply interruption. The twelve-well expansion is sized to provide a residual margin during a one-in-fifty-year dry season. We have heard the concerns from rural districts and from the university working paper. We are prepared to commission additional monitoring. But taps must run.",
    primaryConcern: "Statutory mandate to supply ~200,000 residents",
    primaryConcernTh: "อาณัติตามกฎหมายในการจัดส่งน้ำให้ประชากรราว 200,000 คน",
  },
  {
    id: "s03-plant",
    role: "Food-processing facility Production Director",
    roleTh: "ผู้อำนวยการฝ่ายผลิต โรงงานแปรรูปอาหารในแอ่งขอนแก่น",
    location: "Regional food-processing facility, Khon Kaen basin",
    flags: ["private", "male"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg06-khonkaen/images/stakeholder-03.png",
    video: "/assets/scenarios/sdg06-khonkaen/video/03-plant-director.mp4",
    duration: 30,
    position:
      "Our facility holds a groundwater extraction permit issued under the framework that has governed industrial water use in this region for nearly five decades. We extract from the deep confined layer, well below any household well. Our extraction volume is monitored and reported quarterly. The current debate about the municipal expansion has surfaced calls to revisit all extraction permits in the basin. We support sustainable allocation. We do not support retroactive cancellation of permits granted in good faith. A predictable regulatory environment is essential to continued operation and to the jobs our facility supports.",
    transcript:
      "Our facility holds a groundwater extraction permit issued under the framework that has governed industrial water use in this region for nearly five decades. We extract from the deep confined layer, well below any household well. Our extraction volume is monitored and reported quarterly. We support sustainable allocation. We do not support retroactive cancellation of permits granted in good faith. A predictable regulatory environment is essential.",
    primaryConcern: "Predictable regulatory environment / permit predictability",
    primaryConcernTh: "ความแน่นอนของกรอบการกำกับดูแลและการต่ออายุใบอนุญาต",
  },
  {
    id: "s04-vhv",
    role: "Community Health Volunteer (อสม.)",
    roleTh: "อาสาสมัครสาธารณสุขประจำหมู่บ้าน",
    location: "Rural sub-district near Ban Phai, Khon Kaen",
    flags: ["vulnerable-adjacent", "female"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg06-khonkaen/images/stakeholder-04.png",
    video: "/assets/scenarios/sdg06-khonkaen/video/04-health-volunteer.mp4",
    duration: 34,
    position:
      "I have walked the houses in my sub-district for eleven years. Two patterns repeat. When the shallow wells fail in March, families turn to ponds or river water. Within two weeks, mothers bring children with diarrhoea to our health post. Older residents stop drinking enough because they do not trust the taste of the surface water. Dehydration in the elderly is a quieter problem but a real one. I do not have hydrogeology training. I have a notebook with eleven years of household visits. The pattern I see is that decisions about water are decisions about who gets sick. Please remember the children when you decide.",
    transcript:
      "I have walked the houses in my sub-district for eleven years. When the shallow wells fail in March, families turn to ponds or river water. Within two weeks, mothers bring children with diarrhoea to our health post. Older residents stop drinking enough because they do not trust the taste. Dehydration in the elderly is a quieter problem, but it is real. Please remember the children when you decide.",
    primaryConcern: "Diarrhoea in children + dehydration in elderly during shortages",
    primaryConcernTh: "โรคท้องร่วงในเด็กและภาวะขาดน้ำในผู้สูงอายุช่วงน้ำขาดแคลน",
  },
];

/**
 * Discipline-of-citation: real institutions named in the dossier.
 * Surfaced in the dossier viewer footer for transparency.
 */
export const INSTITUTIONS_CITED = [
  { name: "Provincial Waterworks Authority (PWA)",          role: "Statutory drinking-water supplier" },
  { name: "Department of Groundwater Resources (DGR)",      role: "Well-permit regulator under MNRE" },
  { name: "Royal Irrigation Department (RID)",              role: "Surface-water release schedules" },
  { name: "Khon Kaen University — Groundwater Research Institute (GWRI)", role: "Independent academic monitoring" },
  { name: "Thailand Development Research Institute (TDRI)", role: "Policy-research authority" },
  { name: "Village Health Volunteers (อสม.) / MOPH",        role: "Community-level health surveillance" },
];

export const RESOURCES = [
  { label: "UN SDG 6 — Clean Water & Sanitation", url: "https://sdgs.un.org/goals/goal6" },
  { label: "UN-Water — global water facts & data", url: "https://www.unwater.org" },
  { label: "SDG Move — Thailand SDG knowledge hub", url: "https://www.sdgmove.com" },
];
