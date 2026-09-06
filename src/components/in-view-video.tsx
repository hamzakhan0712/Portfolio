import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A muted clip that plays while it is on screen and stops when it is not.
 *
 * Hover would be the obvious trigger and the wrong one — half the visitors are
 * on a phone and have no hover to give. Visibility is the honest signal: if
 * the clip is in front of someone, it plays.
 *
 * Nothing is fetched until it is needed (`preload="none"`, `src` withheld
 * until the first intersection), so a page of these costs the poster images
 * until the reader actually scrolls to one. Under a reduced-motion preference
 * it stays a still, which is what that preference is asking for.
 */
export function InViewVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string | null;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !src || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [src, reduceMotion]);

  if (!src || reduceMotion) {
    return (
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        className={cn("object-cover object-top", className)}
      />
    );
  }

  return (
    <video
      ref={ref}
      // Withheld until the first intersection: an unset src downloads nothing.
      src={armed ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      className={cn("bg-black object-cover", className)}
    />
  );
}

export default InViewVideo;
