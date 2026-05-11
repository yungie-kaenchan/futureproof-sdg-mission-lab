# Rubric C — CEFR-Aligned Language Development (Pre/Post)

**Used by:** Course-level evaluators
**Applies to:** A single learner's writing and speaking samples taken at three timepoints — diagnostic (Day 4), mid-course (after Mission 03), and post-Pitch-Capsule (after Mission 06)
**Scale:** CEFR bands A2 → C2 with intra-band markers (A2/B1-/B1/B1+/B2-/B2/B2+/C1)

---

## Methodology

The same five language dimensions are scored at each timepoint. Growth = post-band − pre-band, computed in half-band increments.

| Dimension | Diagnostic source | Mid-course source | Post source |
|---|---|---|---|
| **Lexical range** | Vocabulary section + writing prompt | Mission 03 written communication | Pitch Capsule + audio transcript |
| **Grammatical control** | Cloze + writing prompt | Mission 03 + Mission 04 written rationale | Pitch Capsule + Voice transcript |
| **Discourse organization** | Writing prompt | Mission 04 leverage-point defense | Pitch Capsule synthesis |
| **Register flexibility** | Writing prompt (single register) | Mission 02 audience-specific explanation | Pitch Capsule (5 registers) |
| **Phonological control (speaking)** | Optional pre-recording | Mission 03 spoken response | Pitch Capsule audio narration |

---

## CEFR Band Descriptors (FUTUREPROOF working set)

### Lexical range

- **A2:** Limited stock of frequent words; topic-specific vocabulary is rare.
- **B1:** Sufficient vocabulary to discuss familiar topics; some imprecision.
- **B1+:** Reaches for precise vocabulary in familiar domains; occasionally produces lower-frequency word forms.
- **B2:** Range covers most general topics; circumlocutes around lexical gaps.
- **C1:** Reliable command of low-frequency vocabulary, idiomatic and colloquial usage; chosen with intent.

### Grammatical control

- **A2:** Simple structures; frequent errors in coordination and tense.
- **B1:** Reasonable accuracy in familiar contexts; complex structures attempted but uneven.
- **B2:** Good control of complex grammar; errors do not impede communication.
- **C1:** Consistent grammatical control; errors rare and self-correctable.

### Discourse organization

- **A2:** Linear listing; few connectors.
- **B1:** Linear with simple connectors (and, but, because).
- **B2:** Multiple connectors; clear paragraphing; topic sentences emerging.
- **C1:** Complex argument structures; subordination signals reliable; metadiscourse present.

### Register flexibility

- **A2:** Single register only.
- **B1:** Two recognizable registers (formal / informal) with crossover.
- **B2:** Distinguishes academic / persuasive / colloquial; minor leakage.
- **C1:** Selects register strategically; can blend registers for rhetorical effect.

### Phonological control

- **A2:** Pronunciation transparent enough to be understood with effort.
- **B1:** Generally intelligible; word stress sometimes off.
- **B2:** Generally clear; occasional pronunciation issues with low-frequency words.
- **C1:** Pronunciation contributes to meaning; intonation and stress are tools, not obstacles.

---

## Recording Growth

For each learner, the post-Pitch-Capsule rubric outputs:

```json
{
  "lexical": { "pre": "B1", "post": "B1+", "growthHalfBands": 1 },
  "grammar": { "pre": "B1", "post": "B2",  "growthHalfBands": 2 },
  "discourse": { "pre": "B1+", "post": "B2", "growthHalfBands": 1 },
  "register": { "pre": "B1", "post": "B2",  "growthHalfBands": 2 },
  "phonology": { "pre": "B1", "post": "B1+", "growthHalfBands": 1 },
  "compositeGrowthHalfBands": 7
}
```

Composite growth ≥ 4 over a single course is the design target.

---

## Notes

- Inter-rater reliability target: Cohen's κ ≥ 0.7 between two human evaluators on a 10% audit sample.
- The AI evaluator is calibrated against the human-scored samples; drift greater than 0.5 half-band on any dimension triggers prompt revision.
- This rubric explicitly excludes content evaluation — that lives in Rubric A.
