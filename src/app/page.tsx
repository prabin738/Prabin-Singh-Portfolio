import { Section } from "@/components/layout/section";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ProjectsSection />

      <StackSection />

      <ExperienceSection />

      <AboutSection />

      {/* TODO(prabin): replace with ContactSection (docs/06-components.md) */}
      <Section id="contact" heading="Contact">
        <p className="text-muted">Placeholder section for anchor testing.</p>
      </Section>
    </>
  );
}
