/* eslint-disable react-refresh/only-export-components -- a script, not a module of components */
/**
 * Render-time smoke test.
 *
 * Type-checking proves the props line up; it does not prove a page renders.
 * This walks every route through renderToStaticMarkup so a bad array access or
 * a missing lookup fails here instead of in front of a visitor.
 *
 * Run with `npm run smoke`.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/layout/site-layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectPage from "@/pages/ProjectPage";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Skills from "@/pages/Skills";
import Recognition from "@/pages/Recognition";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { projects } from "@/data/projects";
import { allRoutes } from "@/data/site";

function Tree({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <StaticRouter location={url}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectPage />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="recognition" element={<Recognition />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </StaticRouter>
    </TooltipProvider>
  );
}

const routes = [...allRoutes, "/projects/does-not-exist", "/nonsense"];

let failures = 0;

for (const url of routes) {
  try {
    const html = renderToStaticMarkup(<Tree url={url} />);
    if (html.length < 800) {
      throw new Error(`suspiciously short output (${html.length} chars)`);
    }
    console.log(`  ok    ${url.padEnd(34)} ${html.length} chars`);
  } catch (error) {
    failures += 1;
    console.log(`  FAIL  ${url}`);
    console.log(`        ${(error as Error).message}`);
  }
}

console.log(
  `\n${routes.length - failures}/${routes.length} routes rendered · ${projects.length} projects in the index`,
);

if (failures > 0) process.exit(1);
