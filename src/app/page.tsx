import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ProjectsSection />

      <StackSection />

      <ExperienceSection />

      <AboutSection />

      <ContactSection />
    </>
  );
}
