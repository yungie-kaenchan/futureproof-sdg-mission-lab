/**
 * FUTUREPROOF — Scenario Generation Client
 *
 * Calls the Claude proxy to produce three SDG sub-scenarios calibrated to the
 * team's learnerProfile. Falls back to the local SAMPLE_SCENARIOS bank when
 * the proxy isn't reachable (local dev), so the SDG wheel stays usable for
 * preview without exposing students to a broken state.
 */

const CLAUDE_PROXY = "/.netlify/functions/claude-proxy";

export const SDG_LIST = [
  { n: 1,  short: "No Poverty",                         color: "#E5243B" },
  { n: 2,  short: "Zero Hunger",                        color: "#DDA63A" },
  { n: 3,  short: "Good Health and Well-being",         color: "#4C9F38" },
  { n: 4,  short: "Quality Education",                  color: "#C5192D" },
  { n: 5,  short: "Gender Equality",                    color: "#FF3A21" },
  { n: 6,  short: "Clean Water and Sanitation",         color: "#26BDE2" },
  { n: 7,  short: "Affordable and Clean Energy",        color: "#FCC30B" },
  { n: 8,  short: "Decent Work and Economic Growth",    color: "#A21942" },
  { n: 9,  short: "Industry, Innovation, Infrastructure", color: "#FD6925" },
  { n: 10, short: "Reduced Inequalities",               color: "#DD1367" },
  { n: 11, short: "Sustainable Cities and Communities", color: "#FD9D24" },
  { n: 12, short: "Responsible Consumption and Production", color: "#BF8B2E" },
  { n: 13, short: "Climate Action",                     color: "#3F7E44" },
  { n: 14, short: "Life Below Water",                   color: "#0A97D9" },
  { n: 15, short: "Life on Land",                       color: "#56C02B" },
  { n: 16, short: "Peace, Justice and Strong Institutions", color: "#00689D" },
  { n: 17, short: "Partnerships for the Goals",         color: "#19486A" },
];

/**
 * Sample scenarios for offline / preview mode.
 *
 * SDGs 6, 13, 14 each ship with three fully-fleshed scenarios. The
 * remaining 14 SDGs each ship with one preview scenario so the wheel
 * never falls into an empty state during a demo. Live cohorts replace
 * these with Claude-generated scenarios at run time.
 */

const previewScenario = (title, setting, coreTension, decisionPoint, ethicalAxes, localLens, stakeholders) => ({
  title, setting, coreTension, decisionPoint, ethicalAxes, localLens, stakeholders,
});

export const SAMPLE_SCENARIOS = {
  6: [
    {
      title: "The Chao Phraya Salt Wedge",
      setting: "Saltwater intrusion is creeping further upriver each year, threatening rice paddies in the central plains and Bangkok's drinking-water intakes during the dry season.",
      coreTension: "Upstream releases protect city water but devastate downstream farmers; the reverse is also true.",
      stakeholders: [
        { label: "Royal Irrigation Department", role: "Manages dam releases", interest: "Stable urban supply, drought reserve" },
        { label: "Central plains rice farmers", role: "Largest affected community", interest: "Predictable water salinity for planting cycles" },
        { label: "Metropolitan Waterworks Authority", role: "Bangkok water supplier", interest: "Low-salinity intake for treatment" },
        { label: "Climate scientists (Chula / GISTDA)", role: "Forecasting & monitoring", interest: "Long-term watershed health" },
      ],
      decisionPoint: "Who should bear the cost of the next water-shortage cycle?",
      ethicalAxes: ["Intergenerational equity", "Urban-rural distributive justice"],
      localLens: "Set against ongoing debates between MNRE, the Ministry of Agriculture, and Bangkok's MWA over Pasak/Bhumibol release schedules.",
    },
    {
      title: "Khon Kaen Groundwater Tipping",
      setting: "Industrial groundwater extraction in the Northeast has lowered the aquifer beyond village wells' reach, forcing rural households to truck in water.",
      coreTension: "Local economic development depends on the same factories drying up household supply.",
      stakeholders: [
        { label: "Provincial Public Health Office", role: "Tracks waterborne illness", interest: "Continuous safe supply" },
        { label: "Industrial estate operators", role: "Major employers", interest: "Predictable extraction rights" },
        { label: "Village headmen", role: "Convene community responses", interest: "Restored well levels" },
        { label: "Department of Groundwater Resources", role: "Permit issuer", interest: "Defensible permit policy" },
      ],
      decisionPoint: "Should extraction permits be capped by aquifer health rather than industry need?",
      ethicalAxes: ["Distributive justice", "Procedural fairness"],
      localLens: "Reflects real Northeastern groundwater contests covered in Thai media in 2024–2025.",
    },
    {
      title: "Songkhla Lake's Last Rinse",
      setting: "Tourism-driven coastal development has degraded Songkhla Lake's freshwater zones, harming local fisheries and potable supply for several muban.",
      coreTension: "Hospitality jobs depend on continued development; fishery jobs depend on stopping it.",
      stakeholders: [
        { label: "Lake fishery cooperative", role: "Long-standing community group", interest: "Restored water quality" },
        { label: "Hospitality investors", role: "Bring jobs and capital", interest: "Continued zoning permissiveness" },
        { label: "Provincial Natural Resources Office", role: "Environmental enforcement", interest: "Defensible permit regime" },
        { label: "Lake-area schoolchildren", role: "Long-term community", interest: "Future ecological state" },
      ],
      decisionPoint: "What evidence would justify pausing further coastal development?",
      ethicalAxes: ["Long-term vs short-term", "Voice of unrepresented stakeholders"],
      localLens: "Echoes ongoing PAO Songkhla deliberations on shoreline zoning.",
    },
  ],
  13: [
    {
      title: "Bangkok's Heat Dome",
      setting: "Successive 42°C+ days have triggered surges in heat illness, especially among outdoor workers and the elderly in low-income districts.",
      coreTension: "Public health response is reactive; long-term mitigation requires sustained investment under fiscal pressure.",
      stakeholders: [
        { label: "BMA District Officials", role: "Front-line response", interest: "Visible protective action" },
        { label: "Outdoor labor unions", role: "Most exposed group", interest: "Enforced working-condition rules" },
        { label: "MOPH Heat Surveillance", role: "Tracks heat illness", interest: "Earlier alerting authority" },
        { label: "Treasury / Budget Bureau", role: "Funds mitigation", interest: "Cost-effective interventions" },
      ],
      decisionPoint: "What should trigger a city-wide outdoor work pause, and who pays the wage backstop?",
      ethicalAxes: ["Vulnerability prioritization", "Public-private cost sharing"],
      localLens: "Builds on BMA 2024–2025 heat-action plan debates and Cool Roof pilot results.",
    },
    {
      title: "Coastal Retreat at Samut Prakan",
      setting: "Saltwater incursion and subsidence are pushing several Samut Prakan communities to consider managed retreat.",
      coreTension: "Long-term safety vs immediate economic and social loss for displaced families.",
      stakeholders: [
        { label: "Affected community elders", role: "Voice of displaced families", interest: "Compensation, identity continuity" },
        { label: "Provincial planners", role: "Resettlement design", interest: "Orderly, defensible relocation" },
        { label: "GISTDA scientists", role: "Subsidence monitoring", interest: "Evidence-led timelines" },
        { label: "National Treasury", role: "Compensation funding", interest: "Predictable cost envelope" },
      ],
      decisionPoint: "What conditions would make managed retreat the most ethically defensible option?",
      ethicalAxes: ["Place-attachment", "Procedural justice"],
      localLens: "Tied to ongoing subsidence research published by GISTDA / Chulalongkorn since 2023.",
    },
    {
      title: "The Burning Season Decision",
      setting: "Northern Thailand's annual PM2.5 surge from agricultural and forest burning has worsened despite three years of bans.",
      coreTension: "Punitive enforcement falls hardest on smallholder farmers without alternatives; structural change is slow.",
      stakeholders: [
        { label: "Smallholder corn farmers", role: "Burning is fastest land-clearing", interest: "Affordable transition" },
        { label: "Provincial DDPM", role: "Disaster declaration authority", interest: "Trigger criteria clarity" },
        { label: "Pediatric pulmonologists", role: "Document health impact", interest: "Earlier interventions" },
        { label: "Tourism operators", role: "Economic loss from haze", interest: "Reliable shoulder-season air" },
      ],
      decisionPoint: "What single intervention would shift incentives away from burning by 2030?",
      ethicalAxes: ["Burden distribution", "Short-term enforcement vs long-term transition"],
      localLens: "Tied to MNRE / DDPM 2025 transboundary haze frameworks and CMU research.",
    },
  ],

  /* ── Preview scenarios (one per remaining SDG; replace with Claude live) ── */

  1: [previewScenario(
    "Bangkok's Forgotten Pavement Workers",
    "Informal vendors and waste-pickers earn under the urban poverty line; municipal sweeps periodically displace them without resettlement.",
    "Tourism-friendly streets vs livelihoods of the urban informal economy.",
    "What policy would protect informal-economy livelihoods without freezing the city's economic dynamism?",
    ["Distributive justice", "Recognition"],
    "Tied to BMA street-vendor zoning policies and the Foundation for Slum Child Care's recent work.",
    [
      { label: "Street vendor association", role: "Representative voice", interest: "Stable workspace permits" },
      { label: "BMA District Office", role: "Sweeps authority", interest: "Tourist-ready sidewalks" },
      { label: "Tourism board", role: "City image", interest: "Predictable visitor experience" },
      { label: "Foundation for Slum Child Care", role: "Advocacy", interest: "Family stability" },
    ],
  )],

  2: [previewScenario(
    "School Lunch in the Northeast",
    "Rural primary schools struggle to deliver the national school-lunch nutrition target on the per-meal budget allocated.",
    "Caloric adequacy vs nutritional adequacy under tight per-meal budgets.",
    "Reallocate budget toward fewer, more nutrient-dense meals — or maintain current frequency?",
    ["Child welfare", "Procedural fairness across schools"],
    "Echoes Ministry of Education and OBEC 2024–2025 school-nutrition reviews.",
    [
      { label: "School principals (Khon Kaen)", role: "Operational owners", interest: "Workable budget" },
      { label: "Pediatric nutritionists", role: "Standard-setting", interest: "Nutrition adequacy" },
      { label: "Parent-teacher associations", role: "Community voice", interest: "Children fed" },
      { label: "OBEC budget officials", role: "Funding allocator", interest: "Defensible policy" },
    ],
  )],

  3: [previewScenario(
    "Long COVID and the Health System",
    "A growing cohort of working-age Thais report unresolved post-COVID symptoms; specialist clinics are oversubscribed.",
    "Expanding specialist capacity vs strengthening primary-care competence.",
    "Where should the next ฿100M of MOPH long-COVID budget go?",
    ["Distributive justice", "Long-term system resilience"],
    "Reflects MOPH and Faculty of Medicine Siriraj Hospital working-group debates.",
    [
      { label: "Long COVID patients", role: "Primary affected group", interest: "Predictable care access" },
      { label: "Primary-care physicians", role: "First contact", interest: "Diagnostic clarity, training" },
      { label: "Specialist clinics", role: "Tertiary care", interest: "Capacity expansion" },
      { label: "MOPH planners", role: "Budget allocator", interest: "Defensible policy mix" },
    ],
  )],

  4: [previewScenario(
    "The Online-Learning Equity Gap",
    "Two years post-pandemic, learning loss in rural Northern districts has not closed; urban districts have largely recovered.",
    "Universal catch-up programs vs targeted rural-investment programs.",
    "Should the next two years of education budget prioritize geographic targeting, or universal interventions with smaller per-student impact?",
    ["Equity vs equality", "Generational impact"],
    "Reflects EEF and OBEC 2025 reports on post-pandemic learning recovery.",
    [
      { label: "Equitable Education Fund (EEF)", role: "Targeting authority", interest: "Defensible targeting criteria" },
      { label: "Rural school principals", role: "Implementation", interest: "Sustained support" },
      { label: "Urban district teachers", role: "Implementers", interest: "Continued universal support" },
      { label: "Education economist", role: "Independent voice", interest: "Cost-effective allocation" },
    ],
  )],

  5: [previewScenario(
    "Care Work in the Aging Society",
    "Thailand is aging rapidly; eldercare falls disproportionately on women, eroding their workforce participation.",
    "Public eldercare expansion vs preserving family-centered care traditions.",
    "What public-private mix would value care work without dismantling family structures?",
    ["Gender equity", "Cultural continuity"],
    "Tied to MSDHS 2025 aging-society policy debate.",
    [
      { label: "Working-age daughters", role: "Largest care-burden group", interest: "Reduced unpaid load" },
      { label: "Elderly parents", role: "Care recipients", interest: "Quality + dignity" },
      { label: "MSDHS planners", role: "Policy authors", interest: "Affordable scale" },
      { label: "Community health volunteers", role: "Front-line care", interest: "Recognition + pay" },
    ],
  )],

  7: [previewScenario(
    "Rooftop Solar at the Industrial Estate",
    "An eastern industrial estate plans large-scale rooftop solar; grid operators warn of feeder instability without storage.",
    "Aggressive renewable rollout vs grid-stability conservatism.",
    "Approve the rollout, gate it on storage commitments, or phase it across two years?",
    ["Climate action urgency", "System reliability"],
    "Reflects Energy Regulatory Commission and EGAT discussions on distributed generation.",
    [
      { label: "Industrial estate operators", role: "Investors", interest: "Quick approval" },
      { label: "Grid stability engineers", role: "Reliability", interest: "Risk-conservative rollout" },
      { label: "ERC commissioners", role: "Regulators", interest: "Defensible policy" },
      { label: "Provincial environmental groups", role: "Advocates", interest: "Decarbonization speed" },
    ],
  )],

  8: [previewScenario(
    "Gig Workers Without Safety Nets",
    "Food-delivery and rideshare workers in Bangkok lack social security access; classification as 'partners' excludes them.",
    "Universal worker protections vs platform business-model viability.",
    "What classification or hybrid model would extend protection without collapsing the platform economy?",
    ["Worker dignity", "Economic dynamism"],
    "Tracks Labour Ministry and TDRI 2025 gig-economy proposals.",
    [
      { label: "Rider unions / collectives", role: "Worker voice", interest: "Coverage + benefits" },
      { label: "Platform operators", role: "Business model holders", interest: "Cost predictability" },
      { label: "Ministry of Labour", role: "Regulator", interest: "Defensible classification" },
      { label: "TDRI economists", role: "Analysts", interest: "Evidence-based policy" },
    ],
  )],

  9: [previewScenario(
    "The EEC's Innovation Promise",
    "The Eastern Economic Corridor's high-tech investment promises clash with local SME displacement and water-allocation tensions.",
    "Foreign direct investment growth vs local SME and water-equity costs.",
    "How should EEC permits be conditioned to keep the innovation promise while protecting local economies?",
    ["Distributive justice", "Long-term economic resilience"],
    "Reflects EEC Office and Provincial Council debates in Chonburi/Rayong.",
    [
      { label: "EEC Office", role: "Permitting authority", interest: "Investment flow" },
      { label: "Local SMEs", role: "Displacement risk", interest: "Continued business viability" },
      { label: "Water-allocation engineers", role: "Resource constraint", interest: "Sustainable allocation" },
      { label: "Foreign investors", role: "Project funders", interest: "Predictable conditions" },
    ],
  )],

  10: [previewScenario(
    "Stateless Children at the Border",
    "Thousands of children along the Myanmar border lack legal documentation; access to schooling and healthcare is uneven.",
    "Sovereignty concerns vs the developmental rights of children.",
    "What legal pathway, if any, would protect these children without destabilizing border policy?",
    ["Children's rights", "Border policy"],
    "Tied to MOI nationality-policy debates and UNICEF Thailand 2025 reports.",
    [
      { label: "Stateless children's families", role: "Affected community", interest: "Documentation + access" },
      { label: "MOI policy directors", role: "Sovereignty owners", interest: "Defensible border policy" },
      { label: "Border-province educators", role: "Front-line implementers", interest: "Workable rules" },
      { label: "UNICEF Thailand", role: "Advocacy", interest: "Children's rights compliance" },
    ],
  )],

  11: [previewScenario(
    "The BTS Extension Decision",
    "A proposed BTS extension into a low-density suburban area would speed commutes but risks pricing out current residents.",
    "Connectivity gains vs gentrification displacement.",
    "Should the extension proceed as designed, be re-routed, or be paired with rent-stabilization mechanisms?",
    ["Distributive justice", "Long-term urban form"],
    "Echoes BMA, OTP, and CODI debates on transit-led development.",
    [
      { label: "Current low-income residents", role: "Displacement risk", interest: "Stay in place" },
      { label: "Future commuters", role: "Beneficiaries of speed", interest: "Faster transit" },
      { label: "BMA / OTP planners", role: "Decision authority", interest: "Defensible plan" },
      { label: "CODI", role: "Community-development advocate", interest: "Anti-displacement tools" },
    ],
  )],

  12: [previewScenario(
    "The Plastic-Pact Mid-Course Review",
    "Thailand's Plastic Pact is mid-way through its 2030 commitments; producer-responsibility milestones are slipping.",
    "Voluntary commitments vs regulated extended-producer-responsibility (EPR).",
    "What should change at the mid-course review to keep the Pact credible?",
    ["Procedural justice", "Long-term system change"],
    "Tracks PCD, TBCSD, and World Bank 2025 EPR proposal review.",
    [
      { label: "Pact signatory companies", role: "Voluntary committers", interest: "Sustained voluntary path" },
      { label: "PCD regulators", role: "Enforcement option holders", interest: "Defensible regulatory move" },
      { label: "Waste-picker cooperatives", role: "Front-line", interest: "Continued income stream" },
      { label: "Independent auditors", role: "Verification", interest: "Credible measurement" },
    ],
  )],

  15: [previewScenario(
    "The Mae Ping Headwaters",
    "Upper Mae Ping forest cover is fragmenting; downstream water-quality and flood-resilience are at risk.",
    "Conservation strictness vs livelihood rights of upper-watershed communities.",
    "What rights and incentives would align upper-watershed land use with downstream interests?",
    ["Indigenous rights", "Long-term ecological function"],
    "Reflects DNP, Karen community elders, and CMU watershed-research discussions.",
    [
      { label: "Karen community elders", role: "Long-standing residents", interest: "Land-use continuity" },
      { label: "DNP rangers", role: "Conservation enforcement", interest: "Forest cover" },
      { label: "Downstream city officials", role: "Beneficiary cities", interest: "Water + flood control" },
      { label: "Watershed scientists", role: "Evidence base", interest: "Ecological integrity" },
    ],
  )],

  16: [previewScenario(
    "The Anti-Corruption Hotline",
    "Anonymous hotlines surface allegations the courts cannot prosecute without named complainants; complainants face retaliation.",
    "Whistleblower protection vs procedural justice for the accused.",
    "What protection regime would surface real cases without enabling abuse of the hotline?",
    ["Procedural justice", "Whistleblower protection"],
    "Tracks NACC and OAG 2025 whistleblower-protection draft.",
    [
      { label: "Whistleblowers", role: "Source of evidence", interest: "Safety + anonymity" },
      { label: "NACC investigators", role: "Investigators", interest: "Usable evidence" },
      { label: "OAG prosecutors", role: "Charge authority", interest: "Defensible cases" },
      { label: "The accused", role: "Subjects of allegation", interest: "Procedural fairness" },
    ],
  )],

  17: [previewScenario(
    "ASEAN-Wide Climate Finance",
    "ASEAN regional climate finance mechanisms are fragmented; Thailand's bilateral arrangements compete with regional pooling.",
    "National-level optimization vs regional-pooling coordination.",
    "Should Thailand back regional pooling, even at the cost of bilateral flexibility?",
    ["Regional cooperation", "National economic interest"],
    "Reflects MFA and ASEAN Secretariat discussions on climate finance architecture.",
    [
      { label: "MFA regional desk", role: "Negotiator", interest: "Defensible national stance" },
      { label: "Climate-vulnerable ASEAN partners", role: "Beneficiaries of pooling", interest: "Sustained coordination" },
      { label: "Domestic finance officials", role: "Bilateral managers", interest: "Flexibility + control" },
      { label: "Independent climate analysts", role: "Evidence base", interest: "Effective architecture" },
    ],
  )],
};

/* ──────────────────────────────────────────────────────────────────
 * Generation
 * ──────────────────────────────────────────────────────────────── */

export async function generateScenarios({ sdg, learnerProfile }) {
  const userMessage = `Generate 3 scenario variants for SDG ${sdg}. ` +
    `Team CEFR estimate: ${learnerProfile?.cefrEstimate || "B1"}. ` +
    `Analytical percentile: ${learnerProfile?.analyticalPercentile ?? 50}. ` +
    `Critical thinking percentile: ${learnerProfile?.criticalThinkingPercentile ?? 50}.`;

  let response;
  try {
    response = await fetch(CLAUDE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "scenario",
        userMessage,
        context: { sdg, learnerProfile },
      }),
    });
  } catch (err) {
    return { source: "fallback", scenarios: SAMPLE_SCENARIOS[sdg] || [] };
  }

  if (!response.ok) {
    return { source: "fallback", scenarios: SAMPLE_SCENARIOS[sdg] || [] };
  }

  const data = await response.json();
  let parsed;
  try { parsed = JSON.parse(data.text); }
  catch {
    return { source: "fallback", scenarios: SAMPLE_SCENARIOS[sdg] || [], parseFail: true };
  }
  return { source: "claude", scenarios: parsed.scenarios || [] };
}

/* ──────────────────────────────────────────────────────────────────
 * Persistence — freeze a chosen scenario for the team's run
 * ──────────────────────────────────────────────────────────────── */

export async function freezeScenarioForTeam({ tid, sdg, scenario }) {
  const fb = await import("./firebase-init.js");
  const sid = `scn_${tid}_${Date.now().toString(36)}`;
  const record = {
    sdg,
    title: scenario.title,
    context: scenario.setting,
    thaiContext: scenario.localLens,
    stakeholders: scenario.stakeholders,
    decisionPoint: scenario.decisionPoint,
    ethicalAxes: scenario.ethicalAxes,
    generatedBy: "claude-sonnet-4-7",
    promptVersion: "scn_v3",
    generatedAt: Date.now(),
    frozen: true,
  };
  await fb.writePath(fb.paths.scenario(sid), record);
  await fb.writePath(`${fb.paths.team(tid)}/scenarioId`, sid);
  await fb.writePath(`${fb.paths.team(tid)}/selectedSDG`, sdg);
  return sid;
}
