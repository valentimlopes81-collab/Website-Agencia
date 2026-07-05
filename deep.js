/* DESCENT — depth engine
   Maps scroll position → real depth via the [data-depth] anchors in the page,
   then drives the HUD instruments, water colour, progress rail and marine snow. */

const MAX_DEPTH = 10935;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- depth anchors ---------- */

let anchors = []; // { y: document px, depth: metres } sorted by y

function buildAnchors() {
  // Only leaf content blocks — sections are huge, their midpoints would
  // land out of order and break the monotonic scroll → depth mapping.
  const els = document.querySelectorAll(
    ".milestone[data-depth], .creature[data-depth], .zone-head[data-depth], .bottom-inner[data-depth]"
  );
  const list = [];
  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY + rect.height / 2;
    list.push({ y, depth: parseFloat(el.dataset.depth) });
  });
  list.sort((a, b) => a.y - b.y);
  // Anchor the top of the page to 0 m and the end of the page to MAX_DEPTH
  list.unshift({ y: window.innerHeight * 0.5, depth: 0 });
  list.push({ y: document.documentElement.scrollHeight, depth: MAX_DEPTH });
  // Safety: depth must never decrease as you scroll down
  for (let i = 1; i < list.length; i++) {
    list[i].depth = Math.max(list[i].depth, list[i - 1].depth);
  }
  anchors = list;
}

function depthAt(scrollCenter) {
  if (!anchors.length) return 0;
  if (scrollCenter <= anchors[0].y) return anchors[0].depth;
  for (let i = 1; i < anchors.length; i++) {
    const a = anchors[i - 1], b = anchors[i];
    if (scrollCenter <= b.y) {
      const t = b.y === a.y ? 1 : (scrollCenter - a.y) / (b.y - a.y);
      return a.depth + (b.depth - a.depth) * Math.max(0, Math.min(1, t));
    }
  }
  return MAX_DEPTH;
}

/* ---------- piecewise curves for the instruments ---------- */

function lerpStops(stops, x) {
  if (x <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (x <= stops[i][0]) {
      const [x0, y0] = stops[i - 1];
      const [x1, y1] = stops[i];
      const t = (x - x0) / (x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }
  return stops[stops.length - 1][1];
}

const TEMP_STOPS = [
  [0, 22], [100, 19], [200, 13], [500, 8], [1000, 4.4],
  [2000, 3.2], [4000, 1.9], [6000, 1.6], [9000, 1.8], [10935, 2.1],
];

const LIGHT_STOPS = [
  [0, 100], [50, 22], [100, 5], [150, 2], [200, 1],
  [400, 0.05], [700, 0.001], [1000, 0],
];

/* water colour stops with depth */
const WATER_STOPS = [
  [0,    [0x59, 0xb6, 0xdd]],
  [60,   [0x2f, 0x8f, 0xbe]],
  [200,  [0x11, 0x50, 0x7d]],
  [450,  [0x0a, 0x33, 0x58]],
  [1000, [0x04, 0x18, 0x30]],
  [2000, [0x02, 0x0d, 0x1e]],
  [4000, [0x01, 0x06, 0x12]],
  [6000, [0x00, 0x03, 0x0a]],
  [9000, [0x00, 0x01, 0x05]],
  [10935,[0x00, 0x00, 0x02]],
];

function waterColor(depth) {
  if (depth <= WATER_STOPS[0][0]) return WATER_STOPS[0][1];
  for (let i = 1; i < WATER_STOPS.length; i++) {
    if (depth <= WATER_STOPS[i][0]) {
      const [d0, c0] = WATER_STOPS[i - 1];
      const [d1, c1] = WATER_STOPS[i];
      const t = (depth - d0) / (d1 - d0);
      return c0.map((v, k) => Math.round(v + (c1[k] - v) * t));
    }
  }
  return WATER_STOPS[WATER_STOPS.length - 1][1];
}

const ZONES = [
  [200, "sunlight"], [1000, "twilight"], [4000, "midnight"],
  [6000, "abyss"], [10934, "hadal"], [Infinity, "challenger deep"],
];

function zoneName(depth) {
  if (depth < 2) return "surface";
  for (const [limit, name] of ZONES) if (depth < limit) return name;
  return "challenger deep";
}

function fmtLight(pct) {
  if (pct >= 1) return Math.round(pct) + "%";
  if (pct >= 0.01) return "<1%";
  if (pct > 0) return "trace";
  return "0%";
}

function fmtInt(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/* ---------- DOM refs ---------- */

const water = document.getElementById("water");
const hud = document.getElementById("hud");
const hudM = document.getElementById("hud-m");
const hudPress = document.getElementById("hud-press");
const hudTemp = document.getElementById("hud-temp");
const hudLight = document.getElementById("hud-light");
const hudZone = document.getElementById("hud-zone");
const rail = document.getElementById("rail");
const railFill = document.getElementById("rail-fill");
const railTicks = document.querySelectorAll(".rail-tick");
const railDepths = [0, 200, 1000, 4000, 6000, 10935];

/* ---------- marine snow ---------- */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let flakes = [];
let lastScrollY = 0;
let scrollVel = 0;

function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function seedFlakes() {
  const n = innerWidth < 760 ? 60 : 110;
  flakes = Array.from({ length: n }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: 0.6 + Math.random() * 1.7,
    fall: 0.12 + Math.random() * 0.35,
    sway: Math.random() * Math.PI * 2,
    swayAmp: 0.15 + Math.random() * 0.35,
    a: 0.25 + Math.random() * 0.55,
  }));
}

function drawSnow(depth, t) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  // no snow above the waterline; fade in over the first 150 m
  const density = Math.max(0, Math.min(1, (depth - 20) / 150));
  if (density <= 0) return;
  ctx.fillStyle = "#cfe4f0";
  const vel = Math.max(-42, Math.min(42, scrollVel)); // keep jumps from scattering flakes
  for (const f of flakes) {
    f.y += f.fall - vel * 0.55; // scrolling down makes snow rush upward
    f.x += Math.sin(t / 1400 + f.sway) * f.swayAmp;
    if (f.y > innerHeight + 6) { f.y = -6 - Math.random() * 60; f.x = Math.random() * innerWidth; }
    if (f.y < -70) { f.y = innerHeight + Math.random() * 60; f.x = Math.random() * innerWidth; }
    ctx.globalAlpha = f.a * density;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, 7);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ---------- main loop ---------- */

let shownDepth = 0;

function frame(t) {
  const scrollCenter = window.scrollY + innerHeight / 2;
  const target = depthAt(scrollCenter);

  // ease the displayed depth toward the real one (feels like an instrument)
  shownDepth = reducedMotion ? target : shownDepth + (target - shownDepth) * 0.12;
  if (Math.abs(shownDepth - target) < 0.5) shownDepth = target;

  const d = shownDepth;

  // instruments
  hudM.textContent = fmtInt(d);
  const atm = 1 + d / 10;
  hudPress.textContent = atm < 100 ? atm.toFixed(1) + " atm" : fmtInt(atm) + " atm";
  hudTemp.textContent = lerpStops(TEMP_STOPS, d).toFixed(1) + " °C";
  hudLight.textContent = fmtLight(lerpStops(LIGHT_STOPS, d));
  hudZone.textContent = zoneName(d);

  // water colour
  const [r, g, b] = waterColor(d);
  water.style.backgroundColor = `rgb(${r},${g},${b})`;

  // progress rail
  const prog = Math.min(1, d / MAX_DEPTH);
  railFill.style.transform = `scaleY(${prog})`;
  railTicks.forEach((tick, i) => {
    tick.classList.toggle("passed", d >= railDepths[i] - 1);
  });

  // HUD visibility: appear once the dive starts
  const diving = window.scrollY > innerHeight * 0.55;
  hud.classList.toggle("on", diving);
  rail.classList.toggle("on", diving);

  // snow
  scrollVel = (window.scrollY - lastScrollY);
  lastScrollY = window.scrollY;
  if (!reducedMotion) drawSnow(target, t);

  requestAnimationFrame(frame);
}

/* ---------- reveals ---------- */

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- ascend button ---------- */

document.getElementById("ascend").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

/* ---------- boot ---------- */

function init() {
  resizeCanvas();
  seedFlakes();
  buildAnchors();
  lastScrollY = window.scrollY;
  requestAnimationFrame(frame);
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
    seedFlakes();
    buildAnchors();
  }, 150);
});

// re-measure once fonts/layout settle
window.addEventListener("load", buildAnchors);

init();
