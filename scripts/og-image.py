"""
Regenerates public/brand/og-image.png — the social preview card.

Run with `python scripts/og-image.py` after changing any headline figure. The
numbers below mirror `metrics` in src/data/site.ts; if they disagree, site.ts
is the source of truth and this file is stale.

Fonts come from the Windows system set so the script needs no downloads.
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# The dark (Windows 11) palette from src/index.css.
BG = (32, 32, 32)           # --background  Mica      #202020
SURFACE = (43, 43, 43)      # --card                  #2B2B2B
BORDER = (58, 58, 58)       # --border
FG = (255, 255, 255)        # --foreground
MUTED = (201, 201, 201)     # --muted-foreground      #C9C9C9
PRIMARY = (96, 205, 255)    # --primary   light blue  #60CDFF
OK = (108, 203, 95)         # --ok                    #6CCB5F

FONTS = "C:/Windows/Fonts/"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


bold = lambda s: font("segoeuib.ttf", s)
semibold = lambda s: font("seguisb.ttf", s)
regular = lambda s: font("segoeui.ttf", s)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# ── Tinted right-hand panel behind the portrait ───────────────────────────
d.rounded_rectangle([720, 40, W - 40, H - 40], radius=36, fill=SURFACE, outline=BORDER)

# ── Portrait, sitting on the panel's floor ────────────────────────────────
cutout = Image.open("public/photos/cutout.webp").convert("RGBA")
target_h = 500
cutout = cutout.resize(
    (round(cutout.width * target_h / cutout.height), target_h), Image.LANCZOS
)
# Clip to the panel so the suit does not bleed past its rounded corner.
panel = Image.new("L", (W, H), 0)
ImageDraw.Draw(panel).rounded_rectangle([720, 40, W - 40, H - 40], radius=36, fill=255)
layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
layer.paste(cutout, (940 - cutout.width // 2, H - 40 - target_h), cutout)
layer.putalpha(Image.fromarray(__import__("numpy").minimum(
    __import__("numpy").array(layer.split()[3]), __import__("numpy").array(panel))))
img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
d = ImageDraw.Draw(img)

# ── Status pill ───────────────────────────────────────────────────────────
pill_text = "Open to full-time roles"
pf = regular(22)
tw = d.textlength(pill_text, font=pf)
d.rounded_rectangle([64, 64, 64 + tw + 64, 112], radius=24, fill=SURFACE, outline=BORDER)
d.ellipse([86, 81, 100, 95], fill=OK)
d.text((112, 74), pill_text, font=pf, fill=FG)

# ── Name and role ─────────────────────────────────────────────────────────
d.text((62, 140), "Hamza Khan", font=bold(84), fill=FG)
d.text((66, 248), "Full-Stack Software Engineer", font=semibold(42), fill=PRIMARY)
d.text((66, 312), "Complete products, from the database to the UI.", font=regular(26), fill=MUTED)

# ── Headline figures ──────────────────────────────────────────────────────
stats = [("2026", "B.E. graduate"), ("10", "projects"),
         ("SIH '25", "grand finalist")]
x = 66
for value, label in stats:
    d.text((x, 410), value, font=bold(56), fill=FG)
    d.text((x, 484), label, font=regular(19), fill=MUTED)
    x += max(d.textlength(label, font=regular(19)),
             d.textlength(value, font=bold(56))) + 48

# ── Foot ──────────────────────────────────────────────────────────────────
d.line([(66, 548), (660, 548)], fill=BORDER, width=2)
d.text((66, 566), "Mumbai, India  ·  portfolio-vert-six-26.vercel.app", font=regular(20), fill=MUTED)

os.makedirs("public/brand", exist_ok=True)
img.save("public/brand/og-image.png", optimize=True)
print("wrote public/brand/og-image.png")
