import React, { createContext, useContext, useState } from 'react';
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

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'));

  const t = lang === 'en' ? en : hi;

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
