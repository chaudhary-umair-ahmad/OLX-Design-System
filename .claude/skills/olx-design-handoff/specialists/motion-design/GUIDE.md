# Motion

OLX's web motion is minimal and functional. There are three tokens, and they cover everything:

| Token | Value | Used on live / in `components.css` |
| --- | --- | --- |
| `--olx-motion-duration-fast` | 120 ms | button background, chevron rotation, hover colour |
| `--olx-motion-duration-base` | 200 ms | card shadow on hover, sheets and popovers |
| `--olx-motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | everything |

## Rules

1. Motion explains a change of place or state: a sheet comes from the bottom, a popover from its trigger, a removed card collapses. Nothing moves for decoration.
2. Under 200 ms for anything a person triggers; never over 300 ms (a new duration is a proposal).
3. Only `transform` and `opacity` (plus `box-shadow` / `background` for hover). Never animate width, height or top on big lists.
4. `prefers-reduced-motion`: `base.css` already sets durations to 0. Don't override it; the state must still be clear without the motion.
5. Carousels move on swipe or arrow click only. No auto-play.
6. Skeletons may shimmer once a second at most, or not at all.

## Hand-off

In the deliverable, write motion as: trigger → property → from → to → duration token → easing token. If a screen has
no motion beyond hover, exclude the section with that reason.
