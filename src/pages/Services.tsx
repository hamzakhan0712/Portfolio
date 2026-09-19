import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import {
  CheckList,
  ChipList,
  ContactBand,
  PageHeader,
  Section,
} from "@/components/primitives";
import { InViewVideo } from "@/components/in-view-video";
import { projectName } from "@/lib/project-name";
import { engagementSteps } from "@/data/site";
import {
  proofProjects,
  solutionMedia,
  solutions,
  type Solution,
} from "@/data/solutions";
import { usePageTitle } from "@/lib/page-title";
import { serviceIcons } from "@/lib/service-icons";

/**
 * The work as an offer.
 *
 * Nothing on this page is a capability that has not shipped: every line
 * under "What is included" is something the system behind it already does,
 * and that system is linked at the end of each section.
 */

function ServiceSection({ solution }: { solution: Solution }) {
  const Icon = serviceIcons[solution.slug];
  const proof = proofProjects(solution);
  const media = solutionMedia(solution);

  return (
    <section id={solution.slug} className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 sm:py-20 sm:first:pt-0">
      <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
        <Icon className="h-4 w-4" />
        {solution.domain}
      </p>
      <h2 className="heading-section mt-3">{solution.title}</h2>
      <p className="lead mt-4 max-w-3xl">{solution.tagline}</p>

      <div className="card mt-8 overflow-hidden">
        <InViewVideo
          src={media.video}
          poster={media.poster}
          alt={`${solution.title} running`}
          className="aspect-[16/8] w-full"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <h3 className="heading-sub">What is included</h3>
          <CheckList items={solution.capabilities} className="mt-6" />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Who it is for
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground">
              {solution.audience}
            </p>

            <h3 className="mt-6 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              How it is delivered
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground">
              {solution.delivery}
            </p>

            <h3 className="mt-6 text-[14px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Built with
            </h3>
            <ChipList items={solution.stack} className="mt-3" />
          </div>

          <div className="card p-6">
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Already built and running
            </h3>
            <ul className="mt-3 space-y-2">
              {proof.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border p-2.5 no-underline transition-colors hover:border-primary/40 hover:bg-surface"
                  >
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt=""
                        loading="lazy"
                        className="h-12 w-[4.5rem] shrink-0 rounded-lg object-cover object-top"
                      />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-medium text-foreground">
                        {projectName(project)}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground">
                        {project.video?.duration ? (
                          <>
                            <Play className="h-3 w-3 fill-current" />
                            {project.video.duration} walkthrough
                          </>
                        ) : (
                          `${project.media?.length ?? 0} screenshots`
                        )}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-5 w-full">
              Ask about {solution.domain.toLowerCase()}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Services() {
  usePageTitle("Services");

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What I can build for your business"
        lead={`${solutions.length} systems that already exist and run today, ready to be set up for another business. These are not proposals — every line on this page is something the software already does.`}
      />

      <Section tight tone="surface" className="border-b border-border">
        <ol className="grid gap-6 md:grid-cols-3">
          {engagementSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-accent-foreground tabular">
                {index + 1}
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <nav aria-label="Services on this page" className="mb-14 flex flex-wrap gap-2">
          {solutions.map((solution) => {
            const Icon = serviceIcons[solution.slug];
            return (
              <a key={solution.slug} href={`#${solution.slug}`} className="chip py-1.5 no-underline transition-colors hover:border-primary/40 hover:text-primary">
                <Icon className="h-3.5 w-3.5" />
                {solution.domain}
              </a>
            );
          })}
        </nav>

        <div>
          {solutions.map((solution) => (
            <ServiceSection key={solution.slug} solution={solution} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="heading-sub">Something close, but not quite?</h2>
          <p className="prose-plain mt-3 max-w-3xl">
            A rental desk rather than co-living, inbound support rather than
            outbound sales, a distributor rather than a trader — the shape carries
            over, and the difference is fields and rules rather than a rewrite.
            See the <Link to="/projects">full project list</Link>, read about{" "}
            <Link to="/about#gaps">the limits of what I do</Link>, or{" "}
            <Link to="/contact">tell me what you are running today</Link>.
          </p>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
