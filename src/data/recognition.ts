/**
 * Awards, competitions and certifications.
 *
 * Only judged results and certifications that test real skill belong here.
 * Introductory video courses were removed: they are weaker evidence than the
 * projects themselves. A certification added later (cloud, for example) gets
 * its own section on the Recognition page automatically.
 */

export type AchievementType = "certification" | "hackathon" | "award";

export type Achievement = {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  image?: string;
  description: string;
  location?: string;
  prize?: string;
};

export const achievements: Achievement[] = [
  {
    id: "sih-2025",
    type: "hackathon",
    title: "Smart India Hackathon 2025 — Grand Finale, Software Edition",
    issuer: "Ministry of Education, Government of India",
    date: "Dec 08–09, 2025",
    prize: "Grand Finalist",
    location: "BPUT, Rourkela",
    skills: ["Team Lead", "System Design", "Full-Stack", "API Development"],
    image: "/credentials/sih-2025.webp",
    description:
      "Competed in the Smart India Hackathon 2025 Software Edition Grand Finale, held 8–9 December 2025 at Biju Patnaik University of Technology, Rourkela, under the Ministry of Education’s Innovation Cell.",
  },
  {
    id: "scoe-avishkar",
    type: "award",
    title: "SCOE Avishkar 2025 — 2nd Place",
    issuer: "Saraswati College of Engineering",
    date: "Apr 04, 2025",
    prize: "2nd Place",
    location: "Kharghar, Navi Mumbai",
    skills: ["Team Lead", "Project Design", "Technical Presentation"],
    image: "/credentials/scoe-avishkar-2025.webp",
    description:
      "Awarded 2nd place in the SCOE Avishkar 2025 project competition held on 4 April 2025 at Saraswati College of Engineering, Kharghar.",
  },
];

/** Judged competitions — the part of this list that was won, not attended. */
export const recognitions = achievements.filter(
  (item) => item.type !== "certification",
);

export const certifications = achievements.filter(
  (item) => item.type === "certification",
);
