import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
mkdirSync(output, { recursive: true });
for (const item of ['index.html', 'privacidade.html', 'termos.html', 'aviso-legal.html', '404.html', '_headers', 'robots.txt', 'sitemap.xml', 'assets', 'css', 'js']) {
  cpSync(path.join(root, item), path.join(output, item), { recursive: true });
}
console.log('Site pronto em dist/');
