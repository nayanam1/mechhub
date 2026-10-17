/* Reviewed catalogue snapshot; no inferred or fitted THK geometry constants. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const N=node?require('./nsk-pu'):root.NSKPU,M=node?require('./nsk-ui-model'):root.NSKScreen;
 const data=node?require('./product-data'):root.LMProductData;
 const L=node?require('./layout-loads'):root.LMLayoutLoads;
 const products=data.products;
 function calculate(p,product){
  L.validate(p);
  if(!product||product.maker!=='NSK'||product.status==='blocked')throw Error('제품 계산 미검증 · 계산 중단');
  if(p.span<product.length)throw Error('블록 간격이 제품 길이 '+product.length+' mm보다 작습니다.');
  if(p.rails===2&&p.railSpan<product.width)throw Error('레일 간격이 블록 폭 '+product.width+' mm보다 작습니다.');
  return L.calculate(p,product);
 }
 function assess(p,product,{targetLife=null,maxHeight=null}={}){
  let result=null;const reasons=[];
  try{result=calculate(p,product);}catch(e){reasons.push(e.message);}
  if(maxHeight!==null&&product.height>maxHeight)reasons.push('허용 설치 높이 초과');
  if(result&&targetLife!==null&&Math.min(...result.blocks.map(b=>b.hours))<targetLife)reasons.push('목표 계산수명 미달');
  const observation=product.model==='PU09TR'&&p.attitude==='wall'&&p.rails===1&&p.blocks===2&&(p.travelDirection??-1)===-1?M.observation(p):null;
  if(result&&result.statics.some(s=>s.forceOnly.safety<1))reasons.push('힘 조합 정적 안전율 1 미만 · 필요 안전율은 별도 설계 기준으로 확인');
  if(observation?.result==='NG / NG')reasons.push('동일 입력 공식 툴 NG 관찰 · 원인 최종 확인 필요');
  return {product,result,reasons,observation,candidate:!!result&&!reasons.length,status:reasons.length?'제외 / 확인 필요':'조건부 검토 후보',selectionPass:null};
 }
 const api={products,comparison:data.comparison,calculate,assess};if(node)module.exports=api;else root.LMProducts=api;
})(typeof globalThis!=='undefined'?globalThis:this);
