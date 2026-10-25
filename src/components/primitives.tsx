import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChevronRight, FileText, Mail, type LucideIcon } from "lucide-react";
import { profile } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The small set of building blocks every page is made from — the Fluent
 * equivalents of a Settings page: a title, cards with hairline strokes, and
 * rows that open somewhere. Keeping them here is what keeps the pages
 * consistent without each one re-deciding spacing, type or shape.
 */



/** A vertical band of the page. Windows pages have no stripes — only space. */
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
    <section id={id} className={cn(tight ? "py-10 sm:py-12" : "py-14 sm:py-20", className)}>
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
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}
    >
      <div className="max-w-2xl">
        <h2 className="t-title">{title}</h2>
        {lead && <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{lead}</p>}
      </div>
      {action && (
        <Link to={action.to} className="link-button shrink-0 self-start sm:self-auto">
          {action.label}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** BreadcrumbBar: where this page sits, with every level but the last a link. */
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[14px]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight aria-hidden className="h-3.5 w-3.5 text-tertiary-foreground" />
            )}
            {item.to ? (
              <Link
                to={item.to}
                className="rounded px-1 py-0.5 text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-1 py-0.5 text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The top of an inner page: title, lead and an optional row of tags. */
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
    <header className="container-site pt-10 sm:pt-14">
      {breadcrumb && (
        <div className="mb-4">
          <Breadcrumb items={breadcrumb} />
        </div>
      )}
      <div className="max-w-3xl">
        <h1 className="t-title-lg">{title}</h1>
        {lead && <p className="t-body-lg mt-3">{lead}</p>}
        {meta && <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div>}
        {children}
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

/** Plain-English highlights, each with the accent checkmark. */
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
    <ul className={cn("grid gap-3", columns === 2 && "md:grid-cols-2 md:gap-x-8", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} />
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
 * A row from Windows Settings: an icon, a title, one line of description and,
 * when it goes somewhere, a chevron. Without `to` it is a plain card.
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
        <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-normal leading-6 text-foreground">{title}</span>
        {description && (
          <span className="mt-0.5 block text-[13.5px] leading-5 text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {to && <ChevronRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />}
    </>
  );

  const shape = cn("card flex items-start gap-4 px-5 py-4", className);

  return to ? (
    <Link to={to} className={cn(shape, "card-interactive no-underline")}>
      {body}
    </Link>
  ) : (
    <div className={shape}>{body}</div>
  );
}

/**
 * Pivot / SelectorBar: a row of choices with the accent pill under the chosen
 * one. The pill slides between items, as it does in WinUI.
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
    <div role="radiogroup" aria-label={label} className={cn("flex flex-wrap gap-1", className)}>
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
              "relative h-9 rounded px-3 text-[14px] transition-colors hover:bg-secondary",
              selected
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1.5 text-[12.5px] font-normal text-tertiary-foreground tabular">
                {item.count}
              </span>
            )}
            {selected && (
              <motion.span
                layoutId={`pivot-${label}`}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute bottom-0 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-primary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** The closing card on most pages. */
export function ContactBand({
  title = "Hiring a full-stack engineer?",
  body = "I’m looking for a full-time role where I can own features from the database to the interface. Send me a message — I usually reply within a day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section>
      <div className="card flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <img
            src="/photos/avatar.webp"
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div className="max-w-xl">
            <h2 className="t-subtitle">{title}</h2>
            <p className="mt-1.5 text-[15px] leading-6 text-muted-foreground">{body}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:shrink-0">
          <Link to="/contact" className="btn-accent btn-lg">
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            Send a message
          </Link>
          <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-standard btn-lg">
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
}
