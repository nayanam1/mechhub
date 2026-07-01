# mechhub — 기구설계 보조 시스템

반도체 테스트 장비 설계 실무에서 반복적으로 필요한 기구학적 연산·스펙 조회를 빠르게 처리하기 위한 사내 기술 자산 포털입니다.
순수 HTML/CSS/JS(Vanilla)로 작성되어 있으며, 별도 빌드 과정 없이 GitHub Pages 등에 바로 배포해 사용할 수 있습니다.

- **대상 사용자**: 기구설계 엔지니어 (반도체 테스트 장비 도메인)
- **목표**: 실무에서 바로 쓸 수 있는 계산기 + 규격 조회 도구를 계속 누적해 나가는 것
- **기술 스택**: HTML5, CSS3(공통 스타일시트), Vanilla JavaScript — 프레임워크/빌드 도구 없음

---

## 1. 폴더 구조

```
mechhub/
├── index.html              # 메인 랜딩 페이지 (카드형 메뉴, 섹션 앵커 포함)
├── common.css               # 전체 공통 스타일 (레이아웃, 사이드바, 카드, 폼, 결과박스 등)
│
├── steel_material.html      # 2. Steel 소재 스펙 조회 & 비교
├── stainless_material.html  # 3. Stainless 소재 스펙 조회 & 비교
├── aluminum_material.html   # 4. Aluminum 소재 스펙 조회 & 비교
│
├── machining_allowance.html # 6. 일반형상 공차 / 허용차 계산
├── fit_clearance.html       # 6. 끼워맞춤 공차 (H7/g6 등) & Hole/Shaft 조회
├── roughness_mesh.html      # 6. 표면거칠기 & Mesh Size 변환
├── bending_radius.html      # 6. 절곡 최소값 & 튜브 Bending Radius
├── surface_treatment.html   # 6. 아노다이징/도금 피막두께 & 열처리 사양
│
├── bolt_torque.html         # 7. 볼트 규격 & 체결 토크 & 자리파기
├── nut_pop.html             # 7. 너트 규격 (육각/POP/클린칭)
├── snap_ring.html           # 7. Key홈 / 스냅링 / Dowel Pin
├── oring_selection.html     # 7. O-Ring 선정 & 홈 설계
├── belt.html                # 7. 타이밍 풀리 & 벨트 레이아웃
│
└── motion.html               # 8. Tact Time 종합 계산기 (모션 프로파일)
```

카테고리 체계는 `index.html`의 사이드바 메뉴(1~14) 기준을 따릅니다.
현재 구현된 것은 **2. Steel 소재**, **3. Stainless 소재**, **4. Aluminum 소재**, **6. 기계가공**, **7. 기계요소**, **8. 요소설계 & 계산** 여섯 카테고리이고, 나머지는 `준비중` 뱃지로 표시된 플레이스홀더 상태입니다.

---

## 2. 구현 현황

### ✅ 구현 완료

| 카테고리 | 페이지 | 파일 |
|---|---|---|
| 2. Steel 소재 | 소재 스펙 비교 / 중량 계산기 / 등가재질 변환표 | `steel_material.html` |
| 3. Stainless 소재 | 소재 스펙 비교 / 중량 계산기 / 등가재질 변환표 | `stainless_material.html` |
| 4. Aluminum 소재 | 소재 스펙 비교 / 중량 계산기 / 등가재질 변환표 | `aluminum_material.html` |
| 6. 기계가공 | 일반형상 공차 / 허용차 계산 | `machining_allowance.html` |
| 6. 기계가공 | 끼워맞춤 공차 & Hole/Shaft 조회 | `fit_clearance.html` |
| 6. 기계가공 | 표면거칠기 & Mesh Size | `roughness_mesh.html` |
| 6. 기계가공 | 절곡 R & Bending Radius (Tube) | `bending_radius.html` |
| 6. 기계가공 | 아노다이징/도금 피막두께 & 열처리 | `surface_treatment.html` |
| 7. 기계요소 | 볼트 규격 & 체결 토크 & 자리파기 | `bolt_torque.html` |
| 7. 기계요소 | 너트 규격 (육각/POP/클린칭) | `nut_pop.html` |
| 7. 기계요소 | Key홈 / 스냅링 / Dowel Pin | `snap_ring.html` |
| 7. 기계요소 | O-Ring 선정 & 홈 설계 | `oring_selection.html` |
| 7. 기계요소 | 타이밍 풀리 & 벨트 레이아웃 | `belt.html` |
| 8. 요소설계 | Tact Time 종합 계산기 | `motion.html` |

### 🚧 준비중 (플레이스홀더만 존재)

- 6. Flange Welding (Tube)
- 7. 널링 / 쉴드 링 (Knurling / EMI)
- 8. 볼스크류 선정 검토
- 8. 공차 누적(Tolerance stack-up) 분석 — Worst Case & RSS
- 1, 5, 9~14 카테고리 전체 (기계제도/RF/EMI, 수지/세라믹/기타 소재, 진공부품, Vision Camera, 전장, 유틸리티, 기판/진동, 이송 등)

---

## 3. 새 계산기 페이지를 추가하는 방법

기존 페이지들은 아래 패턴을 공통으로 따르고 있습니다. 새 페이지를 추가할 때 이 구조를 유지하면 스타일이 자동으로 맞습니다.

### 3-1. 기본 골격

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mechhub - [페이지 제목]</title>
    <link rel="stylesheet" href="common.css">
    <style>
        /* 페이지 전용 스타일만 여기에 (예: page-grid, svg 박스 크기 등) */
        .page-grid { display: grid; grid-template-columns: 420px 1fr; gap: 20px; align-items: start; }
        @media (max-width: 1024px) { .page-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="sidebar"> ... </div>  <!-- 모든 페이지 동일, sidebarMenu는 JS로 채움 -->
    <div class="main-content">
        <div class="main-header"><h2>[카테고리 번호]. [카테고리명] [아이콘] [페이지 제목]</h2></div>
        <div class="content-body">
            <div class="page-grid">
                <div class="input-column">  <!-- 좌측: 조건 입력 + 참고도면 -->
                    <div class="card"> ... 입력 폼 ... </div>
                    <div class="card"> ... SVG 참고도면 (탭 전환 시 drawing-container로 분기) ... </div>
                </div>
                <div class="output-column"> <!-- 우측: 계산 결과 -->
                    <div class="card"> ... result-grid / result-item ... </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        // DB(상수 테이블) 정의 → 계산 함수 → 사이드바 메뉴 생성 → window.onload
    </script>
</body>
</html>
```

### 3-2. 공통 CSS 클래스 (`common.css`에 이미 정의됨, 재사용할 것)

- **레이아웃**: `.page-grid`, `.input-column`, `.output-column`
- **입력**: `.card`, `.form-group` / `.input-group`, `.form-control`, `.input-wrapper` + `.unit`
- **탭**: `.tabs`, `.tab-btn`, `.tab-content` / `.drawing-container` (+`.active`)
- **결과**: `.result-grid`, `.result-item` (`.highlight` / `.warn` / `.ok` 상태 색상)
- **버튼**: `.btn-calc-main`, `.btn-calc-sm`
- **표**: `.data-table` (규격 스펙 테이블용)
- **상용 사이즈 칩**: `.length-chip`
- **안내 배너**: `.notice-banner` (`.info` 옵션)

새 스타일이 꼭 필요하면 페이지 `<style>` 블록에 최소한만 추가하고, 재사용 가능성이 있으면 `common.css`로 승격합니다.

### 3-3. 사이드바 메뉴 등록 체크리스트

새 페이지를 만들면 다음 두 곳을 함께 갱신해야 합니다.

1. **`index.html`**: 해당 카테고리 섹션(`.grid` 안)에 카드(`<a class="card">`) 추가
2. **모든 페이지의 `createSidebarMenu()`**: 각 HTML 파일 하단 `<script>`에 사이드바 메뉴 배열이 개별적으로 하드코딩되어 있음 → 신규 카테고리를 열거나 상태(`ready` → 구현됨)를 바꿀 경우 **전체 파일에 일괄 반영 필요**

> ⚠️ 현재 구조상 사이드바 메뉴가 파일마다 중복 정의되어 있어, 항목이 늘어날수록 동기화 누락 위험이 있습니다. 페이지 수가 더 늘어나면 `sidebar-menu.js` 같은 공통 스크립트로 분리하는 걸 권장합니다. (아래 개선 아이디어 참고)

### 3-4. 계산 로직 작성 규칙

- 규격 데이터(볼트 사이즈, 공차 등급, O-Ring 표준 치수 등)는 JS 객체 리터럴로 페이지 상단에 DB 형태로 선언 (`boltDB`, `nominalDia` 등 기존 패턴 참고)
- 계산 함수는 `calculate[대상]()` 네이밍, `onchange`/`onclick`으로 바로 트리거
- 결과값은 `.value` 안에 `숫자 + <span>단위</span>` 형태로 렌더링
- 범위를 벗어나는 입력에는 `.notice-banner`로 경고 문구 표시 (예: bolt_torque의 강도구분 범위 초과 케이스)

---

## 4. 로드맵 / TODO

- [ ] Flange Welding (Tube) 강도 검증 계산기
- [ ] Knurling 피치 규격 & EMI Gasket 가이드
- [ ] 볼스크류 선정 (정격수명 / 허용회전수 / 좌굴하중)
- [ ] 공차 누적 분석 (Worst Case & RSS 통계적 방법)
- [ ] 진공부품, Vision Camera, 전장/제어 등 미착수 카테고리 착수
- [ ] 사이드바 메뉴 공통 스크립트화 (중복 정의 제거)
- [ ] 반응형/모바일 레이아웃 점검 (`page-grid` 외 다른 페이지들도 브레이크포인트 통일)

---

## 5. 기여 / 유지보수 메모

- 모든 텍스트/UI는 한국어(`lang="ko"`) 기준, 실무 도면 표기 관례(예: dk, k, L, S 등 볼트 치수 기호)를 그대로 사용합니다.
- 색상/타이포 등 디자인 토큰은 `common.css` 최상단 `:root` 변수(`--primary-color`, `--accent-color` 등)로 관리되므로, 톤을 바꿀 땐 여기만 수정하면 전체 페이지에 반영됩니다.
- 각 계산기 페이지는 완전히 독립적(다른 페이지에 의존하지 않음)이라 개별 파일만 열어도 로컬에서 바로 테스트 가능합니다 (서버 불필요, `index.html` 더블클릭으로 확인).

---

## 6. 참고자료 요청

새 계산기를 추가할 때 아래와 같은 자료가 있으면 정확도가 크게 올라갑니다:

- 사내에서 쓰는 규격 원본 표(볼트/너트/스냅링 등 KS, JIS, ISO 발췌본)
- 사내 표준 공차 기준 문서 (일반공차 등급, 끼워맞춤 적용 기준)
- 실제 도면에서 쓰는 기호/표기 관례 스크린샷
- 반도체 테스트 장비에 특화된 요구사항 (예: 클린룸 등급별 도금/표면처리 제한, 진공 챔버 부품 스펙 등)

필요한 자료 목록을 알려주시면, 다음 계산기 우선순위를 함께 정하겠습니다.
