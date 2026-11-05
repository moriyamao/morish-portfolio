import test from 'node:test';
import assert from 'node:assert/strict';
import {blank,addWall} from './model.mjs';
import {floorLayout,fitDistance,SLAB_THICKNESS} from './scene-layout.mjs';

const home=()=>({version:2,activeFloorId:'s3',floors:[3,3.8,3,4,3].map((height,i)=>({id:`s${i+1}`,height,plan:blank()}))});

test('five storeys accumulate lower floor heights and leave slab below the datum',()=>{
  const h=home(),before=structuredClone(h),layout=floorLayout(h);
  assert.deepEqual(layout.map(f=>f.elevation),[0,3,6.8,9.8,13.8]);
  assert.deepEqual(layout.map(f=>f.active),[false,false,true,false,false]);
  assert.equal(layout[0].elevation-SLAB_THICKNESS,-.2);
  assert.equal(layout[2].plan,h.floors[2].plan);
  assert.deepEqual(h,before);
});

test('exploding inserts 1.5m per lower storey without changing floor heights',()=>{
  const layout=floorLayout(home(),'exploded');
  assert.deepEqual(layout.map(f=>f.elevation),[0,4.5,9.8,14.3,19.8]);
  assert.deepEqual(layout.map(f=>f.height),[3,3.8,3,4,3]);
});

test('active mode retains real elevation, coordinates and floor-scoped entity IDs',()=>{
  const h=home();
  for(const f of h.floors)f.plan=addWall(f.plan,{x:-8,y:6},{x:-2,y:6});
  const [active]=floorLayout(h,'active');
  assert.equal(floorLayout(h,'active').length,1);
  assert.equal(active.id,'s3');assert.equal(active.elevation,6.8);
  assert.equal(active.plan.walls[0].id,h.floors[0].plan.walls[0].id);
  assert.deepEqual(active.plan.vertices.map(({x,y})=>({x,y})),[{x:-8,y:6},{x:-2,y:6}]);
});

test('legacy plans render once at ground level even in active mode',()=>{
  const plan=addWall(blank(),{x:0,y:0},{x:4,y:0});plan.walls[0].height=5;
  for(const mode of ['stacked','exploded','active']){
    const [floor]=floorLayout(plan,mode);
    assert.equal(floor.plan,plan);assert.equal(floor.elevation,0);assert.equal(floor.active,true);assert.equal(floor.height,5.3);
  }
});

test('camera sphere fits portrait and landscape viewports including vertical extent',()=>{
  const size={x:12,y:22,z:8},fov=37,radius=Math.hypot(size.x,size.y,size.z)/2;
  for(const aspect of [.35,.6,1,2.4]){
    const distance=fitDistance(size,fov,aspect),half=fov*Math.PI/360;
    const angularRadius=Math.asin(radius/distance);
    assert.ok(angularRadius<half);
    assert.ok(angularRadius<Math.atan(Math.tan(half)*aspect));
  }
  assert.ok(fitDistance(size,fov,.35)>fitDistance(size,fov,1));
  assert.ok(fitDistance(size,fov,1)>fitDistance({...size,y:3},fov,1));
  assert.ok(Number.isFinite(fitDistance({x:0,y:0,z:0},fov,1)));
});
