import test from 'node:test';
import assert from 'node:assert/strict';
import {preset,addObject,updateEntity} from './model.mjs';
import {fromPlan,parseBuilding,validateBuilding,activeFloor,addFloor,setFloorPlan,selectFloor,updateFloor,removeFloor,BuildingHistory} from './building.mjs';

test('legacy version 1 migration retains every entity and does not mutate the original design',()=>{
  const old=preset('2bed'), before=JSON.stringify(old), migrated=parseBuilding(before);
  assert.equal(migrated.version,2);assert.equal(migrated.name,old.name);assert.equal(migrated.floors.length,1);
  assert.deepEqual(activeFloor(migrated).plan,old);assert.equal(JSON.stringify(old),before);
  assert.deepEqual(parseBuilding(JSON.stringify(migrated)),migrated);
  const tall=updateEntity(old,old.walls[0].id,{height:6});assert.ok(fromPlan(tall).floors[0].height>=6.2);
});
test('new blank and copied floors are independent and floor IDs never collide after deletion',()=>{
  let home=fromPlan(preset('studio'));const original=JSON.stringify(home.floors[0].plan);
  home=addFloor(home);assert.equal(home.floors[1].plan.walls.length,0);
  home=selectFloor(home,'s1');home=addFloor(home,{copy:true});
  const copyId=home.activeFloorId;home=setFloorPlan(home,addObject(activeFloor(home).plan,'chair',1,1));
  assert.equal(JSON.stringify(home.floors[0].plan),original);assert.notEqual(home.floors[0].plan,activeFloor(home).plan);
  home=removeFloor(home,copyId);home=addFloor(home);assert.notEqual(home.activeFloorId,copyId);
});
test('floor heights reject intersections with walls or furniture, and edits are atomic',()=>{
  const home=fromPlan(preset('studio')), before=JSON.stringify(home);
  assert.throws(()=>updateFloor(home,'s1',{height:2.5}),/increase floor height/);
  assert.equal(JSON.stringify(home),before);
  const next=updateFloor(home,'s1',{name:'Living level',height:3.5});assert.equal(activeFloor(next).height,3.5);
  assert.throws(()=>updateFloor(home,'s1',{height:Infinity}));assert.throws(()=>updateFloor(home,'s1',{name:' '}));
  assert.throws(()=>updateFloor(home,'s1',{plan:{}}),/Unsupported/);
});
test('five-storey bounds and removing an active floor preserve remaining plans',()=>{
  let home=fromPlan(preset('studio'));for(let i=0;i<4;i++)home=addFloor(home,{copy:true});
  assert.equal(home.floors.length,5);assert.throws(()=>addFloor(home),/maximum 5/);
  const ground=JSON.stringify(home.floors[0].plan);home=removeFloor(home,home.activeFloorId);
  assert.equal(home.activeFloorId,'s4');assert.equal(JSON.stringify(home.floors[0].plan),ground);
  while(home.floors.length>1)home=removeFloor(home,home.activeFloorId);
  assert.throws(()=>removeFloor(home,home.activeFloorId),/at least one/);
});
test('building history restores additions, deletions and edits across floors',()=>{
  const original=fromPlan(preset('studio')), h=new BuildingHistory(original,3);
  h.commit(addFloor(h.current,{copy:true}));const two=JSON.stringify(h.current);
  h.commit(setFloorPlan(h.current,addObject(activeFloor(h.current).plan,'table',2,2)));
  h.commit(removeFloor(h.current,'s1'));assert.equal(h.current.floors.length,1);
  h.undo();assert.equal(h.current.floors.length,2);h.undo();assert.equal(JSON.stringify(h.current),two);
  h.undo();assert.deepEqual(h.current,original);h.redo();assert.equal(JSON.stringify(h.current),two);
  h.commit(updateFloor(h.current,h.current.activeFloorId,{name:'Bedroom level'}));assert.equal(h.future.length,0);
});
test('invalid or oversized building imports are rejected; unrecognized fields are removed',()=>{
  const home=fromPlan(preset('studio'));assert.throws(()=>parseBuilding('{'));assert.throws(()=>parseBuilding(JSON.stringify({...home,version:3})));
  assert.throws(()=>parseBuilding(' '.repeat(10_000_001)));
  for(const patch of [{floors:[]},{activeFloorId:'s99'},{nextFloorId:1},{floors:[home.floors[0],home.floors[0]]}])assert.throws(()=>validateBuilding({...home,...patch}));
  assert.throws(()=>parseBuilding(JSON.stringify({...home,floors:[{...home.floors[0],plan:{...home.floors[0].plan,objects:[{id:'f999',catalogId:'unknown'}]}}]})));
  const clean=parseBuilding(JSON.stringify({...home,extra:'discard',floors:[{...home.floors[0],secret:'discard'}]}));
  assert.ok(!('extra'in clean));assert.ok(!('secret'in clean.floors[0]));
});
