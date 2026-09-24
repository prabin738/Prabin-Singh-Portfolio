// Shared shapes for every case-study data file. Each project's file under
// content/data/case-studies/ exports plain data typed with these, and the
// section components in src/components/case-studies/case-study-sections.tsx
// render them — so a new case study is mostly a new data file.

export type LabeledValue = { label: string; value: string };

export type TitledBody = { title: string; body: string };

export type CaseStudyProblem = { intro: string; points: string[]; goal?: string };

export type CaseStudyUsers = { primary: string; secondary?: string; constraints?: string };

export type CaseStudySolution = { intro: string; parts: TitledBody[]; features?: TitledBody[] };

export type StackGroup = { label: string; items: string[] };

export type FlowNode = { title: string; subtitle?: string; items: string[] };

export type Highlight = { title: string; summary: string; deepDive?: string[] };

export type SecurityGroup = { title: string; items: string[] };

export type ChallengeRow = { challenge: string; decision: string; tradeoff: string };

// `pending` renders as dashed "Fill in" chips — metrics not measured yet, never invented ones.
export type CaseStudyResults = { stats: LabeledValue[]; pending?: string[] };

export type CaseStudyLinks = { github: string | null };
