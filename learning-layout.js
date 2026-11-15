(()=>{
const $=id=>document.getElementById(id),host=$('rhythmPractice'),path=$('learningPath');
const section=(tag,cls)=>window.CompasView.section(tag,cls);
const disclosure=(title,id)=>window.CompasView.disclosure(title,id);
host.classList.add('guided-workspace');
for(const el of [...host.children]){if(el===path)break;el.classList.add('ux-old-heading')}
const title=section('div','ux-page-title');title.innerHTML='<span class="section-label">PISACENTO / PRÁCTICA DE SALSA</span><h2>Del uno al ocho.</h2><p>Elige un conteo, escucha el ritmo y encuentra tu paso.</p>';host.prepend(title);
const setup=section('section','ux-setup');setup.setAttribute('aria-label','Configurar mi ruta');setup.innerHTML='<div class="ux-setup-heading"><strong>Tu punto de partida</strong><span>Puedes cambiarla cuando quieras.</span></div><div class="ux-setup-fields" id="uxSetupFields"></div>';title.after(setup);
const fields=setup.querySelector('#uxSetupFields');fields.append($('learningRouteControl'));
for(const id of ['rpMode','rpRole'])fields.append($(id).parentElement);
const choosing=disclosure('¿Qué significan estas opciones?');choosing.classList.add('ux-inline-help');choosing.innerHTML+='<p><strong>Conteo:</strong> elige cuándo cambia la dirección del básico. On1 cambia de dirección en 1 y 5; Break on 2 en 2 y 6. Puedes cambiar de ruta después.</p><p><strong>Modalidad:</strong> individual para practicar por tu cuenta; pareja para comparar los dos roles.</p><p><strong>Rol:</strong> lead propone movimientos y follower interpreta la propuesta. En individual eliges qué papel practicar; no depende del género.</p>';setup.append(choosing);
$('learningRouteControl').querySelector('label').firstChild.textContent='Conteo que quiero practicar';
const workspace=section('div','ux-workspace'),sidebar=section('aside','ux-roadmap');sidebar.innerHTML='<span class="section-label">EL ENSAYO</span><h3>Practica el conteo</h3><p>Elige cualquier ejercicio.</p>';sidebar.append($('learningLessons'));
const main=section('div','ux-lesson-main'),current=path.querySelector('.learning-current');main.append(current);workspace.append(sidebar,main);path.append(workspace);
const explanation=disclosure('Ver conteo, pies frente a frente y convenciones','uxCountGuide');
for(const el of [$('learningIntro'),path.querySelector('.learning-summary'),$('learningVisual'),$('learningClassConvention').parentElement])explanation.append(el);
main.append(explanation);
const live=section('section','ux-live');live.innerHTML='<div class="ux-live-title"><span class="section-label">AHORA, A LOS PIES</span><h3>Escucha. Cuenta. Pisa.</h3></div>';
const transport=section('div','ux-transport');transport.append($('rpPlay'),$('rpReset'),$('rpTempo').parentElement);live.append(transport);
// Only the actionable count belongs in the practice flow. Keep legacy convention nodes out of view.
explanation.hidden=true;
const countBasics=section('p','count-basics');countBasics.setAttribute('aria-label','Conteo básico');countBasics.append($('learningCounts'),document.createTextNode('. En 4 y 8 no hay un nuevo apoyo.'));transport.after(countBasics);

const playbackHelp=disclosure('¿Cómo leo el conteo y qué cambia la velocidad?');playbackHelp.classList.add('ux-inline-help');playbackHelp.innerHTML+='<p><strong>Conteo:</strong> cada número es un pulso; & es el punto intermedio. <strong>Golpes:</strong> cuándo suena cada instrumento encendido. <strong>Pisadas:</strong> cuándo se apoya un pie. Las tres filas pueden ser distintas.</p><p><strong>Tempo:</strong> cambia la velocidad del ejercicio. 60 pulsos/min significa un pulso cada segundo. Elige una velocidad cómoda; no es una medida de tu nivel.</p><p><strong>Los pies:</strong> el pie encendido señala el apoyo. Adelante y atrás se leen desde quien baila. Las huellas son una guía de apoyos, no una clase completa de postura o conducción.</p><p><strong>Sonidos:</strong> «Añadir pulso» pone un tic regular para ayudarte. «Sonar instrumento grabado» activa las capas seleccionadas. Puedes ajustarlos en «Ajustar sonidos e instrumentos».</p>';live.append(playbackHelp,host.querySelector('.rp-layout'));main.insertBefore(live,explanation);
const assessment=current.querySelector(':scope > p:last-child');if(assessment)assessment.hidden=true;
const tasks=current.querySelector('.actions');tasks.classList.add('lesson-bottom-navigation');tasks.setAttribute('aria-label','Cambiar de ejercicio libremente');main.append(tasks);$('learningApply').textContent='Repetir ejercicio';$('learningVideo').textContent='Ver demostración en video';$('learningDone').classList.add('primary');
const stageSources=path.querySelector(':scope > details');if(stageSources)explanation.append(stageSources);
path.replaceChildren(workspace);
// Keep the existing controls and handlers; place optional tools after the guided flow.
const extras=disclosure('Exploración libre · instrumentos, movimientos y ajustes','uxExplore');
let next=path.nextSibling;while(next){const after=next.nextSibling;extras.append(next);next=after}host.append(extras);
const soundTools=document.createElement('button');soundTools.textContent='Volumen y opciones de audio';soundTools.className='ux-sound-tools';soundTools.onclick=()=>{extras.open=true;extras.scrollIntoView({behavior:'smooth',block:'start'})};transport.append(soundTools);

const lib=$('lessonLibrary'),videos=disclosure('Videoteca · buscar más pasos y ejemplos','uxVideos');lib.before(videos);videos.append(lib);
const learn=document.querySelector('.learn');if(learn){const theory=disclosure('Conceptos musicales y referencias');learn.before(theory);theory.append(learn)}
const resources=disclosure('Recursos y herramientas','uxResources');resources.classList.add('ux-resources');
resources.querySelector('summary').innerHTML='<span><strong>Recursos y herramientas</strong><small>Instrumentos, videos, conceptos y funciones experimentales · opcional</small></span>';
const resourceGrid=section('div','ux-resource-grid');resources.append(resourceGrid);host.after(resources);
extras.querySelector('summary').textContent='Opciones de audio y referencias';videos.querySelector('summary').textContent='Videoteca de pasos';
const theory=learn?.parentElement,source=document.querySelector('details.sources'),legacy=$('legacyMusic');
for(const item of [extras,videos,theory,source,legacy])if(item){item.open=false;resourceGrid.append(item)}
if(legacy)legacy.querySelector('summary').textContent='Análisis de canciones · experimental';
soundTools.onclick=()=>{resources.open=true;extras.open=true;extras.scrollIntoView({behavior:'smooth',block:'start'})};
window.addEventListener('compas:practice-video',()=>{resources.open=true;videos.open=true});
window.addEventListener('hashchange',()=>{if(location.hash==='#instrumentos'){resources.open=true;extras.open=true;$('instrumentos').scrollIntoView()}if(location.hash==='#lessonLibrary'){resources.open=true;videos.open=true;lib.scrollIntoView()}});
// Main mixer and matrix are the canonical visible controls; preserve controller-owned state nodes.
window.CompasView.concealManaged(['learningVideo','learningCriterion','learningRepertoire','rpSequence','rpModeNotice','rpBasic','rpMixStatus','rpLayerList','rpStyleHelp','rpPatternHelp','rpSessionHelp']);
for(const id of ['rpPattern','rpMove'])$(id).parentElement.hidden=true;
videos.open=false;videos.hidden=true;videos.classList.add('bottom-video-library');resources.after(videos);
main.append(tasks);resources.hidden=true;soundTools.hidden=true;
const audioOptions=disclosure('Ajustar audio');audioOptions.classList.add('compact-audio-options');for(const id of ['rpVolume','rpSound','rpPulse'])audioOptions.append($(id).parentElement);transport.after(audioOptions);

// Opening an instrument link must reveal its containing disclosure.
for(const a of document.querySelectorAll('a[href="#instrumentos"]'))a.addEventListener('click',()=>{resources.open=true;extras.open=true});
})();
