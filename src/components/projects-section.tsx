import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Folder,
  Filter,
  Server,
  Search,
  Monitor,
  Github,
  Lock,
  ImageIcon,
  X,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type ProjectCategory = "backend" | "frontend" | "mobile" | "all";

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
      title: "InitCore CRM - Call Center Platform",
      description:
        "Enterprise CRM engineered for a call center operation. Django Channels for real-time WebSocket communication, multi-role access control, lead management, payment processing, PDF invoice generation, and analytics dashboard.",
      tags: [
        "Django",
        "PostgreSQL",
        "Django Channels",
        "WebSockets",
        "REST API",
        "Python",
      ],
      category: "backend",
      imageUrl: "/crm.png",
      githubUrl: "https://github.com/hamzakhan0712/InitCore-CRM-CallCenter",
      liveUrl: "",
      urltext: "Enterprise Solution (On-premise Deployment)",
      featured: true,
    },
    {
      title: "Key2YourHome - Real Estate Platform",
      description:
        "Backend for a live property listing marketplace. Built the REST API layer, search/filter system, and database schema for 500+ active listings. Query optimization brought API response times down by 45%. OAuth authentication and Grappelli admin interface for real estate agents.",
      tags: ["Django", "PostgreSQL", "REST API", "OAuth", "Python"],
      category: "backend",
      imageUrl: "/key2yourhome.png",
      liveUrl: "https://www.key2yourhome.co.in",
      urltext: "www.key2yourhome.co.in",
      featured: true,
    },
    {
      title: "FlaskSearch API",
      description:
        "RESTful search service using Flask and Elasticsearch for full-text search across Shakespeare's complete works corpus. Supports pagination, filtering, and advanced queries over large document datasets. Designed as a production-deployable standalone microservice with scalable architecture.",
      tags: ["Flask", "Elasticsearch", "Python", "REST API", "NoSQL"],
      category: "backend",
      imageUrl: "/flaskapi.png",
      githubUrl: "https://github.com/hamzakhan0712/FlaskSearch-API",
      liveUrl: "",
      urltext: "RESTful Search Microservice",
      featured: true,
    },
    {
      title: "Tariq Perfumes - E-Commerce Backend",
      description:
        "Full e-commerce backend for a retail/wholesale perfume business. Product catalog, shopping cart, order management, dual pricing models, and an AdminLTE-based dashboard for store operations.",
      tags: [
        "Django",
        "PostgreSQL",
        "JavaScript",
        "Inventory Management",
        "Python",
      ],
      category: "backend",
      imageUrl: "/ecommerce.png",
      githubUrl: "https://github.com/hamzakhan0712/TariqPerfumes-Ecommerce",
      liveUrl: "",
      urltext: "E-Commerce Platform",
    },
    {
      title: "FaceTrack - Attendance System",
      description:
        "Android attendance app with facial recognition. Python ML models run on-device for offline processing, synced to a Django backend. Built for student attendance management in institutional settings.",
      tags: ["Kotlin", "Django", "TensorFlow", "Python", "Android"],
      category: "mobile",
      imageUrl: "",
      githubUrl: "https://github.com/hamzakhan0712/FaceTrack-Attendance",
      liveUrl: "",
      urltext: "Mobile App with Django Backend",
    },
  ];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  const categoryConfig = {
    all: { label: "All Projects", icon: Filter, count: projects.length },
    backend: {
      label: "Backend & APIs",
      icon: Server,
      count: projects.filter((p) => p.category === "backend").length,
    },
    frontend: {
      label: "Frontend & Sites",
      icon: Globe,
      count: projects.filter((p) => p.category === "frontend").length,
    },
    mobile: {
      label: "Mobile Apps",
      icon: Monitor,
      count: projects.filter((p) => p.category === "mobile").length,
    },
  };

  const categoryStyles = {
    backend: {
      bg: "bg-green-500 dark:bg-green-500",
      text: "text-white",
      border: "border-green-500/20",
      icon: Server,
    },
    frontend: {
      bg: "bg-blue-500 dark:bg-blue-500",
      text: "text-white",
      border: "border-blue-500/20",
      icon: Globe,
    },
    mobile: {
      bg: "bg-purple-500 dark:bg-purple-500",
      text: "text-white",
      border: "border-purple-500/20",
      icon: Monitor,
    },
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-2 overflow-hidden reveal-container"
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
            Production systems built for clients: from enterprise CRMs
            processing 1,000+ daily transactions to REST APIs serving live
            traffic.
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
            {(Object.keys(categoryConfig) as ProjectCategory[]).map(
              (category) => {
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
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-secondary/50 hover:bg-secondary text-foreground border border-border/50 hover:border-border"
                    }
                  `}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 " />
                      <span>{config.label}</span>
                      <span
                        className={`
                      ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold
                      ${isActive ? "bg-primary-foreground/20" : "bg-muted"}
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
                const categoryStyle =
                  categoryStyles[
                    project.category as keyof typeof categoryStyles
                  ];
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
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.2,
                          }}
                          className="absolute top-4 left-4 z-20"
                        >
                          <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
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
                              <p className="text-sm font-medium text-foreground/70">
                                Preview Coming Soon
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
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
                            {project.category === "backend" && "Backend & API"}
                            {project.category === "frontend" && "Frontend"}
                            {project.category === "mobile" && "Mobile"}
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
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button
                                variant="default"
                                size="sm"
                                className="w-full group/btn"
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
                              >
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
