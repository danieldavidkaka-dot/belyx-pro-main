import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 1. EL DICCIONARIO DE PALABRAS
// Aquí irás agregando todas las frases de tu app
const translations = {
  es: {
    greeting: "Buenos días",
    ready: "¿Lista para brillar?",
    mode_home: "En Casa",
    mode_salon: "En Salón",
    ai_picks: "Recomendado por IA",
    view_all: "Ver todo",
    categories: "Categorías",
    near_you: "Cerca de ti",
    settings_language: "Idioma",
    settings_dark_mode: "Modo Oscuro",
    settings_title: "Configuración"
  },
  en: {
    greeting: "Good morning",
    ready: "Ready for your glow up?",
    mode_home: "At Home",
    mode_salon: "In Salon",
    ai_picks: "AI Picks For You",
    view_all: "View all",
    categories: "Browse Categories",
    near_you: "Near You",
    settings_language: "Language",
    settings_dark_mode: "Dark Mode",
    settings_title: "App Settings"
  }
};

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string; // Función traductora mágica
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Intentamos leer el idioma guardado, o usamos español por defecto
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('belyx_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('belyx_lang', language);
  }, [language]);

  // Esta función "t" busca la traducción. Si no la encuentra, devuelve la clave.
  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}