import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/** Header height plus a little air, so an anchored section clears it. */
const ANCHOR_OFFSET = 84;

/**
 * The chrome every page sits inside.
 *
 * Also owns scroll position on navigation: a new page starts at its top,
 * unless the link asked for a section, in which case the section is the top.
 * Landing on an anchor is not one scroll but several — the page chunk loads
 * lazily, fonts swap, images decode — so this keeps re-aligning frame by frame
 * until the layout stops moving, and stops the moment the visitor scrolls.
 */
export function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    let placedAt = Math.round(window.scrollY);
    let settled = 0;
    let found = false;
    let frame = 0;
    const deadline = performance.now() + 3000;

    const tick = () => {
      if (Math.round(window.scrollY) !== placedAt) return;

      const target = document.getElementById(hash.slice(1));
      if (target) {
        if (!found) {
          found = true;
          settled = 0;
        }
        const before = Math.round(window.scrollY);
        window.scrollTo({
          top: Math.max(
            0,
            before + target.getBoundingClientRect().top - ANCHOR_OFFSET,
          ),
          behavior: "auto",
        });
        placedAt = Math.round(window.scrollY);
        settled = placedAt === before ? settled + 1 : 0;
      } else if (!found) {
        window.scrollTo({ top: 0, behavior: "auto" });
        placedAt = Math.round(window.scrollY);
      }

      if (settled > 30 || performance.now() > deadline) return;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
