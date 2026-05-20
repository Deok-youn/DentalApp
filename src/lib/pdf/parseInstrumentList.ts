import type { TextBlock, TrayItem } from "./types";

/** "1. Name" 형식 줄 검출 */
export function isNumberedLine(str: string): boolean {
  return /^\d{1,2}\.\s+\S/.test(str.trim());
}

/** 텍스트에서 번호 목록 파싱 */
export function parseNumberedList(text: string): TrayItem[] {
  const items: TrayItem[] = [];
  // "숫자. 이름" 패턴 (줄바꿈 또는 큰 공백으로 구분)
  const re = /(\d{1,2})\.\s+([^\n\d]+?)(?=\s*\d{1,2}\.\s|\s*$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const number = parseInt(m[1]!, 10);
    const name = m[2]!
      .replace(/\n/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
    if (name && !isNaN(number)) {
      items.push({ number, name });
    }
  }
  return dedup(items);
}

function dedup(items: TrayItem[]): TrayItem[] {
  const map = new Map<number, TrayItem>();
  for (const it of items) {
    const ex = map.get(it.number);
    if (!ex || it.name.length > ex.name.length) map.set(it.number, it);
  }
  return [...map.values()].sort((a, b) => a.number - b.number);
}

/** 페이지 텍스트 블록에서 번호 목록이 있는 블록 찾기 */
export function findLegendBlock(blocks: TextBlock[]): TextBlock | null {
  // 3개 이상의 "N. 이름" 패턴을 포함하는 블록 우선
  const candidates = blocks
    .map((b) => ({
      block: b,
      count: (b.text.match(/\d+\.\s+\w/g) ?? []).length,
    }))
    .filter((c) => c.count >= 2)
    .sort((a, b) => b.count - a.count);

  if (candidates.length) return candidates[0]!.block;

  // fallback: "1. " 패턴이 하나라도 있으면 반환
  return blocks.find((b) => /\d+\.\s+\w/.test(b.text)) ?? null;
}

/** 페이지 제목 추출 */
export function extractPageTitle(blocks: TextBlock[]): string | undefined {
  const titleBlock = blocks.find(
    (b) =>
      (/SET.?UP|TRAY|INSTRUMENTS|SURGICAL|EXTRACTION|CANAL|SOCKET|DENTURE|CROWN/i.test(
        b.text,
      ) &&
        b.text.trim().split("\n").length <= 2 &&
        b.text.trim().length < 100) ||
      b.text.trim() === b.text.trim().toUpperCase(),
  );
  return titleBlock?.text.trim();
}
