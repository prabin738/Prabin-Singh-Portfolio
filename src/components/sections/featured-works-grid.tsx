"use client";

import { useMemo, useRef, useState } from "react";
import { PROJECT_FILTERS, getProject, projects, type ProjectCategory } from "@content/data/projects";
import { BentoGrid } from "@/components/bento/bento-grid";
import { ProjectCard } from "@/components/sections/project-card";
import { useAutoSlide } from "@/hooks/use-auto-slide";
import { cn } from "@/lib/utils";

// Hand-picked per slug rather than inferred, so hierarchy (doc 02, principle 2)
// stays a deliberate choice: the shipped, numbers-backed product leads the
// list, the products are Wide, and the API-only case studies are Small.
// Mero Loksewa was previously "large" (row-span-2) to stand out further, but
// that reserves a full extra grid row no card's own content fills, leaving
// dead space CSS Grid won't let a later card reclaim; ordering carries the
// emphasis instead.
const TILE_SIZE: Record<string, "small" | "wide" | "large"> = {
  "mero-loksewa": "wide",
  "max-media-survey-app": "wide",
  "max-media-admin-dashboard": "wide",
  "invoice-app": "wide",
  "mero-loksewa-backend": "small",
  "max-media-backend": "small",
  "invoice-app-backend": "small",
};

const ordered = [...projects].sort((a, b) => a.order - b.order);

// max-media-admin-dashboard (a 4:3 web screenshot) and invoice-app (a 9:16
// phone screenshot) land Wide-by-Wide in the same grid row. CSS Grid sizes
// that row to the taller card, and since neither card stretches to fill it
// (BentoGrid uses items-start), the dashboard card is left with a block of
// dead space beneath it that the small API cards — one full row further
// down — can never back-fill; same limitation the comment above works
// around for row-span. Nesting the API cards under the dashboard card here
// uses that space directly instead.
const SHORT_WIDE_SLUG = "max-media-admin-dashboard";
const TALL_WIDE_SLUG = "invoice-app";
const NESTED_SMALL_SLUGS = ["mero-loksewa-backend", "max-media-backend", "invoice-app-backend"];

export function FeaturedWorksGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const filterTrackRef = useRef<HTMLDivElement>(null);
  useAutoSlide(filterTrackRef);

  const visible = useMemo(
    () => (filter === "all" ? ordered : ordered.filter((project) => project.categories.includes(filter))),
    [filter],
  );

  // The nested layout below assumes the full, default-ordered project set;
  // any active filter changes that set, so it falls back to plain grid flow.
  const useCuratedLayout = filter === "all";

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={filterTrackRef}
        role="group"
        aria-label="Filter featured works by category"
        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible"
      >
        {PROJECT_FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={cn(
                "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "border border-line-strong text-muted hover:bg-raised hover:text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {useCuratedLayout ? <CuratedFeaturedGrid /> : (
        <BentoGrid>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} size={TILE_SIZE[project.slug] ?? "small"} />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}

function CuratedFeaturedGrid() {
  const shortWide = getProject(SHORT_WIDE_SLUG)!;
  const tallWide = getProject(TALL_WIDE_SLUG)!;
  const nestedSmall = NESTED_SMALL_SLUGS.map((slug) => getProject(slug)!);
  const topRow = ordered.filter(
    (project) => project.slug !== SHORT_WIDE_SLUG && project.slug !== TALL_WIDE_SLUG && !NESTED_SMALL_SLUGS.includes(project.slug),
  );

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
      <BentoGrid>
        {topRow.map((project) => (
          <ProjectCard key={project.slug} project={project} size={TILE_SIZE[project.slug] ?? "small"} />
        ))}
      </BentoGrid>

      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-3.5 lg:gap-4">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
          <ProjectCard project={shortWide} size="wide" />
          <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
            {nestedSmall.map((project) => (
              <ProjectCard key={project.slug} project={project} size="small" />
            ))}
          </div>
        </div>
        <div>
          <ProjectCard project={tallWide} size="wide" />
        </div>
      </div>
    </div>
  );
}
