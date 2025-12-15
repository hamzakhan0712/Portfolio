import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Server, Database, Cloud, Smartphone, Layers, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      { threshold: 0.1 }
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
      title: "Frontend Development",
      icon: Code,
      description: "Building responsive and interactive user interfaces",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      skills: [
        { name: "HTML5", icon: "/icons/html5.svg" },
        { name: "CSS3", icon: "/icons/css3.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "React", icon: "/icons/react.svg" },
        { name: "Vite", icon: "/icons/Vite.js.svg" },
        { name: "NextJS", icon: "/icons/Next.js.svg" },
        { name: "Redux", icon: "/icons/redux.svg" },
        { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
        { name: "Shadcn UI", icon: "/icons/shadcn.svg" },
        { name: "Bootstrap", icon: "/icons/bootstrap.svg" },
        { name: "Flowbite", icon: "/icons/flowbite.png" },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      description: "Creating scalable server-side applications",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20 hover:border-green-500/40",
      skills: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Flask", icon: "/icons/flask.svg" },
        { name: "Django", icon: "/icons/django.svg" },
         { name: "Fast APIs", icon: "/icons/FastAPI.svg" },
        { name: "REST APIs", icon: "/icons/api.svg" },

        
      ],
    },
    {
      title: "Database Management",
      icon: Database,
      description: "Designing and managing data storage solutions",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      skills: [
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
        { name: "SQLite", icon: "/icons/sqlite.svg" },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      description: "Deploying and maintaining cloud infrastructure",
      gradient: "from-orange-500/10 to-red-500/10",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/20 hover:border-orange-500/40",
      skills: [
        { name: "AWS", icon: "/icons/aws.svg" },
        { name: "Google Cloud", icon: "/icons/googlecloud.svg" },
         { name: "Digital Ocean", icon: "/icons/DigitalOcean.svg" },
          { name: "Hostinger", icon: "/icons/hostinger.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
        { name: "Render", icon: "/icons/render.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "Postman", icon: "/icons/postman.svg" },
      ],
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      description: "Building cross-platform mobile applications",
      gradient: "from-indigo-500/10 to-violet-500/10",
      iconColor: "text-indigo-500",
      borderColor: "border-indigo-500/20 hover:border-indigo-500/40",
      skills: [
        { name: "Kotlin", icon: "/icons/kotlin.svg" },
        { name: "Jetpack Compose", icon: "/icons/jetpack.svg" },
        { name: "Android SDK", icon: "/icons/android.svg" },
      ],
    },
    {
      title: "Data Science & ML",
      icon: Layers,
      description: "Exploring machine learning and data analytics",
      gradient: "from-teal-500/10 to-cyan-500/10",
      iconColor: "text-teal-500",
      borderColor: "border-teal-500/20 hover:border-teal-500/40",
      skills: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Pandas", icon: "/icons/Pandas.svg" },
        { name: "NumPy", icon: "/icons/NumPy.svg" },
        { name: "Jupyter", icon: "/icons/Jupyter.svg" },
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden reveal-container">
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
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium"
          >
            <Layers className="w-4 h-4 text-primary mr-2" />
            Technical Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A comprehensive toolkit spanning full-stack development, cloud infrastructure, and emerging data science technologies.
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
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                onMouseEnter={() => setHoveredCard(categoryIndex)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden h-full transition-all duration-500",
                    "bg-card/50 backdrop-blur-sm border",
                    category.borderColor,
                    hoveredCard === categoryIndex && "shadow-xl shadow-primary/5 -translate-y-2"
                  )}
                >
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-br",
                    category.gradient
                  )} />

                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                        "bg-secondary/50 group-hover:scale-110",
                        category.gradient
                      )}>
                        <Icon className={cn("w-7 h-7", category.iconColor)} />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredCard === categoryIndex ? 1 : 0,
                          x: hoveredCard === categoryIndex ? 0 : -10
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className={cn("w-5 h-5", category.iconColor)} />
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
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="flex flex-col items-center gap-2 group/skill"
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                            "bg-secondary/30 group-hover/skill:bg-secondary/50",
                            "border border-border/30 group-hover/skill:border-border/60"
                          )}>
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-7 h-7 object-contain filter group-hover/skill:brightness-110 transition-all"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.src = "/icons/placeholder.svg";
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-center text-muted-foreground group-hover/skill:text-foreground transition-colors line-clamp-2">
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
                        <span className={cn(
                          "px-2.5 py-1 rounded-full font-semibold",
                          "bg-secondary/50 text-foreground"
                        )}>
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

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Continuously learning and adapting to new technologies. Currently expanding expertise in{" "}
            <span className="text-primary font-semibold">Machine Learning</span>,{" "}
            <span className="text-primary font-semibold">Data Analytics</span>, and{" "}
            <span className="text-primary font-semibold">AI Integration</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;