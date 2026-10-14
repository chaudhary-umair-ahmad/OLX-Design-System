#!/usr/bin/env node
// Scaffold a company-store-screenshots editor for one product.
//
//   node .claude/skills/company-store-screenshots/scripts/scaffold.mjs <brand> <target-dir> \
//     [--category fintech] [--style swiss-grid-bold] [--style-mode brand-style|full] \
//     [--app-name "Name"] [--locales en,ar] [--force]
//
// <brand> is an id in brands/ (brands/<brand>.json) or a path to any profile JSON made from
// brands/_new-brand.json. Relative paths inside a profile resolve from the profile's own folder. The script:
//   1. validates the profile (a theme must have every colour, sourced; no placeholders left),
//   2. copies ../template/ into <target-dir> (refuses a non-empty dir unless --force, and the design-system repo it lives in),
//   3. injects the profile's theme into the copy's THEMES when it is not built in,
//   4. copies fonts: built-in brand stacks into public/fonts/brand/, or one imported font into public/fonts/imported/,
//   5. copies the icon, and seeds app-store-screenshots.json (theme, font, locales, app name, restrained scene,
//      and the category's starter labels from categories/<category>.json),
//   6. applies a style from styles/styles.json when --style is given: brand-style keeps the brand theme and
//      takes the style's scene (inverting slides for a dark style on a light brand); full uses the style's preset.
// It never installs packages or starts a server; SKILL.md does that, so the user sees each step.
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(SKILL, "../../..");
const CATEGORIES = ["classifieds", "motors", "jobs", "real-estate", "rentals", "e-commerce", "quick-commerce", "fintech", "saas"];
const THEME_KEYS = ["bg", "bgAlt", "fg", "fgAlt", "accent", "accentAlt", "muted"];

// Restrained deck scene: a flat designed surface, no accent-coloured blobs or glows
// (many brands reserve the accent for action). The user can change it in Scene.
// Layouts that need one capture and no second device, cycled so no two neighbours match.
const CLEAN_LAYOUTS = ["hero", "device-bottom", "device-top", "device-bottom", "hero", "device-top", "device-bottom", "device-top", "hero", "device-bottom"];

const BRAND_SCENE = {
  backdrop: "solid", span: false, decoration: "none", shadow: 30, glow: 0, tilt: 0,
  headlineWeight: 700, headlineScale: 1, headlineCase: "as-typed", captionAlign: "auto",
};

const fail = (msg) => { console.error(msg); process.exit(1); };
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const force = args.includes("--force") && args.splice(args.indexOf("--force"), 1);
const appNameArg = flag("--app-name");
const localesArg = flag("--locales");
const categoryArg = flag("--category");
const styleArg = flag("--style");
const styleModeArg = flag("--style-mode") || (styleArg ? "brand-style" : "brand");
const [brandArg, targetArg] = args;

const known = fs.readdirSync(path.join(SKILL, "brands")).filter((f) => f.endsWith(".json") && !f.startsWith("_")).map((f) => f.slice(0, -5));
if (!brandArg || !targetArg) {
  fail(`usage: scaffold.mjs <brand> <target-dir> [--category C] [--style SLUG] [--style-mode brand|brand-style|full] [--app-name NAME] [--locales en,ar] [--force]\n` +
    `brands: ${known.join(", ")}  (new product: copy brands/_new-brand.json)\ncategories: ${CATEGORIES.join(", ")}`);
}
const profilePath = /[\\/]|\.json$/.test(brandArg) ? path.resolve(brandArg) : path.join(SKILL, "brands", `${brandArg}.json`);
const PROFILE_DIR = path.dirname(profilePath);
if (!fs.existsSync(profilePath)) fail(`No profile ${profilePath}. Known: ${known.join(", ")}.\nCopy brands/_new-brand.json, fill it from the product's own source, then rerun.`);
const brand = JSON.parse(fs.readFileSync(profilePath, "utf8"));
const brandId = brand.id || path.basename(profilePath, ".json");

// ---- validate ----
const problems = [];
// The optional claudeDesign block is checked by to-claude-design.mjs, not here.
const raw = JSON.stringify({ ...brand, claudeDesign: undefined });
if (/<[^>]+>/.test(raw) || /#RRGGBB/.test(raw)) problems.push("profile still has <placeholders> or #RRGGBB");
if (!brand.source) problems.push("no `source` — every value must say where it came from");
if (!brand.theme?.builtIn) {
  for (const k of THEME_KEYS) if (!/^#[0-9a-f]{6}$/i.test(brand.theme?.[k] || "")) problems.push(`theme.${k} is not a #RRGGBB hex`);
  if (brand.theme?.sceneTint !== undefined && !/^#[0-9a-f]{6}$/i.test(brand.theme.sceneTint)) problems.push("theme.sceneTint is not a #RRGGBB hex");
}
const category = categoryArg || brand.categories?.[0];
if (!CATEGORIES.includes(category)) problems.push(`category "${category}" is not one of ${CATEGORIES.join(", ")}`);
const catalog = JSON.parse(fs.readFileSync(path.join(SKILL, "styles", "styles.json"), "utf8"));
const style = styleArg ? catalog.styles.find((s) => s.slug === styleArg) : null;
if (styleArg && !style) problems.push(`style "${styleArg}" is not in styles/styles.json (${catalog.styles.map((s) => s.slug).join(", ")})`);
if (!Object.hasOwn(catalog.modes, styleModeArg)) problems.push(`--style-mode must be one of ${Object.keys(catalog.modes).join(", ")}`);
if (styleModeArg !== "brand" && !styleArg) problems.push(`--style-mode ${styleModeArg} needs --style`);
if (!["light", "dark"].includes(brand.surface)) problems.push("`surface` must be light or dark");
if (problems.length) fail(`Can't scaffold ${brandId}:\n  - ${problems.join("\n  - ")}`);

// ---- target ----
const target = path.resolve(targetArg);
// A Next app inside the design-system repo would nest a second package.json and node_modules.
// Copy the exported PNGs back into the repo afterwards if they belong there.
// REPO is the project the skill is installed in (<repo>/.claude/skills/<skill>); only a real repo counts.
const IN_DESIGN_REPO = fs.existsSync(path.join(REPO, ".git")) && fs.existsSync(path.join(REPO, "package.json"));
if (IN_DESIGN_REPO && (target === REPO || target.startsWith(REPO + path.sep))) {
  fail(`Refusing to scaffold inside the repo this skill is installed in (${target}). Use a folder outside it, e.g. ~/store-screenshots/${brandId}.`);
}
if (fs.existsSync(target) && fs.readdirSync(target).length && !force) {
  fail(`${target} is not empty. Pass --force to copy over it (existing files with the same name are replaced).`);
}
fs.mkdirSync(target, { recursive: true });
// The repo keeps the editor as template/; packaged skills ship it as one template.tgz (uploads take at most 200 files).
if (fs.existsSync(path.join(SKILL, "template"))) fs.cpSync(path.join(SKILL, "template"), target, { recursive: true });
else if (fs.existsSync(path.join(SKILL, "template.tgz"))) untar(zlib.gunzipSync(fs.readFileSync(path.join(SKILL, "template.tgz"))), target);
else fail(`editor template missing: neither template/ nor template.tgz in ${SKILL}`);
// Minimal ustar reader (no dependencies: nothing is installed yet when the scaffold runs).
function untar(buf, dest) {
  const str = (o, n) => buf.toString("utf8", o, o + n).replace(/\0.*$/s, "");
  for (let o = 0; o + 512 <= buf.length; ) {
    const name = str(o, 100);
    if (!name) break;
    const size = parseInt(str(o + 124, 12).trim() || "0", 8), type = str(o + 156, 1) || "0", prefix = str(o + 345, 155);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (rel.split("/").includes("..") || path.isAbsolute(rel)) fail(`template.tgz: unsafe path ${rel}`);
    const out = path.join(dest, rel);
    if (type === "5") fs.mkdirSync(out, { recursive: true });
    else if (type === "0") { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, buf.subarray(o + 512, o + 512 + size)); if (/\.sh$/.test(rel)) fs.chmodSync(out, 0o755); }
    o += 512 + Math.ceil(size / 512) * 512;
  }
}
// Next.js dynamic-route folders ("[filename]") are stored as "__dyn_filename__": skill uploaders reject brackets in
// zip paths. Put the brackets back so the editor's routes work.
(function restoreDynamicRoutes(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name === "node_modules") continue;
    let name = e.name;
    const m = name.match(/^__dyn_(.+)__$/);
    if (m) {
      name = `[${m[1]}]`;
      const from = path.join(dir, e.name), to = path.join(dir, name);
      if (fs.existsSync(to)) { fs.cpSync(from, to, { recursive: true }); fs.rmSync(from, { recursive: true, force: true }); } // --force onto an old copy
      else fs.renameSync(from, to);
    }
    restoreDynamicRoutes(path.join(dir, name));
  }
})(path.join(target, "src"));
const report = [];
const resolveSrc = (p) => {
  if (path.isAbsolute(p)) return p;
  for (const base of [PROFILE_DIR, ...(IN_DESIGN_REPO ? [REPO] : []), process.cwd()]) {
    if (fs.existsSync(path.join(base, p))) return path.join(base, p);
  }
  return path.resolve(p);
};

// ---- theme ----
const themeId = brand.theme.id;
if (!brand.theme.builtIn) {
  const constants = path.join(target, "src", "lib", "constants.ts");
  const src = fs.readFileSync(constants, "utf8");
  const marker = "  // Named style presets. Flat palettes";
  if (!src.includes(marker)) fail("Template changed: THEMES marker not found in constants.ts (see SKILL.md, updating from upstream).");
  const entry = `  // ${brand.name}: from ${path.basename(profilePath)} — ${brand.source.replace(/\n/g, " ")}\n` +
    `  ${JSON.stringify(themeId)}: ${JSON.stringify({ id: themeId, name: brand.theme.name || brand.name, ...Object.fromEntries(THEME_KEYS.map((k) => [k, brand.theme[k]])), ...(brand.theme.sceneTint ? { sceneTint: brand.theme.sceneTint } : {}) })},\n`;
  fs.writeFileSync(constants, src.replace(marker, entry + marker));
  report.push(`theme: ${themeId} injected into src/lib/constants.ts`);
} else {
  report.push(`theme: ${themeId} (built in)`);
}

// ---- fonts ----
let fontId = brand.font?.id || "template-default";
let importedFont;
if (brand.font?.copyFrom) {
  const dest = path.join(target, "public", "fonts", "brand");
  fs.mkdirSync(dest, { recursive: true });
  const missing = brand.font.files.filter((file) => {
    const src = path.join(resolveSrc(brand.font.copyFrom), file);
    if (!fs.existsSync(src)) return true;
    fs.copyFileSync(src, path.join(dest, file));
    return false;
  });
  report.push(missing.length ? `fonts: MISSING ${missing.join(", ")} (falls back, not on brand)` : `fonts: ${brand.font.files.length} files copied`);
} else if (brand.font?.importFile) {
  const src = resolveSrc(brand.font.importFile);
  const ext = path.extname(src).slice(1).toLowerCase();
  const format = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype" }[ext];
  if (!fs.existsSync(src) || !format) {
    report.push(`fonts: MISSING ${brand.font.importFile}, import it from the toolbar (Font → Import font…) before designing`);
    fontId = "template-default";
  } else {
    const file = `brand${brandId.replace(/[^a-z0-9]/gi, "").toLowerCase()}.${ext}`;
    fs.copyFileSync(src, path.join(target, "public", "fonts", "imported", file));
    importedFont = { src: `/fonts/imported/${file}`, format, name: brand.font.name || brand.name };
    fontId = "self-hosted";
    report.push(`fonts: ${path.basename(src)} imported as ${importedFont.name}`);
  }
} else if (brand.font?.supply) {
  report.push(`fonts: put ${brand.font.supply.join(", ")} in public/fonts/brand/ (licensed, not in the repo)`);
}

// ---- icon ----
let appIcon = "";
if (brand.icon) {
  const src = resolveSrc(brand.icon);
  if (fs.existsSync(src)) {
    const name = `app-icon${path.extname(src)}`;
    fs.copyFileSync(src, path.join(target, "public", name));
    appIcon = `/${name}`;
    report.push(`icon: ${brand.icon} → public/${name}${path.extname(src) === ".png" ? "" : " (placeholder; use the store icon PNG)"}`);
  } else report.push(`icon: MISSING ${brand.icon}`);
} else {
  report.push("icon: none, ask for the 1024×1024 store icon PNG");
}

// ---- project state ----
const projectFile = path.join(target, "app-store-screenshots.json");
const state = JSON.parse(fs.readFileSync(projectFile, "utf8"));
const locales = localesArg ? localesArg.split(",").map((l) => l.trim()).filter(Boolean) : brand.locales;
const playbook = JSON.parse(fs.readFileSync(path.join(SKILL, "categories", `${category}.json`), "utf8"));
// Starter labels only: real headlines come from the copy pass (Step 3), never from this file.
for (const slides of Object.values(state.slidesByDevice || {})) {
  if (!Array.isArray(slides)) continue;
  slides.forEach((slide, i) => {
    const slot = playbook.arc[Math.min(i, playbook.arc.length - 1)];
    slide.label = { [locales[0]]: slot.label };
    slide.headline = { [locales[0]]: slot.placeholder };
    // The template's sample deck places phones across screen seams and tilts some: fine for its demo, messy
    // with real copy. Start every screen from the layout's own clean composition instead.
    delete slide.transforms;
    delete slide.screenshotSecondary;
    delete slide.inverted;
    if (slide.layout !== "feature-graphic" && slide.layout !== "split-landscape") {
      slide.layout = CLEAN_LAYOUTS[i % CLEAN_LAYOUTS.length];
    }
  });
}
// Cross-screen moments are opt-in (SKILL.md Step 5): a new deck starts with every screen standalone.
state.connectedCanvas = false;
if (brand.accentAsDecoration === false && !brand.theme.builtIn && !brand.theme.sceneTint) {
  report.push("WARNING: accentAsDecoration is false but theme.sceneTint is unset — backdrops and glow will use the accent");
}
// ---- style ----
// Light/dark rhythm: a style can ask for alternating surfaces (styles.json "invert": "alternate").
const applyRhythm = (pattern) => {
  for (const [dev, slides] of Object.entries(state.slidesByDevice || {})) {
    if (!Array.isArray(slides) || dev === "feature-graphic") continue;
    slides.forEach((slide, i) => { slide.inverted = pattern(i); });
  }
};
let scene = { ...BRAND_SCENE, headlineWeight: brand.headlineWeight || 700 };
let deckTheme = themeId;
if (style && styleModeArg !== "brand") {
  scene = { ...style.scene };
  if (styleModeArg === "brand-style") {
    // The style's weight, capped at the heaviest weight the brand allows for its face.
    scene.headlineWeight = Math.min(style.scene.headlineWeight, brand.maxHeadlineWeight || 900);
    // Glow is accent-coloured light: off for brands whose accent is never decoration.
    if (brand.accentAsDecoration === false) scene.glow = 0;
    if (style.dark && brand.surface === "light") applyRhythm((i) => i % 3 !== 2);
    else if (style.invert === "alternate") applyRhythm((i) => i % 2 === 1);
  } else {
    deckTheme = style.slug; // the editor ships a preset per style with the slug as id
    report.push(`full style: import the style's headline font from styles/${style.file} (Typography) with Font → Import font…; flag the deck off-brand`);
  }
  report.push(`style: ${style.name} (${styleModeArg}) — read styles/_QUALITY_BAR.md and styles/${style.file}` +
    (style.brandFit === "artwork" ? `; NEEDS SUPPLIED ARTWORK: ${style.artworkNeeded}` : ""));
}
Object.assign(state, {
  appName: appNameArg || brand.appName,
  themeId: deckTheme,
  fontId,
  locales,
  locale: locales[0],
  appIcon,
  scene,
});
if (importedFont) state.importedFont = importedFont;
fs.writeFileSync(projectFile, JSON.stringify(state, null, 2) + "\n");

console.log(`Scaffolded ${brand.name} (${category}) → ${target}`);
for (const line of report) console.log(`  ${line}`);
console.log(`  project: theme ${deckTheme}, font ${fontId}, locales ${locales.join(", ")}, starter arc from categories/${category}.json`);
console.log("Next: install (bun/pnpm/yarn/npm), drop captures into public/screenshots/, start the dev server.");
