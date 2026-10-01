import { projects } from "@/data/projects";

/**
 * Site-wide facts: who this is, how to reach him, and the handful of numbers
 * the home page leads with.
 */

export const profile = {
  name: "Hamza Khan",
  role: "Software Engineer",
  location: "Mumbai, India",
  headline: "I build reliable web and desktop software.",
  intro:
    "I'm a 2026 Computer Science & Engineering graduate from the University of Mumbai, looking for my first full-time role as a software engineer. I build with Python and Django, React and TypeScript, and I've put that into practice across the projects on this site.",
  status: "Fresher · open to entry-level roles",
  openTo: ["Remote", "Mumbai", "Navi Mumbai", "Thane"],
  graduated: "2026",
  education:
    "B.E. in Computer Science & Engineering, University of Mumbai — CGPI 8.19 / 10",
  languages: [
    { name: "English", level: "IELTS Academic 6.5 (CEFR B2)" },
    { name: "Hindi", level: "Native" },
  ],
  focus: ["Python & Django", "React & TypeScript", "REST APIs", "PostgreSQL", "WebSockets"],
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
    title: "Backend & APIs",
    body: "Django, Django REST Framework and FastAPI services backed by well-designed PostgreSQL schemas, with role-based access and real-time features over WebSockets.",
  },
  {
    title: "Frontend",
    body: "Responsive, accessible interfaces in React, Next.js and TypeScript with Tailwind CSS — from marketing sites to data-heavy dashboards.",
  },
  {
    title: "Desktop apps",
    body: "Offline-first desktop applications with Tauri and Electron, local SQLite and DuckDB storage, and installers for Windows.",
  },
  {
    title: "Deployment",
    body: "Docker, CI pipelines with GitHub Actions, and deploying to Azure, DigitalOcean, Vercel and Render.",
  },
];
