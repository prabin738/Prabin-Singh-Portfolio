// Production domain, single source of truth for canonical URLs, the sitemap,
// robots.txt, JSON-LD and Open Graph tags. Override with NEXT_PUBLIC_SITE_URL
// (e.g. for a staging domain) without touching this file.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://prabinsinghthakuri.com.np").replace(/\/$/, "");

export const site = {
  name: "Prabin Singh Thakuri",
  role: "Full-stack developer",
  city: "Kathmandu",
  url: SITE_URL,
  email: "prabinsingh750@gmail.com", // TODO(prabin): consider a dedicated address
  availability: { open: true, text: "Open to full-time, part-time or contract work" },
  links: {
    github: "https://github.com/prabin738",
    linkedin: "https://linkedin.com/in/prabin-singh-thakuri",
    whatsapp: "https://wa.me/9779866498278",
  },
  numbers: [
    { label: "downloads on Google Play", value: "1,000+" },
    { label: "average rating on Google Play", value: "4.3" },
  ],
  // Max Media is named on the home page now, so it no longer needs hiding.
  hiddenClientNames: ["Coca-Cola"],
} as const;
