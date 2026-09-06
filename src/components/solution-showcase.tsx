import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Headset, Play, ReceiptText, ShoppingCart } from "lucide-react";
import { solutions, solutionMedia, type SolutionSlug } from "@/data/solutions";
import { cn } from "@/lib/utils";

/**
 * The first thing on the site: the software, moving.
 *
 * Most people will not read a paragraph to find out whether someone can build
 * what they need — they will look. So the top of this site is a reel of the
 * four systems actually running, and the words around it are cut back to the
 * few a picture cannot carry: which industry it is for, and what it is called.
 *
 * One clip is mounted at a time, so the page costs one short video rather than
 * four. When it ends the reel moves on by itself; under a reduced-motion
 * preference nothing plays or advances and the posters stand in, because an
 * auto-advancing video is exactly what that preference is asking us not to do.
 */

const icons: Record<SolutionSlug, typeof Building2> = {
  "real-estate": Building2,
  "call-center": Headset,
  ecommerce: ShoppingCart,
  billing: ReceiptText,
};

export function SolutionShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const solution = solutions[active];
  const media = solutionMedia(solution);
  const Icon = icons[solution.slug];

  const advance = () => setActive((index) => (index + 1) % solutions.length);

  // Switching tabs remounts the element, and a remounted <video> with autoPlay
  // does not always start in every browser — asking explicitly is cheap, and a
  // rejected promise here only means the poster stays up, which is fine.
  useEffect(() => {
    if (reduceMotion) return;
    videoRef.current?.play().catch(() => {});
  }, [active, reduceMotion]);

  return (
    <section aria-label="What I build" className="not-prose">
      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/40">
        {media.video && !reduceMotion ? (
          <video
            key={solution.slug}
            ref={videoRef}
            src={media.video}
            poster={media.poster}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={advance}
            aria-label={`${solution.title} running`}
            className="aspect-[16/10] w-full bg-black object-cover sm:aspect-[16/8]"
          />
        ) : (
          <img
            src={media.poster}
            alt={`${solution.title} screenshot`}
            className="aspect-[16/10] w-full object-cover object-top sm:aspect-[16/8]"
          />
        )}

        {/* Two scrims, because one cannot do both jobs. The flat wash is
            weak enough to leave the software readable but guarantees the
            caption never lands on a frame that happens to be the same colour
            as it; the bottom ramp then goes solid under the text itself. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background from-45% via-background/80 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <span className="inline-flex items-center gap-1.5 rounded bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm">
            <Icon className="h-3 w-3 text-primary" />
            {solution.domain}
          </span>

          <h2 className="mt-2.5 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.9rem]">
            {solution.title}
          </h2>
          <p className="mt-1.5 max-w-[46ch] text-[13.5px] leading-snug text-muted-foreground sm:text-[15px]">
            {solution.tagline}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Link
              to={`/solutions#${solution.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
            >
              What it does
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {media.slug && media.walkthrough && (
              <Link
                to={`/projects/${media.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3.5 py-2 text-[13px] font-medium text-foreground no-underline backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                <Play className="h-3 w-3 fill-current" />
                {media.walkthrough} walkthrough
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* The four domains as pictures, not as a list of words. */}
      <div role="tablist" aria-label="Domains" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {solutions.map((item, index) => {
          const TabIcon = icons[item.slug];
          const selected = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className={cn(
                "group relative overflow-hidden rounded-lg border text-left transition-colors",
                selected
                  ? "border-primary"
                  : "border-border hover:border-primary/40",
              )}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className={cn(
                  "aspect-[16/9] w-full object-cover object-top transition-opacity",
                  selected ? "opacity-100" : "opacity-45 group-hover:opacity-75",
                )}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-2">
                <TabIcon
                  className={cn(
                    "h-3 w-3 shrink-0",
                    selected ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span className="truncate font-mono text-[10px] uppercase tracking-wider text-foreground">
                  {item.domain}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionShowcase;
