import { useEffect, useRef, useState } from "react";
import { ExternalLink, Folder, Filter, Layout, Server, Search, Smartphone, Monitor, Github, Lock, ImageIcon, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type ProjectCategory = "static" | "fullstack" | "mobile" | "desktop" | "all";

type Project = {
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  urltext: string;
  featured?: boolean;
};

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

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


  const projects: Project[] = [
    {
      title: "Key2YourHome",
      description: "A comprehensive full-stack real estate platform built with Django that connects property buyers, sellers, and renters. Features intuitive interface, powerful search capabilities, OAuth authentication, and robust property management tools with Grappelli admin interface.",
      tags: ["Django 5.2.1", "PostgreSQL", "Tailwind CSS", "OAuth", "Grappelli"],
      category: "fullstack",
      imageUrl: "/key2yourhome.png",
      liveUrl: "https://www.key2yourhome.co.in",
      urltext: "www.key2yourhome.co.in",
      featured: true
    },
    {
      title: "SK Trading Co.",
      description: "A modern, high-performance import/export trading website built with Next.js 15 and Turbopack. Features comprehensive SEO optimization, secure reCAPTCHA-protected contact forms, Google Sheets integration, and seamless email handling with Nodemailer.",
      tags: ["Next.js 15", "Turbopack", "Tailwind CSS", "Framer Motion", "Nodemailer", "reCAPTCHA"],
      category: "static",
      imageUrl: "/sktrading.png",
      liveUrl: "https://www.sktradings.in",
      urltext: "www.sktradings.in",
      featured: true
    },
    {
      title: "InitCore",
      description: "A cutting-edge digital solutions company website featuring modern UI/UX design principles. Implemented with performance optimization techniques and smooth animations for enhanced user engagement.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "SSR"],
      category: "static",
      imageUrl: "/initcore.png",
      liveUrl: "https://initcore.in",
      urltext: "www.initcore.in"
    },
    {
      title: "QSync Queue Management",
      description: "Modern responsive queue management SPA with real-time WebSocket updates. Built with React 19 and Vite, featuring Shadcn UI components, React Query for efficient data fetching, and Zustand for state management. Seamlessly integrates with Java Spring Boot backend.",
      tags: ["React 19", "Vite", "WebSocket", "React Query", "Zustand", "Shadcn UI"],
      category: "fullstack",
      imageUrl: "/qsync.png",
      githubUrl: "",
      liveUrl: "",
      urltext: "Full Stack Application (Backend: Java Spring Boot)"
    },
    {
      title: "InitCore CRM CallCenter",
      description: "Production-ready CRM system engineered for call centers with Django Channels for real-time WebSocket communication. Features multi-role access, lead management, payment processing, PDF invoice generation, attendance tracking, and comprehensive analytics dashboard.",
      tags: ["Django", "PostgreSQL", "Django Channels", "WebSocket", "PDF Generation"],
      category: "fullstack",
      imageUrl: "/crm.png",
      githubUrl: "",
      liveUrl: "",
      urltext: "Enterprise Solution (On-premise Deployment)"
    },
    {
      title: "ICTMT Conference 2024",
      description: "Modern conference website for International Conference on Technology, Mathematics, and Teaching built with React 19 and Vite 6. Features smooth Framer Motion animations, Swiper carousels, Radix UI components, and comprehensive event information with responsive design.",
      tags: ["React 19", "Vite 6", "Framer Motion", "Radix UI", "Swiper"],
      category: "static",
      imageUrl: "/ictmt.png",
      githubUrl: "https://github.com/hamzakhan0712/ICTMT2024-Conference.git",
      liveUrl: "",
      urltext: "Conference Website (Source Code Available)"
    },
    {
      title: "Sustainable Technology Conference 2024",
      description: "Comprehensive digital platform for SUSTECH 2024 conference focusing on green technology, AI for sustainability, and sustainable mobility. Built with React and modern web technologies featuring elegant animations and responsive design for academia and industry collaboration.",
      tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Radix UI"],
      category: "static",
      imageUrl: "/sustech.jpg",
      githubUrl: "https://github.com/hamzakhan0712/SUSTECH2024-Conference.git",
      liveUrl: "",
      urltext: "Academic Conference Platform (Open Source)"
    },
    {
      title: "FaceTrack Attendance",
      description: "Cutting-edge Android application leveraging facial recognition with TensorFlow for contactless student attendance tracking. Built with Kotlin for native performance and Django backend, offering both online and offline functionality with ML-powered accurate identification.",
      tags: ["Kotlin", "Django", "TensorFlow", "ML Kit", "Android"],
      category: "mobile",
      imageUrl: "",
      githubUrl: "https://github.com/hamzakhan0712/Face_Recognition_attendance_App.git",
      liveUrl: "",
      urltext: "Enterprise Mobile Application"
    },
    {
      title: "Tariq Perfumes E-Commerce",
      description: "Full-stack perfume retail and wholesale platform with dual pricing models, dynamic product catalog, shopping cart, and order processing. Built with Django and AdminLTE, featuring comprehensive inventory management and responsive design optimized for the fragrance industry.",
      tags: ["Django", "PostgreSQL", "AdminLTE", "JavaScript", "Inventory Management"],
      category: "fullstack",
      imageUrl: "/ecommerce.png",
      githubUrl: "https://github.com/hamzakhan0712/tariq_perfumes.git",
      liveUrl: "",
      urltext: "E-Commerce Platform (Source Code Available)"
    },
    {
      title: "FlaskSearch API",
      description: "Production-ready RESTful API integrating Flask with Elasticsearch for powerful full-text search through Shakespeare plays. Demonstrates best practices with lightning-fast search results, flexible query options, and scalable architecture for handling large datasets and high-traffic scenarios.",
      tags: ["Python 3", "Flask", "Elasticsearch", "REST API", "NoSQL"],
      category: "fullstack",
      imageUrl: "/flaskapi.png",
      githubUrl: "https://github.com/hamzakhan0712/FlaskSearch-API.git",
      liveUrl: "",
      urltext: "RESTful Search API"
    }
  ];


  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch = searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const categoryConfig = {
    all: { label: "All Projects", icon: Filter, count: projects.length },
    static: { label: "Static Websites", icon: Layout, count: projects.filter(p => p.category === "static").length },
    fullstack: { label: "Full Stack", icon: Server, count: projects.filter(p => p.category === "fullstack").length },
    mobile: { label: "Mobile Apps", icon: Smartphone, count: projects.filter(p => p.category === "mobile").length },
    desktop: { label: "Desktop Apps", icon: Monitor, count: projects.filter(p => p.category === "desktop").length },
  };

  const categoryStyles = {
    static: {
      bg: 'bg-blue-500 dark:bg-blue-500',
      text: 'text-white',
      border: 'border-blue-500/20',
      icon: Layout
    },
    fullstack: {
      bg: 'bg-green-500 dark:bg-green-500',
      text: 'text-white',
      border: 'border-green-500/20',
      icon: Server
    },
    mobile: {
      bg: 'bg-purple-500 dark:bg-purple-500',
      text: 'text-white',
      border: 'border-purple-500/20',
      icon: Smartphone
    },
    desktop: {
      bg: 'bg-orange-500 dark:bg-orange-500',
      text: 'text-white',
      border: 'border-orange-500/20',
      icon: Monitor
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-2 overflow-hidden reveal-container">
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
        <div className="text-center mb-16 md:mb-20">
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
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A showcase of my work across web development, mobile apps, and enterprise solutions built with modern technologies and best practices.
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
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(Object.keys(categoryConfig) as ProjectCategory[]).map((category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const isActive = filter === category;

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category)}
                  className={`
                    relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 hover:border-border'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 " />
                    <span >{config.label}</span>
                    <span className={`
                      ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold
                      ${isActive ? 'bg-primary-foreground/20' : 'bg-muted'}
                    `}>
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
                placeholder="Search projects by name, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
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
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {filteredProjects.length === projects.length ? (
              <span>Showing all {projects.length} projects</span>
            ) : (
              <span>
                Found {filteredProjects.length} of {projects.length} projects
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
                const categoryStyle = categoryStyles[project.category as keyof typeof categoryStyles];
                const CategoryIcon = categoryStyle.icon;

                return (
                  <motion.div
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="absolute top-4 left-4 z-20"
                        >
                          <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                            <span className="animate-pulse">⭐</span>
                            Featured
                          </span>
                        </motion.div>
                      )}

                      {/* Project Image */}
                      <CardHeader className="relative p-0 overflow-hidden">
                        {project.imageUrl ? (
                          <div className="aspect-video overflow-hidden bg-muted">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-secondary/30 to-muted/50 flex flex-col items-center justify-center gap-3 p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-primary/50" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground/70">Preview Coming Soon</p>
                              <p className="text-xs text-muted-foreground mt-1">{project.title}</p>
                            </div>
                          </div>
                        )}

                        {/* Category Badge Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`
                            px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border
                            flex items-center gap-1.5 shadow-lg
                            ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}
                          `}>
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {project.category === 'static' && 'Static Site'}
                            {project.category === 'fullstack' && 'Full Stack'}
                            {project.category === 'mobile' && 'Mobile'}
                            {project.category === 'desktop' && 'Desktop'}
                          </span>
                        </div>
                      </CardHeader>

                      {/* Project Content */}
                      <CardContent className="flex-grow p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2 font-serif group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-md bg-secondary/50 text-secondary-foreground border border-border/30 hover:border-border transition-colors"
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
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="default" size="sm" className="w-full group/btn">
                                <span className="flex items-center gap-2">
                                  View Live
                                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </span>
                              </Button>
                            </a>
                          ) : project.githubUrl ? (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full group/btn">
                                <span className="flex items-center gap-2">
                                  <Github className="w-3.5 h-3.5" />
                                  View Code
                                </span>
                              </Button>
                            </a>
                          ) : (
                            <Button variant="outline" size="sm" className="flex-1" disabled>
                              <span className="flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                Private
                              </span>
                            </Button>
                          )}

                          {project.githubUrl && project.liveUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm" className="aspect-square p-0 w-9">
                                <Github className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                        </div>

                        {/* URL Text */}
                        {project.urltext && (
                          <div className="text-xs text-muted-foreground text-center truncate w-full">
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
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query
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
                  Reset Filters
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ProjectsSection;