# FUTUREPROOF: SDG Mission Lab

## Innovation Concept Document — v1 (English)

**Author:** Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan), Faculty of Liberal Arts, Mahidol University
**Submission:** SPU Tech Creative Learning Awards 2026 — โครงการประกวดนวัตกรรมการสอนในยุคดิจิทัล
**Document Date:** May 2026
**Version:** 1 (English working draft; Thai translation to follow on Day 18)

---

## Executive Summary

**FUTUREPROOF: SDG Mission Lab** (ภารกิจเอสดีจีเพื่ออนาคต) is an AI-powered, gamified learning platform for undergraduate English language education. Teams of three students take on professional roles — Research Analyst, Communications Director, Ethics & Policy Officer — and complete a six-mission journey across one of the 17 United Nations Sustainable Development Goals. The journey is engineered around Bloom's Revised Taxonomy: students move from intelligence-gathering (Remember) to ethical defense under cross-examination (Evaluate) to producing a final professional artifact called the **Pitch Capsule** (Create).

What separates FUTUREPROOF from existing edtech is the **inseparability** of its outcomes. English proficiency is not a unit of study — it is the working language used to investigate real crises, decode ambiguous data, deliberate over genuine ethical dilemmas, and construct an artifact of professional consequence. Critical thinking, ethical reasoning, design judgment, and language develop together because the design refuses to separate them.

Eleven peer-reviewed pedagogical frameworks are operationalized in the platform, with each major feature traceable to at least one (see Theoretical Grounding Map). The Field Mentor — a Socratic AI companion — is bound by strict guardrails that prevent it from delivering content answers, preserving the productive struggle that drives Vygotskian learning. A four-tier hybrid judging system separates what AI evaluates well (consistency, language quality, structural coherence) from what only humans can (cultural authenticity, voice, final summative judgment), keeping teachers as the architects of learning even as AI handles operational scale.

FUTUREPROOF is **PDPA-first**, **UDL-accessible**, and **mobile-first**. Every Thai cultural contextualization is generated through a mandatory "Local Lens" layer. The platform is built on a sustainable open-web stack (HTML/Tailwind/Firebase/Claude API/Stability.ai) and is licensed under Creative Commons BY-NC 4.0 for educational use.

The platform is being built as a competition submission for the SPU Tech Creative Learning Awards 2026 in a 20-day sprint (May 10–30). It is designed for first-pilot use in Thai university classrooms beginning Term 1 of academic year 2026.

---

## 1. The Problem We Are Solving

### 1.1 The fragmentation of undergraduate English education

In Thai universities, English language learning is structurally separated from the disciplinary content that students actually care about. Students study English in dedicated language classes, then study sustainability, ethics, policy, or design in their major coursework. The two never meet. Communication skills are tested on sample passages disconnected from any consequence; subject matter is debated in Thai because that is where comprehension is reliable.

The cost of this separation is well-documented:

- **Performance ceilings.** Decades of CEFR data show Thai undergraduates plateau at B1 because output stakes are low and audiences are inauthentic.
- **Transfer failure.** Students cannot mobilize English in real disciplinary or professional contexts — a phenomenon Lave & Wenger predicted: knowledge separated from its community of practice does not generalize.
- **Pedagogical exhaustion.** Teachers face the impossible task of providing real-time formative feedback to 30+ students per class, an Hattie-validated practice that empirically requires AI assistance to scale.

### 1.2 The gamification trap

The dominant edtech response — gamified language apps — has produced engagement metrics but disappointing learning outcomes. The reason is structural: most gamified products treat learning as a side effect of streak-keeping. Tokens unlock cosmetics. Leaderboards reward speed. Difficulty adjusts to keep users in the app rather than to extend competence (Krashen's i + 1).

FUTUREPROOF rejects this pattern explicitly. Tokens unlock **scaffolding tools**, not skins. There are no leaderboards. Difficulty is calibrated to each team's diagnostic profile, not to retention metrics.

### 1.3 The AI deployment problem

Universities globally are confronting a question they cannot postpone: how should generative AI be embedded in pedagogy? The two extremes — banning AI outright or letting it answer everything — both fail. FUTUREPROOF takes the middle path described by Mishra & Koehler's AI-TPACK framework: AI is deliberately confined to roles where its strengths align with pedagogical goals. It generates adaptive content. It evaluates structured decisions. It models professional language. It is **forbidden** from delivering answers, predicting consequences students should discover, or replacing teacher judgment.

---

## 2. The Innovation in One Sentence

**FUTUREPROOF is a self-contained AI-powered gamified learning platform where undergraduate teams undertake adaptive missions across the UN Sustainable Development Goals — building English proficiency, critical thinking, ethical reasoning, and professional design skills inseparably and at once, culminating in a Pitch Capsule artifact.**

---

## 3. The Two Underlying Pedagogical Frameworks

FUTUREPROOF is architecturally governed by **PICRAT** (Kimmons, Graham & West, 2020) and **AI-TPACK** (the AI-extended TPACK of Mishra & Koehler). Every other framework named in this document is *supporting* — it delivers the specifics that PICRAT and AI-TPACK demand.

### 3.1 PICRAT — where the platform sits in technology integration

PICRAT classifies any tech-mediated learning activity on two axes: the **student's relationship to the technology** (Passive → Interactive → Creative) and the **teacher's use of the technology** (Replaces → Amplifies → Transforms). This produces a 3 × 3 matrix; the trajectory from Passive-Replaces (a digital textbook) to Creative-Transforms (students producing professional artifacts that change what teachers can do) is the trajectory of meaningful integration.

Most edtech sits at Passive-Replaces. FUTUREPROOF refuses that floor. Mission 01 starts at **Interactive-Amplifies** — students actively select intelligence sources while AI scaffolds vocabulary at scale. By Mission 04, the platform is at **Creative-Transforms** — teams synthesize counterarguments and the teacher's role transforms into curator of authentic-audience artifacts. The Pitch Capsule (Mission 06) and the Showcase are full **C-T**: the artifact didn't exist before, and the teacher does work — judging portfolio-quality output, recognizing voice — that no pre-AI classroom could have done at scale.

The PICRAT classification is published per mission in [`theoretical-grounding.md`](theoretical-grounding.md). It is not a marketing claim; it is the auditable receipt that the platform never collapses into Passive-Replaces.

### 3.2 AI-TPACK — the boundary between AI and human work

TPACK is the intersection of Technological, Pedagogical, and Content Knowledge — the teacher's professional craft. The AI-TPACK extension asks the question every contemporary educator faces: *now that AI is in the system, where does AI knowledge belong, and what stays human?*

FUTUREPROOF answers the question explicitly and immovably. The boundary is enforced in code — not just in policy.

| AI handles | Humans handle |
|---|---|
| Adaptive content generation calibrated to learner profile | Curriculum architecture and learning objectives |
| Real-time formative feedback on every decision | Final summative grading |
| Source synthesis at scale | Cultural authenticity judgment |
| Language quality scoring against CEFR descriptors | Voice and originality recognition |
| Decision logging and pattern detection | Pedagogical decisions about intervention |
| Ethical-reasoning probing through cross-examination | Ethical dilemma resolution |

The Field Mentor's system prompt blocks content delivery. The four-tier judging system reserves summative authority for the teacher. The Admin Command Platform is the surface where humans exercise the judgments AI is forbidden from making.

### 3.3 Two lenses, one platform

PICRAT keeps FUTUREPROOF from drifting into Passive-Replaces edtech (digital textbook, drill-and-skill). AI-TPACK keeps it from drifting into AI-as-tutor (productive struggle erased, teacher displaced). Together they constitute the architecture; everything else is implementation detail.

---

## 4. The Six-Mission Architecture

The course is structured as six sequential missions, each calibrated to a Bloom's Revised Taxonomy cognitive level. Skipping is not permitted: each mission depends on outputs of the previous, so the cognitive ascent is structural, not advisory.

### Mission 01 — RECON (Remember / Identify)

Teams receive a briefing package on their chosen SDG sub-problem and must gather intelligence: identify key facts, recognize specialized vocabulary, evaluate source credibility (CRAAP test integrated), and map stakeholders. The team chooses **two of four** intelligence sources — a deliberate decision that shapes the knowledge they carry into Mission 02.

**Adaptive element:** Reading difficulty adjusts to early responses; vocabulary scaffolding offered in real time.

**AI evaluation criteria:** Factual accuracy, vocabulary recognition, strategic source selection, justification quality.

### Mission 02 — DECODE (Understand / Comprehend)

Teams must explain their crisis to a specific assigned audience — a senior Thai government minister, a concerned local citizen, an institutional investor, or an international NGO partner. Register shifting is the language demand. Conflicting information from selected sources forces interpretive judgment.

**Adaptive element:** Audience assignment varies; AI-generated stakeholder reactions probe comprehension depth.

**AI evaluation criteria:** Comprehension accuracy, register appropriateness, audience awareness, justification of interpretive choices.

### Mission 03 — DEPLOY (Apply)

A live crisis event escalates the scenario mid-mission — a leak, a court ruling, a press inquiry. Teams must respond in real time: drafting communications, choosing one of three AI-generated strategies, and committing to action under uncertainty. The Comms Interceptor delivers timed pressure.

**Adaptive element:** The crisis is generated based on Mission 1–2 decisions, ensuring it is owned by the team.

**AI evaluation criteria:** Language quality under time pressure, strategic coherence, awareness of consequences.

### Mission 04 — DISSECT (Analyze)

Consequences from Mission 03 arrive. Teams must perform comparative analysis: what worked, what failed, why. They map stakeholders again with new information, identify a single most critical leverage point, and stand behind their analysis as the AI Judge generates counterarguments.

**Adaptive element:** Counterarguments are calibrated to the strength of the original analysis.

**AI evaluation criteria:** Analytical depth, evidence quality, ability to handle counterargument without retreating into either capitulation or defensiveness.

### Mission 05 — TRIBUNAL (Evaluate)

The ethical crucible. An ethical dilemma is generated from the team's specific journey, ensuring it cannot be solved by general moral templates. Teams compose a position statement, defend it through multi-turn AI cross-examination, and commit to a final ethical judgment that frames their Pitch Capsule.

**Adaptive element:** Cross-examination intensity scales with response sophistication; weak reasoning triggers deeper probes.

**AI evaluation criteria:** Ethical reasoning quality (Kohlberg-informed), argumentation under pressure, language precision, willingness to revise.

### Mission 06 — FORGE (Create)

Teams enter the **Creation Studio** — a built-in authoring environment — to produce their **Pitch Capsule**, a five-panel professional artifact that synthesizes the entire journey:

| Panel | Title | Lead Role | Content |
|---|---|---|---|
| 01 | The Crisis | Research Analyst | Problem statement with data and evidence |
| 02 | The Journey | Collaborative | Decisions made and lessons learned |
| 03 | The Insight | Ethics Officer | The core finding or argument |
| 04 | The Solution | Comms Director | Proposed action with stakeholder alignment |
| 05 | The Voice | Collaborative | Recorded narration overlay |

The Pitch Capsule is exportable as PDF + audio. With consent, it is eligible for the **Hall of Excellence** — a public, curated gallery of exemplary student work.

---

## 5. The Three-Role Situated Learning System

Knowledge is inseparable from the community of practice in which it is used (Lave & Wenger). FUTUREPROOF makes this concrete: each student takes a professional role with **asymmetric information access**, meaning no role can complete the mission alone. Teams must communicate in English to share knowledge each member alone holds.

| Role | Special Ability | Language Focus | Information Held |
|---|---|---|---|
| Research Analyst | +1 free data source per mission | Academic / technical English, hedging, citation | Raw data, research summaries |
| Communications Director | Preview stakeholder reactions (1× / mission) | Persuasive writing, audience adaptation | Stakeholder profiles, media reports |
| Ethics & Policy Officer | Invoke ethical framework reference (1× / mission) | Argumentative, conditional, evaluative | Policy documents, ethical precedents |

Solo and pair players are accommodated: solos rotate roles with AI playing NPC consultants; pairs choose two of the three roles and receive slightly expanded information per role.

---

## 6. The Insight Token Economy

Tokens (called **Insight Tokens**) are the platform's internal currency. They are **structurally distinct** from gamified-app currencies because they unlock learning resources, not cosmetic prizes.

### Earning

| Action | Tokens |
|---|---|
| Accurate intelligence gathering | +5 to +15 |
| Strong comprehension demonstration | +5 to +15 |
| High-quality written communication | +10 to +20 |
| Surviving AI cross-examination well | +15 to +25 |
| Bonus: exceptional vocabulary | +5 |
| Bonus: counterargument consideration | +10 |
| Penalty: weak reasoning or factual errors | −5 to −10 |
| Penalty: ethical blind spots | −5 to −10 |

### Spending

| Item | Cost | Effect |
|---|---|---|
| 🔍 Expert Consultant | 15 | Strategic AI question per mission |
| 📝 Language Coach Session | 10 | Detailed AI feedback on a draft |
| 🎨 Premium Design Template | 20 | Upgraded Pitch Capsule layout |
| 💡 Hint Reveal | 5 | Unlock hidden data point |
| 🔄 Decision Replay | 25 | Redo one decision point |
| 🎤 Pronunciation Drill | 10 | AI-guided pronunciation practice |

The token economy aligns with Self-Determination Theory's three motivational pillars: **competence** (tokens reward genuine skill), **autonomy** (teams choose what to spend on), **relatedness** (spending decisions are negotiated within the team in English).

---

## 7. Rank Progression

| Rank | Requirement | Unlocks |
|---|---|---|
| Cadet | Complete competency assessment | Basic mission access |
| Field Agent | Complete Missions 1–2 | Discussion facilitator AI |
| Analyst | Complete Mission 3 | Data visualization tools |
| Strategist | Complete Mission 4 | Expert Consultant access |
| Director | Complete Mission 5 | Full Creation Studio |
| Ambassador | Submit Pitch Capsule | Public showcase, peer review |

---

## 8. The Field Mentor (AI Companion with Strict Guardrails)

The Field Mentor is a Socratic AI companion available throughout the mission journey. It is **deliberately bounded** to prevent it from undermining the pedagogy.

### What the Field Mentor CAN do

- Ask reflective questions that promote team discussion
- Provide language support (vocabulary, grammar, register)
- Offer encouragement and emotional support
- Suggest which team role might address a question
- Model professional English

### What the Field Mentor CANNOT do

- Provide content answers about the SDG topic or scenario
- Evaluate student decisions (that is the AI Judge's role)
- Reveal information that should be earned
- Predict consequences of decisions
- Replace Expert Consultant strategic insights
- Resolve ethical dilemmas

If a team requests content help, the Mentor redirects: *"That's something your team needs to work through together. What does your Research Analyst think?"* If a team requests a decision, the Mentor redirects: *"Your team's judgment is what matters here. What factors are you weighing?"*

The Mentor is a senior collaborator — not a tutor. It models how a thoughtful colleague would respond to the team's questions: with another question, with vocabulary support, or with a reminder of a resource the team already has.

---

## 9. The Four-Tier Hybrid Judging System

| Tier | Judge | Role | When |
|---|---|---|---|
| 1 | AI Judges | Real-time formative evaluation | During every mission |
| 2 | Peer Judges | Cross-team review with rubrics | After Mission 4 |
| 3 | Teacher Judges | Holistic, summative, authoritative | Final Pitch Capsule grading |
| 4 | External Judges | Authentic audience recognition | Pitch Showcase event |

The teacher's evaluation is the **final official grade**. AI provides scale and consistency. Peer judging builds metacognition. External judges deliver authentic audience — the strongest motivator identified in authentic-assessment research (Wiggins).

This four-tier separation is not redundancy. Each tier evaluates what only it can evaluate. Confusing the tiers — letting AI replace teacher judgment, for example — collapses the entire architecture.

---

## 10. SDG Selection and the Local Lens

Students are presented with an interactive **Mission Selection Wheel** showing all 17 SDGs in their official UN colors. Selection triggers a Claude API call that generates **three contextualized sub-problem scenarios** within the chosen SDG.

Every generated scenario carries a mandatory **Local Lens** layer: a Thai/ASEAN contextualization including relevant Thai ministries, real Thai stakeholder organizations, and current Thai policy debates. The Local Lens is non-optional. Without it, FUTUREPROOF would be a foreign curriculum imported wholesale. With it, the platform meets students where they live and asks them to investigate problems that genuinely surround them.

The scenario-generation prompt enforces:

- Currency (debate is unresolved)
- Pedagogical richness (multiple stakeholders, layered ethics)
- Source-grounding (real organizations, no fabrication)
- Difficulty calibration to team CEFR estimate and analytical percentile

Generated scenarios are frozen for the team's run; new teams generate new scenarios.

---

## 11. Accessibility, Equity, and Compliance

### 11.1 PDPA (Thailand Personal Data Protection Act)

- Bilingual consent flow at sign-up (Thai + English) with plain-language summaries
- Granular consent flags (basic profile / photo / voice / decisions)
- "My Data" panel for student review and deletion requests
- 90-day auto-deletion post-course
- Audit logs for all admin / teacher access to PII
- Field-level encryption in transit and at rest
- Data Protection Impact Assessment (DPIA) accompanying the submission

### 11.2 Universal Design for Learning (CAST UDL Guidelines 3.0)

- TTS audio alternative for all text content
- Adjustable font size and dyslexia-friendly font option
- High-contrast mode and color-blind-safe palettes
- Keyboard navigation throughout
- ARIA labels and screen-reader compatibility verified
- Captioning on all audio
- Cognitive Pace Mode (removes time pressure)
- Multiple response modes (text, voice, drawing where applicable)

### 11.3 Mobile-first responsive design

- All breakpoints from 360px upward
- Touch-optimized for thumb-reach zones
- Progressive Web App capabilities (add to home screen)
- Tested on actual mobile devices, not only desktop simulators

### 11.4 Language strategy

English is the working language of all mission content, decisions, and AI interactions. Thai metalanguage is used for navigation labels, UI instructions, accessibility helpers, consent forms, and key reflections. An optional **Thai Support Mode** is available to lower-proficiency students. Translanguaging research (García) supports this design: scaffolded L1 access lowers Krashen's affective filter without diluting target-language exposure.

---

## 12. Expected Outcomes

### 12.1 Language outcomes

- Measurable CEFR-band progression in writing and speaking, comparing pre-mission and post-Pitch-Capsule artifacts.
- Vocabulary growth in academic, persuasive, and evaluative registers (vocabulary recognition data captured per mission).
- Improved register flexibility, evidenced by Mission 02 audience-shifting performance.
- Reduced affective filter, evidenced by self-reported confidence in pre/post reflections.

### 12.2 Critical thinking outcomes

- Demonstrated argument analysis (Mission 04 leverage-point identification + counterargument handling).
- Ethical reasoning sophistication (Mission 05 cross-examination performance).
- Source evaluation skill (Mission 01 CRAAP-aligned decisions).

### 12.3 Soft-skill outcomes

- Collaboration (logged team communication patterns)
- Decision-making under uncertainty (Mission 03 timed responses)
- Synthesis (Pitch Capsule coherence scoring)

### 12.4 Affective and identity outcomes

- Sense of agency in addressing real-world problems
- Recognition of own voice in English (Pitch Capsule audio)
- Authentic audience exposure via Pitch Showcase and Hall of Excellence

### 12.5 Teacher outcomes

- Reduced grading load (AI handles formative feedback at scale; teachers grade summatively only).
- Richer learner data than any pre-AI ELT classroom could produce.
- Curricular flexibility — scenarios are regenerable each term.

---

## 13. Implementation Architecture (Brief)

| Component | Technology |
|---|---|
| Frontend | HTML5, Tailwind CSS 3.4 (compiled), vanilla JavaScript |
| Backend | Firebase (Auth, Realtime Database, Storage, Cloud Functions) |
| AI engine | Anthropic Claude API (Sonnet for most tasks, Haiku for Field Mentor) |
| Avatar generation | Stability.ai (image-to-image with character style template) |
| Voice | Web Speech API (recording + transcription), Web Audio API |
| Hosting | Netlify (deployed at `futureproof.yungie.one`) |
| Build | npm + Tailwind CLI |

Detailed schema and security rules are documented in [`firebase-schema.md`](firebase-schema.md) and [`firebase-security-rules.md`](firebase-security-rules.md). API keys are kept off the client through Netlify Functions that proxy Claude and Stability.ai calls.

---

## 14. Implementation Roadmap (20-Day Sprint)

| Week | Dates | Focus |
|---|---|---|
| Week 1 | May 10–16 | Foundation: design system, sign-up + PDPA, assessment, avatar, SDG selection |
| Week 2 | May 17–23 | Mission engine, all six missions, Field Mentor, Pitch Capsule Studio |
| Week 3 | May 24–30 | Admin platform, Hall of Excellence, accessibility audit, sample data, video, documentation, submission |

**Submission deadline:** May 30, 2026 (morning, Bangkok time).

---

## 15. Why This Matters Now

Three converging pressures make FUTUREPROOF timely:

1. **The AI deployment moment.** Universities everywhere are deciding how generative AI fits into pedagogy. FUTUREPROOF offers a defensible answer — neither prohibition nor capitulation, but principled integration with explicit guardrails.

2. **The SDG decade.** The UN Decade of Action (2020–2030) is past its midpoint. If language education does not connect students to these challenges, when will it?

3. **The Thai pedagogical context.** Thai universities are well-positioned to lead — strong digital infrastructure, growing English requirements in graduate schools, and active national interest in sustainability literacy. The country needs models of how to do all of this together.

FUTUREPROOF is built on the belief that English language education, used well, is one of the most powerful levers available for global citizenship. The platform exists to make that belief operational at scale, in classrooms, by next term.

---

## 16. Acknowledgments

This work is being developed by **Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan)** at the Faculty of Liberal Arts, Mahidol University. The author thanks Anthropic for the Claude API, Stability.ai for image generation tooling, the Firebase team for the underlying infrastructure, and the broader open-web ecosystem on which the platform is built.

Pedagogical foundations draw on the published work of Krashen, Bloom & Anderson & Krathwohl, Vygotsky, Wood & Bruner & Ross, Lave & Wenger, Hattie, Mayer, Mishra & Koehler, Kohlberg, Freire, Piaget, Bruner, Wiggins, Black & Wiliam, Schön, Toulmin, García, Deci & Ryan, Zimmerman, Flavell, Paivio, Papert, Hymes, Canale & Swain, the CAST UDL framework, and UNESCO's Education for Sustainable Development guidance.

---

## 17. License

This work is licensed under a **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**. Free to use, adapt, and share for educational and non-commercial purposes with appropriate attribution. Commercial use is not permitted.

---

**End of Innovation Concept Document v1**

*Companion documents:*
- [`theoretical-grounding.md`](theoretical-grounding.md) — feature-to-framework mapping
- [`firebase-schema.md`](firebase-schema.md) — data architecture
- [`firebase-security-rules.md`](firebase-security-rules.md) — access control
- *Teacher's Guide* — Day 18
- *Rubric Suite (A–D)* — Day 14
- *Data Protection Impact Assessment* — Day 18
