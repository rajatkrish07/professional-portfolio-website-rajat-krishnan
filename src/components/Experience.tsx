import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Terminal, Award, BookOpen, Layers, Milestone } from 'lucide-react';
import { currentCompanyData } from '../data';
import { usePerformanceConfig } from '../hooks/usePerformanceConfig';

export default function Experience() {
  const { isLowPerformance } = usePerformanceConfig();

  const learningTopics = [
    { title: 'Python & Testing', desc: 'Asynchronous scripting, Object-Oriented patterns, pytest, memory profiling.', progress: 95 },
    { title: 'FastAPI & SQL', desc: 'FastAPI dependency injection, Pydantic validation, SQLAlchemy ORM, raw queries.', progress: 90 },
    { title: 'PostgreSQL', desc: 'Relational design, indexes, transactional isolation, raw query diagnostics, PGVector.', progress: 85 },
    { title: 'RAG & Vector Stores', desc: 'Text splitting chunking strategy, dense embedding generation, hybrid search.', progress: 80 },
    { title: 'LangChain & LangGraph', desc: 'Stateful multi-agent orchestrations, chain of thought prompting, tool calling.', progress: 85 },
    { title: 'DevOps & Tooling', desc: 'Docker containerization, volume mapping, GitHub actions, Postman API testing.', progress: 75 }
  ];

  return (
    <section id="company" className="py-14 sm:py-24 bg-primary-bg relative">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gpu-layer"
      >
        
        {/* Section Header */}
        <div id="experience-header" className="text-center sm:text-left mb-10 sm:mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary-accent mb-2">02 // CURRENT STATION</p>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Work Experience & Up-Skilling
          </h2>
          <div className="h-0.5 w-16 bg-primary-accent mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: TCS Associate Software Engineer Card */}
          <div id="company-tcs-details" className="lg:col-span-7 space-y-6">
            <div className="p-4 sm:p-8 rounded-xl bg-card-bg border border-border-subtle hover:border-primary-accent/20 transition-all duration-300 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/3 rounded-bl-full pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {currentCompanyData.role}
                  </h3>
                  <p className="text-xs font-mono text-primary-accent mt-1 uppercase tracking-wider font-semibold">
                    {currentCompanyData.company}
                  </p>
                </div>
                <div className="inline-flex flex-col sm:items-end">
                  <span className="px-2.5 py-1 rounded bg-slate-100/50 dark:bg-slate-800/50 border border-border-subtle text-xs font-mono text-text-secondary font-medium">
                    {currentCompanyData.duration}
                  </span>
                  <span className="text-[11px] text-text-secondary/70 mt-1.5 font-mono font-medium">{currentCompanyData.location}</span>
                </div>
              </div>

              {/* Role Summary */}
              {currentCompanyData.summary && (
                <div className="mb-6 pb-6 border-b border-border-subtle">
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                    {currentCompanyData.summary}
                  </p>
                </div>
              )}

              {/* Responsibilities list */}
              <div className="space-y-4 mb-8">
                <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary-accent" />
                  Key Responsibilities & Core Work
                </h4>
                <ul className="space-y-3">
                  {currentCompanyData.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-accent mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements list */}
              <div className="space-y-4 pt-6 border-t border-border-subtle">
                <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Performance Impact highlights
                </h4>
                <ul className="space-y-3">
                  {currentCompanyData.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-text-primary font-bold">Impact // </strong>
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Active Learning Journey Tracker */}
          <div id="learning-journey-tracker" className="lg:col-span-5 space-y-6">
            <div className="p-4 sm:p-8 rounded-xl bg-card-bg border border-border-subtle space-y-5 sm:space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4.5 h-4.5 text-secondary-accent" />
                <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider">
                  Technology Mastery Roadmap
                </h3>
              </div>
              
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Enterprise systems engineering provides the foundational framework for building deterministic AI software. Robust ETL ingestion pipelines map directly to custom embedding generation; automated data transformation mirrors prompt-guarding and structured JSON validation; and rigorous test suites serve as the baseline for dynamic LLM model evaluations (Evals).
              </p>

              {/* Skills and Progress */}
              <div className="space-y-5 pt-1">
                {learningTopics.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-text-primary font-bold flex items-center gap-2">
                        <Layers className="w-3 h-3 text-primary-accent" />
                        {topic.title}
                      </span>
                      <span className="text-primary-accent font-bold">{topic.progress}%</span>
                    </div>
                    {/* Visual progress bar */}
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-border-subtle">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full"
                        initial={{ width: isLowPerformance ? `${topic.progress}%` : 0 }}
                        whileInView={isLowPerformance ? undefined : { width: `${topic.progress}%` }}
                        viewport={{ once: true }}
                        transition={isLowPerformance ? { duration: 0 } : { duration: 1.2, delay: index * 0.05 }}
                      />
                    </div>
                    <p className="text-[10px] text-text-secondary font-sans pl-5 leading-normal">
                      {topic.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Target Goal Banner */}
              <div className="mt-4 p-4 rounded-xl bg-primary-accent/5 dark:bg-primary-accent/10 border border-primary-accent/20 flex items-start gap-3">
                <Milestone className="w-4.5 h-4.5 text-primary-accent shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-mono font-bold text-primary-accent uppercase tracking-wider">
                    TARGET_OBJECTIVE
                  </h5>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Transitioning fully into product-driven squads working on production Multi-Agent AI systems, async high-performance FastAPI backends, and Vector database layers.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
