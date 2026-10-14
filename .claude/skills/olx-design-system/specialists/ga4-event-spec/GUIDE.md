# GA4 / dataLayer spec for engineers

The hand-off's tracking section is generated from `tracking.json` and the catalogue. This is how to read and extend it.

## Shape

OLX pushes events to `window.dataLayer` (observed on live). Spec each event as a push:

```js
window.dataLayer.push({
  event: 'favourite_toggle',
  ad_id: '1234567890',          // string, required
  category_1_name: 'Mobiles',   // from shared_params
  page_type: 'favourites',
  surface: 'favourites'  // parameters are unobserved: confirm in GTM Preview
});
```

`favourite_toggle` is one live event for both directions. Which parameter says saved or removed is not yet
known, so a spec that depends on the direction stays an open question until someone observes a heart tap.

## Per event, the spec states

| Field | Example |
| --- | --- |
| Name | `favourite_toggle` (status: live_name) |
| Fires when | the favourite request succeeds, not on tap |
| Fires once per | action |
| Parameters | name, type, required, allowed values, example |
| Screens | the flow step ids |
| Not sent | anything personal: names, phone, email, message text, exact location |

## Rules

- Fire on success, not intent, for anything that can fail (contact, favourite, post).
- Currency is `PKR` with 0 decimals; send `value` as a number (`54999`), never the formatted string.
- Strings stay under 100 characters (GA4's limit). Live `ad_view` already sends `ad_title` and `seller_id`; don't add either to new events.
- Consent mode, the GA4 measurement id and the GTM container aren't known (`tenant` in the catalogue is `null`): an open question for the analytics owner, and the reason QA warns `trk.ids`.
- Verify in GA4 DebugView or GTM preview once implemented; until then every proposed event is unverified.
