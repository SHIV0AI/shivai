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
