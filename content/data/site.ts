export const site = {
  name: "Prabin Singh Thakuri",
  role: "Full-stack developer",
  city: "Kathmandu",
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
