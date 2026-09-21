import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  heading: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, heading, description, children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-16 lg:py-24", className)}>
      <Container>
        <h2 id={headingId} className="text-3xl font-semibold text-fg sm:text-4xl">
          {heading}
        </h2>
        {description ? <p className="mt-3 max-w-2xl text-base text-muted">{description}</p> : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
