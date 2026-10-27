import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/** A colour token from index.css, as an HSL triplet Tailwind can add opacity to. */
const token = (name: string) => `hsl(var(--${name}))`;

/* Segoe UI Variable is the Windows 11 system face; elsewhere the platform's own
   UI font stands in, the way Fluent's web components fall back. */
const systemUi = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Roboto",
  "Helvetica Neue",
  "sans-serif",
];

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", "Selawik", ...systemUi],
        display: ["Segoe UI Variable Display", "Segoe UI Variable", "Segoe UI", "Selawik", ...systemUi],
      },
      colors: {
        border: token("border"),
        divider: token("divider"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        surface: token("surface"),
        sky: token("sky"),
        control: {
          DEFAULT: token("control"),
          hover: token("control-hover"),
          pressed: token("control-pressed"),
        },
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          solid: token("secondary-solid"),
          foreground: token("secondary-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        /* Semantic status — only for things that genuinely have a state. */
        ok: { DEFAULT: token("ok"), foreground: token("ok-foreground") },
        warn: { DEFAULT: token("warn"), foreground: token("warn-foreground") },
        err: { DEFAULT: token("err"), foreground: token("err-foreground") },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        "tertiary-foreground": token("tertiary-foreground"),
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          hover: token("card-hover"),
          pressed: token("card-pressed"),
          foreground: token("card-foreground"),
        },
      },
      /* Windows 11 corner radii: 4 px on controls (buttons, fields, tags),
         8 px on surfaces that hold them (cards, flyouts, windows). Anything
         nested inside a card steps down to 6 px so the curves stay concentric. */
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "6px",
        xl: "6px",
        "2xl": "6px",
        "3xl": "8px",
        "4xl": "8px",
      },
      boxShadow: {
        rest: "var(--shadow-rest)",
        raised: "var(--shadow-raised)",
        float: "var(--shadow-float)",
        flyout: "var(--shadow-float)",
        window: "var(--shadow-float)",
        tooltip: "var(--shadow-raised)",
      },
      transitionTimingFunction: {
        /* Fluent 2's "decelerate max", for things arriving or responding. */
        fluent: "cubic-bezier(0.1, 0.9, 0.2, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
