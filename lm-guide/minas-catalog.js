/* Verified catalogue scope; inner approximations are screening limits, not OEM data tables. */
(function(root){'use strict';
 const technical='https://mediap.industry.panasonic.eu/assets/custom-upload/Factory%20%26%20Automation/Industrial%20Motors/Documents/ti_additional_information_minas_a6.pdf';
 const information='https://industry.panasonic.com/ac/cdn/e/motor/fa-motor/ac-servo/catalog/minas-a6_ctlg_information_e.pdf';
 const source={technical,information,checked:'2026-10-17',specLocal:'sources/minas-a6/technical.pdf',overloadLocal:'sources/minas-a6/information.pdf'};
 // [voltage,power,rated,peak,rotor x1e-4,maxrpm,tail continuous,tail peak,spec page,curve page]
 const values=[[200,1000,4.77,14.3,6.18,3000,3,7.7,12,20],[200,1500,7.16,21.5,9.16,3000,5.6,12,12,20],
 [400,1000,4.77,14.3,6.18,3500,2.1,8,15,24],[400,1500,7.16,21.5,9.16,3500,4,12,15,24],
 [400,2000,9.55,28.7,12.1,3500,5.5,14,15,24],[400,3000,14.3,43,18.6,3500,10.2,27,15,24],
 [400,4000,19.1,57.3,46.9,3500,10.1,25,15,24],[400,5000,23.87,71.6,58.2,3000,13.1,44,15,24]];
 const models=values.map(([voltage,power,rated,peak,j,maxRpm,tailC,tailP,specPage,curvePage])=>{
  const code='MDMF'+String(power/100).padStart(2,'0')+(voltage===200?'2L1□□':'4L1□□M');
  return {id:code,name:code,powerW:power,voltage,ratedTorqueNm:rated,maxTorqueNm:peak,rotorInertia:j*1e-4,maxRpm,ratedRpm:2000,inertiaRatioLimit:voltage===200?10:null,
   continuous:[[0,rated*.9],[1800,rated*.9],[maxRpm,tailC*.9]],peak:[[0,peak*.9],[1800,peak*.9],[maxRpm,tailP*.9]],
   specPage,curvePage,overloadPage:2,printedOverloadPages:'379–380',source,
   overload:{kind:'conservative_protection_screen',points:[[125,50],[150,25],[200,10],[250,6],[300,4]],scope:'MDMF 1–5kW 회전/정지 공통 내접 검토값'},
   note:'형번 옵션 미확정·브레이크 없는 회전자 관성. 연속/피크는 그림 안쪽 근사(10% 여유), 1800rpm부터 미리 감소.'};
 });
 const api={models,source};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.MinasCatalog=api;
})(typeof globalThis!=='undefined'?globalThis:this);
