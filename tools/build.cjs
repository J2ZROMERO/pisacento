const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
if(out!==path.join(root,'dist'))throw Error('Invalid build target');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'public'),out,{recursive:true});
const result=spawnSync(process.execPath,[require.resolve('typescript/bin/tsc'),'-p',path.join(root,'tsconfig.json')],{stdio:'inherit'});
if(result.status!==0)process.exit(result.status||1);
for(const entry of JSON.parse(fs.readFileSync(path.join(out,'samples/manifest.json'),'utf8'))){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(out,'samples',entry.file))).digest('hex');
 if(entry.license!=='CC0-1.0'||hash!==entry.sha256)throw Error('Invalid audio asset: '+entry.file);
}
const id=process.env.GA4_MEASUREMENT_ID||'';
if(id&&!/^G-[A-Z0-9]+$/.test(id))throw Error('Invalid GA4_MEASUREMENT_ID');
fs.writeFileSync(path.join(out,'analytics-config.js'),'window.PisacentoAnalyticsConfig = '+JSON.stringify({measurementId:id})+';\n');
fs.writeFileSync(path.join(out,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Built salsa app in dist/ from TypeScript and public assets.');
