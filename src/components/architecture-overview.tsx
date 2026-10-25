import { ArrowDown } from "lucide-react";
import type { Architecture } from "@/data/projects";

/**
 * How a system is put together, drawn as the parts a request passes through
 * — from what you click, down to where the data is stored. The tiers are a
 * real sequence, which is why they are numbered.
 *
 * Shown only for projects whose write-up establishes that shape. A visitor
 * who skips it loses nothing the rest of the page has not already said.
 */
export function ArchitectureOverview({ architecture }: { architecture: Architecture }) {
  const { summary, tiers, notes } = architecture;

  return (
    <div className="card p-5 sm:p-6">
      <p className="max-w-[68ch] text-[15px] leading-6 text-foreground">{summary}</p>

      <ol className="mt-5">
        {tiers.map((tier, index) => (
          <li key={tier.label}>
            <div className="rounded-lg border bg-background/60 p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-accent text-[12px] font-semibold text-accent-foreground tabular">
                  {index + 1}
                </span>
                <h4 className="text-[15px] font-semibold text-foreground">{tier.label}</h4>
                {tier.detail && (
                  <span className="text-[13.5px] text-muted-foreground">{tier.detail}</span>
                )}
              </div>
              <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-6 text-muted-foreground">
                    <span
                      aria-hidden
                      className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < tiers.length - 1 && (
              <div aria-hidden className="flex justify-center py-1">
                <ArrowDown className="h-4 w-4 text-tertiary-foreground" strokeWidth={1.5} />
              </div>
            )}
          </li>
        ))}
      </ol>

      {notes && notes.length > 0 && (
        <ul className="mt-5 space-y-1.5 border-t border-divider pt-4">
          {notes.map((note) => (
            <li key={note} className="text-[14px] leading-6 text-muted-foreground">
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchitectureOverview;
