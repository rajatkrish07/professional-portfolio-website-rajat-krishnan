import React from 'react';
import { motion } from 'motion/react';
import { Code2, Server, Database, Sparkles, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { techStackData } from '../data';

export default function TechStack() {
  // Dynamically map skill categories to relevant Lucide icons
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming & software engineering':
        return <Code2 className="w-4.5 h-4.5 text-primary-accent" />;
      case 'backend development':
        return <Server className="w-4.5 h-4.5 text-indigo-600" />;
      case 'database engineering':
        return <Database className="w-4.5 h-4.5 text-emerald-600" />;
      case 'ai engineering':
        return <Sparkles className="w-4.5 h-4.5 text-amber-600 animate-pulse" />;
      case 'ai infrastructure':
        return <Cpu className="w-4.5 h-4.5 text-cyan-600" />;
      case 'software architecture':
        return <Layers className="w-4.5 h-4.5 text-slate-600" />;
      case 'testing & development':
        return <ShieldCheck className="w-4.5 h-4.5 text-red-600" />;
      default:
        return <Cpu className="w-4.5 h-4.5 text-primary-accent" />;
    }
  };

  return (
    <section id="tech-stack" className="py-14 sm:py-24 bg-secondary-bg border-y border-border-subtle relative overflow-hidden">
      {/* Decorative dot background */}
      <div className="absolute inset-0 tech-dot-grid opacity-[0.3] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div id="tech-stack-header" className="text-center sm:text-left mb-12 sm:mb-20">
          <p className="text-section-subtitle mb-3">03 // TOOLING & CORE</p>
          <h2 className="text-section-title">
            Engineering Tech Stack
          </h2>
          <p className="text-body-comfortable max-w-3xl mt-4">
            Building production-ready AI applications through modern backend engineering, scalable system design, and intelligent AI workflows.
          </p>
          <div className="h-[3px] w-20 bg-primary-accent mt-5 rounded-full" />
        </div>

        {/* Legend / Transition Focus Explanation */}
        <div id="tech-stack-legend" className="flex items-center gap-3.5 mb-12 p-5 rounded-2xl bg-card-bg border border-border-subtle max-w-2xl shadow-xs">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary-accent shadow-sm shadow-primary-accent animate-pulse shrink-0" />
          <p className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed font-semibold">
            Items highlighted with <span className="text-primary-accent font-bold">blue dot</span> indicators denote core technologies within Rajat's AI & Intelligent Systems engineering focus.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackData.map((categoryGroup, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 md:p-7 rounded-2xl bg-card-bg border border-border-subtle hover:border-primary-accent/30 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-border-subtle pb-4">
                  {getCategoryIcon(categoryGroup.category)}
                  <h3 className="font-display text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary-accent transition-colors uppercase tracking-wider">
                    {categoryGroup.category}
                  </h3>
                </div>

                {/* Skill List items */}
                <div className="flex flex-wrap gap-2.5">
                  {categoryGroup.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-mono border transition-all duration-250 ${
                        skill.isTransitionFocus
                          ? 'bg-primary-accent/5 dark:bg-primary-accent/10 border-primary-accent/30 text-primary-accent shadow-xs font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40 text-slate-700 dark:text-slate-300 font-bold hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {skill.isTransitionFocus && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-accent animate-pulse" />
                      )}
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Little detail card footer decor */}
              <div className="mt-8 pt-3 text-[10px] font-mono text-text-secondary/40 text-right group-hover:text-text-secondary/60 transition-colors uppercase font-bold">
                GROUP // 0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies Sub-section */}
        <div className="mt-16 pt-12 border-t border-border-subtle">
          <div className="p-6 sm:p-12 rounded-3xl bg-card-bg border border-border-subtle shadow-xs relative overflow-hidden">
            {/* Subtle decorative subtle background tint */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-accent/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-3 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-primary-accent animate-pulse" />
              Core Competencies
            </h3>
            <p className="text-desc-comfortable mb-8">
              Primary domains of execution, architectural methodologies, and backend systems design principles.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "AI Application Development",
                "Backend API Development",
                "Agentic AI Systems",
                "Retrieval-Augmented Generation (RAG)",
                "LLM Integration",
                "RESTful API Design",
                "Database Modeling",
                "Software Architecture",
                "Production-Ready Backend Development",
                "Problem Solving & System Design"
              ].map((competency, idx) => (
                <div
                  key={idx}
                  className="px-4.5 py-2.5 bg-slate-50 dark:bg-slate-800/40 hover:bg-primary-accent/5 dark:hover:bg-primary-accent/10 border border-slate-200 dark:border-slate-700/50 hover:border-primary-accent/30 text-slate-800 dark:text-slate-200 hover:text-primary-accent font-sans text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 shadow-2xs cursor-default flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-primary-accent/40 animate-pulse" />
                  {competency}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
