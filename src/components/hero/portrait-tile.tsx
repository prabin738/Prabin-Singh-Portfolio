import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import { site } from "@content/data/site";
import { BentoTile } from "@/components/bento/bento-tile";
import { Chip } from "@/components/ui/chip";
import { StatusDot } from "@/components/ui/status-dot";
import { FrameCar } from "@/components/hero/frame-car";

const PORTRAIT_SRC = "/img/portrait.webp";

type PortraitTileProps = {
  index: number;
};

export function PortraitTile({ index }: PortraitTileProps) {
  const hasPortrait = existsSync(path.join(process.cwd(), "public", "img", "portrait.webp"));

  return (
    <BentoTile
      size="large"
      style={{ "--i": index } as CSSProperties}
      className="hero-settle min-h-[22rem] p-5 sm:min-h-[26rem] sm:p-5 lg:min-h-[32rem]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-raised">
        {hasPortrait ? (
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait of Prabin Singh Thakuri"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[64px] font-bold tracking-[-0.02em] text-muted">PST</span>
          </div>
        )}

        <Chip tone="primary" className="absolute right-3 top-3">
          React and React Native
        </Chip>

        <Chip className="absolute bottom-3 left-3 max-w-[75%]">
          <StatusDot status="live" label={site.availability.text} />
        </Chip>
      </div>

      <FrameCar />
    </BentoTile>
  );
}
