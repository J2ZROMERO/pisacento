(()=>{
const first=document.querySelector('.ux-live .rp-layout>div:first-child');
const rows=['rpCounts','rpHits','rpSteps'].map(id=>document.getElementById(id));
const scroll=document.createElement('div');scroll.className='rhythm-matrix-scroll';scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Conteo, instrumentos y pisadas. Desplaza horizontalmente para ver los ocho tiempos.');
const content=document.createElement('div');content.className='rhythm-matrix-content';scroll.append(content);first.insertBefore(scroll,rows[0].previousElementSibling);
for(const row of rows)content.append(row.previousElementSibling,row);
const hint=document.createElement('p');hint.className='matrix-scroll-hint';hint.textContent='↔ Desliza la tabla para ver los ocho tiempos. Las tres filas se desplazan juntas.';scroll.before(hint);
})();
