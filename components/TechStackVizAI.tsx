"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const techCategories = [
  {
    name: "Frameworks",
    color: "#00fff5",
    techs: [
      { name: "PyTorch", icon: "🔥", desc: "Deep learning framework" },
      { name: "TensorFlow", icon: "🧊", desc: "ML platform" },
      { name: "LangChain", icon: "🔗", desc: "LLM application framework" },
      { name: "Hugging Face", icon: "🤗", desc: "Model hub & transformers" },
    ],
  },
  {
    name: "Platforms",
    color: "#bf00ff",
    techs: [
      { name: "OpenAI API", icon: "🌐", desc: "GPT models integration" },
      { name: "AWS SageMaker", icon: "☁️", desc: "ML training & deployment" },
      { name: "Vertex AI", icon: "🔺", desc: "Google ML platform" },
      { name: "Azure ML", icon: "🔷", desc: "Microsoft ML service" },
    ],
  },
  {
    name: "Infrastructure",
    color: "#39ff14",
    techs: [
      { name: "Docker", icon: "🐳", desc: "Containerization" },
      { name: "Kubernetes", icon: "⚓", desc: "Orchestration" },
      { name: "Redis", icon: "🔴", desc: "Cache & vector store" },
      { name: "PostgreSQL", icon: "🐘", desc: "Data storage" },
    ],
  },
  {
    name: "AI Tools",
    color: "#ff006e",
    techs: [
      { name: "MLflow", icon: "📊", desc: "ML lifecycle management" },
      { name: "Weights & Biases", icon: "📈", desc: "Experiment tracking" },
      { name: "Pinecone", icon: "🌲", desc: "Vector database" },
      { name: "FastAPI", icon: "⚡", desc: "API serving" },
    ],
  },
];

const TechStackVizAI = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
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

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(to bottom, #ffffff 0%, #f5f3ff 50%, #ffffff 100%)"
          : "#000000",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "radial-gradient(ellipse at center, rgba(191,0,255,0.05) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(191,0,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 circuit-bg opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-purple">
            🛠️ Technology Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-3 text-themed-primary">
            Our AI <span className="gradient-text-neon">Tech Ecosystem</span>
          </h2>
          <p className="text-themed-secondary max-w-2xl mx-auto">
            Battle-tested technologies powering enterprise-grade AI solutions
          </p>
        </motion.div>

        {/* Category cards with techs */}
        <div className="grid md:grid-cols-2 gap-6">
          {techCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="ai-glass rounded-2xl p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}` }}
                />
                <h3 className="font-bold text-lg" style={{ color: category.color }}>
                  {category.name}
                </h3>
              </div>

              {/* Tech nodes */}
              <div className="grid grid-cols-2 gap-3">
                {category.techs.map((tech, techIdx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.1 + techIdx * 0.05 + 0.3 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="ai-glass rounded-lg p-3 cursor-pointer text-center transition-all"
                    style={{
                      borderColor: hoveredTech === tech.name ? category.color : undefined,
                      boxShadow: hoveredTech === tech.name ? `0 0 15px ${category.color}22` : undefined,
                    }}
                  >
                    <div className="text-2xl mb-1">{tech.icon}</div>
                    <div className="font-bold text-xs text-themed-primary">{tech.name}</div>
                    <div className="text-[10px] text-themed-secondary mt-0.5">{tech.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Connection lines (decorative) */}
              <div className="flex justify-center mt-3 gap-1">
                {category.techs.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: category.color }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackVizAI;
