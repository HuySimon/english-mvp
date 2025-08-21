import React, { createContext, useContext, useState } from 'react';
type Dict = Record<string, string>;
const vi: Dict = { home_title: 'Học tiếng Anh 1–1, đặt lịch chỉ trong 2 phút', find_teacher: 'Tìm giáo viên', register: 'Đăng ký ngay', book_trial: 'Đặt học thử' };
const en: Dict = { home_title: 'Learn English 1–1, book in 2 minutes', find_teacher: 'Find teachers', register: 'Sign up', book_trial: 'Book trial' };
const Ctx = createContext({ t: (k: string) => k, lang: 'vi', setLang: (l: 'vi'|'en')=>{} } as any);
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'vi'|'en'>('vi'); const dict = lang === 'vi' ? vi : en;
  const t = (k: string) => dict[k] || k;
  return <Ctx.Provider value={{ t, lang, setLang }}>{children}</Ctx.Provider>;
};
export const useI18n = () => useContext(Ctx);