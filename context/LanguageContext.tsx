"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    console.log("🔵 LanguageProvider: Initializing...");
    const savedLanguage = localStorage.getItem("language") as Language;
    console.log("🔵 LanguageProvider: Saved language from localStorage:", savedLanguage);
    
    if (savedLanguage && translations[savedLanguage]) {
      console.log("🔵 LanguageProvider: Setting to saved language:", savedLanguage);
      setLanguageState(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage);
    } else {
      console.log("🔵 LanguageProvider: Setting to default (en)");
      document.documentElement.setAttribute("lang", "en");
    }
    setMounted(true);
    console.log("🔵 LanguageProvider: Mounted set to true");
  }, []);

  const setLanguage = (newLanguage: Language) => {
    console.log("🟢 LanguageProvider: setLanguage called with:", newLanguage);
    if (translations[newLanguage]) {
      console.log("🟢 LanguageProvider: Language valid, updating state");
      setLanguageState(newLanguage);
      localStorage.setItem("language", newLanguage);
      document.documentElement.setAttribute("lang", newLanguage);
      
      // Dispatch event for any listeners
      window.dispatchEvent(
        new CustomEvent("languageChange", {
          detail: newLanguage,
          bubbles: true,
        })
      );
      console.log("🟢 LanguageProvider: Dispatched languageChange event with:", newLanguage);
    } else {
      console.log("🟢 LanguageProvider: Language invalid:", newLanguage);
    }
  };

  console.log("🟡 LanguageProvider rendering with language:", language, "mounted:", mounted);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  console.log("🔴 useLanguageContext called, context:", context?.language);
  
  if (!context) {
    // Return a default context for SSR/mount issues
    console.log("🔴 useLanguageContext: No context found, returning default");
    return {
      language: "en" as Language,
      setLanguage: () => { console.log("🔴 setLanguage called but no context"); },
      mounted: false,
    };
  }
  return context;
}
