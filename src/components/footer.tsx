import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Heart, 
  ArrowUp,
  Globe,
  FileText,
  Code,
  Briefcase,
  Send,
  ExternalLink
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/hamzakhan0712", 
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com/in/yourprofile", 
      label: "LinkedIn",
      color: "hover:text-blue-600"
    },
    { 
      icon: Globe, 
      href: "https://initcore.vercel.app/", 
      label: "Friends Developer's Group",
      color: "hover:text-indigo-600"
    },

  ];

  const quickLinks = [
    { name: "Home", to: "hero", icon: Code },
    { name: "About", to: "about", icon: Briefcase },
    { name: "Projects", to: "projects", icon: Globe },
    { name: "Skills", to: "skills", icon: Code },
    { name: "Achievements", to: "achievements", icon: FileText },
    { name: "Contact", to: "contact", icon: Send },
  ];

  const resources = [
    { name: "Resume", href: "/resume.pdf", external: true },
    { name: "Source Code", href: "https://github.com/hamzakhan0712/portfolio", external: true },
 
  ];

  return (
    <footer className="relative bg-background border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 lg:col-span-1"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img 
                    src="/me.jpg" 
                    alt="Hamza Khan" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-2xl font-bold gradient-text">Hamza Khan</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-stack developer passionate about creating innovative digital solutions 
                with modern technologies and clean design principles.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <a 
                    href="mailto:hamza81khan81@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    hamza81khan81@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.to}>
                      <ScrollLink
                        to={link.to}
                        smooth={true}
                        duration={800}
                        offset={-80}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                      >
                        <Icon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        {link.name}
                      </ScrollLink>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold">Resources</h4>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      target={resource.external ? "_blank" : undefined}
                      rel={resource.external ? "noopener noreferrer" : undefined}
                      download={resource.name === "Resume"}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <FileText className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {resource.name}
                      {resource.external && (
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold">Connect</h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background transition-all ${link.color}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{link.label}</span>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>

              {/* Scroll to Top Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="w-full mt-4 group"
              >
                Back to Top
                <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground text-center md:text-left"
            >
              © {currentYear} Hamza Khan. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <p className="text-sm text-muted-foreground flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" /> using 
                <span className="ml-1 font-semibold text-foreground">Vite + TypeScript</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;