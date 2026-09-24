# Max Media Survey Console — Case Study Content

Source material for the portfolio case-study page, filled in from this repo's
code and git history. Sections follow the page flow below; each one is written
as a ready-to-paste JS/TS object matching the export shape it maps to, so it
can be dropped straight into the case-study data file. A ready-made prompt for
generating that file with Claude is at the very end.

## Page flow (reference)

Page header (from `projects.ts`, shared by every project): breadcrumb → status
→ title → summary → stack chips → screenshot gallery, then the case study
intro (not in the table of contents), then the numbered blocks below.

| #   | Block                     | Export                             | Shape                                                              |
| --- | ------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| 0   | Table of contents         | `SECTIONS`                         | `{ id, label }[]`                                                  |
| 1   | Fact strip (3 cards)      | `factStrip`                        | `{ label, value }[]`: Role, Platform, Timeline                     |
| 2   | Source link               | `caseStudyLinks.github`            | `string \| null`                                                   |
| 3   | At a glance table         | `atAGlance`                        | `{ label, value }[]`: scope, surface, backend, languages, offline  |
| 4   | TL;DR box                 | `tldr`                             | `string[]`, 3 bullets                                              |
| 5   | The problem               | `problem`                          | `{ intro, points: string[], goal }`                                |
| 6   | Target users              | `users`                            | `{ primary, secondary, constraints }`                              |
| 7   | The solution              | `solution`                         | `{ intro, parts: {title, body}[] (3), features: {title, body}[] }` |
| 8   | Tech stack                | `stackGroups`                      | `{ label, items: string[] }[]`                                     |
| 9   | System architecture       | `architecture`                     | nodes, connector labels, `publishNote`, `flow`                     |
| 10  | System design highlights  | `highlights` + `alsoInTheCodebase` | `{ title, summary, deepDive: string[] }[]` + `string[]`            |
| 11  | Security                  | `securityGroups`                   | `{ title, items: string[] }[]` (3 columns)                         |
| 12  | Challenges and trade-offs | `challenges`                       | `{ challenge, decision, tradeoff }[]`                              |
| 13  | Results                   | `results`                          | `{ stats: {label,value}[], pending: string[] }`                    |
| 14  | What I learned            | `learnings`                        | `string[]`                                                         |
| 15  | What's next               | `whatsNext`                        | `string[]`                                                         |

---

## Page header

- **Breadcrumb:** Case Studies
- **Status:** Shipped / In production
- **Title:** Max Media Survey Console
- **Summary:** An admin web console that turns raw CAPI field-survey submissions into live dashboards and a client-exact Excel deliverable for a Nepal-based market research operation.
- **Stack chips:** React, Vite, Tailwind CSS, React Router, Recharts, SheetJS (xlsx)
- **Screenshot gallery:** `image.png`, `image-1.png` (dashboard + report views, already in the repo root)

---

## 0. Table of contents

```js
export const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "users", label: "Target users" },
  { id: "solution", label: "The solution" },
  { id: "stack", label: "Tech stack" },
  { id: "architecture", label: "System architecture" },
  { id: "highlights", label: "System design highlights" },
  { id: "security", label: "Security" },
  { id: "challenges", label: "Challenges and trade-offs" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "What I learned" },
  { id: "whats-next", label: "What's next" },
];
```

## 1. Fact strip

```js
export const factStrip = [
  { label: "Role", value: "Sole developer (frontend + data mapping)" },
  {
    label: "Platform",
    value: "Web admin console (paired with a companion Android CAPI field app)",
  },
  { label: "Timeline", value: "Jun 2026 – Sep 2026 (~28 commits, ongoing)" },
];
```

## 2. Source link

```js
export const caseStudyLinks = {
  github: null, // private client repository
};
```

## 3. At a glance

```js
export const atAGlance = [
  {
    label: "Scope",
    value:
      "Internal admin console for a market-research survey operation — brand awareness/usage tracking for 60+ beverage brands across all 7 provinces and 77 districts of Nepal",
  },
  {
    label: "Surface",
    value: "Desktop-first single-page app, light/dark themed",
  },
  {
    label: "Backend",
    value:
      "Consumes a REST API (Node/Express + MongoDB, hosted on Render's free tier); this repo is API-consumer only, no server code",
  },
  { label: "Languages", value: "JavaScript (JSX), CSS" },
  {
    label: "Offline",
    value:
      "None in the web console — offline capture happens in the companion field app; this console assumes connectivity and tolerates a cold-starting free-tier backend",
  },
];
```

## 4. TL;DR

```js
export const tldr = [
  "Built an admin console that turns raw CAPI survey submissions into live dashboards and a client-exact Excel export.",
  "Key technical idea: one shared mapper function drives both the on-screen 2,000+ column report table and the generated .xlsx file, so the two surfaces can never drift out of sync.",
  "Standout decision: treating the free-tier backend's ~60s cold start as a first-class UI state (a 'waking up' banner with bounded retries) instead of surfacing a raw network error.",
];
```

## 5. The problem

```js
export const problem = {
  intro:
    "Field interviewers collect CAPI (Computer-Assisted Personal Interviewing) survey responses on a companion mobile app. Each submission is a deeply nested JSON blob — screener, recruitment, classification, awareness, frequency, imagery, evaluation, context, and approval data — synced to MongoDB. The client needed to see this data as it arrived and hand off deliverables to their own research client in one exact, pre-agreed spreadsheet layout.",
  points: [
    "Raw survey JSON has no fixed shape a spreadsheet tool can read directly.",
    "The deliverable format is dictated by the client's existing template — column order and names are fixed, not negotiable.",
    "Stakeholders need a live read of collection progress (today's count, week-over-week trend, regional split), not just a nightly export.",
    "The tracked brand list (60+ beverages) and question set keep growing, and the mapper has to grow with it without breaking older records.",
  ],
  goal: "One data path from mobile submission to admin dashboard to Excel export — accurate, reproducible, and byte-for-byte matching the client's required column layout.",
};
```

## 6. Target users

```js
export const users = {
  primary:
    "Max Media's internal admin/ops staff who monitor field collection and produce the client deliverable.",
  secondary:
    "Field interviewers (indirectly, via the data they submit) and the end research client who receives the exported spreadsheet.",
  constraints:
    "Desktop-first office use; non-technical users, so error/retry states need to be self-explanatory (e.g. 'server waking up' rather than a fetch error); backend runs on a free hosting tier.",
};
```

## 7. The solution

```js
export const solution = {
  intro:
    "A React admin console with three cooperating pieces: authentication, live analytics, and a single source-of-truth data mapper that feeds both an in-app report table and the Excel export.",
  parts: [
    {
      title: "Guarded admin shell",
      body: "JWT-gated login, a persistent sidebar/topbar layout, and light/dark theming, all restored from localStorage on reload.",
    },
    {
      title: "Live dashboard",
      body: "Recharts-driven KPIs (total, today, week-over-week trend) plus a 7-day trend chart and region-distribution breakdown, refreshed on a 30s poll.",
    },
    {
      title: "One mapper, two surfaces",
      body: "mapSurveyDataToRow() turns each submission's nested JSON into the client's exact ~2,000-column row; the same row powers the on-screen Survey Report table and the generated .xlsx file.",
    },
  ],
  features: [
    {
      title: "Excel export with cell-level fixes",
      body: "Phone-number column is pinned to a plain-integer cell format so Excel can't render it in scientific notation.",
    },
    {
      title: "Excel-style table controls",
      body: "Per-column filtering, search, and pagination over a 2,000+ column report table.",
    },
    {
      title: "Row marking",
      body: "Lets a user flag a row so it stays recognizable while scanning a very wide table.",
    },
    {
      title: "Nepal admin-hierarchy lookups",
      body: "Province/district code-to-name tables mirroring the real 7-province, 77-district structure.",
    },
    {
      title: "Resilient login",
      body: "Pings and retries a cold, free-tier backend instead of failing immediately on the first request.",
    },
  ],
};
```

## 8. Tech stack

```js
export const stackGroups = [
  {
    label: "Frontend",
    items: ["React 19", "React Router v7", "Vite 8", "@vitejs/plugin-react"],
  },
  {
    label: "Styling",
    items: [
      "Tailwind CSS v4 (@tailwindcss/vite)",
      "CSS custom-property theme tokens",
      "Light/dark mode via a `.dark` class + `color-mix(in oklab, ...)`",
    ],
  },
  {
    label: "Data & visualization",
    items: [
      "Recharts (Bar/Pie charts)",
      "SheetJS (xlsx) for Excel generation",
      "lucide-react icons",
    ],
  },
  {
    label: "Auth & API",
    items: [
      "Fetch-based REST client",
      "JWT stored in localStorage",
      "Environment-driven API base URL (VITE_API_URL)",
    ],
  },
  {
    label: "Tooling",
    items: [
      "ESLint 10 flat config",
      "eslint-plugin-react-hooks",
      "eslint-plugin-react-refresh",
    ],
  },
];
```

## 9. System architecture

```js
export const architecture = {
  nodes: [
    {
      title: "Field App",
      subtitle: "Android, CAPI interviews",
      items: [
        "Captures nested survey JSON",
        "Syncs to backend with syncedAt timestamp",
      ],
    },
    {
      title: "Backend API",
      subtitle: "Node/Express + MongoDB, on Render (free tier)",
      items: ["POST /api/admin/login", "GET /api/surveys", "GET /api/stats"],
    },
    {
      title: "Admin Console",
      subtitle: "This repo — React SPA",
      items: [
        "Login / JWT session",
        "Dashboard, Survey Report, Get Report, Drinks, Districts",
        "csvMapper.js + locationMapper.js",
      ],
    },
  ],
  connectorLabels: ["submits survey JSON", "REST + JWT", "shared row mapper"],
  publishNote:
    "The backend and the mobile field app are separate repositories; this codebase is the read-mostly admin surface.",
  flow: "An interviewer submits a survey in the field app, which POSTs the raw nested JSON to the backend and stores it in MongoDB with a syncedAt timestamp. The admin console's Login screen exchanges credentials for a JWT via /api/admin/login, pinging the backend on mount to pre-warm a sleeping Render instance before the user even finishes typing. Once authenticated, the Dashboard and Survey Report pages both call /api/surveys and /api/stats, and both run each record's surveyData JSON through the same parseSurveyRecord / mapSurveyDataToRow functions before rendering charts, filling the report table, or handing rows to SheetJS for the .xlsx export.",
};
```

## 10. System design highlights

```js
export const highlights = [
  {
    title: "Shared mapper, two consumers",
    summary:
      "The same mapSurveyDataToRow function drives both the live report table and the Excel export, so they can't drift apart.",
    deepDive: [
      "TARGET_HEADERS is the literal, client-specified column order — over 2,000 entries covering screener, recruitment, classification, awareness (BA), consumption (BC), loyalty (BL), and context fields.",
      "The Survey Report table and the Excel export both consume the same mapped row shape, eliminating a whole class of 'looks right on screen, wrong in the export' bugs.",
      "New brands or questions are added by extending TARGET_HEADERS and the mapper in one place, not per-screen.",
    ],
  },
  {
    title: "Cold-start-aware auth",
    summary:
      "Login treats a sleeping free-tier backend as an expected state, not an error.",
    deepDive: [
      "The Login screen fires a best-effort ping to the backend on mount so cold-start begins before the user finishes typing.",
      "On submit, failed requests are retried on a fixed interval up to a bounded max wait, with a visible 'server is waking up' state instead of an immediate failure.",
    ],
  },
  {
    title: "Wide-table performance",
    summary:
      "A 2,000+ column table needs deliberate layout choices, not the browser's defaults.",
    deepDive: [
      "Fixed per-column widths + table-fixed layout avoid recalculating layout on every render.",
      "Search, per-column (Excel-style) filters, and pagination all run client-side over the same in-memory row set.",
    ],
  },
  {
    title: "Theme system via CSS custom properties",
    summary:
      "Light/dark tokens are mapped into Tailwind v4's @theme layer instead of duplicating class variants.",
    deepDive: [
      "Brand colors, surfaces, and borders are defined once as CSS variables and re-mapped under a .dark class.",
      "Row-stripe/marked-row tints use color-mix(in oklab, ...) against solid (non-transparent) colors so they stay legible under sticky columns instead of letting scrolled content bleed through.",
    ],
  },
];

export const alsoInTheCodebase = [
  "Week-over-week percentage trend calculation for the KPI cards",
  "Nepal province/district lookup tables (7 provinces, 77 districts) with a numeric-code-to-name helper",
  "Row-marking state modeled as a Set, keyed by a stable per-record identifier",
  "A WhatsApp deep link on the login screen for support instead of a ticketing system",
];
```

## 11. Security

```js
export const securityGroups = [
  {
    title: "Authentication",
    items: [
      "JWT issued by the backend on login, kept in localStorage",
      "Protected routes redirect unauthenticated users to /login",
      "Login retries a waking backend instead of leaking raw fetch errors to the user",
    ],
  },
  {
    title: "Data handling",
    items: [
      "API base URL comes from a VITE_API_URL environment variable, not a hardcoded value",
      ".env files are gitignored",
      "No PII is surfaced beyond what the client's own survey schema already collects (name, phone, address)",
    ],
  },
  {
    title: "Client-side hardening",
    items: [
      "Every survey record is JSON.parse'd inside a try/catch so one malformed record can't crash the dashboard",
      "Excel cell formats are explicitly controlled (e.g. phone numbers forced to a plain-integer format) to avoid Excel silently reinterpreting data",
    ],
  },
];
```

## 12. Challenges and trade-offs

```js
export const challenges = [
  {
    challenge:
      "Excel rendered long phone numbers in scientific notation (9.8E+09)",
    decision:
      "Explicitly set the PhoneNumber column's cell format to a plain integer ('0') and widened the column",
    tradeoff:
      "A fixed cell format doesn't auto-fit like Excel's default 'General' format, and an earlier fix accidentally broke Excel's Ctrl+Arrow 'jump to edge of data' navigation — later restored as its own fix",
  },
  {
    challenge:
      "The backend returns surveys newest-first, but exports need chronological QSN numbering",
    decision:
      "Reverse the API response before assigning row numbers (switching from a LIFO to a FIFO read of the data)",
    tradeoff:
      "Correctness now depends on the API's sort order staying strictly reverse-chronological",
  },
  {
    challenge:
      "The tracked brand list grew from ~30 to 60+ beverages across several question blocks (BC11, BC12, BC41, BC42, BC43)",
    decision:
      "Expand TARGET_HEADERS and the mapper incrementally, block by block, as the client added brands",
    tradeoff:
      "A flat, ~2,000-column hardcoded schema is simple to reason about per-column but expensive to extend and easy to mis-align — several commits exist solely to fix column drift",
  },
  {
    challenge:
      "Brands selected in the app's BA1/BA2/BA3 awareness screens weren't showing up in the BC1/BC3/BC4/BC7 columns of the exported Excel, despite looking correct in the app",
    decision:
      "Trace and fix the cross-field derivation in the mapper so exported columns match the app's own selection state",
    tradeoff:
      "The mapper now encodes business rules that live implicitly in the mobile app's data model, so the two must be kept in sync by hand",
  },
  {
    challenge:
      "The backend runs on Render's free tier and cold-starts in up to ~60 seconds",
    decision:
      "Ping the backend as soon as the login page mounts, and retry login on a fixed interval with a bounded max wait plus a visible 'waking up' state",
    tradeoff:
      "Users still wait out a cold start on the very first request of a session; this only smooths the experience, it doesn't eliminate the delay",
  },
  {
    challenge:
      "A 2,000+ column table caused layout thrashing and slow search/filter",
    decision:
      "Switch to table-fixed with explicit per-column widths, plus client-side pagination and Excel-style per-column filters",
    tradeoff:
      "All filtering/search happens in-memory on the client, which won't scale indefinitely as survey volume grows",
  },
];
```

## 13. Results

```js
export const results = {
  stats: [
    { label: "Provinces covered", value: "7" },
    { label: "Districts mapped", value: "77" },
    { label: "Beverage brands tracked", value: "60+" },
    { label: "Exported columns per survey", value: "2,000+" },
  ],
  pending: [
    "Total surveys collected in production",
    "Number of active admin users",
    "Time saved vs. the previous manual Excel process",
  ],
};
```

## 14. What I learned

```js
export const learnings = [
  "Treating a spreadsheet template as a hard contract (exact headers, exact order) works best behind one shared mapping function, not duplicated per-screen logic.",
  "Free-tier hosting cold-starts are a real UX problem, not just a backend inconvenience — worth designing an explicit UI state for it.",
  "Rendering very wide tables needs deliberate layout choices (fixed widths, table-layout: fixed) or the browser fights you on every render.",
  "Domain lookup tables (province/district, brand codes) are worth centralizing even when the 'real' source of truth is a client spreadsheet, because the UI needs the same mapping in more than one place.",
];
```

## 15. What's next

```js
export const whatsNext = [
  "Move the session token out of localStorage into a more XSS-resistant storage strategy.",
  "Normalize the 2,000+ column brand/question schema behind a smaller, versioned config instead of one flat header array.",
  "Add role-based access so field-level admins and view-only stakeholders don't share a single login.",
  "Move filtering/pagination server-side once survey volume outgrows client-side handling.",
];
```

---

## Prompt for Claude

Copy everything between the lines below into a Claude conversation inside the
portfolio repo (the one that defines the case-study page and its `projects.ts`)
to generate the actual case-study data file from this content.
