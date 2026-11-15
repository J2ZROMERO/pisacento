# TypeScript migration

This is an incremental migration, not a claim that every historical script is TypeScript. The original `salsa-compas` project remains unchanged.

## Source of truth

| TypeScript source | Emitted browser / test entry |
| --- | --- |
| `src/contracts.d.ts` | Shared feet, counts, variants, evidence, instruments and timeline contracts |
| `src/bachata-data.ts` | `bachata-data.js` |
| `src/beat-timeline.ts` | `beat-timeline.js` |
| `src/footwork.ts` | `footwork.js` |
| `src/bachata-instrument-data.ts` | `bachata-instrument-data.js` |
| `src/bachata-instrument-ui.ts` | `bachata-instrument-ui.js` |
| `src/genre-home.ts` | `genre-home.js` |

These modules compile under `strict: true` and `noEmitOnError: true`. The migration does not disable checking with `@ts-nocheck` or blanket `any` declarations. DOM helpers check required element presence and select element types. Native select values and calculated counts are narrowed at the UI boundary; TypeScript is not a runtime input validator.

Existing Salsa UI/controllers, evidence controllers, server, tests and Python analysis remain in their original languages. `bachata-instruments.js` is a small CommonJS compatibility entry for the existing test API; the browser now loads the separated data and UI scripts.

## Setup and commands

Install Node.js 18+ and run `npm ci` once. TypeScript is an exact pinned development dependency with `package-lock.json`. Runtime Node dependencies are still built-in modules.

```powershell
npm ci
npm run typecheck
npm run build
npm test
$env:PORT=4320
npm start
```

`prestart` and `pretest` build automatically. `npm run check` checks TypeScript and the existing JavaScript syntax. `tools/build.cjs` compiles to `generated/` and copies browser/test JavaScript entries to the project root. Edit the `.ts` files, not the emitted root copies. Sourcemaps and declarations are in `generated/`; `src/contracts.d.ts` provides their shared global contracts. Classic script execution and globals are retained to avoid changing the legacy script ordering.

## Checks

Existing behavior tests run against emitted files. `test-typescript.cjs` also runs compiled domain modules in a browser-like VM without CommonJS and verifies that referenced script files exist. This does not replace real browser visual/accessibility checks and does not prove external media availability.

## Continue migrating

Next candidates are `practice-data.js` and the Salsa evidence/layer contracts, followed by the playback controller. Model musical attacks and dance supports separately. Migrate a module with meaningful types and regression tests rather than merely renaming files or silencing errors. A later ESM/framework conversion is a separate architectural decision.

## Optional foot-label convention

`src/foot-count-labels.ts` adds a persisted, display-only half-cycle swap in Salsa. It maps 1↔5, 2↔6, 3↔7, 4↔8 on illuminated foot numerals only, preserving subdivisions. The music, count matrix, role, direction and action text retain their original counts. It illustrates a count-label comparison and is not a physical change to solo-class footwork. Source: https://thedancedojo.com/blog/salsa-timing-conventions/ (sections on partner work and shines). `test-foot-count-labels.cjs` verifies reversibility and label boundaries.
