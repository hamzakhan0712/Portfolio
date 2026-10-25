import { Link } from "react-router-dom";
import { ContactBand, PageHeader, Section, SectionHeading } from "@/components/primitives";
import { layers, runtimeLanguages, type Tool } from "@/data/skills";
import { usePageTitle } from "@/lib/page-title";

/**
 * A tool, drawn like an app tile. The logo always sits on white: many brand
 * marks are dark and would vanish on the dark theme's cards otherwise.
 */
function ToolTile({ tool }: { tool: Tool }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-secondary p-2 pr-3 transition-colors hover:bg-secondary-solid">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-rest">
        <img
          src={tool.icon}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className="h-5 w-5 object-contain"
        />
      </span>
      <span className="text-[14px] text-foreground">{tool.name}</span>
    </li>
  );
}

export default function Skills() {
  usePageTitle("Skills");

  return (
    <>
      <PageHeader
        title="Skills"
        lead="The languages, frameworks and tools I use to design, build and ship software across the stack."
      />

      <Section className="pt-8 sm:pt-10">
        <SectionHeading title="Languages" />
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {runtimeLanguages.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </ul>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading title="Frameworks, databases and tools" />
        <ul className="mt-5 grid gap-2">
          {layers.map((layer) => (
            <li key={layer.id} className="card p-5 sm:p-6">
              <div className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-8">
                <div>
                  <h3 className="t-subtitle">{layer.name}</h3>
                  <p className="mt-1 text-[14px] leading-6 text-muted-foreground">{layer.role}</p>
                </div>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {layer.tools.map((tool) => (
                    <ToolTile key={tool.name} tool={tool} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <p className="prose-plain mt-8">
          See them in use across my <Link to="/projects">projects</Link>: for example{" "}
          <Link to="/projects/novem">Novem</Link> (Tauri, FastAPI, DuckDB),{" "}
          <Link to="/projects/initcore-crm">InitCore CRM</Link> (Django, Channels, PostgreSQL) and{" "}
          <Link to="/projects/sk-trading-web">S.K Trading &amp; Co.</Link> (Next.js on Cloudflare
          Workers).
        </p>
      </Section>

      <ContactBand />
    </>
  );
}
