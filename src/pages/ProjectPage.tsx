import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
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
import { projectKind, projectName } from "@/lib/project-name";
import ArchitectureOverview from "@/components/architecture-overview";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import { getProjectBySlug, getProjectMedia, projects } from "@/data/projects";
import { solutionsForProject } from "@/data/solutions";
import { mediaTransitionName } from "@/lib/view-transition";
import { usePageTitle } from "@/lib/page-title";

/**
 * One project.
 *
 * The sections are the same across all ten so they can be compared, and they
 * are ordered for someone who cannot read a technology list: the video and
 * the screenshots come before anything technical, because seeing the
 * software work is the evidence that needs no translation.
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const offers = slug ? solutionsForProject(slug) : [];

  usePageTitle(project ? projectName(project) : "Not found");

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // The walkthrough is already the hero player; showing it again as a
  // gallery tile would show the same thing twice.
  const screenshots: MediaItem[] = useMemo(
    () =>
      project
        ? getProjectMedia(project).filter((item) => item.type === "image")
        : [],
    [project],
  );

  if (!project) {
    return (
      <>
        <PageHeader
          eyebrow="Work"
          title="No such project"
          lead="The link may be out of date."
        />
        <Section>
          <p className="prose-plain">
            Everything I have built is listed under{" "}
            <Link to="/projects">Work</Link>.
          </p>
        </Section>
      </>
    );
  }

  const name = projectName(project);
  const kind = projectKind(project);
  const paragraphs = project.description
    .split("\n\n")
    .map((text) => text.trim())
    .filter(Boolean);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <>
      <PageHeader
        eyebrow={`Work · ${project.category === "product" ? "My own product" : "Built for a client"}`}
        title={name}
        lead={project.summary}
        meta={
          <>
            {kind && <span className="chip-accent">{kind}</span>}
            <span className="chip">{project.urltext}</span>
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
        {project.video ? (
          <figure>
            <video
              controls
              preload="none"
              poster={project.video.poster ?? project.imageUrl}
              src={project.video.src}
              style={{ viewTransitionName: mediaTransitionName(project.slug) }}
              className="w-full rounded-2xl border border-border bg-black"
            />
            <figcaption className="mt-3 text-[14.5px] text-muted-foreground">
              A recorded walkthrough of the software running — the quickest way
              to see what it does.
            </figcaption>
          </figure>
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${name} screenshot`}
            style={{ viewTransitionName: mediaTransitionName(project.slug) }}
            className="w-full rounded-2xl border border-border object-cover"
          />
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <h2 className="heading-section">About this project</h2>
            <div className="prose-plain mt-6">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <>
                <h2 className="heading-section mt-16">What it does</h2>
                <CheckList items={project.highlights} className="mt-6" />
              </>
            )}

            {screenshots.length > 0 && (
              <>
                <h2 className="heading-section mt-16">Screenshots</h2>
                <p className="lead mt-3 text-[17px]">
                  {screenshots.length} captures of the real software. Select any
                  to open it full size.
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
                <h2 className="heading-section mt-16">Under the hood</h2>
                <p className="lead mt-3 text-[17px]">
                  For the technical reader: the parts below are listed in the
                  order a request travels through them, from what you click
                  down to where the data is stored.
                </p>
                <div className="mt-6">
                  <ArchitectureOverview architecture={project.architecture} />
                </div>
              </>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <dl className="divide-y divide-border">
                <Fact label="Type of work">
                  {project.category === "product"
                    ? "My own product — idea, design and code, end to end"
                    : "Built for a client, to their brief and their brand"}
                </Fact>
                <Fact label="Where it runs">{project.urltext}</Fact>
                {project.role && <Fact label="My role">{project.role}</Fact>}
                <Fact label="Built with">
                  <ChipList items={project.tags} className="mt-1" />
                </Fact>
                <Fact label="Can you see it live?">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-primary no-underline hover:underline"
                    >
                      Yes — {project.urltext}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">
                      Not publicly ({project.urltext}). The screenshots and
                      walkthrough above are of the real thing running.
                    </span>
                  )}
                </Fact>
              </dl>
            </div>

            {offers.length > 0 && (
              <div className="card border-primary/20 bg-accent/40 p-6">
                <h3 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-accent-foreground">
                  Available for your business
                </h3>
                <ul className="mt-3 space-y-3">
                  {offers.map((offer) => (
                    <li key={offer.slug}>
                      <Link
                        to={`/services#${offer.slug}`}
                        className="group inline-flex items-center gap-1.5 text-[15.5px] font-semibold text-foreground no-underline hover:text-primary"
                      >
                        {offer.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                        {offer.tagline}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="card p-6">
              <p className="flex items-start gap-3 text-[14.5px] leading-relaxed text-muted-foreground">
                <Lock className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                <span>
                  <strong className="font-semibold text-foreground">
                    The code is private.
                  </strong>{" "}
                  {project.category === "product"
                    ? "This is a product of mine that has not been released, so the code stays closed."
                    : "This was paid work, so the code belongs to the client and stays closed."}{" "}
                  I am glad to walk through it on a call —{" "}
                  <Link to="/contact" className="font-medium text-primary">
                    get in touch
                  </Link>
                  .
                </span>
              </p>
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
                  {projectName(previous)}
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
                  {projectName(next)}
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
