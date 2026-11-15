// Refresh the handoff inventory after intentional source changes. ZIP is created separately.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const ignored = new Set(['node_modules', '.git']);
const files = [];
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(full);
    else if (entry.name !== 'EXPORT_MANIFEST.json') {
      const content = fs.readFileSync(full);
      files.push({ path: path.relative(root, full).replaceAll('\\', '/'), bytes: content.length,
        sha256: crypto.createHash('sha256').update(content).digest('hex') });
    }
  }
}
scan(root);files.sort((a,b) => a.path.localeCompare(b.path));
fs.writeFileSync(path.join(root, 'EXPORT_MANIFEST.json'), JSON.stringify({ project:'Compas TypeScript starter', snapshot_date:'2026-11-01', files }, null, 2));
console.log(`Inventory updated: ${files.length} files; installed dependencies excluded.`);
