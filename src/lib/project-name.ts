import type { Project } from "@/data/projects";

/** The name without the descriptive tail after the em dash. */
export const projectName = (project: Project) => project.title.split(" — ")[0];

/** The tail after the em dash — "Conference Website", "Billing Desktop App". */
export const projectKind = (project: Project) =>
  project.title.split(" — ")[1] ?? "";
