# Rubric B — Mission Decision Quality (AI Judge Logic)

**Used by:** AI Judge (Tier 1, formative — every mission)
**Applies to:** Each decision logged in `/decisions/$missionId/$decisionId`
**Scale:** Each criterion 1–5; tokens awarded -10 to +25 based on integrated score.

The AI Judge system prompt enforces:
- No overall pass/fail.
- Always names a specific growth edge.
- Acknowledges effort before critique.

---

## Mission 01 — RECON

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Factual Accuracy** | Multiple errors of fact | Mostly accurate, minor slips | All claims traceable to a selected source |
| **Vocabulary Recognition** | Misuses key terms | Uses key terms with occasional imprecision | Uses key terms precisely; differentiates near-synonyms |
| **Strategic Source Selection** | Picked the two most familiar sources | Picked one familiar + one stretching source | Picked two complementary sources covering different perspectives |
| **Justification Quality** | One-sentence assertion | Reasoned but thin | Names the trade-off explicitly |

**Token band:** 5 → 15 average; 18 → 25 distinguished; -5 → -10 if factual errors are severe.

---

## Mission 02 — DECODE

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Comprehension Depth** | Surface restatement | Captures one layer of meaning | Captures multiple layers and tensions |
| **Register Appropriateness** | Wrong register for assigned audience | Mostly right register; some slips | Register hits the audience precisely |
| **Audience Awareness** | Generic "audience" treatment | Names one audience-specific concern | Anticipates and addresses audience-specific objections |
| **Justification Quality** | Implicit | Explicit but generic | Explicit and specific to chosen interpretation |

**Token band:** as Mission 01.

---

## Mission 03 — DEPLOY

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Language Quality (timed)** | Frequent errors compromise meaning | Generally clear, minor errors | Crisp under pressure; controlled register |
| **Strategic Coherence** | Strategy contradicts stated values | Strategy aligns but is generic | Strategy is specific, defensible, and traceable to scenario evidence |
| **Consequence Awareness** | Ignores second-order effects | Names one consequence | Anticipates the trade-off the AI is most likely to surface |
| **Response Under Pressure** | Defensive or incomplete | Holds the position with simple justification | Refines the position in response to feedback |

---

## Mission 04 — DISSECT

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Analytical Depth** | Surface comparison | Two-axis comparison | Multi-axis comparison with weighting |
| **Evidence Quality** | Cites no evidence | Cites evidence loosely | Cites specific evidence with provenance |
| **Leverage Identification** | Picks the most visible point | Picks a defensible point | Picks the highest-leverage point and defends *why it's not* others |
| **Counterargument Handling** | Dismisses or capitulates | Acknowledges, partially answers | Acknowledges, refutes, refines own position |

---

## Mission 05 — TRIBUNAL

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Ethical Reasoning** | Stage-2/3 (tit-for-tat / conformist) | Stage 4 (law-and-order, rule-respecting) | Stage 5/6 (social contract / universal principle) |
| **Argumentation Under Pressure** | Position collapses or stiffens | Holds position with effort | Refines position thoughtfully |
| **Language Precision** | Hedging absent or excessive | Hedging present, occasionally clumsy | Hedging deployed strategically |
| **Willingness to Revise** | None | Performs revision in form only | Genuinely incorporates the strongest counterargument |

**Token band:** 10 → 25 (this is the highest-stakes formative scoring in the curriculum).

---

## Mission 06 — FORGE

This mission is graded by Rubric A (teacher) — Rubric B's role here is limited to in-Studio language coach feedback, evaluated on the Language Coach prompt schema.

---

## Calibration Notes

- AI Judge calibration is checked weekly during pilot by random sampling 5% of decisions and comparing AI scores against teacher scores. Drift triggers prompt revision.
- AI Judge always returns a `growthEdge` — never null. If unable to identify one, the prompt fails validation and the call is retried.
