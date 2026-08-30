import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json' };
createServer(async (request, response) => {
  const raw = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const file = normalize(join(process.cwd(), raw));
  if (!file.startsWith(process.cwd())) { response.writeHead(403).end('Verboden'); return; }
  try { const body = await readFile(file); response.writeHead(200, { 'content-type':types[extname(file)] || 'application/octet-stream' }); response.end(body); }
  catch { response.writeHead(404).end('Niet gevonden'); }
}).listen(port, '127.0.0.1', () => console.log(`Hussel draait op http://localhost:${port}`));
