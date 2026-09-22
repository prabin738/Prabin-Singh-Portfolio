// Interim content source for the home page About section, same pattern as
// site.ts and experience.ts. Copy comes from docs/04-content-copy.md section 5;
// education and certifications come from the resume.

export const aboutCopy = [
  "I started in SEO in 2022. Most of my work was technical audits: crawlability, indexation and canonical tag issues, mostly on custom-built sites, plus schema markup, sitemaps and robots.txt. I wrote the reports and sent them to a developer to fix.",
  "Waiting on someone else to fix what I had found got old, so I started fixing it myself. That took me from WordPress into full-stack work at Clicklab Digital, then into React Native, Node.js and MongoDB — I build as a MERN stack developer now.",
  "I completed my BCA at Nepal Information Technology in July 2026. Outside client work I publish Mero Loksewa, my own app on Google Play.",
];

export const education = {
  degree: "Bachelor of Computer Application (BCA)",
  institution: "Nepal Information Technology",
  location: "Jawalakhel, Lalitpur",
  completed: "July 2026",
};

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: Certification[] = [
  { name: "Node.js, Express, MongoDB & More: The Complete Bootcamp", issuer: "Jonas Schmedtmann, Udemy" },
  { name: "React Crash Course: From Zero to Hero", issuer: "Udemy" },
  { name: "Google Analytics Certification", issuer: "Skillshop" },
  { name: "SemRush SEO Crash Course with Brian Dean", issuer: "SemRush Academy" },
];
