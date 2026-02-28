"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Simulated live metrics ─── */
interface MetricData {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  icon: string;
}

const baseMetrics: MetricData[] = [
  { label: "Model Accuracy", value: 97.3, target: 100, unit: "%", color: "#00fff5", icon: "🎯" },
  { label: "Training Loss", value: 0.023, target: 0, unit: "", color: "#39ff14", icon: "📉" },
  { label: "Inference Speed", value: 12, target: 15, unit: "ms", color: "#bf00ff", icon: "⚡" },
  { label: "Tokens Processed", value: 2.4, target: 5, unit: "B", color: "#ff006e", icon: "📊" },
  { label: "Active Agents", value: 48, target: 60, unit: "", color: "#ffe600", icon: "🤖" },
  { label: "Knowledge Nodes", value: 1.2, target: 2, unit: "M", color: "#4361ee", icon: "🧠" },
];

const epochHistory = [
  { epoch: 1, loss: 2.41, accuracy: 45.2 },
  { epoch: 5, loss: 1.12, accuracy: 68.5 },
  { epoch: 10, loss: 0.54, accuracy: 82.1 },
  { epoch: 20, loss: 0.18, accuracy: 91.7 },
  { epoch: 30, loss: 0.08, accuracy: 95.4 },
  { epoch: 40, loss: 0.04, accuracy: 96.8 },
  { epoch: 50, loss: 0.023, accuracy: 97.3 },
];

const LiveTrainingMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [metrics, setMetrics] = useState(baseMetrics);
  const [theme, setTheme] = useState("dark");
  const [activeLog, setActiveLog] = useState(0);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Simulate live metric fluctuations
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value:
            m.label === "Training Loss"
              ? Math.max(0.01, m.value + (Math.random() - 0.55) * 0.003)
              : m.label === "Model Accuracy"
              ? Math.min(99.9, m.value + (Math.random() - 0.4) * 0.1)
              : m.label === "Inference Speed"
              ? Math.max(8, Math.min(18, m.value + (Math.random() - 0.5) * 0.5))
              : m.label === "Tokens Processed"
              ? Math.min(4.9, m.value + Math.random() * 0.02)
              : m.label === "Active Agents"
              ? Math.max(40, Math.min(58, m.value + (Math.random() > 0.5 ? 1 : -1)))
              : Math.min(1.9, m.value + Math.random() * 0.01),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Cycle through training log entries
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % epochHistory.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const dark = theme === "dark";

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-10" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,245,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-green inline-block neon-glow-green">
            📡 Live Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
            Real-Time <span className="gradient-text-neon">Training Dashboard</span>
          </h2>
          <p className="text-themed-secondary max-w-2xl mx-auto text-sm">
            Watch our AI models train and improve in real-time across distributed clusters
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="premium-card p-4 rounded-2xl text-center group"
            >
              <div className="text-2xl mb-2">{metric.icon}</div>
              <motion.div
                key={metric.value}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold mb-1"
                style={{ color: metric.color }}
              >
                {metric.label === "Training Loss"
                  ? metric.value.toFixed(3)
                  : metric.label === "Tokens Processed" || metric.label === "Knowledge Nodes"
                  ? metric.value.toFixed(1)
                  : metric.label === "Model Accuracy"
                  ? metric.value.toFixed(1)
                  : Math.round(metric.value)}
                <span className="text-xs ml-0.5 opacity-70">{metric.unit}</span>
              </motion.div>
              <div className="text-[10px] text-themed-secondary">{metric.label}</div>
              {/* Progress bar */}
              <div
                className="mt-2 h-1 rounded-full overflow-hidden"
                style={{ background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: metric.color }}
                  animate={{
                    width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Training Log + Loss Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Training Log */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="ai-glass rounded-2xl p-6 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <h3 className="text-sm font-bold text-themed-primary">Training Log</h3>
              <span className="ml-auto text-[10px] text-themed-secondary">LIVE</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {epochHistory.map((entry, i) => (
                <motion.div
                  key={entry.epoch}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background:
                      i === activeLog
                        ? dark
                          ? "rgba(0,255,245,0.08)"
                          : "rgba(6,182,212,0.06)"
                        : "transparent",
                    borderLeft:
                      i === activeLog ? "2px solid #00fff5" : "2px solid transparent",
                  }}
                >
                  <span className="text-themed-secondary w-16">
                    Epoch {String(entry.epoch).padStart(2, "0")}
                  </span>
                  <span style={{ color: "#ff006e" }}>
                    loss: {entry.loss.toFixed(3)}
                  </span>
                  <span style={{ color: "#39ff14" }}>
                    acc: {entry.accuracy.toFixed(1)}%
                  </span>
                  {i === epochHistory.length - 1 && (
                    <span className="ml-auto text-neon-cyan animate-pulse">●</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Loss Curve Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="ai-glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-bold text-themed-primary">Loss & Accuracy Curve</h3>
            </div>

            <div className="relative h-[200px] w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-[9px] text-themed-secondary">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
              </div>

              {/* Chart area */}
              <div className="ml-10 h-full relative">
                <svg
                  viewBox="0 0 200 100"
                  className="w-full h-[180px]"
                  preserveAspectRatio="none"
                >
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="200"
                      y2={y}
                      stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                      strokeWidth="0.5"
                    />
                  ))}

                  {/* Accuracy curve (green) */}
                  <motion.polyline
                    points={epochHistory
                      .map(
                        (e, i) =>
                          `${(i / (epochHistory.length - 1)) * 200},${100 - e.accuracy}`
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#39ff14"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  />

                  {/* Loss curve (pink) — scaled to 0-100 range */}
                  <motion.polyline
                    points={epochHistory
                      .map(
                        (e, i) =>
                          `${(i / (epochHistory.length - 1)) * 200},${100 - (e.loss / 2.5) * 100}`
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#ff006e"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 0.7 }}
                  />

                  {/* Data points */}
                  {epochHistory.map((e, i) => (
                    <g key={i}>
                      <circle
                        cx={(i / (epochHistory.length - 1)) * 200}
                        cy={100 - e.accuracy}
                        r="2"
                        fill="#39ff14"
                      />
                      <circle
                        cx={(i / (epochHistory.length - 1)) * 200}
                        cy={100 - (e.loss / 2.5) * 100}
                        r="2"
                        fill="#ff006e"
                      />
                    </g>
                  ))}
                </svg>

                {/* X-axis */}
                <div className="flex justify-between text-[9px] text-themed-secondary mt-1">
                  {epochHistory.map((e) => (
                    <span key={e.epoch}>E{e.epoch}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-0.5 rounded" style={{ background: "#39ff14" }} />
                <span className="text-themed-secondary">Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-0.5 rounded" style={{ background: "#ff006e" }} />
                <span className="text-themed-secondary">Loss</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveTrainingMetrics;
