/**
 * The 3D funnel, as a plain three.js scene with no React in it.
 *
 * Kept out of the component on purpose. React owns nothing inside the
 * canvas, so there is no render cycle that can tear down a scene mid-frame,
 * and the component's only jobs are to load three.js lazily, hand this a
 * host element, and tell it which stage is live.
 *
 * What is in the scene:
 *   - four lathe-turned bands, one per stage, with a rim ring on each. The
 *     live stage is acid yellow; the others are frosted cream, so the swirl
 *     inside reads through them.
 *   - leads: small white spheres spiralling down the inside, faster as the
 *     funnel narrows, and about a third of them flying off the rim and
 *     dropping away, because funnels leak.
 *   - YOU: a glowing yellow sphere with its own light, parked at the front
 *     of the live stage. When the stage changes it sinks to the next band;
 *     at the last stage it drops out of the spout and the funnel bursts.
 *
 * The labels are HTML laid over the canvas and projected from 3D each
 * frame, so they stay crisp at any pixel ratio and use the page's own font.
 *
 * Motion is never load-bearing: the stage card beside the canvas carries
 * every figure, and with reduced motion the scene renders on demand and the
 * marker jumps instead of falling.
 */
import type * as ThreeNS from "three";

type Three = typeof ThreeNS;

export type FunnelScene = {
  setStage(i: number): void;
  dispose(): void;
};

type Options = {
  stage: number;
  names: string[];
  reduce: boolean;
  onPick: (i: number) => void;
  onReady: () => void;
};

const TOP = 2.15;
const BOT = -2.15;
/** Funnel radius at t (0 = rim, 1 = spout tip). Flared, not a straight cone. */
const rAt = (t: number) => 0.26 + 1.79 * Math.pow(1 - Math.min(Math.max(t, 0), 1), 1.55);
const yAt = (t: number) => TOP + (BOT - TOP) * t;
const tAtY = (y: number) => (TOP - y) / (TOP - BOT);
/** Each band's span of t. The gaps between them are the stage boundaries. */
const BANDS: [number, number][] = [
  [0, 0.235],
  [0.255, 0.49],
  [0.51, 0.745],
  [0.765, 1],
];
const mid = (i: number) => (BANDS[i][0] + BANDS[i][1]) / 2;

const CREAM = "#fbf8f1";
const YELLOW = "#ffd60a";
const BLUE = "#2424c8";

/** Where YOU parks: in front of the band, a little to the right. */
const YOU_ANGLE = 0.55;
const YOU_OUT = 0.34;

export function createFunnelScene(
  THREE: Three,
  host: HTMLElement,
  labelHost: HTMLElement,
  opts: Options,
): FunnelScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const LOOK = new THREE.Vector3(0, -0.15, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, new THREE.Color(BLUE), 1.25));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(3, 5, 4);
  scene.add(key);

  // Everything that turns with the funnel lives in this group. YOU and the
  // labels do not: they stay where the reader is looking.
  const group = new THREE.Group();
  scene.add(group);

  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(x: T) => (disposables.push(x), x);

  // ------------------------------------------------------------------ bands
  const bandMats: ThreeNS.MeshStandardMaterial[] = [];
  const rimMats: ThreeNS.MeshStandardMaterial[] = [];
  const bandMeshes: ThreeNS.Mesh[] = [];
  BANDS.forEach(([t0, t1], i) => {
    const pts: ThreeNS.Vector2[] = [];
    for (let k = 0; k <= 18; k++) {
      const t = t0 + ((t1 - t0) * k) / 18;
      pts.push(new THREE.Vector2(rAt(t), yAt(t)));
    }
    const geo = keep(new THREE.LatheGeometry(pts, 96));
    const mat = keep(
      new THREE.MeshStandardMaterial({
        color: CREAM,
        roughness: 0.38,
        metalness: 0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.stage = i;
    mesh.renderOrder = 2;
    group.add(mesh);
    bandMats.push(mat);
    bandMeshes.push(mesh);

    // A rim on the top edge of every band: the crisp line that makes the
    // stack read as four separate stages rather than one smooth cone.
    const rimGeo = keep(new THREE.TorusGeometry(rAt(t0), 0.028, 10, 120));
    const rimMat = keep(new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.3 }));
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = yAt(t0);
    group.add(rim);
    rimMats.push(rimMat);
  });

  // ------------------------------------------------------------------ leads
  type Lead = {
    t: number; th: number; k: number; v: number;
    leakAt: number; leaked: boolean; s: number;
    p: ThreeNS.Vector3; vel: ThreeNS.Vector3;
  };
  // Fewer than the first version: seventy read as a particle effect, this
  // many read as leads.
  const N = 46;
  const leadGeo = keep(new THREE.IcosahedronGeometry(0.048, 1));
  const leadMat = keep(new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.28, roughness: 0.4 }));
  const leads = new THREE.InstancedMesh(leadGeo, leadMat, N);
  leads.renderOrder = 1;
  group.add(leads);
  const pool: Lead[] = [];
  const m4 = new THREE.Matrix4();
  const q0 = new THREE.Quaternion();
  const sv = new THREE.Vector3();

  function spawn(l: Lead, anywhere: boolean) {
    l.t = anywhere ? Math.random() * 0.98 : -0.02;
    l.th = Math.random() * Math.PI * 2;
    l.k = 0.55 + Math.random() * 0.35;
    l.v = 0.0016 + Math.random() * 0.0022;
    l.leakAt = Math.random() < 0.22 ? 0.04 + Math.random() * 0.75 : 9;
    l.leaked = false;
    l.s = 1;
  }
  function leadPos(l: Lead) {
    if (l.leaked) return;
    const below = Math.max(0, l.t - 1);
    const r = below > 0 ? Math.max(0, rAt(1) * l.k - below * 2) : rAt(l.t) * l.k;
    l.p.set(r * Math.cos(l.th), yAt(Math.min(l.t, 1)) - below * 3.2, r * Math.sin(l.th));
  }
  for (let i = 0; i < N; i++) {
    const l: Lead = { t: 0, th: 0, k: 0, v: 0, leakAt: 9, leaked: false, s: 1, p: new THREE.Vector3(), vel: new THREE.Vector3() };
    spawn(l, true);
    leadPos(l);
    pool.push(l);
  }
  function writeLeads() {
    pool.forEach((l, i) => {
      sv.setScalar(Math.max(l.s, 0.0001));
      m4.compose(l.p, q0, sv);
      leads.setMatrixAt(i, m4);
    });
    leads.instanceMatrix.needsUpdate = true;
  }
  writeLeads();

  function stepLeads(f: number) {
    for (const l of pool) {
      if (l.leaked) {
        l.p.addScaledVector(l.vel, f);
        l.vel.y -= 0.0011 * f;
        l.s -= 0.013 * f;
        if (l.s <= 0) { spawn(l, false); leadPos(l); }
        continue;
      }
      l.t += l.v * f;
      // Spin up as the funnel narrows, the way water does in a drain.
      l.th += (0.013 / (rAt(l.t) + 0.18)) * f;
      leadPos(l);
      if (l.t > l.leakAt) {
        // Flung off the wall: outward, along the spin, and a little up.
        l.leaked = true;
        const out = new THREE.Vector3(Math.cos(l.th), 0, Math.sin(l.th));
        const tan = new THREE.Vector3(-Math.sin(l.th), 0, Math.cos(l.th));
        l.vel.copy(out.multiplyScalar(0.032)).addScaledVector(tan, 0.022);
        l.vel.y = 0.012;
      }
      if (l.t > 1.16) { spawn(l, false); leadPos(l); }
    }
  }

  // ---------------------------------------------------------- conversion burst
  const B = 26;
  const burstMat = keep(new THREE.MeshStandardMaterial({ color: YELLOW, emissive: YELLOW, emissiveIntensity: 0.5 }));
  const burst = new THREE.InstancedMesh(leadGeo, burstMat, B);
  burst.visible = false;
  scene.add(burst);
  const sparks = Array.from({ length: B }, () => ({ p: new THREE.Vector3(), v: new THREE.Vector3(), s: 0 }));
  let burstLife = 0;
  function fireBurst(at: ThreeNS.Vector3) {
    sparks.forEach((sp) => {
      sp.p.copy(at);
      const a = Math.random() * Math.PI * 2;
      const up = 0.02 + Math.random() * 0.05;
      const out = 0.02 + Math.random() * 0.045;
      sp.v.set(Math.cos(a) * out, up, Math.sin(a) * out);
      sp.s = 1.4 + Math.random() * 1.2;
    });
    burstLife = 1;
    burst.visible = true;
  }
  function stepBurst(f: number) {
    if (burstLife <= 0) return;
    burstLife -= 0.011 * f;
    sparks.forEach((sp, i) => {
      sp.p.addScaledVector(sp.v, f);
      sp.v.y -= 0.0014 * f;
      sv.setScalar(Math.max(sp.s * burstLife, 0.0001));
      m4.compose(sp.p, q0, sv);
      burst.setMatrixAt(i, m4);
    });
    burst.instanceMatrix.needsUpdate = true;
    if (burstLife <= 0) burst.visible = false;
  }

  // -------------------------------------------------------------------- YOU
  const youGeo = keep(new THREE.SphereGeometry(0.15, 32, 20));
  const youMat = keep(new THREE.MeshStandardMaterial({ color: YELLOW, emissive: YELLOW, emissiveIntensity: 0.55, roughness: 0.3 }));
  const you = new THREE.Mesh(youGeo, youMat);
  you.renderOrder = 3;
  scene.add(you);
  const youLight = new THREE.PointLight(YELLOW, 5, 3.2, 1.6);
  you.add(youLight);

  const targetY = (i: number) => (i >= 3 ? BOT - 0.62 : yAt(mid(i)));
  let youY = targetY(opts.stage);
  let stage = opts.stage;

  function placeYou(time: number) {
    const t = tAtY(youY);
    let r: number;
    if (t <= 1) r = rAt(t) + YOU_OUT;
    else r = Math.max(0, (rAt(1) + YOU_OUT) * (1 - (t - 1) / 0.12));
    const bob = opts.reduce ? 0 : Math.sin(time * 2.2) * 0.035;
    you.position.set(r * Math.cos(YOU_ANGLE), youY + bob, r * Math.sin(YOU_ANGLE));
  }

  // ----------------------------------------------------------------- labels
  // HTML, not sprites: crisp at any DPR and set in the page's own font.
  const labels = opts.names.map((name, i) => {
    const el = document.createElement("span");
    el.className = "f3-label";
    el.textContent = name;
    el.dataset.stage = String(i);
    labelHost.appendChild(el);
    return el;
  });
  const youTag = document.createElement("span");
  youTag.className = "f3-you";
  youTag.textContent = "YOU";
  labelHost.appendChild(youTag);

  const proj = new THREE.Vector3();
  function toScreen(v: ThreeNS.Vector3, w: number, h: number) {
    proj.copy(v).project(camera);
    return { x: ((proj.x + 1) / 2) * w, y: ((1 - proj.y) / 2) * h };
  }
  /*
   * Clamped to the box. On a phone the canvas is barely wider than the rim,
   * so a label projected beside the top band landed half off the left edge
   * ("ENESS") and YOU's tag off the right. A label that cannot sit beside
   * its band is pushed in over it instead of being cut.
   */
  const EDGE = 4;
  function placeLabels(w: number, h: number) {
    labels.forEach((el, i) => {
      // Anchored off the band's widest point (its top rim), not its middle:
      // from the camera's height the rim flares past the mid-height radius
      // and the active label, yellow on a yellow band, disappeared into it.
      const t = mid(i);
      const a = toScreen(new THREE.Vector3(-(rAt(BANDS[i][0]) + 0.3), yAt(t), 0), w, h);
      const x = Math.max(a.x, el.offsetWidth + EDGE);
      el.style.transform = `translate(${x.toFixed(1)}px, ${a.y.toFixed(1)}px) translate(-100%, -50%)`;
    });
    const p = toScreen(you.position, w, h);
    const x = Math.min(p.x + 16, w - youTag.offsetWidth - EDGE);
    youTag.style.transform = `translate(${x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(0, -50%)`;
  }

  // ---------------------------------------------------------------- styling
  let hovered = -1;
  function paint() {
    bandMats.forEach((m, i) => {
      const on = i === stage;
      const done = i < stage;
      m.color.set(on ? YELLOW : CREAM);
      m.opacity = on ? 0.95 : done ? 0.72 : 0.5;
      m.emissive.set(on ? YELLOW : CREAM);
      m.emissiveIntensity = on ? 0.18 : i === hovered ? 0.22 : 0;
      rimMats[i].color.set(on ? YELLOW : CREAM);
    });
    labels.forEach((el, i) => {
      el.classList.toggle("on", i === stage);
      el.classList.toggle("hover", i === hovered && i !== stage);
    });
  }
  paint();

  // ------------------------------------------------------------------ sizing
  let W = 1;
  let H = 1;
  function resize() {
    const r = host.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // Pull back on narrow boxes so the rim never clips the sides.
    const dist = 8.4 * Math.max(1, 0.92 / camera.aspect);
    camera.position.set(0, 2.5 * (dist / 8.4), dist);
    camera.lookAt(LOOK);
    camera.updateProjectionMatrix();
    if (opts.reduce) frame(0);
  }

  // ------------------------------------------------------------- interaction
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pointerX = 0;
  let pointerY = 0;
  let spin = 0;
  let dragging = false;
  let downX = 0;
  let lastX = 0;
  let moved = 0;

  function pick(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(bandMeshes, false)[0];
    return hit ? (hit.object.userData.stage as number) : -1;
  }
  function onMove(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointerY = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (e.pointerType !== "mouse") return;
    if (dragging) {
      spin += (e.clientX - lastX) * 0.0009;
      moved += Math.abs(e.clientX - lastX);
      lastX = e.clientX;
    }
    const h = pick(e);
    if (h !== hovered) {
      hovered = h;
      canvas.style.cursor = h >= 0 ? "pointer" : "grab";
      paint();
      if (opts.reduce) frame(0);
    }
  }
  function onDown(e: PointerEvent) {
    // Recorded for every pointer type, so a tap can be told from a swipe.
    // Only a mouse drags the funnel round; a finger scrolls the page.
    downX = lastX = e.clientX;
    moved = 0;
    dragging = e.pointerType === "mouse";
  }
  function onUp(e: PointerEvent) {
    dragging = false;
    // A press that barely moved is a click: jump to the band under it.
    if (Math.abs(e.clientX - downX) < 6 && moved < 8) {
      const h = pick(e);
      if (h >= 0) opts.onPick(h);
    }
  }
  function onLeave() {
    pointerX = pointerY = 0;
    dragging = false;
    if (hovered !== -1) { hovered = -1; paint(); }
  }
  canvas.style.cursor = "grab";
  // Touch scrolls the page as normal; only taps pick a band.
  canvas.style.touchAction = "pan-y";
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerleave", onLeave);

  // -------------------------------------------------------------------- loop
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;
  let time = 0;

  function frame(dt: number) {
    const f = Math.min(dt, 0.05) * 60; // frames' worth of motion at 60fps
    time += dt;
    if (!opts.reduce) {
      group.rotation.y += 0.0022 * f + spin * f;
      spin *= Math.pow(0.94, f);
      group.rotation.x += ((-0.04 + pointerY * 0.1) - group.rotation.x) * 0.06 * f;
      group.rotation.z += ((pointerX * -0.05) - group.rotation.z) * 0.06 * f;
      stepLeads(f);
      writeLeads();
      stepBurst(f);
      youY += (targetY(stage) - youY) * (1 - Math.exp(-dt * 3.4));
    } else {
      youY = targetY(stage);
    }
    placeYou(time);
    renderer.render(scene, camera);
    placeLabels(W, H);
  }

  function loop() {
    raf = 0;
    if (!visible || document.hidden) return;
    frame(clock.getDelta());
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (opts.reduce || raf) return;
    clock.getDelta();
    raf = requestAnimationFrame(loop);
  }

  // Only spend frames while the funnel is on screen and the tab is in view.
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
  });
  io.observe(host);
  const onVis = () => { if (!document.hidden) start(); };
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  frame(0);
  start();
  opts.onReady();

  return {
    setStage(i: number) {
      if (i === stage) return;
      const prev = stage;
      stage = i;
      paint();
      // Out of the spout: the conversion. Fired at the tip, in world space.
      if (i === 3 && prev !== 3 && !opts.reduce) {
        fireBurst(new THREE.Vector3(0, BOT - 0.2, 0));
      }
      if (opts.reduce) frame(0);
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      labels.forEach((el) => el.remove());
      youTag.remove();
      leads.dispose();
      burst.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
