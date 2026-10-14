---
name: product-cutout-shelf
description: Real background-removed catalogue product photos stand on one flat shelf line or burst out from behind an upright phone, on a flat saturated ground. Every cutout shares one light direction and one shadow recipe, products are scaled to plausible relative size, 3–7 per frame, and at most one price or offer tag per frame repeats a value the capture shows. One big outcome headline. Inspired by grocery and quick-delivery store sets and retail category banners.
inspiration: Instacart and Getir store sets, Talabat Mart and Careem Quik promo frames, Amazon Fresh category banners, supermarket shelf-edge labels and weekly flyers
feel: abundant, fresh, honest, "the shelf comes to you"
---

# Product Cutout Shelf

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style.

## Hard quality rules (this style)

- **Real products only.** Every product is a background-removed photo from the company's own catalogue or studio shoot, with the rights to use it in store marketing recorded in the hand-off (SKU, source, rights holder, date). **Generated, AI-retouched or AI-extended products = fail.** User-uploaded listing photos are not company assets: never cut them out. If no cutouts are supplied, this style is not available; offer Bento Keynote Grid or Candy Pop Social instead.
- **Third-party brands:** a branded pack may appear only if that exact item is sold in the app **and** marketing use is permitted. Max **one** third-party logo legible per frame, never larger than the headline's x-height × 3. Otherwise use own-label packs, unbranded fresh produce, or a pack angle where the logo is not the readable face. Never a brand the app doesn't stock.
- **Count: 3–7 products per frame**, strict. 2 reads as a mistake, 8+ reads as a flyer. Count a bunch (bananas, a herb bundle, a 6-pack) as one product.
- **One light, one shadow.** Key light from the **upper-left (10:30, ≈ 45° elevation)** on every cutout on every slide: highlight on the left/top faces, shade on the right. Every cutout gets the same shadow stack (see Background treatment). A cutout lit from the right, or carrying its own baked studio shadow, = fail. **Never mirror a pack to fix lighting** (mirrored text); swap the photo.
- **Plausible relative size.** One deck scale `k` px/cm per frame (shelf 13–15 px/cm, burst 15–18 px/cm). Each product's rendered height = real height × `k`, ±10%. A can taller than a 1.5 L bottle = fail. Anything that would render under **200px** becomes a pack or cluster (punnet, bag, bunch) or is dropped.
- **Phone:** the template bezel, **upright 0°**, width **960–1000px**, visible height **≥ 68% (≥ 1956px)**. Products may overlap the bezel by **≤ 90px** and cover **≤ 12% of the visible screen**, only in the bottom band or the outer edge, never the row the headline talks about.
- **Ground is one flat saturated hex.** No gradient, no grain, no vignette, no blobs. The shelf is the only other surface and is flat too (two tones: top face + front lip).
- **One tag per frame, max.** A price tag (`--accent`) or an offer tag (`--accent-alt`), never both, never two. The tag repeats a value **visible in that slide's capture for that same SKU**, written as a placeholder in drafts (`[PRICE]`, `[OFFER]`) and filled from the capture at export. If the capture shows no price, the frame has no tag. Never invent a price, discount, delivery time, fee or rating.
- **Headline:** Bricolage Grotesque 800, **140–160px**, line-height 0.95, tracking −0.03em, **≤ 5 words**, max 2 lines, measured width ≤ 1160px (88%). It must read at 300px wide. Ink `#1B1410` on the ground = 12.6:1.
- **Every slide shows the app in use** (Apple 2.3.3). Products frame the capture; they never replace it. No product-only slide, no logo-only slide.

## Vibe summary

It looks like the best page of a supermarket flyer, rebuilt by someone with taste. The ground is one loud, flat colour: sunflower yellow by default, or the brand's own saturated colour. Real products, cut cleanly out of catalogue photos, stand on a single flat shelf, or burst out from behind the phone like a basket being tipped out. They share one light, falling from the upper left, and one soft shadow, so they look like they were shot together. Sizes are honest: the bottle is taller than the milk carton, the milk taller than the yoghurt. The phone stands dead upright in the middle showing the real app, and one red shelf-edge label quotes the price the screen shows. Above it all sits one fat, friendly headline that says the outcome in four words. Abundant, but counted: never more than seven things.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ground` | `#FFD23F` | Slide background (flat) | — |
| `--shelf-top` | `#FFE07A` | Shelf top face (lit, 36–44px tall) | ink 14.0:1 |
| `--shelf-lip` | `#E3A80C` | Shelf front lip (shaded) | ink 8.55:1 |
| `--ink` | `#1B1410` | Headline, captions | 12.6:1 on ground, 18.2:1 on white |
| `--muted` | `#4A3A08` | Eyebrow / small caption on ground | 7.65:1 |
| `--accent` | `#A3112A` | Price tag fill; headline emphasis phrase | white on it 7.86:1; it on ground 5.44:1; on shelf-top 6.06:1 |
| `--accent-alt` | `#0B5D33` | Offer tag fill (instead of the price tag) | white on it 7.99:1 |
| `--tag-text` | `#FFFFFF` | Text on either tag | ≥ 7.86:1 (tiny unit labels pass 7:1) |
| `--night` | `#23103A` | Inverted closer ground (bgAlt) | `#FFF3D1` on it 15.74:1 |
| `--night-text` | `#FFF3D1` | Headline on night | 15.74:1 |
| `--night-emph` | `#FFD23F` | Emphasis on night | 12.05:1 |
| `--night-shelf-top` / `--night-shelf-lip` | `#3A1F5C` / `#2E1749` | Shelf on night | — |
| `--shadow` | `rgba(92,58,0,.30)` | Cutout + phone shadow tint on yellow (warm brown, never black) | — |
| `--shadow-night` | `rgba(0,0,0,.45)` | Shadow on night | — |

**Verified contrast pairs (use only these):**

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#1B1410` ink | `#FFD23F` ground | 12.6:1 | headline, captions, everything |
| `#A3112A` accent | `#FFD23F` ground | 5.44:1 | headline emphasis phrase (≥ 140px) |
| `#FFFFFF` | `#A3112A` accent | 7.86:1 | price + unit on the tag |
| `#FFFFFF` | `#0B5D33` accent-alt | 7.99:1 | offer text on the tag |
| `#4A3A08` muted | `#FFD23F` ground | 7.65:1 | eyebrow, legal line |
| `#FFF3D1` | `#23103A` night | 15.74:1 | closer headline |
| `#FFD23F` | `#23103A` night | 12.05:1 | closer emphasis |
| `#FFFFFF` | `#FFD23F` ground | 1.4:1 | **never** |
| `#A3112A` accent | `#E3A80C` lip | 3.2:1 | **never as text** (the tag is a filled block, so this never happens) |

**Brand swap.** `bg` → `--ground`, but only if it is a saturated mid-to-light colour that the headline colour clears at ≥ 4.5:1 (aim 7:1). `fg` → headline ink: dark ink on light grounds (yellow, orange, lime, pink), near-white `#FFF8E7` on dark grounds (green, purple, deep blue, red); pure `#FFFFFF` on a saturated mid-tone is banned (§5). `accent` → the price tag fill, only if white tag text clears **7:1** on it (unit labels are small) and, if it is also used as the emphasis phrase, it clears 4.5:1 on the ground; otherwise the emphasis phrase stays in `fg` and the accent appears only on the tag. `bgAlt` → the inverted closer ground (`fgAlt` on it ≥ 7:1). Shelf tones are derived from the ground: top face = same hue 25–40% lighter, lip = same hue 10–16% darker (re-measure: text never sits on the shelf except inside the tag). A brand whose primary colour is too pale to be a ground (`#F7F4EE`-like) uses its secondary saturated colour as ground, or this style becomes Brand-only.

## Typography

**Google Fonts (default, OFL):**
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Inter:wght@600;700;800&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Bricolage_Grotesque, Inter } from "next/font/google";
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "block" });
const text = Inter({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-text", display: "block" });
// <body className={`${display.variable} ${text.variable}`}>
```
Brand + style: the brand's display face at its heaviest weight (≥ 700), the brand's text face for tags.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Bricolage Grotesque 800 | 140–160px | 0.95 | −0.03em | `--ink` + emphasis phrase in `--accent` |
| Eyebrow (optional, slides 1 and 6 only) | Inter 700 | 36–40px | 1.1 | 0 | `--muted` |
| Tag price | Inter 800, `font-variant-numeric: tabular-nums` | 80–92px | 1.0 | −0.02em | `--tag-text` |
| Tag unit / small line | Inter 700 | 32–36px | 1.1 | 0 | `--tag-text` |
| Offer tag | Inter 800 | 64–76px | 1.0 | −0.01em | `--tag-text` |
| Legal / regulator line (if any) | Inter 600 | 28–30px | 1.2 | 0 | `--muted` |

Rules: sentence case. The currency symbol and number format come **from the capture** (same symbol position, same decimal separator, same digits). Numerals in tags are tabular so `[PRICE]` and the filled value occupy the same box.

## Headline emphasis (signature)

One phrase per headline (1–3 words, the payoff) is set in `--accent`. Same face, size and weight; colour is the only change. No underline, no highlight block, no sticker behind the word (the tag is the frame's only sticker-like shape).

```css
.headline{font:800 150px/0.95 var(--font-display);letter-spacing:-.03em;color:#1B1410;text-align:center}
.headline .em{color:#A3112A}            /* 5.44:1 on #FFD23F */
.night .headline{color:#FFF3D1}.night .headline .em{color:#FFD23F}
```
On the flat ground every glyph pixel equals the pair ratio: 5.44:1 (emphasis), 12.6:1 (ink). Re-measure only where a product shadow falls near the headline (it must not). If the brand accent fails 4.5:1 on the brand ground, the emphasis phrase stays in `fg` and the headline relies on the line break for rhythm.

## Layout grid & safe zones

Canvas 1320 × 2868. Side margins 72px. Template bezel aspect 1022:2082: phone height `H = 2.0372·W`, screen top `= phoneTop + 0.045·W`, screen height `= 1.9472·W`.

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 96 | Ground only; burst tips may enter, text never |
| Headline block | 72, 96, 1176, 140–300 | Text only; products may not cross the letter shapes (§5) |
| Product + phone field | 0, headline-bottom + 48, 1320, → shelf top or canvas bottom | Phone, cutouts, the one tag |
| Shelf | 0, 2440, 1320, 428 (top face 2440–2480, lip 2480–2868) | Full-bleed, flat; products stand on y 2470 |
| Side bleed | x < 0 or > 1320 | Cutouts may bleed up to 30% of their width; phone only in S1-type split |

**Thumbnail rule:** at 300px wide the headline must be ≥ 32px tall per line and the phone screen still readable as "a shop". If either fails, drop a product, not the headline size.

### Reusable layout recipes

**B1 · Basket burst** (hero, payoff). Headline centred top; phone bottom-bleeds; products fan out from behind the phone's shoulders.
```
headline  y 96–380    centred, 150px, 2 lines
phone     W 1000, left 160, top 860 → bottom 2897 (29px bleed); visible 2008 = 70.0%
arc       centre (660, 1320), radius 560–640, angles −165° … −15°
behind    3–4 cutouts on the arc, zIndex below the device, rotated outward 6–18°, ≥ 55% of each visible
front     1–2 cutouts at the lower corners (x −60…340 / 980…1380, y 2280–2868), overlap bezel ≤ 90px
tag       one hang tag, beside the product it prices, never over the screen
```

**S1 · Shelf front** (feature). Phone stands on a full-width shelf; products flank it on the same shelf.
```
headline  y 96–380    centred, 150px, 2 lines
phone     W 980, left 170, top 444 → bottom 2440 (stands on the shelf top face); visible 1996 = 69.6%
shelf     top face y 2440–2480, lip 2480–2868
products  3–5 on baseline y 2470, flanks x −80…260 and 1060…1400, k = 14 px/cm
tag       one shelf-edge label on the lip, x-centred under its product, y 2540–2700
```

**S2 · Side stack** (feature with detail). Headline flush-left; phone right with a ≥ 100px side bleed; a short ledge plus the main shelf on the left.
```
headline  x 72, y 96–380, 150px, 2 lines, flush-left
phone     W 980, left 440 → right edge 1420 (100px bleed), top 444 → bottom 2440; visible 1996 = 69.6%
ledge     x 0–400, y 1540–1576 (top face 16 + lip 20), holds 1 product (baseline 1548)
shelf     same as S1 (y 2440), holds 2 products in x 40–400
tag       one shelf-edge label on the main lip under its product
```

**F1 · Front row** (offers, closer). Phone stands behind a row of 5–7 products spread across the full shelf.
```
headline  y 96–380    centred, 2 lines
phone     W 980, left 170, top 444 → bottom 2440; visible 1996 = 69.6% (measured to the shelf, occlusion ≤ 12% of screen)
products  5–7 on baseline 2470, 2 in front of the phone's lower corners, the rest on the flanks;
          heights 220–420px, so nothing in front rises above y 2050 (the bottom 20% of the screen)
```

## Phone / device frame treatment

- Always the template's default bezel (`public/mockup.png`, `Phone` in `src/components/editor/device-frames.tsx`). Upright 0°, width 960–1000px.
- The phone either stands **on the shelf** (S1, S2, F1: bottom edge exactly on the top face, y 2440) or **bottom-bleeds** (B1). Never floats mid-canvas with ground above and below.
- Shadow, tinted with the ground:
```css
.phone{filter:drop-shadow(16px 26px 34px rgba(92,58,0,.26)) drop-shadow(4px 6px 6px rgba(92,58,0,.22))}
.night .phone{filter:drop-shadow(16px 26px 34px rgba(0,0,0,.45)) drop-shadow(4px 6px 6px rgba(0,0,0,.40))}
```
  The offset points lower-right, matching the 10:30 key light on the cutouts. A phone on the shelf also gets a contact ellipse (same recipe as products).
- Screen choice: the capture must show the products or category the frame shows (same SKUs where a tag is used). Light screenshots read best on yellow; dark-mode captures go on the night closer.

## Background treatment

`background:#FFD23F` flat. The shelf is two flat rectangles; no wood grain, no gradient, no reflection.

```css
.shelf-top{position:absolute;left:0;top:2440px;width:1320px;height:40px;background:#FFE07A}
.shelf-lip{position:absolute;left:0;top:2480px;width:1320px;height:388px;background:#E3A80C}
/* the one shadow recipe, on EVERY cutout */
.cutout{filter:drop-shadow(14px 22px 18px rgba(92,58,0,.28)) drop-shadow(3px 4px 3px rgba(92,58,0,.22))}
/* contact ellipse for anything standing on a shelf: 70–85% of base width, height 12% of that, offset +12px x */
.contact{position:absolute;border-radius:50%;background:rgba(92,58,0,.34);filter:blur(12px)}
```
Burst cutouts float, so they take the drop-shadow only (no contact ellipse), with the same offset. Cutout edges: clean alpha, no halo or fringe (check at 200% zoom on the ground colour), source resolution ≥ 1.5× rendered size. Polish gates (§3): the photos carry their own tones, texture and volume; the shared contact + drop shadow is gate 2, and consistent lighting is what makes them pass together.

## Decorative accents

Products and the shelf are the composition, not decoration. Floating decorations: **0** (no sparkles, confetti, leaves, splashes, speed lines, blobs). Allowed extras, per frame:

1. **The one tag** (optional):
   - *Shelf-edge label* (S1, S2, F1): 300×150px rect, radius 14, `--accent` fill, on the lip. `[PRICE]` Inter 800 86px, `[UNIT]` Inter 700 34px below ("per kg", "6 pack"), both white.
   - *Hang tag* (B1): 280×150px, radius 20, left edge pointed (a 40px chevron), a 24px punched hole filled with the ground colour, rotated −8° to −4°, placed beside its product, ≥ 40px off the bezel.
   - *Offer tag*: the same shapes in `--accent-alt` with `[OFFER]` (e.g. the percentage or "2 for [PRICE]" exactly as the capture states it).
2. **Eyebrow** (slides 1 and 6 only): one line above the headline, e.g. the app name or `[DELIVERY AREA]`.
3. **Legal line** (fintech add-ons, alcohol-free or regional notes): bottom of the lip, `--muted`, from legal only.

## Cross-screen moment

- **One per deck (5+ slides):** the shelf runs continuously from slide 2 (S1) into slide 3 (S2) at the same y (2440). In connected-canvas mode it is one shelf element spanning both frames.
- The seam cuts only plain shelf: no product, contact shadow or tag within **120px** of the seam on either side.
- **Never crosses:** products (a half-bottle on each frame looks like a cropping bug), the phone, the tag, the headline. Burst cutouts may bleed off the outer canvas edge but not across a seam into the neighbour.

## Copy tone

- **Voice:** the friendly shopkeeper. Outcome first, short, warm, concrete. **≤ 5 words.**
- **Story over the first three frames:** problem → core action → payoff ("Groceries at your door." → "Everything for tonight." → "One tap. In the cart.").
- **Vocabulary:** door, tonight, fresh, basket, cart, shelf, weekly shop, in one tap, sorted, the category names the app actually uses.
- **Numbers and claims:** no number in a headline unless it is a placeholder the team fills from a verified source (`[ETA]`-minute delivery only with the operations team's sign-off). No "cheapest", "lowest prices", "free delivery" unless legal confirms and it is shown in the capture.
- **Punctuation:** sentence case, period at the end. No question marks, exclamation marks, emoji or ALL CAPS.
- **Banned:** best, #1, cheapest, unbeatable, unlimited, guaranteed, revolutionary, seamless, AI-powered, "and more", download now, invented percentages.
- **Example headlines:** "Groceries at **your door.**" / "Everything **for tonight.**" / "One tap. **In the cart.**" / "This week's **offers.**" / "Watch it **arrive.**" / "Your whole shop. **One app.**" / (e-commerce) "New in. **Delivered.**" / "Your size, **in stock.**" / (classifieds category hero) "Furniture, **near you.**"

## Per-slide breakdown (mandatory)

Sample app: **Corner Cart**, a fictional quick-grocery delivery app. Canvas 1320 × 2868. All prices are placeholders filled from each slide's capture.

### Slide 1 · Hero (B1 Basket burst)
- **Ground:** `#FFD23F`. Eyebrow "Corner Cart" 38px `--muted` at y 96; headline y 156–440, centred, 150px: "Groceries at / **your door.**".
- **Phone:** W 1000, left 160, top 860, `home` screen. Visible 2008px = **70.0%**.
- **Products (6, k = 16 px/cm):** behind: 1.5 L water bottle (33 cm → 528px, upper-left, −14°), bunch of bananas (≈ 20 cm → 320px, top-left shoulder, −8°), sourdough loaf (≈ 22 cm long → 352px, top-right shoulder, +10°), 1 L milk carton (24 cm → 384px, upper-right, +16°). Front: egg box 6-pack (lower-left, 300px wide, overlapping bezel 70px), punnet of strawberries (lower-right, 260px, overlap 60px).
- **Tag:** hang tag `[PRICE]` / `[UNIT]` beside the milk, only if the `home` capture shows that milk's price; else no tag.
- **Must be true:** at 300px wide the headline and the yellow-plus-groceries read instantly; no product crosses the headline; front items cover only the bezel corners and the tab-bar band.

### Slide 2 · Core action (S1 Shelf front)
- **Headline:** centred, y 96–380: "Everything / **for tonight.**".
- **Phone:** W 980, left 170, top 444, standing on the shelf; `category-fresh` screen. Visible 1996px = **69.6%**.
- **Shelf:** full bleed, top 2440. Products (4, k = 14 px/cm) on baseline 2470: left flank olive oil 750 ml (29 cm → 406px) and tomatoes on the vine (cluster 300px wide); right flank pasta pack (26 cm → 364px) and basil bunch (≈ 22 cm → 308px).
- **Tag:** shelf-edge label under the tomatoes, `[PRICE]` / per kg, matching the tomato row in the capture.
- **Must be true:** no product or tag within 120px of the right seam (the shelf continues into slide 3).

### Slide 3 · Core action detail (S2 Side stack)
- **Headline:** flush-left x 72, y 96–380: "One tap. / **In the cart.**".
- **Phone:** W 980, left 440, 100px right bleed, top 444, `product-detail` screen with the add-to-cart button visible. Visible 1996px = **69.6%**.
- **Products (3):** ledge (y 1540): coffee bag 250 g (≈ 22 cm → 308px). Main shelf (continuing from slide 2): the same SKU as the capture (e.g. 1 L orange juice, 24 cm → 336px) and a 6-pack of yoghurt cups (cluster, 280px wide).
- **Tag:** shelf-edge label under the juice: `[PRICE]` exactly as the `product-detail` capture shows it.
- **Must be true:** the add-to-cart button is unoccluded; nothing in the left 120px of the shelf (the seam).

### Slide 4 · Value (F1 Front row, offer)
- **Headline:** centred: "This week's / **offers.**".
- **Phone:** W 980, left 170, top 444, `offers` screen. Visible 1996px = **69.6%**; occlusion ≤ 12% of the screen, all in the bottom band.
- **Products (5):** front row on baseline 2470, heights 240–420px, each one shown in an offer card on the capture.
- **Tag:** one **offer** tag in `--accent-alt` with `[OFFER]` worded exactly as the capture's card. No price tag on this slide.
- **Must be true:** every product on the shelf appears on the capture's offers screen; no invented discount.

### Slide 5 · Payoff (B1 Basket burst, light)
- **Headline:** centred: "Watch it / **arrive.**".
- **Phone:** W 1000, left 160, top 860, `order-tracking` screen (map + courier status). Visible 2008px = **70.0%**.
- **Products (3):** behind the upper-right shoulder only (paper grocery bag with produce, 1.5 L bottle, baguette), so the map stays clear. No tag.
- **Must be true:** the tracking map and status line are fully unoccluded; any ETA on screen is the capture's own, not repeated in the headline unless as a filled placeholder.

### Slide 6 · Closer (F1 Front row, inverted night)
- **Ground:** `#23103A`, shelf `#3A1F5C` / `#2E1749`, shadows `--shadow-night`. Headline `#FFF3D1`, emphasis `#FFD23F`: "Your whole shop. / **One app.**" (eyebrow `[DELIVERY AREA]` if legal wants it).
- **Phone:** W 980, top 444, `cart` screen.
- **Products (7):** the deck's cast in a front row (one item from each earlier slide), same light direction, k = 13 px/cm so seven fit.
- **Tag:** none (the cart total is not a product price).
- **Must be true:** the only dark slide; seven products exactly; every cutout still lit from the upper-left.

### Target geometry (computed from the recipes; no reference render yet)

| Slide | Layout | Phone W / visible H | Visible % | Headline width budget | Headline contrast (flat ground) | Products |
|---|---|---|---|---|---|---|
| 1 | B1 | 1000 / 2008 | 70.0% | ≤ 1160px (88%) | 5.44:1 emphasis, 12.6:1 ink | 6 |
| 2 | S1 | 980 / 1996 | 69.6% | ≤ 1160px (88%) | 5.44:1 / 12.6:1 | 4 |
| 6 | F1 night | 980 / 1996 | 69.6% | ≤ 1160px (88%) | 12.05:1 / 15.74:1 | 7 |

## Adapting to other app categories

| Category | Fit | Ground / fg (measured) | Products | Notes |
|---|---|---|---|---|
| Quick commerce | best | `#FFD23F` / `#1B1410` 12.6 | groceries, household, snacks | the default deck above |
| E-commerce (general) | best | `#5B2A86` / `#FFF8E7` 9.35 | electronics, home, beauty from the catalogue | shelf becomes a low plinth; tag = catalogue price shown in the capture |
| E-commerce (fashion) | good | `#FF8FB1` / `#1B1410` 8.5 | flat-lay garments, shoes, bags | burst only (garments don't stand on shelves); shoes on the shelf |
| Pharmacy / beauty | good | `#0B5D33` / `#FFF8E7` 7.55 | own-label packs | no medical claims; legal line slot |
| Classifieds (category hero) | partial | `#1557B0` / `#FFF8E7` 6.56 | **company-owned** category photography (sofa, bike, phone, appliance), never user listing photos | no price tags (listing prices belong to sellers); 3–4 items; headline names the category |
| Food delivery | partial | `#FF7A1A` / `#1B1410` 6.98 | packaged dishes shot by the company | dishes on plates, burst only |
| Motors, real estate, jobs, fintech, SaaS | no | — | — | nothing to cut out at plausible scale; use Bento Keynote Grid, Swiss Grid Bold or Magazine Cover |

Keep the counts, the light direction, the shadow recipe, the one-tag rule and the phone geometry. Swap the ground, the headline ink and the cast.

## Dark / inverted & localization notes

- **Inverted slide:** once per deck (the closer), on `--night`. Not an alternating style.
- **Google Play:** Play discourages heavy device frames and promotional overlays. Play variant: same ground, shelf and products, headline ≤ 4 words, product count 3–5, and the capture may run **frameless** as a 48px-radius screen card at the same size (the template bezel stays the default for the App Store set). Products never cover the screen card on Play. Feature graphic 1024×500: ground, shelf at y 380, 4–5 products left, headline right at 72px, no phone, no tag.
- **Long languages (German, French, Russian):** shrink the headline in 4px steps to 128px; if it still overflows 1160px, shorten. Never drop below 2 lines' worth of meaning by cutting the emphasis.
- **CJK:** Noto Sans JP/SC/KR 800, letter-spacing 0, line-height 1.1, −8% size.
- **RTL (Arabic, Hebrew, Urdu):** mirror the layout (S2 phone bleeds left, ledge on the right, flush-right headline) but **never mirror the cutouts** (pack text) and keep the key light upper-left, since the photos weren't re-shot. Headline in Noto Kufi Arabic or IBM Plex Sans Arabic 700, letter-spacing 0, line-height 1.2. Tag numerals and currency exactly as the localized capture shows them (Western or Arabic-Indic digits, symbol position); isolate the price span with `unicode-bidi:isolate`. Products with Latin-only packs are fine; packs in a third language should be swapped for the local-market SKU the app sells.

## Style-specific QA checklist

- [ ] Every product is a real catalogue cutout with SKU, source and marketing rights logged; none generated or AI-extended; none from user listings.
- [ ] Third-party logos: each brand is sold in the app and permitted; ≤ 1 legible third-party logo per frame.
- [ ] 3–7 products on every frame (bunches and packs count as one).
- [ ] Every cutout lit from the upper-left; none mirrored; no baked studio shadow; all carry the same shadow stack (contact ellipse when standing).
- [ ] Relative sizes plausible within ±10% of `k` × real height; nothing under 200px.
- [ ] Clean alpha edges: no halo, fringe or leftover background at 200% on the ground colour.
- [ ] Ground is one flat hex; shelf is two flat tones; zero floating decorations.
- [ ] Phone upright, 960–1000px wide, visible ≥ 1956px, standing on the shelf or bottom-bleeding.
- [ ] Products overlap the bezel ≤ 90px and cover ≤ 12% of the screen, never the headline's subject row or the primary button.
- [ ] ≤ 1 tag; its value appears in that slide's capture for that same SKU; drafts show `[PRICE]` / `[OFFER]`.
- [ ] Headline ≤ 5 words, ≤ 2 lines, ≤ 1160px wide, ≥ 4.5:1 at the worst glyph pixel; legible at 300px wide.
- [ ] No product touches or crosses the headline letters.
- [ ] Cross-screen shelf: nothing within 120px of the seam except plain shelf.
- [ ] One night slide at most.

## Common failure modes

1. **Collage of mismatched photos.** Cutouts from five shoots, lit from three sides, read as clip art. **Fix:** pick cutouts from one shoot or re-grade; reject any lit from the right; re-apply the single shadow stack.
2. **Giant strawberry.** Every item scaled to fill its slot. **Fix:** one `k` per frame; small items become punnets, bunches or bags.
3. **Flyer overload.** Ten products and three price bursts. **Fix:** 3–7 products, one tag.
4. **Invented prices.** A tag says a price the screen doesn't. **Fix:** placeholders until export, then copy the value from the capture; no capture price, no tag.
5. **Products eat the app.** A front-row bottle covers the add-to-cart button. **Fix:** front items only at the bezel corners and the bottom 20% band; check occlusion ≤ 12%.
6. **Floating phone.** Phone hovers with ground above and below the shelf. **Fix:** stand it on the top face (y 2440) or bottom-bleed it.
7. **Halo edges.** White fringes from a background-removal pass glow on yellow. **Fix:** defringe 1–2px, or recut from the source.
8. **Generated filler.** A missing product "made" with an image model. **Fix:** never; drop to fewer products (minimum 3) or another style.
9. **Gradient creep.** A radial glow behind the phone to make it "pop". **Fix:** flat ground; contrast comes from the products.
10. **Black shadows on yellow.** Look pasted on. **Fix:** warm brown `rgba(92,58,0,…)` tint.
11. **Logo wall.** Six third-party brands facing the camera reads as an ad for them. **Fix:** ≤ 1 legible logo, the rest own-label or produce.

## How to apply this style

1. **Fonts:** load `Bricolage_Grotesque` (700/800) as `--font-display` and `Inter` (600/700/800) as `--font-text` with the snippet above.
2. **Theme:** add `product-cutout-shelf` to `THEMES` in `src/lib/constants.ts`: `bg #FFD23F`, `bgAlt #23103A`, `fg #1B1410`, `fgAlt #FFF3D1`, `accent #A3112A`, `accentAlt #0B5D33`, `muted #4A3A08`.
3. **Scene knobs:** backdrop `solid`, span off (on only for the slide 2→3 shelf in connected-canvas mode), decoration `none`, shadow 30, glow 0, tilt 0, headlineWeight 800, headlineScale 1.1, headlineCase `as-typed`, captionAlign `center` (slide 3 overrides to left).
4. **Shelf:** an image element (two-rect SVG, 1320×428) at y 2440, zIndex below products and the device. For the cross-screen moment, one 2640px-wide shelf SVG in connected-canvas mode.
5. **Cutouts:** image elements (transparent PNG, already defringed) with x/y/width/height/rotation/zIndex. Bake the shared drop shadow into the PNG in the cutout pipeline, or add it with the editor's shadow if it applies per element; the contact ellipse is a separate blurred-ellipse SVG image element under each standing product. Behind-phone burst items need zIndex below the device; if the editor can't layer an element behind the device, keep burst items on the flanks without overlapping it.
6. **Device:** per-slide transform: width 960–1000 on 1320, rotation 0, positioned per recipe so the bottom sits at y 2440 or bleeds.
7. **Tag:** an SVG image element for the tag shape plus a text element for `[PRICE]` / `[UNIT]` (Inter 800 tabular), grouped by position. Fill from the capture at export.
8. **Headline:** the caption with the emphasis phrase coloured `--accent` (free text element if the caption can't colour a span).
9. **Measure:** headline ≤ 1160px; product count 3–7; heights vs `k`; phone visible ≥ 1956px; occlusion ≤ 12%; tag value equals the capture.
10. **Audit:** run the checklist above plus `_QUALITY_BAR.md` §10–11, and the 300px thumbnail test on the first three frames.

## What this style is NOT

- Not generated product imagery, 3D renders of products, or illustrated groceries: real catalogue photos only.
- Not a supermarket flyer: no starbursts, no "SALE" stamps, no ten prices, no red-and-yellow shouting.
- Not Candy Pop Social (11): no stickers, emoji or confetti; the products are the colour.
- Not Toybox or Clay (16, 12): no rendered props or plasticine.
- Not a gradient hero: one flat ground, one flat shelf.
- Not tilted: the phone is upright; only burst cutouts rotate.
- Not a brand-ad for suppliers: one legible third-party logo at most, and only for stocked, permitted items.
- Not a product-only slide: every frame shows the app in use.
