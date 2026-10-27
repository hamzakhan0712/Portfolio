/**
 * Converts the project images in public/projects from JPEG to WebP (about a
 * third of the size at the same look) and points projects.json at them.
 *
 *   node scripts/to-webp.mjs
 *
 * Run it after `npm run import:projects`, which writes JPEGs. Needs ffmpeg on
 * the PATH. Each project's poster.jpg is kept as well: link previews
 * (og:image) still use it, because not every site that unfurls links reads
 * WebP. Safe to run twice — finished images are skipped.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const media = path.join(root, "public", "projects");
const dataFile = path.join(root, "src", "data", "projects.json");

const jpegs = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".jpg")) jpegs.push(full);
  }
};
walk(media);

let before = 0;
let after = 0;
for (const jpg of jpegs) {
  const webp = jpg.replace(/\.jpg$/, ".webp");
  if (!fs.existsSync(webp)) {
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", jpg, "-c:v", "libwebp", "-quality", "80", webp]);
  }
  before += fs.statSync(jpg).size;
  after += fs.statSync(webp).size;
  if (path.basename(jpg) !== "poster.jpg") fs.rmSync(jpg);
}

const json = fs.readFileSync(dataFile, "utf8").replace(/(\/projects\/[^"]+)\.jpg"/g, '$1.webp"');
fs.writeFileSync(dataFile, json);

const mb = (bytes) => `${(bytes / 1e6).toFixed(1)} MB`;
console.log(`${jpegs.length} images: ${mb(before)} as JPEG, ${mb(after)} as WebP`);
