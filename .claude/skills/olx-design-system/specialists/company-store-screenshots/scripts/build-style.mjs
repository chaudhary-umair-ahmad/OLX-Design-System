#!/usr/bin/env node
// Brand-agnostic style builder: draws a style's signature parts (grid, index row, signal blocks, figure captions,
// registration marks, hard-cropped upright phones…) as the editor's own text and image elements, for ANY brand,
// so the deck stays editable in the editor and converts exactly to Claude Design.
//
//   node build-style.mjs <project-dir> --copy copy.json [--style swiss-grid-bold] [--brand <id|profile.json>]
//
// Reads from the project: the deck's theme colours (src/lib/constants.ts, built-in or injected) and the deck's font
// files (brand stack @font-face rules or the imported font) to measure headlines, so blocks fit their words.
// Reads from the profile (optional): maxHeadlineWeight. Everything screen-specific comes from copy.json:
//
// {
//   "brandLabel": "ACME",                          // index-row name (default: appName, upper case)
//   "draftLabel": "DRAFT · PLACEHOLDER CAPTURE",    // optional red/accent flag on every screen; omit for finals
//   "decks": ["iphone", "android", "ipad"],          // default: decks whose capture folder exists
//   "captureDirs": { "iphone": "apple/iphone" },    // optional overrides of the standard folders
//   "locale": "en",
//   "featureGraphic": "Pay bills in seconds.",       // optional Play banner tagline
//   "screens": [
//     { "key": "home", "section": "Buy & sell", "fig": "Home",
//       "lines": ["Buy. Sell.", "Near you."], "emph": 1,          // emph: line on the signal block (-1: none)
//       "sub": "Cars. Homes. Phones. Jobs. →",
//       "phone": "bottom-left" | "bottom-right" | "top-right",     // default by rhythm
//       "capture": "home" | { "iphone": "home", "ipad": "home-tablet" },   // file name without .png (default key)
//       "data": ["01  Category", "02  Photos"], "dataSignal": 1,    // optional ruled data column (dark screens)
//       "numeral": "12", "unit": ["categories.", "One app."], "caption": "…",   // optional proof band (light screens)
//       "callout": { "focusX": 0.76, "focusY": 0.63, "zoom": 2.6, "shape": "circle" }, "calloutOn": ["iphone"] }
//   ]
// }
//
// Rhythm: screens alternate light (the theme's bg) and dark (bgAlt) like the spec's paper/ink pages; a screen can
// force it with "tone": "paper" | "ink". Every fact on a screen must be visible in its capture: the builder only
// lays out the words it is given.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args.splice(i, 2)[1]; };
const copyFile = flag("--copy"), styleId = flag("--style", "swiss-grid-bold"), brandArg = flag("--brand");
const P = path.resolve(args[0] || ".");
const fail = (m) => { console.error(m); process.exit(1); };
if (!copyFile) fail("usage: build-style.mjs <project-dir> --copy copy.json [--style swiss-grid-bold] [--brand <id|profile.json>]");
const RECIPES = { "swiss-grid-bold": swiss, "bento-keynote-grid": bento, "map-led-local": mapled };
if (!RECIPES[styleId]) fail(`No builder for "${styleId}" yet. Built: ${Object.keys(RECIPES).join(", ")}. Other styles: apply the spec by hand in the editor.`);

const { chromium } = createRequire(path.join(P, "package.json"))("playwright");
const COPY = JSON.parse(fs.readFileSync(copyFile, "utf8"));
const projectFile = path.join(P, "app-store-screenshots.json");
const state = JSON.parse(fs.readFileSync(projectFile, "utf8"));
const constants = fs.readFileSync(path.join(P, "src/lib/constants.ts"), "utf8");
const profilePath = brandArg && (/[\\/]|\.json$/.test(brandArg) ? path.resolve(brandArg) : path.join(SKILL, "brands", `${brandArg}.json`));
const brand = profilePath && fs.existsSync(profilePath) ? JSON.parse(fs.readFileSync(profilePath, "utf8")) : {};
const locale = COPY.locale || state.locale || "en";

// ---------- colour ----------
function themeColors() {
  const id = state.themeId;
  const at = constants.indexOf(`"${id}": {`) >= 0 ? constants.indexOf(`"${id}": {`) : constants.indexOf(`  ${id}: {`);
  if (at < 0) fail(`theme "${id}" not found in src/lib/constants.ts`);
  const block = constants.slice(at, constants.indexOf("}", at));
  const get = (k) => (block.match(new RegExp(`["\\s{,]${k}"?\\s*:\\s*"(#[0-9A-Fa-f]{6})"`)) || [])[1];
  const t = { bg: get("bg"), bgAlt: get("bgAlt"), fg: get("fg"), fgAlt: get("fgAlt"), accent: get("accent"), muted: get("muted") };
  for (const [k, v] of Object.entries(t)) if (!v) fail(`theme "${id}" has no ${k}`);
  return t;
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
const lum = (h) => { const [r, g, b] = hex(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => toHex(hex(a).map((v, i) => v * (1 - t) + hex(b)[i] * t));
const bestOn = (surface, cands) => cands.reduce((best, c) => (contrast(c, surface) > contrast(best, surface) ? c : best));
const TH = themeColors();
const SURF = {
  paper: { bg: TH.bg, fg: TH.fg, muted: contrast(TH.muted, TH.bg) >= 4.5 ? TH.muted : mix(TH.fg, TH.bg, 0.25) },
  // Labels on the dark surface: the text colour a third of the way to the surface, kept at 4.5:1 or better.
  ink: { bg: TH.bgAlt, fg: TH.fgAlt, muted: (() => { const m = mix(TH.fgAlt, TH.bgAlt, 0.32); return contrast(m, TH.bgAlt) >= 4.5 ? m : TH.fgAlt; })() },
};
const SIGNAL = TH.accent;
const ON_SIGNAL = bestOn(SIGNAL, ["#FFFFFF", TH.fg, TH.bg, TH.fgAlt, TH.bgAlt]);
if (contrast(ON_SIGNAL, SIGNAL) < 3) console.warn(`WARNING: best text on the signal colour is ${contrast(ON_SIGNAL, SIGNAL).toFixed(1)}:1 — below 3:1 even for display type`);

// ---------- font (measure what the editor will render) ----------
const headWeight = Math.min(800, brand.maxHeadlineWeight || 800);
function fontFaces() {
  if (state.fontId === "self-hosted" && state.importedFont?.src) {
    return [{ file: path.join(P, "public", state.importedFont.src), weight: "100 900" }];
  }
  const famLine = constants.match(new RegExp(`"${state.fontId}":\\s*\\{[^}]*family:\\s*'([^']+)'`)) || constants.match(new RegExp(`"${state.fontId}":\\s*\\{[^}]*family:\\s*"([^"]+)"`));
  const family = famLine && (famLine[1].match(/"([^"]+)"/) || [])[1];
  if (!family) return [];
  const css = fs.readFileSync(path.join(P, "src/app/globals.css"), "utf8");
  return [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0])
    .filter((r) => r.includes(`"${family}"`))
    .map((r) => ({ file: path.join(P, "public", (r.match(/url\("([^"]+)"\)/) || [])[1] || ""), weight: (r.match(/font-weight:\s*([^;]+);/) || [])[1] || "400" }))
    .filter((f) => fs.existsSync(f.file));
}
async function measure(strings) {
  const faces = fontFaces();
  if (!faces.length) { console.warn("WARNING: deck font files not found; estimating text widths (blocks may not fit)"); return {}; }
  const dir = path.dirname(faces[0].file), html = path.join(dir, ".measure.html");
  const rel = (f) => path.relative(dir, f).split(path.sep).join("/");
  fs.writeFileSync(html, `<style>${faces.map((f) => `@font-face{font-family:M;src:url("${rel(f.file)}");font-weight:${f.weight}}`).join("")}</style><span style="font-family:M;font-weight:${headWeight}">a</span>`);
  const exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
  const b = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined });
  const p = await b.newPage();
  await p.goto(`file://${html}`);
  await p.evaluate(() => document.fonts.ready);
  const ok = await p.evaluate((w) => document.fonts.check(`${w} 100px M`), headWeight);
  const out = await p.evaluate((list) => {
    const c = document.createElement("canvas").getContext("2d"); const r = {};
    for (const [s, w] of list) { c.font = `${w} 100px M`; r[`${w}|${s}`] = c.measureText(s).width / 100; }
    return r;
  }, strings);
  await b.close(); fs.unlinkSync(html);
  if (!ok) { console.warn("WARNING: deck font did not load for measuring; estimating widths"); return {}; }
  return out;
}

// ---------- assets ----------
const assetDir = path.join(P, "public/style-assets");
fs.rmSync(assetDir, { recursive: true, force: true });
fs.mkdirSync(assetDir, { recursive: true });
const svg = (name, w, h, body) => {
  w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
  const file = `${name}-${w}x${h}.svg`;
  fs.writeFileSync(path.join(assetDir, file), `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
  return { src: `/style-assets/${file}`, w, h };
};
// Single-colour rects keep the rect-RRGGBB-WxH name: the Claude Design converter turns them into editable blocks.
const rect = (color, w, h) => svg(`rect-${color.slice(1).toUpperCase()}`, w, h, `<rect width="100%" height="100%" fill="${color}"/>`);
// Rounded tile: rect-RRGGBB-WxH-rN, which the converter turns into an editable div with border-radius.
const tile = (color, w, h, r) => {
  w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h)); r = Math.round(r);
  const file = `rect-${color.slice(1).toUpperCase()}-${w}x${h}-r${r}.svg`;
  fs.writeFileSync(path.join(assetDir, file), `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" rx="${r}" fill="${color}"/></svg>`);
  return { src: `/style-assets/${file}`, w, h };
};

const DEVICES = {
  iphone: { w: 1320, h: 2868, ratio: 0.4907, dir: "apple/iphone", visible: 0.69, head: 1 },
  android: { w: 1080, h: 1920, ratio: 0.4615, dir: "android/phone", visible: 0.70, head: 1 },
  ipad: { w: 2064, h: 2752, ratio: 0.77, dir: "apple/ipad", visible: 0.62, head: 0.72 },
};

// ---------- the Swiss Grid Bold recipe (styles/08-swiss-grid-bold.md, mapped through the brand) ----------
function swiss(screen, i, n, dev, W) {
  const s = dev.w / 1320, cH = dev.h, pad = Math.min(dev.w, dev.h) * 0.012;
  const tone = screen.tone || (i % 2 === 1 ? "ink" : "paper");
  const ink = tone === "ink", S = SURF[tone];
  const phone = screen.phone || (ink ? "top-right" : i % 4 === 2 ? "bottom-right" : "bottom-left");
  const texts = [], images = [];
  let uid = 0;
  const T = (text, x, y, w, size, weight, color, align = "left", extra = {}) => {
    const h = size * 1.05 + 2 * pad;
    texts.push({ id: `t${i}-${++uid}`, text: { [locale]: text }, transform: { x: x - pad, y: y - pad, width: w + 2 * pad, height: h, rotation: extra.rotation ?? 0, zIndex: extra.z ?? 10 }, fontSize: Math.round(size), fontWeight: weight, color, align });
  };
  const I = (asset, x, y, z) => images.push({ id: `i${i}-${++uid}`, src: asset.src, transform: { x, y, width: asset.w, height: asset.h, rotation: 0, zIndex: z }, fit: "cover" });
  const width = (str, size, weight) => (W[`${weight}|${str}`] ?? 0.58 * str.length) * size;
  const L = 72 * s, R = 1248 * s, CW = R - L;
  const labelSize = 28 * s * (dev.head < 1 ? 1.1 : 1);
  const num = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;

  // 12-column hairline grid (spec: drawn, never implied)
  const gridColor = ink ? `${S.fg}24` : `${S.fg}21`;
  const lw = Math.max(1, Math.round(2 * s));
  let lines = "";
  for (let k = 0; k <= 11; k++) lines += `<rect x="${Math.round((72 + 100 * k) * s)}" y="0" width="${lw}" height="${cH}" fill="${gridColor}"/>`;
  lines += `<rect x="${Math.round(1248 * s) - lw}" y="0" width="${lw}" height="${cH}" fill="${gridColor}"/>`;
  I(svg(`grid-${tone}`, dev.w, cH, lines), 0, 0, 1);

  // upright phone, hard crop
  const pw = (phone.startsWith("bottom") ? 1076 : 1100) * s * (dev.key === "ipad" ? 0.92 : 1), ph = pw / dev.ratio;
  let px = phone === "bottom-left" ? 172 * s : 348 * s;
  let py = phone.startsWith("bottom") ? cH * (1 - dev.visible) : cH * dev.visible - ph;

  let headSize = 176 * s * dev.head;
  const headline = (hl, emph, y0) => {
    const max = Math.max(...hl.map((l) => width(l, 1, headWeight))) * headSize;
    if (max > 1160 * s) headSize *= (1160 * s) / max; // widest line ≤ 88% of the canvas
    const lh = headSize * 0.98;
    hl.forEach((line, k) => {
      const y = y0 + k * lh, isEmph = k === emph;
      if (isEmph) I(rect(SIGNAL, L + width(line, headSize, headWeight) + 0.12 * headSize, headSize * 1.12), 0, y - 0.02 * headSize, 6);
      T(line, L, y, Math.max(CW, width(line, headSize, headWeight) + 0.3 * headSize), headSize, headWeight, isEmph ? ON_SIGNAL : S.fg);
    });
    return y0 + hl.length * lh;
  };
  const regMark = (x, y) => {
    const z = Math.round(80 * s), sw = Math.max(2, Math.round(3 * s)), m = z / 2, c = S.fg;
    I(svg(`reg-${tone}`, z, z, `<circle cx="${m}" cy="${m}" r="${18 * s}" fill="none" stroke="${c}" stroke-width="${sw}"/><rect x="${m - sw / 2}" y="${m - 36 * s}" width="${sw}" height="${72 * s}" fill="${c}"/><rect x="${m - 36 * s}" y="${m - sw / 2}" width="${72 * s}" height="${sw}" fill="${c}"/>`), x, y, 2);
  };
  const brandLabel = (COPY.brandLabel || state.appName || "").toUpperCase();

  if (!ink) {
    T(brandLabel, L, 92 * s - labelSize / 2, 380 * s, labelSize, 700, S.fg);
    T((screen.section || "").toUpperCase(), 472 * s, 92 * s - labelSize / 2, 480 * s, labelSize, 600, S.muted);
    T(num, R - 260 * s, 92 * s - labelSize / 2, 260 * s, labelSize, 600, S.muted, "right");
    I(rect(S.fg, CW, Math.max(2, 3 * s)), L, 148 * s, 7);
    let y = 196 * s;
    if (screen.numeral) {
      const nSize = 560 * s * dev.head, bandH = nSize * 1.05 + 90 * s, nW = width(screen.numeral, nSize, headWeight);
      I(rect(SIGNAL, dev.w, bandH), 0, y, 6);
      T(screen.numeral, L, y + 45 * s, nW * 1.15 + 40 * s, nSize, headWeight, ON_SIGNAL);
      const room = CW - nW * 1.15 - 60 * s, unit = screen.unit || [];
      let uSize = 120 * s * dev.head;
      const uMax = Math.max(1e-6, ...unit.map((u) => width(u, 1, headWeight)));
      if (uMax * uSize > room) uSize = room / uMax;
      unit.forEach((u, k) => T(u, L + nW * 1.15 + 60 * s, y + bandH / 2 - uSize * 1.05 * unit.length / 2 + k * uSize * 1.05, room, uSize, headWeight, ON_SIGNAL));
      y += bandH + 28 * s;
      if (screen.caption) T(screen.caption.toUpperCase(), L, y, CW, labelSize, 600, S.muted);
      py = Math.max(py, y + labelSize + 60 * s);
    } else {
      y = headline(screen.lines || [], screen.emph ?? -1, y);
      if (screen.sub) T(screen.sub, L, y + 24 * s, CW, 46 * s * dev.head, 500, S.muted);
    }
    // Figure caption, horizontal above the phone (the spec's other placement). The vertical one in column 1 needs a
    // rotated box that starts off-canvas, which the editor clamps back inside in isolated mode.
    if (screen.fig && !screen.numeral) {
      T(`FIG. ${i + 1} — ${screen.fig.toUpperCase()}`, L, py - labelSize - 34 * s, 700 * s, labelSize * 0.9, 600, S.muted);
    }
    regMark(R - 80 * s, cH - 140 * s);
  } else {
    let y = cH * dev.visible + 64 * s;
    I(rect(S.fg, CW, Math.max(2, 3 * s)), L, y, 7);
    y += 24 * s;
    T(`FIG. ${i + 1} — ${(screen.fig || screen.section || "").toUpperCase()}`, L, y, 700 * s, labelSize, 600, S.muted);
    T(num, R - 260 * s, y, 260 * s, labelSize, 600, S.muted, "right");
    y += labelSize + 36 * s;
    y = headline(screen.lines || [], screen.emph ?? -1, y);
    if (screen.sub) T(screen.sub, L, y + 20 * s, CW, 44 * s * dev.head, 500, S.muted);
    if (screen.data) {
      const dSize = 30 * s * dev.head, rowH = dSize * 2.4, colW = 248 * s, top = cH * 0.18;
      screen.data.forEach((row, k) => {
        const ry = top + k * rowH;
        I(rect(mix(S.fg, S.bg, 0.75), colW, Math.max(1, 2 * s)), L, ry, 7);
        if (k === screen.dataSignal) I(rect(SIGNAL, L + colW, rowH - 4 * s), 0, ry + 3 * s, 6);
        T(row.toUpperCase(), L, ry + (rowH - dSize) / 2, colW, dSize, 600, k === screen.dataSignal ? ON_SIGNAL : S.fg);
      });
    }
    regMark(L, cH - 140 * s);
  }
  if (COPY.draftLabel) T(COPY.draftLabel.toUpperCase(), R - 760 * s, ink ? 60 * s : 172 * s, 760 * s, 20 * s * (dev.head < 1 ? 1.2 : 1), 700, contrast(SIGNAL, S.bg) >= 3 ? SIGNAL : S.fg, "right", { z: 20 });

  const capture = (typeof screen.capture === "object" ? screen.capture[dev.key] : screen.capture) || screen.key;
  const out = {
    id: `${dev.key}-${screen.key}`, layout: "device-bottom", inverted: ink,
    label: { [locale]: " " }, headline: { [locale]: " " }, // a space keeps the built-in caption empty, no placeholder
    screenshot: `/screenshots/${dev.dir}/${locale}/${capture}.png`,
    transforms: { device: { x: px, y: py, width: pw, height: ph, rotation: 0, zIndex: 3 } },
    textElements: texts, imageElements: images,
  };
  if (screen.callout && (!screen.calloutOn || screen.calloutOn.includes(dev.key))) {
    const cs = 420 * s * dev.head;
    out.callout = screen.callout;
    out.transforms.callout = { x: L, y: cH * 0.2, width: cs, height: cs, rotation: 0, zIndex: 8 };
  }
  return out;
}


// ---------- the Bento Keynote Grid recipe (styles/15-bento-keynote-grid.md, mapped through the brand) ----------
// Tiles on a 12-column grid (56 margin, 40 gutter, 104 pitch @1320), one saturated brand tile per slide, a tall
// "stage" tile the phone rises out of, headline above with ONE emphasis line in the accent (the spec's gradient
// phrase becomes the brand accent: many brands forbid gradients). Tiles carry words from copy.json only.
//
// copy.json per screen: "layout": "crown" | "floor" | "split" (default by position: crown, floor, split, …),
// "lines": [...] (1–2), "emph": line index in the accent, "tiles": [ { "type": "label", "eyebrow": "Browse",
// "text": "Pick a\nproject." } | { "type": "stat", "eyebrow": "Per block", "value": "[PRICE]", "unit": "", "caption": "…" }
// | { "type": "list", "eyebrow": "…", "items": ["…"] } ], "brand": index of the tile on the brand colour (default:
// the first stat, else the middle tile). crown/floor use 3 tiles; split uses 2 (inline + tall brand tile).
const BENTO_LAYOUTS = ["crown", "floor", "split"];
function bentoColors() {
  const darkGround = lum(TH.bg) < 0.18;
  const tileA = darkGround ? (lum(TH.bgAlt) < 0.18 ? TH.bgAlt : mix(TH.bg, TH.fg, 0.07)) : (TH.bg.toUpperCase() === "#FFFFFF" ? mix(TH.bg, TH.fg, 0.04) : "#FFFFFF");
  const tileB = darkGround ? mix(tileA, TH.fg, 0.06) : TH.bgAlt;
  const onTile = (c) => bestOn(c, [TH.fg, TH.fgAlt, "#FFFFFF", TH.bg]);
  const mutedOn = (c) => { const f = onTile(c), m = mix(f, c, 0.32); return contrast(m, c) >= 4.5 ? m : f; };
  const eyebrowOnSignal = (() => { const m = mix(ON_SIGNAL, SIGNAL, 0.22); return contrast(m, SIGNAL) >= 4.5 ? m : ON_SIGNAL; })();
  const headFg = bestOn(TH.bg, [TH.fg, TH.fgAlt]);
  const emph = contrast(SIGNAL, TH.bg) >= 3 ? SIGNAL : headFg;
  return { ground: TH.bg, tileA, tileB, onTile, mutedOn, eyebrowOnSignal, headFg, emph, headMuted: mutedOn(TH.bg) };
}
function bento(screen, i, n, dev, W) {
  const s = dev.w / 1320, sy = dev.h / 2868, H = dev.h, pad = Math.min(dev.w, dev.h) * 0.012;
  const C = bentoColors();
  const layout = screen.layout || BENTO_LAYOUTS[i % BENTO_LAYOUTS.length];
  const texts = [], images = [];
  let uid = 0;
  const T = (text, x, y, w, size, weight, color, align = "left", lines = 1) => {
    const h = size * 1.05 * lines + 2 * pad;
    texts.push({ id: `t${i}-${++uid}`, text: { [locale]: text }, transform: { x: x - pad, y: y - pad, width: w + 2 * pad, height: h, rotation: 0, zIndex: 10 }, fontSize: Math.round(size), fontWeight: weight, color, align });
    return h - 2 * pad;
  };
  const I = (asset, x, y, z) => images.push({ id: `i${i}-${++uid}`, src: asset.src, transform: { x, y, width: asset.w, height: asset.h, rotation: 0, zIndex: z }, fit: "cover" });
  const width = (str, size, weight) => (W[`${weight}|${str}`] ?? 0.58 * str.length) * size;
  const col = (n1) => (56 + (n1 - 1) * 104) * s, span = (k) => (k * 104 - 40) * s, gap = 40 * s, R = 60 * s;
  const tp = 48 * s, eyebrowSize = 31 * s;

  // headline: 1–2 lines, emphasis line in the accent; centred on crown, flush-left otherwise
  const hl = screen.lines || [];
  const align = layout === "crown" ? "center" : "left";
  const hlW = layout === "split" ? span(7) : span(12);
  let hs = (layout === "split" ? 124 : 140) * s;
  const widest = Math.max(1e-6, ...hl.map((l) => width(l, 1, headWeight)));
  if (widest * hs > hlW * 0.9) hs = (hlW * 0.9) / widest; // 10% slack: the editor wraps a line that only just fits
  const top = 96 * sy;
  hl.forEach((line, k) => T(line, col(1), top + k * hs * 0.98, hlW, hs, headWeight, k === (screen.emph ?? -1) ? C.emph : C.headFg, align));
  const headBottom = top + Math.max(1, hl.length) * hs * 0.98;

  // tiles from copy (never invented)
  const tiles = screen.tiles || [];
  const brandIdx = screen.brand ?? (tiles.findIndex((t) => t.type === "stat") >= 0 ? tiles.findIndex((t) => t.type === "stat") : Math.floor(tiles.length / 2));
  const drawTile = (t, k, x, y, w, h, fill) => {
    const isBrand = k === brandIdx;
    const bg = isBrand ? SIGNAL : fill;
    I(tile(bg, w, h, R), x, y, 4);
    if (!t) return;
    const fg = isBrand ? ON_SIGNAL : C.onTile(bg), mu = isBrand ? C.eyebrowOnSignal : C.mutedOn(bg);
    const iw = w - 2 * tp;
    if (t.eyebrow) T(t.eyebrow, x + tp, y + tp, iw, eyebrowSize, 600, mu);
    if (t.type === "stat") {
      const capLines = t.caption ? String(t.caption).split("\n").length : 0, capH = capLines ? 34 * s * 1.2 * capLines + 14 * s : 0;
      let ns = Math.min(240 * s, (h - 2 * tp - eyebrowSize * 1.8 - capH) / 1.2);
      const vw = width(t.value || "", 1, headWeight) * ns, uw = t.unit ? width(t.unit, 1, headWeight) * ns * 0.34 : 0;
      if (vw + uw + 12 * s > iw * 0.9) ns *= (iw * 0.9) / (vw + uw + 12 * s);
      const ny = y + h - tp - capH - ns * 1.2;
      T(t.value || "", x + tp, ny, iw, ns, headWeight, fg);
      if (t.unit) T(t.unit, x + tp + width(t.value || "", ns, headWeight) + 12 * s, ny + ns * 0.62, iw, ns * 0.34, headWeight, fg);
      if (t.caption) T(t.caption, x + tp, y + h - tp - capH + 14 * s, iw, 34 * s, 600, mu, "left", capLines);
    } else if (t.type === "list") {
      const items = t.items || [], ls = Math.min(62 * s, (h - 2 * tp - eyebrowSize * 1.8) / Math.max(1, items.length) / 1.5);
      items.forEach((it, j) => {
        const yy = y + tp + eyebrowSize * 1.8 + j * ls * 1.5;
        if (j) I(rect(mix(fg, bg, 0.82), iw, Math.max(1, 2 * s)), x + tp, yy - ls * 0.25, 5);
        T(it, x + tp, yy, iw, ls, headWeight, fg);
      });
    } else {
      const lines = String(t.text || "").split("\n");
      let ls = Math.min(68 * s, (h - 2 * tp - eyebrowSize * 1.6) / lines.length / 1.05);
      const lw = Math.max(1e-6, ...lines.map((l) => width(l, 1, headWeight)));
      if (lw * ls > iw * 0.9) ls = (iw * 0.9) / lw;
      T(t.text || "", x + tp, y + h - tp - ls * 1.05 * lines.length, iw, ls, headWeight, fg, "left", lines.length);
    }
  };

  // stage + phone (the stage's bottom edge "crops" the phone: a ground strip covers what falls below it)
  const stage = (sx, sy0, sw, sh) => {
    I(tile(C.tileA, sw, sh, R), sx, sy0, 1); // layers: stage 1 · phone 2 · ground strip 3 · tiles 4 · text 10
    const pw = Math.min(sw - 2 * 74 * s, 1100 * s * (dev.key === "ipad" ? 0.92 : 1)), ph = pw / dev.ratio;
    const px = sx + (sw - pw) / 2, py = sy0 + 64 * sy;
    I(rect(C.ground, dev.w, Math.max(1, H - (sy0 + sh))), 0, sy0 + sh, 3);
    return { x: px, y: py, width: pw, height: ph, rotation: 0, zIndex: 2 };
  };

  let device;
  const bottom = H - 56 * sy;
  if (layout === "crown") {
    const cy = headBottom + 44 * sy, ch = 300 * sy;
    [0, 1, 2].forEach((k) => drawTile(tiles[k], k, col(1 + 4 * k), cy, span(4), ch, k === 1 ? C.tileB : C.tileA));
    device = stage(col(1), cy + ch + gap, span(12), bottom - (cy + ch + gap));
  } else if (layout === "floor") {
    const fh = 376 * sy, fy = bottom - fh, st = headBottom + 40 * sy;
    device = stage(col(1), st, span(12), fy - gap - st);
    [0, 1, 2].forEach((k) => drawTile(tiles[k], k, col(1 + 4 * k), fy, span(4), fh, k === 1 ? C.tileB : C.tileA));
  } else { // split: headline in cols 1–7 beside a tall brand tile, one inline tile below the headline
    const brandTop = 96 * sy, brandH = 616 * sy;
    drawTile(tiles[1], tiles.length > 1 ? 1 : -1, col(8), brandTop, span(5), brandH, C.tileB);
    const iy = Math.max(headBottom + 40 * sy, brandTop + brandH - 248 * sy); // inline tile: eyebrow + one line
    drawTile(tiles[0], 0 === brandIdx && tiles.length > 1 ? -1 : 0, col(1), iy, span(7), brandTop + brandH - iy, C.tileB);
    device = stage(col(1), brandTop + brandH + gap, span(12), bottom - (brandTop + brandH + gap));
  }
  if (COPY.draftLabel) T(COPY.draftLabel.toUpperCase(), col(1), 40 * sy, span(12), 18 * s * (dev.head < 1 ? 1.2 : 1), 700, contrast(SIGNAL, C.ground) >= 3 ? SIGNAL : C.headFg, "right");

  const capture = (typeof screen.capture === "object" ? screen.capture[dev.key] : screen.capture) || screen.key;
  return {
    id: `${dev.key}-${screen.key}`, layout: "device-bottom", inverted: false, backgroundColor: C.ground,
    label: { [locale]: " " }, headline: { [locale]: " " },
    screenshot: `/screenshots/${dev.dir}/${locale}/${capture}.png`,
    transforms: { device }, textElements: texts, imageElements: images,
  };
}

// ---------- the Map-Led Local recipe (styles/24-map-led-local.md, mapped through the brand) ----------
// One quiet drawn map (land, roads, water: three tones, contrast 1.10–1.30:1) continues across every seam; one accent
// pin + one chip per screen; upright phone; headline with one place phrase in the accent. Dark grounds get the spec's
// night map (whole deck). The map is invented geometry, never a map provider's tiles.
//
// copy.json per screen: "layout": "pin" (M1: pin top-right, phone bottom) | "side-right" | "side-left" (M2: phone
// bleeds off that side, pin + chip in the opposite strip) | "closer" (M3: app name row, legal line); default rotates
// pin, side-right, pin, side-left, …, closer last. "lines" (≤ 2), "emph", "chip": words from the capture or a
// [PLACEHOLDER] (omit for no chip), "glyph": "house" | "bag" | "car" | "briefcase" | "key" | "dot", "legal": closer
// footnote. Top level: "appName" (closer row; default the project's appName), "route": false to skip the dotted route
// from screen 2's pin to screen 3's.
const MAP_LAYOUTS = (n) => Array.from({ length: n }, (_, i) => (i === n - 1 && n > 2 ? "closer" : ["pin", "side-right", "pin", "side-left"][i % 4]));
function mapTones() {
  const dark = lum(TH.bg) < 0.18;
  const land = TH.bg, toward = dark ? TH.fg : TH.fg;
  // step towards the text colour until the pair reaches the target contrast (quiet map: 1.10–1.30:1)
  const reach = (from, to, target) => { let t = 0; while (t < 1 && contrast(mix(from, to, t), from) < target) t += 0.005; return mix(from, to, t); };
  const road = dark ? reach(land, toward, 1.22) : "#FFFFFF";
  const water = reach(land, mix(toward, TH.accent, 0.12), dark ? 1.12 : 1.15);
  const casing = mix(land, TH.fg, dark ? 0.02 : 0.06);
  const ink = bestOn(land, [TH.fg, TH.fgAlt]);
  const ink2 = (() => { const m = mix(ink, land, 0.3); return contrast(m, land) >= 4.5 ? m : ink; })();
  const emph = contrast(TH.accent, land) >= 4.5 ? TH.accent : ink;
  const pinGlyph = bestOn(TH.accent, ["#FFFFFF", TH.bg, TH.fg]);
  // chip: white on a light map; on a dark map the next dark elevation (dark-only brands have no light surfaces)
  const chip = dark ? mix(land, TH.fg, 0.12) : "#FFFFFF";
  return { dark, land, road, water, casing, ink, ink2, emph, pin: TH.accent, pinShade: mix(TH.accent, "#000000", 0.24), pinLight: mix(TH.accent, "#FFFFFF", 0.2), pinGlyph, chip, chipInk: bestOn(chip, [TH.fg, TH.fgAlt, "#000000"]), outline: dark ? TH.fg : null };
}
const GLYPHS = {
  house: "M50 30 L72 48 L72 70 L28 70 L28 48 Z M44 70 L44 56 L56 56 L56 70",
  bag: "M32 42 L68 42 L72 72 L28 72 Z M40 42 C40 28 60 28 60 42",
  car: "M26 62 L30 46 L70 46 L74 62 Z M34 66 a5 5 0 1 0 0.1 0 M66 66 a5 5 0 1 0 0.1 0",
  briefcase: "M28 44 L72 44 L72 70 L28 70 Z M42 44 L42 36 L58 36 L58 44",
  key: "M38 50 a10 10 0 1 0 0.1 0 M48 50 L74 50 M66 50 L66 58",
};
function pinAsset(C, size, glyph) {
  const g = GLYPHS[glyph];
  const mark = g ? `<path d="${g}" transform="translate(0 -6) scale(1)" fill="none" stroke="${C.pin}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>` : `<circle cx="50" cy="44" r="10" fill="${C.pin}"/>`;
  const outline = C.outline ? `<path d="M50 128 C50 128 6 76 6 46 A44 44 0 1 1 94 46 C94 76 50 128 50 128 Z" fill="none" stroke="${C.outline}" stroke-width="7"/>` : "";
  return svg(`map-pin-${glyph || "dot"}-${C.pin.slice(1)}`, size, size * 1.36,
    `<g transform="scale(${size / 100})"><ellipse cx="50" cy="132" rx="32" ry="7" fill="rgba(0,0,0,.28)"/>${outline}` +
    `<path d="M50 128 C50 128 6 76 6 46 A44 44 0 1 1 94 46 C94 76 50 128 50 128 Z" fill="${C.pin}"/>` +
    `<path d="M62 4 A44 44 0 0 1 94 46 C94 76 50 128 50 128 C58 100 78 70 78 46 A40 40 0 0 0 62 4 Z" fill="${C.pinShade}"/>` +
    `<path d="M20 26 A36 36 0 0 1 44 9" fill="none" stroke="${C.pinLight}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="50" cy="44" r="23" fill="${C.pinGlyph}"/>${mark.replace(/translate\(0 -6\)/, "translate(14 8) scale(0.72)")}</g>`);
}
const mapCache = new Map();
function mapStrip(dev, layouts, pins, C) {
  const key = dev.key;
  if (mapCache.has(key)) return mapCache.get(key);
  const W = dev.w, H = dev.h, n = layouts.length, total = W * n, s = W / 1320, sy = H / 2868;
  let seed = 20261012 >>> 0; const r = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const road = (d, w) => `<path d="${d}" fill="none" stroke="${C.casing}" stroke-width="${(w + 4) * s}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${C.road}" stroke-width="${w * s}" stroke-linecap="round"/>`;
  const parts = [];
  // river: a 240px ribbon low on the strip (below every headline and pin zone), entering/leaving seams at different heights
  const rw = 240 * s; let d = `M ${-200 * s} ${2350 * sy}`;
  for (let k = 1; k <= n; k++) { const x1 = k * W, y1 = (2150 + (k % 2 ? 380 : 0) + r() * 160) * sy; d += ` C ${x1 - W * 0.62} ${(k % 2 ? 2080 : 2700) * sy}, ${x1 - W * 0.38} ${(k % 2 ? 2700 : 2080) * sy}, ${x1} ${y1}`; }
  d += ` L ${total + 200 * s} ${2400 * sy}`;
  const river = `<path d="${d}" fill="none" stroke="${C.water}" stroke-width="${rw}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${mix(C.water, C.road, 0.35)}" stroke-width="${3 * s}" transform="translate(0 ${-rw / 2})"/>`;
  // street grid rotated 12°, irregular spacing
  const g = [], ang = 12, pad = 2000 * s;
  for (let x = -pad; x < total + pad; x += (220 + r() * 140) * s) g.push(road(`M ${x} ${-pad} L ${x} ${H + pad}`, 16));
  for (let y = -pad; y < H + pad; y += (240 + r() * 120) * s) g.push(road(`M ${-pad} ${y} L ${total + pad} ${y}`, 16));
  parts.push(`<g transform="rotate(${ang} ${total / 2} ${H / 2})">${g.join("")}${road(`M ${-pad} ${1050 * sy} L ${total + pad} ${1050 * sy}`, 30)}${road(`M ${total * 0.42} ${-pad} L ${total * 0.42} ${H + pad}`, 30)}</g>`);
  parts.push(river);
  // one arterial at −25°, drawn above the water (the bridge)
  parts.push(road(`M ${-300 * s} ${2900 * sy} L ${total + 300 * s} ${2900 * sy - Math.tan(25 * Math.PI / 180) * (total + 600 * s)}`, 48));
  // route: screen 2's pin → screen 3's pin, along the band above the phones (the one cross-screen moment)
  if (COPY.route !== false && pins[1] && pins[2]) {
    const a = pins[1], b = pins[2], band = Math.min(a.bandY, b.bandY);
    parts.push(`<path d="M ${a.x} ${a.y} L ${a.x} ${band} L ${b.x} ${band} L ${b.x} ${b.y}" fill="none" stroke="${C.ink}" stroke-opacity=".55" stroke-width="${10 * s}" stroke-dasharray="${2 * s} ${22 * s}" stroke-linecap="round"/>`);
  }
  const body = parts.join("");
  const frames = layouts.map((_, i) => {
    const file = `map-${key}-${i + 1}-${W}x${H}.svg`;
    fs.writeFileSync(path.join(assetDir, file), `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${i * W} 0 ${W} ${H}"><rect x="${i * W}" y="0" width="${W}" height="${H}" fill="${C.land}"/>${body}</svg>`);
    return { src: `/style-assets/${file}`, w: W, h: H };
  });
  mapCache.set(key, frames);
  return frames;
}
function mapled(screen, i, n, dev, W) {
  const s = dev.w / 1320, sy = dev.h / 2868, H = dev.h, pad = Math.min(dev.w, dev.h) * 0.012;
  const C = mapTones();
  const layouts = screens.map((sc, k) => sc.layout || MAP_LAYOUTS(screens.length)[k]);
  const layout = layouts[i];
  const texts = [], images = [];
  let uid = 0;
  const T = (text, x, y, w, size, weight, color, align = "left", lines = 1) => {
    const h = size * 1.08 * lines + 2 * pad;
    texts.push({ id: `t${i}-${++uid}`, text: { [locale]: text }, transform: { x: x - pad, y: y - pad, width: w + 2 * pad, height: h, rotation: 0, zIndex: 10 }, fontSize: Math.round(size), fontWeight: weight, color, align });
  };
  const I = (asset, x, y, z) => images.push({ id: `i${i}-${++uid}`, src: asset.src, transform: { x, y, width: asset.w, height: asset.h, rotation: 0, zIndex: z }, fit: "cover" });
  const width = (str, size, weight) => (W[`${weight}|${str}`] ?? 0.58 * str.length) * size;

  // geometry per layout (spec M1/M2/M3 at 1320×2868, scaled; phone height from the device ratio)
  const phone = (pw, left, top) => ({ x: left * s, y: top * sy, width: pw * s, height: (pw * s) / dev.ratio, rotation: 0, zIndex: 3 });
  const geo = (l) => {
    if (l === "pin") return { hlW: 860, hlY: 150, device: phone(1060, 130, 820), pin: { x: 1040, y: 230 }, chip: { right: 1232, y: 420, max: 520 }, bandY: 700 };
    if (l === "side-right") return { hlW: 1144, hlY: 150, device: phone(1000, 420, 831), pin: { x: 130, y: 1220 }, chip: { left: 40, y: 1420, max: 320 }, bandY: 700 };
    if (l === "side-left") return { hlW: 1144, hlY: 150, device: phone(1000, -100, 831), pin: { x: 1078, y: 1220 }, chip: { right: 1280, y: 1420, max: 320 }, bandY: 700 };
    return { hlW: 1144, hlY: 360, device: phone(1040, 140, 900), pin: { x: 1060, y: 700 }, chip: null, bandY: 700, closer: true };
  };
  const G = geo(layout);
  // pins of every screen, in strip coordinates (the map draws the route between screens 2 and 3)
  const pins = layouts.map((l, k) => { const g = geo(l); return { x: k * dev.w + (g.pin.x + 56) * s, y: (g.pin.y + 76) * sy, bandY: g.bandY * sy }; });
  const strip = mapStrip(dev, layouts, pins, C);
  I(strip[i], 0, 0, 0);

  // headline (≤ 2 lines, one place phrase in the accent) on a feathered land scrim
  const hl = screen.lines || [];
  let hs = 140 * s;
  const maxW = G.hlW * s * 0.9;
  const widest = Math.max(1e-6, ...hl.map((l) => width(l, 1, headWeight)));
  if (widest * hs > maxW) hs = maxW / widest;
  const hx = 88 * s, hy = G.hlY * sy;
  const scrimW = Math.min(dev.w, widest * hs + 2 * 56 * s + 160 * s), scrimH = hl.length * hs + 2 * 56 * s + 160 * s;
  // feathered by stacked insets, not an SVG blur filter (the export rasteriser drops filters and shows a box)
  const steps = 16, alpha = 1 - Math.pow(1 - 0.94, 1 / steps), feather = 150 * s;
  const sc = svg(`map-scrim-${C.land.slice(1)}`, scrimW, scrimH, Array.from({ length: steps }, (_, k) => {
    const inset = 10 * s + (feather * (steps - 1 - k)) / steps;
    return `<rect x="${inset}" y="${inset}" width="${Math.max(1, scrimW - 2 * inset)}" height="${Math.max(1, scrimH - 2 * inset)}" rx="${Math.max(0, (scrimH - 2 * inset) / 2)}" fill="${C.land}" fill-opacity="${alpha.toFixed(4)}"/>`;
  }).join(""));
  I(sc, hx - 136 * s, hy - 136 * s, 1);
  if (G.closer) {
    const icon = svg(`map-icon-ph-${C.ink2.slice(1)}`, 144 * s, 144 * s, `<rect x="${2 * s}" y="${2 * s}" width="${140 * s}" height="${140 * s}" rx="${32 * s}" fill="none" stroke="${C.ink2}" stroke-width="${3 * s}" stroke-dasharray="${10 * s} ${8 * s}"/><text x="50%" y="54%" text-anchor="middle" font-family="sans-serif" font-size="${22 * s}" fill="${C.ink2}">ICON</text>`);
    I(icon, hx, 150 * sy, 6);
    T(COPY.appName || state.appName || "", 264 * s, 150 * sy + 38 * s, 900 * s, 68 * s, headWeight, C.ink);
  }
  hl.forEach((line, k) => T(line, hx, hy + k * hs * 1.0, G.hlW * s, hs, headWeight, k === (screen.emph ?? -1) ? C.emph : C.ink));

  // hero pin + chip (the one callout)
  const pinA = pinAsset(C, 112 * s, screen.glyph || "house");
  I(pinA, G.pin.x * s, G.pin.y * sy, 5);
  if (screen.chip && G.chip) {
    // chip: pill h 88, pin glyph left, text 38px shrinking to 30px to stay on one line inside the strip's max width
    const room = G.chip.max * s - 112 * s;
    const cs = Math.max(30 * s, Math.min(38 * s, (room / Math.max(1e-6, width(screen.chip, 1, 700))) / 1.1));
    const cw = Math.min(G.chip.max * s, width(screen.chip, cs, 700) * 1.1 + 112 * s), ch = 88 * s;
    const cx = G.chip.right != null ? G.chip.right * s - cw : G.chip.left * s, cy = Math.max(G.chip.y * sy, G.pin.y * sy + pinA.h + 20 * s); // below the pin's point on every canvas
    const chipSvg = svg(`map-chip-${C.chip.slice(1)}-${Math.round(cw)}`, cw, ch, `<rect width="${cw}" height="${ch}" rx="${ch / 2}" fill="${C.chip}"/><g transform="translate(${32 * s} ${ch / 2 - 16 * s}) scale(${0.32 * s})"><path d="M50 98 C50 98 10 60 10 38 A40 40 0 1 1 90 38 C90 60 50 98 50 98 Z" fill="${C.pin}"/><circle cx="50" cy="38" r="14" fill="${C.pinGlyph}"/></g>`);
    I(chipSvg, cx, cy, 6);
    T(screen.chip, cx + 80 * s, cy + (ch - cs * 1.08) / 2, cw - 88 * s, cs, 700, C.chipInk);
  }
  if (G.closer && screen.legal) T(screen.legal, hx, H - 72 * sy, dev.w - 2 * hx, 24 * s, 600, C.ink2);
  if (COPY.draftLabel) T(COPY.draftLabel.toUpperCase(), hx, 56 * sy, dev.w - 2 * hx, 18 * s * (dev.head < 1 ? 1.2 : 1), 700, C.emph, "right");

  const capture = (typeof screen.capture === "object" ? screen.capture[dev.key] : screen.capture) || screen.key;
  return {
    id: `${dev.key}-${screen.key}`, layout: "device-bottom", inverted: false, backgroundColor: C.land,
    label: { [locale]: " " }, headline: { [locale]: " " },
    screenshot: `/screenshots/${dev.dir}/${locale}/${capture}.png`,
    transforms: { device: G.device }, textElements: texts, imageElements: images,
  };
}

// ---------- main ----------
const screens = COPY.screens || [];
if (!screens.length) fail("copy.json has no screens");
for (const sc of screens) if (!sc.key) fail("every screen needs a key");
const strings = [];
for (const sc of screens) {
  for (const l of sc.lines || []) strings.push([l, headWeight]);
  if (sc.numeral) { strings.push([sc.numeral, headWeight]); for (const u of sc.unit || []) strings.push([u, headWeight]); }
  if (sc.chip) strings.push([sc.chip, 700]);
  for (const t of sc.tiles || []) {
    for (const v of [t.value, t.unit, ...String(t.text || "").split("\n"), ...(t.items || [])]) if (v) strings.push([v, headWeight]);
  }
}
const W = await measure(strings);
for (const [k, d] of Object.entries(COPY.captureDirs || {})) if (DEVICES[k]) DEVICES[k].dir = d;
const decks = COPY.decks || Object.keys(DEVICES).filter((k) => fs.existsSync(path.join(P, "public/screenshots", DEVICES[k].dir, locale)));
if (!decks.length) fail(`no capture folders found (public/screenshots/<dir>/${locale}); set "decks" in copy.json`);
for (const key of decks) {
  const dev = { ...DEVICES[key], key };
  state.slidesByDevice[key] = screens.map((sc, i) => RECIPES[styleId](sc, i, screens.length, dev, W));
  for (const sc of screens) {
    const cap = (typeof sc.capture === "object" ? sc.capture[key] : sc.capture) || sc.key;
    if (!fs.existsSync(path.join(P, "public/screenshots", dev.dir, locale, `${cap}.png`))) console.warn(`missing capture: ${dev.dir}/${locale}/${cap}.png`);
  }
}
if (COPY.featureGraphic) {
  state.slidesByDevice["feature-graphic"] = [{ id: "fg-1", layout: "feature-graphic", inverted: true, backgroundColor: TH.bgAlt, label: { [locale]: " " }, headline: { [locale]: COPY.featureGraphic }, screenshot: "" }];
}
state.scene = { ...state.scene, backdrop: "solid", decoration: "none", glow: 0, tilt: 0, shadow: 25, headlineWeight: headWeight, captionAlign: "left" };
state.connectedCanvas = false;
state.device = decks[0]; // open the editor on the first deck this build wrote
fs.writeFileSync(projectFile, JSON.stringify(state, null, 2) + "\n");
console.log(`${styleId}: ${decks.join(", ")} × ${screens.length} screens${COPY.featureGraphic ? " + feature graphic" : ""}`);
console.log(`  signal ${SIGNAL} with ${ON_SIGNAL} type (${contrast(ON_SIGNAL, SIGNAL).toFixed(1)}:1) · light ${SURF.paper.bg} · dark ${SURF.ink.bg} · headline weight ${headWeight}`);
