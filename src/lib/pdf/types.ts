// ─────────────────────────────────────────────
//  DentalApp PDF Extraction — v3 Data Model
// ─────────────────────────────────────────────

/** PDF 좌표계: 원점=왼쪽아래, y↑ */
export type BBox = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
};

export type TextBlock = {
  text: string;
  bbox: BBox;
};

// ── 의료기구 개별 항목 ───────────────────────────
/** 한 장의 기구 사진 + 설명 텍스트 */
export type InstrumentEntry = {
  id: string;
  pageNumber: number;
  entryIndex: number;
  /** 저장된 PNG 상대 경로 (출력 폴더 기준) */
  imagePath: string;
  widthPx: number;
  heightPx: number;
  /** "Instrument: X" 에서 추출한 기구 이름 */
  name: string;
  /** 함께 소개된 두 번째 기구 (2-column 레이아웃) */
  pairedName?: string;
  /** "Function: ..." */
  function?: string;
  /** "Characteristics: ..." */
  characteristics?: string;
  /** 이미지 아래쪽 텍스트 블록 원문 */
  description: string;
};

// ── 트레이 셋업 ─────────────────────────────────
/** 번호·이름 쌍 */
export type TrayItem = {
  number: number;
  name: string;
};

/**
 * 트레이 셋업 페이지:
 * - diagram: 번호가 합성된 PNG
 * - items: 번호→기구 이름 목록
 */
export type TraySetup = {
  id: string;
  pageNumber: number;
  title: string;
  /** 번호 라벨이 합성된 다이어그램 PNG */
  imagePath: string;
  widthPx: number;
  heightPx: number;
  /** 번호→기구명 구조화 목록 */
  items: TrayItem[];
  /** 목록 원문 (검수·2단계 fallback) */
  legendText: string;
  matchConfidence: "high" | "medium" | "low";
};

// ── 페이지 ──────────────────────────────────────
export type PageType = "tray_setup" | "instrument" | "mixed" | "other";

export type PageResult = {
  pageNumber: number;
  pageType: PageType;
  pageWidth: number;
  pageHeight: number;
  /** 기구 설명 항목 (instrument / mixed 페이지) */
  instruments: InstrumentEntry[];
  /** 트레이 셋업 (tray_setup / mixed 페이지) */
  traySetup?: TraySetup;
  fullPageText: string;
};

// ── 전체 추출 결과 ──────────────────────────────
export type ExtractionResult = {
  version: 3;
  sourceFile: string;
  sourceBaseName: string;
  extractedAt: string;
  pageCount: number;
  totalInstruments: number;
  totalTraySetups: number;
  options: ExtractionOptions;
  pages: PageResult[];
};

// ── 옵션 ────────────────────────────────────────
export type ExtractionOptions = {
  /** 출력 이미지 해상도 배율 (PDF pt × scale = 픽셀) */
  renderScale: number;
  /** 이 크기 미만 내장 이미지는 장식으로 간주하고 제외 */
  minImageWidth: number;
  minImageHeight: number;
  /** 이미지 아래 설명 텍스트 검색 허용 범위 (PDF pt) */
  textSearchGap: number;
};

export const DEFAULT_OPTIONS: ExtractionOptions = {
  renderScale: 2,
  minImageWidth: 80,
  minImageHeight: 60,
  textSearchGap: 60,
};
