import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Linkedin, Github, FileText, Download, Globe } from 'lucide-react';
import { profileData, currentCompanyData } from '../data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper function to convert oklch(...) colors to standard rgb(...) or rgba(...)
const convertOklchToRgbInString = (str: string): string => {
  if (typeof str !== 'string' || !str.includes('oklch')) return str;

  return str.replace(/oklch\(\s*([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+)(?:deg)?(?:\s*\/\s*([0-9.]+%?))?\s*\)/gi, (_match, l_val, c_val, h_val, a_val) => {
    const L = l_val.endsWith('%') ? parseFloat(l_val) / 100 : parseFloat(l_val);
    const C = c_val.endsWith('%') ? parseFloat(c_val) / 100 : parseFloat(c_val);
    const H = parseFloat(h_val);
    const A = a_val ? (a_val.endsWith('%') ? parseFloat(a_val) / 100 : parseFloat(a_val)) : 1;

    // 1. Convert OKLCH to Oklab
    const h_rad = (H * Math.PI) / 180;
    const a_oklab = C * Math.cos(h_rad);
    const b_oklab = C * Math.sin(h_rad);

    // 2. Convert Oklab to LMS
    const l_lms = L + 0.3963377774 * a_oklab + 0.2158037573 * b_oklab;
    const m_lms = L - 0.1055613458 * a_oklab - 0.0638541728 * b_oklab;
    const s_lms = L - 0.0894841775 * a_oklab - 1.2914855480 * b_oklab;

    // 3. Cube LMS values
    const l_cube = Math.pow(Math.max(0, l_lms), 3);
    const m_cube = Math.pow(Math.max(0, m_lms), 3);
    const s_cube = Math.pow(Math.max(0, s_lms), 3);

    // 4. Convert LMS cubed to linear sRGB
    const r_lin = +4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube;
    const g_lin = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube;
    const b_lin = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.7076147010 * s_cube;

    // 5. Convert linear sRGB to sRGB with gamma compression
    const r = r_lin <= 0.0031308 ? 12.92 * r_lin : 1.055 * Math.pow(Math.max(0, r_lin), 1 / 2.4) - 0.055;
    const g = g_lin <= 0.0031308 ? 12.92 * g_lin : 1.055 * Math.pow(Math.max(0, g_lin), 1 / 2.4) - 0.055;
    const b = b_lin <= 0.0031308 ? 12.92 * b_lin : 1.055 * Math.pow(Math.max(0, b_lin), 1 / 2.4) - 0.055;

    // 6. Scale to 0-255 range
    const r_255 = Math.max(0, Math.min(255, Math.round(r * 255)));
    const g_255 = Math.max(0, Math.min(255, Math.round(g * 255)));
    const b_255 = Math.max(0, Math.min(255, Math.round(b * 255)));

    if (A === 1) {
      return `rgb(${r_255}, ${g_255}, ${b_255})`;
    } else {
      return `rgba(${r_255}, ${g_255}, ${b_255}, ${A})`;
    }
  });
};

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    const originalGetComputedStyle = window.getComputedStyle;
    const originalStyleSheets = Array.from(document.styleSheets);
    const tempStyles: HTMLStyleElement[] = [];

    try {
      const element = resumeRef.current;
      if (!element) return;

      // 1. Temporarily patch/convert stylesheets containing oklch
      for (const sheet of originalStyleSheets) {
        try {
          if (sheet.cssRules) {
            let cssText = '';
            for (const rule of Array.from(sheet.cssRules)) {
              cssText += rule.cssText + '\n';
            }

            if (cssText.includes('oklch')) {
              const convertedCss = convertOklchToRgbInString(cssText);
              sheet.disabled = true;

              const tempStyle = document.createElement('style');
              tempStyle.innerHTML = convertedCss;
              tempStyle.setAttribute('data-temp-pdf-style', 'true');
              document.head.appendChild(tempStyle);
              tempStyles.push(tempStyle);
            }
          }
        } catch (e) {
          console.warn('Could not read cssRules from stylesheet:', sheet.href, e);
        }
      }

      // 2. Temporarily override window.getComputedStyle to return rgb colors instead of oklch
      window.getComputedStyle = function (el, pseudoElt) {
        const style = originalGetComputedStyle(el, pseudoElt);
        return new Proxy(style, {
          get(target, prop) {
            const value = Reflect.get(target, prop);
            if (typeof value === 'string') {
              return convertOklchToRgbInString(value);
            }
            if (typeof value === 'function') {
              if (prop === 'getPropertyValue') {
                return function (propertyName: string) {
                  const val = target.getPropertyValue(propertyName);
                  return typeof val === 'string' ? convertOklchToRgbInString(val) : val;
                };
              }
              return value.bind(target);
            }
            return value;
          }
        });
      };

      // Save original styling
      const originalMaxHeight = element.style.maxHeight;
      const originalOverflow = element.style.overflow;

      // Expand container to full content height for capture
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';

      // Wait a frame for layout and render styles to settle
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2, // 2x scale for crisp high-resolution text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Restore original styling immediately
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalOverflow;

      const imgData = canvas.toDataURL('image/png');
      
      // A4 paper size dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Calculate scaled height to fit canvas width proportionally onto A4
      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      if (imgHeight <= pdfHeight) {
        // Content fits on a single page
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      } else {
        // Multi-page layout
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        // Add subsequent pages
        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // Shift position up by the offset
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }
      
      pdf.save('Rajat_Krishnan_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Restore window.getComputedStyle
      window.getComputedStyle = originalGetComputedStyle;

      // Restore original stylesheets and clean up temporary ones
      for (const sheet of originalStyleSheets) {
        try {
          sheet.disabled = false;
        } catch (e) {
          // ignore if stylesheet was removed/unloaded
        }
      }
      for (const styleNode of tempStyles) {
        styleNode.remove();
      }

      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="resume-modal-overlay">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md cursor-zoom-out print:hidden"
          />

          {/* Modal Centering Wrapper */}
          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10 print:p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden relative flex flex-col print:bg-white print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none print:static print:overflow-visible"
            >
              {/* Sticky Controls Header (Hidden on print) */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 sticky top-0 z-20 print:hidden">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-accent" />
                  <span className="font-mono text-sm text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider">
                    RAJAT_KRISHNAN_RESUME.pdf
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-accent text-white text-xs font-mono font-bold transition-all shadow-sm ${
                      isDownloading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:bg-secondary-accent cursor-pointer'
                    }`}
                    aria-label="Download Resume"
                  >
                    {isDownloading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-white dark:text-slate-950" /> Download
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Printable Area */}
              <div
                ref={resumeRef}
                className="p-4 xs:p-6 sm:p-12 overflow-y-auto max-h-[85vh] bg-white text-gray-900 print:p-0 print:max-h-none print:overflow-visible font-sans leading-relaxed"
                id="printable-resume-body"
              >
                {/* Print view helper tip (Hidden on browser, shown on print only) */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @media print {
                    body * {
                      visibility: hidden;
                    }
                    #printable-resume-body, #printable-resume-body * {
                      visibility: visible;
                    }
                    #printable-resume-body {
                      position: absolute;
                      left: 0;
                      top: 0;
                      width: 100%;
                      padding: 0 !important;
                      margin: 0 !important;
                      background: white !important;
                      color: black !important;
                    }
                    nav, header, footer, #resume-modal-overlay, #navbar-header, .print\\:hidden {
                      display: none !important;
                    }
                  }
                `}} />

                {/* PDF Header Section */}
                <div className="border-b-2 border-gray-900 pb-5">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
                        Rajat Krishnan
                      </h1>
                      <p className="text-sm font-sans font-medium text-gray-600 mt-1.5 flex items-center gap-1">
                        Assistant Systems Engineer | AI Engineer (Aspiring)
                      </p>
                      <p className="text-xs font-mono text-gray-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> Mumbai, Maharashtra
                      </p>
                    </div>
                    
                    {/* Contact details */}
                    <div className="text-left md:text-right text-xs space-y-1 text-gray-700 font-mono">
                      <div className="flex items-center md:justify-end gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        <span>+91-9814327698</span>
                      </div>
                      <div className="flex items-center md:justify-end gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <a href={`mailto:${profileData.socials.email}`} className="hover:underline">
                          {profileData.socials.email}
                        </a>
                      </div>

                      <div className="flex items-center md:justify-end gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-gray-500" />
                        <a href="https://linkedin.com/in/rajatkrishnan" target="_blank" rel="noreferrer" className="hover:underline">
                          linkedin.com/in/rajatkrishnan
                        </a>
                      </div>
                      <div className="flex items-center md:justify-end gap-1.5">
                        <Github className="w-3.5 h-3.5 text-gray-500" />
                        <a href="https://github.com/rajatkrish07" target="_blank" rel="noreferrer" className="hover:underline">
                          github.com/rajatkrish07
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Body */}
                <div className="mt-6 space-y-6 text-xs text-gray-800">
                  
                  {/* Professional Summary */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 font-sans leading-relaxed text-justify">
                      Assistant Systems Engineer with enterprise software engineering experience building robust backend automation, complex workflows, and reliable systems. Supported by a strong foundation in Python, SQL, and backend service design. Actively transitioning into AI Engineering through hands-on projects utilizing FastAPI, SQLAlchemy, LangChain, and Agentic AI to design deterministic, intelligent software architectures.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Professional Experience
                    </h2>
                    <div>
                      <div className="flex items-start justify-between font-sans text-xs">
                        <div>
                          <strong className="text-gray-900 text-[13px]">Tata Consultancy Services (TCS)</strong>
                          <p className="text-gray-600 font-medium italic">Assistant Systems Engineer</p>
                        </div>
                        <div className="text-right text-gray-600 font-mono text-[11px]">
                          <p>Dec 2025 - Present</p>
                          <p>Mumbai, India</p>
                        </div>
                      </div>
                      
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-700 leading-relaxed font-sans mt-2">
                        {currentCompanyData.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Projects
                    </h2>
                    
                    {/* Cogentra */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between font-sans">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <strong className="text-gray-900 text-xs">Cogentra — Enterprise Intelligence Platform</strong>
                          <a 
                            href="https://github.com/rajatkrish07/cogentra-enterprise-intelligence-platform" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[10px] text-gray-500 font-mono">FastAPI, Python, Pydantic, SQLAlchemy, REST APIs</span>
                        </div>
                        <span className="text-gray-500 font-mono text-[11px] shrink-0">Nov 2025</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        <li>Designed and implemented a high-performance REST API backend using FastAPI and Python, employing Pydantic for robust runtime validation and data serialization.</li>
                        <li>Architected clean relational database schemas utilizing SQLAlchemy ORM to manage dynamic data models and enforce strict relational integrity.</li>
                        <li>Built secure token-based authentication mechanisms and modular role-based access control (RBAC) schemas to restrict resource access.</li>
                        <li>Engineered modular backend service classes to support scalable enterprise integrations, maximizing test coverage and system reliability.</li>
                        <li>Implemented clean architecture principles with reusable service layers and decoupled backend logic, enhancing overall codebase maintainability.</li>
                      </ul>
                    </div>

                    {/* Spotify ETL */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between font-sans">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <strong className="text-gray-900 text-xs">Spotify ETL Pipeline: Cloud-Based Data Pipeline</strong>
                          <a 
                            href="https://github.com/rajatkrish07/spotify-etl-pipeline" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[10px] text-gray-500 font-mono">Python, SQL, AWS, Spotipy API, EventBridge, Lambda</span>
                        </div>
                        <span className="text-gray-500 font-mono text-[11px] shrink-0">Mar 2025</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        <li>Engineered a production-ready serverless ETL pipeline to process and ingest daily streaming logs using Python and SQL.</li>
                        <li>Automated API consumption, rate-limiting compliance, and error-handling routines for high system availability.</li>
                        <li>Orchestrated daily data extraction and schema-validation routines, transforming unstructured JSON payloads into clean, query-ready datasets.</li>
                        <li>Streamlined data processing with cloud triggers, eliminating operational overhead and establishing a cost-effective indexing strategy.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Technical Skills
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1 font-sans">
                      <li>
                        <strong className="text-gray-900">Languages:</strong> Python, SQL, Java
                      </li>
                      <li>
                        <strong className="text-gray-900">Backend & Frameworks:</strong> FastAPI, Pydantic, SQLAlchemy
                      </li>
                      <li>
                        <strong className="text-gray-900">AI & LLM:</strong> LangChain, RAG (Retrieval-Augmented Generation), Prompt Engineering, Agentic AI
                      </li>
                      <li>
                        <strong className="text-gray-900">Tools & Platforms:</strong> Git, Docker, Unix/Linux, Jira
                      </li>
                      <li>
                        <strong className="text-gray-900">Concepts & Architectures:</strong> Backend Development, REST APIs, API Design, Data Validation, ETL Pipelines, Systems Design
                      </li>
                    </ul>
                  </div>

                  {/* Education */}
                  <div className="space-y-2">
                    <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Education
                    </h2>
                    <div className="flex items-start justify-between font-sans text-xs">
                      <div>
                        <strong className="text-gray-900 text-[12px]">Chandigarh University</strong>
                        <p className="text-gray-600 font-medium">Bachelor of Technology in Computer Science & Engineering</p>
                      </div>
                      <div className="text-right text-gray-600 font-mono text-[11px]">
                        <p>CGPA: 7.52</p>
                        <p>Class of 2025</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
