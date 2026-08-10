import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Award,
  Trophy,
  Code2,
  Calendar,
  MapPin,
  ZoomIn,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type AchievementType = "certification" | "hackathon" | "award";

interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  image?: string;
  description: string;
  location?: string;
  prize?: string;
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<AchievementType | "all">(
    "all",
  );
  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const achievements: Achievement[] = [
    {
      id: "sih-2025",
      type: "hackathon",
      title: "Smart India Hackathon 2025 — Grand Finale, Software Edition",
      issuer: "Ministry of Education, Government of India",
      date: "Dec 08–09, 2025",
      prize: "Grand Finalist",
      location: "BPUT, Rourkela",
      skills: ["Team Lead", "System Design", "Full-Stack", "API Development"],
      image: "/sih-certificate.jpeg",
      description:
        "Competed in the Smart India Hackathon 2025 Software Edition Grand Finale, held 8–9 December 2025 at Biju Patnaik University of Technology, Rourkela, under the Ministry of Education’s Innovation Cell.",
    },
    {
      id: "scoe-avishkar",
      type: "award",
      title: "SCOE Avishkar 2025 — 2nd Place",
      issuer: "Saraswati College of Engineering",
      date: "Apr 04, 2025",
      prize: "2nd Place",
      location: "Kharghar, Navi Mumbai",
      skills: ["Team Lead", "Project Design", "Technical Presentation"],
      image: "/award1.jpg",
      description:
        "Awarded 2nd place in the SCOE Avishkar 2025 project competition held on 4 April 2025 at Saraswati College of Engineering, Kharghar.",
    },
    {
      id: "ielts-academic",
      type: "certification",
      title: "IELTS Academic — Overall Band 6.5 (CEFR B2)",
      issuer: "British Council · IDP · Cambridge English",
      date: "Jun 21, 2026",
      skills: ["Speaking 7.0", "Listening 6.5", "Reading 6.5", "Writing 6.0"],
      description:
        "Academic IELTS taken on 21 June 2026. Overall band 6.5, mapped to CEFR level B2, with the strongest result in Speaking at 7.0.",
    },
    {
      id: "ibm-excel",
      type: "certification",
      title: "Excel Basics for Data Analysis",
      issuer: "Coursera · IBM",
      date: "Jan 14, 2026",
      credentialUrl: "https://coursera.org/verify/FR1K9EGNYF13",
      skills: ["Excel", "Data Analysis"],
      image: "/ibm-excel.png",
      description:
        "Foundational data analysis with Excel: formulas, pivot tables, and structured data exploration. An online non-credit course authorised by IBM.",
    },
    {
      id: "udemy-data-analyst",
      type: "certification",
      title: "Complete Data Analyst Bootcamp — From Basics to Advanced",
      issuer: "Udemy · Krish Naik, Jayant Topnani (KRISHAI Technologies)",
      date: "Dec 17, 2025",
      credentialUrl:
        "https://ude.my/UC-b1faff47-bbc7-4820-8f38-e7fca8a3db50",
      skills: ["SQL", "Python", "Data Analysis", "Statistics"],
      image: "/certificate4.jpg",
      description:
        "89-hour data analyst curriculum covering SQL, Python, statistics, and visualisation for data-driven decision making.",
    },
    {
      id: "ibm-data-analytics",
      type: "certification",
      title: "Introduction to Data Analytics",
      issuer: "Coursera · IBM",
      date: "Dec 31, 2025",
      credentialUrl: "https://coursera.org/verify/LSQ1WS8X39CZ",
      skills: ["Data Analytics", "BI Tools"],
      image: "/ibm-data-analytics.png",
      description:
        "Overview of the data analytics lifecycle, common tools, and the role of an analyst in modern data teams.",
    },
    {
      id: "udemy-fullstack",
      type: "certification",
      title: "The Complete Full-Stack Web Development Bootcamp",
      issuer: "Udemy · Dr. Angela Yu",
      date: "Nov 15, 2025",
      credentialUrl:
        "https://ude.my/UC-7955329a-129d-422d-99ab-6ca2fd9930f4",
      skills: ["JavaScript", "Node.js", "React", "Databases"],
      image: "/certificate3.jpg",
      description:
        "61.5-hour full-stack bootcamp covering modern web fundamentals through to production deployment.",
    },
    {
      id: "great-learning-ds",
      type: "certification",
      title: "Introduction to Data Science",
      issuer: "Great Learning",
      date: "Oct 22, 2025",
      credentialUrl: "https://www.mygreatlearning.com/certificate/EHSCOIET",
      skills: ["Data Science", "Python", "Statistics"],
      image: "/certificate1.png",
      description:
        "Online course introducing data science workflows, Python tooling, and applied machine learning concepts.",
    },
    {
      id: "aptitude-training",
      type: "certification",
      title: "Aptitude, Lifeskills & Technical Training Programme",
      issuer:
        "Saraswati College of Engineering · Institution’s Innovation Council",
      date: "2025",
      location: "Kharghar, Navi Mumbai",
      skills: ["Aptitude", "Life Skills", "Technical Training"],
      image: "/certificate2.png",
      description:
        "Institute certification programme covering quantitative aptitude, life skills, and core technical training, facilitated by Campus Credentials.",
    },
    {
      id: "cisco-python-essentials",
      type: "certification",
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy · OpenEDG Python Institute",
      date: "Jun 07, 2024",
      skills: ["Python 3", "Algorithmic Thinking", "Standard Library"],
      image: "/certificate1.jpg",
      description:
        "Student-level Statement of Achievement for Python Essentials 1: designing, debugging and refactoring Python 3 programs and applying the standard library.",
    },
  ];

  const categoryConfig = {
    all: {
      label: "All",
      icon: Sparkles,
      count: achievements.length,
    },
    hackathon: {
      label: "Hackathons",
      icon: Code2,
      count: achievements.filter((a) => a.type === "hackathon").length,
    },
    award: {
      label: "Awards",
      icon: Trophy,
      count: achievements.filter((a) => a.type === "award").length,
    },
    certification: {
      label: "Certifications",
      icon: Award,
      count: achievements.filter((a) => a.type === "certification").length,
    },
  };

  const filteredAchievements =
    activeFilter === "all"
      ? achievements
      : achievements.filter((ach) => ach.type === activeFilter);

  const getTypeConfig = (type: AchievementType) => {
    const configs = {
      certification: {
        icon: Award,
        gradient: "from-blue-500/10 to-cyan-500/10",
        iconColor: "text-blue-500",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/10",
      },
      hackathon: {
        icon: Code2,
        gradient: "from-purple-500/10 to-pink-500/10",
        iconColor: "text-purple-500",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/10",
      },
      award: {
        icon: Trophy,
        gradient: "from-yellow-500/10 to-orange-500/10",
        iconColor: "text-yellow-500",
        borderColor: "border-yellow-500/30",
        bgColor: "bg-yellow-500/10",
      },
    };
    return configs[type];
  };

  return (
    <section
      id="achievements"
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
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
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
            <Trophy className="w-4 h-4 text-primary mr-2" />
            Recognition
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Awards & <span className="gradient-text">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            National recognitions, competitions, and continuous learning along
            the way.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2.5">
            {(
              Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>
            ).map((category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const isActive = activeFilter === category;

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    "relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    "flex items-center gap-2",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 hover:border-border",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{config.label}</span>
                  <span
                    className={cn(
                      "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                      isActive ? "bg-white/20" : "bg-muted",
                    )}
                  >
                    {config.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredAchievements.map((achievement, index) => {
              const typeConfig = getTypeConfig(achievement.type);
              const TypeIcon = typeConfig.icon;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  onMouseEnter={() => setHoveredCard(achievement.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div
                    className={cn(
                      "group relative overflow-hidden h-full flex flex-col",
                      "bg-card/50 backdrop-blur-sm rounded-2xl border transition-all duration-300",
                      "hover:shadow-xl hover:shadow-primary/5",
                      typeConfig.borderColor,
                    )}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      {achievement.image ? (
                        <>
                          <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70" />

                          {/* Zoom Overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoveredCard === achievement.id ? 1 : 0,
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm cursor-pointer"
                            onClick={() =>
                              setFullScreenImage({
                                url: achievement.image!,
                                title: achievement.title,
                              })
                            }
                          >
                            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                              <ZoomIn className="w-7 h-7 text-primary" />
                            </div>
                          </motion.div>
                        </>
                      ) : (
                        <div
                          className={cn(
                            "w-full h-full flex items-center justify-center",
                            "bg-gradient-to-br",
                            typeConfig.gradient,
                          )}
                        >
                          <TypeIcon
                            className={cn(
                              "w-16 h-16 opacity-30",
                              typeConfig.iconColor,
                            )}
                          />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={cn(
                            "backdrop-blur-md border flex items-center gap-1.5 shadow-lg",
                            typeConfig.bgColor,
                            typeConfig.iconColor,
                            typeConfig.borderColor,
                          )}
                        >
                          <TypeIcon className="w-3.5 h-3.5" />
                          <span className="capitalize font-semibold">
                            {achievement.type}
                          </span>
                        </Badge>
                      </div>

                      {/* Prize Badge */}
                      {achievement.prize && (
                        <div className="absolute top-3 right-3">
                          <Badge className="backdrop-blur-md bg-primary/90 text-white border-primary/50 shadow-lg">
                            <Trophy className="w-3 h-3 mr-1" />
                            {achievement.prize}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-5 space-y-3">
                      <div>
                        <h3 className="text-base md:text-lg font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium">
                          {achievement.issuer}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{achievement.date}</span>
                        </div>
                        {achievement.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            <span>{achievement.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {achievement.description}
                      </p>

                      {/* Skills */}
                      <div className="flex-1 flex items-end">
                        <div className="flex flex-wrap gap-1.5">
                          {achievement.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-[10px] bg-secondary/50 hover:bg-secondary transition-colors px-2 py-0.5"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      {achievement.credentialUrl && (
                        <div className="pt-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="w-full group/btn"
                          >
                            <a
                              href={achievement.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="flex items-center gap-2">
                                Verify Credential
                                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                              </span>
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
              <Award className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No achievements to show
            </h3>
            <p className="text-muted-foreground mb-6">
              No{" "}
              {activeFilter !== "all" &&
                categoryConfig[activeFilter].label.toLowerCase()}{" "}
              to display.
            </p>
            <Button variant="outline" onClick={() => setActiveFilter("all")}>
              View all
            </Button>
          </motion.div>
        )}
      </div>

      {/* Full Screen Image Dialog */}
      <Dialog
        open={!!fullScreenImage}
        onOpenChange={(open) => !open && setFullScreenImage(null)}
      >
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 backdrop-blur-xl border-none overflow-hidden [&>button]:hidden">
          {fullScreenImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Top gradient — visual only */}
              <div
                aria-hidden
                className="absolute top-0 inset-x-0 h-24 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none"
              />

              {/* Top-left meta */}
              <div className="absolute top-3 md:top-4 left-4 md:left-6 z-30">
                <span className="shrink-0 text-xs font-mono text-white/80 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
                  Certificate
                </span>
              </div>

              {/* Top-right close — always visible */}
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                onClick={() => setFullScreenImage(null)}
                type="button"
                className="group absolute top-3 md:top-4 right-4 md:right-6 z-[60] inline-flex items-center gap-2 h-11 min-w-[44px] px-3 md:px-4 rounded-full text-white font-semibold text-sm bg-red-500/90 hover:bg-red-600 border-2 border-white/70 hover:border-white backdrop-blur-md shadow-2xl shadow-black/50 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black ring-2 ring-white/10"
                aria-label="Close viewer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 transition-transform group-hover:rotate-90" strokeWidth={2.5} />
                <span className="hidden md:inline">Close</span>
                <span className="hidden md:inline text-[10px] font-mono opacity-80 px-1.5 py-0.5 rounded bg-black/30 border border-white/30">
                  Esc
                </span>
              </motion.button>

              <div className="flex flex-col items-center justify-center gap-6 px-4 py-20 md:px-8 md:py-24 w-full h-full">
                <div className="flex items-center justify-center w-full h-full max-w-[95vw] max-h-[calc(100vh-10rem)]">
                  <img
                    src={fullScreenImage.url}
                    alt={fullScreenImage.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                </div>
                {fullScreenImage.title && (
                  <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 max-w-[90vw]">
                    <p className="text-sm md:text-base text-white font-medium text-center truncate">
                      {fullScreenImage.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
