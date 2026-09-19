import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { notInTheStack } from "@/data/skills";

/**
 * Site-wide facts: who this is, how to reach him, and the handful of numbers
 * the home page leads with.
 *
 * Every figure here is either computed from the data files or traceable to a
 * document — nothing is written for effect. If a number has no source, it
 * does not belong on the site.
 */

export const profile = {
  name: "Hamza Khan",
  role: "Software Engineer",
  location: "Mumbai, India",
  headline: "I build software that businesses run on.",
  intro:
    "For the past four years I have designed, built and delivered complete software systems — websites, business management tools and desktop applications — for real businesses. Everything on this site is real software, shown running.",
  status: "Open to full-time roles",
  openTo: ["Remote", "Mumbai", "Navi Mumbai", "Thane"],
  experienceYears: 4,
  freelancingSince: "January 2021",
  education:
    "B.E. in Computer Science & Engineering (Data Science), University of Mumbai — CGPI 8.19 / 10",
  languages: [
    { name: "English", level: "IELTS Academic 6.5 (CEFR B2)" },
    { name: "Hindi", level: "Native" },
  ],
  focus: ["Python & Django", "Web applications", "Databases", "Real-time features"],
  movingToward: "Data engineering",
  cv: "/documents/Hamza_Khan_CV.pdf",
  vcard: "/documents/hamza-khan.vcf",
} as const;

export const contact = {
  email: "hamza81khan81@gmail.com",
  phone: "+91 91379 66960",
  linkedin: "https://www.linkedin.com/in/hamza-khan-3a2b0024a/",
  linkedinHandle: "in/hamza-khan-3a2b0024a",
  basedIn: "Mumbai, Maharashtra, India",
  responseTime: "usually within a day",
} as const;

const productCount = projects.filter((p) => p.category === "product").length;
const clientCount = projects.filter((p) => p.category === "client").length;

/**
 * Headline numbers. `source` names where each one comes from so the claim
 * stays checkable — a number nobody can trace is decoration.
 */
export type Metric = { value: string; label: string; source: string };

export const metrics: Metric[] = [
  {
    value: `${profile.experienceYears}+`,
    label: "Years building software",
    source: "Freelancing since Jan 2021",
  },
  {
    value: String(projects.length),
    label: "Finished systems",
    source: `${productCount} own products · ${clientCount} for clients`,
  },
  {
    value: "SIH ’25",
    label: "Grand Finalist",
    source: "Smart India Hackathon, Govt. of India",
  },
  { value: "8.19", label: "CGPI out of 10", source: "B.E. CSE, University of Mumbai" },
];

/** Main navigation, in the order a visitor's interest usually runs. */
export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Awards", href: "/recognition" },
  { label: "Contact", href: "/contact" },
];

/** Every page the site has, used by the 404 page and the render smoke test. */
export const allRoutes: string[] = [
  ...navigation.map((item) => item.href),
  ...projects.map((project) => `/projects/${project.slug}`),
];

/** How an engagement runs, in the words a business owner would use. */
export const engagementSteps = [
  {
    title: "We talk",
    body: "A call about what you run today, what is slow or manual, and what a working system would change for you.",
  },
  {
    title: "A fixed scope",
    body: "Setup and branding, the changes your business needs, your data imported, and a clear list of what is included.",
  },
  {
    title: "You get a handover",
    body: "Something you can keep running without me. I built every system here myself, so you talk to the person writing the code.",
  },
];

/**
 * The honest other half of the site: the gaps, written down rather than left
 * for an interviewer to discover.
 */
export const gaps = [
  {
    title: "The code is private",
    body: "Client systems were built under commercial terms, and my own products are unreleased. Every project page shows screenshots, video and a written account instead of a repository link. I am glad to walk through any of it on a call.",
  },
  {
    title: "I have worked solo so far",
    body: "Every project on this site was specified, built, deployed and maintained by one person. That is the strength and the ceiling of the list — I have not yet worked inside a large existing codebase with a team, and that is the gap I am looking to close.",
  },
  {
    title: "Some tools I have not used in production",
    body: `${notInTheStack.join(", ")}. These do not appear in any project here because I have not run them for real — a statement about my track record, not about what I can learn.`,
  },
];

/** Plain-English one-liners for the services, keyed by slug. */
export const serviceCount = solutions.length;
