"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [theme, setTheme] = useState("dark");
  const { t } = useTranslation();

  const services = [
    {
      icon: "🤖",
      title: t("services.agentic.title"),
      description: t("services.agentic.description"),
      features: t("services.agentic.features"),
      gradient: "from-cyan-500 to-purple-600",
      color: "#00fff5",
    },
    {
      icon: "🧠",
      title: t("services.knowledge.title"),
      description: t("services.knowledge.description"),
      features: t("services.knowledge.features"),
      gradient: "from-purple-600 to-pink-600",
      color: "#bf00ff",
    },
    {
      icon: "⚡",
      title: t("services.workflow.title"),
      description: t("services.workflow.description"),
      features: t("services.workflow.features"),
      gradient: "from-blue-600 to-indigo-600",
      color: "#4361ee",
    },
    {
      icon: "🔬",
      title: t("services.deeplearning.title"),
      description: t("services.deeplearning.description"),
      features: t("services.deeplearning.features"),
      gradient: "from-violet-600 to-indigo-600",
      color: "#7c3aed",
    },
    {
      icon: "👁️",
      title: t("services.vision.title"),
      description: t("services.vision.description"),
      features: t("services.vision.features"),
      gradient: "from-fuchsia-600 to-purple-600",
      color: "#d946ef",
    },
    {
      icon: "📊",
      title: t("services.analytics.title"),
      description: t("services.analytics.description"),
      features: t("services.analytics.features"),
      gradient: "from-emerald-600 to-teal-600",
      color: "#10b981",
    },
    {
      icon: "🛡️",
      title: t("services.safety.title"),
      description: t("services.safety.description"),
      features: t("services.safety.features"),
      gradient: "from-amber-600 to-orange-600",
      color: "#f59e0b",
    },
    {
      icon: "🔗",
      title: t("services.integration.title"),
      description: t("services.integration.description"),
      features: t("services.integration.features"),
      gradient: "from-cyan-600 to-blue-600",
      color: "#06b6d4",
    },
    {
      icon: "🚀",
      title: t("services.mlops.title"),
      description: t("services.mlops.description"),
      features: t("services.mlops.features"),
      gradient: "from-rose-600 to-pink-600",
      color: "#f43f5e",
    },
  ];

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden transition-colors duration-300"
      style={{
        background: dark
          ? "linear-gradient(to bottom, #000 0%, rgba(0,255,245,0.02) 50%, #000 100%)"
          : "linear-gradient(to bottom, #fff 0%, rgba(6,182,212,0.02) 50%, #fff 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 circuit-bg opacity-8" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ background: dark ? "rgba(0,255,245,0.04)" : "rgba(6,182,212,0.03)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(191,0,255,0.04)" : "rgba(147,51,234,0.03)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-6 neon-glow-cyan"
            style={{
              background: dark ? "rgba(0,255,245,0.06)" : "rgba(6,182,212,0.05)",
              borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.15)",
              color: dark ? "#00fff5" : "#0891b2",
            }}
          >
            {t("services.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: dark ? "#fff" : "#111827" }}>
            {t("services.title")} <span className="gradient-text-neon">{t("services.subtitle")}</span>
          </h2>
        </motion.div>

        {/* Services Grid — all visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group premium-card p-7 rounded-2xl cursor-pointer relative overflow-hidden"
            >
              {/* Hover glow */}
              <AnimatePresence>
                {hoveredCard === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at center, ${service.color}10 0%, transparent 70%)`,
                      border: `1px solid ${service.color}20`,
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10">
                {/* Icon with glow */}
                <div className="relative inline-block mb-5">
                  <div className="text-4xl">{service.icon}</div>
                  {hoveredCard === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -inset-3 rounded-full -z-10"
                      style={{ background: `${service.color}10` }}
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 transition-colors" style={{ color: hoveredCard === i ? service.color : (dark ? "#fff" : "#111827") }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm mb-5 leading-relaxed" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                  {service.description}
                </p>

                {/* Features with animated bullets */}
                <div className="space-y-2">
                  {Array.isArray(service.features) && service.features.map((f: string, fi: number) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.06 + fi * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      <span className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
