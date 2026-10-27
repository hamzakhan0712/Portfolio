import { projects } from "@/data/projects";

/**
 * Site-wide facts: who this is, how to reach him, and the handful of numbers
 * the home page leads with.
 */

export const profile = {
  name: "Hamza Khan",
  role: "Full-Stack Software Engineer",
  location: "Mumbai, India",
  headline: `I've shipped ${projects.length} products — online stores, CRMs, billing and analytics apps — and built each one from the database to the screen.`,
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

/* Counted from the project data, so the numbers can't drift from the work. */
const live = projects.filter((project) => project.liveUrl).length;
const desktop = projects.filter((project) => project.kind === "Desktop app").length;

export const metrics: Metric[] = [
  {
    id: "shipped",
    value: String(projects.length),
    label: "Products shipped",
    source: "Web apps, websites and desktop apps",
  },
  {
    id: "live",
    value: String(live),
    label: "Live on the web",
    source: "Client websites in production",
  },
  {
    id: "desktop",
    value: String(desktop),
    label: "Windows desktop apps",
    source: "Packaged with their own installers",
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

/** About, Education and Recognition are one place with three views. */
export const aboutTabs = [
  { to: "/about", label: "About me" },
  { to: "/education", label: "Education" },
  { to: "/recognition", label: "Recognition" },
];

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about", also: ["/education", "/recognition"] },
  { label: "Contact", href: "/contact" },
];

/** Every page the site has, used by the 404 page and the render smoke test. */
export const allRoutes: string[] = [
  ...navigation.map((item) => item.href),
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
