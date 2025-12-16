import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Award,
  Trophy,
  Code2,
  Briefcase,
  Calendar,
  MapPin,
  X,
  ZoomIn,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type AchievementType = "certification" | "hackathon" | "internship" | "award";

interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  image: string;
  description: string;
  location?: string;
  prize?: string;
  duration?: string;
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<AchievementType | "all">("all");
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

  const achievements: Achievement[] = [
    {
      id: "1",
      type: "hackathon",
      title: "Smart India Hackathon (SIH) 2025 – Grand Finalist",
      issuer: "Ministry of Education, Government of India",
      date: "December 08–09, 2025",
      prize: "Grand Finalist",
      location: "Biju Patnaik University of Technology (BPUT), Rourkela, Odisha",
      skills: [
        "Problem Solving",
        "Innovation",
        "Team Collaboration",
        "Full-Stack Development",
        "System Design",
        "Time Management",
        "Presentation Skills",
        "Real-World Solution Development"
      ],
      image: "/sih-certificate.jpeg",
      description:
        "Selected as a Grand Finalist in the Smart India Hackathon (SIH) 2025 – Software Edition, a prestigious national-level innovation challenge organized by the Ministry of Education, Government of India. Represented the team at the Grand Finale hosted at Biju Patnaik University of Technology (BPUT), Rourkela, Odisha, where we designed and developed a real-world, scalable solution under strict timelines."
    },

    {
      id: "2",
      type: "award",
      title: "SCOE AVISHKAR 2026 – Project Competition",
      issuer: "Saraswati College of Engineering",
      date: "April 04, 2026",
      prize: "2nd Place",
      location: "Kharghar, Navi Mumbai",
      skills: [
        "Project Leadership",
        "Team Management",
        "Engineering Innovation",
        "Technical Presentation"
      ],
      image: "/award1.jpg",
      description:
        "Secured 2nd place in the SCOE AVISHKAR 2026 Project Competition as Team Leader. Recognized for technical innovation, effective project execution, and leadership in presenting a high-impact engineering solution."
    },

    {
      id: "3",
      type: "certification",
      title: "The Complete Full-Stack Web Development Bootcamp",
      issuer: "Udemy – Dr. Angela Yu",
      date: "November 15, 2025",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Git & GitHub",
        "Frontend Development",
        "Backend Development",
        "Full-Stack Application Development"
      ],
      image: "/certificate3.jpg",
      description:
        "Completed an intensive full-stack web development bootcamp instructed by Dr. Angela Yu. Gained hands-on experience building end-to-end web applications using modern frontend and backend technologies, RESTful APIs, and version control best practices."
    },

    {
      id: "4",
      type: "hackathon",
      title: "CODECRAFTERS 2.0 – Hackathon",
      issuer: "Saraswati College of Engineering",
      date: "March 15–16, 2025",
      prize: "Participant",
      location: "Kharghar, Navi Mumbai",
      skills: [
        "Spring Boot",
        "React",
        "REST API Development",
        "Team Leadership",
        "Problem Solving"
      ],
      image: "/hackathon1.jpg",
      description:
        "Participated in the CODECRAFTERS 2.0 hackathon, representing InitCore. Collaborated with a team to design and develop a digital asset management solution for financial instruments, focusing on backend APIs and frontend integration."
    },

    {
      id: "5",
      type: "certification",
      title: "Introduction to Data Science",
      issuer: "Great Learning",
      date: "October 22, 2025",
      skills: [
        "Data Analysis",
        "Statistics",
        "Python",
        "Data Visualization",
        "Machine Learning Fundamentals"
      ],
      image: "/certificate1.png",
      description:
        "Successfully completed the Introduction to Data Science course from Great Learning. Built a strong foundation in data analysis, statistical concepts, Python programming for data science, and introductory machine learning techniques."
    },

    {
      id: "6",
      type: "certification",
      title: "Certification Programme on Aptitude, Lifeskills & Technical Training",
      issuer: "Saraswati College of Engineering (Facilitated by Campus Credentials)",
      date: "2025",
      skills: [
        "Aptitude & Logical Reasoning",
        "Communication Skills",
        "Soft Skills",
        "Professional Readiness",
        "Technical Fundamentals"
      ],
      image: "/certificate2.png",
      description:
        "Completed a structured training program focused on aptitude development, logical reasoning, communication skills, and technical readiness. The program enhanced professional skills essential for industry and career growth."
    }
  ];


  const categoryConfig = {
    all: { label: "All", icon: Sparkles, count: achievements.length, color: "primary" },
    certification: {
      label: "Certifications",
      icon: Award,
      count: achievements.filter((a) => a.type === "certification").length,
      color: "blue",
    },
    hackathon: {
      label: "Hackathons",
      icon: Code2,
      count: achievements.filter((a) => a.type === "hackathon").length,
      color: "purple",
    },
    internship: {
      label: "Internships",
      icon: Briefcase,
      count: achievements.filter((a) => a.type === "internship").length,
      color: "green",
    },
    award: {
      label: "Awards",
      icon: Trophy,
      count: achievements.filter((a) => a.type === "award").length,
      color: "yellow",
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
      internship: {
        icon: Briefcase,
        gradient: "from-green-500/10 to-emerald-500/10",
        iconColor: "text-green-500",
        borderColor: "border-green-500/30",
        bgColor: "bg-green-500/10",
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
      className="relative py-12 overflow-hidden reveal-container"
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
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm font-medium"
          >
            <Trophy className="w-4 h-4 text-primary mr-2" />
            Professional Milestones
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            My <span className="gradient-text">Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Recognitions, certifications, and experiences that demonstrate my skills and
            dedication to continuous learning.
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
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map(
              (category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                const isActive = activeFilter === category;

                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(category)}
                    className={cn(
                      "relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                      "flex items-center gap-2",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 hover:border-border"
                    )}
                  >
                     <Icon className="w-4 h-4" />
                    <span>{config.label}</span>
                    <span
                      className={cn(
                        "ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold",
                        isActive ? "bg-primary-foreground/20" : "bg-muted"
                      )}
                    >
                      {config.count}
                    </span>
                  </motion.button>
                );
              }
            )}
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      typeConfig.borderColor
                    )}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      {achievement.image ? (
                        <>
                          <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />

                          {/* Zoom Overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoveredCard === achievement.id ? 1 : 0,
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm cursor-pointer"
                            onClick={() =>
                              setFullScreenImage({
                                url: achievement.image,
                                title: achievement.title,
                              })
                            }
                          >
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                              <ZoomIn className="w-8 h-8 text-primary" />
                            </div>
                          </motion.div>
                        </>
                      ) : (
                        <div
                          className={cn(
                            "w-full h-full flex items-center justify-center",
                            "bg-gradient-to-br",
                            typeConfig.gradient
                          )}
                        >
                          <TypeIcon
                            className={cn("w-16 h-16 opacity-30", typeConfig.iconColor)}
                          />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={cn(
                            "backdrop-blur-md border flex items-center gap-1.5 shadow-lg",
                            typeConfig.bgColor,
                            typeConfig.iconColor,
                            typeConfig.borderColor
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
                        <div className="absolute top-4 right-4">
                          <Badge className="backdrop-blur-md bg-primary/90 text-primary-foreground border-primary/50 shadow-lg">
                            <Trophy className="w-3 h-3 mr-1" />
                            {achievement.prize}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6 space-y-4">
                      {/* Title & Issuer */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {achievement.issuer}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{achievement.date}</span>
                        </div>
                        {achievement.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{achievement.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Skills */}
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {achievement.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs bg-secondary/50 hover:bg-secondary transition-colors"
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
            <h3 className="text-xl font-semibold mb-2">No Achievements Found</h3>
            <p className="text-muted-foreground mb-6">
              No {activeFilter !== "all" && categoryConfig[activeFilter].label.toLowerCase()} to
              display yet.
            </p>
            <Button variant="outline" onClick={() => setActiveFilter("all")}>
              View All Achievements
            </Button>
          </motion.div>
        )}
      </div>


      {/* Full Screen Image Dialog */}
      <Dialog
        open={!!fullScreenImage}
        onOpenChange={(open) => !open && setFullScreenImage(null)}
      >
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black/95 backdrop-blur-xl border-none overflow-hidden">
          {fullScreenImage && (
            <div className="relative w-full h-full flex items-center justify-center">
             

              {/* Image Container - Centered */}
              <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-8 md:py-12 w-full h-full">
                {/* Image Wrapper with proper constraints */}
                <div className="flex items-center justify-center w-full h-full max-w-[95vw] max-h-[calc(100vh-8rem)]">
                  <img
                    src={fullScreenImage.url}
                    alt={fullScreenImage.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {/* Caption - Below image */}
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