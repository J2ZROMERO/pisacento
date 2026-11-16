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
// Manual Web Analytics installation; use instead of Pages automatic injection.
// This is the public site token from the JS snippet, never an API key.
const cfToken=process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN||'';
if(cfToken){
 if(!/^[a-f0-9]{32}$/i.test(cfToken))throw Error('CLOUDFLARE_WEB_ANALYTICS_TOKEN must be the 32-character public site token from JS Snippet installation, not an API key.');
 const page=path.join(out,'index.html');
 const beacon=`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({token:cfToken})}'></script>`;
 fs.writeFileSync(page,fs.readFileSync(page,'utf8').replace('</body>',beacon+'</body>'));
 console.log('Cloudflare Web Analytics: public beacon included.');
}else console.log('Cloudflare Web Analytics: use Pages automatic injection, or configure CLOUDFLARE_WEB_ANALYTICS_TOKEN.');
fs.writeFileSync(path.join(out,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Built salsa app in dist/ from TypeScript and public assets.');
