const assert=require('node:assert/strict');
const {frame}=require('./footwork.js');
assert.equal(frame(0,'on1','basic').positions.left,'front');
assert.equal(frame(8,'on1','basic').positions.right,'back');
assert.equal(frame(2,'on2','basic').positions.right,'back');
assert.equal(frame(10,'on2','basic').positions.left,'front');
assert.equal(frame(6,'on1','basic').newStep,false);
assert.equal(frame(1,'on1','sync').sync,true);
assert.equal(frame(3,'on2','sync').sync,true);
assert.equal(frame(0,'on1','basic').sync,false);
console.log('OK: pies On1/On2, direcciones, pausas y síncopas.');

assert.equal(frame(4,'on1','basic').active,true);
assert.equal(frame(5,'on1','basic').active,true);
assert.equal(frame(5,'on1','basic').foot,'left');
assert.equal(frame(5,'on2','basic').positions.left,'center');
assert.equal(frame(6,'on2','basic').active,false);
assert.equal(frame(7,'on2','basic').active,false);
assert.equal(frame(1,'on1','sync').foot,'right');
assert.equal(frame(2,'on1','sync').foot,'left');
console.log('OK: el 3 permanece visible todo el tiempo; 4 sostiene sin nueva pisada; síncopas alternan pies.');

for(const style of ['on1','on2'])for(const sub of [0,1,4,5,8,9,12,13]){const f=frame(sub,style,'basic',true);assert.equal(f.positions[f.foot],'center')}
assert.equal(frame(2,'on2','basic',true).direction,'back');
assert.equal(frame(10,'on2','basic',true).direction,'front');
console.log('OK: ejercicio de campana 1/3/5/7 en línea media, conservando desplazamientos en 2 y 6 On2.');

for(const style of ['on1','on2'])for(const type of ['basic','side','suzy','sync'])for(const center of [true,false]){
 for(let sub=1;sub<16;sub++){const before=frame(sub-1,style,type,center),after=frame(sub,style,type,center);const changed=['left','right'].filter(side=>before.positions[side]!==after.positions[side]);assert.ok(changed.length<=1,`${style}/${type}/${center}, sub ${sub}: ambos pies cambiaron`);if(changed.length)assert.equal(changed[0],after.foot)}}
assert.equal(frame(2,'on2','basic',true).positions.left,'center');
assert.equal(frame(10,'on2','basic',true).positions.right,'center');
assert.equal(frame(6,'on2','basic',true).positions.right,'back');
assert.equal(frame(14,'on2','basic',true).positions.left,'front');
console.log('OK: solo se desplaza el pie correspondiente; el otro conserva su posición, incluso en 4 y 8.');
