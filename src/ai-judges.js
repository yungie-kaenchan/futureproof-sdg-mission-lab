/**
 * FUTUREPROOF — AI Judges (formative critique on Voice for Change submit)
 *
 * Renders on pages/final-task-submitted.html. After the student submits,
 * three AI-personified judges read the transcript and return SPECIFIC
 * advisory feedback (language register · argument · dignity-of-address).
 *
 * ── HARD-EDGE GUARDRAILS ──────────────────────────────────────────
 *   • The judges are FORMATIVE, never summative.
 *   • The student's teacher is the official grader (Rubric A).
 *   • The platform NEVER awards money; the grant is a classroom
 *     simulation. The judges' system prompt enforces this language.
 *
 * ── How it works ──────────────────────────────────────────────────
 *   1. Read the submitted payload from sessionStorage.
 *   2. Render three "loading…" judge cards immediately so the page
 *      feels alive.
 *   3. POST to /.netlify/functions/claude-proxy with kind:"aiJudges",
 *      sending the transcript + audience + evidence as context.
 *   4. Parse the JSON response (defensive: strip fences, try/catch).
 *   5. Populate each card with persona + critique + strength + refine.
 *   6. If anything fails, show a graceful "AI judges unavailable" state
 *      with the teacher-grades reminder still front-and-centre.
 *
 * All DOM constructed via createElement + textContent — zero innerHTML
 * on any value that could originate from the model output.
 */

const PROXY = "/.netlify/functions/claude-proxy";

const FALLBACK_JUDGES = [
  { id: "anchalee",  name: "Dr. Anchalee Suwannapong",   title: "Senior Lecturer in Applied Linguistics, Faculty of Liberal Arts", gender: "F", icon: "school",       focus: "Language register · modality · hedging" },
  { id: "nattaphum", name: "Khun Nattaphum Boonkrong",   title: "Programme Director, SDG Catalyst Initiatives",                  gender: "M", icon: "insights",      focus: "Argument strength · evidence · feasibility" },
  { id: "suthida",   name: "Khun Suthida Phetcharat",    title: "Director, Community Engagement & Youth Development",            gender: "F", icon: "diversity_3",   focus: "Dignity of address · ethical clarity" },
];

/* ── safe-DOM helper (no innerHTML on user/model content) ──────── */

function el(tag, props, ...children) {
  const e = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k.startsWith("aria") || k.startsWith("data-") || k === "role" || k === "id" || k === "type") e.setAttribute(k, v);
    else e[k] = v;
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    if (typeof c === "string") e.appendChild(document.createTextNode(c));
    else if (Array.isArray(c)) c.forEach((x) => x && e.appendChild(typeof x === "string" ? document.createTextNode(x) : x));
    else e.appendChild(c);
  }
  return e;
}

/* ── Boot ──────────────────────────────────────────────────────── */

async function boot() {
  const root = document.getElementById("ai-judges-root");
  if (!root) return;

  const payload = readPayload();
  if (!payload || !payload.transcript) {
    renderUnavailable(root, "No transcript was found for this submission — your teacher will grade it manually using Rubric A.");
    return;
  }

  // Word-count check — too short to bother the API
  const words = payload.transcript.trim().split(/\s+/).filter(Boolean).length;

  // Render loading cards immediately
  const judgesRow = renderLoadingCards(root);

  try {
    const result = await callJudges(payload);
    if (result && Array.isArray(result.judges) && result.judges.length > 0) {
      renderJudges(judgesRow, result.judges);
      if (result.note) {
        const noteEl = root.querySelector(".aij-disclaimer-bottom");
        if (noteEl) noteEl.textContent = result.note;
      }
    } else {
      renderUnavailable(root, "The AI judges could not generate a critique just now — your teacher will still grade your submission with Rubric A.");
    }
  } catch (e) {
    console.warn("[ai-judges] call failed:", e);
    const detail = (e && e.message) ? e.message : String(e);
    renderUnavailable(root,
      "The AI judges could not generate critique just now — your teacher will still grade your submission with Rubric A. " +
      "Technical detail (for teachers / admins): " + detail
    );
  }
}

/* ── Payload retrieval ─────────────────────────────────────────── */

function readPayload() {
  try {
    const raw = sessionStorage.getItem("fp_vfc_submitted");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* ── Loading state ─────────────────────────────────────────────── */

function renderLoadingCards(root) {
  // Build the structural shell
  const shell = el("div", { class: "aij-shell" },
    el("div", { class: "aij-banner" },
      el("span", { class: "aij-banner-glyph", "aria-hidden": "true", text: "⚠" }),
      el("div", null,
        el("strong", { text: "AI Judges' Initial Critique — advisory only" }),
        el("span", { class: "th", text: "ผลวิจารณ์เบื้องต้นจาก AI — ใช้เป็นข้อเสนอแนะเท่านั้น" }),
      ),
    ),
    el("p", { class: "aij-context", text:
      "Three AI-persona judges have read your transcript and will share formative feedback below. Their job is to point you toward strengths and refinement areas — NOT to grade your work. " +
      "Your teacher is the official grader, using Rubric A. The AI critique never overrides the teacher's score."
    }),
    el("div", { class: "aij-grid", id: "aij-grid" }),
    el("p", { class: "aij-disclaimer-bottom", text: "Remember: this critique is advisory. Your teacher grades the final score with Rubric A." }),
  );
  root.appendChild(shell);

  const grid = shell.querySelector("#aij-grid");
  FALLBACK_JUDGES.forEach((j) => {
    const card = buildJudgeCardSkeleton(j);
    card.dataset.judgeId = j.id;
    grid.appendChild(card);
  });
  return grid;
}

function buildJudgeCardSkeleton(j) {
  return el("article", { class: "aij-card" },
    el("header", { class: "aij-card-head" },
      el("div", { class: "aij-avatar aij-avatar-" + j.gender.toLowerCase() },
        el("span", { class: "material-symbols-rounded", text: j.icon }),
      ),
      el("div", { class: "aij-id" },
        el("h3", { class: "aij-name", text: j.name }),
        el("div", { class: "aij-title", text: j.title }),
      ),
    ),
    el("div", { class: "aij-focus", text: "Focus · " + j.focus }),
    el("div", { class: "aij-critique aij-loading" },
      el("span", { class: "aij-loading-pulse" }),
      el("span", { text: " Reading your transcript…" }),
    ),
    el("div", { class: "aij-tags", id: "aij-tags-" + j.id }),
  );
}

/* ── Render real critiques ─────────────────────────────────────── */

function renderJudges(grid, judges) {
  judges.forEach((j) => {
    const card = grid.querySelector('[data-judge-id="' + j.id + '"]');
    if (!card) return;
    // Replace the loading block with the critique paragraph
    const block = card.querySelector(".aij-critique");
    block.classList.remove("aij-loading");
    while (block.firstChild) block.removeChild(block.firstChild);
    block.appendChild(document.createTextNode(j.critique || ""));

    // Render strength + refine tags
    const tags = card.querySelector('#aij-tags-' + j.id);
    if (j.strength) tags.appendChild(buildTag("Strength", j.strength, "strength"));
    if (j.refine)   tags.appendChild(buildTag("Refine",   j.refine,   "refine"));
  });
}

function buildTag(label, text, kind) {
  return el("div", { class: "aij-tag aij-tag-" + kind },
    el("div", { class: "aij-tag-label", text: label }),
    el("div", { class: "aij-tag-text",  text }),
  );
}

/* ── Unavailable fallback ──────────────────────────────────────── */

function renderUnavailable(root, message) {
  const shell = el("div", { class: "aij-shell aij-unavail" },
    el("div", { class: "aij-banner" },
      el("span", { class: "aij-banner-glyph", "aria-hidden": "true", text: "🛈" }),
      el("strong", { text: "AI Judges — advisory note" }),
    ),
    el("p", { class: "aij-context", text: message }),
    el("p", { class: "aij-disclaimer-bottom", text: "Your teacher remains the official grader (Rubric A). This step is formative — it cannot change your final mark." }),
  );
  while (root.firstChild) root.removeChild(root.firstChild);
  root.appendChild(shell);
}

/* ── Network call ──────────────────────────────────────────────── */

async function callJudges(payload) {
  const transcript = (payload.transcript || "").slice(0, 6000);
  const userMessage =
    "Here is the student's Voice for Change transcript:\n\n" +
    "---\n" + transcript + "\n---\n\n" +
    "Now provide your three-judge critique in the JSON shape specified.";

  const context = {
    studentName: payload.studentName || "Anonymous",
    audience: payload.audienceLabel || "Not specified",
    lane: payload.lane || "record",
    transcriptWordCount: transcript.trim().split(/\s+/).filter(Boolean).length,
    evidenceCommitments: payload.evidenceCommitments || {},
  };

  let res;
  try {
    res = await fetch(PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "aiJudges", userMessage, context }),
    });
  } catch (netErr) {
    throw new Error("Network · could not reach the AI engine (Netlify function may not be deployed). Detail: " + netErr.message);
  }

  let data = null;
  try { data = await res.json(); } catch (_) { /* non-JSON body */ }

  if (!res.ok) {
    const detail = data ? JSON.stringify(data).slice(0, 240) : "(no body)";
    throw new Error("Proxy returned HTTP " + res.status + " — " + detail);
  }

  if (!data || typeof data.text !== "string" || !data.text.trim()) {
    throw new Error("Proxy returned 200 but with no text content. Check ANTHROPIC_API_KEY in Netlify env vars.");
  }

  // Strip ```json fences if Claude wrapped the output
  const text = data.text.replace(/^\s*```(?:json)?\s*|\s*```\s*$/g, "").trim();
  let parsed;
  try { parsed = JSON.parse(text); }
  catch (_) {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) { try { parsed = JSON.parse(m[0]); } catch (__) {} }
  }
  if (!parsed) throw new Error("Could not parse the proxy's response as JSON. First 200 chars: " + text.slice(0, 200));
  return parsed;
}

/* ── Boot ──────────────────────────────────────────────────────── */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
