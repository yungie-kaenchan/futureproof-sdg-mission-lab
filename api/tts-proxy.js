/**
 * FUTUREPROOF — TTS Proxy (Netlify Function)
 *
 * Renders short text into MP3 audio so the LISTEN blocks in mission stages
 * sound like real speakers (rather than robotic browser SpeechSynthesis).
 *
 * Provider options (pick one and set the matching env var):
 *   • ElevenLabs        — ELEVENLABS_API_KEY  (best voice quality, ~$0.18 / 1k chars)
 *   • Google Cloud TTS  — GOOGLE_TTS_API_KEY  (free tier 1M chars/mo)
 *   • Azure Speech      — AZURE_SPEECH_KEY + AZURE_SPEECH_REGION
 *
 * Default below uses Google Cloud TTS (free tier-friendly). Swap if needed.
 *
 * Voice mapping per FUTUREPROOF role:
 *   neutral  → en-US-Neural2-A  (calm, mid-range)
 *   alert    → en-US-Neural2-D  (urgency)
 *   formal   → en-US-Neural2-J  (institutional)
 *   warm     → en-US-Neural2-F  (community)
 *   thai     → th-TH-Neural2-C
 */

const VOICE_MAP = {
  neutral: { name: "en-US-Neural2-A", lang: "en-US" },
  alert:   { name: "en-US-Neural2-D", lang: "en-US" },
  formal:  { name: "en-US-Neural2-J", lang: "en-US" },
  warm:    { name: "en-US-Neural2-F", lang: "en-US" },
  thai:    { name: "th-TH-Neural2-C", lang: "th-TH" },
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json", ...cors }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, {
      error: "TTS provider not configured. Set GOOGLE_TTS_API_KEY (or swap to ElevenLabs/Azure). Browser SpeechSynthesis fallback is in use.",
    });
  }

  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return jsonResponse(400, { error: "Invalid JSON" }); }

  const { text, voice = "neutral", lang } = payload;
  if (!text || typeof text !== "string") return jsonResponse(400, { error: "text is required" });
  if (text.length > 4000) return jsonResponse(413, { error: "text too long (4000 char max)" });

  const voiceCfg = VOICE_MAP[voice] || VOICE_MAP.neutral;
  if (lang) voiceCfg.lang = lang;

  let response;
  try {
    response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: voiceCfg.lang, name: voiceCfg.name },
          audioConfig: { audioEncoding: "MP3", speakingRate: 1.0 },
        }),
      }
    );
  } catch (err) {
    return jsonResponse(502, { error: `Could not reach TTS provider: ${err.message}` });
  }

  const data = await response.json();
  if (!response.ok) {
    return jsonResponse(response.status, { error: `TTS provider responded ${response.status}`, detail: data });
  }

  return jsonResponse(200, {
    audioBase64: data.audioContent,
    voice: voiceCfg.name,
    lang: voiceCfg.lang,
    chars: text.length,
  });
}
