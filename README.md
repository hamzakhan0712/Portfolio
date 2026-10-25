# Hamza Khan — Portfolio

The personal site of Hamza Khan, full-stack software engineer, Mumbai. Live at
[www.hamza.social](https://www.hamza.social/).

A portfolio in the Windows 11 visual language (Fluent): Mica backdrop, acrylic
navigation, Segoe UI Variable, and light and dark themes that follow the system
setting or the visitor's choice, with Windows' light blue as the one accent.
Projects (with screenshots and recorded walkthroughs), education, skills and
how to get in touch.

## Pages

| Page | Route | What it shows |
| --- | --- | --- |
| Home | `/` | Introduction beside a window running the featured projects (switch them from the taskbar), headline numbers, featured projects, what I work on |
| Projects | `/projects` | All projects, filterable by kind (`?kind=Website`) |
| Project | `/projects/:slug` | Walkthrough, overview, problem and solution, key features, feature clips, screenshots, tech stack, architecture |
| About | `/about` | Short bio and quick facts |
| Education | `/education` | Education, newest first |
| Skills | `/skills` | Core stack ranked by use, every tool by area with the projects that use it, search and filter |
| Awards | `/recognition` | Competitions and certifications, with certificate scans and verify links |
| Contact | `/contact` | Message form (EmailJS), direct details, downloadable contact card |

Old addresses from previous versions (`/experience`, `/services`, `/solutions`, `/profile`,
`/authentication`, `/errors`) redirect to their new homes.

## Editing content

Projects come from the showcase library (`D:/InitCore006/showcase-library`).
After the library changes, re-import:

```bash
npm run import:projects            # or: node scripts/import-showcase.mjs <library-path>
node scripts/import-showcase.mjs <one-project-folder>   # refresh a single project
```

Given a folder that holds a `project.json` itself, only that project's media and
entry are replaced. Walkthroughs over 20 MB are re-encoded (same resolution,
capped bitrate) so they stay close to the others; this and the clip posters
need `ffmpeg` on PATH.

This copies each project's poster, preview, walkthrough, screenshots and
feature clips into `public/projects/<slug>/` and writes the copy to
`src/data/projects.json`. Placeholder copy (`[NEEDS CONFIRMATION]`) is dropped.
Don't edit `projects.json` by hand; the order of projects and the architecture
diagrams live in `src/data/projects.ts`.

Everything else lives in `src/data/`:

- `experience.ts` — education
- `skills.ts` — the tools, by area. Each tool names the project tags that
  count as using it; the projects (and the ranked "core stack") are worked out
  from `projects.json`, and `npm run smoke` fails if a tool has no project
  behind it. Logos not in `public/icons` come from Simple Icons via
  `node scripts/brand-icons.mjs <simple-icons package>`
- `recognition.ts` — awards and certifications
- `site.ts` — name, role, contact details, headline numbers, navigation, strengths

Certificate scans go in `public/credentials/`. Regenerate the social preview
card with `python scripts/og-image.py` after changing a headline figure.

## Development

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
npm run preview    # serve the build
npm run lint
npm run smoke      # renders every route server-side and fails on any error
```

Contact-form delivery needs three EmailJS values in `.env` (see
`.env.example`). Without them the form reports an error and points the visitor
to the email address instead.

## Design

The tokens live in `src/index.css` (colours, per theme) and `tailwind.config.ts`
(type faces, the 4 px / 8 px radii, Fluent shadows). Shared pieces — Settings
cards, the Pivot, the breadcrumb — are in `src/components/primitives.tsx`; the
window and taskbar are `src/components/app-window.tsx`. The theme is set before
first paint by a small script in `index.html`, then managed by next-themes.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion (selection
pills, menus and the lightbox), next-themes, react-hook-form + zod, EmailJS. Deployed on Vercel
(`vercel.json` holds the SPA rewrite and cache headers).

## License

MIT — see `LICENSE`. The photographs, screenshots, videos and written content
are Hamza Khan's and are not covered by the licence.
