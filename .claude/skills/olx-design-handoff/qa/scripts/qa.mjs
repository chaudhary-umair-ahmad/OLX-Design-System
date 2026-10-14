// OLX design QA: test authored screens (and, capped, live captures) against a case matrix
// and write report.json + report.html. A gate, not a fixer: blockers stop the hand-off.
//
// Run from the repo root (it needs handoff/, css/tokens.css and node_modules/playwright):
//   node .claude/skills/olx-design-handoff/qa/scripts/qa.mjs --scope <feature|screen-id|all> [--matrix] [--checks cov,tok,…]
//   npm run qa -- --scope favourites
//
// Inputs:  handoff/registry.json (screens + features), the screen HTML files, css/tokens.css,
//          handoff/<feature>/flows.json and tracking.json when registered,
//          handoff/analytics/event-catalog.json, handoff/qa/waivers.json (optional).
// Output:  handoff/<feature>/qa/report.json and report.html (or handoff/qa/report/ for other scopes).
//
// Severity: blocker | warning | note. Screens with origin "live" (frozen captures) are capped at
// note: production's own values can't be "fixed", and flagging them would make every run red.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ROOT = process.cwd();
const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : dflt; };
const SCOPE = opt('scope', null);
const ONLY = opt('checks', null) ? String(opt('checks')).split(',') : null;
const MATRIX_ONLY = !!opt('matrix', false);
const NO_RENDER = !!opt('no-render', false);
const want = (group) => !ONLY || ONLY.includes(group);
if (!SCOPE) { console.error('usage: qa.mjs --scope <feature|screen-id|all> [--matrix] [--checks cov,tok,cpy,fnt,flw,par,a11y,ovf,trk] [--no-render]'); process.exit(2); }

const json = async (f, dflt) => { try { return JSON.parse(await readFile(f, 'utf8')); } catch (e) { if (dflt !== undefined) return dflt; throw new Error(`${f}: ${e.message}`); } };
if (!existsSync('handoff/registry.json') || !existsSync('css/tokens.css')) { console.error('Run from the repo root: handoff/registry.json and css/tokens.css are needed.'); process.exit(2); }

const registry = await json('handoff/registry.json');
const platforms = await json(join(SKILL, 'qa/schema/platforms.json'));
const waivers = await json('handoff/qa/waivers.json', { waivers: [] });
const catalog = await json('handoff/analytics/event-catalog.json', { events: [], shared_params: [] });
const tokensCss = await readFile('css/tokens.css', 'utf8');
const definedVars = new Set([...tokensCss.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));

// ---------- scope ----------
const features = registry.features ?? {};
let screens = registry.screens ?? [];
let feature = null;
if (SCOPE === 'all') { /* every authored screen */ }
else if (features[SCOPE]) { feature = SCOPE; screens = screens.filter((s) => s.feature === SCOPE); }
else if (screens.some((s) => s.id === SCOPE)) { screens = screens.filter((s) => s.id === SCOPE); feature = screens[0].feature ?? null; }
else if (/~(desktop|mobile)$/.test(SCOPE)) {
  // a live capture: site/pages/<id>/<viewport>.html, checked with findings capped at note
  const [id, vp] = SCOPE.split('~');
  screens = [{ id: SCOPE, origin: 'live', platform: vp === 'mobile' ? 'web-mobile' : 'web-desktop', file: `site/pages/${id}/${vp}.html`, states: ['default'], no_list: true }];
} else { console.error(`Unknown scope "${SCOPE}": not a feature, a registered screen id or a live capture id (<page>~desktop).`); process.exit(2); }
if (!screens.length) { console.error(`No screens registered for "${SCOPE}" in handoff/registry.json.`); process.exit(2); }

const outDir = feature ? `handoff/${feature}/qa` : 'handoff/qa/report';
const groups = ['cov', 'tok', 'fnt', 'cpy', 'flw', 'par', 'a11y', 'ovf', 'trk'].filter(want);

// ---------- matrix ----------
const matrix = screens.flatMap((s) => (s.states?.length ? s.states : ['default']).flatMap((state) =>
  (platforms[s.platform]?.widths ?? [s.platform === 'web-mobile' ? 390 : 1440]).map((width) => ({ screen: s.id, platform: s.platform, state, width }))));
console.log(`Scope ${SCOPE}: ${screens.length} screen(s), ${matrix.length} cases (screen × state × width), checks: ${groups.join(', ')}`);
for (const s of screens) console.log(`  ${s.id}  [${s.platform}, ${s.origin ?? 'authored'}]  states: ${(s.states ?? ['default']).join(', ')}  file: ${s.file}`);
if (MATRIX_ONLY) process.exit(0);

// ---------- findings ----------
const findings = [];
function add(check, severity, screen, message, extra = {}) {
  const s = screens.find((x) => x.id === screen);
  let sev = severity;
  const f = { check, severity: sev, screen: screen ?? null, message, ...extra };
  if (s?.origin === 'live' && sev !== 'note') { f.capped_from = sev; f.severity = 'note'; }
  const w = (waivers.waivers ?? []).find((x) => x.check === check && (!x.screen || x.screen === screen) && (!x.expires || x.expires >= new Date().toISOString().slice(0, 10)));
  if (w) { f.waived = { reason: w.reason, owner: w.owner, expires: w.expires ?? null }; }
  findings.push(f);
}
const visibleText = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const strings = (html) => new Set(html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').split(/<[^>]+>/).map((t) => t.replace(/\s+/g, ' ').trim()).filter((t) => t.length > 1 && !/^[\d\s.,:/-]+$/.test(t)));
const html = {};
for (const s of screens) html[s.id] = existsSync(s.file) ? await readFile(s.file, 'utf8') : null;

// cov — coverage
if (want('cov')) for (const s of screens) {
  if (!html[s.id]) { add('cov.file', 'blocker', s.id, `File not found: ${s.file}`); continue; }
  const drawn = new Set([...html[s.id].matchAll(/data-state="([^"]+)"/g)].map((m) => m[1]));
  for (const st of s.states ?? []) if (st !== 'default' && !drawn.has(st)) add('cov.state', 'blocker', s.id, `State "${st}" is declared but no <section data-state="${st}"> is drawn.`);
  if (!s.no_list && !drawn.has('empty') && !(s.states ?? []).includes('empty')) add('cov.empty', 'blocker', s.id, 'No empty state. Draw <section data-state="empty">, or set "no_list": true if the screen shows no list.');
  for (const st of ['loading', 'error']) if (!s.no_list && s.origin !== 'live' && !drawn.has(st)) add(`cov.${st}`, 'warning', s.id, `No ${st} state drawn.`);
}

// tok — tokens (static)
if (want('tok')) for (const s of screens) {
  const h = html[s.id]; if (!h) continue;
  for (const m of h.matchAll(/\sstyle="([^"]*)"/g)) {
    const decls = m[1].split(';').map((d) => d.trim()).filter(Boolean);
    if (decls.some((d) => !d.startsWith('--'))) { add('tok.inline', 'blocker', s.id, `Inline style that isn't only custom properties: style="${m[1].slice(0, 80)}"`); break; }
  }
  const styles = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const outsideRoot = styles.replace(/:root\s*\{[^}]*\}/g, '');
  const hex = outsideRoot.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi);
  if (hex) add('tok.hex', 'blocker', s.id, `Hard-coded colour(s) in <style>: ${[...new Set(hex)].slice(0, 5).join(', ')}. Use --olx-* tokens.`);
  const px = outsideRoot.replace(/@media[^{]*\{/g, '').match(/:\s*[^;{}]*\b(?!0px|1px)\d+(\.\d+)?px/g);
  if (px) add('tok.px', 'warning', s.id, `px literals in <style> (${px.length}), e.g. "${px[0].trim()}". Prefer --olx-space-* / --olx-radius-* / --olx-font-size-*.`);
  const used = new Set([...h.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
  const local = new Set([...styles.matchAll(/(--[\w-]+)\s*:/g), ...h.matchAll(/style="[^"]*?(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const undef = [...used].filter((v) => !definedVars.has(v) && !local.has(v));
  if (undef.length) add('tok.resolve', 'blocker', s.id, `Undefined custom properties: ${undef.join(', ')}`);
  if (s.origin !== 'live' && !/href="[^"]*css\/(olx|tokens)\.css"/.test(h)) add('tok.css', 'warning', s.id, 'Screen does not link css/olx.css (tokens, base and components).');
}

// fnt — font rule (static part): Geomanist Regular 400, Book 500, Medium 600 only
if (want('fnt')) for (const s of screens) {
  const h = html[s.id]; if (!h) continue;
  const bad = h.match(/font-weight\s*:\s*(bold|bolder|lighter|[1-3]00|[7-9]00)\b/gi);
  if (bad) add('fnt.weight', 'blocker', s.id, `Font weight outside Regular/Book/Medium: ${[...new Set(bad)].join(', ')}. Never Geomanist Bold or Thin; use --olx-font-weight-semibold (600).`);
  const fam = h.match(/font-family\s*:\s*([^;}"]+)/gi)?.filter((f) => !/var\(--olx-font-family|inherit|Geomanist/i.test(f));
  if (fam?.length) add('fnt.family', 'blocker', s.id, `Font family other than Geomanist: ${fam.slice(0, 3).join(' | ')}`);
}

// cpy — copy
const BANNED = /\b(get started|discover|unlock|seamless(ly)?|elevate|supercharge|revolutioni[sz]e|effortless(ly)?|empower|cutting-edge|game-?changer)\b/i;
const PLACEHOLDER = /\b(lorem|ipsum|todo|tbc|tbd|xxx+|john doe|jane doe|product name|placeholder)\b/i;
if (want('cpy')) for (const s of screens) {
  const h = html[s.id]; if (!h) continue;
  const t = visibleText(h);
  const ph = t.match(PLACEHOLDER); if (ph) add('cpy.placeholder', 'blocker', s.id, `Placeholder text on screen: "${ph[0]}"`);
  const v = t.match(BANNED); if (v) add('cpy.voice', 'warning', s.id, `Off-voice word "${v[0]}". OLX copy is short verbs: Chat, Call, Sell, Show phone number.`);
  const money = t.match(/(\$\s?\d|PKR\s?\d|Rs\.\s?\d|₨|\bRs\d)/); if (money) add('cpy.price', 'warning', s.id, `Price format "${money[0]}". OLX writes "Rs 54,999", "Rs 9.75 Lac", "Rs 3.10 Crore".`);
  const phone = t.match(/(\+?92[\s-]?|\b0)3\d{2}[\s-]?\d{7}\b|[\w.+-]+@[\w-]+\.[\w.]+/); if (phone) add('cpy.pii', 'blocker', s.id, 'A phone number or email is visible. Use 03XX-XXXXXXX / email@example.com.');
}

// flw — flows
const flowsFile = feature && features[feature]?.flows;
const flows = flowsFile ? await json(flowsFile, null) : null;
if (want('flw') && feature) {
  if (!flows) add('flw.missing', 'warning', null, `Feature "${feature}" has no flows.json registered (registry.features.${feature}.flows): no prototype section.`);
  else for (const [platform, flow] of Object.entries(flows.platforms ?? {})) {
    const ids = new Set(flow.screens.map((x) => x.id));
    const tr = flow.transitions ?? [];
    for (const t of tr) for (const end of [t.from, t.to]) if (!ids.has(end)) add('flw.dead', 'blocker', null, `${platform}: transition ${t.from} → ${t.to} names a screen that isn't in the flow ("${end}").`);
    const reach = new Set([flow.entry]); let grew = true;
    while (grew) { grew = false; for (const t of tr) if (reach.has(t.from) && !reach.has(t.to)) { reach.add(t.to); grew = true; } }
    for (const id of ids) if (!reach.has(id)) add('flw.reach', 'blocker', null, `${platform}: screen "${id}" can't be reached from the entry "${flow.entry}".`);
    for (const x of flow.screens) {
      if (x.id === flow.entry) continue;
      const out = tr.filter((t) => t.from === x.id);
      if (!out.some((t) => ['back', 'dismiss', 'close'].includes(t.kind))) add('flw.back', 'blocker', null, `${platform}: "${x.id}" has no back / dismiss / close transition.`);
      if (/modal|sheet|dialog|drawer/i.test(x.kind ?? '') && !out.some((t) => ['dismiss', 'close'].includes(t.kind))) add('flw.dismiss', 'blocker', null, `${platform}: ${x.kind} "${x.id}" has no dismiss / close.`);
      if (x.screen && !screens.some((s) => s.id === x.screen)) add('flw.screen', 'blocker', null, `${platform}: flow screen "${x.id}" points at "${x.screen}", which isn't registered.`);
    }
  }
}

// par — desktop ↔ mobile parity
if (want('par')) for (const s of screens.filter((x) => x.platform === 'web-desktop')) {
  const pair = s.pair ? screens.find((x) => x.id === s.pair) : null;
  if (!pair) { if (!s.unpaired && s.origin !== 'live') add('par.undeclared', 'warning', s.id, 'Desktop screen with no mobile pair ("pair") and no "unpaired" reason.'); continue; }
  const a = new Set(s.states ?? []), b = new Set(pair.states ?? []);
  if ([...a].some((x) => !b.has(x)) || [...b].some((x) => !a.has(x))) add('par.states', 'warning', s.id, `Desktop and mobile declare different states: ${[...a].join(',')} vs ${[...b].join(',')}`);
  if (html[s.id] && html[pair.id]) {
    const sa = strings(html[s.id]), sb = strings(html[pair.id]);
    const shared = [...sa].filter((x) => sb.has(x)).length / Math.max(1, Math.min(sa.size, sb.size));
    if (shared < 0.6) add('par.copy', 'warning', s.id, `Desktop and mobile share only ${Math.round(shared * 100)}% of their visible strings.`);
  }
}

// trk — tracking
const trackingFile = feature && features[feature]?.tracking;
if (want('trk') && trackingFile) {
  const trk = await json(trackingFile, null);
  if (!trk) add('trk.file', 'blocker', null, `${trackingFile} is registered but can't be read.`);
  else {
    const byName = Object.fromEntries((catalog.events ?? []).map((e) => [e.name, e]));
    const PII = /(^|_)(user|seller|buyer|full|first|last|contact)_?name$|phone|email|message_text|chat_text|address|latitude|longitude|(^|_)(lat|lng)$|session|(^|_)(user|seller|buyer)_id$/i;
    const flowScreens = new Set(Object.values(flows?.platforms ?? {}).flatMap((f) => f.screens.map((x) => x.id)));
    for (const e of trk.events ?? []) {
      const c = byName[e.event];
      if (!c) add('trk.catalog', 'blocker', null, `Event "${e.event}" (${e.id}) isn't in handoff/analytics/event-catalog.json. Add it through event-taxonomy (status proposed).`);
      else if (c.status === 'proposed') add('trk.proposed', 'warning', null, `Event "${e.event}" is proposed, not seen live on olx.com.pk. Say so in the summary.`);
      if (!/^[a-z][a-z0-9_]{0,39}$/.test(e.event)) add('trk.name', 'blocker', null, `Event name "${e.event}" isn't snake_case ≤ 40 chars.`);
      for (const p of [...Object.keys(e.params ?? {}), ...(e.dynamic ?? [])]) if (PII.test(p)) add('trk.pii', 'blocker', null, `Event ${e.event} parameter "${p}" looks like personal data.`);
      for (const sc of e.screens ?? []) if (flowScreens.size && !flowScreens.has(sc)) add('trk.screen', 'blocker', null, `Event ${e.event} names screen "${sc}", which isn't in flows.json.`);
    }
    for (const m of trk.metrics ?? []) for (const ev of m.events ?? []) if (!(trk.events ?? []).some((e) => e.event === ev)) add('trk.metric', 'blocker', null, `Metric ${m.id} uses event "${ev}", which the feature doesn't fire.`);
    if (!catalog.tenant?.ga4_measurement_id) add('trk.ids', 'warning', null, 'No GA4 measurement id recorded for PK: the plan is fine, but it can\'t be verified in DebugView yet.');
  }
}

// ---------- render checks (Chromium) ----------
const renderGroups = ['a11y', 'ovf', 'fnt'].filter(want);
if (renderGroups.length && !NO_RENDER) {
  const { chromium } = await import(join(ROOT, 'node_modules/playwright/index.mjs'));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const LONG = 'Urgent_sale_iPhone_15_Pro_Max_256GB_PTA_approved_with_box_and_charger_10/10_condition_DHA_Phase_6_Lahore_'.repeat(2).slice(0, 200);
  for (const c of matrix) {
    const s = screens.find((x) => x.id === c.screen);
    if (!html[s.id]) continue;
    const ctx = await browser.newContext({ viewport: { width: c.width, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//, (r) => (/images\.olx\.com\.pk|www\.olx\.com\.pk\/assets/.test(r.request().url()) ? r.continue() : r.abort()));
    await page.goto('file://' + resolve(s.file), { waitUntil: 'load' }).catch(() => {});
    await page.evaluate(async () => { await document.fonts.ready; });
    const res = await page.evaluate(({ state, long, ovf, a11y, fnt }) => {
      const out = [];
      // show only the state under test
      const sections = [...document.querySelectorAll('[data-state]')];
      if (sections.length) sections.forEach((el) => { el.hidden = el.dataset.state !== state && !(state === 'default' && !el.dataset.state); });
      const root = sections.find((el) => el.dataset.state === state) ?? document.body;
      const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
      const path = (el) => { const p = []; for (let e = el; e && e !== document.body && p.length < 4; e = e.parentElement) p.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/)[0] : '')); return p.join(' > '); };
      if (ovf) {
        if (document.documentElement.scrollWidth > innerWidth + 1) out.push(['ovf.width', 'blocker', `Horizontal scroll: page is ${document.documentElement.scrollWidth}px wide in a ${innerWidth}px window.`]);
        const ugc = [...root.querySelectorAll('[data-ugc]')].filter(visible);
        ugc.forEach((el) => { el.textContent = long; });
        for (const el of ugc) {
          const r = el.getBoundingClientRect(), pr = el.parentElement.getBoundingClientRect();
          if (r.right > pr.right + 1 || document.documentElement.scrollWidth > innerWidth + 1) { out.push(['ovf.long', 'blocker', `A 200-character user text (title, location, name) breaks out of its box (${path(el)}). Truncate with an ellipsis or wrap it.`]); break; }
        }
      }
      if (a11y) {
        for (const img of root.querySelectorAll('img')) if (visible(img) && !img.hasAttribute('alt')) { out.push(['a11y.alt', 'blocker', `Image without alt (${path(img)}).`]); break; }
        for (const el of root.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [role=button]')) {
          if (!visible(el)) continue;
          const name = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || el.getAttribute('placeholder') || (el.id && document.querySelector(`label[for="${el.id}"]`)?.textContent) || el.closest('label')?.textContent || '').trim();
          if (!name) { out.push(['a11y.label', 'blocker', `Control without an accessible name (${path(el)}).`]); break; }
        }
        const hs = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((h) => +h.tagName[1]);
        for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) { out.push(['a11y.heading', 'warning', `Heading level jumps from h${hs[i - 1]} to h${hs[i]}.`]); break; }
        const small = [...root.querySelectorAll('button, a[href], input, select, [role=button]')].filter(visible).filter((el) => { const r = el.getBoundingClientRect(); return (r.width < 24 || r.height < 24) && !el.closest('p, li > span'); });
        if (small.length) out.push(['a11y.target', 'warning', `${small.length} control(s) smaller than 24×24px, e.g. ${path(small[0])}.`]);
        // contrast of text against its effective background
        const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
        const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
        const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; const v = rgb(c); if (v.length === 3 || (v.length === 4 && v[3] > 0.9)) return v.slice(0, 3); if (getComputedStyle(e).backgroundImage !== 'none') return null; } return [255, 255, 255]; };
        let worst = null;
        for (const el of root.querySelectorAll('*')) {
          if (!visible(el) || ![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue;
          const cs = getComputedStyle(el); const bg = bgOf(el); if (!bg) continue;
          const fg = rgb(cs.color).slice(0, 3); const [L1, L2] = [lum(fg), lum(bg)].sort((a, b) => b - a); const ratio = (L1 + 0.05) / (L2 + 0.05);
          const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 600);
          const need = large ? 3 : 4.5;
          if (ratio < need && (!worst || ratio < worst.ratio)) worst = { ratio, need, where: path(el), text: el.textContent.trim().slice(0, 30) };
        }
        if (worst) out.push(['a11y.contrast', 'blocker', `Text contrast ${worst.ratio.toFixed(2)}:1 < ${worst.need}:1 for "${worst.text}" (${worst.where}).`]);
      }
      if (fnt) {
        const weights = new Set(), families = new Set();
        for (const el of root.querySelectorAll('*')) { if (!visible(el) || ![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue; const cs = getComputedStyle(el); weights.add(cs.fontWeight); families.add(cs.fontFamily.split(',')[0].replace(/"/g, '').trim()); }
        const badW = [...weights].filter((w) => !['400', '500', '600'].includes(w));
        if (badW.length) out.push(['fnt.render', 'blocker', `Rendered text uses weight ${badW.join(', ')}: only 400 / 500 / 600 (Geomanist Regular, Book, Medium).`]);
        const badF = [...families].filter((f) => !/^geomanist$/i.test(f));
        if (badF.length) out.push(['fnt.render', 'blocker', `Rendered text uses ${badF.join(', ')} instead of Geomanist.`]);
        const loaded = [...document.fonts].some((f) => /geomanist/i.test(f.family) && f.status === 'loaded');
        if (!loaded && families.size) out.push(['fnt.load', 'warning', 'Geomanist did not load (check the css/olx.css link and fonts/).']);
      }
      return out;
    }, { state: c.state, long: LONG, ovf: want('ovf'), a11y: want('a11y'), fnt: want('fnt') });
    for (const [check, sev, msg] of res) add(check, sev, s.id, msg, { state: c.state, width: c.width });
    await ctx.close();
  }
  await browser.close();
}

// ---------- de-duplicate (same check, screen and message across widths/states) ----------
const seen = new Map();
for (const f of findings) {
  const k = `${f.check}|${f.screen}|${f.message}`;
  if (seen.has(k)) { const g = seen.get(k); for (const key of ['state', 'width']) if (f[key] !== undefined) g[`${key}s`] = [...new Set([...(g[`${key}s`] ?? (g[key] !== undefined ? [g[key]] : [])), f[key]])]; }
  else seen.set(k, f);
}
const final = [...seen.values()].map((f) => { if (f.states) delete f.state; if (f.widths) delete f.width; return f; });
const open = (sev) => final.filter((f) => f.severity === sev && !f.waived);
const verdict = open('blocker').length ? 'BLOCKED' : open('warning').length ? 'PASS WITH WARNINGS' : 'PASS';
const report = {
  schema: 'olx-design-qa/1', scope: SCOPE, feature, checked: new Date().toISOString(), verdict,
  counts: { blocker: open('blocker').length, warning: open('warning').length, note: open('note').length, waived: final.filter((f) => f.waived).length },
  screens: screens.map((s) => ({ id: s.id, platform: s.platform, origin: s.origin ?? 'authored', states: s.states ?? ['default'], file: s.file })),
  matrix_size: matrix.length, checks: groups, findings: final,
};
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'report.json'), JSON.stringify(report, null, 1) + '\n');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
await writeFile(join(outDir, 'report.html'), `<!doctype html><meta charset="utf-8"><title>QA ${esc(SCOPE)}: ${verdict}</title>
<style>body{font:14px/1.5 system-ui,sans-serif;margin:24px;color:#002f34}h1{font-size:20px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #d8dfe0;padding:6px 8px;text-align:left;vertical-align:top}.blocker{color:#b83018;font-weight:600}.warning{color:#7a5a00}.note{color:#406367}.waived{text-decoration:line-through}</style>
<h1>QA ${esc(SCOPE)}: ${verdict}</h1><p>${report.counts.blocker} blocker(s), ${report.counts.warning} warning(s), ${report.counts.note} note(s), ${report.counts.waived} waived · ${matrix.length} cases · ${esc(report.checked)}</p>
<table><tr><th>Severity</th><th>Check</th><th>Screen</th><th>Where</th><th>Finding</th></tr>
${final.map((f) => `<tr class="${f.waived ? 'waived' : ''}"><td class="${f.severity}">${f.severity}${f.capped_from ? ` (from ${f.capped_from})` : ''}</td><td>${esc(f.check)}</td><td>${esc(f.screen ?? '—')}</td><td>${esc([f.state ?? f.states?.join(','), f.width ?? f.widths?.join(',')].filter(Boolean).join(' @ '))}</td><td>${esc(f.message)}${f.waived ? `<br><em>Waived: ${esc(f.waived.reason)} (${esc(f.waived.owner)})</em>` : ''}</td></tr>`).join('\n')}
</table>`);

console.log(`\n${verdict}: ${report.counts.blocker} blocker(s), ${report.counts.warning} warning(s), ${report.counts.note} note(s) → ${relative(ROOT, join(outDir, 'report.json'))}`);
for (const f of open('blocker').concat(open('warning')).slice(0, 3)) console.log(`  ${f.severity} ${f.check} ${f.screen ?? ''}: ${f.message}`);
process.exit(verdict === 'BLOCKED' ? 1 : 0);
