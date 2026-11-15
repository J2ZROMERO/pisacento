# Validation and limits

## Commands

`npm run check` runs strict TypeScript checks and syntax checks on the JavaScript modules. `npm test` first builds the TypeScript source and also verifies emitted browser globals through a VM smoke check. `npm test` runs local deterministic tests for rhythm/timeline behavior, feet, lesson selection, video query behavior, sample integrity, active evidence restrictions and Bachata models. These tests do not certify dance technique or prove arbitrary-song detection accuracy.

`npm run test:backend` is separate; inspect its local server/model prerequisites before running. The optional specialist analyzer needs files excluded from this starter.

## Key invariants

- Salsa support sequences, role transformations and direction conventions must remain consistent.
- Musical-hit indicators must not be mistaken for compulsory dance steps.
- Sample hashes must match the provenance manifest.
- Bachata has six full supports and two taps; 4→5 and 8→1 preserve the next supporting foot.
- Five Bachata instruments map to five distinct original tracks; counted alternatives are distinct tracks.
- Requinto does not acquire a fabricated universal hit grid.
- Starting practice removes external recording playback; selecting a recording pauses practice.

## Manual checks

Open home, both genre routes and legacy Salsa section anchors. Change roles/modes, seek counts, play/pause/reset and change tempo. Inspect localStorage restoration. Test external audio selection/count alternatives, provider failures and going back home. Confirm sources open the intended original pages.

Check 320/390/768/1440 viewport widths. No page-wide overflow should occur; long rhythm matrices may deliberately scroll internally. Use keyboard focus and native select controls. Test reduced-motion preferences and clear labels for taps/supports.

## Existing verification scope

During the original development, the genre routes, mobile layouts, instrument selector, recorded track URLs and iframe loading were inspected in the browser. Programmatic checks do not establish that a person audibly verified every track. External provider availability can change. Screenshots in `docs/screenshots` are historical evidence, not guaranteed to match every current state.

## Remaining limitations

No user study or comprehensive teacher certification. Bachata recording audio is independent of feet timing. No universal first-foot rule. No motion/camera assessment. Automatic song analysis does not recognize every instrument or prove phrase boundaries. Discovery results and archived exercises are not automatically approved teaching material.
