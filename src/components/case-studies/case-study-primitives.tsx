import type { ReactNode } from "react";
import { ArrowDown, type LucideIcon } from "lucide-react";
import type { FlowNode as FlowNodeData } from "@content/data/case-studies/types";

// Low-level building blocks shared by every case study. Section-level
// components live in case-study-sections.tsx; anything one-off (like a
// project's architecture diagram layout) stays in that project's component.

export function CaseStudySection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 sm:mt-16">
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
          <Icon size={18} aria-hidden />
        </span>
        <h2 className="text-xl font-semibold text-fg sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FlowNode({ node, className }: { node: FlowNodeData; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-raised p-4 sm:p-5 ${className ?? ""}`}>
      <p className="text-[15px] font-semibold text-fg">{node.title}</p>
      {node.subtitle ? <p className="text-xs text-subtle">{node.subtitle}</p> : null}
      <ul className="mt-3 flex flex-col gap-1.5">
        {node.items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted sm:text-sm">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-subtle" aria-hidden />
            <span className="wrap-break-word">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FlowConnector({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2" aria-hidden>
      <ArrowDown size={18} className="text-primary-fg" />
      <div className="flex flex-wrap justify-center gap-1.5">
        {labels.map((label) => (
          <span
            key={label}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-subtle"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Frame for a project's architecture diagram; compose FlowNode/FlowConnector inside.
export function DiagramFrame({ children }: { children: ReactNode }) {
  return (
    <div aria-label="System architecture diagram" className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
      <div className="mx-auto flex max-w-2xl flex-col items-stretch">{children}</div>
    </div>
  );
}

export function DeepDive({ items }: { items: string[] }) {
  return (
    <details className="group mt-4 rounded-2xl border border-line bg-surface open:bg-raised">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-fg marker:content-none">
        Technical deep dive
        <span className="text-subtle transition-transform group-open:rotate-180" aria-hidden>
          <ArrowDown size={16} />
        </span>
      </summary>
      <div className="px-4 pb-4">
        <BulletList items={items} />
      </div>
    </details>
  );
}

export function PlaceholderChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1 text-xs text-subtle">
      <span className="font-mono text-[10px] uppercase tracking-wide text-marigold">Fill in</span>
      {children}
    </span>
  );
}
