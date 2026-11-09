"""Builds public/icons.svg: one SVG sprite with official brand logos (Simple Icons, in brand colours)
plus a few clean line icons for UI. Use in HTML as <svg><use href="icons.svg#python"/></svg>.

Run: python scripts/build_icons.py
"""
import json
import re
import urllib.request
from pathlib import Path

SI_VERSION = "16.33.0"  # pinned; bump deliberately
CDN = f"https://cdn.jsdelivr.net/npm/simple-icons@{SI_VERSION}"
OUT = Path(__file__).resolve().parent.parent / "public" / "icons.svg"

BRANDS = [
    "python", "typescript", "javascript", "html5", "css", "django", "fastapi", "flask", "react",
    "nextdotjs", "astro", "tailwindcss", "postgresql", "sqlite", "duckdb", "pandas", "elasticsearch",
    "electron", "tauri", "capacitor", "android", "cloudflare", "cloudflareworkers", "vercel", "git",
    "github", "githubactions", "pytest", "ollama", "whatsapp", "vite",
]
# Brand colours too light to read on white get the darker colour from the same brand's logo.
COLOUR_OVERRIDES = {"duckdb": "1A1A1A"}

# LinkedIn is not in Simple Icons (removed at LinkedIn's request); this is LinkedIn's own "in" mark.
LINKEDIN = ("0A66C2", "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42"
            "v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 "
            "2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 "
            "24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z")

# Line icons (Lucide-style, stroke = currentColor) for things that have no logo.
LINE = {
    "i-mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    "i-phone": '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    "i-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "i-file": '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
    "i-grid": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    "i-briefcase": '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
    "i-compass": '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
    "i-code": '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    "i-cap": '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    "i-trophy": '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    "i-db": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    "i-web": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2"/>',
    "i-devices": '<rect x="2" y="4" width="14" height="11" rx="2"/><path d="M6 19h6M9 15v4"/><rect x="17" y="8" width="5" height="12" rx="1.2"/>',
    "i-api": '<path d="M4 6h16M4 12h16M4 18h10"/><circle cx="19" cy="18" r="2"/>',
    "i-plug": '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"/>',
    "i-chart": '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/>',
    "i-test": '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
    "i-window": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    "i-arrow": '<path d="M7 17 17 7M8 7h9v9"/>',
    "i-link": '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
}


def fetch(url):
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read().decode("utf-8")


def main():
    data = json.loads(fetch(f"{CDN}/data/simple-icons.json"))
    icons = data if isinstance(data, list) else data["icons"]
    hex_by_slug = {}
    for ic in icons:
        slug = ic.get("slug") or re.sub(r"[^a-z0-9]", "", ic["title"].lower().replace("+", "plus").replace(".", "dot"))
        hex_by_slug[slug] = ic["hex"]

    symbols = []
    for slug in BRANDS:
        svg = fetch(f"{CDN}/icons/{slug}.svg")
        path = re.search(r'<path d="([^"]+)"', svg).group(1)
        colour = COLOUR_OVERRIDES.get(slug, hex_by_slug[slug])
        symbols.append(f'<symbol id="{slug}" viewBox="0 0 24 24"><path fill="#{colour}" d="{path}"/></symbol>')
    symbols.append(f'<symbol id="linkedin" viewBox="0 0 24 24"><path fill="#{LINKEDIN[0]}" d="{LINKEDIN[1]}"/></symbol>')
    for name, body in LINE.items():
        symbols.append(f'<symbol id="{name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
                       f'stroke-linecap="round" stroke-linejoin="round">{body}</symbol>')

    OUT.write_text('<svg xmlns="http://www.w3.org/2000/svg">\n' + "\n".join(symbols) + "\n</svg>\n", encoding="utf-8")
    print(f"wrote {OUT} ({len(symbols)} icons, {OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
