// Interim content source for the home page Featured works section.
//
// The full content pipeline in docs/07-content-and-data.md (Zod schema,
// content/projects/<slug>.mdx, lib/content.ts) is milestone M3 and not built
// yet. Until then, this file is the single source for project cards, kept
// close enough to that future schema (slug, title, summary, status, type,
// stack, cover) that moving each entry into its own .mdx file later is a
// mechanical change, not a rewrite.

export type ProjectStatus = "live" | "in-progress" | "client-work";
export type ProjectType = "mobile" | "web" | "backend";
export type ProjectCategory = "frontend" | "backend" | "website" | "mobile-app";

export type ExternalAction = {
  kind: "playstore" | "download";
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line that states the result. Sentence case, no invented numbers. */
  summary: string;
  status: ProjectStatus;
  /** Overrides the default label for `status` when the generic word isn't accurate for this project. */
  statusLabel?: string;
  type: ProjectType;
  /** Tags the Featured works filter pills match against. */
  categories: ProjectCategory[];
  /** Empty when the stack isn't confirmed yet; the card omits the chip row. */
  stack: string[];
  cover: { src: string; alt: string };
  /** Extra screenshots shown on the case-study page, below the cover. */
  gallery?: { src: string; alt: string }[];
  /** A live product link shown as its own button (Play Store, an APK download, ...). */
  externalAction?: ExternalAction;
  /** Slug of the app a backend project powers, for the "Full stack" pairing note. */
  pairsWith?: string;
  /** Display order on the home page; lower shows first. */
  order: number;
};

export const projects: Project[] = [
  {
    slug: "mero-loksewa",
    title: "Mero Loksewa",
    summary: "Exam-prep app live on Google Play with 1,000+ downloads and a 4.3 rating.",
    status: "live",
    statusLabel: "Live on Google Play",
    type: "mobile",
    categories: ["frontend", "mobile-app"],
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    cover: {
      src: "/img/projects/mero-loksewa/homepage",
      alt: "Mero Loksewa home screen with the daily quiz banner and popular exam categories",
    },
    gallery: [
      {
        src: "/img/projects/mero-loksewa/homepage-2",
        alt: "Mero Loksewa home screen showing practice sets grouped by section",
      },
      {
        src: "/img/projects/mero-loksewa/forum",
        alt: "Mero Loksewa forum screen with a question feed, likes and replies",
      },
      {
        src: "/img/projects/mero-loksewa/leaderboard",
        alt: "Mero Loksewa leaderboard screen ranking users by XP",
      },
      {
        src: "/img/projects/mero-loksewa/profile",
        alt: "Mero Loksewa profile screen showing streak, points, rank and earned badges",
      },
    ],
    externalAction: {
      kind: "playstore",
      label: "View on Google Play",
      href: "https://play.google.com/store/apps/details?id=com.prabin.meroloksewa",
    },
    order: 1,
  },
  {
    slug: "max-media-survey-app",
    title: "Max Media survey app",
    summary: "Field survey app for Max Media that keeps working offline and syncs submissions when signal returns.",
    status: "client-work",
    type: "mobile",
    categories: ["frontend", "mobile-app"],
    stack: ["React Native", "SQLite", "Zustand", "MongoDB"],
    cover: {
      src: "/img/projects/max-media-survey-app/cover",
      alt: "Max Media survey app home screen showing sync status and daily survey overview",
    },
    gallery: [
      {
        src: "/img/projects/max-media-survey-app/max-1",
        alt: "Max Media survey app interviewer and respondent information form",
      },
      {
        src: "/img/projects/max-media-survey-app/max-2",
        alt: "Max Media survey app saved reports screen listing draft submissions",
      },
    ],
    externalAction: {
      kind: "download",
      label: "Download APK",
      href: "/downloads/max-media-survey-app.apk",
    },
    order: 2,
  },
  {
    slug: "max-media-admin-dashboard",
    title: "Max Media admin dashboard",
    summary: "Web dashboard for Max Media's field survey operations: live filters, charts and Excel export.",
    status: "client-work",
    type: "web",
    categories: ["frontend", "website"],
    stack: ["React", "Tailwind CSS", "Recharts", "MongoDB"],
    cover: {
      src: "/img/projects/max-media-admin-dashboard/cover",
      alt: "Max Media admin dashboard overview with survey totals, a weekly trend chart and region distribution",
    },
    gallery: [
      {
        src: "/img/projects/max-media-admin-dashboard/max-media-admin-dashboard-login-page",
        alt: "Max Media admin dashboard login screen",
      },
      {
        src: "/img/projects/max-media-admin-dashboard/max-media-admin-dashboard-reports",
        alt: "Max Media admin dashboard report screen with province and district filters and a gender breakdown table",
      },
      {
        src: "/img/projects/max-media-admin-dashboard/max-media-admin-dashboard-report-2",
        alt: "Max Media admin dashboard breakdown comparison chart and SEC report table",
      },
    ],
    order: 3,
  },
  {
    slug: "invoice-app",
    title: "SajiloBill",
    summary:
      "Invoicing and accounting app for small businesses: create invoices, track inventory and customer credit, and run full double-entry bookkeeping reports.",
    status: "live",
    type: "mobile",
    categories: ["frontend", "mobile-app"],
    stack: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB"],
    cover: {
      src: "/img/projects/invoice-app/cover",
      alt: "SajiloBill home screen showing today's sales, credit sales and quick actions",
    },
    gallery: [
      {
        src: "/img/projects/invoice-app/invoices",
        alt: "SajiloBill invoices list with paid, partially paid and unpaid filters",
      },
      {
        src: "/img/projects/invoice-app/items",
        alt: "SajiloBill items screen showing stock levels and margin per item",
      },
      {
        src: "/img/projects/invoice-app/customers",
        alt: "SajiloBill customers screen showing lifetime sales and credit due",
      },
      {
        src: "/img/projects/invoice-app/reports",
        alt: "SajiloBill reports screen with sales, profit, expenses and pending invoices",
      },
    ],
    externalAction: {
      kind: "download",
      label: "Download APK",
      href: "/downloads/sajilobill.apk",
    },
    order: 4,
  },
  {
    slug: "mero-loksewa-backend",
    title: "Mero Loksewa API",
    summary: "The Node.js and Express REST API behind Mero Loksewa: authentication, content delivery and MongoDB queries, deployed on Render.",
    status: "live",
    statusLabel: "Live in production",
    type: "backend",
    categories: ["backend"],
    stack: ["Node.js", "Express", "MongoDB", "Cloudflare R2"],
    cover: {
      src: "/img/projects/mero-loksewa-backend/cover",
      alt: "Mero Loksewa API — sample request and response for a quiz endpoint",
    },
    pairsWith: "mero-loksewa",
    order: 5,
  },
  {
    slug: "max-media-backend",
    title: "Max Media API",
    summary: "The Node.js and Express API behind the Max Media survey app and dashboard: authenticated endpoints, background sync and server-side filtering.",
    status: "client-work",
    type: "backend",
    categories: ["backend"],
    stack: ["Node.js", "Express", "MongoDB"],
    cover: {
      src: "/img/projects/max-media-backend/cover",
      alt: "Max Media API — sample request and response for a survey submission endpoint",
    },
    pairsWith: "max-media-survey-app",
    order: 6,
  },
  {
    slug: "invoice-app-backend",
    title: "SajiloBill API",
    summary:
      "The Node.js and Express API behind SajiloBill: invoices, inventory, customer credit and double-entry accounting records, backed by MongoDB.",
    status: "live",
    statusLabel: "Live in production",
    type: "backend",
    categories: ["backend"],
    stack: ["Node.js", "Express", "MongoDB"],
    cover: {
      src: "/img/projects/invoice-app-backend/cover",
      alt: "SajiloBill API — sample request and response for an invoice creation endpoint",
    },
    pairsWith: "invoice-app",
    order: 7,
  },
];

export const PROJECT_FILTERS: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Website", value: "website" },
  { label: "Mobile App", value: "mobile-app" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
