# Data Protection Impact Assessment (DPIA) Framework

**FUTUREPROOF: SDG Mission Lab**

This is the framework that the final DPIA document (Day 18) will populate. It defines the structure, lawful bases, data inventory, risk assessment methodology, and mitigations the platform commits to under the **Personal Data Protection Act B.E. 2562 (PDPA)** of Thailand.

> **Status:** Framework v1. To be completed with cohort-specific details on Day 18 ahead of submission. Translation to Thai required for the final submission document.

---

## 1. Scope of Processing

| Item | Detail |
|---|---|
| Data Controller | Faculty of Liberal Arts, Mahidol University |
| Designated Contact (DPO liaison) | Dr. Payungsak Kaenchan (Dr. Payungsak Kaenchan) — payungsak.kaenchan@gmail.com |
| Processor | Self-hosted on Firebase (Google Cloud, asia-southeast1) |
| Sub-processors | Anthropic (Claude API), Stability.ai (image generation), Netlify (static hosting) |
| Data Subjects | Undergraduate university students aged 18+; participating teachers; admin staff |
| Purposes | (a) deliver the educational platform; (b) calibrate AI-generated content; (c) evaluate student work |
| Lawful Bases (PDPA s.24) | Performance of educational task + Informed consent (s.24(1)) |

---

## 2. Data Inventory

### 2.1 Categories of personal data collected

| Category | Examples | Sensitivity | Retention | Lawful basis |
|---|---|---|---|---|
| Identifying information | Name, email, institution, year of study | Standard | 90 days post-course | Educational task + consent |
| Authentication credentials | Hashed password (Firebase Auth) | High | While account active | Educational task |
| Competency assessment results | CEFR estimate, vocabulary score, percentiles | Standard | 90 days post-course | Educational task + consent |
| Mission decisions and rationales | Free-text English responses, choices made | Standard | 90 days post-course | Educational task + consent |
| AI-generated feedback received | Rubric-grounded scores and narrative feedback | Standard | 90 days post-course | Educational task |
| Photos (avatar source) | User-uploaded photo | Sensitive (biometric-adjacent) | Source photo deleted ≤24h post-generation; stylized avatar retained 90 days | Separate optional consent |
| Voice recordings | Reflections + Pitch Capsule narration | Sensitive (biometric-adjacent) | 90 days post-course | Separate optional consent |
| Behavioral metadata | Session timestamps, time-on-task | Standard | 90 days post-course | Educational task |
| Audit logs | Admin/teacher access events | Standard (admin data) | 7 years | Legal/compliance obligation |

### 2.2 Categories explicitly **not** collected

- IP addresses (we hash + truncate; raw IP is never persisted)
- Geolocation
- Browsing history
- Social-media identifiers
- Health data
- Religious/political affiliation
- Data on individuals under 18

---

## 3. Necessity & Proportionality Test (PDPA s.21)

For each category in §2.1, the assessment must answer:

1. **Is there a less intrusive alternative that achieves the same educational outcome?** If yes, switch to it.
2. **Is the data minimization principle honored?** (Collect only what is necessary for the declared purpose.)
3. **Is purpose limitation honored?** (Use the data only for what was declared at collection time.)
4. **Are storage limitation rules followed?** (Auto-deletion or anonymization at 90 days.)

A category fails the test if no satisfying answer exists. Failure means the category must be removed or its purpose narrowed.

---

## 4. Risk Assessment

Risks are scored on **Likelihood × Severity**, both 1–5. Mitigations are required for any score ≥ 9 (medium-high or higher).

### 4.1 Risk register

| ID | Risk | Likelihood | Severity | Score | Mitigation |
|---|---|---|---|---|---|
| R-01 | Unauthorized access to PII via leaked admin credentials | 2 | 5 | 10 | Mandatory MFA on admin accounts; admin-claim writes audited; quarterly key rotation |
| R-02 | Sub-processor (Claude API) inadvertent retention of sensitive content | 2 | 4 | 8 | Use API endpoints with zero-data-retention configuration; never send raw PII in prompts; pseudonymize learner profiles before model calls |
| R-03 | Cross-team data leak via misconfigured security rules | 2 | 5 | 10 | All rules unit-tested in emulator before production deploy; deny-by-default baseline; quarterly security rule review |
| R-04 | AI-generated feedback containing biased or harmful content | 3 | 3 | 9 | Output classifier on every Claude response; teacher dashboard flags low-confidence outputs; student "report this feedback" affordance |
| R-05 | Avatar photo retained beyond intent | 2 | 4 | 8 | Cloud Function deletes source photo within 24h; only stylized output retained; deletion logged |
| R-06 | Voice recording disclosed without consent | 1 | 5 | 5 | Per-recording ACL via team membership check; storage rules enforce; consent flag verified at upload |
| R-07 | Ineffective consent (poorly understood by users) | 3 | 3 | 9 | Plain-language summaries (TH/EN); separate granular flags; "Why this matters" explainer per flag; review of comprehension via post-pilot survey |
| R-08 | Profiling effects (CEFR labels stigmatizing learners) | 3 | 2 | 6 | Profiles are scaffolding inputs only — never displayed to peers, never converted to grades; teachers see profiles only when intervening |
| R-09 | Data subject unable to exercise PDPA rights | 2 | 4 | 8 | "My Data" panel exposes all rights without email tickets; export, correction request, deletion all in-product |
| R-10 | Inadequate parental consent for users under 20 | 2 | 4 | 8 | Sign-up flow to detect age threshold and add parental-consent step; legal review prior to launch |

### 4.2 Mitigation status

| Status | Definition |
|---|---|
| ✅ Implemented | Code or process in place and tested |
| 🟡 Designed | Specified in design but not yet implemented |
| ⬜ Open | Not yet designed |

The Day 18 final DPIA document will include the status column populated.

---

## 5. Technical & Organizational Measures

### 5.1 Technical

- TLS 1.2+ in transit, server-side encryption at rest (Firebase default).
- Field-level encryption for highly sensitive PII fields (email, full name) using envelope encryption with a Cloud KMS-managed key.
- Deny-by-default security rules with role custom claims (see [`firebase-security-rules.md`](firebase-security-rules.md)).
- Append-only writes for decisions, consents, rubric scores, and audit logs.
- Cloud Function gating for token award/spend, scenario generation, evaluation, and submission to Hall of Excellence.
- Automatic 90-day deletion job for personal data after course end.
- Output classifier on AI responses to detect biased / harmful content.

### 5.2 Organizational

- Designated platform contact (Dr. Payungsak Kaenchan) liaises with the Mahidol DPO.
- Quarterly security rules review with documented sign-off.
- Annual DPIA refresh; ad-hoc refresh on any new sub-processor or data category.
- Incident response runbook (Day 17) covering breach detection, containment, notification (PDPA s.37 — within 72 hours).
- Staff training: any teacher or admin given platform credentials completes a short PDPA briefing first.

---

## 6. Data Subject Rights Implementation

PDPA recognizes seven core rights. Each is implemented in-product where possible:

| Right | Surface |
|---|---|
| Right to be informed | Sign-up flow + plain-language consent + this DPIA document |
| Right of access | "My Data" panel — view & export |
| Right to rectification | "Request correction" form in My Data → routes to teacher |
| Right to erasure | "Delete account" in My Data → 7-day grace; permanent deletion thereafter |
| Right to restrict processing | Per-flag consent toggles |
| Right to data portability | Export all data as JSON |
| Right to object | Opt out of Hall of Excellence; etc. |

A breach of these rights is reportable to the Personal Data Protection Committee of Thailand and to the Mahidol DPO.

---

## 7. International Data Transfers

| Recipient | Region | Mechanism |
|---|---|---|
| Anthropic (Claude API) | US (with EU/AP regional options) | Standard contractual clauses; zero-data-retention endpoint |
| Stability.ai | US | Contractual privacy commitment; data sent is the user-uploaded photo, retained ≤24h |
| Netlify | US | Static hosting only — no PII processed |
| Google (Firebase) | asia-southeast1 (Singapore) | In-region storage; SCCs for any cross-border failover |

The platform's primary storage region is Singapore. The transfers above are limited to processing operations declared in §1.

---

## 8. Children's & Minor's Data

The platform requires users to be 18+. Some Thai undergraduates may be under 20 (the threshold of full legal capacity for some categories under Thai civil law). The sign-up flow flags users in this band and triggers a parental-consent step before mission access is unlocked. Implementation of this gate is on the Day 3 build queue but currently in **🟡 Designed** state.

---

## 9. Monitoring, Audit, and Review

| Activity | Cadence | Owner |
|---|---|---|
| Security rules unit tests | On every rule change | Engineer of record |
| Security rules formal review | Quarterly | Dr. Payungsak Kaenchan + DPO |
| DPIA refresh | Annual or on material change | Dr. Payungsak Kaenchan |
| Pen test | Annual | External vendor |
| Audit log spot review | Monthly | Dr. Payungsak Kaenchan |
| Sub-processor list review | Quarterly | Dr. Payungsak Kaenchan |
| Incident response drill | Annual | Dr. Payungsak Kaenchan + teacher cohort |

---

## 10. Open Items for Day 18 Final DPIA

- [ ] Confirm institutional DPO contact.
- [ ] Document cohort size and projected data volume.
- [ ] Capture residual-risk acceptance signatures.
- [ ] Translate to Thai for legal submission.
- [ ] Attach security rules unit test report.
- [ ] Attach AI output classifier validation report.

---

**End of DPIA Framework v1**

Companion documents: [`firebase-schema.md`](firebase-schema.md), [`firebase-security-rules.md`](firebase-security-rules.md), [`innovation-concept.md`](innovation-concept.md).
