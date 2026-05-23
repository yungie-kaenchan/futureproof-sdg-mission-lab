# Data Protection Impact Assessment (DPIA) — FINAL
## FUTUREPROOF: SDGs Mission Lab

**Status:** Final for submission · supersedes `docs/dpia-framework.md`
**Legal basis:** Thailand Personal Data Protection Act B.E. 2562 (PDPA)
**Controller (academic):** Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan), Faculty of
Liberal Arts — pilot context: Mahidol University / Thammasat University
**Last reviewed:** 2026-05 (v2 reconstruction build)
**Reviewer note:** This DPIA reflects the *as-built* v2 platform, including
the corrected consent ordering. Where the May-10 framework listed open
items, each is now closed and marked ✅.

---

## 0 · Bilingual executive summary / บทสรุปผู้บริหาร

**EN.** FUTUREPROOF collects the minimum personal data needed to run an
adaptive English-through-SDGs learning journey: account identity, a
language-diagnostic result, in-mission decisions, and an optional final
audio/video/visual submission. **Consent is collected before any personal
data is processed** — the diagnostic cannot run, and writes nothing to the
cloud, until a consent record exists. Sensitive processing (voice/video)
is optional, lane-choosable, and separately consented. Public exposure
(Hall of Voices) requires a second, explicit, withdrawable opt-in. All
data is deletable on request and auto-deleted within 90 days of course
end. Children's data is out of scope (undergraduate platform).

**TH / ไทย.** FUTUREPROOF เก็บข้อมูลส่วนบุคคลเท่าที่จำเป็นสำหรับการเรียน
ภาษาอังกฤษผ่านภารกิจ SDG แบบปรับระดับ ได้แก่ ข้อมูลบัญชี ผลแบบประเมินภาษา
การตัดสินใจในภารกิจ และงานชิ้นสุดท้ายแบบเสียง/วิดีโอ/ภาพ (ทางเลือก)
**ระบบจะขอความยินยอมก่อนประมวลผลข้อมูลส่วนบุคคลใด ๆ** แบบประเมินจะไม่ทำงาน
และไม่บันทึกขึ้นคลาวด์จนกว่าจะมีบันทึกความยินยอม การประมวลผลข้อมูลอ่อนไหว
(เสียง/วิดีโอ) เป็นทางเลือกและขอความยินยอมแยก การเผยแพร่สาธารณะ (Hall of
Voices) ต้องได้รับความยินยอมชัดแจ้งครั้งที่สองและถอนได้ ข้อมูลลบได้ตามคำขอ
และลบอัตโนมัติภายใน 90 วันหลังจบรายวิชา ไม่ประมวลผลข้อมูลผู้เยาว์

---

## 1 · Scope of processing

| Item | Detail |
|---|---|
| Purpose | Deliver an adaptive EFL + SDG learning journey; formative feedback; teacher summative grading; optional curated public showcase |
| Data subjects | Undergraduate students; teachers (controller-side users) |
| Lawful basis (PDPA s.24) | Consent (explicit, granular, recorded, withdrawable) — primary basis for all student processing |
| Roles | Academic controller: Dr. Payungsak Kaenchan. Processors: Google Firebase (Auth, Realtime DB, Storage); Netlify (static hosting); Anthropic (Claude proxy, formative text only); Stability.ai (optional avatar). No advertising processors. |
| Special-category data | Voice/video (biometric-adjacent) — **optional**, lane-selectable, separately consented; never required to complete the journey |

---

## 2 · Data inventory

### 2.1 Collected (with the v2 collection point)

| Data | When | Store | Consent gate |
|---|---|---|---|
| Email + auth UID | Sign-up | Firebase Auth | Account necessity (pre-consent screen explains; no learning data yet) |
| Display name, institution, year | Sign-up | RTDB `users/{uid}/profile` | **Consent screen (step 3.5) — before the diagnostic** |
| Consent record (versioned, flags, lang, UA, ts) | Consent step | RTDB `consents/{uid}` | Is itself the consent artifact (append-only, never overwritten) |
| Diagnostic result: CEFR band, **readingTier**, subscores | After consent only | RTDB `users/{uid}/learnerProfile` | **Hard-gated: `assessment.html` redirects to consent if no consent record; no cloud write occurs first** ✅ |
| In-mission decisions, Insight Tokens, Keystones, reading tier served | During missions | RTDB `decisions/`, `tokens/`, `users/{uid}/keystones` | Covered by learning-data consent flag |
| Voice for Change submission (audio/video/visual) + metadata | Final task (optional) | Firebase Storage + RTDB `users/{uid}/voiceForChange` | **Separate lane choice; recording held in-browser until explicit Submit** |
| Hall of Voices publication + youth-forum routing | Only if curated | RTDB `hallOfVoices/published` | **Second explicit opt-in, default OFF, withdrawable → removed** |
| Optional 30-sec reflection audio | Reflection checkpoints | Storage | Optional, declinable |

### 2.2 Explicitly NOT collected

National ID; precise geolocation; device fingerprint; contacts; third-party
social graph; behavioural ad identifiers; biometric templates (no
face/voice matching — recordings are media artifacts, never enrolled for
recognition); no minors' data (undergraduate-only).

---

## 3 · Necessity & proportionality (PDPA s.21–22)

- **Data minimisation.** The diagnostic stores a *derived band + tier*,
  not raw item-level responses beyond what scoring needs. The reading
  tier is a single integer {1,2,3}; it is the entire adaptive footprint.
- **Purpose limitation.** Learning data is used for feedback, the
  teacher's grade, and (consented) curation only. No profiling for any
  purpose outside the course.
- **The v2 ordering fix (material).** v1 risked collecting diagnostic
  data before consent. v2 makes consent a **hard gate**: the diagnostic
  page refuses to run and performs **no cloud write** until a consent
  record exists; local-only flow-state (the user's own browser) is not a
  third-party transfer. This closes the single most serious prior risk.
  ✅ *Closed — implemented and tested.*
- **Sensitive-data proportionality.** Voice/video is never required:
  three expression lanes exist (live record / upload / Canva visual), so
  a learner who declines audio still completes the capstone fully.

---

## 4 · Risk register & mitigation (as-built)

| # | Risk | Likelihood | Impact | Mitigation (status) |
|---|---|---|---|---|
| R1 | Personal data captured before consent | was HIGH | HIGH | Hard consent gate on `assessment.html`; no pre-consent cloud write ✅ |
| R2 | Voice/video over-collection | MED | HIGH | Optional lane; in-browser until Submit; not required; separate consent ✅ |
| R3 | Unintended public exposure of student work | MED | HIGH | Hall of Voices needs 2nd explicit opt-in, default OFF, withdrawable→deleted ✅ |
| R4 | Demo bypass skips real consent/earning | LOW | MED | Double-gated (`?demo=keystones` **and** explicit config/localStorage flag); off by default; never in normal nav ✅ |
| R5 | Canva embed leaks data / breaks via CSP | LOW | MED | Canva is **launched in a new tab**, never iframed; only the learner's own export is re-uploaded ✅ |
| R6 | Processor (Firebase) outage exposes/loses data | LOW | MED | Graceful degradation — journey continues locally; no silent data loss; encrypted in transit/at rest |
| R7 | Re-identification from small cohort | MED | MED | Pilot uses Pxx codes; name↔code key kept on paper, separate, destroyed post-report |
| R8 | Stored-XSS via learner-typed text echoed in UI | was MED | MED | All learner echoes pass through `escapeHtml()`; mission engine + scenarios use safe DOM ✅ |
| R9 | Retention beyond purpose | LOW | MED | 90-day post-course auto-deletion; My Data self-service deletion |

---

## 5 · Technical & organisational measures

**Technical.** TLS in transit; Firebase encryption at rest; least-privilege
security rules (see `docs/firebase-security-rules.md`); API keys server-
side only via Netlify Functions proxy (never in client); safe-DOM
rendering + output escaping; no third-party trackers; demo bypass double-
gated.

**Organisational.** Single academic controller; processor list documented
and limited; consent records append-only and versioned (revisions never
overwrite — audit-preservable); My Data panel for access/deletion;
pilot data-handling protocol in `docs/MICRO-PILOT-KIT.md` §3; this DPIA
reviewed each release.

---

## 6 · Data-subject rights (PDPA s.30–37) — implementation

| Right | How exercised |
|---|---|
| Access | `pages/my-data.html` lists stored categories |
| Rectification | Re-take diagnostic; edit profile |
| Erasure | My Data deletion request → controller purges RTDB/Storage; Hall withdrawal removes the published item |
| Withdraw consent | Consent flags toggleable; withdrawal stops further processing and triggers erasure of the affected category |
| Object/restrict | Decline optional lanes; opt out of curation (default) |
| Portability | Submission media is the learner's own file; exportable |
| Lodge complaint | Controller contact + institutional DPO route stated in consent |

---

## 7 · International transfers

Firebase/Netlify/Anthropic/Stability may process outside Thailand. PDPA
s.28 addressed via: processor adequacy + contractual safeguards;
minimisation (Claude proxy receives only the formative text needed, never
identity bundles); learner informed in the consent screen that processing
uses these named processors. No transfer of special-category data to any
processor for any purpose other than storing the learner's own submission.

---

## 8 · Children's / minors' data

Out of scope by design — the platform targets undergraduates. No feature
solicits age below the institutional threshold. If an institution deploys
to minors, a guardian-consent addendum is required before use (flagged,
not implemented, intentionally).

---

## 9 · Monitoring, audit, review

- Consent records are append-only and versioned → auditable history.
- Teacher dashboard logs admin access (PDPA Compliance Center module).
- This DPIA is re-reviewed at each release and before any pilot.
- **All May-10 framework open items are now closed** (consent ordering,
  voice-data flow, public-exposure gating, demo-bypass safety) ✅.

---

## 10 · Residual risk statement

After mitigations, residual risk is **LOW** and proportionate to a
formative educational pilot. The highest prior risk (pre-consent data
capture) is eliminated by an enforced gate, not a policy promise. Voice
and public exposure are opt-in, declinable, and reversible. This posture
is defensible under PDPA and is a deliberate Q&A asset: *consent precedes
data, the smaller claim is the honest one, and no learner is ever
dead-ended or exposed without a second yes.*
