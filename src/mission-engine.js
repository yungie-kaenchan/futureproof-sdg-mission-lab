/**
 * FUTUREPROOF v2 — Mission Engine (Mastery-Spiral Arc)
 *
 * Reconstruction Master §4. Replaces v1's "6 missions = 6 Bloom levels"
 * with ONE 5-stage compressed Bloom micro-arc that every SDG mission runs:
 *
 *   BRIEF   Remember + Understand   "Read the land"
 *   PROBE   Apply + Analyze         "Follow the thread"
 *   DECIDE  Evaluate                "Hold the line"      (retry once)
 *   ACT     Create (small)          "Send word"          (retry once)
 *   DEBRIEF Metacognition           "Earn the Keystone"  (awards Keystone)
 *
 * Mission *identity* lives in scenario content modules (e.g.
 * src/scenarios/sdg06-khonkaen-*), NOT in this engine. The engine is the
 * shared spine; the scenario supplies the per-stage content + handlers.
 *
 * A mission yields its SDG Keystone when the learner MEETS THE BAR
 * (composite score ≥ pass threshold, default 0.60) — not on perfection.
 * The full Create level is the journey capstone: the Final Task.
 *
 * UI is built with safe DOM construction (no innerHTML) so authored
 * scenario strings can never become an injection vector.
 *
 * Tokens (process reward)   → tokens.js     (per-stage)
 * Keystones (progression)   → keystones.js  (one per mission passed)
 * Adaptive reading tier     → adaptive.js   (static tier-on-entry)
 * AI decision evaluation    → judge.js      (DECIDE stage)
 */

import { evaluateDecision } from "./judge.js";
import { awardTokens } from "./tokens.js";
import { awardKeystone } from "./keystones.js";
import { getReadingTier } from "./adaptive.js";
import { getFlowState, isFirebaseAvailable } from "./auth.js";

/* ──────────────────────────────────────────────────────────────────
 * The canonical 5-stage arc (Spec §4)
 * ──────────────────────────────────────────────────────────────── */
export const MISSION_ARC = [
  { id: "brief",   code: "BRIEF",   bloom: "Remember · Understand", label: "Read the land",     minutes: 15, weight: 0.15 },
  { id: "probe",   code: "PROBE",   bloom: "Apply · Analyze",       label: "Follow the thread", minutes: 20, weight: 0.25 },
  { id: "decide",  code: "DECIDE",  bloom: "Evaluate",              label: "Hold the line",     minutes: 20, weight: 0.30, retryOnce: true },
  { id: "act",     code: "ACT",     bloom: "Create (small)",        label: "Send word",         minutes: 20, weight: 0.25, retryOnce: true },
  { id: "debrief", code: "DEBRIEF", bloom: "Metacognition",         label: "Earn the Keystone", minutes: 10, weight: 0.05, awardsKeystone: true },
];

export const DEFAULT_PASS_THRESHOLD = 0.60; // composite ≥ this → Keystone

/* Back-compat shim: older modules referenced MISSION_CONFIGS. The v2 arc
   is mission-agnostic; expose it under the legacy name too. New code
   should import MISSION_ARC. */
export const MISSION_CONFIGS = MISSION_ARC;

/* ──────────────────────────────────────────────────────────────────
 * Safe DOM builder — el(tag, props, ...children)
 *   props.text  → textContent (escaped by definition)
 *   props.html  → intentionally NOT supported (no innerHTML anywhere)
 *   props.cls   → className
 *   props.on    → { event: handler }
 *   any other prop → setAttribute
 * children: strings (→ text nodes) or Nodes
 * ──────────────────────────────────────────────────────────────── */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "text") node.textContent = v;
    else if (k === "cls") node.className = v;
    else if (k === "on" && v && typeof v === "object") {
      for (const [ev, fn] of Object.entries(v)) node.addEventListener(ev, fn);
    } else if (v != null) {
      node.setAttribute(k, v);
    }
  }
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

/* ──────────────────────────────────────────────────────────────────
 * MissionEngine
 *
 * Usage:
 *   const engine = new MissionEngine({ scenario, container, onComplete });
 *   engine.start({ profile });            // scenario.installStages auto-called
 *
 * A scenario module exposes:
 *   scenario.meta            { id, sdg, region, title, ... }  (id ∈ JOURNEY_MISSIONS)
 *   scenario.passThreshold?  number (overrides DEFAULT_PASS_THRESHOLD)
 *   scenario.stages?         custom stage list (defaults to MISSION_ARC)
 *   scenario.installStages(engine)  registers a handler per stage id
 *
 * Stage handler signature:  (container, state, engine, tier) => void|Promise
 * A handler reports its stage score (0..1) via engine.scoreStage(id, score).
 * ──────────────────────────────────────────────────────────────── */
export class MissionEngine {
  constructor({ scenario, container, onComplete }) {
    if (!scenario || !scenario.meta || !scenario.meta.id) {
      throw new Error("MissionEngine requires a scenario module with .meta.id");
    }
    this.scenario = scenario;
    this.missionId = scenario.meta.id;
    this.stages = Array.isArray(scenario.stages) && scenario.stages.length
      ? scenario.stages : MISSION_ARC;
    this.passThreshold = typeof scenario.passThreshold === "number"
      ? scenario.passThreshold : DEFAULT_PASS_THRESHOLD;
    this.container = container;
    this.onComplete = onComplete || (() => {});
    this.handlers = {};
    this.profile = null;
    this.tier = 2;
    this.state = {
      stageIndex: 0,
      scores: {},      // { stageId: 0..1 }
      decisions: {},   // free-form per-stage capture
      retries: {},     // { stageId: count }
      tokensEarned: 0,
      composite: 0,
      passed: false,
      keystoneAwarded: false,
    };
  }

  registerStageHandler(stageId, fn) { this.handlers[stageId] = fn; }
  /* Back-compat alias — v1 scenario modules called this "PhaseHandler". */
  registerPhaseHandler(stageId, fn) { this.handlers[stageId] = fn; }

  async start({ profile } = {}) {
    this.profile = profile || (getFlowState() && getFlowState().learnerProfile) || null;
    this.tier = getReadingTier(this.profile); // static tier-on-entry (Spec §5)
    if (typeof this.scenario.installStages === "function") {
      this.scenario.installStages(this);
    }
    this.renderStage();
  }

  currentStage() { return this.stages[this.state.stageIndex]; }

  async renderStage() {
    const stage = this.currentStage();
    this.container.replaceChildren();
    const handler = this.handlers[stage.id];
    if (handler) {
      await handler(this.container, this.state, this, this.tier);
    } else {
      this.renderMissingStage(stage);
    }
  }

  renderMissingStage(stage) {
    const code = el("code", { text: this.missionId });
    this.container.replaceChildren(
      el("div", { cls: "space-y-3" },
        el("div", { cls: "console-label-gold", text: stage.code }),
        el("h2", { cls: "display-heading text-2xl", text: stage.label }),
        el("p", { cls: "body-m text-on-surface-variant" },
          "This stage has no handler yet for scenario ", code,
          ". Documented-only mission — see its production master."),
      ),
    );
  }

  scoreStage(stageId, score) {
    this.state.scores[stageId] = Math.max(0, Math.min(1, Number(score) || 0));
  }

  canRetry(stageId) {
    const stage = this.stages.find((x) => x.id === stageId);
    if (!stage || !stage.retryOnce) return false;
    return (this.state.retries[stageId] || 0) < 1;
  }
  retryStage() {
    const stage = this.currentStage();
    if (!this.canRetry(stage.id)) return false;
    this.state.retries[stage.id] = (this.state.retries[stage.id] || 0) + 1;
    this.renderStage();
    return true;
  }

  async advance() {
    this.state.stageIndex += 1;
    if (this.state.stageIndex >= this.stages.length) return this.finishMission();
    this.renderStage();
  }

  back() {
    if (this.state.stageIndex === 0) return;
    this.state.stageIndex -= 1;
    this.renderStage();
  }

  computeComposite() {
    let total = 0, wsum = 0;
    for (const stage of this.stages) {
      const w = typeof stage.weight === "number" ? stage.weight : (1 / this.stages.length);
      wsum += w;
      total += (this.state.scores[stage.id] || 0) * w;
    }
    return wsum > 0 ? total / wsum : 0;
  }

  /* Optional AI evaluation hook for the DECIDE stage. Graceful on failure
     — the journey must never be blocked by an AI-call error. */
  async evaluateDecideStage({ rubric, decision, rationale }) {
    try {
      return await evaluateDecision({
        missionId: this.missionId,
        missionCode: "DECIDE",
        rubric: rubric || ["reasoning", "evidence", "languagePrecision", "stakeholderAwareness"],
        decisions: decision || {},
        rationale: rationale || "",
        scenario: this.scenario.meta,
        profile: this.profile,
      });
    } catch (_) {
      return { scores: {}, feedback: "", tokensAwarded: 0, _fallback: true };
    }
  }

  /* Per-stage Insight Tokens (process reward). Best-effort. */
  async awardStageTokens(stageId, delta, reason) {
    if (!delta) return;
    this.state.tokensEarned += delta;
    try {
      const flow = getFlowState();
      if (flow && flow.uid && isFirebaseAvailable()) {
        await awardTokens({
          tid: flow.uid, delta,
          reason: reason || `${this.missionId}:${stageId}`,
          missionId: `${flow.uid}_${this.missionId}_${stageId}`,
        });
      }
    } catch (_) { /* graceful */ }
  }

  /* End of arc — composite → pass? → award Keystone if ≥ bar. */
  async finishMission() {
    this.state.composite = this.computeComposite();
    this.state.passed = this.state.composite >= this.passThreshold;

    if (this.state.passed) {
      try {
        const flow = getFlowState();
        const res = await awardKeystone(flow && flow.uid, this.missionId, {
          source: "mission",
          reason: `Composite ${(this.state.composite * 100).toFixed(0)}% ≥ bar ${(this.passThreshold * 100).toFixed(0)}%`,
        });
        this.state.keystoneAwarded = Boolean(res && res.earned);
      } catch (_) { /* graceful — local pass still recorded */ }
    }
    this.renderOutcome();
  }

  renderOutcome() {
    const pct = Math.round(this.state.composite * 100);
    const bar = Math.round(this.passThreshold * 100);
    const passed = this.state.passed;

    const heading = passed
      ? `+1 SDG Keystone · ${this.scenario.meta.title}`
      : `${pct}% · bar is ${bar}%`;
    const body = passed
      ? "You met the bar for this region. The Keystone is yours — one of six."
      : `Close. You scored ${pct}%; the bar is ${bar}%. Replay DECIDE or ACT to lift it.`;

    const finish = () => this.onComplete({
      passed: this.state.passed,
      composite: this.state.composite,
      keystoneAwarded: this.state.keystoneAwarded,
      missionId: this.missionId,
    });
    const restart = () => {
      this.state.stageIndex = 0;
      this.state.scores = {};
      this.state.retries = {};
      this.state.composite = 0;
      this.state.passed = false;
      this.renderStage();
    };

    const actions = passed
      ? el("div", { cls: "flex flex-wrap items-center gap-3 pt-2" },
          el("button", { cls: "btn-primary", type: "button", on: { click: finish } },
            el("span", { text: "Return to the Journey Map" }), el("span", { text: "→" })))
      : el("div", { cls: "flex flex-wrap items-center gap-3 pt-2" },
          el("button", { cls: "btn-primary", type: "button", on: { click: restart } },
            el("span", { text: "Replay this mission" })),
          el("button", { cls: "btn-secondary", type: "button", on: { click: finish } },
            el("span", { text: "Back to map (keep trying later)" })));

    this.container.replaceChildren(
      el("div", { cls: "space-y-5" },
        el("div", { cls: "console-label-gold", text: passed ? "KEYSTONE EARNED" : "NOT YET" }),
        el("h2", { cls: "display-heading text-3xl", text: heading }),
        el("p", { cls: "body-l text-on-surface/85", text: body }),
        actions,
      ),
    );
  }
}

/* Shared utilities for scenario handlers. */
export function humanizeKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase()).trim();
}
export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
