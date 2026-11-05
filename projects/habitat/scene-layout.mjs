export const SLAB_THICKNESS = .2;
export const EXPLODED_GAP = 1.5;

/** Keep every plan in the same X/Z coordinates; only its floor datum moves. */
export function floorLayout(home, mode='stacked') {
  const building=home.version===2;
  const floors=building?home.floors:[{id:'s1',plan:home,height:Math.max(3,...home.walls.map(w=>w.height+.3),...home.objects.map(o=>o.h+.3))}];
  const activeFloorId=building?home.activeFloorId:'s1';
  let elevation=0;
  return floors.map((floor,index)=>{
    const entry={...floor,active:floor.id===activeFloorId,elevation:elevation+(mode==='exploded'?index*EXPLODED_GAP:0)};
    elevation+=floor.height;
    return entry;
  }).filter(floor=>mode!=='active'||floor.active);
}

/** A bounding sphere fits in both the horizontal and vertical field of view. */
export function fitDistance(size, fov, aspect) {
  const half=fov*Math.PI/360;
  const angle=Math.min(half,Math.atan(Math.tan(half)*aspect));
  return Math.max(1,Math.hypot(size.x,size.y,size.z)/2)/Math.sin(angle)*1.05;
}
