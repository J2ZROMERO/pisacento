const assert=require('node:assert/strict'),d=require('./practice-data.js');
assert.deepEqual(d.events('on2','son23','basic'),[0,2,4,8,10,12]);
assert.deepEqual(d.events('power2','son23','basic'),[2,4,6,10,12,14]);
assert.deepEqual(d.events('on1','son23','mark'),[2,4,8,11,14]);
assert.deepEqual(d.patterns.rumba32.hits,[0,3,7,10,12]);
assert.equal(d.frame(2,'on2','slap','basic').last.foot,'right');
assert.equal(d.frame(2,'on2','slap','basic').last.direction,'back');
assert.equal(d.frame(2,'on2','slap','basic','follow').last.direction,'front');
assert.equal(d.frame(1,'on1','offbeat','sync').sync,true);
assert.equal(d.frame(2,'on1','son23','mark').last.foot,'left');
assert.equal(d.frame(18,'on1','son23','mark').last.foot,'right');
const f=d.frame(8,'on1','strong','basic'),g=d.frame(10,'on1','strong','basic');assert.equal(f.positions.right,g.positions.right);assert.equal(g.positions.left,'center');
for(const k of Object.keys(d.patterns))assert(d.patterns[k].hits.every(s=>s>=0&&s<16));
console.log('Práctica: On1/ET2/Power2, orientación, síncopa, clave de cinco golpes y pie de apoyo correctos.');
for(const role of ['lead','follow'])for(const style of ['on1','on2']){const times=[0,2,4,8,10,12];assert.deepEqual(times.map(s=>d.frame(s,style,'strong','basic',role).last.foot),role==='lead'?['left','right','left','right','left','right']:['right','left','right','left','right','left']);assert.equal(d.events(style,'strong','basic').length,6)}
assert.deepEqual(d.styles.on2.breaks,[2,10]);assert.deepEqual(d.styles.on1.breaks,[0,8]);

for(const sub of [0,4,8,12])assert.equal(d.frame(sub,'on2','strong','basic').last.direction,'center');
assert.equal(d.frame(2,'on2','strong','basic','follow').last.foot,'left');
assert.equal(d.frame(2,'on2','strong','basic','follow').last.direction,'front');
assert.equal(d.frame(10,'on2','strong','basic','follow').last.foot,'right');
assert.equal(d.frame(10,'on2','strong','basic','follow').last.direction,'back');
console.log('On2 compacto: 1/3/5/7 al centro; follower cambia pie y orientación.');
for(const style of Object.keys(d.styles))for(const role of ['lead','follow']){const slots=d.events(style,'strong','basic');for(const sub of slots){const solo=d.sessionFrame(sub,style,'strong','basic',role,'solo'),pair=d.sessionFrame(sub,style,'strong','basic',role,'partner');assert.equal(solo.partner,null);assert.deepEqual(solo.own,pair.own);assert.notEqual(pair.own.last.foot,pair.partner.last.foot);assert.equal(pair.own.last.at,pair.partner.last.at);}}
assert.equal(d.sessionFrame(2,'on2','strong','basic','follow','partner').own.last.foot,'left');assert.equal(d.sessionFrame(2,'on2','strong','basic','follow','partner').own.last.direction,'front');console.log('Individual/pareja: mismos tiempos, rol aplicado y comparación complementaria verificados.');
