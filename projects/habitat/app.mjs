import {CATALOG,MATERIALS,clone,snap,edit,preset,wallPoints,wallLength,pointOnWall,addWall,addRoom,moveVertex,moveWall,resizeWall,addOpening,addObject,updateEntity,deleteEntity,duplicateObject,detectRooms,bounds} from './model.mjs';
import {planContent,exportSVG} from './plan.mjs';
import {fromPlan,parseBuilding,activeFloor,addFloor,setFloorPlan,selectFloor,updateFloor,removeFloor,editBuilding,moveBuilding,BuildingHistory,MAX_FLOORS,MAX_BUILDING_BYTES} from './building.mjs';
import {TEMPLATES,createTemplate} from './templates.mjs';
import {overlaps} from './collision.mjs';
import {encodeShare,decodeShare} from './share.mjs';
import {alignPoint} from './alignment.mjs';
import {moveRoom,objectBase,roomContains} from './model.mjs';
const $=id=>document.getElementById(id), svg=$('plan'), storageKey='habitat.design.v2';
let home=fromPlan(preset('studio')),loadNote='',restored=false,hasEdited=false;
try{const saved=localStorage.getItem(storageKey),legacy=localStorage.getItem('habitat.design.v1');if(saved){try{home=parseBuilding(saved);restored=true;loadNote='Restored your multi-storey home.';}catch(e){if(legacy){home=parseBuilding(legacy);restored=true;loadNote='The latest save could not be read. Your original single-storey backup was restored.';}else loadNote=`Local restore unavailable: ${e.message}`;}}else if(legacy){home=parseBuilding(legacy);restored=true;loadNote='Your saved home is ready for more floors. The original backup is preserved.';}}catch(e){loadNote=`Local restore unavailable: ${e.message}`;}
try{const shared=await decodeShare(location.hash);if(shared){home=shared;restored=false;loadNote='Shared home opened. Edit it to save a local copy.';}}catch(e){loadNote=e.message;}
const history=new BuildingHistory(home);home=history.current;let m=activeFloor(home).plan;
let selected=null,tool='select',view=bounds(m),initialWidth=view.w,scene=null,sceneFailed=false,sceneMode='stacked',saveTimer,gesture=null,space=false,grid=true,labels=true,points=new Map(),pendingAction=null;
const hints={select:'Hold the floor or furniture to grab the room, then drag.',room:'Drag a rectangle. Connected edges join automatically.',wall:'Drag a straight wall. Ends snap to the 0.1 m grid.',door:'Click a wall to place a 0.9 m door. Keep clear of junctions.',window:'Click a wall to place a 1.2 m window.',pan:'Drag to pan. Pinch or scroll to zoom.'};
function message(text,error=false){$('message').textContent=text;$('message').classList.toggle('error',error);}
function entity(){return [...m.objects,...m.walls,...m.openings].find(e=>e.id===selected);}
function selectedRoom(){return selected?.includes(':')?detectRooms(m).find(room=>room.id===selected):null;}
function setView(){svg.setAttribute('viewBox',`${view.x} ${view.y} ${view.w} ${view.h}`);$('zoom-label').textContent=`${Math.round(initialWidth/view.w*100)}%`;}
function fit(){view=bounds(m);initialWidth=view.w;setView();}
function save(){hasEdited=true;clearTimeout(saveTimer);const snapshot=JSON.stringify(home);$('save-status').textContent='Saving locally…';saveTimer=setTimeout(()=>{try{localStorage.setItem(storageKey,snapshot);$('save-status').textContent='Saved on this device';}catch{$('save-status').textContent='Autosave unavailable · download JSON';}},350);}
function updateScene(){if(scene)try{const preview=gesture?.buildingPreview??{...home,floors:home.floors.map(f=>f.id===home.activeFloorId?{...f,plan:m}:f)};scene.update(preview,selected,{mode:sceneMode});}catch(e){sceneFailure(e);}}
function render({details=true,three=true}={}){svg.innerHTML=planContent(m,{selected,grid,labels,overlap:gesture?.overlap});setView();$('project-name').value=home.name;$('plan-empty').hidden=!!(m.walls.length||m.objects.length);$('undo').disabled=!history.past.length;$('redo').disabled=!history.future.length;const rooms=detectRooms(m);$('stats').textContent=`${home.floors.length} ${home.floors.length===1?'storey':'storeys'} · ${rooms.reduce((s,r)=>s+r.area,0).toFixed(1)} m² on this floor`;
  if(selected&&!entity()&&!rooms.some(room=>room.id===selected))selected=null;if(details){renderFloorControls();renderProperties();}if(three)updateScene();}
function commitHome(next,note='Home updated.'){if(history.commit(next)){home=history.current;m=activeFloor(home).plan;save();render();message(note);return true;}return false;}
function commit(next,note='Design updated.'){return commitHome(setFloorPlan(home,next),note);}
function attempt(fn,note){try{return commit(fn(),note);}catch(e){message(e.message,true);return false;}}
function attemptHome(fn,note){try{return commitHome(fn(),note);}catch(e){message(e.message,true);return false;}}
function select(id){selected=id;render();}
function setTool(next){tool=next;document.querySelectorAll('[data-tool]').forEach(b=>{b.classList.toggle('active',b.dataset.tool===tool);b.setAttribute('aria-pressed',String(b.dataset.tool===tool));});document.querySelectorAll('[data-catalog]').forEach(b=>{b.classList.toggle('active',tool===`object:${b.dataset.catalog}`);b.setAttribute('aria-pressed',String(tool===`object:${b.dataset.catalog}`));});svg.classList.toggle('select',tool==='select');svg.classList.toggle('pan',tool==='pan');$('tool-hint').textContent=hints[tool]||`Click the plan to place a ${CATALOG[tool.split(':')[1]]?.label.toLowerCase()}.`;renderProperties();}
const icons={wardrobe:'<rect x="5" y="4" width="30" height="26"/><path d="M20 4v26"/>',desk:'<path d="M5 11h30v6H5zM8 17v13m24-13v13"/>',diningTable:'<ellipse cx="20" cy="17" rx="16" ry="10"/>',tvUnit:'<rect x="5" y="4" width="30" height="20"/><path d="M13 29h14m-7-5v5"/>',rug:'<rect x="5" y="5" width="30" height="24" rx="3"/><path d="M11 10h18v14H11z"/>',tallPlant:'<path d="M14 24h12l-2 7h-8zM20 24V3m0 9L11 7m9 12 10-7"/>',bookshelf:'<path d="M6 3h28v28H6zM6 13h28M6 22h28M13 5v8m10 2v7"/>',vanity:'<rect x="4" y="6" width="32" height="22"/><ellipse cx="20" cy="18" rx="8" ry="5"/>',sofa:'<rect x="4" y="12" width="32" height="13" rx="2"/><path d="M8 12V6h24v6M12 13v9m16-9v9M7 25v3m26-3v3"/>',table:'<path d="M7 9h26v9H7zM10 18v10m20-10v10"/>',chair:'<path d="M11 15V5h18v10M9 15h22v5H9zM12 20v9m16-9v9"/>',bed:'<rect x="7" y="4" width="26" height="25" rx="2"/><path d="M7 14h26M11 8h7v4h-7zm11 0h7v4h-7z"/>',counter:'<path d="M3 8h34v20H3zM3 12h34m-22 0v16m10-16v16M7 16h4m7 0h4m6 0h5"/>',bath:'<rect x="9" y="3" width="22" height="27" rx="6"/><rect x="13" y="7" width="14" height="19" rx="4"/>',toilet:'<path d="M12 3h16v8H12z"/><ellipse cx="20" cy="20" rx="10" ry="10"/><ellipse cx="20" cy="20" rx="6" ry="6"/>',plant:'<path d="M14 21h12l-2 10h-8zM20 22V8M20 16C4 18 8 4 20 16M20 12C32 15 33 2 20 12M20 9C10 9 17-3 20 9"/>',lamp:'<path d="M10 4h20l5 12H5zM20 16v13M11 30h18"/>',stair:'<path d="M5 28V21h8v-7h8V7h8V1h7v27z"/>'};
const furnitureGroups={sofa:'living',table:'living',chair:'living',tvUnit:'living',rug:'living',bed:'bedroom',wardrobe:'bedroom',desk:'bedroom',counter:'kitchen',diningTable:'kitchen',bath:'bathroom',toilet:'bathroom',vanity:'bathroom',plant:'decor',tallPlant:'decor',lamp:'decor',stair:'decor',bookshelf:'decor'};
$('catalog').innerHTML=Object.entries(CATALOG).map(([id,c])=>`<button data-catalog="${id}" data-group="${furnitureGroups[id]||'decor'}" aria-pressed="false" title="Place ${c.label.toLowerCase()}"><svg viewBox="0 0 40 34" aria-hidden="true">${icons[id]}</svg>${c.label==='Dining table'?'Table':c.label==='Double bed'?'Bed':c.label==='Floor lamp'?'Lamp':c.label==='Decorative stair'?'Stair':c.label}</button>`).join('');
document.querySelector('.tools').insertAdjacentHTML('beforeend','<button data-tool="pan" title="Pan the plan"><span aria-hidden="true">✥</span>Pan</button>');
hints.building='Drag anywhere on the plan to move all floors together. Esc exits.';
document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>{
  const next=button.dataset.tool;
  if(next==='building'){
    if(tool==='building'){setTool('select');return;}
    selected=null;setTab(false);render();
  }
  setTool(next);
}));
document.querySelectorAll('[data-catalog]').forEach(b=>b.addEventListener('click',()=>setTool(`object:${b.dataset.catalog}`)));
$('furniture-filter').addEventListener('change',event=>{const group=event.target.value;document.querySelectorAll('[data-catalog]').forEach(button=>{button.hidden=group!=='all'&&button.dataset.group!==group;});});
function field(key,label,value,{step=.1,min=-50,max=50,wide=false}={}){return `<label class="field ${wide?'wide':''}">${label}<input data-property="${key}" type="number" value="${value}" step="${step}" min="${min}" max="${max}" required></label>`;}
function finish(material){return `<div><p class="section-label">FINISH / ${material.toUpperCase()}</p><div class="swatches">${Object.entries(MATERIALS).map(([key,color])=>`<button data-material="${key}" class="${material===key?'active':''}" style="background:${color}" title="${key}" aria-label="${key} finish" aria-pressed="${material===key}"></button>`).join('')}</div></div>`;}
function renderProperties(){const e=entity(),room=selectedRoom(),isObject=m.objects.includes(e),isWall=m.walls.includes(e),isOpening=m.openings.includes(e),container=$('properties');let html='';
  const entries=[...detectRooms(m).map((r,i)=>({id:r.id,label:`Room ${i+1} · ${r.area.toFixed(1)} m²`})),...m.walls.map((e,i)=>({id:e.id,label:`Wall ${i+1} · ${wallLength(m,e).toFixed(1)} m`})),...m.openings.map(e=>({id:e.id,label:`${e.kind} · ${e.id}`})),...m.objects.map(e=>({id:e.id,label:`${CATALOG[e.catalogId].label} · ${e.id}`}))];
  html+=`<label class="field wide">Select an element<select id="entity-list"><option value="">Design settings</option>${entries.map(e=>`<option value="${e.id}" ${selected===e.id?'selected':''}>${e.label}</option>`).join('')}</select></label>`;
  $('selection-id').textContent=room?'ROOM SELECTED':e?`${isObject?'FURNITURE':isWall?'CONNECTED WALL':'OPENING'} / ${e.id.toUpperCase()}`:'DESIGN SETTINGS';
  if(tool==='room'||tool==='wall') {
    html+=`<div><h2 class="property-title">${tool==='room'?'Draw a room':'Draw a wall'}</h2><p class="property-sub">Drag on the plan, or use exact coordinates below.</p></div><form id="create-geometry"><div class="fields">${field('startX','Start X · m',0)}${field('startY','Start Y · m',0)}${field('endX','End X · m',tool==='room'?4:3)}${field('endY','End Y · m',tool==='room'?3:0)}</div><div class="object-actions"><button class="dark" type="submit">Add ${tool}</button></div></form>`;
  }else if(tool.startsWith('object:')){const type=tool.split(':')[1];html+=`<div><h2 class="property-title">${CATALOG[type].label}</h2><p class="property-sub">Click to place on the plan. Or add at the center of your current view.</p><button id="place-center">Place at center</button></div>`;}
  else if((tool==='door'||tool==='window')&&!isOpening){html+=`<div><h2 class="property-title">Add a ${tool}</h2><p class="property-sub">Click a wall, or select a wall above and place the opening at its midpoint.</p><button id="opening-center" ${isWall?'':'disabled'}>Place in selected wall</button></div>`;}
  else if(room){html+=`<div><h2 class="property-title">Room · ${room.area.toFixed(1)} m²</h2><p class="property-sub">Drag the room floor or use arrow keys. Shared walls stay connected, so neighboring rooms may resize.</p></div>`;}
  else if(e){let fields='';html+=`<div><h2 class="property-title">${isObject?CATALOG[e.catalogId].label:isWall?'Wall':' '+e.kind[0].toUpperCase()+e.kind.slice(1)}</h2><p class="property-sub">${isWall?'Connected corners move together. Edits preserve orthogonal walls.':isOpening?'Position is measured from the start of its host wall.':'Dimensions in metres. Rotation in degrees.'}</p></div>`;
    if(isObject)fields=field('x','Center X · m',e.x)+field('y','Center Y · m',e.y)+field('w','Width · m',e.w,{min:.2,max:10})+field('d','Depth · m',e.d,{min:.2,max:10})+field('h','Height · m',e.h,{min:.2,max:6})+field('rotation','Rotation · °',e.rotation,{step:1,min:0,max:359})+field('elevation','Elevation above floor · m',objectBase(e),{step:'any',min:0,max:8,wide:true});
    if(isWall){const [a,b]=wallPoints(m,e);fields=field('length','Length · m',Number(wallLength(m,e).toFixed(2)),{min:.1,max:100})+field('height','Height · m',e.height,{min:1,max:6})+field('thickness','Thickness · m',e.thickness,{step:.01,min:.05,max:.5})+field('ax','Start X · m',a.x)+field('ay','Start Y · m',a.y)+field('bx','End X · m',b.x)+field('by','End Y · m',b.y);}
    if(isOpening)fields=field('offset','Position · m',Number(e.offset.toFixed(2)),{min:0,max:100})+field('width','Width · m',e.width,{min:.3,max:5})+field('height','Height · m',e.height,{min:.3,max:5})+(e.kind==='window'?field('sill','Sill height · m',e.sill,{min:0,max:5}):'');
    html+=`<div class="fields">${fields}</div>${isObject?`<div class="object-actions"><button id="lower-object" ${objectBase(e)===0?'disabled':''}>↓ Lower 10 cm</button><button id="raise-object">↑ Raise 10 cm</button></div>`:''}${!isOpening?finish(e.material):''}<div class="object-actions">${isObject?'<button id="rotate-object">Rotate 90°</button><button id="duplicate">Duplicate</button>':''}<button class="delete" id="delete">Delete ${isWall?'wall':isOpening?e.kind:'object'}</button></div>`;
  }else {html+=`<div><h2 class="property-title">Your foundation.</h2><p class="property-sub">Select something to edit, or set the defaults for your next walls.</p></div><div class="fields">${field('height','New wall height · m',m.settings.height,{min:1,max:6})}${field('thickness','Thickness · m',m.settings.thickness,{step:.01,min:.05,max:.5})}</div>${finish(m.settings.floor)}<p class="inspector-note">Floor finish applies to all enclosed rooms. Wall defaults apply to newly drawn walls. Draw connected boundaries to discover room areas.</p>`;}
  container.innerHTML=html;
  $('entity-list').addEventListener('change',event=>{selected=event.target.value||null;setTool('select');render();});
  container.querySelectorAll('[data-property]').forEach(input=>input.addEventListener('change',()=>{
    if(input.closest('#create-geometry'))return;const key=input.dataset.property,value=Number(input.value);
    if(input.value===''||!input.checkValidity()){message('Enter a number within the shown limits.',true);renderProperties();return;}
    attempt(()=>{if(!e)return edit(m,n=>n.settings[key]=value);if(isWall&&key==='length')return resizeWall(m,e.id,value);if(isWall&&['ax','ay','bx','by'].includes(key)){const [a,b]=wallPoints(m,e),v=key[0]==='a'?a:b;return moveVertex(m,v.id,key[1]==='x'?value:v.x,key[1]==='y'?value:v.y);}return updateEntity(m,e.id,{[key]:value});},'Dimensions updated.');renderProperties();
  }));
  container.querySelectorAll('[data-material]').forEach(b=>b.addEventListener('click',()=>attempt(()=>e?updateEntity(m,e.id,{material:b.dataset.material}):edit(m,n=>n.settings.floor=b.dataset.material),'Finish updated.')));
  $('delete')?.addEventListener('click',()=>{if(attempt(()=>deleteEntity(m,selected),'Element deleted.')){selected=null;render();}});
  $('duplicate')?.addEventListener('click',()=>{if(attempt(()=>duplicateObject(m,selected),'Object duplicated.')){selected=m.objects.at(-1).id;render();}});
  $('rotate-object')?.addEventListener('click',()=>attempt(()=>updateEntity(m,e.id,{rotation:(e.rotation+90)%360}),'Object rotated.'));
  for(const [id,delta] of [['lower-object',-.1],['raise-object',.1]])$(id)?.addEventListener('click',()=>{
    const elevation=Math.max(0,Number((objectBase(e)+delta).toFixed(8)));
    if(attempt(()=>updateEntity(m,e.id,{elevation}),'Object elevation updated.'))$(id)?.focus();
  });
  $('place-center')?.addEventListener('click',()=>placeObject(tool.split(':')[1],{x:view.x+view.w/2,y:view.y+view.h/2}));
  $('opening-center')?.addEventListener('click',()=>placeOpening(e.id,wallLength(m,e)/2));
  $('create-geometry')?.addEventListener('submit',event=>{event.preventDefault();const get=key=>Number(container.querySelector(`[data-property="${key}"]`).value),p={x:get('startX'),y:get('startY')},q={x:get('endX'),y:get('endY')};if(attempt(()=>tool==='room'?addRoom(m,p,q):addWall(m,p,q),`${tool==='room'?'Room':'Wall'} added.`)){fit();setTool('select');}});
}
function placeObject(c,p){if(attempt(()=>addObject(m,c,p.x,p.y),`${CATALOG[c].label} placed.`)){selected=m.objects.at(-1).id;setTool('select');render();}}
function placeOpening(wallId,offset){const kind=tool;if(attempt(()=>addOpening(m,wallId,kind,offset),`${kind==='door'?'Door':'Window'} added.`)){selected=m.openings.at(-1).id;setTool('select');render();}}
function world(event){const point=svg.createSVGPoint();point.x=event.clientX;point.y=event.clientY;return point.matrixTransform(svg.getScreenCTM().inverse());}
function zoom(factor,center={x:view.x+view.w/2,y:view.y+view.h/2}){const width=Math.max(1.5,Math.min(125,view.w*factor)),ratio=width/view.w;view={x:center.x+(view.x-center.x)*ratio,y:center.y+(view.y-center.y)*ratio,w:width,h:view.h*ratio};setView();}
svg.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(Math.max(-.25,Math.min(.25,e.deltaY*.0015))),world(e));},{passive:false});
function ghost(p,q){const NS='http://www.w3.org/2000/svg',el=document.createElementNS(NS,tool==='room'?'rect':'line');el.id='draw-preview';el.setAttribute('fill','#c3976420');el.setAttribute('stroke','#a86f49');el.setAttribute('stroke-width','.04');el.setAttribute('stroke-dasharray','.12 .06');if(tool==='room'){el.setAttribute('x',Math.min(p.x,q.x));el.setAttribute('y',Math.min(p.y,q.y));el.setAttribute('width',Math.abs(q.x-p.x));el.setAttribute('height',Math.abs(q.y-p.y));}else{for(const [key,value]of Object.entries({x1:p.x,y1:p.y,x2:q.x,y2:q.y}))el.setAttribute(key,value);}svg.querySelector('#draw-preview')?.remove();svg.append(el);}
const alignToggle=$('align');
try{alignToggle.checked=localStorage.getItem('habitat.align')!=='off';}catch{/* Use the default. */}
alignToggle.addEventListener('change',()=>{
  try{localStorage.setItem('habitat.align',alignToggle.checked?'on':'off');}catch{/* The toggle still works for this session. */}
  message(alignToggle.checked?'Nearby wall alignment on.':'Nearby wall alignment off. Grid snapping is still on.');
});
function endPoint(g,p){
  const q=alignPoint(g.base,p,g.align);
  if(g.type==='wall'){
    if(Math.abs(p.x-g.start.x)>Math.abs(p.y-g.start.y))q.y=g.p.y;
    else q.x=g.p.x;
  }
  return q;
}
function armRoomHold(drag,room,event){
  drag.holdOrigin={x:event.clientX,y:event.clientY};
  setTimeout(()=>{
    if(gesture!==drag||drag.moved||points.size!==1||tool!=='select')return;
    selected=room.id;
    gesture={type:'room-move',room,p:drag.p,base:drag.base,moved:false};
    render();
    message('Room grabbed. Drag to move its walls and furniture.');
  },450);
}
svg.addEventListener('contextmenu',event=>{if(tool==='select')event.preventDefault();});
svg.addEventListener('pointerdown',event=>{
  if(event.button!==0&&event.button!==1)return;event.preventDefault();svg.focus({preventScroll:true});svg.setPointerCapture(event.pointerId);points.set(event.pointerId,{x:event.clientX,y:event.clientY});
  if(points.size===2){
    const base=gesture?.base,[a,b]=[...points.values()],mid={clientX:(a.x+b.x)/2,clientY:(a.y+b.y)/2};
    gesture={type:'pinch',distance:Math.hypot(a.x-b.x,a.y-b.y),view:{...view},anchor:world(mid)};
    if(base){m=base;render();}return;
  }
  if(points.size>2)return;const p=world(event),base=clone(m),hit=event.target.closest('[data-id]'),id=hit?.dataset.id,vertex=event.target.dataset.vertex,handle=event.target.dataset.handle;
  if(event.button===1||space||tool==='pan'){gesture={type:'pan',p,view:{...view},client:{x:event.clientX,y:event.clientY}};return;}
  if(tool==='building'){gesture={type:'building',p,base};return;}
  if(tool==='room'||tool==='wall'){
    const align=alignToggle.checked;
    gesture={type:tool,start:p,p:alignPoint(base,p,align),base,align};return;
  }
  if(tool.startsWith('object:')||tool==='door'||tool==='window'){
    const place=()=>{if(tool.startsWith('object:')){placeObject(tool.split(':')[1],p);return;}
      const w=m.walls.find(w=>w.id===id);if(!w){message('Tap a wall to place the opening.',true);return;}
      const [a,b]=wallPoints(m,w);placeOpening(w.id,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/wallLength(m,w));};
    if(event.pointerType==='touch')gesture={type:'tap',place,client:{x:event.clientX,y:event.clientY}};
    else place();
    return;
  }
  if(vertex){gesture={type:'vertex',id:vertex,p,base};return;}
  selected=id||null;render();
  const room=selectedRoom();
  if(room){
    gesture={type:'room-move',room,p,base,moved:false};
    armRoomHold(gesture,room,event);
    return;
  }
  const e=entity();if(!e)return;
  gesture={type:handle|| (m.objects.includes(e)?'object':m.walls.includes(e)?'wall-move':'opening'),id:e.id,p,base,entity:clone(e),moved:false};
  if(gesture.type==='object'){
    const parentRoom=detectRooms(base).find(candidate=>roomContains(candidate,e));
    if(parentRoom)armRoomHold(gesture,parentRoom,event);
  }
});
svg.addEventListener('pointermove',event=>{
  if(points.has(event.pointerId))points.set(event.pointerId,{x:event.clientX,y:event.clientY});const g=gesture;if(!g)return;
  if(g.type==='pinch'){
    if(points.size<2)return;
    const [a,b]=[...points.values()],mid={clientX:(a.x+b.x)/2,clientY:(a.y+b.y)/2};
    view={...g.view};zoom(Math.max(1,g.distance)/Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),g.anchor);
    const current=world(mid);view.x+=g.anchor.x-current.x;view.y+=g.anchor.y-current.y;setView();return;
  }
  if(g.type==='tap'){g.moved=g.moved||Math.hypot(event.clientX-g.client.x,event.clientY-g.client.y)>9;return;}
  if(g.holdOrigin&&!g.moved){
    if(Math.hypot(event.clientX-g.holdOrigin.x,event.clientY-g.holdOrigin.y)<5)return;
    g.moved=true;
  }
  const p=world(event);
  if(g.type==='building'){
    const dx=snap(p.x-g.p.x),dy=snap(p.y-g.p.y);
    try{
      g.buildingPreview=dx||dy?moveBuilding(home,dx,dy):null;
      m=g.buildingPreview?activeFloor(g.buildingPreview).plan:g.base;
      render({details:false});
      message('Release to move all floors. Esc cancels.');
    }catch(e){
      g.buildingPreview=null;m=g.base;render({details:false});message(e.message,true);
    }
    return;
  }
  if(g.type==='pan'){const matrix=svg.getScreenCTM();view={...g.view,x:g.view.x-(event.clientX-g.client.x)/matrix.a,y:g.view.y-(event.clientY-g.client.y)/matrix.d};setView();return;}
  if(g.type==='room'||g.type==='wall'){g.q=endPoint(g,p);ghost(g.p,g.q);return;}
  const dx=snap(p.x-g.p.x),dy=snap(p.y-g.p.y);g.moved=g.moved||Math.hypot(p.x-g.p.x,p.y-g.p.y)>.025;if(!g.moved)return;
  try{let next;
    if(g.type==='room-move')next=dx||dy?moveRoom(g.base,g.room,dx,dy):g.base;
    if(g.type==='vertex')next=moveVertex(g.base,g.id,snap(p.x),snap(p.y));
    if(g.type==='object')next=updateEntity(g.base,g.id,{x:snap(g.entity.x+dx),y:snap(g.entity.y+dy)});
    if(g.type==='wall-move')next=moveWall(g.base,g.id,dx,dy);
    if(g.type==='opening'){const w=g.base.walls.find(w=>w.id===g.entity.wallId),[a,b]=wallPoints(g.base,w),l=wallLength(g.base,w);next=updateEntity(g.base,g.id,{offset:snap(g.entity.offset+((p.x-g.p.x)*(b.x-a.x)+(p.y-g.p.y)*(b.y-a.y))/l)});}
    if(g.type==='resize'){const o=g.entity,angle=-o.rotation*Math.PI/180,x=p.x-o.x,y=p.y-o.y;next=updateEntity(g.base,g.id,{w:Math.max(.2,snap(Math.abs(x*Math.cos(angle)-y*Math.sin(angle))*2)),d:Math.max(.2,snap(Math.abs(x*Math.sin(angle)+y*Math.cos(angle))*2))});}
    if(g.type==='rotate'){const angle=Math.atan2(p.y-g.entity.y,p.x-g.entity.x)*180/Math.PI+90;next=updateEntity(g.base,g.id,{rotation:(Math.round(angle/15)*15+360)%360});}
    if(next){m=next;g.overlap=g.type==='object'&&overlaps(m,g.id)?g.id:null;render({details:false});message(g.overlap?'Overlapping furniture or wall. You can still place it.':'Release to apply. Esc cancels.',!!g.overlap);}
  }catch(e){if(g.type==='room-move'){m=g.base;render({details:false});}message(e.message,true);}
});
function finishGesture(event,cancel=false){points.delete(event.pointerId);const g=gesture;if(!g)return;if(g.type==='pinch'){if(!points.size)gesture=null;return;}gesture=null;svg.querySelector('#draw-preview')?.remove();
  if(cancel){if(g.base){m=g.base;render();}return;}
  if(g.type==='building'){
    m=g.base;
    if(g.buildingPreview){commitHome(g.buildingPreview,'Building moved.');scene?.reset();}
    else render();
    return;
  }
  if(g.type==='tap'){if(!g.moved)g.place();return;}
  if(g.type==='room'||g.type==='wall'){if(g.q)attempt(()=>g.type==='room'?addRoom(g.base,g.p,g.q):addWall(g.base,g.p,g.q),`${g.type==='room'?'Room':'Wall'} added.`);return;}
  if(g.base&&m!==g.base){const next=m;m=g.base;if(commit(next,'Edit applied.'))return;render();}
}
svg.addEventListener('pointerup',event=>finishGesture(event));svg.addEventListener('pointercancel',event=>finishGesture(event,true));
function cancelGesture(){if(gesture?.base)m=gesture.base;gesture=null;points.clear();render();}
$('zoom-in').addEventListener('click',()=>zoom(.8));$('zoom-out').addEventListener('click',()=>zoom(1.25));$('fit').addEventListener('click',fit);
$('grid').addEventListener('change',e=>{grid=e.target.checked;render({three:false});});$('labels').addEventListener('change',e=>{labels=e.target.checked;render({three:false});});
function resetWorkspace(){selected=null;fit();setTool('select');render();scene?.reset();}
function travel(direction){const floor=home.activeFloorId;cancelGesture();home=history[direction]();m=activeFloor(home).plan;selected=null;save();if(floor!==home.activeFloorId)resetWorkspace();else render();message(direction==='undo'?'Undid last edit.':'Redid edit.');}
$('undo').addEventListener('click',()=>travel('undo'));$('redo').addEventListener('click',()=>travel('redo'));
function renderFloorControls(){
  const floor=activeFloor(home), select=$('floor-select');
  select.replaceChildren(...home.floors.map(f=>new Option(f.name,f.id)));
  select.value=floor.id;$('floor-name').value=floor.name;$('floor-height').value=floor.height;
  $('add-floor').disabled=$('copy-floor').disabled=home.floors.length>=MAX_FLOORS;
  $('remove-floor').disabled=home.floors.length===1;
}
function switchFloor(id){
  if(id===home.activeFloorId)return;
  cancelGesture();history.current=selectFloor(home,id);home=history.current;m=activeFloor(home).plan;save();
  selected=null;fit();setTool('select');render();if(sceneMode==='active')scene?.reset();
  message(`Editing ${activeFloor(home).name}.`);
}
function confirmEdit(title,copy,action,run){
  $('confirm-title').textContent=title;$('confirm-copy').textContent=copy;$('confirm-action').textContent=action;
  pendingAction=run;$('confirm-dialog').showModal();
}
$('confirm-dialog').addEventListener('close',()=>{pendingAction=null;});
$('cancel-action').addEventListener('click',()=>$('confirm-dialog').close());
$('confirm-action').addEventListener('click',()=>{const run=pendingAction;$('confirm-dialog').close();run?.();});
$('floor-select').addEventListener('change',e=>switchFloor(e.target.value));
for(const [id,copy] of [['add-floor',false],['copy-floor',true]])$(id).addEventListener('click',()=>{
  cancelGesture();selected=null;if(attemptHome(()=>addFloor(home,{copy}),copy?'Floor copied to the top.':'Blank floor added to the top.'))resetWorkspace();
});
$('remove-floor').addEventListener('click',()=>{
  const floor=activeFloor(home);
  confirmEdit(`Remove ${floor.name}?`,'This removes the floor and everything on it. Undo restores it.','Remove floor',()=>{
    cancelGesture();selected=null;if(attemptHome(()=>removeFloor(home,floor.id),'Floor removed. Undo restores it.'))resetWorkspace();
  });
});
for(const [id,key] of [['floor-name','name'],['floor-height','height']])$(id).addEventListener('change',e=>{
  const value=key==='height'?e.target.valueAsNumber:e.target.value.trim();
  if(attemptHome(()=>updateFloor(home,home.activeFloorId,{[key]:value}),'Floor details updated.')){if(key==='height')scene?.reset();}
  else renderFloorControls();
});
$('building-view').addEventListener('change',e=>{sceneMode=e.target.value;updateScene();scene?.reset();});
function applyTemplate(template){
  const run=()=>{cancelGesture();selected=null;sceneMode=template.storeys>1?'exploded':'stacked';$('building-view').value=sceneMode;commitHome(createTemplate(template.id),'Template loaded. Undo restores your previous design.');resetWorkspace();};
  $('templates-dialog').close();
  if(home.floors.length>1||m.walls.length||m.objects.length)confirmEdit(`Start with ${template.title}?`,'This replaces the current design. You can undo it or save a JSON backup before switching.','Use template',run);
  else run();
}
function populateTemplates(){
  for(const template of TEMPLATES){
    const plan=activeFloor(createTemplate(template.id)).plan, b=bounds(plan), button=document.createElement('button');
    button.className='template-card';
    button.innerHTML=`<svg aria-hidden="true" viewBox="${b.x} ${b.y} ${b.w} ${b.h}">${planContent(plan,{grid:true,labels:false,exporting:true})}</svg><span class="template-info"><small></small><strong></strong><span></span></span>`;
    button.querySelector('small').textContent=`${template.storeys} ${template.storeys===1?'storey':'storeys'} · ${template.style}`;
    button.querySelector('strong').textContent=template.title;button.querySelector('.template-info > span').textContent=template.description;
    button.addEventListener('click',()=>applyTemplate(template));$('template-gallery').append(button);
  }
}
$('browse-templates').addEventListener('click',()=>{if(!$('template-gallery').childElementCount)populateTemplates();$('templates-dialog').showModal();});
$('close-templates').addEventListener('click',()=>$('templates-dialog').close());
$('project-name').addEventListener('change',e=>attemptHome(()=>editBuilding(home,n=>n.name=e.target.value.trim()||'Untitled residence'),'Project renamed.'));
document.addEventListener('keydown',event=>{if(event.target.closest('input,select,textarea,dialog'))return;if(event.key==='Escape'){cancelGesture();setTool('select');message('Selection tool ready.');return;}if(event.key===' '&&event.target===svg){space=true;event.preventDefault();}
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'){event.preventDefault();travel(event.shiftKey?'redo':'undo');return;}if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='y'){event.preventDefault();travel('redo');return;}if(event.ctrlKey||event.metaKey||event.altKey)return;
  const keys={v:'select',r:'room',w:'wall',d:'door',n:'window'};if(keys[event.key.toLowerCase()]){setTool(keys[event.key.toLowerCase()]);return;}
  if(event.target.closest('#scene'))return;
  if((event.key==='Delete'||event.key==='Backspace')&&entity()){event.preventDefault();attempt(()=>deleteEntity(m,selected),'Element deleted.');selected=null;render();return;}
  const room=selectedRoom();
  if(room&&event.key.startsWith('Arrow')){
    const step=event.shiftKey?.5:.1;
    const delta={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[event.key];
    if(delta){event.preventDefault();attempt(()=>moveRoom(m,room,...delta),'Room moved.');return;}
  }
  const e=entity(),step=event.shiftKey?.5:.1,delta={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[event.key];if(e&&delta){event.preventDefault();const [dx,dy]=delta;attempt(()=>m.objects.includes(e)?updateEntity(m,e.id,{x:snap(e.x+dx),y:snap(e.y+dy)}):m.walls.includes(e)?moveWall(m,e.id,dx,dy):updateEntity(m,e.id,{offset:snap(e.offset+(dx||dy))}),'Selection moved.');}
});document.addEventListener('keyup',e=>{if(e.key===' ')space=false;});window.addEventListener('blur',()=>{space=false;if(gesture)cancelGesture();});
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const filename=(name=home.name)=>name.replace(/[^a-z0-9_-]+/gi,'-').slice(0,70)||'habitat';
$('download').addEventListener('click',()=>{download(new Blob([JSON.stringify(home,null,2)],{type:'application/json'}),`${filename()}.habitat.json`);message('JSON backup downloaded with all floors.');});
const copyLink=document.createElement('button');copyLink.textContent='Copy link';$('download').after(copyLink);
copyLink.addEventListener('click',async()=>{
  copyLink.disabled=true;
  try{
    const url=new URL(location.href);url.hash=await encodeShare(home);
    try{await navigator.clipboard.writeText(url.href);message('Design link copied.');}
    catch{$('share-url').value=url.href;$('share-dialog').showModal();$('share-url').select();}
  }catch(e){message(e.message,true);}finally{copyLink.disabled=false;}
});
$('import').addEventListener('click',()=>$('file').click());$('file').addEventListener('change',async event=>{const file=event.target.files[0];event.target.value='';if(!file)return;try{if(file.size>MAX_BUILDING_BYTES)throw new Error('Document exceeds the 10 MB limit.');const next=parseBuilding(await file.text());cancelGesture();selected=null;commitHome(next,'Validated design opened. Undo restores the previous design.');resetWorkspace();}catch(e){message(`Could not open design: ${e.message}`,true);}});
$('export').addEventListener('click',async()=>{const button=$('export');button.disabled=true;try{const text=exportSVG(m),url=URL.createObjectURL(new Blob([text],{type:'image/svg+xml;charset=utf-8'}));try{const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('This browser could not rasterize the plan.'));img.src=url;});const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas is unavailable.');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw new Error('PNG export failed.');download(blob,`${filename()}-plan.png`);message('Plan PNG exported with a metre scale and white background.');}finally{URL.revokeObjectURL(url);}}catch(e){message(e.message,true);}finally{button.disabled=false;}});
function setTab(three){document.querySelector('.studio').classList.toggle('show-3d',three);$('tab-plan').setAttribute('aria-selected',String(!three));$('tab-3d').setAttribute('aria-selected',String(three));}
const mobile=matchMedia('(max-width: 760px)'), inspector=document.querySelector('.inspector'), workspace=document.querySelector('.studio'), sheet=$('details-sheet');
function positionInspector(){
  if(mobile.matches)sheet.append(inspector);
  else{if(sheet.open)sheet.close();workspace.append(inspector);}
}
mobile.addEventListener('change',positionInspector);positionInspector();
$('open-details').addEventListener('click',()=>sheet.showModal());
$('close-details').addEventListener('click',()=>sheet.close());
$('tab-plan').addEventListener('click',()=>setTab(false));$('tab-3d').addEventListener('click',()=>setTab(true));document.querySelector('.mobile-tabs').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const three=e.key==='ArrowRight';setTab(three);$(three?'tab-3d':'tab-plan').focus();}});
$('help').addEventListener('click',()=>$('help-dialog').showModal());for(const id of ['close-help','start'])$(id).addEventListener('click',()=>$('help-dialog').close());$('help-dialog').addEventListener('click',e=>{if(e.target===$('help-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('hero-templates').addEventListener('click',()=>$('browse-templates').click());
function sceneFailure(){if(sceneFailed)return;sceneFailed=true;scene?.dispose();scene=null;$('scene-status').hidden=false;$('scene-status').textContent='3D view unavailable. Reload to retry. You can keep editing, saving and exporting your floor plan.';$('reset-camera').disabled=true;$('building-view').disabled=true;}
$('reset-camera').addEventListener('click',()=>scene?.reset());
setTool('select');render();if(loadNote)message(loadNote,!restored);$('save-status').textContent=restored?'Restored from this device':'Ready to save locally';
window.addEventListener('pagehide',()=>{if(!hasEdited)return;clearTimeout(saveTimer);try{localStorage.setItem(storageKey,JSON.stringify(history.current));}catch{/* Downloaded JSON remains the portable backup. */}});
import('./scene.mjs').then(({createScene})=>{if(sceneFailed)return;try{scene=createScene($('scene'),(id,floorId)=>{if(floorId)switchFloor(floorId);selected=id;setTool('select');render();},sceneFailure);updateScene();scene?.reset();if(scene)$('scene-status').hidden=true;}catch(e){sceneFailure(e);}}).catch(sceneFailure);
