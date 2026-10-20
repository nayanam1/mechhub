/* Reviewed catalogue snapshot; no inferred or fitted THK geometry constants. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const N=node?require('./nsk-pu'):root.NSKPU,M=node?require('./nsk-ui-model'):root.NSKScreen;
 const data=node?require('./product-data'):root.LMProductData;
 const L=node?require('./layout-loads'):root.LMLayoutLoads;
 const products=data.products;
 const layoutObservations=[{"name":"NSK 2레일 총 4블록 · 수평","inputs":{"mass":15,"span":100,"railSpan":100,"massX":20,"massY":30,"massZ":35,"driveY":10,"driveZ":45,"speed":80,"stroke":30,"acceleration":10,"cycles":600,"fw":1.2,"rails":2,"blocks":2,"travelDirection":1,"attitude":"horizontal"},"productId":"NSK-PU09TR","date":"2026-10-20","result":"최대 Fe·평균 Fm 표시 정밀도 일치","max":[88.622,44.492,66.557,22.427],"mean":[70.029,26.045,48.001,5.901],"hours":[7740000,150000000,24000000,12900000000],"lifeKm":[278000,5410000,865000,465000000],"phaseLoads":null,"staticSafety":null,"coordinateTransform":"(X,Y,Z)common -> (X,-Z,Y)NSK","source":"https://www.ossel01.nsk.com/prec_selection_common/Top.aspx"},{"name":"NSK 2레일 총 4블록 · 수직","inputs":{"mass":15,"span":100,"railSpan":100,"massX":20,"massY":30,"massZ":35,"driveY":10,"driveZ":45,"speed":80,"stroke":30,"acceleration":10,"cycles":600,"fw":1.2,"rails":2,"blocks":2,"travelDirection":1,"attitude":"vertical"},"productId":"NSK-PU09TR","date":"2026-10-20","result":"최대 Fe·평균 Fm 표시 정밀도 일치","max":[37.137,37.137,37.137,37.137],"mean":[18.787,18.787,18.787,18.787],"hours":[401000000,401000000,401000000,401000000],"lifeKm":[14400000,14400000,14400000,14400000],"phaseLoads":null,"staticSafety":null,"coordinateTransform":"(X,Y,Z)common -> (-Z,Y,X)NSK","source":"https://www.ossel01.nsk.com/prec_selection_common/Top.aspx"}];
 function layoutObservation(p,product){return layoutObservations.find(o=>o.productId===product.id&&Object.entries(o.inputs).every(([k,v])=>typeof v==='number'?Number.isFinite(p[k])&&Math.abs(p[k]-v)<1e-9:p[k]===v))||null;}

 function calculate(p,product){
  L.validate(p);
  if(!product||product.maker!=='NSK'||product.status==='blocked')throw Error('제품 계산 미검증 · 계산 중단');
  if(p.span<product.length)throw Error('블록 간격이 제품 길이 '+product.length+' mm보다 작습니다.');
  if(p.rails===2&&p.railSpan<product.width)throw Error('레일 간격이 블록 폭 '+product.width+' mm보다 작습니다.');
  const r=L.calculate(p,product),o=layoutObservation(p,product);
  return {...r,toolObservation:o,toolValidation:o?'Exact two-rail representative input: maximum Fe and Fm agree at 0.001N display precision; phase Fr/Fs and static fs not output':r.toolValidation};
 }
 function assess(p,product,{targetLife=null,maxHeight=null}={}){
  let result=null;const reasons=[];
  try{result=calculate(p,product);}catch(e){reasons.push(e.message);}
  if(maxHeight!==null&&product.height>maxHeight)reasons.push('허용 설치 높이 초과');
  if(result&&targetLife!==null&&Math.min(...result.blocks.map(b=>b.hours))<targetLife)reasons.push('목표 계산수명 미달');
  const observation=product.model==='PU09TR'&&p.attitude==='wall'&&p.rails===1&&p.blocks===2&&(p.travelDirection??-1)===-1?M.observation(p):layoutObservation(p,product);
  if(result&&result.statics.some(s=>s.forceOnly.safety<1))reasons.push('힘 조합 정적 안전율 1 미만 · 필요 안전율은 별도 설계 기준으로 확인');
  if(observation?.result==='NG / NG')reasons.push('동일 입력 공식 툴 NG 관찰 · 원인 최종 확인 필요');
  return {product,result,reasons,observation,candidate:!!result&&!reasons.length,status:reasons.length?'제외 / 확인 필요':'조건부 검토 후보',selectionPass:null};
 }
 const api={products,comparison:data.comparison,calculate,assess,layoutObservations,layoutObservation};if(node)module.exports=api;else root.LMProducts=api;
})(typeof globalThis!=='undefined'?globalThis:this);
