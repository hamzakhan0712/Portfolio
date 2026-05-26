import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
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

export function MediaLightbox({
  items,
  startIndex = 0,
  open,
  onClose,
  title,
}: MediaLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const current = items[index];
  const count = items.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = (next + count) % count;
      setDirection(next > index ? 1 : -1);
      setIndex(wrapped);
      setIsPlaying(false);
    },
    [count, index],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Reset index when reopened
  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [open, startIndex]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " && current?.type === "video") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, next, prev, onClose, current?.type]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const enterFullscreen = () => {
    const el = videoRef.current || containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const variants = useMemo(
    () => ({
      enter: (dir: number) => ({
        x: dir > 0 ? 60 : -60,
        opacity: 0,
        scale: 0.98,
      }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (dir: number) => ({
        x: dir > 0 ? -60 : 60,
        opacity: 0,
        scale: 0.98,
      }),
    }),
    [],
  );

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-label={title ? `${title} media viewer` : "Media viewer"}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Top gradient — visual only */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-24 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none"
          />

          {/* Top-left meta (title + counter) */}
          <div className="absolute top-3 md:top-4 left-4 md:left-6 z-30 flex items-center gap-3 max-w-[calc(100%-12rem)] md:max-w-[calc(100%-16rem)]">
            {title && (
              <p className="text-sm md:text-base font-medium text-white/90 truncate">
                {title}
              </p>
            )}
            {hasMultiple && (
              <span className="shrink-0 text-xs font-mono text-white/80 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
                {index + 1} / {count}
              </span>
            )}
          </div>

          {/* Top-right action cluster — always visible */}
          <div className="absolute top-3 md:top-4 right-4 md:right-6 z-[60] flex items-center gap-2">
            {current.type === "image" && (
              <a
                href={current.src}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Open original"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
            {current.type === "video" && (
              <button
                onClick={enterFullscreen}
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              onClick={onClose}
              type="button"
              className="group inline-flex items-center gap-2 h-11 min-w-[44px] px-3 md:px-4 rounded-full text-white font-semibold text-sm bg-red-500/90 hover:bg-red-600 border-2 border-white/70 hover:border-white backdrop-blur-md shadow-2xl shadow-black/50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black ring-2 ring-white/10"
              aria-label="Close viewer"
              title="Close (Esc)"
            >
              <span className="relative inline-flex items-center justify-center w-5 h-5 transition-transform group-hover:rotate-90">
                <X className="w-5 h-5 absolute inset-0" strokeWidth={2.5} />
                <span aria-hidden className="text-lg leading-none font-bold sr-only">×</span>
              </span>
              <span className="hidden md:inline">Close</span>
              <span className="hidden md:inline text-[10px] font-mono opacity-80 px-1.5 py-0.5 rounded bg-black/30 border border-white/30">
                Esc
              </span>
            </motion.button>
          </div>

          {/* Prev / Next arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full text-white hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full text-white hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Media stage */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 flex items-center justify-center w-full h-full px-4 md:px-20 py-20 md:py-24"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative flex items-center justify-center w-full h-full"
              >
                {current.type === "image" ? (
                  <img
                    src={current.src}
                    alt={current.alt || title || "Media"}
                    draggable={false}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                  />
                ) : (
                  <div className="relative w-full max-w-5xl">
                    <video
                      ref={videoRef}
                      src={current.src}
                      poster={current.poster}
                      controls={false}
                      muted={isMuted}
                      playsInline
                      onClick={togglePlay}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black cursor-pointer"
                    />
                    {/* Custom video overlay controls */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <button
                        onClick={togglePlay}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/15 transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/15 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption */}
          {current.caption && (
            <div className="absolute bottom-24 md:bottom-28 inset-x-0 z-20 flex justify-center px-6 pointer-events-none">
              <p className="max-w-2xl text-center text-xs md:text-sm text-white/80 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5">
                {current.caption}
              </p>
            </div>
          )}

          {/* Thumbnail strip */}
          {hasMultiple && (
            <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-4">
              <div className="flex items-center justify-center gap-2 px-4 overflow-x-auto">
                {items.map((item, i) => (
                  <button
                    key={`${item.src}-${i}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden border-2 transition-all duration-200",
                      i === index
                        ? "border-primary shadow-lg shadow-primary/40 scale-105"
                        : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100",
                    )}
                    aria-label={`Go to media ${i + 1}`}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={item.alt || `Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {item.poster ? (
                          <img
                            src={item.poster}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-4 h-4 text-white drop-shadow-lg ml-0.5" />
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MediaLightbox;
