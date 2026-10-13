# Funnels

Define funnels in the hand-off so the metric can be read on day one. Use catalogue events only.

## OLX funnels

| Funnel | Steps (events) | Notes |
| --- | --- | --- |
| Browse → contact | `home_view` → `property_search` / category view → `ad_view` → `contact_seller` | the core marketplace funnel. `contact_seller` is proposed |
| Favourites return | `ad_view` (+ `add_to_favourites`) → favourites view → `ad_view` with `view_section: favourites` | the worked example's M1 |
| Post an Ad | `post_ad_start` → category chosen → `post_ad_submit` | proposed; logged-in, can't be observed from the cloud |
| Related ads | `ad_view` → `related_ads` → `ad_view` | live events |

## How to write one

1. Steps in order, each an event with any parameter filter.
2. Window: same session, or N days (contact often happens a day later).
3. Unit: users, not events.
4. Breakdowns that matter on OLX: platform (desktop, mobile web), category (`category_1_name`), city (`loc_1_name`/`loc_2_name`), signed in or out.
5. The guardrail next to it (a contact-rate funnel shouldn't improve by hiding prices).

## Rules

- No baselines or targets without a source. "To be read after launch" is a fine answer.
- A funnel with a proposed event can't be read until the event ships: say so.
- Don't count `ad_view` from bots or the prerendered page; ask the analytics owner how live filters them.
