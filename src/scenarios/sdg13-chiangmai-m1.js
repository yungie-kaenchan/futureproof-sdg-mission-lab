/**
 * FUTUREPROOF — SDG 13 Chiang Mai — "The Burning Season" Mission
 *
 * Second fully-built journey mission. Mirrors the proven Khon Kaen M1
 * phase machinery, with three v2 upgrades (Reconstruction Master §4–§5):
 *
 *   1. ADAPTIVE DOSSIER — each part's body is tiered { 1, 2, 3 }. The
 *      learner's reading tier (set once at the diagnostic) selects the
 *      register via adaptive.pickTier(). Gloss density follows the tier.
 *      A visible tier chip keeps the adaptivity transparent in-mission.
 *
 *   2. KEYSTONE ON PASS — completing the mission awards the SDG-13
 *      Keystone (idempotent) via keystones.js. Six Keystones unlock the
 *      Final Task. Insight Tokens remain the separate, spendable currency.
 *
 *   3. XSS-SAFE ECHOES — every learner-typed value rendered back into the
 *      page is passed through escapeHtml(). Authored scenario strings
 *      (dossier/quiz/stakeholder constants in our own modules) are trusted
 *      content; only user input is an injection surface, and it is escaped.
 *
 * Stage labels use the v2 arc (BRIEF·PROBE·DECIDE·ACT·DEBRIEF) over the
 * battle-tested phase scaffold — a deliberate demo-reliability decision.
 */

import { SCENARIO_META, DOSSIER, VOCABULARY, STAKEHOLDERS, INSTITUTIONS_CITED }
  from "./sdg13-chiangmai-content.js";
import { QUIZ_ITEMS, CONFIDENCE_LEVELS, computeTokenAward, shouldShowScaffold, QUIZ_TOKEN_CAP }
  from "./sdg13-chiangmai-quiz.js";
import { ensureDisclaimerAcknowledged, showDisclaimer } from "./scenario-disclaimer.js";
import { awardTokens } from "../tokens.js";
import { getFlowState, isFirebaseAvailable } from "../auth.js";
import { getReadingTier, pickTier, glossDensity, scaffoldsEnabled, tierLabel } from "../adaptive.js";
import { awardKeystone } from "../keystones.js";
import { escapeHtml } from "../mission-engine.js";

const SCENARIO_PHASES = ["briefing", "dossier", "stakeholders", "quiz", "complete"];
const MISSION_ID = "sdg13-chiangmai"; // must match keystones.js JOURNEY_MISSIONS id

/* Resolved once at mission start so every phase renders at the same tier. */
let READING_TIER = 2;

export function installChiangMaiMission(engine) {
  engine.config = { ...engine.config, phases: SCENARIO_PHASES };
  try {
    const profile = (getFlowState() && getFlowState().learnerProfile) || null;
    READING_TIER = getReadingTier(profile);
  } catch (_) { READING_TIER = 2; }
  engine.registerPhaseHandler("briefing",     briefStage);
  engine.registerPhaseHandler("dossier",      probeDossier);
  engine.registerPhaseHandler("stakeholders", probeStakeholders);
  engine.registerPhaseHandler("quiz",         decideActQuiz);
  engine.registerPhaseHandler("complete",     debriefComplete);
}
// Back-compat alias (engine may call either name)
export const installChiangMaiMission1 = installChiangMaiMission;

/* Single audited HTML sink. Every ${} interpolation in the templates
 * below is either an authored constant from our own scenario modules
 * (trusted) or a learner value already passed through escapeHtml(). */
function paint(node, html) { node.innerHTML = html; }

/* ──────────────────────────────────────────────────────────────────
 * BRIEF — setting, tension, ethical axes, disclaimer gate
 * ──────────────────────────────────────────────────────────────── */

async function briefStage(container, state, engine) {
  paint(container, `
    <section class="scenario-briefing">
      <div class="briefing-banner">
        <div class="console-label-gold">STAGE 01 // BRIEF · BLOOM: REMEMBER</div>
        <div class="scenario-chip">
          <span class="material-symbols-rounded size-20">cloud</span>
          <span>SDG 13 · Climate Action</span>
        </div>
      </div>

      <h1 class="display-heading text-4xl mt-4 mb-2">${SCENARIO_META.title}</h1>
      <p class="title-m text-on-surface-variant mb-6" lang="th">${SCENARIO_META.titleTh}</p>

      <div class="briefing-meta">
        <span class="meta-pill"><span class="material-symbols-rounded size-20">location_on</span>${SCENARIO_META.region}</span>
        <span class="meta-pill"><span class="material-symbols-rounded size-20">translate</span>Reading tier ${READING_TIER} · ${tierLabel(READING_TIER)}</span>
        <span class="meta-pill"><span class="material-symbols-rounded size-20">schedule</span>~90 min</span>
      </div>

      <div class="briefing-card mt-6">
        <h2 class="title-l mb-2">Setting</h2>
        <p class="body-l text-on-surface/90">${SCENARIO_META.setting}</p>
      </div>

      <div class="briefing-card briefing-card-tension mt-4">
        <h2 class="title-l mb-2">The core tension</h2>
        <p class="body-l">${SCENARIO_META.coreTension}</p>
      </div>

      <div class="briefing-axes mt-6">
        <div class="console-label-gold mb-2">ETHICAL AXES IN TENSION</div>
        <div class="axes-row">
          ${SCENARIO_META.ethicalAxes.map((ax) => `<span class="axis-pill">${ax}</span>`).join('<span class="axis-vs">×</span>')}
        </div>
      </div>

      <div class="briefing-roles mt-6">
        <div class="console-label-gold mb-2">YOUR TEAM (per CLAUDE.md §6)</div>
        <ul class="role-grid">
          <li><span class="material-symbols-rounded size-20">science</span><strong>Research Analyst</strong> · academic register, data sources</li>
          <li><span class="material-symbols-rounded size-20">campaign</span><strong>Communications Director</strong> · audience adaptation</li>
          <li><span class="material-symbols-rounded size-20">balance</span><strong>Ethics &amp; Policy Officer</strong> · argumentation, evaluation</li>
        </ul>
      </div>

      <div class="briefing-actions mt-8">
        <button id="begin-briefing" type="button" class="btn-primary btn-lg">
          <span>Begin Mission</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
        <button id="view-disclaimer" type="button" class="btn-text">
          <span class="material-symbols-rounded size-20">info</span>
          <span>Re-read scenario notice</span>
        </button>
      </div>
    </section>
  `);

  container.querySelector("#view-disclaimer").addEventListener("click", async () => {
    await showDisclaimer({ readOnly: true });
  });
  container.querySelector("#begin-briefing").addEventListener("click", async () => {
    const ok = await ensureDisclaimerAcknowledged();
    if (ok) engine.advance();
  });
  toggleEngineControls(false);
}

/* ──────────────────────────────────────────────────────────────────
 * PROBE (1/2) — Adaptive dossier (tiered text, tier-scaled glosses)
 * ──────────────────────────────────────────────────────────────── */

async function probeDossier(container, state, engine) {
  state.decisions.dossierProgress = state.decisions.dossierProgress || { read: new Set() };
  const readSet = ensureReadSet(state.decisions.dossierProgress);
  const density = glossDensity(READING_TIER); // 'high' | 'standard' | 'low'

  paint(container, `
    <section class="scenario-dossier">
      <header class="dossier-header">
        <div class="console-label-gold">STAGE 02 // PROBE · DOSSIER</div>
        <h2 class="display-heading text-2xl mt-2">${SCENARIO_META.title}</h2>
        <div class="tier-inline-chip" title="Set once from your diagnostic. Same facts at every tier — only the wording changes. Audio stays authentic.">
          <span class="material-symbols-rounded size-20">tune</span>
          <span>Served at reading tier ${READING_TIER} · ${tierLabel(READING_TIER)}</span>
        </div>
        <p class="body-m text-on-surface-variant mt-2">
          Four short sections. ${density === "low"
            ? "Technical terms are listed below for reference."
            : "Hover any <strong>highlighted term</strong> for its meaning."}
          Mark each section read when you've finished it.
        </p>
      </header>

      <div class="dossier-parts" id="dossier-parts">
        ${DOSSIER.map((part) => renderDossierPart(part, readSet.has(part.id), density)).join("")}
      </div>

      <footer class="dossier-footer mt-6">
        <div class="vocab-legend">
          <div class="console-label-gold mb-2">VOCABULARY IN THIS DOSSIER</div>
          <div class="vocab-chip-row">
            ${VOCABULARY.map((v) => `
              <span class="vocab-chip" tabindex="0" data-term="${v.term}">
                <strong>${v.term}</strong>
                <span class="vocab-tip"><em>${v.gloss}</em><span class="vocab-th" lang="th">${v.th}</span></span>
              </span>`).join("")}
          </div>
        </div>

        <div class="institutions-cited mt-6">
          <div class="console-label-gold mb-2">INSTITUTIONS REFERENCED</div>
          <ul class="cited-list">
            ${INSTITUTIONS_CITED.map((i) => `<li><strong>${i.name}</strong> — <span class="text-on-surface/80">${i.role}</span></li>`).join("")}
          </ul>
          <p class="body-s text-on-surface-variant mt-3">
            Real institutions named for context only. See the scenario notice for citation discipline.
          </p>
        </div>
      </footer>

      <div class="dossier-controls mt-6">
        <p id="dossier-progress" class="body-s text-on-surface-variant"></p>
        <button id="dossier-continue" type="button" class="btn-primary" disabled>
          <span>I have read the dossier</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `);

  container.querySelectorAll(".dossier-part").forEach((partEl) => {
    const id = partEl.dataset.partId;
    const btn = partEl.querySelector(".part-mark-read");
    btn.addEventListener("click", () => {
      if (readSet.has(id)) {
        readSet.delete(id);
        partEl.classList.remove("is-read");
        btn.innerHTML = `<span class="material-symbols-rounded size-20">check_circle</span><span>Mark read</span>`;
      } else {
        readSet.add(id);
        partEl.classList.add("is-read");
        btn.innerHTML = `<span class="material-symbols-rounded size-20">check_circle</span><span>Read ✓</span>`;
      }
      refreshDossierProgress(container, readSet);
    });
  });

  refreshDossierProgress(container, readSet);

  container.querySelector("#dossier-continue").addEventListener("click", () => {
    state.decisions.dossierProgress.read = Array.from(readSet);
    state.decisions.readingTier = READING_TIER; // recorded for the teacher dashboard
    engine.advance();
  });

  toggleEngineControls(false);
}

function renderDossierPart(part, isRead, density) {
  const body = pickTier(part.body, READING_TIER); // tiered → string
  return `
    <article class="dossier-part ${isRead ? "is-read" : ""}" data-part-id="${part.id}">
      <header class="dossier-part-header">
        <h3 class="title-l">${part.heading}</h3>
        <button class="part-mark-read btn-secondary btn-sm" type="button">
          <span class="material-symbols-rounded size-20">check_circle</span>
          <span>${isRead ? "Read ✓" : "Mark read"}</span>
        </button>
      </header>
      <div class="dossier-part-body">
        ${renderBodyWithVocab(body, density)}
      </div>
    </article>
  `;
}

/**
 * Tier-scaled gloss density:
 *   high      (tier 1) — every term gets an inline tooltip
 *   standard  (tier 2) — every term gets an inline tooltip (baseline)
 *   low       (tier 3) — inline terms render as plain text; the footer
 *                        legend remains as a reference (not a crutch)
 * Same facts either way — only the support density changes. The body
 * is an authored constant from our own content module (trusted).
 */
function renderBodyWithVocab(body, density) {
  const stripOnly = density === "low";
  return String(body)
    .split("\n\n")
    .map((para) => `<p>${para.replace(/<vocab>([^<]+)<\/vocab>/g, (_, term) => {
      const v = VOCABULARY.find((x) => x.term === term);
      if (!v || stripOnly) return term;
      return `<span class="vocab-inline" tabindex="0">${term}<span class="vocab-tip"><em>${v.gloss}</em><span class="vocab-th" lang="th">${v.th}</span></span></span>`;
    })}</p>`)
    .join("");
}

function ensureReadSet(progressObj) {
  if (Array.isArray(progressObj.read)) progressObj.read = new Set(progressObj.read);
  if (!(progressObj.read instanceof Set)) progressObj.read = new Set();
  return progressObj.read;
}

function refreshDossierProgress(container, readSet) {
  const total = DOSSIER.length;
  const done = readSet.size;
  container.querySelector("#dossier-progress").textContent = `${done} of ${total} sections marked read.`;
  const btn = container.querySelector("#dossier-continue");
  btn.disabled = done < total;
  btn.classList.toggle("is-disabled", done < total);
}

/* ──────────────────────────────────────────────────────────────────
 * PROBE (2/2) — Stakeholder dispatches (authentic audio, NOT tiered)
 * ──────────────────────────────────────────────────────────────── */

async function probeStakeholders(container, state, engine) {
  state.decisions.stakeholderViews = state.decisions.stakeholderViews || {};
  const viewed = state.decisions.stakeholderViews;

  paint(container, `
    <section class="scenario-stakeholders">
      <header class="stake-header">
        <div class="console-label-gold">STAGE 02 // PROBE · FOUR VOICES</div>
        <h2 class="display-heading text-2xl mt-2">Four voices</h2>
        <p class="body-m text-on-surface-variant mt-1">
          Each stakeholder gives a 30–35 second dispatch. The audio is authentic — it is
          <strong>not</strong> simplified by tier; captions scaffold access instead.
          Tap any card to expand the transcript and play. Hear all four before you move on.
        </p>
      </header>

      <div class="stake-grid">
        ${STAKEHOLDERS.map((s) => renderStakeholderCard(s, viewed[s.id])).join("")}
      </div>

      <div class="stake-controls mt-6">
        <p id="stake-progress" class="body-s text-on-surface-variant"></p>
        <button id="stake-continue" type="button" class="btn-primary" disabled>
          <span>I have heard all four voices</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `);

  STAKEHOLDERS.forEach((s) => {
    const card = container.querySelector(`[data-stakeholder-id="${s.id}"]`);
    const toggleBtn = card.querySelector(".stake-toggle");
    const audio = card.querySelector("audio");
    const playBtn = card.querySelector(".stake-play");
    const fallback = card.querySelector(".stake-audio-fallback");

    toggleBtn.addEventListener("click", () => {
      card.classList.toggle("is-open");
      viewed[s.id] = true;
      refreshStakeProgress(container, viewed);
    });

    if (audio && playBtn) {
      audio.addEventListener("canplay", () => {
        if (fallback) fallback.hidden = true;
        playBtn.disabled = false;
      });
      audio.addEventListener("error", () => {
        if (fallback) fallback.hidden = false;
        playBtn.disabled = true;
        playBtn.classList.add("is-disabled");
      });
      playBtn.addEventListener("click", () => {
        if (audio.paused) {
          audio.play().catch(() => {});
          playBtn.classList.add("is-playing");
          playBtn.querySelector(".play-label").textContent = "Pause";
        } else {
          audio.pause();
          playBtn.classList.remove("is-playing");
          playBtn.querySelector(".play-label").textContent = "Play";
        }
      });
      audio.addEventListener("ended", () => {
        playBtn.classList.remove("is-playing");
        playBtn.querySelector(".play-label").textContent = "Replay";
      });
    }
  });

  refreshStakeProgress(container, viewed);
  container.querySelector("#stake-continue").addEventListener("click", () => engine.advance());
  toggleEngineControls(false);
}

function renderStakeholderCard(s, isViewed) {
  return `
    <article class="stake-card stake-accent-${s.accent} ${isViewed ? "was-viewed" : ""}" data-stakeholder-id="${s.id}">
      <button class="stake-toggle" type="button" aria-expanded="${isViewed ? "true" : "false"}">
        <div class="stake-card-head">
          <div class="stake-portrait" aria-hidden="true">
            <div class="stake-portrait-placeholder">
              <span class="material-symbols-rounded">${stakeholderIcon(s)}</span>
            </div>
          </div>
          <div class="stake-meta">
            <div class="stake-role">${s.role}</div>
            <div class="stake-role-th" lang="th">${s.roleTh}</div>
            <div class="stake-location">${s.location}</div>
          </div>
          <span class="stake-chev material-symbols-rounded size-20">expand_more</span>
        </div>
        <div class="stake-tags">
          ${(s.flags || []).map((f) => `<span class="stake-tag stake-tag-${f}">${f.replace(/-/g, " ")}</span>`).join("")}
        </div>
      </button>

      <div class="stake-body">
        <div class="stake-audio-row">
          <button class="stake-play" type="button" disabled>
            <span class="material-symbols-rounded">play_arrow</span>
            <span class="play-label">Play</span>
            <span class="play-duration">${formatDuration(s.duration)}</span>
          </button>
          <audio preload="metadata" src="${s.audio}">
            ${s.caption ? `<track kind="captions" srclang="en" src="${s.caption}" default>` : ""}
          </audio>
          <div class="stake-audio-fallback" hidden>
            <span class="badge-pill">
              <span class="material-symbols-rounded size-20">construction</span>
              <span>Placeholder asset — production pending</span>
            </span>
          </div>
        </div>

        <div class="stake-transcript">
          <div class="console-label-gold mb-2">DISPATCH</div>
          <p class="body-m">${s.transcript}</p>
        </div>

        <details class="stake-position-full">
          <summary>Read the full position statement</summary>
          <p class="body-m mt-2">${s.position}</p>
        </details>
      </div>
    </article>
  `;
}

function stakeholderIcon(s) {
  if (s.flags.includes("vulnerable")) return "agriculture";
  if (s.flags.includes("institutional")) return "account_balance";
  if (s.flags.includes("private")) return "factory";
  return "favorite";
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const r = sec % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function refreshStakeProgress(container, viewed) {
  const total = STAKEHOLDERS.length;
  const done = Object.values(viewed).filter(Boolean).length;
  container.querySelector("#stake-progress").textContent = `${done} of ${total} voices heard.`;
  const btn = container.querySelector("#stake-continue");
  btn.disabled = done < total;
  btn.classList.toggle("is-disabled", done < total);
}

/* ──────────────────────────────────────────────────────────────────
 * DECIDE + ACT — adaptive quiz (confidence-rated, scaffolded)
 * ──────────────────────────────────────────────────────────────── */

async function decideActQuiz(container, state, engine) {
  state.decisions.quizAnswers = state.decisions.quizAnswers || {};
  state.decisions.quizTokens = state.decisions.quizTokens || 0;
  state.decisions.quizIndex = state.decisions.quizIndex || 0;
  renderCurrentQuizItem(container, state, engine);
}

function renderCurrentQuizItem(container, state, engine) {
  const idx = state.decisions.quizIndex;
  if (idx >= QUIZ_ITEMS.length) return renderQuizSummary(container, state, engine);
  const item = QUIZ_ITEMS[idx];

  paint(container, `
    <section class="quiz-screen">
      <header class="quiz-progress-bar">
        <span class="console-label-gold">STAGE 03 // DECIDE · ITEM ${idx + 1} OF ${QUIZ_ITEMS.length}</span>
        <div class="quiz-progress-pips">
          ${QUIZ_ITEMS.map((_, i) => `<span class="pip ${i < idx ? "is-done" : ""} ${i === idx ? "is-current" : ""}"></span>`).join("")}
        </div>
        <span class="badge-pill"><span class="material-symbols-rounded size-20">savings</span><span>${state.decisions.quizTokens >= 0 ? "+" : ""}${state.decisions.quizTokens} ◆ this mission</span></span>
      </header>

      <div class="mentor-frame">
        <div class="mentor-frame-avatar"><span class="material-symbols-rounded">support_agent</span></div>
        <div class="mentor-frame-bubble">
          <div class="mentor-frame-name">FIELD MENTOR</div>
          <p class="body-m mt-1">${item.diegeticFrame}</p>
        </div>
      </div>

      <div class="quiz-stem"><h3 class="title-l">${item.stem}</h3></div>
      <div class="quiz-options" id="quiz-options">${renderQuizOptions(item)}</div>
      ${item.type === "open" ? "" : renderConfidenceBlock()}
      <div id="quiz-feedback" class="quiz-feedback" hidden></div>
      <div class="quiz-controls">
        <button id="quiz-submit" type="button" class="btn-primary" disabled>
          <span>Submit answer</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `);

  wireQuizItem(container, item, state, engine);
  toggleEngineControls(false);
}

function renderConfidenceBlock() {
  return `
    <div class="quiz-confidence">
      <div class="console-label-gold mb-2">HOW SURE ARE YOU?</div>
      <div class="confidence-pills" role="radiogroup" aria-label="Confidence">
        ${CONFIDENCE_LEVELS.map((c) => `
          <button class="confidence-pill" data-conf="${c.id}" role="radio" aria-checked="false" type="button">
            <strong>${c.label}</strong>
            <span class="body-s text-on-surface-variant">${c.description}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderQuizOptions(item) {
  if (item.type === "mcq") {
    return `
      <div class="mcq-options" role="radiogroup">
        ${item.options.map((opt) => `
          <button type="button" class="mcq-option" data-option-id="${opt.id}" role="radio" aria-checked="false">
            <span class="mcq-marker">${opt.id.toUpperCase()}</span>
            <span class="mcq-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>
    `;
  }
  if (item.type === "rank") {
    return `
      <div class="rank-block">
        <p class="body-s text-on-surface-variant mb-3">Click items in the order you want them ranked: first click = #1 most authoritative. Click again to reset.</p>
        <div class="rank-options" id="rank-options">
          ${item.items.map((it) => `
            <button type="button" class="rank-option" data-rank-id="${it.id}">
              <span class="rank-position"></span>
              <span class="rank-text">${it.text}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }
  if (item.type === "match") {
    return `
      <div class="match-block">
        <p class="body-s text-on-surface-variant mb-3">Click a stakeholder on the left, then click their concern on the right. Click a pair again to unset.</p>
        <div class="match-grid">
          <div class="match-col">
            ${item.leftItems.map((l) => `<button type="button" class="match-item match-left" data-match-left="${l.id}">${l.text}</button>`).join("")}
          </div>
          <div class="match-lines" aria-hidden="true"></div>
          <div class="match-col">
            ${item.rightItems.map((r) => `<button type="button" class="match-item match-right" data-match-right="${r.id}">${r.text}</button>`).join("")}
          </div>
        </div>
      </div>
    `;
  }
  if (item.type === "open") {
    return `
      <div class="m3-textfield">
        <textarea id="open-input" rows="5" placeholder=" " minlength="40"></textarea>
        <label for="open-input">${item.placeholder || "Your answer"}</label>
      </div>
      <p class="body-s text-on-surface-variant mt-2"><span id="open-words">0</span> words · target ${item.minWords}–${item.maxWords}</p>
    `;
  }
  return "";
}

function wireQuizItem(container, item, state, engine) {
  const submitBtn = container.querySelector("#quiz-submit");
  let selectedAnswer = null;
  let selectedConfidence = null;

  const pills = container.querySelectorAll(".confidence-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => { p.classList.remove("is-selected"); p.setAttribute("aria-checked", "false"); });
      pill.classList.add("is-selected");
      pill.setAttribute("aria-checked", "true");
      selectedConfidence = pill.dataset.conf;
      refreshSubmit();
    });
  });

  if (item.type === "mcq") {
    const opts = container.querySelectorAll(".mcq-option");
    opts.forEach((o) => {
      o.addEventListener("click", () => {
        opts.forEach((x) => { x.classList.remove("is-selected"); x.setAttribute("aria-checked", "false"); });
        o.classList.add("is-selected");
        o.setAttribute("aria-checked", "true");
        selectedAnswer = o.dataset.optionId;
        refreshSubmit();
      });
    });
  }

  if (item.type === "rank") {
    const rankOrder = [];
    const optBtns = container.querySelectorAll(".rank-option");
    optBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.rankId;
        const existing = rankOrder.indexOf(id);
        if (existing >= 0) rankOrder.splice(existing, 1);
        else if (rankOrder.length < item.items.length) rankOrder.push(id);
        optBtns.forEach((b) => {
          const pos = rankOrder.indexOf(b.dataset.rankId);
          const posEl = b.querySelector(".rank-position");
          if (pos >= 0) { posEl.textContent = String(pos + 1); b.classList.add("is-ranked"); }
          else { posEl.textContent = ""; b.classList.remove("is-ranked"); }
        });
        selectedAnswer = rankOrder.length === item.items.length ? [...rankOrder] : null;
        refreshSubmit();
      });
    });
  }

  if (item.type === "match") {
    const pairs = {};
    let pickedLeft = null;
    container.querySelectorAll(".match-left").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".match-left").forEach((b) => b.classList.remove("is-picked"));
        pickedLeft = btn.dataset.matchLeft;
        btn.classList.add("is-picked");
      });
    });
    container.querySelectorAll(".match-right").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!pickedLeft) return;
        const wasAssignedTo = Object.keys(pairs).find((l) => pairs[l] === btn.dataset.matchRight);
        if (wasAssignedTo) delete pairs[wasAssignedTo];
        pairs[pickedLeft] = btn.dataset.matchRight;
        container.querySelectorAll(".match-left").forEach((l) => {
          l.classList.toggle("is-paired", !!pairs[l.dataset.matchLeft]);
          l.classList.remove("is-picked");
        });
        container.querySelectorAll(".match-right").forEach((r) => {
          r.classList.toggle("is-paired", Object.values(pairs).includes(r.dataset.matchRight));
        });
        pickedLeft = null;
        selectedAnswer = Object.keys(pairs).length === item.leftItems.length ? { ...pairs } : null;
        refreshSubmit();
      });
    });
  }

  if (item.type === "open") {
    const ta = container.querySelector("#open-input");
    const wc = container.querySelector("#open-words");
    ta.addEventListener("input", () => {
      const words = ta.value.trim().split(/\s+/).filter(Boolean);
      wc.textContent = String(words.length);
      selectedAnswer = ta.value;
      const ok = words.length >= (item.minWords || 8) && words.length <= (item.maxWords || 50);
      submitBtn.disabled = !ok;
      submitBtn.classList.toggle("is-disabled", !ok);
    });
  }

  function refreshSubmit() {
    if (item.type === "open") return;
    const ready = selectedAnswer !== null && selectedConfidence !== null;
    submitBtn.disabled = !ready;
    submitBtn.classList.toggle("is-disabled", !ready);
  }

  submitBtn.addEventListener("click", async () => {
    submitBtn.disabled = true;
    submitBtn.classList.add("is-disabled");
    await handleQuizSubmit(container, item, selectedAnswer, selectedConfidence, state, engine);
  });
}

async function handleQuizSubmit(container, item, answer, confidence, state, engine) {
  const conf = confidence || "medium";
  const award = computeTokenAward(item, answer, conf);
  const before = state.decisions.quizTokens || 0;
  const capped = Math.min(QUIZ_TOKEN_CAP - before, Math.max(award, -10));
  const finalAward = award < 0 ? award : Math.max(0, capped);

  state.decisions.quizAnswers[item.id] = { answer, confidence: conf, award: finalAward };
  state.decisions.quizTokens = (state.decisions.quizTokens || 0) + finalAward;

  try {
    const flow = getFlowState();
    if (flow?.uid && isFirebaseAvailable() && finalAward !== 0) {
      await awardTokens({
        tid: flow.uid,
        delta: finalAward,
        reason: `chiangmai_quiz_${item.id}`,
        missionId: `${flow.uid}_${MISSION_ID}_${item.id}`,
      });
    }
  } catch (_) { /* graceful */ }

  renderQuizFeedback(container, item, answer, conf, finalAward, state, engine);
}

function renderQuizFeedback(container, item, answer, confidence, award, state, engine) {
  const feedbackEl = container.querySelector("#quiz-feedback");
  const isCorrect = isAnswerCorrect(item, answer);
  const scaffold = shouldShowScaffold(item, answer, confidence, award) ? item.scaffold : null;

  paint(feedbackEl, `
    <div class="feedback-token-row ${award >= 0 ? "is-positive" : "is-negative"}">
      <span class="feedback-token-amount">${award >= 0 ? "+" : ""}${award} ◆</span>
      <span class="feedback-verdict">
        ${item.type === "open" ? "Logged for your Voice for Change." :
          isCorrect ? "Correct." :
          award === 0 ? "Honest uncertainty — fair." :
          "Take a closer look."}
      </span>
    </div>

    ${renderPerOptionFeedback(item, answer)}

    ${item.afterCorrect && isCorrect ? `
      <div class="feedback-callout">
        <span class="material-symbols-rounded size-20">stars</span>
        <span>${item.afterCorrect}</span>
      </div>
    ` : ""}

    ${scaffold ? `
      <div class="feedback-scaffold">
        <div class="console-label-gold mb-2">SCAFFOLD</div>
        <p class="body-m">${scaffold.message}</p>
      </div>
    ` : ""}

    <div class="quiz-controls">
      <button id="quiz-next" type="button" class="btn-primary">
        <span>${state.decisions.quizIndex + 1 < QUIZ_ITEMS.length ? "Next item" : "Finish — go to debrief"}</span>
        <span class="material-symbols-rounded size-20">arrow_forward</span>
      </button>
    </div>
  `);
  feedbackEl.hidden = false;
  feedbackEl.scrollIntoView({ behavior: "smooth", block: "center" });

  feedbackEl.querySelector("#quiz-next").addEventListener("click", () => {
    state.decisions.quizIndex += 1;
    renderCurrentQuizItem(container, state, engine);
  });
}

function isAnswerCorrect(item, answer) {
  if (item.type === "open") return null;
  if (item.type === "mcq") return (item.correct || []).includes(answer);
  if (item.type === "rank") return Array.isArray(answer) && item.correctOrder.every((id, i) => answer[i] === id);
  if (item.type === "match") {
    if (!answer) return false;
    return Object.keys(item.correctPairs).every((k) => answer[k] === item.correctPairs[k]);
  }
  return false;
}

function renderPerOptionFeedback(item, answer) {
  if (item.type === "mcq") {
    return `
      <div class="feedback-options">
        ${item.options.map((opt) => {
          const isPicked = opt.id === answer;
          const isCorrect = (item.correct || []).includes(opt.id);
          let className = "feedback-option";
          if (isPicked && isCorrect) className += " is-correct";
          else if (isPicked && !isCorrect) className += " is-wrong";
          else if (isCorrect) className += " is-truth";
          return `
            <div class="${className}">
              <span class="mcq-marker">${opt.id.toUpperCase()}</span>
              <div>
                <div class="title-s">${opt.text}</div>
                <p class="body-s text-on-surface-variant">${opt.feedback}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
  if (item.type === "rank") {
    const given = answer || [];
    return `
      <div class="feedback-rank">
        <h4 class="title-s mb-2">The reasoning</h4>
        <p class="body-m">${item.diagnostic.summary}</p>
        <p class="body-m mt-2 text-on-surface-variant">${item.diagnostic.trapNote}</p>
        <div class="rank-comparison mt-4">
          <div>
            <div class="console-label-gold mb-1">YOUR RANKING</div>
            <ol>${given.map((id) => `<li>${item.items.find((i) => i.id === id)?.text || escapeHtml(id)}</li>`).join("")}</ol>
          </div>
          <div>
            <div class="console-label-gold mb-1">REFERENCE RANKING</div>
            <ol>${item.correctOrder.map((id) => `<li>${item.items.find((i) => i.id === id)?.text || id}</li>`).join("")}</ol>
          </div>
        </div>
      </div>
    `;
  }
  if (item.type === "match") {
    const given = answer || {};
    return `
      <div class="feedback-match">
        ${item.leftItems.map((l) => {
          const userPick = given[l.id];
          const correct = item.correctPairs[l.id];
          const isRight = userPick === correct;
          const userText = item.rightItems.find((r) => r.id === userPick)?.text || "(unmatched)";
          const correctText = item.rightItems.find((r) => r.id === correct)?.text || "";
          return `
            <div class="feedback-match-row ${isRight ? "is-correct" : "is-wrong"}">
              <strong>${l.text}</strong>
              <span class="match-arrow">→</span>
              <span class="match-given">${userText}</span>
              ${!isRight ? `<span class="match-truth">(should be: ${correctText})</span>` : ""}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
  if (item.type === "open") {
    // answer is LEARNER-TYPED → escape before echo (stored-XSS guard)
    return `
      <div class="feedback-open">
        <div class="console-label-gold mb-2">YOUR EVIDENCE COMMITMENT</div>
        <p class="body-m" style="font-style: italic;">"${escapeHtml((answer || "").trim())}"</p>
        <p class="body-s text-on-surface-variant mt-3">
          This is logged and will be surfaced in your Voice for Change. If your final
          proposal does not reference this evidence, you'll be asked why.
        </p>
      </div>
    `;
  }
  return "";
}

function renderQuizSummary(container, state, engine) {
  const totalTokens = state.decisions.quizTokens || 0;
  const items = QUIZ_ITEMS.map((item) => ({ item, a: state.decisions.quizAnswers[item.id] }));

  paint(container, `
    <section class="quiz-summary">
      <header>
        <div class="console-label-gold">STAGE 04 // ACT · TALLY</div>
        <h2 class="display-heading text-3xl mt-2">${totalTokens >= 0 ? "+" : ""}${totalTokens} ◆ earned</h2>
        <p class="body-l text-on-surface-variant mt-2">
          You've worked the dossier and the four voices into a position. Here's how each item scored.
        </p>
      </header>

      <div class="quiz-summary-grid">
        ${items.map(({ item, a }) => `
          <div class="summary-card ${a?.award >= 0 ? "is-positive" : "is-negative"}">
            <div class="summary-card-head">
              <span class="console-label-gold">Q${item.order}</span>
              <span class="summary-tokens">${a?.award >= 0 ? "+" : ""}${a?.award ?? 0} ◆</span>
            </div>
            <p class="body-s">${item.stem}</p>
            <p class="body-s text-on-surface-variant mt-1">Confidence: <strong>${a?.confidence || "—"}</strong></p>
          </div>
        `).join("")}
      </div>

      <div class="quiz-summary-controls mt-6">
        <button id="quiz-continue" type="button" class="btn-primary">
          <span>Continue to debrief</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `);

  container.querySelector("#quiz-continue").addEventListener("click", () => engine.advance());
}

/* ──────────────────────────────────────────────────────────────────
 * DEBRIEF — composite, pass check, Keystone award (idempotent)
 * ──────────────────────────────────────────────────────────────── */

const PASS_THRESHOLD_TOKENS = 8; // composite proxy: net quiz tokens ≥ 8 → pass

async function debriefComplete(container, state, engine) {
  const totalTokens = state.decisions.quizTokens || 0;
  const evidenceSafe = escapeHtml((state.decisions.quizAnswers?.q6?.answer || "").trim());
  const passed = totalTokens >= PASS_THRESHOLD_TOKENS;

  let keystoneMsg = "";
  if (passed) {
    try {
      const flow = getFlowState();
      const res = await awardKeystone(flow && flow.uid, MISSION_ID, {
        source: "mission",
        reason: `The Burning Season passed (net ${totalTokens} tokens >= ${PASS_THRESHOLD_TOKENS}).`,
      });
      keystoneMsg = res.alreadyHad
        ? "You already held this Keystone — no double-count."
        : (res.earned ? "SDG 13 Keystone earned and recorded."
                       : "Keystone will sync when you're back online (held locally).");
    } catch (_) {
      keystoneMsg = "Keystone will sync when you're back online.";
    }
  }

  paint(container, `
    <section class="mission-complete">
      <div class="complete-banner">
        <div class="console-label-gold">STAGE 05 // DEBRIEF · ${passed ? "KEYSTONE EARNED" : "NOT YET PASSED"}</div>
        <h2 class="display-heading text-3xl mt-2">${passed ? "The Burning Season — cleared." : "Close. One more pass."}</h2>
        <p class="body-l text-on-surface-variant mt-2">
          ${passed
            ? "You read the dossier at your tier, heard four voices, and built a defensible position under a real trade-off. That earns this region's Keystone."
            : `This mission needs a net ${PASS_THRESHOLD_TOKENS} ◆ across the diagnostic to pass. You finished on ${totalTokens} ◆. Replay the DECIDE stage — the dossier and voices are still open to re-read.`}
        </p>
      </div>

      <div class="complete-stats">
        <div class="complete-stat">
          <div class="console-label-gold">TOKENS THIS MISSION</div>
          <div class="stat-value">${totalTokens >= 0 ? "+" : ""}${totalTokens} ◆</div>
        </div>
        <div class="complete-stat">
          <div class="console-label-gold">READING TIER</div>
          <div class="stat-value">${READING_TIER} · ${tierLabel(READING_TIER)}</div>
        </div>
        <div class="complete-stat">
          <div class="console-label-gold">SDG 13 KEYSTONE</div>
          <div class="stat-value">${passed ? "◆ EARNED" : "— LOCKED"}</div>
        </div>
      </div>

      ${passed && keystoneMsg ? `
      <div class="feedback-callout mt-4">
        <span class="material-symbols-rounded size-20">key</span>
        <span>${keystoneMsg}</span>
      </div>` : ""}

      ${evidenceSafe ? `
      <div class="complete-callback">
        <div class="console-label-gold mb-2">YOUR EVIDENCE COMMITMENT</div>
        <p class="body-m" style="font-style: italic;">"${evidenceSafe}"</p>
        <p class="body-s text-on-surface-variant mt-2">
          This resurfaces in your Voice for Change. Make sure your final proposal cites it — or be ready to explain why not.
        </p>
      </div>` : ""}

      <div class="complete-vocab">
        <div class="console-label-gold mb-2">VOCABULARY ENCOUNTERED</div>
        <div class="vocab-chip-row">
          ${VOCABULARY.map((v) => `<span class="vocab-chip is-static"><strong>${v.term}</strong></span>`).join("")}
        </div>
      </div>

      <div class="complete-actions mt-8">
        <a href="../pages/mission-select.html" class="btn-primary">
          <span class="material-symbols-rounded size-20">map</span>
          <span>Back to the Thailand journey</span>
        </a>
        ${!passed ? `<button id="retry-decide" type="button" class="btn-secondary">
          <span class="material-symbols-rounded size-20">replay</span>
          <span>Replay the DECIDE stage</span>
        </button>` : ""}
        <a href="../pages/portfolio.html" class="btn-text">
          <span class="material-symbols-rounded size-20">school</span>
          <span>View your portfolio</span>
        </a>
      </div>
    </section>
  `);

  const retry = container.querySelector("#retry-decide");
  if (retry) {
    retry.addEventListener("click", () => {
      state.decisions.quizAnswers = {};
      state.decisions.quizTokens = 0;
      state.decisions.quizIndex = 0;
      const i = SCENARIO_PHASES.indexOf("quiz");
      if (typeof engine.goTo === "function") engine.goTo(i);
      else { engine.phaseIndex = i; engine.renderPhase ? engine.renderPhase() : engine.render(); }
    });
  }

  toggleEngineControls(false);
}

/* ──────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

function toggleEngineControls(show) {
  const controls = document.getElementById("phase-controls");
  if (controls) controls.style.display = show ? "" : "none";
}
