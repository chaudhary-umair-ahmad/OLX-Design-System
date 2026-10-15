# OLX Design System — progress and hand-over

Status as of **15 Oct 2026**. Written for whoever picks this up next, in another account or
another Claude session. Read this first, then `README.md`.

**Keep this file current.** Every change to the repo adds a dated entry at the top of the
[change log](#change-log) and updates the sections above it. See `CLAUDE.md`.

## Where things are

| What | Where |
| --- | --- |
| Repository | `chaudhary-umair-ahmad/OLX-Design-System` on GitHub, branch `main` |
| Design system book | https://chaudhary-umair-ahmad.github.io/OLX-Design-System/ |
| Storybook | https://chaudhary-umair-ahmad.github.io/OLX-Design-System/storybook/ |
| Clickable prototype | https://chaudhary-umair-ahmad.github.io/OLX-Design-System/proto/ |
| Component showcase | https://chaudhary-umair-ahmad.github.io/OLX-Design-System/showcase/ |
| Source of truth | the live site https://www.olx.com.pk and the product codebase `ZTechGroup/maple` (private; read on the Mac, never in the cloud) |

`/book/` and `/prototype/` on the live site redirect to `/` and `/proto/`.

Every push to `main` rebuilds and redeploys the site (`.github/workflows/pages.yml`, about 5 minutes).

## What is done

- **Tokens.** `tokens/tokens.json` is the source of truth: colours, semantic light and dark theme, type, spacing, radius, shadow and motion. `npm run build` generates `css/tokens.css` and `dist/tokens.js`.
- **Font.** Geomanist is committed and published, since OLX holds the licence, in three weights only: Regular 400, Book 500 and Medium 600. Bold and Thin are not used. There is no bold token, `<strong>` uses 600, and `font-synthesis: none` stops faked bold. The Arabic GE SS Two font is not in git.
- **CSS components.** `css/components.css` holds the `olx-*` classes; the README has the list. The showcase is `index.html`.
- **Live captures** from olx.com.pk, re-captured in one full pass on 7 Oct 2026 with photos:
  - `site/pages/`: 106 pages and states, 202 captures across desktop and mobile. Each has HTML, a screenshot, section crops and link hotspots.
  - `templates/`: 6 page templates (home, search results, category listing, ad detail, and the two location popups).
  - `components/`: 39 components, 66 captures across desktop and mobile.
  - `assets/`: 237 icons, illustrations and images.
- **Storybook** (`storybook/`, built on the Mac from the `local-build` branch):
  - components, foundations and patterns;
  - 48 page stories across Classifieds, Property and Motors, plus 8 flows.
- **Design system book** (`book/`): foundations, components, templates and every captured screen, each with its live HTML, screenshot and source. It also includes the design-kit screens.
- **Prototype** (`prototype/`): 222 screens and 32 guided flows, built from the captures.
- **Catalog** (`catalog/`): a developer index of pages, flows, sections, components and assets.
- **Claude skill: one skill, `.claude/skills/olx-design-system/`, with two modes.**
  - Claude Code loads it automatically in this repo. For claude.ai, upload the folder (zipped as a `.skill`) as a skill.
  - **Quick questions and building UI:** `foundations.md` gives the rules (look at the live screen first, tokens only, `olx-*` components first, both viewports, accessibility), plus a token and markup quick reference, OLX content conventions and where everything is.
  - **A full design job:** `SKILL.md` runs it end to end, with a gate between stages: intake → plan approval → design → review → tracking → QA → hand-off → summary.
  - **QA gate:** `npm run qa -- --scope <feature>`. Static checks (states, tokens, Geomanist weights, copy, flows, parity, tracking) and render checks in Chromium at 1280/1440 and 360/390 (overflow, a 200-character string in user text, alt, labels, hit targets, AA contrast, rendered fonts). Writes `handoff/<feature>/qa/report.{json,html}`.
  - **Hand-off:** `npm run handoff -- --feature <feature>` builds one offline HTML file (clickable prototype, every state, specs mapped to tokens, rules with tests, copy deck, tracking, QA, open questions, sign-off). Internal only, since it embeds Geomanist; `handoff/*/dist/` is git-ignored.
  - **Real content:** `npm run fixtures` → `handoff/content/fixtures.json`, 864 listings from the captures.
  - **Analytics:** `handoff/analytics/event-catalog.json`, with the live GTM and GA4 ids (`GTM-W6NPB7W`, `G-YP1ZBNYRVD`), 7 events observed in `dataLayer` (read-only, no clicks) and 11 `live_name` events: names the live container triggers on, with parameters still unobserved. No proposed events are left.
  - **19 specialist guides** written for OLX (review, copy, forms, grid, type, interaction, motion, icons, imagery, image prompts set in Pakistan, inspiration, charts, token check, tracking, taxonomy, GA4 spec, funnels).
  - **Store screenshots and app icons:** OLX profiles for the store-screenshot editor (`brands/olx-pk`) and the icon generator (`products/olx-pk`, `npm run app-assets -- --out <folder>`; it needs `pip install pillow cairosvg`). Both kits were adapted from the uploaded Dubizzle hand-off skill (MIT upstream licences kept).
  - **Worked example:** `handoff/favourites/` (screens, flows, tracking, deliverable, QA: PASS WITH WARNINGS).
- **Manifest for Claude Design and other tools.** `design-system.json` is one index of tokens (light and dark values), CSS components (classes, modifiers, elements), React wrappers, live components and their states, templates, screens, flows, assets, quality results and known gaps, all with file paths.
  - Generated from the repo with `npm run manifest`.
  - Published at https://chaudhary-umair-ahmad.github.io/OLX-Design-System/design-system.json.
- **Pixel check.** `npm run verify:pixels` renders every stored capture and compares it with its live screenshot. The latest results are in `audit/pixel-report.md`:

  | | Match | Close | Off | Not compared |
  | --- | --- | --- | --- | --- |
  | Screens | 141 | 10 | 39 | 12 |
  | Templates | 9 | – | 1 | – |
  | Components | 22 | 13 | 19 | – |

  - **Screens are from 7 Oct; templates and components were re-checked on 15 Oct under Chromium 141**, after the capture fixes. The two runs aren't directly comparable: see "Pixel-check percentages don't carry across machines" below.
  - **Templates went from 6/0/4 to 9/0/1**, almost entirely from making the stored markup and the stored image describe the same page. The one left is `category-listing~mobile` at 7.98%, where the two now agree on size to the pixel and the difference is the listing content itself.
  - **Components went from 22/12/19 with one error to 22/13/19 with none.** The error is gone because the sell button renders at all now. Against the run just before these fixes (18/17/18/1) seven rows improved and two slipped, both from ad content rotating between captures.
  - Screens and templates marked "off" are listing pages, 3–11% different. The cause is result counts and "x minutes ago" text that change after the screenshot.
  - **Two components mismatch for structural reasons, not because the capture is wrong.** `sell-button~desktop` (32.45%) now matches its capture size exactly at 104×48; what differs is the content inside that small box, where a few hundred pixels is a third of it. `app-banner~desktop` (26.24%) renders 1280×147 against a 1280×173 capture, because 147 is its honest standalone height and the page stretched it: see `stretchedByPage` in `components/index.json`.
  - "Not compared" are scroll states, which static HTML can't reproduce.

## What is not done (open work)

1. **Logged-in screens.** Post an ad, chat, profile and my ads can't be captured from the cloud, because they need your OLX login. Capture them on the Mac with `npm run capture:logged-in`, which opens a browser for you to log in.
2. **Component captures: fixed for `home` and `category-listing`; the other pages still need re-capturing.** Two separate bugs, and the earlier write-up of them was wrong on the breadcrumb — corrected here.
   - **The filters sidebar was the window size.** `snapshot-live.mjs` used to call `layoutFullHeight`, which resizes the window to the whole page height before the screenshot. Anything sized in `vh` then grows to fit: the sidebar was captured at 1646 px instead of its real 742 px. It now screenshots with Playwright's `fullPage: true` at the window size a visitor actually has, and the sidebar captures at 743 px.
   - **The 1 px breadcrumb was never a collapsed element.** Its box measured a healthy 358×27 the whole time. Taking a full-page screenshot *scrolls the document*, which loads more listings, so the page grows while the shot is being taken — on the mobile category page from 6,325 px to 10,613 px. The component rectangles are measured afterwards, by which time the breadcrumb sits below everything the image covers, and `cropPng`'s silent clamp wrote the leftover 1 px row out as if it were a capture. `cropPng` now refuses a crop that falls mostly outside the image, and `snapshot-live.mjs` photographs the element directly instead, marking it `capturedDirectly` in `components/index.json`. That recovered the breadcrumb (1074×81) and also `brand-chips~mobile`, which had been silently wrong without anyone noticing.
   - **All 10 templates and all 66 components now use the real window size.** Re-capturing every page `snapshot-live.mjs` owns moved the last of them off the old path, so `templates/index.json` records `viewportHeight` throughout. `site/` is still the old way: `capture-site.mjs` and `import-kit.mjs` call `layoutFullHeight`, so its 202 captures keep the distorted layout until re-captured, and `verify-pixels.mjs` keeps the fallback for them.
   - **The sell button is fixed; the app banner turned out not to be a bug.** Both rendered shorter standalone than their capture, but for different reasons.
     - **The sell button is `position: absolute`** on live (104×48, inside a `position: relative` parent). The old wrapper forced every ancestor to `position: static`, so the component lost its containing block, resolved against the window instead, and drew no height at all — hence 104×0. The wrapper now keeps ancestors `position: relative` and, for an out-of-flow component, gives the outer box the size it had on the page. It renders 104×48, matching live. Marked `outOfFlow` in `components/index.json`, because its height then matches the capture by construction.
     - **The app banner is stretched by the page, and 147 px is the honest standalone height.** Its children are identical live and standalone (104, 147 and 108 px in a centred flex row), so a flex row is correctly as tall as its tallest item: 147. Live it is 172 because an ancestor is made tall by something outside the component. No faithful wrapper can reproduce that without importing layout the component doesn't own, so it is recorded as `stretchedByPage` with both heights rather than padded to match. Its mismatch is a property of extracting a stretched component, not a defect.
     - The same detection found three more page-stretched components that had been unexplained mismatches: `chat-button~desktop` (48 vs 24), `contact-bar~mobile` (64 vs 40) and `brand-chips~mobile` (28 vs 21).
     - **Keeping the ancestors' `display` was tried and reverted.** It looked like the obvious fix — flattening a flex row to a block changes the child's box — but a flex ancestor left holding a single child applies flex-item sizing to it, and it made 17 components worse against 4 better: `listing-card~desktop` went from 0.65% to 87.21%, `related-ads~desktop` from 0.91% to 83.27%, `contact-bar~mobile` from a match to 37.94%. Flattening to a block is the safer reading of "this component, out of its page". Only `position` is now conditional, and only for an out-of-flow component. Don't retry this without measuring all 66 components. The checker used to wait the full 60 s and then report only "locator.screenshot: Timeout"; it now detects the collapsed wrapper in about 2 s and says so. The capture itself is right (the PNG is 104×48); making such components render standalone needs the extraction to keep enough of the parent's layout.
3. **Matching with `maple`.** `audit/comparisons/live-vs-repo.md` covers live versus this repo. Reconciling components with the `maple` source is still pending; `docs/inventory.md` marks it "specced".
4. **Hand-off skill follow-ups.**
   - **GA4: applied on 14 Oct 2026.** The ids and consent signals are in `tenant`, the 5 proposed events were replaced by the 11 live names, the favourites example fires `favourite_toggle`, and QA was re-run (PASS WITH WARNINGS, 1 warning).
   - **The live names' parameters are still unobserved.** The container shows which events fire, not what they send, so the 11 are `status: "live_name"` with `params: []` and QA warns `trk.unverified` when a feature uses one. Observe them in GTM Preview on the Mac, signed in (heart, Chat, Call, Sell). For favourites specifically: which parameter tells a save from a remove, since `favourite_toggle` is one event for both.
   - Still needs the analytics owner: confirm the production property, consent defaults, key events, custom dimensions.
   - The OLX icon config is unverified: compare it with the shipping store icon, and get the 1024 px store icon for the screenshot kit.
   - Store screenshots need captures from the OLX apps; none are in the repo.
5. **Site size.** The published site is about 710 MB, against GitHub Pages' 1 GB limit, because the screenshots now include photos. Shrink the screenshots (WebP, or a lower scale on mobile) before adding much more.

## Moving to another account

1. **Move the repo.** On GitHub, go to Settings → General → Danger zone → *Transfer ownership*, or fork it, or push a mirror:
   ```sh
   git clone --mirror https://github.com/chaudhary-umair-ahmad/OLX-Design-System.git
   cd OLX-Design-System.git && git push --mirror https://github.com/<new-owner>/OLX-Design-System.git
   ```
   The repo is about 250 MB, so push over a stable connection.
2. **GitHub Pages.** In the new repo, set Settings → Pages → *Source* to **GitHub Actions**, not "Deploy from a branch". Then run the workflow once from the Actions tab. Done for `chaudhary-umair-ahmad`: the book, Storybook, prototype and `design-system.json` all serve (checked 14 Oct 2026).
3. **The hard-coded URLs are done** for the move to `chaudhary-umair-ahmad` (14 Oct 2026): `README.md`, `scripts/build-manifest.mjs` (`BASE`) with `design-system.json` regenerated, `.claude/skills/olx-design-system/foundations.md`, `CLAUDE.md` (the PR reference) and `scripts/build-publish.mjs` (the default `BOOK_STORYBOOK_URL`, which was a claude.ai artifact link belonging to the old account and is now the new owner's Pages Storybook). For the next move, those are the files to change; `git grep <old-owner>` finds the rest.
4. **Claude access.** Install the Claude GitHub App on the account that **owns** the repo (https://github.com/apps/claude), then reconnect GitHub at claude.ai → Settings → Connectors. Earlier, the app was installed on `iqratahir` while the repo belonged to `iqratahir-8`, which caused 403s on every push.
5. **Cloud environment.** In the Claude Code cloud environment, set Network access to **Full**, or allow these hosts: `www.olx.com.pk`, `images.olx.com.pk`, `<owner>.github.io`. Without them, captures and checks of the live site can't run.
6. **Mac session.** The Mac session (`claude remote-control` started in the `maple` folder) is the one that can read `maple`, use your logged-in OLX account and run Chrome. Point it at the new repo remote.

## How to work on it

```sh
npm ci                      # Playwright, pngjs, simple-icons
npm run book                # book at http://localhost:6006/book/
cd storybook && npm ci && npm run dev   # Storybook at http://localhost:6006
```

Refresh from the live site, only when OLX changes. This takes about 1.5 hours:

```sh
node scripts/capture-site.mjs --force    # all public screens -> site/
node scripts/snapshot-live.mjs           # templates/ and components/
node scripts/build-prototype.mjs && node scripts/build-catalog.mjs
MASK_PHOTOS=1 npm run verify:pixels      # writes audit/pixel-report.md
```

- `capture-site` replaces each screen in place; screens it can't capture keep their old files.
- After a forced re-capture, delete section files the new `.json` files no longer list. Commit in batches of about 12 pages, because very large pushes have been rejected.

## Gotchas learned the hard way

- **Cloud Chromium and certificates.** In a cloud session, the bundled Chromium doesn't trust the session's HTTPS proxy, so pages fail with `ERR_CERT_AUTHORITY_INVALID`. The fix is to add the proxy's CA certificates (the "Anthropic" ones in `/root/.ccr/ca-bundle.crt`) to `/root/.pki/nssdb` with `certutil` (package `libnss3-tools`). Don't switch off certificate checks.
- **Node and the proxy.** Node's built-in `fetch` ignores the proxy unless you run it with `NODE_USE_ENV_PROXY=1`.
- **Storybook and the book share a folder.** The Storybook build empties its output folder, and the book puts design-kit pages under `storybook/` too. The workflow therefore builds Storybook separately and merges it in. Don't change that back.
- **The ad-detail capture depends on which ad is live.** `ad-detail`'s path is resolved at run time, because ads expire, so each run captures a different ad — and a component only exists if that ad has it. A re-capture on 15 Oct silently dropped `show-phone-button~desktop` from `components/index.json` because the ad of the moment didn't offer the button; the next run put it back. After re-capturing `ad-detail`, compare the component count with the previous run, and read the `missing` lines in the output, not only the `captured` ones.
- **Lazy-loaded photos.** OLX puts listing photo URLs in `data-src`. `scripts/lib/capture-lib.mjs` (`freezePage`) copies them into `src`, so static copies show photos. `scripts/fix-lazy-images.mjs` repairs older captures.
- **Pages sized to the window.** Motors uses `vh` units, so its page height depends on the window height. The pixel check sizes the window from the live screenshot, not from the saved page height.
- **Resizing the window to the page height distorts the layout.** `layoutFullHeight` (`scripts/lib/capture-lib.mjs`) makes the whole page fit by setting the window height to the page height. A window several thousand pixels tall is not one any visitor has, so anything sized in `vh` grows to fit: the filters sidebar was captured at 1646 px instead of its real 742 px. `snapshot-live.mjs` now uses `fullPage: true` at the real window size and records that window as `viewportHeight` in `templates/index.json`, and `verify-pixels.mjs` reproduces it. `capture-site.mjs` and `import-kit.mjs` still do it the old way, so `site/` captures still carry the distortion.
- **A lazy page and its own screenshot disagree, so the markup is read first.** `fullPage` scrolls the document to photograph it, which loads more listings, and it sizes the image from the document as it finishes — so the markup saved afterwards described a different page from the picture. On the category page the stored markup said 16,906px against a 9,515px image, and the old checker hid it by cropping the render to the image height. `snapshot-live.mjs` now reads the markup and the height before the screenshot, takes the image height from the PNG itself, and when the two still disagree marks the template `unstable` so `verify-pixels.mjs` skips it with a reason, the way it already skips scroll states. The growth is intermittent: the same page can be stable on one run and grow 4,000px on the next, so don't conclude from one clean run that it is fixed.
- **Infinite scroll: taking the screenshot changes the page.** A full-page screenshot scrolls the document, which loads more listings, so the page grows *while the shot is being taken* — on the mobile category page from 6,325 px to 10,613 px, and it never settles (12 scroll passes took it past 51,000 px and it was still growing). Component rectangles measured after the shot then point below everything the image covers. `cropPng` used to clamp that silently and write out a 1 px sliver that looked like a capture: that, not a collapsed element, was the "1 px mobile breadcrumb". `cropPng` now refuses a crop that is mostly outside the image, and the caller photographs the element directly and marks it `capturedDirectly`. Don't try to fix this by settling the height first — on an infinite list there is no height to settle on.
- **A component extracted from its parent can render 0 px tall.** `snapshot-live.mjs` wraps a component in its ancestors' classes but resets their layout (`height:auto;min-height:0`), so a component that got its height from a flex or grid parent has none on its own: the desktop sell button renders 104×0. Playwright can't screenshot an empty box and waits for the timeout, so `verify-pixels.mjs` now checks the box first and reports the collapse instead of a bare timeout. Don't "fix" it by pinning the live height onto the wrapper: that makes the height comparison pass by construction and hides the real difference.
- **Pixel check and animations.** The checker jumps animations to their end state. Turning them off would leave fade-in popups invisible and make them look missing.
- **Pixel-check percentages don't carry across machines.** The checker is deterministic on one machine — the same capture gives the same number every run — but anti-aliased text rasterises slightly differently between Chromium builds, so re-checking an untouched capture elsewhere can move it a few percent and look like a regression. On 15 Oct a re-check under Chromium 141 moved nine `ad-detail` captures that nothing had touched (e.g. `safety-tips~desktop` 0.58% → 4.37%), with their rendered sizes identical to the pixel. Hours went into hunting that: it is not the captures, the fonts (removing `fonts/` changes nothing), `MASK_PHOTOS`, the remote Google stylesheet the components link, or the checker's logic (the only change to it since the report was the `fonts` label). The report now records the browser build it ran under; compare like with like, and trust a size or geometry difference (a 1 px PNG, 1646 px against 742 px, a 104×0 render) far more than a few percent of changed pixels.
- **Skill descriptions are capped at 1,024 characters** on claude.ai upload. Claude Code doesn't enforce it, so check the length before packaging.
- **`git mv` into a folder that still exists** moves the source *inside* it (`a/b`), not over it. When renaming over an emptied folder, move to a temporary name first.
- **Python 3.11 in the cloud.** The icon generator used an f-string with nested double quotes, which only Python 3.12+ accepts. It was rewritten; keep scripts 3.11-safe.
- **Store-screenshot profiles.** Relative paths in `brands/<id>.json` resolve from the profile's own folder, not the repo root (hence `../../../../../../fonts/...`).
- **Two sessions on one branch.** The Mac session and cloud sessions both pushed to `claude/olx-design-system-setup-1chba1`. Fetch before you push, and never force-push over the other session's work.

## Change log

Newest first. One entry per change: date, what changed, why, and the PR. "Mac" marks work done in the session on the Mac (`local-build`); the rest was done in cloud sessions.

### 15 Oct 2026
- **`show-phone-button~desktop` restored after a re-capture dropped it.** `ad-detail`'s path is resolved at run time because ads expire, so each run captures a different ad, and the ad in the #14 run didn't offer a "Show phone number" button. The component fell out of `components/index.json` (56 entries to 55) while its stale files stayed on disk, and the `captured` line still read normally — only a `missing` line said otherwise. Re-capturing `ad-detail` brought it back. Written up under "Gotchas": after re-capturing that page, compare the component count and read the `missing` lines.
- **The sell button is fixed; the app banner turned out not to be a bug; and a third problem surfaced on the way** (#14). All 10 templates and all 66 components were re-captured.
  - **The sell button is `position: absolute`** on live (104×48 inside a `position: relative` parent). The old wrapper forced every ancestor to `position: static`, so it lost its containing block, resolved against the window, and drew no height: 104×0. Ancestors now stay `position: relative`, and an out-of-flow component gets the box it had on the page. It renders 104×48, matching live, and is marked `outOfFlow` since its height then agrees with the capture by construction.
  - **The app banner is not broken.** Its children are identical live and standalone (104, 147 and 108px in a centred flex row), so 147px — the tallest item — is the correct height for a flex row. Live it is 172px because an ancestor is stretched by something outside the component, which no faithful wrapper can reproduce without importing layout the component doesn't own. Recorded as `stretchedByPage` with both heights instead of being padded to match. The same check found three more page-stretched components that had been unexplained mismatches: `chat-button~desktop`, `contact-bar~mobile` and `brand-chips~mobile`.
  - **Keeping the ancestors' `display` was tried and reverted**: a flex ancestor holding a single child applies flex-item sizing to it, which made 17 components worse against 4 better (`listing-card~desktop` 0.65% → 87.21%). Only `position` is conditional now, and only for an out-of-flow component.
  - **Found while testing: the stored markup didn't describe the stored image.** Reading the markup after the screenshot captured a page that had grown during the shot — 16,906px of listings against a 9,515px image on the category page. The markup and height are now read before the screenshot, the image height comes from the PNG, and a page that still changes size is marked `unstable` and skipped with a reason. The old checker had been hiding this by cropping the render to the image height. This is where most of the gain came from: **templates went from 6/0/4 to 9/0/1**, with `search-results` on both viewports and `category-listing~desktop` and both `ad-detail` reaching an exact match.
  - **Net on components: 18/17/18 with one error → 22/13/19 with none.** The sell button renders at its captured size (104×48) instead of erroring; seven rows improved, two slipped from ad content rotating between captures. The sell button is still 32.45% and the app banner 26.24%, for the structural reasons above — neither is a wrong capture.
- **The capture bugs behind the broken component captures are fixed, and the earlier diagnosis of one of them was wrong** (#13). Two separate faults, found by prototyping the proposed fix against live before changing anything:
  - **The window size.** `snapshot-live.mjs` called `layoutFullHeight`, which resizes the window to the whole page height before the screenshot, laying the page out at a size nobody browses at. `vh`-sized boxes grew to fit, which is why the filters sidebar was captured at 1646 px instead of 742 px. It now screenshots with `fullPage: true` at the real window size and records that window as `viewportHeight` in `templates/index.json`. The sidebar now captures at 743 px, matching live.
  - **Infinite scroll, not a collapsed element.** The 15 Oct entry below says the mobile breadcrumb "collapses to height 0". **That was wrong.** Its box measured a healthy 358×27 throughout. Taking a full-page screenshot scrolls the document, which loads more listings, so the page grows during the shot (6,325 px → 10,613 px on the mobile category page, and it never settles — 12 scroll passes took it past 51,000 px still growing). Rectangles measured after the shot then fall outside the image, and `cropPng` clamped that silently into a 1 px PNG that looked like a capture. `cropPng` now refuses a crop mostly outside the image, and the caller photographs the element directly, marked `capturedDirectly` in `components/index.json`.
  - **It caught a second broken capture nobody knew about:** `brand-chips~mobile` was being clamped the same way. Both it and the breadcrumb are now real captures (1074×81 for the breadcrumb).
  - **Backwards compatible on purpose.** `verify-pixels.mjs` reproduces the new window when `viewportHeight` is recorded and falls back to the old behaviour when it isn't, so the 6 templates and all 202 `site/` captures that still use the old path keep working until they are re-captured. `capture-site.mjs` and `import-kit.mjs` still call `layoutFullHeight`.
  - **What the re-check actually shows** (`templates components`, Chromium 141): `filters-sidebar~desktop` mismatch 54.94% → **match 0.14%**, and `breadcrumb~mobile` 98.72% → 30.81% — its capture is now genuine (1074×81) and the rest is a 2 CSS px height difference between the live element and the standalone render, which is a large share of an 81 px-tall image. `brand-chips~mobile` keeps its `close` verdict; the silent clamp was the bug there, not the verdict.
  - **The app banner is not this bug.** It was guessed to be the same window-size cause; it isn't. Its PNG is 1280×173 and its standalone HTML renders 1280×147, so it belongs with the sell button: a component extracted without the parent that gave it its height. Both are still open.
  - `delivery-card~mobile` reads 3.98% rather than 2.39%, from the ads rotating between captures; it sits either side of the 3% threshold and is not affected by this change.
  - Why it matters: a silent clamp meant the repo held captures that were wrong in a way no report could distinguish from a real one, and the log was telling the next session a cause that wasn't true.
- **`home` and `category-listing` re-captured from live, and the "four broken component captures" turned out to be two bugs** (#12). Open-work item 2 said four components needed redoing. Re-capturing fixed one of them, the delivery card (mismatch 23.74% → close 2.39%, the rest being rotating ad content); the others came back identical, because they aren't stale captures:
  - **[Superseded — the breadcrumb half of this was wrong; see the entry above.]** **The mobile breadcrumb and the expanded filters sidebar are one bug in `layoutFullHeight`.** It sets the window height to the whole page height before the screenshot, so layout that depends on the window is captured wrong: the breadcrumb collapses to height 0 (clamped to the 1 px PNG) and the `vh`-constrained sidebar expands to 1646 px instead of 742 px. The app banner looks like the same cause. Written up under "Gotchas"; the fix changes every capture in the repo, so it is left as a decision rather than slipped in here.
  - **The desktop sell button renders 104×0** because a component is extracted without the flex parent that gave it its height. `verify-pixels.mjs` used to wait the full 60 s and report only "locator.screenshot: Timeout". It now checks the box first and reports "the stored HTML renders 104×0: the component's wrapper collapsed", in about 2 s. The diagnosis is fixed, not the capture — the PNG was always right at 104×48.
  - Why it matters: the log was pointing the next session at four selector problems, when three of them are one shared-library bug and one is a limitation of extracting components from their parents.
  - 65 files: the two pages' templates and all their components, re-captured from live on 15 Oct. No component was lost (66 entries before and after).
- **`templates` and `components` re-checked; the report now records its browser build** (#12). Six captures improved, all on the re-captured pages: `delivery-card` on both viewports (17.69% and 23.74% → close), `brand-chips~mobile`, `listing-card~mobile` and both `category-listing` templates (7.33% → 1.27% on mobile).
  - Nine `ad-detail` captures moved the other way (`safety-tips~desktop` 0.58% → 4.37%, `ad-detail~desktop` match → close) although **nothing touched them** — not this change, not any commit since the report was generated. Their rendered sizes are identical to the pixel; only anti-aliased text differs, because the 7 Oct report was produced under a different Chromium build. `verify-pixels.mjs` now records the build in the report and says percentages aren't comparable across builds, and "Gotchas" has the full list of what was ruled out. The committed report therefore mixes `site` rows carried forward from 7 Oct with `templates` and `components` rows measured on 15 Oct; a `site` re-check would likely shift those rows the same way.
  - Why it matters: without this, the next person re-runs the check, sees nine regressions they didn't cause, and goes looking for a bug in the captures.

### 14 Oct 2026
- **GA4 / GTM findings applied to the event catalogue** (#11). `handoff/analytics/event-catalog.json` now carries the ids (`GTM-W6NPB7W`, `G-YP1ZBNYRVD`), the consent signals the container references, and the retired UA id. The 5 proposed events were replaced by the 11 names the live container triggers on (`chat_lead`, `open_chat`, `phone_view`, `phone_lead`, `sms_lead`, `make_an_offer`, `favourite_toggle`, `click_sell`, `add-listing_view`, `publish_ad`, `ad-post-success_view`), each recording what it `replaces`. Why: the catalogue was telling designers to track names that don't exist on live.
  - A third status, **`live_name`**, says the name is real but its parameters were never observed (`params: []`). The container shows which events fire, not what they send, so calling them `live` would have overstated it. New QA check `trk.unverified` warns when a feature uses one, which keeps the warning the old `trk.proposed` used to give.
  - `handoff/favourites/tracking.json` (v2) fires `favourite_toggle` for both the un-heart and the re-heart, since live has one event for both directions. The M2 guardrail was reworded and now depends on an open question: which parameter tells a save from a remove.
  - The `event-taxonomy`, `ga4-event-spec` and `funnel-analysis` guides, the QA `checks.md` table and the hand-off builder's status footnote were updated to match. Five live names use a hyphen (`add-listing_view`, `ad-post-success_view`, the package and payment views), which breaks the catalogue's own snake_case rule and the `trk.name` check; they are recorded as `naming.live_name_exceptions` rather than silently renamed.
  - QA re-run: `npm run qa -- --scope favourites` → PASS WITH WARNINGS, 3 warnings down to 1 (the GA4-id warning is gone now the id is recorded).
- **Hard-coded URLs re-pointed to `chaudhary-umair-ahmad`** (#11), finishing step 3 of the account move: `README.md`, `scripts/build-manifest.mjs` (`BASE`, with `design-system.json` regenerated), `foundations.md`, `CLAUDE.md`'s PR reference, and `scripts/build-publish.mjs`'s default `BOOK_STORYBOOK_URL`, which pointed at a claude.ai artifact owned by the old account. All four Pages URLs were checked and serve.
- **Skill description shortened to 704 characters.** claude.ai rejects a skill whose `description` is over 1,024 characters, so the merged skill failed to upload.
- **The two OLX skills merged into one**, `olx-design-system`, at the user's request. The old `olx-design-system/SKILL.md` is now `foundations.md` (quick questions), and the hand-off skill's folder moved in as `SKILL.md`, `stages/`, `qa/`, `deliverables/` and `specialists/`. `olx-design-handoff` no longer exists. Paths in `package.json`, `README.md`, `CLAUDE.md`, `handoff/registry.json` and the scripts were updated; `npm run qa`, `handoff` and `app-assets` were re-run from the new path.
- **GA4 setup found and recorded** (#9, `handoff/analytics/gtm-container.md`). Read-only from the home page source and the public GTM script: container `GTM-W6NPB7W`, GA4 `G-YP1ZBNYRVD`, consent mode referenced, and about 60 event names the container listens for. Five of the catalogue's proposed names don't match live (e.g. favourites is `favourite_toggle`, contact is `chat_lead` / `phone_view`). Not applied to the catalogue yet.
- **Repo being transferred to another GitHub account.** The 13 and 14 Oct work is on the branch `claude/olx-design-system-setup-1chba1` and was merged to `main` in iqratahir-8/OLX-Design-System#9. The repo now belongs to `chaudhary-umair-ahmad`; GitHub forwards the old address.

### 13 Oct 2026
- **`olx-design-handoff` skill added** (#9), modelled on the uploaded Dubizzle hand-off skill and rebuilt for OLX in Node.
  - Stages and gates, the QA runner, the single-file deliverable builder, 19 specialist guides, the OLX store-screenshot and app-icon kits, the analytics event catalogue, real-content fixtures, and the worked `favourites` example.
  - New scripts: `npm run qa`, `handoff`, `fixtures` and `app-assets`.
  - `README.md` and the `olx-design-system` skill point to it.
  - Why: so a design job ends in something engineers can build, checked against every state, width and flow.

### 9 Oct 2026
- **Geomanist bundled; Bold and Thin dropped** (iqratahir-8/OLX-Design-System#7).
  - The font is committed and published in Regular 400, Book 500 and Medium 600, since OLX holds the licence. `css/tokens.css` loads it with `@font-face`.
  - The bold token is removed, `<strong>` uses 600, and `font-synthesis: none` stops faked bold.
  - The design kit's Geomanist files are committed. GE SS Two (Arabic) is not, because it has a different licence.
- **Claude skill and `design-system.json` manifest** (#6). Added `.claude/skills/olx-design-system/SKILL.md` and `scripts/build-manifest.mjs` (`npm run manifest`). The manifest is published at `/design-system.json`.
- **`PROGRESS.md` added** (#6): status, open work and hand-over steps for moving to another account.
- **Change log and `CLAUDE.md` rule added** (#8): update this file with every change.

### 8 Oct 2026
- **Fixed the 404 on the book's design-kit screens** (#5). The Storybook build emptied `storybook/`, deleting the kit pages the book had copied there. Storybook now builds separately and is merged in.

### 7 Oct 2026
- **Full re-capture of olx.com.pk with photos** (#4).
  - 196 public screens, 10 templates and 66 components.
  - The previous screenshots had no listing photos, because the image server was unreachable when they were taken.
  - 2,682 stale section files and 38 unused stylesheets were removed.
- **Missing photos in stored HTML fixed** (#4). OLX keeps photo URLs in `data-src`, which a static copy never loads.
  - `freezePage` now copies them into `src`.
  - `scripts/fix-lazy-images.mjs` repaired 5,674 images.
- **Pixel check added** (#4): `npm run verify:pixels` and `audit/pixel-report.md`.
- **Redirects** (#4): `/book/` and `/prototype/` now redirect on Pages.

### 6 Oct 2026
- **Design kit merged into the book and prototype; developer catalog added** (#3, Mac).
- **Storybook fixes** (#3, Mac): the page index opens pages through Storybook, and "Full page" opens over the canvas.
- **Motors** (#3, Mac): logos filled with Simple Icons, and screen order kept on re-import.
- **Property** (#3, Mac): landing and not-found pages recaptured with their CSS.
- **GitHub Pages deploy for the book, prototype, showcase and Storybook** (#2).
- **Storybook design kit and Motors HTML imported** (#2, Mac). The Motors pages were also merged into the prototype.

### 29 Sep – 2 Oct 2026
- **Initial design system** (#1, Mac): tokens, base styles, `olx-*` components and the showcase page.
- **First captures and tools** (#1, Mac):
  - live captures of olx.com.pk pages, sections and components;
  - the design system book and the clickable prototype;
  - the `maple` audit scaffolding;
  - separate icon and image assets;
  - Property pages and a guided capture for logged-in screens.
