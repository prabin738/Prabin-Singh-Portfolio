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
} from "@content/data/case-studies/max-media-admin-dashboard";
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
      <FlowNode node={architecture.fieldApp} />
      <FlowConnector labels={architecture.toApi} />
      <FlowNode node={architecture.api} />
      <FlowConnector labels={architecture.toConsole} />
      <FlowNode node={architecture.console} />
      <p className="mt-3 text-center text-xs leading-relaxed text-subtle">{architecture.consoleNote}</p>
      <p className="mt-4 text-center text-xs leading-relaxed text-subtle">{architecture.publishNote}</p>
    </DiagramFrame>
  );
}

export function MaxMediaAdminDashboardCaseStudy() {
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
