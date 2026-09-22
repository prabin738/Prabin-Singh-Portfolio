// Interim content source for the home page Experience section, same pattern
// as projects.ts and stack.ts. Entries come from docs/04-content-copy.md
// section 6.

export type ExperienceEntry = {
  role: string;
  company: string;
  dates: string;
  /** The active role: gets the highlighted dot and a "Present" ending. */
  current?: boolean;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    company: "Clicklab Digital",
    dates: "Aug 2025 – Present",
    current: true,
    bullets: [
      "Designed and built the Max Media survey app, its backend and the admin dashboard single-handedly, from system design through deployment — React Native and React with Tailwind CSS on the frontend, Node.js, Express.js and MongoDB on the backend, deployed on Render.",
      "Integrated the Google Maps API into the survey app to track field surveyors' live location.",
      "Documented and tested every REST endpoint in Postman before rollout.",
      "Added JWT authentication, rate limiting and Redis caching to keep the API secure and fast under load.",
      "Leading the ground-up rebuild of the company website.",
    ],
  },
  {
    role: "WooCommerce Developer and E-Commerce Executive",
    company: "Clicklab Digital",
    dates: "Mar 2025 – Aug 2025",
    bullets: [
      "Integrated FedEx tracking into the store's order flow.",
      "Tuned slow WooCommerce database queries for faster page loads.",
      "Fixed sitemap and canonical URL issues affecting search indexing.",
      "Wired up Google Analytics 4 and Search Console for traffic and search visibility tracking.",
      "Watched Microsoft Clarity session recordings to spot checkout drop-off points and improve customer retention.",
    ],
  },
  {
    role: "SEO and Content Team Lead",
    company: "Adex International",
    dates: "Jul 2024 – Jan 2025",
    bullets: [
      "Led content strategy and technical SEO audits for clients across the DevOps and cloud infrastructure verticals.",
      "Directed site crawlability and indexation audits, working with client dev teams to fix blocked or orphaned pages.",
      "Used Microsoft Clarity session recordings and heatmaps to spot friction points and guide retention-focused content changes.",
      "Set keyword strategy and content calendars aligned to each client's product and audience.",
      "Reviewed GA4 and Search Console data with the team to prioritize fixes by traffic impact.",
    ],
  },
  {
    role: "SEO and Content Team Officer",
    company: "Adex International",
    dates: "Jan 2023 – Jun 2024",
    bullets: [
      "Ran technical SEO audits covering crawlability, indexation and overall site health for client websites.",
      "Diagnosed crawl errors, broken links and duplicate content using Screaming Frog and Search Console.",
      "Optimized on-page elements — titles, meta descriptions, headers and internal linking — for target keywords.",
      "Monitored Core Web Vitals and page speed, flagging fixes that were slowing indexation and rankings.",
      "Tracked traffic and engagement in GA4 to report on audit impact month over month.",
    ],
  },
  {
    role: "Junior SEO Expert",
    company: "Hansikar Technology",
    dates: "Jul 2022 – Dec 2022",
    bullets: [
      "Built and executed an SEO strategy from scratch that doubled the site's organic visits.",
      "Ran keyword research and mapped target terms to existing and new pages.",
      "Fixed on-page SEO issues — meta tags, header structure and image alt text — across the site.",
      "Audited site crawlability and submitted a cleaned-up sitemap to Google Search Console.",
      "Tracked rankings and organic traffic in Google Analytics to steer the strategy.",
    ],
  },
];
