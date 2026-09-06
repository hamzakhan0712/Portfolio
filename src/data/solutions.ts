import { projects, type Project } from "@/data/projects";

/**
 * The work, re-cut by the business problem it solves.
 *
 * `/projects` answers "what has he built"; this answers "can you build the
 * thing my business needs". Same systems, different question — which is why
 * nothing here is a new claim: every capability line below is a sentence the
 * project it points at already makes on its own page.
 *
 * Four domains, because four is what the shipped work actually covers. A fifth
 * banner would have to be sold on intention rather than on something running.
 */

export type SolutionSlug =
  | "real-estate"
  | "call-center"
  | "ecommerce"
  | "billing";

export type Solution = {
  slug: SolutionSlug;
  /** Small uppercase eyebrow — the industry, not the product. */
  domain: string;
  /** The product name, as it would appear on a sales sheet. */
  title: string;
  /** One line, the pitch. Shown under the title on the banner. */
  tagline: string;
  /** Who buys this. Written as the business, not as a persona. */
  audience: string;
  /** What ships with it. Each line traces to a project write-up. */
  capabilities: string[];
  /** Technologies it runs on, drawn from the projects behind it. */
  stack: string[];
  /** How it reaches the customer — hosted, installed, on their domain. */
  delivery: string;
  /** Existing systems that prove the claim. Order is the order shown. */
  proof: string[];
  /** Banner artwork. Always a screenshot of the real software. */
  image: string;
};

export const solutions: Solution[] = [
  {
    slug: "real-estate",
    domain: "Real estate",
    title: "Property Sales & Tenancy Suite",
    tagline:
      "The public site that brings enquiries in, and the back office that turns them into signed tenancies.",
    audience:
      "Channel partners, brokerages and co-living operators running their inventory out of spreadsheets and WhatsApp.",
    capabilities: [
      "Inventory to the bed space — every room carries a type, occupancy, rent and availability, and occupancy and collection rates are computed against those rather than against whole units.",
      "One install, five role-scoped portals: super user, property manager, maintenance supervisor, landlord and tenant each see a different product.",
      "Tenancies with contract dates, monthly rent, security deposit, room assignment and a financial breakdown, with expiring contracts flagged on both the admin and the tenant side.",
      "A lead pipeline — contacted, interested, meeting scheduled, proposal sent, lost — each stage with an owner and a last-activity trail.",
      "Ticket-driven maintenance with priorities and assignment, plus payments, activity logs and resident community modules.",
      "A public project page with gallery, specification table, connectivity list, unit plans, highlights and FAQ, behind a sticky rail carrying WhatsApp handoff, site-visit booking, brochure download and a callback form pre-filled with the project name.",
      "Emailed-invitation onboarding for tenants and landlords, tracking who was invited, by whom, and when the invite expires.",
      "RERA registration handled as a legal fact — hero badge, a QR card linking to the state authority's own portal, and a footer disclaimer — rather than as decoration.",
    ],
    stack: ["Django", "PostgreSQL", "React", "TypeScript", "Tailwind CSS"],
    delivery:
      "Hosted on your own domain. The management platform is server-rendered Django on PostgreSQL; the public site is a static React build.",
    proof: ["initcore-realestate", "key2yourhome"],
    image: "/projects/initcore-realestate/poster.jpg",
  },
  {
    slug: "call-center",
    domain: "Call centre",
    title: "Outbound Desk Operations Platform",
    tagline:
      "Leads, dispositions, payments, GST invoices, attendance and a live break monitor — one system for the whole floor.",
    audience:
      "Outbound call centres and tele-sales desks running agents, team leaders and an admin off the same floor.",
    capabilities: [
      "CSV and XLSX lead import through a column-mapping screen, with contact numbers unique across the table so a re-import cannot duplicate a list.",
      "Dispositions and free-form sub-dispositions, with a history row appended on every change and a transfer record written on every reassignment.",
      "Role-scoped querysets — one view serves the super user, the team leader and the agent, with data scope, visible pages and permission to verify payments all following from the role.",
      "A verified payment issues a GST invoice: the amount converted to words in Indian numbering, the template rendered, and a PDF stored against the record.",
      "Attendance computed as a side effect of logging in and out — break time subtracted from total login time, then marked Present, Half day or Absent.",
      "A live break monitor over WebSockets: agents start and stop breaks, and admins and team leaders watch the floor in real time.",
      "Dashboards with sales totals, month-on-month comparison and a per-team-leader breakdown, plus report exports.",
    ],
    stack: [
      "Django 5",
      "Python 3.12",
      "PostgreSQL",
      "Django Channels",
      "WebSockets",
      "Daphne",
    ],
    delivery:
      "Hosted on your server or a cloud VM. Server-rendered Django behind Daphne, so an agent needs nothing but a browser.",
    proof: ["initcore-crm"],
    image: "/projects/initcore-crm/poster.jpg",
  },
  {
    slug: "ecommerce",
    domain: "E-commerce",
    title: "Store Intelligence Desktop",
    tagline:
      "Forecasts, customer segments and plain-language answers out of your own store exports — on your machine, not on a subscription.",
    audience:
      "Shopify and small-to-mid e-commerce owners who cannot justify enterprise BI and have no data scientist on staff.",
    capabilities: [
      "Imports from CSV, Excel, Google Sheets, Shopify exports and PostgreSQL, with import lineage recorded so a number can be traced back to the file it came from.",
      "Demand forecasting with Prophet, and a linear-trend fallback so the feature degrades rather than disappears.",
      "RFM segmentation, churn risk and customer lifetime value via BG/NBD and Gamma-Gamma, plus cohort retention and per-customer story timelines.",
      "Insights that decompose a change rather than report it — “revenue fell 15.5% — returning customers −$20.5k, AOV −$12.7k” — with anomaly detection and SHAP explanations behind each recommendation.",
      "Market-basket association rules for what sells alongside what, and sentiment analysis over reviews.",
      "A copilot running a local Ollama model, so summaries and answers never leave the machine.",
      "Multiple stores kept isolated by store_id, scheduled refreshes, and PDF report exports.",
      "Customer emails and names SHA-256 hashed on import by default.",
    ],
    stack: [
      "Tauri",
      "Rust",
      "React 19",
      "FastAPI",
      "DuckDB",
      "Prophet",
      "scikit-learn",
      "Ollama",
    ],
    delivery:
      "A Windows installer. Everything — the data, the models and the copilot — runs on the machine; there is no account and no upload.",
    proof: ["novem"],
    image: "/projects/novem/poster.jpg",
  },
  {
    slug: "billing",
    domain: "Billing",
    title: "GST Billing Desktop Application",
    tagline:
      "Quotations, proforma and tax invoices and delivery challans on your own letterhead — offline, on the shop machine.",
    audience:
      "Traders, suppliers and distributors still producing their paperwork in Word and Excel, who need GST-correct documents and a customer history that maintains itself.",
    capabilities: [
      "Quotations with an editor, proforma invoices, tax invoices and delivery challans — a form on the left, a live A4 print preview on the right.",
      "Line items with size, HSN code, quantity, unit, rate and GST percentage; CGST and SGST or IGST derived from the place of supply; the grand total written out in words.",
      "Customer and product lists accumulated from issued documents, surfacing invoice count, total billed, outstanding, and the last rate used for a line.",
      "Reports breaking revenue down by customer, by product and by state, with CSV export.",
      "Audience export that turns billing history into segments — bought in the last ninety days, dormant six months or more, quoted but never bought, payment outstanding, top twenty by value — as a contact file for a WhatsApp campaign tool.",
      "Fully offline against a local SQLite database with the generated PDFs beside it, so a dropped connection never stops the billing counter.",
      "Optional Google Drive backup and Gmail sending, both through the business's own account.",
    ],
    stack: [
      "Electron",
      "SQLite",
      "JavaScript",
      "PDF generation",
      "Google Drive API",
      "Gmail API",
    ],
    delivery:
      "A Windows installer for the shop machine. The database and the PDFs sit in a folder you own; cloud backup is opt-in.",
    proof: ["sk-trading"],
    image: "/projects/sk-trading/poster.jpg",
  },
];

/**
 * The moving picture for a solution.
 *
 * Not authored per solution: it is the short preview clip already recorded for
 * the project behind it. A banner that showed a video no project could produce
 * would be advertising something that does not exist.
 */
export const solutionMedia = (solution: Solution) => {
  const lead = proofProjects(solution)[0];
  return {
    poster: solution.image,
    video: lead?.previewVideo ?? null,
    /** The walkthrough length, as the badge on the tile. */
    walkthrough: lead?.video?.duration ?? null,
    slug: lead?.slug ?? null,
  };
};

/** The projects behind a solution, in the order the solution lists them. */
export const proofProjects = (solution: Solution): Project[] =>
  solution.proof
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

export const getSolutionBySlug = (slug: string | undefined) =>
  solutions.find((solution) => solution.slug === slug);

/** Solutions that name a project, used to cross-link from a project page. */
export const solutionsForProject = (slug: string) =>
  solutions.filter((solution) => solution.proof.includes(slug));
