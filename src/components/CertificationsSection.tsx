import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Award,
  Trophy,
  Code2,
  Calendar,
  MapPin,
  ZoomIn,
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
  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

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

  /** Awards and competitions carry the weight; courses are supporting detail. */
  const recognitions = achievements.filter((a) => a.type !== "certification");
  const certifications = achievements.filter((a) => a.type === "certification");

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
      className="relative overflow-hidden py-14 md:py-20 reveal-container"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          eyebrow="Recognition"
          icon={Trophy}
          align="center"
          title={
            <>
              Awards &amp; certifications
            </>
          }
        >
          National recognitions, competitions, and continuous learning along the way.
        </SectionHeading>

        {/* Recognitions lead — these two are national / institutional and
            carry far more weight than nine online courses, so they get the
            space. The courses follow as a compact, scannable list. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {recognitions.map((achievement, index) => {
            const typeConfig = getTypeConfig(achievement.type);
            const TypeIcon = typeConfig.icon;

            return (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5",
                  typeConfig.borderColor,
                )}
              >
                {achievement.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setFullScreenImage({
                        url: achievement.image!,
                        title: achievement.title,
                      })
                    }
                    className="relative h-44 w-full cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={"View certificate: " + achievement.title}
                  >
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                      <ZoomIn className="h-3.5 w-3.5" />
                      View
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={cn(
                        "flex items-center gap-1.5 border",
                        typeConfig.bgColor,
                        typeConfig.iconColor,
                        typeConfig.borderColor,
                      )}
                    >
                      <TypeIcon className="h-3.5 w-3.5" />
                      <span className="font-semibold capitalize">
                        {achievement.type}
                      </span>
                    </Badge>
                    {achievement.prize && (
                      <Badge className="border-primary/50 bg-primary/90 text-white">
                        <Trophy className="mr-1 h-3 w-3" />
                        {achievement.prize}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-primary md:text-lg">
                      {achievement.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {achievement.issuer}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {achievement.date}
                    </span>
                    {achievement.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        {achievement.location}
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {achievement.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {achievement.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-secondary/50 px-2 py-0.5 text-[10px]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Certifications — compact rows. Same facts, a fraction of the height. */}
        <div className="mt-12">
          <div className="mb-5 flex flex-wrap items-baseline gap-x-3 border-b border-border/50 pb-4">
            <h3 className="text-xl font-bold md:text-2xl">Certifications</h3>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              {certifications.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
            {certifications.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
                className="group flex items-start gap-3 rounded-lg border border-transparent px-3 py-3.5 transition-colors hover:border-border/50 hover:bg-card/40"
              >
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-blue-500/80" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h4 className="text-sm font-semibold leading-snug text-foreground">
                      {achievement.title}
                    </h4>
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {achievement.issuer}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {achievement.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-border/30 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {achievement.image && (
                      <button
                        type="button"
                        onClick={() =>
                          setFullScreenImage({
                            url: achievement.image!,
                            title: achievement.title,
                          })
                        }
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                      >
                        <ZoomIn className="h-3 w-3" />
                        Certificate
                      </button>
                    )}
                    {achievement.credentialUrl && (
                      <a
                        href={achievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
