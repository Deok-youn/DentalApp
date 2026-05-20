import type { BBox } from "./types";

export type Matrix6 = [number, number, number, number, number, number];

export function bboxWidth(b: BBox): number {
  return b.x1 - b.x0;
}
export function bboxHeight(b: BBox): number {
  return b.y1 - b.y0;
}

export function mergeBBoxes(a: BBox, b: BBox): BBox {
  return {
    x0: Math.min(a.x0, b.x0),
    y0: Math.min(a.y0, b.y0),
    x1: Math.max(a.x1, b.x1),
    y1: Math.max(a.y1, b.y1),
  };
}

export function unionBBoxes(boxes: BBox[]): BBox | null {
  if (!boxes.length) return null;
  return boxes.reduce(mergeBBoxes);
}

export function intersects(a: BBox, b: BBox): boolean {
  return a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
}

export function contains(outer: BBox, inner: BBox): boolean {
  return (
    inner.x0 >= outer.x0 &&
    inner.x1 <= outer.x1 &&
    inner.y0 >= outer.y0 &&
    inner.y1 <= outer.y1
  );
}

export function expandBBox(
  b: BBox,
  pad: number,
  maxW: number,
  maxH: number,
): BBox {
  return {
    x0: Math.max(0, b.x0 - pad),
    y0: Math.max(0, b.y0 - pad),
    x1: Math.min(maxW, b.x1 + pad),
    y1: Math.min(maxH, b.y1 + pad),
  };
}

/**
 * PDF 이미지는 단위 정사각형 [0,1]×[0,1] 에 그려짐.
 * CTM의 4개 꼭짓점을 페이지 좌표로 변환해 bbox 계산.
 */
export function bboxFromCTM(m: Matrix6): BBox {
  const [a, b, c, d, e, f] = m;
  // 단위 정사각형 꼭짓점: (0,0)(1,0)(0,1)(1,1)
  const xs = [e, a + e, c + e, a + c + e];
  const ys = [f, b + f, d + f, b + d + f];
  return {
    x0: Math.min(...xs),
    y0: Math.min(...ys),
    x1: Math.max(...xs),
    y1: Math.max(...ys),
  };
}

/** PDF → 캔버스 좌표 (y축 뒤집기) */
export function pdfToCanvas(
  pdfX: number,
  pdfY: number,
  imageBbox: BBox,
  canvasW: number,
  canvasH: number,
): { x: number; y: number } {
  const relX = (pdfX - imageBbox.x0) / bboxWidth(imageBbox);
  const relY = (imageBbox.y1 - pdfY) / bboxHeight(imageBbox); // y↑→y↓
  return { x: relX * canvasW, y: relY * canvasH };
}

export function isInsidePage(b: BBox, w: number, h: number): boolean {
  return (
    b.x0 >= -10 &&
    b.y0 >= -10 &&
    b.x1 <= w + 10 &&
    b.y1 <= h + 10 &&
    bboxWidth(b) > 0 &&
    bboxHeight(b) > 0
  );
}
