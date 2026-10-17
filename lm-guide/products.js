/* Reviewed catalogue snapshot; no inferred or fitted THK geometry constants. */
(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const N=node?require('./nsk-pu'):root.NSKPU,M=node?require('./nsk-ui-model'):root.NSKScreen;
 const data=node?require('./product-data'):root.LMProductData;
 const products=data.products;
 function calculate(p,product){
  if(p.attitude!=='wall'||p.rails!==1||p.blocks!==2)throw Error('미검증 배치 · 계산 중단');
  if(!product||product.maker!=='NSK'||product.status==='blocked')throw Error('제품 계산 미검증 · 계산 중단');
  M.calculate(p); // retain existing finite/motion validation; PU09 minimum length is the smallest DB entry
  if(p.span<product.length)throw Error('블록 간격이 제품 길이 '+product.length+' mm보다 작습니다.');
  const r=N.thetaIdeal({...p,arm:-p.massY,driveArm:p.driveY,driveHeight:p.driveZ,C50:product.C50,epsilonR:product.epsilonR});
  return {...r,statics:r.blocks.map(b=>N.staticScreen({phases:b.phases,C0:product.C0,MRO_Nm:product.MRO})),peakLife:r.blocks.map(b=>N.peakLifeScreen({maximum:b.maximum,fw:p.fw,C50:product.C50}))};
 }
 function assess(p,product,{targetLife=null,maxHeight=null}={}){
  let result=null;const reasons=[];
  try{result=calculate(p,product);}catch(e){reasons.push(e.message);}
  if(maxHeight!==null&&product.height>maxHeight)reasons.push('허용 설치 높이 초과');
  if(result&&targetLife!==null&&Math.min(...result.blocks.map(b=>b.hours))<targetLife)reasons.push('목표 계산수명 미달');
  const observation=product.model==='PU09TR'?M.observation(p):null;
  if(observation?.result==='NG / NG')reasons.push('동일 입력 공식 툴 NG 관찰 · 원인 최종 확인 필요');
  return {product,result,reasons,observation,candidate:!!result&&!reasons.length,status:reasons.length?'제외 / 확인 필요':'조건부 검토 후보',selectionPass:null};
 }
 const api={products,comparison:data.comparison,calculate,assess};if(node)module.exports=api;else root.LMProducts=api;
})(typeof globalThis!=='undefined'?globalThis:this);
