import {blank, clone, validate, parseDocument, snap, objectBase, objectTop} from './model.mjs';

export const BUILDING_VERSION = 2;
export const MAX_FLOORS = 5;
export const MAX_BUILDING_BYTES = 10_000_000;
export const SLAB_THICKNESS = .2;
const fail = message => { throw new Error(message); };
const text = (value, max, label) => {
  if (typeof value !== 'string' || !value.trim() || value.length > max) fail(`${label} needs 1–${max} characters.`);
};
export function activeFloor(home) {
  const floor = home.floors.find(f => f.id === home.activeFloorId);
  if (!floor) fail('The selected floor does not exist.');
  return floor;
}
export function validateBuilding(home) {
  if (!home || home.version !== BUILDING_VERSION) fail('Unsupported home version. Open a HABITAT version 1 or 2 file.');
  text(home.name, 100, 'Project name');
  if (!Number.isSafeInteger(home.nextFloorId) || home.nextFloorId < 2 || home.nextFloorId > 1e9) fail('Invalid floor ID sequence.');
  if (!Array.isArray(home.floors) || home.floors.length < 1 || home.floors.length > MAX_FLOORS) fail(`A home needs 1–${MAX_FLOORS} floors.`);
  const ids = new Set();
  for (const floor of home.floors) {
    if (!floor || typeof floor.id !== 'string' || !/^s\d{1,9}$/.test(floor.id) || ids.has(floor.id) || Number(floor.id.slice(1)) >= home.nextFloorId) fail('Floor IDs must be unique and below the next floor ID.');
    ids.add(floor.id); text(floor.name, 40, 'Floor name');
    if (typeof floor.height !== 'number' || !Number.isFinite(floor.height) || floor.height < 2 || floor.height > 8) fail('Floor-to-floor height must be between 2 and 8 metres.');
    validate(floor.plan);
    const tallest = Math.max(floor.plan.settings.height, ...floor.plan.walls.map(w => w.height), ...floor.plan.objects.filter(o => o.catalogId !== 'stair'||objectBase(o)>0).map(objectTop));
    if (tallest > floor.height - SLAB_THICKNESS + 1e-6) fail(`${floor.name}: increase floor height to at least ${(tallest + SLAB_THICKNESS).toFixed(2)} m to fit its walls, furniture and slab.`);
  }
  if (!ids.has(home.activeFloorId)) fail('The selected floor does not exist.');
  return home;
}
export function fromPlan(plan, name = plan.name) {
  const clean = parseDocument(JSON.stringify(plan));
  const tallest = Math.max(clean.settings.height, ...clean.walls.map(w => w.height), ...clean.objects.map(objectTop));
  const height = Math.max(3, Math.ceil((tallest + .3) * 10) / 10);
  return validateBuilding({version:2, name, nextFloorId:2, activeFloorId:'s1', floors:[{id:'s1', name:'Ground floor', height, plan:clean}]});
}
export function parseBuilding(source) {
  if (typeof source !== 'string' || source.length > MAX_BUILDING_BYTES) fail('Home files must be smaller than 10 MB.');
  let raw;
  try { raw = JSON.parse(source); } catch { fail('This file is not valid JSON.'); }
  if (raw?.version === 1) return fromPlan(parseDocument(source));
  validateBuilding(raw);
  return {version:2, name:raw.name, nextFloorId:raw.nextFloorId, activeFloorId:raw.activeFloorId,
    floors:raw.floors.map(f => ({id:f.id, name:f.name, height:f.height, plan:parseDocument(JSON.stringify(f.plan))}))};
}
export function editBuilding(home, change) {
  const next = clone(home); change(next); return validateBuilding(next);
}
export function moveBuilding(home, dx, dy) {
  return editBuilding(home, next => {
    for (const {plan} of next.floors) {
      for (const point of [...plan.vertices, ...plan.objects]) {
        // Round the sum without snapping away any existing offset.
        point.x = Number((point.x + snap(dx)).toFixed(10));
        point.y = Number((point.y + snap(dy)).toFixed(10));
      }
    }
  });
}
export function selectFloor(home, floorId) {
  return editBuilding(home, next => { next.activeFloorId = floorId; });
}
export function setFloorPlan(home, plan, floorId = home.activeFloorId) {
  return editBuilding(home, next => {
    const floor = next.floors.find(f => f.id === floorId);
    if (!floor) fail('Floor not found.');
    floor.plan = clone(plan);
  });
}
export function addFloor(home, {copy = false} = {}) {
  return editBuilding(home, next => {
    if (next.floors.length >= MAX_FLOORS) fail(`This home already has the maximum ${MAX_FLOORS} floors.`);
    const source = activeFloor(next), id = `s${next.nextFloorId++}`;
    const plan = copy ? clone(source.plan) : blank();
    if (!copy) plan.settings = clone(source.plan.settings);
    next.floors.push({id, name:`Floor ${next.floors.length + 1}`, height:source.height, plan});
    next.activeFloorId = id;
  });
}
export function updateFloor(home, floorId, patch) {
  return editBuilding(home, next => {
    const floor = next.floors.find(f => f.id === floorId);
    if (!floor) fail('Floor not found.');
    for (const key of Object.keys(patch)) if (!['name','height'].includes(key)) fail('Unsupported floor property.');
    Object.assign(floor, patch);
  });
}
export function removeFloor(home, floorId) {
  return editBuilding(home, next => {
    if (next.floors.length === 1) fail('Keep at least one floor in your home.');
    const index = next.floors.findIndex(f => f.id === floorId);
    if (index < 0) fail('Floor not found.');
    next.floors.splice(index, 1);
    if (next.activeFloorId === floorId) next.activeFloorId = next.floors[Math.max(0,index - 1)].id;
  });
}
export class BuildingHistory {
  constructor(initial, limit = 60) { validateBuilding(initial); this.current=clone(initial); this.past=[]; this.future=[]; this.limit=limit; }
  commit(next) {
    validateBuilding(next);
    if (JSON.stringify(next) === JSON.stringify(this.current)) return false;
    this.past.push(clone(this.current)); if(this.past.length>this.limit)this.past.shift();
    this.current=clone(next);this.future=[];return true;
  }
  undo(){if(!this.past.length)return clone(this.current);this.future.push(clone(this.current));this.current=this.past.pop();return clone(this.current);}
  redo(){if(!this.future.length)return clone(this.current);this.past.push(clone(this.current));this.current=this.future.pop();return clone(this.current);}
}
