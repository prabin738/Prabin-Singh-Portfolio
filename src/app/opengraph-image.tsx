import { ImageResponse } from "next/og";
import { site } from "@content/data/site";
import { OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE, OgImageTemplate } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.role} in ${site.city}`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow={`${site.role} in ${site.city}`}
        title={site.name}
        subtitle="React and React Native apps, with the Node.js APIs behind them."
      />
    ),
    size,
  );
}
