import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, Database, Terminal, Server, Cpu, Play, CheckCircle, 
  Sparkles, Workflow, Bot, Zap, ArrowRight, Search, GitBranch, 
  TrendingUp, RefreshCw, Layers, Shield, ChevronRight, Activity,
  Sliders, Send, AlertCircle, BarChart3, HelpCircle, Network
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  shortDesc: string;
  description: string;
  techs: string[];
  accent: string;
}

const stagesData: Stage[] = [
  {
    id: 1,
    title: "Learning Foundations",
    subtitle: "01 // COGNITIVE BEGINNINGS",
    badge: "Foundations",
    shortDesc: "Algorithmic thinking, SQL queries, and Object-Oriented paradigms.",
    description: "Developing robust fundamental problem-solving skills. Mastering relational algebra, data normalization, and standard OOP principles that form the absolute bedrock of sustainable backend logic.",
    techs: ["Python", "PostgreSQL", "OOP", "Data Structures"],
    accent: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Building Software",
    subtitle: "02 // BACKEND EXCELLENCE",
    badge: "API Architecture",
    shortDesc: "Designing high-throughput, type-safe REST APIs using FastAPI.",
    description: "Moving from scripts to scalable production applications. Architecting type-safe backends with strict request-response validations using Pydantic, async SQLAlchemy, and modular routers.",
    techs: ["FastAPI", "RESTful APIs", "Pydantic", "SQLAlchemy"],
    accent: "from-indigo-500 to-violet-500"
  },
  {
    id: 3,
    title: "Enterprise Engineering",
    subtitle: "03 // SYSTEM RELIABILITY",
    badge: "Scale & Testing",
    shortDesc: "Continuous delivery, dockerization, and multi-tenant logic.",
    description: "Formulating enterprise-grade system workflows. Implementing strict unit test coverage, CI/CD automated deployment runner matrices, containerization, and async processing worker queues.",
    techs: ["Docker", "Pytest", "GitHub Actions", "Redis Queues"],
    accent: "from-violet-500 to-purple-500"
  },
  {
    id: 4,
    title: "Exploring AI",
    subtitle: "04 // KNOWLEDGE GROUNDING",
    badge: "Semantic RAG",
    shortDesc: "Document vectorizations, embedding layers, and semantic indexes.",
    description: "Entering the world of Natural Language Processing and LLM interfaces. Crafting document segmentation layers, computing high-dimensional text embeddings, and setting up contextually relevant Vector databases.",
    techs: ["LangChain", "Vector DBs", "Pinecone", "Embeddings"],
    accent: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Intelligent Systems",
    subtitle: "05 // HYBRID INTEGRATION",
    badge: "Contextual Chains",
    shortDesc: "Fusing live application variables into context-aware LLM prompts.",
    description: "Building systems that connect the real world to AI models. Creating complex, reliable multi-step execution chains that inject database lookups and API parameters into generative contexts on the fly.",
    techs: ["Context Engines", "Gemini API", "Chains", "State Guarding"],
    accent: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    title: "Agentic AI",
    subtitle: "06 // AUTONOMOUS WORKFLOWS",
    badge: "Orchestration",
    shortDesc: "Reasoning models, action-execution loops, and tool calling.",
    description: "Designing self-directed systems that reason. Structuring autonomous planning loops, recursive reflection, tool access permissions, and automated self-correction blocks for complex workflows.",
    techs: ["Agent Loops", "Tool Calling", "ReAct Framework", "Self-Correction"],
    accent: "from-rose-500 to-emerald-500"
  },
  {
    id: 7,
    title: "The Future",
    subtitle: "07 // ENTERPRISE IMPACT",
    badge: "Capital Minds AI",
    shortDesc: "Solving real business challenges via production-grade AI systems.",
    description: "Shaping the frontier of enterprise intelligence. Developing Capital Minds AI, focusing on local private hosting solutions, strict data privacy protocols, agentic market research, and high-ROI systems.",
    techs: ["Capital Minds AI", "Local-First LLMs", "Enterprise ROI", "Data Security"],
    accent: "from-emerald-500 to-teal-400"
  }
];

export default function EngineeringJourney() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimeoutRef = useRef<any>(null);
  const transitionLockRef = useRef<boolean>(false);
  const lockTimeoutRef = useRef<any>(null);

  // High performance media query pointer detection to separate Desktop (hover) vs Touch (scroll)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: fine)');
      setIsDesktop(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => {
        setIsDesktop(e.matches);
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Lock transitions during active animations to synchronize visual rendering and prevent overlaps
  const changeActiveStageWithLock = (id: number) => {
    if (activeStage === id) return;
    if (transitionLockRef.current) return;

    setActiveStage(id);
    transitionLockRef.current = true;

    if (lockTimeoutRef.current) {
      clearTimeout(lockTimeoutRef.current);
    }
    lockTimeoutRef.current = setTimeout(() => {
      transitionLockRef.current = false;
    }, 600); // 600ms lock perfectly aligns with core transition timings
  };

  // High performance IntersectionObserver for touch/mobile devices ONLY (100% scroll-driven)
  useEffect(() => {
    if (isDesktop) return; // Disabled on desktop pointer:fine devices to ensure scrolling ONLY moves the page

    const observerOptions = {
      root: null,
      // Target a narrow 4% vertical band in the exact center of the viewport
      rootMargin: "-48% 0px -48% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isManualClickRef.current) return;
      if (transitionLockRef.current) return;

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const dominant = visibleEntries[0];
        const stageIdAttr = dominant.target.getAttribute('data-stage-id');
        if (stageIdAttr) {
          const id = parseInt(stageIdAttr, 10);
          if (!isNaN(id) && activeStage !== id) {
            changeActiveStageWithLock(id);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    stagesData.forEach((stage) => {
      const element = document.getElementById(`stage-scroll-tracker-${stage.id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (manualClickTimeoutRef.current) {
        clearTimeout(manualClickTimeoutRef.current);
      }
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, [isDesktop, activeStage]);

  // Handle manual hovering on desktop
  const handleMouseEnter = (id: number) => {
    if (!isDesktop) return; // Ignore hover on touch screens
    changeActiveStageWithLock(id);
  };

  // Handle manual clicking
  const handleStageClick = (id: number) => {
    if (activeStage === id) return;
    
    isManualClickRef.current = true;
    setActiveStage(id);

    if (manualClickTimeoutRef.current) {
      clearTimeout(manualClickTimeoutRef.current);
    }
    
    // Bypass scroll tracking for 1.2s to let smooth scroll fully complete without any feedback loops
    manualClickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1200);

    const cardElement = document.getElementById(`stage-card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Stage 1: Interactive SQL & OOP States
  const [sqlQuery, setSqlQuery] = useState('SELECT name, skills FROM engineers WHERE role = \'AI\';');
  const [sqlResults, setSqlResults] = useState<any[]>([]);
  const [sqlLoading, setSqlLoading] = useState(false);
  const [oopOutput, setOopOutput] = useState('');

  // Stage 2: Interactive FastAPI API Client States
  const [endpointParam, setEndpointParam] = useState('capital_analyzer');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Stage 3: CI/CD Pipeline Build simulator
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [buildProgress, setBuildProgress] = useState(0);

  // Stage 4: Semantic RAG States
  const [ragQuery, setRagQuery] = useState('Enterprise autonomous roadmap');
  const [ragResult, setRagResult] = useState<any>(null);
  const [ragLoading, setRagLoading] = useState(false);

  // Stage 5: Contextual Chains
  const [chainInput, setChainInput] = useState('Draft an AI strategy memo');
  const [chainLogs, setChainLogs] = useState<string[]>([]);
  const [chainRunning, setChainRunning] = useState(false);

  // Stage 6: Autonomous Agent sandbox
  const [agentObjective, setAgentObjective] = useState('Analyze market competitors');
  const [agentLogs, setAgentLogs] = useState<string[]>(['[Agent Core] Awaiting execution trigger...']);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(0);

  // Stage 7: Future (Capital Minds AI)
  const [metricsIndex, setMetricsIndex] = useState(0);
  const [efficiencyRate, setEfficiencyRate] = useState(85);

  // Preset SQL Queries
  const executeSQL = (queryText: string) => {
    setSqlLoading(true);
    setSqlResults([]);
    setSqlQuery(queryText);
    setTimeout(() => {
      setSqlLoading(false);
      if (queryText.includes('WHERE role')) {
        setSqlResults([
          { name: "Rajat Krishnan", skills: "FastAPI, Pytest, Docker, AI" },
          { name: "Agent Alpha", skills: "Autonomous Planning, Vector DBs" }
        ]);
      } else {
        setSqlResults([
          { name: "Rajat Krishnan", role: "AI & Systems Engineer", status: "Active" },
          { name: "Agent Alpha", role: "Orchestrator Node", status: "Active" }
        ]);
      }
    }, 600);
  };

  // Run OOP Simulation
  const simulateOOP = () => {
    setOopOutput("Initializing classes...\n");
    setTimeout(() => {
      setOopOutput(prev => prev + "class Engineer:\n   def __init__(self, name):\n       self.name = name\n       self.stack = []\n");
    }, 300);
    setTimeout(() => {
      setOopOutput(prev => prev + "\n>>> rajat = Engineer('Rajat')\n>>> rajat.add_skill('Agentic AI')\n>>> print(f'{rajat.name} specializing in {rajat.stack[0]}')\n");
    }, 900);
    setTimeout(() => {
      setOopOutput(prev => prev + "Output: Rajat specializing in Agentic AI ✅\n");
    }, 1500);
  };

  // Run FastAPI Request simulator
  const sendApiRequest = () => {
    setApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiLoading(false);
      setApiResponse({
        status_code: 200,
        latency_ms: 18.4,
        headers: {
          "content-type": "application/json",
          "server": "uvicorn/fastapi",
          "x-process-time": "0.012s"
        },
        payload: {
          agent_triggered: endpointParam,
          execution_status: "SUCCESS",
          orchestration_loop_duration: "1.4s",
          compliance_check: "PASSED",
          data: {
            variables_fused: ["DB_METRICS", "GIT_SHA_LATEST"],
            output_tokens_generated: 412,
            target_roi_improvement: "85%"
          }
        }
      });
    }, 800);
  };

  // Trigger CI/CD Pipeline build simulator
  const runCIBuild = () => {
    setBuildStatus('running');
    setBuildProgress(0);
    setBuildLogs(["[Job Initialized] Spinning up virtual execution runner..."]);

    const steps = [
      { prg: 20, log: "▶ Running lint checks: black --check src/ & isort --check-only src/" },
      { prg: 45, log: "✔ Styling checks passed. Running static analysis: mypy src/" },
      { prg: 70, log: "✔ Typings evaluated. Running unit tests: pytest tests/ -v" },
      { prg: 90, log: "▶ 42 Unit tests completed successfully with 100% test coverage." },
      { prg: 100, log: "⚡ Building secure Docker artifact. Pushed to container registry: build_success_tag ✅" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setBuildProgress(step.prg);
        setBuildLogs(prev => [...prev, step.log]);
        if (step.prg === 100) {
          setBuildStatus('success');
        }
      }, (idx + 1) * 900);
    });
  };

  // Trigger Semantic RAG trace simulator
  const triggerRAGSearch = () => {
    setRagLoading(true);
    setRagResult(null);
    setTimeout(() => {
      setRagLoading(false);
      setRagResult({
        query_vector_dimensions: 1536,
        top_similarity_score: 0.942,
        context_chunks_retrieved: [
          {
            id: "doc_chunk_32a",
            similarity: 0.942,
            text: "Rajat Krishnan transitioned into AI & Systems. Core experience focus: Python-driven multi-agent workflows, highly optimized FastAPI backends, and modular local generative AI deployments."
          },
          {
            id: "doc_chunk_11f",
            similarity: 0.819,
            text: "Capital Minds AI serves as the primary focal platform for custom enterprise automation pipelines, agent planning orchestrations, and context-aware business tooling integrations."
          }
        ],
        synthesis: "Based on highly grounded database records, Rajat is a seasoned AI & Systems Engineer with profound capabilities spanning FastAPI, Docker workflows, LangChain semantic systems, and production multi-agent design."
      });
    }, 900);
  };

  // Run Contextual Chain simulator
  const runContextChain = () => {
    setChainRunning(true);
    setChainLogs(["[Step 1] Receieved user instruction: " + chainInput]);
    
    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 2] Contacting DB: Fetching candidate timeline & enterprise experience parameters..."]);
    }, 800);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 3] Contacting GitHub API: Hydrating real-time contributions metric data..."]);
    }, 1800);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 4] Injecting context variables into Gemini System prompt template...", "[Step 5] Grounding verified. Requesting generation..."]);
    }, 2800);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "Result synthesized successfully: Candidate's portfolio timeline and activity validated. Ready for deployment pipeline! ✅"]);
      setChainRunning(false);
    }, 4000);
  };

  // Trigger Agentic simulation loop
  const triggerAgenticLoop = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(1);
    setAgentLogs(["[Goal Input] Received instruction: " + agentObjective]);

    setTimeout(() => {
      setAgentStep(2);
      setAgentLogs(prev => [...prev, "[Planner Node] Devising recursive strategy...", " - Subtask 1: Crawl historical documents", " - Subtask 2: Match vector embeddings", " - Subtask 3: Cross-audit results via critique agent"]);
    }, 1000);

    setTimeout(() => {
      setAgentStep(3);
      setAgentLogs(prev => [...prev, "[Tool Runner] Fetching details from system databases...", "[Tool Output] Recieved matching metric documents (Confidence: 0.96)"]);
    }, 2200);

    setTimeout(() => {
      setAgentStep(4);
      setAgentLogs(prev => [...prev, "[Critique Agent] Verifying output compliance guidelines...", " - Match exact date milestones: VERIFIED", " - Eliminate hallucinations: VALIDATED", " - System flag: PASS"]);
    }, 3400);

    setTimeout(() => {
      setAgentStep(5);
      setAgentLogs(prev => [...prev, "[Agent Core] Orchestration completed successfully. Returning compiled analysis payload! ✅"]);
      setAgentRunning(false);
    }, 4600);
  };

  // Initial runs for animations on mount
  useEffect(() => {
    executeSQL('SELECT name, skills FROM engineers WHERE role = \'AI\';');
    sendApiRequest();
    runCIBuild();
    triggerRAGSearch();
  }, []);

  return (
    <section 
      id="journey" 
      className="py-14 sm:py-24 bg-primary-bg relative overflow-hidden transition-colors duration-300 border-b border-border-subtle"
      ref={containerRef}
    >
      {/* Background visual graphics */}
      <div className="absolute inset-0 tech-dot-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none bg-radial from-primary-accent/3 to-transparent filter blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none bg-radial from-secondary-accent/3 to-transparent filter blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div id="journey-header" className="text-center md:text-left mb-12 sm:mb-20">
          <p className="text-xs font-mono uppercase tracking-widest text-primary-accent mb-2">
            01 // INTENTIONAL EVOLUTION
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-sans max-w-2xl mt-3.5 leading-relaxed">
            Witness my transition from absolute programming fundamentals into high-throughput API architecture, secure pipeline operations, and cognitive agent orchestrations.
          </p>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary-accent to-secondary-accent mt-4 sm:mt-5 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Storytelling container with dedicated split interactive architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">
          
          {/* Left Column: Interactive Stage Switcher */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-left relative pl-2 sm:pl-4">
            
            {/* Base timeline track */}
            <div className="absolute left-[-10px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-slate-800/80 hidden sm:block" />

            {/* Glowing animated vertical progress path overlay */}
            <div className="absolute left-[-10px] top-6 bottom-6 w-[2px] hidden sm:block">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-accent via-violet-500 to-emerald-400 origin-top shadow-[0_0_8px_rgba(var(--primary-accent-rgb),0.5)]"
                animate={{ 
                  height: `${((activeStage - 1) / (stagesData.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%' }}
              />
            </div>

            {stagesData.map((stage) => {
              const isActive = activeStage === stage.id;
              
              return (
                <div
                  key={stage.id}
                  id={`stage-card-${stage.id}`}
                  data-stage-id={stage.id}
                  className="relative group cursor-pointer scroll-mt-28"
                  onClick={() => handleStageClick(stage.id)}
                  onMouseEnter={() => handleMouseEnter(stage.id)}
                >
                  {/* Stable 1px tracking element positioned 1/4 down the card wrapper. Its height remains constant at 1px regardless of card expansion, completely bypassing layout shift feedback loops and threshold oscillations. */}
                  <div
                    id={`stage-scroll-tracker-${stage.id}`}
                    data-stage-id={stage.id}
                    className="absolute top-1/4 left-0 w-full h-[1px] pointer-events-none"
                  />

                  {/* Left bullet connecting indicator for Desktop */}
                  <div className="absolute -left-[22px] top-6 z-20 items-center justify-center hidden sm:flex">
                    {isActive ? (
                      <div className="relative flex items-center justify-center w-6 h-6">
                        <motion.div
                          layoutId="timelineGlow"
                          className="absolute inset-0 rounded-full bg-primary-accent/20 border border-primary-accent/40"
                          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.2, 0.6] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-accent ring-4 ring-white dark:ring-[#090d16] shadow-md shadow-primary-accent/50" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-primary-accent/40 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Adaptive Stage Card Panel */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.98,
                      opacity: isActive ? 1 : 0.65,
                      x: isActive ? (typeof window !== 'undefined' && window.innerWidth > 640 ? 6 : 0) : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 select-none ${
                      isActive 
                        ? 'bg-card-bg shadow-md border-primary-accent/30 dark:border-primary-accent/40' 
                        : 'bg-card-bg/30 border-border-subtle/50 hover:border-border-subtle hover:bg-card-bg/60 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-text-secondary">
                        {stage.subtitle}
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase ${isActive ? 'bg-primary-accent/10 text-primary-accent border border-primary-accent/20' : 'bg-slate-100 dark:bg-slate-800 text-text-secondary border border-border-subtle'}`}>
                        {stage.badge}
                      </span>
                    </div>

                    <h3 className="font-sans text-base sm:text-lg font-bold text-text-primary tracking-tight flex items-center gap-2">
                      {stage.title}
                      {isActive && (
                        <motion.span 
                          layoutId="activeIndicatorSpark" 
                          className="inline-block"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-primary-accent animate-pulse" />
                        </motion.span>
                      )}
                    </h3>

                    {/* Expandable active stage details */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
                          >
                            <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                              {stage.description}
                            </p>

                            {/* Tech indicators */}
                            <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-border-subtle/40">
                              {stage.techs.map((tech, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-border-subtle text-text-secondary"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Short preview desc if stage is collapsed */}
                    {!isActive && (
                      <p className="text-xs text-text-secondary font-sans truncate mt-1">
                        {stage.shortDesc}
                      </p>
                    )}

                    {/* Mobile interactive panel display embedded inside card directly */}
                    <div className="block lg:hidden mt-4 pt-3.5 border-t border-border-subtle/50">
                      {isActive && renderInteractiveVisualizer(stage.id, true)}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Interactive Journey Console Frame (Fixed on Desktop viewports) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28 bg-card-bg/60 dark:bg-card-bg/40 rounded-3xl border border-border-subtle p-5 backdrop-blur-md shadow-xl overflow-hidden min-h-[460px]">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3.5 mb-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary ml-3.5">
                  JOURNEY_SIM_CONSOLE_v2.0 // NODE_0{activeStage}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SANDBOX ONLINE
              </div>
            </div>

            <div className="h-full flex flex-col justify-between">
              {/* Animation transition container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex-grow flex flex-col justify-center"
                >
                  {renderInteractiveVisualizer(activeStage, false)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );

  // Big Interactive Sandbox Component Switcher
  function renderInteractiveVisualizer(stageId: number, isMobile: boolean) {
    const textTheme = isMobile ? "text-[10px]" : "text-xs";
    const boxHeight = isMobile ? "min-h-[190px] p-3" : "min-h-[360px] p-4";

    switch (stageId) {
      case 1: // Learning Foundations
        return (
          <div className={`rounded-2xl bg-[#050b1d] border border-[#1e3a8a]/20 font-mono text-slate-300 flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              <div className="flex items-center justify-between border-b border-[#1e3a8a]/10 pb-2 mb-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-blue-400" /> interactive_postgre.sql
                </span>
                <span className="text-[9px] text-[#38bdf8] bg-[#38bdf8]/10 px-1.5 py-0.2 rounded border border-[#38bdf8]/10">SCHEMA: ACADEMIC_PROD</span>
              </div>

              {/* Selector preset pills */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                <button 
                  onClick={() => executeSQL('SELECT name, skills FROM engineers WHERE role = \'AI\';')}
                  className="px-2 py-0.5 rounded text-[9px] bg-[#1e3a8a]/20 hover:bg-[#1e3a8a]/40 border border-[#1e3a8a]/40 text-blue-300 font-bold cursor-pointer"
                >
                  Preset 1: AI Query
                </button>
                <button 
                  onClick={() => executeSQL('SELECT name, role, status FROM active_pipelines;')}
                  className="px-2 py-0.5 rounded text-[9px] bg-[#1e3a8a]/20 hover:bg-[#1e3a8a]/40 border border-[#1e3a8a]/40 text-blue-300 font-bold cursor-pointer"
                >
                  Preset 2: Node Status
                </button>
                <button 
                  onClick={simulateOOP}
                  className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 font-bold cursor-pointer"
                >
                  Simulate OOP class
                </button>
              </div>

              {/* Execution console output */}
              <div className="space-y-2">
                <div className="flex items-start gap-1 bg-slate-950/80 p-2 rounded border border-[#1e3a8a]/10">
                  <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                  <span className={`${textTheme} text-slate-200 select-all font-bold break-all whitespace-pre-wrap`}>{sqlQuery}</span>
                </div>

                {/* SQL result output window */}
                {sqlLoading ? (
                  <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-4">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Query compiler mapping relations...
                  </div>
                ) : sqlResults.length > 0 ? (
                  <div className="text-left font-mono rounded bg-slate-950 p-2 border border-slate-900/60 overflow-x-auto">
                    <table className="w-full text-[10px] text-slate-400 leading-normal border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          {Object.keys(sqlResults[0]).map((key, kIdx) => (
                            <th key={kIdx} className="text-left py-1 pr-4 font-semibold uppercase">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sqlResults.map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-900/20 hover:bg-slate-900/40">
                            {Object.values(row).map((val: any, vIdx) => (
                              <td key={vIdx} className="py-1 pr-4 text-emerald-300 font-bold">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {oopOutput && (
                  <div className="text-left font-mono rounded bg-slate-950/60 p-2 border border-purple-500/10 text-[9px] leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {oopOutput}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#1e3a8a]/15 pt-2 mt-3 text-[9px] text-slate-500">
              <span>Query Execution: 0.03ms</span>
              <span>Host: localhost:5432</span>
            </div>
          </div>
        );

      case 2: // Building Software
        return (
          <div className={`rounded-2xl bg-[#090d16] border border-violet-500/20 font-sans flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              {/* Header bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/30 pb-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[10px] font-mono text-slate-400 break-all">FASTAPI SWAGGER DOCS PLAYGROUND (v1.2)</span>
                </div>
                <span className="text-[9px] font-mono text-violet-400 font-semibold bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10 shrink-0">async uvicorn</span>
              </div>

              {/* Endpoint interaction form */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-border-subtle/40">
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-white shrink-0">POST</span>
                    <span className="font-mono text-[11px] sm:text-xs text-slate-300 font-semibold truncate">/api/v1/agents/trigger</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-800">
                      <span className="text-purple-400 font-bold">id:</span>
                      <input 
                        type="text" 
                        value={endpointParam} 
                        onChange={(e) => setEndpointParam(e.target.value)}
                        className="bg-transparent text-slate-200 w-20 sm:w-24 outline-none border-none font-bold"
                      />
                    </div>
                    <button 
                      onClick={sendApiRequest}
                      className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                    >
                      <Send className="w-3 h-3" /> Send
                    </button>
                  </div>
                </div>

                {/* Simulated API Output rendering */}
                {apiLoading ? (
                  <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-4 font-mono">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-400" /> Sending request headers, validating schemas...
                  </div>
                ) : apiResponse ? (
                  <div className="p-3 rounded-xl bg-slate-950 text-[10px] font-mono text-slate-300 border border-border-subtle/30 leading-relaxed overflow-y-auto max-h-[170px]">
                    <div className="flex justify-between border-b border-border-subtle/10 pb-1 mb-2 text-[9px] text-slate-500">
                      <span>HTTP/1.1 {apiResponse.status_code} OK</span>
                      <span className="text-emerald-400">Latency: {apiResponse.latency_ms}ms</span>
                    </div>
                    <pre className="text-blue-300 font-bold">{JSON.stringify(apiResponse.payload, null, 2)}</pre>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic text-center pt-8 font-mono">
                    Click the Send button above to hit the FastAPI trigger route and evaluate Pydantic validations.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border-subtle/30 pt-2 text-[9px] text-slate-500 font-mono">
              <span>Throughput: ~14.2K req/sec</span>
              <span>Framework: FastAPI (v0.110.0)</span>
            </div>
          </div>
        );

      case 3: // Enterprise Engineering
        return (
          <div className={`rounded-2xl bg-[#040813] border border-violet-500/20 font-mono text-slate-300 flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/20 pb-2 mb-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1.5 shrink-0">
                  <GitBranch className="w-3.5 h-3.5 text-violet-400 animate-pulse" /> github_ci_runner.yml
                </span>
                <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10 shrink-0">Actions Node</span>
              </div>

              {/* Progress pipeline visual nodes */}
              <div className="relative pt-2 pb-4">
                <div className="absolute top-[22px] left-[15px] right-[15px] h-[2px] bg-slate-900" />
                <div 
                  className="absolute top-[22px] left-[15px] h-[2px] bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${buildProgress}%` }}
                />

                <div className="relative flex justify-between items-center z-10">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${buildProgress >= 20 ? 'bg-violet-950 border-violet-400 text-violet-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] text-slate-500">Format</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${buildProgress >= 45 ? 'bg-violet-950 border-violet-400 text-violet-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] text-slate-500">Mypy</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${buildProgress >= 70 ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] text-emerald-500">Pytest</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${buildProgress >= 100 ? 'bg-emerald-950 border-emerald-400 text-emerald-400 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <Server className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] text-slate-500">Deploy</span>
                  </div>
                </div>
              </div>

              {/* Build output log window */}
              <div className="bg-slate-950/95 rounded-xl p-3 border border-border-subtle/20 text-[9px] text-left space-y-1.5 h-[150px] overflow-y-auto">
                {buildLogs.length === 0 ? (
                  <p className="text-slate-600 italic">No build triggered yet. Run deploy pipeline below to start.</p>
                ) : (
                  buildLogs.map((log, lIdx) => (
                    <p key={lIdx} className={log.includes('✔') || log.includes('✅') ? 'text-emerald-400' : 'text-slate-400'}>
                      {log}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-border-subtle/20">
              <span className="text-[9px] text-slate-500 shrink-0">Runner: hosted-ubuntu-latest</span>
              <button 
                onClick={runCIBuild}
                disabled={buildStatus === 'running'}
                className={`px-3 py-1 rounded font-bold font-mono text-[10px] flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
                  buildStatus === 'running' 
                    ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'bg-violet-500/20 border border-violet-500/40 hover:bg-violet-500/40 text-violet-300'
                }`}
              >
                {buildStatus === 'running' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Building...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" /> Trigger Pipeline
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 4: // Exploring AI
        return (
          <div className={`rounded-2xl bg-[#040813] border border-purple-500/20 font-mono text-slate-300 flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-2 mb-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0">
                  <Workflow className="w-3.5 h-3.5 text-purple-400 animate-spin" /> document_semantic_rag.py
                </span>
                <span className="text-[9px] text-purple-400 bg-purple-400/5 px-2 py-0.5 rounded border border-purple-400/10 shrink-0">Vector Dimension: 1536</span>
              </div>

              {/* Interaction Search bar */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-grow flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-border-subtle/40 min-w-0">
                  <Search className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <input 
                    type="text" 
                    value={ragQuery} 
                    onChange={(e) => setRagQuery(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 outline-none border-none font-semibold w-full"
                    placeholder="Enter query to fetch verified context..."
                  />
                </div>
                <button 
                  onClick={triggerRAGSearch}
                  className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold cursor-pointer transition-colors shrink-0"
                >
                  Retrieve
                </button>
              </div>

              {/* Retrieve status representation */}
              {ragLoading ? (
                <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-6">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" /> Slicing documents, mapping embeddings index...
                </div>
              ) : ragResult ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-[9px]">
                    <div className="p-2 rounded bg-slate-950 border border-purple-500/10">
                      <span className="block text-slate-500 font-bold">TOP METRIC SCORE</span>
                      <span className="text-emerald-400 font-bold text-xs">{ragResult.top_similarity_score} Match</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-purple-500/10">
                      <span className="block text-slate-500 font-bold">SOURCE CHUNKS</span>
                      <span className="text-purple-400 font-bold text-xs">2 Context Snippets</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-[#1e3a8a]/10 max-h-[105px] overflow-y-auto text-[9px] space-y-1.5 leading-normal">
                    <p className="text-purple-300 font-bold">Evaluated Context Chunk:</p>
                    <p className="text-slate-400 italic">"{ragResult.context_chunks_retrieved[0].text}"</p>
                    <p className="text-emerald-400 font-bold pt-1">Grounding Response Synthesized:</p>
                    <p className="text-slate-200">{ragResult.synthesis}</p>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-500 italic text-center pt-10">
                  Submit a query to evaluate vector database search and grounded prompt synthesis.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-500/20 pt-2 text-[9px] text-slate-500">
              <span className="shrink-0">Database: Pinecone Storage</span>
              <span className="shrink-0">Model: text-embedding-3-small</span>
            </div>
          </div>
        );

      case 5: // Building Intelligent Systems
        return (
          <div className={`rounded-2xl bg-[#090d16] border border-pink-500/20 font-sans flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/30 pb-2 mb-3">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">CONTEXT_ENRICHMENT_API_ROUTING</span>
                <span className="text-[9px] font-mono text-pink-400 bg-pink-400/5 px-2 py-0.5 rounded border border-pink-500/10 shrink-0">Chain Execution</span>
              </div>

              {/* Flowchart visuals */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <span className="text-xs font-mono text-slate-400 shrink-0">Prompt Goal:</span>
                    <input 
                      type="text" 
                      value={chainInput} 
                      onChange={(e) => setChainInput(e.target.value)}
                      className="bg-slate-950 px-2 py-1 rounded border border-border-subtle/50 text-xs text-slate-200 outline-none w-full font-mono"
                    />
                  </div>
                  <button 
                    onClick={runContextChain}
                    disabled={chainRunning}
                    className="px-2.5 py-1 rounded bg-pink-600 hover:bg-pink-500 text-white font-mono text-[10px] font-bold cursor-pointer transition-colors shrink-0 self-end sm:self-auto"
                  >
                    Run Chain
                  </button>
                </div>

                {/* Animated logs */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-pink-500/10 font-mono text-[9px] text-left leading-relaxed space-y-1.5 h-[140px] overflow-y-auto">
                  {chainLogs.length === 0 ? (
                    <p className="text-slate-600 italic">No chain execution started. Click Run Chain to simulate data fusion.</p>
                  ) : (
                    chainLogs.map((log, lIdx) => (
                      <p key={lIdx} className={log.includes('successfully') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        ▶ {log}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle/30 pt-2 text-[9px] text-slate-500 font-mono">
              <span className="shrink-0">Token Matrix: 100% Deterministic Variables</span>
              <span className="shrink-0">Model Integration: Gemini 1.5 Flash</span>
            </div>
          </div>
        );

      case 6: // Agentic AI
        return (
          <div className={`rounded-2xl bg-[#030712] border border-rose-500/20 font-mono text-slate-300 flex flex-col justify-between text-left ${boxHeight}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-2 mb-3">
                <span className="text-[10px] text-slate-500 flex items-center gap-1.5 shrink-0">
                  <Bot className="w-4 h-4 text-rose-400 animate-pulse" /> autonomous_agent_runner.py
                </span>
                <span className="text-[9px] text-rose-400 uppercase tracking-widest bg-rose-400/5 px-2 py-0.5 rounded border border-rose-500/10 shrink-0">ReAct Loop</span>
              </div>

              {/* Form Input for Goal */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-grow flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-border-subtle/40 min-w-0">
                  <input 
                    type="text" 
                    value={agentObjective} 
                    onChange={(e) => setAgentObjective(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 outline-none border-none font-semibold w-full"
                    placeholder="Enter objective for the agent..."
                  />
                </div>
                <button 
                  onClick={triggerAgenticLoop}
                  disabled={agentRunning}
                  className={`px-3 py-1 rounded font-bold text-[10px] cursor-pointer transition-colors shrink-0 ${
                    agentRunning 
                      ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  Execute
                </button>
              </div>

              {/* Progress step dots */}
              <div className="flex gap-1.5 justify-center py-1 mb-2.5">
                <span className={`w-2 h-2 rounded-full ${agentStep >= 1 ? 'bg-rose-500 shadow-sm shadow-rose-500/80' : 'bg-slate-800'}`} />
                <span className={`w-2 h-2 rounded-full ${agentStep >= 2 ? 'bg-orange-500 shadow-sm shadow-orange-500/80' : 'bg-slate-800'}`} />
                <span className={`w-2 h-2 rounded-full ${agentStep >= 3 ? 'bg-amber-500 shadow-sm shadow-amber-500/80' : 'bg-slate-800'}`} />
                <span className={`w-2 h-2 rounded-full ${agentStep >= 4 ? 'bg-yellow-500 shadow-sm shadow-yellow-500/80' : 'bg-slate-800'}`} />
                <span className={`w-2 h-2 rounded-full ${agentStep >= 5 ? 'bg-emerald-500 shadow-sm shadow-emerald-500/80' : 'bg-slate-800'}`} />
              </div>

              {/* Active terminal */}
              <div className="bg-slate-950/90 rounded-xl p-3 border border-rose-500/10 text-[9px] space-y-1.5 h-[120px] overflow-y-auto">
                {agentLogs.map((log, lIdx) => {
                  let colorClass = "text-slate-400";
                  if (log.startsWith("[Goal Input]")) colorClass = "text-rose-400 font-bold";
                  else if (log.startsWith("[Planner Node]")) colorClass = "text-orange-400";
                  else if (log.startsWith("[Tool Runner]")) colorClass = "text-sky-400";
                  else if (log.startsWith("[Critique Agent]")) colorClass = "text-purple-300";
                  else if (log.startsWith("[Agent Core]")) colorClass = "text-emerald-400 font-bold";

                  return (
                    <p key={lIdx} className={colorClass}>
                      {log}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rose-500/20 pt-2 text-[9px] text-slate-500">
              <span className="shrink-0">Decision Loops: self_reflection = True</span>
              <span className="shrink-0">Model: Gemini-3.5-flash-agentic</span>
            </div>
          </div>
        );

      case 7: // The Future
        return (
          <div className={`rounded-2xl bg-gradient-to-br from-[#050b1d] to-[#040813] border border-emerald-500/20 font-sans p-4 sm:p-5 text-left flex flex-col justify-between ${boxHeight}`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/10 pb-2 mb-3">
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 font-bold shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" /> FUTURE_VISION_PORTAL
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase shrink-0">CAPITAL MINDS AI</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  "Building secure, localized, high-ROI AI orchestration systems for real-world enterprise operations."
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Solving the ultimate missing links in traditional generative portfolios: strict local data isolation protocols, zero cloud leaks, and domain-grounded autonomous agents that directly execute high-value workflows.
                </p>

                {/* Simulated live telemetry indicator charts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center pt-1.5">
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-left">
                    <span className="text-[9px] block text-slate-500 uppercase font-mono font-bold">Enterprise ROI Target</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm sm:text-base leading-none">+{efficiencyRate}% Automation</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-left">
                    <span className="text-[9px] block text-slate-500 uppercase font-mono font-bold">Compliance protocol</span>
                    <span className="text-emerald-400 font-mono font-bold text-[10px] leading-none uppercase">ISO-9001 Alignment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-emerald-500/10 text-[10px] text-slate-500">
              <span className="shrink-0">Primary Sector: Financial/Operational Intelligence</span>
              <span className="flex items-center gap-0.5 text-emerald-300 font-mono font-bold animate-pulse shrink-0">
                Initiating Next Phase <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  }
}
