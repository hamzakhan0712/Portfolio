import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The small set of building blocks every page is made from. Keeping them here
 * is what keeps the pages consistent — the same spacing, the same heading
 * scale, the same buttons — without each page re-deciding it.
 */

/** A full-width band. `tone="surface"` gives the faint grey alternation. */
export function Section({
  children,
  tone = "plain",
  tight = false,
  className,
  id,
}: {
  children: ReactNode;
  tone?: "plain" | "surface";
  tight?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tight ? "section-tight" : "section",
        tone === "surface" && "bg-surface",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

/** Eyebrow, heading and an optional one-paragraph lead, left-aligned. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  action?: { to: string; label: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "items-center text-center sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="heading-section">{title}</h2>
        {lead && <p className="lead mt-4">{lead}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-primary no-underline"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

/** The top of an inner page: eyebrow, title, lead, optional meta row. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-site py-14 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="display">{title}</h1>
          {lead && <p className="lead mt-5">{lead}</p>}
          {meta && <div className="mt-6 flex flex-wrap gap-2">{meta}</div>}
          {children}
        </div>
      </div>
    </header>
  );
}

/** A list of short labels — technologies, skills, subjects. */
export function ChipList({
  items,
  className,
  tone = "default",
}: {
  items: readonly string[];
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item} className={tone === "accent" ? "chip-accent" : "chip"}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A bulleted list with a small accent tick, for plain-English highlights. */
export function CheckList({
  items,
  columns = 1,
  className,
}: {
  items: readonly string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4",
        columns === 2 && "md:grid-cols-2 md:gap-x-10",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="text-[16px] leading-relaxed text-muted-foreground">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A labelled fact — "Based in / Mumbai" — for quick-facts panels. */
export function Fact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <dt className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-[16px] leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}

/** The closing band on most pages. */
export function ContactBand({
  title = "Let’s work together",
  body = "I’m a 2026 graduate looking for my first full-time software engineering role. Send me a message — I usually reply within a day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section tone="surface">
      <div className="card flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="heading-section">{title}</h2>
          <p className="lead mt-3 text-[17px] sm:text-lg">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="/documents/Hamza_Khan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
}

