import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Masthead } from "@/components/docs/masthead";
import { Sidebar } from "@/components/docs/sidebar";
import { Pager } from "@/components/docs/pager";
import { DocsFooter } from "@/components/docs/docs-footer";

/**
 * The chrome every reference page sits inside.
 *
 * `Outlet` renders straight into the grid container so a page can place
 * content into the `main`, `aside` and `pager` areas as siblings — that is
 * what lets the code rail sit beside the prose on a wide screen and fold
 * beneath it on a narrow one without being rendered twice.
 */
/** Masthead height plus a little air, so an anchored section clears it. */
const ANCHOR_OFFSET = 72;

export function DocsLayout() {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // A new page starts at its top, not wherever the last one was scrolled to —
  // unless the link asked for a section, in which case the section is the top.
  //
  // Landing on an anchor is not one scroll but several. The page chunk is
  // fetched lazily, so on the first frame the section does not exist yet; then
  // the webfonts swap in and re-measure every line above it; then the
  // screenshots decode. Each of those moves the anchor, so this keeps
  // re-aligning frame by frame until the layout stops moving under it.
  //
  // Two things keep that from being a trap. It gives up on a deadline, and it
  // stops the instant the viewport is somewhere it did not put it — which is
  // to say, the moment the visitor scrolls, they own the page.
  useEffect(() => {
    setMenuOpen(false);

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    /** Where this effect last put the viewport. */
    let placedAt = Math.round(window.scrollY);
    /** Frames of stillness seen since the target was last found. */
    let settled = 0;
    let found = false;
    let frame = 0;

    const deadline = performance.now() + 3000;

    const tick = () => {
      // A scroll position we did not set is the visitor's; hands off.
      if (Math.round(window.scrollY) !== placedAt) return;

      const target = document.getElementById(hash.slice(1));
      if (target) {
        if (!found) {
          found = true;
          settled = 0;
        }
        const before = Math.round(window.scrollY);
        // Positioned rather than scrollIntoView'd: the sticky masthead
        // overlaps the scrollport, so the section has to clear it by hand.
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
        // Nothing to align to yet — sit at the top rather than mid-document.
        window.scrollTo({ top: 0, behavior: "auto" });
        placedAt = Math.round(window.scrollY);
      }

      // Half a second of not moving means the layout has finished settling.
      if (settled > 30 || performance.now() > deadline) return;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  // The drawer is modal; the page behind it must not scroll.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="docs-shell min-h-screen">
      {/* Keyboard users should not have to tab through 19 nav links to reach
          the page they asked for. */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-[13px] focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Masthead menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />

      <div className="docs-columns mx-auto max-w-[1720px]">
        <aside className="docs-area-nav docs-sticky hidden border-r border-border lg:block">
          <Sidebar />
        </aside>

        <Outlet />
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-14 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed bottom-0 left-0 top-14 z-40 w-[min(19rem,85vw)] overflow-y-auto border-r border-border bg-background lg:hidden"
            >
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * One reference page: prose in the centre, request/response in the rail.
 *
 * `wide` drops the aside entirely and lets the prose use the full measure —
 * for the index pages, where a single code sample would be arbitrary.
 */
export function DocsPage({
  children,
  aside,
  wide = false,
  title,
}: {
  children: ReactNode;
  aside?: ReactNode;
  wide?: boolean;
  /** Page name for the browser tab. Omitted on the overview, which keeps the
      full title from index.html. */
  title?: string;
}) {
  const { pathname } = useLocation();

  // Set here rather than in the layout: child effects run before parent ones,
  // so a title set by the layout would overwrite the page's own.
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = `${title} · Hamza Khan`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <>
      <main id="content" className="docs-area-main px-5 pb-4 pt-10 md:px-9 2xl:px-12">
        <article
          className={
            wide
              ? "doc-prose mx-auto max-w-[64rem]"
              : "doc-prose mx-auto max-w-[44rem] 2xl:mx-0"
          }
        >
          {children}
        </article>
      </main>

      {aside && (
        <aside className="docs-area-aside px-5 pb-6 pt-8 md:px-9 2xl:sticky 2xl:top-14 2xl:max-h-[calc(100vh-3.5rem)] 2xl:overflow-y-auto 2xl:overscroll-contain 2xl:border-l 2xl:border-border 2xl:px-6 2xl:pb-16 2xl:pt-10">
          <div className="mx-auto max-w-[44rem] 2xl:max-w-none">{aside}</div>
        </aside>
      )}

      <div className="docs-area-pager px-5 pb-16 md:px-9 2xl:px-12">
        <div
          className={
            wide ? "mx-auto max-w-[64rem]" : "mx-auto max-w-[44rem] 2xl:mx-0"
          }
        >
          <Pager pathname={pathname} />
          <DocsFooter />
        </div>
      </div>
    </>
  );
}

export default DocsLayout;
