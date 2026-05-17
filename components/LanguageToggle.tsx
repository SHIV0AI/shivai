"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageContext } from "@/context/LanguageContext";

const languages = [
  { code: "en", name: "English", flag: "🇪" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    console.log("🟣 LanguageToggle: Language clicked:", langCode);
    setLanguage(langCode as any);
    console.log("🟣 LanguageToggle: setLanguage called");
    setIsOpen(false);
  };

  if (!mounted) return null;

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full glass-effect flex items-center justify-center text-xl transition-all duration-300 hover:shadow-lg"
        style={{
          boxShadow: isOpen
            ? "0 0 20px rgba(147, 51, 234, 0.6)"
            : "0 0 10px rgba(147, 51, 234, 0.2)",
        }}
      >
        <motion.span
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {currentLang.flag}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 glass-effect rounded-2xl shadow-2xl overflow-hidden z-50 border border-white/10"
            >
              <div className="py-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-4 py-2.5 text-left flex items-center space-x-3 transition-colors ${
                      language === lang.code
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-themed-secondary hover:text-themed-primary"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-purple-400"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageToggle;
