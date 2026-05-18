/**
 * FUTUREPROOF — Auth Flow Controller
 *
 * Wraps firebase-init.js with page-level logic for sign-up, sign-in,
 * and the post-sign-up flow (sign-up → consent → assessment → avatar → mission select).
 *
 * Designed to fail gracefully when Firebase is not yet provisioned,
 * so the pages render without crashing during early development.
 */

const FLOW_STEPS = ['signup', 'consent', 'assessment', 'avatar', 'mission-select'];

const STORAGE_KEY = 'fp_flow_state_v1';

let firebaseModule = null;
let configError = null;

async function ensureFirebase() {
  if (firebaseModule) return firebaseModule;
  if (configError) throw configError;
  try {
    firebaseModule = await import('./firebase-init.js');
    return firebaseModule;
  } catch (err) {
    configError = err;
    throw err;
  }
}

export function isFirebaseAvailable() {
  return Boolean(window.FUTUREPROOF_CONFIG);
}

export function getFlowState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { step: 'signup', startedAt: Date.now() };
  } catch {
    return { step: 'signup', startedAt: Date.now() };
  }
}

export function setFlowStep(step, extras = {}) {
  if (!FLOW_STEPS.includes(step)) {
    throw new Error(`Unknown flow step: ${step}`);
  }
  const current = getFlowState();
  const next = { ...current, ...extras, step, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearFlowState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function nextStepHref(currentStep) {
  const idx = FLOW_STEPS.indexOf(currentStep);
  if (idx < 0 || idx === FLOW_STEPS.length - 1) return null;
  return `${FLOW_STEPS[idx + 1]}.html`;
}

export async function signUpWithProfile({ email, password, displayName, institution, yearOfStudy, demographics }) {
  const fb = await ensureFirebase();
  const user = await fb.signUp(email, password);

  await fb.writePath(fb.paths.userPublic(user.uid), {
    displayName,
    rank: 'cadet',
    joinedAt: Date.now(),
    institution,
  });

  // Demographic / identifying data is PDPA-sensitive — it lives in the
  // PRIVATE profile (rules scope it to the learner + admins only), never
  // in the public node teammates can read.
  const demo = demographics && typeof demographics === 'object' ? demographics : {};
  await fb.writePath(fb.paths.userPrivate(user.uid), {
    email,
    yearOfStudy,
    firstNameEn: demo.firstNameEn || null,
    lastNameEn: demo.lastNameEn || null,
    firstNameTh: demo.firstNameTh || null,
    lastNameTh: demo.lastNameTh || null,
    age: typeof demo.age === 'number' ? demo.age : null,
    gender: demo.gender || null,
    province: demo.province || null,
    location: demo.location || null,
    consentVersion: null,
    lastActiveAt: Date.now(),
  });

  setFlowStep('consent', { uid: user.uid, displayName, institution });
  return user;
}

export async function signInExisting(email, password) {
  const fb = await ensureFirebase();
  const user = await fb.signIn(email, password);
  return user;
}

export async function signOutCurrent() {
  const fb = await ensureFirebase();
  await fb.signOutUser();
  clearFlowState();
}

export async function watchAuthState(callback) {
  const fb = await ensureFirebase();
  return fb.watchAuth(callback);
}

export async function fetchUserProfile(uid) {
  const fb = await ensureFirebase();
  const pub = await fb.readPath(fb.paths.userPublic(uid));
  const priv = await fb.readPath(fb.paths.userPrivate(uid));
  return { public: pub, private: priv };
}

/**
 * Lightweight, framework-free email validation.
 * Intentionally permissive — we let Firebase Auth do the canonical validation.
 */
export function looksLikeEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function passwordIssues(value) {
  const issues = [];
  if (!value || value.length < 8) issues.push('at least 8 characters');
  if (!/[A-Za-z]/.test(value)) issues.push('one letter');
  if (!/[0-9]/.test(value)) issues.push('one number');
  return issues;
}
