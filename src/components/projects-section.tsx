import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Folder,
  Filter,
  Server,
  Search,
  LayoutTemplate,
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

type ProjectCategory =
  | "backend"
  | "fullstack"
  | "frontend"
  | "personal"
  | "all";

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
        "Django CRM for running an outbound call-center desk — leads, payments, GST invoices, attendance and a live break monitor.",
      description:
        "A single Django app for a small outbound call-center desk. Leads are imported from CSV or XLSX through a column-mapping screen before anything is written, carry a disposition and free-form sub-disposition, and append to a history table on every change — transfers between agents record who moved what and why. Converted leads become paid customers, and once an admin verifies the record the app renders a GST invoice, converts the amount to words with num2words in Indian numbering, and shells out to wkhtmltopdf via pdfkit to store the PDF. Attendance is derived from the login and logout views rather than a clock-in button, computing effective work time after breaks to decide Present, Half day or Absent. Agents start and stop breaks over a WebSocket and team leaders watch them live on a monitor page. Server-rendered templates throughout — no REST API and no JavaScript framework.",
      tags: [
        "Django 5",
        "PostgreSQL",
        "Django Channels",
        "WebSockets",
        "pdfkit",
        "Pandas",
        "Daphne",
        "Gunicorn",
      ],
      category: "backend",
      imageUrl: "/crm.png",
      githubUrl: "https://github.com/hamzakhan0712/InitCore-CRM-CallCenter",
      urltext: "On-premise deployment",
      featured: true,
    },
    {
      title: "Novem — E-Commerce Intelligence Platform",
      summary:
        "Offline-first desktop BI tool: a Tauri shell over a FastAPI + DuckDB engine that turns Shopify exports into forecasts, segments and recommendations.",
      description:
        "Built for e-commerce owners under $500K/year who cannot afford enterprise BI and have no data scientist — they need answers, not another dashboard. A Tauri (Rust) desktop shell wraps a React + TypeScript client using Ant Design and ECharts, talking to a separately runnable FastAPI engine backed by DuckDB for analytical queries. The engine is where the real work happens: Prophet for demand forecasting, scikit-learn for segmentation, mlxtend for market-basket association rules, the lifetimes library for customer lifetime value, SHAP so a recommendation can explain itself, and TextBlob for review sentiment. Ollama runs a local LLM so summaries never leave the machine. ReportLab generates the exports and APScheduler handles recurring refreshes. GitHub Actions runs the full gate on every push — Ruff lint and format, pytest across Python 3.11 and 3.12, tsc --noEmit, ESLint at zero warnings, Vitest, and a production build.",
      tags: [
        "Tauri",
        "Rust",
        "React",
        "TypeScript",
        "FastAPI",
        "DuckDB",
        "scikit-learn",
        "Prophet",
        "SHAP",
        "Ollama",
        "GitHub Actions",
      ],
      category: "fullstack",
      imageUrl: "/novem.png",
      githubUrl:
        "https://github.com/hamzakhan0712/Novem---E-Commerce-Intelligence-Platform",
      urltext: "Desktop app · Tauri shell + FastAPI engine",
      featured: true,
    },
    {
      title: "QSync — Queue Management (Frontend)",
      summary:
        "React 19 SPA for multi-terminal queue management, with live sync over STOMP/WebSocket and a FastAPI prediction service.",
      description:
        "The client half of a real-time queue management system for multi-terminal environments. React 19 on Vite, TanStack React Query for server state, Zustand for client state, Radix-based shadcn/ui components, a drag-and-drop counter layout via react-dnd and react-grid-layout, Recharts for the analytics views, and react-hook-form with Zod for validation. Live synchronisation runs over STOMP on SockJS so every terminal reflects queue changes without polling. Alongside it I wrote a separate prediction service — a small FastAPI app using scikit-learn and XGBoost to estimate wait times from historical queue data. The Spring Boot API it talks to lives in its own repository, listed next.",
      tags: [
        "React 19",
        "Vite",
        "TanStack Query",
        "Zustand",
        "STOMP / SockJS",
        "FastAPI",
        "XGBoost",
        "Recharts",
      ],
      imageUrl: "/qsync.png",
      category: "fullstack",
      githubUrl: "https://github.com/hamzakhan0712/QSync-Frontend",
      urltext: "Team project · Frontend lead",
      featured: true,
    },
    {
      title: "QSync — Queue Management API (Backend)",
      summary:
        "Spring Boot 3.4 REST API on Java 21 for virtual queues — capacity, waitlists, no-show limits and rejoining rules enforced server-side.",
      description:
        "The service behind QSync. Businesses create queues; customers join by walk-in, QR, online booking or a scheduled slot; staff move people through while the API enforces the rules. Every user type extends a single UserModel with JOINED inheritance, so admins, customers and business owners each get their own table joined on a shared id. Settings cascade — a queue inherits roughly twenty switches from its parent business unless it overrides them, and the resolver copies the business defaults in before validating. Tokens are issued under a ReentrantLock that reads the current maximum from the database, with separate series for normal, emergency and scheduled entries, and queue ordering is computed in Java rather than SQL: emergency first, then normal plus any scheduled entry whose time has arrived, then the rest. Status changes pass through a transition validator that also checks the supplied exit method is permitted by settings. JWT with BCrypt for auth, Hibernate for the schema, springdoc for Swagger UI. Still in progress — the README documents exactly which endpoints and beans are unfinished rather than hiding them.",
      tags: [
        "Java 21",
        "Spring Boot 3.4",
        "Spring Data JPA",
        "Spring Security",
        "PostgreSQL",
        "JWT",
        "Gradle",
        "OpenAPI / Swagger",
      ],
      category: "backend",
      githubUrl: "https://github.com/hamzakhan0712/QSync-Backend",
      urltext: "REST API · work in progress",
    },
    {
      title: "ICTMT 2025 — Conference Website",
      summary:
        "Single-page React 19 site for an international conference at SCOE, with content fully separated from markup.",
      description:
        "The website for ICTMT 2025, the International Conference on Technology and Management for Transformation, organised by Saraswati College of Engineering and held online on 8 April 2025. One scrolling page covering the conference intro, keynote, five paper tracks, key dates, call for papers, fees and committees, with react-scroll navigation between sections rather than routing between pages. Nearly all copy — dates, names, fees, track topics — lives in a single values file exported as plain objects, so preparing the next edition means editing content and not components. Two separate navigations by breakpoint: a sticky desktop bar that turns solid past 50px, and a Radix sheet drawer below the lg breakpoint.",
      tags: [
        "React 19",
        "Vite 6",
        "Tailwind CSS v4",
        "Radix UI",
        "Framer Motion",
        "Swiper",
      ],
      category: "frontend",
      imageUrl: "/ictmt.png",
      liveUrl: "https://ictmt-2025-conference.vercel.app",
      githubUrl: "https://github.com/hamzakhan0712/ICTMT2025-Conference",
      urltext: "ictmt-2025-conference.vercel.app",
    },
    {
      title: "SUSTECH 2025 — Conference Website",
      summary:
        "Static React site for SCOE’s International Conference on Sustainable Technologies.",
      description:
        "Single-page site for SUSTECH 2025, the International Conference on Sustainable Technologies held online on 8 April 2025 and organised by Saraswati College of Engineering. Sections cover the conference overview, the college, four paper tracks, key dates, the call for papers, registration fees and the organising committees. There is no backend — submissions are handled externally through Microsoft CMT, so the site only has to present information and link out. Same content-as-data approach as ICTMT: one values file holds every title, deadline, fee and committee name that the page maps over.",
      tags: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Radix UI",
        "Framer Motion",
        "React Router",
      ],
      category: "frontend",
      imageUrl: "/sustech.jpg",
      githubUrl: "https://github.com/hamzakhan0712/SUSTECH2025-Conference",
      urltext: "Conference site · SCOE",
    },
    {
      title: "FlaskSearch — Elasticsearch Play Catalogue",
      summary:
        "Flask app serving a searchable catalogue of Shakespeare plays over an Elasticsearch index.",
      description:
        "A small Flask app serving a searchable catalogue of 38 Shakespeare plays. The listing pages read from a local JSON file and work with Elasticsearch switched off; search runs a multi_match query across play name, author and characters against an Elasticsearch index, and a modal form POSTs new plays straight into that index. The two data sources are deliberately independent — nothing copies the file into the index at startup — which the README calls out as the thing to understand before running it.",
      tags: ["Python", "Flask", "Elasticsearch", "REST API", "Jinja"],
      category: "personal",
      imageUrl: "/flaskapi.png",
      githubUrl: "https://github.com/hamzakhan0712/FlaskSearch-API",
      urltext: "Search app",
    },
    {
      title: "Customer Shopping Behavior Analysis",
      summary:
        "End-to-end analytics on a 3,900-row retail dataset — pandas ETL into PostgreSQL, ten SQL business questions, Power BI dashboard.",
      description:
        "A complete analytics pass over a 3,900-row consumer shopping dataset of 18 columns. Pandas handles cleaning — including the 37 missing review ratings — before the data is loaded into PostgreSQL, where ten business questions are answered in SQL covering category performance, seasonal patterns, subscription behaviour and spend by demographic. The results are summarised in a Power BI dashboard checked into the repo alongside the notebook, the query file and the raw CSV, so the whole path from raw data to dashboard is reproducible.",
      tags: [
        "Python",
        "Pandas",
        "PostgreSQL",
        "SQL",
        "Power BI",
        "Jupyter",
        "ETL",
      ],
      category: "personal",
      imageUrl: "/customer_analysis.png",
      githubUrl:
        "https://github.com/hamzakhan0712/Customer-Shopping-Behavior-Analysis",
      urltext: "Data analytics pipeline",
    }
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
    frontend: {
      label: "Frontend",
      icon: LayoutTemplate,
      count: projects.filter((p) => p.category === "frontend").length,
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
    frontend: {
      bg: "bg-purple-500/90",
      text: "text-white",
      border: "border-purple-500/30",
      icon: LayoutTemplate,
      label: "Frontend",
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
            {(Object.keys(categoryConfig) as ProjectCategory[])
              .filter((category) => categoryConfig[category].count > 0)
              .map((category) => {
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
              })}
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
