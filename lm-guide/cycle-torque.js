/* Signed, piecewise-affine full-cycle torque model. Browser + Node. */
(function(root){
 'use strict';
 function num(v,name,{signed=false,positive=false,max=Infinity}={}){
  if(v===undefined||v===null||(typeof v==='string'&&!v.trim()))return null;
  if(!['number','string'].includes(typeof v))throw Error(name+'에 숫자를 입력하세요.');
  const n=Number(v);if(!Number.isFinite(n)||(!signed&&(positive?n<=0:n<0))||n>max)throw Error(name+'의 범위를 확인하세요.');return n;
 }
 function calculate(p,d,input={}){
  if(p.id!==d.profileId)throw Error('운전 프로파일 ID가 일치하지 않습니다.');
  const s={forceMode:input.forceMode||'unknown',verticalDirection:input.verticalDirection||'unknown',
   reverseScrewEfficiency:num(input.reverseScrewEfficiency,'스크류 역효율',{positive:true,max:1}),
   reverseDriveEfficiency:num(input.reverseDriveEfficiency,'전달계 역효율',{positive:true,max:1}),
   returnForceN:num(input.returnForceN,'복귀 요구 축력',{signed:true}),
   holdMotorTorqueNm:num(input.holdMotorTorqueNm,'유지 모터 토크',{signed:true}),
   settleMotorTorqueNm:num(input.settleMotorTorqueNm,'대기 모터 토크',{signed:true}),
   ratedTorqueNm:num(input.ratedTorqueNm,'모터 정격 토크',{positive:true}),maxTorqueNm:num(input.maxTorqueNm,'모터 최대 토크',{positive:true}),
   ratedRpm:num(input.ratedRpm,'모터 정격 회전수',{positive:true}),maxRpm:num(input.maxRpm,'모터 최대 회전수',{positive:true})};
  if(!['unknown','constant','linear_ramp'].includes(s.forceMode))throw Error('가압력 모델을 확인하세요.');
  if(!['unknown','forward_up','forward_down'].includes(s.verticalDirection))throw Error('수직 방향을 확인하세요.');
  if(s.ratedTorqueNm!==null&&s.maxTorqueNm!==null&&s.maxTorqueNm<s.ratedTorqueNm)throw Error('최대 토크는 정격 토크 이상이어야 합니다.');
  if(s.ratedRpm!==null&&s.maxRpm!==null&&s.maxRpm<s.ratedRpm)throw Error('최대 회전수는 정격 회전수 이상이어야 합니다.');
  const missing=[...d.missing];
  if(p.holdTimeS===null)missing.push('가압 유지 시간 (없으면 0)');
  if(p.returnTimeS===null)missing.push('복귀 이동 시간');
  if(p.settleTimeS===null)missing.push('기타 대기 시간 (없으면 0)');
  if(s.forceMode==='unknown')missing.push('가압력 모델: 일정 가압 또는 0→요구값 선형 증가 가정 선택');
  if(p.orientation==='vertical'&&s.verticalDirection==='unknown')missing.push('수직 전진 방향: 상승/하강');
  if(s.reverseScrewEfficiency===null)missing.push('스크류 역효율');
  if(s.reverseDriveEfficiency===null)missing.push('전달계 역효율');
  if(s.returnForceN===null)missing.push('복귀 시 요구 축력 (+는 전진 방향, 없으면 0)');
  if(p.holdTimeS>0&&s.holdMotorTorqueNm===null)missing.push('유지 중 모터축 토크 (중력·가압·브레이크 분담을 반영한 값)');
  if(p.settleTimeS>0&&s.settleMotorTorqueNm===null)missing.push('대기 중 모터축 토크 (무부하/브레이크 분담 확인 후 입력)');
  const limitMissing=[];for(const [k,label] of [['ratedTorqueNm','정격 토크'],['maxTorqueNm','최대 토크'],['ratedRpm','정격 회전수'],['maxRpm','최대 회전수']])if(s[k]===null)limitMissing.push('비교할 모터 '+label);
  const ready=missing.length===0,base=d.settings;
  if(ready&&(!Number.isFinite(p.cycleTimeS)||p.cycleTimeS<=0))throw Error('전체 사이클 시간의 수치 범위를 확인하세요.');
  function limits(rms,peak,rpm){
   const checks={ratedTorque:rms===null||s.ratedTorqueNm===null?null:rms<=s.ratedTorqueNm,
    peakTorque:peak===null||s.maxTorqueNm===null?null:peak<=s.maxTorqueNm,
    maximumSpeed:rpm===null||s.maxRpm===null?null:rpm<=s.maxRpm,
    withinRatedSpeed:rpm===null||s.ratedRpm===null?null:rpm<=s.ratedRpm};
   const main=[checks.ratedTorque,checks.peakTorque,checks.maximumSpeed];
   return {checks,status:main.includes(false)?'입력한 모터 수치 제한 초과':main.includes(null)?'비교 조건 미완성':'수치 제한 통과 · 토크속도 곡선/피크 지속시간 미검토',selectionPass:null};
  }
  const rows=d.rows.map(row=>{
   if(!ready)return {leadMm:row.leadMm,rmsTorqueNm:null,peakAbsTorqueNm:null,peakAbsRpm:null,phases:[],...limits(null,null,null)};
   const l=row.leadMm/1000,k=l/(2*Math.PI),G=base.ratio,gravity=p.orientation==='horizontal'?0:p.movingMassKg*9.80665*(s.verticalDirection==='forward_up'?1:-1);
   let cursor=0;const phases=[];
   function add(name,dt,ta,tb,rpmA=0,rpmB=0,mode='stationary'){
    if(dt<=0)return;
    const energy=dt*(ta*ta+ta*tb+tb*tb)/3;
    if(![dt,ta,tb,rpmA,rpmB,energy,cursor+dt].every(Number.isFinite))throw Error('사이클 계산값의 수치 범위를 확인하세요.');
    phases.push({name,startS:cursor,endS:cursor+dt,durationS:dt,torqueStartNm:ta,torqueEndNm:tb,rpmStart:rpmA,rpmEnd:rpmB,torqueSquaredIntegral:energy,mode});cursor+=dt;
   }
   function segment(seg,kind){
    for(const phase of seg.phases){
     const a=phase.accelerationMps2,dt=phase.durationS,dir=Math.sign(phase.startVelocityMps+phase.endVelocityMps);
     const proc=t=>kind==='press'?(s.forceMode==='constant'?p.pressForceN:p.pressForceN*((phase.startS-seg.startS+t)/seg.timeS)):kind==='return'?s.returnForceN:0;
     const F=t=>p.movingMassKg*a+gravity+proc(t)+dir*base.extraAxialResistanceN;
     const v=t=>phase.startVelocityMps+a*t,alphaS=2*Math.PI*a/l,alphaM=alphaS*G;
     const cut=[0,dt],f0=F(0),f1=F(dt);
     if(f0*f1<0)cut.push(dt*(-f0)/(f1-f0));cut.sort((x,y)=>x-y);
     for(let i=1;i<cut.length;i++){
      const lo=cut[i-1],hi=cut[i],mid=(lo+hi)/2;
      const ks=F(mid)*v(mid)>=0?k/base.screwEfficiency:k*s.reverseScrewEfficiency;
      const Ts=t=>ks*F(t)+base.screwSideInertia*alphaS+dir*base.preloadTorqueNm;
      const cuts=[lo,hi],t0=Ts(lo),t1=Ts(hi);
      if(t0*t1<0)cuts.push(lo+(hi-lo)*(-t0)/(t1-t0));cuts.sort((x,y)=>x-y);
      for(let j=1;j<cuts.length;j++){
       const x=cuts[j-1],y=cuts[j],m=(x+y)/2;
       const motoring=Ts(m)*v(m)>=0,kg=motoring?1/(G*base.driveEfficiency):s.reverseDriveEfficiency/G;
       const T=t=>kg*Ts(t)+base.motorSideInertia*alphaM;
       add(phase.name,y-x,T(x),T(y),60*v(x)*G/l,60*v(y)*G/l,motoring?'출력측 동력 전달':'출력측 역구동');
      }
     }
    }
   }
   segment(p.forwardSegments[0],'approach');segment(p.forwardSegments[1],'press');
   add('가압 유지',p.holdTimeS,s.holdMotorTorqueNm,s.holdMotorTorqueNm);
   segment(p.returnMotion,'return');add('기타 대기',p.settleTimeS,s.settleMotorTorqueNm,s.settleMotorTorqueNm);
   if(Math.abs(cursor-p.cycleTimeS)>1e-8)throw Error('전체 사이클 시간 합계가 일치하지 않습니다.');
   const integral=phases.reduce((n,q)=>n+q.torqueSquaredIntegral,0),rms=Math.sqrt(integral/p.cycleTimeS);
   const peak=Math.max(...phases.flatMap(q=>[Math.abs(q.torqueStartNm),Math.abs(q.torqueEndNm)]));
   const rpm=Math.max(...phases.flatMap(q=>[Math.abs(q.rpmStart),Math.abs(q.rpmEnd)]));
   return {leadMm:row.leadMm,rmsTorqueNm:rms,peakAbsTorqueNm:peak,peakAbsRpm:rpm,phases,...limits(rms,peak,rpm)};
  });
  return {profileId:p.id,settings:s,ready,missing:[...new Set(missing)],limitMissing,cycleTimeS:p.cycleTimeS,rows,
   assumptions:['RMS = sqrt(∫T_motor(t)²dt / 전체 사이클 시간). 음의 토크도 제곱하여 반영',
    '일정/선형 가압 모델은 사용자가 선택한 계산 가정. 실제 공정 측정값을 검증한 것이 아님',
    '축력·스크류측 토크의 동력 방향이 바뀌는 시점에서 구간 분할. 선형 토크의 제곱 적분을 해석적으로 계산',
    '역구동 효율은 실제 회생 전력/전류/제동저항 검증을 대신하지 않음',
    '정지 유지·대기 토크는 모터축 값 직접 입력. 움직임의 효율식을 정지 마찰에 임의 적용하지 않음',
    '최대 토크·최대 회전수는 서로 다른 시점일 수 있음. 세 스칼라 제한 통과는 제품 적합 보증 아님',
    '정격속도 초과는 곧 부적합이라는 뜻이 아님. 해당 속도에서의 연속/피크 토크속도 곡선 확인 필요',
    '전류·열·저크·피크 지속시간·과부하 듀티·브레이크·지지부 강도는 별도 검토']};
 }
 const api={calculate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CycleTorque=api;
})(typeof globalThis!=='undefined'?globalThis:this);
