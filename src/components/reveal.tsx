import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Scroll reveals.
 *
 * Content rises a short way and fades in as it enters the window — once, so
 * scrolling back up never replays it. The curve is Fluent's "decelerate max":
 * fast at the start, settling gently, so nothing feels like it is waiting.
 *
 * The app's MotionConfig is set to reducedMotion="user", so under a
 * reduced-motion preference the movement is dropped and only the fade
 * remains.
 */

const EASE = [0.1, 0.9, 0.2, 1] as const;

/** Starts a little before the element is fully on screen. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/* The delay travels through `custom`: a variant's own transition wins over
   the component's, so a `transition` prop would be ignored. */
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

/* List items set no delay of their own, so the parent's stagger decides it. */
const riseItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** One block that rises into view. */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  id,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** "section" keeps landmarks and #anchors working on revealed blocks. */
  as?: "div" | "section";
  id?: string;
  className?: string;
}) {
  const Tag = as === "section" ? motion.section : motion.div;
  return (
    <Tag
      id={id}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={rise}
      custom={delay}
      className={className}
    >
      {children}
    </Tag>
  );
}

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/**
 * A list whose items rise in one after another. Use RevealItem for its
 * children; the stagger is short so a long grid never keeps anyone waiting.
 */
export function RevealList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={list}
      className={className}
    >
      {children}
    </motion.ul>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li variants={riseItem} className={className}>
      {children}
    </motion.li>
  );
}
