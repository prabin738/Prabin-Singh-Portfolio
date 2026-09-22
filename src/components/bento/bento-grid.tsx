import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
};

export function BentoGrid({ children, className, as: Comp = "div" }: BentoGridProps) {
  return (
    <Comp
      className={cn(
        "grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-4 lg:auto-rows-[minmax(180px,auto)]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
