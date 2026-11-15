const assert=require('node:assert/strict');const d=require('./lesson-data.js');
assert(d.clips.every(d.valid));assert.equal(new Set(d.clips.map(c=>c.id)).size,d.clips.length);
assert(d.filter(d.clips,'basic','on1').length>0);assert(d.filter(d.clips,'suzy','on2').length>0);
assert.equal(d.filter(d.clips,'sync','all').length,0);assert(!d.valid({...d.clips[0],end:0}));assert(!d.valid({...d.clips[0],start:-1}));assert(!d.valid({...d.clips[0],video:'invalid'}));assert(!d.valid({...d.clips[0],categories:['fake']}));
assert(d.filter(d.clips,'all','all','rivera').length>1);console.log('Videoteca: filtros, fuentes y límites válidos.');

const current=d.clips.find(c=>c.id==='on2-count');const seen=new Set([current.video]);
for(let i=0;i<10;i++){const n=d.next(d.clips,current,seen,()=>0);assert(n);assert.notEqual(n.video,current.video);assert.equal(n.timing,current.timing);assert.equal(d.branch(n),d.branch(current));}
assert.equal(d.next(d.clips,d.clips[0],new Set()),null);
assert.equal(d.next(d.clips,d.clips.find(c=>c.id==='rivera-suzy'),new Set()),null);
assert.equal(d.next(d.clips,d.clips.find(c=>c.id==='rivera-place'),new Set()),null);
console.log('Otro ejemplo conserva paso y estilo, cambia de video y no salta de rama si no hay alternativas.');
