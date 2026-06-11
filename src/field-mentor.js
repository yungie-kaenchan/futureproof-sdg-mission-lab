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
// Raised from 10 → 20: the language desk (vocab/definition questions) is cheap
// and shouldn't compete with the strategic Socratic questions for the budget.
const PER_MISSION_LIMIT = 20;

export function startMentorChat({ logEl, inputEl, profile, missionConfig, scenario }) {
  let history = [];
  let usage = readUsage(missionConfig.code);
  const input = inputEl || document.getElementById("compass-input") || null;

  appendBot(
    `Hi — I'm Mr. Compass! I won't hand you mission answers, but I'm a full language desk: ` +
    `ask me any word in English or Thai (ถามคำศัพท์เป็นไทยได้เลย), get grammar fixes, register advice, ` +
    `or ask what this stage expects from you. You've got ${PER_MISSION_LIMIT - usage.count} questions left for this mission.`
  );
  renderChips();

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

  // Quick-action chips — discoverability for what Compass can actually do.
  // Prefill chips drop a template into the input; ask chips send directly.
  function renderChips() {
    if (!logEl.parentNode || logEl.parentNode.querySelector(".mentor-chips")) return;
    const row = document.createElement("div");
    row.className = "mentor-chips";
    row.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;";
    const CHIPS = [
      { label: "📖 Define a word",        prefill: 'What does "..." mean?' },
      { label: "🇹🇭 ขอความหมาย",          prefill: 'ช่วยบอกความหมายของคำว่า "..." หน่อย' },
      { label: "✏️ Fix my grammar",       prefill: "Can you check my grammar: ..." },
      { label: "🧭 What does this stage expect?", ask: "What does this stage of the mission expect from me?" },
    ];
    for (const c of CHIPS) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = c.label;
      b.style.cssText = "padding:6px 12px;border-radius:999px;border:1px solid rgba(201,169,97,.6);" +
        "background:rgba(201,169,97,.12);color:inherit;font-size:13px;cursor:pointer;font-family:inherit;";
      b.addEventListener("click", () => {
        if (c.ask) { send(c.ask); return; }
        if (input) {
          input.value = c.prefill;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.focus();
          const i = c.prefill.indexOf("...");
          if (i >= 0 && input.setSelectionRange) input.setSelectionRange(i, i + 3);
        } else {
          appendStatus("Type your question in the box below — e.g. " + c.prefill);
        }
      });
      row.appendChild(b);
    }
    logEl.parentNode.insertBefore(row, logEl.nextSibling);
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

    // Live-demo guard: never hang the chat — 8 s, then the Socratic
    // local fallback answers instead.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
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
        signal: controller.signal,
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
    } finally {
      clearTimeout(timer);
    }
  }

  function localFallback(userText) {
    // Offline fallback — Socratic redirects without a model. Simple keyword routing.
    const t = userText.toLowerCase();
    if (/answer|tell me|what's the right|which option|correct/.test(t)) {
      return "I won't give you the answer — but tell me which two factors are pulling you in opposite directions, and we can work from there.";
    }
    if (/word|vocab|how do you say|grammar|register|mean|ความหมาย|แปลว่า/.test(t)) {
      return "Happy to help on language — give me the single word or short phrase you're stuck on (English or Thai) and I'll unlock it: meaning, Thai gloss, and an example sentence.";
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
