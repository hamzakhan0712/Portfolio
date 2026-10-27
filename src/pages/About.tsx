import { Link } from "react-router-dom";
import {
  ChipList,
  ContactBand,
  Fact,
  PageHeader,
  PageTabs,
  Section,
} from "@/components/primitives";
import { aboutTabs, profile } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

export default function About() {
  usePageTitle("About");

  return (
    <>
      <PageHeader
        title="About me"
        lead="Who I am, how I work across the stack, and the role I'm looking for."
      >
        <PageTabs label="About" items={aboutTabs} className="mt-6" />
      </PageHeader>

      <Section className="pt-8 sm:pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
          <div className="min-w-0 space-y-12">
            <section className="prose-plain">
              <p>
                I&apos;m a <strong>full-stack software engineer</strong> based in Mumbai. I build
                complete products: the data model and the API behind them, the interface people
                actually use, and the pipeline that ships them.
              </p>
              <p>
                I graduated in 2026 with a B.E. in Computer Science &amp; Engineering from the
                University of Mumbai (CGPI 8.19 / 10), after a Diploma in Computer Engineering.
                Alongside my studies I built the web applications, websites and desktop apps under{" "}
                <Link to="/projects">Projects</Link>, each with screenshots and a video walkthrough.
                Five of them are live on the web, including the{" "}
                <Link to="/projects/sk-trading-web">S.K Trading &amp; Co.</Link> catalogue and the
                admin behind it.
              </p>
              <p>
                My team reached the Grand Finale of Smart India Hackathon 2025, and we won 2nd place
                at SCOE Avishkar 2025.
              </p>
            </section>

            <section className="prose-plain">
              <h2 className="t-title mb-4 text-foreground">How I work</h2>
              <p>
                I care about software that is simple to use and easy to maintain: clear data models,
                predictable APIs, role-based access done properly, and tests and CI that catch
                problems before users do.
              </p>
              <p>
                On the backend I mostly reach for Python with Django or FastAPI over PostgreSQL; on
                the frontend, React, Next.js and TypeScript. When a project needs something else I
                learn it: .NET and Angular, Tauri, Electron and Cloudflare Workers all run projects
                on this site.
              </p>
            </section>

            <section className="prose-plain">
              <h2 className="t-title mb-4 text-foreground">What I&apos;m looking for</h2>
              <p>
                A full-time full-stack engineering role on a team that ships, where I can own
                features end to end and keep learning from experienced engineers. Remote, or on-site
                in{" "}
                {profile.openTo
                  .slice(1)
                  .join(", ")
                  .replace(/, ([^,]*)$/, " or $1")}
                .
              </p>
            </section>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
            <img
              src="/photos/full-length.webp"
              alt={profile.name}
              loading="lazy"
              className="aspect-square w-full rounded-3xl object-cover object-[center_12%] shadow-raised"
            />
            <div className="card p-5">
              <dl className="divide-y divide-divider">
                <Fact label="Role">{profile.role}</Fact>
                <Fact label="Based in">{profile.location}</Fact>
                <Fact label="Education">{profile.education}</Fact>
                <Fact label="Languages">
                  <ul className="space-y-0.5">
                    {profile.languages.map((language) => (
                      <li key={language.name}>
                        {language.name}{" "}
                        <span className="text-muted-foreground">({language.level})</span>
                      </li>
                    ))}
                  </ul>
                </Fact>
                <Fact label="Works mostly with">
                  <ChipList items={profile.focus} className="mt-1" />
                </Fact>
                <Fact label="Availability">
                  {profile.status}: {profile.openTo.join(", ")}
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
