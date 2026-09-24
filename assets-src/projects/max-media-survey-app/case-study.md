# Max Media Consumer Survey — Offline-First Field Research Platform

> **SEO summary (use as meta description):** How I built an offline-first React Native (Expo) field survey app, a Node/Express + MongoDB sync backend, and a React admin dashboard that let market-research interviewers capture GPS-verified beverage consumption data with zero connectivity and export it into a client-specified 2,500+ column Excel format.

---

## Header entry (for your `projects.ts` — shared across every case study)

- **Breadcrumb:** Projects → Max Media Consumer Survey
- **Status:** Shipped / In production _(confirm current status — Android build live, iOS not yet distributed)_
- **Title:** Max Media Consumer Survey Platform
- **Summary (1 line):** Offline-first mobile survey app + sync backend + admin dashboard for field-based beverage market research, built solo end-to-end.
- **Stack chips:** Expo · React Native · Zustand · SQLite · Node.js · Express · MongoDB Atlas · JWT
- **Screenshot gallery (placeholders — swap in real captures):**
  - Screener & demographics flow
  - Aided brand-awareness grid (BA3) — responsive 3/4/5-column layout
  - GPS/location permission gate at survey start
  - Reports screen — sync status & CSV/Excel export
  - Admin dashboard — live stats
  - Admin dashboard — data table & export

---

## 1. Fact Strip

| Label    | Value                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| Role     | Solo Full-Stack Developer _(edit to your preferred title — e.g. "Founder, ClickLab" or "Freelance Full-Stack Developer")_ |
| Platform | Android & iOS (Expo/React Native) + Web Admin Dashboard                                                                   |
| Timeline | May 2026 – Sep 2026 (~4 months, 44 commits, solo)                                                                         |

## 2. Source Link

`caseStudyLinks.github` → **`null`**

Both repositories (`max-media-consumer-survey`, `max-media-web`) are currently private and scheduled to transfer to the client's org after final payment — page should render "private repository."

## 3. At a Glance

| Label     | Value                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------- |
| Scope     | End-to-end field data collection platform: offline mobile survey app + sync backend + admin web dashboard |
| Surface   | Native Android/iOS app (Expo Router) + responsive web admin portal                                        |
| Backend   | Node.js + Express 5 REST API (Render), MongoDB Atlas                                                      |
| Languages | JavaScript/JSX throughout mobile + backend, TypeScript project config with typed routes enabled           |
| Offline   | 100% of survey data entry works with zero connectivity; sync is a separate, explicit online-only step     |

## 4. TL;DR

1. Built an offline-first mobile survey app (Expo/React Native) plus a Node/Express + MongoDB backend and a React admin dashboard, so field interviewers can capture a long, branching beverage-consumption questionnaire — with GPS-verified responses — in areas with no signal, then sync it to the cloud and export it into a client-specified 2,500+ column Excel format.
2. **Key technical idea:** treat every write as if it _will_ be duplicated or retried. A serialized local save queue plus a client-generated survey ID with a server-side idempotent upsert together eliminate the duplicate-survey bugs that naive SQLite inserts and naive Mongo inserts produce under real field conditions — double-taps, dropped responses, flaky connections.
3. **Standout decision:** forced GPS to read from the device's own chip (`Accuracy.Highest`) instead of the faster network-assisted default, and made every location check non-blocking except the initial hard gate — trading a slower fix for one that's actually trustworthy, after field reports of multi-kilometer GPS drift traced back to a stale, coarse cached fix being silently reused.

---

## 5. The Problem

**Intro:** Max Media runs door-to-door and spot-intercept market research, tracking consumer awareness and consumption across 60+ beverage brands. The existing process couldn't reliably capture structured survey data outside areas with good connectivity, and the client's downstream reporting pipeline depends on a specific, pre-existing spreadsheet format that a new tool couldn't break.

**Points:**

- Interviewers work in areas with unreliable or no mobile data, so an all-online tool would simply stop working mid-field-day.
- Every response needs a verified GPS location, since a response with no location — or a spoofed one — can't be validated later.
- The final dataset has to land in a fixed, client-specified format: 2,500+ Excel columns, with brand-level answers coded across 60+ beverages.
- The people entering data are field interviewers under time pressure, not developers — the app has to survive app-kills, backtracking, and repeat taps without silently corrupting or duplicating data.

**Goal:** One app that runs the full brand-awareness/consumption questionnaire completely offline, hard-gates on a verified GPS fix at survey start, and produces clean, correctly-shaped data with no manual re-entry step.

## 6. Target Users

- **Primary:** Field interviewers/surveyors running the questionnaire on a phone, door-to-door or via spot intercept.
- **Secondary:** Market-research operations staff who log into the web dashboard to monitor sync activity and pull exports; the beverage client's analysts who consume the final Excel file.
- **Constraints:** Must run on low/mid-range Android devices in low- or zero-connectivity areas; users are non-technical field staff working quickly, respondent by respondent; the export format is fixed by the client's existing reporting pipeline and isn't up for redesign.

## 7. The Solution

**Intro:** A three-part system — a local-first mobile app that never depends on a live connection to function, a thin backend that accepts synced data and issues admin sessions, and a web dashboard for oversight and export.

**Parts (3 cards):**

| Title                    | Body                                                                                                                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offline-first survey app | Expo Router screens read/write a shared Zustand store; every screen auto-saves to on-device SQLite before navigating away, so nothing is lost if the app closes, crashes, or loses signal mid-survey. |
| Sync & backend           | A Node/Express API on Render accepts batched, idempotent syncs from the app and stores responses in MongoDB Atlas, tagged with an interviewer ID and a stable per-survey ID.                          |
| Admin web dashboard      | A JWT-authenticated React/Vite portal shows live sync stats and lets staff export the full dataset into the client's exact Excel/CSV format.                                                          |

**Features:**

- Full survey flow: screener → demographics → recruitment → unaided & aided brand awareness (BA1/BA2/BA3) → consumption funnel → consumption context → category & corporate approval → classification → thank-you
- GPS capture hard-gated at survey start, re-checked at completion
- Draft auto-save and resume from any screen, from any interruption
- Duplicate-safe cloud sync (survives double-taps and dropped-connection retries)
- 2,500+ column CSV/Excel export with 60+ brand mapping tables, matching the client's legacy format exactly
- Responsive brand-grid layout (3/4/5 columns by screen width)
- Admin dashboard with live sync stats and one-click data export

## 8. Tech Stack

| Group                 | Items                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Mobile                | Expo SDK 56, React Native 0.85.3, React 19, Expo Router (file-based navigation, typed routes), React Compiler |
| State & Local Storage | Zustand 5, expo-sqlite, AsyncStorage, NetInfo                                                                 |
| Location & Sharing    | expo-location, expo-sharing, expo-file-system                                                                 |
| Data Export           | SheetJS (xlsx)                                                                                                |
| Backend               | Node.js, Express 5, Mongoose 9                                                                                |
| Auth & Security       | JWT (jsonwebtoken), bcryptjs, dotenv, CORS                                                                    |
| Database & Hosting    | MongoDB Atlas, Render (API), EAS Build (mobile)                                                               |
| Admin Web Dashboard   | React, Vite, Tailwind CSS, Recharts _(sibling repo, same author)_                                             |
| Tooling               | ESLint (eslint-config-expo), TypeScript project config, Git                                                   |

## 9. System Architecture

**Nodes:**

- **Interviewer Device** — subtitle: "Expo/React Native app" — items: Survey screens (expo-router), Zustand store, on-device SQLite (`pending_surveys`)
- **Local SQLite** — subtitle: "cms_survey.db" — items: `status`: draft → pending → synced, guarded schema migrations
- **Express API** — subtitle: "Node.js, Render" — items: `/api/sync`, `/api/stats`, `/api/surveys`, `/api/admin/login`
- **MongoDB Atlas** — subtitle: "Mongoose models" — items: `Survey` (surveyId, surveyData, interviewerId, syncedAt), `Admin` (email, bcrypt password hash)
- **Admin Web Portal** — subtitle: "React + Vite + Tailwind + Recharts" — items: Login, dashboard stats, survey table, Excel export

**Connector labels:**

- Device → Local SQLite: "auto-save (serialized write queue)"
- Local SQLite → Express API: "manual/auto sync — batched HTTPS POST"
- Express API → MongoDB Atlas: "bulkWrite upsert by surveyId (idempotent)"
- Admin Web Portal ↔ Express API: "JWT bearer token, 12h expiry"

**Publish note:** Mobile builds ship via EAS Build across `development`/`preview`/`production` profiles (Android APK today; iOS distribution not yet configured). The backend deploys straight from `main` to Render as a manual dashboard-configured Node service — no CI pipeline yet for backend or admin web.

**Flow (a single request, end to end):** An interviewer opens the app in the field with no signal, and starts a new survey once GPS is confirmed on. Every screen's answers merge into a shared Zustand store and auto-save to on-device SQLite through a serialized queue, so a double-tap on Next never creates two rows for the same respondent. GPS is captured again, non-blockingly, when the survey completes. Once the interviewer is back in range, tapping Sync on the Reports screen batches every "pending" row and POSTs it to `/api/sync`; the API pulls the interviewer ID and a client-generated `surveyId` out of each payload and performs an idempotent MongoDB upsert, so a retried request after a dropped response updates the existing document instead of inserting a duplicate. Separately, an admin logs into the web portal, receives a 12-hour JWT, and the dashboard calls `/api/stats` and `/api/surveys` to render live counts and drive the client's 2,500+ column Excel export.

## 10. System Design Highlights

**Highlights:**

1. **Title:** Serialized auto-save queue kills duplicate drafts
   **Summary:** A double-tap on Next/Finish before the first SQLite INSERT resolved let two calls both read `draftId === null` and both insert a new row for the same respondent.
   **Deep dive:**
   - Classic check-then-act race: two near-simultaneous calls both see "no draft yet" before either write lands.
   - Fix: every persistence write (draft autosave _and_ the final thank-you submit) now runs through one serialized queue (`withSurveySaveLock`), so a second call always waits and sees the real `draftId`.
   - The hook also reads state via `useSurveyStore.getState()` at write time rather than a stale React closure, so the freshest data is always what gets saved.

2. **Title:** Idempotent cloud sync via a client-generated survey ID
   **Summary:** Flaky field connections dropped sync responses; the app's retry then created duplicate MongoDB documents for the same completed survey.
   **Deep dive:**
   - `generateSurveyId()` creates a locally-unique ID once, at survey start, and it's carried through every autosave, resume, and final submission.
   - The server performs a `bulkWrite` of `updateOne` operations filtered by `surveyId` with `upsert: true`, so a resynced survey overwrites its own prior document instead of inserting a new one.
   - The `surveyId` field is a _sparse_ unique index — older app builds mid-rollout that don't send one yet fall back to a plain insert and keep working.

3. **Title:** GPS tuned for field trust, not convenience
   **Summary:** Field reports of survey locations landing 15–30km off traced back to stale or network-assisted fixes being reused as "good enough."
   **Deep dive:**
   - `Accuracy.Highest` forces the GPS chip itself rather than the faster wifi/network-assisted positioning that Balanced accuracy can silently fall back to.
   - `getCurrentPositionAsync` has no built-in timeout, so a manual race against a timeout (5s → extended to 15s at survey start) prevents a stuck GPS search from hanging the interviewer indefinitely.
   - A cached last-known position is only trusted as a fallback if it's both under 5 minutes old _and_ under 500m accuracy — a surveyor can cover ~50km in a day, so an older "last known" fix is worse than no fix at all.
   - Two different gating strategies by context: a **hard gate** (must have location services + permission) blocks starting a brand-new survey, while location capture _during_ an in-progress survey is always best-effort and non-blocking.

4. **Title:** Local-first storage with guarded schema migrations
   **Summary:** The SQLite schema has grown twice since launch (added `last_saved_route`, then `updated_at`) without ever requiring an app reinstall.
   **Deep dive:**
   - Every migration is a `PRAGMA table_info` check followed by a conditional `ALTER TABLE ... ADD COLUMN`, so existing installs on older schema versions upgrade safely instead of crashing.
   - SQLite forbids a non-constant default (like `CURRENT_TIMESTAMP`) on `ALTER TABLE ADD COLUMN`, so new timestamp columns are added bare and then backfilled with a follow-up `UPDATE`.

5. **Title:** A 2,500+ column export engine with one source of truth
   **Summary:** The CSV/Excel exporter (`csvMapper.js`, ~2,500 lines) has to reproduce the client's exact legacy spreadsheet format, column for column.
   **Deep dive:**
   - `TARGET_HEADERS` is one explicit array holding the client-specified column order — never auto-derived from the survey schema, so it can't silently drift out of alignment.
   - Per-brand mapping tables translate answers for 60+ beverages into the correct BA2/BA3/BC11/BC12 columns.
   - `generateAndShareOldFormatCSV()` reads every `pending` SQLite row, serializes it into the target format, and hands it off via `expo-sharing` for the interviewer to export directly from the device.

**Also in the codebase:**

- Responsive brand-grid columns (3 / 4 / 5) driven by `useWindowDimensions` per screen, not a global constant
- Sticky question headers with scroll-to-top on step navigation
- Stale-answer cleanup: backtracking and changing an earlier answer strips now-invalid follow-up answers (e.g. BC4.3/BC4.5) so they can't linger and misalign the export
- Age-gate branching (13–15 requires parental consent instead of outright termination)
- Category and corporate brand-approval screening modules ahead of classification
- Typed routes and React Compiler enabled via Expo's experimental flags

## 11. Security

**Groups (3 columns):**

| Title                | Items                                                                                                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth & Access        | bcrypt-hashed admin password · JWT session tokens, 12h expiry · single admin login flow — interviewers never create accounts, so the app + backend address are the credential boundary                                                   |
| Data Handling        | MongoDB connection string kept in an environment variable, never in source · `.env` and `node_modules` excluded via `.gitignore` in both client and server · request body size capped (50mb) for bulk survey payload uploads             |
| Field-Data Integrity | GPS hard-gated (location services + permission required) before a survey can start · idempotent `surveyId`-based upsert prevents duplicate/replay writes on sync retries · serialized local save queue prevents race-condition data loss |

_(Deliberately not claimed here: endpoint-level authorization on the data routes — see "What's Next.")_

## 12. Challenges & Trade-offs

| Challenge                                                                                               | Decision                                                                                                                                                                                   | Trade-off                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Interviewers double-tapping Next/Finish created duplicate pending surveys in local SQLite               | Serialize all local persistence writes through a single save-lock queue instead of just debouncing the UI                                                                                  | Every autosave and the final submit share one queue, so a slow write briefly delays the next screen transition — acceptable for a strictly one-respondent-at-a-time flow                          |
| Flaky field connectivity dropped sync responses, and retries created duplicate MongoDB documents        | Generate a stable `surveyId` client-side at survey start and upsert on it server-side via `bulkWrite`, instead of a plain insert                                                           | Requires a sparse unique index plus a fallback plain-insert path to keep older app builds working mid-rollout                                                                                     |
| GPS fixes were reported 15–30km off in the field                                                        | Force `Accuracy.Highest` (GPS chip only, no network-assisted fallback), extend the fix window to 15s, and only trust a cached last-known fix if it's under 5 minutes old and 500m accurate | Slower or no fix indoors/in dead zones — mitigated by treating GPS as best-effort and non-blocking rather than a hard mid-survey requirement                                                      |
| A single ~2,500-line CSV mapper has to reproduce a client-specified 2,500+ column legacy format exactly | Keep one explicit `TARGET_HEADERS` array plus per-brand mapping tables as the single source of truth, updated in lockstep with every survey question change                                | No abstraction over the column mapping — verbose and manually maintained, but any indirection risks silently misaligning a client-facing export                                                   |
| Interviewers needed to work in areas with no signal at all                                              | Local-first architecture: every screen writes to on-device SQLite immediately; sync is a separate, explicit step                                                                           | Two sources of truth (local draft vs. synced cloud record) that have to be reconciled through an explicit status lifecycle (`draft` → `pending` → `synced`), rather than one always-online system |

## 13. Results

**Stats:**

| Label                                           | Value                                           |
| ----------------------------------------------- | ----------------------------------------------- |
| Client-specified export columns matched exactly | 2,500+                                          |
| Beverage brands tracked                         | 60+                                             |
| Survey flow screens (screener → thank-you)      | 20                                              |
| Surveys collected in the field                  | 5,000+                                          |
| Active field interviewers across the country    | 200–300                                         |
| Provinces and districts covered                 | All                                             |
| Solo build timeline                             | ~4 months (May–Sep 2026), 44 commits            |
| Offline capability                              | 100% of data entry works with zero connectivity |

## 14. What I Learned

- Treat any "check-then-act" state read (like `draftId === null`) as a race condition by default on UI that allows rapid repeat taps — not just as something a debounce fixes.
- Idempotency has to be designed at the write boundary — a stable client-generated ID plus a server-side upsert — not patched in after duplicates are already showing up in production data.
- On field hardware, "most accurate" and "most available" are different GPS settings entirely; pick deliberately per use case, and always pair a hard gate with a non-blocking fallback elsewhere.
- A client-specified legacy export format is a contract, not a style choice — the column list itself is the spec, so keep exactly one explicit source of truth for it instead of deriving it.
- Local-first apps need a real small state machine (`draft` / `pending` / `synced`), not a boolean "is this saved," to reason correctly about what a sync retry should do.

## 15. What's Next

- Add authorization middleware to the data endpoints (`/api/sync`, `/api/stats`, `/api/surveys`) so they require the same JWT the admin portal already issues — closing the gap between the documented security rule ("every data endpoint must require login") and the current implementation.
- Move from a single shared admin account to per-interviewer accounts with scoped permissions.
- Replace the two hardcoded admin-dashboard stats (active surveyors, average survey time) with real calculated values.
- Set up iOS distribution (Android-only today) and a CI pipeline for the backend and admin web portal, both currently manual deploys.
- Build out the still-placeholder admin portal sections (Interviewers, Municipality, other report views).

---

## Prompt for Claude AI (to generate the actual case-study code file)

Copy everything below into Claude when you're working inside your **portfolio site's repo**, so it can turn this markdown into your site's real data file/shape.
