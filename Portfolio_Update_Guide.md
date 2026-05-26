# Hamza Khan — Portfolio Website End-to-End Update Guide
### portfolio-vert-six-26.vercel.app · React/Next.js custom build

---

## How to use this document

Your portfolio is a custom-coded site (React/Next.js, deployed on Vercel). This guide gives you the exact copy, structure, and section-by-section content to update. You'll be editing source files in your repo (likely `app/` or `pages/` and `components/`), then redeploying via git push.

Work top to bottom. Don't skip the metadata section — search engines and LinkedIn previews depend on it.

If you want, share your portfolio's GitHub repo link at the end and I'll review the actual file structure to pinpoint where each block goes.

---

## STEP 0 — Metadata fixes (browser tab, social previews, SEO)

Find your `app/layout.tsx` (Next.js 13+) or `pages/_document.tsx` or `<Head>` block. Replace metadata with these exact values:

```tsx
export const metadata = {
  title: "Hamza Khan — Backend Developer | Python · Django · PostgreSQL · AWS",
  description: "Backend developer with 4 years of freelance project experience building Django web applications, REST APIs, and real-time WebSocket services. B.E. CSE (Data Science). SIH 2025 Grand Finalist.",
  keywords: ["Backend Developer", "Python", "Django", "PostgreSQL", "AWS", "REST API", "WebSockets", "Hamza Khan", "Mumbai Developer"],
  authors: [{ name: "Hamza Khan", url: "https://github.com/hamzakhan0712" }],
  openGraph: {
    title: "Hamza Khan — Backend Developer",
    description: "Backend developer with 4 years of freelance experience. Python · Django · PostgreSQL · AWS.",
    url: "https://portfolio-vert-six-26.vercel.app/",
    siteName: "Hamza Khan — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hamza Khan — Backend Developer"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Khan — Backend Developer",
    description: "Backend developer · Python · Django · PostgreSQL · AWS.",
    images: ["/og-image.png"]
  },
  robots: { index: true, follow: true }
};
```

**Action items:**
1. Generate a proper OG image at 1200×630 (don't use the favicon — currently `meta-og:image: /favicon.png`, which makes LinkedIn previews look broken). Use Canva, Figma, or the same banner design from your LinkedIn banner. Save as `public/og-image.png`.
2. Add a `<link rel="canonical" href="https://portfolio-vert-six-26.vercel.app/" />` if not already present.
3. Get a real domain. `portfolio-vert-six-26.vercel.app` reads as a temporary URL. Buy `hamzakhan.dev` (Namecheap ~₹1,500/year) or `hamzakhan.in` and point it at the Vercel project. This single change adds more recruiter credibility than any content edit.

---

## STEP 1 — Hero section (above the fold)

This is the first thing recruiters see — 80% of bounce decisions happen here in under 5 seconds.

### Current state (from your LinkedIn Featured screenshot):
> "Backend Developer | Python · Django · REST APIs"
> "Full Stack Developer Transitioning to Data Science"
> Stats: "3+ years", "10+ projects", "80%" (something)

### Issues to fix:
1. "Full Stack Developer Transitioning to Data Science" — contradicts the locked identity (Backend, not Full Stack; transitioning to **Data Engineering**, not Data Science). Delete.
2. "3+ years" — you have 4 years (since 2021). Update.
3. "10+ projects" — unverifiable count; you have 6 main ones. Soften.
4. "80%" — what is this percentage of? If it's not crystal clear, drop it. Random stats hurt credibility.

### Replacement hero copy:

**Top heading (h1):**
```
Hamza Khan
```

**Subheading (large, just under h1):**
```
Backend Developer · Python · Django · PostgreSQL · AWS
```

**Tagline (one short paragraph):**
```
I build backend systems that run in production. Four years of freelance project experience writing Django web applications, REST APIs, and real-time WebSocket services backed by PostgreSQL, for clients in India and Germany.
```

**Secondary line (lighter weight):**
```
Currently completing B.E. CSE (Data Science) at the University of Mumbai. Smart India Hackathon 2025 Grand Finalist.
```

**Stats row (replace existing — only use verifiable numbers):**
```
[ 4 ]                [ 6 ]                  [ SIH 2025 ]
years of            production              Grand Finalist
freelance projects  projects shipped        from 50,000+ teams
```

**Primary CTA buttons (2 buttons side-by-side):**
- Button 1: `View Projects` → scrolls to Projects section (or `#projects`)
- Button 2: `Get in Touch` → scrolls to Contact (or `mailto:hamza81khan81@gmail.com`)

**Secondary links row (under buttons, small icons + labels):**
- GitHub → `https://github.com/hamzakhan0712`
- LinkedIn → `https://www.linkedin.com/in/hamza-khan-3a2b0024a/` (update once you change vanity URL)
- Email → `mailto:hamza81khan81@gmail.com`
- Resume → link to your hosted Resume PDF (host it at `/resume.pdf` in the `public` folder)

---

## STEP 2 — About section

### Heading:
```
About
```

### Body (paste as-is, line breaks preserved):
```
Backend developer with 4 years of freelance project experience building Django-based web applications, REST APIs, and real-time WebSocket services backed by PostgreSQL.

I started freelancing in 2021 while studying. Most projects were for clients who needed working systems they could actually use — which meant dealing with real constraints: deployment on shared servers, handling user traffic, debugging in production, and maintaining code other people depend on.

That experience shaped how I approach backend work — pragmatic, deployment-aware, and focused on what actually ships.

Currently completing a B.E. in Computer Science and Engineering (Data Science) at the University of Mumbai (graduating July 2026), and building toward a career in Data Engineering.
```

### Optional sidebar / mini-card next to the text:
```
Quick facts
─────────────
Location: Mumbai, India
Education: B.E. CSE (Data Science), Mumbai University
Available: Remote, Mumbai, Navi Mumbai, Thane
Languages: English (professional), Hindi, Marathi, Urdu
Currently: Open to backend developer roles
```

---

## STEP 3 — Skills / Tech Stack section

### Heading:
```
What I Work With
```

### Structure — display as 5 grouped columns or grouped tag clouds:

**Group 1: Languages**
- Python
- SQL
- JavaScript

**Group 2: Backend**
- Django
- Django REST Framework
- Flask
- Django Channels (WebSockets)
- FastAPI (basic)

**Group 3: Databases**
- PostgreSQL
- MySQL
- SQLite

**Group 4: Cloud & DevOps**
- AWS (EC2, S3, RDS)
- Docker
- Git
- GitHub Actions (basic)
- DigitalOcean
- Vercel
- Render
- Hostinger

**Group 5: Frontend (supporting role)**
- React
- Next.js
- Vite
- Tailwind CSS
- Shadcn UI

**Group 6: Tools**
- Postman
- Linux & Bash
- REST APIs
- VS Code

**Optional footer line (small, italic):**
```
Academic exposure (no production use): Pandas, NumPy, Matplotlib, TensorFlow, Elasticsearch, Apache Spark, Hadoop
```

**Design note:** if your current portfolio shows skills as icon-grid or tag pills, keep that format. Avoid showing percentage bars (e.g., "Python 90%, Django 85%") — these are unverifiable and read as junior-style portfolios. Group + list is more senior.

---

## STEP 4 — Projects section (the most important section)

### Heading:
```
Featured Projects
```

### Sub-heading (small, optional):
```
Production systems built for paying clients and selected personal work.
```

### Layout: 2-column or 3-column card grid; clicking a card opens a project detail page or modal.

Each card needs: title, one-line summary, tech tags, links (Live / GitHub), thumbnail image.

### Card 1: InitCore CRM — Call Center Platform

**Thumbnail:** screenshot of the CRM dashboard (real screenshot, not a stock mockup).

**Title:**
```
InitCore CRM — Call Center Platform
```

**Summary (one line):**
```
Multi-role CRM with real-time agent monitoring for call center operations.
```

**Full description (for detail page):**
```
A multi-role CRM built with Django and PostgreSQL for call center operations. Three permission levels — agents, supervisors, and administrators — each with their own dashboards and workflows.

Modules include lead management, call logging, payment tracking, attendance, and PDF invoice generation. Real-time agent monitoring is built with Django Channels and WebSockets, so supervisors see live status updates without refreshing.

This was the project where I went deepest on Django's WebSocket layer, async consumers, and PostgreSQL schema design for multi-role systems.
```

**Tech tags:** `Python` `Django` `Django Channels` `PostgreSQL` `WebSockets` `ReportLab`

**Links:**
- GitHub: `https://github.com/hamzakhan0712/InitCore-CRM-CallCenter`

---

### Card 2: Key2YourHome — Real Estate Marketplace

**Thumbnail:** screenshot of the live listing page.

**Title:**
```
Key2YourHome — Real Estate Marketplace
```

**Summary:**
```
Live property listing platform with OAuth authentication and admin tooling.
```

**Full description:**
```
Live property listing platform built with Django 5.2 and PostgreSQL, deployed to a custom domain. Features OAuth-based authentication, a Grappelli-powered admin interface for managing listings, property search and filtering, and a Tailwind CSS frontend.

The site has been running in production since I shipped it. It's the project that most shaped how I think about admin tooling — building interfaces that non-developers actually use day-to-day.
```

**Tech tags:** `Python` `Django 5.2` `PostgreSQL` `Tailwind CSS` `OAuth` `Grappelli`

**Links:**
- Live: `https://www.key2yourhome.co.in`

---

### Card 3: SK Trading Co. — Corporate Website

**Thumbnail:** live site screenshot.

**Title:**
```
SK Trading Co. — Corporate Website
```

**Summary:**
```
Next.js 15 corporate site for an import/export business with form automation.
```

**Full description:**
```
Corporate website for an import and export business. Built with Next.js 15 and Tailwind CSS, with smooth Framer Motion transitions across pages.

The form layer is the interesting part: reCAPTCHA-protected contact forms feed into Google Sheets via the Sheets API for the client's internal tracking, and Nodemailer handles automated email replies. The client gets a clean inbox of inquiries plus a spreadsheet they can sort and filter, without any third-party CRM.
```

**Tech tags:** `Next.js 15` `Tailwind CSS` `Framer Motion` `Nodemailer` `Google Sheets API`

**Links:**
- Live: `https://www.sktradings.in`
- GitHub: `https://github.com/hamzakhan0712/SKTrading-Website`

---

### Card 4: FlaskSearch — REST Search API

**Thumbnail:** terminal/architecture diagram or API response screenshot.

**Title:**
```
FlaskSearch — REST Search API
```

**Summary:**
```
Containerized Flask + Elasticsearch microservice for full-text search.
```

**Full description:**
```
A Flask and Elasticsearch microservice that exposes full-text search over the complete Shakespeare plays corpus. Supports filtering, pagination, and query parameters via clean REST endpoints.

The whole service is containerized with Docker — single command to spin up the API and the Elasticsearch node together. Built as a learning project to understand search engine indexing and the trade-offs of running ES on small footprints.
```

**Tech tags:** `Python` `Flask` `Elasticsearch` `Docker` `REST API`

**Links:**
- GitHub: `https://github.com/hamzakhan0712/FlaskSearch-API`

---

### Card 5: NOVEM — Data Science Workspace

*(Only include if you finish the NOVEM GitHub README. Otherwise skip.)*

**Title:**
```
NOVEM — Data Science Workspace (Personal Project)
```

**Summary:**
```
Personal exploration of a local-first data science workspace.
```

**Full description:**
```
A personal project exploring an end-to-end data science workspace that combines local-first computation with selective cloud collaboration. The focus areas are reproducibility, privacy, and offline-first workflows for data work.

Built primarily in TypeScript with Python components. Work in progress.
```

**Tech tags:** `TypeScript` `Python`

**Links:**
- GitHub: `https://github.com/hamzakhan0712/NOVEM-Collaborative-Data-Science-Platform`

---

### Card 6: FaceTrack — Android Attendance Application

**Thumbnail:** Android screenshot or face-recognition flow diagram.

**Title:**
```
FaceTrack — Android Attendance Application
```

**Summary:**
```
Kotlin Android app with on-device face recognition syncing to a Django backend.
```

**Full description:**
```
An Android attendance app that uses a facial recognition model to identify students. Built with Kotlin on Android, with a Python ML model for face matching. Attendance records sync from the device to a Django backend over REST.

The project pushed me into ML inference on mobile, model size constraints, and offline-first sync patterns — Android phones in institutional settings often have spotty network.
```

**Tech tags:** `Kotlin` `Android Studio` `Python` `TensorFlow` `Django`

**Links:**
- GitHub: `https://github.com/hamzakhan0712/FaceTrack-Attendance`

---

### Card 7 (optional): QSync — Real-Time Queue Management

**Title:**
```
QSync — Real-Time Queue Management (Team Project)
```

**Summary:**
```
React 19 SPA for queue management with WebSocket-based live sync.
```

**Full description:**
```
A team project: a real-time queue management SPA for multi-terminal environments. I built the React frontend — React 19 with Vite, React Query for server state, Zustand for client state, and Shadcn UI components — with WebSocket-based live synchronization.

The Spring Boot backend was developed by a teammate; this was the first project where I stepped fully into a frontend lead role and let someone else own the backend.
```

**Tech tags:** `React 19` `Vite` `WebSocket` `React Query` `Zustand` `Shadcn UI`

---

### Project section UX notes:

- Add filter chips above the grid: `All` · `Backend` · `Full-Stack` · `Mobile` · `Personal`. Recruiters scanning for backend-only work appreciate this.
- Each card should have visible tech tags so people don't have to click in to see the stack.
- Use real screenshots, not Dribbble-style mockup frames.
- Don't use the words "enterprise-grade," "scalable," "high-performance," "production-ready" — they're filler that experienced recruiters skip past.

---

## STEP 5 — Experience section (timeline format)

### Heading:
```
Experience
```

### Entry 1:

**Role:**
```
Freelance Full-Stack Developer
```

**Company:**
```
Brandenbed Living Spaces UG · Berlin, Germany (Remote)
```

**Period:**
```
Sep 2025 – Nov 2025
```

**Description (3 bullets):**
```
• Built the company's production website for serviced apartment operations across European markets. Achieved a Google PageSpeed Insights score of 95+ on desktop.
• Developed an internal CRM with role-based access for property management and client communication workflows.
• Worked remotely with the founding team and iterated on features over the engagement.
```

**Tech:**
```
Django · PostgreSQL · Next.js · Tailwind CSS · Docker · AWS
```

---

### Entry 2:

**Role:**
```
Freelance Backend Developer
```

**Company:**
```
Self-Employed · Mumbai, India (Remote)
```

**Period:**
```
Jan 2021 – Aug 2025
```

**Description:**
```
• Delivered Django-based web applications and REST APIs for clients in India and abroad, working solo across the full project lifecycle: requirements, development, deployment, and maintenance.
• Built role-based access systems, real-time WebSocket features using Django Channels, and PostgreSQL-backed CRMs and e-commerce platforms.
• Deployed and maintained applications on AWS EC2, DigitalOcean, Render, and Hostinger using Docker.
• Industries served: real estate, call center operations, retail and e-commerce, import/export.
```

**Tech:**
```
Python · Django · DRF · Django Channels · PostgreSQL · AWS · Docker
```

---

## STEP 6 — Achievements section

### Heading:
```
Recognition
```

### Two cards:

**Card 1:**
```
Smart India Hackathon 2025 — Grand Finalist
Sep 2025 · Team Leader · BPUT, Rourkela

Selected from over 50,000 participating teams nationwide. Led a team in a 36-hour development sprint under the Software Edition of India's national-level innovation challenge organized by the Ministry of Education.
```

**Card 2:**
```
SCOE Avishkar 2024 — 2nd Place
Apr 2024 · Team Leader

Led a team to second position in a university-level engineering project competition at Saraswati College of Engineering, University of Mumbai.
```

---

## STEP 7 — Education section

### Heading:
```
Education
```

### Entry 1:

```
Bachelor of Engineering — Computer Science and Engineering (Data Science)
Saraswati College of Engineering, Kharghar (University of Mumbai)
Sep 2023 – Jul 2026 (in progress)
Expected CGPA: 8.5 / 10
```

**Optional coursework chip row:**
```
Relevant coursework: Data Warehousing & Mining · Big Data Analytics · Machine Learning · Statistics for AI & DS · Distributed Computing · Deep Learning · Cloud Computing · DBMS · Operating Systems · Computer Networks
```

### Entry 2:

```
Diploma in Computer Engineering — First Class
Anjuman-I-Islam's A.R. Kalsekar Polytechnic, New Panvel (MSBTE)
Sep 2021 – Jul 2023 · Aggregate 72.63%
```

### Entry 3 (optional):

```
Higher Secondary Certificate (Science) — Maharashtra State Board
2021 · 87.50%
```

---

## STEP 8 — Certifications section

### Heading:
```
Certifications
```

### Display as a clean list with logos (Udemy, IBM, Great Learning):

```
• Complete Data Analyst Bootcamp From Basics to Advanced
  Udemy (Krish Naik, KRISHAI Technologies) · Feb 2026

• The Complete Full-Stack Web Development Bootcamp
  Udemy (Dr. Angela Yu) · Nov 2025

• Excel Basics for Data Analysis
  Coursera · IBM · Jan 2026

• Introduction to Data Analytics
  Coursera · IBM · Dec 2025

• Introduction to Data Science
  Great Learning · Oct 2025

• Aptitude, Life Skills and Technical Training Programme
  Nov 2025
```

Make each one clickable to the actual verifiable credential URL where you have one.

---

## STEP 9 — Contact section

### Heading:
```
Get in Touch
```

### Body:
```
Open to backend developer roles — remote, Mumbai, Navi Mumbai, Thane, or remote-from-India roles based in Australia.

The fastest way to reach me is email.
```

### Primary CTA:
```
[ hamza81khan81@gmail.com ]   ← large button
```

### Secondary links row (icons):
- GitHub: `https://github.com/hamzakhan0712`
- LinkedIn: `https://www.linkedin.com/in/hamza-khan-3a2b0024a/`
- Resume PDF: `/resume.pdf`

### Optional contact form (if you have one built):

Fields:
- Name (required)
- Email (required)
- Message (required)
- Submit → goes to a webhook or email service (Resend, Formspree, EmailJS)

Keep validation tight. If you don't have a working form, **remove the form entirely** rather than have a broken one — a working `mailto:` button beats a broken submit handler.

---

## STEP 10 — Footer

### Layout:
Left side:
```
© 2026 Hamza Khan. Built with Next.js, Tailwind CSS, and shipped on Vercel.
```

Right side (icon row):
- GitHub · LinkedIn · Email · Resume

Add a small "Last updated: [date]" if you want — recruiters notice active portfolios.

---

## STEP 11 — What to REMOVE from your current portfolio

Based on what was visible in your LinkedIn featured screenshot of the portfolio:

1. **"Full Stack Developer Transitioning to Data Science"** subline — delete. The locked identity is Backend Developer; the transition is to **Data Engineering**, not Data Science. Saying "transitioning to Data Science" muddies your positioning, and Data Science is a more saturated/competitive label than Data Engineering.

2. **The "80%" stat** in the hero — drop it. Random unexplained percentages reduce credibility.

3. **"3+ years"** — update to **4 years**.

4. **"10+ projects"** — soften to "6 production projects" or just remove the number.

5. **TariqPerfumes project** (if present on portfolio) — remove for consistency with CV/resume/LinkedIn/GitHub.

6. **Any "Available for freelance work" badges** — you want full-time backend roles, not more freelance work. Replace with "Open to backend developer roles."

7. **Any "AI/ML Engineer" or "Data Scientist" mentions** — your positioning is Backend Developer, transitioning to Data Engineer. Don't muddy this.

8. **Stock photos of generic developers, hooded hackers, or "thinking person at laptop"** — replace with real screenshots of your projects.

---

## STEP 12 — What to ADD that isn't there

1. **Blog section / writing** (optional but high-leverage for the Data Engineering transition starting July 2026):
   - Heading: `Writing` or `Notes`
   - Empty for now, but commit the route. As you build DE projects, you'll write 1 short post per project. Even 3 posts dramatically lifts your differentiation vs other juniors.

2. **"Now" page** (optional, link in footer): a `/now` route describing what you're working on this month. Updating this monthly is a strong recruiter signal — shows you're active.
   - Example content for now:
     ```
     What I'm working on — May 2026
     • Finalizing my B.E. in CSE (Data Science), results in June.
     • Deepening my SQL with daily problems on DataLemur and PostgreSQL Exercises.
     • Reading Fundamentals of Data Engineering by Reis & Housley.
     • Planning the move toward Data Engineering — building an ETL pipeline next month as my first end-to-end project.
     ```

3. **Favicon** — use a simple "HK" monogram or a stylized initial. Don't leave it as the default Vercel triangle.

4. **OG image** at `public/og-image.png` (1200×630) — covered in Step 0.

5. **Resume PDF** at `public/resume.pdf` — hosted version of your latest resume so people can link directly without downloading.

6. **Schema.org Person JSON-LD** for SEO. Add this to `<head>`:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "Hamza Khan",
     "url": "https://portfolio-vert-six-26.vercel.app/",
     "image": "https://portfolio-vert-six-26.vercel.app/og-image.png",
     "jobTitle": "Backend Developer",
     "worksFor": { "@type": "Organization", "name": "Self-Employed" },
     "alumniOf": [
       { "@type": "CollegeOrUniversity", "name": "Saraswati College of Engineering (University of Mumbai)" }
     ],
     "knowsAbout": ["Python", "Django", "PostgreSQL", "AWS", "REST APIs", "WebSockets", "Backend Development"],
     "sameAs": [
       "https://github.com/hamzakhan0712",
       "https://www.linkedin.com/in/hamza-khan-3a2b0024a/"
     ]
   }
   </script>
   ```

---

## STEP 13 — Design / visual polish

You don't need a redesign; the current portfolio looks fine from the preview. But hit these:

1. **Dark mode toggle** — if you don't have one, add it. Costs little, signals modern dev.
2. **Smooth scroll between sections** — quality-of-life.
3. **Mobile responsiveness check** — open on your phone, scroll every section, confirm no horizontal scroll, text size readable, buttons tappable.
4. **Lighthouse audit** — open Chrome DevTools → Lighthouse → run Performance, Accessibility, Best Practices, SEO. Target: 90+ in all four. Fix any reds.
5. **Cursor/hover states** — every link and button should have a visible hover state. Standard hygiene.
6. **Loading state** for any image-heavy section. Use `next/image` with blur placeholders.
7. **404 page** — make sure a custom 404 exists with a "Back to home" link.

---

## STEP 14 — Performance and SEO checklist

```
[ ] Real domain configured (hamzakhan.dev or similar)
[ ] Title tag and meta description updated (Step 0)
[ ] OG image at 1200×630, hosted at /og-image.png
[ ] Schema.org Person JSON-LD added (Step 12)
[ ] Canonical URL tag in <head>
[ ] robots.txt allows indexing
[ ] sitemap.xml generated (Next.js can do this — install `next-sitemap`)
[ ] Submitted to Google Search Console
[ ] Submitted to Bing Webmaster Tools
[ ] All external links open in new tab with rel="noopener"
[ ] Images use next/image with width/height set
[ ] No broken links (use linkchecker or Vercel's built-in)
[ ] Lighthouse score: Performance 90+, Accessibility 95+, SEO 100
```

---

## STEP 15 — Cross-platform consistency check

After you ship the portfolio updates, the following strings must be identical (or near-identical) on all four surfaces:

| Element | Required value |
|---|---|
| Title / Tagline | `Backend Developer · Python · Django · PostgreSQL · AWS` |
| Intro line | `Backend developer with 4 years of freelance project experience...` |
| Project count | 6 main projects (not 10+) |
| Years | 4 years (not 3+, not 5+) |
| Degree | B.E. CSE (Data Science) — NOT B.Tech |
| CGPA | Expected 8.5 / 10 — NOT 9.32 |
| SIH framing | Grand Finalist from 50,000+ teams |
| Email | hamza81khan81@gmail.com |
| GitHub | github.com/hamzakhan0712 |
| LinkedIn | linkedin.com/in/hamza-khan-3a2b0024a (or new vanity URL) |

Quick consistency audit after deployment:
- Open all 4 in adjacent tabs: CV, Resume, GitHub README, LinkedIn About, Portfolio
- Read the first paragraph of each out loud
- They should sound like the same person describing the same career

---

## STEP 16 — Final deployment checklist

```
[ ] All Step 1–14 changes committed
[ ] Pushed to main branch
[ ] Vercel build succeeded (check deploy logs)
[ ] Production URL opens correctly on Chrome desktop
[ ] Production URL opens correctly on mobile (test on phone)
[ ] All project links open the right destinations
[ ] Resume PDF downloads correctly
[ ] Contact form submits successfully (or mailto: works)
[ ] No console errors on production
[ ] LinkedIn Featured link previews show the new OG image
  (use LinkedIn Post Inspector: linkedin.com/post-inspector to refresh)
[ ] Twitter Card Validator passes if you share on X
[ ] Custom domain (hamzakhan.dev) is connected via Vercel DNS
[ ] HTTPS works (Vercel handles this automatically)
[ ] 301 redirect from portfolio-vert-six-26.vercel.app to new domain
```

---

## STEP 17 — What to do after launching

1. **Update LinkedIn Featured** — replace the Portfolio card so the new OG image and title show.
2. **Update GitHub profile README** — if the portfolio URL is now `hamzakhan.dev`, update the link.
3. **Update your CV and Resume** — if you got a new domain, update the contact info line in both .docx files. Send me a message and I'll regenerate them.
4. **Submit to portfolio aggregators** — these get crawled by recruiters:
   - https://devport.tech
   - https://portfoliopro.dev
   - Reddit `r/developersIndia` "Share your portfolio" threads (search for active ones)
5. **Share once on LinkedIn** — a single short post: "Just shipped a refresh of my portfolio — would love feedback. [link]" — gets you free organic eyes from your network.

---

## STEP 18 — Phase 2 update (October 2026)

Come back to this document in October 2026 when you've shipped DE projects D1/D2/D3. At that point you'll:

- Update hero subline to `Backend Developer · Building Data Engineering Pipelines`
- Add a new top section "Data Engineering Projects" before the existing Backend Projects section
- Add NYC Taxi Pipeline, Streaming Order Analytics, and your CRM Analytics case study
- Update About to reflect the active transition (not just the intent)

That's a separate doc when the time comes. For now, ship Phase 1 — the clean Backend Developer portfolio above.

---

*Document version: locked May 25, 2026. Next revisit: end of Phase 2 (October 2026).*
