---
name: lifestyle-photo-hero
description: A full-bleed photograph of the real-world moment the app serves (a sunlit living room, a street at golden hour, a car in a driveway, a desk, a doorstep) is the ground. An upright phone with real UI stands over it, anchored to the bottom edge. A soft warm scrim darkens only the band where the headline sits. The headline is a two-line weight split (light setup, heavy payoff). Warm, natural light; locally plausible people and places. Inspired by travel and home-rental listing heroes and real-estate portal hero imagery.
inspiration: Airbnb and Booking.com listing and campaign heroes, Rightmove and Zillow home-page hero imagery, hotel and travel magazine photo openers, "shot on a phone" outdoor campaigns
feel: warm, grounded, specific, "this is your street, your sofa, your next Saturday"
---

# Lifestyle Photo Hero

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style. This spec relaxes one of them (phone height on photo-led slides, see the first rule) and tightens several others.

## Hard quality rules (this style)

- **Two slide families, two phone floors.** *Photo-led* slides (layouts P1, P2, C1) show a phone with **visible height 58–64% of canvas (1664–1836px of 2868)** so the photograph has room to say where we are. This is a deliberate, style-permitted exception to `_QUALITY_BAR.md` §1, valid only because the photo window carries a real subject (it is content, not empty space). *UI-led* slides (P3, U1) follow the universal **68–82%** floor. **Max 3 photo-led slides per 6-slide deck**, and never two in a row at positions 1–3 on Google Play (see Play variant).
- **Every slide shows real UI.** Apple guideline 2.3.3: the phone always carries a real capture of the app. No slide is photo-only, logo-only or title art, the closer included. Photos never appear *inside* the phone screen; the screen is the capture, untouched.
- **Phone upright, 0°, anchored to the bottom edge.** Photo-led slides bleed the phone **96–130px** off the bottom; UI-led slides sit it **48–72px** above the bottom edge. Never float a phone with photo above and below it. Template bezel only (`public/mockup.png` via `Phone`).
- **Scrim only where the headline sits.** One vertical gradient from the top edge, fading to fully transparent by **y = 1120** (photo-led) or **y = 1180** inside a photo band. No full-slide darkening, no vignette, no colour wash over the photo window. The photo below the scrim stays as shot and graded.
- **Contrast is measured on the worst pixel, not assumed.** Light headline text on the dusk scrim needs the composited scrim alpha **≥ 0.65** under every glyph (5.1:1 over a pure-white highlight); an emphasis line in `--apricot` needs **≥ 0.75** (5.2:1). Dark text on the daylight scrim needs alpha **≥ 0.60** (5.5:1 over pure black). If the plate is already dark (or light) behind the headline, measure and you may use less; if it fails, raise the alpha, never thin the text.
- **Photography is real or honestly generated.** Licensed or commissioned photos, or text-free generated plates made with the repo's image-prompt skill if present (prompt process that avoids the AI look, plus its review checklist). A generated plate is labelled *generated, proposal* in the hand-off and never presented as a real property, car, shop, employee or customer.
- **Faces stay whole.** No face, eye line or hand mid-gesture is cut by the phone, the scrim edge, a chip, the canvas edge or a seam. People are 0–2 per photo, candid and mid-action; three-quarter, back or hands-only views are preferred. No one looks into the lens.
- **No stock clichés.** Banned: handshakes, thumbs-up, pointing-at-phone-and-grinning, laughing-at-salad, headset call-centre, glass-office high-five, keys dangled at camera, drone skyline of nowhere, perfectly symmetrical staged room, people jumping on a beach.
- **One callout per frame, max.** The only overlay allowed besides headline and phone is one *context chip*: a real UI crop from the same capture (a listing card, a price pin, a booking confirmation). Never redrawn, never retyped. Decorations: **0**.
- **Headline:** Plus Jakarta Sans, **120–136px**, 2 lines, line 1 at **500**, line 2 at **800**, leading 1.00, tracking −0.03em, flush-left at x = 88 (flush-right at x = 1232 in RTL). Measured width ≤ **1144px**. Max 5 words in total.

## Vibe summary

It feels like the first photo of a good rental listing: late-afternoon light through a window, a sofa with a throw on it, somebody's shoes by the door, a street outside that looks like a real neighbourhood in the market you sell to. Over it stands a phone, upright and confident, with the actual app on screen, rising from the bottom edge like someone just lifted it into frame. The top of the photo dims into a warm dusk so a short, heavy headline can sit there in near-white. There's nothing else: no stickers, no badges, no stars. The photo says *where*, the phone says *how*, the headline says *what you get*. When the photo is honest and the light is warm, the deck reads like a place you could walk into tomorrow.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--cream` (bg) | `#F7F1E8` | UI-led slide ground; daylight scrim tint | — |
| `--dusk` (bgAlt) | `#1E1914` | Dusk scrim tint; fallback backdrop under photos | — |
| `--ink` (fg) | `#1F1A15` | Headline and labels on cream / daylight scrim | 15.4:1 on cream |
| `--chalk` (fgAlt) | `#FFF8F0` | Headline and eyebrow on dusk scrim | 16.6:1 on dusk; 5.1:1 on white under 0.65 scrim |
| `--terracotta` (accent) | `#A33F22` | Emphasis line on cream only; chip outline | 5.7:1 on cream; chalk on it 6.1:1 |
| `--apricot` (accentAlt) | `#FFC9A3` | Emphasis line on dusk scrim (alpha ≥ 0.75) | 11.7:1 on dusk; 5.2:1 on white under 0.75 scrim |
| `--clay` (muted) | `#665C52` | Eyebrows and captions on cream | 5.8:1 on cream; 6.5:1 on white |
| `--shadow-tint` | `rgba(30,20,12,…)` | Phone and chip shadow tint | — |

**Verified contrast pairs (use only these):**

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#1F1A15` ink | `#F7F1E8` cream | 15.4:1 | everything on UI-led slides |
| `#FFF8F0` chalk | `#1E1914` dusk | 16.6:1 | everything on the dusk scrim (solid area) |
| `#FFF8F0` chalk | white highlight under dusk scrim 0.65 | 5.1:1 | headline, eyebrow (the floor) |
| `#FFC9A3` apricot | white highlight under dusk scrim 0.75 | 5.2:1 | emphasis line only |
| `#1F1A15` ink | black shadow under cream scrim 0.60 | 5.5:1 | headline on daylight scrim (the floor) |
| `#A33F22` terracotta | `#F7F1E8` cream | 5.7:1 | emphasis line on UI-led slides |
| `#A33F22` terracotta | black under cream scrim 0.90 | 4.5:1 | **never** (too fragile; daylight emphasis is weight only) |
| `#665C52` clay | `#F7F1E8` cream | 5.8:1 | eyebrows, captions |

**Brand swap.** Brand `bg` → `--cream` (UI-led ground, daylight scrim tint). Brand `bgAlt` → `--dusk` (scrim tint); if the brand's dark is saturated (navy, deep green), use it at the same alphas but re-measure, because a coloured scrim tints the photo. Brand `fg` → `--ink`, brand `fgAlt` → `--chalk`. Brand `accent` → `--terracotta`, only where it clears 4.5:1 on `bg`; brand `accentAlt` (a light tint of the accent) → `--apricot`, only where it clears 4.5:1 over a white highlight under the 0.75 scrim. If no tint passes, the emphasis is the weight split alone. Pairs that must pass: fg/bg ≥ 7:1, fgAlt/bgAlt ≥ 7:1, fgAlt on the worst scrim pixel ≥ 4.5:1, accent text on bg ≥ 4.5:1. The brand colour never tints the photograph itself.

## Typography

**Google Fonts (Full style, OFL):**
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Plus_Jakarta_Sans } from "next/font/google";
const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "block" });
// <body className={display.variable}>
```
Alternates (OFL): Figtree, Manrope, DM Sans. Commercial: Circular, Graphik, Gilroy. One family per deck, no serifs (that's style 10), no scripts, no monos.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline line 1 (setup) | Plus Jakarta Sans 500 | 120–136px | 1.00 | −0.03em | chalk / ink |
| Headline line 2 (payoff) | Plus Jakarta Sans 800 | same as line 1 | 1.00 | −0.035em | chalk / ink / apricot / terracotta |
| Eyebrow | Plus Jakarta Sans 600 | 34–38px | 1.1 | +0.02em | chalk / clay |
| App name (closer) | Plus Jakarta Sans 700 | 60–68px | 1.0 | −0.02em | chalk |
| Legal / licence line | Plus Jakarta Sans 500 | 28–30px | 1.25 | 0 | on a cream plate, ink |

Sentence case. Line 1 and line 2 are the same size; only weight (and optionally colour) changes. Never a third weight on one slide.

## Headline emphasis (signature)

**The weight split.** Every headline is exactly two lines: a quiet setup in 500 and a heavy payoff in 800 ("Move in / **sooner.**"). At thumbnail size the 800 line is what reads; the 500 line gives it a voice. Colour is optional and secondary:

- Dusk scrim: the payoff line may take `--apricot`, only where the scrim alpha under it is ≥ 0.75 (or the measured worst pixel is ≥ 4.5:1).
- Cream ground (UI-led): the payoff line may take `--terracotta` (5.7:1).
- Daylight scrim: payoff stays ink. Weight only.
- Never italic, underline, highlight box, gradient or glow.

```css
.h1{font:500 128px/1.0 var(--font-display);letter-spacing:-.03em;color:var(--chalk)}
.h1 b{display:block;font-weight:800;letter-spacing:-.035em}
.h1 b.warm{color:var(--apricot)} /* dusk scrim only, alpha >= .75 under it */
```

## Layout grid & safe zones

Side margins **88px** (text and chips never closer to an edge). Content width 1144px. Template bezel: phone height `H = 2.0372·W`, screen top = `top + 0.045·W`.

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 140 | Photo + scrim only |
| Eyebrow | 88, 150, 1144, 44 | Optional; one line |
| Headline | 88, 214, 1144, 240–272 | Text only; scrim alpha rule applies |
| Photo window | 0, 560–1150, 1320, ~590 | The subject's focal point lives here (photo-led) |
| Phone column | per recipe | Phone, plus at most one chip overlapping it |
| Bottom | phone bleeds (photo-led) or 48–72px ground (UI-led) | No text near the bottom edge except a legal line |

### Reusable layout recipes

**P1 · Window right** (photo-led hero, lifestyle features)
```
photo     0,0 1320x2868 full bleed; focal in window y 600–1140 and left strip x 0–320
scrim     dusk: .82 @0 → .78 @520 → .40 @820 → 0 @1120
eyebrow   x 88 y 150, 36px 600
headline  x 88 y 214–470, 128px, 2 lines
phone     W 900, x 332 (right margin 88), top 1150 → bottom 2983, bleed 115, visible 1718 = 59.9%
chip      optional: x 88, w 460–560, overlaps the phone's left edge by 120–240px, y 1900–2500
```
**P2 · Window left**: P1 mirrored. Phone x 88; focal in the window band or the right strip x 1000–1320; chip on the right, x ≤ 1232.

**P3 · Photo band** (UI-led with context; payoff and feature slides)
```
photo     0,0 1320x1400 (crop of the plate); dissolves into cream: transparent @1180 → --cream @1400
scrim     dusk over the band: .80 @0 → .72 @520 → .15 @1000 → 0 @1180
ground    --cream below 1400 (solid backdrop)
headline  x 88 y 214–470, chalk
phone     W 960, x 180 (centred), top 820 → bottom 2776, 92px above the edge, visible 1956 = 68.2%
window    focal in y 500–820 full width, or the side strips x 0–180 / 1140–1320 down to 1400
chip      optional; the centred phone leaves only 180px sides, so the chip may cover up to 440px of the
          phone's lower, non-focal UI; it sits over cream (not over the photo), right edge ≤ 1232
```
**U1 · Cream stage** (UI-led; Google Play frame 1, rest beats)
```
ground    --cream flat, no photo, no scrim
eyebrow   x 88 y 150, clay
headline  x 88 y 214–470, ink (payoff may be terracotta)
phone     W 1040, x 140 (centred), top 700 → bottom 2819, visible 2119 = 73.9%
chip      none
```
**C1 · Closer** (photo-led, identity)
```
photo     full bleed; focal in window y 660–1180
scrim     dusk: .84 @0 → .78 @640 → .35 @920 → 0 @1180
identity  app icon 168px (radius 38) at x 88 y 150; app name 64px 700 at x 284, baseline-centred on the icon
headline  x 88 y 380–636, 128px, 2 lines
phone     W 880, x 220 (centred), top 1180 → bottom 2973, bleed 105, visible 1688 = 58.9%
```

## Phone / device frame treatment

- Template bezel, always. Upright 0°. No tilt, no perspective, no floating.
- Shadow on photo (tinted warm, two-stop stack):
```css
.on-photo .phone{filter:drop-shadow(0 40px 60px rgba(30,20,12,.38)) drop-shadow(0 6px 10px rgba(30,20,12,.30))}
.on-cream .phone{filter:drop-shadow(0 34px 48px rgba(60,40,20,.18)) drop-shadow(0 4px 8px rgba(60,40,20,.14))}
```
- Light screenshots read cleanly on any warm photo; dark-mode screenshots need a mid-to-light region behind the phone or they merge into a dusky plate. Check the bezel edge separates from the photo at 300px wide.
- The phone may cover photo background (walls, floor, sky, street), never a face or the scene's focal object.
- Context chip: a crop from the same capture (so prices, names and dates match the screen), scaled **1.15–1.30×** the phone's screen scale, corner radius = the app's card radius × that scale, shadow `0 24px 40px rgba(30,20,12,.28), 0 3px 6px rgba(30,20,12,.20)`, upright. It may only cover phone UI that isn't the slide's focal row.

## Background treatment

The photograph is the background. Rules for every plate:

- **Light:** natural and warm, 3800–5200K: window daylight, late afternoon, golden hour, warm interior lamps at blue hour. Never flash, never midday glare, never neon.
- **Grade:** saturation 85–95% of source, highlights rolled off (no clipped windows bigger than 4% of the frame), blacks no deeper than `#141010`, a slight warm lift in the mids. The same grade across the deck. Film grain 2–3% to unify mixed sources (generated plates especially).
- **Local plausibility:** architecture, window frames, tiles, plugs, plants, cars, street furniture, clothing and light angle belong to the market you sell in. No generic Scandinavian loft for a market that doesn't build them.
- **Text-free:** no readable signs, plates, logos, posters or screens in the plate. Blur or remove them; generated plates must have none at all.
- **Composition:** the subject sits in the photo window and/or the free side strip, off-centre, with calm areas (sky, wall, ceiling) where the headline and scrim will go. Shoot or generate at **2640×5736** (2× the canvas) or larger; never upscale a small photo.
- **Scrim:** dusk (default, light text) or daylight (bright airy interiors, dark text), never both on one slide.
```css
.scrim-dusk{background:linear-gradient(180deg,rgba(30,25,20,.82) 0,rgba(30,25,20,.78) 520px,rgba(30,25,20,.40) 820px,rgba(30,25,20,0) 1120px)}
.scrim-day {background:linear-gradient(180deg,rgba(247,241,232,.86) 0,rgba(247,241,232,.80) 520px,rgba(247,241,232,.35) 820px,rgba(247,241,232,0) 1120px)}
```
- **Editor reality:** the editor has no photo backdrop or overlay gradient. Set backdrop `solid` (`--dusk` on photo slides, `--cream` on U1/P3) as a load fallback. Place the plate as an **image element** at zIndex 0 (x 0, y 0, 1320×2868, pre-cropped to the canvas aspect) and the scrim as a **pre-rendered PNG image element** (1320×1180 transparent gradient, exported once from the CSS above) at zIndex 1. Phone above, headline text on top.

## Decorative accents

**Floating decorations: 0.** This is a minimal, photo-led style (count it with the minimal styles in `_QUALITY_BAR.md` §9; the context chip is a callout, not a decoration). No blobs, rings, sparkles, stickers, badges, laurels, star ratings, arrows or doodles. Scene decoration `none`.

The only overlays:
1. **Context chip** (≤ 1 per slide, ≤ 3 per deck): image element, a real crop.
2. **Eyebrow** (optional): a category line ("Homes to rent") or, only for a real, shot-on-location photo, the true neighbourhood name. Never put a real place name on a generated plate.
3. **Legal line** (fintech, property ad licence): text on a small cream plate (radius 24, padding 20×28) at the bottom-left above the phone bleed, ink 28px. Text from legal, never written by us.

Polish (§3): no illustration exists in this style. Volume comes from the photo's own light and the phone's two-shadow stack.

## Cross-screen moment

- **Allowed once per 5+ slide deck:** a **panorama plate** spanning two adjacent photo-led slides via connected canvas: one image element 2640×2868 across both artboards. The seam (x = 1320) runs through a plain wall, curtain, sky or floor. 10–30% of a secondary visual (a pool of window light, the back of a sofa, a kerb) crosses; the subject of each half sits ≥ 240px from the seam. The scrim is the same vertical gradient on both slides, so it stays continuous.
- **Never crosses:** a person, a face, a car, the focal object, the headline, the phone, the chip, the app icon.
- Each half must still read alone at 300px wide; if one half is just wall, recompose.

## Copy tone

- **Voice:** a friend who knows the neighbourhood. Concrete outcomes, ordinary words, present tense. The photo carries the emotion, so the words don't have to.
- **Length:** ≤ 5 words in total across both lines; line 2 is the outcome. Readable at 300px wide.
- **Story:** frame 1 the outcome in a real place, frame 2 the core action, frame 3 the payoff; features after.
- **Facts:** never invent prices, counts, ratings, awards, press quotes, response times or "verified" claims. If a claim needs a number, it is a `[PLACEHOLDER]` the team fills from real data. Fintech: no promised returns; reserve the licence-line slot.
- **Punctuation:** sentence case, a period on line 2. No question marks, exclamation marks, emoji, ampersands or ALL CAPS.
- **Banned words:** dream home, luxury (unless the listing tier is literally called that), stunning, perfect, best, #1, ultimate, seamless, effortless, unlock, revolutionary, AI-powered, "and more", free (in art), download now.
- **Example headlines:**
  - Real estate: "Move in / **sooner.**" · "The right street. / **Found.**" · "Viewings, / **booked.**"
  - Rentals: "Your next lease, / **simpler.**" · "Ask the owner. / **Directly.**"
  - Motors: "Your next car, / **nearby.**" · "Inspected. / **Then bought.**"
  - Jobs: "Work near / **home.**" · "Apply in / **one tap.**"
  - Quick commerce: "Groceries at / **your door.**"
  - Classifieds: "Sold from / **your sofa.**"

## Per-slide breakdown (mandatory)

Sample app: **Lintel**, a fictional homes-to-rent-and-buy app. Canvas 1320×2868. Photo-led slides: 1, 5, 6 (3 of 6).

### Slide 1 · Outcome hero (P1 Window right)
- **Photo:** a lived-in living room, late afternoon, sun across the floor from a window on the left; a couple unpacking a box, seen three-quarter from behind at x 60–320, y 900–1500 (faces whole, in the left strip, clear of the phone at x 332). Calm ceiling and wall in the top 560px.
- **Scrim:** dusk, recipe values. Measure alpha under glyphs ≥ 0.65.
- **Eyebrow:** "Homes to rent and buy" chalk 36px.
- **Headline:** "Move in / **sooner.**" 128px, line 2 800 in chalk (apricot optional only if alpha ≥ 0.75 under it).
- **Phone:** W 900, x 332, top 1150, bleed 115, visible 1718 (59.9%). Screen: search results list.
- **Chip:** none (hero stays clean).
- **Must be true:** at 300px wide you read "sooner.", see a home, see a phone with listings. No face touches the phone edge.

### Slide 2 · Core action (U1 Cream stage)
- **Ground:** `#F7F1E8`.
- **Headline:** "Every street, / **mapped.**" ink, payoff terracotta (5.7:1).
- **Phone:** W 1040, x 140, top 700, visible 2119 (73.9%). Screen: map search with price pins (prices as captured).
- **Must be true:** this is the frame that proves the app; UI is large and real.

### Slide 3 · Payoff (P3 Photo band)
- **Band photo:** a building entrance in warm evening light, a front door ajar with the hallway lit beyond, a hand on the handle (hands only), sitting in y 500–820 and the left strip.
- **Headline:** "Viewings, / **booked.**" chalk on the dusk band.
- **Phone:** W 960, x 180, top 820, visible 1956 (68.2%). Screen: viewing booking with a time selected.
- **Chip:** the booking confirmation card cropped from the same capture, 520px wide, x 712–1232, y 2140, covering 428px of the phone's lower rows (y 2140–2420, below the selected time), over cream.
- **Must be true:** chip text equals what the phone shows; the band dissolves into cream with no hard line.

### Slide 4 · Feature (U1 Cream stage)
- **Headline:** "Ask the owner. / **Directly.**" (measure: line 1 must be ≤ 1144px at 128px; drop to 120px if not).
- **Phone:** chat screen with a real conversation from a test account (names anonymised in the capture, not after).
- **Must be true:** no chip, no photo; a calm rest beat between photo slides.

### Slide 5 · Feature (P2 Window left, panorama left half)
- **Photo:** left half of a 2640×2868 panorama: a desk by a window, a cup of tea, a notebook, warm lamp light; desk and window in the window band x 220–1000, y 620–1140. The right 320px is a plain wall that continues into slide 6.
- **Headline:** "Saved. / **Compared.**" chalk.
- **Phone:** W 900, x 88, top 1150, visible 1718 (59.9%). Screen: saved listings compare view.
- **Chip:** one saved-listing card from the capture, 480px, x 752–1232, y 2000, overlapping the phone's right edge by 236px.
- **Must be true:** the seam at x 1320 runs through plain wall; no object is cut.

### Slide 6 · Closer (C1, panorama right half)
- **Photo:** right half: the same room continuing to a balcony door at blue hour, city lights soft beyond, focal in y 660–1180. The wall pool of lamp light crosses the seam (~18%).
- **Identity:** Lintel icon 168px + "Lintel" 64px 700 chalk.
- **Headline:** "Your place / **is waiting.**" (line 2 width check; 120px if needed).
- **Phone:** W 880, x 220, top 1180, visible 1688 (58.9%). Screen: home feed.
- **Must be true:** real UI on the closer (2.3.3); identity lockup clear of the phone by ≥ 400px; no rating, no award, no "download now".

## Google Play behaviour (feature-first variant)

Google Play discourages heavy promotional overlays and device frames, and the first frames carry the decision. For Play:
- **Frame 1 is UI-led** (U1): cream ground, the core screen large, a ≤ 4-word headline. Lifestyle photo frames move to positions 3–5. Max two photo-led frames in a Play set.
- Keep the template bezel (house rule, `_QUALITY_BAR.md` §7), but no context chips on Play frames 1–2 and no eyebrow anywhere.
- **Canvas 1080×1920:** scale x by 0.818; headline 100–108px; phone W 640–700 on UI-led frames (H 1304–1426 = 68–74%), W 560–600 on photo-led frames (visible ≥ 58%); keep the scrim end at 41% of canvas height.
- **Feature graphic 1024×500:** the hero plate with the dusk scrim from the left (alpha .80 at x 0 → 0 at x 620), app name and a ≤ 4-word line at left, no device, no stars, no price.
- On the App Store, lifestyle leads (frame 1 = P1).

## Adapting to other app categories

| Category | Accent / accentAlt (on cream / on dusk 0.75) | Photo subjects (text-free, local, warm) | Core screens |
|---|---|---|---|
| Real estate | `#8A4B2A` (6.0) / `#FFD2B0` (5.6) | lived-in interiors, building entrances, balconies, street at golden hour | search, map, listing detail, viewing |
| Rentals | `#1F6E5A` (5.4) / `#A8E6CF` (5.5) | moving day, a desk in a new room, a doorstep, a neighbourhood café terrace | filters, chat, booking |
| Motors | `#2B4F8C` (7.2) / `#B9D3FF` (5.1) | a car in a driveway or quiet street, three-quarter front, plates blank, no maker badge visible; a hand on a steering wheel | search, car detail, inspection, chat |
| Jobs | `#5A3F9E` (7.1) / `#D6C8FF` (5.0) | real workplaces: workshop, shop counter, kitchen, clinic, home desk; one worker mid-task | job feed, apply, profile |
| Classifieds | `#B23A2B` (5.3) / `#FFC2B5` (5.0) | an item in its home (a bike in a hallway, a sofa by a window), a doorstep handover (hands only) | post an ad, chat, item detail |
| Quick commerce | `#2E7D32` (4.6) / `#BFEFC2` (6.0) | a doorstep delivery bag, a kitchen counter with groceries, evening light | catalogue, cart, tracking |
| E-commerce | `#9C2F5E` (6.3) / `#FFC4DC` (5.2) | a parcel on a hallway table, product in use at home | product, cart, order status |
| Fintech | `#145C6E` (6.7) / `#A6E3F0` (5.5) | a market stall or café counter, paying by phone (no card numbers, no screens visible); licence-line plate required | balance, transfer, history |
| SaaS / B2B | `#5A3F9E` (7.1) / `#D6C8FF` (5.0) | a real small office, a shop back room, a site visit; avoid glass towers | dashboard, task, report |

Accents are proposals for Full style; in Brand + style the brand's accent replaces them under the brand-swap rule.

## Dark / inverted & localization notes

- **Dark:** the style is not a dark style; dusk scrims sit on warm photos. A blue-hour plate is allowed for the closer. Never darken the whole photo to make a "dark mode" set.
- **RTL (Arabic/Urdu/Hebrew):** mirror layouts: headline and eyebrow flush-right at x 1232, P1 phone moves to x 88 (becomes P2) and vice versa, chips mirror. Do **not** flip photographs that contain cars (driving side), handedness cues, clocks or any text; recompose or choose a different plate. Arabic: Noto Sans Arabic or IBM Plex Sans Arabic 500/700 (the weight split becomes 500/700), size −6%, letter-spacing 0, line-height 1.2. Numerals in the UI stay as captured.
- **Long languages (German, French, Russian):** shrink to 120px, then rewrite to fit ≤ 1144px; never go to 3 lines.
- **CJK:** Noto Sans JP/SC/KR 500/800, letter-spacing 0, line-height 1.15, size −8%.
- **Local photography per market:** a deck localized for another country gets that country's plates (streets, interiors, cars), not the same plates with new words.

## Style-specific QA checklist

- [ ] Every slide shows a real capture in the template bezel; no photo-only, logo-only or splash slide.
- [ ] Photo-led slides: phone visible 1664–1836px (58–64%), bleeding 96–130px off the bottom; UI-led slides ≥ 1950px (68%), 48–72px above the bottom.
- [ ] At most 3 photo-led slides per 6 (2 on Play), and Play frame 1 is UI-led.
- [ ] Phone upright 0°, warm two-stop shadow, never covering a face or the focal object.
- [ ] Scrim fades to 0 by y 1120 (1180 in a band); worst-pixel contrast ≥ 4.5:1 under every glyph (alpha ≥ 0.65 chalk, ≥ 0.75 apricot, ≥ 0.60 ink on daylight), measured on the exported PNG.
- [ ] Headline: 2 lines, 500/800 split, ≤ 5 words, ≤ 1144px measured, 120–136px.
- [ ] Photos: warm natural light, text-free, locally plausible, no banned cliché, faces whole, nobody looks into the lens.
- [ ] Generated plates labelled *generated, proposal* in the hand-off; no real place name on them; none of them inside a phone screen.
- [ ] ≤ 1 context chip per slide, cropped from the same capture; its numbers match the screen.
- [ ] No ratings, awards, press logos, invented stats or prices; placeholders in `[BRACKETS]`.
- [ ] Panorama (if used): seam through plain surface, subjects ≥ 240px from it, each half stands alone.
- [ ] 300px-wide test: the payoff line reads, the place reads, the phone reads as an app.

## Common failure modes

1. **Muddy headline.** White text over a bright window at scrim 0.4. **Fix:** alpha ≥ 0.65 under glyphs, or pick a plate whose top is wall/ceiling/sky.
2. **The scrim swallows the photo.** A full-height dark gradient turns the deck into style 02. **Fix:** scrim ends at y 1120; the window band and phone area stay as graded.
3. **Stock-photo smile.** A model grinning into the lens with a phone. **Fix:** candid, mid-action, no eye contact, or no people.
4. **AI look.** Waxy skin, too-perfect symmetry, six fingers, melted text on signs, glossy HDR. **Fix:** run the image-prompt skill's review checklist; reject and re-prompt or license.
5. **Wrong country.** A plate that could be anywhere (or clearly elsewhere). **Fix:** brief the local cues: window grilles, tiles, plugs, plants, cars, light angle.
6. **Phone over the face.** **Fix:** move the subject to the free strip or the window band; recompose before shrinking the phone.
7. **Tiny phone.** Under 58% on photo-led, under 68% on UI-led. **Fix:** use the recipe widths; let the photo work in the window band.
8. **Callout pile-up.** A chip, a badge and a pin on one slide. **Fix:** one chip, real crop, or none.
9. **Real listing confusion.** A generated interior that looks like a property for sale. **Fix:** keep plates as context (mood of a home, not "this flat"), label them, and never price them.
10. **Flipped car.** A mirrored motors plate in RTL with the steering wheel on the wrong side. **Fix:** never flip; recompose.

## How to apply this style

1. **Fonts:** load `Plus_Jakarta_Sans` (500/600/700/800) as `--font-display` with the snippet above (Full style), or the brand font with a light/heavy pair (Brand + style).
2. **Theme:** add `lifestyle-photo-hero` to `THEMES` in `src/lib/constants.ts`: `bg #F7F1E8`, `bgAlt #1E1914`, `fg #1F1A15`, `fgAlt #FFF8F0`, `accent #A33F22`, `accentAlt #FFC9A3`, `muted #665C52`.
3. **Plates:** get licensed/shot photos or generate text-free plates with the repo's image-prompt skill if present (camera, lens, time of day, place cues, imperfections; no "ultra-detailed / 8k / cinematic"). Grade them together, crop to 1320:2868 at 2×.
4. **Scene:** backdrop `solid`, decoration `none`, shadow ~45, glow 0, tilt 0, headlineCase as-typed, captionAlign left.
5. **Layers per slide:** image element plate (z 0) → scrim PNG image element (z 1) → `Phone` with the recipe transform (z 2) → optional chip image element (z 3) → headline (z 4).
6. **Headline:** if the caption supports one weight only, set the caption to the payoff (weight 800) and draw line 1 as a free text element at 500 directly above it (same size, leading 1.0).
7. **Panorama:** in connected-canvas mode place one 2640-wide plate across slides 5–6.
8. **Play set:** duplicate the deck, reorder so frame 1 is U1, remove chips from frames 1–2, export at 1080×1920 and the 1024×500 feature graphic.
9. **Measure:** headline width, phone visible height, worst-pixel contrast under glyphs on the exported PNG, faces vs phone/chip/seam overlap.
10. **Audit:** the checklist above plus `_QUALITY_BAR.md` §10–11 (and the 300px test).

## What this style is NOT

- Not Moody Curated Dating (02): not dim, cinematic or tungsten-dark; no serif; no vignette; the phone is always present.
- Not Magazine Cover Editorial (10): no masthead, no serif display, no cover lines.
- Not Vintage Travel Poster (18): no illustration, no flat poster colour; it is photography.
- Not a listing gallery: the plates are context, never a specific property, car or item for sale, and never inside the phone.
- Not stock: no lens-gazing models, no handshakes, no generic skylines.
- Not decorated: no stickers, blobs, badges, stars, laurels or confetti.
- Not tilted or floating: the phone is upright and anchored to the bottom.
