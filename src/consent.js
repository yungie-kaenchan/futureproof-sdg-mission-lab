/**
 * FUTUREPROOF — Consent Submission
 *
 * Records a versioned PDPA consent record under /consents/$uid/$version
 * and updates the user's private profile with the active consent version.
 *
 * Per the security rules, /consents/$uid/$version is write-once. Updating
 * consent (changing flags, withdrawing, etc.) creates a new version record
 * — never modifies an existing one.
 */

const CURRENT_CONSENT_VERSION = '2026-05-12';

export const CONSENT_FLAGS = [
  {
    key: 'basicProfile',
    required: true,
    label: { en: 'Basic profile', th: 'ข้อมูลโปรไฟล์พื้นฐาน' },
    plain: {
      en: 'Your name, email, and institution. Needed to sign you in and let teachers grade your work.',
      th: 'ชื่อ อีเมล และสถาบันของคุณ จำเป็นเพื่อให้คุณเข้าใช้งานและให้อาจารย์ตรวจประเมินผลงานได้',
    },
  },
  {
    key: 'photo',
    required: false,
    label: { en: 'Photo for avatar', th: 'รูปภาพสำหรับสร้างอวตาร' },
    plain: {
      en: 'A photo you upload, used only to generate your stylized avatar. Original photo deleted within 24 hours after generation.',
      th: 'ภาพถ่ายที่คุณอัปโหลดเพื่อใช้สร้างอวตารแบบสไตล์เท่านั้น รูปต้นฉบับจะถูกลบภายใน 24 ชั่วโมงหลังสร้างเสร็จ',
    },
  },
  {
    key: 'voice',
    required: false,
    label: { en: 'Voice recordings', th: 'การบันทึกเสียง' },
    plain: {
      en: 'Audio you record for reflections and the Pitch Capsule narration. Stored only until 90 days after the course ends.',
      th: 'เสียงที่คุณบันทึกสำหรับการสะท้อนคิดและเสียงประกอบของแคปซูลสรุป จะถูกเก็บไว้เพียง 90 วันหลังจบหลักสูตร',
    },
  },
  {
    key: 'decisionLog',
    required: true,
    label: { en: 'Mission decisions and feedback', th: 'การตัดสินใจในภารกิจและฟีดแบ็ก' },
    plain: {
      en: 'The choices you make during missions and the AI feedback you receive. Needed for grading and to give you a portfolio of your work.',
      th: 'การตัดสินใจในแต่ละภารกิจและฟีดแบ็กจาก AI ที่คุณได้รับ จำเป็นต่อการให้คะแนนและการสร้างพอร์ตโฟลิโอของคุณ',
    },
  },
];

export function getCurrentVersion() {
  return CURRENT_CONSENT_VERSION;
}

export function defaultFlags() {
  const out = {};
  for (const f of CONSENT_FLAGS) out[f.key] = f.required;
  return out;
}

export function validateFlags(flags) {
  const missing = CONSENT_FLAGS.filter((f) => f.required && !flags[f.key]).map((f) => f.key);
  return { ok: missing.length === 0, missingRequired: missing };
}

export async function submitConsent({ uid, lang, flags }) {
  const validation = validateFlags(flags);
  if (!validation.ok) {
    throw new Error(`Required consents missing: ${validation.missingRequired.join(', ')}`);
  }
  const fb = await import('./firebase-init.js');
  await fb.recordConsent(uid, CURRENT_CONSENT_VERSION, lang, flags);
  await fb.writePath(`${fb.paths.userPrivate(uid)}/consentVersion`, CURRENT_CONSENT_VERSION);
}
