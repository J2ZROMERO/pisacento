const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const E=require('./evidence-data.js'),D=require('./practice-data.js'),L=require('./salsa-layers.js');
L.install(D.patterns);E.apply(D,L);
assert.deepEqual(Object.keys(D.patterns).sort(),['open','open23','pulse','rumba23','rumba32','son23','son32','strong']);
assert.equal(D.patterns.piano,undefined);assert.equal(D.patterns.voicelead,undefined);assert.equal(D.patterns.timbales,undefined);
const manifest=require('./samples/manifest.json');for(const entry of Object.values(E.sounds)){assert.match(entry.source,/^https:/);assert(entry.scope);if(entry.sample){const record=manifest.find(x=>x.file===entry.sample);assert(record);assert.equal(record.license,'CC0-1.0');assert.equal(crypto.createHash('sha256').update(fs.readFileSync('samples/'+entry.sample)).digest('hex'),record.sha256)}}
for(const id of L.layers.map(l=>l.id))assert(E.sounds[id]);
assert.deepEqual(D.events('on1','son23','basic'),[0,2,4,8,10,12]);assert.deepEqual(D.events('on2','son23','basic'),[0,2,4,8,10,12]);
console.log('Evidencia: lista musical cerrada, fuentes presentes, muestras originales verificadas por SHA-256 y básicos documentados.');

assert.deepEqual(D.patterns.open23.hits,[6,7,14]);assert(!D.patterns.open23.hits.includes(15));assert.equal(require('./instrument-samples.js').voice('open23',14),'conga-open');
