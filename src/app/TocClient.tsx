'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { lookupSectionKo, UI_STRINGS } from '@/lib/i18n/ko-data';
import { imgUrl } from '@/lib/catalog';
import type { Section } from '@/lib/catalog';

export function TocClient({ sections }: { sections: Section[] }) {
  const { lang } = useLanguage();
  const t = UI_STRINGS[lang];
  const trayCount = sections.filter((s) => s.type === 'tray').length;
  const instrCount = sections.filter((s) => s.type === 'instrs').length;
  const totalInstr = sections.reduce((acc, s) => acc + s.instruments.length, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header
        className="text-white px-4 pt-10 pb-8"
        style={{ background: 'linear-gradient(135deg, #7c2d5e 0%, #4c1d95 60%, #6d1b4e 100%)' }}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/50 text-[11px] tracking-widest uppercase mb-1">Dental Instruments</p>
              <h1 className="text-3xl font-bold tracking-tight leading-tight">Catalog</h1>
              {lang === 'ko' && (
                <>
                  <p className="mt-2 text-white/60 text-xs">덴탈 인스트루먼츠</p>
                  <p className="text-white font-bold text-xl mt-0.5">치과 기구 도감</p>
                </>
              )}
              <p className="mt-3 text-white/40 text-[10px] leading-relaxed">
                UCSD Pre-Dental Society<br />
                Created by Sumei Mai · Supervised by Dr. Randall Taylor
              </p>
            </div>
            <LanguageToggle className="shrink-0 mt-1" />
          </div>
        </div>
      </header>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div
        className="text-white/80 text-xs py-2.5 text-center tracking-wide"
        style={{ background: 'linear-gradient(90deg, #6d1b4e, #4c1d95)' }}
      >
        {instrCount} {t.statsInstrSections} · {trayCount} {t.statsTraySetups} · {totalInstr} {t.statsTotalInstr}
      </div>

      {/* ── TOC ────────────────────────────────────────────────────── */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-5">
          {t.tableOfContents}
        </p>

        <ol className="space-y-2.5">
          {sections.map((section, i) => {
            const isTray = section.type === 'tray';
            const koData = lookupSectionKo(section.id);
            const thumb =
              isTray && section.tray?.imagePath
                ? imgUrl(section.tray.imagePath)
                : section.instruments[0]?.imagePath
                  ? imgUrl(section.instruments[0].imagePath)
                  : null;

            return (
              <li key={section.id}>
                <Link
                  href={`/section/${section.id}`}
                  className={`flex items-start gap-3 rounded-2xl px-3 py-3 border transition-all active:scale-[0.98] ${
                    isTray
                      ? 'bg-amber-50/80 border-amber-100 hover:border-amber-300 hover:shadow-sm'
                      : 'bg-white border-rose-100 hover:border-rose-200 hover:shadow-sm'
                  }`}
                  style={{ minHeight: 0 }}
                >
                  {/* Index badge */}
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isTray ? 'bg-amber-200 text-amber-800' : 'bg-purple-100 text-purple-700'
                    }`}
                    style={{ minHeight: 0 }}
                  >
                    {i + 1}
                  </span>

                  {/* Thumbnail */}
                  {thumb ? (
                    <div className="w-14 h-11 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                      <Image src={thumb} alt={section.title} fill sizes="56px" className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-14 h-11 rounded-xl bg-slate-100 shrink-0 flex items-center justify-center text-slate-400 text-xs">
                      —
                    </div>
                  )}

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    {/* English title — de-emphasized */}
                    <p className="font-normal text-slate-400 text-xs leading-snug">{section.title}</p>

                    {lang === 'ko' && koData ? (
                      <>
                        <p className="text-sm font-semibold text-purple-600 mt-0.5 leading-snug">
                          {koData.pronunciation}
                        </p>
                        <p className="text-base font-bold text-rose-700 mt-0.5 leading-snug">
                          {koData.name}
                        </p>
                        {koData.hint && (
                          <p className="text-xs text-amber-700 mt-1 italic leading-snug">{koData.hint}</p>
                        )}
                      </>
                    ) : null}

                    {/* Meta */}
                    <p className="mt-1.5 flex items-center gap-1 flex-wrap">
                      {isTray ? (
                        <>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                            {t.traySetup}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {section.tray?.items.length ?? 0} {t.items}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-semibold">
                            {t.instruments}
                          </span>
                          <span className="text-[11px] text-slate-400">{section.instruments.length}</span>
                        </>
                      )}
                    </p>
                  </div>

                  <span className="text-slate-300 text-lg shrink-0 mt-1 self-center">›</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>

      <footer className="text-center text-[11px] text-slate-300 py-10">
        Dental Instruments Packet &copy; UCSD Pre-Dental Society
      </footer>
    </div>
  );
}
