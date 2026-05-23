# Firebase Security Rules — Draft v1

**FUTUREPROOF: SDG Mission Lab**

This document captures the Realtime Database and Storage security rules in their current draft state. Rules are written defensively: **deny by default**, then open narrow paths.

> **Status:** Draft. Rules below should be deployed to a Firebase emulator first and exercised against the test scenarios in §5 before production deployment.

---

## 1. Custom Claims & Roles

We use Firebase Auth custom claims to distinguish roles. Set via Cloud Function during onboarding.

| Claim | Set when | Used by |
|---|---|---|
| `role: "student"` | Default on sign-up | Mission engine, decision writes |
| `role: "teacher"` | Promoted by admin | Dashboard, peer-judge override |
| `role: "admin"` | Manually provisioned | Admin Command Platform |
| `classes: ["$classId", ...]` | On enrollment | Cross-class isolation |
| `consentVersion: "2026-05-12"` | On consent | Gates writes that require fresh consent |

---

## 2. Realtime Database Rules

```jsonc
{
  "rules": {
    ".read": false,
    ".write": false,

    // ─── USERS ────────────────────────────────────────────────────
    "users": {
      "$uid": {
        // Self can read everything; teachers can read public + learnerProfile of their classes
        ".read": "auth != null && (
          auth.uid === $uid
          || (auth.token.role === 'teacher' && root.child('users/' + $uid + '/profile/public/classId').val() in auth.token.classes)
          || auth.token.role === 'admin'
        )",

        "profile": {
          "public": {
            ".write": "auth != null && auth.uid === $uid",
            ".validate": "newData.hasChildren(['displayName', 'rank'])"
          },
          "private": {
            // Self can write; field-level encryption enforced client-side via Cloud Function
            ".write": "auth != null && auth.uid === $uid && auth.token.consentVersion != null"
          }
        },

        "learnerProfile": {
          // Self read, teacher read (own classes), admin read. Write only via Cloud Function.
          ".write": "auth != null && auth.token.role === 'admin'"
        },

        "roleAssignments": {
          ".write": "auth != null && auth.uid === $uid"
        }
      }
    },

    // ─── TEAMS ────────────────────────────────────────────────────
    "teams": {
      "$tid": {
        ".read": "auth != null && (
          data.child('members').hasChild(auth.uid)
          || (auth.token.role === 'teacher' && data.child('classId').val() in auth.token.classes)
          || auth.token.role === 'admin'
        )",

        ".write": "auth != null && (
          (data.child('members').hasChild(auth.uid) && !newData.child('classId').exists() === false)
          || (auth.token.role === 'teacher' && data.child('classId').val() in auth.token.classes)
          || auth.token.role === 'admin'
        )",

        "tokens": {
          // Tokens cannot be written by student clients — only by Cloud Function award/spend
          ".write": "auth != null && auth.token.role === 'admin'"
        },

        "completedMissions": {
          ".write": "auth != null && auth.token.role === 'admin'"
        },

        "$other": {
          ".validate": true
        }
      }
    },

    // ─── CLASSES ──────────────────────────────────────────────────
    "classes": {
      "$classId": {
        ".read": "auth != null && (
          $classId in auth.token.classes
          || auth.uid === data.child('teacherUid').val()
          || auth.token.role === 'admin'
        )",
        ".write": "auth != null && (
          auth.uid === data.child('teacherUid').val()
          || auth.token.role === 'admin'
        )"
      }
    },

    // ─── SCENARIOS ────────────────────────────────────────────────
    "scenarios": {
      // Scenarios are immutable once frozen; reading is permissive within authenticated audience
      ".read": "auth != null",
      "$scenarioId": {
        ".write": "auth != null && auth.token.role === 'admin' && (
          !data.exists() || (data.child('frozen').val() === false)
        )"
      }
    },

    // ─── MISSIONS ─────────────────────────────────────────────────
    "missions": {
      "$missionId": {
        ".read": "auth != null && (
          root.child('teams/' + data.child('tid').val() + '/members').hasChild(auth.uid)
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
        )",
        ".write": "auth != null && (
          root.child('teams/' + newData.child('tid').val() + '/members').hasChild(auth.uid)
          || auth.token.role === 'admin'
        )"
      }
    },

    // ─── DECISIONS (append-only) ──────────────────────────────────
    "decisions": {
      "$missionId": {
        ".read": "auth != null && (
          root.child('teams').orderByChild('members').equalTo(auth.uid).limitToFirst(1).val() != null
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
        )",
        "$decisionId": {
          // Append-only: existing entries are immutable
          ".write": "auth != null && !data.exists() && newData.child('byUid').val() === auth.uid"
        }
      }
    },

    // ─── ARTIFACTS (Pitch Capsule) ───────────────────────────────
    "artifacts": {
      "$tid": {
        ".read": "auth != null && (
          root.child('teams/' + $tid + '/members').hasChild(auth.uid)
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
          || (data.child('submittedToHallAt').exists() && data.child('consentToFeature').val() === true)
        )",
        ".write": "auth != null && root.child('teams/' + $tid + '/members').hasChild(auth.uid)"
      }
    },

    // ─── RUBRIC SCORES (write-once per evaluator) ────────────────
    "rubricScores": {
      "$tid": {
        ".read": "auth != null && (
          root.child('teams/' + $tid + '/members').hasChild(auth.uid)
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
        )",
        "$rubric": {
          "$evaluatorUid": {
            ".write": "auth != null && auth.uid === $evaluatorUid && !data.exists()"
          }
        }
      }
    },

    // ─── REFLECTIONS ──────────────────────────────────────────────
    "reflections": {
      "$uid": {
        ".read": "auth != null && (
          auth.uid === $uid
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
        )",
        ".write": "auth != null && auth.uid === $uid"
      }
    },

    // ─── TOKENS (Cloud Function only) ────────────────────────────
    "tokens": {
      "$tid": {
        ".read": "auth != null && (
          root.child('teams/' + $tid + '/members').hasChild(auth.uid)
          || auth.token.role === 'teacher'
          || auth.token.role === 'admin'
        )",
        ".write": "auth != null && auth.token.role === 'admin'"
      }
    },

    // ─── CONSENTS ─────────────────────────────────────────────────
    "consents": {
      "$uid": {
        ".read": "auth != null && (auth.uid === $uid || auth.token.role === 'admin')",
        "$version": {
          ".write": "auth != null && auth.uid === $uid && !data.exists()",
          ".validate": "newData.hasChildren(['ts', 'version', 'lang', 'flags'])"
        }
      }
    },

    // ─── AUDIT LOGS ──────────────────────────────────────────────
    "auditLogs": {
      ".read": "auth != null && auth.token.role === 'admin'",
      ".write": "auth != null && auth.token.role === 'admin'"
    },

    // ─── HALL OF EXCELLENCE ──────────────────────────────────────
    "hallOfExcellence": {
      ".read": true,                 // Public gallery
      "$entryId": {
        ".write": "auth != null && auth.token.role === 'admin'"
      }
    },

    // ─── ADMIN CONFIG ─────────────────────────────────────────────
    "adminConfig": {
      ".read": "auth != null && auth.token.role === 'admin'",
      ".write": "auth != null && auth.token.role === 'admin'"
    }
  }
}
```

---

## 3. Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    match /avatars/{file=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                      && resource == null  // create-only via this path
                      && request.resource.size < 4 * 1024 * 1024
                      && request.resource.contentType.matches('image/.*');
    }

    match /voices/{tid}/{file=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                      && firestore.exists(/databases/(default)/documents/teams/$(tid))
                      && request.auth.uid in firestore.get(/databases/(default)/documents/teams/$(tid)).data.memberUids;
    }

    match /reflections/{uid}/{file=**} {
      allow read: if request.auth != null && (request.auth.uid == uid || request.auth.token.role == 'teacher' || request.auth.token.role == 'admin');
      allow write: if request.auth != null && request.auth.uid == uid
                      && request.resource.size < 8 * 1024 * 1024
                      && request.resource.contentType.matches('audio/.*');
    }

    match /exports/{tid}/{file=**} {
      // Generated by Cloud Function only
      allow read: if request.auth != null;
      allow write: if false;
    }

    match /thumbs/{file=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 4. Cloud Functions Surface

The rules above defer privileged writes to Cloud Functions. Required functions:

| Function | Trigger | Responsibility |
|---|---|---|
| `onUserCreate` | Auth | Initialize `/users/$uid/profile/public`, set default `role: student` claim |
| `onConsentSubmit` | Database write to `/consents/$uid/$version` | Update custom claim `consentVersion` |
| `awardTokens` | Callable | Validate decision, write to `/tokens/$tid/ledger`, recompute `balance` |
| `evaluateDecision` | Database write to `/decisions/$missionId/$decisionId` | Call Claude API, write `aiEvaluation` field |
| `generateScenario` | Callable | Call Claude API, freeze `/scenarios/$scenarioId` |
| `recomputeBalance` | Database trigger on `/tokens/$tid/ledger/$entry` | Detect tampering, sum ledger, write `balance` |
| `tombstoneUser` | Callable / scheduled | Execute deletion per §6 of schema doc |
| `submitToHall` | Callable | Validate all team members have `consentToFeature: true`, write `/hallOfExcellence/$entryId` |
| `assignRole` | Callable (admin) | Set/revoke `role` and `classes` custom claims |

---

## 5. Test Scenarios

Each scenario should pass under emulator before production deploy:

1. **Student reads own profile.** ✅ Allowed.
2. **Student reads peer's `learnerProfile`.** ❌ Denied.
3. **Student writes own decision.** ✅ Allowed (matches `byUid`).
4. **Student edits prior decision.** ❌ Denied (append-only).
5. **Student writes to `/tokens/$tid`.** ❌ Denied (admin-only path).
6. **Cloud Function (admin claim) writes to `/tokens/$tid/ledger`.** ✅ Allowed.
7. **Teacher reads own-class team.** ✅ Allowed.
8. **Teacher reads other-class team.** ❌ Denied.
9. **Teacher writes another evaluator's rubric score.** ❌ Denied.
10. **Public reader fetches Hall of Excellence entry.** ✅ Allowed.
11. **Public reader fetches non-Hall artifact.** ❌ Denied.
12. **Student submits artifact to Hall without all consents.** ❌ Denied (Cloud Function check).
13. **Student writes to `/consents/$uid/$existingVersion`.** ❌ Denied (write-once per version).
14. **Audit log read by non-admin.** ❌ Denied.

A test harness (Jest + `@firebase/rules-unit-testing`) will be set up on Day 3 alongside the sign-up flow.

---

## 6. Open Questions

- [ ] Should `/scenarios` be readable by **any** authenticated user, or restricted to users in the class that owns the scenario? Current rule is permissive (auth required only). Discuss with Dr. Payungsak Kaenchan before Day 6.
- [ ] Should peer judges (Day 14) get a temporary cross-team read claim, or use a server-mediated handoff? Recommend the latter for auditability.
- [ ] Do we need a `parental_consent_required` flag for under-20 cohorts under PDPA?

---

**End of Security Rules Draft v1**
