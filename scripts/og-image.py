"""
Regenerates public/brand/og-image.png — the social preview card.

Run with `python scripts/og-image.py` after changing any headline figure. The
numbers below mirror `systemMetrics` in src/data/payloads.ts; if they disagree,
payloads.ts is the source of truth and this file is stale.

Fonts come from the Windows system set so the script needs no downloads.
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# The dark palette from src/index.css, resolved out of HSL.
BG = (9, 9, 11)             # --background  240 8% 4%
CARD = (20, 20, 22)         # --card        240 6% 8%
BORDER = (39, 39, 43)       # --border      240 5% 16%
FG = (245, 246, 245)        # --foreground  150 6% 96%
MUTED = (151, 151, 163)     # --muted-foreground 240 5% 62%
PRIMARY = (0, 224, 138)     # --primary     157 100% 44%

FONTS = "C:/Windows/Fonts/"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


bold = lambda s: font("segoeuib.ttf", s)
regular = lambda s: font("segoeui.ttf", s)
mono = lambda s: font("consola.ttf", s)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# ── Blueprint grid, matching the site's background treatment ──────────────
for x in range(0, W, 56):
    d.line([(x, 0), (x, H)], fill=(18, 20, 19), width=1)
for y in range(0, H, 56):
    d.line([(0, y), (W, y)], fill=(18, 20, 19), width=1)

# ── Portrait, bleeding off the right edge ─────────────────────────────────
cutout = Image.open("public/photos/cutout.webp").convert("RGBA")
target_h = 600
cutout = cutout.resize(
    (round(cutout.width * target_h / cutout.height), target_h), Image.LANCZOS
)

# A soft glow behind it so the black suit does not vanish into the black page.
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cx, cy = W - cutout.width // 2 - 40, H // 2
for r in range(320, 0, -8):
    alpha = int(16 * (1 - r / 320))
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0, 224, 138, alpha))
img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))

img.paste(cutout, (W - cutout.width - 40, H - target_h), cutout)
d = ImageDraw.Draw(img)

# ── Status pill ───────────────────────────────────────────────────────────
pill_text = "open to backend developer roles"
pf = regular(21)
tw = d.textlength(pill_text, font=pf)
d.rounded_rectangle([64, 56, 64 + tw + 62, 102], radius=23,
                    fill=CARD, outline=(0, 90, 58))
d.ellipse([86, 72, 100, 86], fill=PRIMARY)
d.text((112, 68), pill_text, font=pf, fill=FG)

# ── Name and role ─────────────────────────────────────────────────────────
d.text((64, 128), "Hamza Khan", font=bold(86), fill=FG)
d.text((66, 238), "Backend Developer", font=bold(40), fill=PRIMARY)
d.text((66, 300), "Python · Django · PostgreSQL · Azure",
       font=mono(22), fill=MUTED)

d.line([(66, 356), (186, 356)], fill=PRIMARY, width=3)

# ── Headline figures ──────────────────────────────────────────────────────
stats = [("4", "YEARS FREELANCE"), ("10", "SHIPPED SYSTEMS"),
         ("SIH'25", "GRAND FINALIST")]
x = 66
for value, label in stats:
    d.text((x, 396), value, font=bold(58), fill=FG)
    d.text((x, 474), label, font=mono(16), fill=MUTED)
    x += max(d.textlength(label, font=mono(16)),
             d.textlength(value, font=bold(58))) + 46

# ── Foot ──────────────────────────────────────────────────────────────────
d.line([(64, 542), (700, 542)], fill=BORDER, width=1)
d.text((66, 562), "hamza81khan81@gmail.com  ·  Mumbai, India",
       font=mono(19), fill=(110, 110, 120))

out = "public/brand/og-image.png"
img.save(out, "PNG", optimize=True)
print(f"{out} · {img.size[0]}x{img.size[1]} · {os.path.getsize(out)/1024:.0f} KB")
