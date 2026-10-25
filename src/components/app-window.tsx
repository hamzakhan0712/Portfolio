import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Minus, Square, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * A Windows 11 window: a title bar with the three caption buttons over the
 * content. The caption buttons are drawn, not wired — they are part of the
 * picture, so they are hidden from assistive technology.
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
    <div
      className={cn(
        "overflow-hidden rounded-3xl bg-card shadow-float ring-1 ring-black/5 dark:ring-white/10",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2.5 pl-4">
        {icon}
        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-foreground">
          {title}
        </span>
        <span aria-hidden className="flex self-stretch text-muted-foreground">
          <span className="flex w-11 items-center justify-center">
            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
          <span className="flex w-11 items-center justify-center">
            <Square className="h-3 w-3" strokeWidth={1.5} />
          </span>
          <span className="flex w-12 items-center justify-center">
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

/** A small app icon for the title bar: the project's own first frame. */
function WindowIcon({ src }: { src?: string }) {
  return src ? (
    <img src={src} alt="" className="h-4 w-4 shrink-0 rounded object-cover object-left-top" />
  ) : null;
}

/**
 * The home page hero's right side: projects running in a window, and a dock
 * underneath to switch between them.
 *
 * The dock is a tablist. Every app shows a short dash; the one in front gets
 * the wide accent pill. Arrow keys, Home and End move along it. Each window
 * plays the project's short preview loop; with reduced motion it shows the
 * still frame instead.
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
            <span className="font-normal text-muted-foreground"> - {project.kind}</span>
          </>
        }
        icon={<WindowIcon src={project.poster} />}
      >
        <div
          role="tabpanel"
          id="showcase-panel"
          aria-labelledby={`showcase-tab-${project.slug}`}
          className="px-2 pb-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black">
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

            {/* The caption floats on glass over the bottom of the frame. */}
            <div className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl py-2 pl-4 pr-2">
              <p className="line-clamp-1 flex-1 text-[13px] leading-5 text-foreground">
                {project.headline ?? project.summary}
              </p>
              <Link
                to={`/projects/${project.slug}`}
                className="btn-accent btn-sm h-8 shrink-0"
                aria-label={`Open the ${project.name} case study`}
              >
                Open
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </AppWindow>

      {/* The dock. */}
      <div className="mt-5 flex justify-center">
        <div
          role="tablist"
          aria-label="Projects shown in the window"
          onKeyDown={onKeyDown}
          className="glass flex gap-1 rounded-3xl p-1.5"
        >
          {projects.map((item, index) => {
            const selected = index === active;
            return (
              <Tooltip key={item.slug} delayDuration={250}>
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
                      "relative flex h-12 w-12 items-center justify-center rounded-2xl transition-[background-color,transform] duration-200 ease-fluent hover:bg-secondary active:scale-95",
                      selected && "bg-secondary",
                    )}
                  >
                    <img
                      src={item.poster}
                      alt=""
                      className={cn(
                        "h-9 w-9 rounded-[10px] object-cover object-left-top shadow-rest transition-transform duration-300 ease-fluent",
                        selected && "scale-110",
                      )}
                    />
                    {selected ? (
                      <motion.span
                        layoutId="taskbar-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-primary"
                      />
                    ) : (
                      <span className="absolute bottom-0.5 left-1/2 h-[3px] w-1.5 -translate-x-1/2 rounded-full bg-tertiary-foreground/60" />
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
