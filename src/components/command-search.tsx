import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderKanban, Search, Wrench } from "@/components/icons";
import { ProjectIcon } from "@/components/project-icon";
import { projects } from "@/data/projects";
import { aboutTabs, navigation } from "@/data/site";
import { rankedTools } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * Search, in the manner of Windows Search and PowerToys Run: Ctrl+K (or ⌘K)
 * from anywhere, type, arrow to a result, Enter. Finds pages, projects and
 * technologies — a technology opens the projects built with it.
 */

type Result = {
  id: string;
  group: "Pages" | "Projects" | "Technologies";
  label: string;
  hint: string;
  to: string;
  project?: (typeof projects)[number];
};

const ALL: Result[] = [
  ...navigation
    .filter((item) => item.href !== "/about")
    .map((item) => ({ id: item.href, group: "Pages" as const, label: item.label, hint: "Page", to: item.href })),
  ...aboutTabs.map((tab) => ({ id: tab.to, group: "Pages" as const, label: tab.label, hint: "Page", to: tab.to })),
  ...projects.map((project) => ({
    id: project.slug,
    group: "Projects" as const,
    label: project.name,
    hint: project.kind,
    to: `/projects/${project.slug}`,
    project,
  })),
  ...rankedTools.map((tool) => ({
    id: `tech-${tool.name}`,
    group: "Technologies" as const,
    label: tool.name,
    hint: `${tool.projects.length} ${tool.projects.length === 1 ? "project" : "projects"}`,
    to: `/projects?tech=${encodeURIComponent(tool.name)}`,
  })),
];

/** Opens the search from anywhere: other components dispatch this event. */
export const openSearch = () => window.dispatchEvent(new Event("open-search"));

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", show);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ALL.filter((item) => item.group !== "Technologies").slice(0, 9);
    return ALL.filter(
      (item) => item.label.toLowerCase().includes(needle) || item.hint.toLowerCase().includes(needle),
    ).slice(0, 12);
  }, [query]);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus?.();
  };

  const go = (result: Result) => {
    setOpen(false);
    navigate(result.to);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") return close();
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + results.length) % Math.max(results.length, 1));
    }
    if (event.key === "Enter" && results[active]) go(results[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/30 px-3 pt-[12vh]"
          onPointerDown={(event) => event.target === event.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.1, 0.9, 0.2, 1] }}
            onKeyDown={onKeyDown}
            className="glass w-full max-w-xl overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-divider px-4">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={input}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Search projects, technologies and pages"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-${results[active].id}` : undefined}
                className="h-14 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-tertiary-foreground"
              />
              <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">Esc</kbd>
            </div>
            <ul id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-[14px] text-muted-foreground">
                  Nothing matches “{query.trim()}”.
                </li>
              )}
              {results.map((result, index) => {
                const first = index === 0 || results[index - 1].group !== result.group;
                return (
                  <li key={result.id} role="presentation">
                    {first && (
                      <p className="px-3 pb-1 pt-2 text-[12px] font-semibold text-muted-foreground">
                        {result.group}
                      </p>
                    )}
                    <div
                      id={`search-${result.id}`}
                      role="option"
                      aria-selected={index === active}
                      onPointerMove={() => setActive(index)}
                      onClick={() => go(result)}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-3 rounded px-3 py-2",
                        index === active && "bg-secondary",
                      )}
                    >
                      {index === active && (
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                      )}
                      {result.project ? (
                        <ProjectIcon project={result.project} size={28} />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded bg-secondary text-muted-foreground">
                          {result.group === "Technologies" ? (
                            <Wrench className="h-4 w-4" />
                          ) : (
                            <FolderKanban className="h-4 w-4" />
                          )}
                        </span>
                      )}
                      <span className="min-w-0 flex-1 truncate text-[14px] text-foreground">
                        {result.label}
                      </span>
                      <span className="text-[12.5px] text-muted-foreground">{result.hint}</span>
                      {index === active && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandSearch;
