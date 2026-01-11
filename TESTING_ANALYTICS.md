# 🧪 Analytics Full Testing Guide

## Running Full Analytics Test Suite

### Step 1: Start Development Server

```bash
cd /Users/shivambahuguna/Dev/Shivai-Website
npm run dev
```

Output:
```
▲ Next.js 15.5.9
  Local:        http://localhost:3000
  Environments: .env.local
```

### Step 2: Open Website in Browser

Navigate to: http://localhost:3000

### Step 3: Open Browser Developer Tools

Press: `F12` or `Cmd+Option+I` (Mac)

### Step 4: Run Complete Analytics Test Suite

Copy and paste this entire code block into the browser console and press Enter:

```javascript
// ==================== ANALYTICS TEST SUITE ====================

console.log("🚀 Starting Comprehensive Analytics Test Suite...\n");

// Test 1: Check Analytics Status
console.log("📊 TEST 1: Analytics Status");
try {
  const status = analytics.getStatus();
  console.log("✅ Status Retrieved:");
  console.log(`   - Production: ${status.isProduction}`);
  console.log(`   - GA4 Enabled: ${status.googleAnalyticsEnabled}`);
  console.log(`   - Clarity Enabled: ${status.clarityEnabled}`);
  console.log(`   - Error Tracking: ${status.errorTrackingEnabled}`);
  console.log(`   - Event Count: ${status.eventCount}\n`);
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 2: Clear and Track Event
console.log("📊 TEST 2: Event Tracking");
try {
  analytics.clearLocalEvents();
  analytics.trackEvent({
    category: "test",
    action: "test_event",
    label: "manual_test",
    value: 42,
    metadata: { test: true }
  });
  const events = analytics.getLocalEvents();
  console.log(`✅ Event Tracked: ${events.length} event(s)`);
  console.log(`   - Category: ${events[0].category}`);
  console.log(`   - Action: ${events[0].action}`);
  console.log(`   - Label: ${events[0].label}`);
  console.log(`   - Value: ${events[0].value}\n`);
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 3: Page View Tracking
console.log("📊 TEST 3: Page View Tracking");
try {
  analytics.trackPageView({
    path: window.location.pathname,
    title: document.title
  });
  const events = analytics.getLocalEvents();
  const pageViewEvent = events.find(e => e.category === "page_view");
  if (pageViewEvent) {
    console.log("✅ Page View Tracked:");
    console.log(`   - Path: ${pageViewEvent.label}`);
    console.log(`   - Title: ${pageViewEvent.metadata?.title}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 4: Conversion Tracking
console.log("📊 TEST 4: Conversion Tracking");
try {
  analytics.trackConversion("test_conversion", 99.99, { test: true });
  const events = analytics.getLocalEvents();
  const conversionEvent = events.find(e => e.category === "conversion");
  if (conversionEvent) {
    console.log("✅ Conversion Tracked:");
    console.log(`   - Type: ${conversionEvent.action}`);
    console.log(`   - Value: $${conversionEvent.value}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 5: User Interaction
console.log("📊 TEST 5: User Interaction Tracking");
try {
  analytics.trackUserInteraction("click", "test_button", { test: true });
  const events = analytics.getLocalEvents();
  const interactionEvent = events.find(e => e.category === "user_interaction");
  if (interactionEvent) {
    console.log("✅ User Interaction Tracked:");
    console.log(`   - Action: ${interactionEvent.action}`);
    console.log(`   - Element: ${interactionEvent.label}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 6: Scroll Depth
console.log("📊 TEST 6: Scroll Depth Tracking");
try {
  analytics.trackScrollDepth(50);
  const events = analytics.getLocalEvents();
  const scrollEvent = events.find(e => e.action === "scroll_depth");
  if (scrollEvent) {
    console.log("✅ Scroll Depth Tracked:");
    console.log(`   - Percentage: ${scrollEvent.value}%\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 7: External Link
console.log("📊 TEST 7: External Link Tracking");
try {
  analytics.trackExternalLink("https://example.com", "Example Link");
  const events = analytics.getLocalEvents();
  const linkEvent = events.find(e => e.category === "outbound");
  if (linkEvent) {
    console.log("✅ External Link Tracked:");
    console.log(`   - URL: ${linkEvent.label}`);
    console.log(`   - Text: ${linkEvent.metadata?.link_text}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 8: CTA Click
console.log("📊 TEST 8: CTA Click Tracking");
try {
  analytics.trackCTAClick("get_started", "hero_section");
  const events = analytics.getLocalEvents();
  const ctaEvent = events.find(e => e.action === "cta_click");
  if (ctaEvent) {
    console.log("✅ CTA Click Tracked:");
    console.log(`   - CTA: ${ctaEvent.label}`);
    console.log(`   - Section: ${ctaEvent.metadata?.section}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 9: Feature Usage
console.log("📊 TEST 9: Feature Usage Tracking");
try {
  analytics.trackFeatureUsage("3d_model", "interaction", { duration: 30 });
  const events = analytics.getLocalEvents();
  const featureEvent = events.find(e => e.category === "feature");
  if (featureEvent) {
    console.log("✅ Feature Usage Tracked:");
    console.log(`   - Feature: ${featureEvent.label}`);
    console.log(`   - Action: ${featureEvent.action}\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 10: Time on Page
console.log("📊 TEST 10: Time on Page Tracking");
try {
  analytics.trackTimeOnPage(window.location.pathname, 45);
  const events = analytics.getLocalEvents();
  const timeEvent = events.find(e => e.action === "time_on_page");
  if (timeEvent) {
    console.log("✅ Time on Page Tracked:");
    console.log(`   - Page: ${timeEvent.label}`);
    console.log(`   - Seconds: ${timeEvent.value}s\n`);
  }
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Test 11: Event Serialization
console.log("📊 TEST 11: Event Serialization");
try {
  const events = analytics.getLocalEvents();
  const serialized = JSON.stringify(events);
  console.log("✅ Events Serialized Successfully:");
  console.log(`   - Total Events: ${events.length}`);
  console.log(`   - Size: ${serialized.length} bytes\n`);
} catch (e) {
  console.error("❌ Error:", e.message);
}

// Summary
console.log("=".repeat(60));
console.log("📊 ALL TESTS COMPLETED");
console.log("=".repeat(60));
console.log("\n📈 AVAILABLE COMMANDS:\n");
console.log("1. View all events:");
console.log("   console.log(analytics.getLocalEvents())");
console.log("\n2. Check analytics status:");
console.log("   console.log(analytics.getStatus())");
console.log("\n3. Clear events:");
console.log("   analytics.clearLocalEvents()");
console.log("\n4. Track custom event:");
console.log("   analytics.trackEvent({");
console.log("     category: 'custom',");
console.log("     action: 'test'");
console.log("   })");
console.log("\n5. View Google Analytics:");
console.log("   https://analytics.google.com");
console.log("\n6. View Microsoft Clarity:");
console.log("   https://clarity.microsoft.com\n");
```

### Step 5: Expected Output

You should see output like:

```
🚀 Starting Comprehensive Analytics Test Suite...

📊 TEST 1: Analytics Status
✅ Status Retrieved:
   - Production: false
   - GA4 Enabled: true
   - Clarity Enabled: true
   - Error Tracking: true
   - Event Count: 0

📊 TEST 2: Event Tracking
✅ Event Tracked: 1 event(s)
   - Category: test
   - Action: test_event
   - Label: manual_test
   - Value: 42

[... more tests ...]

📊 ALL TESTS COMPLETED
============================================================
📈 AVAILABLE COMMANDS:
...
```

### Step 6: Manual User Interaction Tests

After running the test suite, perform these manual tests:

#### Test 1: Navigation
1. Click on different navigation links
2. Observe events in console: `console.log(analytics.getLocalEvents())`
3. Should see `page_view` events

#### Test 2: Scrolling
1. Scroll down the page
2. Watch for `scroll_depth` events (25%, 50%, 75%, 100%)
3. Check: `analytics.getLocalEvents().filter(e => e.action === 'scroll_depth')`

#### Test 3: Button Clicks
1. Click any button on the page
2. Should see `user_interaction` events with action: "click"
3. Check: `analytics.getLocalEvents().filter(e => e.category === 'user_interaction')`

#### Test 4: External Links
1. Click any external link
2. Should see `outbound` events
3. Check: `analytics.getLocalEvents().filter(e => e.category === 'outbound')`

#### Test 5: Form Submission (if available)
1. Fill out and submit the contact form
2. Should see `conversion` events
3. Check: `analytics.getLocalEvents().filter(e => e.category === 'conversion')`

### Step 7: Check Error Tracking

1. In browser console, simulate an error:
   ```javascript
   throw new Error("Test error");
   ```

2. Check that it's tracked:
   ```javascript
   analytics.getLocalEvents().filter(e => e.category === 'error')
   ```

### Step 8: Monitor Performance Metrics

1. In console, check Web Vitals:
   ```javascript
   analytics.getLocalEvents().filter(e => e.category === 'web_vitals')
   ```

2. Check navigation timing:
   ```javascript
   performance.timing
   ```

### Step 9: Production Mode Testing

Build for production:
```bash
npm run build
npm run start
```

Visit: http://localhost:3000

Repeat all tests above in production build.

### Step 10: Real Analytics Dashboards

#### Google Analytics 4
1. Go to: https://analytics.google.com
2. Select property: "Shiv.AI"
3. Navigate to Real-time report
4. You should see your page views and events
5. Note: Data may take 24 hours to appear in standard reports

#### Microsoft Clarity
1. Go to: https://clarity.microsoft.com
2. Select project: "Shiv.AI"
3. View latest sessions
4. You should see your session recording
5. Check heatmaps for click/scroll data

## 📊 Complete Test Results Template

```
═══════════════════════════════════════════════════════════
📊 ANALYTICS TEST RESULTS - [DATE/TIME]
═══════════════════════════════════════════════════════════

Environment:
- Mode: [Development/Production]
- Node.js: [version]
- Browser: [name/version]
- URL: http://localhost:3000

Test Results:
─────────────────────────────────────────────────────────
✅ Analytics Initialization
✅ Event Tracking
✅ Page View Tracking
✅ Conversion Tracking
✅ User Interaction Tracking
✅ Scroll Depth Tracking
✅ External Link Tracking
✅ CTA Click Tracking
✅ Feature Usage Tracking
✅ Time on Page Tracking
✅ Event Serialization

Manual Tests:
─────────────────────────────────────────────────────────
✅ Navigation tracking
✅ Scroll depth tracking
✅ Button click tracking
✅ External link tracking
✅ Form submission tracking
✅ Error tracking
✅ Performance metrics

Analytics Dashboards:
─────────────────────────────────────────────────────────
✅ Google Analytics 4 - Data flowing
✅ Microsoft Clarity - Sessions recording
✅ Vercel Analytics - Metrics available

Status:
✅ READY FOR PRODUCTION

═══════════════════════════════════════════════════════════
```

## 🔍 Troubleshooting

### Analytics Not Showing
```javascript
// Check if analytics is initialized
console.log(analytics.getStatus());

// Should show: isProduction: false (in dev mode)
```

### Events Not Tracking
```javascript
// Make sure you see events after performing actions
console.log(analytics.getLocalEvents());

// Should have more than 1 event after interacting
```

### Errors in Console
1. Check browser console for JavaScript errors
2. Verify .env.local is loaded
3. Verify analytics IDs are correct

### Production Build Issues
1. Run `npm run build` to check for errors
2. Run `npm run start` to test production build
3. Check that analytics is enabled: `NODE_ENV=production`

## 📞 Next Steps

After completing all tests:
1. ✅ Verify all tests pass
2. ✅ Document test results
3. ✅ Deploy to production
4. ✅ Monitor analytics dashboards
5. ✅ Set up alerts and monitoring
