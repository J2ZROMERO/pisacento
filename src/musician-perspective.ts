(()=>{
  const task=document.getElementById('learningTask'),title=document.getElementById('learningTitle');if(!task||!title)return;
  const section=document.createElement('section');section.id='musicianPerspective';section.className='musician-perspective';section.setAttribute('aria-labelledby','musicianPerspectiveTitle');
  section.innerHTML=`<h4 id="musicianPerspectiveTitle">Cómo la organiza un músico</h4>
    <p><strong>Contar ocho no equivale a terminar una frase.</strong> El conteo te orienta; la frase se reconoce por la idea musical y su continuación o cierre.</p>
    <div class="music-measures" role="img" aria-label="Ejemplo en cuatro por cuatro: dos compases de cuatro pulsos forman un conteo de ocho para bailar. No determina la duración de una frase."><span>Músico · ejemplo en 4/4</span><b>1 · 2 · 3 · 4</b><b>1 · 2 · 3 · 4</b><span>Bailarín · mismo recorrido</span><b>1 · 2 · 3 · 4</b><b>5 · 6 · 7 · 8</b></div>
    <p class="small">Esquema didáctico de conteo, no transcripción de una canción ni medida fija de sus frases.</p>
    <details><summary>Qué partes puedes escuchar</summary><ul>
      <li><strong>Introducción y cuerpo:</strong> presentación y desarrollo de la melodía o relato.</li>
      <li><strong>Coro y respuesta:</strong> frases repetidas que alternan con el cantante; puede haber improvisación y riffs instrumentales.</li>
      <li><strong>Montuno:</strong> también nombra el patrón repetido y sincopado del piano; no siempre significa lo mismo que una sección.</li>
    </ul><p class="small">Ejemplo estudiado: «Mi Gente», Héctor Lavoe. No todas las canciones repiten esta forma. </p></details>
    <details><summary>Instrumentos y función dentro del conjunto</summary><div class="music-table-scroll"><table><thead><tr><th>Capa</th><th>Qué escuchar</th></tr></thead><tbody>
      <tr><td>Voz y coro</td><td>Relato, pregunta y respuesta.</td></tr>
      <tr><td>Piano y bajo</td><td>Patrones de acompañamiento; el bajo puede anticipar cambios armónicos.</td></tr>
      <tr><td>Congas, bongó, timbales</td><td>Percusión de tambores.</td></tr>
      <tr><td>Claves, güiro, maracas y campanas</td><td>Capas de percusión; la clave también puede quedar implícita.</td></tr>
      <tr><td>Trompetas, trombones y otros vientos</td><td>Melodías y riffs; depende de la plantilla.</td></tr>
    </tbody></table></div><p class="small">Lista orientativa, no obligatoria ni exhaustiva. No fija cuándo entra cada instrumento. </p></details>
    <details><summary>Qué cambia entre formatos y arreglos</summary><ul>
      <li><strong>Conjunto de son montuno:</strong> referencia con trompetas, piano, bajo, bongó y congas; puede incluir tres.</li>
      <li><strong>Charanga:</strong> destaca flauta y violines, con una plantilla distinta; el nombre describe instrumentación.</li>
      <li><strong>Songo y timba:</strong> pueden incorporar batería, sintetizador u otras combinaciones. No son nombres alternativos de Break on 1 o Break on 2.</li>
    </ul><p class="small">Son ejemplos musicales, no una clasificación completa de la salsa. </p>
    <p>En la timba, coro, voz solista y mambo pueden superponerse; un cambio de tumbao puede señalar otra sección. El orden no es una receta fija.</p></details>
  `;
  const panel=window.CompasView.disclosure('Cómo componen y organizan la música los músicos','musicLessonReference');panel.append(section);const videos=document.getElementById('uxVideos');if(videos)videos.before(panel);else task.after(panel);
  function update(){
    panel.hidden=false;
    const contextual=document.querySelector<HTMLElement>('.expert-context');if(contextual)contextual.hidden=true;
  }
  new MutationObserver(update).observe(title,{childList:true,characterData:true,subtree:true});update();
})();
