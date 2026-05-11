/**
 * FUTUREPROOF — Topbar actions
 *
 * Auto-injects a "Sign Out" nav-btn into the topbar of any page that has one.
 * Wires it to clear flow state + sign out + redirect home, with a confirm step
 * so people don't fat-finger it mid-mission.
 *
 * Idempotent: if already injected, does nothing. Safe to import from any page.
 */

import { getFlowState, signOutCurrent, clearFlowState } from "./auth.js";

const NAV_HOST_SELECTOR = ".topbar nav, .topbar .flex.items-center.gap-2:last-child, .topbar > div > .flex:last-child";

function ensureSignOutButton() {
  if (document.getElementById("topbar-signout")) return;

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  // Only show Sign Out if a user is actually mid-flow.
  const flow = getFlowState();
  if (!flow || !flow.uid) return;

  // Find a sensible host — the right-side flex group in the topbar.
  const navHost =
    topbar.querySelector("nav") ||
    topbar.querySelector(".flex.items-center.gap-4:last-of-type") ||
    topbar.querySelector(".flex.items-center.gap-2:last-of-type") ||
    topbar.querySelector(".flex:last-of-type");

  if (!navHost) return;

  const btn = document.createElement("button");
  btn.id = "topbar-signout";
  btn.type = "button";
  btn.className = "nav-btn";
  btn.title = "Sign out and clear this device's progress.";
  btn.setAttribute("aria-label", "Sign out");
  btn.innerHTML = `
    <span class="material-symbols-rounded size-20" aria-hidden="true" style="vertical-align:middle;margin-right:4px;">logout</span>
    <span>Sign out</span>
  `;

  btn.addEventListener("click", async () => {
    const ok = window.confirm(
      "Sign out and exit the onboarding?\n\n" +
        "Your assessment answers stay on this device — when you sign back in, " +
        "you'll pick up where you left off."
    );
    if (!ok) return;

    btn.disabled = true;
    btn.querySelector("span:last-child").textContent = "Signing out…";

    try {
      await signOutCurrent();
    } catch (_) {
      // Even if Firebase fails, still clear local flow state and redirect.
      clearFlowState();
    }

    // Land on the homepage so the user can sign in again or just browse.
    const isInsidePages = location.pathname.includes("/pages/");
    location.href = isInsidePages ? "../index.html" : "./index.html";
  });

  navHost.appendChild(btn);
}

// Inject as soon as the DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ensureSignOutButton);
} else {
  ensureSignOutButton();
}
