import type { ReactNode } from "react";
import {
  ArrowDown,
  Cloud,
  Compass,
  Layers,
  Lightbulb,
  ListChecks,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  alsoInTheCodebase,
  architecture,
  atAGlance,
  caseStudyLinks,
  challenges,
  factStrip,
  highlights,
  learnings,
  problem,
  results,
  securityGroups,
  solution,
  stackGroups,
  tldr,
  users,
  whatsNext,
  type FlowNode as FlowNodeData,
} from "@content/data/case-studies/mero-loksewa";
import { CaseStudyToc } from "@/components/case-studies/case-study-toc";

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "users", label: "Target users" },
  { id: "solution", label: "The solution" },
  { id: "tech-stack", label: "Tech stack" },
  { id: "architecture", label: "System architecture" },
  { id: "highlights", label: "System design highlights" },
  { id: "security", label: "Security" },
  { id: "challenges", label: "Challenges and trade-offs" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "What I learned" },
  { id: "whats-next", label: "What's next" },
] as const;

function CaseStudySection({
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

function BulletList({ items, className }: { items: string[]; className?: string }) {
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

function FlowNode({ node, className }: { node: FlowNodeData; className?: string }) {
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

function FlowConnector({ labels }: { labels: string[] }) {
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

function ArchitectureDiagram() {
  return (
    <div aria-label="System architecture diagram" className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
      <div className="mx-auto flex max-w-2xl flex-col items-stretch">
        <FlowNode node={architecture.app} />
        <FlowConnector labels={architecture.toBackend} />
        <div className="grid gap-3 sm:grid-cols-2">
          <FlowNode node={architecture.api} />
          <FlowNode node={architecture.r2} />
        </div>
        <p className="mt-3 text-center text-xs leading-relaxed text-subtle">{architecture.publishNote}</p>
        <FlowConnector labels={architecture.toData} />
        <div className="grid gap-3 sm:grid-cols-2">
          <FlowNode node={architecture.db} />
          <FlowNode node={architecture.fcm} />
        </div>
      </div>
    </div>
  );
}

function DeepDive({ items }: { items: string[] }) {
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

function PlaceholderChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1 text-xs text-subtle">
      <span className="font-mono text-[10px] uppercase tracking-wide text-marigold">Fill in</span>
      {children}
    </span>
  );
}

export function MeroLoksewaCaseStudy() {
  return (
    <div className="mt-4">
      <CaseStudyToc sections={SECTIONS} />

      {/* Quick facts */}
      <div className="grid gap-3 sm:grid-cols-3">
        {factStrip.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-line bg-raised p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-subtle">{fact.label}</p>
            <p className="mt-1 text-sm text-fg">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3">
        {caseStudyLinks.github ? (
          <a href={caseStudyLinks.github} className="text-sm text-primary-fg hover:underline">
            View source on GitHub
          </a>
        ) : (
          <p className="text-sm text-subtle">Source code: private repository.</p>
        )}
      </div>

      {/* At a glance */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {atAGlance.map((row, i) => (
              <tr key={row.label} className={i > 0 ? "border-t border-line" : undefined}>
                <th scope="row" className="w-36 shrink-0 bg-raised p-3 text-left align-top font-medium text-fg sm:w-44">
                  {row.label}
                </th>
                <td className="p-3 text-muted">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TL;DR */}
      <div className="mt-8 rounded-3xl border border-primary-fg/30 bg-raised p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary-fg">
          <Sparkles size={14} aria-hidden />
          TL;DR
        </p>
        <ul className="mt-3 flex flex-col gap-3">
          {tldr.map((point) => (
            <li key={point} className="flex gap-2.5 text-[15px] leading-relaxed text-fg">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-fg" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Problem */}
      <CaseStudySection id="problem" icon={Target} title="The problem">
        <p className="text-[15px] leading-relaxed text-muted">{problem.intro}</p>
        <BulletList items={problem.points} className="mt-4" />
        <p className="mt-4 text-[15px] leading-relaxed text-fg">
          <span className="font-semibold">Goal: </span>
          {problem.goal}
        </p>
      </CaseStudySection>

      {/* Users */}
      <CaseStudySection id="users" icon={Users} title="Target users">
        <BulletList
          items={[`Primary: ${users.primary}`, `Secondary: ${users.secondary}`, `Constraints: ${users.constraints}`]}
        />
      </CaseStudySection>

      {/* Solution & key features */}
      <CaseStudySection id="solution" icon={Compass} title="The solution">
        <p className="text-[15px] leading-relaxed text-muted">{solution.intro}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {solution.parts.map((part) => (
            <div key={part.title} className="rounded-2xl border border-line bg-raised p-4">
              <p className="text-sm font-semibold text-fg">{part.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{part.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-base font-semibold text-fg">Key features</h3>
        <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {solution.features.map((feature) => (
            <p key={feature.title} className="text-sm leading-relaxed text-muted">
              <span className="font-medium text-fg">{feature.title}. </span>
              {feature.body}
            </p>
          ))}
        </div>
      </CaseStudySection>

      {/* Tech stack */}
      <CaseStudySection id="tech-stack" icon={Layers} title="Tech stack">
        <div className="grid gap-3 sm:grid-cols-2">
          {stackGroups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-line bg-raised p-4">
              <p className="text-sm font-semibold text-fg">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* Architecture */}
      <CaseStudySection id="architecture" icon={Server} title="System architecture">
        <ArchitectureDiagram />
        <p className="mt-5 text-sm leading-relaxed text-muted">{architecture.flow}</p>
      </CaseStudySection>

      {/* System design highlights */}
      <CaseStudySection id="highlights" icon={Cloud} title="System design highlights">
        <div className="flex flex-col gap-4">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="rounded-3xl border border-line bg-raised p-5 sm:p-6">
              <p className="text-base font-semibold text-fg">{highlight.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{highlight.summary}</p>
              <DeepDive items={highlight.deepDive} />
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-base font-semibold text-fg">Also in the codebase</h3>
        <BulletList items={alsoInTheCodebase} className="mt-3" />
      </CaseStudySection>

      {/* Security */}
      <CaseStudySection id="security" icon={ShieldCheck} title="Security">
        <p className="text-sm leading-relaxed text-muted">
          The custom NoSQL-injection/XSS sanitiser is covered in the system design highlights above. The rest of the
          hardening:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {securityGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-line bg-raised p-4">
              <p className="text-sm font-semibold text-fg">{group.title}</p>
              <BulletList items={group.items} className="mt-3" />
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* Challenges & trade-offs */}
      <CaseStudySection id="challenges" icon={ListChecks} title="Challenges and trade-offs">
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-160 border-collapse text-left text-sm">
            <thead>
              <tr className="bg-raised">
                <th scope="col" className="p-3 font-medium text-fg">
                  Challenge
                </th>
                <th scope="col" className="p-3 font-medium text-fg">
                  Decision
                </th>
                <th scope="col" className="p-3 font-medium text-fg">
                  Trade-off
                </th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((row, i) => (
                <tr key={row.challenge} className={i > 0 ? "border-t border-line" : undefined}>
                  <td className="p-3 align-top font-medium text-fg">{row.challenge}</td>
                  <td className="p-3 align-top text-muted">{row.decision}</td>
                  <td className="p-3 align-top text-muted">{row.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CaseStudySection>

      {/* Results */}
      <CaseStudySection id="results" icon={Rocket} title="Results">
        <div className="grid gap-3 sm:grid-cols-2">
          {results.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-line bg-raised p-5">
              <p className="text-3xl font-semibold text-marigold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {results.pending.map((item) => (
            <PlaceholderChip key={item}>{item}</PlaceholderChip>
          ))}
        </div>
      </CaseStudySection>

      {/* Learnings */}
      <CaseStudySection id="learnings" icon={Lightbulb} title="What I learned">
        <BulletList items={learnings} />
      </CaseStudySection>

      {/* What's next */}
      <CaseStudySection id="whats-next" icon={Smartphone} title="What's next">
        <BulletList items={whatsNext} />
      </CaseStudySection>
    </div>
  );
}
