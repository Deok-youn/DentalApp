'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ETYMOLOGY_DATA, CATEGORY_META, type EtymCategory, type EtymEntry } from '@/data/etymology-data';

const ALL = 'all' as const;
type Filter = EtymCategory | typeof ALL;

const CATEGORY_ORDER: EtymCategory[] = ['shape', 'function', 'material', 'eponym', 'compound', 'prefix'];

export function EtymologyClient() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>(ALL);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === ALL ? ETYMOLOGY_DATA : ETYMOLOGY_DATA.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <header
        className="text-white px-4 pt-10 pb-8"
        style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #4c1d95 60%, #1e3a5f 100%)' }}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/50 text-[11px] tracking-widest uppercase mb-1">Dental Instruments</p>
              <h1 className="text-2xl font-bold tracking-tight leading-tight">Term Etymology</h1>
              {lang === 'ko' && (
                <>
                  <p className="mt-2 text-white font-extrabold text-xl tracking-tight">텀 에티몰로지</p>
                  <p className="text-white/60 text-xs mt-0.5">치과 용어 어원 사전</p>
                </>
              )}
              <p className="mt-2 text-white/50 text-xs leading-relaxed">
                {lang === 'ko'
                  ? '용어의 뿌리를 알면 오타를 줄이고 기억이 오래 남습니다.'
                  : 'Understanding roots reduces typos and deepens memory.'}
              </p>
            </div>
            <LanguageToggle className="shrink-0 mt-1" />
          </div>
        </div>
      </header>

      {/* ── Category filter tabs ─────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-lg mx-auto px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
          <FilterChip
            active={filter === ALL}
            color="#64748b"
            bg="#f8fafc"
            onClick={() => setFilter(ALL)}
            label={lang === 'ko' ? '전체' : 'All'}
          />
          {CATEGORY_ORDER.map((cat) => {
            const m = CATEGORY_META[cat];
            return (
              <FilterChip
                key={cat}
                active={filter === cat}
                color={m.color}
                bg={m.bg}
                onClick={() => setFilter(cat)}
                label={lang === 'ko' ? m.koLabel : m.label}
              />
            );
          })}
        </div>
      </div>

      {/* ── Entry list ──────────────────────────────────────────────── */}
      <main className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mb-4">
          {filtered.length}{lang === 'ko' ? '개 항목' : ' entries'}
        </p>

        {filtered.map((entry) => (
          <EntryCard
            key={entry.term}
            entry={entry}
            lang={lang}
            expanded={expanded === entry.term}
            onToggle={() => setExpanded(expanded === entry.term ? null : entry.term)}
          />
        ))}
      </main>

      {/* ── Footer nav ──────────────────────────────────────────────── */}
      <div
        className="sticky bottom-0 z-20 border-t border-white/40"
        style={{
          background: 'linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(76,29,149,0.92) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-center py-3 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.15)', minHeight: 0 }}
          >
            ← {lang === 'ko' ? '목차로' : 'Table of Contents'}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function FilterChip({
  active, color, bg, onClick, label,
}: {
  active: boolean; color: string; bg: string; onClick: () => void; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
      style={{
        background: active ? color : bg,
        color: active ? '#fff' : color,
        border: `1px solid ${active ? color : '#e2e8f0'}`,
        minHeight: 0,
      }}
    >
      {label}
    </button>
  );
}

function EntryCard({
  entry, lang, expanded, onToggle,
}: {
  entry: EtymEntry; lang: string; expanded: boolean; onToggle: () => void;
}) {
  const meta = CATEGORY_META[entry.category];

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: expanded ? meta.color : '#f1f5f9', background: '#fff' }}
    >
      {/* ── Collapsed header ── */}
      <button
        className="w-full text-left px-4 py-3.5 flex items-start gap-3"
        onClick={onToggle}
        style={{ minHeight: 0 }}
      >
        {/* Category dot */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
          style={{ background: meta.color }}
        />

        <div className="flex-1 min-w-0">
          {/* Term */}
          <p className="font-bold text-base text-slate-800 leading-snug">{entry.term}</p>

          {/* Typo warning */}
          {entry.common_typos && entry.common_typos.length > 0 && (
            <p className="text-[11px] text-rose-500 font-medium mt-0.5">
              ⚠ {lang === 'ko' ? '자주 틀리는 오타: ' : 'Common typo: '}
              {entry.common_typos.join(', ')}
            </p>
          )}

          {/* Origin badge + roots preview */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
              style={{ background: meta.color }}
            >
              {entry.origin}
            </span>
            <span className="text-xs text-slate-400">
              {entry.roots.map((r) => `${r.word}`).join(' + ')}
            </span>
          </div>
        </div>

        <span className="text-slate-300 text-lg shrink-0 mt-1 transition-transform" style={{ transform: expanded ? 'rotate(90deg)' : undefined }}>
          ›
        </span>
      </button>

      {/* ── Expanded detail ── */}
      {expanded && (
        <div
          className="px-4 pb-4 space-y-3 border-t"
          style={{ borderColor: '#f1f5f9', background: meta.bg }}
        >
          {/* Roots breakdown */}
          <div className="pt-3">
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest mb-2">
              {lang === 'ko' ? '어근 분해' : 'Root Breakdown'}
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.roots.map((r, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium border" style={{ borderColor: meta.color + '44', color: meta.color, background: '#fff' }}>
                  <span className="font-bold">{r.word}</span>
                  <span className="text-slate-400 mx-1">({r.lang})</span>
                  <span>{r.meaning}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Original meaning */}
          <div>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest mb-1">
              {lang === 'ko' ? '원래 의미' : 'Original Meaning'}
            </p>
            <p className="text-sm text-slate-700 font-medium">{entry.original_meaning}</p>
          </div>

          {/* Korean explanation */}
          <div className="rounded-xl px-3 py-2.5" style={{ background: '#fff' }}>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest mb-1">
              {lang === 'ko' ? '한글 설명' : 'Korean Explanation'}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{entry.ko_explanation}</p>
          </div>

          {/* Memory tip */}
          <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
            <p className="text-[10px] uppercase font-semibold text-amber-600 tracking-widest mb-1">
              {lang === 'ko' ? '암기 팁' : 'Memory Tip'}
            </p>
            <p className="text-sm text-amber-800 leading-relaxed font-medium">{entry.memory_tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}
