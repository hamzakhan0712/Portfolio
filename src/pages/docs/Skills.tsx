import { Link } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Callout, H2, P, PageHeader } from "@/components/docs/prose";
import { skillsPayload } from "@/data/payloads";
import { layers, runtimeLanguages, notInTheStack, type Tool } from "@/data/skills";

/**
 * The stack, in request order.
 *
 * The ordering is the argument: a tool is described by where it sits when
 * something is actually running, not by which half of "full-stack" it belongs
 * to. Reading top to bottom follows one request from the browser to the store
 * and back.
 */

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-2.5 py-2 transition-colors hover:border-primary/40 hover:bg-secondary/60">
      <img
        src={tool.icon}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        className="h-4 w-4 shrink-0 object-contain"
      />
      <span className="min-w-0 truncate text-[12.5px] text-foreground/85">
        {tool.name}
      </span>
    </li>
  );
}

export default function Skills() {
  return (
    <DocsPage
      title="Skills & tools"
      aside={<CodePanel method="GET" path="/skills" response={skillsPayload} />}
    >
      <PageHeader
        method="GET"
        path="/skills"
        title="Skills & tools"
        lead="The technologies I work with, arranged in the order they run — from the screen you touch, down to where the data is kept."
      />

      <H2>Languages I write in</H2>
      <P>
        Used across everything below, so they sit on their own rather than
        under one heading.
      </P>
      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {runtimeLanguages.map((tool) => (
          <ToolChip key={tool.name} tool={tool} />
        ))}
      </ul>

      <H2>How a request travels</H2>
      <P>
        Every time you use an app, your tap becomes a request that passes down
        through these five stages and comes back with an answer. Each box is one
        stage, and the tools listed are the ones I have used at that stage.
      </P>

      <div className="mt-6 space-y-3">
        {layers.map((layer, index) => (
          <div key={layer.id}>
            <section className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] text-muted-foreground/60 tabular">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[15px] font-semibold text-foreground">
                  {layer.name}
                </h3>
                <span className="font-mono text-[11.5px] text-primary">
                  {layer.role}
                </span>
              </div>

              <ul className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {layer.tools.map((tool) => (
                  <ToolChip key={tool.name} tool={tool} />
                ))}
              </ul>
            </section>

            {index < layers.length - 1 && (
              <div
                aria-hidden
                className="relative flex h-5 items-center justify-center"
              >
                <span className="h-full w-px bg-border" />
                <span
                  className="flow-dot absolute h-1.5 w-1.5 rounded-full bg-primary"
                  style={{ animationDelay: `${index * 0.35}s` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Callout tone="warn" title="Not in this stack">
        <p className="mb-2">
          Listed because absence is information too — none of these appear in
          any project write-up on this site, so the reference should not imply
          them.
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {notInTheStack.map((item) => (
            <li
              key={item}
              className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Callout>

      <H2>Where I have used them</H2>
      <P>
        Every tool above is named in at least one entry under{" "}
        <Link to="/projects">My work</Link> — the stack list is derived from the
        work rather than aspirational. The deepest use of the analytics layer is
        in <Link to="/projects/novem">Novem</Link>; the heaviest Django and
        WebSocket work is in{" "}
        <Link to="/projects/initcore-crm">InitCore CRM</Link>.
      </P>
    </DocsPage>
  );
}
