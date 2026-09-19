import { Link } from "react-router-dom";
import {
  ContactBand,
  PageHeader,
  Section,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { projectGroups, getProjectsByCategory, projects } from "@/data/projects";
import { usePageTitle } from "@/lib/page-title";

/**
 * The index of the work, grouped by who owns it: a product I conceived is a
 * different claim from a site built to someone else's brief.
 */
export default function Projects() {
  usePageTitle("Work");

  const products = getProjectsByCategory("product");
  const clientWork = getProjectsByCategory("client");

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Everything I have built"
        lead={`${projects.length} finished systems — ${products.length} of my own and ${clientWork.length} built for businesses. Every one was designed, built and put live by me alone. Each card opens a page with screenshots of the software running, and most have a video walkthrough.`}
      />

      {projectGroups.map((group, index) => (
        <Section key={group.category} tone={index % 2 === 1 ? "surface" : "plain"}>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">
              {group.category === "product" ? "My own products" : "Client work"}
            </p>
            <h2 className="heading-section">{group.title}</h2>
            <p className="lead mt-4">{group.blurb}</p>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getProjectsByCategory(group.category).map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tight>
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="heading-sub">Why there are no code links</h2>
          <p className="prose-plain mt-3 max-w-3xl">
            The client systems were paid work, so the code belongs to them, and
            my own products are not released yet. So instead of a link to the
            source, every page here shows the software itself — screenshots,
            walkthroughs and a written account of how it is built. I am happy to
            walk through any of it on a call —{" "}
            <Link to="/contact">get in touch</Link>.
          </p>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
