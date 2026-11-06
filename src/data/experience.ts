import { clientProjects, independentProjects } from "@/data/projects";

/** Work and education, newest first. */

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
  /** Project slugs this entry covers, linked from the entry. */
  projects?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    type: "work",
    role: "Software Engineer (Freelance)",
    org: "Self-employed",
    location: "Mumbai · remote",
    period: "2024 – Present",
    span: "2024 → present",
    bullets: [
      `Sole engineer on ${clientProjects.length} client projects across real estate, industrial supply and Europe–India trade consulting — owning requirements, data model, build, deployment and handover on each.`,
      "Shipped on three platforms: Next.js and Astro websites on Cloudflare Workers, Vercel and Hostinger; a Next.js admin with WhatsApp Cloud API and Meta Graph API integrations; and an Electron desktop app installed on the client's machines with automatic updates.",
      "Designed content-as-data setups so client staff update live sites without a developer — a Google Sheet that rebuilds the Key2YourHome site, and an admin that publishes S.K Trading's products and stock.",
      "Automated GST billing for an industrial trader: quotation → proforma → tax invoice → delivery challan, with CGST/SGST vs IGST worked out from place of supply.",
      "Worked directly with non-technical owners, turning billing, enquiry handling and sales processes into working software with written handover guides.",
      `Alongside client work, built ${independentProjects.length} independent products, including NOVEM, a local-first analytics desktop app on Tauri, FastAPI and DuckDB.`,
    ],
    tech: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Electron",
      "SQLite",
      "Cloudflare Workers",
      "Playwright",
      "GitHub Actions",
    ],
    projects: clientProjects.map((project) => project.slug),
  },
  {
    type: "education",
    role: "B.E. — Computer Science and Engineering (Data Science)",
    org: "Saraswati College of Engineering · University of Mumbai",
    location: "Kharghar, Navi Mumbai",
    period: "2023 – Jul 2026",
    span: "2023 → 2026-07",
    bullets: [
      "Graduated in 2026 with CGPI 8.19 / 10.",
      "Joined in the second year (lateral entry) after the diploma.",
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
    bullets: ["First Class, 72.63% aggregate."],
    tech: [
      "Programming with Python",
      "Mobile Application Development",
      "Web Development (PHP)",
      "Emerging Trends in IT",
      "Capstone Project",
    ],
  },
];

export const education = timeline.filter((entry) => entry.type === "education");
export const work = timeline.filter((entry) => entry.type === "work");
