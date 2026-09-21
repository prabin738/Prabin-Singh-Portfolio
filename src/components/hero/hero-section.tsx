import { Container } from "@/components/layout/container";
import { BentoGrid } from "@/components/bento/bento-grid";
import { IntroTile } from "@/components/hero/intro-tile";
import { PortraitTile } from "@/components/hero/portrait-tile";

export function HeroSection() {
  return (
    <section aria-label="Introduction" className="pt-8 sm:pt-10 lg:pt-14">
      <Container>
        <BentoGrid>
          <IntroTile index={0} />
          <PortraitTile index={1} />
        </BentoGrid>
      </Container>
    </section>
  );
}
