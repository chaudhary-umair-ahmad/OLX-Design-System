#!/usr/bin/env node
// Package a finished deck into ONE hand-off folder for the people who upload it (release manager, devs, CI):
//
//   node package-handoff.mjs <project-dir> --out <folder> [--exports <dir-of-bundle-zips> | --url http://localhost:3000]
//        [--release "2026-10 release"] [--canvas <Claude Design url>] [--copy copy.json] [--qa qa.md]
//        [--claims claims.md] [--decks iphone,android,feature-graphic] [--locale-map ios:en=en-GB,android:ar=ar] [--zip]
//
// Where the PNGs come from (pick one):
//   --exports  a folder holding the editor's "Export bundle" zips (or their unzipped folders), one per device
//   --url      the editor running locally: the script opens it and presses Export bundle for every deck in the project
//
// What it writes (<out>/):
//   store/<platform>/<device>/<WxH>/<locale>/NN.png   every exported size and language, as exported
//   fastlane/screenshots/<ios-locale>/…               App Store images laid out for fastlane deliver
//   fastlane/metadata/android/<locale>/images/…       Play images laid out for fastlane supply (phone, 7", 10", feature graphic)
//   manifest.json                                     every file: deck, screen, size, locale, the words on it, its capture
//   strings/<locale>.json + strings.csv               the copy per screen, for translators and reviewers
//   project/app-store-screenshots.json (+ copy.json)  the editable source
//   README.md                                         upload checklist, readiness, checks, sources, open gaps
//   (+ <out>.zip with --zip)
//
// It never uploads anything. Locales that only fall back to the default language are left out of store/ and fastlane/
// (an Arabic folder with English words must not be uploaded) and listed in the README.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args.splice(i, 2)[1]; };
const bool = (n) => { const i = args.indexOf(n); if (i === -1) return false; args.splice(i, 1); return true; };
const outArg = flag("--out"), exportsArg = flag("--exports"), urlArg = flag("--url"), release = flag("--release", "");
const canvas = flag("--canvas", ""), copyArg = flag("--copy"), qaArg = flag("--qa"), claimsArg = flag("--claims");
const localeMapArg = flag("--locale-map", ""), wantZip = bool("--zip"), decksArg = flag("--decks", "");
const P = path.resolve(args[0] || ".");
const fail = (m) => { console.error(m); process.exit(1); };
if (!outArg || (!exportsArg && !urlArg)) fail("usage: package-handoff.mjs <project-dir> --out <folder> (--exports <dir> | --url <editor url>) [--release …] [--canvas …] [--copy …] [--qa …] [--claims …] [--zip]");
const projectFile = path.join(P, "app-store-screenshots.json");
if (!fs.existsSync(projectFile)) fail(`not a company-store-screenshots project (no app-store-screenshots.json): ${P}`);
const req = createRequire(path.join(P, "package.json"));
const JSZip = req("jszip");
const state = JSON.parse(fs.readFileSync(projectFile, "utf8"));
const OUT = path.resolve(outArg);
const defaultLocale = state.locale || "en";

// Decks to hand over: --decks, else every deck the designer worked on. The editor keeps starter slides for every device;
// a deck whose slides still carry the starter text ("[Write the headline]") was never designed and is skipped.
// The editor also seeds starter decks for other devices (Watch, TV, Mac, …) from src/lib/defaults.ts: a deck whose
// every slide is bare (no text or image elements) with a starter headline is untouched too.
const STARTER = /\[Write the headline\]/;
const starterHeadlines = new Set();
try {
  const src = fs.readFileSync(path.join(P, "src/lib/defaults.ts"), "utf8");
  for (const m of src.matchAll(/headline:\s*en\(("(?:[^"\\]|\\.)*")\)/g)) starterHeadlines.add(JSON.parse(m[1]));
} catch { /* older template: fall back to the starter text alone */ }
const isStarter = (sl) => {
  const words = [sl.headline, sl.label, ...(sl.textElements || []).map((t) => t.text)];
  if (words.some((o) => o && typeof o === "object" && Object.values(o).some((v) => typeof v === "string" && STARTER.test(v)))) return true;
  const hl = sl.headline && typeof sl.headline === "object" ? sl.headline[defaultLocale] : undefined;
  return !(sl.textElements || []).length && !(sl.imageElements || []).length && typeof hl === "string" && starterHeadlines.has(hl);
};
const worked = (slides) => slides?.length && !slides.every(isStarter);
const allDecks = Object.entries(state.slidesByDevice || {}).filter(([, s]) => s && s.length).map(([k]) => k);
const chosenDecks = decksArg ? decksArg.split(",").map((d) => d.trim()).filter(Boolean) : allDecks.filter((k) => worked(state.slidesByDevice[k]));
const skippedDecks = allDecks.filter((k) => !chosenDecks.includes(k));
for (const d of chosenDecks) if (!allDecks.includes(d)) fail(`--decks: "${d}" is not a deck in this project (${allDecks.join(", ")})`);
if (!chosenDecks.length) fail("no designed decks found (every deck still has starter text); name them with --decks iphone,android,…");

// ---------- 1. get the bundle zips ----------
async function exportFromEditor(url, dir) {
  const { chromium } = req("playwright");
  const exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
  const decks = chosenDecks;
  const original = fs.readFileSync(projectFile, "utf8");
  const b = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined });
  try {
    for (const device of decks) {
      // open the editor on this deck: the editor starts on the project's saved device
      const s = JSON.parse(fs.readFileSync(projectFile, "utf8")); s.device = device;
      fs.writeFileSync(projectFile, JSON.stringify(s, null, 2) + "\n");
      const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, acceptDownloads: true });
      await p.goto(url); await p.waitForTimeout(5000);
      const [dl] = await Promise.all([p.waitForEvent("download", { timeout: 900000 }), p.getByRole("button", { name: /Export bundle/ }).click()]);
      await dl.saveAs(path.join(dir, `${device}.zip`));
      console.log(`exported ${device}`);
      await p.close();
    }
  } finally {
    await b.close();
    fs.writeFileSync(projectFile, original); // put the project back as the designer left it
  }
}

const files = []; // { platform, device, w, h, locale, name, bytes }
async function readBundles(dir) {
  const add = (rel, bytes) => {
    const m = rel.replace(/\\/g, "/").match(/(?:^|\/)([^/]+)\/([^/]+)\/(\d+)x(\d+)\/([^/]+)\/([^/]+\.png)$/i);
    if (m) files.push({ platform: m[1], device: m[2], w: +m[3], h: +m[4], locale: m[5], name: m[6], bytes });
  };
  const walk = async (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) await walk(f);
      else if (e.name.toLowerCase().endsWith(".zip")) {
        const z = await JSZip.loadAsync(fs.readFileSync(f));
        for (const [rel, entry] of Object.entries(z.files)) if (!entry.dir) add(rel, await entry.async("nodebuffer"));
      } else if (e.name.toLowerCase().endsWith(".png")) add(path.relative(dir, f), fs.readFileSync(f));
    }
  };
  await walk(dir);
}

let exportDir = exportsArg && path.resolve(exportsArg);
if (urlArg) {
  exportDir = path.join(OUT + ".exports");
  fs.rmSync(exportDir, { recursive: true, force: true }); fs.mkdirSync(exportDir, { recursive: true });
  await exportFromEditor(urlArg, exportDir);
}
if (!fs.existsSync(exportDir)) fail(`exports folder not found: ${exportDir}`);
await readBundles(exportDir);
if (urlArg) fs.rmSync(exportDir, { recursive: true, force: true }); // the downloads were temporary; the PNGs are read
if (!files.length) fail(`no exported PNGs found in ${exportDir} (expected Export bundle zips: <platform>/<device>/<WxH>/<locale>/NN-*.png)`);
// only the chosen decks (a stray zip of another deck in the folder is ignored and reported)
{
  const stray = [...new Set(files.filter((f) => !chosenDecks.includes(f.device)).map((f) => f.device))];
  if (stray.length) console.log(`  ignoring exports of decks not handed over: ${stray.join(", ")} (add them with --decks)`);
  const keep = files.filter((f) => chosenDecks.includes(f.device)); files.length = 0; files.push(...keep);
  if (!files.length) fail(`none of the exported PNGs belong to the decks handed over (${chosenDecks.join(", ")})`);
}
// a device exported twice (two zips): keep the newest copy of each path
{
  const seen = new Map();
  for (const f of files) seen.set(`${f.platform}/${f.device}/${f.w}x${f.h}/${f.locale}/${f.name}`, f);
  files.length = 0; files.push(...seen.values());
}

// ---------- 2. what each screen says (from the project) ----------
const pick = (obj, loc) => (obj && typeof obj === "object" ? obj[loc] : undefined);
function screenWords(slide, loc) {
  const out = [];
  const hl = pick(slide.headline, loc), lb = pick(slide.label, loc);
  if (lb && lb.trim()) out.push(lb.trim());
  if (hl && hl.trim()) out.push(hl.trim());
  const els = [...(slide.textElements || [])].sort((a, b) => (a.transform?.y ?? 0) - (b.transform?.y ?? 0) || (a.transform?.x ?? 0) - (b.transform?.x ?? 0));
  for (const t of els) { const v = pick(t.text, loc); if (v && v.trim()) out.push(v.trim()); }
  return out;
}
// a locale "falls back" on a slide when the default language has words the locale does not
function fallsBack(slide, loc) {
  if (loc === defaultLocale) return false;
  const has = (o) => o && typeof o === "object" && typeof o[defaultLocale] === "string" && o[defaultLocale].trim() && o[defaultLocale].trim() !== " ";
  const missing = (o) => has(o) && !(typeof o[loc] === "string" && o[loc].trim());
  if (missing(slide.headline) || missing(slide.label)) return true;
  return (slide.textElements || []).some((t) => missing(t.text));
}
const DRAFT = /\b(DRAFT|PLACEHOLDER|NOT FOR UPLOAD)\b/i;
const PLACEHOLDER = /\[[^\]]{2,}\]/;

// ---------- 3. checks ----------
const pngSize = (buf) => (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG" ? { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) } : null);
const blockers = [], warnings = [];
const decks = [...new Set(files.map((f) => `${f.platform}/${f.device}`))].sort();
const locales = [...new Set(files.map((f) => f.locale))].sort();
const fallbackLocales = new Set();
for (const f of files) {
  const s = pngSize(f.bytes);
  if (!s) blockers.push(`not a PNG: ${f.platform}/${f.device}/${f.w}x${f.h}/${f.locale}/${f.name}`);
  else if (s.w !== f.w || s.h !== f.h) blockers.push(`wrong pixel size ${s.w}×${s.h} in the ${f.w}x${f.h} folder: ${f.device}/${f.locale}/${f.name}`);
  const slides = state.slidesByDevice?.[f.device] || [];
  const idx = parseInt(f.name, 10) - 1;
  f.slide = slides[idx];
  if (f.slide && fallsBack(f.slide, f.locale)) { f.fallback = true; fallbackLocales.add(`${f.device}:${f.locale}`); }
}
for (const deck of decks) {
  const [platform, device] = deck.split("/");
  const ofDeck = files.filter((f) => f.device === device);
  const sizes = [...new Set(ofDeck.map((f) => `${f.w}x${f.h}`))];
  for (const loc of locales) for (const sz of sizes) {
    const n = ofDeck.filter((f) => f.locale === loc && `${f.w}x${f.h}` === sz).length;
    if (!n) continue;
    const expected = (state.slidesByDevice?.[device] || []).length;
    if (expected && n !== expected) warnings.push(`${device} ${sz} ${loc}: ${n} images, the project has ${expected} screens (re-export the bundle)`);
    if (platform === "ios" && n > 10) blockers.push(`${device} ${sz} ${loc}: ${n} images; the App Store takes at most 10`);
    if (device.startsWith("android") && n > 8) blockers.push(`${device} ${sz} ${loc}: ${n} images; Google Play takes at most 8`);
    if (device.startsWith("android") && n < 2) blockers.push(`${device} ${sz} ${loc}: Google Play needs at least 2 screenshots`);
  }
  if (device === "feature-graphic" && ofDeck.some((f) => f.w !== 1024 || f.h !== 500)) blockers.push("feature graphic must be exactly 1024×500");
}
const allWords = [];
const exportedDevices = new Set(files.map((f) => f.device));
for (const [device, slides] of Object.entries(state.slidesByDevice || {})) {
  if (!exportedDevices.has(device)) continue; // only what is being handed over
  (slides || []).forEach((sl, i) => { for (const w of screenWords(sl, defaultLocale)) allWords.push({ device, n: i + 1, w }); });
}
const drafts = allWords.filter((x) => DRAFT.test(x.w)), holes = allWords.filter((x) => PLACEHOLDER.test(x.w));
if (drafts.length) blockers.push(`draft flags still on ${new Set(drafts.map((d) => `${d.device} ${d.n}`)).size} screens ("${drafts[0].w}")`);
if (holes.length) blockers.push(`${holes.length} unfilled [PLACEHOLDERS], e.g. ${[...new Set(holes.map((h) => h.w.match(PLACEHOLDER)[0]))].slice(0, 6).join(", ")}`);
if (fallbackLocales.size) warnings.push(`left out because their words fall back to "${defaultLocale}": ${[...new Set([...fallbackLocales].map((s) => s.split(":")[1]))].join(", ")} (${[...fallbackLocales].join(", ")})`);
if (skippedDecks.length) warnings.push(`not handed over (starter slides, never designed): ${skippedDecks.join(", ")}`);
for (const d of chosenDecks) if (!files.some((f) => f.device === d)) blockers.push(`no exported images for the ${d} deck (export its bundle, or leave it out with --decks)`);
if (!state.appIcon) warnings.push("no store icon set in the project (upload the 1024×1024 icon separately in each console)");

// ---------- 4. write the folder ----------
fs.rmSync(OUT, { recursive: true, force: true });
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); return rel; };
const IOS_LOCALE = { en: "en-US", ar: "ar-SA", fr: "fr-FR", de: "de-DE", es: "es-ES", it: "it", pt: "pt-BR", tr: "tr", ru: "ru", zh: "zh-Hans", ja: "ja", ko: "ko", hi: "hi", id: "id", ms: "ms", nl: "nl-NL", pl: "pl", th: "th", vi: "vi", he: "he", uk: "uk" };
const PLAY_LOCALE = { en: "en-US", ar: "ar", fr: "fr-FR", de: "de-DE", es: "es-ES", it: "it-IT", pt: "pt-BR", tr: "tr-TR", ru: "ru-RU", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", hi: "hi-IN", id: "id", ms: "ms", nl: "nl-NL", pl: "pl-PL", th: "th", vi: "vi", he: "iw-IL", uk: "uk", ur: "ur" };
for (const part of localeMapArg.split(",").filter(Boolean)) {
  const m = part.match(/^(ios|android):([^=]+)=(.+)$/);
  if (!m) fail(`--locale-map entry "${part}" must look like ios:en=en-GB or android:ar=ar`);
  (m[1] === "ios" ? IOS_LOCALE : PLAY_LOCALE)[m[2]] = m[3];
}
const PLAY_DIR = { android: "phoneScreenshots", "android-7": "sevenInchScreenshots", "android-10": "tenInchScreenshots" };
const manifest = { app: state.appName || "", release, generated: new Date().toISOString(), defaultLocale, canvas: canvas || null, ready: false, decks: [], files: [] };
const noFastlane = new Set();
for (const f of files.sort((a, b) => `${a.device}${a.w}${a.locale}${a.name}`.localeCompare(`${b.device}${b.w}${b.locale}${b.name}`))) {
  const nn = String(parseInt(f.name, 10)).padStart(2, "0");
  const entry = { deck: f.device, platform: f.platform, screen: +nn, size: `${f.w}x${f.h}`, locale: f.locale, fallback: !!f.fallback,
    words: f.slide ? screenWords(f.slide, f.locale).filter((w) => w !== " ") : [], capture: f.slide?.screenshot || null };
  if (f.fallback) { manifest.files.push({ ...entry, store: null, fastlane: null }); continue; }
  entry.store = write(`store/${f.platform}/${f.device}/${f.w}x${f.h}/${f.locale}/${nn}.png`, f.bytes);
  entry.fastlane = null;
  if (f.platform === "ios") {
    const loc = IOS_LOCALE[f.locale];
    if (loc) entry.fastlane = write(`fastlane/screenshots/${loc}/${f.device}_${f.w}x${f.h}_${nn}.png`, f.bytes);
    else noFastlane.add(`ios:${f.locale}`);
  } else if (f.platform === "android") {
    const loc = PLAY_LOCALE[f.locale];
    if (!loc) noFastlane.add(`android:${f.locale}`);
    else if (f.device === "feature-graphic") { if (+nn === 1) entry.fastlane = write(`fastlane/metadata/android/${loc}/images/featureGraphic.png`, f.bytes); }
    else if (PLAY_DIR[f.device]) entry.fastlane = write(`fastlane/metadata/android/${loc}/images/${PLAY_DIR[f.device]}/${nn}_${loc}.png`, f.bytes);
  }
  manifest.files.push(entry);
}
if (noFastlane.size) warnings.push(`no fastlane locale code for ${[...noFastlane].join(", ")}: add one with --locale-map (images are still in store/)`);
for (const deck of decks) {
  const [platform, device] = deck.split("/");
  const ofDeck = manifest.files.filter((f) => f.deck === device);
  manifest.decks.push({ deck: device, platform, sizes: [...new Set(ofDeck.map((f) => f.size))], locales: [...new Set(ofDeck.filter((f) => !f.fallback).map((f) => f.locale))], screens: (state.slidesByDevice?.[device] || []).length });
}
manifest.ready = blockers.length === 0;
manifest.blockers = blockers; manifest.warnings = warnings;
write("manifest.json", JSON.stringify(manifest, null, 2) + "\n");

// strings for translators and reviewers
const strLocales = [...new Set([defaultLocale, ...(state.locales || []), ...locales])];
const csv = [["deck", "screen", ...strLocales].join(",")];
for (const loc of strLocales) {
  const s = {};
  for (const [device, slides] of Object.entries(state.slidesByDevice || {})) {
    if (!slides?.length || !exportedDevices.has(device)) continue;
    s[device] = Object.fromEntries(slides.map((sl, i) => [String(i + 1).padStart(2, "0"), screenWords(sl, loc).filter((w) => w !== " " && !DRAFT.test(w))]));
  }
  write(`strings/${loc}.json`, JSON.stringify(s, null, 2) + "\n");
}
const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
for (const [device, slides] of Object.entries(state.slidesByDevice || {})) {
  if (!exportedDevices.has(device)) continue;
  (slides || []).forEach((sl, i) => {
    const per = strLocales.map((loc) => screenWords(sl, loc).filter((w) => w !== " " && !DRAFT.test(w)));
    const rows = Math.max(...per.map((p) => p.length), 0);
    for (let r = 0; r < rows; r++) csv.push([device, i + 1, ...per.map((p) => q(p[r] ?? ""))].join(","));
  });
}
write("strings.csv", csv.join("\n") + "\n");

// source and paperwork
write("project/app-store-screenshots.json", fs.readFileSync(projectFile));
if (copyArg) write(`project/${path.basename(copyArg)}`, fs.readFileSync(path.resolve(copyArg)));
if (qaArg) write("QA.md", fs.readFileSync(path.resolve(qaArg)));
if (claimsArg) write("CLAIMS.md", fs.readFileSync(path.resolve(claimsArg)));

// ---------- 5. README ----------
const deckRows = manifest.decks.map((d) => `| ${d.platform === "ios" ? "App Store" : "Google Play"} | ${d.deck} | ${d.sizes.join(", ")} | ${d.locales.join(", ") || "—"} | ${d.screens} |`).join("\n");
const readme = `# ${state.appName || "App"} — store screenshots${release ? ` · ${release}` : ""}

**Status: ${manifest.ready ? "READY TO UPLOAD" : "NOT READY — see Blockers"}** · generated ${manifest.generated.slice(0, 10)}
${canvas ? `\nDesign source (Claude Design canvas, private until shared): ${canvas}\n` : ""}
Nothing here has been uploaded. Upload from \`store/\` by hand, or with fastlane from \`fastlane/\`.

## What's inside

| Store | Deck | Sizes (px) | Languages | Screens |
|---|---|---|---|---|
${deckRows}

| Path | What |
|---|---|
| \`store/<platform>/<device>/<WxH>/<locale>/NN.png\` | every image, numbered in upload order |
| \`fastlane/screenshots/<locale>/\` | App Store images for \`fastlane deliver\` (it reads the device from the pixel size) |
| \`fastlane/metadata/android/<locale>/images/\` | Play images for \`fastlane supply\`: \`phoneScreenshots\`, \`sevenInchScreenshots\`, \`tenInchScreenshots\`, \`featureGraphic.png\` |
| \`manifest.json\` | every file with its deck, screen, size, language, the words on it and the capture it shows |
| \`strings/<locale>.json\`, \`strings.csv\` | the copy per screen, for translators and reviewers |
| \`project/\` | the editable project file${copyArg ? " and the copy file" : ""} (open it in the company-store-screenshots editor) |
${qaArg ? "| `QA.md` | the design QA report |\n" : ""}${claimsArg ? "| `CLAIMS.md` | every claim with its source and date |\n" : ""}
## Blockers
${blockers.length ? blockers.map((b) => `- ${b}`).join("\n") : "- none"}

## Warnings
${warnings.length ? warnings.map((w) => `- ${w}`).join("\n") : "- none"}

## Upload checklist

**App Store Connect** (App → version → Previews and Screenshots, per language)
- [ ] iPhone 6.9" set uploaded (smaller iPhone sizes are optional: Apple scales the 6.9" set down)
- [ ] iPad 13" set uploaded, if the app runs on iPad
- [ ] Order matches the file numbers (01 first: most people only see the first three)
- [ ] Every language in the table has its own images; none falls back to another language
- [ ] Or: \`fastlane deliver --skip_metadata --skip_binary_upload --screenshots_path fastlane/screenshots\` (add \`--overwrite_screenshots\` to replace the live set)

**Google Play Console** (Grow → Store presence → Main store listing, per language)
- [ ] Phone screenshots (2–8), in file order
- [ ] 7" and 10" tablet screenshots, if exported
- [ ] Feature graphic 1024×500
- [ ] Or: \`fastlane supply --skip_upload_apk --skip_upload_aab --skip_upload_metadata --skip_upload_changelogs --metadata_path fastlane/metadata/android\`

**Before either**
- [ ] Blockers above are empty (draft flags, [PLACEHOLDERS], wrong sizes)
- [ ] Claims on the images have a source and a date${claimsArg ? " (CLAIMS.md)" : ""}
- [ ] Regulated text (licence lines, disclaimers) came from legal
- [ ] Store icon (1024×1024) uploaded separately
`;
write("README.md", readme);

if (wantZip) {
  const z = new JSZip();
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else z.file(path.join(path.basename(OUT), path.relative(OUT, f)).split(path.sep).join("/"), fs.readFileSync(f)); } };
  walk(OUT);
  fs.writeFileSync(OUT + ".zip", await z.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}
const stored = manifest.files.filter((f) => f.store).length, fl = manifest.files.filter((f) => f.fastlane).length;
console.log(`hand-off: ${OUT}${wantZip ? ` (+ ${path.basename(OUT)}.zip)` : ""}`);
console.log(`  ${stored} images in store/, ${fl} in fastlane/, ${decks.length} decks, languages ${[...new Set(manifest.files.filter((f) => f.store).map((f) => f.locale))].join(", ")}`);
console.log(`  ${manifest.ready ? "READY TO UPLOAD" : `NOT READY: ${blockers.length} blocker(s)`}${warnings.length ? ` · ${warnings.length} warning(s)` : ""}`);
for (const b of blockers) console.log(`  BLOCKER ${b}`);
for (const w of warnings) console.log(`  warning ${w}`);
