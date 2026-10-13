---
name: map-led-local
description: A flat, quiet, stylised map is the ground of every slide, drawn from vector shapes (land, roads, one river) in three neutral tones. One accent pin per slide marks that frame's story, one white chip names the area from the real capture, and an upright phone shows the app's search, results or map UI. Across the connected canvas the map continues, so the set reads as one neighbourhood. Inspired by local marketplace, property-search and delivery apps whose store sets lead with maps.
inspiration: Airbnb and Zillow map-search store sets, Rightmove and Idealista listing maps, Deliveroo and Glovo "near you" frames, Citymapper's flat cartography, Apple Maps' muted light style
feel: local, calm, oriented, trustworthy, "it's right here, around you"
---

# Map-Led Local

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style.

## Hard quality rules (this style)

- **The map is the ground.** Every slide sits on the same drawn map: flat land, white roads and one river or coast. It's drawn from vector shapes (an SVG image element), never a screenshot or tile export from a map provider. If the team insists on real geography it must be OpenStreetMap-derived vector data, styled to this palette, with **"© OpenStreetMap contributors"** in 24px `--ink-2` at the bottom-left of every slide that shows it. Unlicensed commercial map-provider tiles or styles = instant fail.
- **Exactly three map tones:** `--land`, `--road`, `--water`. City blocks are the land showing between roads. There are no parks, building footprints, POI icons, street names, compass roses or scale bars. A scale bar implies a real distance, and a street name implies a real address. A 4th map tone, or any label drawn on the map other than the chips below, = fail.
- **The map stays quiet:** water vs land **1.10–1.30:1** and road vs land **1.10–1.25:1** (reference: 1.15 and 1.19). If the map is louder than that, it competes with the UI and the slide reads as a map app's own screenshot.
- **One hero pin per slide**, in the accent, **112×152px** (teardrop head Ø112, point at the bottom), with the two-tone + cast-shadow recipe below. It marks the frame's story (where the result is, the searched area, the saved spot). The pin never overlaps the phone, the headline or a seam, and it stays **≥ 140px from any seam** and **≥ 48px from the phone's edge**.
- **At most 4 result dots** (Ø36 accent circle, 6px white ring) per slide, never touching the hero pin or the phone. Dots never carry numbers, prices or counts.
- **One callout per slide.** The callout is the hero pin plus its chip. A second chip is allowed on at most 2 slides per deck, and only as a passive area label: no pin, no shadow, no arrow, set along a road's angle.
- **Chips carry real words only.** Area names must appear in the real capture used on that slide, such as the app's location filter or a result card. Distances, delivery times, prices and counts are `[PLACEHOLDERS]` (`[DISTANCE]`, `[ETA]`, `[AREA NAME]`) until the team supplies a true, sourced value. Never write "5 min away", "2 km", "10-minute delivery" or a street address from imagination.
- **Phone:** the template's default bezel, upright **0°**, width **1000–1060px**, visible height **≥ 68% (≥ 1950px of 2868)**. It is anchored to the bottom edge (bottom bleed 0–6% of phone height) or bleeds **≥ 100px** off one side (M2). It is never centred vertically.
- **Headline:** Manrope 800 (Full style) / brand font at its heaviest display weight, **128–148px**, leading 1.0, tracking −0.03em, **≤ 5 words, ≤ 2 lines**, flush-left at x = 88. Ink `#16211F` on land = 13.9:1. One emphasis phrase in `--pin-text`, which reaches 4.86:1 on land. That's only true on land, so **water never sits under the emphasis phrase** (it drops to 4.22:1 there).
- **No floating decoration.** No blobs, sparkles, rings, stickers or confetti. The map, pins, dots and chips are the whole vocabulary (§9: minimal style, so 0 decorations; the map and its marks are the layout).
- **Real UI on every slide** (Apple 2.3.3): the phone shows a real capture of search, results, the map view, a listing's location section, or saved searches/alerts. A slide that is just map and pin = fail.

## Vibe summary

The set feels like holding a calm paper map of your own neighbourhood. A warm grey-beige land, white streets on a slightly rotated grid, and one soft blue-grey river that winds from the first frame to the last. Nothing on the map is labelled, so it could be anywhere and so it reads as *here*. On each frame one red pin drops onto the map where that frame's story happens: the area you searched, the result you tapped, the place you saved. Next to it sits one small white chip with the area's name exactly as the app shows it. The phone stands upright, big and real, showing the search or map screen, so the drawn map outside and the app's own map inside agree. Swipe the set and the river keeps going and the streets keep connecting. The pins move, like walking through a district one stop at a time. There's no glow, gloss or "explore the world" globe here. It's local and close-by, and honest about what it doesn't know (no fake minutes, no fake kilometres).

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--land` | `#EDEBE5` | Slide ground and city blocks (the backdrop) | — |
| `--road` | `#FFFFFF` | All roads (minor, major, arterial) | 1.19:1 vs land (quiet by design) |
| `--road-casing` | `rgba(22,33,31,.06)` | 2px edge drawn under each road | — |
| `--water` | `#D3DEE0` | River / coast / lake (one water body per deck) | 1.15:1 vs land |
| `--water-rim` | `#E2EAEB` | 3px lighter bank line on the lit (upper/left) bank | — |
| `--ink` | `#16211F` | Headline, chip text | 13.9 land · 12.0 water · 16.5 white |
| `--ink-2` | `#4A5552` | Eyebrow, passive area label, attribution | 6.5 land · 5.6 water · 7.7 white |
| `--pin` | `#B8381F` | Pin body, result dots, chip pin glyph | white glyph on it 5.8:1 |
| `--pin-shade` | `#8F2A16` | Shadow side of the pin (right 40% crescent) | white on it 8.4:1 |
| `--pin-light` | `#CF5A40` | 4px highlight arc, upper-left of the pin head | — |
| `--pin-text` | `#B8381F` | Emphasis phrase in the headline (land only) | 4.86 land · **4.22 water = never** |
| `--chip` | `#FFFFFF` | Chip fill | ink 16.5:1 |
| `--night-land` | `#1F2B29` | Night-map variant ground (see Dark notes) | `#F4F2EC` on it 13.1:1 |
| `--night-road` | `#2E3B38` | Night roads | 1.25:1 vs night land |
| `--night-water` | `#162220` | Night water | 1.12:1 vs night land |
| `--night-pin-text` | `#FF8A6B` | Emphasis phrase on night land | 6.3:1 |

**Verified contrast pairs** (use only these for text):

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#16211F` ink | `#EDEBE5` land | 13.85:1 | headline, everything |
| `#16211F` ink | `#FFFFFF` chip | 16.52:1 | chip text |
| `#4A5552` ink-2 | `#EDEBE5` land | 6.49:1 | eyebrow, passive label, attribution (≥ 24px) |
| `#B8381F` pin-text | `#EDEBE5` land | 4.86:1 | emphasis phrase ≥ 128px only |
| `#B8381F` pin-text | `#D3DEE0` water | 4.22:1 | **never** |
| `#FFFFFF` | `#B8381F` pin | 5.80:1 | pin glyph (graphic, needs ≥ 3:1) |
| `#16211F` ink | `#B8381F` pin | 2.85:1 | **never** (no ink on pins) |
| `#F4F2EC` | `#1F2B29` night land | 13.07:1 | night headline |
| `#FF8A6B` | `#1F2B29` night land | 6.34:1 | night emphasis |

**Brand swap.** Brand `bg` → `--land`, but only if the brand's background is a light neutral. If it's pure white, use the brand's lightest grey or a 4–6% tint of the brand colour as land, and keep roads `#FFFFFF`. Brand `fg` → `--ink`. Brand `accent` → `--pin` and `--pin-text`. `--pin-shade` is the accent darkened 22–25% in HSL lightness, and `--pin-light` is the accent lightened 10%. Brand `bgAlt` → `--night-land` (night-map variant only). `--water` becomes a 12–18% tint of the brand's secondary or neutral colour, re-measured to land at 1.10–1.30:1. The pairs that must pass: fg on bg ≥ 7:1. White glyph on the accent pin ≥ 3:1. Accent as text on land ≥ 4.5:1: if the brand accent fails it, the accent stays on pins and dots only and the emphasis phrase becomes ink with no colour change (never a pale tint). If `accentAsDecoration: false` in the brand profile, pins are still allowed because they are functional markers, not decoration; result dots are dropped. Never introduce a second accent, for example a blue "you are here" dot. The "you" marker, if needed, is an ink dot Ø32 with a 6px white ring.

## Typography

**Google Fonts (Full style):**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Barlow+Semi+Condensed:wght@500;600&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Manrope, Barlow_Semi_Condensed } from "next/font/google";
const display = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "block" });
const label = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-label", display: "block" });
// <body className={`${display.variable} ${label.variable}`}>
```
Both are OFL. Barlow Semi Condensed is the cartographic voice: the eyebrow and passive area labels look like district names printed on a map. In Brand + style mode both roles use the brand family (headline at its heaviest display weight; labels at 500–600 uppercase), and the hand-off notes the substitution.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Manrope 800 | 128–148px | 1.0 | −0.03em | `--ink` + `--pin-text` phrase |
| Eyebrow (optional) | Barlow Semi Condensed 600, UPPERCASE | 30–32px | 1.1 | +0.12em | `--ink-2` |
| Chip text | Manrope 700 | 36–40px | 1.0 | −0.01em | `--ink` |
| Passive area label | Barlow Semi Condensed 500, UPPERCASE | 28–32px | 1.0 | +0.18em | `--ink-2`, rotated to the road angle |
| App name (closer) | Manrope 800 | 64–72px | 1.0 | −0.02em | `--ink` |
| Attribution / legal line | Manrope 600 | 24px | 1.2 | 0 | `--ink-2` |

Rules: sentence case for headlines and chips; uppercase only for the eyebrow and passive labels. Headline max line width **≤ 860px** in M1 (the pin owns the top-right) and **≤ 1144px** in M2/M3. Measure it, don't eyeball it.

## Headline emphasis (signature)

The emphasis is a **place word**, coloured like the pin: "Homes **near you.**", "Search **by area.**". Same weight and size, colour only. The phrase is 1–2 words, usually the locality payoff (near you, nearby, your area, on the map, around the corner).

```css
.hl{font:800 140px/1 var(--font-display);letter-spacing:-.03em;color:#16211F}
.hl .place{color:#B8381F}   /* 4.86:1 on land; land only, never over water */
```
- No underline, highlight block, italic or glow. The pin colour is what links the word to the pin on the map.
- The phrase and the hero pin are the only two accent-coloured things above the phone. Result dots sit in the side strips or lower.
- If the emphasis phrase would sit over water, move the river (the map is yours to draw), never the contrast rule.

## Layout grid & safe zones

Margins: **88px** left/right for text; the map bleeds to every edge. Top margin 140–160px. Vertical rhythm in 8px steps.

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 140–160 | Map only, no text |
| Headline block | 88, 150, ≤ 860 (M1) / ≤ 1144 (M2, M3), 140–330 | Text on the quiet scrim, no water underneath |
| Pin zone (M1) | 980, 170, 260, 560 | Hero pin + chip; ≥ 48px clear of the headline box |
| Phone | see recipes | Upright, flush-bottom or side bleed |
| Side strip (M2) | 0, 900, phone-left − 48, 1900 | Hero pin + chip + ≤ 2 dots |
| Attribution (if OSM) | 88, 2800, 600, 32 | Only when real OSM data is used; sits on land, never over the phone |

**Headline scrim:** an SVG image element (zIndex above the map, below the caption). It's a rounded rect covering the headline box + 56px padding on every side, filled `--land` at 94%, feathered with a 160px soft edge (`filter: blur(80px)` on the shape, or a radial-gradient mask). Roads under the letters show at ≤ 30% visibility. It stays invisible as an object: if you can see a pale box, the feather is too short.

**Phone geometry** (template bezel, aspect 1022:2082): `H = 2.0372·W`, screen top `= top + 0.045·W`, screen height `= 1.9472·W`.

### Reusable layout recipes

**M1 · Pin overhead** (hero, payoff, alerts). Headline flush-left, hero pin + chip top-right, phone centred and bleeding off the bottom.
```
headline  x 88, y 150, ≤ 860 wide, 2 lines @ 136–140px → bottom ≈ 430 (≈ 480 with eyebrow)
pin       x 1040, y 230 (112×152), cast shadow at y 392
chip      right-aligned to x 1232, y 420, h 88 (to the left of / below the pin point)
phone     W 1060, left 130, top 820 → bottom 2979 (bleed 111 = 5.1%), visible 2048 = 71.4%
```
**M2 · Side street** (core action, detail). Full-width headline, phone shifted to one side and bleeding ≥ 100px off it, and the opposite strip shows the map with the pin.
```
headline  x 88, y 150, ≤ 1144 wide, 1–2 lines @ 140px → bottom ≈ 430
phone     W 1000, left 420, top 831 → flush bottom 2868, right bleed 100 (10%), visible 2037 = 71.0%
strip     x 0–372: pin x 130, y 1220 · chip x 40, y 1420, w ≤ 320 · ≤ 2 dots at y 1800–2400
mirror    phone left −100, strip x 948–1320 (alternate sides on slides 2 and 4)
```
**M3 · Neighbourhood** (closer). App identity row, 2-line headline, phone centred with bottom bleed, pins quieter.
```
identity  x 88, y 150: app icon 144×144 (radius 32) + app name 68px at x 264, baseline-aligned to the icon centre
headline  x 88, y 360, ≤ 1144 wide, 2 lines @ 132px → bottom ≈ 624
phone     W 1040, left 140, top 900 → bottom 3019 (bleed 151 = 7.1%), visible 1968 = 68.6%
pin       right strip is only 140px → hero pin moves above the phone at x 1060, y 700 (still ≥ 48px clear of headline and phone)
```

## Phone / device frame treatment

- Always the template's default bezel (`public/mockup.png` via the `Phone` component in `src/components/editor/device-frames.tsx`). No bezelless card on the App Store set (see the Play note below).
- Upright 0° on every slide. Map apps get tilted in a lot of store sets, but here the map does the moving and the phone stays still.
- Shadow tinted with the land, two-shadow stack (editor `shadow` ≈ 30):
```css
.phone{filter:drop-shadow(0 4px 6px rgba(38,44,40,.18)) drop-shadow(0 36px 60px rgba(38,44,40,.16))}
```
- **Screen choice per slide:** search bar + area filter, results list with map toggle, the in-app map with pins, a listing detail scrolled to its location section, saved search/alerts. The drawn map outside must never contradict the in-app map: no different city shape implied, and no labels that the app map doesn't show.
- **Crop:** the bottom bleed must land in a gap between UI rows. Show the tab bar whole or hide it whole. In M2 the side bleed may cut the screenshot's right/left 10%, but never a price, a title or the button the headline talks about.

**Google Play behaviour.** Play discourages device frames and heavy text overlays, and full-bleed UI reads better there. For the Play phone set, render the same map ground and pins but drop the bezel: the capture becomes a rounded card (radius 44px at 1080 wide, same two-shadow stack), 82–88% of canvas width, flush to the bottom edge. Headlines are cut to ≤ 4 words, and the chip count is 1 per slide (no passive labels). Record this as a store-specific deviation from `_QUALITY_BAR.md` §7 in the hand-off. The **feature graphic (1024×500)** is a map panorama crop: one hero pin, the app icon and name, no phone, no claims.

## Background treatment

The editor backdrop is **`solid` `#EDEBE5`** with **`span: true`**. On top of it sits **one wide SVG image element**, drawn once for the whole deck in connected-canvas mode: 7920×2868 for 6 slides, x 0, y 0, zIndex 1, below the scrim, pins, chips and phone. If a slide must be edited alone, export the same SVG sliced with `viewBox="1320·(n−1) 0 1320 2868"` as per-slide image elements. The geometry stays identical, so the seams still meet.

**How to draw the map (SVG recipe, coordinates on the 7920 artboard):**
1. `<rect width="7920" height="2868" fill="#EDEBE5"/>` (land; matches the backdrop so slicing never shows an edge).
2. **Water:** one river as a filled ribbon path, **200–280px wide**, smooth cubic Béziers with 3–5 bends. It crosses at least 4 of the 6 frames, enters and leaves through seams at different heights, and widens into a coast or bay on slide 6 (bottom-right ≈ 900×700 of water). Fill `#D3DEE0`. Add a 3px `#E2EAEB` stroke on the upper/left bank only (the lit side). Keep it away from every headline box.
3. **Street grid:** one grid rotated **12°** (one angle per deck, 8–16°). Minor roads `stroke="#FFFFFF" stroke-width="16" stroke-linecap="round"`, spaced **220–360px** with ±30% irregularity, so it never reads as graph paper. Some streets stop at the river or end in a T.
4. **Major roads:** 2–3 per deck, `stroke-width="30"`, continuing across seams.
5. **Arterial:** exactly one, `stroke-width="48"`, at a contrasting angle (−20° to −30°), crossing the river on a bridge (drawn above the water) and running through at least 3 frames.
6. **Casing:** draw each road twice, first at +4px width in `rgba(22,33,31,.06)`, then the white stroke on top. That gives a 2px edge.
7. Optional **grain**: `feTurbulence` noise at **4%** opacity over the whole SVG. It's the only texture allowed, and you use it or not on every slide alike.
8. **Seams:** check every seam x (1320, 2640, 3960, 5280, 6600). A seam should cut through blocks, roads or open water, never a bridge end, a pin or a chip.

**Invented geometry only.** Don't trace a recognisable real city and then label it with an area name from the app. A real-looking map with a real-sounding label reads as a claim. If real geography is required, use OSM data + attribution (see the Hard rules) and have the team confirm the area shown is the area named.

Polish gates (§3) for the map: 3 tones, the casing (volume cue) and the lit bank rim (highlight), plus optional grain. The pins clear their gates separately (below).

## Decorative accents

Floating decorations: **0**. The marks below are the style's functional vocabulary, all drawn as SVG image elements, with text as editor text elements so copy stays per-locale:

1. **Hero pin** (1 per slide, 112×152): teardrop path in `--pin`. A crescent on the right 40% of the head in `--pin-shade`. A 4px `--pin-light` arc at the upper-left of the head (10 o'clock to 12). A white Ø44 inner disc holding a 40px category glyph (house, bag, car, briefcase, key) from the product's icon set in `--pin`, or a plain white Ø36 dot if the set has none. A cast shadow ellipse **72×18** at 22% `rgba(22,33,31,.22)`, blur 8px, centred 6px below the point. This clears gates 1, 2 and 4.
2. **Result dots** (0–4): Ø36 `--pin` circle, 6px white ring, `drop-shadow(0 4px 6px rgba(38,44,40,.20))`. Place them on roads or block corners, never in water.
3. **Chip** (1 per slide, the callout): white pill, **h 88, radius 44, padding 0 32px**, a 32px pin glyph in `--pin` at the left, 16px gap, text in Manrope 700 38px ink. Shadow `0 2px 4px rgba(38,44,40,.10), 0 12px 24px -8px rgba(38,44,40,.18)`. Max width 520px in M1 and 320px in M2 strips (if it's longer, use 2 lines at 34px, chip h 132, radius 44). Draw it as an SVG pill image + a text element on top; the glyph is part of the SVG.
4. **Passive area label** (≤ 2 slides per deck): Barlow Semi Condensed 500, uppercase, 30px, `--ink-2`, +0.18em, rotated to the angle of the road it sits beside (12° or the arterial angle), placed on land ≥ 24px from the road edge. Area names only from the capture.
5. **Route line** (once per deck, the cross-screen moment): dashed ink path, 10px stroke, `stroke-dasharray="2 22"` with round caps (a dotted walk line), `rgba(22,33,31,.55)`, following roads from slide 2's pin to slide 3's pin.
6. **"You" marker** (optional, max 1 per deck, never on the same slide as a route start): ink Ø32 dot, 6px white ring.

## Cross-screen moment

- **Always:** the map itself continues across every seam (backdrop continuation, an allowed panorama under §2). The river and the arterial are the threads the eye follows.
- **The one moment (5+ slide decks):** the dotted route line leaves slide 2's hero pin, follows the roads and crosses seam 2|3, ending at slide 3's hero pin. 10–30% of the route's length sits on the far side of the seam. Each slide reads alone: slide 2 shows "a path from here", slide 3 shows "arriving here".
- **Never crosses a seam:** headlines, chips, pins, dots, the phone, the app name, attribution or legal lines. Each stays ≥ 140px from the seam.
- For 8–10 slide decks, add at most one more route (slides 6→7). For 3–4 slide decks, keep the map continuous and skip the route.

## Copy tone

- **Voice:** a helpful local. Short, concrete and spatial. The outcome is "it's near", "it's in your area", "you can see it on the map". Present tense.
- **Shape:** ≤ 5 words, one place phrase as the emphasis. A period at the end of full sentences. No question marks, exclamation marks, emoji or ALL CAPS (eyebrows and passive labels excepted).
- **Vocabulary:** near you, nearby, your area, around the corner, on the map, by area, in your neighbourhood, close to, this street, here.
- **Banned:** "minutes away" and any time or distance not sourced, "anywhere in the world", "explore", "discover the city", "best", "#1", "unlock", "seamless", "revolutionary", "free" (in art), "download now", invented counts ("10,000 homes nearby").
- **Placeholders, verbatim:** `[AREA NAME]` (must match the capture), `[DISTANCE]`, `[ETA]`, `[COUNT]`, `[REGULATOR LINE]`. The team replaces them with sourced values or deletes the chip.
- **Story across the first three frames:** problem (where?) → core action (search the area) → payoff (see it on the map / it's close).
- **Example headlines (12):**
  - Real estate: "Homes **near you.**" / "Search **by area.**" / "See it **on the map.**"
  - Rentals: "Rent **close to work.**" / "Your street, **sorted.**"
  - Classifieds: "Deals **nearby.**" / "Sell to **your area.**"
  - Quick commerce: "Groceries, **nearby.**" / "Track it **to your door.**"
  - Motors: "Cars **near you.**" / "Test drive **this week.**" (only if the app books test drives)
  - Jobs: "Jobs **close to home.**"

## Per-slide breakdown (mandatory)

Sample app: **Hearthmap**, a fictional property-search app (homes for sale and rent). Six slides at **1320×2868**, connected canvas 7920×2868. The map has one river entering slide 1 at y ≈ 2300 (behind the phone) and exiting slide 6 into a bay at the bottom-right, with an arterial road at −24° running across slides 2–5. Area names below are `[AREA NAME]` because they come from Hearthmap's real capture.

### Slide 1 · Hero: "Homes near you." (M1)
- **Map:** river low behind the phone, street grid at 12°, top-right block clear for the pin.
- **Headline:** x 88, y 150, 140px, 2 lines: "Homes / **near you.**" (widest line ≈ 700px ≤ 860).
- **Pin:** hero pin with a house glyph at x 1040, y 230. **Chip:** "[AREA NAME]" right-aligned to x 1232, y 420.
- **Dots:** 2 result dots in the side margins at y ≈ 1500 and 2100 (x 52 and 1252, ≥ 48px from the phone).
- **Phone:** W 1060, left 130, top 820, showing the **results list with the map toggle** capture. Crop in the gap below the 3rd result card; visible 2048px = **71.4%**.
- **Must be true:** at 300px wide you read "Homes near you.", see one red pin and a phone of results. The chip's area name appears in the capture's filter bar.

### Slide 2 · Core action: "Search by area." (M2, phone right)
- **Headline:** x 88, y 150, 140px, 2 lines: "Search / **by area.**".
- **Phone:** W 1000, left 420, top 831, flush bottom, right bleed 100px. Screen: the **area search / location filter** capture with typed suggestions.
- **Strip (x 0–372):** hero pin with a search glyph at x 130, y 1220; chip "[AREA NAME]" at x 40, y 1420 (w ≤ 320, the same name the capture's suggestion list shows). One passive area label on the arterial at y ≈ 2250, rotated −24°.
- **Route starts:** the dotted route leaves the pin, runs up the strip's road to y ≈ 760, then turns right along a minor road in the band between the headline scrim (ends ≈ y 490) and the phone top (y 831), and crosses seam 2|3 at y ≈ 760. The phone bleeds off the right edge, so the route must cross *above* it, never under it.
- **Must be true:** the strip pin sits ≥ 48px from the phone; the passive label is on land and readable.

### Slide 3 · Payoff: "See it on the map." (M1)
- **Headline:** x 88, y 150, 136px, 2 lines: "See it / **on the map.**" (widest ≈ 820px ≤ 860; drop to 128px if longer in a locale).
- **Route ends:** the route enters from the left seam at y ≈ 760, runs right along the same road in the band between the headline scrim and the phone top (y 820), then turns up a street at x ≈ 1096 to end at the hero pin's point (y ≈ 382). It stays ≥ 48px clear of the headline box and the phone. Of its total length, ≈ 25% sits on slide 3.
- **Pin + chip:** top-right; chip "[DISTANCE]" (placeholder) or "[AREA NAME]".
- **Phone:** W 1060, top 820, the **in-app map view with pins** capture. The drawn map and the app's map now meet: same quiet palette in spirit, no conflicting labels.
- **Must be true:** the slide shows a map screen inside the phone (Apple 2.3.3); 10–30% of the route sits on this slide; no seam cuts the pin.

### Slide 4 · Detail: "Every room, located." (M2, phone left)
- **Headline:** 140px, 2 lines: "Every room, / **located.**" (≤ 1144). Use it only if the detail screen shows a location section; otherwise "Know **the street.**".
- **Phone:** W 1000, left −100 (left bleed 100), top 831, flush bottom. Screen: **listing detail scrolled to its location/map section**.
- **Strip (x 948–1320):** hero pin with a key glyph at x 1078, y 1220; chip "[AREA NAME]" at x 960, y 1420 (w ≤ 320).
- **Must be true:** the arterial crosses behind the phone; the river is not under the headline.

### Slide 5 · Retention: "Alerts for your area." (M1)
- **Headline:** 132px, 2 lines: "Alerts for / **your area.**" (widest ≈ 760px).
- **Pin:** a bell glyph pin top-right; chip "[AREA NAME]".
- **Dots:** up to 3 result dots in the side margins, implying new listings. No counts on them, and no "+12 new" chip unless the capture shows that exact number.
- **Phone:** W 1060, top 820, the **saved search / alert settings** capture.
- **Must be true:** one callout only; the alert copy is what the app actually does.

### Slide 6 · Closer: "Your next home, nearby." (M3)
- **Identity:** Hearthmap icon 144px + "Hearthmap" 68px at y 150.
- **Headline:** y 360, 132px, 2 lines: "Your next home, / **nearby.**" (≤ 1144).
- **Map:** the river opens into the bay at the bottom-right behind the phone. Hero pin above the phone's top-right at x 1060, y 700.
- **Phone:** W 1040, left 140, top 900, the **home / search entry** capture. Visible 1968px = **68.6%**.
- **Legal slot (if needed):** `[REGULATOR LINE]` in 24px ink-2 at y 2800, x 88, on land.
- **Must be true:** the set ends where the river does, so the closer reads as a destination. No rating, award, press logo or user count.

### Reference measurements (target)

| Slide | Layout | Phone W / visible | Visible % | Headline max width | Worst headline contrast |
|---|---|---|---|---|---|
| 1 | M1 | 1060 / 2048 | 71.4% | ≈ 700px (53%) | 4.86:1 emphasis on land, ink 13.9:1 |
| 2 | M2 | 1000 / 2037 | 71.0% | ≈ 600px | 4.86:1 / 13.9:1 |
| 6 | M3 | 1040 / 1968 | 68.6% | ≈ 1080px (82%) | 4.86:1 / 13.9:1 |

## Adapting to other app categories

| Category | Fit | Pin glyph | Phone screens | Chip content | Notes |
|---|---|---|---|---|---|
| Real estate | best | house, key | map search, results, detail location, alerts | `[AREA NAME]` from filters | the sample deck |
| Rentals | best | key, bed | map search, commute filter, saved | `[AREA NAME]`, `[DISTANCE]` | commute claims only if the app computes them |
| Classifieds | strong | tag | nearby results, location filter, chat | `[AREA NAME]` | pins show "near you" items; no prices on pins |
| Quick commerce | strong | bag | store list, order tracking map, basket | `[ETA]` placeholder only | delivery times come from legal/ops, never invented; route line = rider path (one per deck) |
| Motors | good | car | dealer map, nearby listings, test-drive booking | `[AREA NAME]` | showroom pins only if the capture shows showrooms |
| Jobs | good | briefcase | jobs near me, commute filter | `[AREA NAME]` | no salary on chips |
| E-commerce | partial | box | store pickup / delivery address only | `[AREA NAME]` | use only when the app has a local angle |
| Fintech | weak | coin / ATM | branch/ATM finder, nearby merchants | `[AREA NAME]` | no returns or offers; `[REGULATOR LINE]` slot on every slide |
| SaaS | rarely | — | field-service / delivery ops dashboards | — | otherwise pick another style |

Keep the three-tone map, one pin, one chip and the upright phone. Swap only the pin glyph, the water tint (brand neutral) and the screens.

## Dark / inverted & localization notes

- **Night-map variant (whole deck, not alternating):** for dark-only brands or dark-mode captures. Land `#1F2B29`, roads `#2E3B38` (1.25:1), water `#162220` (1.12:1), headline `#F4F2EC` (13.1:1), emphasis `#FF8A6B` (6.3:1 on land, 7.1:1 on water), ink-2 `#A9B4B0` (6.9:1). Pins stay `--pin` with a 4px `#F4F2EC` outline so they lift off the dark ground. Chips stay white with ink text. Phone shadow `rgba(0,0,0,.45)` + `rgba(0,0,0,.35)` tight. Never mix day and night slides in one deck: the map is one place at one time.
- **Long German/French lines:** shrink the headline in 4px steps to 120px. If M1 still exceeds 860px, switch that slide to M2 (wider headline). Chips may go to 2 lines (34px). Area names are never translated by you; use the localized capture's own spelling.
- **CJK:** Noto Sans JP/SC/KR 800, `letter-spacing:0`, leading 1.12, size −8%. Passive labels use 500 with +0.08em tracking. Drop the uppercase.
- **RTL (Arabic/Hebrew):** mirror the layouts: headline flush-right at x 1232, the M1 pin zone top-left, M2 strips swapped. The map geometry doesn't need mirroring (it's invented), but the route direction reverses (slide 2 → 3 still runs in reading order, right to left). Noto Sans Arabic / Hebrew 800, `letter-spacing:0`, leading 1.2. Numbers and placeholders inside chips use `direction:ltr; unicode-bidi:isolate`. The chip's pin glyph moves to the right side. Area names come from the Arabic capture, never transliterated by hand.

## Style-specific QA checklist

- [ ] The map is a drawn SVG (or OSM-derived with "© OpenStreetMap contributors" visible); no provider screenshot.
- [ ] Exactly three map tones; no labels, POIs, scale bar, compass or building footprints on the map.
- [ ] Water/land and road/land ratios are between 1.10 and 1.30.
- [ ] One hero pin per slide (112×152, two tones, highlight arc, cast shadow), ≥ 48px from the phone and headline, ≥ 140px from any seam.
- [ ] ≤ 4 result dots; none carry numbers; none in water.
- [ ] One callout (pin + chip) per slide; passive labels on ≤ 2 slides.
- [ ] Every area name in a chip appears in that slide's capture; every distance/time/count is a sourced value or a `[PLACEHOLDER]`.
- [ ] Headline ≤ 5 words, ≤ 2 lines, 128–148px, ≤ 860px wide in M1; emphasis phrase on land only (≥ 4.5:1 at its worst pixel).
- [ ] The headline scrim is invisible as a shape; roads under the letters ≤ 30% visible.
- [ ] Phone upright, default bezel, visible ≥ 1950px; crop falls between UI rows; tab bar whole or hidden.
- [ ] The map continues across every seam with no jump; the one route crosses seam 2|3 only; no text or pin is cut by a seam.
- [ ] Every slide shows a real search / results / map / location / alerts capture.
- [ ] At 300px wide: the headline reads, the red pin is the first thing after the headline, and you can tell it's a "near you" app.

## Common failure modes

1. **A real map screenshot as the background.** It looks like a stolen map app, carries someone else's licence and labels, and its streets fight the UI. **Fix:** draw the map from shapes (recipe above), or styled OSM vectors with attribution.
2. **Loud map.** Saturated blue water, green parks, yellow roads and the map becomes the subject. **Fix:** three neutral tones at 1.10–1.30:1, nothing else.
3. **Graph-paper streets.** A perfectly even grid at 0° looks like a spreadsheet. **Fix:** rotate 8–16°, vary block size ±30%, add one arterial at a contrasting angle and a curved river.
4. **Pin confetti.** Twelve pins per slide reads as "busy" and implies counts. **Fix:** one hero pin + ≤ 4 dots.
5. **Invented proximity.** Chips saying "3 min away" or "1.2 km". **Fix:** `[ETA]`, `[DISTANCE]` until the team supplies a sourced value, or drop the chip.
6. **Fake place names on a fake map.** Typing a plausible district name that the capture doesn't show. **Fix:** area names only from the capture; otherwise `[AREA NAME]`.
7. **Emphasis word over the river.** `#B8381F` on water is 4.22:1. **Fix:** redraw the river away from headline boxes; the scrim helps but doesn't excuse it.
8. **Tilted phone "map app" pose.** A 12° tilted phone on a map turns the style into a generic travel ad. **Fix:** 0°, always.
9. **Seam cuts a pin.** **Fix:** keep pins and chips ≥ 140px from seams; let only roads, blocks, water and the one route cross.
10. **Two accents.** A blue "you are here" dot next to red pins. **Fix:** the "you" marker is ink with a white ring.
11. **Small phone to show more map.** Shrinking the phone to 60% so the map breathes fails §1. **Fix:** the map shows in the top band, side strips and margins; the phone stays ≥ 68%.

## How to apply this style

1. **Fonts:** load Manrope (600/700/800) as `--font-display` and Barlow Semi Condensed (500/600) as `--font-label` with the snippet above (Full style), or the brand family (Brand + style).
2. **Theme:** add `map-led-local` to `THEMES` in `src/lib/constants.ts`: `bg #EDEBE5`, `bgAlt #1F2B29`, `fg #16211F`, `fgAlt #F4F2EC`, `accent #B8381F`, `accentAlt #8F2A16`, `muted #4A5552`.
3. **Scene knobs:** backdrop `solid`, span `true`, decoration `none`, shadow 30, glow 0, tilt 0, headlineWeight 800, headlineScale 1, headlineCase `as-typed`, captionAlign `left`.
4. **Connected canvas:** switch on connected-canvas mode. Draw the map SVG at 7920×2868 (6 slides) following the recipe, and add it as one image element at x 0, y 0, zIndex 1. For per-slide editing, slice it with `viewBox` offsets of 1320.
5. **Scrim:** per slide, add the feathered land-coloured SVG rect behind the headline box (zIndex 2).
6. **Pins, dots, chips, route:** add them as SVG image elements (zIndex 3; route zIndex 2, always below the phone). Put chip text and passive labels in text elements (zIndex 4) so each locale gets its own copy. Rotate passive labels to the road angle with the element's rotation field.
7. **Phone:** per-slide device transform from the M1/M2/M3 recipes (W, left, top), rotation 0. Check the bottom crop against the screenshot's row gaps.
8. **Caption:** headline at `cW × 0.097–0.112`, flush-left at x 88, with the emphasis phrase coloured `--pin-text`.
9. **Measure:** headline width (≤ 860 / 1144), visible phone ≥ 1950px, pin/chip clearances (48px to phone and headline, 140px to seams), emphasis contrast against the worst pixel under it.
10. **Audit:** the checklist above, then `_QUALITY_BAR.md` §10–11 on every export. Run the 300px-wide thumbnail test.

## What this style is NOT

- Not a map provider screenshot, and not a navigation app's turn-by-turn view.
- Not a globe, world map or "travel the world" panorama: it is one neighbourhood.
- Not colourful cartography: no parks, POIs, transit lines or labelled streets.
- Not a data map: no heatmaps, price bubbles, choropleths or counts on pins.
- Not tilted, floating or 3D: the phone is upright and the map is flat.
- Not decorated: no blobs, sparkles, confetti, ratings, laurels or press logos.
- Not a source of facts: no invented distances, times, addresses, prices or listing counts.
