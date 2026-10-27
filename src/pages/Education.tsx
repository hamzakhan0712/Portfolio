import { GraduationCap } from "@/components/icons";
import {
  CheckList,
  ChipList,
  ContactBand,
  PageHeader,
  PageTabs,
  Section,
} from "@/components/primitives";
import { aboutTabs } from "@/data/site";
import { education, type TimelineEntry } from "@/data/experience";
import { usePageTitle } from "@/lib/page-title";

/**
 * Education as a timeline, newest first. The line and the markers are there
 * because the entries really are a sequence in time.
 */
function Entry({ entry, latest }: { entry: TimelineEntry; latest?: boolean }) {
  return (
    <li className="relative pl-10 sm:pl-12">
      <span
        aria-hidden
        className={
          latest
            ? "absolute left-0 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground sm:left-0.5"
            : "absolute left-[7px] top-[26px] h-3.5 w-3.5 rounded-full border-2 border-tertiary-foreground bg-background sm:left-[9px]"
        }
      >
        {latest && <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />}
      </span>

      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time className="text-[13.5px] font-semibold text-foreground tabular">
            {entry.period}
          </time>
          <span className="text-[13.5px] text-muted-foreground">{entry.location}</span>
        </div>
        <h3 className="t-subtitle mt-2">{entry.role}</h3>
        <p className="mt-0.5 text-[14.5px] text-muted-foreground">{entry.org}</p>

        <CheckList items={entry.bullets} className="mt-5" />

        {entry.tech && (
          <>
            <p className="t-caption mt-5">Subjects</p>
            <ChipList items={entry.tech} className="mt-2" />
          </>
        )}
      </div>
    </li>
  );
}

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
        <ol className="relative max-w-4xl space-y-4 before:absolute before:bottom-8 before:left-[13px] before:top-8 before:w-px before:bg-border sm:before:left-[15px]">
          {education.map((entry, index) => (
            <Entry key={entry.period} entry={entry} latest={index === 0} />
          ))}
        </ol>
      </Section>

      <ContactBand />
    </>
  );
}
