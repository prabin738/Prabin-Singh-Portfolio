import Link from "next/link";
import Image from "next/image";
import { Download, Globe, Server, Smartphone } from "lucide-react";
import type { Project, ProjectStatus, ProjectType } from "@content/data/projects";
import { getProject } from "@content/data/projects";
import { BentoTile } from "@/components/bento/bento-tile";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { hasImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const TYPE_ICON = { mobile: Smartphone, web: Globe, backend: Server } as const;
const TYPE_LABEL: Record<ProjectType, string> = { mobile: "Mobile App", web: "Web App", backend: "Backend API" };
// Phone screenshots are portrait; a 4:3 landscape crop would lose most of the screen.
const TYPE_ASPECT: Record<ProjectType, string> = { mobile: "aspect-9/16", web: "aspect-4/3", backend: "aspect-4/3" };

const STATUS_META: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-live" },
  "in-progress": { label: "In progress", dot: "bg-marigold" },
  "client-work": { label: "Client work", dot: "bg-subtle" },
};

type ProjectCardSize = "small" | "wide" | "large";

type ProjectCardProps = {
  project: Project;
  size: ProjectCardSize;
};

export function ProjectCard({ project, size }: ProjectCardProps) {
  const Icon = TYPE_ICON[project.type];
  const status = STATUS_META[project.status];
  const statusLabel = project.statusLabel ?? status.label;
  const hasCover = hasImage(project.cover.src);
  const href = `/projects/${project.slug}`;
  const pairedProject = project.pairsWith ? getProject(project.pairsWith) : undefined;

  const statusBadge = (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} aria-hidden />
      {statusLabel}
    </span>
  );

  if (size === "small") {
    return (
      <BentoTile as="article" size={size} interactive className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised text-subtle">
            <Icon size={18} aria-hidden />
          </span>
          <Link href={href} className="text-lg font-semibold leading-[1.2] tracking-[-0.01em] text-fg hover:underline">
            {project.title}
          </Link>
        </div>

        <p className="line-clamp-2 text-sm text-muted">{project.summary}</p>
        {pairedProject ? <p className="text-xs text-subtle">Powers {pairedProject.title}</p> : null}

        <div className="mt-auto flex items-center justify-between gap-2">
          {statusBadge}
          <Link href={href} className="text-xs font-medium text-primary-fg hover:underline">
            Read case study
          </Link>
        </div>
      </BentoTile>
    );
  }

  return (
    <BentoTile as="article" size={size} interactive className="flex flex-col gap-4">
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden rounded-2xl bg-raised",
          TYPE_ASPECT[project.type],
          // Landscape covers stretch to fill leftover tile height; a portrait phone
          // shot would balloon well past its siblings if it did the same, so it
          // keeps its own natural (bounded) aspect instead.
          project.type !== "mobile" && "min-h-0 flex-1",
        )}
      >
        {hasCover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={size === "large" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon size={32} className="text-subtle" aria-hidden />
          </div>
        )}

        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-bg/85 px-2.5 py-1 text-xs font-medium text-muted">
          {TYPE_LABEL[project.type]}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/85 px-2.5 py-1 text-xs font-medium text-muted">
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} aria-hidden />
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <Link href={href} className="hover:underline">
          <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-fg sm:text-2xl">
            {project.title}
          </h3>
        </Link>
        <p className="text-sm text-muted">{project.summary}</p>
      </div>

      {project.stack.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 pt-1">
        {project.externalAction ? (
          <Button
            href={project.externalAction.href}
            download={project.externalAction.kind === "download" ? true : undefined}
            variant="primary"
          >
            {project.externalAction.kind === "download" ? (
              <Download size={16} aria-hidden />
            ) : (
              <Smartphone size={16} aria-hidden />
            )}
            {project.externalAction.label}
          </Button>
        ) : null}
        <Button href={href} variant="secondary">
          Read case study
        </Button>
      </div>
    </BentoTile>
  );
}
