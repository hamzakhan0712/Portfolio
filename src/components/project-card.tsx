import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, ExternalLink, FolderKanban, Images, Play } from "@/components/icons";
import { notify } from "@/components/notify";
import type { Project } from "@/data/projects";
import { skillNamesFor } from "@/data/skills";
import InViewVideo from "@/components/in-view-video";
import { mediaTransitionName, navigateWithTransition } from "@/lib/view-transition";
import { cn } from "@/lib/utils";

/**
 * The Windows 11 context menu for a card: right-click, or the Menu key /
 * Shift+F10 while it has focus. Arrow keys move, Escape closes.
 */
function CardMenu({
  project,
  at,
  onClose,
}: {
  project: Project;
  at: { x: number; y: number };
  onClose: () => void;
}) {
  const menu = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const url = `${window.location.origin}/projects/${project.slug}`;

  useEffect(() => {
    const items = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);
    items()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLElement);
      list[(i + (event.key === "ArrowDown" ? 1 : -1) + list.length) % list.length]?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("wheel", onClose, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("wheel", onClose);
    };
  }, [onClose]);

  const run = (action: () => void | Promise<void>) => () => {
    onClose();
    void action();
  };

  const items = [
    { label: "Open", icon: FolderKanban, action: () => navigate(`/projects/${project.slug}`) },
    ...(project.liveUrl
      ? [{ label: "Open live site", icon: ExternalLink, action: () => void window.open(project.liveUrl, "_blank", "noopener") }]
      : []),
    {
      label: "Copy link",
      icon: Copy,
      action: async () => {
        await navigator.clipboard.writeText(url);
        notify("Link copied", { body: project.name });
      },
    },
    ...(typeof navigator !== "undefined" && "share" in navigator
      ? [{ label: "Share", icon: ArrowUpRight, action: () => navigator.share({ title: project.name, url }).catch(() => {}) }]
      : []),
  ];

  const x = Math.min(at.x, window.innerWidth - 228);
  const y = Math.min(at.y, window.innerHeight - items.length * 40 - 24);

  return createPortal(
    <motion.div
      ref={menu}
      role="menu"
      aria-label={project.name}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.1, 0.9, 0.2, 1] }}
      style={{ left: x, top: y }}
      className="glass fixed z-[75] w-56 rounded-lg p-1"
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          onClick={run(item.action)}
          className="flex h-9 w-full items-center gap-3 rounded px-3 text-left text-[14px] text-foreground outline-none hover:bg-secondary focus-visible:bg-secondary"
        >
          <item.icon className="h-4 w-4 text-muted-foreground" />
          {item.label}
        </button>
      ))}
    </motion.div>,
    document.body,
  );
}

/**
 * A project as a card, in the manner of a store listing: the picture sits
 * inset in the card with its own curve, and the words sit under it. The
 * `spotlight` variant runs wide, puts the words beside the picture, and plays
 * the preview loop while it is on screen.
 */
export function ProjectCard({
  project,
  spotlight = false,
  className,
}: {
  project: Project;
  spotlight?: boolean;
  className?: string;
}) {
  const shots = project.gallery.length;
  const navigate = useNavigate();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const to = `/projects/${project.slug}`;

  // The connected animation: the picture clicked grows into the project
  // page's media, through a view transition. Modified clicks open as usual.
  const onClick = (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateWithTransition(() => navigate(to));
  };

  const badges = (
    <div className="absolute bottom-3 left-3 flex gap-1.5">
      {project.video?.duration && (
        <span className="glass inline-flex items-center gap-1 rounded px-2 py-1 text-[12px] font-semibold text-foreground">
          <Play className="h-3 w-3 fill-current" />
          {project.video.duration}
        </span>
      )}
      {shots > 0 && (
        <span className="glass inline-flex items-center gap-1 rounded px-2 py-1 text-[12px] font-semibold text-foreground">
          <Images className="h-3 w-3" />
          {shots}
        </span>
      )}
    </div>
  );

  return (
    <>
    <Link
      to={to}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        setMenu({ x: event.clientX, y: event.clientY });
      }}
      onKeyDown={(event) => {
        if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
          event.preventDefault();
          const box = event.currentTarget.getBoundingClientRect();
          setMenu({ x: box.left + 24, y: box.top + 24 });
        }
      }}
      className={cn(
        "card card-interactive group flex h-full flex-col p-2 no-underline",
        spotlight && "lg:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-surface",
          spotlight && "lg:w-[62%] lg:shrink-0",
        )}
      >
        {spotlight && project.previewVideo ? (
          <InViewVideo
            src={project.previewVideo}
            poster={project.poster ?? ""}
            alt={`${project.name}, running`}
            className="aspect-[16/10] w-full !object-cover object-top transition-transform duration-500 ease-fluent group-hover:scale-[1.02]"
          />
        ) : (
          project.poster && (
            <img
              src={project.poster}
              alt={`${project.name} screenshot`}
              loading="lazy"
              style={{ viewTransitionName: mediaTransitionName(project.slug) }}
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-fluent group-hover:scale-[1.03]"
            />
          )
        )}
        {badges}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4",
          spotlight && "lg:justify-center lg:px-8 lg:py-8",
        )}
      >
        <div>
          <span className="tag-accent">{project.kind}</span>
        </div>
        <h3
          className={cn(
            "mt-3 flex items-start justify-between gap-3 font-display font-semibold leading-snug text-foreground",
            spotlight ? "text-[1.5rem] lg:text-[1.875rem]" : "text-[18px]",
          )}
        >
          {project.name}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-secondary text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </h3>
        {/* The one-line promise, whole: a clipped sentence reads as a mistake. */}
        <p
          className={cn(
            "mt-2 flex-1 text-[14px] leading-6 text-muted-foreground",
            spotlight && "lg:flex-none lg:text-[15.5px] lg:leading-7",
          )}
        >
          {project.headline ?? project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {skillNamesFor(project, spotlight ? 5 : 3).map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
    {menu && <CardMenu project={project} at={menu} onClose={() => setMenu(null)} />}
    </>
  );
}

export default ProjectCard;
