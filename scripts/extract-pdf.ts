#!/usr/bin/env npx tsx
/**
 * 치과의료기구 도감 PDF 추출기 v3
 *
 * 두 가지 페이지 유형:
 *  1. instrument  : 기구 사진 + Instrument/Function/Characteristics 텍스트
 *  2. tray_setup  : 번호 합성 다이어그램 + 번호→기구명 목록
 */
import path from "node:path";
import { extractCatalogFromPdf } from "../src/lib/pdf/extractCatalog";
import { DEFAULT_OPTIONS } from "../src/lib/pdf/types";

function usage(): void {
  console.log(`
치과의료기구 도감 PDF 추출기 (v3)

사용법:
  npm run extract:pdf -- --input <pdf경로> [options]

옵션:
  -i, --input <path>      PDF 파일 경로 (필수)
  -o, --output <path>     출력 폴더 (기본: data/output/<이름>-v3-<시각>)
  --scale <n>             렌더 배율 (기본: ${DEFAULT_OPTIONS.renderScale})
  --min-width <px>        최소 이미지 너비 필터 (기본: ${DEFAULT_OPTIONS.minImageWidth})
  --min-height <px>       최소 이미지 높이 필터 (기본: ${DEFAULT_OPTIONS.minImageHeight})
  -h, --help

출력:
  instruments/p003-i00-*.png   기구 개별 이미지
  tray-setups/p008-*.png       번호 합성 트레이 다이어그램
  catalog.json                 전체 메타데이터
  summary.txt                  검수용 요약
`);
}

function parseArgs(argv: string[]) {
  let input: string | undefined;
  let output: string | undefined;
  let scale = DEFAULT_OPTIONS.renderScale;
  let minWidth = DEFAULT_OPTIONS.minImageWidth;
  let minHeight = DEFAULT_OPTIONS.minImageHeight;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "-h" || a === "--help") return { help: true as const };
    if (a === "-i" || a === "--input") input = argv[++i];
    else if (a === "-o" || a === "--output") output = argv[++i];
    else if (a === "--scale") scale = Number(argv[++i]);
    else if (a === "--min-width") minWidth = Number(argv[++i]);
    else if (a === "--min-height") minHeight = Number(argv[++i]);
  }
  return { help: false as const, input, output, scale, minWidth, minHeight };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { usage(); return; }
  if (!args.input) {
    console.error("오류: --input 으로 PDF 경로를 지정해 주세요.\n");
    usage();
    process.exit(1);
  }

  const inputPath = path.resolve(args.input);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const outputDir = args.output ?? path.resolve("data", "output", `${baseName}-v3-${stamp}`);

  console.log("PDF 추출 시작 (v3)");
  console.log(`  입력: ${inputPath}`);
  console.log(`  출력: ${outputDir}`);

  const result = await extractCatalogFromPdf({
    inputPath,
    outputDir,
    options: {
      renderScale: args.scale,
      minImageWidth: args.minWidth,
      minImageHeight: args.minHeight,
    },
  });

  console.log("\n추출 완료");
  console.log(`  페이지     : ${result.pageCount}`);
  console.log(`  기구 항목  : ${result.totalInstruments}`);
  console.log(`  트레이 셋업: ${result.totalTraySetups}`);
  console.log(`  catalog    : ${path.join(outputDir, "catalog.json")}`);
  console.log(`  summary    : ${path.join(outputDir, "summary.txt")}`);
}

main().catch((err) => {
  console.error("\n추출 실패:", err instanceof Error ? err.message : err);
  if (err instanceof Error && err.stack) console.error(err.stack);
  process.exit(1);
});
