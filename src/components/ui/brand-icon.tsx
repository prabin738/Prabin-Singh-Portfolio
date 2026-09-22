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

// Decorative: every current usage pairs this icon with adjacent visible text,
// so it carries no separate accessible name (docs/06-components.md: "decorative
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
