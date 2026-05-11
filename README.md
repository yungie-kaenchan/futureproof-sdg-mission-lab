# FUTUREPROOF: SDG Mission Lab

**ภารกิจเอสดีจีเพื่ออนาคต**

An AI-powered gamified learning platform where undergraduate teams investigate UN Sustainable Development Goals — in English. Built for the SPU Tech Creative Learning Awards 2026.

**Submission deadline:** May 30, 2026 · **Domain:** `futureproof.yungie.one`

---

## Status

The 20-day sprint (May 10–30) is functionally complete. Every flow has a working path; every server-side validation point has a Cloud Function; every page is a11y-instrumented. The remaining items are **deployment** (you), **video recording** (you), and **Thai translations** (you). The platform does not collect data for research — no IRB review needed.

See [`DEPLOY.md`](DEPLOY.md) for the step-by-step deploy runbook.

---

## Repo map

```
futureproof-project/
├── CLAUDE.md                    Project context — read first, every session
├── DEPLOY.md                    Deployment runbook (Netlify + Firebase)
├── ROADMAP.md                   20-day sprint plan with completion status
├── README.md                    This file
│
├── index.html                   Landing page
├── styles.css                   Compiled Tailwind (rebuilt by npm run build)
├── tailwind.config.js           Theme tokens
├── package.json                 npm scripts
├── netlify.toml                 Netlify config (build + functions dir)
├── firebase.json                Firebase config (rules + functions)
├── config.example.js            Template — copy to config.local.js (gitignored)
│
├── pages/
│   ├── signup.html              Step 1 — sign-up
│   ├── signin.html              Returning-user sign-in
│   ├── consent.html             Step 2 — bilingual PDPA consent (TH/EN)
│   ├── assessment.html          Step 3 — Mission Readiness Check (4 sections)
│   ├── avatar.html              Step 4 — Stability.ai operator avatar
│   ├── mission-select.html      Step 5 — 17-SDG wheel + scenario picker
│   ├── mission-shell.html       Shared shell driving Missions 01–06
│   ├── mission-01.html…06.html  Thin redirects → mission-shell?m=N
│   ├── studio.html              Pitch Capsule Studio (5 panels + audio + PDF)
│   ├── reflections.html         Voice of the Learner / Time Capsule
│   ├── portfolio.html           Personalized Learning Portfolio
│   ├── my-data.html             PDPA self-service panel
│   ├── hall-of-excellence.html  Public gallery
│   └── admin/dashboard.html     Admin Command Platform (7 modules)
│
├── src/
│   ├── input.css                Tailwind source + custom components
│   ├── firebase-init.js         Browser-side Firebase init + typed paths
│   ├── auth.js                  Auth flow controller, flow-state persistence
│   ├── consent.js               PDPA consent submission (5 granular flags)
│   ├── assessment.js            Item bank + scoring engine + CEFR mapping
│   ├── avatar.js                Webcam + file capture, Stability proxy call
│   ├── scenario.js              SDG scenarios (live Claude + 17-SDG fallback bank)
│   ├── mission-engine.js        Finite-state engine for all 6 missions
│   ├── mission-phases.js        Custom phase handlers (vocab, sources, tribunal…)
│   ├── tokens.js                Insight Token ledger + shop catalog
│   ├── judge.js                 AI Judge client (proxy + heuristic fallback)
│   ├── field-mentor.js          Socratic chat (10/mission limit)
│   ├── studio.js                Pitch Capsule helpers (audio, PDF, save)
│   ├── reflections.js           Voice of the Learner recording + persistence
│   ├── portfolio.js             Portfolio data assembly + export
│   ├── sdg-theme.js             SDG-matched accent palette
│   ├── integrity-meter.js       SVG arc gauge bound to teams/$tid/integrityScore
│   ├── tour.js                  First-time landing-page intro overlay
│   └── a11y.js                  UDL toolbar (text size, contrast, dyslexia, pace, TTS)
│
├── api/                         Netlify Functions (serverless)
│   ├── claude-proxy.js          Multiplexed Claude endpoint (5 kinds)
│   ├── stability-proxy.js       Avatar generation
│   └── README.md                Endpoint table + env-var inventory
│
├── functions/                   Firebase Cloud Functions
│   ├── index.js                 9 functions: onUserCreate, awardTokens, …
│   └── package.json             Separate node_modules
│
├── docs/
│   ├── innovation-concept.md    Submission showpiece (17 sections)
│   ├── theoretical-grounding.md 11 frameworks → feature mapping
│   ├── firebase-schema.md       14 collections + indexes + retention
│   ├── firebase-security-rules.md Deny-by-default rules + 14 test scenarios
│   ├── dpia-framework.md        PDPA Data Protection Impact Assessment
│   ├── teacher-guide.md         Practical manual for teachers
│   ├── submission-narrative.md  Cover narrative for SPU submission
│   └── rubrics/
│       ├── rubric-a-pitch-capsule.md      Teacher holistic (final grade)
│       ├── rubric-b-mission-decision.md   AI Judge logic per mission
│       ├── rubric-c-language.md           CEFR pre/post growth
│       └── rubric-d-soft-skills.md        Soft skill demonstration
│
└── scripts/
    ├── inject-config.js         Build-time Firebase config injector
    └── seed-sample-data.js      Demo cohort populator (3 students, 3 teams)
```

---

## Quick start (local dev)

```bash
npm install
cp config.example.js config.local.js   # then fill in your Firebase web-app config
npm run dev                              # Tailwind watcher in one terminal
npx http-server . -p 8000                # static server in another terminal
```

Visit <http://localhost:8000>. Note: Netlify Functions (Claude / Stability proxies) and Firebase Cloud Functions don't run on `http-server`. The pages detect this and surface graceful "not connected" warnings rather than crashing. To exercise the full stack locally, install `netlify-cli` and run `netlify dev`.

---

## Deploy

See [`DEPLOY.md`](DEPLOY.md) — the runbook covers Firebase provisioning, Netlify env vars, Cloud Function deployment, security rules, demo seeding, and the Day-20 verification checklist.

---

## Architecture (one-liner)

Static site (HTML/Tailwind/JS, hosted on Netlify) talks to two clouds:
- **Netlify Functions** for the Claude API + Stability.ai proxies (env-keyed).
- **Firebase** for Auth, Realtime DB, Storage, and Cloud Functions that gate admin paths defined in the security rules.

API keys never appear in the browser. Public Firebase config keys (apiKey, etc.) are public by design and are protected by the security rules.

---

## Visual identity (locked, see CLAUDE.md §12)

**Aesthetic:** Mission Control × Editorial Elegance.
**Background:** bright white (changed from obsidian black per Aj. Yungie's review).
**Accents:** gold (`#A88A4A` primary, `#C9A961` glow) + crimson (`#A82424`) + the locked-SDG accent (set per team).
**Type:** Cormorant Garamond (display) · Cinzel (mission titles) · DM Sans (body, console labels) · JetBrains Mono (data values) · IBM Plex Sans Thai (Thai metalanguage).

---

## Tone rule (saved as feedback memory)

UI strings — buttons, labels, status bar, microcopy — are **warm and conversational** for undergraduates aged 18–25. Content — academic concept docs, mission descriptions, rubrics — stays **academic**. Apply the split before writing any new string.

---

## Pedagogical spine

The platform is built on **two underlying frameworks**. Everything else is supporting.

- **PICRAT** (Kimmons, Graham & West) — classifies every activity on the Passive→Interactive→Creative × Replaces→Amplifies→Transforms matrix. FUTUREPROOF never operates below Interactive-Amplifies; Mission 06 reaches Creative-Transforms.
- **AI-TPACK** (Mishra & Koehler, AI-extended) — sets the boundary between AI work (consistency, scale, formative feedback) and human work (cultural authenticity, summative grading, voice). The boundary is enforced in code, not policy.

Supporting frameworks (delivering specifics): Krashen i+1 · Bloom's Revised Taxonomy · Vygotsky ZPD + Bruner scaffolding · Lave & Wenger Situated Cognition · Hattie Visible Learning · Mayer CTML · Kohlberg + Critical Pedagogy · CAST UDL 3.0 · UNESCO ESD · CLT / Translanguaging.

Full per-feature mapping in [`docs/theoretical-grounding.md`](docs/theoretical-grounding.md).

---

## Compliance defaults

- **PDPA-first** — bilingual consent, granular flags, My Data self-service, 90-day auto-deletion, audit logs, encryption.
- **UDL-accessible** — TTS, adjustable text size, high-contrast mode, dyslexia font, Cognitive Pace Mode, keyboard nav, prefers-reduced-motion respect, ARIA throughout.
- **Mobile-first** — Tailwind responsive utilities from 360 px up.

---

## License

CC BY-NC 4.0 — free to use, adapt, and share for educational and non-commercial purposes with attribution. Commercial use is not permitted.

---

## Credits

Designed and developed by **Aj. Yungie (Dr. Payungsak Kaenchan)**, Faculty of Liberal Arts, Mahidol University.

Submitted to **Sripatum University (SPU) Tech Creative Learning Awards 2026** — โครงการประกวดนวัตกรรมการสอนในยุคดิจิทัล. Royal trophy from HRH Princess Maha Chakri Sirindhorn.

**© 2026 FUTUREPROOF | SDG Mission Lab**
