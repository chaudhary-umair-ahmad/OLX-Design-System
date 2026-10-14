#!/usr/bin/env node
// Turn a company-store-screenshots editor project into a Claude Design canvas (the claude.ai "Design" artifact type):
// one artboard per screen at its store size, pages per device, every text / block / phone a separate element
// a designer can select and edit in the canvas's properties panel.
//
//   Phase 1, list the images to upload as canvas assets:
//     node to-claude-design.mjs <project-dir> --list-assets            → JSON array of public paths
//   (upload them with the Artifact tool: publish, url = the canvas, asset: true, file_paths = those files
//    under <project-dir>/public; save {"<public path>": "/_blob/…"} as assets.json)
//
//   Phase 2, write the canvas files:
//     node to-claude-design.mjs <project-dir> --root <dir> --assets assets.json --brand <brand-id|profile.json>
//       [--title "…"] [--decks iphone,android,ipad,feature-graphic]
//   → <dir>/project/canvas.json and <dir>/project/<board>.dc.html. Publish with the Artifact tool:
//     url = the canvas, root = <dir>, file_path = <dir>/project/canvas.json, files = the boards
//     (+ the design-system copy entries the script prints, when the profile names a design system).
//
// Fidelity: element-built decks (text and image elements, device transforms, e.g. a style built from
// editor elements) convert exactly in position and size. Device frames are drawn as simplified bezels, and
// decks that lean on the editor's built-in caption get an approximate caption: check them on the canvas.
// The store-ready PNGs still come from the editor's Export bundle.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args.splice(i, 2)[1]; };
const listOnly = args.includes("--list-assets") && args.splice(args.indexOf("--list-assets"), 1);
const root = flag("--root"), assetsFile = flag("--assets"), brandArg = flag("--brand"), titleArg = flag("--title");
const decks = (flag("--decks", "iphone,android,ipad,feature-graphic")).split(",");
const P = path.resolve(args[0] || ".");
const fail = (m) => { console.error(m); process.exit(1); };

const state = JSON.parse(fs.readFileSync(path.join(P, "app-store-screenshots.json"), "utf8"));
const CANVAS = { iphone: [1320, 2868], android: [1080, 1920], ipad: [2064, 2752], "feature-graphic": [1024, 500],
  "android-7": [1200, 1920], "android-10": [1600, 2560], mac: [2880, 1800] };
const DECK_NAME = { iphone: "App Store · iPhone", android: "Google Play · Phone", ipad: "App Store · iPad",
  "feature-graphic": "Google Play · Feature graphic", "android-7": "Google Play · 7\" tablet", "android-10": "Google Play · 10\" tablet", mac: "Mac App Store" };
const slidesOf = (d) => (state.slidesByDevice?.[d] || []).filter(Boolean);
const used = decks.filter((d) => CANVAS[d] && slidesOf(d).length);

// ---------- images the canvas needs ----------
const isRectSvg = (src) => /\/rect-[0-9A-Fa-f]{6}-\d+x\d+(-r\d+)?\.svg$/.test(src);
const isInlineSvg = (src) => src.endsWith(".svg");
const pub = (s) => s.replace(/\{locale\}/g, state.locale || "en");
const assetsNeeded = new Set();
for (const d of used) for (const sl of slidesOf(d)) {
  if (sl.screenshot) assetsNeeded.add(pub(sl.screenshot));
  if (sl.screenshotSecondary) assetsNeeded.add(pub(sl.screenshotSecondary));
  for (const im of sl.imageElements || []) if (!isInlineSvg(im.src)) assetsNeeded.add(pub(im.src));
}
if (used.includes("feature-graphic") && state.appIcon) assetsNeeded.add(state.appIcon);
if (listOnly) { console.log(JSON.stringify([...assetsNeeded].filter((p) => fs.existsSync(path.join(P, "public", p))), null, 2)); process.exit(0); }
if (!root) fail("--root <dir> is required (or --list-assets)");
const ASSETS = assetsFile ? JSON.parse(fs.readFileSync(assetsFile, "utf8")) : {};
for (const a of assetsNeeded) if (!ASSETS[a] && fs.existsSync(path.join(P, "public", a))) fail(`asset not uploaded: ${a} (run --list-assets, upload, add to ${assetsFile})`);

// ---------- brand: theme colours + optional Claude Design design system ----------
const profilePath = brandArg && (/[\\/]|\.json$/.test(brandArg) ? path.resolve(brandArg) : path.join(SKILL, "brands", `${brandArg}.json`));
const brand = profilePath && fs.existsSync(profilePath) ? JSON.parse(fs.readFileSync(profilePath, "utf8")) : {};
function themeColors() {
  const src = fs.readFileSync(path.join(P, "src/lib/constants.ts"), "utf8");
  const id = state.themeId;
  const at = src.indexOf(`"${id}": {`) >= 0 ? src.indexOf(`"${id}": {`) : src.indexOf(`  ${id}: {`);
  const block = at >= 0 ? src.slice(at, src.indexOf("}", at)) : "";
  // Built-in themes write `bg: "#…"`; themes the scaffold injects write `"bg":"#…"`.
  const get = (k, d) => (block.match(new RegExp(`["\\s{,]${k}"?\\s*:\\s*"(#[0-9A-Fa-f]{6})"`)) || [])[1] || d;
  return { bg: get("bg", "#FFFFFF"), bgAlt: get("bgAlt", "#111111"), fg: get("fg", "#111111"), fgAlt: get("fgAlt", "#FFFFFF"), accent: get("accent", "#000000"), accentAlt: get("accentAlt", "") };
}
const TH = themeColors();
let cd = brand.claudeDesign || {};
if (JSON.stringify(cd).includes("<")) { console.warn("claudeDesign in the profile is not filled in: no design system, fonts fall back to the stack"); cd = {}; }
const dsFolder = cd.folder;
const fontFaces = (cd.fonts || []).map((f) =>
  `@font-face{font-family:"${f.family}";src:url("ds/${dsFolder}/${f.path}");font-weight:${f.weight};font-style:normal;font-display:block}`).join("\n");
const fontStack = cd.fontStack || "system-ui, sans-serif";
// A free font the design system names but does not ship (e.g. an OFL face): the canvas may load a Google Fonts
// css2 stylesheet in <helmet>, the one network request a Design artboard allows.
const googleFontsLink = cd.googleFonts && /^https:\/\/fonts\.googleapis\.com\/css2\?/.test(cd.googleFonts)
  ? `<link rel="stylesheet" href="${cd.googleFonts.replace(/&/g, "&amp;")}">` : "";

// ---------- helpers ----------
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const px = (n) => `${Math.round(n * 100) / 100}px`;
const text = (t) => (t && (t[state.locale] ?? t.en ?? Object.values(t)[0])) || "";
function pngSize(file) {
  try { const b = fs.readFileSync(file); if (b.toString("ascii", 1, 4) === "PNG") return [b.readUInt32BE(16), b.readUInt32BE(20)]; } catch {}
  return [1170, 2532];
}
function inlineSvg(src) {
  const raw = fs.readFileSync(path.join(P, "public", src), "utf8").replace(/<\?xml[^>]*>/, "");
  return raw.replace("<svg ", '<svg aria-hidden="true" style="display:block;width:100%;height:100%" preserveAspectRatio="none" ');
}
const box = (t, extra = "") =>
  `position: absolute; left: ${px(t.x)}; top: ${px(t.y)}; width: ${px(t.width)}; height: ${px(t.height)}; z-index: ${t.zIndex ?? 5};` +
  (t.rotation ? ` transform: rotate(${t.rotation}deg);` : "") + extra;

function deviceKind(d) { return d === "ipad" || d.startsWith("android-1") || d === "android-7" ? "tablet" : "phone"; }

function boardHtml(d, sl, i, W, H) {
  const inverted = !!sl.inverted;
  const bg = sl.backgroundColor || (inverted ? TH.bgAlt : TH.bg);
  const fg = inverted ? TH.fgAlt : TH.fg;
  const unit = Math.min(W, H), pad = unit * 0.012;
  const parts = [];

  // device + screenshot (no saved transform: approximate the layout's default placement)
  const FRAME_RATIO = { iphone: 0.4907, android: 0.4615, ipad: 0.77, "android-7": 0.62, "android-10": 0.62 };
  const layoutDevice = () => {
    if (!sl.screenshot || ["no-device", "feature-graphic"].includes(sl.layout)) return null;
    // Measured against the editor's export of its default layouts (iPhone 6.9"): phone ≈ 72% of the width,
    // bleeding off the bottom (hero, device-bottom) or the top (device-top).
    const ratio = FRAME_RATIO[d] || 0.49, w = Math.min(W * (deviceKind(d) === "tablet" ? 0.8 : 0.72), H * 0.9 * ratio), h = w / ratio;
    const x = (W - w) / 2;
    if (sl.layout === "device-top") return { x, y: H * 0.61 - h, width: w, height: h, zIndex: 3 };
    return { x, y: H * (sl.layout === "hero" ? 0.4 : 0.27), width: w, height: h, zIndex: 3 };
  };
  const dt = sl.transforms?.device || layoutDevice();
  if (dt && sl.screenshot) {
    const tablet = deviceKind(d) === "tablet";
    const bezel = dt.width * (tablet ? 0.022 : 0.03), r = dt.width * (tablet ? 0.05 : 0.13);
    const shadow = `0 ${px(unit * 0.003)} ${px(unit * 0.002)} rgba(0,0,0,.28), 0 ${px(unit * 0.02)} ${px(unit * 0.03)} rgba(0,0,0,.14)`;
    parts.push(`<div style="${box(dt, ` box-sizing: border-box; padding: ${px(bezel)}; border-radius: ${px(r)}; background: #16181B; box-shadow: ${shadow};`)}">` +
      `<img src="${ASSETS[pub(sl.screenshot)]}" alt="${esc(`Screen ${i + 1} capture`)}" style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: ${px(r - bezel)}">` +
      `</div>`);
    // magnifier
    const ct = sl.transforms?.callout;
    if (sl.callout && ct) {
      const [iw, ih] = pngSize(path.join(P, "public", pub(sl.screenshot)));
      const innerW = dt.width - 2 * bezel, D = innerW * sl.callout.zoom, Dh = D * ih / iw;
      const left = ct.width / 2 - sl.callout.focusX * D, top = ct.height / 2 - sl.callout.focusY * Dh;
      parts.push(`<div style="${box(ct, ` border-radius: ${sl.callout.shape === "rounded" ? px(ct.width * 0.12) : "50%"}; overflow: hidden; background: #FFFFFF; box-shadow: 0 0 0 ${px(unit * 0.006)} #FFFFFF, 0 ${px(unit * 0.012)} ${px(unit * 0.03)} rgba(0,0,0,.25);`)}">` +
        `<img src="${ASSETS[pub(sl.screenshot)]}" alt="" style="position: absolute; left: ${px(left)}; top: ${px(top)}; width: ${px(D)}; height: ${px(Dh)}; max-width: none"></div>`);
    }
  }

  // image elements: single-colour rects become editable blocks, other SVGs inline, rasters as uploads
  for (const im of sl.imageElements || []) {
    if (isRectSvg(im.src)) {
      const color = "#" + im.src.match(/rect-([0-9A-Fa-f]{6})-/)[1];
      const radius = (im.src.match(/-r(\d+)\.svg$/) || [])[1];
      parts.push(`<div aria-hidden="true" style="${box(im.transform, ` background: ${color};${radius ? ` border-radius: ${radius}px;` : ""}`)}"></div>`);
    } else if (isInlineSvg(im.src)) {
      parts.push(`<div style="${box(im.transform)}">${inlineSvg(im.src)}</div>`);
    } else {
      parts.push(`<img src="${ASSETS[pub(im.src)]}" alt="" style="${box(im.transform, ` object-fit: ${im.fit || "cover"};`)}">`);
    }
  }

  // built-in caption (approximate) when the deck uses it
  const label = text(sl.label).trim(), headline = text(sl.headline).trim();
  if (label || headline) {
    const align = state.scene?.captionAlign === "left" ? "left" : "center";
    const capTop = sl.layout === "device-top" ? H * 0.655 : H * 0.06;
    parts.push(`<div style="position: absolute; left: ${px(W * 0.08)}; top: ${px(capTop)}; width: ${px(W * 0.84)}; z-index: 4; text-align: ${align}; display: flex; flex-direction: column; gap: ${px(unit * 0.02)}">` +
      (label ? `<div style="font-size: ${px(unit * 0.028)}; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${inverted ? TH.accentAlt || TH.accent : TH.accent}">${esc(label)}</div>` : "") +
      (headline ? `<div style="font-size: ${px(unit * 0.09)}; font-weight: ${state.scene?.headlineWeight || 700}; line-height: 1.02; white-space: pre-line; color: ${fg}">${esc(headline)}</div>` : "") +
      `</div>`);
  }

  // text elements (exact): same box and padding as the editor
  for (const te of sl.textElements || []) {
    const t = te.transform, a = te.align || "center";
    parts.push(`<div style="${box(t, ` box-sizing: border-box; padding: ${px(pad)}; display: flex; align-items: center; justify-content: ${a === "left" ? "flex-start" : a === "right" ? "flex-end" : "center"};`)}">` +
      `<div style="width: 100%; font-size: ${px(te.fontSize ?? unit * 0.05)}; font-weight: ${te.fontWeight ?? 700}; line-height: 1.05; text-align: ${a}; white-space: pre-line; color: ${te.color || fg}">${esc(text(te.text))}</div></div>`);
  }

  // Scene pattern backdrops (grid, dots, lines) as a flat pattern layer, like the editor draws them.
  const bd = state.scene?.backdrop, line = inverted || /^#[0-3]/i.test(bg) ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const g = Math.round(unit * (bd === "dots" ? 0.055 : bd === "lines" ? 0.06 : 0.08)), lw = Math.max(1, Math.round(unit * 0.0016));
  const pattern = bd === "grid"
    ? `repeating-linear-gradient(90deg, ${line} 0px, ${line} ${lw}px, transparent ${lw}px, transparent ${g}px), repeating-linear-gradient(0deg, ${line} 0px, ${line} ${lw}px, transparent ${lw}px, transparent ${g}px)`
    : bd === "lines" ? `repeating-linear-gradient(180deg, transparent 0px, transparent ${g - lw}px, ${line} ${g - lw}px, ${line} ${g}px)`
    : bd === "dots" ? `radial-gradient(circle at ${g / 2}px ${g / 2}px, ${line} 0px, ${line} ${Math.max(1.5, unit * 0.0045)}px, transparent ${Math.max(1.5, unit * 0.0045) + 0.8}px) 0 0 / ${g}px ${g}px` : "";
  if (pattern) parts.unshift(`<div aria-hidden="true" style="position: absolute; inset: 0; z-index: 0; background: ${pattern};"></div>`);
  return wrap(`${DECK_NAME[d]} — ${String(i + 1).padStart(2, "0")}`, W, H, bg, fg, parts.join("\n"));
}

function featureGraphicHtml(sl, W, H) {
  const inverted = sl.inverted ?? true;
  const bg = sl.backgroundColor || (inverted ? TH.bgAlt : TH.bg), fg = inverted ? TH.fgAlt : TH.fg;
  const icon = state.appIcon && ASSETS[state.appIcon]
    ? `<img src="${ASSETS[state.appIcon]}" alt="App icon" style="width: ${px(W * 0.13)}; height: ${px(W * 0.13)}; border-radius: ${px(W * 0.022)}">`
    : `<div aria-hidden="true" style="width: ${px(W * 0.13)}; height: ${px(W * 0.13)}; box-sizing: border-box; border-radius: ${px(W * 0.022)}; border: 2px dashed ${fg}; opacity: 0.55; display: flex; align-items: center; justify-content: center; font-size: ${px(W * 0.016)}; font-weight: 700; letter-spacing: 0.08em">ICON</div>`;
  const body = `<div style="position: absolute; inset: 0; display: flex; align-items: center; gap: ${px(W * 0.03)}; padding: 0 ${px(W * 0.06)}">${icon}` +
    `<div><div style="font-size: ${px(W * 0.06)}; font-weight: 800; line-height: 1.05">${esc(state.appName || "App")}</div>` +
    `<div style="font-size: ${px(W * 0.028)}; line-height: 1.25; margin-top: ${px(W * 0.012)}; opacity: 0.85">${esc(text(sl.headline))}</div></div></div>`;
  return wrap(`${DECK_NAME["feature-graphic"]}`, W, H, bg, fg, body);
}

function wrap(title, W, H, bg, fg, inner) {
  return `<!doctype html>
<html lang="${esc(state.locale || "en")}">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
${googleFontsLink}
<style>
body{margin:0}
${fontFaces}
</style>
</helmet>
<div style="width: ${W}px; height: ${H}px; position: relative; overflow: hidden; background: ${bg}; color: ${fg}; font-family: ${fontStack.replace(/"/g, "'")}">
${inner}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${W},"height":${H}}}'>
class Component extends DCLogic {
renderVals() { return {}; }
}
</script>
</body>
</html>
`;
}

// ---------- write ----------
const out = path.join(path.resolve(root), "project");
fs.mkdirSync(out, { recursive: true });
const boards = {}, order = [], pages = [], notes = {};
let first = true, rowY = 0;
for (const d of used) {
  const [W, H] = CANVAS[d];
  pages.push({ id: d, name: DECK_NAME[d] });
  slidesOf(d).forEach((sl, i) => {
    const name = first ? "Main.dc.html" : `${d}-${String(i + 1).padStart(2, "0")}.dc.html`;
    first = false;
    const html = d === "feature-graphic" ? featureGraphicHtml(sl, W, H) : boardHtml(d, sl, i, W, H);
    fs.writeFileSync(path.join(out, name), html);
    boards[name] = { x: i * (W + 80), y: rowY, w: W, h: H, title: `${DECK_NAME[d]} · ${String(i + 1).padStart(2, "0")}`, page: d };
    order.push(name);
  });
  notes[`title-${d}`] = { x: 0, y: rowY - 300, text: DECK_NAME[d], kind: "title1", maxW: slidesOf(d).length * (W + 80) - 80, page: d };
}
const canvas = {
  v: 3, createdOnFiles: { v: 1, at: new Date().toISOString().replace(/\.\d+Z$/, "Z") },
  title: titleArg || `${state.appName || "App"} store screenshots`,
  launch: { view: "canvas", page: used[0] }, pages, boards, order, notes,
  designSystems: cd.designSystem ? [{ title: cd.title || cd.folder, namespace: dsFolder, artifact: cd.designSystem, version: null, copiedAt: new Date().toISOString().replace(/\.\d+Z$/, "Z") }] : [],
};
fs.writeFileSync(path.join(out, "canvas.json"), JSON.stringify(canvas, null, 2) + "\n");

// design-system copy entries for the Artifact call (the server copies them from the design system)
const dsFiles = {};
if (cd.designSystem) {
  dsFiles[`project/ds/${dsFolder}/tokens.json`] = { artifact: cd.designSystem, path: "project/tokens.json" };
  for (const f of cd.fonts || []) dsFiles[`project/ds/${dsFolder}/${f.path}`] = { artifact: cd.designSystem, path: `project/${f.path}` };
}
fs.writeFileSync(path.join(path.resolve(root), "ds-files.json"), JSON.stringify(dsFiles, null, 2) + "\n");
console.log(`canvas written: ${order.length} artboards on ${pages.length} pages → ${out}`);
console.log(`design-system copy entries: ${Object.keys(dsFiles).length} (in ${path.join(path.resolve(root), "ds-files.json")})`);
