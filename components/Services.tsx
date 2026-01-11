"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [theme, setTheme] = useState("dark");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
    
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(newTheme);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"]
    });
    
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "🤖",
      title: "Autonomous AI Agents",
      description:
        "Intelligent agents that operate independently to complete complex tasks, make decisions, and adapt to changing environments.",
      features: ["Multi-Agent Systems", "Agentic Workflows", "Task Automation", "Self-Learning Agents"],
      gradient: "from-violet-600 to-fuchsia-600",
    },
    {
      icon: "⚡",
      title: "Intelligent Automation",
      description:
        "Streamline operations with cutting-edge automation powered by advanced AI algorithms and RPA.",
      features: ["Process Automation", "Workflow Optimization", "RPA Solutions", "AI Orchestration"],
      gradient: "from-cyan-600 to-teal-600",
    },
    {
      icon: "🛡️",
      title: "AI Security & Ethics",
      description:
        "Ensure responsible AI deployment with security monitoring, bias detection, and ethical AI frameworks.",
      features: ["AI Governance", "Bias Detection", "Adversarial Defense", "Model Auditing"],
      gradient: "from-slate-600 to-zinc-600",
    },
    {
      icon: "🧠",
      title: "Custom AI Systems",
      description:
        "Bespoke artificial intelligence solutions tailored to your unique business challenges and objectives.",
      features: ["Neural Networks", "Deep Learning", "Model Training", "AI Architecture"],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: "🔗",
      title: "LLM Integration & RAG",
      description:
        "Leverage large language models with Retrieval-Augmented Generation for enterprise knowledge systems.",
      features: ["LLM Integration", "Custom RAG Systems", "Vector Databases", "Prompt Engineering"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: "📊",
      title: "AI Analytics & BI",
      description:
        "Transform raw data into actionable insights with our advanced analytics, ML models, and predictive intelligence.",
      features: ["Predictive Analytics", "Data Mining", "Pattern Recognition", "Real-time Dashboards"],
      gradient: "from-orange-600 to-red-600",
    },
    {
      icon: "🎯",
      title: "Machine Learning Ops",
      description:
        "Deploy, monitor, and scale ML models in production with enterprise-grade MLOps infrastructure.",
      features: ["Model Deployment", "Continuous Training", "Performance Monitoring", "AutoML"],
      gradient: "from-green-600 to-emerald-600",
    },
    {
      icon: "💬",
      title: "Conversational AI",
      description:
        "Advanced NLP systems for understanding and generating human language, with context-aware interactions.",
      features: ["Intelligent Chatbots", "Voice Assistants", "Sentiment Analysis", "Multi-lingual Support"],
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      icon: "👁️",
      title: "Computer Vision",
      description:
        "Advanced visual recognition and analysis systems powered by deep learning for image and video processing.",
      features: ["Object Detection", "Image Classification", "Facial Recognition", "Video Analytics"],
      gradient: "from-pink-600 to-rose-600",
    },
  ];

  const displayedServices = !showAll ? services : services.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="services" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #faf5ff 50%, #ffffff 100%)"
          : "#000000"
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(243,232,255,0.3) 50%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(to bottom, #000000 0%, rgba(88,28,135,0.05) 50%, #000000 100%)"
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{
          background: theme === "light" ? "rgba(147,51,234,0.05)" : "rgba(147,51,234,0.1)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="glass-effect px-6 py-2 rounded-full text-sm text-purple-600 dark:text-purple-400">
              Our Expertise
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-themed-primary">
            <span className="gradient-text">AI Solutions</span> That Drive Results
          </h2>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            Cutting-edge artificial intelligence services designed to transform
            your business and unlock unprecedented growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedServices.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative glass-effect p-8 rounded-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer bg-black/40 backdrop-blur-xl border border-white/10"
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-6 inline-block relative z-10"
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all relative z-10" style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 leading-relaxed relative z-10" style={{ color: theme === 'light' ? '#4b5563' : '#d1d5db' }}>
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2 relative z-10">
                {service.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                    <span className="text-sm" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute bottom-8 right-8 text-purple-400 z-10"
              >
                <span className="text-2xl">→</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold text-lg glow-effect hover:shadow-2xl transition-all"
          >
            {showAll ? "Show Less" : "Explore All Services"}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-2"
            >
              {showAll ? "↑" : "→"}
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
