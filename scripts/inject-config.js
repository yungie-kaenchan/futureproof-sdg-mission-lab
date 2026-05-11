#!/usr/bin/env node
/**
 * FUTUREPROOF — Build-time config injector
 *
 * Reads FIREBASE_* env vars and writes a public-safe config.local.js that the
 * static pages can pick up. Runs as part of the Netlify build (see netlify.toml).
 *
 * Note: Firebase web-app config keys (apiKey, authDomain, etc.) are not secret
 * — they are intended to be public. The actual access controls live in the
 * security rules. So writing them into a static file is the standard pattern.
 *
 * What IS secret: ANTHROPIC_API_KEY, STABILITY_API_KEY, and the Firebase
 * service-account JSON. Those never appear in client code; only the
 * Netlify Functions read them at request time.
 */

import { writeFileSync } from "node:fs";

const REQUIRED = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_DATABASE_URL",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];

const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.warn(`[inject-config] Missing env vars: ${missing.join(", ")}`);
  console.warn("[inject-config] Writing placeholder config so the build continues; runtime sign-up will be disabled.");
}

const cfg = {
  apiKey:            process.env.FIREBASE_API_KEY            || "MISSING_API_KEY",
  authDomain:        process.env.FIREBASE_AUTH_DOMAIN        || "MISSING.firebaseapp.com",
  databaseURL:       process.env.FIREBASE_DATABASE_URL       || "https://missing.firebasedatabase.app",
  projectId:         process.env.FIREBASE_PROJECT_ID         || "missing",
  storageBucket:     process.env.FIREBASE_STORAGE_BUCKET     || "missing.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "0",
  appId:             process.env.FIREBASE_APP_ID             || "0:0:web:0",
};

const body = `/* Auto-generated at build time. Do not edit. */\nwindow.FUTUREPROOF_CONFIG = ${JSON.stringify(cfg, null, 2)};\n`;

writeFileSync("config.local.js", body, "utf8");
console.log("[inject-config] Wrote config.local.js for project:", cfg.projectId);
