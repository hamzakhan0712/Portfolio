import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Maximize2,
  Play,
} from "@/components/icons";
import { CheckList, ContactBand, Fact, PageHeader, Section } from "@/components/primitives";
import { AppWindow, windowProps, type SnapLayout } from "@/components/app-window";
import ArchitectureOverview from "@/components/architecture-overview";
import InViewVideo from "@/components/in-view-video";
import MediaLightbox from "@/components/media-lightbox";
import MediaPlayer from "@/components/media-player";
import { ProjectIcon } from "@/components/project-icon";
import { notify } from "@/components/notify";
import { getProjectBySlug, projects, type Project } from "@/data/projects";
import { skillNamesFor } from "@/data/skills";
import { mediaTransitionName } from "@/lib/view-transition";
import { usePageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

/**
 * One project, laid out like an app's page in the Microsoft Store: the app's
 * tile, name and main action up top; then its media in a window, with
 * screenshots under it; then the description, features, what it's built
 * with (the Store's "System requirements") and an "Additional information"
 * panel. Sections without content are left out, and so are their entries in
 * "On this page".
 *
 * The media window's caption buttons work: hover maximise for snap layouts
 * (video alone, video beside screenshots, or screenshots only), click it for
 * full screen; minimise or close folds the window away.
 */

const SNAP_LAYOUTS: SnapLayout[] = [
  { id: "video", label: "Walkthrough", zones: ["video"] },
  { id: "split", label: "Walkthrough and screenshots", zones: ["video", "shots"] },
  { id: "gallery", label: "Screenshots", zones: ["shots"] },
];

async function share(project: Project) {
  const url = `${window.location.origin}/projects/${project.slug}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: project.name, text: project.headline, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    notify("Link copied", { body: `${project.name}: ${url}` });
  } catch {
    /* The visitor closed the share sheet. */
  }
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  usePageTitle(project ? project.name : "Not found");

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [layout, setLayout] = useState("video");
  const [folded, setFolded] = useState(false);

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
  const stack = skillNamesFor(project, 20);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  const contents = [
    { id: "description", label: "Description", show: true },
    { id: "features", label: "Features", show: project.highlights.length > 0 },
    { id: "in-action", label: "Features in action", show: clips.length > 0 },
    { id: "built-with", label: "Built with", show: project.tags.length > 0 },
    { id: "architecture", label: "Architecture", show: Boolean(project.architecture) },
  ].filter((item) => item.show);

  const openScreenshot = (i: number) => setLightbox({ open: true, index: i });

  const fullscreen = () => {
    const el = document.getElementById("project-media");
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el?.requestFullscreen?.();
  };

  const video = project.video?.src ? (
    <MediaPlayer
      src={project.video.src}
      poster={project.video.poster ?? project.poster}
      label={`Video walkthrough of ${name}`}
      style={{ viewTransitionName: mediaTransitionName(project.slug) }}
      className="rounded-2xl"
    />
  ) : (
    <img
      src={project.poster}
      alt={`${name} screenshot`}
      style={{ viewTransitionName: mediaTransitionName(project.slug) }}
      className="block w-full rounded-2xl object-cover"
    />
  );

  const shotGrid = (columns: string) => (
    <ul className={cn("grid gap-2", columns)}>
      {screenshots.map((item, i) => (
        <li key={item.src}>
          <button
            type="button"
            onClick={() => openScreenshot(i)}
            aria-label={`Open screenshot: ${item.alt || i + 1}`}
            className="group relative block w-full overflow-hidden rounded-xl bg-surface"
          >
            <img
              src={item.src}
              alt={item.alt ?? ""}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top transition-opacity group-hover:opacity-90"
            />
            <span className="glass absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="h-3.5 w-3.5 text-foreground" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* ── The Store header: tile, name, kind, promise, actions ──────────── */}
      <header className="container-site pb-2 pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-[14px] text-muted-foreground">
          <Link to="/projects" className="text-muted-foreground no-underline hover:text-foreground">
            Projects
          </Link>
          <ChevronRight className="mx-1.5 inline h-3.5 w-3.5" />
          <span className="text-foreground">{name}</span>
        </nav>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <ProjectIcon project={project} size={96} className="rounded-2xl" />
          <div className="min-w-0 flex-1">
            <h1 className="t-title-lg">{name}</h1>
            <p className="mt-1 text-[14px] text-muted-foreground">
              <Link to={`/projects?kind=${encodeURIComponent(project.kind)}`} className="text-primary no-underline hover:underline">
                {project.kind}
              </Link>
              {project.year && ` · ${project.year}`}
              {project.video?.duration && ` · ${project.video.duration} walkthrough`}
            </p>
            <p className="t-body-lg mt-3 max-w-2xl">{project.headline ?? project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-accent btn-lg min-w-[9rem]">
                  Open
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a href="#project-media" className="btn-accent btn-lg min-w-[9rem]">
                  <Play className="h-4 w-4" />
                  Watch walkthrough
                </a>
              )}
              <button type="button" onClick={() => share(project)} className="btn-standard btn-lg">
                <Copy className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      <Section reveal={false} className="pt-8 sm:pt-10">
        {/* ── Media, in a window that snaps ─────────────────────────────── */}
        <div id="project-media" className="scroll-mt-24">
          <AnimatePresence initial={false} mode="popLayout">
            {!folded ? (
              <motion.div
                key="window"
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 60 }}
                transition={{ duration: 0.3, ease: [0.1, 0.9, 0.2, 1] }}
              >
                <AppWindow
                  title={name}
                  {...windowProps(project)}
                  onMinimize={() => setFolded(true)}
                  onMaximize={fullscreen}
                  onClose={() => setFolded(true)}
                  snap={
                    screenshots.length > 0
                      ? { layouts: SNAP_LAYOUTS, value: layout, onChange: setLayout }
                      : undefined
                  }
                >
                  <div className={cn(project.kind !== "Desktop app" && "px-2 pb-2")}>
                    <motion.div layout className={cn("grid gap-2", layout === "split" && "lg:grid-cols-[3fr_2fr]")}>
                      {layout !== "gallery" && <motion.div layout>{video}</motion.div>}
                      {layout !== "video" && (
                        <motion.div layout className={cn(layout === "split" && "relative max-h-[28rem] overflow-y-auto rounded-2xl lg:max-h-none lg:overflow-visible")}>
                          {/* Beside the video the screenshots scroll within its height. */}
                          <div className={cn(layout === "split" && "lg:absolute lg:inset-0 lg:overflow-y-auto")}>
                            {shotGrid(layout === "split" ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </AppWindow>
              </motion.div>
            ) : (
              <motion.button
                key="folded"
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => setFolded(false)}
                className="card card-interactive flex w-full items-center gap-3 p-3 text-left"
              >
                <ProjectIcon project={project} size={32} />
                <span className="flex-1 text-[14px] text-foreground">{name} — walkthrough</span>
                <span className="btn-standard btn-sm">Restore</span>
              </motion.button>
            )}
          </AnimatePresence>
          {screenshots.length > 0 && !folded && (
            <p className="mt-3 text-[13px] text-muted-foreground">
              Hover the maximise button for snap layouts, or pick a screenshot to open it full size.
            </p>
          )}
        </div>

        {/* ── Screenshots strip, as in the Store ───────────────────────── */}
        {screenshots.length > 0 && layout === "video" && !folded && (
          <ul className="no-scrollbar -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
            {screenshots.map((item, i) => (
              <li key={item.src} className="w-[min(70vw,18rem)] shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => openScreenshot(i)}
                  aria-label={`Open screenshot: ${item.alt || i + 1}`}
                  className="block w-full overflow-hidden rounded-xl bg-surface shadow-rest transition-opacity hover:opacity-90"
                >
                  <img src={item.src} alt={item.alt ?? ""} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
          <div className="min-w-0 space-y-14">
            <section id="description" className="scroll-mt-24">
              <h2 className="t-title">Description</h2>
              <div className="prose-plain mt-4">
                {project.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
              {project.challenge && project.solution && (
                <dl className="mt-8 divide-y divide-divider rounded-lg border border-divider">
                  <div className="p-5">
                    <dt className="t-body-strong">The problem</dt>
                    <dd className="mt-1.5 text-[14.5px] leading-6 text-muted-foreground">{project.challenge}</dd>
                  </div>
                  <div className="p-5">
                    <dt className="t-body-strong">What I built</dt>
                    <dd className="mt-1.5 text-[14.5px] leading-6 text-muted-foreground">{project.solution}</dd>
                  </div>
                </dl>
              )}
            </section>

            {project.highlights.length > 0 && (
              <section id="features" className="scroll-mt-24">
                <h2 className="t-title">Features</h2>
                <CheckList items={project.highlights} columns={2} className="mt-5" />
              </section>
            )}

            {clips.length > 0 && (
              <section id="in-action" className="scroll-mt-24">
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
                        <p className="mt-1 text-[14px] leading-6 text-muted-foreground">{feature.benefit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* The Store's "System requirements", for what it runs on. */}
            {project.tags.length > 0 && (
              <section id="built-with" className="scroll-mt-24">
                <h2 className="t-title">Built with</h2>
                {stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {stack.map((tech) => (
                      <li key={tech}>
                        <Link
                          to={`/projects?tech=${encodeURIComponent(tech)}`}
                          className="tag no-underline transition-colors hover:bg-secondary-solid hover:text-foreground"
                          title={`Projects built with ${tech}`}
                        >
                          {tech}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <dl className="mt-4 grid gap-x-8 text-[14px] sm:grid-cols-2">
                  <div className="py-2">
                    <dt className="t-caption">Full stack</dt>
                    <dd className="mt-1 leading-6 text-foreground">{project.tags.join(", ")}</dd>
                  </div>
                  {project.platform && (
                    <div className="py-2">
                      <dt className="t-caption">Runs on</dt>
                      <dd className="mt-1 leading-6 text-foreground">{project.platform}</dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {project.architecture && (
              <section id="architecture" className="scroll-mt-24">
                <h2 className="t-title">Architecture</h2>
                <div className="mt-5">
                  <ArchitectureOverview architecture={project.architecture} />
                </div>
              </section>
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
              <h2 className="text-[14px] font-semibold text-foreground">Additional information</h2>
              <dl className="mt-2 divide-y divide-divider">
                <Fact label="Type">{project.kind}</Fact>
                {project.year && <Fact label="Released">{project.year}</Fact>}
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
                {project.liveUrl && (
                  <Fact label="Live site">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary no-underline hover:underline"
                    >
                      {new URL(project.liveUrl).hostname.replace(/^www\./, "")}
                      <ArrowUpRight className="h-3.5 w-3.5" />
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
            <Link to={`/projects/${previous.slug}`} className="card card-interactive flex items-center gap-4 px-4 py-3 no-underline">
              <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
              <ProjectIcon project={previous} size={32} />
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
              <ProjectIcon project={next} size={32} />
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
