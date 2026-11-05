import {openingCuts,objectBase,objectTop} from './model.mjs';

const EPSILON = 1e-6;

function footprint(o) {
  const angle = o.rotation * Math.PI / 180;
  return {x:o.x, y:o.y, hw:o.w/2, hd:o.d/2, c:Math.cos(angle), s:Math.sin(angle)};
}

function projectedRadius(box, x, y) {
  return box.hw*Math.abs(box.c*x + box.s*y) + box.hd*Math.abs(-box.s*x + box.c*y);
}

function intersects(a, b) {
  const dx = b.x-a.x, dy = b.y-a.y;
  const crosses = (x, y) => projectedRadius(a,x,y) + projectedRadius(b,x,y) - Math.abs(dx*x + dy*y) > EPSILON;
  // A rectangle pair must overlap on the width and depth axes of both.
  return crosses(a.c,a.s) && crosses(-a.s,a.c) && crosses(b.c,b.s) && crosses(-b.s,b.c);
}

/** Report positive penetration on one floor without changing or validating the plan. */
export function overlaps(plan, objectId) {
  const object = plan.objects.find(o => o.id === objectId);
  if (!object) return false;
  const box = footprint(object);
  const bottom=objectBase(object),top=objectTop(object);
  const verticalOverlap=(from,to)=>Math.min(top,to)-Math.max(bottom,from)>EPSILON;
  if (plan.objects.some(o => o !== object && verticalOverlap(objectBase(o),objectTop(o)) && intersects(box, footprint(o)))) return true;

  const vertices = new Map(plan.vertices.map(v => [v.id, v]));
  for (const wall of plan.walls) {
    const a = vertices.get(wall.a), b = vertices.get(wall.b);
    const dx = b.x-a.x, dy = b.y-a.y, length = Math.hypot(dx,dy);
    const c = dx/length, s = dy/length;
    const segment = (from, to) => {
      const mid = (from+to)/2;
      return {x:a.x+c*mid, y:a.y+s*mid, hw:(to-from)/2, hd:wall.thickness/2, c, s};
    };
    if (!intersects(box, segment(0,length))) continue;
    if (openingCuts(plan,wall).some(cut =>
      verticalOverlap(cut.bottom,cut.top) && intersects(box,segment(cut.from,cut.to))
    )) return true;
  }
  return false;
}
