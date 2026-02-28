"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AIModelDemo = dynamic(() => import("./AIModelDemo"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse rounded-2xl" style={{ background: "rgba(99,102,241,0.05)" }} />,
});

/* ─── Agent capabilities data ─── */
const agentCapabilities = [
  {
    icon: "🤖",
    title: "Autonomous Agents",
    description: "Self-managing AI agents that reason, plan, and execute multi-step tasks without human intervention.",
    features: ["Goal decomposition", "Self-correction loops", "Memory & context persistence"],
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    icon: "🔗",
    title: "Knowledge Orchestration",
    description: "Connect disparate data sources into a unified knowledge graph agents can query and reason over.",
    features: ["RAG pipelines", "Vector databases", "Graph-based retrieval"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    description: "Intelligent workflows that adapt in real-time, routing tasks to specialized agents based on context.",
    features: ["Dynamic task routing", "Event-driven triggers", "Human-in-the-loop options"],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    icon: "🧠",
    title: "Multi-Agent Collaboration",
    description: "Teams of specialized agents that communicate, delegate, and collaborate to solve complex problems.",
    features: ["Agent-to-agent messaging", "Role-based specialization", "Consensus protocols"],
    gradient: "from-violet-600 to-purple-600",
  },
  {
    icon: "🛡️",
    title: "Guardrails & Safety",
    description: "Built-in safety layers that ensure agents operate within defined boundaries and policies.",
    features: ["Output validation", "Policy enforcement", "Audit trails"],
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    icon: "📊",
    title: "Agent Analytics",
    description: "Deep observability into agent behavior, decision paths, and performance metrics in real-time.",
    features: ["Decision tracing", "Performance dashboards", "Cost tracking"],
    gradient: "from-amber-600 to-orange-600",
  },
];

/* ─── Architecture diagram ─── */
const ArchitectureFlow = ({ theme }: { theme: string }) => {
  const dark = theme === "dark";
  const stages = [
    { label: "Data Sources", icon: "📥", desc: "APIs, DBs, Documents" },
    { label: "Knowledge Layer", icon: "🧬", desc: "Embeddings & Graphs" },
    { label: "Agent Orchestrator", icon: "🎯", desc: "Plan → Execute → Verify" },
    { label: "Specialized Agents", icon: "🤖", desc: "Task-specific AI units" },
    { label: "Results & Actions", icon: "✅", desc: "Decisions & outputs" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 py-8">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-2 md:gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-2"
              style={{
                background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)",
                border: `1px solid ${dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)"}`,
              }}
            >
              {stage.icon}
            </div>
            <span className="text-sm font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
              {stage.label}
            </span>
            <span className="text-xs mt-0.5" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
              {stage.desc}
            </span>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="hidden md:block w-12 h-px origin-left"
              style={{ background: dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ─── Main AgentLabClient ─── */
const AgentLabClient = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const capRef = useRef(null);
  const capInView = useInView(capRef, { once: true, margin: "-100px" });

  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";

  return (
    <div className="min-h-screen" style={{ background: dark ? "#000" : "#fff" }}>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 50% 0%, rgba(0,255,245,0.06) 0%, #000 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.04) 0%, #fff 60%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span
              className="px-4 py-1.5 rounded-full text-sm font-medium border neon-glow-cyan"
              style={{
                background: dark ? "rgba(0,255,245,0.06)" : "rgba(6,182,212,0.05)",
                borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.15)",
                color: dark ? "#00fff5" : "#0891b2",
              }}
            >
              Agent Lab
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            <span style={{ color: dark ? "#fff" : "#111827" }}>Intelligent </span>
            <span className="gradient-text-neon">Agentic Ecosystem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
          >
            Design, deploy, and orchestrate autonomous AI agents that
            collaborate across your enterprise — from knowledge retrieval to
            decision-making and beyond.
          </motion.p>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-16" style={{ background: dark ? "rgba(99,102,241,0.02)" : "rgba(99,102,241,0.02)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: dark ? "#fff" : "#111827" }}>
            How It Works
          </h2>
          <p className="text-center mb-8 text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
            End-to-end agentic pipeline
          </p>
          <ArchitectureFlow theme={theme} />
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-20" ref={capRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={capInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: dark ? "#fff" : "#111827" }}>
              Agent <span className="gradient-text-neon">Capabilities</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
              Everything you need to build production-grade agentic AI systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={capInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="premium-card p-6 rounded-2xl cursor-pointer"
              >
                <div className="text-4xl mb-4">{cap.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: dark ? "#fff" : "#111827" }}>
                  {cap.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                  {cap.description}
                </p>
                <div className="space-y-1.5">
                  {cap.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cap.gradient}`} />
                      <span className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="py-20" style={{ background: dark ? "rgba(99,102,241,0.02)" : "rgba(99,102,241,0.01)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: dark ? "#fff" : "#111827" }}>
              Try Our <span className="gradient-text-neon">Agent Playground</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
              Interact with our AI agent demo in real-time.
            </p>
          </div>
          <AIModelDemo />
        </div>
      </section>
    </div>
  );
};

export default AgentLabClient;
