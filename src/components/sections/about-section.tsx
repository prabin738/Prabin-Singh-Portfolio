import { Award, GraduationCap } from "lucide-react";
import { aboutCopy, certifications, education } from "@content/data/about";
import { Section } from "@/components/layout/section";
import { BentoGrid } from "@/components/bento/bento-grid";
import { BentoTile } from "@/components/bento/bento-tile";

export function AboutSection() {
  return (
    <Section
      id="about"
      heading="About"
      description="From technical SEO audits to the full-stack behind Mero Loksewa."
    >
      <BentoGrid>
        <BentoTile size="wide" className="flex flex-col gap-4">
          {aboutCopy.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </BentoTile>

        <BentoTile size="small" className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
              <GraduationCap size={18} aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-fg">Education</h3>
          </div>
          <div>
            <p className="text-sm font-medium text-fg">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.institution}</p>
            <p className="text-sm text-subtle">{education.location}</p>
            <p className="mt-2 text-sm text-subtle">Completed {education.completed}</p>
          </div>
        </BentoTile>

        <BentoTile size="small" className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
              <Award size={18} aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-fg">Certifications</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {certifications.map((cert) => (
              <li key={cert.name} className="text-sm">
                <p className="font-medium text-fg">{cert.name}</p>
                <p className="text-subtle">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </BentoTile>
      </BentoGrid>
    </Section>
  );
}
