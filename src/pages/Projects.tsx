import { useSearchParams } from "react-router-dom";
import { ContactBand, PageHeader, Pivot, Section } from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { RevealItem, RevealList } from "@/components/reveal";
import { projects } from "@/data/projects";
import { usePageTitle } from "@/lib/page-title";

/** The kinds that exist, in the order they first appear in the list. */
const kinds = [...new Set(projects.map((project) => project.kind))];

const plural = (kind: string) => (kind.endsWith("s") ? kind : `${kind}s`);

export default function Projects() {
  usePageTitle("Projects");

  // The filter lives in the address, so a filtered list can be linked to.
  const [params, setParams] = useSearchParams();
  const requested = params.get("kind") ?? "all";
  const kind = requested === "all" || kinds.includes(requested) ? requested : "all";
  const shown = kind === "all" ? projects : projects.filter((project) => project.kind === kind);

  return (
    <>
      <PageHeader
        title="Projects"
        lead={`${projects.length} projects across web applications, websites and desktop apps. Each opens a page with a video walkthrough, short clips, screenshots and how it is built.`}
      />

      <Section reveal={false} className="pt-8 sm:pt-10">
        <Pivot
          label="Filter projects by kind"
          value={kind}
          onChange={(value) => setParams(value === "all" ? {} : { kind: value }, { replace: true })}
          items={[
            { value: "all", label: "All", count: projects.length },
            ...kinds.map((item) => ({
              value: item,
              label: plural(item),
              count: projects.filter((project) => project.kind === item).length,
            })),
          ]}
        />

        <RevealList key={kind} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      <ContactBand />
    </>
  );
}
