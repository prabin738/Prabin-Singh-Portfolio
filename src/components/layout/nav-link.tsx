"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link> & { href: string };

// next/link ignores a click when the URL already carries the same hash, so
// re-clicking "/#projects" after scrolling away does nothing. Scroll manually
// when the target section is on the current page.
export function NavLink({ href, onClick, ...props }: NavLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const [path, hash] = href.split("#");
    if (!hash || (path || pathname) !== pathname) return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    // Uses the CSS scroll-behavior and scroll-padding-top set on <html>.
    target.scrollIntoView();
    if (window.location.hash !== `#${hash}`) {
      window.history.pushState(null, "", `#${hash}`);
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
