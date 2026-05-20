import { mergeBBoxes } from "./bbox";
import type { BBox, TextBlock } from "./types";
import type { PDFPageProxy } from "pdfjs-dist/legacy/build/pdf.mjs";

export type PdfTextItem = {
  str: string;
  transform: number[];
  width: number;
  height: number;
};

export function isTextItem(item: unknown): item is PdfTextItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "str" in item &&
    typeof (item as PdfTextItem).str === "string" &&
    "transform" in item
  );
}

export function itemBBox(item: PdfTextItem): BBox {
  const [sx, , , sy, x, y] = item.transform;
  const w = item.width || Math.abs(sx ?? 1) * Math.max(item.str.length, 1);
  const h = item.height || Math.abs(sy ?? 12) || 12;
  return {
    x0: Math.min(x, x + w),
    y0: Math.min(y, y + h),
    x1: Math.max(x, x + w),
    y1: Math.max(y, y + h),
  };
}

const LINE_Y_TOL = 3;

export async function extractPageText(page: PDFPageProxy): Promise<{
  items: PdfTextItem[];
  blocks: TextBlock[];
  fullText: string;
}> {
  const content = await page.getTextContent();
  const items: PdfTextItem[] = [];
  for (const raw of content.items) {
    if (isTextItem(raw)) items.push(raw);
  }

  // ── 같은 y ≒ 같은 줄로 묶기 ─────────────────────
  const lines: Array<{ y: number; parts: Array<{ x: number; str: string }> }> = [];
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

  const lineBlocks: TextBlock[] = lines.map((line) => {
    line.parts.sort((a, b) => a.x - b.x);
    const text = line.parts.map((p) => p.str).join(" ").trim();
    const matching = items.filter(
      (it) => Math.abs(it.transform[5]! - line.y) <= LINE_Y_TOL,
    );
    let bbox = itemBBox(matching[0]!);
    for (const it of matching.slice(1)) bbox = mergeBBoxes(bbox, itemBBox(it));
    return { text, bbox };
  });

  // ── 인접 줄을 문단으로 병합 ─────────────────────
  const PARA_GAP = 16;
  const blocks: TextBlock[] = [];
  for (const lb of lineBlocks) {
    const prev = blocks[blocks.length - 1];
    const yGap = prev ? prev.bbox.y0 - lb.bbox.y1 : Infinity;
    const xOverlap =
      prev
        ? Math.min(prev.bbox.x1, lb.bbox.x1) - Math.max(prev.bbox.x0, lb.bbox.x0)
        : 0;
    const minW = prev
      ? Math.min(prev.bbox.x1 - prev.bbox.x0, lb.bbox.x1 - lb.bbox.x0)
      : 1;
    const sameColumn = minW > 0 && xOverlap / minW > 0.12;

    if (prev && yGap >= 0 && yGap <= PARA_GAP && sameColumn) {
      prev.text = `${prev.text}\n${lb.text}`.trim();
      prev.bbox = mergeBBoxes(prev.bbox, lb.bbox);
    } else {
      blocks.push({ ...lb });
    }
  }

  const fullText = lineBlocks.map((b) => b.text).join("\n").trim();
  return { items, blocks, fullText };
}
