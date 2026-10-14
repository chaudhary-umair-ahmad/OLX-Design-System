# Product configs

One JSON per product: the intake answers in the form `scripts/generate_assets.py` reads. Copy
`_new-product.json` for a new product and fill it **only** from the intake and a named source.

| Product | File | Status | Notes |
|---|---|---|---|
| OLX Pakistan | `olx-pk.json` | unverified | OLX wordmark (petrol `#002f34`) on white; white wordmark on petrol for dark tabs and the iOS dark icon. Not yet compared with the shipping store icon: ask for it. Run from the repo root |

Colours and fonts for OLX Pakistan are in `../company-store-screenshots/brands/olx-pk.md`.

## Keys

| Key | Meaning |
|---|---|
| `id`, `name`, `shortName` | folder name; manifest `name`; `short_name` and the iOS home-screen title (≤ 12 characters) |
| `status` | `unverified` until the user confirms colours and mark against the design system or shipping icon, then `verified`. Unverified is flagged on every hand-off |
| `source`, `markSource`, `approvedBy` | provenance. `approvedBy` = the brand owner who signed off a refreshed or new icon |
| `targets` | any of `web`, `ios`, `android`, `social` |
| `marks.mark` | **required.** The official mark, SVG preferred, PNG ≥ 1024 px on transparency |
| `marks.favicon` | simplified mark for 16–96 px favicons (default: `mark`) |
| `marks.monochrome` | single-colour mark for Android themed icons, the notification icon and iOS tinted (default: the mark's silhouette) |
| `marks.dark` | variant for dark backgrounds (iOS dark appearance). Cannot be derived |
| `marks.tinted` | greyscale source for iOS tinted (default: white silhouette) |
| `marks.social` | wordmark for share images (default: `mark`) |
| `background` | `"#hex"`, `{"color": "#hex"}`, `{"gradient": ["#top", "#bottom"]}` or `{"image": "path"}` — the icon surface on every platform |
| `web.faviconStyle` | `transparent` (mark only) or `tile` (mark on the background, rounded; `faviconTileFill`, `faviconTileRadius`) |
| `web.faviconDarkMark` | SVG used by `favicon.svg` on dark tabs |
| `web.faviconFill`, `anyFill`, `anyShape`, `maskableFill` | mark size in the favicon (0.94), PWA `any` icon (iOS fill), its shape (`square` or a corner-radius fraction, default 0.2237), maskable (0.90 of the 40 % safe circle) |
| `web.themeColor`, `backgroundColor`, `display`, `startUrl` | manifest values |
| `ios.mode` | `single` (Xcode 14+, with `appearances`) or `all-sizes` (legacy catalogue, no dark/tinted) |
| `ios.fill` | longest side of the mark as a share of the 1024 canvas (0.60) |
| `ios.appearances` | `["dark", "tinted"]`, either, or `[]` |
| `ios.darkBackground`, `ios.darkTransparent` | dark icon surface; or transparent so iOS draws its own |
| `ios.iconComposerLayers` | write `ios/icon-composer/` layers (default true) |
| `android.fill` | share of the 66 dp safe circle's radius the mark may reach (0.92) |
| `android.legacy`, `round` | legacy 48 dp PNGs (needed when minSdk < 26), round variant |
| `android.legacySquare`, `legacyRadius` | legacy keyline square (152/192) and its corner radius (0.09) |
| `android.monochrome`, `notification`, `notificationName`, `splash`, `splashFill` | themed layer; notification icon and its resource name; Android 12 splash icon and its fill (0.90) |
| `social.background`, `maxWidth`, `maxHeight`, `alt` | share-image surface, logo box (0.56 × 0.40), alt text |
| `environments` | `[{"name": "staging", "label": "STG", "color": "#hex", "textColor": "#FFFFFF"}]` — badged internal builds |
| `badgeFont` | font file for the badge label (licensed brand font from the repo, else Pillow's default) |

Paths resolve against `--root` (the folder you run from). Absolute paths work too.
