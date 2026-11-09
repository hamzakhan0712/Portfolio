"""Builds Hamza Khan's resume as PDF (HTML -> headless Edge) and DOCX from one content source."""
import html
import subprocess
import sys
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Mm

OUT_DIR = Path(r"D:\Documents\Profession Documents")
HERE = Path(__file__).parent
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

NAME = "Hamza Khan"
TITLE = "Software Engineer · Python, Django, FastAPI, React"
CONTACT = [
    ("Thane, Maharashtra · open to Mumbai, Navi Mumbai, Thane or remote", None),
    ("hamza81khan81@gmail.com", "mailto:hamza81khan81@gmail.com"),
    ("+91 91379 66960", "tel:+919137966960"),
    ("hamza.social", "https://www.hamza.social"),
    ("linkedin.com/in/hamza-khan-3a2b0024a", "https://www.linkedin.com/in/hamza-khan-3a2b0024a/"),
    ("github.com/hamzakhan0712", "https://github.com/hamzakhan0712"),
]

SUMMARY = (
    "Software engineer with 2.5+ years of shipping production software for businesses in India and "
    "Germany: Django and FastAPI backends, React and Next.js front ends, and an Electron and Android "
    "billing app now on its fifth major version. I own the work end to end, from requirements and "
    "architecture through testing, deployment and support. Looking for a software engineering role."
)

EXPERIENCE = [
    {
        "role": "Freelance Software Engineer",
        "org": "Self-employed, Mumbai",
        "meta": "Clients in India and Germany",
        "dates": "Apr 2024 – Present",
        "bullets": [
            "Scoped, built, deployed and maintained software for six small businesses in India and Germany, "
            "plus two academic conference websites.",
            "Shipped a billing system for a trading company as an Electron desktop app and a Capacitor "
            "Android app (React, TypeScript, SQLite): GST tax invoices, quotations, proforma invoices and "
            "delivery challans, with versioned installers and auto-updates, now on version 5.",
            "Built a Django and PostgreSQL call-center CRM: CSV/XLSX lead import with column mapping, "
            "role-scoped views for admins, team leaders and agents, GST invoice PDFs, and a live break "
            "monitor over WebSockets (Django Channels).",
            "Built business websites on Cloudflare Workers and Vercel (Next.js, Astro) with WhatsApp lead "
            "capture, structured data for search, and Playwright tests, including a bilingual "
            "English/German site for a Germany-based trading startup.",
        ],
    },
    {
        "role": "Full Stack Developer",
        "org": "Brandenbed Living Spaces UG, Berlin, Germany",
        "meta": "Remote contract",
        "dates": "Sep 2025 – Nov 2025",
        "bullets": [
            "Built modules of the company's internal property-management web application in Django and "
            "Django REST Framework, covering properties, tenants, landlords, leads, rent payments and "
            "maintenance requests.",
            "Built staff dashboards and forms with Tailwind CSS and Flowbite, with data access scoped by "
            "employee role.",
            "Worked directly with the Berlin-based founders, reporting progress and adjusting scope as needs changed.",
        ],
    },
]

PROJECTS = [
    {
        "name": "NOVEM — E-Commerce Intelligence Platform",
        "meta": "Python, FastAPI, DuckDB, Prophet, React, Tauri",
        "bullets": [
            "Local-first desktop app that turns store exports (CSV, Excel, Shopify, PostgreSQL) into KPIs, "
            "RFM segments, churn and lifetime-value models and Prophet forecasts, served by ~170 endpoints "
            "across 23 FastAPI routers.",
            "AI copilot that answers questions about the store's own data with a local Ollama model (RAG); "
            "customer PII is hashed on import; CI runs Ruff, pytest, ESLint and Vitest.",
        ],
    },
    {
        "name": "Key2YourHome — Real-estate deals platform",
        "meta": "key2yourhome.net · Astro, Tailwind CSS, Cloudflare Workers, D1, R2",
        "bullets": [
            "Static-first property site using Google Sheets as the CMS, moving in phases to Cloudflare D1 "
            "and R2 with a private admin; Playwright tests at phone, tablet and desktop widths.",
        ],
    },
]

SKILLS = [
    ("Languages", "Python, TypeScript, JavaScript, SQL, HTML, CSS"),
    ("Backend", "Django, Django REST Framework, FastAPI, Flask, Django Channels, REST APIs"),
    ("Frontend", "React, Next.js, Astro, Tailwind CSS"),
    ("Data", "PostgreSQL, SQLite, DuckDB, pandas, Prophet, Elasticsearch"),
    ("Desktop & mobile", "Electron, Tauri, Capacitor (Android)"),
    ("Cloud & tools", "Cloudflare Workers, D1, R2, Vercel, Git, GitHub Actions, Playwright, pytest"),
]

EDUCATION = [
    ("B.E. Computer Science & Engineering (Data Science)",
     "Saraswati College of Engineering, Mumbai", "2023 – 2026", "CGPI 8.19"),
    ("Diploma in Computer Engineering",
     "Abdul Razzaq Kalsekar Polytechnic, MSBTE", "2021 – 2023", "72.63%, First Class"),
]

ACHIEVEMENTS = [
    "Grand Finalist, Smart India Hackathon 2025 (Software Edition), Ministry of Education, Dec 2025",
    "2nd Place, SCOE AVISHKAR 2025 project competition, Saraswati College of Engineering, Apr 2025",
]


# ---------------------------------------------------------------- PDF (via HTML)
def e(s):
    return html.escape(s)


def build_html(web=False):
    # line 1: location and phone; line 2: email and links
    first = [e(CONTACT[0][0])] + [f'<a href="{e(u)}">{e(t)}</a>' for t, u in CONTACT[1:] if u.startswith("tel:")]
    rest = [f'<a href="{e(u)}">{e(t)}</a>' for t, u in CONTACT[1:] if not u.startswith("tel:")]
    contact = " &nbsp;·&nbsp; ".join(first) + "<br>" + " &nbsp;·&nbsp; ".join(rest)
    exp = ""
    for j in EXPERIENCE:
        lis = "".join(f"<li>{e(b)}</li>" for b in j["bullets"])
        exp += f"""<div class="item"><div class="row"><span><b>{e(j['role'])}</b>, {e(j['org'])}
        <span class="muted">· {e(j['meta'])}</span></span><span class="date">{e(j['dates'])}</span></div><ul>{lis}</ul></div>"""
    proj = ""
    for p in PROJECTS:
        lis = "".join(f"<li>{e(b)}</li>" for b in p["bullets"])
        proj += f"""<div class="item"><div class="row"><span><b>{e(p['name'])}</b>
        <span class="muted">· {e(p['meta'])}</span></span></div><ul>{lis}</ul></div>"""
    skills = "".join(f"<div><b>{e(k)}:</b> {e(v)}</div>" for k, v in SKILLS)
    edu = "".join(
        f"""<div class="row edu"><span><b>{e(d)}</b>, {e(s)} <span class="muted">· {e(g)}</span></span>
        <span class="date">{e(y)}</span></div>""" for d, s, y, g in EDUCATION
    )
    ach = "".join(f"<li>{e(a)}</li>" for a in ACHIEVEMENTS)
    head_extra, toolbar = "", ""
    if web:
        head_extra = WEB_HEAD
        toolbar = WEB_TOOLBAR
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hamza Khan — Resume</title>
{head_extra}
<style>
@page {{ size: A4; margin: 14mm 15mm 10mm; }}
* {{ box-sizing: border-box; }}
body {{ font-family: Calibri, Carlito, "Segoe UI", Arial, sans-serif; font-size: 10pt; line-height: 1.33; color: #111; margin: 0; }}
a {{ color: inherit; text-decoration: none; }}
h1 {{ font-size: 22pt; margin: 0; letter-spacing: .3px; }}
.title {{ font-size: 11.5pt; color: #333; margin: 2px 0 6px; }}
.contact {{ font-size: 9pt; color: #333; }}
.contact a {{ white-space: nowrap; }}
h2 {{ font-size: 10.5pt; text-transform: uppercase; letter-spacing: .8px; color: #1d3a6e;
      border-bottom: 1px solid #c9d2e0; padding-bottom: 2px; margin: 13px 0 5px; }}
.row {{ display: flex; justify-content: space-between; gap: 10px; }}
.date {{ white-space: nowrap; color: #333; }}
.muted {{ color: #555; }}
.item {{ margin-bottom: 7px; }}
ul {{ margin: 1px 0 0; padding-left: 15px; }}
li {{ margin: 1px 0; }}
p {{ margin: 0; }}
.skills div {{ margin: 2px 0; }}
.edu {{ margin-bottom: 3px; }}
</style></head><body>
{toolbar}<main class="sheet">
<h1>{e(NAME)}</h1><div class="title">{e(TITLE)}</div><div class="contact">{contact}</div>
<h2>Summary</h2><p>{e(SUMMARY)}</p>
<h2>Experience</h2>{exp}
<h2>Projects</h2>{proj}
<h2>Skills</h2><div class="skills">{skills}</div>
<h2>Education</h2>{edu}
<h2>Achievements</h2><ul>{ach}</ul>
</main>
</body></html>"""


def build_pdf(path: Path):
    src = HERE / "resume.html"
    src.write_text(build_html(), encoding="utf-8")
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={path}", src.as_uri()], check=True, timeout=90,
                   capture_output=True)


# ---------------------------------------------------------------- DOCX
ACCENT = RGBColor(0x1D, 0x3A, 0x6E)


def para(doc, space_after=0, space_before=0):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_after, pf.space_before, pf.line_spacing = Pt(space_after), Pt(space_before), 1.05
    return p


def run(p, text, bold=False, size=10, color=None):
    r = p.add_run(text)
    r.bold, r.font.size = bold, Pt(size)
    if color is not None:
        r.font.color.rgb = color
    return r


def heading(doc, text):
    p = para(doc, space_before=11, space_after=3)
    run(p, text.upper(), bold=True, size=10.5, color=ACCENT)
    border = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    for k, v in (("val", "single"), ("sz", "6"), ("space", "1"), ("color", "C9D2E0")):
        bottom.set(qn(f"w:{k}"), v)
    border.append(bottom)
    p._p.get_or_add_pPr().append(border)


def right_tab_line(doc, left_parts, right_text, width_mm):
    p = para(doc)
    p.paragraph_format.tab_stops.add_tab_stop(Mm(width_mm), alignment=2)  # 2 = RIGHT
    for text, bold, color in left_parts:
        run(p, text, bold=bold, color=color)
    if right_text:
        run(p, "\t" + right_text)
    return p


def bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    pf = p.paragraph_format
    pf.space_after, pf.line_spacing, pf.left_indent = Pt(0), 1.05, Mm(5)
    run(p, text)


def hyperlink(p, text, url):
    rid = p.part.relate_to(url, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
                           is_external=True)
    h = OxmlElement("w:hyperlink")
    h.set(qn("r:id"), rid)
    r = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), "18")
    rpr.append(sz)
    r.append(rpr)
    t = OxmlElement("w:t")
    t.text = text
    r.append(t)
    h.append(r)
    p._p.append(h)


def build_docx(path: Path):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    sec.left_margin = sec.right_margin = Mm(16)
    sec.top_margin, sec.bottom_margin = Mm(17), Mm(15)
    width = 210 - 32
    style = doc.styles["Normal"]
    style.font.name, style.font.size = "Calibri", Pt(10)
    style.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")

    p = para(doc)
    run(p, NAME, bold=True, size=20)
    p = para(doc, space_after=2)
    run(p, TITLE, size=11, color=RGBColor(0x33, 0x33, 0x33))
    p = para(doc)
    for i, (t, u) in enumerate(CONTACT):
        if i:
            run(p, "  ·  ", size=9)
        if u:
            hyperlink(p, t, u)
        else:
            run(p, t, size=9)

    heading(doc, "Summary")
    run(para(doc), SUMMARY)

    heading(doc, "Experience")
    for j in EXPERIENCE:
        right_tab_line(doc, [(j["role"], True, None), (", " + j["org"], False, None),
                             (" · " + j["meta"], False, RGBColor(0x55, 0x55, 0x55))], j["dates"], width)
        for b in j["bullets"]:
            bullet(doc, b)
        para(doc, space_after=2)

    heading(doc, "Projects")
    for pj in PROJECTS:
        right_tab_line(doc, [(pj["name"], True, None),
                             (" · " + pj["meta"], False, RGBColor(0x55, 0x55, 0x55))], "", width)
        for b in pj["bullets"]:
            bullet(doc, b)

    heading(doc, "Skills")
    for k, v in SKILLS:
        p = para(doc)
        run(p, k + ": ", bold=True)
        run(p, v)

    heading(doc, "Education")
    for d, s, y, g in EDUCATION:
        right_tab_line(doc, [(d, True, None), (", " + s, False, None),
                             (" · " + g, False, RGBColor(0x55, 0x55, 0x55))], y, width)

    heading(doc, "Achievements")
    for a in ACHIEVEMENTS:
        bullet(doc, a)

    doc.core_properties.author = NAME
    doc.core_properties.title = "Hamza Khan — Resume"
    doc.save(path)


WEB_HEAD = """<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Resume of Hamza Khan, software engineer in Thane, Mumbai: Python, Django, FastAPI, React.">
<link rel="canonical" href="https://www.hamza.social/resume">
<meta name="color-scheme" content="light">
<style>
@media screen {
  html { background: #eef1f5; }
  body { font-size: 15px !important; line-height: 1.5 !important; }
  .bar { position: sticky; top: 0; z-index: 2; background: rgba(255,255,255,.95); backdrop-filter: blur(6px);
         border-bottom: 1px solid #dde3ea; }
  .bar-in { max-width: 860px; margin: 0 auto; padding: 10px 16px; display: flex; gap: 10px; align-items: center;
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; font-size: 14px; }
  .bar a { color: #1d3a6e; text-decoration: none; font-weight: 600; padding: 7px 12px; border-radius: 8px; }
  .bar .back { margin-right: auto; padding-left: 0; }
  .bar .btn { border: 1px solid #c9d2e0; background: #fff; }
  .bar .btn.primary { background: #1d3a6e; border-color: #1d3a6e; color: #fff; }
  .sheet { max-width: 860px; margin: 24px auto 48px; background: #fff; padding: 48px 56px;
           border-radius: 6px; box-shadow: 0 1px 3px rgba(16,24,40,.08), 0 8px 24px rgba(16,24,40,.06); }
  .contact a { color: #1f4f9c !important; }
  h1 { font-size: 30px !important; }
  .title { font-size: 17px !important; }
  .contact { font-size: 14px !important; line-height: 1.7; }
  h2 { font-size: 14px !important; margin-top: 24px !important; }
  .item { margin-bottom: 12px !important; }
  li { margin: 3px 0 !important; }
}
@media screen and (max-width: 640px) {
  .sheet { margin: 0; padding: 24px 16px 40px; border-radius: 0; box-shadow: none; }
  .row { flex-wrap: wrap; gap: 0 10px !important; }
  .contact a { white-space: normal !important; overflow-wrap: anywhere; }
  .bar .print { display: none; }
}
@media print { .bar { display: none; } }
</style>"""

WEB_TOOLBAR = """<nav class="bar" aria-label="Resume actions"><div class="bar-in">
<a class="back" href="/">&larr; Portfolio</a>
<a class="btn print" href="#" onclick="window.print();return false;">Print</a>
<a class="btn primary" href="Hamza-Khan-Resume.pdf" download>Download PDF</a>
</div></nav>"""


if __name__ == "__main__":
    pdf = OUT_DIR / "Hamza-Khan-Resume.pdf"
    docx_path = OUT_DIR / "Hamza-Khan-Resume.docx"
    build_pdf(pdf)
    build_docx(docx_path)
    if len(sys.argv) > 1:  # optional: the website's public/ folder gets the PDF and a web view
        site = Path(sys.argv[1])
        (site / "Hamza-Khan-Resume.pdf").write_bytes(pdf.read_bytes())
        (site / "resume.html").write_text(build_html(web=True), encoding="utf-8")
    print("wrote", pdf, docx_path)
