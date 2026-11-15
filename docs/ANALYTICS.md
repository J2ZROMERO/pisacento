# Selection metrics

Cloudflare Web Analytics measures visits, not custom selection events. This app includes Google Analytics 4 event instrumentation, disabled until configured.

1. Create a GA4 property and Web data stream for the published website.
2. Set its Measurement ID (`G-…`) as the `GA4_MEASUREMENT_ID` build environment variable in Cloudflare.
3. Run `npm run build:static` and publish `dist` again. 
4. In GA4 Admin → Data display → Custom definitions, create event-scoped dimensions for `selection_type`, `selection_value`, `counting_style`, `practice_mode`, `dance_role`, `instrument`, and `enabled`.
5. In Explore, create a table with selection_type and selection_value as rows, Event count as the value, and filter Event name = practice_selection. This ranks choices. For instruments filter Event name = instrument_toggle, enabled = on, and use instrument as the row.

Events record explicit user choices, including exercise navigation and repeats. Defaults and programmatic lesson changes are not counted as user selections. Counts represent selections, not unique people or time spent practicing. Localhost is excluded. Use GA4 Realtime to verify on the published site; standard reports/custom dimensions can take 24–48 hours after configuration. Ad blockers may prevent collection.

No typed input, song URLs, identity, audio, or full page query strings are sent by this instrumentation. Google Analytics itself uses its own collection/storage mechanisms. Google signals and ad personalization are disabled. Account for any notice/consent requirements applicable to your visitors before activating analytics.

The ZIP alone cannot provision a GA4 account or dashboard. An empty Measurement ID means no analytics provider is loaded and no events are transmitted.

Documentation: https://developers.cloudflare.com/web-analytics/faq/ · https://developers.google.com/analytics/devguides/collection/ga4/events · https://developers.google.com/analytics/devguides/collection/ga4/event-parameters
