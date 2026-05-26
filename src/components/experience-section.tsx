import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
    role: "Freelance Full-Stack Developer",
    org: "Brandenbed Living Spaces UG · Berlin, Germany",
    location: "Remote",
    period: "Sep 2025 – Nov 2025",
    bullets: [
      "Built the company's production website for serviced apartment operations across European markets. Achieved a Google PageSpeed Insights score of 95+ on desktop.",
      "Developed an internal CRM with role-based access for property management and client communication workflows.",
      "Worked remotely with the founding team and iterated on features over the engagement.",
    ],
    tech: ["Django", "PostgreSQL", "Next.js", "Tailwind CSS", "Docker", "AWS"],
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
      "Deployed and maintained applications on AWS EC2, DigitalOcean, Render, and Hostinger using Docker.",
      "Industries served: real estate, call center operations, retail and e-commerce, import/export.",
    ],
    tech: [
      "Python",
      "Django",
      "DRF",
      "Django Channels",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
  },
  {
    type: "education",
    role: "B.E. — Computer Science and Engineering (Data Science)",
    org: "Saraswati College of Engineering · University of Mumbai",
    location: "Kharghar, Navi Mumbai",
    period: "Sep 2023 – Jul 2026 (in progress)",
    bullets: ["Expected CGPA: 8.5 / 10"],
    tech: [
      "Big Data Analytics",
      "Machine Learning",
      "Cloud Computing",
      "Data Warehousing",
      "DBMS",
      "Distributed Computing",
    ],
  },
  {
    type: "education",
    role: "Diploma in Computer Engineering — First Class",
    org: "A.I.I. A.R. Kalsekar Polytechnic · MSBTE",
    location: "New Panvel",
    period: "Sep 2021 – Jul 2023",
    bullets: ["Aggregate 72.63%"],
  },
  {
    type: "education",
    role: "HSC (Science)",
    org: "Maharashtra State Board",
    location: "Mumbai, India",
    period: "2021",
    bullets: ["Scored 87.50%"],
    tech: [
      "Physics",
      "Chemistry",
      "Mathematics & Statistics",
      "Information Technology",
      "English",
    ],
  },
  {
    type: "education",
    role: "SSC",
    org: "Maharashtra State Board",
    location: "Mumbai, India",
    period: "2019",
    bullets: ["Scored 81.20%"],
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
      className="relative py-20 md:py-28 overflow-hidden reveal-container"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium"
          >
            <Briefcase className="w-4 h-4 text-primary mr-2" />
            Career & Education
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Experience</span> & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A timeline of clients shipped and degrees earned along the way.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

          <div className="space-y-10 md:space-y-14">
            {entries.map((entry, idx) => {
              const Icon = entry.type === "work" ? Briefcase : GraduationCap;
              const isLeft = idx % 2 === 0;
              const accent =
                entry.type === "work"
                  ? "text-primary border-primary/30 bg-primary/10"
                  : "text-purple-400 border-purple-400/30 bg-purple-400/10";

              return (
                <motion.div
                  key={`${entry.org}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={cn(
                    "relative grid grid-cols-[auto_1fr] md:grid-cols-2 gap-4 md:gap-10 items-start",
                  )}
                >
                  {/* Timeline dot (always at left on mobile, center on desktop) */}
                  <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.05 + 0.2 }}
                      className={cn(
                        "w-4 h-4 rounded-full border-4 border-background shadow-lg",
                        entry.type === "work" ? "bg-primary" : "bg-purple-400",
                      )}
                    />
                  </div>

                  {/* Card placement: alternate on desktop */}
                  <div
                    className={cn(
                      "col-start-2 md:col-start-1 pl-6 md:pl-0",
                      isLeft ? "md:pr-10 md:text-right" : "md:col-start-2 md:pl-10 md:row-start-1",
                    )}
                  >
                    <div
                      className={cn(
                        "group relative p-5 md:p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
                        "border-border/50 hover:border-primary/30",
                      )}
                    >
                      {/* Type badge */}
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider mb-3",
                          accent,
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        {entry.type === "work" ? "Work" : "Education"}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {entry.role}
                      </h3>
                      <p className="text-sm font-medium text-foreground/80 mb-3">
                        {entry.org}
                      </p>

                      <div
                        className={cn(
                          "flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-4",
                          isLeft && "md:justify-end",
                        )}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          {entry.location === "Remote" ? (
                            <Globe2 className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                          {entry.location}
                        </span>
                      </div>

                      <ul
                        className={cn(
                          "space-y-2 text-sm text-muted-foreground leading-relaxed",
                          isLeft && "md:text-right",
                        )}
                      >
                        {entry.bullets.map((b, i) => (
                          <li
                            key={i}
                            className={cn(
                              "relative",
                              isLeft
                                ? "md:pr-4 md:before:right-0 md:before:absolute md:before:top-2 md:before:w-1 md:before:h-1 md:before:rounded-full md:before:bg-primary"
                                : "pl-4 before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-primary",
                            )}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>

                      {entry.tech && entry.tech.length > 0 && (
                        <div
                          className={cn(
                            "flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/50",
                            isLeft && "md:justify-end",
                          )}
                        >
                          {entry.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/60 text-secondary-foreground border border-border/30"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div
                    className={cn(
                      "hidden md:block",
                      isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1",
                    )}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
