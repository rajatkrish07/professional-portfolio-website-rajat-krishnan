import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data';
import ProfileImage from './ProfileImage';

interface FooterProps {
  onViewResume?: () => void;
}

interface NavLinkProps {
  label: string;
  onClick: () => void;
}

function FooterNavLink({ label, onClick }: NavLinkProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group relative text-sm text-white/85 hover:text-white transition-colors duration-200 cursor-pointer py-1 block text-left w-full focus:outline-none"
      >
        <span className="relative z-10 transition-transform duration-300 inline-block group-hover:translate-x-1">
          {label}
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white/90 transition-all duration-300 group-hover:w-1/2" />
      </button>
    </li>
  );
}

export default function Footer({ onViewResume }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="footer-section"
      className="text-white py-16 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 65%), #1D4ED8'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8 pb-12 border-b border-white/12">
          
          {/* Column 1: Profile (Spans 4 columns on large, stacked on mobile) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <ProfileImage
                className="w-13 h-13 rounded-full object-cover border border-white/20 hover:border-white/45 shadow-sm hover:scale-105 transition-all duration-300 shrink-0"
              />
              <div className="space-y-0.5">
                <span className="font-display text-lg sm:text-xl font-bold text-white tracking-tight block">
                  {profileData.name}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-200 font-bold block">
                  AI Engineer (Aspiring)
                </span>
              </div>
            </div>
            <p className="text-sm text-white/85 leading-relaxed max-w-sm">
              {profileData.oneLiner}
            </p>
          </div>

          {/* Column 2: Navigation (Spans 3 columns on large) */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold block mb-4 border-b border-white/12 pb-2">
              Navigation
            </span>
            <ul className="space-y-2.5">
              <FooterNavLink label="Home" onClick={() => handleScrollTo('home')} />
              <FooterNavLink label="About" onClick={() => handleScrollTo('about')} />
              <FooterNavLink label="Experience" onClick={() => handleScrollTo('company')} />
              <FooterNavLink label="Projects" onClick={() => handleScrollTo('projects')} />
              <FooterNavLink label="Engineering Evolution" onClick={() => handleScrollTo('journey')} />
              <li>
                <button
                  onClick={onViewResume}
                  className="group relative text-sm text-white/85 hover:text-white transition-colors duration-200 cursor-pointer py-1 block text-left w-full focus:outline-none"
                >
                  <span className="relative z-10 transition-transform duration-300 inline-block group-hover:translate-x-1">
                    Resume
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white/90 transition-all duration-300 group-hover:w-1/2" />
                </button>
              </li>
              <FooterNavLink label="Contact" onClick={() => handleScrollTo('footer-section')} />
            </ul>
          </div>

          {/* Column 3: Connect (Spans 2 columns on large) */}
          <div className="lg:col-span-2">
            <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold block mb-4 border-b border-white/12 pb-2">
              Connect
            </span>
            <ul className="space-y-3.5">
              <li>
                <a
                  id="footer-github"
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/85 hover:text-white transition-colors duration-200 py-1"
                >
                  <Github className="w-4.5 h-4.5 text-white/85 group-hover:text-white transition-colors duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">GitHub</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-linkedin"
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/85 hover:text-white transition-colors duration-200 py-1"
                >
                  <Linkedin className="w-4.5 h-4.5 text-white/85 group-hover:text-white transition-colors duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-email"
                  href={`mailto:${profileData.socials.email}`}
                  className="group flex items-center gap-3 text-sm text-white/85 hover:text-white transition-colors duration-200 py-1"
                >
                  <Mail className="w-4.5 h-4.5 text-white/85 group-hover:text-white transition-colors duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Email</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources (Spans 3 columns on large) */}
          <div className="lg:col-span-3 flex flex-col space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold block mb-4 border-b border-white/12 pb-2">
                Resources
              </span>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={onViewResume}
                    className="group flex items-center gap-1.5 text-sm text-white/85 hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    <span>Download Resume</span>
                    <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/rajatkrish07?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-white/85 hover:text-white transition-colors duration-200 text-left"
                  >
                    <span>View GitHub Projects</span>
                    <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Current Focus Metadata Micro-Card */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/12 rounded-xl p-4.5 shadow-sm max-w-xs hover:border-white/20 transition-colors duration-300">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-100 block font-bold">
                Current Focus
              </span>
              <span className="text-[14px] font-semibold text-white block mt-1">
                AI & Systems Engineering
              </span>
              <span className="text-xs text-white/85 block mt-0.5">
                Autonomous Agents • Ingestion
              </span>
              
              {/* Availability pulsing indicator */}
              <div className="flex items-center gap-2 mt-3.5 pt-2.5 border-t border-white/10">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                  Available for Opportunities
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="flex flex-col items-center justify-center gap-4.5 pt-10">
          <p className="text-xs font-mono text-white/75 text-center">
            &copy; {currentYear} {profileData.name}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-mono text-white/60">
            <span>Built with React</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>

          <p className="text-[11px] font-mono text-blue-100 hover:text-white transition-colors duration-200 font-semibold tracking-wide text-center">
            Designed & Engineered by {profileData.name}
          </p>

          <button
            id="back-to-top"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-mono text-white/85 hover:text-white transition-all duration-200 mt-2 py-1 cursor-pointer focus:outline-none"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
}
