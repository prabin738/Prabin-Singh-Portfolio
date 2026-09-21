import type { CSSProperties } from "react";
import { site } from "@content/data/site";
import { BentoTile } from "@/components/bento/bento-tile";
import { Chip } from "@/components/ui/chip";

const INTRO_CHIPS = ["React", "React Native", "Node.js and MongoDB", "Technical SEO background"];

type IntroTileProps = {
  index: number;
};

export function IntroTile({ index }: IntroTileProps) {
  return (
    <BentoTile
      size="large"
      style={{ "--i": index } as CSSProperties}
      className="hero-settle flex flex-col gap-6 p-6 sm:p-8 lg:min-h-[32rem] lg:justify-center lg:p-10"
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-[44px] font-bold leading-none tracking-[-0.03em] text-fg lg:text-[72px]">
          {site.name}
        </h1>
        <p className="text-lg text-muted">
          {site.role} in {site.city}
        </p>
      </div>

      <p className="max-w-[55ch] text-base leading-relaxed text-muted">
        I build React and React Native apps and the Node.js APIs behind them. Mero Loksewa, my exam-prep app, is
        live on Google Play with 1,000+ downloads, and I built the Max Media admin dashboard for monitoring field
        surveys in real time.
      </p>

      <div className="flex flex-wrap gap-2">
        {INTRO_CHIPS.map((label) => (
          <Chip key={label}>{label}</Chip>
        ))}
      </div>
    </BentoTile>
  );
}
