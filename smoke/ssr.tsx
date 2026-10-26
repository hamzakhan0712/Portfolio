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
import Projects from "@/pages/Projects";
import ProjectPage from "@/pages/ProjectPage";
import About from "@/pages/About";
import Education from "@/pages/Education";
import Skills from "@/pages/Skills";
import Recognition from "@/pages/Recognition";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { projects } from "@/data/projects";
import { allRoutes } from "@/data/site";
import { projectsUsing, skillGroups } from "@/data/skills";

function Tree({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <StaticRouter location={url}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectPage />} />
            <Route path="about" element={<About />} />
            <Route path="education" element={<Education />} />
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

// Skills are claims about the work, so check them against it: every listed
// tool must be used by at least one project. Project tags no tool covers are
// reported (not failed) — they are candidates for the Skills page.
const tools = skillGroups.flatMap((group) => group.tools);
for (const tool of tools) {
  if (projectsUsing(tool).length === 0) {
    failures += 1;
    console.log(
      `  FAIL  skill "${tool.name}" is used by no project (uses: ${tool.uses.join(", ")})`,
    );
  }
  if (!tool.icon && !tool.glyph) {
    failures += 1;
    console.log(`  FAIL  skill "${tool.name}" has no logo or glyph`);
  }
}
const covered = new Set(tools.flatMap((tool) => tool.uses));
const uncovered = [...new Set(projects.flatMap((project) => project.tags))].filter(
  (tag) => !covered.has(tag),
);
console.log(
  `${tools.length} skills checked against the projects` +
    (uncovered.length ? ` · not on the Skills page: ${uncovered.join(", ")}` : ""),
);

if (failures > 0) process.exit(1);
