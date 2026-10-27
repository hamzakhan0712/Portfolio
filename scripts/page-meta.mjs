/**
 * Runs after `vite build`. The site is a single-page app, so every URL is
 * served the same index.html — and a link pasted into LinkedIn or WhatsApp
 * showed the home page's title and picture whatever it pointed at. This
 * writes dist/<route>/index.html for each page with that page's own title,
 * description, canonical URL and preview image; Vercel serves those files
 * before falling back to the app's rewrite.
 *
 * It also checks the Content-Security-Policy in vercel.json still allows the
 * inline theme script, by hash — edit that script and the build fails here
 * with the new hash to paste in, instead of the theme silently breaking.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.hamza.social";
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

/* ── CSP check ─────────────────────────────────────────────────────────── */
const vercel = fs.readFileSync(path.join(root, "vercel.json"), "utf8");
for (const [, body] of template.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  const hash = `sha256-${crypto.createHash("sha256").update(body).digest("base64")}`;
  if (!vercel.includes(hash)) {
    console.error(`vercel.json CSP is missing the inline script hash '${hash}'.`);
    process.exit(1);
  }
}

/* ── Pages ─────────────────────────────────────────────────────────────── */
const data = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "projects.json"), "utf8"));
const projects = Array.isArray(data) ? data : data.projects;
const sentence = (text) => text?.trim().replace(/([^.!?])$/, "$1.");

const pages = [
  { route: "/projects", title: "Projects", description: `${projects.length} web apps, websites and desktop apps, each with a video walkthrough, short clips and screenshots.` },
  { route: "/skills", title: "Skills", description: "Every technology I use, each one linked to the projects it was used in." },
  { route: "/about", title: "About", description: "Who I am, how I work across the stack, and the role I'm looking for." },
  { route: "/education", title: "Education", description: "A B.E. in Computer Science & Engineering from the University of Mumbai, after a Diploma in Computer Engineering." },
  { route: "/recognition", title: "Recognition", description: "Hackathons, competitions and certificates, with links to verify them." },
  { route: "/contact", title: "Contact", description: "Send a message about a role or a project. I usually reply within a day." },
  ...projects.map((project) => ({
    route: `/projects/${project.slug}`,
    title: project.name,
    description: sentence(project.headline) ?? project.summary,
    // Link previews use the JPEG poster: not every unfurler reads WebP.
    image: project.poster?.replace(/\.webp$/, ".jpg"),
  })),
];

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
    `$1${escape(value)}$2`,
  );

for (const page of pages) {
  const title = `${page.title} · Hamza Khan`;
  const url = `${SITE}${page.route}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  for (const [attr, key, value] of [
    ["name", "description", page.description],
    ["property", "og:title", title],
    ["property", "og:description", page.description],
    ["property", "og:url", url],
    ["name", "twitter:title", title],
    ["name", "twitter:description", page.description],
  ]) {
    html = setMeta(html, attr, key, value);
  }
  if (page.image) {
    const image = `${SITE}${page.image}`;
    html = setMeta(html, "property", "og:image", image);
    html = setMeta(html, "name", "twitter:image", image);
    html = setMeta(html, "property", "og:image:alt", `${page.title} screenshot`);
    // The poster isn't the 1200×630 card, so don't claim its size or type.
    html = html.replace(/\s*<meta property="og:image:(width|height|type)"[^>]*>/g, "");
  }
  const out = path.join(dist, page.route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
console.log(`page-meta: wrote ${pages.length} pages`);
