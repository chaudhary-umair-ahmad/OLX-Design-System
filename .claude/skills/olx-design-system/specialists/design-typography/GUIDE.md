# Typography

**Geomanist only**, licensed by OLX and bundled in `fonts/`, in two weights:

| Weight | Token | Use |
| --- | --- | --- |
| Regular 400 | `--olx-font-weight-regular` | body, meta, inputs |
| Medium 600 | `--olx-font-weight-semibold` | headings, prices, buttons, labels, tabs, `<strong>` |

**Never Geomanist Book (500), Bold or Thin, and never 500, 700+ or under 400.** There is no bold token, and `font-synthesis: none`
stops the browser faking one. QA blocks any other weight or face (`fnt.weight`, `fnt.family`, `fnt.render`).

## Scale (measured)

`--olx-font-size-xs` 12 · `sm` 14 · `md` 16 · `lg` 18 · `xl` 20 · `2xl` 24 · `3xl` 32 · `4xl` 40.
Line heights: `--olx-font-line-height-tight` 1.2 (headings, prices), `normal` 1.5 (body).

| Role | Desktop | Mobile |
| --- | --- | --- |
| Body | 14 / 400 | 14 / 400 |
| Category page h1 | 24 / 600 | 14 / 600 |
| Listing price | 600, larger than the title (`olx-price--md`, `--lg` on the ad page) | 600 |
| Listing title | 14–16 / 400 | 14 / 400 |
| Meta (location, time) | 12 / 400, muted | 12 / 400, muted |
| Buttons | 600 | 600 |

## Hierarchy on a listing

price → title → specs (year · km, beds · baths · area) → location · time. Price is the heaviest thing on the card.

## Truncation (user text is long)

Live titles look like `iPhone 13 Pro Max 256GB Non-PTA | 10/10 | 85% BH | Box + Cable` and
`3 Marla Brand New House For Sale In Al Kabir Town Phase 2 Main Raiwind Road Lahore`.

- Card titles: 1 line on grid cards, 2 lines on list rows (`-webkit-line-clamp`), then ellipsis.
- Location: one line with ellipsis; the time next to it never wraps (`white-space: nowrap`).
- Mark these elements `data-ugc` so QA injects 200 characters into them (`ovf.long`).
- Never truncate a price.

## Colour of text

`--olx-text` (#002f34) and `--olx-text-muted` (#406367) on white or `--olx-bg-subtle`. Links `--olx-link`
(#2456d6). Brand blue #3a77ff is about 4:1 on white, so it fails for body-size text; teal is never text on white.
