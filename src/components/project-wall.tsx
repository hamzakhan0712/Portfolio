import { Link } from "react-router-dom";
import { Images, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { mediaTransitionName } from "@/lib/view-transition";

/**
 * Every system on the site, as pictures.
 *
 * The projects page argues its case in prose; this is the version for someone
 * who is scrolling. Ten screenshots of finished software make the point that a
 * sentence claiming ten finished systems cannot — so the only text on a tile
 * is the name, and the badges are counts the data already knows.
 */
export function ProjectWall() {
  return (
    <ul className="not-prose grid grid-cols-2 gap-2 sm:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            to={`/projects/${project.slug}`}
            className="group block overflow-hidden rounded-lg border border-border no-underline transition-colors hover:border-primary/50"
          >
            <span className="relative block overflow-hidden bg-secondary/40">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={`${project.title.split(" — ")[0]} screenshot`}
                  loading="lazy"
                  style={{ viewTransitionName: mediaTransitionName(project.slug) }}
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                />
              )}
              {project.video?.duration && (
                <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[9.5px] text-foreground backdrop-blur-sm">
                  <Play className="h-2 w-2 fill-current" />
                  {project.video.duration}
                </span>
              )}
              {!project.video?.duration && (project.media?.length ?? 0) > 0 && (
                <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[9.5px] text-foreground backdrop-blur-sm">
                  <Images className="h-2 w-2" />
                  {project.media?.length}
                </span>
              )}
            </span>
            <span className="flex items-center justify-between gap-2 border-t border-border px-2 py-1.5">
              <span className="truncate text-[12px] font-medium text-foreground">
                {project.title.split(" — ")[0]}
              </span>
              <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground/70">
                {project.category === "product" ? "product" : "client"}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProjectWall;
