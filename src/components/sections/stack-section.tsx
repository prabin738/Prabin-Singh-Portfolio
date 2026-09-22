import { Section } from "@/components/layout/section";
import { SkillsGrid } from "@/components/sections/skills-grid";

export function StackSection() {
  return (
    <Section
      id="stack"
      heading="Skills and Stacks"
      description="Tools and technologies I use to design, build and ship products, plus the skills that keep a project on track."
    >
      <SkillsGrid />
    </Section>
  );
}
