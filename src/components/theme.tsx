import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light, dark, or whatever the operating system says — the same three choices
 * as Windows' Settings › Personalisation › Colours › "Choose your mode".
 *
 * The class is first set by the inline script in index.html, before paint;
 * next-themes takes over once React is running and keeps it in sync.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}

const MODES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Use system setting", icon: Monitor },
] as const;

/**
 * The theme button and its menu flyout. A real menu: arrow keys move between
 * the options, Escape closes it and returns focus to the button.
 */
export function ThemeMenu({ className }: { className?: string }) {
  const { theme = "system", resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // The button shows the theme in effect, so "system" reads as sun or moon.
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  useEffect(() => {
    if (!open) return;
    const items = () =>
      Array.from(menu.current?.querySelectorAll<HTMLElement>("[role=menuitemradio]") ?? []);
    items()
      .find((item) => item.getAttribute("aria-checked") === "true")
      ?.focus();

    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menu.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const list = items();
      const at = list.indexOf(document.activeElement as HTMLElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      list[(at + step + list.length) % list.length]?.focus();
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
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label="Choose a theme"
        title="Theme"
        className="btn-icon"
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id={menuId}
            role="menu"
            aria-label="Theme"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.25, ease: [0, 0, 0, 1] }}
            className="glass absolute right-0 top-full z-50 mt-3 w-60 rounded-3xl p-1.5"
          >
            {MODES.map(({ value, label, icon: ModeIcon }) => {
              const checked = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                    button.current?.focus();
                  }}
                  className="flex h-10 w-full items-center gap-3 rounded-2xl px-3 text-left text-[14px] text-foreground transition-colors hover:bg-secondary focus-visible:outline-offset-[-2px]"
                >
                  <ModeIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span className="flex-1">{label}</span>
                  {checked && <Check className="h-4 w-4 text-primary" strokeWidth={2} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
