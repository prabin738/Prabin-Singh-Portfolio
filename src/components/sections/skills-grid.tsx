"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import {
  Blocks,
  Compass,
  Database,
  Eye,
  Gauge,
  GitBranch,
  Globe,
  Network,
  Palette,
  Puzzle,
  Search,
  Server,
  Sparkles,
  Terminal,
  Users,
  Wand2,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS, skills, type SkillCategory } from "@content/data/stack";
import { BentoGrid } from "@/components/bento/bento-grid";
import { BentoTile } from "@/components/bento/bento-tile";
import { BrandIcon } from "@/components/ui/brand-icon";
import { useAutoSlide } from "@/hooks/use-auto-slide";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<SkillCategory, LucideIcon> = {
  frontend: Blocks,
  design: Palette,
  backend: Server,
  database: Database,
  "cloud-deployment": GitBranch,
  "vibe-coding-tools": Wand2,
  other: Workflow,
  "soft-skills": Users,
};

// Keyed by skill name. A brand slug renders through simple-icons (BrandIcon);
// icon is a Lucide fallback for skills with no brand mark to draw on. `size`
// overrides the default 18px for marks that otherwise read heavier/lighter
// than their neighbors (dense glyphs like Gemini's sparkle or Postman's mark
// visually outweigh thinner logos at the same box size).
const SKILL_ICON: Record<string, { brand: string; size?: number } | { icon: LucideIcon; size?: number }> = {
  React: { brand: "react" },
  "React Native": { brand: "react" },
  Expo: { brand: "expo" },
  TypeScript: { brand: "typescript" },
  "Tailwind CSS": { brand: "tailwindcss" },
  Bootstrap: { brand: "bootstrap" },
  "Next.js": { brand: "nextdotjs" },
  Recharts: { icon: Gauge },
  Zustand: { icon: Blocks },

  "Figma basics": { brand: "figma" },
  "Stitch AI": { icon: Sparkles },

  "Node.js": { brand: "nodedotjs" },
  Express: { brand: "express" },
  "System Design": { icon: Network },
  "REST API design": { icon: Webhook },
  JWT: { brand: "jsonwebtokens" },
  "Rate limiting": { icon: Gauge },

  MongoDB: { brand: "mongodb" },
  Redis: { brand: "redis" },
  SQLite: { brand: "sqlite" },
  "Cloudflare R2": { brand: "cloudflare" },

  Git: { brand: "git" },
  GitHub: { brand: "github" },
  "CI/CD": { icon: Workflow },
  Render: { brand: "render" },
  Vercel: { brand: "vercel" },

  "Claude Code": { brand: "claude" },
  Cursor: { brand: "cursor" },
  "GitHub Copilot": { brand: "githubcopilot" },
  "Gemini Code Assist": { brand: "googlegemini", size: 15 },
  Codex: { icon: Terminal },

  Postman: { brand: "postman", size: 15 },
  "Google Play Console": { brand: "googleplay" },
  "Search Engine Optimization": { icon: Search },
  "Google Analytics 4": { brand: "googleanalytics" },
  "Search Console": { brand: "googlesearchconsole" },
  "Screaming Frog": { icon: Globe },
  "Microsoft Clarity": { icon: Eye },
  WooCommerce: { brand: "woocommerce" },

  "Problem solving": { icon: Puzzle },
  "Self-directed / ownership": { icon: Compass },
  "Client management": { icon: Users },
};

const FILTERS: { label: string; value: "all" | SkillCategory }[] = [{ label: "All", value: "all" }, ...SKILL_GROUPS];

function SkillIcon({ name }: { name: string }) {
  const entry = SKILL_ICON[name];
  if (!entry) return null;

  const size = entry.size ?? 18;
  if ("brand" in entry) {
    return <BrandIcon slug={entry.brand} size={size} />;
  }

  const Icon = entry.icon;
  return <Icon size={size} aria-hidden />;
}

export function SkillsGrid() {
  const [filter, setFilter] = useState<"all" | SkillCategory>("all");
  const filterTrackRef = useRef<HTMLDivElement>(null);
  useAutoSlide(filterTrackRef);

  const visibleGroups = useMemo(
    () => (filter === "all" ? SKILL_GROUPS : SKILL_GROUPS.filter((group) => group.value === filter)),
    [filter],
  );

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={filterTrackRef}
        role="group"
        aria-label="Filter skills by category"
        className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible"
      >
        {FILTERS.map((item) => {
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

      <BentoGrid className="items-stretch">
        {visibleGroups.map((group) => {
          const CategoryIcon = CATEGORY_ICON[group.value];
          const items = skills.filter((skill) => skill.categories.includes(group.value));

          return (
            <BentoTile key={group.value} size="wide" className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
                  <CategoryIcon size={18} aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-fg">{group.label}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <Fragment key={skill.name}>
                    <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-raised px-3 py-2.5 text-sm text-muted transition-all duration-150 hover:-translate-y-0.5 hover:border-primary-fg hover:bg-primary/5">
                      <span className="shrink-0 text-subtle">
                        <SkillIcon name={skill.name} />
                      </span>
                      <span>{skill.name}</span>
                    </div>
                    {group.rowBreaks?.includes(index + 1) && <span className="basis-full" aria-hidden />}
                  </Fragment>
                ))}
              </div>
            </BentoTile>
          );
        })}
      </BentoGrid>
    </div>
  );
}
