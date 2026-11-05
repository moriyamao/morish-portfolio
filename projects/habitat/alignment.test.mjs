import test from 'node:test';
import assert from 'node:assert/strict';
import {addRoom,addWall,blank} from './model.mjs';
import {alignPoint} from './alignment.mjs';

const plan=addRoom(blank(),{x:0,y:0},{x:6,y:4});

test('nearby wall and corner snapping keeps connected geometry orthogonal',()=>{
  const start=alignPoint(plan,{x:6.21,y:4.16});
  assert.deepEqual(start,{x:6,y:4});
  assert.deepEqual(alignPoint(plan,{x:5.81,y:2.17}),{x:6,y:2.2});
  const next=addWall(plan,start,{x:9,y:start.y});
  assert.equal(next.vertices.filter(v=>v.x===6&&v.y===4).length,1);
});

test('disabled alignment and remote walls use normal grid snapping',()=>{
  assert.deepEqual(alignPoint(plan,{x:6.21,y:4.16},false),{x:6.2,y:4.2});
  assert.deepEqual(alignPoint(plan,{x:6.21,y:8.16}),{x:6.2,y:8.2});
});
