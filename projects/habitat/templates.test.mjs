import test from 'node:test';
import assert from 'node:assert/strict';
import {TEMPLATES,createTemplate} from './templates.mjs';
import {parseBuilding,selectFloor,setFloorPlan,validateBuilding} from './building.mjs';
import {detectRooms,updateEntity,wallPoints} from './model.mjs';

const footprint=({vertices})=>vertices.length?['x','y'].map(axis=>{
  const coordinates=vertices.map(v=>v[axis]);
  return Math.max(...coordinates)-Math.min(...coordinates);
}):[0,0];

const contains=(room,{x,y})=>room.points.reduce((inside,a,i,points)=>{
  const b=points[(i+1)%points.length];
  return (a.y>y)!==(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x?!inside:inside;
},false);

const usesWall=(room,wall)=>room.points.some(({id},i,points)=>{
  const next=points[(i+1)%points.length].id;
  return (id===wall.a&&next===wall.b)||(id===wall.b&&next===wall.a);
});

test('all six templates are valid version 2 documents with accurate metadata',()=>{
  assert.deepEqual(TEMPLATES.map(t=>t.id),['blank','studio','bungalow','family','duplex','townhouse']);
  for(const {id,title,storeys,bedrooms,footprint:label} of TEMPLATES) {
    const home=createTemplate(id);
    assert.equal(home.version,2,id);
    assert.equal(validateBuilding(home),home,id);
    assert.deepEqual(parseBuilding(JSON.stringify(home)),home,id);
    assert.equal(home.name,title,id);
    assert.equal(home.floors.length,storeys,id);
    assert.equal(home.activeFloorId,home.floors[0].id,id);
    assert.equal(label,`${footprint(home.floors[0].plan).join(' × ')} m`,id);

    let privateBedrooms=0;
    for(const {plan} of home.floors) {
      // A studio bed in the open living room is a sleeping area, not a separate bedroom.
      const rooms=detectRooms(plan);
      for(const room of rooms) {
        const items=plan.objects.filter(o=>contains(room,o));
        if(items.some(o=>o.catalogId==='bed')&&!items.some(o=>o.catalogId==='sofa'))privateBedrooms++;
      }
      if(id==='blank') {
        assert.deepEqual([plan.vertices,plan.walls,plan.openings,plan.objects],[[],[],[],[]]);
      } else {
        assert.ok(rooms.length>0&&plan.objects.length>0,id);
        assert.ok(plan.openings.some(o=>o.kind==='window'),id);
      }
    }
    assert.equal(privateBedrooms,bedrooms,id);
  }
  assert.throws(()=>createTemplate('missing'),/Unknown HABITAT template/);
});

test('templates have distinct ground layouts and every room has a door route',()=>{
  const layouts=new Set();
  for(const {id} of TEMPLATES) {
    const {floors}=createTemplate(id);
    const ground=floors[0].plan;
    const walls=ground.walls.map(w=>wallPoints(ground,w).map(v=>`${v.x},${v.y}`).sort().join('—'));
    layouts.add(walls.sort().join('|'));
    for(const [level,{plan}] of floors.entries()) {
      const rooms=detectRooms(plan);
      const connections=plan.openings.filter(o=>o.kind==='door').map(o=>{
        const wall=plan.walls.find(w=>w.id===o.wallId);
        return rooms.filter(r=>usesWall(r,wall));
      });
      const reachable=new Set(level===0?connections.filter(pair=>pair.length===1).flat():
        rooms.filter(r=>plan.objects.some(o=>o.catalogId==='stair'&&contains(r,o))));
      for(let pass=0;pass<rooms.length;pass++) {
        for(const pair of connections)if(pair.some(r=>reachable.has(r)))for(const r of pair)reachable.add(r);
      }
      assert.equal(reachable.size,rooms.length,`${id}, level ${level+1}`);
    }
  }
  assert.equal(layouts.size,TEMPLATES.length);
});

test('multi-storey plans share a footprint and stair marker alignment',()=>{
  for(const id of ['duplex','townhouse']) {
    const {floors}=createTemplate(id);
    const markers=floors.map(({plan})=>{
      assert.equal(Math.min(...plan.vertices.map(v=>v.x)),0,id);
      assert.equal(Math.min(...plan.vertices.map(v=>v.y)),0,id);
      assert.deepEqual(footprint(plan),footprint(floors[0].plan),id);
      const stairs=plan.objects.filter(o=>o.catalogId==='stair');
      assert.equal(stairs.length,1,id);
      const [{x,y,w,d,rotation}]=stairs;
      return {x,y,w,d,rotation};
    });
    assert.ok(markers.slice(1).every(marker=>Object.keys(marker).every(key=>marker[key]===markers[0][key])),id);
  }
});

test('an edit targets only the selected floor even when entity IDs are reused',()=>{
  const home=createTemplate('townhouse');
  const [ground,upper,top]=home.floors;
  const wall=upper.plan.walls.find(w=>ground.plan.walls.some(g=>g.id===w.id)&&top.plan.walls.some(t=>t.id===w.id));
  assert.ok(wall,'expected a shared wall ID');
  const next=setFloorPlan(selectFloor(home,upper.id),updateEntity(upper.plan,wall.id,{material:'clay'}));
  assert.equal(next.floors[1].plan.walls.find(w=>w.id===wall.id).material,'clay');
  assert.equal(upper.plan.walls.find(w=>w.id===wall.id).material,'chalk');
  assert.deepEqual(next.floors[0],ground);
  assert.deepEqual(next.floors[2],top);
});

test('each call creates independently editable floor data',()=>{
  for(const {id} of TEMPLATES) {
    const first=createTemplate(id),second=createTemplate(id);
    assert.deepEqual(first,second,id);
    const before=JSON.stringify(second);
    for(const {plan} of first.floors) {
      plan.settings.floor='sage';
      if(plan.vertices.length)plan.vertices[0].x=-1;
      if(plan.objects.length)plan.objects[0].material='clay';
    }
    assert.equal(JSON.stringify(second),before,id);
    assert.equal(JSON.stringify(createTemplate(id)),before,id);
  }
});
