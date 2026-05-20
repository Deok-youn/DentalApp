/**
 * 트레이 셋업 이미지에 번호 라벨을 합성합니다.
 *
 * 좌표 계산:
 *  - 이미지 표시 영역 (PDF pt): displayBbox
 *  - 캔버스 크기 = (displayBbox 폭 × scale) × (displayBbox 높이 × scale)
 *  - 이미지를 캔버스에 stretch해서 채움
 *  - 번호 텍스트 위치: pdfToCanvas() 변환 (y축 뒤집기)
 */
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { bboxHeight, bboxWidth, intersects, pdfToCanvas } from "./bbox";
import { rawToPng } from "./imageConverter";
import type { PdfTextItem } from "./extractPageText";
import type { RawImage } from "./pageParser";
import type { BBox } from "./types";

function isOverlayNumber(str: string): boolean {
  const s = str.trim();
  // 단독 숫자 또는 짧은 숫자열 (목록 "1. Name" 형식 제외)
  return /^\d{1,3}$/.test(s);
}

function labelFontSize(scale: number): number {
  return Math.round(14 * scale);
}

export async function compositeNumbersOntoImage(
  image: RawImage,
  numberItems: PdfTextItem[],
  scale: number,
): Promise<Buffer> {
  const { widthPx, heightPx, kind, data, displayBbox } = image;

  const pngBuf = await rawToPng(data, widthPx, heightPx, kind);

  const canvasW = Math.max(1, Math.round(bboxWidth(displayBbox) * scale));
  const canvasH = Math.max(1, Math.round(bboxHeight(displayBbox) * scale));

  const canvas = createCanvas(canvasW, canvasH);
  const ctx = canvas.getContext("2d");

  // 배경 흰색
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasW, canvasH);

  // 이미지를 캔버스 크기에 맞게 stretch
  const img = await loadImage(pngBuf);
  ctx.drawImage(img, 0, 0, canvasW, canvasH);

  // 번호 라벨 합성
  const fontSize = labelFontSize(scale);
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;

  for (const item of numberItems) {
    const s = item.str.trim();
    if (!isOverlayNumber(s)) continue;

    const tx = item.transform[4]!;
    const ty = item.transform[5]!;
    const pos = pdfToCanvas(tx, ty, displayBbox, canvasW, canvasH);

    // 원형 배경
    const radius = Math.round(fontSize * 0.75);
    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    ctx.beginPath();
    ctx.arc(pos.x + radius * 0.5, pos.y - radius * 0.5, radius, 0, Math.PI * 2);
    ctx.fill();

    // 번호 텍스트
    ctx.fillStyle = "#cc0000";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(s, pos.x, pos.y);
  }

  return Buffer.from(canvas.toBuffer("image/png"));
}

/**
 * 번호 라벨로 분류:
 * 이미지 bbox와 교차하고 "1. Name" 형식이 아닌 단독 숫자 아이템
 */
export function collectOverlayNumbers(
  items: PdfTextItem[],
  imageBbox: BBox,
  legendBbox: BBox | null,
): PdfTextItem[] {
  return items.filter((item) => {
    if (!isOverlayNumber(item.str.trim())) return false;

    const tx = item.transform[4]!;
    const ty = item.transform[5]!;
    const fontSize = Math.abs(item.transform[3] as number) || item.height || 12;
    const itemBb: BBox = {
      x0: tx,
      y0: ty,
      x1: tx + fontSize,
      y1: ty + fontSize,
    };

    // 범례(목록) 영역 안의 숫자는 제외
    if (legendBbox && intersects(itemBb, legendBbox)) return false;

    // 이미지와 교차하거나 이미지 근처에 있는 것만 포함
    const expanded: BBox = {
      x0: imageBbox.x0 - 30,
      y0: imageBbox.y0 - 30,
      x1: imageBbox.x1 + 30,
      y1: imageBbox.y1 + 30,
    };
    return intersects(itemBb, expanded);
  });
}
