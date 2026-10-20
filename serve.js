const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const _STATIC = path.join(__dirname, 'node_modules', '__static__');
const ROOT = fs.existsSync(_STATIC) ? _STATIC : __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Only site files are public. Notes, drafts, the template and the server itself are not.
const BLOCKED = [/^\/\./, /^\/_archive(\/|$)/, /^\/node_modules(\/|$)/, /^\/cases\/_template/,
  /^\/(README|LINKS)\.md$/i, /^\/serve\.js$/, /^\/fline\.json$/, /^\/package(-lock)?\.json$/];

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}

function serve(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  if (!MIME[ext]) { notFound(res); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(500); res.end('Server error'); return; }
    const headers = { 'Content-Type': MIME[ext] };
    if (ext !== '.html') headers['Cache-Control'] = 'public, max-age=3600';
    res.writeHead(200, headers);
    res.end(data);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(url.pathname);

  // Clean URLs: /cases.html -> /cases, /index.html -> /
  if (p.endsWith('.html')) {
    let clean = p.slice(0, -5);
    if (clean.endsWith('/index')) clean = clean.slice(0, -5);
    res.writeHead(301, { Location: (clean || '/') + url.search });
    res.end();
    return;
  }
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p === '' || p === '/') p = '/index.html';

  if (BLOCKED.some((re) => re.test(p))) { notFound(res); return; }

  const filePath = path.join(ROOT, p);
  if (!filePath.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) { serve(filePath, res); return; }
    fs.stat(filePath + '.html', (err2, stat2) => {
      if (!err2 && stat2.isFile()) { serve(filePath + '.html', res); return; }
      notFound(res);
    });
  });
}).listen(PORT, () => console.log(`Listening on ${PORT}`));
