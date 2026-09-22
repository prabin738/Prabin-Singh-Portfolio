import type { MetadataRoute } from "next";
import { projects } from "@content/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
