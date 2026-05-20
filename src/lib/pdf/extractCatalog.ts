import fs from "node:fs";
import path from "node:path";
import { loadPdfDocument } from "./loadDocument";
import { buildPageResult } from "./buildPage";
import { parseNumberedList, extractPageTitle } from "./parseInstrumentList";
import { DEFAULT_OPTIONS } from "./types";
import type { ExtractionOptions, ExtractionResult, PageResult } from "./types";

export type ExtractCatalogParams = {
  inputPath: string;
  outputDir: string;
  options?: Partial<ExtractionOptions>;
};

/**
 * 일부 트레이 셋업은 두 페이지에 걸쳐 구성된다.
 *  - 홀수 페이지 (N)  : 트레이 다이어그램 이미지 + 번호만 있는 텍스트
 *  - 짝수 페이지 (N+1): 번호 목록 텍스트만 있고 이미지는 없음
 *
 * 이 함수는 그 두 페이지를 하나의 트레이로 합친다.
 */
function mergeTwoPageTrays(pages: PageResult[]): void {
  for (let i = 0; i < pages.length - 1; i++) {
    const cur = pages[i]!;
    const nxt = pages[i + 1]!;

    // Case 1: 현재 페이지에 traySetup이 있지만 아이템 목록이 없고,
    //         다음 페이지 fullPageText에서 번호 목록을 찾을 수 있을 때
    if (cur.traySetup && cur.traySetup.items.length < 3) {
      const nextItems = parseNumberedList(nxt.fullPageText);
      if (nextItems.length >= 3) {
        cur.traySetup.items = nextItems;
        cur.traySetup.legendText = nxt.fullPageText;
        cur.traySetup.matchConfidence =
          nextItems.length >= 5 ? "high" : "medium";

        // 다음 페이지의 제목이 더 구체적이면 사용
        const nxtTitle = extractPageTitle(
          nxt.fullPageText.split("\n").filter(Boolean).map((t) => ({
            text: t,
            bbox: { x0: 0, y0: 0, x1: 100, y1: 10 },
          })),
        );
        if (nxtTitle && nxtTitle.length > 3) {
          cur.traySetup.title = nxtTitle;
        }

        // 다음 페이지를 'other'로 축소 (중복 표시 방지)
        nxt.pageType = "other";
        nxt.traySetup = undefined;
        console.log(
          `  [merge] p${cur.pageNumber}+p${nxt.pageNumber} → ${cur.traySetup.title} (${nextItems.length} items)`,
        );
      }
    }
  }
}

export async function extractCatalogFromPdf(
  params: ExtractCatalogParams,
): Promise<ExtractionResult> {
  const options: ExtractionOptions = { ...DEFAULT_OPTIONS, ...params.options };
  const inputPath = path.resolve(params.inputPath);
  const outputDir = path.resolve(params.outputDir);

  fs.mkdirSync(path.join(outputDir, "instruments"), { recursive: true });
  fs.mkdirSync(path.join(outputDir, "tray-setups"), { recursive: true });

  const pdf = await loadPdfDocument(inputPath);
  const pages: PageResult[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const vp = page.getViewport({ scale: 1 });
    process.stdout.write(`\r  페이지 ${pageNumber}/${pdf.numPages} 처리 중...`);

    const result = await buildPageResult(
      page,
      pageNumber,
      vp.width,
      vp.height,
      outputDir,
      options,
    );
    pages.push(result);
  }
  process.stdout.write("\n");

  // ── 두 페이지 트레이 합치기 ──────────────────────────────────
  console.log("  두 페이지 트레이 합치기...");
  mergeTwoPageTrays(pages);

  const totalInstruments = pages.reduce((s, p) => s + p.instruments.length, 0);
  const totalTraySetups = pages.filter((p) => p.traySetup).length;

  const extraction: ExtractionResult = {
    version: 3,
    sourceFile: inputPath,
    sourceBaseName: path.basename(inputPath, path.extname(inputPath)),
    extractedAt: new Date().toISOString(),
    pageCount: pdf.numPages,
    totalInstruments,
    totalTraySetups,
    options,
    pages,
  };

  // catalog.json 저장
  fs.writeFileSync(
    path.join(outputDir, "catalog.json"),
    JSON.stringify(extraction, null, 2),
    "utf-8",
  );

  // summary.txt 저장
  const summaryLines: string[] = [
    `Source : ${extraction.sourceBaseName}`,
    `Version: ${extraction.version}`,
    `Pages  : ${extraction.pageCount}`,
    `Instruments : ${totalInstruments}`,
    `Tray Setups : ${totalTraySetups}`,
    `Extracted   : ${extraction.extractedAt}`,
    "",
  ];

  for (const p of pages) {
    if (p.pageType === "other") continue;
    summaryLines.push(
      `── Page ${p.pageNumber} [${p.pageType}] ─────────────────`,
    );

    if (p.traySetup) {
      summaryLines.push(`  TRAY : ${p.traySetup.title}`);
      summaryLines.push(
        `  Image: ${p.traySetup.imagePath}  (${p.traySetup.widthPx}×${p.traySetup.heightPx} px)`,
      );
      summaryLines.push(
        `  Items: ${p.traySetup.items.length}  [${p.traySetup.matchConfidence}]`,
      );
      for (const it of p.traySetup.items) {
        summaryLines.push(`    ${it.number}. ${it.name}`);
      }
    }

    for (const inst of p.instruments) {
      summaryLines.push(
        `  INST : [${inst.entryIndex}] ${inst.name}  → ${inst.imagePath}`,
      );
      if (inst.function) {
        summaryLines.push(`    Function: ${inst.function.slice(0, 120)}`);
      }
      if (inst.characteristics) {
        summaryLines.push(
          `    Characteristics: ${inst.characteristics.slice(0, 120)}`,
        );
      }
    }
    summaryLines.push("");
  }

  fs.writeFileSync(
    path.join(outputDir, "summary.txt"),
    summaryLines.join("\n"),
    "utf-8",
  );

  return extraction;
}
