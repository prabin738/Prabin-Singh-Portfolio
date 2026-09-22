import { Mail } from "lucide-react";
import { site } from "@content/data/site";
import { Container } from "@/components/layout/container";
import { BrandIcon, LinkedinIcon } from "@/components/ui/brand-icon";

const iconLinkClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:bg-raised hover:text-fg";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            {site.role} in {site.city}
          </p>
        </div>

        <nav aria-label="Social" className="flex items-center gap-3">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconLinkClasses}
          >
            <BrandIcon slug="github" size={18} />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLinkClasses}
          >
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className={iconLinkClasses}>
            <Mail size={18} aria-hidden />
          </a>
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="py-6 text-xs text-subtle">
          © {year} {site.name}
        </Container>
      </div>
    </footer>
  );
}
