/**
 * FUTUREPROOF — SDG 11 Bangkok Scenario Content
 *
 * "The Klong and the City" — third fully-built journey mission.
 * Spec source: /scenarios/sdg11-bangkok-klong-v1/PRODUCTION-MASTER.md §2
 *
 * This module is pure data — dossier text, stakeholder profiles,
 * vocabulary glosses, asset references. UI logic lives in
 * sdg11-bangkok-m1.js.
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
 * Tier 2 is the canonical reference register (matches Chiang Mai).
 */

export const SCENARIO_META = {
  id: "sdg11-bangkok-klong-v1",
  sdg: 11,
  title: "The Klong and the City",
  titleTh: "คลองกับเมือง",
  setting:
    "Bangkok is a sinking delta. Its old canals — its klongs — drain the monsoon away from millions. Families have lived on and over that same water for generations.",
  coreTension:
    "A flood-defence corridor would shield 80,000 commuters and the business district — but erase klong-side homes whose families hold no land title.",
  decisionPoint:
    "Should the city proceed with the engineered flood-defence corridor on its current alignment and timeline — before a funded, consented relocation-and-tenure settlement exists for the affected klong households?",
  ethicalAxes: ["Urban resilience vs. housing justice", "Procedural justice"],
  region: "Klong-side community, lower Chao Phraya delta, Bangkok",
  cefr: "B1+/B2",
  hero: "/assets/scenarios/sdg11-bangkok/images/hero.webp",
  // 3 objectives — what the learner does during this mission.
  objectives: [
    "Analyse an urban flood-defence dossier to map who is protected vs. displaced.",
    "Evaluate resilience for 80,000 commuters against klong-side tenure justice.",
    "Argue the decision to power and to affected residents in the right registers.",
  ],
  // 3 outcomes — what the learner can do AFTER the mission.
  outcomes: [
    "Explain the urban-resilience, housing-justice and procedural-justice tensions in English.",
    "Assess informal tenure and the Baan Mankong precedent fairly.",
    "Generalise this SDG-11 reasoning to other sustainable-cities dilemmas.",
  ],
};

/**
 * Vocabulary foregrounded in the dossier. On hover/tap students see the
 * Thai gloss. Gloss density (how many tips show) is controlled by the
 * learner's tier via adaptive.glossDensity(); the gloss TEXT is constant.
 */
export const VOCABULARY = [
  { term: "klong",        pos: "noun",        gloss: "a canal; in Bangkok, also a waterway people live along", th: "คลอง",
    ex: "Tourist boats still wind through the old klong behind the temple." },
  { term: "defence",      pos: "noun",        gloss: "the system of works that protects a place from flooding", th: "การป้องกัน (น้ำท่วม)",
    ex: "The town's sea defence held through the worst of the typhoon." },
  { term: "subsiding",    pos: "adjective",   gloss: "slowly sinking downward over time (of the ground itself)", th: "ทรุดตัว / การทรุดตัวของแผ่นดิน",
    ex: "Cracks spread across the wall because the old building was slowly subsiding into soft clay." },
  { term: "corridor",     pos: "noun",        gloss: "a continuous strip of land kept for one purpose along a route", th: "แนวพื้นที่ตามเส้นทาง",
    ex: "Planners kept a green corridor for wildlife between the two parks." },
  { term: "reservation",  pos: "noun",        gloss: "a strip of land legally set aside and controlled by an authority", th: "เขตหวงห้าม / แนวเขตที่ดินตามกฎหมาย",
    ex: "You may not build on the railway reservation beside the tracks." },
  { term: "district",     pos: "noun",        gloss: "a defined area of a city, often with one main function", th: "ย่าน / เขต",
    ex: "The financial district empties out completely at the weekend." },
  { term: "title",        pos: "noun",        gloss: "a legal document that proves ownership of land", th: "โฉนดที่ดิน / เอกสารสิทธิ์",
    ex: "The bank held the land title until the loan was fully repaid." },
  { term: "informal",     pos: "adjective",   gloss: "done or held without official, legally secured status", th: "ไม่เป็นทางการ / ไม่มีเอกสารสิทธิ์",
    ex: "Many street vendors run an informal business with no registration." },
  { term: "community",    pos: "noun",        gloss: "the people who live together in one place and share ties", th: "ชุมชน",
    ex: "The fishing community organised its own clean-up after the oil spill." },
  { term: "Baan Mankong", pos: "proper noun", gloss: "a real Thai programme in which communities co-design secure-tenure housing", th: "โครงการบ้านมั่นคง",
    ex: "Several crowded neighbourhoods upgraded their homes through Baan Mankong." },
];

/**
 * Four-part dossier. Each `body` is tiered { 1, 2, 3 } — same facts,
 * three registers. <vocab>term</vocab> markup triggers a gloss tooltip.
 */
export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — A city built on water",
    body: {
      1: `
Bangkok is built on very flat, low land near the sea. In some places the ground is only a metre or two above the water. The city is also slowly sinking. So when heavy rain, river water, and the sea all come together, water has nowhere to go.

To stay dry, the city uses old canals. A canal is called a <vocab>klong</vocab>. The klongs carry rain and flood water away to the river and the sea. Gates and big pumps push the water out. This whole system is the city's flood <vocab>defence</vocab>.

But the klongs are not empty. For many years — for whole families, for generations — people have lived right on the water. Their houses stand on wooden posts over the canal. The klong is a machine that protects the city. It is also somebody's home.
      `.trim(),
      2: `
Bangkok sits on the flat, low delta of the Chao Phraya River, close to the Gulf of Thailand. In places the built-up land lies only a metre or two above the sea, and the delta is still slowly <vocab>subsiding</vocab>. When monsoon rain, upstream river discharge, and a high tide arrive together, the water has very little room to drain away.

To stay dry, the city depends on a centuries-old network of canals. A canal here is a <vocab>klong</vocab>. The klongs move stormwater toward the river and the Gulf, helped by floodgates and large pumping stations. Together, this network is the city's flood <vocab>defence</vocab> infrastructure.

But the klongs are not just infrastructure. For generations, families have lived on and over the water — stilt houses, walkways, and platforms built along and above the canal. The same klong is, at once, a drainage machine for millions and a long-settled <vocab>community</vocab>'s home.
      `.trim(),
      3: `
Bangkok occupies the low, flat alluvial delta of the lower Chao Phraya, immediately inland of the Gulf of Thailand; in places the urbanised surface stands only a metre or two above mean sea level, and the delta continues to <vocab>subsiding</vocab> incrementally. When monsoon rainfall, upstream discharge, and tidal backflow coincide, the system's capacity to evacuate water is severely constrained.

The city's resilience rests on a centuries-old <vocab>klong</vocab> network — canals that, with floodgates and high-capacity pumping stations, route stormwater toward the river and the Gulf. This network constitutes the metropolitan flood-<vocab>defence</vocab> infrastructure.

Yet the klong is not merely infrastructure. Over generations, households have settled on and above the water itself — stilted dwellings, walkways and platforms threaded along the canal reservation. The same channel is simultaneously a hydraulic asset serving millions and the established home of a long-resident <vocab>community</vocab>.
      `.trim(),
    },
  },
  {
    id: "part2",
    heading: "Part 2 — Why a corridor, and who it protects",
    body: {
      1: `
One big klong has become too small. It cannot carry away the water from the worst storms. When it floods, the water reaches a busy part of the city — the central business <vocab>district</vocab>, where many offices are, and the roads that around 80,000 people use to get to work each day.

The city has a plan. It will make the klong wider, build a strong wall along it, and add bigger pumps. This is the flood-defence <vocab>corridor</vocab>. The plan is allowed by law. The city owns the strip of land next to the canal — the canal <vocab>reservation</vocab>.

If the corridor is built, the business district and the commuters are much safer in a big flood. That is a real and good thing. The question is what the plan costs, and who pays it.
      `.trim(),
      2: `
One major klong can no longer carry the volume the largest storms now produce. When it overtops, the flooding reaches a busy zone of the city — the central business <vocab>district</vocab>, with its offices, and the commuter routes used by roughly 80,000 people every working day.

The Bangkok Metropolitan Administration has approved a plan: widen the canal, build a continuous floodwall along it, and upgrade the pumping-and-drainage capacity. This is the flood-defence <vocab>corridor</vocab>. The plan is lawful, and the city holds the strip of land beside the canal — the canal <vocab>reservation</vocab>.

If the corridor is built on its current line, the business district and those commuters are far better protected in a major flood. That benefit is real and serious. The contested questions are what the plan costs in other terms — and who is made to pay them.
      `.trim(),
      3: `
One principal klong can no longer convey the discharge that contemporary extreme storms generate; when it is overtopped, the resulting inundation reaches a high-value zone — the central business <vocab>district</vocab> and the commuter corridors carrying on the order of 80,000 daily travellers.

The Bangkok Metropolitan Administration has authorised an engineered response: canal widening, a continuous floodwall, and a pumping-and-drainage upgrade — collectively, the flood-defence <vocab>corridor</vocab>. The measure is lawful, and the municipality holds the canal <vocab>reservation</vocab>, the statutory land strip flanking the channel.

Delivered on its current alignment, the corridor materially reduces flood exposure for the business district and those commuters — a substantial and defensible public benefit. What remains contested is the corridor's non-hydraulic cost, and the distribution of who is required to bear it.
      `.trim(),
    },
  },
  {
    id: "part3",
    heading: "Part 3 — Who lives in the way, and why title matters",
    body: {
      1: `
To make the klong wider and build the wall, the houses on the canal <vocab>reservation</vocab> must be cleared or moved back. On the affected part of the canal, this means somewhere between several hundred and a few thousand homes. The families there have lived on the water for generations.

Most of them do not have a land <vocab>title</vocab> — a legal paper that says the land is theirs. They built where their parents and grandparents built. This is called <vocab>informal</vocab> tenure: real homes, real community, but no secure legal right to stay.

Without a title, a family can be moved with little money and little say. They may lose their home, their neighbours, and the place near the city where they earn a living, all at once. They are the people with the fewest choices, and the corridor lands hardest on them.
      `.trim(),
      2: `
To widen the klong and build the floodwall, the structures on the canal <vocab>reservation</vocab> must be cleared or set back. Along the affected reaches this involves an estimated several hundred to a few thousand households, many of whom have lived over the water for generations.

Most hold no land <vocab>title</vocab> — no secure legal document of ownership. They built where their families built before them. This is <vocab>informal</vocab> tenure: an established home and community, but without a protected legal right to remain.

Without title, a household can be displaced with limited compensation and limited voice. It can lose its home, its social network, and its income foothold near the city centre simultaneously. These are the residents with the least capacity to absorb a forced move — and the corridor, on its current line, concentrates its cost on them.
      `.trim(),
      3: `
Realising the widening and the floodwall requires that the structures occupying the canal <vocab>reservation</vocab> be cleared or set back; along the affected reaches this implicates an estimated several hundred to a few thousand households, many with generational tenure on the water.

The majority hold no land <vocab>title</vocab> — no secure instrument of ownership — having built within an inherited occupation pattern. This is <vocab>informal</vocab> tenure: a materially established community lacking a legally protected right of continued residence.

Absent title, displacement can proceed with constrained compensation and minimal procedural voice, dissolving dwelling, social network, and a centrally located livelihood foothold concurrently. These households possess the least adaptive capacity to absorb forced relocation; the corridor, on its present alignment, concentrates its distributive burden precisely upon them.
      `.trim(),
    },
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: {
      1: `
There is a path that is more fair. In Bangkok, a real programme called <vocab>Baan Mankong</vocab> has helped canal-side communities before. People organise, save together, and design their own move to nearby secure land — with a real land right at the end. It works. But it is slower than building a wall, and the money for this corridor is not yet promised.

So the city has the legal right to build now. It has a real reason: 80,000 commuters and the business district need protection. But the homes in the way are not yet promised a funded, agreed plan to move with security.

Your team will brief the city committee before the corridor is signed off. The committee will not accept "it depends." It needs a clear position — and reasons that hold when the other side pushes back.
      `.trim(),
      2: `
A more just path exists. In Bangkok, the real <vocab>Baan Mankong</vocab> programme has supported canal-side communities to organise, save collectively, and co-design a negotiated move to nearby secure land — ending with a genuine, often collective, land right. It is a proven model. But it runs slower than an engineering schedule, and funding for this corridor's settlement is not yet committed.

So the city holds the legal authority to proceed now, and it has a real public-protection warrant: roughly 80,000 commuters and the central business district. But the households in the alignment have no funded, consented relocation-and-tenure settlement in place for this works programme.

Your team has been asked to brief the city flood committee before the corridor is finalised. The committee will not accept "it depends." It needs a defensible position — and reasoning that survives when other stakeholders push back.
      `.trim(),
      3: `
A more equitable pathway is available. Bangkok's <vocab>Baan Mankong</vocab> programme has demonstrably enabled canal-side communities to organise, accumulate collective savings, and co-design a negotiated relocation onto nearby secure land, terminating in a genuine — frequently collective — tenure right. It is an evidenced model, but it operates on a slower cadence than an engineering timeline, and settlement financing for this corridor remains uncommitted.

The municipality therefore possesses lawful authority to proceed immediately, underwritten by a substantiated protection warrant — approximately 80,000 commuters and the central business district. Yet the households within the alignment have no funded, consented relocation-and-tenure settlement provisioned for this programme.

Your team will brief the city flood committee prior to finalisation. The committee will not entertain indeterminacy; it requires a defensible position and an evidentiary rationale robust to adversarial challenge from competing stakeholders.
      `.trim(),
    },
  },
];

/**
 * Four stakeholder profiles. Transcripts mirror authentic audio — they
 * are NOT tiered (the audio is authentic input; the .vtt caption is the
 * scaffold). Same schema as Chiang Mai so the M1 renderer is shared.
 */
export const STAKEHOLDERS = [
  {
    id: "s01-resident",
    role: "Klong-side resident and household head, long-settled canal community",
    roleTh: "ชาวชุมชนริมคลอง (ผู้ถือครองที่อยู่อาศัยแบบไม่มีเอกสารสิทธิ์)",
    location: "A klong-side community inside the corridor alignment, Bangkok",
    flags: ["vulnerable", "female", "informal-tenure"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg11-bangkok/images/stakeholder-01.svg",
    video: "/assets/scenarios/sdg11-bangkok/video/01-resident.mp4",
    caption: "/assets/scenarios/sdg11-bangkok/audio/01-resident.vtt",
    duration: 33,
    position:
      "I am not against the wall. When the klong floods, we are the first to lose everything — water comes through my floor before it ever reaches an office. So do not tell me I do not understand flooding. What I am against is being moved like furniture. My grandmother built over this water. We have no title, but we have a community, work near here, children in the school down the lane. 'Standard compensation' once moved my cousin's family to nowhere they could live or earn. Build your corridor. But agree where we go, and secure it, before the first wall is poured. Not after.",
    transcript:
      "I am not against the wall. When the klong floods, we lose everything first — the water is through my floor before it reaches any office. So do not tell me I do not understand flooding. I am against being moved like furniture. My grandmother built over this water. No title, but a community, work near here, the children's school down the lane. Standard compensation once moved my cousin's family to nowhere they could live. Build the corridor. But agree where we go, and make it secure, before the first wall is poured.",
    primaryConcern: "Not anti-corridor — anti-erasure: a funded, agreed, secure relocation must come before the works, not after",
    primaryConcernTh: "ไม่ได้ค้านโครงการ แต่ค้านการถูกไล่รื้อโดยไร้หลักประกัน ต้องมีที่อยู่ใหม่ที่ตกลงและมั่นคงก่อนเริ่มก่อสร้าง",
  },
  {
    id: "s02-engineer",
    role: "Flood-engineering official, Bangkok Metropolitan Administration",
    roleTh: "วิศวกรด้านการป้องกันน้ำท่วม กรุงเทพมหานคร (สำนักการระบายน้ำ)",
    location: "BMA district flood-operations office, Bangkok",
    flags: ["institutional", "female"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg11-bangkok/images/stakeholder-02.svg",
    video: "/assets/scenarios/sdg11-bangkok/video/02-engineer.mp4",
    caption: "/assets/scenarios/sdg11-bangkok/audio/02-engineer.vtt",
    duration: 32,
    position:
      "My responsibility is the catchment. The model is not ambiguous: on the current klong section, a major-return storm overtops and the business district and roughly eighty thousand daily commuters go under. I did not choose the alignment to be hard on anyone — it is the line that minimises hydraulic risk and construction time. I hear the housing argument and I do not dismiss it. But every season we delay protection is a season I cannot defend if a flood comes. I can support relocation handled properly. What I cannot do is sign off on leaving the catchment exposed for another monsoon while a settlement is negotiated from zero.",
    transcript:
      "My responsibility is the catchment. The model is not ambiguous — on this klong section a major storm overtops, and the business district and around eighty thousand commuters go under. I did not pick this alignment to be hard on anyone; it minimises hydraulic risk and build time. I hear the housing argument; I do not dismiss it. But every season we wait is a season I cannot defend if the flood comes. I can support relocation done properly. I cannot sign off on leaving the catchment exposed for another monsoon.",
    primaryConcern: "A real, modelled flood exposure to 80,000 commuters and the CBD that worsens with every delayed monsoon season",
    primaryConcernTh: "ความเสี่ยงน้ำท่วมที่มีแบบจำลองยืนยัน ต่อผู้สัญจร 80,000 คนและย่านธุรกิจ ซึ่งแย่ลงทุกฤดูฝนที่ล่าช้า",
  },
  {
    id: "s03-business",
    role: "Operations director, a central business district commercial-property association",
    roleTh: "ผู้อำนวยการฝ่ายปฏิบัติการ สมาคมอสังหาริมทรัพย์ย่านธุรกิจใจกลางเมือง",
    location: "Central business district, Bangkok",
    flags: ["private", "male"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg11-bangkok/images/stakeholder-03.svg",
    video: "/assets/scenarios/sdg11-bangkok/video/03-business.mp4",
    caption: "/assets/scenarios/sdg11-bangkok/audio/03-business.vtt",
    duration: 30,
    position:
      "Let me be direct about what we represent and what we do not. We represent offices, tenants, and the tens of thousands who commute in daily. The last serious flood here cost businesses and workers a sum the city felt for years — that is not abstract to us. We support the corridor and we support doing it on a credible timeline. We are not the people deciding how relocation is handled, and we will not pretend the displaced households are not owed a fair, funded settlement. But a corridor that is announced, contested, and then frozen for years protects no one. Predictability is what we are asking for.",
    transcript:
      "Let me be direct. We represent offices, tenants, and the tens of thousands who commute in. The last serious flood cost businesses and workers a sum the city felt for years — that is not abstract. We support the corridor on a credible timeline. We are not deciding how relocation is handled, and we will not pretend those households are owed nothing. But a corridor announced, contested, and frozen for years protects no one. We are asking for predictability.",
    primaryConcern: "Quantifiable economic exposure to flooding; needs a credible, non-stalling timeline — but does not contest that the displaced are owed a fair settlement",
    primaryConcernTh: "ความเสียหายทางเศรษฐกิจที่ประเมินได้จากน้ำท่วม ต้องการไทม์ไลน์ที่เชื่อถือได้และไม่หยุดชะงัก โดยไม่ปฏิเสธสิทธิของผู้ถูกย้าย",
  },
  {
    id: "s04-organiser",
    role: "Community-network organiser working with a Thai university urban-studies group",
    roleTh: "ผู้ประสานงานเครือข่ายชุมชน ร่วมกับกลุ่มวิจัยผังเมืองมหาวิทยาลัย (แนวทางบ้านมั่นคง)",
    location: "Bangkok — community-network field office",
    flags: ["bridging", "female"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg11-bangkok/images/stakeholder-04.svg",
    video: "/assets/scenarios/sdg11-bangkok/video/04-organiser.mp4",
    caption: "/assets/scenarios/sdg11-bangkok/audio/04-organiser.vtt",
    duration: 34,
    position:
      "I want to be precise, because this is often dismissed as idealism. A funded, consented relocation with secure tenure is not a wish — it is Baan Mankong, and it has already worked for canal communities in this city. Here is the part the engineering brief misses: sequencing. When a settlement is negotiated after the alignment is fixed, the community negotiates from zero power and gets worse terms — and the project is delayed anyway by the resistance that follows. Consent is not the thing that slows the corridor. Doing consent last is. Put the funded settlement on the critical path, run the non-displacing works in parallel, and you protect the city and the people in it.",
    transcript:
      "Let me be precise, because this gets dismissed as idealism. A funded, consented relocation with secure tenure is not a wish — it is Baan Mankong, and it has worked for canal communities in this city. The part the engineers miss is sequencing. Negotiate the settlement after the alignment is fixed and the community has zero power and gets worse terms — and the project is delayed anyway by the resistance. Consent is not what slows the corridor. Doing consent last is.",
    primaryConcern: "Sequencing — a funded Baan Mankong-style settlement must be a precondition on the critical path, which protects the city and the residents",
    primaryConcernTh: "ลำดับขั้นตอน — ต้องมีงบและข้อตกลงบ้านมั่นคงเป็นเงื่อนไขก่อนเริ่มงาน ซึ่งปกป้องทั้งเมืองและผู้อยู่อาศัย",
  },
];

/**
 * Discipline-of-citation: real institutions named in the dossier.
 * Surfaced in the dossier viewer footer for transparency.
 */
export const INSTITUTIONS_CITED = [
  { name: "Bangkok Metropolitan Administration (BMA)",          role: "Metropolitan flood policy, drainage, and the canal-reservation right-of-way" },
  { name: "BMA Department of Drainage and Sewerage",            role: "Operates canals, floodgates, pumping stations & drainage" },
  { name: "Royal Irrigation Department (RID)",                  role: "Upstream Chao Phraya basin water & diversion infrastructure" },
  { name: "National Housing Authority (NHA)",                   role: "Public/low-income housing and resettlement" },
  { name: "Baan Mankong / Community Organizations Development Institute (CODI)", role: "Community-driven secure-tenure upgrading precedent" },
  { name: "Department of Disaster Prevention & Mitigation (DDPM)", role: "National disaster response & flood-emergency coordination" },
];

export const RESOURCES = [
  { label: "UN SDG 11 — Sustainable Cities & Communities", url: "https://sdgs.un.org/goals/goal11" },
  { label: "UN-Habitat — sustainable urbanisation", url: "https://unhabitat.org" },
  { label: "SDG Move — Thailand SDG knowledge hub", url: "https://www.sdgmove.com" },
];
