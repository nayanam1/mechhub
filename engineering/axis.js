/* Direct-coupled ball-screw axis. Explicit assumptions; no invented motor ratings. */
(function(root){'use strict';
 const positive=(p,k,zero=false)=>{const v=p[k];if(typeof v!=='number'||!Number.isFinite(v)||(zero?v<0:v<=0))throw Error(k+' must be a finite '+(zero?'nonnegative':'positive')+' number');return v;};
 const signed=(p,k)=>{if(typeof p[k]!=='number'||!Number.isFinite(p[k]))throw Error(k+' is required as a finite number');return p[k];};
 const sources={motor:'https://www.orientalmotor.com/technology/motor-sizing-calculations.html',screw:'https://www.thk.com/eu/en/products/ball_screw/selection/0010/',speed:'https://www.thk.com/eu/en/products/ball_screw/selection/0007/'};
 function calculate(p){
  const mass=positive(p,'massKg'),stroke=positive(p,'strokeMm'),speed=positive(p,'speedMmS'),a=positive(p,'accelerationMS2'),cycles=positive(p,'cyclesPerHour'),lead=positive(p,'leadMm')/1000;
  const eta=positive(p,'screwEfficiency');if(eta>1)throw Error('screwEfficiency must be <= 1');
  const angle=signed(p,'inclinationDeg');if(Math.abs(angle)>90)throw Error('inclinationDeg must be -90..90');
  const friction=positive(p,'frictionN',true),external=positive(p,'resistanceN',true),bias=signed(p,'biasForceN');
  const shaftJ=positive(p,'screwInertiaKgm2',true),couplingJ=positive(p,'couplingInertiaKgm2',true),rotorJ=positive(p,'rotorInertiaKgm2',true),drag=positive(p,'preloadTorqueNm',true),fw=positive(p,'loadFactor');if(fw<1)throw Error('loadFactor must be >= 1');
  const tr=speed/1000/a,dr=speed*tr/2;if(2*dr>stroke)throw Error('Requested speed cannot be reached within stroke');
  const tc=(stroke-2*dr)/speed,cycle=3600/cycles,td=cycle/2-2*tr-tc;if(td<-1e-9)throw Error('Cycle frequency exceeds available time');
  const gravity=mass*9.80665*Math.sin(angle*Math.PI/180),alpha=2*Math.PI*a/lead,rotationJ=shaftJ+couplingJ+rotorJ;
  const phases=[];
  for(const direction of [1,-1]){
   for(const [i,acceleration,time,distance] of [[0,direction*a,tr,dr],[1,0,tc,stroke-2*dr],[2,-direction*a,tr,dr]]){
    const force=mass*acceleration+gravity+bias+direction*(friction+external);
    // Force already includes translating mass acceleration. Do NOT add m*(lead/2pi)^2*alpha again.
    const driven=force*direction>=0,linearTorque=force*lead/(2*Math.PI)*(driven?1/eta:eta);
    const torque=linearTorque+rotationJ*(acceleration/a)*alpha+direction*drag;
    phases.push({direction,phase:['acceleration','cruise','deceleration'][i],timeS:time,distanceMm:distance,forceN:force,torqueNm:torque,efficiencyMode:driven?'driving':'backdriving-estimate'});
   }
   const holdForce=gravity+bias;
   phases.push({direction,phase:'dwell',timeS:Math.max(0,td),distanceMm:0,forceN:holdForce,torqueNm:holdForce*lead/(2*Math.PI*eta),efficiencyMode:'hold-estimate-not-static-friction-model'});
  }
  const distanceTotal=phases.reduce((s,v)=>s+v.distanceMm,0);
  const directionalFatigue=[1,-1].map(sign=>({sign,FmN:(phases.reduce((s,v)=>s+Math.max(sign*v.forceN,0)**3*v.distanceMm,0)/distanceTotal)**(1/3)}));
  const Fm=Math.max(...directionalFatigue.map(v=>v.FmN)),peakForce=Math.max(...phases.map(v=>Math.abs(v.forceN))),rpm=speed*60/p.leadMm;
  const screw={leadMm:p.leadMm,rpm,peakAxialN:peakForce,directionalFatigue,FmN:Fm,lifeRevolutions:null,lifeHours:null,staticSafety:null,selectionPass:null,missing:['critical-speed/DN/root diameter/support checks','buckling and tensile/compressive shaft limits','preload/support-bearing life and accuracy']};
  if(p.dynamicRatingN!==undefined){positive(p,'dynamicRatingN');screw.lifeRevolutions=1e6*(p.dynamicRatingN/(fw*Fm))**3;screw.lifeHours=screw.lifeRevolutions/(2*stroke/p.leadMm*cycles);}
  if(p.staticRatingN!==undefined){positive(p,'staticRatingN');screw.staticSafety=p.staticRatingN/peakForce;}
  const motor={rpm,peakTorqueNm:Math.max(...phases.map(v=>Math.abs(v.torqueNm))),rmsTorqueNm:Math.sqrt(phases.reduce((s,v)=>s+v.torqueNm**2*v.timeS,0)/cycle),reflectedTranslationInertiaKgm2:mass*(lead/(2*Math.PI))**2,loadInertiaKgm2:mass*(lead/(2*Math.PI))**2+shaftJ+couplingJ,rotorInertiaKgm2:rotorJ,inertiaRatio:rotorJ===0?null:(mass*(lead/(2*Math.PI))**2+shaftJ+couplingJ)/rotorJ,selectionPass:null,missing:['speed/torque envelope and peak duration','drive regenerative capacity and braking duty','motor cooling/duty and inertia limit','vertical brake holding and safe stopping']};
  return {schemaVersion:'mechhub-axis-v1',status:'preliminary-direct-coupled-axis',inputs:p,motion:{rampS:tr,cruiseS:tc,dwellEachS:Math.max(0,td),cycleS:cycle},phases,screw,motor,sources,assumptions:['Symmetric trapezoidal round trip; direct coupling only','Inclination positive when forward travel rises; biasForceN is a persistent signed required force','Friction/resistance oppose velocity; no stiction or compliance model','Backdriving uses the supplied efficiency as an approximation; dwell torque is an estimate','User-supplied ratings/inertia/efficiency are not catalogue-verified by this module','No automatic motor or screw model recommendation without verified product data']};
 }
 const example={massKg:15,strokeMm:30,speedMmS:80,accelerationMS2:10,cyclesPerHour:600,leadMm:8,screwEfficiency:.9,inclinationDeg:0,frictionN:0,resistanceN:0,biasForceN:0,screwInertiaKgm2:.00001,couplingInertiaKgm2:0,rotorInertiaKgm2:.00001,preloadTorqueNm:0,loadFactor:1.2};
 const api={calculate,example};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AxisSizing=api;
})(typeof globalThis!=='undefined'?globalThis:this);
