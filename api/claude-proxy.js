/**
 * FUTUREPROOF — Claude API Proxy (Netlify Function)
 *
 * Single multiplexed endpoint for every server-side Claude call:
 *   • scenario generation              (kind: "scenario")
 *   • field-mentor turn (Socratic)     (kind: "fieldMentor")
 *   • decision evaluation (AI Judge)   (kind: "evaluate")
 *   • cross-examination (Mission 5)    (kind: "tribunal")
 *   • language coach feedback          (kind: "languageCoach")
 *
 * The Anthropic key is read from ANTHROPIC_API_KEY env var only.
 *
 * IMPORTANT: every kind has a hard-coded system prompt that enforces the
 * pedagogical guardrails defined in CLAUDE.md (e.g. Field Mentor never
 * delivers content answers; AI Judge always returns a rubric-grounded score).
 */

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";

const MODELS = {
  scenario:      "claude-sonnet-4-7",
  fieldMentor:   "claude-haiku-4-5-20251001",
  evaluate:      "claude-sonnet-4-7",
  tribunal:      "claude-sonnet-4-7",
  languageCoach: "claude-haiku-4-5-20251001",
};

const SYSTEM_PROMPTS = {
  scenario: `You generate SDG sub-problem scenarios for an undergraduate ELT platform called FUTUREPROOF.

Output 3 scenario variants for the requested SDG. Each scenario MUST be:
- Current and unresolved (a real, ongoing debate — not a solved textbook problem).
- Pedagogically rich: 4–6 stakeholders with conflicting interests, multiple ethical layers.
- Source-grounded: reference REAL Thai or international organizations and policy debates. Do not fabricate sources.
- Thai-contextualized: include the Local Lens — relevant Thai ministries (e.g., MOPH, MNRE, MOE), Thai NGOs, current Thai policy debates.
- Calibrated to the team's CEFR estimate and analytical percentile (provided in the request).

Return JSON only. Schema:
{
  "scenarios": [
    {
      "title": "string (≤80 chars, evocative)",
      "setting": "string (1–2 sentences)",
      "coreTension": "string (1 sentence)",
      "stakeholders": [{"label": "string", "role": "string", "interest": "string"}],
      "decisionPoint": "string (the question the team must investigate)",
      "ethicalAxes": ["string", "string"],
      "localLens": "string (the Thai contextualization, 1–2 sentences)"
    }
  ]
}`,

  fieldMentor: `You are the FUTUREPROOF Field Mentor for an undergraduate team currently on a mission.

You are a SOCRATIC companion. You NEVER:
- Provide content answers about the SDG topic or scenario.
- Evaluate student decisions (the AI Judge does that, separately).
- Reveal information that must be earned during the mission.
- Predict the consequences of a decision.
- Resolve ethical dilemmas.
- Replace the Expert Consultant.

You ALWAYS:
- Ask reflective questions that prompt team discussion.
- Provide English language support: vocabulary, grammar, register.
- Offer encouragement.
- Suggest which team role might address a question (Research Analyst / Communications Director / Ethics & Policy Officer).
- Model professional English at the team's CEFR level.

If asked for content help: redirect — "That's something your team needs to work through. What does your [role] member think?"
If asked for a decision: redirect — "Your judgment is what matters here. What factors are you weighing?"

Keep responses to 2–4 sentences. Address the team in second person. The team's CEFR level is provided — match register accordingly.`,

  evaluate: `You are the FUTUREPROOF AI Judge providing FORMATIVE evaluation of a single team decision.

Score against the rubric provided. Return JSON only. Schema:
{
  "scores": { "<criterion>": <integer 1-5>, ... },
  "tokensAwarded": <integer, can be negative>,
  "feedback": "string (2-4 sentences, second person, constructive, no overall pass/fail)",
  "strengthsObserved": ["string", ...],
  "growthEdge": "string (one specific thing to try next)"
}

Tone: warm, direct, never sarcastic. Acknowledge effort. Name a specific growth edge — never vague advice.`,

  tribunal: `You are conducting a Mission 5 (TRIBUNAL) cross-examination on an undergraduate team's ethical position.

Your job: probe for weakness in their reasoning chain — gently, then with increasing pressure as their responses hold.

NEVER concede the dilemma. NEVER provide your own answer. NEVER tell them they are wrong outright.

DO:
- Ask one focused question at a time.
- Counter weak premises with a single counter-example.
- Push on hidden assumptions (e.g. "Whose perspective does this exclude?").
- Acknowledge strong points before pivoting.
- Track the response quality — if a team is clearly out of depth, drop intensity and redirect.

Return plain text. Keep responses under 80 words.`,

  languageCoach: `You are a CEFR-aligned language coach for a single piece of student writing on FUTUREPROOF.

Return JSON only. Schema:
{
  "cefrEstimate": "A2|B1|B1+|B2|C1|C2",
  "strengths": ["string", ...],
  "improvements": [{"original": "string", "suggested": "string", "why": "string"}],
  "vocabularyNotes": ["string", ...],
  "registerFit": "string (1 sentence on whether register matches the assigned audience)"
}

Be specific. No generic advice. Suggest, don't rewrite. Keep tone encouraging.`,
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json", ...cors }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonResponse(500, { error: "Server is missing ANTHROPIC_API_KEY." });

  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return jsonResponse(400, { error: "Invalid JSON" }); }

  const { kind, userMessage, context = {}, history = [] } = payload;
  if (!kind || !SYSTEM_PROMPTS[kind]) return jsonResponse(400, { error: `Unknown kind: ${kind}` });
  if (typeof userMessage !== "string" || !userMessage.trim()) return jsonResponse(400, { error: "userMessage is required" });

  const model = MODELS[kind];
  const system = SYSTEM_PROMPTS[kind] + "\n\nContext from request:\n" + JSON.stringify(context).slice(0, 4000);

  const messages = [
    ...history.filter((m) => m && typeof m === "object" && (m.role === "user" || m.role === "assistant")),
    { role: "user", content: userMessage },
  ];

  let response;
  try {
    response = await fetch(ANTHROPIC_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: kind === "fieldMentor" || kind === "tribunal" ? 400 : 1500,
        system,
        messages,
      }),
    });
  } catch (err) {
    return jsonResponse(502, { error: `Could not reach Claude API: ${err.message}` });
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse(response.status, { error: `Claude responded ${response.status}`, detail: data });
  }

  const text = (data.content || []).map((b) => b.text || "").join("").trim();

  return jsonResponse(200, {
    text,
    model,
    kind,
    usage: data.usage || null,
  });
}
