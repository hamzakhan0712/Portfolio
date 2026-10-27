import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Minus, Square, X } from "@/components/icons";
import { ProjectIcon } from "@/components/project-icon";
import type { Project } from "@/data/projects";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** A snap layout: its id, its name, and the zones drawn in the picker. */
export type SnapLayout = { id: string; label: string; zones: string[] };

/**
 * The snap layouts flyout that opens over the maximise button, as in
 * Windows 11. Each layout is drawn as its zones; choosing one arranges the
 * window's content that way.
 */
function SnapFlyout({
  layouts,
  value,
  onChange,
}: {
  layouts: SnapLayout[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
      transition={{ duration: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
      role="menu"
      aria-label="Snap layouts"
      className="glass absolute right-0 top-full z-30 mt-1 flex gap-2 rounded-lg p-2"
    >
      {layouts.map((layout) => (
        <button
          key={layout.id}
          type="button"
          role="menuitemradio"
          aria-checked={value === layout.id}
          aria-label={layout.label}
          title={layout.label}
          onClick={() => onChange(layout.id)}
          className={cn(
            "grid h-12 w-[4.5rem] gap-0.5 rounded p-1 transition-colors hover:bg-secondary",
            value === layout.id && "bg-secondary",
          )}
          style={{ gridTemplateColumns: layout.zones.length > 1 ? "3fr 2fr" : "1fr" }}
        >
          {layout.zones.map((zone) => (
            <span
              key={zone}
              className={cn("rounded-sm", value === layout.id ? "bg-primary" : "bg-muted-foreground/40")}
            />
          ))}
        </button>
      ))}
    </motion.div>
  );
}

/**
 * A Windows 11 window. The caption buttons work when handlers are given —
 * minimise, maximise (with the snap layouts flyout on hover), close — and are
 * drawn as part of the picture, hidden from assistive technology, when not.
 */
export function AppWindow({
  title,
  icon,
  address,
  bare = false,
  onMinimize,
  onMaximize,
  onClose,
  snap,
  children,
  className,
}: {
  title: ReactNode;
  icon?: ReactNode;
  /** Shown as a browser address bar, for web projects. */
  address?: string;
  /** No title bar: for desktop apps, whose screenshots carry their own. */
  bare?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  snap?: { layouts: SnapLayout[]; value: string; onChange: (id: string) => void };
  children: ReactNode;
  className?: string;
}) {
  const [snapOpen, setSnapOpen] = useState(false);
  const closeTimer = useRef<number>();
  const live = Boolean(onMinimize || onMaximize || onClose);

  const frame = cn(
    "overflow-visible rounded-3xl bg-card shadow-float ring-1 ring-black/5 dark:ring-white/10",
    className,
  );

  const caption = (label: string, action: (() => void) | undefined, glyph: ReactNode, close = false) =>
    live ? (
      <button
        type="button"
        onClick={action}
        aria-label={label}
        title={label}
        className={cn(
          "flex h-full w-11 items-center justify-center transition-colors",
          close ? "rounded-tr-[18px] hover:bg-[#C42B1C] hover:text-white" : bare ? "hover:bg-white/10" : "hover:bg-secondary",
        )}
      >
        {glyph}
      </button>
    ) : (
      <span className="flex w-11 items-center justify-center">{glyph}</span>
    );

  const buttons = (
    <span
      aria-hidden={live ? undefined : true}
      className={cn(
        "relative flex self-stretch text-muted-foreground",
        // Over a desktop app's own title bar: drawn in its place, in white.
        bare && "absolute right-1.5 top-1.5 z-20 h-8 rounded-bl rounded-tr-[18px] bg-black/50 text-white/90 backdrop-blur",
      )}
    >
      {caption("Minimise", onMinimize, <Minus className="h-3.5 w-3.5" />)}
      <span
        className="relative flex"
        onPointerEnter={() => {
          window.clearTimeout(closeTimer.current);
          if (snap) setSnapOpen(true);
        }}
        onPointerLeave={() => {
          closeTimer.current = window.setTimeout(() => setSnapOpen(false), 250);
        }}
        onFocus={() => snap && setSnapOpen(true)}
      >
        {caption("Maximise", onMaximize, <Square className="h-3 w-3" />)}
        <AnimatePresence>
          {snap && snapOpen && (
            <SnapFlyout
              {...snap}
              onChange={(id) => {
                snap.onChange(id);
                setSnapOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </span>
      {caption("Close", onClose, <X className="h-3.5 w-3.5" />, true)}
    </span>
  );

  if (bare) {
    return (
      <div className={cn(frame, "relative p-1.5")}>
        {live && buttons}
        <div className="overflow-hidden rounded-[18px]">{children}</div>
      </div>
    );
  }

  return (
    <div className={frame}>
      <div className="flex h-10 items-center gap-2.5 pl-4">
        {icon}
        {address ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="hidden max-w-[11rem] shrink-0 truncate text-[12.5px] font-medium text-foreground sm:block">
              {title}
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-secondary px-3 py-1 text-[12px] text-muted-foreground">
              {address}
            </span>
          </span>
        ) : (
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-foreground">
            {title}
          </span>
        )}
        {buttons}
      </div>
      <div className="overflow-hidden rounded-b-3xl">{children}</div>
    </div>
  );
}

/** How a project's window is framed: desktop apps bring their own title
 *  bar, web projects sit in a browser with their real address. */
export function windowProps(project: Project) {
  if (project.kind === "Desktop app") return { bare: true } as const;
  return project.liveUrl ? { address: new URL(project.liveUrl).host.replace(/^www\./, "") } : {};
}

/**
 * The home page hero's right side: projects running in a window, and a
 * taskbar underneath to switch between them.
 *
 * The taskbar is a tablist of app icons. Minimise or close sends the window
 * down into it; choosing an app brings it back. Maximise opens the project.
 * Arrow keys, Home and End move along the taskbar.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [minimised, setMinimised] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];

  const select = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setActive(next);
    setMinimised(false);
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
  const bare = project.kind === "Desktop app";
  const media = "absolute inset-0 h-full w-full origin-top scale-[1.15] object-cover object-top";

  return (
    <div className="relative">
      <div className="relative">
        <AnimatePresence initial={false} mode="popLayout">
          {!minimised ? (
            <motion.div
              key="window"
              initial={{ opacity: 0, scale: 0.6, y: 120 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 160 }}
              transition={{ duration: 0.32, ease: [0.1, 0.9, 0.2, 1] }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <AppWindow
                title={project.name}
                icon={<ProjectIcon project={project} size={16} className="rounded-sm" />}
                {...windowProps(project)}
                onMinimize={() => setMinimised(true)}
                onMaximize={() => navigate(`/projects/${project.slug}`)}
                onClose={() => setMinimised(true)}
              >
                <div
                  role="tabpanel"
                  id="showcase-panel"
                  aria-labelledby={`showcase-tab-${project.slug}`}
                  className={bare ? "" : "px-2 pb-2"}
                >
                  {/* Zoomed a little into the top of the frame, where the app's
                      own content is, so it reads at this size. */}
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
                        className={media}
                      />
                    ) : (
                      <img key={project.slug} src={project.poster} alt={`${project.name} screenshot`} className={media} />
                    )}
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
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex aspect-[16/11] items-center justify-center rounded-3xl border border-dashed border-border text-[14px] text-muted-foreground"
            >
              Choose an app on the taskbar to open it again.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The taskbar. */}
      <div className="mt-4 flex justify-center">
        <div
          role="tablist"
          aria-label="Projects shown in the window"
          onKeyDown={onKeyDown}
          className="glass flex gap-1 rounded-lg p-1.5"
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
                    onClick={() => select(index)}
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded transition-[background-color,transform] duration-200 ease-fluent hover:bg-secondary active:scale-95",
                      selected && !minimised && "bg-secondary",
                    )}
                  >
                    <ProjectIcon project={item} size={30} />
                    {selected && !minimised ? (
                      <motion.span
                        layoutId="taskbar-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-primary"
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
