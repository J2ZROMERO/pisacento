const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('selection-analytics.js','utf8');
function boot(id,hostname){const listeners={},scripts=[],nodes={rpStyle:{value:'on2'},rpMode:{value:'solo'},rpRole:{value:'lead'},learningTitle:{textContent:'Pisa el básico'}};const queued=[];class Element{};const window={PisacentoAnalyticsConfig:{measurementId:id}};const document={head:{append:s=>scripts.push(s)},createElement:()=>({}),getElementById:id=>nodes[id],addEventListener:(type,fn)=>listeners[type]=fn,querySelector:()=>({getAttribute:()=> 'true'})};vm.runInNewContext(source,{window,document,location:{hostname,origin:'https://example.pages.dev',pathname:'/'},Date,Element,encodeURIComponent,queueMicrotask:fn=>queued.push(fn)});return {window,listeners,scripts,nodes,queued,Element}}
assert.equal(boot('', 'example.pages.dev').scripts.length,0);
assert.equal(boot('G-TEST123','127.0.0.1').scripts.length,0);
const app=boot('G-TEST123','example.pages.dev');assert.equal(app.scripts.length,1);
app.listeners.change({isTrusted:false,target:{id:'rpStyle',value:'on1'}});assert.equal(app.window.dataLayer.length,2);
app.listeners.change({isTrusted:true,target:{id:'rpStyle',value:'on1'}});assert.equal(app.window.dataLayer.at(-1)[2].selection_value,'on1');
const target=new app.Element();const button={id:'',dataset:{instrument:'strong'},closest:()=>null};target.closest=()=>button;app.listeners.click({isTrusted:true,target});app.queued.shift()();assert.equal(app.window.dataLayer.at(-1)[2].enabled,'on');
button.dataset={};button.closest=()=>({});app.listeners.click({isTrusted:true,target});button.closest=()=>null;app.queued.shift()();assert.equal(app.window.dataLayer.at(-1)[2].selection_value,'Pisa el básico');
console.log('PASS: disabled/unconfigured and localhost, explicit selections, post-render exercise and instrument events.');
