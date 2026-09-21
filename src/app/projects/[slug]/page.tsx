import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Download, Globe, Server, Smartphone } from "lucide-react";
import { getProject, projects, type ProjectStatus } from "@content/data/projects";
import { Container } from "@/components/layout/container";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { hasImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const TYPE_ICON = { mobile: Smartphone, web: Globe, backend: Server } as const;
// Phone screenshots are portrait; a landscape crop would lose most of the screen.
const TYPE_ASPECT = { mobile: "aspect-9/16", web: "aspect-4/3 sm:aspect-video", backend: "aspect-4/3 sm:aspect-video" };
const TYPE_COVER_WIDTH = { mobile: "max-w-xs", web: "max-w-2xl", backend: "max-w-2xl" };

const STATUS_META: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-live" },
  "in-progress": { label: "In progress", dot: "bg-marigold" },
  "client-work": { label: "Client work", dot: "bg-subtle" },
};

// Static export needs every path known at build time; an unlisted slug 404s
// instead of falling through to a runtime render that static hosting can't do.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} case study | Prabin Singh Thakuri`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Icon = TYPE_ICON[project.type];
  const status = STATUS_META[project.status];
  const statusLabel = project.statusLabel ?? status.label;
  const hasCover = hasImage(project.cover.src);

  return (
    <Container as="section" className="py-16 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/#projects" className="hover:text-fg">
              Featured works
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-fg" aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} aria-hidden />
          {statusLabel}
        </span>
        <h1 className="text-3xl font-semibold text-fg sm:text-4xl">{project.title}</h1>
        <p className="max-w-2xl text-base text-muted">{project.summary}</p>
      </div>

      {project.stack.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      ) : null}

      <div
        className={cn(
          "relative mt-8 w-full overflow-hidden rounded-3xl border border-line bg-raised",
          TYPE_ASPECT[project.type],
          TYPE_COVER_WIDTH[project.type],
        )}
      >
        {hasCover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon size={40} className="text-subtle" aria-hidden />
          </div>
        )}
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.gallery.map((shot) =>
            hasImage(shot.src) ? (
              <div
                key={shot.src}
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border border-line bg-raised",
                  TYPE_ASPECT[project.type],
                )}
              >
                <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover object-top" />
              </div>
            ) : null,
          )}
        </div>
      ) : null}

      <div className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-base text-muted">
          The full case study — architecture, API overview and results — is on its way.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
          <Button href="/#projects" variant="secondary">
            Back to Featured works
          </Button>
        </div>
      </div>
    </Container>
  );
}
