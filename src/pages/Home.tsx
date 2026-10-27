import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Cloud,
  FolderKanban,
  Globe,
  MapPin,
  Monitor,
  MonitorSmartphone,
  PanelsTopLeft,
  Server,
  Sparkles,
  type Icon,
} from "@/components/icons";
import {
  ChipList,
  ContactBand,
  Section,
  SectionHeading,
  SettingsCard,
} from "@/components/primitives";
import { ProjectCard } from "@/components/project-card";
import { Reveal, RevealItem, RevealList } from "@/components/reveal";
import { ProjectShowcase } from "@/components/app-window";
import { PresenceAvatar } from "@/components/presence";
import { metrics, profile, strengths } from "@/data/site";
import { projects } from "@/data/projects";

/**
 * The front page: who this is and what he builds, shown running; the
 * headline facts; selected projects; the areas of work; and how to get in
 * touch.
 */

/* Six apps fit the hero's dock; the grid shows one spotlight and two full
   rows of three under it. */
const featured = projects.slice(0, 6);
const [spotlight, ...rest] = projects.slice(0, 7);

const STRENGTH_ICONS: Record<string, Icon> = {
  backend: Server,
  frontend: PanelsTopLeft,
  desktop: MonitorSmartphone,
  deployment: Cloud,
};

const METRIC_ICONS: Record<string, Icon> = {
  shipped: FolderKanban,
  live: Globe,
  desktop: Monitor,
  award: Award,
};

/* The page's one orchestrated moment: the hero arrives in two beats. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.1, 0.9, 0.2, 1] as const },
});

export default function Home() {
  return (
    <>
      {/* ── Hero: the person on the left, the work running on the right ── */}
      <section>
        <div className="container-site grid grid-cols-1 items-center gap-12 pb-12 pt-10 sm:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pb-16 lg:pt-20">
          <motion.div {...rise(0)}>
            <p className="inline-flex items-center gap-3 text-[14px]">
              <PresenceAvatar size={40} />
              <span className="leading-tight">
                <span className="block font-semibold text-foreground">Available</span>
                <span className="block text-muted-foreground">{profile.status}</span>
              </span>
            </p>

            <h1 className="t-display mt-7">{profile.name}</h1>
            <p className="mt-3 font-display text-[1.375rem] font-semibold leading-8 text-muted-foreground sm:text-[1.75rem] sm:leading-9">
              {profile.role}
            </p>

            <p className="mt-7 max-w-xl text-[18px] leading-8 text-muted-foreground">
              {profile.headline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-accent btn-lg">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-standard btn-lg">
                Contact me
              </Link>
            </div>

            <p className="mt-8 flex items-start gap-2 text-[14px] leading-6 text-muted-foreground">
              <MapPin className="mt-1 h-4 w-4 shrink-0" />
              {profile.locationLine}
            </p>
          </motion.div>

          <motion.div {...rise(0.15)}>
            <ProjectShowcase projects={featured} />
          </motion.div>
        </div>
      </section>

      {/* ── The facts, as bento tiles ─────────────────────────────────── */}
      <Section tight className="pt-0 sm:pt-0">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {metrics.map((metric) => {
            const Icon = METRIC_ICONS[metric.id] ?? Sparkles;
            return (
              <div key={metric.label} className="card flex flex-col p-5 sm:p-6">
                <span className="icon-tile h-10 w-10 rounded-xl">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <dd className="mt-5 font-display text-[2rem] font-semibold leading-none tracking-tight text-foreground tabular sm:text-[2.5rem]">
                  {metric.value}
                </dd>
                <dt className="mt-2 text-[14px] font-semibold text-foreground">{metric.label}</dt>
                <dd className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
                  {metric.source}
                </dd>
              </div>
            );
          })}
        </dl>
      </Section>

      {/* ── Projects: one spotlight, then the rest ────────────────────── */}
      <Section reveal={false}>
        <Reveal>
          <SectionHeading
            title="Selected projects"
            lead="Web applications, websites and desktop apps. Each one has screenshots, short clips and a full video walkthrough."
            action={{ to: "/projects", label: `All ${projects.length} projects` }}
          />
        </Reveal>
        <RevealList className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {spotlight && (
            <RevealItem className="sm:col-span-2 lg:col-span-3">
              <ProjectCard project={spotlight} spotlight />
            </RevealItem>
          )}
          {rest.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* ── What I work on ───────────────────────────────────────────── */}
      <Section reveal={false} className="pt-0 sm:pt-0">
        <Reveal>
          <SectionHeading
            title="What I work on"
            lead="Across the stack, from the schema to the screen to the server it runs on."
            action={{ to: "/skills", label: "All skills" }}
          />
        </Reveal>
        <RevealList className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {strengths.map((item) => (
            <RevealItem key={item.id}>
              <SettingsCard
                icon={STRENGTH_ICONS[item.id]}
                title={item.title}
                description={item.body}
                className="h-full"
              />
            </RevealItem>
          ))}
        </RevealList>
      </Section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <Section className="pt-0 sm:pt-0">
        <div className="card grid gap-2 p-2 lg:grid-cols-[0.8fr_1.2fr]">
          {/* On large screens the text sets the row height; the photo fills it. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface lg:aspect-auto">
            <img
              src="/photos/full-length.webp"
              alt={profile.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
            />
          </div>
          <div className="p-5 sm:p-10">
            <h2 className="t-title">About me</h2>
            <div className="prose-plain mt-5">
              <p>
                I work across the whole stack: the data model and the API, the interface people use,
                and the pipeline that ships it. The projects on this site run on Django, FastAPI,
                .NET, Next.js, Tauri and Electron.
              </p>
              <p>
                I graduated in 2026 with a B.E. in Computer Science and Engineering from the
                University of Mumbai, after a Diploma in Computer Engineering.
              </p>
            </div>
            <ChipList items={profile.focus} className="mt-6" />
            <Link to="/about" className="btn-standard mt-8">
              More about me
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
