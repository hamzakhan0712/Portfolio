import { Link } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout, H2, P, PageHeader } from "@/components/docs/prose";
import { notInTheStack } from "@/data/skills";

/**
 * The complement of every other page.
 *
 * A reference that only documents its happy path is marketing. This one names
 * what is absent — and is careful about the difference between "not shipped to
 * production" and "cannot do", because only the first is a fact.
 */

type ErrorRow = {
  status: number;
  code: string;
  meaning: string;
  detail: React.ReactNode;
};

const errors: ErrorRow[] = [
  {
    status: 403,
    code: "source_private",
    meaning: "The code exists, and you cannot see it",
    detail: (
      <>
        Client systems were built under commercial terms, and my own products
        are unreleased. Every project page carries screenshots, the stack and
        the runtime shape instead of a repository link. Ask and I will walk you
        through any of it on a call.
      </>
    ),
  },
  {
    status: 404,
    code: "not_documented",
    meaning: "It is not on this site",
    detail: (
      <>
        Six of the ten projects are front-end builds whose write-ups do not
        establish a backend shape, so they carry no architecture diagram. An
        absent diagram means absent evidence, not a hidden one.
      </>
    ),
  },
  {
    status: 501,
    code: "not_implemented",
    meaning: "Not shipped to production by me",
    detail: (
      <>
        The technologies below do not appear anywhere in{" "}
        <Link to="/skills">Skills &amp; tools</Link> because I have not run them in
        production. That is a statement about my track record, not about what I
        can learn — but it is the track record you are hiring.
      </>
    ),
  },
  {
    status: 429,
    code: "one_person",
    meaning: "There is a single maintainer",
    detail: (
      <>
        Everything in <Link to="/projects">My work</Link> was built solo, which
        is the strength and the ceiling of the list. Nothing here demonstrates
        working inside a large existing codebase with a team — that is the gap I
        am looking to close.
      </>
    ),
  },
];

const errorShape = `{
  "error": {
    "status": 501,
    "code": "not_implemented",
    "message": "Kubernetes does not appear in this stack.",
    "hint": "Not run in production — see /skills"
  }
}`;

export default function Errors() {
  return (
    <DocsPage
      title="What I don't do"
      aside={
        <div className="space-y-4">
          <div>
            <p className="mono-label mb-2">Error shape</p>
            <CodeBlock
              samples={[{ label: "JSON", language: "json", code: errorShape }]}
              title={<span className="status status-err">501</span>}
            />
          </div>

          <div>
            <p className="mono-label mb-2">Not in this stack</p>
            <div className="rounded-xl border border-border p-3">
              <ul className="flex flex-wrap gap-1.5">
                {notInTheStack.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border bg-secondary/50 px-2 py-1 font-mono text-[11.5px] text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-muted-foreground/80">
                Absent from every project write-up on this site. Listed so the
                reference cannot imply them by omission.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <PageHeader
        method="GET"
        path="/errors"
        title="What I don't do"
        lead="The honest other half of this site: the gaps in my experience, written down rather than left for you to discover in an interview."
      />

      <Callout title="Why this page exists">
        Anyone can list what they are good at. What is actually worth knowing is
        whether they can tell you where that list stops. So this page is as
        specific as the rest of the site, and it is meant to be read before you
        spend an hour on a call with me.
      </Callout>

      <H2>The gaps</H2>

      <div className="mt-6 space-y-px overflow-hidden rounded-xl border border-border bg-border">
        {errors.map((row) => (
          <section key={row.code} className="bg-background p-4 md:p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[15px] font-semibold text-err tabular">
                {row.status}
              </span>
              <code className="font-mono text-[13px] text-foreground">
                {row.code}
              </code>
              <span className="text-[13px] text-muted-foreground">
                {row.meaning}
              </span>
            </div>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
              {row.detail}
            </p>
          </section>
        ))}
      </div>

      <H2>And what I am solid on</H2>
      <P>
        Python and Django to production, on real deployments with real users, for
        four years and across two countries. PostgreSQL schema design, DRF APIs,
        WebSockets with Channels, Docker on Azure and DigitalOcean, and — in
        Novem — a FastAPI service with roughly 170 endpoints and an analytical
        store underneath it.
      </P>
      <P>
        If a role is built on that, <Link to="/contact">get in touch</Link>. If
        it is built on the list above that I have not touched, I would rather you
        knew now than after both of us spent a week on it.
      </P>
    </DocsPage>
  );
}
