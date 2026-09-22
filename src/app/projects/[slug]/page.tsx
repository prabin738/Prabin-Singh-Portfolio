import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Globe, Server, Smartphone } from "lucide-react";
import { getProject, projects, type ProjectStatus } from "@content/data/projects";
import { Container } from "@/components/layout/container";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { cn } from "@/lib/utils";

const TYPE_ICON = { mobile: Smartphone, web: Globe, backend: Server } as const;

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

      <ProjectGallery
        type={project.type}
        cover={project.cover}
        gallery={project.gallery}
        emptyCoverFallback={<Icon size={40} className="text-subtle" aria-hidden />}
      />

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
