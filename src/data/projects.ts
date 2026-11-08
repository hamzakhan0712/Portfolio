import type { MediaItem } from "@/components/media-lightbox";
import imported from "./projects.json";

/**
 * Projects.
 *
 * The copy and media come from the showcase library and are written by
 * `node scripts/import-showcase.mjs` into projects.json and public/projects/.
 * Don't edit projects.json by hand — change the library and re-run the import.
 *
 * This file only decides the order projects appear in and adds the
 * architecture diagrams, which are drawn by hand.
 */

/**
 * A tier in a project's runtime, ordered the way a request travels through it.
 * Only authored where the project's own write-up already establishes the shape.
 */
export type ArchitectureTier = {
  /** Short name for the tier, e.g. "Engine". */
  label: string;
  /** The technology the tier runs on, e.g. "Python FastAPI". */
  detail?: string;
  /** What sits in this tier. */
  items: string[];
};

export type Architecture = {
  /** One line describing the overall shape. */
  summary: string;
  tiers: ArchitectureTier[];
  /** Build, release or CI facts that sit outside the request path. */
  notes?: string[];
};

export type ProjectFeature = {
  title: string;
  benefit: string;
  /** Short muted clip showing the feature. */
  video?: string;
  poster?: string;
};

export type Project = {
  /** URL segment for /projects/:slug — keep stable once a link is shared. */
  slug: string;
  name: string;
  /** "Web application", "Desktop app" or "Website". */
  kind: string;
  /** One-line promise, shown as the page lead. */
  headline?: string;
  /** Two or three sentences, shown on the card. */
  summary: string;
  description: string[];
  challenge?: string;
  solution?: string;
  highlights: string[];
  features: ProjectFeature[];
  tags: string[];
  industry?: string;
  platform?: string;
  /** What I did on it. */
  role?: string;
  year?: string;
  /** Only for work that is publicly reachable. */
  liveUrl?: string;
  /** Card thumbnail. */
  poster?: string;
  /** Short muted loop. */
  previewVideo?: string;
  /** Full walkthrough shown at the top of the detail page. */
  video?: { src?: string; poster?: string; duration?: string };
  gallery: MediaItem[];
  /** Runtime shape, rendered as a diagram on the detail page. */
  architecture?: Architecture;
  /** Who the work was for. Drives the headline numbers and the Experience page. */
  engagement: Engagement;
  /** How it's built, for an engineer reading: decisions, constraints, testing. */
  engineering?: string[];
  /** Public source code. Without it the page says the repository is private. */
  repo?: string;
};

/**
 * Public repositories, by slug. None of the projects is public yet: client
 * code belongs to the client, and my own products are private. Add a slug
 * here when a repository is opened up and the page shows "View code".
 */
const repos: Record<string, string> = {};

/** Code that is public on GitHub, outside the project showcase. */
export const publicCode = [
  {
    name: "This portfolio",
    url: "https://github.com/hamzakhan0712/Portfolio",
    summary:
      "React, TypeScript and Vite, with a server-rendered smoke test of every route, a build step that writes per-page link previews, and a CSP hash check.",
  },
  {
    name: "SUSTECH 2025 conference site",
    url: "https://github.com/hamzakhan0712/SUSTECH2025-Conference",
    summary:
      "Site for an international conference at Saraswati College of Engineering. All copy lives in one data module, so organisers update it without touching markup.",
  },
  {
    name: "ICTMT 2025 conference site",
    url: "https://github.com/hamzakhan0712/ICTMT2025-Conference",
    summary: "A second conference site on the same data-module pattern, in React, Vite and Tailwind CSS.",
  },
];

/** "client" — built for a paying client; "independent" — my own product. */
export type Engagement = "client" | "independent";

export const ENGAGEMENT_LABEL: Record<Engagement, string> = {
  client: "Client project",
  independent: "Independent product",
};

/**
 * The order projects are listed in: engineering depth first, with client work
 * mixed in early so the first screen isn't only my own products. The first
 * six are featured on Home; brochure websites come last.
 */
const ORDER = [
  "novem",
  "sk-trading-web",
  "initcore-crm",
  "sk-trading",
  "initcore-realestate",
  "key2yourhome",
  "taj-metals",
  "logxivia",
];

/** The library writes a few industries as slugs; these are the readable names. */
const industries: Record<string, string> = {
  "initcore-realestate": "Real estate (co-living)",
  "sk-trading": "Industrial supply (valves, pipes and fittings)",
};

/**
 * Engineering notes, written for an engineer rather than a client. Kept here
 * (not in the library) because the library is client-facing copy. Each point
 * matches the CV and the project's own write-up.
 */
const engineering: Record<string, string[]> = {
  novem: [
    "A Tauri (Rust) shell around a React + TypeScript client, talking to a local Python FastAPI engine of 23 routers and about 170 endpoints.",
    "Demand forecasting with Prophet; RFM segmentation and churn scoring with scikit-learn; customer lifetime value with BG/NBD and Gamma-Gamma; market-basket rules with mlxtend; SHAP so each recommendation can explain itself.",
    "Nothing leaves the machine: DuckDB for analytical tables scoped by store, SQLite for settings, import lineage and encrypted credentials, a local Ollama model, and customer emails SHA-256 hashed on import.",
    "Degrades gracefully: forecasting falls back to linear-trend extrapolation, sentiment from a transformer to TextBlob to keywords, and the assistant to rule-based answers when optional parts are missing.",
    "Release builds freeze the engine with PyInstaller inside an NSIS installer. CI runs Ruff, pytest on Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest and a production build on every push.",
  ],
  "sk-trading-web": [
    "A prerendered Next.js 16 site and the private admin run on one Cloudflare Worker through OpenNext, with data in D1 and media in R2.",
    "Every admin API checks the session. The public stock API is edge-cached for 60 seconds, so a stock change shows on the site within a minute without a rebuild.",
    "Outbound integrations from the Worker: WhatsApp Cloud API chats and template campaigns, Meta Graph API posts to Facebook and Instagram with scheduling, and Hostinger Reach email campaigns.",
    "A cron trigger checks every connection each 30 minutes; Web Push alerts respect quiet hours and roll up into a 9 am summary.",
    "Product edits go through a reviewed publish step that triggers a versioned rebuild through GitHub.",
    "43 Playwright tests at 360, 768 and 1280 px, plus typecheck, lint and a content guard that blocks claims the business can't make (it is a supplier, not a manufacturer).",
  ],
  "initcore-crm": [
    "A 17-model Django data model covering lead import, call outcomes, payments, GST invoicing, attendance and breaks, in one deployment.",
    "Role-scoped querysets: one set of views serves owner, team leader and agent, with data scope, visible pages and verification rights all derived from the role.",
    "CSV and Excel import with a column-mapping step before any write and uniqueness enforced on phone numbers, so repeated imports can't create duplicates.",
    "Verifying a payment renders a GST invoice, with the amount in words in Indian numbering, to PDF through pdfkit and wkhtmltopdf.",
    "The live break monitor runs over Django Channels and WebSockets, served by Daphne (ASGI).",
  ],
  "sk-trading": [
    "Electron with a typed IPC bridge between the React + TypeScript renderer and the Node main process; documents live in local SQLite through better-sqlite3.",
    "A split editor with a live A4 preview; PDFs print from an offscreen window, so the preview is exactly what prints.",
    "Tax logic splits CGST/SGST or IGST from the place of supply, with rounding and the total in words.",
    "Customer and product records are derived from issued documents rather than typed in, which gives outstanding balances and the last rate quoted per item.",
    "Ships as an NSIS installer with electron-updater, backs up to Google Drive or a network folder, and is covered by Vitest unit tests plus self-test modes in the packaged app.",
  ],
  "initcore-realestate": [
    "Five role-scoped portals (owner, property manager, maintenance supervisor, landlord and tenant) from one data model and one install.",
    "Inventory modelled to the bed, each with its own type, occupancy, rent and availability; occupancy and collection rates are computed against beds, not units.",
    "The tenancy lifecycle end to end: contract dates, rent, deposit and room assignment, with agreements ending within 30 days flagged to staff and tenant.",
    "Invitation-based onboarding with expiry, a five-stage lead pipeline with ownership and activity trail, and ticket-based maintenance with priority and assignment.",
  ],
  key2yourhome: [
    "A static Astro site that reads every listing from one Google Sheet at build time. A Sheet edit rebuilds and deploys it through GitHub Actions to Hostinger, so there is no server, database or admin panel to maintain.",
    "Callback requests are written back to the Sheet by a Google Apps Script, with source page and campaign, and emailed to sales.",
    "Filters live in the URL so a shortlist can be shared; each unit's WhatsApp link is pre-filled with the unit, project and area.",
    "About 12 KB of JavaScript, tracking only after consent, and JSON-LD structured data with a sitemap for the city and builder pages.",
  ],
  "taj-metals": [
    "Next.js on Vercel with WhatsApp as the only contact channel: one file holds the number and five message templates that every button uses, so there is no mail server to run.",
    "Each product page carries full specifications and opens a chat that already names the product.",
    "Filters by category, material and standard, plus JSON-LD structured data, a sitemap and buyer guides for search.",
  ],
  logxivia: [
    "A static Next.js site in English and German with next-intl: its own URL per language, and switching keeps the visitor on the same page.",
    "The enquiry form posts to PHP and PHPMailer, with privacy consent and a honeypot, and each enquiry arrives with the visitor's language.",
    "Images optimised at build time with sharp; essential cookies only; Imprint and privacy policy in both languages for German law.",
  ],
};

/** Kept here, not in projects.json, so a re-import can't drop it. Matches the CV. */
const engagements: Record<string, Engagement> = {
  novem: "independent",
  "initcore-crm": "independent",
  "initcore-realestate": "independent",
  "sk-trading-web": "client",
  "sk-trading": "client",
  key2yourhome: "client",
  "taj-metals": "client",
  logxivia: "client",
};

const architectures: Record<string, Architecture> = {
  novem: {
    summary:
      "Local-first desktop app that turns e-commerce store data into forecasts, customer segments and plain-language answers. Tauri shell over a FastAPI + DuckDB engine.",
    tiers: [
      {
        label: "Shell",
        detail: "Tauri (Rust)",
        items: ["React + TypeScript frontend", "Ant Design", "ECharts"],
      },
      {
        label: "Engine",
        detail: "Python FastAPI · local HTTP server",
        items: [
          "Prophet — demand forecasting",
          "scikit-learn — segmentation",
          "mlxtend — market-basket rules",
          "lifetimes — customer lifetime value",
          "SHAP — recommendation explanations",
          "Ollama — local LLM copilot",
        ],
      },
      {
        label: "Storage",
        detail: "Local, scoped by store",
        items: [
          "DuckDB — analytical tables",
          "SQLite — settings, import lineage, alerts, encrypted credentials",
        ],
      },
    ],
    notes: [
      "Release builds freeze the engine with PyInstaller and ship it inside an NSIS installer.",
      "CI gates every push: Ruff, pytest, tsc --noEmit, ESLint, Vitest and a production build.",
    ],
  },
  "initcore-crm": {
    summary:
      "Django CRM for outbound call centres — leads, payments, invoice PDFs, attendance and a live break monitor over WebSockets.",
    tiers: [
      {
        label: "Frontend",
        detail: "Server-rendered",
        items: [
          "Django templates",
          "Chart.js dashboards",
          "WebSocket subscriptions",
        ],
      },
      {
        label: "Application",
        detail: "Django 5 · Python 3.12",
        items: [
          "Django Channels — real-time events",
          "Daphne — ASGI server",
          "pdfkit + wkhtmltopdf — invoice PDFs",
          "pandas + openpyxl — imports, reports and exports",
        ],
      },
      {
        label: "Storage",
        detail: "PostgreSQL",
        items: ["Leads, customers, staff, attendance and invoices"],
      },
    ],
  },
  "initcore-realestate": {
    summary:
      "Django platform for co-living property management — bed-space inventory, tenancies, payments and maintenance, with a separate portal for each role.",
    tiers: [
      {
        label: "Portals",
        detail: "Server-rendered templates",
        items: [
          "Owner — whole portfolio",
          "Property manager — own properties and tickets",
          "Maintenance supervisor — tasks and deadlines",
          "Landlord — rent collected",
          "Tenant — self-service",
        ],
      },
      {
        label: "Application",
        detail: "Django · Python",
        items: [
          "Role-scoped access",
          "Inventory tracked to the bed",
          "Invitation-based onboarding with expiry",
        ],
      },
      {
        label: "Storage",
        detail: "PostgreSQL",
        items: [
          "Occupancy and collection rates computed against bed inventory",
        ],
      },
    ],
  },
  "sk-trading": {
    summary:
      "Offline Windows desktop app for quotations, proforma and tax invoices and delivery challans, with a live A4 preview beside the form.",
    tiers: [
      {
        label: "Interface",
        detail: "Electron renderer · React + TypeScript",
        items: [
          "Four document editors",
          "Live A4 preview",
          "Customers, products and reports",
        ],
      },
      {
        label: "Main process",
        detail: "Node",
        items: [
          "Typed IPC bridge",
          "PDF from an offscreen print window",
          "Email over SMTP and WhatsApp share links",
          "Backup engine",
        ],
      },
      {
        label: "Storage",
        detail: "Local-first",
        items: [
          "SQLite (better-sqlite3) — documents, line items, customers",
          "Backups to Google Drive or a network folder",
        ],
      },
    ],
    notes: [
      "Packaged as an NSIS installer with electron-updater for updates.",
      "Vitest unit tests plus self-test modes in the packaged app.",
    ],
  },
  "sk-trading-web": {
    summary:
      "A prerendered catalogue website and a private admin running on the same Cloudflare Worker, connected to WhatsApp, Facebook, Instagram and email.",
    tiers: [
      {
        label: "Website",
        detail: "Next.js 16 · prerendered",
        items: [
          "Product finder, live search and 20 product pages",
          "Quote form that carries the product",
          "Tailwind CSS v4 and shadcn/ui",
          "Turnstile on the forms",
        ],
      },
      {
        label: "Worker",
        detail: "Cloudflare Workers via OpenNext",
        items: [
          "Admin APIs, each checking the session",
          "Stock API, edge-cached for 60 seconds",
          "Web Push alerts with quiet hours",
          "Cron every 30 minutes — connection checks",
        ],
      },
      {
        label: "Storage",
        detail: "Cloudflare D1 and R2",
        items: [
          "D1 — enquiries, contacts, stock, posts, campaigns",
          "R2 — product photos and videos",
        ],
      },
      {
        label: "Integrations",
        detail: "Outbound from the Worker",
        items: [
          "WhatsApp Cloud API — chats, templates, campaigns",
          "Meta Graph API — Facebook and Instagram posts",
          "Hostinger Reach — email campaigns",
          "GitHub — every product publish is a versioned rebuild",
        ],
      },
    ],
    notes: [
      "43 Playwright tests at 360, 768 and 1280 px, plus typecheck, lint and a content guard that blocks claims the business cannot make.",
    ],
  },
  key2yourhome: {
    summary:
      "A static Astro site built from a Google Sheet: the Sheet holds the content, a rebuild publishes it, and Apps Script writes enquiries back.",
    tiers: [
      {
        label: "Content",
        detail: "Google Sheets",
        items: ["Listings, projects, unit plans and prices", "Edited by the sales team"],
      },
      {
        label: "Build",
        detail: "Astro · GitHub Actions",
        items: [
          "Reads the Sheet at build time (Google Sheets API)",
          "A page per project, city and builder",
          "JSON-LD structured data and sitemap",
        ],
      },
      {
        label: "Site",
        detail: "Static · Hostinger",
        items: [
          "About 12 KB of JavaScript",
          "Filters kept in the URL",
          "WhatsApp links pre-filled with unit and project",
          "Tracking only after consent",
        ],
      },
      {
        label: "Enquiries",
        detail: "Google Apps Script",
        items: [
          "Callback requests written to the Sheet with source page and campaign",
          "Email to sales",
        ],
      },
    ],
    notes: ["A Sheet edit rebuilds and redeploys the site, so there is no server, database or admin panel to run."],
  },
  "taj-metals": {
    summary: "A Next.js product website on Vercel, with WhatsApp as the only contact channel.",
    tiers: [
      {
        label: "Pages",
        detail: "Next.js · React · TypeScript",
        items: [
          "Product pages with full specifications",
          "Filters by category, material and standard",
          "FAQs and three buyer guides",
        ],
      },
      {
        label: "Enquiries",
        detail: "WhatsApp links",
        items: [
          "One file holds the number and five message templates",
          "Each product page opens a chat naming the product",
        ],
      },
      {
        label: "Hosting",
        detail: "Vercel",
        items: ["JSON-LD structured data and sitemap"],
      },
    ],
    notes: ["No mail server or form backend: every enquiry goes to WhatsApp, by design."],
  },
  logxivia: {
    summary:
      "A static bilingual Next.js site, with a small PHP endpoint that emails each enquiry.",
    tiers: [
      {
        label: "Pages",
        detail: "Next.js · next-intl",
        items: [
          "English and German, each with its own URLs",
          "The language switch keeps the visitor on the same page",
          "Clickable four-step process",
          "Imprint and privacy policy in both languages",
        ],
      },
      {
        label: "Build",
        detail: "Static",
        items: ["Images optimised with sharp", "Essential cookies only"],
      },
      {
        label: "Enquiry form",
        detail: "PHP · PHPMailer",
        items: ["Privacy consent and a honeypot", "Emails each enquiry with the visitor's language"],
      },
    ],
  },
};

const bySlug = new Map(
  (imported as Omit<Project, "architecture" | "engagement" | "engineering" | "repo">[]).map((p) => [p.slug, p]),
);

export const projects: Project[] = [
  ...ORDER.filter((slug) => bySlug.has(slug)),
  // Anything the library adds later still shows, at the end.
  ...[...bySlug.keys()].filter((slug) => !ORDER.includes(slug)),
].map((slug) => {
  const project = bySlug.get(slug)!;
  return {
    ...project,
    // The library writes some headlines without a full stop; the site
    // shows them as sentences, so finish them consistently.
    headline: project.headline?.replace(/([^.!?])\s*$/, "$1."),
    industry: industries[slug] ?? project.industry,
    engineering: engineering[slug],
    repo: repos[slug],
    architecture: architectures[slug],
    // A project the library adds later is treated as independent until labelled.
    engagement: engagements[slug] ?? "independent",
  };
});

export const clientProjects = projects.filter((p) => p.engagement === "client");
export const independentProjects = projects.filter((p) => p.engagement === "independent");

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);
