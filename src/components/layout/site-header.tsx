import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Mail,
  Menu,
  User,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { navigation, profile } from "@/data/site";
import { ThemeMenu } from "@/components/theme";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/projects": FolderKanban,
  "/about": User,
  "/education": GraduationCap,
  "/skills": Wrench,
  "/recognition": Award,
  "/contact": Mail,
};

/** Which navigation item a path belongs to — /projects/novem lights up Projects. */
function activeHref(pathname: string) {
  if (pathname === "/") return "/";
  return navigation.find((item) => item.href !== "/" && pathname.startsWith(item.href))?.href;
}

/**
 * The top bar: a Windows NavigationView in top mode. Acrylic over the page,
 * the persona on the left, pages across the middle with the accent pill under
 * the current one, and the theme and CV on the right.
 *
 * Below the large breakpoint the pages move into a left pane, the way
 * NavigationView collapses on a narrow window.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const current = activeHref(pathname);

  // A navigation closes the pane; the page behind it must not scroll while it
  // is open, and Escape closes it.
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

  // The pane is a sibling of the header, not a child: the header's backdrop
  // filter would otherwise become the containing block for its fixed position.
  return (
    <>
      <header className="acrylic sticky top-0 z-50 border-b">
        <div className="container-site flex h-14 items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="nav-pane"
            className="btn-icon -ml-2 lg:hidden"
          >
            {open ? (
              <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded px-1 py-1 no-underline">
            <img
              src="/photos/avatar.webp"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[14px] font-semibold text-foreground">
                {profile.name}
              </span>
              <span className="block truncate text-[12px] text-muted-foreground">
                {profile.role}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center lg:flex">
            {navigation.map((item) => {
              const selected = item.href === current;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  aria-current={selected ? "page" : undefined}
                  className={cn(
                    "relative flex h-9 items-center rounded px-3 text-[14px] no-underline transition-colors hover:bg-secondary",
                    selected
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {selected && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className="absolute bottom-0.5 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-primary"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <ThemeMenu />
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="btn-accent btn-sm ml-1 hidden sm:inline-flex"
            >
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              CV
            </a>
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
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-14 z-40 bg-black/30 lg:hidden"
            />
            <motion.nav
              id="nav-pane"
              aria-label="Main"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.15, ease: [1, 0, 1, 1] } }}
              transition={{ duration: 0.3, ease: [0, 0, 0, 1] }}
              className="acrylic fixed bottom-0 left-0 top-14 z-50 flex w-[min(20rem,85vw)] flex-col border-r p-2 shadow-flyout lg:hidden"
            >
              <ul className="grid gap-0.5">
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
                          "relative flex h-10 items-center gap-4 rounded px-3 text-[14px] text-foreground no-underline transition-colors hover:bg-secondary",
                          selected && "bg-secondary font-semibold",
                        )}
                      >
                        {selected && (
                          <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                        )}
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto border-t border-divider p-2 pt-3">
                <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-accent w-full">
                  <FileText className="h-4 w-4" strokeWidth={1.75} />
                  Download CV
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default SiteHeader;
