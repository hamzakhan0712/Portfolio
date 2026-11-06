import { clientProjects, independentProjects, projects } from "@/data/projects";

/**
 * Site-wide facts: who this is, how to reach him, and the handful of numbers
 * the home page leads with.
 */

export const profile = {
  name: "Hamza Khan",
  role: "Software Engineer",
  location: "Mumbai, India",
  headline: `Freelance software engineer since 2024. I've delivered ${clientProjects.length} client projects and built ${independentProjects.length} products of my own — CRMs, billing, commerce and analytics apps — each from the database to the screen.`,
  /** Said once, under the hero; the footer and About don't repeat it. */
  locationLine: "Based in Mumbai. Open to remote roles, or on-site across Mumbai, Navi Mumbai and Thane.",
  status: "Open to full-time roles",
  openTo: ["Remote", "Mumbai", "Navi Mumbai", "Thane"],
  graduated: "2026",
  education:
    "B.E. in Computer Science & Engineering, University of Mumbai — CGPI 8.19 / 10",
  languages: [
    { name: "English", level: "Professional working proficiency" },
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
export type Metric = { id: string; value: string; label: string; source: string };

/* Counted from the project data, so the numbers can't drift from the work —
   and split by who it was for, so own products are never counted as client work. */
const liveClientSites = clientProjects.filter((project) => project.liveUrl).length;

export const metrics: Metric[] = [
  {
    id: "client",
    value: String(clientProjects.length),
    label: "Client projects",
    source: "Freelance, 2024 – present",
  },
  {
    id: "live",
    value: String(liveClientSites),
    label: "Client sites live",
    source: "In production on the client's own domain",
  },
  {
    id: "independent",
    value: String(independentProjects.length),
    label: "Independent products",
    source: "Designed and built end to end",
  },
  {
    id: "award",
    value: "SIH ’25",
    label: "Grand Finalist",
    source: "Smart India Hackathon, Govt. of India",
  },
];

/** Main navigation. `also` lists the pages that light the item up too. */
export type NavItem = { label: string; href: string; also?: string[] };

/** About, Experience, Education and Recognition are one place with four views. */
export const aboutTabs = [
  { to: "/about", label: "About me" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/recognition", label: "Recognition" },
];

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about", also: ["/experience", "/education", "/recognition"] },
  { label: "Contact", href: "/contact" },
];

/** Every page the site has, used by the 404 page and the render smoke test. */
export const allRoutes: string[] = [
  ...navigation.map((item) => item.href),
  "/experience",
  "/education",
  "/recognition",
  ...projects.map((project) => `/projects/${project.slug}`),
];

/** The areas I work in, shown on the home page. */
export const strengths = [
  {
    id: "backend",
    title: "Backend & APIs",
    body: "Django and FastAPI services over well-designed PostgreSQL schemas, with role-based access and real-time features over WebSockets.",
  },
  {
    id: "frontend",
    title: "Frontend",
    body: "Responsive, accessible interfaces in React, Next.js and TypeScript with Tailwind CSS — from marketing sites to data-heavy dashboards.",
  },
  {
    id: "desktop",
    title: "Desktop apps",
    body: "Offline-first desktop apps with Tauri and Electron, local SQLite storage, and Windows installers with automatic updates.",
  },
  {
    id: "deployment",
    title: "Deployment",
    body: "Docker, CI pipelines with GitHub Actions, and deploying to Vercel, Cloudflare and Hostinger.",
  },
];
