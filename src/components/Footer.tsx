import React, { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { profileData } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <footer id="footer-section" className="bg-secondary-bg border-t border-border-subtle py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer deck */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border-subtle">
          
          {/* Logo & Tagline */}
          <div className="text-center md:text-left flex flex-col sm:flex-row items-center gap-3">
            <img
              src={profileData.profilePicture}
              alt={profileData.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-primary-accent/30 shadow-xs shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%' height='100%' fill='%230f172a'/%3E%3Ctext x='50%' y='55%' font-family='sans-serif' font-size='32' font-weight='bold' fill='%2338bdf8' text-anchor='middle' dominant-baseline='middle'%3ERK%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-display text-sm sm:text-base font-bold text-text-primary tracking-wider block">
                {profileData.name}
              </span>
              <p className="text-xs text-text-secondary max-w-sm">
                Engineering autonomous agents, intelligent workflows, and robust software systems.
              </p>
            </div>
          </div>

          {/* Interactive Copy Email Action */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className="text-[10px] font-mono font-bold text-primary-accent uppercase tracking-wider">
              Direct Contact
            </span>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <a
                href={`mailto:${profileData.socials.email}`}
                className="flex items-center gap-1.5 text-xs font-mono font-semibold text-text-primary hover:text-primary-accent transition-colors"
                title="Send an email"
              >
                <Mail className="w-3.5 h-3.5 text-primary-accent" />
                {profileData.socials.email}
              </a>
              
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
              
              <button
                onClick={handleCopyEmail}
                className="relative p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-text-secondary hover:text-primary-accent transition-colors cursor-pointer group/copy flex items-center justify-center"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                
                {/* Visual Tooltip Confirmation */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -32, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-mono font-bold rounded shadow-md whitespace-nowrap pointer-events-none z-30"
                    >
                      COPIED!
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Social Channels */}
          <div className="flex items-center space-x-3">
            <a
              id="footer-github"
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-text-secondary hover:text-[#24292e] dark:hover:text-white hover:border-[#24292e]/40 dark:hover:border-white/40 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              id="footer-linkedin"
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-text-secondary hover:text-[#0a66c2] hover:border-[#0a66c2]/40 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom copyright and scrolls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[11px] font-mono text-text-secondary/60 text-center sm:text-left">
            &copy; {currentYear} {profileData.name}. All rights reserved. Designed for high impact.
          </p>
          
          <button
            id="back-to-top"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-primary-accent transition-colors py-1 cursor-pointer"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
