import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, GraduationCap, Sparkles, Code, Cpu } from 'lucide-react';
import { profileData, timelineEvents } from '../data';
import { usePerformanceConfig } from '../hooks/usePerformanceConfig';

export default function About() {
  const { isLowPerformance } = usePerformanceConfig();

  const getTimelineIcon = (type: 'professional' | 'academic' | 'learning') => {
    switch (type) {
      case 'professional':
        return <Briefcase className="w-4 h-4 text-primary-accent" />;
      case 'learning':
        return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 'academic':
        return <GraduationCap className="w-4 h-4 text-secondary-accent" />;
    }
  };

  return (
    <section id="about" className="py-14 sm:py-24 bg-secondary-bg border-y border-border-subtle relative overflow-hidden">
      {/* Premium subtle layout grid decoration */}
      <div className="absolute inset-0 tech-dot-grid opacity-[0.4] pointer-events-none" />
      
      {/* Soft gradient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-primary-accent/5 rounded-full pointer-events-none blur-[80px]" />
      
      <motion.div
        initial={isLowPerformance ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={isLowPerformance ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={isLowPerformance ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 gpu-layer"
      >
        
        {/* Section Header */}
        <div id="about-section-header" className="text-center sm:text-left mb-10 sm:mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary-accent mb-2">01 // THE SHIFT</p>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Professional Biography
          </h2>
          <div className="h-0.5 w-16 bg-primary-accent mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio and Pillars */}
          <div id="about-content" className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="p-4 sm:p-8 rounded-xl bg-card-bg border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 relative overflow-hidden shadow-xs group">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-primary-accent" />
              
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-5 h-5 text-primary-accent" />
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wide">
                  The Vision & Transition
                </h3>
              </div>
              
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base mb-6 font-sans">
                {profileData.aboutText}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-primary-accent/5 dark:bg-primary-accent/10 border border-primary-accent/10 text-primary-accent text-xs font-mono font-medium">
                  ACTIVE_TRANSITION
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium">
                  SYSTEMS_COGNITION
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 text-secondary-accent dark:text-blue-400 text-xs font-mono font-medium">
                  PARADIGM_EVOLUTION
                </span>
              </div>
            </div>

            {/* Core Strengths Grid */}
            <div id="core-strengths" className="space-y-3.5 sm:space-y-4">
              <h4 className="font-display text-xs sm:text-sm font-semibold text-text-primary flex items-center gap-2 uppercase tracking-wider">
                <Code className="w-4.5 h-4.5 text-secondary-accent" />
                Strategic Competence Pillars
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {profileData.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl bg-card-bg border border-border-subtle hover:border-primary-accent/25 hover:shadow-xs transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-border-subtle group-hover:border-primary-accent/30 transition-colors">
                      <span className="text-[10px] font-mono font-bold text-primary-accent">0{index + 1}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                      {strength}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Timeline */}
          <div id="about-timeline" className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-sm font-bold text-text-primary flex items-center gap-3 uppercase tracking-wider">
              <Award className="w-4.5 h-4.5 text-primary-accent" />
              Career & Integration Timeline
            </h3>

            <div className="relative pl-5 border-l border-border-subtle space-y-5 sm:space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet icon */}
                  <div className="absolute -left-[32px] top-1 w-6 h-6 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center transition-all duration-300 group-hover:border-primary-accent group-hover:scale-105 shadow-xs z-10">
                    {getTimelineIcon(event.type)}
                  </div>

                  {/* Year Tag */}
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-[10px] font-mono text-text-secondary group-hover:text-primary-accent transition-colors border border-border-subtle mb-2 font-medium">
                    {event.year}
                  </span>

                  {/* Card representing step */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-card-bg border border-border-subtle group-hover:border-primary-accent/20 transition-all duration-200 shadow-xs">
                    <h4 className="font-display text-sm font-bold text-text-primary">
                      {event.title}
                    </h4>
                    <p className="text-[11px] font-mono text-primary-accent mt-0.5 uppercase tracking-wider font-semibold">
                      {event.organization}
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed mt-2.5 font-sans">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
