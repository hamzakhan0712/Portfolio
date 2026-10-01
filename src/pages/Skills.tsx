import { Link } from "react-router-dom";
import {
  ContactBand,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { layers, runtimeLanguages, type Tool } from "@/data/skills";
import { usePageTitle } from "@/lib/page-title";

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
        title="Technologies I work with"
        lead="The languages, frameworks and tools I use to design, build and ship software."
      />

      <Section>
        <SectionHeading eyebrow="Languages" title="Programming languages" />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {runtimeLanguages.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Stack" title="Frameworks, databases and tools" />
        <ol className="mt-10 grid gap-5">
          {layers.map((layer) => (
            <li key={layer.id} className="card p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[16rem_1fr] md:gap-10">
                <div>
                  <h3 className="text-[21px] font-semibold text-foreground">
                    {layer.name}
                  </h3>
                  <p className="mt-1 text-[14.5px] text-muted-foreground">
                    {layer.role}
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

      <Section tight>
        <p className="prose-plain max-w-3xl">
          See these in use across my <Link to="/projects">projects</Link> — for
          example <Link to="/projects/novem">Novem</Link> (Tauri, FastAPI,
          DuckDB) and <Link to="/projects/initcore-crm">InitCore CRM</Link>{" "}
          (Django, Channels, PostgreSQL).
        </p>
      </Section>

      <ContactBand />
    </>
  );
}
