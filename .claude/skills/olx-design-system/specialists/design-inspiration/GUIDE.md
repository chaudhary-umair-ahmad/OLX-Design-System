# Design inspiration: borrow structure, never looks

Look at how others solve a pattern, then rebuild it from OLX parts. Inspiration answers "what steps, what states,
what order", never "what colour, what font, what radius".

## Where to look, in order

1. **OLX itself.** The pattern may exist on another OLX page (`site/pages/`), in Motors (`motors-*` captures) or Property (`prop-*`). Same company, same parts.
2. **Classifieds peers** for marketplace patterns (posting, contact, saved searches, seller trust): other regional classifieds and car and property portals.
3. **Big consumer apps** for generic patterns (onboarding, sheets, search suggestions, empty states). The Mobbin connector, when it's connected, searches real app screens and flows.

## How

1. Name the pattern precisely: "saved search with alert frequency", not "notifications".
2. Collect 3–6 examples. For each, note: steps, states (empty, error), copy approach, what's clever, what doesn't fit Pakistan (card payments assumed, US address formats, English-only names).
3. Write a short comparison: what most do, what the best do, what OLX should do and why.
4. Rebuild with `olx-*` components and tokens. Anything you can't build from them is a proposal.

## Rules

- Never copy a screenshot into a design, and never copy another product's words.
- Context matters: most OLX browsing is signed out, on mobile, on mid-range Android phones over 4G, paid in cash. A pattern that assumes logged-in, desktop, card payments needs adapting.
- Credit what inspired it in the review notes, so a reviewer can check the reasoning.
