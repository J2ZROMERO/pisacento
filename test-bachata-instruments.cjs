const assert=require('node:assert/strict'),D=require('./bachata-instruments.js');
assert.equal(Object.keys(D.instruments).length,5);
assert.equal(new Set(Object.values(D.instruments).map(i=>i.track)).size,5);
assert.deepEqual(D.slots('bass'),[0,3,4,6,8,11,12,14]);
assert.deepEqual(D.slots('guira'),Array.from({length:16},(_,i)=>i));
assert.equal(D.slots('requinto'),null,'No inventar patrón fijo para el requinto');
for(const i of Object.values(D.instruments)){
 assert.ok(Number.isSafeInteger(i.track));assert.match(D.playerUrl(i.track),/^https:\/\/bandcamp.com\/EmbeddedPlayer\/album=78863703\//);
 assert.ok(!('sampleFile' in i),'Solo streaming oficial, sin sustituir timbres');
 if(i.countTrack){assert.ok(i.countSlug);assert.notEqual(i.countTrack,i.track)}
}
console.log('OK: cinco instrumentos, pistas originales distintas, conteos alternativos, rejilla de derecho y requinto sin patrón inventado.');
