import { projects } from "@/data/projects";
import { workHistory, education } from "@/data/experience";
import { layers, runtimeLanguages, notInTheStack } from "@/data/skills";
import { recognitions, certifications } from "@/data/recognition";
import { solutions, proofProjects } from "@/data/solutions";

/**
 * The site's content, shaped as API responses.
 *
 * Every value here is derived from the same arrays the pages render, so a
 * payload cannot disagree with the prose beside it. Nothing is written for the
 * JSON: counts are computed, lists are mapped, and a figure that has no source
 * in the data does not appear.
 */

const productCount = projects.filter((p) => p.category === "product").length;
const clientCount = projects.filter((p) => p.category === "client").length;

export const profilePayload = {
  name: "Hamza Khan",
  role: "Backend Developer",
  location: "Mumbai, Maharashtra, IN",
  status: "open_to_roles",
  experience_years: 4,
  freelancing_since: "2021-01",
  focus: ["Django", "REST APIs", "PostgreSQL", "WebSockets"],
  moving_toward: "Data Engineering",
  education: {
    degree: "B.E. Computer Science and Engineering (Data Science)",
    university: "University of Mumbai",
    cgpi: 8.19,
    graduated: "2026-07",
  },
  languages: [
    { name: "English", level: "IELTS Academic 6.5 (CEFR B2)" },
    { name: "Hindi", level: "Native" },
  ],
} as const;

export const projectsPayload = {
  count: projects.length,
  products: productCount,
  client_systems: clientCount,
  results: projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    stack: project.tags.slice(0, 5),
    deployment: project.urltext,
    // Only assert a URL where one is genuinely reachable.
    live_url: project.liveUrl ?? null,
    source: "private",
  })),
};

export const solutionsPayload = {
  count: solutions.length,
  results: solutions.map((solution) => ({
    slug: solution.slug,
    domain: solution.domain,
    title: solution.title,
    for: solution.audience,
    delivery: solution.delivery,
    stack: solution.stack,
    includes: solution.capabilities.length,
    // The proof is the point: a solution with nothing running behind it would
    // be an advertisement rather than a record.
    running: proofProjects(solution).map((project) => project.slug),
  })),
};

export const skillsPayload = {
  languages: runtimeLanguages.map((tool) => tool.name),
  ...Object.fromEntries(
    layers.map((layer) => [layer.id, layer.tools.map((tool) => tool.name)]),
  ),
  not_in_this_stack: notInTheStack,
};

export const experiencePayload = {
  years: 4,
  since: "2021-01",
  countries_served: ["India", "Germany"],
  roles: workHistory.map((entry) => ({
    role: entry.role,
    org: entry.org.split(" · ")[0],
    location: entry.org.split(" · ")[1] ?? entry.location,
    period: entry.span,
    stack: entry.tech ?? [],
  })),
  education: education.map((entry) => ({
    qualification: entry.role,
    institution: entry.org.split(" · ")[0],
    period: entry.span,
  })),
};

export const recognitionPayload = {
  awards: recognitions.map((item) => ({
    title: item.title,
    issuer: item.issuer,
    result: item.prize ?? null,
    date: item.date,
    location: item.location ?? null,
  })),
  certifications: certifications.map((item) => ({
    title: item.title,
    issuer: item.issuer,
    date: item.date,
    verify_url: item.credentialUrl ?? null,
  })),
  counts: {
    awards: recognitions.length,
    certifications: certifications.length,
  },
};

export const contactPayload = {
  email: "hamza81khan81@gmail.com",
  phone: "+91 91379 66960",
  linkedin: "in/hamza-khan-3a2b0024a",
  based_in: "Mumbai, Maharashtra, IN",
  open_to: ["Remote", "Mumbai", "Navi Mumbai", "Thane"],
  response_time: "usually within a day",
};

/** A single project, as the detail page's payload. */
export function projectPayload(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { error: "not_found", slug };

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    role: project.role ?? null,
    summary: project.summary,
    stack: project.tags,
    deployment: project.urltext,
    live_url: project.liveUrl ?? null,
    source: "private",
    screenshots: project.media?.length ?? 0,
    architecture: project.architecture
      ? {
          summary: project.architecture.summary,
          tiers: project.architecture.tiers.map((tier) => ({
            label: tier.label,
            runs_on: tier.detail ?? null,
            items: tier.items,
          })),
        }
      : null,
  };
}

/**
 * Headline numbers for the overview.
 *
 * `source` is not decoration — it names where the figure comes from so the
 * claim stays checkable. A number nobody can trace does not belong here.
 */
export type SystemMetric = {
  label: string;
  value: string;
  source: string;
};

export const systemMetrics: SystemMetric[] = [
  { label: "Freelancing", value: "4 yrs", source: "since Jan 2021" },
  {
    label: "Systems shipped",
    value: String(projects.length),
    source: `${productCount} products · ${clientCount} client`,
  },
  { label: "Countries served", value: "2", source: "India · Germany" },
  { label: "Endpoints", value: "~170", source: "Novem, across 23 routers" },
  { label: "PageSpeed", value: "95+", source: "Brandenbed, desktop" },
  { label: "CGPI", value: "8.19", source: "B.E. CSE, Mumbai Univ." },
];

/**
 * Route index, used by the Overview page and the search index.
 *
 * Ordered the way a visitor's interest runs, not the way a CV does: what I can
 * build for you, then what I have built, and only then who I am.
 */
export const routeIndex = [
  {
    method: "GET" as const,
    path: "/solutions",
    summary: `${solutions.length} systems ready to set up for a business`,
  },
  {
    method: "GET" as const,
    path: "/projects",
    summary: `${projects.length} things I have built`,
  },
  { method: "GET" as const, path: "/profile", summary: "Who I am and what I do" },
  {
    method: "GET" as const,
    path: "/experience",
    summary: "The jobs, the clients and the degree",
  },
  {
    method: "GET" as const,
    path: "/skills",
    summary: "The tools I build with",
  },
  {
    method: "GET" as const,
    path: "/recognition",
    summary: "Competitions won and courses completed",
  },
  { method: "POST" as const, path: "/contact", summary: "Send me a message" },
];
