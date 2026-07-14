import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Download, Terminal, Server, Cpu, Play, CheckCircle, FileText } from 'lucide-react';
import { profileData } from '../data';
import { usePerformanceConfig } from '../hooks/usePerformanceConfig';

interface HeroProps {
  onViewProjects: () => void;
  onViewResume: () => void;
}

export default function Hero({ onViewProjects, onViewResume }: HeroProps) {
  const [terminalTab, setTerminalTab] = useState<'agent' | 'rag'>('agent');
  const [terminalOutput, setTerminalOutput] = useState<string>('Ready to execute pipeline. Click "RUN_TESTS" to start.');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // High performance pointer & motion accessibility detection
  const { isDesktop, isLowPerformance } = usePerformanceConfig();

  // Section-wide background mouse spotlight tracking
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Butter-smooth spring configurations for fluid, natural spotlight tracking
  const springConfig = { damping: 30, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const { left, top } = sectionRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  // Terminal card hover spotlight tracking
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalMouseX = useMotionValue(0);
  const terminalMouseY = useMotionValue(0);
  const terminalSmoothX = useSpring(terminalMouseX, springConfig);
  const terminalSmoothY = useSpring(terminalMouseY, springConfig);
  const [isHoveringTerminal, setIsHoveringTerminal] = useState(false);

  const handleTerminalMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!terminalRef.current) return;
    const { left, top } = terminalRef.current.getBoundingClientRect();
    terminalMouseX.set(event.clientX - left);
    terminalMouseY.set(event.clientY - top);
  };

  // Spotlight background transforms declared unconditionally to satisfy Rules of Hooks
  const backgroundSpotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.045) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)`
  );

  const terminalSpotlight = useTransform(
    [terminalSmoothX, terminalSmoothY],
    ([x, y]) => `radial-gradient(180px circle at ${x}px ${y}px, rgba(96, 165, 250, 0.1) 0%, transparent 100%)`
  );

  const runPipeline = () => {
    setIsRunning(true);
    setTerminalOutput('[INFO] Initializing system pipeline orchestration...');
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[DEBUG] Compiling StateGraph. Resolving nodes: [plan_task, execute_task]...');
    }, 400);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[INFO] Connecting PGVector memory pool @ postgresql://localhost:5432/ai_db');
    }, 800);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[INFO] Schema validated successfully. Embedding model loaded: text-embedding-004');
    }, 1200);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[DEBUG] Executing plan_task node -> generating routing layout with gemini-2.5-flash...');
    }, 1600);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[DEBUG] Executing execute_task node -> tools called: [web_search, DB_retrieve]');
    }, 2000);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n[SUCCESS] Pipeline execution complete. Output token stream generated in 242ms.');
    }, 2400);
    
    setTimeout(() => {
      setTerminalOutput((prev) => prev + '\n✓ Pipeline Status: 200 OK | Agents synchronized.');
      setIsRunning(false);
    }, 2800);
  };

  const agentCodeLines = [
    <span key="1"><span className="text-[#ff79c6] font-semibold">import</span> os</span>,
    <span key="2"><span className="text-[#ff79c6] font-semibold">from</span> langgraph.graph <span className="text-[#ff79c6] font-semibold">import</span> StateGraph, END</span>,
    <span key="3"><span className="text-[#ff79c6] font-semibold">from</span> app.agents <span className="text-[#ff79c6] font-semibold">import</span> Planner, Executor</span>,
    <span key="4"><span className="text-[#ff79c6] font-semibold">from</span> app.state <span className="text-[#ff79c6] font-semibold">import</span> AgentState</span>,
    <span key="5"></span>,
    <span key="6"><span className="text-[#ff79c6] font-semibold">class</span> <span className="text-[#f1fa8c] font-bold">MultiAgentSystem</span>:</span>,
    <span key="7">    <span className="text-[#ff79c6] font-semibold">def</span> <span className="text-[#50fa7b] font-bold">__init__</span>(<span className="text-[#ffb86c] italic font-medium">self</span>):</span>,
    <span key="8">        <span className="text-[#ffb86c] italic font-medium">self</span>.planner = <span className="text-[#61afef] font-semibold">Planner</span>(model=<span className="text-[#98c379] font-medium">"gemini-2.5-flash"</span>)</span>,
    <span key="9">        <span className="text-[#ffb86c] italic font-medium">self</span>.executor = <span className="text-[#61afef] font-semibold">Executor</span>()</span>,
    <span key="10"></span>,
    <span key="11">    <span className="text-[#ff79c6] font-semibold">async def</span> <span className="text-[#50fa7b] font-bold">compile_pipeline</span>(<span className="text-[#ffb86c] italic font-medium">self</span>):</span>,
    <span key="12">        workflow = <span className="text-[#61afef] font-semibold">StateGraph</span>(<span className="text-[#f1fa8c] font-bold">AgentState</span>)</span>,
    <span key="13">        </span>,
    <span key="14">        <span className="text-[#6272a4] italic font-medium"># Register core orchestrator nodes</span></span>,
    <span key="15">        workflow.<span className="text-[#8be9fd]">add_node</span>(</span>,
    <span key="16">            <span className="text-[#98c379] font-medium">"plan_task"</span>, </span>,
    <span key="17">            <span className="text-[#ffb86c] italic font-medium">self</span>.planner.generate</span>,
    <span key="18">        )</span>,
    <span key="19">        workflow.<span className="text-[#8be9fd]">add_node</span>(</span>,
    <span key="20">            <span className="text-[#98c379] font-medium">"execute_task"</span>, </span>,
    <span key="21">            <span className="text-[#ffb86c] italic font-medium">self</span>.executor.run</span>,
    <span key="22">        )</span>,
    <span key="23">        </span>,
    <span key="24">        <span className="text-[#6272a4] italic font-medium"># Build stateful agent workflow</span></span>,
    <span key="25">        workflow.<span className="text-[#8be9fd]">set_entry_point</span>(<span className="text-[#98c379] font-medium">"plan_task"</span>)</span>,
    <span key="26">        workflow.<span className="text-[#8be9fd]">add_edge</span>(<span className="text-[#98c379] font-medium">"plan_task"</span>, <span className="text-[#98c379] font-medium">"execute_task"</span>)</span>,
    <span key="27">        workflow.<span className="text-[#8be9fd]">add_edge</span>(<span className="text-[#98c379] font-medium">"execute_task"</span>, END)</span>,
    <span key="28">        </span>,
    <span key="29">        <span className="text-[#ff79c6] font-semibold">return</span> workflow.<span className="text-[#8be9fd]">compile</span>()</span>
  ];

  const ragCodeLines = [
    <span key="1"><span className="text-[#ff79c6] font-semibold">import</span> os</span>,
    <span key="2"><span className="text-[#ff79c6] font-semibold">from</span> fastapi <span className="text-[#ff79c6] font-semibold">import</span> FastAPI</span>,
    <span key="3"><span className="text-[#ff79c6] font-semibold">from</span> sentence_transformers <span className="text-[#ff79c6] font-semibold">import</span> Embeddings</span>,
    <span key="4"><span className="text-[#ff79c6] font-semibold">from</span> app.db <span className="text-[#ff79c6] font-semibold">import</span> VectorStore</span>,
    <span key="5"></span>,
    <span key="6">app = <span className="text-[#61afef] font-semibold">FastAPI</span>(title=<span className="text-[#98c379] font-medium">"Semantic Search Index"</span>)</span>,
    <span key="7"></span>,
    <span key="8"><span className="text-[#bd93f9]">@app.post</span>(<span className="text-[#98c379] font-medium">"/api/v1/ingest"</span>)</span>,
    <span key="9"><span className="text-[#ff79c6] font-semibold">async def</span> <span className="text-[#50fa7b] font-bold">ingest_document</span>(file_path: <span className="text-[#8be9fd]">str</span>):</span>,
    <span key="10">    <span className="text-[#6272a4] italic font-medium"># Enterprise document semantic chunking</span></span>,
    <span key="11">    loader = <span className="text-[#61afef] font-semibold">DocumentChunker</span>(</span>,
    <span key="12">        chunk_size=<span className="text-[#bd93f9] font-semibold">512</span>,</span>,
    <span key="13">        overlap=<span className="text-[#bd93f9] font-semibold">64</span></span>,
    <span key="14">    )</span>,
    <span key="15">    chunks = <span className="text-[#ff79c6] font-semibold">await</span> loader.<span className="text-[#8be9fd]">split_pdf</span>(file_path)</span>,
    <span key="16">    </span>,
    <span key="17">    <span className="text-[#6272a4] italic font-medium"># Store with PGVector similarity search</span></span>,
    <span key="18">    vector_db = <span className="text-[#61afef] font-semibold">VectorStore</span>(</span>,
    <span key="19">        connection=os.<span className="text-[#8be9fd]">getenv</span>(<span className="text-[#98c379] font-medium">"DATABASE_URL"</span>),</span>,
    <span key="20">        embedding_model=<span className="text-[#98c379] font-medium">"text-embedding-004"</span></span>,
    <span key="21">    )</span>,
    <span key="22">    </span>,
    <span key="23">    <span className="text-[#ff79c6] font-semibold">await</span> vector_db.<span className="text-[#8be9fd]">add_documents</span>(chunks)</span>,
    <span key="24">    <span className="text-[#ff79c6] font-semibold">return</span> {"{"}<span className="text-[#98c379] font-medium">"status"</span>: <span className="text-[#98c379] font-medium">"success"</span>, <span className="text-[#98c379] font-medium">"chunks"</span>: <span className="text-[#8be9fd]">len</span>(chunks){"}"}</span>
  ];

  const containerVariants = {
    hidden: { opacity: isLowPerformance ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isLowPerformance ? 0 : 0.1,
        delayChildren: isLowPerformance ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: isLowPerformance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLowPerformance ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOutExpo curves
      },
    },
  };

  const renderConsoleLines = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content: React.ReactNode = line;
      
      if (line.startsWith('[INFO]')) {
        content = (
          <>
            <span className="text-[#60a5fa] font-semibold font-mono">[INFO]</span>
            <span className="text-slate-300 font-mono">{line.substring(6)}</span>
          </>
        );
      } else if (line.startsWith('[DEBUG]')) {
        content = (
          <>
            <span className="text-slate-400 font-semibold font-mono">[DEBUG]</span>
            <span className="text-slate-400/90 font-mono">{line.substring(7)}</span>
          </>
        );
      } else if (line.startsWith('[SUCCESS]')) {
        content = (
          <>
            <span className="text-emerald-400 font-semibold font-mono">[SUCCESS]</span>
            <span className="text-emerald-300 font-mono">{line.substring(9)}</span>
          </>
        );
      } else if (line.startsWith('✓')) {
        content = (
          <span className="text-emerald-300 font-medium font-mono">{line}</span>
        );
      } else {
        content = <span className="text-slate-300 font-mono">{line}</span>;
      }

      return (
        <div key={idx} className="font-mono text-[11px] leading-relaxed min-h-[1.25rem]">
          {content}
          {idx === lines.length - 1 && isRunning && (
            <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-1 align-middle animate-terminal-blink" />
          )}
        </div>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      className="relative min-h-screen flex items-center pt-20 pb-12 sm:pt-28 sm:pb-20 overflow-hidden bg-primary-bg"
    >
      {/* Premium background grid overlay styled for light backgrounds */}
      <div
        id="hero-grid-overlay"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Premium interactive mouse spotlight (Desktop fine-pointer devices only) */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{
            background: backgroundSpotlight,
          }}
        />
      )}

      {/* Smooth, breathing ambient blue glow */}
      <motion.div
        id="hero-glow-1"
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '15%',
          right: '5%',
        }}
        animate={!isLowPerformance ? {
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6],
        } : undefined}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dynamic second subtle ambient violet glow orb */}
      <motion.div
        id="hero-glow-2"
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '10%',
          left: '5%',
        }}
        animate={!isLowPerformance ? {
          scale: [1.1, 0.95, 1.1],
          opacity: [0.4, 0.6, 0.4],
        } : undefined}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Bio with staggered child animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left relative"
          >
            {/* Subtle premium slow-drifting background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
              {/* Blur Sphere 1 - Very faint deep blue */}
              <motion.div
                className="absolute w-40 h-40 rounded-full bg-primary-accent/5 blur-3xl top-[-20px] left-[-30px]"
                style={{ willChange: "transform" }}
                animate={!isLowPerformance ? {
                  x: [0, 15, -15, 0],
                  y: [0, -25, 15, 0],
                } : undefined}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Blur Sphere 2 - Very faint secondary violet */}
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-secondary-accent/4 blur-[60px] bottom-10 right-10"
                style={{ willChange: "transform" }}
                animate={!isLowPerformance ? {
                  x: [0, -20, 20, 0],
                  y: [0, 20, -20, 0],
                } : undefined}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Faint Geometric Node 1: Delicate Plus Symbol */}
              <motion.div
                className="absolute text-primary-accent/20 font-mono text-xl font-light top-16 left-[25%]"
                style={{ willChange: "transform" }}
                animate={!isLowPerformance ? {
                  x: [0, 12, -8, 0],
                  y: [0, -12, 12, 0],
                  rotate: [0, 180, 360],
                } : undefined}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                +
              </motion.div>
              {/* Faint Geometric Node 2: Delicate Hollow Circle */}
              <motion.div
                className="absolute w-4 h-4 rounded-full border border-secondary-accent/15 bottom-28 left-[15%]"
                style={{ willChange: "transform" }}
                animate={!isLowPerformance ? {
                  x: [0, -10, 15, 0],
                  y: [0, 15, -10, 0],
                } : undefined}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Faint Geometric Node 3: Tiny Grid Accent Dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-primary-accent/15 top-[60%] right-[20%]"
                style={{ willChange: "transform" }}
                animate={!isLowPerformance ? {
                  x: [0, 15, -12, 0],
                  y: [0, -15, 15, 0],
                } : undefined}
                transition={{
                  duration: 26,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
             {/* Headline communicating what they build */}
             <div className="space-y-4 pt-3">
               <motion.h2
                 id="hero-headline"
                 variants={itemVariants}
                 className="font-sans text-2xl xs:text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] xl:text-[50px] font-extrabold tracking-tight text-text-primary leading-[1.15] sm:leading-[1.15] md:leading-[1.15] lg:leading-[1.15]"
               >
                 AI &amp; Systems Engineer <br className="hidden sm:inline" />
                 building <span className="shimmer-gradient font-extrabold">intelligent systems</span> <br className="hidden sm:inline" />
                 that solve real problems.
               </motion.h2>
             </div>

             {/* Secondary Description */}
             <motion.p
               variants={itemVariants}
               className="text-sm sm:text-base md:text-[17px] lg:text-[18px] text-text-secondary/90 leading-relaxed max-w-2xl font-sans font-normal tracking-normal"
             >
               Building autonomous agents, scalable backend systems, intelligent workflows, and production-ready AI applications.
             </motion.p>

             {/* Actions with professional light-theme contrast */}
             <motion.div
               variants={itemVariants}
               className="flex flex-col sm:flex-row items-center gap-5 pt-6"
             >
               <motion.button
                 onClick={onViewProjects}
                 whileHover={{ scale: 1.015 }}
                 whileTap={{ scale: 0.985 }}
                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
                 className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 sm:px-10 sm:py-5 rounded-xl bg-primary-accent hover:bg-secondary-accent text-white dark:text-slate-950 dark:bg-primary-accent dark:hover:bg-secondary-accent btn-premium-text transition-all shadow-md shadow-blue-900/10 border border-primary-accent/20 cursor-pointer relative overflow-hidden"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   Explore Projects
                   <motion.span
                     variants={{
                       hover: { x: 4 }
                     }}
                     className="inline-block"
                     transition={{ type: "spring", stiffness: 300, damping: 15 }}
                   >
                     <ArrowRight className="w-4 h-4 text-white dark:text-slate-950" />
                   </motion.span>
                 </span>
                 {/* Premium subtle gloss highlight on hover */}
                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine-sweep transition-transform duration-1000 pointer-events-none" />
               </motion.button>
               
               <motion.button
                 onClick={onViewResume}
                 whileHover="hover"
                 whileTap={{ scale: 0.985 }}
                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
                 className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 sm:px-10 sm:py-5 rounded-xl bg-card-bg border border-border-subtle hover:border-primary-accent text-primary-accent hover:bg-primary-accent/5 btn-premium-text transition-all cursor-pointer shadow-2xs"
               >
                 <motion.span
                   variants={{
                     hover: { y: -1.5, rotate: -4 }
                   }}
                   transition={{ type: "spring", stiffness: 300, damping: 12 }}
                 >
                   <FileText className="w-4 h-4 text-primary-accent" />
                 </motion.span>
                 <span>View Resume</span>
               </motion.button>
             </motion.div>

          </motion.div>

          {/* Right Column: Interactive Code Terminal / Dynamic Template Highlight */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              ref={terminalRef}
              onMouseMove={handleTerminalMouseMove}
              onMouseEnter={() => setIsHoveringTerminal(true)}
              onMouseLeave={() => setIsHoveringTerminal(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-xl border border-[#1e3a8a]/10 bg-[#070e24] overflow-hidden shadow-2xl relative"
            >
              {/* Premium Spotlight border glow overlay (Desktop fine-pointer devices only) */}
              {isDesktop && isHoveringTerminal && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none z-0"
                  style={{
                    background: terminalSpotlight,
                    border: '1px solid rgba(96, 165, 250, 0.15)',
                    mixBlendMode: 'screen',
                  }}
                />
              )}

              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a122c] border-b border-[#1e3a8a]/25 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] font-mono text-slate-300 pl-2">
                    {terminalTab === 'agent' ? 'multi_agent_orchestrator.py' : 'semantic_rag_index.py'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400">HOST: LOCAL_K8S</span>
                </div>
              </div>

              {/* Tab Selector inside terminal */}
              <div className="flex bg-[#0a122c] border-b border-[#1e3a8a]/20 text-[11px] font-mono select-none relative z-10">
                <button
                  onClick={() => setTerminalTab('agent')}
                  className={`px-4 py-2.5 border-r border-[#1e3a8a]/15 transition-all flex items-center gap-1.5 cursor-pointer ${
                    terminalTab === 'agent' 
                      ? 'bg-[#070e24] text-[#3b82f6] border-t-2 border-t-[#3b82f6] font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1635]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span>multi_agent_orchestrator.py</span>
                </button>
                <button
                  onClick={() => setTerminalTab('rag')}
                  className={`px-4 py-2.5 border-r border-[#1e3a8a]/15 transition-all flex items-center gap-1.5 cursor-pointer ${
                    terminalTab === 'rag' 
                      ? 'bg-[#070e24] text-emerald-400 border-t-2 border-t-emerald-400 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1635]'
                  }`}
                >
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>semantic_rag_index.py</span>
                </button>
                <div className="flex-1 bg-[#0a122c]" />
              </div>

              {/* Code Panel with Line Numbers */}
              <div className="p-4 text-xs font-mono overflow-y-auto text-left h-[250px] sm:h-80 bg-[#070e24] select-text border-b border-[#1e3a8a]/15 relative z-10">
                <div className="flex font-mono text-xs leading-relaxed">
                  {/* Line Numbers Gutter */}
                  <div className="select-none text-slate-600 text-right pr-4 border-r border-[#1e3a8a]/10 flex flex-col min-w-[2.5rem]">
                    {Array.from({ length: terminalTab === 'agent' ? agentCodeLines.length : ragCodeLines.length }).map((_, i) => (
                      <span key={i} className="block text-[#1e3a8a]/50 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                    ))}
                  </div>
                  {/* Code Lines with animated transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={terminalTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="pl-4 flex-1 overflow-x-auto whitespace-pre text-[#f8f8f2]"
                    >
                      {(terminalTab === 'agent' ? agentCodeLines : ragCodeLines).map((line, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: Math.min(idx * 0.012, 0.25), ease: "easeOut" }}
                          className="hover:bg-[#0c1635]/50 px-1 rounded-sm transition-colors duration-150 flex items-center min-h-[1.5rem]"
                        >
                          <span className="flex-1">{line}</span>
                          {/* Blinking edit cursor in active/last loaded line on tab switch */}
                          {idx === (terminalTab === 'agent' ? agentCodeLines.length - 1 : ragCodeLines.length - 1) && (
                            <span className="w-1.5 h-3.5 bg-[#60a5fa] inline-block ml-1 align-middle animate-terminal-blink" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Execution Console output panel */}
              <div className="bg-[#040817] p-3 text-[11px] font-mono text-left relative z-10">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="font-semibold tracking-wider text-slate-500">EXECUTION CONSOLE</span>
                  <button
                    onClick={runPipeline}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#1e3a8a]/20 border border-[#1e3a8a]/40 text-[#60a5fa] hover:bg-[#1e3a8a]/40 hover:text-white transition-all disabled:opacity-40 cursor-pointer shadow-xs"
                  >
                    <Play className="w-2.5 h-2.5" /> {isRunning ? 'EXECUTING...' : 'RUN_TESTS'}
                  </button>
                </div>
                <div className="bg-[#070e24] p-3 rounded border border-[#1e3a8a]/15 text-emerald-400 h-20 sm:h-24 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                  {renderConsoleLines(terminalOutput)}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Elegant scroll anchor indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block z-10">
        <div className="w-[22px] h-[36px] rounded-full border border-text-secondary/35 flex justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-primary-accent"
          />
        </div>
      </div>
    </section>
  );
}

