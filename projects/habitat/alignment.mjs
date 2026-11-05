import {snap,wallPoints} from './model.mjs';

const REACH = .35;

export function alignPoint(plan, point, enabled = true) {
  const aligned = {x:snap(point.x), y:snap(point.y)};
  if (!enabled) return aligned;

  for (const axis of ['x', 'y']) {
    const cross = axis === 'x' ? 'y' : 'x';
    let nearest = REACH;
    for (const wall of plan.walls) {
      const [a,b] = wallPoints(plan, wall);
      // Align to the wall centerline or to a nearby endpoint.
      for (const end of [a,b]) {
        const from = a[axis] === b[axis] ? Math.min(a[cross],b[cross]) : end[cross];
        const to = a[axis] === b[axis] ? Math.max(a[cross],b[cross]) : end[cross];
        const along = Math.max(from - point[cross], point[cross] - to, 0);
        const distance = Math.hypot(point[axis] - end[axis], along);
        if (distance < nearest) {
          nearest = distance;
          aligned[axis] = end[axis];
        }
      }
    }
  }
  return aligned;
}
