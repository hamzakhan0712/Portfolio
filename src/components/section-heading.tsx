import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small label above the title, e.g. "About". */
  eyebrow: string;
  icon: LucideIcon;
  /** Rendered as the section's h2. Pass a fragment to accent part of it. */
  title: React.ReactNode;
  /** One line of context under the title. */
  children?: React.ReactNode;
  /**
   * Five sections used to share one centred, full-width header, which made them
   * read as the same screen repeated. Alternating the alignment gives each one
   * its own footing without inventing five separate designs.
   */
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  children,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centred = align === "center";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centred ? "text-center" : "max-w-3xl text-left",
        className,
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
          centred && "justify-center",
        )}
      >
        <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>

      {children && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg",
            centred && "mx-auto max-w-2xl",
          )}
        >
          {children}
        </motion.p>
      )}

      {!centred && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 h-px w-24 origin-left bg-gradient-to-r from-primary to-transparent"
        />
      )}
    </div>
  );
}

export default SectionHeading;
