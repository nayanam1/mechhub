/* Candidate-specific recalculation and conservative catalogue screening. Browser + Node. */
(function(root){'use strict';
 const D=typeof module!=='undefined'&&module.exports?require('./drive-calculations'):root.DriveCalculations;
 const C=typeof module!=='undefined'&&module.exports?require('./cycle-torque'):root.CycleTorque;
 const catalog=typeof module!=='undefined'&&module.exports?require('./minas-catalog'):root.MinasCatalog;
 function value(x,name){if(x===null||x===undefined||(typeof x==='string'&&!x.trim()))return null;if(!['number','string'].includes(typeof x))throw Error(name+'에 숫자를 입력하세요.');const n=Number(x);if(!Number.isFinite(n)||n<0)throw Error(name+'에 0 이상의 유한한 수를 입력하세요.');return n;}
 function curve(points,rpm){const n=Math.abs(rpm);if(n>points.at(-1)[0]+1e-8)return null;for(let i=1;i<points.length;i++){const [a,b]=points[i-1],[c,d]=points[i];if(n<=c)return b+(d-b)*(n-a)/(c-a);}return points.at(-1)[1];}
 function screen(row,m){
  let peakOk=true,heatBound=0,heatKnown=true,overload=[],worst=null;
  for(const q of row.phases){
   const T=u=>q.torqueStartNm+(q.torqueEndNm-q.torqueStartNm)*u;
   const N=u=>q.rpmStart+(q.rpmEnd-q.rpmStart)*u;
   let cuts=[0,1];
   function cut(y,a,b){if(b!==a){const u=(y-a)/(b-a);if(u>0&&u<1)cuts.push(u);}}
   cut(0,q.torqueStartNm,q.torqueEndNm);cut(0,q.rpmStart,q.rpmEnd);
   for(const [n] of [...m.continuous,...m.peak])for(const sign of [-1,1])cut(n*sign,q.rpmStart,q.rpmEnd);
   cuts=[...new Set(cuts)].sort((a,b)=>a-b);
   for(let i=1;i<cuts.length;i++){
    const a=cuts[i-1],b=cuts[i],ca=curve(m.continuous,N(a)),cb=curve(m.continuous,N(b)),pa=curve(m.peak,N(a)),pb=curve(m.peak,N(b));
    if([ca,cb,pa,pb].includes(null)){peakOk=false;heatKnown=false;worst=worst||{name:q.name,reason:'최대 회전수 초과'};continue;}
    for(const [u,allow] of [[a,pa],[b,pb]])if(Math.abs(T(u))>allow+1e-9){peakOk=false;worst=worst||{name:q.name,rpm:N(u),torque:T(u),allow,reason:'속도별 피크 토크 보수 곡선 초과'};}
    const dt=(b-a)*q.durationS,ta=T(a),tb=T(b),minC=Math.min(ca,cb);
    heatBound+=dt*(ta*ta+ta*tb+tb*tb)/3/(minC*minC);
    const fa=Math.abs(ta)-ca,fb=Math.abs(tb)-cb;
    if(fa<=1e-9&&fb<=1e-9)continue;
    let lo=a,hi=b;
    if(fa<0)lo=a+(b-a)*(-fa)/(fb-fa);
    if(fb<0)hi=a+(b-a)*fa/(fa-fb);
    if(hi-lo<1e-10)continue;
    const event={startS:q.startS+lo*q.durationS,endS:q.startS+hi*q.durationS,peakPercent:100*Math.max(Math.abs(T(lo)),Math.abs(T(hi)))/m.ratedTorqueNm,stationary:Math.abs(N(lo))+Math.abs(N(hi))<1e-8,names:[q.name]};
    const last=overload.at(-1);
    if(last&&Math.abs(last.endS-event.startS)<1e-8){last.endS=event.endS;last.peakPercent=Math.max(last.peakPercent,event.peakPercent);last.stationary=last.stationary&&event.stationary;last.names.push(q.name);}else overload.push(event);
   }
  }
  const cycleTime=row.phases.at(-1).endS;
  // End/start overload is one continuous episode in repeating service, not a thermal reset.
  if(overload.length>1&&overload[0].startS<1e-8&&Math.abs(overload.at(-1).endS-cycleTime)<1e-8){const first=overload.shift(),last=overload.pop();overload.push({...last,endS:cycleTime+first.endS,peakPercent:Math.max(first.peakPercent,last.peakPercent),names:[...last.names,...first.names],stationary:last.stationary&&first.stationary,wraps:true});}
  for(const e of overload){e.durationS=e.endS-e.startS;const pt=m.overload.points.find(([pct])=>pct>=e.peakPercent);e.screenTimeS=e.peakPercent>115&&pt?pt[1]:null;e.withinScreen=e.screenTimeS===null?null:e.durationS<e.screenTimeS;e.mode=e.stationary?'정지 유지':'회전 포함';}
  return {peakOk,worst,normalizedRmsUpper:heatKnown?Math.sqrt(heatBound/cycleTime):null,overload,overloadScreen:overload.some(e=>e.withinScreen===false)?false:overload.some(e=>e.withinScreen===null)?null:true};
 }
 function calculate(p,d,cycleInput,input={}){
  if(p.id!==d.profileId)throw Error('프로파일 ID가 일치하지 않습니다.');
  const settings={supplyVoltage:value(input.supplyVoltage,'전원 전압'),extraMotorInertia:value(input.extraMotorInertia,'회전자 이외 모터측 관성'),ambientC:value(input.ambientC,'주위 온도'),installationConfirmed:input.installationConfirmed===true||input.installationConfirmed==='yes'};
  if(settings.supplyVoltage!==null&&![200,400].includes(settings.supplyVoltage))throw Error('전원은 200V 또는 400V 계열을 선택하세요.');
  const missing=[];
  if(settings.supplyVoltage===null)missing.push('실제 드라이버 전원 계열 200V / 400V');
  if(settings.extraMotorInertia===null)missing.push('모터측 추가 관성: 회전자 제외 커플링·풀리 (없으면 0)');
  if(settings.ambientC===null)missing.push('모터 주위 온도');
  if(!settings.installationConfirmed)missing.push('명목 전압 유지·호환 드라이버·브레이크 없는 모터·카탈로그 방열 설치조건 확인');
  const rows=[];
  for(const m of catalog.models){
   // Replaces generic motor-side inertia; never adds a second rotor to the user's total.
   const candidateD=D.calculate(p,{...d.settings,motorSideInertia:settings.extraMotorInertia===null?null:settings.extraMotorInertia+m.rotorInertia});
   const c=C.calculate(p,candidateD,{...cycleInput,ratedTorqueNm:m.ratedTorqueNm,maxTorqueNm:m.maxTorqueNm,ratedRpm:m.ratedRpm,maxRpm:m.maxRpm});
   for(const r of c.rows){
    const reasons=[],pending=[...missing,...c.missing.filter(v=>!v.includes('모터 회전자·입력측'))],checks={};let detail=null;
    if(settings.supplyVoltage!==null&&settings.supplyVoltage!==m.voltage)reasons.push('전원 불일치: '+m.voltage+'V 모델');
    if(settings.ambientC!==null&&settings.ambientC>40)reasons.push('등록 곡선의 온도 범위 0–40°C 초과');
    if(r.peakAbsRpm!==null&&r.peakAbsRpm>m.maxRpm)reasons.push('최대 회전수 '+m.maxRpm+'rpm 초과');
    if(c.ready){
     detail=screen(r,m);
     checks.rms=r.rmsTorqueNm<=m.ratedTorqueNm;checks.peakCurve=detail.peakOk;checks.thermalBound=detail.normalizedRmsUpper===null?null:detail.normalizedRmsUpper<=1;checks.overloadScreen=detail.overloadScreen;
     if(!checks.rms)reasons.push('전체 사이클 RMS '+r.rmsTorqueNm.toFixed(2)+' > 정격 '+m.ratedTorqueNm+' N·m');
     if(!checks.peakCurve)reasons.push((detail.worst?.name||'구간')+': '+(detail.worst?.reason||'피크 곡선 초과'));
     if(checks.thermalBound===false)reasons.push('속도별 연속 토크 기준 보수적 열 지표 > 1 (정밀 열 검토 시 재평가)');
     if(detail.overloadScreen===false)reasons.push('연속 과부하 시간이 카탈로그 내접 보호시간 검토값 이상');
     if(detail.overload.length)pending.push('반복 과부하의 열 누적·냉각 회복·실기 운전 확인: 단발 보호시간 통과를 반복 허용으로 보지 않음');
     if(detail.overloadScreen===null)pending.push('115% 이하 과부하 또는 등록 범위 밖: 보호시간 보간/외삽 미실행');
    }
    pending.push('정확한 형번·드라이버 조합·토크 제한 파라미터·회생 저항·기계부 검증');
    rows.push({modelId:m.id,model:m,leadMm:r.leadMm,rmsTorqueNm:r.rmsTorqueNm,peakAbsTorqueNm:r.peakAbsTorqueNm,peakAbsRpm:r.peakAbsRpm,rotorInertia:m.rotorInertia,phases:c.ready?r.phases:[],candidateMotorInertia:candidateD.settings.motorSideInertia,checks,detail,reasons,pending:[...new Set(pending)],status:reasons.length?'제외 · 보수 검토 기준':!c.ready||missing.length?'입력/설치조건 확인 필요':'조건부 후보 · 최종 선정 전 검증',selectionPass:null});
   }
  }
  return {profileId:p.id,settings,rows,missing,source:catalog.source};
 }
 const api={calculate,curve,screen};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.MotorMatching=api;
})(typeof globalThis!=='undefined'?globalThis:this);
