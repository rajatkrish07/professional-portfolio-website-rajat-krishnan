import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Linkedin, Github, FileText, Download, Globe } from 'lucide-react';
import { profileData, currentCompanyData } from '../data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { usePerformanceConfig } from '../hooks/usePerformanceConfig';
import { downloadFile } from '../utils/download';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [actualHeight, setActualHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { isLowPerformance } = usePerformanceConfig();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen || !wrapperRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Padding: 16px total on mobile/tablet, 48px total on desktop
        const padding = window.innerWidth < 640 ? 16 : 48;
        const availableWidth = width - padding;
        if (availableWidth < 800) {
          setScale(availableWidth / 800);
        } else {
          setScale(1);
        }
      }
    });
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !resumeRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setActualHeight(entry.target.scrollHeight);
      }
    });
    resizeObserver.observe(resumeRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen]);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(null);

    const originalGetComputedStyle = window.getComputedStyle;
    const originalStyleSheets = Array.from(document.styleSheets);
    const tempStyles: HTMLStyleElement[] = [];

    try {
      const element = resumeRef.current;
      if (!element) {
        throw new Error('Resume element reference is not available.');
      }

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
      const originalTransform = element.style.transform;
      const originalLeft = element.style.left;
      const originalTransformOrigin = element.style.transformOrigin;
      const originalWidth = element.style.width;
      const originalPosition = element.style.position;
      const originalPadding = element.style.padding;

      // Expand container and set exact desktop PDF specs for capture
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      element.style.transform = 'none';
      element.style.left = '0';
      element.style.transformOrigin = 'top left';
      element.style.width = '800px';
      element.style.position = 'relative';
      element.style.padding = '48px'; // standard sm:p-12 A4 padding

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
      element.style.transform = originalTransform;
      element.style.left = originalLeft;
      element.style.transformOrigin = originalTransformOrigin;
      element.style.width = originalWidth;
      element.style.position = originalPosition;
      element.style.padding = originalPadding;

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
      
      const filename = 'Rajat_Krishnan_Resume.pdf';
      const blob = pdf.output('blob');
      
      // Use the robust, cross-browser, Blob-based utility to trigger download/native sharing
      await downloadFile(blob, filename);
    } catch (error: any) {
      console.error('Error generating or saving PDF resume:', error);
      setDownloadError(error?.message || 'Failed to download resume. Please try again or print the page.');
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
          {/* Backdrop blur - disabled on low performance/mobile devices to avoid heavy compositing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 bg-slate-900/60 cursor-zoom-out print:hidden ${isLowPerformance ? '' : 'backdrop-blur-md'}`}
          />

          {/* Modal Centering Wrapper */}
          <div className="flex min-h-screen items-center justify-center p-0 sm:p-6 lg:p-8 relative z-10 print:p-0">
            <motion.div
              initial={isLowPerformance ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={isLowPerformance ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isLowPerformance ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={isLowPerformance ? { duration: 0.2, ease: 'easeOut' } : { type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full h-screen sm:h-auto sm:max-h-[90vh] max-w-4xl bg-white dark:bg-slate-900 border-0 sm:border border-slate-200/80 dark:border-slate-800 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden relative flex flex-col print:bg-white print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none print:static print:overflow-visible"
            >
              {/* Sticky Controls Header (Hidden on print) */}
              <div className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-3.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 sticky top-0 z-20 print:hidden safe-top select-none">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all cursor-pointer min-h-[44px] min-w-[44px] justify-center active:scale-95 touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Close</span>
                </button>

                <div className="flex items-center gap-2 min-w-0 mx-2">
                  <FileText className="w-4 h-4 text-primary-accent shrink-0 hidden xs:block" />
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider truncate">
                    <span className="xs:hidden">Resume</span>
                    <span className="hidden xs:inline sm:hidden">Resume.pdf</span>
                    <span className="hidden sm:inline">RAJAT_KRISHNAN_RESUME.pdf</span>
                  </span>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-accent text-white text-xs font-mono font-bold transition-all shadow-sm min-h-[44px] min-w-[44px] justify-center active:scale-95 touch-manipulation ${
                    isDownloading
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-secondary-accent cursor-pointer'
                  }`}
                  aria-label="Download Resume"
                >
                  {isDownloading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white dark:text-slate-950 shrink-0" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>

              {downloadError && (
                <div className="bg-rose-50 dark:bg-rose-950/20 border-b border-rose-200 dark:border-rose-900/40 px-4 py-2 text-xs sm:text-sm text-rose-800 dark:text-rose-300 flex items-center justify-between gap-3 print:hidden">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                    <p className="truncate font-sans">{downloadError}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={handleDownload}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded text-[10px] font-mono cursor-pointer transition-colors active:scale-95"
                    >
                      Retry
                    </button>
                    <button 
                      onClick={() => setDownloadError(null)}
                      className="p-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded text-rose-500 transition-colors"
                      aria-label="Dismiss error"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Printable Area Wrapper */}
              <div
                ref={wrapperRef}
                className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-950/40 p-0 sm:p-6 lg:p-8 flex justify-center items-start print:p-0 print:overflow-visible print:bg-white"
                style={{ maxHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(90vh - 70px)' }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '800px',
                    height: isMobile ? 'auto' : `${actualHeight * scale}px`,
                    overflow: isMobile ? 'visible' : 'hidden',
                    position: 'relative',
                    transition: 'height 0.15s ease-out',
                  }}
                  className="rounded-none sm:rounded-lg border-0 sm:border border-slate-200/85 dark:border-slate-800/80 shadow-none sm:shadow-md bg-white shrink-0 print:border-none print:shadow-none print:h-auto print:overflow-visible print:w-full print:max-w-none"
                >
                  <div
                    ref={resumeRef}
                    className="bg-white text-gray-900 font-sans leading-relaxed print:relative print:p-0 print:left-0 print:top-0 print:transform-none"
                    style={
                      isMobile
                        ? {
                            width: '100%',
                            transform: 'none',
                            position: 'relative' as const,
                            left: '0',
                            boxSizing: 'border-box' as const,
                            padding: '24px 16px',
                          }
                        : {
                            width: '800px',
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                            left: `calc(50% - ${400 * scale}px)`,
                            boxSizing: 'border-box' as const,
                            position: 'absolute' as const,
                            top: '0',
                            padding: '48px',
                          }
                    }
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
                <div className="border-b-2 border-gray-900 pb-4 sm:pb-5">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-gray-900">
                        Rajat Krishnan
                      </h1>
                      <p className="text-xs sm:text-sm font-sans font-medium text-gray-600 mt-1 flex items-center gap-1">
                        Assistant Systems Engineer | AI Engineer (Aspiring)
                      </p>
                      <p className="text-[10px] sm:text-xs font-mono text-gray-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> Mumbai, Maharashtra
                      </p>
                    </div>
                    
                    {/* Contact details */}
                    <div className="text-left md:text-right text-[10px] sm:text-xs space-y-1 text-gray-700 font-mono min-w-0">
                      <div className="flex items-center md:justify-end gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>+91-9814327698</span>
                      </div>
                      <div className="flex items-center md:justify-end gap-1.5 min-w-0">
                        <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <a href={`mailto:${profileData.socials.email}`} className="hover:underline truncate">
                          {profileData.socials.email}
                        </a>
                      </div>

                      <div className="flex items-center md:justify-end gap-1.5 min-w-0">
                        <Linkedin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <a href="https://linkedin.com/in/rajatkrishnan" target="_blank" rel="noreferrer" className="hover:underline truncate">
                          linkedin.com/in/rajatkrishnan
                        </a>
                      </div>
                      <div className="flex items-center md:justify-end gap-1.5 min-w-0">
                        <Github className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <a href="https://github.com/rajatkrish07" target="_blank" rel="noreferrer" className="hover:underline truncate">
                          github.com/rajatkrish07
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Body */}
                <div className="mt-4 sm:mt-6 space-y-5 sm:space-y-6 text-xs sm:text-sm text-gray-800">
                  
                  {/* Professional Summary */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 font-sans leading-relaxed text-left text-xs sm:text-[13px]">
                      Assistant Systems Engineer with enterprise software engineering experience building robust backend automation, complex workflows, and reliable systems. Supported by a strong foundation in Python, SQL, and backend service design. Actively transitioning into AI Engineering through hands-on projects utilizing FastAPI, SQLAlchemy, LangChain, and Agentic AI to design deterministic, intelligent software architectures.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Professional Experience
                    </h2>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4 font-sans">
                        <div>
                          <strong className="text-gray-900 text-xs sm:text-[13px]">Tata Consultancy Services (TCS)</strong>
                          <p className="text-gray-600 font-medium italic text-[11px] sm:text-xs">Assistant Systems Engineer</p>
                        </div>
                        <div className="text-left sm:text-right text-gray-600 font-mono text-[10px] sm:text-[11px] shrink-0">
                          <p>Dec 2025 - Present</p>
                          <p>Mumbai, India</p>
                        </div>
                      </div>
                      
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-700 leading-relaxed font-sans mt-2 text-xs sm:text-[13px] text-left">
                        {currentCompanyData.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Projects
                    </h2>
                    
                    {/* Cogentra */}
                    <div className="space-y-1 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 font-sans">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <strong className="text-gray-900 text-xs sm:text-[13px]">Cogentra — Enterprise Platform</strong>
                          <a 
                            href="https://github.com/rajatkrish07/cogentra-enterprise-intelligence-platform" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center shrink-0"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono break-all sm:break-normal">FastAPI, Python, Pydantic, SQLAlchemy, REST APIs</span>
                        </div>
                        <span className="text-gray-500 font-mono text-[10px] sm:text-[11px] shrink-0">Nov 2025</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs sm:text-[13px] leading-relaxed">
                        <li>Designed and implemented a high-performance REST API backend using FastAPI and Python, employing Pydantic for robust runtime validation and data serialization.</li>
                        <li>Architected clean relational database schemas utilizing SQLAlchemy ORM to manage dynamic data models and enforce strict relational integrity.</li>
                        <li>Built secure token-based authentication mechanisms and modular role-based access control (RBAC) schemas to restrict resource access.</li>
                        <li>Engineered modular backend service classes to support scalable enterprise integrations, maximizing test coverage and system reliability.</li>
                        <li>Implemented clean architecture principles with reusable service layers and decoupled backend logic, enhancing overall codebase maintainability.</li>
                      </ul>
                    </div>

                    {/* Spotify ETL */}
                    <div className="space-y-1 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 font-sans">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <strong className="text-gray-900 text-xs sm:text-[13px]">Spotify ETL Pipeline: Cloud-Based Data</strong>
                          <a 
                            href="https://github.com/rajatkrish07/spotify-etl-pipeline" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center shrink-0"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono break-all sm:break-normal">Python, SQL, AWS, Spotipy API, EventBridge, Lambda</span>
                        </div>
                        <span className="text-gray-500 font-mono text-[10px] sm:text-[11px] shrink-0">Mar 2025</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs sm:text-[13px] leading-relaxed">
                        <li>Engineered a production-ready serverless ETL pipeline to process and ingest daily streaming logs using Python and SQL.</li>
                        <li>Automated API consumption, rate-limiting compliance, and error-handling routines for high system availability.</li>
                        <li>Orchestrated daily data extraction and schema-validation routines, transforming unstructured JSON payloads into clean, query-ready datasets.</li>
                        <li>Streamlined data processing with cloud triggers, eliminating operational overhead and establishing a cost-effective indexing strategy.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="space-y-1.5 sm:space-y-2 text-left">
                    <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Technical Skills
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1 font-sans text-xs sm:text-[13px] leading-relaxed">
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
                  <div className="space-y-1.5 sm:space-y-2 text-left">
                    <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1">
                      Education
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4 font-sans text-xs sm:text-sm">
                      <div>
                        <strong className="text-gray-900 text-xs sm:text-[12px]">Chandigarh University</strong>
                        <p className="text-gray-600 font-medium text-[11px] sm:text-xs">Bachelor of Technology in Computer Science & Engineering</p>
                      </div>
                      <div className="text-left sm:text-right text-gray-600 font-mono text-[10px] sm:text-[11px] shrink-0">
                        <p>CGPA: 7.52</p>
                        <p>Class of 2025</p>
                      </div>
                    </div>
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
