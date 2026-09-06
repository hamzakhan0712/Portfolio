import { Link } from "react-router-dom";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import { Figure, H2, P, PageHeader, Prop, PropList } from "@/components/docs/prose";
import { profilePayload } from "@/data/payloads";

export default function Profile() {
  return (
    <DocsPage
      title="Profile"
      aside={
        <>
          <CodePanel method="GET" path="/profile" response={profilePayload} />
          {/* Capped: below 1536px this rail reflows into the prose column,
              where an uncapped figure would render at full measure. */}
          <Figure
            className="mt-4 max-w-[17rem] 2xl:max-w-none"
            src="/photos/full-length.webp"
            alt="Hamza Khan"
            caption="Mumbai, 2026 · available remote, or on-site across Mumbai, Navi Mumbai and Thane"
          />
        </>
      }
    >
      <PageHeader
        method="GET"
        path="/profile"
        title="Profile"
        lead="Who I am, what I have been doing for four years, and where I am pointed next."
      />

      <H2>The short version</H2>
      <P>
        <strong>Backend developer</strong> with four years of freelance project
        experience building Django web applications, REST APIs and real-time
        WebSocket services backed by PostgreSQL.
      </P>
      <P>
        I started freelancing in 2021 while studying. Most projects were for
        clients who needed working systems they could actually use — which meant
        dealing with real constraints: deployment on shared servers, handling
        user traffic, debugging in production, and maintaining code other people
        depend on.
      </P>
      <P>
        That experience shaped how I approach backend work — pragmatic,
        deployment-aware, and focused on what actually ships. Graduated with a
        B.E. in Computer Science and Engineering (Data Science) from the
        University of Mumbai in Summer 2026 with a CGPI of 8.19 / 10, and
        building toward a career in <strong>data engineering</strong>.
      </P>

      <H2>Response fields</H2>
      <P>
        The payload beside this text is the whole of it — every field below is
        asserted somewhere else on the site as well, and derived from the same
        source so the two cannot drift apart.
      </P>

      <PropList>
        <Prop name="role" type="string">
          Backend Developer. Python and Django are the centre of it; see{" "}
          <Link to="/skills">Skills</Link> for the layer-by-layer breakdown.
        </Prop>
        <Prop name="experience_years" type="integer">
          Four, counted from January 2021. The engagements are listed
          individually under <Link to="/experience">Experience</Link>.
        </Prop>
        <Prop name="focus" type="string[]">
          Django, REST APIs, PostgreSQL, WebSockets — the four things that
          appear in nearly every project on this site.
        </Prop>
        <Prop name="moving_toward" type="string">
          Data engineering. The degree specialised in data science, and Novem's
          analytical layer is where most of my recent work has gone.
        </Prop>
        <Prop name="education.cgpi" type="number">
          8.19 out of 10 — 3318 / 4500 aggregate. Semester detail is on the{" "}
          <Link to="/experience">Experience</Link> page.
        </Prop>
        <Prop name="languages" type="object[]">
          English at IELTS Academic 6.5 (CEFR B2), strongest in speaking at 7.0.
          Hindi native.
        </Prop>
        <Prop name="status" type="enum">
          <code>open_to_roles</code>. Remote, Mumbai, Navi Mumbai and Thane.
        </Prop>
      </PropList>

      <H2>How I work</H2>
      <P>
        Solo, so far — every system in <Link to="/projects">Projects</Link> was
        specified, built, deployed and maintained by one person. That means I
        have carried features from a client conversation through to a production
        incident, which is the part of the job that teaches you what to build
        differently next time.
      </P>
      <P>
        It also means the gap is team scale. I have not worked inside a large
        existing codebase with review cycles and other people's constraints, and
        I would rather say so here than have it come up later —{" "}
        <Link to="/errors">Errors</Link> lists the rest of what is missing.
      </P>
    </DocsPage>
  );
}
