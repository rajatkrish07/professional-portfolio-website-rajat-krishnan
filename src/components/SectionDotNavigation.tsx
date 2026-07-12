import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface SectionDotNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'about', label: 'About' },
  { id: 'company', label: 'Experience' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' }
];

export default function SectionDotNavigation({ activeSection, onNavigate }: SectionDotNavigationProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <nav 
      id="desktop-dot-navigation" 
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-5 z-50 pointer-events-none"
      aria-label="Section Navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <div
            key={section.id}
            className="flex items-center gap-3 group pointer-events-auto cursor-pointer"
            onClick={() => onNavigate(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Elegant Tooltip */}
            <AnimatePresence>
              {hoveredSection === section.id && (
                <motion.span
                  initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="px-3 py-1 text-xs font-medium tracking-wide text-white bg-slate-900/90 rounded-md shadow-lg border border-slate-800 backdrop-blur-xs select-none"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot Indicator */}
            <div className="relative flex items-center justify-center w-5 h-5">
              {/* Active Outer Ring */}
              {isActive && (
                <motion.div
                  layoutId="activeDotRing"
                  className="absolute inset-0 rounded-full border border-primary-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Inner Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0.75,
                  backgroundColor: isActive ? 'var(--color-primary-accent, #3b82f6)' : 'rgb(148, 163, 184)'
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 group-hover:bg-primary-accent`}
              />
            </div>
          </div>
        );
      })}
    </nav>
  );
}
