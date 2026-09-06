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
/* Minimal browser globals. The theme provider reads localStorage during
   render; everything else the pages touch lives in effects, which never run
   under renderToStaticMarkup. */
const store = new Map<string, string>();
(globalThis as Record<string, unknown>).localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => void store.set(key, value),
  removeItem: (key: string) => void store.delete(key),
  clear: () => store.clear(),
  key: () => null,
  length: 0,
};
(globalThis as Record<string, unknown>).matchMedia = () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
});

import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocsLayout } from "@/components/docs/docs-layout";
import Overview from "@/pages/docs/Overview";
import Authentication from "@/pages/docs/Authentication";
import Errors from "@/pages/docs/Errors";
import Profile from "@/pages/docs/Profile";
import Experience from "@/pages/docs/Experience";
import Skills from "@/pages/docs/Skills";
import Solutions from "@/pages/docs/Solutions";
import Projects from "@/pages/docs/Projects";
import ProjectPage from "@/pages/docs/ProjectPage";
import Recognition from "@/pages/docs/Recognition";
import Contact from "@/pages/docs/Contact";
import NotFound from "@/pages/NotFound";
import { projects } from "@/data/projects";
import { flatNavigation } from "@/data/docs-nav";

function Tree({ url }: { url: string }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route element={<DocsLayout />}>
              <Route index element={<Overview />} />
              <Route path="authentication" element={<Authentication />} />
              <Route path="errors" element={<Errors />} />
              <Route path="profile" element={<Profile />} />
              <Route path="experience" element={<Experience />} />
              <Route path="skills" element={<Skills />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectPage />} />
              <Route path="recognition" element={<Recognition />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

const routes = [
  ...flatNavigation.map((item) => item.href),
  "/projects/does-not-exist",
  "/nonsense",
];

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
