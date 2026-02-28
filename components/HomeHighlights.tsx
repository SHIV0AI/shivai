"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── GIF image with emoji fallback ─── */
const FeatureImage = ({ src, alt, fallback, size, isLarge }: { src: string; alt: string; fallback: string; size: number; isLarge?: boolean }) => {
  const [error, setError] = useState(false);
  if (error) return <span className={isLarge ? "text-7xl" : "text-3xl"}>{fallback}</span>;
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`w-full h-full ${isLarge ? "object-contain" : "object-cover"}`}
      unoptimized
      onError={() => setError(true)}
    />
  );
};

/* ─── Auto-rotating feature showcase ─── */
const features = [
  {
    icon: "🤖",
    image: "/assets/features/agentic-ai.gif",
    title: "Agentic AI Systems",
    description: "Autonomous agents that plan, reason, and execute complex workflows across your organization.",
    color: "#00fff5",
    link: "/services",
  },
  {
    icon: "🧠",
    image: "/assets/features/knowledge-ecosystems.gif",
    title: "Knowledge Ecosystems",
    description: "Unified knowledge graphs connecting data, documents, and institutional knowledge.",
    color: "#bf00ff",
    link: "/services",
  },
  {
    icon: "⚡",
    image: "/assets/features/workflow-automation.gif",
    title: "Workflow Automation",
    description: "Intelligent automation that adapts to context and improves continuously.",
    color: "#ff006e",
    link: "/services",
  },
  {
    icon: "🔬",
    image: "/assets/features/deep-learning.gif",
    title: "Deep Learning & NLP",
    description: "Custom neural networks and language models fine-tuned for your domain.",
    color: "#39ff14",
    link: "/services",
  },
];

const quickLinks = [
  { title: "Our Services", description: "Explore our full range of AI solutions", icon: "🚀", href: "/services", gradient: "from-cyan-500 to-purple-600" },
  { title: "About Us", description: "Learn our story, mission & values", icon: "💡", href: "/about", gradient: "from-purple-600 to-pink-500" },
  { title: "Global Presence", description: "India & Singapore — serving the world", icon: "🌍", href: "/locations", gradient: "from-pink-500 to-orange-500" },
  { title: "Get In Touch", description: "Start your AI transformation today", icon: "✉️", href: "/contact", gradient: "from-green-500 to-cyan-500" },
];

const stats = [
  { value: "15+", label: "AI Agents Deployed", icon: "🤖" },
  { value: "99.5%", label: "Uptime SLA", icon: "⚡" },
  { value: "3x", label: "Faster Workflows", icon: "📈" },
  { value: "2", label: "Global Offices", icon: "🌍" },
];

const HomeHighlights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const dark = theme === "dark";

  return (
    <section ref={ref} className="relative py-28 overflow-hidden transition-colors duration-300" style={{ background: dark ? "#000" : "#fff" }}>
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-10" />
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: dark ? "rgba(0,255,245,0.04)" : "rgba(6,182,212,0.03)" }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(191,0,255,0.04)" : "rgba(147,51,234,0.03)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Auto-Rotating Feature Showcase ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-6 neon-glow-cyan"
              style={{
                background: dark ? "rgba(0,255,245,0.06)" : "rgba(6,182,212,0.05)",
                borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.15)",
                color: dark ? "#00fff5" : "#0891b2",
              }}>
              What We Build
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: dark ? "#fff" : "#111827" }}>
              Powering the <span className="gradient-text-neon">AI Revolution</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: feature cards with progress indicators */}
            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.button
                  key={f.title}
                  onClick={() => setActiveFeature(i)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-500 ${
                    i === activeFeature ? "premium-card" : ""
                  }`}
                  style={{
                    background: i === activeFeature
                      ? (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)")
                      : "transparent",
                    border: i === activeFeature
                      ? `1px solid ${dark ? "rgba(0,255,245,0.15)" : "rgba(6,182,212,0.12)"}`
                      : "1px solid transparent",
                  }}
                  whileHover={{ x: 6 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Feature icon — GIF with emoji fallback */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ background: `${f.color}15` }}>
                      <FeatureImage src={f.image} alt={f.title} fallback={f.icon} size={48} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ color: i === activeFeature ? (dark ? "#fff" : "#111827") : (dark ? "#6b7280" : "#9ca3af") }}>
                        {f.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {i === activeFeature && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm mt-1"
                            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                          >
                            {f.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* Progress bar */}
                  {i === activeFeature && (
                    <motion.div
                      className="mt-3 h-0.5 rounded-full"
                      style={{ background: f.color }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      key={`bar-${activeFeature}-${Date.now()}`}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right: animated visual for active feature */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.95, rotateY: -8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 8 }}
                transition={{ duration: 0.5 }}
                className="relative h-[360px] rounded-3xl overflow-hidden"
                style={{
                  background: dark
                    ? `radial-gradient(ellipse at center, ${features[activeFeature].color}15 0%, rgba(0,0,0,0.4) 70%)`
                    : `radial-gradient(ellipse at center, ${features[activeFeature].color}10 0%, rgba(255,255,255,0.8) 70%)`,
                  border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                {/* Animated dots grid (reduced for performance) */}
                <div className="absolute inset-0">
                  {Array.from({ length: 16 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        left: `${(i % 4) * 25 + 10}%`,
                        top: `${Math.floor(i / 4) * 25 + 10}%`,
                        background: features[activeFeature].color,
                      }}
                      animate={{
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Central feature GIF / emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden flex items-center justify-center">
                    <FeatureImage src={features[activeFeature].image} alt={features[activeFeature].title} fallback={features[activeFeature].icon} size={180} isLarge />
                  </div>
                </div>

                {/* Floating label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="px-5 py-3 rounded-xl" style={{
                    background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${features[activeFeature].color}30`,
                  }}>
                    <p className="font-bold text-lg" style={{ color: features[activeFeature].color }}>
                      {features[activeFeature].title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── Animated Stats Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="premium-card p-6 rounded-2xl text-center group"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-neon mb-1">{s.value}</div>
              <div className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Quick Links to Dedicated Pages ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: dark ? "#fff" : "#111827" }}>
              Explore <span className="gradient-text-neon">Shiv.AI</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((q, i) => (
              <Link key={q.href} href={q.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="premium-card p-7 rounded-2xl group cursor-pointer h-full"
                >
                  <div className="text-4xl mb-4">{q.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: dark ? "#fff" : "#111827" }}>
                    {q.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                    {q.description}
                  </p>
                  <div className={`inline-flex items-center gap-1 text-sm font-semibold bg-gradient-to-r ${q.gradient} bg-clip-text text-transparent`}>
                    Explore
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHighlights;
