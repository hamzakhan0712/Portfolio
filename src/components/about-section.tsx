import { useEffect, useRef } from "react";
import {
  User,
  MapPin,
  GraduationCap,
  Languages,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

function AboutSection() {
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

  const quickFacts = [
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.E. CSE (Data Science), Mumbai University",
    },
    {
      icon: Briefcase,
      label: "Available",
      value: "Remote · Mumbai · Navi Mumbai · Thane",
    },
    {
      icon: Languages,
      label: "Languages",
      value: "English (professional), Hindi   ",
    },
    {
      icon: Sparkles,
      label: "Currently",
      value: "Open to backend developer roles",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden reveal-container"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium"
          >
            <User className="w-4 h-4 text-primary mr-2" />
            About
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Backend, <span className="gradient-text">pragmatic</span>, shipped.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Production-aware Django developer. Four years of real client work,
            real deployments, real users.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              <span className="text-foreground font-semibold">
                Backend developer
              </span>{" "}
              with{" "}
              <span className="text-primary font-semibold">4 years</span> of
              freelance project experience building Django-based web
              applications, REST APIs, and real-time WebSocket services backed
              by PostgreSQL.
            </p>
            <p>
              I started freelancing in 2021 while studying. Most projects were
              for clients who needed working systems they could actually use —
              which meant dealing with real constraints: deployment on shared
              servers, handling user traffic, debugging in production, and
              maintaining code other people depend on.
            </p>
            <p>
              That experience shaped how I approach backend work — pragmatic,
              deployment-aware, and focused on what actually ships.
            </p>
            <p>
              Currently completing a{" "}
              <span className="text-foreground font-medium">
                B.E. in Computer Science and Engineering (Data Science)
              </span>{" "}
              at the University of Mumbai (graduating July 2026), and building
              toward a career in{" "}
              <span className="text-primary font-medium">Data Engineering</span>.
            </p>

            {/* Highlight strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-4"
            >
              {[
                { value: "4yrs", label: "Freelance" },
                { value: "6", label: "Projects shipped" },
                { value: "2", label: "Live deployments" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
                >
                  <div className="text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-xl overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-primary/10 via-transparent to-transparent flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  Quick facts
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/70"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/70"></span>
                </div>
              </div>

              {/* Facts list */}
              <div className="p-6 space-y-4">
                {quickFacts.map((fact, idx) => {
                  const Icon = fact.icon;
                  return (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                          {fact.label}
                        </div>
                        <div className="text-sm text-foreground/90 leading-relaxed">
                          {fact.value}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Card footer */}
              <div className="px-6 py-3 border-t border-border/50 bg-secondary/20 font-mono text-[11px] text-muted-foreground">
                <span className="text-primary">$</span> available --remote --mumbai
              </div>
            </div>

            {/* Floating glow */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
