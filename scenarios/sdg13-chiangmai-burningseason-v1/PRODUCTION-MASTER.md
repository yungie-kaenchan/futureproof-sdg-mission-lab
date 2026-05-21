# PRODUCTION MASTER — "The Burning Season"

> **Mission 02 of 06 · SDG 13 — Climate Action · North / Chiang Mai · CEFR B1+/B2**
>
> This master is the authoring spec for the runtime mission already
> shipped in `src/scenarios/sdg13-chiangmai-content.js`,
> `sdg13-chiangmai-quiz.js`, `sdg13-chiangmai-m1.js`. It mirrors the
> 5-section structure of the other four "remaining" SDG masters
> (Bangkok, Andaman, Mae Sot, EEC fringe) so the platform's design
> documentation reads identically across all six missions.

## TABLE OF CONTENTS

- §1 RESEARCHER'S BRIEF
- §2 SCENARIO TEXT
- §3 ADAPTIVE & ASSESSMENT NOTES
- §4 ASSET MANIFEST
- §5 PRODUCTION CHECKLIST + OPEN VETTING QUESTIONS

---

# 1. RESEARCHER'S BRIEF

## 1.1 Geography & meteorology

The mission is set in the **Upper Ping basin** — the Chiang Mai valley
with **Mae Hong Son** and the uplands of **Mae Chaem, Omkoi, Doi Saket,
Samoeng, and Chom Thong** ringing it. The Ping flows south through the
city before joining the Wang, Yom and Nan to form the Chao Phraya. The
basin is **topographically closed at the eastern, western and southern
rims** by the foothills of the Khun Tan and Thanon Thong Chai ranges
(1,200–2,500 m).

From **mid-February through late April** the regional synoptic pattern
favours **persistent low-level temperature inversions**: a layer of warm
air slides over the cooler valley floor and acts as a lid. Vertical
mixing is suppressed, so combustion aerosols accumulate over multiple
days until the southwest monsoon arrives in May. During this window,
AQI readings in Chiang Mai municipality routinely exceed 200 μg/m³
PM2.5 — among the worst sustained levels recorded anywhere on the
planet.

## 1.2 Institutional landscape (REAL bodies — context only)

| Body | Mandate / role in this scenario |
|---|---|
| **Pollution Control Department (PCD)** under MNRE | National air-quality standards; PM2.5 monitoring; haze-season alerts |
| **GISTDA** (Geo-Informatics & Space Technology Agency) | Satellite hotspot + burn-scar detection (MODIS / VIIRS feeds) |
| **Royal Forest Department (RFD)** | Forest-fire control; burning permits / prohibitions on forest land |
| **Provincial Haze Task Force** (Chiang Mai) | District enforcement, civic coordination, fine collection |
| **MOPH** (Ministry of Public Health) | Respiratory-morbidity surveillance, hospital admissions data |
| **Chiang Mai University** (environmental & public-health programmes) | Independent academic monitoring + compliance research |
| **ASEAN Agreement on Transboundary Haze Pollution** | Regional framework — limited enforceability |

All bodies above are real and accurately scoped. None are positioned as
endorsing or opposing any particular outcome — they are present so the
student can ask *"who actually has standing to do what?"* during the
PROBE stage.

## 1.3 The empirical spine of the tension

Four facts the mission rests on (each verifiable from PCD, GISTDA, MOPH,
or the Chiang Mai University environmental-health literature):

1. **Source apportionment.** The seasonal aerosol load is **roughly
   equal parts** (i) crop-residue / forest fire across Northern Thai
   uplands and (ii) **transboundary smoke** drifting in from outside
   Thai borders. Independent monitoring repeatedly puts the
   transboundary share between **30 % and 55 %** by season.
2. **Domestic ignition profile.** The Thai share is overwhelmingly
   attributable to **upland smallholders** burning crop residue —
   primarily feed maize stover — to clear fields ahead of a tight,
   **buyer-set replanting window** (10–14 days post-harvest in many
   contracts).
3. **Mechanised alternatives exist but are unaffordable.** Stalk
   shredders / incorporators run **฿1.2 – ฿2.0 million** per unit;
   smallholder net seasonal income from a 5–10 rai contract is
   typically a few tens of thousands of baht. Rental capacity is
   **structurally inadequate** during the narrow turnaround window.
4. **Public-health signal is consistent.** Chiang Mai hospitals report
   a recurring seasonal escalation in respiratory presentations —
   paediatric, geriatric, asthmatic cohorts disproportionately. The
   PM2.5 ↔ admissions association is robust and replicated across
   multiple seasons.

These four facts produce the **canonical trade-off**: the public-health
case for prohibition is real; the prohibition's instrument falls
hardest on the people with the **least latitude to comply**.

## 1.4 Anti-pattern check

- **Not a "burning vs. not burning" debate.** It is a
  *burning-WITHOUT-alternative* vs. *enforcement-WITHOUT-justice*
  debate. Both flat positions fail under cross-examination.
- **Not a savior-pitch.** Students must NOT propose "I will educate the
  farmers" or "I will donate machines." The agronomic calendar,
  financing, and market-power asymmetry are the constraints to engage
  with.
- **Not nationalistic.** The transboundary fact must be presented as
  **physical**, not political. The mission is not anti-Burma, anti-Lao,
  or anti-anyone — it is anti-displacement-of-burden.
- **Not anti-rural.** The smallholder is not stupid for burning. The
  buyer's contract and the absent rental fleet make burning the
  **rational least-cost choice** at the smallholder margin.

## 1.5 Flagged uncertainties — use ranges, never invent

Use clearly-labelled illustrative ranges. The runtime AI Judge prompt
explicitly **rewards range-based hedging** and **penalises invented
precision**.

| Quantity | Range to use | Rationale |
|---|---|---|
| Transboundary share of seasonal PM2.5 in Chiang Mai | **30 – 55 %** | Multiple peer-reviewed monitoring studies disagree on the precise share. |
| Mechanised shredder/incorporator capital cost | **฿1.2 – ฿2.0 M** | Market quotes vary by capacity and brand. |
| Seasonal admissions escalation (PM2.5-attributable) | **+15 % to +40 %** above baseline weeks | Site-, age- and year-dependent. |
| Smallholders directly affected (Chiang Mai uplands) | **tens of thousands** of households | No single official register; deliberately qualitative. |

## 1.6 Cultural-authenticity guard

- **The northern voice is not the central Thai voice.** Stakeholder 01
  (Mae Chaem maize grower) speaks in northern Thai cadence in the audio
  source; captions render in standard English; the Thai metalanguage
  uses **คำเหนือ** register sparingly and never as caricature.
- **Khon mueang sensitivity.** The northern (Lanna) urban identity that
  experiences the haze is not interchangeable with Bangkok-centric
  *"city vs. countryside"* framing. The clinician (stakeholder 02) is
  positioned in Chiang Mai, not Bangkok.
- **The enforcement officer is sympathetic.** The mission is not
  anti-enforcement — it is anti-enforcement-without-provision.
  Stakeholder 04 exists to make that distinction non-tribal.
- **No identifiable faces in portraits.** All stakeholder visuals use
  three-quarter / shadowed / implied poses (consistent with the
  dignity guard across all six missions).

---

# 2. SCENARIO TEXT

## 2.1 Title

- **EN** · The Burning Season
- **TH** · ฤดูแห่งการเผา

## 2.2 Setting (28 words)

> Each year from February to April, a grey haze settles over Chiang
> Mai. Much of it is smoke from crop-residue and forest burning across
> the northern uplands and from across the border. The city's air
> quality becomes among the worst in the world.

## 2.3 Core tension (38 words)

> A hard zero-burning order with satellite-hotspot fines would cut the
> smoke that sickens hundreds of thousands of city residents — but it
> criminalises upland farmers who burn because no funded alternative
> exists and the maize-contract economy demands a fast field
> turnaround.

## 2.4 Decision point (DECIDE stage)

> Should the province enforce a province-wide zero-burning order this
> dry season, backed by satellite-hotspot fines, **before** a funded
> residue-management alternative is in place for upland smallholders?

## 2.5 Ethical axes (controlled vocabulary)

1. **Public health vs. rural livelihood** — the binary the mission
   opens with, and the binary the mission deliberately complicates.
2. **Procedural justice** — does enforcement without provision retain
   the legitimacy a public-health rule depends on?

A third axis — *intergenerational climate harm vs. immediate compliance
cost* — is held in reserve for the Final Task / Voice for Change
capstone, where the student transfers the SDG-13 reasoning to a wider
frame.

## 2.6 Dossier — BRIEF stage reading, authored at ALL THREE TIERS

Every dossier part exists in **three tiered registers** (T1 = A2–B1,
T2 = B1+–B2 baseline, T3 = B2+–C1). The tiered versions carry the
**same facts, stakeholders, numbers, and decision** — they differ only
in lexical density, sentence length, and clause embedding. The runtime
selects a tier based on the learner's diagnostic.

T2 is the canonical reference register; the full T1 and T3 variants
live in `src/scenarios/sdg13-chiangmai-content.js` →
`DOSSIER[N].body.{1,3}`.

### Part 1 — Why the air turns grey *(≈ 200 words at T2)*

> Each year, from February to April, a grey haze settles over Chiang
> Mai. People here call it the burning season. Most of the smoke comes
> from crop-**residue** and forest fires across the northern uplands;
> a significant share also drifts in from across the border.
>
> The fine dust in that smoke is **PM2.5** — **particulate** matter
> small enough to pass deep into the lungs and into the bloodstream.
> For several weeks each year, Chiang Mai records some of the worst
> air quality measurements on the planet.
>
> The terrain makes it worse. Cool, polluted air pools in the Ping
> valley, and a warmer layer above it acts as a lid — a temperature
> **inversion**. The smoke has nowhere to go, so concentrations climb
> day after day until the rains arrive.
>
> The province has approved a plan: a zero-burning order for the whole
> season. Satellite imagery will locate every active fire — every
> **hotspot** — and those responsible can be fined. The plan is legal.
> Whether it is just is a different question — and the answer depends
> on whose situation you weigh first.

### Part 2 — Who lights the fires, and why *(≈ 195 words at T2)*

Establishes: (i) the **smallholder-as-contract-bound** profile;
(ii) the agribusiness procurement timetable; (iii) the **capital cost**
of mechanised alternatives; (iv) the **clinical signal** in the city
hospitals. Closes with: *"Two true things therefore sit in tension. The
smoke makes city residents ill. The burning is how upland families stay
solvent."*

### Part 3 — Why a ban alone may not fix it *(≈ 220 words at T2)*

Establishes the **three structural complications**:

1. **Transboundary share** — a domestic ban cannot reach it.
2. **Behavioural displacement** — enforcement without provision pushes
   burning to the night, where it is harder to supervise.
3. **Procedural fairness** — rules perceived as unjust receive lower
   compliance (Chiang Mai University compliance research).

Closes with: *"Genuine mitigation, then, requires more than a
prohibition. It requires an affordable substitute for burning and the
farmers' acceptance of it — otherwise the rule displaces the smoke
rather than removing it."*

### Part 4 — The decision before you *(≈ 130 words at T2)*

Frames the **provincial haze committee briefing** the team must give.
Two facts non-negotiable: (a) the order is **legally available**;
(b) no funded alternative exists *this season*. Closes with: *"The
committee will not accept 'it depends.' It needs a defensible position
— and reasoning that survives when other stakeholders push back."*

### Vocabulary kit (foregrounded in `<vocab>…</vocab>` tags)

| Term | POS | EN gloss | TH |
|---|---|---|---|
| particulate | n. | tiny solid particles floating in the air | ฝุ่นละออง |
| PM2.5 | n. | particles < 2.5 microns — small enough to enter the lungs and blood | ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน |
| residue | n. | the matter left behind after something is used or removed | เศษวัสดุที่เหลือ |
| hotspot | n. | a point of intense activity that a system flags — here, an active fire seen by satellite | จุดความร้อน / จุดเผา |
| transboundary | adj. | crossing a national border | ข้ามพรมแดน |
| mitigation | n. | action taken to reduce the severity of a problem | การลดทอน / การบรรเทา |
| enforcement | n. | the act of making people obey a rule, usually with penalties | การบังคับใช้กฎหมาย |
| subsistence | n. | producing only just enough to survive, with little to spare or sell | การยังชีพ / พอกินพอใช้ |
| inversion | n. | a layer of warm air sitting over cooler air that traps pollution below it | ชั้นอากาศแบบผกผันที่กักมลพิษ |

Full glosses with example sentences live in
`src/scenarios/sdg13-chiangmai-content.js` → `VOCABULARY`.

## 2.7 Conflicting source pair — PROBE stage

This mission's PROBE source-weighting exercise is delivered through the
runtime quiz item **Q2 (rank · medium)** in
`src/scenarios/sdg13-chiangmai-quiz.js`. The student ranks four sources
from most → least authoritative for the question *"Will a zero-burning
order, alone, meaningfully cut Chiang Mai's seasonal PM2.5?"*:

| Rank | Source | Why this rank |
|---:|---|---|
| 1 | **Chiang Mai University air-quality & compliance study** (peer-reviewed) | Methodology disclosed; causal reasoning; independent of interested parties. |
| 2 | **GISTDA satellite hotspot + PCD monitoring** | Strong observational evidence — answers *where/when* but not *will-it-work*. |
| 3 | **Maize-industry association position paper** (interested party) | Real data but conflict of interest must be disclosed and weighted. |
| 4 | **Viral social-media post blaming a single province** | No verifiable provenance; not evidence. |

**Trap (−3 tokens):** placing the industry paper or the social-media
post at #1. The trap is *interested-party authority* and *virality*
masquerading as evidence.

## 2.8 Stakeholder 1 — Upland maize smallholder, Mae Chaem *(108 words spoken)*

- **Role · TH:** เกษตรกรปลูกข้าวโพดบนพื้นที่สูง
- **Flags:** vulnerable, male · **Accent token:** ochre
- **Duration target:** 33 s (subtitle burn-in on the video)

> I know the smoke is bad. My own children cough too — we breathe it up
> here first, before it ever reaches the city. But the buyer sets the
> date. The field must be clear and planted again within days, or I
> lose the contract, and the contract is the only cash my family sees
> all year. A machine to bury the stalks costs more than I earn in two
> seasons. There is none to rent near my village when I need it. If
> you fine me, I will still have to clear the field. I will just do it
> at night, where the satellite cannot see. Give me a real choice and
> I will take it. A fine is not a choice.

**Primary concern (Q3 match):** *No funded alternative — a fine without
a choice forces night burning.*
*"ไม่มีทางเลือกที่รัฐสนับสนุน การปรับโดยไม่มีทางเลือกผลักให้ต้องเผากลางคืน"*

## 2.9 Stakeholder 2 — Respiratory clinician, Chiang Mai public hospital *(112 words spoken)*

- **Role · TH:** แพทย์ระบบทางเดินหายใจ โรงพยาบาลรัฐ
- **Flags:** institutional, female · **Accent token:** steel
- **Duration target:** 32 s

> Every burning season I see the same ward fill up. Children on
> nebulisers, elderly patients whose oxygen saturation falls for weeks,
> asthma cases that should be stable and are not. PM2.5 at the levels
> we record here is not a discomfort — it is a measurable rise in
> admissions and, in the most fragile patients, in deaths. I am not
> asking the committee to ignore the farmers. I am asking them to
> count the children in my ward as stakeholders too. Every season we
> delay a real solution, we pay for it in lung function that does not
> fully come back.

**Primary concern (Q3 match):** *Measurable seasonal rise in admissions
and deaths among fragile patients.*

## 2.10 Stakeholder 3 — Agribusiness maize-procurement manager *(104 words spoken)*

- **Role · TH:** ผู้จัดการฝ่ายจัดซื้อข้าวโพด บริษัทเกษตรอุตสาหกรรม
- **Flags:** private, male · **Accent token:** bronze
- **Duration target:** 30 s

> Our contracts specify volume and delivery windows because the feed
> mills downstream run on a schedule we do not control. We do not
> instruct any grower to burn — that is their field decision. We are
> open to a certified no-burn supply line and we have piloted one. But
> a certified line needs a price premium the market has not yet
> agreed, and it needs the province to fund the machinery gap, not the
> buyer alone. We will move when the incentives move. We are not the
> regulator and we cannot subsidise the whole basin by ourselves.

**Primary concern (Q3 match):** *Will shift only when price premium +
public machinery funding align.*

## 2.11 Stakeholder 4 — District enforcement officer, haze task force *(114 words spoken)*

- **Role · TH:** เจ้าหน้าที่บังคับใช้กฎหมายระดับอำเภอ ชุดเฉพาะกิจหมอกควัน
- **Flags:** institutional, female · **Accent token:** sage
- **Duration target:** 34 s

> I am the one who has to knock on the door after the satellite flags
> a hotspot. I will be honest with the committee: a blanket ban with
> fines and nothing else makes my job harder, not easier. People stop
> talking to us. Fires move to the night. Last season we wrote
> penalties we could not collect from families who had nothing to pay
> with — and we lost the cooperation we had spent years building.
> Enforcement works when it is the last step after a real alternative,
> not the first step instead of one. Give me a ban with a funded
> option behind it and I can make it hold. Give me a ban alone and I
> am managing a game of hide-and-seek in the dark.

**Primary concern (Q3 match):** *Fines-first enforcement destroys
community cooperation and drives night burning.*

> **Authoring note.** Officer-04 and Grower-01 voice **the same failure
> from two sides** — this convergence is intentional. The Q3 match
> `afterCorrect` line surfaces it so the student carries it into the
> ACT-stage brief.

## 2.12 DECIDE — decision frame

A four-round committee briefing pattern (same shape as Khon Kaen
§2.13). The student team takes one of three defensible positions on
the §2.4 decision; the AI applier presses with the strongest
counter-objection from a different stakeholder; the team may concede
one point per round (concession bonus); the round closes when the
team's position survives or is materially revised.

The runtime currently delivers this through quiz item Q5 (confidence
trap) and Q6 (open evidence-commitment) followed by the DECIDE-stage
adaptive register artefact in
`src/scenarios/sdg13-chiangmai-m1.js`.

## 2.13 DEBRIEF — reflection prompt + Keystone

**Reflection prompt (30-second voice or 50-word text):**

> Looking back at your committee briefing — what is the single
> structural reason your position would survive an industry-association
> counter-paper that *did* disclose its methodology honestly? Name it
> in one sentence.

**SDG-13 Keystone awarded when** the composite stage score reaches
**60 %** (engine.passThreshold) **OR** net quiz tokens ≥
**PASS_THRESHOLD_TOKENS = 8** in the v1 quiz arc. Idempotent and binary
(`users/{uid}/keystones/sdg13-chiangmai-haze-v1`).

---

# 3. ADAPTIVE & ASSESSMENT NOTES

## 3.1 The 3-tier mapping (explicit)

Reading tier is **static-on-entry** (D2 in the Reconstruction Master
§5) — set once from the diagnostic, not adapted within a mission.
Per-part dossier text exists at:

| Tier | CEFR band | Lexical density · sentence-length cue |
|---|---|---|
| **T1** | A2 – B1 | 9–13 words per sentence; minimal subordination; high-frequency vocab. |
| **T2** | B1+ – B2 *(canonical)* | 18–25 wps; one nested clause; topic-vocabulary with `<vocab>` glosses. |
| **T3** | B2+ – C1 | 28–40 wps; multi-clause periods; abstract / discipline register. |

All three carry **identical facts, stakeholders, numbers, and the
decision** — only register varies. Audio is **not** tiered (authentic
input; the `.vtt` caption is the scaffold).

## 3.2 Gloss-density rule

Vocabulary text is constant across tiers; **density of glosses shown**
varies by `adaptive.glossDensity(tier)`:

| Tier | Glosses surfaced |
|---|---|
| T1 | all `<vocab>` tags expanded |
| T2 | tags expanded on hover/tap only |
| T3 | tags hidden by default; toggle reveals |

## 3.3 Pass-threshold → SDG-13 Keystone

- **Composite weights** (`MISSION_ARC`): Brief 0.15 · Probe 0.25 ·
  Decide **0.30** · Act 0.25 · Debrief 0.05 · composite ≥ 0.60 awards
  the Keystone.
- **Quiz proxy** (v1, `sdg13-chiangmai-m1.js`):
  `PASS_THRESHOLD_TOKENS = 8` (net across Q1–Q6).
- **TOKEN_MATRIX:** correct {low:+1, med:+2, high:+3} · wrong {low:0,
  med:−1, high:−2}. Rank perfect +8 / 1-adjacent-swap +5 / top-pair
  reversed +3 / trap −3.
- **Cap:** `QUIZ_TOKEN_CAP = 25`.

## 3.4 Longitudinal evidence-commitment → Voice for Change

Q6 ("open" item) asks the student to name *the single most important
piece of evidence* they would use to support their eventual
recommendation, regardless of which side they take. The submission is
stored under `users/{uid}/evidenceCommitments/sdg13-chiangmai` and
surfaced back to the student during the Voice for Change capstone:

> *"In The Burning Season you named [evidence] as your most important
> piece of evidence. Where does it appear in your Voice for Change
> proposal?"*

This is the longitudinal hook that turns one mission's decision into
the capstone's accountability.

## 3.5 Calibration anchors (for the AI applier and the teacher)

The AI Judge prompt for this mission rewards:

- **Range-based hedging** ("the transboundary share is 30–55 %", not
  "40 % exactly").
- **Stacking ≥ 2 structural reasons** (transboundary + behavioural
  displacement is stronger than either alone — this is exactly the Q5
  correct answer C).
- **Naming the counter-argument** *before* it lands ("an industry
  paper would say… and the strongest response is…").

It **penalises**:

- Invented precise statistics.
- "Tradition" or "they have always burned" reasoning (Q5 trap A).
- "It's illegal" or "satellites are useless" overstatements (Q5
  distractors B / D).
- Savior-pitch language ("I will donate machines", "I will educate the
  farmers").

## 3.6 PROBE / quiz-design notes

Six items in `src/scenarios/sdg13-chiangmai-quiz.js`. Summary table:

| # | Type | Difficulty | What it tests | Scaffold trigger |
|---:|---|---|---|---|
| Q1 | MCQ | easy | Fact vs. contested claim — *the dossier never promises a ban alone fixes the air.* | wrong → re-read Part 3 |
| Q2 | rank | medium | Source provenance under conflict of interest | trap → "authority and virality are not evidence" |
| Q3 | match | medium | Stakeholder → primary concern | low score → re-play dispatches |
| Q4 | MCQ | medium | Vocabulary in scientific context ("inversion") | wrong → re-read Part 1 |
| Q5 | MCQ | hard (confidence trap) | Strongest structural objection (stacks ≥ 2 reasons) | wrong → "structural, not sentimental" |
| Q6 | open | open | Longitudinal evidence-commitment (carries to Voice for Change) | n/a — minimum-word gate only |

Scoring detail is data-driven in `computeTokenAward()`. The Q2
rank-trap detection is **data-driven from `correctOrder`** (last two
ids are the trap-top set) — no hardcoded ids, so future scenarios can
reuse the function.

---

# 4. ASSET MANIFEST

> Path pattern: `/assets/scenarios/sdg13-chiangmai/...`. Filenames
> follow the Khon Kaen / Bangkok conventions so the shared M1 BRIEF /
> PROBE / DECIDE renderer resolves them without special-casing.
> **Voice-direction kit follows the Khon Kaen template** (per-asset
> ElevenLabs voice profile + performance direction + script + QA
> checklist) — not reproduced exhaustively here; a concise production
> brief per asset is given below. Cloning budget concentrates on the
> two voices judges hear most closely: **Stakeholder 1 (upland maize
> smallholder)** and **Stakeholder 4 (district enforcement officer)** —
> both cloned from real Thai speakers; the rest from library voices,
> per the Khon Kaen Q4 decision.

## 4.1 Audio assets

| # | Filename | Asset | Production brief |
|---|---|---|---|
| A1 | `/assets/scenarios/sdg13-chiangmai/audio/01-maize-grower.mp3` (+ `.vtt`) | Stakeholder 1 dispatch — upland maize smallholder, Mae Chaem | ~33 s. Thai male, 40–50, northern Thai cadence in English — practical and proud, *not folksy and not a victim*. Energy: pressed but steady; the final line *"A fine is not a choice"* lands flat and resolute, not pleading. **Clone** from a Thai male speaker (40s) reading working-context material. Silent background, no foley. MP3 mono 128 kbps. `.vtt` is the SLA caption scaffold (audio is **not** tiered). |
| A2 | `/assets/scenarios/sdg13-chiangmai/audio/02-clinician.mp3` (+ `.vtt`) | Stakeholder 2 dispatch — respiratory clinician, Chiang Mai public hospital | ~32 s. Thai female, 35–45, educated Bangkok / Chiang Mai mixed register; measured, evidence-bound, **never hostile to the farmers**. Lightly stress *"measurable rise in admissions"* and *"count the children in my ward as stakeholders too."* Library voice ("Professional / Briefing", female). Silent background. |
| A3 | `/assets/scenarios/sdg13-chiangmai/audio/03-procurement.mp3` (+ `.vtt`) | Stakeholder 3 dispatch — agribusiness maize-procurement manager | ~30 s. Thai male, 45–55, polished commercial Thai-English (corporate procurement register); confident, unhurried, **never villainous**. Lightly stress *"we will move when the incentives move"* and *"we cannot subsidise the whole basin by ourselves."* Library voice ("Executive / Corporate", male). Silent background. |
| A4 | `/assets/scenarios/sdg13-chiangmai/audio/04-officer.mp3` (+ `.vtt`) | Stakeholder 4 dispatch — district enforcement officer, haze task force | ~34 s. Thai female, 35–45, civil-service Thai-English (controlled, district-public-meeting register). Lightly stress *"hide-and-seek in the dark"* and *"the last step after a real alternative."* **Clone** from a Thai female speaker (40s) reading civic / officer material — judges hear this voice carry the structural moral of the mission. Silent background. |
| A5 | `/assets/scenarios/sdg13-chiangmai/audio/05-crisis-dispatch.mp3` (+ `.vtt`) *(optional)* | Crisis dispatch — surfaces in DECIDE under a visible timer | ~38–45 s. Neutral Thai radio-advisory register (PCD-advisory voice family). Content: GISTDA flags a sudden cluster of nocturnal hotspots in a Mae Chaem subdistrict three days after the order takes effect; no injuries; the committee requests the team's 90–130-word public position within a short countdown — must acknowledge the night-burning displacement, the unchanged public-health case, and a credible next operational step. Library voice (newsroom/advisory). Silent background; tight, urgent, unembellished. |

## 4.2 Image assets

| # | Filename | Asset | Production brief |
|---|---|---|---|
| I1 | `/assets/scenarios/sdg13-chiangmai/images/hero.webp` | Hero (Mission Select card) | 16:9 · ≥ 1600 px · ≤ ~600 KB. The Ping valley under grey burning-season haze at first light — Doi Suthep a faint silhouette, an upland field edge with thin smoke rising at the treeline, terraced maize stubble in the mid-distance. Muted, smoky, cinematic; a deep-green SDG-13 ambient undertone breaking through the haze. **No people, no text.** Slightly desaturated so gold UI text stays legible if overlaid. Mood: serious, dignified, hopeful — not disaster-porn. *(Canonical brief mirrored from `scenarios/HERO-IMAGE-PROMPTS.md`.)* |
| I2 | `/assets/scenarios/sdg13-chiangmai/images/diagram-inversion.svg` | Explanatory diagram — temperature inversion + Ping valley cross-section (BRIEF reading) | Hand-drawn scientific-illustration register (mid-century textbook / NYT explainer). Two-panel valley cross-section: **left** "without inversion" — pollutants disperse vertically; **right** "with inversion" — warm-air lid traps cool valley air, PM2.5 accumulates day by day. Doi Suthep ridge as the visual reference on one rim. Labels in EN with `<vocab>` reserve space for TH hover labels. Palette: bone background, navy linework, restrained ochre fills, deep-green SDG-13 accent for the trapped layer. Calm, explanatory, **not** alarming-red. |
| I3 | `/assets/scenarios/sdg13-chiangmai/images/chart-pm25-season.svg` | Data chart — seasonal PM2.5 (PROBE data interpretation) | Clean editorial chart, hand-finished (FT / Reuters Graphics feel), **not** a default spreadsheet chart. X-axis: Jan → Dec. Y-axis: relative PM2.5 concentration. A clearly elevated **Feb–April band** annotated as "burning season" with a thin baseline reference. Caption must read as illustrative ("illustrative — based on PCD monthly aggregates; absolute values held by PCD"). Muted palette, one bronze accent on the seasonal peak. **No fabricated precise figures anywhere on the chart.** |
| I4 | `/assets/scenarios/sdg13-chiangmai/images/chart-source-apportionment.svg` | Data graphic — domestic vs. transboundary share | A simple stacked-band or split-pie schematic showing **domestic-upland** vs. **transboundary** contribution to seasonal PM2.5. The transboundary band must be drawn as a **30 – 55 % range** with both edges visible and labelled, never collapsed to a point estimate. SDG-13 accent on the domestic band; bronze accent on the transboundary band. Caption explicitly flags the range as illustrative per §1.5. |
| I5a | `/assets/scenarios/sdg13-chiangmai/images/stakeholder-01.svg` | Portrait — Stakeholder 1 (upland maize grower) | Stylised console portrait (line/duotone, consistent with Khon Kaen / Bangkok portrait treatment), accent token **ochre**. Three-quarter / shadowed pose, **no identifiable face**. Working clothes, smoke-tinged horizon implied behind. Dignified, alert; tired-not-broken. |
| I5b | `/assets/scenarios/sdg13-chiangmai/images/stakeholder-02.svg` | Portrait — Stakeholder 2 (respiratory clinician) | Same treatment, accent token **steel**. Composed, professional, late-30s–40s woman in a hospital corridor — clipboard or stethoscope suggested, **never costume-clichéd**. No identifiable face. |
| I5c | `/assets/scenarios/sdg13-chiangmai/images/stakeholder-03.svg` | Portrait — Stakeholder 3 (procurement manager) | Same treatment, accent token **bronze**. Assured corporate posture, 45–55 man — at a desk or in a procurement-office context, **not** caricature villain. No identifiable face. |
| I5d | `/assets/scenarios/sdg13-chiangmai/images/stakeholder-04.svg` | Portrait — Stakeholder 4 (enforcement officer) | Same treatment, accent token **sage**. Civic-service register, 35–45 woman — district hall or task-force vehicle suggested in the background. Calm, structural; the cooperative-not-enforcer reading. No identifiable face. |

## 4.3 Production notes

- **Voice-direction kit.** Generate the full per-asset ElevenLabs
  profile / direction / script / QA blocks at build time using the
  Khon Kaen §3 template verbatim as the structural pattern; scripts
  are the §2.8 – §2.11 spoken transcripts (A1–A4) and a new
  90–130-word dispatch for A5.
- **Captions.** Every audio asset ships a `.vtt` (Whisper draft →
  manual clean). The caption is the SLA scaffold that justifies
  holding audio constant across tiers. Caption files are already
  shipped at:
  - `assets/scenarios/sdg13-chiangmai/audio/01-maize-grower.vtt`
  - `assets/scenarios/sdg13-chiangmai/audio/02-clinician.vtt`
  - `assets/scenarios/sdg13-chiangmai/audio/03-procurement.vtt`
  - `assets/scenarios/sdg13-chiangmai/audio/04-officer.vtt`
- **Subtitle burn-in.** Stakeholder videos burn the EN subtitle into
  the file (verified via the v2 captions commit `4a8a2bf`) — the
  `.vtt` remains the authoritative caption source for the M2 transcript
  panel and accessibility.
- **Thai pass.** Role labels, `primaryConcernTh`, the §2.6 gloss-table
  Thai column, and the §2.13 reflection prompt require a native-Thai
  reviewer pass before sign-off (Local Lens authority).
- **Manifest figures.** Record `narrativeFigures: { transboundaryShare:
  { value: "30–55 %", status: "illustrative-range" }, shredderCost:
  { value: "฿1.2–2.0 M", status: "illustrative-range" } }` in
  `scenarios/sdg13-chiangmai-burningseason-v1/manifest.json` at build.

---

# 5. PRODUCTION CHECKLIST + OPEN VETTING QUESTIONS

## 5.1 Delivered in this master

- [x] Researcher's Brief — geography & meteorology, real-institution
      attribution, 4-fact empirical spine, anti-pattern check, flagged
      uncertainties (4 quantities with ranges), cultural-authenticity
      guard (northern voice, khon mueang sensitivity, sympathetic
      officer, no identifiable faces)
- [x] Full scenario text — title (EN+TH), setting (28 w), core tension
      (38 w), decision point, 2 ethical axes (+ 1 reserved for the
      capstone)
- [x] **Dossier authored at all three reading tiers** — 4 parts ×
      {T1 A2–B1, T2 B1+–B2 baseline, T3 B2+–C1}, identical facts /
      stakeholders / decision, register-only variation. T2 verbatim
      above; T1/T3 in the runtime module.
- [x] 9-term vocabulary gloss table (EN gloss + Thai gloss), tier-
      constant text; full glosses with example sentences in the
      runtime
- [x] Source-provenance ranking spec (PROBE / Q2 in runtime)
- [x] 4 stakeholders (upland smallholder · clinician · procurement
      manager · enforcement officer) — role, Thai role, accent token,
      duration target, spoken transcript, primary concern EN + Thai
- [x] DECIDE-stage decision frame
- [x] DEBRIEF reflection prompt → SDG-13 Keystone logic
- [x] Adaptive & Assessment notes — 3-tier mapping, gloss-density
      rule, pass-threshold, longitudinal evidence-commitment,
      calibration anchors, PROBE / quiz-design notes
- [x] Asset manifest — 5 audio + 8 image assets with filenames +
      production briefs

## 5.2 Production work still owned (post-sign-off)

| Task | Owner | Tool | Est. |
|---|---|---|---|
| Generate full ElevenLabs voice-direction kit from §4.1 (Khon Kaen template) | Production | ElevenLabs | ~2 hr |
| Generate 5 audio assets (2 cloned: S1, S4) | Production | ElevenLabs | ~2 hr |
| Generate 4 stakeholder videos (with burned-in EN subtitles) | Production | Video tool | ~3 hr |
| Generate 8 image assets (hero, inversion diagram, PM2.5 chart, source-apportionment, 4 portraits) | Production | Image model | ~3 hr |
| `.vtt` captions for A5 crisis dispatch (the other four are shipped) | Production | Whisper + manual | ~30 min |
| Thai pass — role labels, `primaryConcernTh`, gloss-table Thai column, reflection prompt | Native Thai reviewer | — | ~2 hr |
| End-to-end playtest on this mission | You | Live | ~2 hr |
| Named Thai pedagogy reviewer sign-off | You | — | ~1 hr |

## 5.3 Open vetting questions

1. **Transboundary share band.** Retained as a labelled illustrative
   range (30–55 %) per §1.5 and the manifest. Confirm you want it kept
   as a range vs. settled on a single peer-reviewed point estimate.
2. **Shredder/incorporator cost band.** Kept as ฿1.2–฿2.0 M. Confirm
   the range band is acceptable, or supply a tighter band if a real
   procurement quote is available.
3. **No named subdistrict / cooperative.** The dossier uses *"upland
   smallholders in Mae Chaem"* generically and never names a real
   cooperative or village. Confirm you do not want a specific
   community named — naming risks reading as targeting an actual
   community, which the dignity guard advises against.
4. **Chiang Mai University by name.** §1.3 and §1.4 cite CMU's
   environmental & public-health research **by institution name**, not
   by paper title. Confirm this is the right level of specificity
   (recommended: yes — it grounds the procedural-fairness argument in
   a real, internationally documented research strand).
5. **Voice cloning split.** S1 (upland grower) and S4 (enforcement
   officer) cloned; S2, S3, A5 from library — mirrors the Khon Kaen
   and Bangkok Q4 decisions. Confirm budget split.
6. **Crisis dispatch (A5).** Marked optional. Confirm whether the
   DECIDE-stage crisis dispatch is in scope for the v1 build or
   deferred (it is documented here either way; the captioning step
   would be the only outstanding production work).

## 5.4 Conventions inherited from `sdg06-khonkaen-aquifer-v1`

This master adopts the locked Khon Kaen conventions without
re-litigation: institutions named for context only (no DOIs in
student-facing text); illustrative figures disclosed in manifest, not
foregrounded in-mission; cloning budget concentrated on the two
vulnerable / bridging voices; tribunal concession economy; shared
stakeholder schema and asset-path pattern for renderer reuse; identical
TOKEN_MATRIX, QUIZ_TOKEN_CAP, and the data-driven rank-trap detection.

---

## Runtime source map

| Module | What it owns |
|---|---|
| `src/scenarios/sdg13-chiangmai-content.js` | `SCENARIO_META` · `VOCABULARY` · `DOSSIER` (× 3 tiers) · `STAKEHOLDERS` · `INSTITUTIONS_CITED` · `RESOURCES` |
| `src/scenarios/sdg13-chiangmai-quiz.js` | `TOKEN_MATRIX` · `CONFIDENCE_LEVELS` · `QUIZ_ITEMS` × 6 · `computeTokenAward()` · `shouldShowScaffold()` |
| `src/scenarios/sdg13-chiangmai-m1.js` | Stage registrations · `PASS_THRESHOLD_TOKENS = 8` · `debriefComplete` handler (awards Keystone + syncs engine state) |
| `src/scenarios/sdg13-chiangmai.js` | Public adapter (re-exports `SCENARIO_META` + `installStages`) |
| `assets/scenarios/sdg13-chiangmai/video/*` | 4 stakeholder dispatch videos |
| `assets/scenarios/sdg13-chiangmai/audio/*.vtt` | 4 caption files (WebVTT) |
| `assets/scenarios/sdg13-chiangmai/images/*` | Hero, inversion diagram, PM2.5 chart, source-apportionment graphic, stakeholder portraits |

---

*End of PRODUCTION MASTER — `sdg13-chiangmai-burningseason-v1` ·
"The Burning Season" / ฤดูแห่งการเผา. Mirrors the
`sdg06-khonkaen-aquifer-v1` gold-standard structure and the Bangkok /
Andaman / Mae Sot / EEC five-section template adopted across the
documented-only missions. Dossier authored at all three reading tiers.
Pending Aj. Yungie + named Thai pedagogy / public-health reviewer
sign-off.*

*Normalised: 2026-05-22 (b2 — section structure brought in line with
the other five masters).*
