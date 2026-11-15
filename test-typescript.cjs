const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const browser={};const context=vm.createContext({window:browser});
for(const file of ['beat-timeline','footwork','bachata-data','bachata-instrument-data']){
 const code=fs.readFileSync(file+'.js','utf8');
 assert.match(code,/GENERATED from src\//);
 vm.runInContext(code,context,{filename:file+'.js'});
}
assert.equal(browser.CompasBachata.frame(4).weight,null);
assert.equal(browser.CompasBachata.frame(5).foot,'right');
assert.equal(browser.CompasTimeline.timeAt(2,null,120,1),2);
assert.equal(browser.CompasFeet.frame(0,'on1','basic').foot,'left');
assert.equal(browser.CompasBachataInstruments.instruments.guira.track,1978066535);
const html=fs.readFileSync('index.html','utf8');
for(const module of ['bachata-data','bachata-instrument-data','bachata-instrument-ui','musician-perspective','video-library'])assert(!html.includes('<script src="'+module+'.js"></script>'),'Salsa-only page must not initialize '+module);
for(const [,url] of html.matchAll(/<script src="([^"]+)"/g))assert(fs.existsSync(url),url+' missing');
console.log('OK: compiled TypeScript runs as browser scripts without CommonJS; API contracts and script assets present.');
