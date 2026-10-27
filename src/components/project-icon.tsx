import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A project's app icon, the way Windows shows apps on the taskbar and in the
 * Store: a coloured tile with a short mark. None of these projects ship a
 * logo file, so the mark is drawn from the name, in a colour of its own.
 */

const MARKS: Record<string, { mark: string; color: string }> = {
  "initcore-commerce": { mark: "IC", color: "#0067C0" },
  "initcore-crm": { mark: "CR", color: "#8764B8" },
  "initcore-realestate": { mark: "RE", color: "#00897B" },
  "initcore-web": { mark: "In", color: "#005A9E" },
  key2yourhome: { mark: "K2", color: "#C2500F" },
  logxivia: { mark: "Lx", color: "#03787C" },
  novem: { mark: "N", color: "#107C10" },
  "sk-trading": { mark: "SK", color: "#B4009E" },
  "sk-trading-web": { mark: "SK", color: "#C50F1F" },
  "taj-metals": { mark: "TM", color: "#5D5A58" },
};

export function projectMark(project: Pick<Project, "slug" | "name">) {
  return (
    MARKS[project.slug] ?? {
      mark: project.name.replace(/[^A-Za-z0-9 ]/g, "").slice(0, 2),
      color: "#0067C0",
    }
  );
}

export function ProjectIcon({
  project,
  size = 36,
  className,
}: {
  project: Pick<Project, "slug" | "name">;
  size?: number;
  className?: string;
}) {
  const { mark, color } = projectMark(project);
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        fontSize: size * (mark.length > 1 ? 0.36 : 0.46),
        background: `linear-gradient(145deg, ${color}, color-mix(in srgb, ${color} 70%, black))`,
      }}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-lg font-display font-semibold tracking-tight text-white shadow-rest",
        className,
      )}
    >
      {mark}
    </span>
  );
}

export default ProjectIcon;
