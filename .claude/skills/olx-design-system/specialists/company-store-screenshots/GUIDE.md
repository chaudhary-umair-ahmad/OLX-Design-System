> **OLX Pakistan store screenshots (inside olx-design-system).** This is the company-store-screenshots kit with only
> the OLX Pakistan profile (plus the blank `_new-brand.*` template). Paths below are inside this skill's folder. Run
> the scripts from the **OLX-Design-System repo root**: the profile points at the licensed Geomanist files in `fonts/`.

## OLX Pakistan: what is already decided

| | OLX Pakistan |
| --- | --- |
| Profile | `brands/olx-pk.json` + `.md`, **measured** from `css/tokens.css` (the website; the apps are not measured) |
| Theme | `olx-pk`, injected by the scaffold: white surface, petrol ink `#002F34`, accent `#2456D6` (`--olx-link`), teal `#23E5DB` on petrol, muted `#406367` |
| Accent | one label or emphasis word per slide. No glows, blobs or washes (`accentAsDecoration: false`). The yellow/teal/blue ring is the Sell button's, used only as that button |
| Type | **Geomanist** Regular 400 and Medium 600 only; headlines 600 (`maxHeadlineWeight: 600`). Never Book, Bold or Thin. Licensed to OLX: decks are **INTERNAL** until marketing signs off |
| Icon | not in the repo: ask for the 1024×1024 store icon. Until then the feature graphic shows a dashed ICON placeholder. Icon exports: `company-web-app-assets` |
| Locale | English. Urdu is out of scope until it is asked for |
| Captures | the shipping OLX apps (iOS 6.9" simulator, an Android phone), a sample-data account, 9:41 status bar. Never the website captures in `site/pages/`, except as a draft that says so |
| Copy | OLX voice and formats from `specialists/design-copy/GUIDE.md`: `Rs 9.75 Lac`, real cities, `Chat`, `Sell` |
| Styles that suit | Bento Keynote Grid, Panoramic Story Strip, Map-Led Local, Swiss Grid Bold, Oversized UI Crop, Trust Ledger |
| Keep final sets | copy the PNGs and project JSON to `handoff/store/olx-pk/<release>/`; the hand-off folder comes from `scripts/package-handoff.mjs` |

---


# Store screenshots — every product in the company

Store screenshots are **advertisements, not documentation**. Each sells one idea in under a second at
thumbnail size. This skill gives you a real editor to make them in, branded per product and written per
category, so you never hand-code a page of mock-ups or guess a brand.

Built on the open-source `app-store-screenshots` skill by Parth Jadhav (MIT, `LICENSE-upstream`,
`ATTRIBUTIONS.md`). The editor in `specialists/company-store-screenshots/template/` is upstream's plus brand themes and brand font stacks.
Upstream's full manual is `specialists/company-store-screenshots/references/upstream-SKILL.md`: read it for migration of an old project, iPhone
Duo, Apple TV/Watch, Mac, CarPlay and the editor's internals. **Where the two disagree, this file wins.**

| Upstream | Here | Why |
|---|---|---|
| Starts scaffolding after a few questions | **Intake gate first**, then a **brand profile** built from the product's own design system | Guessing a brand is how a deck ends up off-brand |
| 18 named styles applied with their own palette and fonts | The same 18 plus 8 written for company products (panoramic strip, oversized UI crop, floating cards, lifestyle photo, colour-coded suite, map-led, product cutouts, trust ledger) in `specialists/company-store-screenshots/styles/`, asked at intake in **three modes**: brand only, **brand + style** (the style's composition in the brand's colours and fonts), or full style for campaigns. Each style is marked for brand fit and artwork needs | Products get a look without losing their brand; mascot and 3D styles need real artwork, not generated stand-ins |
| Decorative blobs and glows on most slides | Flat designed surface from the brand palette, no accent decoration by default | The brand colour means action or brand, not atmosphere |
| Award badges, star and install counts on the hero | Only claims with a **source and a date** | Store review and consumer law |
| Generic app-category copy | `specialists/company-store-screenshots/categories/` playbooks with compliance notes (fintech licence lines, delivery-time qualifiers, property ad licences) | Our products are regulated or trust-heavy |

## Step 1 — intake gate (always, before anything else)

**Do not scaffold, write copy or pick a colour until these are answered.** Ask in one message (use the
AskUserQuestion tool where it's available for the multiple-choice ones; free text for the rest). Skip only
what the user already stated in this conversation, and play back what you took from it.

**A. Product**
1. **Which product is this for?** Offer the profiles in `specialists/company-store-screenshots/brands/` (here: OLX Pakistan) plus "another product". For another product: its name as it appears on the store, and the market(s).
2. **Category** — classifieds, motors, jobs, real estate, rentals, e-commerce, quick commerce, fintech, SaaS/B2B
   (several allowed; ask which one this release leads with). Read `specialists/company-store-screenshots/categories/<category>.md`.

**B. Design system** (skip the questions an existing profile already answers, but confirm it's current)
3. **Which design system should the screenshots follow?** Accept any of: an attached file (tokens JSON/CSS,
   a style guide PDF), a Figma library link (read it with the Figma tools), a repo path, a brand skill on the
   account (e.g. `olx-pk-colors`), or the live website/app.
   - **If none is attached, ask where it lives.** If there truly is none: offer (a) extracting from the live
     website with the `extract-design-system` skill, (b) reading colours from the user's app captures, or
     (c) the user typing the brand colours. Mark the profile `status: unverified` and say so in the hand-off.
   - Never fill a brand colour from memory or because it "looks like" the brand.
4. **Brand colours** you'll use, confirmed: surface, text, the one accent, and the dark/inverted surface.
   Propose them from the design system and ask the user to confirm.

**C. Type**
5. **Which fonts does the product use?** Latin face and weights; Arabic / Urdu / other script face if the deck
   is localised.
6. **Do we have the font files and the licence to use them in marketing?** Ask for the files (.woff2/.woff/.otf/
   .ttf). If they can't be supplied, say plainly that the deck will not be on brand and agree a fallback with the
   user before going on. Never pull a licensed font from a CDN.

**D. Brand assets**
7. **Logo** (SVG) and the **store icon** (1024×1024 PNG from App Store Connect / Play Console).

**E. Style** (read `specialists/company-store-screenshots/styles/README.md`; offer the options, don't pick silently)
8. **Style mode** — *Brand only* (default: brand colours and fonts, calm flat scene) · *Brand + style* (a named
   style's layout rhythm, phone framing, backdrop and headline treatment, in the brand's colours and fonts) ·
   *Full style* (the style's own palette and fonts; for a campaign, seasonal or sub-brand deck, needs the brand
   owner's sign-off and is flagged off-brand).
9. **Which style?** (skip for Brand only) Lead with the three `specialists/company-store-screenshots/styles/README.md` recommends for the category, then
   offer "show all 26" with their one-line summaries from `specialists/company-store-screenshots/styles/styles.json`, or "describe your own" (then pick
   the closest spec as the base and say so). For a style marked **artwork** (mascot, 3D props, illustration,
   lifestyle photography), ask whether that artwork exists; if not, recommend a *yes*-fit style instead. Point out
   they can compare looks live in the editor's **Style Lab** after scaffolding.

**F. The deck**
10. **Stores and devices** — [App Store iPhone + Google Play phone]; iPad, Android tablets, feature graphic
   (1024×500), App Store creative asset, Mac?
11. **Captures** — where are the real screenshots of the **shipping app**? Device or simulator, native resolution,
   status bar 9:41 / full battery, **sample data only** (no real names, numbers, faces, chats, card numbers,
   addresses, plates). Never web pages, Figma frames or generated UI passed off as the app. No captures → stop and ask.
12. **Story** — 3 to 6 things this release should sell, most important first, and who it's for.
13. **Locales** — which languages, and who writes them. You draft English only; other languages come from a person.
14. **Claims** — any numbers, ratings, awards or rankings for the hero, each with a source and a date. For a
    regulated category (fintech, lending, insurance, property ads in markets that need a licence number): who in
    legal supplies the licence line and disclaimers?
15. **Number of screens** — [6]. Apple allows up to 10, Google Play up to 8.
16. **Where will designers work?** — *Claude Design* (a claude.ai canvas link: nothing to install; edit in the
    properties panel, comment, ask Claude for changes) · *Local editor* (runs on the designer's machine; the
    store-ready Export bundle) · *Both* [recommended: design and review in Claude Design, export from the editor].
    For Claude Design, which design-system artifact holds the product's fonts? (the brand profile's
    `claudeDesign.designSystem`, else `list` the Design System artifacts and ask; an organization default for a
    different product does not apply).

**Gate:** summarise the answers back in a short table (product, category, design-system source, colours, fonts
and whether files are in hand, assets, style mode and style, devices, locales, where designers work, open gaps), and get a "yes" before Step 2. Open gaps that
block: no captures; no colours from a named source; regulated category with no legal contact. Gaps that don't
block but get flagged on every hand-off: fonts not supplied, icon missing, translations pending.

## Step 2 — brand profile

Each product has `specialists/company-store-screenshots/brands/<id>.json` (what the scaffold reads) and `specialists/company-store-screenshots/brands/<id>.md` (sources and rules).

- **Existing profile:** re-read it, check it against what the user said in Step 1, update it if the design
  system changed (and note the date).
- **New product:** copy `specialists/company-store-screenshots/brands/_new-brand.json` and `_new-brand.md` to `<id>.*` and fill them **only** from the
  Step 1 answers and the design-system source. `source` names where every value came from. Colours must give
  AA contrast for the label and headline on their surfaces (check `fg` on `bg`, `fgAlt` on `bgAlt`, `accent` on
  `bg`, `accentAlt` on `bgAlt`). A new product's theme is injected into the editor at scaffold time, and its font
  goes through the editor's imported-font slot, so no template code changes.
- Profile here: `olx-pk` (measured in this repo).
  See `specialists/company-store-screenshots/brands/README.md`.

## Step 3 — scaffold

Scaffold **outside** this repo; the editor is its own Next.js app:

```bash
node specialists/company-store-screenshots/scripts/scaffold.mjs <brand> ~/store-screenshots/<brand>-<release> \
  [--category fintech] [--style swiss-grid-bold] [--style-mode brand-style|full] [--app-name "Name"] [--locales en,ar]
```

It validates the profile (refuses placeholders, unsourced or malformed colours), copies `specialists/company-store-screenshots/template/`, injects
the theme if it isn't built in, copies fonts (built-in brand stacks into `public/fonts/brand/`, or one
imported font), copies the icon, and seeds `app-store-screenshots.json` with theme, font, locales, a restrained
scene (solid surface, no decoration, light shadow, no tilt) and the category's starter arc as eyebrow labels.
With `--style` it applies the style's editor scene (backdrop, tilt, shadow, headline weight and case): in
`brand-style` mode on the brand theme, inverting most slides when a dark style meets a light brand and turning off
glow for brands whose accent is never decoration; in `full` mode it switches to the style's preset and tells you to
import the style's font. Themes may carry a `sceneTint` (OLX: white) so backdrop light and glow never use the
accent colour.

Then:

1. Install with the detected package manager (bun > pnpm > yarn > npm).
2. Put captures where upstream expects them, with `{locale}` in the path so each language shows its own captures:
   `public/screenshots/apple/iphone/{locale}/01.png …`, `public/screenshots/android/phone/{locale}/01.png …`.
   RTL captures come from the app running in that language, never a mirrored English capture.
3. Put the store icon PNG in `public/` and point `appIcon` at it.
4. Missing fonts: tell the user exactly which files go in `public/fonts/brand/` (or use **Font → Import font…**).
   Don't export on a fallback face.
5. Start the dev server and give the user the URL.

OLX's theme `olx-pk` is injected by the scaffold, and Geomanist comes in through the imported-font slot (the editor also
lists other company themes; don't use them for an OLX deck). Upstream's generic presets are still in the menus; don't use them for a branded deck.

## Step 4 — copy

Read `specialists/company-store-screenshots/categories/README.md` (rules for every category) and `specialists/company-store-screenshots/categories/<category>.md` (arc, what to show, what
not to claim). For OLX also apply `specialists/design-copy/GUIDE.md`. For each screen propose three
headlines (paint a moment / state an outcome / kill a pain), let the user pick, then tighten.

- One idea per headline, 3 to 5 words a line, 2 lines at most, readable at ~160 px.
- The capture beside it proves the headline.
- Money, units and places in the market's format from the brand profile.
- Regulated text (licence lines, representative examples, delivery qualifiers) goes in as a clearly marked slot
  until legal supplies it, and blocks export while empty.
- Other languages are marked *needs translator* until a person supplies them.

## Step 5 — design in the editor

**If a style was chosen:** read `specialists/company-store-screenshots/styles/_QUALITY_BAR.md`, then the style's spec, before touching the canvas. The
scaffold only sets the scene; the rest is yours to apply: the spec's layout rhythm (slide order and layouts), phone
size, crop and tilt rules, headline emphasis behaviour, decorative accents, and copy tone. In **Brand + style**,
map colours and fonts as `specialists/company-store-screenshots/styles/README.md` says (style signal → brand accent only where its contrast pairs pass;
extra decorative colours → brand neutrals) and keep the spec's hard quality rules.

Most specs need more than the scaffold's scene (Swiss: grid, index row, signal blocks, crops).

- **Styles with a builder** (`styles.json` `"builder": true`; today **Swiss Grid Bold**, **Bento Keynote Grid** and **Map-Led Local**): write the copy as a
  `copy.json` (format at the top of `specialists/company-store-screenshots/scripts/build-style.mjs`: per screen the section, figure name, headline lines,
  which line sits on the signal block, sub-line, capture file, phone position, optional data column or proof
  numeral) and run `node specialists/company-store-screenshots/scripts/build-style.mjs <project> --copy copy.json --brand <id|profile.json>`. It draws
  the signature parts as editable editor elements for **any** brand: surfaces from the theme (light/dark rhythm),
  the accent as the one signal, the text on it picked by contrast, headlines measured in the deck's own font so
  blocks fit, weight capped by the profile. Re-run after copy changes; then export, or convert to Claude Design
  (element-built decks convert exactly). Pass `--style bento-keynote-grid` for Bento: per screen a `layout`
  (crown / floor / split), 1–2 headline lines with one `emph` line, and `tiles` (label / stat / list, `brand` = the
  tile on the brand colour); unknown facts stay `[PLACEHOLDERS]`.
- **Other styles:** build those parts from the editor's own text and image elements so the deck stays editable, and
  measure text in the brand font so blocks fit.

**Always, in every mode** (truth, privacy, imagery):

- **Captures** are the shipping app with sample data. **Magnifier** for a small detail (price, Verified badge, fee,
  ETA); never redraw UI.
- **Overlays:** the profile's logo, official store badges. A lifestyle photo is licensed, or a generated plate
  labelled as a proposal (`design-prompt-images` rules). Never a generated product, listing, person, car or home
  presented as real; no generated mascots or illustration (artwork-fit styles need supplied artwork).
- **Cross-screen moment:** one at most in a 5–8 screen deck; never split text, prices, faces or critical UI.
- **RTL decks:** layouts and devices are not mirrored automatically. Check every Arabic/Urdu slide and apply the
  `rtl-arabic` skill; swap device side by hand where the LTR arrangement reads backwards.

**Brand, fixed** (Brand only and Brand + style; Full style replaces these with the spec's palette and fonts):

- Colours only from the brand profile; gradients only the brand's own.
- **Accent** colours the eyebrow label and at most one emphasised word or the style's one signal element. Where the
  profile says `accentAsDecoration: false` (OLX), no accent glows, blobs, washes or tinted backdrops.
- **Headline** in the brand font, never above the profile's `maxHeadlineWeight`.

**Defaults** (Brand only; a chosen style's spec overrides them):

- One inverted (`bgAlt`) slide in a 5+ deck.
- `decoration: none`, `glow: 0`, headline in the top 30–40% of the canvas.
- No two neighbouring layouts the same (`hero`, `device-bottom`, `device-top`, `two-devices`; `no-device` once at
  most); tilt on one `two-devices` slide at most.

**Style Lab:** in Brand only and Brand + style, lock **Colors** and **Type** first, so only layout and scene vary.

## Step 5b — publish to Claude Design (when Step 1-16 says Claude Design or Both)

The deck becomes a claude.ai **Design** canvas: one artboard per screen at its store size, one page per deck
(iPhone, Play phone, iPad, feature graphic), every text line, red block, grid and phone a separate element a
designer can select and edit. `specialists/company-store-screenshots/scripts/to-claude-design.mjs` does the conversion from the editor project.

1. **Canvas.** Create it once (Artifact `publish` with the Design type's `type_url` from `action: "list", scope:
   "types"`, a `title`, `auto_open: "after_first_write"`), then always reuse its `url`. Record the url in the deck's
   README so the next session updates the same canvas instead of making a new one.
2. **Images.** `node specialists/company-store-screenshots/scripts/to-claude-design.mjs <project> --list-assets` prints the screenshots and raster images
   it needs. Upload them as canvas assets (`publish`, `url`, `asset: true`, `file_paths`, ≤25 per call; files must
   sit inside the working folder, so stage them in a git-excluded temp folder). Identical files (Android reusing the
   iPhone placeholders) share one upload. Save `{"<public path>": "/_blob/…"}` as `assets.json`.
3. **Fonts.** Never upload licensed fonts yourself. The brand profile's `claudeDesign` names the design-system
   artifact that already hosts them and the font files to copy; the script prints the copy entries (`ds-files.json`)
   and writes the `designSystems` record. No design system with the fonts: say so; the canvas falls back to the
   stack, which is not on brand.
4. **Write and publish.** `node specialists/company-store-screenshots/scripts/to-claude-design.mjs <project> --root <scratch>/canvas --assets assets.json
   --brand <id> --title "…"`. Publish `project/canvas.json` + `project/Main.dc.html` + the `ds-files.json` entries in
   one call (`root`, `file_path` = canvas.json, `files`), then the other artboards in a second call.
5. **Tell the user** the link, that it is private until they share it (Share menu), what is editable, and that the
   store-ready PNGs still come from the editor's Export bundle (Step 6). Edits made on the canvas do not flow back to
   the editor project: pick one place as the master per round (usually the canvas for copy and layout review, the
   editor for the final export) and say which.

Fidelity: element-built decks convert exactly (positions, sizes, text, blocks). Device frames are simplified
bezels and the editor's built-in caption is approximated; check those on the canvas.

## Step 6 — export

Pick a device, press **Export bundle**: one zip per device, every size × every locale,
`<platform>/<device>/<WxH>/<locale>/NN-<layout>.png`. What the editor exports (`EXPORT_SIZES` in
`specialists/company-store-screenshots/template/src/lib/constants.ts`):

| Store | Deck | Sizes (px) |
|---|---|---|
| App Store | iPhone | 1320×2868 (6.9"), 1284×2778 (6.5"), 1206×2622 (6.3"), 1125×2436 (6.1") |
| App Store | iPad | 2064×2752 (13"), 2048×2732 (12.9") |
| Google Play | Phone | 1080×1920 |
| Google Play | 7" / 10" tablet | 1200×1920 / 1600×2560 (and landscape) |
| Google Play | Feature graphic | 1024×500, no device frame |
| App Store | Creative asset | 5244×2950 universal (or 3840×1646 header + 3840×2560 search) |

If a console rejects a size, believe the console and update `EXPORT_SIZES`. Don't upload anything to App Store
Connect or Play Console for the user. To keep a final set with the design system, copy the PNGs (not the editor)
to `handoff/store/<brand>/<release>/` with the project JSON.

**Hand-off folder (after QA passes): `specialists/company-store-screenshots/scripts/package-handoff.mjs`.** One folder for whoever uploads (release
manager, devs, CI), built from the Export bundle zips or straight from the running editor:

```bash
node specialists/company-store-screenshots/scripts/package-handoff.mjs <project> --out ~/store-handoff/<app>-<release> \
  --url http://localhost:3000            # or: --exports <folder of Export bundle zips>
  [--release "…"] [--canvas <Claude Design url>] [--copy copy.json] [--qa qa.md] [--claims claims.md] [--zip]
```

It writes `store/` (every size and language, numbered in upload order), `fastlane/` (the same images laid out for
`fastlane deliver` and `fastlane supply`: phone, 7", 10", feature graphic), `manifest.json` (each file's deck, screen,
size, language, words and capture), `strings/` + `strings.csv` for translators, `project/` (the editable source) and a
README with readiness, blockers and an upload checklist for both consoles. It hands over only designed decks (the
editor's untouched starter decks are skipped; `--decks` overrides), leaves out languages whose words fall back to the
default language, and marks the folder **NOT READY** while draft flags, `[PLACEHOLDERS]`, wrong pixel sizes or store
count limits remain. `--locale-map ios:en=en-GB` changes a fastlane locale code. It never uploads.

## Step 7 — QA gate

Upstream's Step 6 (message, visual, export quality) applies in full. Add, and report pass/fail per item:

**Leftovers** — no starter eyebrow label (`HERO · …`) or `[Write the headline]` placeholder left on any screen in any locale · no unused template screens.

**Style** (if chosen) — the spec's hard quality rules pass (phone size, tilt, crop, one-signal rule, grid or
backdrop) · `_QUALITY_BAR.md` composition rules pass · artwork-fit styles use only supplied or licensed artwork ·
Full style decks are labelled off-brand in the hand-off with the sign-off owner named.

**Brand** — theme from the profile, not a generic preset · headline font is the brand font (open one PNG and
check) · accent only on label and one word · logo unmodified · profile `status` stated if unverified.

**Truth, privacy, compliance** — each capture is the shipping app and shows its headline's feature · no personal
data in any capture · every claim has a source and date in the hand-off · category "don't" list checked · every
regulated slot filled by legal.

**Locales** — each locale has its own captures · non-English copy came from a person · line breaks checked per
locale · label and headline pass AA on their surface.

A fail on Brand, Truth or compliance blocks export.

## Hand-off

In order: the hand-off folder (`package-handoff.mjs`) and its READY / NOT READY line; the Claude Design canvas link (if published) and that it is private until shared; the dev-server URL;
how to run it next time (install, then dev); the Step 1 summary table with the
design-system source and profile status; decks seeded; captures, fonts or icon still missing; QA result; strings
awaiting a translator or legal. Offer to iterate.

## Files

| Path | What |
|---|---|
| `specialists/company-store-screenshots/template/` | The editor (upstream + brand themes in `src/lib/constants.ts`, brand fonts in `src/app/globals.css`) |
| `specialists/company-store-screenshots/scripts/scaffold.mjs` | Validate profile, copy, inject theme, fonts, icon, seed project |
| `specialists/company-store-screenshots/scripts/package-handoff.mjs` | Export bundles → one hand-off folder: store PNGs, fastlane layout, manifest, strings, README with readiness and upload checklist |
| `specialists/company-store-screenshots/scripts/build-style.mjs` | Brand-agnostic style builder (Swiss Grid Bold, Bento Keynote Grid, Map-Led Local): copy.json → editable signature elements for any brand |
| `specialists/company-store-screenshots/scripts/to-claude-design.mjs` | Editor project → Claude Design canvas files (artboards, pages, design-system copy entries) |
| `specialists/company-store-screenshots/brands/` | Product profiles (`<id>.json` + `<id>.md`); `_new-brand.*` to add one |
| `specialists/company-store-screenshots/styles/` | 26 style specs + `_QUALITY_BAR.md`, `styles.json` (brand fit, editor scene, category picks), README (modes, mapping) |
| `specialists/company-store-screenshots/categories/` | Playbooks per category: arc, what to show, what not to claim (`.md`), starter arcs (`.json`) |
| `specialists/company-store-screenshots/references/upstream-SKILL.md` | Upstream's full manual |
| `specialists/company-store-screenshots/references/upstream-style-prompts.md` | Upstream's style index and combining rules |
| `specialists/company-store-screenshots/references/upstream-copy-ideas.md` | Upstream's general copy library (13 app categories) |
| `specialists/company-store-screenshots/references/iphone-duo.md`, `specialists/company-store-screenshots/scripts/capture-iphone-duo.sh` | iPhone Duo, upstream |
| `LICENSE-upstream` | MIT licence of the editor |

Updating the editor from upstream: copy the new `specialists/company-store-screenshots/template/` over this one, re-apply the marked blocks (brand ids
and `sceneTint` in `types.ts`, brand `THEMES` and `SCREENSHOT_FONTS` in `constants.ts`, the `sceneTint` lines in
`scene-layers.tsx` and the `DeviceDepth` accent in `slide-canvas.tsx` — keep the `// Named style presets.` marker
the scaffold injects before — the `@font-face` block in `globals.css`, the `public/fonts/brand` lines in
`.gitignore`), then scaffold a copy and run `npx tsc --noEmit` and `npm run build` in it.

In a packaged `.skill` the editor ships as one archive, `template.tgz` (skill uploads take at most 200 files and no brackets in
paths); `specialists/company-store-screenshots/scripts/scaffold.mjs` unpacks it. In the repo it stays the `specialists/company-store-screenshots/template/` folder.
