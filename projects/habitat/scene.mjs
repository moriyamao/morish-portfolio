import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {MATERIALS,wallPoints,wallLength,openingCuts,detectRooms} from './model.mjs';
import {floorLayout,fitDistance,SLAB_THICKNESS} from './scene-layout.mjs';
export function createScene(container,onSelect,onFailure) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor('#e9e7dd');container.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','Three dimensional model. Drag to orbit, scroll or pinch to zoom. Select and edit using the floor plan and Details.');renderer.domElement.tabIndex=0;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(37,1,.1,250),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.12;controls.minPolarAngle=.12;controls.maxPolarAngle=Math.PI/2-.03;controls.minDistance=2;controls.maxDistance=100;controls.target.set(4,0,3);
  scene.add(new THREE.HemisphereLight('#fff9e8','#9faaa0',2.4));const sun=new THREE.DirectionalLight('#fff2d5',3);sun.position.set(-6,15,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-30;sun.shadow.camera.right=30;sun.shadow.camera.top=30;sun.shadow.camera.bottom=-30;sun.shadow.normalBias=.04;sun.shadow.bias=-.0001;scene.add(sun);scene.add(sun.target);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshStandardMaterial({color:'#e9e7dd',roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-SLAB_THICKNESS-.005;ground.receiveShadow=true;scene.add(ground);
  let root=new THREE.Group(),model,selected,frame=0,disposed=false,viewKey,sceneBounds;scene.add(root);
  function render(){frame=0;if(disposed)return;try{controls.update();renderer.render(scene,camera);}catch(e){onFailure(e);}}
  function request(){if(!frame&&!disposed)frame=requestAnimationFrame(render);}
  controls.addEventListener('change',request);
  const resize=()=>{const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(model)reset();else request();};const observer=new ResizeObserver(resize);observer.observe(container);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();onFailure(new Error('WebGL context lost. Your plan and editing controls are still available.'));});
  const materials=new Set();
  const material=(color,metalness=0)=>{const mat=new THREE.MeshStandardMaterial({color,roughness:.78,metalness});materials.add(mat);return mat;};
  function box(parent,w,h,d,x,y,z,mat){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function cylinder(parent,r1,r2,h,x,y,z,mat,segments=16){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function object(o,parent,floorId,active){const g=new THREE.Group();g.position.set(o.x,0,o.y);g.rotation.y=-o.rotation*Math.PI/180;g.userData={id:o.id,floorId};const w=o.w,d=o.d,h=o.h,c=material(MATERIALS[o.material]),light=material('#ede7da'),dark=material('#665b4c'),leaf=material('#79866b');
    const legs=(top)=>{for(const x of [-w*.36,w*.36])for(const z of [-d*.34,d*.34])box(g,.045,top,.045,x,top/2,z,dark);};
    switch(o.catalogId){
      case 'sofa':legs(h*.2);box(g,w,h*.28,d,0,h*.36,0,c);box(g,w,h*.65,d*.18,0,h*.64,-d*.41,c);for(const x of [-w*.46,w*.46])box(g,w*.08,h*.48,d,x,h*.52,0,c);for(const x of [-w*.23,w*.23])box(g,w*.43,h*.16,d*.7,x,h*.57,d*.04,light);break;
      case 'table':legs(h*.92);box(g,w,h*.08,d,0,h*.96,0,c);break;
      case 'chair':legs(h*.5);box(g,w,h*.08,d,0,h*.5,0,c);box(g,w,h*.45,d*.08,0,h*.775,-d*.46,c);break;
      case 'bed':box(g,w,h*.55,d,0,h*.275,0,dark);box(g,w*.98,h*.32,d*.97,0,h*.71,0,light);box(g,w,h,d*.06,0,h/2,-d*.48,c);box(g,w*.99,h*.1,d*.6,0,h*.91,d*.18,c);for(const x of [-w*.24,w*.24])box(g,w*.42,h*.12,d*.2,x,h*.93,-d*.31,light);break;
      case 'counter':box(g,w,h*.92,d,0,h*.46,0,c);box(g,w*1.03,h*.08,d*1.04,0,h*.96,0,light);for(const x of [-w/3,0,w/3])box(g,w*.27,.015,.02,x,h*.76,d*.505,dark);break;
      case 'bath':box(g,w,.08,d,0,.04,0,light);box(g,w*.76,.06,d*.78,0,.12,0,material('#b6c9c4'));for(const x of [-w*.45,w*.45])box(g,w*.1,h,d,x,h/2,0,c);for(const z of [-d*.45,d*.45])box(g,w,h,d*.1,0,h/2,z,c);break;
      case 'toilet':cylinder(g,w*.3,w*.24,h*.5,0,h*.25,d*.05,c);{const bowl=cylinder(g,w*.46,w*.3,h*.16,0,h*.55,d*.12,light);bowl.scale.z=d/w*.65;}box(g,w,h*.55,d*.25,0,h*.725,-d*.35,c);break;
      case 'tallPlant':
      case 'plant':cylinder(g,w*.29,w*.22,h*.32,0,h*.16,0,c).scale.z=d/w;cylinder(g,.025,.035,h*.6,0,h*.55,0,dark,8);for(let i=0;i<7;i++){const leafMesh=new THREE.Mesh(new THREE.SphereGeometry(1,10,6),leaf),angle=i*2.4;leafMesh.position.set(Math.cos(angle)*w*.2,h*.55+i*h*.045,Math.sin(angle)*d*.2);leafMesh.scale.set(w*.25,h*.18,d*.22);leafMesh.castShadow=true;g.add(leafMesh);}break;
      case 'lamp':cylinder(g,w*.42,w*.45,.04,0,.02,0,dark).scale.z=d/w;cylinder(g,.018,.018,h*.82,0,h*.42,0,dark,8);cylinder(g,w*.32,w*.5,h*.22,0,h*.87,0,light).scale.z=d/w;break;
      case 'stair':for(let i=0;i<9;i++)box(g,w,h*(i+1)/9,d/9,0,h*(i+1)/18,d/2-d*(i+.5)/9,c);break;
      case 'wardrobe':
        box(g,w,h,d*.92,0,h/2,-d*.04,c);
        for(const x of [-w*.25,w*.25])box(g,w*.48,h*.96,d*.08,x,h/2,d*.46,c);
        for(const x of [-w*.045,w*.045])box(g,.025,.13,.025,x,h*.54,d*.51,dark);
        break;
      case 'desk':legs(h*.9);box(g,w,h*.1,d,0,h*.95,0,c);box(g,w*.35,h*.25,d*.9,w*.29,h*.78,0,c);break;
      case 'diningTable':legs(h*.92);cylinder(g,w/2,w/2,h*.08,0,h*.96,0,c,32).scale.z=d/w;break;
      case 'tvUnit':
        box(g,w,h*.35,d,0,h*.175,0,c);
        box(g,w*.78,h*.5,d*.1,0,h*.75,-d*.23,material('#303535'));
        box(g,w*.34,h*.18,d*.16,0,h*.43,-d*.23,dark);
        break;
      case 'rug':box(g,w,h*.08,d,0,h*.04,0,c);break;
      case 'bookshelf':
        box(g,w,h,d*.08,0,h/2,-d*.46,c);
        for(const x of [-w*.47,w*.47])box(g,w*.06,h,d,x,h/2,0,c);
        for(const y of [.025,.26,.5,.74,.975])box(g,w,h*.05,d,0,h*y,0,c);
        break;
      case 'vanity':
        box(g,w,h*.88,d,0,h*.44,0,c);
        box(g,w,h*.12,d,0,h*.94,0,light);
        cylinder(g,w*.29,w*.23,.035,0,h,0,material('#b6c9c4')).scale.z=d/w;
        cylinder(g,.02,.02,.10,0,h+.05,-d*.32,dark);
        break;
    }
    if(active&&o.id===selected){const outline=new THREE.BoxGeometry(w+.06,h+.04,d+.06),edges=new THREE.LineSegments(new THREE.EdgesGeometry(outline),new THREE.LineBasicMaterial({color:'#b76d3f'}));outline.dispose();edges.position.y=h/2;g.add(edges);}parent.add(g);
  }
  function clear(){root.traverse(o=>{o.geometry?.dispose();if(o.material)for(const mat of [].concat(o.material))materials.add(mat);});for(const mat of materials)mat.dispose();materials.clear();scene.remove(root);root=new THREE.Group();scene.add(root);}
  function renderFloor({id:floorId,plan:m,elevation,active},mode){
    const parent=new THREE.Group();parent.position.y=elevation;parent.userData.floorId=floorId;root.add(parent);
    for(const room of detectRooms(m)){const points=room.points.map(p=>new THREE.Vector2(p.x,-p.y)),shape=new THREE.Shape(points);for(const hole of room.holes)shape.holes.push(new THREE.Path(hole.map(p=>new THREE.Vector2(p.x,-p.y))));const slab=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:SLAB_THICKNESS,bevelEnabled:false,steps:1}),material(MATERIALS[m.settings.floor]));slab.rotation.x=-Math.PI/2;slab.position.y=-SLAB_THICKNESS;slab.receiveShadow=true;parent.add(slab);
    }
    for(const w of m.walls){const [a,b]=wallPoints(m,w),g=new THREE.Group();g.position.set(a.x,0,a.y);g.rotation.y=-Math.atan2(b.y-a.y,b.x-a.x);g.userData={id:w.id,floorId};const c=material(active&&w.id===selected?'#c29a74':MATERIALS[w.material]);for(const cut of openingCuts(m,w))box(g,cut.to-cut.from,cut.top-cut.bottom,w.thickness,(cut.from+cut.to)/2,(cut.top+cut.bottom)/2,0,c);
      for(const o of m.openings.filter(o=>o.wallId===w.id)){const frameMat=material(active&&o.id===selected?'#b76d3f':'#a69072'),opening=new THREE.Group();opening.userData={id:o.id,floorId};opening.position.x=o.offset;for(const x of [-o.width/2,o.width/2])box(opening,.045,o.height+.05,w.thickness+.035,x,o.sill+o.height/2,0,frameMat);box(opening,o.width,.045,w.thickness+.035,0,o.sill+o.height,0,frameMat);
        if(o.kind==='window'){box(opening,o.width,.04,w.thickness+.08,0,o.sill,0,frameMat);box(opening,.03,o.height,.04,0,o.sill+o.height/2,0,frameMat);const glass=new THREE.MeshStandardMaterial({color:'#b9d5d4',transparent:true,opacity:.24,roughness:.2,side:THREE.DoubleSide,depthWrite:false});box(opening,o.width-.05,o.height-.05,.012,0,o.sill+o.height/2,0,glass);}
        else {const hinge=new THREE.Group();hinge.position.x=-o.width/2;hinge.rotation.y=-Math.PI/3;box(hinge,o.width-.05,o.height-.05,.035,(o.width-.05)/2,o.height/2,0,material('#bda589'));box(hinge,.07,.025,.08,o.width-.15,o.height*.48,.04,material('#76644c',.5));opening.add(hinge);}g.add(opening);
      }parent.add(g);
    }
    for(const o of m.objects)object(o,parent,floorId,active);
    // Keep the active storey opaque; surrounding storeys provide a cutaway context.
    if(!active){const opacity=mode==='exploded'?.55:.22,seen=new Set();parent.traverse(o=>{o.castShadow=false;if(o.material)for(const mat of [].concat(o.material)){if(seen.has(mat))continue;seen.add(mat);mat.transparent=true;mat.opacity*=opacity;mat.depthWrite=false;}});}
  }
  function update(home,selection,{mode='stacked'}={}){model=home;selected=selection;clear();const floors=floorLayout(home,mode);for(const floor of floors)renderFloor(floor,mode);
    root.updateMatrixWorld(true);sceneBounds=new THREE.Box3().setFromObject(root);
    if(sceneBounds.isEmpty()){const elevation=floors[0]?.elevation||0;sceneBounds.set(new THREE.Vector3(-1,elevation-SLAB_THICKNESS,-1),new THREE.Vector3(9,elevation+3,7));}
    const center=sceneBounds.getCenter(new THREE.Vector3()),size=sceneBounds.getSize(new THREE.Vector3()),radius=Math.max(5,size.length()/2);sun.target.position.copy(center);sun.position.copy(center).add(new THREE.Vector3(-.8,1.8,1.2).multiplyScalar(radius));sun.shadow.camera.left=-radius;sun.shadow.camera.right=radius;sun.shadow.camera.top=radius;sun.shadow.camera.bottom=-radius;sun.shadow.camera.far=radius*5;sun.shadow.camera.updateProjectionMatrix();
    const nextKey=JSON.stringify([mode,...floors.map(f=>[f.id,f.elevation,f.height])]);if(nextKey!==viewKey){viewKey=nextKey;reset();}else request();
  }
  function reset(){if(!sceneBounds)return;const size=sceneBounds.getSize(new THREE.Vector3()),distance=fitDistance(size,camera.fov,camera.aspect);sceneBounds.getCenter(controls.target);controls.maxDistance=Math.max(100,distance*2);camera.far=Math.max(250,distance*4);camera.updateProjectionMatrix();camera.position.copy(controls.target).add(new THREE.Vector3(.95,1.15,1.1).normalize().multiplyScalar(distance));controls.update();request();}
  let down;
  renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
  renderer.domElement.addEventListener('pointerup',e=>{const start=down;down=null;if(!start||Math.hypot(e.clientX-start.x,e.clientY-start.y)>5)return;const rect=renderer.domElement.getBoundingClientRect(),ray=new THREE.Raycaster();camera.updateMatrixWorld();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);for(const hit of ray.intersectObject(root,true)){let o=hit.object;while(o&&!o.userData.floorId)o=o.parent;if(o?.userData.floorId){onSelect(o.userData.id||null,o.userData.floorId);return;}}onSelect(null,model?.activeFloorId||'s1');});
  renderer.domElement.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key)){e.preventDefault();const offset=camera.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.12;if(e.key==='ArrowRight')spherical.theta+=.12;if(e.key==='ArrowUp')spherical.phi=Math.max(.12,spherical.phi-.1);if(e.key==='ArrowDown')spherical.phi=Math.min(Math.PI/2-.03,spherical.phi+.1);if(e.key==='+')spherical.radius=Math.max(2,spherical.radius*.9);if(e.key==='-')spherical.radius=Math.min(controls.maxDistance,spherical.radius*1.1);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();request();}});
  resize();return {update,reset,dispose(){disposed=true;observer.disconnect();controls.dispose();cancelAnimationFrame(frame);clear();ground.geometry.dispose();ground.material.dispose();sun.shadow.dispose();renderer.dispose();renderer.domElement.remove();}};
}
