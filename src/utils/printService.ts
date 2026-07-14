/**
 * Specialized Print-to-PDF Service
 * Ensures the DOM is completely cleaned of all interactive, layout-shifting,
 * and non-printable elements before printing. Guarantees a pristine,
 * visual-clutter-free 1-page vector resume.
 */

const STYLE_ID = 'print-service-cleanup-styles';

interface SavedState {
  bodyOverflow: string;
  htmlOverflow: string;
}

let savedState: SavedState | null = null;

/**
 * Injects dynamic CSS rules to force-hide any interactive, layout,
 * and backdrop elements during printing, leaving only the resume document.
 */
function injectCleanupStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.innerHTML = `
    @media print {
      /* 1. Force hide the entire main web app scaffolding */
      #root > :not(#resume-modal-overlay),
      #root > header,
      #root > nav,
      #root > footer,
      #back-to-top,
      #footer-section,
      #navbar-header,
      .section-dot-nav,
      .print-hidden,
      .print\\:hidden {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }

      /* 2. Style the modal overlay container to fill the full printable area */
      #resume-modal-overlay {
        position: absolute !important;
        inset: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        box-shadow: none !important;
        overflow: visible !important;
        display: block !important;
        z-index: 999999 !important;
      }

      /* 3. Hide all modal control structures (close, download, and print buttons, tips, error bars) */
      #resume-modal-overlay button,
      #resume-modal-overlay .sticky,
      #resume-modal-overlay [aria-label="Close modal"],
      #resume-modal-overlay .bg-blue-50\\/60,
      #resume-modal-overlay .bg-rose-50,
      #resume-modal-overlay div:has(> button[aria-label="Close modal"]) {
        display: none !important;
        opacity: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* 4. Remove limits, headers, and scrollbars from the modal viewport */
      #resume-modal-overlay .flex-1.overflow-y-auto {
        overflow: visible !important;
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
        max-height: none !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* 5. Strip borders, margins, and card background shadows from the paper-frame parent */
      #resume-modal-overlay div:has(> #printable-resume-body) {
        border: none !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        background: #ffffff !important;
      }

      /* 6. Guarantee the resume body fills the container with crisp vector styling */
      #printable-resume-body {
        visibility: visible !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        transform: none !important;
        box-shadow: none !important;
        border: none !important;
        background: #ffffff !important;
        color: #000000 !important;
      }

      /* 7. Ensure absolutely no browser default headers, footers, or margins interfere */
      @page {
        size: A4 portrait;
        margin: 12mm 14mm 12mm 14mm !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

/**
 * Cleans the DOM, locks layout variables, and triggers browser-native printing.
 */
export function prepareAndPrint() {
  // Save scroll and overflow state to prevent layout jumps or screen locking
  savedState = {
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
  };

  // Temporarily enable overflow for native print calculations
  document.body.style.overflow = 'visible';
  document.documentElement.style.overflow = 'visible';

  // Add printing state helper class
  document.body.classList.add('is-printing-resume');

  // Inject cleanup stylesheets immediately
  injectCleanupStyles();

  // Run native browser print dialog
  window.print();
}

/**
 * Restores DOM state and clears injected CSS after print finishes or is canceled.
 */
export function restoreAfterPrint() {
  // Restore body and document overflow/scroll states
  if (savedState) {
    document.body.style.overflow = savedState.bodyOverflow;
    document.documentElement.style.overflow = savedState.htmlOverflow;
    savedState = null;
  }

  document.body.classList.remove('is-printing-resume');

  // Clean up injected CSS stylesheet
  const styleEl = document.getElementById(STYLE_ID);
  if (styleEl) {
    styleEl.remove();
  }
}

/**
 * Hook or initialize listeners to support standard Ctrl+P / Cmd+P
 * browser-initiated print runs automatically.
 */
export function registerPrintLifecycleListeners() {
  const handleBeforePrint = () => {
    injectCleanupStyles();
    document.body.classList.add('is-printing-resume');
  };

  const handleAfterPrint = () => {
    restoreAfterPrint();
  };

  window.addEventListener('beforeprint', handleBeforePrint);
  window.addEventListener('afterprint', handleAfterPrint);

  return () => {
    window.removeEventListener('beforeprint', handleBeforePrint);
    window.removeEventListener('afterprint', handleAfterPrint);
  };
}
