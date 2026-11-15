// GENERATED from src/bachata-instrument-ui.ts; edit the TypeScript source.
"use strict";
(() => {
    const { album, source, instruments, playerUrl, slots } = window.CompasBachataInstruments;
    const section = document.getElementById('bachataSection');
    if (!section)
        return;
    const panel = document.createElement('section');
    panel.id = 'bcInstruments';
    panel.className = 'bc-instruments';
    panel.setAttribute('aria-labelledby', 'bcInstrumentsTitle');
    panel.innerHTML = `<p class="eyebrow">ESCUCHA REAL · CINCO INSTRUMENTOS</p><h2 id="bcInstrumentsTitle">Conoce los sonidos de la bachata</h2><p>Elige un instrumento y pulsa ▶ en el reproductor para escuchar su ejemplo publicado por iASO Records. Grabaciones de <em>Bachata Breakdown</em>, Carlos Cinta y Joan Soriano.</p><div class="bc-instrument-controls"><label>Instrumento<select id="bcInstrument">${Object.entries(instruments).map(([key, i]) => `<option value="${key}">${i.name}</option>`).join('')}</select></label><label id="bcCountedLabel">Ejemplo<select id="bcCounted"><option value="sample">Instrumento · ejemplo original</option><option value="counted">Con conteo hablado del instructor</option></select></label></div><div id="bcInstrumentInfo" aria-live="polite"></div><div id="bcRecording"></div><p id="bcRecordingStatus" class="small" role="status"></p><p class="small">Este reproductor conserva el tempo y el conteo originales. Los pies y el metrónomo de la app son una práctica independiente: no siguen automáticamente esta grabación. Al cargar un ejemplo se pausa la práctica; detén el reproductor antes de retomarla.</p><details><summary>¿Dónde aparece en el conteo? · patrón escrito de derecho</summary><p>«Derecho» es un ritmo musical; tradicional, moderna y sensual son contextos de baile. La tabla muestra un patrón de práctica, no una transcripción de la pista que escuchas.</p><div id="bcInstrumentGrid" class="bc-instrument-scroll"></div><p id="bcInstrumentPattern" class="small"></p></details><details><summary>Sobre el audio</summary><p>Publicación de iASO Records: Bachata Breakdown. Producción: Carlos Cinta y Benjamin de Menil. Música de Joan Soriano. Se utiliza el reproductor de Bandcamp; no se descargan ni redistribuyen las pistas.</p><p>La reproducción depende de internet y de la disponibilidad y límites de escucha del proveedor. No se sustituyen güira, guitarras o bongó por sonidos electrónicos. El ejemplo puede incluir otras capas; no prometemos pistas separadas sin haber verificado su aislamiento.</p></details>`;
    const listening = window.CompasView.disclosure('Escuchar instrumentos reales · recurso independiente', 'bcListening');
    listening.classList.add('bc-listening');
    section.querySelector('.bc-evidence')?.before(listening);
    listening.append(panel);
    const $ = (id) => { const e = document.getElementById(id); if (!e)
        throw Error('Missing element: ' + id); return e; };
    const select = (id) => { const e = $(id); if (!(e instanceof HTMLSelectElement))
        throw Error('Expected select: ' + id); return e; };
    let request = 0;
    const reload = document.createElement('button');
    reload.textContent = 'Cargar / reiniciar ejemplo real';
    reload.className = 'bc-reload-recording';
    $('bcRecording').before(reload);
    reload.onclick = () => render();
    function pausePractice() { const b = $('bcPlay'); if (b && b.textContent?.includes('Pausar'))
        b.click(); }
    function unload() { request++; $('bcRecording').replaceChildren(); $('bcRecordingStatus').textContent = 'Ejemplo detenido.'; }
    function render() {
        pausePractice();
        const key = select('bcInstrument').value, i = instruments[key], counted = select('bcCounted').value === 'counted' && i.countTrack;
        const id = counted && i.countTrack ? i.countTrack : i.track, slug = counted ? i.countSlug : i.slug;
        $('bcCountedLabel').hidden = !i.countTrack;
        if (!i.countTrack)
            select('bcCounted').value = 'sample';
        $('bcInstrumentInfo').innerHTML = `<div class="bc-instrument-heading"><span aria-hidden="true" class="bc-instrument-icon">${i.icon}</span><div><h3>${i.name}</h3><span>${i.role}</span></div><span class="bc-real-badge">Grabación publicada</span></div><p>${i.note}</p><p class="small">Pista: ${counted ? 'versión con conteo del instructor' : i.original} · </p>`;
        const iframe = document.createElement('iframe');
        iframe.title = 'Audio real de ' + i.name + ' · iASO Records / Bandcamp';
        iframe.src = playerUrl(id);
        iframe.setAttribute('allow', 'encrypted-media');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        const current = ++request;
        iframe.onload = () => { if (current === request)
            $('bcRecordingStatus').textContent = 'Pulsa ▶ en Bandcamp. La reproducción depende de la disponibilidad de Bandcamp.'; };
        $('bcRecording').replaceChildren(iframe);
        $('bcRecordingStatus').textContent = 'Cargando reproductor oficial…';
        const hits = slots(key);
        $('bcInstrumentGrid').innerHTML = hits ? `<div class="bc-written-grid">${Array.from({ length: 16 }, (_, n) => `<div><b>${n % 2 ? '&' : n / 2 + 1}</b><span class="${hits.includes(n) ? 'hit' : ''}">${hits.includes(n) ? i.bassHits ? (i.bassHits.includes(n % 8) ? 'nota' : 'rasgueo') : i.accents.includes(n % 8) ? 'acento' : '●' : '—'}</span></div>`).join('')}</div>` : '<p>Sin patrón único: escucha la melodía en su contexto.</p>';
        $('bcInstrumentPattern').textContent = hits ? 'Dos compases de 4/4 contados como 1–8. Son ataques del instrumento, no órdenes para cambiar el peso. No indica alturas ni duraciones exactas.' : 'No asignamos golpes fijos a una melodía variable.';
    }
    $('bcInstrument').onchange = render;
    $('bcCounted').onchange = render;
    // A new practice must not sound over a recording that may still be playing.
    $('bcPlay').addEventListener('click', unload, true);
    window.addEventListener('hashchange', () => { if (location.hash !== '#bachata')
        unload();
    else if (listening.open && !$('bcRecording').children.length)
        render(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden)
        unload(); });
    // The provider is only contacted once the user chooses Bachata.
    listening.addEventListener('toggle', () => { if (listening.open)
        render();
    else
        unload(); });
})();
//# sourceMappingURL=generated/bachata-instrument-ui.js.map