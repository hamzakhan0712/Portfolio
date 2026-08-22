import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import { projectGroups, projects } from "@/data/projects";

/** A lone card stranded in a four-column row reads as a gap, not a layout. */
const gridClassFor = (count: number) =>
  count === 1
    ? "mx-auto max-w-3xl grid-cols-1"
    : count === 2
      ? "mx-auto max-w-5xl grid-cols-1 sm:grid-cols-2"
      : count === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

/** Counted from the data so the masthead copy can never drift out of date. */
const productCount = projects.filter((p) => p.category === "product").length;
const clientCount = projects.filter((p) => p.category === "client").length;

/** Groups keep their authored order; an empty one simply never renders. */
const groups = projectGroups
  .map((group) => ({
    ...group,
    items: projects.filter((project) => project.category === group.category),
  }))
  .filter((group) => group.items.length > 0);

function ProjectsSection() {
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

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="reveal-container relative overflow-hidden pb-14 pt-24 md:pb-20 md:pt-28"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        {/* Masthead — the work still leads, but a visitor landing here needs to
            know whose it is. Carries the page's h1; the hero below repeats the
            name visually, not semantically. */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Selected work
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
            Hamza Khan — <span className="gradient-text">Backend Developer</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Four years of freelance work: {productCount} products of my own and{" "}
            {clientCount} systems built for client businesses. Django, FastAPI
            and PostgreSQL, mostly. Every one has a walkthrough and a write-up —
            start anywhere.
          </p>
        </motion.header>

        {/* Grouped grids */}
        <div className="space-y-16 md:space-y-20">
          {groups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`group-${group.category}`}
            >
              <div className="mb-7 border-b border-border/50 pb-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    id={`group-${group.category}`}
                    className="text-2xl font-bold md:text-3xl"
                  >
                    {group.title}
                  </h2>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {group.items.length}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {group.blurb}
                </p>
              </div>

              <div
                className={`grid gap-x-5 gap-y-9 ${gridClassFor(group.items.length)}`}
              >
                {group.items.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
