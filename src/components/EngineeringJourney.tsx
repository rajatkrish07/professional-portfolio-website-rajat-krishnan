import React from 'react';
import { 
  Code, Database, Server, Play, CheckCircle, Sparkles, 
  Workflow, Bot, Search, GitBranch, RefreshCw, Layers, 
  Shield, ChevronRight, Send, ArrowRight
} from 'lucide-react';

interface StorySegment {
  learned: string;
  built: string;
  bridge: string;
}

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  techs: string[];
  story: StorySegment;
}

const stagesData: Stage[] = [
  {
    id: 1,
    title: "Foundational Software & Database Design",
    subtitle: "01 // THE SOLID BEDROCK",
    badge: "Engineering Core",
    description: "Deepening computing fundamentals and theoretical models into engineering practice at Chandigarh University. Mastering data structures, relational database normalization, and Object-Oriented Programming (OOP) in Python to build deterministic, high-efficiency logic.",
    techs: ["Python", "PostgreSQL", "SQL Analytics", "OOP", "Git"],
    story: {
      learned: "Mastered core computer science principles including relational database theory, database normalization (3NF), object-oriented design patterns (inheritance, encapsulation, polymorphism), and complex analytical SQL (CTEs, Window functions).",
      built: "Designed a normalized 3NF relational social media data model (Instagram Analytics) in PostgreSQL, writing complex analytics query blocks to isolate engagement diagnostics and user retention factors.",
      bridge: "Taught me how to model data cleanly and organize logic modularly, creating the absolute architectural foundation necessary to build type-safe schemas and backend Web APIs."
    }
  },
  {
    id: 2,
    title: "Type-Safe APIs & Web Architectures",
    subtitle: "02 // SCALABLE BACKEND INTERFACES",
    badge: "API Design",
    description: "Transitioning from scripts to scalable, production-grade backends. Architecting high-throughput, asynchronous web server architectures with FastAPI, enforcing data validation using Pydantic, and abstracting data layers via SQLAlchemy ORM.",
    techs: ["FastAPI", "Pydantic", "SQLAlchemy", "RESTful APIs", "JWT Auth"],
    story: {
      learned: "Learned asynchronous request-response lifecycles, strict schema validation/serialization via Pydantic Data Transfer Objects (DTOs), clean layered file structures, and state-free token-based authorization.",
      built: "Engineered high-throughput, async REST API server endpoints in FastAPI with automatic OpenAPI docs, creating a modular service layer to execute database transactions efficiently via SQLAlchemy.",
      bridge: "Provided the scalable API infrastructure skills required to host, expose, and secure resource-heavy AI inference pipelines and live vector database queries."
    }
  },
  {
    id: 3,
    title: "Enterprise Automation & Cloud Ingestion",
    subtitle: "03 // SCALE & SYSTEM RELIABILITY",
    badge: "Reliability Engineering",
    description: "Formulating automated data workflows and continuous integration environments inside high-compliance enterprise systems at Tata Consultancy Services (TCS). Designing serverless stream ingestion pipelines and automated testing suites.",
    techs: ["Docker", "Pytest", "AWS Lambda & S3", "AWS Glue", "CI/CD"],
    story: {
      learned: "Mastered serverless execution workflows, cloud storage partition schemas, automated schema discovery with Glue crawlers, and strict test-driven development (TDD) using Pytest and Docker containers.",
      built: "Optimized and automated 15+ backend enterprise data ingestion pipelines processing over 50+ GB of structured data weekly at TCS, and designed an automated serverless Spotify ETL streaming pipeline on AWS.",
      bridge: "Working with high-volume, structured dataset transformations directly mapped to the strict, zero-loss text embedding extraction pipelines, prompt schemas, and strict data validation systems in LLM applications."
    }
  },
  {
    id: 4,
    title: "Retrieval-Augmented Generation (RAG)",
    subtitle: "04 // SEMANTIC INTERFACES & RETRIEVAL",
    badge: "Information Grounding",
    description: "Translating static, unstructured documents into context-grounded AI knowledge. Implementing advanced document segmentations, calculating high-dimensional embeddings, and configuring PGVector hybrid indexes for similarity-based context search.",
    techs: ["LangChain", "PGVector", "OpenAI Embeddings", "Semantic Chunking", "PDF Parsing"],
    story: {
      learned: "Mastered vector math, semantic parsing chunk algorithms, embedding calculation models, and hybrid database index optimization (HNSW) to prevent LLM hallucinations with grounded enterprise data.",
      built: "Engineered 'Capital Minds', a high-performance financial intelligence PDF parsing and RAG query pipeline. It ingests complex financial statements, indexes them into PGVector, and retrieves precise similarity-matched snippets.",
      bridge: "Transitioned me from static API backends to dynamic context-driven architectures, unlocking the ability to feed real-time, grounded enterprise memory into large generative models."
    }
  },
  {
    id: 5,
    title: "Autonomous Multi-Agent Systems",
    subtitle: "05 // COGNITIVE AGENT WORKFLOWS",
    badge: "Autonomous Systems",
    description: "Moving beyond single-step prompting into fully autonomous software agents. Designing stateful, cyclic multi-agent loops with LangGraph that can plan complex steps, execute local code tools, self-reflect, and adhere to strict security constraints.",
    techs: ["LangGraph", "AI Agents", "State Machines", "Tool Calling", "ReAct Loop", "Self-Correction"],
    story: {
      learned: "Mastered the ReAct (Reasoning and Acting) loop framework, dynamic tool invocation, thread-level memory persistence, custom-directed state-chart cycles, and automated reflection/validation layers.",
      built: "Architected 'Cogentra', an enterprise-grade multi-agent backend engine coordinating Planner, Executor, and Validator agent loops using FastAPI and LangGraph with state-level memory checkpoints.",
      bridge: "Completed my evolution into an AI & Systems Engineer, combining robust database design, asynchronous FastAPI routes, serverless infrastructure, and RAG knowledge-grounding into self-healing, intelligent software nodes."
    }
  }
];

const stageIcons: Record<number, React.ComponentType<any>> = {
  1: Database,
  2: Server,
  3: Shield,
  4: Search,
  5: Bot
};

// ==========================================
// HIGH-QUALITY MINIMAL SVG DIAGRAMS
// ==========================================

function FoundationsDiagram() {
  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 sm:p-6 mt-6 shadow-2xs hover:shadow-xs transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/30 pb-2.5 mb-4 font-mono text-[10px] text-text-secondary">
        <span>ARCHITECTURAL MODEL // SYSTEM SCHEMAS</span>
        <span className="text-primary-accent font-bold">OOP ➔ SQL RELATIONAL</span>
      </div>
      <svg viewBox="0 0 640 320" className="w-full h-auto text-text-primary">
        <defs>
          <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--primary-accent)" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
          <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>
        
        <style>{`
          .svg-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .svg-card:hover { transform: translate(-1px, -2px); filter: drop-shadow(0 12px 20px rgba(0,0,0,0.04)); }
          .svg-card-right:hover { transform: translate(1px, -2px); filter: drop-shadow(0 12px 20px rgba(0,0,0,0.04)); }
          .flow-line { stroke-dasharray: 5, 5; animation: flow 30s linear infinite; }
          @keyframes flow { to { stroke-dashoffset: -1000; } }
        `}</style>

        {/* OOP domain model container (Left) */}
        <rect x="20" y="20" width="260" height="280" rx="12" className="fill-slate-50/20 dark:fill-slate-900/10 stroke-slate-200/60 dark:stroke-slate-800/60" strokeWidth="1" />
        <text x="35" y="42" className="font-mono text-[9px] font-bold fill-text-secondary uppercase tracking-widest">01 // DOMAIN MODELS (PYTHON OOP)</text>
        
        {/* Class User */}
        <g className="svg-card">
          <rect x="35" y="60" width="230" height="85" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <path d="M 35 84 L 265 84" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="35" y="60" width="230" height="24" rx="10" fill="url(#blue-grad)" className="opacity-80" />
          <text x="48" y="76" className="font-mono text-[10px] font-bold fill-primary-accent">class User(BaseModel):</text>
          
          <text x="48" y="102" className="font-mono text-[9px] fill-text-primary">  id: int <tspan className="fill-text-secondary/60"># Primary Key</tspan></text>
          <text x="48" y="118" className="font-mono text-[9px] fill-text-primary">  email: str <tspan className="fill-text-secondary/60"># Unique Identifier</tspan></text>
        </g>

        {/* Class Engineer (Inherits User) */}
        <g className="svg-card">
          <rect x="35" y="195" width="230" height="90" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <path d="M 35 219 L 265 219" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="35" y="195" width="230" height="24" rx="10" fill="url(#blue-grad)" className="opacity-80" />
          <text x="48" y="211" className="font-mono text-[10px] font-bold fill-primary-accent">class Engineer(User):</text>
          
          <text x="48" y="237" className="font-mono text-[9px] fill-text-primary">  specialization: str</text>
          <text x="48" y="253" className="font-mono text-[9px] fill-text-primary">  core_stack: list[str]</text>
          <text x="48" y="269" className="font-mono text-[9px] fill-text-secondary">  def analyze_data() ➔ dict</text>
        </g>

        {/* Inheritance relation arrow (Left column OOP connection) */}
        <path d="M 150 195 L 150 151" className="stroke-slate-400 dark:stroke-slate-600 fill-none" strokeWidth="1" markerEnd="url(#arrow-slate)" strokeDasharray="3,3" />
        <text x="158" y="174" className="font-mono text-[8px] fill-text-secondary uppercase tracking-wider font-semibold">Inheritance</text>

        {/* Database Entities Container (Right) */}
        <rect x="360" y="20" width="260" height="280" rx="12" className="fill-slate-50/20 dark:fill-slate-900/10 stroke-slate-200/60 dark:stroke-slate-800/60" strokeWidth="1" />
        <text x="375" y="42" className="font-mono text-[9px] font-bold fill-text-secondary uppercase tracking-widest">02 // ENTITY MODELS (POSTGRESQL)</text>

        {/* Table users */}
        <g className="svg-card svg-card-right">
          <rect x="375" y="60" width="230" height="85" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <path d="M 375 84 L 605 84" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="375" y="60" width="230" height="24" rx="10" fill="url(#emerald-grad)" className="opacity-80" />
          <text x="388" y="76" className="font-mono text-[10px] font-bold fill-emerald-500">TABLE: users</text>
          
          <text x="388" y="102" className="font-mono text-[9px] fill-emerald-500 font-bold">  id: SERIAL <tspan className="fill-text-secondary font-normal">[PK]</tspan></text>
          <text x="388" y="118" className="font-mono text-[9px] fill-text-primary">  email: VARCHAR(255) <tspan className="fill-text-secondary/60">UNIQUE</tspan></text>
        </g>

        {/* Table user_metrics */}
        <g className="svg-card svg-card-right">
          <rect x="375" y="195" width="230" height="90" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <path d="M 375 219 L 605 219" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="375" y="195" width="230" height="24" rx="10" fill="url(#emerald-grad)" className="opacity-80" />
          <text x="388" y="211" className="font-mono text-[10px] font-bold fill-emerald-500">TABLE: user_metrics</text>
          
          <text x="388" y="237" className="font-mono text-[9px] fill-emerald-500 font-bold">  id: SERIAL <tspan className="fill-text-secondary font-normal">[PK]</tspan></text>
          <text x="388" y="253" className="font-mono text-[9px] fill-primary-accent font-bold">  user_id: INTEGER <tspan className="fill-text-secondary font-normal">[FK ➔ users.id]</tspan></text>
          <text x="388" y="269" className="font-mono text-[9px] fill-text-primary">  engagement_coeff: NUMERIC</text>
        </g>

        {/* Relational foreign key line */}
        <path d="M 490 145 L 490 195" className="stroke-emerald-500 fill-none" strokeWidth="1.2" />
        {/* Crows foot notation indicators */}
        <circle cx="490" cy="149" r="3.5" className="fill-card-bg stroke-emerald-500" strokeWidth="1.2" />
        <line x1="483" y1="189" x2="497" y2="189" className="stroke-emerald-500" strokeWidth="1.2" />
        <line x1="490" y1="184" x2="484" y2="191" className="stroke-emerald-500" strokeWidth="1.2" />
        <line x1="490" y1="184" x2="496" y2="191" className="stroke-emerald-500" strokeWidth="1.2" />
        <text x="502" y="174" className="font-mono text-[7.5px] fill-emerald-500 font-bold uppercase tracking-wider">1 : N relation</text>

        {/* Horizontal transition flow (Center) */}
        <path d="M 280 145 Q 320 120 360 145" className="stroke-primary-accent fill-none flow-line" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
        <text x="290" y="112" className="font-mono text-[8px] font-extrabold fill-primary-accent uppercase tracking-wider">ORM Serialization</text>
      </svg>
      <div className="text-center font-mono text-[10px] text-text-secondary/70 mt-3.5 uppercase font-bold">
        Designed Normalized Social Analytics database schemas with relational entity modeling
      </div>
    </div>
  );
}

function BackendApiDiagram() {
  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 sm:p-6 mt-6 shadow-2xs hover:shadow-xs transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/30 pb-2.5 mb-4 font-mono text-[10px] text-text-secondary">
        <span>API ENDPOINT PIPELINE // ASYNC FLOW</span>
        <span className="text-secondary-accent font-bold">FASTAPI + PYDANTIC</span>
      </div>
      <svg viewBox="0 0 640 240" className="w-full h-auto text-text-primary">
        <defs>
          <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="emerald-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="amber-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--primary-accent)" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
        </defs>

        <style>{`
          .svg-node-h { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .svg-node-h:hover { transform: translateY(-2px); filter: drop-shadow(0 8px 16px rgba(0,0,0,0.03)); }
          .flow-line-h { stroke-dasharray: 6, 4; animation: flow-h 40s linear infinite; }
          @keyframes flow-h { to { stroke-dashoffset: -1000; } }
        `}</style>

        {/* Step 1: HTTP Client Request */}
        <g className="svg-node-h">
          <rect x="15" y="55" width="105" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="15" y="55" width="105" height="24" rx="12" fill="url(#primary-grad)" />
          <path d="M 15 79 L 120 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="25" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">01 // CLIENT</text>
          
          <text x="25" y="101" className="font-mono text-[9px] fill-text-primary font-bold">POST Request</text>
          <text x="25" y="117" className="font-mono text-[8px] fill-primary-accent font-bold">/v1/user</text>
          <text x="25" y="133" className="font-mono text-[8px] fill-text-secondary">Payload: JSON</text>
          <text x="25" y="149" className="font-mono text-[8px] fill-text-secondary">User-Agent: Client</text>
        </g>

        {/* Connection 1 ➔ 2 */}
        <path d="M 120 117 L 138 117" className="stroke-primary-accent flow-line-h" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 2: FastAPI Router / CORS Middleware */}
        <g className="svg-node-h">
          <rect x="138" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="138" y="55" width="110" height="24" rx="12" fill="url(#primary-grad)" />
          <path d="M 138 79 L 248 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="148" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">02 // FASTAPI</text>
          
          <text x="148" y="101" className="font-mono text-[9px] fill-text-primary font-bold">Router Match</text>
          <text x="148" y="117" className="font-mono text-[8px] fill-secondary-accent">async def...</text>
          <text x="148" y="133" className="font-mono text-[8px] fill-text-secondary">Auth JWT Check</text>
          <text x="148" y="149" className="font-mono text-[8px] fill-text-secondary">Thread Pool OS</text>
        </g>

        {/* Connection 2 ➔ 3 */}
        <path d="M 248 117 L 268 117" className="stroke-primary-accent flow-line-h" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 3: Pydantic Schema Validation */}
        <g className="svg-node-h">
          <rect x="268" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="268" y="55" width="110" height="24" rx="12" fill="url(#amber-grad-subtle)" />
          <path d="M 268 79 L 378 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="278" y="70" className="font-mono text-[9px] font-bold fill-amber-600 dark:fill-amber-400 uppercase tracking-wider">03 // PYDANTIC</text>
          
          <text x="278" y="101" className="font-mono text-[9px] fill-text-primary font-bold">Data Validation</text>
          <text x="278" y="117" className="font-mono text-[8px] fill-amber-600 dark:fill-amber-400 font-bold">Strict Type Guard</text>
          <text x="278" y="133" className="font-mono text-[8px] fill-text-secondary">Fail-fast (422)</text>
          <text x="278" y="149" className="font-mono text-[8px] fill-emerald-500 font-bold">Validated ✓</text>
        </g>

        {/* Connection 3 ➔ 4 */}
        <path d="M 378 117 L 398 117" className="stroke-emerald-500 flow-line-h" strokeWidth="1.2" markerEnd="url(#arrow-emerald)" />

        {/* Step 4: SQLAlchemy Async Sessions */}
        <g className="svg-node-h">
          <rect x="398" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="398" y="55" width="110" height="24" rx="12" fill="url(#primary-grad)" />
          <path d="M 398 79 L 508 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="408" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">04 // ORM</text>
          
          <text x="408" y="101" className="font-mono text-[9px] fill-text-primary font-bold">SQLAlchemy</text>
          <text x="408" y="117" className="font-mono text-[8px] fill-secondary-accent">async_session</text>
          <text x="408" y="133" className="font-mono text-[8px] fill-text-secondary">Transaction Map</text>
          <text x="408" y="149" className="font-mono text-[8px] fill-text-secondary">Engine Pool</text>
        </g>

        {/* Connection 4 ➔ 5 */}
        <path d="M 508 117 L 528 117" className="stroke-primary-accent flow-line-h" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 5: PostgreSQL ACID Transaction Commit */}
        <g className="svg-node-h">
          <rect x="528" y="55" width="95" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="528" y="55" width="95" height="24" rx="12" fill="url(#emerald-grad-subtle)" />
          <path d="M 528 79 L 623 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="538" y="70" className="font-mono text-[9px] font-bold fill-emerald-500 uppercase tracking-wider">05 // POSTGRES</text>
          
          <text x="538" y="101" className="font-mono text-[9px] fill-text-primary font-bold">ACID Commit</text>
          <text x="538" y="117" className="font-mono text-[8px] fill-emerald-500 font-bold">COMMIT SUCCESS</text>
          <text x="538" y="133" className="font-mono text-[8px] fill-text-secondary">State Persisted</text>
          <text x="538" y="149" className="font-mono text-[8px] fill-text-secondary">201 Created</text>
        </g>
      </svg>
      <div className="text-center font-mono text-[10px] text-text-secondary/70 mt-3.5 uppercase font-bold">
        End-to-end type safety mapping: client request ➔ async fastapi router ➔ schema validation ➔ model serialization
      </div>
    </div>
  );
}

function ServerlessIngestionDiagram() {
  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 sm:p-6 mt-6 shadow-2xs hover:shadow-xs transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/30 pb-2.5 mb-4 font-mono text-[10px] text-text-secondary">
        <span>ETL SERVERLESS PIPELINE // STREAM INGESTION</span>
        <span className="text-primary-accent font-bold">AWS DATA ARCHITECTURE</span>
      </div>
      <svg viewBox="0 0 640 240" className="w-full h-auto text-text-primary">
        <defs>
          <linearGradient id="blue-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="emerald-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="amber-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--primary-accent)" />
          </marker>
        </defs>

        <style>{`
          .svg-node-s { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .svg-node-s:hover { transform: translateY(-2px); filter: drop-shadow(0 8px 16px rgba(0,0,0,0.03)); }
          .flow-line-s { stroke-dasharray: 6, 4; animation: flow-s 40s linear infinite; }
          @keyframes flow-s { to { stroke-dashoffset: -1000; } }
        `}</style>

        {/* Step 1: EventBridge Cron */}
        <g className="svg-node-s">
          <rect x="15" y="55" width="105" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="15" y="55" width="105" height="24" rx="12" fill="url(#amber-grad-subtle)" />
          <path d="M 15 79 L 120 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="25" y="70" className="font-mono text-[9px] font-bold fill-amber-600 dark:fill-amber-400 uppercase tracking-wider">01 // TRIGGER</text>
          
          <text x="25" y="101" className="font-mono text-[9px] fill-text-primary font-bold">EventBridge</text>
          <text x="25" y="117" className="font-mono text-[8px] fill-amber-600 dark:fill-amber-400 font-bold">Hourly Cron</text>
          <text x="25" y="133" className="font-mono text-[8px] fill-text-secondary">Rule: rate(1 hr)</text>
          <text x="25" y="149" className="font-mono text-[8px] fill-text-secondary">JSON payload</text>
        </g>

        {/* Connection 1 ➔ 2 */}
        <path d="M 120 117 L 138 117" className="stroke-primary-accent flow-line-s" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 2: AWS Lambda Executing Python Script */}
        <g className="svg-node-s">
          <rect x="138" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="138" y="55" width="110" height="24" rx="12" fill="url(#blue-grad-subtle)" />
          <path d="M 138 79 L 248 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="148" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">02 // INGESTION</text>
          
          <text x="148" y="101" className="font-mono text-[9px] fill-text-primary font-bold">AWS Lambda (Py)</text>
          <text x="148" y="117" className="font-mono text-[8px] fill-secondary-accent font-bold">Container Exec</text>
          <text x="148" y="133" className="font-mono text-[8px] fill-text-secondary">Spotify API fetch</text>
          <text x="148" y="149" className="font-mono text-[8px] fill-text-secondary">Chunk Stream parsing</text>
        </g>

        {/* Connection 2 ➔ 3 */}
        <path d="M 248 117 L 268 117" className="stroke-primary-accent flow-line-s" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 3: Amazon S3 Parquet Lakehouse Data Partitioning */}
        <g className="svg-node-s">
          <rect x="268" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="268" y="55" width="110" height="24" rx="12" fill="url(#blue-grad-subtle)" />
          <path d="M 268 79 L 378 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="278" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">03 // STORAGE</text>
          
          <text x="278" y="101" className="font-mono text-[9px] fill-text-primary font-bold">Amazon S3 Lake</text>
          <text x="278" y="117" className="font-mono text-[8px] fill-primary-accent font-bold">Parquet Partition</text>
          <text x="278" y="133" className="font-mono text-[8px] fill-text-secondary">dt=YYYY-MM-DD</text>
          <text x="278" y="149" className="font-mono text-[8px] fill-text-secondary">Columnar format</text>
        </g>

        {/* Connection 3 ➔ 4 */}
        <path d="M 378 117 L 398 117" className="stroke-primary-accent flow-line-s" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 4: AWS Glue Catalog Discovery */}
        <g className="svg-node-s">
          <rect x="398" y="55" width="110" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="398" y="55" width="110" height="24" rx="12" fill="url(#blue-grad-subtle)" />
          <path d="M 398 79 L 508 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="408" y="70" className="font-mono text-[9px] font-bold fill-primary-accent uppercase tracking-wider">04 // CATALOG</text>
          
          <text x="408" y="101" className="font-mono text-[9px] fill-text-primary font-bold">AWS Glue Crawler</text>
          <text x="408" y="117" className="font-mono text-[8px] fill-secondary-accent">Schema Detection</text>
          <text x="408" y="133" className="font-mono text-[8px] fill-text-secondary">Update partition</text>
          <text x="408" y="149" className="font-mono text-[8px] fill-text-secondary">Glue Meta Data catalog</text>
        </g>

        {/* Connection 4 ➔ 5 */}
        <path d="M 508 117 L 528 117" className="stroke-primary-accent flow-line-s" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Step 5: AWS Athena Querying */}
        <g className="svg-node-s">
          <rect x="528" y="55" width="95" height="125" rx="12" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="528" y="55" width="95" height="24" rx="12" fill="url(#emerald-grad-subtle)" />
          <path d="M 528 79 L 623 79" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <text x="538" y="70" className="font-mono text-[9px] font-bold fill-emerald-500 uppercase tracking-wider">05 // QUERY</text>
          
          <text x="538" y="101" className="font-mono text-[9px] fill-text-primary font-bold">AWS Athena</text>
          <text x="538" y="117" className="font-mono text-[8px] fill-emerald-500 font-bold">Serverless SQL</text>
          <text x="538" y="133" className="font-mono text-[8px] fill-text-secondary">Ad-hoc Analytics</text>
          <text x="538" y="149" className="font-mono text-[8px] fill-text-secondary">Pay-per-query</text>
        </g>
      </svg>
      <div className="text-center font-mono text-[10px] text-text-secondary/70 mt-3.5 uppercase font-bold">
        Spotify Serverless Stream Pipeline: Event scheduling ➔ stream parsing ➔ partitioned S3 storage ➔ metadata crawler
      </div>
    </div>
  );
}

function SemanticRagDiagram() {
  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 sm:p-6 mt-6 shadow-2xs hover:shadow-xs transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/30 pb-2.5 mb-4 font-mono text-[10px] text-text-secondary">
        <span>RAG SEMANTIC RETRIEVAL // DOCUMENT GROUNDING</span>
        <span className="text-primary-accent font-bold">VECTOR EMBEDDING WORKFLOW</span>
      </div>
      <svg viewBox="0 0 640 320" className="w-full h-auto text-text-primary">
        <defs>
          <linearGradient id="blue-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="emerald-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="amber-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--primary-accent)" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
          </marker>
        </defs>

        <style>{`
          .svg-node-r { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .svg-node-r:hover { transform: translateY(-1.5px); filter: drop-shadow(0 10px 18px rgba(0,0,0,0.03)); }
          .flow-line-r { stroke-dasharray: 6, 4; animation: flow-r 35s linear infinite; }
          @keyframes flow-r { to { stroke-dashoffset: -1000; } }
        `}</style>

        {/* Lane 1: Cold Document Ingestion Pipeline */}
        <rect x="15" y="15" width="460" height="130" rx="12" className="fill-slate-50/10 dark:fill-slate-900/10 stroke-slate-200/60 dark:stroke-slate-800/40" strokeWidth="1" />
        <text x="30" y="35" className="font-mono text-[8px] font-bold fill-primary-accent uppercase tracking-widest">PROCESS 01 // HIGH-FIDELITY DOCUMENT INDEXING</text>

        {/* PDF Block */}
        <g className="svg-node-r">
          <rect x="30" y="50" width="115" height="75" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="30" y="50" width="115" height="20" rx="8" fill="url(#blue-grad-r)" />
          <text x="40" y="63" className="font-mono text-[9px] font-bold fill-primary-accent">1A // SEC FILING PDF</text>
          <text x="40" y="88" className="font-mono text-[9px] fill-text-primary font-bold">Financial Statement</text>
          <text x="40" y="104" className="font-mono text-[8px] fill-text-secondary">Unstructured text layers</text>
        </g>

        {/* Arrow 1A ➔ 1B */}
        <path d="M 145 88 L 165 88" className="stroke-primary-accent flow-line-r" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Semantic Chunking Block */}
        <g className="svg-node-r">
          <rect x="165" y="50" width="130" height="75" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="165" y="50" width="130" height="20" rx="8" fill="url(#amber-grad-r)" />
          <text x="175" y="63" className="font-mono text-[9px] font-bold fill-amber-600 dark:fill-amber-400">1B // SPLITTER</text>
          <text x="175" y="88" className="font-mono text-[9px] fill-text-primary font-bold">Semantic Chunking</text>
          <text x="175" y="104" className="font-mono text-[8px] fill-amber-600 dark:fill-amber-400 font-bold">Recursive Parser</text>
        </g>

        {/* Arrow 1B ➔ 1C */}
        <path d="M 295 88 L 315 88" className="stroke-primary-accent flow-line-r" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Text Embeddings calculation block */}
        <g className="svg-node-r">
          <rect x="315" y="50" width="140" height="75" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="315" y="50" width="140" height="20" rx="8" fill="url(#blue-grad-r)" />
          <text x="325" y="63" className="font-mono text-[9px] font-bold fill-primary-accent">1C // EMBEDDING</text>
          <text x="325" y="88" className="font-mono text-[9px] fill-text-primary font-bold">text-embedding-3</text>
          <text x="325" y="104" className="font-mono text-[8px] fill-text-secondary">1536-Dimensional Vector</text>
        </g>

        {/* Curve Connection 1C ➔ DB */}
        <path d="M 455 88 Q 500 88 500 135" className="stroke-primary-accent fill-none" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* PGVector Database Storage (Right block) */}
        <g className="svg-node-r">
          <rect x="500" y="90" width="125" height="135" rx="12" className="fill-card-bg stroke-emerald-500/30 dark:stroke-emerald-500/10" strokeWidth="1.5" />
          <rect x="500" y="90" width="125" height="24" rx="12" fill="url(#emerald-grad-r)" />
          <path d="M 500 114 L 625 114" className="stroke-emerald-500/20" strokeWidth="1" />
          <text x="510" y="105" className="font-mono text-[9px] font-bold fill-emerald-500 uppercase tracking-wider">PGVECTOR STORE</text>
          
          <text x="510" y="133" className="font-mono text-[9px] fill-text-primary font-bold">HNSW Graph Index</text>
          <text x="510" y="149" className="font-mono text-[8px] fill-text-secondary">Coordinate Nodes</text>
          <text x="510" y="165" className="font-mono text-[8px] fill-emerald-500 font-bold">Cosine distance</text>
          <text x="510" y="181" className="font-mono text-[7.5px] fill-text-secondary font-mono">[0.124, -0.92, ...]</text>
          <text x="510" y="197" className="font-mono text-[8px] fill-text-secondary">Metadata grounding</text>
        </g>

        {/* Lane 2: Real-time Grounded Query Loop */}
        <rect x="15" y="165" width="460" height="140" rx="12" className="fill-slate-50/10 dark:fill-slate-900/10 stroke-slate-200/60 dark:stroke-slate-800/40" strokeWidth="1" />
        <text x="30" y="185" className="font-mono text-[8px] font-bold fill-amber-600 dark:fill-amber-400 uppercase tracking-widest">PROCESS 02 // DYNAMIC QUERY RETRIEVAL & GROUNDING</text>

        {/* User Query Block */}
        <g className="svg-node-r">
          <rect x="30" y="200" width="115" height="80" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="30" y="200" width="115" height="20" rx="8" fill="url(#blue-grad-r)" />
          <text x="40" y="213" className="font-mono text-[9px] font-bold fill-primary-accent">2A // USER QUERY</text>
          <text x="40" y="238" className="font-mono text-[9px] fill-text-primary font-bold">"What is Q3 ARR?"</text>
          <text x="40" y="254" className="font-mono text-[8px] fill-text-secondary">Natural language</text>
        </g>

        {/* Arrow 2A ➔ 2B */}
        <path d="M 145 240 L 165 240" className="stroke-primary-accent flow-line-r" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Vector Similarity Query Block */}
        <g className="svg-node-r">
          <rect x="165" y="200" width="130" height="80" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="165" y="200" width="130" height="20" rx="8" fill="url(#blue-grad-r)" />
          <text x="175" y="213" className="font-mono text-[9px] font-bold fill-primary-accent">2B // VECTOR SEARCH</text>
          <text x="175" y="238" className="font-mono text-[9px] fill-text-primary font-bold">Similarity Query</text>
          <text x="175" y="254" className="font-mono text-[8px] fill-primary-accent">Cosine Similarity</text>
        </g>

        {/* Arrow 2B ➔ PGVector */}
        <path d="M 295 240 L 490 240" className="stroke-primary-accent flow-line-r" strokeWidth="1.2" markerEnd="url(#arrow-blue)" strokeDasharray="3,3" />
        <text x="325" y="232" className="font-mono text-[7px] fill-primary-accent font-bold uppercase tracking-wider">ANN Nearest Search</text>

        {/* Return matched Context from PGVector ➔ Prompt Synthesis */}
        <path d="M 500 200 L 420 200 Q 400 200 400 220 L 400 230" className="stroke-emerald-500 fill-none" strokeWidth="1.2" markerEnd="url(#arrow-emerald)" />
        <text x="340" y="193" className="font-mono text-[7px] fill-emerald-500 font-bold uppercase tracking-wider">Grounded Context</text>

        {/* Prompt Synthesis Block */}
        <g className="svg-node-r">
          <rect x="345" y="230" width="115" height="50" rx="8" className="fill-card-bg stroke-emerald-500/30 dark:stroke-emerald-500/10" strokeWidth="1" />
          <rect x="345" y="230" width="115" height="14" rx="8" fill="url(#emerald-grad-r)" />
          <text x="353" y="241" className="font-mono text-[8px] font-bold fill-emerald-500">2C // SYNTHESIS</text>
          <text x="353" y="257" className="font-mono text-[8.5px] fill-text-primary font-bold">Context Grounded</text>
          <text x="353" y="269" className="font-mono text-[7px] fill-text-secondary">Synthesized Output</text>
        </g>
      </svg>
      <div className="text-center font-mono text-[10px] text-text-secondary/70 mt-3.5 uppercase font-bold">
        Advanced Retrieval loop: documents split semantically ➔ indexed in vector database ➔ nearest-neighbor query validation
      </div>
    </div>
  );
}

function MultiAgentDiagram() {
  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-4 sm:p-6 mt-6 shadow-2xs hover:shadow-xs transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/30 pb-2.5 mb-4 font-mono text-[10px] text-text-secondary">
        <span>STATE-MACHINE AGENTIC WORKFLOW // LANGGRAPH</span>
        <span className="text-primary-accent font-bold">COGNITIVE MULTI-AGENT LOOP</span>
      </div>
      <svg viewBox="0 0 640 320" className="w-full h-auto text-text-primary">
        <defs>
          <linearGradient id="blue-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="emerald-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="amber-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.01" />
          </linearGradient>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--primary-accent)" />
          </marker>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
          </marker>
        </defs>

        <style>{`
          .svg-node-a { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .svg-node-a:hover { transform: translateY(-1.5px); filter: drop-shadow(0 10px 18px rgba(0,0,0,0.03)); }
          .flow-line-a { stroke-dasharray: 6, 4; animation: flow-a 35s linear infinite; }
          @keyframes flow-a { to { stroke-dashoffset: -1000; } }
        `}</style>

        {/* Left Block: User Goal */}
        <g className="svg-node-a">
          <rect x="20" y="125" width="110" height="70" rx="8" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="20" y="125" width="110" height="18" rx="8" fill="url(#blue-grad-a)" />
          <text x="28" y="137" className="font-mono text-[8px] font-bold fill-primary-accent">01 // USER INPUT</text>
          <text x="28" y="157" className="font-mono text-[9px] fill-text-primary font-bold">Goal / Objective</text>
          <text x="28" y="172" className="font-mono text-[8px] fill-text-secondary">"Extract Q3 data"</text>
          <text x="28" y="184" className="font-mono text-[7px] fill-text-secondary">LangGraph Entry</text>
        </g>

        {/* Connection User ➔ Planner */}
        <path d="M 130 160 L 175 160" className="stroke-primary-accent flow-line-a" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Agent 1: Planner Agent (Top Middle) */}
        <g className="svg-node-a">
          <rect x="175" y="35" width="135" height="75" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="175" y="35" width="135" height="20" rx="10" fill="url(#blue-grad-a)" />
          <text x="185" y="48" className="font-mono text-[9px] font-bold fill-primary-accent">02 // PLANNER AGENT</text>
          <text x="185" y="71" className="font-mono text-[9px] fill-text-primary font-bold">Deconstructs Goal</text>
          <text x="185" y="85" className="font-mono text-[8px] fill-text-secondary">Formulates sub-tasks</text>
          <text x="185" y="97" className="font-mono text-[7.5px] fill-text-secondary">Dynamic Task Schema</text>
        </g>

        {/* Connection Planner ➔ Executor */}
        <path d="M 310 72 Q 380 72 380 125" className="stroke-primary-accent fill-none flow-line-a" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Agent 2: Tool Executor (Middle Right) */}
        <g className="svg-node-a">
          <rect x="345" y="125" width="135" height="75" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="345" y="125" width="135" height="20" rx="10" fill="url(#blue-grad-a)" />
          <text x="355" y="138" className="font-mono text-[9px] font-bold fill-primary-accent">03 // TOOL EXECUTOR</text>
          <text x="355" y="161" className="font-mono text-[9px] fill-text-primary font-bold">Invokes SQL & APIs</text>
          <text x="355" y="175" className="font-mono text-[8px] fill-text-secondary">Retrieves dynamic data</text>
          <text x="355" y="187" className="font-mono text-[7.5px] fill-text-secondary">Function Checkpoint</text>
        </g>

        {/* Connection Executor ➔ Validator */}
        <path d="M 412 200 Q 412 252 310 252" className="stroke-primary-accent fill-none flow-line-a" strokeWidth="1.2" markerEnd="url(#arrow-blue)" />

        {/* Agent 3: Validator / Critic (Bottom Middle) */}
        <g className="svg-node-a">
          <rect x="175" y="215" width="135" height="75" rx="10" className="fill-card-bg stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
          <rect x="175" y="215" width="135" height="20" rx="10" fill="url(#amber-grad-a)" />
          <text x="185" y="228" className="font-mono text-[9px] font-bold fill-amber-600 dark:fill-amber-400">04 // VALIDATOR AGENT</text>
          <text x="185" y="251" className="font-mono text-[9px] fill-text-primary font-bold">Audits Hallucinations</text>
          <text x="185" y="265" className="font-mono text-[8px] fill-amber-600 dark:fill-amber-400 font-bold">Strict Schema Check</text>
          <text x="185" y="277" className="font-mono text-[7.5px] fill-text-secondary">Pass/Fail verification</text>
        </g>

        {/* STATE SELF-CORRECTION LOOP: Validator ➔ Planner (Dashed path indicating self-correction feedback loop) */}
        <path d="M 242 215 L 242 110" className="stroke-amber-600/80 dark:stroke-amber-400/80 fill-none" strokeWidth="1.2" strokeDasharray="3,3" markerEnd="url(#arrow-amber)" />
        <text x="250" y="160" className="font-mono text-[7.5px] fill-amber-600 dark:fill-amber-400 font-bold uppercase tracking-wider">Critique & Self-Correction</text>

        {/* Connection Validator ➔ Output */}
        <path d="M 310 252 Q 530 252 530 195" className="stroke-emerald-500 fill-none" strokeWidth="1.2" markerEnd="url(#arrow-emerald)" />
        <text x="355" y="244" className="font-mono text-[7.5px] fill-emerald-500 font-bold uppercase tracking-wider">If Schema Compliant</text>

        {/* Compliant Structured Output (Right Block) */}
        <g className="svg-node-a">
          <rect x="505" y="125" width="115" height="70" rx="8" className="fill-card-bg stroke-emerald-500/30 dark:stroke-emerald-500/10" strokeWidth="1.5" />
          <rect x="505" y="125" width="115" height="18" rx="8" fill="url(#emerald-grad-a)" />
          <text x="513" y="137" className="font-mono text-[8px] font-bold fill-emerald-500">05 // COMPLIANT OUT</text>
          <text x="513" y="157" className="font-mono text-[9px] fill-text-primary font-bold">Structured Report</text>
          <text x="513" y="172" className="font-mono text-[8px] fill-emerald-500 font-bold">100% VALIDATED ✓</text>
          <text x="513" y="184" className="font-mono text-[7px] fill-text-secondary">Output Node Commit</text>
        </g>
      </svg>
      <div className="text-center font-mono text-[10px] text-text-secondary/70 mt-3.5 uppercase font-bold">
        Stateful LangGraph planning cycle: Planner tasking ➔ Executor querying ➔ Validator audit ➔ self-correction feedback routing
      </div>
    </div>
  );
}

function renderStageVisualizer(stageId: number) {
  switch (stageId) {
    case 1:
      return <FoundationsDiagram />;
    case 2:
      return <BackendApiDiagram />;
    case 3:
      return <ServerlessIngestionDiagram />;
    case 4:
      return <SemanticRagDiagram />;
    case 5:
      return <MultiAgentDiagram />;
    default:
      return null;
  }
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function EngineeringJourney() {
  return (
    <section 
      id="journey" 
      className="py-14 sm:py-24 bg-primary-bg relative overflow-hidden transition-colors duration-300 border-b border-border-subtle"
    >
      <div className="absolute inset-0 tech-dot-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none bg-radial from-primary-accent/3 to-transparent filter blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none bg-radial from-secondary-accent/3 to-transparent filter blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        <div id="journey-header" className="text-center mb-16 sm:mb-24">
          <p className="text-section-subtitle mb-3">
            01 // INTENTIONAL EVOLUTION
          </p>
          <h2 className="text-section-title">
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Roadmap</span>
          </h2>
          <p className="text-body-comfortable max-w-3xl mt-4 mx-auto">
            My career transition from absolute computing and relational database foundations into high-throughput backend APIs, serverless cloud ingestion, and stateful autonomous AI agent architectures.
          </p>
          <div className="h-[3px] w-24 bg-gradient-to-r from-primary-accent to-secondary-accent mt-5 rounded-full mx-auto" />
        </div>

        <div className="relative pl-10 sm:pl-16 space-y-16">
          
          <div className="absolute left-[20px] sm:left-[24px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary-accent via-violet-500 to-emerald-400 opacity-40" />

          {stagesData.map((stage) => {
            const IconComponent = stageIcons[stage.id] || Code;
            
            return (
              <div
                key={stage.id}
                className="relative group scroll-mt-28 text-left"
              >
                {/* Node Milestone Icon */}
                <div className="absolute left-[-20px] sm:left-[-40px] top-4 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 -translate-x-1/2 rounded-full border border-border-subtle bg-card-bg text-text-secondary shadow-xs transition-all duration-300 group-hover:border-primary-accent group-hover:text-primary-accent group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(var(--primary-accent-rgb),0.12)]">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Card Container */}
                <div
                  className="p-6 sm:p-8 md:p-10 rounded-3xl border border-border-subtle/40 bg-card-bg/20 hover:bg-card-bg hover:border-primary-accent/20 hover:shadow-lg transition-all duration-300 transform-gpu will-change-transform hover:scale-[1.005]"
                >
                  {/* Meta Subtitle & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-text-secondary font-bold">
                      {stage.subtitle}
                    </span>
                    <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full uppercase bg-slate-100 dark:bg-slate-800/80 text-text-secondary border border-border-subtle font-bold">
                      {stage.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="card-title-comfortable flex items-center gap-2">
                    {stage.title}
                    <Sparkles className="w-4 h-4 text-primary-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </h3>

                  {/* General Phase Description */}
                  <p className="mt-4 text-desc-comfortable leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Clean Visual Architecture Diagram */}
                  {renderStageVisualizer(stage.id)}

                  {/* The Storytelling Segment (What I Learned -> What I Built -> Step Stone) */}
                  <div className="mt-8 pt-6 border-t border-border-subtle/30 space-y-5">
                    <div>
                      <h4 className="font-display text-xs font-bold text-primary-accent uppercase tracking-wider flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-accent" />
                        01 // WHAT I LEARNED
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed pl-3.5">
                        {stage.story.learned}
                      </p>
                    </div>

                    <div className="border-l border-dashed border-border-subtle pl-4 py-1 ml-1">
                      <h4 className="font-display text-xs font-bold text-secondary-accent uppercase tracking-wider flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary-accent" />
                        02 // WHAT I BUILT
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {stage.story.built}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        03 // HOW IT PREPARED ME FOR THE NEXT STEP
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-text-secondary leading-relaxed pl-3.5">
                        {stage.story.bridge}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills Footer */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border-subtle/30">
                    {stage.techs.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-border-subtle text-text-secondary font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
