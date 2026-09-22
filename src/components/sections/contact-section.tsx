import type { ReactNode } from "react";
import { Briefcase, Clock, FileSignature, type LucideIcon } from "lucide-react";
import { site } from "@content/data/site";
import { engagementTypes } from "@content/data/contact";
import { Section } from "@/components/layout/section";
import { BentoTile } from "@/components/bento/bento-tile";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";

const ENGAGEMENT_ICON: Record<string, LucideIcon> = {
  "Full-time": Briefcase,
  "Part-time": Clock,
  Contract: FileSignature,
};

const WHATSAPP_MESSAGE = "Hi Prabin, I found your portfolio and wanted to talk about a project.";
const WHATSAPP_HREF = `${site.links.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// simple-icons and lucide-react both dropped their LinkedIn glyph (trademark
// takedown), so BrandIcon can't resolve it. Standard "in" badge path, same
// treatment as BrandIcon: decorative, currentColor fill.
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.09 108 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.2-53.79 54.2zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

const CONTACT_LINKS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon /> },
  { label: "GitHub", href: site.links.github, icon: <BrandIcon slug="github" size={18} /> },
];

const ICON_LINK_CLASSES =
  "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg";

export function ContactSection() {
  return (
    <Section id="contact" heading="Let's work together" description={site.availability.text}>
      <div className="flex flex-col gap-3 sm:gap-3.5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5">
          {engagementTypes.map((type) => {
            const Icon = ENGAGEMENT_ICON[type.label];
            return (
              <BentoTile key={type.label} size="small" className="flex flex-col gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-fg">{type.label}</h3>
                  <p className="mt-1 text-sm text-muted">{type.description}</p>
                </div>
              </BentoTile>
            );
          })}
        </div>

        <BentoTile size="banner" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold text-fg">Have a role or project in mind?</h3>
            <p className="mt-2 text-base text-muted">
              Tell me what you need built and I&apos;ll get back to you on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <Button href={WHATSAPP_HREF} variant="primary">
              <BrandIcon slug="whatsapp" size={18} />
              Let&apos;s talk
            </Button>
            <nav aria-label="Contact links" className="flex items-center gap-2">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={ICON_LINK_CLASSES}
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          </div>
        </BentoTile>
      </div>
    </Section>
  );
}
