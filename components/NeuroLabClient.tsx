"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NeuralNetworkViz = dynamic(() => import("./NeuralNetworkViz"), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse rounded-2xl" style={{ background: "rgba(168,85,247,0.05)" }} />,
});

const TrainingProgressAnim = dynamic(() => import("./TrainingProgressAnim"), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-2xl" style={{ background: "rgba(168,85,247,0.05)" }} />,
});

const LiveDataViz = dynamic(() => import("./LiveDataViz"), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-2xl" style={{ background: "rgba(168,85,247,0.05)" }} />,
});

/* ─── Research areas ─── */
const researchAreas = [
  {
    icon: "🧬",
    title: "Deep Neural Networks",
    description: "State-of-the-art architectures for vision, language, and multi-modal understanding.",
    tags: ["Transformers", "CNNs", "Diffusion Models"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    icon: "🔬",
    title: "Model Training & Fine-tuning",
    description: "Efficient training pipelines with distributed computing, mixed precision, and LoRA adapters.",
    tags: ["Distributed Training", "LoRA", "QLoRA"],
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    icon: "📐",
    title: "Architecture Search",
    description: "Automated neural architecture search to discover optimal model configurations for your data.",
    tags: ["NAS", "AutoML", "Hyperparameter Tuning"],
    gradient: "from-fuchsia-600 to-purple-600",
  },
  {
    icon: "🎯",
    title: "Computer Vision",
    description: "Object detection, segmentation, generation, and visual reasoning at production scale.",
    tags: ["YOLO", "SAM", "Stable Diffusion"],
    gradient: "from-pink-600 to-rose-600",
  },
  {
    icon: "💬",
    title: "Natural Language Processing",
    description: "Large language models, embeddings, sentiment analysis, and semantic search systems.",
    tags: ["LLMs", "Embeddings", "Semantic Search"],
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    icon: "🧪",
    title: "Reinforcement Learning",
    description: "Reward-based learning for robotics, game AI, optimization, and autonomous decision-making.",
    tags: ["PPO", "RLHF", "Multi-Agent RL"],
    gradient: "from-teal-600 to-emerald-600",
  },
];

/* ─── Model benchmark data ─── */
const benchmarks = [
  { model: "ShivAI-7B", accuracy: 94.2, latency: "12ms", params: "7B", status: "Production" },
  { model: "ShivAI-13B", accuracy: 96.8, latency: "28ms", params: "13B", status: "Production" },
  { model: "ShivAI-70B", accuracy: 98.1, latency: "85ms", params: "70B", status: "Research" },
  { model: "ShivVision-L", accuracy: 97.3, latency: "8ms", params: "2.1B", status: "Production" },
];

/* ─── Main NeuroLabClient ─── */
const NeuroLabClient = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const resRef = useRef(null);
  const resInView = useInView(resRef, { once: true, margin: "-100px" });
  const benchRef = useRef(null);
  const benchInView = useInView(benchRef, { once: true, margin: "-100px" });

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
            ? "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, #000 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.05) 0%, #fff 60%)",
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
              className="px-4 py-1.5 rounded-full text-sm font-medium border"
              style={{
                background: dark ? "rgba(168,85,247,0.1)" : "rgba(168,85,247,0.06)",
                borderColor: dark ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)",
                color: dark ? "#c4b5fd" : "#7c3aed",
              }}
            >
              Neuro Lab
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            <span style={{ color: dark ? "#fff" : "#111827" }}>Advanced </span>
            <span className="gradient-text-neon">Neural Research</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
          >
            Deep learning, neural network architectures, model training, and
            bleeding-edge AI research — pushing the boundaries of what
            machines can learn and understand.
          </motion.p>
        </div>
      </section>

      {/* Neural Network Visualization */}
      <section className="py-16" style={{ background: dark ? "rgba(168,85,247,0.02)" : "rgba(168,85,247,0.01)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: dark ? "#fff" : "#111827" }}>
              Neural Network <span className="gradient-text-neon">Visualization</span>
          </h2>
          <p className="text-center mb-8 text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
            Watch data flow through network layers in real-time
          </p>
          <div className="h-[400px] rounded-2xl overflow-hidden premium-card">
            <NeuralNetworkViz />
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20" ref={resRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: dark ? "#fff" : "#111827" }}>
              Research <span className="gradient-text-neon">Focus Areas</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
              Core competencies driving our neural AI capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={resInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="premium-card p-6 rounded-2xl cursor-pointer"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: dark ? "#fff" : "#111827" }}>
                  {area.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: dark ? "rgba(168,85,247,0.1)" : "rgba(168,85,247,0.06)",
                        color: dark ? "#c4b5fd" : "#7c3aed",
                        border: `1px solid ${dark ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Benchmarks */}
      <section
        className="py-20"
        ref={benchRef}
        style={{ background: dark ? "rgba(168,85,247,0.02)" : "rgba(168,85,247,0.01)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: dark ? "#fff" : "#111827" }}>
              Model <span className="gradient-text-neon">Benchmarks</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                  {["Model", "Accuracy", "Latency", "Parameters", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 text-sm font-semibold"
                      style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b, i) => (
                  <motion.tr
                    key={b.model}
                    initial={{ opacity: 0, x: -20 }}
                    animate={benchInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}` }}
                    className="hover:bg-white/[0.02]"
                  >
                    <td className="py-3 px-4 text-sm font-medium" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                      {b.model}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="gradient-text font-semibold">{b.accuracy}%</span>
                    </td>
                    <td className="py-3 px-4 text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                      {b.latency}
                    </td>
                    <td className="py-3 px-4 text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                      {b.params}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background:
                            b.status === "Production"
                              ? dark ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.08)"
                              : dark ? "rgba(168,85,247,0.1)" : "rgba(168,85,247,0.06)",
                          color:
                            b.status === "Production"
                              ? dark ? "#4ade80" : "#16a34a"
                              : dark ? "#c4b5fd" : "#7c3aed",
                          border: `1px solid ${
                            b.status === "Production"
                              ? dark ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.15)"
                              : dark ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"
                          }`,
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Training & Live Data */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: dark ? "#fff" : "#111827" }}>
              Live <span className="gradient-text-neon">Training Metrics</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="premium-card rounded-2xl overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                Training Progress
              </h3>
              <TrainingProgressAnim />
            </div>
            <div className="premium-card rounded-2xl overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                Live Data Feed
              </h3>
              <LiveDataViz />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeuroLabClient;
