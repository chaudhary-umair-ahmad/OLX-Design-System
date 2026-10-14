// Build one self-contained INTERNAL hand-off HTML for a feature: every screen and state live
// (not pictures), a clickable prototype from flows.json, specs mapped back to tokens, rules with
// their tests, copy deck, tracking, QA result, open questions, changelog and sign-off.
// Fonts, CSS and images are inlined; nothing is fetched when the file is opened.
//
// Run from the repo root:
//   node .claude/skills/olx-design-system/deliverables/scripts/build.mjs --feature <feature> [--placeholder-images]
//   npm run handoff -- --feature favourites
//
// Gate: refuses when handoff/<feature>/qa/report.json is missing, BLOCKED, or older than a screen
// file; when deliverable.json has no changelog entry for its version; when the output contains a
// phone number or email; or when it is over the 12 MB budget.
import { existsSync, statSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : d; };
const FEATURE = opt('feature');
const PLACEHOLDER = !!opt('placeholder-images', false);
const BUDGET = 12 * 1024 * 1024;
const die = (m) => { console.error(`✗ ${m}`); process.exit(1); };
if (!FEATURE) die('usage: build.mjs --feature <feature> [--placeholder-images]');

const json = async (f, d) => { try { return JSON.parse(await readFile(f, 'utf8')); } catch (e) { if (d !== undefined) return d; die(`${f}: ${e.message}`); } };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const registry = await json('handoff/registry.json');
const feat = registry.features?.[FEATURE] ?? die(`"${FEATURE}" isn't a feature in handoff/registry.json`);
const d = await json(feat.deliverable ?? `handoff/${FEATURE}/deliverable.json`);
const flows = feat.flows ? await json(feat.flows, null) : null;
const tracking = feat.tracking ? await json(feat.tracking, null) : null;
const catalog = await json('handoff/analytics/event-catalog.json', { events: [], shared_params: [] });
const screens = (registry.screens ?? []).filter((s) => s.feature === FEATURE && (!d.platforms || d.platforms.includes(s.platform)) && (!d.screens || d.screens.includes(s.id)));
if (!screens.length) die('no screens to hand off');

// ---------- gate ----------
const reportFile = `handoff/${FEATURE}/qa/report.json`;
if (!existsSync(reportFile)) die(`No QA report. Run: npm run qa -- --scope ${FEATURE}`);
const report = await json(reportFile);
if (report.verdict === 'BLOCKED') die(`QA is BLOCKED (${report.counts.blocker} blocker(s)). Fix them or waive them with a reason, owner and expiry, then re-run QA.`);
const stale = screens.filter((s) => statSync(s.file).mtimeMs > statSync(reportFile).mtimeMs);
if (stale.length) die(`QA report is older than ${stale.map((s) => s.file).join(', ')}. Re-run: npm run qa -- --scope ${FEATURE}`);
if (!(d.changelog ?? []).some((c) => c.version === d.version)) die(`deliverable.json has no changelog entry for version ${d.version}.`);

// ---------- CSS with fonts inlined ----------
async function cssBundle(entry) {
  const seen = new Set();
  async function load(file) {
    if (seen.has(file)) return ''; seen.add(file);
    let css = await readFile(file, 'utf8');
    const dir = dirname(file);
    let out = '';
    for (const m of css.matchAll(/@import\s+url\(["']?([^"')]+)["']?\)\s*;/g)) out += await load(join(dir, m[1]));
    css = css.replace(/@import\s+url\([^)]*\)\s*;/g, '');
    css = await replaceAsync(css, /url\(["']?([^"')]+\.(woff2?|ttf|otf))["']?\)/g, async (_, u) => {
      const p = join(dir, u); if (!existsSync(p)) return `url("${u}")`;
      return `url("data:font/${extname(p).slice(1)};base64,${(await readFile(p)).toString('base64')}")`;
    });
    return out + css;
  }
  return load(entry);
}
async function replaceAsync(str, re, fn) { const parts = []; let last = 0; for (const m of str.matchAll(re)) { parts.push(str.slice(last, m.index), await fn(...m)); last = m.index + m[0].length; } parts.push(str.slice(last)); return parts.join(''); }
const baseCss = await cssBundle('css/olx.css');

// ---------- images → data URIs ----------
const imgCache = new Map();
const PLACEHOLDER_IMG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f2f4f5"/><text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#406367">Listing photo</text></svg>')}`;
let fellBack = 0;
async function dataUri(src, baseDir) {
  if (src.startsWith('data:')) return src;
  if (imgCache.has(src)) return imgCache.get(src);
  let uri;
  try {
    let buf, type;
    if (/^https?:/.test(src)) {
      if (PLACEHOLDER) throw new Error('placeholder mode');
      const r = await fetch(src); if (!r.ok) throw new Error(`HTTP ${r.status}`);
      buf = Buffer.from(await r.arrayBuffer()); type = r.headers.get('content-type') ?? 'image/jpeg';
    } else {
      const p = join(baseDir, src); buf = await readFile(p);
      type = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' }[extname(p)] ?? 'application/octet-stream';
    }
    uri = `data:${type};base64,${buf.toString('base64')}`;
  } catch { uri = PLACEHOLDER_IMG; fellBack++; }
  imgCache.set(src, uri); return uri;
}

// ---------- per screen: inline CSS, images; split into state bodies ----------
const docs = {}; // screenId -> { css, states: {state: bodyHtml}, width }
const assets = new Map();
for (const s of screens) {
  let h = await readFile(s.file, 'utf8');
  const dir = dirname(s.file);
  const localCss = [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  let body = (h.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? h).replace(/<script[\s\S]*?<\/script>/gi, '');
  body = await replaceAsync(body, /<img\b([^>]*?)\ssrc="([^"]+)"/g, async (m, pre, src) => { assets.set(src, s.id); return `<img${pre} src="${await dataUri(src, dir)}"`; });
  body = body.replace(/\sdata-src="[^"]*"|\s(data-)?srcset="[^"]*"/g, '');
  const states = {};
  for (const st of s.states ?? ['default']) {
    // Show only this state: strip any hidden flag from state sections, then hide the others.
    states[st] = body.replace(/<section\b([^>]*?)\sdata-state="([^"]+)"([^>]*)>/g, (m, a, name, b) => {
      const attrs = `${a} data-state="${name}"${b}`.replace(/\shidden(="[^"]*")?/g, '');
      return `<section${attrs}${name === st ? '' : ' hidden'}>`;
    });
  }
  docs[s.id] = { css: localCss, states, width: s.platform === 'web-mobile' ? 390 : 1440, platform: s.platform };
}

// ---------- specs: measure the default state in Chromium and map values to tokens ----------
const tokensCss = await readFile('css/tokens.css', 'utf8');
const rootBlock = tokensCss.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
const tokenByValue = {};
for (const m of rootBlock.matchAll(/(--olx-[\w-]+)\s*:\s*([^;]+);/g)) { const v = m[2].trim().toLowerCase(); (tokenByValue[v] ??= []).push(m[1]); }
const hexOf = (rgb) => { const n = (rgb.match(/[\d.]+/g) ?? []).map(Number); return n.length >= 3 && (n[3] ?? 1) > 0 ? '#' + n.slice(0, 3).map((x) => x.toString(16).padStart(2, '0')).join('') : null; };
const tok = (v) => { if (!v) return ''; const k = String(v).toLowerCase(); const t = tokenByValue[k] ?? tokenByValue[hexOf(k) ?? ''] ; return t ? t.filter((x) => !/^--olx-color-/.test(x) || t.length === 1).slice(0, 2).join(' / ') || t[0] : ''; };
const specs = {};
{
  const { chromium } = await import(resolve('node_modules/playwright/index.mjs'));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of screens) {
    const page = await (await browser.newContext({ viewport: { width: docs[s.id].width, height: 900 } })).newPage();
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}\n${docs[s.id].css}</style></head><body>${docs[s.id].states[(s.states ?? ['default'])[0]]}</body></html>`, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; });
    specs[s.id] = await page.evaluate(() => {
      const pick = [...document.querySelectorAll('h1,h2,h3,button,.olx-btn,a.olx-link-more,input,select,textarea,[class*="olx-"]:not(svg):not(path)')]
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.height && !el.closest('[hidden]'); });
      const seen = new Set(); const rows = [];
      for (const el of pick) {
        const key = el.tagName.toLowerCase() + '.' + [...el.classList].filter((c) => c.startsWith('olx-') || c.startsWith('fav-')).join('.');
        if (seen.has(key)) continue; seen.add(key);
        const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
        rows.push({ el: key, size: `${Math.round(r.width)}×${Math.round(r.height)}`, font: `${cs.fontSize} / ${cs.fontWeight}`, color: cs.color, bg: cs.backgroundColor, padding: cs.padding, radius: cs.borderRadius, gap: cs.gap !== 'normal' ? cs.gap : '' });
        if (rows.length > 40) break;
      }
      return rows;
    });
    await page.close();
  }
  await browser.close();
}

// ---------- copy deck ----------
const strings = (html) => [...new Set(html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').split(/<[^>]+>/).map((t) => t.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()).filter((t) => t.length > 1))];
const copy = screens.map((s) => ({ screen: s.id, states: Object.fromEntries(Object.entries(docs[s.id].states).map(([st, h]) => {
  const only = h.match(new RegExp(`<section[^>]*data-state="${st}"[^>]*>([\\s\\S]*?)</section>`))?.[1] ?? h; return [st, strings(only).filter((x) => !/^Rs |ago$|, [A-Z]/.test(x) || x.length < 25)];
})) }));

// ---------- sections ----------
const excluded = d.sections?.exclude ?? {};
const sec = [];
const section = (id, title, html) => { if (excluded[id]) { sec.push({ id, title, html: `<p class="muted">Not included: ${esc(excluded[id])}</p>`, excluded: true }); return; } sec.push({ id, title, html }); };
const list = (a) => (a?.length ? `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="muted">None.</p>');

section('summary', 'Summary', `<dl class="kv"><dt>Problem</dt><dd>${esc(d.summary?.problem)}</dd><dt>Scope</dt><dd>${esc(d.summary?.scope)}</dd><dt>What changed</dt><dd>${esc(d.summary?.changed)}</dd>
<dt>Platforms</dt><dd>${esc((d.platforms ?? []).join(', '))}</dd><dt>Locales</dt><dd>${esc((d.locales ?? ['en']).join(', '))}</dd><dt>Audience</dt><dd>${esc(d.audience)}</dd>
<dt>QA</dt><dd><strong>${esc(report.verdict)}</strong>: ${report.counts.blocker} blocker(s), ${report.counts.warning} warning(s), ${report.counts.waived} waived, checked ${esc(report.checked.slice(0, 10))}</dd></dl>`);
section('prototype', 'Prototype', flows ? `<p>Click the highlighted elements, or use the steps below each frame. Every screen comes from <code>flows.json</code>.</p>
${Object.entries(flows.platforms).map(([pf, f]) => `<div class="proto" data-platform="${esc(pf)}" data-entry="${esc(f.entry)}"><h3>${esc(pf)}</h3><div class="proto__frame"><iframe title="${esc(pf)} prototype" data-proto></iframe></div><p class="proto__where"></p><div class="proto__steps"></div></div>`).join('')}` : '<p class="muted">No flows.json for this feature: no prototype.</p>');
section('states', 'Screens and states', screens.map((s) => `<h3>${esc(s.id)} <span class="muted">${esc(s.platform)} · ${esc(s.origin ?? 'authored')}${s.based_on ? ` · based on live <code>${esc(s.based_on)}</code>` : ''}</span></h3>
<div class="states${docs[s.id].width > 600 ? ' states--desktop' : ''}">${(s.states ?? ['default']).map((st) => `<figure><figcaption>${esc(st)}</figcaption><div class="frame" style="--w:${docs[s.id].width}"><iframe title="${esc(s.id)} ${esc(st)}" data-screen="${esc(s.id)}" data-state="${esc(st)}" loading="lazy"></iframe></div></figure>`).join('')}</div>`).join(''));
section('specs', 'Specs', `<p>Measured in Chromium on the default state, with the token each value maps to. A blank token cell means the value has no token: check it or log it as a proposal.</p>${screens.map((s) => `<h3>${esc(s.id)}</h3><table><tr><th>Element</th><th>Size</th><th>Font size / weight</th><th>Colour</th><th>Background</th><th>Padding</th><th>Radius</th><th>Gap</th></tr>${specs[s.id].map((r) => `<tr><td><code>${esc(r.el)}</code></td><td>${esc(r.size)}</td><td>${esc(r.font)}</td><td>${esc(hexOf(r.color) ?? r.color)} <span class="tok">${esc(tok(r.color))}</span></td><td>${esc(hexOf(r.bg) ?? '—')} <span class="tok">${esc(tok(r.bg))}</span></td><td>${esc(r.padding)}</td><td>${esc(r.radius)}</td><td>${esc(r.gap)}</td></tr>`).join('')}</table>`).join('')}`);
section('rules', 'Rules', (d.rules ?? []).length ? `<table><tr><th>Id</th><th>Rule</th><th>How to test it</th></tr>${d.rules.map((r) => `<tr><td>${esc(r.id)}</td><td>${esc(r.text)}</td><td>${r.test ? esc(r.test) : '<span class="bad">Missing test</span>'}</td></tr>`).join('')}</table>` : '<p class="muted">No rules.</p>');
section('acceptance', 'Acceptance criteria', list(d.acceptance));
section('edge-cases', 'Edge cases', list(d.edge_cases));
section('copy', 'Copy deck', copy.map((c) => `<h3>${esc(c.screen)}</h3><table><tr><th>State</th><th>Strings</th></tr>${Object.entries(c.states).map(([st, a]) => `<tr><td>${esc(st)}</td><td>${a.map((x) => `<span class="pill">${esc(x)}</span>`).join(' ')}</td></tr>`).join('')}</table>`).join('') + '<p class="muted">Listing titles, prices and locations are real captured content (handoff/content/fixtures.json), not copy to build.</p>');
section('accessibility', 'Accessibility', (() => { const a = report.findings.filter((f) => f.check.startsWith('a11y')); return `<p>Checked: alt text, accessible names, heading order, target sizes and text contrast (WCAG AA), at every width and state.</p>${a.length ? `<table><tr><th>Severity</th><th>Finding</th></tr>${a.map((f) => `<tr><td>${esc(f.severity)}</td><td>${esc(f.message)}</td></tr>`).join('')}</table>` : '<p>No accessibility findings.</p>'}<p class="muted">Not automated: focus order and screen-reader wording. Check them by hand.</p>`; })());
section('tracking', 'Analytics and tracking', tracking ? (() => {
  const byName = Object.fromEntries(catalog.events.map((e) => [e.name, e]));
  const ex = tracking.events?.[0];
  return `<p>Tenant: ${esc((tracking.tenants ?? []).join(', '))} · currency ${esc(catalog.tenant?.currency ?? 'PKR')} · GA4 id ${esc(catalog.tenant?.ga4_measurement_id ?? 'not recorded')}</p>
<table><tr><th>Metric</th><th>Kind</th><th>Definition</th></tr>${(tracking.metrics ?? []).map((m) => `<tr><td>${esc(m.id)} ${esc(m.name)}</td><td>${esc(m.kind)}</td><td>${esc(m.definition)}</td></tr>`).join('')}</table>
<table><tr><th>Id</th><th>Action</th><th>Event</th><th>Status</th><th>Fires on</th><th>Fixed params</th><th>Runtime params</th><th>Screens</th></tr>${(tracking.events ?? []).map((e) => `<tr><td>${esc(e.id)}</td><td>${esc(e.action)}</td><td><code>${esc(e.event)}</code></td><td>${esc(byName[e.event]?.status ?? 'not in catalogue')}</td><td>${esc(byName[e.event]?.fires_on ?? '')}</td><td>${esc(JSON.stringify(e.params ?? {}))}</td><td>${esc((e.dynamic ?? []).join(', '))}</td><td>${esc((e.screens ?? []).join(', '))}</td></tr>`).join('')}</table>
${ex ? `<p>dataLayer example (web):</p><pre>window.dataLayer.push(${esc(JSON.stringify({ event: ex.event, ...(ex.params ?? {}), ...Object.fromEntries((ex.dynamic ?? []).map((k) => [k, `<${k}>`])) }, null, 2))});</pre>` : ''}
<p class="muted">"live" events were observed in <code>dataLayer</code> on olx.com.pk. "live_name" events are names the live GTM container triggers on, but their parameters have not been observed: confirm them in GTM Preview, signed in, before building. "proposed" events have never been seen live at all: confirm the live name first.</p>`;
})() : '<p class="muted">No tracking.json for this feature.</p>');
section('assets', 'Assets', assets.size ? `<p>${assets.size} image(s), inlined. Listing photos are user content from images.olx.com.pk and only illustrate the layout.${fellBack ? ` <strong>${fellBack} could not be fetched and show a placeholder.</strong>` : ''}</p>` : '<p class="muted">No images.</p>');
section('qa', 'QA result', `<p><strong>${esc(report.verdict)}</strong> · ${report.matrix_size} cases · checks ${esc(report.checks.join(', '))}</p>${report.findings.length ? `<table><tr><th>Severity</th><th>Check</th><th>Screen</th><th>Finding</th></tr>${report.findings.map((f) => `<tr><td>${esc(f.severity)}${f.waived ? ' (waived)' : ''}</td><td>${esc(f.check)}</td><td>${esc(f.screen ?? '')}</td><td>${esc(f.message)}${f.waived ? `<br><em>${esc(f.waived.reason)} (${esc(f.waived.owner)})</em>` : ''}</td></tr>`).join('')}</table>` : '<p>No findings.</p>'}`);
section('open-questions', 'Open questions', (d.open_questions ?? []).length ? `<table><tr><th>Question</th><th>Owner</th><th>Blocks</th></tr>${d.open_questions.map((q) => `<tr><td>${esc(q.q)}</td><td>${q.owner ? esc(q.owner) : '<span class="bad">No owner</span>'}</td><td>${esc(q.blocks)}</td></tr>`).join('')}</table>` : '<p class="muted">None.</p>');
section('changelog', 'Changelog', `<table><tr><th>Version</th><th>Date</th><th>Notes</th></tr>${(d.changelog ?? []).slice().reverse().map((c) => `<tr><td>${esc(c.version)}</td><td>${esc(c.date)}</td><td>${esc(c.notes)}</td></tr>`).join('')}</table>`);
section('signoff', 'Sign-off', `<p>${esc(d.signoff?.meaning ?? '')}</p><table><tr><th>Role</th><th>Name</th><th>Date</th></tr>${(d.signoff?.who ?? []).map((w) => `<tr><td>${esc(w)}</td><td></td><td></td></tr>`).join('')}</table>`);

// ---------- assemble ----------
const data = { css: baseCss, docs: Object.fromEntries(Object.entries(docs).map(([k, v]) => [k, { css: v.css, states: v.states, width: v.width }])), flows: flows?.platforms ?? {} };
const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="classification" content="internal">
<title>${esc(d.title)} · v${esc(d.version)} · OLX design hand-off</title>
<style>${await readFile(join(SKILL, 'deliverables/assets/deliverable.css'), 'utf8')}</style>
<style>${baseCss.match(/@font-face\s*\{[^}]*\}/g)?.join('\n') ?? ''}</style>
</head><body>
<div class="internal">INTERNAL: do not share outside OLX. Contains licensed fonts.</div>
<header class="top"><h1>${esc(d.title)}</h1><p>Version ${esc(d.version)} · ${esc(d.changelog.find((c) => c.version === d.version).date)} · QA ${esc(report.verdict)}</p>
<nav>${sec.map((x) => `<a href="#${x.id}"${x.excluded ? ' class="muted"' : ''}>${esc(x.title)}</a>`).join('')}</nav></header>
<main>${sec.map((x) => `<section id="${x.id}"><h2>${esc(x.title)}</h2>${x.html}</section>`).join('\n')}</main>
<script id="data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script>${await readFile(join(SKILL, 'deliverables/assets/deliverable.js'), 'utf8')}</script>
</body></html>`;

// ---------- checks on the output ----------
const textOnly = page.replace(/data:[^"')\s]+/g, '').replace(/<[^>]+>/g, ' ');
const pii = textOnly.match(/(\+?92[\s-]?|\b0)3\d{2}[\s-]?\d{7}\b|[\w.+-]+@(?!example\.com)[\w-]+\.[a-z]{2,}/i);
if (pii) die(`Output contains what looks like personal data: "${pii[0]}". Redact it in the source screens.`);
if (/(src|href)="https?:\/\//.test(page.replace(/<a [^>]*>/g, ''))) die('Output still references a remote file.');
const size = Buffer.byteLength(page);
if (size > BUDGET) die(`Output is ${(size / 1048576).toFixed(1)} MB, over the 12 MB budget. Use --placeholder-images or fewer states.`);
const outDir = `handoff/${FEATURE}/dist`;
await mkdir(outDir, { recursive: true });
const out = `${outDir}/${FEATURE}-v${d.version}.html`;
await writeFile(out, page);
console.log(`✓ ${out}: ${(size / 1048576).toFixed(2)} MB, ${sec.filter((x) => !x.excluded).length} sections (${sec.filter((x) => x.excluded).map((x) => `${x.id}: ${excluded[x.id]}`).join('; ') || 'none excluded'}), ${(d.open_questions ?? []).length} open question(s), QA ${report.verdict}${fellBack ? `, ${fellBack} image(s) fell back to placeholders` : ''}`);
