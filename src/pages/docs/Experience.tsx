import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Bullets, H2, P, PageHeader, TagRow } from "@/components/docs/prose";
import { experiencePayload } from "@/data/payloads";
import { workHistory, education, type TimelineEntry } from "@/data/experience";

/**
 * Career as a changelog.
 *
 * Newest first, each entry stamped with its period the way a release note is
 * stamped with its date — the one metaphor in this reference that costs the
 * reader nothing, because a reverse-chronological list of dated changes is
 * what a CV already is.
 */

function Entry({ entry, latest }: { entry: TimelineEntry; latest?: boolean }) {
  return (
    <section className="border-t border-border pt-7 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <time className="font-mono text-[12px] text-muted-foreground tabular">
          {entry.period}
        </time>
        {latest && (
          <span className="status status-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            current
          </span>
        )}
        <span className="font-mono text-[11px] text-muted-foreground/60">
          {entry.location}
        </span>
      </div>

      <h3 className="mt-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-foreground">
        {entry.role}
      </h3>
      <p className="mt-0.5 text-[13.5px] text-muted-foreground">{entry.org}</p>

      <Bullets items={entry.bullets} />

      {entry.tech && <TagRow items={entry.tech} />}
    </section>
  );
}

export default function Experience() {
  return (
    <DocsPage
      title="Experience"
      aside={
        <CodePanel
          method="GET"
          path="/experience"
          response={experiencePayload}
        />
      }
    >
      <PageHeader
        method="GET"
        path="/experience"
        title="Experience"
        lead="Four years of freelance work and the qualifications behind it, newest first."
      />

      <H2>Work</H2>
      <P>
        Three engagements, all remote, across India and Germany. Every one was
        solo: requirements through deployment through maintenance.
      </P>

      <div className="mt-8 space-y-7">
        {workHistory.map((entry, index) => (
          <Entry key={entry.period} entry={entry} latest={index === 0} />
        ))}
      </div>

      <H2>Education</H2>
      <P>
        A diploma into a direct second-year degree entry, specialising in data
        science. Marks are given as they appear on the transcripts rather than
        rounded upward.
      </P>

      <div className="mt-8 space-y-7">
        {education.map((entry) => (
          <Entry key={entry.period} entry={entry} />
        ))}
      </div>
    </DocsPage>
  );
}
