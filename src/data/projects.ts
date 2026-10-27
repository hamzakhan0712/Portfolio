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
  /** Who it is for. */
  audience: string[];
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
};

/** The order projects are listed in. The first six are featured on Home. */
const ORDER = [
  "initcore-commerce",
  "novem",
  "initcore-crm",
  "initcore-realestate",
  "sk-trading-web",
  "sk-trading",
  "key2yourhome",
  "taj-metals",
  "logxivia",
  "initcore-web",
];

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
  "initcore-commerce": {
    summary:
      "Online store and back office: an Angular storefront and admin portal, rendered on the server, over a .NET API with PostgreSQL.",
    tiers: [
      {
        label: "Frontend",
        detail: "Angular · SSR on Node",
        items: [
          "Storefront and admin portal",
          "Angular Material",
          "Installable PWA",
        ],
      },
      {
        label: "API",
        detail: ".NET · Clean Architecture",
        items: [
          "Pricing engine, orders and stock",
          "SignalR — live chat",
          "Background jobs — email outbox, low-stock digest, monitoring",
          "Razorpay payments and refunds",
        ],
      },
      {
        label: "Storage",
        detail: "PostgreSQL · EF Core",
        items: ["Full-text and trigram search", "Image uploads in three sizes"],
      },
    ],
    notes: [
      "Runs as Docker Compose services: database, API, web, nginx edge and backups.",
      "Tested from unit to browser level: xUnit, Vitest and Playwright.",
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
};

const bySlug = new Map(
  (imported as Omit<Project, "architecture">[]).map((p) => [p.slug, p]),
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
    architecture: architectures[slug],
  };
});

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);
