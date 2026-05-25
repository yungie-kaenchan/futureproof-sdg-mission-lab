# Pre-Submission Checklist · FUTUREPROOF · SPU 2569

> **Generated** 26 May 2026 · overnight pass · 4 days before submission
> deadline (31 May 2026).
>
> **What this is** A concise, verified-by-audit checklist of what's
> ready to submit, what's missing, and what to do in the 96-hour run-up
> to the deadline.

---

## 1 · Submission package · what's ready

| # | Artefact | File | Size | Status |
|---|---|---|---|---|
| 1 | Innovation report (Thai application form) | `หนังสือเข้าร่วมการประกวด-FINAL-15pp.docx` | 5.4 MB | ✓ ready · 18 pp (15 report + 3 references appendix) · 36 APA-7 sources · 29 in-text citations |
| 2 | Rubric A · Voice for Change Holistic | `docs/rubrics/rubric-a-voice-for-change.pdf` | 312 KB | ✓ ready · 5 pp |
| 3 | Rubric B · Mission Decision Quality | `docs/rubrics/rubric-b-mission-decision.pdf` | 310 KB | ✓ ready · 4 pp |
| 4 | Rubric C · CEFR Language Development | `docs/rubrics/rubric-c-cefr-language.pdf` | 356 KB | ✓ ready · 5 pp |
| 5 | Rubric D · Soft Skills Demonstration | `docs/rubrics/rubric-d-soft-skills.pdf` | 280 KB | ✓ ready · 4 pp |
| 6 | Teacher's &amp; Judge's Manual | `docs/teacher-manual/FUTUREPROOF-Teacher-Manual.pdf` | 1.8 MB | ✓ ready · 28 pp bilingual |
| 7 | Read This First · 1-page exec summary | `docs/judge-pack/READ-THIS-FIRST.pdf` | 291 KB | ✓ NEW |
| 8 | Pilot &amp; Measurement Plan | `docs/judge-pack/PILOT-MEASUREMENT-PLAN.pdf` | 270 KB | ✓ NEW |
| 9 | Self-audit · scrutiny report | `docs/document-scrutiny/SCRUTINY-REPORT.md` | 32 KB | ✓ ready |
| 10 | Self-audit · usability + competitiveness | `docs/audit/USABILITY-COMPETITIVENESS-AUDIT.md` | 17 KB | ✓ ready |
| 11 | Poster image-gen prompt (v2) | `docs/poster/POSTER-PROMPT-v2.md` | 27 KB | ✓ ready · awaiting actual poster image |
| 12 | Screencast toolkit | `docs/video-production/SCREENCAST-TOOLKIT.md` | 14 KB | ✓ ready · awaiting actual video |

**12 of 12 documentation artefacts present. 2 still-to-produce: the poster image, the screencast video.**

---

## 2 · Live platform · audited

**Live URL** · https://futureproof-sdgs-lab.netlify.app

### Lighthouse scores · production deploy · 26 May 2026

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` (root · splash) | 🟡 **87** | 🟢 **100** | 🟢 **100** | 🟢 **100** |
| `/pages/judge-tour.html` | 🟡 **87** | 🟢 **100** | 🟢 **100** | 🟢 **100** |

3 perfect 100s + 1 yellow 87 (Performance · constrained by the optional 4.7 MB landing video).

### Link / asset integrity

- **35 HTML pages scanned** · 368 internal references checked
- **0 broken internal links**
- **0 missing asset references**

### End-to-end judge demo flow · verified

1. Land at `/` → splash page · WebP poster paints in &lt; 1s
2. Click "Begin your journey" → `/home.html`
3. Click "⚖ Judge Tour" → `/pages/judge-tour.html`
4. Scroll through 8 sequential steps · sticky progress bar tracks position
5. Step 4 · Sample Mission · SDG 6 Khon Kaen · 5 stages pre-completed
6. Click "Skip to Voice for Change" → `fp_demo_mode` localStorage set → `/pages/final-task.html?demo=keystones`
7. Demo banner appears · 6 Keystones pre-granted · capstone studio reachable
8. Submit demo recording → `/pages/final-task-submitted.html` · banner persists via localStorage
9. "Exit demo mode" link → clears flag → returns home

---

## 3 · What still needs to happen before May 30

### Must-do (4 items)

- [ ] **Record the 5-minute selection-round screencast video** (per SPU §2.1). Tool stack in `docs/video-production/SCREENCAST-TOOLKIT.md` §0. Estimated 4-6 hours.
- [ ] **Upload the video to YouTube as unlisted** + capture the URL.
- [ ] **Generate the A4 poster** via the prompt in `docs/poster/POSTER-PROMPT-v2.md`. Iterate via ChatGPT or Gemini with the `thailand-map.png` reference image attached. Estimated 2-3 hours including iterations.
- [ ] **Get the Dean's signature** on the application form's signature page (ส่วนที่ 5 ลงนาม). Required by SPU rule §1 (รับรองจากผู้บังคับบัญชา).

### Should-do (3 items)

- [ ] **Email one colleague today** asking for a 30-minute beta-test on the live platform. A single real-name testimonial closes the credibility gap.
- [ ] **Compress `landing-video.mp4`** from 4.7 MB to ~ 1.5 MB if you have time and a working `ffmpeg` install. Would lift Performance from 87 to ~ 92.
- [ ] **Verify URLs in references PDFs**: the four institutional URLs in the application bibliography (CAST, P21/Battelle, THE Impact Rankings, UNESCO ESD roadmap). UNESCO blocked `curl` with 403 — verify it resolves in a real browser.

### Nice-to-have (4 items · for the final round if you advance)

- [ ] Run an actual 8-student micro-pilot before June 14
- [ ] Add an in-screen narrator track on judge-tour.html
- [ ] Build a field-test admin mode with seeded learner profiles
- [ ] Produce the 10-minute extended-cut video

---

## 4 · The submission upload itself

Per SPU rules, submit via:
**Google Form** · https://docs.google.com/forms/d/1X87ue60sX-Eb2b5RVIhiHqsN709gqFCq4gpJ8BJ_i6g/edit
**Deadline** · 31 May 2026 · 24:00 น.

You will upload:
1. The application docx (PDF version recommended; max 100 MB)
2. The poster image (A4; max 10 MB; with QR code linking to the YouTube video embedded in the image)
3. The YouTube video link
4. (Optional supplementary) the rubric PDFs / teacher's manual / judge-pack PDFs · either as a ZIP or linked from your portfolio page

If the form allows a "supplementary files" or "URL to portfolio" field, link to:
- `https://futureproof-sdgs-lab.netlify.app/pages/judge-tour.html` (Judge Tour)
- `https://github.com/yungie-kaenchan/futureproof-sdg-mission-lab` (source code · optional)

---

## 5 · Single-line submission readiness summary

> *"Documentation complete (12/12 artefacts) · live platform audited (3×100 + 87 on Lighthouse · 0 broken links · 35 pages verified) · judge demo flow tested end-to-end. Outstanding: video recording, poster image, Dean's signature."*

---

*Run by audit script · 26 May 2026 · 06:42*
