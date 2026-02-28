"use client";

import dynamic from "next/dynamic";

const LoadingPlaceholder = ({ height }: { height: string }) => (
  <div className={`${height} animate-pulse rounded-2xl`} style={{ background: "rgba(0,255,245,0.03)" }} />
);
LoadingPlaceholder.displayName = "LoadingPlaceholder";

// Dynamic imports with loading skeletons — keeps initial JS bundle small
const EnhancedHeroAI = dynamic(() => import("@/components/EnhancedHeroAI"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="min-h-screen" />,
});
const HomeHighlights = dynamic(() => import("@/components/HomeHighlights"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-96" />,
});
const AIGlobe3D = dynamic(() => import("@/components/AIGlobe3D"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-96" />,
});
const ServiceGraph = dynamic(() => import("@/components/ServiceGraph"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-80" />,
});
const TrainingProgressAnim = dynamic(() => import("@/components/TrainingProgressAnim"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-72" />,
});
const LiveDataViz = dynamic(() => import("@/components/LiveDataViz"), {
  ssr: false,
  loading: () => <LoadingPlaceholder height="h-72" />,
});

export default function HomeClient() {
  return (
    <>
      {/* Hero — clean, agentic, customer-friendly */}
      <EnhancedHeroAI />

      {/* Highlights — animated feature cards, stats, CTA teasers linking to dedicated pages */}
      <HomeHighlights />

      {/* Service Knowledge Graph */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(191,0,255,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceGraph />
        </div>
      </section>

      {/* Live Training Metrics — lightweight reuse from Neuro Lab */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,245,0.03) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-cyan inline-block neon-glow-cyan">
              📊 Live Metrics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
              Live <span className="gradient-text-neon">Training Metrics</span>
            </h2>
            <p className="text-themed-secondary max-w-2xl mx-auto text-sm">
              Real-time model training progress and data pipeline telemetry
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="ai-glass rounded-2xl overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-4 text-themed-primary">Training Progress</h3>
              <TrainingProgressAnim />
            </div>
            <div className="ai-glass rounded-2xl overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-4 text-themed-primary">Live Data Feed</h3>
              <LiveDataViz />
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence — Location Globe */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,245,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-cyan inline-block neon-glow-cyan">
              🌍 Global Presence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
              Operating <span className="gradient-text-neon">Worldwide</span>
            </h2>
            <p className="text-themed-secondary max-w-2xl mx-auto text-sm">
              Headquartered in Dehradun, India with operations in Singapore — serving clients globally
            </p>
          </div>
          <AIGlobe3D />
        </div>
      </section>
    </>
  );
}
