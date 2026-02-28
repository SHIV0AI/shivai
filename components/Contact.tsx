"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const contactInfo = [
  { icon: "📧", title: "Email Us", value: "founders@shivai.co.in", link: "mailto:founders@shivai.co.in" },
  { icon: "📱", title: "Call Us", value: "+91 9719508006 , +65 87101444", link: "tel:+919719508006" },
  { icon: "📍", title: "Visit Us", value: "Dehradun, India & Jurong East, Singapore", link: "#" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [theme, setTheme] = useState("dark");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = await res.json();
      if (res.ok) {
        setShowSuccessPopup(true);
        setFormState({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setShowSuccessPopup(false), 5000);
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Failed to submit. Please try again." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputStyle: React.CSSProperties = {
    background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    color: dark ? "#e5e7eb" : "#1f2937",
    borderRadius: 12,
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden transition-colors duration-300"
      style={{ background: dark ? "#000" : "#fff" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 circuit-bg opacity-8" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(0,255,245,0.03)" : "rgba(6,182,212,0.02)" }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: dark ? "rgba(191,0,255,0.04)" : "rgba(147,51,234,0.03)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-8"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border mb-6 neon-glow-cyan"
            style={{
              background: dark ? "rgba(0,255,245,0.08)" : "rgba(6,182,212,0.05)",
              borderColor: dark ? "rgba(0,255,245,0.2)" : "rgba(6,182,212,0.15)",
              color: dark ? "#00fff5" : "#0891b2",
            }}
          >
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: dark ? "#fff" : "#111827" }}>
            Let&apos;s Build the <span className="gradient-text-neon">Future Together</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            Ready to transform your business with AI? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="premium-card p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitStatus?.type === "error" && (
                <div
                  className="p-4 rounded-xl text-sm"
                  style={{
                    background: dark ? "rgba(239,68,68,0.08)" : "rgba(239,68,68,0.05)",
                    color: dark ? "#fca5a5" : "#dc2626",
                    border: `1px solid ${dark ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.15)"}`,
                  }}
                >
                  {submitStatus.message}
                </div>
              )}

              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
                { id: "email", label: "Email Address", type: "email", placeholder: "john@company.com", required: true },
                { id: "company", label: "Company", type: "text", placeholder: "Your Company", required: false },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium mb-1.5" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formState[field.id as keyof typeof formState]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-gray-500"
                    style={inputStyle}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-gray-500"
                  style={inputStyle}
                />
              </div>

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full font-semibold text-white text-base bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 bg-[length:200%_100%] shadow-lg neon-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Right column — info + why us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="premium-card p-5 rounded-xl flex items-center gap-4 block"
              >
                <div className="text-3xl">{info.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>{info.title}</h4>
                  <p className="text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Why choose us */}
            <div className="premium-card p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4 gradient-text-neon">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  { text: "World-class AI experts", icon: "🎓" },
                  { text: "Proven track record", icon: "🏆" },
                  { text: "24/7 dedicated support", icon: "💬" },
                  { text: "Cutting-edge technology", icon: "⚡" },
                  { text: "Tailored solutions", icon: "🎯" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div className="premium-card p-5 rounded-xl">
              <h4 className="text-sm font-semibold mb-3 gradient-text-neon">Connect With Us</h4>
              <div className="flex gap-3">
                {[
                  { name: "LinkedIn", icon: "in" },
                  { name: "Twitter", icon: "𝕏" },
                  { name: "GitHub", icon: "GH" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-105"
                    style={{
                      background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                      color: dark ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div
          className="mt-16 pt-6 text-center text-sm"
          style={{
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            color: dark ? "#4b5563" : "#9ca3af",
          }}
        >
          &copy; {new Date().getFullYear()} Shiv.AI. All rights reserved. Powered by next-generation AI technology.
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowSuccessPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="premium-card p-8 rounded-2xl max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-sm"
                style={{ color: dark ? "#6b7280" : "#9ca3af" }}
              >
                ✕
              </button>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2 gradient-text-neon">Message Sent!</h3>
              <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                Thank you! We&apos;ll get back to you within 24 hours.
              </p>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-0.5 mt-4 rounded-full"
                style={{ background: "linear-gradient(90deg, #22c55e, #3b82f6)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
