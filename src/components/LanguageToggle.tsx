'use client';
import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';

const LABELS: Record<Language, string> = {
  en: 'EN',
  ko: '한',
};

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full p-0.5 ${className}`}
      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
    >
      {(['en', 'ko'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{ minHeight: 0 }}
          className={`min-w-[38px] rounded-full px-2 py-1 text-xs font-bold transition-all ${
            lang === l
              ? 'bg-white shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
          // active lang text color applied inline for precision
        >
          <span style={{ color: lang === l ? '#7c2d5e' : undefined }}>{LABELS[l]}</span>
        </button>
      ))}
    </div>
  );
}
