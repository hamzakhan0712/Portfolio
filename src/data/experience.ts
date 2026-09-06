/**
 * Roles and qualifications, newest first.
 *
 * Lifted out of the old timeline component so the reference page and the JSON
 * payload read from the same array — a figure can no longer be right in one
 * place and stale in the other.
 */

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
    type: "work",
    role: "Independent Product Development — Novem",
    org: "Self-Employed · Mumbai, India",
    location: "Remote",
    period: "Dec 2025 – Present",
    span: "2025-12 → present",
    bullets: [
      "Building Novem, a local-first e-commerce intelligence desktop app — a Tauri (Rust) shell over a Python FastAPI engine, with DuckDB for analytical tables and SQLite for settings and lineage.",
      "Solo across product, architecture, engine, client and packaging: 23 routers and roughly 170 endpoints, demand forecasting, RFM segmentation, CLV and market-basket models, and a local LLM copilot so data never leaves the machine.",
      "CI gates every push — Ruff, pytest across Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest and a production build. Releases ship frozen with PyInstaller inside an NSIS installer.",
    ],
    tech: [
      "Tauri",
      "Rust",
      "FastAPI",
      "DuckDB",
      "React 19",
      "TypeScript",
      "scikit-learn",
      "PyInstaller",
    ],
  },
  {
    type: "work",
    role: "Freelance Full-Stack Developer",
    org: "Brandenbed Living Spaces UG · Berlin, Germany",
    location: "Remote",
    period: "Sep 2025 – Nov 2025",
    span: "2025-09 → 2025-11",
    bullets: [
      "Built the company's production website for serviced apartment operations across European markets. Achieved a Google PageSpeed Insights score of 95+ on desktop.",
      "Developed an internal CRM with role-based access for property management and client communication workflows.",
      "Worked remotely with the founding team and iterated on features over the engagement.",
    ],
    tech: ["Django", "PostgreSQL", "Next.js", "Tailwind CSS", "Docker", "Azure"],
  },
  {
    type: "work",
    role: "Freelance Backend Developer",
    org: "Self-Employed · Mumbai, India",
    location: "Remote",
    period: "Jan 2021 – Aug 2025",
    span: "2021-01 → 2025-08",
    bullets: [
      "Delivered Django-based web applications and REST APIs for clients in India and abroad — solo across the full project lifecycle: requirements, development, deployment, maintenance.",
      "Built role-based access systems, real-time WebSocket features using Django Channels, and PostgreSQL-backed CRMs and e-commerce platforms.",
      "Deployed and maintained applications on Azure, DigitalOcean, Render, and Hostinger using Docker.",
      "Industries served: real estate, call center operations, retail and e-commerce, import/export.",
    ],
    tech: [
      "Python",
      "Django",
      "DRF",
      "Django Channels",
      "PostgreSQL",
      "Azure",
      "Docker",
    ],
  },
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

export const workHistory = timeline.filter((entry) => entry.type === "work");
export const education = timeline.filter((entry) => entry.type === "education");
