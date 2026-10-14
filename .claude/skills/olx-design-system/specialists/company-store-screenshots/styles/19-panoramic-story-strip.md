---
name: panoramic-story-strip
description: The whole set is one wide artboard sliced into the store frames. A single continuous route ribbon (or horizon band, or one giant shape) runs behind the phones and across every seam, pulling the eye to the next frame, while each frame keeps its own flush-left headline and one full upright phone. The strip reads left to right as a story (problem, action, payoff, proof) and still works frame by frame. Has a frameless UI-panel variant for Google Play.
inspiration: panoramic continuity sets from 2025-26 ASO guides, travel-booking and marketplace app strips (Airbnb, Booking.com, Vinted, Depop style carousels), route-line maps in transit apps, film storyboards
feel: travelling, unhurried, connected, "keep swiping, it goes somewhere"
---

# Panoramic Story Strip

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style. This spec is the one style whose *whole point* is the cross-canvas moment, so it overrides §2's "one moment per deck" default for the continuous element only; every other §2 rule (standalone frames, bad seam-crossers) still applies, and stays strict.

## Hard quality rules (this style)

- **One strip, one continuous element.** The deck is designed on the editor's connected canvas (`connectedCanvas: true`): 6 frames × 1320 = **7920 × 2868** artboard. Exactly ONE continuous element runs across **every** seam: the route ribbon (default), the horizon band, or one giant shape (see Decorative accents). Two continuous elements (ribbon + band) = fail. A ribbon that stops before the last seam = fail.
- **The backdrop spans too.** `scene.span = true`, one 3-stop gradient across the whole 7920px strip (paper → sand → clay). Per-frame gradients that restart at each seam = fail (visible step at the seam).
- **Phones are upright (0°) and whole.** One full phone per frame, never cut by a seam or a canvas edge. Phone width **980px**, height 1996px (69.6% of 2868), top **y = 760**, bottom y = 2756, left **x = 100** in every standard frame. The only exception is the optional **bridge phone** across seam 1→2 (max one per deck, never on another seam).
- **Lead room toward the next frame.** Phone left edge x = 100 gives a 100px left gutter and a **240px right gutter**. The ribbon exits each frame through the wide right gutter and enters through the narrow left one, so the eye is always pulled right. Mirrored for RTL.
- **Headlines never cross a seam, and nothing crosses a headline.** Headline block x 100–1220 (max measured width **1120px = 85%**), y 228–500. The ribbon keeps **≥ 120px** clear of the headline box (no ribbon pixel above y = 620) and **≥ 64px** clear of every seam-side canvas edge where it isn't crossing.
- **The ribbon passes behind the phones** (zIndex below the device, above the backdrop). It never crosses the screenshot, a callout chip, or text. It crosses each seam at **18–35°** from horizontal, inside the 340px gap between two phones (240 right gutter + 100 left gutter), never parallel to the seam.
- **Story order is fixed:** frame 1 problem/hook → 2 core action → 3 second action → 4 payoff → 5 proof → 6 closer. The first three frames must carry the whole pitch (only 15–33% of users swipe past frame 3).
- **Standalone test per frame:** crop any one 1320px frame alone: it has a headline, a full phone, and the ribbon enters and leaves like a deliberate motion line. If any crop needs its neighbour to make sense, fail.
- **One callout per frame, max.** Real UI strings only. Never invented stats, ratings, awards, press logos or prices: unknown facts are `[PLACEHOLDERS]` the team fills.
- **Headline:** Bricolage Grotesque 800, **128–148px**, line-height 0.96, tracking −0.03em, ≤ 5 words, max 2 lines, sentence case. At 300px wide the headline must still read (≥ 29px effective).

## Vibe summary

Swipe through the set and it feels like one long panorama: a warm paper sky that slowly turns to sand and clay from left to right, and a single vermilion route ribbon that dips behind each phone and climbs out the far side, heading for the next frame. It's the visual grammar of a journey: start, move, arrive. Each frame is calm on its own (a short flush-left headline, one upright phone with room to breathe on its right), and the ribbon is the only thing that refuses to stay inside its frame. The last frame closes the route with a destination pin, so the story has an end. Nothing else decorates: the motion is carried by one line.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--sky` | `#F4F1EA` | Span gradient stop 0% (frame 1), default `bg` | ink 15.59:1 |
| `--sand` | `#F7ECDD` | Span gradient stop 50% (frames 3–4) | ink 15.08:1 |
| `--clay` | `#F2E3D3` | Span gradient stop 100% (frame 6), worst case for all text | ink 13.99:1 |
| `--ink` | `#1A1915` | Headlines, eyebrows on light, chip text | ≥ 13.99:1 on every stop |
| `--muted` | `#5C574D` | Eyebrow step label, legal line, chip secondary | 6.36 sky · 5.71 clay · 7.18 white |
| `--route` | `#E4572E` | The ribbon, the destination pin, the waypoint dot. **Graphic only, never text.** | 3.27 sky · 2.93 clay (graphic) |
| `--route-fold` | `#B5391A` | Ribbon underside / fold faces, pin shade | — |
| `--route-light` | `#F08A66` | 6px highlight along the ribbon's top edge (60% opacity) | — |
| `--emph` | `#9E3417` | Emphasis word in the headline | 6.30 sky · 5.65 clay |
| `--dusk` | `#16233A` | `bgAlt`: frameless panel border on dark, dark variant ground, proof card | `#F4F1EA` on it 13.94:1 |
| `--chip` | `#FFFFFF` | Callout chip fill | ink 17.59 · muted 7.18 |
| `--shadow-tint` | `rgba(120,52,20,·)` | Warm phone and ribbon shadows | — |

**Verified contrast pairs** (use only these):

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#1A1915` ink | `#F2E3D3` clay (worst stop) | 13.99:1 | everything |
| `#9E3417` emph | `#F2E3D3` clay | 5.65:1 | headline emphasis word |
| `#5C574D` muted | `#F2E3D3` clay | 5.71:1 | eyebrows, legal ≥ 28px |
| `#1A1915` ink | `#FFFFFF` chip | 17.59:1 | chip text |
| `#F4F1EA` paper | `#16233A` dusk | 13.94:1 | dark variant, proof card |
| `#F6B39A` peach | `#22304F` dusk-end | 7.38:1 | emphasis word in dark variant |
| `#1A1915` ink | `#E4572E` route | 4.78:1 | ≥ 32px text on the pin label only |
| `#E4572E` route | `#F4F1EA` sky | 3.27:1 | **never as text** (graphic only) |
| `#F4F1EA` paper | `#E4572E` route | 3.27:1 | **never** |

**Brand swap.** Brand `bg` → `--sky` (stop 0%); the 50% and 100% stops are the brand `bg` mixed with 4% and 8% of the brand accent (or of `#C9A27A` warm sand if the accent is cool and the mix goes grey). Brand `fg` → `--ink` and must clear **4.5:1 on the darkest stop** (measure stop 100%, not stop 0%). Brand `accent` → `--route` (ribbon, pin, waypoint dot): it must clear **≥ 2.8:1 against every stop** as a graphic, or the ribbon disappears at thumbnail size; if it doesn't, use the darkest brand shade that does, or run the ribbon in brand `bgAlt`. Emphasis text uses the accent only if it clears **4.5:1 on the darkest stop**; otherwise a darker shade of the accent that does, or ink with the 10px route underline only. Brand `bgAlt` → `--dusk` (proof card, frameless panel border on dark, dark variant). If the profile says `accentAsDecoration: false`, the ribbon becomes `bgAlt` or `fg` at 100% and the accent appears only in the emphasis word. Never add a second accent hue.

## Typography

**Google Fonts (OFL, default in Full style):**
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@500;600&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Bricolage_Grotesque, Inter } from "next/font/google";
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "block" });
const text = Inter({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-text", display: "block" });
// <body className={`${display.variable} ${text.variable}`}>
```
Alternates (Google, OFL): Plus Jakarta Sans 800 / Manrope 800 for the display; Inter or DM Sans for text. One family pair per deck. No serif, script, mono or condensed faces.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Bricolage Grotesque 800 | 128–148px | 0.96 | −0.03em | `--ink` + `--emph` word |
| Eyebrow (step label) | Inter 600 | 34–38px | 1.1 | +0.01em | `--muted` |
| Callout chip | Inter 600 | 34–40px | 1.15 | −0.01em | `--ink` |
| Pin label (frame 6 only) | Bricolage Grotesque 700 | 40–48px | 1.0 | −0.02em | `--ink` on white chip |
| Legal / licence line | Inter 500 | 28–30px | 1.3 | 0 | `--muted` |

Rules: sentence case everywhere. Headlines ≤ 13 chars per line at 140px (`floor(1320/140 × 0.45)` ≈ 4 words over two lines). Use the display face's optical size at its largest (`opsz 96`). Numerals in proportional figures; digits only where the number is true.

## Headline emphasis (signature)

One word or short phrase per headline (usually the payoff) is set in `--emph` `#9E3417` **and** sits on a 10px `--route` underline bar, so the headline borrows the ribbon's colour without the ribbon ever touching it.

```css
.emph{color:#9E3417;position:relative;white-space:nowrap}
.emph::after{content:"";position:absolute;left:.02em;right:.04em;
  bottom:-.10em;height:10px;border-radius:5px;background:#E4572E}
```
- The bar is 10px tall at 1320 (scale by `cW/1320`), radius 5, from the first glyph's left edge to the last glyph's right edge, 0.10em below the baseline. It must not touch descenders of the line below (2-line headlines: put the emphasis on the last line).
- The editor's caption has no pseudo-elements: draw the bar as an image element (a 10px rounded rect SVG) positioned under the word, or as a text element containing a styled span if the caption supports inline spans in your scaffold. Re-measure after every copy change.
- Never emphasise the app name, a verb alone, or a placeholder.

**Eyebrow step label** sits above every headline: a 28px `--route` dot (the "waypoint"), a 16px gap, then the step in Inter 600 36px `--muted`: "1 · The problem" is too literal; use the action word: "Snap", "Post", "Meet", "Done". It is the only place the story structure is spelled out, and it is optional on frame 1.

## Layout grid & safe zones

All numbers per frame at 1320 × 2868; frame *n* starts at x = 1320·(n−1) on the 7920px strip. Editor transforms are stored in px relative to the owning slide's left edge (in connected-canvas mode an element may have x < 0 or x + width > 1320 and still render across the seam).

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 150 | Backdrop only |
| Eyebrow | 100, 150, 1120, 46 | Waypoint dot + step word |
| Headline block | 100, 228, 1120, 272 | Text only, nothing overlaps, never within 120px of the ribbon |
| Ribbon-free band | 0, 0, 1320, 620 | No ribbon pixel above y = 620 |
| Phone | 100, 760, 980, 1996 | Upright, whole, z above the ribbon |
| Right gutter (lead room) | 1080, 620, 240, 2248 | Ribbon exits here; callout chip may overhang the phone into it by ≤ 160px |
| Left gutter | 0, 620, 100, 2248 | Ribbon enters here |
| Bottom margin | 0, 2756, 1320, 112 | Backdrop and ribbon only; legal line sits at y 2790 if needed |

Headline + phone span y 228–2756 = **2528px = 88.1%** of canvas. Largest empty band: the 260px gap between headline and phone (9.1%), well under §1's 22%.

**Phone formula** (template bezel, aspect 1022:2082): `H = 2.0372·W`, screen top = `top + 0.0450·W`. At W 980: H 1996, screen from y 804. Never shrink below W 960 (1956px = 68.2%).

### Reusable layout recipes

**S · Standard frame** (frames 1–5). Eyebrow, 2-line headline flush-left, phone at x 100 / y 760 / W 980, ribbon behind the phone entering left and exiting right.

**B · Bridge pair** (frames 1+2, optional, max one per deck).
```
frame 1  phone W 980, x 100 (ends x 1080)
bridge   deviceSecondary of slide 2, W 640 (H 1304), abs x 1128–1768, top 1452 → bottom 2756, 0°
         192px (30%) sits in frame 1, 448px in frame 2; z below both main phones
frame 2  main phone W 960 (H 1956, 68.2%), x 320 → ends 1280, top 800; bridge visible in frame 2 from x 0 to 320
```
The seam at x 1320 cuts the bridge's screen at 30% of its width: pick a bridge screenshot whose 28–32% column is a photo grid gutter or a plain image, never text, a price or a button. Frame 1 alone shows a phone edge entering from the right; frame 2 alone shows a second screen tucked behind the main one. Both read as deliberate.

**F · Frameless panel** (Google Play variant, and allowed on frame 6 of an App Store set). See Phone treatment.

**C · Closer** (frame 6). Standard frame, but the ribbon terminates at the destination pin in the right gutter instead of exiting.

## Phone / device frame treatment

- **App Store set:** the template's default iPhone bezel (`public/mockup.png` via the `Phone` component in `src/components/editor/device-frames.tsx`). Upright 0°, `scene.tilt = 0`, no perspective. Never a custom frame.
- Shadow, warm-tinted two-stack (`scene.shadow ≈ 30`):
```css
.phone{filter:drop-shadow(0 6px 8px rgba(120,52,20,.16)) drop-shadow(0 40px 60px rgba(120,52,20,.14))}
```
- The ribbon passes behind the phone; where it meets the bezel edge, the phone's shadow falls on the ribbon. That overlap is the depth cue. Never put the ribbon in front of the phone.
- **Frameless panel variant (Google Play, where device frames are discouraged).** This is the one sanctioned deviation from `_QUALITY_BAR.md` §7's bezel rule, and it applies to Play exports only (plus, optionally, frame 6 of an App Store set). Use slide layout `no-device` and place the screenshot as an **image element**: pre-export it with **56px** rounded corners (the editor's image elements don't round), W **1040**, x **100**, top **720**, height from the screenshot's own aspect; if it runs past the canvas, it bleeds off the bottom edge and the cut must land in a gap between UI rows (never half a tab bar). Add a 2px `rgba(26,25,21,.10)` inner border in the exported PNG and the same shadow stack as the phone. Status bar stays; no fake notch, no drawn bezel. The panel's left edge is still x 100, so the lead-room rule holds.
- **Play canvas:** for 1080 × 1920 (9:16) Play phone screenshots, scale every number by width (×0.818) and re-place vertically: eyebrow y 90, headline y 140–360 at 108–118px, panel W 850 from y 470 bleeding off the bottom. Play shows screenshots as a horizontal carousel, so the strip continuity survives; keep headlines ≤ 4 words there and no badges or overlays beyond the one chip.

## Background treatment

- `scene.backdrop = "gradient"`, `scene.span = true`: one linear gradient across the full 7920px strip, 90°, stops `#F4F1EA 0%` → `#F7ECDD 50%` → `#F2E3D3 100%`. That's paper → warm sand → clay: the light of a day moving left to right.
- No grain on the backdrop, no vignette, no blobs (`scene.decoration = "none"`), `scene.glow = 0`.
- Check the step: export frames 2 and 3, place them side by side, and sample 10px either side of the seam at three heights: ΔE must be < 1.5. A visible colour step at a seam means the gradient isn't spanning (each slide drew its own).

## Decorative accents

Floating decorations per frame: **0–2**, and only these: the continuous element's segment in that frame, plus one callout chip. Frame 6 adds the destination pin. Nothing else (no sparkles, stickers, arrows, confetti, extra shapes).

**1. Route ribbon (default; classifieds, e-commerce, motors, delivery).**
- One SVG path drawn on the full 7920 × 2868 artboard, a smooth cubic Bézier band **72px** wide with round ends. It starts off-canvas left of frame 1 (enters at x 0, y 1700) and ends at the destination pin in frame 6.
- Seam crossings (y at the seam line, ±40px): seam 1 **y 2420**, seam 2 **y 1180**, seam 3 **y 2300**, seam 4 **y 1320**, seam 5 **y 2460**. The alternating low/high crossings make a slow wave; the ribbon dips behind each phone between crossings. Crossing angle 18–35°.
- Polish (§3, clears 4 of 5 gates): base `#E4572E`; where the ribbon turns over at a crest it shows a fold face in `#B5391A` (two tones, volume cue); a 6px `#F08A66` highlight runs along its top edge at 60% opacity; a soft cast shadow `drop-shadow(0 18px 24px rgba(120,52,20,.18))`; 4% paper-grain noise inside the ribbon only (texture).
- Visible length per frame: at least the full left and right gutter runs, so each crop shows the ribbon arriving and leaving. If it's hidden behind the phone for the whole frame, bend the path through the bottom margin (y 2770–2840) instead.
- **Build it as image elements, not one giant element.** Draw the master SVG at 7920 wide, then export six slices with `viewBox="${1320*(n-1)} 0 1320 2868"` and place slice *n* on slide *n* at x 0, y 0, 1320 × 2868, zIndex below the device. Slices survive per-frame export and the editor's isolated mode; a single 7920px element owned by slide 1 breaks the moment slides are reordered. Reordering slides = re-slice from the master.

**2. Horizon band (alternative; real estate, rentals, travel).** One band of `--dusk` (or brand `bgAlt`) at y **2480–2868**, its top edge a gentle wave (amplitude ≤ 60px over 7920px, no sharp peaks) that continues across every seam. Phones stand *on* it: phone bottom at 2756 sits inside the band, with the contact shadow on the band. The band carries no text; the legal line moves to y 2410 above it. Two tones: the band plus a 24px `#22304F` lighter crest line. No ribbon in this variant.

**3. Giant shape (alternative; SaaS, fintech, quiet brands).** One circle arc of radius **2600px**, stroke 64px `--route` (or a brand tint as a 22% fill), centred below the strip so the arc rises through frames 1–3 and falls through 4–6. It crosses every seam at y 1100–2500. Same build-as-slices rule.

**Destination pin (frame 6 only, all variants).** A 140px route-coloured ring with a 56px `--sky` core and a `#B5391A` lower-half shade, cast shadow ellipse 100 × 22px at 18% beneath, at x 1150 (centre), y 1180, in the right gutter. Optional white chip beside or below it with a real 2–3 word label in Bricolage 700 44px ("Sold", "Booked", "Delivered"), only if that word appears in the app.

**Callout chip (max one per frame).** White `#FFFFFF`, radius 28px, padding 22/30px, Inter 600 36px ink, shadow `0 10px 24px -8px rgba(120,52,20,.22)`. Pinned to the phone's right edge, overhanging into the right gutter by ≤ 160px, at a y the ribbon doesn't pass. Text is a real UI string from the screenshot it points at. Never a rating, price or statistic you made up.

## Cross-screen moment

This style IS the cross-screen moment, carried by exactly one element.
- **Crosses every seam:** the continuous element (ribbon / band / giant shape) and the span gradient. The ribbon is ≥ 40% cross-seam by design; §2 allows that for abstract paths.
- **May cross seam 1→2 only:** the bridge phone (recipe B), 30% / 70% split, behind both main phones.
- **Never crosses a seam:** headlines, eyebrows, emphasis bars, callout chips, the main phones, the panel, the destination pin, legal lines, the app name, any price or rating.
- **Seam placement:** each seam falls in the 340px gap between two phones, where only the gradient and the ribbon live. Run the seam overlay (`showGuides`) before every export.

## Copy tone

- **Voice:** a friend narrating a short trip. Present tense, plain words, outcome first. Each frame is one beat of the story; read in order, the six headlines make one sentence-like arc.
- **Story beats:** problem/hook ("That old bike?") → action ("Snap it. Post it.") → second action ("Buyers nearby find it.") → payoff ("Sold. Same day." only if true, otherwise "Sold.") → proof ("Real reviews.") → closer ("Everything, one app.").
- **Length:** ≤ 5 words per headline, ≤ 13 characters per line. Chips ≤ 4 words.
- **Punctuation:** sentence case, a period ends each sentence. One question mark is allowed, on frame 1 only, as the hook. No exclamation marks, emoji, ampersands or ALL CAPS.
- **Numbers:** only real, checkable ones ("in 3 steps" if the flow has 3 steps). Times, counts, ratings and prices you don't have are `[PLACEHOLDERS]`.
- **Banned:** best, #1, ultimate, revolutionary, seamless, game-changing, unlock, AI-powered (as a headline), "and more", free (in art), download now, guaranteed. Fintech: no promised returns or "earn X%".
- **Example headlines (by category):**
  - Classifieds: "That old bike? **Sold.**" / "Snap it. **Post it.**" / "Buyers **nearby.**"
  - E-commerce: "Found it. **Ordered.**" / "At your door **[DAY].**" / "Returns, **sorted.**"
  - Rentals: "Your next **home.**" / "Tour it **tonight.**" / "Keys, **this week.**"
  - Motors: "Your next **car.**" / "Every check, **logged.**"
  - Jobs: "One profile. **Many offers.**" / "Hired **nearby.**"
  - Quick commerce: "Out of milk? **Sorted.**"
  - Fintech: "Pay rent. **Done.**" / "Every transfer, **tracked.**"
  - SaaS: "From request **to shipped.**"

## Per-slide breakdown (mandatory)

Sample app: **Swapyard**, a fictional local buy-and-sell app. 6 frames at 1320 × 2868 on one 7920px connected canvas. Ribbon variant. Screens named as the capture files the team supplies.

### Frame 1 · Problem / hook (S, or B with frame 2)
- **Backdrop:** strip gradient, here ≈ `#F4F1EA`.
- **Eyebrow:** omitted (the hook speaks first).
- **Headline:** x 100, y 228, 144px, 2 lines: "That old / bike? **Sold.**" (emphasis on "Sold."). Measured width ≤ 1120px.
- **Phone:** x 100, y 760, W 980, `listing-detail` screen of a bike ad with its real "Mark as sold" state, or the home feed.
- **Ribbon:** enters at x 0, y 1700, dives behind the phone, climbs out of the right gutter and crosses seam 1 at y 2420.
- **Chip:** none (keep the hook clean).
- **Must be true:** at 300px wide the headline and the phone read; the ribbon exiting right says "there's more".

### Frame 2 · Core action
- **Eyebrow:** route dot + "Snap".
- **Headline:** 140px: "Snap it. / **Post it.**".
- **Phone:** x 100, W 980, `post-ad-photos` (camera / photo picker step). In recipe B, main phone W 960 at x 320 and the bridge phone shows `post-ad-details` behind it.
- **Ribbon:** enters low (y 2420), rises behind the phone, exits at seam 2, y 1180.
- **Chip:** one, real string from the screen, e.g. the step label the UI shows ("Add photos").
- **Must be true:** the seam side of the frame has only gradient and ribbon (or the bridge phone in B).

### Frame 3 · Second action
- **Eyebrow:** "Meet".
- **Headline:** 140px: "Buyers / **nearby.**".
- **Phone:** `search-results-map` or `chat-list`.
- **Ribbon:** enters high (y 1180), drops behind the phone, exits seam 3 at y 2300.
- **Must be true:** frames 1–3 alone tell the whole pitch (hook, post, reach). This is the last frame most people see.

### Frame 4 · Payoff
- **Eyebrow:** "Done".
- **Headline:** 140px: "Chat. Agree. / **Sold.**" (if "Sold." is on frame 1, use "Deal **done.**").
- **Phone:** `chat-thread` with the agreed-price message (real price from the capture, never typed into the art).
- **Ribbon:** enters y 2300, exits seam 4 at y 1320.
- **Chip:** optional, a real UI string ("Offer accepted") only if visible in the screenshot.

### Frame 5 · Proof
- **Eyebrow:** "Trust".
- **Headline:** 140px: "Real people. / **Real reviews.**".
- **Phone:** `seller-profile` showing reviews and any verification badge the app really has.
- **Proof slot:** if the team has a true figure, it goes in one chip: "[RATING] from [N] reviews" stays bracketed until filled; never invent it. Fintech: the licence / regulator line from legal goes at y 2790, Inter 500 28px `--muted`.
- **Ribbon:** enters y 1320, exits seam 5 at y 2460.

### Frame 6 · Closer (C, or F frameless panel)
- **Eyebrow:** "Everything" (never the app name).
- **Headline:** 140px: "Bikes to sofas. / **One app.**" (categories must match the app's real category list).
- **Phone:** `home-categories`. Frameless option: panel W 1040 at x 100, top 720, bleeding off the bottom in a row gap.
- **Ribbon:** enters y 2460, rises behind the phone and ends at the destination pin (x 1150, y 1180) in the right gutter. Optional pin chip "Sold" (a real UI word).
- **Must be true:** the ribbon ends; nothing exits frame 6's right edge. The pin is ≥ 120px from the headline box.

### Calibration targets

| Check | Target |
|---|---|
| Phone visible height | 1996px = 69.6% (bridge frame main phone 1956 = 68.2%) |
| Headline + phone span | 2528px = 88.1% |
| Headline max width | ≤ 1120px (85%) |
| Ribbon clearance from headline | ≥ 120px (nothing above y 620) |
| Seam gradient step | ΔE < 1.5 |
| Worst headline contrast | emph 5.65:1 on clay; ink 13.99:1 |

## Adapting to other app categories

| Category | Continuous element | Ribbon / band colour | Story beats (problem → action → payoff → proof) |
|---|---|---|---|
| Classifieds | Route ribbon | brand accent or `#E4572E` | clutter → snap & post → buyer chats → sold, reviews |
| E-commerce | Route ribbon (delivery route) | brand accent | want it → find & add → tracked → delivered, reviews |
| Rentals | Horizon band | brand `bgAlt` or `#16233A` | searching → filter & tour → apply → keys, verified hosts |
| Real estate | Horizon band | brand `bgAlt` | dream area → map search → shortlist → visit booked |
| Motors | Route ribbon (road) | brand accent | next car → compare → inspect → bought, history checks |
| Jobs | Route ribbon | brand accent | job hunt → one profile → applied → interview booked |
| Quick commerce | Route ribbon (rider path) | brand accent | ran out → tap → on the way → at the door |
| Fintech | Giant shape (arc) | brand tint, 22% fill | bills pile up → pay in app → done → licence line (no returns promised) |
| SaaS | Giant shape (arc) | brand tint | scattered work → one workspace → shipped → team proof `[LOGOS]` only if approved |

Keep the strip, the lead-room layout, the headline system and the one-element rule. Swap only the element type, its colour and the copy.

## Dark / inverted & localization notes

- **Dark variant (whole strip, never one frame):** inverting a single frame breaks the panorama. If the brand is dark-only, the whole strip goes dark: span stops `#16233A` → `#1B2B47` → `#22304F`, headlines `#F4F1EA` (≥ 11.61:1), emphasis `#F6B39A` (≥ 7.38:1), eyebrows `#BFC7D4` (≥ 7.69:1), ribbon `#E4572E` (≥ 3.56:1 graphic) with highlight `#F08A66`, phone shadow `rgba(0,0,0,.45)`. The horizon band variant uses `#0E1626` on dark. No `invert: "alternate"`.
- **Long German / French lines:** shrink the headline in 4px steps to 120px; if it still exceeds 1120px, shorten. Never let a headline run into the right gutter beyond x 1220.
- **CJK:** Noto Sans JP/SC/KR 800, letter-spacing 0, line-height 1.1, size −8% (≈ 128px). The ribbon and layout are unchanged.
- **RTL (Arabic / Hebrew):** the story runs right to left, so mirror the whole strip: frame 1 is the rightmost export, phones at x 240 (lead room on the left: 240px left gutter, 100px right), headlines flush-right at x 1220, ribbon enters from the right edge and exits left, destination pin in the left gutter of the last frame. Rebuild the master SVG mirrored and re-slice; never just flip the slices. Noto Sans Arabic / Hebrew 800, letter-spacing 0, line-height 1.2. Numerals stay LTR (`unicode-bidi:isolate`). Store order on RTL listings is still first-to-last; check that frame 1 is uploaded first.

## Style-specific QA checklist

- [ ] Designed on the connected canvas; `scene.span = true`; one 3-stop gradient across all frames; no colour step at any seam (ΔE < 1.5).
- [ ] Exactly one continuous element, crossing **every** seam, and ending at the destination pin in the last frame.
- [ ] Every main phone is upright, whole, W ≥ 960 (≥ 68.2%), and no seam or canvas edge cuts it. At most one bridge phone, on seam 1→2 only, 30/70 split, seam through a text-free column.
- [ ] Phone left edge at x 100 (RTL: right edge at 1220) with the 240px lead-room gutter on the exit side.
- [ ] No ribbon pixel above y 620; ribbon behind every phone and panel; crossing angles 18–35°.
- [ ] Every headline sits inside x 100–1220, ≤ 5 words, ≤ 2 lines, 128–148px; emphasis word `#9E3417` (or brand equivalent ≥ 4.5:1 on the darkest stop) with the 10px route bar.
- [ ] One callout chip per frame max, real UI string only; no invented stats, ratings, prices, awards or press logos; placeholders still bracketed.
- [ ] Frames 1–3 carry the full pitch alone; the six headlines read as one story in order.
- [ ] Each frame exported alone passes the 300px thumbnail test (headline readable, phone clear, ribbon looks intentional).
- [ ] Ribbon slices rebuilt from the master after any slide reorder; no ribbon break at a seam (misalignment ≤ 2px).
- [ ] Play export: frameless panels (no bezel), headlines ≤ 4 words, no badges.

## Common failure modes

1. **The ribbon breaks at a seam.** Six hand-drawn segments that don't meet, or slices from an old order. **Fix:** one master SVG at 7920px, sliced by viewBox; re-slice after every reorder; check each seam at 400% zoom.
2. **Restarting gradient.** `span` left off, so each frame has its own gradient and every seam shows a step. **Fix:** `scene.span = true`, measure ΔE at the seam.
3. **Phones cut by seams.** Putting phones across seams to "show continuity" leaves two half-phones and two broken frames. **Fix:** continuity belongs to the ribbon; phones stay whole (bridge phone only on seam 1→2, and only as an extra).
4. **Ribbon in front of the UI or touching the headline.** It reads as a crossing-out. **Fix:** zIndex below the device, nothing above y 620.
5. **Ribbon hidden all frame.** A path that sits behind the phone end to end makes the frame look like it has no ribbon at all. **Fix:** route it through both gutters, or through the bottom margin.
6. **Spaghetti.** Loops, knots, or a ribbon that crosses itself, or one that also writes a word. **Fix:** one slow wave, alternating low/high seam crossings, no loops.
7. **Two continuous elements.** A ribbon plus a horizon band plus a giant arc. **Fix:** pick one per deck.
8. **Frames that only work together.** Frame 4 whose headline continues frame 3's sentence ("…and then"). **Fix:** each headline is complete on its own; the arc is in the order, not in split sentences.
9. **Shrinking phones to show more ribbon.** A 760px phone leaves lots of panorama and fails §1. **Fix:** W 980; the ribbon lives in the gutters and seams.
10. **Pale emphasis word.** Route orange `#E4572E` as text measures 2.93:1 on clay. **Fix:** `#9E3417` text, orange only as the bar.
11. **Story out of order.** Proof on frame 2, payoff on frame 6. **Fix:** problem → action → action → payoff → proof → closer; the first three alone must sell.

## How to apply this style

1. **Fonts:** load `Bricolage_Grotesque` (700/800) as `--font-display` and `Inter` (500/600) as `--font-text` in `src/app/layout.tsx` (snippet above). Brand modes keep the brand face at its heaviest weight.
2. **Theme:** add `panoramic-story-strip` to `THEMES` in `src/lib/constants.ts`: `bg #F4F1EA`, `bgAlt #16233A`, `fg #1A1915`, `fgAlt #F4F1EA`, `accent #E4572E` (graphic only), `accentAlt #9E3417` (emphasis text), `muted #5C574D`.
3. **Scene:** `backdrop "gradient"`, `span true`, `decoration "none"`, `shadow 30`, `glow 0`, `tilt 0`, `headlineWeight 800`, `headlineScale 1`, `headlineCase "as-typed"`, `captionAlign "left"`. Turn on connected canvas.
4. **Placement:** per slide, set the caption transform to x 100, y 228, w 1120 and the device transform to x 100, y 760, w 980 (recipe B: slide 2 device x 320, w 960; `deviceSecondary` x −192, y 1452, w 640).
5. **Continuous element:** draw the master SVG (7920 × 2868) with the seam crossings above, export six viewBox slices, add each as an image element on its slide (x 0, y 0, 1320 × 2868, zIndex below the device). Draw the destination pin as an image element on slide 6.
6. **Emphasis:** colour the emphasis word `--emph`; add the 10px route bar as an image element under it (re-measure after copy edits). Eyebrow: waypoint dot as a 28px SVG image element + a text element.
7. **Chips:** at most one text element on a white rounded image element per slide, real UI copy only.
8. **Play:** duplicate the deck for Play, switch slides to `no-device`, and place pre-rounded screenshot panels (recipe F).
9. **Measure:** headline width ≤ 1120px, phone ≥ 1956px, ribbon clear of y < 620, seam ΔE < 1.5, ribbon misalignment ≤ 2px at each seam, emphasis ≥ 4.5:1 on the darkest stop under it.
10. **Audit:** this checklist plus `_QUALITY_BAR.md` §10–11 on every exported frame, and once more on the six frames laid side by side.

## What this style is NOT

- Not a single panoramic phone or UI sliced across frames: phones stay whole; the continuity is one line or band.
- Not a doodle trail (05) or sticker path (03): one clean ribbon, no hand-drawn wobble, no props along it.
- Not a map screenshot: the ribbon is an abstract route, never fake streets, pins on fake places or invented distances.
- Not tilted or floating: phones are upright and anchored.
- Not a poster style (18) or editorial collage (10): no illustration plates, no photo backdrops in the default; the horizon band is a flat shape.
- Not busy: 0–2 accents per frame, one callout max.
- Not split sentences across frames: each headline is complete on its own.
- Not a fake-proof set: no invented ratings, download counts, awards, press logos or prices.
