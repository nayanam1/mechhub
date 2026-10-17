/* NSK E3162p A35-44: ideal equal-stiffness arrangements, no fitted constants. */
(function(root){
'use strict';
const node=typeof module!=='undefined'&&module.exports;
const N=node?require('./nsk-pu'):root.NSKPU,C=node?require('./catalogue'):root.LMCatalogue;
const source=N.source;
function supported(p){return ['horizontal','vertical','wall'].includes(p.attitude)&&((p.rails===1&&p.blocks===2)||(p.rails===2&&[2,3,4].includes(p.blocks)));}
function gravity(p){return p.attitude==='horizontal'?[0,-9.80665,0]:p.attitude==='wall'?[0,0,-9.80665]:[-9.80665,0,0];}
function validate(p){
 if(!supported(p))throw Error('미검증 배치 · 수평/수직/벽면의 1레일×2블록 또는 2레일×2·3·4블록만 계산합니다.');
 for(const k of ['mass','span','massX','massY','massZ','driveY','driveZ','speed','stroke','acceleration','cycles','fw'])if(!Number.isFinite(p[k]))throw Error(k+'에 유한한 숫자가 필요합니다.');
 if(['mass','span','speed','stroke','cycles'].some(k=>p[k]<=0)||p.acceleration<0||p.fw<1||p.fw>3)throw Error('질량·간격·운전조건 또는 fw 범위를 확인하세요.');
 if(p.rails===2&&(!Number.isFinite(p.railSpan)||p.railSpan<=0))throw Error('레일 간격은 0보다 커야 합니다.');
 if(p.travelDirection!==undefined&&![-1,1].includes(p.travelDirection))throw Error('왕로 이동 방향은 +1 또는 -1입니다.');
 const ramp=p.acceleration===0?0:p.speed*p.speed/(2000*p.acceleration);
 if(2*ramp>p.stroke+1e-10)throw Error('스트로크가 짧아 지정 속도에 도달할 수 없습니다.');
 const seconds=p.stroke/p.speed+(p.acceleration===0?0:p.speed/(1000*p.acceleration));
 if(2*seconds>3600/p.cycles+1e-10)throw Error('왕복 빈도가 높아 이동 시간을 확보할 수 없습니다.');
 return {ramp,seconds};
}
function phase(p,ax){
 // Right-handed local frame: X=travel, Y=mounting normal, Z=rail spacing.
 // The vectors below are actual applied forces (N), not catalogue arrow signs.
 const g=gravity(p),b=p.blocks,r=p.rails,n=b*r;
 const cx=(b-1)*p.span/2,cz=r===2?p.railSpan/2:0;
 const x=p.massX-cx,y=p.massY,z=p.massZ-cz;
 const Wy=p.mass*g[1],Wz=p.mass*g[2],Q=p.mass*(ax-g[0]);
 const moments=[y*Wz-z*Wy,(p.driveZ-p.massZ)*Q-x*Wz,x*Wy+(y-p.driveY)*Q];
 const [Mx,My,Mz]=moments;
 const xs=Array.from({length:b},(_,i)=>i*p.span-cx),sx2=xs.reduce((a,x)=>a+x*x,0)*r;
 const sz2=r===2?b*p.railSpan*p.railSpan/2:0;
 const blocks=[];
 for(let j=0;j<r;j++)for(let i=0;i<b;i++){
  const xx=xs[i],zz=j*(p.railSpan||0)-cz;
  const Fy=Wy/n+Mz*xx/sx2-(r===2?Mx*zz/sz2:0),Fz=Wz/n-My*xx/sx2;
  // Fr is positive toward the mounting plane; Fs is positive toward -Z.
  blocks.push({number:j*b+i+1,x:i*p.span,z:j*(p.railSpan||0),Fy,Fz,Fr:-Fy,Fs:-Fz,MrNmm:r===1?Mx/n:0});
 }
 return {accelerationX:ax,gravity:g,driveForceN:Q,transverseForce:[Wy,Wz],momentsNmm:moments,centroid:[cx,0,cz],blocks};
}
function calculate(p,product){
 const motion=validate(p),direction=p.travelDirection??-1;
 if(!product||product.maker!=='NSK'||!Number.isFinite(product.C50)||!Number.isFinite(product.C0)||!Number.isFinite(product.epsilonR))throw Error('공식 정격과 동등가 계수가 있는 NSK PU·PE 제품만 계산합니다.');
 const dist=[motion.ramp,p.stroke-2*motion.ramp,motion.ramp];
 const phases=[direction,-direction].flatMap((d,leg)=>[1,0,-1].map((sign,index)=>({...phase(p,d*sign*p.acceleration),leg:leg===0?'왕로':'복로',stage:['가속','정속','감속'][index],distance:dist[index]})));
 const blocks=phases[0].blocks.map((base,i)=>{
  const loads=phases.map(q=>({...q.blocks[i],leg:q.leg,stage:q.stage,sign:q.accelerationX,accelerationX:q.accelerationX,distance:q.distance,...N.equivalent({...q.blocks[i],epsilonR:product.epsilonR})}));
  const Fm=C.average(loads.map(q=>q.Fe),phases.map(q=>q.distance));
  const lifeKm=C.life({C:product.C50,Pm:Fm,fw:p.fw,referenceKm:50});
  // Zero-length phases carry no exposure, including the a=0 speed idealisation.
  const active=loads.filter(q=>q.distance>0),maximum=Math.max(...active.map(q=>q.Fe));
  return {number:base.number,rail:Math.floor(i/p.blocks)+1,x:base.x,z:base.z,phases:loads,Fm,maximum,lifeKm,hours:lifeKm*1e6/(2*p.stroke*p.cycles)};
 });
 const statics=blocks.map(b=>{
  const s=N.staticScreen({phases:b.phases.filter(q=>q.distance>0),C0:product.C0,MRO_Nm:product.MRO});
  const forceOnly=b.phases.filter(q=>q.distance>0).every(q=>q.MrNmm===0);
  return {...s,combinedSafety:forceOnly?s.forceOnly.safety:null,combinedAssessment:{status:forceOnly?'catalogue-force-only-A44':'force-and-roll-unresolved',manufacturerApproved:false,catalogueFormulaApplicable:forceOnly,pass:null},basis:forceOnly?'PU/PE: P0=max(|Fr|+|Fs|), fs=C0/P0 (A44); ideal arrangement has no local moment':'A44 isolated checks only; simultaneous force and roll unresolved'};
 });
 return {source,basis:'NSK E3162p Table 2.2 patterns 2/4/5/6, A36-38; rotated gravity, equal-stiffness ideal support distribution',formulaStatus:'catalogue-ideal-model',toolValidation:p.attitude==='wall'&&p.rails===1&&p.blocks===2?'Theta magnitude regression; exact observations separately gated':'new layout: no official web-tool comparison',coordinates:{mass:[p.massX,p.massY,p.massZ],driveYZ:[p.driveY,p.driveZ],gravity:gravity(p),travelDirection:direction,datum:'O1 at No.1 ideal support; Y=0 reference plane. No fitted contact-centre correction.'},assumptions:['Identical parallel guides, rigid table, equal block stiffness; no installation error or preload redistribution','Only constant moving mass, gravity and axial drive/inertia; machining, cable and other external forces are excluded','Normal lubrication, standard hardness and 90% rating life; PC/ZT no-preload idealisation','Y dimensions are referred to the stated ideal support plane; actual contact-centre offsets are not inferred','Vertical +X is upward; both travel directions included; no dwell fatigue or acceleration jerk model'],unresolved:['Actual preload, contact-centre geometry, mounting/bolt rigidity, impact and lubrication','Force+roll combined static rule for single rail','Final manufacturer tool confirmation'],motion:{rampSeconds:p.acceleration===0?0:p.speed/(1000*p.acceleration),moveSeconds:motion.seconds,stopSeconds:Math.max(0,1800/p.cycles-motion.seconds),averageSpeed:2*p.stroke*p.cycles/3600},distances:[...dist,...dist],phaseEquilibrium:phases,blocks,statics,peakLife:blocks.map(b=>N.peakLifeScreen({maximum:b.maximum,fw:p.fw,C50:product.C50})),selectionPass:null};
}
const api={source,supported,gravity,validate,phase,calculate};if(node)module.exports=api;else root.LMLayoutLoads=api;
})(typeof globalThis!=='undefined'?globalThis:this);
