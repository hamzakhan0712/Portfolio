import { Link } from "react-router-dom";
import { Images, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { mediaTransitionName } from "@/lib/view-transition";
import { cn } from "@/lib/utils";

/**
 * A project as a card. The screenshot does most of the talking; under it are
 * what kind of thing it is, the name, one line of summary and the first few
 * technologies. Hover changes the card's fill, as a Windows card does — it
 * does not lift or zoom.
 */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const shots = project.gallery.length;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "card card-interactive group flex h-full flex-col overflow-hidden no-underline",
        className,
      )}
    >
      <div className="relative border-b bg-surface">
        {project.poster && (
          <img
            src={project.poster}
            alt={`${project.name} screenshot`}
            loading="lazy"
            style={{ viewTransitionName: mediaTransitionName(project.slug) }}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        )}
        <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
          {project.video?.duration && (
            <span className="acrylic inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[12px] text-foreground">
              <Play className="h-3 w-3 fill-current" />
              {project.video.duration}
            </span>
          )}
          {shots > 0 && (
            <span className="acrylic inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[12px] text-foreground">
              <Images className="h-3 w-3" />
              {shots}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="t-caption">
          {project.kind}
          {project.year && `, ${project.year}`}
        </p>
        <h3 className="mt-1 text-[17px] font-semibold leading-snug text-foreground group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-[1.55] text-muted-foreground">
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
          {project.tags.length > 3 && (
            <li className="px-1 text-[12.5px] leading-6 text-tertiary-foreground">
              +{project.tags.length - 3}
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}

export default ProjectCard;
