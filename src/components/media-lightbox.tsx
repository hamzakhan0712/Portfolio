import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
};

type MediaLightboxProps = {
  items: MediaItem[];
  startIndex?: number;
  open: boolean;
  onClose: () => void;
  title?: string;
};

/**
 * A full-screen viewer in the manner of Windows Photos: a dark backdrop, a
 * title bar with the name and position, arrows at the sides and a filmstrip
 * along the bottom. Arrow keys and swipes move through it; Escape closes it
 * and focus goes back to whatever opened it.
 */
export function MediaLightbox({ items, startIndex = 0, open, onClose, title }: MediaLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const touchStartX = useRef<number | null>(null);

  const count = items.length;
  const current = items[index];

  const goTo = useCallback((next: number) => count && setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    setIndex(startIndex);
    closeButton.current?.focus();

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, onClose]);

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) goTo(index + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const chrome =
    "inline-flex h-10 w-10 items-center justify-center rounded text-white transition-colors hover:bg-white/10 active:bg-white/5 focus-visible:outline-white";

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title}: media viewer` : "Media viewer"}
          className="fixed inset-0 z-[100] flex flex-col bg-[#1c1c1c]/95 text-white backdrop-blur-xl"
        >
          {/* Title bar */}
          <div className="flex h-12 shrink-0 items-center gap-3 pl-4">
            <p className="min-w-0 flex-1 truncate text-[13px]">
              {title}
              {count > 1 && (
                <span className="ml-3 text-white/60 tabular">
                  {index + 1} of {count}
                </span>
              )}
            </p>
            {current.type === "image" && (
              <a
                href={current.src}
                download
                className={chrome}
                aria-label="Download this image"
                title="Download"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
              </a>
            )}
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              title="Close (Esc)"
              className="inline-flex h-12 w-12 items-center justify-center text-white transition-colors hover:bg-[#c42b1c] active:bg-[#c42b1c]/80 focus-visible:outline-white focus-visible:outline-offset-[-2px]"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Stage */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
            onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
            onClick={(event) => event.target === event.currentTarget && onClose()}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: [0, 0, 0, 1] }}
                className="flex max-h-full max-w-full flex-col items-center"
              >
                {current.type === "image" ? (
                  <img
                    src={current.src}
                    alt={current.alt || title || ""}
                    draggable={false}
                    className="max-h-[calc(100vh-13rem)] max-w-full select-none rounded-3xl object-contain shadow-window"
                  />
                ) : (
                  <video
                    src={current.src}
                    poster={current.poster}
                    controls
                    playsInline
                    className="max-h-[calc(100vh-13rem)] max-w-full rounded-3xl bg-black"
                  />
                )}
                {current.caption && (
                  <figcaption className="mt-3 max-w-2xl text-center text-[13.5px] text-white/80">
                    {current.caption}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous"
                  className={cn(
                    chrome,
                    "absolute left-2 top-1/2 -translate-y-1/2 bg-white/5 md:left-5",
                  )}
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next"
                  className={cn(
                    chrome,
                    "absolute right-2 top-1/2 -translate-y-1/2 bg-white/5 md:right-5",
                  )}
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* Filmstrip */}
          {count > 1 && (
            <div className="flex shrink-0 justify-center overflow-x-auto px-4 py-3">
              <ul className="flex gap-1.5">
                {items.map((item, i) => (
                  <li key={`${item.src}-${i}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show ${item.alt || `item ${i + 1}`}`}
                      aria-current={i === index}
                      className={cn(
                        "relative block h-12 w-[4.5rem] overflow-hidden rounded-xl transition-opacity focus-visible:outline-white",
                        i === index ? "opacity-100" : "opacity-50 hover:opacity-90",
                      )}
                    >
                      <img
                        src={item.type === "image" ? item.src : item.poster}
                        alt=""
                        className="h-full w-full object-cover object-top"
                      />
                      {i === index && (
                        <span className="absolute inset-0 rounded-xl border-2 border-[#60cdff]" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MediaLightbox;
