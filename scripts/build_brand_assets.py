"""Builds face favicons, app icons, the top-bar avatar, the web manifest and the 1200x630 link-preview image into public/.

Run: python scripts/build_brand_assets.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
PORTRAIT = PUBLIC / "hamza-khan-portrait.jpg"
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
INK = (23, 33, 28)        # #17211c, matches --ink in css/site.css
ACCENT = (14, 107, 74)    # #0e6b4a, --accent
MUTED = (106, 117, 112)   # #6a7570, --muted
RULE = (220, 227, 223)    # #dce3df, --rule
SURFACE = (244, 247, 245) # #f4f7f5, --surface
WHITE = (255, 255, 255)
CASES = [  # (slug, title lines, screenshot) for the per-case-study link previews
    ("coliving", ["Co-living", "property platform"], "dashboard.webp"),
    ("novem", ["NOVEM", "analytics engine"], "dashboard.webp"),
    ("crm", ["Call-center CRM"], "dashboard.webp"),
]


FACE = PUBLIC / "hamza-khan-face.jpg"  # square headshot centred on the face (made with face detection)


def face(size: int, circle: bool = True) -> Image.Image:
    """Hamza's face as a round (or square) icon. The source is already centred, so no extra cropping."""
    im = Image.open(FACE).convert("RGB").resize((size * 4, size * 4), Image.LANCZOS)
    if circle:
        mask = Image.new("L", im.size, 0)
        ImageDraw.Draw(mask).ellipse((0, 0, im.size[0] - 1, im.size[1] - 1), fill=255)
        out = Image.new("RGBA", im.size, (0, 0, 0, 0))
        out.paste(im, (0, 0), mask)
        im = out
    return im.resize((size, size), Image.LANCZOS)


def icons():
    face(48).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    face(96).save(PUBLIC / "favicon-96.png")
    face(192).save(PUBLIC / "icon-192.png")
    face(512).save(PUBLIC / "icon-512.png")
    face(180, circle=False).save(PUBLIC / "apple-touch-icon.png")  # iOS rounds the corners itself
    face(96).save(PUBLIC / "img" / "avatar.webp", quality=85)  # top-bar logo (shown at 32px, sharp on 3x screens)
    square = Image.open(FACE).convert("RGB").resize((480, 480), Image.LANCZOS)  # phone hero photo + structured data
    square.save(PUBLIC / "hamza-khan.webp", quality=82)
    square.save(PUBLIC / "hamza-khan.jpg", quality=84, optimize=True)
    svg = PUBLIC / "favicon.svg"
    if svg.exists():
        svg.unlink()  # the old HK monogram; the face icons replace it
    (PUBLIC / "site.webmanifest").write_text("""{
  "name": "Hamza Khan, Python Backend Engineer",
  "short_name": "Hamza Khan",
  "start_url": "/",
  "display": "browser",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
""", encoding="utf-8")


def og_image():
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), WHITE)
    # portrait on the right, cropped to fill a 440px-wide column
    p = Image.open(PORTRAIT).convert("RGB")
    col_w = 440
    p = p.resize((int(p.width * H / p.height), H), Image.LANCZOS)
    left = (p.width - col_w) // 2
    im.paste(p.crop((left, 0, left + col_w, H)), (W - col_w, 0))
    d = ImageDraw.Draw(im)
    x = 72
    d.text((x, 140), "Hamza Khan", font=ImageFont.truetype(FONT_BOLD, 76), fill=INK)
    d.text((x, 244), "Python Backend Engineer", font=ImageFont.truetype(FONT_BOLD, 40), fill=ACCENT)
    d.text((x, 302), "Django, FastAPI, PostgreSQL", font=ImageFont.truetype(FONT_REG, 32), fill=MUTED)
    d.text((x, 346), "Thane, Mumbai. Open to backend roles.", font=ImageFont.truetype(FONT_REG, 32), fill=MUTED)
    d.rectangle((x, 430, x + 64, 435), fill=ACCENT)
    d.text((x, 456), "hamza.social", font=ImageFont.truetype(FONT_BOLD, 34), fill=INK)
    im.save(PUBLIC / "og-image.jpg", quality=86, optimize=True)


def case_images():
    """1200x630 link previews for the case studies: title on the left, a screenshot bleeding off the right."""
    W, H = 1200, 630
    for slug, lines, shot in CASES:
        im = Image.new("RGB", (W, H), SURFACE)
        s = Image.open(PUBLIC / "img" / "work" / slug / shot).convert("RGB")
        sw = 700
        s = s.resize((sw, int(s.height * sw / s.width)), Image.LANCZOS)
        sx, sy = 600, (H - s.height) // 2
        d = ImageDraw.Draw(im)
        d.rectangle((sx - 1, sy - 1, sx + sw, sy + s.height), fill=RULE)
        im.paste(s, (sx, sy))
        x, y = 64, 150
        d.text((x, y), "Case study", font=ImageFont.truetype(FONT_REG, 28), fill=MUTED)
        y += 52
        for line in lines:
            d.text((x, y), line, font=ImageFont.truetype(FONT_BOLD, 50), fill=INK)
            y += 64
        d.rectangle((x, y + 22, x + 56, y + 27), fill=ACCENT)
        d.text((x, y + 46), "Hamza Khan", font=ImageFont.truetype(FONT_BOLD, 28), fill=INK)
        d.text((x, y + 84), "Python backend engineer", font=ImageFont.truetype(FONT_REG, 26), fill=MUTED)
        im.save(PUBLIC / "img" / "work" / slug / "og.jpg", quality=85, optimize=True)


if __name__ == "__main__":
    icons()
    og_image()
    case_images()
    print("wrote favicons, app icons, manifest, og-image.jpg and case-study previews")
