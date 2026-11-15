const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const styles=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m=>m[1]);
const files=new Set(['index.html',...scripts,...styles,'analysis-worker.js','assets/pisacento-mark.svg','samples/VCSL-LICENSE.txt']);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'samples/manifest.json'),'utf8'));
const active=['clave.wav','cowbell.wav','conga-open.wav'];
const approved=active.map(file=>{
 const entry=manifest.find(s=>s.file===file);if(!entry||entry.license!=='CC0-1.0')throw Error('Unapproved public asset: '+file);
 const bytes=fs.readFileSync(path.join(root,'samples',file));
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==entry.sha256)throw Error('Sample integrity failure: '+file);
 files.add('samples/'+file);return entry;
});
for(const file of files){
 const source=path.join(root,file),target=path.join(out,file);fs.mkdirSync(path.dirname(target),{recursive:true});
 let bytes=fs.readFileSync(source);
 if(file.endsWith('.js'))bytes=Buffer.from(bytes.toString('utf8').replace(/^\/\/# sourceMappingURL=.*$/gm,''));
 fs.writeFileSync(target,bytes);
}
// A GA4 Measurement ID is public configuration, never a secret credential.
const analyticsId=process.env.GA4_MEASUREMENT_ID;
if(analyticsId){
 if(!/^G-[A-Z0-9]+$/.test(analyticsId))throw Error('GA4_MEASUREMENT_ID must look like G-ABC123.');
 fs.writeFileSync(path.join(out,'analytics-config.js'),'window.PisacentoAnalyticsConfig = '+JSON.stringify({measurementId:analyticsId})+';\n');
}
fs.writeFileSync(path.join(out,'samples/manifest.json'),JSON.stringify(approved,null,2));
fs.writeFileSync(path.join(out,'ASSET_CREDITS.txt'),'Pisacento: local vector mark and teaching UI prepared in this project.\nActive audio: Versilian Community Sample Library / Versilian Studios, CC0 1.0.\nSource: https://github.com/sgossner/VCSL\nSee samples/manifest.json and samples/VCSL-LICENSE.txt.\n');
fs.writeFileSync(path.join(out,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
const expected=new Set([...files,'samples/manifest.json','ASSET_CREDITS.txt','_headers']);
function verify(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())verify(full);else {const rel=path.relative(out,full).replaceAll('\\','/');if(!expected.has(rel))throw Error('Unexpected stale dist file; inspect before publishing: '+rel);if(fs.statSync(full).size>=25*1024*1024)throw Error('Asset exceeds 25 MiB: '+rel)}}}
verify(out);
console.log('Cloudflare static package: dist/ · '+expected.size+' files · only three verified CC0 samples. No server or model binaries.');
