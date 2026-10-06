# Hamza Khan — Portfolio

The personal site of Hamza Khan, software engineer, Mumbai. Live at
[portfolio-vert-six-26.vercel.app](https://portfolio-vert-six-26.vercel.app/).

A clean, dark-themed portfolio: projects (with screenshots and recorded
walkthroughs), education, skills and how to get in touch.

## Pages

| Page | Route | What it shows |
| --- | --- | --- |
| Home | `/` | Introduction, headline numbers, featured projects, what I work on |
| Projects | `/projects` | All projects |
| Project | `/projects/:slug` | Walkthrough, overview, problem and solution, key features, feature clips, screenshots, tech stack, architecture |
| About | `/about` | Short bio and quick facts |
| Education | `/education` | Education, newest first |
| Skills | `/skills` | Languages, frameworks and tools by category |
| Awards | `/recognition` | Competitions and certifications, with certificate scans and verify links |
| Contact | `/contact` | Message form (EmailJS), direct details, downloadable contact card |

Old addresses from previous versions (`/experience`, `/services`, `/solutions`, `/profile`,
`/authentication`, `/errors`) redirect to their new homes.

## Editing content

Projects come from the showcase library (`D:/InitCore006/showcase-library`).
After the library changes, re-import:

```bash
npm run import:projects            # or: node scripts/import-showcase.mjs <library-path>
```

This copies each project's poster, preview, walkthrough, screenshots and
feature clips into `public/projects/<slug>/` and writes the copy to
`src/data/projects.json`. Placeholder copy (`[NEEDS CONFIRMATION]`) is dropped.
Don't edit `projects.json` by hand; the order of projects and the architecture
diagrams live in `src/data/projects.ts`.

Everything else lives in `src/data/`:

- `experience.ts` — education
- `skills.ts` — the tool list, by category
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

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion (menu and
lightbox only), react-hook-form + zod, EmailJS. Deployed on Vercel
(`vercel.json` holds the SPA rewrite and cache headers).

## License

MIT — see `LICENSE`. The photographs, screenshots, videos and written content
are Hamza Khan's and are not covered by the licence.
