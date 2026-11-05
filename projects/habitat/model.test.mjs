import test from 'node:test';
import assert from 'node:assert/strict';
import {blank,preset,validate,parseDocument,addWall,addRoom,wallPoints,wallLength,moveVertex,moveWall,resizeWall,addOpening,openingCuts,addObject,updateEntity,duplicateObject,deleteEntity,detectRooms,History,CATALOG} from './model.mjs';
import {exportSVG,planContent} from './plan.mjs';
import {moveRoom,roomContains} from './model.mjs';
const p=(x,y)=>({x,y});
const area=m=>detectRooms(m).reduce((sum,r)=>sum+r.area,0);
test('moving an attached room carries its furniture and preserves the shared wall',()=>{
  let plan=addRoom(addRoom(blank(),p(0,0),p(4,4)),p(4,0),p(8,4));
  plan=addObject(addObject(plan,'chair',2,2),'chair',6,2);
  const room=detectRooms(plan).find(r=>roomContains(r,p(2,2)));
  const moved=moveRoom(plan,room,.5,0);
  assert.deepEqual(moved.objects.map(o=>o.x),[2.5,6]);
  assert.deepEqual(moved.walls,plan.walls);
  assert.deepEqual(detectRooms(moved).map(r=>r.area).sort(),[14,16]);
  assert.equal(plan.objects[0].x,2);
});
test('every furnished preset is valid, round-trips, and conserves enclosed area',()=>{
  for(const [type,expected,roomCount]of [['blank',0,0],['studio',48,2],['1bed',64,3],['2bed',80,4]]){
    const m=preset(type);assert.equal(validate(m),m);assert.deepEqual(parseDocument(JSON.stringify(m)),m);assert.equal(area(m),expected);assert.equal(detectRooms(m).length,roomCount);
    assert.equal(new Set([...m.vertices,...m.walls,...m.openings,...m.objects].map(e=>e.id)).size,m.vertices.length+m.walls.length+m.openings.length+m.objects.length);
  }
});
test('wall insertion joins and splits crossings, detecting adjacent bounded faces',()=>{
  let m=addRoom(blank(),p(0,0),p(8,6));m=addWall(m,p(3,0),p(3,6));assert.equal(m.vertices.length,6);assert.equal(m.walls.length,7);assert.deepEqual(detectRooms(m).map(r=>r.area).sort((a,b)=>a-b),[18,30]);
  m=addWall(m,p(0,3),p(8,3));assert.equal(detectRooms(m).length,4);assert.equal(area(m),48);assert.equal(m.vertices.filter(v=>v.x===3&&v.y===3).length,1);
});
test('collinear additions are order independent, idempotent, and split both endpoints',()=>{
  for(const [a,b]of [[2,8],[8,2]]){let m=addWall(blank(),p(0,0),p(10,0));const original=m.walls[0].id;m=addWall(m,p(a,0),p(b,0));assert.equal(m.walls.length,3);assert.deepEqual(m.walls.map(w=>wallLength(m,w)).sort((a,b)=>a-b),[2,2,6]);assert.ok(m.walls.some(w=>w.id===original));const ids=m.walls.map(w=>w.id);m=addWall(m,p(0,0),p(10,0));assert.deepEqual(m.walls.map(w=>w.id),ids);}
});
test('partly overlapping collinear walls extend without duplicate centerlines',()=>{
  let m=addWall(blank(),p(0,0),p(5,0));m=addWall(m,p(3,0),p(8,0));assert.equal(m.walls.reduce((s,w)=>s+wallLength(m,w),0),8);assert.equal(m.walls.length,3);
});
test('nested disconnected loops produce hole-subtracted floors without double counting',()=>{
  let m=addRoom(blank(),p(0,0),p(10,10));m=addRoom(m,p(2,2),p(6,6));let rooms=detectRooms(m);assert.deepEqual(rooms.map(r=>r.area).sort((a,b)=>a-b),[16,84]);assert.equal(rooms.find(r=>r.area===84).holes.length,1);assert.equal(area(m),100);
  m=addRoom(m,p(3,3),p(4,4));rooms=detectRooms(m);assert.deepEqual(rooms.map(r=>r.area).sort((a,b)=>a-b),[1,15,84]);assert.equal(area(m),100);
  assert.match(planContent(m),/fill-rule="evenodd"/);
});
test('multiple independent enclosed rooms and open wall graphs have correct floors',()=>{
  let m=addRoom(blank(),p(0,0),p(2,2));m=addRoom(m,p(4,0),p(7,2));assert.equal(area(m),10);assert.equal(detectRooms(m).length,2);
  m=addWall(m,p(10,0),p(10,5));assert.equal(area(m),10);assert.equal(detectRooms(deleteEntity(m,m.walls[0].id)).length,1);
});
test('connected vertex motion propagates coordinates along axis constraints',()=>{
  const m=addRoom(blank(),p(0,0),p(4,3)),v=m.vertices.find(v=>v.x===4&&v.y===3);const next=moveVertex(m,v.id,5,4);
  assert.equal(area(next),20);assert.equal(area(m),12);assert.equal(next.vertices.filter(v=>v.x===5).length,2);assert.equal(next.vertices.filter(v=>v.y===4).length,2);assert.deepEqual(next.vertices.map(v=>v.id),m.vertices.map(v=>v.id));
});
test('wall translation stretches connected neighbors; numeric length keeps walls orthogonal',()=>{
  const m=addRoom(blank(),p(0,0),p(4,3)),wall=m.walls.find(w=>wallPoints(m,w).every(v=>v.y===3));let next=moveWall(m,wall.id,0,1);assert.equal(area(next),16);next=resizeWall(next,wall.id,5);assert.equal(wallLength(next,next.walls.find(w=>w.id===wall.id)),5);assert.equal(area(next),20);
});
test('invalid wall collapse and unconnected crossing are rejected atomically',()=>{
  const m=addRoom(blank(),p(0,0),p(4,3)),original=JSON.stringify(m),v=m.vertices.find(v=>v.x===4&&v.y===3);assert.throws(()=>moveVertex(m,v.id,0,3));assert.equal(JSON.stringify(m),original);
  let lines=addWall(blank(),p(0,0),p(4,0));lines=addWall(lines,p(2,1),p(2,3));const vertical=lines.walls.find(w=>wallPoints(lines,w).every(v=>v.x===2));assert.throws(()=>moveWall(lines,vertical.id,0,-2),/shared vertex/);
});
test('door and window cuts conserve wall volume minus exact opening volume',()=>{
  let m=addWall(blank(),p(0,0),p(8,0));const w=m.walls[0];m=addOpening(m,w.id,'door',1.5);m=addOpening(m,w.id,'window',4.5);
  const cuts=openingCuts(m,w),volume=cuts.reduce((s,c)=>s+(c.to-c.from)*(c.top-c.bottom)*w.thickness,0),voidVolume=m.openings.reduce((s,o)=>s+o.width*o.height*w.thickness,0);
  assert.ok(Math.abs(volume-(8*w.height*w.thickness-voidVolume))<1e-9);
  for(const o of m.openings){assert.ok(!cuts.some(c=>c.from<o.offset&&c.to>o.offset&&c.bottom<o.sill+o.height&&c.top>o.sill));}
});
test('openings require end piers, separation and correct elevation, and survive legal splits',()=>{
  let m=addWall(blank(),p(0,0),p(8,0));const wall=m.walls[0].id;m=addOpening(m,wall,'door',2);const opening=m.openings[0].id,original=JSON.stringify(m);
  assert.throws(()=>addOpening(m,wall,'window',2.2),/between/);assert.throws(()=>addOpening(m,wall,'door',.3),/ends/);assert.throws(()=>updateEntity(m,opening,{sill:.1}),/floor level/);assert.throws(()=>updateEntity(m,opening,{height:3}),/taller/);
  assert.throws(()=>addWall(m,p(2,0),p(2,3)),/cut through/);assert.equal(JSON.stringify(m),original);
  const next=addWall(m,p(1,0),p(1,3)),o=next.openings.find(o=>o.id===opening);assert.notEqual(o.wallId,wall);assert.equal(o.offset,1);assert.equal(o.id,opening);
});
test('wall edits cannot crush or shorten past openings; deleting wall removes dependent openings',()=>{
  let m=addWall(blank(),p(0,0),p(5,0));const wall=m.walls[0].id;m=addOpening(m,wall,'window',3);
  assert.throws(()=>resizeWall(m,wall,3),/ends/);assert.throws(()=>updateEntity(m,wall,{height:1.5}),/taller/);
  const next=deleteEntity(m,wall);assert.equal(next.openings.length,0);assert.equal(next.vertices.length,0);
});
test('all catalog entries support dimension, rotation, finish, duplicate and deletion edits',()=>{
  let m=blank();for(const catalogId of Object.keys(CATALOG))m=addObject(m,catalogId,1,2);assert.equal(m.objects.length,Object.keys(CATALOG).length);const id=m.objects[0].id;m=updateEntity(m,id,{w:2.6,d:1,h:1.1,rotation:45,material:'sage'});const previous=m.objects.find(o=>o.id===id);m=duplicateObject(m,id);const copy=m.objects.at(-1);assert.notEqual(copy.id,id);assert.equal(copy.catalogId,previous.catalogId);assert.equal(copy.rotation,45);assert.equal(copy.w,2.6);assert.equal(copy.x,1.3);m=deleteEntity(m,copy.id);assert.equal(m.objects.length,Object.keys(CATALOG).length);
  assert.throws(()=>updateEntity(m,id,{catalogId:'unknown'}),/Unsupported property/);assert.throws(()=>updateEntity(m,id,{w:0}));assert.throws(()=>duplicateObject(m,'missing'));
});
test('history commits each gesture as one snapshot, supports redo and branches safely',()=>{
  const initial=blank(),h=new History(initial,2);let draft=addObject(initial,'sofa',0,0),id=draft.objects[0].id;for(let x=1;x<5;x++)draft=updateEntity(draft,id,{x});h.commit(draft);assert.equal(h.past.length,1);assert.equal(h.undo().objects.length,0);assert.equal(h.redo().objects[0].x,4);h.undo();h.commit(addObject(initial,'plant',1,1));assert.equal(h.future.length,0);h.commit(addObject(h.current,'lamp',2,2));h.commit(addObject(h.current,'bed',3,3));assert.equal(h.past.length,2);
  const saved=JSON.stringify(h.current);assert.throws(()=>h.commit({...h.current,version:99}));assert.equal(JSON.stringify(h.current),saved);assert.equal(h.commit(h.current),false);
});
test('JSON validation rejects malformed, unsupported and structurally unsafe documents',()=>{
  assert.throws(()=>parseDocument('{'),/valid JSON/);assert.throws(()=>parseDocument('null'),/version/);assert.throws(()=>parseDocument(JSON.stringify({...blank(),version:2})),/version/);assert.throws(()=>parseDocument(' '.repeat(2e6+1)),/2 MB/);
  const valid=preset('studio'),mutations=[m=>delete m.walls,m=>m.nextId=1,m=>m.vertices[0].x=Infinity,m=>m.vertices[0].x=.15,m=>m.vertices[1].id=m.vertices[0].id,m=>m.walls[0].a='v999',m=>m.walls[0].material='__proto__',m=>m.objects[0].catalogId='constructor',m=>m.objects[0].rotation=-1,m=>m.settings.height='2.7',m=>m.openings[0].wallId='w999',m=>m.vertices.push({...m.vertices[0],id:`v${m.nextId++}`})];
  for(const mutate of mutations){const invalid=structuredClone(valid);mutate(invalid);assert.throws(()=>parseDocument(JSON.stringify(invalid)));}
  const extra={...valid,unknown:'discarded'};assert.equal(parseDocument(JSON.stringify(extra)).unknown,undefined);
});
test('plan export is self-contained SVG, escapes names, includes scale and no editor handles',()=>{
  const m=preset('studio');m.name='<script>alert("x")</script>&';const text=exportSVG(m);assert.ok(text.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));assert.match(text,/fill="white"/);assert.match(text,/2 m<\/text>/);assert.match(text,/&lt;script&gt;/);assert.doesNotMatch(text,/<script|foreignObject|href=|data-handle=|data-vertex=/);assert.match(text,/ROOM 01/);
});
