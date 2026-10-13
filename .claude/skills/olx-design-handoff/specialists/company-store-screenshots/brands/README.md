# Brand profiles

One file per product. A profile is the only place a store-screenshot deck takes brand values from.
Each value names its source; a value without one doesn't belong here.

| File | Product | Source of values | Theme id | Font id |
|---|---|---|---|---|
| `olx-pk.md` | OLX Pakistan (olx.com.pk apps) | This repo: `css/tokens.css`, `tokens/tokens.json` — **measured** (website) | `olx-pk` (injected by the scaffold) | `self-hosted` (Geomanist Medium) |
| `_new-brand.md` | template for the next product | — | — | — |

Profile fields the scaffold reads besides the theme: `surface` (`light`/`dark`, so dark styles invert slides on
light brands), `headlineWeight`, `maxHeadlineWeight` (the heaviest weight the brand allows; caps a style's weight),
`accentAsDecoration` (`false` = the accent is never glow, blob or wash; set `theme.sceneTint` to the neutral that
backdrop light uses instead — OLX uses white).

Optional `claudeDesign` (for publishing to Claude Design): `designSystem` (the Design System artifact url that hosts
the brand fonts), `folder` (its install folder name), `fontStack`, and `fonts` (`family`, `path` inside that system,
`weight`). The converter copies those fonts from the design system instead of uploading them. A free font the system names but doesn't ship (e.g. Manrope, OFL): `googleFonts` = its Google Fonts css2 URL instead.

## Adding a product (no code changes)

SKILL.md Step 1 collects the answers; this is where they go.

1. Copy `_new-brand.json` and `_new-brand.md` to `<id>.json` / `<id>.md`.
2. Fill them **only** from the product's own design system (token file, Figma library, brand skill, live app) and
   the user's answers. `source` names where every value came from; unknown stays unknown and you ask.
3. Font: one licensed file for headlines goes in `font.importFile` (it lands in the editor's imported-font
   slot). For a full multi-weight or two-script stack, add a `brand-<id>` entry to the template like the
   built-in brands (`SCREENSHOT_FONTS`, `ScreenshotFontId`, `@font-face` in `globals.css`).
4. Run the scaffold into a scratch folder: it refuses placeholders and malformed colours and injects the theme.
5. Add a row to the table above.
