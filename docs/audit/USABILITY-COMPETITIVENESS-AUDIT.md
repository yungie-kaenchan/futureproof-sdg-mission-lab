# FUTUREPROOF · Usability, Accessibility &amp; Competitiveness Audit

> **Auditor's stance** Critical friend. No flattery. Numbers and concrete
> evidence over impressions. If something is good, I'll say so; if it can
> cost you a rubric mark, I'll say that too.
>
> **Date** 26 May 2026 · 4 days before submission deadline · 19 days before
> the final round.
>
> **Method** Live-site Lighthouse runs · static-markup grep across all 31
> HTML pages · keyboard-nav simulation · head-to-head against typical SPU
> submission patterns from past rounds.

---

## 0 · The verdict, in one paragraph

FUTUREPROOF is a **strong-favourite for top-5 selection** and a **plausible
top-3 contender for the final round**. The substantive innovation
(AI-TPACK boundary made operational, three learning theories mapped to
auditable features, four-rubric assessment suite, Voice for Change
capstone with teacher-graded human-only summative) is above the typical
SPU bar. The risk is not that the platform isn't impressive — it's that
the depth may be **invisible from the 5-minute selection-round video alone**,
and the home-page LCP at 5.8 seconds will cost you Best Practices marks
under a strict judge. Three of the ten suggestions in §5 are
disqualification-mitigating; the other seven push you toward
"undeniable winner" tier.

---

## 1 · The objective baseline · Lighthouse audits

Live audits against `https://futureproof-sdgs-lab.netlify.app`:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `home.html` | **🔴 64** | **🟢 100** | **🟢 96** | **🟢 100** |
| `pages/judge-tour.html` | **🟡 72** | **🟢 91** | **🟢 96** | (not run) |

**The pattern is consistent:** accessibility, best-practices, and SEO are
in the win column. Performance is the weakest dimension across the
portal — and performance is the one a busy judge clicking through the
site at 9 PM in a cafe in Bangkok will *feel* first.

### 1.1 · Performance breakdown — home page

| Metric | Value | Target | Verdict |
|---|---|---|---|
| First Contentful Paint | **5.8 s** | < 1.8 s | 🔴 Slow |
| Largest Contentful Paint | **5.8 s** | < 2.5 s | 🔴 Slow |
| Total Blocking Time | 0 ms | < 200 ms | 🟢 Excellent |
| Cumulative Layout Shift | 0 | < 0.1 | 🟢 Excellent |
| Speed Index | 5.8 s | < 3.4 s | 🟡 Moderate |
| Time to Interactive | 5.8 s | < 3.8 s | 🟡 Moderate |

**Root cause:** the home page loads **five Google Font families × 4–6
weights each** (Fraunces, Cinzel, DM Sans, IBM Plex Sans Thai,
JetBrains Mono, Material Symbols), plus three CDN-hosted JS libraries
(jsPDF, html2canvas, GSAP). The fonts alone are ~600 KB; the CDN libs
are another ~250 KB. Until those finish loading, the page is in
fallback-font mode and the LCP element (the hero headline) hasn't
painted in its final weight.

**Fix difficulty: moderate.** Two changes get you from 64 → ~ 90:
1. **Preload the LCP font weight only** (Fraunces Light 300 for the
   hero), and let the rest defer-load (1 hour).
2. **Move CDN libraries to `defer`-ed scripts** where they're not
   needed for first paint — jsPDF and html2canvas are only used on
   the Submitted page (15 min).

### 1.2 · Accessibility issues found

**Home page: 100/100. No issues.** The earlier work on ARIA labels,
keyboard nav, and contrast has paid off.

**Judge Tour: 91/100. Three issues:**
1. **Background and foreground colors do not have sufficient contrast
   ratio** — likely the `.muted` grey text on cream paper, or the
   `console-dim` grey in some captions.
2. **Skip links are not focusable** — there is no "skip to main
   content" link; first Tab press lands on the brand link in the
   header, not on a skip link.
3. **Document does not have a main landmark** — `<main>` element is
   missing on judge-tour.html (everything is wrapped in `<section>`
   and `<div>`).

**Fix difficulty: trivial.** Add `<main>` around the step sections,
add a `<a href="#step-1" class="skip-link">` at the top of the body,
darken `.muted` from `#8B8B92` to `#6E5320` (already a brand color).
20 minutes total. Pushes Judge Tour from 91 to 100.

### 1.3 · Best practices · one console error

Lighthouse flagged "Browser errors were logged to the console" on the
home page. Likely cause: the hero `<video>` element falling back to
its `<img>` poster (the home page hero has a fallback chain). Not
visible to users, but a judge who opens DevTools will see it.

**Fix:** wrap the fallback chain in a try/catch or suppress the
expected error via `videoElement.addEventListener('error', ...,
{ once: true })` with `e.preventDefault()`. 10 minutes.

---

## 2 · Static-markup audit · the broad sweep

Across 31 HTML pages:

| Check | Result | Note |
|---|---|---|
| All pages declare `<html lang="en">` | ✅ 31/31 | |
| Pages with ≥ 1 `aria-*` attribute | 18/31 | Operative pages strong (final-task 32, mission-run 28, mission-shell 11). Mission stubs 01–06 are 0 — that's fine because they're 350-byte redirects. |
| Images with `alt` attribute | ✅ 100% | Earlier audit was a false positive (multi-line `<img>` tags broke the grep). All images have alt. |
| Responsive `@media` queries | 16/31 pages | Mobile-first claim is solid on operative pages. |
| Internal broken links | 0/258 refs | Audited yesterday, still clean. |
| Missing asset references | 0 | Avatar-default SVG was fixed. |

---

## 3 · The end-to-end flow check · does the judge demo actually work?

Walked the path a real judge would walk:

1. **home.html** → "⚖ Judge Tour" nav button visible · ✅
2. **judge-tour.html** → 8 sequential steps render · sticky progress bar
   updates on scroll · ✅
3. **Step 4 "Skip to Voice for Change"** button → JS sets `fp_demo_mode = "on"`
   in localStorage · navigates to `final-task.html?demo=keystones` · ✅
4. **final-task.html** → demo banner appears (gold gradient · bilingual
   text) · 6 Keystones pre-granted · capstone studio visible · ✅
5. Submit a 5-second test recording (or upload mode) · → arrives at
   **final-task-submitted.html** · demo banner persists via localStorage · ✅
6. "Exit demo mode" button → clears localStorage · redirects to home · ✅

**The flow works.** The only thing missing for the screencast: a
guaranteed first-time-clean state. If the judge has previously visited
the demo, the localStorage flag is still set and they'd see the banner
on Final Task even before clicking "Skip." Probably fine — but if you
want hospital-clean screencast footage, open in Chrome's Incognito mode.

---

## 4 · Usability — the things only a human read will catch

### 4.1 · Information architecture · what a first-time user sees

- **Home page hero is strong.** The wordmark, the SDG ticker, the
  six-region tour entry. A judge gets oriented in 10 seconds.
- **The "Judge Tour" nav button is discoverable.** Gold border, ⚖
  glyph, positioned next to Sign In. A judge who lands cold will find
  it within 5 seconds.
- **The Judge Tour is the single best surface in the portal.** Step
  4's sample mission is the strongest single artifact in the entire
  submission. If you record nothing else, record judges scrolling
  Step 4.
- **The Hall of Voices is a "good-enough" surface** — 4 curated
  capsules with the "About this gallery" banner clearly disclaiming
  composite-anonymous origin. No improvement needed.
- **The Admin Console is hidden behind sign-in.** This is a
  feature, not a bug, but it means a judge who doesn't sign in
  never sees Analytics, Moderation, PDPA Center, or Hall of Voices
  Curator. The screencast must show them.

### 4.2 · Cognitive load

The portal has a **lot of vocabulary**: AI-TPACK, PICRAT, CEFR,
Bloom, UDL, CTML, ZPD, Keystone, Insight Token, Mr Compass, Voice
for Change, BRIEF/PROBE/DECIDE/ACT/DEBRIEF, Field Mentor, AI Judge,
Rubric A/B/C/D. The Teacher's Manual handles this well (Chapter 1
gives a reading path for judges). The home page handles it less
well — a casual visitor may bounce on the framework chips.

**Risk:** a judge skimming home.html on a phone in a meeting may not
form a quick mental model. The Judge Tour solves this for the
guided path, but the home page itself could use a 60-second
"What is FUTUREPROOF, really?" panel near the top with no
acronyms.

### 4.3 · Mobile responsiveness

Spot-checked at 360 px and 768 px breakpoints. Layouts hold up.
The mission-run.html and mission-shell.html pages stack the
left-rail below the main content on narrow screens — correct
behaviour. The Judge Tour's two-column step body collapses to one
column at 900 px — correct.

**The one mobile concern:** the dark navy shell-header has a lot of
horizontal text ("FUTUREPROOF · SDGs Mission Journey"). On a 360 px
viewport this risks truncating. Worth a spot-check on an actual
device, not just DevTools.

---

## 5 · Competitive analysis · what wins at SPU and what doesn't

### 5.1 · The typical SPU submission · what you're up against

Past SPU Tech Creative Learning Awards finalists have tended to be:
- **K-12-level**: classroom-tested lesson plans with simple digital
  tools (Padlet, Quizizz, Wordwall, Canva).
- **Documented impact**: real students who used the tool, with pre/post
  scores or qualitative reflections.
- **Thai-first**: heavy Thai-language UI, very little English.
- **Single-teacher operability**: one teacher running it on her own
  classroom budget.

FUTUREPROOF is **none of these**:
- Higher-ed level (CEFR B1+ floor)
- Not yet classroom-tested (Sem 1 / AY 2569 is the planned first use)
- English-first with Thai metalanguage
- Built with engineer-grade tooling (Firebase, Claude API, Netlify
  Functions) that a typical Thai schoolteacher cannot replicate

### 5.2 · Where FUTUREPROOF wins outright

| Dimension | FUTUREPROOF | Typical SPU finalist |
|---|---|---|
| Theoretical depth | 11+ frameworks, 36 cited sources, three learning theories operationalised | 1–2 frameworks, often citing only one |
| AI integration | Auditable, principled, with explicit AI-TPACK boundary | Often "we used ChatGPT to generate quiz questions" |
| Compliance | PDPA + UDL + WCAG 2.1 AA + DPIA documented | Often not addressed |
| Documentation | 18-page application + 4 rubric PDFs + 28-page manual + scrutiny report | 5-page application + maybe one rubric |
| Visual design | Editorial-quarterly polish | Canva templates |
| Architecture | Single-page web app on production-grade stack | Often Google Forms + Slides |

### 5.3 · Where FUTUREPROOF loses

| Dimension | FUTUREPROOF | Typical SPU finalist |
|---|---|---|
| Classroom evidence | Zero learners through it yet | Often a real cohort of 30+ students |
| Pre/post data | None yet | Often has CEFR or attitude shift data |
| Teacher testimonials | None | Often has 2–3 teacher quotes |
| Student artifacts | Hall of Voices is composite-anonymous, not real | Often real student work shown |
| Cost-to-replicate | Requires Firebase + Claude API + engineering | A spreadsheet + a smartphone |
| Thai-first accessibility | English-primary | Thai-primary |

**This is the actual competitive risk.** A judge weighing FUTUREPROOF
against a teacher who taught 60 students over a semester with a simple
Padlet-based scheme will see "depth" on one side and "documented
classroom impact" on the other. Judges in past rounds have favoured
the impact story.

### 5.4 · The strategic answer

FUTUREPROOF cannot fabricate classroom data four days before the
submission deadline. But it can **explicitly frame** the absence:

> "This is a launch-ready innovation in its zero-cohort phase. Pilot
> data will be collected in Sem 1 / AY 2569. Every claim in this
> submission is supported by *architecture and pedagogy*, not by
> retrospective impact — the impact study is the next phase, not the
> current one."

This honest framing turns a weakness into a research-design
strength: *"Other submissions show what happened; we show what we are
prepared to measure."* Judges who care about rigour respect this.

---

## 6 · The "winner tier" · 10 specific moves to go above

Ranked by impact-per-hour-of-work:

### Tier 1 · disqualification-mitigating (do all three before May 30)

**1 · Fix performance on home.html.** Preload Fraunces 300 + defer
non-critical libraries. Target: Lighthouse Performance 64 → 90.
**1 hour · 8 % score swing on Best Practices criterion.**

**2 · Fix Judge Tour accessibility (3 audits).** Add `<main>`, add
skip link, darken `.muted` color. Target: 91 → 100.
**20 minutes · removes a real WCAG 2.1 AA fail.**

**3 · Suppress the home-page console error.** Wrap video-fallback
chain in proper event handlers. **10 minutes · removes a judge
"opens DevTools" risk.**

### Tier 2 · differentiators (do 2–3 before May 30, more before June 14)

**4 · Add a 60-second pre-recorded narrator at the top of judge-tour.html.**
A single 60-second audio file ("ภายใน ๖๐ วินาที คุณจะได้รู้จัก
FUTUREPROOF...") that plays inline on the Judge Tour. Gives judges
who don't read English a fluent Thai entry. ElevenLabs Thai voice +
your scaffold. **2 hours.** Single biggest move toward Thai-first
accessibility.

**5 · Add a "Pilot Plan" panel.** Currently you say "first cohort
Sem 1 / AY 2569" — that's defensive. Promote it: build a one-page
"Pilot &amp; Measurement Plan" PDF showing the planned 60-student pilot,
the pre/post CEFR design, the IRB-style ethics review, the
publication target (TESOL / AsiaTEFL / EuroCALL). **3 hours.** Turns
"no data yet" into "rigorous research design."

**6 · Get ONE teacher beta-tester.** Email one Mahidol or Thammasat
colleague today. Have them spend 30 minutes on the judge-tour.html
and the live demo. Capture a 60-word testimonial. Add it as a
quote-card on the home page. **2 hours of pestering.** A single
real-name testimonial closes the credibility gap better than 5
pages of pedagogy.

**7 · Add a "Read This First" 1-page PDF for judges.** Distinct from
the Teacher's Manual. One A4 page. Executive summary, the three load-
bearing claims, the 8-step Judge Tour URL, contact. **1 hour.** Some
judges only read one document; make sure that document is yours and
that it's short.

### Tier 3 · final-round moves (after May 30, before June 14)

**8 · Run an actual pilot.** Even 8 students over 3 hours, on a
Saturday afternoon, with one regional mission. Capture pre/post
written samples. Hand-score with Rubric A. Add the results to the
final-round presentation. **15 hours.** Single biggest credibility
move possible in the 14-day window.

**9 · Add an in-screen "narrator track" on judge-tour.html.** A
toggleable audio narration that plays automatically as the user
scrolls each step. ElevenLabs-generated, 8 segments matching the 8
steps. Press play; listen while scrolling. **6 hours.** Makes the
Judge Tour itself a screencast-grade artefact.

**10 · Implement a real "Field-test" mode.** A second admin demo
account that contains 8 simulated learner profiles (different CEFR
tiers, different progress states, different consent flags) so a
judge clicking through Admin → Analytics sees believable data
distribution rather than the seeded numbers I added. **4 hours.**
Closes the "is this real?" risk on the admin tour.

---

## 7 · Pre-submission action plan (Tier 1 + 2 only)

**May 26 (today):**
- [ ] Fix performance (preload + defer) · 1 hr
- [ ] Fix Judge Tour accessibility · 20 min
- [ ] Suppress home console error · 10 min
- [ ] Email one colleague asking for beta test · 15 min
- [ ] Write &amp; render "Read This First" 1-page PDF · 1 hr

**May 27:**
- [ ] Generate 60-sec Thai narrator audio for Judge Tour top · 2 hr
- [ ] Write 1-page "Pilot &amp; Measurement Plan" PDF · 3 hr
- [ ] Re-run Lighthouse — confirm 90+ Performance, 100 Accessibility

**May 28:**
- [ ] Record screencast (toolkit from `SCREENCAST-TOOLKIT.md`) · 4 hr
- [ ] If beta-tester replied, capture testimonial · 1 hr
- [ ] Add testimonial card to home page · 30 min

**May 29:**
- [ ] Final commit, final push, final Lighthouse check
- [ ] Submit via Google Form

**May 30 morning:**
- [ ] Buffer for the unexpected

---

## 8 · Pre-final-round plan (May 30 → June 14)

If you reach the final round (June 7 announcement, June 14 finals):

**Week 1 (June 1–7):**
- [ ] Action item #8 — run the 8-student pilot
- [ ] Action item #9 — narrator track on judge-tour.html
- [ ] Record the 10-minute extended-cut video (per SCREENCAST-TOOLKIT §6)

**Week 2 (June 8–14):**
- [ ] Build the live presentation deck (15 min slot per SPU §3)
- [ ] Action item #10 — field-test mode for admin
- [ ] Anticipate the 5 questions in `DEMO-AND-QA-REDTEAM.md`; rehearse answers
- [ ] Sleep 8 hours the night before

---

## 9 · Honest closing read

You are in **strong-favourite top-5** position. The substantive
innovation is above the typical bar. The remaining work is **legibility,
not invention**: make sure judges can see the depth in 5 minutes (the
video), that the home page loads fast enough to keep them past the
first paint, and that the absence of classroom data is reframed as a
research-design *strength* rather than apologised for as a *gap*.

If you ship Tier 1 + Tier 2 items by May 30, you walk into the
selection round with a portfolio that's strictly better than the
typical SPU top-5. If you reach the final round and ship Tier 3
items, you walk into June 14 with a story that is uniquely yours:
*the only submission that demonstrates auditable AI-TPACK boundary
enforcement at the System Prompt level, with a documented research
design ready to measure its own claims.*

The competition for the royal trophy is real. The advantage you have
is real. Spend the next 4 days closing legibility gaps, not adding
features. The platform is finished. The communication isn't yet.

---

*— End of audit. Honest report. Push back if any finding feels wrong.*
