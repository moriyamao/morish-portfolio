const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {pathToFileURL}=require('node:url');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'portfolio-site/.build/manifest.json'),'utf8'));

test('all 22 projects appear exactly once in the connected map and four curated projects resolve to case studies',async()=>{
 const data=await import(pathToFileURL(path.join(root,'portfolio-site/.build/render.mjs')).href);
 assert.equal(data.allProjects.length,22);
 assert.equal(new Set(data.allProjects.map(p=>p.key)).size,22);
 assert.deepEqual(data.showcase.map(p=>p.key),['habitat','leakagelens','travelease','flyrank']);
 for(const p of data.showcase)assert.ok(p.href.startsWith('/morish-portfolio/case/'),p.title);
 for(const key of ['tutorialcheck','data-scout','mlp','ultrasound','resilience','alx','hotel','trace','marketwise','catalyst','last-tenant','solace','celeste','thriftnest','furever','forma','torque','common-ground'])assert.ok(data.allProjects.some(p=>p.key===key),key);
 assert.equal((html.match(/class="universe-node"/g)||[]).length,22);
 assert.equal((html.match(/class="showcase-card"/g)||[]).length,4);
});
test('23 certificates are visible as links, with no closed disclosure around them',()=>{
 assert.equal((html.match(/class="credential-card"/g)||[]).length,23);
 assert.match(html,/href="#certifications"/);
 assert.match(html,/<section[^>]*id="certifications"/);
 assert.ok(!/<details[^>]*id="certifications"/.test(html));
});
test('every generated page loads its assets and internal links under the GitHub project base',()=>{
 for(const r of manifest.records){
  const text=fs.readFileSync(path.join(root,r.path),'utf8');
  assert.match(text,/data-page=/);
  assert.ok(!/\b(?:href|src)="\/(?:assets|case|lab)(?:\/|")/.test(text),r.path);
  assert.ok(!text.includes('higgsfield.app'),r.path+' depends on Higgsfield');
  for(const [,raw] of text.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const href=raw.replace(/&amp;/g,'&');
   if(href.startsWith('#')){if(href.length>1)assert.ok(text.includes('id="'+href.slice(1)+'"'),r.path+': missing '+href);continue;}
   const url=new URL(href,'https://moriyamao.github.io/morish-portfolio/'+r.path);
   if(url.origin!=='https://moriyamao.github.io'||!url.pathname.startsWith('/morish-portfolio/'))continue;
   let file=path.join(root,decodeURIComponent(url.pathname.slice('/morish-portfolio/'.length)));
   assert.ok(fs.existsSync(file),r.path+': missing '+href);
   if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   assert.ok(fs.existsSync(file),r.path+': missing index '+href);
  }
 }
});
test('static HTML retains content and a reduced-motion readable fallback before hydration',()=>{
 assert.match(html,/data-reduced="true"/);
 for(const id of ['work','sandbox','clients','about','academic','contact'])assert.ok(html.includes('id="'+id+'"'),id);
 assert.ok(fs.statSync(path.join(root,'.nojekyll')).isFile());
});
function contactSetup(response){
 const {transformSync}=require('./portfolio-site/node_modules/esbuild');
 const code=transformSync(fs.readFileSync(path.join(root,'portfolio-site/src/components/site/contact.tsx'),'utf8'),{loader:'tsx',format:'cjs',jsx:'automatic'}).code;
 const states=[],calls=[];let resets=0;
 const data={name:'Test User',email:'test@example.com','project-type':'Web application',timeline:'','message':'Offline test only','bot-field':''};
 const module={exports:{}};
 const scope={module,exports:module.exports,require(id){if(id==='react')return {useState:v=>[v,n=>states.push(n)],useRef:v=>({current:v})};if(id==='react/jsx-runtime')return {jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};throw Error(id);},FormData:class{get(k){return data[k]}},fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return response;}};
 vm.runInNewContext(code,scope);
 const element=module.exports.ContactForm();
 return {submit:()=>element.props.onSubmit({preventDefault(){},currentTarget:{reportValidity:()=>true,reset(){resets++}}}),states,calls,data,resets:()=>resets};
}
test('contact keeps the existing delivery contract without sending a real email',async()=>{
 const t=contactSetup({ok:true});await t.submit();assert.equal(t.calls.length,1);assert.equal(t.calls[0].url,'https://api.emailjs.com/api/v1.0/email/send');assert.equal(t.calls[0].body.service_id,'service_t79kzen');assert.equal(t.calls[0].body.template_id,'template_dyq9o4r');assert.equal(t.calls[0].body.template_params.reply_to,'test@example.com');assert.equal(t.calls[0].body.template_params.timeline,'Not specified');assert.equal(t.resets(),1);assert.ok(t.states.includes('Message sent. Thanks for reaching out!'));
});
test('contact rejects honeypot input and reports delivery failure without clearing user data',async()=>{
 const blocked=contactSetup({ok:true});blocked.data['bot-field']='bot';await blocked.submit();assert.equal(blocked.calls.length,0);
 const failure=contactSetup({ok:false});await failure.submit();assert.equal(failure.resets(),0);assert.ok(failure.states.some(x=>typeof x==='string'&&x.includes('could not be sent')));
});
