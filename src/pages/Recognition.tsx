import { useMemo, useState } from "react";
import { ExternalLink, Image as ImageIcon, Trophy } from "lucide-react";
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
          caption: `${item.title}, ${item.issuer}`,
        })),
    [],
  );

  const indexOfImage = (src?: string) =>
    src ? proofs.findIndex((proof) => proof.src === src) : -1;

  return (
    <>
      <PageHeader
        title="Awards & certificates"
        lead={`${recognitions.length} competitions decided by judges, and ${certifications.length} courses and tests. Certificates are attached where I have them, with a link to verify where the issuer offers one.`}
      />

      <Section className="pt-8 sm:pt-10">
        <SectionHeading
          title="Competitions"
          lead="Judged against other teams, which is why they come first."
        />
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {recognitions.map((item) => {
            const imageIndex = indexOfImage(item.image);
            return (
              <li key={item.id} className="card flex flex-col overflow-hidden">
                {imageIndex >= 0 && (
                  <button
                    type="button"
                    onClick={() => setLightbox({ open: true, index: imageIndex })}
                    className="block overflow-hidden border-b bg-surface"
                    aria-label={`View certificate: ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </button>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag-accent">
                      <Trophy className="h-3.5 w-3.5" />
                      {item.prize}
                    </span>
                    <time className="text-[13.5px] text-muted-foreground tabular">{item.date}</time>
                  </div>
                  <h3 className="t-subtitle mt-3">{item.title}</h3>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">
                    {item.issuer}
                    {item.location && `, ${item.location}`}
                  </p>
                  <p className="mt-3 flex-1 text-[14.5px] leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <ChipList items={item.skills} className="mt-4" />
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          title="Courses and tests"
          lead="Newest first. Where the issuer has a page that confirms a certificate, it is linked."
        />
        <ul className="card mt-5 divide-y divide-divider overflow-hidden">
          {certifications.map((item) => {
            const imageIndex = indexOfImage(item.image);
            return (
              <li
                key={item.id}
                className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6 sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="t-body-strong">{item.title}</h3>
                  <p className="mt-0.5 text-[14px] text-muted-foreground">
                    {item.issuer}, <time className="tabular">{item.date}</time>
                  </p>
                  <p className="mt-2 text-[14.5px] leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <ChipList items={item.skills} className="mt-3" />
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-standard btn-sm"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Verify
                    </a>
                  )}
                  {imageIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => setLightbox({ open: true, index: imageIndex })}
                      className="btn-subtle btn-sm"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
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
