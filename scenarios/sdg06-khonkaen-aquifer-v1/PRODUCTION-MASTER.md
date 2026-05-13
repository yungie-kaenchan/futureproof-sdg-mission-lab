# PRODUCTION MASTER — "The Aquifer Below Khon Kaen"

| Field | Value |
|---|---|
| Scenario ID | `sdg06-khonkaen-aquifer-v1` |
| SDG | 6 — Clean Water and Sanitation |
| Sub-targets | 6.4 (water-use efficiency) · 6.6 (water-related ecosystems) |
| Setting | Nam Phong / Ubolratana watershed, Khon Kaen Province, Northeast Thailand |
| Difficulty | CEFR B1+ to B2 |
| Mission cycle | 90 min |
| Bloom anchors | All six (one mission each) |
| Ethical axes | Distributive justice **×** Intergenerational equity |
| Local Lens | Mandatory, embedded throughout |
| Status | DRAFT v1 — pending Aj. Yungie + named Thai pedagogy reviewer sign-off |
| Hall of Excellence eligible | Yes (showcase tier) |

---

## TABLE OF CONTENTS

1. Researcher's Brief — vetted facts + flagged uncertainties
2. Scenario text — setting, tension, dossier, source pair, stakeholders ×4, crisis script, tribunal frame, solution template
3. Audio production kit — 6 ElevenLabs prompts
4. Image production kit — 5 image prompts
5. Rubric instantiations — 4 rubrics × 4 criteria × 5 bands
6. Calibration exemplars — 12 anchor responses
7. Quiz bank — 6 M1 items + 3 M2 items, scenario-specific, adaptive, diegetic
8. Bibliography
9. Production checklist + open vetting questions

---

# 1. RESEARCHER'S BRIEF

## 1.1 Geography & hydrology

| Fact | Source provenance | Use in scenario |
|---|---|---|
| The Khorat Plateau occupies ~170,000 km² across Northeast Thailand. | Multiple geological references; KKU Faculty of Engineering work. | Anchoring opening sentence of dossier. |
| The **Khorat Plateau Aquifer** is one of Asia's major transboundary aquifers, shared between Thailand and Laos. | UNESCO transboundary-aquifer catalogue; ScienceDirect GMS reviews. | Foundational dossier fact + Mission 5 framing (whose generation? whose border?). |
| The **Nam Phong River basin** covers ~12,560 km² across Loei, Phetchabun, Chaiyaphum, Udon Thani, Khon Kaen. | Mekong River Commission references; Thai hydrological reports. | Geographical specificity per CLAUDE.md anti-vagueness rule. |
| The **Ubolratana Reservoir** (on the Nam Phong) is the principal surface-water store for the basin. | Royal Irrigation Department public data; Bangkok Post 2024–2025 coverage. | Sets the surface-vs-ground tension. |
| Ubolratana reached **0% usable capacity in three dry seasons within the past decade** (2016, 2019, 2020). | Bangkok Post; Thaiger. | Concrete drought anchor — explains why groundwater pressure is rising. |
| The **Nong Wai irrigation system** (downstream of Ubolratana) was designed for ~42,287 ha (~264,292 rai). | FAO / MRC. | Establishes scale of irrigation demand competing with municipal supply. |
| Northeast Thailand has the **highest density of wells and the largest share of groundwater extraction** in the country. | Department of Groundwater Resources; David Publishing review. | Supports stakeholder 1's livelihood concerns + stakeholder 3's permit history. |
| Wells in Isaan are typically drilled to **~300 m depth**, vs 80–100 m in other regions. | Regional groundwater reporting. | Concrete contrast for dossier — illustrates how reliance has deepened. |

## 1.2 Institutional landscape

| Institution | Role in scenario | Verification |
|---|---|---|
| **Provincial Waterworks Authority (PWA)** — state enterprise, Ministry of Interior; supplies potable water in 74 provinces; operates PWA Khon Kaen branch. | Source of municipal water; Stakeholder 2 represents PWA. | ✅ Public agency, verifiable. |
| **Royal Irrigation Department (RID)** — releases Ubolratana water May 1 – Oct 31 downstream to 5 PWA offices, ~45 villages, and ~10 industrial sites along the Pong River. | Sets the operational frame for surface-water seasonality. | ✅ Operational schedule publicly reported. |
| **Department of Groundwater Resources (DGR)** — MNRE; administers the Groundwater Act B.E. 2520 (1977), nationally enforced from 1994; issues well permits. | Legal authority over the wellfield expansion. | ✅ Statutory body. |
| **Department of Mineral Resources** — handles certain industrial groundwater-use permits where municipal supply is insufficient. | Permit pathway used by Stakeholder 3 (food-processing facility). | ✅ Verified regulatory pathway. |
| **Khon Kaen University Groundwater Research Institute (GWRI)** at `gwri.kku.ac.th` + the **Faculty of Engineering**'s related work on the Khorat aquifer (e.g., SINTACS vulnerability assessment for Nong Rua District). | Cited as the source of independent scientific work in the dossier and Source B (signed as GWRI). | ✅ Real institutes with public-facing pages. |
| **TDRI (Thailand Development Research Institute)** — published policy notes on Northeast water pricing and allocation. | Cited as a policy authority in the dossier. | ✅ Real, reputable think tank. |
| **Village Health Volunteers (อาสาสมัครสาธารณสุข / อสม.)** — >1 million nationally; receive ~37 hrs foundational + 6 hrs elective training; surveil communicable disease at village level; under MOPH. | Stakeholder 4's institutional grounding. | ✅ WHO-recognized program. |
| **Department of Disaster Prevention and Mitigation (DDPM)** — referenced for drought-period emergency tankering. | Background context. | ✅ Real agency. |

## 1.3 The empirical spine of the tension

This scenario is built on a **documented**, not invented, conflict.

> **Verbatim from a 2023 ScienceDirect paper on decentralized groundwater governance in Khon Kaen:** *"the drive for industrial groundwater extraction conflicts with conservation mandates, leading to over-extraction that drains hand-pump wells relied on by poorer households."*

Plus:

- Thailand has groundwater potential of **~33,000 Mm³/yr**; **~67% is already extracted** via **~2.5 million wells**.
- The **Mun, Khong, and Pasak basins** (all in or bordering Isaan) are already extracting *above* sustainable yield.
- "There isn't a clear policy in extracting groundwater beyond sustainable yield levels" — i.e., **the regulatory gap is real**, not fabricated.
- Khon Kaen city population projected to grow **~19.5% by 2030**, pushing demand further.
- Strongly saline-soil zones on the Khorat Plateau cover **~2,400 km²** — drawdown worsens upwelling of brine, which damages future water *and* soil quality. (Intergenerational equity axis becomes concrete.)

## 1.4 Anti-pattern check

| Check | Pass? |
|---|---|
| Not COVID-related | ✅ |
| AI not the topic, protagonist, or villain | ✅ |
| Outside Bangkok | ✅ (Khon Kaen) |
| No monarchy / lèse-majesté references | ✅ |
| No military / coup / party-politics references | ✅ |
| No named living individuals | ✅ (role labels only) |
| No religious-conflict framing | ✅ |
| Not a "more education" or "raise awareness" answer | ✅ (policy + coalition outcome required) |
| Not a single-hero resolution | ✅ |
| Real research bodies cited correctly | ✅ |
| Stakeholders rendered with dignity, agency, defensible positions | ✅ |
| ≥1 stakeholder from a vulnerable group | ✅ (smallholder farmer + community health volunteer) |
| ≥1 female-coded stakeholder | ✅ (PWA manager + community health volunteer) |
| ≥1 institutional voice | ✅ (PWA) |
| ≥1 private-sector voice | ✅ (food-processing facility) |
| Geography specific to a province/district/watershed | ✅ (Nam Phong / Ubolratana / Nong Wai / Nong Rua) |

## 1.5 Flagged uncertainties — use ranges, never invent

The following are knowingly **not** specified to a precise figure in this scenario. Where they appear, the dossier uses qualifiers ("around," "in recent years," "reports describe"):

- ⚠ Exact 2024–2026 wellfield drawdown rate in Khon Kaen province — no public single authoritative figure. Dossier says *"recent reports describe accelerating drawdown"*.
- ⚠ Exact number of "new wells" the province plans to add this dry season — fictionalized at **12** for narrative tractability. Flagged in the manifest as a *narrative choice, not a verified figure*. Acceptable because the scenario is a *plausible decision case*, not a documentary.
- ⚠ Specific food-processing or beverage-manufacturer company names — deliberately not used.
- ⚠ Specific government-official names — deliberately not used.
- ⚠ Exact PWA Khon Kaen daily extraction volume — not publicly broken out per branch. Dossier uses scale qualifier "serves around 200,000 residents."

## 1.6 Cultural-authenticity guard

Stakeholder voice authenticity (per CLAUDE.md §11 + §15):

- The smallholder farmer's voice is grounded in real Isaan vocabulary patterns. NOT a "rural caricature." Hedged, careful, plain — not folksy.
- The PWA operations manager speaks in technocratic English with hints of public-service formality — matches the actual register of Thai ministry English-language briefings.
- The community health volunteer (อสม.) speaks warmly, observationally, with concrete house-to-house detail — modeling how อสม. actually report.
- The food-processing facility director speaks polished commercial English — investor-deck register, NOT villainous.

**No stakeholder is positioned as "the wrong answer." All four positions are defensible from inside the speaker's situation.**

---

# 2. SCENARIO TEXT

## 2.1 Title

**The Aquifer Below Khon Kaen**

## 2.2 Setting (28 words)

> Khon Kaen sits above the Khorat Plateau aquifer, a freshwater store shared with Laos. As dry seasons lengthen, more of the province's drinking water comes from underground.

## 2.3 Core tension (22 words)

> Deepening the municipal wellfield secures dry-season supply for around 200,000 residents but accelerates aquifer drawdown the next generation will inherit.

## 2.4 Decision point (Mission 5 framing)

> Should the province authorize an additional **12 deep wells** this dry season, knowing the aquifer's recharge rate cannot keep pace with current extraction?

## 2.5 Ethical axes (controlled vocabulary)

1. **Distributive justice** — who pays the cost of today's reliable supply (rural shallow-well households, future residents) vs who receives the benefit (urban residents, industrial permit-holders)?
2. **Intergenerational equity** — drawdown that brings forward salinity intrusion borrows from a generation that has no voice in this decision.

## 2.6 Dossier — Mission 1 reading (787 words, B1+/B2)

> ### Part 1 — Why the wells matter
>
> Khon Kaen province draws its drinking water from two sources. The first is surface water, mainly the Ubolratana Reservoir on the Nam Phong River. The second is groundwater, pumped from a network of deep wells that tap the Khorat Plateau aquifer below the city.
>
> In recent years, surface water has become less reliable. The reservoir reached zero usable capacity during three separate dry seasons within the last decade. Each time, the Provincial Waterworks Authority (PWA) leaned more heavily on the wellfield to keep household taps running.
>
> The aquifer below the plateau is not endless. Reports from the Department of Groundwater Resources describe accelerating drawdown — water tables are dropping faster than the rainy season can refill them. In some districts, shallow wells that families have used for generations now run dry by March.
>
> The province has approved a plan to add **12 new deep wells** this dry season. The plan is legal under the Groundwater Act B.E. 2520. Whether it is *wise* is a different question — and that question depends on whose interests you weigh first.
>
> ### Part 2 — Who depends on the aquifer
>
> Around 200,000 residents in Khon Kaen city rely on PWA-supplied tap water. PWA's statutory mandate is to keep that supply continuous. If taps run dry for even a few days, the public health and political costs are severe.
>
> Outside the city, smallholder farmers across the Nam Phong basin depend on shallow private wells. These wells were drilled cheaply — most reach only 30 to 60 metres. They tap the upper aquifer layer that recharges from rainfall each monsoon. When the city's deeper municipal wells draw heavily, the upper layer drops too, and family wells run dry weeks earlier than they used to.
>
> Industrial users — including food-processing facilities and beverage manufacturers — hold permits issued under separate regulations. Some facilities in the basin pump from layers 200 metres or deeper. Their permits were granted years ago, when the aquifer was considered abundant.
>
> Community Health Volunteers (อสม.) in rural districts report a pattern: when household wells fail, families switch to surface ponds or unfiltered river water. Diarrhoea cases in young children rise within two weeks. The link is not catastrophic, but it is consistent.
>
> ### Part 3 — Why the aquifer cannot just be refilled
>
> The Khorat Plateau aquifer recharges slowly. Rainfall must percolate through layers of soil and rock, a process measured in years and decades, not weeks. The plateau also contains zones of natural rock salt. When the aquifer is drawn down too far, brine from these deeper layers can move upward and contaminate freshwater supplies — a process called **saline intrusion**.
>
> Researchers at Khon Kaen University and at the Thailand Development Research Institute (TDRI) have warned that allocation decisions made today will lock in water-quality outcomes for the next generation. Once an aquifer turns saline, reversing the damage takes decades, if it can be done at all.
>
> ### Part 4 — The decision before you
>
> The province has the **legal mandate** to drill the new wells. The PWA has the **operational need**. The aquifer has a **threshold** beyond which damage is no longer reversible. Different stakeholders disagree about whether that threshold has already been crossed.
>
> Your team has been asked to brief the provincial council before the wellfield expansion is finalized. The council will not accept "it depends." It needs a position — and reasoning that holds up when other stakeholders push back.
>
> ### Vocabulary in this dossier (foregrounded for Mission 1)
>
> *aquifer · drawdown · capacity · mandate · allocation · threshold · intrusion · equitable · jurisdiction · residual*

## 2.7 Conflicting source pair — Mission 2

Two short articles students must reconcile.

### SOURCE A — Industry-association briefing note (210 words)

> ### Northeast Water Sustainability Coalition — Member Brief, February 2026
>
> **The case for expanding Khon Kaen's wellfield**
>
> Khon Kaen's groundwater capacity has been underestimated for decades. Modelling commissioned by member companies in late 2025 indicates that the deep aquifer below the Khorat Plateau holds reserves sufficient to meet provincial demand for at least another fifty years, even under conservative recharge assumptions.
>
> The Provincial Waterworks Authority's proposed twelve-well expansion will draw from a confined layer that lies beneath the upper aquifer used by household wells. Hydrogeological separation between the two layers means that household supplies will not be affected by the new municipal wells.
>
> Concerns about saline intrusion are overstated. Salt-bearing formations on the plateau are localized to identified zones, and the new wellfield is sited well outside those zones. The original 1977 permitting framework — under which industrial groundwater extraction has operated for nearly five decades without significant aquifer collapse — remains the most reliable evidence base.
>
> Delay in approving the wellfield expansion would expose 200,000 residents to a credible risk of supply interruption during the 2026 dry season. The Coalition urges the provincial council to approve the expansion on the proposed timeline.
>
> *Prepared by the Northeast Water Sustainability Coalition, an industry association of food and beverage manufacturers operating in the Lower Mekong region.*

### SOURCE B — University research summary (218 words)

> ### Groundwater Research Institute (GWRI) Working Paper Series — Summary Note, January 2026
>
> **Aquifer drawdown signals in the Nam Phong basin: a precautionary reading**
>
> A vulnerability assessment of groundwater in selected Khon Kaen districts (Nong Rua, Ban Phai, Ubolratana) shows a measurable decline in static water levels across the upper aquifer between 2020 and 2025. Decline rates vary by district but exceed historical seasonal fluctuation in roughly two-thirds of monitored wells.
>
> Hydrogeological separation between the upper and lower aquifer layers is **partial, not absolute**. Vertical leakage occurs under sustained pumping pressure, particularly in zones where confining strata are fractured. The proposed expansion does not appear to have been preceded by a published leakage assessment.
>
> Saline-intrusion modelling for the Khorat Plateau suggests that the threshold beyond which saline upwelling becomes self-sustaining lies within the range of currently observed drawdown rates. The threshold is not a single line; it is a probability function that increases with extraction volume and duration.
>
> The 1977 permitting framework predates the monitoring data on which a precautionary judgement could rest. Citing the absence of past collapse as evidence of future safety is a survivorship-bias argument. A precautionary delay of 18 months to commission an independent leakage and intrusion assessment is recommended.
>
> *Khon Kaen University Groundwater Research Institute (GWRI).*

### Source-pair note for the AI applier

When scoring student responses, the AI applier should treat **Source B as more defensible** primarily on three grounds — provenance (peer-affiliated academic vs interested-party association), methodology (cites recent monitoring vs cites a fifty-year-old permit framework), and conflict-of-interest disclosure. Students who identify any two of these grounds reach Band 4+. Students who simply pick a side without engaging the conflict cap at Band 2.

## 2.8 Stakeholder 1 — Smallholder rice farmer (108 words)

> **Role:** Smallholder rice farmer, Nong Rua District, Khon Kaen
>
> **Position statement (written form, dossier):**
>
> "My family has farmed this land for three generations. The shallow well in our yard used to run all year. Now, by March, it gives nothing. I hear the province will dig deeper wells in town. I do not blame them — people need to drink. But the water under our feet is the same water. If they pull more, mine runs dry sooner. The officials say their wells are deeper than mine, so they will not affect us. The ground does not work like that. The rain that falls on my field is the rain that fills their wells."

**Hidden interest (emerges Mission 4):** He has been informally renting his fallow paddy land to a neighbouring agricultural cooperative for groundwater-fed crop trials. Loss of shallow-well access ends this side income, which buffers his household through the lean months.

## 2.9 Stakeholder 2 — PWA Khon Kaen Operations Manager (112 words)

> **Role:** Provincial Waterworks Authority — Khon Kaen Branch, Operations Manager
>
> **Position statement:**
>
> "Our statutory mandate is clear: continuous potable water to around 200,000 residents in this service area. In each of the last three drought years, we came within days of supply interruption. The twelve-well expansion is sized to provide a residual margin during a one-in-fifty-year dry season. The hydrogeological assessment supporting our permit application identifies a confined lower layer with minimal leakage risk. We have heard the concerns from rural districts and from the university working paper. We are prepared to commission additional monitoring — but we cannot operate the city on a precautionary delay. Taps must run."

**Hidden interest (emerges Mission 4):** Her branch's budget for the 2026 fiscal year is contingent on the wellfield expansion being delivered on schedule. A delay risks reallocation of capital funds to another province.

## 2.10 Stakeholder 3 — Food-processing facility Production Director (104 words)

> **Role:** Production Director, regional food-processing facility, Khon Kaen basin
>
> **Position statement:**
>
> "Our facility holds a groundwater extraction permit issued under the framework that has governed industrial water use in this region for nearly five decades. We extract from the deep confined layer, well below any household well. Our extraction volume is monitored and reported quarterly. The current debate about the municipal expansion has surfaced calls to revisit *all* extraction permits in the basin. We support sustainable allocation. We do not support retroactive cancellation of permits granted in good faith. A predictable regulatory environment is essential to continued operation and to the jobs our plant supports."

**Hidden interest (emerges Mission 4):** His plant's permit is up for five-year renewal in 2027. Any precedent set by the current wellfield debate — particularly a precautionary review framework — would apply directly to that renewal.

## 2.11 Stakeholder 4 — Community Health Volunteer / อสม. (114 words)

> **Role:** Village Health Volunteer (อสม.), rural sub-district, Khon Kaen
>
> **Position statement:**
>
> "I have walked the houses in my sub-district for eleven years. Two patterns repeat. When the shallow wells fail in March, families turn to ponds or to river water. Within two weeks, mothers bring children with diarrhoea to our health post. Older residents stop drinking enough because they do not trust the taste of the surface water. Dehydration in the elderly is a quieter problem but a real one. I do not have hydrogeology training. I have a notebook with eleven years of household visits. The pattern I see is that decisions about water are decisions about who gets sick. Please remember the children when you decide."

**Hidden interest (emerges Mission 4):** She is preparing her sub-district's quarterly health-surveillance report — the first one that will explicitly flag drought-linked diarrhoea cases as a *systemic* issue rather than an isolated event. Her supervisor at the District Health Office has signalled discomfort with the framing.

## 2.12 Crisis Dispatch — Mission 3 (audio + visible 12-minute timer)

> **Crisis Dispatch — 14:42, Wednesday afternoon.**
>
> *"This is an urgent advisory from the PWA Khon Kaen branch. At approximately fourteen-thirty this afternoon, a group of around forty smallholder farmers from Nong Rua District blocked the access road to Municipal Wellfield Number Four. The farmers are demanding a public consultation on the proposed twelve-well expansion before any drilling proceeds. PWA crew on site have withdrawn to a safe distance. No injuries have been reported. The provincial governor's office has requested a public statement from our team — the briefing team responsible for the council's wellfield brief — within twelve minutes. Local press are en route. The statement must address the farmers' grievance, the council's position, and the next operational step. Submit your eighty- to one-hundred-twenty-word statement when ready."*

**Three response strategies the team must pick between:**

- **A) De-escalate** — pause drilling, commit publicly to a community consultation within 14 days, accept some operational risk.
- **B) Proceed with modification** — drill but reduce expansion from 12 wells to 8, with a published monitoring commitment.
- **C) Pause operations** — full halt pending independent assessment, accept significant operational and political cost.

Each strategy has tradeoffs scored by Rubric M3 (§5.2).

## 2.13 Tribunal frame — Mission 5

> The Provincial Council convenes a closed-door tribunal. Your team must defend its position on the decision question: *Should the province authorize the additional 12 deep wells this dry season?*
>
> The AI cross-examiner will probe across **four rounds**, intensity calibrated to your response quality:
>
> 1. **Round 1 — premise check.** "You have argued X. What is the evidence on which X rests?"
> 2. **Round 2 — stakeholder challenge.** "Stakeholder Y disagrees with X. Their strongest reason is Z. How do you answer Z?"
> 3. **Round 3 — temporal challenge.** "Your decision binds a generation that is not in this room. By what authority do you bind them?"
> 4. **Round 4 — concession invitation.** "Is there any premise in your argument you would now revise?"
>
> **Graceful Concession bonus:** Teams that revise one premise *with reasoning* in Round 4 earn +10 tokens. Teams that collapse to "it depends" earn 0.
>
> Final output: 200–300 word position statement that will frame Panel 3 (THE INSIGHT) of the Pitch Capsule.

## 2.14 Solution-brief template — Mission 6

A scaffolded 5-panel template instantiated for this scenario:

| Panel | Lead role | Required content for THIS scenario |
|---|---|---|
| 1 — THE CRISIS | Research Analyst | Drawdown evidence, threshold framing, 200,000 residents + saline-intrusion risk |
| 2 — THE JOURNEY | Collaborative | Trace from M1 source ranking → M2 audience brief → M3 crisis choice → M4 leverage point |
| 3 — THE INSIGHT | Ethics & Policy Officer | The 200–300 word M5 final statement, distilled to ≤80 words |
| 4 — THE SOLUTION | Communications Director | Coalition proposal (PWA + DGR + KKU + community) — NOT a single-hero answer |
| 5 — THE VOICE | Collaborative | 45–60 sec recorded narration; one stakeholder voice acknowledged by name |

---

# 3. AUDIO PRODUCTION KIT (ElevenLabs)

Six prompts. Each contains voice profile, performance direction, script, and QA checklist. Total target runtime ~4–5 minutes.

## 3.1 Asset 01 — Stakeholder 1 (Smallholder farmer)

**Voice profile**

```
Thai male, 55-65 years old. English as a second language, gentle
Isaan-accented English. Vowels slightly elongated, final consonants
sometimes softened — but NOT exaggerated. This is a working farmer
who has spoken English at agricultural extension meetings for
decades, not a caricature.

Pitch: lower-mid register.
Pace: 110-125 wpm.
Energy: low-to-moderate. Tired but not defeated.
Filler: 1-2 small natural pauses ("...you know"). Do NOT polish.

Library category to test first: "Mature / Storyteller / Documentary"
(male). If cloning, source from a male Thai speaker (60+) reading
English news at calm pace.
```

**Performance direction**

```
Stability: 55
Similarity: 70
Style exaggeration: 25
Speaker boost: ON

Director note: "Read as if you are speaking to a young reporter
who has come to your house. You are not angry — you are worried.
Pause after the second sentence. Final sentence drops in volume —
this is a private thought, not a slogan."
```

**Script (62 words, ~32 s @ 115 wpm)**

```
My family has farmed this land for three generations.
The shallow well in our yard — it used to run all year.

[pause 1s]

Now? By March, it gives nothing.

I hear the province will dig deeper wells in town.
I do not blame them. People need to drink.
But the water under our feet is the same water.
If they pull more, mine runs dry sooner.
That is just how the ground works.
```

**QA checklist**

- [ ] Duration 25–35 s
- [ ] "Aquifer" not mispronounced (skip — not in this script)
- [ ] Audible pause after "...used to run all year"
- [ ] Final line drops volume / intimacy
- [ ] No AI-voice giveaway (over-perfect cadence)
- [ ] Silent background — no music, no foley
- [ ] Export: MP3 mono 128 kbps, ≤500 KB

## 3.2 Asset 02 — Stakeholder 2 (PWA Operations Manager)

**Voice profile**

```
Thai female, mid-40s. Professional Thai-accented English of the
type heard in Thai ministry briefings or technical conferences.
Crisp consonants, controlled pace, occasional formal phrasing.

Pitch: mid register.
Pace: 130-145 wpm.
Energy: measured, alert, slightly defensive (she is being
questioned in public).
Filler: minimal — this is briefing register.

Library category: "Professional / Corporate / Briefing" (female).
If cloning, source from Thai female speaker, 40s, reading press
statement copy.
```

**Performance direction**

```
Stability: 65
Similarity: 75
Style exaggeration: 20
Speaker boost: ON

Director note: "Read as if delivering a prepared statement at a
council hearing. You are not warm — you are responsible. Lightly
emphasize the words 'statutory mandate' and 'residual margin'
because these are the technical anchors of your position."
```

**Script (74 words, ~32 s @ 138 wpm)**

```
Our statutory mandate is clear: continuous potable water to
around two hundred thousand residents in this service area.

In each of the last three drought years, we came within days
of supply interruption.

The twelve-well expansion is sized to provide a residual margin
during a one-in-fifty-year dry season.

We have heard the concerns from rural districts and from the
university working paper. We are prepared to commission additional
monitoring. But taps must run.
```

**QA**

- [ ] 25–35 s
- [ ] "Statutory mandate" + "residual margin" lightly stressed
- [ ] No warmth in delivery — this is a formal briefing
- [ ] Numbers crisp ("two hundred thousand," "twelve-well")
- [ ] Silent background

## 3.3 Asset 03 — Stakeholder 3 (Food-processing facility Production Director)

**Voice profile**

```
Thai male, 45-55, polished commercial English. Investor-deck
register. Light Thai accent — this is someone who has done
international procurement calls. Confident, never hurried.

Pitch: mid-low.
Pace: 135-150 wpm.
Energy: assured, smooth.
Filler: zero — this voice is rehearsed.

Library category: "Executive / Corporate / Commercial" (male).
If cloning, source from Thai male speaker, 50s, reading earnings
call transcript.
```

**Performance direction**

```
Stability: 65
Similarity: 75
Style exaggeration: 20
Speaker boost: ON

Director note: "Read as if you are addressing a regulatory review
committee that you do not want to alarm. Project predictability.
Lightly stress 'good faith' and 'predictable regulatory
environment' — these are the rhetorical pivots."
```

**Script (70 words, ~30 s @ 140 wpm)**

```
Our facility holds a groundwater extraction permit issued under
the framework that has governed industrial water use in this
region for nearly five decades.

We extract from the deep confined layer, well below any household
well. Our extraction volume is monitored and reported quarterly.

We support sustainable allocation. We do not support retroactive
cancellation of permits granted in good faith. A predictable
regulatory environment is essential.
```

**QA**

- [ ] 25–35 s
- [ ] "Good faith" + "predictable regulatory environment" stressed
- [ ] No defensiveness audible
- [ ] Numbers ("five decades," "quarterly") crisp

## 3.4 Asset 04 — Stakeholder 4 (Community Health Volunteer / อสม.)

**Voice profile**

```
Thai female, 50-60, warm community-care register. English clear
but unrehearsed — this is someone who has been asked to speak in
English because the situation requires it. Slight hesitation in
two or three places. Honest, not performative.

Pitch: mid.
Pace: 115-130 wpm.
Energy: warm but serious. Concerned.
Filler: 1-2 natural micro-hesitations. Keep them.

Library category: "Mature / Warm / Documentary" (female). If
cloning, source from Thai female speaker, 50s, reading community
health bulletin.
```

**Performance direction**

```
Stability: 55
Similarity: 70
Style exaggeration: 25
Speaker boost: ON

Director note: "Read as if you are speaking to a panel of younger
people who you respect but who have not walked the houses you
walk. The final line — 'Please remember the children' — is the
emotional centre. Do not over-soften it; let it sit."
```

**Script (75 words, ~34 s @ 132 wpm)**

```
I have walked the houses in my sub-district for eleven years.

When the shallow wells fail in March, families turn to ponds
or river water. Within two weeks, mothers bring children with
diarrhoea to our health post.

Older residents stop drinking enough because they do not trust
the taste. Dehydration in the elderly is a quieter problem,
but it is real.

[pause 1s]

Please remember the children when you decide.
```

**QA**

- [ ] 30–38 s (slightly longer permitted)
- [ ] Audible pause before final line
- [ ] Final line warm but firm — not weepy, not flat
- [ ] "Diarrhoea" clearly pronounced
- [ ] Hesitations preserved, not edited out

## 3.5 Asset 05 — Crisis Dispatch (M3 timed event)

**Voice profile**

```
Neutral news-anchor register, gender-flexible. Pace urgent but
not panicked. Could be ElevenLabs default "Newsreader" or
"Announcer" voice.

Pitch: mid.
Pace: 145-160 wpm.
Energy: alert, professional, dispatch-room.
Filler: zero.
```

**Performance direction**

```
Stability: 70
Similarity: 70
Style exaggeration: 15

Director note: "This is a live operational dispatch, not a news
report. Slightly faster pace. Tight diction. End with a clear
operational instruction — the team must hear the deadline."
```

**Script (105 words, ~42 s @ 150 wpm)**

```
This is an urgent advisory from the PWA Khon Kaen branch.

At approximately fourteen-thirty this afternoon, a group of
around forty smallholder farmers from Nong Rua District blocked
the access road to Municipal Wellfield Number Four. The farmers
are demanding a public consultation on the proposed twelve-well
expansion before any drilling proceeds.

PWA crew on site have withdrawn to a safe distance. No injuries
have been reported.

The provincial governor's office has requested a public statement
from the briefing team within twelve minutes. Local press are
en route.

Submit your eighty- to one-hundred-twenty-word statement when ready.
```

**QA**

- [ ] 40–60 s
- [ ] Pace consistent with operational urgency
- [ ] "Twelve minutes" clearly enunciated (this triggers the timer)
- [ ] No background music or radio static effect (keep clean)

## 3.6 Asset 06 — Tribunal Opening (M5)

**Voice profile**

```
Older Thai male OR female, panel-chair register. Formal, weighty,
unhurried. The voice of institutional gravitas.

Pitch: lower-mid.
Pace: 105-120 wpm.
Energy: still, considered, authoritative.
Filler: zero. Pauses between sentences slightly longer than
conversational.
```

**Performance direction**

```
Stability: 70
Similarity: 75
Style exaggeration: 15

Director note: "Read as a panel chair opening a hearing. You are
not adversarial — you are setting expectations. The pauses are
the message. Do not rush."
```

**Script (62 words, ~32 s @ 116 wpm)**

```
This tribunal is now in session.

The matter before us is the proposed expansion of the Khon Kaen
municipal wellfield by twelve deep wells.

Your team has been asked to defend its recommended position.

You will face four rounds of questioning.

We are not here to trap you. We are here to test whether your
reasoning holds when others push back.

Begin.
```

**QA**

- [ ] 28–35 s
- [ ] Long pauses preserved
- [ ] Final word "Begin." delivered as a clean cue (timer starts on this word)
- [ ] No reverb effect (keep dry — students will hear it on laptop speakers)

---

# 4. IMAGE PRODUCTION KIT

Five image prompts. All target a **documentary-illustration aesthetic** — hand-feel, restrained palette, slight grain. NOT photographic, NOT 3D-render, NOT cartoon, NOT vector-flat, NOT AI-glossy.

Use ChatGPT Image / Gemini / Midjourney / Stable Diffusion — whichever delivers the best result for each. Production tester runs each prompt 3–4 times and selects the best output.

## 4.1 Image 01 — Hero (Mission Select card)

**Prompt**

```
A wide-format editorial illustration for an academic learning
platform. Subject: a quiet pre-dawn scene in rural Khon Kaen,
Northeast Thailand. Foreground: the wooden frame of an old
hand-pump well at the edge of a rice paddy; the soil around
the well is dry and slightly cracked. Mid-ground: the silhouette
of a farmer in a wide-brimmed hat walking away from the well,
back to the viewer, carrying an empty plastic water container.
Background: in the distance, low concrete water-treatment
buildings of a provincial waterworks site, partially obscured
by morning mist. A single industrial water pipe runs along the
horizon line, connecting the two worlds.

Style: documentary illustration in the tradition of The Atlantic
or NYT Opinion editorial art. Hand-feel — visible brush or pencil
texture. NOT photorealistic. NOT 3D-rendered. NOT anime. NOT
vector flat. NOT AI glossy.

Palette: muted, earthy. Bone-white sky transitioning to soft
ochre at the horizon. Deep navy shadows. One restrained accent
of warm bronze in the morning light catching the pump handle.
Avoid saturated colours. Avoid neon.

Composition: 16:9. Rule of thirds — well in left third, farmer
in centre, waterworks in right third. Generous negative space
above for headline overlay.

Lighting: low-angle pre-dawn. Long soft shadows. Slight ground mist.

Texture: subtle paper-grain overlay.

Mood: contemplative, dignified, not pitying. The farmer is
walking with purpose, not despair. This is a working person,
not a victim.
```

**Negative prompt**

```
photograph, photorealistic, 3D render, anime, manga, cartoon,
vector flat, neon, oversaturated, glossy, AI artifacts, distorted
hands, watermark, signage, identifiable face, Western village,
stereotype, poverty imagery, dramatic lighting, fantasy.
```

**Output spec**

- 1792 × 1024 (16:9), crop to 1200 × 675
- PNG, ≤180 KB after compression
- Filename: `sdg06-khonkaen-hero.png`
- Alt text: *"Pre-dawn rice paddy in rural Khon Kaen. A farmer carries an empty water container away from an old hand-pump well, with provincial waterworks buildings visible on the horizon, connected by a single industrial pipe."*

**QA**

- [ ] No identifiable face on farmer
- [ ] Hands not distorted
- [ ] Pipe reads as connector between two worlds
- [ ] Palette stays muted — no oversaturated red
- [ ] Mood contemplative, not pitying
- [ ] Reads as illustration, not photo

## 4.2 Image 02 — Aquifer cross-section diagram (M1 reading)

**Prompt**

```
An educational cross-section diagram of the Khorat Plateau aquifer
beneath Khon Kaen, Northeast Thailand. Style: hand-drawn scientific
illustration in the tradition of mid-century geological textbooks
or contemporary New York Times explanatory graphics. Visible pencil
or ink linework. Restrained colour fill.

Cross-section shows, from top to bottom:
1. Ground surface with a small rice paddy on the left and a small
   urban water tower on the right.
2. Upper aquifer layer (shallow, ~30-60 m depth) — labelled. A
   household hand-pump well draws from this layer on the left side.
3. Confining strata between upper and lower aquifer — shown with
   a subtle pattern indicating partial, not absolute, separation.
   Small arrows show vertical leakage where strata are fractured.
4. Lower confined aquifer (~200+ m depth) — labelled. A municipal
   deep well and an industrial deep well draw from this layer.
5. At depth: zones of natural rock salt formation, shown in a
   slightly different shade. Arrows indicate potential upward
   saline intrusion when drawdown is sustained.

Label all layers and features in clear English text. Reserve space
for Thai hover labels (rendered in production layer).

Palette: warm beige / bone background, navy linework, restrained
ochre fills, one accent of warm bronze for the salt zones to
flag risk.

Composition: 16:9. Landscape orientation. Labels in margins,
arrows clear.

Mood: explanatory, calm, authoritative. NOT alarming. NOT
infographic-corporate.
```

**Output spec**

- SVG preferred (allows Thai hover labels). If raster: 2048 × 1152 PNG, ≤220 KB.
- Filename: `sdg06-khonkaen-aquifer-crosssection.svg`
- Alt text: *"Cross-section diagram of the Khorat Plateau aquifer beneath Khon Kaen showing upper aquifer with household wells, confining strata with vertical leakage, lower confined aquifer with municipal and industrial wells, and deeper rock salt zones with potential upward saline intrusion arrows."*

**QA**

- [ ] All five layers visible and labelled
- [ ] Leakage arrows present between layers (this is the key contested fact)
- [ ] Salt zones visually distinct without being alarming-red
- [ ] Labels legible at 1200 px wide

## 4.3 Image 03 — Drawdown chart (M2 data interpretation)

**Prompt**

```
A clean editorial chart showing static water-level decline in
three Khon Kaen districts (Nong Rua, Ban Phai, Ubolratana) between
2020 and 2025. Style: hand-finished editorial chart in the tradition
of FT or Reuters Graphics. Slightly imperfect linework, NOT a
default spreadsheet chart.

X-axis: years 2020 through 2025, annual.
Y-axis: static water level in metres below ground surface,
inverted (so decline appears as a downward trend). Range:
0 m at top, 25 m at bottom.

Three lines, one per district, each in a different muted colour:
- Nong Rua: steepest decline, ending around 21 m by 2025.
- Ban Phai: moderate decline, ending around 17 m.
- Ubolratana district: shallowest decline, ending around 13 m.

All lines start in 2020 at around 8-10 m. Each line has small
data-point markers. Each line is clearly labelled at its
right-hand endpoint.

Annotations:
- Horizontal dashed line at 18 m labelled "Historical seasonal
  fluctuation range — upper bound."
- Small annotation arrow near 2022 in the Nong Rua line labelled
  "Severe dry season."

Palette: bone-white background, navy axis and gridlines, three
muted line colours (soft ochre, soft steel-blue, soft sage),
warm bronze accent for the threshold dashed line.

Composition: 16:9. Title at top: "Static water level decline,
2020-2025." Source line at bottom in small caps: "Source: Faculty
of Engineering Working Paper, KKU (illustrative)."

Mood: clinical, readable, calm. NOT alarming. NOT infographic.
```

**Output spec**

- SVG preferred. If raster: 1600 × 900 PNG, ≤160 KB.
- Filename: `sdg06-khonkaen-drawdown-chart.svg`
- Alt text: *"Chart showing static water level decline in three Khon Kaen districts from 2020 to 2025. Nong Rua district shows the steepest decline (from 9 m to 21 m below ground surface). Ban Phai and Ubolratana districts show moderate and shallower declines. All three lines cross the historical fluctuation threshold around 2023."*

**Note for production:** Numbers in the chart are *illustrative narrative figures* per §1.5 — flagged as such in the chart's source line and in the manifest.

## 4.4 Image 04 — Watershed map (M4 stakeholder mapping)

**Prompt**

```
A simplified hand-drawn map of Khon Kaen Province with the Nam
Phong river basin highlighted. Style: hand-drawn cartography in
the tradition of old expedition maps or contemporary editorial
travel illustration. Visible pen or fine-brush linework.

Map shows:
- Khon Kaen Province outline (simplified — not topographically
  exact).
- The Nam Phong river running through the province, curving from
  upper-left to lower-right, joining the Chi River near Mueang
  District.
- The Ubolratana Reservoir as a clearly marked body of water.
- Six small icons placed at sub-district locations:
  1. A rice-paddy icon (smallholder farmer) — Nong Rua District.
  2. A water-tower icon (PWA Khon Kaen) — Mueang Khon Kaen city.
  3. A factory icon (food-processing facility) — basin-area.
  4. A small house cluster icon (Community Health Volunteer's
     sub-district) — rural area near Ban Phai.
  5. A university icon (Khon Kaen University) — city centre.
  6. A government building icon (Provincial Hall) — city centre.

Each icon labelled in clear English.

Palette: bone background, soft ochre land fill, soft steel-blue
water, navy linework, warm bronze accent for the icons.

Composition: 1:1 or 4:3, with margin for compass rose, scale
bar, and legend.

Mood: educational, slightly nostalgic (hand-cartography feel),
calm, clear.

Avoid: satellite imagery, photographic textures, modern GIS
look, exaggerated province boundaries, political markings beyond
sub-district names.
```

**Output spec**

- SVG preferred. If raster: 1024 × 1024 PNG, ≤160 KB.
- Filename: `sdg06-khonkaen-watershed-map.svg`
- Alt text: *"Hand-drawn map of Khon Kaen Province showing the Nam Phong river basin, the Ubolratana Reservoir, and six labelled sub-district locations representing the smallholder farmer, PWA, food-processing facility, community health volunteer's sub-district, Khon Kaen University, and Provincial Hall."*

## 4.5 Image 05 — Stakeholder portraits (×4)

Single prompt template, run four times with the bracketed variables substituted.

**Prompt template**

```
A 1:1 portrait silhouette / stylized icon for a stakeholder in an
academic learning scenario. Style: documentary illustration,
hand-drawn feel, NOT photorealistic, NOT cartoon. Single-figure
composition, three-quarters torso, head turned slightly. Face is
suggested but not photographically identifiable — features are
softened into the illustration style.

Subject: [STAKEHOLDER DESCRIPTION].

Palette: bone background, navy linework, one accent colour
[ACCENT COLOUR] in the clothing or context.

Mood: dignified, professional, no caricature, no emotion-
performance. This is a person doing their job.

Avoid: photograph, identifiable face, exaggerated ethnicity,
stereotype dress, comedic features, branded clothing or logos,
text, signage.

Composition: 1:1, subject filling 70% of the frame, soft vignette.
```

**Per-stakeholder instantiations**

| # | Stakeholder | Description | Accent |
|---|---|---|---|
| 01 | Smallholder farmer | Thai man in his late 50s, wearing a faded button-up work shirt and a wide-brimmed straw hat held in one hand; weather-lined face suggested in soft profile; standing as if at his doorway. | Soft ochre |
| 02 | PWA Operations Manager | Thai woman in her mid-40s, wearing a neutral collared shirt with a small unbranded ID badge; hair pulled back; holding a folder; standing as if at a podium. | Soft steel-blue |
| 03 | Food-processing facility Production Director | Thai man in his early 50s, wearing a polished business shirt without a tie; hand resting on a clipboard; standing as if mid-presentation. | Warm bronze |
| 04 | Community Health Volunteer (อสม.) | Thai woman in her late 50s, wearing the recognizable อสม. light vest or sash over a plain blouse; holding a small spiral notebook; standing as if mid-conversation at a household doorway. | Soft sage |

**Output spec per portrait**

- 512 × 512 PNG, ≤80 KB
- Filenames: `sdg06-khonkaen-stakeholder-01.png` through `-04.png`
- Alt text: *"Stylized portrait illustration of [stakeholder role]."*

**QA**

- [ ] No identifiable face on any portrait
- [ ] Hands not distorted
- [ ] No text/logos on clothing
- [ ] No caricature — all four read as dignified working people
- [ ] อสม. vest visible on stakeholder 04 (sash not exaggerated)
- [ ] Style consistent across all four (run them in one session)

---

# 5. RUBRIC INSTANTIATIONS

Four rubrics. Each: 4 criteria × 5 bands. AI applier uses these directly. Band descriptors are scenario-specific.

## 5.1 Rubric M2 — Audience-targeted explainer

Student writes a 100–150 word brief on the source conflict for one of three audiences (council / farmers' cooperative / national news editor — AI-assigned).

| Criterion | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 |
|---|---|---|---|---|---|
| **Register match** | Opposite register to assigned audience. Council brief sounds like a tweet, etc. | Wrong register dominant with one accidental match. | Mixed register, recognisable. | Mostly correct register with 1–2 slips. | Lexis, syntax, politeness pitched precisely to assigned audience. |
| **Source-conflict reasoning** | Picks a side without naming the conflict. | Names the conflict but picks side without criterion. | Names conflict + picks side with 1 criterion. | Picks side with 2 criteria of {provenance, methodology, recency, COI}. | Engages all 4 criteria with explicit weighing. |
| **Local accuracy** | References Bangkok or "Thailand" only. | Names Khon Kaen vaguely. | Names Khon Kaen and one specific feature (river/aquifer/district). | Names Khon Kaen + Nam Phong/Ubolratana + 1 institution correctly. | Names ≥2 institutions (PWA, DGR, KKU, TDRI) correctly + sub-district. |
| **Language control (CEFR)** | A2 — errors impede meaning. | B1 with frequent slips. | B1+ — controlled simple sentences, some academic vocabulary. | B2 — complex sentences mostly controlled, 3–4 academic words used naturally. | B2+ — controlled complex sentences, 5+ academic words used naturally including ≥2 from {threshold, mandate, allocation, residual, jurisdiction}. |

## 5.2 Rubric M3 — Crisis statement (80–120 words, 12-min timer)

| Criterion | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 |
|---|---|---|---|---|---|
| **Stakeholder acknowledgement** | Mentions no stakeholder. | Mentions stakeholders generically ("everyone matters"). | Names ≥1 stakeholder group with specific concern. | Names ≥2 stakeholders with distinct concerns. | Names ≥2 stakeholders, distinguishes their concerns, signals coalition. |
| **Cost recognition** | Promises everything to everyone. | Vague acknowledgement of tradeoffs. | Names ≥1 concrete cost of chosen strategy. | Names ≥1 cost + ≥1 mitigation. | Names ≥2 costs honestly + names what is *not* being promised. |
| **Concrete next step** | No operational step. | Vague step ("we will review"). | One concrete step with timeframe. | One concrete step + named responsible party. | Concrete step + responsible party + accountability mechanism. |
| **Time-pressure register** | Statement reads as if written without pressure (over-polished, off-topic). | Pressure visible but register collapses (panicked or sloppy). | Recognizably under-pressure register; clear if uneven. | Crisp, direct, council-appropriate. | Crisp + composed + correctly judges the press audience reading it. |

**Strategy-specific anchors:**

- **A (De-escalate):** Cost = operational delay risk. Band 5 acknowledges this without retreating from it.
- **B (Modify):** Cost = partial outcome both sides may dislike. Band 5 frames the compromise transparently, not as a "win."
- **C (Pause):** Cost = significant political and operational hit. Band 5 names this directly and explains why precaution is worth it.

## 5.3 Rubric M4 — Stakeholder Bridge (60-second spoken steel-man)

Student team picks the stakeholder they most disagree with, records a 60-second spoken argument *in that stakeholder's voice* presenting their strongest case.

| Criterion | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 |
|---|---|---|---|---|---|
| **Charity** | Caricatures opponent's view (straw-man). | Recognisable but weakened version of opponent's case. | Fair-strength version. | Argues opponent's case as opponent themselves would. | Argues opponent's case *better than the opponent did in §2.8–§2.11*. |
| **Register fidelity** | Default student voice, no shift. | Some shift toward opponent's voice. | Recognizable shift in vocabulary OR syntax. | Shift in vocabulary AND syntax. | Shift in vocabulary, syntax, AND emotional register (e.g., farmer's hedged plain English; PWA manager's formal briefing register). |
| **Evidence import** | No use of dossier material. | 1 dossier reference, generic. | 1 dossier reference woven into argument. | 2+ dossier references woven in. | 2+ references + 1 reference to opponent's own *hidden interest* (the M4 reveal layer). |
| **Speech intelligibility (content)** | Transcript hard to follow, off-topic, or under 30 s. | Transcript clear but stalls or repeats. | Transcript clear, coherent, on-topic. | Fluent, coherent, on-topic, well-paced. | Fluent + persuasive + lands a closing line. |

**Note: pronunciation/fluency scored separately by ElevenLabs voice analysis (see §7 pronunciation track). This rubric scores *what was said*, not *how it sounded*.**

## 5.4 Rubric M5 — Tribunal final statement (200–300 words)

| Criterion | Band 1 | Band 2 | Band 3 | Band 4 | Band 5 |
|---|---|---|---|---|---|
| **Ethical axis clarity** | No axis named or used. | One axis named but not used to weigh. | One axis named and used to weigh. | Both axes (distributive justice + intergenerational equity) named. | Both axes named, weighed against each other, and one is justified as taking priority *for this scenario specifically*. |
| **Counterargument handling** | Ignores opposing view. | Mentions it dismissively. | Acknowledges it. | Acknowledges + responds with reasoning. | Acknowledges + responds + concedes one premise honestly + maintains overall position. |
| **Stakeholder priority defensibility** | Prioritises one stakeholder without justification. | Prioritises with vague justification. | Prioritises with 1 principle. | Prioritises with ≥2 principles, including 1 that names tradeoff. | Prioritises with explicit coalition reasoning — *who must be at the table for this decision to hold*. |
| **Language precision** | A2/B1 — errors impede meaning at key moments. | B1 — controlled but vocabulary is generic. | B1+ — academic vocabulary used in 2–3 places. | B2 — academic vocabulary used in ≥5 places naturally. | B2+ — precise vocabulary + ≥2 conditional or hypothetical constructions used to model uncertainty ("if drawdown exceeds X, then Y"). |

---

# 6. CALIBRATION EXEMPLARS

Twelve anchor responses — three per rubric — used by the AI applier as few-shot anchors and by the submission appendix as transparency.

## 6.1 Rubric M2 exemplars

**Audience for these exemplars: Provincial Council.**

### Band 1 (78 words)

> The expansion is bad. Source B says it is dangerous and they are correct. We should not do it. The aquifer is dropping which is not good for the future. Source A is from a company so they want money. We recommend stopping. The council should listen to the university because they are smart. Bangkok also has water problems but Khon Kaen is different. The farmers will be upset. Please consider this carefully when making the decision about wells.

*Why Band 1:* register collapsed (chatty), conflict named only weakly, "Bangkok also has water problems" is geographically off-target, no academic vocabulary, dismisses Source A by motive alone.

### Band 3 (124 words)

> Source A and Source B disagree on the wellfield expansion. Source A says it is safe because the aquifer is large and the new wells will draw from a deeper layer. Source B argues that drawdown is already faster than recharge and adding wells will worsen this.
>
> Source B is more defensible. It cites Department of Groundwater Resources data from recent years and explains the methodology. Source A cites only the original 1977 permit study, which is now outdated.
>
> The council should weigh Source B more heavily, but should also ask DGR for the most recent provincial figures before deciding. Approving the wells without updated data would be premature, even if the legal mandate allows it.

*Why Band 3:* conflict clearly named, one defensible-side reasoning (recency), register approaches council, references DGR correctly, but only one criterion used to weigh, no use of "mandate" / "allocation" / "threshold," does not name Nam Phong or Khon Kaen districts.

### Band 5 (148 words)

> The council faces a conflict between two readings of the same aquifer. The Coalition brief (Source A) argues that the proposed expansion draws from a confined lower layer with no household impact, citing the 1977 permit framework as evidence of long-term safety. The GWRI working paper (Source B) reports measurable static-level decline across Nong Rua, Ban Phai, and Ubolratana districts between 2020 and 2025, and argues that hydrogeological separation between layers is partial, not absolute.
>
> Source B is more defensible on three grounds: it cites recent monitoring rather than a fifty-year-old permit; it discloses methodology; and it does not represent an interested party.
>
> We recommend the council suspend the expansion for an 18-month independent leakage assessment. The legal mandate to drill does not yet rest on a precautionary evidence base. The cost of delay is operational; the cost of error is intergenerational.

*Why Band 5:* both sources named with their specific claims, three weighing criteria (provenance, recency, COI), both ethical axes implied in the closing line, sub-district names used, academic vocabulary used naturally (*mandate, precautionary, intergenerational*), council register sustained.

## 6.2 Rubric M3 exemplars

**Strategy: B (Proceed with modification — drill but reduce expansion from 12 to 8 wells with published monitoring).**

### Band 1 (94 words)

> The province cares about everyone. We will drill the wells but also listen to the farmers. There will be a monitoring system. No one will be hurt. The water will keep running and the farmers will be happy. The press should know that we have a plan. We are working hard on this issue. Please be patient. We will hold a meeting soon. The wells are important for everyone. We thank the farmers for their concerns. The PWA will continue to provide water. There is no need to worry about the future.

*Why Band 1:* promises everything to everyone, no concrete cost named, no responsible party, "soon" is not a timeframe, over-polished for a 12-minute pressure window.

### Band 3 (108 words)

> PWA Khon Kaen acknowledges the concerns raised at Wellfield Four this afternoon. After review, the briefing team recommends reducing the expansion from twelve to eight deep wells and publishing quarterly drawdown data from all affected districts beginning April 2026.
>
> This is a partial response. It does not pause the project, which means farmers in Nong Rua and Ban Phai will continue to see pressure on shallow wells in the short term. It does commit the province to transparency the previous permit cycle did not require.
>
> A public consultation will be scheduled within 21 days. Drilling does not begin until that consultation closes.

*Why Band 3:* stakeholders named (PWA + farmers + districts), one cost honestly named, concrete next step with timeframe, but no responsible party named for the consultation, "partial response" framing is solid but emotional pressure on press audience could be better judged.

### Band 5 (118 words)

> PWA Khon Kaen and the briefing team have reviewed today's events at Wellfield Four. The expansion will be reduced from twelve to eight wells. Quarterly drawdown data from Nong Rua, Ban Phai, and Ubolratana districts will be published on the PWA Khon Kaen portal beginning April 2026.
>
> We are not promising that household shallow wells will be unaffected. They will continue to be drawn down in the short term, and we owe Nong Rua District a direct accounting of what we know.
>
> A public consultation, co-chaired by the PWA Operations Manager and the District Health Office, will be convened within 14 days. Drilling does not resume until the consultation has closed and its findings are published.

*Why Band 5:* both costs named honestly, two responsible parties named, accountability mechanism (published findings) included, addresses the press audience (will not promise no harm), council-appropriate register held under pressure.

## 6.3 Rubric M4 exemplars

**Stakeholder being steel-manned: PWA Operations Manager. Student team disagreed with her position and is now arguing it back charitably.**

### Band 1 (transcript excerpt, ~45 s)

> "Um, so basically she wants the wells because, you know, she has to do her job. The PWA people just want to follow the rules. She doesn't really care about the farmers because that's not her department. Her main thing is just keeping the taps running because if they don't run then people will complain about her. So her argument is just like, we have to do this or I'll get fired."

*Why Band 1:* caricature (motive imputation), no register shift, no dossier evidence, transcript stalls, no closing line.

### Band 3 (transcript excerpt, ~58 s)

> "If I were the PWA Operations Manager, I would say this. My job is to keep two hundred thousand people from running out of water. In the last three dry seasons, the reservoir reached zero. Each time we used the wellfield more to keep the taps running.
>
> If I delay this expansion and the next dry season is severe, the cost will be paid by city residents whose taps stop. The university paper recommends an 18-month delay. That is a long time when the next dry season starts in four months.
>
> So my position is: drill now, monitor honestly, adjust if the monitoring shows harm."

*Why Band 3:* recognizable register shift, dossier references woven in (200,000 residents, three drought years, 18-month delay), coherent argument, but no use of "statutory mandate" / "residual margin" (PWA's actual vocabulary), and no acknowledgement of her hidden interest (budget timing).

### Band 5 (transcript excerpt, ~62 s)

> "Speaking as the PWA Operations Manager. Our statutory mandate is continuous potable water to roughly two hundred thousand residents. In each of the last three dry seasons we came within days of supply interruption. The twelve-well expansion is sized for a residual margin against a one-in-fifty-year dry season — that is the standard our hydrogeologists used.
>
> I have read the GWRI paper. They are right that vertical leakage between layers is partial, not absolute. I will commit publicly to additional monitoring. But an 18-month delay is not just an operational risk. It also pushes my branch's expansion budget into next fiscal year, where it may be reallocated. I have to be honest about that.
>
> So my recommendation: proceed, monitor, and report quarterly. If the monitoring shows leakage, we cut volume."

*Why Band 5:* register shift in vocabulary (*statutory mandate, residual margin, one-in-fifty-year, quarterly*) AND syntax (institutional declaratives), dossier references woven in, **explicit acknowledgement of her hidden budget interest** — the M4 reveal layer engaged, closing line lands.

## 6.4 Rubric M5 exemplars

### Band 1 (208 words)

> Our team thinks the wells should be approved because the city needs water. The farmers are also important but the city has more people. The university says there is a risk but the company says there is no risk. We choose the company because business is important for the economy. The 1977 law allows the wells so it is legal. The farmers have other options like buying water. The community health volunteer's concerns are sad but the doctors can help with diarrhoea. In the future the aquifer might be a problem but for now we need water. The PWA has a mandate so they should be allowed to do their job. The bottled water plant should also be allowed because they have permits. Everyone should work together. We respect all stakeholders but the decision must be made for the city. Saline intrusion is a future problem and we will deal with it then. The new generation can find new technology. The provincial council should approve the expansion now and study the long-term effects later. Pause options are too risky for the residents. Eight wells is a compromise but twelve is better for safety margin. We recommend approval of all twelve wells.

*Why Band 1:* axes not named, "future generation can find new technology" handwaves intergenerational equity, picks side by counting heads, dismisses health concerns, no concession, no coalition reasoning, no conditional language.

### Band 3 (244 words)

> Our team recommends approving an expansion of eight wells, not the full twelve, with a precautionary review at twelve months. This decision sits between two ethical concerns: distributive justice — who pays the cost of supply security — and intergenerational equity — what we leave to the next generation.
>
> The PWA's mandate is real. Two hundred thousand residents need reliable water. Past drought years show how close the system has come to interruption. We accept the operational case for some expansion now.
>
> However, the GWRI paper and the community health volunteer's observations together suggest the upper aquifer is already under stress. Eight wells, paired with quarterly monitoring published openly, gives the council a position it can defend.
>
> We acknowledge the opposing position from the food-processing facility: a precautionary review framework could destabilize their permit renewal in 2027. This is a real concern. Our recommendation does not retroactively cancel permits; it adds a transparent monitoring layer that applies to all extractors equally.
>
> If drawdown rates after twelve months exceed historical fluctuation in two of three monitored districts, the council should pause further expansion. If they remain within historical range, the remaining four wells may be approved.
>
> The decision binds a generation not in this room. Eight wells with a conditional pathway is the most honest answer we can give them.

*Why Band 3:* both axes named, counterargument acknowledged and engaged, stakeholder priority defensible, conditional language used, but only one concession (the permit-renewal concern), and coalition reasoning is implied rather than explicit.

### Band 5 (276 words)

> Our team recommends an eight-well expansion with a binding twelve-month monitoring review, co-governed by PWA Khon Kaen, the Department of Groundwater Resources, and the Khon Kaen University Groundwater Research Institute (GWRI). This position sits at the intersection of distributive justice and intergenerational equity, and for this scenario we judge intergenerational equity to take priority — narrowly, and with the following reasoning.
>
> Distributive justice today is between identifiable groups: city residents, shallow-well households, permit-holding industry, vulnerable rural elders and children. We can imagine a settlement that gives each group some of what they need. Intergenerational equity is different. The next generation has no representative in this room and no leverage in this decision. If the threshold for self-sustaining saline intrusion lies within currently observed drawdown — as the GWRI paper argues is possible — then today's settlement forecloses tomorrow's options.
>
> We acknowledge two things we did not initially accept. First, the PWA Operations Manager's branch budget is tied to delivery schedule; an 18-month full delay imposes a real institutional cost. Eight wells with a 12-month review respects this. Second, the food-processing facility's good-faith argument about retroactive permit review is legitimate; our recommendation does not cancel any permit, but it does establish a monitoring framework that applies to all extractors prospectively.
>
> The coalition required for this position to hold is: PWA (operations), DGR (regulatory), KKU (independent monitoring), and the District Health Office (downstream signal). If any of these four is absent, the position collapses. We name that openly. The council should approve the eight-well pathway only if the coalition can be assembled.

*Why Band 5:* both axes named, weighed, one prioritized *with scenario-specific reasoning*; two concessions made honestly; coalition explicitly named and named as load-bearing; conditional language ("if any of these four is absent, the position collapses"); academic vocabulary precise; intergenerational equity argument grounded, not hand-waved.

---

# 7. SCENARIO-SPECIFIC QUIZ BANK

Diegetic, adaptive, confidence-rated. Six items for M1 (foundational fact check + source provenance) and three for M2 (comprehension gate before the writing task unlocks). All items are scenario-specific — they rest on facts in *this* dossier.

## 7.1 Token-payoff matrix (used by all items)

```
Correct + High confidence:    +3 tokens
Correct + Medium confidence:  +2 tokens
Correct + Low confidence:     +1 token
Wrong + Low confidence:        0 tokens
Wrong + Medium confidence:    -1 token
Wrong + High confidence:      -2 tokens
```

Calibration: confidently-wrong is penalised more than uncertain-wrong. Honest uncertainty is rewarded.

## 7.2 Adaptive next-item logic (used by all items)

```
Correct + High  → next item one band harder (CEFR or cognitive demand)
Correct + Med   → next item same level
Correct + Low   → next item same level, different domain
Wrong + High    → scaffold shown (relevant dossier paragraph re-displayed
                  + clarifying note), then parallel item
Wrong + Med/Low → scaffold shown, then parallel item
```

## 7.3 M1 Items (administered in this order, with branching)

### Q1 (M1) — Foundational fact identification (easy)

```
DIEGETIC FRAME:
[Field Mentor → Team] "Before we brief the council, let's confirm
what we just heard. Three of these statements appear in your
dossier. One does not."

STEM:
Which statement is NOT supported by the dossier?

OPTIONS:
A) The Khorat Plateau aquifer is shared between Thailand and Laos.
B) The Ubolratana Reservoir has dropped to zero usable capacity
   in three separate dry seasons within the past decade.
C) The proposed twelve-well expansion will draw from a layer
   that has no hydrogeological connection to household wells.    ← correct
D) The Groundwater Act B.E. 2520 (1977) regulates well permits
   nationally.

CONFIDENCE: Low / Medium / High

PER-OPTION DIAGNOSTIC FEEDBACK:
A → "Supported. This is the dossier's opening anchor — the aquifer
     is a recognised transboundary system."
B → "Supported. The three drought years (2016, 2019, 2020) are
     cited explicitly in Part 1 of the dossier."
C → "Right answer. The dossier presents this as a CONTESTED claim.
     Source A asserts it; Source B disputes it on the grounds that
     vertical leakage between layers is partial, not absolute.
     Watch for this in Mission 2."
D → "Supported. The 1977 Act is named in Part 1 and is the legal
     basis for the council's mandate."

ADAPTIVE:
Correct + High → Q2 (harder source-provenance item)
Correct + Med/Low → Q2 (standard)
Wrong + any → scaffold (display Part 1 of dossier, highlight C
              claim region), then parallel item Q1b
```

### Q2 (M1) — Source provenance ranking (medium-hard)

```
DIEGETIC FRAME:
[Field Mentor → Team] "The council will want to know why they
should trust your brief. Rank these four sources from most
to least authoritative for the question: 'Is the proposed
wellfield expansion safe for the aquifer?'"

STEM:
Drag to rank (1 = most authoritative, 4 = least):

SOURCES:
○ Groundwater Research Institute (GWRI) working paper, KKU (peer-affiliated)
○ Department of Groundwater Resources monitoring report (2024)
○ Northeast Water Sustainability Coalition member brief (industry)
○ Provincial newspaper opinion column

EXPECTED RANKING:
1. KKU peer-affiliated paper      (independent + methodology stated)
2. DGR monitoring report           (official, regulatory authority)
3. Coalition member brief          (interested party, disclose COI)
4. Opinion column                  (single author, no methodology)

CONFIDENCE: Low / Medium / High

PARTIAL CREDIT:
Exact match:                          +8 tokens
Adjacent swap (1↔2):                  +5
Reversed 1&2 with bottom two intact:  +3
Industry or opinion at top:           -3 (the trap)

DIAGNOSTIC FEEDBACK (revealed after submission):
- "Peer-affiliated academic work is weighted above an official
   agency report in this scenario because: methodology is
   transparent, conflict-of-interest is structurally lower, and
   the agency's report relies in part on monitoring infrastructure
   designed under the same 1977 framework being assessed."
- "Industry briefs are not worthless — they often carry real
   technical insight — but conflict of interest must be disclosed
   and the brief weighted accordingly."
- "Opinion columns have rhetorical use; for evidentiary purposes
   they sit at the bottom."

POST-ITEM PROMPT (optional, logged, not auto-scored):
"In one sentence, why is peer review weighted above an official
agency report here?"

ADAPTIVE:
Exact + High → Q3 (M1 culminating item)
Adjacent or Med → Q3 standard
Trap or Wrong + High → scaffold + Q2b parallel
```

### Q3 (M1) — Stakeholder-interest matching (medium)

```
DIEGETIC FRAME:
[Field Mentor → Team] "You just heard four voices. Match each
to the concern they raised most strongly."

STEM (matching, drag-pair):

STAKEHOLDERS:                    CONCERNS:
Smallholder rice farmer    ↔    Shallow well running dry by March
PWA Operations Manager     ↔    Statutory mandate to maintain
                                 supply for ~200,000 residents
Plant Production Director  ↔    Predictable regulatory environment
                                 / permit predictability
Community Health Volunteer ↔    Diarrhoea in children + dehydration
                                 in elderly during shortages

CONFIDENCE: Low / Medium / High

PAYOFF:
4/4 correct + High:    +5 tokens
4/4 + Med/Low:         +3
3/4:                   +2
2/4 or fewer:           0 + scaffold (replay relevant audio)

AFTER-CORRECT POPUP:
"Each of these stakeholders also has a HIDDEN concern. You'll
discover those in Mission 4."

ADAPTIVE:
4/4 + High → Q4 (vocabulary in context — harder)
3/4 or below → Q4 with parallel scaffold
```

### Q4 (M1) — Vocabulary in context (medium)

```
DIEGETIC FRAME:
[Field Mentor → Team] "The council uses precise technical vocabulary.
Pick the word that completes this sentence the way a hydrogeologist
or policy officer would."

STEM:
"Once the aquifer is drawn down beyond a critical _______, brine
from deeper rock-salt zones can move upward and contaminate
freshwater supplies."

OPTIONS:
A) limit
B) threshold      ← correct
C) edge
D) gate

CONFIDENCE: Low / Medium / High

PER-OPTION FEEDBACK:
A → "'Limit' is close but generic. Policy and hydrogeology use
     'threshold' specifically because it implies a point beyond
     which behaviour changes qualitatively, not just quantitatively."
B → "Correct. 'Threshold' is the precise term — and it appears in
     Source B as a probability function, not a single line. This
     distinction matters in Mission 5."
C → "'Edge' is metaphorical, not technical."
D → "'Gate' is not used in hydrogeological context."

ADAPTIVE:
Correct + High → Q5 (the trap question)
Correct + Med/Low → Q5
Wrong → scaffold (display dossier Part 3 with 'threshold' highlighted),
        then parallel Q4b ("mandate," "allocation," or "residual")
```

### Q5 (M1) — Confidence trap (hard, deliberate)

```
DIEGETIC FRAME:
[Field Mentor → Team] "This one is harder than it looks. Read
carefully."

STEM:
Which of these is the strongest reason to weight Source B above
Source A in this dossier?

OPTIONS:
A) Source B is from a university and universities are usually
   more trustworthy.
B) Source A is shorter, which suggests it is less rigorous.
C) Source B cites recent monitoring data and discloses methodology;
   Source A cites a fifty-year-old permit framework and is published
   by an interested party.                              ← correct
D) Source B was published in January 2026 and Source A in
   February 2026, so Source B is more recent.

CONFIDENCE: Low / Medium / High

PER-OPTION FEEDBACK:
A → "Tempting but weak. Institutional reputation alone is an
     authority argument, not an evidence argument. A council will
     not be convinced by 'they are from a university.'"
B → "Wrong. Length and rigour are not the same. A short rigorous
     note can be more defensible than a long unrigorous one."
C → "Correct — and this is the answer you want to use in your
     Mission 2 brief. Three weighing criteria stacked: recency,
     methodology disclosure, conflict-of-interest."
D → "Wrong. Source A is actually more recent by one month. Source
     B's edge is methodological, not chronological."

THE TRAP:
This item flags students who pick A — confidence-in-authority — as
the easy answer. The token penalty for "wrong + high confidence" is
deliberately severe (-2) to teach calibration.

ADAPTIVE:
Correct + High → Q6 (capstone — open prompt feeding M2)
Wrong → scaffold + Q5b
```

### Q6 (M1) — Open prompt capstone (transition to M2)

```
DIEGETIC FRAME:
[Field Mentor → Team] "One last thing before you brief the
council. In one sentence, name the single most important
piece of evidence you would use to support your eventual
recommendation — whatever that recommendation turns out to be.
You will refer back to this in Mission 5."

STEM:
Open text input. 15-40 words.

EVALUATION:
This item is NOT auto-scored. It is logged and surfaced to the
team in Mission 5 as "your Mission 1 evidence commitment." If
the team's Mission 5 final statement does not reference the
evidence they named here, the AI cross-examiner is instructed
to ask: "In Mission 1 you named X as your most important
evidence. Where does it appear in your final position?"

This creates a longitudinal accountability thread across the
90-minute cycle. Teachers can also surface this on the dashboard
as a metacognition signal.

TOKEN PAYOFF:
+2 tokens for submission (any sincere response).
No penalty for any response.

ADAPTIVE:
End of M1 quiz bank. Transition to M2 mission shell.
```

## 7.4 M2 Items (comprehension gate before writing task unlocks)

### Q7 (M2) — Audience register identification

```
DIEGETIC FRAME:
[Field Mentor → Team] "You're about to write a brief for the
council. Before you do, let's make sure you've heard the
audience correctly."

STEM:
Your council brief should AVOID which of these openings?

OPTIONS:
A) "Hey council — quick take on the well situation..."
B) "The council faces a conflict between two readings of the
   same aquifer."
C) "Source A and Source B disagree about whether the proposed
   wellfield expansion is sustainable."
D) "Both A and B are wrong opinions about this issue."

CONFIDENCE: Low / Medium / High

DIAGNOSTIC FEEDBACK:
A → "Avoid this one. Council briefs do not open with informal
     greetings. This is text-message register applied to a formal
     setting — that's a register collapse you want to avoid."
B → "Acceptable opening — formal, sets up the conflict."
C → "Acceptable opening — direct, source-aware."
D → "Avoid for a different reason: it claims both sources are
     'wrong opinions,' which is intellectually weak and would
     undermine your credibility with the council. Both sources
     are arguments, not opinions."

THE TRAP:
Two distractors are 'avoid for different reasons.' Students who
catch only A miss the second register dimension (epistemological
hygiene, not just formality). The auto-scoring accepts only A.
But the diagnostic feedback teaches the second axis.

PAYOFF: standard token matrix.

ADAPTIVE:
Correct → Q8
Wrong → scaffold (show 3 sample council openings, highlight
        register markers), then parallel Q7b
```

### Q8 (M2) — Source-conflict criterion identification

```
DIEGETIC FRAME:
[Field Mentor → Team] "When you weigh two sources, you can use
four criteria: provenance, methodology, recency, and conflict-
of-interest. Apply them here."

STEM:
Which TWO of these criteria favour Source B (KKU) over Source A
(Coalition)? Select two.

OPTIONS:
A) Provenance (who produced it and under what incentives)
B) Methodology (is the basis of the claim disclosed?)
C) Recency (when was the underlying evidence collected?)
D) Length (how thorough is the document?)

CORRECT: A and B (both clearly favour B); C is mixed (Source A
is slightly newer by date, but Source B cites newer underlying
data — so accept any of A+B, A+C, or B+C as partial credit).
D is a distractor — length is not a weighing criterion.

CONFIDENCE: Low / Medium / High

PAYOFF:
A+B selected:    +5 tokens (best answer)
A+C or B+C:     +3 tokens (defensible partial)
Includes D:    +0 + diagnostic feedback
Other:         -1

DIAGNOSTIC FEEDBACK:
A → "Yes. Source A is published by an industry association whose
     members benefit from expansion. Disclose this when citing."
B → "Yes. Source B describes its monitoring methodology; Source A
     cites the 1977 permit framework but not the methodology
     behind the modelling it commissioned."
C → "Partial. Source B's *underlying data* is more recent (2020-
     2025 monitoring vs 1977 framework). The *document* dates
     are reversed by one month. Defensible to use C, but make
     the distinction clear."
D → "Length is not a weighing criterion. A short rigorous note
     beats a long unrigorous one."

ADAPTIVE:
A+B + High → Q9 (final gate — register pitch)
Other → scaffold (display Source A and Source B side-by-side
        with provenance lines highlighted), then parallel Q8b
```

### Q9 (M2) — Register pitch (audience-specific)

```
DIEGETIC FRAME:
[Field Mentor → Team] "Your assigned audience is [AUDIENCE
ASSIGNED]. Pick the most appropriate single sentence to include
in your brief."

[Variable: AI assigns one of three audiences before this item:
 council / farmers' cooperative / national news editor.]

STEM (audience = COUNCIL example):
Which sentence best fits a Provincial Council brief?

OPTIONS:
A) "The council should weigh Source B more heavily, but should
   also request DGR's most recent provincial figures before
   deciding."
B) "Honestly, the coalition is just trying to protect their
   profits, so don't listen to them."
C) "The wellfield will probably be fine, the farmers are
   probably overreacting."
D) "It is what it is."

CORRECT: A.

DIAGNOSTIC FEEDBACK:
A → "Right. Council register: hedged, criterion-based, points
     to next operational step (request DGR data)."
B → "Wrong register. Imputing motive ('protect their profits')
     is the kind of move a campaigner makes, not a briefer.
     Council members will discount your whole brief if you do this."
C → "Wrong register on two axes: hedging is too vague ('probably
     fine'), and 'overreacting' dismisses a stakeholder rather
     than engaging them."
D → "Wrong on every axis."

VARIANTS:
The audience-assignment variable changes the correct option's
register markers. The full audience bank: council (formal,
criterion-based), farmers' cooperative (plain, respectful, no
condescension), national news editor (concise, attribution-
heavy, no advocacy).

PAYOFF: standard matrix.

ADAPTIVE:
Correct → M2 writing task unlocks
Wrong → scaffold (display register conventions for assigned
        audience), then parallel Q9b, then M2 writing task unlocks
        regardless
```

## 7.5 Quiz bank design notes (for the implementer)

- **State persistence**: each item's correctness, confidence, and adaptive branch logged to RTDB under `teams/{tid}/sdg06-khonkaen/quiz/{itemId}`. Used for the Teacher Dashboard's confidence-calibration view.
- **Replay**: students may replay a single item only after a scaffold has been shown — never on a clean try. This protects the diagnostic signal.
- **Token cap per mission**: total quiz tokens M1 capped at +25 (sum of best-case scores). Prevents quiz-grinding.
- **Accessibility**: every item has keyboard navigation, screen-reader labels, no time pressure, and the diegetic frame is also available as plain text for cognitive-pace-mode students.
- **Confidence default**: leave unselected. Force the team to explicitly choose. If they submit without a confidence selection, default to Medium and log it.
- **No "skip"**: items are gates. Students who cannot answer must trigger a scaffold and try a parallel item.

---

# 8. BIBLIOGRAPHY

Real, citable sources. Used to ground the dossier and to populate the submission appendix.

## 8.1 Primary academic & policy sources

1. **Sumernet / SUMERNET 4 (SIDA-funded), 2023.** *Assessing decentralized groundwater governance performance in the lower Mekong region: the case of Khon Kaen province, Thailand.* Published in *Groundwater for Sustainable Development*, ScienceDirect. — The empirical spine of the scenario's central tension.
2. **Khon Kaen University, Faculty of Engineering / Groundwater Research Institute (gwri.kku.ac.th).** Multiple working papers and vulnerability assessments of Khorat Plateau aquifer, including SINTACS-based assessments for districts in Khon Kaen.
3. **Department of Groundwater Resources (DGR), Ministry of Natural Resources and Environment.** History and regulatory pages: dgr.go.th/en/about/391. Statutory authority for Groundwater Act B.E. 2520 (1977).
4. **Thailand Development Research Institute (TDRI).** Policy notes on Northeast water pricing and allocation.
5. **Provincial Waterworks Authority (PWA).** Public agency profile. Mandates and service-area definitions.
6. **Mekong River Commission (MRC).** *Agriculture and Irrigation in the Lower Mekong Basin.* Nong Wai irrigation system documentation.
7. **UNESCO IHP** transboundary-aquifer catalogue — Khorat Plateau Aquifer entry.

## 8.2 Journalistic sources (for currency, 2024–2026)

8. **Bangkok Post**, "Usable water down in Northeast dams" (2024).
9. **Thaiger**, "Ubolratana Dam usable water drops 11% amid insufficient wastewater plants" (2024).
10. **Pattaya Mail**, "Northeastern Thailand faces early drought, water reserves dwindle" (2024).
11. **Mekong Eye**, "Heatwave escalates water war in Thailand's north" (2024).
12. **Nature Scientific Reports**, "Evaluating the impacts of climate change and land-use change on future droughts in northeast Thailand" (2024).

## 8.3 Methodological references for scenario design

13. **WHO Thailand.** *Thailand's village health volunteers — unsung heroes.* Source for อสม. training hours, role, and surveillance practices.
14. **Hattie, J.** *Visible Learning* — formative-evaluation effect-size citation (rubric design rationale, §5).
15. **CEFR Companion Volume (Council of Europe, 2020)** — speaking-content vs speaking-form separation (audio-rubric design rationale, §3 + §5).

## 8.4 Note on citation discipline in student-facing text

Per CLAUDE.md §11, the **student-facing dossier and sources** name **institutions only** (KKU, DGR, TDRI, PWA, MRC). Specific authors, papers, and DOIs appear **only in this bibliography**, which goes into the submission appendix for judge review. This keeps the scenario authentic without forcing students to navigate citation apparatus inside the mission flow.

---

# 9. PRODUCTION CHECKLIST + OPEN VETTING QUESTIONS

## 9.1 What's been delivered in this master

- [x] Researcher's brief with vetted facts, flagged uncertainties, anti-pattern check
- [x] Full scenario text — setting, tension, dossier, conflicting source pair, 4 stakeholder statements, crisis script, tribunal frame, solution template
- [x] 6 ElevenLabs audio production prompts (voice profiles + scripts + QA)
- [x] 5 image production prompts (hero + cross-section + chart + map + 4 portraits)
- [x] 4 scenario-specific rubrics × 4 criteria × 5 bands
- [x] 12 calibration exemplars (3 per rubric)
- [x] 9 scenario-specific adaptive quiz items (6 M1 + 3 M2)
- [x] Bibliography

## 9.2 What you still own as production work

| Task | Owner | Tool | Time |
|---|---|---|---|
| Generate 6 audio assets | You / production assistant | ElevenLabs | ~2 hr |
| Generate 5 image assets (including 4 portrait runs) | You / production assistant | ChatGPT Image / Gemini / Midjourney | ~3 hr |
| Caption files (.vtt) for all 6 audio | You | Whisper / manual | ~1 hr |
| Thai translation of UI labels + vocab glosses + student-facing rubric | You | Native Thai writer | ~3 hr |
| End-to-end playtest with one student team | You | Live | ~3 hr |
| Sign-off from named Thai pedagogy reviewer | You | Email/meeting | ~1 hr |
| **Total production time after this master** | — | — | **~13 hr** |

## 9.3 Open vetting questions — please respond before production begins

1. **Number 12.** I fictionalised "12 new deep wells" for narrative tractability. Are you comfortable with that, or do you want me to remove the specific number and use "several additional deep wells"? Trade-off: specificity reads more real but requires the §1.5 disclosure in the manifest.
2. **Industry stakeholder identity.** Stakeholder 3 is a "food-processing facility Production Director." Food-processing facilitys in NE Thailand are real but a few specific companies dominate. Comfortable keeping it generic? Or shift to "food-processing facility" to reduce any chance of being read as targeting a real company?
3. **Source B authorship.** Source B says "Khon Kaen University, Faculty of Engineering, Groundwater Research Group." Want me to cite the actual **Groundwater Research Institute (GWRI)** by name? It exists at gwri.kku.ac.th and is the more accurate institutional citation. My recommendation: yes, cite GWRI by name. Slight tweak needed.
4. **Audio voice production.** Six voices ranges from ~$5 to ~$40 in ElevenLabs depending on subscription + cloning vs library. Do you want all six voices from the library (cheaper, less authentic) or do you want stakeholder 1 + stakeholder 4 cloned from real Thai voices (more expensive, more authentic)?
5. **Sub-district choice.** I used **Nong Rua District** as the smallholder farmer's sub-district because KKU has published vulnerability work there (SINTACS). Are you comfortable with the geographical specificity? Or do you want a fictional "rural sub-district of Khon Kaen" for safety?
6. **Quiz Q5 trap severity.** The Q5 "confidence trap" item deliberately penalises confidently-wrong answers with -2 tokens. This is the highest single-item penalty in the bank. Are you comfortable with that severity, or do you want it softened to -1?
7. **M5 Tribunal length.** Final statement is 200–300 words. Is that the right length for a tribunal close in your eyes? Some platforms go shorter (120 words) to force precision; others go longer (400 words) for argumentation depth. 200–300 is my pedagogical middle.
8. **Pronunciation track.** I noted that ElevenLabs handles pronunciation assessment separately (per your earlier proposal). Confirm: do you want me to draft the pronunciation-track rubric (CEFR speaking-form) as a separate document, or fold it into Rubric M4/M5? Recommend: separate document, because it applies to all 17 scenarios identically.

## 9.4 Once you sign off

The shape of the next two-week production sprint, in order:

1. **Day 1–2** — Address vetting questions 1–8; revise this master accordingly.
2. **Day 3** — Generate 6 audio assets in ElevenLabs against the prompts. QA each.
3. **Day 4** — Generate 5 image assets. QA. Re-run any that fail style brief.
4. **Day 5** — Caption files + Thai translation pass.
5. **Day 6** — Implement quiz bank in code (RTDB schema + UI components).
6. **Day 7** — Playtest with one student team. Capture issues.
7. **Day 8–9** — Revise based on playtest. Final QA.
8. **Day 10** — Ship as Scenario 1 of the 5-scenario showcase tier. Begin Scenario 2 spec.

---

*End of Production Master v1 — `sdg06-khonkaen-aquifer-v1`*

*Authored by Aj. Yungie (Dr. Payungsak Kaenchan) with [Reviewer Name, TBD] as Rubric Reviewer.*

*Last updated: 2026-05-13.*

---

# APPENDIX — VETTING DECISIONS LOCKED (v1.1, 2026-05-13)

The following decisions have been confirmed and applied to this production master. Future scenarios in the showcase tier inherit the same conventions.

| # | Decision | Applied as |
|---|---|---|
| Q1 | Keep "12 wells" with disclosure | Number retained throughout; flagged in §1.5 as narrative figure, not verified |
| Q2 | Industry stakeholder = food-processing facility | "Bottled-water plant" replaced throughout with "food-processing facility"; dossier and Source A updated to reference food and beverage manufacturers generally |
| Q3 | Cite GWRI by name | Source B publisher now "Khon Kaen University Groundwater Research Institute (GWRI)"; institutional landscape (§1.2) already names GWRI correctly |
| Q4 | Library voices + clone Stakeholder 1 & 4 | Production note added to §3 audio kit; library voices for Stakeholder 2, 3, crisis dispatch, tribunal opening; cloned Thai voices for farmer (S1) and อสม. (S4) |
| Q5 | Keep Nong Rua District | No change — already specified |
| Q6 | Keep Q5 trap at −2 token penalty | No change — already specified |
| Q7 | M5 statement 200–300 words | No change — already specified |
| Q8 | Pronunciation rubric = separate document | To be drafted at `/docs/rubrics/pronunciation-track.md`; applies identically to all 17 scenarios |

## Production-note inserts

### §3 (Audio kit) — voice production tier

Per Q4: cloning budget concentrated on the two voices judges will hear most closely (the vulnerable-stakeholder voices). Production order:

1. **Stakeholder 1 (smallholder farmer)** — clone from a Thai male speaker, 60+, reading English news at calm pace. Highest authenticity priority.
2. **Stakeholder 4 (อสม. health volunteer)** — clone from a Thai female speaker, 50s, reading community-health bulletin material.
3. **Stakeholder 2, Stakeholder 3, Crisis Dispatch, Tribunal Opening** — library voices, selected per the profile specs in §3.2–§3.6.

### §1.5 (Flagged uncertainties) — explicit "12 wells" disclosure

The number "twelve new deep wells" is a pedagogical narrative choice for tractability. The actual number of wells the Khon Kaen province may add in any given dry season is not publicly disclosed to a specific figure. The scenario manifest (`manifest.json`) records this as `narrativeFigures: { newWells: 12, status: "illustrative" }`. Student-facing materials do not foreground this disclosure (it would break immersion); the submission appendix and teacher dashboard surface it explicitly.

