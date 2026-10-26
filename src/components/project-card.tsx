import { Link } from "react-router-dom";
import { ArrowUpRight, Images, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import InViewVideo from "@/components/in-view-video";
import { mediaTransitionName } from "@/lib/view-transition";
import { cn } from "@/lib/utils";

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
    <Link
      to={`/projects/${project.slug}`}
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
        <div className="flex items-center gap-2">
          <span className="tag-accent">{project.kind}</span>
          {project.year && <span className="t-caption">{project.year}</span>}
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
        <p
          className={cn(
            "mt-2 flex-1 text-[14px] leading-6 text-muted-foreground",
            spotlight ? "line-clamp-4 lg:flex-none lg:text-[15.5px] lg:leading-7" : "line-clamp-3",
          )}
        >
          {spotlight ? (project.headline ?? project.summary) : project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, spotlight ? 5 : 3).map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default ProjectCard;
