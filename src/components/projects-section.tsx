import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Folder,
  Filter,
  Server,
  Search,
  Smartphone,
  Github,
  Lock,
  ImageIcon,
  X,
  Layers,
  FlaskConical,
  Play,
  Images,
  Expand,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import MediaLightbox, { type MediaItem } from "@/components/media-lightbox";

type ProjectCategory = "backend" | "fullstack" | "mobile" | "personal" | "all";

type Project = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  category: Exclude<ProjectCategory, "all">;
  imageUrl?: string;
  media?: MediaItem[];
  liveUrl?: string;
  githubUrl?: string;
  urltext: string;
  featured?: boolean;
};

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxState, setLightboxState] = useState<{
    open: boolean;
    items: MediaItem[];
    title: string;
    startIndex: number;
  }>({ open: false, items: [], title: "", startIndex: 0 });

  const openLightbox = (
    items: MediaItem[],
    title: string,
    startIndex = 0,
  ) => {
    if (items.length === 0) return;
    setLightboxState({ open: true, items, title, startIndex });
  };

  const closeLightbox = () =>
    setLightboxState((s) => ({ ...s, open: false }));

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

  const projects: Project[] = [
    {
      title: "InitCore CRM — Call Center Platform",
      summary:
        "Multi-role CRM with real-time agent monitoring for call center operations.",
      description:
        "A multi-role CRM built with Django and PostgreSQL for call center operations. Three permission levels — agents, supervisors, and administrators — each with their own dashboards and workflows. Modules include lead management, call logging, payment tracking, attendance, and PDF invoice generation. Real-time agent monitoring is built with Django Channels and WebSockets, so supervisors see live status updates without refreshing.",
      tags: [
        "Python",
        "Django",
        "Django Channels",
        "PostgreSQL",
        "WebSockets",
        "ReportLab",
      ],
      category: "backend",
      imageUrl: "/crm.png",
      githubUrl: "https://github.com/hamzakhan0712/InitCore-CRM-CallCenter",
      urltext: "On-premise deployment",
      featured: true,
    },
    {
      title: "Key2YourHome — Real Estate Marketplace",
      summary:
        "Live property listing platform with OAuth authentication and admin tooling.",
      description:
        "Live property listing platform built with Django 5.2 and PostgreSQL, deployed to a custom domain. Features OAuth-based authentication, a Grappelli-powered admin interface for managing listings, property search and filtering, and a Tailwind CSS frontend. Running in production since I shipped it — the project that most shaped how I think about admin tooling.",
      tags: [
        "Python",
        "Django 5.2",
        "PostgreSQL",
        "Tailwind CSS",
        "OAuth",
        "Grappelli",
      ],
      category: "backend",
      imageUrl: "/key2yourhome.png",
      liveUrl: "https://www.key2yourhome.net",
      urltext: "key2yourhome.net",
      featured: true,
    },
    {
      title: "Novem — E-Commerce Intelligence Platform",
      summary:
        "Desktop BI tool that turns raw Shopify exports into inventory, pricing, and marketing answers for small store owners.",
      description:
        "An offline-first desktop application aimed at e-commerce store owners under $500K/year who can't afford enterprise BI tools or in-house data scientists. A Tauri + React shell wraps a Python analytics engine that ingests Shopify exports and surfaces decisions — what to restock, where to adjust pricing, which channels are working — rather than just charts. Architecture is split into a TypeScript desktop client and a separately runnable Python engine so the analytics layer stays scriptable.",
      tags: [
        "Tauri",
        "React",
        "TypeScript",
        "Vite",
        "Python",
        "Pandas",
      ],
      category: "fullstack",
      imageUrl: "/novem.png",
      githubUrl:
        "https://github.com/hamzakhan0712/Novem---E-Commerce-Intelligence-Platform",
      urltext: "Desktop app · Tauri + Python engine",
      featured: true,
    },
    {
      title: "SK Trading Co. — Corporate Website",
      summary:
        "Next.js 15 corporate site for an import/export business with form automation.",
      description:
        "Corporate website for an import and export business. Next.js 15 and Tailwind CSS, with smooth Framer Motion transitions across pages. reCAPTCHA-protected contact forms feed into Google Sheets via the Sheets API for the client's internal tracking, and Nodemailer handles automated email replies — a clean inbox of inquiries plus a sortable spreadsheet, no third-party CRM.",
      tags: [
        "Next.js 15",
        "Tailwind CSS",
        "Framer Motion",
        "Nodemailer",
        "Google Sheets API",
      ],
      category: "fullstack",
      imageUrl: "/sktrading.png",
      liveUrl: "https://www.sktradings.in",
      githubUrl: "https://github.com/hamzakhan0712/SKTrading-Website",
      urltext: "sktradings.in",
      featured: true,
    },
    {
      title: "FlaskSearch — REST Search API",
      summary:
        "Containerized Flask + Elasticsearch microservice for full-text search.",
      description:
        "A Flask and Elasticsearch microservice that exposes full-text search over the complete Shakespeare plays corpus. Supports filtering, pagination, and query parameters via clean REST endpoints. Containerized with Docker — single command to spin up the API and the Elasticsearch node together.",
      tags: ["Python", "Flask", "Elasticsearch", "Docker", "REST API"],
      category: "personal",
      imageUrl: "/flaskapi.png",
      githubUrl: "https://github.com/hamzakhan0712/FlaskSearch-API",
      urltext: "Microservice",
    },
    {
      title: "FaceTrack — Android Attendance",
      summary:
        "Kotlin Android app with on-device face recognition syncing to a Django backend.",
      description:
        "An Android attendance app that uses a facial recognition model to identify students. Kotlin on Android, with a Python ML model for face matching. Attendance records sync from the device to a Django backend over REST. The project pushed me into ML inference on mobile, model size constraints, and offline-first sync patterns.",
      tags: ["Kotlin", "Android Studio", "Python", "TensorFlow", "Django"],
      category: "mobile",
      githubUrl: "https://github.com/hamzakhan0712/FaceTrack-Attendance",
      urltext: "Mobile + Django backend",
    },
    {
      title: "Customer Shopping Behavior Analysis",
      summary:
        "End-to-end retail data pipeline — Python ETL, SQL queries, and Power BI dashboards.",
      description:
        "A data engineering project analyzing retail customer shopping behavior end-to-end. Python handles ingestion and ETL, SQL drives the analytical queries, and Power BI dashboards present the segmentation and trends. Includes data quality validation at each stage so dashboards don't surface stale or malformed records — the kind of pipeline hygiene most ad-hoc analysis projects skip.",
      tags: ["Python", "Pandas", "SQL", "Power BI", "ETL", "Jupyter"],
      category: "personal",
      imageUrl: "/customer_analysis.png",
      githubUrl:
        "https://github.com/hamzakhan0712/Customer-Shopping-Behavior-Analysis",
      urltext: "Data engineering pipeline",
    },
    {
      title: "QSync — Real-Time Queue Management",
      summary: "React 19 SPA for queue management with WebSocket-based live sync.",
      description:
        "Team project: a real-time queue management SPA for multi-terminal environments. I built the React frontend — React 19 with Vite, React Query for server state, Zustand for client state, and Shadcn UI components — with WebSocket-based live synchronization. The Spring Boot backend was developed by a teammate; first project where I stepped fully into a frontend lead role.",
      tags: [
        "React 19",
        "Vite",
        "WebSocket",
        "React Query",
        "Zustand",
        "Shadcn UI",
      ],
      imageUrl: "/qsync.png",
      category: "fullstack",
      urltext: "Team project · Frontend lead",
    },
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  const categoryConfig = {
    all: { label: "All", icon: Filter, count: projects.length },
    backend: {
      label: "Backend",
      icon: Server,
      count: projects.filter((p) => p.category === "backend").length,
    },
    fullstack: {
      label: "Full-Stack",
      icon: Layers,
      count: projects.filter((p) => p.category === "fullstack").length,
    },
    mobile: {
      label: "Mobile",
      icon: Smartphone,
      count: projects.filter((p) => p.category === "mobile").length,
    },
    personal: {
      label: "Personal",
      icon: FlaskConical,
      count: projects.filter((p) => p.category === "personal").length,
    },
  };

  const categoryStyles = {
    backend: {
      bg: "bg-green-500/90",
      text: "text-white",
      border: "border-green-500/30",
      icon: Server,
      label: "Backend",
    },
    fullstack: {
      bg: "bg-blue-500/90",
      text: "text-white",
      border: "border-blue-500/30",
      icon: Layers,
      label: "Full-Stack",
    },
    mobile: {
      bg: "bg-purple-500/90",
      text: "text-white",
      border: "border-purple-500/30",
      icon: Smartphone,
      label: "Mobile",
    },
    personal: {
      bg: "bg-orange-500/90",
      text: "text-white",
      border: "border-orange-500/30",
      icon: FlaskConical,
      label: "Personal",
    },
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden reveal-container"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
            <Folder className="w-4 h-4 text-primary mr-2" />
            Portfolio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Production systems built for paying clients and selected personal
            work.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-6">
            {(Object.keys(categoryConfig) as ProjectCategory[]).map(
              (category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                const isActive = filter === category;

                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setFilter(category)}
                    className={`
                    relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 hover:border-border"
                    }
                  `}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{config.label}</span>
                      <span
                        className={`
                      ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold
                      ${isActive ? "bg-white/20" : "bg-muted"}
                    `}
                      >
                        {config.count}
                      </span>
                    </span>
                  </motion.button>
                );
              },
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-20" />
              <input
                type="text"
                placeholder="Search by name, tech, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mt-4 text-xs text-muted-foreground">
            {filteredProjects.length === projects.length ? (
              <span>Showing all {projects.length} projects</span>
            ) : (
              <span>
                {filteredProjects.length} of {projects.length} projects
              </span>
            )}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => {
                const categoryStyle = categoryStyles[project.category];
                const CategoryIcon = categoryStyle.icon;
                const projectMedia: MediaItem[] = (() => {
                  if (project.media && project.media.length > 0)
                    return project.media;
                  if (project.imageUrl)
                    return [
                      {
                        type: "image" as const,
                        src: project.imageUrl,
                        alt: project.title,
                      },
                    ];
                  return [];
                })();
                const hasMedia = projectMedia.length > 0;
                const mediaCount = projectMedia.length;
                const hasVideo = projectMedia.some((m) => m.type === "video");
                const coverMedia = projectMedia[0];

                return (
                  <motion.div
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.2,
                          }}
                          className="absolute top-4 left-4 z-20"
                        >
                          <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                            Featured
                          </span>
                        </motion.div>
                      )}

                      {/* Project Image / Media */}
                      <CardHeader className="relative p-0 overflow-hidden">
                        {hasMedia && coverMedia ? (
                          <button
                            type="button"
                            onClick={() =>
                              openLightbox(projectMedia, project.title, 0)
                            }
                            className="relative block w-full aspect-video overflow-hidden bg-muted cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                            aria-label={`Open media viewer for ${project.title}`}
                          >
                            {coverMedia.type === "image" ? (
                              <img
                                src={coverMedia.src}
                                alt={coverMedia.alt || project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = "none";
                                }}
                              />
                            ) : (
                              <>
                                {coverMedia.poster ? (
                                  <img
                                    src={coverMedia.poster}
                                    alt={coverMedia.alt || project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                  />
                                ) : (
                                  <video
                                    src={coverMedia.src}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-white ml-0.5" />
                                  </span>
                                </div>
                              </>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Expand hint */}
                            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Expand className="w-3 h-3" />
                              View
                            </div>

                            {/* Media count badge */}
                            {(mediaCount > 1 || hasVideo) && (
                              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white">
                                {hasVideo && mediaCount === 1 ? (
                                  <>
                                    <Play className="w-3 h-3" />
                                    Video
                                  </>
                                ) : (
                                  <>
                                    <Images className="w-3 h-3" />
                                    {mediaCount}
                                  </>
                                )}
                              </div>
                            )}
                          </button>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-secondary/30 to-muted/50 flex flex-col items-center justify-center gap-3 p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-primary/50" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground/70">
                                {project.title}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Category Badge Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                          <span
                            className={`
                            px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border
                            flex items-center gap-1.5 shadow-lg
                            ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}
                          `}
                          >
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {categoryStyle.label}
                          </span>
                        </div>
                      </CardHeader>

                      {/* Project Content */}
                      <CardContent className="flex-grow p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-foreground/80 mb-2">
                            {project.summary}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/50 text-secondary-foreground border border-border/30 hover:border-border transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>

                      {/* Project Footer */}
                      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                        {/* Action Buttons */}
                        <div className="flex gap-2 w-full">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button
                                variant="default"
                                size="sm"
                                className="w-full group/btn text-white"
                              >
                                <span className="flex items-center gap-2">
                                  View Live
                                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </span>
                              </Button>
                            </a>
                          ) : project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full group/btn"
                              >
                                <span className="flex items-center gap-2">
                                  <Github className="w-3.5 h-3.5" />
                                  View Code
                                </span>
                              </Button>
                            </a>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              disabled
                            >
                              <span className="flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                Private
                              </span>
                            </Button>
                          )}

                          {project.githubUrl && project.liveUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="aspect-square p-0 w-9"
                                aria-label="View source on GitHub"
                              >
                                <Github className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                        </div>

                        {/* URL Text */}
                        {project.urltext && (
                          <div className="text-[11px] text-muted-foreground text-center truncate w-full font-mono">
                            {project.urltext}
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
                <Search className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilter("all");
                  setSearchQuery("");
                }}
                className="group"
              >
                <span className="flex items-center gap-2">
                  Reset filters
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Media Lightbox (mounted once, reused) */}
      <MediaLightbox
        open={lightboxState.open}
        onClose={closeLightbox}
        items={lightboxState.items}
        title={lightboxState.title}
        startIndex={lightboxState.startIndex}
      />
    </section>
  );
}

export default ProjectsSection;
