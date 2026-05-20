import fs from "node:fs";
import path from "node:path";
import type { PDFPageProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import { bboxHeight, bboxWidth, intersects } from "./bbox";
import { classifyPage } from "./classifyPage";
import { collectOverlayNumbers, compositeNumbersOntoImage } from "./compositeNumbers";
import { extractPageText } from "./extractPageText";
import { rawToPng } from "./imageConverter";
import { matchImagesToText } from "./matchInstruments";
import { parsePageImages } from "./pageParser";
import {
  extractPageTitle,
  findLegendBlock,
  parseNumberedList,
} from "./parseInstrumentList";
import type { RawImage } from "./pageParser";
import type { PdfTextItem } from "./extractPageText";
import type {
  ExtractionOptions,
  InstrumentEntry,
  PageResult,
  TraySetup,
} from "./types";

function sanitizeFilename(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function buildInstrumentEntries(
  pageNumber: number,
  images: RawImage[],
  items: PdfTextItem[],
  pageWidth: number,
  outDir: string,
): Promise<InstrumentEntry[]> {
  const matched = matchImagesToText(images, items, pageWidth);
  const entries: InstrumentEntry[] = [];

  for (let i = 0; i < matched.length; i++) {
    const m = matched[i]!;
    const safeName = sanitizeFilename(m.name || `img${i}`);
    const fileName = `instruments/p${String(pageNumber).padStart(3, "0")}-i${String(i).padStart(2, "0")}-${safeName}.png`;
    const absPath = path.join(outDir, fileName);

    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    const pngBuf = await rawToPng(
      m.image.data,
      m.image.widthPx,
      m.image.heightPx,
      m.image.kind,
    );
    fs.writeFileSync(absPath, pngBuf);

    entries.push({
      id: `p${pageNumber}-inst-${i}`,
      pageNumber,
      entryIndex: i,
      imagePath: fileName.replace(/\\/g, "/"),
      widthPx: m.image.widthPx,
      heightPx: m.image.heightPx,
      name: m.name,
      function: m.instrumentFunction,
      characteristics: m.characteristics,
      description: m.description,
    });
  }

  return entries;
}

async function buildTraySetup(
  pageNumber: number,
  images: RawImage[],
  items: PdfTextItem[],
  fullText: string,
  outDir: string,
): Promise<TraySetup | undefined> {
  if (images.length === 0) return undefined;

  // 가장 큰 이미지를 다이어그램으로 선택
  const mainImage = [...images].sort(
    (a, b) =>
      bboxWidth(b.displayBbox) * bboxHeight(b.displayBbox) -
      bboxWidth(a.displayBbox) * bboxHeight(a.displayBbox),
  )[0]!;

  // 텍스트에서 제목과 항목 목록 추출
  const lines = fullText.split("\n").map((l) => l.trim()).filter(Boolean);
  const titleLine = lines.find((l) =>
    /TRAY|SET.?UP|INSTRUMENT|SURGICAL|EXTRACTION|CANAL|SOCKET|DENTURE|CROWN|PULPO/i.test(l) &&
    l.length < 120
  ) ?? `Tray Setup p${pageNumber}`;

  const items_list = parseNumberedList(fullText);

  const overlayNumbers = collectOverlayNumbers(items, mainImage.displayBbox, null);
  const compBuf = await compositeNumbersOntoImage(mainImage, overlayNumbers, 2);

  const safeName = sanitizeFilename(titleLine);
  const fileName = `tray-setups/p${String(pageNumber).padStart(3, "0")}-${safeName}.png`;
  const absPath = path.join(outDir, fileName);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, compBuf);

  const confidence =
    items_list.length >= 5 ? "high" : items_list.length >= 2 ? "medium" : "low";

  return {
    id: `p${pageNumber}-tray`,
    pageNumber,
    title: titleLine,
    imagePath: fileName.replace(/\\/g, "/"),
    widthPx: mainImage.widthPx,
    heightPx: mainImage.heightPx,
    items: items_list,
    legendText: fullText,
    matchConfidence: confidence,
  };
}

export async function buildPageResult(
  page: PDFPageProxy,
  pageNumber: number,
  pageWidth: number,
  pageHeight: number,
  outDir: string,
  options: ExtractionOptions,
): Promise<PageResult> {
  const { items, blocks, fullText } = await extractPageText(page);
  const images = await parsePageImages(page, pageWidth, pageHeight, options);
  const pageClass = classifyPage(blocks, images, fullText, pageWidth, pageHeight);

  let instruments: InstrumentEntry[] = [];
  let traySetup: TraySetup | undefined;

  if (pageClass === "tray_setup" || pageClass === "mixed") {
    traySetup = await buildTraySetup(
      pageNumber,
      images,
      items,
      fullText,
      outDir,
    );
  }

  if (pageClass === "instrument" || pageClass === "mixed") {
    // mixed 페이지: 트레이 이미지를 제외한 나머지만 instrument로 처리
    const trayBbox = traySetup
      ? images.find(
          (img) =>
            bboxWidth(img.displayBbox) * bboxHeight(img.displayBbox) ===
            Math.max(
              ...images.map(
                (i) => bboxWidth(i.displayBbox) * bboxHeight(i.displayBbox),
              ),
            ),
        )?.displayBbox
      : null;

    const instImages = trayBbox
      ? images.filter(
          (img) =>
            !intersects(img.displayBbox, trayBbox) || img.widthPx < 400,
        )
      : images;

    instruments = await buildInstrumentEntries(
      pageNumber,
      instImages,
      items,
      pageWidth,
      outDir,
    );
  }

  return {
    pageNumber,
    pageType: pageClass,
    pageWidth,
    pageHeight,
    instruments,
    traySetup,
    fullPageText: fullText,
  };
}
