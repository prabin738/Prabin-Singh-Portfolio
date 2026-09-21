import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chip = cva("inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-sm text-muted", {
  variants: {
    tone: {
      default: "",
      primary: "text-primary-fg",
      marigold: "text-marigold",
    },
  },
  defaultVariants: { tone: "default" },
});

type ChipProps = VariantProps<typeof chip> & {
  children: ReactNode;
  className?: string;
};

export function Chip({ tone, className, children }: ChipProps) {
  return <span className={cn(chip({ tone }), className)}>{children}</span>;
}
