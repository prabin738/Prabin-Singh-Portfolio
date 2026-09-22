import type { ReactNode } from "react";
import { Briefcase, Clock, FileSignature, type LucideIcon } from "lucide-react";
import { site } from "@content/data/site";
import { engagementTypes } from "@content/data/contact";
import { Section } from "@/components/layout/section";
import { BentoTile } from "@/components/bento/bento-tile";
import { Button } from "@/components/ui/button";
import { BrandIcon, LinkedinIcon } from "@/components/ui/brand-icon";

const ENGAGEMENT_ICON: Record<string, LucideIcon> = {
  "Full-time": Briefcase,
  "Part-time": Clock,
  Contract: FileSignature,
};

const WHATSAPP_MESSAGE = "Hi Prabin, I found your portfolio and wanted to talk about a project.";
const WHATSAPP_HREF = `${site.links.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const CONTACT_LINKS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon size={18} /> },
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
