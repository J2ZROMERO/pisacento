// GENERATED from src/selection-analytics.ts; edit the TypeScript source.
"use strict";
(function () {
    const id = window.PisacentoAnalyticsConfig?.measurementId || '';
    // Never send development traffic or load a provider without a configured property.
    if (!/^G-[A-Z0-9]+$/.test(id) || /^(localhost|127\..*|\[::1\])$/.test(location.hostname))
        return;
    window.dataLayer = window.dataLayer || [];
    const send = (...args) => window.dataLayer.push(args);
    send('js', new Date());
    send('config', id, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location.origin + location.pathname,
        page_title: 'Pisacento'
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.append(script);
    const value = (id) => document.getElementById(id)?.value || '';
    const event = (kind, selection) => send('event', 'practice_selection', {
        selection_type: kind, selection_value: selection,
        counting_style: value('rpStyle'), practice_mode: value('rpMode'), dance_role: value('rpRole')
    });
    const fields = {
        mixQuickSelect: 'instrument_solo', rpStyle: 'counting_style', rpMode: 'practice_mode', rpRole: 'dance_role', rpPattern: 'rhythm', rpMove: 'movement'
    };
    document.addEventListener('change', e => {
        const target = e.target;
        if (!e.isTrusted || !fields[target.id])
            return;
        event(fields[target.id], target.value);
    });
    document.addEventListener('click', e => {
        if (!e.isTrusted || !(e.target instanceof Element))
            return;
        const button = e.target.closest('button');
        if (!button)
            return;
        const exercise = !!button.closest('#learningLessons') || ['learningDone', 'learningPrevious'].includes(button.id);
        const instrument = button.dataset.instrument;
        // Read after the app handles the action, including Next/Previous navigation.
        queueMicrotask(() => {
            if (exercise) {
                event('exercise', document.getElementById('learningTitle')?.textContent?.trim() || '');
            }
            else if (instrument) {
                send('event', 'instrument_toggle', {
                    instrument,
                    enabled: document.querySelector(`[data-instrument="${instrument}"]`)?.getAttribute('aria-pressed') === 'true' ? 'on' : 'off',
                    counting_style: value('rpStyle')
                });
            }
            else if (button.id === 'learningApply') {
                event('repeat_exercise', document.getElementById('learningTitle')?.textContent?.trim() || '');
            }
        });
    }, true);
})();
//# sourceMappingURL=generated/selection-analytics.js.map