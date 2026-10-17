/* RETIRED v0.8 signed-output reproduction, including empirical sign lookup.
 * Not loaded by current index.html. See theta-raceways.js and catalogue.js. */
(function(root){
 'use strict';
 // BS60 is calibrated to the midpoint of an observed branch bracket, not exact vendor data.
 const SPAN_FACTORS=Object.freeze({'31.6':0.05021,'40':0.02902,'60':1/(2*(59.981395-30)),'100':0.01});
 const MODEL=Object.freeze({id:'theta-response-v6',g:9.80665,span:31.6,blockLength:31,
  pitchYaw:0.05021,roll:0.235,rollOrigin:5.7,
  status:'empirical',calibration:'Gr additional observed-input lookup; continuous boundary unverified. BS60 branch bracket 59.98139..59.98140 midpoint calibration; BS100 zero lookup only; universal +abs(R) rejected at Gr5.69',
  units:'g m/s²; pitchYaw and roll mm⁻¹; coordinates mm; mass kg; loads N'});
 function spanProperties(BS){
  const key=Object.keys(SPAN_FACTORS).find(k=>Math.abs(Number(k)-BS)<1e-9);
  if(!key)throw new Error('BS는 상세 대조한 31.6 / 40 / 60 / 100 mm만 지원합니다. 간격 사이의 보간식은 미검증입니다.');
  const pitchYaw=SPAN_FACTORS[key];
  return {pitchYaw,transitionNo2:BS/2-1/(2*pitchYaw),transitionNo1:BS/2+1/(2*pitchYaw),transitionNo1Bracket:BS===60?[59.98139,59.9814]:null};
 }
 function calculate(input){
  for(const key of ['mass','BS','Gr','Ga','Gt','Br','Bt','speed','time'])
   if(!Number.isFinite(input[key]))throw new Error(`${key}: 유한한 수를 입력하세요.`);
  if(input.mass<=0||input.speed<=0||input.time<=0)throw new Error('질량·속도·가감속 시간은 0보다 커야 합니다.');
  const span=spanProperties(input.BS),kP=span.pitchYaw;
  // Rounded response coefficients do not establish a precise branch boundary.
  if(input.BS===60&&input.Ga>59.98139&&input.Ga<59.9814)throw new Error('BS60 No.1 롤 방향 전환점은 Ga 59.98139~59.98140 mm 사이로만 확인됐습니다. 이 미확정 구간의 자동 계산은 보류합니다.');
  const W=input.mass*MODEL.g,acceleration=input.speed/1000/input.time;
  const phases=[acceleration,0,-acceleration];
  // v1 incorrectly used an origin-free, fitted 0.132*Gr term.
  // Gr trials separate the slope and intercept: KC*(Gr-5.7), not 0.132*Gr.
  const rollMoment=W*(input.Gr-MODEL.rollOrigin);
  const gravityYawMoment=W*(input.BS/2-input.Ga);
  const staticPT=[-W/2-kP*gravityYawMoment,-W/2+kP*gravityYawMoment];
  // Observed zero-load inputs only: Gr0 proves a universal +1 tie is wrong.
  const tieContext=input.BS===100&&input.Gt===0&&input.Br===24&&input.Bt===3.5&&input.speed===80&&input.time===0.008;
  const ties=[null,null];
  if(tieContext&&input.Ga===0&&input.mass===15&&input.Gr===13)ties[1]=1;
  if(tieContext&&input.Ga===100&&input.Gr===13&&[15,30].includes(input.mass))ties[0]=1;
  if(tieContext&&input.Ga===100&&input.Gr===0&&input.mass===15)ties[0]=-1;
  if(tieContext&&input.Ga===100&&input.mass===15&&input.Gr===-13)ties[0]=-1;
  // Direct observations, not a continuous Gr rule: Gr5.69 rejects +abs(R).
  if(tieContext&&input.Ga===100&&input.mass===15&&input.Gr===5.69)ties[0]=1;
  if(tieContext&&input.Ga===100&&input.mass===15&&input.Gr===5.7)ties[0]=0;
  if(tieContext&&input.Ga===100&&input.mass===15&&input.Gr===5.71)ties[0]=1;
  if(tieContext&&input.Ga===100&&input.mass===15&&input.Gr===26)ties[0]=1;
  const observedGrSigns={"1": -1, "2": -1, "3": -1, "4": -1, "5": -1, "5.5": -1, "5.55": -1, "5.553125": -1, "5.5546875": -1, "5.55546875": 1, "5.55625": 1, "5.5625": 1, "5.575": 1, "5.6": 1};
  if(tieContext&&input.Ga===100&&input.mass===15&&Object.hasOwn(observedGrSigns,String(input.Gr)))ties[0]=observedGrSigns[String(input.Gr)];
  if(staticPT.some((p,i)=>Math.abs(p)<1e-9&&ties[i]===null))throw new Error('정속 PT=0의 롤 방향 전환점은 미검증입니다. 공식 원본 또는 직접 입력 하중으로 확인하세요.');
  // Empirical branch: load-row roll direction follows each block's static PT.
  // These PR values include moment-equivalent components, not support force resultants.
  const rollDirections=staticPT.map((p,i)=>Math.abs(p)<1e-9?ties[i]:p<0?-1:1);
  const blocks=[{PR:[],PT:[]},{PR:[],PT:[]}];
  const moments=phases.map(a=>{
   const pitch=input.mass*a*(input.Br+input.Gr);
   const yaw=input.mass*a*(input.Bt-input.Gt);
   const PR=rollDirections[0]*MODEL.roll*rollMoment/2+kP*pitch;
   const PR2=rollDirections[1]*MODEL.roll*rollMoment/2-kP*pitch;
   const PT=-W/2-kP*(gravityYawMoment-yaw);
   blocks[0].PR.push(PR);blocks[1].PR.push(PR2);
   blocks[0].PT.push(PT);blocks[1].PT.push(-W-PT);
   if(!Number.isFinite(PR)||!Number.isFinite(PR2)||!Number.isFinite(PT))throw new Error('하중 계산 범위를 초과했습니다. 입력 크기를 확인하세요.');
   return {pitch,yaw,roll:rollMoment,gravityYaw:gravityYawMoment};
  });
  const extrapolated=Math.abs(input.mass-15)>1e-9||Math.abs(input.Gr-13)>1e-9||input.Ga!==0||input.Gt!==0;
  return {blocks,moments,weight:W,acceleration,extrapolated,staticPT,rollDirections,span,model:MODEL.id};
 }
 const api={MODEL,SPAN_FACTORS,spanProperties,calculate};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LMReactions=api;
})(typeof globalThis!=='undefined'?globalThis:this);
