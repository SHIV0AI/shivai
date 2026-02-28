"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TrainingProgressAnim = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [epoch, setEpoch] = useState(0);
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

  const totalEpochs = 50;

  // Generate loss curve (decreasing exponential)
  const lossCurve = Array.from({ length: totalEpochs }, (_, i) => {
    const base = 2.5 * Math.exp(-i * 0.08) + 0.1;
    return base + (Math.random() - 0.5) * 0.05;
  });

  // Generate accuracy curve (increasing sigmoid-ish)
  const accCurve = Array.from({ length: totalEpochs }, (_, i) => {
    const base = 99.5 * (1 - Math.exp(-i * 0.12));
    return Math.min(99.9, base + (Math.random() - 0.5) * 0.3);
  });

  // Learning rate schedule
  const lrCurve = Array.from({ length: totalEpochs }, (_, i) => {
    if (i < 5) return 0.001 * (i + 1) / 5; // warmup
    return 0.001 * Math.exp(-((i - 5) * 0.04)); // decay
  });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setEpoch((prev) => (prev < totalEpochs - 1 ? prev + 1 : 0));
    }, 300);
    return () => clearInterval(interval);
  }, [isInView]);

  const currentLoss = lossCurve[epoch];
  const currentAcc = accCurve[epoch];
  const currentLr = lrCurve[epoch];

  // SVG chart dimensions
  const chartW = 300;
  const chartH = 100;

  const lossPath = lossCurve
    .slice(0, epoch + 1)
    .map((v, i) => {
      const x = (i / (totalEpochs - 1)) * chartW;
      const y = chartH - ((v - 0.05) / 2.5) * chartH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const accPath = accCurve
    .slice(0, epoch + 1)
    .map((v, i) => {
      const x = (i / (totalEpochs - 1)) * chartW;
      const y = chartH - (v / 100) * chartH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <section
      ref={ref}
      className={`relative py-20 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(to bottom, #ffffff 0%, #fdf4ff 50%, #ffffff 100%)"
          : "linear-gradient(to bottom, #000 0%, #0a000f 50%, #000 100%)",
      }}
    >
      <div className="absolute inset-0 circuit-bg opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-orange">
            🧪 Training in Progress
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-themed-primary">
            Model <span className="gradient-text-neon">Training Live</span>
          </h2>
          <p className="text-themed-secondary text-sm">
            Watch a neural network train in real-time with convergence tracking
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Training curves */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="ai-glass rounded-2xl p-5"
          >
            <h4 className="text-sm font-bold text-neon-pink mb-4">📉 Loss Curve</h4>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-28 mb-4">
              <defs>
                <linearGradient id="lossGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#ff006e" />
                  <stop offset="100%" stopColor="#bf00ff" />
                </linearGradient>
              </defs>
              {lossPath && (
                <path d={lossPath} fill="none" stroke="url(#lossGrad)" strokeWidth="2" />
              )}
            </svg>

            <h4 className="text-sm font-bold text-neon-green mb-4">📈 Accuracy Curve</h4>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-28">
              <defs>
                <linearGradient id="accGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#39ff14" />
                  <stop offset="100%" stopColor="#00fff5" />
                </linearGradient>
              </defs>
              {accPath && (
                <path d={accPath} fill="none" stroke="url(#accGrad)" strokeWidth="2" />
              )}
            </svg>
          </motion.div>

          {/* Right: Live metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Epoch counter */}
            <div className="ai-glass rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-themed-secondary">Epoch</span>
                <span className="text-neon-cyan font-mono font-bold">
                  {epoch + 1}/{totalEpochs}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                  animate={{ width: `${((epoch + 1) / totalEpochs) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Metric cards */}
            {[
              { label: "Loss", value: currentLoss.toFixed(4), color: "#ff006e", icon: "📉" },
              { label: "Accuracy", value: `${currentAcc.toFixed(2)}%`, color: "#39ff14", icon: "🎯" },
              { label: "Learning Rate", value: currentLr.toExponential(2), color: "#4361ee", icon: "⚡" },
              { label: "GPU Memory", value: `${(6.2 + Math.random() * 0.3).toFixed(1)} GB`, color: "#ffe600", icon: "💾" },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                className="ai-glass rounded-xl p-3 flex items-center justify-between"
                animate={{ borderColor: `${metric.color}33` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{metric.icon}</span>
                  <span className="text-xs text-themed-secondary">{metric.label}</span>
                </div>
                <span className="font-mono font-bold text-sm" style={{ color: metric.color }}>
                  {metric.value}
                </span>
              </motion.div>
            ))}

            {/* Status */}
            <div className="ai-glass rounded-xl p-3 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-neon-green"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs text-neon-green font-semibold">
                {epoch < totalEpochs - 1 ? "Training..." : "Converged ✓"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingProgressAnim;
