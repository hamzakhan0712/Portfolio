/** Education, newest first. */

export type TimelineEntry = {
  type: "work" | "education";
  role: string;
  org: string;
  location: string;
  period: string;
  /** Machine-readable period, used in the JSON payload. */
  span: string;
  bullets: string[];
  tech?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    type: "education",
    role: "B.E. — Computer Science and Engineering (Data Science)",
    org: "Saraswati College of Engineering · University of Mumbai",
    location: "Kharghar, Navi Mumbai",
    period: "2023 – Jul 2026",
    span: "2023 → 2026-07",
    bullets: [
      "Graduated Summer 2026 with CGPI 8.19 / 10 — 3318 / 4500 aggregate (73.73%).",
      "Direct second-year entry on the strength of the diploma; completed semesters III–VIII, each cleared on the first attempt.",
      "Strongest semesters: SGPI 9.32 (Sem V), 8.71 (Sem VIII) and 8.50 (Sem VII).",
    ],
    tech: [
      "Big Data Analytics",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Data Warehousing & Mining",
      "Data Analytics & Visualization",
      "Distributed Computing",
      "Cloud Computing",
      "DBMS",
      "Computer Networks",
      "Cryptography & System Security",
    ],
  },
  {
    type: "education",
    role: "Diploma in Computer Engineering — First Class",
    org: "Anjuman-I-Islam’s A. R. Kalsekar Polytechnic · MSBTE",
    location: "New Panvel, Navi Mumbai",
    period: "2021 – Jun 2023",
    span: "2021 → 2023-06",
    bullets: [
      "First Class with 72.63% aggregate — 1271 / 1750 marks across 191 credits.",
      "No backlogs at any point in the course; final semester scored 75.53% (First Class with Distinction).",
      "Direct second-year entry after HSC Science, with semesters I–II exempted.",
    ],
    tech: [
      "Programming with Python",
      "Mobile Application Development",
      "Web Development (PHP)",
      "Emerging Trends in IT",
      "Capstone Project",
    ],
  },
  {
    type: "education",
    role: "HSC (Science) & SSC",
    org: "Maharashtra State Board · Mumbai Divisional Board",
    location: "Mumbai, India",
    period: "2019 – 2021",
    span: "2019 → 2021",
    bullets: [
      "HSC (Science), 2021 — 87.50%, with Chemistry 94 and Physics 91.",
      "SSC, 2019 — 81.20%, passed in the Distinction grade.",
    ],
  },
];

export const education = timeline.filter((entry) => entry.type === "education");
