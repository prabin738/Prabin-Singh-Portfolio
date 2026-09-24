// Case-study copy for the Max Media survey app page, sourced from
// assets-src/projects/max-media-survey-app/case-study.md. Keep this file in
// sync with that doc — if a number or mechanism changes there, update it here
// too rather than letting the two drift apart.
//
// The security section deliberately does not claim endpoint-level auth on
// the data routes; that gap is listed under `whatsNext` instead.

import type {
  CaseStudyLinks,
  CaseStudyProblem,
  CaseStudyResults,
  CaseStudySolution,
  CaseStudyUsers,
  ChallengeRow,
  FlowNode,
  Highlight,
  LabeledValue,
  SecurityGroup,
  StackGroup,
} from "./types";

export const factStrip: LabeledValue[] = [
  { label: "Role", value: "Solo full-stack developer — mobile app, backend, admin dashboard" },
  { label: "Platform", value: "Android & iOS (Expo/React Native) + web admin dashboard" },
  { label: "Timeline", value: "May 2026 to Sep 2026 · ~4 months · 44 commits" },
];

export const atAGlance: LabeledValue[] = [
  {
    label: "Scope",
    value: "End-to-end field data collection platform: offline mobile survey app + sync backend + admin web dashboard",
  },
  { label: "Surface", value: "Native Android/iOS app (Expo Router) + responsive web admin portal" },
  { label: "Backend", value: "Node.js + Express 5 REST API (Render), MongoDB Atlas" },
  {
    label: "Languages",
    value: "JavaScript/JSX throughout mobile + backend, TypeScript project config with typed routes enabled",
  },
  { label: "Offline", value: "100% of survey data entry works with zero connectivity; sync is a separate, explicit online-only step" },
];

export const tldr: string[] = [
  "Built an offline-first mobile survey app (Expo/React Native) plus a Node/Express + MongoDB backend and a React admin dashboard, so field interviewers can capture a long, branching beverage-consumption questionnaire — with GPS-verified responses — in areas with no signal, then sync it to the cloud and export it into a client-specified 2,500+ column Excel format.",
  "Every write is treated as if it will be duplicated or retried. A serialized local save queue plus a client-generated survey ID with a server-side idempotent upsert eliminate the duplicate-survey bugs that naive SQLite and MongoDB inserts produce under real field conditions — double-taps, dropped responses, flaky connections.",
  "GPS reads from the device's own chip (Accuracy.Highest) instead of the faster network-assisted default, and every location check is non-blocking except the initial hard gate — trading a slower fix for one that's actually trustworthy, after field reports of multi-kilometre drift traced back to a stale, coarse cached fix being silently reused.",
];

export const problem: CaseStudyProblem = {
  intro:
    "Max Media runs door-to-door and spot-intercept market research, tracking consumer awareness and consumption across 60+ beverage brands. The existing process couldn't reliably capture structured survey data outside areas with good connectivity, and the client's downstream reporting pipeline depends on a specific, pre-existing spreadsheet format that a new tool couldn't break.",
  points: [
    "Interviewers work in areas with unreliable or no mobile data, so an all-online tool would simply stop working mid-field-day.",
    "Every response needs a verified GPS location, since a response with no location — or a spoofed one — can't be validated later.",
    "The final dataset has to land in a fixed, client-specified format: 2,500+ Excel columns, with brand-level answers coded across 60+ beverages.",
    "The people entering data are field interviewers under time pressure, not developers — the app has to survive app-kills, backtracking, and repeat taps without silently corrupting or duplicating data.",
  ],
  goal: "One app that runs the full brand-awareness/consumption questionnaire completely offline, hard-gates on a verified GPS fix at survey start, and produces clean, correctly-shaped data with no manual re-entry step.",
};

export const users: CaseStudyUsers = {
  primary: "Field interviewers/surveyors running the questionnaire on a phone, door-to-door or via spot intercept.",
  secondary:
    "Market-research operations staff who log into the web dashboard to monitor sync activity and pull exports; the beverage client's analysts who consume the final Excel file.",
  constraints:
    "Low/mid-range Android devices in low- or zero-connectivity areas; non-technical field staff working quickly, respondent by respondent; an export format fixed by the client's existing reporting pipeline and not up for redesign.",
};

export const solution: CaseStudySolution = {
  intro:
    "A three-part system — a local-first mobile app that never depends on a live connection to function, a thin backend that accepts synced data and issues admin sessions, and a web dashboard for oversight and export.",
  parts: [
    {
      title: "Offline-first survey app",
      body: "Expo Router screens read/write a shared Zustand store; every screen auto-saves to on-device SQLite before navigating away, so nothing is lost if the app closes, crashes, or loses signal mid-survey.",
    },
    {
      title: "Sync & backend",
      body: "A Node/Express API on Render accepts batched, idempotent syncs from the app and stores responses in MongoDB Atlas, tagged with an interviewer ID and a stable per-survey ID.",
    },
    {
      title: "Admin web dashboard",
      body: "A JWT-authenticated React/Vite portal shows live sync stats and lets staff export the full dataset into the client's exact Excel/CSV format.",
    },
  ],
  features: [
    {
      title: "Full survey flow",
      body: "Screener → demographics → recruitment → unaided & aided brand awareness (BA1/BA2/BA3) → consumption funnel → consumption context → category & corporate approval → classification → thank-you.",
    },
    { title: "GPS verification", body: "Location capture hard-gated at survey start, re-checked at completion." },
    { title: "Draft auto-save and resume", body: "Resume from any screen, after any interruption." },
    { title: "Duplicate-safe cloud sync", body: "Survives double-taps and dropped-connection retries." },
    {
      title: "2,500+ column CSV/Excel export",
      body: "60+ brand mapping tables, matching the client's legacy format exactly.",
    },
    { title: "Responsive brand grid", body: "3, 4 or 5 columns depending on screen width." },
    { title: "Admin dashboard", body: "Live sync stats and one-click data export." },
  ],
};

export const stackGroups: StackGroup[] = [
  {
    label: "Mobile",
    items: ["Expo SDK 56", "React Native 0.85.3", "React 19", "Expo Router (file-based navigation, typed routes)", "React Compiler"],
  },
  { label: "State & local storage", items: ["Zustand 5", "expo-sqlite", "AsyncStorage", "NetInfo"] },
  { label: "Location & sharing", items: ["expo-location", "expo-sharing", "expo-file-system"] },
  { label: "Data export", items: ["SheetJS (xlsx)"] },
  { label: "Backend", items: ["Node.js", "Express 5", "Mongoose 9"] },
  { label: "Auth & security", items: ["JWT (jsonwebtoken)", "bcryptjs", "dotenv", "CORS"] },
  { label: "Database & hosting", items: ["MongoDB Atlas", "Render (API)", "EAS Build (mobile)"] },
  { label: "Admin web dashboard", items: ["React", "Vite", "Tailwind CSS", "Recharts"] },
  { label: "Tooling", items: ["ESLint (eslint-config-expo)", "TypeScript project config", "Git"] },
];

export const architecture = {
  device: {
    title: "Interviewer device",
    subtitle: "Expo/React Native app",
    items: ["Survey screens (expo-router)", "Zustand store", "On-device SQLite (pending_surveys)"],
  } satisfies FlowNode,
  toLocal: ["auto-save (serialized write queue)"],
  local: {
    title: "Local SQLite",
    subtitle: "cms_survey.db",
    items: ["status: draft → pending → synced", "Guarded schema migrations"],
  } satisfies FlowNode,
  toApi: ["manual/auto sync — batched HTTPS POST"],
  api: {
    title: "Express API",
    subtitle: "Node.js, Render",
    items: ["/api/sync", "/api/stats", "/api/surveys", "/api/admin/login"],
  } satisfies FlowNode,
  admin: {
    title: "Admin web portal",
    subtitle: "React + Vite + Tailwind + Recharts",
    items: ["Login", "Dashboard stats", "Survey table", "Excel export"],
  } satisfies FlowNode,
  adminToApi: "Admin portal ↔ Express API: JWT bearer token, 12h expiry",
  toDb: ["bulkWrite upsert by surveyId (idempotent)"],
  db: {
    title: "MongoDB Atlas",
    subtitle: "Mongoose models",
    items: ["Survey (surveyId, surveyData, interviewerId, syncedAt)", "Admin (email, bcrypt password hash)"],
  } satisfies FlowNode,
  publishNote:
    "Mobile builds ship via EAS Build across development/preview/production profiles (Android APK today; iOS distribution not yet configured). The backend deploys straight from main to Render as a manual dashboard-configured Node service — no CI pipeline yet for backend or admin web.",
  flow: "An interviewer opens the app in the field with no signal, and starts a new survey once GPS is confirmed on. Every screen's answers merge into a shared Zustand store and auto-save to on-device SQLite through a serialized queue, so a double-tap on Next never creates two rows for the same respondent. GPS is captured again, non-blockingly, when the survey completes. Once the interviewer is back in range, tapping Sync on the Reports screen batches every pending row and POSTs it to /api/sync; the API pulls the interviewer ID and a client-generated surveyId out of each payload and performs an idempotent MongoDB upsert, so a retried request after a dropped response updates the existing document instead of inserting a duplicate. Separately, an admin logs into the web portal, receives a 12-hour JWT, and the dashboard calls /api/stats and /api/surveys to render live counts and drive the client's 2,500+ column Excel export.",
};

export const highlights: Highlight[] = [
  {
    title: "Serialized auto-save queue kills duplicate drafts",
    summary:
      "A double-tap on Next/Finish before the first SQLite INSERT resolved let two calls both read draftId === null and both insert a new row for the same respondent.",
    deepDive: [
      "Classic check-then-act race: two near-simultaneous calls both see \"no draft yet\" before either write lands.",
      "Fix: every persistence write (draft autosave and the final thank-you submit) now runs through one serialized queue (withSurveySaveLock), so a second call always waits and sees the real draftId.",
      "The hook also reads state via useSurveyStore.getState() at write time rather than a stale React closure, so the freshest data is always what gets saved.",
    ],
  },
  {
    title: "Idempotent cloud sync via a client-generated survey ID",
    summary:
      "Flaky field connections dropped sync responses; the app's retry then created duplicate MongoDB documents for the same completed survey.",
    deepDive: [
      "generateSurveyId() creates a locally-unique ID once, at survey start, and it's carried through every autosave, resume, and final submission.",
      "The server performs a bulkWrite of updateOne operations filtered by surveyId with upsert: true, so a resynced survey overwrites its own prior document instead of inserting a new one.",
      "The surveyId field is a sparse unique index — older app builds mid-rollout that don't send one yet fall back to a plain insert and keep working.",
    ],
  },
  {
    title: "GPS tuned for field trust, not convenience",
    summary:
      "Field reports of survey locations landing 15–30 km off traced back to stale or network-assisted fixes being reused as \"good enough.\"",
    deepDive: [
      "Accuracy.Highest forces the GPS chip itself rather than the faster wifi/network-assisted positioning that Balanced accuracy can silently fall back to.",
      "getCurrentPositionAsync has no built-in timeout, so a manual race against a timeout (5s, extended to 15s at survey start) prevents a stuck GPS search from hanging the interviewer indefinitely.",
      "A cached last-known position is only trusted as a fallback if it's both under 5 minutes old and under 500 m accuracy — a surveyor can cover ~50 km in a day, so an older \"last known\" fix is worse than no fix at all.",
      "Two gating strategies by context: a hard gate (location services + permission required) blocks starting a brand-new survey, while location capture during an in-progress survey is always best-effort and non-blocking.",
    ],
  },
  {
    title: "Local-first storage with guarded schema migrations",
    summary:
      "The SQLite schema has grown twice since launch (added last_saved_route, then updated_at) without ever requiring an app reinstall.",
    deepDive: [
      "Every migration is a PRAGMA table_info check followed by a conditional ALTER TABLE ... ADD COLUMN, so existing installs on older schema versions upgrade safely instead of crashing.",
      "SQLite forbids a non-constant default (like CURRENT_TIMESTAMP) on ALTER TABLE ADD COLUMN, so new timestamp columns are added bare and then backfilled with a follow-up UPDATE.",
    ],
  },
  {
    title: "A 2,500+ column export engine with one source of truth",
    summary:
      "The CSV/Excel exporter (csvMapper.js, ~2,500 lines) has to reproduce the client's exact legacy spreadsheet format, column for column.",
    deepDive: [
      "TARGET_HEADERS is one explicit array holding the client-specified column order — never auto-derived from the survey schema, so it can't silently drift out of alignment.",
      "Per-brand mapping tables translate answers for 60+ beverages into the correct BA2/BA3/BC11/BC12 columns.",
      "generateAndShareOldFormatCSV() reads every pending SQLite row, serializes it into the target format, and hands it off via expo-sharing for the interviewer to export directly from the device.",
    ],
  },
];

export const alsoInTheCodebase: string[] = [
  "Responsive brand-grid columns (3 / 4 / 5) driven by useWindowDimensions per screen, not a global constant.",
  "Sticky question headers with scroll-to-top on step navigation.",
  "Stale-answer cleanup: backtracking and changing an earlier answer strips now-invalid follow-up answers (e.g. BC4.3/BC4.5) so they can't linger and misalign the export.",
  "Age-gate branching: respondents aged 13–15 require parental consent instead of outright termination.",
  "Category and corporate brand-approval screening modules ahead of classification.",
  "Typed routes and React Compiler enabled via Expo's experimental flags.",
];

export const securityGroups: SecurityGroup[] = [
  {
    title: "Auth & access",
    items: [
      "bcrypt-hashed admin password",
      "JWT session tokens, 12h expiry",
      "Single admin login flow — interviewers never create accounts, so the app + backend address are the credential boundary",
    ],
  },
  {
    title: "Data handling",
    items: [
      "MongoDB connection string kept in an environment variable, never in source",
      ".env and node_modules excluded via .gitignore in both client and server",
      "Request body size capped (50 MB) for bulk survey payload uploads",
    ],
  },
  {
    title: "Field-data integrity",
    items: [
      "GPS hard-gated (location services + permission required) before a survey can start",
      "Idempotent surveyId-based upsert prevents duplicate/replay writes on sync retries",
      "Serialized local save queue prevents race-condition data loss",
    ],
  },
];

export const challenges: ChallengeRow[] = [
  {
    challenge: "Interviewers double-tapping Next/Finish created duplicate pending surveys in local SQLite",
    decision: "Serialize all local persistence writes through a single save-lock queue instead of just debouncing the UI",
    tradeoff:
      "Every autosave and the final submit share one queue, so a slow write briefly delays the next screen transition — acceptable for a strictly one-respondent-at-a-time flow",
  },
  {
    challenge: "Flaky field connectivity dropped sync responses, and retries created duplicate MongoDB documents",
    decision:
      "Generate a stable surveyId client-side at survey start and upsert on it server-side via bulkWrite, instead of a plain insert",
    tradeoff: "Requires a sparse unique index plus a fallback plain-insert path to keep older app builds working mid-rollout",
  },
  {
    challenge: "GPS fixes were reported 15–30 km off in the field",
    decision:
      "Force Accuracy.Highest (GPS chip only, no network-assisted fallback), extend the fix window to 15s, and only trust a cached last-known fix if it's under 5 minutes old and 500 m accurate",
    tradeoff:
      "Slower or no fix indoors/in dead zones — mitigated by treating GPS as best-effort and non-blocking rather than a hard mid-survey requirement",
  },
  {
    challenge: "A single ~2,500-line CSV mapper has to reproduce a client-specified 2,500+ column legacy format exactly",
    decision:
      "Keep one explicit TARGET_HEADERS array plus per-brand mapping tables as the single source of truth, updated in lockstep with every survey question change",
    tradeoff:
      "No abstraction over the column mapping — verbose and manually maintained, but any indirection risks silently misaligning a client-facing export",
  },
  {
    challenge: "Interviewers needed to work in areas with no signal at all",
    decision:
      "Local-first architecture: every screen writes to on-device SQLite immediately; sync is a separate, explicit step",
    tradeoff:
      "Two sources of truth (local draft vs. synced cloud record) that have to be reconciled through an explicit status lifecycle (draft → pending → synced), rather than one always-online system",
  },
];

export const results: CaseStudyResults = {
  stats: [
    { label: "Client-specified export columns matched exactly", value: "2,500+" },
    { label: "Beverage brands tracked", value: "60+" },
    { label: "Survey flow screens (screener → thank-you)", value: "20" },
    { label: "Surveys collected in the field", value: "5,000+" },
    { label: "Active field interviewers across the country", value: "200–300" },
    { label: "Provinces and districts covered", value: "All" },
    { label: "Solo build timeline (May–Sep 2026, 44 commits)", value: "~4 months" },
    { label: "Of data entry works with zero connectivity", value: "100%" },
  ],
};

export const learnings: string[] = [
  "Treat any \"check-then-act\" state read (like draftId === null) as a race condition by default on UI that allows rapid repeat taps — not just as something a debounce fixes.",
  "Idempotency has to be designed at the write boundary — a stable client-generated ID plus a server-side upsert — not patched in after duplicates are already showing up in production data.",
  "On field hardware, \"most accurate\" and \"most available\" are different GPS settings entirely; pick deliberately per use case, and always pair a hard gate with a non-blocking fallback elsewhere.",
  "A client-specified legacy export format is a contract, not a style choice — the column list itself is the spec, so keep exactly one explicit source of truth for it instead of deriving it.",
  "Local-first apps need a real small state machine (draft / pending / synced), not a boolean \"is this saved,\" to reason correctly about what a sync retry should do.",
];

export const whatsNext: string[] = [
  "Add authorization middleware to the data endpoints (/api/sync, /api/stats, /api/surveys) so they require the same JWT the admin portal already issues — closing the gap between the documented security rule (\"every data endpoint must require login\") and the current implementation.",
  "Move from a single shared admin account to per-interviewer accounts with scoped permissions.",
  "Replace the two hardcoded admin-dashboard stats (active surveyors, average survey time) with real calculated values.",
  "Set up iOS distribution (Android-only today) and a CI pipeline for the backend and admin web portal, both currently manual deploys.",
  "Build out the still-placeholder admin portal sections (Interviewers, Municipality, other report views).",
];

export const caseStudyLinks: CaseStudyLinks = {
  // Both repos are private and scheduled to transfer to the client's org; null shows the "private repository" note.
  github: null,
};
