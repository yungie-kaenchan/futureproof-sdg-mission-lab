/**
 * FUTUREPROOF — SDG 3 EEC fringe — Scenario Adapter
 *
 * Bridges the proven phase-handler module (sdg03-eecfringe-m1.js) to the
 * MissionEngine contract:  { meta, stages, installStages }.
 *
 * meta.id MUST equal a keystones.js JOURNEY_MISSIONS id ("sdg03-eecfringe")
 * so the Keystone awarded on pass is counted toward the Final Task gate.
 * The scenario self-manages its Keystone in the DEBRIEF handler (idempotent),
 * so engine.finishMission() is intentionally never reached.
 *
 * Sixth and final journey mission — with this in place, the six-Keystone
 * Final Task gate becomes reachable end-to-end.
 */

import { installEecFringeMission } from "./sdg03-eecfringe-m1.js";

export const meta = {
  id: "sdg03-eecfringe",            // ← JOURNEY_MISSIONS id (Keystone key)
  sdg: 3,
  region: "East",
  title: "The Village the Boom Left Behind",
};

/* Stage ids match the handlers registered by installEecFringeMission. */
export const stages = [
  { id: "briefing",     label: "BRIEF",            code: "STAGE 01 // BRIEF" },
  { id: "dossier",      label: "PROBE",            code: "STAGE 02 // PROBE" },
  { id: "stakeholders", label: "PROBE",            code: "STAGE 02 // PROBE · VOICES" },
  { id: "quiz",         label: "DECIDE · ACT", code: "STAGE 03–04 // DECIDE · ACT" },
  { id: "complete",     label: "DEBRIEF",          code: "STAGE 05 // DEBRIEF" },
];

export function installStages(engine) {
  installEecFringeMission(engine);
}
