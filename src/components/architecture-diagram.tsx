import { motion } from "framer-motion";
import { Network } from "lucide-react";
import type { Architecture } from "@/data/projects";

/**
 * The runtime shape of a project, drawn as tiers in the order a request moves
 * through them — the same visual language the stack section uses, so the two
 * read as one system rather than two unrelated diagrams.
 *
 * Rendered only for projects that carry an `architecture` block. A front-end
 * site with no backend of mine gets no diagram, because there is nothing here
 * that its tag list does not already say.
 */
export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { summary, tiers, notes } = architecture;

  return (
    <div className="panel-terminal">
      <div className="panel-terminal-bar justify-between">
        <span className="flex items-center gap-2">
          <Network className="h-3.5 w-3.5 text-primary" />
          <span className="text-foreground/80">architecture</span>
        </span>
        <span className="tabular-nums">{tiers.length} tiers</span>
      </div>

      <div className="p-4 md:p-5">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <ol className="space-y-0">
          {tiers.map((tier, index) => (
            <li key={tier.label}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="panel-outline p-3.5"
              >
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {tier.label}
                  </span>
                  {tier.detail && (
                    <span className="font-mono text-[11px] text-primary">
                      {tier.detail}
                    </span>
                  )}
                </div>

                <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[12px] leading-snug text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary/60"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Flow between tiers */}
              {index < tiers.length - 1 && (
                <div
                  aria-hidden
                  className="relative flex h-6 items-center justify-center"
                >
                  <span className="h-full w-px bg-border" />
                  <span
                    className="flow-dot absolute h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animationDelay: `${index * 0.4}s` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>

        {notes && notes.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-border pt-4">
            {notes.map((note) => (
              <li
                key={note}
                className="flex gap-2 text-[12px] leading-relaxed text-muted-foreground"
              >
                <span aria-hidden className="font-mono text-primary/70">
                  #
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ArchitectureDiagram;
