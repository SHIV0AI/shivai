"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ResultCounter from "./ResultCounter";

const MetricsDashboard = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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

  const capabilities = [
    { name: "NLP", accuracy: 96, icon: "💬", color: "#00fff5", projects: 120 },
    { name: "Computer Vision", accuracy: 94, icon: "👁️", color: "#bf00ff", projects: 85 },
    { name: "Time Series", accuracy: 97, icon: "📈", color: "#39ff14", projects: 95 },
    { name: "Anomaly Detection", accuracy: 99, icon: "🔍", color: "#ff006e", projects: 70 },
    { name: "Predictive AI", accuracy: 93, icon: "🔮", color: "#4361ee", projects: 110 },
    { name: "Generative AI", accuracy: 91, icon: "🎨", color: "#ffe600", projects: 60 },
  ];

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(to bottom, #ffffff 0%, #f0fdf4 50%, #ffffff 100%)"
          : "#000000",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "radial-gradient(ellipse at center, rgba(57,255,20,0.05) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(57,255,20,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 circuit-bg opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Counters */}
        <ResultCounter className="mb-16" />

        {/* AI Capability Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-themed-primary">
            AI Capability <span className="gradient-text-neon">Breakdown</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.03, rotateY: 5 }}
                className="ai-glass rounded-xl p-4 text-center cursor-pointer group"
                style={{ perspective: "800px" }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                >
                  {cap.icon}
                </motion.div>
                <h4 className="font-bold text-xs mb-2" style={{ color: cap.color }}>
                  {cap.name}
                </h4>
                <div className="text-2xl font-bold mb-1 text-themed-primary">
                  {cap.accuracy}%
                </div>
                <div className="text-[10px] text-themed-secondary mb-2">
                  {cap.projects} projects
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ background: cap.color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${cap.accuracy}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
