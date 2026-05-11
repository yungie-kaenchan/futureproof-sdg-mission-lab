/**
 * FUTUREPROOF: SDG Mission Lab — Firebase Initialization
 *
 * Loaded in the browser. Reads Firebase configuration from a global
 * window.FUTUREPROOF_CONFIG object that is injected by either:
 *   • a Netlify build-time substitution (production)
 *   • a local /config.local.js file (development — gitignored)
 *
 * No API keys live in this file.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  serverTimestamp,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

const REQUIRED_KEYS = [
  'apiKey',
  'authDomain',
  'databaseURL',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

function readConfig() {
  const cfg = (typeof window !== 'undefined' && window.FUTUREPROOF_CONFIG) || null;
  if (!cfg) {
    throw new Error(
      '[FUTUREPROOF] window.FUTUREPROOF_CONFIG is not set. ' +
      'In development, create config.local.js (see config.example.js). ' +
      'In production, set Netlify environment variables and ensure config-injector.js runs at build time.'
    );
  }
  const missing = REQUIRED_KEYS.filter((k) => !cfg[k]);
  if (missing.length) {
    throw new Error(`[FUTUREPROOF] Missing Firebase config keys: ${missing.join(', ')}`);
  }
  return cfg;
}

const config = readConfig();
const app = initializeApp(config);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

/* ──────────────────────────────────────────────────────────────────
 * Auth helpers
 * ──────────────────────────────────────────────────────────────── */

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // Initial public profile is created server-side by the onUserCreate Cloud Function.
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOutUser() {
  await signOut(auth);
}

/* ──────────────────────────────────────────────────────────────────
 * Database helpers — typed paths
 * ──────────────────────────────────────────────────────────────── */

export const paths = {
  userPublic: (uid) => `users/${uid}/profile/public`,
  userPrivate: (uid) => `users/${uid}/profile/private`,
  learnerProfile: (uid) => `users/${uid}/learnerProfile`,
  team: (tid) => `teams/${tid}`,
  scenario: (sid) => `scenarios/${sid}`,
  mission: (mid) => `missions/${mid}`,
  decisions: (mid) => `decisions/${mid}`,
  artifact: (tid) => `artifacts/${tid}`,
  rubricScores: (tid, rubric) => `rubricScores/${tid}/${rubric}`,
  consents: (uid) => `consents/${uid}`,
  tokens: (tid) => `tokens/${tid}`,
  reflections: (uid) => `reflections/${uid}`,
};

export async function readPath(path) {
  const snap = await get(ref(db, path));
  return snap.exists() ? snap.val() : null;
}

export async function writePath(path, value) {
  await set(ref(db, path), value);
}

export async function appendChild(path, value) {
  const newRef = push(ref(db, path));
  await set(newRef, { ...value, ts: serverTimestamp() });
  return newRef.key;
}

export function watchPath(path, callback) {
  const r = ref(db, path);
  return onValue(r, (snap) => callback(snap.exists() ? snap.val() : null));
}

/* ──────────────────────────────────────────────────────────────────
 * Storage helpers
 * ──────────────────────────────────────────────────────────────── */

export async function uploadFile(path, blob) {
  const r = storageRef(storage, path);
  await uploadBytes(r, blob);
  return getDownloadURL(r);
}

/* ──────────────────────────────────────────────────────────────────
 * Decision logging — append-only, mission engine entry point
 * ──────────────────────────────────────────────────────────────── */

export async function logDecision(missionId, decision) {
  const required = ['byUid', 'decisionType', 'chosen'];
  const missing = required.filter((k) => !(k in decision));
  if (missing.length) {
    throw new Error(`logDecision missing fields: ${missing.join(', ')}`);
  }
  return appendChild(paths.decisions(missionId), decision);
}

/* ──────────────────────────────────────────────────────────────────
 * Consent — append a new versioned record
 * ──────────────────────────────────────────────────────────────── */

export async function recordConsent(uid, version, lang, flags) {
  const path = `${paths.consents(uid)}/${version}`;
  const existing = await readPath(path);
  if (existing) {
    throw new Error(`Consent for version ${version} already recorded for ${uid}`);
  }
  await writePath(path, {
    ts: serverTimestamp(),
    version,
    lang,
    flags,
    userAgent: navigator.userAgent,
  });
}

export { auth, db, storage, app };
