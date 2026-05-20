import type { RawImage } from "./pageParser";
import type { TextBlock } from "./types";

export type PageClass = "tray_setup" | "instrument" | "mixed" | "other";

export function classifyPage(
  blocks: TextBlock[],
  images: RawImage[],
  fullText: string,
  pageWidth: number,
  pageHeight: number,
): PageClass {
  const pageArea = pageWidth * pageHeight;

  // "SEP-UP" 는 원본 PDF의 오타 ("CROWN PREP TRAY SEP-UP")
  const hasTrayTitle = /(?:SET|SEP).?UP|TRAY\s+(?:SET|SEP)/i.test(fullText);
  const hasNumberedList =
    (fullText.match(/\d{1,2}\.\s+[A-Za-z]/g) ?? []).length >= 3;
  const hasInstrumentLabel = /Instrument\s*:/i.test(fullText);

  // 대형 이미지 (페이지 면적의 20% 이상)
  const largeImages = images.filter((img) => {
    const bw = img.displayBbox.x1 - img.displayBbox.x0;
    const bh = img.displayBbox.y1 - img.displayBbox.y0;
    return bw * bh >= pageArea * 0.2;
  });

  // 트레이 다이어그램 전용 페이지 (제목 + 대형 이미지, 목록은 다음 페이지)
  const isTrayDiagramOnly = hasTrayTitle && largeImages.length >= 1 && !hasInstrumentLabel;

  const isTray =
    (hasTrayTitle && hasNumberedList) ||
    (largeImages.length >= 1 && hasNumberedList) ||
    isTrayDiagramOnly;

  const isInstrument =
    hasInstrumentLabel || (images.length >= 2 && !isTray);

  if (isTray && isInstrument) return "mixed";
  if (isTray) return "tray_setup";
  if (isInstrument) return "instrument";
  if (images.length > 0) return "instrument";
  return "other";
}
