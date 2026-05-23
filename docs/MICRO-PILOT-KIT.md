# MICRO-PILOT KIT — FUTUREPROOF: SDGs Mission Lab

**Purpose:** a complete, ready-to-run instrument so Dr. Payungsak Kaenchan can collect
credible learner-impact evidence from **N = 6–10** undergraduates in a
single ~2-hour session, and so the results drop straight into the final
report (§ Evidence of Learner Impact) and the competition poster.

**Why this matters for the competition.** The SPU rubric's heaviest,
hardest cell is *ผลกระทบต่อผู้เรียน* (impact on learners) — it cannot be
argued from architecture alone; it needs **observed evidence with real
students**. A small, honestly-framed pilot with clean instruments beats a
large, vague claim. This kit is designed to produce exactly that, without
over-claiming.

> **Scope honesty (state this in the report, do not hide it).** N = 6–10,
> single session, one facilitator, two of six missions. This is a
> **formative usability + proof-of-learning pilot**, not a controlled
> efficacy trial. Framed that way it is a strength (disciplined, ethical,
> iterative). Framed as proof of effect size it is a Q&A liability.
> Always use the smaller claim.

---

## 1 · Design at a glance

| Element | Decision |
|---|---|
| Participants | 6–10 undergraduates, mixed English proficiency (deliberately recruit a spread so all 3 reading tiers are exercised) |
| Design | Single-session, within-subjects, mixed-methods (quant capture + short post-test + qualitative) |
| Stimulus | The **two fully-built missions**: *The Aquifer Below Khon Kaen* (SDG 6) and *The Burning Season* (SDG 13) |
| Duration | ~110 min (see runbook §4) |
| Setting | Computer lab or BYOD; stable internet; the live Netlify build |
| Consent | **Collected before any data** — the pilot mirrors the platform's own PDPA fix (consent precedes the diagnostic). This parallelism is itself a Q&A point. |
| Primary outcomes | (a) proof-of-learning (dossier comprehension + targeted vocabulary), (b) usability (SUS-style), (c) perceived fairness of adaptive tiering, (d) willingness to address an authentic audience |
| Secondary capture | Platform telemetry already logged: reading tier served, Insight Tokens, Keystone earned, stage completion, time-on-stage |

---

## 2 · Recruitment & inclusion

- 6–10 undergraduate students, any faculty, English not their L1.
- **Stratify for tier coverage:** aim for ≥2 likely-lower, ≥2 mid, ≥2
  likely-higher proficiency so Tiers 1/2/3 each get used. (You will not
  know exact tiers until the diagnostic — recruit by rough self-report or
  prior course grade.)
- Voluntary; no course credit tied to performance; right to withdraw at
  any point with data destroyed.
- Exclude anyone in a power relationship that could coerce participation.

---

## 3 · Ethics & PDPA (do this first, every time)

The pilot's data handling must match the platform's DPIA. Use this
bilingual consent script. Collect a signature/initial **before** the
laptop is opened.

> **Consent — English.** I agree to take part in a short test session of
> the FUTUREPROOF learning platform. I understand that: my answers and
> the platform's automatic logs (scores, time, reading tier) will be used
> only to improve the platform and for an educational-competition report;
> my name will not appear in any report (a code like P03 is used);
> recordings, if any, are optional and I can decline; I can stop at any
> time and ask for my data to be deleted; data is kept securely and
> deleted within 90 days of the competition.
>
> **ความยินยอม — ไทย.** ข้าพเจ้ายินยอมเข้าร่วมการทดสอบแพลตฟอร์ม
> FUTUREPROOF โดยเข้าใจว่า คำตอบและบันทึกอัตโนมัติของระบบ (คะแนน เวลา
> ระดับการอ่าน) จะถูกใช้เพื่อพัฒนาแพลตฟอร์มและรายงานการประกวดเท่านั้น
> ชื่อจริงจะไม่ปรากฏในรายงาน (ใช้รหัส เช่น P03) การบันทึกเสียงเป็นทางเลือก
> และปฏิเสธได้ ข้าพเจ้าหยุดได้ทุกเมื่อและขอให้ลบข้อมูลได้ ข้อมูลจะถูกเก็บ
> อย่างปลอดภัยและลบภายใน 90 วันหลังการประกวด

- Assign each participant a code **P01…P10**. Keep the name↔code key on
  paper, separate from data, destroyed after the report.
- If using the platform sign-up, use throwaway accounts
  (`pilot01@…` etc.), not personal emails.
- Demo bypass for Keystones is **off** for the pilot (we want real
  earning behaviour); the facilitator may use teacher-override only for a
  genuinely stuck learner, and must log it.

---

## 4 · Facilitator runbook (≈110 min)

| Min | Phase | Facilitator action | Data captured |
|---|---|---|---|
| 0–10 | Welcome + consent | Read consent (EN/TH), collect initials, assign Pxx code, hand out the participant sheet (Appendix A) | Consent log |
| 10–15 | Orientation | Open `intro.html`; let them read it themselves (do **not** explain the missions — we test the page) | — |
| 15–30 | Diagnostic | Each does the readiness check; **record the reading tier the Score Report shows** on their sheet | Pre: CEFR band + tier (Appendix A) |
| 30–55 | Mission A — Khon Kaen | Run `mission-run.html?scenario=sdg06-khonkaen` end-to-end | Telemetry: tier served, tokens, Keystone, stage times |
| 55–80 | Mission B — Chiang Mai | Run `?scenario=sdg13-chiangmai` (the tiered dossier is the headline) | Same telemetry + did the tier chip display |
| 80–95 | Post-test | Appendix B (comprehension + vocabulary, drawn from both dossiers) | Post score |
| 95–105 | Surveys | Appendix C (usability), D (adaptivity & audience), E (3 open items) | Likert + open text |
| 105–110 | Optional reflection | Offer the 30-sec Voice-of-the-Learner; entirely optional | Audio (consented only) |

Facilitator keeps a **field-note log** (Appendix F): every confusion,
hesitation, bug, or "aha" — timestamped, with the Pxx code. These notes
are the richest poster material.

---

## 5 · Instruments

### Appendix A — Participant sheet (one per person)

```
Code: P__   Date: ____   Device/browser: ____________
Self-rated English before today (1 low – 5 high): __
DIAGNOSTIC RESULT (from the Score Report screen):
   CEFR band shown: ____   Reading tier shown: 1 / 2 / 3
   Did the report explain WHY audio is not tiered?  Y / N
MISSION A (Khon Kaen): Keystone earned? Y/N   Net tokens: __
MISSION B (Chiang Mai): Keystone earned? Y/N  Net tokens: __
   Tier chip visible in the dossier?  Y / N
Teacher-override used?  Y / N  (if Y, why: __________)
```

### Appendix B — Post-test (proof of learning, ~15 items, 10 min)

Design rule: items are answerable **only if the learner actually engaged
the dossier/voices** — not general knowledge. Mix 10 comprehension +
5 targeted-vocabulary (terms glossed in the dossiers: *aquifer, drawdown,
threshold, intrusion* / *PM2.5, residue, inversion, transboundary*).

- 10 × comprehension MCQ (5 per mission): each maps to a specific dossier
  fact or a stakeholder's stated concern. (Re-use the mission quiz logic
  as the template; write fresh stems so it is a transfer test, not recall
  of the same screen.)
- 5 × vocabulary-in-context MCQ: the term in a **new** sentence, not the
  dossier sentence. Scores the gloss's effect.

Score = /15. Report as median and range (small N — never a mean with a
fake CI).

### Appendix C — Usability (SUS-style, 10 items, 1–5)

Standard System Usability Scale wording, lightly adapted, EN + TH. Score
the standard SUS 0–100 transformation **but report it as "SUS-style
indicative", N small**. Items (abbrev.): would use it again · unnecessarily
complex · easy to use · would need support · well integrated ·
inconsistent · most people learn fast · cumbersome · felt confident ·
needed to learn a lot first.

### Appendix D — Adaptivity & authentic-audience perception (8 items, 1–5)

The Q&A-defence battery. EN + TH.

1. The reading felt at the right level for me — not too hard, not too easy.
2. I understood that the **text** adapted to me but the **audio did not**.
3. Knowing my reading tier made the mission feel fair, not labelling.
4. The Field Mentor helped me think without giving me the answer.
5. I could see how my work would be judged (teacher grades the final task).
6. The decisions felt like real trade-offs, not quizzes with one right answer.
7. I would be willing to share a "Voice for Change" with a real audience.
8. The Thai context made the problem feel real and relevant to me.

### Appendix E — Open items (qualitative, 3)

1. Describe one moment you had to change your mind. What changed it?
2. What was confusing or frustrating? (Be specific — it helps us fix it.)
3. If your proposal reached a real Thai community, what would you want to say?

### Appendix F — Facilitator field-note log

`time | Pxx | stage | observation (confusion / bug / aha / quote)`

---

## 6 · Measures → constructs → competition criteria

| Instrument | Construct | Feeds rubric criterion |
|---|---|---|
| App. B comprehension | Did learning happen from the content | *ผลกระทบต่อผู้เรียน* (learner impact) |
| App. B vocabulary | Gloss/tier scaffold worked | learner impact + innovation (adaptivity) |
| Telemetry: tier served vs. self-rated English | The tier-on-entry model behaves sensibly | innovation / *การตอบคำถาม* (Q&A defence) |
| App. C SUS-style | The product is usable in a real class | feasibility / classroom-readiness |
| App. D items 1–3 | Adaptivity perceived as fair, not labelling | innovation + Q&A defence |
| App. D items 4–6 | Productive struggle preserved (Field Mentor, real trade-offs) | pedagogical integrity (PICRAT/AI-TPACK) |
| App. D items 7–8 + App. E q3 | Authentic-audience motivation, Thai relevance | learner impact (Hattie multiplier) |
| App. E q2 + App. F | Iteration evidence (we found & will fix issues) | process maturity |

---

## 7 · Analysis plan (honest, small-N)

1. **Descriptive only for quant.** Report n, median, min–max (and the raw
   per-participant table, anonymised). Do **not** run t-tests or quote
   p-values on N≈8 — it invites a fatal Q&A counter. If you want a
   gain signal, use the self-rated-English × tier-served sanity check and
   the post-test distribution, described plainly.
2. **Tier-behaviour check (the headline quant).** Tabulate self-rated
   English (1–5) against reading tier the platform assigned. Expectation:
   monotone-ish (lower self-rating → lower tier). Report the table; if it
   holds, that is concrete evidence the adaptive model behaves sensibly.
3. **Usability.** SUS-style indicative score + the two worst-scoring items
   (those become the "what we'd fix next" slide — maturity, not weakness).
4. **Qualitative.** Thematic-code App. E + App. F: tag every note as
   {comprehension, fairness, motivation, bug, aha}. Count themes; pull 3–4
   verbatim quotes (anonymised, translated) for the poster.
5. **Negative findings are kept.** Any confusion or failure is reported
   with the fix already shipped or scheduled. This is the single most
   credible thing in the whole submission.

---

## 8 · Results write-up template (paste-ready → final report & poster)

> Fill the brackets after the session. This block is written so it can be
> lifted into the report's *Evidence of Learner Impact* section and
> condensed onto the poster verbatim.

```
We ran a formative micro-pilot with N = [n] undergraduates (mixed
English proficiency) across the two fully-built missions. Consent was
collected before any data, mirroring the platform's own PDPA design.

Proof of learning. On a 15-item transfer post-test drawn from the
dossiers and stakeholder voices, the median score was [x]/15
(range [min]–[max]); [k]/[n] participants earned at least one SDG
Keystone through genuine task performance (no demo bypass).

Adaptive model behaved sensibly. Reading tiers assigned by the
diagnostic tracked self-rated proficiency: [insert the App. A table].
[q]/[n] participants correctly understood that text adapted while audio
did not — the SLA asymmetry was legible to learners, not hidden.

Usability & integrity. SUS-style indicative score [s]/100. On the
integrity items, [a]/[n] agreed the Field Mentor helped them think
without giving answers and [b]/[n] said decisions felt like real
trade-offs — productive struggle was preserved. [c]/[n] said they
would share a Voice for Change with a real audience.

What we changed because of the pilot. [list 1–3 concrete fixes shipped
or scheduled from App. E/F]. 

Limitations. Single session, N small, two of six missions, one
facilitator — this is formative usability and proof-of-learning
evidence, not an efficacy trial. Findings are directional and the
instrument is reusable for a larger study (การต่อยอด).
```

---

## 9 · Poster panel (the pilot's one slide)

Title: **"It works with real learners — and we have the receipts."**
Three mini-blocks: (1) the tier-vs-self-rating table (the adaptivity
proof), (2) median post-test + Keystones earned, (3) one learner quote +
"what we fixed." Keep numbers honest and small; let the discipline read
as credibility.

---

## 10 · Pre-flight checklist (run the morning of)

- [ ] Live build green: `intro.html`, `assessment.html`,
      `mission-run.html?scenario=sdg06-khonkaen` and `…=sdg13-chiangmai`,
      `final-task.html`, `hall-of-excellence.html` all load.
- [ ] Demo bypass OFF (no `?demo=keystones`, `fp_demo_mode` cleared).
- [ ] Throwaway accounts created; name↔code key sheet printed.
- [ ] Consent sheets printed (EN/TH); Appendices A–F printed ×N.
- [ ] One dry run by a colleague start-to-finish (catch a blocker before
      real participants).
- [ ] Field-note log open in a doc; clock visible.
- [ ] Quiet room, charged devices, fallback hotspot.

---

*This kit is the instrument; the evidence is produced by running it.
Dr. Payungsak Kaenchan executes the session with real undergraduates; the analysis
template (§7–§8) converts the captured sheets directly into the report
and poster with no further design work required.*
