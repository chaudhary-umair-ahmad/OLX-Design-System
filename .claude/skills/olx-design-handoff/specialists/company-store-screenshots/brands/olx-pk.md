# OLX Pakistan

**Status: measured, for the website.** Values come from this repo (`css/tokens.css`, `tokens/tokens.json`), which is
measured from olx.com.pk. The apps are not measured, so anything *inside* a screenshot comes from the user's app
captures, never from the website captures (except as a draft that says so).

## Theme `olx-pk`

| Theme field | Hex | Token / source |
| --- | --- | --- |
| `bg` | `#FFFFFF` | `--olx-bg` |
| `bgAlt` (inverted slide) | `#002F34` | `--olx-color-petrol-900` (the brand petrol, also `--olx-text`) |
| `fg` | `#002F34` | `--olx-text` |
| `fgAlt` | `#FFFFFF` | `--olx-text-inverse` |
| `accent` (eyebrow label, one emphasis word) | `#2456D6` | `--olx-link`. The brand blue `#3a77ff` is about 4:1 on white, too low for a small label; use it only at headline size |
| `accentAlt` (label on petrol) | `#23E5DB` | `--olx-color-teal-500` (about 9:1 on petrol) |
| `muted` | `#406367` | `--olx-text-muted` |

`sceneTint` `#FFFFFF` and `accentAsDecoration: false`: no blue or teal glows, blobs or washes.

## Rules that bind here

- **The three-colour ring** (`--olx-gradient-sell-ring`: yellow `#ffce32`, teal `#23e5db`, blue `#3a77ff`) belongs to
  the Sell button. It may appear once, on the Sell slide, as that button. Never as a background or border.
- One accent word or label per slide. Petrol is the ink, white the surface.
- No colours outside the tokens. Category colours don't exist on OLX; a colour-coded style needs the brand team.
- Prices in OLX's format: `Rs 54,999`, `Rs 9.75 Lac`, `Rs 3.10 Crore` (see `design-copy`).
- Claims (downloads, ads posted, "Pakistan's no. 1") only with a source and a date.

## Type

**Geomanist**, licensed by OLX, in `fonts/`. Regular 400, Book 500 and Medium 600 only: headlines 600, eyebrow 500,
body 400. **Never Geomanist Bold or Thin, and never a faked bold** (`maxHeadlineWeight: 600` caps every style).
The deck is INTERNAL until marketing signs it off.

## Logo and icon

- Wordmark: `assets/icons/logo-olx.svg` (petrol), solid copies `handoff/brand/olx-logo-{petrol,white}.svg`. Never redraw it.
- Store icon: not in the repo. Ask for the 1024×1024 PNG; until then the feature graphic shows a dashed ICON placeholder.

## Styles that suit

Bento Keynote Grid, Panoramic Story Strip, Map-Led Local (cities: Karachi, Lahore, Islamabad), Swiss Grid Bold,
Oversized UI Crop, Trust Ledger (safety tips, verified sellers, only with sourced claims).
