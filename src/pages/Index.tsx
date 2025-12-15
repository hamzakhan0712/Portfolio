import { useEffect, lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { Background } from "@/components/background";
import { CustomCursor } from "@/components/custom-cursor";
import { Loader2 } from "lucide-react";

// Lazy load larger components to improve initial load performance
const AboutSection = lazy(() => import("@/components/about-section"));
const ProjectsSection = lazy(() => import("@/components/projects-section"));
const SkillsSection = lazy(() => import("@/components/skills-section"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

// Professional loading component
const SectionLoader = ({ fullHeight = true }: { fullHeight?: boolean }) => (
  <div className={`${fullHeight ? 'min-h-screen' : 'h-40'} flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300`}>
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </div>
);

const Index = () => {
  // Initialize scroll reveal observer with improved configuration
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Optional: Unobserve after reveal for better performance
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
      }
    );

    // Select all elements with the reveal-content class
    const revealElements = document.querySelectorAll('.reveal-content');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen transition-theme relative overflow-hidden">
      {/* Global background that stays consistent across all sections */}
      <div className="fixed inset-0 w-full h-full -z-30">
        <Background />
      </div>

      {/* Custom cursor - Uncomment when ready */}
      {/* <CustomCursor /> */}

      {/* Navigation - Always visible */}
      <Navbar />
      
      {/* Hero Section - Immediate load for LCP optimization */}
      <HeroSection />

      {/* Main Content Sections with optimized lazy loading */}
      <main className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <CertificationsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<SectionLoader fullHeight={false} />}>
        <Footer />
      </Suspense>

      {/* Scroll to top button - Optional enhancement */}
      <ScrollToTop />
    </div>
  );
};

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 animate-in fade-in slide-in-from-bottom-4"
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  ) : null;
};

export default Index;