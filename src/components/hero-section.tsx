import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  FileText,
  Terminal,
  Sparkles,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion, type Variants } from "framer-motion";

export function HeroSection() {
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const stats = [
    { value: "4", label: "Years freelance" },
    { value: "6", label: "Production projects" },
    { value: "SIH'25", label: "Grand Finalist" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/hamzakhan0712",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/hamza-khan-3a2b0024a/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:hamza81khan81@gmail.com",
      label: "Email",
    },
    {
      icon: FileText,
      href: "/resume.pdf",
      label: "Resume",
      download: true,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-7 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center lg:justify-start w-full lg:w-auto"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Open to backend developer roles
              </div>
            </motion.div>

            {/* Name + Role */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="block text-foreground">Hamza Khan</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-2xl font-semibold gradient-text">
                Backend Developer
              </p>
              <p className="font-mono text-sm sm:text-base text-muted-foreground tracking-tight">
                Python <span className="text-primary">·</span> Django{" "}
                <span className="text-primary">·</span> PostgreSQL{" "}
                <span className="text-primary">·</span> AWS
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build backend systems that run in production. Four years of
              freelance project experience writing Django web applications, REST
              APIs, and real-time WebSocket services backed by PostgreSQL — for
              clients in India and Germany.
            </motion.p>

            {/* Secondary line */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto lg:mx-0"
            >
              Currently completing B.E. CSE (Data Science) at the University of
              Mumbai.{" "}
              <span className="inline-flex items-center gap-1 text-foreground/90 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Smart India Hackathon 2025 Grand Finalist.
              </span>
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-2"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-center lg:text-left p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <ScrollLink
                to="projects"
                smooth={true}
                duration={800}
                offset={-80}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                >
                  <span className="relative flex items-center gap-2">
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </ScrollLink>

              <ScrollLink
                to="contact"
                smooth={true}
                duration={800}
                offset={-80}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group border-2 border-border hover:border-primary/50 bg-background/50 hover:bg-background backdrop-blur-sm transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </span>
                </Button>
              </ScrollLink>
            </motion.div>

            {/* Secondary links row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 pt-2"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.download
                      ? { download: true }
                      : link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    aria-label={link.label}
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-background/30 hover:bg-background/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="text-xs font-medium hidden sm:inline">
                      {link.label}
                    </span>
                  </a>
                );
              })}
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
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-2xl blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/15 rounded-2xl blur-2xl"
              />
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/2 -right-8 w-16 h-16 bg-primary/10 rounded-2xl blur-xl"
              />

              {/* Outer gradient glow ring — frames the card */}
              <div
                aria-hidden
                className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/40 via-purple-500/30 to-primary/40 opacity-70 blur-xl pointer-events-none"
              />

              {/* Main Card with floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)] ring-1 ring-border/60"
              >
                {/* Gradient border frame */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary/60 via-purple-400/40 to-primary/60 pointer-events-none z-10"
                  style={{
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Photo fills the card */}
                <motion.img
                  src="/me.jpg"
                  alt="Hamza Khan — Backend Developer"
                  loading="eager"
                  decoding="async"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover object-top [image-rendering:auto] select-none"
                  draggable={false}
                />

                {/* Tiny bottom band so the badge reads cleanly — only behind the badge area, not across the whole photo */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                />

                {/* Corner accent dots */}
                <div
                  aria-hidden
                  className="absolute top-3 right-3 z-10 flex gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400/80 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80 shadow-sm" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80 shadow-sm" />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-primary/90 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-white/20"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-mono">backend.dev</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
