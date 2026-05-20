/**
 * 치과 기구 한국어 번역 데이터
 * pronunciation : 영어 발음 (한글 음차)
 * name          : 한국어 명칭 (의학 용어)
 * function      : 기능 설명 (한국어)
 * characteristics: 특징 설명 (한국어)
 * hint          : 암기 힌트
 */

// ─── 섹션(목차) 한국어 데이터 ─────────────────────────────────────────────

export type KoSectionData = {
  pronunciation: string;
  name: string;
  hint?: string;
};

export const KO_SECTIONS: Record<string, KoSectionData> = {
  'basic-instruments': {
    pronunciation: '베이직 덴탈 인스트루먼츠 앤 서플라이즈',
    name: '기초 치과 기구 및 용품',
    hint: '모든 치과 술식에 기본으로 사용되는 기구들의 모음',
  },
  'basic-tray': {
    pronunciation: '베이직 트레이 셋업',
    name: '기본 트레이 셋업',
    hint: '가장 기본적인 구강 검사용 트레이 구성',
  },
  'prophy-srp-instruments': {
    pronunciation: '인스트루먼츠 앤 서플라이즈 포 프로피 앤 에스알피',
    name: '예방 처치 및 SRP 기구 및 용품',
    hint: '치석 제거·치근 활택술에 사용하는 기구들',
  },
  'prophylaxis-tray': {
    pronunciation: '프로필랙시스 트레이 셋업',
    name: '예방 처치(프로피) 트레이 셋업',
    hint: '치석 제거·치면 세마에 사용하는 트레이',
  },
  'srp-tray': {
    pronunciation: '에스알피 트레이 셋업',
    name: '치석 제거 및 치근 활택술 트레이 셋업',
    hint: 'SRP = Scaling & Root Planing. 치주 질환 치료의 핵심 술식',
  },
  'operative-instruments': {
    pronunciation: '오퍼레이티브 인스트루먼츠 앤 서플라이즈',
    name: '수복 치과 기구 및 용품',
    hint: '충치 치료(아말감·복합 레진) 수복에 사용하는 기구',
  },
  'amalgam-tray': {
    pronunciation: '아말감 트레이 셋업',
    name: '아말감 트레이 셋업',
    hint: '금속 충전재인 아말감 수복 시 사용하는 트레이',
  },
  'rubber-dam-tray': {
    pronunciation: '러버 댐 트레이 셋업',
    name: '러버댐 트레이 셋업',
    hint: '치아를 격리하여 타액·혈액 오염 방지에 사용',
  },
  'composite-tray': {
    pronunciation: '컴포지트 트레이 셋업',
    name: '복합 레진 트레이 셋업',
    hint: '심미 수복재인 복합 레진(콤포짓) 충전 시 사용하는 트레이',
  },
  'xray-instruments': {
    pronunciation: '엑스레이 인스트루먼츠',
    name: 'X선 촬영 기구',
    hint: '방사선 사진 촬영에 사용하는 기구·필름·센서',
  },
  'surgical-instruments': {
    pronunciation: '유니버셜 서지컬 인스트루먼츠',
    name: '범용 구강외과 기구',
    hint: '봉합·발치 등 외과 술식에 공통으로 사용하는 기구',
  },
  'suture-tray': {
    pronunciation: '수처 트레이 셋업',
    name: '봉합 트레이 셋업',
    hint: '외과 술식 후 조직 봉합에 사용하는 트레이',
  },
  'suture-removal-tray': {
    pronunciation: '수처 리무벌 트레이 셋업',
    name: '봉합사 제거 트레이 셋업',
    hint: '봉합 후 일정 기간이 지나 실밥을 제거하는 트레이',
  },
  'extraction-instruments': {
    pronunciation: '익스트랙션 인스트루먼츠',
    name: '발치 기구',
    hint: '치아를 발거(뽑기)할 때 사용하는 기구',
  },
  'extraction-tray': {
    pronunciation: '익스트랙션 트레이 셋업',
    name: '발치 트레이 셋업',
    hint: '발치 술식에 필요한 모든 기구가 담긴 트레이',
  },
  'burs': {
    pronunciation: '버즈',
    name: '버 (드릴 비트)',
    hint: '핸드피스에 장착해 치아·뼈를 삭제·형성하는 소형 회전 기구',
  },
  'pulpotomy-tray': {
    pronunciation: '펄포토미 / 오픈 앤 메드 트레이 셋업',
    name: '치수 절제 및 처치 트레이 셋업',
    hint: 'Pulpotomy = 치수 절제술. 유치(젖니) 신경 치료 또는 응급 개방 처치',
  },
  'root-canal-tray': {
    pronunciation: '루트 커낼 트레이 셋업',
    name: '근관 치료 트레이 셋업',
    hint: '신경 치료(Root Canal Treatment)에 사용하는 트레이',
  },
  'dry-socket-tray': {
    pronunciation: '드라이 소켓 트레이 셋업',
    name: '건성 발치와 트레이 셋업',
    hint: '발치 후 혈병이 형성되지 않아 치조골이 노출된 합병증 처치',
  },
  'full-denture-tray': {
    pronunciation: '풀 덴처 알지네이트 임프레션 트레이 셋업',
    name: '완전 의치 알지네이트 인상 트레이 셋업',
    hint: '무치악 환자의 인상 채득에 사용. 알지네이트는 고무 같은 인상재',
  },
  'crown-prep-tray': {
    pronunciation: '크라운 프렙 트레이 셋업',
    name: '크라운(치관) 준비 트레이 셋업',
    hint: '치아를 크라운으로 덮기 위한 지대치 형성 시 사용하는 트레이',
  },
};

// ─── 기구 한국어 데이터 ────────────────────────────────────────────────────

export type KoInstrumentData = {
  pronunciation: string;
  name: string;
  function?: string;
  characteristics?: string;
  hint?: string;
};

/**
 * 키: 기구 이름 소문자 + trim
 * 매칭: lookupInstrumentKo() 함수가 부분 일치도 처리
 */
export const KO_INSTRUMENTS: Record<string, KoInstrumentData> = {
  'dental tray': {
    pronunciation: '덴탈 트레이',
    name: '치과용 트레이',
    function: '기구를 올려 놓기 위한 작업 공간 제공',
    characteristics: '술식에 따라 다양한 디자인(위생 트레이, 수복 트레이, 외과 트레이 등)',
    hint: '트레이는 기구들의 "집"이에요. 술식마다 다른 모양의 집!',
  },
  'mouth mirror': {
    pronunciation: '마우스 미러',
    name: '구강 거울 (치경)',
    function: '직접 볼 수 없는 부위를 간접적으로 관찰, 입술·볼·혀 견인, 빛 반사',
    characteristics: '평면 거울(정상)·오목 거울(확대)의 두 종류. 손잡이 탈착형',
    hint: '거울처럼 반사! 직접 못 보는 곳을 보여주는 탐정 도구. 평면=정확한 상, 오목=확대된 상',
  },
  'explorers': {
    pronunciation: '익스플로러',
    name: '탐침기 (익스플로러)',
    function: '충치, 치석, 분기부, 근관 등 치아 이상 탐색',
    characteristics: '끝이 날카롭고 가는 뾰족한 형태. 종류: Orbin, Shepherd\'s, Pigtail',
    hint: '영어 Explore(탐험)처럼, 치아의 이상을 찾아내는 탐험가! 끝이 날카로워 결함에 "걸림" 느낌',
  },
  'cotton forceps': {
    pronunciation: '코튼 포셉',
    name: '면섭자 (코튼 포셉)',
    function: '구강 내외로 재료를 잡아 이동',
    characteristics: '평형 또는 톱니형 끝, 다양한 크기, 구부러진 팁',
    hint: '"집게"의 치과 버전. 솜뭉치·거즈 등을 집어 넣고 빼는 데 사용',
  },
  'bib holder': {
    pronunciation: '비브 홀더',
    name: '턱받이 고정기',
    function: '환자의 목에 턱받이(비브)를 고정',
    characteristics: '일회용 스냅/접착식, 악어 클립형(재사용 가능)',
    hint: '아기 턱받이처럼 치과 처치 중 오염 방지. 악어 클립은 재사용!',
  },
  'perioprobe': {
    pronunciation: '페리오프로브',
    name: '치주 탐침기 (페리오프로브)',
    function: '치주 포켓(잇몸 주머니) 깊이 측정',
    characteristics: '눈금 표시로 깊이 측정(1mm, 3mm 단위). 종류: PSR probe 등',
    hint: '치주(Perio) + 탐침(Probe). 자처럼 생겨 잇몸 깊이를 잰다. 3mm 이하=정상, 4mm↑=치주 질환!',
  },
  'patient bib': {
    pronunciation: '페이션트 비브',
    name: '환자용 턱받이 (페이션트 비브)',
    function: '치과 처치 중 재료·파편·액체로부터 환자 보호',
    characteristics: '방수층+흡수층 양면 구조. 다양한 색상과 디자인',
    hint: '방수(액체 막기)+흡수(침·액체 흡수) 두 가지 기능! 방수 쪽이 환자 몸에 닿아야 함',
  },
  'instrument handles': {
    pronunciation: '인스트루먼트 핸들',
    name: '기구 손잡이',
    function: '탈착식 기구 헤드를 장착하는 손잡이',
    characteristics: '구강 거울 등의 헤드가 나사로 결합',
    hint: '드라이버 손잡이처럼 헤드만 교체! 손잡이 하나로 여러 기구를 활용',
  },
  '2 x 2 gauze': {
    pronunciation: '투바이투 거즈',
    name: '2×2 거즈',
    function: '지혈 보조, 기구 세척, 모든 치과 술식에 활용',
    characteristics: '2×2인치 크기. 흰색, 얇은/두꺼운 직조 흡수 섬유',
    hint: '치과의 "만능 종이 타월". 지혈·닦기·덮기 어디든 사용!',
  },
  'cotton rolls': {
    pronunciation: '코튼 롤',
    name: '면봉 롤 (코튼 롤)',
    function: '치아 격리 및 타액 흡수. 조직 보호 역할. 치내요법 진단에도 활용',
    characteristics: '약 1인치 길이의 원통형 흡수 솜 롤',
    hint: '솜사탕 같은 하얀 롤. 치아 주변에 끼워 침(타액) 차단! 보존 치료의 필수품',
  },
  'high velocity saliva': {
    pronunciation: '하이 벨로시티 살리바 이젝터',
    name: '고속 타액 흡인기 (HVE)',
    function: '구강 내 대량의 액체와 파편 신속 흡입',
    characteristics: '직선형 또는 각진 팁. 스테인리스·고압멸균 플라스틱·일회용 선택 가능. 치과 유닛 튜브에 연결',
    hint: '강력한 "구강 청소기"! High=강력 흡입. 수술 중 피·물·파편을 빠르게 제거',
  },
  'low velocity saliva': {
    pronunciation: '로우 벨로시티 살리바 이젝터',
    name: '저속 타액 흡인기',
    function: '구강 내 소량의 액체 배출',
    characteristics: '일회용 플라스틱, 구부려 사용 가능. 치과 유닛 튜브에 연결',
    hint: 'Low=약한 흡입. 환자 스스로 입에 물어 침을 빼는 "빨대 흡인기". HVE보다 작고 가늘다!',
  },
  'air/water syringe tip': {
    pronunciation: '에어/워터 시린지 팁',
    name: '삼방주사기 팁 (에어/워터 시린지)',
    function: '특정 치아 또는 전체 구강 세척 및 건조',
    characteristics: '삼방(공기·물·분무) 기능. 일회용 플라스틱 또는 고압멸균 금속 팁',
    hint: '"세 방향 주사기"! 공기=건조, 물=세척, 분무=세척+건조 동시. 치과 진료의 필수 보조 기구',
  },
  'ultrasonic scaler unit': {
    pronunciation: '울트라소닉 스케일러 유닛',
    name: '초음파 스케일러 본체',
    function: '수냉식 초음파 팁을 사용해 치석 제거',
    characteristics: '초고주파 팁 진동으로 물 분무 병행. 치과 체어에 연결',
    hint: '진동(ultrasonic)+물 분무로 치석을 부수는 전동 스케일러. 본체(unit)와 팁(tip) 구분 필요!',
  },
  'ultrasonic scaler tips': {
    pronunciation: '울트라소닉 스케일러 팁',
    name: '초음파 스케일러 팁',
    function: '치은상·치은하 치석 제거. 치주 포켓 내 세균 제거',
    characteristics: '초음파 스케일러 본체에 장착. 25k/30k 크기 팁. 팁 간 교환 불가',
    hint: '팁 사이즈 숫자 = 주파수(kHz). 25k 팁과 30k 팁은 서로 호환되지 않으니 주의!',
  },
  'area-specific curette': {
    pronunciation: '에어리어 스페시픽 큐렛',
    name: '부위별 큐렛 (Gracey 큐렛)',
    function: '특정 치아 표면의 치은하 치석·부착물 제거',
    characteristics: '전치부·구치부 전용 디자인. Anterior 및 Posterior 특이적',
    hint: 'Area-Specific = 부위 전용! Gracey 번호로 부위 구분(1/2=전치, 7/8=구치 협·설면 등). 전문적 SRP에 필수',
  },
  'universal curette': {
    pronunciation: '유니버셜 큐렛',
    name: '범용 큐렛',
    function: '치은상·치은하 치석 제거. 착색 제거',
    characteristics: '양날 cutting edge, 둥근 toe, 둥근 등면. 단독 또는 양날 사용',
    hint: 'Universal = 어디든 사용! 날이 양쪽(두 개)이라 한 기구로 여러 면 대응 가능',
  },
  '0.12 % chlorhexidine': {
    pronunciation: '클로르헥시딘',
    name: '0.12% 클로르헥시딘 구강 세정제',
    function: '처치 전 구강 세정. 구강 내 세균 부담 감소',
    characteristics: '파란색 또는 분홍색 액체. 처치 전후 15ml 구강 세정',
    hint: '0.12% = 적당한 항균 농도. "치과용 소독 구강청결제". 처치 전 입 행구기에 사용!',
  },
  'sickle scaler': {
    pronunciation: '시클 스케일러',
    name: '낫(시클) 스케일러',
    function: '치은상 대량 치석 제거. 전치부 인접면 치석에 특히 효과적',
    characteristics: '다양한 크기. 양쪽 날카로운 날 + 날카로운 끝점',
    hint: '낫(Sickle, ☾ 모양)처럼 생긴 치석 제거 기구! 날카로운 두 날로 치은 위 치석을 "긁어" 제거',
  },
  'topical anesthetic': {
    pronunciation: '토피컬 어네스쎄틱',
    name: '도포 마취제',
    function: '주사 전 점막 표면 마취. 주사 통증 감소',
    characteristics: '젤·스프레이·연고 형태. 주사 전 면봉으로 도포',
    hint: '"표면(Topical) 마취제". 주사 바늘이 들어가기 전 잇몸을 미리 마취해 통증을 줄여준다!',
  },
  'long needle': {
    pronunciation: '롱 니들',
    name: '장침 (긴 마취 주사침)',
    function: '하치조 신경 차단 마취 등 깊은 부위 마취',
    characteristics: '주로 하악 마취 시 사용',
    hint: '긴 바늘 = 깊은 마취. 하악(아래턱) 신경 차단에 사용. "롱=롱거=더 깊이!"',
  },
  'short needle': {
    pronunciation: '쇼트 니들',
    name: '단침 (짧은 마취 주사침)',
    function: '상악 침윤 마취 등 얕은 부위 마취',
    characteristics: '주로 상악 마취 시 사용',
    hint: '짧은 바늘 = 얕은 마취. 상악(위턱) 침윤 마취에 사용. 長=Long=하악, 短=Short=상악',
  },
  'anesthetic carpule': {
    pronunciation: '어네스쎄틱 카풀',
    name: '마취제 카트리지 (카풀)',
    function: '국소 마취약 보관 용기',
    characteristics: '유리 또는 플라스틱 카트리지. 주사기에 장착하여 사용',
    hint: '마취약이 들어있는 "총알(카풀)". 주사기에 끼워 마취약을 주입!',
  },
  'syringe': {
    pronunciation: '시린지',
    name: '마취 주사기',
    function: '카풀(마취약 카트리지) 장착 후 마취약 주입',
    characteristics: '아스피레이팅 시린지(흡인 확인 가능). 플런저 당겨 혈관 내 주입 여부 확인',
    hint: '치과용 "총"! 카풀(총알)을 넣고 방아쇠(플런저) 당기면 마취약 주입. 흡인 = 혈관 내 주입 예방',
  },
  'floss': {
    pronunciation: '플로스',
    name: '치실 (덴탈 플로스)',
    function: '치아 인접면 플라그 및 잔사 제거. 격리·건조에도 활용',
    characteristics: '왁스·무왁스·테이프 타입 등 다양',
    hint: '치아 사이 청소의 필수품! 치실은 칫솔이 닿지 않는 인접면 플라그를 제거',
  },
  'high speed handpiece': {
    pronunciation: '하이 스피드 핸드피스',
    name: '고속 핸드피스 (터빈)',
    function: '충치 제거, 치아 삭제, 크라운 형성 등에 사용',
    characteristics: '공기 터빈 구동. 200,000~400,000 RPM. 수냉 분무 필요',
    hint: '치과의 "전동 드릴"! 속도가 빠를수록 매끄러운 삭제. 물 분무 없으면 치아가 과열됨',
  },
  'slow speed handpiece': {
    pronunciation: '슬로우 스피드 핸드피스',
    name: '저속 핸드피스',
    function: '치아 연마, 임시 수복물 제거, 연조직 처치 등',
    characteristics: '전기 모터 구동. 1,000~40,000 RPM',
    hint: '고속의 반대! 연마·세마 등 섬세한 작업에 사용. 속도 낮음 = 열 발생 적음',
  },
  'restorative bur block': {
    pronunciation: '레스토레이티브 버 블록',
    name: '수복용 버 블록',
    function: '수복 술식에 필요한 다양한 버를 정리·보관',
    characteristics: '다양한 형태의 버(diamond, carbide 등) 포함',
    hint: '버들의 "가방"! 수복에 필요한 드릴 비트들을 한 곳에 정리',
  },
  'articulating paper': {
    pronunciation: '아티큘레이팅 페이퍼',
    name: '교합지 (아티큘레이팅 페이퍼)',
    function: '교합 고점(높은 부위) 표시. 조기 접촉 확인',
    characteristics: '얇은 착색 용지. 파란색/빨간색/초록색 등',
    hint: '잉크처럼 물드는 종이! 치아를 "꽉 깨물면" 높은 곳에 색이 묻어 조정해야 할 부위 파악',
  },
  'amalgam pellets': {
    pronunciation: '아말감 펠릿',
    name: '아말감 펠릿',
    function: '아말감 수복재의 원료 알갱이',
    characteristics: '사전 계량된 은합금 캡슐. 트리추레이터(혼합기)로 혼합',
    hint: '아말감의 "재료 알갱이". 기계로 혼합하면 충전 가능한 아말감이 완성!',
  },
  'condenser': {
    pronunciation: '컨덴서',
    name: '충전기 (컨덴서)',
    function: '아말감이나 수복재를 와동에 충전·압축',
    characteristics: '평탄 또는 격자 무늬 팁. 다양한 크기',
    hint: 'Condense = 압축! 수복재를 구멍 안에 꾹꾹 눌러 다지는 기구',
  },
  'discloid-cleoid carver': {
    pronunciation: '디스클로이드-클레오이드 카버',
    name: '디스클로이드-클레오이드 조각기',
    function: '아말감 수복 후 교합면 해부학적 형태 조각',
    characteristics: '한쪽은 원형(Discoid), 반대쪽은 클레오이드(뾰족) 팁',
    hint: '아말감을 "조각"하는 도구! Disc(원반)+Cleoid(갈고리). 굳기 전에 치아 모양을 만든다',
  },
  'ball burnisher': {
    pronunciation: '볼 버니셔',
    name: '볼 연마기 (볼 버니셔)',
    function: '아말감 또는 금속 수복물 표면 광택 및 적합',
    characteristics: '둥근 공 모양 팁',
    hint: '공(Ball) 모양으로 수복재를 매끄럽게 "버니싱(광택)"! 수복재를 치아에 밀착시킴',
  },
  'acorn burnisher': {
    pronunciation: '에이콘 버니셔',
    name: '도토리 연마기 (에이콘 버니셔)',
    function: '수복물 표면 마무리 광택',
    characteristics: '도토리(Acorn) 모양 팁',
    hint: '도토리(Acorn) 모양! 수복재 표면을 곡면에 맞게 광택 내는 데 사용',
  },
  'beavertail carver': {
    pronunciation: '비버테일 카버',
    name: '비버테일 조각기',
    function: '아말감 수복 후 교합면·인접면 형태 조각',
    characteristics: '비버 꼬리(Beavertail) 모양 납작한 팁',
    hint: '비버 꼬리처럼 납작! 평면이 넓어 수복재 형태를 다듬기에 유리',
  },
  'cotton forcep': {
    pronunciation: '코튼 포셉',
    name: '면섭자',
    function: '구강 내외로 솜·거즈 등의 재료를 이동',
    characteristics: '평형 또는 톱니형 끝',
    hint: '집게의 치과 버전. 솜을 잡아 구강 내에 넣고 빼는 역할',
  },
  'hand mirror': {
    pronunciation: '핸드 미러',
    name: '손거울',
    function: '처치 후 환자에게 결과 보여주기',
    characteristics: '환자용 확대 손거울',
    hint: '환자용 거울! 치료 결과를 환자에게 직접 확인시켜 주는 데 사용',
  },
  'plastic instrument': {
    pronunciation: '플라스틱 인스트루먼트',
    name: '플라스틱 충전 기구',
    function: '복합 레진 충전 재료를 와동에 적용 및 형태 형성',
    characteristics: '특수 코팅 처리. 아말감이나 다른 재료에는 사용 불가',
    hint: '레진 전용! 금속 기구로 복합 레진을 다루면 착색되어 심미성 저하. 반드시 전용 기구 사용',
  },
  'microbrush': {
    pronunciation: '마이크로브러시',
    name: '마이크로브러시',
    function: '프라이머·본딩 에이전트·실란트·시멘트 도포',
    characteristics: '미세 섬유 모 헤드가 있는 소형 플라스틱 기구',
    hint: '초소형 붓! 접착제·코팅재를 치아에 얇고 균일하게 바를 때 사용',
  },
  'micro brush': {
    pronunciation: '마이크로브러시',
    name: '마이크로브러시',
    function: '프라이머·본딩·실란트 도포',
    characteristics: '초소형 섬유 모 헤드',
    hint: '초소형 붓. 얇고 균일하게 접착재 도포',
  },
  'mixing well': {
    pronunciation: '믹싱 웰',
    name: '혼합판 (믹싱 웰)',
    function: '복합 레진·etch·bond·cavity conditioner 보관 웰',
    characteristics: '아말감 웰보다 작은 플라스틱 웰',
    hint: '"레진용 파레트"! 아말감 웰과 달리 레진용은 더 작고 비금속이어야 함',
  },
  'composite well': {
    pronunciation: '컴포지트 웰',
    name: '복합 레진 웰',
    function: '복합 레진 및 관련 재료 보관',
    characteristics: '아말감 웰보다 작은 플라스틱 웰',
    hint: 'Composite = 복합 레진. 레진용 작은 그릇. 아말감 웰보다 소형',
  },
  'tofflemire': {
    pronunciation: '토플마이어',
    name: '토플마이어 리테이너',
    function: '매트릭스 밴드를 고정하여 인접면 수복 공간 형성',
    characteristics: '나사 조임식 밴드 고정 장치',
    hint: '"테두리 고정 틀"! 인접면을 채울 때 옆으로 넘치지 않도록 매트릭스 밴드를 고정',
  },
  'matrix band': {
    pronunciation: '매트릭스 밴드',
    name: '매트릭스 밴드',
    function: '인접면 충전 시 임시 치아 벽면 역할',
    characteristics: '얇은 금속 또는 투명 필름 밴드',
    hint: '"임시 치아 옆벽"! 인접면이 없는 상황에서 수복재가 옆으로 흐르지 않게 가이드',
  },
  'wooden wedges': {
    pronunciation: '우든 웨지',
    name: '목재 쐐기 (우든 웨지)',
    function: '인접면 충전 시 매트릭스 밴드를 치간 유두부에 고정',
    characteristics: '삼각형 또는 둥근 목재 또는 플라스틱. 다양한 크기와 색상',
    hint: '"치아 사이 쐐기"! 매트릭스 밴드를 잇몸에 눌러 밀착시켜 충전재 누출 방지',
  },
  'wood wedges': {
    pronunciation: '우든 웨지',
    name: '목재 쐐기',
    function: '매트릭스 밴드의 잇몸 밀착 고정',
    characteristics: '삼각형 목재 또는 플라스틱, 다양한 크기',
    hint: '쐐기처럼 틈에 꽂아 밴드를 잇몸에 밀착 고정',
  },
  'packable composite': {
    pronunciation: '패커블 컴포지트',
    name: '충전형 복합 레진',
    function: '와동 직접 수복재. 교합력에 견디는 후방 수복',
    characteristics: '높은 점도로 충전(Pack) 가능',
    hint: '"꽉 차는" 레진! Packable = 꾹꾹 채울 수 있는 점도. 어금니 충전에 주로 사용',
  },
  'flowable composite': {
    pronunciation: '플로어블 컴포지트',
    name: '유동성 복합 레진',
    function: '좁은 와동·언더컷 부위 충전, liner로도 활용',
    characteristics: '낮은 점도(흐름성). 시린지로 직접 주입',
    hint: '"흐르는" 레진! 좁고 깊은 곳에 흘려 넣을 수 있음. Packable보다 강도 낮으나 조작 용이',
  },
  'etch': {
    pronunciation: '에치',
    name: '산 부식제 (에치)',
    function: '상아질 도말층 제거. 치아 표면을 본딩제 결합에 적합하게 준비',
    characteristics: '주로 인산(37%) 사용. 파란색 젤 형태. pH에 따라 색상 다양',
    hint: '"치아에 미세 홈 파기"! 산으로 치아 표면을 거칠게 만들어 접착제가 더 잘 붙게 함',
  },
  'bonding agents': {
    pronunciation: '본딩 에이전트',
    name: '접착제 (본딩 에이전트)',
    function: '치아와 복합 레진 사이의 접착 매개체',
    characteristics: '세대별(1~8세대) 차이. 1-bottle, 2-step 등 다양',
    hint: '접착제(Adhesive)! 치아(법랑질·상아질)와 레진 사이를 붙여주는 역할. Etch 후 반드시 도포',
  },
  'finishing strips': {
    pronunciation: '피니싱 스트립',
    name: '연마 스트립',
    function: '인접면 수복물 마무리·연마',
    characteristics: '입자 굵기(Coarse/Fine/Extra Fine)에 따라 차이. 연마재 코팅',
    hint: '"사포 끈"! 치아 사이를 왔다 갔다 하며 레진 표면을 매끄럽게 연마',
  },
  'curing light': {
    pronunciation: '큐링 라이트',
    name: '광중합기 (큐링 라이트)',
    function: '광중합형 재료(레진·본딩·실란트 등) 경화',
    characteristics: '300nm 이상 파장 필요. 2mm 이하 두께로 분층 경화',
    hint: '"UV 라이트로 굳히기"! 빛을 쪼이면 레진이 경화됨. 한 번에 2mm씩 분층 충전 필수',
  },
  'curing light instrument': {
    pronunciation: '큐링 라이트',
    name: '광중합기',
    function: '광중합형 재료 경화',
    characteristics: '300nm 이상 파장 필요',
    hint: '빛으로 굳히는 기구! 2mm씩 분층 충전',
  },
  'protective eye wear': {
    pronunciation: '프로텍티브 아이 웨어',
    name: '보호 안경',
    function: '처치 중 술자·조수의 눈 보호',
    characteristics: '오렌지·다크·클리어 등 다양. 눈 보호 기능',
    hint: '치과 처치 중 비산 파편·에어로졸로부터 눈 보호! 큐링 라이트 사용 시 오렌지색 착용',
  },
  'spoon excavator': {
    pronunciation: '스푼 익스캐베이터',
    name: '숟가락형 발굴기 (스푼 익스캐베이터)',
    function: '우식 상아질 제거. 임시 시멘트·임시 크라운 제거',
    characteristics: '숟가락 모양 절삭날. 소·대 크기 구분',
    hint: '"치아 파는 숟가락"! 썩은 부분을 긁어내거나 임시 크라운을 들어낼 때 사용',
  },
  'cavity conditioner': {
    pronunciation: '캐비티 컨디셔너',
    name: '와동 조절제 (캐비티 컨디셔너)',
    function: '글래스 아이오노머 수복 전 치아 준비 (에치와 유사 역할)',
    characteristics: '20% 폴리아크릴산. 짙은 파란색',
    hint: '글래스 아이오노머 전용 "에치"! 인산 에치 대신 약산(폴리아크릴산)으로 치아 표면 준비',
  },
  'vitrabond liner': {
    pronunciation: '바이트라본드 라이너',
    name: '글래스 아이오노머 라이너 (Vitrabond)',
    function: '심층 와동에 라이너 적용 (글래스 아이오노머 재료)',
    characteristics: '분말:액체 1:1 혼합. 광중합 및 자가 경화 모두 가능',
    hint: '"치수 보호막"! 깊은 충치 치료 시 신경 가까이 바르는 보호 라이너',
  },
  'dycal (calcium hydroxide': {
    pronunciation: '다이칼 (칼슘 하이드록사이드)',
    name: 'Dycal 수산화칼슘 라이너',
    function: '간접 치수 복조, 심층 와동 보호 라이너',
    characteristics: '기제+촉매 1:1 혼합. 연한 황갈색 반죽. 자가 경화',
    hint: '"신경 지키는 석회"! 수산화칼슘이 치수 자극을 차단하고 2차 상아질 형성 촉진',
  },
  'irm (zoe)': {
    pronunciation: '아이알엠 (지오이)',
    name: 'IRM 임시 수복재 (ZOE계)',
    function: '임시 충전, 진정 효과 있는 임시 수복',
    characteristics: '하얀 분말 + 유지놀 혼합. 1:1 혼합비. 장갑에 붙지 않는 정도로 혼합',
    hint: 'IRM = Intermediate Restorative Material. ZOE = 산화 아연 + 유지놀. 클로브(정향) 냄새!',
  },
  'fuji ix or fuji ii': {
    pronunciation: '후지 나인 오어 후지 투',
    name: 'Fuji IX / Fuji II (글래스 아이오노머 수복재)',
    function: '고우식 위험 환자의 수복재. 불소 방출',
    characteristics: '트리추레이터 캡슐 또는 분말·액체 혼합',
    hint: '"불소 방출 충전재"! 불소가 치아를 보호하고 재광화를 돕는다. 심미성 낮으나 예방 효과 큼',
  },
  'rubber dam': {
    pronunciation: '러버 댐',
    name: '러버댐 시트',
    function: '치아 격리. 타액·혈액에 의한 오염 방지',
    characteristics: '라텍스 또는 라텍스-프리 시트',
    hint: '"치아 우비"! 치아만 구멍 뚫어 노출시키고 나머지 구강은 덮어 오염 방지',
  },
  'clamp holder': {
    pronunciation: '클램프 홀더',
    name: '클램프 홀더',
    function: '클램프를 집어 치아에 적용하는 포셉',
    characteristics: '클램프 날개에 맞는 특수 포셉',
    hint: '클램프를 손으로 잡는 대신 이 도구로 안전하게 치아에 끼운다',
  },
  'rubber dam holder': {
    pronunciation: '러버 댐 홀더',
    name: '러버댐 고정 프레임',
    function: '러버댐 시트를 구강 외부에서 펼쳐 고정',
    characteristics: '플라스틱 또는 금속 프레임. Young\'s frame 등',
    hint: '시트를 팽팽하게 펼쳐주는 "빨래 건조대"!',
  },
  'rubber dam hole puncher': {
    pronunciation: '러버 댐 홀 펀처',
    name: '러버댐 펀칭기',
    function: '러버댐 시트에 치아 크기에 맞는 구멍 뚫기',
    characteristics: '다양한 크기의 원형 펀칭 날',
    hint: '"구멍 뚫는 기계". 치아 크기에 맞게 구멍 크기를 선택해 시트를 뚫는다!',
  },
  'clamp': {
    pronunciation: '클램프',
    name: '클램프 (러버댐 고정 쇠)',
    function: '러버댐을 치아 경부에 고정',
    characteristics: '금속 클램프. 치아 유형(전치·구치)마다 다른 번호',
    hint: '"치아 집게"! 러버댐이 흘러내리지 않도록 치아 목 부분을 꽉 잡아주는 금속 고리',
  },
  'x-ray film': {
    pronunciation: '엑스레이 필름',
    name: 'X선 필름 (방사선 사진 필름)',
    function: '방사선 사진 촬영',
    characteristics: '다양한 크기(0~4번)',
    hint: '치과 X선의 핵심 매체. 디지털 센서로 대체되는 추세이나 여전히 사용',
  },
  'suture and needle': {
    pronunciation: '수처 앤 니들',
    name: '봉합사 및 봉합침',
    function: '외과 술식 후 조직 봉합',
    characteristics: '흡수성·비흡수성 재질. 바늘 크기 및 형태 다양',
    hint: '실(봉합사)+바늘(침)의 세트. 흡수성 = 자연 흡수됨. 비흡수성 = 나중에 제거 필요!',
  },
  'suture scissors': {
    pronunciation: '수처 시저',
    name: '봉합 가위',
    function: '봉합사 절단',
    characteristics: '끝이 가는 특수 가위',
    hint: '"실밥 자르는 가위". 일반 가위보다 끝이 가늘어 봉합사를 정확히 자를 수 있음',
  },
  'needle holder': {
    pronunciation: '니들 홀더',
    name: '봉합침 홀더 (니들 홀더)',
    function: '봉합 시 봉합침을 잡아 조직에 통과',
    characteristics: '잠금 장치 있는 집게형 기구',
    hint: '"봉합침을 잡는 집게". 잠금 장치로 고정하여 정밀한 봉합이 가능',
  },
  'tissue forceps': {
    pronunciation: '티슈 포셉',
    name: '조직 포셉',
    function: '봉합 시 조직을 잡아 고정',
    characteristics: '끝에 톱니 또는 걸쇠 있음',
    hint: '"조직을 잡는 핀셋". 봉합할 때 조직이 움직이지 않도록 고정',
  },
  'periosteal elevator': {
    pronunciation: '페리오스티얼 엘리베이터',
    name: '골막 거상기 (페리오스티얼 엘리베이터)',
    function: '골막과 점막을 치조골에서 분리·거상',
    characteristics: '납작하고 끝이 날카로운 금속 기구',
    hint: '"잇몸 들어올리기"! 발치나 외과 수술 전 잇몸을 뼈에서 떼어내는 첫 단계 기구',
  },
  'surgical curette': {
    pronunciation: '서지컬 큐렛',
    name: '수술용 큐렛',
    function: '발치 후 치조와 내 육아 조직·잔재 제거',
    characteristics: '숟가락 모양의 날카로운 금속 기구',
    hint: '"발치 후 뼈 청소기"! 치아를 뽑은 후 남은 감염 조직이나 이물질을 제거',
  },
  'extraction forceps': {
    pronunciation: '익스트랙션 포셉',
    name: '발치 겸자 (익스트랙션 포셉)',
    function: '치아를 잡아 탈구·발거',
    characteristics: '치아 부위(상·하악, 전·구치)에 따라 다른 모양. 부리 모양의 분류',
    hint: '"이 뽑는 집게"! 부리 모양이 치아 해부학에 맞게 설계. 상악=직선, 하악=구부러진 형태',
  },
  'elevator': {
    pronunciation: '엘리베이터',
    name: '발치 엘리베이터',
    function: '치아 치주 인대 절단 및 치아 탈구',
    characteristics: '직선형(Straight), Cryer, Cogswell 등 다양',
    hint: '"치아 지렛대"! 치아와 뼈 사이에 끼워 지렛대 원리로 치아를 들어올림',
  },
  'diamond football': {
    pronunciation: '다이아몬드 풋볼 버',
    name: '다이아몬드 풋볼 버',
    function: '교합면 형성, 복합 레진 마무리',
    characteristics: '다이아몬드 코팅 축구공 형태',
    hint: '풋볼 모양! 교합면을 둥글게 다듬는 데 사용',
  },
  'crown bur': {
    pronunciation: '크라운 버',
    name: '크라운 버',
    function: '크라운 준비 시 치아 형성',
    characteristics: '고속 핸드피스용 버',
    hint: '크라운을 위한 "치아 조각 칼"',
  },
  'mouth prop': {
    pronunciation: '마우스 프롭',
    name: '구강 개구 보조기',
    function: '술식 중 구강을 벌린 상태로 유지',
    characteristics: '고무·실리콘 재질',
    hint: '"입벌리기 도우미"! 장시간 처치 시 환자가 입을 오래 벌리도록 보조',
  },
  'amalgam well': {
    pronunciation: '아말감 웰',
    name: '아말감 혼합 용기 (아말감 웰)',
    function: '혼합된 아말감 보관 및 적재',
    characteristics: '금속 웰. 복합 레진 웰보다 크고 금속 재질',
    hint: '"아말감 그릇"! 복합 레진 웰보다 크고 금속 재질이어야 아말감 오염 없음',
  },
  'amalgam carrier': {
    pronunciation: '아말감 캐리어',
    name: '아말감 운반기 (아말감 캐리어)',
    function: '혼합된 아말감을 와동으로 운반·충전',
    characteristics: '실린더형 스푼. 싱글 또는 더블 엔드',
    hint: '"아말감 총"! 방아쇠를 당기면 아말감이 구멍으로 밀려 들어감. 피스톤 원리!',
  },
  'endo set': {
    pronunciation: '엔도 셋',
    name: '근관 치료 기구 셋 (엔도 셋)',
    function: '근관 성형·청소에 사용하는 파일·리머 세트',
    characteristics: '다양한 크기의 K-file, H-file 등',
    hint: '"신경 치료 도구 모음". File 크기 숫자가 클수록 굵음! 작은 것부터 큰 순서로 확대',
  },
  'metal ruler': {
    pronunciation: '메탈 룰러',
    name: '금속 자 (메탈 룰러)',
    function: '근관 길이 측정 보조',
    characteristics: '밀리미터 눈금 금속 자',
    hint: '근관 파일의 스토퍼 위치를 맞출 때 사용하는 "작은 자"!',
  },
  'articulating paper holder': {
    pronunciation: '아티큘레이팅 페이퍼 홀더',
    name: '교합지 홀더',
    function: '교합지를 치아 사이에 쉽게 위치시키는 홀더',
    characteristics: '핀셋 형태의 교합지 집게',
    hint: '교합지를 손으로 잡는 대신 이 홀더로 정확한 위치에 놓는다',
  },
  'eugenol': {
    pronunciation: '유지놀',
    name: '유지놀 (클로브 오일)',
    function: '치수 진정 효과. 항균·항염 작용',
    characteristics: '정향(Clove)에서 추출. 특유의 향',
    hint: '"치과 클로브 오일". ZOE 재료의 주성분. 진정 효과가 있어 통증 완화에 사용',
  },
  'scissors': {
    pronunciation: '시저',
    name: '가위',
    function: '조직·재료 절단',
    characteristics: '다양한 용도별 가위',
    hint: '치과에도 가위가 필요! 봉합사·조직·재료 절단에 활용',
  },
  'mixing bowl': {
    pronunciation: '믹싱 볼',
    name: '혼합 볼 (믹싱 볼)',
    function: '알지네이트 인상재 혼합',
    characteristics: '고무 재질 볼',
    hint: '"반죽 그릇"! 알지네이트 분말과 물을 이 볼에 넣고 스파튤라로 혼합',
  },
  'alginate material': {
    pronunciation: '알지네이트 머티리얼',
    name: '알지네이트 인상재',
    function: '치아·구강 조직 인상 채득',
    characteristics: '분말 + 물 혼합. 빠른 경화. 고무 형태',
    hint: '"치아 틀 뜨는 재료"! 물 온도로 경화 시간 조절(냉수=느림, 온수=빠름)',
  },
  'mixing spatula': {
    pronunciation: '믹싱 스파튤라',
    name: '혼합 스파튤라',
    function: '인상재·시멘트·레진 등 혼합',
    characteristics: '금속 또는 플라스틱 주걱',
    hint: '"치과 주걱"! 볼에서 인상재를 혼합하거나 시멘트를 섞을 때 사용',
  },
  'lower impression tray': {
    pronunciation: '로워 임프레션 트레이',
    name: '하악 인상 트레이',
    function: '하악 인상 채득 시 알지네이트 담는 트레이',
    characteristics: '하악 아치에 맞는 U자형',
    hint: '하악(아래턱)용 U자형 트레이! 인상재를 담아 입에 넣어 치아 모양을 뜸',
  },
  'upper impression tray': {
    pronunciation: '어퍼 임프레션 트레이',
    name: '상악 인상 트레이',
    function: '상악 인상 채득 시 알지네이트 담는 트레이',
    characteristics: '상악 아치에 맞는 U자형',
    hint: '상악(위턱)용 트레이! 천장(구개)을 덮는 더 넓은 형태',
  },
  'tempbond': {
    pronunciation: '템프본드',
    name: '임시 시멘트 (TempBond)',
    function: '임시 크라운·브리지의 임시 고정',
    characteristics: '산화아연 기반 임시 시멘트',
    hint: '"임시 접착제"! 영구 시멘트와 달리 나중에 제거할 수 있도록 접착력이 낮음',
  },
  'high speed bur': {
    pronunciation: '하이 스피드 버',
    name: '고속 버',
    function: '고속 핸드피스에 장착하여 치아 삭제',
    characteristics: '고속 핸드피스 전용',
    hint: '고속 핸드피스의 "날"! RPM이 높아 치아를 빠르게 삭제',
  },
  'diamond bur': {
    pronunciation: '다이아몬드 버',
    name: '다이아몬드 버',
    function: '법랑질 삭제, 크라운 형성, 수복물 마무리',
    characteristics: '다이아몬드 코팅. 다양한 형태(볼·원뿔·플레임·실린더 등)',
    hint: '다이아몬드 코팅 = 초경질! 가장 단단한 치아 조직(법랑질)도 효과적으로 삭제',
  },
  'round bur': {
    pronunciation: '라운드 버',
    name: '둥근 버 (라운드 버)',
    function: '우식 제거, 레진 보유형 형성',
    characteristics: '탄화 텅스텐 원형 버. 저속·고속 핸드피스 모두 사용',
    hint: '"구슬 모양 버"! 둥글어서 와동 내부를 둥글게 파는 데 적합',
  },
  '330 bur': {
    pronunciation: '쓰리서티 버',
    name: '#330 버 (이부형 버)',
    function: '아말감·레진 와동 형성의 기본 버',
    characteristics: '이부형(pear-shaped) 탄화 텅스텐 버',
    hint: '"치과 표준 버"! 330번은 대부분의 수복 와동 형성에 사용하는 범용 버',
  },
  '557 bur': {
    pronunciation: '파이브파이브세븐 버',
    name: '#557 버 (실린더 버)',
    function: '와동 측벽 형성, 언더컷 제거',
    characteristics: '원통형 탄화 텅스텐 버',
    hint: '원통(Cylinder) 모양! 와동의 수직 측벽을 평행하게 형성하는 데 사용',
  },
  'latch round bur': {
    pronunciation: '래치 라운드 버',
    name: '래치형 둥근 버',
    function: '저속 핸드피스용 우식 제거 버',
    characteristics: '저속 핸드피스 래치 타입에 장착. 원형 형태',
    hint: '저속용 둥근 버! "래치(Latch)"는 저속 핸드피스 연결 방식',
  },
  'white stone': {
    pronunciation: '화이트 스톤',
    name: '화이트 스톤 버',
    function: '아말감·금속 수복물 연마 마무리',
    characteristics: '알루미늄 옥사이드 연마석. 흰색',
    hint: '"흰 돌 연마기"! 금속 수복물 표면을 매끄럽게 광택 내는 데 사용',
  },
  'diamond tree top': {
    pronunciation: '다이아몬드 트리 탑',
    name: '다이아몬드 트리 탑 버',
    function: '크라운 마무리, 교합면 형성',
    characteristics: '나무(Tree Top) 모양의 다이아몬드 버',
    hint: '나무 꼭대기 모양! 크라운 위아래 부위를 정밀하게 형성',
  },
  // ── 트레이 구성 아이템 보조 항목 ───────────────────────────────────────
  'needle': {
    pronunciation: '니들',
    name: '주사침',
    hint: '마취 주사에 사용하는 바늘. 길이로 부위를 구분',
  },
  'gauze': {
    pronunciation: '거즈',
    name: '거즈',
    hint: '지혈·세척·덮기 다용도의 얇은 면직물',
  },
  'anesthetic': {
    pronunciation: '어네스쎄틱',
    name: '마취제',
    hint: '국소 마취에 사용하는 약물',
  },
  'anesthetic syringe': {
    pronunciation: '어네스쎄틱 시린지',
    name: '마취 주사기',
    hint: '카풀을 장착해 마취약을 주입하는 치과용 주사기',
  },
  'tray cover': {
    pronunciation: '트레이 커버',
    name: '트레이 덮개',
    hint: '트레이 위에 덮어 오염을 방지하는 덮개',
  },
  'wax bite': {
    pronunciation: '왁스 바이트',
    name: '교합 왁스',
    hint: '교합(물리는 관계) 기록에 사용하는 왁스',
  },
  'lip lubricant': {
    pronunciation: '립 루브리컨트',
    name: '입술 보습제',
    hint: '처치 중 입술 건조·갈라짐 예방에 바르는 연고',
  },
  'paper pad': {
    pronunciation: '페이퍼 패드',
    name: '종이 패드 (믹싱 패드)',
    hint: '시멘트·재료를 혼합하는 일회용 종이 블록',
  },
  'mixing pad': {
    pronunciation: '믹싱 패드',
    name: '혼합 패드',
    hint: '재료 혼합용 일회용 종이 패드',
  },
  'alcohol': {
    pronunciation: '알코올',
    name: '알코올',
    hint: '소독·세척에 사용하는 에탄올',
  },
  'iodoform gauze': {
    pronunciation: '아이오도폼 거즈',
    name: '요오드폼 거즈',
    hint: '발치 후 건성 발치와 처치에 사용하는 항균 거즈',
    function: '건성 발치와에 충전하여 통증 완화 및 치유 촉진',
  },
  'eugenol paste': {
    pronunciation: '유지놀 페이스트',
    name: '유지놀 페이스트',
    hint: '건성 발치와 처치에 사용하는 진통·항균 연고',
  },
  'cavit': {
    pronunciation: '캐빗',
    name: '캐빗 임시 충전재',
    hint: '근관 치료 사이 임시 봉쇄에 사용하는 충전재',
  },
  'file': {
    pronunciation: '파일',
    name: '근관 파일',
    hint: '근관 성형·확대에 사용하는 가는 금속 기구',
  },
  'k-file': {
    pronunciation: '케이 파일',
    name: 'K-파일',
    hint: '가장 일반적인 근관 파일. 크기 번호가 클수록 굵음',
  },
  'reamer': {
    pronunciation: '리머',
    name: '리머',
    hint: '근관 확대에 사용하는 나선형 금속 기구',
  },
  'spreader': {
    pronunciation: '스프레더',
    name: '스프레더',
    hint: '근관 충전재(거터퍼차)를 측방으로 압박하는 기구',
  },
  'gutta percha': {
    pronunciation: '거터퍼차',
    name: '거터퍼차 포인트',
    hint: '근관 충전 재료. 천연 고무에서 유래한 열가소성 재료',
  },
  'absorbent paper points': {
    pronunciation: '앱솔번트 페이퍼 포인트',
    name: '흡수 페이퍼 포인트',
    hint: '근관 내 세척액 흡수·건조에 사용하는 가는 종이',
  },
  'paper points': {
    pronunciation: '페이퍼 포인트',
    name: '페이퍼 포인트',
    hint: '근관 건조·약재 도포에 사용하는 얇은 종이 기구',
  },
  'irrigating syringe': {
    pronunciation: '이리게이팅 시린지',
    name: '세척용 주사기',
    hint: '근관 내 세척액을 주입하는 전용 시린지',
  },
  'sodium hypochlorite': {
    pronunciation: '소디움 하이포클로라이트',
    name: '차아염소산나트륨',
    hint: '근관 세척에 사용하는 항균 소독액 (표백제 성분)',
  },
  'impression material': {
    pronunciation: '임프레션 머티리얼',
    name: '인상재',
    hint: '치아·구강 조직의 형태를 본뜨는 재료',
  },
  'impression tray': {
    pronunciation: '임프레션 트레이',
    name: '인상 트레이',
    hint: '인상재를 담아 구강에 삽입하는 트레이',
  },
  'alginate': {
    pronunciation: '알지네이트',
    name: '알지네이트 인상재',
    hint: '분말+물 혼합으로 만드는 고무 형태의 인상재',
  },
  'rubber dam stamp': {
    pronunciation: '러버 댐 스탬프',
    name: '러버댐 스탬프',
    hint: '러버댐 천에 치아 구멍 위치를 도장 찍어 표시하는 기구',
  },
  'dental floss': {
    pronunciation: '덴탈 플로스',
    name: '치실',
    hint: '치아 사이 플라그 제거 및 러버댐 리게처에 활용',
  },
  'ligature': {
    pronunciation: '리게처',
    name: '리게처 (결찰사)',
    hint: '러버댐 클램프를 치아에 묶어 안전하게 고정하는 실',
  },
  'high speed': {
    pronunciation: '하이 스피드 핸드피스',
    name: '고속 핸드피스',
    hint: '공기 터빈 구동. 치아 삭제·충치 제거에 사용',
  },
  'low speed': {
    pronunciation: '로우 스피드 핸드피스',
    name: '저속 핸드피스',
    hint: '전기 모터 구동. 연마·세마 등 섬세한 작업에 사용',
  },
  'prophy paste': {
    pronunciation: '프로피 페이스트',
    name: '예방 처치 연마재 (프로피 페이스트)',
    hint: '치아 표면 착색·플라그를 연마 제거하는 치약형 재료',
  },
  'prophy cup': {
    pronunciation: '프로피 컵',
    name: '프로피 컵',
    hint: '저속 핸드피스에 장착해 연마재로 치아를 닦는 컵 모양 기구',
  },
  'prophy brush': {
    pronunciation: '프로피 브러시',
    name: '프로피 브러시',
    hint: '교합면 홈(소와·열구)의 플라그 제거용 솔',
  },
  'explorer': {
    pronunciation: '익스플로러',
    name: '탐침기',
    hint: '치아의 충치·균열·과잉 수복물을 탐색하는 날카로운 기구',
  },
  'perioprop': {
    pronunciation: '페리오프로브',
    name: '치주 탐침기',
    hint: '잇몸 포켓 깊이를 재는 눈금 있는 탐침',
  },
  'mirror': {
    pronunciation: '미러',
    name: '치경 (구강 거울)',
    hint: '직접 못 보는 구강 부위를 간접 관찰하는 거울',
  },
  'explorer/ perioprobe': {
    pronunciation: '익스플로러/페리오프로브',
    name: '탐침기/치주 탐침기',
    hint: '충치 탐색(Explorer)과 잇몸 깊이 측정(Perioprobe)이 세트',
  },
  'polishing paste': {
    pronunciation: '폴리싱 페이스트',
    name: '연마 페이스트',
    hint: '치아 표면을 매끄럽게 연마하는 재료',
  },
  'disclosing agent': {
    pronunciation: '디스클로징 에이전트',
    name: '착색제 (플라그 표시제)',
    hint: '플라그가 있는 부위를 붉게 착색해 눈에 보이게 하는 제제',
  },
  'toothbrush': {
    pronunciation: '투스브러시',
    name: '칫솔',
    hint: '환자 구강 위생 교육 및 시범에 사용',
  },
  'fluoride': {
    pronunciation: '플루오라이드',
    name: '불소',
    hint: '충치 예방을 위해 치아 표면에 도포하는 무기질',
  },
  'fluoride tray': {
    pronunciation: '플루오라이드 트레이',
    name: '불소 도포 트레이',
    hint: '불소 젤을 담아 치아 전체에 도포하는 트레이',
  },
  'retraction cord': {
    pronunciation: '리트랙션 코드',
    name: '치은 압배 실 (리트랙션 코드)',
    hint: '인상 채득 전 잇몸을 눌러 치아 경계를 노출시키는 실',
  },
  'temporary crown': {
    pronunciation: '템포러리 크라운',
    name: '임시 크라운',
    hint: '영구 크라운 제작 중 치아를 보호하는 임시 보철물',
  },
  'temp crown': {
    pronunciation: '템프 크라운',
    name: '임시 크라운',
    hint: '크라운 준비 후 임시로 씌우는 보철물',
  },
  'crown form': {
    pronunciation: '크라운 폼',
    name: '크라운 기성 폼',
    hint: '임시 크라운 제작에 사용하는 기성 플라스틱 쉘',
  },
  'scissors': {
    pronunciation: '시저',
    name: '가위',
    hint: '봉합사·재료 절단에 사용하는 외과용 가위',
  },
  'hemostat': {
    pronunciation: '헤모스탯',
    name: '지혈 겸자 (헤모스탯)',
    hint: '출혈 부위를 잡아 지혈하는 잠금식 집게',
  },
  'aspirating syringe': {
    pronunciation: '아스피레이팅 시린지',
    name: '흡인 주사기',
    hint: '혈관 내 주입을 확인하기 위해 흡인(당김) 기능이 있는 마취 주사기',
  },
  'bone file': {
    pronunciation: '본 파일',
    name: '골 줄 (본 파일)',
    hint: '발치 후 날카로운 뼈 가장자리를 다듬는 줄',
  },
  'root tip pick': {
    pronunciation: '루트 팁 픽',
    name: '치근단 픽',
    hint: '발치 중 부러진 치근 조각을 꺼내는 가는 기구',
  },
  'rongeur': {
    pronunciation: '롱거',
    name: '롱거 (골 절제 겸자)',
    hint: '발치 후 날카로운 골을 물어 제거하는 집게형 기구',
  },
  'mouth wash': {
    pronunciation: '마우스 워시',
    name: '구강 세정제',
    hint: '처치 전후 구강 세정에 사용하는 액체',
  },
  'mouthwash': {
    pronunciation: '마우스워시',
    name: '구강 세정제',
    hint: '처치 전후 구강 세정에 사용하는 액체',
  },
};

// ─── 헬퍼 함수 ──────────────────────────────────────────────────────────────

/** 기구 이름으로 한국어 데이터 조회 (부분 일치 포함) */
export function lookupInstrumentKo(name: string): KoInstrumentData | null {
  const key = name.toLowerCase().trim();
  // 1) 정확 일치
  if (KO_INSTRUMENTS[key]) return KO_INSTRUMENTS[key]!;
  // 2) 포함 일치 (짧은 것 우선)
  const candidates = Object.entries(KO_INSTRUMENTS)
    .filter(([k]) => key.includes(k) || k.includes(key))
    .sort((a, b) => b[0].length - a[0].length);
  return candidates[0]?.[1] ?? null;
}

/** 섹션 ID로 한국어 데이터 조회 */
export function lookupSectionKo(id: string): KoSectionData | null {
  return KO_SECTIONS[id] ?? null;
}

// ─── UI 문자열 ────────────────────────────────────────────────────────────

export const UI_STRINGS = {
  en: {
    tableOfContents: 'Table of Contents',
    traySetup: 'Tray Setup',
    instruments: 'Instruments',
    function: 'Function',
    characteristics: 'Characteristics',
    memoryHint: 'Memory Hint',
    setupComponents: 'Setup Components',
    items: 'items',
    back: 'Contents',
    trayDiagram: 'Tray Setup Diagram',
    instrumentsOnPage: 'Instruments on this page',
    prev: 'Prev',
    next: 'Next',
    statsInstrSections: 'Instrument Sections',
    statsTraySetups: 'Tray Setup Sections',
    statsTotalInstr: 'Total Instruments',
    pronunciation: '',
    koreanName: '',
  },
  ko: {
    tableOfContents: '목차',
    traySetup: '트레이 셋업',
    instruments: '기구 목록',
    function: '기능',
    characteristics: '특징',
    memoryHint: '💡 암기 힌트',
    setupComponents: '구성 기구 목록',
    items: '개 항목',
    back: '목차',
    trayDiagram: '트레이 셋업 다이어그램',
    instrumentsOnPage: '이 페이지의 기구',
    prev: '이전',
    next: '다음',
    statsInstrSections: '기구 섹션',
    statsTraySetups: '트레이 셋업 섹션',
    statsTotalInstr: '전체 기구',
    pronunciation: '발음',
    koreanName: '한국어명',
  },
} as const;

export type UILang = keyof typeof UI_STRINGS;
