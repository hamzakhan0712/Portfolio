import { Link } from "react-router-dom";
import { ArrowRight, Building2, Headset, ReceiptText, ShoppingCart } from "lucide-react";
import {
  proofProjects,
  solutionMedia,
  type Solution,
  type SolutionSlug,
} from "@/data/solutions";
import { InViewVideo } from "@/components/in-view-video";
import { getProjectMedia } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A solution, sold.
 *
 * The one place on this site written as an advertisement rather than as
 * documentation — a visitor who runs a business, not a codebase, needs to see
 * their own problem named before any of the rest of it is worth reading.
 *
 * The restraint that keeps it from reading as noise: every picture is the real
 * software, running; the proof is derived from the projects rather than
 * asserted; and no sheet gets a colour of its own — this site spends colour on
 * meaning, so four accent hues would be four lies about state.
 */

const icons: Record<SolutionSlug, typeof Building2> = {
  "real-estate": Building2,
  "call-center": Headset,
  ecommerce: ShoppingCart,
  billing: ReceiptText,
};

/**
 * The long form — one per solution on the solutions page.
 *
 * Everything a buyer asks in the first call, in the order they ask it: what it
 * is, who it is for, what is in it, what it runs on, how it gets delivered,
 * and the thing already running that proves it.
 */
export function SolutionSheet({ solution }: { solution: Solution }) {
  const Icon = icons[solution.slug];
  const proof = proofProjects(solution);
  const media = solutionMedia(solution);
  // Four shots off the systems behind this, in place of the paragraph that
  // used to describe them. A reader scanning the page gets more from these.
  const shots = proof
    .flatMap((project) => getProjectMedia(project))
    .filter((item) => item.type === "image")
    .slice(0, 4);

  return (
    <section
      id={solution.slug}
      className="mt-14 scroll-mt-24 overflow-hidden rounded-xl border border-border first:mt-0"
    >
      <div className="relative">
        <InViewVideo
          src={media.video}
          poster={media.poster}
          alt={`${solution.title} running`}
          className="aspect-[16/7] w-full"
        />
        {/* The title sits on the screenshot, and a screenshot is busy by
            definition — the scrim goes solid well before the text reaches it
            so the heading never has to compete with a chart behind it. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-background via-background/85 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <span className="inline-flex items-center gap-1.5 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm">
            <Icon className="h-3 w-3 text-primary" />
            {solution.domain}
          </span>
          <h3 className="mt-2.5 text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.5rem]">
            {solution.title}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-[15px] leading-relaxed text-foreground/85">
          {solution.tagline}
        </p>

        <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          <div className="bg-background p-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Who it is for
            </dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-foreground/85">
              {solution.audience}
            </dd>
          </div>
          <div className="bg-background p-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              How it is delivered
            </dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-foreground/85">
              {solution.delivery}
            </dd>
          </div>
        </dl>

        {shots.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {shots.map((shot) => (
              <li key={shot.src}>
                <img
                  src={shot.src}
                  alt={shot.alt ?? ""}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-md border border-border object-cover object-top"
                />
              </li>
            ))}
          </ul>
        )}

        <h4 className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          What it includes
        </h4>
        <ul className="mt-2.5 space-y-2">
          {solution.capabilities.map((capability) => (
            <li key={capability} className="flex gap-2.5">
              <span
                aria-hidden
                className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-primary/70"
              />
              <span className="min-w-0 text-[13.5px] leading-relaxed text-muted-foreground">
                {capability}
              </span>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Runs on
        </h4>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {solution.stack.map((item) => (
            <li
              key={item}
              className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* The claim and the receipt sit together deliberately: every line
            above is something one of these systems already does. */}
        <h4 className="mt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Already built and running
        </h4>
        <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {proof.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-border p-2 no-underline transition-colors hover:border-primary/50"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-11 w-16 shrink-0 rounded object-cover object-top"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-foreground">
                    {project.title.split(" — ")[0]}
                  </span>
                  <span className="block font-mono text-[10.5px] text-muted-foreground">
                    {project.video?.duration
                      ? `${project.video.duration} walkthrough`
                      : `${project.media?.length ?? 0} screenshots`}
                  </span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2.5 border-t border-border pt-4">
          <Link
            to="/contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium",
              "text-primary-foreground no-underline transition-opacity hover:opacity-90",
            )}
          >
            Ask about {solution.domain.toLowerCase()}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to={`/projects/${proof[0]?.slug ?? ""}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            See it running
          </Link>
        </div>
      </div>
    </section>
  );
}
