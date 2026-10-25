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
        sans: ["Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", ...systemUi],
        display: ["Segoe UI Variable Display", "Segoe UI Variable", "Segoe UI", ...systemUi],
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
      /* Fluent's two radii: 4 px on controls, 8 px on surfaces and windows. */
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        xl: "12px",
      },
      /* Fluent elevation: cards rest flat; flyouts and windows float. */
      boxShadow: {
        flyout: "0 8px 16px rgb(0 0 0 / 0.14), 0 0 2px rgb(0 0 0 / 0.12)",
        window:
          "0 32px 64px rgb(0 0 0 / 0.20), 0 2px 21px rgb(0 0 0 / 0.16)",
        tooltip: "0 4px 8px rgb(0 0 0 / 0.14)",
      },
      transitionTimingFunction: {
        /* Windows' "decelerate" curve, used for things arriving on screen. */
        fluent: "cubic-bezier(0, 0, 0, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
