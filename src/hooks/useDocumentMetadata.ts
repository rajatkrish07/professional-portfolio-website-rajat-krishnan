import { useEffect } from 'react';
import profileImage from '../assets/images/profile.jpg';

interface MetadataConfig {
  title: string;
  description: string;
  keywords: string;
}

const sectionMetadata: Record<string, MetadataConfig> = {
  home: {
    title: 'Rajat Krishnan | AI & Systems Engineer | Generative AI & Agentic Workflows',
    description: 'Professional portfolio of Rajat Krishnan, an AI & Systems Engineer specializing in LLM orchestration, LangGraph agentic frameworks, Python, SQL, and robust backend architectures. Discover interactive projects, custom multi-agent workflows, and live GitHub activity.',
    keywords: 'Rajat Krishnan, AI Engineer, Systems Engineer, Generative AI, LangGraph, Python Backend, RAG Pipeline, Multi-Agent Orchestration, FastAPI, PGVector, Agentic Software, AI Portfolio, TCS Software Engineer'
  },
  about: {
    title: 'About Rajat Krishnan | AI Transition & Systems Cognition Specialist',
    description: "Explore the professional journey, analytical philosophies, and career transition of Rajat Krishnan. Bridging classical systems engineering with cognitive intelligence, focusing on scalable multi-agent systems and real-world LLM deployments.",
    keywords: 'Rajat Krishnan Bio, Systems Cognition, Software Engineer Journey, AI Career Transition, Scalable Architecture, Multi-agent Systems, Cognitive Workflows'
  },
  company: {
    title: 'Enterprise Experience | Rajat Krishnan at TCS (Tata Consultancy Services)',
    description: "Detailed professional impact of Rajat Krishnan as an Assistant Systems Engineer at TCS, engineering robust ETL pipelines, high-performance SQL architectures, and automated QA suites.",
    keywords: 'Tata Consultancy Services, TCS Experience, Assistant Systems Engineer, Data Pipelines, SQL Performance, Backend Architecture, QA Automation, Enterprise Systems Engineering'
  },
  'tech-stack': {
    title: 'Modern Tech Stack & AI Tooling | Rajat Krishnan',
    description: "Technical competencies of Rajat Krishnan: Core Python, SQL, PostgreSQL, PGVector semantic indexing, LangGraph stateful loops, FastAPI microservices, Docker containers, and robust automated QA workflows with Pytest.",
    keywords: 'AI Tech Stack, Python Programming, PostgreSQL Databases, PGVector Search, LangGraph Agents, FastAPI REST, Docker Containers, Automated QA, Pytest testing, n8n Integration'
  },
  projects: {
    title: 'Agentic AI & Semantic Retrieval Systems | Rajat Krishnan',
    description: "Browse advanced AI applications designed and implemented by Rajat Krishnan, featuring Cogentra (stateful LangGraph agentic orchestrator) and CapitalMinds (semantic PDF retrieval and vector chunking pipeline).",
    keywords: 'Agentic AI Projects, Cogentra Agent Orchestrator, CapitalMinds RAG, LangGraph Agentic Systems, Semantic PDF Chunking, PostgreSQL RAG, Python AI Applications'
  }
};

export default function useDocumentMetadata(activeSection: string) {
  useEffect(() => {
    // Fallback to home if activeSection is not matched
    const config = sectionMetadata[activeSection] || sectionMetadata.home;

    // Update document title
    document.title = config.title;

    // Helper to create or update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attributeName}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update SEO meta tags
    updateMetaTag('description', config.description);
    updateMetaTag('keywords', config.keywords);

    // Update Open Graph (OG) tags for social sharing
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:type', 'website', true);

    // Dynamic Canonical URL and OG URL Construction (Curls)
    const currentOrigin = window.location.origin || 'https://rajatkrishnan.com';
    const currentPath = window.location.pathname || '/';
    const canonicalUrl = `${currentOrigin}${currentPath}${activeSection === 'home' ? '' : `#${activeSection}`}`;

    // Update or create Canonical Link
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // Update dynamic OG URL
    updateMetaTag('og:url', canonicalUrl, true);

    // Inject local OG image preview pointing to Rajat's local profile image
    const absoluteAvatarUrl = profileImage.startsWith('http') ? profileImage : `${currentOrigin}${profileImage}`;
    updateMetaTag('og:image', absoluteAvatarUrl, true);
    updateMetaTag('og:image:width', '460', true);
    updateMetaTag('og:image:height', '460', true);
    updateMetaTag('og:image:type', 'image/jpeg', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    updateMetaTag('twitter:image', absoluteAvatarUrl);

  }, [activeSection]);
}
