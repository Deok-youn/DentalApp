/**
 * instrument 페이지: 2-컬럼 레이아웃을 고려한 기구 이미지-텍스트 매칭
 *
 * PDF 페이지는 두 칸(좌/우) 레이아웃으로, 각 칸에 기구 이미지와 설명 텍스트가 있다.
 * pageWidth/2 를 기준으로 좌/우 항목을 분리하여 각 이미지에 맞는 텍스트를 추출한다.
 */
import type { PdfTextItem } from "./extractPageText";
import type { RawImage } from "./pageParser";

export type InstrumentMatch = {
  image: RawImage;
  name: string;
  pairedName?: string;
  instrumentFunction?: string;
  characteristics?: string;
  description: string;
};

const LINE_Y_TOL = 3;

/** PdfTextItem 배열을 y-줄 기준으로 그룹화 후 텍스트 문자열로 변환 */
function buildTextFromItems(items: PdfTextItem[]): string {
  if (items.length === 0) return "";

  const lines: Array<{ y: number; parts: Array<{ x: number; str: string }> }> =
    [];
  for (const item of items) {
    const str = item.str.replace(/\s+/g, " ").trim();
    if (!str) continue;
    const y = item.transform[5]!;
    const x = item.transform[4]!;
    let line = lines.find((l) => Math.abs(l.y - y) <= LINE_Y_TOL);
    if (!line) {
      line = { y, parts: [] };
      lines.push(line);
    }
    line.parts.push({ x, str });
  }
  lines.sort((a, b) => b.y - a.y); // PDF y↑ → 위→아래 순
  return lines
    .map((line) => {
      line.parts.sort((a, b) => a.x - b.x);
      return line.parts.map((p) => p.str).join(" ").trim();
    })
    .join("\n")
    .trim();
}

function extractName(text: string): string {
  const m = text.match(/Instrument\s*:\s*([^\n]+)/i);
  if (!m?.[1]) return "";
  // 같은 줄에 두 번째 "Instrument:" 가 오면 그 앞까지만 취함
  const raw = m[1]!.replace(/\s*Instrument\s*:.*$/i, "").replace(/\s{2,}/g, " ").trim();
  return raw;
}

function cleanFieldValue(raw: string): string {
  return raw
    .replace(/\b(Instrument|Function|Characteristics)\s*:/gi, "") // 오염된 레이블 제거
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractFunction(text: string): string | undefined {
  const m = text.match(
    /Function\s*:\s*([\s\S]*?)(?=Characteristics\s*:|Instrument\s*:|$)/i,
  );
  const val = cleanFieldValue(m?.[1] ?? "");
  return val || undefined;
}

function extractCharacteristics(text: string): string | undefined {
  const m = text.match(
    /Characteristics\s*:\s*([\s\S]*?)(?=Instrument\s*:|Function\s*:|$)/i,
  );
  const val = cleanFieldValue(m?.[1] ?? "");
  return val || undefined;
}

/**
 * 각 이미지에 대해 같은 컬럼에 있는 하위 텍스트를 추출하여 기구 정보를 반환한다.
 *
 * @param images  페이지에서 추출된 이미지 목록
 * @param items   페이지 전체 PdfTextItem 목록
 * @param pageWidth  페이지 너비 (pt)
 */
export function matchImagesToText(
  images: RawImage[],
  items: PdfTextItem[],
  pageWidth: number,
): InstrumentMatch[] {
  const midX = pageWidth / 2;

  // 이미지를 위→아래 순 (y1 내림차순)으로 정렬
  const sorted = [...images].sort(
    (a, b) => b.displayBbox.y1 - a.displayBbox.y1,
  );

  return sorted.map((image, idx) => {
    const bbox = image.displayBbox;
    const imgMidX = (bbox.x0 + bbox.x1) / 2;
    const isLeft = imgMidX < midX;

    // 같은 컬럼의 다음 이미지 → 텍스트 수집 하한 (stopY)
    const nextSameCol = sorted
      .slice(idx + 1)
      .find((img) => ((img.displayBbox.x0 + img.displayBbox.x1) / 2 < midX) === isLeft);
    // stopY: 다음 이미지의 최상단보다 약간 위
    const stopY = nextSameCol ? nextSameCol.displayBbox.y1 - 4 : 0;

    // 컬럼 x 범위 - 엄격한 중간선 기준 (허용치 없음)
    const colX0 = isLeft ? 0 : midX;
    const colX1 = isLeft ? midX : pageWidth;

    // 이미지 하단(y0)에서 stopY 사이의 같은 컬럼 텍스트 아이템 수집
    const descItems = items.filter((item) => {
      const x = item.transform[4]!;
      const y = item.transform[5]!;
      if (!item.str.trim()) return false;
      if (y > bbox.y0 + 4) return false; // 이미지 하단 기준 위는 제외
      if (y < stopY) return false; // 다음 이미지 영역 제외
      if (x < colX0 || x > colX1) return false;
      return true;
    });

    const description = buildTextFromItems(descItems);
    const name = extractName(description);
    const instrumentFunction = extractFunction(description);
    const characteristics = extractCharacteristics(description);

    return {
      image,
      name: name || "(unknown)",
      instrumentFunction,
      characteristics,
      description,
    };
  });
}
