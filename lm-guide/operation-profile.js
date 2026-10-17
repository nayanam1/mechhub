/* Shared browser/Node calculation contract. SI internal motion units, explicit unknowns. */
(function(root){
 'use strict';
 const G=9.80665;
 function number(v,name,{optional=false,min=0,strict=false}={}){
  if(v===null||v===undefined||(typeof v==='string'&&v.trim()==='')){if(optional)return null;throw Error(name+'을 입력하세요.');}
  if(!['number','string'].includes(typeof v))throw Error(name+'에 숫자를 입력하세요.');
  const n=Number(v);if(!Number.isFinite(n)||(strict?n<=min:n<min))throw Error(name+'의 범위를 확인하세요.');return n;
 }
 function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}
 function motion(distanceMm,timeS,rampFraction,startS=0,startMm=0,name='이동',direction=1){
  const d=distanceMm/1000,v=d/(timeS*(1-rampFraction)),ta=timeS*rampFraction,a=v/ta;
  if(![d,v,ta,a].every(Number.isFinite)||ta<=0)throw Error('이동 조건의 수치 범위를 확인하세요.');
  const tc=timeS-2*ta,da=.5*a*ta*ta;
  const phases=[{name:name+' 가속',durationS:ta,accelerationMps2:a,startVelocityMps:0,endVelocityMps:v,distanceM:da},
   ...(tc>1e-12?[{name:name+' 정속',durationS:tc,accelerationMps2:0,startVelocityMps:v,endVelocityMps:v,distanceM:v*tc}]:[]),
   {name:name+' 감속',durationS:ta,accelerationMps2:-a,startVelocityMps:v,endVelocityMps:0,distanceM:da}];
  let t=startS,x=startMm/1000;
  for(const p of phases){p.accelerationMps2*=direction;p.startVelocityMps*=direction;p.endVelocityMps*=direction;p.distanceM*=direction;p.startS=t;p.endS=t+p.durationS;p.startM=x;p.endM=x+p.distanceM;t=p.endS;x=p.endM;}
  return {name,distanceMm,timeS,startS,startMm,peakVelocityMps:v,peakAccelerationMps2:a,phases};
 }
 function build(input){
  const p={schemaVersion:1,strokeMm:number(input.strokeMm,'편도 스트로크',{strict:true}),forwardTimeS:number(input.forwardTimeS,'편도 이동 시간',{strict:true}),
   pressForceTonf:number(input.pressForceTonf,'끝부분 가압력',{strict:true}),
   pressDistanceMm:number(input.pressDistanceMm,'가압 거리',{optional:true,strict:true}),pressTimeS:number(input.pressTimeS,'가압 이동 시간',{optional:true,strict:true}),
   holdTimeS:number(input.holdTimeS,'가압 유지 시간',{optional:true}),returnTimeS:number(input.returnTimeS,'복귀 시간',{optional:true,strict:true}),
   settleTimeS:number(input.settleTimeS,'추가 대기 시간',{optional:true}),movingMassKg:number(input.movingMassKg,'이동부 질량',{optional:true,strict:true}),
   rampFraction:number(input.rampFraction,'구간별 가속·감속 시간 비율',{strict:true}),orientation:input.orientation||'unknown',
   forceScope:'end_press_only',forceHistory:'unspecified',forwardTimeScope:'approach_plus_press_travel_excludes_hold'};
  if(p.rampFraction>.5)throw Error('가속·감속 시간 비율은 각각 0 초과, 0.5 이하여야 합니다.');
  if(!['unknown','vertical','horizontal'].includes(p.orientation))throw Error('설치 방향을 확인하세요.');
  if(p.pressDistanceMm!==null&&p.pressDistanceMm>=p.strokeMm)throw Error('끝부분 가압 거리는 전체 스트로크보다 작아야 합니다.');
  if(p.pressTimeS!==null&&p.pressTimeS>=p.forwardTimeS)throw Error('가압 이동 시간은 편도 이동 시간보다 작아야 합니다.');
  p.pressForceN=p.pressForceTonf*1000*G;
  if(!Number.isFinite(p.pressForceN))throw Error('가압력의 수치 범위를 확인하세요.');
  p.averageForwardVelocityMps=p.strokeMm/1000/p.forwardTimeS;
  const missing=[];
  if(p.pressDistanceMm===null)missing.push('가압 거리');if(p.pressTimeS===null)missing.push('가압 이동 시간');
  p.referenceMotion=motion(p.strokeMm,p.forwardTimeS,p.rampFraction,0,0,'전체 이동 참고');
  p.forwardSegments=missing.length?[]:[motion(p.strokeMm-p.pressDistanceMm,p.forwardTimeS-p.pressTimeS,p.rampFraction,0,0,'접근'),
    motion(p.pressDistanceMm,p.pressTimeS,p.rampFraction,p.forwardTimeS-p.pressTimeS,p.strokeMm-p.pressDistanceMm,'가압 이동')];
  for(const s of p.forwardSegments){s.externalForceN=s.name==='접근'?{processForceN:0,otherLoads:'unknown'}:{peakRequirementN:p.pressForceN,history:'unknown'};}
  p.forwardMotionComplete=missing.length===0;p.motionMissing=missing;
  p.cycleTimeS=[p.holdTimeS,p.returnTimeS,p.settleTimeS].every(v=>v!==null)?p.forwardTimeS+p.holdTimeS+p.returnTimeS+p.settleTimeS:null;
  p.returnMotion=p.returnTimeS===null?null:motion(p.strokeMm,p.returnTimeS,p.rampFraction,0,p.strokeMm,'복귀',-1);
  if(p.returnMotion){p.returnMotion.timeOrigin='복귀 시작 기준 상대 시간';p.returnMotion.globalStartS=p.holdTimeS===null?null:p.forwardTimeS+p.holdTimeS;}
  p.assumptions=['각 구간은 정지 출발·정지 종료, 가감속 크기 대칭, 저크 제한 미반영',
    '가속·감속 시간 비율은 사용자가 확인할 초기 파형 가정',
    '접근→가압 전환에서 일단 정지하는 모델. 실제 연속 전환과 다를 수 있음',
    '가압력은 끝부분의 요구값. 전체 400mm의 일정 외력이나 이동 질량으로 환산하지 않음'];
  const raw=JSON.stringify(p);let h=2166136261;for(let i=0;i<raw.length;i++)h=Math.imul(h^raw.charCodeAt(i),16777619);
  p.id='op-v1-'+(h>>>0).toString(16);return freeze(p);
 }
 function forTool(profile,tool){
  if(!['timing','ballscrew','motor','lm'].includes(tool))throw Error('알 수 없는 계산 모듈');
  const missing=[...profile.motionMissing];
  if(tool!=='timing'){
   if(profile.movingMassKg===null)missing.push('이동부 질량');if(profile.orientation==='unknown')missing.push('설치 방향');
   missing.push('가압력의 시간·위치별 분포');
  }
  if(tool==='ballscrew')missing.push('리드·나사 골지름·지지 간격/조건·정격·목표 수명');
  if(tool==='motor')missing.push('스크류/전달계 관성·감속비·효율·토크속도 곡선·전체 사이클');
  if(tool==='lm')missing.push('레일/블록 배치·간격·무게중심·가압점·반력 경로','가압 하중의 블록 배분식 검증');
  return freeze({tool,profileId:profile.id,profile,ready:tool==='timing'&&profile.forwardMotionComplete,missing,
   status:tool==='timing'?(profile.forwardMotionComplete?'편도 구간 계산 완료':'전체 이동 참고 계산 · 가압 구간 미완성'):'공통 조건 연결 완료 · 제품 선정 미실행'});
 }
 function legacyLM(profile){return {blocked:true,profileId:profile.id,reason:'기존 LM 모델은 대칭 왕복·특정 배치용입니다. 끝부분 가압 프로파일을 임의 변환하거나 가압력을 블록에 균등 분배하지 않습니다.'};}
 const api={build,motion,forTool,legacyLM,G};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.OperationProfile=api;
})(typeof globalThis!=='undefined'?globalThis:this);
