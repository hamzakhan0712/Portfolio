import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Server,
  Database,
  Cloud,
  Layers,
  LineChart,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      description: "Core languages across backend, data and interface work.",
      gradient: "from-yellow-500/10 to-orange-500/10",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
      skills: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "SQL", icon: "/icons/sql.svg" },
        { name: "TypeScript", icon: "/icons/typescript.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
      ],
    },
    {
      title: "Backend & APIs",
      icon: Server,
      description: "Python frameworks, real-time transports, REST design.",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20 hover:border-green-500/40",
      skills: [
        { name: "Django", icon: "/icons/django.svg" },
        { name: "DRF", icon: "/icons/api.svg" },
        { name: "Django Channels", icon: "/icons/websocket.svg" },
        { name: "FastAPI", icon: "/icons/FastAPI.svg" },
        { name: "Flask", icon: "/icons/flask.svg" },
        { name: "REST APIs", icon: "/icons/api.svg" },
        { name: "Postman", icon: "/icons/postman.svg" },
      ],
    },
    {
      title: "Databases & Search",
      icon: Database,
      description: "Schema design, query optimisation, analytical stores.",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      skills: [
        { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "SQLite", icon: "/icons/sqlite.svg" },
        { name: "DuckDB", icon: "/icons/duckdb.svg" },
        { name: "Elasticsearch", icon: "/icons/elasticsearch.svg" },
      ],
    },
    {
      title: "Data & Analytics",
      icon: LineChart,
      description: "Pipelines, modelling and reporting from shipped projects.",
      gradient: "from-cyan-500/10 to-teal-500/10",
      iconColor: "text-cyan-500",
      borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
      skills: [
        { name: "Pandas", icon: "/icons/Pandas.svg" },
        { name: "NumPy", icon: "/icons/NumPy.svg" },
        { name: "scikit-learn", icon: "/icons/scikitlearn.svg" },
        { name: "XGBoost", icon: "/icons/xgboost.svg" },
        { name: "Prophet", icon: "/icons/prophet.svg" },
        { name: "Power BI", icon: "/icons/powerbi.svg" },
        { name: "Jupyter", icon: "/icons/Jupyter.svg" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      description: "Deployment, containers, CI and hosting.",
      gradient: "from-orange-500/10 to-red-500/10",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/20 hover:border-orange-500/40",
      skills: [
        { name: "Azure", icon: "/icons/azure.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "GitHub Actions", icon: "/icons/cicd.svg" },
        { name: "Git", icon: "/icons/git.svg" },
        { name: "DigitalOcean", icon: "/icons/DigitalOcean.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
        { name: "Render", icon: "/icons/render.svg" },
        { name: "Hostinger", icon: "/icons/hostinger.svg" },
      ],
    },
    {
      title: "Frontend & Desktop",
      icon: Layers,
      description: "Interfaces for my own backends, plus a Tauri desktop app.",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      skills: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Next.js", icon: "/icons/nextjs.svg" },
        { name: "Vite", icon: "/icons/vite.svg" },
        { name: "Tailwind", icon: "/icons/tailwindcss.svg" },
        { name: "Shadcn UI", icon: "/icons/shadcn.svg" },
        { name: "Ant Design", icon: "/icons/antdesign.svg" },
        { name: "Framer Motion", icon: "/icons/framermotion.svg" },
        { name: "Tauri", icon: "/icons/tauri.svg" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden reveal-container"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

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
            <Layers className="w-4 h-4 text-primary mr-2" />
            Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            What I <span className="gradient-text">Work With</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Backend-first toolkit spanning Python frameworks, databases,
            analytics and cloud infrastructure — everything below is used in a
            project on this page.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
                onMouseEnter={() => setHoveredCard(categoryIndex)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden h-full transition-all duration-500",
                    "bg-card/50 backdrop-blur-sm border",
                    category.borderColor,
                    hoveredCard === categoryIndex &&
                      "shadow-xl shadow-primary/5 -translate-y-2",
                  )}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      "bg-gradient-to-br",
                      category.gradient,
                    )}
                  />

                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                          "bg-secondary/50 group-hover:scale-110",
                          category.gradient,
                        )}
                      >
                        <Icon className={cn("w-7 h-7", category.iconColor)} />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredCard === categoryIndex ? 1 : 0,
                          x: hoveredCard === categoryIndex ? 0 : -10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight
                          className={cn("w-5 h-5", category.iconColor)}
                        />
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl font-bold mb-2">
                      {category.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative pt-4 border-t border-border/50">
                    <div className="grid grid-cols-4 gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: categoryIndex * 0.08 + skillIndex * 0.04,
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex flex-col items-center gap-2 group/skill"
                          title={skill.name}
                        >
                          <div
                            className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                              "bg-secondary/30 group-hover/skill:bg-secondary/50",
                              "border border-border/30 group-hover/skill:border-border/60",
                            )}
                          >
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-7 h-7 object-contain filter group-hover/skill:brightness-110 transition-all"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.src = "/icons/placeholder.svg";
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-medium text-center text-muted-foreground group-hover/skill:text-foreground transition-colors line-clamp-2 leading-tight">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Skill Count Badge */}
                    <div className="mt-6 pt-4 border-t border-border/30">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          Technologies
                        </span>
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full font-semibold",
                            "bg-secondary/50 text-foreground",
                          )}
                        >
                          {category.skills.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Academic exposure footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Academic exposure
            </p>
            <p className="text-sm text-muted-foreground italic">
              TensorFlow · Apache Spark · Hadoop · Matplotlib · Blockchain
              Technologies · Natural Language Processing
            </p>
            <p className="text-[11px] text-muted-foreground/70 mt-2">
              Coursework exposure, not production experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
