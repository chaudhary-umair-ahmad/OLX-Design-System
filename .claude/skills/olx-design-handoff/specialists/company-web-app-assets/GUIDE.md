> **OLX Pakistan web and app icons (inside olx-design-handoff).** This is the company-web-app-assets kit with only the
> OLX Pakistan config (plus the blank `_new-product.json`). Paths below are inside this skill's folder. Run the
> generator from the **OLX-Design-System repo root**: the config points at `handoff/brand/olx-logo-*.svg`.

## OLX Pakistan: what is already decided

| | OLX Pakistan |
| --- | --- |
| Config | `products/olx-pk.json`, **unverified**: not yet compared with the shipping store icon (App Store Connect / Play Console). Ask for it at intake and confirm background and mark size before setting `verified` |
| Mark | the OLX wordmark from the olx.com.pk header (`assets/icons/logo-olx.svg`, `currentColor`), saved with a solid fill as `handoff/brand/olx-logo-petrol.svg` (`#002f34`) and `olx-logo-white.svg`. Never redraw it |
| Background | white `#FFFFFF`; iOS dark surface and dark-tab favicon: petrol `#002F34` with the white mark |
| Open question | the shipping app icon may be a different lock-up (for example the mark on a coloured tile). The store icon wins over this config: ask for it |
| Badge font | Geomanist Medium (600) from `fonts/` if a badge is needed (licensed: badged icons are internal builds only). Never Bold |
| New colours or proportions | a proposal: log it in `handoff/<feature>/PROPOSALS.md` and say it out loud |

Needs Python 3 with Pillow and CairoSVG (`pip install pillow cairosvg`; `scripts/check_dependencies.py` checks).

Run: `python3 .claude/skills/olx-design-handoff/specialists/company-web-app-assets/scripts/generate_assets.py --config .claude/skills/olx-design-handoff/specialists/company-web-app-assets/products/olx-pk.json --root . --out <folder>`
(or `npm run app-assets -- --out <folder>`).

---


# Web and app assets — every product in the company

An app icon is the most-seen piece of a brand and the easiest to get subtly wrong: an alpha channel
App Store Connect rejects, a logo a Samsung launcher clips, a favicon that vanishes on a dark tab,
a coloured notification icon that turns into a white square. This skill turns **one approved mark**
into every size each platform asks for, checks every file against that platform's rules, and hands
the dev team a folder they can merge without asking a designer what goes where.

Built on the open-source `web-asset-generator` skill (MIT, `LICENSE-upstream`, `ATTRIBUTIONS.md`).
Upstream made favicons, three PWA sizes and OG images from a logo, an emoji or text. Here:

| Upstream | Here | Why |
|---|---|---|
| Emoji and text-only favicons | **Only the product's official mark**, with its source recorded | A brand icon is never improvised; emoji icons are off-brand by definition |
| 180 / 192 / 512 "app icons" | Full **iOS** catalogue (light, dark, tinted; Icon Composer layers; legacy all-sizes) and full **Android** `res/` (adaptive + monochrome, five densities, legacy, round, notification, splash, Play 512) | Those three files are not an app icon set |
| Logo scaled to a fixed share of the canvas | Safe-zone fits measured from the mark's real shape (farthest visible pixel), per platform | Launcher masks are circles; a box fit clips or shrinks the mark |
| Validation of size and format | Plus alpha rules, safe-zone clipping, notification colour, dark-tab and dark-icon contrast, provenance; one **READY / NOT READY** verdict | A kit that looks fine and fails review is the failure mode |
| Purple default colours | No default brand colour. Colours come from the product's design system or a named source | Never fill a brand value from memory |

Platform numbers and their sources: `specialists/company-web-app-assets/references/ios.md`, `specialists/company-web-app-assets/references/android.md`, `specialists/company-web-app-assets/references/web.md`.
The hand-off folder: `specialists/company-web-app-assets/references/export-layout.md`. Upstream's specification page is kept as
`specialists/company-web-app-assets/references/upstream-specifications.md` for social-image limits.

## Step 1 — intake (always, before generating anything)

**Never generate on a guess.** Ask in rounds with the **AskUserQuestion** tool (chips, not free text, for
every multiple-choice question; at most four questions per call). Skip what the user already said in this
conversation, and play back what you took from it. Free-text answers (file paths, colours) go in the
"Other" field or a plain follow-up.

### Round 1 — what and for whom

1. **Product** — header `Product`. Offer the profiles in `specialists/company-web-app-assets/products/` (today: OLX Pakistan) plus the
   "Another product". A product without
   a profile gets one in Step 2. Also read `specialists/company-store-screenshots/brands/<id>.md` when it exists: the
   colours and sources there are already confirmed with the user.
2. **What do you need?** — header `Deliverables`, **multiSelect**:
   - *Website favicons + PWA* — ICO, SVG, PNG 16–96, apple-touch-icon, manifest icons (any + maskable)
   - *iOS app icon* — 1024 catalogue (light / dark / tinted) + Icon Composer layers
   - *Android app icon* — adaptive + themed layers, all densities, legacy, Play Store 512
   - *Extras* — notification icon, Android 12 splash icon, social share images, staging/debug badges
3. **Is this a new icon or the shipping one re-exported?** — header `Situation`:
   - *Re-export the shipping icon* — sizes for a new platform, a missing density, a dev request
   - *Refresh / new mark* — the brand team changed the logo or the icon is being redesigned
   - *New product* — first icon for a product that has none
   - *Internal builds only* — badged staging / debug / beta icons
   A refresh or new mark needs a brand-owner sign-off before hand-off (record who in `approvedBy`).

### Round 2 — the mark (the one thing that cannot be guessed)

4. **Where is the official mark?** — header `Source`:
   - *Vector file (SVG)* (recommended) — "I'll attach it or give the path"
   - *Figma link* — read it with the Figma tools and export the frame as SVG
   - *Large PNG (1024 px+)* — transparent background
   - *From this repo / design system* — offer what exists (for OLX: `handoff/brand/olx-logo-petrol.svg`, the header wordmark)
   **No source → stop.** Never redraw, trace or approximate a logo, and never take one from a search result.
   A PNG under 1024 px, a JPG, or a mark with a baked-in background: say what it costs and ask for better.
5. **Which version of the logo goes in the icon?** — header `Mark`:
   - *Symbol only* (recommended for app icons) — the glyph without the wordmark
   - *Full logo with wordmark* — warn: unreadable below ~48 px and on watch / notification sizes
   - *Monogram / initial*
   - *A separate small-size mark* — a simplified glyph for 16–32 px favicons (`marks.favicon`)
6. **Variants you already have** — header `Variants`, **multiSelect**: *Dark-background version* (for iOS dark,
   dark browser tabs) · *Single-colour / mono version* (Android themed icons, notification, iOS tinted) ·
   *Wordmark for share images* · *None — derive them* (mono is derived from the mark's shape; a dark version
   cannot be derived — parts of the mark that disappear on dark get flagged).

### Round 3 — look and platform rules

7. **Icon background** — header `Background`: *Brand surface colour* (give the hex from the design system) ·
   *White* · *Brand gradient / image* (file) · *Same as the shipping icon* (read it from the store listing image
   the user supplies). Propose the colour from the design system and get it confirmed; check the mark against it
   (the generator warns under 3:1, WCAG 1.4.11).
8. **How big should the mark sit?** — header `Size`: *Platform default* (recommended: iOS 60% of the canvas,
   Android 92% of the 66 dp safe circle, PWA maskable 90% of the 40% safe circle) · *Larger* · *Smaller* ·
   *Match the shipping icon*. Show the preview and adjust `fill` values after the first run rather than debating
   numbers up front.
9. **Favicon on browser tabs** — header `Favicon`: *Transparent mark* (default; needs a dark-tab variant if the
   mark has dark parts) · *Mark on a rounded tile* (always readable, looks like the app icon) · *Separate small
   mark*.
10. **Platform targets** — header `Targets`, **multiSelect**, only for the platforms picked in Q2:
    *iOS: Xcode 16+ single size* (recommended; adds dark and tinted) · *iOS: legacy all sizes* (Xcode 13 and
    older pipelines, no dark/tinted) · *Android minSdk below 26* (keeps legacy PNGs; most apps) · *Android 26+
    only* (adaptive only).

### Round 4 — hand-off (only what applies)

11. **Environment badges** (if *Extras* or *Internal builds*) — header `Builds`, **multiSelect**: *Staging (STG)* ·
    *Debug (DEV)* · *Beta* · *None*. Badged sets are separate (`AppIcon-staging`, `src-staging/res`) and never
    reach a store.
12. **Where should the folder go, and who receives it?** — header `Hand-off`: *Zip for the dev team* · *Into
    this repo* (ask the path) · *Into the app repos* (only with the user's go-ahead; show the diff first) ·
    *Just show me*.
13. **Names** — the app's display name and short name (manifest `short_name`, ≤ 12 characters, shown under
    home-screen icons), notification icon resource name if the app already has one (`ic_stat_*`).

**Gate:** summarise the answers in one short table (product, deliverables, mark file and its source, variants,
background, favicon style, targets, badges, hand-off) and get a "yes". Blocking gaps: no official mark;
no colour from a named source; a refresh with nobody to sign it off. Non-blocking, repeated on every hand-off:
no dark variant, brand values unverified, not yet checked on a device.

## Step 2 — product profile (the config)

The intake becomes one JSON file the generator reads; it is also how a dev team re-runs the kit later.

- **Existing profile:** copy `specialists/company-web-app-assets/products/<id>.json`, check it against the answers, change only what changed.
- **New product:** copy `specialists/company-web-app-assets/products/_new-product.json` to `specialists/company-web-app-assets/products/<id>.json` and fill it **only** from Step 1.
  `source` and `markSource` name where every value came from. Leave `status: "unverified"` until the user has
  confirmed the colours and the mark against the design system or the shipping icon; then set `"verified"`.
- Every key is explained in `specialists/company-web-app-assets/products/README.md`. Paths resolve against `--root` (default: the current folder).

## Step 3 — generate

```bash
python3 specialists/company-web-app-assets/scripts/check_dependencies.py   # first time on a machine
python3 specialists/company-web-app-assets/scripts/generate_assets.py \
  --config specialists/company-web-app-assets/products/<id>.json --root . --out <product>-app-assets-<date> [--zip]
```

Exit code 1 = **NOT READY**. The console, `README.md` and `report.json` list every blocker. Pillow is the only
hard dependency; SVG marks need `cairosvg`, `rsvg-convert` or `inkscape` (the dependency check says how to
install one).

## Step 4 — look, then fix

1. **Open `preview.html`** (send it to the user with the file tool, `display: render`): tabs on light and dark,
   favicon at 16/32/48/96, iOS light/dark/tinted, the four Android launcher masks, maskable PWA, themed icon,
   notification, splash, Play, legacy, social, badged builds. Look at it yourself before showing it.
2. Read the report. Typical fixes, each a config change and a re-run, never a hand edit of an output file:
   | Finding | Fix |
   |---|---|
   | Outside the safe circle (Android, maskable, splash) | lower `android.fill` / `web.maskableFill` / `android.splashFill` |
   | Part of the mark disappears on a dark tab / dark icon | ask for a dark variant (`marks.dark`, `web.faviconDarkMark`) or use `faviconStyle: "tile"` |
   | Mark low-contrast on its background | a different background from the design system, or a variant — ask, don't invent a colour |
   | Notification icon not white | it is derived from `marks.monochrome`; supply a cleaner single-colour mark if detail is lost |
   | Favicon is mush at 16 px | `marks.favicon` = a simplified mark from the brand team |
3. Any new colour, variant or proportion that does not come from the design system is a **proposal**: say so
   out loud and, in this repo, log it in `handoff/<feature>/PROPOSALS.md` (new values are raised, never shipped silently).

## Step 5 — hand-off

Only a **READY** kit is handed over. Send the folder (or the `--zip`) and say, in this order: status; flags
(unverified brand values, missing dark variant, not checked on a device); what goes where (one line per
platform, from the kit's README); what still needs a person (brand sign-off for a refresh, device check in
Xcode / Icon Composer and on a Pixel and a Samsung). Then offer, with AskUserQuestion: *Add the web tags to a
codebase* (find the layout, show the diff, edit only on a yes) · *Copy into an app repo* (same: diff first) ·
*Done*.

Never write into an app repository, or push anything, without the user's explicit go-ahead in this conversation.

## Rules

- **The mark is never invented, redrawn or traced.** No source, no icon.
- **One mark, many sizes** — the generator places the same artwork everywhere; a platform that needs a
  different drawing (16 px favicon, notification silhouette, dark icon) gets a supplied variant, not an edit.
- **No rounded corners on iOS or Play icons** — the platforms mask them. No alpha on iOS icons or the
  apple-touch-icon. No drop shadows or gloss baked into adaptive layers.
- **Badged icons never reach a store.** They live in their own catalogue / flavour folder.
- **Account names and private data never go into a config, a README or a commit.**
- **Every claim in a hand-off is checked:** "READY" only from the report, "verified" only after the user
  confirmed the brand values.

## Files

| Path | What |
|---|---|
| `specialists/company-web-app-assets/scripts/generate_assets.py` | config → kit (web, iOS, Android, social, badged builds, preview, README, manifest) |
| `specialists/company-web-app-assets/scripts/validate_assets.py` | every check; also `python3 validate_assets.py <kit>` to re-check a kit |
| `specialists/company-web-app-assets/scripts/check_dependencies.py` | Pillow + an SVG rasteriser |
| `specialists/company-web-app-assets/products/` | one config per product; `_new-product.json` template; `README.md` key reference |
| `specialists/company-web-app-assets/references/` | platform specs with sources, export layout, upstream spec page |
| `LICENSE-upstream` | MIT licence of `web-asset-generator` |
