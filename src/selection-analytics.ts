interface Window {
  PisacentoAnalyticsConfig?: { measurementId: string };
  dataLayer?: unknown[][];
}
(function () {
  const id = window.PisacentoAnalyticsConfig?.measurementId || '';
  // Never send development traffic or load a provider without a configured property.
  if (!/^G-[A-Z0-9]+$/.test(id) || /^(localhost|127\..*|\[::1\])$/.test(location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  const send = (...args: unknown[]) => window.dataLayer!.push(args);
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
  const value = (id: string) => (document.getElementById(id) as HTMLSelectElement | null)?.value || '';
  const event = (kind: string, selection: string) => send('event', 'practice_selection', {
    selection_type: kind, selection_value: selection,
    counting_style: value('rpStyle'), practice_mode: value('rpMode'), dance_role: value('rpRole')
  });
  const fields: Record<string, string> = {
    mixQuickSelect: 'instrument_solo', rpStyle: 'counting_style', rpMode: 'practice_mode', rpRole: 'dance_role', rpPattern: 'rhythm', rpMove: 'movement'
  };
  document.addEventListener('change', e => {
    const target = e.target as HTMLSelectElement;
    if (!e.isTrusted || !fields[target.id]) return;
    event(fields[target.id], target.value);
  });
  document.addEventListener('click', e => {
    if (!e.isTrusted || !(e.target instanceof Element)) return;
    const button = e.target.closest('button');
    if (!button) return;
    const exercise = !!button.closest('#learningLessons') || ['learningDone', 'learningPrevious'].includes(button.id);
    const instrument = button.dataset.instrument;
    // Read after the app handles the action, including Next/Previous navigation.
    queueMicrotask(() => {
      if (exercise) {
        event('exercise', document.getElementById('learningTitle')?.textContent?.trim() || '');
      } else if (instrument) {
        send('event', 'instrument_toggle', {
          instrument,
          enabled: document.querySelector(`[data-instrument="${instrument}"]`)?.getAttribute('aria-pressed') === 'true' ? 'on' : 'off',
          counting_style: value('rpStyle')
        });
      } else if (button.id === 'learningApply') {
        event('repeat_exercise', document.getElementById('learningTitle')?.textContent?.trim() || '');
      }
    });
  }, true);
})();
