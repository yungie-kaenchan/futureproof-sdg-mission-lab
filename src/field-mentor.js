/**
 * FUTUREPROOF — Field Mentor (Socratic chat)
 *
 * Constraints (per CLAUDE.md §9):
 *   - Never delivers content answers about the SDG/scenario.
 *   - Never evaluates decisions.
 *   - Only asks reflective questions and provides language support.
 *   - Logs every turn so teachers can audit.
 *
 * The system prompt enforcing these constraints lives server-side in
 * api/claude-proxy.js. This module is the client transport + UI binding.
 *
 * Daily query limit: 10 messages per mission. After that, the mentor will
 * politely redirect the team to their teammates.
 */

const CLAUDE_PROXY = "/.netlify/functions/claude-proxy";
const PER_MISSION_LIMIT = 10;

export function startMentorChat({ logEl, profile, missionConfig, scenario }) {
  let history = [];
  let usage = readUsage(missionConfig.code);

  appendBot(
    `Hi — I'm Mr. Compass, your Field Mentor. I won't give you answers, but I'll ask the right questions and help with English. ` +
    `You've got ${PER_MISSION_LIMIT - usage.count} questions left for this mission.`
  );

  function appendUser(text) {
    const m = document.createElement("div");
    m.className = "mentor-msg user";
    m.textContent = text;
    logEl.appendChild(m);
    logEl.scrollTop = logEl.scrollHeight;
  }
  function appendBot(text) {
    const m = document.createElement("div");
    m.className = "mentor-msg bot";
    m.textContent = text;
    logEl.appendChild(m);
    logEl.scrollTop = logEl.scrollHeight;
  }
  function appendStatus(text) {
    const m = document.createElement("div");
    m.className = "mentor-msg bot";
    m.style.fontStyle = "italic";
    m.textContent = text;
    logEl.appendChild(m);
    logEl.scrollTop = logEl.scrollHeight;
  }

  async function send(userText) {
    appendUser(userText);
    history.push({ role: "user", content: userText });

    if (usage.count >= PER_MISSION_LIMIT) {
      appendBot(
        "You've used your mentor questions for this mission. Lean on your team — your Research Analyst, Comms Director, or Ethics Officer will see angles I can't."
      );
      return;
    }

    appendStatus("Thinking…");
    const placeholder = logEl.lastChild;

    try {
      const response = await fetch(CLAUDE_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "fieldMentor",
          userMessage: userText,
          context: {
            cefr: profile?.language?.cefrEstimate || profile?.cefrEstimate || "B1",
            mission: { code: missionConfig.code, bloom: missionConfig.bloom },
            scenarioTitle: scenario?.title || null,
          },
          history: history.slice(-8),
        }),
      });
      placeholder.remove();
      if (!response.ok) {
        appendBot(localFallback(userText));
        return;
      }
      const data = await response.json();
      const text = (data.text || "").trim();
      if (!text) { appendBot(localFallback(userText)); return; }
      appendBot(text);
      history.push({ role: "assistant", content: text });
      usage.count += 1;
      writeUsage(missionConfig.code, usage);
    } catch {
      placeholder.remove();
      appendBot(localFallback(userText));
    }
  }

  function localFallback(userText) {
    // Offline fallback — Socratic redirects without a model. Simple keyword routing.
    const t = userText.toLowerCase();
    if (/answer|tell me|what's the right|which option|correct/.test(t)) {
      return "I won't give you the answer — but tell me which two factors are pulling you in opposite directions, and we can work from there.";
    }
    if (/word|vocab|how do you say|grammar|register/.test(t)) {
      return "Happy to help on language. Paste the sentence you're working on and I'll suggest a more precise word or a register tweak.";
    }
    if (/decide|should we|which strategy/.test(t)) {
      return "Your judgment is what matters here. What does your Ethics Officer think the cost would be of being wrong?";
    }
    return "Good question. What does your team know now that you didn't an hour ago — and what does that tell you about what's worth investigating next?";
  }

  return { send };
}

function key(missionCode) { return `fp_mentor_usage_${missionCode}`; }
function readUsage(code) {
  try { return JSON.parse(localStorage.getItem(key(code))) || { count: 0 }; }
  catch { return { count: 0 }; }
}
function writeUsage(code, u) { localStorage.setItem(key(code), JSON.stringify(u)); }
