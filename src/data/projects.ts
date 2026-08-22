import type { MediaItem } from "@/components/media-lightbox";

/**
 * Projects are grouped by who owns them, not by which layer of the stack they
 * touch — that is the distinction a visitor actually cares about.
 *
 * "product" — conceived, built and shipped by me, end to end.
 * "client"  — built for a business, on their brief and their brand.
 */
export type ProjectCategory = "product" | "client";

export type Project = {
  /** URL segment for /projects/:slug — keep stable once a link is shared. */
  slug: string;
  title: string;
  /** Short line under the title on the card. */
  summary: string;
  /** Long-form copy shown on the detail page. */
  description: string;
  tags: string[];
  category: ProjectCategory;
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
};

export const projects: Project[] = [
  // ---------------------------------------------------------------------
  // Products — mine, end to end
  // ---------------------------------------------------------------------
  {
    slug: "novem",
    title: "Novem — E-Commerce Intelligence Platform",
    summary:
      "Local-first desktop BI tool: a Tauri shell over a FastAPI + DuckDB engine that turns e-commerce exports into forecasts, segments and plain-language answers.",
    description:
      "Built for e-commerce owners under $500K/year who cannot afford enterprise BI and have no data scientist — they need answers, not another dashboard. \n\nA Tauri (Rust) desktop shell wraps a React 19 + TypeScript client using Ant Design and ECharts, talking to a Python FastAPI engine that runs as a local HTTP server on 127.0.0.1:44945 — 23 routers and roughly 170 endpoints. Analytical tables live in DuckDB scoped by store_id so multiple stores stay isolated; settings, import lineage, alerts and encrypted connector credentials live in SQLite. The engine is where the real work happens: Prophet for demand forecasting, scikit-learn for segmentation, mlxtend for market-basket association rules, the lifetimes library for customer lifetime value, SHAP so a recommendation can explain itself, and TextBlob for review sentiment. Ollama runs a local LLM so summaries never leave the machine. ReportLab generates the exports and APScheduler handles recurring refreshes. \n\nRelease builds freeze the engine with PyInstaller and ship it inside an NSIS installer, and CI runs the full gate on every push — Ruff lint and format, pytest across Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest, and a production build.",
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
    category: "product",
    imageUrl: "/projects/novem/poster.jpg",
    previewVideo: "/projects/novem/preview.mp4",
    video: {
      src: "/projects/novem/walkthrough.mp4",
      poster: "/projects/novem/poster.jpg",
      duration: "7:47",
    },
    highlights: [
      "A Tauri (Rust) shell owns the window and the engine lifecycle — it launches the Python process on startup, waits for the port to accept connections, and asks it to shut down gracefully on exit.",
      "Everything runs on the machine: DuckDB for the analytical tables, SQLite for settings and lineage, and a local Ollama model for the Copilot. Nothing is uploaded anywhere.",
      "Customers get RFM segmentation, churn risk and CLV via BG/NBD + Gamma-Gamma, plus cohort retention and per-customer story timelines.",
      "Insights decompose a change rather than just reporting it — “revenue fell 15.5% — returning customers −$20.5k, AOV −$12.7k” — with z-score anomaly detection and SHAP explanations.",
      "Capabilities degrade instead of failing: forecasting falls back to linear-trend extrapolation without Prophet, sentiment falls back from a transformer to TextBlob to keyword matching, and the Copilot falls back to rule-based answers without Ollama.",
      "Customer emails and names are SHA-256 hashed on import by default, which is why the Data Viewer shows customer_email_hash rather than an address.",
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
    urltext: "Desktop app · Tauri shell + FastAPI engine",
    role: "Solo — product, architecture, engine, client and packaging",
  },
  {
    slug: "initcore-crm",
    title: "InitCore CRM — Call Center Platform",
    summary:
      "Django CRM for running an outbound call-center desk — leads, payments, GST invoices, attendance and a live break monitor.",
    description:
      "A single Django app for a small outbound call-center desk. Leads are imported from CSV or XLSX through a column-mapping screen before anything is written, carry a disposition and a free-form sub-disposition, and append to a LeadHistory row on every change — moving a lead to another agent writes a transfer record with the from/to users and a remark. Contact numbers are unique across the table, so re-importing the same list will not create duplicates. \n\nConverted leads become paid customers, and once an admin verifies the record the app creates an invoice, converts the amount to words with num2words in Indian numbering, renders the invoice template and shells out to wkhtmltopdf via pdfkit to store the PDF. Attendance is written by the login and logout views rather than a clock-in button: on save the model computes total login time, subtracts break time, and sets Present, Half day or Absent. Agents start and stop breaks over a WebSocket and team leaders watch them live on the Monitor page. \n\nEvery page filters its queryset by the logged-in user's role, so one view serves the superuser, the team leader and the agent. Server-rendered templates throughout — 17 models, no REST API and no JavaScript framework.",
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
    category: "product",
    imageUrl: "/projects/initcore-crm/poster.jpg",
    previewVideo: "/projects/initcore-crm/preview.mp4",
    video: {
      src: "/projects/initcore-crm/walkthrough.mp4",
      poster: "/projects/initcore-crm/poster.jpg",
      duration: "2:49",
    },
    highlights: [
      "Every page filters its queryset by the logged-in user's role, so a single view serves all three — scope of data, visible pages and permission to verify payments all follow from the role on UserProfile.",
      "Imports pass through a column-mapping screen before anything is written, and contact numbers are unique across the table, so re-importing the same list will not create duplicates.",
      "A verified payment creates an invoice, converts the amount to words with num2words in Indian numbering, renders the template and shells out to wkhtmltopdf via pdfkit to store a PDF against it.",
      "Attendance is a side effect of logging in and out rather than a clock-in button — the model subtracts break time from total login time and sets Present at nine hours, Half day at four and a half, otherwise Absent.",
      "Agents start and stop breaks over Django Channels, and admins and team leaders watch them live on the Monitor page.",
      "The known constraints are written down rather than hidden — the in-memory channel layer that limits the monitor to a single worker, wkhtmltopdf resolved as a bare relative path, and Present being close to unreachable because the shift is exactly nine hours.",
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
    urltext: "On-premise deployment",
    role: "Solo — data model, views, realtime layer and templates",
  },
  {
    slug: "initcore-realestate",
    title: "InitCore Real Estate CRM",
    summary:
      "Django platform for co-living property management — bed-space inventory, tenancies and payments, with a different application for each role.",
    description:
      "A property management platform for co-living and shared accommodation, built as a server-rendered Django application on PostgreSQL. Inventory goes down to the bed space: every room carries a type, occupancy, rent and availability status, and the dashboard computes occupancy and collection rates against them rather than against whole units. Prospective tenants and landlords are onboarded by emailed invitation, with a management screen tracking who was invited, by whom, when the invite was created and when it expires. \n\nA tenancy carries contract dates, monthly rent, security deposit, room assignment and a financial breakdown, and contracts approaching expiry are flagged on both the admin and the tenant side. Leads move through a pipeline — contacted, interested, meeting scheduled, proposal sent, lost — each with an owner and a last-activity trail. Maintenance is ticket-driven with priorities and assignment, and payments, activity logs and resident community events each get their own module. \n\nThe part that shapes everything else is role scoping: the same install presents a different product to a super user, a property manager, a maintenance supervisor, a landlord and a tenant.",
    tags: ["Django", "Python", "PostgreSQL", "Server-rendered templates"],
    category: "product",
    imageUrl: "/projects/initcore-realestate/poster.jpg",
    previewVideo: "/projects/initcore-realestate/preview.mp4",
    video: {
      src: "/projects/initcore-realestate/walkthrough.mp4",
      poster: "/projects/initcore-realestate/poster.jpg",
      duration: "9:13",
    },
    highlights: [
      "One install, five different products: a super user sees the whole portfolio, a property manager only their own properties and tickets, a maintenance supervisor their tasks and deadlines, a landlord their rent collected, and a tenant a self-service portal.",
      "Inventory is tracked to the bed space — each room carries a type, occupancy, rent and availability, and occupancy and collection rates are computed against those rather than whole units.",
      "Tenants and landlords are onboarded by emailed invitation, with a management screen showing who was invited, by whom, when it was created and when it expires.",
      "A tenancy carries contract dates, monthly rent, security deposit, room assignment and a financial breakdown, and contracts near expiry surface on both the admin and tenant views.",
      "Leads run through contacted, interested, meeting scheduled, proposal sent and lost, each with an owner and a last-activity trail.",
      "Maintenance is ticket-driven with priority and assignment, alongside modules for payments, activity logs and resident community events.",
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
    urltext: "Multi-role platform · private deployment",
    role: "Solo — role model, inventory, tenancy and all five portals",
  },

  // ---------------------------------------------------------------------
  // Client work
  // ---------------------------------------------------------------------
  {
    slug: "sk-trading",
    title: "S.K Trading — Billing Desktop App",
    summary:
      "Offline Electron app for an industrial valve supplier — quotations, proforma and tax invoices and delivery challans, printed to a GST letterhead.",
    description:
      "A Windows desktop application for a supplier of IBR and non-IBR valves, pipes and fittings, replacing the spreadsheet-and-Word routine that produced their paperwork. Every document type the business issues — quotation, proforma invoice, tax invoice, delivery challan — is edited in a form on the left while an A4 print preview re-renders on the right, so what you approve is exactly what prints. Line items carry size, HSN code, quantity, unit, rate and GST percentage, tax splits into CGST and SGST or IGST from the place of supply, and the total is written out in words on the document. \n\nCustomers and products are never entered twice: both lists are accumulated from the documents already issued, so the customer page can show invoice count, total billed and outstanding, and the product page can recall the last rate used for a line. Reports break revenue down by customer, by product and by state with CSV export, and an audience export builds segments — bought in the last ninety days, dormant six months or more, quoted but never bought, payment outstanding, top twenty by value — as a contact file for a WhatsApp campaign tool. \n\nEverything is local: a SQLite database and generated PDFs sit in a folder on the machine, with Google Drive backup and Gmail app-password sending as opt-in extras.",
    tags: [
      "Electron",
      "SQLite",
      "JavaScript",
      "PDF generation",
      "Google Drive API",
      "Gmail API",
    ],
    category: "client",
    imageUrl: "/projects/sk-trading/poster.jpg",
    previewVideo: "/projects/sk-trading/preview.mp4",
    video: {
      src: "/projects/sk-trading/walkthrough.mp4",
      poster: "/projects/sk-trading/poster.jpg",
      duration: "1:35",
    },
    highlights: [
      "Each document is a form on the left and a live A4 print preview on the right, so the thing being approved is the thing that prints.",
      "Tax splits into CGST and SGST or into IGST from the place of supply, and the grand total is spelled out in words on the printed document.",
      "Customers and products are accumulated from the documents already issued rather than maintained by hand — which is what lets the app surface total billed, outstanding, and the last rate used for a line item.",
      "Audience export turns the same history into segments — dormant six months or more, quoted but never bought, payment outstanding, top twenty by value — and writes a contact file for a WhatsApp campaign tool.",
      "Everything runs offline against a local SQLite database with the generated PDFs beside it; Google Drive backup and Gmail sending are opt-in and work through the user's own account.",
      "Recorded on the real installation, so the business's own phone, email and GSTIN are blurred wherever they appear.",
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
    urltext: "Windows desktop app · installed on site",
    role: "Solo — built, packaged and installed for the client",
  },
  {
    slug: "sk-trading-web",
    title: "S.K Trading & Co. — Valve Catalogue Site",
    summary:
      "Public catalogue for a Navi Mumbai valve stockist — 224 products across fourteen categories, organised by duty rather than by size alone.",
    description:
      "The customer-facing half of the same business the billing app serves: a catalogue site for a stockist and supplier of industrial valves, pipe fittings and MS dismantling joints. The site is organised the way the sales desk actually works. The home page opens on stock rather than on a slogan — 224 products listed, fourteen product categories, twenty brands stocked, fifteen years in the trade — and every category tile carries its own count, so a buyer can see the depth before clicking. \n\nThe product listing filters on the attributes an engineer specifies against: body material, end connection, pressure rating and operation, paged with a load-more rather than a wall of results. Alongside the catalogue there is a sector view built on the premise that the same nominal size behaves very differently on potable water and on 250 °C saturated steam — six sectors, from water supply and municipal through power and boiler houses to sugar, paper and process, each mapping to the categories most often quoted for it and linking straight into the relevant part of the catalogue. The About page is deliberately blunt about what the business is: a trading house that holds and supplies valves built by the manufacturers a specification already names, with one exception it manufactures in-house. \n\nEnquiry is the conversion path throughout — a requirement form taking a product category and a free-text specification, a WhatsApp handoff, and a linked IndiaMART store — with the office and godown address, working hours, GST, Udyam and ISO registration numbers, and a map closing the contact page.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Product catalogue",
      "SEO",
    ],
    category: "client",
    imageUrl: "/projects/sk-trading-web/poster.jpg",
    previewVideo: "/projects/sk-trading-web/preview.mp4",
    video: {
      src: "/projects/sk-trading-web/walkthrough.mp4",
      poster: "/projects/sk-trading-web/poster.jpg",
      duration: "1:26",
    },
    highlights: [
      "The hero leads with inventory, not adjectives — 224 products listed, 14 categories, 20 brands stocked, 15+ years — because that is the first thing a procurement buyer checks.",
      "Products are filtered on what an engineer actually specifies: body material, end connection, pressure rating and operation.",
      "A sector view sits beside the catalogue on the premise that the same nominal size behaves differently on potable water and on 250 °C saturated steam — six sectors, each mapped to the categories most often quoted for it.",
      "Brand tiles are marked stocked rather than merely listed, so a buyer can tell holding stock from a sourcing promise.",
      "Every page ends in the same three exits — request a quote, WhatsApp the sales desk, or open the IndiaMART store — and the requirement form takes a category plus a free-text specification.",
      "Registration details, working hours and the office-and-godown address sit on the page rather than behind a form, which is what an industrial buyer verifies before enquiring.",
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
    urltext: "Catalogue website · Navi Mumbai",
    role: "Solo — information architecture, build and content structure",
  },
  {
    slug: "key2yourhome",
    title: "Key2YourHome — Real Estate Channel Partner",
    summary:
      "Property discovery site for a MahaRERA-registered channel partner across Mumbai, Thane, Navi Mumbai and Pune, with a dedicated NRI desk.",
    description:
      "A property site for a registered real estate channel partner — not a developer, and the site says so on every page, because in Maharashtra that distinction is a legal one. Projects, resale homes, rentals and land deals each get their own index, searchable by name, locality or builder and filtered by city, type, BHK and budget. \n\nA project page is the heart of it: a photo gallery, an overview, a specification table covering price, configuration, possession, builder, tower structure, jodi layouts and on-site retail, a connectivity list measured in minutes to the junction, the bullet train station, the IT hub, the hospital and the airport, an embedded walkthrough, available unit plans with price on request, project highlights and an FAQ — all wrapped by a sticky enquiry rail carrying a WhatsApp handoff, a site-visit booking, a brochure download and a callback form pre-filled with the project name. \n\nThe MahaRERA number is not decoration: it sits on the hero badge, in a QR card linking to the state authority's own portal, and in a footer disclaimer telling buyers to verify independently. A separate NRI desk covers what remote buyers actually need — video site visits, RERA and document verification, banking, FEMA and repatriation guidance, and post-purchase rental management — and a five-step process runs from discovery call through curated shortlist and virtual due diligence to booking and post-purchase support. Cookie consent is granular, with essential, analytics and marketing controlled separately.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
      "SEO",
      "Cookie consent",
    ],
    category: "client",
    imageUrl: "/projects/key2yourhome/poster.jpg",
    previewVideo: "/projects/key2yourhome/preview.mp4",
    video: {
      src: "/projects/key2yourhome/walkthrough.mp4",
      poster: "/projects/key2yourhome/poster.jpg",
      duration: "1:38",
    },
    highlights: [
      "The channel-partner status is treated as a legal fact, not a badge — MahaRERA registration on the hero, a QR card linking to the state portal, and a footer disclaimer that the business is not the promoter or developer.",
      "A project page runs from gallery and overview to a full specification table, a connectivity list measured in minutes, unit plans, highlights and an FAQ — with a sticky rail that never loses the enquiry.",
      "The callback form arrives pre-filled with the project the visitor is reading, so a lead carries its own context.",
      "An NRI desk covers remote buying end to end — video site visits, RERA and document verification, banking, FEMA and repatriation, and rental management after possession.",
      "Listings are labelled as illustrative while the live inventory feed is being connected, rather than passing sample data off as stock.",
      "Cookie consent is granular — essential, analytics and marketing each toggled separately, with reject-non-essential as a first-class choice.",
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
    role: "Solo — design, build and deployment",
  },
  {
    slug: "taj-metals",
    title: "Taj Metals — Industrial Tubes & Pipes",
    summary:
      "Catalogue and enquiry site for a Mumbai steel supplier, built so every product page ends in a WhatsApp quote with the specification attached.",
    description:
      "A catalogue site for a Mumbai supplier of hydraulic honed tubes, seamless pipes, boiler tubes, hollow sections and ERW pipes. The brief was a site that converts on WhatsApp, because that is where this trade already negotiates — so the quote path sits on the hero, on every product card, at the bottom of every product page, and as a floating button that follows the visitor down the page. \n\nThe catalogue filters by category, material and standard, and a product page carries what a buyer needs before asking for a price: thickness and length ranges, standard and grade, finish, key features and the applications the product is actually specified into. Credibility is handled in-page rather than claimed — the GSTIN sits in a certified-supplier card on the hero and again on the contact page, alongside ISO certification, pan-India delivery, business hours and a map to the yard. \n\nA blog covers the questions that precede a purchase, such as tolerances and surface finish on honed tubes and how DIN 2391, ASTM A106 and IS 3601 differ in practice, which is also what earns the site its search traffic. Cookie consent, a privacy policy, terms, a cookies policy and a sitemap complete it.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SEO",
      "Content / blog",
    ],
    category: "client",
    imageUrl: "/projects/taj-metals/poster.jpg",
    previewVideo: "/projects/taj-metals/preview.mp4",
    video: {
      src: "/projects/taj-metals/walkthrough.mp4",
      poster: "/projects/taj-metals/poster.jpg",
      duration: "1:48",
    },
    highlights: [
      "WhatsApp is the conversion path, not an afterthought — on the hero, on every product card, under every specification table, and as a floating button throughout.",
      "The catalogue filters by category, material and standard, and each product page carries thickness and length ranges, standard, grade, finish, key features and real applications.",
      "The GSTIN and ISO certification are shown in a certified-supplier card rather than asserted in prose, which is what a first-time industrial buyer checks.",
      "A blog answers the questions that come before a purchase — honed-tube tolerances and surface finish, and how DIN 2391, ASTM A106 and IS 3601 actually differ — and carries the site's search traffic.",
      "Business hours, the Reay Road office address and an embedded map close the contact page, because this trade still confirms a supplier by visiting the yard.",
      "Cookie consent, privacy policy, terms, cookies policy and a sitemap are all in place.",
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
    role: "Solo — design, build and deployment",
  },
  {
    slug: "logxivia",
    title: "Logxivia — Europe–India Trade Consultancy",
    summary:
      "Bilingual lead-generation site for a Cologne-based trade consultancy, built to German disclosure norms — imprint, essential-only cookies, no tracking.",
    description:
      "A marketing site for a Cologne-based consultancy that connects European and Indian businesses — supplier sourcing, buyer search, market-entry research and business connection support. The audience is a cautious SME owner on either side of a cross-border deal, so the whole page is built to remove doubt rather than to excite. Four numbered services state precisely what is and is not offered, closing on a line that all services are advisory and that final agreements are made directly between the parties. A four-step process shows what happens after an enquiry. A side-by-side panel contrasts working without structure — unverified partners, fragmented search, poor pricing visibility — against what a research-backed process produces, which is the actual sales argument. \n\nThere is a fit-check section that tells the wrong visitor they are the wrong visitor, an audience section naming the four kinds of business served, and a sector list covering scrap metals and recycling, industrial raw materials, manufacturing and engineering, and medical consumables. The founder appears with the credentials that matter to this specific buyer — over ten years living and working in Germany, an MBA in International Business Management, fluent German. \n\nGerman practice shaped the build: an imprint, a privacy policy, a consent checkbox on the contact form, a language toggle, and a cookie banner that can say only essential cookies are used because no analytics or marketing scripts were loaded at all.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "i18n (DE/EN)",
      "GDPR compliance",
      "Framer Motion",
    ],
    category: "client",
    imageUrl: "/projects/logxivia/poster.jpg",
    previewVideo: "/projects/logxivia/preview.mp4",
    video: {
      src: "/projects/logxivia/walkthrough.mp4",
      poster: "/projects/logxivia/poster.jpg",
      duration: "1:45",
    },
    highlights: [
      "Built to German norms: an imprint, a privacy policy, a consent checkbox on the contact form, and a DE/EN language toggle.",
      "The cookie banner can honestly say only essential cookies are used, because no analytics or marketing scripts ship with the site at all.",
      "Each of the four services closes on a disclaimer that the work is advisory and that final agreements are made directly between the parties — scope stated up front, not in a contract later.",
      "A without-structure versus with-Logxivia panel carries the sales argument by naming the failure mode rather than praising the service.",
      "A fit-check section is willing to disqualify the wrong visitor, which is what makes the enquiries that do arrive worth answering.",
      "The contact form promises what a hesitant SME buyer needs to hear — a Germany-based team, a reply within 24 hours, and that exploratory calls are welcome.",
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
    urltext: "Consultancy site · Cologne, Germany",
    role: "Solo — design, build and bilingual content structure",
  },
  {
    slug: "ictmt-2025",
    title: "ICTMT 2025 — Conference Website",
    summary:
      "Site for an international technology-and-management conference at SCOE — tracks, keynote, deadlines, fees and committees, with the content kept out of the markup.",
    description:
      "The website for ICTMT 2025, the International Conference on Technology and Management for Transformation, organised by Saraswati College of Engineering and held online on 8 April 2025. A conference site is a deadline machine: it exists to get researchers from the call for papers to a paid registration before three dates pass. \n\nSo the page runs in that order — the conference and its keynote, five paper tracks each expandable into its topic list, a dated timeline from full-paper submission through notification of acceptance to the last date of registration, the call for papers with its Microsoft CMT submission route and publication terms, a registration fee table split by delegate type in both rupees and dollars with the bank details directly beneath it, and finally the patrons, chair and the four committees. \n\nNearly all copy — dates, names, fees, track topics, committee rosters — lives in a values file exported as plain objects rather than sitting in components, so preparing the next edition is a content edit and not a rebuild. Navigation is split by breakpoint: a sticky desktop bar with dropdowns that turns solid once the page scrolls, and a drawer below the large breakpoint.",
    tags: [
      "React 19",
      "Vite 6",
      "Tailwind CSS v4",
      "Radix UI",
      "Framer Motion",
      "Swiper",
    ],
    category: "client",
    imageUrl: "/projects/ictmt-2025/poster.jpg",
    previewVideo: "/projects/ictmt-2025/preview.mp4",
    video: {
      src: "/projects/ictmt-2025/walkthrough.mp4",
      poster: "/projects/ictmt-2025/poster.jpg",
      duration: "0:42",
    },
    highlights: [
      "The page is ordered by the reader's deadline, not by the organiser's org chart — keynote and tracks, then dates, then submission, then fees, then committees.",
      "Five paper tracks each expand into their own topic list, with a note that the topics are indicative and can be extended under each track.",
      "The fee table carries both rupee and dollar amounts per delegate type, with the bank and IFSC details immediately below, so registration never leaves the page.",
      "Dates, fees, track topics and every committee roster live in a values file as plain objects, so the next edition is a content edit rather than a rebuild.",
      "Two separate navigations by breakpoint — a sticky desktop bar with dropdowns that turns solid on scroll, and a drawer below the large breakpoint.",
      "Submission runs through Microsoft CMT, so the site's job ends at handing the author off cleanly rather than trying to own the review process.",
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
    urltext: "Conference site · SCOE, Navi Mumbai",
    role: "Solo — build, content architecture and handover",
  },
  {
    slug: "sustech-2025",
    title: "SUSTECH 2025 — Conference Website",
    summary:
      "Sister site to ICTMT for SCOE's conference on sustainable technologies — four green-tech tracks, an IEI-sponsored best paper award, same content-as-data build.",
    description:
      "The website for SUSTECH 2025, the International Conference on Sustainable Technologies, organised by Saraswati College of Engineering and held online on 8 April 2025 — a platform for researchers, academicians and industry professionals working in green technology, AI for sustainability and sustainable mobility. \n\nFour paper tracks cover green technology initiatives, emerging technologies in structural design, green mobility solutions and advances in sustainable technologies, each expanding into topics from pollution prevention and sustainable environment management through machine learning for sustainable manufacturing, IoT-based solutions and precision agriculture. There is no backend: peer review runs on Microsoft CMT and papers are published in conference proceedings and book chapters with an ISBN, with selected papers going to indexed journals — so the site's job is to present information accurately and hand off cleanly. The best paper award is sponsored by the Institution of Engineers (India), Navi Mumbai Local Centre, and the committee section runs deep, from programme chairs and organisers to international advisers in Japan, Germany and the UAE and a national advisory panel drawn from DRDO, industry and half a dozen engineering colleges. \n\nSame content-as-data approach as ICTMT: one values file holds every title, deadline, fee and committee name that the page maps over.",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "React Router",
    ],
    category: "client",
    imageUrl: "/projects/sustech-2025/poster.jpg",
    previewVideo: "/projects/sustech-2025/preview.mp4",
    video: {
      src: "/projects/sustech-2025/walkthrough.mp4",
      poster: "/projects/sustech-2025/poster.jpg",
      duration: "0:42",
    },
    highlights: [
      "Four green-tech tracks, each expanding into its own topic list — from pollution prevention to machine learning for sustainable manufacturing and precision agriculture.",
      "No backend at all: review runs on Microsoft CMT and publication on proceedings and book chapters, so the site presents and hands off rather than pretending to own the workflow.",
      "Publication terms are stated plainly — ISBN proceedings and book chapters, with selected papers to indexed journals subject to acceptance and applicable fees.",
      "The committee section carries programme chairs, organisers, an international advisory panel spanning Japan, Germany and the UAE, and a national panel from DRDO, industry and six engineering colleges.",
      "Built on the same content-as-data structure as ICTMT, so both conferences are maintained the same way by the same non-developer staff.",
      "The best paper award and its sponsoring body are surfaced beside the call for papers, where they actually influence a submission decision.",
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
    urltext: "Conference site · SCOE, Navi Mumbai",
    role: "Solo — build, content architecture and handover",
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

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; dot: string; chip: string }
> = {
  product: {
    label: "Product",
    dot: "bg-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  },
  client: {
    label: "Client work",
    dot: "bg-sky-500",
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25",
  },
};

/** Section headings for the work page, in the order they are rendered. */
export const projectGroups: {
  category: ProjectCategory;
  title: string;
  blurb: string;
}[] = [
  {
    category: "product",
    title: "Products",
    blurb:
      "Mine end to end — my idea, my architecture, my code. Each one is a finished thing a business could run on today.",
  },
  {
    category: "client",
    title: "Client work",
    blurb:
      "Built for businesses that came to me through my own network — their brief, their brand, their customers using it.",
  },
];

export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((project) => project.category === category);
