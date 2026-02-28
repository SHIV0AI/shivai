"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stages = [
  { id: 1, label: "Data Ingestion", icon: "📥", description: "Raw data collected from multiple sources", color: "#00fff5" },
  { id: 2, label: "Feature Extraction", icon: "🔬", description: "AI identifies patterns and key features", color: "#bf00ff" },
  { id: 3, label: "Model Inference", icon: "🧠", description: "Neural networks process and analyze", color: "#ff006e" },
  { id: 4, label: "Results", icon: "✨", description: "Actionable insights delivered", color: "#39ff14" },
];

const DataFlowViz = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeStage, setActiveStage] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setActiveStage((p) => (p + 1) % stages.length), 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  const dark = theme === "dark";
  const accent = activeStage >= 0 ? stages[activeStage].color : "#00fff5";

  return (
    <div ref={ref} className={`relative py-20 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-4 neon-glow-cyan"
          style={{
            background: dark ? "rgba(0,255,245,0.06)" : "rgba(6,182,212,0.05)",
            borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.15)",
            color: dark ? "#00fff5" : "#0891b2",
          }}
        >
          Data Pipeline
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: dark ? "#fff" : "#111827" }}>
          How Your Data <span className="gradient-text-neon">Flows Through AI</span>
        </h3>
        <p className="max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
          Watch your data transform from raw input to intelligent output in real-time
        </p>
      </motion.div>

      {/* Desktop pipeline */}
      <div className="hidden md:flex items-center justify-center gap-4 max-w-5xl mx-auto px-4">
        {stages.map((stage, index) => (
          <motion.div key={stage.id} className="flex items-center flex-1">
            {/* Stage card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setActiveStage(index)}
              className="relative cursor-pointer premium-card rounded-xl p-5 flex-1 text-center"
              style={{
                borderColor: activeStage === index ? accent : undefined,
                boxShadow: activeStage === index ? `0 0 24px rgba(99,102,241,0.12)` : undefined,
              }}
            >
              {activeStage === index && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              <motion.div
                className="text-3xl mb-3"
                animate={activeStage === index ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {stage.icon}
              </motion.div>
              <h4 className="font-bold text-sm mb-1" style={{ color: dark ? stage.color : "#4f46e5" }}>
                {stage.label}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                {stage.description}
              </p>

              {activeStage === index && (
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: stage.color, opacity: 0.4 }}
                      initial={{ x: -10, y: `${Math.random() * 100}%`, opacity: 0 }}
                      animate={{ x: ["0%", "100%"], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity, ease: "linear" }}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Connector */}
            {index < stages.length - 1 && (
              <div className="relative mx-2 w-10 flex-shrink-0">
                <motion.div
                  className="h-px w-full"
                  style={{ background: dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)" }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile pipeline */}
      <div className="md:hidden space-y-3 px-4 max-w-md mx-auto">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div
              className="premium-card rounded-xl p-4 flex items-center gap-4"
              style={{
                borderColor: activeStage === index ? accent : undefined,
              }}
            >
              <div className="text-2xl">{stage.icon}</div>
              <div>
                <h4 className="font-bold text-sm" style={{ color: dark ? "#a5b4fc" : "#4f46e5" }}>{stage.label}</h4>
                <p className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{stage.description}</p>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-1">
                <motion.div
                  className="w-px h-5"
                  style={{ background: dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)" }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DataFlowViz;
