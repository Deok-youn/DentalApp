import catalogJson from '@/data/catalog.json';
import type {
  ExtractionResult,
  InstrumentEntry,
  TraySetup,
  PageResult,
} from './pdf/types';

export type { InstrumentEntry, TraySetup, PageResult };

// ─── Catalog ─────────────────────────────────────────────────────────────────

export function getCatalog(): ExtractionResult {
  return catalogJson as unknown as ExtractionResult;
}

// ─── PDF TOC 기반 섹션 정의 ────────────────────────────────────────────────

/**
 * PDF 원본 목차와 동일한 순서의 섹션 정의.
 * type 'tray'    → 트레이 셋업 페이지 (다이어그램 + 번호 목록 + 해당 페이지 기구)
 * type 'instrs'  → 기구 소개 페이지 묶음
 */
type SectionDef = {
  id: string;
  title: string;
  type: 'tray' | 'instrs';
  /** 이 섹션에 포함할 PDF 페이지 번호 목록 */
  pages: number[];
  /** 트레이 다이어그램이 있는 페이지 (type='tray' 일 때) */
  trayPage?: number;
};

const SECTION_DEFS: SectionDef[] = [
  {
    id: 'basic-instruments',
    title: 'BASIC DENTAL INSTRUMENTS & SUPPLIES',
    type: 'instrs',
    pages: [3, 4, 5, 6],
  },
  {
    id: 'basic-tray',
    title: 'BASIC TRAY SET-UP',
    type: 'tray',
    pages: [4],
    trayPage: 4,
  },
  {
    id: 'prophy-srp-instruments',
    title: 'INSTRUMENTS & SUPPLIES FOR PROPHY AND SRP',
    type: 'instrs',
    pages: [5, 6, 7],
  },
  {
    id: 'prophylaxis-tray',
    title: 'PROPHYLAXIS TRAY SET-UP',
    type: 'tray',
    pages: [8],
    trayPage: 8,
  },
  {
    id: 'srp-tray',
    title: 'SRP (SCALING & ROOT PLANING) TRAY SET-UP',
    type: 'tray',
    pages: [9],
    trayPage: 9,
  },
  {
    id: 'operative-instruments',
    title: 'OPERATIVE INSTRUMENTS & SUPPLIES',
    type: 'instrs',
    pages: [10, 11, 12, 13, 14, 18, 19, 22, 23, 24],
  },
  {
    id: 'amalgam-tray',
    title: 'AMALGAM TRAY SET-UP',
    type: 'tray',
    pages: [15],
    trayPage: 15,
  },
  {
    id: 'rubber-dam-tray',
    title: 'RUBBER DAM TRAY SET-UP',
    type: 'tray',
    pages: [17],
    trayPage: 17,
  },
  {
    id: 'composite-tray',
    title: 'COMPOSITE TRAY SET-UP',
    type: 'tray',
    pages: [20],
    trayPage: 20,
  },
  {
    id: 'xray-instruments',
    title: 'X-RAY INSTRUMENTS',
    type: 'instrs',
    pages: [25],
  },
  {
    id: 'surgical-instruments',
    title: 'UNIVERSAL SURGICAL INSTRUMENTS',
    type: 'instrs',
    pages: [26, 27, 29, 30, 31],
  },
  {
    id: 'suture-tray',
    title: 'SUTURE TRAY SET-UP',
    type: 'tray',
    pages: [27],
    trayPage: 27,
  },
  {
    id: 'suture-removal-tray',
    title: 'SUTURE REMOVAL TRAY SET-UP',
    type: 'tray',
    pages: [28],
    trayPage: 28,
  },
  {
    id: 'extraction-instruments',
    title: 'EXTRACTION INSTRUMENTS',
    type: 'instrs',
    pages: [29, 30, 31],
  },
  {
    id: 'extraction-tray',
    title: 'EXTRACTION TRAY SET-UP',
    type: 'tray',
    pages: [32],
    trayPage: 32,
  },
  {
    id: 'burs',
    title: 'BURS',
    type: 'instrs',
    pages: [34, 35, 36],
  },
  {
    id: 'pulpotomy-tray',
    title: 'PULPOTOMY / OPEN & MED. TRAY SET-UP',
    type: 'tray',
    pages: [37],
    trayPage: 37,
  },
  {
    id: 'root-canal-tray',
    title: 'ROOT CANAL TRAY SET-UP',
    type: 'tray',
    pages: [39],
    trayPage: 39,
  },
  {
    id: 'dry-socket-tray',
    title: 'DRY SOCKET TRAY SET-UP',
    type: 'tray',
    pages: [41],
    trayPage: 41,
  },
  {
    id: 'full-denture-tray',
    title: 'FULL DENTURE ALGINATE IMPRESSION TRAY SET-UP',
    type: 'tray',
    pages: [42],
    trayPage: 42,
  },
  {
    id: 'crown-prep-tray',
    title: 'CROWN PREP TRAY SET-UP',
    type: 'tray',
    pages: [43],
    trayPage: 43,
  },
];

// ─── Section 런타임 타입 ──────────────────────────────────────────────────────

export type Section = {
  id: string;
  index: number;
  title: string;
  type: 'tray' | 'instrs';
  tray: TraySetup | null;
  instruments: InstrumentEntry[];
};

// ─── 섹션 빌드 ───────────────────────────────────────────────────────────────

function buildPageMap(): Map<number, PageResult> {
  const catalog = getCatalog();
  const map = new Map<number, PageResult>();
  for (const page of catalog.pages) {
    map.set(page.pageNumber, page);
  }
  return map;
}

let _sections: Section[] | null = null;

export function getSections(): Section[] {
  if (_sections) return _sections;

  const pageMap = buildPageMap();

  _sections = SECTION_DEFS.map((def, idx) => {
    // 트레이 셋업
    const tray =
      def.trayPage != null
        ? (pageMap.get(def.trayPage)?.traySetup ?? null)
        : null;

    // 기구 항목 수집: instrs 섹션만 수집, tray 섹션은 빈 배열 (기구는 인접 instrs 섹션에 포함됨)
    const instruments: InstrumentEntry[] = [];
    if (def.type === 'instrs') {
      for (const pn of def.pages) {
        const page = pageMap.get(pn);
        if (page) {
          // "(unknown)" 등 이름/설명 없는 오탐 이미지 제외
          const valid = page.instruments.filter(
            (i) => i.name && !i.name.toLowerCase().includes('unknown') && i.name.trim() !== '',
          );
          instruments.push(...valid);
        }
      }
    }

    return {
      id: def.id,
      index: idx,
      title: def.title,
      type: def.type,
      tray: tray && tray.imagePath ? tray : null,
      instruments,
    };
  }).filter((s) => s.tray !== null || s.instruments.length > 0);

  return _sections;
}

export function getSectionById(id: string): Section | undefined {
  return getSections().find((s) => s.id === id);
}

// ─── 헬퍼 ────────────────────────────────────────────────────────────────────

/** Function 텍스트 정리 */
export function formatFunction(entry: InstrumentEntry): string {
  const fn = entry.function;
  if (fn) return fn.trim();
  if (entry.description) {
    const m = entry.description.match(/Function\s*:\s*([^F]+)/i);
    if (m) return m[1]!.replace(/\n/g, ' ').trim();
  }
  return '';
}

/** 이미지 공개 URL */
export function imgUrl(relativePath: string): string {
  return `/catalog/${relativePath}`;
}
