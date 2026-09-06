import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, X } from "lucide-react";
import { answerFor, suggestions, type Answer, type Doc } from "@/lib/search";
import { OPEN_SEARCH_EVENT } from "@/lib/search-events";
import { cn } from "@/lib/utils";

/**
 * ⌘K over the site's own content.
 *
 * The reply streams a word at a time because that is how people expect an
 * assistant to answer, but the footer says plainly what is behind it: a local
 * index, no model, no request. Dressing a lookup up as something it is not
 * would be the one dishonest thing on an otherwise checkable page.
 */

const KIND_LABEL: Record<Doc["kind"], string> = {
  project: "project",
  page: "page",
  fact: "fact",
};

/** Words per second while the reply streams in. */
const STREAM_RATE = 34;

export function CommandPalette() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef(0);
  const debounceRef = useRef(0);

  const words = answer ? answer.text.split(" ") : [];
  const streaming = answer !== null && revealed < words.length;

  /* ── Open / close ─────────────────────────────────────────────────── */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    const onRequest = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_SEARCH_EVENT, onRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_SEARCH_EVENT, onRequest);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // Autofocus after the entrance transition has started, or the caret lands
    // before the element is laid out.
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timer);
    };
  }, [open]);

  /* ── Answering ────────────────────────────────────────────────────── */

  const ask = useCallback((value: string) => {
    cancelAnimationFrame(frameRef.current);

    if (value.trim().length === 0) {
      setAnswer(null);
      setRevealed(0);
      return;
    }

    const next = answerFor(value);
    setAnswer(next);
    setActiveIndex(0);

    const total = next.text.split(" ").length;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setRevealed(total);
      return;
    }

    setRevealed(0);
    const started = performance.now();
    const step = (now: number) => {
      const count = Math.min(
        total,
        Math.floor(((now - started) / 1000) * STREAM_RATE) + 1,
      );
      setRevealed(count);
      if (count < total) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, []);

  // Debounced so every keystroke does not restart the stream.
  useEffect(() => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => ask(query), 180);
    return () => window.clearTimeout(debounceRef.current);
  }, [query, ask]);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(debounceRef.current);
    },
    [],
  );

  /* ── Navigation ───────────────────────────────────────────────────── */

  const go = useCallback(
    (doc: Doc) => {
      setOpen(false);
      navigate(doc.href);
    },
    [navigate],
  );

  const sources = answer?.sources ?? [];

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (sources.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % sources.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + sources.length) % sources.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(sources[activeIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Ask about this portfolio"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed left-1/2 top-[12vh] z-[101] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2"
            >
              <div className="panel-terminal border-ai/30">
                {/* Input */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder="Ask about the work, the stack, the experience…"
                    className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[min(60vh,460px)] overflow-y-auto">
                  {/* Empty state */}
                  {!answer && (
                    <div className="p-4">
                      <p className="mono-label mb-3">Try asking</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setQuery(suggestion)}
                            className="rounded-full border border-border px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-ai/50 hover:text-foreground"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply */}
                  {answer && (
                    <div className="p-4">
                      <div className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 h-4 w-0.5 shrink-0 rounded-full bg-ai"
                        />
                        <p
                          className="text-[13px] leading-relaxed text-foreground/90"
                          aria-live="polite"
                        >
                          {words.slice(0, revealed).join(" ")}
                          {streaming && (
                            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-ai" />
                          )}
                        </p>
                      </div>

                      {/* Sources */}
                      {!streaming && sources.length > 0 && (
                        <div className="mt-4">
                          <p className="mono-label mb-2">
                            {answer.text.startsWith("Closest")
                              ? "Results"
                              : "Sources"}
                          </p>
                          <ul className="space-y-1">
                            {sources.map((doc, index) => (
                              <li key={doc.id}>
                                <button
                                  type="button"
                                  onClick={() => go(doc)}
                                  onMouseEnter={() => setActiveIndex(index)}
                                  className={cn(
                                    "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors",
                                    index === activeIndex
                                      ? "bg-secondary"
                                      : "hover:bg-secondary/60",
                                  )}
                                >
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-[13px] font-medium text-foreground">
                                      {doc.title}
                                    </span>
                                    <span className="block truncate text-[11px] text-muted-foreground">
                                      {doc.snippet}
                                    </span>
                                  </span>
                                  <span className="mono-label shrink-0 text-[9px]">
                                    {KIND_LABEL[doc.kind]}
                                  </span>
                                  {index === activeIndex && (
                                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Foot — says exactly what this is. */}
                <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-3 py-2 font-mono text-[10px] text-muted-foreground">
                  <span>local index · no model call · nothing leaves the page</span>
                  <span className="hidden shrink-0 items-center gap-2 sm:flex">
                    <kbd className="rounded border border-border px-1">↑↓</kbd>
                    <kbd className="rounded border border-border px-1">⏎</kbd>
                    <kbd className="rounded border border-border px-1">esc</kbd>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
