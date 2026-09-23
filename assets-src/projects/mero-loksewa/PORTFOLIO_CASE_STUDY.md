# Mero Loksewa — Case Study

> An offline-first, bilingual (Nepali/English) mobile app for Nepal's public-service (Loksewa) exam preparation, covering 10+ exam tracks. Built end-to-end by one developer: React Native app, Express/MongoDB API, content pipeline, and Play Store release.

**Role:** Solo full-stack developer (product, mobile, backend, DevOps, content pipeline)
**Platform:** Android (Google Play). The Expo codebase can also target iOS.
**Timeline:** March 2026 to present (v1.4.0, ~190 commits)
**Links:** [Play Store — FILL IN] · [GitHub — FILL IN or "private"] · [Demo video — FILL IN]

---

## 1. At a Glance

|                    |                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Exam tracks**    | Nasu, Kharidar, Adhikrit, Pharmacy, Teacher (MAVI/NIMAVI), NRB Banking, Civil Engineering, Government Organisations, plus general subjects: GK, Constitution (Sambidhan), Nepal Parichaya, Periodic Plans (Yojana), Monetary Policy, Computer, IQ, Current Affairs |
| **App surface**    | ~120 screens, 20+ reusable learning components                                                                                                                                                                                                                     |
| **Backend**        | 49 REST route modules, 56 Mongoose models, 4 scheduled jobs                                                                                                                                                                                                        |
| **Languages**      | Content authored once, served in both Nepali and English                                                                                                                                                                                                           |
| **Offline**        | Study content works with no network after the first load                                                                                                                                                                                                           |
| **Users / rating** | FILL IN (downloads, DAU, Play Store rating, reviews)                                                                                                                                                                                                               |

---

## 2. The Problem

Every year, hundreds of thousands of candidates in Nepal sit the Loksewa Aayog (Public Service Commission) exams. Preparation today is fragmented and poorly suited to how candidates actually live:

- **Material is scattered** across printed guidebooks, PDFs on Facebook groups, YouTube, and coaching centres. Each exam track (Nasu, Kharidar, Adhikrit, and so on) has its own syllabus, and no single place maps content to it.
- **Connectivity is unreliable.** Many candidates live outside the Kathmandu valley on patchy mobile data. Apps that need a live connection to show a question feel broken.
- **Language is a barrier both ways.** Exams are mostly in Nepali, but many learners (and some papers, such as banking and computer) work better in English. Existing resources pick one language.
- **Self-study is lonely and hard to sustain.** Preparation runs for months. Without feedback, streaks, or a community, candidates drop off.
- **Devices are low-end.** Budget Android phones with limited storage are the norm, so a bloated app gets uninstalled.

**Goal:** One app that covers every major exam track, works offline on cheap phones, speaks both languages, and keeps learners coming back every day.

---

## 3. Target Users

- **Primary:** Loksewa candidates aged 18–35 preparing for a specific track (for example a Nasu or Kharidar aspirant in a district town).
- **Secondary:** Candidates preparing for related exams (NRB banking, teacher licensing, pharmacy, engineering).
- **Constraints:** Budget Android devices, intermittent 3G/4G, Nepali-first reading, study in short sessions.

---

## 4. The Solution

A React Native (Expo) app backed by a Node/Express + MongoDB API. The app has three main parts:

1. **Structured learning by exam track.** Each track mirrors its official syllabus as papers → topics → study notes, MCQ practice, mock tests, and past papers. Onboarding asks which exams the user is preparing for, and the home screen shows those tracks first.
2. **Offline-first content delivery.** Study modules are published as versioned JSON to Cloudflare R2, downloaded to device storage, and re-downloaded only when a version manifest says they changed. Seed data bundled with the app means even a first launch with no network shows something useful.
3. **Engagement.** XP, daily streaks, daily and all-time leaderboards, subject-mastery badges, a Q&A community forum, referrals, shareable badge cards, a daily quiz, and scheduled push reminders.

### Key Features

- **Universal quiz engine.** One quiz component powers every MCQ set, mock test, and past paper across all tracks, with explanations and result submission.
- **Study mode and structured notes.** Rich notes with Markdown, tables, and math. Includes a syllabus viewer and a PDF course viewer.
- **Bilingual toggle.** Switch between Nepali and English anywhere in the app. The preference syncs to the user's profile.
- **Personalised homepage.** Multi-select exam-track onboarding decides which sections appear. Guest mode lets people browse before signing up.
- **Current affairs and e-papers.** Daily Gorkhapatra, Rising Nepal, and Loksewa e-papers are scraped automatically on a schedule.
- **Community forum.** Ask and answer questions, accept answers, and earn XP and badges for helping others.
- **Gamification.** XP, streaks, leaderboards, 14 subject-mastery badges, referral badges, and badge cards you can share to social media.
- **Bookmarks, a daily quiz, and push notifications** (daily reminders on Kathmandu time, plus per-user alerts such as "your question got an answer").
- **Monetisation.** Google AdMob with mediation, configured through a custom Expo config plugin.

---

## 5. Tech Stack

| Layer                  | Technology                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Mobile**             | React Native 0.81 (New Architecture), React 19, Expo SDK 54 (dev client, EAS Build), Hermes                                            |
| **Navigation**         | React Navigation v7 (native stack + bottom tabs)                                                                                       |
| **State / data**       | React Context (language, user preferences), custom hooks `useSmartFetch` and `useModuleData`                                           |
| **On-device storage**  | expo-file-system (large content modules), AsyncStorage (small cache and metadata), expo-secure-store (auth token in Keychain/Keystore) |
| **UI / media**         | Reanimated 4, react-native-pdf + blob-util, react-native-markdown-display, react-native-view-shot + react-native-share, WebView        |
| **Backend**            | Node.js, Express 5, Mongoose 9, MongoDB Atlas                                                                                          |
| **Auth**               | JWT (Bearer), bcryptjs, email OTP password reset (Nodemailer)                                                                          |
| **Storage / CDN**      | Cloudflare R2 (S3-compatible, via AWS SDK v3) for PDFs and versioned JSON content modules                                              |
| **Messaging**          | Firebase Cloud Messaging + Firebase Admin, Notifee (on-device display)                                                                 |
| **Analytics / config** | Firebase Analytics, Firebase Remote Config                                                                                             |
| **Jobs**               | node-cron (Asia/Kathmandu timezone), axios + cheerio for scraping                                                                      |
| **Translation**        | Google Translate, used automatically when content is saved                                                                             |
| **Security**           | helmet, express-rate-limit, custom NoSQL-injection/XSS sanitiser, CORS allow-list                                                      |
| **Hosting**            | Render (API), Cloudflare R2 (content), Google Play (app)                                                                               |

---

## 6. System Architecture

```
┌──────────────────────────── Android App (React Native / Expo) ────────────────────────────┐
│                                                                                           │
│  Screens (~120) ── Shared components (Quiz engine, Study mode, Notes, PDF viewer)         │
│        │                                                                                  │
│        ├── useModuleData ──► local JSON files (expo-file-system) ◄── version manifest     │
│        ├── useSmartFetch ──► AsyncStorage cache ──► bundled seed data (last resort)       │
│        ├── SecureStore (JWT)   LanguageContext (np/en)   UserPreferencesContext           │
│        └── FCM + Notifee  ·  Firebase Analytics / Remote Config  ·  AdMob                 │
└───────────────┬──────────────────────────────────────────────────────┬───────────────────┘
                │ HTTPS REST (?lang=np|en, Bearer JWT)                 │ HTTPS GET (versioned, edge-cached)
                ▼                                                      ▼
┌─────────── Express 5 API (Render) ───────────┐            ┌──── Cloudflare R2 ────┐
│ helmet · CORS allow-list · 10kb body limit   │            │ modules/manifest.json │
│ NoSQL/XSS sanitiser · rate limiters          │            │ modules/<key>_<lang>  │
│ 49 route modules → controllers/handlers      │            │ PDFs, images          │
│ JWT protect / optionalAuth / admin-key gate  │            └──────────▲────────────┘
│ localize(doc, lang) response projection      │                       │ upload changed modules
│ Cron: e-paper scrapers, notifications,       │                       │ (content-hash diff)
│       daily quiz                             │            ┌──────────┴────────────┐
└───────┬──────────────────────────┬───────────┘            │ publishModulesToR2.js │
        │ Mongoose                  │ Firebase Admin         │ (publish script)      │
        ▼                           ▼                        └──────────▲────────────┘
┌──── MongoDB Atlas ────┐   ┌──── FCM ────┐                           │ reads
│ 56 models: content    │   │ broadcast + │                           │
│ (bilingual plugin),   │───┤ per-user    │───────────────────────────┘
│ users, progress,      │   │ push        │
│ forum, scores         │   └─────────────┘
└───────────────────────┘
```

**Request flow for a study screen:** the screen asks `useModuleData` for a module. The hook reads the local file straight away if one exists. It then checks the small R2 manifest and downloads only if that module's version changed. If R2 is unreachable and nothing is cached locally, it falls back to the Express endpoint. The screen shows content at every step and never blocks on the network.

---

## 7. System Design Deep Dives

### 7.1 Offline-first data layer (two generations)

**Gen 1: `useSmartFetch` (stale-while-revalidate).** The hook shows cached data from AsyncStorage (or bundled seed data) immediately, then syncs from the API in the background and updates the cache. It also defends against three failure cases:

- If the server returns an empty response, the hook keeps the existing cache instead of overwriting it.
- If the cache is corrupt or empty, the hook falls back to seed data.
- Cache keys include the language (`key_np` / `key_en`), so switching language never shows stale content in the wrong language.

**The problem it created:** caching full content blobs in AsyncStorage made app storage balloon, which matters a lot on budget phones.

**Gen 2: `useModuleData` + R2 content pipeline.** Large study modules moved out of the API response path completely:

- A **publish script** exports each registered module from MongoDB, serialises it deterministically (sorted keys), hashes it, and uploads only the modules that changed to R2. It then rewrites a small `manifest.json` with the new versions. The script can be scoped with `--model` or `--topicId` so publishing stays fast when there are hundreds of topics.
- The **client** keeps module JSON in app-scoped file storage. AsyncStorage now holds only tiny version strings.
- **Atomic writes:** each download goes to a `.tmp` file and is renamed only on success, so if the app is killed mid-download it never leaves a half-written file that later looks like a valid cache entry.
- **Cache-busting:** a `?v=<version>` query string forces Cloudflare's edge to serve exactly the bytes the manifest promised.
- **Retention policy:** per-topic modules are evicted after 24 hours of inactivity, with a cap of 10 per subject group. A sweep at boot catches modules the user never reopens.
- **Graceful migration:** if R2 fails, the hook falls back to the legacy API route and writes that response into the store with a null version, so the next successful manifest check triggers a proper versioned download. Screens moved from Gen 1 to Gen 2 with minimal code changes because the hook returns the same data shape.

### 7.2 Write-once bilingual content

Authoring every question and note twice was not realistic for one person. A reusable **Mongoose `bilingualPlugin`** solves this:

- On save, the plugin detects the language the content was written in, pulls out only the fields that need translating, translates their string leaves, and stores the result in a `translatedContent` mirror.
- Identical strings are translated only once. Requests are throttled (2 at a time, with a 1-second gap between batches) to stay under the translation endpoint's abuse threshold.
- `enforceAnswerConsistency` makes sure the translated correct answer still matches one of the translated options, so the quiz never marks a correct answer as wrong.
- On read, `localizeDoc(doc, lang)` returns the requested language, so clients just add `?lang=en` to the URL.

### 7.3 Gamification and progress

- XP is recorded both as an all-time total and in a `DailyScore` collection, which lets daily and all-time leaderboards run as simple queries.
- Forum activity goes through the same `awardXp` path as quizzes, so there is one points system.
- **Mastery badges** need 5 separate passing sessions (score ≥ 60%), and each module counts at most once per day. This stops users farming a badge by retaking one quiz five times in a row.
- The leaderboard uses `optionalAuth`, so guests can see public rankings while logged-in users get personalised results.

### 7.4 Scheduled jobs

- **E-paper scrapers** (axios + cheerio) collect daily newspapers for the current-affairs section.
- **Notification cron** works out the day and hour in Kathmandu time, independent of the server's timezone. This avoids off-by-one-day bugs around midnight. Reminders go to devices that were active in the last 30 days, sent as FCM multicast with Android high priority so they arrive even when the phone is in deep sleep.
- **Daily quiz** builds a fresh question set with a MongoDB aggregation pipeline (`$match` → `$unwind` → `$replaceRoot` → `$sample`) across several content collections, leaving out note-only modules.

### 7.5 Working within free-tier limits

- The API runs on Render's free tier, which sleeps when idle. The app pings a lightweight `/api/system/popup` endpoint at boot to wake the server while the user sees cached content.
- MongoDB connection retries with a delay, so the server survives brief network failures at startup instead of crashing.
- Heavy, rarely changing content is served from R2 and its edge cache instead of the API, which removes most of the load from the free server.

---

## 8. Security

**API hardening**

- `helmet` sets secure HTTP headers.
- CORS uses an explicit origin allow-list.
- JSON request bodies are capped at 10 KB.
- Two rate-limiting tiers: a global API limit (300 requests per 15 minutes) and a strict auth limit (10 requests per 15 minutes) on login, register, and every OTP endpoint to prevent brute force.

**Custom injection/XSS sanitiser (Express 5 compatible)**

- The common packages (`express-mongo-sanitize`, `xss-clean`) crash under Express 5 because `req.query` became a read-only getter.
- I wrote a replacement. It removes MongoDB operator keys (`$gt`, `$ne`, …) and dotted keys from request bodies and URL params in place, and plugs into Express as a custom query parser, so `req.query` is clean without ever being reassigned. It also strips HTML tags from all string values.
- User input used inside regex queries is escaped first, which prevents ReDoS and regex injection.

**Authentication and sessions**

- Passwords are hashed with bcrypt (salted).
- Stateless JWT auth: `protect` rejects invalid tokens, `optionalAuth` lets public-with-personalisation routes accept guests.
- The server refuses to start if `JWT_SECRET` is not set, so it can never fall back to a weak default.
- On the device, the JWT lives in the **OS Keychain/Keystore (expo-secure-store)** rather than plain AsyncStorage, so it cannot be pulled from a backup or a rooted device. Any 401 clears the whole session so the UI can't show stale logged-in state.
- Password reset uses a time-limited email OTP. The OTP is cleared once used.
- Content-management routes sit behind a separate admin key header that is not tied to any app user account.

**App hardening**

- ProGuard/R8 minification and resource shrinking in release builds.
- `console.*` calls are stripped from production bundles (babel plugin), so no debug logging leaks.
- Premium PDFs carry an on-screen watermark to discourage screenshot redistribution.

---

## 9. Performance and Size

- Hermes engine and New Architecture enabled.
- Content downloads are driven by the version manifest, so unchanged modules are never downloaded again.
- Old modules are evicted automatically, keeping on-device storage bounded on low-storage phones.
- Skeleton loaders and cache-first rendering mean users almost never see an empty loading spinner.
- Legacy caches from Gen 1 are cleaned up automatically after migration.

---

## 10. Challenges and Trade-offs

| Challenge                           | Decision                                                            | Trade-off                                                                           |
| ----------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Unreliable networks                 | Cache-first and file-based modules, with seed data as a last resort | Content can be up to one sync behind                                                |
| AsyncStorage bloat                  | Moved large payloads to file storage plus the R2 manifest           | Needs a separate publish step after editing content                                 |
| Two languages, one author           | Automatic translation on save                                       | Machine translation needs spot-checking, and answers are re-validated automatically |
| Express 5 broke security middleware | Wrote a custom sanitiser and query parser                           | More code to own and maintain                                                       |
| Free-tier sleeping server           | Wake-up ping plus serving content from the R2 edge cache            | First API call after idle can still be slow                                         |
| Badge farming                       | Passes deduplicated per module per day                              | Slower badge progress for honest users                                              |
| ~120 screens in one stack           | Shared quiz/study/notes components reused across every track        | Adding a track still means registering screens by hand                              |

---

## 11. Results

> FILL IN with real numbers — this is the section recruiters read most.

- Downloads / active users: **FILL IN**
- Play Store rating: **FILL IN** (from N reviews)
- Retention or streak stats (Firebase Analytics): **FILL IN**
- Content volume (questions, notes, mock sets): **FILL IN**
- Notable user feedback quote: **FILL IN**

---

## 12. What I Learned

- **Offline-first is a data-design problem, not a UI trick.** Versioning, atomic writes, and eviction mattered more than any spinner.
- **Build for the device your users actually own.** Storage and memory limits on budget Android phones drove the biggest architectural change (Gen 1 → Gen 2).
- **Automate the boring half.** The bilingual plugin and the hash-diffed publish script are why one person can run 10+ exam tracks in two languages.
- **Framework upgrades can quietly break security.** The Express 5 `req.query` change turned popular sanitisers into crashes, and I only understood why by reading the source.

## 13. What's Next

- Automated tests: API integration tests and component tests for the quiz engine.
- Stronger auth: short-lived access tokens with refresh-token rotation and revocation, OTPs generated with `crypto.randomInt` and stored hashed, and constant-time admin-key comparison.
- A web admin dashboard to replace Postman-based content management.
- Moving the API off the free tier (or adding a keep-alive) to remove cold starts.
- A config-driven navigator to cut down on registering screens by hand.
- iOS release.

---

---

## Prompt (to turn this into a portfolio page)

---

You are a senior technical writer and portfolio designer. I'm attaching a case study for my project **Mero Loksewa**. Every technical fact in it was taken from the real codebase. Turn it into a portfolio case-study page.

**Audience:** recruiters and hiring managers (who skim) and senior engineers (who dig into architecture and security). Write so both get value.

**Requirements:**

1. Keep every technical fact accurate. Do not invent metrics, users, ratings, or features. Leave any `FILL IN` placeholder as a clearly visible placeholder.
2. Structure: Hero (name, one-line pitch, role, stack chips, links) → TL;DR (3 bullets) → Problem → Users → Solution & key features → Tech stack (grouped chips) → Architecture (redraw the ASCII diagram as a clean diagram — Mermaid or SVG) → System design highlights (pick the 3 strongest: offline-first R2 pipeline, write-once bilingual plugin, custom Express 5 sanitiser) → Security → Challenges & trade-offs (table) → Results → Learnings → What's next.
3. Tone: confident, first person, specific. Prefer concrete mechanisms ("atomic temp-file writes + version manifest") over adjectives ("robust, scalable"). No buzzword filler.
4. Length: the main page should read in about 5–7 minutes. Put the deeper engineering detail in expandable "Technical deep dive" sections.
5. Output format: [CHOOSE ONE — a single Markdown/MDX file | a React/Next.js component using Tailwind | plain HTML/CSS]. Match my site's style: [DESCRIBE or paste a link].
6. Suggest 4–6 screenshots or GIFs I should capture (onboarding, home personalisation, quiz, language toggle, offline mode, leaderboard/badges) and where each goes on the page.
7. At the end, write a short project card (title, 2-sentence summary, 5 tech tags) for my portfolio's project grid, and a 3-line LinkedIn/resume bullet version.
