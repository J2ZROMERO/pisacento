(()=>{
const $=id=>document.getElementById(id);
const routes={
 on1:{name:'Break on 1',counts:'1–2–3 / 5–6–7',breaks:'1 y 5',intro:'Break on 1: apoyos 1–2–3 / 5–6–7 y cambios de dirección en 1 y 5.',role:'En pareja: lead adelante en 1 y atrás en 5; follower atrás en 1 y adelante en 5.',exercise:'Practica básico, lateral, giro sencillo y regreso al básico. Después trabaja el cross-body lead con una demostración de ambos roles.',pattern:'strong'},
 on2:{name:'Break on 2',counts:'1–2–3 / 5–6–7',breaks:'2 y 6',intro:'Seis apoyos con cambio de dirección en 2 y 6. On2 no significa pisar solamente en esos dos tiempos.',role:'En pareja: lead atrás en 2 y adelante en 6; follower adelante en 2 y atrás en 6. En shines de clase es habitual practicar adelante en 2: selecciona esa convención explícitamente.',exercise:'Practica preparación en 1/5, cambios en 2/6, giro sencillo y regreso al básico. No desplaces automáticamente un paso de On1 sin revisar su preparación.',pattern:'open'},
 power2:{name:'On2 tradicional · Power2',counts:'2–3–4 / 6–7–8',breaks:'2 y 6',intro:'Variante de On2 con apoyos 234/678. También se encuentra bajo los nombres Power2 o mambo tradicional; no equivale al básico moderno de Nueva York.',role:'Esta ruta usa lead adelante en 2 y atrás en 6; follower hace lo complementario. Existen otras orientaciones: indicamos la convención utilizada, no una regla universal.',exercise:'Practica apoyos 234/678, prolongación del movimiento en 1/5 y regreso al básico. Busca videos etiquetados Power2 o 234; un video On2 genérico puede usar otro timing.',pattern:'conga'}
};
delete routes.power2;
const lessons=[
 {
  "title": "Sigue el pulso",
  "goal": "El pulso es el latido regular que puedes seguir con palmadas. Reconocerlo te ayuda a contar sin acelerar ni frenar cuando añades los pies.",
  "task": "Escucha el clic y cuenta del 1 al 8 con palmadas. Repite sin mirar la tabla.",
  "criterion": "",
  "pattern": "pulse",
  "move": "basic"
 },
 {
  "title": "Pisa el básico",
  "goal": "No todos los números piden una pisada. Apoyas en 1–2–3 y 5–6–7; el conteo elegido indica cuándo cambias de dirección. Así sabes qué pie recibe el peso.",
  "task": "Pisa 1–2–3 / 5–6–7. Sigue los pies de tu rol; en 4 y 8 no añadas un apoyo. Si practicas en pareja, compara ambos roles.",
  "criterion": "",
  "pattern": null,
  "move": "basic"
 },
 {
  "title": "Mantén el conteo",
  "goal": "Un instrumento puede sonar entre tus pisadas o dejar silencios. Por ejemplo, una campana en 1–3–5–7 no elimina tus apoyos en 2 y 6: el conteo continúa.",
  "task": "Elige campana y cuenta del 1 al 8 manteniendo el básico. Después cambia a clave o conga sin cambiar tus pisadas.",
  "criterion": "",
  "pattern": null,
  "move": "basic"
 }
];

let style='on2',lesson=0;
const panel=document.createElement('section');panel.className='learning-path';panel.id='learningPath';
panel.innerHTML=`<span class="section-label">TU RUTA DE APRENDIZAJE</span><h3>Aprende un estilo, paso a paso</h3><div id="learningRouteControl"></div><p id="learningIntro"></p><div class="learning-summary"><strong id="learningCounts"></strong><span id="learningRole"></span></div><div id="learningVisual" class="learning-visual"></div><div class="actions"><button id="learningClassConvention">Individual · convención de clase</button><span class="small">El rol describe la ejecución, no el género de la persona.</span></div><nav id="learningLessons" aria-label="Lecciones de la ruta"></nav><article class="learning-current"><span id="learningProgress" class="section-label"></span><h3 id="learningTitle"></h3><div id="learningLessonVisual" class="learning-lesson-visual"></div><div id="learningWhy" class="learning-why"></div><p id="learningGoal"></p><p id="learningTask"></p><p id="learningRepertoire" class="small"></p><p id="learningCriterion"></p><div class="actions"><button id="learningPrevious">Anterior</button><button id="learningApply">Preparar este ejercicio</button><button id="learningVideo">Ver básico de esta ruta</button><button id="learningDone">Ya puedo hacerlo · continuar</button></div><p class="small">El avance es una autoevaluación; la app no observa ni califica tu baile. La secuencia es una propuesta didáctica.</p></article><details><summary>Convenciones y fuentes de esta ruta</summary><p>Break on 1 y Break on 2 tienen seis apoyos 123/567; cambia el break. Power2 usa 234/678. Una referencia musical y un paso son capas distintas. Las direcciones mostradas son esquemas compactos.</p><p><a href="https://thedancedojo.com/salsa-timing-on1-on2-on3/" target="_blank" rel="noopener noreferrer">Dance Dojo · timings</a> · <a href="https://thedancedojo.com/blog/salsa-timing-conventions/" target="_blank" rel="noopener noreferrer">Convenciones individual / pareja</a> · <a href="https://www.timba.com/clave" target="_blank" rel="noopener noreferrer">Kevin Moore · clave</a> · <a href="https://salsachillout.co.uk/wp-content/uploads/2023/03/Student-Syllabus-v2-20230317.pdf" target="_blank" rel="noopener noreferrer">Ejemplo de enseñanza progresiva</a></p><p>Se priorizan referencias habituales, no un ranking estadístico de popularidad. Puerto Rico reúne distintas convenciones: no se le asigna aquí un único conteo. Casino, son y caleña requieren rutas propias y quedan fuera de estas rutas en línea.</p></details>`;
const controls=document.querySelector('.practice-controls');controls.before(panel);$('learningRouteControl').append($('rpStyle').parentElement);

function render(){const r=routes[style],l=lessons[lesson];renderVisuals();renderWhy();$('learningIntro').textContent=r.intro;$('learningCounts').textContent=`Apoyos ${r.counts} · cambios ${r.breaks}`;$('learningRole').textContent=r.role;$('learningProgress').textContent=`${lesson+1} / ${lessons.length} · ${r.name}`;$('learningTitle').textContent=l.title;$('learningGoal').textContent='Por qué: '+l.goal;$('learningTask').textContent='Ejercicio: '+l.task;$('learningRepertoire').textContent='';$('learningCriterion').textContent='Antes de continuar: '+l.criterion;$('learningDone').textContent=lesson===lessons.length-1?'Volver al primero':'Siguiente';$('learningClassConvention').hidden=$('rpMode').value==='partner';$('learningLessons').replaceChildren();lessons.forEach((x,i)=>{const b=document.createElement('button');b.innerHTML=lessonIcon(i)+`<span class="learning-step-number">${i+1}</span><span>${x.title}</span>`;b.setAttribute('aria-current',i===lesson?'step':'false');b.onclick=()=>{lesson=i;apply()};$('learningLessons').append(b)});}


const lessonReasons=[
 {level:'Base para empezar',meaning:'Pulso = el latido regular con el que puedes acompañar una canción, como al dar palmadas a una velocidad constante. No tiene que oírse como un clic en la canción.',use:'Te da una referencia de velocidad para no acelerar o frenar sin querer.',order:'Lo practicamos antes de movernos en distintas direcciones para atender una sola cosa a la vez.',essential:'Mantener una referencia de tiempo es importante para bailar a tiempo. Hacer esta lección concreta o saber el nombre «pulso» no es obligatorio: si ya puedes acompañar la música, puedes pasar al básico.',example:'Imagina un reloj: tic · tic · tic · tic. Cada tic es un pulso. El ritmo de una conga puede tener varios golpes entre esos tics o dejar algunos sin golpe.',terms:['pulso','conteo']},
 {level:'Base para empezar',meaning:'Apoyar es pasar el peso del cuerpo a un pie. El básico es una secuencia que puedes repetir para empezar a bailar.',use:'Te ayuda a saber qué pie queda libre y cómo regresar después de otro movimiento.',order:'Primero conservamos la velocidad; ahora añadimos pie y dirección. En On1 y On2 no cambia la misma parte del básico.',essential:'Necesitas comprender los apoyos de la forma de bailar elegida. No necesitas memorizar nombres técnicos antes de intentarlo.',example:'No basta con tocar el suelo: al apoyar el peso, el otro pie queda disponible. Un cambio de dirección (break) es el apoyo que inicia la vuelta hacia el lado contrario.',terms:['apoyo','break','conteo']},
 {level:'Recurso de ayuda · opcional',meaning:'Escuchar por capas es oír un instrumento solo y después junto con otros.',use:'Te ayuda a reconocer qué estás escuchando y a mantener tus pasos cuando aparecen otros sonidos.',order:'Después del básico, añadimos sonidos sin cambiar a la vez toda la secuencia de pies.',essential:'No necesitas reconocer todos los instrumentos para empezar a bailar. Aislarlos es una ayuda si la mezcla te confunde, no un requisito para avanzar.',example:'La campana puede sonar en 1, 3, 5 y 7 mientras el básico de Break on 2 mantiene apoyos en 1, 2, 3, 5, 6 y 7. Escuchar un golpe no te obliga a pisarlo.',terms:['referencia','clave','tempo']},
 {level:'Amplía tu repertorio · opcional',meaning:'Un paso lateral mueve el peso hacia un lado. Una figura conecta movimientos; algunas requieren pareja.',use:'Te ofrece alternativas al básico y te enseña a entrar y salir de un movimiento.',order:'Añadimos una variación después de tener una referencia a la que regresar.',essential:'No hace falta acumular figuras ni hacer pasos difíciles para empezar. Puedes practicar solamente el básico y añadir una opción cuando quieras.',example:'Haz un ciclo de básico, prueba el lateral y vuelve al básico. La vuelta forma parte del ejercicio.',terms:['apoyo','sincopa']},
 {level:'Para bailar en pareja',meaning:'Lead propone una dirección mediante la conexión; follower interpreta esa propuesta y conserva su propio equilibrio. Son roles, no géneros.',use:'Te permite entender por qué cada persona tiene apoyos y direcciones complementarios.',order:'Primero conoces tus pies; después añades la interacción con otra persona.',essential:'Es importante si quieres bailar en pareja. Puedes dejarlo para después si hoy practicas individual. Las huellas no enseñan por sí solas la conducción.',example:'En Break on 2, el lead suele ir atrás en 2 mientras el follower avanza en 2. Como se miran de frente, sus flechas de «adelante» apuntan en sentidos opuestos en la pantalla.',terms:['lead','follower','apoyo']},
 {level:'Exploración musical · opcional',meaning:'Una frase es una idea musical, parecida a una oración. Musicalidad es elegir cómo responder con el movimiento a lo que escuchas.',use:'Te ayuda a reconocer cambios de energía y a elegir entre continuar, reducir o variar el movimiento.',order:'La exploramos después de los apoyos para que interpretar no implique perder tu referencia de tiempo.',essential:'No necesitas identificar secciones ni instrumentos para comenzar. Es una manera de ampliar tu expresión; no existe una única respuesta correcta.',example:'Al escuchar una pausa puedes reducir el movimiento. Cuando vuelve el conjunto puedes retomar el básico. Es una propuesta, no una regla de todas las canciones.',terms:['frase','montuno','sincopa']}
];
const beginnerTerms={
 pulso:['Pulso','Latido regular que sirve de referencia para la velocidad de la música. No es lo mismo que cada golpe que escuchas.'],
 conteo:['Conteo 1–8','Numeramos ocho pulsos para orientarnos en el baile. No implica hacer una pisada nueva en los ocho.'],
 apoyo:['Apoyo / peso','Pie que recibe el peso del cuerpo. Tocar el suelo con el otro pie no siempre cambia el apoyo.'],
 break:['Cambio de dirección / break','Apoyo con el que cambias la dirección del básico: 1/5 en On1 y 2/6 en las variantes On2 de esta app.'],
 referencia:['Referencia musical','Sonido o patrón al que prestas atención para orientarte. No dicta por sí solo todos tus pasos.'],
 clave:['Clave','Patrón de cinco golpes que organiza relaciones rítmicas. Puede no escucharse como un instrumento separado; no exige hacer cinco pasos.'],
 tempo:['Tempo / BPM','Velocidad de los pulsos. BPM significa pulsos por minuto: a 60 hay uno por segundo. No cuenta todas las notas de una canción.'],
 sincopa:['Síncopa','Desplazamiento o acento que destaca una parte débil o entre pulsos. El símbolo & aquí indica el punto entre dos números; no toda nota en & es por sí sola una síncopa.'],
 lead:['Lead / guía','Rol que propone movimientos mediante la conexión, sin forzar a la otra persona.'],
 follower:['Follower / acompañante','Rol que interpreta la propuesta de movimiento y mantiene su propio peso y tiempo.'],
 frase:['Frase','Idea musical con un desarrollo reconocible. Puede abarcar varios ciclos de ocho; ocho tiempos no equivalen siempre a una frase.'],
 montuno:['Montuno','Según el contexto, sección musical o patrón repetido del piano. No es una alternativa a elegir bailar On1 u On2.']
};
function renderWhy(){ $('learningWhy').hidden=true; }

const iconPaths=[
 '<path d="M5 24h8l5-13 9 27 8-27 6 13h10"/>',
 '<ellipse cx="19" cy="20" rx="6" ry="11" transform="rotate(-20 19 20)"/><ellipse cx="38" cy="33" rx="6" ry="11" transform="rotate(20 38 33)"/>',
 '<path d="m6 16 22-10 22 10-22 10Z M6 27l22 10 22-10 M6 38l22 10 22-10"/>',
 '<path d="M10 38V16h30 M32 8l9 8-9 8 M46 32v14H20 M28 38l-9 8 9 7"/>',
 '<circle cx="15" cy="13" r="6"/><circle cx="41" cy="13" r="6"/><path d="M15 20v17m-8 12 8-12 8 12 M41 20v17m-8 12 8-12 8 12 M6 29l9-5 13 7 13-7 9 5"/>',
 '<path d="M5 43V30h10v13 M20 43V20h10v23 M35 43V8h10v35 M5 48h46"/>'
];
function lessonIcon(i){return `<svg viewBox="0 0 56 56" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${iconPaths[[0,1,2,5][i]]}</svg>`}
function renderVisuals(){ $('learningVisual').hidden=true;$('learningLessonVisual').hidden=true; }

function notifyRoute(){window.dispatchEvent(new CustomEvent('compas:learning-route',{detail:{style}}))}
function apply(){const l=lessons[lesson];$('rpPattern').value=l.pattern||routes[style].pattern;$('rpMove').value=l.move;$('rpPulse').checked=lesson===0;$('rpSound').checked=lesson!==0;if(l.mode)$('rpMode').value=l.mode;$('rpPattern').dispatchEvent(new Event('change'));render();}
$('rpStyle').value=style;
$('rpStyle').addEventListener('change',()=>{style=$('rpStyle').value;lesson=0;notifyRoute();apply()});
window.addEventListener('compas:practice-context',()=>render());
$('learningApply').onclick=apply;
$('learningDone').onclick=()=>{lesson=(lesson+1)%lessons.length;apply()};
$('learningPrevious').onclick=()=>{lesson=(lesson-1+lessons.length)%lessons.length;apply()};
$('learningClassConvention').onclick=()=>{$('rpMode').value='solo';$('rpRole').value=style==='on2'?'follow':'lead';$('rpRole').dispatchEvent(new Event('change'));};
$('learningVideo').onclick=()=>{window.dispatchEvent(new CustomEvent('compas:practice-video',{detail:{step:'basic',timing:style,name:'Básico · '+routes[style].name,role:$('rpRole').value}}));$('lessonLibrary').scrollIntoView({behavior:'smooth'})};
notifyRoute();apply();
})();
