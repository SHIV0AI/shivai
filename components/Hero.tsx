"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Logo3D from "./Logo3D";

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    
    // Get current theme
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(newTheme);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"]
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { value: "500+", label: "AI Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Enterprise Clients" },
    { value: "24/7", label: "Expert Support" },
  ];

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000 transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)"
          : "linear-gradient(to bottom, #000000 0%, #1e3a8a20 50%, #000000 100%)"
      }}
    >
      {/* Subtle overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: theme === "light"
            ? "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, transparent 50%)"
        }}
      />
      
      {/* Mountain Silhouettes - Himalayan Peaks */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 sm:h-4/5 md:h-5/6 opacity-40 z-0">
        {/* Back Mountain Layer */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path 
            d="M0,600 L0,220 Q150,80 300,150 L400,300 L450,400 L550,450 L650,450 L750,400 L800,300 L900,150 Q1050,80 1200,220 L1200,600 Z" 
            fill="url(#mountain-gradient-1)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="mountain-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Middle Mountain Layer */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path 
            d="M0,600 L0,280 Q100,120 200,200 L300,320 L400,430 L550,490 L650,490 L800,430 L900,320 L1000,200 Q1100,120 1200,280 L1200,600 Z" 
            fill="url(#mountain-gradient-2)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="mountain-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Front Mountain Layer with Snow Caps */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path 
            d="M0,600 L0,350 Q150,180 300,280 L400,180 L450,460 L550,520 L650,520 L750,460 L800,180 L900,280 Q1050,200 1200,350 L1200,600 Z" 
            fill="url(#mountain-gradient-3)"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="mountain-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Crescent Moon */}
      <motion.div
        className="absolute top-20 right-20"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path 
            d="M 50 10 A 35 35 0 1 1 50 90 A 30 30 0 1 0 50 10" 
            fill="rgba(249, 115, 22, 0.4)"
            stroke="rgba(249, 115, 22, 0.6)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      {/* Trishul Symbol */}
      <motion.div
        className="absolute top-32 left-20 opacity-20"
        animate={{
          y: [0, -10, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="100" viewBox="0 0 60 100">
          <line x1="30" y1="20" x2="30" y2="90" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="3"/>
          <line x1="15" y1="20" x2="30" y2="10" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
          <line x1="30" y1="10" x2="45" y2="20" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
          <line x1="30" y1="10" x2="30" y2="0" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2"/>
        </svg>
      </motion.div>
      
      {/* Flowing River/Ganga Effect */}
      {mounted && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(6, 182, 212, 0.1), transparent)",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute bottom-0 h-1 bg-cyan-400/20"
              style={{
                left: `${i * 5}%`,
                width: "10%",
              }}
              animate={{
                x: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Third Eye Glow Effect */}
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"
      />
      
      {/* VR Depth Layers - Cosmic Dance */}
      {mounted && (
        <>
          {/* Layer 1 - Distant Cosmic Rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotateZ: 360,
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[800px] h-[800px] border-2 border-blue-500/10 rounded-full" />
          </motion.div>
          
          {/* Layer 2 - Middle Ring (Trishul inspired) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotateZ: -360,
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[600px] h-[600px] border-2 border-purple-500/20 rounded-full" />
          </motion.div>
          
          {/* Layer 3 - Inner Ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotateZ: 360,
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[400px] h-[400px] border-2 border-orange-500/30 rounded-full" />
          </motion.div>
        </>
      )}
      
      {/* VR Animated Gradient - Cosmic Energy */}
      {theme === "dark" && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="text-center space-y-2 sm:space-y-1 md:space-y-0.5">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-30 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 xl:-mt-12 text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight px-4 text-themed-primary"
          >
            <span className="gradient-text">Intelligent Agentic Knowledge Ecosystem</span>
          </motion.h1>

          {/* Massive 3D Animated Logo - Center Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
              rotateY: [0, 0, 0, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1]
            }}
            className="relative mx-auto mb-2 sm:mb-1 md:mb-0 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 xl:-mt-14 z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] pointer-events-none"
          >
            {/* Epic Glow Background */}
            <motion.div
              className="absolute inset-0 -m-32"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-cyan-500 blur-[100px]" />
            </motion.div>

            {/* Main Logo with Enhanced 3D */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <Logo3D />
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm text-themed-secondary max-w-2xl mx-auto leading-relaxed px-4"
          >
            Build the future with{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">intelligent agents</span>{" "}
            in a dynamic{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">knowledge ecosystem</span>.{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Transform</span>{" "}
            your business,{" "}
            <span className="text-red-600 dark:text-red-400 font-semibold">destroy inefficiency</span>, and{" "}
            <span className="text-orange-600 dark:text-orange-400 font-semibold">create</span>{" "}
            autonomous AI agents for limitless innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-1 md:pt-2 px-4 relative z-50"
          >
            <motion.a
              href="/get-started"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-1.5 sm:py-1.5 md:py-1.5 lg:py-1.5 bg-gradient-primary text-white rounded-full font-semibold text-xs sm:text-xs md:text-sm lg:text-sm glow-effect hover:shadow-2xl transition-all group w-full sm:w-auto text-center"
            >
              Begin Your Divine Transformation
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#case-studies"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 sm:px-4 py-1.5 sm:py-1.5 md:py-1.5 lg:py-1.5 glass-effect text-white dark:text-white text-gray-900 rounded-full font-semibold text-xs sm:text-xs md:text-sm lg:text-sm hover:border-purple-500/50 transition-all w-full sm:w-auto border-2 border-purple-500/30 hover:bg-purple-500/10 text-center"
            >
              View Case Studies
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
