import Link from "next/link";
import { Check, Monitor, PenTool, Server, Smartphone, type LucideIcon } from "lucide-react";
import { services, type Service } from "@content/data/services";
import { whatsappHref } from "@/lib/whatsapp";
import { trackClick } from "@/lib/analytics";
import { Section } from "@/components/layout/section";
import { BentoTile } from "@/components/bento/bento-tile";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { BrandIcon } from "@/components/ui/brand-icon";

const SERVICE_ICON: Record<Service["id"], LucideIcon> = {
  mobile: Smartphone,
  frontend: Monitor,
  backend: Server,
  design: PenTool,
};

const WORK_WITH_ME_HREF = whatsappHref("Hi Prabin, I found your portfolio and want to start a project with you.");

export function ServicesSection() {
  return (
    <Section
      id="services"
      heading="Services"
      description="What I can build for you, from the first screen design to the API and the Google Play listing."
    >
      <div className="flex flex-col gap-3 sm:gap-3.5">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {services.map((service) => {
            const Icon = SERVICE_ICON[service.id];
            return (
              <BentoTile key={service.id} as="li" size="small" className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised text-primary-fg">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-fg">{service.title}</h3>
                    <p className="mt-2 text-base text-muted">{service.description}</p>
                  </div>
                </div>

                <ul aria-label={`What you get with ${service.title.toLowerCase()}`} className="flex flex-col gap-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg">
                      <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-marigold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {service.stack.map((label) => (
                    <Chip key={label}>{label}</Chip>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
                  <Button
                    href={whatsappHref(service.whatsappMessage)}
                    variant="tinted"
                    aria-label={`Let's talk about ${service.title.toLowerCase()} on WhatsApp`}
                    {...trackClick("whatsapp_click", `services-${service.id}`)}
                  >
                    <BrandIcon slug="whatsapp" size={18} />
                    Let&apos;s talk
                  </Button>
                  <Link
                    href={service.proof.href}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-muted underline-offset-4 hover:text-fg hover:underline"
                  >
                    {service.proof.label}
                  </Link>
                </div>
              </BentoTile>
            );
          })}
        </ul>

        <BentoTile size="banner" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold text-fg">Ready to start building?</h3>
            <p className="mt-2 text-base text-muted">
              Send me a short note about your idea on WhatsApp and I&apos;ll reply with next steps.
            </p>
          </div>
          <Button
            href={WORK_WITH_ME_HREF}
            variant="primary"
            className="shrink-0"
            {...trackClick("whatsapp_click", "services-banner")}
          >
            <BrandIcon slug="whatsapp" size={18} />
            Work with me
          </Button>
        </BentoTile>
      </div>
    </Section>
  );
}
