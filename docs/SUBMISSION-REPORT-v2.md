# FUTUREPROOF: SDGs Mission Lab — Submission Report (v2 Final)

**SPU Tech Creative Learning Awards 2026 · โครงการประกวดนวัตกรรมการสอนในยุคดิจิทัล**
Author: Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan), Faculty of Liberal Arts
Live build: https://futureproof-sdgs-lab.netlify.app
Status: Final · supersedes the May-10 v1 concept docs for submission
purposes (those remain in `docs/` as design history).

> **How to read this.** §0 is a bilingual one-page summary for fast
> judging. §1–§9 are the defensible detail. Every claim here maps to
> something *running in the live build* or *documented in the repo* —
> nothing is aspirational unless explicitly marked roadmap (การต่อยอด).

---

## 0 · One-page summary / บทสรุปหนึ่งหน้า

**EN.** FUTUREPROOF turns English learning into a single gamified journey
across **six of Thailand's most pressing, real sustainable-development
frontlines** — one per region. A learner crosses Thailand: each region is
a deep mission where they read a tiered dossier, hear authentic
stakeholder voices, decide under a genuine ethical trade-off, act, and
debrief. Passing a region earns one **SDG Keystone**; six Keystones
unlock the **Voice for Change** capstone — a real proposal to a real
audience, graded by the teacher. Two pedagogical frameworks are
load-bearing: **PICRAT** keeps every activity above passive-replacement
edtech; **AI-TPACK** fixes the boundary — AI scaffolds at scale, humans
keep summative judgement. Difficulty is met through a **static
reading-tier-on-entry** model: the diagnostic sets a CEFR-mapped tier,
and every dossier is pre-authored at three registers — *same facts, same
decision, different language*. Audio is deliberately **not** tiered (an
SLA-correct asymmetry, not a shortcut). Two missions are fully built and
playable; all six are documented to production-master depth; the journey,
diagnostic, capstone and public Hall of Voices are live.

**TH / ไทย.** FUTUREPROOF เปลี่ยนการเรียนภาษาอังกฤษให้เป็นการเดินทางเกม
ข้าม **6 แนวหน้าความยั่งยืนจริงของไทย** ภูมิภาคละหนึ่งภารกิจ ผู้เรียน
อ่านเอกสารที่ปรับระดับ ฟังเสียงผู้มีส่วนได้ส่วนเสียจริง ตัดสินใจภายใต้
ทางเลือกเชิงจริยธรรมที่แท้จริง ลงมือ และสรุปบทเรียน ผ่านภารกิจหนึ่ง
ได้ Keystone หนึ่ง ครบหกชิ้นปลดล็อกภารกิจสุดท้าย “เสียงเพื่อการ
เปลี่ยนแปลง” ที่ครูเป็นผู้ให้คะแนน กรอบทฤษฎีหลักสองกรอบคือ PICRAT และ
AI-TPACK ความยากปรับด้วยการกำหนด “ระดับการอ่าน” ตั้งแต่ต้นจากแบบประเมิน
โดยข้อเท็จจริงและการตัดสินใจเหมือนกันทุกระดับ ต่างเฉพาะภาษา ส่วนเสียงไม่
ปรับระดับโดยเจตนา (ถูกต้องตามทฤษฎีการรับภาษาที่สอง) สองภารกิจสร้างเสร็จ
เล่นได้จริง ทั้งหกภารกิจมีเอกสารการผลิตครบ

---

## 1 · The problem we are solving

Thai undergraduate EFL too often sits in the **Passive–Replaces** corner
of the PICRAT matrix: a digital textbook, drill-and-skill, decontextual.
Meanwhile the SDGs are taught as content *about* the world, disconnected
from language production and ethical reasoning. FUTUREPROOF's wager:
English, critical thinking, and ethical judgement are learned best when
they are **inseparable and consequential** — when a learner must read,
weigh, decide and defend on a problem that is real, Thai, and unresolved.

The v2 reconstruction sharpened this from "17 shallow SDG scenarios" to
**six deep, regionally-distinct Thai missions arranged as one journey** —
the change that made the platform demonstrable, defensible, and
pedagogically coherent (full rationale: `docs/RECONSTRUCTION-MASTER.md`).

## 2 · The six missions (locked)

| Region | SDG | Mission | The trade-off it forces |
|---|---|---|---|
| Northeast · Khon Kaen | 6 | The Aquifer Below Khon Kaen | City dry-season water vs. the aquifer the next generation inherits |
| North · Chiang Mai | 13 | The Burning Season | Clean-air enforcement vs. upland farmers who burn to survive |
| Central · Bangkok | 11 | The Klong and the City | Flood defence for 80,000 vs. canal-side households' tenure |
| South · Andaman | 14 | The Reef and the Tide | Reef recovery vs. small dive-operator livelihoods |
| West · Tak/Mae Sot | 4 | The Children at the Border | Right to education vs. resource scarcity (migrant/stateless) |
| East · EEC fringe | 3 | The Village the Boom Left Behind | EEC growth vs. rural-ageing health equity |

**Built & playable:** Khon Kaen, Chiang Mai. **Documented to
production-master depth (3-tier dossier, 4 stakeholders, asset manifest):**
all six (`scenarios/*/PRODUCTION-MASTER.md`). This staged scope is a
deliberate discipline decision, not an omission (§8).

## 3 · The innovation, precisely stated

1. **One journey, not a menu.** A 2.5D animated Thailand map; six glowing
   region pins; any-order entry; a Keystone meter; a gated capstone. The
   journey *is* the progression narrative.
2. **Two currencies that never convert.** *Insight Tokens* are spendable
   scaffolding (process reward). *SDG Keystones* are non-spendable, one
   per mission, the only key to the Final Task. Keeping them
   non-convertible is what protects productive struggle — Tokens can
   ease the climb but can never *buy the ending*.
3. **A mastery-spiral Bloom arc.** Every mission re-runs the same
   compressed arc — **BRIEF · PROBE · DECIDE · ACT · DEBRIEF** — so the
   higher-order moves become habit, not a one-off. Full *Create* is
   reserved for the capstone, where it belongs.
4. **Adaptivity that is visible and fair.** The diagnostic shows the
   learner their reading tier *and explains why audio is not tiered*.
   Adaptivity is surfaced as a fairness statement, not hidden as a
   difficulty knob.
5. **An authentic audience.** The capstone is addressed to real Thai
   communities; consented work reaches a public Hall of Voices and,
   optionally, a youth SDG forum. Authentic audience is the single
   largest learning multiplier (Hattie; situated cognition).

## 4 · Pedagogical grounding (why it is not decoration)

**Load-bearing (remove either and the architecture collapses):**

- **PICRAT** — every mission targets at least Interactive–Amplifies; the
  capstone targets Creative–Transforms. The auditable test (CLAUDE.md
  §4.3) rejects any feature that lands in Passive–Replaces.
- **AI-TPACK** — the boundary is explicit and *shown to the learner*: AI
  gives instant, consistent, formative feedback at scale; the **teacher
  renders the summative grade** on the capstone with Rubric A. The Field
  Mentor is Socratic-only (hard guardrails, CLAUDE.md §9). This boundary
  is the platform's strongest Q&A answer.

**Supporting (they supply the specifics the two demand):** Krashen i+1
(the tiered dossier), Vygotsky ZPD + Bruner scaffolding (Tokens gate
scaffolds), Bloom revised (the 5-stage spiral), Mayer CTML / dual coding
(audio + caption, not tiered audio), CAST UDL (three capstone expression
lanes; TTS; reduced-motion; keyboard), Lave & Wenger (asymmetric
professional roles), Hattie (authentic audience, formative feedback).

## 5 · The adaptive model (the Q&A-gold asymmetry)

The diagnostic produces a CEFR estimate → mapped **once** to a reading
tier {1: A2–B1, 2: B1+–B2, 3: B2+–C1} stored on the profile. Every
mission serves its **reading text** at that tier:

> *Identical facts, stakeholders, numbers, and the same decision — only
> lexical density, sentence length, and clause embedding differ.*

**Audio/video are NOT tiered.** This is intentional and SLA-correct:
reading is self-paced, so it must meet the learner at i+1 or comprehension
collapses; listening is time-bound and *benefits* from controlled stretch
**because** the .vtt caption scaffold exists (Krashen; dual coding).
Tiering text while holding audio constant is the defensible asymmetry —
and the learner is told this on the Score Report. Concretely demonstrable
in *The Burning Season*: one dossier, three authored registers, a visible
in-mission tier chip (`src/scenarios/sdg13-chiangmai-content.js`).

## 6 · The corrected workflow (PDPA fix)

Landing → **Platform Intro** → Sign-up → **Consent/PDPA** → Diagnostic →
**Score Report (tier shown)** → Avatar → **Journey Map** → [6 Keystones]
**Final Task** → **Hall of Voices**.

The fix that matters: **consent now precedes any personal-data
collection**. `assessment.html` is a hard gate — it refuses to run and
writes nothing to the cloud until a consent record exists. This closes a
real prior vulnerability and is fully documented in the final DPIA
(`docs/dpia.md`).

## 7 · Evidence of learner impact

A ready-to-run formative micro-pilot (N=6–10, the two built missions,
single ~110-min session) is fully instrumented in
`docs/MICRO-PILOT-KIT.md`: bilingual PDPA consent, a 15-item transfer
post-test, SUS-style usability, an adaptivity-&-authentic-audience
perception battery, and a small-N-honest analysis plan whose outputs
paste directly into this report and the poster. The headline quantitative
check is the **assigned-tier vs. self-rated-proficiency table** — direct
evidence the adaptive model behaves sensibly. *(Run by Dr. Payungsak Kaenchan with
real undergraduates; results inserted on completion.)*

## 8 · Honest scope & limitations (stated, not hidden)

- **Two of six missions are built.** Four are documented to
  production-master depth. This is a deliberate Option-A discipline
  decision so the pilot, poster and report are done well rather than six
  missions done shallowly. *Documented ≠ built* — we say so plainly.
- **The pilot is formative, N small, single session.** We report medians
  and ranges, never inferential significance. The honesty is the
  credibility.
- **Roadmap (การต่อยอด):** build the remaining four from their masters;
  dynamic in-mission re-levelling; cohort-calibrated diagnostic
  percentiles; teacher analytics depth; more regions/SDGs. The
  architecture already scales to all of this — nothing here requires a
  redesign.

## 9 · Criteria traceability

| Rubric line | Where this report / build answers it |
|---|---|
| หลักการ/เหตุผล | §1 problem; §4 frameworks |
| วัตถุประสงค์ | §3 measurable end-state (6 Keystones + graded capstone) |
| วิธีดำเนินการ | §3 arc; §5 SLA-justified adaptivity; live build |
| จุดเด่น/แปลกใหม่ | §3 journey, two currencies, visible adaptivity, authentic audience |
| ประโยชน์/ต่อยอด | §8 roadmap; live, scalable infrastructure |
| เอกสาร/โปสเตอร์ | this report + the poster + the production masters |
| การนำเสนอ | demonstrable end-to-end live story (Thailand map) |
| การตอบคำถาม | §5 SLA asymmetry · §4 AI-TPACK boundary · §6 PDPA gate · §8 honesty |
| ผลกระทบต่อผู้เรียน | §7 pilot kit + authentic audience |
| การต่อยอด | §8 region/SDG/adaptivity scaling on existing infra |

---

*Single source of truth for design decisions: `docs/RECONSTRUCTION-MASTER.md`.
Data protection: `docs/dpia.md`. Evidence instrument:
`docs/MICRO-PILOT-KIT.md`. Rubrics: `docs/rubrics/`.*
