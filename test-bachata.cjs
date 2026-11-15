const assert=require('node:assert/strict');
const D=require('./bachata-data.js');
for(const first of ['left','right']){
 const frames=Array.from({length:8},(_,i)=>D.frame(i+1,first));
 assert.deepEqual(frames.filter(f=>f.tap).map(f=>f.count),[4,8]);
 assert.equal(frames.filter(f=>f.weight).length,6);
 assert.equal(frames[3].weight,null);assert.equal(frames[7].weight,null);
 assert.equal(frames[3].foot,frames[4].foot,'El pie que toca en 4 apoya en 5');
 assert.equal(frames[7].foot,frames[0].foot,'El pie que toca en 8 apoya en 1');
 for(let i=1;i<=8;i++)assert.notEqual(D.frame(i,'left').foot,D.frame(i,'right').foot);
}
for(const v of Object.values(D.variants))for(const source of v.sources)assert.ok(D.sources[source]?.url.startsWith('https://'));
console.log('OK: bachata, seis apoyos y dos toques sin transferencia; continuidad 4→5 y 8→1, oposición y fuentes por variante.');
