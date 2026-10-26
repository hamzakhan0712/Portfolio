import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, Play } from "lucide-react";
import {
  CheckList,
  ChipList,
  ContactBand,
  Fact,
  PageHeader,
  Section,
} from "@/components/primitives";
import { AppWindow } from "@/components/app-window";
import ArchitectureOverview from "@/components/architecture-overview";
import InViewVideo from "@/components/in-view-video";
import MediaLightbox from "@/components/media-lightbox";
import { Reveal } from "@/components/reveal";
import { getProjectBySlug, projects } from "@/data/projects";
import { mediaTransitionName } from "@/lib/view-transition";
import { usePageTitle } from "@/lib/page-title";

/**
 * One project.
 *
 * Every project page has the same sections: walkthrough, overview, the
 * problem and what was built, key features, features in action, screenshots
 * and architecture. Sections without content are left out, and so are their
 * entries in the "On this page" list.
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  usePageTitle(project ? project.name : "Not found");

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  if (!project) {
    return (
      <>
        <PageHeader
          breadcrumb={[{ label: "Projects", to: "/projects" }, { label: "Not found" }]}
          title="No such project"
          lead="The link may be out of date."
        />
        <Section>
          <Link to="/projects" className="btn-standard">
            <ChevronLeft className="h-4 w-4" />
            All projects
          </Link>
        </Section>
      </>
    );
  }

  const { name } = project;
  const screenshots = project.gallery;
  const clips = project.features.filter((feature) => feature.video);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  const contents = [
    { id: "overview", label: "Overview", show: true },
    { id: "features", label: "Key features", show: project.highlights.length > 0 },
    { id: "in-action", label: "Features in action", show: clips.length > 0 },
    { id: "screenshots", label: "Screenshots", show: screenshots.length > 0 },
    { id: "architecture", label: "Architecture", show: Boolean(project.architecture) },
  ].filter((item) => item.show);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Projects", to: "/projects" }, { label: name }]}
        title={name}
        lead={project.headline ?? project.summary}
        meta={
          <>
            <span className="tag-accent">{project.kind}</span>
            {project.year && <span className="tag">{project.year}</span>}
            {project.video?.duration && (
              <span className="tag">
                <Play className="h-3 w-3 fill-current" />
                {project.video.duration} walkthrough
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="link-button ml-1 text-[13.5px]"
              >
                Visit the live site
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </>
        }
      />

      <Section reveal={false} className="pt-8 sm:pt-10">
        {/* Hero media, in a window. The poster pairs with the card thumbnail
            in the view transition, so the image clicked grows into this. */}
        {(project.video?.src || project.poster) && (
          <AppWindow title={`${name} - walkthrough`}>
            <div className="px-2 pb-2">
              {project.video?.src ? (
                <video
                  controls
                  preload="none"
                  poster={project.video.poster ?? project.poster}
                  src={project.video.src}
                  aria-label={`Video walkthrough of ${name}`}
                  style={{ viewTransitionName: mediaTransitionName(project.slug) }}
                  className="block aspect-video w-full rounded-2xl bg-black"
                />
              ) : (
                <img
                  src={project.poster}
                  alt={`${name} screenshot`}
                  style={{ viewTransitionName: mediaTransitionName(project.slug) }}
                  className="block w-full rounded-2xl object-cover"
                />
              )}
            </div>
          </AppWindow>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
          <div className="min-w-0 space-y-14">
            <Reveal as="section" id="overview">
              <h2 className="t-title">Overview</h2>
              <div className="prose-plain mt-4">
                {project.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>

              {project.challenge && project.solution && (
                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  <div className="card p-5">
                    <h3 className="t-body-strong">The problem</h3>
                    <p className="mt-2 text-[14.5px] leading-6 text-muted-foreground">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="card p-5">
                    <h3 className="t-body-strong">What I built</h3>
                    <p className="mt-2 text-[14.5px] leading-6 text-muted-foreground">
                      {project.solution}
                    </p>
                  </div>
                </div>
              )}
            </Reveal>

            {project.highlights.length > 0 && (
              <Reveal as="section" id="features">
                <h2 className="t-title">Key features</h2>
                <CheckList items={project.highlights} columns={2} className="mt-5" />
              </Reveal>
            )}

            {clips.length > 0 && (
              <Reveal as="section" id="in-action">
                <h2 className="t-title">Features in action</h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  Short clips of the software doing the work. Each plays while it is on screen.
                </p>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {clips.map((feature) => (
                    <li key={feature.video} className="card p-2">
                      <InViewVideo
                        src={feature.video ?? null}
                        poster={feature.poster ?? project.poster ?? ""}
                        alt={feature.title}
                        className="aspect-video w-full rounded-2xl"
                      />
                      <div className="px-3 pb-3 pt-4">
                        <h3 className="t-body-strong">{feature.title}</h3>
                        <p className="mt-1 text-[14px] leading-6 text-muted-foreground">
                          {feature.benefit}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {screenshots.length > 0 && (
              <Reveal as="section" id="screenshots">
                <h2 className="t-title">Screenshots</h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  Select a screenshot to open it full size.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {screenshots.map((item, i) => (
                    <li key={item.src}>
                      <button
                        type="button"
                        onClick={() => setLightbox({ open: true, index: i })}
                        aria-label={`Open screenshot: ${item.alt || i + 1}`}
                        className="group relative block w-full overflow-hidden rounded-2xl bg-surface shadow-rest transition-[transform,box-shadow] duration-300 ease-fluent hover:-translate-y-0.5 hover:shadow-raised"
                      >
                        <img
                          src={item.src}
                          alt={item.alt ?? ""}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover object-top"
                        />
                        <span className="glass absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Maximize2 className="h-3.5 w-3.5 text-foreground" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.architecture && (
              <Reveal as="section" id="architecture">
                <h2 className="t-title">Architecture</h2>
                <div className="mt-5">
                  <ArchitectureOverview architecture={project.architecture} />
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
            <nav aria-label="On this page" className="card hidden p-2 lg:block">
              <p className="px-3 pb-1 pt-2 t-caption">On this page</p>
              <ul>
                {contents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded px-3 py-1.5 text-[14px] text-foreground no-underline transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="card p-5">
              <dl className="divide-y divide-divider">
                <Fact label="Type">{project.kind}</Fact>
                {project.platform && <Fact label="Platform">{project.platform}</Fact>}
                {project.industry && <Fact label="Industry">{project.industry}</Fact>}
                {project.role && <Fact label="My role">{project.role}</Fact>}
                {project.audience.length > 0 && (
                  <Fact label="Built for">
                    <ul className="space-y-0.5">
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
                      className="inline-flex items-center gap-1.5 text-primary no-underline hover:underline"
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
      <Section tight>
        <nav aria-label="Other projects" className="grid gap-2 sm:grid-cols-2">
          {previous ? (
            <Link
              to={`/projects/${previous.slug}`}
              className="card card-interactive flex items-center gap-4 px-4 py-3 no-underline"
            >
              <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0">
                <span className="block t-caption">Previous</span>
                <span className="block truncate text-[15px] text-foreground">{previous.name}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="card card-interactive flex items-center justify-end gap-4 px-4 py-3 text-right no-underline"
            >
              <span className="min-w-0">
                <span className="block t-caption">Next</span>
                <span className="block truncate text-[15px] text-foreground">{next.name}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
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
