import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

// Next.js automatically injects <meta name="robots" content="noindex"> for
// any route that calls notFound() / returns a 404 status, so no explicit
// robots field is needed here.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container as="section" className="flex flex-col items-start gap-6 py-24 lg:py-32">
      <span className="text-sm font-medium text-muted">404</span>
      <h1 className="text-3xl font-semibold text-fg sm:text-4xl">Page not found</h1>
      <p className="max-w-xl text-base text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/#projects" variant="secondary">
          See featured works
        </Button>
      </div>
    </Container>
  );
}
