/**
 * FUTUREPROOF — SDG 6 Khon Kaen — Mission 1 RECON Phase Handlers
 *
 * Phases:
 *   1. briefing      — Mission intro + setting + tension + disclaimer gate
 *   2. dossier       — 4-part scrollable dossier with vocab glosses
 *   3. stakeholders  — 4 stakeholder cards with audio dispatches
 *   4. quiz          — 6-item adaptive quiz (confidence-rated, branching)
 *   5. complete      — Mission summary + transition CTA
 */

import { SCENARIO_META, DOSSIER, VOCABULARY, STAKEHOLDERS, INSTITUTIONS_CITED }
  from "./sdg06-khonkaen-content.js";
import { QUIZ_ITEMS, CONFIDENCE_LEVELS, computeTokenAward, shouldShowScaffold, QUIZ_TOKEN_CAP }
  from "./sdg06-khonkaen-quiz.js";
import { ensureDisclaimerAcknowledged, showDisclaimer } from "./scenario-disclaimer.js";
import { awardTokens } from "../tokens.js";
import { getFlowState, isFirebaseAvailable } from "../auth.js";
import { vocabSayButton, wireVocabAudio } from "../mission-engine.js";

const SCENARIO_PHASES_M1 = ["briefing", "dossier", "stakeholders", "quiz", "complete"];

/**
 * Install this scenario's M1 onto a MissionEngine instance.
 * Overrides the engine's phase list with scenario-specific phases
 * and registers handlers for each.
 */
export function installKhonKaenMission1(engine) {
  engine.config = { ...engine.config, phases: SCENARIO_PHASES_M1 };
  engine.registerPhaseHandler("briefing",     reconBriefing);
  engine.registerPhaseHandler("dossier",      reconDossier);
  engine.registerPhaseHandler("stakeholders", reconStakeholders);
  engine.registerPhaseHandler("quiz",         reconQuiz);
  engine.registerPhaseHandler("complete",     reconComplete);
}

/* ──────────────────────────────────────────────────────────────────
 * Phase 1 — Briefing
 * ──────────────────────────────────────────────────────────────── */

async function reconBriefing(container, state, engine) {
  container.innerHTML = `
    <section class="scenario-briefing">
      <div class="briefing-banner">
        <div class="console-label-gold">MISSION 01 // RECON · BLOOM: REMEMBER</div>
        <div class="scenario-chip">
          <span class="material-symbols-rounded size-20">water_drop</span>
          <span>SDG 6 · Clean Water &amp; Sanitation</span>
        </div>
      </div>

      <h1 class="display-heading text-4xl mt-4 mb-2">${SCENARIO_META.title}</h1>
      <p class="title-m text-on-surface-variant mb-6" lang="th">${SCENARIO_META.titleTh}</p>

      <div class="briefing-meta">
        <span class="meta-pill"><span class="material-symbols-rounded size-20">location_on</span>${SCENARIO_META.region}</span>
        <span class="meta-pill"><span class="material-symbols-rounded size-20">translate</span>CEFR ${SCENARIO_META.cefr}</span>
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
  `;

  container.querySelector("#view-disclaimer").addEventListener("click", async () => {
    await showDisclaimer({ readOnly: true });
  });

  container.querySelector("#begin-briefing").addEventListener("click", async () => {
    const ok = await ensureDisclaimerAcknowledged();
    if (ok) engine.advance();
  });

  // Hide engine's default Next button on this phase (we have our own CTA)
  toggleEngineControls(false);
}

/* ──────────────────────────────────────────────────────────────────
 * Phase 2 — Dossier (4-part scrollable, vocab glosses)
 * ──────────────────────────────────────────────────────────────── */

async function reconDossier(container, state, engine) {
  state.decisions.dossierProgress = state.decisions.dossierProgress || { read: new Set() };
  const readSet = ensureReadSet(state.decisions.dossierProgress);

  container.innerHTML = `
    <section class="scenario-dossier">
      <header class="dossier-header">
        <div class="console-label-gold">DOSSIER · BACKGROUND BRIEFING</div>
        <h2 class="display-heading text-2xl mt-2">${SCENARIO_META.title}</h2>
        <p class="body-m text-on-surface-variant mt-1">
          Four short sections. Hover any <strong>highlighted term</strong> for its meaning.
          Mark each section read when you've finished it.
        </p>
      </header>

      <div class="dossier-parts" id="dossier-parts">
        ${DOSSIER.map((part) => renderDossierPart(part, readSet.has(part.id))).join("")}
      </div>

      <footer class="dossier-footer mt-6">
        <div class="vocab-legend">
          <div class="console-label-gold mb-2">VOCABULARY GLOSSARY</div>
          <div class="vocab-table-wrap">
            <table class="vocab-table">
              <thead><tr>
                <th>Word</th><th>Part&nbsp;of&nbsp;speech</th><th>Meaning (English)</th>
                <th>Say</th><th lang="th">ความหมาย (ไทย)</th><th>Example — a different context</th>
              </tr></thead>
              <tbody>
                ${VOCABULARY.map((v) => `<tr>
                  <td class="vt-word"><strong>${v.term}</strong></td>
                  <td class="vt-pos">${v.pos || "—"}</td>
                  <td>${v.gloss}</td>
                  <td class="vt-say">${vocabSayButton(v.term)}</td>
                  <td class="vt-th" lang="th">${v.th}</td>
                  <td class="vt-ex">${v.ex || ""}</td>
                </tr>`).join("")}
              </tbody>
            </table>
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
  `;

  // Wire each part's "Mark read" toggle
  container.querySelectorAll(".dossier-part").forEach((partEl) => {
    const id = partEl.dataset.partId;
    const btn = partEl.querySelector(".part-mark-read");
    btn.addEventListener("click", () => {
      if (readSet.has(id)) {
        readSet.delete(id);
        partEl.classList.remove("is-read");
        btn.innerHTML = `<span class="material-symbols-rounded size-20">radio_button_unchecked</span><span>Click to mark as read</span>`;
      } else {
        readSet.add(id);
        partEl.classList.add("is-read");
        btn.innerHTML = `<span class="material-symbols-rounded size-20">task_alt</span><span>Read ✓</span>`;
      }
      refreshDossierProgress(container, readSet);
    });
  });

  refreshDossierProgress(container, readSet);
  wireVocabAudio(container); // #5 — tap a highlighted/legend word to hear it

  container.querySelector("#dossier-continue").addEventListener("click", () => {
    state.decisions.dossierProgress.read = Array.from(readSet);
    engine.advance();
  });

  toggleEngineControls(false);
}

function readingTime(txt) {
  const w = String(txt).replace(/<\/?vocab>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(w / 140)); // ~140 wpm, L2-calibrated
}

function renderDossierPart(part, isRead) {
  const mins = readingTime(part.body);
  return `
    <article class="dossier-part ${isRead ? "is-read" : ""}" data-part-id="${part.id}">
      <header class="dossier-part-header">
        <h3 class="title-l">${part.heading}</h3>
        <button class="part-mark-read btn-secondary btn-sm" type="button">
          <span class="material-symbols-rounded size-20">${isRead ? "task_alt" : "radio_button_unchecked"}</span>
          <span>${isRead ? "Read ✓" : "Click to mark as read"}</span>
        </button>
      </header>
      <div class="reading-time" title="Estimated at ~140 words/min">
        <span class="material-symbols-rounded size-20">schedule</span>
        <span>≈ ${mins} min read</span>
      </div>
      <div class="dossier-part-body">
        ${renderBodyWithVocab(part.body)}
      </div>
    </article>
  `;
}

function renderBodyWithVocab(body) {
  // Convert <vocab>term</vocab> to <span class="vocab-inline" data-term="term">term</span>
  const html = body
    .split("\n\n")
    .map((para) => `<p>${para.replace(/<vocab>([^<]+)<\/vocab>/g, (_, term) => {
      const v = VOCABULARY.find((x) => x.term === term);
      if (!v) return term;
      return `<span class="vocab-inline" tabindex="0">${term}<span class="vocab-tip"><em>${v.gloss}</em><span class="vocab-th" lang="th">${v.th}</span>${vocabSayButton(term)}</span></span>`;
    })}</p>`)
    .join("");
  return html;
}

function ensureReadSet(progressObj) {
  if (Array.isArray(progressObj.read)) {
    progressObj.read = new Set(progressObj.read);
  }
  if (!(progressObj.read instanceof Set)) {
    progressObj.read = new Set();
  }
  return progressObj.read;
}

function refreshDossierProgress(container, readSet) {
  const total = DOSSIER.length;
  const done = readSet.size;
  const txt = container.querySelector("#dossier-progress");
  const btn = container.querySelector("#dossier-continue");
  txt.textContent = `${done} of ${total} sections marked read.`;
  btn.disabled = done < total;
  btn.classList.toggle("is-disabled", done < total);
}

/* ──────────────────────────────────────────────────────────────────
 * Phase 3 — Stakeholders (4 audio dispatches)
 * ──────────────────────────────────────────────────────────────── */

async function reconStakeholders(container, state, engine) {
  state.decisions.stakeholderViews = state.decisions.stakeholderViews || {};
  const viewed = state.decisions.stakeholderViews;

  container.innerHTML = `
    <section class="scenario-stakeholders">
      <header class="stake-header">
        <div class="console-label-gold">STAKEHOLDER BRIEFING</div>
        <h2 class="display-heading text-2xl mt-2">Four voices</h2>
        <p class="body-m text-on-surface-variant mt-1">
          Each stakeholder gives a short video dispatch with English subtitles
          burned in. Open each card, watch the clip, and read the transcript
          before you move on.
        </p>
      </header>

      <div class="stake-grid">
        ${STAKEHOLDERS.map((s) => renderStakeholderCard(s, viewed[s.id])).join("")}
      </div>

      <div class="stake-controls mt-6">
        <p id="stake-progress" class="body-s text-on-surface-variant"></p>
        <button id="stake-continue" type="button" class="btn-primary" disabled>
          <span>I have watched all four dispatches</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `;

  STAKEHOLDERS.forEach((s) => {
    const card = container.querySelector(`[data-stakeholder-id="${s.id}"]`);
    const toggleBtn = card.querySelector(".stake-toggle");
    const video = card.querySelector("video");
    const fallback = card.querySelector(".stake-video-fallback");

    toggleBtn.addEventListener("click", () => {
      card.classList.toggle("is-open");
      viewed[s.id] = true;
      refreshStakeProgress(container, viewed);
    });

    if (video) {
      video.addEventListener("error", () => {
        if (fallback) fallback.hidden = false;
        video.style.display = "none";
      });
      video.addEventListener("play", () => {
        viewed[s.id] = true;
        refreshStakeProgress(container, viewed);
      });
    }
  });

  refreshStakeProgress(container, viewed);

  container.querySelector("#stake-continue").addEventListener("click", () => {
    engine.advance();
  });

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
        <div class="stake-video-row">
          <video class="stake-video" controls playsinline preload="metadata" src="${s.video}" aria-label="${s.role} — video dispatch with English subtitles">
            Your browser can't play this clip — the full transcript is below.
          </video>
          <div class="stake-video-meta">
            <span class="material-symbols-rounded size-20">subtitles</span>
            <span>${formatDuration(s.duration)} · English subtitles burned in · authentic input — not tiered</span>
          </div>
          <div class="stake-video-fallback" hidden>
            <span class="badge-pill">
              <span class="material-symbols-rounded size-20">construction</span>
              <span>Video dispatch — production pending. The full transcript is below.</span>
            </span>
          </div>
        </div>

        <details class="stake-position-full" open>
          <summary>Full statement &amp; transcript</summary>
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
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function refreshStakeProgress(container, viewed) {
  const total = STAKEHOLDERS.length;
  const done = Object.values(viewed).filter(Boolean).length;
  const txt = container.querySelector("#stake-progress");
  const btn = container.querySelector("#stake-continue");
  txt.textContent = `${done} of ${total} dispatches watched.`;
  btn.disabled = done < total;
  btn.classList.toggle("is-disabled", done < total);
}

/* ──────────────────────────────────────────────────────────────────
 * Phase 4 — Adaptive Quiz
 * ──────────────────────────────────────────────────────────────── */

async function reconQuiz(container, state, engine) {
  state.decisions.quizAnswers = state.decisions.quizAnswers || {};
  state.decisions.quizTokens = state.decisions.quizTokens || 0;
  state.decisions.quizIndex = state.decisions.quizIndex || 0;

  renderCurrentQuizItem(container, state, engine);
}

function renderCurrentQuizItem(container, state, engine) {
  const idx = state.decisions.quizIndex;
  if (idx >= QUIZ_ITEMS.length) {
    return renderQuizSummary(container, state, engine);
  }
  const item = QUIZ_ITEMS[idx];

  container.innerHTML = `
    <section class="quiz-screen">
      <header class="quiz-progress-bar">
        <span class="console-label-gold">FIELD MENTOR · ITEM ${idx + 1} OF ${QUIZ_ITEMS.length}</span>
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

      <div class="quiz-stem">
        <h3 class="title-l">${item.stem}</h3>
      </div>

      <div class="quiz-options" id="quiz-options">
        ${renderQuizOptions(item)}
      </div>

      ${item.type === "open" ? "" : renderConfidenceBlock()}

      <div id="quiz-feedback" class="quiz-feedback" hidden></div>

      <div class="quiz-controls">
        <button id="quiz-submit" type="button" class="btn-primary" disabled>
          <span>Submit answer</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `;

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
        <p class="body-s text-on-surface-variant mb-3">Click items in the order you want them ranked: first click = #1 most authoritative, second click = #2, and so on. Click again to reset.</p>
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
        <p class="body-s text-on-surface-variant mb-3">Click a stakeholder on the left, then click their concern on the right. Click selected pairs again to unset.</p>
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

  // Confidence pills
  const pills = container.querySelectorAll(".confidence-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => {
        p.classList.remove("is-selected");
        p.setAttribute("aria-checked", "false");
      });
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
        if (existing >= 0) {
          rankOrder.splice(existing, 1);
        } else if (rankOrder.length < item.items.length) {
          rankOrder.push(id);
        }
        // Update visuals
        optBtns.forEach((b) => {
          const pos = rankOrder.indexOf(b.dataset.rankId);
          const posEl = b.querySelector(".rank-position");
          if (pos >= 0) {
            posEl.textContent = String(pos + 1);
            b.classList.add("is-ranked");
          } else {
            posEl.textContent = "";
            b.classList.remove("is-ranked");
          }
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
        // If this right is already paired, unpair it
        const wasAssignedTo = Object.keys(pairs).find((l) => pairs[l] === btn.dataset.matchRight);
        if (wasAssignedTo) delete pairs[wasAssignedTo];
        pairs[pickedLeft] = btn.dataset.matchRight;
        // Visual updates
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
    if (item.type === "open") return; // handled inline
    const needConfidence = item.type !== "open";
    const ready = selectedAnswer !== null && (!needConfidence || selectedConfidence !== null);
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
  // Token cap
  const before = state.decisions.quizTokens || 0;
  const capped = Math.min(QUIZ_TOKEN_CAP - before, Math.max(award, -10));
  const finalAward = award < 0 ? award : Math.max(0, capped);

  state.decisions.quizAnswers[item.id] = { answer, confidence: conf, award: finalAward };
  state.decisions.quizTokens = (state.decisions.quizTokens || 0) + finalAward;

  // Best-effort token write
  try {
    const flow = getFlowState();
    if (flow?.uid && isFirebaseAvailable() && finalAward !== 0) {
      await awardTokens({
        tid: flow.uid,
        delta: finalAward,
        reason: `m1_quiz_${item.id}`,
        missionId: `${flow.uid}_mission01_${item.id}`,
      });
    }
  } catch (_) {/* graceful */}

  renderQuizFeedback(container, item, answer, conf, finalAward, state, engine);
}

function renderQuizFeedback(container, item, answer, confidence, award, state, engine) {
  const feedbackEl = container.querySelector("#quiz-feedback");
  const isCorrect = isAnswerCorrect(item, answer);
  const scaffold = shouldShowScaffold(item, answer, confidence, award) ? item.scaffold : null;

  feedbackEl.innerHTML = `
    <div class="feedback-token-row ${award >= 0 ? "is-positive" : "is-negative"}">
      <span class="feedback-token-amount">${award >= 0 ? "+" : ""}${award} ◆</span>
      <span class="feedback-verdict">
        ${item.type === "open" ? "Logged for Mission 5 callback." :
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
        <span>${state.decisions.quizIndex + 1 < QUIZ_ITEMS.length ? "Next item" : "Finish quiz"}</span>
        <span class="material-symbols-rounded size-20">arrow_forward</span>
      </button>
    </div>
  `;
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
            <ol>${given.map((id) => `<li>${item.items.find((i) => i.id === id)?.text || id}</li>`).join("")}</ol>
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
    return `
      <div class="feedback-open">
        <div class="console-label-gold mb-2">YOUR EVIDENCE COMMITMENT</div>
        <p class="body-m" style="font-style: italic;">"${(answer || "").trim()}"</p>
        <p class="body-s text-on-surface-variant mt-3">
          This is logged and will be surfaced in Mission 5. If your final tribunal position
          does not reference this evidence, the cross-examiner will ask why.
        </p>
      </div>
    `;
  }
  return "";
}

function renderQuizSummary(container, state, engine) {
  const totalTokens = state.decisions.quizTokens || 0;
  const items = QUIZ_ITEMS.map((item) => {
    const a = state.decisions.quizAnswers[item.id];
    return { item, a };
  });

  container.innerHTML = `
    <section class="quiz-summary">
      <header>
        <div class="console-label-gold">FIELD MENTOR · DEBRIEF</div>
        <h2 class="display-heading text-3xl mt-2">${totalTokens >= 0 ? "+" : ""}${totalTokens} ◆ earned</h2>
        <p class="body-l text-on-surface-variant mt-2">
          You've completed the RECON quiz. Below is a summary of how you scored on each item.
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
            <p class="body-s text-on-surface-variant mt-1">
              Confidence: <strong>${a?.confidence || "—"}</strong>
            </p>
          </div>
        `).join("")}
      </div>

      <div class="quiz-summary-controls mt-6">
        <button id="quiz-continue" type="button" class="btn-primary">
          <span>Continue to mission debrief</span>
          <span class="material-symbols-rounded size-20">arrow_forward</span>
        </button>
      </div>
    </section>
  `;

  container.querySelector("#quiz-continue").addEventListener("click", () => engine.advance());
}

/* ──────────────────────────────────────────────────────────────────
 * Phase 5 — Complete
 * ──────────────────────────────────────────────────────────────── */

async function reconComplete(container, state, engine) {
  const totalTokens = state.decisions.quizTokens || 0;
  const evidence = state.decisions.quizAnswers?.q6?.answer || "";

  container.innerHTML = `
    <section class="mission-complete">
      <div class="complete-banner">
        <div class="console-label-gold">MISSION 01 // RECON · COMPLETE</div>
        <h2 class="display-heading text-3xl mt-2">Briefing absorbed.</h2>
        <p class="body-l text-on-surface-variant mt-2">
          You've reviewed the dossier, heard from four stakeholders, and worked through
          a six-item Field Mentor diagnostic. Your reasoning trace will follow you into Mission 2.
        </p>
      </div>

      <div class="complete-stats">
        <div class="complete-stat">
          <div class="console-label-gold">TOKENS THIS MISSION</div>
          <div class="stat-value">${totalTokens >= 0 ? "+" : ""}${totalTokens} ◆</div>
        </div>
        <div class="complete-stat">
          <div class="console-label-gold">DOSSIER SECTIONS</div>
          <div class="stat-value">${DOSSIER.length} / ${DOSSIER.length} read</div>
        </div>
        <div class="complete-stat">
          <div class="console-label-gold">STAKEHOLDERS</div>
          <div class="stat-value">${STAKEHOLDERS.length} / ${STAKEHOLDERS.length} heard</div>
        </div>
      </div>

      ${evidence ? `
      <div class="complete-callback">
        <div class="console-label-gold mb-2">YOUR M1 EVIDENCE COMMITMENT</div>
        <p class="body-m" style="font-style: italic;">"${evidence}"</p>
        <p class="body-s text-on-surface-variant mt-2">
          This will resurface in Mission 5. Make sure your final position cites it — or be ready to explain why not.
        </p>
      </div>
      ` : ""}

      <div class="complete-vocab">
        <div class="console-label-gold mb-2">VOCABULARY ENCOUNTERED</div>
        <div class="vocab-chip-row">
          ${VOCABULARY.map((v) => `<span class="vocab-chip is-static"><strong>${v.term}</strong></span>`).join("")}
        </div>
      </div>

      <div class="complete-next mt-8">
        <div class="next-card">
          <div class="next-card-head">
            <span class="console-label-gold">UP NEXT</span>
            <span class="badge-pill"><span class="material-symbols-rounded size-20">lock</span><span>Available in next session</span></span>
          </div>
          <h3 class="title-l mt-1">Mission 02 · DECODE</h3>
          <p class="body-m text-on-surface-variant mt-1">
            Same crisis, two conflicting sources. You'll resolve them — and write a brief to an audience the AI assigns.
          </p>
          <button id="mission-next" type="button" class="btn-primary mt-4" disabled>
            <span>Continue to Mission 02</span>
            <span class="material-symbols-rounded size-20">arrow_forward</span>
          </button>
        </div>
      </div>

      <div class="complete-actions mt-6">
        <a href="./mission-select.html" class="btn-secondary">
          <span class="material-symbols-rounded size-20">map</span>
          <span>Back to Mission Select</span>
        </a>
        <a href="./portfolio.html" class="btn-text">
          <span class="material-symbols-rounded size-20">school</span>
          <span>View your portfolio</span>
        </a>
      </div>
    </section>
  `;

  toggleEngineControls(false);
}

/* ──────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

function toggleEngineControls(show) {
  const controls = document.getElementById("phase-controls");
  if (controls) controls.style.display = show ? "" : "none";
}
