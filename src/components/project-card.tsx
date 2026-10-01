import { Link } from "react-router-dom";
import { ArrowUpRight, Images, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectKind, projectName } from "@/lib/project-name";
import { mediaTransitionName } from "@/lib/view-transition";
import { cn } from "@/lib/utils";

/**
 * A project as a card. The screenshot does most of the talking; the words
 * under it are the name, what kind of thing it is, and one line of summary.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const shots = project.media?.length ?? 0;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "card card-hover group flex h-full flex-col overflow-hidden no-underline",
        className,
      )}
    >
      <div className="relative overflow-hidden border-b border-border bg-secondary">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={`${projectName(project)} screenshot`}
            loading="lazy"
            style={{ viewTransitionName: mediaTransitionName(project.slug) }}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {project.video?.duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[12px] font-medium text-foreground shadow-sm backdrop-blur-sm">
              <Play className="h-3 w-3 fill-current" />
              {project.video.duration}
            </span>
          )}
          {shots > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[12px] font-medium text-foreground shadow-sm backdrop-blur-sm">
              <Images className="h-3 w-3" />
              {shots}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[13px] font-medium text-primary">
          {projectKind(project) || "Project"}
        </p>
        <h3 className="mt-2 flex items-start justify-between gap-3 text-[19px] font-semibold leading-snug text-foreground">
          {projectName(project)}
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
          {project.tags.length > 3 && (
            <li className="px-1 py-1 text-[13px] text-muted-foreground">
              +{project.tags.length - 3} more
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}

export default ProjectCard;
