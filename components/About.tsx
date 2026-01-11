"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const About = () => {
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

  const milestones = [
    {
      year: "2023",
      title: "Foundation",
      description: "Founded by Shivam (idea → execution). First standalone AI project delivered.",
      icon: "🚀",
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      year: "2024",
      title: "Growth",
      description: "Co-founders joined (stronger vision). Small-scale AI projects completed.",
      icon: "📈",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      year: "2025",
      title: "Formation & Scale",
      description: "Company registered (Shiv.AI). Team of 10 (AI scientists, developers, PMs). Multiple client projects delivered.",
      icon: "🏢",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      year: "2026",
      title: "Roadmap",
      description: "More clients (market expansion). Global presence planned (Singapore).",
      icon: "🌏",
      gradient: "from-pink-600 to-orange-600",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "Pushing boundaries with cutting-edge AI research",
    },
    {
      icon: "🤝",
      title: "Client Success",
      description: "Your success is our ultimate measure of achievement",
    },
    {
      icon: "⚡",
      title: "Speed & Quality",
      description: "Rapid delivery without compromising excellence",
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description: "Creating solutions that transform industries worldwide",
    },
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #ecfeff 50%, #ffffff 100%)"
          : "#000000"
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(236,254,255,0.3) 50%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(to bottom, #000000 0%, rgba(8,145,178,0.05) 50%, #000000 100%)"
        }}
      />
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: theme === "light" ? "rgba(6,182,212,0.05)" : "rgba(6,182,212,0.1)"
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
            <span className="glass-effect px-6 py-2 rounded-full text-sm text-cyan-600 dark:text-cyan-400">
              About Us
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-themed-primary">
            Pioneering the <span className="gradient-text">Future of AI</span>
          </h2>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            We are a team of visionary AI engineers, data scientists, and
            innovators dedicated to transforming businesses through intelligent
            technology.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative glass-effect p-10 rounded-2xl hover:border-cyan-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl mb-4"
            >
              🎯
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 gradient-text relative z-10">Our Mission</h3>
            <p className="leading-relaxed text-lg relative z-10" style={{ color: theme === 'light' ? '#4b5563' : '#9ca3af' }}>
              Transform businesses through intelligent agents. Destroy inefficiency.
              Create autonomous ecosystems that learn, adapt, and deliver
              unprecedented results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative glass-effect p-10 rounded-2xl hover:border-purple-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-6xl mb-4"
            >
              🔮
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 gradient-text relative z-10">Our Vision</h3>
            <p className="leading-relaxed text-lg relative z-10" style={{ color: theme === 'light' ? '#4b5563' : '#9ca3af' }}>
              To be the world&apos;s most trusted AI partner, recognized for
              delivering intelligent solutions that reshape industries and
              create lasting impact. We envision a future where AI enhances
              every aspect of business.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-orange-500 origin-top"
            />

            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex-1" />
                  
                  {/* Center Circle with Icon */}
                  <motion.div 
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mx-8"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${milestone.gradient} rounded-full glow-effect flex items-center justify-center text-3xl shadow-2xl`}>
                      {milestone.icon}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="group relative glass-effect p-8 rounded-2xl hover:border-purple-500/50 transition-all overflow-hidden cursor-pointer"
                    >
                      {/* Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-purple-600/0 group-hover:from-cyan-600/10 group-hover:to-purple-600/10 transition-all duration-500" />
                      
                      {/* Year Badge */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-white font-bold text-lg mb-4 relative z-10"
                      >
                        {milestone.year}
                      </motion.div>
                      
                      {/* Title */}
                      <h4 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all relative z-20" style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}>
                        {milestone.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="leading-relaxed text-base mb-4 relative z-20" style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}>
                        {milestone.description}
                      </p>

                      {/* Hover Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className={`absolute ${index % 2 === 0 ? 'right-8' : 'left-8'} bottom-8 text-3xl`}
                      >
                        <span className="gradient-text">{index % 2 === 0 ? '→' : '←'}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-effect p-6 rounded-xl text-center hover:border-cyan-500/50 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  {value.icon}
                </motion.div>
                <h4 className="text-xl font-bold mb-2" style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}>{value.title}</h4>
                <p className="text-sm" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
