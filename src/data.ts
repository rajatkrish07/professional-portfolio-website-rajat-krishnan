import { Profile, Experience, TimelineEvent, SkillCategory, Project } from './types';
import profileImage from './assets/images/profile.jpg';

export const profileData: Profile = {
  name: "Rajat Krishnan",
  initials: "RK",
  currentRole: "Assistant Systems Engineer at TCS",
  targetRole: "AI / GenAI & Systems Engineer",
  oneLiner: "Engineering autonomous agents, intelligent workflows, and robust data systems.",
  aboutText: "As an Assistant Systems Engineer at Tata Consultancy Services (TCS), I specialize in architecting robust ETL pipelines that process over 50+ GB of data weekly and optimizing automated QA workflows. Passionate about software engineering and Artificial Intelligence, I am transitioning my career towards Associate AI, GenAI, and Systems Engineering roles. I build optimized, test-driven backend systems using Python, SQL, and FastAPI, layered with modern LLM orchestration, intelligent agentic workflows, and LangGraph-powered state machines.",
  resumeUrl: "#", // Interactive print and view option implemented natively
  strengths: [
    "Python & SQL Engineering",
    "Generative AI & LLMs",
    "RAG & Semantic Retrieval",
    "Multi-Agent Orchestration",
    "ETL & Data Pipelines",
    "Automated QA & System Testing"
  ],
  socials: {
    email: "rajatkrishnan2002@gmail.com",
    linkedin: "https://linkedin.com/in/rajatkrishnan",
    github: "https://github.com/rajatkrish07"
  },
  profilePicture: profileImage
};

export const currentCompanyData: Experience = {
  company: "Tata Consultancy Services (TCS)",
  role: "Assistant Systems Engineer",
  duration: "Dec 2025 - Present",
  location: "Mumbai, India",
  summary: "Engineered robust backend automation, enterprise data workflows, and reliable validation systems in a high-compliance enterprise ecosystem. Orchestrated weekly processing workflows for over 50+ GB of structured operational data, establishing high-fidelity validation controls and scalable integration pipelines. Focused on maximizing system reliability, data integrity, and automated process engineering to support downstream intelligent systems.",
  bullets: [
    "Designed and optimized 15+ robust data processing pipelines, handling over 50+ GB of structured enterprise data weekly to guarantee high system reliability and strict schema validation.",
    "Architected and automated enterprise backend data ingestion workflows, eliminating 10+ hours of manual intervention monthly while enforcing strict validation checks and relational database ingestion standards.",
    "Engineered 12 dynamic interactive data visualizers and reporting systems for 20+ cross-functional stakeholders, translating complex system analytics into low-latency operational insights.",
    "Refactored QA test suites and automated end-to-end testing systems, reducing overall verification cycle times by 25% and ensuring defect-free deployments across 4 major production release cycles.",
    "Developed automated input validation routines and error-handling mechanisms, enhancing backend fault tolerance and system stability under peak traffic loads.",
    "Collaborated with cross-functional engineering teams to translate complex technical specifications into modular, highly maintainable backend system architectures."
  ],
  achievements: [
    "Automated core enterprise data ingestion pipelines, completely eliminating 10+ hours of recurring manual operations per month.",
    "Engineered low-latency data visualizers used by 20+ cross-functional decision-makers, accelerating operational data insights.",
    "Achieved a 25% reduction in release verification times by restructuring and parallelizing automated software testing pipelines.",
    "Maintained 100% production backend uptime and zero deployment defects across 4 continuous release cycles."
  ],
  highlights: [
    "Enterprise Data Pipelines",
    "Data Integration & Validation",
    "Automated QA & Test Engineering",
    "System Reliability & Optimization"
  ]
};

export const techStackData: SkillCategory[] = [
  {
    category: "Programming & Software Engineering",
    skills: [
      { name: "Python", isTransitionFocus: true },
      { name: "Object-Oriented Programming (OOP)", isTransitionFocus: false },
      { name: "Functional Programming", isTransitionFocus: false },
      { name: "Type Hinting", isTransitionFocus: false },
      { name: "Exception Handling", isTransitionFocus: false },
      { name: "Logging", isTransitionFocus: false },
      { name: "JSON Processing", isTransitionFocus: false },
      { name: "Git & GitHub", isTransitionFocus: false }
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "FastAPI", isTransitionFocus: true },
      { name: "REST API Design", isTransitionFocus: true },
      { name: "Pydantic", isTransitionFocus: false },
      { name: "API Validation & Serialization", isTransitionFocus: false },
      { name: "Authentication & Authorization", isTransitionFocus: false },
      { name: "OpenAPI / Swagger", isTransitionFocus: false }
    ]
  },
  {
    category: "Database Engineering",
    skills: [
      { name: "PostgreSQL", isTransitionFocus: true },
      { name: "SQL", isTransitionFocus: true },
      { name: "SQLAlchemy ORM", isTransitionFocus: true },
      { name: "Database Design", isTransitionFocus: false },
      { name: "Query Optimization", isTransitionFocus: false }
    ]
  },
  {
    category: "AI Engineering",
    skills: [
      { name: "Large Language Models (LLMs)", isTransitionFocus: true },
      { name: "Prompt Engineering", isTransitionFocus: false },
      { name: "Retrieval-Augmented Generation (RAG)", isTransitionFocus: true },
      { name: "AI Agents", isTransitionFocus: true },
      { name: "Tool Calling", isTransitionFocus: true },
      { name: "Embeddings", isTransitionFocus: false },
      { name: "Vector Databases", isTransitionFocus: true },
      { name: "LangChain", isTransitionFocus: true },
      { name: "LangGraph", isTransitionFocus: true }
    ]
  },
  {
    category: "AI Infrastructure",
    skills: [
      { name: "Docker", isTransitionFocus: true },
      { name: "Unix / Linux", isTransitionFocus: false },
      { name: "Environment Management", isTransitionFocus: false },
      { name: "API Integrations", isTransitionFocus: false },
      { name: "Model Deployment", isTransitionFocus: false },
      { name: "Production AI Workflows", isTransitionFocus: true }
    ]
  },
  {
    category: "Software Architecture",
    skills: [
      { name: "Layered Architecture", isTransitionFocus: false },
      { name: "Separation of Concerns", isTransitionFocus: false },
      { name: "DTO / Response Models", isTransitionFocus: false },
      { name: "Design Patterns", isTransitionFocus: false },
      { name: "Clean Code", isTransitionFocus: false },
      { name: "System Design Fundamentals", isTransitionFocus: false }
    ]
  },
  {
    category: "Testing & Development",
    skills: [
      { name: "Pytest", isTransitionFocus: true },
      { name: "API Testing", isTransitionFocus: false },
      { name: "Debugging", isTransitionFocus: false },
      { name: "Postman", isTransitionFocus: false }
    ]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "Dec 2025 - Present",
    title: "Assistant Systems Engineer",
    organization: "Tata Consultancy Services (TCS)",
    description: "Designing high-volume data ingestion pipelines, automating backend integrations, developing dynamic data visualizers, and optimizing enterprise software quality systems.",
    type: "professional"
  },
  {
    year: "2025 - 2026",
    title: "AI & Software Engineering Specialization",
    organization: "Independent Upskilling & Open Source",
    description: "Mastering advanced Generative AI architectures, including semantic retrieval (RAG), multi-agent orchestration via LangGraph, serverless pipelines, and FastAPI development.",
    type: "learning"
  },
  {
    year: "2021 - 2025",
    title: "B.Tech. in Computer Science & Engineering",
    organization: "Chandigarh University",
    description: "Acquired a strong foundational CGPA of 7.52. Deepened expertise in data structures, relational database schemas, algorithm design, and software testing protocols.",
    type: "academic"
  }
];

export const projectsData: Project[] = [
  {
    id: "spotify-etl",
    name: "Spotify ETL Pipeline: Cloud-Based Data Pipeline",
    tagline: "Automated serverless pipeline for stream ingestion & warehousing",
    description: "A serverless, automated ETL data pipeline engineered to ingest Spotify streaming data, parse payloads with Python, crawl structures via AWS Glue, and optimize queries in S3.",
    longDescription: "A robust serverless data engineering solution built to stream and store audio metrics. Leveraging AWS Lambda and EventBridge, it eliminates manual operations by fully automating ingestion triggers, crawling structural schema changes with AWS Glue, and querying structured parquet formats via Athena.",
    techBadges: ["Python", "SQL", "AWS Lambda", "AWS S3", "AWS Glue", "AWS Athena", "EventBridge"],
    githubUrl: "https://github.com/rajatkrish07/spotify-etl-pipeline",
    status: "Production",
    architecturePoints: [
      "Designed a highly scalable serverless ingestion flow using Python and AWS Lambda.",
      "Automated recurrent ETL jobs with AWS EventBridge triggers, eliminating manual intervention.",
      "Crawled unstructured raw streams via AWS Glue Crawlers to enable high-efficiency query execution in AWS Athena.",
      "Optimized storage cost and performance using partition schemas in Amazon S3 buckets."
    ]
  },
  {
    id: "cogentra",
    name: "Cogentra",
    tagline: "Enterprise AI Multi-Agent Backend Orchestrator",
    description: "An enterprise-grade orchestration engine coordinating multi-agent loops. Built on FastAPI and LangGraph with stateful memory checkpoints and strict validation schemas.",
    longDescription: "Cogentra demonstrates advanced multi-agent capability. Employing LangGraph state-charts, it coordinates autonomous planner, actor, and validator agents, enforcing schema validation via Pydantic and managing conversation persistence seamlessly.",
    techBadges: ["FastAPI", "Python", "LangGraph", "Docker", "OpenAI"],
    githubUrl: "https://github.com/rajatkrish07/cogentra-enterprise-intelligence-platform",
    status: "Active Development",
    architecturePoints: [
      "Engineered clean REST API backend endpoints in FastAPI with robust Pydantic schemas for data validation.",
      "Architected clean relational database schemas utilizing SQLAlchemy ORM to manage dynamic data structures.",
      "Built secure token-based authentication mechanisms and modular role-based access control (RBAC).",
      "Implemented clean architecture principles with reusable service layers, improving overall codebase maintainability."
    ]
  },
  {
    id: "capitalminds",
    name: "Capital Minds",
    tagline: "Financial Intelligence PDF Semantic RAG Pipeline",
    description: "A secure, semantic RAG retrieval system applying customized financial chunking models, custom templates, and PGVector database context search.",
    longDescription: "A high-performance RAG pipeline that processes financial earnings calls and documents. It utilizes semantic chunking strategies to split financial statements, maps embeddings using OpenAI, and indexes vectors into PGVector to perform highly-accurate similarity retrieval.",
    techBadges: ["FastAPI", "Python", "LangChain", "PGVector", "Pytest", "Docker"],
    githubUrl: "https://github.com/rajatkrish07",
    status: "Prototype",
    architecturePoints: [
      "Engineered semantic-financial chunking algorithms to preserve structured context within multi-page PDF documents.",
      "Configured robust vector storage and hybrid search query logic inside PostgreSQL using PGVector.",
      "Authored intensive pytest coverages to assure retrieval performance and zero-hallucination accuracy."
    ]
  },
  {
    id: "hr-analytics",
    name: "HR Analytics Dashboard",
    tagline: "Interactive employee attrition & workforce trends analyzer",
    description: "An interactive, corporate intelligence dashboard designed with Power BI and SQL to analyze employee attrition factors, performance correlations, and workforce dynamics.",
    longDescription: "A data analytics project focused on workforce diagnostics. It parses dense human resource datasets, performs cleaning and transformations using Excel and SQL, and generates dynamic visualizations and metric tracking in Power BI to optimize management decisions.",
    techBadges: ["Power BI", "SQL", "Spreadsheets", "Data Cleaning", "Data Visualization"],
    githubUrl: "https://github.com/rajatkrish07",
    status: "Production",
    architecturePoints: [
      "Cleaned, parsed, and validated raw HR datasets utilizing advanced Excel data-transformation functions.",
      "Constructed custom dynamic KPIs, trend metrics, and cross-filtering dashboards inside Power BI.",
      "Enabled detailed drill-down features to isolate attrition risk by department, job role, and years of service."
    ]
  },
  {
    id: "instagram-data-model",
    name: "Instagram Data Model & Analytics Project",
    tagline: "Relational modeling, engagement diagnostics & SQL queries",
    description: "An optimized database model built in PostgreSQL covering social metrics, paired with advanced analytical SQL queries to isolate user activity trends.",
    longDescription: "A pure database design and data modeling project representing a large-scale social application. It designs normalized relational structures, populates mock engagement vectors, and features high-efficiency analytical queries targeting key user engagement behavior over time.",
    techBadges: ["PostgreSQL", "SQL", "Relational Database", "Data Modeling", "Analytics"],
    githubUrl: "https://github.com/rajatkrish07",
    status: "Production",
    architecturePoints: [
      "Designed a normalized 3NF relational schema in PostgreSQL covering user accounts, posts, comments, and engagement metrics.",
      "Wrote complex analytical SQL queries (window functions, subqueries, CTEs) to compile statistical trends.",
      "Extracted core insights explaining peak posting hours, user retention coefficients, and high-engagement content loops."
    ]
  }
];
