# Analytics tracking: metric → events → `tracking.json`

Runs in Stage 2.7, when the feature has a metric. Output: `handoff/<feature>/tracking.json`, registered under
`handoff/registry.json` → `features.<feature>.tracking`, checked by QA (`trk.*`).

## Steps

1. **Metrics first.** One primary metric and one or two guardrails, from the PRD or the owner. Never invent a baseline or a target number; write the definition only.
   - Primary: what success means (`users who open an ad from Favourites / users who view Favourites`).
   - Guardrail: what must not get worse (accidental removals, contact rate, page speed).
2. **Actions on the flow.** Walk `flows.json`: for each step a metric needs, name the person's action (`open a saved ad`).
3. **Map each action to an event** in `handoff/analytics/event-catalog.json` (`event-taxonomy`): **reuse** a live event as it is if you can; else **extend** it with a parameter (`ad_view` + `view_section`); only then add a **new** one (`proposed`).
4. **Write `tracking.json`:**

```json
{
  "feature": "favourites", "version": 1, "tenants": ["PK"],
  "metrics": [ { "id": "M1", "kind": "primary", "name": "…", "definition": "…", "events": ["ad_view"] } ],
  "events": [
    { "id": "E1", "action": "open a saved ad", "event": "ad_view", "decision": "extend",
      "screens": ["list", "m-list"], "params": { "view_section": "favourites" }, "dynamic": ["ad_id", "price"] }
  ],
  "open_questions": [ { "q": "…", "owner": "analytics owner", "blocks": "E2" } ]
}
```

   - `screens` are step ids from `flows.json` (QA `trk.screen`).
   - `params` are fixed values; `dynamic` are filled at runtime.
   - `decision`: `reuse`, `extend` or `new`.
5. **Run** `npm run qa -- --scope <feature> --checks trk` and fix the blockers.
6. **Say out loud** which events are `proposed`, never seen on olx.com.pk. They need the analytics owner, and someone to observe the live click events (logged-in actions can't be observed from the cloud).

## Personal data

Never: names, phone numbers, emails, chat or message text, exact addresses or coordinates, user ids. `ad_id`,
category, location name (`loc_name`) and price are fine. QA `trk.pii` blocks the rest.
