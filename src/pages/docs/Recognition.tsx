import { useMemo, useState } from "react";
import { ExternalLink, Trophy } from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { H2, P, PageHeader, Pill } from "@/components/docs/prose";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import { recognitionPayload } from "@/data/payloads";
import { recognitions, certifications } from "@/data/recognition";

/**
 * Awards and courses, kept apart on purpose.
 *
 * A judged competition and a video course are not the same claim, and pooling
 * them into one badge wall would let the weaker items borrow credibility from
 * the stronger ones.
 */
export default function Recognition() {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const proofs = useMemo<MediaItem[]>(
    () =>
      [...recognitions, ...certifications]
        .filter((item) => Boolean(item.image))
        .map((item) => ({
          type: "image" as const,
          src: item.image as string,
          alt: item.title,
          caption: `${item.title} — ${item.issuer}`,
        })),
    [],
  );

  const indexOfImage = (src?: string) =>
    src ? proofs.findIndex((proof) => proof.src === src) : -1;

  return (
    <DocsPage
      title="Awards & certificates"
      aside={
        <CodePanel
          method="GET"
          path="/recognition"
          response={recognitionPayload}
        />
      }
    >
      <PageHeader
        method="GET"
        path="/recognition"
        title="Awards & certificates"
        lead={`${recognitions.length} competitions judged by other people, and ${certifications.length} courses and tests completed. The certificates themselves are attached where I have them.`}
      />

      <H2>Competitions</H2>
      <P>
        These were decided by judges against other teams, which is why they
        count for more than the courses further down.
      </P>

      <div className="mt-6 space-y-3">
        {recognitions.map((item) => {
          const imageIndex = indexOfImage(item.image);
          return (
            <section
              key={item.id}
              className="rounded-xl border border-border p-4 md:p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="ok">
                  <Trophy className="h-2.5 w-2.5" />
                  {item.prize}
                </Pill>
                <time className="font-mono text-[11.5px] text-muted-foreground tabular">
                  {item.date}
                </time>
                {item.location && (
                  <span className="font-mono text-[11px] text-muted-foreground/60">
                    {item.location}
                  </span>
                )}
              </div>

              <h3 className="mt-2.5 text-[15px] font-semibold leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] text-primary">{item.issuer}</p>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              {imageIndex >= 0 && (
                <button
                  type="button"
                  onClick={() => setLightbox({ open: true, index: imageIndex })}
                  className="mt-4 block w-full overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/50"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-64 w-full object-cover object-top"
                  />
                </button>
              )}
            </section>
          );
        })}
      </div>

      <H2>Certifications</H2>
      <P>
        Courses and tests, newest first. Where the issuer offers a page that
        confirms the certificate is genuine, I have linked it — one you cannot
        check is worth less, and you should be able to tell which is which.
      </P>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {certifications.map((item) => {
          const imageIndex = indexOfImage(item.image);
          return (
            <li key={item.id} className="p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="min-w-0 text-[14px] font-medium leading-snug text-foreground">
                  {item.title}
                </h3>
                <time className="shrink-0 font-mono text-[11px] text-muted-foreground tabular">
                  {item.date}
                </time>
              </div>

              <p className="mt-1 text-[12.5px] text-muted-foreground">
                {item.issuer}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <ul className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded border border-border bg-secondary/50 px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="ml-auto flex shrink-0 items-center gap-3">
                  {imageIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({ open: true, index: imageIndex })
                      }
                      className="font-mono text-[11px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
                    >
                      scan
                    </button>
                  )}
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-primary no-underline hover:underline"
                    >
                      verify
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <MediaLightbox
        items={proofs}
        open={lightbox.open}
        startIndex={lightbox.index}
        title="Recognition"
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </DocsPage>
  );
}
