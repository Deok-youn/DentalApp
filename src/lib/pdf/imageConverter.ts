/**
 * PDF raw 픽셀 데이터(kind) → PNG Buffer
 * kind: 1=GRAYSCALE_1BPP, 2=RGB_24BPP, 3=RGBA_32BPP (pdfjs ImageKind)
 */
import sharp from "sharp";
import { ImageKind } from "pdfjs-dist/legacy/build/pdf.mjs";

export async function rawToPng(
  data: Uint8Array | Uint8ClampedArray,
  widthPx: number,
  heightPx: number,
  kind: number,
): Promise<Buffer> {
  const buf = Buffer.from(data);

  if (kind === ImageKind.RGBA_32BPP) {
    return sharp(buf, { raw: { width: widthPx, height: heightPx, channels: 4 } })
      .png()
      .toBuffer();
  }

  if (kind === ImageKind.RGB_24BPP) {
    return sharp(buf, { raw: { width: widthPx, height: heightPx, channels: 3 } })
      .png()
      .toBuffer();
  }

  if (kind === ImageKind.GRAYSCALE_1BPP) {
    // 1bpp → 8bit grayscale
    const gray = Buffer.alloc(widthPx * heightPx);
    for (let i = 0; i < widthPx * heightPx; i++) {
      gray[i] = ((data[i >> 3]! >> (7 - (i & 7))) & 1) ? 255 : 0;
    }
    return sharp(gray, { raw: { width: widthPx, height: heightPx, channels: 1 } })
      .png()
      .toBuffer();
  }

  throw new Error(`지원하지 않는 이미지 kind=${kind}`);
}
