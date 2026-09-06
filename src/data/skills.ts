/**
 * The stack, ordered the way a request travels through it.
 *
 * Grouping by layer rather than by "frontend / backend / other" is the point:
 * it says where each tool sits in a running system, which is the thing a
 * backend role is actually asking about.
 */

export type Tool = { name: string; icon: string };

export type Layer = {
  id: string;
  name: string;
  /** What the layer is for, in the request's own terms. */
  role: string;
  tools: Tool[];
};

export const layers: Layer[] = [
  {
    id: "interface",
    name: "Interface",
    role: "Where the request starts",
    tools: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Tailwind", icon: "/icons/tailwindcss.svg" },
      { name: "Vite", icon: "/icons/vite.svg" },
      { name: "Tauri", icon: "/icons/tauri.svg" },
    ],
  },
  {
    id: "edge",
    name: "Edge & Delivery",
    role: "Hosting, containers, CI",
    tools: [
      { name: "Azure", icon: "/icons/azure.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "GitHub Actions", icon: "/icons/cicd.svg" },
      { name: "DigitalOcean", icon: "/icons/DigitalOcean.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "Render", icon: "/icons/render.svg" },
    ],
  },
  {
    id: "application",
    name: "Application",
    role: "Where the work happens",
    tools: [
      { name: "Django", icon: "/icons/django.svg" },
      { name: "DRF", icon: "/icons/api.svg" },
      { name: "Channels", icon: "/icons/websocket.svg" },
      { name: "FastAPI", icon: "/icons/FastAPI.svg" },
      { name: "Flask", icon: "/icons/flask.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
    ],
  },
  {
    id: "data",
    name: "Data Store",
    role: "Schema, queries, search",
    tools: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "SQLite", icon: "/icons/sqlite.svg" },
      { name: "DuckDB", icon: "/icons/duckdb.svg" },
      { name: "Elasticsearch", icon: "/icons/elasticsearch.svg" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    role: "What the data becomes",
    tools: [
      { name: "Pandas", icon: "/icons/Pandas.svg" },
      { name: "NumPy", icon: "/icons/NumPy.svg" },
      { name: "scikit-learn", icon: "/icons/scikitlearn.svg" },
      { name: "XGBoost", icon: "/icons/xgboost.svg" },
      { name: "Prophet", icon: "/icons/prophet.svg" },
      { name: "Power BI", icon: "/icons/powerbi.svg" },
    ],
  },
];

/** Languages cut across every layer, so they get a band rather than a column. */
export const runtimeLanguages: Tool[] = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "SQL", icon: "/icons/sql.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
];

/**
 * Absent from the stack above, and named rather than hidden.
 *
 * These are not claims about ability — they are the honest complement of the
 * list: things that have not been shipped to production here, so the reference
 * does not imply them. Stating them costs nothing and is the difference
 * between a stack list and a sales page.
 */
export const notInTheStack: string[] = [
  "Kubernetes",
  "Kafka",
  "Terraform",
  "AWS",
  "Google Cloud",
  "Go",
  "Java",
  "Native iOS / Android",
];
