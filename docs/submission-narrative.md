# Submission Narrative

**SPU Tech Creative Learning Awards 2026 — โครงการประกวดนวัตกรรมการสอนในยุคดิจิทัล**
**Submission:** FUTUREPROOF: SDG Mission Lab (ภารกิจเอสดีจีเพื่ออนาคต)
**Submitter:** Aj. Yungie (Dr. Payungsak Kaenchan), Faculty of Liberal Arts, Mahidol University
**Submission date:** May 30, 2026 (target: 10:00 ICT)

> *Working draft. The final submission narrative is delivered in Thai-primary form with English supplement. The Thai translation is on Aj. Yungie's plate for Day 18–19; this English draft is the source.*

---

## 1. The single sentence

FUTUREPROOF is a self-contained AI-powered gamified learning platform where undergraduate teams undertake adaptive missions across the UN Sustainable Development Goals — building English proficiency, critical thinking, ethical reasoning, and professional design skills inseparably and at once, culminating in a narrated multi-panel **Pitch Capsule** artifact.

## 2. Why the panel of judges should care

Three things separate FUTUREPROOF from existing edtech in the Thai market:

**(a) Inseparable outcomes.** Most platforms drill English in isolation. FUTUREPROOF refuses the separation: students do not study English to investigate problems — they investigate problems *in* English. Critical thinking, ethical reasoning, and design are produced in the same act. The pedagogy is not a feature list; it is a structural commitment.

**(b) AI deployed where it earns its place.** The platform does not let AI answer. The Field Mentor is a Socratic companion bound by hard guardrails (CLAUDE.md §9). The AI Judge evaluates — it does not grade. Final summative authority remains with the teacher, every time. This is AI-TPACK in operational form, not slogan form.

**(c) PDPA-first, UDL-accessible, mobile-first by default.** Bilingual consent, granular flags, a user-facing My Data panel, 90-day auto-deletion, and audit logs. Reduced-motion respect, high-contrast mode, dyslexia-friendly font, and TTS shipped on every page. Tested down to 360 px.

## 3. What the judges will see

Live demo URL: <https://futureproof.yungie.one>
Demo accounts (one per proficiency band): see attached separate document — credentials are kept off this narrative for security.

End-to-end demo flow:

1. Landing page — design system + the SDG ticker.
2. Sign-up + PDPA bilingual consent.
3. Readiness Check (12-minute four-section diagnostic, scored on the spot).
4. Operator avatar (photo or webcam → Stability.ai stylized portrait).
5. Mission Select wheel (all 17 SDGs → 3 Claude-generated scenarios with Local Lens).
6. Mission 01 RECON → Mission 06 FORGE walk-through.
7. Pitch Capsule Studio (5 panels + recorded voice + PDF export).
8. Hall of Excellence (curated public gallery).
9. Admin Command Platform (teacher dashboard + PDPA Center).

## 4. Pedagogical spine

The platform is built on **two underlying frameworks** — PICRAT (Kimmons, Graham & West, 2020) and AI-TPACK (Mishra & Koehler, AI-extended). Every other framework named below is *supporting*: it delivers the specifics that PICRAT and AI-TPACK demand. See [`docs/theoretical-grounding.md`](docs/theoretical-grounding.md) for the per-feature classification.

**(a) PICRAT — where the platform sits in technology integration.** PICRAT classifies any tech-mediated learning activity on two axes: the student's relationship to the technology (Passive → Interactive → Creative) and the teacher's use of the technology (Replaces → Amplifies → Transforms). Most edtech sits at Passive-Replaces — a digital textbook. FUTUREPROOF rejects that floor. Mission 01 starts at Interactive-Amplifies; Mission 04 reaches Creative-Transforms; the Pitch Capsule is full C-T. The platform never operates below I-A.

**(b) AI-TPACK — the boundary between AI and human work.** AI handles consistency, scale, and formative feedback. Humans handle cultural authenticity, summative grading, voice recognition, and intervention judgment. The boundary is enforced in code — Field Mentor system prompt, four-tier judging structure, Cloud Function gates — not just in policy.

**Supporting frameworks (delivering specifics):**

- Krashen's Input Hypothesis (i + 1) — adaptive content per `learnerProfile`.
- Bloom's Revised Taxonomy — six missions, six cognitive levels, structurally enforced.
- Lave & Wenger's Situated Cognition — three roles with asymmetric information access.
- Vygotsky / Bruner / Wood — token-purchased scaffolding (not free, not infinite).
- Hattie's Visible Learning — formative AI feedback on every decision.
- Mayer's CTML / CAST UDL 3.0 — multimodal Pitch Capsule + accessibility floor.
- Kohlberg + Critical Pedagogy — Mission 05 ethical defense under cross-examination.
- UNESCO ESD — SDGs as the curricular backbone, not the topic of the day.

The two-lens audit is the platform's design test: any feature must classify on the PICRAT matrix above Passive-Replaces *and* respect the AI-TPACK boundary. Features that fail either test are removed.

## 5. What sets this submission apart

- **Self-contained artifact** — single repo, single deploy, single open-web tech stack (HTML / Tailwind / Firebase / Claude API / Stability.ai).
- **Cost-conscious** — no native apps, no proprietary CMS, no per-seat licensing.
- **Replicable** — every Thai institution can run this on a free Netlify / Firebase tier with one Anthropic API key and one Stability.ai key.
- **CC BY-NC 4.0** — free for educational and non-commercial use with attribution.

## 6. Implementation honesty

This 20-day sprint built the platform to **functional preview** state. What that means concretely:

- Every page renders, every flow is wired, every API contract exists.
- Firebase Auth + Realtime DB + Storage are fully scaffolded (paths, security rules, init code) and connect once the Firebase project is provisioned and `config.local.js` is created from `config.example.js`.
- The Claude API and Stability.ai integrations are server-side proxied via Netlify Functions; both run end-to-end once the env vars `ANTHROPIC_API_KEY` and `STABILITY_API_KEY` are set.
- Pre-Claude scoring uses a documented heuristic in `src/assessment.js`; the migration path to Claude rubric calls is in place (interface stays, implementation swaps).
- Live demo data: three demo students at three proficiency bands and three sample Pitch Capsules (`scripts/seed-sample-data.js`) — populates the Hall of Excellence for judges.

The judges will see a working pilot environment. Real cohort use is the next milestone — first-pilot run targeted for academic year 2026 Term 1.

## 7. What's next if we win

- First-cohort pilot at MUIC, Term 1, 2026.
- Open-source the platform (CC BY-NC 4.0) for any Thai institution to adopt.
- Develop a Thai-medium variant for institutions where English-primary is too high a bar.

## 8. Acknowledgments

The platform is built on the open web. We are grateful to Anthropic for the Claude API, Stability.ai for image generation, the Firebase team for the underlying infrastructure, and the broader open-source community.

The pedagogical scaffolding draws on the published work of Krashen, Bloom & Anderson & Krathwohl, Vygotsky, Wood & Bruner & Ross, Lave & Wenger, Hattie, Mayer, Mishra & Koehler, Kohlberg, Freire, Wiggins, Black & Wiliam, Schön, Toulmin, García, Deci & Ryan, Zimmerman, Flavell, Paivio, Papert, Hymes, Canale & Swain, the CAST UDL framework, and UNESCO ESD.

---

*Submitted with care. The world is waiting.*

— Aj. Yungie
