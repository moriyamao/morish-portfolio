import test from 'node:test';
import assert from 'node:assert/strict';
import {overlaps} from './collision.mjs';
import {addObject, addOpening, addWall, blank, updateEntity} from './model.mjs';
import {fromPlan,parseBuilding,setFloorPlan} from './building.mjs';

const point = (x,y) => ({x,y});

test('stacked objects allow surface contact and preserve elevation in a saved home',()=>{
  const plan=addObject(addObject(blank(),'table',0,0),'plant',0,0);
  const plant=plan.objects[1].id;
  const stacked=updateEntity(plan,plant,{elevation:.75});
  assert.equal(overlaps(stacked,plant),false);
  assert.equal(overlaps(updateEntity(stacked,plant,{elevation:.7}),plant),true);
  const home=fromPlan(stacked);
  assert.equal(parseBuilding(JSON.stringify(home)).floors[0].plan.objects[1].elevation,.75);
  assert.throws(()=>setFloorPlan(home,updateEntity(stacked,plant,{elevation:2.5})),/increase floor height/);
});

test('rotated furniture detects penetration in both directions and allows exact contact', () => {
  let plan = addObject(addObject(blank(),'chair',0,0),'chair',0,0);
  const [a,b] = plan.objects.map(o => o.id);
  plan = updateEntity(plan,a,{w:2,d:.4,rotation:45});
  const placeB = (base, distance) => updateEntity(base,b,{
    w:2,d:.4,rotation:45,x:-distance*Math.SQRT1_2,y:distance*Math.SQRT1_2
  });
  assert.equal(overlaps(placeB(plan,.6),a),false); // Bounding boxes intersect; footprints do not.
  assert.equal(overlaps(placeB(plan,.4),a),false);
  plan = placeB(plan,.35);
  const before = structuredClone(plan);
  assert.equal(overlaps(plan,a),true);
  assert.equal(overlaps(plan,b),true);
  assert.deepEqual(plan,before);
});

test('an isolated object and a missing object do not overlap', () => {
  const plan = addObject(blank(),'chair',0,0);
  assert.equal(overlaps(plan,plan.objects[0].id),false);
  assert.equal(overlaps(plan,'f999'),false);
});

test('a rug and the furniture placed over it both report overlap', () => {
  const plan = addObject(addObject(blank(),'rug',0,0),'chair',0,0);
  for (const object of plan.objects) assert.equal(overlaps(plan,object.id),true);
});

test('wall overlap uses the rotated footprint, wall thickness, and finite wall length', () => {
  let plan = addWall(blank(),point(0,0),point(4,0));
  plan = addObject(plan,'chair',2,.4);
  const id = plan.objects[0].id;
  plan = updateEntity(plan,id,{w:1.2,d:.4});
  assert.equal(overlaps(plan,id),false);
  assert.equal(overlaps(updateEntity(plan,id,{rotation:45}),id),true);
  assert.equal(overlaps(updateEntity(plan,id,{y:.275}),id),false); // Flush with the wall face.
  assert.equal(overlaps(updateEntity(plan,id,{x:4.7,y:0}),id),false);
});

test('door clearance checks jambs and lintels, and window sills remain solid', () => {
  let plan = addWall(blank(),point(0,0),point(6,0));
  const wall = plan.walls[0].id;
  plan = addOpening(addOpening(plan,wall,'door',2),wall,'window',4);
  plan = addObject(plan,'chair',2,0);
  const id = plan.objects[0].id;
  plan = updateEntity(plan,id,{d:1.2,w:.9,h:2.1});
  assert.equal(overlaps(plan,id),false); // Flush with both jambs and the lintel.
  assert.equal(overlaps(updateEntity(plan,id,{rotation:90}),id),true);
  assert.equal(overlaps(updateEntity(plan,id,{x:2.01}),id),true);
  assert.equal(overlaps(updateEntity(plan,id,{h:2.11}),id),true);
  assert.equal(overlaps(updateEntity(plan,id,{x:4,h:.8}),id),true);
});

test('opening offsets follow the wall start on a reversed vertical wall', () => {
  let plan = addWall(blank(),point(0,0),point(0,6));
  const wall = plan.walls[0];
  [wall.a,wall.b] = [wall.b,wall.a];
  plan = addOpening(plan,wall.id,'door',2);
  plan = addObject(plan,'chair',0,4);
  const id = plan.objects[0].id;
  assert.equal(overlaps(plan,id),false);
  assert.equal(overlaps(updateEntity(plan,id,{y:2}),id),true);
});
