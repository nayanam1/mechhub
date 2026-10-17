/* RETIRED v0.8 output-reproduction engine. Used only by empirical.html and historical audits.
 * Current formula primitives: catalogue.js. Theta raceway candidate: theta-raceways.js.
 * Sharing one displayed PR across all channels was incorrect in the presence of roll moment. */
(function (root) {
  'use strict';
  class InputError extends Error { constructor(message) { super(message); this.name = 'InputError'; } }
  const requireNumber = (value, name, positive = false) => {
    if (!Number.isFinite(value) || (positive && value <= 0)) throw new InputError(`${name}: ${positive ? '0보다 큰 ' : ''}유한한 수를 입력하세요.`);
    return value;
  };
  function motion({ stroke, speed, time, cycles }) {
    [['스트로크', stroke], ['속도', speed], ['가감속 시간', time], ['왕복 빈도', cycles]].forEach(([n,v]) => requireNumber(v,n,true));
    const acceleration = speed / 1000 / time;
    const ramp = speed * time / 2;
    let cruise = stroke - 2 * ramp;
    if (cruise < -1e-9) throw new InputError('가속·감속 거리가 스트로크보다 큽니다. 이 버전은 사다리꼴 속도 패턴만 지원합니다. 속도 또는 가감속 시간을 줄이세요.');
    cruise = Math.max(0, cruise);
    const movingTime = 2 * time + cruise / speed;
    const cycleTime = 2 * movingTime;
    if (cycles * cycleTime > 3600 + 1e-7) throw new InputError(`이 운동조건의 최대 빈도는 ${(3600 / cycleTime).toFixed(1)} 왕복/시간입니다. 입력한 빈도가 이동시간을 초과합니다.`);
    return { acceleration, distances: [ramp, cruise, ramp], movingTime, cycleTime, duty: cycles * cycleTime / 3600 };
  }
  function momentEquivalent(momentNmm, coefficientPerMm) {
    requireNumber(momentNmm, '모멘트'); requireNumber(coefficientPerMm, '모멘트 환산계수', true);
    return Math.abs(momentNmm) * coefficientPerMm;
  }
  function validateBlocks(blocks) {
    if (!Array.isArray(blocks) || blocks.length !== 2) throw new InputError('현재는 2블록만 지원합니다.');
    blocks.forEach((b,i) => ['PR','PT'].forEach(axis => {
      if (!Array.isArray(b[axis]) || b[axis].length !== 3) throw new InputError(`No.${i+1} ${axis}: 가속·정속·감속 하중 3개가 필요합니다.`);
      b[axis].forEach(v => requireNumber(v, `No.${i+1} ${axis}`));
    }));
  }
  function calculate(input, blocks) {
    const k = motion(input);
    requireNumber(input.C,'동정격하중 C',true); requireNumber(input.C0,'정적 정격하중 C0',true); requireNumber(input.fw,'하중계수 fw',true);
    if (input.fw < 1) throw new InputError('이 버전에서는 하중계수 fw를 1 이상으로 입력하세요.');
    validateBlocks(blocks);
    const result = blocks.map(b => {
      // Empirical directional channels, NOT physical ball contact force equations.
      const channels = [-1,1].flatMap(sr => [-1,1].map(st => {
        const PE = b.PR.map((pr,j) => Math.max(sr * pr,0) + Math.max(st * b.PT[j],0));
        const Pm = Math.cbrt(PE.reduce((sum,p,j) => sum + p ** 3 * k.distances[j],0) / input.stroke);
        return { sr, st, PE, Pm };
      }));
      const selected = channels.reduce((best,c) => c.Pm > best.Pm ? c : best, channels[0]);
      const instant = b.PR.map((pr,j) => Math.abs(pr) + Math.abs(b.PT[j]));
      const peak = Math.max(...instant);
      const accSum = instant[0], decRadial = Math.abs(b.PR[2]);
      const accDenominator = Math.max(accSum, decRadial);
      const accelSafety = accDenominator === 0 ? Infinity : input.C0 / accDenominator;
      const lifeKm = selected.Pm === 0 ? Infinity : 50 * (input.C / (input.fw * selected.Pm)) ** 3;
      return {
        channels, selected, instant, peak, accDenominator, accelSafety,
        accTerm: accSum >= decRadial ? '가속 |PR| + |PT|' : '감속 |PR|',
        weightedPm: selected.Pm * input.fw, lifeKm,
        hours: lifeKm * 1e6 / (2 * input.stroke * input.cycles),
        peakSafety: peak === 0 ? Infinity : input.C0 / peak
      };
    });
    return { motion: k, blocks: result, lifeKm: Math.min(...result.map(b=>b.lifeKm)), hours: Math.min(...result.map(b=>b.hours)), safety: Math.min(...result.map(b=>b.peakSafety)), governingBlock: result[0].lifeKm <= result[1].lifeKm ? 1 : 2 };
  }
  // Truncation is an observed legacy display convention, not an engineering margin.
  const legacySafety = value => Number.isFinite(value) ? Math.floor((value + 1e-10) * 10) / 10 : value;
  const significant = (value, digits = 3) => Number.isFinite(value) ? Number(value.toPrecision(digits)) : value;
  const api = { InputError, motion, calculate, momentEquivalent, legacySafety, significant };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LMCalc = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
