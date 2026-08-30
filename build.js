import { mkdir, rm, copyFile } from 'node:fs/promises';
const files = ['index.html','styles.css','app.js','core.js'];
await rm('dist', { recursive:true, force:true });
await mkdir('dist');
await Promise.all(files.map((file) => copyFile(file, `dist/${file}`)));
console.log(`Build gereed: ${files.length} bestanden in dist/`);
