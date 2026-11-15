const assert=require('node:assert/strict');
const {estimate}=require('./analysis-worker.js');
const sr=11025,duration=30,a=new Float32Array(sr*duration);
for(let t=0;t<duration;t+=.5){for(let j=0;j<180;j++){const i=Math.round(t*sr)+j;if(i<a.length)a[i]=Math.sin(j*.7)*Math.exp(-j/35)}}
const r=estimate(a,sr);assert.ok(Math.abs(r.bpm-120)<2,`Tempo: ${r.bpm}`);assert.equal(r.valid,true);assert.equal(r.duration,30);assert.equal(r.wave.length,200);assert.ok(r.periodicity>.5);assert.ok(Math.abs(r.offset)<.03);
const silent=estimate(new Float32Array(sr*2),sr);assert.equal(silent.valid,false);assert.equal(silent.periodicity,0);assert.ok(silent.wave.every(Number.isFinite));console.log('OK: pulso sintético 120 BPM, duración, fase, forma de onda y silencio.');

for(const bpm of [90,150,180]){const signal=new Float32Array(sr*24);for(let t=.13;t<24;t+=60/bpm)for(let j=0;j<180;j++){const i=Math.round(t*sr)+j;if(i<signal.length)signal[i]=Math.sin(j*.7)*Math.exp(-j/35)}const measured=estimate(signal,sr);assert.equal(measured.valid,true);assert.ok(Math.abs(measured.bpm-bpm)<3,`${bpm} esperado; ${measured.bpm} obtenido`)}
console.log('OK: detección automática de 90, 150 y 180 BPM; silencio rechazado.');
