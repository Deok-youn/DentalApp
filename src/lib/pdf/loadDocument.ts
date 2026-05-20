import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getDocument, type PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";

const PDFJS_PACKAGE = path.join(process.cwd(), "node_modules", "pdfjs-dist");

/** pdfjs는 Windows에서도 file:// URL + 끝 슬래시가 필요함 */
function pdfJsResourceUrl(...segments: string[]): string {
  const dir = path.join(PDFJS_PACKAGE, ...segments);
  let url = pathToFileURL(dir).href;
  if (!url.endsWith("/")) url += "/";
  return url;
}

export async function loadPdfDocument(
  pdfPath: string,
): Promise<PDFDocumentProxy> {
  const absolutePath = path.resolve(pdfPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`PDF 파일을 찾을 수 없습니다: ${absolutePath}`);
  }

  const data = new Uint8Array(fs.readFileSync(absolutePath));

  return getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: false,
    cMapUrl: pdfJsResourceUrl("cmaps"),
    cMapPacked: true,
    standardFontDataUrl: pdfJsResourceUrl("standard_fonts"),
  }).promise;
}
