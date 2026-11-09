"""Builds favicons, app icons, the web manifest and the 1200x630 link-preview image into public/.

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


def monogram(size: int) -> Image.Image:
    """Python-blue rounded square with Python-yellow 'HK'."""
    scale = 4  # draw large, then downsample for smooth edges
    s = size * scale
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * 0.2), fill=PY_BLUE)
    font = ImageFont.truetype(FONT_BOLD, int(s * 0.46))
    d.text((s / 2, s / 2 + s * 0.02), "HK", font=font, fill=PY_YELLOW, anchor="mm")
    return im.resize((size, size), Image.LANCZOS)


def icons():
    monogram(48).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    monogram(96).save(PUBLIC / "favicon-96.png")
    monogram(192).save(PUBLIC / "icon-192.png")
    monogram(512).save(PUBLIC / "icon-512.png")
    # Apple touch icons should be opaque; iOS rounds the corners itself.
    apple = Image.new("RGB", (180, 180), PY_BLUE)
    d = ImageDraw.Draw(apple)
    d.text((90, 93), "HK", font=ImageFont.truetype(FONT_BOLD, 84), fill=PY_YELLOW, anchor="mm")
    apple.save(PUBLIC / "apple-touch-icon.png")
    (PUBLIC / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#2b5b84"/>'
        '<text x="32" y="42" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="28" fill="#ffd43b" '
        'text-anchor="middle">HK</text></svg>\n', encoding="utf-8")
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
