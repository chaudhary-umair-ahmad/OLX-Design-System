# Stage 3: the hand-off deliverable

One self-contained HTML file per feature, for engineers: `handoff/<feature>/dist/<feature>-v<version>.html`.
It works offline, with nothing remote: CSS, Geomanist and photos are inlined. It is **INTERNAL** because it embeds
the licensed font, and `dist/` is git-ignored.

```sh
npm run handoff -- --feature <feature>                       # photos fetched and inlined
npm run handoff -- --feature <feature> --placeholder-images  # offline: grey placeholders instead of photos
```

## The gate (the builder re-checks it)

The builder refuses to run when:
- `handoff/<feature>/qa/report.json` is missing or its verdict is BLOCKED;
- any screen file is newer than the report (re-run QA);
- `deliverable.json` has no changelog entry for its `version`.

## What's in it

| Section | From |
| --- | --- |
| Summary | `deliverable.json` → `summary`, `audience`, `platforms` |
| Prototype | `flows.json`: click the outlined element, or use the step buttons |
| States | every `<section data-state>` of every screen, side by side, at real size scaled down |
| Specs | measured in Chromium and mapped back to `--olx-*` tokens; a value with no token is marked **no token** |
| Rules | `rules[]`, each with its test |
| Acceptance, edge cases | `acceptance[]`, `edge_cases[]` |
| Copy deck | every visible string per screen and state |
| Accessibility | the `a11y` results from QA |
| Tracking | `tracking.json`: metrics, events with parameters, a `dataLayer.push` example; `proposed` events marked |
| Assets | images and icons used |
| QA | the verdict, counts and findings |
| Open questions | `open_questions[]` with owners |
| Changelog, sign-off | `changelog[]`, `signoff` |

A section can be left out only with a reason: `"sections": { "exclude": { "motion": "why" } }`.

## Output checks

The build fails when the file:
- contains a phone number or an email address;
- references anything remote (`src` / `href` to http);
- is over 12 MB.

If it used placeholder images, say so.

## After building

- Open it and click through the prototype once: from the default state to empty, and back.
- Tell the user the path, the size and the verdict line. Don't publish it anywhere: it's internal.
- A new version: bump `version` in `deliverable.json`, add a changelog entry, re-run QA, rebuild.
