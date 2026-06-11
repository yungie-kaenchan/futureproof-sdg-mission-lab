/**
 * FUTUREPROOF — Firebase Config (EXAMPLE)
 *
 * Copy this file to config.local.js and fill in real values for local dev.
 * config.local.js is gitignored.
 *
 * In production, Netlify environment variables drive a build-time generation
 * of this file. See netlify.toml + scripts/inject-config.js (Day 3).
 */

window.FUTUREPROOF_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "0000000000",
  appId: "1:0000000000:web:abcdef",

  // Optional — ElevenLabs Agents voice widget for Mr. Compass.
  // Create a PUBLIC agent at elevenlabs.io → Agents, allowlist the portal
  // domain, and paste the agent id here. Empty string = voice disabled
  // (text Compass unaffected).
  elevenLabsAgentId: "",
};
