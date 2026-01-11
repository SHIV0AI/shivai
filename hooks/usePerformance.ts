import { useEffect, useRef, useState } from 'react';

/**
 * Hook for lazy loading components that are not immediately visible
 * Improves FCP (First Contentful Paint) and LCP (Largest Contentful Paint)
 */
export function useLazyLoad(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: '50px',
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
}

/**
 * Hook for monitoring Core Web Vitals in real-time
 */
export function useCoreWebVitals() {
  useEffect(() => {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      return () => lcpObserver.disconnect();
    } catch (e) {
      console.log('LCP not supported');
    }
  }, []);
}

/**
 * Hook for monitoring Interaction to Next Paint (INP)
 */
export function useInteractionToNextPaint() {
  useEffect(() => {
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('INP:', entry.processingDuration);
        });
      });
      inpObserver.observe({ entryTypes: ['event'] });
      return () => inpObserver.disconnect();
    } catch (e) {
      console.log('INP not supported');
    }
  }, []);
}
