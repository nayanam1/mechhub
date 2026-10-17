(function(root){
 'use strict';
 const N=typeof module!=='undefined'&&module.exports?require('./nsk-pu'):root.NSKPU;
 const BASE=Object.freeze({mass:15,span:31.6,massX:0,massY:-13,massZ:0,driveY:24,driveZ:3.5,speed:80,stroke:30,acceleration:10,cycles:600,fw:1.2});
 const fields=[['mass','질량','kg'],['span','블록 간격 BS','mm'],['massX','질량 위치 X','mm'],['massY','질량 위치 Y','mm'],['massZ','질량 위치 Z','mm'],['driveY','추력 위치 Y','mm'],['driveZ','추력 위치 Z','mm'],['stroke','스트로크','mm'],['speed','최고속도','mm/s'],['acceleration','가감속도','m/s²'],['cycles','왕복 빈도','회/h'],['fw','하중계수 fw','']];
 const observations=[
  {name:'Theta 15kg',inputs:{...BASE},result:'NG / NG',pdf:'Theta_NSK_PU09TR_15kg_limit_review_tool.pdf'},
  {name:'Theta 형상 1kg',inputs:{...BASE,mass:1},result:'수치 출력',max:[25.016,20.113],mean:[18.775,13.912],pdf:'Theta_NSK_PU09TR_1kg_corrected_tool.pdf'},
  {name:'중앙 질량 1kg',inputs:{...BASE,mass:1,massX:15.8},result:'수치 출력',max:[22.565,22.565],mean:[16.331,16.331],pdf:'NSK_PU09TR_1kg_center_tool.pdf'},
  {name:'11.9kg',inputs:{...BASE,mass:11.9},result:'수치 출력',max:[297.695,239.345],mean:[223.427,165.556],pdf:'NSK_PU09TR_11_9kg_limit_tool.pdf'},
  {name:'경계 아래 11.91kg',inputs:{...BASE,mass:11.91},result:'수치 출력',max:[297.945,239.546],mean:[223.615,165.695],pdf:'NSK_PU09TR_11_91kg_limit_tool.pdf'},
  {name:'경계 위 11.92kg',inputs:{...BASE,mass:11.92},result:'NG / NG',pdf:'NSK_PU09TR_11_92kg_limit_tool.pdf'},
  {name:'12kg',inputs:{...BASE,mass:12},result:'NG / NG',pdf:'NSK_PU09TR_12kg_limit_tool.pdf'},
  {name:'11.91kg · fw1.5',inputs:{...BASE,mass:11.91,fw:1.5},result:'수치 출력',max:[297.945,239.546],mean:[223.615,165.695],pdf:'NSK_PU09TR_11_91kg_fw1_5_tool.pdf'}
 ];
 function calculate(p){
  for(const [key,label] of fields)if(!Number.isFinite(p[key]))throw Error(label+'에 숫자를 입력하세요.');
  for(const key of ['mass','stroke','speed','cycles'])if(p[key]<=0)throw Error(fields.find(f=>f[0]===key)[1]+'은 0보다 커야 합니다.');
  if(p.acceleration<0)throw Error('가감속도는 0 이상이어야 합니다.');
  if(p.span<30)throw Error('PU09TR 블록 길이는 30mm입니다. BS는 30mm 이상이어야 합니다.');
  if(p.fw<1||p.fw>3)throw Error('하중계수 fw는 1~3 범위로 입력하세요.');
  let r;try{r=N.thetaIdeal({...p,arm:-p.massY,driveArm:p.driveY,driveHeight:p.driveZ});}catch(e){
   if(e.message.includes('Trapezoidal'))throw Error('스트로크가 짧아 지정한 최고속도에 도달할 수 없습니다. 속도·가감속도·스트로크를 조정하세요.');
   if(e.message.includes('frequency'))throw Error('왕복 빈도가 높아 이동 시간을 확보할 수 없습니다. 빈도 또는 운전조건을 조정하세요.');
   throw e;
  }
  return {...r,statics:r.blocks.map(b=>N.staticScreen({phases:b.phases})),peakLife:r.blocks.map(b=>N.peakLifeScreen({maximum:b.maximum,fw:p.fw}))};
 }
 const same=(a,b)=>fields.every(([k])=>Math.abs(a[k]-b[k])<1e-9);
 const observation=p=>observations.find(o=>same(p,o.inputs))||null;
 const api={BASE,fields,observations,calculate,same,observation};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NSKScreen=api;
})(typeof globalThis!=='undefined'?globalThis:this);
