/**
 * FUTUREPROOF — Custom Mission Phase Handlers
 *
 * Each handler renders one phase of one mission. Registered on the engine
 * via engine.registerPhaseHandler(name, fn). When the engine reaches that
 * phase, the handler renders into the container and the engine's Next/Back
 * buttons advance/return as usual.
 *
 * Handlers may write to state.decisions[<key>] and state.rationale.
 *
 * The engine still owns: sequencing, AI Judge call, token award, navigation.
 */

import { isPaceMode } from "./a11y.js";
import { readBlock, listenBlock, speakBlock, writeBlock, multimodalStage } from "./multimodal.js";

const CLAUDE_PROXY = "/.netlify/functions/claude-proxy";

/* ──────────────────────────────────────────────────────────────────
 * Mission 01 — RECON
 * ──────────────────────────────────────────────────────────────── */

const RECON_VOCAB_TARGETS = [
  { term: "salinity",        gloss: "concentration of dissolved salts in water" },
  { term: "stakeholder",     gloss: "anyone with an interest in or affected by the outcome" },
  { term: "leverage point",  gloss: "a place in a system where a small change shifts the whole" },
  { term: "intergenerational", gloss: "across generations of people" },
  { term: "remediation",     gloss: "an action that corrects or repairs a problem" },
];

const RECON_SOURCES = [
  { id: "src_govt",     label: "Ministry data portal",      credibility: 0.85, perspective: "Official figures, slow to update.", cost: "Time-consuming to navigate." },
  { id: "src_academic", label: "Peer-reviewed paper",        credibility: 0.92, perspective: "Rigorous, narrow in scope.", cost: "Behind paywall; older data." },
  { id: "src_news",     label: "Investigative news article", credibility: 0.65, perspective: "Recent, named stakeholders.", cost: "Single-paper bias possible." },
  { id: "src_ngo",      label: "NGO field report",           credibility: 0.74, perspective: "Voice of affected communities.", cost: "Advocacy framing." },
];

export function reconVocabulary(container, state, engine) {
  state.decisions.vocabIds = state.decisions.vocabIds || [];

  const contextSentence = RECON_VOCAB_TARGETS.map((v) => {
    return `When the ${v.term} rises, every downstream stakeholder feels it.`;
  }).join(" ");

  multimodalStage(container, [
    listenBlock({
      title: "Hear the terms in context",
      transcript: `Five terms shape this brief. Listen once, then tap each card to confirm the meaning. ${contextSentence}`,
      speakerLabel: "Briefing voiceover",
      voice: "neutral",
    }),
    (() => {
      const wrap = document.createElement("section");
      wrap.className = "channel-block channel-read";
      wrap.innerHTML = `
        <div class="channel-tag"><span class="material-symbols-rounded size-20">menu_book</span><span>READ &amp; MATCH</span></div>
        <h3 class="title-l mb-2">Match the term to its meaning</h3>
        <p class="body-s text-on-surface-variant mb-3">Tap each term once you're confident.</p>
        <div id="vocab-list" class="space-y-2"></div>
        <p id="vocab-status" class="body-s text-on-surface-variant mt-3"></p>
      `;
      const list = wrap.querySelector("#vocab-list");
      RECON_VOCAB_TARGETS.forEach((v, idx) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "option-card" + (state.decisions.vocabIds.includes(idx) ? " selected" : "");
        card.innerHTML = `
          <span class="option-marker">${idx + 1}</span>
          <span class="flex-1"><strong>${v.term}</strong> — <span class="text-on-surface/80">${v.gloss}</span></span>
        `;
        card.addEventListener("click", () => {
          const i = state.decisions.vocabIds.indexOf(idx);
          if (i >= 0) state.decisions.vocabIds.splice(i, 1);
          else state.decisions.vocabIds.push(idx);
          card.classList.toggle("selected");
          wrap.querySelector("#vocab-status").textContent = `${state.decisions.vocabIds.length} of 5 recognized.`;
        });
        list.appendChild(card);
      });
      wrap.querySelector("#vocab-status").textContent = `${state.decisions.vocabIds.length} of 5 recognized.`;
      return wrap;
    })(),
    speakBlock({
      prompt: "Pronunciation drill — say all 5 terms aloud in order.",
      maxSeconds: 30,
      onCapture: (blob, dur) => { state.decisions.vocabAudio = { dur }; },
    }),
  ]);
}

export function reconStakeholderMap(container, state, engine) {
  const stakeholders = engine.scenario?.stakeholders || [];
  state.decisions.stakeholdersAcknowledged = state.decisions.stakeholdersAcknowledged || [];

  if (stakeholders.length === 0) {
    container.innerHTML = `<div class="alert-attention">No stakeholders loaded — pick a scenario from <a class="link-anim" href="./mission-select.html">Mission Select</a> first.</div>`;
    return;
  }

  // Composite voicemail script — each stakeholder speaks one line
  const voicemailScript = stakeholders.map((s) =>
    `Hi, I'm with ${s.label}. Here's what we'd want you to hear: ${s.interest || s.role || "we have a stake in this outcome"}.`
  ).join(" ");

  const blocks = [
    listenBlock({
      title: "Stakeholder voicemails",
      transcript: voicemailScript,
      speakerLabel: `${stakeholders.length} stakeholders, one line each`,
      voice: "warm",
    }),
    (() => {
      const wrap = document.createElement("section");
      wrap.className = "channel-block channel-read";
      wrap.innerHTML = `
        <div class="channel-tag"><span class="material-symbols-rounded size-20">groups</span><span>READ &amp; PICK</span></div>
        <h3 class="title-l mb-1">Who's actually in the room?</h3>
        <p class="body-s text-on-surface-variant mb-3">Tap each stakeholder you'd want to hear from before deciding. (You don't need to hear from all of them.)</p>
        <div id="stk-list" class="space-y-2"></div>
      `;
      const list = wrap.querySelector("#stk-list");
      stakeholders.forEach((s, idx) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "option-card" + (state.decisions.stakeholdersAcknowledged.includes(idx) ? " selected" : "");
        card.innerHTML = `
          <span class="option-marker">${String(idx + 1).padStart(2, '0')}</span>
          <span class="flex-1"><strong>${escapeHtml(s.label)}</strong> — <span class="text-on-surface/80">${escapeHtml(s.role || "")}</span><br><span class="body-s text-on-surface-variant">${escapeHtml(s.interest || "")}</span></span>
        `;
        card.addEventListener("click", () => {
          const i = state.decisions.stakeholdersAcknowledged.indexOf(idx);
          if (i >= 0) state.decisions.stakeholdersAcknowledged.splice(i, 1);
          else state.decisions.stakeholdersAcknowledged.push(idx);
          card.classList.toggle("selected");
        });
        list.appendChild(card);
      });
      return wrap;
    })(),
    writeBlock({
      prompt: "In 30–50 words, name the two stakeholders you'd most want to interview first — and why.",
      minWords: 30,
      maxWords: 50,
      onChange: (val) => { state.decisions.stakeholderRationale = val; },
    }),
  ];

  multimodalStage(container, blocks);
}

export function reconSourceSelect(container, state, engine) {
  state.decisions.sourcesPicked = state.decisions.sourcesPicked || [];

  // Composite sample — each source's perspective read aloud (15 s of speech each)
  const sampleScript = RECON_SOURCES.map((src) =>
    `${src.label}: ${src.perspective} Trade-off — ${src.cost}.`
  ).join(" ");

  const blocks = [
    listenBlock({
      title: "Sample readings — 15 seconds per source",
      transcript: sampleScript,
      speakerLabel: "Four sources, four registers",
      voice: "formal",
    }),
    (() => {
      const wrap = document.createElement("section");
      wrap.className = "channel-block channel-read";
      wrap.innerHTML = `
        <div class="channel-tag"><span class="material-symbols-rounded size-20">fact_check</span><span>READ &amp; PICK 2 OF 4</span></div>
        <h3 class="title-l mb-1">What will you carry into Mission 02?</h3>
        <p class="body-s text-on-surface-variant mb-3">You can only pick two. Trade-offs are part of the call.</p>
        <div id="src-list" class="space-y-2"></div>
        <p id="src-status" class="body-s text-on-surface-variant mt-3"></p>
      `;
      const list = wrap.querySelector("#src-list");
      const status = wrap.querySelector("#src-status");
      const refresh = () => { status.textContent = `${state.decisions.sourcesPicked.length} of 2 chosen.`; };
      RECON_SOURCES.forEach((src) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "option-card" + (state.decisions.sourcesPicked.includes(src.id) ? " selected" : "");
        card.innerHTML = `
          <span class="option-marker">◆</span>
          <span class="flex-1">
            <strong>${escapeHtml(src.label)}</strong>
            <div class="body-s text-on-surface/80 mt-1">${escapeHtml(src.perspective)}</div>
            <div class="body-s text-on-surface-variant mt-1">Trade-off: ${escapeHtml(src.cost)} • Credibility ${(src.credibility * 100).toFixed(0)}%</div>
          </span>
        `;
        card.addEventListener("click", () => {
          const picked = state.decisions.sourcesPicked;
          const idx = picked.indexOf(src.id);
          if (idx >= 0) { picked.splice(idx, 1); card.classList.remove("selected"); }
          else if (picked.length < 2) { picked.push(src.id); card.classList.add("selected"); }
          refresh();
        });
        list.appendChild(card);
      });
      refresh();
      return wrap;
    })(),
    speakBlock({
      prompt: "Say the names of your two chosen sources aloud, with one short reason each (10–15 s).",
      maxSeconds: 25,
      onCapture: (blob, dur) => { state.decisions.sourceVoiceRationale = { dur }; },
    }),
  ];

  multimodalStage(container, blocks);
}

/* ──────────────────────────────────────────────────────────────────
 * Mission 02 — DECODE
 * ──────────────────────────────────────────────────────────────── */

const DECODE_AUDIENCES = [
  { id: "minister",  label: "Senior Thai government minister",  registerNote: "Formal, hedged, brief; expects executive summary." },
  { id: "citizen",   label: "Concerned local citizen",         registerNote: "Plain language; concrete; respectful of lived experience." },
  { id: "investor",  label: "Institutional investor",          registerNote: "Risk-and-return framing; quantitative." },
  { id: "ngo",       label: "International NGO partner",       registerNote: "Stakeholder language; rights-based; collaborative." },
];

export function decodeAudienceAssign(container, state, engine) {
  if (!state.decisions.audience) {
    state.decisions.audience = DECODE_AUDIENCES[Math.floor(Math.random() * DECODE_AUDIENCES.length)].id;
  }
  const audience = DECODE_AUDIENCES.find((a) => a.id === state.decisions.audience);

  multimodalStage(container, [
    readBlock({
      title: `Audience: ${audience.label}`,
      body: audience.registerNote,
      sourceLabel: "Register brief from your editor",
    }),
    listenBlock({
      title: "Voice memo from your editor",
      transcript: `Heads up — your audience is ${audience.label}. ${audience.registerNote} You'll write next, then we'll capture you reading the opening line aloud. Take it slow. You've got this.`,
      speakerLabel: "Editorial voice",
      voice: "neutral",
    }),
    writeBlock({
      prompt: `Draft your 90–120 word explanation tailored to: ${audience.label}.`,
      minWords: 90,
      maxWords: 120,
      onChange: (val) => { state.rationale = val; },
    }),
    speakBlock({
      prompt: "Read the first two sentences of your draft aloud.",
      maxSeconds: 30,
      onCapture: (blob, dur) => { state.decisions.audienceAudio = { dur }; },
    }),
  ]);
}

/* ──────────────────────────────────────────────────────────────────
 * Mission 03 — DEPLOY
 * ──────────────────────────────────────────────────────────────── */

const DEPLOY_STRATEGIES = [
  { id: "transparent", label: "Transparent disclosure",
    rationale: "Publish what you know now; commit to a follow-up timeline.",
    risk: "Erodes trust if details shift later." },
  { id: "consultative", label: "Consultative pause",
    rationale: "Convene stakeholders before public action.",
    risk: "Slows momentum; may signal indecision." },
  { id: "decisive",     label: "Decisive intervention",
    rationale: "Announce a concrete commitment now.",
    risk: "Risks acting on incomplete information." },
];

export function deployCrisisEvent(container, state, engine) {
  const sec = isPaceMode() ? 600 : 180;
  state.decisions.crisisAcknowledgedAt = state.decisions.crisisAcknowledgedAt || Date.now();

  const scenarioTitle = engine.scenario?.title || "your scenario";
  const reporterLine = `Hi, this is a reporter from Bangkok Post. I'm filing tonight on ${scenarioTitle}. Your team's response will be on the front page. I'll give you four minutes — what's the line?`;

  multimodalStage(container, [
    readBlock({
      title: "INCOMING — Comms Interceptor",
      body: `A reporter has the story. They want a quote in ${Math.floor(sec/60)} minutes${isPaceMode() ? ' (Cognitive Pace Mode)' : ''}. Whatever you say will drive the consequences in Mission 04.`,
      sourceLabel: "Newsroom intercept",
    }),
    listenBlock({
      title: "Reporter's voicemail",
      transcript: reporterLine,
      speakerLabel: "Reporter, Bangkok Post",
      voice: "alert",
    }),
    speakBlock({
      prompt: "Quick recall — speak your team's working position in 30 seconds.",
      maxSeconds: 30,
      onCapture: (blob, dur) => { state.decisions.crisisRecall = { dur }; },
    }),
  ]);

  // Inline timer card appended after channels
  const timerCard = document.createElement("div");
  timerCard.className = "alert-attention mt-4";
  timerCard.innerHTML = `<strong id="crisis-timer">TIME REMAINING —</strong>`;
  container.querySelector(".multimodal-stage")?.appendChild(timerCard);
  const timerEl = timerCard.querySelector("#crisis-timer");
  const start = Date.now();
  function tick() {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const remaining = Math.max(0, sec - elapsed);
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    timerEl.textContent = remaining > 0 ? `TIME REMAINING ${mm}:${ss}` : "TIME UP — pick a strategy.";
    if (remaining > 0 && container.contains(timerEl)) setTimeout(tick, 1000);
  }
  tick();
}

export function deployStrategySelect(container, state, engine) {
  state.decisions.strategy = state.decisions.strategy || null;

  const advisorScript = DEPLOY_STRATEGIES.map((s, i) =>
    `Option ${["A","B","C"][i]}: ${s.label}. ${s.rationale} The risk you're taking on: ${s.risk}.`
  ).join(" ");

  const blocks = [
    listenBlock({
      title: "Senior advisor walks each option",
      transcript: advisorScript,
      speakerLabel: "Senior advisor, briefing voice",
      voice: "formal",
    }),
    (() => {
      const wrap = document.createElement("section");
      wrap.className = "channel-block channel-read";
      wrap.innerHTML = `
        <div class="channel-tag"><span class="material-symbols-rounded size-20">tune</span><span>READ &amp; PICK 1 OF 3</span></div>
        <h3 class="title-l mb-1">What's your team's call?</h3>
        <p class="body-s text-on-surface-variant mb-3">Each option carries a different risk profile. There's no safe choice here.</p>
        <div id="strat-list" class="space-y-2"></div>
      `;
      const list = wrap.querySelector("#strat-list");
      DEPLOY_STRATEGIES.forEach((s, idx) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "option-card" + (state.decisions.strategy === s.id ? " selected" : "");
        card.innerHTML = `
          <span class="option-marker">${["A","B","C"][idx]}</span>
          <span class="flex-1">
            <strong>${escapeHtml(s.label)}</strong>
            <div class="body-s text-on-surface/85 mt-1">${escapeHtml(s.rationale)}</div>
            <div class="body-s gold-text mt-1"><strong>Risk:</strong> ${escapeHtml(s.risk)}</div>
          </span>
        `;
        card.addEventListener("click", () => {
          state.decisions.strategy = s.id;
          list.querySelectorAll(".option-card").forEach((b) => b.classList.remove("selected"));
          card.classList.add("selected");
        });
        list.appendChild(card);
      });
      return wrap;
    })(),
    speakBlock({
      prompt: "Announce your team's choice aloud as if briefing teammates — 15 seconds.",
      maxSeconds: 20,
      onCapture: (blob, dur) => { state.decisions.strategyVoice = { dur }; },
    }),
  ];

  multimodalStage(container, blocks);
}

/* ──────────────────────────────────────────────────────────────────
 * Mission 04 — DISSECT
 * ──────────────────────────────────────────────────────────────── */

export function dissectConsequencesReveal(container, state, engine) {
  const strategy = state.decisions.strategy || "your team's chosen strategy";
  const stakeholders = engine.scenario?.stakeholders || [];
  const reactionScript = stakeholders.length > 0
    ? stakeholders.slice(0, 3).map((s) =>
        `${s.label} reacts: ${s.interest ? `we expected ${s.interest.toLowerCase()}, but the move you made shifts that calculus` : `we did not expect this turn`}.`
      ).join(" ")
    : `Stakeholders are responding. Some moves you anticipated; some you didn't.`;

  multimodalStage(container, [
    readBlock({
      title: "Press coverage — 72 hours later",
      body: `Your Mission 3 strategy was: ${strategy}. The wire ran with it. Below, three stakeholders responded by morning.`,
      sourceLabel: "Wire summary",
    }),
    listenBlock({
      title: "Stakeholder reactions",
      transcript: reactionScript,
      speakerLabel: "Three stakeholders, recorded responses",
      voice: "warm",
    }),
    writeBlock({
      prompt: "Quick first-take: what worked, what didn't? (60–80 words)",
      minWords: 60,
      maxWords: 80,
      onChange: (val) => { state.decisions.firstTake = val; },
    }),
  ]);
}

/* ──────────────────────────────────────────────────────────────────
 * Mission 05 — TRIBUNAL (multi-turn cross-examination)
 * ──────────────────────────────────────────────────────────────── */

export function tribunalCrossExamine(container, state, engine) {
  state.decisions.tribunalTurns = state.decisions.tribunalTurns || [];
  container.innerHTML = "";

  const wrap = document.createElement("section");
  wrap.className = "channel-block channel-listen";
  wrap.innerHTML = `
    <div class="channel-tag"><span class="material-symbols-rounded size-20">gavel</span><span>LISTEN · SPEAK · WRITE</span></div>
    <h2 class="title-l mb-2">The tribunal will probe your reasoning</h2>
    <p class="body-s text-on-surface-variant mb-4">Hold your position when you can — refine it when the counter is strong. Reply by typing or by recording a short voice response.</p>
    <div id="tribunal-log" class="space-y-3 mb-4"></div>

    <form id="tribunal-form" class="space-y-2">
      <div class="m3-textfield"><textarea id="tribunal-input" rows="3" placeholder=" "></textarea><label>Your response</label></div>
      <div class="flex flex-wrap items-center gap-2">
        <button type="submit" class="btn-primary"><span class="material-symbols-rounded size-20">send</span><span>Submit</span></button>
        <button type="button" id="tribunal-rec" class="btn-secondary"><span class="material-symbols-rounded size-20">mic</span><span>Record voice (45 s)</span></button>
        <span id="tribunal-rec-status" class="body-s text-on-surface-variant"></span>
      </div>
    </form>
    <p class="body-s text-on-surface-variant mt-3">Aim for 3–4 exchanges. The tribunal will not give you the answer.</p>
  `;
  container.appendChild(wrap);

  const log = wrap.querySelector("#tribunal-log");
  const recBtn = wrap.querySelector("#tribunal-rec");
  const recStatus = wrap.querySelector("#tribunal-rec-status");
  let recorder = null;
  let recChunks = [];

  function speakAloud(text) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.92;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  function appendBubble(role, text, audioUrl) {
    const m = document.createElement("div");
    m.className = "mentor-msg " + (role === "user" ? "user" : "bot");
    m.textContent = text;
    if (role === "assistant") {
      const playBtn = document.createElement("button");
      playBtn.type = "button";
      playBtn.className = "btn-text mt-2";
      playBtn.innerHTML = `<span class="material-symbols-rounded size-20">volume_up</span><span>Hear it</span>`;
      playBtn.style.height = "32px";
      playBtn.addEventListener("click", () => speakAloud(text));
      m.appendChild(document.createElement("br"));
      m.appendChild(playBtn);
    }
    if (audioUrl) {
      const a = document.createElement("audio");
      a.controls = true; a.src = audioUrl; a.style.display = "block"; a.style.marginTop = "0.5rem";
      m.appendChild(a);
    }
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  recBtn.addEventListener("click", async () => {
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      recChunks = [];
      const start = Date.now();
      recorder.addEventListener("dataavailable", (e) => { if (e.data.size) recChunks.push(e.data); });
      recorder.addEventListener("stop", () => {
        for (const t of stream.getTracks()) t.stop();
        const blob = new Blob(recChunks, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        appendBubble("user", "[voice response]", url);
        const dur = Math.round((Date.now() - start) / 1000);
        state.decisions.tribunalTurns.push({ role: "user", text: "[voice response]", audioDur: dur });
        recBtn.querySelector("span:last-child").textContent = "Record voice (45 s)";
        recBtn.querySelector(".material-symbols-rounded").textContent = "mic";
        recStatus.textContent = "";
      });
      recorder.start();
      recBtn.querySelector("span:last-child").textContent = "Stop";
      recBtn.querySelector(".material-symbols-rounded").textContent = "stop";
      recStatus.textContent = "Recording…";
      setTimeout(() => { if (recorder && recorder.state === "recording") recorder.stop(); }, 45_000);
    } catch (err) {
      recStatus.textContent = "Microphone permission denied.";
    }
  });

  state.decisions.tribunalTurns.forEach((t) => appendBubble(t.role, t.text));

  // Open with a probe if no history yet
  if (state.decisions.tribunalTurns.length === 0) {
    const opening = `Whose perspective does your position currently exclude — and what would change if you centered theirs?`;
    appendBubble("assistant", opening);
    speakAloud(opening);
    state.decisions.tribunalTurns.push({ role: "assistant", text: opening });
  }

  wrap.querySelector("#tribunal-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = wrap.querySelector("#tribunal-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    appendBubble("user", text);
    state.decisions.tribunalTurns.push({ role: "user", text });

    const status = document.createElement("div");
    status.className = "mentor-msg bot";
    status.style.fontStyle = "italic";
    status.textContent = "Considering…";
    log.appendChild(status);

    try {
      const response = await fetch(CLAUDE_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "tribunal",
          userMessage: text,
          context: {
            scenarioTitle: engine.scenario?.title,
            ethicalAxes: engine.scenario?.ethicalAxes,
          },
          history: state.decisions.tribunalTurns.slice(-8).map((t) => ({
            role: t.role === "user" ? "user" : "assistant",
            content: t.text,
          })).slice(0, -1),
        }),
      });
      status.remove();
      if (!response.ok) {
        const fallback = localTribunalFallback(text);
        appendBubble("assistant", fallback);
        state.decisions.tribunalTurns.push({ role: "assistant", text: fallback });
        return;
      }
      const data = await response.json();
      const reply = (data.text || "").trim() || localTribunalFallback(text);
      appendBubble("assistant", reply);
      speakAloud(reply);
      state.decisions.tribunalTurns.push({ role: "assistant", text: reply });
    } catch {
      status.remove();
      const reply = localTribunalFallback(text);
      appendBubble("assistant", reply);
      speakAloud(reply);
      state.decisions.tribunalTurns.push({ role: "assistant", text: reply });
    }
  });
}

function localTribunalFallback(userText) {
  const t = userText.toLowerCase();
  if (/everyone|all|always|never/.test(t)) {
    return "You used a universal claim. Name one specific case where it would not hold — and tell me whether the principle survives that case.";
  }
  if (/right|correct|obvious/.test(t)) {
    return "If it were obvious, the tribunal would not be sitting. What does the strongest opposing witness know that you do not?";
  }
  return "Acknowledged. Now: which premise in your argument is doing the most work — and what would you concede if it were weaker than you think?";
}

/* ──────────────────────────────────────────────────────────────────
 * Universal phase factories — read/listen/write/speak compositions
 * ──────────────────────────────────────────────────────────────── */

/**
 * Generic briefing — every mission's first phase.
 * READ scenario brief → LISTEN editor voiceover → WRITE 3 things you know.
 */
function genericBriefing(container, state, engine) {
  const sc = engine.scenario;
  const briefBody = sc
    ? `${sc.title}. ${sc.setting || ""} ${sc.coreTension ? "Core tension: " + sc.coreTension : ""}`
    : "(No scenario locked. Pick one from Mission Select first.)";
  multimodalStage(container, [
    readBlock({ title: "Mission briefing", body: briefBody, sourceLabel: "Locked scenario" }),
    listenBlock({
      title: "Editor's voicemail",
      transcript: `Welcome to the desk. Today's brief: ${briefBody} Read it twice. Then I want three things you already know.`,
      speakerLabel: "Editor-in-chief",
      voice: "warm",
    }),
    writeBlock({
      prompt: "Three things you already know about this issue (warm-up).",
      minWords: 30,
      maxWords: 50,
      onChange: (val) => { state.decisions.briefingNotes = val; },
    }),
  ]);
}

/* Mission 02 — DECODE: explain + registerCheck */
function decodeExplain(container, state, engine) {
  const audience = state.decisions.audience || "your assigned audience";
  multimodalStage(container, [
    readBlock({
      title: "Audience reminder",
      body: `You're explaining the crisis to: ${audience}. The register will be judged.`,
      sourceLabel: "Editor's note",
    }),
    writeBlock({
      prompt: "Draft your 90–120 word explanation tailored to this audience.",
      minWords: 90, maxWords: 120,
      onChange: (val) => { state.rationale = val; state.decisions.explanation = val; },
    }),
    speakBlock({
      prompt: "Read your draft's first two sentences aloud — register check.",
      maxSeconds: 30,
      onCapture: (blob, dur) => { state.decisions.explainAudio = { dur }; },
    }),
  ]);
}

function decodeRegisterCheck(container, state, engine) {
  const draft = state.decisions.explanation || state.rationale || "";
  multimodalStage(container, [
    readBlock({
      title: "Your draft, replayed",
      body: draft || "(no draft on record)",
      sourceLabel: "Your text",
    }),
    listenBlock({
      title: "Hear your draft in a different register",
      transcript: draft || "Draft not provided.",
      speakerLabel: "Register coach",
      voice: "formal",
    }),
    writeBlock({
      prompt: "What single phrase would you change to better match the audience?",
      minWords: 20, maxWords: 50,
      onChange: (val) => { state.decisions.registerEdit = val; },
    }),
  ]);
}

/* Mission 03 — DEPLOY: draftResponse */
function deployDraftResponse(container, state, engine) {
  const strategy = state.decisions.strategy || "(no strategy chosen)";
  multimodalStage(container, [
    readBlock({
      title: "Strategy locked",
      body: `Your team chose: ${strategy}. The press wants the quote now.`,
      sourceLabel: "Newsroom",
    }),
    writeBlock({
      prompt: "Write the public statement — 80–120 words.",
      minWords: 80, maxWords: 120,
      onChange: (val) => { state.rationale = val; state.decisions.publicStatement = val; },
    }),
    speakBlock({
      prompt: "Read it aloud as the team's spoken quote.",
      maxSeconds: 60,
      onCapture: (blob, dur) => { state.decisions.publicStatementAudio = { dur }; },
    }),
  ]);
}

/* Mission 04 — DISSECT: compare, leveragePoint, counterargument */
function dissectCompare(container, state, engine) {
  multimodalStage(container, [
    readBlock({
      title: "What worked vs what failed",
      body: "Compare your team's expected outcomes with what actually unfolded after Mission 3. Two columns, side-by-side, in your head.",
      sourceLabel: "Self-review",
    }),
    writeBlock({
      prompt: "Top 2 things that worked, top 2 that didn't (60–80 words).",
      minWords: 60, maxWords: 80,
      onChange: (val) => { state.decisions.compareNotes = val; },
    }),
    speakBlock({
      prompt: "Pick one item — explain why it surprised you (30 s).",
      maxSeconds: 35,
      onCapture: (blob, dur) => { state.decisions.compareAudio = { dur }; },
    }),
  ]);
}

function dissectLeveragePoint(container, state, engine) {
  multimodalStage(container, [
    readBlock({
      title: "System map view",
      body: "Across the full scenario, find the single highest-leverage place to push. It can be a stakeholder, a policy, a flow of information, or an incentive.",
      sourceLabel: "Analytical brief",
    }),
    writeBlock({
      prompt: "Name the leverage point. Defend it in 80–120 words.",
      minWords: 80, maxWords: 120,
      onChange: (val) => { state.rationale = val; state.decisions.leveragePoint = val; },
    }),
    speakBlock({
      prompt: "Pitch it as a 60-second case to a skeptical room.",
      maxSeconds: 65,
      onCapture: (blob, dur) => { state.decisions.leverageAudio = { dur }; },
    }),
  ]);
}

function dissectCounterargument(container, state, engine) {
  const yourPoint = state.decisions.leveragePoint || "your stated leverage point";
  multimodalStage(container, [
    listenBlock({
      title: "AI counter-position",
      transcript: `I disagree. ${yourPoint.slice(0, 80)} sounds clean on paper. But the weakest premise is that the people closest to the problem will accept your framing. They have not before. What changes that calculus this time?`,
      speakerLabel: "AI Judge",
      voice: "alert",
    }),
    writeBlock({
      prompt: "Refine your position in 40–60 words. Don't capitulate, don't dig in — refine.",
      minWords: 40, maxWords: 70,
      onChange: (val) => { state.decisions.refinement = val; },
    }),
    speakBlock({
      prompt: "Live response: 30-second voice rebuttal.",
      maxSeconds: 35,
      onCapture: (blob, dur) => { state.decisions.refinementAudio = { dur }; },
    }),
  ]);
}

/* Mission 05 — TRIBUNAL: dilemmaPresent, positionDraft, finalJudgment */
function tribunalDilemmaPresent(container, state, engine) {
  const sc = engine.scenario;
  const dilemma = sc?.ethicalAxes?.length
    ? `Two values your team has acted on are now in direct tension: ${sc.ethicalAxes.join(" and ")}. Choose which to uphold first.`
    : "Two values your team has acted on are now in direct tension. The tribunal asks which you would uphold first.";
  multimodalStage(container, [
    readBlock({
      title: "Tonight's dilemma",
      body: dilemma,
      sourceLabel: "Tribunal docket",
    }),
    listenBlock({
      title: "Tribunal chair, opening words",
      transcript: dilemma + " You will state your position, defend it, and live with it.",
      speakerLabel: "Tribunal chair",
      voice: "formal",
    }),
    writeBlock({
      prompt: "Gut reaction — 30 words. (You'll watch yourself revise this.)",
      minWords: 20, maxWords: 50,
      onChange: (val) => { state.decisions.dilemmaGutReaction = val; },
    }),
  ]);
}

function tribunalPositionDraft(container, state, engine) {
  multimodalStage(container, [
    readBlock({
      title: "Frameworks at hand",
      body: "Consequentialist (outcomes) · Deontological (duty) · Virtue (character) · Care (relationships). Pick at least one to anchor your reasoning.",
      sourceLabel: "Ethics primer",
    }),
    writeBlock({
      prompt: "Your 100–150 word position statement.",
      minWords: 100, maxWords: 150,
      onChange: (val) => { state.rationale = val; state.decisions.position = val; },
    }),
    speakBlock({
      prompt: "Read your strongest sentence aloud.",
      maxSeconds: 25,
      onCapture: (blob, dur) => { state.decisions.positionAudio = { dur }; },
    }),
  ]);
}

function tribunalFinalJudgment(container, state, engine) {
  const gut = state.decisions.dilemmaGutReaction || "";
  multimodalStage(container, [
    readBlock({
      title: "Compare yourself, then and now",
      body: gut ? `Your gut reaction was: "${gut}"` : "(No gut reaction recorded.)",
      sourceLabel: "Self-comparison",
    }),
    writeBlock({
      prompt: "Final 100–150 word judgment. Acknowledge what you've revised.",
      minWords: 100, maxWords: 150,
      onChange: (val) => { state.rationale = val; state.decisions.finalJudgment = val; },
    }),
    speakBlock({
      prompt: "Speak it aloud as if to the tribunal.",
      maxSeconds: 90,
      onCapture: (blob, dur) => { state.decisions.finalJudgmentAudio = { dur }; },
    }),
  ]);
}

/* ──────────────────────────────────────────────────────────────────
 * Registration helper
 * ──────────────────────────────────────────────────────────────── */

export function registerAllPhaseHandlers(engine) {
  const m = engine.missionNumber;
  // Every mission gets a multimodal briefing
  engine.registerPhaseHandler("briefing", genericBriefing);

  if (m === 1) {
    engine.registerPhaseHandler("vocabulary", reconVocabulary);
    engine.registerPhaseHandler("stakeholderMap", reconStakeholderMap);
    engine.registerPhaseHandler("sourceSelect", reconSourceSelect);
  } else if (m === 2) {
    engine.registerPhaseHandler("audienceAssign", decodeAudienceAssign);
    engine.registerPhaseHandler("explain", decodeExplain);
    engine.registerPhaseHandler("registerCheck", decodeRegisterCheck);
  } else if (m === 3) {
    engine.registerPhaseHandler("crisisEvent", deployCrisisEvent);
    engine.registerPhaseHandler("strategySelect", deployStrategySelect);
    engine.registerPhaseHandler("draftResponse", deployDraftResponse);
  } else if (m === 4) {
    engine.registerPhaseHandler("consequencesReveal", dissectConsequencesReveal);
    engine.registerPhaseHandler("compare", dissectCompare);
    engine.registerPhaseHandler("leveragePoint", dissectLeveragePoint);
    engine.registerPhaseHandler("counterargument", dissectCounterargument);
  } else if (m === 5) {
    engine.registerPhaseHandler("dilemmaPresent", tribunalDilemmaPresent);
    engine.registerPhaseHandler("positionDraft", tribunalPositionDraft);
    engine.registerPhaseHandler("crossExamine", tribunalCrossExamine);
    engine.registerPhaseHandler("finalJudgment", tribunalFinalJudgment);
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
