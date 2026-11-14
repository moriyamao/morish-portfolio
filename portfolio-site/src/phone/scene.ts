import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { H, W, createPhoneUI, type Profile } from "./ui";

/**
 * 3D phone for the Contact section. The page renders an accessible list of real links;
 * this script upgrades it to a tappable 3D phone when WebGL is available.
 */
function boot(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>(".v-phone__canvas");
  const d = root.dataset;
  if (!canvas || !d.model) return;
  const profile: Profile = {
    email: d.email!,
    github: d.github!,
    linkedin: d.linkedin!,
    resume: d.resume!,
    avatar: d.avatar!,
    banner: d.banner!,
  };
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowPower = matchMedia("(pointer: coarse)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, alpha: true, powerPreference: "high-performance" });
  } catch {
    return; // no WebGL: the link list stays as the experience
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(2, 3, 4);
  scene.add(key, new THREE.AmbientLight(0xdcff6e, 0.15));

  const camera = new THREE.PerspectiveCamera(26, 1, 0.05, 50);
  camera.position.set(0, 0, 6.2);

  const ui = createPhoneUI(profile, {
    reducedMotion,
    open: (url) => {
      if (url.startsWith("mailto:")) location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
    },
  });
  const screenTex = new THREE.CanvasTexture(ui.canvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.flipY = false; // glTF UV convention
  screenTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const rig = new THREE.Group(); // receives tilt/float/drag
  scene.add(rig);
  let screenMesh: THREE.Mesh | null = null;
  // Some models lay screen UVs out mirrored or upside down; set once the model is oriented.
  let mirrorX = false;
  let flipV = false;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  // Reuse this script's cache-busting version for the model, so a new build never pairs with a stale model.
  const version = new URL(import.meta.url).searchParams.get("v");
  loader.load(
    version ? `${d.model}?v=${version}` : d.model,
    (gltf) => {
      const model = gltf.scene;
      model.updateMatrixWorld(true);
      model.traverse((o) => {
        if ((o as THREE.Mesh).isMesh && o.name === "Screen") screenMesh = o as THREE.Mesh;
      });
      if (!screenMesh) return fail("screen mesh not found");
      const mesh = screenMesh as THREE.Mesh;
      mesh.material = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });

      // Orient: screen normal → +Z (toward camera), screen's long side → +Y.
      const geo = mesh.geometry;
      geo.computeBoundingBox();
      const nAttr = geo.getAttribute("normal");
      const normal = new THREE.Vector3().fromBufferAttribute(nAttr, 0).transformDirection(mesh.matrixWorld);
      // The sampled normal may point into the phone; the front is the side the screen sits on.
      const bodyCenter = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
      const screenCenter = geo.boundingBox!.getCenter(new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);
      if (normal.dot(screenCenter.sub(bodyCenter)) < 0) normal.negate();
      // In this model the screen's local +Y runs toward the camera end, i.e. the top of the phone.
      const long = new THREE.Vector3(0, 1, 0).transformDirection(mesh.matrixWorld);
      const q1 = new THREE.Quaternion().setFromUnitVectors(normal.normalize(), new THREE.Vector3(0, 0, 1));
      long.applyQuaternion(q1);
      const angle = Math.atan2(long.x, long.y); // rotate about Z so the top points up
      const q2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      const holder = new THREE.Group();
      holder.add(model);
      holder.quaternion.copy(q2.multiply(q1));
      holder.updateMatrixWorld(true);

      // The phone is now upright; fit the UI to the screen's UV layout instead of moving the phone.
      // flipY=false means v=0 is the canvas top and u=0 the canvas left.
      const uv = geo.getAttribute("uv");
      const pos = geo.getAttribute("position");
      const p = new THREE.Vector3();
      let top = { y: -Infinity, v: 0 };
      let right = { x: -Infinity, u: 0 };
      for (let i = 0; i < pos.count; i += Math.max(1, Math.floor(pos.count / 64))) {
        p.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
        if (p.y > top.y) top = { y: p.y, v: uv.getY(i) };
        if (p.x > right.x) right = { x: p.x, u: uv.getX(i) };
      }
      flipV = top.v > 0.5;
      mirrorX = right.u < 0.5;
      screenTex.wrapS = screenTex.wrapT = THREE.RepeatWrapping;
      screenTex.repeat.set(mirrorX ? -1 : 1, flipV ? -1 : 1);
      screenTex.offset.set(mirrorX ? 1 : 0, flipV ? 1 : 0);
      screenTex.needsUpdate = true;

      // Centre and scale to a 2.4-unit tall phone.
      const wrap = new THREE.Group();
      wrap.add(holder);
      const bounds = new THREE.Box3().setFromObject(holder);
      const c = bounds.getCenter(new THREE.Vector3());
      holder.position.sub(c);
      const h = bounds.getSize(new THREE.Vector3()).y;
      wrap.scale.setScalar(2.4 / h);
      rig.add(wrap);
      root.classList.add("is-3d");
      needsFrame = true;
    },
    undefined,
    fail,
  );

  function fail(err?: unknown) {
    // eslint-disable-next-line no-console
    console.warn("3D phone unavailable, showing links instead.", err);
    root.classList.remove("is-3d");
    renderer.dispose();
  }

  // ── Interaction ────────────────────────────────────────────────────────────────────────
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pointer: { id: number; x: number; y: number; onScreen: boolean; moved: boolean } | null = null;
  let yaw = 0;
  let pitch = 0;
  let dragYaw = 0;
  let dragPitch = 0;
  let hoverX = 0;
  let hoverY = 0;

  function screenPoint(e: PointerEvent) {
    if (!screenMesh) return null;
    const r = canvas!.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hitResult = ray.intersectObject(screenMesh, false)[0];
    if (!hitResult?.uv) return null;
    const u = mirrorX ? 1 - hitResult.uv.x : hitResult.uv.x;
    const v = flipV ? 1 - hitResult.uv.y : hitResult.uv.y;
    return { x: u * W, y: v * H };
  }

  canvas.addEventListener("pointerdown", (e) => {
    const sp = screenPoint(e);
    pointer = { id: e.pointerId, x: e.clientX, y: e.clientY, onScreen: !!sp, moved: false };
    if (sp) ui.press(sp.x, sp.y);
    canvas.setPointerCapture(e.pointerId);
    needsFrame = true;
  });
  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    hoverX = ((e.clientX - r.left) / r.width) * 2 - 1;
    hoverY = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (pointer && pointer.id === e.pointerId) {
      const dx = e.clientX - pointer.x;
      const dy = e.clientY - pointer.y;
      if (Math.hypot(dx, dy) > 8 && !pointer.moved) {
        pointer.moved = true;
        ui.cancel();
      }
      if (pointer.moved) {
        dragYaw = THREE.MathUtils.clamp(dx / 180, -0.9, 0.9);
        dragPitch = THREE.MathUtils.clamp(dy / 260, -0.35, 0.35);
      }
    } else {
      const sp = screenPoint(e);
      canvas.style.cursor = sp && ui.hitAt(sp.x, sp.y) ? "pointer" : "grab";
    }
    needsFrame = true;
  });
  const end = (e: PointerEvent) => {
    if (!pointer || pointer.id !== e.pointerId) return;
    if (!pointer.moved && pointer.onScreen) {
      const sp = screenPoint(e);
      if (sp) ui.release(sp.x, sp.y);
      else ui.cancel();
    }
    pointer = null;
    dragYaw = 0;
    dragPitch = 0;
    needsFrame = true;
  };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", () => {
    hoverX = 0;
    hoverY = 0;
    needsFrame = true;
  });

  // ── Loop: runs only while the phone is on screen and the tab is visible ────────────────
  let visible = false;
  let needsFrame = true;
  let raf = 0;
  let last = performance.now();

  function resize() {
    const r = canvas!.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    needsFrame = true;
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (ui.update(dt)) screenTex.needsUpdate = true;
    const targetYaw = -0.32 + hoverX * 0.18 + dragYaw;
    const targetPitch = 0.06 + hoverY * 0.08 + dragPitch;
    const k = reducedMotion ? 1 : 1 - Math.exp(-dt * 7);
    yaw += (targetYaw - yaw) * k;
    pitch += (targetPitch - pitch) * k;
    rig.rotation.set(pitch, yaw, 0);
    rig.position.y = reducedMotion ? 0 : Math.sin(now / 1400) * 0.05;
    renderer.render(scene, camera);
    // Keep animating while floating; idle frames are cheap but stop when off-screen.
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    needsFrame = false;
  }
  const kick = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    kick();
  }, { rootMargin: "100px" }).observe(root);
  document.addEventListener("visibilitychange", kick);
  setInterval(() => needsFrame && kick(), 250);
}

document.querySelectorAll<HTMLElement>("[data-phone]").forEach(boot);
