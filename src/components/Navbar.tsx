import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { profileData } from '../data';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onViewResume: () => void;
}

const menuContainerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 25 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -5, 
    transition: { 
      duration: 0.1 
    } 
  }
};

export default function Navbar({ activeSection, onNavigate, onViewResume }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Journey', id: 'journey' },
    { name: 'About', id: 'about' },
    { name: 'Current Company', id: 'company' },
    { name: 'Tech Stack', id: 'tech-stack' },
    { name: 'Projects', id: 'projects' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-bg/85 backdrop-blur-md border-b border-border-subtle shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4">
          {/* Logo / Profile Picture + Name */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="group flex items-center space-x-2.5 sm:space-x-3 text-left cursor-pointer"
          >
            <div className="relative shrink-0 w-11 h-11 md:w-[64px] md:h-[64px] rounded-full overflow-hidden border border-border-subtle/60 group-hover:border-primary-accent/50 transition-all duration-300 shadow-md">
              <img
                src={profileData.profilePicture}
                alt={profileData.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%' height='100%' fill='%230f172a'/%3E%3Ctext x='50%' y='55%' font-family='sans-serif' font-size='32' font-weight='bold' fill='%2338bdf8' text-anchor='middle' dominant-baseline='middle'%3ERK%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="font-sans text-xs xs:text-sm sm:text-base md:text-lg font-medium tracking-tight text-text-primary group-hover:text-primary-accent transition-colors duration-200">
              {profileData.name}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 relative ${
                  activeSection === link.id
                    ? 'text-primary-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            <button
              onClick={onViewResume}
              className="ml-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary-accent/30 bg-primary-accent/5 hover:bg-primary-accent/15 hover:border-primary-accent/50 text-xs font-mono font-semibold text-primary-accent transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" /> Resume
            </button>

            {/* Desktop Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="ml-2 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card-bg/50 border border-border-subtle/40 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -10, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 10, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 text-text-primary" />
                  ) : (
                    <Sun className="w-4 h-4 text-primary-accent" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>

          {/* Social Icons Links (Desktop) */}
          <div id="desktop-socials" className="hidden md:flex items-center space-x-4">
            <a
              id="social-nav-github"
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-text-secondary hover:text-[#24292e] dark:hover:text-white hover:scale-115 transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              id="social-nav-linkedin"
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-text-secondary hover:text-[#0a66c2] hover:scale-115 transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              id="social-nav-email"
              href={`mailto:${profileData.socials.email}`}
              aria-label="Send Email"
              className="text-text-secondary hover:text-[#ea4335] hover:scale-115 transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div id="mobile-menu-btn" className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2 rounded-md hover:bg-card-bg/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-secondary-bg border-b border-border-subtle overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.div key={link.id} variants={menuItemVariants}>
                  <button
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium tracking-wide transition-all ${
                      activeSection === link.id
                        ? 'text-primary-accent bg-card-bg/40 border-l-2 border-primary-accent pl-2'
                        : 'text-text-secondary hover:text-text-primary hover:bg-card-bg/20'
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
              
              <motion.div variants={menuItemVariants}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onViewResume();
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-mono font-semibold tracking-wide text-primary-accent bg-primary-accent/5 border-l-2 border-primary-accent pl-2 hover:bg-primary-accent/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" /> Resume
                </button>
              </motion.div>

              {/* Mobile Theme Toggle Button */}
              <motion.div variants={menuItemVariants}>
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-semibold tracking-wide text-text-primary bg-card-bg/10 hover:bg-card-bg/20 transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'light' ? (
                      <>
                        <Moon className="w-4 h-4 text-text-primary" /> Dark Theme
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4 text-primary-accent" /> Light Theme
                      </>
                    )}
                  </span>
                  <span className="text-xs font-mono text-text-secondary uppercase">
                    {theme}
                  </span>
                </button>
              </motion.div>

              <motion.div variants={menuItemVariants} className="flex items-center justify-center space-x-6 px-3 py-4 border-t border-border-subtle mt-2">
                <a
                  id="mobile-social-github"
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-[#24292e] dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  id="mobile-social-linkedin"
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-[#0a66c2] transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  id="mobile-social-email"
                  href={`mailto:${profileData.socials.email}`}
                  className="text-text-secondary hover:text-[#ea4335] transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  Email
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
