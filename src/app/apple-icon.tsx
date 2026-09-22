import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// No border-radius here: iOS applies its own corner mask to apple-touch-icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1428",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <span style={{ fontSize: 104, fontWeight: 700, color: "#d62b4f" }}>P</span>
      </div>
    ),
    size,
  );
}
