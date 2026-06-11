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
  deleteObject,
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
  // Mid-mission resume snapshots — durable mirror of the engine's
  // localStorage save so a learner resumes on any device and never
  // redoes a stage after a cache clear. One child per missionId.
  progress: (uid) => `progress/${uid}`,
  // v2 journey — one Keystone per completed SDG mission (max 6)
  keystones: (uid) => `users/${uid}/keystones`,
  // v2 capstone — Voice for Change submission metadata
  voiceForChange: (uid) => `users/${uid}/voiceForChange`,
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

/**
 * Delete a stored file given its download URL (parses the object path out
 * of the URL). Succeeds only where rules grant the caller delete rights —
 * i.e., files in the caller's own folder.
 */
export async function deleteFileByUrl(url) {
  const m = /\/o\/([^?]+)/.exec(url || '');
  if (!m) throw new Error('Not a Firebase Storage URL');
  await deleteObject(storageRef(storage, decodeURIComponent(m[1])));
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

  // If the user re-submits the same flags, no-op success (idempotent).
  // If they changed any flag since last save, append a revision suffix so
  // the audit log preserves both states — never silently overwrites.
  if (existing) {
    const sameFlags =
      existing.flags &&
      Object.keys(flags).every((k) => existing.flags[k] === flags[k]) &&
      Object.keys(existing.flags).every((k) => existing.flags[k] === flags[k]);

    if (sameFlags) {
      // Already recorded exactly this state — just bump the lang if it changed and return.
      if (existing.lang !== lang) {
        await writePath(`${path}/lang`, lang);
      }
      return;
    }

    // Flags changed → write a new revision under the same version.
    let n = 2;
    while (await readPath(`${path}-r${n}`)) n++;
    await writePath(`${path}-r${n}`, {
      ts: serverTimestamp(),
      version: `${version}-r${n}`,
      lang,
      flags,
      previousFlags: existing.flags,
      userAgent: navigator.userAgent,
    });
    return;
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
