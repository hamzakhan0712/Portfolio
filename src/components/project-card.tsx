import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ImageIcon, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryMeta, type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Stagger index for the entrance animation. */
  index?: number;
};

/** Delay before a hover starts the preview, so a passing cursor does nothing. */
const PREVIEW_DELAY_MS = 550;

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbFailed, setThumbFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  const meta = categoryMeta[project.category];
  const previewSrc = project.previewVideo ?? project.video?.src;
  const hasThumb = Boolean(project.imageUrl) && !thumbFailed;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startPreview = () => {
    if (!previewSrc) return;
    clearTimer();
    timerRef.current = window.setTimeout(
      () => setIsPreviewing(true),
      PREVIEW_DELAY_MS,
    );
  };

  const stopPreview = () => {
    clearTimer();
    setIsPreviewing(false);
    setIsMuted(true);
  };

  // Play/pause follows the preview state rather than the DOM event directly, so
  // a card that unmounts mid-preview never leaves a video decoding.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPreviewing) {
      video.currentTime = 0;
      void video.play().catch(() => setIsPreviewing(false));
    } else {
      video.pause();
    }
  }, [isPreviewing]);

  useEffect(() => clearTimer, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.06 }}
      className="group/card h-full"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="flex h-full flex-col gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${project.title}`}
      >
        {/* Thumbnail — 16:9, the preview plays in place on hover */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted transition-all duration-300 group-hover/card:border-primary/40 group-hover/card:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.45)]">
          {hasThumb ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              onError={() => setThumbFailed(true)}
              className={cn(
                "h-full w-full object-cover transition-all duration-700",
                isPreviewing
                  ? "scale-105 opacity-0"
                  : "opacity-100 group-hover/card:scale-105",
              )}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary/60 via-muted to-background p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" />
                No preview yet
              </span>
            </div>
          )}

          {previewSrc && (
            <video
              ref={videoRef}
              src={previewSrc}
              poster={project.imageUrl}
              muted={isMuted}
              loop
              playsInline
              preload="none"
              aria-hidden={!isPreviewing}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                isPreviewing ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
          )}

          {/* Play affordance — only where there is something to play */}
          {previewSrc && !isPreviewing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/45 backdrop-blur-md">
                <Play className="ml-0.5 h-6 w-6 text-white" />
              </span>
            </div>
          )}

          {/* Bottom-right badge: duration while idle, mute toggle while playing */}
          {isPreviewing && project.previewHasAudio ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMuted((m) => !m);
              }}
              className="absolute bottom-2 right-2 rounded-md border border-white/15 bg-black/75 p-1.5 text-white transition-colors hover:bg-black/90"
              aria-label={isMuted ? "Unmute preview" : "Mute preview"}
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </button>
          ) : (
            project.video?.duration && (
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
                {project.video.duration}
              </span>
            )
          )}
        </div>

        {/* Meta row — category dot stands in for the channel avatar */}
        <div className="flex flex-1 gap-3 px-0.5">
          <span
            className={cn(
              "mt-1.5 h-8 w-8 shrink-0 rounded-full border border-border/60 bg-card",
              "flex items-center justify-center",
            )}
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", meta.dot)} />
          </span>

          <div className="flex min-w-0 flex-1 flex-col">
            {/* Reserved line-boxes keep the chip row on the same baseline across
                a row of cards, whether the title runs to one line or two. */}
            <h3 className="line-clamp-2 min-h-[2.6em] text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover/card:text-primary">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-2 min-h-[2.9em] text-[13px] leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            {/* Two fixed rows rather than one wrapping row: a long urltext used
                to push the chip up a line on some cards and not others. */}
            <div className="mt-auto space-y-1.5 pt-2 text-[11px] text-muted-foreground">
              <div>
                <span
                  className={cn(
                    "inline-block rounded-full border px-2 py-0.5 font-medium",
                    meta.chip,
                  )}
                >
                  {meta.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="truncate font-mono">{project.urltext}</span>
                {project.liveUrl && (
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProjectCard;
