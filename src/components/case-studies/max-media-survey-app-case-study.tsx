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
} from "@content/data/case-studies/max-media-survey-app";
import { CaseStudyToc } from "@/components/case-studies/case-study-toc";
import { DiagramFrame, FlowConnector, FlowNode } from "@/components/case-studies/case-study-primitives";
import {
  ArchitectureSection,
  CASE_STUDY_SECTIONS as S,
  CaseStudyIntro,
  ChallengesSection,
  HighlightsSection,
  LearningsSection,
  ProblemSection,
  ResultsSection,
  SecuritySection,
  SolutionSection,
  TechStackSection,
  UsersSection,
  WhatsNextSection,
} from "@/components/case-studies/case-study-sections";

const SECTIONS = [
  S.problem,
  S.users,
  S.solution,
  S.techStack,
  S.architecture,
  S.highlights,
  S.security,
  S.challenges,
  S.results,
  S.learnings,
  S.whatsNext,
];

function ArchitectureDiagram() {
  return (
    <DiagramFrame>
      <FlowNode node={architecture.device} />
      <FlowConnector labels={architecture.toLocal} />
      <FlowNode node={architecture.local} />
      <FlowConnector labels={architecture.toApi} />
      <div className="grid gap-3 sm:grid-cols-2">
        <FlowNode node={architecture.api} />
        <FlowNode node={architecture.admin} />
      </div>
      <p className="mt-3 text-center text-xs leading-relaxed text-subtle">{architecture.adminToApi}</p>
      <FlowConnector labels={architecture.toDb} />
      <FlowNode node={architecture.db} />
      <p className="mt-4 text-center text-xs leading-relaxed text-subtle">{architecture.publishNote}</p>
    </DiagramFrame>
  );
}

export function MaxMediaSurveyAppCaseStudy() {
  return (
    <div className="mt-4">
      <CaseStudyToc sections={SECTIONS} />
      <CaseStudyIntro facts={factStrip} links={caseStudyLinks} atAGlance={atAGlance} tldr={tldr} />
      <ProblemSection problem={problem} />
      <UsersSection users={users} />
      <SolutionSection solution={solution} />
      <TechStackSection groups={stackGroups} />
      <ArchitectureSection flow={architecture.flow}>
        <ArchitectureDiagram />
      </ArchitectureSection>
      <HighlightsSection highlights={highlights} also={alsoInTheCodebase} />
      <SecuritySection groups={securityGroups} />
      <ChallengesSection rows={challenges} />
      <ResultsSection results={results} />
      <LearningsSection items={learnings} />
      <WhatsNextSection items={whatsNext} />
    </div>
  );
}
