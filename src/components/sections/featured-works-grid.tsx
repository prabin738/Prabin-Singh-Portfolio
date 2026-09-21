"use client";

import { useMemo, useState } from "react";
import { PROJECT_FILTERS, projects, type ProjectCategory } from "@content/data/projects";
import { BentoGrid } from "@/components/bento/bento-grid";
import { ProjectCard } from "@/components/sections/project-card";
import { cn } from "@/lib/utils";

// Hand-picked per slug rather than inferred, so hierarchy (doc 02, principle 2)
// stays a deliberate choice: the shipped, numbers-backed product is Large,
// the other products are Wide, and the API-only case studies are Small.
const TILE_SIZE: Record<string, "small" | "wide" | "large"> = {
  "mero-loksewa": "large",
  "max-media-survey-app": "wide",
  "max-media-admin-dashboard": "wide",
  "invoice-app": "wide",
  "mero-loksewa-backend": "small",
  "max-media-backend": "small",
  "invoice-app-backend": "small",
};

const ordered = [...projects].sort((a, b) => a.order - b.order);

export function FeaturedWorksGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const visible = useMemo(
    () => (filter === "all" ? ordered : ordered.filter((project) => project.categories.includes(filter))),
    [filter],
  );

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter featured works by category" className="flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
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

      <BentoGrid>
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} size={TILE_SIZE[project.slug] ?? "small"} />
        ))}
      </BentoGrid>
    </div>
  );
}
