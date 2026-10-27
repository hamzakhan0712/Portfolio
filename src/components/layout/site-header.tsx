import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  FolderKanban,
  Home,
  Mail,
  Menu,
  Search,
  User,
  Wrench,
  X,
  type Icon,
} from "@/components/icons";
import { navigation, profile } from "@/data/site";
import { QuickSettings } from "@/components/theme";
import { openSearch } from "@/components/command-search";
import { PresenceAvatar } from "@/components/presence";
import { cn } from "@/lib/utils";

const ICONS: Record<string, Icon> = {
  "/": Home,
  "/projects": FolderKanban,
  "/about": User,
  "/skills": Wrench,
  "/contact": Mail,
};

/** Which navigation item a path belongs to — /projects/novem lights up
 *  Projects, /education lights up About. */
function activeHref(pathname: string) {
  if (pathname === "/") return "/";
  const within = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return navigation.find(
    (item) => item.href !== "/" && (within(item.href) || item.also?.some(within)),
  )?.href;
}

/**
 * The header: a glass pill floating a little below the top of the window.
 * The current page sits on a raised pill that glides from item to item. On
 * narrow screens the pages open in a rounded glass sheet under the bar.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const current = activeHref(pathname);

  // A navigation closes the sheet; the page behind it must not scroll while
  // it is open, and Escape closes it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // At the very top the bar is lighter; once content passes under it, the
  // glass gets its full shadow so the two read as separate layers.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The sheet is a sibling of the header, not a child: the bar's backdrop
  // filter would otherwise become the containing block for its fixed position.
  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
        <div
          className="glass mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-3xl px-2 transition-shadow duration-300"
          style={
            scrolled
              ? undefined
              : { boxShadow: "inset 0 0 0 1px hsl(var(--glass-border)), var(--shadow-rest)" }
          }
        >
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 rounded py-1 pl-1 pr-3 no-underline transition-colors hover:bg-secondary"
          >
            <PresenceAvatar size={36} />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[14px] font-semibold text-foreground">
                {profile.name}
              </span>
              <span className="block truncate text-[12px] text-muted-foreground">
                {profile.role}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              const selected = item.href === current;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  aria-current={selected ? "page" : undefined}
                  className={cn(
                    "relative isolate flex h-9 items-center rounded px-3.5 text-[14px] font-medium no-underline transition-colors",
                    selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute inset-0 -z-10 rounded bg-card shadow-rest"
                    />
                  )}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            {/* The Windows search box: a field-shaped button that opens search. */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl+K)"
              className="hidden h-9 items-center gap-2 rounded bg-control px-3 text-[13px] text-muted-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))] transition-colors hover:bg-control-hover xl:inline-flex"
            >
              <Search className="h-4 w-4" />
              Search
              <kbd className="ml-3 rounded bg-secondary px-1.5 text-[11px]">Ctrl K</kbd>
            </button>
            <button type="button" onClick={openSearch} aria-label="Search" className="btn-icon xl:hidden">
              <Search className="h-5 w-5" />
            </button>
            <QuickSettings />
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="btn-accent btn-sm hidden h-9 px-4 sm:inline-flex"
            >
              <FileText className="h-4 w-4" strokeWidth={2} />
              CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="nav-sheet"
              className="btn-icon lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] lg:hidden"
            />
            <motion.nav
              id="nav-sheet"
              aria-label="Main"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: [0.1, 0.9, 0.2, 1] }}
              className="glass fixed inset-x-3 top-[4.75rem] z-50 origin-top rounded-4xl p-2 sm:inset-x-4 lg:hidden"
            >
              <ul className="grid gap-1">
                {navigation.map((item) => {
                  const Icon = ICONS[item.href] ?? Home;
                  const selected = item.href === current;
                  return (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        aria-current={selected ? "page" : undefined}
                        className={cn(
                          "flex h-12 items-center gap-3 rounded px-3 text-[15px] font-medium text-foreground no-underline transition-colors hover:bg-secondary",
                          selected && "bg-card shadow-rest",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-2xl",
                            selected ? "bg-primary text-primary-foreground" : "bg-secondary",
                          )}
                        >
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                        </span>
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="btn-accent btn-lg mt-2 w-full"
              >
                <FileText className="h-4 w-4" strokeWidth={2} />
                Download CV
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteHeader;
