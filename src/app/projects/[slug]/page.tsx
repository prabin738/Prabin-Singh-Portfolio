import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Globe, Server, Smartphone } from "lucide-react";
import { getProject, projects, type Project, type ProjectStatus } from "@content/data/projects";
import { site, SITE_URL } from "@content/data/site";
import { hasImage } from "@/lib/images";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/lib/json-ld";
import { Container } from "@/components/layout/container";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { MeroLoksewaCaseStudy } from "@/components/case-studies/mero-loksewa-case-study";
import { MaxMediaSurveyAppCaseStudy } from "@/components/case-studies/max-media-survey-app-case-study";
import { MaxMediaAdminDashboardCaseStudy } from "@/components/case-studies/max-media-admin-dashboard-case-study";
import { cn } from "@/lib/utils";

const TYPE_ICON = { mobile: Smartphone, web: Globe, backend: Server } as const;

// schema.org applicationCategory has no dedicated "exam prep" value; the rest
// default to BusinessApplication below.
const APPLICATION_CATEGORY: Record<string, string> = {
  "mero-loksewa": "EducationalApplication",
};

function buildProjectJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image = hasImage(project.cover.src) ? absoluteUrl(`${project.cover.src}-1080.webp`) : undefined;
  const author = { "@id": `${SITE_URL}/#person` };

  // Mirrors the visible breadcrumb nav below — don't mark up a path that isn't on the page.
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Featured works", item: absoluteUrl("/#projects") },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  const entity =
    project.type === "backend"
      ? {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url,
          ...(image ? { image } : {}),
          author,
        }
      : {
          "@type": project.type === "mobile" ? "MobileApplication" : "SoftwareApplication",
          name: project.title,
          description: project.summary,
          url,
          ...(image ? { image } : {}),
          operatingSystem: project.type === "mobile" ? "Android" : "Web",
          applicationCategory: APPLICATION_CATEGORY[project.slug] ?? "BusinessApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          author,
        };

  return { "@context": "https://schema.org", "@graph": [breadcrumb, entity] };
}

// Slugs with a written case study; every other project shows the "on its way" note.
const CASE_STUDIES: Record<string, ComponentType> = {
  "mero-loksewa": MeroLoksewaCaseStudy,
  "max-media-survey-app": MaxMediaSurveyAppCaseStudy,
  "max-media-admin-dashboard": MaxMediaAdminDashboardCaseStudy,
};

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

  const title = `${project.seoTitle ?? project.title} case study`;
  const path = `/projects/${project.slug}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: site.name,
      title,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Icon = TYPE_ICON[project.type];
  const status = STATUS_META[project.status];
  const statusLabel = project.statusLabel ?? status.label;
  const jsonLd = buildProjectJsonLd(project);
  const CaseStudy = CASE_STUDIES[project.slug];

  return (
    <Container as="section" className="py-16 lg:py-24">
      <JsonLd data={jsonLd} />

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

      {CaseStudy ? (
        <CaseStudy />
      ) : (
        <div className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-base text-muted">
            The full case study — architecture, API overview and results — is on its way.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
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
    </Container>
  );
}
