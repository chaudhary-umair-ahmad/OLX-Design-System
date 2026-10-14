---
name: floating-card-stack
description: An upright phone on a flat, soft single-tone ground, with 2–3 real UI components lifted out of the same capture (a listing card, a price chip, a seller badge, a notification) floating over its edge at 110–130% scale with soft layered shadows. The floats are pixel crops of the screenshot in the phone, never redrawn, and the original stays visible on screen. Inspired by "exploded UI" marketing frames.
inspiration: "exploded UI" product-marketing frames, achievement and receipt cards floating over devices in 2025-26 store sets, Airbnb and Vinted store galleries, Wise and Revolut feature frames, Shopify app-store listing frames
feel: tactile, honest, close-up, "look, this is the actual thing you'll tap"
---

# Floating Card Stack

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style.

## Hard quality rules (this style)

- **Floats are pixel crops of the capture in the phone, nothing else.** Every floating card is a rectangle cut from the *same* screenshot file the phone shows on that slide, at that locale. No redrawing, no re-typesetting, no recolouring, no cloned-out elements, no "cleaned up" numbers, no crops borrowed from another capture. If the component you want isn't visible in this slide's capture, change the capture or drop the float. Never invent one.
- **The origin stays visible.** The component a float was lifted from must still be visible inside the phone screen, uncovered by any float, by the phone's bottom edge or by the bezel. A viewer must be able to match float → origin in under 2 seconds. That match is the proof that the UI is real.
- **Float count: 1–3 per slide, never more.** Deck average ≤ 2. At least one slide in a 6-slide deck has exactly one float, the "breather".
- **Float scale: 110–130% of the component's displayed size in the phone**, and never above **1.0× the capture's native pixels**. Displayed scale in the phone = `screenWidth / captureWidth` (880 / 1290 = 0.682 for a 1290px iOS capture, so 130% = 0.887× native, still sharp). For a 1080px Android capture 130% = 1.06× native, so cap it at **122%**. A blurry float is an instant fail.
- **Coverage cap: all floats together cover ≤ 20% of the phone screen area** (≤ 335,800px² of the 880 × 1908 = 1,679,040px² screen at the standard phone). Measure the intersection of each float's card rect with the screen rect, not the shadow.
- **Never on the headline.** Float card rects (plus 24px of shadow core) stay **≥ 64px** from the headline's bounding box. A float never crosses a text line, ever.
- **Phone: upright 0°, width 960–1010px, visible height 68–72% of canvas** (standard: W 980, H 1996 = **69.6%**). Template default bezel always. The phone sits fully on canvas or bleeds ≤ 4% off the bottom. Never off the top or a side.
- **Floats are upright 0°, too.** Depth comes from scale + shadow + stacking order only. A rotated text crop goes soft at thumbnail size and reads as a sticker.
- **Ground = one flat hex** (default `#EEF0F3`). The one permitted softening is a same-hue lighting falloff (spotlight) with ≤ 4% lightness delta and zero hue shift. No gradients with hue shift, no grain, no blobs, no glass.
- **Decorations: 0.** The floats are the content. The only drawn thing allowed is **one thin connector per slide max** (3px line + origin ring), and it counts as the slide's single annotation. No sparkles, arrows with heads, badges, ratings, laurels, emoji or captions next to floats.
- **Headline:** Plus Jakarta Sans 800, **108–128px** (standard 120), leading 1.0, tracking −0.03em, ≤ 5 words, ≤ 2 lines, measured width ≤ 1160px. Ink `#14161B` = 15.85:1 on the ground; emphasis word `#2747D6` = 6.22:1.

## Vibe summary

It looks like someone pressed on the screen and the best bits popped up off the glass. A big upright phone stands on a quiet cool-grey ground and shows a real screen of the app. Two or three pieces of that same screen, say the listing card, the price, the seller's verified badge, have lifted off and hover just past the phone's edge, a little bigger than life, each with a soft layered shadow that says it's closer to you than the phone is. You can see where each one came from, because the original is still there on the screen below. A thin line sometimes points back to it. The headline is short, heavy and dark, with one blue word naming the thing that's floating. There's nothing else on the slide: no confetti, no stickers, no gradient. It's honest, so it looks like the app and not like a poster about the app.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ground` | `#EEF0F3` | Slide background (flat) | — |
| `--ground-lit` | `#F4F6F8` | Spotlight centre (optional falloff only) | ink 16.71:1 |
| `--ground-edge` | `#E9ECF0` | Spotlight edge (optional) | ink 15.27:1, accent 5.99:1 |
| `--ink` | `#14161B` | Headline, sub-line | 15.85:1 on ground |
| `--accent` | `#2747D6` | Emphasis word, connector line, origin ring | 6.22:1 on ground, 7.10:1 on white screens |
| `--muted` | `#545A66` | Optional sub-line, store-legal line | 6.07:1 on ground |
| `--night` | `#14161B` | Inverted slide ground (max 1 per deck) | — |
| `--ink-on-night` | `#F3F4F6` | Headline on night | 16.45:1 |
| `--accent-on-night` | `#9DB0FF` | Emphasis + connector on night | 8.69:1 |
| `--muted-on-night` | `#A3A9B6` | Sub-line on night | 7.68:1 |
| `--shadow-tint` | `rgb(27,36,64)` / `#1B2440` | All shadows, at the alphas below | — |
| `--float-hairline` | `rgba(27,36,64,.08)` | 2px inner edge on white floats over light ground | — |

**Colour discipline:** the slide's colour comes from the floats, because they're real UI with real photos. Everything the style adds is ink, one accent and a grey ground. The accent appears **at most twice per slide**: the emphasis word plus (optionally) the connector. Never fill a shape with it.

**Brand swap (Brand + style mode):** brand `bg` → `--ground`, but only if it's a light, low-chroma tone (L* ≥ 90). A saturated brand bg is too loud behind real UI, so use a 6–8% tint of the brand's neutral instead. Brand `bgAlt` → `--night` (the one inverted slide). Brand `fg` → `--ink`, which must clear **≥ 7:1** on the ground. Brand `accent` → the emphasis word if it clears **≥ 4.5:1** on the ground, and → connector + origin ring if it clears **≥ 3:1** on the ground *and* ≥ 3:1 on the capture's screen colour at the origin. If the accent fails 4.5:1, the emphasis word stays `fg` (the float carries the emphasis) and the accent is used only for the connector. `--shadow-tint` = the brand ground's hue at ~25% lightness. Never pure black. `accentAsDecoration: false` changes nothing here, because this style has no decoration.

## Typography

**Google Fonts (Full style):**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@500;600&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "block" });
const text = Inter({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-text", display: "block" });
// <body className={`${display.variable} ${text.variable}`}>
```
Both are OFL. **Commercial alternates:** Gilroy, Satoshi, General Sans, Graphik. One display family per deck. No serifs, scripts, monos or condensed faces, because the floats already carry the app's own type and a second personality fights them.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Plus Jakarta Sans 800 | 108–128px (std 120) | 1.00 | −0.03em | `--ink` + accent word |
| Sub-line (optional, slides 1 and 6 only) | Inter 500 | 40–44px | 1.25 | −0.01em | `--muted` |
| Legal / licence line (fintech, from legal) | Inter 500 | 28–30px | 1.3 | 0 | `--muted` (6.07:1) |

Rules: sentence case. No text other than these three roles is added to the slide. All other words on the slide belong to the floats and the phone, i.e. to the app.

## Headline emphasis (signature)

**The word-to-card rule:** one word (or a 2-word phrase) per headline takes `--accent`, and **that word names the primary float**. "Know the **seller** first." floats the seller card. "**Filters** that fit." floats the active-filter chips. "Price drops, **pinged**." floats the notification. The headline and the lifted card say the same thing twice, once in words and once in pixels, and that echo is the style.

```css
.headline{font:800 120px/1.0 var(--font-display);letter-spacing:-.03em;color:#14161B}
.headline em{font-style:normal;color:#2747D6}   /* same weight, same size: colour is the only change */
```
- No underline, highlight block, italic, gradient or glow on the emphasis.
- If the emphasis word and the primary float don't match, rewrite the headline or swap the float. A headline about speed over a float of a seller badge is a fail.
- The primary float is the largest one (120–130%, elevation e2). Secondary floats are 110–118% (e1).

## Layout grid & safe zones

Canvas 1320 × 2868. Side margin **72px**. Template phone geometry (bezel 1022 × 2082; screen L 52, T 46, W 918, H 1990): at **W = 980**, phone H = **1996**, screen inset x **50**, screen top offset **44**, screen **880 × 1908**, screen corner radius **121px**.

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 128 | Empty ground |
| Headline block | 72, 128, 1176, 216–256 | Text only. Floats keep 64px clear |
| Breathing band | headline-bottom → 600 | Ground; floats may enter only below headline-bottom + 64 |
| Phone | see recipe, y 600–2596 | Upright, 69.6% |
| Float field | the 72–1248 × 432–2700 area minus the headline keep-out | Floats only; card rects ≥ 48px inside canvas edges |
| Bottom margin | 0, 2596, 1320, 272 | Ground (floats may dip ≤ 104px into it) |

Headline + phone span 128 → 2596 = **86%** of canvas (≥ 80% ✓). Largest empty band 272px = 9.5% (≤ 22% ✓).

### Reusable layout recipes

**R1 · Offset left, floats right** (default, hero/detail/closer)
```
headline  x 72, y 128, left-aligned, 2 lines @120
phone     x 72–1052, y 600–2596   screen x 122–1002, y 644–2552
floats    right field x ~680–1248, overhanging the phone's right edge by 250–330px
          origins must sit in the LEFT half of the screen (x 122–560) so floats never cover them
```
**R2 · Centered, flanking** (core action / alert)
```
headline  centered, y 128
phone     x 170–1150, y 600–2596   screen x 220–1100
floats    one crosses the left edge (x ≥ 72), one the right edge (≤ 1248), staggered ≥ 400px vertically
          never both at the same height (that reads as a symmetrical template)
```
**R3 · Offset right, floats left** (mirror of R1; use for the slide after an R1 so the seam pairs)
```
phone     x 268–1248, screen x 318–1198
floats    left field x 72–~740; origins in the RIGHT half of the screen
```

**Float sizing worksheet** (do it per float, write the numbers in the hand-off):
1. Measure the component's rect in the capture's native pixels, e.g. a grid card 616 × 840.
2. Displayed size = native × (880 / captureWidth) → 420 × 573.
3. Float size = displayed × scale (1.10–1.30) → at 1.25: 525 × 716. Check ≤ native (616 ✓).
4. Coverage = area(float ∩ screen rect). Sum all floats ≤ 335,800px².
5. Check the origin rect is untouched by every float rect.

**Crop rules.** Cut on the component's own edge (card border, chip outline) with its own corner radius × scale. If the component has no edge of its own (a price line, a badge on a card), cut a rounded rectangle with **≥ 20px displayed padding of the capture's own surface** on every side, radius **28px** at 1320, and include no part of a neighbouring element. A crop edge slicing through a letter, an icon or a photo subject = re-crop. Full-width components (seller row, notification) may be cut to their meaningful part (avatar + name + badge) as long as the cut falls in the component's empty surface.

## Phone / device frame treatment

- Template default bezel (`public/mockup.png` via the `Phone` component in `src/components/editor/device-frames.tsx`). Never bezelless on App Store sets, never clay, never a custom frame.
- Upright 0°, W 960–1010 (std 980), top y 600. Fully on canvas, or a bottom bleed of ≤ 80px (4%) when a tall headline pushes it down. Make sure the origins aren't lost in the bleed.
- The phone is the **back layer** (z 1). Connector z 2, e1 floats z 3, e2 float z 4.
- Phone shadow (the lowest elevation, e0):
```css
.phone{filter:drop-shadow(0 6px 12px rgba(27,36,64,.14)) drop-shadow(0 40px 64px rgba(27,36,64,.16))}
```
- Float shadows, three layers each (contact + key + ambient), always the tint, never black:
```css
.float.e1{filter:drop-shadow(0 2px 4px rgba(27,36,64,.10)) drop-shadow(0 10px 20px rgba(27,36,64,.14)) drop-shadow(0 28px 48px rgba(27,36,64,.16))}
.float.e2{filter:drop-shadow(0 3px 6px rgba(27,36,64,.12)) drop-shadow(0 18px 36px rgba(27,36,64,.18)) drop-shadow(0 52px 96px rgba(27,36,64,.24))}
.float.white{box-shadow:inset 0 0 0 2px rgba(27,36,64,.08)} /* white crop on light ground only */
```
Bigger float = higher elevation = longer shadow. A small float with the biggest shadow breaks the depth logic.
- **Do not use the editor's Magnifier** (`callout`) for floats. Its zoom starts at 1.5× and it's a lens over the screenshot, which is a different look. Floats are image elements.

## Background treatment

`backdrop: solid`, `#EEF0F3`. Optional `spotlight`: radial, centre `#F4F6F8` at the phone's centre, edge `#E9ECF0` at 900px radius. Same hue, ≤ 4% L delta. Use it on every slide or on none. No grain (it fights the crisp crops), no vignette, no `span`.

Category grounds (pick one per deck, all flat):

| Ground | Hex | Ink on it | Suggested accent (≥ 4.5:1 on it) | Fits |
|---|---|---|---|---|
| Mist (default) | `#EEF0F3` | 15.85:1 | `#2747D6` (6.22) | classifieds, fintech, SaaS |
| Oat | `#F3EEE7` | 15.68:1 | `#A63F18` (5.44) | e-commerce, rentals, food |
| Sage | `#EAF0EC` | 15.66:1 | `#1E6B47` (5.59) | real estate, grocery / quick commerce |
| Lilac | `#F1ECF4` | 15.55:1 | `#6A3FC8` (5.71) | social commerce, beauty |
| Sky | `#EDF2F7` | 16.07:1 | `#1D5FB8` (5.51) | motors, jobs, travel |

Pick the ground that the captures' dominant UI colour does *not* use, so white cards still separate.

## Decorative accents

Floating decorations: **0** (§9: minimal). The only additions, all optional:

1. **Connector (max 1 per slide):** a 3px `--accent` line, round caps, either straight or with one 90° elbow (24px radius), from the float's nearest edge midpoint to the **origin ring**: a 3px `--accent` rounded-rect outline drawn 8px outside the origin component's displayed rect, radius = its radius + 8. A 12px accent dot at the float end. No arrowheads, no dashes, no label. The line runs *under* the float (z 2) and over the phone. Contrast ≥ 3:1 against ground and against the screen pixels it crosses. If it crosses a busy photo, drop it.
2. **Sub-line:** slides 1 and 6 only, ≤ 8 words, Inter 500 at 42px, 24px under the headline.
3. **Legal line (fintech):** bottom margin, y ≈ 2760, centred, `[REGULATOR / LICENCE LINE FROM LEGAL]`. Never paraphrased.

Polish gates (§3): the floats are real UI, so detail density comes from the app. Volume = the three-layer shadow plus the scale step. Don't draw illustration in this style.

## Cross-screen moment

- **Default in 5+ decks: one**, the *photo float*. An R1 slide followed by an R3 slide makes the 3|4 seam a natural meeting point. On the R1 slide, one float may be a **photo-only** crop (a listing thumbnail with no text in it, from a thumbnail visible in that slide's capture) that crosses the right seam by **15–30% of its width**. The seam cuts only photo pixels and shadow.
- Its text-free status is the whole permission. A crop with a price, title or badge never crosses.
- On the receiving slide it must sit in empty ground, ≥ 120px from that slide's floats and outside its phone.
- If the capture has no text-free thumbnail, skip the moment. Never fake one.
- **Never crosses:** headlines, the phone, any float with text, the connector, the legal line.

## Copy tone

- **Voice:** plain and outcome-led. The headline tells the payoff and the float shows the evidence. ≤ 5 words, readable at 300px wide.
- **Story order:** frames 1–3 do the work. 1 = the promise (find / buy / pay), 2 = the core action, 3 = the payoff or trust proof. 4–6 = depth (talk, get alerted, sell / repeat).
- **Shape:** short declaratives with a period. "Good finds, close by." / "Know the seller first." Commas pair parallels. No question marks, exclamation marks, emoji, ALL CAPS or ampersands.
- **Numbers and facts:** only what the capture shows or the team confirms. Prices, ratings, counts, delivery times, "in minutes" and similar claims are `[PLACEHOLDERS]` until the team fills them. Never invent stats, ratings, awards or press logos. **Fintech:** no promised returns or rates, and leave a slot for the licence line.
- **Banned words:** revolutionary, ultimate, best, #1, game-changing, supercharge, unlock, seamless, next-level, effortless, magic, AI-powered (as a headline), "and more", all-new, world's first, free (in art), download now.
- **Example headlines (word-to-card):**
  - Classifieds: "Good **finds**, close by." (listing card) / "Know the **seller** first." (seller badge) / "Make an **offer**." (offer bubble)
  - E-commerce: "Your **size**, in stock." (size selector) / "**Delivery** you can track." (tracking card)
  - Quick commerce: "**Basket** to door." (cart total pill) / "Reorder in **one tap**." (reorder card)
  - Fintech: "Every **payment**, clear." (transaction row) / "**Split** the bill." (split card)
  - Real estate: "Talk to the **agent**." (agent badge) / "See the **floor plan**." (plan thumbnail)
  - Motors: "Every **spec**, upfront." (spec chips) / "**Inspected** cars." (inspection badge, if it's a real product feature)
  - Jobs: "Track every **application**." (status card)
  - SaaS: "**Alerts** that matter." (notification)

## Per-slide breakdown (mandatory)

Sample app: **Swapyard**, a fictional second-hand marketplace (iOS captures 1290 × 2796; displayed scale 0.682). Standard phone W 980, y 600–2596 on every slide. Bracketed values are what the capture shows. Never type them in from imagination.

### Slide 1 · Hero / promise (R1)
- **Capture:** home feed, 2-column listing grid.
- **Headline:** x 72, y 128, 120px: "Good **finds**, / close by." Sub-line (optional): "[Swapyard tagline from the team]".
- **Phone:** x 72–1052.
- **Float A (e2, 125%, primary):** the first listing card of the left column (origin ≈ screen x 138–558, y 1180–1753). Card 525 × 716 at **x 723–1248, y 1240–1956**. Covers the screen x 723–1002 → 279 × 716 = 199,800px².
- **Float B (e1, 115%):** the location chip at the top of the feed, "[Area · distance]" (origin ≈ x 138–430, y 760–840). Chip 336 × 92 at **x 880–1216, y 900–992**. Covers 122 × 92 = 11,200px².
- **Total coverage:** 211,000px² = **12.6%** ✓. No connector (the word-to-card echo is enough).
- **Must be true:** at 300px wide you read "Good finds", see a real card bigger than life, and can spot its twin in the left column.

### Slide 2 · Core action (R2)
- **Capture:** search results with active filters.
- **Headline:** centred, y 128: "**Filters** that fit."
- **Phone:** x 170–1150 (screen 220–1100).
- **Float A (e2, 118%):** the active-filter chip strip, "[Category] [Price range] [Condition]", cut to its first three chips (origin ≈ x 236–700, y 830–900). 548 × 83 at **x 72–620, y 1000–1083**. Covers 400 × 83 = 33,200px².
- **Connector:** from Float A's top edge at x 400 straight up to the origin ring around the strip (y 822–908).
- **Float B (e1, 120%):** one result card from the right column (origin ≈ x 664–1084, y 1300–1873). 504 × 688 at **x 744–1248, y 1960–2648**. Covers (1100−744) × (2552−1960) = 356 × 592 = 210,800px².
- **Total:** 244,000px² = **14.5%** ✓. Floats staggered 960px vertically.
- **Must be true:** the chips in Float A read at thumbnail size, and the connector touches nothing but ground, bezel and the ring.

### Slide 3 · Payoff / trust (R1)
- **Capture:** listing detail (photos, price, title, seller card, "similar items" thumbnails).
- **Headline:** x 72, y 128: "Know the / **seller** first."
- **Float A (e2, 130%, primary):** the seller card cut to avatar + name + verified badge + "[member since]" (origin ≈ x 138–578, y 2050–2220). 572 × 221 at **x 676–1248, y 1720–1941**. Covers 326 × 221 = 72,000px².
- **Connector:** an elbow from Float A's bottom edge (x 760) down to the origin ring.
- **Float B (e1, 112%):** price + "[Negotiable]" tag (origin ≈ x 154–514, y 1160–1250). 403 × 101 at **x 845–1248, y 1000–1101**. Covers 157 × 101 = 15,900px².
- **Float C (cross-screen photo float, e1, 130%):** one "similar items" thumbnail, photo only (origin ≈ x 138–358, y 2380–2545). 286 × 215 at **x 1104–1390, y 2300–2515**. 70px (24%) crosses into slide 4. Covers 0px² of this phone.
- **Total:** 87,900px² = **5.2%** ✓. Three floats, so no sub-line.
- **Must be true:** the badge in Float A is pixel-identical to the one on screen. No price appears anywhere but in Float B and its origin.

### Slide 4 · Talk (R3)
- **Capture:** chat thread with an offer card.
- **Headline:** x 72, y 128: "Make an **offer**."
- **Phone:** x 268–1248 (screen 318–1198).
- **Float A (e2, 125%):** the offer card "[Offer · PRICE] [Accept] [Counter]" (origin ≈ x 680–1180, y 1900–2160). 650 × 325 at **x 72–722, y 1300–1625**. Covers 404 × 325 = 131,300px².
- **Float B (e1, 110%):** the quick-reply chip "[Is it still available?]" (origin ≈ x 334–734, y 2420–2500). 440 × 88 at **x 72–512, y 2040–2128**. Covers 194 × 88 = 17,100px².
- **Incoming:** slide 3's photo float occupies x 0–70, y 2300–2515, on empty ground 172px below Float B (≥ 120px ✓). Placing B lower, at y 2140, would leave only 72px. That's the first thing to check when you move floats on a receiving slide.
- **Total:** 148,400px² = **8.8%** ✓.
- **Must be true:** the offer amount in the float equals the one in the bubble. The exported PNG reads fine with the photo sliver at its left edge.

### Slide 5 · Alert, the breather (R2, 1 float)
- **Capture:** lock screen showing the app's price-drop notification.
- **Headline:** centred, y 128: "Price drops, **pinged**."
- **Float A (e2, 115%):** the notification "[Item] dropped to [PRICE]" (origin ≈ x 240–1080, y 1560–1750). 966 × 219 at **x 72–1038, y 1120–1339**. Covers 818 × 219 = 179,100px² = **10.7%** ✓.
- No connector, because the float sits 220px straight above its origin.
- **Must be true:** the lock-screen clock stays readable above the float. Nothing else is on the slide.

### Slide 6 · Sell / closer (R1)
- **Capture:** Post-an-ad review step (photo strip, title, price field, Post button).
- **Headline:** x 72, y 128: "**Snap** it. / Sell it." Sub-line (optional): "[App name] · [store tagline]".
- **Float A (e2, 120%):** the photo strip cut to its first three tiles (origin ≈ x 138–588, y 880–1030). 540 × 180 at **x 708–1248, y 1150–1330**. Covers 294 × 180 = 52,900px².
- **Float B (e1, 110%):** the price field, label + "[PRICE]" (origin ≈ x 138–538, y 1650–1770). 440 × 132 at **x 808–1248, y 1900–2032**. Covers 194 × 132 = 25,600px².
- **Total:** 78,500px² = **4.7%** ✓.
- **Must be true:** the deck ends on the user's own action. Neither float is the Post button (a floating CTA reads as an ad, not the app).

### Reference numbers (calibration)

| Slide | Recipe | Floats | Coverage | Phone visible | Headline width (est.) |
|---|---|---|---|---|---|
| 1 | R1 | 2 | 12.6% | 1996px / 69.6% | ~760px |
| 2 | R2 | 2 | 14.5% | 69.6% | ~980px |
| 3 | R1 | 3 | 5.2% | 69.6% | ~700px |
| 4 | R3 | 2 | 8.8% | 69.6% | ~950px |
| 5 | R2 | 1 | 10.7% | 69.6% | ~1150px (drop to 112px if over 1160) |
| 6 | R1 | 2 | 4.7% | 69.6% | ~560px |

Deck average 2.0 floats ✓, one breather ✓, one connector on two slides only ✓, one cross-screen moment ✓.

## Adapting to other app categories

| Category | Best floats (from the same capture) | Primary-float headline angle | Watch out |
|---|---|---|---|
| Classifieds | listing card, seller / verified badge, offer bubble, saved-search notification | trust, nearness | badge must be a real feature on that listing |
| E-commerce | product card, size / variant selector, "added to bag" toast, tracking card | fit, certainty | sale prices are placeholders, never invented "−50%" |
| Quick commerce | ETA chip, cart total pill, reorder card | speed only if the team gives the real figure | no promised minutes without data |
| Fintech | transaction row, split card, card-freeze toggle, payment-sent toast | clarity, control | demo account only; mask card numbers; no returns or rates; licence line slot |
| Real estate / rentals | property card, agent badge, floor-plan thumbnail, date-range chip | confidence, detail | price / m² only as captured |
| Motors | spec chip row (year · km · fuel), inspection badge, price card | transparency | never imply an inspection the product doesn't do |
| Jobs | job card, application status card, "[salary range]" chip only if shown | progress | no invented salaries |
| SaaS | notification, KPI card from a demo workspace | signal over noise | demo data only, never a real customer's |

Keep the ground, phone geometry, float rules and type. Swap only the ground tint, the accent and the copy.

## Dark / inverted & localization notes

- **Inverted slide (max 1 per deck, optional):** ground `#14161B`, headline `#F3F4F6` (16.45:1), emphasis + connector `#9DB0FF` (8.69:1). Floats keep their real pixels. Shadows become `rgba(0,0,0,.45/.55/.60)` for the three layers, plus a 2px `rgba(255,255,255,.08)` inner edge on every float so dark UI crops don't melt into the ground. If the app's captures are dark-mode, prefer the light ground for every slide.
- **Google Play:** Play discourages device frames and heavy text. The composition holds up there because floats are real UI, not promotional text. Keep headlines ≤ 4 words. A team may choose a **frameless Play set**: the screen becomes a rounded rect of radius 121px with the e0 shadow, and floats stay identical. It's a deliberate deviation from §7 for Play only, and the hand-off must record it. Feature graphic 1024 × 500: headline left, phone cropped at y 40 on the right, ≤ 2 floats.
- **Long German / French:** shrink the headline in 4px steps to 108px. Still over 1160px? Allow 3 lines and move the phone down by up to 80px (bottom bleed ≤ 4%). Don't shrink floats to compensate.
- **CJK:** Noto Sans JP / SC / KR 800, letter-spacing 0, line-height 1.12, size −8% (≈ 110px). Crops come from the CJK capture.
- **RTL (Arabic / Hebrew):** mirror the recipes (R1 ↔ R3, floats overhang the left edge). **Crops come from the RTL capture, and pixels are never mirrored.** Headline right-aligned at x 1248, IBM Plex Sans Arabic or Noto Sans Arabic / Hebrew 700, letter-spacing 0, line-height 1.2. The connector elbow mirrors.

## Style-specific QA checklist

- [ ] Every float is a crop of this slide's capture at this locale. Diff it against the screenshot: pixels identical apart from scale.
- [ ] Every float's origin is visible on screen and uncovered.
- [ ] 1–3 floats per slide; deck average ≤ 2; at least one single-float slide.
- [ ] Each float is at 110–130% of displayed size and ≤ 1.0× native pixels (no blur at 100% zoom).
- [ ] Sum of float ∩ screen areas ≤ 20% of the screen (≤ 335,800px² at W 980).
- [ ] No float within 64px of the headline box; no float card within 48px of a canvas edge (except the text-free cross-screen photo float).
- [ ] Phone upright, W 960–1010, visible height 68–72%, default bezel, not cropped off the top or a side.
- [ ] Floats upright 0°; larger float = higher elevation = longer shadow; shadows use the tint, never black.
- [ ] Ground is one hex (or the same-hue spotlight on every slide); no grain, gradient hue shift or blobs.
- [ ] Headline ≤ 5 words, ≤ 2 lines, ≤ 1160px measured; emphasis word names the primary float; accent ≥ 4.5:1.
- [ ] ≤ 1 connector, no arrowheads or labels; no other drawn element on the slide.
- [ ] Every number, price and badge on the slide agrees between float, origin and headline; unknown facts are placeholders.
- [ ] At 300px wide: headline legible, primary float legible, float ↔ origin match obvious.

## Common failure modes

1. **Redrawn cards.** Rebuilding the listing card in HTML because the crop "looked soft". This breaks Apple 2.3.3's spirit and the whole premise. **Fix:** re-capture at higher resolution or lower the scale. Never redraw.
2. **Orphan floats.** A beautiful card that isn't on the phone's screen (it came from another capture, or it's scrolled away). **Fix:** the origin must be visible on this slide's capture.
3. **Covering the origin.** The float sits right on top of its own twin, so nothing proves it's lifted. **Fix:** put origins on the side away from the overhang (R1: left half, R3: right half).
4. **Card soup.** Four or five floats, or floats covering 35% of the screen, so the phone becomes a background. **Fix:** max 3, coverage ≤ 20%, one breather slide.
5. **Flat paste-on.** One hard black shadow, or none, so floats look like stickers. **Fix:** the three-layer tinted shadow, with elevation tied to scale.
6. **Sticker tilt.** Rotating floats 5–8° for "energy" makes them blurry and turns this into Candy Pop. **Fix:** 0°.
7. **Giant floats.** 160–200% crops that pixelate and dwarf the phone. **Fix:** 130% max, native cap.
8. **Headline/float mismatch.** "Sell faster." over a seller-badge float. **Fix:** the word-to-card rule.
9. **Invented values in crops.** Editing the price in the capture "for the screenshot". **Fix:** capture a demo listing with the real value, or keep the team's placeholder until the real capture exists.
10. **Decoration creep.** Sparkles, arrows or a "NEW" badge beside a float. **Fix:** zero decorations. The connector is the only drawn mark.
11. **Floating CTA.** Lifting the Buy / Post button. It reads as an ad unit. **Fix:** lift content (cards, chips, badges, notifications), not buttons.

## How to apply this style

1. **Fonts:** load `Plus_Jakarta_Sans` (700/800) as `--font-display` and `Inter` (500/600) as `--font-text` with the snippet above (Full style). In Brand + style mode use the brand display face at its heaviest weight ≥ 700.
2. **Theme:** add `floating-card-stack` to `THEMES` in `src/lib/constants.ts`: `bg #EEF0F3`, `bgAlt #14161B`, `fg #14161B`, `fgAlt #F3F4F6`, `accent #2747D6`, `muted #545A66`.
3. **Scene knobs:** `backdrop: solid` (or `spotlight` with the same-hue stops), `span: false`, `decoration: none`, `shadow: 35` (phone e0), `glow: 0`, `tilt: 0`, `headlineWeight: 800`, `headlineScale: 1`, `headlineCase: as-typed`, `captionAlign: auto` (left on R1/R3, centred on R2).
4. **Device transform:** per slide, set the device to x 72 / 170 / 268 (R1 / R2 / R3), y 600, width 980, rotation 0.
5. **Cut the floats** from the slide's own capture file: a script or image editor crops the measured native rect, applies the corner-radius mask, and exports PNG at native resolution. **Bake the three-layer shadow into the PNG** with ≥ 120px transparent padding (image elements have no shadow knob). Then the element's x/y = card x/y − padding, and width = card width + 2 × padding.
6. **Place them as image elements** with the card rects from the per-slide breakdown, rotation 0, zIndex above the device (e1 below e2).
7. **Connector:** one SVG image element (line + ring + dot, accent stroke 3px at 1320) with zIndex between the device and the floats.
8. **Headline:** the caption with the emphasis word wrapped for `--accent`. Plus Jakarta Sans 800, ~`cW × 0.091`, leading 1.0, tracking −0.03em.
9. **Cross-screen:** in connected-canvas mode, place the photo float across the 3|4 seam (15–30% of its width over) and check both exports alone.
10. **Measure:** float ∩ screen areas, origin uncovered, float ≥ 64px from the headline, headline ≤ 1160px, phone 68–72%, float pixels ≤ native. Then run the QA checklist above and `_QUALITY_BAR.md` §10–11.

## What this style is NOT

- Not a mock-up made of invented cards: every float exists in the phone, pixel for pixel.
- Not Bento (15): no tiles, no stats, no grid boxes, no cropping stage.
- Not Candy Pop (11) or Paper Sticker (03): no tilt, no stickers, no die-cut outlines, no colourful grounds.
- Not Liquid Glass (07): no blur, translucency or aurora behind the floats.
- Not a callout / magnifier style: floats are near life-size (110–130%), not loupes at 2–5×.
- Not an annotation diagram: one thin connector at most, no labels, arrows or numbered pins.
- Not decorated: no sparkles, confetti, ratings, laurels, award badges or press logos.
- Not a CTA showcase: buttons stay in the phone.
