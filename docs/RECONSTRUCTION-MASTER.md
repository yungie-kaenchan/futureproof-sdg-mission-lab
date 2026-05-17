# RECONSTRUCTION MASTER SPEC

**FUTUREPROOF: SDGs Mission Lab — v2 "The Thailand Journey"**

| Field | Value |
|---|---|
| Status | GOVERNING SPEC · supersedes CLAUDE.md §5 (mission architecture) and §19 (page structure) where they conflict |
| Author | Aj. Yungie (Dr. Payungsak Kaenchan) · Faculty of Liberal Arts, Mahidol University |
| Co-author | Claude Sonnet (Anthropic) |
| Created | 2026-05-16 |
| Submission deadline | 2026-05-30 (14 days) |
| Locked decisions | D1 (six SDGs), D2 (static tier-on-entry), D3 (PDPA fix), D4 (Option A staged), D5 (authentic audience), D6 (D3+GSAP map — default) |
| Live site | https://futureproof-sdgs-lab.netlify.app |

> Every code change in v2 must trace to a section of this document. If a
> proposed change is not in here, it is out of scope until this spec is
> amended.

---

## 1 · Vision Reframe

**v1 was:** "an AI-powered ELT platform with selectable SDG scenarios."

**v2 is:** *A learner embarks on a journey across the six regions of
Thailand, confronting the nation's six defining sustainable-development
challenges. Each region solved earns an SDG Keystone. Six Keystones unlock
the right to record a **Voice for Change** — the learner's own proposal for
a Thai community, judged by a teacher and showcased to a real audience.*

The journey IS the innovation. Everything below serves that one sentence.

---

## 2 · The Six Missions (LOCKED)

| # | SDG | Region | Core tension (genuine dilemma) | Build status |
|---|---|---|---|---|
| 1 | **6 · Clean Water** | Northeast — Khon Kaen | Municipal wellfield expansion secures city supply but accelerates aquifer drawdown the next generation inherits | ✅ BUILT (v1) |
| 2 | **13 · Climate Action** | North — Chiang Mai | PM2.5 burning-season enforcement protects urban respiratory health but threatens upland farmer livelihoods | 🔨 BUILD (showcase #2) |
| 3 | **11 · Sustainable Cities** | Central — Bangkok | Monsoon-flood mitigation protects 80k commuters but displaces klong-side informal households | 📄 DOCUMENT |
| 4 | **14 · Life Below Water** | South — Andaman (Krabi/Phuket) | Marine-tourism quota lets reefs recover but cuts dive-economy livelihoods (Maya Bay precedent) | 📄 DOCUMENT |
| 5 | **4 · Quality Education** | West — Tak/Mae Sot | Migrant & stateless children's right to education vs legal-status & resource constraints | 📄 DOCUMENT |
| 6 | **3 · Good Health** | East — EEC-fringe rural | Eastern Economic Corridor draws working-age labour away, hollowing villages into elderly + grandchildren households as healthcare access thins | 📄 DOCUMENT |

**Scope (D4 = Option A):** Missions 1–2 fully built and pilot-tested.
Missions 3–6 fully documented to production-master depth (judged Round 1
is document-based — a documented mission scores Round 1 the same as a
built one). All six appear on the Journey Map; 3–6 show a "Field
report — full build in progress" state in the demo with their dossier
readable.

**Dignity guardrails (CLAUDE.md §11 inherited):** Missions 5 (migrant/
stateless) and 6 (elderly) render vulnerable groups as stakeholders with
agency, never problem-objects. No monarchy/military/party-politics/Deep-
South-conflict framing anywhere.

---

## 3 · Journey State Machine

```
                ┌─────────────── JOURNEY MAP (Thailand) ───────────────┐
                │  6 region pins · any order · pass-threshold gating    │
                └───────────────────────────────────────────────────────┘
                        │            │            │
                   Mission A     Mission B     Mission … (any order)
                        │            │            │
                  [5-stage arc] [5-stage arc]  [5-stage arc]
                        │            │            │
                   pass? ──► +1 SDG Keystone (per mission)
                        │
        ┌───────────────┴───────────────┐
        │ Keystones < 6  → Final Task LOCKED (shows "N of 6 collected") │
        │ Keystones = 6  → Final Task UNLOCKED                          │
        └───────────────┬───────────────┘
                         │
                  FINAL TASK · Voice for Change
                  (3 submission lanes · teacher-graded)
                         │
              satisfactory? ──► JOURNEY COMPLETE
                         │
                  Hall of Voices (authentic audience, consent-gated)
```

### 3.1 Pass-threshold (D-point 1 locked)
A mission yields its Keystone when the learner **meets the bar**, not when
they score perfectly. Bar = completing all 5 stages AND a composite
mission score ≥ **60%** (configurable per mission in its manifest).
Sub-threshold learners may **retry** the DECIDE/ACT stages once before the
score locks. A Keystone is binary (earned / not yet) — it is not graded.

### 3.2 Teacher override + demo bypass (D-point 2 locked)
- **Teacher override:** instructor dashboard can grant any Keystone for
  assessed offline-equivalent work. Logged with reason + timestamp.
  Prevents dead-ends; strong Q&A answer ("the journey never traps a
  struggling learner").
- **Demo/judge bypass:** URL param `?demo=keystones` (gated behind a
  build-time env flag `DEMO_MODE`) pre-grants all 6 Keystones for
  evaluation. Never exposed in normal navigation. Without this, judges
  cannot see the Final Task in a 7-minute demo.

### 3.3 Two-tier economy (resolves the token question)
| Currency | Earned | Spent on | Persisted |
|---|---|---|---|
| **Insight Tokens** | Per-stage performance within a mission (existing v1 logic) | Scaffolding shop: Expert Consultant, Language Coach, Hint Reveal | RTDB `tokens/{uid}` |
| **SDG Keystones** | One per mission passed (max 6) | NOT spendable — they are narrative keys that unlock the Final Task | RTDB `keystones/{uid}` (new) |

Tokens reward *process*; Keystones gate *progression*. Two distinct
mechanics → richer engagement (scores *การมีส่วนร่วม* 20%).

---

## 4 · Revised In-Mission Arc (replaces v1 "6 missions = 6 Bloom levels")

Each of the 6 SDG missions runs the **same 5-stage compressed Bloom
micro-arc**. Total ≈ 75–90 min/mission. The top Bloom level (Create) is
deferred to the Final Task as the journey capstone.

| Stage | Bloom | Gamified name | ~min | Activity | Earns |
|---|---|---|---|---|---|
| 1 | Remember + Understand | **BRIEF — "Read the land"** | 15 | Adaptive-tier dossier · 4 stakeholder audio dispatches · comprehension check | Insight Tokens |
| 2 | Apply + Analyze | **PROBE — "Follow the thread"** | 20 | Resolve conflicting sources · stakeholder map · identify leverage point | Insight Tokens |
| 3 | Evaluate | **DECIDE — "Hold the line"** | 20 | Core decision under constraint · light AI cross-examination (retry once) | Insight Tokens |
| 4 | Create (small) | **ACT — "Send word"** | 20 | One short adaptive-register artifact (stakeholder brief / message) | Insight Tokens |
| 5 | Metacognition | **DEBRIEF — "Earn the Keystone"** | 10 | Reflection prompt · mission score computed · Keystone awarded if ≥ bar | **SDG Keystone** |

Architecturally this **replaces** `MISSION_CONFIGS` (6 Bloom configs) with
a single `MISSION_ARC` (5 stages) parameterised per scenario. Mission
identity now lives in *scenario content modules* (like
`sdg06-khonkaen-*`), not in the engine.

`Pedagogical note for the report:` This is **mastery-spiral design**
(Bruner spiral × Bloom): every mission re-runs the full Remember→Evaluate
ladder in a new regional context (6× spaced repetition of the cognitive
cycle = robust transfer), with the single hardest level (Create) reserved
for one high-stakes synthesis capstone. Any-order freedom is now
pedagogically *coherent*, not a compromise. → scores *วิธีดำเนินการ* L5.

---

## 5 · Adaptive Learning Model (D2 = static tier-on-entry)

```
Diagnostic (shortened) ─► CEFR estimate ─► learnerProfile.readingTier
                                                  │
                          ┌───────────────────────┼───────────────────────┐
                          ▼                        ▼                       ▼
                    Tier 1 (A2–B1)         Tier 2 (B1+–B2)         Tier 3 (B2+–C1)
                          │                        │                       │
              dossier + source texts served at the learner's tier (SAME content)
              more glosses + scaffolds    baseline               fewer glosses
```

| Material | Adapted? | Rule |
|---|---|---|
| Reading texts (dossier, sources, instructions) | ✅ 3 pre-built tiers | Identical facts/decisions/stakeholders; differ in lexical density, sentence length, clause embedding |
| Vocabulary gloss density | ✅ | Tier 1 high · Tier 3 low |
| Scaffolds (sentence starters, organisers) | ✅ | Tier 1 provided · Tier 3 optional |
| Quiz item complexity | ✅ | Already adaptive in v1 Khon Kaen engine |
| Writing-task expected output | ✅ | Word count + register scale with CEFR |
| **Audio / video** | ❌ constant | Authentic input; listening stretch is SLA-desirable *because* captions (.vtt, already built) scaffold access |

**SLA justification (Q&A gold):** Reading is self-paced → must meet
learner at i+1 or comprehension collapses. Listening is time-bound →
benefits from controlled stretch *when a caption scaffold exists*. Tiering
text while holding audio constant is the SLA-correct asymmetry, not a
production shortcut. (Krashen Input Hypothesis; dual-coding theory.)

**v1 production:** 3 text tiers for the 2 built missions (Khon Kaen +
Chiang Mai). Model documented for all 6. Dynamic in-mission re-leveling →
roadmap (*การต่อยอด* 20%).

**Storage:** `learnerProfile.readingTier ∈ {1,2,3}` set once at diagnostic
score step; mission content modules expose `dossier[tier]`.

---

## 6 · PDPA-Corrected Workflow (D3 fix applied)

```
1  Landing Page                         (/index.html — splash, built)
2  Platform Introduction                (/pages/intro.html — NEW)
       how it works · what's expected · how you're evaluated · the journey map preview
3  Sign-up / Sign-in                    (/pages/signup.html · signin.html — exist)
3.5 Consent / PDPA  (Thai + English)    (/pages/consent.html — MOVED earlier)  ◄ FIX
4  English Diagnostic (shortened)       (/pages/assessment.html — trim + rescope)
5  Diagnostic Score Report             (shows "your reading tier = B1+" — adaptivity made visible)
6  Avatar / Profile creation           (/pages/avatar.html — exists)
7  JOURNEY MAP                          (/pages/mission-select.html → rebuilt as Thailand map)
8  [6 Keystones] FINAL TASK             (/pages/final-task.html — NEW)
9  Completion / Hall of Voices          (/pages/hall-of-excellence.html → Hall of Voices)
```

**The fix:** consent now precedes any personal-data collection. The
diagnostic (step 4) never writes to Firebase until consent (3.5) is
recorded. Update DPIA accordingly — this closes a Q&A vulnerability and
scores credibility.

**Step 2 (Platform Introduction)** is new and strategically important:
the rubric expects learners to *know how their work is evaluated*.
Transparency here directly scores *การมีส่วนร่วม* and *การตอบคำถาม*.

**Diagnostic rescope (step 4):** trim from full battery to ~12–15 min:
short cloze + targeted vocabulary + one micro-writing sample → CEFR band
+ reading-tier assignment. Remove sections that don't feed the tiering
decision. Keep the existing parallel-set anti-cheating design.

---

## 7 · Thailand Journey Map Component (D6 default: D3 + GSAP)

| Layer | Tool | Spec |
|---|---|---|
| Geometry | D3-geo + Thailand TopoJSON (`apisit/thailand.json` MIT, or GADM L0/L1, simplified at mapshaper.org) | Geographically accurate national silhouette + 6 region highlights |
| Motion | GSAP (free, all plugins) | Entrance reveal · pin pulse · parallax depth on pointer · region-highlight easing on focus |
| Texture | Inline SVG filters (`feTurbulence` mist · `feGaussianBlur` glow · displacement contour) | Bronze-navy palette, zero deps |
| Pins | Real HTML `<button>` over the SVG, absolutely positioned | Keyboard-navigable · ARIA-labelled · focus ring (UDL) |
| State | Pin visual = mission status (locked-preview / available / passed-with-Keystone) | Reads journey progress from `keystones/{uid}` |

Below the map: 6 mission cards — title · region · embedded SDG · the
5-stage Bloom focus · "Begin" (or "Field report" for documented-only
missions 3–6). Any-order entry.

**Page:** `/pages/mission-select.html` is rebuilt into this. Old SDG-wheel
picker is retired (kept in `/sandbox/` for reference).

Reliability mandate: this must never break in a judged demo. No WebGL/3D
in v1. A flawless 2.5D map > a janky 3D one.

---

## 8 · Final Task — "Voice for Change" (D5 authentic audience = yes)

**Unlock:** 6/6 Keystones (or teacher override / demo bypass).

**Prompt:** *Having walked all six of Thailand's frontlines, propose one
concrete action for a Thai community. Address a real audience.*

**Three submission lanes (CAST UDL — multiple means of expression):**

| Lane | Tech | Notes |
|---|---|---|
| 1 · Live audio recording | `MediaRecorder` + `getUserMedia()` (in v1 stack) | Primary. In-browser, 60–180 s, retake allowed |
| 2 · Upload pre-recorded audio/video | File input → Firebase Storage (or compressed data-URL → RTDB, the avatar pattern) | For learners not comfortable recording live |
| 3 · "Create with Canva" → export → upload | Button opens a Canva template in **new tab** → learner designs → exports PDF/PNG/MP4 → uploads back | **Do NOT iframe-embed Canva** (frame-ancestors blocked — will fail in demo). Launch+export+upload only. |

**Assessment:** teacher-graded with **Rubric A (holistic)** — preserves the
AI-TPACK boundary (AI scaffolds; humans render summative judgment). This
is a deliberate, defensible Q&A answer.

**Authentic audience (D5):** satisfactory submissions are curated, with
explicit consent, into a public **Hall of Voices** (rebuilt
`hall-of-excellence.html`), with optional routing to a real Thai
youth-SDG forum. Authentic audience is the single biggest pedagogical-
impact multiplier (Hattie; situated learning) → scores *ผลกระทบต่อผู้เรียน*
20%.

---

## 9 · Architecture Change Map

| Module / page | v1 role | v2 change |
|---|---|---|
| `src/mission-engine.js` | 6 Bloom `MISSION_CONFIGS` | Replace with single 5-stage `MISSION_ARC`; mission identity moves to scenario modules |
| `src/scenarios/sdg06-khonkaen-*` | Khon Kaen mission | Becomes the *reference template*; clone structure for Chiang Mai (built) + 4 documented |
| `src/keystones.js` | — | NEW · Keystone earn/track/gate logic + teacher override + demo bypass |
| `src/tokens.js` | Insight Tokens | Unchanged (still the spendable currency) |
| `src/adaptive.js` | — | NEW · reads `learnerProfile.readingTier`, serves `dossier[tier]` |
| `pages/mission-select.html` | SDG wheel picker | Rebuilt → Thailand Journey Map (D3 + GSAP) |
| `pages/intro.html` | — | NEW · Platform Introduction (workflow step 2) |
| `pages/consent.html` | step 6 | Moved to step 3.5; gate diagnostic write behind it |
| `pages/assessment.html` | full diagnostic | Shortened + tier-assigning |
| `pages/final-task.html` | — | NEW · 3-lane Voice for Change |
| `pages/hall-of-excellence.html` | gallery stub | Rebuilt → Hall of Voices (consent-gated) |
| `pages/mission-shell.html` | static task template | Becomes the 5-stage arc renderer driven by `MISSION_ARC` + scenario module |
| `/sandbox/` | mocks | Old SDG-wheel + prototypes preserved here (gitignored) |

Preserved untouched: Firebase init, auth flow-state, topbar/rail shell,
disclaimer modal, Field Mentor, PDPA disclaimer doc, Khon Kaen assets.

---

## 10 · Recut 14-Day Schedule (May 16 → May 30)

| Day(s) | Track | Deliverable |
|---|---|---|
| 16–17 | Architecture | `keystones.js`, `adaptive.js`, `MISSION_ARC` refactor, journey state machine wired |
| 17–18 | Map | Thailand Journey Map (D3+GSAP) on rebuilt mission-select |
| 18–19 | Workflow | intro.html, consent-before-diagnostic fix, diagnostic shorten + tier output, score report |
| 19–21 | Mission build | Chiang Mai PM2.5 mission to Khon Kaen depth (5-stage arc, 3 text tiers) |
| 21–22 | Final Task | final-task.html — 3 lanes + teacher grading hook + Hall of Voices |
| 22–24 | Documentation | Missions 3–6 production masters (Bangkok, Andaman, Tak, EEC-aging) |
| 24–25 | **Pilot** | Micro-pilot N=6–10 on Khon Kaen + Chiang Mai · agreement + impact data |
| 25–27 | Submission docs | Finalized bilingual report · **poster** · DPIA update |
| 27–28 | Presentation | 5–7 min demo rehearsed & timed 3× · Q&A red-team doc (15 Q) |
| 28–29 | Buffer | Fixes, polish, asset production (audio/hero via existing prompt docs) |
| 30 | SUBMIT (morning) | — |

The two red-cell risks from the criteria analysis — **poster + pilot** —
are scheduled as non-negotiable blocks, not afterthoughts.

---

## 11 · Competition-Criteria Traceability

| Rubric line (round · weight) | Spec element that scores it |
|---|---|
| หลักการ/เหตุผล (R1·10) | §1 vision, §2 six pressing Thai challenges |
| วัตถุประสงค์ (R1·10) | §3 measurable end-state (6 Keystones + graded capstone) |
| วิธีดำเนินการ (R1·20) | §4 mastery-spiral Bloom · §5 SLA-justified adaptivity |
| จุดเด่น/แปลกใหม่ (R1·20) | §1 journey narrative · §7 Thailand map · §8 Voice for Change |
| ประโยชน์/ต่อยอด (R1·20) | §2 region/SDG scaling · §10 roadmap · live infra |
| เอกสาร/โปสเตอร์ (R1·20) 🔴 | §10 days 25–27 — poster + finalized report (RISK) |
| การนำเสนอ (R2·30) | §1 demo-able story · §7 visual map |
| การตอบคำถาม (R2·30) | §5 SLA asymmetry · §8 AI-TPACK boundary · §3.2 no dead-ends |
| ผลกระทบต่อผู้เรียน (R2·20) 🔴 | §10 day 24–25 micro-pilot + §8 authentic audience (RISK) |
| การต่อยอด (R2·20) | §2 + §5 roadmap, region/SDG/adaptivity scaling |

Two red cells remain execution-dependent (poster, pilot). The
architecture cannot substitute for them — only the scheduled blocks can.

---

## 12 · Open Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Reconstruction overruns into pilot/poster time | HIGH | D4=A scope discipline; only 2 missions built; documented ≠ built for Round 1 |
| Map breaks in judged demo | HIGH | D6 default = D3+GSAP no-3D; test on 3 browsers; static fallback image |
| Canva embed attempted | MED | Spec §8 explicitly forbids iframe; launch+upload only |
| Consent-ordering still wrong in code | MED | §6 fix is a hard gate; DPIA updated; tested |
| Pilot N too small to claim significance | MED | Frame as "formative pilot, N=X, agreement %"; do not over-claim; honesty scores credibility |
| SDG 3 East/EEC framing unfamiliar to a judge | LOW | Dossier cites EEC policy explicitly; localLens grounds it |

---

## 13 · Amendment Log

| Date | Change | By |
|---|---|---|
| 2026-05-16 | Spec created · D1–D6 locked · v2 architecture defined | Aj. Yungie + Claude |

---

*End of Reconstruction Master Spec. This document governs FUTUREPROOF v2.
Amend here first; code follows.*
