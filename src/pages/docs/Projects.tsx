import { Link } from "react-router-dom";
import { Images, Play } from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { H2, P, PageHeader } from "@/components/docs/prose";
import { projectsPayload } from "@/data/payloads";
import { projects, type Project } from "@/data/projects";
import { mediaTransitionName } from "@/lib/view-transition";

/**
 * The index of the work.
 *
 * Deliberately the most visual page on the site: a visitor who cannot read a
 * stack list can still tell whether the software looks finished, and that
 * judgement is the one most people are actually making here.
 *
 * Grouped by who owns the work, because a product I conceived is a different
 * claim from a site built to someone else's brief.
 */

function ProjectCard({ project }: { project: Project }) {
  const shots = project.media?.length ?? 0;

  return (
    <li>
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border no-underline transition-colors hover:border-primary/50"
      >
        {project.imageUrl && (
          <div className="relative overflow-hidden border-b border-border bg-secondary/40">
            <img
              src={project.imageUrl}
              alt={`${project.title.split(" — ")[0]} screenshot`}
              loading="lazy"
              style={{ viewTransitionName: mediaTransitionName(project.slug) }}
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {project.video?.duration && (
              <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[10px] text-foreground backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 fill-current" />
                {project.video.duration}
              </span>
            )}
            {shots > 0 && (
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[10px] text-foreground backdrop-blur-sm">
                <Images className="h-2.5 w-2.5" />
                {shots}
              </span>
            )}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col p-3.5">
          <h3 className="text-[14.5px] font-semibold leading-snug text-foreground">
            {project.title.split(" — ")[0]}
          </h3>
          <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-snug text-muted-foreground">
            {project.summary}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
            {project.tags.length > 3 && (
              <li className="px-1 py-0.5 font-mono text-[10.5px] text-muted-foreground/60">
                +{project.tags.length - 3}
              </li>
            )}
          </ul>
        </div>
      </Link>
    </li>
  );
}

const products = projects.filter((p) => p.category === "product");
const clientWork = projects.filter((p) => p.category === "client");

export default function Projects() {
  return (
    <DocsPage
      title="Projects"
      aside={
        <CodePanel method="GET" path="/projects" response={projectsPayload} />
      }
    >
      <PageHeader
        method="GET"
        path="/projects"
        title="My work"
        lead={`${projects.length} finished systems — ${products.length} of my own and ${clientWork.length} built for businesses. Every one was designed, built and put live by me alone.`}
      />

      <P>
        Each card opens a page with screenshots of the software running, and
        most have a video walkthrough. You do not need to know the technologies
        to judge them — look at whether they seem like things people could
        actually use.
      </P>

      <H2>My own products</H2>
      <P>
        My idea, my design, my code, end to end. These are where the decisions
        were mine to get wrong.
      </P>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {products.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      <H2>Built for clients</H2>
      <P>
        Made for real businesses, to their brief and their brand. The hard part
        was rarely the code — it was delivering something the owner could keep
        running without me.
      </P>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {clientWork.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      <H2>Why there are no code links</H2>
      <P>
        The client systems were paid work, so the code belongs to them, and my
        own products are not released yet. So instead of a link to the source,
        every page here shows the software itself — screenshots, walkthroughs
        and a written account of how it is built. I am happy to walk through any
        of it on a call.
      </P>
    </DocsPage>
  );
}
