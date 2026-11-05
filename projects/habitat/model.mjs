/** HABITAT's serializable, meter-based document. All public edits are atomic. */
export const VERSION = 1;
export const GRID = .1;
export const MATERIALS = { chalk:'#e4dfd4', clay:'#b97b60', oak:'#b9976c', walnut:'#685347', sage:'#87917a', ink:'#414646', linen:'#d2c8b6' };
export const CATALOG = {
  sofa:{label:'Sofa',w:2.2,d:.9,h:.8,material:'linen'}, table:{label:'Dining table',w:1.6,d:.85,h:.75,material:'oak'},
  chair:{label:'Chair',w:.5,d:.55,h:.85,material:'walnut'}, bed:{label:'Double bed',w:1.6,d:2,h:.65,material:'linen'},
  counter:{label:'Counter',w:1.8,d:.6,h:.9,material:'chalk'}, bath:{label:'Bath',w:.8,d:1.7,h:.6,material:'chalk'},
  toilet:{label:'Toilet',w:.45,d:.7,h:.75,material:'chalk'}, plant:{label:'Plant',w:.55,d:.55,h:1.2,material:'sage'},
  lamp:{label:'Floor lamp',w:.4,d:.4,h:1.6,material:'ink'}, stair:{label:'Decorative stair',w:.9,d:2,h:1.8,material:'oak'}
};
export const clone = value => structuredClone(value);
export const snap = n => Math.round(n / GRID) / 10;
const near = (a,b) => Math.abs(a-b)<1e-6;
const fail = message => { throw new Error(message); };
const finite = n => typeof n === 'number' && Number.isFinite(n);
const range = (n,a,b,label) => { if (!finite(n)||n<a||n>b) fail(`${label} must be between ${a} and ${b}.`); };
const onGrid = n => near(n,snap(n));
export function blank() { return {version:VERSION,name:'Untitled residence',nextId:1,settings:{height:2.7,thickness:.15,floor:'oak'},vertices:[],walls:[],openings:[],objects:[]}; }
function id(m,p) { return `${p}${m.nextId++}`; }
export function wallPoints(m,w) { return [m.vertices.find(v=>v.id===w.a),m.vertices.find(v=>v.id===w.b)]; }
export function wallLength(m,w) { const [a,b]=wallPoints(m,w); return Math.hypot(b.x-a.x,b.y-a.y); }
export function pointOnWall(m,w,offset) {const [a,b]=wallPoints(m,w),l=wallLength(m,w);return {x:a.x+(b.x-a.x)*offset/l,y:a.y+(b.y-a.y)*offset/l};}
export function openingCuts(m,w) {
  const l=wallLength(m,w), list=m.openings.filter(o=>o.wallId===w.id).sort((a,b)=>a.offset-b.offset), segments=[];
  let cursor=0;
  for(const o of list) {
    const left=o.offset-o.width/2,right=o.offset+o.width/2;
    if(left>cursor+1e-6) segments.push({from:cursor,to:left,bottom:0,top:w.height});
    if(o.sill>0) segments.push({from:left,to:right,bottom:0,top:o.sill});
    if(o.sill+o.height<w.height-1e-6) segments.push({from:left,to:right,bottom:o.sill+o.height,top:w.height});
    cursor=right;
  }
  if(cursor<l-1e-6) segments.push({from:cursor,to:l,bottom:0,top:w.height});
  return segments;
}
function inside(p,a,b,strict=false) {
  const e=strict?1e-6:-1e-6;
  return near(a.x,b.x)?near(p.x,a.x)&&p.y>Math.min(a.y,b.y)+e&&p.y<Math.max(a.y,b.y)-e:
    near(p.y,a.y)&&p.x>Math.min(a.x,b.x)+e&&p.x<Math.max(a.x,b.x)-e;
}
export function validate(m) {
  if(!m||m.version!==VERSION) fail('Unsupported document version. HABITAT accepts version 1.');
  if(typeof m.name!=='string'||m.name.length>100) fail('Document name must be 100 characters or fewer.');
  if(!Number.isSafeInteger(m.nextId)||m.nextId<1||m.nextId>1e9) fail('Invalid ID sequence.');
  if(!m.settings||!Object.hasOwn(MATERIALS,m.settings.floor)) fail('Invalid floor material.');
  range(m.settings.height,1,6,'Default height');range(m.settings.thickness,.05,.5,'Default thickness');
  const max={vertices:600,walls:800,openings:300,objects:300}; const ids=new Set();
  for(const [key,limit] of Object.entries(max)) {
    if(!Array.isArray(m[key])||m[key].length>limit) fail(`Invalid or oversized ${key} collection.`);
    for(const e of m[key]) {if(!e||typeof e.id!=='string'||!(/^[vwof]\d{1,9}$/).test(e.id)||ids.has(e.id)) fail('IDs must be unique and valid.'); ids.add(e.id); if(Number(e.id.slice(1))>=m.nextId) fail('ID sequence must exceed existing IDs.');}
  }
  const vertices=new Map();const positions=new Set();
  for(const v of m.vertices) {range(v.x,-50,50,'Vertex X');range(v.y,-50,50,'Vertex Y'); if(!onGrid(v.x)||!onGrid(v.y))fail('Vertices must use the 0.1 m grid.');const key=`${snap(v.x)},${snap(v.y)}`;if(positions.has(key))fail('Two vertices cannot occupy the same point.');positions.add(key);vertices.set(v.id,v);}
  for(const w of m.walls) {
    const a=vertices.get(w.a),b=vertices.get(w.b);
    if(!a||!b||a===b)fail('A wall must connect two existing vertices.');
    if(!(near(a.x,b.x)||near(a.y,b.y)))fail('Walls must remain horizontal or vertical.');
    if(wallLength(m,w)<.1-1e-6)fail('Walls must be at least 0.1 m long.');
    range(w.height,1,6,'Wall height');range(w.thickness,.05,.5,'Wall thickness');if(!Object.hasOwn(MATERIALS,w.material))fail('Invalid wall material.');
  }
  // Reject unconnected crossings and overlapping wall centerlines in imported/edited graphs.
  for(let i=0;i<m.walls.length;i++)for(let j=i+1;j<m.walls.length;j++) {
    const w=m.walls[i],u=m.walls[j],[a,b]=wallPoints(m,w),[c,d]=wallPoints(m,u),vertical=near(a.x,b.x),other=near(c.x,d.x);
    if(vertical===other) {
      if((vertical?near(a.x,c.x):near(a.y,c.y))) {
        const axis=vertical?'y':'x',overlap=Math.min(Math.max(a[axis],b[axis]),Math.max(c[axis],d[axis]))-Math.max(Math.min(a[axis],b[axis]),Math.min(c[axis],d[axis]));
        if(overlap>1e-6)fail('Walls cannot overlap.');
      }
    } else {const p=vertical?{x:a.x,y:c.y}:{x:c.x,y:a.y};if(inside(p,a,b)&&inside(p,c,d)&&(![w.a,w.b].some(v=>v===u.a||v===u.b)))fail('Walls must meet at a shared vertex.');}
  }
  for(const o of m.openings) {
    const w=m.walls.find(w=>w.id===o.wallId);if(!w)fail('Opening references a missing wall.');
    if(!['door','window'].includes(o.kind))fail('Invalid opening type.');
    range(o.width,.3,5,'Opening width');range(o.height,.3,5,'Opening height');range(o.sill,0,5,'Sill height');range(o.offset,0,100,'Opening position');
    if(o.kind==='door'&&!near(o.sill,0))fail('Doors must start at floor level.');
    if(o.offset-o.width/2<.08-1e-6||o.offset+o.width/2>wallLength(m,w)-.08+1e-6)fail('Keep openings at least 0.08 m from wall ends.');
    if(o.sill+o.height>w.height+.000001)fail('Opening is taller than its wall.');
    for(const p of m.openings)if(p!==o&&p.wallId===o.wallId&&Math.abs(p.offset-o.offset)<(p.width+o.width)/2+.08-1e-6)fail('Openings need at least 0.08 m of wall between them.');
  }
  for(const o of m.objects) {
    if(!Object.hasOwn(CATALOG,o.catalogId))fail('Unknown catalog item.');
    range(o.x,-50,50,'Object X');range(o.y,-50,50,'Object Y');range(o.w,.2,10,'Object width');range(o.d,.2,10,'Object depth');range(o.h,.2,6,'Object height');range(o.rotation,0,359.999999,'Rotation');
    if(!Object.hasOwn(MATERIALS,o.material))fail('Invalid object material.');
  }
  return m;
}
export function parseDocument(text) {
  if(typeof text!=='string'||text.length>2e6)fail('Document exceeds the 2 MB limit.');
  let m;try{m=JSON.parse(text);}catch{fail('This file is not valid JSON.');}
  validate(m);
  // Only retain fields used by the application.
  return {version:VERSION,name:m.name,nextId:m.nextId,settings:{height:m.settings.height,thickness:m.settings.thickness,floor:m.settings.floor},
    vertices:m.vertices.map(({id,x,y})=>({id,x,y})),walls:m.walls.map(({id,a,b,height,thickness,material})=>({id,a,b,height,thickness,material})),
    openings:m.openings.map(({id,wallId,kind,offset,width,height,sill})=>({id,wallId,kind,offset,width,height,sill})),
    objects:m.objects.map(({id,catalogId,x,y,w,d,h,rotation,material})=>({id,catalogId,x,y,w,d,h,rotation,material}))};
}
export function edit(m,fn) {const next=clone(m);fn(next);return validate(next);}
function vertex(m,p) {let v=m.vertices.find(v=>near(v.x,p.x)&&near(v.y,p.y));if(!v){v={id:id(m,'v'),x:snap(p.x),y:snap(p.y)};m.vertices.push(v);}return v;}
function splitAt(m,w,v) {
  if(w.a===v.id||w.b===v.id)return;
  const [a]=wallPoints(m,w),distance=Math.hypot(v.x-a.x,v.y-a.y),oldB=w.b;
  for(const o of m.openings.filter(o=>o.wallId===w.id)) if(Math.abs(o.offset-distance)<o.width/2+.08-1e-6)fail('A wall junction cannot cut through an opening.');
  w.b=v.id;const nw={...w,id:id(m,'w'),a:v.id,b:oldB};m.walls.push(nw);
  for(const o of m.openings.filter(o=>o.wallId===w.id))if(o.offset>distance){o.wallId=nw.id;o.offset-=distance;}
}
function insertLine(m,p,q) {
  p={x:snap(p.x),y:snap(p.y)};q={x:snap(q.x),y:snap(q.y)};
  if(near(p.x,q.x)&&near(p.y,q.y))fail('Draw a wall at least 0.1 m long.');
  if(!near(p.x,q.x)&&!near(p.y,q.y))fail('Draw an orthogonal wall.');
  const cuts=[vertex(m,p),vertex(m,q)];
  for(const w of [...m.walls]) {
    const [a,b]=wallPoints(m,w),v=near(p.x,q.x),ov=near(a.x,b.x);
    if(v!==ov) {const point=v?{x:p.x,y:a.y}:{x:a.x,y:p.y};if(inside(point,p,q)&&inside(point,a,b)){const n=vertex(m,point);cuts.push(n);splitAt(m,w,n);}}
    else if(v?near(p.x,a.x):near(p.y,a.y)) {
      for(const end of [p,q])if(inside(end,a,b,true)) {const segment=m.walls.find(candidate=>{const [s,e]=wallPoints(m,candidate);return inside(end,s,e,true);});if(segment)splitAt(m,segment,vertex(m,end));}
      for(const end of [a,b])if(inside(end,p,q))cuts.push(end);
    }
  }
  // Include newly split vertices and T junction endpoints.
  for(const v of m.vertices)if(inside(v,p,q))cuts.push(v);
  const axis=near(p.x,q.x)?'y':'x',ordered=[...new Map(cuts.map(v=>[v.id,v])).values()].sort((a,b)=>a[axis]-b[axis]);
  for(let i=0;i<ordered.length-1;i++) {
    const a=ordered[i].id,b=ordered[i+1].id;
    if(!m.walls.some(w=>(w.a===a&&w.b===b)||(w.a===b&&w.b===a)))m.walls.push({id:id(m,'w'),a,b,height:m.settings.height,thickness:m.settings.thickness,material:'chalk'});
  }
}
export function addWall(m,p,q) {return edit(m,n=>insertLine(n,p,q));}
export function addRoom(m,p,q) {return edit(m,n=>{if(Math.abs(p.x-q.x)<.5||Math.abs(p.y-q.y)<.5)fail('Rooms must be at least 0.5 m on each side.');const a={x:p.x,y:p.y},b={x:q.x,y:p.y},c={x:q.x,y:q.y},d={x:p.x,y:q.y};for(const [s,e] of [[a,b],[b,c],[c,d],[d,a]])insertLine(n,s,e);});}
// Move a vertex while propagating shared X along vertical walls and Y along horizontal walls.
function moveVertexRaw(m,vertexId,x,y) {
  const start=m.vertices.find(v=>v.id===vertexId);if(!start)fail('Vertex not found.');
  const propagate=(axis,target)=>{const seen=new Set([start.id]),queue=[start.id];while(queue.length){const current=queue.shift();for(const w of m.walls){if(w.a!==current&&w.b!==current)continue;const [a,b]=wallPoints(m,w);if(near(a[axis],b[axis])){const other=w.a===current?w.b:w.a;if(!seen.has(other)){seen.add(other);queue.push(other);}}}}for(const v of m.vertices)if(seen.has(v.id))v[axis]=snap(target);};
  propagate('x',x);propagate('y',y);
}
export function moveVertex(m,vertexId,x,y) {return edit(m,n=>moveVertexRaw(n,vertexId,x,y));}
export function moveWall(m,wallId,dx,dy) {return edit(m,n=>{const w=n.walls.find(w=>w.id===wallId);if(!w)fail('Wall not found.');const points=wallPoints(n,w).map(v=>({...v}));for(const p of points)moveVertexRaw(n,p.id,p.x+dx,p.y+dy);});}
export function resizeWall(m,wallId,length) {range(length,.1,100,'Wall length');return edit(m,n=>{const w=n.walls.find(w=>w.id===wallId);if(!w)fail('Wall not found.');const [a,b]=wallPoints(n,w),l=wallLength(n,w);moveVertexRaw(n,b.id,a.x+(b.x-a.x)*length/l,a.y+(b.y-a.y)*length/l);});}
export function addOpening(m,wallId,kind,offset) {return edit(m,n=>{const w=n.walls.find(w=>w.id===wallId);if(!w)fail('Select a wall for the opening.');n.openings.push({id:id(n,'o'),wallId,kind,offset:snap(offset),width:kind==='door'?.9:1.2,height:kind==='door'?Math.min(2.1,w.height):Math.min(1.2,w.height),sill:kind==='door'?0:Math.max(0,Math.min(.9,w.height-1.2))});});}
export function addObject(m,catalogId,x,y) {return edit(m,n=>{const c=CATALOG[catalogId];if(!c)fail('Unknown catalog item.');n.objects.push({id:id(n,'f'),catalogId,x:snap(x),y:snap(y),w:c.w,d:c.d,h:c.h,rotation:0,material:c.material});});}
export function updateEntity(m,entityId,patch) {return edit(m,n=>{const e=[...n.walls,...n.objects,...n.openings].find(e=>e.id===entityId);if(!e)fail('Selection no longer exists.');const allowed=n.objects.includes(e)?['x','y','w','d','h','rotation','material']:n.walls.includes(e)?['height','thickness','material']:['offset','width','height','sill'];for(const k of Object.keys(patch))if(!allowed.includes(k))fail('Unsupported property.');Object.assign(e,patch);});}
export function deleteEntity(m,entityId) {return edit(m,n=>{n.objects=n.objects.filter(e=>e.id!==entityId);n.openings=n.openings.filter(e=>e.id!==entityId&&e.wallId!==entityId);n.walls=n.walls.filter(e=>e.id!==entityId);const used=new Set(n.walls.flatMap(w=>[w.a,w.b]));n.vertices=n.vertices.filter(v=>used.has(v.id));});}
export function duplicateObject(m,entityId) {return edit(m,n=>{const o=n.objects.find(o=>o.id===entityId);if(!o)fail('Only furniture can be duplicated.');n.objects.push({...o,id:id(n,'f'),x:snap(o.x+.3),y:snap(o.y+.3)});});}
export function detectRooms(m) {
  const adjacency=new Map(m.vertices.map(v=>[v.id,[]]));
  for(const w of m.walls){adjacency.get(w.a).push(w.b);adjacency.get(w.b).push(w.a);}
  const byId=new Map(m.vertices.map(v=>[v.id,v]));
  for(const [key,list]of adjacency){const v=byId.get(key);list.sort((a,b)=>Math.atan2(byId.get(a).y-v.y,byId.get(a).x-v.x)-Math.atan2(byId.get(b).y-v.y,byId.get(b).x-v.x));}
  const used=new Set(),rooms=[],negative=[];
  for(const w of m.walls)for(const pair of [[w.a,w.b],[w.b,w.a]]) {
    if(used.has(pair.join(':')))continue;let [a,b]=pair,poly=[],edges=[],closed=false;
    for(let i=0;i<m.walls.length*2+1;i++) {
      const key=`${a}:${b}`;if(used.has(key)){closed=key===pair.join(':');break;}used.add(key);poly.push(byId.get(a));edges.push(key);
      const list=adjacency.get(b),idx=list.indexOf(a),c=list[(idx-1+list.length)%list.length];a=b;b=c;
    }
    const signed=poly.reduce((sum,p,i)=>{const q=poly[(i+1)%poly.length];return sum+p.x*q.y-q.x*p.y;},0)/2;
    if(closed&&signed>.009){rooms.push({id:edges.slice().sort().join('|'),points:poly,area:signed,holes:[]});}
    if(closed&&signed<-.009)negative.push({points:poly,area:-signed});
  }
  // Every disconnected component has an exterior (negative) boundary. If that
  // boundary is inside another bounded face, it is a hole in that face.
  const contains=(points,p)=>{let yes=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)yes=!yes;}return yes;};
  for(const hole of negative){const parent=rooms.filter(r=>r.area>hole.area+1e-6&&contains(r.points,hole.points[0])).sort((a,b)=>a.area-b.area)[0];if(parent)parent.holes.push(hole.points);}
  for(const r of rooms)for(const hole of r.holes)r.area-=Math.abs(hole.reduce((s,p,i)=>{const q=hole[(i+1)%hole.length];return s+p.x*q.y-q.x*p.y;},0)/2);
  return rooms;
}
export function bounds(m) {const points=[...m.vertices,...m.objects.flatMap(o=>{const r=Math.hypot(o.w,o.d)/2;return [{x:o.x-r,y:o.y-r},{x:o.x+r,y:o.y+r}];})];if(!points.length)return {x:-1,y:-1,w:10,h:8};const xs=points.map(p=>p.x),ys=points.map(p=>p.y);return {x:Math.min(...xs)-1,y:Math.min(...ys)-1,w:Math.max(...xs)-Math.min(...xs)+2,h:Math.max(...ys)-Math.min(...ys)+2};}
export class History {
  constructor(initial,limit=80){this.current=clone(initial);this.past=[];this.future=[];this.limit=limit;}
  commit(next){validate(next);if(JSON.stringify(next)===JSON.stringify(this.current))return false;this.past.push(this.current);if(this.past.length>this.limit)this.past.shift();this.current=clone(next);this.future=[];return true;}
  undo(){if(!this.past.length)return this.current;this.future.push(this.current);this.current=this.past.pop();return clone(this.current);}
  redo(){if(!this.future.length)return this.current;this.past.push(this.current);this.current=this.future.pop();return clone(this.current);}
}
export function preset(type='studio') {
  let m=blank();m.name={blank:'Blank canvas',studio:'The warm studio','1bed':'One-bedroom residence','2bed':'Two-bedroom residence'}[type]||'Residence';
  if(type==='blank')return m;
  const width=type==='2bed'?10:8,height=type==='studio'?6:8;
  m=addRoom(m,{x:0,y:0},{x:width,y:height});
  if(type!=='studio')m=addWall(m,{x:5,y:0},{x:5,y:height});
  if(type==='2bed')m=addWall(m,{x:5,y:4},{x:10,y:4});
  m=addWall(m,{x:0,y:2.4},{x:2.5,y:2.4});m=addWall(m,{x:2.5,y:0},{x:2.5,y:2.4});
  const horizontal=(y,x)=>m.walls.find(w=>{const [a,b]=wallPoints(m,w);return near(a.y,y)&&near(b.y,y)&&x>Math.min(a.x,b.x)&&x<Math.max(a.x,b.x);});
  let w=horizontal(height,2);m=addOpening(m,w.id,'door',Math.abs(2-wallPoints(m,w)[0].x));
  w=horizontal(0,4);m=addOpening(m,w.id,'window',Math.abs(3.8-wallPoints(m,w)[0].x));
  w=horizontal(2.4,1);m=addOpening(m,w.id,'door',1.15);
  if(type!=='studio'){w=m.walls.find(w=>{const [a,b]=wallPoints(m,w);return near(a.x,5)&&near(b.x,5)&&Math.min(a.y,b.y)<=3&&Math.max(a.y,b.y)>=3;});m=addOpening(m,w.id,'door',3);}
  if(type==='2bed'){w=horizontal(4,6.3);m=addOpening(m,w.id,'door',1.3);}
  const items=[['bath',.65,1.1],['toilet',1.9,.6],['sofa',3.5,height-1.5],['table',3.5,3.3],['chair',3.5,4.1],['counter',3.8,.5],['plant',.6,height-.6],['lamp',4.7,height-1.5],['bed',type==='studio'?6.5:7,type==='studio'?1.8:2]];
  if(type==='2bed')items.push(['bed',7.5,6]);
  for(const [c,x,y]of items)m=addObject(m,c,x,y);
  return validate(m);
}
