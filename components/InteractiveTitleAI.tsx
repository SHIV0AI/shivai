"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface InteractiveTitleAIProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  glitch?: boolean;
  gradient?: boolean;
}

const InteractiveTitleAI = ({
  text,
  className = "",
  as: Tag = "h2",
  glitch = true,
  gradient = true,
}: InteractiveTitleAIProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (!glitch) return;
    // Random glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [glitch]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  const letters = text.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={`relative inline-block cursor-default ${className}`}
    >
      <Tag className="relative z-10">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className={`inline-block ${gradient ? "gradient-text-neon" : "text-themed-primary"}`}
            style={{ display: letter === " " ? "inline" : "inline-block" }}
            animate={
              isHovered
                ? {
                    y: Math.sin((i + mousePos.x * 5) * 0.5) * 3,
                    x: mousePos.x * (5 - Math.abs(i - letters.length / 2) * 0.3),
                    rotate: mousePos.x * 2 * (i % 2 === 0 ? 1 : -1),
                  }
                : { y: 0, x: 0, rotate: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: i * 0.01,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </Tag>

      {/* Glitch layers */}
      {glitch && glitchActive && (
        <>
          <Tag
            className="absolute top-0 left-0 z-0 gradient-text-neon opacity-70"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, -1px)",
              filter: "hue-rotate(90deg)",
            }}
            aria-hidden
          >
            {text}
          </Tag>
          <Tag
            className="absolute top-0 left-0 z-0 gradient-text-neon opacity-70"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 1px)",
              filter: "hue-rotate(-90deg)",
            }}
            aria-hidden
          >
            {text}
          </Tag>
        </>
      )}

      {/* Electron orbiting text */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-neon-cyan"
            style={{ boxShadow: "0 0 10px #00fff5, 0 0 20px #00fff5" }}
            animate={{
              x: ["-10%", "110%", "110%", "-10%", "-10%"],
              y: ["-20%", "-20%", "120%", "120%", "-20%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveTitleAI;
