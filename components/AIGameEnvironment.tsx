"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const labZones = [
  {
    id: "data",
    name: "Data Vault",
    icon: "🗄️",
    color: "#00fff5",
    x: 10,
    y: 15,
    w: 25,
    h: 30,
    desc: "Petabytes of structured & unstructured data. Multi-region encrypted storage with real-time sync.",
    stats: { size: "50 PB", uptime: "99.99%", access: "< 2ms" },
  },
  {
    id: "compute",
    name: "GPU Cluster",
    icon: "🖥️",
    color: "#bf00ff",
    x: 40,
    y: 5,
    w: 25,
    h: 35,
    desc: "A100 & H100 GPU clusters for distributed training. Auto-scaling based on workload demands.",
    stats: { gpus: "512x A100", tflops: "2.5 PF", util: "94%" },
  },
  {
    id: "model",
    name: "Model Lab",
    icon: "🧬",
    color: "#39ff14",
    x: 70,
    y: 15,
    w: 25,
    h: 30,
    desc: "Research & development hub. Experiment tracking, model versioning, and automated evaluation.",
    stats: { models: "1,200+", experiments: "50K+", researchers: "85" },
  },
  {
    id: "deploy",
    name: "Deploy Zone",
    icon: "🚀",
    color: "#ff006e",
    x: 25,
    y: 55,
    w: 25,
    h: 30,
    desc: "Production deployment pipeline. Blue-green deployments, canary releases, and instant rollback.",
    stats: { endpoints: "500+", latency: "< 50ms", uptime: "99.95%" },
  },
  {
    id: "monitor",
    name: "Command Center",
    icon: "📡",
    color: "#ffe600",
    x: 55,
    y: 55,
    w: 25,
    h: 30,
    desc: "Real-time monitoring dashboard. Alerts, logging, performance analytics, and anomaly detection.",
    stats: { alerts: "24/7", logs: "1M/hr", dashboards: "150+" },
  },
];

const connections = [
  { from: "data", to: "compute" },
  { from: "compute", to: "model" },
  { from: "model", to: "deploy" },
  { from: "deploy", to: "monitor" },
  { from: "monitor", to: "data" },
];

const AIGameEnvironment = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeConnection, setActiveConnection] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  const selected = labZones.find((z) => z.id === selectedZone);

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(135deg, #fff 0%, #f0f9ff 50%, #fff 100%)"
          : "linear-gradient(135deg, #000 0%, #05050f 50%, #000 100%)",
      }}
    >
      <div className="absolute inset-0 circuit-bg opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-yellow">
            🎮 Interactive Lab
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-3 text-themed-primary">
            The <span className="gradient-text-neon">Neural Lab</span>
          </h2>
          <p className="text-themed-secondary max-w-2xl mx-auto">
            Explore our AI infrastructure — click on zones to discover what powers our platform
          </p>
        </motion.div>

        {/* Lab Map */}
        <div className="relative w-full aspect-[16/10] ai-glass rounded-2xl p-4 md:p-6 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-white"
                style={{ top: `${(i / 20) * 100}%` }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-white"
                style={{ left: `${(i / 20) * 100}%` }}
              />
            ))}
          </div>

          {/* Connection lines */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {connections.map((conn, i) => {
              const from = labZones.find((z) => z.id === conn.from)!;
              const to = labZones.find((z) => z.id === conn.to)!;
              const fx = from.x + from.w / 2;
              const fy = from.y + from.h / 2;
              const tx = to.x + to.w / 2;
              const ty = to.y + to.h / 2;
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={fx}
                  y1={fy}
                  x2={tx}
                  y2={ty}
                  stroke={labZones.find((z) => z.id === conn.from)!.color}
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  animate={{
                    opacity: activeConnection === i ? [0.2, 0.8, 0.2] : 0.15,
                    strokeWidth: activeConnection === i ? [0.3, 0.6, 0.3] : 0.3,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              );
            })}
          </svg>

          {/* Zone cards */}
          {labZones.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 20 }}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              className={`absolute cursor-pointer ai-glass rounded-xl p-2 md:p-3 transition-all ${
                selectedZone === zone.id ? "ring-1 z-10" : "z-5"
              }`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
                borderColor: selectedZone === zone.id ? zone.color : undefined,
                boxShadow: selectedZone === zone.id ? `0 0 20px ${zone.color}33` : undefined,
              }}
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-lg md:text-xl">{zone.icon}</span>
                <span
                  className="text-[10px] md:text-xs font-bold truncate"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </span>
              </div>

              {/* Mini pulse indicator */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full absolute top-2 right-2"
                style={{ backgroundColor: zone.color }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Selected zone detail */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 ai-glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <h4 className="font-bold text-lg" style={{ color: selected.color }}>
                  {selected.name}
                </h4>
                <p className="text-sm text-themed-secondary">{selected.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(selected.stats).map(([key, val]) => (
                <div key={key} className="ai-glass rounded-lg p-2 text-center">
                  <div className="text-[10px] text-themed-secondary capitalize">{key}</div>
                  <div className="font-bold text-sm" style={{ color: selected.color }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AIGameEnvironment;
