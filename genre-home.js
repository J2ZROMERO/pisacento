// GENERATED from src/genre-home.ts; edit the TypeScript source.
"use strict";
// Salsa-only entry. Legacy genre modules are retained as source history, not loaded by this page.
(() => {
    const main = document.querySelector('main');
    if (!main)
        return;
    const salsa = document.createElement('section');
    salsa.id = 'salsaSection';
    while (main.firstChild)
        salsa.append(main.firstChild);
    main.append(salsa);
    const intro = salsa.querySelector('.intro');
    if (intro)
        intro.hidden = true;
    for (const id of ['uxVideos', 'uxResources']) {
        const node = document.getElementById(id);
        if (node)
            node.hidden = true;
    }
    const normalize = () => { if (!location.hash || ['#inicio', '#bachata', '#lessonLibrary', '#instrumentos'].includes(location.hash))
        history.replaceState(null, '', '#salsa'); };
    normalize();
    window.addEventListener('hashchange', normalize);
})();
//# sourceMappingURL=generated/genre-home.js.map