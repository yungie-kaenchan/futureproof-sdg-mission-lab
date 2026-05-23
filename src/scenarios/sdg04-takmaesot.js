/**
 * FUTUREPROOF — SDG 4 Mae Sot — Scenario Adapter
 *
 * Bridges the proven phase-handler module (sdg04-takmaesot-m1.js) to the
 * MissionEngine contract:  { meta, stages, installStages }.
 *
 * meta.id MUST equal a keystones.js JOURNEY_MISSIONS id ("sdg04-takmaesot")
 * so the Keystone awarded on pass is counted toward the Final Task gate.
 * The scenario self-manages its Keystone in the DEBRIEF handler (idempotent),
 * so engine.finishMission() is intentionally never reached.
 */

import { installMaeSotMission } from "./sdg04-takmaesot-m1.js";

export const meta = {
  id: "sdg04-takmaesot",          // ← JOURNEY_MISSIONS id (Keystone key)
  sdg: 4,
  region: "West",
  title: "The Children at the Border",
};

/* Stage ids match the handlers registered by installMaeSotMission.
 * Labels/codes use the v2 BRIEF·PROBE·DECIDE·ACT·DEBRIEF arc vocabulary. */
export const stages = [
  { id: "briefing",     label: "BRIEF",            code: "STAGE 01 // BRIEF" },
  { id: "dossier",      label: "PROBE",            code: "STAGE 02 // PROBE" },
  { id: "stakeholders", label: "PROBE",            code: "STAGE 02 // PROBE · VOICES" },
  { id: "quiz",         label: "DECIDE · ACT", code: "STAGE 03–04 // DECIDE · ACT" },
  { id: "complete",     label: "DEBRIEF",          code: "STAGE 05 // DEBRIEF" },
];

export function installStages(engine) {
  installMaeSotMission(engine);
}
