import Link from "next/link";
import { site } from "@content/data/site";
import { Container } from "@/components/layout/container";

const textLinkClasses = "text-sm font-medium text-muted hover:text-fg";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            {site.role} in {site.city}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Social" className="flex items-center gap-6">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClasses}
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClasses}
            >
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className={textLinkClasses}>
              Email
            </a>
          </nav>

          <Link href="#main" className={textLinkClasses}>
            Back to top
          </Link>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="py-6 text-xs text-subtle">
          © {year} {site.name}
        </Container>
      </div>
    </footer>
  );
}
