/**
 * FUTUREPROOF — SDG 14 Andaman Scenario Content
 *
 * "The Reef and the Tide" — third fully-built journey mission.
 * Spec source: /scenarios/sdg14-andaman-reef-v1/PRODUCTION-MASTER.md
 *
 * This module is pure data — dossier text, stakeholder profiles,
 * vocabulary glosses, asset references. UI logic lives in
 * sdg14-andaman-m1.js.
 *
 * ── ADAPTIVE READING TIERS (Reconstruction Master §5, decision D2) ──
 * Every DOSSIER part's `body` is an object keyed by reading tier:
 *
 *   { 1: <A2–B1 text>, 2: <B1+–B2 baseline>, 3: <B2+–C1 text> }
 *
 * Identical facts, stakeholders, mechanisms and decision in all three
 * tiers. Only register differs — lexical density, sentence length,
 * clause embedding. Audio/video are NOT tiered (authentic input;
 * .vtt caption is the scaffold).
 *
 * Tier 2 is the canonical reference register (matches Khon Kaen /
 * Chiang Mai).
 */

export const SCENARIO_META = {
  id: "sdg14-andaman-reef-v1",
  sdg: 14,
  title: "The Reef and the Tide",
  titleTh: "แนวปะการังกับกระแสน้ำ",
  setting:
    "On the Andaman coast, a marine national park's islands draw dive boats from small harbour towns. The reefs that bring the visitors have bleached in several recent warm seasons.",
  coreTension:
    "A reduced-visitor quota and rotating site closures would let the reef recover — but cut the only low-season income small operators have to service their boat loans.",
  decisionPoint:
    "Should the marine park authority impose the reduced-visitor quota and rotating site closures this coming season, before any funded livelihood-transition mechanism exists for the small operators who will lose income?",
  ethicalAxes: ["Ecological recovery vs. coastal livelihood", "Intergenerational stewardship"],
  region: "Andaman seaboard, small harbour towns + marine park islands",
  cefr: "B1+/B2",
  hero: "/assets/scenarios/sdg14-andaman/images/hero.png",
  // 3 objectives — what the learner does during this mission.
  objectives: [
    "Analyse how thermal stress and contact pressure compound on a reef.",
    "Evaluate four stakeholders' competing claims on one shared reef system.",
    "Defend a sequencing decision under a closing recovery window.",
  ],
  // 3 outcomes — what the learner can do AFTER the mission.
  outcomes: [
    "Articulate the ecological-recovery vs. coastal-livelihood tension precisely in English.",
    "Evaluate whose closure cost is buffered (large operators) vs. existential (small operators).",
    "Transfer this SDG-14 reasoning to other marine-resource governance dilemmas.",
  ],
};

/**
 * Vocabulary foregrounded in the dossier. On hover/tap students see the
 * Thai gloss. Gloss density (how many tips show) is controlled by the
 * learner's tier via adaptive.glossDensity(); the gloss TEXT is constant.
 */
export const VOCABULARY = [
  { term: "marine park", pos: "noun", gloss: "a protected area of sea and islands with rules on use", th: "อุทยานแห่งชาติทางทะเล",
    ex: "Inside the marine park, fishing rules are stricter than outside it." },
  { term: "coral reef",  pos: "noun", gloss: "a living underwater structure built by tiny coral animals", th: "แนวปะการัง",
    ex: "Divers know the coral reef holds the fish the harbour town depends on." },
  { term: "bleaching",   pos: "noun", gloss: "when heat-stressed coral expels its algae and turns white", th: "การฟอกขาวของปะการัง",
    ex: "After three warm months, the survey teams documented widespread bleaching." },
  { term: "quota",       pos: "noun", gloss: "a fixed maximum number allowed — here, of daily visitors", th: "โควตา / จำนวนจำกัด",
    ex: "The new quota caps daily entries to one hundred visitors per site." },
  { term: "operator",    pos: "noun", gloss: "a person or small business that runs dive or boat trips", th: "ผู้ประกอบการ (เรือ/ดำน้ำ)",
    ex: "Each small operator covers fuel, the engine loan, and their crew from one season's takings." },
  { term: "compressor",  pos: "noun", gloss: "the machine that fills scuba tanks with air", th: "เครื่องอัดอากาศ (สำหรับดำน้ำ)",
    ex: "A dive shop without a working compressor cannot trade." },
  { term: "livelihood",  pos: "noun", gloss: "the way a household earns enough to live", th: "การทำมาหากิน / รายได้เลี้ยงชีพ",
    ex: "When the boats stop, island families have no other livelihood for months." },
  { term: "recovery",    pos: "noun", gloss: "the reef regaining health and structure over time", th: "การฟื้นตัว (ของแนวปะการัง)",
    ex: "Pigment recovery can take months; structural recovery, decades." },
];

/**
 * Four-part dossier. Each `body` is tiered { 1, 2, 3 } — same facts,
 * three registers. <vocab>term</vocab> markup triggers a gloss tooltip.
 */
export const DOSSIER = [
  {
    id: "part1",
    heading: "Part 1 — Why the reef matters",
    body: {
      1: `
On the Andaman coast, small towns live from the sea. Boats take visitors out to islands in a <vocab>marine park</vocab> to see the <vocab>coral reef</vocab>. The reef is why people come.

But the reef is sick. When the sea gets too warm for too long, the coral turns white. This is called <vocab>bleaching</vocab>. If the heat stops soon, the coral can get its colour back. If the heat stays, the coral can die. Boats, anchors, and many feet in the water hurt it more.

The park has an idea: let fewer visitors in, and close the most damaged dive spots for one season. The idea is legal. Whether it is fair is a harder question.
      `.trim(),
      2: `
Along the Andaman coast, small harbour towns depend on the sea. Dive boats carry visitors out to islands inside a <vocab>marine park</vocab> to see the <vocab>coral reef</vocab>. The reef is the reason the visitors come, and the visitors are the reason the towns have work.

The reef, though, is under stress. When the sea stays too warm for too long, coral expels the tiny algae that feed and colour it and turns pale — a process called <vocab>bleaching</vocab>. If the heat eases in time, a bleached reef can recover its colour. If the heat persists, much of it dies. Anchors, fins, trampling and a high density of visitors add physical damage on top of the heat.

The park authority has a plan: cut the daily visitor <vocab>quota</vocab> and rotate closures across the most damaged dive sites for one season. The plan is legal. Whether it is just is a different question — and the answer depends on whose situation you weigh first.
      `.trim(),
      3: `
Along the Andaman seaboard, small harbour economies are structurally dependent on reef tourism: dive operators ferry visitors to islands within a <vocab>marine park</vocab> whose <vocab>coral reef</vocab> systems are the destination's principal asset.

Those systems are under compounding stress. Sustained sea-surface-temperature anomaly drives the corals to expel their symbiotic algae and pale — <vocab>bleaching</vocab> — a condition that is reversible if thermal stress relaxes within the recovery window and lethal if it does not. Anthropogenic contact pressure — anchoring, fin and trampling damage, and the sediment and sunscreen load that accompanies high visitor density — is additive to the thermal signal rather than independent of it.

The park authority's proposed instrument is a reduced visitor <vocab>quota</vocab> coupled with rotating closures of the most degraded dive sites for a single season. The measure is lawful. Whether it is equitable is a separate question — one whose answer is contingent on whose circumstances are weighted first.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg14-andaman/images/diagram-reef-stress-recovery.png",
      alt: "Two-panel reef cross-section: stress (heat + contact damage) on the left, conditional recovery on the right.",
      caption: "Reef stress vs. conditional recovery — heat and contact pressure are additive; structural recovery is only possible if local pressure eases during the window.",
    },
  },
  {
    id: "part2",
    heading: "Part 2 — Who depends on the reef",
    body: {
      1: `
Many small <vocab>operators</vocab> work here. They own one boat, or they work on someone's boat as crew. They take a few visitors out each day in the busy season. With that money they pay back the loan on the boat, the engine, and the air <vocab>compressor</vocab> for diving.

The busy season is short. In the low season there is little work and little money. Island families also sell food, rooms, and rides to the visitors. They have no other job when the boats stop.

Bigger companies and resorts also bring visitors here. They have many boats and savings. They can wait through a closed season. A small operator with one boat and a loan often cannot.
      `.trim(),
      2: `
Many small <vocab>operators</vocab> work this coast. Some own a single boat; others crew on one. In the high season they take a handful of visitors out each day, and from that cash they service the debt on the boat, the engine and the diving <vocab>compressor</vocab>.

The high season is short and the low season is thin — little work and little income for months. Island households are tied to the same flow: they sell meals, rooms and transfers to the same visitors, and most have no alternative <vocab>livelihood</vocab> when the boats stop running.

Larger tour companies and resorts also operate here. They run multiple boats and hold reserves; they can absorb a closed or capped season and reopen later. A small operator carrying one boat and a loan frequently cannot — the same closure lands on the two groups with very different force.
      `.trim(),
      3: `
The operator base is dominated by small <vocab>operators</vocab> — single-vessel owners and crew — who, during the compressed high season, service capital debt on hull, engine and diving <vocab>compressor</vocab> out of a narrow window of tourist cash flow.

Seasonality is severe: a brief peak followed by a protracted low season of minimal demand. Island households are coupled to the same revenue pulse through food, lodging and transfer services and are, in the main, without an alternative <vocab>livelihood</vocab> when boat traffic ceases.

Larger tour companies and resort groups operate in the same waters but with multi-vessel fleets and balance-sheet reserves; they can amortise a capped or closed season and resume thereafter. The distributional point is structural rather than moral: an identical closure imposes a marginal inconvenience on the buffered operator and an existential shock on the unbuffered one.
      `.trim(),
    },
  },
  {
    id: "part3",
    heading: "Part 3 — Why the reef cannot just \"wait\"",
    body: {
      1: `
Some people say: the reef will fix itself, so we do not need rules. It is not that simple.

A reef can get its colour back in a few months if the heat stops soon. But the broken coral structure — the shape that fish and the whole reef need — grows back slowly, over many years, and only if people stop hurting it during that time.

Warm years are coming more often. A chance to <vocab>recovery</vocab> that is missed in one warm year may not come back the same way. The reef the visitors love is also the reef the next generation should inherit. That is why the timing of the rules matters, not just the rules.
      `.trim(),
      2: `
One argument is that the reef will recover on its own, so strict rules are unnecessary. The science does not support so simple a reading.

Colour can return within months if heat stress eases soon after bleaching. But the physical reef framework — the structure fish and the whole ecosystem depend on — rebuilds over years to decades, and only if local stressors are reduced during that window. <vocab>Recovery</vocab> is therefore conditional, not automatic.

Warm seasons are recurring more frequently. A recovery window missed in one warm year may not return on the same terms. The reef today's visitors enjoy is also the reef the next generation is meant to inherit — so when the rules are applied, not only whether, is part of the decision.
      `.trim(),
      3: `
The claim that the reef will self-rehabilitate, and that intervention is therefore redundant, does not withstand the ecology.

Pigmentation may re-establish within months where thermal stress relaxes promptly post-bleaching. Structural <vocab>recovery</vocab> of the reef framework — the architecture on which fish assemblages and ecosystem function depend — proceeds on a years-to-decades trajectory and is contingent on the suppression of local stressors throughout that interval. Recovery is conditional and non-linear, not guaranteed.

Under intensifying thermal-anomaly frequency, a recovery window foregone in a given warm year is not reliably recoverable on equivalent terms. The asset enjoyed by present visitors is simultaneously the inheritance of a generation absent from this decision; the timing of the instrument, not merely its existence, is therefore ethically load-bearing.
      `.trim(),
    },
    figure: {
      src: "/assets/scenarios/sdg14-andaman/images/chart-pressure-recovery.png",
      alt: "Chart: recovery rate falls as visitor pressure rises across surveyed sites.",
      caption: "Recovery index vs. visitor pressure across surveyed sites — illustrative, based on DMCR-supported repeat surveys. Pressure and recovery move in opposite directions.",
    },
  },
  {
    id: "part4",
    heading: "Part 4 — The decision before you",
    body: {
      1: `
The park has the legal power to set a <vocab>quota</vocab> and close some sites. The reef has a real need to recover. The small operators have a real need to eat in the low season — and there is no fund yet to help them if their income stops.

Your team must brief the park authority before it decides. The authority will not accept "it depends." It needs a clear position, and reasons that hold up when other people push back.
      `.trim(),
      2: `
The park authority has the legal mandate to set a reduced <vocab>quota</vocab> and rotate site closures. The reef has a genuine recovery need. The small operators have a genuine survival need in the low season — and no funded transition or compensation mechanism exists yet to carry them if their income is cut.

Your team has been asked to brief the authority before the decision is finalised. It will not accept "it depends." It needs a defensible position and reasoning that holds up when other stakeholders push back.
      `.trim(),
      3: `
Three claims are simultaneously valid: the authority's statutory mandate to impose a reduced <vocab>quota</vocab> and rotating closures; the reef's recovery requirement, which is time-bounded; and the small operators' livelihood exposure, which is acute and presently uncompensated, since no funded transition mechanism yet exists.

Your team will brief the authority ahead of a binding decision. "It depends" will not be accepted. The deliverable is a defensible position with reasoning robust to adversarial challenge from the stakeholders.
      `.trim(),
    },
  },
];

/**
 * Four stakeholder profiles. Transcripts mirror authentic audio — they
 * are NOT tiered (the audio is authentic input; the .vtt caption is the
 * scaffold). Same schema as Khon Kaen / Chiang Mai so the M1 renderer is
 * shared.
 */
export const STAKEHOLDERS = [
  {
    id: "s01-operator",
    role: "Small dive-operator, single-boat",
    roleTh: "ผู้ประกอบการดำน้ำรายเล็ก (เรือลำเดียว)",
    location: "Andaman harbour town",
    flags: ["vulnerable", "male"],
    accent: "ochre",
    portrait: "/assets/scenarios/sdg14-andaman/images/stakeholder-01.png",
    video: "/assets/scenarios/sdg14-andaman/video/01-operator.mp4",
    caption: "/assets/scenarios/sdg14-andaman/audio/01-operator.vtt",
    duration: 33,
    position:
      "I have taken visitors to that reef for fifteen years. I know it is sick — I see the white coral myself, I am not arguing with the science. But hear me. My boat, my engine, my compressor: still on a loan. I pay it from the high season. The low season already gives almost nothing. If you cut the visitors and close the sites this year, with no fund to carry us, you are not asking me to wait — you are asking my family to go under while the big companies wait it out. Protect the reef. But do not make the smallest of us pay all of it, first, alone.",
    transcript:
      "I know the reef is sick. I see the white coral myself. But my boat is still on a loan, and I pay it from the high season. Close the sites with no fund to carry us, and the big companies wait it out — my family does not. Protect the reef. Just do not make the smallest of us pay all of it, first, alone.",
    primaryConcern: "Not denying the reef is sick — asking that the smallest operators not carry the whole cost uncompensated, first",
    primaryConcernTh: "ไม่ได้ปฏิเสธว่าปะการังป่วย แต่ขออย่าผลักภาระทั้งหมดให้รายเล็กแบกคนเดียวก่อนโดยไม่มีการชดเชย",
  },
  {
    id: "s02-scientist",
    role: "DMCR reef scientist",
    roleTh: "นักวิทยาศาสตร์แนวปะการัง กรมทรัพยากรทางทะเลและชายฝั่ง",
    location: "Andaman field station",
    flags: ["institutional", "female"],
    accent: "steel",
    portrait: "/assets/scenarios/sdg14-andaman/images/stakeholder-02.png",
    video: "/assets/scenarios/sdg14-andaman/video/02-scientist.mp4",
    caption: "/assets/scenarios/sdg14-andaman/audio/02-scientist.vtt",
    duration: 32,
    position:
      "Our repeat surveys are consistent: these reefs are carrying heat stress and contact damage, and the two add up. The most-visited sites recover slowest. I want to be precise about what the science does and does not say. It says: if local pressure is not reduced during the recovery window, structural recovery may not happen on these sites at all, and a window missed in a warm year may not return. It does not say what should happen to the operators — that is not my data to give. My duty is to tell you the window is closing.",
    transcript:
      "The surveys are consistent: heat stress and contact damage, and they add up. The busiest sites recover slowest. If local pressure is not cut during the window, structural recovery on these sites may not happen — and a window missed in a warm year may not come back. What happens to the operators is not my data to give. My duty is to tell you the window is closing.",
    primaryConcern: "The recovery window is closing — local pressure must drop during it or structural recovery fails",
    primaryConcernTh: "หน้าต่างเวลาฟื้นตัวกำลังจะปิด — ต้องลดแรงกดดันในพื้นที่ มิฉะนั้นโครงสร้างปะการังจะไม่ฟื้น",
  },
  {
    id: "s03-tour-director",
    role: "Larger tour-company / resort operations director",
    roleTh: "ผู้อำนวยการฝ่ายปฏิบัติการ บริษัททัวร์/รีสอร์ตรายใหญ่",
    location: "Regional resort group office",
    flags: ["private", "male"],
    accent: "bronze",
    portrait: "/assets/scenarios/sdg14-andaman/images/stakeholder-03.png",
    video: "/assets/scenarios/sdg14-andaman/video/03-tour-director.mp4",
    caption: "/assets/scenarios/sdg14-andaman/audio/03-tour-director.vtt",
    duration: 30,
    position:
      "We support reef recovery — a dead reef is no business at all, and we plan on a longer horizon than one season. Our company can absorb a capped or rotated season: we have multiple boats, other destinations and reserves. So in principle the quota does not frighten us. What we ask is that the rules be predictable and applied evenly — a stable framework we can plan around, not a sudden order that is reversed under pressure. We would also note, candidly, that a closure which removes small single-boat operators while we continue elsewhere is not neutral. We will contribute to a transition fund if the framework is credible.",
    transcript:
      "We support recovery — a dead reef is no business. We can absorb a capped season; we have boats, other sites, reserves. We ask for rules that are predictable and applied evenly. And candidly: a closure that removes the small single-boat operators while we continue elsewhere is not neutral. We will contribute to a transition fund if the framework is credible.",
    primaryConcern: "Will support recovery on a predictable, evenly-applied framework — and contribute to a transition fund",
    primaryConcernTh: "พร้อมหนุนการฟื้นตัวของปะการังหากกติกาคาดเดาได้และใช้กับทุกคนเท่าเทียม และยินดีร่วมสนับสนุนกองทุนเปลี่ยนผ่าน",
  },
  {
    id: "s04-coop-leader",
    role: "Community-cooperative leader (bridging voice)",
    roleTh: "ผู้นำกลุ่มสหกรณ์ชุมชนชายฝั่ง",
    location: "Coastal cooperative, Andaman",
    flags: ["community", "female"],
    accent: "sage",
    portrait: "/assets/scenarios/sdg14-andaman/images/stakeholder-04.png",
    video: "/assets/scenarios/sdg14-andaman/video/04-coop-leader.mp4",
    caption: "/assets/scenarios/sdg14-andaman/audio/04-coop-leader.vtt",
    duration: 34,
    position:
      "I sit between the science and the harbour, so let me be useful instead of loud. Our members are not against the reef — most learned these waters from their parents, and some from sea-people families who have read this coast far longer than any survey. They want the reef to live; their grandchildren's work depends on it. The fight is not reef versus people. It is sequence. Order the cut and the closures with a funded transition attached — a low-season work scheme, mooring-buoy and monitoring jobs for the crews who lose income — and we help enforce it. Order it bare, and you get night trips and lost trust.",
    transcript:
      "Let me be useful, not loud. Our members are not against the reef — many learned these waters from their parents, some from sea-people families who read this coast longer than any survey. They want it to live; their grandchildren's work depends on it. The fight is not reef versus people. It is sequence. Tie the closure to a funded transition — low-season work, buoy and monitoring jobs for the crews who lose income — and we help enforce it. Order it bare, and you get night trips and lost trust.",
    primaryConcern: "Sequencing — tie closures to a funded livelihood transition or lose enforcement legitimacy",
    primaryConcernTh: "ลำดับขั้นตอน — ผูกการปิดพื้นที่กับกองทุนเปลี่ยนผ่านอาชีพ มิฉะนั้นจะสูญเสียความชอบธรรมในการบังคับใช้",
  },
];

/**
 * Discipline-of-citation: real institutions named in the dossier.
 * Surfaced in the dossier viewer footer for transparency.
 */
export const INSTITUTIONS_CITED = [
  { name: "Department of Marine and Coastal Resources (DMCR)", role: "Marine-park reef monitoring, bleaching surveys, science authority under MNRE" },
  { name: "Department of National Parks, Wildlife & Plant Conservation (DNP)", role: "Marine national park administration, quota and closure authority" },
  { name: "Provincial Tourism Authority offices",              role: "Tourism statistics and regional coordination" },
  { name: "Prince of Songkla University — marine science",     role: "Independent academic reef monitoring & recovery research" },
  { name: "Andaman small-operator cooperatives (community)",   role: "Collective negotiation for crews and single-boat operators" },
];

export const RESOURCES = [
  { label: "UN SDG 14 — Life Below Water", url: "https://sdgs.un.org/goals/goal14" },
  { label: "UNEP — Coral Reefs Status",    url: "https://www.unep.org/topics/ocean-seas-and-coasts/coral-reefs" },
  { label: "SDG Move — Thailand SDG hub",  url: "https://www.sdgmove.com" },
];
