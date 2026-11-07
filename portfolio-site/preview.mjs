import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.pdf':'application/pdf'};
http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    if(!url.pathname.startsWith('/morish-portfolio/')) {res.writeHead(404);res.end('Not found');return;}
    let target=resolve(root,decodeURIComponent(url.pathname.slice('/morish-portfolio/'.length)));
    if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(target)).isDirectory())target=resolve(target,'index.html');
    const data=await readFile(target);res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173/morish-portfolio/'));
