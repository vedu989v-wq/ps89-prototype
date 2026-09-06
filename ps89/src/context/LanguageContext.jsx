import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../i18n/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(i18n.language || "en");

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguageState(lng);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "hi" : "en";
    setLanguage(nextLang);
  };

  const t = (key, options) => i18n.t(key, options);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside LanguageProvider
    return {
      language: i18n.language || "en",
      setLanguage: (lang) => i18n.changeLanguage(lang),
      toggleLanguage: () => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en"),
      t: (key, options) => i18n.t(key, options),
      i18n
    };
  }
  return context;
}
