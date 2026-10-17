(function(){
 'use strict';
 const $=id=>document.getElementById(id),C=LMCatalogue,T=LMThetaRaceways;
 const E=[...LMExamples,...LMExtendedExamples,...LMCombinedExamples,...LMSpanExamples,...LMBoundaryExamples,...LMFineExamples,...LMGrExamples];
 const labels={mass:'질량 m · kg',BS:'블록 간격 BS · mm',Gr:'무게중심 Gr · mm',Ga:'무게중심 Ga · mm',Gt:'무게중심 Gt · mm',Br:'추력 위치 Br · mm',Bt:'추력 위치 Bt · mm',speed:'속도 V · mm/s',time:'가감속 시간 tn · s',stroke:'스트로크 ST · mm',cycles:'왕복 빈도 · 회/h',C:'C50 · N',C0:'C0 · N',fw:'하중계수 fw'};
 for(const [key,label] of Object.entries(labels)){const div=document.createElement('div'),l=document.createElement('label'),e=document.createElement('input');l.htmlFor='in-'+key;l.textContent=label;e.id=l.htmlFor;e.type='number';e.step='any';e.required=true;div.append(l,e);$('fields').append(div);}
 E.forEach(e=>{const o=document.createElement('option');o.value=e.id;o.textContent=e.name;$('example').append(o);});
 const f=(v,d=6)=>Number.isFinite(v)?v.toLocaleString('ko-KR',{maximumFractionDigits:d}):'∞';
 const sign=v=>v>0?'+':'−';let source=E[0],last=null;
 const read=()=>Object.fromEntries(Object.keys(labels).map(k=>[k,$('in-'+k).value===''?NaN:Number($('in-'+k).value)]));
 const exact=p=>Object.keys(labels).every(k=>p[k]===source.inputs[k]);
 function render(){
  $('error').hidden=true;$('export').disabled=true;last=null;
  try{
   const p=read(),isExplicit=$('mode').value==='explicit',candidate=isExplicit?null:T.calculate(p),movement=C.motion(p);
   $('explicit-panel').hidden=!isExplicit;
   $('mode-note').textContent=isExplicit?'직접 입력 PE를 공식 평균·수명 식으로 집계합니다. 초기값은 후보 하중입니다.':'형상 하중은 Theta 후보, PE 이후는 카탈로그 집계입니다. 전체를 공식 선정식으로 표시하지 않습니다.';
   let r=candidate;
   if(isExplicit){const data=JSON.parse($('pe-json').value);if(!Array.isArray(data)||data.length!==2||data.some(b=>!Array.isArray(b.channels)||b.channels.length!==4))throw new Error('2블록 × 4개 홈의 channels/PE 배열을 입력하세요.');r={...C.aggregateRaceways({...p,referenceKm:50},data,movement.distances),distances:movement.distances,basis:{status:'catalogue-aggregation-user-supplied-PE',inputNote:'PE의 타당성과 제품 적용성은 별도 확인'},shortStrokeWarning:p.stroke<=62};}
   const datumText=$('datum-h').value,datumH=datumText===''?null:Number(datumText);
   if(datumH!==null&&!$('datum-source').value.trim())throw new Error('h를 입력할 때 치수·도면 근거도 기록하세요.');
   const geometry=LMThetaGeometry.calculate(p,{loadCenterFromMountMm:datumH,datumSource:$('datum-source').value.trim()});
   $('geometry').innerHTML=`<p>점지지 계수 1/BS=${f(geometry.pointSupportCoefficient,9)} mm⁻¹ · 롤 기준점 ${datumH===null?'미확정':f(datumH)+' mm (사용자 지정)'}.</p><table><tr><th>구간</th><th>No.1 / No.2 레이디얼 합력 N</th><th>No.1 / No.2 횡방향 합력 N</th><th>잔여 롤 모멘트 N·mm</th></tr>${geometry.phases.map((v,i)=>`<tr><td>${['가속','정속','감속'][i]}</td><td>${v.pointLoads.radial.map(n=>f(n)).join(' / ')}</td><td>${v.pointLoads.lateral.map(n=>f(n)).join(' / ')}</td><td>${v.residualRollNmm===null?'미확정':f(v.residualRollNmm)}</td></tr>`).join('')}</table>`;
   const matched=exact(p)&&!isExplicit;
   $('status').textContent=matched?'공식 출력과 같은 입력조건입니다. 후보 하중에서 Pm을 재계산하여 대조합니다.':'공식 출력과의 대조를 해제했습니다. 이 입력의 수치 일치를 주장하지 않습니다.';
   $('scope').textContent=(isExplicit?'공식 집계만 적용 · 입력 PE의 근거는 별도 확인. ':'Theta 후보 계층 · BS별 kP와 Gr 원점5.7 mm는 미확정. 부호 조회표를 사용하지 않음. ')+(r.shortStrokeWarning?'단거리 적용 주의: ST가 HSR10R 블록 길이31 mm의2배 이하입니다. 수명은 진단 계산값으로 확인하세요.':'');
   $('kinematics').textContent=`구간거리 ${r.distances.map(v=>f(v,4)).join(' / ')} mm · fw는1회 적용 · C50 기준 · ${isExplicit?'직접 PE':`kP=${candidate.kP} mm⁻¹, R=${f(candidate.R)} N (후보)`}`;
   $('metrics').innerHTML=`<div class="metric"><small>전체 후보 수명 · km</small><strong>${f(r.lifeKm,0)}</strong></div><div class="metric"><small>전체 정적 안전율 · 후보</small><strong>${f(r.safety,4)}</strong></div><div class="metric"><small>후보 수명 · h</small><strong>${f(r.hours,0)}</strong></div>`;
   $('comparison').innerHTML='<table><thead><tr><th>블록</th><th>Pm 계산 N</th><th>fw·Pm N</th><th>THK Pm/fw N</th><th>Δ N</th><th>판정</th></tr></thead><tbody>'+r.blocks.map((b,i)=>{const diff=matched?b.selected.Pm-source.expected.Pm[i]:null;return `<tr><td>No.${i+1}</td><td>${f(b.selected.Pm)}</td><td>${f(b.weightedPm)}</td><td>${matched?f(source.expected.Pm[i]):'—'}</td><td>${matched?f(diff):'—'}</td><td class="${matched&&Math.abs(diff)<=.15?'pass':'difference'}">${matched?(Math.abs(diff)<=.15?'허용차 내':'차이 확인'):'대조 해제'}</td></tr>`;}).join('')+'</tbody></table>'+(matched?`<p class="muted"><a target="_blank" rel="noopener" href="${source.source}">THK 원본 PDF ↗</a> · 전체 안전율 절삭 표시 ${f(Math.floor((r.safety+1e-10)*10)/10,1)} / THK ${source.expected.safety??'구형 구간 표기 별도'}. 수명차이: ${r.blocks.map((b,i)=>`No.${i+1} ${f(Math.abs(b.lifeKm/source.expected.L[i]-1)*100,4)}%`).join(', ')}.</p>`:'');
   $('raceways').innerHTML=r.blocks.map((b,i)=>`<details open><summary>No.${i+1} · Pm ${f(b.selected.Pm)} N · ${b.channels.filter(c=>Math.abs(c.Pm-b.selected.Pm)<1e-9).length}개 홈 동률</summary><div class="scroll"><table><thead><tr><th>홈 방향 (sr,st)</th><th>PE 가속 N</th><th>PE 정속 N</th><th>PE 감속 N</th><th>Pm N</th></tr></thead><tbody>${b.channels.map((c,j)=>`<tr class="${Math.abs(c.Pm-b.selected.Pm)<1e-9?'selected':''}"><td>${Number.isFinite(c.sr)?sign(c.sr):j+1}, ${Number.isFinite(c.st)?sign(c.st):'—'}</td>${c.PE.map(v=>`<td>${f(v)}</td>`).join('')}<td>${f(c.Pm)}</td></tr>`).join('')}</tbody></table></div>${!isExplicit?`<p class="muted">D=${b.radialBase.map(v=>f(v)).join(' / ')} N, PT=${b.lateral.map(v=>f(v)).join(' / ')} N, R=${f(b.rollEquivalent)} N. PRq=D+st·R를 각 홈에 개별 적용.</p>`:''}</details>`).join('');
   last={version:'catalogue-separation-v1',inputs:p,source:matched?source.source:null,matchedInput:matched,geometryEquilibrium:geometry,result:r};$('export').disabled=false;
  }catch(e){$('error').hidden=false;$('error').textContent=e.message;for(const id of ['status','scope','kinematics','metrics','comparison','raceways','geometry'])$(id).replaceChildren();}
 }
 function load(id){source=E.find(e=>e.id===id)||E[0];$('example').value=source.id;for(const key of Object.keys(labels))$('in-'+key).value=source.inputs[key];$('mode').value='theta';const r=T.calculate(source.inputs);$('pe-json').value=JSON.stringify(r.blocks.map(b=>({channels:b.channels.map(c=>({sr:c.sr,st:c.st,PE:c.PE}))})),null,2);render();}
 $('example').addEventListener('change',()=>load($('example').value));$('form').addEventListener('submit',e=>e.preventDefault());$('form').addEventListener('input',render);$('mode').addEventListener('change',render);$('pe-json').addEventListener('input',render);$('datum-h').addEventListener('input',render);$('datum-source').addEventListener('input',render);$('reset').addEventListener('click',()=>load(source.id));$('base').addEventListener('click',()=>load('theta-0'));$('gr555').addEventListener('click',()=>load('gr-GrBoundary5p55'));
 $('export').addEventListener('click',()=>{if(!last)return;const url=URL.createObjectURL(new Blob([JSON.stringify(last,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='Theta_catalogue_trace.json';a.click();URL.revokeObjectURL(url);});load('theta-0');
})();

