import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimelineEntry = {
  type: "work" | "education";
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string[];
};

const entries: TimelineEntry[] = [
  {
    type: "work",
    role: "Independent Product Development — Novem",
    org: "Self-Employed · Mumbai, India",
    location: "Remote",
    period: "Dec 2025 – Present",
    bullets: [
      "Building Novem, a local-first e-commerce intelligence desktop app — a Tauri (Rust) shell over a Python FastAPI engine, with DuckDB for analytical tables and SQLite for settings and lineage.",
      "Solo across product, architecture, engine, client and packaging: 23 routers and roughly 170 endpoints, demand forecasting, RFM segmentation, CLV and market-basket models, and a local LLM copilot so data never leaves the machine.",
      "CI gates every push — Ruff, pytest across Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest and a production build. Releases ship frozen with PyInstaller inside an NSIS installer.",
    ],
    tech: [
      "Tauri",
      "Rust",
      "FastAPI",
      "DuckDB",
      "React 19",
      "TypeScript",
      "scikit-learn",
      "PyInstaller",
    ],
  },
  {
    type: "work",
    role: "Freelance Full-Stack Developer",
    org: "Brandenbed Living Spaces UG · Berlin, Germany",
    location: "Remote",
    period: "Sep 2025 – Nov 2025",
    bullets: [
      "Built the company's production website for serviced apartment operations across European markets. Achieved a Google PageSpeed Insights score of 95+ on desktop.",
      "Developed an internal CRM with role-based access for property management and client communication workflows.",
      "Worked remotely with the founding team and iterated on features over the engagement.",
    ],
    tech: ["Django", "PostgreSQL", "Next.js", "Tailwind CSS", "Docker", "Azure"],
  },
  {
    type: "work",
    role: "Freelance Backend Developer",
    org: "Self-Employed · Mumbai, India",
    location: "Remote",
    period: "Jan 2021 – Aug 2025",
    bullets: [
      "Delivered Django-based web applications and REST APIs for clients in India and abroad — solo across the full project lifecycle: requirements, development, deployment, maintenance.",
      "Built role-based access systems, real-time WebSocket features using Django Channels, and PostgreSQL-backed CRMs and e-commerce platforms.",
      "Deployed and maintained applications on Azure, DigitalOcean, Render, and Hostinger using Docker.",
      "Industries served: real estate, call center operations, retail and e-commerce, import/export.",
    ],
    tech: [
      "Python",
      "Django",
      "DRF",
      "Django Channels",
      "PostgreSQL",
      "Azure",
      "Docker",
    ],
  },
  {
    type: "education",
    role: "B.E. — Computer Science and Engineering (Data Science)",
    org: "Saraswati College of Engineering · University of Mumbai",
    location: "Kharghar, Navi Mumbai",
    period: "2023 – Jul 2026",
    bullets: [
      "Graduated Summer 2026 with CGPI 8.19 / 10 — 3318 / 4500 aggregate (73.73%).",
      "Direct second-year entry on the strength of the diploma; completed semesters III–VIII, each cleared on the first attempt.",
      "Strongest semesters: SGPI 9.32 (Sem V), 8.71 (Sem VIII) and 8.50 (Sem VII).",
    ],
    tech: [
      "Big Data Analytics",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Artificial Intelligence",
      "Data Warehousing & Mining",
      "Data Analytics & Visualization",
      "Distributed Computing",
      "Cloud Computing",
      "DBMS",
      "Computer Networks",
      "Cryptography & System Security",
    ],
  },
  {
    type: "education",
    role: "Diploma in Computer Engineering — First Class",
    org: "Anjuman-I-Islam’s A. R. Kalsekar Polytechnic · MSBTE",
    location: "New Panvel, Navi Mumbai",
    period: "2021 – Jun 2023",
    bullets: [
      "First Class with 72.63% aggregate — 1271 / 1750 marks across 191 credits.",
      "No backlogs at any point in the course; final semester scored 75.53% (First Class with Distinction).",
      "Direct second-year entry after HSC Science, with semesters I–II exempted.",
    ],
    tech: [
      "Programming with Python",
      "Mobile Application Development",
      "Web Development (PHP)",
      "Emerging Trends in IT",
      "Capstone Project",
    ],
  },
  {
    type: "education",
    role: "HSC (Science) & SSC",
    org: "Maharashtra State Board · Mumbai Divisional Board",
    location: "Mumbai, India",
    period: "2019 – 2021",
    bullets: [
      "HSC (Science), 2021 — 87.50%, with Chemistry 94 and Physics 91.",
      "SSC, 2019 — 81.20%, passed in the Distinction grade.",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden py-14 md:py-20 reveal-container"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeading
          eyebrow="Career & Education"
          icon={Briefcase}
          align="center"
          title={
            <>
              Experience &amp; Education
            </>
          }
        >
          A timeline of clients shipped and degrees earned along the way.
        </SectionHeading>

        {/* Timeline — a single left rail. The old layout alternated cards
            left/right of a centre line, which left 57% of every row empty and
            forced the copy to wrap into 600px-tall cards. */}
        <div className="relative mx-auto max-w-4xl">
          {/* Rail */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-[9px]" />

          <div className="space-y-6 md:space-y-8">
            {entries.map((entry, idx) => {
              const Icon = entry.type === "work" ? Briefcase : GraduationCap;
              const isWork = entry.type === "work";
              const accent = isWork
                ? "text-primary border-primary/30 bg-primary/10"
                : "text-purple-400 border-purple-400/30 bg-purple-400/10";

              return (
                <motion.div
                  key={`${entry.org}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: Math.min(idx, 4) * 0.05 }}
                  className="relative pl-7 md:pl-9"
                >
                  {/* Node + connector tick into the card */}
                  <span
                    className={cn(
                      "absolute left-0 top-5 z-10 h-4 w-4 rounded-full border-4 border-background shadow-lg md:left-0.5",
                      isWork ? "bg-primary" : "bg-purple-400",
                    )}
                    aria-hidden
                  />
                  <span
                    className="absolute left-4 top-[1.7rem] h-px w-3 bg-border md:left-[1.15rem] md:w-4"
                    aria-hidden
                  />

                  <div className="group rounded-2xl border border-border/50 bg-card/50 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 md:p-6">
                    {/* Header row — title left, meta right, on one line where it fits */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div className="min-w-0">
                        <div
                          className={cn(
                            "mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                            accent,
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          {isWork ? "Work" : "Education"}
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-xl">
                          {entry.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-foreground/80">
                          {entry.org}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col gap-1 text-xs text-muted-foreground sm:items-end">
                        <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                          <Calendar className="h-3.5 w-3.5" />
                          {entry.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          {entry.location === "Remote" ? (
                            <Globe2 className="h-3.5 w-3.5" />
                          ) : (
                            <MapPin className="h-3.5 w-3.5" />
                          )}
                          {entry.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {entry.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="relative pl-4 before:absolute before:left-0 before:top-[0.6rem] before:h-1 before:w-1 before:rounded-full before:bg-primary"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>

                    {entry.tech && entry.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-4">
                        {entry.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/30 bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
