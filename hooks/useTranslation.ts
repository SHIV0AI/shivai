"use client";

import { useState, useEffect } from "react";
import { translations, Language, getTranslation } from "@/lib/translations";

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      const newLang = event.detail as Language;
      if (translations[newLang]) {
        setLanguage(newLang);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return { t, language };
};
