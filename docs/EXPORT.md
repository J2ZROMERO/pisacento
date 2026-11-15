# Snapshot contents

Prepared from sibling directory `salsa-compas` on 2026-11-01. Original files were copied first; this starter subsequently received the incremental TypeScript migration documented in TYPESCRIPT.md. The original app directory is unchanged. A new top-level README and these documents describe the current state. The original README is preserved under `docs/history` because it mixes historical and superseded features.

Included: HTML, JavaScript, CSS, Node server, Python analysis source, configuration, package scripts, tests, dependency lock list, local audio samples/licenses, root synthetic test WAVs, original Markdown audits, benchmark source/results JSON, and historical screenshots (relocated under `docs/screenshots`).

Excluded: `.venv`, caches (`.uv-cache`, `.numba-cache`, `__pycache__`), generated analysis maps, model checkpoint binaries, benchmark-generated WAV/MP3/PCM inputs the empty temporary Bandcamp fetch file, and `node_modules` (restore with `npm ci`). These are machine-specific or generated dependencies/artifacts, not required for the main learning app. No credentials, user browser storage or Git history are included.

`EXPORT_MANIFEST.json` records SHA-256 hashes of the packaged files. `compas-starter.zip` beside this directory contains the starter with its enclosing folder. Use the directory directly to develop; the ZIP is a portable handoff.

Historical analysis benchmark scores are copied records, not a rerun in the exported environment. Recreate generated inputs and separately install analysis dependencies before attempting those experiments.
