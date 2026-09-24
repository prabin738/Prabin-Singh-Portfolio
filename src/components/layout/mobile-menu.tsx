"use client";

import { useRef } from "react";
import { NavLink } from "@/components/layout/nav-link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  navItems: NavItem[];
  cvHref: string;
};

export function MobileMenu({ navItems, cvHref }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeMenu = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg"
      >
        <Menu size={20} aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="top-0 m-0 max-h-dvh w-full max-w-none overflow-y-auto bg-bg p-6 text-fg backdrop:bg-bg/70"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-lg font-medium text-fg hover:bg-raised"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          href={cvHref}
          download
          variant="primary"
          onClick={closeMenu}
          className="mt-8 w-full"
        >
          Download CV
        </Button>
      </dialog>
    </div>
  );
}
