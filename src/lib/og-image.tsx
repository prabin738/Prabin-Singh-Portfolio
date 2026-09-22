import { SITE_URL } from "@content/data/site";

// Shared 1200x630 template for opengraph-image.tsx / twitter-image.tsx at
// both the site root and /projects/[slug]. Kept as plain inline styles
// (no next/font) so the build never depends on fetching a font file over the
// network — see docs/08-seo-performance.md section 3.
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

const BG = "#0d1428";
const LINE = "#2a3560";
const TEXT = "#f3f5fb";
const MUTED = "#a9b2ce";
const PRIMARY = "#ff6b85";
const MARIGOLD = "#f5b942";

type OgImageTemplateProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function OgImageTemplate({ eyebrow, title, subtitle }: OgImageTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: BG,
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, backgroundColor: PRIMARY }} />
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: MARIGOLD, letterSpacing: -0.5 }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: 700,
            color: TEXT,
            letterSpacing: -1.5,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: MUTED, maxWidth: 980 }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `2px solid ${LINE}`,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: MUTED }}>{SITE_URL.replace(/^https?:\/\//, "")}</div>
        <div style={{ display: "flex", fontSize: 24, color: MUTED }}>Full-stack developer</div>
      </div>
    </div>
  );
}
