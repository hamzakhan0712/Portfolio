import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { DocsLayout } from "@/components/docs/docs-layout";
import CommandPalette from "@/components/command-palette";
import Overview from "@/pages/docs/Overview";

/* The overview is the entry point and ships in the first chunk. Every other
   page is split — a visitor who reads two pages should not pay for ten. */
const Authentication = lazy(() => import("@/pages/docs/Authentication"));
const Errors = lazy(() => import("@/pages/docs/Errors"));
const Profile = lazy(() => import("@/pages/docs/Profile"));
const Experience = lazy(() => import("@/pages/docs/Experience"));
const Skills = lazy(() => import("@/pages/docs/Skills"));
const Solutions = lazy(() => import("@/pages/docs/Solutions"));
const Projects = lazy(() => import("@/pages/docs/Projects"));
const ProjectPage = lazy(() => import("@/pages/docs/ProjectPage"));
const Recognition = lazy(() => import("@/pages/docs/Recognition"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Contact = lazy(() => import("@/pages/docs/Contact"));

/**
 * Occupies the prose column while a page chunk loads.
 *
 * Deliberately not a spinner: a skeleton the shape of a heading and two
 * paragraphs keeps the column from collapsing and reflowing when the real
 * content lands.
 */
function PageSkeleton() {
  return (
    <div className="docs-area-main px-5 pt-10 md:px-9 2xl:px-12">
      <div
        className="mx-auto max-w-[44rem] animate-pulse space-y-4 2xl:mx-0"
        aria-hidden
      >
        <div className="h-8 w-2/3 rounded bg-secondary" />
        <div className="h-4 w-full rounded bg-secondary/70" />
        <div className="h-4 w-5/6 rounded bg-secondary/70" />
        <div className="h-40 w-full rounded-xl bg-secondary/40" />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

const App = () => (
  // reducedMotion="user" makes every framer-motion animation honour the OS
  // setting — the media query in index.css cannot reach JS-driven motion.
  <MotionConfig reducedMotion="user">
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<DocsLayout />}>
              <Route
                index
                element={<Overview />}
              />
              <Route
                path="authentication"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Authentication />
                  </Suspense>
                }
              />
              <Route
                path="errors"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Errors />
                  </Suspense>
                }
              />
              <Route
                path="profile"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="experience"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Experience />
                  </Suspense>
                }
              />
              <Route
                path="skills"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Skills />
                  </Suspense>
                }
              />
              <Route
                path="solutions"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Solutions />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="projects/:slug"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <ProjectPage />
                  </Suspense>
                }
              />
              <Route
                path="recognition"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Recognition />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>

          {/* Inside the router: the palette navigates as well as searching. */}
          <CommandPalette />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </MotionConfig>
);

export default App;
