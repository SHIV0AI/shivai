"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: string;
  color?: string;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter = ({ end, suffix = "", prefix = "", label, icon, color = "#00fff5", duration = 2, decimals = 0 }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setSparkle(true);
        setTimeout(() => setSparkle(false), 1500);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count);
  const progressPercent = (count / end) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5, scale: 1.03 }}
      className="relative ai-glass rounded-xl p-6 text-center group cursor-pointer overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
      />

      {/* Sparkle effect */}
      {sparkle && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: color, left: "50%", top: "50%" }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 4) * 60,
                y: Math.sin((i * Math.PI * 2) / 4) * 60,
              }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            />
          ))}
        </>
      )}

      {/* Icon */}
      <motion.div
        className="text-4xl mb-3 inline-block"
        animate={sparkle ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>

      {/* Counter */}
      <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color }}>
        {prefix}{displayValue}{suffix}
      </div>

      {/* Label */}
      <div className="text-sm text-themed-secondary font-medium">{label}</div>

      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5">
        <motion.div
          className="h-1.5 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progressPercent}%` } : { width: 0 }}
          transition={{ duration: duration, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const ResultCounter = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { end: 100, suffix: "K+", label: "Data Points Processed", icon: "📊", color: "#00fff5" },
    { end: 96.5, suffix: "%", label: "Model Accuracy", icon: "🎯", color: "#39ff14", decimals: 1 },
    { end: 12, suffix: "+", label: "AI Models Deployed", icon: "🚀", color: "#bf00ff" },
    { end: 8, suffix: "+", label: "Enterprise Clients", icon: "🏢", color: "#ff006e" },
    { end: 24, suffix: "/7", label: "Autonomous Operation", icon: "⚡", color: "#4361ee" },
    { end: 200, suffix: "ms", label: "Avg Response Time", icon: "⏱️", color: "#ffe600" },
  ];

  return (
    <div ref={ref} className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-green">
          Real-Time Metrics
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
          AI <span className="gradient-text-neon">Performance</span> Dashboard
        </h3>
        <p className="text-themed-secondary max-w-2xl mx-auto">
          Live metrics from our deployed AI systems powering enterprises worldwide
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <AnimatedCounter key={stat.label} {...stat} duration={2 + i * 0.3} />
        ))}
      </div>
    </div>
  );
};

export default ResultCounter;
