import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <>
      <Container className="py-16 lg:py-24">
        <h1 className="text-4xl font-bold text-fg sm:text-5xl">Prabin Singh Thakuri</h1>
      </Container>

      {/* TODO(prabin): replace with ProjectsSection (docs/06-components.md) */}
      <Section id="projects" heading="Projects">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>

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
