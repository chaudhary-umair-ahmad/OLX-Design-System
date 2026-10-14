# Token check

Find and fix hard-coded values in a screen or component.

## Run

```sh
npm run qa -- --scope <feature|screen-id> --checks tok,fnt --no-render   # fast, static
npm run qa -- --scope <feature> --checks tok,fnt                          # plus rendered font checks
```

| Finding | Fix |
| --- | --- |
| `tok.hex` | replace with the semantic token: text `--olx-text` / `--olx-text-muted`, surfaces `--olx-bg` / `--olx-bg-subtle` / `--olx-surface`, borders `--olx-border`, links `--olx-link`, states `--olx-success` / `--olx-danger` / `--olx-info` / `--olx-warning` (+ `-bg`). Use a palette token (`--olx-color-*`) only when no semantic one fits |
| `tok.inline` | move it into the screen's `<style>` as a class; only custom properties may stay inline |
| `tok.resolve` | a typo or a token that doesn't exist; check `css/tokens.css` (or `design-system.json` → `tokens`) |
| `tok.px` | `--olx-space-*` for spacing, `--olx-radius-*`, `--olx-font-size-*`. Borders of 1 px and media sizes may stay px |
| `fnt.weight` | 400 / 500 / 600 via `--olx-font-weight-*`. 700 → 600 |
| `fnt.family` | `var(--olx-font-family-sans)` |

## Matching a value to a token

```sh
grep -n -i '#406367' css/tokens.css          # which token holds this colour
grep -n -E 'space-[0-9]: 12px' css/tokens.css
```

If no token matches, don't round to the nearest one silently:
1. check the live capture: was it really that value?
2. if yes, the token set is missing it: add it to `PROPOSALS.md` (the tokens live in `tokens/tokens.json`, and adding one needs `npm run build`, `npm run manifest` and the storybook copies, per `CLAUDE.md`);
3. if no, use the token and note the change.

## Dark theme

The tokens have dark values (`prefers-color-scheme` and `[data-theme="dark"]`). Semantic tokens switch; palette
tokens don't. Another reason to use semantic ones.
