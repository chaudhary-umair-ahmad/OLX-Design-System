// Renders screens and the prototype from the embedded data: one copy of the CSS and fonts,
// composed into each iframe at runtime, so the file stays small.
(() => {
  const data = JSON.parse(document.getElementById('data').textContent);
  const doc = (screen, state, extra = '') => {
    const d = data.docs[screen];
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=${d.width}"><style>${data.css}\n${d.css}</style></head><body>${d.states[state] ?? d.states.default ?? Object.values(d.states)[0]}${extra}</body></html>`;
  };
  // State frames: scale each screen to its card.
  // Desktop frames show a 900px-tall viewport, mobile frames an 844px one, scaled to the card width.
  const fit = () => document.querySelectorAll('.frame').forEach((f) => { const w = Number(getComputedStyle(f).getPropertyValue('--w')); const s = Math.min(1, f.clientWidth / w); f.style.setProperty('--scale', s); f.style.setProperty('--h', Math.round((w > 600 ? 900 : 844) * s) + 'px'); });
  document.querySelectorAll('iframe[data-screen]').forEach((ifr) => { ifr.srcdoc = doc(ifr.dataset.screen, ifr.dataset.state); });
  fit(); addEventListener('resize', fit);

  // Prototype: one frame per platform; tappable triggers are outlined, the rest are step buttons.
  document.querySelectorAll('.proto').forEach((box) => {
    const flow = data.flows[box.dataset.platform];
    const ifr = box.querySelector('iframe');
    const where = box.querySelector('.proto__where');
    const steps = box.querySelector('.proto__steps');
    const node = (id) => flow.screens.find((s) => s.id === id);
    const go = (id) => {
      const n = node(id); if (!n) return;
      const out = flow.transitions.filter((t) => t.from === id);
      const hook = `<script>(() => { const T = ${JSON.stringify(out.map((t) => ({ to: t.to, trigger: t.trigger })))};
        const find = (t) => { try { const q = document.querySelector(t); if (q) return q; } catch {} return [...document.querySelectorAll('a,button,[role=button]')].find((e) => e.textContent.trim() === t); };
        for (const t of T) { const el = find(t.trigger); if (!el || el.closest('[hidden]')) continue; el.style.outline = '3px solid #23e5db'; el.style.outlineOffset = '2px'; el.addEventListener('click', (e) => { e.preventDefault(); parent.postMessage({ proto: ${JSON.stringify(box.dataset.platform)}, to: t.to }, '*'); }); }
        document.addEventListener('click', (e) => { if (e.target.closest('a')) e.preventDefault(); });
      })();<\/script>`;
      const d = data.docs[n.screen];
      ifr.style.width = d.width + 'px';
      const scale = Math.min(1, box.querySelector('.proto__frame').clientWidth / d.width);
      ifr.style.transform = `scale(${scale})`; ifr.style.transformOrigin = '0 0'; ifr.style.height = (640 / scale) + 'px';
      ifr.srcdoc = doc(n.screen, n.state, hook);
      where.textContent = `${n.title ?? n.id} · ${n.screen} / ${n.state}`;
      steps.innerHTML = '';
      for (const t of out) { const b = document.createElement('button'); b.textContent = `${t.trigger} → ${node(t.to)?.title ?? t.to}${t.kind ? ` (${t.kind})` : ''}`; b.onclick = () => go(t.to); steps.append(b); }
      const restart = document.createElement('button'); restart.textContent = '↺ Start'; restart.onclick = () => go(flow.entry); steps.append(restart);
    };
    addEventListener('message', (e) => { if (e.data?.proto === box.dataset.platform) go(e.data.to); });
    go(box.dataset.entry);
  });
})();
