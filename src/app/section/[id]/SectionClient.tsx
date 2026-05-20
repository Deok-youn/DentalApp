'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import {
  lookupInstrumentKo,
  lookupSectionKo,
  UI_STRINGS,
} from '@/lib/i18n/ko-data';
import { lookupEtymologyForInstrument } from '@/data/etymology-data';
import { imgUrl, formatFunction } from '@/lib/catalog';
import type { Section, InstrumentEntry, TraySetup } from '@/lib/catalog';

type Props = {
  section: Section;
  prev: Section | null;
  next: Section | null;
};

export function SectionClient({ section, prev, next }: Props) {
  const { lang } = useLanguage();
  const t = UI_STRINGS[lang];
  const koSection = lookupSectionKo(section.id);
  const isTray = section.type === 'tray';

  const headerGradient = isTray
    ? 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #7c2d12 100%)'
    : 'linear-gradient(135deg, #4c1d95 0%, #7c2d5e 60%, #4c1d95 100%)';

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)' }}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="text-white px-4 pt-6 pb-5" style={{ background: headerGradient }}>
        <div className="max-w-lg mx-auto">
          {/* Breadcrumb + toggle */}
          <div className="flex items-center justify-between mb-3">
            <nav className="text-white/50 text-xs flex items-center gap-1 min-w-0">
              <Link href="/" className="hover:text-white transition-colors shrink-0" style={{ minHeight: 0 }}>
                {t.tableOfContents}
              </Link>
              <span className="shrink-0">›</span>
              <span className="text-white/70 truncate">{section.title}</span>
            </nav>
            <LanguageToggle />
          </div>

          {/* Badge + title area */}
          <div className="flex items-start gap-2">
            <span
              className={`shrink-0 mt-0.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                isTray ? 'bg-amber-300 text-amber-900' : 'bg-purple-300 text-purple-900'
              }`}
              style={{ minHeight: 0 }}
            >
              {isTray ? t.traySetup : t.instruments}
            </span>
            <div className="min-w-0">
              {/* English — de-emphasized */}
              <h1 className="text-xs font-normal text-white/60 leading-snug">{section.title}</h1>

              {lang === 'ko' && koSection ? (
                <>
                  {/* pronunciation — primary */}
                  <p className="text-xl font-extrabold text-white mt-1 leading-snug tracking-tight">
                    {koSection.pronunciation}
                  </p>
                  {/* Korean name — secondary */}
                  <p className="text-sm font-medium text-white/70 mt-0.5 leading-snug">{koSection.name}</p>
                  {koSection.hint && (
                    <p className="text-xs text-amber-200 mt-1.5 italic leading-relaxed">{koSection.hint}</p>
                  )}
                </>
              ) : (
                <p className="text-lg font-bold text-white mt-0.5 leading-tight">{section.title}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* ── TRAY SETUP (diagram + items only, NO instruments) ─── */}
        {section.tray && <TrayBlock tray={section.tray} lang={lang} t={t} sectionId={section.id} />}

        {/* ── INSTRUMENTS (instrs sections only) ──────────────────── */}
        {section.type === 'instrs' && section.instruments.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {t.instruments}
              <span className="ml-2 font-normal text-slate-300 normal-case">
                ({section.instruments.length})
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.instruments.map((inst) => (
                <InstrumentCard key={inst.id} instrument={inst} lang={lang} t={t} sectionId={section.id} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Sticky bottom nav ──────────────────────────────────────── */}
      <footer
        className="fixed bottom-0 left-0 right-0 border-t z-10"
        style={{ background: 'rgba(255,255,255,0.97)', borderColor: '#f9d0e0', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {prev ? (
            <Link
              href={`/section/${prev.id}`}
              className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-900 font-medium max-w-[140px]"
              style={{ minHeight: 0 }}
            >
              ←{' '}
              <span className="truncate hidden sm:inline text-xs">{prev.title}</span>
              <span className="sm:hidden">{t.prev}</span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-rose-700 font-medium transition-colors"
            style={{ minHeight: 0 }}
          >
            ☰ {t.back}
          </Link>

          {next ? (
            <Link
              href={`/section/${next.id}`}
              className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-900 font-medium max-w-[140px]"
              style={{ minHeight: 0 }}
            >
              <span className="truncate hidden sm:inline text-xs">{next.title}</span>
              <span className="sm:hidden">{t.next}</span>
              {' →'}
            </Link>
          ) : (
            <span />
          )}
        </div>
      </footer>
    </div>
  );
}

// ─── Tray Block ────────────────────────────────────────────────────────────

type UiT = (typeof UI_STRINGS)[keyof typeof UI_STRINGS];

function TrayBlock({ tray, lang, t, sectionId }: { tray: TraySetup; lang: string; t: UiT; sectionId: string }) {
  return (
    <div className="space-y-5">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{t.trayDiagram}</p>

      {/* Tray image */}
      <div
        className="rounded-2xl overflow-hidden border-2 shadow-sm"
        style={{ borderColor: '#fcd6a4', background: '#fffbf5' }}
      >
        <div className="relative w-full" style={{ aspectRatio: `${tray.widthPx}/${tray.heightPx}` }}>
          <Image
            src={imgUrl(tray.imagePath)}
            alt={tray.title}
            fill
            sizes="(max-width: 512px) 100vw, 512px"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Setup component list */}
      {tray.items.length > 0 && (
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: '#fce7f3' }}>
          {/* List header */}
          <div className="px-4 py-3 border-b" style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
            <p className="text-sm font-semibold text-amber-800">
              {t.setupComponents}
              <span className="ml-2 text-amber-600 font-normal text-xs">
                ({tray.items.length} {t.items})
              </span>
            </p>
          </div>

          {/* Items */}
          <div>
            {tray.items.map((item, idx) => {
              const ko = lang === 'ko' ? lookupInstrumentKo(item.name) : null;
              const etymEntries = lookupEtymologyForInstrument(item.name);
              return (
                <div
                  key={item.number}
                  className="flex items-start gap-3 px-4 py-3"
                  style={{
                    borderBottom: idx < tray.items.length - 1 ? '1px solid #fdf2f8' : undefined,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#d97706', minHeight: 0 }}
                  >
                    {item.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    {/* English name */}
                    <span className="text-xs text-slate-400 font-normal">{item.name}</span>
                    {/* 암기팁 button */}
                    {etymEntries.length > 0 && (
                      <Link
                        href={`/etymology?term=${encodeURIComponent(etymEntries[0].term)}&from=${encodeURIComponent('/section/' + sectionId)}`}
                        className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-full text-white text-[10px] font-bold active:opacity-70"
                        style={{ background: '#6366f1', minHeight: 0, cursor: 'pointer', boxShadow: '0 1px 4px rgba(99,102,241,0.4)' }}
                      >
                        📖 {lang === 'ko' ? '암기팁 보기 →' : 'Tip →'}
                      </Link>
                    )}
                    {/* Korean pronunciation — primary */}
                    {ko && (
                      <p className="text-base font-bold text-purple-700 mt-0.5 tracking-tight">{ko.pronunciation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Instrument Card ────────────────────────────────────────────────────────

function InstrumentCard({
  instrument,
  lang,
  t,
  sectionId,
}: {
  instrument: InstrumentEntry;
  lang: string;
  t: UiT;
  sectionId: string;
}) {
  const fnEn = formatFunction(instrument);
  const charsEn = instrument.characteristics;
  const ko = lang === 'ko' ? lookupInstrumentKo(instrument.name) : null;
  const etymEntries = lookupEtymologyForInstrument(instrument.name);
  const etymUrl = etymEntries.length > 0
    ? `/etymology?term=${encodeURIComponent(etymEntries[0].term)}&from=${encodeURIComponent('/section/' + sectionId)}`
    : null;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ border: '1px solid #fce7f3' }}
    >
      {/* Image */}
      <div className="relative w-full bg-slate-50" style={{ height: '160px' }}>
        <Image
          src={imgUrl(instrument.imagePath)}
          alt={instrument.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-contain p-2"
          unoptimized
        />
      </div>

      <div className="p-4 space-y-3">
        {/* Name block */}
        <div>
          {/* English name */}
          <h3 className="font-normal text-slate-400 text-xs leading-snug">{instrument.name}</h3>
          {/* 암기팁 button — prominent, below English name */}
          {etymUrl && (
            <Link
              href={etymUrl}
              className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 rounded-full text-white text-xs font-bold active:opacity-70"
              style={{ background: '#6366f1', minHeight: 0, cursor: 'pointer', boxShadow: '0 2px 6px rgba(99,102,241,0.4)' }}
            >
              📖 {lang === 'ko' ? '암기팁 보기 →' : 'Memory Tip →'}
              {etymEntries.length > 1 && <span className="opacity-70 text-[10px]">×{etymEntries.length}</span>}
            </Link>
          )}
          {ko && (
            <div className="mt-1.5 space-y-0.5">
              {/* Korean pronunciation — PRIMARY */}
              <p className="text-xl font-extrabold text-purple-700 leading-snug tracking-tight">{ko.pronunciation}</p>
              {/* Korean name — SECONDARY */}
              <p className="text-sm font-medium leading-snug" style={{ color: '#9f1239' }}>
                {ko.name}
              </p>
            </div>
          )}
        </div>

        {/* Function */}
        {(fnEn || ko?.function) && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#f9a8d4' }}>
              {t.function}
            </p>
            {fnEn && <p className="text-xs text-slate-400 leading-relaxed">{fnEn}</p>}
            {ko?.function && (
              <p
                className="text-sm leading-relaxed mt-1 pl-2.5"
                style={{ color: '#4c1d95', borderLeft: '2px solid #ddd6fe' }}
              >
                {ko.function}
              </p>
            )}
          </div>
        )}

        {/* Characteristics */}
        {(charsEn || ko?.characteristics) && (
          <div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wide mb-1">
              {t.characteristics}
            </p>
            {charsEn && <p className="text-xs text-slate-400 leading-relaxed">{charsEn}</p>}
            {ko?.characteristics && (
              <p
                className="text-sm text-slate-600 leading-relaxed mt-1 pl-2.5"
                style={{ borderLeft: '2px solid #e2e8f0' }}
              >
                {ko.characteristics}
              </p>
            )}
          </div>
        )}

        {/* Memory hint (Korean only) */}
        {ko?.hint && (
          <div className="rounded-xl px-3 py-2.5" style={{ background: '#fff1f5', border: '1px solid #fecdd3' }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#fb7185' }}>
              {t.memoryHint}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#9f1239' }}>
              {ko.hint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
