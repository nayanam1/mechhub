/* Manufacturer formula primitives. Inputs are explicit loads, not inferred tool display fields. */
(function(root){
 'use strict';
 const SOURCE=Object.freeze({thkEquivalent:'https://www.thk.com/jp/en/products/lm_guide/selection/0004/',thkRows:'https://www.thk.com/us/en/products/lm_guide/selection/0007/',thkAverage:'https://www.thk.com/jp/en/products/lm_guide/selection/0006/',nskNHNS:'https://www.nsk.com/content/dam/nsk/common/catalogs/ctrgPdf/precision/e3332c.pdf',thkScrew:'https://www.thk.com/eu/en/products/ball_screw/selection/0010/'});
 const finite=(v,name)=>{if(!Number.isFinite(v))throw new Error(name+': 유한한 수가 필요합니다.');return v;};
 const positive=(v,name)=>{finite(v,name);if(v<=0)throw new Error(name+': 0보다 커야 합니다.');return v;};
 function motion(p){
  ['speed','time','stroke','cycles'].forEach(k=>positive(p[k],k));
  const ramp=p.speed*p.time/2,cruise=p.stroke-2*ramp;
  if(cruise<0)throw new Error('가감속 거리가 스트로크를 초과합니다.');
  if(p.cycles*2*(2*p.time+cruise/p.speed)>3600)throw new Error('왕복 빈도가 이동시간을 초과합니다.');
  return {distances:[ramp,cruise,ramp],acceleration:p.speed/1000/p.time};
 }
 function average(loads,distances,exponent=3){
  positive(exponent,'지수');if(!Array.isArray(loads)||!Array.isArray(distances)||!loads.length||loads.length!==distances.length)throw new Error('하중·거리 배열 길이가 같아야 합니다.');
  loads.forEach(v=>{finite(v,'하중');if(v<0)throw new Error('평균 집계 입력은 비음수 등가하중이어야 합니다. 방향은 집계 전에 분리하세요.');});
  distances.forEach(v=>{finite(v,'거리');if(v<0)throw new Error('거리는 음수가 될 수 없습니다.');});
  const total=positive(distances.reduce((s,v)=>s+v,0),'총거리');
  return (loads.reduce((s,v,i)=>s+v**exponent*distances[i],0)/total)**(1/exponent);
 }
 function thkEquivalent(radialMagnitude,lateralMagnitude,X=1,Y=1){
  [radialMagnitude,lateralMagnitude,X,Y].forEach(v=>{finite(v,'등가하중 입력');if(v<0)throw new Error('하중 크기와 환산계수는 비음수입니다.');});
  return X*radialMagnitude+Y*lateralMagnitude;
 }
 // sr/st identify loadable directions. PR must belong to THIS raceway, including its moment contribution.
 function thkRaceway(PR,PT,sr,st,X=1,Y=1){
  finite(PR,'PR');finite(PT,'PT');if(![-1,1].includes(sr)||![-1,1].includes(st))throw new Error('방향은 ±1입니다.');
  return thkEquivalent(Math.max(sr*PR,0),Math.max(st*PT,0),X,Y);
 }
 function life({C,Pm,fw=1,referenceKm,fH=1,fT=1,fC=1,exponent=3}){
  [C,fw,referenceKm,fH,fT,fC,exponent].forEach(v=>positive(v,'수명 계수'));finite(Pm,'Pm');if(Pm<0)throw new Error('Pm은 비음수입니다.');
  return Pm===0?Infinity:referenceKm*(fH*fT*fC*C/(fw*Pm))**exponent;
 }
 function aggregateRaceways(input,blocks,distances){
  positive(input.C0,'C0');
  if(!Array.isArray(blocks)||!blocks.length)throw new Error('블록별 레이스웨이 하중이 필요합니다.');
  const results=blocks.map(b=>{
   if(!b.channels?.length)throw new Error('레이스웨이별 PE 배열을 명시하세요.');
   const channels=b.channels.map(c=>({...c,Pm:average(c.PE,distances)}));
   const selected=channels.reduce((best,c)=>c.Pm>best.Pm?c:best,channels[0]);
   const peak=Math.max(...channels.flatMap(c=>c.PE));
   return {...b,channels,selected,peak,weightedPm:input.fw*selected.Pm,lifeKm:life({...input,Pm:selected.Pm,referenceKm:input.referenceKm??50}),safety:peak===0?Infinity:positive(input.C0,'C0')/peak};
  });
  const lifeKm=Math.min(...results.map(b=>b.lifeKm)),safety=Math.min(...results.map(b=>b.safety));
  return {blocks:results,lifeKm,safety,hours:lifeKm*1e6/(2*positive(input.stroke,'ST')*positive(input.cycles,'빈도')),basis:'catalogue aggregation; supplied raceway loads must be independently justified'};
 }
 // NSK e3332c printed p.6: NH/NS only; eps in 1/m and moments in N mm explicitly converted.
 function nskNHNS({Fr,Fs,MrNmm=0,MpNmm=0,MyNmm=0,epsilonR,epsilonP,epsilonY}){
  [Fr,Fs,MrNmm,MpNmm,MyNmm].forEach(v=>finite(v,'NSK 하중/모멘트'));
  const converted=(m,e)=>{if(m===0)return 0;return Math.abs(m)/1000*positive(e,'NSK 모델별 동등가계수 1/m');};
  const components=[Math.abs(Fr),Math.abs(Fs)*Math.tan(50*Math.PI/180),converted(MrNmm,epsilonR),converted(MpNmm,epsilonP),converted(MyNmm,epsilonY)];
  return {components,Fe:(components.reduce((s,v)=>s+v,0)+Math.max(...components))/2,profile:'NSK NH/NS, alpha=50 degrees; not applicable to THK HSR'};
 }
 function screwAverage(axialLoads,revolutions){
  const directions=[-1,1].map(sign=>({sign,Fm:average(axialLoads.map(v=>Math.max(sign*finite(v,'축하중'),0)),revolutions)}));
  return {directions,Fm:Math.max(...directions.map(d=>d.Fm))};
 }
 const api={SOURCE,motion,average,thkEquivalent,thkRaceway,life,aggregateRaceways,nskNHNS,screwAverage};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LMCatalogue=api;
})(typeof globalThis!=='undefined'?globalThis:this);
