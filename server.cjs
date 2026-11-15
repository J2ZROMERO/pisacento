const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawn}=require('node:child_process');
const root=__dirname,port=Number(process.env.PORT||4318),cache=path.join(root,'analysis-cache');
const types={'.wav':'audio/wav','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
function configuration(){try{return JSON.parse(fs.readFileSync(path.join(root,'analyzer-config.json'),'utf8'))}catch{return {model:'final0'}}}
function reply(res,code,data){if(res.destroyed)return;res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))}
let active=false;
let youtubeSearchKey=process.env.YOUTUBE_API_KEY||'';
const videoSearch=require('./video-search.cjs');
async function smallJson(req){let body='';for await(const chunk of req){body+=chunk;if(body.length>20000)throw Error('Solicitud demasiado grande')}return JSON.parse(body||'{}')}

async function analyze(req,res){
 const model=configuration().model==='small0'?'small0':'final0';
 const python=path.join(root,'.venv','Scripts','python.exe');
 if(!fs.existsSync(python)||!fs.existsSync(path.join(root,'models',model+'.ckpt')))return reply(res,503,{error:'Motor especializado no instalado'});
 if(!(req.headers['content-type']||'').startsWith('application/octet-stream'))return reply(res,415,{error:'Se requiere audio PCM float32 mono a 11025 Hz'});
 if(Number(req.headers['content-length']||0)>85*1024*1024)return reply(res,413,{error:'Archivo de audio demasiado grande'});
 const chunks=[];let size=0;
 for await(const chunk of req){size+=chunk.length;if(size>85*1024*1024){reply(res,413,{error:'Audio demasiado grande'});return}chunks.push(chunk)}
 const audio=Buffer.concat(chunks);if(size<11025*4*8||size%4)return reply(res,400,{error:'Usa al menos ocho segundos de audio'});
 const key=crypto.createHash('sha256').update('hybrid-plp-beat-this-1.1.0-v3-'+model).update(audio).digest('hex');fs.mkdirSync(cache,{recursive:true});
 const resultPath=path.join(cache,key+'.json'),input=path.join(cache,key+'.f32');
 if(fs.existsSync(resultPath)){try{return reply(res,200,{...JSON.parse(fs.readFileSync(resultPath,'utf8')),cached:true})}catch{}}
 if(active)return reply(res,503,{error:'El analizador está ocupado. Intenta de nuevo al terminar la otra canción.'});
 active=true;fs.writeFileSync(input,audio);
 const child=spawn(python,[path.join(root,'local_analyzer.py'),'--input',input,'--model',model],{cwd:root,windowsHide:true,env:{...process.env,NUMBA_CACHE_DIR:path.join(root,'.numba-cache'),TORCH_HOME:path.join(root,'models')}});
 let out='',err='',ended=false;const timer=setTimeout(()=>{child.kill();reply(res,504,{error:'El análisis excedió cinco minutos. Prueba un fragmento más corto.'})},300000);
 child.stdout.on('data',data=>{out+=data;if(out.length>5e6)child.kill()});child.stderr.on('data',data=>{err=(err+data).slice(-3000)});
 function cleanup(){if(ended)return;ended=true;active=false;clearTimeout(timer);fs.unlink(input,()=>{})}
 child.on('error',e=>{cleanup();reply(res,500,{error:'No se pudo iniciar el motor: '+e.message})});
 child.on('close',code=>{cleanup();try{const result=JSON.parse(out.trim());if(code!==0||!result.ok)return reply(res,500,{error:result.error||'El motor no completó el análisis'});fs.writeFileSync(resultPath,JSON.stringify(result));reply(res,200,{...result,cached:false})}catch{reply(res,500,{error:'El motor no devolvió un resultado válido',detail:err.slice(-500)})}});
 res.on('close',()=>{if(!res.writableEnded){child.kill();cleanup()}});
}
http.createServer(async(req,res)=>{
 const host=req.headers.host||'';if(!new RegExp('^(127\\.0\\.0\\.1|localhost):'+port+'$').test(host)){res.writeHead(403).end();return}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 if(pathname.startsWith('/api/')){
  const origin=req.headers.origin;if(origin&&!['http://127.0.0.1:'+port,'http://localhost:'+port].includes(origin))return reply(res,403,{error:'Origen no permitido'});
  if(pathname==='/api/video-search/config'){
   if(req.method==='GET')return reply(res,200,{ready:!!youtubeSearchKey});
   if(req.method==='POST'){try{const body=await smallJson(req);if(typeof body.key!=='string'||body.key.length<20||body.key.length>200)return reply(res,400,{error:'Clave no válida'});youtubeSearchKey=body.key.trim();return reply(res,200,{ready:true})}catch{return reply(res,400,{error:'Configuración no válida'})}}
  }
  if(pathname==='/api/video-search'&&req.method==='POST'){
   try{const body=await smallJson(req);if(!Array.isArray(body.exclude)||body.exclude.length>500||typeof body.pageToken!=='string'||body.pageToken.length>500)return reply(res,400,{error:'Parámetros no válidos'});videoSearch.query(body.step,body.timing);return reply(res,200,await videoSearch.search(body,youtubeSearchKey))}catch(e){return reply(res,400,{error:e.message})}
  }
  if(pathname==='/api/health'&&req.method==='GET'){const cfg=configuration();return reply(res,200,{engine:'librosa PLP + Beat This!',model:cfg.model||'final0',ready:fs.existsSync(path.join(root,'models',(cfg.model||'final0')+'.ckpt')),scope:'full_audio'})}
  if(pathname==='/api/analyze'&&req.method==='POST'){try{await analyze(req,res)}catch(e){active=false;reply(res,500,{error:e.message})}return}
  return reply(res,404,{error:'Ruta no encontrada'});
 }
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)||!types[path.extname(file)]){res.writeHead(403).end();return}
 fs.readFile(file,(e,data)=>{if(e){res.writeHead(404).end('No encontrado');return}res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data)})
}).listen(port,'127.0.0.1',()=>console.log('Pisacento listo en http://127.0.0.1:'+port));
