import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  Play,
} from "lucide-react";
import {
  CheckList,
  ChipList,
  ContactBand,
  Fact,
  PageHeader,
  Section,
} from "@/components/primitives";
import ArchitectureOverview from "@/components/architecture-overview";
import InViewVideo from "@/components/in-view-video";
import MediaLightbox from "@/components/media-lightbox";
import { getProjectBySlug, projects } from "@/data/projects";
import { mediaTransitionName } from "@/lib/view-transition";
import { usePageTitle } from "@/lib/page-title";

/**
 * One project.
 *
 * Every project page has the same sections: walkthrough, overview, the
 * problem and what was built, key features, features in action, screenshots
 * and architecture. Sections without content are left out.
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  usePageTitle(project ? project.name : "Not found");

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const screenshots = project?.gallery ?? [];

  if (!project) {
    return (
      <>
        <PageHeader
          eyebrow="Projects"
          title="No such project"
          lead="The link may be out of date."
        />
        <Section>
          <p className="prose-plain">
            All projects are listed under{" "}
            <Link to="/projects">Projects</Link>.
          </p>
        </Section>
      </>
    );
  }

  const { name } = project;
  const clips = project.features.filter((feature) => feature.video);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <>
      <PageHeader
        eyebrow="Project"
        title={name}
        lead={project.headline ?? project.summary}
        meta={
          <>
            <span className="chip-accent">{project.kind}</span>
            {project.year && <span className="chip">{project.year}</span>}
            {project.video?.duration && (
              <span className="chip">
                <Play className="h-3 w-3 fill-current" />
                {project.video.duration} walkthrough
              </span>
            )}
          </>
        }
      />

      <Section>
        {/* Hero media. The poster pairs with the card thumbnail in the view
            transition, so the image the visitor clicked grows into this. */}
        {project.video?.src ? (
          <figure>
            <video
              controls
              preload="none"
              poster={project.video.poster ?? project.poster}
              src={project.video.src}
              style={{ viewTransitionName: mediaTransitionName(project.slug) }}
              className="w-full rounded-2xl border border-border bg-black"
            />
            <figcaption className="mt-3 text-[14.5px] text-muted-foreground">
              Video walkthrough of the project.
            </figcaption>
          </figure>
        ) : project.poster ? (
          <img
            src={project.poster}
            alt={`${name} screenshot`}
            style={{ viewTransitionName: mediaTransitionName(project.slug) }}
            className="w-full rounded-2xl border border-border object-cover"
          />
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <h2 className="heading-section">Overview</h2>
            <div className="prose-plain mt-6">
              {project.description.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {project.challenge && project.solution && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="card p-6">
                  <h3 className="text-[16px] font-semibold text-foreground">
                    The problem
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="text-[16px] font-semibold text-foreground">
                    What I built
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {project.highlights.length > 0 && (
              <>
                <h2 className="heading-section mt-16">Key features</h2>
                <CheckList items={project.highlights} className="mt-6" />
              </>
            )}

            {clips.length > 0 && (
              <>
                <h2 className="heading-section mt-16">Features in action</h2>
                <p className="lead mt-3 text-[17px]">
                  Short clips of the app doing the work.
                </p>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {clips.map((feature) => (
                    <li key={feature.video} className="card overflow-hidden">
                      <InViewVideo
                        src={feature.video ?? null}
                        poster={feature.poster ?? project.poster ?? ""}
                        alt={feature.title}
                        className="aspect-video w-full border-b border-border"
                      />
                      <div className="p-5">
                        <h3 className="text-[16px] font-semibold leading-snug text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                          {feature.benefit}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {screenshots.length > 0 && (
              <>
                <h2 className="heading-section mt-16">Screenshots</h2>
                <p className="lead mt-3 text-[17px]">
                  Select any screenshot to open it full size.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {screenshots.map((item, i) => (
                    <li key={item.src}>
                      <button
                        type="button"
                        onClick={() => setLightbox({ open: true, index: i })}
                        aria-label={item.alt || `Screenshot ${i + 1}`}
                        className="group relative block w-full overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/50"
                      >
                        <img
                          src={item.src}
                          alt={item.alt ?? ""}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
                          <Maximize2 className="h-5 w-5 text-white" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.architecture && (
              <>
                <h2 className="heading-section mt-16">Architecture</h2>
                <div className="mt-6">
                  <ArchitectureOverview architecture={project.architecture} />
                </div>
              </>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <dl className="divide-y divide-border">
                <Fact label="Type">{project.kind}</Fact>
                {project.platform && (
                  <Fact label="Platform">{project.platform}</Fact>
                )}
                {project.industry && (
                  <Fact label="Industry">{project.industry}</Fact>
                )}
                {project.year && <Fact label="Year">{project.year}</Fact>}
                {project.role && <Fact label="My role">{project.role}</Fact>}
                {project.audience.length > 0 && (
                  <Fact label="Built for">
                    <ul className="mt-1 space-y-1">
                      {project.audience.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Fact>
                )}
                <Fact label="Tech stack">
                  <ChipList items={project.tags} className="mt-1" />
                </Fact>
                {project.liveUrl && (
                  <Fact label="Live site">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-primary no-underline hover:underline"
                    >
                      {new URL(project.liveUrl).hostname.replace(/^www\./, "")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Fact>
                )}
              </dl>
            </div>

          </aside>
        </div>
      </Section>

      {/* Previous / next, so the work can be read straight through. */}
      <Section tight tone="surface" className="border-t border-border">
        <nav
          aria-label="Other projects"
          className="grid gap-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              to={`/projects/${previous.slug}`}
              className="card card-hover group flex items-center gap-4 p-4 no-underline"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
              <span className="min-w-0">
                <span className="block text-[12.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Previous
                </span>
                <span className="block truncate text-[16px] font-semibold text-foreground">
                  {previous.name}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="card card-hover group flex items-center justify-end gap-4 p-4 text-right no-underline"
            >
              <span className="min-w-0">
                <span className="block text-[12.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  Next
                </span>
                <span className="block truncate text-[16px] font-semibold text-foreground">
                  {next.name}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </nav>
      </Section>

      <ContactBand />

      <MediaLightbox
        items={screenshots}
        open={lightbox.open}
        startIndex={lightbox.index}
        title={name}
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </>
  );
}
