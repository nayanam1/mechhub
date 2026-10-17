(function(root){'use strict';
 const A=typeof module!=='undefined'&&module.exports?require('./axis'):root.AxisSizing;
 const source='https://catalog.nayanam.synology.me/media/f3cf7b884a2b3bcf074d4dd8e3ad5c53.pdf';
 const products=[
 {model:'BNK0801-3G0',diameterMm:8,leadMm:1,dynamicRatingN:640,staticRatingN:1400,rootMm:7.3,tableMaxRpm:3500,page:131,preloaded:true},
 {model:'BNK1002-3RRG0',diameterMm:10,leadMm:2,dynamicRatingN:1500,staticRatingN:2900,rootMm:9,tableMaxRpm:3500,page:137,preloaded:true},
 {model:'BNK1408-2.5RRG0',diameterMm:14,leadMm:8,dynamicRatingN:4300,staticRatingN:5800,rootMm:11.2,tableMaxRpm:4740,page:153,preloaded:true},
 {model:'BNK1408-2.5RRG2',diameterMm:14,leadMm:8,dynamicRatingN:6900,staticRatingN:11500,rootMm:11.2,tableMaxRpm:4740,page:153,preloaded:false}
 ].map(v=>({...v,source:source+'#page='+v.page,formulaSource:source+'#page=30',status:'catalogue-reviewed; calculations-not-maker-tool-compared',comparison:v.model.endsWith('G2')?'G0 4300/5800N과 구분: G2 6900/11500N':'과거 결과 PDF 정격과 일치; 모델 구조 기호는 현 카탈로그 표기 사용'}));
 function candidates(p){
  const factors={'fixed-free':{buckling:1.3,critical:3.4},'fixed-supported':{buckling:10,critical:15.1},'fixed-fixed':{buckling:20,critical:21.9}};
  const length=p.mountingSpanMm,support=p.support;
  if(length!==undefined&&(typeof length!=='number'||!Number.isFinite(length)||length<=0))throw Error('mountingSpanMm must be positive');
  if(support!==undefined&&!factors[support])throw Error('support must be fixed-free, fixed-supported or fixed-fixed');
  for(const key of ['requiredStaticSafety','targetLifeHours'])if(p[key]!==undefined&&(typeof p[key]!=='number'||!Number.isFinite(p[key])||p[key]<=0))throw Error(key+' must be positive');
  return products.map(product=>{
   const result=A.calculate({...p,leadMm:product.leadMm,dynamicRatingN:product.dynamicRatingN,staticRatingN:product.staticRatingN}).screw,reasons=[],missing=['Exact stroke/shaft length/end configuration and support bearing selection','Selected shaft inertia, nut stiffness and thermal/positioning accuracy','Manufacturer sizing confirmation'];
   const checks={criticalRpm:null,bucklingN:null,tensileCompressiveN:116*product.rootMm**2,permissibleRpm:null};
   if(length&&support){checks.criticalRpm=factors[support].critical*product.rootMm/length**2*1e7;checks.bucklingN=factors[support].buckling*product.rootMm**4/length**2*1e4;checks.permissibleRpm=Math.min(product.tableMaxRpm,checks.criticalRpm);if(result.peakAxialN>checks.bucklingN)reasons.push('Axial magnitude exceeds buckling limit (conservative compression envelope)');if(result.rpm>checks.permissibleRpm)reasons.push('Rotational speed exceeds permissible minimum');}
   else missing.push('mountingSpanMm and support needed for critical speed and buckling');
   if(result.peakAxialN>checks.tensileCompressiveN)reasons.push('Axial magnitude exceeds shaft tensile/compressive limit');
   if(result.rpm>product.tableMaxRpm)reasons.push('Speed exceeds product table limit');
   if(p.requiredStaticSafety===undefined)missing.push('User-required static safety criterion');else if(result.staticSafety<p.requiredStaticSafety)reasons.push('Static safety below user criterion');
   if(p.targetLifeHours!==undefined&&result.lifeHours<p.targetLifeHours)reasons.push('Life below user target');
   if(product.preloaded)missing.push('Preload internal-load fatigue calculation; unpreloaded life is reference only');
   return {product,result,shaftChecks:checks,conditionalCandidate:!product.preloaded&&!!length&&!!support&&p.requiredStaticSafety!==undefined&&!reasons.length,reasons,selectionPass:null,missing,status:product.preloaded?'preloaded-life-unverified-reference-only':'unpreloaded-catalogue-preselection',assumption:'Stock table maximum rpm and simplified catalogue root-diameter shaft checks. Absolute axial load used as conservative compression envelope. Shaft input inertia reused, not auto-verified.'};
  });
 }
 const api={products,candidates};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ScrewSizing=api;
})(typeof globalThis!=='undefined'?globalThis:this);
