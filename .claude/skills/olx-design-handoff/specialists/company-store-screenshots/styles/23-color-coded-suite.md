---
name: color-coded-suite
description: One vertical per frame, one colour per vertical. Every frame runs the same skeleton (a name chip top-left, a two-line headline in the same spot, the same large upright phone bleeding off the bottom), so only the colour and the content change as you swipe. Frame 1 is the suite frame, on a light neutral ground, with a row of tiles in every vertical's colour. The colours are the brand's own category colours, or lightness steps of its accent. Built for multi-vertical and super-apps.
inspiration: dark product-per-colour fintech card sets (Revolut-style plan and card colourways), multi-service delivery apps that colour-code food / grocery / pharmacy (Careem, Grab, Glovo category tiles), transit-map line colours
feel: orderly, confident, systematic, "one app, many things, and you can tell them apart at a glance"
---

# Colour-Coded Suite

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style.

## Hard quality rules (this style)

- **One vertical, one colour, one frame.** Frames 2–6 each belong to exactly ONE vertical (cars, property, jobs / food, grocery, pharmacy / cards, savings, transfers) and are filled edge to edge with that vertical's colour. Two verticals on one frame, or one colour used on two frames, = fail. The exceptions: frame 1 (the suite frame, which shows every colour as tiles) and an optional closer that goes back to the suite ground.
- **Sanctioned colours only.** Vertical colours come from the brand's own category or secondary palette (Brand + style), or from the ramp rule below when the brand has none. **Never invent a hue.** A colour that isn't in the brand profile and isn't a lightness step of the brand accent is a fail, however good it looks.
- **Identical skeleton.** On every frame the chip, headline, sub-line and phone sit at the same coordinates (see *Layout grid*), with ±0px tolerance. Overlay frame 2 on frame 5 at 50% opacity: the chip, the headline's first baseline and the phone bezel must line up exactly. If anything shifts per frame (a phone nudged up, a headline centred "because it's short"), the series stops reading as a system.
- **One headline size per deck.** Pick the size (128–140px) that fits the longest headline of the deck inside 1160px, then use it on every frame. Shrinking a single frame's headline to fit = fail. Shorten the words instead.
- **Every vertical colour passes with its text.** Frame text (headline, sub-line) on each vertical colour must be **≥ 4.5:1**, measured. One text colour runs across all vertical frames where possible (see *Global palette*). On frame 1, each tile must clear **≥ 3:1** against the suite ground, so the tiles separate without outlines.
- **Neighbouring colours must be told apart.** Adjacent frames differ by **≥ 30° OKLCH hue** (category palettes) or **≥ 0.12 OKLCH lightness** (ramps). Two neighbours that read as "the same blue" in the gallery strip = fail.
- **Phone:** the template's default bezel, **1100px wide, upright 0°, left 110, top 712**, bleeding 85px off the bottom edge. Visible height 2156px = **75.2%** of the canvas. No tilt, no float, no second phone.
- **Flat colour grounds.** Each frame is a single hex: no gradient, grain, vignette, pattern or blobs. **Floating decorations: 0.** The chip, the suite tiles and the optional callout are layout, not decoration (§9 minimal).
- **Real UI on every frame**, including the suite frame (Apple 2.3.3). The suite tiles sit above a real home or category screen; they never replace it.
- **The chip names the vertical in the app's own words** (its tab, category or service label, e.g. "Cars", "Grocery", "Savings"). Never a marketing nickname, never the vertical's colour name.

## Vibe summary

Swipe through the gallery and it reads like a set of plan cards or transit lines: frame by frame the colour changes and nothing else moves. Cobalt for cars, emerald for property, plum for jobs. Each frame says what that part of the app does in four words, with the same phone at the same size showing that vertical's real screen. Frame 1 sets the key: on a quiet light ground, a row of rounded tiles shows every vertical's colour and name above the app's home screen, so the viewer learns the colour code before swiping. Chip top-left, headline flush-left, phone centred and cropped by the bottom edge. It's systematic and calm, and because the layout never changes, the colours do all the talking.

## Global palette

Full-style preset (deep category colours with near-white text, light neutral suite ground):

| Token | Hex | Use | Contrast (measured) |
|---|---|---|---|
| `--suite` | `#F4F2EE` | Frame 1 ground (and optional closer) | — |
| `--ink` | `#121317` | Headline and sub-line on the suite frame, suite chip fill | 16.6:1 on `--suite` |
| `--muted` | `#5C5B57` | Sub-line on the suite frame, small labels on paper | 6.08:1 on `--suite` |
| `--on` | `#F7F6F2` | Frame text on every vertical colour; chip fill on vertical frames | see each colour |
| `--v1` cobalt | `#2443C4` | Vertical 1 (e.g. Cars) | `--on` 7.26 · vs suite 7.02 · OKLCH L .452 H 267 |
| `--v2` emerald | `#0B6A4E` | Vertical 2 (e.g. Property) | `--on` 6.10 · vs suite 5.90 · L .467 H 166 |
| `--v3` plum | `#6A2EA6` | Vertical 3 (e.g. Jobs) | `--on` 7.60 · vs suite 7.35 · L .449 H 302 |
| `--v4` crimson | `#B21F3B` | Vertical 4 (e.g. Phones) | `--on` 6.16 · vs suite 5.96 · L .498 H 17 |
| `--v5` ember (= accent) | `#A3470A` | Vertical 5 / the brand's own action (e.g. Sell) | `--on` 5.61 · vs suite 5.42 · L .511 H 47 |
| `--shadow-k` | colour at OKLCH L −0.17, C ×0.6 | Tinted phone shadow per frame | e.g. cobalt → `#0E1F66`, emerald → `#03392A`, plum → `#371458`, crimson → `#5E0E1E`, ember → `#552305` |

Hue spacing of the preset in frame order (cobalt 267°, emerald 166°, plum 302°, crimson 17°, ember 47°): every neighbour is ≥ 30° apart. Crimson and ember are the closest pair (30°), so they must never sit next to each other in a 7+ frame deck that repeats colours. Pure `#FFFFFF` is not used as text: `--on` is a warm near-white, per §5.

**Verified pairs (use only these):**

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#121317` | `#F4F2EE` | 16.6:1 | suite headline, sub-line, chip |
| `#F4F2EE` | `#121317` | 16.6:1 | suite chip label |
| `#5C5B57` | `#F4F2EE` | 6.08:1 | suite sub-line, labels ≥ 24px |
| `#F7F6F2` | each `--v*` | 5.61–7.60:1 | headline, sub-line, tile label |
| each `--v*` | `#F7F6F2` | 5.61–7.60:1 | chip label (colour text on the near-white chip) |
| each `--v*` | `#F4F2EE` | 5.42–7.35:1 | suite tile against the ground (≥ 3:1 needed) |
| any `--v*` | `#121317` | 2.26–3.06:1 | **never**: tiles vanish on a dark suite ground (see dark variant) |

**Brand swap (Brand + style).** The suite ground → brand `bg`; suite headline and chip fill → brand `fg`; the vertical colours → the brand's **sanctioned category / secondary colours** from the brand profile (`categoryColors`, `secondary`, or the colours the live app uses on its own category icons or service tiles. Capture evidence, don't recall them). Frame text on verticals → whichever of brand `bg` / `fgAlt` passes **≥ 4.5:1 on every vertical colour**. If one pair fails on one colour, that frame alone flips to the other text colour, and its chip flips with it (the skeleton stays put). Brand `accent` → the frame for the brand's own core action (Sell, Order, Send) and, in the editor preset, `accent`. Brand `bgAlt` → the darkest vertical colour (it becomes the inverted ground the scaffold uses). Pairs that must pass: `fg`/`bg` ≥ 7:1 (suite), frame text/each vertical ≥ 4.5:1, each vertical/`bg` ≥ 3:1 (tile separation), neighbours ≥ 30° hue or ≥ 0.12 L. If the profile says `accentAsDecoration: false`, the accent colours its own frame only, never a tile used as ornament. On frame 1 it shows as a tile because it names a vertical.

**The ramp rule (brand with one accent and no category colours).** Build the verticals as lightness steps of the brand accent in OKLCH: keep the accent's hue, cap chroma at the accent's own (or 0.12 if the step leaves the gamut), and step L by **0.06**. Use only steps that pass with the frame text. Order them so that **neighbours differ by ≥ 0.12 L**: interleave, don't run light to dark. Worked example for a teal accent `#00857C` (L .555, whose near-white text fails at 4.18:1, so the accent itself becomes a suite tile only if it clears 3:1 on `bg`, and is not a frame ground):

| Step L | Hex | `--on` on it | Frame order |
|---|---|---|---|
| 0.52 | `#007A72` | 4.82 | 1st vertical |
| 0.34 | `#004740` | 9.83 | 2nd |
| 0.46 | `#006961` | 6.08 | 3rd |
| 0.28 | `#003630` | 12.37 | 4th |
| 0.40 | `#005750` | 7.83 | 5th |

A light ramp (L 0.80–0.92 tints with ink text) is equally valid on a brand whose UI is pastel. Never mix light and dark steps in one deck, because the text colour would flip on every frame. If the ramp can't produce 4 distinct passing steps, cap the deck at 4 vertical frames plus the suite frame, or use Bento / Swiss instead.

## Typography

**Full style, Google Fonts (OFL):**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@500;600;700&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Inter, Manrope } from "next/font/google";
const display = Manrope({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "block" });
const text = Inter({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-text", display: "block" });
// <body className={`${display.variable} ${text.variable}`}>
```
Brand + style: the brand's display face at its heaviest available weight (≥ 700) for headline, chip and tiles, and its text face for the sub-line. Note the replacement in the hand-off.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Manrope 800 | 128–140px, **one size per deck** (default 136) | 0.96 | −0.03em | `--on` on verticals, `--ink` on suite |
| Sub-line (optional slot) | Inter 600 | 44px | 1.15 | −0.01em | `--on` / `--muted` |
| Chip label | Manrope 700 | 40px | 1.0 | −0.01em | vertical colour on `--on` chip; `--suite` on ink chip |
| Suite tile label | Manrope 700 | 32px | 1.0 | −0.01em | `--on` |
| Callout text (if any) | real UI crop only | — | — | — | — |
| Legal / licence line | Inter 500 | 28–30px | 1.25 | 0 | `--on` / `--muted`, ≥ 4.5:1 |

Rules: sentence case everywhere (the chip too: "Cars", not "CARS"). Headline max 2 lines, widest line ≤ 1160px measured. No italic, no serif, no mono, no second display face.

## Headline emphasis (signature)

The emphasis in this style **is the frame colour**, not a word treatment. The whole headline is one colour (`--on`), and the frame behind it carries the identity. There is no gradient word, no highlight block and no underline, because those would compete with the colour code.

- The only typographic move: line 1 states the vertical's job, line 2 lands the outcome ("Find your / next car."). Break lines by meaning and keep the widths close (§6).
- On the suite frame the headline is `--ink`, and the colour lives in the tile row under it.
- In a deck whose brand insists on an emphasis word, colour it with the **chip's** treatment instead: the emphasised word sits on a near-white pill in the frame colour (same pair as the chip, ≥ 5.6:1). Max one per deck, on the suite frame only.

## Layout grid & safe zones

12 columns, **72px outer margins**, 1176px live width. Everything aligns left to x = 72 except the phone (centred).

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 120 | Empty colour |
| Chip | 72, 120, auto (≤ 560), 92 | Pill radius 46; padding 0 36 0 28; icon 44px + 16px gap + label |
| Headline | 72, 268, ≤ 1160, ≤ 262 | 2 lines at 136px × 0.96 = 261px → bottom ≈ 529 |
| Sub-line slot | 72, 572, ≤ 1100, 52 | One line, ≤ 7 words. If one frame uses it, all vertical frames do |
| Suite tile row (frame 1 only) | 72, 560, 1176, 116 | Replaces the sub-line slot on frame 1 |
| Phone | 110, 712, 1100, 2241 | Bezel bottom at 2953 (85px off-canvas). Visible 2156px = 75.2% |
| Callout slot (optional) | 792, 1540, 456, ≤ 300 | Max one per frame; the same slot on every frame that uses one |
| Side margins | 0–72, 1248–1320 | Only the phone's bezel (x 110–1210) and the colour ground |

Totals: headline + phone span y 268 → 2868 = **90.7%** of canvas; the largest empty band is the 120px top margin (4.2%). Chip-to-headline gap 56px, headline-to-sub-line 43px, sub-line-to-phone 88px.

**Phone clip check** (template bezel, aspect 1022:2082): screen top = 712 + 0.0450·1100 = 761.5, screen height = 1.9472·1100 = 2142. The visible fraction of the screenshot = (2868 − 761.5) / 2142 = **0.983**: the crop falls in the home-indicator strip, so the tab bar shows whole. If a screenshot's tab bar sits lower than 0.965, take a capture without the tab bar visible at the bottom, or crop the phone to `top 760` (visible 0.961, phone 73.5%) **on every frame**. Never on one frame only.

### Reusable recipes

**R1 · Vertical frame** (frames 2–6):
```
ground   flat --vN, full canvas
chip     x72 y120 h92   [icon][Cars]   fill --on, label --vN
headline x72 y268       136px --on, 2 lines
sub-line x72 y572       44px --on (optional, deck-wide)
phone    x110 y712 w1100, 0°, shadow tinted --shadow-k
```

**R2 · Suite frame** (frame 1): R1 on `--suite`, chip filled `--ink` with label `--suite` (the app's "All" / "Home" label or the app name), headline `--ink`, and the tile row instead of the sub-line:
```
tiles    y560 h116, N tiles, gap 24, width = (1176 − 24·(N−1)) / N
         N=4 → 276 · N=5 → 216 · N=6 → 176
         radius 28, fill --vN, label 32px --on at left 24 / bottom 24, optional 36px line icon top-left
```
Tile order = frame order, so the row previews the swipe. Label ≤ 9 characters at 32px (≈ 160px in Manrope 700). For a longer name use the app's short nav label, or drop to N ≤ 4. Never shrink below 28px.

**R3 · Closer (optional, frame 6 or 7)**: back to `--suite`. Chip = app name, headline = the payoff across all verticals, phone = the account / saved / orders screen that spans verticals. No tile row (it would repeat frame 1). Use it only in 6+ frame decks; otherwise frame 6 is the brand-action vertical.

## Phone / device frame treatment

- Always the template's default bezel (`public/mockup.png` via the `Phone` component in `src/components/editor/device-frames.tsx`). Don't recolour the bezel to the vertical colour.
- Upright 0°, centred (x 110–1210), top 712, the same on every frame. The bottom-edge crop is the only bleed.
- Shadow tinted by the frame colour (two-shadow stack, §7):
```css
.phone{filter:drop-shadow(0 4px 6px rgb(var(--shadow-k) / .45)) drop-shadow(0 44px 70px rgb(var(--shadow-k) / .40))}
/* suite frame: --shadow-k = #121317 at .18 / .14 */
```
- The screenshot must be from **that vertical's own screen** (cars search on Cars, map on Property). If the app shares one results template across verticals, the content must still be that vertical's (car cards, not mixed).
- Screenshots whose own top bar is coloured in a different category colour clash with the frame. Capture in the matching vertical, or choose a screen where the app chrome is neutral.

## Background treatment

One flat hex per frame: `--suite` on frame 1, `--vN` on each vertical frame. No gradient, noise, light leak or pattern. Depth comes only from the phone shadow. In the connected-canvas view the deck reads as a strip of colour blocks with a hard change exactly on each seam. That strip is the series' look in the store gallery.

## Decorative accents

Floating decorations: **0**. The allowed parts, each with one job:

1. **Vertical chip** (every frame): near-white pill (`--on`) with the vertical name in the frame colour, plus an optional 44px line icon for that vertical, taken from the house icon set (or one style-matched pack, stroke 2 in a 24 viewBox, round caps) in the frame colour. Example SVG for the pill (text stays an editable text element on top):
```html
<svg width="260" height="92"><rect width="260" height="92" rx="46" fill="#F7F6F2"/></svg>
```
2. **Suite tiles** (frame 1 only): N flat rounded rectangles in the vertical colours, each with its label. They are the colour key, so they hold no stats, prices or counts.
3. **One callout** (optional, ≤ 1 per frame): a real UI crop (a filter chip row, a price card, a delivery ETA pill) on a white card, radius 36, shadow `0 18px 36px -12px rgb(var(--shadow-k)/.45)`, in the callout slot overlapping the phone's right edge by ≤ 120px. It must not cover the UI the headline talks about. It is a crop of the screenshot shown on the phone, never redrawn.

Polish (§3): no illustration is drawn in this style. The volume cue is the tinted phone shadow and the callout card's shadow.

## Cross-screen moment

- **Default: none.** Each frame is one vertical, and an element crossing into the neighbour would put one vertical's colour on another's frame, which breaks the code. The deliberate moment is the **hard colour seam**: in the connected canvas, frame N's colour stops exactly at the seam and frame N+1's begins. Seen as a gallery strip, the set reads as a row of colour blocks, the same row the suite tiles promised on frame 1.
- **Never crosses:** chips, headlines, tiles, phones, callouts, legal lines.
- §2's "one moment in 5+ decks" is waived for this style by design (every screen must stand alone as its vertical). Say so in the hand-off if asked.

## Copy tone

- **Voice:** plain and outcome-led, one job per frame. Line 1 names the job in the vertical, line 2 lands the outcome. ≤ 5 words, readable at 300px wide.
- **Story in the first 3 frames:** frame 1 = "it's all here" (the suite), frame 2 = the biggest vertical's core action, frame 3 = the second vertical's payoff. Most viewers never pass frame 3, so put the two biggest verticals there.
- **Vocabulary:** the vertical's real nouns (car, home, job, order, card, transfer), near you, in one tap, today, track, compare, chat, apply, sell.
- **Numbers:** only if true for the screenshot or the app's real behaviour. Counts of listings, delivery minutes, fees and rates are **[PLACEHOLDERS]** the team fills and verifies. Never invent stats, ratings, awards or press logos.
- **Fintech:** no promised returns, no "earn up to", no APR in art unless legal supplies it. Reserve the legal line slot (Inter 500 28–30px in the sub-line slot or at y 640) for **[Licence / regulator line from legal]** on every frame that shows money products.
- **Punctuation:** sentence case, one period at the end. No question marks, exclamation marks, emoji or ampersands.
- **Banned words:** revolutionary, ultimate, best, #1, game-changing, seamless, unlock, supercharge, all-in-one (as a headline), "and more", free (in art), download now.
- **Example headlines (12):**
  - Classifieds suite: "One app. / Every deal." · Cars: "Find your / next car." · Property: "Homes near you, / mapped." · Jobs: "Apply in / one tap." · Sell: "Sell what / you don't use."
  - Quick commerce suite: "Food, groceries, / pharmacy." · Grocery: "Groceries, / at your door." · Pharmacy: "Refills, / without the queue."
  - Fintech suite: "Your money. / One place." · Cards: "Freeze a card / in a tap." · Transfers: "Send money / home." · Savings: "Set a goal. / Watch it grow."

## Per-slide breakdown (mandatory)

Sample app: **Lotline**, a fictional multi-vertical classifieds app (Cars, Property, Jobs, Phones, Sell). Canvas 1320 × 2868, Full-style palette, headline 136px on every frame (the longest line, "Homes near you,", measures ≈ 1010px in Manrope 800).

### Slide 1 · Suite (R2)
- **Ground:** `#F4F2EE`. **Chip:** ink pill, label "All categories" in `#F4F2EE`, grid icon.
- **Headline:** "One app. / Every deal." in `#121317`.
- **Tile row (y 560, N = 5, w 216):** Cars `#2443C4` · Property `#0B6A4E` · Jobs `#6A2EA6` · Phones `#B21F3B` · Sell `#A3470A`, labels `#F7F6F2` 32px, each with its line icon.
- **Phone:** home screen with the category grid (`home`), shadow ink at .18/.14.
- **Must be true:** at 300px wide the five colours read as a key, and the headline reads. The tile labels match the chips on frames 2–6 word for word.

### Slide 2 · Cars (R1, `#2443C4`)
- **Chip:** "Cars" in cobalt on `#F7F6F2`, car icon. **Headline:** "Find your / next car." **Sub-line:** "Filter by make, year and price."
- **Phone:** car search results with the filter bar visible (`cars-results`). Shadow `#0E1F66`.
- **Callout (optional):** a crop of the real filter chip row, in the callout slot.
- **Must be true:** the chip, headline and phone sit pixel-identical to slides 3–6. The results show cars only.

### Slide 3 · Property (R1, `#0B6A4E`)
- **Chip:** "Property". **Headline:** "Homes near you, / mapped." **Sub-line:** "Search on the map, by area."
- **Phone:** map search with price pins (`property-map`). Shadow `#03392A`.
- **Must be true:** prices on the pins are the capture's own, never retouched. Emerald vs cobalt hue gap = 101°.

### Slide 4 · Jobs (R1, `#6A2EA6`)
- **Chip:** "Jobs". **Headline:** "Apply in / one tap." **Sub-line:** "Your profile goes with you."
- **Phone:** job detail with the Apply button above the tab bar (`job-detail`). Shadow `#371458`.
- **Must be true:** "one tap" is literally true in the app (apply without a form). Otherwise use "Apply from / your phone."

### Slide 5 · Phones (R1, `#B21F3B`)
- **Chip:** "Phones". **Headline:** "Chat before / you buy." **Sub-line:** "Ask the seller anything."
- **Phone:** in-app chat about a phone listing (`chat`). Names and avatars are test-account data. Shadow `#5E0E1E`.
- **Must be true:** no real person's name or face in the chat.

### Slide 6 · Sell (R1, `#A3470A` = accent)
- **Chip:** "Sell". **Headline:** "Sell what / you don't use." **Sub-line:** "Photos, price, done." (true only if the flow has those three steps. Otherwise use "Post an ad in [N] steps.")
- **Phone:** the post-an-ad photo step (`post-ad`). Shadow `#552305`.
- **Must be true:** crimson (slide 5) and ember sit 30° apart, the minimum. Check the strip at 300px, and if they merge, move Sell before Phones.

### Reference measurements (Lotline plan)

| Slide | Ground | Text pair | Phone W / visible H | Visible % | Widest headline line |
|---|---|---|---|---|---|
| 1 Suite | `#F4F2EE` | ink 16.6:1 | 1100 / 2156 | 75.2% | "Every deal." ≈ 760px |
| 2 Cars | `#2443C4` | `--on` 7.26:1 | 1100 / 2156 | 75.2% | "next car." ≈ 640px |
| 3 Property | `#0B6A4E` | 6.10:1 | 1100 / 2156 | 75.2% | "Homes near you," ≈ 1010px |
| 6 Sell | `#A3470A` | 5.61:1 | 1100 / 2156 | 75.2% | "you don't use." ≈ 900px |

Widths are estimates for planning. Measure the rendered DOM before export.

## Adapting to other app categories

| Category | Verticals (chip words) | Colour source | Suite frame phone | Notes |
|---|---|---|---|---|
| Classifieds (multi-vertical) | Cars · Property · Jobs · Phones · Services | the app's category-icon colours | home with category grid | first pick for this style |
| Quick commerce / delivery | Food · Grocery · Pharmacy · Flowers | the app's service-tile colours | home with service tiles | ETAs are [PLACEHOLDERS]; pharmacy copy avoids medical claims |
| Fintech | Cards · Savings · Transfers · Bills | card colourways or product colours | accounts overview | legal line slot on money frames; no returns |
| Motors (single-vertical) | New · Used · Finance · Service | ramp from the brand accent | home | works only if the app genuinely splits these |
| Real estate / rentals | Buy · Rent · Commercial · New projects | category colours, else ramp | home with tabs | map frame in the Rent colour |
| E-commerce | Fashion · Home · Electronics · Beauty | department colours | home with departments | product prices are the capture's own |
| Jobs | Full-time · Part-time · Freelance · Internships | ramp | job feed | only if the app has those tabs |
| SaaS | Docs · Chat · Tasks · Calendar (product modules) | module colours from the product's own UI | workspace home | skip if modules share one colour |

If the product has **one** vertical, this style doesn't fit. Use Bento Keynote Grid or Swiss Grid Bold.

## Dark / inverted & localization notes

- **Dark variant (night set):** suite ground `#0E0F12`, suite text `#F4F2EE`. The verticals become **light** steps carrying ink text `#0E0F12`: cobalt `#83A7FF` (8.16:1), emerald `#52C399` (8.78:1), plum `#BB94F4` (7.90:1), coral `#F6838B` (7.79:1), amber `#E99355` (8.00:1). All are OKLCH L 0.74 at the same hues, so the tiles clear ≥ 7.8:1 against the night ground. The chip becomes `#0E0F12` with the label in the vertical colour. In Brand + style, use the dark variant only if the brand's own dark mode defines these light category tints. Never mix the light and dark sets in one deck.
- **Long German / French lines:** keep the one deck size and shorten the copy first. If a line still exceeds 1160px, drop the **whole deck** in 4px steps to 128px (never below). Chips may grow to 560px wide, and tile labels follow the ≤ 9-character rule using the app's short labels.
- **CJK:** Noto Sans JP/SC/KR 700, headline −8% (≈ 125px), line-height 1.12, `letter-spacing:0`. Chip labels at 38px.
- **RTL (Arabic / Hebrew):** mirror the skeleton. The chip goes top-right at x = 1248 − width, the headline and sub-line right-aligned to 1248, tile order right-to-left (frame order still matches the swipe direction of the RTL store). Phone stays centred. Noto Sans Arabic 700, `letter-spacing:0`, line-height 1.2. Use the app's own Arabic category labels from a capture, never translated by hand.
- **Google Play:** Play discourages device frames and heavy text overlays. The quality bar still requires the default bezel here, so on Play keep the skeleton and lighten the text: headline only, drop the sub-line slot and any callout. The phone stays at 75%. The Play feature graphic (1024×500) is the suite tile row on `--suite` with the app name, and no phone, because a feature graphic is not a screenshot.

## Style-specific QA checklist

- [ ] Each vertical frame owns one vertical and one flat colour. No colour repeats across vertical frames.
- [ ] Every colour is in the brand profile (category / secondary) or is a documented OKLCH lightness step of the accent. The source is written in the hand-off.
- [ ] Frame text on every vertical colour ≥ 4.5:1 (measured). Chip label ≥ 4.5:1. Suite tiles ≥ 3:1 against the suite ground.
- [ ] Neighbouring frames ≥ 30° OKLCH hue apart (or ≥ 0.12 L for ramps). The 300px strip shows distinct blocks.
- [ ] 50% overlay of any two frames: chip, headline first baseline, sub-line and phone bezel coincide exactly.
- [ ] One headline size across the deck. Every line ≤ 1160px, ≤ 2 lines, ≤ 5 words.
- [ ] Phone 1100px, 0°, top 712, visible 2156px (75.2%) on every frame. The tab bar is whole or absent, consistently.
- [ ] Chip words = the app's own vertical labels = the suite tile labels, word for word.
- [ ] Each frame's screenshot is that vertical's real screen. The suite frame shows a real home or category screen.
- [ ] 0 floating decorations. ≤ 1 callout per frame, in the shared slot, cropped from the real UI.
- [ ] No invented numbers, ratings, awards or prices. Unknowns stay [PLACEHOLDERS]. Fintech frames carry the legal line slot.
- [ ] Phone shadow is tinted per frame (not grey-black on colour).
- [ ] Thumbnail test at 220px (§11) passes on frames 1–3.

## Common failure modes

1. **Rainbow invention.** Picking a pleasant set of hues because the brand "only has one colour". **Fix:** the ramp rule, or a different style. Never invent hues.
2. **Pastel grounds with white text.** Light category tints (`#7BC9F5`-style) under `--on` measure 1.8–2.5:1. **Fix:** deeper steps (L ≤ 0.52 for near-white text), or a light set with ink text throughout.
3. **Drifting skeleton.** The phone sits 40px higher on the frame with a short headline, or the headline is centred on one frame. **Fix:** fixed coordinates, one headline size, an overlay check.
4. **Dark suite ground swallowing the tiles.** Deep verticals on near-black measure 2.3–3.1:1, so the colour key disappears. **Fix:** a light suite ground, or the dark variant's light tints.
5. **Same-looking neighbours.** Two blues, or crimson next to ember in a cramped order. **Fix:** reorder by hue so neighbours sit ≥ 30° apart.
6. **Chip in marketing-speak.** "Wheels", "Dream homes". **Fix:** the app's own tab label.
7. **Clashing screenshot chrome.** A cars screenshot with a green app bar on a cobalt frame. **Fix:** capture each vertical in its own state, or a neutral-chrome screen.
8. **Suite frame without UI.** Five big colour tiles and a logo, no phone. This breaks Apple 2.3.3. **Fix:** R2 keeps the phone.
9. **Decoration creep.** Coloured blobs, confetti, gradient grounds "to add energy". **Fix:** flat colour, 0 decorations. The colour change is the energy.
10. **Bento drift.** Adding stat tiles around the phone turns this into style 15. **Fix:** tiles appear on the suite frame only, as a colour key.

## How to apply this style

1. **Colours:** read the brand profile for category / secondary colours, or build the ramp. Run the contrast and hue checks above and record the source of each colour.
2. **Fonts:** Full style loads Manrope (700/800) as `--font-display` and Inter (500/600/700) as `--font-text` with the snippet above. Brand + style uses the brand faces.
3. **Theme:** add `color-coded-suite` to `THEMES` in `src/lib/constants.ts`: `bg #F4F2EE`, `bgAlt #2443C4`, `fg #121317`, `fgAlt #F7F6F2`, `accent #A3470A`, `accentAlt #0B6A4E`, `muted #5C5B57`.
4. **Scene knobs:** backdrop `solid`, span off, decoration `none`, shadow 30, glow 0, tilt 0, headlineWeight 800, headlineScale 1, headlineCase `as-typed`, captionAlign `left`.
5. **Per-frame ground:** the editor's solid backdrop takes the theme `bg`. For frames 2–6, add a full-canvas image element (SVG rect, 1320×2868, x 0 y 0, zIndex 0) filled with the vertical colour, or use a per-slide backdrop colour if the editor build exposes one. Set the headline colour to `fgAlt` on those frames.
6. **Chip:** an SVG pill image element (x 72, y 120, h 92, rx 46) plus an icon image element and an editable text element (Manrope 700 40px, vertical colour). Duplicate the group to each frame and change only the label, icon and colours.
7. **Suite tiles:** N SVG rect image elements (radius 28) + N text elements on frame 1, positioned with the R2 width formula.
8. **Phone:** device transform per slide `x 110, y 712, width 1100, rotation 0`, identical on all frames. The editor's shadow knob covers the stack. If a tinted shadow is required at full fidelity, bake it as a PNG element behind the phone.
9. **Headline / sub-line:** caption at 136px (`headlineScale` tuned so the longest headline fits), captionAlign left at x 72. The sub-line is a free text element at y 572.
10. **Measure and audit:** overlay check, DOM widths ≤ 1160px, contrast per frame, hue spacing, phone ≥ 2156px visible. Then the QA checklist above plus `_QUALITY_BAR.md` §10–11.

## What this style is NOT

- Not bento (15): no tile grid around the phone. Tiles exist only as the colour key on frame 1.
- Not Candy Pop (11): no stickers, bouncy type or mixed colours on one frame. One colour per frame, flat.
- Not Swiss (08): no visible grid lines, mono index labels or orange signal. The colour field is the signal.
- Not gradient or aurora: grounds are single hexes.
- Not invented palettes: every hue is sanctioned by the brand or derived from its accent.
- Not tilted or floating: one upright phone, the same on every frame.
- Not a feature list: one vertical, one job, one outcome per frame.
- Not a copy of any named inspiration: borrow the per-colour system, never another app's colours, cards or layouts.
