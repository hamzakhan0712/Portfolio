import type { ReactNode } from "react";
import { Link } from "lucide-react";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

/**
 * Typographic primitives for the reference pages.
 *
 * Every page is built out of these rather than raw Tailwind, so the vertical
 * rhythm is decided once. A reference that changes its heading size from page
 * to page reads as a set of unrelated documents.
 */

export function PageHeader({
  method,
  path,
  title,
  lead,
  meta,
}: {
  method?: "GET" | "POST";
  path?: string;
  title: string;
  lead?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="mb-10">
      {(method || path) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {method && (
            <span
              className={cn(
                "method",
                method === "GET" ? "method-get" : "method-post",
              )}
            >
              {method}
            </span>
          )}
          {path && (
            <code className="font-mono text-[12.5px] text-muted-foreground">
              {path}
            </code>
          )}
        </div>
      )}

      <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] md:text-[2.4rem]">
        {title}
      </h1>

      {lead && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}

      {meta && <div className="mt-5 flex flex-wrap gap-2">{meta}</div>}
    </header>
  );
}

export function H2({ children }: { children: string }) {
  const id = slugify(children);
  return (
    <h2
      id={id}
      className="group mt-14 scroll-mt-24 border-t border-border pt-8 text-[1.35rem] font-semibold tracking-[-0.02em] first:mt-0 first:border-t-0 first:pt-0"
    >
      <a href={`#${id}`} className="no-underline">
        {children}
        <Link
          aria-hidden
          className="ml-2 inline h-3.5 w-3.5 align-baseline text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </a>
    </h2>
  );
}

export function H3({ children }: { children: string }) {
  const id = slugify(children);
  return (
    <h3
      id={id}
      className="mt-9 scroll-mt-24 text-[1.05rem] font-semibold tracking-[-0.01em]"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 first:mt-0">{children}</p>;
}

/** A short lead-in under a heading, slightly larger than body copy. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[16px] leading-relaxed text-foreground/80">
      {children}
    </p>
  );
}

export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: "note" | "ok" | "warn" | "ai";
  title?: string;
  children: ReactNode;
}) {
  const border = {
    note: "border-l-border border-border",
    ok: "border-l-ok border-ok/25",
    warn: "border-l-warn border-warn/25",
    ai: "border-l-ai border-ai/25",
  }[tone];

  return (
    <aside className={cn("callout my-6", border)}>
      {title && (
        <p className="mb-1 font-semibold text-foreground">{title}</p>
      )}
      <div className="text-muted-foreground">{children}</div>
    </aside>
  );
}

/* ── Schema tables ─────────────────────────────────────────────────────── */

export function PropList({ children }: { children: ReactNode }) {
  return <dl className="mt-6">{children}</dl>;
}

export function Prop({
  name,
  type,
  required,
  children,
}: {
  name: string;
  type: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="prop">
      <dt className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="prop-name">{name}</span>
        <span className="prop-type">{type}</span>
        {required && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-warn">
            required
          </span>
        )}
      </dt>
      <dd className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {children}
      </dd>
    </div>
  );
}

/* ── Small pieces ──────────────────────────────────────────────────────── */

export function Pill({
  children,
  tone = "idle",
}: {
  children: ReactNode;
  tone?: "idle" | "ok" | "warn" | "err" | "ai";
}) {
  return <span className={cn("status", `status-${tone}`)}>{children}</span>;
}

/** A flat list of technologies — used wherever a tag cloud would be noise. */
export function TagRow({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-[11.5px] text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * A photograph with its caption.
 *
 * Portraits are rationed on this site — one per page at most, and only where
 * the page is genuinely about the person. A reference that breaks its own
 * column rhythm for decoration stops reading as a reference.
 */
export function Figure({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full object-cover" />
      {caption && (
        <figcaption className="border-t border-border px-3 py-2 font-mono text-[10.5px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary/70"
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
