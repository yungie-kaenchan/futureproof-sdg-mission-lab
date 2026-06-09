/**
 * FUTUREPROOF — NPC Stakeholder Interview
 *
 * Text-based AI role-play with a scenario stakeholder. Used in Missions 02
 * (DECODE) and 04 (DISSECT) to give teams an authentic-feeling source of
 * voice that they can quote in their rationale.
 *
 * Each interview is a multi-turn chat against the Claude proxy with a
 * system prompt that locks the model into the stakeholder's persona,
 * interests, and asymmetric information.
 */

const CLAUDE_PROXY = "/.netlify/functions/claude-proxy";
const PER_STAKEHOLDER_LIMIT = 6;

export function startNpcChat({ logEl, stakeholder, scenario, profile }) {
  let history = [];
  let usage = readUsage(stakeholder.id || stakeholder.label);

  const system =
    `You are role-playing the following stakeholder in an SDG scenario for FUTUREPROOF, ` +
    `an undergraduate ELT platform. Stay in character. Use first person. ` +
    `Match a CEFR level appropriate to the team (${profile?.cefrEstimate || "B1"}). ` +
    `Refuse to give opinions or information that this specific stakeholder would not realistically have. ` +
    `Do not break character. Do not evaluate the team's questions. Do not give them "the answer" — ` +
    `you have a perspective, not the truth. Keep replies under 80 words.\n\n` +
    `STAKEHOLDER: ${stakeholder.label}\n` +
    `ROLE: ${stakeholder.role || "(unspecified)"}\n` +
    `INTEREST: ${stakeholder.interest || "(unspecified)"}\n` +
    `SCENARIO TITLE: ${scenario?.title || "(unspecified)"}\n` +
    `SCENARIO TENSION: ${scenario?.coreTension || "(unspecified)"}`;

  appendBot(
    `Hi — I'm ${stakeholder.label}. I can talk for a few minutes. ` +
    `You've got ${PER_STAKEHOLDER_LIMIT - usage.count} questions left with me.`
  );

  function appendUser(text) { appendBubble("user", text); }
  function appendBot(text) { appendBubble("bot", text); }
  function appendBubble(role, text) {
    const m = document.createElement("div");
    m.className = "mentor-msg " + (role === "user" ? "user" : "bot");
    m.textContent = text;
    logEl.appendChild(m);
    logEl.scrollTop = logEl.scrollHeight;
  }

  async function send(userText) {
    appendUser(userText);
    history.push({ role: "user", content: userText });

    if (usage.count >= PER_STAKEHOLDER_LIMIT) {
      appendBot("Thanks — I should get back to my work. Your team has what I can offer for now.");
      return;
    }

    // Live-demo guard: 8 s ceiling — a slow API can never stall the interview.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(CLAUDE_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "fieldMentor", // re-use the simpler haiku endpoint; system override below
          userMessage: userText,
          context: { stakeholder, scenarioTitle: scenario?.title, npcSystem: system },
          history: history.slice(-8),
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        appendBot(localFallback(stakeholder));
        return;
      }
      const data = await response.json();
      const text = (data.text || "").trim() || localFallback(stakeholder);
      appendBot(text);
      history.push({ role: "assistant", content: text });
      usage.count += 1;
      writeUsage(stakeholder.id || stakeholder.label, usage);
    } catch {
      appendBot(localFallback(stakeholder));
    } finally {
      clearTimeout(timer);
    }
  }

  function localFallback(stk) {
    return (
      `From where I sit at ${stk.label}, the part you're missing is what this looks like ` +
      `over a five-year horizon, not just next quarter. Ask me a more specific question and ` +
      `I can be more direct.`
    );
  }

  return { send };
}

function key(name) { return `fp_npc_usage_${name}`; }
function readUsage(name) {
  try { return JSON.parse(localStorage.getItem(key(name))) || { count: 0 }; }
  catch { return { count: 0 }; }
}
function writeUsage(name, u) { localStorage.setItem(key(name), JSON.stringify(u)); }
