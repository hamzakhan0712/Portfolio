import { Link, useLocation } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { H2, P, PageHeader } from "@/components/docs/prose";
import { routeIndex } from "@/data/payloads";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <DocsPage
      title="Not found"
      aside={
        <CodePanel
          method="GET"
          path={pathname}
          status="404 Not Found"
          response={{
            error: {
              status: 404,
              code: "not_found",
              message: `No resource at ${pathname}`,
            },
          }}
        />
      }
    >
      <PageHeader
        method="GET"
        path={pathname}
        title="404 — no such resource"
        lead="The link may be out of date, or the path may never have existed."
      />

      <H2>Available resources</H2>
      <P>The full index is in the sidebar; these are the routes.</P>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {routeIndex.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="flex items-center gap-3 px-4 py-3 no-underline transition-colors hover:bg-secondary/50"
            >
              <span className="font-mono text-[13px] font-medium text-foreground">
                {route.path}
              </span>
              <span className="hidden truncate text-[13px] text-muted-foreground sm:block">
                {route.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <P>
        Or go back to the <Link to="/">overview</Link>.
      </P>
    </DocsPage>
  );
}
