# Pisacento

Salsa counting practice: Break on 1 / Break on 2, individual or partner view, lead/follower, foot animation, and three verified instrument samples.

## Run locally

Install Node.js 22, then run from this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4320 . Stop with Ctrl+C. After editing source, restart `npm run dev` to rebuild. To use a different port in PowerShell: `$env:PORT=4321; npm run dev`.

## Cloudflare Pages from GitHub

Push this directory as the repository root. Connect the repository in Cloudflare **Pages**, choosing framework **None**, production branch **main**, build command **npm run build**, output directory **dist**, and an empty root directory. Cloudflare installs npm dependencies and compiles TypeScript before publishing `dist`. Every push to main triggers a deployment. No server or Python is needed in production.

**Cloudflare visitor metrics:** the build includes the Web Analytics beacon with the public site token configured for pisacento.pages.dev. No extra variable is required. Keep Pages automatic injection disabled to avoid duplicate tracking. To use another dashboard site, override `CLOUDFLARE_WEB_ANALYTICS_TOKEN`; set it to an empty string to omit the manually installed beacon. Cloudflare receives browser events through this script, independently of GA4.

**Selection metrics (Google Analytics):** optional production build variable `GA4_MEASUREMENT_ID=G-…`. Without it only GA4 tracking stays off; Cloudflare visitor metrics work independently. See [analytics setup](docs/ANALYTICS.md).

## Structure

- `src/`: browser TypeScript source; edit here.
- `public/`: HTML, CSS, original SVG, three WAV samples and their license/manifest.
- `tools/`: static build and local preview server.
- `tests/`: counting, roles, evidence, foot labels and analytics regression checks.
- `dist/`: generated JavaScript and deployable files, excluded from Git.

Browsers execute the JavaScript compiled into `dist/js`; there are no duplicate JavaScript source files. Some migrated UI controllers temporarily use `@ts-nocheck`; domain behavior is covered by the regression checks. There is no live song analysis, Bachata, video search or unused audio bank.

## Validate

```sh
npm run check
npm test
```
