import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Monitor, Moon, Sparkles, Sun } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Personalisation, after Windows' Quick Settings: the colour mode, an accent
 * colour, reduced motion and larger text. Each choice is a data attribute on
 * <html> that index.css reads, saved in localStorage and re-applied before
 * first paint by the inline script in index.html — so a reload never flashes
 * the defaults.
 */

export const ACCENTS = [
  { id: "blue", label: "Blue", light: "#0067C0", dark: "#60CDFF" },
  { id: "purple", label: "Purple", light: "#744DA9", dark: "#C6A8FF" },
  { id: "teal", label: "Teal", light: "#007A7C", dark: "#4FD1D4" },
  { id: "green", label: "Green", light: "#107C10", dark: "#7FD872" },
  { id: "orange", label: "Orange", light: "#C2500F", dark: "#FFA866" },
  { id: "rose", label: "Rose", light: "#C30052", dark: "#FF8FBA" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];

type Prefs = {
  accent: AccentId;
  reduceMotion: boolean;
  largeText: boolean;
};

const DEFAULTS: Prefs = { accent: "blue", reduceMotion: false, largeText: false };

const PrefsContext = createContext<{
  prefs: Prefs;
  set: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void;
}>({ prefs: DEFAULTS, set: () => {} });

const read = (): Prefs => {
  try {
    const accent = localStorage.getItem("accent") as AccentId | null;
    return {
      accent: ACCENTS.some((item) => item.id === accent) ? accent! : "blue",
      reduceMotion: localStorage.getItem("motion") === "reduce",
      largeText: localStorage.getItem("text") === "large",
    };
  } catch {
    return DEFAULTS;
  }
};

/** Mirrors the inline script in index.html — keep the two in step. */
function apply(prefs: Prefs) {
  const root = document.documentElement;
  if (prefs.accent === "blue") root.removeAttribute("data-accent");
  else root.setAttribute("data-accent", prefs.accent);
  root.toggleAttribute("data-reduce-motion", prefs.reduceMotion);
  root.toggleAttribute("data-large-text", prefs.largeText);
}

export function usePrefs() {
  return useContext(PrefsContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(() =>
    typeof window === "undefined" ? DEFAULTS : read(),
  );

  useEffect(() => apply(prefs), [prefs]);

  const set = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    setPrefs((current) => {
      const next = { ...current, [key]: value };
      try {
        localStorage.setItem("accent", next.accent);
        localStorage.setItem("motion", next.reduceMotion ? "reduce" : "system");
        localStorage.setItem("text", next.largeText ? "large" : "default");
      } catch {
        /* Private windows: the choice simply lasts for this visit. */
      }
      return next;
    });
  }, []);

  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <PrefsContext.Provider value={{ prefs, set }}>{children}</PrefsContext.Provider>
    </NextThemes>
  );
}

const MODES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

/** A Quick Settings toggle: a tile that fills with the accent when on. */
function Toggle({
  on,
  onChange,
  label,
  icon: Icon,
}: {
  on: boolean;
  onChange: (value: boolean) => void;
  label: string;
  icon: typeof Sun;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn(
        "flex h-16 flex-col items-start justify-between rounded px-3 py-2 text-left text-[12.5px] font-medium transition-colors",
        on
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-control text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))] hover:bg-control-hover",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

/**
 * The button in the header and its flyout. Escape or a click outside closes
 * it and returns focus to the button.
 */
export function QuickSettings({ className }: { className?: string }) {
  const { theme = "system", resolvedTheme, setTheme } = useTheme();
  const { prefs, set } = usePrefs();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={cn("relative", className)}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Personalisation"
        aria-expanded={open}
        aria-controls={panelId}
        className="btn-icon"
      >
        <Icon className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id={panelId}
            role="dialog"
            aria-label="Personalisation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.25, ease: [0.1, 0.9, 0.2, 1] }}
            className="glass absolute right-0 top-full z-50 mt-3 w-[19rem] rounded-3xl p-4"
          >
            <p className="text-[13px] font-semibold text-foreground">Personalisation</p>

            <p className="mt-4 text-[12.5px] text-muted-foreground">Mode</p>
            <div role="radiogroup" aria-label="Mode" className="mt-1.5 grid grid-cols-3 gap-1">
              {MODES.map((mode) => {
                const selected = theme === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTheme(mode.value)}
                    className={cn(
                      "flex h-9 items-center justify-center gap-1.5 rounded text-[13px] font-medium transition-colors",
                      selected
                        ? "bg-card text-foreground shadow-rest ring-1 ring-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <mode.icon className="h-4 w-4" />
                    {mode.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-[12.5px] text-muted-foreground">Accent colour</p>
            <div role="radiogroup" aria-label="Accent colour" className="mt-2 flex gap-2">
              {ACCENTS.map((accent) => {
                const selected = prefs.accent === accent.id;
                return (
                  <button
                    key={accent.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={accent.label}
                    title={accent.label}
                    onClick={() => set("accent", accent.id)}
                    style={{ background: resolvedTheme === "dark" ? accent.dark : accent.light }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded transition-transform hover:scale-105",
                      selected && "ring-2 ring-foreground ring-offset-2 ring-offset-card",
                    )}
                  >
                    {selected && (
                      <Check
                        className={cn("h-4 w-4", resolvedTheme === "dark" ? "text-black" : "text-white")}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Toggle
                on={prefs.reduceMotion}
                onChange={(value) => set("reduceMotion", value)}
                label="Reduce motion"
                icon={Sparkles}
              />
              <Toggle
                on={prefs.largeText}
                onChange={(value) => set("largeText", value)}
                label="Larger text"
                icon={Monitor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Kept so older imports still resolve. */
export const ThemeMenu = QuickSettings;
