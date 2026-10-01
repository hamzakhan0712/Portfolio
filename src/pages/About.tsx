import { Link } from "react-router-dom";
import {
  ChipList,
  ContactBand,
  Fact,
  PageHeader,
  Section,
} from "@/components/primitives";
import { profile } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

export default function About() {
  usePageTitle("About");

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`Fresh graduate and aspiring ${profile.role.toLowerCase()}`}
        lead="A little about who I am, what I have built and what I'm looking for."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="prose-plain min-w-0">
            <h2 className="heading-section mb-6 text-foreground">Hi, I&apos;m Hamza</h2>
            <p>
              I&apos;m a <strong>2026 Computer Science &amp; Engineering
              graduate</strong> from the University of Mumbai and a fresher
              looking for my first full-time role as a software engineer.
            </p>
            <p>
              I came to the degree through a Diploma in Computer Engineering,
              and graduated with a CGPI of 8.19 / 10. Alongside my studies I
              have built web applications, REST APIs, real-time features,
              websites and desktop apps — you can see them under{" "}
              <Link to="/projects">Projects</Link>, each with screenshots and a
              video walkthrough.
            </p>
            <p>
              My team reached the Grand Finale of Smart India Hackathon 2025,
              and we won 2nd place at SCOE Avishkar 2025.
            </p>

            <h2 className="heading-section mb-6 mt-16 text-foreground">How I work</h2>
            <p>
              I care about software that is simple to use and easy to maintain:
              clear data models, predictable APIs, role-based access done
              properly, and tests and CI that catch problems early.
            </p>
            <p>
              Most of what I build uses Python and Django on the backend and
              React with TypeScript on the frontend, and I enjoy picking up
              new tools when a project needs them — FastAPI, Tauri, Electron
              and Next.js have all been part of my recent projects.
            </p>

            <h2 className="heading-section mb-6 mt-16 text-foreground">
              What I&apos;m looking for
            </h2>
            <p>
              An entry-level, full-time software engineering role on a team
              where I can learn from experienced engineers and grow — remote,
              or on-site in Mumbai, Navi Mumbai or Thane.
            </p>
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
                <Fact label="Stage">Fresher · graduated {profile.graduated}</Fact>
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
