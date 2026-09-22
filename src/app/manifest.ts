import type { MetadataRoute } from "next";
import { site } from "@content/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: `Portfolio of ${site.name}, a ${site.role.toLowerCase()} in ${site.city} building React, React Native and Node.js products.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0d1428",
    theme_color: "#0d1428",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
