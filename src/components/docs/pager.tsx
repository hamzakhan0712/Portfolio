import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { neighbours } from "@/data/docs-nav";

/**
 * Previous / next, in the sidebar's reading order.
 *
 * A reference split across pages needs a way through it that is not the
 * sidebar — without this, a visitor who scrolls to the bottom has nowhere to
 * go and simply leaves.
 */
export function Pager({ pathname }: { pathname: string }) {
  const { previous, next } = neighbours(pathname);
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          to={previous.href}
          className="group flex flex-col gap-1 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary/40 hover:bg-secondary/40"
        >
          <span className="mono-label flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="truncate text-[14px] font-medium text-foreground">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link
          to={next.href}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 text-right transition-colors hover:border-primary/40 hover:bg-secondary/40 sm:col-start-2"
        >
          <span className="mono-label flex items-center gap-1.5">
            Next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="max-w-full truncate text-[14px] font-medium text-foreground">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}

export default Pager;
