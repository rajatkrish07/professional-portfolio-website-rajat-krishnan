import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Cpu, Database, Network, GitBranch, ArrowRight, ShieldCheck } from 'lucide-react';
import { projectsData } from '../data';
import GithubShowcase from './GithubShowcase';
import { usePerformanceConfig } from '../hooks/usePerformanceConfig';

export default function Projects() {
  const { isLowPerformance } = usePerformanceConfig();
  
  // Custom interactive system diagram components for the visual placeholders
  const renderSystemDiagram = (id: string) => {
    switch (id) {
      case 'cogentra':
        return (
          <div className="w-full h-44 bg-[#0a122c] rounded-t-xl border-b border-[#1e3a8a]/20 relative overflow-hidden flex items-center justify-center p-4">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                 style={{
                   backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                   backgroundSize: '16px 16px'
                 }} 
            />
            
            {/* Stateful Cyclic Graph Diagram */}
            <div className="relative flex items-center gap-4 text-xs font-mono">
              <div className="px-2 py-1.5 rounded border border-[#1e3a8a]/40 bg-[#070e24]/90 text-[#60a5fa] text-[10px] flex items-center gap-1">
                <Cpu className="w-3 h-3 animate-pulse text-[#3b82f6]" /> Router
              </div>
              
              <div className="flex flex-col gap-2.5">
                <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] rounded font-semibold">
                  Agent A (Planner)
                </div>
                <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] rounded font-semibold">
                  Agent B (Validator)
                </div>
              </div>
              
              <div className="px-2 py-1.5 rounded border border-indigo-400/40 bg-[#070e24]/90 text-indigo-300 text-[10px] flex items-center gap-1">
                <Database className="w-3 h-3" /> State Node
              </div>

              {/* Connecting lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: -1 }}>
                <path d="M 60,88 L 100,60" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 60,88 L 100,115" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3" />
                <path d="M 190,60 L 220,88" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" />
                <path d="M 190,115 L 220,88" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400/60">
              LANGRAPH // STATE_ORCHESTRATION_GRID
            </div>
          </div>
        );
      case 'capitalminds':
        return (
          <div className="w-full h-44 bg-[#0a122c] rounded-t-xl border-b border-[#1e3a8a]/20 relative overflow-hidden flex items-center justify-center p-4">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                 style={{
                   backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                   backgroundSize: '16px 16px'
                 }} 
            />
            
            {/* PDF Extraction Flow */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <div className="flex flex-col items-center p-1 rounded border border-slate-700 bg-[#070e24]/50 text-slate-300">
                <span>PDF Document</span>
              </div>
              <span className="text-[#3b82f6]">&rarr;</span>
              <div className="flex flex-col items-center p-1 rounded border border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[#60a5fa]">
                <span>Semantic Chunk</span>
              </div>
              <span className="text-[#3b82f6]">&rarr;</span>
              <div className="flex flex-col items-center p-1 rounded border border-emerald-400/40 bg-emerald-400/10 text-emerald-400 font-semibold">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>PGVector</span>
              </div>
            </div>

            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400/60">
              RAG // METADATA_ENHANCED_EMBEDDINGS
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-[#0a122c] rounded-t-xl border-b border-[#1e3a8a]/20 relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{
                   backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                   backgroundSize: '16px 16px'
                 }} 
            />
            <div className="flex flex-col items-center text-center p-4 space-y-2">
              <Network className="w-6 h-6 text-slate-400 animate-pulse" />
              <p className="text-[10px] font-mono text-slate-400/70 uppercase tracking-widest">
                Future Integration Slot
              </p>
            </div>
            <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400/60">
              ROADMAP // IN_CONCEPT
            </div>
          </div>
        );
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Production':
        return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 font-semibold';
      case 'Active Development':
        return 'bg-light-surface/40 dark:bg-light-surface border border-primary-accent/20 dark:border-primary-accent/30 text-primary-accent font-semibold';
      case 'Prototype':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 font-semibold';
      default:
        return 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold';
    }
  };

  return (
    <section id="projects" className="py-14 sm:py-24 bg-primary-bg relative overflow-hidden">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div id="projects-section-header" className="text-center sm:text-left mb-12 sm:mb-20">
          <p className="text-section-subtitle mb-3">04 // PORTFOLIO SHOWCASE</p>
          <h2 className="text-section-title">
            Featured Projects
          </h2>
          <div className="h-[3px] w-20 bg-primary-accent mt-4 rounded-full" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-card-bg border border-border-subtle hover:border-primary-accent/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md"
            >
              <div>
                {/* Custom System Diagram Graphic */}
                {renderSystemDiagram(project.id)}

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Status & Name Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono border ${getStatusBadgeColor(project.status)} uppercase font-bold`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-mono text-text-secondary/60 uppercase font-bold">
                      ID // {project.id}
                    </span>
                  </div>

                  <h3 className="card-title-comfortable group-hover:text-primary-accent transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-secondary-accent font-bold leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-desc-comfortable">
                    {project.description}
                  </p>

                  {/* Architecture Point Highlights */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-text-primary/70 font-bold">Core Architectures</p>
                    <div className="space-y-2">
                      {project.architecturePoints.map((pt, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-desc-comfortable">
                          <span className="text-primary-accent font-mono text-xs mt-0.5">&bull;</span>
                          <span className="font-sans leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom badging and Actions */}
              <div className="p-5 sm:p-6 pt-0 border-t border-border-subtle mt-3">
                {/* Badges list */}
                <div className="flex flex-wrap gap-2 py-4">
                  {project.techBadges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 rounded bg-slate-100/50 dark:bg-slate-800/50 border border-border-subtle text-[10px] sm:text-[11px] font-mono text-primary-accent font-bold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <a
                    id={`project-github-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-secondary hover:text-primary-accent transition-colors py-2 font-bold"
                  >
                    <Github className="w-4 h-4" /> Codebase
                  </a>
                  
                  {project.liveUrl ? (
                    <a
                      id={`project-live-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-primary-accent hover:text-secondary-accent transition-colors py-2 font-bold"
                    >
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    project.status !== 'Coming Soon' && (
                      <span className="text-[10px] sm:text-xs font-mono text-text-secondary/40 italic font-bold">
                        Internal Repo
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time GitHub Integration Section */}
        <div className="mt-20 sm:mt-28 pt-16 sm:pt-24 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="text-center sm:text-left mb-12 sm:mb-16">
            <p className="text-section-subtitle mb-3">05 // LIVE ENGAGEMENT METRICS</p>
            <h3 className="text-section-title">
              Real-time GitHub Contributions & Activity
            </h3>
            <div className="h-[3px] w-20 bg-primary-accent mt-4 rounded-full" />
          </div>
          
          <GithubShowcase />
        </div>

      </motion.div>
    </section>
  );
}
