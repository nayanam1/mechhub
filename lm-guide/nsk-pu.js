/* NSK E3162 A36/A39–44. Published ideal two-slide model; NOT a fit to web-tool output. */
(function(root){
'use strict';
const C=typeof module!=='undefined'&&module.exports?require('./catalogue'):root.LMCatalogue;
const source='https://www.nsk.com/content/dam/nsk/common/catalogs/ctrgPdf/precision/e3162.pdf';
function equivalent({Fr,Fs,MrNmm=0,MpNmm=0,MyNmm=0,epsilonR=215,epsilonP=222,epsilonY=222}){
 const all=[Fr,Fs,MrNmm,MpNmm,MyNmm,epsilonR,epsilonP,epsilonY];
 if(!all.every(Number.isFinite)||[epsilonR,epsilonP,epsilonY].some(v=>v<=0))throw Error('Finite loads and positive model coefficients required');
 const components=[Math.abs(Fr),Math.abs(Fs),Math.abs(MrNmm)*epsilonR/1000,Math.abs(MpNmm)*epsilonP/1000,Math.abs(MyNmm)*epsilonY/1000];
 return {components,Fe:(components.reduce((a,b)=>a+b,0)+Math.max(...components))/2};
}
function thetaIdeal({mass=15,gravity=9.80665,span=31.6,arm=13,driveArm=24,driveHeight=3.5,massX=0,massZ=0,acceleration=10,fw=1.2,speed=80,stroke=30,cycles=600,C50=1490,epsilonR=215}={}){
 if(![mass,gravity,span,fw,speed,stroke,cycles].every(v=>Number.isFinite(v)&&v>0)||![arm,driveArm,driveHeight,massX,massZ,acceleration].every(Number.isFinite)||acceleration<0)throw Error('Invalid geometry');
 const ramp=acceleration===0?0:(speed/1000)**2/(2*acceleration)*1000;
 if(2*ramp>stroke)throw Error('Trapezoidal travel cannot reach specified speed');
 const distances=[ramp,stroke-2*ramp,ramp];
 const rampSeconds=acceleration===0?0:speed/1000/acceleration;
 const cruiseSeconds=distances[1]/speed,moveSeconds=2*rampSeconds+cruiseSeconds;
 const stopSeconds=3600/(2*cycles)-moveSeconds;
 if(stopSeconds < -1e-9)throw Error('Round-trip frequency exceeds achievable motion time');
 // Tool global axes: X=travel, Y=normal to mounting plane, Z=up.
 // A36 local Fr rotates to global Y on a wall; Fs rotates to global Z.
 // A39 pattern 2 retains Fr, Fs, Mr only. Pitch/yaw couples become support forces.
 const blocks=[0,1].map(block=>{
  const supportSign=block===0?1:-1;
  const weight=mass*gravity*(block===0?1-massX/span:massX/span);
  const phases=[1,0,-1].map(sign=>{
   const Fr=supportSign*sign*mass*acceleration*(arm+driveArm)/span;
   const Fs=weight+supportSign*sign*mass*acceleration*(driveHeight-massZ)/span;
   const MrNmm=mass*gravity*arm/2;
   return {sign,Fr,Fs,MrNmm,...equivalent({Fr,Fs,MrNmm,epsilonR})};
  });
  const Fm=C.average(phases.map(p=>p.Fe),distances),lifeKm=C.life({C:C50,Pm:Fm,fw,referenceKm:50});
  return {number:block+1,phases,Fm,maximum:Math.max(...phases.map(p=>p.Fe)),lifeKm,hours:lifeKm*1e6/(2*stroke*cycles),staticSafety:null};
 });
 return {source,basis:'NSK E3162 A36 ideal two-slide equilibrium with wall-axis rotation; no fitted coefficient',coordinates:{mass:[massX,-arm,massZ],driveYZ:[driveArm,driveHeight],datum:'No.1 rail-mounting-plane centreline, as drawn by NSK input tool'},motion:{rampSeconds,cruiseSeconds,moveSeconds,stopSeconds:Math.max(0,stopSeconds),averageSpeed:2*stroke*cycles/3600},distances,blocks,...blocks[0]};
}
// E3162 A44: the two published checks apply to different isolated load cases.
// Neither is a manufacturer-approved combined force+moment safety result.
function staticScreen({phases,C0=2150,MRO_Nm=9.9}){
 if(!Array.isArray(phases)||!phases.length||!Number.isFinite(C0)||C0<=0||!Number.isFinite(MRO_Nm)||MRO_Nm<=0)throw Error('Invalid static ratings/loads');
 phases.forEach(p=>{if(![p.Fr,p.Fs,p.MrNmm].every(Number.isFinite))throw Error('Invalid static phase');});
 const forceP0=Math.max(...phases.map(p=>Math.abs(p.Fr)+Math.abs(p.Fs)));
 const rollNm=Math.max(...phases.map(p=>Math.abs(p.MrNmm)))/1000;
 return {source,forceOnly:{P0:forceP0,safety:forceP0===0?Infinity:C0/forceP0},rollOnly:{momentNm:rollNm,safety:rollNm===0?Infinity:MRO_Nm/rollNm},combinedSafety:null,
  combinedAssessment:{status:'not-established-in-reviewed-NSK-sources',manufacturerApproved:false,pass:null,reason:'E3162 A44 gives isolated force and moment checks; reviewed PU/NHNS catalogues and technical report do not establish a PU09TR simultaneous-force/roll rule'},
  guidelines:{normal:[1,2],vibrationImpact:[1.5,3]},status:'isolated checks only; simultaneous force and roll need a justified combined rule'};
}
function peakLifeScreen({maximum,fw=1.2,C50=1490}){
 const lifeKm=C.life({C:C50,Pm:maximum,fw,referenceKm:50});
 return {lifeKm,below3000Km:lifeKm<3000,basis:'E3162 A45 high-load/short-life advisory; NOT a published web-tool NG rule'};
}
// Optional sensitivity calculation only. It is neither an NSK formula nor a proven bound.
function unverifiedLinearInteraction({phases,C0=2150,MRO_Nm=9.9,acknowledgeUnverified=false}){
 if(acknowledgeUnverified!==true)throw Error('Explicit acknowledgement required: this is NOT an NSK approved static rule');
 staticScreen({phases,C0,MRO_Nm});
 const utilization=phases.map(p=>(Math.abs(p.Fr)+Math.abs(p.Fs))/C0+Math.abs(p.MrNmm)/1000/MRO_Nm);
 const peak=Math.max(...utilization);
 return {assumedIndex:peak===0?Infinity:1/peak,utilization,manufacturerApproved:false,source:null,pass:null,officialCombinedSafety:null,status:'unverified-linear-utilization-assumption; not a proven conservative bound; never use as a selection verdict'};
}
const api={source,equivalent,thetaIdeal,staticScreen,peakLifeScreen,unverifiedLinearInteraction};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NSKPU=api;
})(typeof globalThis!=='undefined'?globalThis:this);
