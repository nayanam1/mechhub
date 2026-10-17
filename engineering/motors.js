(function(root){'use strict';
 const A=typeof module!=='undefined'&&module.exports?require('./axis'):root.AxisSizing;
 const source='https://catalog.nayanam.synology.me/media/f7451526e276b9cfd9490d91ec122a71.pdf';
 const products=[['MSMF012L1□□',100,.32,.95,.048e-4,'MADLT05SF',33,'63–64'],['MSMF022L1□□',200,.64,1.91,.14e-4,'MADLT15SF',34,'65–66'],['MSMF042L1□□',400,1.27,3.82,.27e-4,'MBDLT25SF',35,'67–68']].map(([model,watts,ratedTorqueNm,peakTorqueNm,rotorInertiaKgm2,amplifier,pdfPage,printed])=>({maker:'Panasonic',series:'MINAS A6 MSMF',model,watts,ratedTorqueNm,peakTorqueNm,rotorInertiaKgm2,amplifier,ratedRpm:3000,maxRpm:6000,recommendedInertiaRatio:30,screenMaxRpm:3000,screenMaxAmbientC:20,source:source+'#page='+pdfPage,pdfPage,printed,configuration:'AC200V / no brake / no oil seal / motor construction suffix not selected',status:'catalogue-data-reviewed; sizing-not-maker-tool-compared',reviewed:'2026-10-17'}));
 function candidates(p){
  if(typeof p.ambientC!=='number'||!Number.isFinite(p.ambientC))throw Error('ambientC is required; do not assume motor derating temperature');
  return products.map(product=>{
   const result=A.calculate({...p,rotorInertiaKgm2:product.rotorInertiaKgm2}),r=result.motor,reasons=[];
   if(r.rpm>product.screenMaxRpm)reasons.push('Above reviewed flat-torque range (3000 rpm); torque curve digitization needed');
   if(p.ambientC<0||p.ambientC>20)reasons.push('Outside conservative reviewed temperature range 0–20 C; derating review needed');
   if(r.peakTorqueNm>product.peakTorqueNm)reasons.push('Peak torque exceeds catalogue maximum');
   if(r.rmsTorqueNm>product.ratedTorqueNm)reasons.push('RMS torque exceeds catalogue rated torque');
   if(r.inertiaRatio>product.recommendedInertiaRatio)reasons.push('Load inertia ratio exceeds catalogue recommendation');
   const missing=['Final motor construction suffix/encoder/drive configuration','Peak duration/overload curve, regeneration, thermal installation and tuning','Maker sizing confirmation'];
   if(p.inclinationDeg!==0)missing.push('Vertical holding brake variant and safe stop calculation (stored products have no brake)');
   return {product,result:r,conditionalCandidate:!reasons.length,reasons,missing,selectionPass:null};
  });
 }
 const api={products,candidates};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PanasonicSizing=api;
})(typeof globalThis!=='undefined'?globalThis:this);
