# iOS app icons — what Apple asks for

Source: Apple Human Interface Guidelines, **App icons**
(https://developer.apple.com/design/human-interface-guidelines/app-icons) and Xcode's asset catalogue
format (https://developer.apple.com/documentation/xcode/configuring-your-app-icon). Re-read both before a
release: Apple changes this page with most major iOS versions. Last reviewed for this skill: 2026-10-13 (page's own
change log: "June 9, 2025 — Updated guidance to reflect layered icons … Liquid Glass").

**Reading the HIG page:** it is rendered by JavaScript, so a plain fetch gets an empty shell. Its text is at
`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/app-icons.json` (Apple's DocC data).

## What Apple says about placing the logo (quoted)

- Shape: "In iOS, iPadOS, and macOS, icons are square, and the system applies masking to produce rounded corners."
- "Produce appropriately shaped, unmasked layers … provide square layers so the system can apply rounded corners.
  Providing layers with pre-defined masking negatively impacts specular highlight effects and makes edges look jagged."
- "Keep primary content centered to avoid truncation when the system adjusts corners or applies masking … use the grids
  in the app icon production templates" (Apple Design Resources). **No numeric safe zone is given.**
- "Prefer clearly defined edges in foreground layers … avoid soft and feathered edges."
- "Let the system handle blurring and other visual effects … no need to include specular highlights, drop shadows
  between layers, beveled edges, blurs, glows."
- "Prefer vector graphics when bringing layers into Icon Composer."
- Specifications table: iOS / iPadOS / macOS — square layout, rounded-rectangle after masking, **1024 × 1024 px**, layered,
  appearances "Default, dark, clear light, clear dark, tinted light, tinted dark".
- Appearances: "the system automatically generates variants you don't provide"; "keep your icon's core visual features the
  same in the default, dark, clear, and tinted appearances"; "Use your light app icon as the basis for your dark icon …
  Color backgrounds generally offer the greatest contrast in dark icons."
- "Include text only when it's essential to your experience or brand" — prefer the symbol over the wordmark.

## The rules the generator enforces

| Rule | Value | Check |
|---|---|---|
| Master size | **1024 × 1024 px**, square | size, error |
| Alpha | **none** on the light icon and every legacy size; App Store Connect rejects an icon with alpha | `ios-opaque`, error |
| Corners | square — iOS applies its own continuous-corner mask. Never pre-round | by construction |
| Colour space | sRGB or Display P3, PNG | PNG written as sRGB |
| Effects | no baked shadow, gloss or border; the system adds depth (and Liquid Glass from iOS 26) | rule, not checked |
| apple-touch-icon (web) | 180 × 180, opaque (iOS fills transparency with black) | `opaque`, error |

## Two catalogue layouts

**Single size (Xcode 14+, default here, `ios.mode: "single"`).** One 1024 image per appearance; Xcode
generates every device size at build time. From Xcode 16 / iOS 18 the catalogue takes three appearances:

| Appearance | Contents.json | What the generator makes |
|---|---|---|
| Any (light) | no `appearances` key | brand background + mark |
| Dark | `{"appearance": "luminosity", "value": "dark"}` | `darkBackground` + `marks.dark` (or the mark). `darkTransparent: true` writes it with a transparent background so iOS draws its own dark backdrop |
| Tinted | `{"appearance": "luminosity", "value": "tinted"}` | greyscale: white silhouette of the mark on black (or `marks.tinted` desaturated). iOS colours it with the user's tint |
| Clear (light / dark) | not written | iOS 26 generates them ("the system automatically generates variants you don't provide"). Design them in Icon Composer if the generated ones look wrong |

**All sizes (`ios.mode: "all-sizes"`).** The classic per-slot catalogue for old pipelines: iPhone 20/29/40/60 pt
@2x @3x, iPad 20/29/40/76 pt @1x @2x, 83.5 pt @2x, App Store 1024. No dark or tinted (the validator notes it).

## Icon Composer (Xcode 26+, Liquid Glass)

From iOS 26 Apple's recommended path is an `.icon` file made in **Icon Composer**: layered artwork (a
background and up to four groups of foreground layers) on a 1024 canvas, previewed in Default, Dark, Clear and
Tinted. The generator does **not** write `.icon` files (the format is Apple's and changes with Xcode); it writes
the layers to drop in:

- `ios/icon-composer/background.png` — the background (or set the colour in Icon Composer)
- `ios/icon-composer/foreground-source.svg` — the original vector (preferred: Icon Composer keeps it sharp)
- `ios/icon-composer/foreground.png` — the mark placed on the 1024 canvas at the iOS fill

A designer assembles, checks the four appearances, saves the `.icon` into the Xcode project. Until a team adopts
it, the asset catalogue ships and iOS 26 applies its glass treatment to that.

## Mark size

Apple publishes no safe-zone number for the logo ("keep primary content centered … use the grids in the app icon
production templates"). `ios.fill` is **this skill's default**, not Apple's: check it against Apple's template grid and in
Icon Composer. Default `ios.fill = 0.60` (the mark's longest side is 60 % of the canvas),
which keeps most glyphs clear of the corner mask. A tall or wide mark may need 0.52–0.68; judge it in the preview
and in Xcode, not by the number.

## Not covered

watchOS (circular, separate sizes), macOS (its own shape and shadow), tvOS (layered parallax), visionOS (3D layers),
iMessage sticker apps and App Clips. Ask for them as a separate job; the HIG page lists their sizes.
