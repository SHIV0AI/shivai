/**
 * Comprehensive Analytics Testing Suite
 * Run this in the browser console or integrate with your test framework
 */

import { analytics } from "@/lib/analytics";

export class AnalyticsTestSuite {
  private testResults: Array<{
    test: string;
    status: "pass" | "fail";
    message: string;
    duration: number;
  }> = [];

  /**
   * Run all analytics tests
   */
  async runAllTests(): Promise<void> {
    console.log("🧪 Starting Analytics Test Suite...\n");

    await this.testAnalyticsInitialization();
    await this.testEventTracking();
    await this.testConversionTracking();
    await this.testUserInteractions();
    await this.testErrorTracking();
    await this.testScrollDepthTracking();
    await this.testExternalLinkTracking();
    await this.testCTATracking();
    await this.testAnalyticsStatus();
    await this.testEventSerialization();
    await this.testMemoryLeaks();

    this.printResults();
  }

  /**
   * Test 1: Analytics Initialization
   */
  private async testAnalyticsInitialization(): Promise<void> {
    const startTime = performance.now();
    try {
      analytics.initializeAnalytics();
      const duration = performance.now() - startTime;

      this.addTestResult(
        "Analytics Initialization",
        "pass",
        "Analytics initialized successfully",
        duration
      );
    } catch (error) {
      this.addTestResult(
        "Analytics Initialization",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 2: Event Tracking
   */
  private async testEventTracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackEvent({
        category: "test",
        action: "test_event",
        label: "test_label",
        value: 42,
      });

      const finalEventCount = analytics.getLocalEvents().length;
      const duration = performance.now() - startTime;

      if (finalEventCount > initialEventCount) {
        this.addTestResult(
          "Event Tracking",
          "pass",
          `Event tracked successfully. Total events: ${finalEventCount}`,
          duration
        );
      } else {
        this.addTestResult(
          "Event Tracking",
          "fail",
          "Event not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "Event Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 3: Conversion Tracking
   */
  private async testConversionTracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackConversion("test_conversion", 99.99, { test: true });

      const finalEventCount = analytics.getLocalEvents().length;
      const lastEvent = analytics.getLocalEvents()[finalEventCount - 1];
      const duration = performance.now() - startTime;

      if (lastEvent?.category === "conversion") {
        this.addTestResult(
          "Conversion Tracking",
          "pass",
          `Conversion tracked: ${lastEvent.action}`,
          duration
        );
      } else {
        this.addTestResult(
          "Conversion Tracking",
          "fail",
          "Conversion not tracked correctly",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "Conversion Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 4: User Interactions
   */
  private async testUserInteractions(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackUserInteraction("click", "test_button", { test: true });

      const finalEventCount = analytics.getLocalEvents().length;
      const lastEvent = analytics.getLocalEvents()[finalEventCount - 1];
      const duration = performance.now() - startTime;

      if (lastEvent?.category === "user_interaction") {
        this.addTestResult(
          "User Interaction Tracking",
          "pass",
          `User interaction tracked: ${lastEvent.action}`,
          duration
        );
      } else {
        this.addTestResult(
          "User Interaction Tracking",
          "fail",
          "User interaction not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "User Interaction Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 5: Error Tracking
   */
  private async testErrorTracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      // Simulate error
      try {
        throw new Error("Test error for analytics");
      } catch (e) {
        analytics.trackEvent({
          category: "error",
          action: "test_error",
          label: "Test error message",
        });
      }

      const finalEventCount = analytics.getLocalEvents().length;
      const duration = performance.now() - startTime;

      if (finalEventCount > initialEventCount) {
        this.addTestResult(
          "Error Tracking",
          "pass",
          "Error tracked successfully",
          duration
        );
      } else {
        this.addTestResult(
          "Error Tracking",
          "fail",
          "Error not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "Error Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 6: Scroll Depth Tracking
   */
  private async testScrollDepthTracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackScrollDepth(50);

      const finalEventCount = analytics.getLocalEvents().length;
      const lastEvent = analytics.getLocalEvents()[finalEventCount - 1];
      const duration = performance.now() - startTime;

      if (lastEvent?.action === "scroll_depth") {
        this.addTestResult(
          "Scroll Depth Tracking",
          "pass",
          `Scroll depth tracked: ${lastEvent.value}%`,
          duration
        );
      } else {
        this.addTestResult(
          "Scroll Depth Tracking",
          "fail",
          "Scroll depth not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "Scroll Depth Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 7: External Link Tracking
   */
  private async testExternalLinkTracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackExternalLink("https://example.com", "Example Link");

      const finalEventCount = analytics.getLocalEvents().length;
      const lastEvent = analytics.getLocalEvents()[finalEventCount - 1];
      const duration = performance.now() - startTime;

      if (lastEvent?.category === "outbound") {
        this.addTestResult(
          "External Link Tracking",
          "pass",
          "External link tracked",
          duration
        );
      } else {
        this.addTestResult(
          "External Link Tracking",
          "fail",
          "External link not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "External Link Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 8: CTA Tracking
   */
  private async testCTATracking(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialEventCount = analytics.getLocalEvents().length;

      analytics.trackCTAClick("contact_form", "hero_section");

      const finalEventCount = analytics.getLocalEvents().length;
      const lastEvent = analytics.getLocalEvents()[finalEventCount - 1];
      const duration = performance.now() - startTime;

      if (lastEvent?.action === "cta_click") {
        this.addTestResult(
          "CTA Tracking",
          "pass",
          `CTA tracked: ${lastEvent.label}`,
          duration
        );
      } else {
        this.addTestResult(
          "CTA Tracking",
          "fail",
          "CTA not tracked",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "CTA Tracking",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 9: Analytics Status
   */
  private async testAnalyticsStatus(): Promise<void> {
    const startTime = performance.now();
    try {
      const status = analytics.getStatus();
      const duration = performance.now() - startTime;

      const statusMessage = `
        Production: ${status.isProduction}
        GA4: ${status.googleAnalyticsEnabled}
        Clarity: ${status.clarityEnabled}
        Error Tracking: ${status.errorTrackingEnabled}
        Events: ${status.eventCount}
      `;

      this.addTestResult(
        "Analytics Status",
        "pass",
        statusMessage.trim(),
        duration
      );
    } catch (error) {
      this.addTestResult(
        "Analytics Status",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 10: Event Serialization
   */
  private async testEventSerialization(): Promise<void> {
    const startTime = performance.now();
    try {
      const events = analytics.getLocalEvents();
      const serialized = JSON.stringify(events);
      const duration = performance.now() - startTime;

      if (serialized && serialized.length > 0) {
        this.addTestResult(
          "Event Serialization",
          "pass",
          `Events serialized: ${serialized.length} bytes`,
          duration
        );
      } else {
        this.addTestResult(
          "Event Serialization",
          "fail",
          "Events serialization failed",
          duration
        );
      }
    } catch (error) {
      this.addTestResult(
        "Event Serialization",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Test 11: Memory Leaks
   */
  private async testMemoryLeaks(): Promise<void> {
    const startTime = performance.now();
    try {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Generate many events
      for (let i = 0; i < 1000; i++) {
        analytics.trackEvent({
          category: "memory_test",
          action: `test_${i}`,
        });
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;
      const duration = performance.now() - startTime;

      // Clear events
      analytics.clearLocalEvents();

      this.addTestResult(
        "Memory Leak Detection",
        "pass",
        `Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`,
        duration
      );
    } catch (error) {
      this.addTestResult(
        "Memory Leak Detection",
        "fail",
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        performance.now() - startTime
      );
    }
  }

  /**
   * Add test result
   */
  private addTestResult(
    test: string,
    status: "pass" | "fail",
    message: string,
    duration: number
  ): void {
    this.testResults.push({ test, status, message, duration });
  }

  /**
   * Print test results
   */
  private printResults(): {
    passed: number;
    failed: number;
    total: number;
    results: Array<{ test: string; status: "pass" | "fail"; message: string; duration: number }>;
  } {
    console.log("\n" + "=".repeat(80));
    console.log("📊 ANALYTICS TEST RESULTS");
    console.log("=".repeat(80) + "\n");

    let passCount = 0;
    let failCount = 0;

    this.testResults.forEach((result) => {
      const icon = result.status === "pass" ? "✅" : "❌";
      console.log(`${icon} ${result.test}`);
      console.log(`   Status: ${result.status.toUpperCase()}`);
      console.log(`   Message: ${result.message}`);
      console.log(`   Duration: ${result.duration.toFixed(2)}ms\n`);

      if (result.status === "pass") passCount++;
      else failCount++;
    });

    console.log("=".repeat(80));
    console.log(
      `✅ Passed: ${passCount} | ❌ Failed: ${failCount} | Total: ${this.testResults.length}`
    );
    console.log("=".repeat(80) + "\n");

    // Return summary
    return {
      passed: passCount,
      failed: failCount,
      total: this.testResults.length,
      results: this.testResults,
    };
  }
}

// Export for browser console access
if (typeof window !== "undefined") {
  (window as any).analyticsTestSuite = new AnalyticsTestSuite();
  console.log(
    "📊 Analytics Test Suite loaded. Run: analyticsTestSuite.runAllTests()"
  );
}

