import { build } from 'esbuild';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const base = '/morish-portfolio';
const assets = resolve(root, 'assets/portfolio');
await mkdir(assets, {recursive:true});
await mkdir(resolve(here, '.build'), {recursive:true});
const sourcePlugin = {
  name: 'static-pages',
  setup(b) {
    b.onResolve({filter:/^@tanstack\/react-router$/}, () => ({path:resolve(here,'router.tsx')}));
    b.onResolve({filter:/^@\//}, args => ({path:resolve(here,'src',args.path.slice(2)) + (extname(args.path) ? '' : '.tsx')}));
    // Content and graph are TypeScript rather than TSX.
    b.onLoad({filter:/\.(tsx?|css)$/}, async args => {
      if (args.path.endsWith('.css')) return {contents:'',loader:'js'};
      let filename = args.path;
      let text;
      try { text = await readFile(filename,'utf8'); }
      catch(error) { if (!filename.endsWith('.tsx')) throw error; filename=filename.slice(0,-1); text=await readFile(filename,'utf8'); }
      text = text.replace(/(["'`])\/(assets|case)\//g, '$1'+base+'/$2/').replace(/(["'])\/lab\1/g, '$1'+base+'/lab/$1');
      if (filename.replaceAll('\\','/').endsWith('/components/site/parts.tsx')) text = text.replace(/href="#/g,'href="'+base+'/#');
      return {contents:text,loader:filename.endsWith('.tsx')?'tsx':'ts',resolveDir:dirname(filename)};
    });
  },
};
const options = {absWorkingDir:here,bundle:true,jsx:'automatic',plugins:[sourcePlugin],define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'};
await build({...options,entryPoints:['server.tsx'],outfile:'.build/render.mjs',format:'esm',platform:'node',external:['react','react-dom/server','react/jsx-runtime']});
const browser = await build({...options,entryPoints:['client.tsx'],write:false,format:'esm',platform:'browser',minify:true,target:['es2022']});
const js = browser.outputFiles[0].text;
const css = await readFile(resolve(here,'src/site/site.css'),'utf8')+'\n'+await readFile(resolve(here,'src/site/system.css'),'utf8');
const revision = createHash('sha256').update(js).update(css).digest('hex').slice(0,12);
await writeFile(resolve(assets,'app.js'),js);
await writeFile(resolve(assets,'site.css'),css);
await cp(resolve(here,'public/assets'),resolve(root,'assets'),{recursive:true});
const api = await import(pathToFileURL(resolve(here,'.build/render.mjs')).href+'?v='+revision);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const records=[{page:'home',slug:'',path:'index.html',url:'/',title:'Morish Macayan — Applied Curiosity',description:'Web products, machine learning, interactive experiments, and the evidence behind the work.'},
  {page:'lab',slug:'',path:'lab/index.html',url:'/lab/',title:'The Lab — Morish Macayan',description:'Interactive experiments and games by Morish Macayan.'},
  ...api.cases.map(c=>({page:'case',slug:c.slug,path:'case/'+c.slug+'/index.html',url:'/case/'+c.slug+'/',title:c.title+' — Morish Macayan',description:c.lede}))];
for(const r of records){
  const canonical='https://moriyamao.github.io'+base+r.url;
  const html='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#e7ece5"><title>'+esc(r.title)+'</title><meta name="description" content="'+esc(r.description)+'"><link rel="canonical" href="'+canonical+'"><meta property="og:title" content="'+esc(r.title)+'"><meta property="og:description" content="'+esc(r.description)+'"><meta property="og:type" content="website"><meta property="og:url" content="'+canonical+'"><meta property="og:image" content="https://moriyamao.github.io'+base+'/assets/brand/og.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="'+base+'/assets/brand/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,75..125,300..900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="'+base+'/assets/portfolio/site.css?v='+revision+'"></head><body><a class="skip-link" href="#portfolio-root">Skip to content</a><div id="portfolio-root" data-page="'+r.page+'" data-slug="'+r.slug+'">'+api.render(r.page,r.slug)+'</div><script type="module" src="'+base+'/assets/portfolio/app.js?v='+revision+'"></script></body></html>\n';
  await mkdir(dirname(resolve(root,r.path)),{recursive:true});
  await writeFile(resolve(root,r.path),html);
}
await writeFile(resolve(root,'.nojekyll'),'');
await writeFile(resolve(here,'.build/manifest.json'),JSON.stringify({revision,records,projectCount:api.allProjects.length,showcase:api.showcase.map(p=>p.key),credentials:api.credentials.length},null,2));
console.log('Built '+records.length+' static pages; '+api.allProjects.length+' projects; '+api.credentials.length+' credentials. Revision '+revision);
