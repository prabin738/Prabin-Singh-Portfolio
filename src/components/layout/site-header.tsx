import Link from "next/link";
import { site } from "@content/data/site";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#stack", label: "Stack" },
  { href: "/#experience", label: "Experience" },
  // Blog is left out of the nav until the launch rule in docs/04-content-copy.md (at least 2 posts) is met.
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const CV_HREF = "/Prabin-Singh-Thakuri-CV.pdf";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-fg">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href={CV_HREF} variant="primary" className="hidden lg:inline-flex">
            Download CV
          </Button>
          <MobileMenu navItems={NAV_ITEMS} cvHref={CV_HREF} />
        </div>
      </Container>
    </header>
  );
}
