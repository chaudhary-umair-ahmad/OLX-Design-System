# Web — favicons, PWA icons, manifest, share images

Sources (last reviewed for this skill 2026-10):
- Google Search favicon guidelines: https://developers.google.com/search/docs/appearance/favicon-in-search
- Web app manifest (W3C) and maskable icons: https://www.w3.org/TR/appmanifest/ , https://web.dev/articles/maskable-icon
- Apple web app icons: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
- Open Graph: https://ogp.me ; X cards: https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image

## What the kit writes (`web/`)

| File | Size | Why |
|---|---|---|
| `favicon.ico` | 16, 32, 48 inside | every browser, `/favicon.ico` requests, Windows shortcuts. Google Search wants a square multiple of 48 px |
| `favicon.svg` | vector | modern browsers; sharp at any zoom. From an SVG mark only. With `web.faviconDarkMark` it switches on dark tabs via `prefers-color-scheme` (Chrome, Firefox; Safari uses the PNG/ICO) |
| `favicon-16/32/48/96.png` | | PNG fallbacks; 96 is the `<link>` in the snippet |
| `apple-touch-icon.png` | 180, opaque | iOS "Add to Home Screen"; iOS rounds it, transparency turns black |
| `web-app-manifest-192/512.png` | `purpose: any` | install prompts, desktop PWA; shape baked in (`web.anyShape`, default iOS-like rounding) |
| `web-app-manifest-maskable-192/512.png` | `purpose: maskable` | Android home screen; full-bleed background, mark inside the **40 % radius safe circle** (error if not) |
| `site.webmanifest` | | name, short name, icons, `theme_color`, `background_color`, `display`, `start_url` |
| `head-snippet.html` | | the `<link>`/`<meta>` tags, in this order: ICO, SVG, PNG, apple-touch-icon, manifest, theme-color |

## Favicon on tabs

A transparent favicon takes the tab as its background. The validator checks it against Chrome's light tab
(#FFFFFF) and dark tab (#202124): a mark with dark parts (a charcoal dot, black type) loses them on dark tabs.
Fixes: `web.faviconDarkMark` (SVG only), `web.faviconStyle: "tile"` (mark on the brand background, readable on
any tab), or a simplified `marks.favicon`. 16 px is ~1 % of the master: thin strokes and wordmarks vanish, so a
full logo is never a favicon.

## Social share (`social/`, optional)

`og-image.png` 1200 × 630 (Facebook, LinkedIn, WhatsApp, X `summary_large_image`), `og-square.png` 1200 × 1200.
The wordmark (`marks.social`) is centred inside 56 % × 40 % of the canvas so platform crops do not reach it. Limits:
X 5 MB, Facebook / LinkedIn 8 MB; URLs in the tags must be absolute HTTPS. These are **brand-only** share images;
campaign or page-specific share art is a design job (`design-prompt-images` / `feature-design`), not this skill.

## Legacy, deliberately left out

`mstile-*.png` / `browserconfig.xml` (Windows 8/10 tiles, unused by Edge since Chromium) and Safari `mask-icon`
(pinned tabs use the favicon since Safari 12). Add them only if a team still asks.
