/**
 * Web Vitals Hook for tracking Core Web Vitals
 * Tracks LCP, FID/INP, and CLS
 */

import { analytics } from "@/lib/analytics";

export function useWebVitals() {
  if (typeof window === "undefined") return;

  // Track Core Web Vitals
  const observeWebVitals = () => {
    // Largest Contentful Paint (LCP)
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          analytics.trackEvent({
            category: "web_vitals",
            action: "lcp",
            value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
            metadata: {
              metric: "largest_contentful_paint",
              element: lastEntry.toJSON(),
            },
          });
        });

        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        console.warn("LCP observer not supported");
      }

      // First Input Delay / Interaction to Next Paint (FID/INP)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry: any) => {
            analytics.trackEvent({
              category: "web_vitals",
              action: entry.name === "first-input" ? "fid" : "inp",
              value: Math.round(entry.processingDuration),
              metadata: {
                metric: entry.name,
                start_time: Math.round(entry.startTime),
              },
            });
          });
        });

        fidObserver.observe({ entryTypes: ["first-input", "interaction"] });
      } catch (e) {
        console.warn("FID/INP observer not supported");
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              
              analytics.trackEvent({
                category: "web_vitals",
                action: "cls",
                value: Math.round(clsValue * 100) / 100,
                metadata: {
                  metric: "cumulative_layout_shift",
                  session_value: clsValue,
                },
              });
            }
          });
        });

        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        console.warn("CLS observer not supported");
      }

      // Navigation Timing
      try {
        if (performance.timing && performance.timing.loadEventEnd) {
          const navigationTiming = performance.timing;
          const pageLoadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
          const domContentLoadedTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart;
          const ttfb = navigationTiming.responseStart - navigationTiming.navigationStart;

          analytics.trackEvent({
            category: "web_vitals",
            action: "navigation_timing",
            metadata: {
              page_load_time: pageLoadTime,
              dom_content_loaded_time: domContentLoadedTime,
              time_to_first_byte: ttfb,
            },
          });
        }
      } catch (e) {
        console.warn("Navigation Timing not supported");
      }
    }
  };

  // Call on page load
  if (document.readyState === "complete") {
    observeWebVitals();
  } else {
    window.addEventListener("load", observeWebVitals);
  }
}
