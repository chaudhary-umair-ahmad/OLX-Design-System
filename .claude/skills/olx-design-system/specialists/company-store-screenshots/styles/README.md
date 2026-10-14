# Styles

Twenty-six named visual styles: 01–18 from the upstream skill (the same set as
parthjadhav.com/products/app-store-screenshots/styles), and 19–26 written for company products (marketplaces,
property, delivery, fintech, SaaS) from 2025–26 store practice: one real-UI story across the first three frames,
outcome headlines under five words, one callout per frame, frameless options for Google Play, and no invented
numbers. Each `NN-<slug>.md` is the full spec: palette,
typography, headline emphasis, layout rhythm, decoration, copy tone and hard quality rules. `_QUALITY_BAR.md`
holds the rules shared by every style. **Read `_QUALITY_BAR.md` and the chosen spec before designing.**
`styles.json` is what the scaffold reads.

## Three modes (asked at intake, SKILL.md Step 1-F)

| Mode | Colours | Fonts | From the style | When |
|---|---|---|---|---|
| **Brand only** (default) | brand profile | brand | nothing; restrained scene | regular releases, when in doubt |
| **Brand + style** (recommended when the user wants a look) | brand profile, mapped onto the style's roles | brand | layout rhythm, headline emphasis behaviour, phone framing and crop, backdrop, decoration type, copy tone | most "make it feel more like X" asks |
| **Full style** | the style's own palette (editor preset with the slug as id) | the style's fonts (import them, Google Fonts or licensed) | everything | a campaign, seasonal or sub-brand deck the brand owner signs off; flagged off-brand in the hand-off |

### Mapping a style onto a brand (Brand + style)

The specs already allow a "brand swap"; do it like this:

- The style's **one accent / signal** → the brand `accent`, only if it passes the same contrast pairs the spec
  lists (e.g. Swiss: accent text only on the dark surface, a block with dark text on light). If it fails, the
  accent becomes a block, never text.
- Style **paper / light ground** → brand `bg`. Style **ink / night ground** → brand `bgAlt` (dark styles invert
  most slides on light-surface brands; the scaffold does this).
- **Extra decorative colours** in the spec (second accents, aurora tints, sticker colours) → brand neutrals or
  tints of the brand's secondary colour. If the profile says `accentAsDecoration: false`, the accent is never decoration.
- Fonts: brand font at the spec's weight and tracking where the face has it; otherwise the nearest weight.
  Note in the hand-off that the style's own face was replaced.
- Keep the spec's **hard quality rules** (phone size, tilt, crop, grid, one-signal rule): they are what makes the style.

## Builder

**Swiss Grid Bold has a builder** (`../scripts/build-style.mjs`, `"builder": true` in `styles.json`): give it a
`copy.json` and a brand profile and it draws the grid, index row, signal blocks, data column, proof band, figure
captions, registration marks and hard-cropped upright phones as editable elements, in that brand's colours and font.
Tested on a light brand (red signal, white type) and a dark-only brand (green signal, near-black type).

**Bento Keynote Grid has a builder too** (`--style bento-keynote-grid`): rounded tiles on the 12-column grid, one
tile on the brand colour per screen, a tall stage tile the phone rises out of (cropped at its bottom edge), headline
above with one emphasis line in the accent (the spec's gradient phrase becomes the accent, since many brands forbid
gradients). Three layouts (`crown`: tiles above the stage, `floor`: tiles below, `split`: headline beside a tall brand
tile); tiles are `label`, `stat` or `list` and carry only the words in `copy.json`. Tested on a dark-only brand.

**Map-Led Local has a builder** (`--style map-led-local`): one invented vector map (land, roads, one river; three
tones kept quiet at 1.10–1.30:1) drawn once and sliced so it continues across every seam, one accent pin and one
chip per screen, a feathered scrim behind the headline, a dotted route from screen 2's pin to screen 3's, and a closer
with the app name, an ICON placeholder and a legal line. Layouts `pin`, `side-right`, `side-left`, `closer`. Dark
grounds get the spec's night map; chips on a dark map use the next dark surface, not white. Chips carry words from
the capture or `[PLACEHOLDERS]`, never invented distances or times. Tested on a dark-only brand.
Other styles are applied by hand from their spec; add a recipe to `build-style.mjs` to give a style a builder.

## Brand fit

| Fit | Styles | Meaning |
|---|---|---|
| **yes** | Hand-Drawn Editorial, Liquid Glass Aurora, Swiss Grid Bold, Neon Athletic Night, Magazine Cover Editorial, Candy Pop Social, Midnight Glow Pro, Bento Keynote Grid, Panoramic Story Strip, Oversized UI Crop, Floating Card Stack, Map-Led Local, Trust Ledger | Built from type, layout, backdrop and real UI. Works in Brand + style mode. |
| **partial** | Risograph Zine, Colour-Coded Suite | Risograph: halftone and misregistration textures are fine; no drawn figures. Colour-Coded Suite: needs the brand's own category colours (else steps of the accent). |
| **artwork** | Retro Rubberhose Mascot, Moody Curated Dating, Paper Sticker, Dreamy Pastel Couples, Glossy 3D Creator, Soft Clay Wellness, Toybox Primary, Quiet Japandi, Vintage Travel Poster, Lifestyle Photo Hero, Product Cutout Shelf | Needs mascots, 3D props, illustration or lifestyle photography. Only with **artwork the user supplies** (or licensed photography). Don't generate mascots or illustration to fill the gap; a generated photo plate is labelled a proposal and never shown as real. |

## Recommended by category

| Category | First pick | Also try |
|---|---|---|
| Classifieds | Bento Keynote Grid | Panoramic Story Strip, Map-Led Local, Colour-Coded Suite (multi-vertical), Swiss Grid Bold |
| Motors | Neon Athletic Night | Midnight Glow Pro, Swiss Grid Bold, Lifestyle Photo Hero, Map-Led Local |
| Jobs | Swiss Grid Bold | Hand-Drawn Editorial, Bento Keynote Grid, Floating Card Stack |
| Real estate | Map-Led Local | Lifestyle Photo Hero, Magazine Cover Editorial, Swiss Grid Bold, Trust Ledger (investment) |
| Rentals | Lifestyle Photo Hero | Map-Led Local, Magazine Cover Editorial, Liquid Glass Aurora |
| E-commerce | Product Cutout Shelf | Floating Card Stack, Bento Keynote Grid, Candy Pop Social |
| Quick commerce | Product Cutout Shelf | Colour-Coded Suite, Map-Led Local, Candy Pop Social |
| Fintech | Trust Ledger | Oversized UI Crop, Swiss Grid Bold, Midnight Glow Pro, Colour-Coded Suite |
| SaaS / B2B | Oversized UI Crop | Midnight Glow Pro, Bento Keynote Grid, Trust Ledger |

**Google Play:** Play discourages device frames and heavy promo text. Oversized UI Crop is frameless by design;
Panoramic Story Strip, Floating Card Stack, Map-Led Local and Trust Ledger each define a frameless Play variant,
recorded in the hand-off as an exception to `_QUALITY_BAR.md` §7.

Upstream's own picks for other app types are in `../references/upstream-style-prompts.md`.

## Letting the user see them

- Names and one-line summaries: `styles.json` (show them as options at intake).
- In the editor: the **theme picker** has a preset per style (Full style), and **Style Lab** shows four complete
  looks side by side. In Brand + style mode, lock **Colors** and **Type** in Style Lab so only layout and scene vary.
- Upstream's gallery of each style is on the web page above (not reachable from every environment).

## Adding a style

Write `27-<slug>.md` with the same headings as the others (hard quality rules, palette with verified contrast
pairs, typography, headline emphasis, layout rhythm, decorative accents, copy tone), add it to `styles.json`
with its brand fit and editor scene, and to the tables above.
