(()=>{
const $=id=>document.getElementById(id),E=CompasEvidence;
let manifest=[];const evidence=document.createElement('details');evidence.className='evidence-panel';evidence.hidden=true;evidence.innerHTML='<summary>Comprobar este sonido y estas pisadas · fuentes</summary><div id="evidenceContent"></div>';
document.querySelector('.mix-quick').append(evidence);
const badge=document.createElement('p');badge.className='evidence-notice';badge.textContent='Solo opciones con fuente: claves escritas, acentos parciales de campana, abiertos de conga y básicos On1 / Break on 2. No se reproducen patrones inventados de piano, metales o voces.';evidence.querySelector('summary').after(badge);
function link(parent,text,url){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text+' ↗';parent.append(a)}
function paragraph(parent,title,value){const p=document.createElement('p'),b=document.createElement('strong');b.textContent=title+': ';p.append(b,document.createTextNode(value));parent.append(p)}
function render(){const id=$('rpPattern').value,s=E.sounds[id],style=E.styles[$('rpStyle').value],root=$('evidenceContent');if(!s||!style)return;root.replaceChildren();paragraph(root,'Patrón',s.name);paragraph(root,'Golpes en nuestra rejilla',s.hits.map(n=>`${Math.floor(n/2)+1}${n%2?' &':''}`).join(' · '));paragraph(root,'Dónde comprobarlo',s.locator);paragraph(root,'Alcance',s.scope);link(root,'Consultar fuente del patrón',s.source);
 const sample=manifest.find(x=>x.file===s.sample);if(sample){paragraph(root,'Grabación',sample.file+' · '+sample.credit+' · '+sample.license);link(root,'Escuchar archivo original de la muestra',sample.url);paragraph(root,'Integridad SHA-256',sample.sha256)}else paragraph(root,'Sonido',s.sample?'Procedencia: samples/manifest.json. Cargando datos de la muestra…':'Clic sintético de metrónomo identificado como ayuda, no como instrumento real.');paragraph(root,'Pisadas',style.scope);link(root,'Consultar fuente del básico',style.source);root.append(document.createTextNode(' · '));link(root,'Comprobar convenciones de los roles',style.extra);paragraph(root,'Qué no demuestra esta evidencia','La muestra individual no es una ejecución completa del patrón. La programación sigue los golpes citados; no se ha detectado este patrón en una canción ni se certifica toda la técnica de baile.');}
fetch('samples/manifest.json').then(r=>{if(!r.ok)throw Error('manifest');return r.json()}).then(data=>{manifest=data;render()}).catch(()=>{const p=document.createElement('p');p.textContent='No se pudo cargar el manifiesto de las grabaciones. Consulta samples/manifest.json.';$('evidenceContent').append(p)});
window.addEventListener('compas:mix-state',render);window.addEventListener('compas:practice-context',render);
$('learningVideo').textContent='Comprobar fuente del básico';$('learningVideo').onclick=()=>{evidence.open=true;evidence.scrollIntoView({behavior:'smooth',block:'start'})};
$('rpCoreLayers').textContent='Clave + abiertos documentados';
const band=$('instrumentos');band.querySelector('p').textContent='Estas son las grabaciones y patrones que conservamos con fuentes. Campana y conga son extractos parciales, no patrones completos. No hay una pisada obligatoria para cada instrumento.';
for(const card of $('rpLayerList').children){const buttons=card.querySelectorAll('button');if(buttons[1])buttons[1].textContent='Usar sonido · conservar básico'}
// Video discovery is a separate exploration tool, not automatic evidence for the animated steps.
const library=$('uxVideos');library.querySelector('summary').textContent='Videos de pasos · busca y mira otro ejemplo';
const warning=document.createElement('p');warning.textContent='Elige un paso y usa «Otro video del mismo paso». Los resultados de búsqueda no se verifican automáticamente.';warning.className='small';$('lessonLibrary').prepend(warning);
$('lessonFind').hidden=true;
const sources=$('uxCountGuide');const note=document.createElement('p');note.textContent='Power2 y los ejercicios de lateral, Suzy Q, síncopas y apoyos sobre clave quedan fuera de la animación hasta comprobar una secuencia concreta por rol. La práctica activa muestra únicamente básicos con fuente.';sources.prepend(note);
render();
})();
