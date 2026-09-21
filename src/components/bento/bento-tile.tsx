import type { CSSProperties, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tile = cva(
  "relative overflow-hidden border border-line bg-surface p-5 sm:p-6 transition-colors",
  {
    variants: {
      size: {
        small: "rounded-2xl",
        wide: "rounded-3xl sm:col-span-2",
        tall: "rounded-3xl lg:row-span-2",
        large: "rounded-[2rem] sm:col-span-2 lg:row-span-2",
        feature: "rounded-[2rem] lg:row-span-3",
        banner: "rounded-3xl sm:col-span-2 lg:col-span-4",
      },
      interactive: {
        true: "hover:border-primary-fg focus-within:border-primary-fg",
        false: "",
      },
    },
    defaultVariants: { size: "small", interactive: false },
  },
);

type BentoTileProps = VariantProps<typeof tile> & {
  as?: "div" | "article" | "li";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function BentoTile({ as: Comp = "div", size, interactive, className, style, children }: BentoTileProps) {
  return (
    <Comp className={cn(tile({ size, interactive }), className)} style={style}>
      {children}
    </Comp>
  );
}
