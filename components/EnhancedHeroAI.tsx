"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/Logo3D"), { ssr: false });

/* ─── Floating particles (reduced for performance) ─── */
const ParticleField = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${180 + p.id * 8}, 100%, 70%)`,
          }}
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

/* ─── Connection lines (simplified for performance) ─── */
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
    <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="url(#lg)" strokeWidth="1" opacity="0.5" />
    <line x1="60%" y1="15%" x2="85%" y2="55%" stroke="url(#lg)" strokeWidth="1" opacity="0.4" />
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00fff5" />
        <stop offset="50%" stopColor="#bf00ff" />
        <stop offset="100%" stopColor="#ff006e" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Stat counter ─── */
const Stat = ({ value, label, delay, color }: { value: string; label: string; delay: number; color: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }} className="text-center">
    <div className="text-3xl md:text-4xl font-bold mb-1 gradient-text-neon">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </motion.div>
);

/* ─── Main Hero ─── */
const EnhancedHeroAI = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(t);
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: dark
          ? "radial-gradient(ellipse at 30% 20%, rgba(0,255,245,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(191,0,255,0.06) 0%, transparent 50%), #000"
          : "radial-gradient(ellipse at 30% 20%, rgba(6,182,212,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(147,51,234,0.06) 0%, transparent 50%), #fff",
      }}
    >
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        {dark && <ParticleField />}
        <ConnectionLines />
        <div className="absolute inset-0 circuit-bg opacity-15" />
        <div className="absolute top-[-20%] left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{ background: dark
            ? "radial-gradient(circle, rgba(0,255,245,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ background: dark
            ? "radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(147,51,234,0.05) 0%, transparent 70%)" }} />
      </motion.div>

      {/* Content — Two column: Logo3D first on mobile, Text + Logo3D on desktop */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 mb-8">
              <span className="px-4 py-1.5 rounded-full text-sm font-medium border neon-glow-cyan"
                style={{
                  background: dark ? "rgba(0,255,245,0.06)" : "rgba(6,182,212,0.06)",
                  borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.2)",
                  color: dark ? "#00fff5" : "#0891b2",
                }}>
                Intelligent Agentic Knowledge Ecosystem
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              <span style={{ color: dark ? "#fff" : "#111827" }}>Build </span>
              <span className="gradient-text-neon">Autonomous AI</span>
              <br />
              <span style={{ color: dark ? "#fff" : "#111827" }}>That </span>
              <span className="gradient-text-neon">Thinks &amp; Acts</span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
              style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
              We design agentic ecosystems that learn, reason, and collaborate —
              turning your enterprise data into intelligent workflows that deliver
              real results, autonomously.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10">
              <Link href="/get-started">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full font-semibold text-white text-lg bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 bg-[length:200%_100%] shadow-lg neon-glow-cyan hover:shadow-cyan-500/40 transition-shadow">
                  Start Building
                  <motion.span className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>→</motion.span>
                </motion.button>
              </Link>
              <Link href="/agent-lab">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-full font-semibold text-lg border transition-all"
                  style={{
                    color: dark ? "#00fff5" : "#0891b2",
                    borderColor: dark ? "rgba(0,255,245,0.3)" : "rgba(6,182,212,0.3)",
                    background: dark ? "rgba(0,255,245,0.04)" : "rgba(6,182,212,0.04)",
                  }}>
                  Explore Agent Lab
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Logo3D with holographic animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="flex-shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]"
          >
            <Logo3D />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap mt-12">
          <div className="hidden sm:block h-12 w-px" style={{ background: dark ? "rgba(0,255,245,0.1)" : "rgba(0,0,0,0.08)" }} />
          <Stat value="15+" label="AI Agents Deployed" delay={0.8} color="#00fff5" />
          <div className="h-12 w-px" style={{ background: dark ? "rgba(191,0,255,0.1)" : "rgba(0,0,0,0.08)" }} />
          <Stat value="99.5%" label="Uptime SLA" delay={0.9} color="#bf00ff" />
          <div className="h-12 w-px" style={{ background: dark ? "rgba(255,0,110,0.1)" : "rgba(0,0,0,0.08)" }} />
          <Stat value="3x" label="Faster Workflows" delay={1.0} color="#39ff14" />
          <div className="hidden sm:block h-12 w-px" style={{ background: dark ? "rgba(0,255,245,0.1)" : "rgba(0,0,0,0.08)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: dark ? "linear-gradient(to top,#000,transparent)" : "linear-gradient(to top,#fff,transparent)" }} />
    </section>
  );
};

export default EnhancedHeroAI;
