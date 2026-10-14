# QA checks

Every check `qa/scripts/qa.mjs` runs, with its severity on an `authored` screen. On a `live` capture every
finding is capped at **note**. Run a subset with `--checks cov,tok,…` (by prefix).

## Static (read the HTML, no browser)

| Check | Severity | Fails when |
| --- | --- | --- |
| `cov.file` | blocker | the registered file doesn't exist |
| `cov.state` | blocker | a declared state has no `<section data-state="…">` |
| `cov.empty` | blocker | no empty state, and the screen isn't marked `"no_list": true` |
| `tok.inline` | blocker | a `style=""` holds anything but custom properties (`style="--fav-cols:4"` is fine) |
| `tok.hex` | blocker | a hex / rgb colour in a `<style>` block |
| `tok.resolve` | blocker | a `var(--x)` that neither `css/tokens.css` nor the screen defines |
| `tok.px` | warning | px literals in `<style>`; prefer `--olx-space-*`, `--olx-radius-*`, `--olx-font-size-*` |
| `tok.css` | warning | the screen doesn't link `css/olx.css` |
| `fnt.weight` | blocker | a `font-weight` other than 400, 500, 600 (or their tokens) |
| `fnt.family` | blocker | a `font-family` other than Geomanist / `var(--olx-font-family-sans)` |
| `cpy.placeholder` | blocker | lorem, ipsum, TODO, TBC, TBD, `xxx`, `John Doe`, `Jane Doe`, "product name", "placeholder" |
| `cpy.pii` | blocker | a Pakistani mobile number (`03XX…`, `+92 3XX…`) or an email address is visible; use `03XX-XXXXXXX` |
| `cpy.voice` | warning | marketing words OLX doesn't use: get started, discover, unlock, seamless, elevate, supercharge, revolutionise, effortless, empower, cutting-edge, game-changer |
| `cpy.price` | warning | `$`, `PKR 1…`, `Rs.`, `₨` or `Rs1…`: OLX writes `Rs 54,999`, `Rs 9.75 Lac`, `Rs 3.10 Crore` |
| `flw.missing` | warning | the feature has no `flows.json` |
| `flw.dead` | blocker | a transition names a step that isn't in the flow |
| `flw.screen` | blocker | a flow step names a screen or state that isn't registered or drawn |
| `flw.reach` | blocker | a step can't be reached from the platform's `entry` |
| `flw.back` | blocker | a non-entry step has no `back`, `dismiss` or `close` transition |
| `flw.dismiss` | blocker | a modal / sheet / dialog / drawer step has no `dismiss` or `close` |
| `par.states` | warning | the desktop and mobile pair declare different states |
| `par.copy` | warning | the pair's buttons use different words |
| `par.undeclared` | warning | a desktop screen has no `pair` and no `unpaired` reason |
| `trk.file` | blocker | the registry names a `tracking.json` that doesn't exist |
| `trk.catalog` | blocker | an event isn't in `handoff/analytics/event-catalog.json` |
| `trk.name` | blocker | an event or parameter name breaks the naming rules (snake_case, ≤ 40, not reserved) |
| `trk.pii` | blocker | a parameter that would carry personal data (names, phone, email, message text, exact location, user id) |
| `trk.screen` | blocker | an event fires on a step that isn't in `flows.json` |
| `trk.metric` | blocker | a metric names an event the plan doesn't fire |
| `trk.proposed` | warning | the event is `proposed`: never observed on olx.com.pk |
| `trk.unverified` | warning | the event is `live_name`: the live container triggers on the name, but its parameters haven't been observed |
| `trk.ids` | warning | no GA4 measurement id is recorded for PK, so the plan can't be checked in DebugView yet |

## Render (Chromium, per state × width)

| Check | Severity | Fails when |
| --- | --- | --- |
| `ovf.width` | blocker | the page scrolls sideways |
| `ovf.long` | blocker | a 200-character string put in a `[data-ugc]` element breaks out of its box |
| `a11y.alt` | blocker | a visible image has no `alt` |
| `a11y.label` | blocker | a button, link or input has no accessible name |
| `a11y.heading` | warning | heading levels skip (h1 → h3) |
| `a11y.target` | warning | a control is smaller than 24 × 24 px |
| `a11y.contrast` | blocker | text under WCAG AA (4.5:1, or 3:1 for 18.66 px semibold / 24 px and up) |
| `fnt.render` | blocker | rendered text uses a weight other than 400 / 500 / 600, or a face other than Geomanist |
| `fnt.load` | warning | Geomanist didn't load |

## Not covered (say so; don't claim them)

- Keyboard order and focus traps, screen-reader reading order.
- Motion and `prefers-reduced-motion`.
- Dark theme (the tokens have one; screens aren't tested in it).
- Urdu / RTL.
- Content extremes other than long text: zero, very large numbers, a missing photo, a null date.

These go in the manual pass of `stages/2-qa.md`, or in the hand-off's open questions.
