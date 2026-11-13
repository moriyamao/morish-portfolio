import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import gsap from "gsap";
import Lenis from "lenis";

const html = document.documentElement;
const canvas = document.querySelector<HTMLCanvasElement>(".sc-canvas")!;
const statusEl = document.querySelector<HTMLElement>(".sc-status")!;
const tipEl = document.querySelector<HTMLElement>(".sc-tip")!;
const steps = Array.from(document.querySelectorAll<HTMLElement>(".sc-step[data-key]"));
const introEl = document.querySelector<HTMLElement>(".sc-intro")!;
const outroEl = document.querySelector<HTMLElement>(".sc-outro")!;
const railLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".sc-rail a"));
const progressBar = document.querySelector<HTMLElement>(".sc-progress i")!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => innerWidth < 900;
const lowPower = innerWidth < 900 || (navigator.hardwareConcurrency || 8) <= 4;

const LIME = new THREE.Color("#dcff6e");
const BOARD_W = 11.6, BOARD_D = 6.6, BOARD_Y = 0.46;
const SLOT_X = [-3.9, -1.3, 1.3, 3.9];
const ROW_Z = [-1.45, 1.55];
const POWER = new THREE.Vector3(-5.3, BOARD_Y, 0.05);
const RAIL_Z = -4.25, SHOULDER_Y = 1.17, L1 = 3.3, L2 = 3.0, GRIP = 0.5;

type Kind = "cpu" | "sensor" | "module" | "connector" | "matrix" | "ram" | "coil" | "fan";
type Part = { key: string; kind: Kind; title: string; code: string; part: string; tags: string; img: string; href: string };
const parts: Part[] = steps.map(s => ({
  key: s.dataset.key!, kind: s.dataset.kind as Kind, title: s.dataset.title!, code: s.dataset.code!,
  part: s.dataset.part!, tags: s.dataset.tags!, img: s.dataset.img!, href: s.dataset.href!,
}));
const slotPos = (i: number) => new THREE.Vector3(SLOT_X[i % 4], BOARD_Y, ROW_Z[Math.floor(i / 4)]);

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

function seeded(seed: number) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

if (!hasWebGL() || parts.length === 0) {
  html.classList.add("sc-no3d");
  statusEl.textContent = "3D unavailable · list view";
} else {
  start().catch(err => {
    console.error(err);
    html.classList.add("sc-no3d");
    statusEl.textContent = "3D unavailable · list view";
  });
}

async function start() {
  html.classList.add("sc-3d");
  await Promise.race([document.fonts?.ready, new Promise(r => setTimeout(r, 1500))]);

  // ---------- Renderer, scene, camera ----------
  const renderer = new THREE.WebGLRenderer({canvas, antialias: !lowPower, powerPreference: "high-performance"});
  renderer.setPixelRatio(Math.min(devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !lowPower;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0a110d");
  scene.fog = new THREE.FogExp2("#0a110d", 0.038);

  const camera = new THREE.PerspectiveCamera(isMobile() ? 50 : 36, innerWidth / innerHeight, 0.1, 200);

  scene.add(new THREE.HemisphereLight(0xcfe3c8, 0x0a110d, 0.55));
  const key = new THREE.DirectionalLight(0xfff4e2, 2.1);
  key.position.set(6, 11, 7);
  key.castShadow = !lowPower;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, {left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40});
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.PointLight(0xdcff6e, 18, 22, 1.6);
  rim.position.set(-6, 3.5, -6);
  scene.add(rim);
  const fill = new THREE.PointLight(0x7fb3ff, 6, 20, 1.8);
  fill.position.set(7, 2.5, 5);
  scene.add(fill);

  // ---------- Materials ----------
  const M = {
    chip: new THREE.MeshStandardMaterial({color: 0x121614, roughness: 0.36, metalness: 0.25}),
    pin: new THREE.MeshStandardMaterial({color: 0xc9d1c8, roughness: 0.28, metalness: 0.95}),
    gold: new THREE.MeshStandardMaterial({color: 0xd9b25a, roughness: 0.28, metalness: 1}),
    metal: new THREE.MeshStandardMaterial({color: 0x9aa39c, roughness: 0.3, metalness: 0.9}),
    copper: new THREE.MeshStandardMaterial({color: 0xc4763a, roughness: 0.34, metalness: 0.9}),
    pcb: new THREE.MeshStandardMaterial({color: 0x134a2d, roughness: 0.55, metalness: 0.1}),
    dark: new THREE.MeshStandardMaterial({color: 0x070a08, roughness: 0.85}),
    arm: new THREE.MeshStandardMaterial({color: 0xd9e0d6, roughness: 0.42, metalness: 0.15}),
    joint: new THREE.MeshStandardMaterial({color: 0x1a201c, roughness: 0.5, metalness: 0.4}),
  };
  const glowMat = (intensity = 0.6) => new THREE.MeshStandardMaterial({color: 0x0f140f, emissive: LIME, emissiveIntensity: intensity, roughness: 0.4});
  const shadowed = (o: THREE.Object3D) => { o.traverse(n => { if ((n as THREE.Mesh).isMesh) { n.castShadow = true; n.receiveShadow = true; } }); return o; };

  // ---------- Desk ----------
  const desk = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshStandardMaterial({color: 0x0d1511, roughness: 0.88}));
  desk.rotation.x = -Math.PI / 2;
  desk.receiveShadow = true;
  scene.add(desk);
  const grid = new THREE.GridHelper(60, 60, 0x1d3b29, 0x14261b);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.45;
  grid.position.y = 0.002;
  scene.add(grid);

  // ---------- Board ----------
  const board = new THREE.Group();
  scene.add(board);
  const pcbBody = new THREE.Mesh(new RoundedBoxGeometry(BOARD_W, 0.16, BOARD_D, 4, 0.08), M.pcb);
  pcbBody.position.y = BOARD_Y - 0.08;
  pcbBody.receiveShadow = true;
  pcbBody.castShadow = true;
  board.add(pcbBody);
  for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, BOARD_Y - 0.16, 16), M.gold);
    post.position.set(x * (BOARD_W / 2 - 0.35), (BOARD_Y - 0.16) / 2, z * (BOARD_D / 2 - 0.35));
    board.add(shadowed(post));
  }

  const silk = new THREE.Mesh(new THREE.PlaneGeometry(BOARD_W, BOARD_D), new THREE.MeshStandardMaterial({
    map: silkTexture(renderer), transparent: true, roughness: 0.7, polygonOffset: true, polygonOffsetFactor: -2,
  }));
  silk.rotation.x = -Math.PI / 2;
  silk.position.y = BOARD_Y + 0.002;
  silk.receiveShadow = true;
  board.add(silk);

  // Scattered SMD parts for density.
  const smdRand = seeded(7);
  const smd = new THREE.InstancedMesh(new THREE.BoxGeometry(0.2, 0.07, 0.1), new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.3}), 70);
  const dummy = new THREE.Object3D();
  const smdColors = [new THREE.Color(0x1a1d1b), new THREE.Color(0x8a6a3c), new THREE.Color(0x2b2f2c)];
  let placed = 0;
  for (let n = 0; n < 500 && placed < 70; n++) {
    const x = (smdRand() - 0.5) * (BOARD_W - 0.8), z = (smdRand() - 0.5) * (BOARD_D - 0.8);
    const nearSlot = [0, 1, 2, 3, 4, 5, 6, 7].some(i => { const s = slotPos(i); return Math.abs(s.x - x) < 1.25 && Math.abs(s.z - z) < 1.15; });
    if (nearSlot || Math.abs(z - 0.05) < 0.75 || x < -4.6) continue;
    dummy.position.set(x, BOARD_Y + 0.035, z);
    dummy.rotation.y = smdRand() > 0.5 ? 0 : Math.PI / 2;
    dummy.updateMatrix();
    smd.setMatrixAt(placed, dummy.matrix);
    smd.setColorAt(placed, smdColors[Math.floor(smdRand() * smdColors.length)]);
    placed++;
  }
  smd.count = placed;
  smd.castShadow = true;
  board.add(smd);

  // ---------- Power connector ----------
  const powerGlow = glowMat(0);
  const power = new THREE.Group();
  const powerBody = new THREE.Mesh(new RoundedBoxGeometry(0.6, 0.34, 1.1, 3, 0.12), M.metal);
  powerBody.position.y = 0.17;
  const powerMouth = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.16, 0.8, 2, 0.06), M.dark);
  powerMouth.position.set(-0.3, 0.17, 0);
  const powerLed = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.06), powerGlow);
  powerLed.position.set(0.05, 0.35, 0.42);
  power.add(powerBody, powerMouth, powerLed);
  power.position.copy(POWER);
  board.add(shadowed(power));

  // ---------- Traces ----------
  const traceVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const traceFrag = `
    uniform float uReveal; uniform float uTime; uniform float uActive; uniform float uSeed; uniform vec3 uColor;
    varying vec2 vUv;
    void main(){
      float x = vUv.x;
      float lit = 1.0 - smoothstep(uReveal - 0.015, uReveal, x);
      float head = smoothstep(0.05, 0.0, abs(x - uReveal)) * (1.0 - step(0.999, uReveal));
      float p = fract(x * 2.6 - uTime * (0.32 + uActive * 0.5) + uSeed);
      float pulse = smoothstep(0.0, 0.03, p) * smoothstep(0.16, 0.03, p);
      vec3 col = uColor * (0.16 + uActive * 0.35) * lit + uColor * pulse * (0.7 + uActive * 2.4) * lit + uColor * head * 3.0;
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`;
  const traceMats: THREE.ShaderMaterial[] = [];
  const viaPoints: THREE.Vector3[] = [];
  parts.forEach((_, i) => {
    const s = slotPos(i);
    const back = s.z < 0;
    const k = i % 4;
    const y = BOARD_Y + 0.006;
    const pinZ = POWER.z + (i - 3.5) * 0.11;
    const lane = back ? -0.2 - (3 - k) * 0.11 : 0.3 + (3 - k) * 0.11;
    const turnX = -4.75 + i * 0.06;
    const padX = s.x - 0.55 + k * 0.03;
    const padZ = s.z + (back ? 0.72 : -0.72);
    const pts = [
      new THREE.Vector3(POWER.x + 0.32, y, pinZ), new THREE.Vector3(turnX, y, pinZ), new THREE.Vector3(turnX, y, lane),
      new THREE.Vector3(padX, y, lane), new THREE.Vector3(padX, y, padZ),
    ];
    const path = new THREE.CurvePath<THREE.Vector3>();
    for (let n = 0; n < pts.length - 1; n++) path.add(new THREE.LineCurve3(pts[n], pts[n + 1]));
    const mat = new THREE.ShaderMaterial({
      vertexShader: traceVert, fragmentShader: traceFrag,
      uniforms: {uReveal: {value: reduced ? 1 : 0}, uTime: {value: 0}, uActive: {value: 0}, uSeed: {value: i * 0.137}, uColor: {value: LIME.clone()}},
    });
    traceMats.push(mat);
    const length = path.getLength();
    const tube = new THREE.Mesh(new THREE.TubeGeometry(path, Math.ceil(length * 30), 0.024, 5, false), mat);
    board.add(tube);
    viaPoints.push(pts[1], pts[2], pts[3]);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.012, 0.2), M.gold);
    pad.position.set(padX, BOARD_Y + 0.006, padZ);
    board.add(pad);
  });
  const vias = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.05, 0.05, 0.014, 12), M.gold, viaPoints.length);
  viaPoints.forEach((p, n) => { dummy.position.copy(p); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); vias.setMatrixAt(n, dummy.matrix); });
  board.add(vias);

  // ---------- Components ----------
  type Comp = { root: THREE.Group; holder: THREE.Group; h: number; glow: THREE.MeshStandardMaterial; led: THREE.MeshStandardMaterial;
    ring: THREE.Mesh; update: (t: number, dt: number, energy: number) => void; lift: number; glowLevel: number; blink: number };
  const comps: Comp[] = parts.map((p, i) => {
    const built = buildComponent(p.kind);
    const holder = new THREE.Group();
    const s = slotPos(i);
    holder.position.set(s.x, BOARD_Y + built.h, s.z);
    built.root.position.y = -built.h;
    holder.add(built.root);
    built.root.traverse(n => { n.userData.index = i; });
    scene.add(holder);
    const led = glowMat(1.5);
    const ledMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.1), led);
    ledMesh.position.set(s.x + 0.85, BOARD_Y + 0.025, s.z + (s.z < 0 ? 0.62 : -0.62));
    board.add(ledMesh);
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.12, 1.17, 72), new THREE.MeshBasicMaterial({color: LIME, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false}));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(s.x, BOARD_Y + 0.004, s.z);
    board.add(ring);
    if (!reduced) built.root.scale.setScalar(0.001);
    return {root: built.root, holder, h: built.h, glow: built.glow, led, ring, update: built.update, lift: 0, glowLevel: 0.5, blink: 0.6 + (i * 0.37) % 1.1};
  });

  function buildComponent(kind: Kind) {
    const root = new THREE.Group();
    const glow = glowMat(0.3);
    let h = 0.3;
    let update: Comp["update"] = () => {};
    const add = (mesh: THREE.Mesh, x = 0, y = 0, z = 0) => { mesh.position.set(x, y, z); root.add(mesh); return mesh; };
    if (kind === "cpu") {
      add(new THREE.Mesh(new RoundedBoxGeometry(1.55, 0.22, 1.55, 3, 0.04), M.chip), 0, 0.13);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.03, 1.0), M.metal), 0, 0.255);
      add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.5), glow), 0, 0.28);
      const pins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.03, 0.2), M.pin, 48);
      let n = 0;
      for (let side = 0; side < 4; side++) for (let k = 0; k < 12; k++) {
        const a = -0.66 + k * 0.12;
        const [x, z, ry] = side === 0 ? [a, -0.86, 0] : side === 1 ? [a, 0.86, 0] : side === 2 ? [0.86, a, Math.PI / 2] : [-0.86, a, Math.PI / 2];
        dummy.position.set(x, 0.03, z); dummy.rotation.set(0, ry, 0); dummy.updateMatrix(); pins.setMatrixAt(n++, dummy.matrix);
      }
      root.add(pins);
      h = 0.29;
    } else if (kind === "sensor") {
      for (const [x, z] of [[-0.42, 0.28], [0.42, 0.28], [0, -0.42]]) {
        add(new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.08, 32), M.dark), x, 0.04, z);
        add(new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.56, 32), M.metal), x, 0.36, z);
        add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32), glow), x, 0.645, z);
      }
      h = 0.65;
    } else if (kind === "module") {
      const pins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.3, 0.05), M.gold, 20);
      for (let k = 0; k < 20; k++) { dummy.position.set(-0.76 + (k % 10) * 0.17, 0.15, k < 10 ? -0.48 : 0.48); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); pins.setMatrixAt(k, dummy.matrix); }
      root.add(pins);
      add(new THREE.Mesh(new RoundedBoxGeometry(1.8, 0.06, 1.25, 2, 0.02), M.pcb), 0, 0.32);
      add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.09, 0.7), M.chip), -0.2, 0.395);
      add(new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.04, 0.76), M.metal), -0.2, 0.46);
      for (let k = 0; k < 9; k++) add(new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.72), M.metal), -0.56 + k * 0.09, 0.63);
      add(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.9), glow), 0.7, 0.36);
      h = 0.78;
    } else if (kind === "connector") {
      add(new THREE.Mesh(new RoundedBoxGeometry(1.95, 0.38, 0.66, 3, 0.04), M.chip), 0, 0.19);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 0.36), M.dark), 0, 0.37);
      const pins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.08, 0.05), M.gold, 24);
      for (let k = 0; k < 24; k++) { dummy.position.set(-0.77 + (k % 12) * 0.14, 0.38, k < 12 ? -0.08 : 0.08); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); pins.setMatrixAt(k, dummy.matrix); }
      root.add(pins);
      for (const x of [-1.02, 1.02]) add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.46, 0.5), M.metal), x, 0.23);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.03, 0.02), glow), 0, 0.22, 0.34);
      h = 0.42;
    } else if (kind === "matrix") {
      add(new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.12, 1.6, 2, 0.03), M.chip), 0, 0.06);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.02, 0.04), glow), 0, 0.13, 0.78);
      const leds = new THREE.InstancedMesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), new THREE.MeshBasicMaterial({toneMapped: false}), 64);
      const color = new THREE.Color();
      for (let k = 0; k < 64; k++) {
        dummy.position.set(-0.63 + (k % 8) * 0.18, 0.145, -0.63 + Math.floor(k / 8) * 0.18); dummy.rotation.set(0, 0, 0); dummy.updateMatrix();
        leds.setMatrixAt(k, dummy.matrix); leds.setColorAt(k, color.setRGB(0.05, 0.08, 0.04));
      }
      root.add(leds);
      update = (t, _dt, energy) => {
        const cx = 3.5 + Math.sin(t * 0.7) * 3, cz = 3.5 + Math.cos(t * 0.9) * 3;
        for (let k = 0; k < 64; k++) {
          const d = Math.hypot((k % 8) - cx, Math.floor(k / 8) - cz);
          const v = Math.max(0, Math.sin(d * 1.3 - t * 4.5)) ** 3;
          const b = 0.06 + v * (0.9 + energy * 2.4);
          leds.setColorAt(k, color.setRGB(LIME.r * b, LIME.g * b, LIME.b * b));
        }
        leds.instanceColor!.needsUpdate = true;
      };
      h = 0.17;
    } else if (kind === "ram") {
      add(new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.2, 0.34), M.chip), 0, 0.1);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.07), M.pcb), 0, 0.2 + 0.475);
      for (let k = 0; k < 4; k++) add(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.46, 0.03), M.chip), -0.6 + k * 0.4, 0.72, 0.05);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.07, 0.08), M.gold), 0, 0.24);
      add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.09), glow), 0, 1.16);
      h = 1.18;
    } else if (kind === "coil") {
      add(new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.1, 1.15, 2, 0.03), M.chip), 0, 0.05);
      const torus = add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.17, 24, 72), M.copper), 0, 0.27);
      torus.rotation.x = Math.PI / 2;
      add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.36, 24), M.dark), 0, 0.27);
      const inner = add(new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 8, 48), glow), 0, 0.45);
      inner.rotation.x = Math.PI / 2;
      update = (t, _dt, energy) => { M.copper.emissive.setRGB(0.45, 0.18, 0.04); M.copper.emissiveIntensity = (0.1 + energy * 0.5) * (0.6 + 0.4 * Math.sin(t * 3)); };
      h = 0.46;
    } else {
      add(new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.28, 1.4, 3, 0.06), M.chip), 0, 0.14);
      const ring = add(new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.035, 8, 64), glow), 0, 0.285);
      ring.rotation.x = Math.PI / 2;
      add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.02, 48), M.dark), 0, 0.2);
      const fan = new THREE.Group();
      fan.position.y = 0.24;
      fan.add(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 24), M.metal));
      for (let k = 0; k < 7; k++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.015, 0.13), M.joint);
        const pivot = new THREE.Group();
        pivot.rotation.y = (k / 7) * Math.PI * 2;
        blade.position.x = 0.3;
        blade.rotation.x = 0.45;
        pivot.add(blade);
        fan.add(pivot);
      }
      root.add(fan);
      update = (_t, dt, energy) => { fan.rotation.y -= dt * (reduced ? 0 : 3 + energy * 14); };
      h = 0.29;
    }
    shadowed(root);
    return {root, glow, h, update};
  }

  // ---------- Robot arm on a rail ----------
  const rail = new THREE.Group();
  rail.add(new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.12, 0.5), M.joint));
  for (const z of [-0.14, 0.14]) {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 13.4, 12), M.metal);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(0, 0.11, z);
    rail.add(rod);
  }
  const railGlow = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.02, 0.03), glowMat(0.8));
  railGlow.position.set(0, 0.07, 0.26);
  rail.add(railGlow);
  rail.position.set(0, 0.06, RAIL_Z);
  scene.add(shadowed(rail));

  const carriage = new THREE.Group();
  carriage.position.set(0, 0.2, RAIL_Z);
  const carriageBody = new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.2, 0.95, 3, 0.06), M.joint);
  const carriageStripe = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.03, 0.02), glowMat(1.4));
  carriageStripe.position.set(0, 0.02, 0.48);
  carriage.add(carriageBody, carriageStripe);
  scene.add(carriage);

  const turret = new THREE.Group();
  turret.position.y = 0.12;
  carriage.add(turret);
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.38, 32), M.arm);
  drum.position.y = 0.19;
  turret.add(drum);
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.025, 8, 64), glowMat(1.2));
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.39;
  turret.add(baseRing);
  const housing = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.62, 0.62, 3, 0.1), M.arm);
  housing.position.y = 0.66;
  turret.add(housing);

  const jointMesh = (r: number, len: number) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 28), M.joint); m.rotation.z = Math.PI / 2; return m; };
  const shoulder = new THREE.Group();
  shoulder.position.y = SHOULDER_Y - 0.32;
  turret.add(shoulder);
  shoulder.add(jointMesh(0.3, 0.84));
  const upper = new THREE.Mesh(new RoundedBoxGeometry(0.36, L1, 0.36, 3, 0.1), M.arm);
  upper.position.y = L1 / 2;
  shoulder.add(upper);
  const upperStripe = new THREE.Mesh(new THREE.BoxGeometry(0.02, L1 * 0.7, 0.05), glowMat(1.1));
  upperStripe.position.set(0.19, L1 / 2, 0);
  shoulder.add(upperStripe);

  const elbow = new THREE.Group();
  elbow.position.y = L1;
  shoulder.add(elbow);
  elbow.add(jointMesh(0.25, 0.62));
  const fore = new THREE.Mesh(new RoundedBoxGeometry(0.3, L2, 0.3, 3, 0.09), M.arm);
  fore.position.y = L2 / 2;
  elbow.add(fore);
  const foreStripe = new THREE.Mesh(new THREE.BoxGeometry(0.02, L2 * 0.6, 0.04), glowMat(1.1));
  foreStripe.position.set(-0.16, L2 / 2, 0);
  elbow.add(foreStripe);

  const wrist = new THREE.Group();
  wrist.position.y = L2;
  elbow.add(wrist);
  wrist.add(jointMesh(0.18, 0.44));
  const palm = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.18, 0.34, 2, 0.05), M.joint);
  palm.position.y = 0.14;
  wrist.add(palm);
  const eye = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), glowMat(2.4));
  eye.position.set(0, 0.14, 0.18);
  wrist.add(eye);
  const fingers = [-1, 1].map(side => {
    const f = new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.34, 0.22, 2, 0.02), M.metal);
    f.position.set(side * 0.3, 0.36, 0);
    wrist.add(f);
    return f;
  });
  const gripTip = new THREE.Object3D();
  gripTip.position.y = GRIP;
  wrist.add(gripTip);
  shadowed(carriage);

  // ---------- Hologram ----------
  const placeholder = holoPlaceholder("");
  const textures: THREE.Texture[] = parts.map(p => {
    if (!p.img) return holoPlaceholder(p.title);
    const tex = new THREE.TextureLoader().load(p.img);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  });
  const holoMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    uniforms: {uMap: {value: placeholder}, uReveal: {value: 0}, uTime: {value: 0}, uOpacity: {value: 0}},
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform sampler2D uMap; uniform float uReveal; uniform float uTime; uniform float uOpacity; varying vec2 vUv;
      void main(){
        vec2 uv = vUv;
        float shown = step(uv.y, uReveal);
        vec3 tex = texture2D(uMap, uv).rgb;
        float scan = 0.88 + 0.12 * sin(uv.y * 520.0 - uTime * 6.0);
        float flick = 0.95 + 0.05 * sin(uTime * 31.0);
        vec2 e = min(uv, 1.0 - uv);
        float edge = smoothstep(0.012, 0.0, min(e.x, e.y * 1.6));
        vec3 lime = vec3(0.86, 1.0, 0.43);
        vec3 col = tex * scan * flick * 0.82 + lime * edge * 1.4;
        col += lime * smoothstep(0.015, 0.0, abs(uv.y - uReveal)) * (1.0 - step(0.999, uReveal)) * 3.0;
        gl_FragColor = vec4(col, uOpacity * shown * (0.9 + edge * 0.1));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const holo = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.125), holoMat);
  holo.visible = false;
  holo.renderOrder = 10;
  scene.add(holo);
  const beamMat = new THREE.MeshBasicMaterial({color: LIME, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide});
  const beamGeo = new THREE.CylinderGeometry(0.9, 0.15, 1, 32, 1, true);
  beamGeo.translate(0, 0.5, 0);
  beamGeo.rotateX(Math.PI / 2);
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.visible = false;
  scene.add(beam);

  // ---------- Dust ----------
  if (!lowPower) {
    const dustRand = seeded(11);
    const pos = new Float32Array(260 * 3);
    for (let n = 0; n < 260; n++) { pos[n * 3] = (dustRand() - 0.5) * 18; pos[n * 3 + 1] = dustRand() * 6; pos[n * 3 + 2] = (dustRand() - 0.5) * 12; }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({color: 0xdcff6e, size: 0.025, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false}));
    dust.name = "dust";
    scene.add(dust);
  }

  // ---------- Post-processing ----------
  let composer: EffectComposer | undefined;
  let bloom: UnrealBloomPass | undefined;
  if (!lowPower) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.5, 0.45, 0.9);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  // ---------- Camera waypoints ----------
  const presentPoint = (i: number) => { const s = slotPos(i); return new THREE.Vector3(s.x, BOARD_Y + 2.15, 0.35); };
  type View = { pos: THREE.Vector3; look: THREE.Vector3 };
  const views = (): View[] => {
    const m = isMobile();
    const list: View[] = [m ? {pos: new THREE.Vector3(0, 21, 23), look: new THREE.Vector3(0, -3.2, -0.6)} : {pos: new THREE.Vector3(-0.6, 10.4, 14.4), look: new THREE.Vector3(-2.3, 0.5, -0.6)}];
    parts.forEach((_, i) => {
      const P = presentPoint(i);
      list.push(m
        ? {pos: new THREE.Vector3(P.x, P.y + 3.0, P.z + 11), look: new THREE.Vector3(P.x, P.y - 0.9, P.z - 0.6)}
        : {pos: new THREE.Vector3(P.x - 0.4, P.y + 2.7, P.z + 9.6), look: new THREE.Vector3(P.x - 0.9, P.y + 0.7, P.z - 0.6)});
    });
    list.push(m ? {pos: new THREE.Vector3(0, 19, 24), look: new THREE.Vector3(0, -3.6, -0.6)} : {pos: new THREE.Vector3(-1.2, 5.4, 14.2), look: new THREE.Vector3(-3.4, 0.8, -1.2)});
    return list;
  };
  let wps = views();
  const camPos = wps[0].pos.clone().multiplyScalar(reduced ? 1 : 1.35);
  const camLook = wps[0].look.clone();
  const camTarget = {pos: wps[0].pos.clone(), look: wps[0].look.clone()};
  camera.position.copy(camPos);
  camera.lookAt(camLook);

  // ---------- Arm state + inverse kinematics ----------
  const IDLE = {x: 0, y: 2.5, z: -0.2};
  const tip = {x: 0, y: 2.4, z: -3.6, aim: 0, grip: 0};
  const pose = {tilt: 0};
  const joints = {yaw: 0, a1: 0, a2: 0, a3: 0, carriage: 0};
  const vel = {yaw: 0, a1: 0, a2: 0, a3: 0, carriage: 0};
  let holding = -1;
  const holdOffset = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function solve() {
    const psi = Math.PI - tip.aim * Math.PI * 0.45;
    const sx = joints.carriage;
    const dx = tip.x - sx, dz = tip.z - RAIL_Z;
    const yaw = Math.atan2(dx, dz);
    const rt = Math.hypot(dx, dz);
    const r = rt - GRIP * Math.sin(psi);
    const hgt = tip.y - GRIP * Math.cos(psi) - SHOULDER_Y;
    const D = THREE.MathUtils.clamp(Math.hypot(r, hgt), 0.4, L1 + L2 - 0.02);
    const phi = Math.atan2(r, hgt);
    const alpha = Math.acos(THREE.MathUtils.clamp((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
    const beta = Math.acos(THREE.MathUtils.clamp((L1 * L1 + L2 * L2 - D * D) / (2 * L1 * L2), -1, 1));
    const a1 = phi - alpha, a2 = Math.PI - beta;
    return {yaw, a1, a2, a3: psi - (a1 + a2)};
  }
  function spring(key: keyof typeof joints, target: number, dt: number, k: number, c: number) {
    if (reduced) { joints[key] = target; vel[key] = 0; return; }
    vel[key] += (target - joints[key]) * k * dt;
    vel[key] *= Math.exp(-c * dt);
    joints[key] += vel[key] * dt;
  }

  // ---------- Pick-and-present choreography ----------
  let current = -1, desired = -1, busy = false, introDone = reduced;
  let armTl: gsap.core.Timeline | undefined;
  const D = reduced ? 0.0001 : 1;

  let holoIndex = -1;
  function showHolo(i: number) {
    holoIndex = i;
    holoMat.uniforms.uMap.value = textures[i];
    holo.visible = beam.visible = true;
    gsap.fromTo(holoMat.uniforms.uReveal, {value: 0}, {value: 1, duration: 0.9 * D, ease: "power2.out"});
    gsap.to(holoMat.uniforms.uOpacity, {value: 1, duration: 0.3 * D});
    gsap.to(beamMat, {opacity: 0.05, duration: 0.5 * D});
  }
  function hideHolo() {
    gsap.to(holoMat.uniforms.uOpacity, {value: 0, duration: 0.3 * D, onComplete: () => { holo.visible = false; }});
    gsap.to(beamMat, {opacity: 0, duration: 0.3 * D, onComplete: () => { beam.visible = false; }});
  }

  function request(i: number) {
    desired = i;
    if (!introDone) return;
    if (busy) { armTl?.timeScale(2.4); return; }
    run();
  }
  function run() {
    if (desired === current) return;
    busy = true;
    const target = desired;
    const tl = gsap.timeline({onComplete: () => { busy = false; current = target; if (desired !== current) run(); }});
    armTl = tl;
    if (holding >= 0) {
      const h = holding, s = slotPos(h), top = BOARD_Y + comps[h].h;
      tl.add(() => hideHolo())
        .to(pose, {tilt: 0, duration: 0.5 * D, ease: "power2.inOut"}, 0)
        .to(tip, {x: s.x, y: top + 1.1, z: s.z, aim: 0, duration: 0.9 * D, ease: "power2.inOut"}, 0)
        .to(tip, {y: top + 0.01, duration: 0.45 * D, ease: "power2.in"})
        .add(() => { holding = -1; gsap.to(comps[h].holder.position, {x: s.x, y: top, z: s.z, duration: 0.15 * D}); })
        .to(tip, {grip: 0, duration: 0.2 * D})
        .to(tip, {y: top + 1.2, duration: 0.4 * D, ease: "power2.out"});
    }
    if (target >= 0) {
      const s = slotPos(target), top = BOARD_Y + comps[target].h, P = presentPoint(target);
      tl.to(tip, {x: s.x, y: top + 1.2, z: s.z, aim: 0, duration: 1.0 * D, ease: "power3.inOut"})
        .to(tip, {y: top + 0.02, duration: 0.45 * D, ease: "power2.in"})
        .to(tip, {grip: 1, duration: 0.22 * D})
        .add(() => {
          holding = target;
          gripTip.getWorldPosition(tmp);
          holdOffset.copy(comps[target].holder.position).sub(tmp);
          gsap.to(holdOffset, {x: 0, y: 0, z: 0, duration: 0.35 * D});
        })
        .to(tip, {y: top + 1.0, duration: 0.45 * D, ease: "power2.out"})
        .to(tip, {x: P.x, y: P.y, z: P.z, aim: 0.2, duration: 0.95 * D, ease: "back.out(1.5)"})
        .to(pose, {tilt: 1, duration: 0.7 * D, ease: "power2.out"}, "<.2")
        .add(() => showHolo(target), "<.35");
    } else {
      tl.to(tip, {...IDLE, aim: 0, duration: 1.1 * D, ease: "power2.inOut"});
    }
  }

  // ---------- Intro: power-on ----------
  function intro() {
    statusEl.textContent = "Powering on…";
    if (reduced) { comps.forEach(c => c.root.scale.setScalar(1)); Object.assign(tip, IDLE); finishIntro(); return; }
    const tl = gsap.timeline({onComplete: finishIntro});
    tl.to(camPos, {x: camTarget.pos.x, y: camTarget.pos.y, z: camTarget.pos.z, duration: 3.2, ease: "expo.inOut"}, 0)
      .to(powerGlow, {emissiveIntensity: 2.5, duration: 0.25, ease: "power2.out"}, 0.35)
      .to(powerGlow, {emissiveIntensity: 1.1, duration: 0.6}, 0.6);
    traceMats.forEach((mat, i) => {
      const at = 0.6 + i * 0.12;
      tl.to(mat.uniforms.uReveal, {value: 1, duration: 1.15, ease: "power1.in"}, at);
      tl.to(comps[i].root.scale, {x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(2.2)"}, at + 1.05);
      tl.fromTo(comps[i].led, {emissiveIntensity: 8}, {emissiveIntensity: 1.5, duration: 0.6}, at + 1.1);
    });
    tl.to(tip, {...IDLE, duration: 1.4, ease: "back.out(1.3)"}, 1.6);
    gsap.from(".sc-intro__copy > *", {y: 40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, delay: 1.2});
  }
  function finishIntro() {
    introDone = true;
    statusEl.textContent = `Board online · ${parts.length} systems`;
    if (desired !== current) run();
  }

  // ---------- Scroll mapping ----------
  const lenis = reduced ? undefined : new Lenis({lerp: 0.085});
  const allSteps = [introEl, ...steps, outroEl];
  let centers: number[] = [];
  const measure = () => { centers = allSteps.map(el => el.offsetTop + el.offsetHeight / 2 - innerHeight / 2); };
  measure();
  let active = -1;
  function readScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    let k = 0;
    while (k < centers.length - 2 && y >= centers[k + 1]) k++;
    const span = centers[k + 1] - centers[k];
    const frac = THREE.MathUtils.clamp(span > 0 ? (y - centers[k]) / span : 0, 0, 1);
    const s = THREE.MathUtils.smoothstep(frac, 0.22, 0.78);
    camTarget.pos.lerpVectors(wps[k].pos, wps[k + 1].pos, s);
    camTarget.look.lerpVectors(wps[k].look, wps[k + 1].look, s);
    const nearest = Math.round(k + frac);
    const next = nearest >= 1 && nearest <= parts.length ? nearest - 1 : -1;
    if (next !== active) {
      active = next;
      railLinks.forEach((a, i) => a.setAttribute("aria-current", String(i === active)));
      if (introDone) statusEl.textContent = active >= 0 ? `Powering ${parts[active].code} · ${parts[active].title}` : `Board online · ${parts.length} systems`;
      request(active);
    }
  }
  const scrollToStep = (i: number) => {
    const el = steps[i];
    const offset = (el.offsetHeight - innerHeight) / 2;
    if (lenis) lenis.scrollTo(el, {offset, duration: 1.6});
    else window.scrollTo({top: el.offsetTop + offset});
  };
  railLinks.forEach((a, i) => a.addEventListener("click", e => { e.preventDefault(); scrollToStep(i); }));

  const cardObserver = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle("is-in", e.isIntersecting)), {threshold: 0.35});
  steps.forEach(s => cardObserver.observe(s));

  // ---------- Pointer: hover labels, parallax, clicks ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  const mouse = {x: 0, y: 0};
  let hovered = -1;
  const pickables = comps.map(c => c.root);
  canvas.addEventListener("pointermove", e => {
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    mouse.x = ndc.x; mouse.y = ndc.y;
  });
  canvas.addEventListener("pointerleave", () => { ndc.set(9, 9); });
  canvas.addEventListener("click", e => {
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    if (holo.visible && holoIndex >= 0 && raycaster.intersectObject(holo).length) { window.open(parts[holoIndex].href, "_blank", "noopener"); return; }
    const hit = raycaster.intersectObjects(pickables, true)[0];
    if (hit && hit.object.userData.index !== undefined) scrollToStep(hit.object.userData.index);
  });
  function updateHover() {
    if (ndc.x > 2) { setHover(-1); return; }
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables, true)[0];
    setHover(hit ? hit.object.userData.index ?? -1 : -1);
  }
  function setHover(i: number) {
    if (i === hovered) return;
    hovered = i;
    canvas.style.cursor = i >= 0 ? "pointer" : "";
    tipEl.dataset.on = String(i >= 0);
    if (i >= 0) {
      tipEl.querySelector("b")!.textContent = `${parts[i].code} · ${parts[i].part}`;
      tipEl.querySelector("span")!.textContent = `${parts[i].title} — ${parts[i].tags}`;
    }
  }

  // ---------- Resize ----------
  addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.fov = isMobile() ? 50 : 36;
    camera.updateProjectionMatrix();
    composer?.setSize(innerWidth, innerHeight);
    bloom?.setSize(innerWidth, innerHeight);
    wps = views();
    measure();
  });
  addEventListener("load", measure);

  // ---------- Frame loop ----------
  const clock = new THREE.Clock();
  const tipWorld = new THREE.Vector3();
  const tipScreen = new THREE.Vector3();
  const dust = scene.getObjectByName("dust") as THREE.Points | undefined;
  let frame = 0, elapsed = 0;
  function tick(now: number) {
    requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;
    update(dt, now);
  }
  function update(dt: number, now: number) {
    const t = reduced ? 0 : elapsed;
    lenis?.raf(now);
    readScroll();

    // Camera
    const follow = reduced ? 1 : 1 - Math.exp(-dt * 3.2);
    if (introDone) camPos.lerp(camTarget.pos, follow);
    camLook.lerp(camTarget.look, follow);
    camera.position.set(camPos.x + mouse.x * 0.35, camPos.y + mouse.y * 0.22, camPos.z);
    camera.lookAt(camLook);

    // Traces and power
    traceMats.forEach((mat, i) => {
      mat.uniforms.uTime.value = t;
      mat.uniforms.uActive.value += ((i === current && holding === i ? 1 : i === hovered ? 0.6 : 0) - mat.uniforms.uActive.value) * Math.min(1, dt * 5);
    });

    // Components
    comps.forEach((c, i) => {
      const energy = i === holding ? 1 : i === hovered ? 0.7 : 0;
      c.glowLevel += ((0.3 + energy * 1.2) - c.glowLevel) * Math.min(1, dt * 6);
      c.glow.emissiveIntensity = c.glowLevel;
      if (introDone) c.led.emissiveIntensity = energy > 0.9 ? 1.8 : reduced ? 1.5 : ((t * c.blink) % 1 < 0.55 ? 2.4 : 0.25);
      (c.ring.material as THREE.MeshBasicMaterial).opacity += (((i === hovered || i === holding) ? 0.85 : 0) - (c.ring.material as THREE.MeshBasicMaterial).opacity) * Math.min(1, dt * 6);
      c.update(t, dt, energy);
      if (i !== holding) {
        const s = slotPos(i);
        c.lift += ((i === hovered ? 0.18 : 0) - c.lift) * Math.min(1, dt * 8);
        if (!gsap.isTweening(c.holder.position)) c.holder.position.set(s.x, BOARD_Y + c.h + c.lift, s.z);
        c.holder.rotation.set(0, 0, 0);
      }
    });

    // Arm
    const goal = solve();
    spring("carriage", THREE.MathUtils.clamp(tip.x, -6, 6), dt, 22, 7.5);
    carriage.position.x = joints.carriage;
    spring("yaw", goal.yaw, dt, 70, 10);
    spring("a1", goal.a1, dt, 60, 9);
    spring("a2", goal.a2, dt, 60, 9);
    spring("a3", goal.a3, dt, 80, 11);
    turret.rotation.y = joints.yaw;
    shoulder.rotation.x = joints.a1;
    elbow.rotation.x = joints.a2;
    wrist.rotation.x = joints.a3;
    const spread = 0.3 - tip.grip * 0.13;
    fingers[0].position.x = -spread;
    fingers[1].position.x = spread;

    gripTip.getWorldPosition(tipWorld);
    if (holding >= 0) {
      const c = comps[holding];
      c.holder.position.copy(tipWorld).add(holdOffset);
      c.holder.rotation.set(pose.tilt * 0.42, Math.sin(t * 0.7) * 0.5 * pose.tilt, 0);
    }

    // Hologram + beam
    if (holo.visible && holoIndex >= 0) {
      const P = presentPoint(holoIndex);
      const side = isMobile() ? 0 : 1;
      holo.position.set(P.x + 2.3 * side, P.y + (side ? 1.0 : 2.2), P.z - 0.9);
      holo.scale.setScalar(isMobile() ? 0.9 : 0.82);
      holo.quaternion.copy(camera.quaternion);
      holoMat.uniforms.uTime.value = t;
      const from = tmp.copy(tipWorld).add(new THREE.Vector3(0, -0.35, 0));
      beam.position.copy(from);
      beam.lookAt(holo.position);
      beam.scale.set(1, 1, Math.max(0.01, from.distanceTo(holo.position) - 0.3));
    }

    if (dust) { dust.rotation.y = t * 0.02; dust.position.y = Math.sin(t * 0.3) * 0.15; }

    if (frame++ % 2 === 0) updateHover();
    if (hovered >= 0) {
      tipScreen.copy(comps[hovered].holder.position).add(new THREE.Vector3(0, 0.35, 0)).project(camera);
      tipEl.style.left = `${(tipScreen.x * 0.5 + 0.5) * innerWidth}px`;
      tipEl.style.top = `${(-tipScreen.y * 0.5 + 0.5) * innerHeight}px`;
    }

    if (composer) composer.render(); else renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);
  intro();

  // ---------- helpers that need the renderer ----------
  function silkTexture(r: THREE.WebGLRenderer) {
    const cw = 2048, ch = Math.round(2048 * BOARD_D / BOARD_W);
    const c = document.createElement("canvas");
    c.width = cw; c.height = ch;
    const g = c.getContext("2d")!;
    const X = (x: number) => (x + BOARD_W / 2) / BOARD_W * cw;
    const Z = (z: number) => (z + BOARD_D / 2) / BOARD_D * ch;
    const S = (v: number) => v / BOARD_W * cw;
    const rand = seeded(3);
    g.strokeStyle = "rgba(120, 205, 145, 0.17)";
    g.fillStyle = "rgba(120, 205, 145, 0.22)";
    g.lineWidth = S(0.028);
    for (let n = 0; n < 90; n++) {
      let x = (rand() - 0.5) * (BOARD_W - 0.6), z = (rand() - 0.5) * (BOARD_D - 0.6);
      g.beginPath(); g.moveTo(X(x), Z(z));
      for (let seg = 0; seg < 3; seg++) {
        if (seg % 2 === 0) x += (rand() - 0.5) * 2.4; else z += (rand() - 0.5) * 1.6;
        x = THREE.MathUtils.clamp(x, -BOARD_W / 2 + 0.3, BOARD_W / 2 - 0.3);
        z = THREE.MathUtils.clamp(z, -BOARD_D / 2 + 0.3, BOARD_D / 2 - 0.3);
        g.lineTo(X(x), Z(z));
      }
      g.stroke();
      g.beginPath(); g.arc(X(x), Z(z), S(0.045), 0, Math.PI * 2); g.fill();
    }
    g.fillStyle = "rgba(225, 236, 220, 0.12)";
    for (let x = 0.25; x < BOARD_W; x += 0.25) for (let z = 0.25; z < BOARD_D; z += 0.25) g.fillRect(S(x) - 1, S(z) - 1, 2, 2);
    g.strokeStyle = "rgba(230, 240, 225, 0.8)";
    g.lineWidth = 3;
    g.strokeRect(S(0.2), S(0.2), cw - S(0.4), ch - S(0.4));
    for (const [x, z] of [[0.35, 0.35], [BOARD_W - 0.35, 0.35], [0.35, BOARD_D - 0.35], [BOARD_W - 0.35, BOARD_D - 0.35]]) {
      g.beginPath(); g.arc(S(x), S(z), S(0.2), 0, Math.PI * 2); g.stroke();
    }
    g.fillStyle = "rgba(230, 240, 225, 0.88)";
    g.textBaseline = "middle";
    parts.forEach((p, i) => {
      const s = slotPos(i);
      const w = 2.1, d = 1.85, l = 0.22;
      const x0 = X(s.x - w / 2), x1 = X(s.x + w / 2), z0 = Z(s.z - d / 2), z1 = Z(s.z + d / 2);
      g.beginPath();
      for (const [cx, cz, sx, sz] of [[x0, z0, 1, 1], [x1, z0, -1, 1], [x0, z1, 1, -1], [x1, z1, -1, -1]] as const) {
        g.moveTo(cx + sx * S(l), cz); g.lineTo(cx, cz); g.lineTo(cx, cz + sz * S(l));
      }
      g.stroke();
      const labelZ = s.z < 0 ? s.z - d / 2 - 0.22 : s.z + d / 2 + 0.22;
      g.font = `700 ${Math.round(S(0.15))}px "JetBrains Mono", monospace`;
      g.textAlign = "left";
      g.fillText(p.code, x0, Z(labelZ));
      g.font = `500 ${Math.round(S(0.13))}px "JetBrains Mono", monospace`;
      g.textAlign = "right";
      g.fillText(p.title.toUpperCase(), x1, Z(labelZ));
    });
    g.textAlign = "left";
    g.font = `700 ${Math.round(S(0.14))}px "JetBrains Mono", monospace`;
    g.fillText("PWR IN", X(POWER.x - 0.25), Z(POWER.z - 0.85));
    g.font = `600 ${Math.round(S(0.16))}px "JetBrains Mono", monospace`;
    g.fillText("MM-SHOWCASE · REV 2026", X(-5.4), Z(BOARD_D / 2 - 0.42));
    g.textAlign = "right";
    g.font = `500 ${Math.round(S(0.12))}px "JetBrains Mono", monospace`;
    g.fillText("MORISH MACAYAN · APPLIED CURIOSITY · 8 SYSTEMS", X(5.4), Z(BOARD_D / 2 - 0.42));
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = r.capabilities.getMaxAnisotropy();
    return tex;
  }
}

function holoPlaceholder(title: string) {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 640;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0d1a12"; g.fillRect(0, 0, c.width, c.height);
  g.strokeStyle = "rgba(220,255,110,0.25)";
  for (let x = 0; x < c.width; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, c.height); g.stroke(); }
  for (let y = 0; y < c.height; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(c.width, y); g.stroke(); }
  if (title) {
    g.fillStyle = "#dcff6e"; g.font = '700 96px "Archivo", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(title, c.width / 2, c.height / 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
