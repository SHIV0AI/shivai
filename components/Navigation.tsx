"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), href: "/", prefetch: true },
    { name: t("nav.services"), href: "/services", prefetch: true },
    { name: t("nav.about"), href: "/about", prefetch: true },
    { name: t("nav.contact"), href: "/contact", prefetch: true },
    { name: "Locations", href: "/locations", prefetch: false },
    { name: "Agent Lab", href: "/agent-lab", prefetch: false },
    { name: "Neuro Lab", href: "/neuro-lab", prefetch: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        isScrolled
          ? "glass-effect shadow-lg shadow-purple-500/10 dark:shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Text Only */}
          <Link href="/" className="flex items-center group">
            <span className="text-3xl sm:text-4xl font-bold gradient-text-neon">SHiV.Ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  className="text-themed-secondary hover:text-themed-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </div>
            ))}
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <Link href="/get-started">
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white rounded-full font-semibold neon-glow-cyan hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
                {t("nav.getStarted")}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-themed-primary p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-themed-primary block transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-themed-primary block transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-themed-primary block transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass-effect border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-themed-secondary hover:text-themed-primary transition-colors py-2"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full px-6 py-3 bg-gradient-primary text-white rounded-full font-semibold glow-effect">
              {t("nav.getStarted")}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
