/**
 * Writes the brand logos the Skills page uses into public/icons/brands/.
 *
 *   npm pack simple-icons@15 && tar -xzf simple-icons-*.tgz
 *   node scripts/brand-icons.mjs <path-to-extracted>/package
 *
 * Logos come from Simple Icons (CC0). Each is a single path; it is written
 * filled with the brand's own colour so it reads on the white icon tile in
 * both themes. Only the slugs listed here are copied.
 *
 * Simple Icons leaves out a few Microsoft marks; csharp.svg and
 * playwright.svg come from Devicon (MIT), icons/<name>/<name>-original.svg.
 * Tools with no published logo at all use a glyph instead (see skills.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SLUGS = [
  "dotnet",
  "astro",
  "electron",
  "vitest",
  "cloudflare",
  "cloudflareworkers",
  "stripe",
  "razorpay",
  "whatsapp",
  "meta",
  "ollama",
  "chartdotjs",
  "apacheecharts",
  "leaflet",
  "opentelemetry",
  "shopify",
  "githubactions",
  "googlesheets",
  "nodedotjs",
  "webauthn",
  "openstreetmap",
  "shadcnui",
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = process.argv[2];
if (!pkg || !fs.existsSync(path.join(pkg, "icons"))) {
  console.error("Pass the extracted simple-icons package folder (the one with icons/ in it).");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(path.join(pkg, "data", "simple-icons.json"), "utf8"));
const icons = Array.isArray(data) ? data : data.icons;
const out = path.join(root, "public", "icons", "brands");
fs.mkdirSync(out, { recursive: true });

for (const slug of new Set(SLUGS)) {
  const meta = icons.find((icon) => icon.slug === slug);
  const file = path.join(pkg, "icons", `${slug}.svg`);
  if (!meta || !fs.existsSync(file)) {
    console.warn(`  missing: ${slug}`);
    continue;
  }
  const svg = fs.readFileSync(file, "utf8").replace("<svg ", `<svg fill="#${meta.hex}" `);
  fs.writeFileSync(path.join(out, `${slug}.svg`), svg);
  console.log(`  ${slug.padEnd(20)} #${meta.hex}  ${meta.title}`);
}
