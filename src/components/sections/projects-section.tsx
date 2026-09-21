import { Section } from "@/components/layout/section";
import { FeaturedWorksGrid } from "@/components/sections/featured-works-grid";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      heading="Featured works"
      description="Products and APIs I designed, built and shipped — each one with the frontend and the backend behind it."
    >
      <FeaturedWorksGrid />
    </Section>
  );
}
