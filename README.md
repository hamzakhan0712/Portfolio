# Hamza Khan — Portfolio

The personal site of Hamza Khan, software engineer, Mumbai. Live at
[portfolio-vert-six-26.vercel.app](https://portfolio-vert-six-26.vercel.app/).

A clean, dark-themed site written so that a non-technical visitor can follow it:
what can be built for a business, what has already been built (with screenshots
and recorded walkthroughs of the real software), and who is behind it.

## Pages

| Page | Route | What it shows |
| --- | --- | --- |
| Home | `/` | Introduction, headline numbers, services, selected work, how an engagement runs |
| Services | `/services` | Four ready-made systems, each with what is included and the running project behind it |
| Work | `/projects` | All projects, grouped into own products and client work |
| Project | `/projects/:slug` | Walkthrough video, plain-English description, highlights, screenshots, technology, architecture |
| About | `/about` | Short bio, quick facts, and an honest list of gaps |
| Experience | `/experience` | Work history and education, newest first |
| Skills | `/skills` | Tools grouped by the stage of a running system they belong to |
| Awards | `/recognition` | Competitions and certifications, with certificate scans and verify links |
| Contact | `/contact` | Message form (EmailJS), direct details, downloadable contact card |

Old addresses from the previous version (`/profile`, `/solutions`,
`/authentication`, `/errors`) redirect to their new homes.

## Editing content

All copy lives in `src/data/` — the pages only render it:

- `projects.ts` — every project: description, highlights, screenshots, video, tags, architecture
- `solutions.ts` — the four services, each pointing at the projects that prove it
- `experience.ts` — work history and education
- `skills.ts` — the tool list, by layer, plus what is deliberately absent
- `recognition.ts` — awards and certifications
- `site.ts` — name, role, contact details, headline numbers, navigation, engagement steps

Every figure on the site must trace back to a document; nothing is written for
effect. No project links to source code — the client systems are commercial and
the products are unreleased — so each page shows the software itself instead.

Media goes in `public/projects/<slug>/` (`poster.jpg`, `preview.mp4`,
`walkthrough.mp4`, `gallery/*.jpg`) and certificate scans in
`public/credentials/`. Regenerate the social preview card with
`python scripts/og-image.py` after changing a headline figure.

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
