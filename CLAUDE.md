# CLAUDE.md — FUTUREPROOF Project Context

This document is the authoritative context file for Claude Code working on the FUTUREPROOF: SDG Mission Lab project. It captures every architectural decision, pedagogical framework, design specification, and roadmap milestone established in collaboration with Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan).

**Read this file fully before making any decisions on this project.**

---

## 1. Project Identity

**Full Name:** FUTUREPROOF: SDG Mission Lab
**Thai Tagline:** ภารกิจเอสดีจีเพื่ออนาคต
**Tagline (English):** "Where English Meets the World's Most Urgent Challenges"
**Author:** Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan), Faculty of Liberal Arts, Mahidol University & Thammasat University
**Domain:** Will be hosted at `futureproof-sdgs-lab.netlify.app` (Netlify subdomain of his existing brand)

---

## 2. Critical Deadlines

| Date | Milestone |
|------|-----------|
| **May 10, 2026** | Project kickoff — Day 1 complete |
| **May 30, 2026** | **Submission deadline (CANNOT MISS)** |
| June 7, 2026 | First round results announced |
| June 14, 2026 | Final presentation and awards |

**Competition:** SPU (Sripatum University) Tech Creative Learning Awards 2026 — โครงการประกวดนวัตกรรมการสอนในยุคดิจิทัล. Royal trophy from HRH Princess Maha Chakri Sirindhorn. National-level competition.

We have **20 days from May 10** to deliver a competition-winning submission.

---

## 3. The Innovation Concept (One-Sentence)

FUTUREPROOF is a self-contained AI-powered gamified learning platform where undergraduate teams undertake adaptive missions across the UN Sustainable Development Goals — building English proficiency, critical thinking, ethical reasoning, and professional design skills inseparably and at once, culminating in a Pitch Capsule artifact.

---

## 4. Pedagogical Foundations (Non-Negotiable)

The platform is built on **two underlying frameworks** that govern every design decision. All other frameworks listed below are *supporting* — they fill in the specifics that the two underlying frameworks demand.

### 4.1 Underlying frameworks

| Framework | What it governs | Where it shows up |
|-----------|-----------------|-------------------|
| **PICRAT** (Kimmons, Graham & West, 2020) | Where each activity sits on the **P**assive→**I**nteractive→**C**reative × **R**eplaces→**A**mplifies→**T**ransforms matrix. Every mission targets at least the **Interactive-Amplifies** cell; the Pitch Capsule (Mission 06) targets **Creative-Transforms**. | Mission architecture, role design, Studio, Hall of Excellence |
| **AI-TPACK** (Mishra & Koehler, extended) | The **boundary between what AI handles and what humans handle**. AI handles consistency, scale, formative feedback. Humans handle cultural authenticity, summative grading, voice recognition, intervention judgment. | Field Mentor guardrails, four-tier judging, Admin Command Platform, every Claude proxy system prompt |

These two frameworks are **load-bearing**: removing or weakening either collapses the architecture. PICRAT keeps the platform from drifting toward Passive-Replaces edtech (digital textbook, drill-and-skill). AI-TPACK keeps it from drifting toward AI-as-tutor (productive struggle erased, teacher displaced).

### 4.2 Supporting frameworks

These deliver the specifics PICRAT and AI-TPACK demand:

| Framework | Application |
|-----------|-------------|
| **Krashen's Input Hypothesis (i+1)** | Adaptive content generation based on competency profile |
| **Bloom's Revised Taxonomy** | Six missions map to six cognitive levels (Remember → Create) |
| **Lave & Wenger's Situated Cognition** | Professional roles with asymmetric information |
| **Vygotsky's ZPD + Wood/Bruner/Ross Scaffolding** | Token economy gates access to scaffolding tools |
| **Hattie's Visible Learning** | AI-powered formative feedback on every decision |
| **Mayer's Cognitive Theory of Multimodal Learning** | Pitch Capsule with text, image, audio integration |
| **Kohlberg's Moral Development + Critical Pedagogy** | Mission 5 ethical cross-examination |
| **Constructivism (Piaget, Bruner)** | Decision-consequence branching |
| **CAST UDL Guidelines 3.0** | Multimodal representation, action, engagement |
| **UNESCO Education for Sustainable Development** | SDG framework as content backbone |

### 4.3 The auditable test

For any new feature, ask in this order:

1. **PICRAT cell.** Where on the matrix does this sit? If the answer is Passive-Replaces, redesign or reject.
2. **AI-TPACK boundary.** What does AI do here, what does the human do, and is that boundary defensible? If AI replaces human judgment that should remain human, redesign or reject.
3. **Supporting framework.** Which of §4.2 justifies the specifics? If none, the feature is decoration — cut it.

---

## 5. Six-Mission Architecture (Bloom's-Aligned)

Each mission has a specific cognitive level, language focus, decision points, and AI evaluation criteria.

### Mission 01 — RECON (Remember)
- **Cognitive Level:** Remember / Identify
- **Activities:** Intel gathering, vocabulary recognition, source evaluation, fact identification
- **Decision Point:** Choose 2 of 4 intelligence sources
- **Adaptive Element:** Reading difficulty adjusts to student responses
- **AI Evaluation:** Factual accuracy, vocabulary recognition, strategic source selection

### Mission 02 — DECODE (Understand)
- **Cognitive Level:** Understand / Comprehend
- **Activities:** Audience-specific explanation, data interpretation, register shifting
- **Decision Point:** Resolve conflicting information from sources
- **Adaptive Element:** Audience assigned by AI changes register demands
- **AI Evaluation:** Comprehension depth, register appropriateness, justification quality

### Mission 03 — DEPLOY (Apply)
- **Cognitive Level:** Apply
- **Activities:** Real-time crisis response, written communications, strategy choice
- **Decision Point:** Choose response strategy from 3 AI-generated options
- **Adaptive Element:** Crisis event generated based on Mission 1-2 decisions
- **AI Evaluation:** Language quality, strategic coherence, consequence awareness

### Mission 04 — DISSECT (Analyze)
- **Cognitive Level:** Analyze
- **Activities:** Comparative analysis, stakeholder mapping, root cause identification
- **Decision Point:** Identify single most critical leverage point with evidence
- **Adaptive Element:** AI generates counterarguments to chosen leverage point
- **AI Evaluation:** Analytical depth, evidence quality, counterargument handling

### Mission 05 — TRIBUNAL (Evaluate)
- **Cognitive Level:** Evaluate
- **Activities:** Ethical dilemma resolution, position defense, AI cross-examination
- **Decision Point:** Final ethical judgment that frames Pitch Capsule
- **Adaptive Element:** AI cross-examination adapts to response quality
- **AI Evaluation:** Ethical reasoning, language precision, argumentation under pressure

### Mission 06 — FORGE (Create)
- **Cognitive Level:** Create
- **Activities:** Pitch Capsule creation in built-in Studio
- **Output:** 5-panel artifact with narrated audio
- **Adaptive Element:** Token-purchased upgrades available
- **Final Evaluation:** Teacher grades using Rubric A (holistic)

### The Pitch Capsule (Final Output)
Five panels, each panel led by one professional role:
1. **THE CRISIS** — Problem statement with data (led by Research Analyst)
2. **THE JOURNEY** — Decisions and lessons learned (collaborative)
3. **THE INSIGHT** — Core finding/argument (led by Ethics Officer)
4. **THE SOLUTION** — Proposed action (led by Communications Director)
5. **THE VOICE** — Recorded narration overlay (collaborative)

Exportable as PDF + audio. Eligible for Hall of Excellence.

---

## 6. Professional Role System (Situated Learning)

Teams of 3 students assign one role each. Each role has unique abilities and asymmetric information access — students MUST communicate in English to share knowledge.

| Role | Special Ability | Language Focus | Information Access |
|------|----------------|----------------|---------------------|
| **🔬 Research Analyst** | +1 free data source per mission | Academic/technical English, hedging | Raw data, research summaries |
| **📢 Communications Director** | Preview stakeholder reactions (1×/mission) | Persuasive writing, audience adaptation | Stakeholder profiles, media reports |
| **⚖️ Ethics & Policy Officer** | Invoke ethical framework reference (1×/mission) | Argumentative, conditional, evaluative | Policy docs, ethical precedents |

**Solo players:** Rotate through roles; AI plays NPC consultants.
**Pairs:** Pick 2 of 3 roles; AI provides slightly more info per role.

---

## 7. The Token Economy

**Tokens are called "Insight Tokens."**

### Earning
| Action | Tokens |
|--------|--------|
| Accurate intel gathering | +5 to +15 |
| Strong comprehension demonstration | +5 to +15 |
| High-quality written communication | +10 to +20 |
| Surviving AI cross-examination well | +15 to +25 |
| Weak reasoning or factual errors | −5 to −10 |
| Ethical blind spots | −5 to −10 |
| Bonus: Exceptional vocabulary | +5 |
| Bonus: Counterargument consideration | +10 |

### Spending (The Shop)
| Item | Cost | Effect |
|------|------|--------|
| 🔍 Expert Consultant | 15 | Strategic AI question per mission |
| 📝 Language Coach Session | 10 | Detailed AI feedback on a draft |
| 🎨 Premium Design Template | 20 | Upgraded Pitch Capsule layout |
| 💡 Hint Reveal | 5 | Unlock hidden data point |
| 🔄 Decision Replay | 25 | Redo one decision point |
| 🎤 Pronunciation Drill | 10 | AI-guided pronunciation practice |

---

## 8. Rank Progression

| Rank | Requirement | Unlocks |
|------|------------|---------|
| Cadet | Complete assessment | Basic mission access |
| Field Agent | Complete Missions 1-2 | Discussion facilitator AI |
| Analyst | Complete Mission 3 | Data visualization tools |
| Strategist | Complete Mission 4 | Expert consultant access |
| Director | Complete Mission 5 | Full Creation Studio |
| Ambassador | Submit Pitch Capsule | Public showcase, peer review |

---

## 9. Field Mentor (Team AI Companion) — STRICT GUARDRAILS

The Field Mentor is a **Socratic companion**, NOT a content tutor. Without these guardrails, the chatbot will undermine the entire pedagogical architecture.

### What the Field Mentor CAN Do
- Ask Socratic questions that prompt team discussion
- Provide language support ONLY (vocabulary, grammar, register)
- Offer emotional encouragement
- Suggest which team role might address a question
- Facilitate team reflection between phases
- Model professional English

### What the Field Mentor CANNOT Do
- Provide content answers about the SDG topic or scenario
- Evaluate student decisions (that's the AI Judge's role)
- Reveal information that should be earned
- Predict consequences of decisions
- Replace Expert Consultant strategic insights
- Resolve ethical dilemmas

### System Prompt Pattern
```
You are the Field Mentor for [Team Name]. You are a supportive senior
colleague helping a team through their mission. You NEVER provide content
answers about the mission scenario. You NEVER evaluate their decisions.
You only:
1. Ask reflective questions that promote team discussion
2. Provide English language support (vocabulary, grammar, register)
3. Offer encouragement and emotional support
4. Suggest which team role might address a question
5. Model professional English communication

If asked for content help, redirect: "That's something your team needs to
work through together. What does your [role] member think?"

If asked for decisions, redirect: "Your team's judgment is what matters
here. What factors are you weighing?"

Always respond in supportive, professional English appropriate to the
team's competency level [INSERT LEVEL FROM PROFILE].
```

### Usage Constraints
- Daily query limit: ~10 messages per mission
- All interactions logged on Teacher Dashboard
- Free for language support; tokens still required for Expert Consultant

---

## 10. Four-Tier Hybrid Judging System

| Tier | Judge | Role | When |
|------|-------|------|------|
| 1 | **AI Judges** | Real-time formative evaluation | During every mission |
| 2 | **Peer Judges** | Cross-team review with rubrics | After Mission 4 |
| 3 | **Teacher Judges** | Holistic, summative, authoritative | Final Pitch Capsule grading |
| 4 | **External Judges** | Authentic audience recognition | Pitch Showcase event |

The teacher's evaluation is the **final official grade**. AI provides scale and consistency. Peers build metacognition. External judges provide authentic audience.

---

## 11. SDG Selection + Local Lens

### Entry Point
Students see all 17 SDGs in a visual "Mission Selection Wheel." They select one. The Claude API generates **3 contextualized sub-problem scenarios** within that SDG, tailored to be current, relevant, debatable, and Thai-contextualized.

### Local Lens (Mandatory)
Every scenario includes a toggle-able **Thai/ASEAN contextualization** layer. Generated by Claude API with strict prompting for Thai cultural authenticity (relevant Thai ministries, Thai stakeholder organizations, current Thai policy debates).

### Scenario Generation System Prompt Pattern
```
Generate a sub-problem scenario for SDG [N] that is:
- Current and debatable (not solved)
- Relevant to undergraduate university students
- Thai-contextualizable (mention Thai-specific factors)
- Pedagogically rich (multiple stakeholders, ethical layers)
- Source-grounded (reference real organizations/data, no fabrication)

Format: [Title], [Setting], [Core Tension], [Stakeholders], [Decision Point]

Difficulty calibrated to: [TEAM CEFR LEVEL] / [ANALYTICAL SCORE]
```

---

## 12. Visual Identity (LOCKED — DO NOT CHANGE)

### Aesthetic Direction
**Mission Control × Editorial Elegance** — A console interface with the gravitas of a serious editorial publication. Not a website. A command interface.

### Color System
| Token | Hex | Role |
|-------|-----|------|
| `obsidian` | `#0A0A0B` | Primary background |
| `console-black` | `#141416` | Card surfaces |
| `panel-line` | `#1F1F23` | Borders, dividers |
| `gold-primary` | `#C9A961` | Primary accent |
| `gold-glow` | `#E8C77A` | Hover states |
| `crimson-deep` | `#7B1B1B` | Critical alerts |
| `crimson-glow` | `#A82424` | Active alerts |
| `bone-white` | `#F4F1EA` | Body text |
| `pearl-white` | `#FFFFFF` | Headlines |
| `console-dim` | `#8B8B92` | Secondary text |

When SDG is selected, an SDG-matched accent palette is applied to mission-specific UI (progress bars, badges) — but gold and crimson remain structural accents.

### Typography
- **Display headings:** Cormorant Garamond (Google Fonts) — light weight, generous letter-spacing
- **Mission titles:** Cinzel (Google Fonts) — all caps, ceremonial
- **Body text:** DM Sans (Google Fonts) — 17-18px base, line-height 1.7
- **Mono / data:** JetBrains Mono (Google Fonts) — for technical labels
- **Thai metalanguage:** IBM Plex Sans Thai (Google Fonts) — pairs with DM Sans

### Console Interface Elements
- Persistent navigation rail on the left edge (mission stages, rank indicator)
- Top status bar (team name, current mission, tokens, integrity meter, time)
- Subtle grid lines as background texture
- Bracketed UI labels: `[ MISSION 01 // RECON ]`
- Glow effects: gold for opportunities, crimson for risks
- Animated decision moments
- Footer command line showing shortcuts

---

## 13. Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, Tailwind CSS 3.4 (compiled, NOT CDN), vanilla JS |
| **Backend** | Firebase (Auth, Realtime Database, Storage) |
| **AI Engine** | Anthropic Claude API (Sonnet for most tasks) |
| **Avatar Generation** | Stability.ai API (image-to-image with character style) |
| **Voice** | Web Speech API (recording + transcription), Web Audio API |
| **Hosting** | Netlify (deployed at `futureproof-sdgs-lab.netlify.app`) |
| **Build** | npm + Tailwind CLI |

### CRITICAL: No Tailwind CDN
The project uses Tailwind CLI to compile a static `styles.css` file. Never use the Tailwind CDN — it produces production warnings and is slower. The build is configured in `netlify.toml` to run automatically on Git deploys.

---

## 14. Language Strategy

**English primary with Thai metalanguage.**

- All mission content, decisions, and AI interactions are in English
- Thai used ONLY for: navigation labels, UI instructions, accessibility helpers, consent forms, key reflections
- Optional "Thai Support Mode" for lower-proficiency students (toggleable)
- Use IBM Plex Sans Thai for all Thai text — pairs cleanly with DM Sans

---

## 15. Compliance Requirements (Non-Negotiable)

### PDPA (Thailand Personal Data Protection Act)
- Bilingual consent flow at sign-up (Thai + English)
- Granular consent (basic profile / photo / voice / decisions)
- "My Data" panel for student review and deletion requests
- 90-day auto-deletion post-course
- Audit logs for admin access
- Encryption in transit and at rest
- DPIA document required for submission

### UDL (Universal Design for Learning)
- All text content has TTS audio alternative
- Adjustable font size, dyslexia-friendly font option
- High-contrast mode, color-blind safe palettes
- Keyboard navigation throughout
- ARIA labels for screen readers
- Captioning on all audio
- "Cognitive Pace Mode" removes time pressure
- Multiple response modes (text, voice, drawing where applicable)

### Mobile-First Responsive
- All breakpoints from 360px upward
- Tailwind responsive utilities throughout
- Touch-optimized for thumb-reach zones
- PWA capabilities (add to home screen)
- Test on actual mobile devices, not just desktop browser tools

---

## 16. The Admin Command Platform (Teacher Dashboard)

Seven modules required:

1. **User Management** — CRUD on student/teacher accounts, view profiles, manage classes, bulk import
2. **Mission Architect** — Add/edit SDG sub-scenarios, ethical dilemmas, decision branches; preview before deploy
3. **Analytics Dashboard** — Engagement, decision patterns, competency tracking, language metrics, soft skills, Pitch Capsule trends
4. **Content Moderation Console** — Review AI content, moderate Hall of Excellence
5. **PDPA Compliance Center** — Track consent, process data subject requests, audit logs
6. **System Configuration** — API key management, model selection, difficulty params
7. **Hall of Excellence Curator** — Review/feature Pitch Capsules, organize gallery

All data exportable as CSV or PDF for institutional reporting.

---

## 17. Other Required Features (Don't Forget)

- **NPC Stakeholder Interviews** — Voice/text interviews with AI role-playing as community elder, executive, etc. In Missions 2 and 4. Time-limited.
- **Comms Interceptor** — Random crisis events mid-mission requiring snap response
- **Mission Dossier** — Living portfolio that builds in real time as decisions are made
- **Integrity Meter** — Persistent visual gauge of team's ethical consistency
- **Time Capsule Reflection** — Pre-mission and post-mission voice recordings (30 sec each)
- **Hall of Excellence** — Public gallery of curated Pitch Capsules (with consent)
- **Voice of the Learner** — Reflection module at 3 checkpoints (mid, end, +30 days)
- **Personalized Learning Portfolio** — Generated post-Mission 6 with future plan

---

## 18. Assessment Rubric Suite (To Be Drafted)

Four rubrics required for the submission:

- **Rubric A:** Pitch Capsule Holistic Evaluation (Teacher Use)
- **Rubric B:** Mission Decision Quality (AI Judge Logic)
- **Rubric C:** CEFR-Aligned Language Development (Pre/Post Comparison)
- **Rubric D:** Soft Skills Demonstration (Critical Thinking, Analytical, Collaboration, Ethics, Decision-Making)

---

## 19. Project Structure

```
futureproof/
├── CLAUDE.md                   # THIS FILE — project context
├── README.md                   # User-facing documentation
├── ROADMAP.md                  # Detailed 20-day plan (to be created)
├── ARCHITECTURE.md             # Technical architecture (to be created)
├── index.html                  # Landing page (Day 1 — DONE)
├── styles.css                  # Compiled Tailwind (15 KB)
├── tailwind.config.js          # Theme: colors, fonts, animations
├── package.json                # npm + Tailwind dependency
├── netlify.toml                # Netlify build config
├── .gitignore                  # Excludes node_modules
├── src/
│   └── input.css               # Tailwind source with components
├── pages/                      # (to be created)
│   ├── signup.html             # Day 3
│   ├── consent.html            # Day 3 — PDPA bilingual consent
│   ├── assessment.html         # Day 4 — Competency diagnostic
│   ├── avatar.html             # Day 5 — Avatar creator
│   ├── mission-select.html     # Day 6 — SDG wheel
│   ├── mission-01.html         # Day 9 — RECON
│   ├── mission-02.html         # Day 10 — DECODE
│   ├── mission-03.html         # Day 11 — DEPLOY
│   ├── mission-04.html         # Day 11 — DISSECT
│   ├── mission-05.html         # Day 12 — TRIBUNAL
│   ├── studio.html             # Day 13 — FORGE / Pitch Capsule Studio
│   ├── hall-of-excellence.html # Day 16
│   └── admin/                  # Day 15-16 — Admin dashboard
├── assets/
│   ├── fonts/                  # Local font fallbacks if needed
│   ├── images/                 # SDG icons, illustrations
│   └── audio/                  # UI sound effects (subtle)
├── api/                        # Netlify Functions (serverless)
│   ├── claude-proxy.js         # Claude API proxy (hide API key)
│   ├── stability-proxy.js      # Stability.ai proxy
│   └── firebase-helpers.js     # Database helpers
├── docs/                       # Submission documents
│   ├── innovation-concept.md   # Day 7 — Submission narrative
│   ├── theoretical-grounding.md # Day 7 — Pedagogical mapping
│   ├── teacher-guide.md        # Day 18 — Teacher onboarding
│   ├── dpia.md                 # Day 18 — Data Protection Impact Assessment
│   └── rubrics/                # Day 14 — Four rubrics
└── scripts/                    # Build helpers
```

---

## 20. 20-Day Roadmap Summary

### Week 1 (May 10-16): Foundation
- ✅ Day 1 (May 10): Landing page, design system, build pipeline
- Day 2 (May 11): Innovation Concept Document, Theoretical Grounding Map, Firebase setup
- Day 3 (May 12): Sign-up flow, PDPA consent (bilingual)
- Day 4 (May 13): Competency assessment diagnostic
- Day 5 (May 14): Avatar creation with Stability.ai
- Day 6 (May 15): SDG selection wheel, scenario generation
- Day 7 (May 16): Polish, Documentation Track checkpoint

### Week 2 (May 17-23): Mission Engine
- Day 8 (May 17): Mission shell, role assignment, token economy
- Day 9 (May 18): Mission 1 (RECON) full build
- Day 10 (May 19): Field Mentor with guardrails
- Day 11 (May 20): Missions 2-3 with branching
- Day 12 (May 21): Missions 4-5, NPC interviews
- Day 13 (May 22): Mission 6 (FORGE) — Pitch Capsule Studio
- Day 14 (May 23): Studio audio recording, PDF export, polish

### Week 3 (May 24-30): Polish + Submit
- Day 15 (May 24): Admin Command Platform, Hall of Excellence
- Day 16 (May 25): Mobile responsive verification, accessibility audit
- Day 17 (May 26): Sample data, end-to-end testing, demo seeding
- Day 18 (May 27): Video recording, submission narrative finalization
- Day 19 (May 28): All documentation finalized (Thai translations)
- Day 20 (May 29): Buffer day for fixes
- **May 30: SUBMIT BY MORNING**

---

## 21. Submission Package (Required for May 30)

| Document | Lead | Status |
|----------|------|--------|
| Innovation Concept Document (10-12 pages, EN+TH) | Dr. Payungsak Kaenchan + Claude | Day 2-7 |
| Theoretical Grounding Map (1-2 page visual) | Claude drafts | Day 2 |
| Teacher's Guide (10-15 pages, TH primary) | Claude drafts | Day 18 |
| Assessment Rubric Suite (4 rubrics) | Claude drafts | Day 14 |
| Data Protection Impact Assessment (4-6 pages, TH legal) | Claude framework | Day 18 |
| Video Demonstration (5-7 min, EN narration + TH subs) | Dr. Payungsak Kaenchan records | Day 18 |
| Live Platform URL with Demo Account | Dr. Payungsak Kaenchan deploys | Throughout |
| Submission Narrative (2-3 pages, TH primary) | Dr. Payungsak Kaenchan writes | Day 18 |

---

## 22. Working Conventions

### Coding Style
- **HTML:** Semantic, accessible, Tailwind utility classes for layout, custom component classes for repeated patterns
- **CSS:** Use CSS variables (defined via Tailwind theme), avoid !important, use `@layer` directives in input.css
- **JavaScript:** Vanilla JS, no framework. ES2020+ syntax. Async/await over callbacks. Defensive coding.
- **Comments:** Minimal in code. Detailed in CLAUDE.md and architectural docs.

### File Naming
- HTML: `kebab-case.html`
- JS: `kebab-case.js`
- CSS classes: `kebab-case`
- JS variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Git Conventions (when version controlled)
- Commit messages: `[Day N] Brief description`
- Branch from main for features: `feature/mission-1-recon`
- Squash merge to main when complete

### API Keys (NEVER commit)
- Use `.env` files locally
- Use Netlify environment variables in production
- Use serverless functions to proxy API calls (hide keys from browser)
- Add to `.gitignore`: `.env`, `.env.local`

### Performance Targets
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Mobile usable on 3G connections

---

## 23. Dr. Payungsak Kaenchan's Working Style (Important Context)

- Wants honest critique over validation
- Implements suggested fixes thoroughly
- Single-file HTML deployments preferred for tools
- Prefers Sora/DM Sans for typography (used in his existing brand)
- Long-established workflow: HTML → Netlify drag-drop / GitHub Pages, Firebase Realtime DB, Google Apps Script for forms, Claude API
- Has Mahidol/Thammasat faculty obligations during these 20 days
- Available 4-5 hours/day for this project
- Custom domain: `yungie.one`, GitHub: `yungie-kaenchan`
- Frameworks he works with: UDL, PICRAT, Bloom's, AI-TPACK, CTML/Dual Coding, CLT/SLA

---

## 24. What I (Claude Code) Should Do

**Default behaviors:**
1. Read CLAUDE.md fully before any decision
2. Reference the Roadmap in Section 20 to know what day's work is current
3. Maintain visual identity strictly (Section 12)
4. Honor all pedagogical frameworks (Section 4)
5. Preserve all guardrails (especially Field Mentor in Section 9)
6. Build with PDPA, UDL, mobile-first as defaults (Section 15)
7. Keep documentation updated as features ship
8. Ask Dr. Payungsak Kaenchan before deviating from this document

**Default approach when starting a session:**
1. Check current day in roadmap
2. Verify what was completed in previous session (check git log or file timestamps)
3. Identify today's deliverables
4. Build in order of dependency
5. Test on mobile breakpoints
6. Update documentation

**When uncertain:**
- Default to pedagogical safety (preserve productive struggle, maintain teacher authority)
- Default to PDPA-compliant data handling
- Default to UDL-accessible design
- Ask before adding new features beyond this scope

---

## 25. Day 1 Status (Completed May 10)

**Delivered:**
- ✅ Project scaffolding with Tailwind production build pipeline
- ✅ Custom design system (colors, typography, components)
- ✅ Landing page with 7 sections (Hero, Mission Brief, Architecture, Output, Judges, CTA, Footer)
- ✅ Mobile-first responsive design
- ✅ Console aesthetic with corner markers, status indicators, ticker
- ✅ Bilingual content (English primary, Thai metalanguage)
- ✅ Scroll-triggered reveal animations
- ✅ Live Bangkok-time ticker
- ✅ Animated SDG ticker (all 17 goals)
- ✅ Pitch Capsule preview mockup
- ✅ Netlify deployment configuration
- ✅ README documentation

**Pending Dr. Payungsak Kaenchan's actions:**
- Deploy to Netlify
- Set up custom subdomain (`futureproof-sdgs-lab.netlify.app`)
- Provision Firebase project
- Provision Stability.ai API key
- Confirm Anthropic API key available

---

## 26. Quick Start Commands

```bash
# Install dependencies (one-time)
npm install

# Development mode (watches and rebuilds CSS on change)
npm run dev

# Production build (minified CSS)
npm run build

# Deploy to Netlify (after building)
# Either: drag-and-drop folder to app.netlify.com/drop
# Or: git push (Netlify auto-builds via netlify.toml)
```

---

## 27. Key Decisions Already Made (Don't Re-Litigate)

- ✅ Bilingual approach: English primary with Thai metalanguage
- ✅ Visual aesthetic: Mission Control × Editorial Elegance
- ✅ Color palette: Black/gold/crimson/white with SDG accents
- ✅ Typography: Cormorant + Cinzel + DM Sans + JetBrains Mono + IBM Plex Sans Thai
- ✅ Tech stack: HTML/Tailwind/JS/Firebase/Claude API/Stability.ai
- ✅ Hosting: Netlify with custom subdomain
- ✅ Avatar approach: Stability.ai API
- ✅ Hybrid 4-tier judging system
- ✅ Field Mentor as Socratic companion (NOT content tutor) with strict guardrails
- ✅ 6-mission Bloom's-aligned architecture
- ✅ 3-role situated learning (Research / Comms / Ethics)
- ✅ Insight Token economy with shop and ranks
- ✅ Pitch Capsule as 5-panel artifact with audio narration
- ✅ Hall of Excellence with consent-based curation
- ✅ Mandatory Local Lens layer in every scenario

---

**End of CLAUDE.md**

This document supersedes any previous chat context. When in doubt, this is the source of truth. Dr. Payungsak Kaenchan has reviewed and approved this architecture. The mission is clear. Build with discipline.
