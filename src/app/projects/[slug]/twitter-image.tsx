import { ImageResponse } from "next/og";
import { getProject, projects } from "@content/data/projects";
import { OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE, OgImageTemplate } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Project case study cover";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <OgImageTemplate
        eyebrow="Case study"
        title={project?.seoTitle ?? project?.title ?? "Prabin Singh Thakuri"}
        subtitle={project?.summary ?? ""}
      />
    ),
    size,
  );
}
