import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, FileText, type LucideIcon } from "lucide-react";
import { profile } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The small set of building blocks every page is made from. Keeping them here
 * is what keeps the pages consistent — the same curves, the same depth, the
 * same type — without each page re-deciding it.
 */

/** A vertical band of the page. Bands are separated by space, never by lines. */
export function Section({
  children,
  tight = false,
  className,
  id,
}: {
  children: ReactNode;
  tight?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(tight ? "py-10 sm:py-14" : "py-16 sm:py-24", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

/** A section title, an optional one-paragraph lead, and an optional link out. */
export function SectionHeading({
  title,
  lead,
  action,
  className,
}: {
  title: string;
  lead?: ReactNode;
  action?: { to: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}
    >
      <div className="max-w-2xl">
        <h2 className="t-title">{title}</h2>
        {lead && <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{lead}</p>}
      </div>
      {action && (
        <Link to={action.to} className="btn-standard shrink-0 self-start sm:self-auto">
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Where this page sits, with every level but the last a link. */
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[13.5px]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight aria-hidden className="h-3.5 w-3.5 text-tertiary-foreground" />
            )}
            {item.to ? (
              <Link
                to={item.to}
                className="rounded-full px-2 py-0.5 font-medium text-muted-foreground no-underline transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-2 py-0.5 font-medium text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The top of an inner page: title and lead in the aurora light. */
export function PageHeader({
  title,
  lead,
  meta,
  breadcrumb,
  children,
}: {
  title: string;
  lead?: ReactNode;
  meta?: ReactNode;
  breadcrumb?: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate -mt-[68px] overflow-hidden pt-[68px]">
      <div aria-hidden className="aurora opacity-80" />
      <div className="container-site pb-4 pt-12 sm:pt-20">
        {breadcrumb && (
          <div className="mb-5">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <div className="max-w-3xl">
          <h1 className="t-title-lg">{title}</h1>
          {lead && <p className="t-body-lg mt-4">{lead}</p>}
          {meta && <div className="mt-6 flex flex-wrap items-center gap-2">{meta}</div>}
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
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className={tone === "accent" ? "tag-accent" : "tag"}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Plain-English highlights, each with a check in a soft accent circle. */
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
    <ul className={cn("grid gap-3.5", columns === 2 && "md:grid-cols-2 md:gap-x-8", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="text-[15px] leading-6 text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A labelled fact — "Based in / Mumbai" — for details panels. */
export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-3.5 first:pt-0 last:pb-0">
      <dt className="t-caption">{label}</dt>
      <dd className="mt-1 text-[14.5px] leading-6 text-foreground">{children}</dd>
    </div>
  );
}

/**
 * A feature card: an icon in a soft accent tile, a title and a description.
 * With `to` it is a link and rises on hover.
 */
export function SettingsCard({
  icon: Icon,
  title,
  description,
  to,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
  to?: string;
  className?: string;
}) {
  const body = (
    <>
      {Icon && (
        <span className="icon-tile">
          <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold leading-6 text-foreground">{title}</span>
        {description && (
          <span className="mt-1.5 block text-[14px] leading-6 text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {to && (
        <ChevronRight
          aria-hidden
          className="h-5 w-5 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  const shape = cn("card flex items-start gap-4 p-5 sm:p-6", className);

  return to ? (
    <Link to={to} className={cn(shape, "card-interactive group no-underline")}>
      {body}
    </Link>
  ) : (
    <div className={shape}>{body}</div>
  );
}

/**
 * A segmented control: choices on a soft pill track, with the chosen one on a
 * raised pill that glides between them.
 */
export function Pivot<T extends string>({
  label,
  items,
  value,
  onChange,
  className,
}: {
  label: string;
  items: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-secondary p-1",
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative isolate h-9 shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors",
              selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected && (
              <motion.span
                layoutId={`pivot-${label}`}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 -z-10 rounded-full bg-card shadow-rest"
              />
            )}
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1.5 text-[12.5px] text-tertiary-foreground tabular">
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The closing panel on most pages: Microsoft blue, lit from one corner. The
 * gradient stays dark enough under the text for white to pass AA in both
 * themes.
 */
export function ContactBand({
  title = "Hiring a full-stack engineer?",
  body = "I’m looking for a full-time role where I can own features from the database to the interface. Send me a message — I usually reply within a day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section>
      <div className="relative isolate overflow-hidden rounded-4xl bg-[#0050a0] px-6 py-10 text-white shadow-raised sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 90% at 100% 0%, #60cdff 0%, transparent 60%), radial-gradient(50% 80% at 85% 100%, #3b82f6 0%, transparent 60%), linear-gradient(120deg, #003e7e 0%, #0060b8 55%, #0a7ad8 100%)",
          }}
        />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl items-start gap-5">
            <img
              src="/photos/avatar.webp"
              alt=""
              width={64}
              height={64}
              loading="lazy"
              className="hidden h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-white/25 sm:block"
            />
            <div>
              <h2 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2rem]">
                {title}
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-white/85">{body}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Link
              to="/contact"
              className="btn btn-lg bg-white text-[#003e7e] shadow-raised hover:bg-white/90"
            >
              Send a message
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
            >
              <FileText className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
