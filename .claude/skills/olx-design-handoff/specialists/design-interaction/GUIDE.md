# Interaction and states

## Every control has these states

`default`, `hover` (desktop), `focus-visible` (2 px `--olx-focus` ring), `active`, `disabled`, and where it
loads, `loading`. Draw the ones that change the look. Disabled buttons still explain why (a hint nearby).

## Every screen has these states

| State | Draw it when | OLX pattern |
| --- | --- | --- |
| default | always | |
| empty | it shows a list (QA blocks without it) | title + one line + one button (`design-copy`) |
| loading | data loads | grey skeleton cards the shape of the real cards (`--olx-bg-subtle`); no spinners for whole pages |
| error | data can fail | message + `Try again`; keep what already loaded |
| signed-out | it needs an account | live sends people to `Login or Sign up` (modal on desktop, page on mobile) |
| removed / sold ad | it shows someone else's ad | say it's no longer available; offer similar ads |
| partial | a few results | don't stretch a single card to fill a row |

## Overlays

| Overlay | Desktop | Mobile | Captured |
| --- | --- | --- | --- |
| Menu / dropdown | anchored popover | full-screen sheet | `sort-menu`, `location-menu`, `account-menu` |
| Filters | sidebar | bottom sheet with sticky `Apply Filters` | `filters-sheet`, `price-sheet`, `brand-sheet` |
| Login | modal | page | `login` |

Every overlay closes with a visible close button, Escape and a tap outside (sheets). Focus moves into it and returns
to the trigger. In `flows.json`, give the step a `kind` (`sheet`, `modal`) and a `dismiss` transition.

## Actions

- **Favourite (heart):** toggles instantly (optimistic); signed-out visitors go to login first.
- **Contact:** `Chat` opens chat; `Call` and `Show phone number` reveal the number (signed-in on live). Track each (`analytics-tracking`).
- **Destructive** (delete ad, remove all favourites): a confirm dialog naming the thing, with the destructive button in `olx-btn--danger` and `Cancel`. Single removals (un-heart) use undo instead of a dialog.
- **Feedback:** a short toast for completed background actions (`Ad saved`). Never toast an error the person must act on: show it in place.

## Touch

Targets at least 24 × 24 px (QA floor); aim for 44 on mobile and 32 on desktop. Space adjacent targets 8 px apart.
