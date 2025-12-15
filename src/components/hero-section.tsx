import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code, Database, Brain, ExternalLink, ArrowDown, Sparkles } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start w-full lg:w-auto">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Open to opportunities
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-foreground">Full Stack Developer</span>
                <span className="block mt-2">
                  Transitioning to{" "}
                  <span className="gradient-text inline-flex items-center gap-2">
                    Data Science
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              With <span className="text-foreground font-semibold">3 years of experience</span> in full-stack development specializing in Django and modern web technologies, I'm now expanding into{" "}
              <span className="text-primary font-semibold">data science and machine learning</span> to build intelligent, data-driven solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <ScrollLink to="projects" smooth={true} duration={800} offset={-80}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <span className="relative flex items-center gap-2">
                    View My Work
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Button>
              </ScrollLink>

              <ScrollLink to="contact" smooth={true} duration={800} offset={-80}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden border-2 border-border hover:border-primary/50 bg-background/50 hover:bg-background backdrop-blur-sm transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Get In Touch</span>
                </Button>
              </ScrollLink>
            </motion.div>

            {/* Expertise Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4"
            >
              {[
                { icon: Code, label: "Full Stack Dev", color: "primary" },
                { icon: Database, label: "Data Engineering", color: "primary" },
                { icon: Brain, label: "Machine Learning", color: "primary" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4 text-sm"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">3+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">10+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-foreground">80%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto max-w-md lg:max-w-lg w-full"
          >
            <div className="relative aspect-square">
              {/* Decorative Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-2xl blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/15 rounded-2xl blur-2xl"
              />
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-8 w-16 h-16 bg-primary/10 rounded-2xl blur-xl"
              />

              {/* Main Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-border/50 shadow-2xl"
              />

              {/* Image Container */}
              <div className="absolute inset-4 md:inset-6 rounded-2xl bg-background/95 border border-border/50 shadow-xl overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center p-6 md:p-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background shadow-2xl">
                      <img
                        src="/me.jpg"
                        alt="Hamza Khan - Full Stack Developer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Greeting Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200 }}
                      className="absolute -bottom-2 -right-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg flex items-center gap-2"
                    >
                      <span className="animate-wave inline-block">👋</span>
                      <span>Hello!</span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

       
      </div>
    </section>
  );
}