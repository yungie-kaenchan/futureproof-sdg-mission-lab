/**
 * FUTUREPROOF — SDG Accent Palette
 *
 * When a team locks in an SDG, mission-specific UI (progress bars, badges,
 * mentor accents) shifts to that SDG's UN-official accent color. Gold and
 * crimson remain structural — only the *highlight* track changes.
 *
 * Usage:
 *   import { applySDGTheme } from "./sdg-theme.js";
 *   applySDGTheme(13);  // sets CSS variable --sdg-accent on document root
 *
 * The theme is read from the locked-in flow state on every page load by the
 * mission runtime (pages/mission-run.html) and related mission UI.
 */

import { SDG_LIST } from "./scenario.js";

export function applySDGTheme(sdgNumber) {
  const sdg = SDG_LIST.find((s) => s.n === sdgNumber);
  if (!sdg) return;
  document.documentElement.style.setProperty("--sdg-accent", sdg.color);
  document.documentElement.style.setProperty("--sdg-accent-soft", hexWithAlpha(sdg.color, 0.12));
  document.documentElement.dataset.sdg = String(sdgNumber);
}

export function clearSDGTheme() {
  document.documentElement.style.removeProperty("--sdg-accent");
  document.documentElement.style.removeProperty("--sdg-accent-soft");
  delete document.documentElement.dataset.sdg;
}

function hexWithAlpha(hex, alpha) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return `rgba(168, 138, 74, ${alpha})`;
  const v = parseInt(m[1], 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${alpha})`;
}

/**
 * Read the locked SDG from flow state and apply, if present.
 * Convenience wrapper for pages that don't need to know the number themselves.
 */
export async function applySDGThemeFromFlow() {
  const { getFlowState } = await import("./auth.js");
  const flow = getFlowState();
  if (flow?.selectedSDG) applySDGTheme(flow.selectedSDG);
}
