const figures=require('./lesson-data.js').figures;
const steps={'clave-dance':'dance footwork clave rhythm',side:'side basic step',basic:'basic step forward back', 'basic-place':'basic step in place',suzy:'Suzy Q',strong:'basic step',conga:'conga footwork',sync:'syncopated footwork'};
function query(step,timing){
 const figure=figures.find(f=>f.id===step),term=figure?.query||steps[step];
 if(!term||!['on1','on2','power2','casino','son'].includes(timing)||(figure&&((figure.family==='casino')!==(['casino','son'].includes(timing)))))throw Error('Paso o estilo no admitido');
 return `salsa ${term} ${({casino:'cubana casino',son:'son cubano contratiempo 2 3 4',power2:'Power2 Palladium 2 3 4'}[timing]||timing)} tutorial demonstration`;
}
async function search({step,timing,exclude=[],pageToken=''},key,fetcher=fetch){
 const q=query(step,timing);
 if(!key){const result=await publicSearch(q,exclude,fetcher);result.videos=result.videos.filter(v=>matchesTopic(v.title,step,timing));return result;}
 const url=new URL('https://www.googleapis.com/youtube/v3/search');
 url.search=new URLSearchParams({part:'snippet',type:'video',videoEmbeddable:'true',videoSyndicated:'true',maxResults:'25',q,key,...(pageToken?{pageToken}: {})});
 const response=await fetcher(url,{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error(response.status===403?'YouTube rechazÃ³ la clave o se agotÃ³ la cuota de bÃºsqueda.':'No se pudo consultar YouTube.');
 const result=await response.json();
 const videos=(result.items||[]).filter(x=>/^[\w-]{11}$/.test(x.id?.videoId)&&!exclude.includes(x.id.videoId)).map(x=>({video:x.id.videoId,title:x.snippet.title,author:x.snippet.channelTitle}));
 return {videos:videos.filter(v=>matchesTopic(v.title,step,timing)),nextPageToken:result.nextPageToken||'',query:q};
}
function matchesTopic(title,step,timing){
 const t=title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const rules={'clave-dance':/clave|steps with the key/,basic:/basic|basico|fundament/, 'basic-place':/in place|en el sitio|on place/,side:/side|lateral/,suzy:/su[sz][iy]e?\s*q/,sync:/syncop|sincop/,strong:/basic|basico|beat|tiempo/,conga:/conga|tumbao/,'right-turn':/right|derecha/,'left-turn':/left|izquierda/,'cross-body':/cross.?body/,'inside-turn':/inside|interior/,'outside-turn':/outside|exterior/,'open-break':/open.?break|apertura/,copa:/copa/,hammerlock:/hammerlock/,'reverse-cross-body':/reverse.*cross|cross.*reverse/,'change-place':/change.*place|cambio.*lugar/,'new-york-walk':/new.?york.?walk/,'hook-turn':/hook|gancho/,guapea:/guapea/,'dile-que-no':/dile.*que.*no/,enchufla:/enchuf/,vacilala:/vacila/,sombrero:/sombrero/,setenta:/setenta|70/};
 if(!rules[step]?.test(t))return false;
 if(timing==='on2'&&/on\s*1|on-1/.test(t)&&!/on\s*2|on-2/.test(t))return false;
 if(timing==='on1'&&/on\s*2|on-2/.test(t)&&!/on\s*1|on-1/.test(t))return false;
 if(timing==='power2'&&!/power.?2|palladium|234|2.?3.?4/.test(t))return false;
 if(timing==='son'&&!/son|contratiempo/.test(t))return false;
 return true;
}
function parsePublic(html,exclude=[]){
 const match=html.match(/(?:var ytInitialData|window\["ytInitialData"\]|ytInitialData)\s*=\s*(\{.*?\});<\/script>/s);
 if(!match)throw Error('YouTube no devolvió resultados públicos utilizables. Intenta de nuevo o conecta la API opcional.');
 let data;try{data=JSON.parse(match[1])}catch{throw Error('No se pudo leer la respuesta de búsqueda de YouTube.')}
 const videos=new Map(),text=x=>x?.simpleText||x?.runs?.map(r=>r.text).join('')||'';
 function walk(node){if(!node||typeof node!=='object')return;if(node.videoRenderer){const v=node.videoRenderer;if(/^[\w-]{11}$/.test(v.videoId)&&!exclude.includes(v.videoId))videos.set(v.videoId,{video:v.videoId,title:text(v.title),author:text(v.ownerText)||text(v.longBylineText)||'YouTube'})}for(const v of Object.values(node))if(v&&typeof v==='object')walk(v)}
 walk(data);return [...videos.values()];
}
async function publicSearch(q,exclude,fetcher){
 const url=new URL('https://www.youtube.com/results');url.searchParams.set('search_query',q);url.searchParams.set('hl','es');
 const response=await fetcher(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'Mozilla/5.0','Accept-Language':'es,en;q=0.8'}});
 if(!response.ok)throw Error('YouTube no está disponible para la búsqueda. Intenta de nuevo.');
 return {videos:parsePublic(await response.text(),exclude),nextPageToken:'',query:q,provider:'youtube-public'};
}
module.exports={query,search,parsePublic,matchesTopic};
