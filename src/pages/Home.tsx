import { Link } from "react-router-dom";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import {
  ContactBand,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { ServiceCard } from "@/components/service-card";
import { engagementSteps, metrics, profile } from "@/data/site";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

/**
 * The front page, ordered the way a visitor's interest runs: who this is,
 * what can be built for them, what has already been built, how working
 * together goes, and how to get in touch.
 */

// A short, balanced selection for the front page — the first few of each
// group, in the order the data file lists them. The full list is one click.
const featured = [
  ...projects.filter((p) => p.category === "product").slice(0, 3),
  ...projects.filter((p) => p.category === "client").slice(0, 3),
];

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
                See my work
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
              {profile.role} · {profile.location} · {profile.openTo.join(", ")}
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

      {/* ── Services ─────────────────────────────────────────────────── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What I can build for you"
          title="Ready-made systems for four kinds of business"
          lead="Each of these already exists and runs today. They can be set up for another business, branded for you, with your data imported."
          action={{ to: "/services", label: "All services" }}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <ServiceCard solution={solution} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Selected work"
          title="Software I have designed, built and delivered"
          lead={`${projects.length} finished systems, each shown with screenshots and a recorded walkthrough of the real thing. Here are six of them.`}
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

      {/* ── Process ──────────────────────────────────────────────────── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="How working together goes"
          title="Simple, fixed-scope, and yours to keep"
          align="center"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {engagementSteps.map((step, index) => (
            <li key={step.title} className="card p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-accent-foreground tabular">
                {index + 1}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <Section>
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
              A software engineer who has carried projects from the first call
              to the last handover
            </h2>
            <div className="prose-plain mt-6">
              <p>
                I started freelancing in {profile.freelancingSince.split(" ")[1]}{" "}
                while studying. Most projects were for clients who needed working
                systems they could actually use — which meant real constraints:
                deployment on shared servers, real users, debugging in production,
                and maintaining code other people depend on.
              </p>
              <p>
                I graduated in Summer 2026 with a B.E. in Computer Science and
                Engineering (Data Science) from the University of Mumbai, and I am
                building toward a career in {profile.movingToward.toLowerCase()}.
              </p>
            </div>
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
