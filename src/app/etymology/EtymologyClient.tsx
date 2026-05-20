'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ETYMOLOGY_DATA, CATEGORY_META, type EtymCategory, type EtymEntry } from '@/data/etymology-data';
import { ETYMOLOGY_ILLUSTRATIONS } from '@/data/etymology-illustrations';

const ALL = 'all' as const;
type Filter = EtymCategory | typeof ALL;

const CATEGORY_ORDER: EtymCategory[] = ['shape', 'function', 'material', 'eponym', 'compound', 'prefix'];

export function EtymologyClient() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const highlightTerm = searchParams.get('term');

  const [filter, setFilter] = useState<Filter>(ALL);
  const [expanded, setExpanded] = useState<string | null>(null);
  const entryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Deep-link: auto-expand and scroll to highlighted term
  useEffect(() => {
    if (!highlightTerm) return;
    setFilter(ALL);
    setExpanded(highlightTerm);
    // Small delay so the list renders before scroll
    const timer = setTimeout(() => {
      const el = entryRefs.current[highlightTerm];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
    return () => clearTimeout(timer);
  }, [highlightTerm]);

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
              <h1 className="text-2xl font-bold tracking-tight leading-tight">용어 암기 팁</h1>
              {lang === 'ko' && (
                <>
                  <p className="mt-2 text-white font-extrabold text-xl tracking-tight">용어 암기 팁</p>
                  <p className="text-white/60 text-xs mt-0.5">어원을 알면 더 쉽게 외워집니다</p>
                </>
              )}
              <p className="mt-2 text-white/50 text-[11px] leading-relaxed">
                {lang === 'ko'
                  ? '단어의 뿌리를 알면 오타가 줄고 오래 기억됩니다 ✨'
                  : 'Knowing roots reduces typos and deepens memory.'}
              </p>
            </div>
            <LanguageToggle className="shrink-0 mt-1" />
          </div>

          {/* Stats row */}
          <div className="mt-5 flex gap-3 flex-wrap">
            {CATEGORY_ORDER.map((cat) => {
              const m = CATEGORY_META[cat];
              const count = ETYMOLOGY_DATA.filter((e) => e.category === cat).length;
              return (
                <div key={cat} className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                  <span className="text-white/70 text-[10px]">{lang === 'ko' ? m.koLabel : m.label}</span>
                  <span className="text-white/50 text-[10px]">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Filter tabs ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-lg mx-auto px-3 py-2 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <FilterChip active={filter === ALL} color="#64748b" bg="#f8fafc" onClick={() => setFilter(ALL)}
            label={lang === 'ko' ? '전체' : 'All'} />
          {CATEGORY_ORDER.map((cat) => {
            const m = CATEGORY_META[cat];
            return (
              <FilterChip key={cat} active={filter === cat} color={m.color} bg={m.bg}
                onClick={() => setFilter(cat)} label={lang === 'ko' ? m.koLabel : m.label} />
            );
          })}
        </div>
      </div>

      {/* ── Tip banner ──────────────────────────────────────────────── */}
          {lang === 'ko' && (
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="rounded-2xl px-4 py-3 flex gap-2.5 items-start"
            style={{ background: 'linear-gradient(135deg, #fdf2f8, #f5f3ff)', border: '1px solid #fce7f3' }}>
            <span className="text-xl shrink-0">💡</span>
            <p className="text-xs text-purple-800 leading-relaxed">
              <strong>암기 노하우:</strong> 기구 이름 안에 힌트가 숨어 있어요!
              어근을 알면 처음 보는 단어도 유추할 수 있고, 오타도 자연스럽게 줄어듭니다.
              각 카드를 탭해서 어원과 쉬운 연상법을 확인해보세요 ✨
            </p>
          </div>
        </div>
      )}

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
            isHighlighted={highlightTerm === entry.term}
            onToggle={() => setExpanded(expanded === entry.term ? null : entry.term)}
            ref={(el) => { entryRefs.current[entry.term] = el; }}
          />
        ))}
      </main>

      {/* ── Footer nav ──────────────────────────────────────────────── */}
      <div
        className="sticky bottom-0 z-20 border-t border-white/20"
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

// ── FilterChip ───────────────────────────────────────────────────────────────

function FilterChip({ active, color, bg, onClick, label }: {
  active: boolean; color: string; bg: string; onClick: () => void; label: string;
}) {
  return (
    <button onClick={onClick} className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
      style={{ background: active ? color : bg, color: active ? '#fff' : color, border: `1px solid ${active ? color : '#e2e8f0'}`, minHeight: 0 }}>
      {label}
    </button>
  );
}

// ── EntryCard ────────────────────────────────────────────────────────────────

import React from 'react';

const EntryCard = React.forwardRef<HTMLDivElement, {
  entry: EtymEntry; lang: string; expanded: boolean; isHighlighted: boolean; onToggle: () => void;
}>(function EntryCard({ entry, lang, expanded, isHighlighted, onToggle }, ref) {
  const meta = CATEGORY_META[entry.category];
  const illus = ETYMOLOGY_ILLUSTRATIONS[entry.term];

  return (
    <div
      ref={ref}
      className="rounded-2xl border overflow-hidden transition-all"
      style={{
        borderColor: expanded ? meta.color : isHighlighted ? meta.color + '88' : '#f1f5f9',
        background: '#fff',
        boxShadow: isHighlighted && !expanded ? `0 0 0 2px ${meta.color}44` : undefined,
      }}
    >
      {/* ── Collapsed header ─── */}
      <button className="w-full text-left px-4 py-3.5 flex items-start gap-3" onClick={onToggle} style={{ minHeight: 0 }}>
        {/* Emoji or color dot */}
        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: meta.bg }}>
          {illus?.emoji ?? '🔤'}
        </span>

        <div className="flex-1 min-w-0">
              {/* English term */}
              <p className="font-normal text-slate-400 text-xs leading-snug">{entry.term}</p>
              {/* Korean pronunciation — primary */}
              {illus?.termKo && (
                <p className="text-lg font-extrabold text-purple-700 leading-snug tracking-tight mt-0.5">
                  {illus.termKo}
                </p>
              )}

          {/* Typo warning */}
          {entry.common_typos && entry.common_typos.length > 0 && (
            <p className="text-[11px] text-rose-500 font-semibold mt-0.5">
              ⚠ 오타 주의: {entry.common_typos.join(', ')}
            </p>
          )}

          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
              style={{ background: meta.color }}>
              {lang === 'ko' ? meta.koLabel : meta.label}
            </span>
            <span className="text-xs text-slate-400">
              {entry.roots.map((r) => r.word).join(' + ')}
            </span>
          </div>
        </div>

        <span className="text-slate-300 text-lg shrink-0 mt-1 transition-transform duration-200"
          style={{ transform: expanded ? 'rotate(90deg)' : undefined }}>›</span>
      </button>

      {/* ── Expanded detail ─── */}
      {expanded && (
        <div className="border-t" style={{ borderColor: '#f1f5f9' }}>

          {/* Illustration banner */}
          {illus && (
            <div className="px-4 pt-4">
              <div className="rounded-2xl overflow-hidden" style={{ background: illus.accentColor + '12', border: `1px solid ${illus.accentColor}30` }}>
                {/* Scene header */}
                <div className="flex items-center gap-3 px-4 py-3" style={{ background: illus.accentColor + '20' }}>
                  <span className="text-4xl">{illus.emoji}</span>
                  {illus.altEmoji && <span className="text-2xl opacity-70">{illus.altEmoji}</span>}
                  <p className="text-sm font-semibold leading-snug" style={{ color: illus.accentColor }}>
                    {illus.koScene}
                  </p>
                </div>
                {/* Female-friendly analogy */}
                <div className="px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: illus.accentColor }}>
                    💡 쉬운 연상법
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">{illus.femaleAnalogy}</p>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 pb-4 space-y-3 mt-3">
            {/* Roots */}
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest mb-2">
                {lang === 'ko' ? '어근 분해' : 'Root Breakdown'}
              </p>
              <div className="flex flex-wrap gap-2">
                {entry.roots.map((r, i) => (
                  <span key={i} className="px-2.5 py-1.5 rounded-xl text-xs border"
                    style={{ borderColor: meta.color + '44', color: meta.color, background: meta.bg }}>
                    <span className="font-bold">{r.word}</span>
                    <span className="text-slate-500 mx-1">({r.lang})</span>
                    <span className="text-slate-600">{r.meaning}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Original meaning */}
            <div className="rounded-xl px-3 py-2.5" style={{ background: '#f8fafc' }}>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest mb-1">
                {lang === 'ko' ? '원래 의미' : 'Original Meaning'}
              </p>
              <p className="text-sm text-slate-700 font-semibold">{entry.original_meaning}</p>
            </div>

            {/* Ko explanation */}
            <div className="rounded-xl px-3 py-2.5" style={{ background: '#faf5ff', border: '1px solid #ede9fe' }}>
              <p className="text-[10px] uppercase font-semibold tracking-widest mb-1" style={{ color: '#7c3aed' }}>
                {lang === 'ko' ? '한글 설명' : 'Korean Explanation'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{entry.ko_explanation}</p>
            </div>

            {/* Memory tip */}
            <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)' }}>
              <p className="text-[10px] uppercase font-semibold text-amber-600 tracking-widest mb-1">
                {lang === 'ko' ? '✏️ 암기 노하우' : '✏️ Memory Tip'}
              </p>
              <p className="text-sm text-amber-900 leading-relaxed font-medium">{entry.memory_tip}</p>
            </div>

            {/* Typo avoidance card */}
            {entry.common_typos && entry.common_typos.length > 0 && (
              <div className="rounded-xl px-3 py-2.5" style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
                <p className="text-[10px] uppercase font-semibold text-rose-500 tracking-widest mb-1.5">
                  ⚠ 자주 틀리는 오타
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.common_typos.map((typo) => (
                    <span key={typo} className="px-2.5 py-1 rounded-lg text-sm font-mono line-through text-rose-400 bg-white border border-rose-100">
                      {typo}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg text-sm font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                    ✓ {entry.term.split(' ')[0]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
