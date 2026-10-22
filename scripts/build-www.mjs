// Copies the single-file web app into www/, the folder Capacitor packages into the native apps.
import { mkdirSync, copyFileSync, existsSync, cpSync } from 'node:fs';

mkdirSync('www', { recursive: true });
for (const file of ['index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png']) {
  if (existsSync(file)) copyFileSync(file, `www/${file}`);
}
if (existsSync('models')) cpSync('models', 'www/models', { recursive: true });
console.log('Copied web app to www/');
