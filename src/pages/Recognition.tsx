import { useEffect, useMemo, useState } from "react";
import { ExternalLink, ImageIcon, Trophy } from "@/components/icons";
import {
  ChipList,
  ContactBand,
  PageHeader,
  PageTabs,
  Section,
  SectionHeading,
} from "@/components/primitives";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";
import { notify } from "@/components/notify";
import { recognitions, certifications } from "@/data/recognition";
import { aboutTabs } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

/**
 * Awards and courses, kept apart on purpose: a judged competition and a video
 * course are not the same claim, and pooling them would let the weaker items
 * borrow credibility from the stronger ones.
 */
export default function Recognition() {
  usePageTitle("Recognition");

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // Once per visitor: the top achievement pops as a notification.
  useEffect(() => {
    try {
      if (localStorage.getItem("achievement-seen")) return;
      localStorage.setItem("achievement-seen", "1");
    } catch {
      return;
    }
    const top = recognitions[0];
    const timer = window.setTimeout(
      () => notify("Achievement unlocked", { kind: "achievement", body: `${top.prize}: ${top.title}` }),
      700,
    );
    return () => window.clearTimeout(timer);
  }, []);

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
        title="Recognition"
        lead={`${recognitions.length} competitions decided by judges, and ${certifications.length} courses and tests. Certificates are attached where I have them, with a link to verify where the issuer offers one.`}
      >
        <PageTabs label="About" items={aboutTabs} className="mt-6" />
      </PageHeader>

      <Section className="pt-8 sm:pt-10">
        <SectionHeading
          title="Achievements"
          lead="Competitions judged against other teams, which is why they come first."
        />
        {/* Shown as achievements: a medallion, "unlocked" and the date. */}
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {recognitions.map((item) => {
            const imageIndex = indexOfImage(item.image);
            return (
              <li key={item.id} className="card flex flex-col overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-raised ring-4 ring-accent"
                  >
                    <Trophy className="h-7 w-7" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-primary">
                      Achievement unlocked · <time className="tabular">{item.date}</time>
                    </p>
                    <h3 className="t-subtitle mt-1">{item.prize}</h3>
                    <p className="mt-0.5 text-[14px] text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-[13.5px] text-muted-foreground">
                      {item.issuer}
                      {item.location && `, ${item.location}`}
                    </p>
                  </div>
                </div>
                <p className="flex-1 px-5 text-[14.5px] leading-6 text-muted-foreground">{item.description}</p>
                <ChipList items={item.skills} className="mt-4 px-5" />
                {imageIndex >= 0 && (
                  <button
                    type="button"
                    onClick={() => setLightbox({ open: true, index: imageIndex })}
                    className="m-2 mt-5 block overflow-hidden rounded-2xl bg-surface"
                    aria-label={`View certificate: ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="aspect-[16/7] w-full object-cover object-top transition-opacity hover:opacity-90"
                    />
                  </button>
                )}
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
