/* Rigid-body equilibrium only. These are resultants, NOT contact/raceway loads. */
(function(root){
 'use strict';
 const EVIDENCE=Object.freeze({
  id:'theta-geometry-equilibrium-v1',status:'engineering-equilibrium-with-explicit-datum',
  coordinates:'x: No.1 to No.2 (Ga); y: drive side (mass y=-Gr, drive y=Br); z: Gt/Bt',
  diagram:'https://tcs.thk.com/images/lm/shitsuryo/k_1_2_m1.png',
  spanDiagram:'https://tcs.thk.com/images/lm/sunpo/k_1_2_dimension.png',
  assumption:'Two point supports carry transverse resultant forces; residual roll moment is not resolved into contact loads.',
  caution:'Not a THK arbitrary-span contact-load formula. Do not send these point forces directly to the life calculation.'
 });
 function calculate(p,options={}){
  for(const k of ['mass','BS','Gr','Ga','Gt','Br','Bt','speed','time'])if(!Number.isFinite(p[k]))throw new Error(k+': 유한한 수가 필요합니다.');
  if(p.mass<=0||p.BS<=0||p.time<=0||p.speed<0)throw new Error('질량·BS·시간은 양수, 속도는 비음수여야 합니다.');
  const h=options.loadCenterFromMountMm;
  if(h!==undefined&&h!==null&&!Number.isFinite(h))throw new Error('하중 중심 기준점은 유한한 mm 값이어야 합니다.');
  const datumKnown=h!==undefined&&h!==null,W=p.mass*9.80665,a=p.speed/1000/p.time;
  const phases=[a,0,-a].map(acc=>{
   const F=p.mass*acc,pitch=W*p.Ga+F*(p.Bt-p.Gt),yaw=-F*(p.Br+p.Gr);
   const radial=[-yaw/p.BS,yaw/p.BS],lateral=[-W+pitch/p.BS,-pitch/p.BS];
   return {acceleration:acc,inertiaMagnitude:F,resultant:[0,0,-W],
    momentAtMountNmm:[W*p.Gr,pitch,yaw],
    residualRollNmm:datumKnown?W*(p.Gr-h):null,
    pointLoads:{radial,lateral},
    residuals:{radialSum:radial[0]+radial[1],lateralSum:lateral[0]+lateral[1]+W,
     pitch:-p.BS*lateral[1]-pitch,yaw:p.BS*radial[1]-yaw}};
  });
  return {basis:EVIDENCE,weight:W,pointSupportCoefficient:1/p.BS,
   loadCenterFromMountMm:datumKnown?h:null,datumSource:options.datumSource||null,
   rollStatus:datumKnown?'user-specified-datum-not-manufacturer-certified':'datum-unresolved',
   phases,lifeReady:false};
 }
 const api={EVIDENCE,calculate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LMThetaGeometry=api;
})(typeof globalThis!=='undefined'?globalThis:this);
