# Copy for OLX Pakistan

OLX copy is short, plain and transactional. Buttons are verbs. Nothing sells; the listings do the selling.

## Strings from live (measured, keep them exactly)

| Where | String |
| --- | --- |
| Contact on an ad | `Chat`, `Call`, `WhatsApp`, `Show phone number` |
| Selling | `Sell` (header), `Sell Now` |
| Filters | `Apply Filters` |
| Sections | `View more` and `View More` (live mixes them; use `View more` in new work and note it) |
| Ad page | `Report this ad` |
| Account | `Login or Sign up` |
| Search box | `Find Cars, Mobile Phones and more...` |
| Search, no results | `Oops... we didn't find anything that matches this search` |
| 404 | `Page not Found`, `We couldn’t find that page. But there’s plenty more to discover on OLX!` |

Live isn't always consistent (casing, "Oops", "discover"). New screens follow the rules below; where they differ
from live, say so in the hand-off rather than silently "fixing" live.

## Formats

| Thing | Format | Examples from captures |
| --- | --- | --- |
| Price | `Rs` + space + amount. Thousands with commas; lakh as `Lac`/`Lacs`, crore as `Crore` | `Rs 54,999`, `Rs 9.75 Lac`, `Rs 21 Lacs`, `Rs 3.10 Crore` |
| Time | relative | `39 minutes ago`, `1 day ago`, `2 weeks ago` |
| Place | area, city | `DHA Phase 6, Karachi`, `Bahria Town, Lahore` |
| Area | Marla, Kanal, sq. ft. | `5 Marla`, `1 Kanal` |
| Mileage | km with commas | `85,000 km` |
| Phone (example only) | `03XX-XXXXXXX` | never a real number |

Never `$`, `PKR 5000`, `Rs.`, `₨`, or `5k`.

## Rules

1. **Buttons are a verb, 1–3 words**, sentence case: `Save search`, `Try again`, `Browse ads`. Not `Submit`, `OK`, `Click here`.
2. **Same action, same word** on desktop and mobile (QA `par.copy`).
3. **Empty states say what happened and what to do**: a title, one line, one button.
   - `No favourites yet` / `Tap the heart on any ad to save it here.` / `Browse ads`
4. **Errors say what went wrong and how to fix it**, never blame: `Couldn't load your ads. Check your connection and try again.` + `Try again`.
5. **Field labels are nouns** (`Price`, `Location`), hints are examples (`e.g. 25,000`). Validation names the fix: `Enter a price between Rs 100 and Rs 50 Crore`.
6. **No marketing words** (QA `cpy.voice`): get started, discover, unlock, seamless, elevate, supercharge, effortless, empower, game-changer.
7. **No exclamation marks** except in a genuine celebration (an ad going live).
8. **Safety copy is concrete**: `Never pay in advance`, `Meet in a public place`.
9. English only. Urdu is out of scope until asked; don't mix Roman Urdu into UI strings (titles from sellers can contain it).

## Copy deck

For every screen and state, list each string with its id, where it appears and its status (**live** = measured,
**new** = proposed). The deliverable builds the deck from the screens; check it reads well in that list.
