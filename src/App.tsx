import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/layout/site-layout";
import Home from "@/pages/Home";

/* The home page ships in the first chunk. Every other page is split — a
   visitor who reads two pages should not pay for ten. */
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));
const About = lazy(() => import("@/pages/About"));
const Education = lazy(() => import("@/pages/Education"));
const Skills = lazy(() => import("@/pages/Skills"));
const Recognition = lazy(() => import("@/pages/Recognition"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Occupies the page while a chunk loads. A skeleton the shape of a page
 * header keeps the layout from collapsing and reflowing when the real content
 * lands.
 */
function PageSkeleton() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-site animate-pulse py-14 sm:py-20" aria-hidden>
        <div className="h-4 w-24 rounded bg-secondary" />
        <div className="mt-4 h-12 w-2/3 rounded bg-secondary" />
        <div className="mt-5 h-5 w-full max-w-2xl rounded bg-secondary/70" />
        <div className="mt-2 h-5 w-5/6 max-w-xl rounded bg-secondary/70" />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

/** Redirects an old address to its new one, keeping any #section. */
function Moved({ to }: { to: string }) {
  const { hash } = useLocation();
  return <Navigate to={`${to}${hash}`} replace />;
}

const lazyPage = (element: JSX.Element) => (
  <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
);

const App = () => (
  // reducedMotion="user" makes every framer-motion animation honour the OS
  // setting — the media query in index.css cannot reach JS-driven motion.
  <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={lazyPage(<Projects />)} />
            <Route path="projects/:slug" element={lazyPage(<ProjectPage />)} />
            <Route path="about" element={lazyPage(<About />)} />
            <Route path="education" element={lazyPage(<Education />)} />
            <Route path="skills" element={lazyPage(<Skills />)} />
            <Route path="recognition" element={lazyPage(<Recognition />)} />
            <Route path="contact" element={lazyPage(<Contact />)} />

            {/* Addresses from the previous version of the site, so links that
                were shared keep working. */}
            <Route path="experience" element={<Moved to="/education" />} />
            <Route path="services" element={<Moved to="/projects" />} />
            <Route path="solutions" element={<Moved to="/projects" />} />
            <Route path="profile" element={<Moved to="/about" />} />
            <Route path="authentication" element={<Moved to="/about" />} />
            <Route path="errors" element={<Moved to="/about" />} />

            <Route path="*" element={lazyPage(<NotFound />)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </MotionConfig>
);

export default App;
