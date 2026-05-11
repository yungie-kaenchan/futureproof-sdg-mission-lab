# Screenshots Package — Submission Companion

For judges who won't run a deploy. Each row below names a frame to capture, why it earns space in the submission, and the URL to load (after deploy) to capture it.

The screenshots themselves go in this folder as `01-landing.png`, `02-onboarding.png`, etc. Use 1440 × 900 (desktop) and 390 × 844 (mobile) pairs for the responsive frames; one frame is enough for the data/admin views.

## Capture order

| # | File name | Page | URL | Why this frame matters |
|---|---|---|---|---|
| 01 | `01-landing.png` | Landing | `/index.html` | The aesthetic — Mission Control × Editorial Elegance — and the SDG ticker scrolling across all 17 goals. |
| 02 | `02-tour.png` | Landing tour overlay | `/index.html` (clear localStorage) | First-visit 4-step intro that orients judges in 30 seconds. |
| 03 | `03-signup.png` | Sign-up | `/pages/signup.html` | Step 1/5 indicator and warm UI microcopy ("Let's get you in"). |
| 04 | `04-consent-en.png` | PDPA consent (EN) | `/pages/consent.html` | Five-flag granular consent with required vs optional. |
| 05 | `05-consent-th.png` | PDPA consent (Thai toggle) | `/pages/consent.html` (after EN/ไทย click) | Bilingual flow — required for the Thai jury. |
| 06 | `06-assessment-cloze.png` | Readiness check — cloze | `/pages/assessment.html` (begin → cloze) | The diagnostic that drives `learnerProfile`. |
| 07 | `07-assessment-results.png` | Readiness check — results | `/pages/assessment.html` (complete) | Six stat cards, CEFR card front-and-center. |
| 08 | `08-avatar.png` | Operator avatar | `/pages/avatar.html` | Stability.ai integration UI with style presets. |
| 09 | `09-mission-select.png` | SDG wheel | `/pages/mission-select.html` | All 17 SDGs in UN colors. |
| 10 | `10-scenarios.png` | Scenarios after picking SDG | `/pages/mission-select.html` (after SDG click) | Three Claude-generated scenarios with Local Lens. |
| 11 | `11-mission-recon.png` | Mission 01 RECON | `/pages/mission-shell.html?m=1` | Custom phase: source-selection (pick 2 of 4). |
| 12 | `12-mission-tribunal.png` | Mission 05 TRIBUNAL | `/pages/mission-shell.html?m=5` | Multi-turn cross-examination chat. |
| 13 | `13-studio.png` | Pitch Capsule Studio | `/pages/studio.html` | 5-panel layout, rich-text toolbar, audio recording, PDF export. |
| 14 | `14-studio-pdf.png` | Exported Pitch Capsule PDF | (export from `/pages/studio.html`) | The artifact in its final form. |
| 15 | `15-portfolio.png` | Personalized Learning Portfolio | `/pages/portfolio.html` | CEFR journey, growth edges, future plan. |
| 16 | `16-reflections.png` | Voice of the Learner | `/pages/reflections.html` | Time Capsule + 3 checkpoint recordings. |
| 17 | `17-mydata.png` | My Data panel | `/pages/my-data.html` | PDPA self-service: review, export, delete. |
| 18 | `18-hall.png` | Hall of Excellence | `/pages/hall-of-excellence.html` | Public-readable curated gallery. |
| 19 | `19-admin-dashboard.png` | Admin Command Platform | `/pages/admin/dashboard.html` | Seven-module teacher dashboard with live counts. |
| 20 | `20-admin-architect.png` | Mission Architect | `/pages/admin/mission-architect.html` | Scenario library + editor + preview-as-student. |
| 21 | `21-mobile-mission.png` | Mission shell on mobile | `/pages/mission-shell.html?m=3` (390 px) | 360-px-up responsive verification. |
| 22 | `22-a11y-toolbar.png` | A11y toolbar in action | any page (toolbar bottom-right) | UDL controls visible. |
| 23 | `23-high-contrast.png` | High-contrast mode | any page (◐ toggle on) | Accessibility floor demonstrated. |
| 24 | `24-tour-mobile.png` | Tour on mobile | `/index.html` (mobile) | Onboarding on the smallest target device. |

## Capture commands

```bash
# Local dev:
npm run dev &
npx http-server . -p 8000 &
open http://localhost:8000/                       # frame 01
open http://localhost:8000/pages/signup.html      # frame 03
# ...

# Or in a deployed build:
open https://futureproof.yungie.one/
```

For a **deterministic** capture, use Chrome DevTools Device Toolbar (`Cmd+Shift+M`):
- Desktop frames: 1440 × 900, 1× DPR.
- Mobile frames: 390 × 844 (iPhone 14), 2× DPR.
- Take full-page screenshots: `Cmd+Shift+P` → "Capture full size screenshot".

## What each screenshot proves

The submission narrative makes claims; the screenshots are the receipts:

| Claim in narrative | Receipt |
|---|---|
| "PDPA-first, bilingual consent, granular flags" | Frames 04, 05, 17 |
| "PICRAT — Creative-Transforms in Mission 06" | Frame 13 (Studio) + frame 14 (exported artifact) |
| "AI-TPACK — boundary enforced in code" | Frame 12 (TRIBUNAL — AI probes, doesn't answer) |
| "Mobile-first, 360 px and up" | Frames 21, 24 |
| "UDL accessibility floor" | Frames 22, 23 |
| "Teacher remains the architect" | Frames 19, 20 |
| "Authentic audience" | Frame 18 |
| "Self-service PDPA rights" | Frame 17 |

## Submission ZIP layout

```
futureproof-submission-2026/
├── 01-innovation-concept.pdf        ← from docs/innovation-concept.md
├── 02-theoretical-grounding.pdf     ← from docs/theoretical-grounding.md
├── 03-teacher-guide.pdf             ← from docs/teacher-guide.md
├── 04-rubrics/                      ← all four rubrics as PDFs
│   ├── rubric-a-pitch-capsule.pdf
│   ├── rubric-b-mission-decision.pdf
│   ├── rubric-c-language.pdf
│   └── rubric-d-soft-skills.pdf
├── 05-dpia.pdf                      ← from docs/dpia-framework.md
├── 06-submission-narrative.pdf      ← from docs/submission-narrative.md
├── 07-screenshots/                  ← this folder
│   ├── 01-landing.png
│   ├── 02-tour.png
│   └── …
├── 08-video-demo.mp4                ← Aj. Yungie's recording
├── 09-demo-credentials.txt          ← KEEP SEPARATE — judges only
└── 10-live-url.txt                  ← futureproof.yungie.one
```

Convert the markdown docs to PDF via your usual flow (Pandoc, Marked, or print-to-PDF from a browser).
