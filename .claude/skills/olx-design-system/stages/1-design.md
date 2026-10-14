# Stage 1: designing an OLX feature or revamp

The design system's job is reproduction: everything in it is measured from olx.com.pk. This
stage goes the other way, producing screens that **don't exist yet**. The whole risk is that
invented values get presented with the same confidence as measured ones. Keep the two apart at
every step.

## Step 0: establish what already exists (never skip this)

Most "new" screens recombine things already captured. Find which of four states each screen is in:

| State | How to tell | What to do |
| --- | --- | --- |
| **Captured** | in `site/index.json`, with files in `site/pages/<id>/` | Open `site/pages/<id>/<viewport>.png` and `.html`. A revamp starts from that file, not from memory. |
| **In the design kit** | `storybook/design-kit/templates/<site>/<device>/<page>.html` (Property, Motors, more Classifieds) | Same: start from the file. |
| **Live, not captured** | you can reach it on olx.com.pk without logging in | Capture it first (`node scripts/capture-site.mjs <id>` after adding it to the page list). Don't design from a screenshot or a memory. |
| **Logged-in only** | post-ad, chat, profile, my ads, favourites | It can't be captured from the cloud. Ask whether the Mac session can run `npm run capture:logged-in`. Otherwise compose from captured parts and **label it unverified**. |
| **Doesn't exist anywhere** | genuinely new | Compose from measured parts (step 3). This is the only case where you invent, and it must be labelled. |

```sh
node -e "const s=require('./site/index.json');console.log(s.pages.filter(p=>/<word>/i.test(p.id+p.title)).map(p=>p.id+'~'+p.viewport).join('\n'))"
ls storybook/design-kit/templates/*/*/ | grep -i <word>
grep -i <word> catalog/index.json | head
```

## Step 1: the product pass (before drawing anything)

Write four things down, briefly:

1. **The job**, as a user job: *find* (browse, search, filter), *judge* (ad page, seller), *contact* (Chat, Call, WhatsApp, Show phone number), or *sell* (Post an Ad, boost, manage ads). If it serves none of them, that's a finding, not an obstacle.
2. **Scope:** must / should / won't. Name what you cut.
3. **Success metric**, and what would show it failed. Ask the product owner. If nobody can say, propose one and mark it as needing the owner. Never invent a baseline number.
4. **Edge cases, before design:**
   - zero results, and a huge result set;
   - an expired or removed ad;
   - signed out;
   - a slow connection;
   - long Pakistani place names ("Marla Bahria Town - Sector C, Lahore");
   - long, messy seller titles ("iPhone 11 128GB PTA Approved | 89% Battery | Box | Face ID");
   - prices from Rs 500 to Rs 12 Crore.

## Step 2: screen inventory and flow

List every screen and every transition the job needs, and mark each one with its step-0 state.
Include the states people forget: **empty, loading, error, validation, success, signed-out**. A
state that has never been captured on live is an invention, so label it.

## Step 3: build from measured parts

Order of preference, strictly:

1. An `olx-*` class in `css/components.css` (the list is in `design-system.json` → `components.css`), or markup copied from a live component (`components/<name>/<viewport>.html`).
2. A variant of one: a modifier class built only from tokens.
3. Something new, built only from tokens. Log it in `handoff/<feature>/PROPOSALS.md`.

Then:

- **Screen files:**
  - put them in `handoff/<feature>/screens/<name>-<desktop|mobile>.html`;
  - link `../../../css/olx.css`;
  - draw each state in `<section data-state="…">`, with the non-default ones `hidden`;
  - mark user text (titles, locations, names) with `data-ugc`, so QA can stress it.
- **Real content** from `handoff/content/fixtures.json`: titles, prices, locations, times, specs, photos.
- **Both platforms.** Desktop is 1440 wide with content at 1280; mobile is 390. Mobile isn't a narrow desktop. Check how live solves it: category pages are list rows on both, and home sections become horizontal carousels on mobile.
- **Copy in OLX's voice** (`design-copy`): `Chat`, `Call`, `Sell`, `Show phone number`, `Apply Filters`, `View more`.
- **Geomanist only, in Regular 400, Book 500 and Medium 600.** Headings and prices use 600. Never 700 or under 400.

Specialist guides, for the parts that are easy to get wrong:

| Need | Guide |
| --- | --- |
| Any input or multi-step flow | `design-forms` |
| States, loading, dialogs, destructive actions | `design-interaction` |
| Layout, columns, spacing | `design-grid` |
| Hierarchy, prices, truncation | `design-typography` |
| Any word on screen | `design-copy` |
| Icons | `icons` |
| Photos, illustrations, empty-state art | `imagery-illustration` |
| Animation | `motion-design` |
| Charts and stats | `chart-data-viz` |
| How others solve it | `design-inspiration` |

## Step 4: check before you show it

- **Contrast.** The checker measures it, but choose safe pairs to begin with. Body text is `--olx-text` (#002f34) or `--olx-text-muted` (#406367) on white or `--olx-bg-subtle`. Links are `--olx-link` (#2456d6), never the brand blue #3a77ff, which fails on white.
- **Density.** OLX is a scanning product: listing rows and cards are dense. If it looks airy, it's wrong.
- **Hierarchy on an ad card:** price → title → specs → location and time. Never flatten it.

## Step 5: the adversarial product review

Critique your own design from the product seat, in writing, and show it next to the design:
- What's over-built for the job?
- What could ship without it?
- What rests on an assumption rather than a capture?
- What would a sceptical reviewer attack first?

## Step 6: leave the hand-off pack ready

1. **Register every screen** in `handoff/registry.json`, under `screens`, with:
   - `id`, `feature`, `platform` (`web-desktop` | `web-mobile`), `origin: "authored"`;
   - `based_on`, the live capture id it started from (`home~desktop`);
   - `file`;
   - `states` (empty included, unless it shows no list: `"no_list": true`);
   - `pair`, the same screen on the other platform.

   Add `features.<feature>` with paths to `flows.json`, `deliverable.json` and `tracking.json`.
2. **Write `handoff/<feature>/flows.json`** in the format of `deliverables/references/flows.md`: one entry screen per platform, every transition with a trigger and a kind, and a back / dismiss route from every non-entry screen.
3. **Draft `handoff/<feature>/deliverable.json`** in the format of `deliverables/references/deliverable-json.md`:
   - rules, each with a test;
   - open questions, each with an owner;
   - a changelog entry for version 1.

   Rules and questions come from steps 1 and 5. Don't invent new ones here.
4. **Run QA yourself:** `npm run qa -- --scope <feature>`. Fix the blockers before the user sees the design, and show the verdict line next to it.

## What you hand over at the end of this stage

- The screens: both platforms, all states.
- A **values table**: each new size, colour or spacing with its source (measured / token / **proposed**).
- The components used, and any new parts.
- `PROPOSALS.md` rows for anything new.
- Open questions and assumptions, stated explicitly.
- The step-5 critique.
- The QA verdict line.

## The one rule that matters

State the provenance of everything: **measured**, **adopted** or **proposed**. Never let the third look like the first.
