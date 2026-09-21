"use client";

import { getImage } from "@/lib/images";

const FALLBACK_WIDTH = 1080;

type ImageLoaderParams = {
  src: string;
  width: number;
};

export default function imageLoader({ src, width }: ImageLoaderParams) {
  const entry = getImage(src);
  if (!entry) return `${src}-${FALLBACK_WIDTH}.webp`;

  const chosenWidth = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  return `${src}-${chosenWidth}.webp`;
}
