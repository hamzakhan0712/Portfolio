import { Link } from "react-router-dom";
import {
  ChevronRight,
  Cloud,
  FileText,
  Mail,
  MapPin,
  MonitorSmartphone,
  PanelsTopLeft,
  Server,
} from "lucide-react";
import {
  ChipList,
  ContactBand,
  Section,
  SectionHeading,
  SettingsCard,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { ProjectShowcase } from "@/components/app-window";
import { metrics, profile, strengths } from "@/data/site";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The front page: who this is and what he builds, shown running; the
 * headline facts; selected projects; the areas of work; and how to get in
 * touch.
 */

const featured = projects.slice(0, 6);

const STRENGTH_ICONS = {
  backend: Server,
  frontend: PanelsTopLeft,
  desktop: MonitorSmartphone,
  deployment: Cloud,
} as const;

export default function Home() {
  return (
    <>
      {/* ── Hero: the person on the left, the work running on the right ── */}
      <section className="container-site grid items-center gap-12 pb-12 pt-10 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:pb-16 lg:pt-20">
        <div>
          <p className="status-pill">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden />
            {profile.status}
          </p>

          <h1 className="t-display mt-6">{profile.name}</h1>
          <p className="mt-2 font-display text-[1.375rem] font-semibold leading-8 text-muted-foreground sm:text-[1.625rem]">
            {profile.role}
          </p>

          <p className="mt-6 max-w-xl text-[17px] leading-7 text-foreground">{profile.headline}</p>
          <p className="mt-3 max-w-xl text-[15.5px] leading-7 text-muted-foreground">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link to="/projects" className="btn-accent btn-lg">
              View projects
            </Link>
            <Link to="/contact" className="btn-standard btn-lg">
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              Contact me
            </Link>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-subtle btn-lg">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              Download CV
            </a>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-[14px] text-muted-foreground">
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            {profile.location}, open to {profile.openTo.join(", ")}
          </p>
        </div>

        <ProjectShowcase projects={featured} />
      </section>

      {/* ── The facts, as one card of specifications ──────────────────── */}
      <Section tight className="pt-0 sm:pt-0">
        {/* Two by two on phones, one row from large screens; the dividers
            follow whichever grid is showing. */}
        <dl className="card grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "border-divider p-5 sm:p-6",
                index % 2 === 1 && "border-l",
                index < 2 && "border-b lg:border-b-0",
                index === 2 && "lg:border-l",
              )}
            >
              <dt className="t-caption">{metric.label}</dt>
              <dd className="mt-1 font-display text-[1.75rem] font-semibold leading-9 text-foreground tabular">
                {metric.value}
              </dd>
              <dd className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
                {metric.source}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          title="Selected projects"
          lead="Web applications, websites and desktop apps. Each one has screenshots, short clips and a full video walkthrough."
          action={{ to: "/projects", label: `All ${projects.length} projects` }}
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          title="What I work on"
          lead="Across the stack, from the schema to the screen to the server it runs on."
          action={{ to: "/skills", label: "All skills" }}
        />
        <ul className="mt-8 grid gap-1 md:grid-cols-2 md:gap-2">
          {strengths.map((item) => (
            <li key={item.id}>
              <SettingsCard
                icon={STRENGTH_ICONS[item.id as keyof typeof STRENGTH_ICONS]}
                title={item.title}
                description={item.body}
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <Section>
        <div className="card grid overflow-hidden lg:grid-cols-[0.75fr_1.25fr]">
          {/* On large screens the text sets the row height; the photo fills it. */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img
              src="/photos/full-length.webp"
              alt={profile.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
            />
          </div>
          <div className="p-6 sm:p-10">
            <h2 className="t-title">About me</h2>
            <div className="prose-plain mt-4">
              <p>
                I graduated in 2026 with a B.E. in Computer Science and Engineering from the
                University of Mumbai (CGPI 8.19 / 10), after a Diploma in Computer Engineering.
              </p>
              <p>
                I work across the whole stack: the data model and the API, the interface people use,
                and the pipeline that ships it. The projects on this site run on Django, FastAPI,
                .NET, Next.js, Tauri and Electron. My team also reached the Grand Finale of Smart
                India Hackathon 2025.
              </p>
            </div>
            <ChipList items={profile.focus} className="mt-6" />
            <Link to="/about" className="link-button mt-6">
              More about me
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
