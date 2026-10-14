---
name: trust-ledger
description: Institutional calm for money and big-ticket decisions. Paper-white ground, one brand colour, a sober serif headline whose key phrase carries an accountant's double rule, an upright phone, and ledger furniture built from hairline-ruled fact rows, a sourced "with us / typical" comparison frame and a permission-only proof row. A persistent footnote and regulator band closes every frame. Figures are tabular lining numerals. No gradients, no glow, no celebration.
inspiration: Wise-style fee-transparency comparisons and transfer quotes, private-banking statements, insurance policy schedules, annual-report financial tables, mortgage illustration sheets
feel: sober, exact, accountable, "nothing here is hidden, and every number has a source"
---

# Trust Ledger

> **READ FIRST:** [`./_QUALITY_BAR.md`](./_QUALITY_BAR.md). The universal quality rules apply to this style. Then read the category playbook (`../categories/fintech.md`, `real-estate.md` or `saas.md`): its compliance list is part of this spec.

## Hard quality rules (this style)

- **Ground = flat `#FBFAF7`.** One hex, no gradient, grain, vignette, texture, blur or glow anywhere on the slide. Editor: backdrop `solid`, decoration `none`, glow `0`. A single gradient pixel = fail.
- **One brand colour, at most two brand-coloured elements per slide.** The brand hue (`--brand`, default `#1D4F91`) may appear only as (a) the headline's emphasis phrase and its double rule, and (b) on comparison slides, the "with us" column header and its pale tint fill. Everything else is ink, ink-2, hairline or paper. A second hue (green for "good", red for "bad", gold for "premium") = fail.
- **Upright phone, always.** Default template bezel, 0° tilt, horizontally centred (W 1100px, left 110px on 1320). Visible height **≥ 1956px (68.2%)**, measured from the phone's top edge to the top of the footnote band, which crops it. Smaller phone or any tilt = fail.
- **Footnote band on every frame.** A flat band at **y 2688–2868 (180px)**, fill `--band #EFEDE7`, 2px ink rule along its top edge, sitting above the phone in z-order. It carries the regulator or licence line from legal and the numbered sources for every figure on the slide. Until legal supplies the line, it reads `[REGULATOR / LICENCE LINE — from legal]`. Same position and height on every frame of the deck, including the closer. A frame without the band = fail.
- **Every figure is real or a placeholder.** Each number on the slide either (a) appears in the phone capture on the same slide (sample data, flagged "Sample data shown." in the band), or (b) has a footnote marker (¹ ²) whose named, dated source is in the band. Anything else is written as a bracketed placeholder `[FEE — source needed]`. An invented fee, rate, saving, rating, user count, award or press quote = fail, even in a draft.
- **Comparison frame only when fully sourced.** The "with us / typical" frame renders figures only when **every** cell has a named source (provider or survey, method, date) the team holds on file. If even one cell lacks a source, all figure cells stay as placeholders and the band carries `Comparison withheld until every figure has a named, dated source.` No partial comparisons, no "up to", no cherry-picked competitor.
- **Proof row only with permission and current data.** Rating, press mention and licence number appear only when (a) the rating is the store's current figure with its month, (b) written permission for the outlet name is on file, (c) the licence number comes from legal. Otherwise each cell is a placeholder and the row must be filled or removed before export. Laurels, stars-as-decoration, "as seen in" logo walls = fail.
- **Tabular lining figures everywhere.** Every numeral (headline, fact values, comparison cells, proof row, band) uses `font-variant-numeric: tabular-nums lining-nums`. Values right-align on x = 1248 so decimals stack. Old-style or proportional figures in a column = fail.
- **One ledger element per frame.** A slide carries exactly one of: fact rows (1–2), the comparison frame, the line-item callout, or the proof row. That element is the frame's single annotation. Two of them on one slide = fail.
- **Headline:** Source Serif 4 600, **116–128px**, line-height 1.04, tracking −0.015em, flush-left at x = 72, max 2 lines, ≤ 5 words, measured width ≤ 1176px (89%). Ink `#15181C` = 17.1:1 on the ground. Readable at 300px wide (≥ 26px rendered).
- **No celebration.** No confetti, sparkles, emoji, exclamation marks, "congrats" screens, upward arrows, money-rain, coin stacks or trophy imagery. If a capture shows a success screen, crop or choose another capture.

## Vibe summary

It looks like the first page of a well-made statement or a policy schedule that someone actually wanted you to understand. The sheet is paper white. A thin header line names the app and the section, ruled off in ink like the top of a ledger. Below it, a calm serif headline says one outcome in under five words, and the phrase that matters is set in the brand colour with an accountant's double rule under it, the way a total is underlined. Then come one or two ruled fact rows, label left, figure right, digits stacked in columns. The phone stands upright and large beneath, and is cut cleanly by the footnote band, a pale strip at the bottom of every frame carrying the regulator line and the source of every number. On the comparison frame two columns sit side by side, "with us" lightly tinted, "typical" in plain ink, and every figure has a superscript that leads to a named source. Nothing moves, glows or cheers. Trust comes from what is disclosed, not from decoration.

## Global palette

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--paper` | `#FBFAF7` | Slide ground (flat) | — |
| `--ink` | `#15181C` | Headline, fact values, index rule, band top rule | 17.06:1 on paper · 15.21 on band · 14.99 on tint |
| `--ink-2` | `#4A5058` | Fact labels, index row, comparison "typical" header, proof captions | 7.80:1 on paper · 6.85 on tint |
| `--brand` | `#1D4F91` | Emphasis phrase + double rule; "with us" header | 7.80:1 on paper · 6.95 on band · 6.85 on tint |
| `--brand-tint` | `#E6ECF5` | Fill of the "with us" column only | ink 14.99 · ink-2 6.85 |
| `--band` | `#EFEDE7` | Footnote / regulator band fill | — |
| `--band-ink` | `#2B3036` | All band text (small text, needs 7:1) | 11.36:1 on band |
| `--hairline` | `rgba(21,24,28,0.18)` | 2px row dividers in fact rows, comparison and proof row | non-text |
| `--rule` | `#15181C` | 2px index rule, band top rule, comparison header rule | non-text |
| `--card` | `#FFFFFF` | Line-item callout card fill only | ink 17.81 |

**Verified contrast pairs (use only these):**

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| `#15181C` ink | `#FBFAF7` paper | 17.06:1 | everything |
| `#4A5058` ink-2 | `#FBFAF7` paper | 7.80:1 | labels and captions at any size, incl. < 30px |
| `#1D4F91` brand | `#FBFAF7` paper | 7.80:1 | headline emphasis, figures |
| `#1D4F91` brand | `#E6ECF5` tint | 6.85:1 | "with us" header ≥ 30px |
| `#15181C` ink | `#E6ECF5` tint | 14.99:1 | "with us" cell values |
| `#2B3036` band-ink | `#EFEDE7` band | 11.36:1 | band text 22–26px |
| `#4A5058` ink-2 | `#EFEDE7` band | 6.95:1 | **never** in the band (below 7:1 for small text) |
| `#FFFFFF` | `#1D4F91` brand | 8.14:1 | not used: this style has no filled brand blocks |

**Brand swap (Brand + style mode):** brand `bg` → `--paper` only if it is a light neutral (relative luminance ≥ 0.85); otherwise keep `#FBFAF7` and use the brand only as accent. Brand `fg` → `--ink` (must be ≥ 7:1 on the ground). Brand `accent` → `--brand` only if it clears **4.5:1 on the ground as text** (7:1 if it will appear under 30px) and 4.5:1 on its own 10% tint; if it fails, darken it within the same hue until it passes, and if the brand forbids that, set the emphasis phrase in ink and use the brand only for the double rule (a non-text element, ≥ 3:1). Brand `bgAlt` → `--band` only when it is a light neutral; if the brand's bgAlt is dark, the band is a 6% ink mix over the ground (≈ `#EFEDE7` on white). `--brand-tint` = 10% brand over the ground. Brand `muted` → `--ink-2` only if ≥ 7:1 on the ground. Pairs that must pass after the swap: ink/ground ≥ 7, ink-2/ground ≥ 7, accent/ground ≥ 4.5, accent/tint ≥ 4.5, band-ink/band ≥ 7. Never add a second brand colour, even if the palette has one; `accentAsDecoration: false` is the natural setting here.

## Typography

**Google Fonts (Full style, OFL):**
```html
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=IBM+Plex+Sans:wght@400;500;600&display=block" rel="stylesheet">
```
```ts
// src/app/layout.tsx
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
const display = Source_Serif_4({ subsets: ["latin"], weight: ["600"], variable: "--font-display", display: "block" });
const text = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-text", display: "block" });
// <body className={`${display.variable} ${text.variable}`}>
```
**Grotesk variant (SaaS / B2B, or brands that never use serifs):** headline in IBM Plex Sans 600 at the same sizes with tracking −0.025em; everything else unchanged. One variant per deck, never both.

**Figures:** every numeral carries
```css
.num{font-variant-numeric:tabular-nums lining-nums;font-feature-settings:"tnum" 1,"lnum" 1}
```
Verify in the build: the rendered widths of `111.11` and `000.00` must be equal. If they are not, the face is not delivering tabular figures; switch the figure face to Inter (which ships `tnum`) for values only, and note it in the hand-off.

**Commercial alternates:** headline Tiempos Headline / GT Sectra / Publico Text; text Söhne / Untitled Sans / Graphik. Same weights and sizes.

| Role | Face | Size @1320 | Leading | Tracking | Colour |
|---|---|---|---|---|---|
| Headline | Source Serif 4 600 | 116–128px | 1.04 | −0.015em | ink + brand emphasis |
| Index row | IBM Plex Sans 500 | 28px | 1.0 | 0 | ink-2 (app name in ink) |
| Fact label | IBM Plex Sans 500 | 38px | 1.1 | −0.005em | ink-2 |
| Fact value | IBM Plex Sans 600 `.num` | 42px | 1.1 | 0 | ink, right-aligned |
| Comparison header | IBM Plex Sans 600 | 32px | 1.1 | 0 | brand (with us) / ink-2 (typical) |
| Comparison cell | IBM Plex Sans 600 `.num` | 40px | 1.1 | 0 | ink |
| Proof value | IBM Plex Sans 600 `.num` | 56px | 1.0 | −0.01em | ink |
| Proof caption | IBM Plex Sans 500 | 26px | 1.25 | 0 | ink-2 |
| Callout caption | IBM Plex Sans 500 | 30px | 1.2 | 0 | ink-2 |
| Band text | IBM Plex Sans 400 | 24px (22 min) | 1.3 | 0 | band-ink |
| Footnote marker | IBM Plex Sans 600 | 0.6em, raised 0.45em | — | 0 | same as its figure |

Rules: sentence case everywhere, no ALL CAPS, no italics, no letter-spaced labels, no mono. Currency codes follow the app's own format (`1,000.00 GBP` or `£1,000.00`, never both on one deck). Every value on a slide uses the same number of decimals as the capture.

## Headline emphasis (signature)

One phrase per headline (1–3 words: the figure or the outcome) is set in `--brand` and underlined with an **accountant's double rule**: two 2px brand lines, 6px apart, the upper one 14px below the baseline, running the exact measured width of the phrase. Same face, weight and size as the rest of the headline. It is the "total" line of the slide.

```css
.em{color:var(--brand);position:relative;white-space:nowrap}
.em::after{content:"";position:absolute;left:0;right:0;bottom:-.17em;height:10px;
  border-top:2px solid var(--brand);border-bottom:2px solid var(--brand)}
```
- In the editor the built-in caption has no double underline: draw it as one SVG image element (two 2px lines, 6px gap, width = measured phrase width, colour = brand) placed under the phrase. Re-measure after every copy or locale change.
- Emphasise the outcome or the figure ("shown first.", "side by side.", "one tap."), never the app name, never a verb alone.
- The double rule never runs under two lines; if the phrase wraps, shorten it or emphasise only the last line's phrase.
- No highlight blocks, no gradient text, no italic, no colour on any other word.

## Layout grid & safe zones

12-column grid, **72px outer margins**, 24px gutters, 76px columns (100px pitch). Column *n* starts at `72 + (n−1)·100`. The grid is never drawn; it shows only through alignment (headline, rules and labels on x = 72; values right on x = 1248).

| Zone | Rect (x, y, w, h) | Rule |
|---|---|---|
| Top margin | 0, 0, 1320, 96 | Empty ground |
| Index row | 72, 96, 1176, 60 | App name left, section label right (28px), 2px ink rule at y = 156 |
| Headline | 72, 212, 1176, ≤ 260 | Text only; ≥ 56px clear of the index rule |
| Ledger element | 72, headline-bottom + 30, 1176, ≤ 330 | One element (fact rows / comparison / proof row) |
| Phone | 110, 700–732, 1100, → 2688 | Upright, centred, cropped by the band |
| Footnote band | 0, 2688, 1320, 180 | Full width, text inside x 72–1248, 36px top / 32px bottom padding |
| Side margins | 0–72, 1248–1320 | No text ever; only the phone's bezel and the band fill may pass |

**Phone clip formula** (template bezel, aspect 1022:2082): phone height `H = 2.0372·W`, screen top `= phoneTop + 0.0450·W`, screen height `= 1.9472·W`. Clip fraction `= (2688 − screenTop) / (1.9472·W)`. At W 1100 and phoneTop 708 the clip falls at **0.901** of the screenshot, which on most captures is just above the tab bar: the tab bar is hidden whole. Measure the capture's row bands first and move phoneTop in 4px steps (700–732) so the cut lands in a gap; never inside a row, a button or half a tab bar.

### Reusable layout recipes

**L1 · Statement** (hero, core action, security). 2-line headline, 1–2 fact rows, phone.
```
index row    y 96–156     rule 2px ink at 156
headline     y 212–470    124px, 2 lines, flush-left
fact rows    y 500–668    2 rows × 84 (2px hairlines at 500, 584, 668); 1 row → 500–584
phone        W 1100, left 110, top 708 → visible 1980 = 69.0%, clip 0.901
band         y 2688–2868
```

**L2 · Comparison** (payoff, fees). 1-line headline, the comparison frame, phone.
```
index row    y 96–156
headline     y 212–342    124px, 1 line
frame        y 372–700    header 88 + 3 rows × 80; columns: label x 72–520 · with us x 520–884 (tint) · typical x 884–1248
phone        W 1100, left 110, top 728 → visible 1960 = 68.3%, clip 0.892
band         y 2688–2868  (sources ¹ ² ³ or the "withheld" note)
```

**L3 · Proof close** (closer). 2-line headline, the proof row, phone.
```
index row    y 96–156
headline     y 212–470
proof row    y 500–660    3 cells × 392 wide (x 72 / 464 / 856), 2px hairline dividers at x 464 and 856, hairline top + bottom
phone        W 1100, left 110, top 700 → visible 1988 = 69.3%
band         y 2688–2868
```

**L4 · Line item** (control, statements, detail). 2-line headline, phone, one callout card.
```
index row    y 96–156
headline     y 212–470
phone        W 1100, left 110, top 520 → visible 2168 = 75.6%
callout      card x 72, y 1640, w 760, h 236: white, 2px ink border, radius 12, holding a REAL crop of one row from
             the same capture at 1.15–1.3×, plus a 30px ink-2 caption under the crop inside the card. A 2px ink leader
             line (≤ 120px) joins the card edge to that row on the phone. The card may overlap the phone's left bezel,
             never the row it points at.
band         y 2688–2868
```

## Phone / device frame treatment

- Always the template's default bezel (`public/mockup.png` via the `Phone` component). Never a bezelless rectangle, clay device, angled perspective or custom frame (Quality Bar §7).
- Upright 0°, centred, W 1100 (1060–1120 allowed if a crop gap needs it), cropped only by the band. No side or top bleed: calm, not cropped for drama.
- Shadow, tinted with ink, short and quiet:
```css
.phone{filter:drop-shadow(0 2px 3px rgba(21,24,28,.14)) drop-shadow(0 24px 40px rgba(21,24,28,.10))}
```
  Editor: shadow `20`, glow `0`. No coloured or brand-tinted shadow.
- Captures: sample accounts only. Card numbers masked (`•••• 4242`), no real names, IBANs or balances. Pick a capture that shows the number the headline talks about.
- **Google Play.** Play's phone canvas is 1080×1920 and Play discourages device frames and heavy text. Default: keep the bezel so App Store and Play sets match, re-laid out for the shorter canvas (index rule y 104, headline 92px at y 140, **one** fact row 356–424, phone W 742 left 169 top 456, band y 1790–1920 at 130px; visible 1334 = 69.5%). Play-native variant, only when the team chooses it and records it in the hand-off as the one exception to Quality Bar §7: drop the bezel and run the capture as a full-bleed screen panel (x 64–1016, 2px ink hairline border, radius 36), keep the band, keep the headline to one line. The band and the source rules apply on Play exactly as on iOS. Feature graphic (1024×500): headline + app icon on paper, no phone, no figures.

## Background treatment

`background:#FBFAF7`. Nothing else. No gradient, grain, paper texture, ruled backdrop, vignette or watermark. Editor backdrop `solid` (do **not** use `lines`: the ruled backdrop puts rules where there are no facts, which is decoration pretending to be ledger). All ledger rules are drawn as elements at the exact y values above. In connected-canvas mode `span` stays off; each frame is the same flat paper.

## Decorative accents

Floating decorations: **0** (a minimal style, Quality Bar §9). The ledger furniture is content, not decoration, and every piece must carry a real fact or a marked placeholder:

1. **Index row:** app name (ink, 28px, 500) left at x = 72, section label (ink-2) right-aligned to 1248, 2px ink rule at y = 156. Text elements + one SVG rule.
2. **Fact rows (1–2):** label left in ink-2 38px, value right in ink 42px tabular, 2px hairlines above, between and below, 84px row height, text vertically centred. The value must be visible in the phone capture on the same slide or carry a footnote marker.
```html
<div class="row" style="position:absolute;left:72px;top:500px;width:1176px;height:84px;border-top:2px solid rgba(21,24,28,.18);display:flex;align-items:center;justify-content:space-between">
  <span class="label">Transfer fee</span><span class="value num">4.12 GBP</span></div>
```
3. **Comparison frame:** 2px ink rule under the header row; header "With [App]" in brand on the tint column, "Typical [provider type]¹" in ink-2; rows 80px with hairline dividers; the "with us" column has the `--brand-tint` fill full height of the frame, square corners. Labels name what is compared ("Fee on 1,000 GBP", "Rate margin", "They receive"). Max 3 rows. Placeholder cells read `[—]` in ink-2.
4. **Proof row:** three cells, each a 56px tabular value over a 26px caption: `[RATING] / App Store, [MONTH YEAR]` · `[OUTLET] / Permission on file` · `[LICENCE NO.] / [REGULATOR], from legal`. No star glyphs, no logos unless the licensor's guidelines are on file.
5. **Line-item callout:** a white card with a real crop, a caption and one leader line (L4 only).
6. **Footnote band:** line 1 the regulator/licence line; line 2–3 the numbered sources (`¹ [SOURCE], [METHOD], [DATE].`) and `Sample data shown.` Max 3 lines at 24px; if it needs more, cut figures from the slide, never shrink below 22px.

Editor build: index row, fact rows, comparison, proof row, callout caption and band text are **text elements**; rules, hairlines, the tint column, the band fill and the double rule are **SVG image elements** (flat fills, 2px strokes); the callout crop is a **PNG image element** cut from the same capture. zIndex: ground → phone → band fill → band text; the callout card sits above the phone.

Polish (§3): no illustration in this style, so the gates are met by the real capture, the two-shadow phone stack and exact rules. Never draw icons, coins, shields, padlocks or charts to "signal" trust.

## Cross-screen moment

- **Default: none.** Regulated decks fall under the Quality Bar's legal exemption: every frame must stand alone, with its own band and its own sources.
- **Allowed (max one, 5+ slides):** in connected-canvas mode the 2px index rule at y = 156 may run as one continuous line across all frames. Because it sits at the same y on every frame, each crop still reads as complete. Nothing else crosses: never a fact row, a comparison cell, the band text, a figure, the phone or the headline.

## Copy tone

- **Voice:** a careful adviser. Plain, specific, outcome-led, present tense. Says what the user can see or check. Under ~5 words per headline; one sentence, a period at the end.
- **Vocabulary:** see, shown, upfront, before you pay, line by line, side by side, on record, in writing, statement, fee, rate, total, schedule, due, arrives, held, licensed (only with legal's line).
- **Numbers:** digits always, tabular, same format as the app. Every figure from the capture or a named source; otherwise `[PLACEHOLDER]`. Delivery times carry a qualifier footnote ("Typical for [corridor], [DATE].").
- **Banned words:** guaranteed, risk-free, safe (as a promise), best rate, cheapest, lowest, no hidden fees, zero fees, free (unless legal approves the conditions in the band), instant, instant approval, earn X%, returns, save up to, unlock, seamless, revolutionary, trusted by millions, #1, award-winning, congratulations, exclamation marks, emoji, question marks.
- **Fintech:** no promised returns or yields; any rate or instalment claim needs legal's representative example in the band. **Real estate:** no projected appreciation or rental yield; mortgage figures are "illustrative" with the assumptions in the band. **SaaS:** no "X% faster" without a named study.
- **Example headlines (12):**
  - Fintech: "Every fee, **shown first.**" · "The rate, **side by side.**" · "Freeze your card. **One tap.**" · "Statements you can **read.**" · "Bills due, **on one page.**"
  - Real estate (investment / mortgage): "Your repayment, **line by line.**" · "Every cost, **before you offer.**" · "The schedule, **in writing.**"
  - Insurance: "What's covered, **in plain words.**"
  - SaaS / B2B: "Every invoice, **reconciled.**" · "Spend, **by department.**" · "Approvals, **on record.**"

## Per-slide breakdown (mandatory)

Sample app: **Halden**, a fictional money-transfer and multi-currency account app. All figures below are sample values that must match the sample capture on the same slide; every bracketed item is a placeholder the team fills.

### Slide 1 · Hero / problem (L1 Statement)
- **Index row:** "Halden" · "Transfers".
- **Headline:** 124px, 2 lines: "Every fee, / **shown first.**" (double rule under "shown first.").
- **Fact rows (2):** "Transfer fee | 4.12 GBP" · "They receive | 1,163.40 EUR". Both values appear on the capture's quote screen.
- **Phone:** `quote` screen (amount entry with fee breakdown), W 1100, top 708, clip 0.901 just above the tab bar. Visible 1980 = **69.0%**.
- **Band:** "[REGULATOR / LICENCE LINE — from legal]" / "Sample data shown. Fees vary by currency and amount."
- **Must be true:** at 300px wide the headline and the emphasis phrase read; the two fact values equal the phone's values to the decimal.

### Slide 2 · Core action (L1 Statement, 1 row)
- **Index row:** "Halden" · "Send".
- **Headline:** 2 lines: "Send money / **in three steps.**" Only if the flow on the capture really has three steps; otherwise "Send money, **checked twice.**" with the review screen.
- **Fact row (1):** "Arrives | [ETA from the quote]¹" at y 500–584; phone moves up to top 624 (visible 2064 = 72.0%).
- **Phone:** `review` screen (recipient, amount, fee, arrival estimate). Crop in the gap below the confirm button or hide the button whole.
- **Band:** legal line / "¹ Typical arrival for [CORRIDOR], [SOURCE], [DATE]. Sample data shown."
- **Must be true:** the ETA wording matches the app's own wording; no "instant".

### Slide 3 · Payoff (L2 Comparison)
- **Index row:** "Halden" · "Fees".
- **Headline:** 1 line, 124px: "The cost, **side by side.**"
- **Frame (y 372–700):** header "With Halden" (brand on tint) · "Typical bank¹" (ink-2). Rows: "Fee on 1,000 GBP | 4.12 GBP | [—]" · "Rate margin | [—] | [—]" · "They receive | 1,163.40 EUR | [—]". Default render is the **withheld state**: the "typical" column and any unsourced "with us" cell stay `[—]`.
- **Phone:** the same `quote` screen at a different amount, or the fee-detail sheet, top 728. Visible 1960 = **68.3%**.
- **Band:** legal line / "Comparison withheld until every figure has a named, dated source. ¹ [PROVIDER TYPE, METHOD, DATE]."
- **Must be true:** figures fill in only when every cell is sourced; when filled, each "typical" figure carries a marker and the band names the source. Never a named competitor without legal sign-off.

### Slide 4 · Control (L4 Line item)
- **Index row:** "Halden" · "Statements".
- **Headline:** 2 lines: "Statements / **you can read.**"
- **Phone:** `statement` screen, W 1100, top 520 (visible 2168 = 75.6%).
- **Callout:** card x 72, y 1640, 760×236, a 1.2× crop of one real statement line ("Transfer to [NAME] · −250.00 GBP · fee 1.03 GBP") with caption "Fee shown on every line." Leader line 2px ink to that row.
- **Band:** legal line / "Sample data shown."
- **Must be true:** the crop is pixel-identical to the row on the phone (same capture, scaled), not retyped; names are sample.

### Slide 5 · Security (L1 Statement)
- **Index row:** "Halden" · "Security".
- **Headline:** 2 lines: "Freeze your card. / **One tap.**"
- **Fact rows (2):** "Card •••• 4242 | Frozen" · "Sign-in | Face ID". Both visible on the `card-settings` capture.
- **Phone:** `card-settings` screen with the freeze toggle on, top 708, clip in the gap under the settings list.
- **Band:** legal line / "Sample data shown."
- **Must be true:** no padlock or shield art; the security story is told by the real toggle.

### Slide 6 · Closer (L3 Proof close)
- **Index row:** "Halden" · "About".
- **Headline:** 2 lines: "Your money, / **on record.**"
- **Proof row:** `[RATING]` "App Store, [MONTH YEAR]" · `[OUTLET]` "Permission on file" · `[LICENCE NO.]` "[REGULATOR], from legal". Ship only the cells that are filled and approved; if fewer than 2 remain, replace the proof row with two fact rows from the capture.
- **Phone:** `home` screen (balances in sample currencies), top 700. Visible 1988 = **69.3%**.
- **Band:** the full regulator/licence line from legal (this frame may use all 3 lines for it).
- **Must be true:** no laurels, no stars as decoration, no "trusted by" counts; every proof value is current and approved.

### Reference measurements (Halden layout targets)

| Slide | Layout | Phone W / visible H | Visible % | Headline max width | Worst text contrast |
|---|---|---|---|---|---|
| 1 Hero | L1 | 1100 / 1980px | 69.0% | ≈ 760px (58%) | band-ink 11.36:1, emphasis 7.80:1 |
| 3 Comparison | L2 | 1100 / 1960px | 68.3% | ≈ 1150px (87%) | brand on tint 6.85:1 |
| 4 Line item | L4 | 1100 / 2168px | 75.6% | ≈ 820px (62%) | ink-2 7.80:1 |
| 6 Closer | L3 | 1100 / 1988px | 69.3% | ≈ 740px (56%) | ink-2 7.80:1 |

Widths are estimates for Source Serif 4 600 at 124px; measure the real render and shrink in 4px steps (to 116px) if a line exceeds 1176px.

## Adapting to other app categories

| Category | `--brand` (≥ 7:1 on paper) | Ledger element ideas | Band content | Copy angle |
|---|---|---|---|---|
| Fintech (transfers, wallets) | `#1D4F91` (7.80) | fee + received rows; sourced fee comparison | licence line, representative example, sources | fees shown, arrival times |
| Fintech (lending, BNPL) | `#1F5C4A` (7.48) | instalment schedule rows (due date, amount) | representative APR example from legal | the schedule, in writing |
| Insurance | `#2E4A7D` (8.41) | cover / excess rows; what's covered vs not | regulator line, policy wording link | plain-words cover |
| Real estate (investment, mortgage) | `#5B3A29` (9.66) | monthly repayment, term, deposit rows (illustrative) | "Illustrative. Assumptions: [RATE], [TERM]." + licence | every cost before you offer |
| SaaS / B2B (finance ops, billing) | `#1E4E6E` (8.49) | invoice status rows; approvals on record | data-processing / certification line, only if held | reconciled, on record |
| Rentals (long-let, deposits) | `#3D4F2E` (8.54) | rent, deposit, notice period rows | deposit-protection line where required | terms in writing |

Measure each `--brand` on the ground before use (`#1F5C4A`, `#2E4A7D`, `#5B3A29`, `#1E4E6E`, `#3D4F2E` are all deep enough to clear 7:1 on `#FBFAF7`; verify after any tweak). Keep the ground, type, rules, band and the one-ledger-element rule; swap only the brand hex, the ledger content and the band wording.

## Dark / inverted & localization notes

- **No inversion by default.** Paper is the point. For a brand whose identity is dark-only, a full-dark deck (never alternating) is allowed: ground `#14181D`, ink `#F3F2EE` (15.91:1), ink-2 `#B4BAC2` (9.12:1), brand lifted to `#8FB3EA` (8.32:1), with-us tint `#1E2A3D` (brand-lift 6.74:1, ink 12.89:1), band `#1E232A` with band-ink `#C9CDD2` (9.89:1), hairlines `rgba(243,242,238,.18)`, band rule `#F3F2EE`, phone shadow `rgba(0,0,0,.45)`. Same layouts, same rules.
- **Long German / French lines:** shrink the headline in 4px steps to 116px; then shorten. Fact labels may wrap to 2 lines only if the row grows to 120px and the phone still clears 68.2%; otherwise drop to 1 fact row. Band text never below 22px.
- **CJK:** headline Noto Serif JP/SC/KR 600 (grotesk variant: Noto Sans), tracking 0, line-height 1.15, size −6%. Figures stay in IBM Plex Sans `.num`.
- **RTL (Arabic / Hebrew):** mirror the grid: index app name right, labels right, values left-aligned on x = 72, the "with us" column on the right of the label column order (label · with us · typical, read right to left), callout card on the right. Headline in Noto Naskh Arabic 600 (serif variant) or IBM Plex Sans Arabic 600 (grotesk), tracking 0, line-height 1.3. The double rule sits under the emphasis phrase as measured in the RTL render. Values and currency stay LTR-isolated (`direction:ltr;unicode-bidi:isolate`). Use the digit system the app's capture uses (Western or Arabic-Indic), never a mix on one deck. The band text comes from legal in the target language; never machine-translate a regulator line.

## Style-specific QA checklist

- [ ] Ground is one flat hex (`#FBFAF7` or the brand's light neutral); backdrop `solid`, decoration `none`, glow 0.
- [ ] Brand hue appears in ≤ 2 elements per slide (emphasis + double rule; on comparison slides also the with-us header + tint) and nowhere else.
- [ ] Headline Source Serif 4 600 (or the deck's grotesk variant), 116–128px, ≤ 2 lines, ≤ 5 words, width ≤ 1176px, readable at 300px wide.
- [ ] Double rule = two 2px brand lines, 6px apart, exactly the phrase width, one line of text only.
- [ ] Exactly one ledger element on the slide (fact rows / comparison / callout / proof row).
- [ ] Every figure is (a) visible in the same slide's capture, (b) footnoted to a named, dated source in the band, or (c) a bracketed placeholder. Zero invented numbers.
- [ ] Comparison frame: all cells sourced, or all figure cells `[—]` plus the "withheld" note.
- [ ] Proof row: rating current with month, press permission on file, licence from legal; otherwise placeholder or removed before export.
- [ ] Every numeral is tabular lining (`111.11` and `000.00` measure equal); values right-aligned on x = 1248 (x = 72 in RTL).
- [ ] Footnote band present at y 2688–2868 on every frame, band-ink on band ≥ 7:1, the legal line or its placeholder on line 1.
- [ ] Phone: default bezel, 0°, centred, visible ≥ 1956px, cut by the band in a UI gap (tab bar whole or hidden whole).
- [ ] No celebration imagery, no trust clip-art (shields, padlocks, coins), no stars, laurels or logo walls.
- [ ] No banned word; no promised return, yield, appreciation or "instant".
- [ ] Captures use sample accounts; card numbers masked; no real names or balances.
- [ ] Thumbnail test (Quality Bar §11) at 220px and the 300px headline test both pass.

## Common failure modes

1. **Invented comparison.** A "typical bank" column filled with plausible numbers to make the slide look finished. **Fix:** withheld state with `[—]` and the note until every figure is sourced on file.
2. **Partial sourcing.** Two figures sourced, one guessed. **Fix:** the rule is all or nothing; withhold the whole frame.
3. **Proof by decoration.** Five gold stars, laurels, "As seen in" logos, "Trusted by 2M". **Fix:** proof row with approved, current values only, or no proof row.
4. **Ledger as wallpaper.** Using the `lines` backdrop or extra empty rules to look "financial". **Fix:** rules exist only under real rows.
5. **Two ledger elements.** Fact rows plus a callout plus a proof row on one slide. **Fix:** one element; move the rest to other frames or drop them.
6. **Missing band on "clean" frames.** The closer or the hero ships without the band because it "looks nicer". **Fix:** band on every frame, same height, same y.
7. **Small band text in ink-2.** 6.95:1 on the band looks fine and fails small-text 7:1. **Fix:** band-ink `#2B3036`.
8. **Proportional figures.** Decimals that do not stack because the font fell back. **Fix:** `.num` class, run the width test, swap the figure face if needed.
9. **Numbers that disagree.** Fact row says 4.12, phone shows 3.98 (captures taken on different days). **Fix:** one capture per slide drives every figure on it.
10. **Fintech-hype drift.** Gradient cards, glowing balance, neon accent, confetti on a success screen: this becomes Midnight Glow Pro. **Fix:** flat paper, one sober hue, no success screens.
11. **Swiss drift.** Giant 180px grotesk, mono uppercase labels, hard phone bleed: this becomes Swiss Grid Bold. **Fix:** serif 116–128px, sentence-case labels, phone cropped only by the band.
12. **Shrinking the phone for more facts.** Three fact rows and a 900px phone. **Fix:** max 2 rows; phone ≥ 68.2% visible.

## How to apply this style

1. **Fonts:** load `Source_Serif_4` (600) as `--font-display` and `IBM_Plex_Sans` (400/500/600) as `--font-text` with the snippet above; add the `.num` class for figures.
2. **Theme:** add `trust-ledger` to `THEMES` in `src/lib/constants.ts`: `bg #FBFAF7`, `bgAlt #EFEDE7`, `fg #15181C`, `fgAlt #2B3036`, `accent #1D4F91`, `accentAlt #E6ECF5`, `muted #4A5058`.
3. **Scene:** backdrop `solid`, span off, decoration `none`, shadow 20, glow 0, tilt 0, headlineWeight 600, headlineScale 1 (≈ 121px at 1320), headlineCase `as-typed`, captionAlign `left`.
4. **Band first:** on every slide add the band fill (SVG, 1320×180 at y 2688), its 2px ink top rule, and the band text element with the legal placeholder. Lock these elements so they stay identical across frames.
5. **Index row:** two text elements and a 2px rule at y 156.
6. **Headline:** built-in caption at x 72, then the double-rule SVG under the measured emphasis phrase.
7. **Ledger element:** build one of L1 fact rows / L2 comparison / L3 proof row / L4 callout from text + SVG elements at the recipe's coordinates; fill figures only from the capture or sourced data, placeholders otherwise.
8. **Phone:** device transform per slide (W 1100, left 110, top per recipe, rotation 0), zIndex under the band; run the clip formula against the capture's row gaps.
9. **Play:** duplicate to the 1080×1920 layout above (one fact row), or the frameless Play-native variant if the team signs it off.
10. **Audit:** run the QA checklist, `_QUALITY_BAR.md` §10–11, the category compliance list, and send the deck to legal with every placeholder listed.

## What this style is NOT

- Not a fintech hype deck: no gradients, glowing cards, neon, dark glass, 3D coins or confetti (that is Midnight Glow Pro or Liquid Glass Aurora territory).
- Not Swiss Grid Bold: no visible grid, mono labels, giant headlines, signal blocks or hard bleeds.
- Not a bento: no rounded tiles, no huge stat numerals, no widget mosaics.
- Not a comparison ad: never a named competitor without sign-off, never a comparison without sources, never "cheapest".
- Not a testimonial or awards wall: no star rows, laurels, quotes or logo strips.
- Not illustrated: no shields, padlocks, piggy banks, handshake icons or trust badges drawn to imply safety.
- Not colourful: one brand hue, used twice at most per slide.
- Not a copy of any inspiration's brand: borrow the transparency structure (quote rows, sourced comparisons, schedules), never another company's colours, wording or layout chrome.
