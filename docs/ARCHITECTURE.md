# Architecture and driving logic

## Runtime

`server.cjs` serves this directory on 127.0.0.1 using built-in Node HTTP/filesystem modules. It validates host/origin for local APIs. `index.html` loads classic scripts in order; six modules now originate in strict TypeScript under `src/` and are emitted by `npm run build`. Remaining controllers are legacy JavaScript. There is no bundler or framework. See TYPESCRIPT.md for source ownership. Preserve script order until globals are converted to explicit imports.

## Module map

| Files | Responsibility |
| --- | --- |
| `genre-home.js`, `genres.css` | Wrap the existing Salsa interface; create home cards and independent Bachata route/clock/feet |
| `bachata-data.js` | Bachata sources, variant context, deterministic support/tap sequence |
| `src/bachata-instrument-data.ts`, `src/bachata-instrument-ui.ts` | Five real recording selections, official iframe, source links, written derecho grid |
| `practice-data.js`, `footwork.js` | Salsa frame calculations, style/role sequences and historical exercises |
| `evidence-data.js` | Runtime allowlist: restrict exposed musical and step content to reviewed references |
| `evidence-ui.js`, `expert-content.js` | Per-pattern evidence and contextual musician/teacher references |
| `rhythm-practice.js` | Salsa practice controller, playback, matrix and event coordination |
| `instrument-samples.js`, `salsa-layers.js` | Local sample playback and musical layer definitions |
| `learning-path.js` | Salsa route, stage content, self-assessed completion and progress |
| `learning-layout.js`, `unified-feet.js` | Progressive disclosure and one role-aware feet view |
| `mix-controls.js`, `responsive-layout.js` | Visible instrument selection and aligned count/instrument/step matrix |
| `style.css`, `responsive.css` | Base and responsive styles; later files can override earlier styles |
| `lesson-data.js`, `video-library.js`, `video-search.cjs` | Historical video library/discovery; results are not automatically evidence-verified |
| `app.js`, `analysis-worker.js`, `beat-timeline.js` | Legacy playback/analysis and timeline functionality |
| `local_analyzer.py`, `benchmark/` | Optional specialist audio analysis and reproducibility scripts |

## Bootstrap and navigation

Salsa scripts initialize before `genre-home.js` wraps the main content. The wrapper hides/shows sections rather than rebuilding Salsa. Empty hash or `#inicio` shows home, `#bachata` shows Bachata, other nonempty hashes show Salsa (including old section anchors). `#salsa` is the standard Salsa entry. This preserves original anchors but is not a general-purpose router.

## Independent musical and dance models

An instrument attack does not imply a step. Salsa renders counts, musical hits and foot supports in separate aligned rows. Its recorded samples and visuals use the practice controller's audio timing. On1 and New York On2 both use six supports but differ in change-of-direction conventions. Role and orientation must be applied explicitly.

Bachata `frame(count, firstFoot)` uses the relative foot sequence `[0,1,0,1,1,0,1,0]`. Counts 4 and 8 are taps with `weight: null`. Therefore the foot tapping at 4 supports at 5 and the foot tapping at 8 supports at the next 1. The first foot is user-selectable rather than imposed as a universal role rule. The partner diagram shows the complementary foot convention, rotated to face the user. It does not model leading, hand connection or body technique.

## Evidence gate

`CompasEvidence.apply()` filters historical Salsa options. Inspect that allowlist before assuming that a data entry is visible or approved. Each active reference needs source, scope, precise events and sample provenance. Basic steps and musical hits have separate evidence.

## Bachata recording lifecycle

Instrument selection chooses a verified Bandcamp track ID from album 78863703. A new iframe replaces the old one, stopping the previous stream. Loading an example pauses Bachata practice. Starting local practice removes the iframe; returning home or hiding the page also unloads it. Reload button restores the chosen example. No downloaded or synthesized substitute is used in this panel.

Bandcamp offers no integrated clock here. The written derecho grid is a source-based summary and is NOT a transcription or live visualization of the selected recording. Requinto has no fixed grid. Dance variants are not the same classification as musical sections (derecho/majao/mambo).

## Events and persistence

Browser `CustomEvent` messages connect controllers. Examples: `compas:lesson-play` stops Salsa practice; `compas:practice-context` updates layout/role displays; `compas:practice-seek` pauses and shows a chosen Salsa count; `compas:mix-state` and tick events update sound indicators. Search emitters and listeners together before changing an event contract.

Salsa learning progress is stored under `compas-learning-v1`; other preferences use localStorage keys in their owning modules. Bachata selections/progress are not a complete persisted course system. There is no user account or database. Embedded providers and remote media still make network requests.
