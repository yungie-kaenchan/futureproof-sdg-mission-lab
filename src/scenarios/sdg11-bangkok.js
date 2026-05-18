/**
 * FUTUREPROOF — SDG 11 Bangkok — Scenario Adapter
 *
 * Bridges the proven phase-handler module (sdg11-bangkok-m1.js) to the
 * MissionEngine contract:  { meta, stages, installStages }.
 *
 * meta.id MUST equal a keystones.js JOURNEY_MISSIONS id ("sdg11-bangkok")
 * so the Keystone awarded on pass is counted toward the Final Task gate.
 * The scenario self-manages its Keystone in the DEBRIEF handler (idempotent),
 * so engine.finishMission() is intentionally never reached.
 */

import { installBangkokMission } from "./sdg11-bangkok-m1.js";

export const meta = {
  id: "sdg11-bangkok",            // ← JOURNEY_MISSIONS id (Keystone key)
  sdg: 11,
  region: "Central",
  title: "The Klong and the City",
};

/* Stage ids match the handlers registered by installBangkokMission.
 * Labels/codes use the v2 BRIEF·PROBE·DECIDE·ACT·DEBRIEF arc vocabulary. */
export const stages = [
  { id: "briefing",     label: "BRIEF",   code: "STAGE 01 // BRIEF" },
  { id: "dossier",      label: "PROBE",   code: "STAGE 02 // PROBE" },
  { id: "stakeholders", label: "PROBE",   code: "STAGE 02 // PROBE" },
  { id: "quiz",         label: "DECIDE",  code: "STAGE 03 // DECIDE" },
  { id: "complete",     label: "DEBRIEF", code: "STAGE 05 // DEBRIEF" },
];

export function installStages(engine) {
  installBangkokMission(engine);
}
