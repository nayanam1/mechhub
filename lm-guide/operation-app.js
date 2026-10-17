(function(){
 'use strict';
 const $=id=>document.getElementById(id),P=OperationProfile;
 const keys=['strokeMm','forwardTimeS','pressForceTonf','pressDistanceMm','pressTimeS','movingMassKg','orientation','rampFraction','holdTimeS','returnTimeS','settleTimeS'];
 const initial={strokeMm:400,forwardTimeS:.6,pressForceTonf:1,rampFraction:.25,orientation:'unknown'};
 const names={timing:'시간 계산',ballscrew:'볼스크류 선정',motor:'모터 선정',lm:'LM 선정'};
 const driveKeys=['leadsMm','screwEfficiency','ratio','driveEfficiency','screwSideInertia','motorSideInertia','extraAxialResistanceN','preloadTorqueNm'];
 const driveDefaults={leadsMm:'5,10,20,25,32,40',ratio:1,driveEfficiency:1};
 const cycleKeys=['forceMode','verticalDirection','reverseScrewEfficiency','reverseDriveEfficiency','returnForceN','holdMotorTorqueNm','settleMotorTorqueNm','ratedTorqueNm','maxTorqueNm','ratedRpm','maxRpm'];
 const fmt=(n,d=3)=>n===null?'미정':Number(n.toFixed(d)).toLocaleString('ko-KR');
 let current=null,currentDrive=null,currentCycle=null,currentCatalog=null;
 const catalogKeys=['supplyVoltage','extraMotorInertia','ambientC','installationConfirmed'];
 function text(tag,value){const e=document.createElement(tag);e.textContent=value;return e;}
 function consumer(p,key){
  const v=P.forTool(p,key);
  if(key==='motor'&&currentCatalog)return {...v,status:'MINAS A6 카탈로그 · 리드별 조건부 후보/제외 비교',missing:[...currentCatalog.missing,'05에서 후보별 누락 조건·제외 이유·곡선과 보호시간 근거를 확인하세요.']};
  if(key==='motor'&&currentCycle)return {...v,status:currentCycle.ready?'전체 사이클 RMS 계산 완료 · 모터 수치 제한 비교':'전체 사이클 RMS · 추가 입력 필요',missing:[...currentCycle.missing,...currentCycle.limitMissing,'토크속도 곡선·피크 지속시간·열/드라이버/기계계통 검증']};
  if(currentDrive&&['ballscrew','motor'].includes(key))return {...v,status:currentDrive.boundReady?'토크 상한 참고 계산 완료 · 제품 선정 미실행':'회전수·토크 성분 부분 계산 · 추가 조건 필요',missing:[...currentDrive.missing,...currentDrive.selectionMissing]};
  return v;
 }
 function drive(p){
  currentDrive=null;$('drive-error').hidden=true;$('drive-table').replaceChildren();$('drive-missing').replaceChildren();$('drive-assumptions').replaceChildren();
  try{
   const d=DriveCalculations.calculate(p,Object.fromEntries(driveKeys.map(k=>[k,$(k).value])));currentDrive=d;
   $('drive-status').textContent=(p.forwardMotionComplete?'입력한 접근·가압 구간의 회전수':'가압 구간 미정 · 전체 이동 참고 파형의 회전수')+' / '+p.id+' · '+(d.boundReady?'보수적 토크 상한 계산 가능':'미입력 조건은 계산하지 않음');
   const fmtValue=(v,digits=2)=>v===null?'미정':fmt(v,digits);
   const heads=['리드 mm',p.forwardMotionComplete?'접근 최고 rpm':'참고 최고 rpm','가압 최고 rpm','복귀 최고 rpm',p.forwardMotionComplete?'입력구간 모터 최고 rpm':'모터 참고 최고 rpm','이상 가압 토크 N·m (η=1)','스크류 가압 부하 토크 N·m','모터축 가압 부하 토크 N·m','모터 토크 상한 N·m'];
   $('drive-table').innerHTML='<table><thead><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+d.rows.map(r=>'<tr>'+[r.leadMm,p.forwardMotionComplete?r.approachPeakScrewRpm:r.referencePeakScrewRpm,r.pressPeakScrewRpm,r.returnPeakScrewRpm,r.peakMotorRpm,r.idealPressScrewTorqueNm,r.pressScrewLoadTorqueNm,r.pressMotorLoadTorqueNm,r.motorTorqueBoundNm].map(v=>'<td>'+fmtValue(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
   $('drive-missing').append(...[...d.missing,...d.selectionMissing].map(m=>text('li',m)));
   $('drive-assumptions').append(...d.assumptions.map(m=>text('li',m)));
  }catch(e){$('drive-error').textContent=e.message;$('drive-error').hidden=false;$('drive-status').textContent='구동 조건 입력 오류 · 이전 비교 결과를 제거했습니다.';}
 }
 function cycleDetails(){
  $('cycle-phases').replaceChildren();if(!currentCycle?.ready)return;
  const row=currentCycle.rows.find(r=>String(r.leadMm)===$('cycle-detail-lead').value);if(!row)return;
  const heads=['구간','시작 s','종료 s','토크 시작 N·m','토크 종료 N·m','시작 rpm','종료 rpm'];
  $('cycle-phases').innerHTML='<table><thead><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+row.phases.map(q=>'<tr>'+[q.name,fmt(q.startS),fmt(q.endS),fmt(q.torqueStartNm),fmt(q.torqueEndNm),fmt(q.rpmStart,1),fmt(q.rpmEnd,1)].map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
 }
 function cycle(p){
  currentCycle=null;$('cycle-error').hidden=true;for(const id of ['cycle-table','cycle-missing','cycle-assumptions','cycle-phases','catalog-table','catalog-missing','catalog-detail-content'])$(id).replaceChildren();
  try{
   if(!currentDrive){$('cycle-status').textContent='구동 계산 입력 오류를 먼저 수정하세요.';return;}
   const c=CycleTorque.calculate(p,currentDrive,Object.fromEntries(cycleKeys.map(k=>[k,$(k).value])));currentCycle=c;
   $('cycle-status').textContent=(c.ready?'전체 사이클 '+fmt(c.cycleTimeS)+' s · RMS 계산 완료':'전체 사이클 RMS 미계산 · 추가 입력 필요')+' / '+p.id;
   const check=v=>v===null?'미검토':v?'통과':'초과',heads=['리드 mm','RMS N·m','최대 |T| N·m','최대 |rpm|','RMS ≤ 정격','피크 ≤ 최대','rpm ≤ 최대','정격속도 영역','판정 범위'];
   $('cycle-table').innerHTML='<table><thead><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+c.rows.map(r=>'<tr>'+[fmt(r.leadMm),fmt(r.rmsTorqueNm),fmt(r.peakAbsTorqueNm),fmt(r.peakAbsRpm,1),check(r.checks.ratedTorque),check(r.checks.peakTorque),check(r.checks.maximumSpeed),r.checks.withinRatedSpeed===null?'미검토':r.checks.withinRatedSpeed?'영역 내':'초과 · 곡선 확인',r.status].map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
   $('cycle-missing').append(...[...c.missing,...c.limitMissing].map(v=>text('li',v)));
   if(!c.missing.length&&!c.limitMissing.length)$('cycle-missing').append(text('li','입력 완료. 토크속도 곡선·과부하 허용시간·열·드라이버·제동과 기계부 적합성은 별도 검토하세요.'));
   $('cycle-assumptions').append(...c.assumptions.map(v=>text('li',v)));
   const selected=$('cycle-detail-lead').value;$('cycle-detail-lead').replaceChildren(...c.rows.map(r=>{const o=text('option',r.leadMm+' mm');o.value=String(r.leadMm);return o;}));if(c.rows.some(r=>String(r.leadMm)===selected))$('cycle-detail-lead').value=selected;
   cycleDetails();
  }catch(e){$('cycle-error').textContent=e.message;$('cycle-error').hidden=false;$('cycle-status').textContent='사이클 조건 입력 오류 · 이전 RMS와 판정을 제거했습니다.';}
 }
 function catalogDetails(){
  const box=$('catalog-detail-content');box.replaceChildren();if(!currentCatalog)return;
  const r=currentCatalog.rows.find(v=>v.modelId+'|'+v.leadMm===$('catalog-detail').value);if(!r)return;
  const m=r.model;
  box.append(text('p',m.name+' · '+m.voltage+'V · '+m.powerW+'W · 회전자 관성 '+m.rotorInertia.toExponential(3)+' kg·m² · 후보 모터측 합계 '+(r.candidateMotorInertia===null?'미정':r.candidateMotorInertia.toExponential(3))));
  const list=text('ul','');list.append(...[...r.reasons,...r.pending].map(v=>text('li',v)));box.append(list);
  const w=800,h=260,maxN=Math.max(m.maxRpm,r.peakAbsRpm||0),maxT=Math.max(m.maxTorqueNm,r.peakAbsTorqueNm||0),x=n=>55+700*n/maxN,y=t=>215-180*t/maxT;
  const path=points=>points.map(([n,t])=>x(n)+','+y(t)).join(' ');
  const graph=document.createElement('div');graph.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="속도별 연속 및 피크 허용 토크 보수 근사 곡선"><path d="M55 25V215H760" fill="none" stroke="#9bb0bb"/><polyline points="${path(m.peak)}" fill="none" stroke="#bc7725" stroke-width="3"/><polyline points="${path(m.continuous)}" fill="none" stroke="#237f75" stroke-width="3"/><text x="55" y="20">N·m · 주황: 피크 / 초록: 연속 / 회색: 운전구간</text><text x="55" y="240">0</text><text x="650" y="240">${fmt(maxN,0)} rpm</text>${r.phases.map(q=>`<polyline points="${x(Math.abs(q.rpmStart))},${y(Math.abs(q.torqueStartNm))} ${x(Math.abs(q.rpmEnd))},${y(Math.abs(q.torqueEndNm))}" fill="none" stroke="#697487" stroke-width="1.5"/>`).join('')}</svg>`;box.append(graph);
  const curveTable=text('div','');curveTable.className='table-wrap';curveTable.innerHTML='<table><thead><tr><th>곡선</th><th>회전수 rpm → 허용 N·m</th></tr></thead><tbody>'+[['연속',m.continuous],['피크',m.peak]].map(([n,pts])=>'<tr><td>'+n+'</td><td>'+pts.map(([v,t])=>v+' → '+fmt(t,3)).join(' / ')+'</td></tr>').join('')+'</tbody></table>';box.append(curveTable);
  if(r.detail){
   box.append(text('p','속도별 열 지표 상한: '+fmt(r.detail.normalizedRmsUpper)+' (1 이하 기준). 과부하 에피소드 '+r.detail.overload.length+'개.'));
   if(r.detail.worst)box.append(text('p','초과 위치: '+r.detail.worst.name+' · '+r.detail.worst.reason+(r.detail.worst.rpm===undefined?'':' · '+fmt(Math.abs(r.detail.worst.rpm),1)+'rpm / 요구 '+fmt(Math.abs(r.detail.worst.torque))+' / 허용 '+fmt(r.detail.worst.allow)+' N·m')));
   const events=text('ul','');events.append(...r.detail.overload.map(e=>text('li',e.names.filter((v,i,a)=>a.indexOf(v)===i).join(' → ')+' · '+e.mode+' · '+fmt(e.durationS,4)+'s 연속'+(e.wraps?' (사이클 경계 연결)':'')+' · 최대 '+fmt(e.peakPercent,1)+'% · 보호시간 검토값 '+(e.screenTimeS===null?'미등록':e.screenTimeS+'s')+' · '+(e.withinScreen===null?'시간 미판정':e.withinScreen?'단발 검토값 미만 · 반복 허용 미확인':'보수 시간 기준 초과'))));box.append(events);
  }
  const links=text('p','근거: ');for(const [label,url] of [['사양 '+m.specPage+'쪽',m.source.technical+'#page='+m.specPage],['토크속도 '+m.curvePage+'쪽',m.source.technical+'#page='+m.curvePage],['과부하 PDF 2쪽 (인쇄 379–380)',m.source.information+'#page=2'],['공식 사양·곡선 원본',m.source.technical+'#page='+m.curvePage],['공식 과부하 원본',m.source.information+'#page=2']]){const a=text('a',label);a.href=url;a.target='_blank';a.rel='noopener';links.append(a,document.createTextNode(' · '));}box.append(links);
 }
 function catalogTable(){
  $('catalog-table').replaceChildren();if(!currentCatalog)return;
  const rows=currentCatalog.rows.filter(r=>$('catalog-filter').value==='all'||!r.reasons.length);
  if(!rows.length){$('catalog-table').append(text('p','현재 조건에서 제외되지 않은 등록 후보가 없습니다. 전체 표시로 제외 이유를 확인하세요.'));return;}
  const headers=['모터 형번군','전원 / 출력','리드 mm','후보 RMS N·m','최대 |T| N·m','최고 rpm','판정 / 제외 이유','근거 PDF'];
  const table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');tr.append(...headers.map(v=>text('th',v)));head.append(tr);table.append(head);const body=document.createElement('tbody');
  for(const r of rows){const q=document.createElement('tr');q.append(...[r.modelId,r.model.voltage+'V / '+r.model.powerW+'W',r.leadMm,fmt(r.rmsTorqueNm),fmt(r.peakAbsTorqueNm),fmt(r.peakAbsRpm,1),r.status+(r.reasons.length?' · '+r.reasons.join(' / '):'')].map(v=>text('td',v)));const cell=document.createElement('td');for(const [label,url] of [['사양 p'+r.model.specPage,r.model.source.technical+'#page='+r.model.specPage],['곡선 p'+r.model.curvePage,r.model.source.technical+'#page='+r.model.curvePage],['과부하 p2',r.model.source.information+'#page=2']]){const a=text('a',label);a.href=url;a.target='_blank';a.rel='noopener';cell.append(a,document.createTextNode(' '));}q.append(cell);body.append(q);}table.append(body);$('catalog-table').append(table);
 }
 function catalog(p){
  const selectedCatalog=$('catalog-detail').value;currentCatalog=null;$('catalog-error').hidden=true;for(const id of ['catalog-table','catalog-missing','catalog-detail-content'])$(id).replaceChildren();$('catalog-detail').replaceChildren();
  if(!currentDrive){$('catalog-status').textContent='구동 입력 오류를 먼저 수정하세요.';return;}
  try{
   const c=MotorMatching.calculate(p,currentDrive,Object.fromEntries(cycleKeys.map(k=>[k,$(k).value])),Object.fromEntries(catalogKeys.map(k=>[k,$(k).value])));currentCatalog=c;
   const remaining=c.rows.filter(r=>!r.reasons.length),conditional=remaining.filter(r=>r.status.startsWith('조건부'));
   $('catalog-status').textContent=p.id+' · '+c.rows.length+'개 모터×리드 조합 · 조건부 후보 '+conditional.length+' · 추가 입력/확인 '+(remaining.length-conditional.length)+' · 제외 '+(c.rows.length-remaining.length)+' · 최종 적합 판정 없음';
   $('catalog-missing').append(...[...new Set([...c.missing,...(c.rows[0]?.pending||[]).filter(v=>!v.includes('정확한 형번'))])].map(v=>text('li',v)));
   const options=[...c.rows].sort((a,b)=>(a.reasons.length>0)-(b.reasons.length>0)||a.model.powerW-b.model.powerW);$('catalog-detail').append(...options.map(r=>{const o=text('option',r.modelId+' · '+r.leadMm+'mm · '+r.status);o.value=r.modelId+'|'+r.leadMm;return o;}));if(c.rows.some(r=>r.modelId+'|'+r.leadMm===selectedCatalog))$('catalog-detail').value=selectedCatalog;catalogTable();catalogDetails();
  }catch(e){$('catalog-error').hidden=false;$('catalog-error').textContent=e.message;$('catalog-status').textContent='후보 비교 오류 · 이전 결과를 제거했습니다.';}
 }
 function chart(p){
  const complete=p.forwardMotionComplete,segments=complete?p.forwardSegments:[p.referenceMotion];
  const vmax=Math.max(...segments.map(s=>s.peakVelocityMps)),width=900,x0=65,y0=200,h=140,w=width-x0-30;
  const x=t=>x0+w*t/p.forwardTimeS,y=v=>y0-h*v/vmax;
  let paths='';
  for(const s of segments){const points=[[s.startS,0],...s.phases.map(q=>[q.endS,q.endVelocityMps])];paths+=`<polyline points="${points.map(q=>x(q[0])+','+y(q[1])).join(' ')}" fill="none" stroke="${s.name==='가압 이동'?'#bc7725':'#237f75'}" stroke-width="3" ${complete?'':'stroke-dasharray="7 5"'}/>`;}
  const boundary=complete?p.forwardSegments[1].startS:null;
  $('velocity-chart').innerHTML=`<svg viewBox="0 0 900 250" role="img" aria-label="${complete?'접근 및 가압 이동 속도':'가압 구간 미정인 전체 이동 참고 속도'}"><path d="M${x0} 35V${y0}H870" fill="none" stroke="#9bb0bb"/>${boundary===null?'':`<rect x="${x(boundary)}" y="40" width="${x(p.forwardTimeS)-x(boundary)}" height="160" fill="#fff2d9"/><text x="${x(boundary)+5}" y="30">끝부분 가압 이동</text>`}${paths}<text x="10" y="20">속도 · mm/s</text><text x="5" y="65">${fmt(vmax*1000,1)}</text><text x="${x0}" y="225">0</text><text x="${x(p.forwardTimeS)-60}" y="225">${fmt(p.forwardTimeS)} s</text></svg>`;
 }
 function render(){
  current=null;$('export-status').textContent='';$('profile-results').hidden=true;$('profile-error').hidden=true;
  try{
   const input=Object.fromEntries(keys.map(k=>[k,$(k).value]));const p=P.build(input);current=p;
   $('profile-status').textContent=p.forwardMotionComplete?'접근·가압 이동 구간 계산 완료 · 전체 사이클과 제품 선정은 별도 확인':'부분 입력 · 전체 이동의 참고 파형만 계산했습니다. 가압 거리와 가압 이동 시간을 입력하면 접근/가압을 분리합니다.';
   $('profile-metrics').replaceChildren();
   for(const [label,value,note] of [['편도 평균 속도',fmt(p.averageForwardVelocityMps*1000)+' mm/s','가속·감속을 포함한 평균값'],['끝부분 요구 가압력',fmt(p.pressForceN,2)+' N','1 tonf = 9,806.65 N · 이동 질량 아님'],['전체 사이클',p.cycleTimeS===null?'미정':fmt(p.cycleTimeS)+' s','편도 + 유지 + 복귀 + 기타 대기'],['운전 프로파일',p.forwardMotionComplete?'구간 분리 완료':'가압 구간 미정',p.id]]){const e=text('div','');e.className='metric';e.append(text('small',label),text('b',value),text('small',note));$('profile-metrics').append(e);}
   $('waveform-note').textContent=p.forwardMotionComplete?'접근과 가압 이동은 각 구간에서 정지 출발·정지 종료하는 시간 모델입니다. 음영은 가압 구간이며, 힘의 시간 분포를 뜻하지 않습니다.':'점선은 가압 구간을 나누지 않은 참고 파형입니다. 실제 가압 동작과 최고속도를 확정한 결과가 아닙니다. 현재 가속·감속 비율 '+fmt(p.rampFraction*100)+'%.';
   chart(p);
   const rows=p.forwardMotionComplete?p.forwardSegments:[p.referenceMotion];
   $('segment-table').innerHTML='<table><thead><tr><th>구간</th><th>거리 mm</th><th>시간 s</th><th>최고속도 mm/s</th><th>가속도 m/s²</th></tr></thead><tbody>'+rows.map(s=>`<tr><td>${s.name}</td><td>${fmt(s.distanceMm)}</td><td>${fmt(s.timeS)}</td><td>${fmt(s.peakVelocityMps*1000)}</td><td>${fmt(s.peakAccelerationMps2)}</td></tr>`).join('')+'</tbody></table>';
   $('profile-assumptions').replaceChildren(...p.assumptions.map(v=>text('li',v)));
   drive(p);
   cycle(p);
   catalog(p);
   $('consumer-cards').replaceChildren();
   for(const key of Object.keys(names)){const v=consumer(p,key),e=text('article','');e.className='consumer';e.dataset.tool=key;e.dataset.profileId=v.profileId;
    e.append(text('h3',names[key]),text('code',v.profileId));const state=text('p',v.status);state.className='state';e.append(state,text('p',`편도 ${fmt(p.strokeMm)} mm / ${fmt(p.forwardTimeS)} s · 끝부분 ${fmt(p.pressForceTonf)} tonf · 질량 ${p.movingMassKg===null?'미정':fmt(p.movingMassKg)+' kg'}`));
    if(v.missing.length){e.append(text('p','추가 확인'),Object.assign(document.createElement('ul'),{}));e.lastChild.append(...v.missing.map(m=>text('li',m)));}else e.append(text('p','편도 구간 시간 계산에 필요한 입력 완료. 제품 적합 판정은 아닙니다.'));
    $('consumer-cards').append(e);
   }
   $('lm-gate').textContent=P.legacyLM(p).reason;$('profile-results').hidden=false;
   document.dispatchEvent(new CustomEvent('operation-profile:change',{detail:p}));
  }catch(e){current=null;currentDrive=null;currentCycle=null;currentCatalog=null;for(const id of ['profile-metrics','velocity-chart','segment-table','consumer-cards','profile-assumptions','drive-table','drive-missing','drive-assumptions','cycle-table','cycle-missing','cycle-assumptions','cycle-phases','catalog-table','catalog-missing','catalog-detail-content'])$(id).replaceChildren();$('lm-gate').textContent='';$('profile-error').textContent=e.message;$('profile-error').hidden=false;$('profile-status').textContent='입력 오류 · 이전 결과를 제거했습니다.';document.dispatchEvent(new CustomEvent('operation-profile:change',{detail:null}));}
 }
 $('catalog-form').addEventListener('submit',e=>e.preventDefault());$('catalog-form').addEventListener('input',render);$('catalog-form').addEventListener('change',render);$('catalog-detail').addEventListener('change',catalogDetails);$('catalog-filter').addEventListener('change',catalogTable);
 $('profile-form').addEventListener('submit',e=>e.preventDefault());$('profile-form').addEventListener('input',render);$('profile-form').addEventListener('change',render);
 $('drive-form').addEventListener('submit',e=>e.preventDefault());$('drive-form').addEventListener('input',render);$('drive-form').addEventListener('change',render);
 $('cycle-form').addEventListener('submit',e=>e.preventDefault());$('cycle-form').addEventListener('input',render);$('cycle-form').addEventListener('change',render);$('cycle-detail-lead').addEventListener('change',cycleDetails);
 $('reset-profile').addEventListener('click',()=>{for(const k of keys)$(k).value=initial[k]??'';for(const k of driveKeys)$(k).value=driveDefaults[k]??'';for(const k of catalogKeys)$(k).value='';for(const k of cycleKeys)$(k).value=['forceMode','verticalDirection'].includes(k)?'unknown':'';render();});
 $('export-profile').addEventListener('click',()=>{if(!current)return;const data={schema:'mechhub.operation-profile.v1',profile:current,driveCalculations:currentDrive,cycleTorque:currentCycle,motorCatalog:currentCatalog,consumers:Object.keys(names).map(k=>{const v=consumer(current,k);return {tool:k,profileId:v.profileId,ready:v.ready,missing:v.missing};})};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=current.id+'.json';a.click();URL.revokeObjectURL(url);$('export-status').textContent='공통 프로파일·구동 계산·사이클 RMS와 모터 비교를 JSON으로 저장했습니다.';});
 render();
})();
