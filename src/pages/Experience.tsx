import {
  CheckList,
  ChipList,
  ContactBand,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { workHistory, education, type TimelineEntry } from "@/data/experience";
import { usePageTitle } from "@/lib/page-title";

/**
 * Career and qualifications as a timeline, newest first.
 */
function Entry({ entry, current }: { entry: TimelineEntry; current?: boolean }) {
  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        aria-hidden
        className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-[2px]"
      >
        {current && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
      </span>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <time className="text-[14px] font-medium text-foreground tabular">
            {entry.period}
          </time>
          {current && <span className="chip-ok">Current</span>}
          <span className="text-[14px] text-muted-foreground">{entry.location}</span>
        </div>
        <h3 className="mt-3 text-[21px] font-semibold leading-snug text-foreground">
          {entry.role}
        </h3>
        <p className="mt-1 text-[15.5px] text-muted-foreground">{entry.org}</p>

        <CheckList items={entry.bullets} className="mt-6" />

        {entry.tech && <ChipList items={entry.tech} className="mt-6" />}
      </div>
    </li>
  );
}

function Timeline({
  entries,
  markCurrent = false,
}: {
  entries: TimelineEntry[];
  markCurrent?: boolean;
}) {
  return (
    <ol className="relative mt-10 space-y-8 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-border sm:before:left-[9px]">
      {entries.map((entry, index) => (
        <Entry key={entry.period} entry={entry} current={markCurrent && index === 0} />
      ))}
    </ol>
  );
}

export default function Experience() {
  usePageTitle("Experience");

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Four years of work, and the education behind it"
        lead="Every engagement was remote and solo — from requirements through deployment to maintenance. Newest first."
      />

      <Section>
        <SectionHeading
          eyebrow="Work"
          title="Where I have worked"
          lead="Three engagements, every one of them remote and solo."
        />
        <Timeline entries={workHistory} markCurrent />
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Education"
          title="What I studied"
          lead="A diploma into a direct second-year degree entry, specialising in data science. Marks are given as they appear on the transcripts."
        />
        <Timeline entries={education} />
      </Section>

      <ContactBand />
    </>
  );
}
