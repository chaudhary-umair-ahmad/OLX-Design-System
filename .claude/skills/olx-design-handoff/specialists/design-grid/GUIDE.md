# Grid, spacing and layout

## Measured frame

| | Desktop | Mobile |
| --- | --- | --- |
| Design width | 1440 (QA also at 1280) | 390 (QA also at 360) |
| Container | `olx-container`: max 1280 px, centred, 16 px side padding | full width, 16 px gutters |
| Breakpoint | one, at 767 px (`@media (max-width: 767px)` in `components.css`) | |
| Home listings | 4 cards a row, 311 px wide, 12 px gap | horizontal carousels per section |
| Category / search results | list rows (`olx-listing--row`) with the filter sidebar on the left | list rows, filters in a sheet |
| Related ads (ad page) | carousel, 12 px gap | carousel |
| Ad page | gallery + details left, price / seller / contact card right | one column, contact bar fixed at the bottom |

Mobile isn't a narrow desktop: check the mobile capture of the same page before deciding.

## Spacing scale (tokens only)

`--olx-space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64.

- 12 px between cards, 16 px gutters and card padding, 24–32 px between sections.
- Anything off the scale is a proposal (`PROPOSALS.md`), not a quick fix.

## Utilities

`olx-grid` (auto-fill columns, min 215 px, 16 px gap), `olx-stack` (column, 16 px gap), `olx-cluster` (wrapping row,
12 px gap), `olx-divider`. For a fixed column count, define a local grid from tokens and set the count as a custom
property (`style="--fav-cols:4"`, as in `handoff/favourites/`). Nothing else goes inline (QA `tok.inline`).

## Rules

1. Density is a feature. If the new screen fits fewer listings above the fold than the live page it replaces, justify it.
2. Align to the container edges; nothing touches the viewport edge on mobile except carousels and full-bleed images.
3. A grid of cards must hold 1 to 40 items: draw the 1-item and many-item cases, and the empty state.
4. Text in a card never sets the card's height: truncate (see `design-typography`).
5. Sticky elements: the header on both; the contact bar on mobile ad pages. Don't add more.
6. Check 360 px: the narrowest common Android width. QA's `ovf.width` fails any sideways scroll.
