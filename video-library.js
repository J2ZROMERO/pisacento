(() => {
const D=CompasLessons, el=id=>document.getElementById(id), key='compas-lessons-v1';
let custom=[];try{custom=JSON.parse(localStorage.getItem(key)||'[]').filter(D.valid)}catch{}
const seen=new Set();
let searchReady=false;const searchPages=new Map(), internetSeen=new Set(allVideoIds());
function allVideoIds(){return [...D.clips,...custom].map(c=>c.video)}
fetch('/api/video-search/config').then(r=>r.json()).then(c=>{searchReady=!!c.ready;el('lessonSearchConnection').textContent=searchReady?'Buscador conectado.':'Búsqueda pública activada: los videos se cargan aquí, sin abrir pestañas.'}).catch(()=>{});
let category='all', selected=null, player=null, ready=false, loading=null, generation=0;
const all=()=>[...D.clips,...custom], matches=()=>D.filter(all(),category,el('lessonTiming').value,el('lessonSearch').value);
const stamp=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
function message(s){el('lessonStatus').textContent=s}
function select(c){if(player&&ready)player.pauseVideo();selected=c;seen.add(c.video);generation++;el('lessonTitle').textContent=c.title;el('lessonAuthor').textContent=`${c.author} · ${c.timing.toUpperCase()} · ${c.internet?'Video encontrado en internet · sin recorte verificado':stamp(c.start)+'–'+stamp(c.end)}`;el('lessonHint').textContent=c.hint;el('lessonSource').href=`https://www.youtube.com/watch?v=${c.video}&t=${c.start}s`;el('lessonPlaceholder').hidden=false;el('lessonPlaceholder').textContent='Pulsa «Ver fragmento» para cargar este ejemplo.';message('');updateBranch();renderList()}
function updateBranch(){
 const options=D.alternatives(all(),selected), count=new Set(options.map(c=>c.video)).size;
 el('lessonNext').disabled=!selected;
 el('lessonNext').textContent='Otro video del mismo paso';
 if(!selected)return;
 const name=D.figures.find(f=>f.id===D.branch(selected))?.name || ({'clave-dance':'Baile sobre clave',side:'Lateral',sync:'Síncopa',basic:'Básico',suzy:'Suzy Q'}[D.branch(selected)]) || (D.branch(selected)==='basic'?'Básico':D.branch(selected)==='basic-place'?'Básico en el sitio':D.categories[D.branch(selected)]||D.branch(selected));
 el('lessonNext').title=`Buscar en internet: ${name} ${selected.timing.toUpperCase()}`;
 el('lessonLoop').disabled=!!selected.internet;
 el('lessonFind').href=`https://www.youtube.com/results?search_query=${encodeURIComponent('salsa '+name+' '+selected.timing+' tutorial demostración')}`;
 message(`Búsqueda fija: ${name} ${selected.timing.toUpperCase()}. El siguiente resultado vendrá de internet, no de esta lista.`);
}
function chooseFigure(f){
 if(ready)player.pauseVideo();generation++;
 const timing=f.family==='casino'?'casino':(window.compasLearningStyle||el('figureTiming').value);
 selected={id:'figure-'+f.id,step:f.id,timing,categories:['basic'],video:'',internet:true};
 el('figureSelection').textContent=`Figura seleccionada: ${f.name} · ${timing==='casino'?'Casino':timing.toUpperCase()}`;
 updateBranch();renderList();el('lessonNext').onclick();
}
const listGroupsOpen=new Map();
function renderList(){
 const list=el('lessonList');list.replaceChildren();
 const query=el('lessonSearch').value.toLocaleLowerCase();
 function group(key,title,count){
  const details=document.createElement('details');details.className='lesson-option-group';
  details.open=!!query||(listGroupsOpen.get(key)??(key==='steps'));
  const summary=document.createElement('summary');summary.textContent=`${title} (${count})`;details.append(summary);
  const body=document.createElement('div');body.className='lesson-option-items';details.append(body);
  details.ontoggle=()=>{if(!query)listGroupsOpen.set(key,details.open)};list.append(details);return body;
 }
 const clips=matches(), examples=group('steps','Pasos y ejemplos',clips.length);
 for(const c of clips){const b=document.createElement('button');b.type='button';b.textContent=c.title;b.setAttribute('aria-pressed',String(c.id===selected?.id));b.onclick=()=>{el('figureSelection').textContent='Paso seleccionado: '+c.title;select(c)};examples.append(b)}
 for(const family of (window.compasLearningStyle?['lineal']:['lineal','casino'])){
 const figures=D.figures.filter(f=>f.family===family&&f.name.toLocaleLowerCase().includes(query));
 if(!figures.length)continue;
 const body=group(family,family==='lineal'?'Figuras en línea · On1 / On2':'Figuras cubanas · Casino',figures.length);
 for(const f of figures){const b=document.createElement('button');b.type='button';b.dataset.figure=f.id;b.textContent=`${f.name} · ${f.level}`;b.setAttribute('aria-pressed',String(selected?.step===f.id));b.onclick=()=>chooseFigure(f);body.append(b)}
 }
}
function refresh(){const list=matches();el('lessonTotal').textContent=`${list.length} fragmentos · ${new Set(list.map(c=>c.author)).size} autores · catálogo local`;el('lessonFind').href=`https://www.youtube.com/results?search_query=${encodeURIComponent('salsa '+(category==='all'?'pasos':D.categories[category])+' '+(el('lessonTiming').value==='all'?'':el('lessonTiming').value)+' tutorial demostración')}`;el('lessonNext').disabled=list.length<2;el('lessonPlay').disabled=el('lessonRepeat').disabled=!list.length;
if(!list.length){selected=null;generation++;if(ready)player.pauseVideo();el('lessonTitle').textContent='Todavía no hay fragmentos en esta selección';el('lessonAuthor').textContent='';el('lessonHint').textContent='Busca una demostración y añade su inicio y fin debajo. No asignamos etiquetas musicales sin comprobarlas.';el('lessonSource').removeAttribute('href');el('lessonPlaceholder').hidden=false;el('lessonPlaceholder').textContent='Sin ejemplos en este filtro.';message('Puedes añadir un fragmento de congas o síncopas desde «Añadir mi propio fragmento».');renderList()}
else if(!list.some(c=>c.id===selected?.id))select(list[0]);else {updateBranch();renderList()}}
for(const [k,label] of Object.entries(D.categories)){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed',String(k===category));b.onclick=()=>{category=k;for(const other of el('lessonCategories').children)other.setAttribute('aria-pressed',String(other===b));refresh()};el('lessonCategories').append(b)}
async function ensurePlayer(){if(ready)return;if(loading)return loading;loading=(async()=>{await youtubeApi();await new Promise((resolve,reject)=>{player=new YT.Player('lessonPlayer',{height:'360',width:'640',playerVars:{playsinline:1,origin:location.origin},events:{onReady:()=>{ready=true;resolve()},onStateChange:e=>{if(e.data===YT.PlayerState.PLAYING){window.dispatchEvent(new Event('compas:lesson-play'));pause();el('lessonPlaceholder').hidden=true}if(e.data===YT.PlayerState.ENDED)finish()},onError:e=>{message(`YouTube no permite reproducir este ejemplo aquí (código ${e.data}). Abre la fuente para verlo.`);if(!ready)reject(Error('No se pudo preparar el reproductor.'))}}})})})();try{await loading}catch(e){loading=null;throw e}}
let activeId=null;
async function start(){if(!selected)return;const c=selected, token=generation;try{message('Preparando fragmento…');await ensurePlayer();if(token!==generation)return;pause();activeId=c.id;player.loadVideoById({videoId:c.video,startSeconds:c.start,...(c.internet?{}:{endSeconds:c.end})});player.setPlaybackRate(Number(el('lessonRate').value));el('lessonPlaceholder').hidden=true;message(c.internet?'Resultado de internet: revisa que enseñe el paso buscado. Se reproduce el video completo; el fragmento aún no está identificado.':`Fragmento ${stamp(c.start)}–${stamp(c.end)}. Si no comienza, pulsa reproducir en el video.`)}catch(e){message(e.message)}}
function finish(){if(!ready||!selected||activeId!==selected.id||selected.internet)return;if(el('lessonLoop').checked){player.loadVideoById({videoId:selected.video,startSeconds:selected.start,endSeconds:selected.end})}else{player.pauseVideo();message('Fragmento terminado. Repite o elige otro ejemplo.');activeId=null}}
setInterval(()=>{if(ready&&selected&&activeId===selected.id&&player.getPlayerState()===1&&player.getCurrentTime()>=selected.end)finish()},100);
el('lessonPlay').onclick=start;el('lessonRepeat').onclick=start;
el('lessonNext').onclick=async()=>{
 if(!selected)return;
 const original=selected,token=generation,step=D.branch(original),timing=original.timing,branchKey=step+'-'+timing;
 el('lessonNext').disabled=true;message('Buscando otro video en internet del mismo paso y estilo…');
 try{
  let result, videos=[];
  for(let page=0;page<3&&!videos.length;page++){
   const response=await fetch('/api/video-search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({step,timing,exclude:[...new Set([...allVideoIds(),...internetSeen,original.video])].slice(-500),pageToken:searchPages.get(branchKey)||''})});
   result=await response.json();if(!response.ok)throw Error(result.error||'No se pudo buscar');
   searchPages.set(branchKey,result.nextPageToken);videos=result.videos||[];if(!result.nextPageToken)break;
  }
  if(token!==generation)return;
  if(!videos.length){message('No hay nuevos resultados para esta rama. Se conserva el paso seleccionado.');return}
  const v=videos[Math.floor(Math.random()*videos.length)];internetSeen.add(v.video);
  select({...v,id:'internet-'+v.video,start:0,end:null,internet:true,step,timing,categories:original.categories,hint:'Encontrado por búsqueda del mismo paso y estilo. Coincidencia por texto: el movimiento y el minuto exacto todavía no están verificados.'});await start();
 }catch(e){if(token===generation)message(e.message)}finally{el('lessonNext').disabled=!selected}
};
el('lessonSearchConfig').onsubmit=async e=>{e.preventDefault();try{const response=await fetch('/api/video-search/config',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:el('lessonApiKey').value})});const result=await response.json();if(!response.ok)throw Error(result.error);searchReady=true;el('lessonApiKey').value='';el('lessonSearchConnection').textContent='Buscador conectado. Pulsa «Buscar otro video en internet».'}catch(e){el('lessonSearchConnection').textContent=e.message}};
el('lessonTiming').onchange=refresh;el('lessonSearch').oninput=refresh;el('lessonRate').onchange=()=>{if(ready)player.setPlaybackRate(Number(el('lessonRate').value))};window.addEventListener('compas:main-play',()=>{if(ready)player.pauseVideo()});
el('lessonAdd').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);try{const u=new URL(f.get('url'));if(!['youtube.com','www.youtube.com','m.youtube.com','youtu.be'].includes(u.hostname))throw Error('Usa una URL de YouTube.');const video=u.hostname==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v')||u.pathname.split('/')[2];const c={id:'custom-'+Date.now(),video,title:String(f.get('title')).trim(),author:'Añadido por ti',start:Number(f.get('start')),end:Number(f.get('end')),timing:f.get('timing'),categories:[f.get('category')],hint:'Fragmento aportado por ti; límites y categoría definidos manualmente.'};if(!D.valid(c))throw Error('Revisa el enlace y los segundos: el fin debe ser mayor al inicio y el fragmento no debe superar 10 minutos.');const updated=[...custom,c];localStorage.setItem(key,JSON.stringify(updated));custom=updated;category='all';el('lessonTiming').value=window.compasLearningStyle||'all';el('lessonSearch').value='';for(const b of el('lessonCategories').children)b.setAttribute('aria-pressed',String(b.textContent===D.categories.all));refresh();select(c);e.target.reset();message('Fragmento guardado en este navegador.')}catch(err){message(err.message)}};
el('figureTiming').onchange=()=>{const f=D.figures.find(f=>f.id===selected?.step);if(f?.family==='lineal')chooseFigure(f)};
window.addEventListener('compas:learning-route',e=>{
 const timing=e.detail.style;window.compasLearningStyle=timing;
 for(const id of ['lessonTiming','figureTiming']){const select=el(id);if(![...select.options].some(o=>o.value==='power2'))select.add(new Option('On2 tradicional · 234 / 678','power2'));select.value=timing;select.disabled=true;select.title='La ruta de aprendizaje controla este filtro';}
 category='all';for(const b of el('lessonCategories').children)b.setAttribute('aria-pressed',String(b.textContent===D.categories.all));selected=null;generation++;if(ready)player.pauseVideo();refresh();
});
window.addEventListener('compas:practice-video',e=>{
 const {step,timing,name,reference,role,video}=e.detail;
 if(ready)player.pauseVideo();generation++;
 selected={id:'practice-'+step,step,timing,categories:[step==='suzy'?'suzy':'basic'],video:'',internet:true};
 el('figureSelection').textContent='Práctica seleccionada: '+name+' · '+timing.toUpperCase()+(reference?' · referencia: '+reference:'')+(role?' · '+(role==='lead'?'Guía':'Acompañante'):'');
 updateBranch();renderList();if(video){internetSeen.add(video);select({id:'internet-'+video,video,step,timing,categories:['basic'],internet:true,start:0,end:null,title:'Baile y combinaciones de pies sobre clave',author:'DANCE with EDDY and HEIDI',hint:'El creador describe baile sobre clave. Video completo para comparar combinaciones; no se afirma que reproduzca exactamente el ejercicio dibujado.'});start()}else el('lessonNext').onclick();
});
refresh();
})();
