"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AIGlobe3D = dynamic(() => import("./AIGlobe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl animate-pulse" style={{ background: "rgba(99,102,241,0.05)" }} />
  ),
});

const offices = [
  {
    city: "Dehradun",
    country: "India",
    flag: "🇮🇳",
    address: "Dehradun, Uttarakhand, India",
    phone: "+91 9719508006",
    email: "founders@shivai.co.in",
    focus: "AI Research & Development Hub",
    highlights: ["Neural Network Research", "Custom Model Training", "Enterprise Solutions"],
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    address: "Jurong East, Singapore",
    phone: "+65 87101444",
    email: "founders@shivai.co.in",
    focus: "Asia-Pacific Operations",
    highlights: ["Client Partnerships", "APAC Expansion", "Enterprise Deployment"],
  },
];

const Locations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [theme, setTheme] = useState("dark");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";

  const handleLocationSelect = (name: string) => {
    setSelectedLocation((prev) => (prev === name ? null : name));
  };

  return (
    <section
      id="locations"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden transition-colors duration-300"
      style={{ background: dark ? "#000" : "#f8fafc" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-8" />
      <div className="absolute top-0 left-1/3 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[140px]"
        style={{ background: dark ? "rgba(0,255,245,0.04)" : "rgba(6,182,212,0.05)" }} />
      <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(191,0,255,0.04)" : "rgba(147,51,234,0.05)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16 pt-4 sm:pt-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-4 sm:mb-6"
            style={{
              background: dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.07)",
              borderColor: dark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.15)",
              color: dark ? "#a5b4fc" : "#4f46e5",
            }}
          >
            Global Presence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{ color: dark ? "#fff" : "#111827" }}>
            Intelligence <span className="gradient-text-neon">Worldwide</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            Research labs in India, operations in Singapore — building AI that serves the world.
          </p>
        </motion.div>

        {/* Globe + Cards — stacks on mobile, side-by-side on large screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 items-start lg:items-center">
          {/* Globe */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tap-to-zoom hint on mobile */}
            <p className="text-center text-[11px] mb-2 sm:hidden"
              style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
              Tap a city below or on the globe to zoom in
            </p>
            <AIGlobe3D
              focusLocation={selectedLocation}
              onLocationClick={handleLocationSelect}
            />
          </motion.div>

          {/* Office cards */}
          <div className="w-full space-y-4 sm:space-y-5">
            {offices.map((office, i) => {
              const isActive = selectedLocation === office.city;
              const accentColor = office.city === "Dehradun" ? "#00fff5" : "#bf00ff";

              return (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  whileHover={{ y: -3 }}
                  onClick={() => handleLocationSelect(office.city)}
                  className="premium-card p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300"
                  style={isActive ? {
                    border: `1.5px solid ${accentColor}45`,
                    boxShadow: `0 0 28px ${accentColor}22, 0 4px 24px rgba(0,0,0,0.1)`,
                  } : {}}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl">{office.flag}</span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold"
                          style={{ color: isActive ? accentColor : dark ? "#fff" : "#111827" }}>
                          {office.city}, {office.country}
                        </h3>
                        <p className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{office.focus}</p>
                      </div>
                    </div>
                    {/* Active indicator */}
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
                      style={{
                        background: isActive
                          ? dark ? `${accentColor}18` : `${accentColor}12`
                          : dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                        color: isActive ? accentColor : dark ? "#6b7280" : "#9ca3af",
                        border: `1px solid ${isActive ? accentColor + "40" : "transparent"}`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: isActive ? accentColor : dark ? "#4b5563" : "#d1d5db", boxShadow: isActive ? `0 0 6px ${accentColor}` : "none" }}
                      />
                      {isActive ? "Viewing" : "Click to zoom"}
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-1 sm:space-y-1.5 mb-3">
                    <p className="text-xs sm:text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>📍 {office.address}</p>
                    <p className="text-xs sm:text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>📱 {office.phone}</p>
                    <p className="text-xs sm:text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>📧 {office.email}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {office.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium"
                        style={{
                          background: isActive
                            ? dark ? `${accentColor}12` : `${accentColor}08`
                            : dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
                          color: isActive ? accentColor : dark ? "#a5b4fc" : "#4f46e5",
                          border: `1px solid ${isActive ? accentColor + "30" : dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}`,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
