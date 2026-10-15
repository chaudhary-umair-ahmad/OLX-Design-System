# Stage 2: QA, the gate before hand-off

QA tests the rendered screens against a matrix of states, widths and flows. It writes
`handoff/<feature>/qa/report.json` (schema `olx-design-qa/1`, the machine contract) and `report.html` (for people).
It is a **gate**, not a report: a blocker stops the job.

It doesn't fix anything, doesn't change tokens or components, and doesn't judge fidelity to live (that is
`npm run verify:pixels`). If a check fails, the design is wrong, or the check is, and you say which.

## Two kinds of screen

| `origin` | What it is | How QA treats it |
| --- | --- | --- |
| `authored` | a screen designed here (`handoff/<feature>/screens/`) | every check; blockers block |
| `live` | a capture in `site/pages/` (scope `home~desktop`) | checks run and are recorded, findings are **capped at note** |

A capture can't be fixed: it is production. A revamp is `authored` with `based_on: <capture id>`; never edit a
capture in place.

## Run order

1. **Scope:** a feature, one screen id, a capture (`page~desktop`), or `all`.
2. **Show the matrix first**, since it is the scope: `npm run qa -- --scope <feature> --matrix`.
   - Each declared state × each platform width (`qa/schema/platforms.json`: desktop 1280 and 1440, mobile 360 and 390).
   - **Empty is required on every screen that shows a list**, declared or not (`"no_list": true` opts out).
3. **Run:** `npm run qa -- --scope <feature>`. Static checks always; render checks need Chromium (`--no-render` skips them, and the report then says it is partial; never call that a pass).
4. **Manual pass** (rules can't express these; write each as a finding in the summary):
   - does the hierarchy read price → title → specs → location/time;
   - does the empty state tell people what to do next;
   - are loading and error drawn where data loads (QA requires only the states you declare, plus empty);
   - are hit targets near the aim in `qa/schema/platforms.json` (desktop 32, mobile 44), not just over the 24 px floor;
   - does anything look AI-made (`specialists/design-review/GUIDE.md`).
5. **Waivers:** `handoff/qa/waivers.json`, only when the user says so. Each needs `check`, `screen`, `reason`, `owner`, `expires`. A waived blocker stays in the report, marked waived.
6. **Verdict in one line:** `PASS` / `PASS WITH WARNINGS` / `BLOCKED`, the blocker and warning counts, and the three findings worth reading. Never paste the report.

`qa.mjs` exits 1 when BLOCKED, 0 otherwise.

## Check families

The full list with severities is in `qa/references/checks.md`.

| Prefix | Family |
| --- | --- |
| `cov` | coverage: the file exists, each declared state is drawn, an empty state exists |
| `tok` | tokens: no inline style, no hex, every `var()` resolves, few px literals |
| `fnt` | Geomanist only, weights 400 / 600 only, and they actually load |
| `cpy` | no lorem or TODO, no personal data, OLX voice, `Rs` price format |
| `flw` | `flows.json`: no dead transitions, every screen reachable, a way back from each |
| `par` | desktop and mobile pairs have the same states and the same button words |
| `trk` | `tracking.json` against `handoff/analytics/event-catalog.json` |
| `ovf` | no horizontal overflow at any width; a 200-character string in every `[data-ugc]` stays in its box |
| `a11y` | alt text, labels, one h1, hit targets, WCAG AA contrast |

## Severity

- **blocker:** a missing state on an authored screen, a hard-coded colour or inline style, a font weight outside 400/600 or a face other than Geomanist, placeholder text, personal data, a dead or unreachable flow, horizontal overflow, an image without alt, a control without a name, contrast under AA.
- **warning:** px literals, a hit target under 24×24 px, a heading level jump, voice, price format, parity, a `proposed` event, Geomanist not loading.
- **note:** everything on a `live` capture, and observations.

Duplicates across widths and states are merged into one finding that lists where it happened.

## Gate

- **BLOCKED:** stop. Fix (back to Stage 1), or waive with the user's written OK.
- **PASS WITH WARNINGS:** tell the user the warnings, then continue.
- Never relabel a blocker, and never delete a finding to get a pass.
