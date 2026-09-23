"use client";

import { useState } from "react";
import { ListChecks, X } from "lucide-react";

export type TocSection = { id: string; label: string };

type CaseStudyTocProps = {
  sections: readonly TocSection[];
};

// Desktop-only: fixed to the viewport edge rather than the article column, so
// it stays put while the long-form case study scrolls underneath it.
export function CaseStudyToc({ sections }: CaseStudyTocProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        className="fixed top-1/2 right-4 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface text-fg shadow-lg transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg lg:inline-flex"
      >
        <ListChecks size={18} aria-hidden />
      </button>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-1/2 right-4 z-30 hidden w-64 -translate-y-1/2 rounded-2xl border border-line bg-surface p-4 shadow-lg lg:block"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-subtle">On this page</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Collapse table of contents"
          className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-subtle hover:bg-raised hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg"
        >
          <X size={14} aria-hidden />
        </button>
      </div>
      <ul className="mt-3 flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-raised hover:text-fg"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
