import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Github, X } from "@/components/icons";
import { ContactBand, PageHeader, Pivot, Section, SectionHeading } from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { RevealItem, RevealList } from "@/components/reveal";
import { projects, publicCode } from "@/data/projects";
import { rankedTools } from "@/data/skills";
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
  // A technology, from a tag or search: ?tech=React shows what uses it.
  const tool = rankedTools.find((item) => item.name === params.get("tech"));
  const byKind = kind === "all" ? projects : projects.filter((project) => project.kind === kind);
  const shown = tool ? byKind.filter((project) => tool.projects.includes(project)) : byKind;
  const setFilter = (next: { kind?: string; tech?: string }) => {
    const entries = Object.entries(next).filter(([, value]) => value && value !== "all");
    setParams(Object.fromEntries(entries) as Record<string, string>, { replace: true });
  };

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
          onChange={(value) => setFilter({ kind: value, tech: tool?.name })}
          items={[
            { value: "all", label: "All", count: projects.length },
            ...kinds.map((item) => ({
              value: item,
              label: plural(item),
              count: projects.filter((project) => project.kind === item).length,
            })),
          ]}
        />

        {tool && (
          <p className="mt-4 flex flex-wrap items-center gap-2 text-[14px] text-muted-foreground">
            Built with
            <button
              type="button"
              onClick={() => setFilter({ kind })}
              aria-label={`Clear the ${tool.name} filter`}
              className="tag-accent gap-1.5"
            >
              {tool.name}
              <X className="h-3 w-3" />
            </button>
            <span>
              {shown.length} {shown.length === 1 ? "project" : "projects"}
            </span>
          </p>
        )}

        <RevealList key={`${kind}-${tool?.name}`} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* The projects above are private (client-owned, or my own products);
          this is code anyone can read. */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          title="Public code"
          lead="The projects above are private: client code belongs to the client. These repositories are open to read."
        />
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {publicCode.map((repo) => (
            <li key={repo.url}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="card card-interactive flex h-full flex-col p-5 no-underline"
              >
                <span className="flex items-center gap-2 t-body-strong text-foreground">
                  <Github className="h-4 w-4 shrink-0" />
                  {repo.name}
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                </span>
                <span className="mt-2 text-[14px] leading-6 text-muted-foreground">{repo.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <ContactBand />
    </>
  );
}
