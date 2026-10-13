# Design review: a senior OLX designer's pass

Run this on new screens before QA. QA catches rule breaks; this catches a screen that passes every rule and still
isn't OLX. Write findings as **P0** (wrong for users or the business), **P1** (clearly off-brand or confusing),
**P2** (polish). The Stage 2.5 gate is no open P0 or P1.

## 1. Put it next to live

Open the closest capture (`site/pages/<id>/<viewport>.png`) beside the new screen at the same width. Differences
must be intentional. List each one: *kept from live*, *changed on purpose (why)*, or *drifted (fix)*.

## 2. The OLX test

| Look for | OLX does | Typical drift |
| --- | --- | --- |
| Density | 4 cards a row on desktop home (311 px, 12 px gaps); list rows on category pages; small meta text | airy cards, 3 per row, big padding |
| Hierarchy on a card | price (600) → title → specs → location · time | title first, price in grey, equal weights |
| Colour | petrol ink on white; the yellow/teal/blue ring only on Sell; teal only on Featured | blue headings, teal buttons, gradients |
| Buttons | petrol filled or outlined, 48 px tall, radius-sm, 600 | pill buttons, brand blue fill, icons in every button |
| Type | Geomanist 400/500/600 | 700 headlines, a second font |
| Words | `Chat`, `Call`, `Sell`, `Show phone number` | "Get started", "Discover deals", "Contact seller now!" |
| Photos | real listing photos, often imperfect, 4:3-ish | stock lifestyle shots, perfect studio cut-outs |

## 3. Does it look AI-made?

Any two of these and it reads as generated. Fix them:
- symmetric 3-up feature cards with an icon, a title and two lines each;
- a hero with a gradient blob or glow;
- every section the same height and padding;
- emoji or generic line icons outside the house set (`assets/icons/`);
- copy that sells instead of tells ("Unlock the best deals effortlessly");
- round numbers everywhere (Rs 10,000, 100 views): real listings say `Rs 54,999`, `1 day ago`;
- placeholder people names, or Western names and places.

## 4. Product questions

- What job does this screen serve: find, judge, contact or sell? If none, raise it.
- What is the one action, and is it the strongest thing on screen?
- What happens for a signed-out visitor? (Most OLX browsing is signed out.)
- Is there a state nobody drew: empty, loading, error, a removed ad, a sold item?

## 5. Write it up

| # | Severity | Screen / state | Finding | Fix |
| --- | --- | --- | --- | --- |

Then hand words to `design-copy`, inputs to `design-forms`, and layout to `design-grid`.
