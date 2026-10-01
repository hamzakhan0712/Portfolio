import type { MediaItem } from "@/components/media-lightbox";

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

export type Project = {
  /** URL segment for /projects/:slug — keep stable once a link is shared. */
  slug: string;
  title: string;
  /** Short line under the title on the card. */
  summary: string;
  /** Long-form copy shown on the detail page. */
  description: string;
  tags: string[];
  /** Card thumbnail. Falls back to a lettered placeholder when absent. */
  imageUrl?: string;
  /**
   * Muted clip played inline on card hover — keep it short (5-15s) and small.
   * Drop files in public/projects/<slug>/preview.mp4 and reference them here.
   */
  previewVideo?: string;
  /** Set only when previewVideo carries a soundtrack — shows the mute toggle. */
  previewHasAudio?: boolean;
  /** Full walkthrough shown at the top of the detail page. */
  video?: {
    src: string;
    poster?: string;
    /** Shown as the duration badge on the card, e.g. "3:42". */
    duration?: string;
  };
  /** Screenshots and clips for the detail page gallery. */
  media?: MediaItem[];
  /** Optional bullet points rendered above the gallery on the detail page. */
  highlights?: string[];
  /** Only for work that is publicly reachable. Omitted when it is not. */
  liveUrl?: string;
  /** Deployment / context line, e.g. "On-premise deployment". */
  urltext: string;
  /** What I did on it — shown in the detail sidebar. */
  role?: string;
  /**
   * Runtime shape, rendered as a diagram on the detail page. Omitted for the
   * front-end-only sites, where a diagram would say nothing the tag list does
   * not already say.
   */
  architecture?: Architecture;
};

export const projects: Project[] = [
  {
    slug: "novem",
    architecture: {
      summary:
      "Local-first desktop app that turns e-commerce store data into forecasts, customer segments and plain-language answers. Tauri shell over a FastAPI + DuckDB engine.",
      tiers: [
        {
          label: "Shell",
          detail: "Tauri (Rust)",
          items: [
            "React 19 + TypeScript frontend",
            "Ant Design",
            "ECharts",
          ],
        },
        {
          label: "Engine",
          detail: "Python FastAPI · 127.0.0.1:44945",
          items: [
            "23 routers, ~170 endpoints",
            "Prophet — demand forecasting",
            "scikit-learn — segmentation",
            "mlxtend — market-basket rules",
            "lifetimes — customer lifetime value",
            "SHAP — recommendation explanations",
            "Ollama — local LLM copilot",
            "APScheduler · ReportLab",
          ],
        },
        {
          label: "Storage",
          detail: "Local, scoped by store_id",
          items: [
            "DuckDB — analytical tables",
            "SQLite — settings, import lineage, alerts, encrypted credentials",
          ],
        },
      ],
      notes: [
        "Release builds freeze the engine with PyInstaller and ship it inside an NSIS installer.",
        "CI gates every push: Ruff, pytest across Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest, production build.",
      ],
    },
    title: "Novem — E-Commerce Insights Desktop App",
    summary:
      "Local-first desktop BI tool: a Tauri shell over a FastAPI + DuckDB engine that turns e-commerce exports into forecasts, segments and plain-language answers.",
    description:
      "Novem is a desktop application that helps online store owners understand their sales, customers and products. Store data is imported from CSV, Excel, Google Sheets, Shopify or PostgreSQL, and everything runs locally on the user's machine.\n\nA Tauri (Rust) desktop shell wraps a React 19 + TypeScript interface built with Ant Design and ECharts. It talks to a Python FastAPI engine running as a local HTTP server — 23 routers and roughly 170 endpoints. Store data lives in DuckDB, scoped per store so multiple stores stay isolated, while settings, import history, alerts and encrypted connector credentials live in SQLite. The engine handles demand forecasting, customer segmentation, lifetime value, product bundles and review sentiment, and a local LLM powers an in-app copilot so data never leaves the machine.\n\nRelease builds bundle the engine with PyInstaller inside an NSIS installer, and CI runs on every push — Ruff, pytest on Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest and a production build.",
    tags: [
      "Tauri",
      "Rust",
      "React 19",
      "TypeScript",
      "FastAPI",
      "DuckDB",
      "SQLite",
      "scikit-learn",
      "Prophet",
      "SHAP",
      "Ollama",
      "PyInstaller",
    ],
    imageUrl: "/projects/novem/poster.jpg",
    previewVideo: "/projects/novem/preview.mp4",
    video: {
      src: "/projects/novem/walkthrough.mp4",
      poster: "/projects/novem/poster.jpg",
      duration: "7:47",
    },
    highlights: [
      "Tauri (Rust) shell manages the window and the engine lifecycle — it starts the Python process, waits for the port to come up, and shuts it down cleanly on exit.",
      "Fully local: DuckDB for store data, SQLite for settings and history, and a local Ollama model for the copilot.",
      "Customer insights including RFM segmentation, churn risk, lifetime value and cohort retention.",
      "Insights explain a change instead of just reporting it, e.g. “revenue fell 15.5% — returning customers −$20.5k, AOV −$12.7k”, with anomaly detection.",
      "Features degrade gracefully — forecasting, sentiment and the copilot each fall back to simpler methods when an optional dependency is missing.",
      "Customer emails and names are hashed with SHA-256 on import by default.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/novem/gallery/01-dashboard.jpg",
        alt: "Novem dashboard",
        caption:
          "Dashboard — revenue, orders, customers and AOV against the previous period.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/02-insights.jpg",
        alt: "Novem insights feed",
        caption:
          "Insights — business health score, anomaly detection and ranked findings.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/03-forecasting.jpg",
        alt: "Novem forecasting",
        caption: "Forecasting — Prophet projections with confidence bands.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/04-ai-copilot.jpg",
        alt: "Novem AI Copilot",
        caption:
          "AI Copilot — questions answered from your own data by a local model.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/05-customers.jpg",
        alt: "Novem customers",
        caption: "Customers — RFM segments, churn risk, CLV and cohorts.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/06-products.jpg",
        alt: "Novem products",
        caption:
          "Products — category revenue, market-basket rules and lifecycle.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/07-reviews-sentiment.jpg",
        alt: "Novem reviews and sentiment",
        caption:
          "Reviews — rating breakdown, sentiment over time and aspect extraction.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/08-import-data.jpg",
        alt: "Novem import data",
        caption: "Import — CSV, Excel, Google Sheets, Shopify and PostgreSQL.",
      },
      {
        type: "image",
        src: "/projects/novem/gallery/09-data-viewer.jpg",
        alt: "Novem data viewer",
        caption: "Data Viewer — the raw DuckDB tables, with hashed emails.",
      },
    ],
    urltext: "Desktop app · Windows",
    role: "Design, architecture, backend engine, frontend and packaging",
  },
  {
    slug: "initcore-crm",
    architecture: {
      summary:
      "Django CRM for outbound call-center teams — leads, payments, GST invoices, attendance and a live break monitor over WebSockets.",
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
            "pdfkit + wkhtmltopdf — GST invoices",
            "pandas + openpyxl — reports and exports",
          ],
        },
        {
          label: "Storage",
          detail: "PostgreSQL",
          items: ["Relational core for leads, customers, staff and invoices"],
        },
      ],
    },
    title: "InitCore CRM — Call Center CRM",
    summary:
      "Django CRM for running an outbound call-center desk — leads, payments, GST invoices, attendance and a live break monitor.",
    description:
      "A CRM for outbound call-center teams, built with Django and PostgreSQL. Leads are imported from CSV or XLSX through a column-mapping screen, carry a disposition and sub-disposition, and keep a full history of every change, including transfers between agents. Contact numbers are unique, so re-importing a list does not create duplicates.\n\nConverted leads become paid customers. Once a payment is verified, the app generates a GST invoice — the amount is written out in words in Indian numbering and the invoice is rendered to PDF with wkhtmltopdf. Attendance is recorded automatically from login and logout times, with break time subtracted, and agents start and stop breaks over a WebSocket while team leaders watch them live on a monitor page.\n\nAccess is role-based throughout: the same views serve admins, team leaders and agents, each seeing only their own data. The app uses server-rendered templates across 17 models.",
    tags: [
      "Django 5",
      "Python 3.12",
      "PostgreSQL",
      "Django Channels",
      "WebSockets",
      "Daphne",
      "pdfkit",
      "wkhtmltopdf",
      "pandas",
      "openpyxl",
      "Chart.js",
    ],
    imageUrl: "/projects/initcore-crm/poster.jpg",
    previewVideo: "/projects/initcore-crm/preview.mp4",
    video: {
      src: "/projects/initcore-crm/walkthrough.mp4",
      poster: "/projects/initcore-crm/poster.jpg",
      duration: "2:49",
    },
    highlights: [
      "Role-based access — one set of views serves admins, team leaders and agents, with data scope and permissions driven by the user's role.",
      "CSV/XLSX lead import with column mapping and duplicate protection.",
      "Verified payments generate GST invoices as PDFs, with the amount written out in words.",
      "Attendance is calculated automatically from login and logout times, minus breaks.",
      "Real-time break tracking with Django Channels, visible live to team leaders.",
      "Dashboards and CSV reports broken down by team leader, agent and disposition.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/01-dashboard.jpg",
        alt: "InitCore CRM dashboard",
        caption:
          "Dashboard — sales totals, month-on-month comparison and per-team-leader breakdown.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/02-leads.jpg",
        alt: "InitCore CRM leads",
        caption:
          "Leads — filter by disposition and date, import from CSV/XLSX, bulk-assign to a team or agent.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/03-gst-invoice.jpg",
        alt: "InitCore CRM GST invoice",
        caption:
          "GST invoice — rendered from the verified payment and stored as a PDF.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/04-paid-customers.jpg",
        alt: "InitCore CRM paid customers",
        caption:
          "Paid customers — package, payment method, transaction id and amount.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/05-attendance.jpg",
        alt: "InitCore CRM attendance",
        caption:
          "Attendance — login and logout times, computed status, and breaks per shift.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/06-staff-teams.jpg",
        alt: "InitCore CRM staff and teams",
        caption:
          "Staff and teams — one leader and many agents, with role, status and joining date.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/07-analytics.jpg",
        alt: "InitCore CRM analytics",
        caption:
          "Analytics — totals for leads, customers, invoices, revenue and attendance.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/08-reports.jpg",
        alt: "InitCore CRM reports",
        caption:
          "Reports — team leader to agent to sub-disposition, with a CSV export.",
      },
      {
        type: "image",
        src: "/projects/initcore-crm/gallery/09-user-management.jpg",
        alt: "InitCore CRM user management",
        caption:
          "User management — role, contact details, joining date and sales commitment.",
      },
    ],
    urltext: "Web application",
    role: "Data model, backend, real-time layer and templates",
  },
  {
    slug: "initcore-realestate",
    architecture: {
      summary:
      "Django platform for co-living property management — bed-space inventory, tenancies, payments and maintenance, with a separate portal for each role.",
      tiers: [
        {
          label: "Portals",
          detail: "Server-rendered templates",
          items: [
            "Super user — whole portfolio",
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
            "Inventory tracked to the bed space",
            "Invitation-based onboarding with expiry",
          ],
        },
        {
          label: "Storage",
          detail: "PostgreSQL",
          items: [
            "Occupancy and collection rates computed against bed-space inventory",
          ],
        },
      ],
    },
    title: "InitCore Real Estate — Property Management Platform",
    summary:
      "Django platform for co-living property management — bed-space inventory, tenancies and payments, with a different application for each role.",
    description:
      "A property management platform for co-living and shared accommodation, built with Django and PostgreSQL. Inventory is tracked down to the bed space: every room has a type, occupancy, rent and availability status, and the dashboard calculates occupancy and collection rates from them.\n\nTenants and landlords are onboarded by email invitation with expiry tracking. A tenancy holds contract dates, monthly rent, security deposit, room assignment and a financial breakdown, and contracts nearing expiry are flagged. Leads move through a sales pipeline, maintenance is handled through prioritised tickets, and payments, activity logs and community events each have their own module.\n\nThe same installation presents a different portal to each role — super user, property manager, maintenance supervisor, landlord and tenant.",
    tags: ["Django", "Python", "PostgreSQL", "Server-rendered templates"],
    imageUrl: "/projects/initcore-realestate/poster.jpg",
    previewVideo: "/projects/initcore-realestate/preview.mp4",
    video: {
      src: "/projects/initcore-realestate/walkthrough.mp4",
      poster: "/projects/initcore-realestate/poster.jpg",
      duration: "9:13",
    },
    highlights: [
      "Five role-based portals from one codebase: super user, property manager, maintenance supervisor, landlord and tenant.",
      "Bed-space level inventory with occupancy and collection rates calculated from it.",
      "Invitation-based onboarding for tenants and landlords, with expiry tracking.",
      "Tenancy records with contract dates, rent, deposit, room assignment and expiry alerts.",
      "Lead pipeline from first contact to proposal, with owner and activity history.",
      "Ticket-based maintenance with priorities and assignment, plus payments and activity logs.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/01-dashboard.jpg",
        alt: "InitCore Real Estate dashboard",
        caption:
          "Dashboard — income, occupancy and collection rates, income trend and bed-space status.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/02-properties.jpg",
        alt: "InitCore Real Estate properties",
        caption:
          "Properties — active properties, occupancy and monthly revenue, by type and status.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/03-leads.jpg",
        alt: "InitCore Real Estate leads",
        caption:
          "Leads — the pipeline from contacted through proposal sent, with owner and activity.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/04-analytics.jpg",
        alt: "InitCore Real Estate analytics",
        caption:
          "Analytics — payment status, tickets by priority, and portfolio-wide totals.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/05-tenant-profile.jpg",
        alt: "InitCore Real Estate tenant profile",
        caption:
          "Tenant profile — contract dates, rent and deposit, room assignment and financials.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/06-property-manager.jpg",
        alt: "InitCore Real Estate property manager view",
        caption:
          "Property manager — only their own properties, occupancy, tenants and open tickets.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/07-maintenance-supervisor.jpg",
        alt: "InitCore Real Estate maintenance supervisor view",
        caption:
          "Maintenance supervisor — tasks, upcoming deadlines, tickets and team membership.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/08-landlord-portal.jpg",
        alt: "InitCore Real Estate landlord portal",
        caption:
          "Landlord portal — their properties, rooms and beds, rent collected and expected revenue.",
      },
      {
        type: "image",
        src: "/projects/initcore-realestate/gallery/09-tenant-portal.jpg",
        alt: "InitCore Real Estate tenant portal",
        caption:
          "Tenant portal — contract status, upcoming payments, documents and quick actions.",
      },
    ],
    urltext: "Web application",
    role: "Data model, backend, role system and all five portals",
  },
  {
    slug: "sk-trading",
    architecture: {
      summary:
      "Offline Windows desktop app for quotations, proforma and tax invoices and delivery challans, with a live A4 print preview and GST calculation.",
      tiers: [
        {
          label: "Shell",
          detail: "Electron",
          items: ["JavaScript interface", "Installed on site"],
        },
        {
          label: "Documents",
          detail: "Generation pipeline",
          items: [
            "Quotations and quotation editor",
            "Proforma invoices",
            "Delivery challans",
            "PDF generation",
          ],
        },
        {
          label: "Storage & delivery",
          detail: "Local-first",
          items: [
            "SQLite — customers, products, documents",
            "Google Drive API — document storage",
            "Gmail API — sending to customers",
          ],
        },
      ],
    },
    title: "S.K Trading — Billing Desktop App",
    summary:
      "Offline Electron app for an industrial valve supplier — quotations, proforma and tax invoices and delivery challans, printed to a GST letterhead.",
    description:
      "A Windows desktop application for creating business documents — quotations, proforma invoices, tax invoices and delivery challans. Each document is edited in a form on the left while an A4 print preview updates live on the right, so what you see is exactly what prints.\n\nLine items carry size, HSN code, quantity, unit, rate and GST percentage. Tax is split into CGST and SGST or IGST based on the place of supply, and the total is written out in words. Customers and products are built up automatically from issued documents, which lets the app show totals billed, outstanding amounts and the last rate used for each product. Reports break revenue down by customer, product and state with CSV export, and customer segments can be exported as contact lists.\n\nEverything runs offline on a local SQLite database, with optional Google Drive backup and Gmail sending.",
    tags: [
      "Electron",
      "SQLite",
      "JavaScript",
      "PDF generation",
      "Google Drive API",
      "Gmail API",
    ],
    imageUrl: "/projects/sk-trading/poster.jpg",
    previewVideo: "/projects/sk-trading/preview.mp4",
    video: {
      src: "/projects/sk-trading/walkthrough.mp4",
      poster: "/projects/sk-trading/poster.jpg",
      duration: "1:35",
    },
    highlights: [
      "Form-and-preview editor — every document shows a live A4 print preview while you type.",
      "Automatic GST split into CGST/SGST or IGST, with the total written out in words.",
      "Customer and product lists built automatically from issued documents.",
      "Revenue reports by customer, product and state, with CSV export.",
      "Customer segment export — e.g. inactive for six months, quoted but never purchased, payment outstanding.",
      "Works fully offline on SQLite, with optional Google Drive backup and Gmail sending.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/sk-trading/gallery/01-home.jpg",
        alt: "S.K Trading home dashboard",
        caption:
          "Home — financial year to date across quotations, invoices and challans.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/02-quotations.jpg",
        alt: "S.K Trading quotations list",
        caption:
          "Quotations — customer, taxable value, tax and total, searchable by number or GSTIN.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/03-quotation-editor.jpg",
        alt: "S.K Trading quotation editor",
        caption:
          "Quotation editor — line items with HSN and GST beside a live A4 print preview.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/04-proforma-invoice.jpg",
        alt: "S.K Trading proforma invoice",
        caption:
          "Proforma invoice — buyer and consignee with GSTINs, re-rendering as you type.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/05-delivery-challan.jpg",
        alt: "S.K Trading delivery challan",
        caption:
          "Delivery challan — order reference, vehicle, destination and e-way bill.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/06-customers.jpg",
        alt: "S.K Trading customers",
        caption:
          "Customers — built from issued documents, with billed and outstanding totals.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/07-products.jpg",
        alt: "S.K Trading products",
        caption:
          "Products — every line item typed, with size, HSN, unit, GST and last rate.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/08-reports.jpg",
        alt: "S.K Trading reports",
        caption:
          "Reports — revenue by customer, product and state, with CSV export.",
      },
      {
        type: "image",
        src: "/projects/sk-trading/gallery/09-audience-export.jpg",
        alt: "S.K Trading audience export",
        caption:
          "Audience export — segments such as dormant six months or payment outstanding.",
      },
    ],
    urltext: "Desktop app · Windows",
    role: "Design, development and packaging",
  },
  {
    slug: "sk-trading-web",
    title: "S.K Trading & Co. — Valve Catalogue Website",
    summary:
      "Product catalogue website for industrial valves and fittings — 224 products across fourteen categories, with technical filters and an enquiry flow.",
    description:
      "A product catalogue website for industrial valves, pipe fittings and dismantling joints, built with Next.js, TypeScript and Tailwind CSS. The home page leads with the catalogue — products, categories and brands at a glance — and every category tile shows its product count.\n\nThe product listing filters on the attributes engineers specify: body material, end connection, pressure rating and operation, with load-more pagination. A sectors section maps industries such as water supply, power, sugar and paper to the product categories most used in each, linking straight into the catalogue.\n\nEvery page ends in a clear enquiry path — a requirement form with product category and specification, a WhatsApp link and an external store link — and the contact page includes address, hours, registration details and a map.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Product catalogue",
      "SEO",
    ],
    imageUrl: "/projects/sk-trading-web/poster.jpg",
    previewVideo: "/projects/sk-trading-web/preview.mp4",
    video: {
      src: "/projects/sk-trading-web/walkthrough.mp4",
      poster: "/projects/sk-trading-web/poster.jpg",
      duration: "1:26",
    },
    highlights: [
      "Catalogue of 224 products across 14 categories and 20 brands.",
      "Technical filters for body material, end connection, pressure rating and operation.",
      "Sectors section mapping industries to the product categories they use.",
      "Enquiry form, WhatsApp and store links available from every page.",
      "SEO-friendly page structure built with Next.js.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/01-home.jpg",
        alt: "S.K Trading & Co. home page",
        caption:
          "Home — the stock position at a glance, with the catalogue one click away.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/02-catalogue.jpg",
        alt: "S.K Trading & Co. category grid",
        caption:
          "Categories — gate, ball, check, globe, butterfly, fittings, strainers and more, each with a count.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/03-product-listing.jpg",
        alt: "S.K Trading & Co. product listing",
        caption:
          "Listing — body material, end connection, pressure rating and operation on every card.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/04-sectors.jpg",
        alt: "S.K Trading & Co. sectors served",
        caption:
          "Sectors — six duties, from municipal water to sugar, paper and process.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/05-sector-selections.jpg",
        alt: "S.K Trading & Co. selections by sector",
        caption:
          "Selections that match the duty — each sector links into the catalogue.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/06-brands.jpg",
        alt: "S.K Trading & Co. brands stocked",
        caption: "Brands — marked stocked, not merely listed.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/07-about.jpg",
        alt: "S.K Trading & Co. about page",
        caption:
          "About — a trading house, and a manufacturer only where it counts.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/08-enquiry.jpg",
        alt: "S.K Trading & Co. enquiry form",
        caption:
          "Enquiry — product category plus free-text specification, answered in one working day.",
      },
      {
        type: "image",
        src: "/projects/sk-trading-web/gallery/09-office.jpg",
        alt: "S.K Trading & Co. office and godown",
        caption: "Office and godown — address, hours and a map.",
      },
    ],
    urltext: "Website",
    role: "Information architecture, design and development",
  },
  {
    slug: "key2yourhome",
    title: "Key2YourHome — Real Estate Listings Website",
    summary:
      "Property discovery website for Mumbai, Thane, Navi Mumbai and Pune — project search, detailed project pages and a dedicated NRI section.",
    description:
      "A real estate website for browsing new projects, resale homes, rentals and land across Mumbai, Thane, Navi Mumbai and Pune. Each listing type has its own index, searchable by name, locality or builder and filterable by city, type, BHK and budget.\n\nProject pages include a photo gallery, overview, specification table, connectivity to key locations, an embedded video walkthrough, unit plans, highlights and an FAQ. A sticky enquiry panel offers WhatsApp, site-visit booking, brochure download and a callback form pre-filled with the project name. RERA registration details are shown with a QR code linking to the official portal.\n\nA separate NRI section covers video site visits, document verification, banking guidance and rental management, and cookie consent lets visitors control essential, analytics and marketing cookies separately.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "SEO",
      "Cookie consent",
    ],
    imageUrl: "/projects/key2yourhome/poster.jpg",
    previewVideo: "/projects/key2yourhome/preview.mp4",
    video: {
      src: "/projects/key2yourhome/walkthrough.mp4",
      poster: "/projects/key2yourhome/poster.jpg",
      duration: "1:38",
    },
    highlights: [
      "Search and filters by city, property type, BHK and budget.",
      "Detailed project pages with gallery, specifications, connectivity, unit plans and FAQ.",
      "Sticky enquiry panel with a callback form pre-filled with the current project.",
      "RERA details with a QR code linking to the official registry.",
      "Dedicated NRI section for remote buyers.",
      "Granular cookie consent for essential, analytics and marketing cookies.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/01-home.jpg",
        alt: "Key2YourHome home page",
        caption:
          "Home — a featured project with its RERA number, price and both enquiry routes.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/02-featured-projects.jpg",
        alt: "Key2YourHome featured projects",
        caption:
          "Trust bar and hand-picked projects — registered, verified, local.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/03-projects-search.jpg",
        alt: "Key2YourHome project search",
        caption:
          "Projects — search by name, locality or builder, filtered by city, type, BHK and budget.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/04-project-walkthrough.jpg",
        alt: "Key2YourHome project walkthrough",
        caption:
          "Project page — walkthrough and unit plans beside the sticky enquiry rail.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/05-unit-plans.jpg",
        alt: "Key2YourHome unit plans",
        caption:
          "Unit plans and project highlights — price on request, book a visit.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/06-project-faq.jpg",
        alt: "Key2YourHome project FAQ",
        caption:
          "FAQ and the MahaRERA QR card, linking to the state authority's portal.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/07-builder.jpg",
        alt: "Key2YourHome builder page",
        caption:
          "Builder page — track record, verified network and RERA-checked details.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/08-nri-desk.jpg",
        alt: "Key2YourHome NRI property desk",
        caption:
          "NRI desk — video site visits, document verification and rental management.",
      },
      {
        type: "image",
        src: "/projects/key2yourhome/gallery/09-how-it-works.jpg",
        alt: "Key2YourHome how it works",
        caption:
          "What we handle, and the five steps from discovery call to post-purchase support.",
      },
    ],
    liveUrl: "https://www.key2yourhome.net",
    urltext: "key2yourhome.net",
    role: "Design, development and deployment",
  },
  {
    slug: "taj-metals",
    title: "Taj Metals — Industrial Tubes & Pipes Website",
    summary:
      "Product catalogue and enquiry website for industrial tubes and pipes, with filterable specifications and a WhatsApp quote flow on every product.",
    description:
      "A catalogue website for hydraulic honed tubes, seamless pipes, boiler tubes, hollow sections and ERW pipes, built with Next.js, TypeScript and Tailwind CSS. A WhatsApp quote button appears in the hero, on every product card, under every specification table and as a floating button.\n\nThe catalogue filters by category, material and standard. Each product page lists thickness and length ranges, standard and grade, finish, key features and typical applications. Certifications, delivery coverage, business hours and a map are shown on the home and contact pages.\n\nA blog covers common technical questions — such as tolerances on honed tubes and the differences between DIN 2391, ASTM A106 and IS 3601 — to support search traffic. The site also includes cookie consent, privacy policy, terms and a sitemap.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SEO",
      "Content / blog",
    ],
    imageUrl: "/projects/taj-metals/poster.jpg",
    previewVideo: "/projects/taj-metals/preview.mp4",
    video: {
      src: "/projects/taj-metals/walkthrough.mp4",
      poster: "/projects/taj-metals/poster.jpg",
      duration: "1:48",
    },
    highlights: [
      "WhatsApp quote flow on every product card and product page.",
      "Catalogue filters by category, material and standard.",
      "Product pages with full specifications, features and applications.",
      "Technical blog for search visibility.",
      "Cookie consent, privacy policy, terms and sitemap.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/taj-metals/gallery/01-home.jpg",
        alt: "Taj Metals home page",
        caption:
          "Home — a rotating product family beside the certified-supplier card.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/02-categories.jpg",
        alt: "Taj Metals product categories",
        caption:
          "Categories — honed tubes, hydraulic pipes, seamless pipes, hollow sections, boiler tubes, ERW.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/03-catalogue.jpg",
        alt: "Taj Metals catalogue with filters",
        caption:
          "Catalogue — filtered by category, material and standard, with quick view and inquire.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/04-product-specs.jpg",
        alt: "Taj Metals product specification",
        caption:
          "Product — thickness, length, standard, grade and finish, then key features.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/05-product-applications.jpg",
        alt: "Taj Metals product applications",
        caption:
          "Applications, then the WhatsApp quote — the page ends where the deal starts.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/06-why-choose-us.jpg",
        alt: "Taj Metals credentials",
        caption:
          "Credentials and the numbers behind them — years, clients, projects.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/07-industries-faq.jpg",
        alt: "Taj Metals industries and FAQ",
        caption:
          "Industries served, delivery reach and the questions buyers ask first.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/08-whatsapp-enquiry.jpg",
        alt: "Taj Metals WhatsApp enquiry",
        caption:
          "Contact — WhatsApp framed as the fastest channel, with what to send.",
      },
      {
        type: "image",
        src: "/projects/taj-metals/gallery/09-location.jpg",
        alt: "Taj Metals location and hours",
        caption: "Business hours, GSTIN and a map to the Reay Road yard.",
      },
    ],
    liveUrl: "https://www.tajmetals.in",
    urltext: "tajmetals.in",
    role: "Design, development and deployment",
  },
  {
    slug: "logxivia",
    title: "Logxivia — Bilingual Consultancy Website",
    summary:
      "Bilingual (German/English) website for a Europe–India trade consultancy, built to GDPR norms with an imprint and essential-only cookies.",
    description:
      "A bilingual marketing website for a consultancy connecting European and Indian businesses, built with React, TypeScript, Tailwind CSS and Framer Motion. It presents four services — supplier sourcing, buyer search, market research and business connection support — along with a four-step process, a comparison panel, a fit-check section, target sectors and a founder profile.\n\nThe site follows German and EU requirements: an imprint, a privacy policy, a consent checkbox on the contact form and a DE/EN language toggle. No analytics or marketing scripts are loaded, so the cookie banner only needs to cover essential cookies.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "i18n (DE/EN)",
      "GDPR compliance",
      "Framer Motion",
    ],
    imageUrl: "/projects/logxivia/poster.jpg",
    previewVideo: "/projects/logxivia/preview.mp4",
    video: {
      src: "/projects/logxivia/walkthrough.mp4",
      poster: "/projects/logxivia/poster.jpg",
      duration: "1:45",
    },
    highlights: [
      "German/English language toggle across the whole site.",
      "GDPR-compliant: imprint, privacy policy and a consent checkbox on the contact form.",
      "No tracking scripts, so only essential cookies are used.",
      "Clear service, process and sector sections with smooth Framer Motion transitions.",
      "Contact form with validation and consent handling.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/logxivia/gallery/01-home.jpg",
        alt: "Logxivia home page",
        caption:
          "Home — the positioning in one sentence, with the consultation as the only ask.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/02-services.jpg",
        alt: "Logxivia services",
        caption:
          "Services — supplier identification, buyer search, market research, connection support.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/03-process.jpg",
        alt: "Logxivia process",
        caption: "Process — what happens after an enquiry, in four steps.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/04-who-we-serve.jpg",
        alt: "Logxivia audience",
        caption:
          "The businesses served — SMEs, manufacturers, trading companies, importers and exporters.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/05-sectors.jpg",
        alt: "Logxivia sectors",
        caption:
          "Sectors — scrap and recycling, raw materials, engineering, medical consumables.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/06-fit.jpg",
        alt: "Logxivia fit check",
        caption:
          "A fit check willing to say no, followed by why work with us.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/07-approach.jpg",
        alt: "Logxivia approach comparison",
        caption:
          "Without structure versus with Logxivia — the argument, side by side.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/08-founder.jpg",
        alt: "Logxivia founder profile",
        caption:
          "The founder, with the credentials this particular buyer weighs.",
      },
      {
        type: "image",
        src: "/projects/logxivia/gallery/09-contact.jpg",
        alt: "Logxivia contact form",
        caption:
          "Contact — consent checkbox, 24-hour reply, no obligation stated plainly.",
      },
    ],
    urltext: "Website",
    role: "Design, development and bilingual content structure",
  },
  {
    slug: "ictmt-2025",
    title: "ICTMT 2025 — Conference Website",
    summary:
      "Website for an international conference on technology and management — tracks, keynote, key dates, call for papers, fees and committees.",
    description:
      "The website for ICTMT 2025, the International Conference on Technology and Management for Transformation, held online on 8 April 2025. The page follows the order a researcher needs it: the conference and keynote, five paper tracks that expand into their topics, a timeline of key dates, the call for papers with its Microsoft CMT submission route, a registration fee table in rupees and dollars with payment details, and the patrons and committees.\n\nNearly all content — dates, fees, track topics and committee lists — lives in a single data file rather than in components, so a future edition is a content edit instead of a rebuild. Navigation uses a sticky desktop bar with dropdowns and a drawer on smaller screens.",
    tags: [
      "React 19",
      "Vite 6",
      "Tailwind CSS v4",
      "Radix UI",
      "Framer Motion",
      "Swiper",
    ],
    imageUrl: "/projects/ictmt-2025/poster.jpg",
    previewVideo: "/projects/ictmt-2025/preview.mp4",
    video: {
      src: "/projects/ictmt-2025/walkthrough.mp4",
      poster: "/projects/ictmt-2025/poster.jpg",
      duration: "0:42",
    },
    highlights: [
      "Five expandable paper tracks, each with its own topic list.",
      "Key dates timeline from paper submission to registration deadline.",
      "Registration fee table in INR and USD with payment details on the same page.",
      "All content stored in a single data file for easy updates.",
      "Sticky desktop navigation with dropdowns and a mobile drawer.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/01-home.jpg",
        alt: "ICTMT 2025 home page",
        caption: "Home — the conference, its date and its remit in one screen.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/02-tracks.jpg",
        alt: "ICTMT 2025 conference tracks",
        caption: "Five paper tracks, each opening into its own topic list.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/03-track-topics.jpg",
        alt: "ICTMT 2025 track topics",
        caption:
          "Topics under a track, with the note that the list is indicative.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/04-keynote.jpg",
        alt: "ICTMT 2025 keynote speaker",
        caption: "Keynote — the speaker, the affiliation and the talk.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/05-about-scoe.jpg",
        alt: "ICTMT 2025 about the college",
        caption: "The host institution — accreditations, campus and vision.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/06-call-for-papers.jpg",
        alt: "ICTMT 2025 call for papers",
        caption:
          "Call for papers — publication terms and the Microsoft CMT submission route.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/07-registration.jpg",
        alt: "ICTMT 2025 registration fees",
        caption:
          "Registration — fees by delegate type in rupees and dollars, then bank details.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/08-patrons.jpg",
        alt: "ICTMT 2025 patrons and chair",
        caption: "Patrons and chair.",
      },
      {
        type: "image",
        src: "/projects/ictmt-2025/gallery/09-committees.jpg",
        alt: "ICTMT 2025 committees",
        caption:
          "Programme, executive, international advisory and advisory committees.",
      },
    ],
    urltext: "Website",
    role: "Development and content architecture",
  },
  {
    slug: "sustech-2025",
    title: "SUSTECH 2025 — Conference Website",
    summary:
      "Website for an international conference on sustainable technologies — four tracks, key dates, submission details, fees and committees.",
    description:
      "The website for SUSTECH 2025, the International Conference on Sustainable Technologies, held online on 8 April 2025, covering green technology, AI for sustainability and sustainable mobility.\n\nFour paper tracks expand into their topic lists. The site presents key dates, submission and publication details, the best paper award, registration fees and an extensive committee section. Paper review is handled through Microsoft CMT, so the site focuses on presenting information clearly and linking out for submission.\n\nIt uses the same content-as-data approach as ICTMT 2025: one data file holds every title, deadline, fee and committee name that the pages render.",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "React Router",
    ],
    imageUrl: "/projects/sustech-2025/poster.jpg",
    previewVideo: "/projects/sustech-2025/preview.mp4",
    video: {
      src: "/projects/sustech-2025/walkthrough.mp4",
      poster: "/projects/sustech-2025/poster.jpg",
      duration: "0:42",
    },
    highlights: [
      "Four expandable paper tracks with topic lists.",
      "Key dates, submission details and publication terms on one page.",
      "Registration fees with payment details.",
      "Committee section with programme chairs, organisers and advisory panels.",
      "Shares a content-as-data structure with ICTMT 2025.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/01-home.jpg",
        alt: "SUSTECH 2025 home page",
        caption:
          "Home — green tech, AI for sustainability, sustainable mobility.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/02-tracks.jpg",
        alt: "SUSTECH 2025 conference tracks",
        caption: "Four tracks, selectable, each with its own topic list.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/03-track-topics.jpg",
        alt: "SUSTECH 2025 track topics",
        caption: "Topics under advances in sustainable technologies.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/04-about-scoe.jpg",
        alt: "SUSTECH 2025 about the college",
        caption: "The host institution, its accreditations, vision and mission.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/05-key-dates.jpg",
        alt: "SUSTECH 2025 key dates",
        caption:
          "The timeline — full paper, notification of acceptance, last date to register.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/06-submission.jpg",
        alt: "SUSTECH 2025 submission details",
        caption:
          "Submission and publication terms, and the sponsor of the best paper award.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/07-registration.jpg",
        alt: "SUSTECH 2025 registration fees",
        caption: "Registration fees by delegate type, with payment details.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/08-patrons.jpg",
        alt: "SUSTECH 2025 patrons and chair",
        caption: "Patrons and chair.",
      },
      {
        type: "image",
        src: "/projects/sustech-2025/gallery/09-committees.jpg",
        alt: "SUSTECH 2025 committees",
        caption:
          "Programme chairs, organisers, and the international and national advisory committees.",
      },
    ],
    urltext: "Website",
    role: "Development and content architecture",
  },
];

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);

/** Every image/clip attached to a project, walkthrough first, for the gallery. */
export const getProjectMedia = (project: Project): MediaItem[] => {
  const items: MediaItem[] = [];

  if (project.video) {
    items.push({
      type: "video",
      src: project.video.src,
      poster: project.video.poster ?? project.imageUrl,
      alt: `${project.title} walkthrough`,
      caption: "Full walkthrough",
    });
  }

  if (project.media) {
    items.push(...project.media);
  } else if (project.imageUrl) {
    items.push({ type: "image", src: project.imageUrl, alt: project.title });
  }

  return items;
};
