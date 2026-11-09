"""Builds face favicons, app icons, the top-bar avatar, the web manifest and the 1200x630 link-preview image into public/.

Run: python scripts/build_brand_assets.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"
PORTRAIT = PUBLIC / "hamza-khan-portrait.jpg"
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
INK = (17, 24, 39)
PY_BLUE = (43, 91, 132)   # #2b5b84, Python blue (dark)
PY_YELLOW = (255, 212, 59)  # #ffd43b, Python yellow
MUTED = (75, 85, 99)
WHITE = (255, 255, 255)


FACE = PUBLIC / "hamza-khan.jpg"  # square head-and-shoulders crop


def face(size: int, circle: bool = True) -> Image.Image:
    """Hamza's face, cropped to the head, as a round (or square) icon."""
    im = Image.open(FACE).convert("RGB")
    w, h = im.size
    side = int(w * 0.62)  # tighter crop so the face reads at small sizes
    left, top = (w - side) // 2, int(h * 0.04)
    im = im.crop((left, top, left + side, top + side)).resize((size * 4, size * 4), Image.LANCZOS)
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
    svg = PUBLIC / "favicon.svg"
    if svg.exists():
        svg.unlink()  # the old HK monogram; the face icons replace it
    (PUBLIC / "site.webmanifest").write_text("""{
  "name": "Hamza Khan, Software Engineer",
  "short_name": "Hamza Khan",
  "start_url": "/",
  "display": "browser",
  "background_color": "#ffffff",
  "theme_color": "#2b5b84",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
""", encoding="utf-8")


def og_image():
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), WHITE)
    ImageDraw.Draw(im).rectangle((0, 0, W, 8), fill=PY_BLUE)  # thin Python-blue top edge
    # portrait on the right, cropped to fill a 440px-wide column
    p = Image.open(PORTRAIT).convert("RGB")
    col_w = 440
    ratio = H / p.height
    p = p.resize((int(p.width * ratio), H), Image.LANCZOS)
    left = (p.width - col_w) // 2
    im.paste(p.crop((left, 0, left + col_w, H)), (W - col_w, 0))
    d = ImageDraw.Draw(im)
    x = 72
    d.text((x, 150), "Hamza Khan", font=ImageFont.truetype(FONT_BOLD, 76), fill=INK)
    d.text((x, 252), "Software Engineer", font=ImageFont.truetype(FONT_REG, 40), fill=PY_BLUE)
    d.text((x, 306), "Python · Django · FastAPI · React", font=ImageFont.truetype(FONT_REG, 32), fill=MUTED)
    d.text((x, 352), "Thane, Mumbai · Open to new roles", font=ImageFont.truetype(FONT_REG, 32), fill=MUTED)
    d.rectangle((x, 436, x + 80, 441), fill=PY_YELLOW)
    d.text((x, 462), "hamza.social", font=ImageFont.truetype(FONT_BOLD, 34), fill=PY_BLUE)
    im.save(PUBLIC / "og-image.jpg", quality=86, optimize=True)


if __name__ == "__main__":
    icons()
    og_image()
    print("wrote favicons, app icons, manifest and og-image.jpg")
