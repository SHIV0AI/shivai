"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const streamTypes = [
  { label: "API Calls", color: "#00fff5", rate: "2.4K/s" },
  { label: "Model Inference", color: "#bf00ff", rate: "850/s" },
  { label: "Data Points", color: "#39ff14", rate: "15K/s" },
  { label: "Events", color: "#ff006e", rate: "5.2K/s" },
];

function ParticleLine({ color, delay, width }: { color: string; delay: number; width: string }) {
  return (
    <motion.div
      className="h-0.5 rounded-full absolute"
      style={{ background: color, width, top: `${10 + Math.random() * 80}%`, left: "-10%" }}
      animate={{ x: ["0%", "120%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay, ease: "linear" }}
    />
  );
}

const LiveDataViz = ({ className = "" }: { className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [counts, setCounts] = useState([0, 0, 0, 0]);
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

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) => c + Math.floor(Math.random() * [24, 9, 150, 52][i]))
      );
    }, 100);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className={`relative py-20 overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: theme === "light"
          ? "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)"
          : "linear-gradient(135deg, #000 0%, #050510 100%)",
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <ParticleLine
            key={i}
            color={streamTypes[i % 4].color}
            delay={i * 0.3}
            width={`${20 + Math.random() * 60}px`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="ai-glass px-4 py-1.5 rounded-full text-xs font-semibold text-neon-cyan">
            📡 Real-Time Processing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-themed-primary">
            Live <span className="gradient-text-neon">Data Streams</span>
          </h2>
          <p className="text-themed-secondary text-sm">
            Watch our AI infrastructure process data in real-time
          </p>
        </motion.div>

        {/* Stream cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {streamTypes.map((stream, i) => (
            <motion.div
              key={stream.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="ai-glass rounded-xl p-4 text-center"
            >
              <div className="text-xs font-semibold mb-2" style={{ color: stream.color }}>
                {stream.label}
              </div>
              <div className="text-2xl font-bold font-mono text-themed-primary mb-1">
                {counts[i].toLocaleString()}
              </div>
              <div className="text-[10px] text-themed-secondary">{stream.rate}</div>

              {/* Mini bar chart */}
              <div className="flex items-end justify-center gap-0.5 mt-3 h-6">
                {Array.from({ length: 8 }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="w-1.5 rounded-t-sm"
                    style={{ backgroundColor: stream.color }}
                    animate={{
                      height: [`${10 + Math.random() * 90}%`, `${10 + Math.random() * 90}%`],
                      opacity: [0.4, 0.9],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: j * 0.1,
                    }}
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

export default LiveDataViz;
