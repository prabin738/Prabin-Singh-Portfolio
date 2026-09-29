// Interim content source for the home page Services section, same pattern as
// contact.ts. Each service points at one shipped project as proof, and its
// WhatsApp message names the service so the first chat already has context.

export type Service = {
  id: "backend" | "frontend" | "mobile" | "design";
  title: string;
  description: string;
  deliverables: string[];
  stack: string[];
  proof: { label: string; href: string };
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    id: "mobile",
    title: "Mobile app development",
    description: "Android apps built with React Native, taken from the first screen to the Google Play listing.",
    deliverables: [
      "Android first, ready for iOS from the same codebase",
      "Offline-first data that syncs when signal returns",
      "Google Play publishing and release updates",
    ],
    stack: ["React Native", "Expo", "TypeScript", "SQLite"],
    proof: { label: "See Mero Loksewa", href: "/projects/mero-loksewa" },
    whatsappMessage: "Hi Prabin, I found your portfolio and want to talk about a mobile app project.",
  },
  {
    id: "frontend",
    title: "Frontend development",
    description: "Web apps and admin dashboards in React that stay fast and easy to use as the data grows.",
    deliverables: [
      "Dashboards with charts, filters and exports",
      "Responsive layouts that work on phones",
      "Clean handoff to your API",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    proof: { label: "See the Max Media console", href: "/projects/max-media-admin-dashboard" },
    whatsappMessage: "Hi Prabin, I found your portfolio and want to talk about a web frontend project.",
  },
  {
    id: "backend",
    title: "Backend development",
    description: "REST APIs in Node.js and Express that handle login, data and file storage for your apps.",
    deliverables: [
      "Authenticated REST endpoints",
      "MongoDB data models and queries",
      "Deployment and file storage setup",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Cloudflare R2"],
    // Points at the Mero Loksewa case study's architecture section: the standalone
    // API page is still a "case study on its way" placeholder.
    proof: { label: "See the Mero Loksewa API", href: "/projects/mero-loksewa#architecture" },
    whatsappMessage: "Hi Prabin, I found your portfolio and want to talk about a backend or API project.",
  },
  {
    id: "design",
    title: "UI/UX design",
    description: "Screens and user flows planned in Figma before any code, so the build starts from a clear plan.",
    deliverables: [
      "User flows and wireframes",
      "Screen designs for mobile and web",
      "Designs your developers can build from",
    ],
    stack: ["Figma", "Stitch AI", "Tailwind CSS"],
    proof: { label: "See Mero Loksewa", href: "/projects/mero-loksewa" },
    whatsappMessage: "Hi Prabin, I found your portfolio and want to talk about a UI/UX design project.",
  },
];
