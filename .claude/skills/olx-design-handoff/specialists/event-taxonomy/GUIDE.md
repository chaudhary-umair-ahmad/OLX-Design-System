# Event taxonomy: `handoff/analytics/event-catalog.json`

The shared catalogue of OLX Pakistan events. Every feature's `tracking.json` may only use events in it.

## What's in it

- `tenant`: PK, PKR, 0 decimals. GA4 and GTM ids are `null` until someone supplies them.
- `naming`: snake_case, `object_action` as live does (`ad_view`, `home_view`, `property_search`), ≤ 40 characters, and the reserved GA4 names and prefixes (`google_`, `ga_`, `firebase_`, `gtm.`).
- `shared_params`: 45 parameters events share (`ad_id`, `category_1_name`, `price`, `loc_name`, `page_type`…). Parameters that carry personal or tracking data (`user_id`, `anonymous_session_id`, `url`, `referrer`, the `utm_*` fields) are flagged: new events never add them.
- `events`, each with `status`:
  - **live**: observed in `dataLayer` on olx.com.pk on load, read-only, without clicking (13 Oct 2026): `home_view`, `home_banner_impression`, `suggested_history`, `property_search`, `external_store_cta_viewed`, `ad_view`, `related_ads`.
  - **proposed**: designed here, never observed: `contact_seller`, `add_to_favourites`, `remove_from_favourites`, `post_ad_start`, `post_ad_submit`.

Click events weren't observed, because capturing never clicks on olx.com.pk. Live may already have names for those
actions; a proposed name is replaced by the live one once someone observes it (on the Mac, signed in, in GTM
preview or DevTools).

## Adding or changing

1. **Reuse first:** a live event with a parameter (`ad_view` + `view_section: favourites`).
2. **Extend:** add a parameter to an existing event. Add it to `shared_params` if others will use it.
3. **New:** only for a genuinely new action. Add it with `status: "proposed"`, `proposed_for: "<feature>"`, `fires_on` (the exact moment, e.g. "the request succeeds", not "the button is tapped"), and typed `params` with `required` and `values` where the set is closed.
4. Never rename a live event. Never put a value in an event name (`contact_chat` ✗ → `contact_seller` + `lead_channel: chat`).
5. Record when a proposed event is seen live: `status: "live"`, `observed_live: { "PK": "<date>" }`.
