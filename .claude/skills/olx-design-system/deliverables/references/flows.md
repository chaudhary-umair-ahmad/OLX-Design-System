# `flows.json`

One per feature, at `handoff/<feature>/flows.json`. QA's `flw` checks read it, and the deliverable's prototype is
built from it. `handoff/favourites/flows.json` is the worked example.

```json
{
  "feature": "favourites",
  "platforms": {
    "web-desktop": {
      "entry": "list",
      "screens": [
        { "id": "list",  "screen": "favourites-desktop", "state": "default", "title": "Saved ads" },
        { "id": "empty", "screen": "favourites-desktop", "state": "empty",   "title": "No favourites" }
      ],
      "transitions": [
        { "from": "list",  "to": "empty", "trigger": ".olx-listing__fav", "kind": "tap", "note": "un-hearting the last saved ad" },
        { "from": "empty", "to": "list",  "trigger": "Browse ads",        "kind": "back" }
      ]
    },
    "web-mobile": { "entry": "m-list", "screens": [], "transitions": [] }
  }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `entry` | the step a person lands on. Every other step must be reachable from it (`flw.reach`) |
| `screens[].id` | the step id, unique in the feature (prefix mobile ids, e.g. `m-list`) |
| `screens[].screen` | a screen id in `handoff/registry.json` |
| `screens[].state` | one of that screen's `<section data-state>` values |
| `screens[].kind` | optional: `modal`, `sheet`, `dialog` or `drawer`; it then needs a `dismiss` or `close` transition (`flw.dismiss`) |
| `transitions[].trigger` | what starts it: a CSS selector (`.olx-listing__fav`), or the visible text of a button or link (`Browse ads`), or a system event (`page load`, `request fails`) |
| `transitions[].kind` | `tap`, `submit`, `back`, `dismiss`, `close`, or `system` |
| `transitions[].note` | optional: when or why |

## Rules

- Every non-entry step has a way out: a `back`, `dismiss` or `close` transition (`flw.back`). "Try again" from an error and "request succeeds" from loading count as `back`.
- In the prototype, a selector or button-text trigger is outlined and clickable. A `system` trigger becomes a step button.
- Name triggers with the words on screen, so the prototype and the copy deck agree.
