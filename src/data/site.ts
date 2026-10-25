import { projects } from "@/data/projects";

/**
 * Site-wide facts: who this is, how to reach him, and the handful of numbers
 * the home page leads with.
 */

export const profile = {
  name: "Hamza Khan",
  role: "Full-Stack Software Engineer",
  location: "Mumbai, India",
  headline: "I build complete products, from the database to the interface.",
  intro:
    "I design and ship full-stack software: Django and FastAPI services over PostgreSQL, interfaces in React, Next.js and TypeScript, and offline-first desktop apps. Every project here runs end to end, and each one has a recorded walkthrough.",
  status: "Open to full-time roles",
  openTo: ["Remote", "Mumbai", "Navi Mumbai", "Thane"],
  graduated: "2026",
  education:
    "B.E. in Computer Science & Engineering, University of Mumbai — CGPI 8.19 / 10",
  languages: [
    { name: "English", level: "IELTS Academic 6.5 (CEFR B2)" },
    { name: "Hindi", level: "Native" },
  ],
  focus: ["Python & Django", "FastAPI", "React & TypeScript", "Next.js", "PostgreSQL", "REST APIs", "WebSockets"],
  cv: "/documents/Hamza_Khan_CV.pdf",
  vcard: "/documents/hamza-khan.vcf",
} as const;

export const contact = {
  email: "hamza81khan81@gmail.com",
  phone: "+91 91379 66960",
  linkedin: "https://www.linkedin.com/in/hamza-khan-3a2b0024a/",
  linkedinHandle: "in/hamza-khan-3a2b0024a",
  github: "https://github.com/hamzakhan0712",
  githubHandle: "hamzakhan0712",
  basedIn: "Mumbai, Maharashtra, India",
  responseTime: "usually within a day",
} as const;

/** Headline numbers on the home page. */
export type Metric = { value: string; label: string; source: string };

export const metrics: Metric[] = [
  {
    value: profile.graduated,
    label: "B.E. graduate",
    source: "Computer Science & Engineering",
  },
  {
    value: String(projects.length),
    label: "Projects",
    source: "Web apps, websites and desktop apps",
  },
  {
    value: "SIH ’25",
    label: "Grand Finalist",
    source: "Smart India Hackathon, Govt. of India",
  },
  { value: "8.19", label: "CGPI out of 10", source: "University of Mumbai" },
];

/** Main navigation. */
export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Skills", href: "/skills" },
  { label: "Awards", href: "/recognition" },
  { label: "Contact", href: "/contact" },
];

/** Every page the site has, used by the 404 page and the render smoke test. */
export const allRoutes: string[] = [
  ...navigation.map((item) => item.href),
  ...projects.map((project) => `/projects/${project.slug}`),
];

/** The areas I work in, shown on the home page. */
export const strengths = [
  {
    id: "backend",
    title: "Backend & APIs",
    body: "Django, Django REST Framework and FastAPI services backed by well-designed PostgreSQL schemas, with role-based access and real-time features over WebSockets.",
  },
  {
    id: "frontend",
    title: "Frontend",
    body: "Responsive, accessible interfaces in React, Next.js and TypeScript with Tailwind CSS — from marketing sites to data-heavy dashboards.",
  },
  {
    id: "desktop",
    title: "Desktop apps",
    body: "Offline-first desktop applications with Tauri and Electron, local SQLite and DuckDB storage, and installers for Windows.",
  },
  {
    id: "deployment",
    title: "Deployment",
    body: "Docker, CI pipelines with GitHub Actions, and deploying to Azure, DigitalOcean, Vercel and Render.",
  },
];
