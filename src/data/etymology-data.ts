// ─── 치과 용어 어원 사전 ────────────────────────────────────────────────────
// 기구명 → 어원 항목 매핑 (keyword → term)
const KEYWORD_MAP: Array<{ keywords: string[]; term: string }> = [
  { keywords: ['discoid'],                    term: 'Discoid' },
  { keywords: ['cleoid'],                     term: 'Cleoid' },
  { keywords: ['beavertail'],                 term: 'Beavertail' },
  { keywords: ['acorn'],                      term: 'Acorn' },
  { keywords: ['football'],                   term: 'Football' },
  { keywords: ['burnisher'],                  term: 'Burnisher' },
  { keywords: ['carver'],                     term: 'Carver' },
  { keywords: ['condenser'],                  term: 'Condenser' },
  { keywords: ['explorer'],                   term: 'Explorer' },
  { keywords: ['excavator'],                  term: 'Excavator' },
  { keywords: ['elevator'],                   term: 'Elevator' },
  { keywords: ['forcep'],                     term: 'Forceps' },
  { keywords: ['curette'],                    term: 'Curette' },
  { keywords: ['scalpel'],                    term: 'Scalpel' },
  { keywords: ['alginate', 'alignate'],       term: 'Alginate' },
  { keywords: ['amalgam'],                    term: 'Amalgam' },
  { keywords: ['eugenol'],                    term: 'Eugenol' },
  { keywords: ['gutta'],                      term: 'Gutta Percha' },
  { keywords: ['tofflemire', 'tofflemier'],   term: 'Tofflemire' },
  { keywords: ['hollenback'],                 term: 'Hollenback' },
  { keywords: ['woodson'],                    term: 'Woodson' },
  { keywords: ['prophy', 'prophylaxis'],      term: 'Prophylaxis / Prophy' },
  { keywords: ['perioprobe'],                 term: 'Perioprobe' },
  { keywords: ['periosteal'],                 term: 'Periosteal' },
  { keywords: ['cavitron'],                   term: 'Cavitron' },
  { keywords: ['hemostat'],                   term: 'Hemostat' },
  { keywords: ['syringe'],                    term: 'Syringe' },
  { keywords: ['matrix'],                     term: 'Matrix' },
  { keywords: ['articulating'],               term: 'Articulating (Paper)' },
  { keywords: ['spatula'],                    term: 'Spatula' },
  { keywords: ['irm'],                        term: 'IRM (ZOE)' },
  { keywords: ['chlorhexidine', 'chlorohexidine'], term: 'Chlorhexidine' },
  { keywords: ['hypochlorite', 'hypochloride'],    term: 'Sodium Hypochlorite' },
  { keywords: ['calcium', 'hydroxide'],       term: 'Calcium Hydroxide' },
];

/** 기구 이름으로 관련 어원 항목들을 조회 */
export function lookupEtymologyForInstrument(instrumentName: string): EtymEntry[] {
  const lower = instrumentName.toLowerCase().replace(/[:()\[\].]/g, ' ');
  const matched = new Map<string, EtymEntry>();
  for (const { keywords, term } of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      const entry = ETYMOLOGY_DATA.find((e) => e.term === term);
      if (entry && !matched.has(term)) matched.set(term, entry);
    }
  }
  return Array.from(matched.values()).slice(0, 3);
}

export type EtymCategory =
  | 'shape'     // 형태·모양 묘사어
  | 'function'  // 기능·동작 파생어
  | 'material'  // 재료·화학 용어
  | 'eponym'    // 인명 유래
  | 'compound'  // 복합어·조합어
  | 'prefix';   // 접두어·접미어

export interface EtymRoot {
  word: string;   // 어근
  lang: string;   // 언어
  meaning: string; // 뜻
}

export interface EtymEntry {
  term: string;
  common_typos?: string[];
  category: EtymCategory;
  origin: string;          // 주요 어원 언어
  roots: EtymRoot[];
  original_meaning: string;
  ko_explanation: string;
  memory_tip: string;
}

export const CATEGORY_META: Record<EtymCategory, { label: string; koLabel: string; color: string; bg: string }> = {
  shape:    { label: 'Shape',    koLabel: '형태 묘사어',  color: '#6366f1', bg: '#eef2ff' },
  function: { label: 'Function', koLabel: '기능 파생어',  color: '#9333ea', bg: '#faf5ff' },
  material: { label: 'Material', koLabel: '재료·화학어',  color: '#059669', bg: '#f0fdf4' },
  eponym:   { label: 'Eponym',   koLabel: '인명 유래',    color: '#d97706', bg: '#fffbeb' },
  compound: { label: 'Compound', koLabel: '복합·조합어',  color: '#db2777', bg: '#fdf2f8' },
  prefix:   { label: 'Prefix',   koLabel: '접두·접미어',  color: '#475569', bg: '#f8fafc' },
};

export const ETYMOLOGY_DATA: EtymEntry[] = [

  // ── 형태 묘사어 (Shape) ───────────────────────────────────────────────────

  {
    term: 'Discoid',
    common_typos: ['Discloid'],
    category: 'shape',
    origin: 'Greek',
    roots: [
      { word: 'diskos', lang: 'Greek', meaning: '원반, 납작한 원형 물체' },
      { word: '-oid', lang: 'Greek', meaning: '~모양, ~처럼 생긴' },
    ],
    original_meaning: '원반처럼 생긴',
    ko_explanation:
      'diskos(원반) + -oid(모양) = "원반 모양". 고대 그리스에서 원반 던지기 종목의 원반(δίσκος)과 같은 어근. ' +
      'Discoid Carver의 한쪽 팁이 납작하고 둥근 원반처럼 생긴 데서 이름이 붙었습니다.',
    memory_tip:
      '"Disc(원반) + oid(모양)" → 원반 닮은 팁! CD·DVD처럼 납작하고 둥글다고 떠올리세요. 오타 "Discloid"는 없는 단어—l을 빼세요!',
  },
  {
    term: 'Cleoid',
    common_typos: ['Celoid', 'Cleiod'],
    category: 'shape',
    origin: 'Greek',
    roots: [
      { word: 'kleis (κλείς)', lang: 'Greek', meaning: '열쇠, 갈고리, 빗장' },
      { word: '-oid', lang: 'Greek', meaning: '~모양' },
    ],
    original_meaning: '갈고리 모양',
    ko_explanation:
      'kleis(열쇠·갈고리) + -oid(모양) = "갈고리처럼 생긴". 빗장뼈(쇄골, clavicle)도 같은 어근 kleis에서 왔습니다. ' +
      'Cleoid Carver의 팁이 갈고리나 새 발톱처럼 뾰족하게 굽어 있는 데서 유래합니다.',
    memory_tip:
      '"Cle- = Key(열쇠)". 열쇠 끝이 뾰족하게 굽어 있듯 Cleoid 팁도 갈고리처럼 굽어 있어요. 오타 "Celoid"는 e 하나 빠진 것—Cl-e-oid!',
  },
  {
    term: 'Beavertail',
    category: 'shape',
    origin: 'Old English / Compound',
    roots: [
      { word: 'befer (beaver)', lang: 'Old English', meaning: '비버(동물)' },
      { word: 'tægl (tail)', lang: 'Old English', meaning: '꼬리' },
    ],
    original_meaning: '비버의 꼬리 모양',
    ko_explanation:
      '비버(Beaver)는 납작하고 넓적한 꼬리를 가진 설치류 동물입니다. Beavertail Burnisher·Carver의 팁이 이 납작하고 넓은 형태를 닮아 붙여진 이름입니다.',
    memory_tip:
      '비버 꼬리 = 납작하고 넓적! 실물 비버 꼬리를 상상하면 팁 모양이 바로 떠오릅니다. Burnisher(연마용) / Carver(조각용)의 차이만 구분하면 OK!',
  },
  {
    term: 'Acorn',
    category: 'shape',
    origin: 'Old English',
    roots: [
      { word: 'æcern', lang: 'Old English', meaning: '도토리, 너도밤나무 열매' },
    ],
    original_meaning: '도토리 모양',
    ko_explanation:
      'Acorn Burnisher의 팁이 도토리처럼 작고 둥글게 튀어나온 형태를 닮았습니다. 교합면 중앙 와(窩, pit) 및 열구(fissure)를 연마하기에 적합한 크기와 형태입니다.',
    memory_tip:
      '"도토리 Burnisher"! 뾰족한 도토리 모양 팁으로 치아 홈 속을 콕콕 연마하는 모습을 그려보세요.',
  },
  {
    term: 'Football',
    category: 'shape',
    origin: 'Old English / Compound',
    roots: [
      { word: 'foot + ball', lang: 'Old English', meaning: '발 + 공 → 럭비공(타원형)' },
    ],
    original_meaning: '럭비공(미식축구공) 모양',
    ko_explanation:
      'Football Burnisher는 미식축구공처럼 양 끝이 가늘고 가운데가 볼록한 타원형 팁을 가집니다. 교합면 와(pit)와 중심교합 부위 연마에 사용됩니다.',
    memory_tip:
      '"럭비공 Burnisher"! 미식축구공 모양 팁이 넓은 면을 한 번에 닦기에 좋다는 것이 포인트.',
  },

  // ── 기능 파생어 (Function) ────────────────────────────────────────────────

  {
    term: 'Burnisher',
    category: 'function',
    origin: 'Old French',
    roots: [
      { word: 'brunir', lang: 'Old French', meaning: '광택내다, 닦아서 매끈하게 만들다' },
      { word: '-isher', lang: 'English', meaning: '~하는 도구/사람' },
    ],
    original_meaning: '광택을 내는 도구',
    ko_explanation:
      '프랑스어 brunir(갈고 닦아 빛나게 하다)에서 영어 "burnish"가 유래했으며, ' +
      'burnisher는 "닦는 도구"를 뜻합니다. 치과에서는 아말감·금속 수복물 표면을 매끄럽게 문질러 광택을 내고 가장자리를 밀착시키는 기구입니다.',
    memory_tip:
      '"Burn(燃)이 아니고 Brunir(광택)!" 불태우는 게 아니라 빛이 나도록 닦는 도구. "반짝반짝 버니셔"로 암기하세요.',
  },
  {
    term: 'Carver',
    category: 'function',
    origin: 'Old English',
    roots: [
      { word: 'ceorfan', lang: 'Old English', meaning: '깎다, 새기다, 조각하다' },
      { word: '-er', lang: 'English', meaning: '~하는 도구/사람' },
    ],
    original_meaning: '조각하는 도구',
    ko_explanation:
      '"Carve"는 나무나 돌을 깎아 형태를 만드는 행위입니다. 치과에서 Carver는 굳기 전 아말감·복합레진 수복재를 원하는 치아 형태로 "조각"하는 기구입니다.',
    memory_tip:
      'Carver = 조각가(彫刻家)가 쓰는 칼! 재료가 굳기 전에 치아 모양을 다듬는 "치아 조각기".',
  },
  {
    term: 'Condenser',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'con-', lang: 'Latin', meaning: '함께, 강하게' },
      { word: 'densare', lang: 'Latin', meaning: '빽빽하게 하다, 압축하다' },
    ],
    original_meaning: '압축하는 도구',
    ko_explanation:
      'condensare(함께 + 압축) → condense(농축·압축) → condenser(압축 도구). ' +
      '아말감을 와동 내에 눌러 다져 공극 없이 채워 넣는 기구입니다. 물리·화학에서 "콘덴서(전하 저장)"와 같은 어근입니다.',
    memory_tip:
      '"Con(강하게) + dense(빽빽하게)" → 아말감을 꽉꽉 다지는 도구! 콘덴서 = 압축기.',
  },
  {
    term: 'Explorer',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'ex-', lang: 'Latin', meaning: '밖으로' },
      { word: 'plorare', lang: 'Latin', meaning: '소리치며 찾다, 탐색하다' },
    ],
    original_meaning: '탐색하는 도구',
    ko_explanation:
      'explorare(밖으로 나가 찾다)에서 "explore(탐험하다)"가 유래했고, explorer는 "탐색 도구". ' +
      '날카로운 끝으로 치아 표면을 긁어 우식(충치)이나 결함을 촉각으로 탐지하는 기구입니다.',
    memory_tip:
      '"Explorer = 치아 탐험가"! 끝을 치아 홈에 넣어 우식을 탐지—마치 정글을 탐험하듯.',
  },
  {
    term: 'Excavator',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'ex-', lang: 'Latin', meaning: '밖으로' },
      { word: 'cavare', lang: 'Latin', meaning: '파다, 구멍을 만들다 (cavus=빈공간)' },
    ],
    original_meaning: '파내는 도구',
    ko_explanation:
      'excavare(파내다) → excavate(굴착하다) → excavator(굴착기). ' +
      '치과 Spoon Excavator는 숟가락 모양으로 우식 연화 상아질을 파내고 긁어내는 기구입니다. 건설용 굴착기(Excavator)와 완전히 같은 어원입니다.',
    memory_tip:
      '"포크레인(굴착기) = Excavator"! 치과에서도 충치를 포크레인처럼 파낸다고 기억하세요.',
  },
  {
    term: 'Elevator',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'e- / ex-', lang: 'Latin', meaning: '위로, 밖으로' },
      { word: 'levare', lang: 'Latin', meaning: '들어올리다 (levis=가벼운)' },
    ],
    original_meaning: '들어 올리는 도구',
    ko_explanation:
      'elevare(들어올리다) → elevator. 건물의 엘리베이터(승강기)와 같은 어원입니다. ' +
      '치과 Elevator는 치아 뿌리와 치조골 사이 치주인대를 절단하며 치아를 조금씩 "들어 올려" 발치를 돕는 기구입니다.',
    memory_tip:
      '"치과 엘리베이터 = 치아 올리는 기계!" 건물 엘리베이터처럼 치아를 소켓에서 위로 들어올립니다.',
  },
  {
    term: 'Forceps',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'formus', lang: 'Latin', meaning: '뜨거운' },
      { word: 'capere', lang: 'Latin', meaning: '잡다, 쥐다' },
    ],
    original_meaning: '뜨거운 것을 잡는 집게',
    ko_explanation:
      '원래 대장장이가 뜨거운 금속을 집는 "집게"를 뜻했습니다(formus=뜨거운 + capere=잡다). ' +
      '현재 의학에서는 조직·기구·치아를 집거나 잡아당기는 모든 집게형 기구를 뜻합니다. ' +
      'Cotton Forceps(솜 집게), Tissue Forceps(조직 집게), Extraction Forceps(발치용) 등으로 세분됩니다.',
    memory_tip:
      '"포셉 = 집게." 포스(Force/힘)로 잡는다고 연상해도 좋아요! 단, 어원은 "뜨거운 것을 잡던 집게"에서 왔습니다.',
  },
  {
    term: 'Curette',
    category: 'function',
    origin: 'French',
    roots: [
      { word: 'curer', lang: 'French', meaning: '긁다, 깨끗이 하다, 치료하다' },
      { word: '-ette', lang: 'French', meaning: '소형(작은 것)을 나타내는 접미어' },
    ],
    original_meaning: '작은 긁개',
    ko_explanation:
      'curer(청소·긁기) + -ette(소형) = curette(작은 긁개). ' +
      '치주치료에서 치석과 오염된 백악질을 긁어 제거하는 소형 긁개 기구입니다. ' +
      '수술에서도 뼈·조직을 긁어내는 기구에 같은 이름을 씁니다.',
    memory_tip:
      '"Cure(치료) + -ette(소형)" → 작은 치료 기구! 치주 스케일링의 핵심 도구로 잇몸 속을 긁어 치석 제거.',
  },
  {
    term: 'Scalpel',
    category: 'function',
    origin: 'Latin',
    roots: [
      { word: 'scalpellum', lang: 'Latin', meaning: '작은 칼 (scalpere=긁다, 새기다)' },
    ],
    original_meaning: '새기거나 긁는 작은 날카로운 칼',
    ko_explanation:
      'scalpere(긁다, 새기다)의 지소형 scalpellum(작은 칼)에서 영어 scalpel이 유래했습니다. ' +
      '조각가(sculptor)도 같은 어근 scalpere에서 왔습니다. 외과·구강외과 절개용 메스(날)와 손잡이(Scalpel Handle)로 구성됩니다.',
    memory_tip:
      '"Sculptor(조각가) = Scalpel(메스)"—같은 뿌리! 조각가가 재료를 긁듯 외과의사가 조직을 자릅니다.',
  },

  // ── 재료·화학 용어 (Material) ─────────────────────────────────────────────

  {
    term: 'Alginate',
    common_typos: ['Alignate'],
    category: 'material',
    origin: 'Latin / Modern Chemistry',
    roots: [
      { word: 'alga', lang: 'Latin', meaning: '해조류, 미역·다시마 종류' },
      { word: '-inate', lang: 'Chemistry', meaning: '염(鹽, salt)을 나타내는 화학 접미어' },
    ],
    original_meaning: '해조류에서 추출한 알긴산의 염(salt)',
    ko_explanation:
      '갈조류(다시마·미역류)에서 추출한 알긴산(alginic acid)의 나트륨 염(sodium alginate)입니다. ' +
      '물과 혼합하면 탄성 겔로 굳어 인상 채득에 사용됩니다. ' +
      '"Alignate"는 오타—해조류(alga)에서 왔으니 "alga + nate = alginate"로 기억하세요.',
    memory_tip:
      '"Alga(해조류) = Alginate!" 바다 다시마에서 뽑은 인상재. 바다 색깔(파란·초록) 생각하면 alginate!',
  },
  {
    term: 'Amalgam',
    category: 'material',
    origin: 'Arabic / Medieval Latin',
    roots: [
      { word: 'al-malgham (الملغم)', lang: 'Arabic', meaning: '유연화제, 연고' },
      { word: 'malagma (μάλαγμα)', lang: 'Greek', meaning: '부드럽게 하는 것' },
    ],
    original_meaning: '금속을 부드럽게 혼합한 물질',
    ko_explanation:
      '수은과 여러 금속 분말을 혼합한 합금입니다. 아랍 연금술 용어에서 중세 라틴어로 유입되었습니다. ' +
      '"A(n) + malgam" 구조가 아닌 아랍어 정관사 al + malgham 형태에서 유래했습니다.',
    memory_tip:
      '"아말감 = 아랍 연금술의 혼합금속!" 수은(Hg) + 합금 분말을 섞어 만드는 치과용 은색 충전재.',
  },
  {
    term: 'Eugenol',
    category: 'material',
    origin: 'Neo-Latin / Greek',
    roots: [
      { word: 'Eugenia', lang: 'Neo-Latin', meaning: '정향나무(丁香木) 속명 — Greek eu(좋은) + genos(태어남)에서 유래한 인명' },
      { word: '-ol', lang: 'Chemistry', meaning: '알코올·페놀 계열 화합물 접미어' },
    ],
    original_meaning: '정향나무(Eugenia) 에서 추출한 페놀 화합물',
    ko_explanation:
      '정향(clove) 오일의 주성분으로, 정향나무의 학명 Eugenia caryophyllata에서 이름을 땄습니다. ' +
      'Eugenia는 "좋은(eu) 출생(genos)"이라는 뜻의 그리스 이름에서 유래한 식물학 명칭입니다. ' +
      '치과에서는 진통·방부·임시접착 목적으로 ZOE(Zinc Oxide + Eugenol) 시멘트에 사용됩니다.',
    memory_tip:
      '"유게놀 = 정향 오일". 매운 듯한 향이 나는 치과 특유의 냄새가 바로 Eugenol! 방부·진통 효과.',
  },
  {
    term: 'Gutta Percha',
    category: 'material',
    origin: 'Malay',
    roots: [
      { word: 'getah', lang: 'Malay', meaning: '수액(樹液), 나무에서 나오는 끈적한 즙' },
      { word: 'perca', lang: 'Malay', meaning: '퍼차 나무 (Palaquium 속의 열대 나무)' },
    ],
    original_meaning: '퍼차 나무의 수액으로 만든 천연 고무',
    ko_explanation:
      '말레이시아·인도네시아 열대우림의 퍼차 나무(Palaquium)에서 채취한 천연 폴리이소프렌 수지입니다. ' +
      '19세기 의료·전선 절연재로 도입되었고, 치과에서는 근관(신경관) 충전 포인트 재료로 사용됩니다.',
    memory_tip:
      '"구타 퍼차 = 열대 나무 수액 고무!" 신경치료 마지막 단계에 근관을 채우는 고무 포인트.',
  },
  {
    term: 'Chlorhexidine',
    common_typos: ['Chlorohexidine', 'Chlorhexadine'],
    category: 'material',
    origin: 'Modern Chemistry',
    roots: [
      { word: 'chloro-', lang: 'Greek', meaning: '염소(Cl), 녹황색' },
      { word: 'hex-', lang: 'Greek', meaning: '6 (여섯)' },
      { word: '-idine', lang: 'Chemistry', meaning: '이미다졸린 계열 질소 고리 화합물 접미어' },
    ],
    original_meaning: '염소 원자를 포함한 6각형 구조의 화합물',
    ko_explanation:
      '염소(chloro) + 6개 탄소 고리(hex) 구조를 가진 살균제입니다. 0.12% 클로르헥시딘 구강세정제는 치주 병원균에 강력한 항균 효과를 보입니다. ' +
      '"Chlorohexidine"은 오타—중간에 "o"가 들어가면 안 됩니다.',
    memory_tip:
      '"Chlor(염소) + hex(6) + idine(화합물)" → 염소 6각 살균제! 빨간 뚜껑 구강세정제 성분.',
  },
  {
    term: 'Sodium Hypochlorite',
    common_typos: ['Sodium Hypochloride'],
    category: 'material',
    origin: 'Modern Chemistry',
    roots: [
      { word: 'hypo-', lang: 'Greek', meaning: '아래, 부족, 낮은 산화 상태' },
      { word: 'chlor(o)-', lang: 'Greek', meaning: '염소(Cl)' },
      { word: '-ite', lang: 'Chemistry', meaning: '낮은 산화수 산의 염(salt) 접미어' },
    ],
    original_meaning: '낮은 산화 상태의 염소 나트륨 염',
    ko_explanation:
      '차아염소산나트륨(NaOCl)으로 가정용 표백제(락스)와 같은 성분입니다. ' +
      '강력한 항균·조직 용해 작용으로 근관(신경관) 세척·소독에 사용됩니다. ' +
      '"Hypochloride"는 오타—-ide(이온)가 아닌 -ite(산의 염)가 맞는 화학 접미어입니다.',
    memory_tip:
      '"Hypo(낮은) + chlor(염소) + ite(염)" → 차아염소산염 = 락스! 근관 세척 = 치과 락스 세정.',
  },
  {
    term: 'Calcium Hydroxide',
    category: 'material',
    origin: 'Modern Chemistry',
    roots: [
      { word: 'calcium', lang: 'Latin', meaning: '석회 (calx=석회석, 칼슘의 라틴명)' },
      { word: 'hydr-', lang: 'Greek', meaning: '물(水)' },
      { word: '-oxide', lang: 'Chemistry', meaning: '산소 포함 화합물' },
    ],
    original_meaning: '수산화칼슘 — 칼슘과 물이 결합한 화합물',
    ko_explanation:
      'Ca(OH)₂, 석회유(消石灰)와 같은 화합물입니다. 강알칼리성(pH 12~13)으로 세균 억제·치수 복조(복잡 우식 처치 후 치수 보호)에 사용됩니다. ' +
      'Dycal이 대표 제품명입니다.',
    memory_tip:
      '"칼슘(뼈) + 수산화(OH)" → 강알칼리성 흰색 페이스트! 치수 덮개(liner)·근관 소독에 사용.',
  },
  {
    term: 'IRM (ZOE)',
    category: 'material',
    origin: 'Acronym + Latin',
    roots: [
      { word: 'IRM', lang: 'English', meaning: 'Intermediate Restorative Material (임시 수복재)' },
      { word: 'Zinc Oxide', lang: 'Chemistry', meaning: '산화아연 (ZnO)' },
      { word: 'Eugenol', lang: 'Neo-Latin', meaning: '정향 유래 페놀 화합물' },
    ],
    original_meaning: '임시 수복을 위한 산화아연-유게놀 시멘트',
    ko_explanation:
      'IRM = Intermediate Restorative Material의 약자입니다. ZOE(Zinc Oxide Eugenol) 시멘트로, 항균·진통 효과가 있어 최종 수복 전 임시 충전재로 사용됩니다.',
    memory_tip:
      '"IRM = 임시(Intermediate)!" 최종 치료 전의 임시 메꾸기 재료. ZOE = 산화아연 + 유게놀.',
  },

  // ── 인명 유래 (Eponym) ────────────────────────────────────────────────────

  {
    term: 'Tofflemire',
    common_typos: ['Tofflemier', 'Toflemire'],
    category: 'eponym',
    origin: 'Eponym (Person\'s name)',
    roots: [
      { word: 'Dr. William H. Tofflemire', lang: 'English', meaning: '미국 치과의사 (1902–1974)' },
    ],
    original_meaning: 'Tofflemire 박사가 발명한 매트릭스 리테이너',
    ko_explanation:
      '미국 치과의사 William H. Tofflemire 박사가 1944년경 발명한 매트릭스 밴드 고정장치입니다. ' +
      '인명에서 직접 유래한 고유명사이므로 정해진 철자가 유일합니다. ' +
      '"Tofflemier"는 흔한 오타—마지막 글자가 -re (사람 이름)이지 -er이 아닙니다.',
    memory_tip:
      '"Tofflemire = 발명가 이름!" 마지막이 "-re"로 끝나는 프랑스풍 이름. "토플마이-레" 로 발음하며 re로 끝남을 기억!',
  },
  {
    term: 'Hollenback',
    category: 'eponym',
    origin: 'Eponym (Person\'s name)',
    roots: [
      { word: 'Dr. George Hollenback', lang: 'English', meaning: '미국 치과의사 (20세기 초)' },
    ],
    original_meaning: 'Hollenback 박사가 설계한 조각기',
    ko_explanation:
      '미국 치과의사 George Hollenback 박사의 이름을 딴 아말감 조각기(Carver)입니다. ' +
      'Half-Hollenback(한쪽 날)과 Hollenback(양쪽 날) 두 종류가 있습니다.',
    memory_tip:
      '"Hollenback = 사람 이름!" 발음은 "홀렌백". Half-Hollenback은 절반(한쪽)만 날이 있다고 기억.',
  },
  {
    term: 'Woodson',
    category: 'eponym',
    origin: 'Eponym (Person\'s name)',
    roots: [
      { word: 'Dr. William Woodson', lang: 'English', meaning: '미국 치과의사' },
    ],
    original_meaning: 'Woodson 박사가 설계한 플라스틱 기구',
    ko_explanation:
      'Woodson Plastic Instrument는 복합레진·임시 수복재를 와동에 충전하고 형태를 잡는 데 사용하는 금속 기구입니다. Woodson은 설계자의 성씨입니다.',
    memory_tip:
      '"우드슨 = 사람 이름!" Woodson처럼 Wood(나무)처럼 딱딱하게 굳기 전에 재료를 다듬는 기구.',
  },

  // ── 복합어·조합어 (Compound) ──────────────────────────────────────────────

  {
    term: 'Prophylaxis / Prophy',
    category: 'compound',
    origin: 'Greek',
    roots: [
      { word: 'pro-', lang: 'Greek', meaning: '앞에, 미리, 예방하여' },
      { word: 'phylaxis (φύλαξις)', lang: 'Greek', meaning: '지킴, 보호, 경계' },
    ],
    original_meaning: '미리 막음, 예방적 보호',
    ko_explanation:
      'pro(미리) + phylaxis(지킴) = "미리 막아 지킴" = 예방. ' +
      '"Prophylaxis"는 치석 제거와 치아 연마를 통한 예방 처치 전체를 뜻하며, 줄여서 "Prophy"라고 씁니다. ' +
      '같은 어근에서 prophylactic(예방적)이 유래했습니다.',
    memory_tip:
      '"Pro(미리) + phylax(경비원)" → 치아를 미리 지키는 처치! Prophy Paste·Cup·Angle 모두 "예방 처치 용품".',
  },
  {
    term: 'Perioprobe',
    category: 'compound',
    origin: 'Greek + Latin',
    roots: [
      { word: 'peri- (περί)', lang: 'Greek', meaning: '주위, 둘레' },
      { word: 'probare', lang: 'Latin', meaning: '검사하다, 탐색하다, 증명하다' },
    ],
    original_meaning: '치주 주변을 탐색하는 도구',
    ko_explanation:
      'peri(주위) = 치주(잇몸 주위 조직) + probe(탐색기). 치주낭 깊이(probing depth)를 mm 단위로 측정하는 기구입니다.',
    memory_tip:
      '"Perio(잇몸 주위) + Probe(탐침)" → 잇몸 깊이 재는 자! 눈금 표시된 탐침으로 포켓 깊이를 측정.',
  },
  {
    term: 'Periosteal',
    category: 'compound',
    origin: 'Greek',
    roots: [
      { word: 'peri- (περί)', lang: 'Greek', meaning: '주위' },
      { word: 'osteon (ὀστέον)', lang: 'Greek', meaning: '뼈' },
      { word: '-al', lang: 'Latin', meaning: '~에 관한, ~의' },
    ],
    original_meaning: '뼈 주위(골막)에 관련된',
    ko_explanation:
      'peri(주위) + osteon(뼈) = periost(골막, 骨膜) + -al(형용사) = "골막에 관련된". ' +
      'Periosteal Elevator는 골막(뼈를 덮는 막)을 뼈에서 분리·거상하는 기구입니다. Osteology(골학), Osteoporosis(골다공증)도 같은 어근.',
    memory_tip:
      '"Peri(주위) + osteon(뼈)" → 골막 들어올리개! 뼈 위의 막을 벗기는 기구라 "골막 엘리베이터".',
  },
  {
    term: 'Cavitron',
    category: 'compound',
    origin: 'Latin + Greek',
    roots: [
      { word: 'cavitas', lang: 'Latin', meaning: '구멍, 빈 공간 (cavus=텅 빈)' },
      { word: '-tron', lang: 'Greek', meaning: '기기, 장치 (electron의 어근)' },
    ],
    original_meaning: '구강 내 구멍(치석)을 제거하는 전동 장치',
    ko_explanation:
      'Cavitron은 상표명이지만 초음파 스케일러 전체를 뜻하는 보통명사처럼 쓰입니다. ' +
      '초음파 진동(25~30kHz)으로 치아 표면의 치석을 분쇄·제거합니다.',
    memory_tip:
      '"Cavity(충치 구멍) + -tron(기계)" → 충치·치석을 없애는 기계! 부르르 떨리는 초음파 스케일러.',
  },
  {
    term: 'Hemostat',
    category: 'compound',
    origin: 'Greek',
    roots: [
      { word: 'haima (αἷμα)', lang: 'Greek', meaning: '피, 혈액' },
      { word: 'statos (στατός)', lang: 'Greek', meaning: '서 있는, 멈춰 있는' },
    ],
    original_meaning: '피를 멈추게 하는 것',
    ko_explanation:
      'haima(혈액) + statos(정지) = "출혈 정지". Hemostat 집게(Mosquito Forceps라고도 함)는 수술 중 혈관을 집어 출혈을 억제하는 잠금 집게입니다.',
    memory_tip:
      '"Hemo(피) + stat(멈춤)" → 출혈 정지 집게! 모기처럼 가늘고 섬세한 잠금 집게.',
  },
  {
    term: 'Syringe',
    category: 'compound',
    origin: 'Greek',
    roots: [
      { word: 'syrinx (σύριγξ)', lang: 'Greek', meaning: '갈대, 갈대 피리, 관(管)' },
    ],
    original_meaning: '관(管) 형태의 기구',
    ko_explanation:
      '그리스 신화의 요정 Syrinx가 갈대로 변해 목신 Pan의 피리(Pan flute)가 되었다는 이야기에서 이름이 유래합니다. ' +
      '가느다란 관 구조에서 주사기(Syringe)·Air-Water Syringe가 유래했습니다.',
    memory_tip:
      '"Syringe = 갈대 피리 모양 관(管)!" 피스톤으로 액체를 밀어내는 모든 주사기형 기구.',
  },
  {
    term: 'Matrix',
    category: 'compound',
    origin: 'Latin',
    roots: [
      { word: 'mater', lang: 'Latin', meaning: '어머니' },
      { word: '-trix', lang: 'Latin', meaning: '~하는 것(여성·사물을 나타내는 접미어)' },
    ],
    original_meaning: '생성의 근원, 틀, 자궁',
    ko_explanation:
      'mater(어머니)에서 파생한 matrix는 "생성의 틀"을 의미합니다. 수학의 행렬(Matrix), 영화 제목도 같은 어원입니다. ' +
      '치과에서 Matrix Band는 인접면 수복 시 치아 옆면의 "틀(형틀)"을 만들어 수복재가 새지 않게 합니다.',
    memory_tip:
      '"Matrix = 틀, 형틀!" 영화 매트릭스처럼 치아 옆을 감싸는 금속 틀. Tofflemire + Matrix Band = 완벽한 인접면 수복 세트.',
  },
  {
    term: 'Articulating (Paper)',
    category: 'compound',
    origin: 'Latin',
    roots: [
      { word: 'articulare', lang: 'Latin', meaning: '관절로 연결하다, 명확히 표현하다' },
      { word: 'articulus', lang: 'Latin', meaning: '관절, 이음매 (artus=사지)' },
    ],
    original_meaning: '(치아) 접촉 관절 부위를 표시하는',
    ko_explanation:
      'articulus(관절·이음매)에서 "교합 접촉점"이라는 의미로 전용되었습니다. ' +
      'Articulating Paper는 상·하악 치아가 맞닿는 "관절(접촉) 지점"을 색상으로 표시해 교합 조정 시 사용합니다.',
    memory_tip:
      '"Articulate(발음하다/연결하다) + Paper" → 치아가 만나는 점을 "말해주는" 종이! 빨간 자국이 교합 고점.',
  },
  {
    term: 'Spatula',
    category: 'compound',
    origin: 'Latin / Greek',
    roots: [
      { word: 'spatha', lang: 'Latin', meaning: '넓적한 날, 납작한 검' },
      { word: 'spathe (σπάθη)', lang: 'Greek', meaning: '넓고 납작한 칼날' },
    ],
    original_meaning: '납작하고 넓은 칼 모양 도구',
    ko_explanation:
      '요리용 스패튤라, 화학 실험용 스패튤라와 완전히 같은 어원입니다. ' +
      '치과 Mixing Spatula는 납작하고 유연한 날로 알지네이트·시멘트·인상재 등을 혼합하는 데 사용됩니다.',
    memory_tip:
      '"스패튤라 = 요리용 뒤집개와 같은 어원!" 납작한 날로 재료를 섞는 기구.',
  },

  // ── 접두어·접미어 (Prefix) ────────────────────────────────────────────────

  {
    term: 'peri- (περί)',
    category: 'prefix',
    origin: 'Greek',
    roots: [{ word: 'peri', lang: 'Greek', meaning: '주위, 둘레, ~을 둘러싸고' }],
    original_meaning: '주위, 주변',
    ko_explanation:
      '치주 관련 용어에 광범위하게 쓰이는 접두어입니다. ' +
      'Periodontal(치주의), Periosteal(골막의), Perioprobe(치주 탐침), Periapical(치근단 주위)이 모두 peri-로 시작합니다.',
    memory_tip:
      '"Peri = 주위!" Perimeter(둘레), Peripheral(주변부)—모두 같은 peri-. 치과에서 peri-가 나오면 "잇몸·뼈 주변"을 떠올리세요.',
  },
  {
    term: 'endo- (ἔνδον)',
    category: 'prefix',
    origin: 'Greek',
    roots: [{ word: 'endon', lang: 'Greek', meaning: '내부, 안쪽' }],
    original_meaning: '안쪽, 내부',
    ko_explanation:
      'Endodontics(신경치료, 치수 내부 치료), Endofile(근관 파일) 등에 사용됩니다. ' +
      'Endoscope(내시경), Endocrine(내분비)도 같은 endo-.',
    memory_tip:
      '"Endo = 내부(Inside)!" 신경치료는 치아 내부(endo) 치료—Endodontics.',
  },
  {
    term: '-oid (-οειδής)',
    category: 'prefix',
    origin: 'Greek',
    roots: [{ word: '-oeides / -oid', lang: 'Greek', meaning: '~처럼 생긴, ~모양의' }],
    original_meaning: '~모양',
    ko_explanation:
      'Discoid(원반 모양), Cleoid(갈고리 모양). 의학 전반에서 Humanoid(인간형), Hemorrhoid(치질, 정맥 혈관 모양)도 같은 접미어입니다.',
    memory_tip:
      '"-oid = ~모양!" Android(인간 모양 로봇)처럼 치과 기구 형태를 묘사할 때 씁니다.',
  },
  {
    term: '-ette',
    category: 'prefix',
    origin: 'French',
    roots: [{ word: '-ette', lang: 'French', meaning: '작은 것, 소형판' }],
    original_meaning: '소형',
    ko_explanation:
      'Curette(작은 긁개), Cigarette(작은 담배), Kitchenette(작은 부엌). 프랑스어에서 차용된 소형 접미어입니다.',
    memory_tip:
      '"-ette = 소형!" Curette = Cure의 작은 버전 → 작은 치료 긁개.',
  },
  {
    term: 'hypo- (ὑπό)',
    category: 'prefix',
    origin: 'Greek',
    roots: [{ word: 'hypo', lang: 'Greek', meaning: '아래, 부족, 낮은 (상태)' }],
    original_meaning: '아래, 낮은 수준',
    ko_explanation:
      'Hypochlorite(차아염소산염—낮은 산화수의 염소 화합물), Hypodontia(치아 결손), Hypodermic(피하의). ' +
      'Hyper-(과도)와 반대입니다.',
    memory_tip:
      '"Hypo = 낮은/아래!" Hypo vs Hyper: Hypo는 부족·아래, Hyper는 과도·위. Hypochlorite = 낮은 산화 염소 = 락스.',
  },
];
