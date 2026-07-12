import { useState, useEffect } from 'react';

export function usePerformanceConfig() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect fine pointer (mouse) vs coarse pointer (touch/mobile)
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const widthQuery = window.matchMedia('(min-width: 768px)');
    
    const checkIsDesktop = () => {
      // Desktop devices must have both a fine pointer AND be larger than mobile portrait/tablet size
      return pointerQuery.matches && widthQuery.matches;
    };

    setIsDesktop(checkIsDesktop());

    const pointerHandler = () => setIsDesktop(checkIsDesktop());
    const widthHandler = () => setIsDesktop(checkIsDesktop());

    pointerQuery.addEventListener('change', pointerHandler);
    widthQuery.addEventListener('change', widthHandler);

    // Reduced motion accessibility preference check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    return () => {
      pointerQuery.removeEventListener('change', pointerHandler);
      widthQuery.removeEventListener('change', widthHandler);
      motionQuery.removeEventListener('change', motionHandler);
    };
  }, []);

  // Mobile/coarse-touch devices and prefers-reduced-motion will fall back to zero/low motion
  const isLowPerformance = !isDesktop || prefersReducedMotion;

  return {
    isDesktop,
    prefersReducedMotion,
    isLowPerformance,
  };
}
