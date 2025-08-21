import React, { createContext, useContext, useState } from 'react';
import vi from './vi.json';
import en from './en.json';

type Lang = 'vi' | 'en';
type Dict = Record<string, string>;

const dicts: Record<Lang, Dict> = { vi, en };

const Ctx = createContext({
  t: (k: string) => k,
  lang: 'vi' as Lang,
  setLang: (l: Lang) => {},
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('vi');
  const dict = dicts[lang];
  const t = (k: string) => dict[k] || k;

  return <Ctx.Provider value={{ t, lang, setLang }}>{children}</Ctx.Provider>;
};

export const useI18n = () => useContext(Ctx);
