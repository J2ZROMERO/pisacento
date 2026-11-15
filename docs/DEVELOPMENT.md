> TypeScript update: read TYPESCRIPT.md first. For migrated modules edit src/*.ts, then build; similarly named root JavaScript files are generated.

# Extending this starter

## First changes

Run the snapshot and tests before refactoring. Keep the original copy as a reference. Use a different PORT when comparing both apps. Create your own repository in this directory if desired; no Git history or repository metadata was exported.

## Add a teaching concept

1. Find primary teaching or musical material and record precisely what was reviewed.
2. Separate the documented claim from your chosen visualization/exercise.
3. Add a source URL, attribution, locator and limits in the relevant data/audit files.
4. Define counts, supports, taps and trajectories explicitly. Do not infer directions from a style name.
5. Add only meaningful tests of boundary behavior and continuity, then check the interface on mobile and desktop.

For Salsa, update `practice-data.js` and `evidence-data.js` together; the allowlist may intentionally hide a new entry. Check `learning-path.js`, role transformations and `unified-feet.js`. For Bachata, start in `bachata-data.js`; its current exercise has no traveling foot trajectories.

## Add an instrument

Treat instrument identity, recording provenance, rhythmic attacks and dance use as four separate claims. Local recordings require documented redistribution rights and a manifest hash. An embed must preserve the original provider and attribution. Never invent pitches or articulations and present them as a documented performance.

`bachata-instruments.js` has `track`, optional `countTrack`, original title, source slugs and a written event model. Its `slots()` repeats one four-beat pattern across the eight-count. `hits: null` explicitly means no fixed grid. Update tests when adding another approved reference.

## Future synchronized Bachata

The current external player cannot drive the feet. A proper implementation needs licensed audio under app control, a verified timing map (including initial downbeat and tempo variations), one shared playback clock and clear behavior for pause/seek/rate changes. Validate against recordings and teacher review. Do not animate feet against an unrelated timer and label that synchronization.

## Optional analysis

See `requirements-local-lock.txt`, `local_analyzer.py` and `COMPARACION_MOTORES.md`. Install a new environment compatible with the listed packages and obtain model checkpoints with their original licenses. Do not copy a virtual environment across machines. Analysis is experimental and separate from approved teaching. `/api/health` and an unavailable-model response should not be interpreted as readiness of a complete musical understanding system.

## Recommended refactor boundaries

- Extract explicit genre data and a reusable UI shell without sharing incompatible footwork rules.
- Introduce one documented playback interface for app-controlled audio; retain external examples as an independent mode.
- Replace DOM restructuring scripts gradually, keeping script order and event contracts covered.
- Consolidate CSS only after inspecting the final cascade on 320/390/768/1440 widths.
- Keep source provenance alongside data rather than as a generic list detached from individual claims.
