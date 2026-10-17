'use strict';
const tools=[
 {name:'LM Guide 선정',en:'LINEAR GUIDE',icon:'↔',status:'조건부 가선정',type:'limited',url:'lm-guide/common.html',text:'설치 자세와 블록 배치, 무게중심을 입력하고 블록별 하중과 제품 후보를 확인합니다.',detail:'26개 제품 데이터 · NSK 12형번 계산',scope:'현재 계산: 벽면 · 1레일 · 2블록'},
 {name:'볼스크류 선정',en:'BALL SCREW',icon:'⟷',status:'조건부 가선정',type:'limited',url:'engineering/index.html?tool=screw',text:'리드별 축하중·수명·정적 안전율을 검토하고 지지조건에 따른 좌굴과 위험속도를 확인합니다.',detail:'THK BNK · 4개 카탈로그 구성',scope:'G0 예압 수명 미검증 · G2 조건부 후보'},
 {name:'모터 선정',en:'SERVO MOTOR',icon:'◎',status:'조건부 가선정',type:'limited',url:'engineering/index.html?tool=motor',text:'가속·정속·감속·정지 구간의 요구 토크와 RMS 토크, 회전 관성비를 비교합니다.',detail:'Panasonic MINAS A6 · 100 / 200 / 400W',scope:'직결 축 · 0~3,000rpm · 주위 0~20℃'},
 {name:'택타임 계산',en:'MOTION TIME',icon:'◷',status:'계산 제공',type:'ready',url:'takt.html',text:'거리·최고속도·가감속도로 삼각형 또는 사다리꼴 이동 시간을 계산하고 왕복 사이클을 확인합니다.',detail:'속도 그래프 · 편도 / 왕복 · JSON 저장',scope:'정지→이동→정지 · 이상화 등가속도'},
 {name:'공통 운전 프로파일',en:'OPERATING PROFILE',icon:'⌁',status:'계산 제공',type:'ready',url:'lm-guide/operation.html',text:'접근·가압·유지·복귀 동작을 나누고 시간과 리드별 토크를 비교합니다.',detail:'접근 / 가압 / 복귀 · 리드별 비교',scope:'시간과 힘의 적용 구간을 구분하여 입력'},
 {name:'카탈로그 라이브러리',en:'CATALOGUE LIBRARY',icon:'▤',status:'자료 검색',type:'ready',url:'https://catalog.nayanam.synology.me/',text:'메이커별 공식 카탈로그와 원문 도면을 찾아 선정 근거와 주문 사양을 확인합니다.',detail:'제품 사양 · 공식 계산식 · 도면',scope:'별도 카탈로그 서비스',external:true}
];
const grid=document.getElementById('tool-grid');
function render(q=''){const shown=tools.filter(t=>(t.name+t.en+t.detail).toLowerCase().includes(q.toLowerCase()));grid.innerHTML=shown.map(t=>`<a class="tool-card" href="${t.url}" ${t.external?'target="_blank" rel="noopener"':''}><div class="card-top"><span class="tool-icon">${t.icon}</span><span class="badge ${t.type}">${t.status}</span></div><small>${t.en}</small><h3>${t.name}<span>↗</span></h3><p>${t.text}</p><div class="card-bottom"><b>${t.detail}</b><span>${t.scope}</span></div></a>`).join('');document.getElementById('empty').hidden=shown.length>0;}
document.getElementById('tool-search').addEventListener('input',e=>render(e.target.value.trim()));render();
