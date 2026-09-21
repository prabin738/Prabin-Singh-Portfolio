import { Section } from "@/components/layout/section";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ProjectsSection />

      {/* TODO(prabin): replace with StackSection (docs/06-components.md) */}
      <Section id="stack" heading="Stack">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>

      {/* TODO(prabin): replace with ExperienceSection (docs/06-components.md) */}
      <Section id="experience" heading="Experience">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>

      {/* TODO(prabin): replace with AboutSection (docs/06-components.md) */}
      <Section id="about" heading="About">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>

      {/* TODO(prabin): replace with ContactSection (docs/06-components.md) */}
      <Section id="contact" heading="Contact">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>
    </>
  );
}
