import { ArrowDown } from "lucide-react";
import type { Architecture } from "@/data/projects";

/**
 * How a system is put together, drawn as the parts a request passes through
 * — from what you click, down to where the data is stored.
 *
 * Shown only for projects whose write-up establishes that shape. It is
 * labelled as being for the technical reader, and a visitor who skips it
 * loses nothing the rest of the page has not already said.
 */
export function ArchitectureOverview({ architecture }: { architecture: Architecture }) {
  const { summary, tiers, notes } = architecture;

  return (
    <div className="card p-6 sm:p-8">
      <p className="text-[16px] leading-relaxed text-foreground">{summary}</p>

      <ol className="mt-6 space-y-3">
        {tiers.map((tier, index) => (
          <li key={tier.label}>
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[13px] font-semibold text-muted-foreground tabular">
                  {index + 1}
                </span>
                <h4 className="text-[16px] font-semibold text-foreground">
                  {tier.label}
                </h4>
                {tier.detail && (
                  <span className="text-[14px] text-primary">{tier.detail}</span>
                )}
              </div>
              <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[14.5px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < tiers.length - 1 && (
              <div aria-hidden className="flex justify-center py-1.5">
                <ArrowDown className="h-4 w-4 text-muted-foreground/60" />
              </div>
            )}
          </li>
        ))}
      </ol>

      {notes && notes.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-border pt-5">
          {notes.map((note) => (
            <li
              key={note}
              className="text-[14.5px] leading-relaxed text-muted-foreground"
            >
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchitectureOverview;
