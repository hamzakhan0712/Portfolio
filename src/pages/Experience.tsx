import { Code } from "@/components/icons";
import { ContactBand, PageHeader, PageTabs, Section } from "@/components/primitives";
import { TimelineEntry, timelineClass } from "@/components/timeline-entry";
import { aboutTabs } from "@/data/site";
import { work } from "@/data/experience";
import { usePageTitle } from "@/lib/page-title";

export default function Experience() {
  usePageTitle("Experience");

  return (
    <>
      <PageHeader
        title="Experience"
        lead="Freelance software engineering since 2024: client projects from first conversation to handover. Newest first."
      >
        <PageTabs label="About" items={aboutTabs} className="mt-6" />
      </PageHeader>

      <Section className="pt-8 sm:pt-10">
        <ol className={timelineClass}>
          {work.map((entry, index) => (
            <TimelineEntry
              key={entry.period}
              entry={entry}
              latest={index === 0}
              icon={Code}
              chipsLabel="Stack"
            />
          ))}
        </ol>
      </Section>

      <ContactBand />
    </>
  );
}
