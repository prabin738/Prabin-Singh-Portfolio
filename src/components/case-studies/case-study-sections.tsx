import type { ReactNode } from "react";
import {
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
} from "lucide-react";
import type {
  CaseStudyLinks,
  CaseStudyProblem,
  CaseStudyResults,
  CaseStudySolution,
  CaseStudyUsers,
  ChallengeRow,
  Highlight,
  LabeledValue,
  SecurityGroup,
  StackGroup,
} from "@content/data/case-studies/types";
import { BulletList, CaseStudySection, DeepDive, PlaceholderChip } from "@/components/case-studies/case-study-primitives";

// Standard case-study sections. A project's case-study component picks the
// sections it needs, in order, and passes the same list to CaseStudyToc —
// the ids here are what the TOC links to, so both always agree.
export const CASE_STUDY_SECTIONS = {
  problem: { id: "problem", label: "The problem" },
  users: { id: "users", label: "Target users" },
  solution: { id: "solution", label: "The solution" },
  techStack: { id: "tech-stack", label: "Tech stack" },
  architecture: { id: "architecture", label: "System architecture" },
  highlights: { id: "highlights", label: "System design highlights" },
  security: { id: "security", label: "Security" },
  challenges: { id: "challenges", label: "Challenges and trade-offs" },
  results: { id: "results", label: "Results" },
  learnings: { id: "learnings", label: "What I learned" },
  whatsNext: { id: "whats-next", label: "What's next" },
} as const;

const S = CASE_STUDY_SECTIONS;

// Fact strip, source link, at-a-glance table and TL;DR — the part above the first TOC section.
export function CaseStudyIntro({
  facts,
  links,
  atAGlance,
  tldr,
}: {
  facts: LabeledValue[];
  links?: CaseStudyLinks;
  atAGlance?: LabeledValue[];
  tldr: string[];
}) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-line bg-raised p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-subtle">{fact.label}</p>
            <p className="mt-1 text-sm text-fg">{fact.value}</p>
          </div>
        ))}
      </div>

      {links ? (
        <div className="mt-3">
          {links.github ? (
            <a href={links.github} className="text-sm text-primary-fg hover:underline">
              View source on GitHub
            </a>
          ) : (
            <p className="text-sm text-subtle">Source code: private repository.</p>
          )}
        </div>
      ) : null}

      {atAGlance && atAGlance.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {atAGlance.map((row, i) => (
                <tr key={row.label} className={i > 0 ? "border-t border-line" : undefined}>
                  <th
                    scope="row"
                    className="w-36 shrink-0 bg-raised p-3 text-left align-top font-medium text-fg sm:w-44"
                  >
                    {row.label}
                  </th>
                  <td className="p-3 text-muted">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

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
    </>
  );
}

export function ProblemSection({ problem }: { problem: CaseStudyProblem }) {
  return (
    <CaseStudySection id={S.problem.id} icon={Target} title={S.problem.label}>
      <p className="text-[15px] leading-relaxed text-muted">{problem.intro}</p>
      <BulletList items={problem.points} className="mt-4" />
      {problem.goal ? (
        <p className="mt-4 text-[15px] leading-relaxed text-fg">
          <span className="font-semibold">Goal: </span>
          {problem.goal}
        </p>
      ) : null}
    </CaseStudySection>
  );
}

export function UsersSection({ users }: { users: CaseStudyUsers }) {
  const items = [
    `Primary: ${users.primary}`,
    users.secondary ? `Secondary: ${users.secondary}` : null,
    users.constraints ? `Constraints: ${users.constraints}` : null,
  ].filter((item): item is string => item !== null);

  return (
    <CaseStudySection id={S.users.id} icon={Users} title={S.users.label}>
      <BulletList items={items} />
    </CaseStudySection>
  );
}

export function SolutionSection({ solution }: { solution: CaseStudySolution }) {
  return (
    <CaseStudySection id={S.solution.id} icon={Compass} title={S.solution.label}>
      <p className="text-[15px] leading-relaxed text-muted">{solution.intro}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {solution.parts.map((part) => (
          <div key={part.title} className="rounded-2xl border border-line bg-raised p-4">
            <p className="text-sm font-semibold text-fg">{part.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{part.body}</p>
          </div>
        ))}
      </div>

      {solution.features && solution.features.length > 0 ? (
        <>
          <h3 className="mt-8 text-base font-semibold text-fg">Key features</h3>
          <div className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {solution.features.map((feature) => (
              <p key={feature.title} className="text-sm leading-relaxed text-muted">
                <span className="font-medium text-fg">{feature.title}. </span>
                {feature.body}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </CaseStudySection>
  );
}

export function TechStackSection({ groups }: { groups: StackGroup[] }) {
  return (
    <CaseStudySection id={S.techStack.id} icon={Layers} title={S.techStack.label}>
      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
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
  );
}

// The diagram itself is project-specific: build it from DiagramFrame/FlowNode/FlowConnector and pass it as children.
export function ArchitectureSection({ flow, children }: { flow?: string; children: ReactNode }) {
  return (
    <CaseStudySection id={S.architecture.id} icon={Server} title={S.architecture.label}>
      {children}
      {flow ? <p className="mt-5 text-sm leading-relaxed text-muted">{flow}</p> : null}
    </CaseStudySection>
  );
}

export function HighlightsSection({ highlights, also }: { highlights: Highlight[]; also?: string[] }) {
  return (
    <CaseStudySection id={S.highlights.id} icon={Cloud} title={S.highlights.label}>
      <div className="flex flex-col gap-4">
        {highlights.map((highlight) => (
          <div key={highlight.title} className="rounded-3xl border border-line bg-raised p-5 sm:p-6">
            <p className="text-base font-semibold text-fg">{highlight.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{highlight.summary}</p>
            {highlight.deepDive && highlight.deepDive.length > 0 ? <DeepDive items={highlight.deepDive} /> : null}
          </div>
        ))}
      </div>

      {also && also.length > 0 ? (
        <>
          <h3 className="mt-8 text-base font-semibold text-fg">Also in the codebase</h3>
          <BulletList items={also} className="mt-3" />
        </>
      ) : null}
    </CaseStudySection>
  );
}

export function SecuritySection({ groups, intro }: { groups: SecurityGroup[]; intro?: string }) {
  return (
    <CaseStudySection id={S.security.id} icon={ShieldCheck} title={S.security.label}>
      {intro ? <p className="mb-4 text-sm leading-relaxed text-muted">{intro}</p> : null}
      <div className="grid gap-3 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl border border-line bg-raised p-4">
            <p className="text-sm font-semibold text-fg">{group.title}</p>
            <BulletList items={group.items} className="mt-3" />
          </div>
        ))}
      </div>
    </CaseStudySection>
  );
}

export function ChallengesSection({ rows }: { rows: ChallengeRow[] }) {
  return (
    <CaseStudySection id={S.challenges.id} icon={ListChecks} title={S.challenges.label}>
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
            {rows.map((row, i) => (
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
  );
}

export function ResultsSection({ results }: { results: CaseStudyResults }) {
  return (
    <CaseStudySection id={S.results.id} icon={Rocket} title={S.results.label}>
      <div className="grid gap-3 sm:grid-cols-2">
        {results.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-raised p-5">
            <p className="text-3xl font-semibold text-marigold">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      {results.pending && results.pending.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {results.pending.map((item) => (
            <PlaceholderChip key={item}>{item}</PlaceholderChip>
          ))}
        </div>
      ) : null}
    </CaseStudySection>
  );
}

export function LearningsSection({ items }: { items: string[] }) {
  return (
    <CaseStudySection id={S.learnings.id} icon={Lightbulb} title={S.learnings.label}>
      <BulletList items={items} />
    </CaseStudySection>
  );
}

export function WhatsNextSection({ items }: { items: string[] }) {
  return (
    <CaseStudySection id={S.whatsNext.id} icon={Smartphone} title={S.whatsNext.label}>
      <BulletList items={items} />
    </CaseStudySection>
  );
}
