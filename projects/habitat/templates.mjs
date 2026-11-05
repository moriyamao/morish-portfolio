import {blank,preset,addRoom,addWall,addOpening,addObject,updateEntity,deleteEntity,wallPoints} from './model.mjs';
import {fromPlan,addFloor,setFloorPlan,updateFloor,selectFloor} from './building.mjs';

export const TEMPLATES = Object.freeze([
  {id:'blank',title:'Blank plot',description:'An empty floor. Draw your first room to establish the footprint.',storeys:1,bedrooms:0,style:'Your choice',footprint:'0 × 0 m'},
  {id:'studio',title:'The warm studio',description:'Open living and sleeping with a separate bathroom, kitchen counter and dining nook.',storeys:1,bedrooms:0,style:'Warm oak',footprint:'8 × 6 m'},
  {id:'bungalow',title:'One-bedroom bungalow',description:'A private double bedroom, separate bathroom and open living, kitchen and dining space.',storeys:1,bedrooms:1,style:'Warm oak',footprint:'8 × 8 m'},
  {id:'family',title:'Family bungalow',description:'Two independently accessed bedrooms with a shared bathroom and an open living and dining area.',storeys:1,bedrooms:2,style:'Warm oak',footprint:'10 × 8 m'},
  {id:'duplex',title:'Two-storey family home',description:'Living, kitchen, dining and a bath below; two bedrooms and a bath above. Aligned conceptual stair markers.',storeys:2,bedrooms:2,style:'Oak and sage',footprint:'9 × 8 m'},
  {id:'townhouse',title:'Three-storey townhouse',description:'Living and kitchen below, two bedrooms and a bath on the middle floor, then a workspace and lounge. Conceptual stair markers.',storeys:3,bedrooms:2,style:'Oak and walnut',footprint:'6 × 9 m'}
].map(record=>Object.freeze(record)));

const point=(x,y)=>({x,y});
const near=(a,b)=>Math.abs(a-b)<1e-6;

// Resolve openings after all partitions have split their shared walls.
function opening(plan,kind,x,y,patch={}) {
  const wall=plan.walls.find(w=>{
    const [a,b]=wallPoints(plan,w);
    return near(a.x,b.x)?near(x,a.x)&&y>Math.min(a.y,b.y)&&y<Math.max(a.y,b.y):
      near(y,a.y)&&x>Math.min(a.x,b.x)&&x<Math.max(a.x,b.x);
  });
  if(!wall)throw new Error(`Template opening has no wall at ${x}, ${y}.`);
  const [a]=wallPoints(plan,wall);
  plan=addOpening(plan,wall.id,kind,Math.hypot(x-a.x,y-a.y));
  return Object.keys(patch).length?updateEntity(plan,plan.openings.at(-1).id,patch):plan;
}

function furnish(plan,items) {
  for(const [catalogId,x,y,patch={}]of items) {
    plan=addObject(plan,catalogId,x,y);
    if(Object.keys(patch).length)plan=updateEntity(plan,plan.objects.at(-1).id,patch);
  }
  return plan;
}

function shell(name,width,depth,partitions) {
  let plan=blank();plan.name=name;
  plan=addRoom(plan,point(0,0),point(width,depth));
  for(const [x1,y1,x2,y2]of partitions)plan=addWall(plan,point(x1,y1),point(x2,y2));
  return plan;
}

function familyPlan() {
  let plan=preset('2bed');
  // Give each bedroom its own living-area door instead of a pass-through bedroom.
  const connecting=plan.openings.find(o=>o.kind==='door'&&wallPoints(plan,plan.walls.find(w=>w.id===o.wallId)).every(v=>near(v.y,4)));
  plan=deleteEntity(plan,connecting.id);
  plan=opening(plan,'door',5,6);
  for(const [catalogId,patch]of [
    ['sofa',{x:.7,y:5.7,rotation:90}],['lamp',{x:.7,y:4.1}],
    ['table',{x:3.1,y:3.8,rotation:90}],['chair',{x:2.2,y:3.8,rotation:90}]
  ])plan=updateEntity(plan,plan.objects.find(o=>o.catalogId===catalogId).id,patch);
  // Each private room has its own exterior window.
  plan=opening(plan,'window',10,2);
  return opening(plan,'window',10,6);
}

function duplexPlans() {
  let ground=shell('Living, kitchen and bath',9,8,[[6,0,6,2.8],[6,2.8,9,2.8]]);
  ground=opening(ground,'door',6.2,8);
  ground=opening(ground,'door',6.9,2.8);
  for(const [x,y]of [[1.8,0],[4.3,0],[2.3,8],[0,5.8],[9,5.8]])ground=opening(ground,'window',x,y);
  ground=opening(ground,'window',7.5,0,{height:.6,sill:1.5});
  ground=furnish(ground,[
    ['counter',1.5,.6],['counter',3.5,.6],['table',3.5,3.8],
    ['chair',3.5,3],['chair',3.5,4.6,{rotation:180}],
    ['sofa',2,6,{material:'sage'}],['lamp',.6,6],['plant',.6,7.4],
    ['bath',8.1,1.3],['toilet',6.8,.8],['stair',7.7,5.7]
  ]);

  let upper=shell('Two bedrooms and bath',9,8,[[3,0,3,5],[6,0,6,5],[0,5,6,5],[6,2.8,9,2.8]]);
  for(const [x,y]of [[1.9,5],[4.8,5],[6.9,2.8]])upper=opening(upper,'door',x,y);
  for(const [x,y]of [[1.5,0],[4.5,0],[0,3.7],[9,4]])upper=opening(upper,'window',x,y);
  upper=opening(upper,'window',7.5,0,{height:.6,sill:1.5});
  upper=furnish(upper,[
    ['bed',1.5,1.8],['bed',4.5,1.8],['chair',1,3.7],['chair',4,3.7],
    ['bath',8.1,1.3],['toilet',6.8,.8],['stair',7.7,5.7],
    ['chair',1.3,6.5,{material:'sage'}],['plant',.6,7.4]
  ]);
  return [ground,upper];
}

function townhousePlans() {
  const bathroom=[[3.4,0,3.4,2.4],[3.4,2.4,6,2.4]];
  let ground=shell('Living, kitchen and bath',6,9,bathroom);
  ground=opening(ground,'door',3.7,9);
  ground=opening(ground,'door',4.7,2.4);
  for(const [x,y]of [[1.6,0],[0,6.3],[1.2,9]])ground=opening(ground,'window',x,y);
  ground=opening(ground,'window',4.7,0,{height:.6,sill:1.5});
  ground=furnish(ground,[
    ['counter',1.6,.6,{w:2.4}],['table',1.8,3.5],['chair',1.8,2.7],['chair',1.8,4.3,{rotation:180}],
    ['sofa',1.7,6.4],['lamp',.6,7.4],['plant',.6,8.4],
    ['bath',5.3,1.1],['toilet',4,.6],['stair',4.9,6.2]
  ]);

  let upper=shell('Two bedrooms and bath',6,9,[[3.4,0,3.4,9],[0,4.5,3.4,4.5],[3.4,2.4,6,2.4]]);
  for(const [x,y]of [[3.4,3.4],[3.4,8],[4.7,2.4]])upper=opening(upper,'door',x,y);
  for(const [x,y]of [[1.7,0],[1.7,9],[0,3.5],[0,7.2]])upper=opening(upper,'window',x,y);
  upper=opening(upper,'window',4.7,0,{height:.6,sill:1.5});
  upper=furnish(upper,[
    ['bed',1.7,1.8],['bed',1.7,6.3],['chair',.6,3.5],['chair',.6,8],
    ['bath',5.3,1.1],['toilet',4,.6],['stair',4.9,6.2]
  ]);

  let top=shell('Workspace and lounge',6,9,[[0,4,6,4]]);
  top=opening(top,'door',4.7,4);
  for(const [x,y]of [[1.6,0],[4.4,0],[1.7,9],[0,6.3],[6,2.5]])top=opening(top,'window',x,y);
  top=furnish(top,[
    ['table',1.6,1.5,{w:1.8,d:.7}],['table',4.4,1.5,{w:1.8,d:.7}],
    ['chair',1.6,2.3,{rotation:180}],['chair',4.4,2.3,{rotation:180}],['counter',1.8,.5],['plant',.6,3.2],
    ['sofa',1.7,6.3],['table',1.7,7.5,{w:1.2,d:.6,h:.45}],['chair',.7,8.3],['stair',4.9,6.2]
  ]);
  return [ground,upper,top];
}

/** New editable documents on every call; stair furnishings are conceptual only. */
export function createTemplate(id) {
  const template=TEMPLATES.find(t=>t.id===id);
  if(!template)throw new Error(`Unknown HABITAT template: ${id}`);
  let plans;
  switch(id) {
    case 'blank':plans=[blank()];break;
    case 'studio':plans=[preset('studio')];break;
    case 'bungalow':plans=[preset('1bed')];break;
    case 'family':plans=[familyPlan()];break;
    case 'duplex':plans=duplexPlans();break;
    case 'townhouse':plans=townhousePlans();break;
  }
  let home=fromPlan(plans[0],template.title);
  for(let i=1;i<plans.length;i++) {
    home=addFloor(home,{copy:false});
    home=setFloorPlan(home,plans[i]);
    home=updateFloor(home,home.activeFloorId,{name:i===1?'First floor':'Second floor'});
  }
  return plans.length===1?home:selectFloor(home,home.floors[0].id);
}
