import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mail, Images } from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Callout, H2, P, Pill } from "@/components/docs/prose";
import { API_BASE } from "@/data/docs-nav";
import { routeIndex, systemMetrics } from "@/data/payloads";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The root of the reference.
 *
 * A real API root returns a service index, so this one does too — and the
 * prose spends its first breath saying what the site is, because a visitor who
 * has to work out the conceit before they can read the content has been made
 * to do the author's job.
 */

const rootPayload = {
  name: "Hamza Khan",
  role: "Backend Developer",
  version: "v1",
  status: "open_to_roles",
  based_in: "Mumbai, IN",
  resources: routeIndex.map((route) => `${route.method} ${route.path}`),
};

export default function Overview() {
  return (
    <DocsPage
      aside={
        <CodePanel method="GET" path="/" response={rootPayload} />
      }
    >
      <header className="mb-10">
        <div className="flex items-start gap-5 sm:gap-7">
          {/* The one large portrait on the site. It sits on the root page
              because that is where a reader decides whether to keep reading,
              and a face does more for that than another paragraph. */}
          <div className="relative shrink-0">
            <img
              src="/photos/portrait.webp"
              alt="Hamza Khan"
              width={288}
              height={384}
              /* React 18 does not map the camelCase prop; spread the real
                 lowercase attribute so the LCP hint reaches the DOM. */
              {...{ fetchpriority: "high" }}
              className="aspect-[3/4] w-24 rounded-xl object-cover object-top ring-1 ring-border sm:w-36"
            />
            <span
              aria-hidden
              className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-background bg-ok"
            />
          </div>

          <div className="min-w-0 pt-0.5">
            <h1 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.25rem] md:text-[2.5rem]">
              Hamza Khan
            </h1>
            <p className="mt-1.5 font-mono text-[12.5px] text-primary sm:text-[13px]">
              Backend Developer · Mumbai, IN
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              <Pill tone="ok">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                open to roles
              </Pill>
              <Pill>4 yrs freelance</Pill>
              <Pill>Django · PostgreSQL · Azure</Pill>
            </div>
          </div>
        </div>

        <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
          I build backend systems that run in production. Four years of freelance
          project experience writing Django web applications, REST APIs and
          real-time WebSocket services backed by PostgreSQL — for clients in
          India and Germany.
        </p>

        {/* The three things anyone actually comes here for, above the fold. */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13.5px] font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            <Images className="h-4 w-4" />
            See my work
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-[13.5px] font-medium text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </Link>
          <a
            href="/documents/Hamza_Khan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-[13.5px] font-medium text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <FileText className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </header>

      <Callout tone="ai" title="New here? Read this first">
        This site is laid out like the technical manual for a piece of software
        — because writing that kind of software is the job. Each page has the
        plain-English version on the left and the code version on the right.
        <strong> If the code panels mean nothing to you, ignore them.</strong>{" "}
        Nothing is hidden in there; everything is written out in words too.
      </Callout>

      <H2>At a glance</H2>
      <P>
        Six numbers, each with the thing it comes from written underneath. A
        figure nobody can trace back to a document does not belong on a page
        like this.
      </P>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {systemMetrics.map((metric) => (
          <div key={metric.label} className="bg-background p-4">
            <dd className="text-[1.35rem] font-semibold leading-none tracking-tight text-foreground tabular">
              {metric.value}
            </dd>
            <dt className="mt-2 text-[12.5px] font-medium text-foreground/80">
              {metric.label}
            </dt>
            <p className="mt-0.5 font-mono text-[10.5px] leading-snug text-muted-foreground/80">
              {metric.source}
            </p>
          </div>
        ))}
      </dl>

      <H2>What is here</H2>
      <P>
        Six pages. Pick whichever answers your question — or use the sidebar,
        which lists every project by name.
      </P>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {routeIndex.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="group flex items-center gap-3 px-4 py-3 no-underline transition-colors hover:bg-secondary/50"
            >
              <span
                className={cn(
                  "method",
                  route.method === "GET" ? "method-get" : "method-post",
                )}
              >
                {route.method}
              </span>
              <span className="shrink-0 font-mono text-[13px] font-medium text-foreground">
                {route.path}
              </span>
              <span className="hidden min-w-0 flex-1 truncate text-[13px] text-muted-foreground sm:block">
                {route.summary}
              </span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>

      <H2>Where to start</H2>
      <P>
        If you have two minutes, look at{" "}
        <Link to={`/projects/${projects[0].slug}`}>
          {projects[0].title.split(" — ")[0]}
        </Link>{" "}
        — the biggest thing here, and the only one I built from top to bottom on
        my own.{" "}
        {projects[0].video?.duration
          ? `There is a ${projects[0].video.duration} video walkthrough on the page.`
          : "The page has screenshots of it running."}
      </P>
      <P>
        If you are hiring, <Link to="/experience">Experience</Link> has the
        jobs and the qualifications, and{" "}
        <Link to="/errors">What I don&apos;t do</Link> is the honest other half
        — the things I have not worked with, said out loud.
      </P>
    </DocsPage>
  );
}
