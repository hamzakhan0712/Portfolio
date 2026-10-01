import { ContactBand, PageHeader, Section } from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { usePageTitle } from "@/lib/page-title";

export default function Projects() {
  usePageTitle("Projects");

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        lead={`${projects.length} projects spanning web applications, websites and desktop apps. Each one opens a page with screenshots, a video walkthrough and details of how it is built.`}
      />

      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      <ContactBand />
    </>
  );
}
