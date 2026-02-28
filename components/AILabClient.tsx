"use client";

import dynamic from "next/dynamic";

const AIGameEnvironment = dynamic(() => import("@/components/AIGameEnvironment"), { ssr: false });
const NeuralNetworkViz = dynamic(() => import("@/components/NeuralNetworkViz"), { ssr: false });
const TrainingProgressAnim = dynamic(() => import("@/components/TrainingProgressAnim"), { ssr: false });
const LiveDataViz = dynamic(() => import("@/components/LiveDataViz"), { ssr: false });

export default function AILabClient() {
  return (
    <div className="pt-20">
      {/* Hero for AI Lab */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-20" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,245,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-cyan inline-block mb-4">
            🔬 Research Lab
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-themed-primary mb-4">
            Welcome to the <span className="gradient-text-neon">AI Lab</span>
          </h1>
          <p className="text-themed-secondary text-lg max-w-2xl mx-auto">
            An interactive playground where you can explore neural networks, watch model training,
            and interact with our AI infrastructure in real-time.
          </p>
        </div>
      </section>

      {/* 3D Neural Network Visualization */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-themed-primary">
              Interactive <span className="gradient-text-neon">Neural Network</span>
            </h2>
            <p className="text-themed-secondary text-sm mt-2">
              Click on neurons, rotate the view, and watch data flow through layers
            </p>
          </div>
          <div className="ai-glass rounded-2xl overflow-hidden" style={{ height: "500px" }}>
            <NeuralNetworkViz />
          </div>
        </div>
      </section>

      {/* The Neural Lab Game */}
      <AIGameEnvironment />

      {/* Training Progress */}
      <TrainingProgressAnim />

      {/* Live Data */}
      <LiveDataViz />
    </div>
  );
}
