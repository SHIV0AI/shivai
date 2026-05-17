"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [theme, setTheme] = useState("dark");
  const { t } = useTranslation();

  const milestones = [
    { year: t("about.timeline.foundation.year"), title: t("about.timeline.foundation.title"), description: t("about.timeline.foundation.description"), gradient: "from-indigo-600 to-blue-600" },
    { year: t("about.timeline.growth.year"), title: t("about.timeline.growth.title"), description: t("about.timeline.growth.description"), gradient: "from-blue-600 to-purple-600" },
    { year: t("about.timeline.formation.year"), title: t("about.timeline.formation.title"), description: t("about.timeline.formation.description"), gradient: "from-purple-600 to-pink-600" },
    { year: t("about.timeline.expansion.year"), title: t("about.timeline.expansion.title"), description: t("about.timeline.expansion.description"), gradient: "from-pink-600 to-orange-600" },
  ];

  const values = [
    { icon: t("about.innovation.icon"), title: t("about.innovation.title"), description: t("about.innovation.description") },
    { icon: t("about.success.icon"), title: t("about.success.title"), description: t("about.success.description") },
    { icon: t("about.speed.icon"), title: t("about.speed.title"), description: t("about.speed.description") },
    { icon: t("about.impact.icon"), title: t("about.impact.title"), description: t("about.impact.description") },
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
      id="about"
      className="relative py-24 overflow-hidden transition-colors duration-300"
      style={{ background: dark ? "#000" : "#fff" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-8" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(0,255,245,0.04)" : "rgba(6,182,212,0.03)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(191,0,255,0.04)" : "rgba(147,51,234,0.03)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 pt-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-6"
            style={{
              background: dark ? "rgba(6,182,212,0.08)" : "rgba(6,182,212,0.05)",
              borderColor: dark ? "rgba(6,182,212,0.15)" : "rgba(6,182,212,0.12)",
              color: dark ? "#67e8f9" : "#0891b2",
            }}
          >
            {t("about.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: dark ? "#fff" : "#111827" }}>
            {t("about.title")} <span className="gradient-text-neon">{t("about.subtitle")}</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            {t("about.description")}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              emoji: "🎯",
              title: "Our Mission",
              text: t("about.mission"),
              accent: "indigo",
            },
            {
              emoji: "🔮",
              title: "Our Vision",
              text: t("about.vision"),
              accent: "purple",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -4 }}
              className="premium-card p-8 rounded-2xl"
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">{item.title}</h3>
              <p className="leading-relaxed" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Our Journey</h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div
              className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
              style={{ background: dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)" }}
            />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
                >
                  {/* Content */}
                  <div className="flex-1 ml-14 md:ml-0">
                    <div className="premium-card p-6 rounded-xl">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                        style={{
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                          backgroundImage: `linear-gradient(135deg, ${m.gradient.includes("indigo") ? "#4f46e5" : m.gradient.includes("blue") ? "#2563eb" : m.gradient.includes("purple") ? "#9333ea" : "#ec4899"}, ${m.gradient.includes("blue") ? "#2563eb" : m.gradient.includes("purple") ? "#9333ea" : m.gradient.includes("pink") ? "#ec4899" : "#f97316"})`,
                        }}
                      >
                        {m.year}
                      </span>
                      <h4 className="text-lg font-bold mb-1" style={{ color: dark ? "#fff" : "#111827" }}>{m.title}</h4>
                      <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>{m.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-2 z-10"
                    style={{
                      borderColor: dark ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.3)",
                      background: dark ? "#0a0a1a" : "#fff",
                    }}
                  />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-10 gradient-text">Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="premium-card p-6 rounded-xl text-center"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h4 className="text-base font-bold mb-1" style={{ color: dark ? "#fff" : "#111827" }}>{v.title}</h4>
                <p className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
