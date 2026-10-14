# Icons

## House set first

`assets/icons/` holds 133 SVGs captured from olx.com.pk (index with source and the pages they appear on:
`assets/index.json`). Also `assets/css-icons/`, `assets/categories/` (category images) and `assets/logos/`.

Search before drawing anything:

```sh
ls assets/icons | grep -i -E 'heart|fav|chat|call|share|filter'
node -e "const a=require('./assets/index.json').assets;console.log(a.filter(x=>/heart/i.test(x.name)).map(x=>x.file+'  '+x.usedOn.slice(0,3)))"
```

Examples: `call.svg`, `chat-bubble.svg`, `camera.svg`, `calendar.svg`, `bedrooms.svg`, `bathrooms.svg`, `area.svg`,
`arrow-left.svg`, `chevron-down.svg`, `close.svg`, store badges `badge-app-store.svg`, `badge-google-play.svg`.

## Rules

- Colour comes from `currentColor`, set through a token (`--olx-text`, `--olx-icon-brand`). No hex in the SVG.
- Sizes on live: 16, 20, 24 px. Hit area at least 24 px even when the glyph is 16 (see `design-interaction`).
- An icon-only button needs an `aria-label` (QA `a11y.label`). Decorative icons get `aria-hidden="true"`.
- One style: OLX's filled and outlined glyphs as captured. Don't mix in Material, Heroicons or emoji.
- Category tiles use the captured category images, not icons.

## When nothing fits

1. Check the captures again: the icon may be on a page not yet in `assets/` (search `site/pages/*/*.html`).
2. If it's genuinely new, match the house set: 24 px grid, the same stroke weight and corner style. Put it in `handoff/<feature>/assets/`, log it in `PROPOSALS.md`, and say it's new.
3. Never take a brand logo from a search result. Brand logos for Motors come from `assets/logos/` or Simple Icons (as the repo already does).
