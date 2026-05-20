# PDF 추출 (1단계) — v2

치과의료기구 도감 PDF에서 다음을 추출합니다.

1. **다이어그램 이미지** — PDF 페이지를 렌더링해 **이미지 위 번호 라벨**까지 포함
2. **번호·기구명 목록** — `1. Cavitron Tip` 형식을 파싱해 구조화
3. **섹션 단위 매칭** — 한 셋업(트레이) = 다이어그램 + `items[]`

## 왜 v2인가?

v1은 PDF **내장 이미지(XObject)** 만 추출했습니다.  
도감에서 기구 위 **번호(1, 2, 3…)** 는 별도 텍스트 레이어이므로 PNG에서 **사라졌습니다**.

v2는 **내장 이미지 + PDF 텍스트 레이어(번호)** 를 합성(composite)하여 번호가 보이도록 합니다.  
(전체 페이지 렌더는 이 PDF에서 pdf.js 오류가 발생해 사용하지 않습니다.)

## 실행

```powershell
cd c:\work\DentalApp
npm run extract:pdf -- --input "c:\Users\LG\Downloads\pds-instrument-supply-manual-1.pdf"
```

옵션:

| 옵션 | 기본 | 설명 |
|------|------|------|
| `--scale` | 2 | 렌더 해상도 (번호 가독성) |
| `--min-width` | 60 | 내장 이미지 최소 너비 |
| `--min-height` | 60 | 내장 이미지 최소 높이 |

## 출력

```
data/output/<이름>-v2-<타임스탬프>/
  images/page-008-diagram-00.png   # 번호 포함 다이어그램
  catalog.json
  summary.txt
```

### catalog.json (v2)

```json
{
  "version": 2,
  "pages": [{
    "pageNumber": 8,
    "sections": [{
      "id": "p8-s0",
      "title": "PROPHYLAXIS TRAY SET-UP",
      "diagram": { "imagePath": "images/page-008-diagram-00.png", "bbox": {} },
      "items": [
        { "number": 1, "name": "Cavitron Tip" },
        { "number": 2, "name": "Mouth Mirror" }
      ],
      "legendText": "1. Cavitron Tip\n2. Mouth Mirror\n...",
      "matchConfidence": "high"
    }]
  }]
}
```

## 코드 구조

| 파일 | 역할 |
|------|------|
| `extractRawImagePlacements.ts` | 내장 이미지 위치(bbox) |
| `detectDiagramRegion.ts` | 레이아웃 기반 다이어그램 영역 |
| `compositeDiagram.ts` | 내장 이미지 + 번호 텍스트 합성 PNG |
| `extractRawImagePlacements.ts` | 내장 이미지 위치 |
| `parseInstrumentList.ts` | 번호 목록·Instrument 블록 파싱 |
| `buildPageSections.ts` | 페이지 → sections 조립 |

## 검수

- `images/page-*-diagram-*.png` 에서 **번호가 보이는지** 확인
- `summary.txt` / `items[]` 에서 **번호·이름**이 목록과 일치하는지 확인
- `matchConfidence: low` 섹션은 수동 검수

## 제한

- 스캔 PDF(페이지 전체가 비트맵)는 OCR 미지원
- 복잡한 2단 목록(1. A 10. B)은 파싱 후 순서 검수 권장
