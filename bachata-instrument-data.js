// GENERATED from src/bachata-instrument-data.ts; edit the TypeScript source.
"use strict";
(function (root) {
    const album = 'https://iasorecords.bandcamp.com/album/bachata-breakdown-2', source = 'https://www.iasorecords.com/release/bachata-breakdown-en-vivo';
    const instruments = {
        bongo: { name: 'Bongó', icon: '🥁', track: 523045071, countTrack: 2627586862, slug: 'bongos-sample', countSlug: 'bongos-w-counts', original: 'Bongos sample', role: 'Percusión · dos tambores', note: 'Derecho: golpes ligeros entre acentos. El golpe grave de 4 prepara el siguiente compás.', hits: [0, 1, 2, 3, 4, 5, 6, 7], accents: [0, 4, 6] },
        guira: { name: 'Güira', icon: '▥', track: 1978066535, countTrack: 3165827573, slug: 'guira-sample', countSlug: 'guira-w-counts', original: 'Guira sample', role: 'Percusión · raspador metálico', note: 'Derecho: raspados en tiempos y contratiempos. Escucha la textura del metal.', hits: [0, 1, 2, 3, 4, 5, 6, 7], accents: [] },
        bass: { name: 'Bajo', icon: '🎸', track: 3960230510, countTrack: 1185117297, slug: 'bass-sample', countSlug: 'bass-w-synco-count', original: 'Bass sample', role: 'Cuerdas · registro grave', note: 'Derecho: entradas en 1, 2&, 3 y 4; no todas las notas duran lo mismo.', hits: [0, 3, 4, 6], accents: [0, 4] },
        segunda: { name: 'Guitarra rítmica / segunda', icon: '🎸', track: 671790330, slug: '2nd-guitar-sample', original: '2nd guitar sample', role: 'Cuerdas · acompañamiento', note: 'Derecho: combina notas graves y rasgueos; la tabla distingue ambos ataques.', hits: [0, 1, 2, 3, 4, 5, 6, 7], accents: [], bassHits: [0, 4, 6] },
        requinto: { name: 'Guitarra principal / requinto', icon: '🎸', track: 3014585732, slug: 'lead-guitar-sample', original: 'Lead guitar sample', role: 'Cuerdas · melodía', note: 'La melodía cambia según la canción. No hay una única rejilla válida para todo requinto.', hits: null, accents: [] }
    };
    function playerUrl(id) { return 'https://bandcamp.com/EmbeddedPlayer/album=78863703/size=small/bgcol=ffffff/linkcol=245d4a/track=' + id + '/transparent=true/'; }
    function slots(key) { const i = instruments[key]; return i.hits === null ? null : [...i.hits, ...i.hits.map(n => n + 8)]; }
    const api = { album, source, instruments, playerUrl, slots };
    if (typeof module !== 'undefined')
        module.exports = api;
    else
        root.CompasBachataInstruments = api;
})(typeof window !== 'undefined' ? window : globalThis);
//# sourceMappingURL=generated/bachata-instrument-data.js.map