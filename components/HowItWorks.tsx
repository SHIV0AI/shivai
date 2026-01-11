"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const steps = [
    {
      number: "01",
      title: "We Listen to Your Story",
      description: "First, we understand your business. We'll sit with your teams across sales, marketing, HR, operations, and finance to learn how you work today.",
      details: ["Sales Data", "HR Systems", "Marketing Analytics", "Operations", "Customer Support", "Finance"],
      icon: "👂",
      color: "cyan",
      narrative: "Your data is scattered across departments. We collect and organize everything into one unified knowledge base."
    },
    {
      number: "02",
      title: "We Build Your Brain",
      description: "We create a Knowledge Graph - a living, breathing map of your entire organization. Every relationship, every connection, every piece of data linked intelligently.",
      details: ["Entity Mapping", "Relationship Discovery", "Context Linking", "Pattern Recognition", "Data Unification"],
      icon: "🧠",
      color: "blue",
      narrative: "Think of it as the brain of your organization - understanding how everything connects and influences everything else."
    },
    {
      number: "03",
      title: "We Deploy Your Team",
      description: "Now comes the magic. We deploy specialized AI agents - your new workforce. Sales agents, content creators, analysts, and more. Each one expert in their domain.",
      details: ["Knowledge Agents", "Sales Agents", "Content Generation", "Broadcaster Agents", "Analytics Agents", "Support Agents"],
      icon: "🚀",
      color: "purple",
      narrative: "These aren't just tools - they're autonomous team members that learn, adapt, and improve every single day."
    },
    {
      number: "04",
      title: "We Orchestrate the Symphony",
      description: "At the center sits the Orchestrator - the conductor of your AI symphony. It manages workflows, coordinates agents, and ensures everything runs smoothly.",
      details: ["Flow Management", "Agent Coordination", "Parallel Processing", "Priority Routing", "Resource Allocation"],
      icon: "🎼",
      color: "orange",
      narrative: "The Orchestrator ensures all agents work in harmony, communicating, collaborating, and achieving your goals together."
    },
    {
      number: "05",
      title: "You Watch It Evolve",
      description: "Your ecosystem is alive. Agents communicate with each other, learn from interactions, and continuously optimize. You sit back and watch your business transform.",
      details: ["Agent-to-Agent Communication", "Continuous Learning", "Auto-Optimization", "Scalable Operations", "Infinite Capacity"],
      icon: "🌱",
      color: "cyan",
      narrative: "This is the future - a self-evolving business that grows smarter every day, without you lifting a finger."
    }
  ];

  const agentTypes = [
    { name: "Knowledge Agent", description: "Manages and retrieves organizational knowledge", color: "from-cyan-500 to-blue-500" },
    { name: "Sales Agent", description: "Automates sales processes and lead generation", color: "from-blue-500 to-purple-500" },
    { name: "Content Agent", description: "Creates marketing and communication content", color: "from-purple-500 to-pink-500" },
    { name: "Broadcaster Agent", description: "Distributes information across channels", color: "from-pink-500 to-orange-500" },
    { name: "Analytics Agent", description: "Provides insights and data analysis", color: "from-orange-500 to-red-500" },
    { name: "Support Agent", description: "Handles customer queries and support", color: "from-red-500 to-cyan-500" },
  ];

  const securityFeatures = [
    {
      icon: "🔐",
      title: "Role-Based Access Control",
      description: "RBAC ensures each agent only accesses what it needs",
      details: ["Admin Level", "Manager Level", "Agent Level", "Read-Only Access"],
      color: "cyan"
    },
    {
      icon: "🛡️",
      title: "Multi-Layer Security",
      description: "Enterprise-grade encryption and protection at every level",
      details: ["End-to-End Encryption", "Data Isolation", "Secure APIs", "Audit Logs"],
      color: "purple"
    },
    {
      icon: "👁️",
      title: "Access Monitoring",
      description: "Real-time tracking of all agent activities and permissions",
      details: ["Activity Logs", "Permission Tracking", "Anomaly Detection", "Compliance Reports"],
      color: "orange"
    },
    {
      icon: "🔑",
      title: "Granular Permissions",
      description: "Fine-tuned control over what each agent can see and do",
      details: ["Department Access", "Data Sensitivity Levels", "Action Restrictions", "Time-Based Access"],
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; glow: string; text: string }> = {
      cyan: { border: "border-cyan-500/50", glow: "shadow-cyan-500/50", text: "text-cyan-400" },
      blue: { border: "border-blue-500/50", glow: "shadow-blue-500/50", text: "text-blue-400" },
      purple: { border: "border-purple-500/50", glow: "shadow-purple-500/50", text: "text-purple-400" },
      orange: { border: "border-orange-500/50", glow: "shadow-orange-500/50", text: "text-orange-400" },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <section 
      id="get-started" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)"
          : "linear-gradient(to bottom, #000000 0%, #1e1b4b 50%, #000000 100%)"
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: theme === "light" 
            ? "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)"
            : "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </div>

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
              Your Transformation Journey
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-themed-primary">
            How We <span className="gradient-text">Transform Your Business</span>
          </h2>
          <p className="text-xl text-themed-secondary max-w-4xl mx-auto leading-relaxed mb-8">
            Imagine a world where your business runs autonomously, with intelligent agents handling everything 
            from sales to customer support. Here's how we make it happen...
          </p>
          <p className="text-lg text-themed-secondary max-w-3xl mx-auto leading-relaxed italic">
            "We can't give everyone human interns or assistants, but we can give you an army of 
            <span className="font-bold text-purple-600 dark:text-purple-400"> AI agents</span> working 24/7 for your success."
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-24 mb-24">
          {steps.map((step, index) => {
            const colorClasses = getColorClasses(step.color);
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                {/* Floating particles around icon */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`particle-${index}-${i}`}
                    className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-40"
                    style={{
                      left: index % 2 === 0 ? '10%' : 'auto',
                      right: index % 2 === 0 ? 'auto' : '10%',
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}

                {/* Icon & Number */}
                <motion.div 
                  className="flex-shrink-0 relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rotating ring around icon */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl border-2 ${colorClasses.border}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ width: '140px', height: '140px', margin: '-4px' }}
                  />
                  
                  <div className={`relative w-32 h-32 glass-effect rounded-2xl flex items-center justify-center border-2 ${colorClasses.border} hover:${colorClasses.glow} hover:shadow-2xl transition-all group cursor-pointer`}>
                    <motion.div 
                      className="text-6xl"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                    
                    {/* Glowing number badge */}
                    <motion.div 
                      className={`absolute -top-4 -right-4 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center font-bold text-white glow-effect text-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-1"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === index ? 'bg-purple-500' : 'bg-gray-600'}`}
                        animate={i === index ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                {/* Content with enhanced styling */}
                <motion.div 
                  className="flex-1 text-center md:text-left"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className={`text-4xl font-bold mb-4 ${colorClasses.text}`}
                    whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-xl text-themed-primary mb-4 leading-relaxed font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {step.description}
                  </motion.p>
                  <motion.p 
                    className="text-lg text-themed-secondary mb-6 leading-relaxed italic glass-effect p-4 rounded-lg inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    💡 {step.narrative}
                  </motion.p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {step.details.map((detail, i) => (
                      <motion.span
                        key={detail}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -5,
                          boxShadow: "0 10px 20px rgba(147, 51, 234, 0.3)"
                        }}
                        className="glass-effect px-4 py-2 rounded-full text-sm text-themed-secondary hover:border-purple-500/70 transition-all cursor-pointer"
                      >
                        ✓ {detail}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Agent Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-24"
        >
          <h3 className="text-4xl font-bold text-center mb-6 gradient-text">
            Your Agent Network in Action
          </h3>
          <p className="text-xl text-themed-secondary text-center mb-12 max-w-3xl mx-auto">
            Imagine a digital workforce where every agent is a specialist, all coordinated by a master orchestrator. 
            They talk to each other, share knowledge, and work together to achieve your goals - all without your intervention.
          </p>
          
          <div className="relative w-full" style={{ minHeight: '700px' }}>
            {/* Central Orchestrator - At Top Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center mb-16"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                    "0 0 40px rgba(147, 51, 234, 0.8)",
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-48 h-48 bg-gradient-primary rounded-full flex items-center justify-center glow-effect cursor-pointer hover:scale-110 transition-transform">
                  <div className="text-center">
                    <motion.div 
                      className="text-6xl mb-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      🎯
                    </motion.div>
                    <div className="font-bold text-white text-lg">Orchestrator</div>
                    <div className="text-sm text-white/80">Master Agent</div>
                  </div>
                </div>
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </motion.div>

            {/* Connection Lines from Orchestrator to Agents */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '96px' }}>
              {agentTypes.map((_, index) => {
                const cols = 3;
                const rows = 2;
                const col = index % cols;
                const row = Math.floor(index / cols);
                const startX = 50; // center percentage
                const startY = 0;
                const endX = (col * 33.33) + 16.66;
                const endY = (row * 50) + 25;
                
                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                    transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                  />
                );
              })}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Agent Grid - Below Orchestrator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 px-4">
              {agentTypes.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.15 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.08, 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
                    }}
                    className={`glass-effect p-6 rounded-2xl text-center hover:border-purple-500/70 transition-all cursor-pointer bg-gradient-to-br ${agent.color} bg-opacity-10 relative overflow-hidden h-full`}
                  >
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 hover:opacity-10"
                      animate={{
                        background: [
                          "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <motion.div
                      className="text-5xl mb-3"
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index === 0 ? "🧠" : index === 1 ? "💼" : index === 2 ? "✨" : index === 3 ? "📢" : index === 4 ? "📊" : "💬"}
                    </motion.div>
                    <h4 className="font-bold mb-2 text-white text-lg">{agent.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{agent.description}</p>
                    
                    {/* Status indicator */}
                    <div className="flex items-center justify-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-400">Active</span>
                    </div>

                    {/* Particle effect on hover */}
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="glass-effect p-12 rounded-2xl text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-4 gradient-text">
            What This Means For You
          </h3>
          <p className="text-xl text-themed-secondary mb-12 max-w-3xl mx-auto">
            Your business transforms from a traditional operation into a hyper-intelligent, self-evolving organism. 
            Here's what changes:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl mb-4">♾️</div>
              <h4 className="text-xl font-bold mb-2 text-themed-primary">Scale Without Limits</h4>
              <p className="text-themed-secondary">
                Need 100 more sales agents? Deploy instantly. No hiring, no training, no overhead. Just infinite scalability.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-2 text-themed-primary">Never Sleep Again</h4>
              <p className="text-themed-secondary">
                Your agents work 24/7/365. While you sleep, they're closing deals, creating content, and optimizing operations.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🧠</div>
              <h4 className="text-xl font-bold mb-2 text-themed-primary">Get Smarter Daily</h4>
              <p className="text-themed-secondary">
                Every interaction makes them better. Your business literally becomes more intelligent with each passing day.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="inline-block mb-4"
            >
              <span className="glass-effect px-6 py-2 rounded-full text-sm text-red-600 dark:text-red-400">
                🔒 Enterprise-Grade Security
              </span>
            </motion.div>
            <h3 className="text-4xl font-bold mb-4 gradient-text">
              Fort Knox-Level Security for Your AI Agents
            </h3>
            <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
              We don't just build intelligent systems - we build <span className="font-bold text-themed-primary">secure intelligent systems</span>. 
              Every agent operates within strict access controls and permissions.
            </p>
          </div>

          {/* RBAC Visual Hierarchy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="glass-effect p-8 rounded-2xl mb-12 relative overflow-hidden"
          >
            {/* Animated security grid background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)",
                backgroundSize: "30px 30px"
              }} />
            </div>

            <h4 className="text-2xl font-bold text-center mb-8 gradient-text relative z-10">
              Role-Based Access Control (RBAC) - Multi-Level Protection
            </h4>

            {/* Access Levels Pyramid */}
            <div className="relative z-10 max-w-4xl mx-auto">
              {[
                { level: "Admin Level", access: "Full System Control", users: "C-Suite Executives", color: "from-red-500 to-orange-500", width: "w-full" },
                { level: "Manager Level", access: "Department Access + Analytics", users: "Department Heads", color: "from-orange-500 to-yellow-500", width: "w-11/12" },
                { level: "Agent Level", access: "Task-Specific Operations", users: "AI Agents", color: "from-yellow-500 to-green-500", width: "w-9/12" },
                { level: "Read-Only", access: "View & Monitor Only", users: "Auditors & Viewers", color: "from-green-500 to-cyan-500", width: "w-7/12" },
              ].map((tier, index) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                  className="mb-4"
                >
                  <div className={`mx-auto ${tier.width} relative`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`bg-gradient-to-r ${tier.color} p-6 rounded-xl shadow-lg cursor-pointer`}
                    >
                      <div className="flex items-center justify-between text-white">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">🔑</span>
                            <h5 className="text-lg font-bold">{tier.level}</h5>
                          </div>
                          <p className="text-sm opacity-90 mb-1">{tier.access}</p>
                          <p className="text-xs opacity-75">👥 {tier.users}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="text-3xl opacity-50"
                        >
                          🛡️
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color);
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`glass-effect p-6 rounded-xl text-center hover:border-purple-500/50 transition-all cursor-pointer border-2 ${colorClasses.border}`}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h4 className="text-lg font-bold mb-2 text-themed-primary">{feature.title}</h4>
                  <p className="text-sm text-themed-secondary mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.9 + index * 0.1 + i * 0.05 }}
                        className="text-xs text-themed-secondary bg-black/20 dark:bg-white/5 px-3 py-1 rounded-full"
                      >
                        ✓ {detail}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Security Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-12 glass-effect p-8 rounded-2xl text-center border-2 border-green-500/30"
          >
            <div className="text-5xl mb-4">✅</div>
            <h4 className="text-2xl font-bold mb-3 text-green-400">Our Security Promise</h4>
            <p className="text-lg text-themed-secondary max-w-3xl mx-auto">
              Your data is <span className="font-bold text-themed-primary">yours alone</span>. 
              Every agent operates in isolated environments with encrypted communications. 
              We implement <span className="font-bold text-cyan-400">zero-trust architecture</span> - 
              nothing is trusted by default, everything is verified.
            </p>
          </motion.div>
        </motion.div>

        {/* Story Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h3 className="text-3xl font-bold mb-6 gradient-text">
            The Bottom Line
          </h3>
          <p className="text-xl text-themed-secondary leading-relaxed mb-6">
            Most businesses are limited by human capacity. You can only hire so many people, train them for so long, 
            and scale so fast. <span className="font-bold text-themed-primary">We remove that ceiling entirely.</span>
          </p>
          <p className="text-xl text-themed-secondary leading-relaxed">
            Your competitors are still doing it the old way - slowly hiring, slowly training, slowly growing. 
            You'll be operating at <span className="font-bold text-purple-600 dark:text-purple-400">10x the speed</span> with 
            <span className="font-bold text-cyan-600 dark:text-cyan-400"> infinite resources</span>.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center"
        >
          <p className="text-2xl font-bold mb-6 gradient-text">
            Ready to Begin Your Story?
          </p>
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold text-lg glow-effect hover:shadow-2xl transition-all"
          >
            Start Your Transformation
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
