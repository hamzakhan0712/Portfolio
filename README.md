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
