/**
 * Comprehensive Analytics Utility for Production
 * Integrates: Google Analytics 4, Microsoft Clarity, Vercel Web Vitals, Custom Event Tracking
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp?: number;
  metadata?: Record<string, any>;
}

interface PageViewData {
  path: string;
  title: string;
  referrer?: string;
  timestamp?: number;
}

class Analytics {
  private isProduction: boolean;
  private enableVercelAnalytics: boolean;
  private gaId: string | undefined;
  private clarityId: string | undefined;
  private enableErrorTracking: boolean;
  private localEvents: AnalyticsEvent[] = [];

  constructor() {
    this.isProduction = process.env.NODE_ENV === "production";
    this.enableVercelAnalytics = process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true";
    this.gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
    this.clarityId = process.env.NEXT_PUBLIC_MS_CLARITY_ID;
    this.enableErrorTracking = process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === "true";
  }

  /**
   * Initialize all analytics services
   */
  initializeAnalytics(): void {
    if (!this.isProduction) {
      console.log("📊 Analytics: Running in development mode - logging events to console");
      return;
    }

    // Google Analytics 4
    if (this.gaId) {
      this.initializeGoogleAnalytics();
    }

    // Microsoft Clarity
    if (this.clarityId) {
      this.initializeClarity();
    }

    // Setup error tracking
    if (this.enableErrorTracking) {
      this.setupErrorTracking();
    }

    console.log("✅ Analytics: All services initialized");
  }

  /**
   * Initialize Google Analytics 4
   */
  private initializeGoogleAnalytics(): void {
    if (typeof window === "undefined") return;

    // Create gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag("js", new Date());
    (window as any).gtag("config", this.gaId, {
      page_path: window.location.pathname,
      allow_google_signals: false,
      anonymize_ip: true,
    });

    console.log("✅ Google Analytics 4 initialized");
  }

  /**
   * Initialize Microsoft Clarity
   */
  private initializeClarity(): void {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${this.clarityId}");
    `;
    document.head.appendChild(script);

    console.log("✅ Microsoft Clarity initialized");
  }

  /**
   * Track page views
   */
  trackPageView(data: PageViewData): void {
    const event: AnalyticsEvent = {
      category: "page_view",
      action: "view",
      label: data.path,
      metadata: {
        title: data.title,
        referrer: data.referrer || document.referrer,
      },
      timestamp: data.timestamp || Date.now(),
    };

    this.trackEvent(event);
  }

  /**
   * Track custom events
   */
  trackEvent(event: AnalyticsEvent): void {
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
    };

    // Store locally for debugging
    this.localEvents.push(enrichedEvent);

    if (!this.isProduction) {
      console.log("📊 Analytics Event:", enrichedEvent);
      return;
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }

    // Clarity
    if ((window as any).clarity) {
      (window as any).clarity("set", {
        [event.category]: event.action,
      });
    }
  }

  /**
   * Track user interactions
   */
  trackUserInteraction(
    action: "click" | "submit" | "scroll" | "focus",
    element: string,
    metadata?: Record<string, any>
  ): void {
    this.trackEvent({
      category: "user_interaction",
      action,
      label: element,
      metadata,
    });
  }

  /**
   * Track conversions (contact form, sign-up, etc.)
   */
  trackConversion(conversionType: string, value?: number, metadata?: Record<string, any>): void {
    this.trackEvent({
      category: "conversion",
      action: conversionType,
      value,
      metadata,
    });

    // Send to GA as conversion
    if ((window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        conversion_type: conversionType,
        conversion_value: value,
        ...metadata,
      });
    }
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(page: string, timeSeconds: number): void {
    this.trackEvent({
      category: "engagement",
      action: "time_on_page",
      label: page,
      value: Math.round(timeSeconds),
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(percentage: number): void {
    this.trackEvent({
      category: "engagement",
      action: "scroll_depth",
      value: percentage,
      metadata: {
        milestone: this.getScrollMilestone(percentage),
      },
    });
  }

  /**
   * Track external link clicks
   */
  trackExternalLink(url: string, text?: string): void {
    this.trackEvent({
      category: "outbound",
      action: "click",
      label: url,
      metadata: {
        link_text: text,
      },
    });
  }

  /**
   * Track CTA clicks
   */
  trackCTAClick(ctaName: string, section?: string): void {
    this.trackEvent({
      category: "engagement",
      action: "cta_click",
      label: ctaName,
      metadata: {
        section,
      },
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(featureName: string, action: string, metadata?: Record<string, any>): void {
    this.trackEvent({
      category: "feature",
      action,
      label: featureName,
      metadata,
    });
  }

  /**
   * Setup global error tracking
   */
  private setupErrorTracking(): void {
    if (typeof window === "undefined") return;

    window.addEventListener("error", (event) => {
      this.trackEvent({
        category: "error",
        action: "javascript_error",
        label: event.message,
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
        },
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.trackEvent({
        category: "error",
        action: "unhandled_rejection",
        label: event.reason?.toString() || "Unknown",
        metadata: {
          reason: event.reason,
        },
      });
    });
  }

  /**
   * Get scroll milestone
   */
  private getScrollMilestone(percentage: number): string {
    if (percentage < 25) return "0-25%";
    if (percentage < 50) return "25-50%";
    if (percentage < 75) return "50-75%";
    return "75-100%";
  }

  /**
   * Get all local events (for testing/debugging)
   */
  getLocalEvents(): AnalyticsEvent[] {
    return this.localEvents;
  }

  /**
   * Clear local events
   */
  clearLocalEvents(): void {
    this.localEvents = [];
  }

  /**
   * Get analytics status
   */
  getStatus(): {
    isProduction: boolean;
    googleAnalyticsEnabled: boolean;
    clarityEnabled: boolean;
    errorTrackingEnabled: boolean;
    eventCount: number;
  } {
    return {
      isProduction: this.isProduction,
      googleAnalyticsEnabled: !!this.gaId,
      clarityEnabled: !!this.clarityId,
      errorTrackingEnabled: this.enableErrorTracking,
      eventCount: this.localEvents.length,
    };
  }
}

// Export singleton instance
export const analytics = new Analytics();

export type { AnalyticsEvent, PageViewData };
