import { useMemo, useState } from "react";
import { ExternalLink, Trophy } from "lucide-react";
import {
  ChipList,
  ContactBand,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/primitives";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import { recognitions, certifications } from "@/data/recognition";
import { usePageTitle } from "@/lib/page-title";

/**
 * Awards and courses, kept apart on purpose: a judged competition and a video
 * course are not the same claim, and pooling them would let the weaker items
 * borrow credibility from the stronger ones.
 */
export default function Recognition() {
  usePageTitle("Awards & certificates");

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
    <>
      <PageHeader
        eyebrow="Awards & certificates"
        title="Competitions won and courses completed"
        lead={`${recognitions.length} competitions judged by other people, and ${certifications.length} courses and tests completed. The certificates themselves are attached where I have them.`}
      />

      <Section>
        <SectionHeading
          eyebrow="Competitions"
          title="Judged against other teams"
          lead="These were decided by judges, which is why they count for more than the courses further down."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {recognitions.map((item) => {
            const imageIndex = indexOfImage(item.image);
            return (
              <li key={item.id} className="card flex flex-col overflow-hidden">
                {imageIndex >= 0 && (
                  <button
                    type="button"
                    onClick={() => setLightbox({ open: true, index: imageIndex })}
                    className="group block overflow-hidden border-b border-border bg-secondary"
                    aria-label={`View certificate: ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip-ok">
                      <Trophy className="h-3.5 w-3.5" />
                      {item.prize}
                    </span>
                    <time className="text-[14px] text-muted-foreground tabular">
                      {item.date}
                    </time>
                    {item.location && (
                      <span className="text-[14px] text-muted-foreground">
                        · {item.location}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-primary">{item.issuer}</p>
                  <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ChipList items={item.skills} className="mt-5" />
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Certifications"
          title="Courses and tests"
          lead="Newest first. Where the issuer offers a page that confirms the certificate is genuine, it is linked — a certificate you cannot check is worth less, and you should be able to tell which is which."
        />
        <ul className="card mt-10 divide-y divide-border overflow-hidden">
          {certifications.map((item) => {
            const imageIndex = indexOfImage(item.image);
            return (
              <li key={item.id} className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:p-7">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-muted-foreground">
                    {item.issuer} · <time className="tabular">{item.date}</time>
                  </p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ChipList items={item.skills} className="mt-4" />
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary btn-sm"
                    >
                      Verify
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {imageIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => setLightbox({ open: true, index: imageIndex })}
                      className="btn-ghost btn-sm"
                    >
                      View certificate
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <ContactBand />

      <MediaLightbox
        items={proofs}
        open={lightbox.open}
        startIndex={lightbox.index}
        title="Certificates"
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </>
  );
}
