/**
 * FUTUREPROOF — SDG 6 Khon Kaen — Scenario Adapter
 *
 * Bridges the original v1 phase module (sdg06-khonkaen-m1.js) to the
 * MissionEngine contract:  { meta, stages, installStages }.
 *
 * The v1 "complete" handler predates Keystones and does not award one.
 * Rather than edit the frozen, demo-proven module, this adapter wraps
 * the registered "complete" handler: it runs the original UI, then
 * awards the SDG-6 Keystone (idempotent) if the net quiz tokens clear
 * the same pass bar Chiang Mai uses. Keystone parity without churn.
 */

import { installKhonKaenMission1 } from "./sdg06-khonkaen-m1.js";
import { getFlowState } from "../auth.js";
import { awardKeystone } from "../keystones.js";

export const meta = {
  id: "sdg06-khonkaen",           // ← JOURNEY_MISSIONS id (Keystone key)
  sdg: 6,
  region: "Northeast",
  title: "The Aquifer Below Khon Kaen",
};

export const stages = [
  { id: "briefing",     label: "BRIEF",   code: "STAGE 01 // BRIEF" },
  { id: "dossier",      label: "PROBE",   code: "STAGE 02 // PROBE" },
  { id: "stakeholders", label: "PROBE",   code: "STAGE 02 // PROBE" },
  { id: "quiz",         label: "DECIDE",  code: "STAGE 03 // DECIDE" },
  { id: "complete",     label: "DEBRIEF", code: "STAGE 05 // DEBRIEF" },
];

const PASS_THRESHOLD_TOKENS = 8;

export function installStages(engine) {
  installKhonKaenMission1(engine);

  // Wrap the v1 complete handler to add Keystone parity (idempotent).
  const original = engine.handlers && engine.handlers["complete"];
  engine.registerPhaseHandler("complete", async (container, state, eng, tier) => {
    if (typeof original === "function") await original(container, state, eng, tier);
    try {
      const net = (state && state.decisions && state.decisions.quizTokens) || 0;
      if (net >= PASS_THRESHOLD_TOKENS) {
        const flow = getFlowState();
        await awardKeystone(flow && flow.uid, meta.id, {
          source: "mission",
          reason: `Khon Kaen passed (net ${net} tokens >= ${PASS_THRESHOLD_TOKENS}).`,
        });
      }
    } catch (_) { /* graceful — local pass still recorded */ }
  });
}
