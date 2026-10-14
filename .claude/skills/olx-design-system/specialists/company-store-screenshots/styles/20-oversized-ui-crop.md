---
name: oversized-ui-crop
description: Frameless. One real capture per slide, enlarged to 140–180% and cropped to the single region that sells the frame (a filter row, a price card, a chat thread). The crop bleeds off one or two canvas edges and keeps the app's own corner radius on its visible corners. Flat brand ground, a big two-tone outcome headline, and exactly one accent callout (a ring or an underline) on the element that matters. The bleed side alternates every slide. Pixel integrity is enforced: no upscaling past source pixels, and the crop never invents UI.
inspiration: frameless full-bleed UI screenshot sets on Google Play, Linear and Stripe product-marketing crops, Wise and Revolut store galleries, Airbnb feature crops
feel: confident, close-up, honest, "this is the actual product, look how good this one part is"
---

# Oversized UI Crop

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style, with one declared exception: this is a **no-device style on every slide**. §7 (default iPhone bezel) and the §1 phone-height rule are replaced by the crop-panel rules below, the same way the quality bar exempts spec-permitted "no-device" slides. Everything else in the quality bar (contrast, empty bands, headline fit, thumbnail test, auto-reject list) applies in full.

## Hard quality rules (this style)

- **No device frame, ever.** No bezel, no phone outline, no notch, no status bar, no home indicator. The crop panel *is* the product shot. If a frame shows up on any slide, it's a different style.
- **Enlargement E = 140–180%, measured.** Baseline (E = 100%) is a **940px-wide screen** on the 1320px canvas (the screen inside a standard ~1000px framed phone). Rendered screen width `Wr = 940 × E`, so 140% → **1316px**, 160% → **1504px**, 180% → **1692px**. E below 140% looks like a phone screenshot with its frame missing. E above 180% loses the context that tells people what the region is. Both fail.
- **Pixel integrity: no upscaling beyond source pixels.** Display scale `s = Wr / Wsrc` must be **≤ 1.00**, where `Wsrc` is the capture's real pixel width. So the **minimum source width = Wr**: ≥ 1316px for 140%, ≥ 1504px for 160%, ≥ 1692px for 180%. A native 6.9" iPhone capture (1320px) supports **at most 140%**. A 6.7" capture (1290px) supports at most 137%, which is below the band, so this style needs a higher-density capture (see *How to apply*, step 1). Never use AI upscalers, "enhance" or super-resolution. Their output is invented pixels.
- **The crop never invents UI.** The panel is **one contiguous rectangle from one capture**. No content-aware fill, no extending a list, no moving, deleting or duplicating elements, no edited prices, names or counts, no compositing two captures into one panel, and no redrawn UI. The only changes allowed are scaling down, rectangular cropping, alpha-rounding the visible corners, and the callout drawn **on top**.
- **One region per slide.** The panel shows one functional region (a filter row plus the first result, a price card, a chat thread, a form block). The callout target sits in the **upper 55%** of the visible panel, and its centre is **≥ 260px from the bleed edge**.
- **Panel size:** visible height **66–80% of canvas (1893–2294px)**. Visible area **≥ 62% of canvas area (≥ 2,347,000px²)**. Visible width ≥ 1180px.
- **Bleed rule:** the panel bleeds off **one or two** canvas edges (side + bottom, or side + top, or one side only). Zero bleed (a floating card) fails, and so do three or more bleed edges (that's just a full-screen screenshot). **At least one visible straight edge is the real screen edge** (normally the non-bleed side, so the UI's own side padding shows).
- **Visible corners use the app's own radius:** `R = (app's top-level container radius in pt) × (Wr / screen width in pt)`, clamped to **48–112px**. Example: a 16pt sheet radius on a 440pt-wide screen at 160% → 16 × 3.42 = **55px**. Corners on bleed edges are square (they're off-canvas anyway). One R per deck.
- **The bleed side alternates every slide:** R, L, R, L, R, L (Right = panel bleeds off the right edge). Two neighbouring slides bleeding the same side fails.
- **Exactly one callout per slide**, in `--accent`: a **ring** (around a control, chip, card or field) or an **underline** (under one text run). No arrows, labels, numbers, loupes, glows, blur-outs or dimming. The editor's built-in loupe `callout` is **banned**, because the crop is already the magnifier.
- **Accent appears exactly once per slide**, and that once is the callout. Never in the headline, never on the ground, never as a decoration.
- **Ground is one flat hex per deck.** No gradient, grain, vignette, pattern, blobs or backdrop grid.
- **Headline:** Geist 700, **148–176px** (default 160), line-height 0.94, tracking −0.04em, **≤ 5 words, ≤ 2 lines**, widest line ≤ 1128px measured (85%). Outcome-led. Contrast ≥ 7:1 for the outcome line and ≥ 4.5:1 for the setup line.
- **Cut lines respect UI:** a visible (non-bleed) panel edge must fall in a gap between UI rows or columns, never through text, an icon or a control. A bleed edge may cut non-focal UI, but it must never leave a text line with **less than 60% of its cap height** showing (no slivers) and never touch the callout target.

## Vibe summary

It's the shot a product marketer at a design-led SaaS company takes: forget the phone, push in on the one part of the screen that's genuinely good, and let it run off the page. Each slide is a flat field of brand colour. A huge, plain two-tone headline says what you get. Then the real interface comes in from one side, big enough that you could tap its chips with a thumb, cut by the canvas edge so it obviously keeps going. Its one visible corner has the same radius the app uses on its own sheets, so the crop feels like a piece of the app, not a screenshot pasted on a slide. A single accent ring or underline lands on the control the headline is about. Across the set the panel swings right, left, right, left like a slow pan. It's honest by construction: every pixel is the app's own, never upscaled, never touched.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ground` (`bg`) | `#1A1446` | Slide ground, flat, every slide | — |
| `--ground-light` (`bgAlt`) | `#F3F1EC` | Inverted ground, only for dark-mode captures (see Dark notes) | — |
| `--fg` | `#F6F4FF` | Headline outcome line | 15.66:1 on ground |
| `--muted` | `#ACA6E0` | Headline setup line, optional app-name line | 7.53:1 on ground |
| `--fg-alt` (`fgAlt`) | `#15122E` | Headline on the light ground | 16.07:1 on `#F3F1EC` |
| `--muted-alt` | `#5A5478` | Setup line on the light ground | 6.26:1 on `#F3F1EC` |
| `--accent` | `#E5480C` | The one callout (ring or underline) on light UI | 3.99:1 on `#FFFFFF` UI, 3.56:1 on `#F2F2F2` UI, 4.27:1 on ground |
| `--accent-alt` | `#FF8A5B` | The callout on dark-mode UI | 7.32:1 on `#1C1C1E` UI, 7.33:1 on ground |
| `--hairline-light` | `rgba(21,18,46,.10)` | 2px panel edge, light ground only | — |

**Verified pairs (use only these):**

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#F6F4FF` | `#1A1446` | 15.66:1 | headline outcome, app name |
| `#ACA6E0` | `#1A1446` | 7.53:1 | headline setup line |
| `#15122E` | `#F3F1EC` | 16.07:1 | headline on light ground |
| `#5A5478` | `#F3F1EC` | 6.26:1 | setup line on light ground |
| `#E5480C` | `#FFFFFF` / `#F2F2F2` | 3.99 / 3.56:1 | callout stroke on light UI (non-text graphic, WCAG 1.4.11 needs ≥ 3:1) |
| `#FF8A5B` | `#1C1C1E` | 7.32:1 | callout stroke on dark UI |
| `#E5480C` | any text | — | **never as text** |

**Brand swap.** Map the brand onto four roles. (1) **Ground ← brand `bg` only if it's a coloured or dark surface.** If the brand `bg` is white or near-white (luminance > 0.80), set every slide's `backgroundColor` to brand `bgAlt` (or the brand primary), because white light-mode UI on a white ground loses the panel edge. One ground hex per deck. (2) **Headline outcome ← brand `fg` or `fgAlt`**, whichever clears **≥ 7:1** on the chosen ground. The setup line uses a tint of the same hue that clears **≥ 4.5:1**. (3) **Callout ← brand `accent`** only if it clears **≥ 3:1 against the UI surface directly around the ring or underline** (sample the worst pixel within 24px of the stroke) and differs from the ground (≥ 1.5:1 against it, so the ring doesn't read as a hole). If it fails, use brand `accentAlt`, then the brand's darkest saturated shade, then `#E5480C`. (4) Headline face ← brand display font at its bold weight, tracking −0.03 to −0.04em. The accent never becomes text or decoration (`accentAsDecoration` is irrelevant: it appears once, as the callout).

## Typography

**Google Fonts (Full style, OFL):**
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Geist } from "next/font/google";
const display = Geist({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "block" });
// <body className={display.variable}>
```
**Google alternates:** Inter Tight 700, Instrument Sans 700, Schibsted Grotesk 700. **Commercial alternates:** Söhne Halbfett, Graphik Semibold, Neue Haas Unica Bold. One family per deck. No serifs, scripts, monos, italics or condensed faces.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline (both lines) | Geist 700 | 148–176px (default 160) | 0.94 | −0.04em | setup `--muted`, outcome `--fg` |
| One-line headline (≤ 3 words) | Geist 700 | 168–176px | 0.94 | −0.04em | `--fg` |
| App-name line (closer only, optional) | Geist 600 | 44px | 1.1 | −0.01em | `--muted` |
| Legal / licence line (fintech, closer) | Geist 500 | 30–32px | 1.25 | 0 | `--muted` (7.53:1) |

No eyebrows, sub-lines, captions or labels on slides 1–5. The UI inside the crop does all the explaining, which is also what keeps text load low for Google Play. Sentence case. Numerals as typed.

**Thumbnail check (store practice):** at 300px wide (scale 0.227), a 160px headline renders at about 36px, and UI body text at 160% (14pt × 3.42 = 48px) renders at about 11px. The headline must read at that size. The UI only has to be recognisable.

## Headline emphasis (signature)

**Two-tone, setup → outcome.** Line 1 is the setup in `--muted`, and line 2 is the outcome in `--fg`. Same face, size and weight. Tone is the only difference. A one-line headline (≤ 3 words) is all `--fg`.

```css
.h{font:700 160px/0.94 var(--font-display);letter-spacing:-.04em;color:var(--fg)}
.h .setup{display:block;color:var(--muted)}
```
- The outcome line is the payoff the crop proves. Break where the meaning turns: "Ask first. / **Meet sure.**", not "Chat / **before you meet.**" (a dangling verb as setup). Emphasise the result, never a verb alone and never the app name.
- **The accent is never used for emphasis.** It belongs only to the callout. Two orange things = fail.
- Never an underline, highlight block, gradient, italic or glow on headline words.

## Layout grid & safe zones

Canvas 1320 × 2868. Side margin **96px**, top margin **128px**, bottom margin **96px** on non-bleed bottoms.

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 128 | Ground only (unless the panel bleeds top) |
| Headline block | 96, 128, 1128, ≤ 340 | Text only. Flush-left on R slides, flush-left on L slides too (never centred) |
| Headline → panel gap | — | 160–240px from the headline's last baseline box to the panel's top edge |
| Panel | per recipe | Visible 66–80% of height, ≥ 62% of area |
| Callout target | inside the panel's upper 55% | ≥ 260px from the bleed edge, ≥ 48px from any visible panel edge, ≥ 64px from canvas edges |

### Panel recipes (reusable)

`Wr = 940 × E`. `pxPerPt = Wr / screenWidthPt` (440pt for a 6.9" capture, 411–412dp for typical Android captures, the CSS width for web captures). The PNG fed to the editor is the region **already scaled to Wr** with its visible corners alpha-rounded at R. The editor clips the rest at the canvas edge.

**C-R · Corner bleed right (side + bottom).** Default for slides 1, 3, 5.
```
headline  x 96, y 128–≈430, 160px, 2 lines
panel     image element x 96, y 640, width = region width (≥ 1344, ≥ 120px past the right edge), height ≥ 2228 + 40
visible   x 96–1320, y 640–2868 → 1224 × 2228 = 77.7% height, 72.0% area
corners   top-left = R; others off-canvas
```
**C-L · Corner bleed left (side + bottom).** Default for slides 2, 4, 6. Mirror of C-R.
```
panel     image element right edge at x 1224 (x = 1224 − width, negative), y 640
visible   x 0–1224, y 640–2868; top-right = R
source    the screen's RIGHT edge is the visible straight edge (crop the region flush to the screen's right side)
```
**S · Side bleed only (one edge).** For a thread or list whose bottom matters (chat, review).
```
visible   x 96–1320 (or 0–1224), y 600–2772 → 1224 × 2172 = 75.7% height
corners   both non-bleed corners = R; bottom margin 96px is ground
```
**T · Top + side bleed, headline below.** At most once per deck, for rhythm (never slide 1).
```
panel     visible x 0–1224 (or 96–1320), y 0–2120; the free bottom corner = R
headline  x 96, y 2280–≈2600 (2 lines, 160px); bottom margin ≥ 200px
visible   2120 = 73.9% height
```
Empty-band check (quality bar §1): C-R/C-L leave 128 + ≈210px of ground above the panel (≤ 12%). T leaves ≈268px below the headline (9.3%). All pass the 22% limit.

## Phone / device frame treatment

**None.** This style is frameless by definition, and that's the whole point. It's also why it suits Google Play, which discourages device frames.
- No bezel, no Dynamic Island, no status bar (crop below it), no home indicator, no keyboard unless the keyboard is the subject.
- Tilt **0°**, always. No perspective, no 3D, no rotation of the panel.
- **Panel edge:** on the dark ground, no stroke and no shadow (the UI's own surface separates itself). On the light ground, a **2px `--hairline-light` inner stroke** on the visible edges, baked into the PNG. Shadows are off (scene `shadow: 0`). If the UI background and the ground are within 1.25:1, the ground is wrong. Change it (see Brand swap), don't add a shadow.
- **Dark-mode captures** go on the light ground (inverted slide), so a dark panel never sits on a dark ground.

## Background treatment

`background:#1A1446` on every slide, one hex, scene `backdrop: "solid"`. Nothing else: no gradient, noise, glow, vignette, blob, pattern or `span`. Depth comes only from the size of the UI and the cut edge.

## Decorative accents

**Floating decorations: 0** (minimal style, quality bar §9). The only drawn element is **the callout**, exactly one per slide:

**Ring** (controls, chips, cards, fields):
```svg
<!-- image element, PNG/SVG; placed so the ring's inner edge sits 16px outside the target's bounds -->
<rect x="6" y="6" width="{targetW+44}" height="{targetH+44}" rx="{targetRadiusPx+22}"
      fill="none" stroke="#E5480C" stroke-width="12"/>
```
- Stroke **12px** at 1320 (scale with canvas width), 16px gap between the target edge and the ring's inner edge, corner radius = target's own radius in px + 22 (a pill target gets a pill ring).
- The ring may overlap neighbouring UI by up to 28px (its stroke plus gap), but it **must not cross any text glyph**. If it would, switch to an underline or pick a different target.

**Underline** (one text run: a price, a reply, a status):
```svg
<rect x="0" y="0" width="{runWidth}" height="14" rx="7" fill="#E5480C"/>
<!-- top edge at baseline + 0.18em of the UI text; starts at the first glyph's left side bearing, ends at the last glyph -->
```
- **14px** tall, rounded ends, exactly the run's width. Never a hand-drawn squiggle, marker stroke or highlight block behind the text.

Polish gates (quality bar §3) don't apply: nothing is illustrated. The callout is a single flat geometric stroke by design.

## Cross-screen moment

- **Default: none.** Every slide's crop is its own region, and a seam through a crop reads as a layout bug.
- **Allowed (max one, 5+ slide decks, connected-canvas mode only):** a **true continuation** where two neighbouring slides use the **same capture at the same E and the same y offset**, so the panel bleeding off slide N's right edge re-enters slide N+1 from its left edge as pixel-continuous UI. Because of the R/L rhythm this falls naturally on an R → L pair. The seam must cross a horizontal UI gap or a run of plain surface, cutting **10–30%** of the panel's width. Both crops must still show their own callout target fully, at ≥ 260px from the seam.
- **Never crosses:** a headline, a callout, the callout target, prices, names, ratings or any text the headline depends on.

## Copy tone

- **Voice:** outcome first, product-marketing plain. "What you get", not "what it has". Present tense. **≤ 5 words, ≤ 2 lines**, and the two lines pivot setup → result.
- **Story order (first 3 frames carry the deck; only ~15–33% of users scroll):** frame 1 = the core outcome, frame 2 = the core action, frame 3 = the payoff or differentiator. Frames 4–6 = depth, trust, return reason.
- **Vocabulary:** nearby, first, before you, in one place, exactly, side by side, saved, sure, today, yours, plus the app's real nouns (listing, offer, filter, transfer, invoice).
- **Punctuation:** sentence case, a period at the end. No question marks, exclamation marks, emoji, ampersands or ALL CAPS.
- **Facts:** never invent stats, ratings, awards, press logos, user counts, prices or delivery times. Anything the team must confirm is a `[PLACEHOLDER]` (e.g. `[Licensed by REGULATOR, licence no. NNNN]`). Prices and numbers visible in a crop are whatever the real capture shows, from a seeded demo account. Never edit them in.
- **Fintech:** no promised returns, rates or "guaranteed". The closer carries the legal line slot `[REGULATOR / LICENCE LINE FROM LEGAL]` in `--muted` at 30–32px.
- **Banned words:** revolutionary, ultimate, best, #1, game-changing, seamless, effortless, unlock, supercharge, next-level, all-new, world's first, AI-powered (as a headline), "and more", free (in art), download now.
- **Example headlines (12):**
  - Classifieds: "Find it / nearby." · "Ask first. / Meet sure." · "Sell it / today."
  - Motors: "Every spec. / One card." · "Inspected, / on record."
  - Real estate / rentals: "Filter to / exactly it." · "Tour times, / booked."
  - E-commerce / quick commerce: "Cart, sorted." · "Track it / to the door."
  - Fintech: "Fees, / up front." · "Bills, / handled."
  - SaaS: "Approvals / in one tap."

## Per-slide breakdown (mandatory)

Sample app: **Swapyard**, a fictional local classifieds app. Captures: Android emulator at **1800 × 3900, 411dp wide** (pxPerPt at E: 160% → 3.66, 170% → 3.89), so every E up to 180% (1692px) passes `s ≤ 1.00`. Container radius token 16dp → R = 16 × (Wr / 411). The deck uses **two E values (160% and 170%)** so UI type size stays consistent; the R value is computed at 160% (**58px**) and used deck-wide. All headlines are flush-left at x 96, 160px, unless noted. Ground `#1A1446`.

### Slide 1 · Core outcome (C-R, bleed right + bottom) · E 160%
- **Headline:** "Find it / nearby." (setup `--muted`, outcome `--fg`).
- **Crop:** search results screen, from just below the app bar (gap row) down: the filter chip row, then the first listing card and the top of the second. Visible straight edge = screen left edge. Region width 1504px, element at x 96, y 640.
- **Callout:** **ring** around the real distance chip (e.g. `[Within 5 km]`, whatever the capture shows), pill ring, chip centre ≈ x 430, y 780.
- **Must be true:** the chip row is uncut on its left side, the right bleed cuts the 3rd/4th chip (fine, it's non-focal), and the bottom bleed doesn't leave a text sliver. At 300px wide: headline readable, chips recognisable.

### Slide 2 · Core action (S, bleed left only) · E 160%
- **Headline:** "Ask first. / Meet sure."
- **Crop:** chat thread with a seller: the listing summary strip at top, 4–5 real messages, the composer at the bottom. Visible x 0–1224, y 600–2772. Visible straight edge = screen right edge. Both right-side corners R = 58px. Bottom margin 96px ground.
- **Callout:** **underline** under the seller's reply that answers the buyer's question (one text run, e.g. the line that confirms availability). Must sit in the upper 55% of the panel.
- **Must be true:** names and avatars are the seeded demo account, not real users. No message text cut by the left bleed below 60% visibility. Use a narrower region if needed, because messages on the right (sent) side must stay whole.

### Slide 3 · Payoff / differentiator (C-R) · E 170%
- **Headline:** "Sell it / today."
- **Crop:** the post-ad form: photo grid (3 real sample photos), title field, price field. Region width 1598px, element x 96, y 640.
- **Callout:** **ring** around the price field (field radius px + 22).
- **Must be true:** "today" is a promise of speed, so the team must confirm listings can go live the same day. Otherwise use "Sell from / your phone." The keyboard is hidden. The photos are the team's own sample photos, not stock and not generated.

### Slide 4 · Depth (T, bleed top + left, headline below) · E 160%
- **Panel:** filter sheet: price range slider, condition chips, category rows. Visible x 0–1224, y 0–2120. Bottom-right corner R.
- **Headline:** y 2280, "Filter to / exactly it."
- **Callout:** **ring** around the selected condition chip.
- **Must be true:** the top bleed cuts through the sheet's grabber area or a header gap, never the sheet title. The slider's two thumb values are real.

### Slide 5 · Trust (C-R) · E 170%
- **Headline:** "Prices, / side by side."
- **Crop:** listing detail: photo bottom edge (top bleed avoided: start at the gap below the gallery), the price card with seller summary, and the "similar listings" row's first two cards.
- **Callout:** **underline** under the listing's price (the real captured value).
- **Must be true:** no claim about "fair" or "best" price unless the app actually computes one. The similar-row cards are real results of the same search.

### Slide 6 · Return reason / closer (C-L) · E 160%
- **Headline:** "Saved. / Alerted." with an optional app-name line under it: "Swapyard" in Geist 600 44px `--muted`, y ≈ 470.
- **Crop:** saved searches screen with one alert badge, flush to the screen's right edge, top-right corner R.
- **Callout:** **ring** around the alert toggle of the first saved search.
- **Must be true:** still real UI (Apple 2.3.3). No logo slab, no "download now", no rating badge.

### Reference geometry (calibration)

| Slide | Recipe | E / Wr | Source ≥ | s (1800px source) | Visible H / % | Visible area % |
|---|---|---|---|---|---|---|
| 1 | C-R | 160% / 1504 | 1504 | 0.84 | 2228 / 77.7% | 72.0% |
| 2 | S-L | 160% / 1504 | 1504 | 0.84 | 2172 / 75.7% | 70.2% |
| 3 | C-R | 170% / 1598 | 1598 | 0.89 | 2228 / 77.7% | 72.0% |
| 4 | T-L | 160% / 1504 | 1504 | 0.84 | 2120 / 73.9% | 68.5% |
| 5 | C-R | 170% / 1598 | 1598 | 0.89 | 2228 / 77.7% | 72.0% |
| 6 | C-L | 160% / 1504 | 1504 | 0.84 | 2228 / 77.7% | 72.0% |

Bleed sides: R, L, R, L, R, L.

### Google Play behaviour

This is the style's natural store. On **Play phone 1080 × 1920**, scale every px value by 1080/1320 (0.818) for x and type, and use the shorter recipe: headline y 104–≈350 (≤ 4 words preferred, 131px), panel top y 470, visible ≈ 1450px = **75.5% of 1920**. Keep the headline under 25% of canvas area, with no sub-lines, because Play discourages heavy text overlays. The source rule is unchanged: `s ≤ 1.00` against the Play render width. **Feature graphic 1024 × 500:** headline left (x 56, ≤ 3 words, 64px, outcome line only), panel visible from x 520 bleeding right and bottom, top-left corner R × 0.5, no callout (too small to land). On the **App Store**, the same deck works unchanged at 1320 × 2868. Without frames, Apple still counts it as "app in use" because every slide is real UI.

## Adapting to other app categories

| Category | Ground (fg ≥ 7:1) | Callout colour (≥ 3:1 on white UI) | Regions that sell | Callout target |
|---|---|---|---|---|
| Classifieds | `#1A1446` | `#E5480C` (3.99) | filter row, chat thread, price card | distance chip, seller reply, price |
| Motors | `#0F1E2E` | `#E5480C` (3.99) | spec card, inspection report, finance calc | mileage row, pass badge, monthly figure (real) |
| Jobs | `#13302A` | `#C2410C` (5.18) | job card, apply form, application status | salary range, apply button, status step |
| Real estate / rentals | `#1E1B2E` | `#B45309` (5.02) | map + pin card, filter sheet, tour booking | price pin, bedrooms chip, time slot |
| E-commerce | `#2A0F1F` | `#0E7490` (5.36) | product price block, cart, delivery picker | price, variant chip, delivery date |
| Quick commerce | `#0B2A1E` | `#C2410C` (5.18) | basket, ETA tracker, reorder row | ETA (real, from capture), reorder button |
| Fintech | `#0D1B2A` | `#0F766E` (5.47) | send flow fee line, card controls, statement | fee line (underline), freeze toggle |
| SaaS / B2B | `#16161D` | `#4F46E5` (6.29) | approval card, table filter, comment thread | approve button, active filter, mention |

Keep the frameless panel, E band, pixel-integrity rule, R/L rhythm, two-tone headline and single callout. Swap only the ground, the callout colour (re-measure against the actual UI surface) and the regions.

## Dark / inverted & localization notes

- **Dark-mode captures:** put them on the light ground `#F3F1EC` (headline `--fg-alt`, setup `--muted-alt`, callout `--accent-alt` `#FF8A5B` on the dark UI, 7.32:1). The 2px hairline is optional here because a dark panel separates itself. Either the whole deck is light-mode UI on the dark ground, or the whole deck is dark-mode UI on the light ground. Never mix within a deck, because one ground per deck is the rule.
- **Long German / French headlines:** shrink in 4px steps to 148px. If the widest line is still over 1128px, rewrite shorter. Never 3 lines. Captures must be re-taken per locale (`{locale}` in the screenshot path), since a crop of English UI under a German headline fails review in both stores.
- **CJK:** Noto Sans JP / SC / KR 700, `letter-spacing:0`, line-height 1.1, about 144px. The two-tone split still applies.
- **RTL (Arabic / Hebrew):** mirror everything, including the rhythm. Headlines are flush-right at x = 1224 (right edge). Slide 1 bleeds **left** in RTL, because the visible straight edge must be the screen's leading (right) edge, where RTL UI starts. Then alternate L, R, L, R, L, R. Noto Sans Arabic / Hebrew 700, `letter-spacing:0`, line-height 1.2. Underlines run under the RTL run's glyph extent. Re-capture in RTL. Never mirror an LTR capture (that invents UI).

## Style-specific QA checklist

- [ ] No device frame, status bar or home indicator on any slide.
- [ ] For every slide: E is 140–180%, `Wr = 940 × E`, and `s = Wr / Wsrc ≤ 1.00`. The source pixel width is recorded in the hand-off.
- [ ] Each panel is one contiguous rectangle from one capture. A diff against the source crop shows changes only in corner alpha (and the hairline on light grounds).
- [ ] Visible panel height 66–80% and visible area ≥ 62% of canvas.
- [ ] Bleeds off 1–2 edges. At least one visible straight edge is the real screen edge.
- [ ] Visible corners all use one R (48–112px) derived from the app's container radius.
- [ ] Bleed sides alternate R/L across the deck (mirrored for RTL).
- [ ] Exactly one callout. It's a ring or an underline in the accent, ≥ 3:1 against the UI around it, crossing no glyph.
- [ ] The accent appears nowhere else on the slide.
- [ ] The callout target is in the upper 55% of the panel, ≥ 260px from the bleed edge, fully visible.
- [ ] Visible panel edges fall in UI gaps. Bleed edges leave no text sliver under 60% cap height.
- [ ] Ground is one flat hex, the same on every slide. No decoration.
- [ ] Headline ≤ 5 words, ≤ 2 lines, widest line ≤ 1128px. Outcome ≥ 7:1, setup ≥ 4.5:1.
- [ ] Every number, name and price in a crop comes from the seeded capture. Facts not yet confirmed are `[PLACEHOLDERS]`.
- [ ] At 300px wide: the headline reads, and the region and callout are recognisable. The first three slides tell outcome → action → payoff.

## Common failure modes

1. **Upscaled native captures.** A 1290px iPhone capture stretched to 160% (1504px) is 1.17× upscaled. Text edges go soft at full size, and reviewers notice. **Fix:** re-capture at higher density (step 1 below), or use E = 137% and accept this isn't the style. Never upscale, and never AI-enhance.
2. **"Improving" the UI.** Deleting a cluttered chip, nudging a card, retyping a price, extending a list to fill the panel. That's invented UI and an Apple 2.3.3 risk. **Fix:** pick a different region or re-capture with seeded data.
3. **A floating card.** The panel sits fully inside the canvas with four rounded corners and a drop shadow. That's a screenshot card, not a crop. **Fix:** bleed 1–2 edges and use no shadow.
4. **Everything bleeds.** The panel covers three or four edges, which is just a full-screen screenshot with a headline on top. **Fix:** keep the 96px non-bleed margin and the headline zone.
5. **Same side twice.** Two consecutive right-bleeds kill the pan rhythm. **Fix:** R, L, R, L.
6. **Callout soup.** Ring plus arrow plus label plus dimmed surroundings. **Fix:** one ring or one underline, nothing else.
7. **Accent in the headline.** The orange emphasis word competes with the ring. **Fix:** two-tone headline only, with the accent saved for the callout.
8. **Wrong radius.** A generic 24px or 40px corner, or a different radius per slide. **Fix:** R = the app's container radius × pxPerPt, one per deck.
9. **Pasted-on corner.** The crop starts mid-element and the rounded corner slices a chip in half. **Fix:** visible edges in UI gaps, with the straight edge on the real screen edge.
10. **White UI on a white ground.** The panel disappears. **Fix:** a coloured or dark ground (Brand swap rule 1), not a shadow.
11. **Too much zoom.** At 220%+ nobody knows what the region is. **Fix:** stay within 140–180%, and include one landmark (app bar gap, section title, tab label) in the crop.
12. **Bezel creep.** Someone adds the default phone "for consistency". **Fix:** this style is declared no-device. Use a framed style instead if frames are required.

## How to apply this style

1. **Capture at density.** Decide E per slide first, then capture at ≥ `940 × E` px wide. **Web / mobile web:** Playwright `viewport {width: 430, height: 932}, deviceScaleFactor: 4` → 1720px (supports up to 182%). **Android:** emulator or device with `adb shell wm size 1800x3900 && adb shell wm density 700` (= 411dp wide at 1800px), then reset with `wm size reset && wm density reset`. **iOS native:** the simulator captures at device scale (1320px on 6.9"), so cap E at 140% (`Wr = 1316`, `s = 0.997`). Seed demo data, use the real build, and hide the keyboard and debug banners. Record `Wsrc` for every capture.
2. **Crop offline, not in the editor.** For each slide, cut one rectangle from the capture at the region, scale it down to `Wr` (Lanczos, never up), alpha-round only the visible corners at R, add the 2px hairline only on the light ground, and export PNG. This is the panel. The editor's image elements have no radius or crop-offset control, so the rounding and cropping are baked in here.
3. **Theme:** add `oversized-ui-crop` to `THEMES` in `src/lib/constants.ts`: `bg #1A1446`, `bgAlt #F3F1EC`, `fg #F6F4FF`, `fgAlt #15122E`, `accent #E5480C`, `accentAlt #FF8A5B`, `muted #ACA6E0`.
4. **Fonts:** load Geist (500/600/700) as `--font-display` with the snippet above.
5. **Scene:** `backdrop: solid`, `span: false`, `decoration: none`, `shadow: 0`, `glow: 0`, `tilt: 0`, `headlineWeight: 700`, `headlineScale: 1.3` (≈ 158px at 1320; the built-in caption is `0.092 × width`), `headlineCase: as-typed`, `captionAlign: left`.
6. **Slides:** layout `no-device` on every slide (the device is never rendered). Remove the default `callout` loupe. The built-in caption carries the headline. Its two-tone setup line needs either a caption that supports per-line colour or two **text elements** (setup in `--muted`, outcome in `--fg`, same size and weight), positioned from the zone table.
7. **Panel:** one **image element** per slide with the PNG from step 2, `fit: "contain"` at its native aspect, `zIndex` 1, placed by the recipe (C-R x 96 / y 640; C-L with its right edge at 1224; S; T). Let it run past the canvas edge, since the canvas clips it.
8. **Callout:** one more **image element** (SVG ring or underline from *Decorative accents*), `zIndex` 2, positioned from the target's measured bounds in the scaled panel. Use the native SVG size, no rotation.
9. **Connected canvas:** off by default. Use it only for the single true-continuation pair (same capture, same E, same y).
10. **Measure:** headline widest line ≤ 1128px, panel visible height and area against the table, `s ≤ 1.00` per slide, callout ≥ 3:1 against the sampled UI, ring clear of glyphs, cut lines in gaps. Then run the checklist above plus `_QUALITY_BAR.md` §10–11 (thumbnail test at 220px and at 300px).

## What this style is NOT

- Not a framed style: no bezel, ever. (Swiss 08 and Bento 15 crop a *phone*. This crops the *UI*.)
- Not a full-screen screenshot with a title: the region is chosen, enlarged and bled off 1–2 edges only.
- Not a mockup: nothing is redrawn, rebuilt in vector or "cleaned up". Real pixels or nothing.
- Not upscaled: if the source can't support the enlargement, the enlargement goes down. The source never gets stretched.
- Not annotated: one ring or one underline. No arrows, labels, loupes, spotlights or dimming.
- Not decorated: no blobs, gradients, grain, stickers, badges, ratings, laurels or press logos.
- Not tilted, floating or 3D: the panel is flat, upright and cut by the canvas.
- Not colourful: one ground, one two-tone headline, one accent mark per slide.
