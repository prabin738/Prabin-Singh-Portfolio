import { experience } from "@content/data/experience";
import { Section } from "@/components/layout/section";
import { BentoGrid } from "@/components/bento/bento-grid";
import { BentoTile } from "@/components/bento/bento-tile";
import { Timeline } from "@/components/sections/timeline";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      heading="Experience"
      description="Full-stack development at Clicklab Digital, and the SEO and content work that came before it."
    >
      <BentoGrid>
        <BentoTile size="banner">
          <Timeline entries={experience} />
        </BentoTile>
      </BentoGrid>
    </Section>
  );
}
