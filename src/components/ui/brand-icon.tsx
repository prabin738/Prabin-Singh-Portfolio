import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

type BrandIconProps = {
  /** simple-icons slug, e.g. "react" for the siReact export. */
  slug: string;
  size?: number;
  className?: string;
};

function resolveIcon(slug: string): SimpleIcon | undefined {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof simpleIcons;
  const icon = simpleIcons[key];
  return typeof icon === "object" ? (icon as SimpleIcon) : undefined;
}

// Decorative: pair this icon with either adjacent visible text or an
// aria-label on the enclosing link (docs/06-components.md: "decorative
// unless labelled"). Renders nothing for a slug simple-icons doesn't have.
export function BrandIcon({ slug, size = 20, className }: BrandIconProps) {
  const icon = resolveIcon(slug);
  if (!icon) return null;

  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={icon.path} />
    </svg>
  );
}

// simple-icons and lucide-react both dropped their LinkedIn glyph (trademark
// takedown). Standard "in" badge path, same treatment as BrandIcon: decorative,
// currentColor fill.
export function LinkedinIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.09 108 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.2-53.79 54.2zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}
