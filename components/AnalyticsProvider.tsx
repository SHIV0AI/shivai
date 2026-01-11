"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const timeOnPageRef = useRef<number>(0);
  const lastScrollDepthRef = useRef<number>(0);
  const pageStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Initialize analytics on client side
    analytics.initializeAnalytics();

    // Track page view
    analytics.trackPageView({
      path: pathname,
      title: document.title,
    });

    pageStartTimeRef.current = Date.now();

    return () => {
      // Track time on page when navigating away
      const timeSeconds = (Date.now() - pageStartTimeRef.current) / 1000;
      if (timeSeconds > 1) {
        analytics.trackTimeOnPage(pathname, timeSeconds);
      }
    };
  }, [pathname]);

  useEffect(() => {
    // Setup scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );

        // Only track every 25% increment
        const currentMilestone = Math.floor(scrollPercentage / 25) * 25;
        if (currentMilestone > lastScrollDepthRef.current) {
          lastScrollDepthRef.current = currentMilestone;
          analytics.trackScrollDepth(currentMilestone);
        }
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    // Setup click tracking for common elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Track button clicks
      if (target.matches("button, [role='button']")) {
        const buttonText = target.innerText || target.getAttribute("aria-label");
        analytics.trackUserInteraction("click", buttonText || "button");
      }

      // Track external links
      if (target.matches("a")) {
        const link = target as HTMLAnchorElement;
        if (link.hostname !== window.location.hostname) {
          analytics.trackExternalLink(link.href, link.innerText);
        }
      }

      // Track CTA clicks
      if (target.closest("[data-cta]")) {
        const ctaName = target.closest("[data-cta]")?.getAttribute("data-cta") || undefined;
        const section = target.closest("[data-section]")?.getAttribute("data-section") || undefined;
        analytics.trackCTAClick(ctaName || "cta", section);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Periodic session tracking
  useEffect(() => {
    const sessionInterval = setInterval(() => {
      analytics.trackEvent({
        category: "session",
        action: "ping",
        metadata: {
          duration: Math.round((Date.now() - pageStartTimeRef.current) / 1000),
        },
      });
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(sessionInterval);
  }, []);

  return <>{children}</>;
}
