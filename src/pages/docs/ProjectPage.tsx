import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Lock, Maximize2, Play } from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import {
  Bullets,
  Callout,
  H2,
  P,
  PageHeader,
  Pill,
  TagRow,
} from "@/components/docs/prose";
import ArchitectureDiagram from "@/components/architecture-diagram";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import { getProjectBySlug, getProjectMedia } from "@/data/projects";
import { projectPayload } from "@/data/payloads";
import { mediaTransitionName } from "@/lib/view-transition";

/**
 * One project.
 *
 * The sections are fixed across all ten so they can be compared, and they are
 * ordered for someone who cannot read the stack list: the video and the
 * screenshots come before the architecture, because seeing the software work
 * is the evidence that needs no translation.
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // The walkthrough is already the hero player above; including it again as a
  // gallery tile would show the same thing twice.
  const screenshots: MediaItem[] = useMemo(
    () =>
      project
        ? getProjectMedia(project).filter((item) => item.type === "image")
        : [],
    [project],
  );

  if (!project) {
    return (
      <DocsPage
        title="Not found"
        aside={
          <CodePanel
            method="GET"
            path={`/projects/${slug ?? ""}`}
            status="404 Not Found"
            response={{
              error: { status: 404, code: "not_found", resource: slug ?? null },
            }}
          />
        }
      >
        <PageHeader
          method="GET"
          path={`/projects/${slug ?? ""}`}
          title="No such project"
          lead="The link may be out of date."
        />
        <P>
          Everything I have built is listed under{" "}
          <Link to="/projects">My work</Link>.
        </P>
      </DocsPage>
    );
  }

  const name = project.title.split(" — ")[0];
  const paragraphs = project.description
    .split("\n\n")
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <DocsPage
      title={name}
      aside={
        <CodePanel
          method="GET"
          path={`/projects/${project.slug}`}
          response={projectPayload(project.slug)}
        />
      }
    >
      <PageHeader
        method="GET"
        path={`/projects/${project.slug}`}
        title={name}
        lead={project.summary}
        meta={
          <>
            <Pill tone={project.category === "product" ? "ok" : "idle"}>
              {project.category === "product" ? "my own product" : "client work"}
            </Pill>
            <Pill>{project.urltext}</Pill>
            {project.video?.duration && (
              <Pill>
                <Play className="h-2.5 w-2.5" />
                {project.video.duration} walkthrough
              </Pill>
            )}
          </>
        }
      />

      {/* Hero media. The poster pairs with the card thumbnail in the view
          transition, so the image the visitor clicked grows into this. */}
      {project.video ? (
        <figure className="mb-8">
          <video
            controls
            preload="none"
            poster={project.video.poster ?? project.imageUrl}
            src={project.video.src}
            style={{ viewTransitionName: mediaTransitionName(project.slug) }}
            className="w-full rounded-xl border border-border bg-black"
          />
          <figcaption className="mt-2 text-[12.5px] text-muted-foreground">
            A recorded walkthrough of the software running — the quickest way to
            see what it does.
          </figcaption>
        </figure>
      ) : project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={`${name} screenshot`}
          style={{ viewTransitionName: mediaTransitionName(project.slug) }}
          className="mb-8 w-full rounded-xl border border-border object-cover"
        />
      ) : null}

      <H2>What it is</H2>
      {paragraphs.map((text, index) => (
        <P key={index}>{text}</P>
      ))}

      {project.role && (
        <p className="mt-5 rounded-lg border border-border bg-secondary/30 px-4 py-3 text-[13.5px]">
          <span className="mono-label mr-2">My role</span>
          {project.role}
        </p>
      )}

      {screenshots.length > 0 && (
        <>
          <H2>Screenshots</H2>
          <P>
            {screenshots.length} captures of the real software. Select any to
            open it full size.
          </P>
          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {screenshots.map((item, index) => (
              <li key={item.src}>
                <button
                  type="button"
                  onClick={() => setLightbox({ open: true, index })}
                  aria-label={item.alt || `Screenshot ${index + 1}`}
                  className="group relative block w-full overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/50"
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:bg-background/40 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4 text-foreground" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <>
          <H2>What it does</H2>
          <Bullets items={project.highlights} />
        </>
      )}

      <H2>Built with</H2>
      <P>
        The technologies behind it. If they mean nothing to you, the short
        version is on <Link to="/skills">Skills &amp; tools</Link>.
      </P>
      <TagRow items={project.tags} />

      {project.architecture && (
        <>
          <H2>How it is put together</H2>
          <P>
            For the technical reader: the parts below are listed in the order a
            request travels through them, from what you click down to where the
            data is stored.
          </P>
          <div className="mt-6">
            <ArchitectureDiagram architecture={project.architecture} />
          </div>
        </>
      )}

      <H2>Can you see it live?</H2>
      {project.liveUrl ? (
        <P>
          Yes — it is online at{" "}
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            {project.urltext}
            <ExternalLink className="ml-1 inline h-3 w-3 align-baseline" />
          </a>
          .
        </P>
      ) : (
        <P>
          Not publicly — {project.urltext.toLowerCase()}. That is why the
          screenshots and the walkthrough above are of the real thing running,
          rather than a demo.
        </P>
      )}

      <Callout title="The code is private">
        <span className="flex items-start gap-2">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {project.category === "product"
              ? "This is a product of mine that has not been released, so the code stays closed."
              : "This was paid work, so the code belongs to the client and stays closed."}{" "}
            I am glad to walk through it and explain the decisions on a call —{" "}
            <Link to="/contact">get in touch</Link>.
          </span>
        </span>
      </Callout>

      <MediaLightbox
        items={screenshots}
        open={lightbox.open}
        startIndex={lightbox.index}
        title={name}
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </DocsPage>
  );
}
