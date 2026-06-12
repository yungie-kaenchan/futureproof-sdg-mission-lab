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

      const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", agentId);

      const style = document.createElement("style");
      const footer = document.getElementById("center-footer");
      if (footer) {
        // Mission pages: join the footer button row as its LEFTMOST item,
        // next to "View dossier". The widget bubble renders centered on
        // its host, so the host sits inside a fixed-size slot that
        // reserves real space in the flex row — the bubble can't overlap
        // its neighbours. (The host's own stylesheet wants fixed
        // bottom-right; static-in-slot overrides it.)
        style.textContent =
          "#fp-voice-slot{flex:0 0 auto;width:200px;height:50px;position:relative;}" +
          "#fp-voice-slot elevenlabs-convai{position:absolute !important;inset:0 !important;" +
          "margin:auto !important;width:100% !important;height:100% !important;}" +
          "@media (max-width:900px){#fp-voice-slot{width:160px;height:44px;}}";
        document.head.appendChild(style);
        const slot = document.createElement("div");
        slot.id = "fp-voice-slot";
        slot.appendChild(widget);
        footer.insertBefore(slot, footer.firstChild);
      } else {
        // Capstone / pages without the footer bar: float in the free
        // bottom-right corner.
        style.textContent =
          "elevenlabs-convai{position:fixed !important;bottom:18px !important;right:18px !important;" +
          "left:auto !important;z-index:60 !important;}";
        document.head.appendChild(style);
        document.body.appendChild(widget);
      }

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
