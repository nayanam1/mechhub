/* Shared calculation engine; preliminary components/bounds, never a motor rating. */
(function(root){
 'use strict';
 function optional(v,name,{positive=false,max=Infinity}={}){
  if(v===undefined||v===null||(typeof v==='string'&&v.trim()===''))return null;
  if(!['string','number'].includes(typeof v))throw Error(name+'에 숫자를 입력하세요.');
  const n=Number(v);if(!Number.isFinite(n)||(positive?n<=0:n<0)||n>max)throw Error(name+'의 범위를 확인하세요.');return n;
 }
 function leads(value){
  const values=Array.isArray(value)?value:String(value??'').split(/[,，\s]+/).filter(Boolean);
  if(!values.length||values.length>12)throw Error('비교 리드는 1~12개 입력하세요.');
  return [...new Set(values.map(v=>{const n=optional(v,'리드',{positive:true});if(n===null)throw Error('리드를 입력하세요.');return n;}))].sort((a,b)=>a-b);
 }
 function calculate(profile,input={}){
  const settings={leadsMm:leads(input.leadsMm),screwEfficiency:optional(input.screwEfficiency,'스크류 정효율',{positive:true,max:1}),
   ratio:optional(input.ratio,'감속비',{positive:true}),driveEfficiency:optional(input.driveEfficiency,'전달계 정효율',{positive:true,max:1}),
   screwSideInertia:optional(input.screwSideInertia,'스크류측 회전 관성'),motorSideInertia:optional(input.motorSideInertia,'모터측 회전 관성'),
   extraAxialResistanceN:optional(input.extraAxialResistanceN,'기타 축방향 저항'),preloadTorqueNm:optional(input.preloadTorqueNm,'스크류측 예압·마찰 토크')};
  const missing=[];if(!profile.forwardMotionComplete)missing.push('가압 거리·가압 이동 시간: 실제 접근/가압 회전수 계산');
  if(settings.screwEfficiency===null)missing.push('스크류 정효율: 실제 가압 부하 토크 계산');
  if(settings.ratio===null)missing.push('감속비: 모터 회전수와 모터축 토크 환산');
  if(settings.driveEfficiency===null)missing.push('전달계 정효율: 모터축 부하 토크 환산');
  if(profile.movingMassKg===null)missing.push('이동부 질량: 직선 가속 관성력');
  if(profile.orientation==='unknown')missing.push('설치 방향: 중력 성분 검토');
  if(settings.screwSideInertia===null)missing.push('스크류·커플링·출력측의 등가 회전 관성 kg·m²');
  if(settings.motorSideInertia===null)missing.push('모터 회전자·입력측의 등가 회전 관성 kg·m²');
  if(settings.extraAxialResistanceN===null)missing.push('가이드·케이블 등의 기타 축방향 저항 N');
  if(settings.preloadTorqueNm===null)missing.push('스크류측 예압·베어링 마찰 토크 N·m');
  const boundReady=profile.forwardMotionComplete&&profile.movingMassKg!==null&&profile.orientation!=='unknown'&&Object.entries(settings).every(([k,v])=>k==='leadsMm'||v!==null);
  const segments=profile.forwardMotionComplete?profile.forwardSegments:[];
  const available=[...segments,...(profile.returnMotion?[profile.returnMotion]:[])];
  const rpmSegments=profile.forwardMotionComplete?available:[profile.referenceMotion,...(profile.returnMotion?[profile.returnMotion]:[])];
  const rows=settings.leadsMm.map(lead=>{
   const leadM=lead/1000,ratio=settings.ratio,eta=settings.screwEfficiency,driveEta=settings.driveEfficiency;
   const rpm=s=>s?60*s.peakVelocityMps/leadM:null;
   const ideal=profile.pressForceN*leadM/(2*Math.PI);
   const screwLoad=eta===null?null:ideal/eta;
   const motorLoad=screwLoad===null||ratio===null||driveEta===null?null:screwLoad/(ratio*driveEta);
   let envelopes=[];
   if(boundReady){
    envelopes=available.map(s=>{
     const force=s.name==='가압 이동'?profile.pressForceN:0;
     const gravity=profile.orientation==='vertical'?profile.movingMassKg*9.80665:0;
     const forceBound=force+profile.movingMassKg*s.peakAccelerationMps2+gravity+settings.extraAxialResistanceN;
     const alphaS=2*Math.PI*s.peakAccelerationMps2/leadM,alphaM=alphaS*ratio;
     const linear=forceBound*leadM/(2*Math.PI*eta);
     const rotary=settings.screwSideInertia*alphaS;
     const total=(linear+rotary+settings.preloadTorqueNm)/(ratio*driveEta)+settings.motorSideInertia*alphaM;
     return {segment:s.name,motorTorqueBoundNm:total,motorPeakRpm:rpm(s)*ratio,
      components:{axialForceBoundN:forceBound,linearAtScrewNm:linear,rotaryAtScrewNm:rotary,motorSideInertiaNm:settings.motorSideInertia*alphaM}};
    });
   }
   const row={leadMm:lead,referencePeakScrewRpm:profile.forwardMotionComplete?null:rpm(profile.referenceMotion),
    approachPeakScrewRpm:rpm(segments[0]),pressPeakScrewRpm:rpm(segments[1]),returnPeakScrewRpm:rpm(profile.returnMotion),
    peakMotorRpm:ratio===null?null:Math.max(...rpmSegments.map(rpm))*ratio,
    motorRpmBasis:profile.forwardMotionComplete?'entered motion segments; return included only if provided':'reference forward waveform only; actual pressing speed unresolved',
    idealPressScrewTorqueNm:ideal,pressScrewLoadTorqueNm:screwLoad,pressMotorLoadTorqueNm:motorLoad,
    motorTorqueBoundNm:envelopes.length?Math.max(...envelopes.map(e=>e.motorTorqueBoundNm)):null,envelopes,
    pressLoadPowerBoundKw:segments[1]&&eta!==null&&driveEta!==null?profile.pressForceN*segments[1].peakVelocityMps/(eta*driveEta*1000):null,
    rmsTorqueNm:null,selectionPass:null};
   for(const v of Object.values(row))if(typeof v==='number'&&!Number.isFinite(v))throw Error('계산값의 수치 범위를 확인하세요.');
   return row;
  });
  return {profileId:profile.id,settings,rows,boundReady,missing,
   selectionMissing:['볼스크류 골지름·지지 간격/고정 조건·DN/허용회전수·좌굴·정격하중/수명·지지 베어링',
    '가압력의 시간분포와 힘/속도 동시 발생, 감속·회생/역효율 모델',
    ...(profile.orientation==='vertical'?['수직 전진·복귀 방향과 중력 부호']:[]),
    ...(profile.cycleTimeS===null?['유지·복귀·기타 대기 시간을 입력하여 전체 사이클 완성']:[]),
    '구간별 부호 있는 토크 이력 및 실효 토크(RMS)',
    '모터 토크속도 곡선·정격/피크 지속시간·드라이버·관성비·제동/낙하 방지'],
   assumptions:['이상 가압 토크는 효율1의 이론 최소값. 효율 미입력을 실제 효율1로 대체하지 않음',
    '가압 부하 토크는 요구 가압력 성분만 포함. 총 필요 토크나 모터 정격 토크가 아님',
    '감속비 = 모터 회전수 / 스크류 회전수. 값1은 명시된 직결 가정',
    '토크 상한은 입력 가압력을 가압 구간의 최대 공정력으로 가정한 참고값. 실제 가압력이 이보다 크면 적용 불가',
    '보수적 토크 상한은 구간별 최대 가압력·절대 가속 관성·중력·저항·회전 관성의 크기를 합산. 피크 동시성/부호를 확정한 실제 토크 이력 아님',
    '선형 관성력 m·a는 한 번만 반영. 스크류측 관성 입력에는 이동 질량의 환산 관성을 다시 넣지 않음',
    '관성·저항·예압에 명시적으로 0을 입력하면 해당 성분을 무시하는 가정. 실제 부품의 성분이 0임을 보장하지 않음',
    '정효율 기반 비교이며 역구동·회생의 정확한 토크/전력은 계산하지 않음',
    '이 성분/상한 계산표는 RMS·정격출력·모터 용량·제품 합격 판정을 포함하지 않음. RMS는 별도 전체 사이클 모듈에서 확인. 회전수 제한 미입력을 무제한 합격으로 보지 않음'],
   sources:['https://www.thk.com/eu/en/products/ball_screw/selection/0013/',
    'https://www.thk.com/us/en/products/ball_screw/selection/0014/']};
 }
 const api={calculate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DriveCalculations=api;
})(typeof globalThis!=='undefined'?globalThis:this);
