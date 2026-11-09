# hamza.social

Personal portfolio of Hamza Khan, software engineer. A single static page in `public/`, with
no build step. Vercel serves `public/` as-is (see `vercel.json`).

- `public/index.html`: the whole site
- `public/Hamza-Khan-Resume.pdf`: the resume behind the "Download resume" button
- `public/robots.txt`, `public/sitemap.xml`: for Google Search Console

To preview locally: `npx serve public`

Resume: edit `resume/build_resume.py`, then run `python resume/build_resume.py public`
(needs `pip install python-docx` and Microsoft Edge). It writes the PDF and DOCX to
`D:\Documents\Profession Documents` and copies the PDF plus a browser-readable `resume.html` into the site.

Icons: `public/icons.svg` holds official brand logos (Simple Icons, pinned version) and UI line icons.
Rebuild with `python scripts/build_icons.py`. Preview with a local server (`python -m http.server -d public`),
because browsers block the external icon file on file:// pages.
