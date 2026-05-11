/**
 * FUTUREPROOF — Mission Engine
 *
 * A small finite-state engine that drives all six missions from a shared
 * configuration. Each mission page imports MISSION_CONFIGS[N] and the engine
 * renders phases sequentially: briefing → tasks → decision → judgment →
 * complete.
 *
 * Decision evaluation is delegated to the Claude proxy via /src/judge.js.
 * Tokens move through /src/tokens.js. Decision logs are append-only and
 * persisted via firebase-init's logDecision() helper.
 */

import { evaluateDecision } from "./judge.js";
import { awardTokens, getBalance } from "./tokens.js";
import { getFlowState, isFirebaseAvailable } from "./auth.js";

export const MISSION_CONFIGS = {
  1: {
    code: "RECON",
    bloom: "Remember",
    title: "Recon",
    tagline: "Intel-gathering. Read sharply, choose sources, and map who's actually in the room.",
    rubric: ["factualAccuracy", "vocabularyRecognition", "strategicSourceSelection", "justificationQuality"],
    phases: ["briefing", "vocabulary", "stakeholderMap", "sourceSelect", "rationale", "judgment"],
    decisionPrompt:
      "Pick the two intelligence sources you'll carry into Mission 02. Then justify your choice in 60–80 words: why these two, not the others?",
  },
  2: {
    code: "DECODE",
    bloom: "Understand",
    title: "Decode",
    tagline: "Same crisis, different audience. Shift register, hold meaning.",
    rubric: ["comprehensionDepth", "registerAppropriateness", "audienceAwareness", "justificationQuality"],
    phases: ["briefing", "audienceAssign", "explain", "registerCheck", "rationale", "judgment"],
    decisionPrompt:
      "Write a 90–120-word explanation of the crisis to your assigned audience. Match the register to who you're talking to.",
  },
  3: {
    code: "DEPLOY",
    bloom: "Apply",
    title: "Deploy",
    tagline: "A live event escalates the scenario. You decide — and you commit.",
    rubric: ["languageQuality", "strategicCoherence", "consequenceAwareness", "responseUnderPressure"],
    phases: ["briefing", "crisisEvent", "strategySelect", "draftResponse", "rationale", "judgment"],
    decisionPrompt:
      "Pick a strategy from the three offered. In 80–120 words, draft the public statement that commits your team to it.",
  },
  4: {
    code: "DISSECT",
    bloom: "Analyze",
    title: "Dissect",
    tagline: "Consequences arrived. Take it apart — what worked, what failed, and why.",
    rubric: ["analyticalDepth", "evidenceQuality", "leverageIdentification", "counterargumentHandling"],
    phases: ["consequencesReveal", "compare", "leveragePoint", "counterargument", "rationale", "judgment"],
    decisionPrompt:
      "Identify the single most critical leverage point in this system. Defend the choice in 80–120 words, then respond to a counterargument the AI will raise.",
  },
  5: {
    code: "TRIBUNAL",
    bloom: "Evaluate",
    title: "Tribunal",
    tagline: "An ethical dilemma generated from your specific journey. Defend it.",
    rubric: ["ethicalReasoning", "argumentationUnderPressure", "languagePrecision", "willingnessToRevise"],
    phases: ["dilemmaPresent", "positionDraft", "crossExamine", "finalJudgment", "judgment"],
    decisionPrompt:
      "State your team's final ethical judgment in 100–150 words. Acknowledge the strongest counterargument before resolving it.",
  },
  6: {
    code: "FORGE",
    bloom: "Create",
    title: "Forge",
    tagline: "Five panels. One narrated capsule. You build it in the Studio.",
    rubric: ["panelCoherence", "languageQuality", "designJudgment", "ethicalSynthesis", "voicePresence"],
    phases: ["studioHandoff"],
    decisionPrompt: "Move to the Pitch Capsule Studio.",
  },
};

const PHASE_ORDER = (cfg) => cfg.phases;

export class MissionEngine {
  constructor({ missionNumber, container, onComplete }) {
    this.missionNumber = missionNumber;
    this.config = MISSION_CONFIGS[missionNumber];
    if (!this.config) throw new Error(`Unknown mission: ${missionNumber}`);
    this.container = container;
    this.onComplete = onComplete || (() => {});
    this.state = {
      phaseIndex: 0,
      decisions: {},
      rationale: "",
      tokensEarned: 0,
      judgment: null,
    };
    this.handlers = {};
    this.scenario = null;
    this.profile = null;
  }

  registerPhaseHandler(phase, fn) { this.handlers[phase] = fn; }

  async start({ scenario, profile }) {
    this.scenario = scenario;
    this.profile = profile;
    this.renderPhase();
  }

  currentPhase() {
    return PHASE_ORDER(this.config)[this.state.phaseIndex];
  }

  async renderPhase() {
    const phase = this.currentPhase();
    this.container.innerHTML = "";
    const handler = this.handlers[phase];
    if (handler) {
      await handler(this.container, this.state, this);
    } else {
      await this.renderGenericInput(phase);
    }
  }

  async renderGenericInput(phase) {
    // Multimodal generic stage: READ phase intent + LISTEN prompt + WRITE response + SPEAK closing line
    const { readBlock, listenBlock, speakBlock, multimodalStage } = await import("./multimodal.js");
    const cfg = this.config;
    const promptText = cfg.decisionPrompt;
    const phaseLabel = phase.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase()).trim();

    const blocks = [
      readBlock({
        title: phaseLabel,
        body: promptText,
        sourceLabel: `${cfg.code} stage prompt`,
      }),
      listenBlock({
        title: "Hear the prompt",
        transcript: promptText,
        speakerLabel: "Mission briefing",
        voice: "neutral",
      }),
      (() => {
        const wrap = document.createElement("section");
        wrap.className = "channel-block channel-write";
        wrap.innerHTML = `
          <div class="channel-tag"><span class="material-symbols-rounded size-20">edit_note</span><span>WRITE</span></div>
          <h3 class="title-l mb-1">Your response</h3>
          <p class="body-s text-on-surface-variant mb-3">Write what you would say.</p>
          <div class="m3-textfield">
            <textarea id="phase-input" rows="6" placeholder=" "></textarea>
            <label for="phase-input">Response</label>
          </div>
          <p class="body-s text-on-surface-variant mt-2"><span id="phase-words">0</span> words</p>
        `;
        return wrap;
      })(),
      speakBlock({
        prompt: "Read the closing line of your response aloud.",
        maxSeconds: 30,
        onCapture: (blob, dur) => { this.state.decisions[phase + "Audio"] = { dur }; },
      }),
    ];

    multimodalStage(this.container, blocks);
    const wrap = this.container;
    const ta = wrap.querySelector("#phase-input");
    const wc = wrap.querySelector("#phase-words");
    ta.addEventListener("input", () => {
      const n = ta.value.trim().split(/\s+/).filter(Boolean).length;
      wc.textContent = String(n);
    });
    if (this.state.rationale) ta.value = this.state.rationale;
    this.currentInputEl = ta;
  }

  async advance() {
    const phase = this.currentPhase();
    if (this.currentInputEl && phase !== "judgment") {
      this.state.rationale = this.currentInputEl.value;
    }
    this.state.phaseIndex += 1;
    if (this.state.phaseIndex >= this.config.phases.length) {
      return this.completeMission();
    }
    if (this.currentPhase() === "judgment") {
      return this.runJudgment();
    }
    this.renderPhase();
  }

  back() {
    if (this.state.phaseIndex === 0) return;
    this.state.phaseIndex -= 1;
    this.renderPhase();
  }

  async runJudgment() {
    this.container.innerHTML = `
      <div class="space-y-5">
        <div class="console-label-gold">AI JUDGE</div>
        <h2 class="display-heading text-3xl text-bone-white">Reading your decision…</h2>
        <div class="flex items-center gap-3 text-bone-white/70">
          <span class="spinner"></span><span>Returning a rubric-grounded score in a moment.</span>
        </div>
      </div>
    `;

    const evaluation = await evaluateDecision({
      missionNumber: this.missionNumber,
      missionCode: this.config.code,
      rubric: this.config.rubric,
      decisions: this.state.decisions,
      rationale: this.state.rationale,
      scenario: this.scenario,
      profile: this.profile,
    });

    this.state.judgment = evaluation;
    if (evaluation.tokensAwarded) {
      this.state.tokensEarned = evaluation.tokensAwarded;
      try {
        const flow = getFlowState();
        if (flow?.uid && isFirebaseAvailable()) {
          await awardTokens({
            tid: flow.uid,
            delta: evaluation.tokensAwarded,
            reason: `mission${String(this.missionNumber).padStart(2,"0")}_judgment`,
            missionId: `${flow.uid}_mission${String(this.missionNumber).padStart(2,"0")}`,
          });
        }
      } catch (_) {/* graceful */}
    }
    this.renderJudgment(evaluation);
  }

  renderJudgment(evaluation) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-6";
    const scoreCells = Object.entries(evaluation.scores || {}).map(
      ([k, v]) =>
        `<div class="result-stat"><div class="console-label-gold mb-2">${humanizeKey(k)}</div><div class="result-stat-value">${v}<span class="text-base text-console-dim">/5</span></div></div>`
    ).join("");
    wrap.innerHTML = `
      <div class="console-label-gold">JUDGMENT</div>
      <h2 class="display-heading text-3xl text-bone-white">${evaluation.tokensAwarded >= 0 ? `+${evaluation.tokensAwarded}` : evaluation.tokensAwarded} tokens</h2>
      <p class="text-base text-bone-white/85 leading-relaxed">${escapeHtml(evaluation.feedback || "")}</p>
      <div class="grid sm:grid-cols-2 gap-3">${scoreCells}</div>
      ${evaluation.strengthsObserved?.length ? `<div><div class="console-label-gold mb-2">STRENGTHS</div><ul class="list-disc pl-5 text-sm text-bone-white/80 space-y-1">${evaluation.strengthsObserved.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul></div>` : ""}
      ${evaluation.growthEdge ? `<div><div class="console-label-gold mb-2">GROWTH EDGE</div><p class="text-sm text-bone-white/80">${escapeHtml(evaluation.growthEdge)}</p></div>` : ""}
      <div class="flex flex-wrap items-center gap-4 pt-4">
        <button id="continue-mission" type="button" class="btn-primary"><span>Continue</span><span>→</span></button>
      </div>
    `;
    this.container.innerHTML = "";
    this.container.appendChild(wrap);
    wrap.querySelector("#continue-mission").addEventListener("click", () => this.completeMission());
  }

  async completeMission() {
    this.onComplete({ judgment: this.state.judgment, tokensEarned: this.state.tokensEarned });
  }

  /**
   * Insert a reflection prompt phase. Called from the shell to wrap the
   * mission with pre-mission and post-mission Voice of the Learner moments.
   */
  promptReflection(kind) {
    const cfgEl = document.createElement("a");
    cfgEl.href = `./reflections.html?kind=${encodeURIComponent(kind)}&missionId=${encodeURIComponent(`m${this.missionNumber}`)}`;
    return cfgEl;
  }
}

function humanizeKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase()).trim();
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
