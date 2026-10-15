# Event taxonomy: `handoff/analytics/event-catalog.json`

The shared catalogue of OLX Pakistan events. Every feature's `tracking.json` may only use events in it.

## What's in it

- `tenant`: PK, PKR, 0 decimals. GTM `GTM-W6NPB7W` and GA4 `G-YP1ZBNYRVD`, read from the public tag
  container on 14 Oct 2026 (`handoff/analytics/gtm-container.md`). The analytics owner still has to confirm
  that `G-YP1ZBNYRVD` is the production property, the consent defaults, the key events and the custom
  dimensions; `key_events` stays `null` until they do.
- `naming`: snake_case, `object_action` as live does (`ad_view`, `home_view`, `property_search`), ≤ 40 characters, and the reserved GA4 names and prefixes (`google_`, `ga_`, `firebase_`, `gtm.`).
  - `live_name_exceptions` lists live names that use a hyphen (`add-listing_view`, `ad-post-success_view`,
    the three package and payment views). They are recorded as they really fire, so they break this rule and
    the QA name check (`trk.name`). Never copy the hyphen into a new event.
- `shared_params`: 45 parameters events share (`ad_id`, `category_1_name`, `price`, `loc_name`, `page_type`…). Parameters that carry personal or tracking data (`user_id`, `anonymous_session_id`, `url`, `referrer`, the `utm_*` fields) are flagged: new events never add them.
- `events`, each with `status`:
  - **live**: observed in `dataLayer` on olx.com.pk on load, read-only, without clicking (13 Oct 2026): `home_view`, `home_banner_impression`, `suggested_history`, `property_search`, `external_store_cta_viewed`, `ad_view`, `related_ads`.
  - **live_name**: the live container triggers on this name, so the name is real, but its parameters have
    never been observed (`params: []`, `params_status: "unobserved"`). The 11 lead, favourite and post-ad
    events are here: `chat_lead`, `open_chat`, `phone_view`, `phone_lead`, `sms_lead`, `make_an_offer`,
    `favourite_toggle`, `click_sell`, `add-listing_view`, `publish_ad`, `ad-post-success_view`.
    QA warns (`trk.unverified`) when a feature uses one. Confirm the parameters in GTM Preview
    (Tag Assistant) on the Mac, signed in, before relying on them.
  - **proposed**: designed here, never seen live. There are none at the moment: the five that were
    proposed were replaced on 14 Oct 2026 by the live names above, and each replacement records what it
    replaced in `replaces`.

Click events still aren't observed in `dataLayer`, because capturing never clicks on olx.com.pk. The container
read gives their names only. `name_inventory` points at the full list of about 60 names in
`handoff/analytics/gtm-container.md`; add one as an event when a feature needs it.

## Adding or changing

1. **Reuse first:** a live event with a parameter (`ad_view` + `view_section: favourites`).
2. **Extend:** add a parameter to an existing event. Add it to `shared_params` if others will use it.
3. **New:** only for a genuinely new action, and only after checking it isn't already in the container's name
   inventory. Add it with `status: "proposed"`, `proposed_for: "<feature>"`, `fires_on` (the exact moment,
   e.g. "the request succeeds", not "the button is tapped"), and typed `params` with `required` and `values`
   where the set is closed.
4. Never rename a live event. Never put a value in an event name (`contact_chat` ✗ → `contact_seller` + `lead_channel: chat`).
   One live event may cover both directions of a toggle (`favourite_toggle`); tell them apart by a parameter,
   not by two names.
5. Record when a name from the container is seen firing with its parameters: `status: "live"`,
   `observed_live: { "PK": "<date>" }`, fill in `params`, and drop `params_status` and `name_source`.
6. Replacing a proposed name with a live one: keep the proposed name in `replaces` so a feature written
   against the old name can be traced, and update every feature's `tracking.json` in the same change.
