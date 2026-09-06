import { Link } from "react-router-dom";
import { FileText, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { openSearch } from "@/lib/search-events";

export function Masthead({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1720px] items-center gap-3 px-4 md:px-6">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="-ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
        >
          {menuOpen ? (
            <X className="h-4.5 w-4.5" />
          ) : (
            <Menu className="h-4.5 w-4.5" />
          )}
        </button>

        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md py-1 pr-2"
        >
          <img
            src="/photos/avatar.webp"
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-[26px] shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <span className="truncate text-[14px] font-semibold tracking-tight text-foreground">
            Hamza Khan
          </span>
          <span className="hidden shrink-0 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            v1
          </span>
        </Link>

        <div className="flex flex-1 justify-end sm:justify-center">
          {/* A real input would imply typing here filters the page; it opens
              the palette instead, so it is a button that looks like one. */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search the reference"
            className="group flex h-8 w-8 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 text-left text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary sm:w-64 sm:justify-start sm:px-2.5"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden flex-1 truncate sm:inline">
              Search the reference
            </span>
            <span className="kbd ml-auto hidden sm:inline-flex">⌘K</span>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href="/documents/Hamza_Khan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            CV
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Masthead;
