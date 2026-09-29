import { site, SITE_URL } from "@content/data/site";
import { education } from "@content/data/about";
import { experience } from "@content/data/experience";
import { services } from "@content/data/services";
import { JsonLd } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { HeroSection } from "@/components/hero/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StackSection } from "@/components/sections/stack-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  const personId = `${SITE_URL}/#person`;
  const currentRole = experience.find((entry) => entry.current);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        jobTitle: site.role,
        url: SITE_URL,
        image: absoluteUrl("/img/portrait/portrait-1080.webp"),
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "NP" },
        ...(currentRole ? { worksFor: { "@type": "Organization", name: currentRole.company } } : {}),
        alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
        sameAs: [site.links.github, site.links.linkedin],
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.description },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <HeroSection />

      <ProjectsSection />

      <ServicesSection />

      <StackSection />

      <ExperienceSection />

      <AboutSection />

      <ContactSection />
    </>
  );
}
