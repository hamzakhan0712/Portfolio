import { Link } from "react-router-dom";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import {
  ChipList,
  ContactBand,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { metrics, profile, strengths } from "@/data/site";
import { projects } from "@/data/projects";

/**
 * The front page: who this is, the headline numbers, selected projects, what
 * I work on, and how to get in touch.
 */

const featured = projects.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="container-site grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-[13.5px] font-medium text-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-ok" />
              {profile.status}
            </p>
            <h1 className="display mt-6">
              Hi, I&apos;m {profile.name}.
              <br />
              <span className="text-primary">{profile.headline}</span>
            </h1>
            <p className="lead mt-6 max-w-xl">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get in touch
              </Link>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <FileText className="h-4 w-4" />
                Download CV
              </a>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-[14.5px] text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.role} · {profile.location}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <img
              src="/photos/portrait.webp"
              alt={profile.name}
              width={288}
              height={384}
              /* React 18 does not map the camelCase prop; spread the real
                 lowercase attribute so the LCP hint reaches the DOM. */
              {...{ fetchpriority: "high" }}
              className="aspect-[3/4] w-full rounded-3xl object-cover object-top shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ring-1 ring-border"
            />
          </div>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────────────────────── */}
      <Section tight>
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="card p-6">
              <dd className="text-[2.25rem] font-semibold leading-none tracking-tight text-foreground tabular">
                {metric.value}
              </dd>
              <dt className="mt-3 text-[15px] font-medium text-foreground">
                {metric.label}
              </dt>
              <p className="mt-1 text-[13.5px] text-muted-foreground">
                {metric.source}
              </p>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Featured projects"
          title="Things I have built"
          lead="Web applications, websites and desktop apps — each with screenshots and a video walkthrough."
          action={{ to: "/projects", label: `View all ${projects.length} projects` }}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── What I work on ───────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="What I do"
          title="What I work on"
          action={{ to: "/skills", label: "All skills" }}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {strengths.map((item) => (
            <li key={item.title} className="card p-7">
              <h3 className="text-[19px] font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <img
            src="/photos/full-length.webp"
            alt={profile.name}
            loading="lazy"
            className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl object-cover object-top lg:max-w-none"
          />
          <div>
            <p className="eyebrow mb-3">About me</p>
            <h2 className="heading-section">
              A fresh graduate who learns by building
            </h2>
            <div className="prose-plain mt-6">
              <p>
                I graduated in 2026 with a B.E. in Computer Science and
                Engineering from the University of Mumbai (CGPI 8.19 / 10),
                after a Diploma in Computer Engineering.
              </p>
              <p>
                Alongside my studies I built the web applications, websites
                and desktop apps on this site, and my team reached the Grand
                Finale of Smart India Hackathon 2025. I&apos;m now looking for
                my first full-time role as a software engineer.
              </p>
            </div>
            <ChipList items={profile.focus} className="mt-6" />
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-primary no-underline"
            >
              More about me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
