import { GraduationCap } from "@/components/icons";
import { ContactBand, PageHeader, PageTabs, Section } from "@/components/primitives";
import { TimelineEntry, timelineClass } from "@/components/timeline-entry";
import { aboutTabs } from "@/data/site";
import { education } from "@/data/experience";
import { usePageTitle } from "@/lib/page-title";

export default function Education() {
  usePageTitle("Education");

  return (
    <>
      <PageHeader
        title="Education"
        lead="A B.E. in Computer Science & Engineering, after a Diploma in Computer Engineering. Newest first."
      >
        <PageTabs label="About" items={aboutTabs} className="mt-6" />
      </PageHeader>

      <Section className="pt-8 sm:pt-10">
        <ol className={timelineClass}>
          {education.map((entry, index) => (
            <TimelineEntry
              key={entry.period}
              entry={entry}
              latest={index === 0}
              icon={GraduationCap}
              chipsLabel="Subjects"
            />
          ))}
        </ol>
      </Section>

      <ContactBand />
    </>
  );
}
