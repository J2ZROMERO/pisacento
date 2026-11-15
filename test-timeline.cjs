const assert=require('node:assert/strict');
const {beatAt,timeAt}=require('./beat-timeline.js');
const {estimate}=require('./analysis-worker.js');
const beats=[.2,.7,1.21,1.74,2.3];
for(let n=0;n<=4;n+=.25)assert.ok(Math.abs(beatAt(timeAt(n,beats,120,0),beats,120,0)-n)<1e-8);
assert.ok(Math.abs(beatAt(.45,beats,120,0)-.5)<1e-8);
const sr=11025,a=new Float32Array(sr*30),truth=[];
for(let t=.2;t<29.8;t+=.5+.07*Math.sin(t/5)){truth.push(t);for(let j=0;j<100;j++){const k=Math.round(t*sr)+j;if(k<a.length)a[k]=Math.sin(j*.7)*Math.exp(-j/20)}}
const result=estimate(a,sr);assert.ok(result.beats.length>30);
const matched=truth.filter(t=>result.beats.some(b=>Math.abs(b-t)<.05)).length/truth.length;
assert.ok(matched>.9,`Pulsos próximos: ${matched}`);
const interior=result.beats.slice(2,-2);assert.ok(interior.every((t,i)=>i===0||t>interior[i-1]));
console.log('OK: timeline reversible, reproducción con intervalos variables y >90% de pulsos sintéticos a menos de 50 ms.');


const {rhythmDiagnostics}=require('./analysis-worker.js');
const fps=100,regular=Array.from({length:30},(_,i)=>i*.5),onset=new Array(1500).fill(0),energy=new Array(1500).fill(.2);
regular.forEach(t=>{onset[Math.round(t*fps)]=1});
for(let i=500;i<800;i++){onset[i]=0;energy[i]=0}
const alerts=rhythmDiagnostics(regular,onset,energy,fps,15);
assert.ok(alerts.some(a=>a.kind==='silence'&&a.start<=5&&a.end>=8));assert.ok(alerts.some(a=>a.kind==='weak'));
const changed=[0,.5,1,1.5,2,2.5,3,3.5,4,4.65,5.3,5.95,6.6,7.25,7.9,8.55,9.2];
assert.ok(rhythmDiagnostics(changed,new Array(1000).fill(1),new Array(1000).fill(.2),100,10).some(a=>a.kind==='tempo'));
assert.equal(beatAt(8,regular,120,0),16);
assert.ok(!rhythmDiagnostics(regular,new Array(1500).fill(1),new Array(1500).fill(.2),100,15).some(a=>a.kind==='tempo'));
console.log('OK: avisos de silencio, pulso débil y cambio de tempo; el conteo no se reinicia al salir del corte.');
