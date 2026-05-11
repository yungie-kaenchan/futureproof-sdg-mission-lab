/**
 * FUTUREPROOF — AI Judge client
 *
 * Calls the Claude proxy for decision evaluation. Falls back to a heuristic
 * scorer when the proxy isn't reachable, so missions remain demoable on a
 * static dev server.
 */

const CLAUDE_PROXY = "/.netlify/functions/claude-proxy";

export async function evaluateDecision({ missionNumber, missionCode, rubric, decisions, rationale, scenario, profile }) {
  const userMessage = `Evaluate this team decision for Mission ${missionNumber} (${missionCode}).

Scenario title: ${scenario?.title || "(unknown)"}
Decision point: ${scenario?.decisionPoint || "(unknown)"}
Team's choices: ${JSON.stringify(decisions)}
Team's rationale (verbatim student writing):
${rationale || "(none provided)"}

Apply this rubric (each criterion scored 1–5):
${rubric.join(", ")}

Award between -10 and +25 tokens based on the integrated rubric score. Return JSON only.`;

  let response;
  try {
    response = await fetch(CLAUDE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "evaluate",
        userMessage,
        context: { missionNumber, missionCode, rubric, profile },
      }),
    });
  } catch {
    return heuristicScore(rubric, rationale);
  }

  if (!response.ok) return heuristicScore(rubric, rationale);
  const data = await response.json();
  try {
    const parsed = JSON.parse(data.text);
    return {
      scores: parsed.scores || {},
      tokensAwarded: typeof parsed.tokensAwarded === "number" ? parsed.tokensAwarded : 0,
      feedback: parsed.feedback || "",
      strengthsObserved: parsed.strengthsObserved || [],
      growthEdge: parsed.growthEdge || "",
      source: "claude",
    };
  } catch {
    return heuristicScore(rubric, rationale);
  }
}

function heuristicScore(rubric, rationale) {
  const text = String(rationale || "").trim();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const uniq = new Set(words.map((w) => w.toLowerCase())).size / Math.max(wordCount, 1);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSent = sentences.length ? wordCount / sentences.length : 0;

  const lengthScore  = wordCount < 30 ? 2 : wordCount < 60 ? 3 : wordCount < 100 ? 4 : 5;
  const diversity    = uniq > 0.6 ? 4 : uniq > 0.45 ? 3 : 2;
  const cohesion     = avgSent >= 8 && avgSent <= 22 ? 4 : 3;
  const baseline     = Math.round((lengthScore + diversity + cohesion) / 3);

  const scores = {};
  rubric.forEach((c, i) => {
    scores[c] = Math.max(1, Math.min(5, baseline + (i % 2 === 0 ? 0 : -1)));
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const tokensAwarded = Math.round(((total / (rubric.length * 5)) - 0.5) * 30);

  return {
    scores,
    tokensAwarded,
    feedback:
      wordCount < 30
        ? "Add more substance — your rationale is short. Push past the first reaction and explain *why*."
        : "Solid effort. Your reasoning is on track; the next step is making the trade-offs you considered explicit, not implicit.",
    strengthsObserved: wordCount >= 60 ? ["Clear structure"] : [],
    growthEdge: "Name one specific stakeholder and how their interest tipped your call.",
    source: "fallback",
  };
}
