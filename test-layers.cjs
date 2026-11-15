const assert=require('node:assert/strict'),L=require('./salsa-layers.js'),d=require('./practice-data.js'),s=require('./instrument-samples.js'),e=require('./evidence-data.js');
L.install(d.patterns);e.apply(d,L);const layers=L.layers;
assert.deepEqual(layers.map(l=>l.id),['strong','son23','open','open23']);
for(const l of layers){assert(d.patterns[l.id]);assert(l.when&&l.note&&l.sound);assert(d.patterns[l.id].hits.every(v=>Number.isInteger(v)&&v>=0&&v<16));assert(s.files.includes(s.voice(l.id,0)));assert(e.sounds[l.id].source);}
assert(!s.files.includes('voice-lead'));assert(!s.files.includes('shaker'));assert.deepEqual(d.events('on2','son23','basic'),[0,2,4,8,10,12]);console.log('Capas activas: fuentes musicales y grabaciones disponibles; sin timbres sustitutos ni voces sintéticas.');
