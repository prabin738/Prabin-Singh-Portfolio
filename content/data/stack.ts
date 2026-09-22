// Interim content source for the home page Skills and Stacks section, same
// approach as content/data/projects.ts: a flat, filterable list now, moved
// into the full content pipeline (docs/07-content-and-data.md) later.
//
// Items are the confirmed stack groups from docs/04-content-copy.md section 7,
// remapped from those groups (Mobile, Web, Backend, Data, Tooling, Also,
// AI-assisted work) into the categories below. A skill can belong to more
// than one category (e.g. Tailwind CSS is both a frontend tool and a design
// tool), same pattern as `Project.categories` in projects.ts.

export type SkillCategory =
  | "frontend"
  | "design"
  | "backend"
  | "database"
  | "cloud-deployment"
  | "vibe-coding-tools"
  | "other"
  | "soft-skills";

export type Skill = {
  name: string;
  categories: SkillCategory[];
};

export const skills: Skill[] = [
  // Frontend
  { name: "React", categories: ["frontend"] },
  { name: "React Native", categories: ["frontend"] },
  { name: "Expo", categories: ["frontend"] },
  { name: "TypeScript", categories: ["frontend"] },
  { name: "Tailwind CSS", categories: ["frontend", "design"] },
  { name: "Bootstrap", categories: ["frontend", "design"] },
  { name: "Next.js", categories: ["frontend"] },
  { name: "Recharts", categories: ["frontend"] },
  { name: "Zustand", categories: ["frontend"] },

  // Design
  { name: "Figma basics", categories: ["design"] },
  { name: "Stitch AI", categories: ["design"] },

  // Backend
  { name: "Node.js", categories: ["backend"] },
  { name: "Express", categories: ["backend"] },
  { name: "System Design", categories: ["backend"] },
  { name: "REST API design", categories: ["backend"] },
  { name: "JWT", categories: ["backend"] },
  { name: "Rate limiting", categories: ["backend"] },

  // Database
  { name: "MongoDB", categories: ["database"] },
  { name: "Redis", categories: ["database"] },
  { name: "SQLite", categories: ["database"] },
  { name: "Cloudflare R2", categories: ["database"] },

  // Version control & cloud deployment
  { name: "Git", categories: ["cloud-deployment"] },
  { name: "GitHub", categories: ["cloud-deployment"] },
  { name: "CI/CD", categories: ["cloud-deployment"] },
  { name: "Render", categories: ["cloud-deployment"] },
  { name: "Vercel", categories: ["cloud-deployment"] },

  // Vibe coding tools (AI-assisted development)
  { name: "Claude Code", categories: ["vibe-coding-tools"] },
  { name: "Cursor", categories: ["vibe-coding-tools"] },
  { name: "GitHub Copilot", categories: ["vibe-coding-tools"] },
  { name: "Gemini Code Assist", categories: ["vibe-coding-tools"] },
  { name: "Codex", categories: ["vibe-coding-tools"] },

  // Other (SEO background, testing, ecommerce)
  { name: "Postman", categories: ["other"] },
  { name: "Google Play Console", categories: ["other"] },
  { name: "Search Engine Optimization", categories: ["other"] },
  { name: "Google Analytics 4", categories: ["other"] },
  { name: "Search Console", categories: ["other"] },
  { name: "Screaming Frog", categories: ["other"] },
  { name: "WooCommerce", categories: ["other"] },

  // Soft skills
  { name: "Problem solving", categories: ["soft-skills"] },
  { name: "Self-directed / ownership", categories: ["soft-skills"] },
  { name: "Client management", categories: ["soft-skills"] },
];

export const SKILL_GROUPS: { label: string; value: SkillCategory }[] = [
  { label: "Frontend", value: "frontend" },
  { label: "Design", value: "design" },
  { label: "Backend", value: "backend" },
  { label: "Database", value: "database" },
  { label: "Version control & cloud deployment", value: "cloud-deployment" },
  { label: "Vibe coding tools", value: "vibe-coding-tools" },
  { label: "Other", value: "other" },
  { label: "Soft skills", value: "soft-skills" },
];
