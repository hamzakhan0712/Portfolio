import { useEffect, useRef } from "react";
import { User, Code, Briefcase, Brain, Database, BookOpen, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const journey = [
    {
      year: "2021-2024",
      title: "Full Stack Developer",
      icon: Code,
      description: "Built scalable web applications using Django, React, and modern JavaScript frameworks. Delivered 10+ production-ready projects.",
      highlight: "3 Years Experience",
    },
    {
      year: "2025-Present",
      title: "Transitioning to Data Science",
      icon: Brain,
      description: "Expanding expertise into machine learning, data analysis, and AI. Building intelligent solutions that combine development with data science.",
      highlight: "Active Learning",
    },
  ];



  return (
    <section id="about" ref={sectionRef} className="relative py-12 overflow-hidden reveal-container">
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
            <User className="w-4 h-4 text-primary mr-2" />
            About Me
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            My <span className="gradient-text">Journey</span> & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From building robust web applications to exploring the power of data science combining technical excellence with continuous learning.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left Column - Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="reveal-content"
          >
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
                <img
                  src="/me.jpg"
                  alt="Hamza Khan - Full Stack Developer transitioning to Data Science"
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/15 rounded-full blur-2xl"
                />
              </div>

              {/* Quote Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-8 -right-4 md:-right-8 p-4 md:p-6 glass-card rounded-2xl border border-border/50 shadow-2xl max-w-xs bg-background/95 backdrop-blur-md"
              >
                <p className="font-serif italic text-sm md:text-base text-muted-foreground">
                  "Data is the new oil, but code is the refinery that transforms it into insights."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="reveal-content space-y-8"
          >
            {/* About Me */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mr-3">
                  <User className="w-5 h-5 text-primary" />
                </span>
                About Me
              </h3>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate <span className="text-foreground font-semibold">full-stack developer</span> with <span className="text-primary font-semibold">3 years of experience</span> building scalable web applications. My expertise spans across Django, React, RESTAPI and modern cloud technologies.
                </p>
                <p>
                  Currently, I'm on an exciting journey <span className="text-foreground font-semibold">transitioning into data science</span>, combining my strong development background with machine learning and data analytics to create intelligent, data-driven solutions that solve real-world problems.
                </p>
              </div>
            </div>

            {/* Journey Timeline */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mr-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </span>
                Career Path
              </h3>
              <div className="space-y-4">
                {journey.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="relative p-4 md:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.year}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      
      </div>
    </section>
  );
}

export default AboutSection;