import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The top bar. Name on the left, the pages across the middle, a CV button on
 * the right. Below the large breakpoint the pages fold into a drawer.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // A navigation closes the drawer; the page behind it must not scroll while
  // it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 no-underline">
          <img
            src="/photos/avatar.webp"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-tight text-foreground">
              {profile.name}
            </span>
            <span className="block truncate text-[12.5px] leading-tight text-muted-foreground">
              {profile.role}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className="nav-link no-underline"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary btn-sm hidden sm:inline-flex"
          >
            <FileText className="h-4 w-4" />
            CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full p-2.5 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[4.25rem] z-40 bg-black/60 lg:hidden"
            />
            <motion.nav
              aria-label="Main"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-50 border-b border-border bg-background p-4 shadow-lg lg:hidden"
            >
              <ul className="grid gap-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-4 py-3 text-[16px] font-medium no-underline transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-secondary",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-2 sm:hidden">
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary w-full"
                  >
                    <FileText className="h-4 w-4" />
                    Download CV
                  </a>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default SiteHeader;
