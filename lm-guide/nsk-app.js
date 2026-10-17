(function(){
 'use strict';
 const M=NSKScreen,N=NSKPU,$=id=>document.getElementById(id);
 const f=(v,n=3)=>Number.isFinite(v)?(Math.abs(v)<.5*10**(-n)?0:v).toLocaleString('ko-KR',{maximumFractionDigits:n}):'∞';
 const table=(heads,rows)=>`<table><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map((s,i)=>i===0?`<th scope="row">${s}</th>`:`<td>${s}</td>`).join('')+'</tr>').join('')}</tbody></table>`;
 const delta=(v,b,n=3)=>!Number.isFinite(v)||!Number.isFinite(b)?'—':`${v-b>0?'+':''}${f(v-b,n)} (${b===0?'기준 0':((v-b)/Math.abs(b)*100>0?'+':'')+f((v-b)/Math.abs(b)*100,1)+'%'})`;
 let reference={...M.BASE},referenceLabel='Theta 원본 · 15kg',last=null;
 for(const [key,label,unit] of M.fields){
  const div=document.createElement('div'),l=document.createElement('label'),input=document.createElement('input');
  l.htmlFor='in-'+key;l.textContent=label+(unit?' · '+unit:'');input.id=l.htmlFor;input.name=key;input.type='number';input.step='any';input.required=true;
  if(['mass','span','stroke','speed','cycles'].includes(key))input.min=key==='span'?'30':'0.000001';
  if(key==='acceleration')input.min='0';if(key==='fw'){input.min='1';input.max='3';}
  div.append(l,input);$(M.fields.findIndex(x=>x[0]===key)<7?'geometry-fields':'motion-fields').append(div);
 }
 const read=()=>Object.fromEntries(M.fields.map(([k])=>[k,$('in-'+k).value.trim()===''?NaN:Number($('in-'+k).value)]));
 function render(){
  last=null;$('export').disabled=true;$('error').hidden=true;
  try{
   const p=read(),r=M.calculate(p),b=M.calculate(reference),o=M.observation(p);
   $('result-content').hidden=false;
   $('coordinates').textContent=`질량 (${f(p.massX)}, ${f(p.massY)}, ${f(p.massZ)}) mm · 추력 Y/Z (${f(p.driveY)}, ${f(p.driveZ)}) mm`;
   $('input-state').textContent=M.same(p,M.BASE)?'Theta 원본 입력 · PU09TR의 공개식 계산 결과입니다.':'변경 조건 · 공개식으로 재계산했습니다. 원본과의 차이는 아래에서 확인하세요.';
   $('metrics').innerHTML=`<div class="metric"><small>No.1 최대 동등가하중</small><strong>${f(r.blocks[0].maximum)} <span>N</span></strong></div><div class="metric"><small>No.2 최대 동등가하중</small><strong>${f(r.blocks[1].maximum)} <span>N</span></strong></div><div class="metric"><small>가장 짧은 블록 계산수명</small><strong>${f(Math.min(...r.blocks.map(v=>v.hours)),0)} <span>h</span></strong></div>`;
   $('motion').textContent=`편도: 가속 ${f(r.motion.rampSeconds,5)}s / 정속 ${f(r.motion.cruiseSeconds,5)}s / 감속 ${f(r.motion.rampSeconds,5)}s / 정지 ${f(r.motion.stopSeconds,5)}s · 거리 ${r.distances.map(v=>f(v,4)).join(' / ')}mm · 평균속도 ${f(r.motion.averageSpeed)}mm/s`;
   $('block-results').innerHTML=table(['블록','최대 Fe · N','평균 Fm · N','수명 · km','수명 · h','최대 Fe 기준 수명¹ · km'],r.blocks.map((v,i)=>['No.'+v.number,f(v.maximum),f(v.Fm),f(v.lifeKm,1),f(v.hours,0),f(r.peakLife[i].lifeKm,1)]))+`<p class="muted">¹ 최대하중이 계속 작용한다는 가정의 고하중 구간 검토. ${r.peakLife.some(v=>v.below3000Km)?'3,000km 미만인 블록이 있습니다. A45의 접촉압·윤활 주의 대상입니다.':'현재 계산에서 3,000km 미만인 블록은 없습니다.'} 이 주의사항은 툴의 자동 NG 규칙과 다릅니다.</p>`;
   $('reference-name').textContent=referenceLabel;
   const changes=M.fields.filter(([k])=>Math.abs(p[k]-reference[k])>1e-9);
   $('changed-fields').textContent=changes.length?changes.map(([k,l,u])=>`${l}: ${f(reference[k])} → ${f(p[k])}${u?' '+u:''}`).join(' · '):'기준과 같은 입력조건입니다.';
   $('comparison').innerHTML=table(['블록 / 항목','비교 기준','현재','증감'],r.blocks.flatMap((v,i)=>[['최대 Fe · No.'+v.number+' / N',f(b.blocks[i].maximum),f(v.maximum),delta(v.maximum,b.blocks[i].maximum)],['평균 Fm · No.'+v.number+' / N',f(b.blocks[i].Fm),f(v.Fm),delta(v.Fm,b.blocks[i].Fm)],['계산수명 · No.'+v.number+' / h',f(b.blocks[i].hours,0),f(v.hours,0),delta(v.hours,b.blocks[i].hours,0)]]));
   $('tool-result').innerHTML=o?`<div class="record"><strong>같은 입력의 직접 관찰 기록: ${o.result}</strong><p>${o.name} · 2026-10-16 · <a href="../verification/${o.pdf}" target="_blank" rel="noopener">NSK 공식 결과 PDF ↗</a></p></div>`+(o.max?table(['블록','공식 계산 최대 N','툴 최대 N','차이 N','공식 계산 평균 N','툴 평균 N','차이 N'],r.blocks.map((v,i)=>['No.'+v.number,f(v.maximum,6),f(o.max[i]),f(v.maximum-o.max[i],6),f(v.Fm,6),f(o.mean[i]),f(v.Fm-o.mean[i],6)]))+'<p class="muted">최대/평균하중의 표시 정밀도 대조입니다. 전체 선정 적합이나 수명의 완전 일치를 보증하지 않습니다.</p>':'<p>해당 툴 결과는 수치를 출력하지 않았습니다. 위 하중·수명은 독립 공개식 계산값이며, NG 화면에서 얻은 값이 아닙니다.</p>'):'<div class="record"><strong>현재 입력은 직접 대조한 툴 기록이 없습니다.</strong><p>계산값은 갱신되지만 툴 일치·NG 여부는 판정하지 않습니다. 아래 경계는 기존 시험의 참고 자료입니다.</p></div>';
   $('statics').innerHTML=table(['블록','힘만 P₀ 최대 · N','힘만 fs','롤만 |Mr| · N·m','롤만 fs','힘+롤 종합 fs'],r.statics.map((s,i)=>['No.'+(i+1),f(s.forceOnly.P0),f(s.forceOnly.safety),f(s.rollOnly.momentNm,6),f(s.rollOnly.safety),'미확정']));
   const show=$('assumption').checked;$('assumption-result').hidden=!show;
   if(show)$('assumption-result').innerHTML=table(['블록','공식 근거 없는 참고 지수 I','NSK 공식 종합 fs','적합 판정'],r.blocks.map(v=>['No.'+v.number,f(N.unverifiedLinearInteraction({phases:v.phases,acknowledgeUnverified:true}).assumedIndex),'미확정','판정하지 않음']));
   else $('assumption-result').replaceChildren();
   $('phases').innerHTML=table(['블록','왕로 구간','Fr · N','Fs · N','Mr · N·mm','Fe · N'],r.blocks.flatMap(v=>v.phases.map((q,i)=>['No.'+v.number,['가속','정속','감속'][i],f(q.Fr,6),f(q.Fs,6),f(q.MrNmm,6),f(q.Fe,6)])));
   const matchedIndex=M.observations.findIndex(v=>M.same(v.inputs,p));$('preset').value=String(matchedIndex);
   if(matchedIndex<0||!$('preset').value)$('preset').value='-1';
   last={version:'nsk-screen-v1',product:{model:'PU09TR',C50:1490,C0:2150,MRO_Nm:9.9},inputs:p,referenceInputs:reference,referenceLabel,result:r,
    basis:{official:'NSK E3162 A36/A39–44; PU09TR catalogue',observed:o?{...o}:null,unknown:{combinedStaticSafety:null,selectionPass:null},observedThreshold:{status:'observation-only-not-a-catalogue-rule',rangeN:[297.94468351713607,298.19484697936707],currentInputGatePrediction:null}},unverifiedReference:show?r.blocks.map(v=>N.unverifiedLinearInteraction({phases:v.phases,acknowledgeUnverified:true})):null};
   $('export').disabled=false;
  }catch(e){$('error').textContent=e.message;$('error').hidden=false;$('result-content').hidden=true;$('coordinates').textContent='입력조건을 확인하세요.';}
 }
 function load(p){for(const [key] of M.fields)$('in-'+key).value=p[key];$('assumption').checked=false;render();}
 $('inputs').addEventListener('submit',e=>e.preventDefault());$('inputs').addEventListener('input',render);
 $('theta').addEventListener('click',()=>{reference={...M.BASE};referenceLabel='Theta 원본 · 15kg';load(M.BASE);});
 $('preset').addEventListener('change',()=>{const v=M.observations[Number($('preset').value)];if(v)load(v.inputs);});
 $('pin').addEventListener('click',()=>{if(!last)return;reference={...last.inputs};referenceLabel='저장한 비교 기준';render();});
 $('reference-reset').addEventListener('click',()=>{reference={...M.BASE};referenceLabel='Theta 원본 · 15kg';render();});
 $('assumption').addEventListener('change',render);
 $('export').addEventListener('click',()=>{if(!last)return;const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(last,(k,v)=>typeof v==='number'&&!Number.isFinite(v)?'Infinity':v,2)],{type:'application/json'}));a.href=url;a.download='NSK_PU09TR_conditions_results.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 load(M.BASE);
})();
