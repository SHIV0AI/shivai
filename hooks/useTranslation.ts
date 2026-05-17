"use client";

import { useCallback } from "react";
import { getTranslation, Language } from "@/lib/translations";
import { useLanguageContext } from "@/context/LanguageContext";

export const useTranslation = () => {
  const { language, mounted } = useLanguageContext();

  const t = useCallback((key: string): any => {
    const translation = getTranslation(language as Language, key);
    console.log(`🟠 useTranslation.t("${key}") -> lang: ${language} -> "${translation}"`);
    return translation;
  }, [language]);

  return { t, language, mounted };
};
