// GENERATED from src/view-components.ts; edit the TypeScript source.
"use strict";
(function () {
    function section(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }
    function disclosure(title, id) {
        const element = section('details', 'ux-disclosure');
        if (id)
            element.id = id;
        const summary = document.createElement('summary');
        summary.textContent = title;
        element.append(summary);
        return element;
    }
    // Legacy controllers still write these nodes. Retain their state contract, but expose one canonical view.
    function concealManaged(ids) {
        for (const id of ids) {
            const element = document.getElementById(id);
            if (element) {
                element.hidden = true;
                element.dataset.viewOwner = 'canonical-control-elsewhere';
            }
        }
    }
    window.CompasView = { section, disclosure, concealManaged };
})();
//# sourceMappingURL=generated/view-components.js.map