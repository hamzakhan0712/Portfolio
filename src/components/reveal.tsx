import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Motion, the Windows way: content doesn't fade in as it is scrolled to.
 * A page arrives once — the site layout slides it up as it opens — and a
 * list on it staggers in over that same moment, then everything holds still.
 *
 * `Reveal` is kept as a plain wrapper so sections keep their element, id and
 * classes. `RevealList` staggers its items once, on mount.
 */

const EASE = [0.1, 0.9, 0.2, 1] as const;

export function Reveal({
  children,
  as = "div",
  id,
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** "section" keeps landmarks and #anchors working. */
  as?: "div" | "section";
  id?: string;
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export function RevealList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul initial="hidden" animate="shown" variants={list} className={className}>
      {children}
    </motion.ul>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li variants={item} className={className}>
      {children}
    </motion.li>
  );
}
