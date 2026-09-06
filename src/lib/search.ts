import { projects } from "@/data/projects";
import { routeIndex, contactPayload } from "@/data/payloads";
import { notInTheStack } from "@/data/skills";

/**
 * A small retrieval index over the site's own content.
 *
 * There is no model behind this and no network call — the answers are composed
 * from documents built out of the same data the pages render. That is a
 * deliberate trade: it can only say things the site already asserts, which is
 * exactly the property you want on a portfolio. It cannot invent a job, a
 * client or a number.
 */

export type DocKind = "project" | "page" | "fact";

export type Doc = {
  id: string;
  title: string;
  kind: DocKind;
  /** Where selecting this result should take you. */
  href: string;
  /** Shown under the title in the results list. */
  snippet: string;
  /** Free text, searched at lower weight. */
  body: string;
  /** Exact-ish terms, searched at higher weight. */
  keywords: string[];
};

const PAGE_DOCS: Doc[] = [
  {
    id: "page-overview",
    title: "Overview",
    kind: "page",
    href: "/",
    snippet: "Who I am, and how this reference is laid out",
    body: "overview home introduction backend developer mumbai start here index root",
    keywords: ["overview", "home", "start", "intro", "index"],
  },
  {
    id: "page-authentication",
    title: "How this works",
    kind: "page",
    href: "/authentication",
    snippet: "Why the site is laid out like documentation",
    body: "authentication auth token key none server transport reaching a person response time rate limit",
    keywords: ["auth", "authentication", "token", "server", "api key"],
  },
  {
    id: "page-errors",
    title: "What I don't do",
    kind: "page",
    href: "/errors",
    snippet: "The gaps in my experience, written down",
    body: `errors limitations gaps not implemented source private solo maintainer weaknesses ${notInTheStack.join(" ")}`,
    keywords: ["errors", "limits", "gaps", "weakness", "missing", "not"],
  },
  {
    id: "page-profile",
    title: "Profile",
    kind: "page",
    href: "/profile",
    snippet: "Backend developer, four years freelance, Mumbai",
    body: "profile about backend developer django pragmatic production deployment mumbai india freelance 2021 data engineering bio who",
    keywords: ["profile", "about", "who", "bio", "background", "story"],
  },
  {
    id: "page-experience",
    title: "Experience",
    kind: "page",
    href: "/experience",
    snippet: "Roles and qualifications, newest first",
    body: "experience career education timeline novem brandenbed berlin germany freelance backend developer university mumbai diploma msbte hsc ssc changelog",
    keywords: ["experience", "career", "education", "degree", "history", "jobs", "work"],
  },
  {
    id: "page-skills",
    title: "Skills & tools",
    kind: "page",
    href: "/skills",
    snippet: "The technologies I work with, in the order they run",
    body: "skills stack tech tools interface edge application data analytics languages python sql typescript javascript request path",
    keywords: ["skills", "stack", "tech", "tools", "technologies"],
  },
  {
    id: "page-projects",
    title: "My work",
    kind: "page",
    href: "/projects",
    snippet: `${projects.length} systems, grouped by who owns them`,
    body: "projects work portfolio products client systems shipped built index resources",
    keywords: ["projects", "work", "portfolio", "built", "shipped"],
  },
  {
    id: "page-recognition",
    title: "Awards & certificates",
    kind: "page",
    href: "/recognition",
    snippet: "Hackathons, awards and courses",
    body: "recognition achievements awards certifications smart india hackathon sih 2025 grand finalist avishkar ielts ibm coursera udemy cisco",
    keywords: ["awards", "hackathon", "sih", "certifications", "recognition", "prize"],
  },
  {
    id: "page-contact",
    title: "Contact",
    kind: "page",
    href: "/contact",
    snippet: "Email, phone and the message form",
    body: "contact email hire reach message linkedin cv resume mumbai remote available phone",
    keywords: ["contact", "email", "hire", "reach", "cv", "resume", "phone"],
  },
];

/** Facts that answer a direct question without needing a page. */
const FACT_DOCS: Doc[] = [
  {
    id: "fact-availability",
    title: "Open to backend developer roles",
    kind: "fact",
    href: "/contact",
    snippet: contactPayload.open_to.join(" · "),
    body: "available availability open to work hiring remote mumbai navi mumbai thane roles job",
    keywords: ["available", "hiring", "open", "job", "role", "remote"],
  },
  {
    id: "fact-education",
    title: "B.E. CSE (Data Science), University of Mumbai",
    kind: "fact",
    href: "/experience",
    snippet: "CGPI 8.19 / 10, graduated July 2026",
    body: "education degree bachelor engineering computer science data science university mumbai cgpi 8.19 graduated 2026 saraswati college diploma first class msbte",
    keywords: ["education", "degree", "cgpi", "university", "college", "study"],
  },
  {
    id: "fact-sih",
    title: "Smart India Hackathon 2025 — Grand Finalist",
    kind: "fact",
    href: "/recognition",
    snippet: "Software Edition Grand Finale, BPUT Rourkela",
    body: "smart india hackathon sih 2025 grand finalist software edition ministry education rourkela team lead",
    keywords: ["sih", "hackathon", "finalist", "award"],
  },
  {
    id: "fact-experience",
    title: "Four years of freelance project experience",
    kind: "fact",
    href: "/experience",
    snippet: "Since January 2021 — India and Germany",
    body: "four years experience freelance since 2021 india germany berlin clients backend django rest apis websockets postgresql",
    keywords: ["years", "experience", "freelance", "long"],
  },
];

/** Every technology named across the projects, lowercased for matching. */
const techVocabulary = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort();

const projectDocs: Doc[] = projects.map((project) => ({
  id: `project-${project.slug}`,
  title: project.title,
  kind: "project",
  href: `/projects/${project.slug}`,
  snippet: project.summary,
  body: [
    project.summary,
    project.description,
    project.tags.join(" "),
    project.urltext,
    project.role ?? "",
    project.category === "product" ? "own product" : "client work",
  ]
    .join(" ")
    .toLowerCase(),
  keywords: [...project.tags, project.category, project.slug],
}));

export const documents: Doc[] = [...projectDocs, ...PAGE_DOCS, ...FACT_DOCS];

const STOPWORDS = new Set([
  "a", "an", "and", "any", "are", "as", "at", "be", "by", "can", "did", "do",
  "does", "for", "from", "has", "have", "he", "her", "him", "his", "how", "i",
  "in", "is", "it", "its", "me", "of", "on", "or", "she", "show", "tell", "that",
  "the", "their", "them", "there", "they", "this", "to", "use", "used", "uses",
  "was", "what", "when", "where", "which", "who", "whom", "why", "with", "you",
  "your", "hamza", "khan",
]);

/** Lowercase, split on non-word characters, drop stopwords, de-pluralise. */
export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter((term) => term.length > 1 && !STOPWORDS.has(term))
    .map((term) =>
      term.length > 4 && term.endsWith("s") ? term.slice(0, -1) : term,
    );
}

export type Hit = { doc: Doc; score: number };

export function search(query: string, limit = 6): Hit[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const hits: Hit[] = [];

  for (const doc of documents) {
    const title = doc.title.toLowerCase();
    const keywords = doc.keywords.join(" ").toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (title.includes(term)) score += 6;
      if (keywords.includes(term)) score += 4;

      // Body matches count, but with diminishing returns so one long
      // description cannot drown out a precise title match.
      const occurrences = doc.body.split(term).length - 1;
      if (occurrences > 0) score += Math.min(occurrences, 3);
    }

    if (score > 0) hits.push({ doc, score });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** The technology the query is asking about, if it names one. */
export function detectTechnology(query: string): string | null {
  const lower = query.toLowerCase();
  const matches = techVocabulary
    .filter((tech) => lower.includes(tech.toLowerCase()))
    // Prefer the most specific name when several match ("React" vs "React 19").
    .sort((a, b) => b.length - a.length);
  return matches[0] ?? null;
}

export type Answer = {
  text: string;
  sources: Doc[];
};

const has = (query: string, ...terms: string[]) => {
  const lower = query.toLowerCase();
  return terms.some((term) => lower.includes(term));
};

const page = (id: string) => PAGE_DOCS.find((doc) => doc.id === id)!;

/**
 * Composes a reply from the retrieved documents.
 *
 * Every branch below states something the site already says elsewhere. When
 * nothing matches confidently the honest move is to hand back the closest
 * documents rather than to write a sentence around a guess.
 */
export function answerFor(query: string): Answer {
  const hits = search(query);
  const trimmed = query.trim();

  if (trimmed.length === 0) return { text: "", sources: [] };

  // "what did he build with django?" / "does he know fastapi?"
  const tech = detectTechnology(trimmed);
  if (tech) {
    const using = projects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === tech.toLowerCase()),
    );

    if (using.length > 0) {
      const names = using.map((project) => project.title.split(" — ")[0]);
      const list =
        names.length === 1
          ? names[0]
          : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

      return {
        text:
          `${tech} appears in ${using.length} ${using.length === 1 ? "project" : "projects"} on this site: ${list}. ` +
          `Open any of them for the write-up and the runtime shape.`,
        sources: using.map(
          (project) =>
            projectDocs.find((doc) => doc.id === `project-${project.slug}`)!,
        ),
      };
    }
  }

  // Absence is answerable too, and more useful than a shrug.
  const absent = notInTheStack.find((item) =>
    trimmed.toLowerCase().includes(item.toLowerCase()),
  );
  if (absent) {
    return {
      text:
        `${absent} does not appear anywhere on this site. It is listed on the Errors page as ` +
        `something not run in production here — a gap in the track record rather than a claim about ability.`,
      sources: [page("page-errors"), page("page-skills")],
    };
  }

  if (has(trimmed, "contact", "email", "hire", "reach", "touch", "message")) {
    return {
      text:
        `Email ${contactPayload.email}, or use the form on the contact page — it posts straight to my inbox. ` +
        `Based in Mumbai and open to ${contactPayload.open_to.join(", ")}.`,
      sources: [FACT_DOCS[0], page("page-contact")],
    };
  }

  if (has(trimmed, "experience", "years", "long", "freelanc", "career")) {
    return {
      text:
        "Four years of freelance project experience, starting January 2021 — Django web applications, " +
        "REST APIs and real-time WebSocket services over PostgreSQL, for clients in India and Germany. " +
        "Currently building Novem, a local-first desktop BI tool.",
      sources: [FACT_DOCS[3], page("page-experience")],
    };
  }

  if (
    has(trimmed, "education", "degree", "study", "studied", "college", "university", "cgpi", "grade")
  ) {
    return {
      text:
        "B.E. in Computer Science and Engineering (Data Science) from the University of Mumbai, " +
        "graduated July 2026 with CGPI 8.19 / 10. Before that, a Diploma in Computer Engineering (First Class, 72.63%) from MSBTE.",
      sources: [FACT_DOCS[1], page("page-experience")],
    };
  }

  if (has(trimmed, "award", "hackathon", "sih", "recognition", "achievement", "certificat")) {
    return {
      text:
        "Smart India Hackathon 2025 Grand Finalist (Software Edition, BPUT Rourkela) and 2nd place at SCOE Avishkar 2025. " +
        "Certifications from IBM via Coursera, Udemy, Cisco, and IELTS Academic 6.5 (CEFR B2).",
      sources: [FACT_DOCS[2], page("page-recognition")],
    };
  }

  if (has(trimmed, "weak", "gap", "cannot", "can't", "limit", "missing", "downside")) {
    return {
      text:
        "The “What I don’t do” page answers this directly: everything here was built solo, so there is no evidence of working " +
        "inside a large team codebase, and Kubernetes, Kafka, Terraform, AWS, Go and native mobile appear nowhere in the stack.",
      sources: [page("page-errors")],
    };
  }

  if (has(trimmed, "stack", "skill", "tech", "tool", "know")) {
    return {
      text:
        "Backend-first: Python with Django, DRF, Django Channels, FastAPI and Flask, over PostgreSQL, " +
        "MySQL, SQLite, DuckDB and Elasticsearch. Deployed with Docker on Azure, DigitalOcean, Render and Vercel. " +
        "The skills page lays it out as the path a request takes.",
      sources: [page("page-skills")],
    };
  }

  if (has(trimmed, "api", "endpoint", "json", "server")) {
    return {
      text:
        `${routeIndex.length} routes serve this site's own content as JSON — profile, experience, skills, projects, recognition and contact. ` +
        "They are assembled in your browser: there is no server behind the base URL, and the authentication page says so.",
      sources: [page("page-authentication"), page("page-overview")],
    };
  }

  if (hits.length > 0) {
    return {
      text: `Closest matches for “${trimmed}”:`,
      sources: hits.slice(0, 3).map((hit) => hit.doc),
    };
  }

  return {
    text:
      `Nothing on the site matches “${trimmed}”. This search only knows what is published here — ` +
      "try a project name, a technology, or ask about experience, education or how to get in touch.",
    sources: [],
  };
}

/** Shown when the palette opens with an empty query. */
export const suggestions = [
  "What did he build with Django?",
  "How much experience?",
  "What is he weakest at?",
  "Show me the Tauri project",
  "How do I get in touch?",
];
