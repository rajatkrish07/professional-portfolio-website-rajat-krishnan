import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import useDocumentMetadata from './hooks/useDocumentMetadata';
import SectionDotNavigation from './components/SectionDotNavigation';
import BackToTop from './components/BackToTop';

// Lazy-load all heavy below-the-fold sections and modals
const EngineeringJourney = lazy(() => import('./components/EngineeringJourney'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

// High-fidelity, zero-CLS skeletal fallbacks matching each section's visual layout and padding
const JourneySkeleton = () => (
  <section className="py-14 sm:py-24 bg-primary-bg border-b border-border-subtle animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded w-32 mb-3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800/60 rounded w-1/2 sm:w-1/3 mb-6" />
      <div className="h-6 bg-slate-200 dark:bg-slate-800/40 rounded w-2/3 sm:w-1/2 mb-12" />
      <div className="h-72 bg-slate-100 dark:bg-slate-900/40 rounded-2xl w-full" />
    </div>
  </section>
);

const AboutSkeleton = () => (
  <section className="py-14 sm:py-24 bg-secondary-bg border-y border-border-subtle animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded w-32 mb-3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800/60 rounded w-1/2 sm:w-1/3 mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-48 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
          <div className="h-32 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
        </div>
        <div className="lg:col-span-5 h-80 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
      </div>
    </div>
  </section>
);

const ExperienceSkeleton = () => (
  <section className="py-14 sm:py-24 bg-primary-bg animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded w-32 mb-3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800/60 rounded w-1/2 sm:w-1/3 mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 h-96 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
        <div className="lg:col-span-5 h-80 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
      </div>
    </div>
  </section>
);

const TechStackSkeleton = () => (
  <section className="py-14 sm:py-24 bg-secondary-bg border-y border-border-subtle animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded w-32 mb-3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800/60 rounded w-1/2 sm:w-1/3 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSkeleton = () => (
  <section className="py-14 sm:py-24 bg-primary-bg animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/60 rounded w-32 mb-3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800/60 rounded w-1/2 sm:w-1/3 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-slate-100 dark:bg-slate-900/40 rounded-xl w-full" />
        ))}
      </div>
    </div>
  </section>
);

// Progressive mounting wrapper leveraging IntersectionObserver
interface LazySectionProps {
  id: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

function LazySection({ id, fallback, children }: LazySectionProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isIntersected) return;

    // Trigger pre-rendering of component 250px before entering viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
        }
      },
      {
        root: null,
        rootMargin: '250px 0px 250px 0px',
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isIntersected]);

  return (
    <div id={isIntersected ? `${id}-lazy-wrapper` : id} ref={ref} className="w-full">
      <Suspense fallback={fallback}>
        {isIntersected ? children : fallback}
      </Suspense>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Dynamically update document title and SEO meta tags based on the active section
  useDocumentMetadata(activeSection);

  // Handle smooth scroll when navigating from navbar
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section using highly performant IntersectionObserver to eliminate layout thrashing
  useEffect(() => {
    const sections = ['home', 'journey', 'about', 'company', 'tech-stack', 'projects'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="app-root-container" className="bg-primary-bg min-h-screen text-text-primary selection:bg-primary-accent/30 selection:text-text-primary font-sans">
      {/* Sticky header navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} onViewResume={() => setIsResumeOpen(true)} />
      
      {/* Floating progress indicator dots */}
      <SectionDotNavigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Modular page sections */}
      <main id="main-content">
        <Hero onViewProjects={() => handleNavigate('projects')} onViewResume={() => setIsResumeOpen(true)} />
        
        <LazySection id="journey" fallback={<JourneySkeleton />}>
          <EngineeringJourney />
        </LazySection>

        <LazySection id="about" fallback={<AboutSkeleton />}>
          <About />
        </LazySection>

        <LazySection id="company" fallback={<ExperienceSkeleton />}>
          <Experience />
        </LazySection>

        <LazySection id="tech-stack" fallback={<TechStackSkeleton />}>
          <TechStack />
        </LazySection>

        <LazySection id="projects" fallback={<ProjectsSkeleton />}>
          <Projects />
        </LazySection>
      </main>

      {/* Footer information & credentials */}
      <Footer />

      {/* Interactive Resume ATS Viewer and Printer - Eagerly optimized out of initial load */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </Suspense>
      )}

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
