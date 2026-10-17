(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const R=node?require('./reactions.js'):root.LMReactions;
 const C=node?require('./calculations.js'):root.LMCalc;
 function run(examples,reactionEngine=R){return examples.map(e=>{
  const generated=reactionEngine.calculate(e.inputs),result=C.calculate(e.inputs,generated.blocks),details=[];
  generated.blocks.forEach((b,i)=>['PR','PT'].forEach(axis=>b[axis].forEach((value,j)=>details.push({block:i+1,axis,phase:['가속','정속','감속'][j],calculated:value,reference:e.blocks[i][axis][j],difference:value-e.blocks[i][axis][j]}))));
  const max=(axis)=>Math.max(...details.filter(d=>d.axis===axis).map(d=>Math.abs(d.difference)));
  return {id:e.id,name:e.name,role:e.id.startsWith('fine-')?'미세 전환·Gr 영점 재현':e.id.startsWith('boundary-')?'No.1 전환·영점 대조':e.id.startsWith('span-')?'BS · 기준/전환 대조':e.id.startsWith('combined-')?'복합 · 고정식 독립 대조':e.id==='theta-0'?'계수 기준':'기준 외 대조',details,maxPR:max('PR'),maxPT:max('PT'),
   maxPE:e.expected.PE?Math.max(...result.blocks.flatMap((b,i)=>b.selected.PE.map((v,j)=>Math.abs(v-e.expected.PE[i][j])))):null,
   maxPm:Math.max(...result.blocks.map((b,i)=>Math.abs(b.selected.Pm-e.expected.Pm[i]))),
   maxLifePercent:Math.max(...result.blocks.map((b,i)=>Math.abs(b.lifeKm/e.expected.L[i]-1)*100)),
   safety:e.expected.accelSafety?result.blocks.map((b,i)=>({calculated:b.accelSafety,display:C.legacySafety(b.accelSafety),reference:e.expected.accelSafety[i],matches:C.legacySafety(b.accelSafety)===e.expected.accelSafety[i]})):[],
   summarySafety:e.expected.safety===undefined?null:{calculated:result.safety,display:C.legacySafety(result.safety),reference:e.expected.safety},
   oldMaxLoadError:Math.max(...generated.blocks.flatMap((_,i)=>['PR','PT'].flatMap(axis=>{
    const p=e.inputs,W=p.mass*9.80665,a=p.speed/1000/p.time;
    return [a,0,-a].map((phase,j)=>{let pr=-.132*W*p.Gr/2+.05021*p.mass*phase*(p.Br+p.Gr),pt=-W/2-.05021*(W*(p.BS/2-p.Ga)-p.mass*phase*(p.Bt-p.Gt));return Math.abs((axis==='PR'?(i===0?pr:-pr):(i===0?pt:-W-pt))-e.blocks[i][axis][j]);});
   }))),
   rollDirections:generated.rollDirections};
 });}
 const api={run};if(node)module.exports=api;else root.LMReactionValidation=api;
})(typeof globalThis!=='undefined'?globalThis:this);
