/**
 * FUTUREPROOF — SDG 13 Chiang Mai — Scenario Adapter
 *
 * Bridges the proven phase-handler module (sdg13-chiangmai-m1.js) to the
 * MissionEngine contract:  { meta, stages, installStages }.
 *
 * meta.id MUST equal a keystones.js JOURNEY_MISSIONS id ("sdg13-chiangmai")
 * so the Keystone awarded on pass is counted toward the Final Task gate.
 * The scenario self-manages its Keystone in the DEBRIEF handler (idempotent),
 * so engine.finishMission() is intentionally never reached.
 */

import { installChiangMaiMission } from "./sdg13-chiangmai-m1.js";

export const meta = {
  id: "sdg13-chiangmai",          // ← JOURNEY_MISSIONS id (Keystone key)
  sdg: 13,
  region: "North",
  title: "The Burning Season",
};

/* Stage ids match the handlers registered by installChiangMaiMission.
 * Labels/codes use the v2 BRIEF·PROBE·DECIDE·ACT·DEBRIEF arc vocabulary. */
export const stages = [
  // 5 internal phases mapped onto the canonical 5-stage arc
  // (BRIEF · PROBE · DECIDE · ACT · DEBRIEF). PROBE spans the dossier +
  // the stakeholder dispatches; the quiz is where DECIDE then ACT happen.
  { id: "briefing",     label: "BRIEF",        code: "STAGE 01 // BRIEF" },
  { id: "dossier",      label: "PROBE",        code: "STAGE 02 // PROBE" },
  { id: "stakeholders", label: "PROBE",        code: "STAGE 02 // PROBE \u00b7 VOICES" },
  { id: "quiz",         label: "DECIDE \u00b7 ACT", code: "STAGE 03\u201304 // DECIDE \u00b7 ACT" },
  { id: "complete",     label: "DEBRIEF",      code: "STAGE 05 // DEBRIEF" },
];

export function installStages(engine) {
  installChiangMaiMission(engine);
}
