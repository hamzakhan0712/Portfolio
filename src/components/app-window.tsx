import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Minus, Square, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * A Windows 11 window: Mica title bar, the three caption buttons, and the
 * content below. The caption buttons are drawn, not wired — they are part of
 * the picture, so they are hidden from assistive technology.
 */
export function AppWindow({
  title,
  icon,
  children,
  className,
}: {
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card shadow-window", className)}>
      <div className="flex h-9 items-center gap-2.5 bg-surface pl-3">
        {icon}
        <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground">{title}</span>
        <span aria-hidden className="flex self-stretch text-foreground">
          <span className="flex w-11 items-center justify-center">
            <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
          </span>
          <span className="flex w-11 items-center justify-center">
            <Square className="h-3 w-3" strokeWidth={1.25} />
          </span>
          <span className="flex w-11 items-center justify-center">
            <X className="h-3.5 w-3.5" strokeWidth={1.25} />
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

/** A 16 px app icon for the title bar: the project's own first frame. */
function WindowIcon({ src }: { src?: string }) {
  return src ? (
    <img src={src} alt="" className="h-4 w-4 shrink-0 rounded-sm object-cover object-left-top" />
  ) : null;
}

/**
 * The home page hero's right side: projects running in a window, and a
 * taskbar underneath to switch between them.
 *
 * The taskbar is a tablist. Like the real one, every app shows a short grey
 * dash, and the one in front gets the wide accent pill. Arrow keys move along
 * it. Each window plays the project's short preview loop; with reduced motion
 * it shows the still frame instead.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];

  const select = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: projects.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  if (!project) return null;

  return (
    <div className="relative">
      <AppWindow
        title={
          <>
            {project.name}
            <span className="text-muted-foreground"> - {project.kind}</span>
          </>
        }
        icon={<WindowIcon src={project.poster} />}
      >
        <div
          role="tabpanel"
          id="showcase-panel"
          aria-labelledby={`showcase-tab-${project.slug}`}
          className="relative"
        >
          <div className="relative aspect-[16/10] bg-black">
            {project.previewVideo && !reduceMotion ? (
              <video
                key={project.slug}
                src={project.previewVideo}
                poster={project.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`${project.name}, running`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <img
                key={project.slug}
                src={project.poster}
                alt={`${project.name} screenshot`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="line-clamp-2 text-[13.5px] leading-5 text-muted-foreground sm:line-clamp-1">
              {project.headline ?? project.summary}
            </p>
            <Link
              to={`/projects/${project.slug}`}
              className="link-button shrink-0 self-start text-[13.5px] sm:self-auto"
            >
              Open case study
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </AppWindow>

      {/* The taskbar. */}
      <div className="mt-4 flex justify-center">
        <div
          role="tablist"
          aria-label="Projects shown in the window"
          onKeyDown={onKeyDown}
          className="acrylic flex gap-1 rounded-lg border p-1 shadow-flyout"
        >
          {projects.map((item, index) => {
            const selected = index === active;
            return (
              <Tooltip key={item.slug} delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    ref={(element) => (tabs.current[index] = element)}
                    type="button"
                    role="tab"
                    id={`showcase-tab-${item.slug}`}
                    aria-selected={selected}
                    aria-controls="showcase-panel"
                    aria-label={item.name}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded transition-colors hover:bg-secondary",
                      selected && "bg-secondary",
                    )}
                  >
                    <img
                      src={item.poster}
                      alt=""
                      className="h-7 w-7 rounded object-cover object-left-top"
                    />
                    {selected ? (
                      <motion.span
                        layoutId="taskbar-pill"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-primary"
                      />
                    ) : (
                      <span className="absolute bottom-0.5 left-1/2 h-[3px] w-1.5 -translate-x-1/2 rounded-full bg-tertiary-foreground/70" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">{item.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectShowcase;
