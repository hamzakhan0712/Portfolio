import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Copy,
  Download,
  Phone,
  Globe,
  FileText,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  copyable: boolean;
  gradient: string;
}

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
  gradient: string;
  description: string;
}

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

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

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return;

    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS (only needs to be done once, but safe to call multiple times)
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: "Hamza Khan", // Your name
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you within 24-48 hours.",
        });
        form.reset();
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      label: "Email",
      value: "hamza81khan81@gmail.com",
      href: "mailto:hamza81khan81@gmail.com",
      copyable: true,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 91379 66960",
      href: "tel:+919137966960",
      copyable: true,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, Maharashtra, India",
      href: "https://maps.google.com?q=Mumbai,India",
      copyable: false,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Calendar,
      label: "Availability",
      value: "Open to opportunities",
      href: "#",
      copyable: false,
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/hamzakhan0712",
      gradient: "from-gray-500 to-gray-700",
      description: "View my code repositories",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourprofile",
      gradient: "from-blue-600 to-blue-800",
      description: "Connect professionally",
    },
    {
      name: "Friends Developer's Group",
      icon: Globe,
      url: "https://initcore.vercel.app/",
      gradient: "from-indigo-500 to-purple-600",
      description: "Developer's group website",
    }
  ];

  return (
    <section
      id="contact"
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
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
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
            <MessageSquare className="w-4 h-4 text-primary mr-2" />
            Get In Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Let's Work <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Have a project in mind or looking for a developer? I'm always open to discussing
            new opportunities, creative ideas, or partnerships.
          </motion.p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <Card className="h-max overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <header className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Send Me a Message</h3>
                    <p className="text-muted-foreground">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </header>

                  <form
                    ref={formRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    role="form"
                    aria-label="Contact form"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                          Your Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="contact-name"
                          name="name"
                          placeholder="John Doe"
                          {...form.register("name")}
                          aria-invalid={!!form.formState.errors.name}
                          className={cn(
                            "h-11 transition-all",
                            form.formState.errors.name && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        {form.formState.errors.name && (
                          <p className="text-xs text-red-500 mt-1.5" role="alert">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      >
                        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                          Your Email <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          {...form.register("email")}
                          aria-invalid={!!form.formState.errors.email}
                          className={cn(
                            "h-11 transition-all",
                            form.formState.errors.email && "border-red-500 focus-visible:ring-red-500"
                          )}
                        />
                        {form.formState.errors.email && (
                          <p className="text-xs text-red-500 mt-1.5" role="alert">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
                        Subject <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="contact-subject"
                        name="subject"
                        placeholder="Project Inquiry / Collaboration / Job Opportunity"
                        {...form.register("subject")}
                        aria-invalid={!!form.formState.errors.subject}
                        className={cn(
                          "h-11 transition-all",
                          form.formState.errors.subject && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {form.formState.errors.subject && (
                        <p className="text-xs text-red-500 mt-1.5" role="alert">
                          {form.formState.errors.subject.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell me about your project, requirements, or how we can work together..."
                        rows={6}
                        {...form.register("message")}
                        aria-invalid={!!form.formState.errors.message}
                        className={cn(
                          "resize-none transition-all",
                          form.formState.errors.message && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {form.formState.errors.message && (
                        <p className="text-xs text-red-500 mt-1.5" role="alert">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto px-8 h-11 text-white"
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2" aria-hidden="true">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Download */}
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
                    Quick Download
                  </h3>
                  <Button variant="outline" className="w-full h-11" size="lg" asChild>
                    <a href="/resume.pdf" download rel="noopener" aria-label="Download resume (PDF)">
                      <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                      Download Resume (PDF)
                    </a>
                  </Button>
                </CardContent>
              </Card>

            </motion.div>

            {/* Right Column - Contact Info & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              {/* Contact Methods */}
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={method.label ?? index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={cn(
                            "group relative overflow-hidden rounded-xl border border-border/50",
                            "bg-gradient-to-br transition-all duration-300",
                            method.gradient,
                            "hover:border-primary/50 hover:shadow-md"
                          )}
                        >
                          <div className="flex items-center justify-between p-3.5">
                            <a
                              href={method.href}
                              target={method.href.startsWith("http") ? "_blank" : undefined}
                              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="flex items-center gap-3 flex-1 min-w-0"
                              aria-label={method.label}
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center group-hover:bg-background/70 transition-colors">
                                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                  {method.label}
                                </p>
                                <p className="text-sm font-semibold truncate">{method.value}</p>
                              </div>
                            </a>
                            {method.copyable && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 h-9 w-9 rounded-lg hover:bg-background/70"
                                onClick={() => copyToClipboard(method.value, method.label)}
                                aria-label={`Copy ${method.label}`}
                              >
                                {copiedItem === method.label ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
                                ) : (
                                  <Copy className="h-4 w-4" aria-hidden="true" />
                                )}
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" aria-hidden="true" />
                    Connect With Me
                  </h3>
                  <div className="space-y-3">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.a
                          key={link.name ?? index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                          className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/50 bg-background/30 hover:bg-background/50 hover:border-primary/50 hover:shadow-md transition-all"
                          aria-label={`Open ${link.name}`}
                        >
                          <div
                            className={cn(
                              "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0",
                              "bg-gradient-to-br text-white transition-transform group-hover:scale-110",
                              link.gradient
                            )}
                          >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{link.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{link.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
                        </motion.a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              
            </motion.div>
          </div>


                  
        {/* Response Time Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <p className="text-sm font-medium">
              Average response time: <span className="text-primary">24-48 hours</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;