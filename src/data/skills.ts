import {
  BellRing,
  ChartSpline,
  FileSpreadsheet,
  FileText,
  LayoutTemplate,
  ListChecks,
  Mail,
  Package,
  PawPrint,
  RadioTower,
  ChartBar,
  Code,
  type Icon,
} from "@/components/icons";
import { projects, type Project } from "@/data/projects";

/**
 * Skills, backed by the work.
 *
 * Every tool names the project tags that count as using it (`uses`). Which
 * projects those are is worked out from the project data itself, so the
 * site can never claim a tool for a project that does not list it — and a
 * re-imported project updates the page on its own.
 *
 * `skillGroups` is the full catalogue: it names the tags on project cards and
 * pages, so each project still shows its real stack. The Skills page and site
 * search show only the short lists at the end of this file, which are the
 * stack I present myself on rather than everything I have touched.
 */

export type Tool = {
  name: string;
  /** A logo in /public/icons. */
  icon?: string;
  /** For libraries and capabilities with no published logo: a Fluent-style
   *  glyph drawn in `tint`, so every tool still gets a mark. */
  glyph?: Icon;
  tint?: string;
  /** Project tags that mean this tool was used. Matched exactly. */
  uses: string[];
  /** A capability pooled from several libraries ("PDF generation") rather
   *  than one tool. Listed in its area, but kept out of the core-stack
   *  ranking, where pooling would inflate its count. */
  capability?: true;
};

export type SkillGroup = {
  id: string;
  name: string;
  /** One line on what the group covers. */
  role: string;
  tools: Tool[];
};

const icon = (file: string) => `/icons/${file}`;
const brand = (slug: string) => `/icons/brands/${slug}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    role: "What the code is written in",
    tools: [
      { name: "TypeScript", icon: icon("typescript.svg"), uses: ["TypeScript", "Angular 22"] },
      {
        name: "Python",
        icon: icon("python.svg"),
        uses: ["Python", "Django", "FastAPI", "pandas"],
      },
      {
        name: "JavaScript",
        icon: icon("javascript.svg"),
        uses: ["Google Apps Script", "Astro", "Electron"],
      },
      { name: "C#", icon: brand("csharp"), uses: [".NET 10", "ASP.NET Core"] },
      { name: "SQL", icon: icon("sql.svg"), uses: ["PostgreSQL", "SQLite", "DuckDB"] },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    role: "Interfaces for the web, from marketing sites to dashboards",
    tools: [
      { name: "React", icon: icon("react.svg"), uses: ["React"] },
      { name: "Next.js", icon: icon("nextjs.svg"), uses: ["Next.js"] },
      { name: "Tailwind CSS", icon: icon("tailwindcss.svg"), uses: ["Tailwind CSS"] },
      { name: "Angular", glyph: Code, tint: "#DD0031", uses: ["Angular 22"] },
      { name: "Astro", icon: brand("astro"), uses: ["Astro"] },
      { name: "shadcn/ui", icon: brand("shadcnui"), uses: ["shadcn/ui"] },
      { name: "Ant Design", icon: icon("antdesign.svg"), uses: ["Ant Design"] },
      { name: "Flowbite", glyph: LayoutTemplate, tint: "#1C64F2", uses: ["Flowbite"] },
      { name: "Framer Motion", icon: icon("framermotion.svg"), uses: ["Framer Motion"] },
      { name: "Zustand", glyph: PawPrint, tint: "#8B5A2B", uses: ["Zustand"] },
      { name: "Chart.js", icon: brand("chartdotjs"), uses: ["Chart.js"] },
      { name: "ECharts", icon: brand("apacheecharts"), uses: ["ECharts"] },
      { name: "Leaflet maps", icon: brand("leaflet"), uses: ["Leaflet", "OpenStreetMap"] },
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    role: "Services, business logic and real-time features",
    tools: [
      { name: "Django", icon: icon("django.svg"), uses: ["Django"] },
      { name: "FastAPI", icon: icon("FastAPI.svg"), uses: ["FastAPI"] },
      { name: "ASP.NET Core", icon: brand("dotnet"), uses: ["ASP.NET Core", ".NET 10"] },
      { name: "Node.js", icon: brand("nodedotjs"), uses: ["Electron", "Nodemailer"] },
      {
        name: "WebSockets",
        icon: icon("websocket.svg"),
        uses: ["WebSockets", "Django Channels", "SignalR"],
      },
      { name: "Django Channels", icon: icon("django.svg"), uses: ["Django Channels"] },
      { name: "SignalR", glyph: RadioTower, tint: "#512BD4", uses: ["SignalR"] },
      { name: "Web Push", glyph: BellRing, tint: "#0067C0", uses: ["Web Push"] },
      { name: "WebAuthn passkeys", icon: brand("webauthn"), uses: ["WebAuthn"] },
    ],
  },
  {
    id: "data",
    name: "Databases & storage",
    role: "Schemas, queries and where files live",
    tools: [
      { name: "PostgreSQL", icon: icon("postgresql.svg"), uses: ["PostgreSQL"] },
      { name: "SQLite", icon: icon("sqlite.svg"), uses: ["SQLite", "better-sqlite3"] },
      { name: "Entity Framework Core", icon: brand("dotnet"), uses: ["EF Core"] },
      {
        name: "Cloudflare D1 & R2",
        icon: brand("cloudflare"),
        uses: ["Cloudflare D1", "Cloudflare R2"],
      },
    ],
  },
  {
    id: "ml",
    name: "Data & AI",
    role: "Analysis, forecasting and local language models",
    tools: [
      { name: "pandas", icon: icon("Pandas.svg"), uses: ["pandas"] },
      { name: "scikit-learn", icon: icon("scikitlearn.svg"), uses: ["scikit-learn"] },
      { name: "Prophet", icon: icon("prophet.svg"), uses: ["Prophet"] },
      { name: "SHAP", glyph: ChartBar, tint: "#FF0D57", uses: ["SHAP"] },
      {
        name: "mlxtend & lifetimes",
        glyph: ChartSpline,
        tint: "#3776AB",
        uses: ["mlxtend", "lifetimes"],
      },
      { name: "Ollama", icon: brand("ollama"), uses: ["Ollama"] },
      {
        name: "Excel import & export",
        glyph: FileSpreadsheet,
        tint: "#107C41",
        uses: ["openpyxl"],
        capability: true,
      },
      {
        name: "PDF generation",
        glyph: FileText,
        tint: "#D13438",
        uses: ["ReportLab", "pdfkit", "wkhtmltopdf"],
        capability: true,
      },
    ],
  },
  {
    id: "desktop",
    name: "Desktop",
    role: "Offline-first apps with installers for Windows",
    tools: [
      { name: "Tauri", icon: icon("tauri.svg"), uses: ["Tauri"] },
      { name: "Electron", icon: brand("electron"), uses: ["Electron", "electron-updater"] },
      { name: "PyInstaller", glyph: Package, tint: "#3776AB", uses: ["PyInstaller"] },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    role: "Containers, pipelines, hosting and observability",
    tools: [
      { name: "GitHub Actions", icon: brand("githubactions"), uses: ["GitHub Actions"] },
      { name: "Docker", icon: icon("docker.svg"), uses: ["Docker"] },
      {
        name: "Cloudflare",
        icon: brand("cloudflare"),
        uses: ["Cloudflare", "Cloudflare Workers", "OpenNext", "Turnstile"],
      },
      { name: "Vercel", icon: icon("vercel.svg"), uses: ["Vercel"] },
      { name: "Hostinger", icon: icon("hostinger.svg"), uses: ["Hostinger", "Hostinger Reach"] },
      { name: "OpenTelemetry", icon: brand("opentelemetry"), uses: ["OpenTelemetry"] },
    ],
  },
  {
    id: "testing",
    name: "Testing",
    role: "From unit tests to the browser",
    tools: [
      { name: "Playwright", icon: brand("playwright"), uses: ["Playwright"] },
      { name: "Vitest", icon: brand("vitest"), uses: ["Vitest"] },
      { name: "xUnit", glyph: ListChecks, tint: "#512BD4", uses: ["xUnit"] },
    ],
  },
  {
    id: "integrations",
    name: "Integrations",
    role: "Payments, messaging and third-party platforms",
    tools: [
      { name: "Razorpay", icon: brand("razorpay"), uses: ["Razorpay"] },
      { name: "Stripe", icon: brand("stripe"), uses: ["Stripe"] },
      { name: "WhatsApp Cloud API", icon: brand("whatsapp"), uses: ["WhatsApp Cloud API"] },
      { name: "Meta Graph API", icon: brand("meta"), uses: ["Meta Graph API"] },
      { name: "Shopify API", icon: brand("shopify"), uses: ["Shopify API"] },
      {
        name: "Google Workspace APIs",
        icon: brand("googlesheets"),
        uses: ["Google Sheets API", "Google Drive API", "Google Apps Script"],
        capability: true,
      },
      {
        name: "Email delivery",
        glyph: Mail,
        tint: "#0067C0",
        uses: ["MailKit", "Nodemailer", "PHPMailer", "Hostinger Reach"],
        capability: true,
      },
    ],
  },
];

/** The projects that use a tool, in the site's project order. */
export function projectsUsing(tool: Tool): Project[] {
  return projects.filter((project) => project.tags.some((tag) => tool.uses.includes(tag)));
}

export type RankedTool = Tool & { group: string; projects: Project[] };

/** Every tool with its projects, most-used first. Ties keep the listed order. */
export const rankedTools: RankedTool[] = skillGroups
  .flatMap((group) =>
    group.tools.map((tool) => ({ ...tool, group: group.name, projects: projectsUsing(tool) })),
  )
  .filter((tool) => tool.projects.length > 0)
  .sort((a, b) => b.projects.length - a.projects.length);

/** Picks tools by name. A name that matches nothing fails loudly (and `npm run
 *  smoke` with it), so renaming a tool can't quietly empty the Skills page. */
const pick = (names: string[]): RankedTool[] =>
  names.map((name) => {
    const tool = rankedTools.find((item) => item.name === name);
    if (!tool) throw new Error(`Skills page lists "${name}", which no project uses.`);
    return tool;
  });

/** What I build with first, and can talk about in depth. Chosen, not ranked:
 *  a project count alone would put Tailwind above Django and leave out FastAPI. */
export const coreStack = pick([
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "Tailwind CSS",
]);

/** The everyday tools that go with the core stack. */
export const supportingTools = pick([
  "JavaScript",
  "SQL",
  "SQLite",
  "GitHub Actions",
  "Playwright",
  "Vitest",
]);

/** Used because a project called for them, and labelled that way. */
export const projectTools = pick([
  "Electron",
  "Tauri",
  "ASP.NET Core",
  "Angular",
  "Docker",
  "Cloudflare",
  "WebSockets",
]);

/** Everything the site presents as a skill: the Skills page and site search. */
export const presentedTools = [...coreStack, ...supportingTools, ...projectTools];

/**
 * A project's stack in the Skills page's own names, in the order the project
 * lists it — so a card's tags and the Skills page always agree. Tags no skill
 * covers stay on the project page's full stack list.
 */
export function skillNamesFor(project: Project, limit: number): string[] {
  const names: string[] = [];
  for (const tag of project.tags) {
    for (const group of skillGroups) {
      for (const tool of group.tools) {
        if (!tool.capability && tool.uses.includes(tag) && !names.includes(tool.name)) {
          names.push(tool.name);
        }
      }
    }
  }
  return names.slice(0, limit);
}
