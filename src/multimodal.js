/**
 * FUTUREPROOF — Multimodal Language Channels
 *
 * Helpers that let any mission phase mix the four channels:
 *   READ  — short text rendering with optional line numbers
 *   LISTEN — auto-rendered audio clips (Claude TTS via proxy, with browser
 *            SpeechSynthesis fallback)
 *   SPEAK — short voice capture (uses MediaRecorder, 30–60 s typical)
 *   WRITE — text input with word counter
 *
 * Each helper returns a DOM node. Compose them inside any phase handler.
 *
 * The audio playback hits /.netlify/functions/tts-proxy when available.
 * On localhost / no-proxy builds, it falls back to window.speechSynthesis
 * so the demo still works.
 */

const TTS_PROXY = "/.netlify/functions/tts-proxy";

/* ──────────────────────────────────────────────────────────────────
 * READ — short text card with explicit reading affordance
 * ──────────────────────────────────────────────────────────────── */

export function readBlock({ title, body, sourceLabel = "" }) {
  const wrap = document.createElement("section");
  wrap.className = "channel-block channel-read";
  wrap.innerHTML = `
    <div class="channel-tag"><span class="material-symbols-rounded size-20">menu_book</span><span>READ</span></div>
    ${title ? `<h3 class="title-l mb-2">${escapeHtml(title)}</h3>` : ""}
    <div class="channel-body body-l">${escapeHtml(body)}</div>
    ${sourceLabel ? `<div class="channel-source">— ${escapeHtml(sourceLabel)}</div>` : ""}
  `;
  return wrap;
}

/* ──────────────────────────────────────────────────────────────────
 * LISTEN — audio clip with transcript reveal + speed control
 * ──────────────────────────────────────────────────────────────── */

export function listenBlock({ title, transcript, speakerLabel = "", voice = "neutral", lang = "en-US" }) {
  const wrap = document.createElement("section");
  wrap.className = "channel-block channel-listen";
  wrap.innerHTML = `
    <div class="channel-tag"><span class="material-symbols-rounded size-20">headphones</span><span>LISTEN</span></div>
    ${title ? `<h3 class="title-l mb-2">${escapeHtml(title)}</h3>` : ""}
    ${speakerLabel ? `<div class="channel-source mb-2">— ${escapeHtml(speakerLabel)}</div>` : ""}
    <div class="audio-player">
      <button class="m3-fab small primary play-btn" type="button" aria-label="Play audio"><span class="material-symbols-rounded size-20">play_arrow</span></button>
      <div class="audio-meta">
        <div class="audio-title body-m">Tap play to listen</div>
        <div class="audio-progress"><div class="audio-progress-fill"></div></div>
      </div>
      <div class="audio-controls">
        <button type="button" class="btn-text speed-btn" data-speed="1">1×</button>
      </div>
    </div>
    <details class="channel-transcript">
      <summary class="label-m">Show transcript</summary>
      <div class="body-m mt-2">${escapeHtml(transcript)}</div>
    </details>
  `;

  const playBtn = wrap.querySelector(".play-btn");
  const fill = wrap.querySelector(".audio-progress-fill");
  const speedBtn = wrap.querySelector(".speed-btn");
  const audioTitle = wrap.querySelector(".audio-title");

  let utterance = null;
  let isPlaying = false;
  let speedIdx = 0;
  const SPEEDS = [1, 1.25, 0.85];

  speedBtn.addEventListener("click", () => {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    speedBtn.textContent = SPEEDS[speedIdx] + "×";
    if (utterance) utterance.rate = SPEEDS[speedIdx];
  });

  playBtn.addEventListener("click", async () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      isPlaying = false;
      playBtn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
      return;
    }
    isPlaying = true;
    playBtn.querySelector(".material-symbols-rounded").textContent = "stop";
    audioTitle.textContent = `Speaking — ${speakerLabel || "stakeholder"}`;
    fill.style.width = "0%";

    // Try server-side TTS first; fall back to browser SpeechSynthesis
    try {
      const response = await fetch(TTS_PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript, voice, lang }),
      });
      if (response.ok) {
        const data = await response.json();
        const audio = new Audio(data.audioUrl || `data:audio/mp3;base64,${data.audioBase64}`);
        audio.playbackRate = SPEEDS[speedIdx];
        audio.addEventListener("timeupdate", () => {
          if (audio.duration) fill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        });
        audio.addEventListener("ended", () => {
          isPlaying = false;
          playBtn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
          fill.style.width = "100%";
          audioTitle.textContent = "Played.";
        });
        audio.play();
        return;
      }
    } catch (_) {/* fall through to SpeechSynthesis */}

    // Fallback: browser SpeechSynthesis
    if (!("speechSynthesis" in window)) {
      audioTitle.textContent = "Audio not supported in this browser.";
      isPlaying = false;
      return;
    }
    utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = lang;
    utterance.rate = SPEEDS[speedIdx];
    utterance.onend = () => {
      isPlaying = false;
      playBtn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
      fill.style.width = "100%";
      audioTitle.textContent = "Played.";
    };
    // Animate progress (rough — speechSynthesis has no progress events)
    const start = Date.now();
    const estimated = Math.max(2, transcript.length * 0.06 / SPEEDS[speedIdx]);
    const tick = setInterval(() => {
      if (!isPlaying) { clearInterval(tick); return; }
      const pct = Math.min(100, ((Date.now() - start) / 1000 / estimated) * 100);
      fill.style.width = pct + "%";
      if (pct >= 100) clearInterval(tick);
    }, 100);
    window.speechSynthesis.speak(utterance);
  });

  return wrap;
}

/* ──────────────────────────────────────────────────────────────────
 * SPEAK — voice capture, 30–60 seconds, with playback + retake
 * ──────────────────────────────────────────────────────────────── */

export function speakBlock({ prompt, maxSeconds = 45, onCapture = () => {} }) {
  const wrap = document.createElement("section");
  wrap.className = "channel-block channel-speak";
  wrap.innerHTML = `
    <div class="channel-tag"><span class="material-symbols-rounded size-20">mic</span><span>SPEAK</span></div>
    <div class="title-l mb-1">${escapeHtml(prompt)}</div>
    <p class="body-s text-on-surface-variant mb-3">Up to ${maxSeconds} s. Recording stops automatically.</p>
    <div class="speak-rack">
      <button type="button" class="m3-fab primary rec-toggle" aria-label="Record">
        <span class="material-symbols-rounded">fiber_manual_record</span>
      </button>
      <div class="speak-meta">
        <div class="speak-clock label-l">00 s</div>
        <div class="speak-status body-s text-on-surface-variant">Tap to record</div>
      </div>
      <audio class="speak-playback" controls hidden></audio>
    </div>
  `;

  const recBtn = wrap.querySelector(".rec-toggle");
  const clock = wrap.querySelector(".speak-clock");
  const status = wrap.querySelector(".speak-status");
  const playback = wrap.querySelector(".speak-playback");

  let recorder = null;
  let stream = null;
  let chunks = [];
  let started = 0;
  let interval = null;
  let lastBlob = null;

  recBtn.addEventListener("click", async () => {
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      started = Date.now();
      recorder.addEventListener("dataavailable", (e) => { if (e.data.size) chunks.push(e.data); });
      recorder.addEventListener("stop", () => {
        clearInterval(interval);
        for (const t of stream.getTracks()) t.stop();
        lastBlob = new Blob(chunks, { type: recorder.mimeType });
        playback.src = URL.createObjectURL(lastBlob);
        playback.hidden = false;
        const dur = Math.round((Date.now() - started) / 1000);
        clock.textContent = dur + " s";
        status.textContent = "Captured. Listen back, retake, or move on.";
        recBtn.classList.remove("recording");
        recBtn.querySelector(".material-symbols-rounded").textContent = "fiber_manual_record";
        onCapture(lastBlob, dur);
      });
      recorder.start();
      recBtn.classList.add("recording");
      recBtn.querySelector(".material-symbols-rounded").textContent = "stop";
      status.textContent = "Recording…";
      interval = setInterval(() => {
        const elapsed = Math.round((Date.now() - started) / 1000);
        clock.textContent = String(elapsed).padStart(2, "0") + " s";
        if (elapsed >= maxSeconds) recorder.stop();
      }, 250);
    } catch (err) {
      status.textContent = "Microphone permission denied.";
    }
  });

  return wrap;
}

/* ──────────────────────────────────────────────────────────────────
 * WRITE — textarea with live word-count + target hint
 * ──────────────────────────────────────────────────────────────── */

export function writeBlock({ prompt, minWords = 60, maxWords = 120, onChange = () => {} }) {
  const wrap = document.createElement("section");
  wrap.className = "channel-block channel-write";
  wrap.innerHTML = `
    <div class="channel-tag"><span class="material-symbols-rounded size-20">edit_note</span><span>WRITE</span></div>
    <div class="title-l mb-1">${escapeHtml(prompt)}</div>
    <p class="body-s text-on-surface-variant mb-3">Aim for ${minWords}–${maxWords} words.</p>
    <div class="m3-textfield">
      <textarea class="write-input" rows="6" placeholder=" "></textarea>
      <label>Your response</label>
    </div>
    <div class="write-meta">
      <span class="write-count label-m">0 words</span>
      <span class="write-status body-s text-on-surface-variant"></span>
    </div>
  `;
  const ta = wrap.querySelector(".write-input");
  const count = wrap.querySelector(".write-count");
  const status = wrap.querySelector(".write-status");
  const update = () => {
    const n = ta.value.trim().split(/\s+/).filter(Boolean).length;
    count.textContent = n + " word" + (n === 1 ? "" : "s");
    if (n < minWords) status.textContent = (minWords - n) + " more to reach the target";
    else if (n > maxWords) status.textContent = "A bit over — trim if you can";
    else status.textContent = "On target.";
    onChange(ta.value, n);
  };
  ta.addEventListener("input", update);
  update();
  return wrap;
}

/* ──────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────── */

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ──────────────────────────────────────────────────────────────────
 * Convenience: render a multimodal stage with multiple channels
 * ──────────────────────────────────────────────────────────────── */

export function multimodalStage(container, blocks) {
  container.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "multimodal-stage";
  for (const b of blocks) wrap.appendChild(b);
  container.appendChild(wrap);
  return wrap;
}
