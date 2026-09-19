import { Link } from "react-router-dom";
import {
  ChipList,
  ContactBand,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { layers, runtimeLanguages, notInTheStack, type Tool } from "@/data/skills";
import { usePageTitle } from "@/lib/page-title";

/**
 * The tools, grouped by the stage of a running system they belong to. The
 * grouping is explained in one sentence so a non-technical reader can still
 * follow the shape even if the names mean nothing.
 */

/** A one-line, plain-English gloss for each layer. */
const layerGloss: Record<string, string> = {
  interface: "What people see and click — the screens of a website or app.",
  edge: "Where the software lives online, and how updates get there safely.",
  application: "The logic behind the screens — the part that does the actual work.",
  data: "Where information is stored, kept consistent, and searched.",
  analytics: "Turning stored data into forecasts, reports and answers.",
};

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
        <img
          src={tool.icon}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className="h-5 w-5 object-contain"
        />
      </span>
      <span className="text-[15px] font-medium text-foreground">{tool.name}</span>
    </li>
  );
}

export default function Skills() {
  usePageTitle("Skills");

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="The tools I build with"
        lead="Arranged in the order a running system uses them — from the screen you touch, down to where the data is kept. Every tool here appears in at least one project on this site."
      />

      <Section>
        <SectionHeading
          eyebrow="Languages"
          title="Programming languages I write in"
          lead="Used across everything below."
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {runtimeLanguages.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="The stack"
          title="Five stages of a running system"
          lead="Every time you use an app, your tap travels down through these stages and comes back with an answer. Each card is one stage, with the tools I have used there."
        />
        <ol className="mt-10 grid gap-5">
          {layers.map((layer, index) => (
            <li key={layer.id} className="card p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[16rem_1fr] md:gap-10">
                <div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
                    Stage {index + 1}
                  </span>
                  <h3 className="mt-2 text-[21px] font-semibold text-foreground">
                    {layer.name}
                  </h3>
                  <p className="mt-1 text-[14.5px] font-medium text-muted-foreground">
                    {layer.role}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                    {layerGloss[layer.id]}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {layer.tools.map((tool) => (
                    <ToolTile key={tool.name} tool={tool} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Where I have used them</p>
            <h2 className="heading-sub">Every tool traces back to a project</h2>
            <p className="prose-plain mt-4">
              The list above is drawn from the work rather than from ambition.
              The deepest use of the analytics stage is in{" "}
              <Link to="/projects/novem">Novem</Link>; the heaviest web and
              real-time work is in{" "}
              <Link to="/projects/initcore-crm">InitCore CRM</Link>. See{" "}
              <Link to="/projects">all projects</Link>.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7">
            <p className="eyebrow mb-3">Not in my toolkit yet</p>
            <h2 className="heading-sub">Tools I have not run in production</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Listed because absence is information too — none of these appear
              in any project on this site. It is a statement about my track
              record, not about what I can learn.
            </p>
            <ChipList items={notInTheStack} className="mt-5" />
          </div>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
