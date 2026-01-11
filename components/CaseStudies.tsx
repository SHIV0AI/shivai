"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [theme, setTheme] = useState("dark");

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

  const filters = ["All", "Medical", "Finance", "Business", "Research"];

  const caseStudies = [
    {
      id: 1,
      category: "Medical",
      agentName: "MediScan Agent",
      title: "Autonomous Medical Diagnosis System",
      client: "Global Healthcare Network",
      description:
        "Intelligent agent ecosystem analyzing medical images, patient data, and research papers to provide accurate diagnoses autonomously.",
      results: ["70% faster diagnosis", "95% accuracy rate", "Multi-modal analysis"],
      image: "🤖",
      tech: ["GPT-4 Vision", "RAG Pipeline", "Knowledge Graphs"],
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: 2,
      category: "Finance",
      agentName: "GuardianAI Agent",
      title: "Real-Time Fraud Detection Ecosystem",
      client: "International Banking Group",
      description:
        "Multi-agent system with specialized fraud detection agents working collaboratively to identify and prevent fraudulent transactions in real-time.",
      results: ["99.8% detection rate", "$50M+ saved", "Real-time collaboration"],
      image: "🛡️",
      tech: ["LangGraph", "Agent Orchestration", "Vector DB"],
      gradient: "from-green-600 to-teal-600",
    },
    {
      id: 3,
      category: "Business",
      agentName: "SupplyChain Agent",
      title: "Intelligent Inventory Management Agents",
      client: "Global E-commerce Platform",
      description:
        "Agentic workflow optimizing supply chain with predictive agents, demand forecasting agents, and automated procurement agents.",
      results: ["40% cost reduction", "98% availability", "Autonomous ordering"],
      image: "📦",
      tech: ["AutoGen", "Multi-Agent Systems", "Predictive ML"],
      gradient: "from-orange-600 to-red-600",
    },
    {
      id: 4,
      category: "Research",
      agentName: "ResearchHub Agent",
      title: "Autonomous Knowledge Discovery System",
      client: "Pharmaceutical R&D",
      description:
        "Self-learning agent ecosystem that autonomously researches scientific papers, conducts experiments, and discovers new compounds.",
      results: ["80% faster discovery", "50+ compounds found", "Continuous learning"],
      image: "🔬",
      tech: ["LLM Agents", "RAG Systems", "Auto-Research"],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: 5,
      category: "Finance",
      agentName: "TradeBot Agent",
      title: "Autonomous Trading Agent Network",
      client: "Hedge Fund Partners",
      description:
        "Sophisticated agent network analyzing markets, executing trades, and managing risk autonomously with real-time decision making.",
      results: ["25% ROI increase", "Microsecond execution", "Risk-aware agents"],
      image: "📈",
      tech: ["ReAct Agents", "Tool-using AI", "Real-time Analytics"],
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: 6,
      category: "Business",
      agentName: "CustomerCare Agent",
      title: "Intelligent Customer Support Ecosystem",
      client: "Tech Enterprise",
      description:
        "Multi-agent customer service system with specialized agents for support, escalation, and knowledge retrieval working collaboratively.",
      results: ["90% automation rate", "24/7 availability", "Context-aware responses"],
      image: "💬",
      tech: ["LangChain Agents", "Memory Systems", "Tool Integration"],
      gradient: "from-pink-600 to-rose-600",
    },
  ];

  const filteredCaseStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeFilter);

  return (
    <section 
      id="case-studies" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #fdf2f8 50%, #ffffff 100%)"
          : "#000000"
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(253,242,248,0.3) 50%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(to bottom, #000000 0%, rgba(157,23,77,0.05) 50%, #000000 100%)"
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: theme === "light" ? "rgba(236,72,153,0.05)" : "rgba(236,72,153,0.1)"
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
            <span className="glass-effect px-6 py-2 rounded-full text-sm text-pink-600 dark:text-pink-400">
              Agent Success Stories
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-themed-primary">
            Intelligent <span className="gradient-text">Agent Ecosystems</span>
          </h2>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            Discover how we&apos;ve built autonomous agent systems that transform businesses through intelligent collaboration and decision-making.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-primary text-white glow-effect"
                  : "glass-effect text-gray-400 hover:text-white"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCaseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group glass-effect p-8 rounded-2xl hover:border-pink-500/50 transition-all cursor-pointer overflow-hidden relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated Background Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${study.gradient} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              />
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  y: { duration: 3, repeat: Infinity, delay: index * 0.3 },
                  rotate: { duration: 4, repeat: Infinity, delay: index * 0.2 },
                  hover: { duration: 0.5 }
                }}
                className="text-7xl mb-6 inline-block"
              >
                {study.image}
              </motion.div>

              {/* Category Badge */}
              <motion.div 
                className="inline-block mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <span
                  className={`px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${study.gradient} text-white shadow-lg`}
                >
                  {study.category}
                </span>
              </motion.div>

              {/* Agent Name */}
              <div className="mb-2">
                <span className={`text-sm font-semibold bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                  {study.agentName}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 group-hover:gradient-text transition-all relative z-10" style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}>
                {study.title}
              </h3>

              {/* Client */}
              <p className="text-sm mb-4 relative z-10" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>{study.client}</p>

              {/* Description */}
              <p className="mb-6 leading-relaxed relative z-10" style={{ color: theme === 'light' ? '#4b5563' : '#d1d5db' }}>
                {study.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 relative z-10">
                <p className="text-xs font-semibold mb-2" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {study.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${study.gradient} bg-opacity-10 border border-white/10`}
                      style={{ color: theme === 'light' ? '#374151' : '#e5e7eb' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3 mb-6 relative z-10">
                {study.results.map((result, idx) => (
                  <motion.div
                    key={result}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center space-x-3 group/result"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${study.gradient} shadow-lg`}
                    />
                    <span className="text-sm transition-colors" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>{result}</span>
                  </motion.div>
                ))}
              </div>

              {/* View Details Button */}
              <motion.button
                whileHover={{ x: 8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-pink-400 font-semibold group-hover:text-pink-300 transition-colors relative z-10"
              >
                View Details
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />
              
              {/* Decorative Corners */}
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${study.gradient} opacity-20 rounded-br-full`}
              />
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${study.gradient} opacity-20 rounded-tl-full`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-400 mb-6">
            Ready to write your success story?
          </p> */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold text-lg glow-effect hover:shadow-2xl transition-all"
          >
            Start Your Project
          </motion.button> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
};

export default CaseStudies;
