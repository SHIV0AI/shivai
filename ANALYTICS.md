# 📊 Analytics Implementation & Production Guide

## Overview
This website now has comprehensive analytics tracking with Google Analytics 4, Microsoft Clarity, and custom event tracking. All analytics are production-ready with error tracking and performance monitoring.

## 📦 Installed Analytics Packages
- **@vercel/analytics** - Real User Monitoring (RUM)
- **@vercel/web-vitals** - Core Web Vitals tracking
- **next-gtag** - Google Analytics 4 integration
- **microsoft-clarity** - Session recordings and heatmaps
- Custom analytics utility for fine-grained event tracking

## 🔧 Environment Configuration

All analytics IDs are configured in `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-7CZHOLYYPC
NEXT_PUBLIC_MS_CLARITY_ID=uyricts64v
NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
```

## 📈 Analytics Features

### 1. **Google Analytics 4 (GA4)**
- Automatic page view tracking
- Event tracking for user interactions
- Conversion tracking
- Real-time reporting
- Audience insights
- User journey analysis

**Dashboard:** https://analytics.google.com

### 2. **Microsoft Clarity**
- Session recordings (video)
- Heatmaps (click, scroll, attention)
- Rage clicks detection
- Dead click detection
- User feedback
- Accessibility insights

**Dashboard:** https://clarity.microsoft.com

### 3. **Vercel Web Vitals**
- Largest Contentful Paint (LCP)
- Interaction to Next Paint (INP) / First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- Real user metrics

**Dashboard:** Vercel Analytics dashboard

### 4. **Custom Event Tracking**
Comprehensive event tracking via `analytics` utility:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

export function MyComponent() {
  const analytics = useAnalytics();

  const handleClick = () => {
    analytics.trackCTAClick('contact_form', 'hero_section');
    analytics.trackConversion('contact_submission', 1);
  };

  return <button onClick={handleClick}>Contact Us</button>;
}
```

## 📊 Tracked Events

### Automatic Tracking
- **Page Views** - Automatic on route changes
- **Scroll Depth** - Tracks in 25% increments (0%, 25%, 50%, 75%, 100%)
- **Time on Page** - Tracks when user leaves page
- **Button Clicks** - Auto-tracked on all buttons
- **External Links** - Outbound link clicks
- **Session Pings** - Every 5 minutes to maintain session

### Manual Event Categories

#### User Interactions
```typescript
analytics.trackUserInteraction('click', 'button_name', { context: 'value' });
analytics.trackUserInteraction('submit', 'form_name');
analytics.trackUserInteraction('scroll', 'page_section');
```

#### Conversions
```typescript
analytics.trackConversion('contact_form_submission', 1);
analytics.trackConversion('demo_request', 1, { plan: 'enterprise' });
analytics.trackConversion('newsletter_signup', 1);
```

#### CTA Clicks
```typescript
analytics.trackCTAClick('get_started', 'hero_section');
analytics.trackCTAClick('book_demo', 'services_section');
```

#### Feature Usage
```typescript
analytics.trackFeatureUsage('3d_model', 'interaction', { duration: 30 });
analytics.trackFeatureUsage('chat_widget', 'open');
```

#### Custom Events
```typescript
analytics.trackEvent({
  category: 'custom_category',
  action: 'custom_action',
  label: 'custom_label',
  value: 100,
  metadata: { key: 'value' }
});
```

## 🧪 Testing Analytics

### Browser Console Testing

1. Open browser DevTools (F12)
2. Navigate to your website
3. Run analytics tests:

```javascript
analyticsTestSuite.runAllTests()
```

This will run 11 comprehensive tests:
- ✅ Analytics Initialization
- ✅ Event Tracking
- ✅ Conversion Tracking
- ✅ User Interactions
- ✅ Error Tracking
- ✅ Scroll Depth Tracking
- ✅ External Link Tracking
- ✅ CTA Tracking
- ✅ Analytics Status
- ✅ Event Serialization
- ✅ Memory Leak Detection

### View Analytics Status

```javascript
analyticsTestSuite.analyticsStatus()
```

Returns:
```javascript
{
  isProduction: true,
  googleAnalyticsEnabled: true,
  clarityEnabled: true,
  errorTrackingEnabled: true,
  eventCount: 42
}
```

### Debug Local Events

```javascript
// View all tracked events
console.log(analytics.getLocalEvents());

// Clear events
analytics.clearLocalEvents();
```

## 📱 Component Integration Examples

### Track Form Submission
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

export function ContactForm() {
  const analytics = useAnalytics();

  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      analytics.trackConversion('contact_form', 1, { 
        service: data.service 
      });
      analytics.trackEvent({
        category: 'contact',
        action: 'form_submitted',
        label: data.service
      });
    } catch (error) {
      analytics.trackEvent({
        category: 'contact',
        action: 'form_error',
        label: error.message
      });
    }
  };

  return /* form JSX */;
}
```

### Track 3D Interaction
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

export function ThreeModel() {
  const analytics = useAnalytics();

  const handleModelInteraction = () => {
    analytics.trackFeatureUsage('3d_hero', 'interaction', {
      duration: 15,
      interaction_type: 'rotation'
    });
  };

  return /* 3D model JSX */;
}
```

### Track Pricing Plan Selection
```typescript
const handleSelectPlan = (plan) => {
  analytics.trackEvent({
    category: 'pricing',
    action: 'plan_selected',
    label: plan.name,
    value: plan.price,
    metadata: {
      billing_period: plan.period,
      features: plan.features.length
    }
  });
};
```

## 🔐 Privacy & Compliance

### GDPR Compliance
- ✅ Anonymized IP addresses
- ✅ No personally identifiable information (PII) collected
- ✅ User consent can be implemented
- ✅ Data retention: 365 days (configurable)

### Data Collection
- ✅ Session data
- ✅ Event data with timestamps
- ✅ User behavior (non-personal)
- ✅ Performance metrics
- ✅ Error logs

### User Privacy
```typescript
// In .env.local
NEXT_PUBLIC_CSP_ENABLED=true  // Content Security Policy
NEXT_PUBLIC_FORCE_HTTPS=true  // HTTPS enforcement
```

## 🚀 Deployment Checklist

### Pre-Production Testing
- [ ] Run `npm install` to install all analytics packages
- [ ] Test analytics in development: `npm run dev`
- [ ] Run full test suite: `analyticsTestSuite.runAllTests()`
- [ ] Verify GA4 property is created and ID is correct
- [ ] Verify Clarity project is created and ID is correct
- [ ] Test all CTAs and conversions manually
- [ ] Verify no console errors in DevTools
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Check performance metrics

### Production Deployment
- [ ] Update `.env.local` with production analytics IDs
- [ ] Set `NODE_ENV=production`
- [ ] Set `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=true`
- [ ] Set `NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true`
- [ ] Run production build: `npm run build`
- [ ] Deploy to production
- [ ] Verify analytics data flowing in GA4 (Real-time report)
- [ ] Verify session recordings in Clarity
- [ ] Monitor Web Vitals in dashboard
- [ ] Set up email alerts for errors

### Monitoring
- [ ] Set up GA4 alerts for anomalies
- [ ] Monitor Core Web Vitals weekly
- [ ] Review session recordings weekly
- [ ] Check error logs daily
- [ ] Monitor conversion rates
- [ ] Review user flow and funnels

## 📊 Dashboard Access

### Google Analytics 4
- **URL:** https://analytics.google.com
- **Property ID:** G-7CZHOLYYPC
- **Views:** Real-time, Users, Events, Conversions

### Microsoft Clarity
- **URL:** https://clarity.microsoft.com
- **Project ID:** uyricts64v
- **Views:** Session recordings, Heatmaps, Insights

### Vercel Analytics
- **URL:** https://vercel.com/dashboard
- **Metrics:** Core Web Vitals, Page Performance

## 🛠️ Troubleshooting

### Analytics Not Showing
1. Check `.env.local` for correct analytics IDs
2. Verify website is in production mode (`NODE_ENV=production`)
3. Wait 24 hours for initial data to appear in GA4
4. Check browser DevTools for any errors
5. Verify ad blocker is not blocking analytics

### Events Not Tracking
1. Check `useAnalytics()` hook is imported correctly
2. Verify event category and action names
3. Check browser console for errors
4. Verify analytics is initialized: `console.log(analytics.getStatus())`

### High Bounce Rate
1. Check scroll tracking is working
2. Verify time on page is tracked
3. Check for JavaScript errors
4. Review user interactions in heatmap
5. Check page load performance

### Slow Performance
1. Check Core Web Vitals in Vercel dashboard
2. Optimize LCP: optimize images, lazy load
3. Optimize INP: reduce JavaScript execution
4. Optimize CLS: predefine sizes for images/ads
5. Use `next/image` for image optimization

## 📚 Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/performance-overview)

## 📞 Support

For analytics implementation questions, refer to:
1. Check `/lib/analytics.ts` for available methods
2. Check `/components/AnalyticsProvider.tsx` for integration
3. Run browser console tests: `analyticsTestSuite.runAllTests()`
4. Check official documentation links above
