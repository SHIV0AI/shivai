/**
 * Custom hook for using analytics in components
 */

import { analytics } from "@/lib/analytics";

export function useAnalytics() {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackTimeOnPage: analytics.trackTimeOnPage.bind(analytics),
    trackScrollDepth: analytics.trackScrollDepth.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
    trackCTAClick: analytics.trackCTAClick.bind(analytics),
    trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
  };
}
