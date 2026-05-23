/**
 * FUTUREPROOF — SDG 4 Mae Sot Scenario Content
 *
 * "The Children at the Border" — fifth fully-built journey mission.
 * Spec source: /scenarios/PRODUCTION-PROMPTS-MASTER-v2.md → Mission 5
 *
 * Pure data module — dossier text, stakeholder profiles, vocabulary
 * glosses, asset references. UI logic lives in sdg04-takmaesot-m1.js.
 *
 * ── DIGNITY-FIRST GUARDRAIL ─────────────────────────────────────────
 * This scenario centres on migrant and stateless children at the
 * Thai–Myanmar border. ALL authored text MUST:
 *   • frame the child as rights-holder, not object of pity
 *   • name no real child, school, NGO worker, or family
 *   • present the dilemma as institutional sequencing, NOT illegality
 *   • respect Karen, Burmese, and Thai-Karen identities equally
 *
 * ── ADAPTIVE READING TIERS (Reconstruction Master §5, decision D2) ──
 * Every DOSSIER part's `body` is an object keyed by reading tier:
 *   { 1: <A2–B1 text>, 2: <B1+–B2 baseline>, 3: <B2+–C1 text> }
 * Tier 2 is the canonical reference register (matches Bangkok / Chiang Mai).
 * Audio / video are NOT tiered — the .vtt caption is the scaffold.
 */

export const SCENARIO_META = {
  id: "sdg04-takmaesot-border-v1",
  sdg: 4,
  title: "The Children at the Border",
  titleTh: "เด็ก ๆ ที่ชายแดน",
  setting:
    "Mae Sot, in Tak province, sits along the Moei River that marks the Thai–Myanmar border. Thousands of migrant and stateless children live here. Two education systems run in parallel: Migrant Learning Centres in their own language, and Thai government schools.",
  coreTension:
    "A proposal would phase down the non-formal Migrant Learning Centres and redirect funds to Thai-school absorption — promising every child a recognised credential, but risking a large cohort drop-out if the bridging capacity does not yet exist.",
  decisionPoint:
    "Should the district phase down the Migrant Learning Centres on the current calendar — before a funded, demonstrated bridging-and-absorption capacity in the Thai schools is in place?",
  ethicalAxes: ["Right to recognised education vs. transition harm", "Formal inclusion vs. effective inclusion"],
  region: "Mae Sot border district, Tak province (Thai–Myanmar frontier)",
  cefr: "B1+/B2",
  hero: "/assets/scenarios/sdg04-takmaesot/images/hero.png",
  // 3 objectives — what the learner does during this mission.
  objectives: [
    "Analyse a border-education dossier to map who is included vs. left behind by each pathway.",
    "Evaluate formal credential access against the transition harm of phasing centres down too early.",
    "Argue the sequencing decision to a District Education committee in plain, defensible English.",
  ],
  // 3 outcomes — what the learner can do AFTER the mission.
  outcomes: [
    "Explain the right-to-education and inclusion-vs-enrolment tensions in English.",
    "Assess the bridging-and-absorption sequencing question on its own terms — not as charity.",
    "Generalise this SDG-4 reasoning to other education-equity decisions at borders or in cities.",
  ],
};

/**
 * Vocabulary foregrounded in the dossier. Same gloss schema as Bangkok.
 */
export const VOCABULARY = [
  { term: "non-formal",     pos: "adjective",   gloss: "outside the official recognised education system, but real teaching and learning still happen", th: "การศึกษานอกระบบ",
    ex: "Many adults finish their schooling through non-formal evening classes." },
  { term: "credential",     pos: "noun",        gloss: "an official document that proves a qualification has been earned", th: "วุฒิการศึกษา / ประกาศนียบัตร",
    ex: "Without a recognised credential, she could not apply for the public university." },
  { term: "cohort",         pos: "noun",        gloss: "a group of students moving through the system together in the same year", th: "รุ่น (นักเรียน)",
    ex: "This year's cohort is twice the size of last year's." },
  { term: "absorption",     pos: "noun",        gloss: "the capacity of a system to take in more people without breaking", th: "ความสามารถในการรองรับ",
    ex: "The shelter's absorption is limited by the number of beds." },
  { term: "bridging",       pos: "noun",        gloss: "the transitional support that helps learners cross from one system to another", th: "การเชื่อมต่อระบบ / การปูทาง",
    ex: "She enrolled in a bridging course before applying to the international programme." },
  { term: "inclusion",      pos: "noun",        gloss: "meaningful participation — being in the room and able to take part", th: "การมีส่วนร่วมอย่างแท้จริง",
    ex: "Translating the worksheets was the first step toward real inclusion." },
  { term: "allocation",     pos: "noun",        gloss: "the share of resources or funding given to a particular place or group", th: "การจัดสรร (งบประมาณ)",
    ex: "The school's annual allocation depends on how many registered students it has." },
  { term: "recognised",     pos: "adjective",   gloss: "officially accepted by an authority — for school, by the Ministry of Education", th: "ได้รับการรับรอง",
    ex: "Only diplomas from recognised institutions are accepted by the licensing board." },
  { term: "Mae Sot",        pos: "proper noun", gloss: "the Thai border town in Tak province across the Moei River from Myawaddy, Myanmar", th: "อำเภอแม่สอด จังหวัดตาก",
    ex: "Mae Sot has long been a crossroads for trade and migration along the Moei River." },
  { term: "MLC",            pos: "proper noun", gloss: "Migrant Learning Centre — a community school for migrant and stateless children, often using Karen or Burmese as the medium of instruction", th: "ศูนย์การเรียนรู้สำหรับเด็กข้ามชาติ",
    ex: "The MLC offers classes in Karen, Burmese and Thai, but its certificates are not officially recognised." },
];

/**
 * Four-part dossier — same facts, three registers, paired figures on
 * Parts 2 (two-systems explainer) and 3 (allocation chart).
 */
export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — A border that is also a school district",
    body: {
      1: `
The town of <vocab>Mae Sot</vocab> sits on the Thai side of the Moei River. The river is the border with Myanmar. For decades, families have crossed this border — for work, for safety, for school. Many children who live in Mae Sot were born here. Their parents were born across the river.

These children are migrant or stateless. Some have papers. Many do not. Either way, they grow up in Mae Sot. They go to school in Mae Sot. They make friends in Mae Sot. They are part of the town.

There are two kinds of school for them. Thai government schools. And community schools called Migrant Learning Centres — in short, <vocab>MLC</vocab>. The MLC teaches in a language the child already knows. The Thai school teaches a credential the state already accepts. Both are real. Neither is enough on its own.
      `.trim(),
      2: `
The town of <vocab>Mae Sot</vocab>, in Tak province, sits on the Thai bank of the Moei River — the border with Myanmar. For decades, families have crossed this border for work, refuge, and schooling. Many of the children who live here today were born in Mae Sot; many of their parents were not. Migrant and stateless children grow up in this town — some documented, many not — and they belong to its everyday life.

Two parallel education pathways serve them. Thai government schools deliver the formal, <vocab>recognised</vocab> curriculum and, with it, the credentials the Thai state accepts. <vocab>MLC</vocab>s — Migrant Learning Centres — are community schools, often run in Karen or Burmese, that meet the child in the language and rhythm they already live in.

Each pathway is real, and each is partial. The MLC reaches children the Thai system has not yet absorbed. The Thai school issues the document that opens every Thai door. Neither, alone, finishes the job.
      `.trim(),
      3: `
<vocab>Mae Sot</vocab>, in Tak province on the Moei River, is a Thai border district whose education problem has long since stopped being a border problem. Families have crossed for work and refuge for decades; a generation of migrant and stateless children has been raised in the town itself — some documented, many not — and constitutes part of its lived community.

Two parallel pathways currently serve these learners. Thai government schools deliver the formal, state-<vocab>recognised</vocab> curriculum and confer the credential the Thai system accepts as the gateway to further schooling and licensed work. <vocab>MLC</vocab>s — Migrant Learning Centres — function as community schools, frequently instructing in Karen or Burmese, and meet learners in a language and social register they already inhabit.

Each pathway addresses a real need; each is structurally incomplete. The MLC reaches children whom the Thai system has not yet absorbed; the Thai school issues the documentary credential that opens every subsequent Thai institutional door. Treated in isolation, neither pathway can deliver the right to education in its full sense.
      `.trim(),
    },
  },
  {
    id: "part2",
    heading: "Part 2 — Two systems, one child",
    body: {
      1: `
Look at one child. In an <vocab>MLC</vocab> classroom, the lesson is in Karen or Burmese. The teacher is trained. The community trusts the school. But at the end of the year, the certificate is not <vocab>recognised</vocab> by the Thai Ministry. The child cannot use it to enter a Thai high school, a Thai college, a Thai job. The schooling is real, but the door is closed.

Now move the child to the Thai school. The diploma counts. But the lessons are in Thai. The classrooms are already over <vocab>absorption</vocab>. The teachers do not all speak Karen. There is little <vocab>bridging</vocab> support. The child is in the room, but cannot follow the lesson.

This is the trap. "Enrolment" — sitting in a Thai classroom — is not the same as <vocab>inclusion</vocab>. The first is a number for a report. The second is whether the child can actually learn.
      `.trim(),
      2: `
Hold one child in mind. In an <vocab>MLC</vocab>, the medium of instruction is Karen or Burmese; the teachers are trained, often locally; the community trusts the school enough to send its daughters as well as its sons. But at year's end the certificate is not <vocab>recognised</vocab> by the Thai Ministry. The child cannot present it to a Thai secondary school, a Thai college, or a licensed Thai job. The learning is genuine; the credential door is closed.

Move that same child to the Thai school. Now the diploma counts. But the language of instruction is Thai; the classrooms are already past their stated <vocab>absorption</vocab> capacity; <vocab>bridging</vocab> staff who could close the language gap are few or absent; the teaching schedule was not built for a learner arriving from outside it. The child is enrolled, but cannot follow the lesson.

This is the trap the district is being asked to solve. Enrolment — counting a child as present in a Thai classroom — is not the same thing as <vocab>inclusion</vocab>. The first is a number on a return. The second is whether the child is, in any meaningful sense, in school.
      `.trim(),
      3: `
Hold a single learner in mind. Within an <vocab>MLC</vocab>, the medium of instruction is typically Karen or Burmese; teachers are trained, frequently from the same diaspora community; trust is sufficient that families enrol daughters as readily as sons. At year's end, however, the certification is not <vocab>recognised</vocab> by the Thai Ministry of Education and is therefore non-portable into Thai secondary schooling, tertiary admission, or any licensed Thai employment. The learning is substantive; the credential channel is foreclosed.

Migrate the same learner into the Thai school system. The diploma now confers durable credential portability. But the medium of instruction is Thai; the receiving classrooms sit beyond their stated <vocab>absorption</vocab> capacity; <vocab>bridging</vocab> staff capable of closing the linguistic gap are sparse or absent; the institutional timetable was not designed to receive a learner arriving from outside it. Enrolment is recorded, but lesson access is not.

This constitutes the district's actual decision frontier. Enrolment — the registration of a learner within a Thai classroom roll — is not co-extensive with <vocab>inclusion</vocab>. The former populates a return; the latter measures whether the learner is, in any educationally meaningful sense, present.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg04-takmaesot/images/diagram-two-systems.png",
      alt: "Diagram of the two parallel education pathways at Mae Sot: Migrant Learning Centres (community-language, non-recognised credential) and Thai government schools (recognised credential, over-capacity, no bridging staff). A child is shown between them with a credential gap and a language gap.",
      caption: "Two systems, one child. MLCs reach the learner in their language but issue a non-recognised credential. Thai schools issue the recognised credential but lack bridging capacity to absorb new cohorts. Neither alone delivers the right to education.",
    },
  },
  {
    id: "part3",
    heading: "Part 3 — The allocation, the proposal, and who pays first",
    body: {
      1: `
Thai schools are funded by a per-pupil <vocab>allocation</vocab>. The number of officially-counted students sets the budget for the next cycle. The District Education office has to live inside that budget. It cannot grow it just because demand grows.

So a proposal is on the table. Phase down the <vocab>MLC</vocab>s. Redirect the funds saved into Thai-school <vocab>absorption</vocab> — more teachers, more classrooms, real <vocab>bridging</vocab> support — and bring every migrant child into the recognised system. The slogan is honest: Education For All.

The risk is the gap between the announcement and the bridge. If the MLCs close in the same term that bridging posts are still being hired, where does the child go? Some make it across. Some get lost. The cost of a missing year falls hardest on the family with the fewest options.
      `.trim(),
      2: `
Thai schools are financed on a per-pupil <vocab>allocation</vocab> formula. The roll of officially-counted students in one year sets the funded posts in the next. The District Education office must operate inside that allocation; it cannot expand it merely because attendance pressure grows on the border.

A proposal is now in front of the office. Phase down the <vocab>MLC</vocab>s; redirect the released resource into Thai-school <vocab>absorption</vocab> capacity — additional posts, additional rooms, dedicated <vocab>bridging</vocab> staff — and migrate every migrant child into the formally recognised system. The framing is honest: Education For All, in the recognised stream.

The hazard is the gap between the announcement and the bridge. If the MLCs are phased down on a calendar while bridging posts and rooms are still being staffed, the cohort moving across does not arrive in inclusion — it arrives in an overwhelmed classroom or, worse, in no classroom at all. The cost of a missing year — a lost cohort — falls hardest on the household with the thinnest margin.
      `.trim(),
      3: `
Thai government schools are financed under a per-pupil <vocab>allocation</vocab> arrangement: the officially-rolled population in one cycle determines the funded posts and capital allowances in the next. The District Education office necessarily operates within that allocation envelope; it cannot scale unilaterally with rising attendance pressure along the frontier.

A proposal currently before the office would phase down the <vocab>MLC</vocab>s and redirect the released fiscal envelope into Thai-school <vocab>absorption</vocab> capacity — additional teaching posts, additional rooms, dedicated <vocab>bridging</vocab> staff — and migrate every migrant child into the recognised pathway under a unified Education-For-All framing.

The systemic hazard sits in the temporal gap between announcement and bridge construction. If the MLCs are wound down on a calendar while bridging posts and physical absorption capacity are still being procured, the transferring cohort arrives not into inclusion but into already-overwhelmed receiving rooms — or, in failure cases, into no classroom at all. The distributive cost of a missing-year cohort concentrates precisely on those households with the thinnest absorptive margin.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg04-takmaesot/images/chart-allocation.png",
      alt: "Chart contrasting the Thai-school per-pupil allocation that funds posts and rooms (left bars) with the MLC enrolment that is not counted in that allocation (right bar) — and a projected absorption gap during the proposed phase-down window.",
      caption: "Allocation at a glance. The per-pupil formula funds Thai-school posts and rooms; MLC enrolment is not counted toward that envelope. During a calendar-driven phase-down, the absorption gap (red band) is when the cohort is most likely to be lost.",
    },
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: {
      1: `
There is a better order. Fund the <vocab>bridging</vocab> staff and posts in the Thai schools first. Prove with a real <vocab>cohort</vocab> that the system can absorb. Then phase down the <vocab>MLC</vocab>s — against demonstrated capacity, not against a calendar.

This is slower. It needs the district to budget for both systems in the same year, just long enough to show that the bridge holds. The proposal on the table does not yet do that. It promises Education For All on the timeline that fits the budget cycle — not the timeline that fits the child.

Your team will brief the District Education committee before the calendar is set. The committee will not accept "it depends." It needs a clear position — and reasoning that holds when the other side pushes back.
      `.trim(),
      2: `
A more defensible sequence exists. Fund the <vocab>bridging</vocab> staff and the additional posts inside the Thai schools first. Prove, with a real <vocab>cohort</vocab>, that the receiving system can absorb. Only then phase the <vocab>MLC</vocab>s down — and against demonstrated capacity, not against a budget calendar.

This is the slower path. It requires the district to double-fund — both systems carrying the same children for a transition window — long enough for the bridge to be shown to hold. The proposal currently on the table does not yet do that; it promises Education For All on the timeline the budget can absorb, rather than the timeline a learner's year demands.

Your team has been asked to brief the District Education committee before the phase-down calendar is set. The committee will not accept "it depends." It needs a defensible position — and reasoning that survives when other stakeholders push back.
      `.trim(),
      3: `
A more defensible sequencing is available. Provision the <vocab>bridging</vocab> establishment — staff, additional posts, supporting infrastructure — within the receiving Thai schools first; demonstrate with a real <vocab>cohort</vocab> that absorptive capacity is materially in place; then phase the <vocab>MLC</vocab>s down against demonstrated capacity, not against the fiscal calendar.

This is the slower trajectory. It requires the district to double-fund both systems through a defined transition window — long enough for the bridge's structural integrity to be evidenced, not merely declared. The proposal currently before the committee does not yet do this; it commits to Education For All on the timeline the budget can absorb, rather than the timeline the learner's school year actually requires.

Your team will brief the District Education committee prior to the phase-down calendar being fixed. The committee will not entertain indeterminacy; it requires a defensible position and an evidentiary rationale robust to adversarial challenge from competing stakeholders.
      `.trim(),
    },
  },
];

/**
 * Four stakeholder profiles. Transcripts mirror authentic audio — they
 * are NOT tiered. Same schema as Bangkok / Chiang Mai.
 */
export const STAKEHOLDERS = [
  {
    id: "s01-mlc-teacher",
    role: "Migrant Learning Centre teacher (nine-year tenure)",
    roleTh: "ครูศูนย์การเรียนรู้สำหรับเด็กข้ามชาติ (อายุงาน 9 ปี)",
    location: "An MLC serving Karen-speaking migrant children, Mae Sot district",
    flags: ["community", "female", "Karen-speaking"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg04-takmaesot/images/stakeholder-01.png",
    video: "/assets/scenarios/sdg04-takmaesot/video/01-mlc-teacher.mp4",
    caption: "/assets/scenarios/sdg04-takmaesot/audio/01-mlc-teacher.vtt",
    duration: 32,
    position:
      "Nine years I have taught here. Our children are learning today, in a language they understand — that is not nothing. I am not against Thai schools; I prepare children for them. I am against taking the money before the bridge is built. Build the bridge first. Then move us across. We will help carry the children over.",
    transcript:
      "Nine years I have taught here. Our children are learning today, in a language they understand — that is not nothing. I am not against Thai schools; I prepare children for them. I am against taking the money before the bridge is built. Build the bridge first. Then move us across. We will help carry the children over.",
    primaryConcern: "Not anti-Thai-school — anti-erasure-of-current-learning: the bridge must exist before the centres close",
    primaryConcernTh: "ไม่ได้ค้านโรงเรียนไทย แต่ค้านการปิดศูนย์ก่อนสร้างสะพานเชื่อม — ต้องมีระบบรองรับก่อน",
  },
  {
    id: "s02-district-officer",
    role: "District Education officer, Tak Educational Service Area",
    roleTh: "เจ้าหน้าที่สำนักงานเขตพื้นที่การศึกษา จังหวัดตาก",
    location: "District Education office, Mae Sot",
    flags: ["institutional", "constrained-budget"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg04-takmaesot/images/stakeholder-02.png",
    video: "/assets/scenarios/sdg04-takmaesot/video/02-district-officer.mp4",
    caption: "/assets/scenarios/sdg04-takmaesot/audio/02-district-officer.vtt",
    duration: 30,
    position:
      "Education for All is not optional, and that is exactly why a permanent non-formal track that never issues a recognised credential troubles me. But my posts and budget are fixed this cycle — I cannot fund both at once. I am not closing anything for its own sake. Tell me how to sequence this within what I actually have.",
    transcript:
      "Education for All is not optional, and that is exactly why a permanent non-formal track that never issues a recognised credential troubles me. But my posts and budget are fixed this cycle — I cannot fund both at once. I am not closing anything for its own sake. Tell me how to sequence this within what I actually have.",
    primaryConcern: "A genuine constraint — fixed allocation envelope this cycle, cannot expand to double-fund the transition window without an explicit sequencing plan",
    primaryConcernTh: "ข้อจำกัดงบประมาณจริงในรอบนี้ ไม่สามารถจัดสรรซ้อนได้พร้อมกันโดยไม่มีแผนลำดับขั้น",
  },
  {
    id: "s03-school-principal",
    role: "Principal, a Thai government school in Mae Sot district",
    roleTh: "ผู้อำนวยการโรงเรียนรัฐบาลไทย อำเภอแม่สอด",
    location: "A Thai government school inside the absorption zone, Mae Sot",
    flags: ["institutional", "male", "over-capacity"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg04-takmaesot/images/stakeholder-03.png",
    video: "/assets/scenarios/sdg04-takmaesot/video/03-school-principal.mp4",
    caption: "/assets/scenarios/sdg04-takmaesot/audio/03-school-principal.vtt",
    duration: 31,
    position:
      "I will not turn a child away. But I have to be honest: we are already over capacity. A large cohort in one term with no bridging staff and no new posts does not mean inclusion — it means I overwhelm every classroom. Give me the teachers and posts and I open my doors wider tomorrow. Give me only a deadline and I will fail them politely.",
    transcript:
      "I will not turn a child away. But I have to be honest: we are already over capacity. A large cohort in one term with no bridging staff and no new posts does not mean inclusion — it means I overwhelm every classroom. Give me the teachers and posts and I open my doors wider tomorrow. Give me only a deadline and I will fail them politely.",
    primaryConcern: "Operating reality of an over-capacity receiving school; needs posts + bridging staff before a cohort lands, not a deadline alone",
    primaryConcernTh: "ความเป็นจริงของโรงเรียนรับนักเรียนที่เกินกำลังอยู่แล้ว ต้องการตำแหน่งครูและบุคลากรเชื่อมระบบก่อนรับรุ่นใหม่",
  },
  {
    id: "s04-ngo-coordinator",
    role: "NGO education coordinator working across MLC and Thai-school networks",
    roleTh: "ผู้ประสานงานด้านการศึกษา องค์กรพัฒนาเอกชน (ทำงานกับทั้งศูนย์และโรงเรียนไทย)",
    location: "Mae Sot — NGO field office bridging both networks",
    flags: ["bridging", "female", "evidence-anchored"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg04-takmaesot/images/stakeholder-04.png",
    video: "/assets/scenarios/sdg04-takmaesot/video/04-ngo-coordinator.mp4",
    caption: "/assets/scenarios/sdg04-takmaesot/audio/04-ngo-coordinator.vtt",
    duration: 32,
    position:
      "We all want the same end state — every child in a recognised system. The fight is only about order, and order is where the harm hides. Enrolment is not inclusion. So: fund the bridging and posts first, prove absorption with a real cohort, then phase the centres down against demonstrated capacity — not against a calendar.",
    transcript:
      "We all want the same end state — every child in a recognised system. The fight is only about order, and order is where the harm hides. Enrolment is not inclusion. So: fund the bridging and posts first, prove absorption with a real cohort, then phase the centres down against demonstrated capacity — not against a calendar.",
    primaryConcern: "Sequencing — fund bridging and demonstrate absorption first, then phase down against demonstrated capacity, never against a calendar",
    primaryConcernTh: "ลำดับขั้นตอน — จัดสรรงบเชื่อมระบบและพิสูจน์การรองรับด้วยรุ่นจริงก่อน จึงค่อยลดบทบาทศูนย์ตามความสามารถจริง ไม่ใช่ตามปฏิทิน",
  },
];

/**
 * Discipline-of-citation: real institutions named in the dossier.
 */
export const INSTITUTIONS_CITED = [
  { name: "Ministry of Education, Thailand (ศธ.)",                role: "Issues the recognised credential; sets formal-curriculum standards" },
  { name: "Office of Basic Education Commission (OBEC)",          role: "Oversees Thai government schools, posts and per-pupil allocation" },
  { name: "Tak Primary Educational Service Area Office 2",        role: "District Education authority for Mae Sot and frontier sub-districts" },
  { name: "UNICEF Thailand",                                      role: "Co-publishes evidence on migrant-child education access at the border" },
  { name: "UNESCO (Thailand & Asia-Pacific)",                     role: "Custodian agency for SDG 4 monitoring (Education For All / inclusion)" },
  { name: "Save the Children, World Education, and partner NGOs", role: "Bridging programmes between MLCs and the Thai system" },
];

export const RESOURCES = [
  { label: "UN SDG 4 — Quality Education", url: "https://sdgs.un.org/goals/goal4" },
  { label: "UNESCO Institute for Statistics — SDG 4 monitoring", url: "https://uis.unesco.org" },
  { label: "UNICEF Thailand — migrant children", url: "https://www.unicef.org/thailand" },
  { label: "SDG Move — Thailand SDG knowledge hub", url: "https://www.sdgmove.com" },
];
