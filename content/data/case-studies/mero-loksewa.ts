// Case-study copy for the Mero Loksewa project page, sourced from
// assets-src/projects/mero-loksewa/PORTFOLIO_CASE_STUDY.md, which itself was
// written from the real codebase. Keep this file in sync with that doc — if a
// number or mechanism changes there, update it here too rather than letting
// the two drift apart.
//
// Two stats already live on the site as confirmed facts, not placeholders:
// content/data/site.ts (`numbers`) and this project's `summary` in
// content/data/projects.ts both state 1,000+ downloads and a 4.3 rating. The
// `results.pending` list below is everything the source doc still marks
// `FILL IN` — real numbers Prabin hasn't filled in yet, not invented ones.

export type FactStripItem = { label: string; value: string };

export const factStrip: FactStripItem[] = [
  { label: "Role", value: "Solo full-stack developer — product, mobile, backend, DevOps, content pipeline" },
  { label: "Platform", value: "Android on Google Play (the Expo codebase can also target iOS)" },
  { label: "Timeline", value: "March 2026 to present · v1.4.0 · ~190 commits" },
];

export type AtAGlanceItem = { label: string; value: string };

export const atAGlance: AtAGlanceItem[] = [
  {
    label: "Exam tracks",
    value:
      "Nasu, Kharidar, Adhikrit, Pharmacy, Teacher (MAVI/NIMAVI), NRB Banking, Civil Engineering, Government Organisations, plus general subjects: GK, Constitution (Sambidhan), Nepal Parichaya, Periodic Plans (Yojana), Monetary Policy, Computer, IQ, Current Affairs",
  },
  { label: "App surface", value: "~120 screens, 20+ reusable learning components" },
  { label: "Backend", value: "49 REST route modules, 56 Mongoose models, 4 scheduled jobs" },
  { label: "Languages", value: "Content authored once, served in both Nepali and English" },
  { label: "Offline", value: "Study content works with no network after the first load" },
];

export const tldr: string[] = [
  "Solo-built and shipped: a React Native/Expo app, an Express 5 + MongoDB API, and a Cloudflare R2 content pipeline covering 10+ Loksewa exam tracks — live on Google Play with 1,000+ downloads and a 4.3 rating.",
  "Offline-first by data design, not a UI trick: versioned JSON modules with atomic temp-file writes and a content-hash-diff publish script, so study material keeps working with no network after the first load.",
  "Content is written once and served in Nepali and English through a reusable Mongoose plugin that translates on save — and when Express 5 quietly broke the usual security middleware, I wrote a replacement instead of downgrading.",
];

export const problem = {
  intro:
    "Every year, hundreds of thousands of candidates in Nepal sit the Loksewa Aayog (Public Service Commission) exams. Preparation today is fragmented and poorly suited to how candidates actually live:",
  points: [
    "Material is scattered across printed guidebooks, PDFs on Facebook groups, YouTube, and coaching centres. Each exam track (Nasu, Kharidar, Adhikrit, and so on) has its own syllabus, and no single place maps content to it.",
    "Connectivity is unreliable. Many candidates live outside the Kathmandu valley on patchy mobile data. Apps that need a live connection to show a question feel broken.",
    "Language is a barrier both ways. Exams are mostly in Nepali, but many learners (and some papers, such as banking and computer) work better in English. Existing resources pick one language.",
    "Self-study is lonely and hard to sustain. Preparation runs for months. Without feedback, streaks, or a community, candidates drop off.",
    "Devices are low-end. Budget Android phones with limited storage are the norm, so a bloated app gets uninstalled.",
  ],
  goal: "One app that covers every major exam track, works offline on cheap phones, speaks both languages, and keeps learners coming back every day.",
};

export const users = {
  primary: "Loksewa candidates aged 18–35 preparing for a specific track (for example a Nasu or Kharidar aspirant in a district town).",
  secondary: "Candidates preparing for related exams (NRB banking, teacher licensing, pharmacy, engineering).",
  constraints: "Budget Android devices, intermittent 3G/4G, Nepali-first reading, study in short sessions.",
};

export const solution = {
  intro: "A React Native (Expo) app backed by a Node/Express + MongoDB API. The app has three main parts:",
  parts: [
    {
      title: "Structured learning by exam track",
      body: "Each track mirrors its official syllabus as papers → topics → study notes, MCQ practice, mock tests, and past papers. Onboarding asks which exams the user is preparing for, and the home screen shows those tracks first.",
    },
    {
      title: "Offline-first content delivery",
      body: "Study modules are published as versioned JSON to Cloudflare R2, downloaded to device storage, and re-downloaded only when a version manifest says they changed. Seed data bundled with the app means even a first launch with no network shows something useful.",
    },
    {
      title: "Engagement",
      body: "XP, daily streaks, daily and all-time leaderboards, subject-mastery badges, a Q&A community forum, referrals, shareable badge cards, a daily quiz, and scheduled push reminders.",
    },
  ],
  features: [
    { title: "Universal quiz engine", body: "One quiz component powers every MCQ set, mock test, and past paper across all tracks, with explanations and result submission." },
    { title: "Study mode and structured notes", body: "Rich notes with Markdown, tables, and math. Includes a syllabus viewer and a PDF course viewer." },
    { title: "Bilingual toggle", body: "Switch between Nepali and English anywhere in the app. The preference syncs to the user's profile." },
    { title: "Personalised homepage", body: "Multi-select exam-track onboarding decides which sections appear. Guest mode lets people browse before signing up." },
    { title: "Current affairs and e-papers", body: "Daily Gorkhapatra, Rising Nepal, and Loksewa e-papers are scraped automatically on a schedule." },
    { title: "Community forum", body: "Ask and answer questions, accept answers, and earn XP and badges for helping others." },
    { title: "Gamification", body: "XP, streaks, leaderboards, 14 subject-mastery badges, referral badges, and badge cards you can share to social media." },
    { title: "Bookmarks, daily quiz, push notifications", body: "Daily reminders on Kathmandu time, plus per-user alerts such as \"your question got an answer\"." },
    { title: "Monetisation", body: "Google AdMob with mediation, configured through a custom Expo config plugin." },
  ],
};

export type StackGroup = { label: string; items: string[] };

export const stackGroups: StackGroup[] = [
  { label: "Mobile & navigation", items: ["React Native 0.81 (New Architecture)", "React 19", "Expo SDK 54 (dev client, EAS Build)", "Hermes", "React Navigation v7"] },
  { label: "State, data & on-device storage", items: ["React Context", "useSmartFetch", "useModuleData", "expo-file-system", "AsyncStorage", "expo-secure-store"] },
  { label: "UI & media", items: ["Reanimated 4", "react-native-pdf", "blob-util", "react-native-markdown-display", "react-native-view-shot", "react-native-share", "WebView"] },
  { label: "Backend & auth", items: ["Node.js", "Express 5", "Mongoose 9", "MongoDB Atlas", "JWT (Bearer)", "bcryptjs", "Nodemailer (email OTP)"] },
  { label: "Storage, CDN & messaging", items: ["Cloudflare R2 (AWS SDK v3)", "Firebase Cloud Messaging", "Firebase Admin", "Notifee"] },
  { label: "Analytics, jobs & translation", items: ["Firebase Analytics", "Firebase Remote Config", "node-cron (Asia/Kathmandu)", "axios + cheerio", "Google Translate"] },
  { label: "Security", items: ["helmet", "express-rate-limit", "custom NoSQL-injection/XSS sanitiser", "CORS allow-list"] },
  { label: "Hosting", items: ["Render (API)", "Cloudflare R2 (content)", "Google Play (app)"] },
];

export type FlowNode = { title: string; subtitle?: string; items: string[] };

export const architecture = {
  app: {
    title: "Android app",
    subtitle: "React Native / Expo",
    items: [
      "~120 screens — quiz engine, study mode, notes, PDF viewer",
      "useModuleData → local JSON (expo-file-system) ← version manifest",
      "useSmartFetch → AsyncStorage cache → bundled seed data (last resort)",
      "SecureStore (JWT) · LanguageContext (np/en) · UserPreferencesContext",
      "FCM + Notifee · Firebase Analytics / Remote Config · AdMob",
    ],
  } satisfies FlowNode,
  toBackend: ["HTTPS REST · ?lang=np|en · Bearer JWT", "HTTPS GET · versioned, edge-cached"],
  api: {
    title: "Express 5 API",
    subtitle: "Render",
    items: [
      "helmet · CORS allow-list · 10 KB body limit",
      "NoSQL/XSS sanitiser · rate limiters",
      "49 route modules → controllers/handlers",
      "JWT protect / optionalAuth / admin-key gate",
      "localize(doc, lang) response projection",
      "Cron: e-paper scrapers, notifications, daily quiz",
    ],
  } satisfies FlowNode,
  r2: {
    title: "Cloudflare R2",
    subtitle: "content CDN",
    items: ["modules/manifest.json", "modules/<key>_<lang>", "PDFs, images"],
  } satisfies FlowNode,
  publishNote:
    "publishModulesToR2.js reads each registered module from MongoDB, hashes it, and uploads only the modules that changed to R2 (content-hash diff), then rewrites manifest.json with the new versions.",
  toData: ["Mongoose", "Firebase Admin"],
  db: {
    title: "MongoDB Atlas",
    subtitle: "56 models",
    items: ["Content (bilingual plugin)", "Users, progress", "Forum, scores"],
  } satisfies FlowNode,
  fcm: {
    title: "Firebase Cloud Messaging",
    items: ["Broadcast + per-user push"],
  } satisfies FlowNode,
  flow: "Request flow for a study screen: the screen asks useModuleData for a module. The hook reads the local file straight away if one exists. It then checks the small R2 manifest and downloads only if that module's version changed. If R2 is unreachable and nothing is cached locally, it falls back to the Express endpoint. The screen shows content at every step and never blocks on the network.",
};

export type Highlight = { title: string; summary: string; deepDive: string[] };

export const highlights: Highlight[] = [
  {
    title: "Offline-first content pipeline",
    summary:
      "Gen 1 (useSmartFetch) cached full content blobs in AsyncStorage — simple, but it made app storage balloon on budget phones. Gen 2 (useModuleData) moved large study modules out of the API response path entirely: versioned JSON files in app-scoped file storage, downloaded only when a manifest says the content changed.",
    deepDive: [
      "A publish script exports each registered module from MongoDB, serialises it deterministically (sorted keys), hashes it, and uploads only the modules that changed to R2, then rewrites a small manifest.json with the new versions. It can be scoped with --model or --topicId so publishing stays fast across hundreds of topics.",
      "Atomic writes: each download goes to a .tmp file and is renamed only on success, so if the app is killed mid-download it never leaves a half-written file that later looks like a valid cache entry.",
      "Cache-busting: a ?v=<version> query string forces Cloudflare's edge to serve exactly the bytes the manifest promised.",
      "Retention policy: per-topic modules are evicted after 24 hours of inactivity, with a cap of 10 per subject group. A sweep at boot catches modules the user never reopens.",
      "Graceful migration: if R2 fails, the hook falls back to the legacy API route and writes that response into the store with a null version, so the next successful manifest check triggers a proper versioned download. Screens moved from Gen 1 to Gen 2 with minimal code changes because the hook returns the same data shape.",
    ],
  },
  {
    title: "Write-once bilingual content",
    summary:
      "Authoring every question and note twice wasn't realistic for one person. A reusable Mongoose bilingualPlugin detects the language content was written in, translates only the fields that need it, and stores the result in a translatedContent mirror — so clients just add ?lang=en to the URL.",
    deepDive: [
      "On save, the plugin pulls out only the string leaves that need translating and stores the translated result in a translatedContent mirror.",
      "Identical strings are translated only once. Requests are throttled (2 at a time, with a 1-second gap between batches) to stay under the translation endpoint's abuse threshold.",
      "enforceAnswerConsistency makes sure the translated correct answer still matches one of the translated options, so the quiz never marks a correct answer as wrong.",
      "On read, localizeDoc(doc, lang) returns the requested language — the client just adds ?lang=en to the URL.",
    ],
  },
  {
    title: "Custom Express 5 sanitiser",
    summary:
      "The common packages (express-mongo-sanitize, xss-clean) crash under Express 5 because req.query became a read-only getter. Rather than downgrade or leave the API unprotected, I wrote a replacement.",
    deepDive: [
      "Removes MongoDB operator keys ($gt, $ne, ...) and dotted keys from request bodies and URL params in place.",
      "Plugs into Express as a custom query parser, so req.query is clean without ever being reassigned.",
      "Strips HTML tags from all string values.",
      "Escapes user input used inside regex queries first, which prevents ReDoS and regex injection.",
    ],
  },
];

export const alsoInTheCodebase: string[] = [
  "Mastery badges need 5 separate passing sessions (score ≥ 60%), and each module counts at most once per day, so a badge can't be farmed by retaking one quiz five times in a row.",
  "Notification cron works out the day and hour in Kathmandu time, independent of the server's timezone, avoiding off-by-one-day bugs around midnight; reminders send as FCM multicast with Android high priority.",
  "The API runs on Render's free tier, which sleeps when idle. The app pings a lightweight /api/system/popup endpoint at boot to wake it while the user sees cached content.",
];

export type SecurityGroup = { title: string; items: string[] };

export const securityGroups: SecurityGroup[] = [
  {
    title: "API hardening",
    items: [
      "helmet sets secure HTTP headers",
      "CORS uses an explicit origin allow-list",
      "JSON request bodies capped at 10 KB",
      "Global limit: 300 requests / 15 min",
      "Strict auth limit: 10 requests / 15 min on login, register and every OTP endpoint",
    ],
  },
  {
    title: "Authentication & sessions",
    items: [
      "Passwords hashed with bcrypt (salted)",
      "Stateless JWT: protect rejects invalid tokens, optionalAuth accepts guests on public-with-personalisation routes",
      "Server refuses to start if JWT_SECRET is unset — never falls back to a weak default",
      "JWT lives in the OS Keychain/Keystore (expo-secure-store), not plain AsyncStorage",
      "Any 401 clears the whole session so the UI can't show stale logged-in state",
      "Time-limited email OTP for password reset, cleared once used",
      "Content-management routes sit behind a separate admin-key header, not tied to any app user account",
    ],
  },
  {
    title: "App hardening",
    items: [
      "ProGuard/R8 minification and resource shrinking in release builds",
      "console.* calls stripped from production bundles (babel plugin)",
      "Premium PDFs carry an on-screen watermark to discourage screenshot redistribution",
    ],
  },
];

export type ChallengeRow = { challenge: string; decision: string; tradeoff: string };

export const challenges: ChallengeRow[] = [
  { challenge: "Unreliable networks", decision: "Cache-first and file-based modules, with seed data as a last resort", tradeoff: "Content can be up to one sync behind" },
  { challenge: "AsyncStorage bloat", decision: "Moved large payloads to file storage plus the R2 manifest", tradeoff: "Needs a separate publish step after editing content" },
  { challenge: "Two languages, one author", decision: "Automatic translation on save", tradeoff: "Machine translation needs spot-checking, and answers are re-validated automatically" },
  { challenge: "Express 5 broke security middleware", decision: "Wrote a custom sanitiser and query parser", tradeoff: "More code to own and maintain" },
  { challenge: "Free-tier sleeping server", decision: "Wake-up ping plus serving content from the R2 edge cache", tradeoff: "First API call after idle can still be slow" },
  { challenge: "Badge farming", decision: "Passes deduplicated per module per day", tradeoff: "Slower badge progress for honest users" },
  { challenge: "~120 screens in one stack", decision: "Shared quiz/study/notes components reused across every track", tradeoff: "Adding a track still means registering screens by hand" },
];

export const results = {
  stats: [
    { label: "Downloads on Google Play", value: "1,000+" },
    { label: "Average Play Store rating", value: "4.3" },
  ],
  pending: [
    "Active users / DAU",
    "Review count behind the 4.3 rating",
    "Retention or streak stats (Firebase Analytics)",
    "Content volume — questions, notes, mock sets",
    "A notable user feedback quote",
  ],
};

export const learnings: string[] = [
  "Offline-first is a data-design problem, not a UI trick. Versioning, atomic writes, and eviction mattered more than any spinner.",
  "Build for the device your users actually own. Storage and memory limits on budget Android phones drove the biggest architectural change (Gen 1 → Gen 2).",
  "Automate the boring half. The bilingual plugin and the hash-diffed publish script are why one person can run 10+ exam tracks in two languages.",
  "Framework upgrades can quietly break security. The Express 5 req.query change turned popular sanitisers into crashes, and I only understood why by reading the source.",
];

export const whatsNext: string[] = [
  "Automated tests: API integration tests and component tests for the quiz engine.",
  "Stronger auth: short-lived access tokens with refresh-token rotation and revocation, OTPs generated with crypto.randomInt and stored hashed, and constant-time admin-key comparison.",
  "A web admin dashboard to replace Postman-based content management.",
  "Moving the API off the free tier (or adding a keep-alive) to remove cold starts.",
  "A config-driven navigator to cut down on registering screens by hand.",
  "iOS release.",
];

export const caseStudyLinks = {
  // Set to a URL to link out; leave null to show the "private repository" note instead.
  github: null as string | null,
};
