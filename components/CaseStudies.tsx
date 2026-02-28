"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const filters = ["All", "Medical", "Finance", "Business", "Research"];

const caseStudies = [
  {
    id: 1, category: "Medical", agentName: "MediScan Agent",
    title: "Autonomous Medical Diagnosis System", client: "Global Healthcare Network",
    description: "Intelligent agent ecosystem analyzing medical images, patient data, and research papers to provide accurate diagnoses autonomously.",
    results: ["70% faster diagnosis", "95% accuracy rate", "Multi-modal analysis"],
    tech: ["GPT-4 Vision", "RAG Pipeline", "Knowledge Graphs"],
    icon: "🤖", gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 2, category: "Finance", agentName: "GuardianAI Agent",
    title: "Real-Time Fraud Detection Ecosystem", client: "International Banking Group",
    description: "Multi-agent system with specialized fraud detection agents working collaboratively to identify and prevent fraudulent transactions.",
    results: ["99.8% detection rate", "$50M+ saved", "Real-time collaboration"],
    tech: ["LangGraph", "Agent Orchestration", "Vector DB"],
    icon: "🛡️", gradient: "from-green-600 to-teal-600",
  },
  {
    id: 3, category: "Business", agentName: "SupplyChain Agent",
    title: "Intelligent Inventory Management", client: "Global E-commerce Platform",
    description: "Agentic workflow optimizing supply chain with predictive agents, demand forecasting, and automated procurement.",
    results: ["40% cost reduction", "98% availability", "Autonomous ordering"],
    tech: ["AutoGen", "Multi-Agent Systems", "Predictive ML"],
    icon: "📦", gradient: "from-orange-600 to-red-600",
  },
  {
    id: 4, category: "Research", agentName: "ResearchHub Agent",
    title: "Autonomous Knowledge Discovery", client: "Pharmaceutical R&D",
    description: "Self-learning agent ecosystem that autonomously researches scientific papers and discovers new compounds.",
    results: ["80% faster discovery", "50+ compounds found", "Continuous learning"],
    tech: ["LLM Agents", "RAG Systems", "Auto-Research"],
    icon: "🔬", gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 5, category: "Finance", agentName: "TradeBot Agent",
    title: "Autonomous Trading Agent Network", client: "Hedge Fund Partners",
    description: "Sophisticated agent network analyzing markets, executing trades, and managing risk autonomously.",
    results: ["25% ROI increase", "μs execution", "Risk-aware agents"],
    tech: ["ReAct Agents", "Tool-using AI", "Real-time Analytics"],
    icon: "📈", gradient: "from-indigo-600 to-purple-600",
  },
  {
    id: 6, category: "Business", agentName: "CustomerCare Agent",
    title: "Intelligent Customer Support", client: "Tech Enterprise",
    description: "Multi-agent support system with specialized agents for triage, escalation, and knowledge retrieval.",
    results: ["90% automation", "24/7 availability", "Context-aware responses"],
    tech: ["LangChain Agents", "Memory Systems", "Tool Integration"],
    icon: "💬", gradient: "from-pink-600 to-rose-600",
  },
];

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";
  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter((s) => s.category === activeFilter);

  return (
    <section
      id="case-studies"
      className="relative py-24 overflow-hidden transition-colors duration-300"
      style={{
        background: dark
          ? "linear-gradient(to bottom, #000 0%, rgba(191,0,255,0.03) 50%, #000 100%)"
          : "linear-gradient(to bottom, #fff 0%, rgba(147,51,234,0.02) 50%, #fff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-6"
            style={{
              background: dark ? "rgba(236,72,153,0.08)" : "rgba(236,72,153,0.05)",
              borderColor: dark ? "rgba(236,72,153,0.15)" : "rgba(236,72,153,0.12)",
              color: dark ? "#f9a8d4" : "#db2777",
            }}
          >
            Agent Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: dark ? "#fff" : "#111827" }}>
            Intelligent <span className="gradient-text-neon">Agent Ecosystems</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            Discover how we&apos;ve built autonomous agent systems that transform businesses.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={
                activeFilter === f
                  ? {
                      background: "linear-gradient(135deg, #00fff5, #bf00ff)",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(0,255,245,0.2)",
                    }
                  : {
                      background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      color: dark ? "#9ca3af" : "#6b7280",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                    }
              }
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study, i) => (
            <motion.div
              key={study.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="premium-card p-7 rounded-2xl cursor-pointer"
            >
              {/* Icon & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{study.icon}</span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)",
                    color: dark ? "#a5b4fc" : "#4f46e5",
                    border: `1px solid ${dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}`,
                  }}
                >
                  {study.category}
                </span>
              </div>

              {/* Agent name */}
              <div className="text-xs font-semibold gradient-text mb-1">{study.agentName}</div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-1" style={{ color: dark ? "#fff" : "#111827" }}>
                {study.title}
              </h3>
              <p className="text-xs mb-3" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{study.client}</p>

              {/* Description */}
              <p className="text-sm mb-4 leading-relaxed" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                {study.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{
                      background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      color: dark ? "#6b7280" : "#9ca3af",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Results */}
              <div className="space-y-1.5">
                {study.results.map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${study.gradient}`} />
                    <span className="text-xs" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
