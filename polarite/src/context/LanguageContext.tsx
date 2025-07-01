'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, any>;
};

const defaultTranslations = {
  en: async () => (await import('@/translations/en.json')).default,
  ja: async () => (await import('@/translations/ja.json')).default,
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const loadedTranslations = await defaultTranslations[language as keyof typeof defaultTranslations]();
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
        setLanguage(savedLanguage);
      }
    }

    loadTranslations();
  }, [language]);

  const handleSetLanguage = (lang: string) => {
    if (lang === 'en' || lang === 'ja') {
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLanguage', lang);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 