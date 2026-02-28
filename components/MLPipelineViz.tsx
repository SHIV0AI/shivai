"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const pipelineSteps = [
  {
    id: 1,
    title: "Data Collection",
    icon: "📥",
    color: "#00fff5",
    description: "Multi-source data ingestion from APIs, databases, files, and real-time streams",
    details: ["REST APIs", "SQL/NoSQL DBs", "File Uploads", "Live Streams"],
    code: "pipeline.ingest(sources=['api', 'db', 'files'])",
  },
  {
    id: 2,
    title: "Preprocessing",
    icon: "🔧",
    color: "#4361ee",
    description: "Automated cleaning, normalization, and feature engineering",
    details: ["Data Cleaning", "Normalization", "Encoding", "Imputation"],
    code: "data = pipeline.preprocess(raw_data, strategy='auto')",
  },
  {
    id: 3,
    title: "Feature Engineering",
    icon: "🔬",
    color: "#bf00ff",
    description: "AI-driven feature extraction and selection for optimal model performance",
    details: ["Auto Feature Gen", "Selection", "Embedding", "PCA/t-SNE"],
    code: "features = pipeline.engineer(data, method='neural')",
  },
  {
    id: 4,
    title: "Model Training",
    icon: "🧠",
    color: "#ff006e",
    description: "Distributed training with hyperparameter optimization across GPU clusters",
    details: ["Multi-GPU Training", "AutoML", "HPO", "Cross-Validation"],
    code: "model = pipeline.train(features, epochs=100, distributed=True)",
  },
  {
    id: 5,
    title: "Evaluation",
    icon: "📊",
    color: "#39ff14",
    description: "Comprehensive model evaluation with bias detection and performance metrics",
    details: ["Accuracy Metrics", "Bias Detection", "A/B Testing", "Explainability"],
    code: "results = pipeline.evaluate(model, metrics=['all'])",
  },
  {
    id: 6,
    title: "Deployment",
    icon: "🚀",
    color: "#ffe600",
    description: "One-click deployment with auto-scaling, monitoring, and continuous learning",
    details: ["Auto-Scaling", "CI/CD", "Monitoring", "Rollback"],
    code: "pipeline.deploy(model, env='production', scale='auto')",
  },
];

const MLPipelineViz = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % pipelineSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-pink">
          🔗 ML Architecture
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-themed-primary">
          Our <span className="gradient-text-neon">ML Pipeline</span>
        </h3>
        <p className="text-themed-secondary max-w-2xl mx-auto">
          End-to-end machine learning workflow from data to deployment
        </p>
      </motion.div>

      {/* Pipeline Steps */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {pipelineSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Step card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              className={`ai-glass rounded-xl p-4 cursor-pointer transition-all ${
                activeFlow === index ? "ring-1" : ""
              }`}
              style={{
                borderColor: activeFlow === index ? step.color : undefined,
                boxShadow: activeFlow === index ? `0 0 20px ${step.color}22` : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Step number */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}88)` }}
                >
                  {step.id}
                </div>

                {/* Icon */}
                <motion.div
                  className="text-2xl"
                  animate={activeFlow === index ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm" style={{ color: step.color }}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-themed-secondary truncate">
                    {step.description}
                  </p>
                </div>

                {/* Expand indicator */}
                <motion.span
                  animate={{ rotate: expandedStep === index ? 180 : 0 }}
                  className="text-themed-secondary text-sm"
                >
                  ▼
                </motion.span>
              </div>

              {/* Expanded details */}
              {expandedStep === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <p className="text-sm text-themed-secondary mb-3">{step.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {step.details.map((d) => (
                      <span
                        key={d}
                        className="text-xs px-2 py-1 rounded-full ai-glass"
                        style={{ color: step.color }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="bg-black/30 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                    <span className="text-themed-secondary">$</span>
                    <span style={{ color: step.color }}> {step.code}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Connector */}
            {index < pipelineSteps.length - 1 && (
              <div className="flex justify-center my-1">
                <motion.div
                  className="w-0.5 h-4"
                  style={{
                    background: `linear-gradient(180deg, ${pipelineSteps[index].color}, ${pipelineSteps[index + 1].color})`,
                  }}
                  animate={
                    activeFlow === index
                      ? { opacity: [0.3, 1, 0.3], scaleY: [1, 1.5, 1] }
                      : { opacity: 0.3 }
                  }
                  transition={{ duration: 1, repeat: activeFlow === index ? Infinity : 0 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MLPipelineViz;
