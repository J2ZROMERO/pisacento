const assert=require('node:assert/strict'),L=require('../dist/js/foot-count-labels.js');
for(let i=1;i<=8;i++){
 const value=String(i),swapped=L.swapLabel(value,true);
 assert.equal(Number(swapped),(i+3)%8+1);
 assert.equal(L.swapLabel(swapped,true),value);
 assert.equal(L.swapLabel(value,false),value);
 assert.equal(L.swapLabel(value+' &',true),swapped+' &');
}
assert.equal(L.swapLabel('I',true),'I');assert.equal(L.swapLabel('D',true),'D');
const fs=require('node:fs'),source=fs.readFileSync('dist/js/rhythm-practice.js','utf8');
assert(source.includes('footLabel(other.last.slot)'));assert(source.includes('footLabel(f.last.slot)'));
assert(source.includes('label(f.sub)'),'Action text keeps actual musical count');
console.log('OK: foot-only half-cycle labels, reversible, subdivision preserved; physical foot labels and action counts unchanged.');
