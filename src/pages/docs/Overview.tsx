import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Pill } from "@/components/docs/prose";
import { SolutionShowcase } from "@/components/solution-showcase";
import { ProjectWall } from "@/components/project-wall";
import { routeIndex, systemMetrics } from "@/data/payloads";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

/**
 * The root of the reference.
 *
 * Built around a plain observation about how people arrive: they look before
 * they read, and most never get to the reading. So the page opens on the
 * software running, then on every system as a picture, and the prose that used
 * to sit here is gone rather than shortened — the pages it pointed at say the
 * same things in their own words, one click away.
 *
 * What survived is what a picture genuinely cannot carry: a name, a role, a
 * way to make contact, and six numbers that each name their own source.
 */

const rootPayload = {
  name: "Hamza Khan",
  role: "Backend Developer",
  version: "v1",
  status: "open_to_roles",
  based_in: "Mumbai, IN",
  builds_for: solutions.map((solution) => solution.domain.toLowerCase()),
  resources: routeIndex.map((route) => `${route.method} ${route.path}`),
};

/** A label on a picture — not a prose heading, so it takes no lead paragraph. */
function SectionLabel({
  children,
  action,
}: {
  children: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="mt-12 flex items-baseline justify-between gap-4 border-t border-border pt-7">
      <h2 className="text-[1.1rem] font-semibold tracking-[-0.02em]">
        {children}
      </h2>
      {action && (
        <Link
          to={action.to}
          className="shrink-0 whitespace-nowrap text-[12.5px] font-medium text-primary no-underline"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export default function Overview() {
  return (
    <DocsPage aside={<CodePanel method="GET" path="/" response={rootPayload} />}>
      {/* One row, not a hero. Everything here is identification; the case for
          the work is made by the reel underneath, which is the point. */}
      <header className="mb-5 flex items-center gap-3">
        <img
          src="/photos/portrait.webp"
          alt="Hamza Khan"
          width={288}
          height={384}
          /* React 18 does not map the camelCase prop; spread the real
             lowercase attribute so the LCP hint reaches the DOM. */
          {...{ fetchpriority: "high" }}
          className="h-11 w-11 shrink-0 rounded-full object-cover object-top ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.35rem]">
            Hamza Khan
          </h1>
          <p className="truncate font-mono text-[11.5px] text-primary">
            Backend Developer · Mumbai, IN
          </p>
        </div>
        <Pill tone="ok">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          open to work
        </Pill>
      </header>

      <SolutionShowcase />

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          All four, in detail
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
        >
          <Mail className="h-3.5 w-3.5" />
          Get in touch
        </Link>
        <a
          href="/documents/Hamza_Khan_CV.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
        >
          <FileText className="h-3.5 w-3.5" />
          CV
        </a>
      </div>

      <SectionLabel action={{ to: "/projects", label: `All ${projects.length}` }}>
        Everything I have shipped
      </SectionLabel>
      <div className="mt-4">
        <ProjectWall />
      </div>

      <SectionLabel>By the numbers</SectionLabel>
      <dl className="not-prose mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {systemMetrics.map((metric) => (
          <div key={metric.label} className="bg-background p-3.5">
            <dd className="text-[1.3rem] font-semibold leading-none tracking-tight text-foreground tabular">
              {metric.value}
            </dd>
            <dt className="mt-1.5 text-[12px] font-medium text-foreground/80">
              {metric.label}
            </dt>
            {/* The source stays. A number nobody can trace is decoration, and
                decoration is the one thing this page cannot afford. */}
            <p className="mt-0.5 font-mono text-[10px] leading-snug text-muted-foreground/80">
              {metric.source}
            </p>
          </div>
        ))}
      </dl>

      <SectionLabel>The rest of the site</SectionLabel>
      <ul className="not-prose mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {routeIndex.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="group flex items-center gap-3 px-4 py-2.5 no-underline transition-colors hover:bg-secondary/50"
            >
              <span
                className={cn(
                  "method",
                  route.method === "GET" ? "method-get" : "method-post",
                )}
              >
                {route.method}
              </span>
              <span className="shrink-0 font-mono text-[12.5px] font-medium text-foreground">
                {route.path}
              </span>
              <span className="hidden min-w-0 flex-1 truncate text-[12.5px] text-muted-foreground sm:block">
                {route.summary}
              </span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </DocsPage>
  );
}
