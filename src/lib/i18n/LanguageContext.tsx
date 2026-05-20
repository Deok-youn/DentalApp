'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'ko';

type Ctx = { lang: Language; setLang: (l: Language) => void };

const LanguageContext = createContext<Ctx>({ lang: 'ko', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dental-lang') as Language | null;
    if (saved === 'en' || saved === 'ko') setLangState(saved);
    setMounted(true);
  }, []);

  // SSR과 초기 클라이언트 렌더링 기본값을 'ko' 로 통일
  const effectiveLang: Language = mounted ? lang : 'ko';

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('dental-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang: effectiveLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
