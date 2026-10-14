# `deliverable.json`

One per feature, at `handoff/<feature>/deliverable.json`. It holds what the screens can't: the decisions. Drafted in
Stage 1 step 6, completed before the build. `handoff/favourites/deliverable.json` is the worked example.

| Field | Required | Meaning |
| --- | --- | --- |
| `feature` | yes | kebab-case, same as the folder and registry |
| `title` | yes | the human name |
| `version` | yes | an integer; bump it for every new hand-off |
| `audience` | yes | `engineer`, `designer` or `product` |
| `platforms` | yes | `web-desktop`, `web-mobile` |
| `locales` | yes | `["en"]` |
| `screens` | yes | registry screen ids, in reading order |
| `classification` | yes | `internal` (the file embeds licensed Geomanist) |
| `summary` | yes | `problem`, `scope`, `changed` (what's new in this version) |
| `signoff` | yes | `who` (roles) and `meaning` (what signing means) |
| `sections.exclude` | no | `{ "<section id>": "reason" }`; a section is never dropped silently |
| `rules[]` | yes | `{ "id": "R1", "text": "…", "test": "…" }`. Every rule has a test an engineer or QA can run |
| `acceptance[]` | yes | plain sentences, each one observable |
| `edge_cases[]` | yes | what happens with the cases from Stage 1 step 1; an undrawn one says so |
| `open_questions[]` | yes | `{ "q", "owner", "blocks" }`. An owner is a role, never "TBD" |
| `changelog[]` | yes | `{ "version", "date", "notes" }`, with an entry for the current `version` (the build refuses otherwise) |

Section ids for `sections.exclude`: `summary`, `prototype`, `states`, `specs`, `rules`, `acceptance`, `edge-cases`,
`copy`, `accessibility`, `tracking`, `assets`, `qa`, `open-questions`, `changelog`, `signoff`.

## Writing rules and tests

- A rule is a behaviour, not a look: "Un-hearting a saved ad removes it from the list immediately."
- A test says what to do and what to see: "Tap the heart; the card leaves the grid; on the last one, the empty state shows."
- If a rule depends on an open question, the question's `blocks` names the rule.
- Never put a value in a rule that isn't measured or tokenised; proposed values go in `PROPOSALS.md`.
