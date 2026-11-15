const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const origin='http://127.0.0.1:4318';const health=await(await fetch(origin+'/api/health')).json();assert.equal(health.ready,true);assert.equal(health.model,'final0');
 const denied=await fetch(origin+'/api/analyze',{method:'POST',headers:{Origin:'https://example.com','Content-Type':'application/octet-stream'},body:new Uint8Array(64)});assert.equal(denied.status,403);
 const bad=await fetch(origin+'/api/analyze',{method:'POST',headers:{'Content-Type':'text/plain'},body:'test'});assert.equal(bad.status,415);
 const result=await(await fetch(origin+'/api/analyze',{method:'POST',headers:{'Content-Type':'application/octet-stream'},body:fs.readFileSync('benchmark/input.f32')})).json();assert.equal(result.ok,true);assert.equal(result.cached,true);assert.ok(result.engine.includes('librosa PLP'));assert.ok(result.beats.length>100);assert.ok(result.downbeats.length>1);assert.equal(result.periodicity,null);assert.equal(result.danceCycleVerified,false);
 console.log('OK: motor híbrido, resultado real cacheado, pulsos/compases, origen externo rechazado y formato validado.');
})().catch(e=>{console.error(e);process.exit(1)});
