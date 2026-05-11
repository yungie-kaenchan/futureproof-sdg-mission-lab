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
  { n: 1,  short: "No Poverty",                         shortTh: "ขจัดความยากจน",                       color: "#E5243B",
    description: {
      en: "End poverty in all its forms everywhere. Targets include halving the share of people living below national poverty lines, equal access to economic resources, and resilience for those most exposed to climate-related and economic shocks.",
      th: "ขจัดความยากจนในทุกรูปแบบทุกที่ ลดสัดส่วนคนที่มีรายได้ต่ำกว่าเส้นความยากจนของประเทศลงครึ่งหนึ่ง สิทธิที่เท่าเทียมในการเข้าถึงทรัพยากรทางเศรษฐกิจ และเสริมความทนทานของผู้ที่เปราะบางต่อภัยพิบัติและวิกฤติเศรษฐกิจ"
    } },
  { n: 2,  short: "Zero Hunger",                        shortTh: "ขจัดความหิวโหย",                       color: "#DDA63A",
    description: {
      en: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture. Targets address chronic undernutrition, smallholder farmer incomes, and resilient agricultural practices.",
      th: "ขจัดความหิวโหย บรรลุความมั่นคงทางอาหารและโภชนาการที่ดีขึ้น ส่งเสริมการเกษตรอย่างยั่งยืน เป้าหมายรวมถึงปัญหาทุพโภชนาการเรื้อรัง รายได้ของเกษตรกรรายย่อย และเกษตรกรรมที่ทนต่อสภาพอากาศ"
    } },
  { n: 3,  short: "Good Health and Well-being",         shortTh: "สุขภาพและความเป็นอยู่ที่ดี",            color: "#4C9F38",
    description: {
      en: "Ensure healthy lives and promote well-being for all at all ages. Targets cover maternal and child mortality, communicable and non-communicable diseases, mental health, and universal health coverage.",
      th: "สร้างหลักประกันให้คนทุกช่วงวัยมีสุขภาพและความเป็นอยู่ที่ดี ครอบคลุมอัตราการเสียชีวิตของมารดาและทารก โรคติดต่อและไม่ติดต่อ สุขภาพจิต และระบบหลักประกันสุขภาพถ้วนหน้า"
    } },
  { n: 4,  short: "Quality Education",                  shortTh: "การศึกษาที่มีคุณภาพ",                   color: "#C5192D",
    description: {
      en: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Targets include universal completion of primary and secondary education, gender parity, and digital literacy.",
      th: "สร้างหลักประกันการศึกษาที่ครอบคลุม เท่าเทียม และมีคุณภาพ ส่งเสริมการเรียนรู้ตลอดชีวิตสำหรับทุกคน เป้าหมายรวมถึงการเข้าถึงการศึกษาขั้นพื้นฐานและมัธยมศึกษา ความเสมอภาคทางเพศในการศึกษา และทักษะดิจิทัล"
    } },
  { n: 5,  short: "Gender Equality",                    shortTh: "ความเท่าเทียมทางเพศ",                   color: "#FF3A21",
    description: {
      en: "Achieve gender equality and empower all women and girls. Targets address discrimination, violence, unpaid care work, equal political and economic participation, and reproductive rights.",
      th: "บรรลุความเท่าเทียมทางเพศและเสริมพลังของผู้หญิงและเด็กหญิง เป้าหมายรวมถึงการขจัดการเลือกปฏิบัติและความรุนแรง การดูแลที่ไม่ได้รับค่าตอบแทน การมีส่วนร่วมทางการเมืองและเศรษฐกิจ และสิทธิอนามัยเจริญพันธุ์"
    } },
  { n: 6,  short: "Clean Water and Sanitation",         shortTh: "น้ำสะอาดและสุขาภิบาล",                  color: "#26BDE2",
    description: {
      en: "Ensure availability and sustainable management of water and sanitation for all. Targets include universal safe drinking water, ending open defecation, water-use efficiency, and protection of water-related ecosystems.",
      th: "สร้างหลักประกันให้คนทุกคนเข้าถึงน้ำสะอาดและสุขาภิบาลอย่างยั่งยืน เป้าหมายรวมถึงน้ำดื่มที่ปลอดภัยถ้วนหน้า การยุติการขับถ่ายในที่โล่ง การใช้น้ำอย่างมีประสิทธิภาพ และการปกป้องระบบนิเวศที่เกี่ยวข้องกับน้ำ"
    } },
  { n: 7,  short: "Affordable and Clean Energy",        shortTh: "พลังงานสะอาดและเข้าถึงได้",              color: "#FCC30B",
    description: {
      en: "Ensure access to affordable, reliable, sustainable, and modern energy for all. Targets include increasing the share of renewables, improving energy efficiency, and expanding energy infrastructure to underserved areas.",
      th: "สร้างหลักประกันการเข้าถึงพลังงานที่เพียงพอ น่าเชื่อถือ ยั่งยืน และทันสมัย เป้าหมายรวมถึงการเพิ่มสัดส่วนพลังงานหมุนเวียน การเพิ่มประสิทธิภาพการใช้พลังงาน และการขยายโครงสร้างพื้นฐานสู่พื้นที่ที่ขาดแคลน"
    } },
  { n: 8,  short: "Decent Work and Economic Growth",    shortTh: "งานที่มีคุณค่าและเศรษฐกิจเติบโต",        color: "#A21942",
    description: {
      en: "Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all. Targets cover labor rights, youth employment, eradication of forced labor, and safe working environments.",
      th: "ส่งเสริมการเติบโตทางเศรษฐกิจอย่างยั่งยืน ทั่วถึง การจ้างงานเต็มที่และมีประสิทธิภาพ และงานที่มีคุณค่าสำหรับทุกคน รวมถึงสิทธิแรงงาน การจ้างงานเยาวชน การขจัดแรงงานบังคับ และสภาพแวดล้อมการทำงานที่ปลอดภัย"
    } },
  { n: 9,  short: "Industry, Innovation, Infrastructure", shortTh: "อุตสาหกรรม นวัตกรรม โครงสร้างพื้นฐาน", color: "#FD6925",
    description: {
      en: "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation. Targets cover research and development, small-business access to finance, and upgraded technological capabilities.",
      th: "สร้างโครงสร้างพื้นฐานที่มีความทนทาน ส่งเสริมอุตสาหกรรมและนวัตกรรมที่ยั่งยืน เป้าหมายรวมถึงการวิจัยและพัฒนา การเข้าถึงเงินทุนของธุรกิจขนาดเล็ก และการยกระดับขีดความสามารถทางเทคโนโลยี"
    } },
  { n: 10, short: "Reduced Inequalities",               shortTh: "ลดความเหลื่อมล้ำ",                       color: "#DD1367",
    description: {
      en: "Reduce inequality within and among countries. Targets address income inequality, social inclusion, safe migration, equal voice in international decisions, and progressive fiscal and social protection.",
      th: "ลดความเหลื่อมล้ำภายในและระหว่างประเทศ เป้าหมายรวมถึงความเหลื่อมล้ำทางรายได้ การมีส่วนร่วมในสังคม การย้ายถิ่นที่ปลอดภัย เสียงที่เท่าเทียมในเวทีระหว่างประเทศ และระบบภาษีและสวัสดิการที่เป็นธรรม"
    } },
  { n: 11, short: "Sustainable Cities and Communities", shortTh: "เมืองและชุมชนที่ยั่งยืน",                 color: "#FD9D24",
    description: {
      en: "Make cities and human settlements inclusive, safe, resilient, and sustainable. Targets cover affordable housing, sustainable transport, urban planning, cultural and natural heritage, and disaster risk reduction.",
      th: "ทำให้เมืองและชุมชนปลอดภัย ครอบคลุม ทนทาน และยั่งยืน เป้าหมายรวมถึงที่อยู่อาศัยราคาเอื้อมถึง การคมนาคมที่ยั่งยืน การวางผังเมือง การคุ้มครองมรดกทางวัฒนธรรมและธรรมชาติ และการลดความเสี่ยงจากภัยพิบัติ"
    } },
  { n: 12, short: "Responsible Consumption and Production", shortTh: "การบริโภคและการผลิตที่ยั่งยืน",      color: "#BF8B2E",
    description: {
      en: "Ensure sustainable consumption and production patterns. Targets include halving food waste, sustainable management of natural resources, corporate sustainability reporting, and sustainable public procurement.",
      th: "สร้างหลักประกันรูปแบบการบริโภคและการผลิตที่ยั่งยืน เป้าหมายรวมถึงการลดขยะอาหารลงครึ่งหนึ่ง การจัดการทรัพยากรธรรมชาติอย่างยั่งยืน การรายงานความยั่งยืนขององค์กร และการจัดซื้อจัดจ้างภาครัฐที่ยั่งยืน"
    } },
  { n: 13, short: "Climate Action",                     shortTh: "การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ",   color: "#3F7E44",
    description: {
      en: "Take urgent action to combat climate change and its impacts. Targets cover resilience to climate hazards, integrating climate change into national policies, climate finance commitments, and climate education.",
      th: "ปฏิบัติการอย่างเร่งด่วนเพื่อต่อสู้กับการเปลี่ยนแปลงสภาพภูมิอากาศและผลกระทบ เป้าหมายรวมถึงความทนทานต่อภัยจากสภาพอากาศ การบูรณาการเข้ากับนโยบายระดับชาติ การเงินด้านสภาพภูมิอากาศ และการศึกษาด้านสภาพอากาศ"
    } },
  { n: 14, short: "Life Below Water",                   shortTh: "ทรัพยากรทางทะเล",                       color: "#0A97D9",
    description: {
      en: "Conserve and sustainably use the oceans, seas, and marine resources. Targets address marine pollution, ocean acidification, sustainable fisheries, marine protected areas, and small-scale artisanal fishers.",
      th: "อนุรักษ์และใช้มหาสมุทรและทรัพยากรทางทะเลอย่างยั่งยืน เป้าหมายรวมถึงมลพิษทางทะเล ภาวะกรดของมหาสมุทร การประมงที่ยั่งยืน พื้นที่คุ้มครองทางทะเล และชาวประมงพื้นบ้านขนาดเล็ก"
    } },
  { n: 15, short: "Life on Land",                       shortTh: "ระบบนิเวศบนบก",                          color: "#56C02B",
    description: {
      en: "Protect, restore, and promote sustainable use of terrestrial ecosystems, manage forests, combat desertification, and halt biodiversity loss. Targets include deforestation, endangered species protection, and ecosystem services.",
      th: "ปกป้อง ฟื้นฟู และส่งเสริมการใช้ระบบนิเวศบนบกอย่างยั่งยืน จัดการป่าไม้ ต่อสู้กับการแปรสภาพเป็นทะเลทราย และหยุดการสูญเสียความหลากหลายทางชีวภาพ เป้าหมายรวมถึงการตัดไม้ทำลายป่า การคุ้มครองสัตว์ใกล้สูญพันธุ์ และบริการของระบบนิเวศ"
    } },
  { n: 16, short: "Peace, Justice and Strong Institutions", shortTh: "สังคมสงบสุข ยุติธรรม สถาบันเข้มแข็ง",  color: "#00689D",
    description: {
      en: "Promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable, and inclusive institutions. Targets cover violence, corruption, illicit financial flows, and inclusive decision-making.",
      th: "ส่งเสริมสังคมที่สงบสุขและครอบคลุม เข้าถึงกระบวนการยุติธรรมถ้วนหน้า สร้างสถาบันที่มีประสิทธิผล ตรวจสอบได้ และครอบคลุม เป้าหมายรวมถึงความรุนแรง การทุจริต กระแสเงินผิดกฎหมาย และการตัดสินใจที่ครอบคลุม"
    } },
  { n: 17, short: "Partnerships for the Goals",         shortTh: "ความร่วมมือเพื่อการพัฒนาที่ยั่งยืน",      color: "#19486A",
    description: {
      en: "Strengthen the means of implementation and revitalize the global partnership for sustainable development. Targets cover finance, technology transfer, capacity building, trade, and multi-stakeholder partnerships.",
      th: "เสริมความเข้มแข็งของแนวทางการปฏิบัติงานและฟื้นฟูความร่วมมือระดับโลกเพื่อการพัฒนาที่ยั่งยืน ครอบคลุมการเงิน การถ่ายทอดเทคโนโลยี การเสริมสร้างขีดความสามารถ การค้า และความร่วมมือหลายภาคส่วน"
    } },
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

  3: [
    previewScenario(
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
    ),
    previewScenario(
      "Mental Health in Thai Universities",
      "Suicide and severe-depression rates among Thai undergraduates have climbed sharply since 2022; campus counselors report 3-month waitlists.",
      "Crisis-only triage protects the most acute cases but means most students never see a counselor.",
      "Should universities mandate a one-hour mental-health screening at enrolment, even though doing so risks stigmatising the result?",
      ["Autonomy vs proactive care", "Stigma and labelling"],
      "Builds on the 2024 OHEC undergraduate-wellbeing survey and ongoing Department of Mental Health pilots.",
      [
        { label: "University counselors", role: "Front-line support", interest: "Manageable caseloads, early intervention" },
        { label: "Student affairs officers", role: "Policy implementers", interest: "Defensible procedures" },
        { label: "Affected students", role: "Subjects of any policy", interest: "Privacy and non-stigmatising care" },
        { label: "Department of Mental Health", role: "National standard-setter", interest: "Evidence-based protocols at scale" },
      ],
    ),
    previewScenario(
      "PM2.5 and Pediatric Lungs",
      "Repeated annual PM2.5 exposure during northern Thailand's burning season is now linked to measurable lung-function decline in children under 12.",
      "Closing schools on bad-air days protects lungs but worsens learning loss; keeping schools open accepts the health cost.",
      "What air-quality threshold should automatically trigger a province-wide school closure, and who pays the wage-replacement for caregivers forced to stay home?",
      ["Child welfare vs equitable education", "Cost burden on low-income families"],
      "Tied to MOPH 2025 air-quality public-health framework and CMU pediatric pulmonology research.",
      [
        { label: "Pediatric pulmonologists", role: "Document health impact", interest: "Earliest possible intervention threshold" },
        { label: "Provincial education offices", role: "School-closure authority", interest: "Defensible, predictable triggers" },
        { label: "Parents of school-age children", role: "Caregivers", interest: "Both children's health and stable schooling" },
        { label: "Provincial DDPM", role: "Disaster-declaration link", interest: "Threshold criteria aligned with national policy" },
      ],
    ),
  ],

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
