/**
 * The stack, grouped the way most engineering teams describe it.
 */

export type Tool = { name: string; icon: string };

export type Layer = {
  id: string;
  name: string;
  /** One line on what the group covers. */
  role: string;
  tools: Tool[];
};

export const layers: Layer[] = [
  {
    id: "backend",
    name: "Backend",
    role: "APIs, business logic and real-time services",
    tools: [
      { name: "Django", icon: "/icons/django.svg" },
      { name: "DRF", icon: "/icons/api.svg" },
      { name: "Channels", icon: "/icons/websocket.svg" },
      { name: "FastAPI", icon: "/icons/FastAPI.svg" },
      { name: "Flask", icon: "/icons/flask.svg" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & Desktop",
    role: "Interfaces for the web and the desktop",
    tools: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Tailwind", icon: "/icons/tailwindcss.svg" },
      { name: "Vite", icon: "/icons/vite.svg" },
      { name: "Framer Motion", icon: "/icons/framermotion.svg" },
      { name: "Tauri", icon: "/icons/tauri.svg" },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    role: "Schema design, queries and search",
    tools: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "SQLite", icon: "/icons/sqlite.svg" },
      { name: "DuckDB", icon: "/icons/duckdb.svg" },
      { name: "Elasticsearch", icon: "/icons/elasticsearch.svg" },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    role: "Containers, CI and hosting",
    tools: [
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "GitHub Actions", icon: "/icons/cicd.svg" },
      { name: "Azure", icon: "/icons/azure.svg" },
      { name: "DigitalOcean", icon: "/icons/DigitalOcean.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "Render", icon: "/icons/render.svg" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Libraries",
    role: "Everyday tooling",
    tools: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "Pandas", icon: "/icons/Pandas.svg" },
      { name: "NumPy", icon: "/icons/NumPy.svg" },
      { name: "scikit-learn", icon: "/icons/scikitlearn.svg" },
    ],
  },
];

/** Languages are used across every group, so they get their own row. */
export const runtimeLanguages: Tool[] = [
  { name: "Python", icon: "/icons/python.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "SQL", icon: "/icons/sql.svg" },
];
