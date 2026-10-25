/**
 * Imports the project showcase library into the site.
 *
 *   node scripts/import-showcase.mjs [path-to-showcase-library]
 *   node scripts/import-showcase.mjs <path-to-one-project-folder>
 *
 * Given a whole library, every project is re-imported and public/projects/ is
 * rebuilt from scratch. Given a single project folder (one that holds a
 * project.json itself), only that project is refreshed: its media folder is
 * replaced and its entry in projects.json is swapped in place.
 *
 * For every project folder that has a project.json, this:
 *   - copies media/website (poster, preview, walkthrough, gallery) and the
 *     feature clips into public/projects/<slug>/
 *   - grabs a poster frame for each feature clip (needs ffmpeg on PATH)
 *   - writes the cleaned copy to src/data/projects.json
 *
 * The library is the source of truth: re-run this after it changes. Copy that
 * is still a placeholder ("[NEEDS CONFIRMATION]") is dropped, and nothing that
 * points at a code repository is carried over. The order of projects and the
 * hand-drawn architecture diagrams live in src/data/projects.ts.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const library = path.resolve(
  process.argv[2] ?? "D:/InitCore006/showcase-library",
);
const publicDir = path.join(root, "public", "projects");
const dataFile = path.join(root, "src", "data", "projects.json");

const PLACEHOLDER = /\[NEEDS CONFIRMATION[^\]]*\]/g;
const isPlaceholder = (text) =>
  typeof text !== "string" || /^\s*\[NEEDS CONFIRMATION/.test(text);

/** Strip trailing placeholder notes and repo links; undefined when nothing is left. */
function clean(text) {
  if (typeof text !== "string" || isPlaceholder(text)) return undefined;
  const out = text
    .replace(PLACEHOLDER, "")
    .replace(/\s+([.,;:])(?=\s|$)/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!out || /github\.com/i.test(out)) return undefined;
  return firstPerson(out);
}

/** The library is written as the studio; the portfolio speaks as me. */
const firstPerson = (text) =>
  text
    .replace(/\bInitCore built\b/g, "I built")
    .replace(/\bWe built\b/g, "I built")
    .replace(/\bInitCore turned\b/g, "I turned");

const cleanList = (items = []) => items.map(clean).filter(Boolean);

const KIND = {
  "web-app": "Web application",
  "desktop-app": "Desktop app",
  website: "Website",
};

/** Library tags mix technologies with topics; keep the technologies, spelled properly. */
const TAG_NAMES = {
  nextjs: "Next.js",
  "static-export": "Static export",
  cloudflare: "Cloudflare",
};
const TOPIC_TAGS = new Set([
  "crm",
  "call centre",
  "invoicing",
  "seo",
  "i18n",
  "gdpr",
  "static site",
  "static export",
  "static generation",
  "consent management",
  "server-rendered templates",
  "windows desktop",
  "pdf generation",
  "whatsapp",
  "whatsapp deep links",
]);
const cleanTags = (tags = []) =>
  tags
    .map((tag) => TAG_NAMES[tag] ?? tag)
    .filter((tag) => !TOPIC_TAGS.has(tag.toLowerCase()));

function findProjects(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    const folder = path.join(dir, entry.name);
    if (fs.existsSync(path.join(folder, "project.json"))) found.push(folder);
    else found.push(...findProjects(folder));
  }
  return found;
}

function copy(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

let ffmpeg = true;
function runFfmpeg(args) {
  if (!ffmpeg) return false;
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], {
      stdio: "pipe",
    });
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      ffmpeg = false;
      console.warn("  ffmpeg not found — clips get no poster, videos stay as they are");
    }
    return false;
  }
}

/** A still from 1.5 s in, at most 1280 px on its long side (phone clips stay upright). */
const grabFrame = (video, image) =>
  runFfmpeg([
    "-ss", "1.5", "-i", video, "-frames:v", "1",
    "-vf", "scale=1280:1280:force_original_aspect_ratio=decrease:force_divisible_by=2",
    "-q:v", "4", image,
  ]);

/**
 * Walkthroughs are streamed from the site's own hosting, so they are kept near
 * the size of the others (~12 MB). Anything over the budget is re-encoded at
 * the same resolution with a capped bitrate; captions are burned in, so the
 * resolution is left alone.
 */
const WALKTHROUGH_BUDGET = 20 * 1024 * 1024;
function fitWalkthrough(file) {
  if (fs.statSync(file).size <= WALKTHROUGH_BUDGET) return;
  const tmp = `${file}.tmp.mp4`;
  const ok = runFfmpeg([
    "-i", file, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "28",
    "-maxrate", "650k", "-bufsize", "1300k", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", tmp,
  ]);
  if (ok) fs.renameSync(tmp, file);
  else fs.rmSync(tmp, { force: true });
}

function importProject(folder) {
  const json = JSON.parse(
    fs.readFileSync(path.join(folder, "project.json"), "utf8"),
  );
  const { slug } = json;
  const out = path.join(publicDir, slug);
  const url = (rel) => `/projects/${slug}/${rel}`;

  // Website media keeps its layout: [media/]website/x -> /projects/<slug>/x
  const site = (rel) => {
    if (!rel) return undefined;
    const from = path.join(folder, rel);
    if (!fs.existsSync(from)) return undefined;
    const target = rel.replace(/^(media\/)?website\//, "");
    copy(from, path.join(out, target));
    return url(target);
  };

  const gallery = (json.gallery ?? [])
    .map((item) => ({
      type: "image",
      src: site(item.src),
      alt: clean(item.alt),
      caption: clean(item.caption),
    }))
    .filter((item) => item.src);

  // Feature clips go to features/; a still screenshot is left out (the
  // gallery already shows the screens).
  const features = (json.features ?? [])
    .map((feature) => {
      const result = {
        title: clean(feature.title),
        benefit: clean(feature.benefit),
      };
      const media = feature.media ?? "";
      const from = path.join(folder, media);
      if (media.endsWith(".mp4") && fs.existsSync(from)) {
        const name = path.basename(media);
        copy(from, path.join(out, "features", name));
        result.video = url(`features/${name}`);
        const still = name.replace(/\.mp4$/, ".jpg");
        if (grabFrame(from, path.join(out, "features", still))) {
          result.poster = url(`features/${still}`);
        }
      }
      return result;
    })
    .filter((feature) => feature.title && feature.benefit);

  const walkthrough = json.video?.src ? site(json.video.src) : undefined;
  if (walkthrough) fitWalkthrough(path.join(out, walkthrough.replace(`/projects/${slug}/`, "")));

  const year = /^\d{4}$/.test(json.year ?? "") ? json.year : undefined;
  const liveUrl = clean(json.liveUrl);
  const description = Array.isArray(json.description)
    ? cleanList(json.description)
    : cleanList(String(json.description).split(/\n\n+/));

  return {
    slug,
    name: clean(json.name),
    kind: KIND[json.type] ?? "Project",
    headline: clean(json.headline),
    summary: clean(json.summary),
    description,
    challenge: clean(json.challenge),
    solution: clean(json.solution),
    highlights: cleanList(json.highlights),
    features,
    audience: cleanList(json.audience),
    tags: cleanTags(json.tags),
    industry: clean(json.industry),
    platform: clean(json.platform),
    role: clean(json.role),
    year,
    liveUrl: liveUrl && /^https?:\/\//.test(liveUrl) ? liveUrl : undefined,
    poster: site(json.poster),
    previewVideo: site(json.previewVideo),
    video: json.video?.src
      ? {
          src: walkthrough,
          poster: site(json.video.poster ?? json.poster),
          duration: json.video.duration,
        }
      : undefined,
    gallery,
  };
}

if (!fs.existsSync(library)) {
  console.error(`Showcase library not found: ${library}`);
  process.exit(1);
}

const report = (project) =>
  console.log(
    `  ${project.slug.padEnd(22)} ${project.gallery.length} screenshots · ${
      project.features.filter((f) => f.video).length
    } clips`,
  );

let projects;
if (fs.existsSync(path.join(library, "project.json"))) {
  // One project: refresh its folder and its entry, leave the rest alone.
  const { slug } = JSON.parse(
    fs.readFileSync(path.join(library, "project.json"), "utf8"),
  );
  fs.rmSync(path.join(publicDir, slug), { recursive: true, force: true });
  const project = importProject(library);
  report(project);
  const existing = fs.existsSync(dataFile)
    ? JSON.parse(fs.readFileSync(dataFile, "utf8"))
    : [];
  projects = [...existing.filter((item) => item.slug !== slug), project];
} else {
  fs.rmSync(publicDir, { recursive: true, force: true });
  projects = findProjects(library).map((folder) => {
    const project = importProject(folder);
    report(project);
    return project;
  });
}

projects.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(dataFile, `${JSON.stringify(projects, null, 2)}
`);
console.log(`
${projects.length} projects → ${path.relative(root, dataFile)}`);
