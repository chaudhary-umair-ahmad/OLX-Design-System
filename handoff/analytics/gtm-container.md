# What olx.com.pk's tag container shows (read 14 Oct 2026)

Read-only: the home page source and the public container script
`https://www.googletagmanager.com/gtm.js?id=GTM-W6NPB7W`. Nothing was clicked.

## IDs

| What | Value |
| --- | --- |
| GTM container | `GTM-W6NPB7W` |
| GA4 measurement id | `G-YP1ZBNYRVD` (production property: to be confirmed by the analytics owner) |
| Universal Analytics (retired) | `UA-192624154-2`, ignore |
| Consent mode | the container references `analytics_storage` and `ads_data_redaction`: consent mode looks configured; defaults unknown |

## Event names the container triggers on

This shows which events exist, **not** their parameters. Confirm parameters in GTM Preview (Tag Assistant), signed in.

- **Leads:** `chat_lead`, `phone_view`, `phone_lead`, `sms_lead`, `make_an_offer`, `publish_ad`, `sell_faster`, `pay_package`, `payment_channel`, `select_package` (each also with `*_unique` variants for chat, phone, sms)
- **Clicks:** `open_chat`, `favourite_toggle`, `click_sell`, `click_ad`, `click_category`, `click_cat_tree`, `click_filter`, `click_photo`, `click_load_more`, `view_more`, `share_property`, `view_agency_properties`, `login_open`, `open_notifications`, `view_my_ads`, `view_packages`, `view_buy_history`, `click_settings`, `save_changes`, `click_help`, `click_example`, `click_inspection`
- **Views:** `home_view`, `ad_view`, `chat_view`, `seller_view`, `settings_view`, `add-listing_view`, `add_listing_info_view`, `ad-post-success_view`, `select_payment_view`, `select_single_package_view`, `select_multiple_packages_view`
- **Other:** `property_search`, `search_start`, `login_successful`, `book_inspection`, `buy_with_delivery`, `free_ad_payment`
- No WhatsApp event was found.

## What this changed in `event-catalog.json` (applied 14 Oct 2026)

| Proposed here | Live name(s) |
| --- | --- |
| `contact_seller` | `chat_lead`, `open_chat`, `phone_view`, `phone_lead`, `sms_lead`, `make_an_offer` |
| `add_to_favourites`, `remove_from_favourites` | `favourite_toggle` |
| `post_ad_start`, `post_ad_submit` | `click_sell`, `add-listing_view`, `publish_ad`, `ad-post-success_view` |

Applied on 14 Oct 2026: the IDs and the consent signals are in `tenant`, the five proposed events were replaced
by the 11 live names above (each recording what it `replaces`), `handoff/favourites/tracking.json` fires
`favourite_toggle`, and QA was re-run.

Those 11 carry `status: "live_name"`: the name is real, the parameters are not observed (`params: []`). QA warns
`trk.unverified` when a feature uses one. The questions below are what's still missing.

## Still needs the analytics owner

1. Is `G-YP1ZBNYRVD` the production GA4 property for olx.com.pk?
2. Consent: which banner tool, and what's denied by default?
3. Which events are GA4 key events (conversions)?
4. Which parameters are registered as custom dimensions?
5. Parameters of the click events: observe in GTM Preview on the Mac, signed in (heart, Chat, Call, Sell).
