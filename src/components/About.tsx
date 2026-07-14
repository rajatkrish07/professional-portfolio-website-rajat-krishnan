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
        initial={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div id="about-section-header" className="text-center sm:text-left mb-12 sm:mb-20">
          <p className="text-section-subtitle mb-3">01 // THE SHIFT</p>
          <h2 className="text-section-title">
            Professional Biography
          </h2>
          <div className="h-[3px] w-20 bg-primary-accent mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio and Pillars */}
          <div id="about-content" className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-card-bg border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 relative overflow-hidden shadow-xs group">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-primary-accent" />
              
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-primary-accent" />
                <h3 className="card-title-comfortable uppercase tracking-wide">
                  The Vision & Transition
                </h3>
              </div>
              
              <p className="text-body-comfortable mb-6 leading-relaxed">
                {profileData.aboutText}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-primary-accent/5 dark:bg-primary-accent/10 border border-primary-accent/10 text-primary-accent text-xs sm:text-sm font-mono font-bold">
                  ACTIVE_TRANSITION
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-mono font-bold">
                  SYSTEMS_COGNITION
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-light-surface/40 dark:bg-light-surface border border-primary-accent/20 dark:border-primary-accent/30 text-primary-accent text-xs sm:text-sm font-mono font-bold">
                  PARADIGM_EVOLUTION
                </span>
              </div>
            </div>

            {/* Core Strengths Grid */}
            <div id="core-strengths" className="space-y-4 sm:space-y-6">
              <h4 className="font-display text-base sm:text-lg lg:text-xl font-bold text-text-primary flex items-center gap-2.5 uppercase tracking-wider">
                <Code className="w-5 h-5 text-secondary-accent" />
                Strategic Competence Pillars
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {profileData.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-card-bg border border-border-subtle hover:border-primary-accent/25 hover:shadow-xs transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-border-subtle group-hover:border-primary-accent/30 transition-colors shrink-0">
                      <span className="text-xs font-mono font-bold text-primary-accent">0{index + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                      {strength}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Timeline */}
          <div id="about-timeline" className="lg:col-span-5 space-y-8">
            <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-text-primary flex items-center gap-3 uppercase tracking-wider">
              <Award className="w-5 h-5 text-primary-accent" />
              Career & Integration Timeline
            </h3>

            <div className="relative pl-6 border-l border-border-subtle space-y-6 sm:space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet icon */}
                  <div className="absolute -left-[36px] top-1.5 w-7 h-7 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center transition-all duration-300 group-hover:border-primary-accent group-hover:scale-105 shadow-xs z-10">
                    {getTimelineIcon(event.type)}
                  </div>

                  {/* Year Tag */}
                  <span className="inline-block px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono text-text-secondary group-hover:text-primary-accent transition-colors border border-border-subtle mb-3 font-bold">
                    {event.year}
                  </span>

                  {/* Card representing step */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-card-bg border border-border-subtle group-hover:border-primary-accent/20 transition-all duration-200 shadow-xs space-y-1.5">
                    <h4 className="card-title-comfortable">
                      {event.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-primary-accent mt-0.5 uppercase tracking-wider font-bold">
                      {event.organization}
                    </p>
                    <p className="text-desc-comfortable mt-3">
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
