/**
 * FUTUREPROOF — Voice guide for onboarding
 *
 * A tiny embedded "hear the welcome" card on each onboarding step.
 * Plays a 5–10 s spoken introduction so anxious / lower-CEFR learners get an
 * audio version of what they just read. Uses TTS proxy when available;
 * falls back to browser SpeechSynthesis.
 */

const TTS_PROXY = "/.netlify/functions/tts-proxy";

const SCRIPTS = {
  signup: {
    title: "Hear it instead of reading",
    sub: "30 seconds — the gist of this step in your ear",
    text: "Welcome to FUTUREPROOF. This first step is just basic info — your name, email, and where you study. Nothing scary. Whatever you pick now, you can change later. After this, we'll walk you through what we collect and what we don't.",
  },
  signin: {
    title: "Audio quick-start",
    sub: "20 seconds — sign in with your voice as company",
    text: "Welcome back. Sign in with the email and password you used when you joined. We'll drop you back where you left off — no need to start from the top.",
  },
  consent: {
    title: "Hear what consent means here",
    sub: "45 seconds — plain-language audio version",
    text: "This is the page where you tell us what we can and can't do with your data. Two boxes are required if you want to use the platform — basic profile, and your mission decisions. The other three are completely up to you. Photos for your avatar, voice recordings, and we no longer ask for research-use consent because this platform doesn't collect data for research. Take your time.",
  },
  assessment: {
    title: "Hear the readiness check",
    sub: "30 seconds — what to expect",
    text: "This isn't a test. It's a calibration. We ask about language, critical thinking, analytical thinking, and how you collaborate. Honest answers give you a better fit for the missions ahead. Twelve to fifteen minutes total. No pass, no fail.",
  },
  avatar: {
    title: "Hear the avatar step",
    sub: "20 seconds — what we do with the photo",
    text: "Upload a photo or use your webcam. We turn it into a stylized operator portrait. The original is deleted within a day. If you'd rather not, skip this step — we'll give you a placeholder.",
  },
  "mission-select": {
    title: "Hear about SDG selection",
    sub: "30 seconds — what comes next",
    text: "Pick the goal that pulls you in. Each of the seventeen sustainable development goals has three scenarios written for the Thai context. You'll lock one in — but we generate fresh ones every term, so the choice is yours and yours alone.",
  },
};

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

async function speakViaTTS(text) {
  try {
    const r = await fetch(TTS_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: "warm" }),
    });
    if (!r.ok) throw new Error("proxy unavailable");
    const data = await r.json();
    const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
    audio.play();
    return true;
  } catch {
    return false;
  }
}

export function mountVoiceGuide(stepKey, hostSelector) {
  const cfg = SCRIPTS[stepKey];
  if (!cfg) return;
  const host = document.querySelector(hostSelector);
  if (!host) return;

  const card = document.createElement("div");
  card.className = "voice-guide";
  card.innerHTML = `
    <button type="button" aria-label="Play voice guide">
      <span class="material-symbols-rounded size-20">play_arrow</span>
    </button>
    <div class="vg-text">
      <div class="vg-title">${cfg.title}</div>
      <div class="vg-sub">${cfg.sub}</div>
    </div>
  `;
  const btn = card.querySelector("button");
  let playing = false;

  btn.addEventListener("click", async () => {
    if (playing) {
      window.speechSynthesis?.cancel();
      btn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
      playing = false;
      return;
    }
    playing = true;
    btn.querySelector(".material-symbols-rounded").textContent = "stop";

    const proxyOk = await speakViaTTS(cfg.text);
    if (!proxyOk) {
      speak(cfg.text);
      // Reset button when speech ends
      const reset = setInterval(() => {
        if (!window.speechSynthesis?.speaking) {
          btn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
          playing = false;
          clearInterval(reset);
        }
      }, 200);
    } else {
      // For audio element route, listener would need wiring; reset after estimated duration
      setTimeout(() => {
        btn.querySelector(".material-symbols-rounded").textContent = "play_arrow";
        playing = false;
      }, Math.max(8000, cfg.text.length * 60));
    }
  });

  host.prepend(card);
}
