import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/**
 * Runs a navigation inside a View Transition so the project thumbnail morphs
 * into the detail page's hero instead of the page simply swapping.
 *
 * `flushSync` is the whole trick: the browser snapshots the DOM when the
 * callback returns, so React has to have committed the new route by then. A
 * normal `navigate()` would schedule the update for after the snapshot and the
 * transition would capture the old page twice.
 *
 * Falls back to a plain update where the API is missing (Firefox at time of
 * writing) or where the visitor has asked for reduced motion.
 */
export function navigateWithTransition(update: () => void): void {
  const doc = document as ViewTransitionDocument;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (typeof doc.startViewTransition !== "function" || prefersReducedMotion) {
    update();
    return;
  }

  doc.startViewTransition(() => {
    flushSync(update);
  });
}

/**
 * The shared name that pairs a card's thumbnail with the hero it becomes.
 * Must be unique within a document — one card per slug on the index, one hero
 * on the detail page.
 */
export const mediaTransitionName = (slug: string) => `media-${slug}`;
