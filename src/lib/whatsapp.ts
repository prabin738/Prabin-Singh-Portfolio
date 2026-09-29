import { site } from "@content/data/site";

// Every WhatsApp CTA opens a chat with a prefilled message, so the first message
// already says what the visitor wants to talk about.
export function whatsappHref(message: string): string {
  return `${site.links.whatsapp}?text=${encodeURIComponent(message)}`;
}
