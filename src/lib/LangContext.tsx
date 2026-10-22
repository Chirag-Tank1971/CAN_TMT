import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';
import type { Translations } from '../translations/en';

type Lang = 'en' | 'hi';

interface LangContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: en,
  toggleLang: () => {},
});

const KEY = 'cantmt-lang';
const initial = (): Lang => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'hi') return saved;
  } catch { /* storage blocked: fall through */ }
  return new URLSearchParams(location.search).get('lang') === 'hi' ? 'hi' : 'en';
};

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'));

  // screen readers + Devanagari typography rules (:lang(hi)) follow the chosen language
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const t = lang === 'en' ? en : hi;

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
