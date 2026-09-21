import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // TODO(prabin): replace with the custom loader and image script from
  // docs/03-tech-stack-architecture.md section 6.
  images: { unoptimized: true },
};

export default nextConfig;
