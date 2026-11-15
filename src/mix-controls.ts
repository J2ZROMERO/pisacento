// @ts-nocheck
// Browser controller migrated from the working salsa interface.
(()=>{
const $=id=>document.getElementById(id),patterns=CompasPractice.patterns;
function icon(id){const paths={
 strong:'<path d="M18 6h12l9 30H9Z M16 13h16 M13 36h22 M24 36v6"/>',
 son23:'<path d="m12 10 20 28 M31 9 13 39"/>',
 conga:'<path d="M13 12h22l-4 29H17Z M13 19h22 M18 12v29 M30 12v29"/><ellipse cx="24" cy="12" rx="11" ry="5"/>',
 bongo:'<ellipse cx="13" cy="15" rx="9" ry="5"/><ellipse cx="35" cy="15" rx="9" ry="5"/><path d="M4 15v17q9 9 18 0V15 M26 15v17q9 9 18 0V15"/>',
 piano:'<path d="M5 12h38v25H5Z M12 12v25 M20 12v25 M28 12v25 M36 12v25 M11 12v14 M19 12v14 M35 12v14"/>',
 timbales:'<ellipse cx="15" cy="18" rx="11" ry="5"/><path d="M4 18v12q11 9 22 0V18 M15 35v9 M10 44h10 M31 11l12 20 M42 8 28 31"/>',
 guiro:'<path d="M15 7h18l-4 35H19Z M18 14h12 M18 20h12 M19 26h10 M20 32h8 M38 11l5 23"/>',
 maracas:'<ellipse cx="15" cy="15" rx="8" ry="11"/><ellipse cx="35" cy="17" rx="8" ry="11"/><path d="m15 26-3 17 M35 28l3 15"/>',
 voicelead:'<rect x="17" y="5" width="14" height="25" rx="7"/><path d="M11 23v3a13 13 0 0 0 26 0v-3 M24 39v6 M16 45h16"/>',
 trumpet:'<path d="M6 19h24l13-9v28l-13-9H9v-7 M18 19v-7 M24 19v-7 M30 19v-7"/>',
 flute:'<path d="m7 39 34-30 M11 35l4 4 M18 29l4 4 M25 23l4 4 M32 17l4 4"/>',
 guitar:'<path d="m29 20 9-14 4 3-9 15c5 12-4 21-13 17S7 27 15 22q5-5 14-2Z"/><circle cx="24" cy="29" r="4"/>'
 };let key=id;if(['slap','open','open23'].includes(id))key='conga';if(/^(son|rumba)/.test(id))key='son23';if(key==='voicecoro')key='voicelead';if(key==='trombone')key='trumpet';if(['bass','violin'].includes(key))key='guitar';
 return `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${paths[key]||'<circle cx="24" cy="24" r="13"/><path d="M24 15v10l7 5"/>'}</svg>`;
}
const panel=document.createElement('section');panel.className='mix-quick';panel.innerHTML='<div class="mix-heading"><strong>¿Qué quieres escuchar?</strong><span id="mixQuickStatus" role="status"></span></div><label class="mix-select-label">Escuchar un instrumento solo<select id="mixQuickSelect"></select></label><p class="small">El selector apaga los otros instrumentos y deja solo el elegido. En «Añadir otro sonido» puedes sumarlos para escucharlos juntos. Esto cambia el sonido; los pies siguen el paso elegido.</p><div id="mixSelected" class="mix-selected" hidden></div><div class="mix-card-list" id="mixQuickCards" aria-label="Instrumentos activos"></div><details class="mix-more"><summary>Añadir otro sonido a lo que escuchas</summary><div class="mix-card-list" id="mixAvailableCards" aria-label="Instrumentos disponibles"></div></details><p class="mix-legend">Los dibujos de la tabla brillan cuando suena cada instrumento.</p>';
const live=document.querySelector('.ux-live'),help=live.querySelector('.ux-inline-help');help.after(panel);
for(const [id,p] of Object.entries(patterns))$('mixQuickSelect').add(new Option(p.name,id));
$('mixQuickSelect').onchange=()=>window.dispatchEvent(new CustomEvent('compas:mix-command',{detail:{action:'solo',pattern:$('mixQuickSelect').value}}));
const layerList=[...CompasLayers.layers,{id:'pulse',name:'Pulso de práctica',sound:'Referencia regular'}];
let state=null;
function badge(id){const layer=layerList.find(l=>l.id===id);return layer?.name||patterns[id]?.name||id}
function update(s){state=s;$('mixQuickSelect').value=s.reference;$('mixSelected').innerHTML=icon(s.reference)+`<div><strong>${patterns[s.reference].name}</strong><small>Último sonido elegido · ${s.enabled.includes(s.reference)?'encendido':'apagado'} · los pies mantienen su paso</small></div>`;$('mixQuickCards').replaceChildren();$('mixAvailableCards').replaceChildren();
 const ids=[...new Set([...layerList.map(l=>l.id),...s.enabled])];
 for(const id of ids){if(!patterns[id])continue;const b=document.createElement('button');b.type='button';b.dataset.instrument=id;b.className='mix-instrument';b.setAttribute('aria-pressed',String(s.enabled.includes(id)));b.setAttribute('aria-label','Sonar '+badge(id));b.innerHTML=icon(id)+`<span>${badge(id)}</span><small>${s.enabled.includes(id)?'● Encendido':'Apagado'}</small>`;b.onclick=()=>window.dispatchEvent(new CustomEvent('compas:mix-command',{detail:{action:'toggle',pattern:id}}));$(s.enabled.includes(id)?'mixQuickCards':'mixAvailableCards').append(b)}drawMatrix(s);tick(s);
}
function drawMatrix(s){
 const grid=$('rpHits');grid.previousElementSibling.textContent='CUÁNDO SUENA CADA INSTRUMENTO · dibujos = golpes';
 const ids=[...s.enabled,...(s.pulse?['tic']:[])];
 for(const cell of grid.children){const sub=Number(cell.dataset.sub);cell.replaceChildren();cell.classList.remove('rp-hit');
  const matches=ids.filter(id=>id==='tic'?sub%2===0:patterns[id]?.hits.includes(sub));
  for(const id of matches){const hit=document.createElement('span');hit.className='matrix-instrument';hit.dataset.sound=id;const name=id==='tic'?'Tic de ayuda':patterns[id].name;hit.title=name+' · '+(Math.floor(sub/2)+1)+(sub%2?' &':'');hit.setAttribute('role','img');hit.setAttribute('aria-label',hit.title);hit.innerHTML=icon(id);cell.append(hit)}
  if(!matches.length){const empty=document.createElement('span');empty.className='matrix-empty';empty.textContent='·';cell.append(empty)}
  cell.classList.toggle('matrix-has-sound',matches.length>0);
 }
 let explanation=$('matrixSoundHelp');if(!explanation){explanation=document.createElement('p');explanation.hidden=true;explanation.id='matrixSoundHelp';explanation.className='small';grid.after(explanation)}
 explanation.textContent=ids.length?'Dibujos: '+ids.map(id=>id==='tic'?'tic de ayuda':patterns[id].name).join(' + ')+'. Arriba están los tiempos; abajo, las pisadas. Un golpe de instrumento no obliga a dar un paso.':'No hay sonidos encendidos. Selecciona un instrumento o añade el tic de ayuda.';
}
function tick(s){if(!state)return;const sounding=s.playing&&s.audible;
 for(const cell of $('rpHits').children){const current=Number(cell.dataset.sub)===s.sub;let lit=false;for(const item of cell.querySelectorAll('.matrix-instrument')){const audible=item.dataset.sound==='tic'?s.pulse:s.audible&&s.enabled.includes(item.dataset.sound);const glow=s.playing&&current&&audible;item.classList.toggle('matrix-playing',glow);lit=lit||glow}cell.classList.toggle('matrix-cell-playing',lit)}
 $('mixQuickStatus').textContent=!s.audible?'Instrumentos silenciados':!s.enabled.length?'Sin instrumentos activos':s.playing?'Reproduciendo · '+s.enabled.length+' sonidos':'En pausa · '+s.enabled.length+' sonidos listos';
 if(s.pulse)$('mixQuickStatus').textContent+=' · tic de ayuda activado';
 for(const b of [...$('mixQuickCards').children,...$('mixAvailableCards').children]){const id=b.dataset.instrument,hit=sounding&&s.enabled.includes(id)&&patterns[id].hits.includes(s.sub);b.classList.toggle('mix-strike',hit);b.querySelector('small').textContent=hit?'♪ Suena':s.enabled.includes(id)?'● Encendido':'Apagado'}
 $('mixSelected').classList.toggle('mix-strike',sounding&&s.enabled.includes(s.reference)&&patterns[s.reference].hits.includes(s.sub));
}
window.addEventListener('compas:mix-state',e=>update(e.detail));window.addEventListener('compas:mix-tick',e=>tick(e.detail));
window.dispatchEvent(new CustomEvent('compas:mix-command',{detail:{action:'state'}}));
})();
