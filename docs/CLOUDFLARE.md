# GitHub → Cloudflare Pages

1. Push the project folder contents to GitHub, with package.json at repository root.
2. In Cloudflare, create a **Pages** project and connect your repository.
3. Framework: None. Branch: main. Build: `npm run build`. Output: `dist`. Root: empty.
4. Node 22 is selected through `.node-version`; npm dev dependencies are required for compilation.
5. Optionally set `GA4_MEASUREMENT_ID` for production. See ANALYTICS.md.
6. Deploy. Further pushes rebuild and publish automatically.

Do not upload node_modules or dist to Git. Pages hosts only dist, the same directory the local preview serves. Do not select Workers Builds or configure a Worker deploy command. Existing Direct Upload projects require a new Pages project for Git integration.

Official docs: https://developers.cloudflare.com/pages/get-started/git-integration/
