# Theoretical Grounding Map

**FUTUREPROOF: SDG Mission Lab — Pedagogical Framework Mapping**

This document traces every major platform feature back to the established educational theory that justifies it. The map is the auditable receipt that FUTUREPROOF is not entertainment software with academic veneer — every mechanic exists because a peer-reviewed framework demands it.

---

## 0. The two underlying frameworks

FUTUREPROOF is built on two **load-bearing** pedagogical frameworks. Everything else listed in this document is *supporting* — it delivers the specifics that these two frameworks demand.

### 0.1 PICRAT (Kimmons, Graham & West, 2020)

PICRAT is a two-axis classification of any technology-mediated learning activity:

- **Student's relationship to the technology:** Passive → Interactive → Creative
- **Teacher's use of the technology:** Replaces → Amplifies → Transforms

This produces a 3 × 3 matrix. The diagonal that runs from Passive-Replaces (lower-left) to Creative-Transforms (upper-right) is the trajectory of meaningful integration. Most edtech sits at Passive-Replaces — a digital textbook, a drill app. FUTUREPROOF rejects that floor and aims, mission by mission, for the upper-right cells.

**FUTUREPROOF's PICRAT classification:**

| Mission | Student Relationship | Teacher Use | PICRAT cell |
|---|---|---|---|
| 01 RECON | Interactive (selecting sources, naming stakeholders) | Amplifies (AI-mediated source evaluation, vocabulary scaffolding) | **I-A** |
| 02 DECODE | Interactive (audience-shifted explanation) | Amplifies (register feedback at scale) | **I-A** |
| 03 DEPLOY | Interactive → Creative (live response under pressure) | Amplifies → Transforms (AI Judge consequences shape Mission 04) | **I-A / C-A** |
| 04 DISSECT | Creative (counterargument synthesis) | Transforms (peer judges introduced; metacognition surfaced) | **C-T** |
| 05 TRIBUNAL | Creative (defending an ethical position under cross-examination) | Transforms (the dilemma is generated from this team's specific journey — un-replicable in pre-AI classroom) | **C-T** |
| 06 FORGE | Creative (a designed, narrated, multi-panel artifact) | Transforms (teacher grades a portfolio-quality output, not a quiz) | **C-T** |
| Field Mentor | Interactive (Socratic prompts) | Amplifies (extends teacher coaching capacity) | **I-A** |
| Pitch Showcase | Creative (authentic-audience presentation) | Transforms (external judges, recognition that travels) | **C-T** |

The platform never operates below Interactive-Amplifies. The capstone (Mission 06 + Showcase) is Creative-Transforms — the integration goal PICRAT names.

### 0.2 AI-TPACK (Mishra & Koehler, extended)

TPACK is the intersection of Technological, Pedagogical, and Content Knowledge — the teacher's professional craft. The AI-TPACK extension asks: *now that AI is in the system, where does AI knowledge belong, and what stays human?*

FUTUREPROOF answers the question explicitly and immovably:

| AI handles | Humans handle |
|---|---|
| Adaptive content generation calibrated to learner profile | Curriculum architecture and learning objectives |
| Real-time formative feedback on every decision | Final summative grading |
| Source synthesis at scale | Cultural authenticity judgment |
| Language quality scoring against CEFR descriptors | Voice and originality recognition |
| Decision logging and pattern detection | Pedagogical decisions about intervention |
| Ethical-reasoning probing through cross-examination | Ethical dilemma resolution |

This boundary is enforced in code, not just in policy. The Field Mentor's system prompt blocks content delivery (`api/claude-proxy.js`). The four-tier judging system reserves summative authority for the teacher (`docs/rubrics/rubric-a-pitch-capsule.md`). The Admin Command Platform is the surface where humans exercise the judgments AI is forbidden from making.

### 0.3 The two-lens audit

For any feature in this document — and any future feature — apply both lenses in this order:

1. **PICRAT cell.** What does this push student and teacher toward? If the answer is Passive-Replaces, redesign or reject.
2. **AI-TPACK boundary.** Which work is AI doing, which is the human doing, and is the split defensible? If AI is replacing human judgment that should remain human, redesign or reject.
3. **Supporting framework.** Which of the frameworks below is doing the specific work?

Skip step 3 only at the cost of decoration; skip 1 or 2 and you have edtech without architecture.

---

## 1. Master Mapping Matrix

The leftmost two columns apply the **two underlying frameworks** (PICRAT cell + AI-TPACK boundary). The rightmost two columns identify the **supporting frameworks** that give each feature its specifics.

| Platform Feature | PICRAT Cell | AI / Human Split | Supporting Framework(s) | Predicted Outcome |
|---|---|---|---|---|
| Pre-mission Competency Assessment | I-A | AI: scoring; Human: cohort calibration | Krashen i+1; CEFR | Mission content is calibrated to each team's instructional level rather than a generic course average. |
| AI-generated SDG sub-scenarios | I-A | AI: synthesis at scale; Human: Local Lens curation | Constructivism; UNESCO ESD; Situated Cognition | Learners encounter authentic, contextualized problems rather than rehearsed textbook prompts. |
| Local Lens (Thai/ASEAN contextualization) | I-T | AI: drafts; Human: cultural-truth verification | UNESCO ESD; Critical Pedagogy (Freire) | Content is meaningful within learners' lived context, not imported wholesale from anglophone curricula. |
| Six-mission Bloom's progression | I-A → C-T (rises across missions) | AI: feedback per decision; Human: summative grading | Bloom's Revised Taxonomy | Cognitive demands rise systematically rather than plateauing at recall. |
| Mission 01 (RECON) — source evaluation, vocabulary | I-A | AI: vocab/source feedback; Human: trade-off coaching | Bloom's: Remember; CRAAP; Krashen i+1 | Foundational vocabulary and information literacy precede higher-order tasks. |
| Mission 02 (DECODE) — register-shifted explanation | I-A | AI: register feedback; Human: cultural register cues | Bloom's: Understand; CLT register theory; CTML | Learners practice audience adaptation, not generic comprehension. |
| Mission 03 (DEPLOY) — timed crisis response | I-A → C-A | AI: consequence generation; Human: time-pressure judgment | Bloom's: Apply; Schön's Reflection-in-Action | Application happens under uncertainty, mirroring professional decision-making. |
| Mission 04 (DISSECT) — leverage-point + AI counterargument | C-T | AI: probes; Human: peer judges introduced | Bloom's: Analyze; Toulmin argumentation; Critical Pedagogy | Analysis is tested against challenge rather than rewarded for fluency alone. |
| Mission 05 (TRIBUNAL) — ethical defense under cross-examination | C-T | AI: cross-examines; Human: ethical authority | Bloom's: Evaluate; Kohlberg; Critical Pedagogy; Vygotsky's ZPD | Ethical reasoning is articulated, defended, and revised — not assumed. |
| Mission 06 (FORGE) — Pitch Capsule artifact | C-T | AI: language coach; Human: voice / authorship recognition | Bloom's: Create; Mayer's CTML; Constructionism; UDL | Synthesis becomes a tangible, shareable artifact rather than a forgotten test response. |
| Three-role asymmetric information | I-A → C-T | AI: NPCs only; Human: real teammates carry the work | Lave & Wenger; Communities of Practice | Communicative pressure is structural — teams must use English to share knowledge each member alone holds. |
| Insight Token economy | I-A | AI: awards based on rubric; Human: catalog design | SDT; Vygotsky scaffolding | Engagement is sustained because tokens unlock *learning resources*, not cosmetic prizes. |
| Field Mentor (Socratic guardrailed) | I-A | AI: questions only — content delivery prohibited; Human: teacher remains ultimate guide | Vygotsky's ZPD; Wood/Bruner/Ross scaffolding; Hattie | Help is available but never replaces the productive struggle that drives learning. |
| AI Judge formative evaluation | I-A | AI: rubric-grounded scoring; Human: weekly calibration audit | Hattie; Black & Wiliam | Every decision receives feedback, scaling teacher attention. |
| Four-tier hybrid judging | I-A → C-T | Sharpest AI/human split in the platform — see §2.7 | Hattie; Wiggins (authentic assessment) | The platform separates what AI evaluates well (consistency, language) from what only humans can (cultural authenticity, voice, judgment). |
| Pitch Capsule with multimodal panels + audio | C-T | AI: language coach; Human: synthesis & voice authorship | CTML; Dual Coding (Paivio); UDL | Knowledge is encoded across verbal, visual, and aural channels, deepening retention. |
| Voice of the Learner reflections (3 checkpoints + Time Capsule) | C-A | AI: optional transcription; Human: privately-held listener | Metacognition (Flavell); SRL (Zimmerman) | Learners observe their own growth, the strongest predictor of transfer. |
| Personalized Learning Portfolio (post-Mission 6) | C-T | AI: data assembly; Human: future-plan authorship | Constructionism; Authentic Assessment; SRL | Evidence of learning travels with the student, not just the gradebook. |
| PDPA bilingual consent flow | I-T | Human-only: consent is the learner's act; AI never decides | UNESCO ethics in AI for education; Critical Pedagogy | Learners make informed choices about their data, modeling digital citizenship. |
| UDL accessibility layer | I-T | Human: design; AI: TTS, transcripts | CAST UDL 3.0 | Learning environment removes barriers before assessment, not after appeal. |
| English-primary with Thai metalanguage | I-A | AI: register support; Human: register modeling | CLT; Translanguaging (García); Krashen's Affective Filter | English is the working language; Thai scaffolding lowers anxiety at low-proficiency moments. |
| Admin Command Platform | I-T | The surface where humans exercise judgments AI is forbidden from making | Hattie; AI-TPACK | The teacher remains the architect of learning even as AI handles operational scale. |
| Hall of Excellence | C-T | Human-only: curation is teacher work | Authentic Audience (Wiggins); Communities of Practice | Student work travels beyond the classroom, raising stakes and recognition. |

---

## 2. Framework-by-Framework Justification

### 2.1 Krashen's Input Hypothesis (i + 1)

Krashen argued that acquisition occurs when learners encounter language **just beyond** current competence. FUTUREPROOF operationalizes this at scale through:

- A diagnostic assessment that produces a `learnerProfile` document containing CEFR-band estimates, vocabulary range, and analytic-reasoning percentile.
- A scenario-generation prompt that injects this profile into the Claude API call so each generated mission text is calibrated to the team's actual level.
- Mid-mission adaptive responses that re-tune difficulty based on observed performance.

Without this calibration, the same SDG scenario served to A2 and C1 students would underwhelm one and overwhelm the other. The Input Hypothesis demands neither.

### 2.2 Bloom's Revised Taxonomy

The six missions are **not** thematic chapters. They are deliberate cognitive ascents:

| Mission | Bloom's Level | Cognitive Demand |
|---|---|---|
| 01 RECON | Remember | Identify, retrieve, recognize |
| 02 DECODE | Understand | Interpret, exemplify, summarize |
| 03 DEPLOY | Apply | Execute, implement under conditions |
| 04 DISSECT | Analyze | Differentiate, organize, attribute |
| 05 TRIBUNAL | Evaluate | Critique, judge, defend |
| 06 FORGE | Create | Generate, plan, produce |

Skipping a level (a common temptation in gamified learning) breaks the scaffolding. FUTUREPROOF does not allow Mission 04 to begin until Mission 03 outputs are recorded — Bloom's progression is structural, not advisory.

### 2.3 Vygotsky's ZPD + Wood / Bruner / Ross Scaffolding

The Zone of Proximal Development is the gap between what a learner can do alone and what they can do with help. FUTUREPROOF makes scaffolding *purchasable* rather than *automatic*:

- **Field Mentor** offers Socratic prompts and language support — scaffolding without content delivery.
- **Expert Consultant** (15 tokens) delivers strategic AI analysis — scaffolding learners earn the right to consult.
- **Language Coach Session** (10 tokens) provides detailed writing feedback.
- **Hint Reveal** (5 tokens) unlocks one hidden data point.

Help is plentiful but never free. The token economy aligns scaffolding cost with the framework's prediction: scaffolding works only when it is intentionally faded.

### 2.4 Lave & Wenger's Situated Cognition

Knowledge is inseparable from the context in which it is used. FUTUREPROOF instantiates communities of practice through:

- **Three professional roles** (Research Analyst, Communications Director, Ethics & Policy Officer) with asymmetric information access.
- **NPC stakeholder interviews** with AI-played community elders, ministers, and executives.
- **Authentic audience** at the Pitch Showcase — invited faculty, NGOs, industry.

Students do not study what a research analyst does. They *are* the research analyst for the duration of a mission.

### 2.5 Hattie's Visible Learning

Hattie's meta-meta-analysis identified formative feedback as having an effect size of approximately 0.70 — among the highest-impact interventions in education. FUTUREPROOF delivers:

- AI Judge evaluation on every decision, with rubric-grounded justification.
- Visible token movement (earned / lost) tied to specific decisions.
- Integrity Meter as a persistent, glanceable signal of trajectory.
- Voice of the Learner reflections that surface growth to the learner themselves.

### 2.6 Mayer's Cognitive Theory of Multimodal Learning (CTML)

Mayer's principles — coherence, signaling, redundancy, modality, multimedia — govern the **Pitch Capsule** design:

- Each panel pairs concise verbal text with deliberate visual structure (CTML: multimedia principle).
- Audio narration overlay carries argument, not redundant on-screen reading (modality principle).
- Layout templates restrict noise (coherence principle).
- Console-style labeling acts as signaling.

The Studio is not a free-form canvas — it is a CTML-aligned authoring environment.

### 2.7 Mishra & Koehler TPACK / AI-TPACK

The teacher is the architect of the intersection between **Technological**, **Pedagogical**, and **Content** knowledge. The AI-extended variant (AI-TPACK) adds the question: *what should AI handle, and what must humans handle?*

FUTUREPROOF answers explicitly:

| AI handles | Humans handle |
|---|---|
| Adaptive content generation | Curriculum architecture |
| Real-time formative feedback | Final summative grading |
| Source synthesis at scale | Cultural authenticity judgment |
| Language quality scoring | Voice and originality recognition |
| Decision logging and pattern detection | Pedagogical decisions about intervention |

The Teacher Dashboard is the surface where humans exercise the judgments AI cannot.

### 2.8 Kohlberg's Moral Development + Critical Pedagogy

Mission 05 (TRIBUNAL) is the only mission that **cannot** be solved by performance optimization. Ethical dilemmas are generated from each team's specific journey, ensuring the dilemma is owned by them. AI cross-examination probes for:

- Stage 3-4 reasoning (conformist / law-and-order) — flagged as potentially shallow.
- Stage 5-6 reasoning (social contract / universal principle) — recognized as sophisticated.

This is not relativism — the rubric values the *reasoning chain*, not the conclusion. Critical Pedagogy demands learners interrogate power, voice, and assumption. The cross-examination is that interrogation in operational form.

### 2.9 CAST Universal Design for Learning Guidelines 3.0

Three pillars of UDL — **Engagement**, **Representation**, **Action & Expression** — are baked into platform defaults rather than offered as opt-ins:

- Multiple representation: TTS, captions, transcripts, high-contrast mode, dyslexia font.
- Multiple action: text, voice, drawing where applicable; keyboard navigation throughout.
- Multiple engagement: cognitive pace mode (no time pressure), team / solo / pair flexibility, choice in SDG selection.

Accessibility is the floor, not the ceiling.

### 2.10 UNESCO Education for Sustainable Development

The 17 SDGs are not the topic of the course — they are the **pedagogical infrastructure** that makes learning consequential. Every Local Lens contextualization, every NPC interview, every ethical dilemma is anchored to the UN ESD competency framework: systems thinking, anticipatory thinking, normative thinking, strategic thinking, and self-awareness.

---

## 3. Convergence Map

The strongest design choices are those where multiple frameworks converge. The table below shows the highest-convergence features:

| Feature | Frameworks Converging |
|---|---|
| Pitch Capsule (Mission 06) | Bloom's Create + CTML + Constructionism + UDL + Authentic Assessment |
| Field Mentor with guardrails | Vygotsky ZPD + Bruner scaffolding + Hattie + AI-TPACK |
| Three-role asymmetric information | Situated Cognition + CLT + Vygotsky ZPD |
| Token economy | Self-Determination Theory + Vygotsky ZPD + operant conditioning (bounded use) |
| Local Lens | UNESCO ESD + Critical Pedagogy + Constructivism + Translanguaging |

A feature backed by four frameworks is not a feature designed by accident.

---

## 4. What This Map Excludes (Deliberately)

To preserve pedagogical safety, FUTUREPROOF **rejects** these patterns common in gamified learning:

| Rejected Pattern | Why |
|---|---|
| Cosmetic-only token spend (skins, outfits) | Violates SDT competence dimension; rewards engagement detached from learning. |
| AI tutor that delivers content answers | Violates ZPD — eliminates productive struggle. |
| Leaderboards visible to learners | Violates SDT autonomy / relatedness; introduces social comparison harm. |
| Auto-generated certificates without teacher endorsement | Violates AI-TPACK boundary — final authority must remain human. |
| Time pressure as default | Violates UDL Multiple Means of Engagement; disadvantages learners who need pace adjustment. |

These exclusions are part of the design, not omissions.

---

## 5. Auditability

Every design review and every submission revision should run against this map. The question is not "does this feature feel good?" — the question is "which framework justifies it, and is that framework still operative in the chosen implementation?"

If the answer is "none," the feature is removed.

---

**End of Theoretical Grounding Map**

For implementation specifics, see [`firebase-schema.md`](firebase-schema.md), [`firebase-security-rules.md`](firebase-security-rules.md), and the master [`innovation-concept.md`](innovation-concept.md).
