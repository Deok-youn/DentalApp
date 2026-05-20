/**
 * 단일 패스로 한 페이지의 모든 이미지를 추출.
 * - 올바른 bbox: 단위 정사각형 [0,1]×[0,1] 기준 CTM 변환
 * - 픽셀 데이터를 연산자 목록 순회 중에 캡처 (나중에 objs.get 재호출 없음)
 */
import { ImageKind, OPS, Util } from "pdfjs-dist/legacy/build/pdf.mjs";
import type { PDFPageProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import { bboxFromCTM, isInsidePage } from "./bbox";
import type { BBox, ExtractionOptions } from "./types";

export type RawImage = {
  objectName: string;
  widthPx: number;
  heightPx: number;
  kind: number;
  data: Uint8Array | Uint8ClampedArray;
  /** 페이지 좌표계(PDF pt) 에서의 표시 영역 */
  displayBbox: BBox;
};

type Matrix6 = [number, number, number, number, number, number];
const IDENTITY: Matrix6 = [1, 0, 0, 1, 0, 0];

function mulM(a: Matrix6, b: Matrix6): Matrix6 {
  return Util.transform(a, b) as Matrix6;
}

async function resolveXObject(
  page: PDFPageProxy,
  name: string,
): Promise<{ widthPx: number; heightPx: number; kind: number; data: Uint8Array } | null> {
  try {
    const obj = page.objs.get(name) as {
      width: number;
      height: number;
      kind: number;
      data: Uint8Array;
    } | null;
    if (obj?.data?.length) {
      return {
        widthPx: obj.width,
        heightPx: obj.height,
        kind: obj.kind,
        data: obj.data,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export async function parsePageImages(
  page: PDFPageProxy,
  pageWidth: number,
  pageHeight: number,
  options: ExtractionOptions,
): Promise<RawImage[]> {
  // getOperatorList() 가 끝나야 page.objs 에 이미지가 채워진다
  const opList = await page.getOperatorList();
  const { fnArray, argsArray } = opList;

  let ctm: Matrix6 = [...IDENTITY];
  const stack: Matrix6[] = [];
  const results: RawImage[] = [];
  let inlineIdx = 0;

  for (let i = 0; i < fnArray.length; i++) {
    const fn = fnArray[i]!;
    const args = argsArray[i];

    if (fn === OPS.save) {
      stack.push([...ctm]);
      continue;
    }
    if (fn === OPS.restore) {
      ctm = stack.pop() ?? [...IDENTITY];
      continue;
    }
    if (fn === OPS.transform && Array.isArray(args)) {
      ctm = mulM(ctm, args as Matrix6);
      continue;
    }

    const isXObj = fn === OPS.paintImageXObject;
    const isInline = fn === OPS.paintInlineImageXObject;
    if (!isXObj && !isInline) continue;
    if (!args?.[0]) continue;

    let data: Uint8Array | Uint8ClampedArray | null = null;
    let widthPx = 0;
    let heightPx = 0;
    let kind: number = ImageKind.RGB_24BPP;
    let name = "";

    if (isInline && typeof args[0] === "object" && "data" in args[0]) {
      const raw = args[0] as {
        width: number;
        height: number;
        kind: number;
        data: Uint8Array;
      };
      data = raw.data;
      widthPx = raw.width;
      heightPx = raw.height;
      kind = raw.kind;
      name = `inline-${inlineIdx++}`;
    } else if (isXObj) {
      name = String(args[0]);
      const resolved = await resolveXObject(page, name);
      if (resolved) {
        data = resolved.data;
        widthPx = resolved.widthPx;
        heightPx = resolved.heightPx;
        kind = resolved.kind;
      }
    }

    if (!data?.length || widthPx < options.minImageWidth || heightPx < options.minImageHeight) {
      continue;
    }

    const displayBbox = bboxFromCTM(ctm);
    if (!isInsidePage(displayBbox, pageWidth, pageHeight)) continue;

    results.push({ objectName: name, widthPx, heightPx, kind, data, displayBbox });
  }

  return results;
}
