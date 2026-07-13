import React, { useState } from 'react';
import { 
  Code, Database, Server, Play, CheckCircle, Sparkles, 
  Workflow, Bot, Search, GitBranch, RefreshCw, Layers, 
  Shield, ChevronRight, Send
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  techs: string[];
}

const stagesData: Stage[] = [
  {
    id: 1,
    title: "Learning Foundations",
    subtitle: "01 // COGNITIVE BEGINNINGS",
    badge: "Foundations",
    description: "Developing robust fundamental problem-solving skills. Mastering relational algebra, data normalization, and standard OOP principles that form the absolute bedrock of sustainable backend logic.",
    techs: ["Python", "PostgreSQL", "OOP", "Data Structures"]
  },
  {
    id: 2,
    title: "Building Software",
    subtitle: "02 // BACKEND EXCELLENCE",
    badge: "API Architecture",
    description: "Moving from scripts to scalable production applications. Architecting type-safe backends with strict request-response validations using Pydantic, async SQLAlchemy, and modular routers.",
    techs: ["FastAPI", "RESTful APIs", "Pydantic", "SQLAlchemy"]
  },
  {
    id: 3,
    title: "Enterprise Engineering",
    subtitle: "03 // SYSTEM RELIABILITY",
    badge: "Scale & Testing",
    description: "Formulating enterprise-grade system workflows. Implementing strict unit test coverage, CI/CD automated deployment runner matrices, containerization, and async processing worker queues.",
    techs: ["Docker", "Pytest", "GitHub Actions", "Redis Queues"]
  },
  {
    id: 4,
    title: "Exploring AI",
    subtitle: "04 // KNOWLEDGE GROUNDING",
    badge: "Semantic RAG",
    description: "Entering the world of Natural Language Processing and LLM interfaces. Crafting document segmentation layers, computing high-dimensional text embeddings, and setting up contextually relevant Vector databases.",
    techs: ["LangChain", "Vector DBs", "Pinecone", "Embeddings"]
  },
  {
    id: 5,
    title: "Intelligent Systems",
    subtitle: "05 // HYBRID INTEGRATION",
    badge: "Contextual Chains",
    description: "Building systems that connect the real world to AI models. Creating complex, reliable multi-step execution chains that inject database lookups and API parameters into generative contexts on the fly.",
    techs: ["Context Engines", "Gemini API", "Chains", "State Guarding"]
  },
  {
    id: 6,
    title: "Agentic AI",
    subtitle: "06 // AUTONOMOUS WORKFLOWS",
    badge: "Orchestration",
    description: "Designing self-directed systems that reason. Structuring autonomous planning loops, recursive reflection, tool access permissions, and automated self-correction blocks for complex workflows.",
    techs: ["Agent Loops", "Tool Calling", "ReAct Framework", "Self-Correction"]
  },
  {
    id: 7,
    title: "The Future",
    subtitle: "07 // ENTERPRISE IMPACT",
    badge: "Capital Minds AI",
    description: "Shaping the frontier of enterprise intelligence. Developing Capital Minds AI, focusing on local private hosting solutions, strict data privacy protocols, agentic market research, and high-ROI systems.",
    techs: ["Capital Minds AI", "Local-First LLMs", "Enterprise ROI", "Data Security"]
  }
];

const stageIcons: Record<number, React.ComponentType<any>> = {
  1: Database,
  2: Server,
  3: Shield,
  4: Search,
  5: Layers,
  6: Bot,
  7: Sparkles
};

// ==========================================
// STAGE-SPECIFIC INTERACTIVE SUB-COMPONENTS
// ==========================================

function DatabaseSandbox() {
  const [sqlQuery, setSqlQuery] = useState("SELECT name, skills FROM engineers WHERE role = 'AI';");
  const [sqlResults, setSqlResults] = useState<any[]>([
    { name: "Rajat Krishnan", skills: "FastAPI, Pytest, Docker, AI" },
    { name: "Agent Alpha", skills: "Autonomous Planning, Vector DBs" }
  ]);
  const [sqlLoading, setSqlLoading] = useState(false);
  const [oopOutput, setOopOutput] = useState('');

  const executeSQL = (queryText: string) => {
    setSqlLoading(true);
    setSqlResults([]);
    setOopOutput('');
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
    }, 500);
  };

  const simulateOOP = () => {
    setSqlResults([]);
    setOopOutput("Initializing classes...\n");
    setTimeout(() => {
      setOopOutput(prev => prev + "class Engineer:\n   def __init__(self, name):\n       self.name = name\n       self.stack = []\n");
    }, 250);
    setTimeout(() => {
      setOopOutput(prev => prev + "\n>>> rajat = Engineer('Rajat')\n>>> rajat.add_skill('Agentic AI')\n>>> print(f'{rajat.name} specializing in {rajat.stack[0]}')\n");
    }, 700);
    setTimeout(() => {
      setOopOutput(prev => prev + "Output: Rajat specializing in Agentic AI ✅\n");
    }, 1100);
  };

  return (
    <div className="rounded-2xl bg-[#050b1d] border border-[#1e3a8a]/20 font-mono text-slate-300 flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex items-center justify-between border-b border-[#1e3a8a]/10 pb-2 mb-3">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
            <Database className="w-3.5 h-3.5 text-blue-400" /> interactive_postgre.sql
          </span>
          <span className="text-[9px] text-[#38bdf8] bg-[#38bdf8]/10 px-1.5 py-0.5 rounded border border-[#38bdf8]/10">SCHEMA: ACADEMIC_PROD</span>
        </div>

        <div className="flex gap-1.5 mb-3 flex-wrap">
          <button 
            onClick={() => executeSQL("SELECT name, skills FROM engineers WHERE role = 'AI';")}
            className="px-2 py-0.5 rounded text-[9px] bg-[#1e3a8a]/20 hover:bg-[#1e3a8a]/40 border border-[#1e3a8a]/40 text-blue-300 font-bold cursor-pointer transition-all"
          >
            Preset 1: AI Query
          </button>
          <button 
            onClick={() => executeSQL("SELECT name, role, status FROM active_pipelines;")}
            className="px-2 py-0.5 rounded text-[9px] bg-[#1e3a8a]/20 hover:bg-[#1e3a8a]/40 border border-[#1e3a8a]/40 text-blue-300 font-bold cursor-pointer transition-all"
          >
            Preset 2: Node Status
          </button>
          <button 
            onClick={simulateOOP}
            className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 font-bold cursor-pointer transition-all"
          >
            Simulate OOP class
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-1 bg-slate-950/80 p-2 rounded border border-[#1e3a8a]/10">
            <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
            <span className="text-xs text-slate-200 select-all font-bold break-all whitespace-pre-wrap leading-relaxed">{sqlQuery}</span>
          </div>

          {sqlLoading ? (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-2">
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
}

function ApiPlayground() {
  const [endpointParam, setEndpointParam] = useState('capital_analyzer');
  const [apiResponse, setApiResponse] = useState<any>({
    status_code: 200,
    latency_ms: 18.4,
    headers: {
      "content-type": "application/json",
      "server": "uvicorn/fastapi"
    },
    payload: {
      agent_triggered: "capital_analyzer",
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
  const [apiLoading, setApiLoading] = useState(false);

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
          "server": "uvicorn/fastapi"
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
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-[#090d16] border border-violet-500/20 font-sans flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/30 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[10px] font-mono text-slate-400 break-all font-semibold">FASTAPI SWAGGER DOCS PLAYGROUND (v1.2)</span>
          </div>
          <span className="text-[9px] font-mono text-violet-400 font-semibold bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10 shrink-0">async uvicorn</span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-border-subtle/40">
            <div className="flex items-center gap-2 flex-grow min-w-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-white shrink-0">POST</span>
              <span className="font-mono text-[11px] sm:text-xs text-slate-300 font-semibold truncate">/api/v1/agents/trigger</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-800">
                <span className="text-purple-400 font-bold font-mono">id:</span>
                <input 
                  type="text" 
                  value={endpointParam} 
                  onChange={(e) => setEndpointParam(e.target.value)}
                  className="bg-transparent text-slate-200 w-20 sm:w-24 outline-none border-none font-bold font-mono"
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

          {apiLoading ? (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-2 font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-400" /> Sending request headers, validating schemas...
            </div>
          ) : apiResponse ? (
            <div className="p-3 rounded-xl bg-slate-950 text-[10px] font-mono text-slate-300 border border-border-subtle/30 leading-relaxed overflow-y-auto max-h-[170px]">
              <div className="flex justify-between border-b border-border-subtle/10 pb-1 mb-2 text-[9px] text-slate-500">
                <span>HTTP/1.1 {apiResponse.status_code} OK</span>
                <span className="text-emerald-400 font-bold">Latency: {apiResponse.latency_ms}ms</span>
              </div>
              <pre className="text-blue-300 font-bold">{JSON.stringify(apiResponse.payload, null, 2)}</pre>
            </div>
          ) : (
            <p className="text-[10px] text-slate-500 italic text-center pt-4 font-mono">
              Click the Send button above to hit the FastAPI trigger route and evaluate Pydantic validations.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-subtle/30 pt-2 mt-3 text-[9px] text-slate-500 font-mono">
        <span>Throughput: ~14.2K req/sec</span>
        <span>Framework: FastAPI (v0.110.0)</span>
      </div>
    </div>
  );
}

function PipelineSimulator() {
  const [buildLogs, setBuildLogs] = useState<string[]>([
    "[Job Initialized] Spinning up virtual execution runner...",
    "▶ Running lint checks: black --check src/ & isort --check-only src/",
    "✔ Styling checks passed. Running static analysis: mypy src/",
    "✔ Typings evaluated. Running unit tests: pytest tests/ -v",
    "▶ 42 Unit tests completed successfully with 100% test coverage.",
    "⚡ Building secure Docker artifact. Pushed to container registry: build_success_tag ✅"
  ]);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'running' | 'success'>('success');
  const [buildProgress, setBuildProgress] = useState(100);

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
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="rounded-2xl bg-[#040813] border border-violet-500/20 font-mono text-slate-300 flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/20 pb-2 mb-3">
          <span className="text-[10px] text-slate-500 flex items-center gap-1.5 shrink-0 font-semibold">
            <GitBranch className="w-3.5 h-3.5 text-violet-400 animate-pulse" /> github_ci_runner.yml
          </span>
          <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10 shrink-0 font-semibold">Actions Node</span>
        </div>

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
              <span className="text-[9px] text-emerald-500 font-semibold font-sans">Pytest</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${buildProgress >= 100 ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                <Server className="w-4 h-4" />
              </div>
              <span className="text-[9px] text-slate-500">Deploy</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/95 rounded-xl p-3 border border-border-subtle/20 text-[9px] text-left space-y-1.5 h-[120px] overflow-y-auto font-mono">
          {buildLogs.map((log, lIdx) => (
            <p key={lIdx} className={log.includes('✔') || log.includes('✅') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
              {log}
            </p>
          ))}
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
}

function RagSearch() {
  const [ragQuery, setRagQuery] = useState('Enterprise autonomous roadmap');
  const [ragResult, setRagResult] = useState<any>({
    query_vector_dimensions: 1536,
    top_similarity_score: 0.942,
    context_chunks_retrieved: [
      {
        id: "doc_chunk_32a",
        text: "Rajat Krishnan transitioned into AI & Systems. Core experience focus: Python-driven multi-agent workflows, highly optimized FastAPI backends, and modular local generative AI deployments."
      }
    ],
    synthesis: "Based on highly grounded database records, Rajat is a seasoned AI & Systems Engineer with profound capabilities spanning FastAPI, Docker workflows, LangChain semantic systems, and production multi-agent design."
  });
  const [ragLoading, setRagLoading] = useState(false);

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
            text: `Rajat Krishnan transitioned into AI & Systems. Core experience focus: Python-driven multi-agent workflows, highly optimized FastAPI backends, and modular local generative AI deployments matching query: "${ragQuery}".`
          }
        ],
        synthesis: `Based on highly grounded database records, the retrieval engine has analyzed query: "${ragQuery}" and verified that Rajat is a seasoned AI & Systems Engineer with profound capabilities spanning FastAPI, Docker workflows, LangChain semantic systems, and production multi-agent design.`
      });
    }, 600);
  };

  return (
    <div className="rounded-2xl bg-[#040813] border border-purple-500/20 font-mono text-slate-300 flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-2 mb-3 font-mono">
          <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0 font-semibold">
            <Workflow className="w-3.5 h-3.5 text-purple-400" /> document_semantic_rag.py
          </span>
          <span className="text-[9px] text-purple-400 bg-purple-400/5 px-2 py-0.5 rounded border border-purple-400/10 shrink-0 font-semibold">Vector Dimension: 1536</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-grow flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-border-subtle/40 min-w-0">
            <Search className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <input 
              type="text" 
              value={ragQuery} 
              onChange={(e) => setRagQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none border-none font-semibold w-full font-mono"
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

        {ragLoading ? (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic pt-4 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" /> Slicing documents, mapping embeddings index...
          </div>
        ) : ragResult ? (
          <div className="space-y-2.5 font-mono">
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div className="p-2 rounded bg-slate-950 border border-purple-500/10">
                <span className="block text-slate-500 font-bold">TOP METRIC SCORE</span>
                <span className="text-emerald-400 font-bold text-xs">{ragResult.top_similarity_score} Match</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-purple-500/10">
                <span className="block text-slate-500 font-bold">SOURCE CHUNKS</span>
                <span className="text-purple-400 font-bold text-xs">1 Context Snippet</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-[#1e3a8a]/10 max-h-[90px] overflow-y-auto text-[9px] space-y-1.5 leading-normal">
              <p className="text-purple-300 font-bold">Evaluated Context Chunk:</p>
              <p className="text-slate-400 italic">"{ragResult.context_chunks_retrieved[0].text}"</p>
              <p className="text-emerald-400 font-bold pt-1">Grounding Response Synthesized:</p>
              <p className="text-slate-200">{ragResult.synthesis}</p>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-slate-500 italic text-center pt-4 font-mono">
            Submit a query to evaluate vector database search and grounded prompt synthesis.
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-500/20 pt-2 mt-3 text-[9px] text-slate-500 font-mono">
        <span className="shrink-0">Database: Pinecone Storage</span>
        <span className="shrink-0">Model: text-embedding-3-small</span>
      </div>
    </div>
  );
}

function ChainRunner() {
  const [chainInput, setChainInput] = useState('Draft an AI strategy memo');
  const [chainLogs, setChainLogs] = useState<string[]>([
    "[Step 1] Receieved user instruction: Draft an AI strategy memo",
    "[Step 2] Contacting DB: Fetching candidate timeline & enterprise experience parameters...",
    "[Step 3] Contacting GitHub API: Hydrating real-time contributions metric data...",
    "[Step 4] Injecting context variables into Gemini System prompt template...",
    "[Step 5] Grounding verified. Requesting generation...",
    "Result synthesized successfully: Candidate's portfolio timeline and activity validated. Ready for deployment pipeline! ✅"
  ]);
  const [chainRunning, setChainRunning] = useState(false);

  const runContextChain = () => {
    setChainRunning(true);
    setChainLogs(["[Step 1] Receieved user instruction: " + chainInput]);
    
    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 2] Contacting DB: Fetching candidate data..."]);
    }, 500);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 3] Contacting GitHub API: Hydrating contributions..."]);
    }, 1000);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "[Step 4] Injecting variables into system template...", "[Step 5] Requesting generation..."]);
    }, 1500);

    setTimeout(() => {
      setChainLogs(prev => [...prev, "Result synthesized successfully: Activity validated and ready! ✅"]);
      setChainRunning(false);
    }, 2000);
  };

  return (
    <div className="rounded-2xl bg-[#090d16] border border-pink-500/20 font-sans flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/30 pb-2 mb-3">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 font-semibold">CONTEXT_ENRICHMENT_API_ROUTING</span>
          <span className="text-[9px] font-mono text-pink-400 bg-pink-400/5 px-2 py-0.5 rounded border border-pink-500/10 shrink-0 font-semibold">Chain Execution</span>
        </div>

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

          <div className="bg-slate-950 p-2.5 rounded-xl border border-pink-500/10 font-mono text-[9px] text-left leading-relaxed space-y-1.5 h-[110px] overflow-y-auto">
            {chainLogs.map((log, lIdx) => (
              <p key={lIdx} className={log.includes('successfully') || log.includes('validated') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                ▶ {log}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle/30 pt-2 mt-3 text-[9px] text-slate-500 font-mono">
        <span className="shrink-0">Token Matrix: 100% Deterministic Variables</span>
        <span className="shrink-0">Model Integration: Gemini 1.5 Flash</span>
      </div>
    </div>
  );
}

function AgentSandbox() {
  const [agentObjective, setAgentObjective] = useState('Analyze market competitors');
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "[Goal Input] Received instruction: Analyze market competitors",
    "[Planner Node] Devising recursive strategy...",
    " - Subtask 1: Crawl historical documents",
    " - Subtask 2: Match vector embeddings",
    " - Subtask 3: Cross-audit results via critique agent",
    "[Tool Runner] Fetching details from system databases...",
    "[Tool Output] Recieved matching metric documents (Confidence: 0.96)",
    "[Critique Agent] Verifying output compliance guidelines...",
    " - Match exact date milestones: VERIFIED",
    " - Eliminate hallucinations: VALIDATED",
    " - System flag: PASS",
    "[Agent Core] Orchestration completed successfully. Returning compiled analysis payload! ✅"
  ]);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(5);

  const triggerAgenticLoop = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(1);
    setAgentLogs(["[Goal Input] Received instruction: " + agentObjective]);

    setTimeout(() => {
      setAgentStep(2);
      setAgentLogs(prev => [...prev, "[Planner Node] Devising recursive strategy...", " - Subtask 1: Crawl documents", " - Subtask 2: Match embeddings"]);
    }, 600);

    setTimeout(() => {
      setAgentStep(3);
      setAgentLogs(prev => [...prev, "[Tool Runner] Querying databases...", "[Tool Output] Recieved metrics (Confidence: 0.96)"]);
    }, 1200);

    setTimeout(() => {
      setAgentStep(4);
      setAgentLogs(prev => [...prev, "[Critique Agent] Verifying compliance...", " - Eliminate hallucinations: VALIDATED", " - System flag: PASS"]);
    }, 1800);

    setTimeout(() => {
      setAgentStep(5);
      setAgentLogs(prev => [...prev, "[Agent Core] Orchestration completed successfully! ✅"]);
      setAgentRunning(false);
    }, 2400);
  };

  return (
    <div className="rounded-2xl bg-[#030712] border border-rose-500/20 font-mono text-slate-300 flex flex-col justify-between text-left p-4 min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-2 mb-3">
          <span className="text-[10px] text-slate-500 flex items-center gap-1.5 shrink-0 font-semibold">
            <Bot className="w-4 h-4 text-rose-400 animate-pulse" /> autonomous_agent_runner.py
          </span>
          <span className="text-[9px] text-rose-400 uppercase tracking-widest bg-rose-400/5 px-2 py-0.5 rounded border border-rose-500/10 shrink-0 font-semibold">ReAct Loop</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-grow flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-border-subtle/40 min-w-0">
            <input 
              type="text" 
              value={agentObjective} 
              onChange={(e) => setAgentObjective(e.target.value)}
              className="bg-transparent text-xs text-slate-200 outline-none border-none font-semibold w-full font-mono"
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

        <div className="flex gap-1.5 justify-center py-1 mb-2.5">
          <span className={`w-2 h-2 rounded-full ${agentStep >= 1 ? 'bg-rose-500 shadow-xs shadow-rose-500/80' : 'bg-slate-800'}`} />
          <span className={`w-2 h-2 rounded-full ${agentStep >= 2 ? 'bg-orange-500 shadow-xs shadow-orange-500/80' : 'bg-slate-800'}`} />
          <span className={`w-2 h-2 rounded-full ${agentStep >= 3 ? 'bg-amber-500 shadow-xs shadow-amber-500/80' : 'bg-slate-800'}`} />
          <span className={`w-2 h-2 rounded-full ${agentStep >= 4 ? 'bg-yellow-500 shadow-xs shadow-yellow-500/80' : 'bg-slate-800'}`} />
          <span className={`w-2 h-2 rounded-full ${agentStep >= 5 ? 'bg-emerald-500 shadow-xs shadow-emerald-500/80' : 'bg-slate-800'}`} />
        </div>

        <div className="bg-slate-950/90 rounded-xl p-3 border border-rose-500/10 text-[9px] space-y-1.5 h-[110px] overflow-y-auto font-mono">
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

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rose-500/20 pt-2 mt-3 text-[9px] text-slate-500 font-mono">
        <span className="shrink-0">Decision Loops: self_reflection = True</span>
        <span className="shrink-0">Model: Gemini-3.5-flash-agentic</span>
      </div>
    </div>
  );
}

function FutureVision() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#050b1d] to-[#040813] border border-emerald-500/20 font-sans p-4 text-left flex flex-col justify-between min-h-[220px] mt-4 shadow-inner">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/10 pb-2 mb-3">
          <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" /> FUTURE_VISION_PORTAL
          </span>
          <span className="text-[9px] font-mono text-slate-500 uppercase shrink-0 font-semibold">CAPITAL MINDS AI</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            "Building secure, localized, high-ROI AI orchestration systems for real-world enterprise operations."
          </h4>
          
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Solving the ultimate missing links in traditional generative portfolios: strict local data isolation protocols, zero cloud leaks, and domain-grounded autonomous agents that directly execute high-value workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center pt-1.5">
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-left">
              <span className="text-[9px] block text-slate-500 uppercase font-mono font-bold">Enterprise ROI Target</span>
              <span className="text-emerald-400 font-mono font-bold text-xs sm:text-sm leading-none">+85% Automation</span>
            </div>
            <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-left">
              <span className="text-[9px] block text-slate-500 uppercase font-mono font-bold">Compliance protocol</span>
              <span className="text-emerald-400 font-mono font-bold text-[10px] leading-none uppercase">ISO-9001 Alignment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-2 border-t border-emerald-500/10 text-[10px] text-slate-500 font-sans">
        <span className="shrink-0">Primary Sector: Financial/Operational Intelligence</span>
        <span className="flex items-center gap-0.5 text-emerald-300 font-mono font-bold animate-pulse shrink-0">
          Initiating Next Phase <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

function renderStageVisualizer(stageId: number) {
  switch (stageId) {
    case 1:
      return <DatabaseSandbox />;
    case 2:
      return <ApiPlayground />;
    case 3:
      return <PipelineSimulator />;
    case 4:
      return <RagSearch />;
    case 5:
      return <ChainRunner />;
    case 6:
      return <AgentSandbox />;
    case 7:
      return <FutureVision />;
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
          <p className="text-xs font-mono uppercase tracking-widest text-primary-accent mb-2">
            01 // INTENTIONAL EVOLUTION
          </p>
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            The Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-sans max-w-2xl mt-3.5 mx-auto leading-relaxed">
            Witness my transition from absolute programming fundamentals into high-throughput API architecture, secure pipeline operations, and cognitive agent orchestrations.
          </p>
          <div className="h-[2px] w-20 bg-gradient-to-r from-primary-accent to-secondary-accent mt-5 rounded-full mx-auto" />
        </div>

        <div className="relative pl-10 sm:pl-16 space-y-12">
          
          <div className="absolute left-[20px] sm:left-[24px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary-accent via-violet-500 to-emerald-400 opacity-40" />

          {stagesData.map((stage) => {
            const IconComponent = stageIcons[stage.id] || Code;
            
            return (
              <div
                key={stage.id}
                className="relative group scroll-mt-28 text-left"
              >
                <div className="absolute left-[-20px] sm:left-[-40px] top-4 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 -translate-x-1/2 rounded-full border border-border-subtle bg-card-bg text-text-secondary shadow-xs transition-all duration-300 group-hover:border-primary-accent/40 group-hover:text-primary-accent group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(var(--primary-accent-rgb),0.12)]">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div
                  className="p-4 sm:p-7 rounded-3xl border border-border-subtle/40 bg-card-bg/20 hover:bg-card-bg hover:border-primary-accent/20 hover:shadow-lg transition-all duration-300 transform-gpu will-change-transform hover:scale-[1.005]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">
                      {stage.subtitle}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase bg-slate-100 dark:bg-slate-800 text-text-secondary border border-border-subtle">
                      {stage.badge}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
                    {stage.title}
                    <Sparkles className="w-4 h-4 text-primary-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </h3>

                  <p className="mt-3 text-sm text-text-secondary leading-relaxed font-sans">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border-subtle/30">
                    {stage.techs.map((tech, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-border-subtle text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {renderStageVisualizer(stage.id)}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
