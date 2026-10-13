// Build handoff/content/fixtures.json: real OLX listing content taken from the
// captured pages (site/pages), for designs that need believable data. Every value is
// copied from a capture, never made up: titles, prices, locations, "x days ago",
// specs and photo URLs. Phone numbers and names are already redacted at capture.
//
//   node scripts/build-fixtures.mjs     (npm run fixtures)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const index = JSON.parse(await readFile('site/index.json', 'utf8'));
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const field = (card, label) => { const m = card.match(new RegExp(`aria-label="${label}"[^>]*>([\\s\\S]*?)</(?:div|span|p)>`)); return m ? text(m[1]) : undefined; };
const SPECS = ['Year', 'Mileage', 'FuelType', 'Bedrooms', 'Bathrooms', 'Area'];

const seen = new Set();
const listings = [];
for (const p of index.pages) {
  const file = `site/pages/${p.id}/${p.viewport}.html`;
  if (p.viewport !== 'desktop' || !existsSync(file)) continue;
  const html = await readFile(file, 'utf8');
  for (const [card] of html.matchAll(/<article\b[\s\S]*?<\/article>/g)) {
    const title = card.match(/aria-label="Cover photo"[^>]*/) ? card.match(/<img[^>]*alt="([^"]+)"[^>]*aria-label="Cover photo"/)?.[1] : undefined;
    const price = field(card, 'Price');
    const location = field(card, 'Location');
    if (!title || !price || !location || seen.has(title)) continue;
    seen.add(title);
    const specs = Object.fromEntries(SPECS.map((s) => [s.toLowerCase(), field(card, s)]).filter(([, v]) => v));
    listings.push({
      category: p.cat ?? p.id,
      title: text(title),
      price,
      location,
      posted: field(card, 'Creation date'),
      ...(Object.keys(specs).length ? { specs } : {}),
      featured: /aria-label="Featured"/.test(card) || undefined,
      photo: card.match(/<img[^>]*src="(https:\/\/images\.olx\.com\.pk[^"]+)"/)?.[1],
      source: file,
    });
  }
}
const by = (k) => [...new Set(listings.map((l) => l[k]).filter(Boolean))];
const out = {
  note: 'Copied from captured olx.com.pk pages (site/pages). Use these instead of inventing content. Rebuild: npm run fixtures.',
  generated: new Date().toISOString().slice(0, 10),
  counts: { listings: listings.length, locations: by('location').length },
  formats: {
    price: ['Rs 54,999', 'Rs 9.75 Lac', 'Rs 21 Lacs', 'Rs 3.10 Crore'],
    posted: ['39 minutes ago', '3 hours ago', '1 day ago', '2 weeks ago'],
    location: 'Area, City (e.g. "Gulberg, Lahore")',
  },
  listings,
};
await mkdir('handoff/content', { recursive: true });
await writeFile('handoff/content/fixtures.json', JSON.stringify(out, null, 1) + '\n');
console.log(`handoff/content/fixtures.json: ${listings.length} listings, ${out.counts.locations} locations`);
