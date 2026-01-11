"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [theme, setTheme] = useState("dark");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);
        // Reset form
        setFormState({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit form. Please try again.',
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      value: "shiv0.0ai@gmail.com",
      link: "mailto:shiv0.0ai@gmail.com",
    },
    {
      icon: "📱",
      title: "Call Us",
      value: "+91 9719508006 , +65 87101444",
      link: "tel:+919719508006",
    },
    {
      icon: "📍",
      title: "Visit Us",
      value: "Dehradun, India & Jurong East, Singapore",
      link: "#",
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{
        background: theme === "light" 
          ? "linear-gradient(to bottom, #ffffff 0%, #eef2ff 50%, #ffffff 100%)"
          : "#000000"
      }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "light"
            ? "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(238,242,255,0.3) 50%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(to bottom, #000000 0%, rgba(88,28,135,0.05) 50%, #000000 100%)"
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl"
        style={{
          background: theme === "light" ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.1)"
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
            <span className="glass-effect px-6 py-2 rounded-full text-sm text-indigo-600 dark:text-indigo-400">
              Get In Touch
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-themed-primary">
            Let's Build the <span className="gradient-text">Future Together</span>
          </h2>
          <p className="text-xl text-themed-secondary max-w-3xl mx-auto">
            Ready to transform your business with AI? Our team of experts is
            here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus && submitStatus.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-lg border bg-red-500/10 border-red-500/50 text-red-300"
                >
                  {submitStatus.message}
                </motion.div>
              )}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}
                >
                  Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
                  whileHover={{ borderColor: "rgba(147,51,234,0.5)" }}
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}
                >
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
                  whileHover={{ borderColor: "rgba(147,51,234,0.5)" }}
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white"
                  placeholder="john@company.com"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}
                >
                  Company Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
                  whileHover={{ borderColor: "rgba(147,51,234,0.5)" }}
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white"
                  placeholder="Your Company"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}
                >
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(147,51,234,0.3)" }}
                  whileHover={{ borderColor: "rgba(147,51,234,0.5)" }}
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold text-lg glow-effect hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block mr-2"
                    >
                      ⏳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & 3D Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                  } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ x: 15, scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl flex items-center space-x-4 hover:border-indigo-500/50 transition-all group block relative overflow-hidden"
                >
                  {/* Animated Background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                      hover: { duration: 0.5 }
                    }}
                    className="text-5xl relative z-10"
                  >
                    {info.icon}
                  </motion.div>
                  <div className="relative z-10">
                    <h4 className="font-semibold mb-1 group-hover:gradient-text transition-all" style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}>
                      {info.title}
                    </h4>
                    <p className="transition-colors" style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>{info.value}</p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-6 text-2xl gradient-text"
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-8 rounded-2xl relative overflow-hidden"
            >
              {/* Background Gradient */}
              <motion.div
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10"
              />
              
              <h3 className="text-2xl font-bold mb-6 gradient-text relative z-10">
                Why Choose Us?
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  { text: "World-class AI experts", icon: "🎓" },
                  { text: "Proven track record", icon: "🏆" },
                  { text: "24/7 dedicated support", icon: "💬" },
                  { text: "Cutting-edge technology", icon: "⚡" },
                  { text: "Tailored solutions", icon: "🎯" },
                ].map((item, index) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center space-x-3 group/item cursor-pointer"
                  >
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="w-2 h-2 bg-gradient-accent rounded-full"
                    />
                    <span className="group-hover/item:gradient-text transition-all" style={{ color: theme === 'light' ? '#374151' : '#d1d5db' }}>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-6 rounded-xl relative overflow-hidden"
            >
              <h4 className="font-semibold mb-4 gradient-text">Connect With Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: "LinkedIn", icon: "in", gradient: "from-blue-600 to-cyan-600" },
                  { name: "Twitter", icon: "𝕏", gradient: "from-cyan-600 to-teal-600" },
                  { name: "GitHub", icon: "GH", gradient: "from-purple-600 to-pink-600" }
                ].map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.3 + idx * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -8,
                      rotate: [0, -10, 10, 0]
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-14 h-14 glass-effect rounded-xl flex items-center justify-center hover:border-purple-500/50 transition-all group"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity`}
                    />
                    <span className="text-sm font-bold relative z-10 group-hover:gradient-text transition-all">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500"
        >
          <p>
            &copy; {new Date().getFullYear()} AI Intelligence. All rights
            reserved. Powered by next-generation AI technology.
          </p>
        </motion.div>
      </div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccessPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass-effect p-8 rounded-2xl max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </motion.button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>

              {/* Success Message */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-2 gradient-text"
              >
                Message Sent Successfully!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 mb-6"
              >
                Thank you for reaching out! We'll get back to you within 24 hours.
              </motion.p>

              {/* Auto-dismiss indicator */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;