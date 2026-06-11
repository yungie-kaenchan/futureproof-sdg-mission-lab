/**
 * FUTUREPROOF — Mr. Compass Voice (ElevenLabs Agents widget)
 *
 * Mounts the ElevenLabs conversational-AI widget so learners can SPEAK
 * with Mr. Compass and hear it answer in real time. The agent itself
 * (voice, LLM, system prompt with the Socratic + language-desk
 * guardrails) is configured in the ElevenLabs dashboard; this module
 * only injects the floating widget.
 *
 * Entirely optional and additive:
 *   • If FUTUREPROOF_CONFIG.elevenLabsAgentId is empty/missing, nothing
 *     mounts — the text Compass works exactly as before.
 *   • The agent must be PUBLIC in ElevenLabs, with the portal domain in
 *     its Allowlist (Agent → Security → Allowlist:
 *     futureproof-sdgs-lab.netlify.app).
 *
 * PDPA: while the learner talks to the widget, their voice is processed
 * by ElevenLabs. The agent's first message (configured in the dashboard)
 * states this; the consent docs name ElevenLabs as a processor.
 */

(function () {
  function mount() {
    try {
      const cfg = window.FUTUREPROOF_CONFIG || {};
      const agentId = (cfg.elevenLabsAgentId || "").trim();
      if (!agentId) return; // voice not configured — text Compass only
      if (document.querySelector("elevenlabs-convai")) return;

      // Pin the widget to the BOTTOM-LEFT corner. The default bottom-right
      // collides with the pages' own footer clusters (View dossier ·
      // Mr. Compass launcher · Guide on mission-run; submit bar on the
      // capstone). The host element is ordinary fixed-position DOM, so
      // standard CSS overrides relocate it cleanly.
      const style = document.createElement("style");
      style.textContent =
        "elevenlabs-convai{position:fixed !important;bottom:16px !important;left:16px !important;" +
        "right:auto !important;z-index:60 !important;}" +
        "@media (max-width:760px){elevenlabs-convai{bottom:88px !important;left:8px !important;}}";
      document.head.appendChild(style);

      const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", agentId);
      document.body.appendChild(widget);

      const s = document.createElement("script");
      s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      s.async = true;
      s.type = "text/javascript";
      document.body.appendChild(s);
    } catch (e) {
      console.warn("[CompassVoice] widget mount skipped:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
