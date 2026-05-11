/**
 * FUTUREPROOF — Integrity Meter
 *
 * A persistent, glanceable gauge showing the team's running ethical
 * consistency score over the course of the mission journey. Reads from
 * /teams/$tid/integrityScore (0..1) and renders an SVG arc that fills
 * with crimson at low values, gold at high.
 *
 * Mount via:
 *   import { mountIntegrityMeter } from "./integrity-meter.js";
 *   mountIntegrityMeter(document.getElementById("integrity-mount"));
 */

import { isFirebaseAvailable, getFlowState } from "./auth.js";

const COLORS = [
  { at: 0.00, color: "#b57c34" },  // bronze (warm pop — low integrity warning)
  { at: 0.45, color: "#647293" },  // muted slate (transitioning)
  { at: 0.85, color: "#33486f" },  // deep slate (high integrity)
];

export async function mountIntegrityMeter(host, { initial = 0.5, label = "INTEGRITY" } = {}) {
  if (!host) return;
  host.classList.add("integrity-meter");
  host.innerHTML = `
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path class="track" d="M2 18 a 16 16 0 0 1 32 0" />
      <path class="fill"  d="M2 18 a 16 16 0 0 1 32 0" stroke-dasharray="0 100" />
    </svg>
    <div class="integrity-label">
      <span class="console-label">${label}</span>
      <span class="integrity-value">—</span>
    </div>
  `;
  const fill = host.querySelector(".fill");
  const value = host.querySelector(".integrity-value");

  function set(score) {
    const clamped = Math.max(0, Math.min(1, score));
    const dash = (clamped * 50).toFixed(1); // half-circle path is ~50 units
    fill.setAttribute("stroke-dasharray", `${dash} 100`);
    fill.setAttribute("stroke", colorAt(clamped));
    value.textContent = `${Math.round(clamped * 100)}`;
  }

  set(initial);

  const flow = getFlowState();
  if (flow?.uid && isFirebaseAvailable()) {
    try {
      const fb = await import("./firebase-init.js");
      fb.watchPath(`${fb.paths.team(flow.uid)}/integrityScore`, (s) => {
        if (typeof s === "number") set(s);
      });
    } catch (_) {/* graceful */}
  }

  return { set };
}

function colorAt(t) {
  for (let i = COLORS.length - 1; i >= 0; i--) {
    if (t >= COLORS[i].at) return COLORS[i].color;
  }
  return COLORS[0].color;
}
