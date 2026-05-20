// ─── 어원 용어별 일러스트 & 여성 친화 연상 데이터 ─────────────────────────────

export interface EtymIllustration {
  termKo: string;         // 영어 용어의 한글 발음 표기
  emoji: string;          // 대표 이모지
  altEmoji?: string;      // 보조 이모지
  koScene: string;        // 시각적 장면 묘사 (한글)
  femaleAnalogy: string;  // 쉬운 연상 (비유, 한글)
  accentColor: string;    // 카드 포인트 색상 (CSS)
}

export const ETYMOLOGY_ILLUSTRATIONS: Record<string, EtymIllustration> = {

  // ── 형태 묘사어 ─────────────────────────────────────────────────────────────

  'Discoid': {
    termKo: '디스코이드',
    emoji: '💿',
    koScene: 'CD처럼 납작하고 완전히 둥근 원반 모양',
    femaleAnalogy:
      '파운데이션 컴팩트 뚜껑을 옆에서 보면 납작하고 완전히 둥글죠? ' +
      'Discoid Carver 팁이 바로 그 형태! ' +
      'Disc(원반) + -oid(모양) = 원반형 팁으로 치아 교합면을 정밀하게 조각합니다. ' +
      '오타 "Discloid"는 없는 단어 — l을 빼고 disc처럼 쓰세요!',
    accentColor: '#6366f1',
  },

  'Cleoid': {
    termKo: '클레오이드',
    emoji: '🗝️',
    altEmoji: '🪝',
    koScene: '빈티지 열쇠 끝처럼 갈고리 모양으로 굽어 있는',
    femaleAnalogy:
      '귀걸이 후크(C형 귀걸이 고리)가 갈고리처럼 굽어 있듯이, ' +
      'Cleoid 팁도 끝이 뾰족하게 구부러진 갈고리 모양이에요. ' +
      '그리스어 kleis(열쇠·갈고리) + -oid(모양) = 갈고리형 팁. ' +
      '오타 "Celoid" 주의 — Cl-e-oid, e를 빠뜨리지 마세요!',
    accentColor: '#8b5cf6',
  },

  'Beavertail': {
    termKo: '비버테일',
    emoji: '🦫',
    koScene: '비버의 납작하고 넓적한 꼬리 — 자연이 만든 완벽한 블렌딩 도구',
    femaleAnalogy:
      '아이섀도우 블렌딩 브러시의 납작하고 넓적한 팁처럼! ' +
      '비버 꼬리는 자연계에서 가장 납작하고 넓적한 형태 중 하나예요. ' +
      'Beavertail Burnisher·Carver의 팁이 이 모양을 닮아 치아 옆면(협·설면)을 쓸어주기에 딱입니다. ' +
      'Burnisher(연마)와 Carver(조각)의 차이만 구분하면 OK!',
    accentColor: '#92400e',
  },

  'Acorn': {
    termKo: '에이컨',
    emoji: '🌰',
    koScene: '작고 통통하게 튀어나온 도토리 — 치아 홈 속에 꼭 맞는 크기',
    femaleAnalogy:
      '립글로스 볼 어플리케이터처럼 작고 둥글게 돌출된 팁! ' +
      '치아 교합면의 작은 홈(pit)에 쏙 들어가 연마하기에 딱 맞는 크기. ' +
      '도토리 모양을 생각하면 Acorn Burnisher의 통통한 팁 모양이 바로 그려집니다.',
    accentColor: '#d97706',
  },

  'Football': {
    termKo: '풋볼',
    emoji: '🏉',
    koScene: '미식축구공처럼 양 끝이 가늘고 가운데가 볼록한 타원형',
    femaleAnalogy:
      '눈썹 모양처럼 양 끝이 가늘고 가운데가 도톰한 타원! ' +
      '미국에서 "Football"은 미식축구공(럭비공 모양)을 뜻해요. ' +
      'Football Burnisher의 타원형 팁이 넓은 교합면을 한 번에 연마하기 좋습니다.',
    accentColor: '#b45309',
  },

  // ── 기능 파생어 ─────────────────────────────────────────────────────────────

  'Burnisher': {
    termKo: '버니셔',
    emoji: '💅',
    altEmoji: '✨',
    koScene: '네일 버핑 — 손톱을 부드럽게 문질러 반짝반짝 광택 내기',
    femaleAnalogy:
      '네일샵 마무리 단계에서 손톱에 버핑(buffing) 광택 코팅하듯 아말감 표면을 문질러 반짝이게! ' +
      '프랑스어 brunir(갈고 닦아 빛나게 하다)에서 "burnish(광택내다)"가 유래했어요. ' +
      '네일 버퍼와 Dental Burnisher는 "문질러서 매끄럽게" 한다는 원리가 완전히 같습니다!',
    accentColor: '#db2777',
  },

  'Carver': {
    termKo: '카버',
    emoji: '🎨',
    altEmoji: '🖼️',
    koScene: '점토가 굳기 전 조각가가 세밀하게 형태를 다듬는 모습',
    femaleAnalogy:
      '공예점토(클레이 아트)로 미니어처를 만들 때 날카로운 도구로 세밀하게 깎듯이! ' +
      '아말감이 굳기 전 황금 타임에 치아 형태를 Carver로 조각합니다. ' +
      '조각가를 뜻하는 Sculptor와 Scalpel(메스)도 같은 어근 "scalpere(긁다)"에서 왔어요.',
    accentColor: '#7c3aed',
  },

  'Condenser': {
    termKo: '컨덴서',
    emoji: '🍱',
    altEmoji: '👊',
    koScene: '도시락 반찬을 빈틈 없이 꽉꽉 눌러 담는 것처럼',
    femaleAnalogy:
      '도시락 통에 밥을 담을 때 주걱으로 꾹꾹 눌러 빈틈 없이 채우듯! ' +
      'Condenser는 아말감을 와동 속에 다져 공극 없이 채워 넣는 기구예요. ' +
      'Con(함께) + densare(압축) = 꽉꽉 다짐기. 물리학의 콘덴서(전하 압축 저장)와 같은 어원!',
    accentColor: '#0891b2',
  },

  'Explorer': {
    termKo: '익스플로러',
    emoji: '🔍',
    altEmoji: '🕵️‍♀️',
    koScene: '탐정이 돋보기로 단서를 찾듯 — 숨겨진 우식을 촉각으로 탐지',
    femaleAnalogy:
      '스킨케어 전 에센스를 피부에 바르며 피부결을 손끝으로 꼼꼼히 확인하듯! ' +
      'Explorer 끝이 우식 부위에 "걸리는" 느낌으로 충치를 발견합니다. ' +
      'ex-(밖으로) + plorare(찾다) = "나가서 찾아내는 기구".',
    accentColor: '#0369a1',
  },

  'Excavator': {
    termKo: '익스카베이터',
    emoji: '🏗️',
    altEmoji: '🥄',
    koScene: '미니 굴착기가 부드러운 흙을 퍼내듯 — Spoon 모양 팁으로 연화 우식 제거',
    femaleAnalogy:
      '피부 관리 시 팩을 스패튤라로 퍼내듯 치아 속 연화 우식(물렁물렁해진 충치)을 숟가락 팁으로 퍼냅니다! ' +
      '건설 현장의 포크레인 = Excavator, 치과의 Spoon Excavator도 완전히 같은 어원. ' +
      'ex-(밖으로) + cavare(파다) = "파내는 도구".',
    accentColor: '#b45309',
  },

  'Elevator': {
    termKo: '엘리베이터',
    emoji: '🛗',
    altEmoji: '⬆️',
    koScene: '건물 엘리베이터처럼 아래에서 위로 부드럽게 들어올리는',
    femaleAnalogy:
      '하이힐이 발뒤꿈치를 들어올리듯, Elevator는 치아 뿌리를 소켓에서 서서히 들어올려 발치를 돕습니다! ' +
      'e-(위로) + levare(들다) = "위로 들어올리는 기구". ' +
      '건물 Elevator와 100% 같은 어원이라 직관적으로 기억하기 쉬워요.',
    accentColor: '#0284c7',
  },

  'Forceps': {
    termKo: '포셉스',
    emoji: '🥢',
    altEmoji: '🍡',
    koScene: '요리용 트위저·젓가락 — 정확하게 집고 잡는 도구',
    femaleAnalogy:
      '요리 플레이팅할 때 쓰는 핀셋형 트위저처럼! ' +
      '원래 대장장이가 뜨거운 쇠를 집던 집게에서 유래했어요. ' +
      'formus(뜨거운) + capere(잡다) = "뜨거운 것을 잡는 집게". ' +
      'Cotton Forceps(솜 집게), Extraction Forceps(발치 집게) 모두 같은 뿌리!',
    accentColor: '#dc2626',
  },

  'Curette': {
    termKo: '큐렛',
    emoji: '💆',
    altEmoji: '🛁',
    koScene: '스파 딥클렌징 — 모공 속 묵은 각질·노폐물을 부드럽게 긁어내는',
    femaleAnalogy:
      '피부 관리 시 딥클렌징으로 모공 속 노폐물을 긁어내듯, 잇몸 속 치석·오염 백악질을 Curette으로 제거해요! ' +
      '네일 케어 큐티클 밀개와도 비슷한 원리. ' +
      '프랑스어 curer(긁다·청소) + -ette(소형) = "작은 긁개". ' +
      'Curette = Cure(치료)의 소형 도구라고 기억!',
    accentColor: '#0891b2',
  },

  'Scalpel': {
    termKo: '스칼펠',
    emoji: '✂️',
    altEmoji: '🪡',
    koScene: '재봉 리퍼(실밥 뜯개)처럼 정밀하게 절개하는 날카로운 작은 칼',
    femaleAnalogy:
      '패브릭 커팅이나 종이 공예의 커터나이프·리퍼처럼 정밀하게! ' +
      '조각가(Sculptor)도 같은 어원 scalpere(긁다·새기다)에서 왔어요. ' +
      'scalpere → scalpellum(작은 조각칼) → Scalpel. ' +
      '수술용 메스 날을 끼우는 Scalpel Handle이 구강외과 수술에 사용됩니다.',
    accentColor: '#64748b',
  },

  // ── 재료·화학 용어 ───────────────────────────────────────────────────────────

  'Alginate': {
    termKo: '알지네이트',
    emoji: '🌿',
    altEmoji: '🧖',
    koScene: '바다 속 미역·다시마 — 알지네이트의 천연 원료',
    femaleAnalogy:
      '피부 미용 해조류 마스크팩과 같은 성분이에요! ' +
      '다시마에서 추출한 알긴산 나트륨이 물과 만나면 젤리처럼 탱탱하게 굳어 치아 인상을 뜹니다. ' +
      'alga(해조류) + -inate(화학 접미어) = 해조류 유래 인상재. ' +
      '오타 "Alignate" 주의 — 해조류(alga)에서 왔으니 alg-inate!',
    accentColor: '#059669',
  },

  'Amalgam': {
    termKo: '아말감',
    emoji: '⚗️',
    altEmoji: '🎨',
    koScene: '아랍 연금술사가 신비한 금속들을 혼합하는 — 은빛 합금의 탄생',
    femaleAnalogy:
      '아이섀도우 팔레트에서 여러 색을 블렌딩 팔레트에 섞듯 금속을 혼합! ' +
      '수은 + 은·주석·구리 분말을 캡슐에 넣고 혼합하면 은색 충전재가 됩니다. ' +
      '아랍어 al-malgham(연화제)에서 유래한 단어 — 연금술의 흔적이 치과에 남아 있어요!',
    accentColor: '#475569',
  },

  'Eugenol': {
    termKo: '유지놀',
    emoji: '🌸',
    altEmoji: '🕯️',
    koScene: '정향꽃 에센셜 오일 — 아로마테라피의 강한 항균 향',
    femaleAnalogy:
      '디퓨저나 향수에 사용되는 정향(Clove) 에센셜 오일이 바로 Eugenol! ' +
      '아로마테라피에서 강한 항균·진정 향으로 유명한 그 성분이 치과 시멘트(ZOE)에도 쓰여요. ' +
      '치과의 특유한 향이 바로 Eugenol 냄새 — 이제 익숙해질 것 같지 않나요?',
    accentColor: '#db2777',
  },

  'Gutta Percha': {
    termKo: '구타 퍼차',
    emoji: '🌴',
    altEmoji: '🧤',
    koScene: '말레이시아 열대 정글의 퍼차 나무 수액 — 천연 고무의 원조',
    femaleAnalogy:
      '실리콘 이어폰 팁처럼 유연하고 탄성 있는 천연 고무 재료! ' +
      '말레이어 getah(수액) + perca(퍼차 나무) = "퍼차 나무 수액". ' +
      '19세기 의료·전선 절연재로 활용되다 신경치료(근관 충전 포인트) 재료가 되었어요.',
    accentColor: '#16a34a',
  },

  'IRM (ZOE)': {
    termKo: '아이알엠 (지오이)',
    emoji: '🩹',
    altEmoji: '💊',
    koScene: '임시 반창고 — 최종 치료 준비 중 치아를 보호하는 임시 충전재',
    femaleAnalogy:
      'BB크림이 완벽한 파운데이션 전 피부를 임시 보호하듯! ' +
      'IRM(Intermediate Restorative Material) = 임시 수복재. ' +
      'ZOE(산화아연 + 유게놀)로 만들어 항균·진통 효과가 있어 최종 치료 전 임시로 치아를 채워줍니다.',
    accentColor: '#d97706',
  },

  'Chlorhexidine': {
    termKo: '클로르헥시딘',
    emoji: '🧪',
    altEmoji: '🫧',
    koScene: '정밀 화학의 항균 솔루션 — 세균 세포막을 파괴하는 살균제',
    femaleAnalogy:
      '항균 핸드젤처럼 세균을 효과적으로 제거하는 살균제! ' +
      'Chlor(염소) + hex(6) + idine(화합물) = 염소 6각형 구조 살균제. ' +
      '0.12% 클로르헥시딘 구강세정제는 잇몸 치료 후 병원균 억제에 사용합니다. ' +
      '오타 "Chlorohexidine" 주의 — 중간에 o를 넣지 마세요!',
    accentColor: '#0891b2',
  },

  'Sodium Hypochlorite': {
    termKo: '소디움 하이포클로라이트',
    emoji: '🧴',
    altEmoji: '💧',
    koScene: '욕실 락스 한 병 — 강력한 소독·표백 성분',
    femaleAnalogy:
      '욕실 곰팡이 제거에 쓰는 락스와 동일 성분! ' +
      'NaOCl(차아염소산나트륨)을 희석(0.5~5.25%)하여 근관(신경관) 세척·소독에 사용합니다. ' +
      'Hypo(낮은 산화수) + chlor(염소) + ite(염) = 치과용 락스. ' +
      '오타 "Hypochloride" 주의 — -ite(염)가 맞고 -ide(이온)가 아닙니다!',
    accentColor: '#0369a1',
  },

  'Calcium Hydroxide': {
    termKo: '칼슘 하이드록사이드',
    emoji: '🤍',
    altEmoji: '🦷',
    koScene: '흰 석회 분말 — 강알칼리성으로 세균 억제 & 치수 보호',
    femaleAnalogy:
      '흰색 마스크팩이 피부를 진정시키듯, Calcium Hydroxide는 치수(신경) 위에 바르면 강알칼리 환경으로 세균을 억제하고 2차 상아질 형성을 자극! ' +
      'Calcium(칼슘) + Hydroxide(수산화) = Ca(OH)₂ = 수산화칼슘 = 치과 진정제. ' +
      'Dycal이 대표 브랜드 이름이에요.',
    accentColor: '#94a3b8',
  },

  // ── 인명 유래 ────────────────────────────────────────────────────────────────

  'Tofflemire': {
    termKo: '토플마이어',
    emoji: '🏆',
    altEmoji: '🎖️',
    koScene: '발명가 Tofflemire 박사 — 치과를 바꾼 매트릭스 리테이너의 창시자',
    femaleAnalogy:
      '샤넬 No.5가 디자이너 코코 샤넬의 이름처럼, Tofflemire Retainer도 발명가의 성씨! ' +
      '1944년 Dr. William H. Tofflemire가 고안한 매트릭스 밴드 고정기로, 인접면 수복 시 필수 도구가 되었습니다. ' +
      '오타 "Tofflemier" 주의 — 끝이 -re (사람 이름의 프랑스식 어미)!',
    accentColor: '#d97706',
  },

  'Hollenback': {
    termKo: '홀렌백',
    emoji: '🎖️',
    koScene: 'Hollenback 박사 — 아말감 조각기를 설계한 20세기 치과의사',
    femaleAnalogy:
      '명품 가방에 디자이너 이름이 붙듯! Hollenback Carver = 설계한 치과의사 Hollenback 박사의 성씨. ' +
      'Half-Hollenback(한쪽 날)과 Hollenback(양쪽 날) 두 버전이 있어요.',
    accentColor: '#b45309',
  },

  'Woodson': {
    termKo: '우드슨',
    emoji: '🌳',
    koScene: 'Woodson 박사 — 이름이 플라스틱 기구에 새겨진 치과 역사의 일부',
    femaleAnalogy:
      '조각가 이름이 작품에 새겨지듯 Woodson 박사의 이름이 기구에 살아남았어요! ' +
      'Woodson Plastic Instrument는 복합레진·임시 수복재를 와동에 충전하고 형태를 잡는 납작한 금속 기구.',
    accentColor: '#166534',
  },

  // ── 복합·조합어 ───────────────────────────────────────────────────────────────

  'Prophylaxis / Prophy': {
    termKo: '프로필락시스 / 프로피',
    emoji: '🛡️',
    altEmoji: '🌟',
    koScene: '예방 방패 — 충치·잇몸병을 미리 막아주는 정기 치과 클리닝',
    femaleAnalogy:
      'SPF 선크림이 자외선으로부터 피부를 미리 보호하듯! ' +
      'Prophylaxis(프로피)는 치석·세균을 제거해 충치·잇몸병을 예방하는 정기 클리닝이에요. ' +
      'pro-(미리) + phylaxis(지킴) = "미리 막아 지킴". ' +
      'Prophy Paste·Cup·Angle 모두 "예방 클리닝" 도구 세트!',
    accentColor: '#7c3aed',
  },

  'Perioprobe': {
    termKo: '페리오프로브',
    emoji: '📏',
    altEmoji: '🔬',
    koScene: '잇몸 포켓 깊이를 mm 단위로 재는 초정밀 자',
    femaleAnalogy:
      '눈썹 길이를 자로 정확히 재듯 잇몸 건강을 정밀하게 측정! ' +
      '눈금(1·2·3·5·7·8·9·10mm)이 표시된 탐침으로 잇몸 주머니(포켓) 깊이를 재어 잇몸 건강 상태를 진단합니다. ' +
      'peri-(잇몸 주위) + probe(탐침) = "잇몸 주위 탐측기".',
    accentColor: '#0891b2',
  },

  'Periosteal': {
    termKo: '페리오스티얼',
    emoji: '🦴',
    altEmoji: '🌸',
    koScene: '뼈를 덮은 골막을 과일 껍질 벗기듯 조심스럽게 들어올리는',
    femaleAnalogy:
      '젤 네일 리무버로 큐티클을 부드럽게 밀어내듯! ' +
      '골막(뼈를 싸고 있는 얇은 막)을 Periosteal Elevator로 들어올려 발치·임플란트 시야를 확보합니다. ' +
      'peri-(주위) + osteon(뼈) + -al(형용사) = 골막 기구.',
    accentColor: '#d97706',
  },

  'Cavitron': {
    termKo: '캐비트론',
    emoji: '⚡',
    altEmoji: '🔊',
    koScene: '초음파 진동으로 치석을 분쇄하는 전동 스케일러',
    femaleAnalogy:
      '초음파 클렌저(진동 세안기)가 피부 모공 속 노폐물을 진동으로 제거하듯! ' +
      '초음파 진동(25~30kHz)으로 치아 표면의 치석을 분쇄·제거하는 전동 스케일러. ' +
      'cavitas(구멍, 치아 구조) + -tron(기기) = "치아 내 구조를 다루는 장치". ' +
      'Cavitron은 상표명이지만 초음파 스케일러의 대명사가 되었어요.',
    accentColor: '#6366f1',
  },

  'Hemostat': {
    termKo: '헤모스탯',
    emoji: '🩸',
    altEmoji: '🔒',
    koScene: '출혈 차단 잠금 집게 — 혈관을 집어 잠가 피를 멈추게 하는',
    femaleAnalogy:
      '머리끈으로 포니테일을 묶어 혈류를 잠시 압박하는 것처럼! ' +
      'Hemostat 잠금 집게로 혈관을 집어 출혈을 차단합니다. ' +
      'haima(피) + statos(멈춤) = "출혈 정지 집게". ' +
      'Mosquito Forceps라고도 불려요 — 모기처럼 가늘고 섬세한 잠금 집게.',
    accentColor: '#be123c',
  },

  'Syringe': {
    termKo: '시린지',
    emoji: '🪈',
    altEmoji: '💉',
    koScene: '그리스 신화의 갈대 피리 — 속이 빈 관(管) 구조의 기원',
    femaleAnalogy:
      '아이라이너 리퀴드 펜처럼 속이 빈 가느다란 관으로 액체를 정확하게 전달! ' +
      '요정 Syrinx가 갈대로 변해 피리(syrinx/panpipes)가 된 신화에서 주사기 이름이 유래했어요. ' +
      'Air-Water Syringe, Irrigating Syringe, 주사기 — 모두 "속 빈 관"이라는 하나의 뿌리!',
    accentColor: '#7c3aed',
  },

  'Matrix': {
    termKo: '매트릭스',
    emoji: '🎬',
    altEmoji: '✂️',
    koScene: '옷 패턴지처럼 원하는 형태로 굳히는 형틀 — 영화 매트릭스와 같은 어원',
    femaleAnalogy:
      '옷을 만들 때 패턴지(다시다 패턴)가 형태를 잡아주듯! ' +
      'Matrix Band는 치아 인접면 수복 시 "형틀(틀)"을 만들어 레진·아말감이 치아 모양대로 굳도록 합니다. ' +
      'mater(어머니) → matrix(생성의 틀) = 영화 매트릭스·수학 행렬·치과 매트릭스 모두 같은 어원이에요!',
    accentColor: '#0f172a',
  },

  'Articulating (Paper)': {
    termKo: '아티큘레이팅 (페이퍼)',
    emoji: '🎯',
    altEmoji: '💋',
    koScene: '립스틱 각도를 확인하듯 교합 접촉 고점을 컬러로 표시하는',
    femaleAnalogy:
      '립스틱을 화장지에 찍어 잘못 묻은 부분을 확인하듯! ' +
      '빨간/파란 Articulating Paper를 치아 사이에 물면 교합이 높은 부분에 색 자국이 남아 교합 조정이 쉬워집니다. ' +
      'articulare(관절로 연결) → "치아가 관절처럼 맞닿는 점을 표시하는 종이".',
    accentColor: '#dc2626',
  },

  'Spatula': {
    termKo: '스패튤라',
    emoji: '🍰',
    altEmoji: '🎂',
    koScene: '케이크 아이싱 스패튤라 — 부드럽고 균일하게 재료를 혼합·도포',
    femaleAnalogy:
      '케이크 크림을 스패튤라로 고르게 펴 바르듯! ' +
      '치과 Mixing Spatula는 알지네이트·인상재·시멘트를 거품 없이 균일하게 혼합할 때 사용합니다. ' +
      '요리용 스패튤라와 어원이 완전히 같아요 — spatha(납작하고 넓은 칼날, Latin). ' +
      '치과에서도 주방에서도 "납작하게 펴 섞는 도구"!',
    accentColor: '#d97706',
  },

  // ── 접두·접미어 (시각 설명 위주) ────────────────────────────────────────────

  'peri- (페리)': {
    termKo: '페리-',
    emoji: '🔄',
    koScene: '링처럼 주위를 감싸는 — peri-는 "둘레·주변"을 뜻하는 그리스어 접두어',
    femaleAnalogy:
      'Perimeter(둘레), Peripheral(주변부) — 모두 peri-. ' +
      '치과에서 peri-가 나오면 "잇몸·뼈 주변"을 연상하세요. ' +
      'Periodontal(치주의), Periosteal(골막의), Perioprobe(치주 탐침) — 세 단어 모두 같은 peri-!',
    accentColor: '#6366f1',
  },

  'endo- (엔돈)': {
    termKo: '엔도-',
    emoji: '🔬',
    koScene: '내부 깊숙이 — endo-는 "안쪽·내부"를 뜻하는 그리스어 접두어',
    femaleAnalogy:
      'Endoscope(내시경), Endocrine(내분비), Endodontics(신경치료) — 모두 endo-. ' +
      '"Endo = 내부(Inside)" 하나만 기억하면 치과·의학 단어가 쭉 풀립니다!',
    accentColor: '#0891b2',
  },

  '-oid (오에이데스)': {
    termKo: '-오이드',
    emoji: '🔷',
    koScene: '원형(모양)에서 "-oid" 접미어가 붙어 "~모양"을 나타냄',
    femaleAnalogy:
      'Android(인간형 로봇), Humanoid(인간 모양) — 모두 -oid. ' +
      '치과에서: Discoid(원반 모양), Cleoid(갈고리 모양) — 형태를 설명하는 접미어!',
    accentColor: '#6366f1',
  },

  '-ette': {
    termKo: '-엣',
    emoji: '🎀',
    koScene: '미니·소형을 나타내는 프랑스어 접미어 — 작고 귀여운 버전',
    femaleAnalogy:
      'Cigarette(작은 담배), Kitchenette(작은 부엌), Curette(작은 긁개)! ' +
      '-ette는 프랑스어에서 "소형·귀여운 것"을 뜻해요. ' +
      'Curette = Cure(치료)의 소형 버전 → 작고 정밀한 치료 기구.',
    accentColor: '#db2777',
  },

  'hypo- (휘포)': {
    termKo: '하이포-',
    emoji: '⬇️',
    altEmoji: '📉',
    koScene: '아래 방향 화살표 — hypo-는 "아래·부족·낮은 수준"을 나타냄',
    femaleAnalogy:
      '저혈당(Hypoglycemia), 저체온증(Hypothermia) — "Hypo = 낮은"! ' +
      'Hypochlorite = 낮은 산화수 염소 화합물 = 치과 락스. ' +
      'Hyper(과도·높음)와 반대라고 기억하면 쉬워요.',
    accentColor: '#64748b',
  },
};
