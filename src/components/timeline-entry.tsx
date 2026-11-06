import { Link } from "react-router-dom";
import { type Icon } from "@/components/icons";
import { CheckList, ChipList } from "@/components/primitives";
import { getProjectBySlug } from "@/data/projects";
import type { TimelineEntry as Entry } from "@/data/experience";

/**
 * One entry on a timeline (Experience, Education), newest first. The line and
 * the markers are there because the entries really are a sequence in time;
 * the latest entry gets a filled marker with `icon` in it.
 */
export function TimelineEntry({
  entry,
  latest,
  icon: MarkerIcon,
  chipsLabel,
}: {
  entry: Entry;
  latest?: boolean;
  icon: Icon;
  /** Caption over `entry.tech`: "Subjects" for education, "Stack" for work. */
  chipsLabel: string;
}) {
  const projects = (entry.projects ?? []).flatMap((slug) => getProjectBySlug(slug) ?? []);

  return (
    <li className="relative pl-10 sm:pl-12">
      <span
        aria-hidden
        className={
          latest
            ? "absolute left-0 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground sm:left-0.5"
            : "absolute left-[7px] top-[26px] h-3.5 w-3.5 rounded-full border-2 border-tertiary-foreground bg-background sm:left-[9px]"
        }
      >
        {latest && <MarkerIcon className="h-3.5 w-3.5" strokeWidth={2} />}
      </span>

      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="text-[13.5px] font-semibold text-foreground tabular">
            {entry.period}
          </time>
          <span className="text-[13.5px] text-muted-foreground">{entry.location}</span>
        </div>
        <h3 className="t-subtitle mt-2">{entry.role}</h3>
        <p className="mt-0.5 text-[14.5px] text-muted-foreground">{entry.org}</p>

        <CheckList items={entry.bullets} className="mt-5" />

        {projects.length > 0 && (
          <>
            <p className="t-caption mt-5">Projects</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link to={`/projects/${project.slug}`} className="tag-accent hover:underline">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {entry.tech && (
          <>
            <p className="t-caption mt-5">{chipsLabel}</p>
            <ChipList items={entry.tech} className="mt-2" />
          </>
        )}
      </div>
    </li>
  );
}

/** The vertical rule the entries hang off. */
export const timelineClass =
  "relative max-w-4xl space-y-4 before:absolute before:bottom-8 before:left-[13px] before:top-8 before:w-px before:bg-border sm:before:left-[15px]";
