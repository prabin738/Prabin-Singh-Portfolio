// Interim content source for the home page Contact section, same pattern as
// about.ts and experience.ts.

export type EngagementType = {
  label: string;
  description: string;
};

export const engagementTypes: EngagementType[] = [
  { label: "Full-time", description: "Ready to join a team and own a product end to end." },
  { label: "Part-time", description: "A set number of hours a week, alongside your team." },
  { label: "Contract", description: "A fixed-scope build, from a single feature to a full app." },
];
