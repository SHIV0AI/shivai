"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Logo3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-2000">
      {/* Holographic Container */}
      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: mousePosition.x * 15,
          rotateX: -mousePosition.y * 15,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Glowing Orb Background */}
        <motion.div
          className="absolute inset-0 -m-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-3xl opacity-50" />
        </motion.div>

        {/* Rotating Rings - VR Depth */}
        {mounted && (
          <>
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={`ring-${index}`}
                className="absolute inset-0 -m-10 border-2 rounded-full"
                style={{
                  borderColor: `rgba(59, 130, 246, ${0.3 - index * 0.05})`,
                  transform: `translateZ(${index * -30}px)`,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateZ: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateZ: { duration: 10 + index * 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </>
        )}

        {/* Main Logo with 3D Layers */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Shadow Layer - Deepest */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: "translateZ(-60px)", filter: "blur(10px)" }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image
              src="/assets/logo.png"
              alt="SHiV.Ai Logo Shadow"
              width={550}
              height={550}
              className="w-full h-full opacity-30"
            />
          </motion.div>

          {/* Mid Layer - Purple Glow */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: "translateZ(-40px)", filter: "hue-rotate(45deg)" }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Image
              src="/assets/logo.png"
              alt="Shiv.AI Logo Glow"
              width={550}
              height={550}
              className="w-full h-full"
            />
          </motion.div>

          {/* Near Layer - Cyan Accent */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: "translateZ(-20px)", filter: "hue-rotate(-30deg)" }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image
              src="/assets/logo.png"
              alt="Shiv.AI Logo Accent"
              width={550}
              height={550}
              className="w-full h-full"
            />
          </motion.div>

          {/* Main Logo - Front Layer */}
          <motion.div
            className="relative z-10"
            style={{ transform: "translateZ(0px)" }}
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
                "drop-shadow(0 0 40px rgba(147, 51, 234, 1))",
                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image
              src="/assets/logo.png"
              alt="SHiV.Ai Logo"
              width={550}
              height={550}
              className="w-full h-full"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Logo3D;
