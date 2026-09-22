import { SITE_URL } from "@content/data/site";

/** Joins a root-relative path (or passes an already-absolute URL through) onto SITE_URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Preview deployments (and any build that isn't a Vercel production build,
// including a plain local `next build`) must not be indexed — see
// docs/08-seo-performance.md section 2. VERCEL_ENV is set by Vercel at build
// time and isn't NEXT_PUBLIC_-prefixed, but that's fine: robots.ts, the root
// layout's metadata and sitemap.ts all resolve at build time, never in the
// browser, so nothing here reaches client JS.
export const isProductionDeploy = process.env.VERCEL_ENV === "production";
