import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = fs.readFileSync(path.join(root, 'lib/data.ts'), 'utf8');
const extra = fs.readFileSync(path.join(root, 'lib/fixtures/jaipur-extra.ts'), 'utf8');
const refs = [...data.matchAll(/\/images\/[a-zA-Z0-9_./-]+/g), ...extra.matchAll(/\/images\/[a-zA-Z0-9_./-]+/g)]
  .map(m => m[0].replace(/['")\]]+$/, ''));
const unique = [...new Set(refs)];
let missing = 0;
for (const ref of unique) {
  const p = path.join(root, 'public', ref);
  if (!fs.existsSync(p)) {
    console.error('missing:', ref);
    missing++;
  }
}
if (missing) {
  console.error(`\n${missing} image path(s) missing under public/`);
  process.exit(1);
}
console.log(`ok: ${unique.length} image references verified`);
