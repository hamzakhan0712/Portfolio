import { Link } from "react-router-dom";
import {
  ChipList,
  ContactBand,
  Fact,
  PageHeader,
  Section,
} from "@/components/primitives";
import { gaps, profile } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

export default function About() {
  usePageTitle("About");

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`${profile.role}, based in ${profile.location}`}
        lead="Who I am, what I have been doing for four years, and where I am headed next — in plain words."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="prose-plain min-w-0">
            <h2 className="heading-section mb-6 text-foreground">The short version</h2>
            <p>
              <strong>{profile.role}</strong> with four years of freelance
              project experience building web applications, the services behind
              them, and real-time features, all backed by properly designed
              databases.
            </p>
            <p>
              I started freelancing in 2021 while studying. Most projects were
              for clients who needed working systems they could actually use —
              which meant dealing with real constraints: deployment on shared
              servers, handling user traffic, debugging in production, and
              maintaining code other people depend on.
            </p>
            <p>
              That experience shaped how I work — pragmatic, deployment-aware,
              and focused on what actually ships. I graduated with a B.E. in
              Computer Science and Engineering (Data Science) from the
              University of Mumbai in Summer 2026 with a CGPI of 8.19 / 10, and
              I am building toward a career in{" "}
              <strong>{profile.movingToward.toLowerCase()}</strong>.
            </p>

            <h2 className="heading-section mb-6 mt-16 text-foreground">How I work</h2>
            <p>
              Solo, so far — every system under <Link to="/projects">Work</Link>{" "}
              was specified, built, deployed and maintained by one person. That
              means I have carried features from a client conversation through
              to a production incident, which is the part of the job that
              teaches you what to build differently next time.
            </p>
            <p>
              It also means I know where my experience stops, and I would
              rather say so here than have it come up later — see the gaps
              below.
            </p>

            <h2 id="gaps" className="heading-section mb-3 mt-16 scroll-mt-24 text-foreground">
              Where I am honest about the gaps
            </h2>
            <p className="mb-8">
              Anyone can list what they are good at. What is actually worth
              knowing is whether they can tell you where that list stops.
            </p>
            <ul className="not-prose grid gap-4">
              {gaps.map((gap) => (
                <li key={gap.title} className="card p-6">
                  <h3 className="text-[17px] font-semibold text-foreground">
                    {gap.title}
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted-foreground">
                    {gap.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <img
              src="/photos/full-length.webp"
              alt={profile.name}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top"
            />
            <div className="card p-6">
              <dl className="divide-y divide-border">
                <Fact label="Role">{profile.role}</Fact>
                <Fact label="Based in">{profile.location}</Fact>
                <Fact label="Experience">
                  {profile.experienceYears} years, freelancing since{" "}
                  {profile.freelancingSince}
                </Fact>
                <Fact label="Education">{profile.education}</Fact>
                <Fact label="Languages">
                  {profile.languages.map((l) => `${l.name} — ${l.level}`).join(" · ")}
                </Fact>
                <Fact label="Works mostly with">
                  <ChipList items={profile.focus} className="mt-1" />
                </Fact>
                <Fact label="Availability">
                  {profile.status} · {profile.openTo.join(", ")}
                </Fact>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
