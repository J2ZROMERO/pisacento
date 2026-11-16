# Selection metrics

## Cloudflare visitors and page views

The public token supplied by the owner for pisacento.pages.dev is configured in `tools/build.cjs`. The default build now includes the manual beacon. No environment variable is required. Disable Pages automatic injection to avoid duplicate tracking. An explicitly empty `CLOUDFLARE_WEB_ANALYTICS_TOKEN` omits the manual beacon.

For a different site, choose ONE installation method:

- Automatic: Workers & Pages → pisacento → Metrics → Enable Web Analytics, then redeploy production. Pages adds its beacon to the HTML served to visitors.
- Manual: copy the public `token` value from Web Analytics → your site → JS Snippet installation. Set `CLOUDFLARE_WEB_ANALYTICS_TOKEN` as a production **build** environment variable (32 hexadecimal characters), then redeploy. The build includes the beacon in `dist/index.html`. Do not also enable automatic injection. This public site token is not a Cloudflare API credential.

Verify the published page source contains `https://static.cloudflareinsights.com/beacon.min.js` and `data-cf-beacon` with the token of the dashboard site. In browser DevTools → Network, reload and look for `beacon.min.js`, then a request to `/cdn-cgi/rum` after leaving the page. Check for blocked requests, disable the test browser's blocker for this site, and allow a few minutes for the dashboard to update. A local preview is not the published domain. No CSP in this project blocks either endpoint; if you add a CSP later, follow Cloudflare's CSP guidance.

## GA4 exercise and instrument selections

Cloudflare Web Analytics measures visits, not custom selection events. This app includes Google Analytics 4 event instrumentation, disabled until configured.

1. Create a GA4 property and Web data stream for the published website.
2. Set its Measurement ID (`G-…`) as the `GA4_MEASUREMENT_ID` build environment variable in Cloudflare.
3. Run `npm run build:static` and publish `dist` again. 
4. In GA4 Admin → Data display → Custom definitions, create event-scoped dimensions for `selection_type`, `selection_value`, `counting_style`, `practice_mode`, `dance_role`, `instrument`, and `enabled`.
5. In Explore, create a table with selection_type and selection_value as rows, Event count as the value, and filter Event name = practice_selection. This ranks choices. For instruments filter Event name = instrument_toggle, enabled = on, and use instrument as the row.

Events record explicit user choices, including exercise navigation and repeats. Defaults and programmatic lesson changes are not counted as user selections. Counts represent selections, not unique people or time spent practicing. Localhost is excluded. Use GA4 Realtime to verify on the published site; standard reports/custom dimensions can take 24–48 hours after configuration. Ad blockers may prevent collection.

No typed input, song URLs, identity, audio, or full page query strings are sent by this instrumentation. Google Analytics itself uses its own collection/storage mechanisms. Google signals and ad personalization are disabled. Account for any notice/consent requirements applicable to your visitors before activating analytics.

The repository alone cannot provision a GA4 account or dashboard. An empty Measurement ID disables GA4 only; it does not disable an independently installed Cloudflare beacon.

Documentation: https://developers.cloudflare.com/web-analytics/faq/ · https://developers.google.com/analytics/devguides/collection/ga4/events · https://developers.google.com/analytics/devguides/collection/ga4/event-parameters
