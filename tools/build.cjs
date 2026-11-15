const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const compiler = require.resolve('typescript/bin/tsc');
const result = spawnSync(process.execPath, [compiler, '-p', path.join(root, 'tsconfig.json')], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);
for (const name of fs.readdirSync(path.join(root, 'src'))) {
  if (!name.endsWith('.ts') || name.endsWith('.d.ts')) continue;
  const output = name.replace(/\.ts$/, '.js');
  const content = fs.readFileSync(path.join(root, 'generated', output), 'utf8')
    .replace(/\/\/# sourceMappingURL=.*/, `//# sourceMappingURL=generated/${output}.map`);
  fs.writeFileSync(path.join(root, output), '// GENERATED from src/' + name + '; edit the TypeScript source.\n' + content);
}
console.log('Built strict TypeScript modules; legacy Salsa scripts remain unchanged.');
