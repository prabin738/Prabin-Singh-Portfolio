export const site = {
  name: "Prabin Singh Thakuri",
  role: "Full-stack developer",
  city: "Kathmandu",
  email: "prabinsingh750@gmail.com", // TODO(prabin): consider a dedicated address
  availability: { open: true, text: "Open to full-stack roles" },
  links: {
    github: "https://github.com/prabin738",
    linkedin: "https://linkedin.com/in/prabin-singh-thakuri",
  },
  numbers: [
    { label: "downloads on Google Play", value: "1,000+" },
    { label: "average rating on Google Play", value: "4.3" },
  ],
  hiddenClientNames: ["Coca-Cola", "Max Media"],
} as const;
