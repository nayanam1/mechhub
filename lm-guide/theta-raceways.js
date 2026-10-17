/* Theta load-decomposition CANDIDATE. No sign lookup, no fitted Gr transition threshold. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports,C=node?require('./catalogue.js'):root.LMCatalogue;
 // These are observations/calibrations, not values derived from nominal CAD geometry.
 const SPANS=Object.freeze({'31.6':.05021,'40':.02902,'60':1/(2*(59.981395-30)),'100':.01});
 const RESEARCH=Object.freeze({date:'2026-10-16',classification:'empirical-candidate-not-official-derivation',
  officialLoadCenterMm:null,officialArbitrarySpanLaw:null,exactModelInternalCadObtained:false,
  report:'../verification/Theta_형상하중_근거검토.html#additional-research',
  data:'../verification/hsr10r_additional_research.json',
  unreadMemberDocuments:[],memberReviewStatus:'both-PDFs-read-no-required-equation-found',
  reviewedMemberDocuments:[{id:'0160',pages:9},{id:'0159',pages:5}],
  exactCadSearch:'HSR10R-not-found-in-current-library',referenceCad:'HSR10XR-STEP-generated-file-not-obtained'});
 const BASIS=Object.freeze({id:'theta-raceway-candidate-v1',status:'hybrid-not-fully-catalogue-derived',rollCoefficient:.235,rollCoefficientSource:'legacy THK HSR10 printed KCR/KCL; rounding and catalogue revision unresolved',origin:5.7,originStatus:'inferred coordinate offset; not verified drawing datum',spanStatus:'empirical coefficients retained as an explicit candidate; BS60 midpoint calibration',aggregation:'THK per-raceway sign filtering, distance-cubic average, fw applied once',limitations:['Not a general geometry solver','No preload/contact-elasticity model','PDF displayed PR sign is not uniquely identified with our row projection','Short-stroke applicability must be checked separately']});
 function calculate(p){
  for(const k of ['mass','BS','Gr','Ga','Gt','Br','Bt','speed','time','stroke','cycles','C','C0','fw'])if(!Number.isFinite(p[k]))throw new Error(k+': 유한한 수를 입력하세요.');
  if([p.mass,p.BS,p.speed,p.time,p.stroke,p.cycles,p.C,p.C0,p.fw].some(v=>v<=0))throw new Error('질량·간격·운동조건·정격·fw는 0보다 커야 합니다.');
  if(p.fw<1)throw new Error('이 후보의 하중계수 fw는 1 이상이어야 합니다.');
  const kP=SPANS[String(p.BS)];if(kP===undefined)throw new Error('Theta 후보 계수는 BS31.6/40/60/100 mm에만 있습니다.');
  const a=p.speed/1000/p.time,ramp=p.speed*p.time/2,cruise=p.stroke-2*ramp;
  if(cruise<0||p.cycles*(2*p.time+Math.max(0,cruise)/p.speed)*2>3600)throw new Error('운동 거리 또는 왕복 빈도 범위를 확인하세요.');
  const distances=[ramp,cruise,ramp],weight=p.mass*9.80665,R=BASIS.rollCoefficient*weight*(p.Gr-BASIS.origin)/2;
  const blocks=[0,1].map(i=>{
   const D=[a,0,-a].map(acc=>(i===0?1:-1)*kP*p.mass*acc*(p.Br+p.Gr));
   const PT=[a,0,-a].map(acc=>{const v=-weight/2-kP*(weight*(p.BS/2-p.Ga)-p.mass*acc*(p.Bt-p.Gt));return i===0?v:-weight-v;});
   const channels=[-1,1].flatMap(sr=>[-1,1].map(st=>{
    const PR=D.map(v=>v+st*R),PE=PR.map((v,j)=>C.thkRaceway(v,PT[j],sr,st));
    return {sr,st,PR,PT:[...PT],PE};
   }));
   return {radialBase:D,lateral:PT,rollEquivalent:R,channels};
  });
  return {...C.aggregateRaceways({...p,referenceKm:50},blocks,distances),distances,weight,acceleration:a,kP,R,basis:BASIS,
   research:RESEARCH,
   geometryProvenance:{kP:{value:kP,status:'empirical-span-calibration',pointSupportValue:1/p.BS,ratioToPointSupport:kP*p.BS},
    origin:{value:BASIS.origin,status:'inferred-not-dimensioned-in-reviewed-drawings',unit:'mm'},
    rollAllocation:{status:'equal-split-assumption',blocks:2},
    coordinateArms:{radialInertia:p.Br+p.Gr,lateralInertia:p.Bt-p.Gt,status:'consistent-with-official-input-diagrams'}},
   shortStrokeWarning:p.stroke<=2*31};
 }
 const api={BASIS,SPANS,RESEARCH,calculate};if(node)module.exports=api;else root.LMThetaRaceways=api;
})(typeof globalThis!=='undefined'?globalThis:this);
