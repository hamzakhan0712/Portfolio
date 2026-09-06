/**
 * Awards, competitions and courses.
 *
 * Competitions carry weight because they were judged; courses are supporting
 * detail. The split below keeps that distinction visible rather than pooling
 * everything into one undifferentiated wall of badges.
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
  {
    id: "ielts-academic",
    type: "certification",
    title: "IELTS Academic — Overall Band 6.5 (CEFR B2)",
    issuer: "British Council · IDP · Cambridge English",
    date: "Jun 21, 2026",
    skills: ["Speaking 7.0", "Listening 6.5", "Reading 6.5", "Writing 6.0"],
    description:
      "Academic IELTS taken on 21 June 2026. Overall band 6.5, mapped to CEFR level B2, with the strongest result in Speaking at 7.0.",
  },
  {
    id: "ibm-excel",
    type: "certification",
    title: "Excel Basics for Data Analysis",
    issuer: "Coursera · IBM",
    date: "Jan 14, 2026",
    credentialUrl: "https://coursera.org/verify/FR1K9EGNYF13",
    skills: ["Excel", "Data Analysis"],
    image: "/credentials/ibm-excel.webp",
    description:
      "Foundational data analysis with Excel: formulas, pivot tables, and structured data exploration. An online non-credit course authorised by IBM.",
  },
  {
    id: "udemy-data-analyst",
    type: "certification",
    title: "Complete Data Analyst Bootcamp — From Basics to Advanced",
    issuer: "Udemy · Krish Naik, Jayant Topnani (KRISHAI Technologies)",
    date: "Dec 17, 2025",
    credentialUrl: "https://ude.my/UC-b1faff47-bbc7-4820-8f38-e7fca8a3db50",
    skills: ["SQL", "Python", "Data Analysis", "Statistics"],
    image: "/credentials/udemy-data-analyst.webp",
    description:
      "89-hour data analyst curriculum covering SQL, Python, statistics, and visualisation for data-driven decision making.",
  },
  {
    id: "ibm-data-analytics",
    type: "certification",
    title: "Introduction to Data Analytics",
    issuer: "Coursera · IBM",
    date: "Dec 31, 2025",
    credentialUrl: "https://coursera.org/verify/LSQ1WS8X39CZ",
    skills: ["Data Analytics", "BI Tools"],
    image: "/credentials/ibm-data-analytics.webp",
    description:
      "Overview of the data analytics lifecycle, common tools, and the role of an analyst in modern data teams.",
  },
  {
    id: "udemy-fullstack",
    type: "certification",
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy · Dr. Angela Yu",
    date: "Nov 15, 2025",
    credentialUrl: "https://ude.my/UC-7955329a-129d-422d-99ab-6ca2fd9930f4",
    skills: ["JavaScript", "Node.js", "React", "Databases"],
    image: "/credentials/udemy-fullstack.webp",
    description:
      "61.5-hour full-stack bootcamp covering modern web fundamentals through to production deployment.",
  },
  {
    id: "great-learning-ds",
    type: "certification",
    title: "Introduction to Data Science",
    issuer: "Great Learning",
    date: "Oct 22, 2025",
    credentialUrl: "https://www.mygreatlearning.com/certificate/EHSCOIET",
    skills: ["Data Science", "Python", "Statistics"],
    image: "/credentials/great-learning-data-science.webp",
    description:
      "Online course introducing data science workflows, Python tooling, and applied machine learning concepts.",
  },
  {
    id: "aptitude-training",
    type: "certification",
    title: "Aptitude, Lifeskills & Technical Training Programme",
    issuer:
      "Saraswati College of Engineering · Institution’s Innovation Council",
    date: "2025",
    location: "Kharghar, Navi Mumbai",
    skills: ["Aptitude", "Life Skills", "Technical Training"],
    image: "/credentials/scoe-aptitude-programme.webp",
    description:
      "Institute certification programme covering quantitative aptitude, life skills, and core technical training, facilitated by Campus Credentials.",
  },
  {
    id: "cisco-python-essentials",
    type: "certification",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy · OpenEDG Python Institute",
    date: "Jun 07, 2024",
    skills: ["Python 3", "Algorithmic Thinking", "Standard Library"],
    image: "/credentials/cisco-python-essentials.webp",
    description:
      "Student-level Statement of Achievement for Python Essentials 1: designing, debugging and refactoring Python 3 programs and applying the standard library.",
  },
];

/** Judged competitions — the part of this list that was won, not attended. */
export const recognitions = achievements.filter(
  (item) => item.type !== "certification",
);

export const certifications = achievements.filter(
  (item) => item.type === "certification",
);
