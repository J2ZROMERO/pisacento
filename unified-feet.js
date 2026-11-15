(()=>{
const $=id=>document.getElementById(id),stage=$('rpStage'),partner=$('rpPartnerPreview'),old=stage.parentElement;
const view=document.createElement('section');view.className='unified-feet';view.innerHTML='<div class="unified-feet-heading"><h4>Tus pies · una sola vista</h4><label id="feetViewLabel">Cómo quieres verlos<select id="feetView"><option value="facing">Pareja frente a frente</option><option value="parallel">Ambos desde su propia perspectiva</option></select></label></div><p id="feetViewHelp" class="small"></p><div id="feetFloor" class="feet-floor"><div id="feetOwn" class="feet-dancer"></div></div><div class="feet-actions" id="feetActions"></div><p class="small">Pulsa un número de la fila CONTEO para detenerte en ese tiempo. La misma vista muestra el paso elegido y cambia con tu rol.</p>';
old.before(view);$('feetOwn').append($('rpOwnRole'),stage);$('feetFloor').append(partner);$('feetActions').append($('rpAction'),$('rpPartnerAction'));
const legend=old.querySelector(':scope > p:last-child');if(legend){legend.textContent='El pie iluminado recibe el peso; el otro conserva su posición.';view.append(legend)};old.remove();
$('uxCountGuide').querySelector('summary').textContent='Cómo se cuenta y convenciones del estilo';
let orientation='facing';try{const v=localStorage.getItem('compas-feet-view');if(['facing','parallel'].includes(v))orientation=v}catch{}
$('feetView').value=orientation;
function update(){const mode=$('rpMode').value,role=$('rpRole').value;for(const cell of $('rpCounts').children){cell.setAttribute('role','button');cell.tabIndex=0;cell.setAttribute('aria-label','Ver tiempo '+cell.textContent+' en los pies')}stage.querySelector('.front').textContent='TU ADELANTE ↑';stage.querySelector('.back').textContent='TU ATRÁS ↓';partner.querySelector('.front').textContent=orientation==='facing'?'SU ADELANTE ↓':'SU ADELANTE ↑';partner.querySelector('.back').textContent=orientation==='facing'?'SU ATRÁS ↑':'SU ATRÁS ↓';view.dataset.mode=mode;view.dataset.orientation=orientation;$('feetViewLabel').hidden=mode!=='partner';$('rpPartnerAction').hidden=mode!=='partner';
 $('rpOwnRole').textContent='TÚ · '+(role==='lead'?'LEAD / GUÍA':'FOLLOWER / ACOMPAÑANTE');$('rpPartnerRole').textContent='PAREJA · '+(role==='lead'?'FOLLOWER':'LEAD');
 $('feetViewHelp').textContent=mode==='solo'?'Vista de tus pies desde arriba: adelante está hacia la parte superior. Practicas el rol seleccionado.':orientation==='facing'?'Tú abajo y tu pareja arriba, mirándose. Tu adelante apunta arriba; el de tu pareja apunta abajo. La dirección se conserva para cada persona.':'Ambas personas miran hacia arriba en sus dibujos. Compara los apoyos de cada rol; esta orientación no representa su posición en la pista.';
 const notice=$('rpSessionHelp');if(mode==='partner')notice.textContent='Ambos roles comparten el conteo. La orientación se elige en la vista única de pies. Las huellas no representan manos ni conducción.';
}
$('feetView').onchange=()=>{orientation=$('feetView').value;try{localStorage.setItem('compas-feet-view',orientation)}catch{}update()};
window.addEventListener('compas:practice-context',update);
$('rpCounts').addEventListener('click',e=>{const cell=e.target.closest('[data-sub]');if(cell)window.dispatchEvent(new CustomEvent('compas:practice-seek',{detail:{sub:Number(cell.dataset.sub)}}))});
$('rpCounts').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const cell=e.target.closest('[data-sub]');if(cell){e.preventDefault();cell.click()}}});
update();
})();
