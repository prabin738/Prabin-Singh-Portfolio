import type { MetadataRoute } from "next";
import { SITE_URL } from "@content/data/site";
import { isProductionDeploy } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Anything that isn't a Vercel production build (previews, local `next
  // build`) is disallowed outright so it can never get indexed by accident —
  // see docs/08-seo-performance.md section 2 and src/lib/seo.ts.
  if (!isProductionDeploy) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
