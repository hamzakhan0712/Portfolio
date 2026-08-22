import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Images,
  Lock,
  Play,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import ProjectCard from "@/components/project-card";
import {
  categoryMeta,
  getProjectBySlug,
  getProjectMedia,
  projects,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const media: MediaItem[] = useMemo(
    () => (project ? getProjectMedia(project) : []),
    [project],
  );

  const related = useMemo(() => {
    if (!project) return [];
    const sameCategory = projects.filter(
      (p) => p.slug !== project.slug && p.category === project.category,
    );
    const rest = projects.filter(
      (p) => p.slug !== project.slug && p.category !== project.category,
    );
    return [...sameCategory, ...rest].slice(0, 4);
  }, [project]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} — Hamza Khan`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-30 h-full w-full">
          <Background />
        </div>
        <Navbar />
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-3 font-mono text-sm text-muted-foreground">404</p>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            No such project
          </h1>
          <p className="mb-8 max-w-md text-muted-foreground">
            The link may be out of date. Everything I have built is listed on the
            home page.
          </p>
          <Link to="/">
            <Button className="text-white">
              <span className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to all projects
              </span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const meta = categoryMeta[project.category];
  const gallery = media.filter((item) => item.type === "image");
  const hasWalkthrough = Boolean(project.video);
  // The cover is already the page header unless a walkthrough took its place
  const showGallery = gallery.length > (hasWalkthrough ? 0 : 1);
  // The walkthrough occupies index 0, so jump past it to open on an image
  const firstImageIndex = Math.max(
    media.findIndex((item) => item.type === "image"),
    0,
  );

  return (
    <div className="relative min-h-screen overflow-hidden transition-theme">
      <div className="fixed inset-0 -z-30 h-full w-full">
        <Background />
      </div>

      <Navbar />

      <main className="relative z-10 pb-24 pt-24 md:pt-28">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>

          {/* Player / hero media */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card/40 shadow-2xl shadow-black/20 backdrop-blur-sm"
          >
            {hasWalkthrough ? (
              <video
                src={project.video!.src}
                poster={project.video!.poster ?? project.imageUrl}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black object-contain"
              />
            ) : project.imageUrl ? (
              <button
                type="button"
                onClick={() => setLightbox({ open: true, index: 0 })}
                className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden bg-black/60"
                aria-label={`Open ${project.title} media viewer`}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  <Images className="h-3.5 w-3.5" />
                  View media
                </span>
              </button>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary/50 via-muted to-background text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                  {project.title.slice(0, 2).toUpperCase()}
                </span>
                <p className="text-sm text-muted-foreground">
                  Walkthrough coming soon
                </p>
              </div>
            )}
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium",
                  meta.chip,
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                {meta.label}
              </span>
              <span className="font-mono text-muted-foreground">
                {project.urltext}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
              {project.summary}
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="group text-white">
                    <span className="flex items-center gap-2">
                      Visit live site
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </a>
              )}
              {gallery.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setLightbox({ open: true, index: firstImageIndex })
                  }
                >
                  <span className="flex items-center gap-2">
                    <Images className="h-4 w-4" />
                    {gallery.length} image{gallery.length > 1 ? "s" : ""}
                  </span>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Body */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-12">
              {/* Overview */}
              <section>
                <h2 className="mb-4 text-xl font-semibold md:text-2xl">
                  Overview
                </h2>
                <div className="space-y-4">
                  {project.description
                    .split(/\n\s*\n/)
                    .map((para, i) => (
                      <p
                        key={i}
                        className={cn(
                          "leading-relaxed",
                          // The opening paragraph carries the brief, so it gets
                          // the weight — the rest is detail for whoever reads on.
                          i === 0
                            ? "text-base text-foreground/85 md:text-[17px]"
                            : "text-[15px] text-muted-foreground",
                        )}
                      >
                        {para.trim()}
                      </p>
                    ))}
                </div>
              </section>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold md:text-2xl">
                    Highlights
                  </h2>
                  <ul className="space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-[15px] leading-relaxed text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Gallery */}
              {showGallery && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold md:text-2xl">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {gallery.map((item, i) => {
                      const indexInMedia = media.indexOf(item);
                      return (
                        <button
                          key={`${item.src}-${i}`}
                          type="button"
                          onClick={() =>
                            setLightbox({ open: true, index: indexInMedia })
                          }
                          className="group relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={item.alt ?? `Open image ${i + 1}`}
                        >
                          <img
                            src={item.src}
                            alt={item.alt ?? `${project.title} screenshot`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Stack
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/40 bg-secondary/50 px-2 py-0.5 text-[11px] text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.role && (
                  <>
                    <div className="my-5 h-px bg-border/60" />
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      My role
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.role}
                    </p>
                  </>
                )}

                <div className="my-5 h-px bg-border/60" />

                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Links
                </h2>
                <div className="space-y-2 text-sm">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live site
                    </a>
                  )}
                  {hasWalkthrough && (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Play className="h-4 w-4" />
                      Walkthrough above
                    </span>
                  )}
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Source is private
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
                  Every project here runs in production for a business, so the
                  code stays closed. Happy to walk through the architecture and
                  the decisions behind it on a call.
                </p>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-border/50 pt-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  More projects
                </h2>
                <Link
                  to="/#projects"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  See all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item, i) => (
                  <ProjectCard key={item.slug} project={item} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <MediaLightbox
        open={lightbox.open}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
        items={media}
        title={project.title}
        startIndex={lightbox.index}
      />
    </div>
  );
};

export default ProjectDetail;
