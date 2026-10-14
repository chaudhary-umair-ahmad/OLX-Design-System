# Category playbooks

A product's **brand profile** (`brands/`) decides how a deck looks. Its **category** decides what the deck
says, in what order, and which claims are risky. A product can have several categories (a general marketplace
is often classifieds + motors + real estate + jobs): pick the one this release leads with, and borrow slots from the others.

| Category | Guide | Typical products |
|---|---|---|
| Classifieds / marketplace | `classifieds.md` | general buy & sell apps |
| Motors | `motors.md` | car marketplaces, dealer apps, car finance |
| Jobs | `jobs.md` | job boards, hiring apps |
| Real estate | `real-estate.md` | property portals, new-projects apps, agent apps |
| Rentals | `rentals.md` | long-term rentals, holiday homes, car or equipment rental |
| E-commerce | `e-commerce.md` | online stores, marketplaces with checkout |
| Quick commerce | `quick-commerce.md` | grocery and essentials in minutes, dark stores |
| Fintech | `fintech.md` | wallets, payments, BNPL, lending, investing, insurance |
| SaaS / B2B | `saas.md` | CRMs, agent/dealer tools, business dashboards |

Each `<category>.json` is the starter arc the scaffold writes into the deck as eyebrow labels. The headlines it
writes are placeholders. Real headlines come from the copy pass.

## Rules for every category

1. **One idea per screen**, readable at ~160 px wide. 3 to 5 words a line, 2 lines at most. No "and".
2. **The capture proves the headline.** If screen 3 says "Chat before you buy", the capture shows the chat.
3. **Three headline routes per screen**, then the user picks: *paint a moment* ("Your sofa, sold by Friday"),
   *state an outcome* ("A buyer for everything"), *kill a pain* ("No more endless calls").
4. **Arc:** hero (the only screen most people see) → differentiator → core features, most important first →
   trust → a closer that lists extras. Skip slots that don't fit.
5. **Claims need a source and a date**: user counts, ratings, rankings, awards, "fastest", "cheapest",
   "#1". If the user can't give both, the claim doesn't go on the screenshot. Sourced proof goes on screen 1 only.
6. **Real money, places and units** in the market's format (see the brand profile). Never `$` for a non-USD
   market, never `3.2M` where the app shows the full number.
7. **Sample data, never personal data**: no real names, phone numbers, faces, chats, card numbers, balances,
   addresses or plates in a capture.
8. **Store policy**: Apple App Review Guidelines 2.3 (accurate metadata, screenshots show the app in use) and
   Google Play's Metadata and Store listing policies apply to every deck. Don't show other platforms' devices
   or store names, don't imitate system UI or alerts, don't use another company's logo unless it appears in the
   app with permission.
9. **Target-language copy is written by a person.** Draft English; mark Arabic, Urdu and others *needs translator*.
10. **Regulated categories** (fintech, lending, insurance, some real-estate markets) carry legal lines that legal
    supplies. You leave a clearly marked slot; you never write the licence number or disclaimer yourself.
